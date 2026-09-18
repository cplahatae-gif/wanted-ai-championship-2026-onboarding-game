type SfxKind = "step" | "talk" | "quest" | "ui";

let audio: RpgAudio | null = null;

export function getRpgAudio(): RpgAudio {
  if (!audio) audio = new RpgAudio();
  return audio;
}

export class RpgAudio {
  private ctx: AudioContext | null = null;
  private muted = false;
  private bgmTimer: ReturnType<typeof setInterval> | null = null;
  private stepPhase = 0;

  ensureContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (this.muted) return this.ctx;
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  setMuted(m: boolean) {
    this.muted = m;
    if (m) this.stopBgm();
    else this.startBgm();
  }

  isMuted() {
    return this.muted;
  }

  startBgm() {
    if (this.muted || this.bgmTimer) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.0, 523.25];
    let i = 0;
    this.bgmTimer = setInterval(() => {
      if (!this.ctx || this.muted) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = notes[i % notes.length]! / 2;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      const t = this.ctx.currentTime;
      osc.start(t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.stop(t + 0.36);
      i++;
    }, 420);
  }

  stopBgm() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  playSfx(kind: SfxKind) {
    if (this.muted) return;
    const ctx = this.ensureContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const base =
      kind === "quest" ? 880 : kind === "talk" ? 520 : kind === "ui" ? 660 : 180 + this.stepPhase * 20;
    this.stepPhase = (this.stepPhase + 1) % 4;
    osc.type = kind === "step" ? "square" : "sine";
    osc.frequency.value = base;
    gain.gain.value = kind === "step" ? 0.025 : 0.06;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const t = ctx.currentTime;
    osc.start(t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + (kind === "step" ? 0.06 : 0.15));
    osc.stop(t + 0.16);
  }
}
