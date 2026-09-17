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

export type GameUiState = {
  progress: QuestProgress;
  activeQuestTitle: string;
  hudLines: string[];
  dialogue: { speaker: string; text: string; choices?: { id: string; text: string; setFlag?: string }[] } | null;
  endingVisible: boolean;
  talkedNpcIds: Set<string>;
  visitedPoiIds: Set<string>;
};

export function createOfficeScene(pack: GamePack, storageKey: string) {
  const lastQuestId = pack.quests[pack.quests.length - 1]?.id;
  return class OfficeScene extends Phaser.Scene {
    private player!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private interactKey!: Phaser.Input.Keyboard.Key;
    private ui!: GameUiState;
    private npcSprites = new Map<string, Phaser.GameObjects.Rectangle>();
    private poiZones: { id: string; zone: Phaser.GameObjects.Zone }[] = [];
    private statusText!: Phaser.GameObjects.Text;
    private dialogueText!: Phaser.GameObjects.Text;

    constructor() {
      super("office");
    }

    create() {
      this.ui = {
        progress: loadProgressFromStorage(storageKey),
        activeQuestTitle: "",
        hudLines: [],
        dialogue: null,
        endingVisible: false,
        talkedNpcIds: new Set(),
        visitedPoiIds: new Set(),
      };

      const [bg, wall, accent] = pack.visual.palette;
      this.cameras.main.setBackgroundColor(bg);
      const tile = pack.map.tileSize;
      const worldW = pack.map.width * tile;
      const worldH = pack.map.height * tile;
      this.physics.world.setBounds(0, 0, worldW, worldH);
      this.cameras.main.setBounds(0, 0, worldW, worldH);

      for (let y = 0; y < pack.map.height; y++) {
        for (let x = 0; x < pack.map.width; x++) {
          if (x === 0 || y === 0 || x === pack.map.width - 1 || y === pack.map.height - 1) {
            this.add.rectangle(x * tile + tile / 2, y * tile + tile / 2, tile, tile, parseInt(wall.slice(1), 16));
          } else if ((x + y) % 5 === 0) {
            this.add.rectangle(x * tile + tile / 2, y * tile + tile / 2, tile - 4, tile - 4, parseInt(accent.slice(1), 16), 0.15);
          }
        }
      }

      const spawn = pack.map.spawn;
      const dot = this.make.graphics({}, false);
      dot.fillStyle(parseInt(accent.slice(1), 16));
      dot.fillCircle(tile / 2, tile / 2, tile * 0.35);
      dot.generateTexture("player-dot", tile, tile);
      dot.destroy();
      this.player = this.physics.add.sprite(spawn.x * tile, spawn.y * tile, "player-dot");
      this.player.setCollideWorldBounds(true);
      this.cameras.main.startFollow(this.player, true, 0.12, 0.12);

      for (const poi of pack.pois) {
        const zone = this.add.zone(poi.position.x * tile, poi.position.y * tile, poi.radius, poi.radius);
        this.physics.add.existing(zone, true);
        this.poiZones.push({ id: poi.id, zone });
        this.add.text(poi.position.x * tile - 20, poi.position.y * tile - 40, poi.label, {
          fontSize: "10px",
          color: "#ffffff",
        });
      }

      for (const npc of pack.npcs) {
        const rect = this.add.rectangle(npc.position.x * tile, npc.position.y * tile, tile * 0.8, tile * 0.8, 0x44aaff);
        this.physics.add.existing(rect, true);
        this.npcSprites.set(npc.id, rect);
        this.add.text(npc.position.x * tile - 16, npc.position.y * tile - 36, npc.name.split(" ")[0]!, {
          fontSize: "10px",
          color: "#aee",
        });
      }

      this.cursors = this.input.keyboard!.createCursorKeys();
      this.interactKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.E);

      this.statusText = this.add.text(12, 12, "", {
        fontSize: "14px",
        color: "#fff",
        backgroundColor: "#00000088",
        padding: { x: 8, y: 6 },
      }).setScrollFactor(0).setDepth(100);

      this.dialogueText = this.add.text(12, worldH - 120, "", {
        fontSize: "13px",
        color: "#fff",
        backgroundColor: "#16213e",
        padding: { x: 10, y: 8 },
        wordWrap: { width: worldW - 24 },
      }).setScrollFactor(0).setDepth(101);

      this.add.text(12, worldH - 28, "방향키 이동 · E 상호작용", {
        fontSize: "11px",
        color: "#ccc",
      }).setScrollFactor(0).setDepth(100);

      this.syncHud();
    }

    update() {
      if (this.ui.dialogue?.choices?.length) return;
      const speed = 160;
      this.player.setVelocity(0);
      if (this.cursors.left?.isDown) this.player.setVelocityX(-speed);
      else if (this.cursors.right?.isDown) this.player.setVelocityX(speed);
      if (this.cursors.up?.isDown) this.player.setVelocityY(-speed);
      else if (this.cursors.down?.isDown) this.player.setVelocityY(speed);

      for (const { id, zone } of this.poiZones) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(id);
        }
      }

      if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
        this.tryInteract();
      }

      this.tryAdvanceQuests();
      this.syncHud();
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
        if (!dialogue.choices?.length) {
          this.ui.dialogue = null;
        } else {
          this.renderDialogue();
        }
        return;
      }

      if (active.objective.type === "interact") {
        const poi = poiById(pack, active.objective.poiId);
        if (!poi) return;
        const zone = this.poiZones.find((p) => p.id === poi.id)?.zone;
        if (zone && Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), zone.getBounds())) {
          this.ui.visitedPoiIds.add(`${poi.id}:interact`);
        }
      }
    }

    private renderDialogue() {
      const d = this.ui.dialogue;
      if (!d) {
        this.dialogueText.setText("");
        return;
      }
      const choiceLines = d.choices?.map((c, i) => `[${i + 1}] ${c.text}`).join("\n") ?? "";
      this.dialogueText.setText(`${d.speaker}: ${d.text}\n${choiceLines}\n(숫자키 1-2 선택)`);
      d.choices?.forEach((choice, index) => {
        const key = this.input.keyboard!.addKey(`${index + 1}`);
        key.once("down", () => {
          if (choice.setFlag) {
            this.ui.progress = setFlag(this.ui.progress, choice.setFlag);
          }
          this.ui.dialogue = null;
          this.dialogueText.setText("");
          saveProgressToStorage(this.ui.progress, storageKey);
        });
      });
    }

    private tryAdvanceQuests() {
      let active = getActiveQuest(pack, this.ui.progress);
      while (active) {
        if (!isObjectiveMet(pack, active, this.ui.progress, this.ui)) break;
        this.ui.progress = completeQuest(this.ui.progress, active);
        saveProgressToStorage(this.ui.progress, storageKey);
        if (lastQuestId && active.id === lastQuestId) {
          this.ui.endingVisible = true;
          const ending = pack.dialogues.find((d) => d.id === "dlg-ending");
          if (ending?.lines[0]) {
            this.ui.dialogue = {
              speaker: ending.lines[0].speaker,
              text: ending.lines[0].text,
            };
            this.dialogueText.setText(`${ending.lines[0].speaker}: ${ending.lines[0].text}`);
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
      const lines = [
        `퀘스트 ${done}/${pack.quests.length}`,
        active ? `현재: ${active.title}` : allQuestsComplete(pack, this.ui.progress) ? "Day 0 완료!" : "대기",
        active?.description ?? "",
      ];
      this.statusText.setText(lines.join("\n"));
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("first-quest-hud", {
            detail: { done, total: pack.quests.length, title: active?.title ?? "완료" },
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
  const storageKey = options?.storageKey ?? "first-quest-neulbom-progress-v2";
  const OfficeScene = createOfficeScene(pack, storageKey);
  return new Phaser.Game({
    type: Phaser.AUTO,
    width: Math.min(pack.map.width * pack.map.tileSize, 960),
    height: Math.min(pack.map.height * pack.map.tileSize, 540),
    parent,
    physics: { default: "arcade", arcade: { debug: false } },
    scene: [OfficeScene],
    scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  });
}
