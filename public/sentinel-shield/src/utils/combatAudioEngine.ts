class CombatAudioEngine {
  constructor() {
    this.ctx = null;
    this.isRunning = false;
    this.isMuted = false;
    this.masterGain = null;
    this.loopInterval = null;
    this.rotorOsc = null;
    this.rotorGain = null;
  }
  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.45, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }
  setMuted(muted) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.45, this.ctx.currentTime);
    }
  }
  getMuted() {
    return this.isMuted;
  }
  // Starts the 20-second combat battle soundscape
  startCombatAudio() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isRunning) return;
    this.isRunning = true;
    try {
      this.rotorOsc = this.ctx.createOscillator();
      this.rotorGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      this.rotorOsc.type = "sawtooth";
      this.rotorOsc.frequency.setValueAtTime(65, this.ctx.currentTime);
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(140, this.ctx.currentTime);
      this.rotorGain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      this.rotorOsc.connect(filter);
      filter.connect(this.rotorGain);
      this.rotorGain.connect(this.masterGain);
      this.rotorOsc.start();
    } catch (e) {
      console.warn("Rotor audio error", e);
    }
    this.loopInterval = window.setInterval(() => {
      if (!this.ctx || !this.masterGain) return;
      const roll = Math.random();
      if (roll < 0.4) {
        this.playKineticBurst();
      } else if (roll < 0.75) {
        this.playLaserFire();
      } else {
        this.playDistantExplosion();
      }
    }, 450);
  }
  // Play rapid kinetic battle bursts
  playKineticBurst() {
    if (!this.ctx || !this.masterGain) return;
    const count = 3 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(180 + Math.random() * 80, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.05);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 0.06);
      }, i * 75);
    }
  }
  // Play high-energy laser zap
  playLaserFire() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.15);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.17);
  }
  // Play deep explosive thud
  playDistantExplosion() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.4);
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.48);
  }
  // Stops combat battle audio
  stopCombatAudio() {
    this.isRunning = false;
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
      this.loopInterval = null;
    }
    if (this.rotorOsc) {
      try {
        this.rotorOsc.stop();
        this.rotorOsc.disconnect();
      } catch (e) {
      }
      this.rotorOsc = null;
    }
  }
  // Plays the serene, heavenly victorious chime when desant finishes and screen brightens
  playVictorySunbeamChime() {
    this.stopCombatAudio();
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const chords = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx || !this.masterGain) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.28, now + 0.15);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 2.5);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(now);
        osc.stop(now + 2.6);
      }, idx * 160);
    });
  }
}
export const combatAudio = new CombatAudioEngine();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbWJhdEF1ZGlvRW5naW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFdlYiBBdWRpbyBwcm9jZWR1cmFsIGNvbWJhdCBiYXR0bGUgc291bmQgZ2VuZXJhdG9yXG4vLyBaZXJvIGV4dGVybmFsIGRlcGVuZGVuY2llcywgemVybyA0MDQgcmlzaywgMCBtcyBsYXRlbmN5XG5cbmNsYXNzIENvbWJhdEF1ZGlvRW5naW5lIHtcbiAgcHJpdmF0ZSBjdHg6IEF1ZGlvQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGlzUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGlzTXV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBtYXN0ZXJHYWluOiBHYWluTm9kZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxvb3BJbnRlcnZhbDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcm90b3JPc2M6IE9zY2lsbGF0b3JOb2RlIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgcm90b3JHYWluOiBHYWluTm9kZSB8IG51bGwgPSBudWxsO1xuXG4gIHByaXZhdGUgaW5pdENvbnRleHQoKSB7XG4gICAgaWYgKCF0aGlzLmN0eCkge1xuICAgICAgY29uc3QgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgdW5rbm93biBhcyB7IHdlYmtpdEF1ZGlvQ29udGV4dDogdHlwZW9mIEF1ZGlvQ29udGV4dCB9KS53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICBpZiAoQXVkaW9DdHgpIHtcbiAgICAgICAgdGhpcy5jdHggPSBuZXcgQXVkaW9DdHgoKTtcbiAgICAgICAgdGhpcy5tYXN0ZXJHYWluID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuICAgICAgICB0aGlzLm1hc3RlckdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSh0aGlzLmlzTXV0ZWQgPyAwIDogMC40NSwgdGhpcy5jdHguY3VycmVudFRpbWUpO1xuICAgICAgICB0aGlzLm1hc3RlckdhaW4uY29ubmVjdCh0aGlzLmN0eC5kZXN0aW5hdGlvbik7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmN0eCAmJiB0aGlzLmN0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgIHRoaXMuY3R4LnJlc3VtZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXRNdXRlZChtdXRlZDogYm9vbGVhbikge1xuICAgIHRoaXMuaXNNdXRlZCA9IG11dGVkO1xuICAgIGlmICh0aGlzLm1hc3RlckdhaW4gJiYgdGhpcy5jdHgpIHtcbiAgICAgIHRoaXMubWFzdGVyR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKG11dGVkID8gMCA6IDAuNDUsIHRoaXMuY3R4LmN1cnJlbnRUaW1lKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0TXV0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNNdXRlZDtcbiAgfVxuXG4gIC8vIFN0YXJ0cyB0aGUgMjAtc2Vjb25kIGNvbWJhdCBiYXR0bGUgc291bmRzY2FwZVxuICBwdWJsaWMgc3RhcnRDb21iYXRBdWRpbygpIHtcbiAgICB0aGlzLmluaXRDb250ZXh0KCk7XG4gICAgaWYgKCF0aGlzLmN0eCB8fCAhdGhpcy5tYXN0ZXJHYWluIHx8IHRoaXMuaXNSdW5uaW5nKSByZXR1cm47XG4gICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuXG4gICAgLy8gMS4gRHJvcHNoaXAgLyBSb3RvciBIdW1cbiAgICB0cnkge1xuICAgICAgdGhpcy5yb3Rvck9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIHRoaXMucm90b3JHYWluID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuICAgICAgY29uc3QgZmlsdGVyID0gdGhpcy5jdHguY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG5cbiAgICAgIHRoaXMucm90b3JPc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICB0aGlzLnJvdG9yT3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg2NSwgdGhpcy5jdHguY3VycmVudFRpbWUpO1xuXG4gICAgICBmaWx0ZXIudHlwZSA9ICdsb3dwYXNzJztcbiAgICAgIGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQwLCB0aGlzLmN0eC5jdXJyZW50VGltZSk7XG5cbiAgICAgIHRoaXMucm90b3JHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4yLCB0aGlzLmN0eC5jdXJyZW50VGltZSk7XG5cbiAgICAgIHRoaXMucm90b3JPc2MuY29ubmVjdChmaWx0ZXIpO1xuICAgICAgZmlsdGVyLmNvbm5lY3QodGhpcy5yb3RvckdhaW4pO1xuICAgICAgdGhpcy5yb3RvckdhaW4uY29ubmVjdCh0aGlzLm1hc3RlckdhaW4pO1xuXG4gICAgICB0aGlzLnJvdG9yT3NjLnN0YXJ0KCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS53YXJuKCdSb3RvciBhdWRpbyBlcnJvcicsIGUpO1xuICAgIH1cblxuICAgIC8vIDIuIEJhdHRsZSBGWCBUcmlnZ2VyIEludGVydmFsIChHdW5maXJlLCBMYXNlcnMsIEV4cGxvc2lvbnMpXG4gICAgdGhpcy5sb29wSW50ZXJ2YWwgPSB3aW5kb3cuc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLmN0eCB8fCAhdGhpcy5tYXN0ZXJHYWluKSByZXR1cm47XG4gICAgICBjb25zdCByb2xsID0gTWF0aC5yYW5kb20oKTtcblxuICAgICAgaWYgKHJvbGwgPCAwLjQpIHtcbiAgICAgICAgdGhpcy5wbGF5S2luZXRpY0J1cnN0KCk7XG4gICAgICB9IGVsc2UgaWYgKHJvbGwgPCAwLjc1KSB7XG4gICAgICAgIHRoaXMucGxheUxhc2VyRmlyZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wbGF5RGlzdGFudEV4cGxvc2lvbigpO1xuICAgICAgfVxuICAgIH0sIDQ1MCk7XG4gIH1cblxuICAvLyBQbGF5IHJhcGlkIGtpbmV0aWMgYmF0dGxlIGJ1cnN0c1xuICBwcml2YXRlIHBsYXlLaW5ldGljQnVyc3QoKSB7XG4gICAgaWYgKCF0aGlzLmN0eCB8fCAhdGhpcy5tYXN0ZXJHYWluKSByZXR1cm47XG4gICAgY29uc3QgY291bnQgPSAzICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb3VudDsgaSsrKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmN0eCB8fCAhdGhpcy5tYXN0ZXJHYWluKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMuY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgICBjb25zdCBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IGdhaW4gPSB0aGlzLmN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3NxdWFyZSc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTgwICsgTWF0aC5yYW5kb20oKSAqIDgwLCBub3cpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoNDAsIG5vdyArIDAuMDUpO1xuXG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjI1LCBub3cpO1xuICAgICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAxLCBub3cgKyAwLjA1KTtcblxuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KHRoaXMubWFzdGVyR2Fpbik7XG4gICAgICAgIG9zYy5zdGFydChub3cpO1xuICAgICAgICBvc2Muc3RvcChub3cgKyAwLjA2KTtcbiAgICAgIH0sIGkgKiA3NSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUGxheSBoaWdoLWVuZXJneSBsYXNlciB6YXBcbiAgcHJpdmF0ZSBwbGF5TGFzZXJGaXJlKCkge1xuICAgIGlmICghdGhpcy5jdHggfHwgIXRoaXMubWFzdGVyR2FpbikgcmV0dXJuO1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuY3R4LmN1cnJlbnRUaW1lO1xuICAgIGNvbnN0IG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICBjb25zdCBnYWluID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuXG4gICAgb3NjLnR5cGUgPSAnc2F3dG9vdGgnO1xuICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQwMCwgbm93KTtcbiAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMTIwLCBub3cgKyAwLjE1KTtcblxuICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjIsIG5vdyk7XG4gICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMSwgbm93ICsgMC4xNik7XG5cbiAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICBnYWluLmNvbm5lY3QodGhpcy5tYXN0ZXJHYWluKTtcbiAgICBvc2Muc3RhcnQobm93KTtcbiAgICBvc2Muc3RvcChub3cgKyAwLjE3KTtcbiAgfVxuXG4gIC8vIFBsYXkgZGVlcCBleHBsb3NpdmUgdGh1ZFxuICBwcml2YXRlIHBsYXlEaXN0YW50RXhwbG9zaW9uKCkge1xuICAgIGlmICghdGhpcy5jdHggfHwgIXRoaXMubWFzdGVyR2FpbikgcmV0dXJuO1xuICAgIGNvbnN0IG5vdyA9IHRoaXMuY3R4LmN1cnJlbnRUaW1lO1xuICAgIGNvbnN0IG9zYyA9IHRoaXMuY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICBjb25zdCBnYWluID0gdGhpcy5jdHguY3JlYXRlR2FpbigpO1xuXG4gICAgb3NjLnR5cGUgPSAnc2luZSc7XG4gICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg5MCwgbm93KTtcbiAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjUsIG5vdyArIDAuNCk7XG5cbiAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC40LCBub3cpO1xuICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDEsIG5vdyArIDAuNDUpO1xuXG4gICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgZ2Fpbi5jb25uZWN0KHRoaXMubWFzdGVyR2Fpbik7XG4gICAgb3NjLnN0YXJ0KG5vdyk7XG4gICAgb3NjLnN0b3Aobm93ICsgMC40OCk7XG4gIH1cblxuICAvLyBTdG9wcyBjb21iYXQgYmF0dGxlIGF1ZGlvXG4gIHB1YmxpYyBzdG9wQ29tYmF0QXVkaW8oKSB7XG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5sb29wSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5sb29wSW50ZXJ2YWwpO1xuICAgICAgdGhpcy5sb29wSW50ZXJ2YWwgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5yb3Rvck9zYykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5yb3Rvck9zYy5zdG9wKCk7XG4gICAgICAgIHRoaXMucm90b3JPc2MuZGlzY29ubmVjdCgpO1xuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgIHRoaXMucm90b3JPc2MgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIFBsYXlzIHRoZSBzZXJlbmUsIGhlYXZlbmx5IHZpY3RvcmlvdXMgY2hpbWUgd2hlbiBkZXNhbnQgZmluaXNoZXMgYW5kIHNjcmVlbiBicmlnaHRlbnNcbiAgcHVibGljIHBsYXlWaWN0b3J5U3VuYmVhbUNoaW1lKCkge1xuICAgIHRoaXMuc3RvcENvbWJhdEF1ZGlvKCk7XG4gICAgdGhpcy5pbml0Q29udGV4dCgpO1xuICAgIGlmICghdGhpcy5jdHggfHwgIXRoaXMubWFzdGVyR2FpbikgcmV0dXJuO1xuXG4gICAgY29uc3QgY2hvcmRzID0gWzUyMy4yNSwgNjU5LjI1LCA3ODMuOTksIDEwNDYuNTAsIDEzMTguNTFdOyAvLyBDNSwgRTUsIEc1LCBDNiwgRTZcbiAgICBjaG9yZHMuZm9yRWFjaCgoZnJlcSwgaWR4KSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKCF0aGlzLmN0eCB8fCAhdGhpcy5tYXN0ZXJHYWluKSByZXR1cm47XG4gICAgICAgIGNvbnN0IG5vdyA9IHRoaXMuY3R4LmN1cnJlbnRUaW1lO1xuICAgICAgICBjb25zdCBvc2MgPSB0aGlzLmN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IGdhaW4gPSB0aGlzLmN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgICAgb3NjLnR5cGUgPSAnc2luZSc7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgbm93KTtcblxuICAgICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMSwgbm93KTtcbiAgICAgICAgZ2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMjgsIG5vdyArIDAuMTUpO1xuICAgICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgbm93ICsgMi41KTtcblxuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KHRoaXMubWFzdGVyR2Fpbik7XG4gICAgICAgIG9zYy5zdGFydChub3cpO1xuICAgICAgICBvc2Muc3RvcChub3cgKyAyLjYpO1xuICAgICAgfSwgaWR4ICogMTYwKTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgY29tYmF0QXVkaW8gPSBuZXcgQ29tYmF0QXVkaW9FbmdpbmUoKTtcbiJdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxrQkFBa0I7QUFBQSxFQUF4QjtBQUNFLFNBQVEsTUFBMkI7QUFDbkMsU0FBUSxZQUFxQjtBQUM3QixTQUFRLFVBQW1CO0FBQzNCLFNBQVEsYUFBOEI7QUFDdEMsU0FBUSxlQUE4QjtBQUN0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