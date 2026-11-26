import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
class AcousticAlertEngine {
  constructor() {
    this.audioCtx = null;
    this.settings = {
      enabled: true,
      volume: 0.35,
      profile: "HAPTIC_SUB_PULSE",
      hapticVibrationFallback: true,
      lowPassCutoffHz: 180
    };
    this.recentAlerts = [];
    this.listeners = /* @__PURE__ */ new Set();
    this.isCurrentlyPlaying = false;
    this.unlockAudioHandlerBound = false;
    this.loadSettings();
    this.setupAudioAutoplayUnlock();
  }
  static getInstance() {
    if (!AcousticAlertEngine.instance) {
      AcousticAlertEngine.instance = new AcousticAlertEngine();
    }
    return AcousticAlertEngine.instance;
  }
  loadSettings() {
    try {
      const saved = safeStorage.get("sentinel_acoustic_alert_settings", {});
      this.settings = {
        ...this.settings,
        ...saved
      };
      const savedAlerts = safeStorage.get("sentinel_recent_acoustic_alerts", []);
      this.recentAlerts = savedAlerts.slice(0, 20);
    } catch {
    }
  }
  saveSettings() {
    safeStorage.set("sentinel_acoustic_alert_settings", this.settings);
    safeStorage.set("sentinel_recent_acoustic_alerts", this.recentAlerts.slice(0, 20));
  }
  /**
   * Lazily initialize or resume AudioContext following standard Web Audio API lifecycle
   */
  getAudioContext() {
    if (typeof window === "undefined") return null;
    try {
      if (!this.audioCtx) {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        if (AudioCtxClass) {
          this.audioCtx = new AudioCtxClass();
        }
      }
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().catch(() => {
        });
      }
      return this.audioCtx;
    } catch {
      return null;
    }
  }
  setupAudioAutoplayUnlock() {
    if (typeof window === "undefined" || this.unlockAudioHandlerBound) return;
    const unlock = () => {
      if (this.audioCtx && this.audioCtx.state === "suspended") {
        this.audioCtx.resume().then(() => {
          window.removeEventListener("click", unlock);
          window.removeEventListener("keydown", unlock);
          window.removeEventListener("touchstart", unlock);
        }).catch(() => {
        });
      }
    };
    window.addEventListener("click", unlock, { once: true, passive: true });
    window.addEventListener("keydown", unlock, { once: true, passive: true });
    window.addEventListener("touchstart", unlock, { once: true, passive: true });
    this.unlockAudioHandlerBound = true;
  }
  /**
   * Plays a non-intrusive, low-frequency haptic tone or alarm through the Web Audio API.
   * Tailored with a soft attack, smooth exponential decay, and low-pass filter to eliminate
   * high-frequency piercing tones and speaker pops, delivering a warm tactile feedback.
   */
  triggerAcousticAlert(threatName = "High-Threat Process Launch", pid, threatLevel = "HIGH") {
    if (!this.settings.enabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;
    if (this.settings.hapticVibrationFallback && typeof navigator !== "undefined" && "vibrate" in navigator) {
      try {
        navigator.vibrate([40, 60, 40]);
      } catch {
      }
    }
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    const lowPassFilter = ctx.createBiquadFilter();
    lowPassFilter.type = "lowpass";
    lowPassFilter.frequency.setValueAtTime(this.settings.lowPassCutoffHz, now);
    lowPassFilter.Q.setValueAtTime(1.2, now);
    const targetGain = Math.max(0.01, Math.min(0.6, this.settings.volume));
    masterGain.gain.setValueAtTime(1e-4, now);
    let fundamentalFreq = 58;
    switch (this.settings.profile) {
      case "HAPTIC_SUB_PULSE": {
        fundamentalFreq = 58;
        const oscSub = ctx.createOscillator();
        const oscHarmonic = ctx.createOscillator();
        const subGain = ctx.createGain();
        const harmonicGain = ctx.createGain();
        oscSub.type = "sine";
        oscSub.frequency.setValueAtTime(58, now);
        oscSub.frequency.exponentialRampToValueAtTime(42, now + 0.35);
        oscHarmonic.type = "triangle";
        oscHarmonic.frequency.setValueAtTime(116, now);
        oscHarmonic.frequency.exponentialRampToValueAtTime(84, now + 0.35);
        masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.02);
        masterGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.42);
        subGain.gain.setValueAtTime(0.85, now);
        harmonicGain.gain.setValueAtTime(0.15, now);
        oscSub.connect(subGain);
        oscHarmonic.connect(harmonicGain);
        subGain.connect(lowPassFilter);
        harmonicGain.connect(lowPassFilter);
        lowPassFilter.connect(masterGain);
        masterGain.connect(ctx.destination);
        oscSub.start(now);
        oscHarmonic.start(now);
        oscSub.stop(now + 0.45);
        oscHarmonic.stop(now + 0.45);
        break;
      }
      case "LOW_RESONANT_CHIME": {
        fundamentalFreq = 73;
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const g1 = ctx.createGain();
        const g2 = ctx.createGain();
        osc1.type = "sine";
        osc1.frequency.setValueAtTime(73.4, now);
        osc2.type = "sine";
        osc2.frequency.setValueAtTime(146.8, now);
        masterGain.gain.linearRampToValueAtTime(targetGain * 0.9, now + 0.025);
        masterGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.55);
        g1.gain.setValueAtTime(0.75, now);
        g2.gain.setValueAtTime(0.25, now);
        osc1.connect(g1);
        osc2.connect(g2);
        g1.connect(lowPassFilter);
        g2.connect(lowPassFilter);
        lowPassFilter.connect(masterGain);
        masterGain.connect(ctx.destination);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.6);
        osc2.stop(now + 0.6);
        break;
      }
      case "SUB_TACTILE_HEARTBEAT": {
        fundamentalFreq = 52;
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(52, now);
        masterGain.gain.linearRampToValueAtTime(targetGain * 0.8, now + 0.015);
        masterGain.gain.exponentialRampToValueAtTime(1e-3, now + 0.14);
        masterGain.gain.linearRampToValueAtTime(targetGain, now + 0.22);
        masterGain.gain.exponentialRampToValueAtTime(1e-4, now + 0.45);
        osc.connect(lowPassFilter);
        lowPassFilter.connect(masterGain);
        masterGain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.48);
        break;
      }
    }
    this.isCurrentlyPlaying = true;
    setTimeout(() => {
      this.isCurrentlyPlaying = false;
      this.notify();
    }, 450);
    const event = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      threatName,
      pid,
      threatLevel,
      profileUsed: this.settings.profile,
      fundamentalFreqHz: fundamentalFreq
    };
    this.recentAlerts.unshift(event);
    if (this.recentAlerts.length > 20) {
      this.recentAlerts = this.recentAlerts.slice(0, 20);
    }
    this.saveSettings();
    this.notify();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:acoustic-alert-triggered", { detail: event }));
    }
  }
  /**
   * Preview / Test the acoustic alert instantly with one click
   */
  playTestAlert() {
    this.triggerAcousticAlert("Symulacja Czujnika Gnid (Test Haptyczny)", 1337, "HIGH");
  }
  setEnabled(enabled) {
    this.settings.enabled = enabled;
    this.saveSettings();
    this.notify();
  }
  setVolume(volume) {
    this.settings.volume = Math.max(0, Math.min(1, volume));
    this.saveSettings();
    this.notify();
  }
  setProfile(profile) {
    this.settings.profile = profile;
    this.saveSettings();
    this.notify();
    this.triggerAcousticAlert(`Wybrano profil: ${profile}`, void 0, "ELEVATED");
  }
  setLowPassCutoff(cutoffHz) {
    this.settings.lowPassCutoffHz = Math.max(80, Math.min(500, cutoffHz));
    this.saveSettings();
    this.notify();
  }
  getSettings() {
    return { ...this.settings };
  }
  getRecentAlerts() {
    return [...this.recentAlerts];
  }
  isPlaying() {
    return this.isCurrentlyPlaying;
  }
  clearHistory() {
    this.recentAlerts = [];
    this.saveSettings();
    this.notify();
  }
  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getRecentAlerts(), this.getSettings(), this.isPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }
  notify() {
    const alerts = this.getRecentAlerts();
    const settings = this.getSettings();
    const playing = this.isPlaying();
    this.listeners.forEach((listener) => listener(alerts, settings, playing));
  }
}
export const acousticAlertEngine = AcousticAlertEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFjb3VzdGljQWxlcnRTeXN0ZW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuL3NlbGZSZXBhaXJTeXN0ZW0nO1xuXG5leHBvcnQgdHlwZSBBY291c3RpY1RvbmVQcm9maWxlID0gJ0hBUFRJQ19TVUJfUFVMU0UnIHwgJ0xPV19SRVNPTkFOVF9DSElNRScgfCAnU1VCX1RBQ1RJTEVfSEVBUlRCRUFUJztcblxuZXhwb3J0IGludGVyZmFjZSBBY291c3RpY0FsZXJ0RXZlbnQge1xuICBpZDogc3RyaW5nO1xuICB0aW1lc3RhbXA6IHN0cmluZztcbiAgdGhyZWF0TmFtZTogc3RyaW5nO1xuICBwaWQ/OiBudW1iZXI7XG4gIHRocmVhdExldmVsOiAnQ1JJVElDQUwnIHwgJ0hJR0gnIHwgJ0VMRVZBVEVEJztcbiAgcHJvZmlsZVVzZWQ6IEFjb3VzdGljVG9uZVByb2ZpbGU7XG4gIGZ1bmRhbWVudGFsRnJlcUh6OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWNvdXN0aWNBbGVydFNldHRpbmdzIHtcbiAgZW5hYmxlZDogYm9vbGVhbjtcbiAgdm9sdW1lOiBudW1iZXI7IC8vIDAuMCB0byAxLjBcbiAgcHJvZmlsZTogQWNvdXN0aWNUb25lUHJvZmlsZTtcbiAgaGFwdGljVmlicmF0aW9uRmFsbGJhY2s6IGJvb2xlYW47XG4gIGxvd1Bhc3NDdXRvZmZIejogbnVtYmVyO1xufVxuXG5jbGFzcyBBY291c3RpY0FsZXJ0RW5naW5lIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEFjb3VzdGljQWxlcnRFbmdpbmU7XG4gIHByaXZhdGUgYXVkaW9DdHg6IEF1ZGlvQ29udGV4dCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNldHRpbmdzOiBBY291c3RpY0FsZXJ0U2V0dGluZ3MgPSB7XG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICB2b2x1bWU6IDAuMzUsXG4gICAgcHJvZmlsZTogJ0hBUFRJQ19TVUJfUFVMU0UnLFxuICAgIGhhcHRpY1ZpYnJhdGlvbkZhbGxiYWNrOiB0cnVlLFxuICAgIGxvd1Bhc3NDdXRvZmZIejogMTgwLFxuICB9O1xuICBwcml2YXRlIHJlY2VudEFsZXJ0czogQWNvdXN0aWNBbGVydEV2ZW50W10gPSBbXTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IFNldDwoYWxlcnRzOiBBY291c3RpY0FsZXJ0RXZlbnRbXSwgc2V0dGluZ3M6IEFjb3VzdGljQWxlcnRTZXR0aW5ncywgaXNQbGF5aW5nOiBib29sZWFuKSA9PiB2b2lkPiA9IG5ldyBTZXQoKTtcbiAgcHJpdmF0ZSBpc0N1cnJlbnRseVBsYXlpbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB1bmxvY2tBdWRpb0hhbmRsZXJCb3VuZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2FkU2V0dGluZ3MoKTtcbiAgICB0aGlzLnNldHVwQXVkaW9BdXRvcGxheVVubG9jaygpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBBY291c3RpY0FsZXJ0RW5naW5lIHtcbiAgICBpZiAoIUFjb3VzdGljQWxlcnRFbmdpbmUuaW5zdGFuY2UpIHtcbiAgICAgIEFjb3VzdGljQWxlcnRFbmdpbmUuaW5zdGFuY2UgPSBuZXcgQWNvdXN0aWNBbGVydEVuZ2luZSgpO1xuICAgIH1cbiAgICByZXR1cm4gQWNvdXN0aWNBbGVydEVuZ2luZS5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFNldHRpbmdzKCk6IHZvaWQge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZCA9IHNhZmVTdG9yYWdlLmdldDxQYXJ0aWFsPEFjb3VzdGljQWxlcnRTZXR0aW5ncz4+KCdzZW50aW5lbF9hY291c3RpY19hbGVydF9zZXR0aW5ncycsIHt9KTtcbiAgICAgIHRoaXMuc2V0dGluZ3MgPSB7XG4gICAgICAgIC4uLnRoaXMuc2V0dGluZ3MsXG4gICAgICAgIC4uLnNhdmVkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHNhdmVkQWxlcnRzID0gc2FmZVN0b3JhZ2UuZ2V0PEFjb3VzdGljQWxlcnRFdmVudFtdPignc2VudGluZWxfcmVjZW50X2Fjb3VzdGljX2FsZXJ0cycsIFtdKTtcbiAgICAgIHRoaXMucmVjZW50QWxlcnRzID0gc2F2ZWRBbGVydHMuc2xpY2UoMCwgMjApO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gc2FmZSBmYWxsYmFja1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVNldHRpbmdzKCk6IHZvaWQge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfYWNvdXN0aWNfYWxlcnRfc2V0dGluZ3MnLCB0aGlzLnNldHRpbmdzKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JlY2VudF9hY291c3RpY19hbGVydHMnLCB0aGlzLnJlY2VudEFsZXJ0cy5zbGljZSgwLCAyMCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIExhemlseSBpbml0aWFsaXplIG9yIHJlc3VtZSBBdWRpb0NvbnRleHQgZm9sbG93aW5nIHN0YW5kYXJkIFdlYiBBdWRpbyBBUEkgbGlmZWN5Y2xlXG4gICAqL1xuICBwcml2YXRlIGdldEF1ZGlvQ29udGV4dCgpOiBBdWRpb0NvbnRleHQgfCBudWxsIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBudWxsO1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXRoaXMuYXVkaW9DdHgpIHtcbiAgICAgICAgY29uc3QgQXVkaW9DdHhDbGFzcyA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyB1bmtub3duIGFzIHsgd2Via2l0QXVkaW9Db250ZXh0OiB0eXBlb2YgQXVkaW9Db250ZXh0IH0pLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgICAgaWYgKEF1ZGlvQ3R4Q2xhc3MpIHtcbiAgICAgICAgICB0aGlzLmF1ZGlvQ3R4ID0gbmV3IEF1ZGlvQ3R4Q2xhc3MoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXVkaW9DdHggJiYgdGhpcy5hdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgdGhpcy5hdWRpb0N0eC5yZXN1bWUoKS5jYXRjaCgoKSA9PiB7fSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5hdWRpb0N0eDtcbiAgICB9IGNhdGNoIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0dXBBdWRpb0F1dG9wbGF5VW5sb2NrKCk6IHZvaWQge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0aGlzLnVubG9ja0F1ZGlvSGFuZGxlckJvdW5kKSByZXR1cm47XG4gICAgY29uc3QgdW5sb2NrID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuYXVkaW9DdHggJiYgdGhpcy5hdWRpb0N0eC5zdGF0ZSA9PT0gJ3N1c3BlbmRlZCcpIHtcbiAgICAgICAgdGhpcy5hdWRpb0N0eC5yZXN1bWUoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1bmxvY2spO1xuICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdW5sb2NrKTtcbiAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHVubG9jayk7XG4gICAgICAgIH0pLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVubG9jaywgeyBvbmNlOiB0cnVlLCBwYXNzaXZlOiB0cnVlIH0pO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdW5sb2NrLCB7IG9uY2U6IHRydWUsIHBhc3NpdmU6IHRydWUgfSk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB1bmxvY2ssIHsgb25jZTogdHJ1ZSwgcGFzc2l2ZTogdHJ1ZSB9KTtcbiAgICB0aGlzLnVubG9ja0F1ZGlvSGFuZGxlckJvdW5kID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQbGF5cyBhIG5vbi1pbnRydXNpdmUsIGxvdy1mcmVxdWVuY3kgaGFwdGljIHRvbmUgb3IgYWxhcm0gdGhyb3VnaCB0aGUgV2ViIEF1ZGlvIEFQSS5cbiAgICogVGFpbG9yZWQgd2l0aCBhIHNvZnQgYXR0YWNrLCBzbW9vdGggZXhwb25lbnRpYWwgZGVjYXksIGFuZCBsb3ctcGFzcyBmaWx0ZXIgdG8gZWxpbWluYXRlXG4gICAqIGhpZ2gtZnJlcXVlbmN5IHBpZXJjaW5nIHRvbmVzIGFuZCBzcGVha2VyIHBvcHMsIGRlbGl2ZXJpbmcgYSB3YXJtIHRhY3RpbGUgZmVlZGJhY2suXG4gICAqL1xuICBwdWJsaWMgdHJpZ2dlckFjb3VzdGljQWxlcnQoXG4gICAgdGhyZWF0TmFtZTogc3RyaW5nID0gJ0hpZ2gtVGhyZWF0IFByb2Nlc3MgTGF1bmNoJyxcbiAgICBwaWQ/OiBudW1iZXIsXG4gICAgdGhyZWF0TGV2ZWw6ICdDUklUSUNBTCcgfCAnSElHSCcgfCAnRUxFVkFURUQnID0gJ0hJR0gnXG4gICk6IHZvaWQge1xuICAgIGlmICghdGhpcy5zZXR0aW5ncy5lbmFibGVkKSByZXR1cm47XG5cbiAgICBjb25zdCBjdHggPSB0aGlzLmdldEF1ZGlvQ29udGV4dCgpO1xuICAgIGlmICghY3R4KSByZXR1cm47XG5cbiAgICAvLyBPcHRpb25hbCBicm93c2VyIHZpYnJhdGlvbiBBUEkgZm9yIHRhY3RpbGUgaGFwdGljIHN5bmMgb24gc3VwcG9ydGVkIGRldmljZXNcbiAgICBpZiAodGhpcy5zZXR0aW5ncy5oYXB0aWNWaWJyYXRpb25GYWxsYmFjayAmJiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiAndmlicmF0ZScgaW4gbmF2aWdhdG9yKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuYXZpZ2F0b3IudmlicmF0ZShbNDAsIDYwLCA0MF0pO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGlnbm9yZSBpZiBub3QgYWxsb3dlZFxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IGN0eC5jdXJyZW50VGltZTtcbiAgICBjb25zdCBtYXN0ZXJHYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICBjb25zdCBsb3dQYXNzRmlsdGVyID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuXG4gICAgLy8gTG93LXBhc3MgZmlsdGVyIHRvIGd1YXJhbnRlZSB6ZXJvIHBpZXJjaW5nIGhpZ2gtZnJlcXVlbmN5IG5vaXNlXG4gICAgbG93UGFzc0ZpbHRlci50eXBlID0gJ2xvd3Bhc3MnO1xuICAgIGxvd1Bhc3NGaWx0ZXIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKHRoaXMuc2V0dGluZ3MubG93UGFzc0N1dG9mZkh6LCBub3cpO1xuICAgIGxvd1Bhc3NGaWx0ZXIuUS5zZXRWYWx1ZUF0VGltZSgxLjIsIG5vdyk7XG5cbiAgICAvLyBNYXN0ZXIgdm9sdW1lIHdpdGggc21vb3RoIGVudmVsb3BlXG4gICAgY29uc3QgdGFyZ2V0R2FpbiA9IE1hdGgubWF4KDAuMDEsIE1hdGgubWluKDAuNiwgdGhpcy5zZXR0aW5ncy52b2x1bWUpKTtcbiAgICBtYXN0ZXJHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4wMDAxLCBub3cpO1xuXG4gICAgbGV0IGZ1bmRhbWVudGFsRnJlcSA9IDU4O1xuXG4gICAgc3dpdGNoICh0aGlzLnNldHRpbmdzLnByb2ZpbGUpIHtcbiAgICAgIGNhc2UgJ0hBUFRJQ19TVUJfUFVMU0UnOiB7XG4gICAgICAgIC8vIERlZXAgdGFjdGlsZSB0aHVtcDogNThIeiBkcm9wcGluZyBzbW9vdGhseSB0byA0NEh6IChmZWVscyBsaWtlIGFuIGludGVudGlvbmFsIGhhcHRpYyBtb3RvciBwdWxzZSlcbiAgICAgICAgZnVuZGFtZW50YWxGcmVxID0gNTg7XG4gICAgICAgIGNvbnN0IG9zY1N1YiA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IG9zY0hhcm1vbmljID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3Qgc3ViR2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIGNvbnN0IGhhcm1vbmljR2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgICAgb3NjU3ViLnR5cGUgPSAnc2luZSc7XG4gICAgICAgIG9zY1N1Yi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNTgsIG5vdyk7XG4gICAgICAgIG9zY1N1Yi5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSg0Miwgbm93ICsgMC4zNSk7XG5cbiAgICAgICAgb3NjSGFybW9uaWMudHlwZSA9ICd0cmlhbmdsZSc7XG4gICAgICAgIG9zY0hhcm1vbmljLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgxMTYsIG5vdyk7XG4gICAgICAgIG9zY0hhcm1vbmljLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDg0LCBub3cgKyAwLjM1KTtcblxuICAgICAgICAvLyBTb2Z0IGF0dGFjayAoMTVtcykgcHJldmVudHMgY2xpY2tzLCBleHBvbmVudGlhbCBkZWNheSAoMzgwbXMpXG4gICAgICAgIG1hc3RlckdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSh0YXJnZXRHYWluLCBub3cgKyAwLjAyKTtcbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBub3cgKyAwLjQyKTtcblxuICAgICAgICBzdWJHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC44NSwgbm93KTtcbiAgICAgICAgaGFybW9uaWNHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4xNSwgbm93KTtcblxuICAgICAgICBvc2NTdWIuY29ubmVjdChzdWJHYWluKTtcbiAgICAgICAgb3NjSGFybW9uaWMuY29ubmVjdChoYXJtb25pY0dhaW4pO1xuICAgICAgICBzdWJHYWluLmNvbm5lY3QobG93UGFzc0ZpbHRlcik7XG4gICAgICAgIGhhcm1vbmljR2Fpbi5jb25uZWN0KGxvd1Bhc3NGaWx0ZXIpO1xuXG4gICAgICAgIGxvd1Bhc3NGaWx0ZXIuY29ubmVjdChtYXN0ZXJHYWluKTtcbiAgICAgICAgbWFzdGVyR2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgb3NjU3ViLnN0YXJ0KG5vdyk7XG4gICAgICAgIG9zY0hhcm1vbmljLnN0YXJ0KG5vdyk7XG4gICAgICAgIG9zY1N1Yi5zdG9wKG5vdyArIDAuNDUpO1xuICAgICAgICBvc2NIYXJtb25pYy5zdG9wKG5vdyArIDAuNDUpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnTE9XX1JFU09OQU5UX0NISU1FJzoge1xuICAgICAgICAvLyBXYXJtIGxvdyBhY291c3RpYyBjaGltZTogNzNIeiArIDE0Nkh6IHN1YnRsZSBoYXJtb25pYyB3aXRoIHNtb290aCBiZWxsLWxpa2UgZW52ZWxvcGVcbiAgICAgICAgZnVuZGFtZW50YWxGcmVxID0gNzM7XG4gICAgICAgIGNvbnN0IG9zYzEgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBvc2MyID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZzEgPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBjb25zdCBnMiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgICAgb3NjMS50eXBlID0gJ3NpbmUnO1xuICAgICAgICBvc2MxLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg3My40LCBub3cpOyAvLyBEMiBub3RlXG4gICAgICAgIG9zYzIudHlwZSA9ICdzaW5lJztcbiAgICAgICAgb3NjMi5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQ2LjgsIG5vdyk7IC8vIEQzIGhhcm1vbmljXG5cbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKHRhcmdldEdhaW4gKiAwLjksIG5vdyArIDAuMDI1KTtcbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBub3cgKyAwLjU1KTtcblxuICAgICAgICBnMS5nYWluLnNldFZhbHVlQXRUaW1lKDAuNzUsIG5vdyk7XG4gICAgICAgIGcyLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4yNSwgbm93KTtcblxuICAgICAgICBvc2MxLmNvbm5lY3QoZzEpO1xuICAgICAgICBvc2MyLmNvbm5lY3QoZzIpO1xuICAgICAgICBnMS5jb25uZWN0KGxvd1Bhc3NGaWx0ZXIpO1xuICAgICAgICBnMi5jb25uZWN0KGxvd1Bhc3NGaWx0ZXIpO1xuXG4gICAgICAgIGxvd1Bhc3NGaWx0ZXIuY29ubmVjdChtYXN0ZXJHYWluKTtcbiAgICAgICAgbWFzdGVyR2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgICAgb3NjMS5zdGFydChub3cpO1xuICAgICAgICBvc2MyLnN0YXJ0KG5vdyk7XG4gICAgICAgIG9zYzEuc3RvcChub3cgKyAwLjYpO1xuICAgICAgICBvc2MyLnN0b3Aobm93ICsgMC42KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ1NVQl9UQUNUSUxFX0hFQVJUQkVBVCc6IHtcbiAgICAgICAgLy8gRG91YmxlLWJlYXQgbG93LWZyZXF1ZW5jeSBwdWxzZSAobHViLWR1YiB0YWN0aWxlIGhlYXJ0YmVhdDogNTJIeilcbiAgICAgICAgZnVuZGFtZW50YWxGcmVxID0gNTI7XG4gICAgICAgIGNvbnN0IG9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIG9zYy50eXBlID0gJ3NpbmUnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDUyLCBub3cpO1xuXG4gICAgICAgIC8vIEJlYXQgMVxuICAgICAgICBtYXN0ZXJHYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUodGFyZ2V0R2FpbiAqIDAuOCwgbm93ICsgMC4wMTUpO1xuICAgICAgICBtYXN0ZXJHYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgbm93ICsgMC4xNCk7XG5cbiAgICAgICAgLy8gQmVhdCAyXG4gICAgICAgIG1hc3RlckdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSh0YXJnZXRHYWluLCBub3cgKyAwLjIyKTtcbiAgICAgICAgbWFzdGVyR2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBub3cgKyAwLjQ1KTtcblxuICAgICAgICBvc2MuY29ubmVjdChsb3dQYXNzRmlsdGVyKTtcbiAgICAgICAgbG93UGFzc0ZpbHRlci5jb25uZWN0KG1hc3RlckdhaW4pO1xuICAgICAgICBtYXN0ZXJHYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICBvc2Muc3RhcnQobm93KTtcbiAgICAgICAgb3NjLnN0b3Aobm93ICsgMC40OCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldCBwbGF5aW5nIHN0YXRlIGFuZCBzY2hlZHVsZSByZXNldFxuICAgIHRoaXMuaXNDdXJyZW50bHlQbGF5aW5nID0gdHJ1ZTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaXNDdXJyZW50bHlQbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH0sIDQ1MCk7XG5cbiAgICAvLyBSZWNvcmQgRXZlbnQgaW4gaGlzdG9yeVxuICAgIGNvbnN0IGV2ZW50OiBBY291c3RpY0FsZXJ0RXZlbnQgPSB7XG4gICAgICBpZDogYGFsZXJ0LSR7RGF0ZS5ub3coKX0tJHtNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgNCl9YCxcbiAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIHRocmVhdE5hbWUsXG4gICAgICBwaWQsXG4gICAgICB0aHJlYXRMZXZlbCxcbiAgICAgIHByb2ZpbGVVc2VkOiB0aGlzLnNldHRpbmdzLnByb2ZpbGUsXG4gICAgICBmdW5kYW1lbnRhbEZyZXFIejogZnVuZGFtZW50YWxGcmVxLFxuICAgIH07XG5cbiAgICB0aGlzLnJlY2VudEFsZXJ0cy51bnNoaWZ0KGV2ZW50KTtcbiAgICBpZiAodGhpcy5yZWNlbnRBbGVydHMubGVuZ3RoID4gMjApIHtcbiAgICAgIHRoaXMucmVjZW50QWxlcnRzID0gdGhpcy5yZWNlbnRBbGVydHMuc2xpY2UoMCwgMjApO1xuICAgIH1cbiAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICAvLyBCcm9hZGNhc3QgRE9NIGN1c3RvbSBldmVudCBmb3IgdmlzdWFsIHJpcHBsZSBmZWVkYmFjayBpbiBVSVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDphY291c3RpYy1hbGVydC10cmlnZ2VyZWQnLCB7IGRldGFpbDogZXZlbnQgfSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQcmV2aWV3IC8gVGVzdCB0aGUgYWNvdXN0aWMgYWxlcnQgaW5zdGFudGx5IHdpdGggb25lIGNsaWNrXG4gICAqL1xuICBwdWJsaWMgcGxheVRlc3RBbGVydCgpOiB2b2lkIHtcbiAgICB0aGlzLnRyaWdnZXJBY291c3RpY0FsZXJ0KCdTeW11bGFjamEgQ3p1am5pa2EgR25pZCAoVGVzdCBIYXB0eWN6bnkpJywgMTMzNywgJ0hJR0gnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLnNldHRpbmdzLmVuYWJsZWQgPSBlbmFibGVkO1xuICAgIHRoaXMuc2F2ZVNldHRpbmdzKCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRWb2x1bWUodm9sdW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldHRpbmdzLnZvbHVtZSA9IE1hdGgubWF4KDAuMCwgTWF0aC5taW4oMS4wLCB2b2x1bWUpKTtcbiAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0UHJvZmlsZShwcm9maWxlOiBBY291c3RpY1RvbmVQcm9maWxlKTogdm9pZCB7XG4gICAgdGhpcy5zZXR0aW5ncy5wcm9maWxlID0gcHJvZmlsZTtcbiAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gICAgLy8gUGxheSBzdWJ0bGUgcHJldmlldyBvZiBuZXcgcHJvZmlsZVxuICAgIHRoaXMudHJpZ2dlckFjb3VzdGljQWxlcnQoYFd5YnJhbm8gcHJvZmlsOiAke3Byb2ZpbGV9YCwgdW5kZWZpbmVkLCAnRUxFVkFURUQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMb3dQYXNzQ3V0b2ZmKGN1dG9mZkh6OiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNldHRpbmdzLmxvd1Bhc3NDdXRvZmZIeiA9IE1hdGgubWF4KDgwLCBNYXRoLm1pbig1MDAsIGN1dG9mZkh6KSk7XG4gICAgdGhpcy5zYXZlU2V0dGluZ3MoKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgcHVibGljIGdldFNldHRpbmdzKCk6IEFjb3VzdGljQWxlcnRTZXR0aW5ncyB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5zZXR0aW5ncyB9O1xuICB9XG5cbiAgcHVibGljIGdldFJlY2VudEFsZXJ0cygpOiBBY291c3RpY0FsZXJ0RXZlbnRbXSB7XG4gICAgcmV0dXJuIFsuLi50aGlzLnJlY2VudEFsZXJ0c107XG4gIH1cblxuICBwdWJsaWMgaXNQbGF5aW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmlzQ3VycmVudGx5UGxheWluZztcbiAgfVxuXG4gIHB1YmxpYyBjbGVhckhpc3RvcnkoKTogdm9pZCB7XG4gICAgdGhpcy5yZWNlbnRBbGVydHMgPSBbXTtcbiAgICB0aGlzLnNhdmVTZXR0aW5ncygpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKGxpc3RlbmVyOiAoYWxlcnRzOiBBY291c3RpY0FsZXJ0RXZlbnRbXSwgc2V0dGluZ3M6IEFjb3VzdGljQWxlcnRTZXR0aW5ncywgaXNQbGF5aW5nOiBib29sZWFuKSA9PiB2b2lkKTogKCkgPT4gdm9pZCB7XG4gICAgdGhpcy5saXN0ZW5lcnMuYWRkKGxpc3RlbmVyKTtcbiAgICBsaXN0ZW5lcih0aGlzLmdldFJlY2VudEFsZXJ0cygpLCB0aGlzLmdldFNldHRpbmdzKCksIHRoaXMuaXNQbGF5aW5nKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycy5kZWxldGUobGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpOiB2b2lkIHtcbiAgICBjb25zdCBhbGVydHMgPSB0aGlzLmdldFJlY2VudEFsZXJ0cygpO1xuICAgIGNvbnN0IHNldHRpbmdzID0gdGhpcy5nZXRTZXR0aW5ncygpO1xuICAgIGNvbnN0IHBsYXlpbmcgPSB0aGlzLmlzUGxheWluZygpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcihhbGVydHMsIHNldHRpbmdzLCBwbGF5aW5nKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFjb3VzdGljQWxlcnRFbmdpbmUgPSBBY291c3RpY0FsZXJ0RW5naW5lLmdldEluc3RhbmNlKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsbUJBQW1CO0FBc0I1QixNQUFNLG9CQUFvQjtBQUFBLEVBZWhCLGNBQWM7QUFidEIsU0FBUSxXQUFnQztBQUN4QyxTQUFRLFdBQWtDO0FBQUEsTUFDeEMsU0FBUztBQUFBLE1BQ1QsUUFB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