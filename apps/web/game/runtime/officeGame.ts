import type { GamePack } from "gamepack-schema";
import * as Phaser from "phaser";
import { buildCompletionReport } from "../completionReport";
import {
  allQuestsComplete,
  completeQuest,
  getActiveQuest,
  isObjectiveMet,
  loadProgressFromStorage,
  npcById,
  poiById,
  saveProgressToStorage,
  setFlag,
  type QuestProgress,
} from "../questProgress";
import { getRpgAudio } from "./gameAudio";
import { buildOfficeTilemap } from "./officeTilemap";
import {
  dirFromVelocity,
  humanFrameIndex,
  npcHumanTextureKey,
  type WalkDir,
} from "./officeHumanSprites";
import { createBootScene } from "./rpgBootScene";

export type GameUiState = {
  progress: QuestProgress;
  dialogue: { speaker: string; text: string; choices?: { id: string; text: string; setFlag?: string }[] } | null;
  talkedNpcIds: Set<string>;
  visitedPoiIds: Set<string>;
};

function emitDialogue(payload: GameUiState["dialogue"]) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("first-quest-dialogue", { detail: payload }));
}

function emitHint(visible: boolean, label: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("first-quest-interact-hint", { detail: { visible, label } }),
  );
}

export function createOfficeScene() {
  return class OfficeScene extends Phaser.Scene {
    private pack!: GamePack;
    private storageKey!: string;
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private playerShadow!: Phaser.GameObjects.Image;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey!: Phaser.Input.Keyboard.Key;
    private ui!: GameUiState;
    private npcSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
    private poiZones: { id: string; zone: Phaser.GameObjects.Zone; label: string }[] = [];
    private groundLayer!: Phaser.Tilemaps.TilemapLayer;
    private questMarker!: Phaser.GameObjects.Image;
    private pickHandler?: (e: Event) => void;
    private muteHandler?: (e: Event) => void;
    private walkTick = 0;
    private stepAccumulator = 0;
    private facing: WalkDir = "down";

    constructor() {
      super("office");
    }

    init() {
      this.pack = this.registry.get("gamePack") as GamePack;
      this.storageKey = this.registry.get("storageKey") as string;
    }

    create() {
      const pack = this.pack;
      const storageKey = this.storageKey;
      const lastQuestId = pack.quests[pack.quests.length - 1]?.id;
      const tile = pack.map.tileSize;
      const worldW = pack.map.width * tile;
      const worldH = pack.map.height * tile;

      this.ui = {
        progress: loadProgressFromStorage(storageKey),
        dialogue: null,
        talkedNpcIds: new Set(),
        visitedPoiIds: new Set(),
      };

      const { ground } = buildOfficeTilemap(this, pack);
      this.groundLayer = ground;

      this.physics.world.setBounds(0, 0, worldW, worldH);
      this.cameras.main.setBounds(0, 0, worldW, worldH);
      this.cameras.main.setBackgroundColor("#d6d3ce");

      const spawn = pack.map.spawn;
      this.playerShadow = this.add.image(spawn.x * tile, spawn.y * tile + 14, "char-shadow");
      this.player = this.physics.add.sprite(spawn.x * tile, spawn.y * tile, "human-player", 0);
      this.player.setCollideWorldBounds(true);
      this.player.setSize(16, 12);
      this.player.setOffset(8, 28);
      this.player.setDepth(spawn.y * tile + 1);
      this.physics.add.collider(this.player, ground);

      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      this.cameras.main.setZoom(1.35);
      this.cameras.main.setRoundPixels(true);

      for (const poi of pack.pois) {
        const px = poi.position.x * tile;
        const py = poi.position.y * tile;
        const zone = this.add.zone(px, py, poi.radius * 1.5, poi.radius * 1.5);
        this.physics.add.existing(zone, true);
        this.poiZones.push({ id: poi.id, zone, label: poi.label });
        const label = this.add.text(px - 24, py - 36, poi.label, {
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#334155",
          stroke: "#f8fafc",
          strokeThickness: 3,
        });
        label.setDepth(py + 2);
      }

      for (const npc of pack.npcs) {
        const nx = npc.position.x * tile;
        const ny = npc.position.y * tile;
        const key = npcHumanTextureKey(npc.id);
        const sprite = this.physics.add.sprite(nx, ny, key, 0);
        sprite.setImmovable(true);
        sprite.setDepth(ny + 1);
        sprite.setData("npcId", npc.id);
        sprite.setFrame(`${humanFrameIndex("down", 0)}`);
        if (npc.id.includes("security")) {
          this.add.image(nx + 18, ny, "prop-kiosk").setDepth(ny);
        }
        this.npcSprites.set(npc.id, sprite);
        this.add
          .text(nx - 20, ny - 38, npc.name.split(" ")[0]!, {
            fontFamily: "monospace",
            fontSize: "10px",
            color: "#1e293b",
            stroke: "#f8fafc",
            strokeThickness: 3,
          })
          .setDepth(ny + 2);
      }

      this.questMarker = this.add.image(0, 0, "quest-marker").setDepth(10000).setVisible(false);
      this.tweens.add({
        targets: this.questMarker,
        scale: { from: 1.1, to: 1.45 },
        alpha: { from: 0.85, to: 1 },
        yoyo: true,
        repeat: -1,
        duration: 500,
      });

      this.cursors = this.input.keyboard!.createCursorKeys();
      this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      this.pickHandler = (event: Event) => {
        const index = (event as CustomEvent<{ index: number }>).detail.index;
        this.applyDialogueChoice(index, storageKey);
      };
      this.muteHandler = (event: Event) => {
        const muted = (event as CustomEvent<{ muted: boolean }>).detail.muted;
        getRpgAudio().setMuted(muted);
      };
      window.addEventListener("first-quest-dialogue-pick", this.pickHandler);
      window.addEventListener("first-quest-audio-mute", this.muteHandler);

      getRpgAudio().startBgm();
      this.syncHud(pack);
    }

    shutdown() {
      if (this.pickHandler) window.removeEventListener("first-quest-dialogue-pick", this.pickHandler);
      if (this.muteHandler) window.removeEventListener("first-quest-audio-mute", this.muteHandler);
    }

    update(_time: number, delta: number) {
      const pack = this.pack;
      const storageKey = this.storageKey;
      const lastQuestId = pack.quests[pack.quests.length - 1]?.id;

      if (this.ui.dialogue?.choices?.length) {
        this.player.setVelocity(0);
        return;
      }

      const speed = 155;
      let vx = 0;
      let vy = 0;
      if (this.cursors.left?.isDown) vx = -speed;
      else if (this.cursors.right?.isDown) vx = speed;
      if (this.cursors.up?.isDown) vy = -speed;
      else if (this.cursors.down?.isDown) vy = speed;

      this.player.setVelocity(vx, vy);

      const moving = vx !== 0 || vy !== 0;
      if (moving) {
        this.walkTick++;
        this.facing = dirFromVelocity(vx, vy, this.facing);
        this.player.setFrame(humanFrameIndex(this.facing, this.walkTick));
        this.stepAccumulator += delta;
        if (this.stepAccumulator > 280) {
          this.stepAccumulator = 0;
          getRpgAudio().playSfx("step");
        }
      } else {
        this.player.setFrame(humanFrameIndex(this.facing, 0));
      }

      this.player.setDepth(this.player.y);
      this.playerShadow.setPosition(this.player.x, this.player.y + 16);
      this.playerShadow.setDepth(this.player.y - 1);

      for (const npc of this.npcSprites.values()) {
        npc.setDepth(npc.y + 1);
      }

      for (const { id, zone } of this.poiZones) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(id);
        }
      }

      this.updateQuestMarker(pack);
      this.updateInteractHint(pack);

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        getRpgAudio().playSfx("ui");
        this.tryInteract(pack, storageKey);
      }

      this.tryAdvanceQuests(pack, storageKey, lastQuestId);
      this.syncHud(pack);
    }

    private updateQuestMarker(pack: GamePack) {
      const active = getActiveQuest(pack, this.ui.progress);
      if (!active) {
        this.questMarker.setVisible(false);
        return;
      }
      let tx = 0;
      let ty = 0;
      if (active.objective.type === "talk") {
        const npc = this.npcSprites.get(active.objective.npcId);
        if (npc) {
          tx = npc.x;
          ty = npc.y - 32;
        }
      } else if (active.objective.type === "reach" || active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        if (poi) {
          tx = poi.position.x * pack.map.tileSize;
          ty = poi.position.y * pack.map.tileSize - 28;
        }
      } else if (active.objective.type === "flag") {
        const npc = this.npcSprites.get("npc-security") ?? this.npcSprites.get("npc-hr");
        if (npc) {
          tx = npc.x;
          ty = npc.y - 32;
        }
      }
      if (tx && ty) {
        this.questMarker.setPosition(tx, ty).setVisible(true);
      } else {
        this.questMarker.setVisible(false);
      }
    }

    private updateInteractHint(pack: GamePack) {
      const active = getActiveQuest(pack, this.ui.progress);
      if (!active || this.ui.dialogue) {
        emitHint(false, "");
        return;
      }
      for (const [npcId, sprite] of this.npcSprites) {
        if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), sprite.getBounds())) continue;
        const npc = npcById(pack, npcId);
        emitHint(true, npc ? `${npc.name.split(" ")[0]}와 대화` : "대화");
        return;
      }
      if (active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        const poiId = active.objective.poiId;
        const zone = this.poiZones.find((p) => p.id === poiId)?.zone;
        if (poi && zone && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          emitHint(true, `${poi.label} 조사`);
          return;
        }
      }
      emitHint(false, "");
    }

    private tryInteract(pack: GamePack, storageKey: string) {
      const active = getActiveQuest(pack, this.ui.progress);
      if (!active) return;

      for (const [npcId, sprite] of this.npcSprites) {
        if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), sprite.getBounds())) continue;
        this.ui.talkedNpcIds.add(npcId);
        const npc = npcById(pack, npcId);
        if (!npc) return;
        const activeForDialogue = getActiveQuest(pack, this.ui.progress);
        let dialogueId = npc.dialogueId;
        if (activeForDialogue?.id === "q9-quiz" && npcId === "npc-security") {
          dialogueId = "dlg-quiz-advanced";
        }
        const dialogue = pack.dialogues.find((d) => d.id === dialogueId);
        if (!dialogue) return;
        const first = dialogue.lines[0];
        this.ui.dialogue = {
          speaker: first?.speaker ?? npc.name,
          text: first?.text ?? "",
          choices: dialogue.choices?.map((c) => ({
            id: c.id,
            text: c.text,
            setFlag: c.setFlag,
          })),
        };
        emitDialogue(this.ui.dialogue);
        getRpgAudio().playSfx("talk");
        if (!dialogue.choices?.length) {
          this.time.delayedCall(1800, () => {
            this.ui.dialogue = null;
            emitDialogue(null);
          });
        }
        this.cameras.main.flash(100, 200, 255, 180, false);
        return;
      }

      if (active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        if (!poi) return;
        const zone = this.poiZones.find((p) => p.id === poi.id)?.zone;
        if (zone && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(`${poi.id}:interact`);
          this.burstParticles(this.player.x, this.player.y);
          getRpgAudio().playSfx("talk");
        }
      }
    }

    private applyDialogueChoice(index: number, storageKey: string) {
      const choice = this.ui.dialogue?.choices?.[index];
      if (!choice) return;
      if (choice.setFlag) {
        this.ui.progress = setFlag(this.ui.progress, choice.setFlag);
        saveProgressToStorage(this.ui.progress, storageKey);
      }
      this.ui.dialogue = null;
      emitDialogue(null);
      this.burstParticles(this.player.x, this.player.y - 8);
      getRpgAudio().playSfx("ui");
    }

    private burstParticles(x: number, y: number) {
      const particles = this.add.particles(x, y, "particle-spark", {
        speed: { min: 50, max: 140 },
        lifespan: 450,
        scale: { start: 1.2, end: 0 },
        quantity: 10,
        blendMode: "ADD",
      });
      this.time.delayedCall(500, () => particles.destroy());
    }

    private tryAdvanceQuests(pack: GamePack, storageKey: string, lastQuestId: string | undefined) {
      let active = getActiveQuest(pack, this.ui.progress);
      while (active) {
        if (!isObjectiveMet(pack, active, this.ui.progress, this.ui)) break;
        this.ui.progress = completeQuest(this.ui.progress, active);
        saveProgressToStorage(this.ui.progress, storageKey);
        this.burstParticles(this.player.x, this.player.y - 12);
        this.cameras.main.shake(140, 0.005);
        getRpgAudio().playSfx("quest");
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("first-quest-quest-pop", { detail: { title: active.title } }),
          );
        }
        if (lastQuestId && active.id === lastQuestId) {
          const ending = pack.dialogues.find((d) => d.id === "dlg-ending");
          if (ending?.lines[0]) {
            this.ui.dialogue = {
              speaker: ending.lines[0].speaker,
              text: ending.lines[0].text,
            };
            emitDialogue(this.ui.dialogue);
          }
          if (typeof window !== "undefined") {
            window.dispatchEvent(
              new CustomEvent("first-quest-complete", {
                detail: buildCompletionReport(pack, this.ui.progress),
              }),
            );
          }
        }
        active = getActiveQuest(pack, this.ui.progress);
      }
    }

    private syncHud(pack: GamePack) {
      const active = getActiveQuest(pack, this.ui.progress);
      const done = this.ui.progress.completedQuestIds.length;
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("first-quest-hud", {
            detail: {
              done,
              total: pack.quests.length,
              title: active?.title ?? (allQuestsComplete(pack, this.ui.progress) ? "Day 0 클리어!" : "—"),
              description: active?.description ?? "",
            },
          }),
        );
      }
    }
  };
}

export function mountOfficeGame(
  parent: HTMLElement,
  pack: GamePack,
  options?: { storageKey?: string },
): Phaser.Game {
  const storageKey = options?.storageKey ?? "first-quest-neulbom-progress-v4";
  const BootScene = createBootScene("office");
  const OfficeScene = createOfficeScene();

  const game = new Phaser.Game({
    type: Phaser.AUTO,
    width: Math.min(pack.map.width * pack.map.tileSize, 960),
    height: Math.min(pack.map.height * pack.map.tileSize, 480),
    parent,
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [BootScene, OfficeScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    backgroundColor: "#d6d3ce",
    pixelArt: true,
    antialias: false,
  });

  game.registry.set("gamePack", pack);
  game.registry.set("storageKey", storageKey);
  return game;
}
