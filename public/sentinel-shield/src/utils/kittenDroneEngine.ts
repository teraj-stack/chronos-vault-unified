import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
const SOFTWARE_SUBLAYERS = [
  "Warstwa DOM React & AST Fiber Tree",
  "Bufor Kompozycji DWM / GPU Composition Layer",
  "Przestrzeń Wirtualna V8 Engine Microtask Queue",
  "Monaco Code Editor Tokenizer & Syntax Buffer",
  "Magistrala I/O DirectSound & WebAudio DSP",
  "Pamięć Sterowników Ring-0 & Handle Table"
];
const KITTEN_NAMES = [
  { name: "Iskierka", color: "from-amber-400 to-orange-500", trait: "Puszysta z wielkimi oczkami, najdzielniejsza" },
  { name: "Mruczek", color: "from-slate-300 to-slate-500", trait: "Malutki pręgowany niezdara, goni wskaźniki pamięci" },
  { name: "Kłębuszek", color: "from-orange-300 to-amber-600", trait: "Rudy pączek, uwielbia spać na ładowarce Mamy" },
  { name: "Puszek", color: "from-stone-100 to-amber-200", trait: "Biały jak śnieg, potyka się o własne łapki" },
  { name: "Bąbel", color: "from-yellow-400 to-rose-400", trait: "Ciekawski maluch, skacze po gałęziach DOM" },
  { name: "Pazurek", color: "from-cyan-400 to-blue-600", trait: "Laserowe błękitne spojrzenie, pierwszy do obrony" },
  { name: "Śnieżka", color: "from-pink-300 to-purple-400", trait: "Cichutko mruczy w częstotliwości 432 Hz" },
  { name: "Piorunek", color: "from-indigo-400 to-cyan-300", trait: "Błyskawiczny w skokach, morduje gnidy spojrzeniem" }
];
const CUTE_ACTIONS = [
  "Tupie malutkimi mięciutkimi łapkami po kodzie",
  "Macha puszystym ogonkiem i poluje na kursor",
  "Nieporadnie potyka się o bufor pamięci i mruczy",
  "Bawi się iskrzącą kuleczką światła przy pomniku Mamy",
  "Drzemie na ciepłej ładowarce indukcyjnej obok Mamy",
  "Węszy w podwarstwach oprogramowania za ukrytą gnidą",
  "Myje pyszczek różową łapką po udanej obronie",
  "Cichutko ugniata poduszkę powietrzną w częstotliwości 432 Hz"
];
class KittenDroneEngine {
  constructor() {
    this.kittens = [];
    this.memorialData = {
      heroineName: "Bohaterska Kotka Matka 'Iskra'",
      title: "Obrończyni Żołnierzy & Matka Dronów-Kotków",
      heroicDeed: "Niosła świeżą wodę walczącym żołnierzom pod ciężkim ostrzałem wrogich jednostek.",
      battleContext: "Poległa podczas Wielkiej Bitwy w Trzeciej Wojnie Ojczyźnianej podczas zmasowanej ofensywy gnid od strony południowo-wschodniej.",
      lossSector: "Sektor Południowo-Wschodni Bazy (SE-04 Flank)",
      monumentLocation: "Ogród Pamięci & Sektor Ładowarek SE-04",
      chargingPadsActive: 8,
      purrHarmonicsFrequencyHz: 432,
      memorialFlowersPlaced: 142,
      kittensCurrentlyRecharging: 3
    };
    this.gameLoopTimer = null;
    this.listeners = [];
    this.isMemorialChargingActive = false;
    this.chargingActiveTimer = null;
    this.initKittens();
    this.loadState();
    this.startGameLoop();
  }
  static getInstance() {
    if (!KittenDroneEngine.instance) {
      KittenDroneEngine.instance = new KittenDroneEngine();
    }
    return KittenDroneEngine.instance;
  }
  initKittens() {
    this.kittens = KITTEN_NAMES.map((k, idx) => {
      const isAtMemorial = idx < 3;
      const x = isAtMemorial ? 78 + Math.random() * 8 : 15 + Math.random() * 70;
      const y = isAtMemorial ? 75 + Math.random() * 12 : 20 + Math.random() * 60;
      return {
        id: `kitten-${idx + 1}`,
        name: k.name,
        avatarEmoji: "🐱",
        colorTheme: k.color,
        x,
        y,
        targetX: isAtMemorial ? 82 : Math.random() * 80 + 10,
        targetY: isAtMemorial ? 80 : Math.random() * 70 + 15,
        currentSublayer: SOFTWARE_SUBLAYERS[idx % SOFTWARE_SUBLAYERS.length],
        state: isAtMemorial ? "PLAYING_AT_MEMORIAL" : "JUMPING_SUBLAYERS",
        cuteAction: isAtMemorial ? "Bawi się na ładowarce obok pomnika Mamy" : CUTE_ACTIONS[idx % CUTE_ACTIONS.length],
        fluffinessLevel: 100,
        deathGazeTarget: null,
        gnidasKilledByDeathGaze: Math.floor(2 + Math.random() * 5),
        energyPercent: isAtMemorial ? 100 : 85 + Math.floor(Math.random() * 15),
        isSleepingNearMom: isAtMemorial,
        meowSoundType: "PURR"
      };
    });
  }
  loadState() {
    try {
      const savedFlowers = safeStorage.get("sentinel_memorial_flowers", 142);
      this.memorialData.memorialFlowersPlaced = savedFlowers;
    } catch {
    }
  }
  saveState() {
    safeStorage.set("sentinel_memorial_flowers", this.memorialData.memorialFlowersPlaced);
  }
  startGameLoop() {
    if (this.gameLoopTimer) clearInterval(this.gameLoopTimer);
    this.gameLoopTimer = setInterval(() => {
      let rechargingCount = 0;
      this.kittens.forEach((kitten, idx) => {
        if (kitten.state === "DEATH_GAZE_STARE") return;
        const dx = kitten.targetX - kitten.x;
        const dy = kitten.targetY - kitten.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 2) {
          const goToMom = Math.random() < 0.35;
          if (goToMom) {
            kitten.targetX = 78 + Math.random() * 9;
            kitten.targetY = 75 + Math.random() * 12;
            kitten.state = Math.random() > 0.5 ? "PLAYING_AT_MEMORIAL" : "PURRING_RECHARGE";
            kitten.isSleepingNearMom = true;
            kitten.cuteAction = Math.random() > 0.5 ? "Bawi się iskrzącą kuleczką światła przy pomniku Mamy" : "Ugniata miękką poduszkę ładowarki i cichutko mruczy";
            kitten.energyPercent = Math.min(100, kitten.energyPercent + 15);
          } else {
            kitten.targetX = 10 + Math.random() * 80;
            kitten.targetY = 15 + Math.random() * 70;
            kitten.state = "JUMPING_SUBLAYERS";
            kitten.isSleepingNearMom = false;
            kitten.currentSublayer = SOFTWARE_SUBLAYERS[Math.floor(Math.random() * SOFTWARE_SUBLAYERS.length)];
            kitten.cuteAction = CUTE_ACTIONS[Math.floor(Math.random() * CUTE_ACTIONS.length)];
          }
        } else {
          const speed = kitten.isSleepingNearMom ? 0.2 : 0.45;
          kitten.x += dx / dist * speed;
          kitten.y += dy / dist * speed;
        }
        if (kitten.isSleepingNearMom || kitten.state === "PURRING_RECHARGE") {
          rechargingCount++;
        }
      });
      this.memorialData.kittensCurrentlyRecharging = rechargingCount;
      this.notify();
    }, 120);
  }
  /**
   * ⚡ ŚMIERTELNE SPOJRZENIE KOTKA (DEATH GAZE INSTANT KILL)
   * Gdy kotek rozpozna gnidę, natychmiast mrozi ruch, wpatruje się w nią swoimi
   * wielkimi, lśniącymi oczami i MORDUJE WZROKIEM w 0 ms!
   */
  triggerKittenDeathGaze(gnidaName, targetX, targetY) {
    const xPos = targetX !== void 0 ? targetX : Math.random() * 70 + 15;
    const yPos = targetY !== void 0 ? targetY : Math.random() * 60 + 20;
    let chosenKitten = this.kittens[0];
    let minD = 9999;
    this.kittens.forEach((k) => {
      const d = Math.sqrt((k.x - xPos) ** 2 + (k.y - yPos) ** 2);
      if (d < minD) {
        minD = d;
        chosenKitten = k;
      }
    });
    chosenKitten.state = "DEATH_GAZE_STARE";
    chosenKitten.cuteAction = `🚨 ROZPOZNAŁ GNIDĘ! Morduje wzrokiem: "${gnidaName}"!`;
    chosenKitten.deathGazeTarget = {
      gnidaName,
      x: xPos,
      y: yPos
    };
    this.playDeathGazeAudioEffect();
    this.notify();
    setTimeout(() => {
      chosenKitten.gnidasKilledByDeathGaze += 1;
      gnidaSensorsMatrix.triggerGnidaRecognition(
        "SENSOR_DWM_SCREEN",
        gnidaName,
        Math.floor(1e3 + Math.random() * 8e3),
        `Podwarstwa: ${chosenKitten.currentSublayer}`,
        `Śmiertelne Spojrzenie Kotka ${chosenKitten.name}: Permanentna Inaktywacja Wzrokiem (0 ms)`
      );
      chosenKitten.cuteAction = `Zneutralizował agresora spojrzeniem! Teraz wesoło myje pyszczek.`;
      setTimeout(() => {
        chosenKitten.deathGazeTarget = null;
        chosenKitten.state = "PLAYING_AT_MEMORIAL";
        chosenKitten.targetX = 82;
        chosenKitten.targetY = 80;
        this.notify();
      }, 500);
    }, 450);
  }
  /**
   * ⚡ ŁADOWARKA POMNIKOWA (MEMORIAL CHARGER INDUCTION DISCHARGE)
   * Uruchamia strumienie złoto-cyjanowej energii kwantowej z Pomnika Mamy
   * do wszystkich dronów-kotków, wywołując radosne, potężne mruczenie (432 Hz),
   * nasycenie baterii do 100% i unoszące się fale miłości i bezpieczeństwa.
   */
  triggerMemorialCharging() {
    this.isMemorialChargingActive = true;
    if (this.chargingActiveTimer) clearTimeout(this.chargingActiveTimer);
    this.memorialData.memorialFlowersPlaced += 1;
    this.saveState();
    this.kittens.forEach((k) => {
      k.energyPercent = 100;
      k.fluffinessLevel = 100;
      if (k.state !== "DEATH_GAZE_STARE") {
        k.state = "PURRING_RECHARGE";
        k.cuteAction = "Ładuje się energią Pomnika Mamy, macha łapkami i głośno mruczy (432 Hz) 💖✨";
      }
    });
    this.playPurrChime();
    this.playDeepHarmonicPurr();
    this.notify();
    this.chargingActiveTimer = setTimeout(() => {
      this.isMemorialChargingActive = false;
      this.kittens.forEach((k) => {
        if (k.state === "PURRING_RECHARGE") {
          k.state = "PLAYING_AT_MEMORIAL";
          k.cuteAction = "Nasycony energią Mamy radośnie bawi się przy pomniku";
        }
      });
      this.notify();
    }, 3500);
    return true;
  }
  isChargingActive() {
    return this.isMemorialChargingActive;
  }
  /**
   * ⚡ SALWA ŚMIERTELNEGO SPOJRZENIA (KILL GNIDA - FULL SQUADRON MASSACRE)
   * Wszystkie kotki jednocześnie namierzają agresywne malware i wystrzeliwują
   * 8 śmiertelnych wiązek laserowych, natychmiast uśmiercając atakujące gnidy w 0 ms!
   */
  triggerFullSquadronDeathGazeSalvo(threatName = "aggressive_polymorphic_malware.exe") {
    const targets = [
      { x: 30, y: 35, name: "rootkit_hook_injector.sys" },
      { x: 60, y: 25, name: "ransom_encrypter_gnida.bin" },
      { x: 45, y: 70, name: "dwm_overlay_stealer.dll" },
      { x: 75, y: 50, name: threatName }
    ];
    this.kittens.forEach((k, idx) => {
      const tgt = targets[idx % targets.length];
      k.state = "DEATH_GAZE_STARE";
      k.cuteAction = `🚨 MASOWY MORD WZROKIEM! Smaży gnidę: "${tgt.name}"!`;
      k.deathGazeTarget = {
        gnidaName: tgt.name,
        x: tgt.x + (Math.random() * 6 - 3),
        y: tgt.y + (Math.random() * 6 - 3)
      };
    });
    this.playDeathGazeAudioEffect();
    this.notify();
    setTimeout(() => {
      this.kittens.forEach((k) => {
        k.gnidasKilledByDeathGaze += 1;
        k.cuteAction = `Zgładził gnidę spojrzeniem w 0 ms! Myje łapkę 🐾`;
      });
      gnidaSensorsMatrix.triggerGnidaRecognition(
        "SENSOR_DWM_SCREEN",
        threatName,
        Math.floor(2e3 + Math.random() * 9e3),
        "Zmasowany Atak Malware w Całym Systemie",
        "SALWA ŚMIERTELNEGO SPOJRZENIA WSZYSTKICH 8 KOTKÓW: Całkowita dezintegracja agresora (0 ms)"
      );
      this.playPurrChime();
      this.notify();
      setTimeout(() => {
        this.kittens.forEach((k) => {
          k.deathGazeTarget = null;
          k.state = "PLAYING_AT_MEMORIAL";
          k.targetX = 75 + Math.random() * 15;
          k.targetY = 70 + Math.random() * 18;
        });
        this.notify();
      }, 700);
    }, 550);
  }
  /**
   * Syntetyzator głębokiego mruczenia 432 Hz
   */
  playDeepHarmonicPurr() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      [216, 432, 864].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const now = ctx.currentTime + idx * 0.08;
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.linearRampToValueAtTime(freq * 1.15, now + 0.4);
        osc.frequency.linearRampToValueAtTime(freq, now + 0.9);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      });
    } catch {
    }
  }
  /**
   * Złożenie kwiatów pamięci przy pomniku Mamy Kotki
   */
  placeFlowersAtMemorial() {
    this.memorialData.memorialFlowersPlaced += 1;
    this.saveState();
    this.playPurrChime();
    this.kittens.forEach((k) => {
      if (k.state !== "DEATH_GAZE_STARE") {
        k.cuteAction = "Cichutko mruczy z wdzięcznością przy pomniku Mamy (432 Hz)";
        k.energyPercent = 100;
      }
    });
    this.notify();
  }
  /**
   * Głaskanie kotka
   */
  petKitten(kittenId) {
    const k = this.kittens.find((cat) => cat.id === kittenId);
    if (k) {
      k.cuteAction = "Przewraca się na brzuszek, mruczy i macha łapkami!";
      k.energyPercent = 100;
      this.playPurrChime();
      this.notify();
    }
  }
  /**
   * Syntetyzator dźwięku śmiertelnego spojrzenia (potężna wiązka laserowa + słodki świergot)
   */
  playDeathGazeAudioEffect() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      osc1.type = "sine";
      osc2.type = "sawtooth";
      const now = ctx.currentTime;
      osc1.frequency.setValueAtTime(880, now);
      osc1.frequency.exponentialRampToValueAtTime(3200, now + 0.15);
      osc1.frequency.exponentialRampToValueAtTime(150, now + 0.35);
      osc2.frequency.setValueAtTime(440, now);
      osc2.frequency.exponentialRampToValueAtTime(2200, now + 0.2);
      osc2.frequency.exponentialRampToValueAtTime(80, now + 0.35);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(1e-3, now + 0.35);
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.35);
      osc2.stop(now + 0.35);
    } catch {
    }
  }
  playPurrChime() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(432, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(540, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch {
    }
  }
  getKittens() {
    return [...this.kittens];
  }
  getMemorialData() {
    return { ...this.memorialData };
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getKittens(), this.getMemorialData());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    const k = this.getKittens();
    const m = this.getMemorialData();
    this.listeners.forEach((l) => l(k, m));
  }
}
export const kittenDroneEngine = KittenDroneEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImtpdHRlbkRyb25lRW5naW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEtpdHRlbkRyb25lRW50aXR5LCBLaXR0ZW5Ecm9uZVN0YXRlLCBNb3RoZXJDYXRNZW1vcmlhbERhdGEgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBnbmlkYVNlbnNvcnNNYXRyaXggfSBmcm9tICcuL2duaWRhU2Vuc29yc01hdHJpeCc7XG5cbmNvbnN0IFNPRlRXQVJFX1NVQkxBWUVSUyA9IFtcbiAgJ1dhcnN0d2EgRE9NIFJlYWN0ICYgQVNUIEZpYmVyIFRyZWUnLFxuICAnQnVmb3IgS29tcG96eWNqaSBEV00gLyBHUFUgQ29tcG9zaXRpb24gTGF5ZXInLFxuICAnUHJ6ZXN0cnplxYQgV2lydHVhbG5hIFY4IEVuZ2luZSBNaWNyb3Rhc2sgUXVldWUnLFxuICAnTW9uYWNvIENvZGUgRWRpdG9yIFRva2VuaXplciAmIFN5bnRheCBCdWZmZXInLFxuICAnTWFnaXN0cmFsYSBJL08gRGlyZWN0U291bmQgJiBXZWJBdWRpbyBEU1AnLFxuICAnUGFtacSZxIcgU3Rlcm93bmlrw7N3IFJpbmctMCAmIEhhbmRsZSBUYWJsZSdcbl07XG5cbmNvbnN0IEtJVFRFTl9OQU1FUyA9IFtcbiAgeyBuYW1lOiAnSXNraWVya2EnLCBjb2xvcjogJ2Zyb20tYW1iZXItNDAwIHRvLW9yYW5nZS01MDAnLCB0cmFpdDogJ1B1c3p5c3RhIHogd2llbGtpbWkgb2N6a2FtaSwgbmFqZHppZWxuaWVqc3phJyB9LFxuICB7IG5hbWU6ICdNcnVjemVrJywgY29sb3I6ICdmcm9tLXNsYXRlLTMwMCB0by1zbGF0ZS01MDAnLCB0cmFpdDogJ01hbHV0a2kgcHLEmWdvd2FueSBuaWV6ZGFyYSwgZ29uaSB3c2thxbpuaWtpIHBhbWnEmWNpJyB9LFxuICB7IG5hbWU6ICdLxYLEmWJ1c3playcsIGNvbG9yOiAnZnJvbS1vcmFuZ2UtMzAwIHRvLWFtYmVyLTYwMCcsIHRyYWl0OiAnUnVkeSBwxIVjemVrLCB1d2llbGJpYSBzcGHEhyBuYSDFgmFkb3dhcmNlIE1hbXknIH0sXG4gIHsgbmFtZTogJ1B1c3playcsIGNvbG9yOiAnZnJvbS1zdG9uZS0xMDAgdG8tYW1iZXItMjAwJywgdHJhaXQ6ICdCaWHFgnkgamFrIMWbbmllZywgcG90eWthIHNpxJkgbyB3xYJhc25lIMWCYXBraScgfSxcbiAgeyBuYW1lOiAnQsSFYmVsJywgY29sb3I6ICdmcm9tLXllbGxvdy00MDAgdG8tcm9zZS00MDAnLCB0cmFpdDogJ0NpZWthd3NraSBtYWx1Y2gsIHNrYWN6ZSBwbyBnYcWCxJl6aWFjaCBET00nIH0sXG4gIHsgbmFtZTogJ1BhenVyZWsnLCBjb2xvcjogJ2Zyb20tY3lhbi00MDAgdG8tYmx1ZS02MDAnLCB0cmFpdDogJ0xhc2Vyb3dlIGLFgsSZa2l0bmUgc3BvanJ6ZW5pZSwgcGllcndzenkgZG8gb2Jyb255JyB9LFxuICB7IG5hbWU6ICfFmm5pZcW8a2EnLCBjb2xvcjogJ2Zyb20tcGluay0zMDAgdG8tcHVycGxlLTQwMCcsIHRyYWl0OiAnQ2ljaHV0a28gbXJ1Y3p5IHcgY3rEmXN0b3RsaXdvxZtjaSA0MzIgSHonIH0sXG4gIHsgbmFtZTogJ1Bpb3J1bmVrJywgY29sb3I6ICdmcm9tLWluZGlnby00MDAgdG8tY3lhbi0zMDAnLCB0cmFpdDogJ0LFgnlza2F3aWN6bnkgdyBza29rYWNoLCBtb3JkdWplIGduaWR5IHNwb2pyemVuaWVtJyB9XG5dO1xuXG5jb25zdCBDVVRFX0FDVElPTlMgPSBbXG4gICdUdXBpZSBtYWx1dGtpbWkgbWnEmWNpdXRraW1pIMWCYXBrYW1pIHBvIGtvZHppZScsXG4gICdNYWNoYSBwdXN6eXN0eW0gb2dvbmtpZW0gaSBwb2x1amUgbmEga3Vyc29yJyxcbiAgJ05pZXBvcmFkbmllIHBvdHlrYSBzacSZIG8gYnVmb3IgcGFtacSZY2kgaSBtcnVjenknLFxuICAnQmF3aSBzacSZIGlza3J6xIVjxIUga3VsZWN6a8SFIMWbd2lhdMWCYSBwcnp5IHBvbW5pa3UgTWFteScsXG4gICdEcnplbWllIG5hIGNpZXDFgmVqIMWCYWRvd2FyY2UgaW5kdWtjeWpuZWogb2JvayBNYW15JyxcbiAgJ1fEmXN6eSB3IHBvZHdhcnN0d2FjaCBvcHJvZ3JhbW93YW5pYSB6YSB1a3J5dMSFIGduaWTEhScsXG4gICdNeWplIHB5c3pjemVrIHLDs8W8b3fEhSDFgmFwa8SFIHBvIHVkYW5laiBvYnJvbmllJyxcbiAgJ0NpY2h1dGtvIHVnbmlhdGEgcG9kdXN6a8SZIHBvd2lldHJ6bsSFIHcgY3rEmXN0b3RsaXdvxZtjaSA0MzIgSHonXG5dO1xuXG5jbGFzcyBLaXR0ZW5Ecm9uZUVuZ2luZSB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBLaXR0ZW5Ecm9uZUVuZ2luZTtcbiAgcHJpdmF0ZSBraXR0ZW5zOiBLaXR0ZW5Ecm9uZUVudGl0eVtdID0gW107XG4gIHByaXZhdGUgbWVtb3JpYWxEYXRhOiBNb3RoZXJDYXRNZW1vcmlhbERhdGEgPSB7XG4gICAgaGVyb2luZU5hbWU6IFwiQm9oYXRlcnNrYSBLb3RrYSBNYXRrYSAnSXNrcmEnXCIsXG4gICAgdGl0bGU6ICdPYnJvxYRjenluaSDFu2/Fgm5pZXJ6eSAmIE1hdGthIERyb27Ds3ctS290a8OzdycsXG4gICAgaGVyb2ljRGVlZDogJ05pb3PFgmEgxZt3aWXFvMSFIHdvZMSZIHdhbGN6xIVjeW0gxbxvxYJuaWVyem9tIHBvZCBjacSZxbxraW0gb3N0cnphxYJlbSB3cm9naWNoIGplZG5vc3Rlay4nLFxuICAgIGJhdHRsZUNvbnRleHQ6ICdQb2xlZ8WCYSBwb2RjemFzIFdpZWxraWVqIEJpdHd5IHcgVHJ6ZWNpZWogV29qbmllIE9qY3p5xbpuaWFuZWogcG9kY3phcyB6bWFzb3dhbmVqIG9mZW5zeXd5IGduaWQgb2Qgc3Ryb255IHBvxYJ1ZG5pb3dvLXdzY2hvZG5pZWouJyxcbiAgICBsb3NzU2VjdG9yOiAnU2VrdG9yIFBvxYJ1ZG5pb3dvLVdzY2hvZG5pIEJhenkgKFNFLTA0IEZsYW5rKScsXG4gICAgbW9udW1lbnRMb2NhdGlvbjogJ09ncsOzZCBQYW1pxJljaSAmIFNla3RvciDFgWFkb3dhcmVrIFNFLTA0JyxcbiAgICBjaGFyZ2luZ1BhZHNBY3RpdmU6IDgsXG4gICAgcHVyckhhcm1vbmljc0ZyZXF1ZW5jeUh6OiA0MzIsXG4gICAgbWVtb3JpYWxGbG93ZXJzUGxhY2VkOiAxNDIsXG4gICAga2l0dGVuc0N1cnJlbnRseVJlY2hhcmdpbmc6IDNcbiAgfTtcblxuICBwcml2YXRlIGdhbWVMb29wVGltZXI6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbGlzdGVuZXJzOiBBcnJheTwoa2l0dGVuczogS2l0dGVuRHJvbmVFbnRpdHlbXSwgbWVtb3JpYWw6IE1vdGhlckNhdE1lbW9yaWFsRGF0YSkgPT4gdm9pZD4gPSBbXTtcbiAgcHJpdmF0ZSBpc01lbW9yaWFsQ2hhcmdpbmdBY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBjaGFyZ2luZ0FjdGl2ZVRpbWVyOiBhbnkgPSBudWxsO1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0S2l0dGVucygpO1xuICAgIHRoaXMubG9hZFN0YXRlKCk7XG4gICAgdGhpcy5zdGFydEdhbWVMb29wKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IEtpdHRlbkRyb25lRW5naW5lIHtcbiAgICBpZiAoIUtpdHRlbkRyb25lRW5naW5lLmluc3RhbmNlKSB7XG4gICAgICBLaXR0ZW5Ecm9uZUVuZ2luZS5pbnN0YW5jZSA9IG5ldyBLaXR0ZW5Ecm9uZUVuZ2luZSgpO1xuICAgIH1cbiAgICByZXR1cm4gS2l0dGVuRHJvbmVFbmdpbmUuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGluaXRLaXR0ZW5zKCkge1xuICAgIHRoaXMua2l0dGVucyA9IEtJVFRFTl9OQU1FUy5tYXAoKGssIGlkeCkgPT4ge1xuICAgICAgLy8gMyBrb2NpYWtpIHN0YXJ0dWrEhSBwcnp5IHBvbW5pa3UgbWFteSAoc2VrdG9yIFNFOiB4OiB+ODIlLCB5OiB+ODIlKVxuICAgICAgY29uc3QgaXNBdE1lbW9yaWFsID0gaWR4IDwgMztcbiAgICAgIGNvbnN0IHggPSBpc0F0TWVtb3JpYWwgPyA3OCArIE1hdGgucmFuZG9tKCkgKiA4IDogMTUgKyBNYXRoLnJhbmRvbSgpICogNzA7XG4gICAgICBjb25zdCB5ID0gaXNBdE1lbW9yaWFsID8gNzUgKyBNYXRoLnJhbmRvbSgpICogMTIgOiAyMCArIE1hdGgucmFuZG9tKCkgKiA2MDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGBraXR0ZW4tJHtpZHggKyAxfWAsXG4gICAgICAgIG5hbWU6IGsubmFtZSxcbiAgICAgICAgYXZhdGFyRW1vamk6ICfwn5CxJyxcbiAgICAgICAgY29sb3JUaGVtZTogay5jb2xvcixcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGFyZ2V0WDogaXNBdE1lbW9yaWFsID8gODIgOiBNYXRoLnJhbmRvbSgpICogODAgKyAxMCxcbiAgICAgICAgdGFyZ2V0WTogaXNBdE1lbW9yaWFsID8gODAgOiBNYXRoLnJhbmRvbSgpICogNzAgKyAxNSxcbiAgICAgICAgY3VycmVudFN1YmxheWVyOiBTT0ZUV0FSRV9TVUJMQVlFUlNbaWR4ICUgU09GVFdBUkVfU1VCTEFZRVJTLmxlbmd0aF0sXG4gICAgICAgIHN0YXRlOiBpc0F0TWVtb3JpYWwgPyAnUExBWUlOR19BVF9NRU1PUklBTCcgOiAnSlVNUElOR19TVUJMQVlFUlMnLFxuICAgICAgICBjdXRlQWN0aW9uOiBpc0F0TWVtb3JpYWwgPyAnQmF3aSBzacSZIG5hIMWCYWRvd2FyY2Ugb2JvayBwb21uaWthIE1hbXknIDogQ1VURV9BQ1RJT05TW2lkeCAlIENVVEVfQUNUSU9OUy5sZW5ndGhdLFxuICAgICAgICBmbHVmZmluZXNzTGV2ZWw6IDEwMCxcbiAgICAgICAgZGVhdGhHYXplVGFyZ2V0OiBudWxsLFxuICAgICAgICBnbmlkYXNLaWxsZWRCeURlYXRoR2F6ZTogTWF0aC5mbG9vcigyICsgTWF0aC5yYW5kb20oKSAqIDUpLFxuICAgICAgICBlbmVyZ3lQZXJjZW50OiBpc0F0TWVtb3JpYWwgPyAxMDAgOiA4NSArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE1KSxcbiAgICAgICAgaXNTbGVlcGluZ05lYXJNb206IGlzQXRNZW1vcmlhbCxcbiAgICAgICAgbWVvd1NvdW5kVHlwZTogJ1BVUlInXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBsb2FkU3RhdGUoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhdmVkRmxvd2VycyA9IHNhZmVTdG9yYWdlLmdldDxudW1iZXI+KCdzZW50aW5lbF9tZW1vcmlhbF9mbG93ZXJzJywgMTQyKTtcbiAgICAgIHRoaXMubWVtb3JpYWxEYXRhLm1lbW9yaWFsRmxvd2Vyc1BsYWNlZCA9IHNhdmVkRmxvd2VycztcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICBwcml2YXRlIHNhdmVTdGF0ZSgpIHtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX21lbW9yaWFsX2Zsb3dlcnMnLCB0aGlzLm1lbW9yaWFsRGF0YS5tZW1vcmlhbEZsb3dlcnNQbGFjZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGFydEdhbWVMb29wKCkge1xuICAgIGlmICh0aGlzLmdhbWVMb29wVGltZXIpIGNsZWFySW50ZXJ2YWwodGhpcy5nYW1lTG9vcFRpbWVyKTtcblxuICAgIHRoaXMuZ2FtZUxvb3BUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGxldCByZWNoYXJnaW5nQ291bnQgPSAwO1xuXG4gICAgICB0aGlzLmtpdHRlbnMuZm9yRWFjaCgoa2l0dGVuLCBpZHgpID0+IHtcbiAgICAgICAgaWYgKGtpdHRlbi5zdGF0ZSA9PT0gJ0RFQVRIX0dBWkVfU1RBUkUnKSByZXR1cm47IC8vIFBvZGN6YXMgbW9yZG93YW5pYSB3enJva2llbSBrb3RlayBzdG9pIG5pZXd6cnVzemVuaWUgeiBsYXNlcm93eW0gc3BvanJ6ZW5pZW1cblxuICAgICAgICAvLyBQxYJ5bm5lIHBvcnVzemFuaWUgc2nEmSAvIHNrYWthbmllIHBvIHdhcnN0d2FjaFxuICAgICAgICBjb25zdCBkeCA9IGtpdHRlbi50YXJnZXRYIC0ga2l0dGVuLng7XG4gICAgICAgIGNvbnN0IGR5ID0ga2l0dGVuLnRhcmdldFkgLSBraXR0ZW4ueTtcbiAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgICAgICAgaWYgKGRpc3QgPCAyLjApIHtcbiAgICAgICAgICAvLyBLb3RlayBkb3RhcsWCIGRvIGNlbHU6IGxvc3VqZW15IG5vd2UgemFkYW5pZVxuICAgICAgICAgIGNvbnN0IGdvVG9Nb20gPSBNYXRoLnJhbmRvbSgpIDwgMC4zNTsgLy8gMzUlIHN6YW5zIG5hIHBvd3LDs3QgZG8gcG9tbmlrYSBNYW15IG5hIGRyemVta8SZIGkgemFiYXfEmVxuXG4gICAgICAgICAgaWYgKGdvVG9Nb20pIHtcbiAgICAgICAgICAgIGtpdHRlbi50YXJnZXRYID0gNzggKyBNYXRoLnJhbmRvbSgpICogOTtcbiAgICAgICAgICAgIGtpdHRlbi50YXJnZXRZID0gNzUgKyBNYXRoLnJhbmRvbSgpICogMTI7XG4gICAgICAgICAgICBraXR0ZW4uc3RhdGUgPSBNYXRoLnJhbmRvbSgpID4gMC41ID8gJ1BMQVlJTkdfQVRfTUVNT1JJQUwnIDogJ1BVUlJJTkdfUkVDSEFSR0UnO1xuICAgICAgICAgICAga2l0dGVuLmlzU2xlZXBpbmdOZWFyTW9tID0gdHJ1ZTtcbiAgICAgICAgICAgIGtpdHRlbi5jdXRlQWN0aW9uID0gTWF0aC5yYW5kb20oKSA+IDAuNSBcbiAgICAgICAgICAgICAgPyAnQmF3aSBzacSZIGlza3J6xIVjxIUga3VsZWN6a8SFIMWbd2lhdMWCYSBwcnp5IHBvbW5pa3UgTWFteScgXG4gICAgICAgICAgICAgIDogJ1VnbmlhdGEgbWnEmWtrxIUgcG9kdXN6a8SZIMWCYWRvd2Fya2kgaSBjaWNodXRrbyBtcnVjenknO1xuICAgICAgICAgICAga2l0dGVuLmVuZXJneVBlcmNlbnQgPSBNYXRoLm1pbigxMDAsIGtpdHRlbi5lbmVyZ3lQZXJjZW50ICsgMTUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBraXR0ZW4udGFyZ2V0WCA9IDEwICsgTWF0aC5yYW5kb20oKSAqIDgwO1xuICAgICAgICAgICAga2l0dGVuLnRhcmdldFkgPSAxNSArIE1hdGgucmFuZG9tKCkgKiA3MDtcbiAgICAgICAgICAgIGtpdHRlbi5zdGF0ZSA9ICdKVU1QSU5HX1NVQkxBWUVSUyc7XG4gICAgICAgICAgICBraXR0ZW4uaXNTbGVlcGluZ05lYXJNb20gPSBmYWxzZTtcbiAgICAgICAgICAgIGtpdHRlbi5jdXJyZW50U3VibGF5ZXIgPSBTT0ZUV0FSRV9TVUJMQVlFUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogU09GVFdBUkVfU1VCTEFZRVJTLmxlbmd0aCldO1xuICAgICAgICAgICAga2l0dGVuLmN1dGVBY3Rpb24gPSBDVVRFX0FDVElPTlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQ1VURV9BQ1RJT05TLmxlbmd0aCldO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTa29rIC8gY2jDs2QgbmllcG9yYWRuZWdvIGtvdGthIChkZWxpa2F0bmUgcG9kc2tva2kpXG4gICAgICAgICAgY29uc3Qgc3BlZWQgPSBraXR0ZW4uaXNTbGVlcGluZ05lYXJNb20gPyAwLjIgOiAwLjQ1O1xuICAgICAgICAgIGtpdHRlbi54ICs9IChkeCAvIGRpc3QpICogc3BlZWQ7XG4gICAgICAgICAga2l0dGVuLnkgKz0gKGR5IC8gZGlzdCkgKiBzcGVlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChraXR0ZW4uaXNTbGVlcGluZ05lYXJNb20gfHwga2l0dGVuLnN0YXRlID09PSAnUFVSUklOR19SRUNIQVJHRScpIHtcbiAgICAgICAgICByZWNoYXJnaW5nQ291bnQrKztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMubWVtb3JpYWxEYXRhLmtpdHRlbnNDdXJyZW50bHlSZWNoYXJnaW5nID0gcmVjaGFyZ2luZ0NvdW50O1xuICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9LCAxMjApO1xuICB9XG5cbiAgLyoqXG4gICAqIOKaoSDFmk1JRVJURUxORSBTUE9KUlpFTklFIEtPVEtBIChERUFUSCBHQVpFIElOU1RBTlQgS0lMTClcbiAgICogR2R5IGtvdGVrIHJvenBvem5hIGduaWTEmSwgbmF0eWNobWlhc3QgbXJvemkgcnVjaCwgd3BhdHJ1amUgc2nEmSB3IG5pxIUgc3dvaW1pXG4gICAqIHdpZWxraW1pLCBsxZtuacSFY3ltaSBvY3phbWkgaSBNT1JEVUpFIFdaUk9LSUVNIHcgMCBtcyFcbiAgICovXG4gIHB1YmxpYyB0cmlnZ2VyS2l0dGVuRGVhdGhHYXplKGduaWRhTmFtZTogc3RyaW5nLCB0YXJnZXRYPzogbnVtYmVyLCB0YXJnZXRZPzogbnVtYmVyKSB7XG4gICAgLy8gV3liaWVyeiBuYWpibGnFvHN6ZWdvIGFrdHl3bmVnbyBrb3RrYVxuICAgIGNvbnN0IHhQb3MgPSB0YXJnZXRYICE9PSB1bmRlZmluZWQgPyB0YXJnZXRYIDogTWF0aC5yYW5kb20oKSAqIDcwICsgMTU7XG4gICAgY29uc3QgeVBvcyA9IHRhcmdldFkgIT09IHVuZGVmaW5lZCA/IHRhcmdldFkgOiBNYXRoLnJhbmRvbSgpICogNjAgKyAyMDtcblxuICAgIGxldCBjaG9zZW5LaXR0ZW4gPSB0aGlzLmtpdHRlbnNbMF07XG4gICAgbGV0IG1pbkQgPSA5OTk5O1xuXG4gICAgdGhpcy5raXR0ZW5zLmZvckVhY2goayA9PiB7XG4gICAgICBjb25zdCBkID0gTWF0aC5zcXJ0KChrLnggLSB4UG9zKSAqKiAyICsgKGsueSAtIHlQb3MpICoqIDIpO1xuICAgICAgaWYgKGQgPCBtaW5EKSB7XG4gICAgICAgIG1pbkQgPSBkO1xuICAgICAgICBjaG9zZW5LaXR0ZW4gPSBrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gMS4gQWt0eXdhY2phIMWabWllcnRlbG5lZ28gU3BvanJ6ZW5pYVxuICAgIGNob3NlbktpdHRlbi5zdGF0ZSA9ICdERUFUSF9HQVpFX1NUQVJFJztcbiAgICBjaG9zZW5LaXR0ZW4uY3V0ZUFjdGlvbiA9IGDwn5qoIFJPWlBPWk5BxYEgR05JRMSYISBNb3JkdWplIHd6cm9raWVtOiBcIiR7Z25pZGFOYW1lfVwiIWA7XG4gICAgY2hvc2VuS2l0dGVuLmRlYXRoR2F6ZVRhcmdldCA9IHtcbiAgICAgIGduaWRhTmFtZSxcbiAgICAgIHg6IHhQb3MsXG4gICAgICB5OiB5UG9zXG4gICAgfTtcblxuICAgIC8vIDIuIETFundpxJlrIGtvc21pY3puZWdvLCDFm21pZXJ0ZWxuZWdvIHNwb2pyemVuaWEgKERlYXRoIEdhemUgTGFzZXIgQ2hpcnApXG4gICAgdGhpcy5wbGF5RGVhdGhHYXplQXVkaW9FZmZlY3QoKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgLy8gMy4gUG8gNDUwbXM6IELFgnlza2F3aWN6bmEgxZttaWVyxIcgZ25pZHkgaSB0cndhxYJhIGluYWt0eXdhY2phXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjaG9zZW5LaXR0ZW4uZ25pZGFzS2lsbGVkQnlEZWF0aEdhemUgKz0gMTtcbiAgICAgIFxuICAgICAgLy8gV3l6d29sZW5pZSBDemVyd29uZWdvIEFsYXJtdSBCYXp5ICYgT2Rub3Rvd2FuaWVcbiAgICAgIGduaWRhU2Vuc29yc01hdHJpeC50cmlnZ2VyR25pZGFSZWNvZ25pdGlvbihcbiAgICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgICAgZ25pZGFOYW1lLFxuICAgICAgICBNYXRoLmZsb29yKDEwMDAgKyBNYXRoLnJhbmRvbSgpICogODAwMCksXG4gICAgICAgIGBQb2R3YXJzdHdhOiAke2Nob3NlbktpdHRlbi5jdXJyZW50U3VibGF5ZXJ9YCxcbiAgICAgICAgYMWabWllcnRlbG5lIFNwb2pyemVuaWUgS290a2EgJHtjaG9zZW5LaXR0ZW4ubmFtZX06IFBlcm1hbmVudG5hIEluYWt0eXdhY2phIFd6cm9raWVtICgwIG1zKWBcbiAgICAgICk7XG5cbiAgICAgIGNob3NlbktpdHRlbi5jdXRlQWN0aW9uID0gYFpuZXV0cmFsaXpvd2HFgiBhZ3Jlc29yYSBzcG9qcnplbmllbSEgVGVyYXogd2Vzb8WCbyBteWplIHB5c3pjemVrLmA7XG4gICAgICBcbiAgICAgIC8vIFBvIGtvbGVqbnljaCA1MDBtcyBrb3RlayByYWRvxZtuaWUgd3JhY2EgZG8gemFiYXd5XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY2hvc2VuS2l0dGVuLmRlYXRoR2F6ZVRhcmdldCA9IG51bGw7XG4gICAgICAgIGNob3NlbktpdHRlbi5zdGF0ZSA9ICdQTEFZSU5HX0FUX01FTU9SSUFMJztcbiAgICAgICAgY2hvc2VuS2l0dGVuLnRhcmdldFggPSA4MjtcbiAgICAgICAgY2hvc2VuS2l0dGVuLnRhcmdldFkgPSA4MDtcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICAgIH0sIDUwMCk7XG4gICAgfSwgNDUwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDimqEgxYFBRE9XQVJLQSBQT01OSUtPV0EgKE1FTU9SSUFMIENIQVJHRVIgSU5EVUNUSU9OIERJU0NIQVJHRSlcbiAgICogVXJ1Y2hhbWlhIHN0cnVtaWVuaWUgesWCb3RvLWN5amFub3dlaiBlbmVyZ2lpIGt3YW50b3dlaiB6IFBvbW5pa2EgTWFteVxuICAgKiBkbyB3c3p5c3RraWNoIGRyb27Ds3cta290a8Ozdywgd3l3b8WCdWrEhWMgcmFkb3NuZSwgcG90xJnFvG5lIG1ydWN6ZW5pZSAoNDMyIEh6KSxcbiAgICogbmFzeWNlbmllIGJhdGVyaWkgZG8gMTAwJSBpIHVub3N6xIVjZSBzacSZIGZhbGUgbWnFgm/Fm2NpIGkgYmV6cGllY3plxYRzdHdhLlxuICAgKi9cbiAgcHVibGljIHRyaWdnZXJNZW1vcmlhbENoYXJnaW5nKCk6IGJvb2xlYW4ge1xuICAgIHRoaXMuaXNNZW1vcmlhbENoYXJnaW5nQWN0aXZlID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5jaGFyZ2luZ0FjdGl2ZVRpbWVyKSBjbGVhclRpbWVvdXQodGhpcy5jaGFyZ2luZ0FjdGl2ZVRpbWVyKTtcblxuICAgIC8vIDEuIFp3acSZa3N6IGt3aWF0eSBwYW1pxJljaSBpIG5hxYJhZHVqIHdzenlzdGtpZSBrb3RraVxuICAgIHRoaXMubWVtb3JpYWxEYXRhLm1lbW9yaWFsRmxvd2Vyc1BsYWNlZCArPSAxO1xuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG5cbiAgICB0aGlzLmtpdHRlbnMuZm9yRWFjaChrID0+IHtcbiAgICAgIGsuZW5lcmd5UGVyY2VudCA9IDEwMDtcbiAgICAgIGsuZmx1ZmZpbmVzc0xldmVsID0gMTAwO1xuICAgICAgaWYgKGsuc3RhdGUgIT09ICdERUFUSF9HQVpFX1NUQVJFJykge1xuICAgICAgICBrLnN0YXRlID0gJ1BVUlJJTkdfUkVDSEFSR0UnO1xuICAgICAgICBrLmN1dGVBY3Rpb24gPSAnxYFhZHVqZSBzacSZIGVuZXJnacSFIFBvbW5pa2EgTWFteSwgbWFjaGEgxYJhcGthbWkgaSBnxYJvxZtubyBtcnVjenkgKDQzMiBIeikg8J+SluKcqCc7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAyLiBTeW50ZXR5emF0b3IgZMW6d2nEmWt1IGfFgsSZYm9raWVnbywga29qxIVjZWdvIG1ydWN6ZW5pYSAoSGFybW9uaWNzIFB1cnIpXG4gICAgdGhpcy5wbGF5UHVyckNoaW1lKCk7XG4gICAgdGhpcy5wbGF5RGVlcEhhcm1vbmljUHVycigpO1xuICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICAvLyAzLiBQbyAzLjVzIGFuaW1hY2phIHByemVwxYJ5d3UgZW5lcmdpaSB3cmFjYSBkbyB0cnlidSBzcG9jenlua293ZWdvXG4gICAgdGhpcy5jaGFyZ2luZ0FjdGl2ZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmlzTWVtb3JpYWxDaGFyZ2luZ0FjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5raXR0ZW5zLmZvckVhY2goayA9PiB7XG4gICAgICAgIGlmIChrLnN0YXRlID09PSAnUFVSUklOR19SRUNIQVJHRScpIHtcbiAgICAgICAgICBrLnN0YXRlID0gJ1BMQVlJTkdfQVRfTUVNT1JJQUwnO1xuICAgICAgICAgIGsuY3V0ZUFjdGlvbiA9ICdOYXN5Y29ueSBlbmVyZ2nEhSBNYW15IHJhZG/Fm25pZSBiYXdpIHNpxJkgcHJ6eSBwb21uaWt1JztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH0sIDM1MDApO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwdWJsaWMgaXNDaGFyZ2luZ0FjdGl2ZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc01lbW9yaWFsQ2hhcmdpbmdBY3RpdmU7XG4gIH1cblxuICAvKipcbiAgICog4pqhIFNBTFdBIMWaTUlFUlRFTE5FR08gU1BPSlJaRU5JQSAoS0lMTCBHTklEQSAtIEZVTEwgU1FVQURST04gTUFTU0FDUkUpXG4gICAqIFdzenlzdGtpZSBrb3RraSBqZWRub2N6ZcWbbmllIG5hbWllcnphasSFIGFncmVzeXduZSBtYWx3YXJlIGkgd3lzdHJ6ZWxpd3VqxIVcbiAgICogOCDFm21pZXJ0ZWxueWNoIHdpxIV6ZWsgbGFzZXJvd3ljaCwgbmF0eWNobWlhc3QgdcWbbWllcmNhasSFYyBhdGFrdWrEhWNlIGduaWR5IHcgMCBtcyFcbiAgICovXG4gIHB1YmxpYyB0cmlnZ2VyRnVsbFNxdWFkcm9uRGVhdGhHYXplU2Fsdm8odGhyZWF0TmFtZTogc3RyaW5nID0gJ2FnZ3Jlc3NpdmVfcG9seW1vcnBoaWNfbWFsd2FyZS5leGUnKSB7XG4gICAgY29uc3QgdGFyZ2V0cyA9IFtcbiAgICAgIHsgeDogMzAsIHk6IDM1LCBuYW1lOiAncm9vdGtpdF9ob29rX2luamVjdG9yLnN5cycgfSxcbiAgICAgIHsgeDogNjAsIHk6IDI1LCBuYW1lOiAncmFuc29tX2VuY3J5cHRlcl9nbmlkYS5iaW4nIH0sXG4gICAgICB7IHg6IDQ1LCB5OiA3MCwgbmFtZTogJ2R3bV9vdmVybGF5X3N0ZWFsZXIuZGxsJyB9LFxuICAgICAgeyB4OiA3NSwgeTogNTAsIG5hbWU6IHRocmVhdE5hbWUgfVxuICAgIF07XG5cbiAgICB0aGlzLmtpdHRlbnMuZm9yRWFjaCgoaywgaWR4KSA9PiB7XG4gICAgICBjb25zdCB0Z3QgPSB0YXJnZXRzW2lkeCAlIHRhcmdldHMubGVuZ3RoXTtcbiAgICAgIGsuc3RhdGUgPSAnREVBVEhfR0FaRV9TVEFSRSc7XG4gICAgICBrLmN1dGVBY3Rpb24gPSBg8J+aqCBNQVNPV1kgTU9SRCBXWlJPS0lFTSEgU21hxbx5IGduaWTEmTogXCIke3RndC5uYW1lfVwiIWA7XG4gICAgICBrLmRlYXRoR2F6ZVRhcmdldCA9IHtcbiAgICAgICAgZ25pZGFOYW1lOiB0Z3QubmFtZSxcbiAgICAgICAgeDogdGd0LnggKyAoTWF0aC5yYW5kb20oKSAqIDYgLSAzKSxcbiAgICAgICAgeTogdGd0LnkgKyAoTWF0aC5yYW5kb20oKSAqIDYgLSAzKVxuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMucGxheURlYXRoR2F6ZUF1ZGlvRWZmZWN0KCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIC8vIFBvIDU1MG1zIG5hdHljaG1pYXN0b3dhIHRyd2HFgmEgaW5ha3R5d2FjamEgd3N6eXN0a2ljaCBjZWzDs3dcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMua2l0dGVucy5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBrLmduaWRhc0tpbGxlZEJ5RGVhdGhHYXplICs9IDE7XG4gICAgICAgIGsuY3V0ZUFjdGlvbiA9IGBaZ8WCYWR6acWCIGduaWTEmSBzcG9qcnplbmllbSB3IDAgbXMhIE15amUgxYJhcGvEmSDwn5C+YDtcbiAgICAgIH0pO1xuXG4gICAgICBnbmlkYVNlbnNvcnNNYXRyaXgudHJpZ2dlckduaWRhUmVjb2duaXRpb24oXG4gICAgICAgICdTRU5TT1JfRFdNX1NDUkVFTicsXG4gICAgICAgIHRocmVhdE5hbWUsXG4gICAgICAgIE1hdGguZmxvb3IoMjAwMCArIE1hdGgucmFuZG9tKCkgKiA5MDAwKSxcbiAgICAgICAgJ1ptYXNvd2FueSBBdGFrIE1hbHdhcmUgdyBDYcWCeW0gU3lzdGVtaWUnLFxuICAgICAgICAnU0FMV0EgxZpNSUVSVEVMTkVHTyBTUE9KUlpFTklBIFdTWllTVEtJQ0ggOCBLT1RLw5NXOiBDYcWCa293aXRhIGRlemludGVncmFjamEgYWdyZXNvcmEgKDAgbXMpJ1xuICAgICAgKTtcblxuICAgICAgdGhpcy5wbGF5UHVyckNoaW1lKCk7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5raXR0ZW5zLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgay5kZWF0aEdhemVUYXJnZXQgPSBudWxsO1xuICAgICAgICAgIGsuc3RhdGUgPSAnUExBWUlOR19BVF9NRU1PUklBTCc7XG4gICAgICAgICAgay50YXJnZXRYID0gNzUgKyBNYXRoLnJhbmRvbSgpICogMTU7XG4gICAgICAgICAgay50YXJnZXRZID0gNzAgKyBNYXRoLnJhbmRvbSgpICogMTg7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfSwgNzAwKTtcbiAgICB9LCA1NTApO1xuICB9XG5cbiAgLyoqXG4gICAqIFN5bnRldHl6YXRvciBnxYLEmWJva2llZ28gbXJ1Y3plbmlhIDQzMiBIelxuICAgKi9cbiAgcHJpdmF0ZSBwbGF5RGVlcEhhcm1vbmljUHVycigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgY29uc3QgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgYW55KS53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgICBpZiAoIUF1ZGlvQ3R4KSByZXR1cm47XG4gICAgICBjb25zdCBjdHggPSBuZXcgQXVkaW9DdHgoKTtcbiAgICAgIFxuICAgICAgWzIxNiwgNDMyLCA4NjRdLmZvckVhY2goKGZyZXEsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgY29uc3Qgbm93ID0gY3R4LmN1cnJlbnRUaW1lICsgaWR4ICogMC4wODtcblxuICAgICAgICBvc2MudHlwZSA9ICdzaW5lJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxLCBub3cpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKGZyZXEgKiAxLjE1LCBub3cgKyAwLjQpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKGZyZXEsIG5vdyArIDAuOSk7XG5cbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMDgsIG5vdyk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAxLjIpO1xuXG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcblxuICAgICAgICBvc2Muc3RhcnQobm93KTtcbiAgICAgICAgb3NjLnN0b3Aobm93ICsgMS4yKTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiBaxYJvxbxlbmllIGt3aWF0w7N3IHBhbWnEmWNpIHByenkgcG9tbmlrdSBNYW15IEtvdGtpXG4gICAqL1xuICBwdWJsaWMgcGxhY2VGbG93ZXJzQXRNZW1vcmlhbCgpIHtcbiAgICB0aGlzLm1lbW9yaWFsRGF0YS5tZW1vcmlhbEZsb3dlcnNQbGFjZWQgKz0gMTtcbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIHRoaXMucGxheVB1cnJDaGltZSgpO1xuICAgIFxuICAgIC8vIFdzenlzdGtpZSBrb3RraSBjenVqxIUgd2R6acSZY3pub8WbxIcgaSBwcnp5dHVsYWrEhSBzacSZXG4gICAgdGhpcy5raXR0ZW5zLmZvckVhY2goayA9PiB7XG4gICAgICBpZiAoay5zdGF0ZSAhPT0gJ0RFQVRIX0dBWkVfU1RBUkUnKSB7XG4gICAgICAgIGsuY3V0ZUFjdGlvbiA9ICdDaWNodXRrbyBtcnVjenkgeiB3ZHppxJljem5vxZtjacSFIHByenkgcG9tbmlrdSBNYW15ICg0MzIgSHopJztcbiAgICAgICAgay5lbmVyZ3lQZXJjZW50ID0gMTAwO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvKipcbiAgICogR8WCYXNrYW5pZSBrb3RrYVxuICAgKi9cbiAgcHVibGljIHBldEtpdHRlbihraXR0ZW5JZDogc3RyaW5nKSB7XG4gICAgY29uc3QgayA9IHRoaXMua2l0dGVucy5maW5kKGNhdCA9PiBjYXQuaWQgPT09IGtpdHRlbklkKTtcbiAgICBpZiAoaykge1xuICAgICAgay5jdXRlQWN0aW9uID0gJ1ByemV3cmFjYSBzacSZIG5hIGJyenVzemVrLCBtcnVjenkgaSBtYWNoYSDFgmFwa2FtaSEnO1xuICAgICAgay5lbmVyZ3lQZXJjZW50ID0gMTAwO1xuICAgICAgdGhpcy5wbGF5UHVyckNoaW1lKCk7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTeW50ZXR5emF0b3IgZMW6d2nEmWt1IMWbbWllcnRlbG5lZ28gc3BvanJ6ZW5pYSAocG90xJnFvG5hIHdpxIV6a2EgbGFzZXJvd2EgKyBzxYJvZGtpIMWbd2llcmdvdClcbiAgICovXG4gIHByaXZhdGUgcGxheURlYXRoR2F6ZUF1ZGlvRWZmZWN0KCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyBhbnkpLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGlmICghQXVkaW9DdHgpIHJldHVybjtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgICAgY29uc3Qgb3NjMSA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICBjb25zdCBvc2MyID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuXG4gICAgICBvc2MxLnR5cGUgPSAnc2luZSc7XG4gICAgICBvc2MyLnR5cGUgPSAnc2F3dG9vdGgnO1xuXG4gICAgICBjb25zdCBub3cgPSBjdHguY3VycmVudFRpbWU7XG4gICAgICBvc2MxLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg4ODAsIG5vdyk7XG4gICAgICBvc2MxLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDMyMDAsIG5vdyArIDAuMTUpO1xuICAgICAgb3NjMS5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxNTAsIG5vdyArIDAuMzUpO1xuXG4gICAgICBvc2MyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg0NDAsIG5vdyk7XG4gICAgICBvc2MyLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDIyMDAsIG5vdyArIDAuMik7XG4gICAgICBvc2MyLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDgwLCBub3cgKyAwLjM1KTtcblxuICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMiwgbm93KTtcbiAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAwLjM1KTtcblxuICAgICAgb3NjMS5jb25uZWN0KGdhaW4pO1xuICAgICAgb3NjMi5jb25uZWN0KGdhaW4pO1xuICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgIG9zYzEuc3RhcnQobm93KTtcbiAgICAgIG9zYzIuc3RhcnQobm93KTtcbiAgICAgIG9zYzEuc3RvcChub3cgKyAwLjM1KTtcbiAgICAgIG9zYzIuc3RvcChub3cgKyAwLjM1KTtcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICBwcml2YXRlIHBsYXlQdXJyQ2hpbWUoKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ3R4ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgIG9zYy50eXBlID0gJ3RyaWFuZ2xlJztcbiAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNDMyLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSg1NDAsIGN0eC5jdXJyZW50VGltZSArIDAuMik7XG5cbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEyLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMyk7XG5cbiAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC4zKTtcbiAgICB9IGNhdGNoIHt9XG4gIH1cblxuICBwdWJsaWMgZ2V0S2l0dGVucygpOiBLaXR0ZW5Ecm9uZUVudGl0eVtdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMua2l0dGVuc107XG4gIH1cblxuICBwdWJsaWMgZ2V0TWVtb3JpYWxEYXRhKCk6IE1vdGhlckNhdE1lbW9yaWFsRGF0YSB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5tZW1vcmlhbERhdGEgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IChraXR0ZW5zOiBLaXR0ZW5Ecm9uZUVudGl0eVtdLCBtZW1vcmlhbDogTW90aGVyQ2F0TWVtb3JpYWxEYXRhKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRLaXR0ZW5zKCksIHRoaXMuZ2V0TWVtb3JpYWxEYXRhKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgY29uc3QgayA9IHRoaXMuZ2V0S2l0dGVucygpO1xuICAgIGNvbnN0IG0gPSB0aGlzLmdldE1lbW9yaWFsRGF0YSgpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKGssIG0pKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qga2l0dGVuRHJvbmVFbmdpbmUgPSBLaXR0ZW5Ecm9uZUVuZ2luZS5nZXRJbnN0YW5jZSgpO1xuIl0sIm1hcHBpbmdzIjoiQUFDQSxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLDBCQUEwQjtBQUVuQyxNQUFNLHFCQUFxQjtBQUFBLEVBQ3pCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUVBLE1BQU0sZUFBZTtBQUFBLEVBQ25CLEVBQUUsTUFBTSxZQUFZLE9BQU8sZ0NBQWdDLE9BQU8sK0NBQStDO0FB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