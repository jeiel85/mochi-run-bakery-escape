// Web Audio API Procedural Synthesizer for Mochi Run: Bakery Escape
// Generates cheerful BGM, Fever BGM, and tactile arcade SFX with zero external dependencies.

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.bgmPlaying = false;
    this.feverMode = false;
    this.stepIndex = 0;
    this.bgmTimer = null;
    this.masterGain = null;
    this.sfxGain = null;
    this.bgmGain = null;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      return;
    }
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.muted ? 0 : 0.7;
    this.masterGain.connect(this.ctx.destination);

    this.bgmGain = this.ctx.createGain();
    this.bgmGain.gain.value = 0.28;
    this.bgmGain.connect(this.masterGain);

    this.sfxGain = this.ctx.createGain();
    this.sfxGain.gain.value = 0.65;
    this.sfxGain.connect(this.masterGain);
  }

  toggleMute() {
    this.init();
    this.muted = !this.muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.muted ? 0 : 0.7, this.ctx.currentTime);
    }
    return this.muted;
  }

  setFeverMode(active) {
    this.feverMode = active;
  }

  startBGM() {
    this.init();
    if (!this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.stepIndex = 0;

    // Cute upbeat bakery chiptune melody & bassline
    const normalMelody = [
      523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 587.33,
      523.25, 587.33, 659.25, 783.99, 698.46, 659.25, 587.33, 523.25,
      587.33, 698.46, 880.00, 783.99, 659.25, 783.99, 1046.50, 783.99,
      880.00, 783.99, 698.46, 587.33, 659.25, 587.33, 523.25, 783.99
    ];
    const feverMelody = [
      783.99, 987.77, 1174.66, 1318.51, 1567.98, 1318.51, 1174.66, 987.77,
      880.00, 1046.50, 1318.51, 1567.98, 1396.91, 1318.51, 1174.66, 1046.50
    ];
    const bassNotes = [261.63, 196.00, 220.00, 174.61, 261.63, 196.00, 174.61, 196.00];

    const tick = () => {
      if (!this.bgmPlaying) return;
      if (this.ctx && this.ctx.state === 'running' && !this.muted) {
        const now = this.ctx.currentTime;
        const melody = this.feverMode ? feverMelody : normalMelody;
        const note = melody[this.stepIndex % melody.length];
        const dur = this.feverMode ? 0.11 : 0.15;

        // Lead synth
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = this.feverMode ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(note, now);
        g.gain.setValueAtTime(0.18, now);
        g.gain.exponentialRampToValueAtTime(0.005, now + dur);
        osc.connect(g);
        g.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + dur);

        // Bass every 2 steps
        if (this.stepIndex % 2 === 0) {
          const bOsc = this.ctx.createOscillator();
          const bG = this.ctx.createGain();
          bOsc.type = 'sine';
          const bNote = bassNotes[Math.floor(this.stepIndex / 4) % bassNotes.length];
          bOsc.frequency.setValueAtTime(this.feverMode ? bNote * 1.25 : bNote, now);
          bG.gain.setValueAtTime(0.24, now);
          bG.gain.exponentialRampToValueAtTime(0.01, now + dur * 1.8);
          bOsc.connect(bG);
          bG.connect(this.bgmGain);
          bOsc.start(now);
          bOsc.stop(now + dur * 1.8);
        }
      }
      this.stepIndex++;
      this.bgmTimer = setTimeout(tick, this.feverMode ? 115 : 155);
    };
    tick();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  playJump(isDouble = false) {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sine';
    const startFreq = isDouble ? 420 : 280;
    const endFreq = isDouble ? 920 : 620;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.14);
    g.gain.setValueAtTime(0.32, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playSlide() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.11);
    g.gain.setValueAtTime(0.26, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playJelly(combo = 0, isGold = false) {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = isGold ? 'triangle' : 'sine';
    const base = isGold ? 987.77 : 660;
    const pitchBoost = Math.min(combo * 12, 420);
    osc.frequency.setValueAtTime(base + pitchBoost, now);
    osc.frequency.exponentialRampToValueAtTime(base + pitchBoost + (isGold ? 320 : 160), now + 0.08);
    g.gain.setValueAtTime(isGold ? 0.25 : 0.16, now);
    g.gain.exponentialRampToValueAtTime(0.008, now + 0.085);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.085);
  }

  playCoin() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    [987.77, 1318.51].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.045);
      g.gain.setValueAtTime(0.22, now + i * 0.045);
      g.gain.exponentialRampToValueAtTime(0.008, now + i * 0.045 + 0.09);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now + i * 0.045);
      osc.stop(now + i * 0.045 + 0.09);
    });
  }

  playPowerup() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.055);
      g.gain.setValueAtTime(0.28, now + i * 0.055);
      g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.055 + 0.14);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now + i * 0.055);
      osc.stop(now + i * 0.055 + 0.14);
    });
  }

  playSkill() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const notes = [587.33, 783.99, 987.77, 1174.66, 1567.98];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.045);
      g.gain.setValueAtTime(0.22, now + i * 0.045);
      g.gain.exponentialRampToValueAtTime(0.008, now + i * 0.045 + 0.16);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now + i * 0.045);
      osc.stop(now + i * 0.045 + 0.16);
    });
  }

  playSmash() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(65, now + 0.18);
    g.gain.setValueAtTime(0.35, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.18);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playHit() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, now);
    osc.frequency.linearRampToValueAtTime(75, now + 0.25);
    g.gain.setValueAtTime(0.4, now);
    g.gain.exponentialRampToValueAtTime(0.01, now + 0.26);
    osc.connect(g);
    g.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playGameOver() {
    this.init();
    if (!this.ctx || this.muted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 493.88, 440.00, 392.00, 349.23];
    notes.forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.13);
      g.gain.setValueAtTime(0.3, now + i * 0.13);
      g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.13 + 0.22);
      osc.connect(g);
      g.connect(this.sfxGain);
      osc.start(now + i * 0.13);
      osc.stop(now + i * 0.13 + 0.22);
    });
  }
}
