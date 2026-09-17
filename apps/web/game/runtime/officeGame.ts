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
import { npcTextureKey, registerOfficeTextures } from "./proceduralAssets";

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

export function createOfficeScene(pack: GamePack, storageKey: string) {
  const lastQuestId = pack.quests[pack.quests.length - 1]?.id;
  return class OfficeScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey!: Phaser.Input.Keyboard.Key;
    private ui!: GameUiState;
    private npcSprites = new Map<string, Phaser.Physics.Arcade.Sprite>();
    private poiZones: { id: string; zone: Phaser.GameObjects.Zone; label: string }[] = [];
    private walls!: Phaser.Physics.Arcade.StaticGroup;
    private questMarker!: Phaser.GameObjects.Image;
    private pickHandler?: (e: Event) => void;

    constructor() {
      super("office");
    }

    create() {
      registerOfficeTextures(this, pack);

      this.ui = {
        progress: loadProgressFromStorage(storageKey),
        dialogue: null,
        talkedNpcIds: new Set(),
        visitedPoiIds: new Set(),
      };

      const tile = pack.map.tileSize;
      const worldW = pack.map.width * tile;
      const worldH = pack.map.height * tile;
      this.physics.world.setBounds(0, 0, worldW, worldH);
      this.cameras.main.setBounds(0, 0, worldW, worldH);
      this.cameras.main.setBackgroundColor(pack.visual.palette[0] ?? "#1a1a2e");

      this.walls = this.physics.add.staticGroup();

      for (let y = 0; y < pack.map.height; y++) {
        for (let x = 0; x < pack.map.width; x++) {
          const cx = x * tile + tile / 2;
          const cy = y * tile + tile / 2;
          const isBorder =
            x === 0 || y === 0 || x === pack.map.width - 1 || y === pack.map.height - 1;
          if (isBorder) {
            const w = this.walls.create(cx, cy, "tile-wall") as Phaser.Physics.Arcade.Sprite;
            w.setDepth(0);
          } else {
            this.add.image(cx, cy, "tile-floor").setDepth(0);
          }
        }
      }

      const spawn = pack.map.spawn;
      this.add.image(spawn.x * tile, spawn.y * tile, "tile-rug").setDepth(1);

      for (const poi of pack.pois) {
        const px = poi.position.x * tile;
        const py = poi.position.y * tile;
        if (poi.id.includes("desk")) {
          const desk = this.walls.create(px, py, "prop-desk") as Phaser.Physics.Arcade.Sprite;
          desk.setDepth(py);
        } else if (poi.id.includes("kitchen") || poi.id.includes("lab")) {
          const plant = this.add.image(px, py - 8, "prop-plant");
          plant.setDepth(py);
        }
        const zone = this.add.zone(px, py, poi.radius * 1.4, poi.radius * 1.4);
        this.physics.add.existing(zone, true);
        this.poiZones.push({ id: poi.id, zone, label: poi.label });
      }

      this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers("player-sheet", { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1,
      });

      this.player = this.physics.add.sprite(spawn.x * tile, spawn.y * tile, "player-sheet", 0);
      this.player.setCollideWorldBounds(true);
      this.player.setSize(14, 10);
      this.player.setOffset(9, 18);
      this.player.setDepth(spawn.y * tile);
      this.physics.add.collider(this.player, this.walls);
      this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
      this.cameras.main.setZoom(1.15);

      for (const npc of pack.npcs) {
        const nx = npc.position.x * tile;
        const ny = npc.position.y * tile;
        const sprite = this.physics.add.sprite(nx, ny, npcTextureKey(npc.id));
        sprite.setImmovable(true);
        sprite.setDepth(ny);
        sprite.setData("npcId", npc.id);
        this.npcSprites.set(npc.id, sprite);
      }

      this.questMarker = this.add.image(0, 0, "quest-marker").setDepth(10000).setVisible(false);
      this.tweens.add({
        targets: this.questMarker,
        y: "-=6",
        yoyo: true,
        repeat: -1,
        duration: 600,
      });

      this.cursors = this.input.keyboard!.createCursorKeys();
      this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      this.pickHandler = (event: Event) => {
        const index = (event as CustomEvent<{ index: number }>).detail.index;
        this.applyDialogueChoice(index);
      };
      window.addEventListener("first-quest-dialogue-pick", this.pickHandler);

      this.syncHud();
    }

    shutdown() {
      if (this.pickHandler) {
        window.removeEventListener("first-quest-dialogue-pick", this.pickHandler);
      }
    }

    update() {
      if (this.ui.dialogue?.choices?.length) {
        this.player.setVelocity(0);
        return;
      }

      const speed = 140;
      let moving = false;
      this.player.setVelocity(0);
      if (this.cursors.left?.isDown) {
        this.player.setVelocityX(-speed);
        moving = true;
      } else if (this.cursors.right?.isDown) {
        this.player.setVelocityX(speed);
        moving = true;
      }
      if (this.cursors.up?.isDown) {
        this.player.setVelocityY(-speed);
        moving = true;
      } else if (this.cursors.down?.isDown) {
        this.player.setVelocityY(speed);
        moving = true;
      }

      if (moving) {
        if (!this.player.anims.isPlaying || this.player.anims.currentAnim?.key !== "walk") {
          this.player.anims.play("walk", true);
        }
      } else {
        this.player.anims.stop();
        this.player.setFrame(0);
      }

      this.player.setDepth(this.player.y);

      for (const { id, zone } of this.poiZones) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(id);
        }
      }

      this.updateQuestMarker();
      this.updateInteractHint();

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.tryInteract();
      }

      this.tryAdvanceQuests();
      this.syncHud();
    }

    private updateQuestMarker() {
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
          ty = npc.y - 28;
        }
      } else if (active.objective.type === "reach" || active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        if (poi) {
          tx = poi.position.x * pack.map.tileSize;
          ty = poi.position.y * pack.map.tileSize - 24;
        }
      } else if (active.objective.type === "flag") {
        const npc = this.npcSprites.get("npc-security") ?? this.npcSprites.get("npc-hr");
        if (npc) {
          tx = npc.x;
          ty = npc.y - 28;
        }
      }
      if (tx && ty) {
        this.questMarker.setPosition(tx, ty).setVisible(true);
      } else {
        this.questMarker.setVisible(false);
      }
    }

    private updateInteractHint() {
      const active = getActiveQuest(pack, this.ui.progress);
      if (!active || this.ui.dialogue) {
        emitHint(false, "");
        return;
      }
      for (const [npcId, sprite] of this.npcSprites) {
        if (!Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), sprite.getBounds())) {
          continue;
        }
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

    private tryInteract() {
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
        if (!dialogue.choices?.length) {
          this.time.delayedCall(1800, () => {
            this.ui.dialogue = null;
            emitDialogue(null);
          });
        }
        this.cameras.main.flash(80, 255, 255, 200, false);
        return;
      }

      if (active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        if (!poi) return;
        const zone = this.poiZones.find((p) => p.id === poi.id)?.zone;
        if (zone && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(`${poi.id}:interact`);
          this.burstParticles(this.player.x, this.player.y);
        }
      }
    }

    private applyDialogueChoice(index: number) {
      const choice = this.ui.dialogue?.choices?.[index];
      if (!choice) return;
      if (choice.setFlag) {
        this.ui.progress = setFlag(this.ui.progress, choice.setFlag);
        saveProgressToStorage(this.ui.progress, storageKey);
      }
      this.ui.dialogue = null;
      emitDialogue(null);
      this.burstParticles(this.player.x, this.player.y - 8);
    }

    private burstParticles(x: number, y: number) {
      const particles = this.add.particles(x, y, "particle-spark", {
        speed: { min: 40, max: 120 },
        lifespan: 400,
        scale: { start: 1, end: 0 },
        quantity: 8,
        blendMode: "ADD",
      });
      this.time.delayedCall(500, () => particles.destroy());
    }

    private tryAdvanceQuests() {
      let active = getActiveQuest(pack, this.ui.progress);
      while (active) {
        if (!isObjectiveMet(pack, active, this.ui.progress, this.ui)) break;
        this.ui.progress = completeQuest(this.ui.progress, active);
        saveProgressToStorage(this.ui.progress, storageKey);
        this.burstParticles(this.player.x, this.player.y - 12);
        this.cameras.main.shake(120, 0.004);
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

    private syncHud() {
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
  const storageKey = options?.storageKey ?? "first-quest-neulbom-progress-v3";
  const OfficeScene = createOfficeScene(pack, storageKey);
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: Math.min(pack.map.width * pack.map.tileSize, 960),
    height: Math.min(pack.map.height * pack.map.tileSize, 480),
    parent,
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [OfficeScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    backgroundColor: pack.visual.palette[0] ?? "#1a1a2e",
  });
}
