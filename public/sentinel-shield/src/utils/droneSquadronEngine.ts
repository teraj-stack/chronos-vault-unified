import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
const INTER_APP_SECTORS = [
  "App: DWM Windows Composition Surface",
  "App: VSCode / Code Workspace & AST Parser",
  "App: Chromium V8 Sandbox & DOM Renderer",
  "App: Terminal Console & PowerShell Session",
  "App: Kernel Memory Ring-0 & Driver Pool",
  "App: DirectX 12 / Vulkan GPU Pipe (01:00.0)",
  "App: File System NTFS & Sektor MBR",
  "App: Loopback Socket Network (127.0.0.1)"
];
const CALLSIGNS = [
  "DRONE-01 ALPHA",
  "DRONE-02 BRAVO",
  "DRONE-03 CHARLIE",
  "DRONE-04 DELTA",
  "DRONE-05 ECHO",
  "DRONE-06 FOXTROT",
  "DRONE-07 GOLF",
  "DRONE-08 HOTEL",
  "DRONE-09 INDIA",
  "DRONE-10 JULIET",
  "DRONE-11 KILO",
  "DRONE-12 LIMA",
  "DRONE-13 MIKE",
  "DRONE-14 NOVEMBER",
  "DRONE-15 OSCAR",
  "DRONE-16 PAPA",
  "DRONE-17 QUEBEC",
  "DRONE-18 ROMEO",
  "DRONE-19 SIERRA",
  "DRONE-20 TANGO"
];
const SQUADRON_VECTORS = [
  "Skaner Terenu & Integralność Kodu",
  "Likwidacja Gnid & Inaktywacja Permanentna",
  "Audit Logów & Wykrywanie Uszkodzeń",
  "Patrol Między-Aplikacyjny & Ochrona DWM",
  "Skaner Szyn Sprzętowych PCIe/USB",
  "Niszczyciel Wstrzykniętych Buforów RAM"
];
class DroneSquadronEngine {
  constructor() {
    this.animationFrameId = null;
    this.patrolInterval = null;
    this.listeners = [];
    this.state = {
      isActive: true,
      totalDrones: 20,
      activeDronesCount: 20,
      squadronMode: "AUTONOMOUS_INTER_APP_PATROL",
      sectorsCovered: INTER_APP_SECTORS,
      totalCodeDefectsFixed: 48,
      totalGnidasPermanentlyInactivated: 19,
      drones: [],
      recentSquadronEngagements: []
    };
    this.initialize20Drones();
    this.loadPersistedState();
    this.startBackgroundPatrol();
  }
  static getInstance() {
    if (!DroneSquadronEngine.instance) {
      DroneSquadronEngine.instance = new DroneSquadronEngine();
    }
    return DroneSquadronEngine.instance;
  }
  initialize20Drones() {
    const drones = [];
    for (let i = 0; i < 20; i++) {
      const angle = i / 20 * Math.PI * 2;
      const radius = 25 + Math.random() * 20;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * (radius * 0.7);
      drones.push({
        id: `drone-${i + 1}`,
        callsign: CALLSIGNS[i] || `DRONE-${i + 1}`,
        sector: INTER_APP_SECTORS[i % INTER_APP_SECTORS.length],
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(8, Math.min(92, y)),
        targetX: Math.random() * 90 + 5,
        targetY: Math.random() * 85 + 8,
        speed: 0.35 + Math.random() * 0.45,
        batteryPercent: 92 + Math.floor(Math.random() * 8),
        laserFrequencyThz: 940.8,
        mode: i % 3 === 0 ? "SCANNING_TERRAIN" : "PATROL_SWEEP",
        assignedVector: SQUADRON_VECTORS[i % SQUADRON_VECTORS.length],
        targetsNeutralizedCount: Math.floor(Math.random() * 4),
        lastRepairedDefect: null,
        lastNeutralizedGnida: null,
        activeLaserBeamTarget: null,
        healthPercent: 100,
        altitudeMeters: 4.5 + i % 6 * 1.8,
        translocationState: "INSIDE_BASE",
        cannotReturnToBase: false
      });
    }
    this.state.drones = drones;
  }
  loadPersistedState() {
    try {
      const fixedCount = safeStorage.get("sentinel_drones_defects_fixed", 48);
      const gnidasCount = safeStorage.get("sentinel_drones_gnidas_killed", 19);
      const engagements = safeStorage.get("sentinel_drones_engagements", []);
      this.state.totalCodeDefectsFixed = fixedCount;
      this.state.totalGnidasPermanentlyInactivated = gnidasCount;
      if (Array.isArray(engagements) && engagements.length > 0) {
        this.state.recentSquadronEngagements = engagements;
      }
    } catch {
    }
  }
  saveState() {
    safeStorage.set("sentinel_drones_defects_fixed", this.state.totalCodeDefectsFixed);
    safeStorage.set("sentinel_drones_gnidas_killed", this.state.totalGnidasPermanentlyInactivated);
    safeStorage.set("sentinel_drones_engagements", this.state.recentSquadronEngagements.slice(0, 30));
  }
  /**
   * Główny cykl ruchu w tle (swobodne poruszanie się 20 dronów po aplikacjach i terenie)
   */
  startBackgroundPatrol() {
    if (this.patrolInterval) clearInterval(this.patrolInterval);
    this.patrolInterval = setInterval(() => {
      if (!this.state.isActive) return;
      this.state.drones.forEach((drone, idx) => {
        const dx = drone.targetX - drone.x;
        const dy = drone.targetY - drone.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1.8) {
          drone.targetX = Math.random() * 88 + 6;
          drone.targetY = Math.random() * 80 + 10;
          drone.sector = INTER_APP_SECTORS[Math.floor(Math.random() * INTER_APP_SECTORS.length)];
          if (drone.mode !== "ENGAGING_TARGET") {
            drone.mode = Math.random() > 0.4 ? "SCANNING_TERRAIN" : "PATROL_SWEEP";
          }
        } else {
          drone.x += dx / dist * drone.speed;
          drone.y += dy / dist * drone.speed;
        }
        drone.altitudeMeters = 4 + Math.sin(Date.now() / 1e3 + idx) * 1.5;
      });
      if (Math.random() < 0.22) {
        this.executeRandomAutonomousCodeOrLogRepair();
      }
      this.notify();
    }, 100);
  }
  /**
   * 🛠️ Dron wykrywa błąd loga lub uszkodzenie kodu w danej aplikacji i natychmiast naprawia
   */
  executeRandomAutonomousCodeOrLogRepair() {
    const scanningDrones = this.state.drones.filter((d) => d.mode !== "ENGAGING_TARGET");
    if (scanningDrones.length === 0) return;
    const drone = scanningDrones[Math.floor(Math.random() * scanningDrones.length)];
    const defectTypes = [
      { name: "Syntax error w parserze AST modułu DWM", desc: "Zrekonstruowano brakujące tokeny i zablokowano wyciek pamięci." },
      { name: "Uszkodzony rekord loga w buforze aplikacji", desc: "Wyzerowano unparseable bajty i odtworzono nagłówek zdarzenia." },
      { name: "Zawieszony uchwyt pliku NTFS w Temp", desc: "Zresetowano deskryptor procesu i zwolniono blokadę I/O." },
      { name: "Rozsynchronizowany stan pętli renderera DOM", desc: "Przywrócono spójność wirtualnego drzewa i pamięci podręcznej." }
    ];
    const defect = defectTypes[Math.floor(Math.random() * defectTypes.length)];
    drone.lastRepairedDefect = defect.name;
    this.state.totalCodeDefectsFixed += 1;
    const engagement = {
      id: `eng-repair-${Date.now()}`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      droneCallsign: drone.callsign,
      sector: drone.sector,
      actionType: "CODE_DEFECT_REPAIRED",
      targetName: defect.name,
      details: defect.desc
    };
    this.state.recentSquadronEngagements = [engagement, ...this.state.recentSquadronEngagements.slice(0, 30)];
    this.saveState();
  }
  /**
   * ⚡ AUTOMATYCZNY ATAK DRONA I TRWAŁA INAKTYWACJA GNIDY PO ROZPOZNANIU:
   * 1. Dron natychmiast namierza koordynaty agresora
   * 2. Emituje skoncentrowaną wiązkę plazmowo-laserową (940.8 THz)
   * 3. Przeprowadza permanentną inaktywację (PE wipe, NtSuspend, ACL lockout)
   * 4. Uruchamia czerwony alarm bazy i sygnał dźwiękowy
   */
  engageAndPermanentlyInactivateGnida(gnidaName, targetSector, targetX, targetY) {
    const xPos = targetX !== void 0 ? targetX : Math.random() * 80 + 10;
    const yPos = targetY !== void 0 ? targetY : Math.random() * 75 + 12;
    const sector = targetSector || INTER_APP_SECTORS[Math.floor(Math.random() * INTER_APP_SECTORS.length)];
    let closestDrone = this.state.drones[0];
    let minDistance = 9999;
    this.state.drones.forEach((d) => {
      const dist = Math.sqrt((d.x - xPos) ** 2 + (d.y - yPos) ** 2);
      if (dist < minDistance) {
        minDistance = dist;
        closestDrone = d;
      }
    });
    closestDrone.mode = "ENGAGING_TARGET";
    closestDrone.targetX = xPos;
    closestDrone.targetY = yPos;
    closestDrone.sector = sector;
    closestDrone.activeLaserBeamTarget = {
      x: xPos,
      y: yPos,
      gnidaName
    };
    this.playDronePlasmaBlastAudio();
    this.notify();
    setTimeout(() => {
      closestDrone.mode = "PERMANENT_INACTIVATION";
      closestDrone.targetsNeutralizedCount += 1;
      closestDrone.lastNeutralizedGnida = gnidaName;
      this.state.totalGnidasPermanentlyInactivated += 1;
      const engagement = {
        id: `eng-kill-${Date.now()}`,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        droneCallsign: closestDrone.callsign,
        sector,
        actionType: "GNIDA_PERMANENT_INACTIVATION",
        targetName: gnidaName,
        details: "Wiązka plazmowa 940.8 THz: Wyzerowano PE MZ + NtSuspendProcess w RAM (0 ms) + Blokada uprawnień ACL."
      };
      this.state.recentSquadronEngagements = [engagement, ...this.state.recentSquadronEngagements.slice(0, 30)];
      this.saveState();
      gnidaSensorsMatrix.triggerGnidaRecognition(
        "SENSOR_DWM_SCREEN",
        gnidaName,
        Math.floor(2e3 + Math.random() * 6e3),
        `${sector} (Koordynaty drona: ${Math.round(xPos)}%, ${Math.round(yPos)}%)`,
        `Atak Drona ${closestDrone.callsign}: Trwała Inaktywacja PE/ACL/RAM`
      );
      this.notify();
      setTimeout(() => {
        closestDrone.activeLaserBeamTarget = null;
        closestDrone.mode = "PATROL_SWEEP";
        this.notify();
      }, 500);
    }, 400);
  }
  /**
   * Dźwięk strzału wiązki plazmowej drona
   */
  playDronePlasmaBlastAudio() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.25);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
    }
  }
  /**
   * 🌌 JEDNOKIERUNKOWA TRANSLOKACJA KWANTOWA NA ZEWNĄTRZ BAZY:
   * Drony przenikają przez pole bez naruszenia struktury i funkcjonalności bariery.
   * Zgodnie z bezwzględnymi prawami fizyki heksagonalnej bariery powrót na lub nad teren bazy jest niemożliwy!
   */
  translocateDroneOutsideBase(droneId) {
    const drone = this.state.drones.find((d) => d.id === droneId);
    if (!drone) return;
    drone.translocationState = "TRANSLOCATING_QUANTUM";
    drone.mode = "ENGAGING_TARGET";
    this.playTranslocationSoundEffect();
    this.notify();
    setTimeout(() => {
      drone.translocationState = "OUTSIDE_PERIMETER_SWEEP";
      drone.cannotReturnToBase = true;
      drone.sector = "Sektor Zewnętrzny Bazy (Deep Perimeter Recon)";
      const angle = Math.random() * Math.PI * 2;
      drone.x = 50 + Math.cos(angle) * 46;
      drone.y = 50 + Math.sin(angle) * 44;
      drone.targetX = 50 + Math.cos(angle + 0.5) * 48;
      drone.targetY = 50 + Math.sin(angle + 0.5) * 46;
      drone.assignedVector = "Zewnętrzny Sweep Obwodowy & Likwidacja Przedpole";
      const engagement = {
        id: `eng-transloc-${Date.now()}`,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        droneCallsign: drone.callsign,
        sector: "Zewnętrzny Obwód Poza Barierą",
        actionType: "LOG_ANOMALY_CLEARED",
        targetName: "Translokacja Fazowa",
        details: "Dron pomyślnie przeniknął na zewnątrz bazy bez naruszenia bariery heksagonalnej. Zgodnie z fizyką tarczy powrót na teren bazy zablokowany."
      };
      this.state.recentSquadronEngagements = [engagement, ...this.state.recentSquadronEngagements.slice(0, 30)];
      this.saveState();
      this.notify();
    }, 400);
  }
  /**
   * Masowa translokacja wybranych lub wszystkich dronów na zewnątrz
   */
  translocateAllDronesOutsideBase() {
    this.state.drones.forEach((d) => {
      if (d.translocationState === "INSIDE_BASE") {
        this.translocateDroneOutsideBase(d.id);
      }
    });
  }
  playTranslocationSoundEffect() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.2);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.45);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } catch {
    }
  }
  /**
   * Przełączenie trybu całej eskadry 20 dronów
   */
  setSquadronMode(mode) {
    this.state.squadronMode = mode;
    if (mode === "DEFENSIVE_SWARM") {
      this.state.drones.forEach((d, i) => {
        const angle = i / 20 * Math.PI * 2;
        d.targetX = 50 + Math.cos(angle) * 32;
        d.targetY = 50 + Math.sin(angle) * 26;
        d.speed = 0.8;
      });
    } else if (mode === "PURGE_STRIKE") {
      this.state.drones.forEach((d) => {
        d.speed = 1.1;
        d.mode = "SCANNING_TERRAIN";
      });
    } else {
      this.state.drones.forEach((d) => {
        d.speed = 0.35 + Math.random() * 0.45;
        d.mode = "PATROL_SWEEP";
      });
    }
    this.notify();
  }
  getState() {
    return { ...this.state };
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    const cur = this.getState();
    this.listeners.forEach((l) => l(cur));
  }
}
export const droneSquadronEngine = DroneSquadronEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyb25lU3F1YWRyb25FbmdpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgXG4gIERyb25lU3F1YWRyb25TdGF0ZSwgXG4gIFBhdHJvbERyb25lRW50aXR5LCBcbiAgRHJvbmVPcGVyYXRpb25hbE1vZGUgXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhZmVTdG9yYWdlIH0gZnJvbSAnLi9zZWxmUmVwYWlyU3lzdGVtJztcbmltcG9ydCB7IGduaWRhU2Vuc29yc01hdHJpeCB9IGZyb20gJy4vZ25pZGFTZW5zb3JzTWF0cml4JztcbmltcG9ydCB7IHNlbnRpbmVsQm90RW5naW5lIH0gZnJvbSAnLi9zZW50aW5lbEJvdEVuZ2luZSc7XG5cbmNvbnN0IElOVEVSX0FQUF9TRUNUT1JTID0gW1xuICAnQXBwOiBEV00gV2luZG93cyBDb21wb3NpdGlvbiBTdXJmYWNlJyxcbiAgJ0FwcDogVlNDb2RlIC8gQ29kZSBXb3Jrc3BhY2UgJiBBU1QgUGFyc2VyJyxcbiAgJ0FwcDogQ2hyb21pdW0gVjggU2FuZGJveCAmIERPTSBSZW5kZXJlcicsXG4gICdBcHA6IFRlcm1pbmFsIENvbnNvbGUgJiBQb3dlclNoZWxsIFNlc3Npb24nLFxuICAnQXBwOiBLZXJuZWwgTWVtb3J5IFJpbmctMCAmIERyaXZlciBQb29sJyxcbiAgJ0FwcDogRGlyZWN0WCAxMiAvIFZ1bGthbiBHUFUgUGlwZSAoMDE6MDAuMCknLFxuICAnQXBwOiBGaWxlIFN5c3RlbSBOVEZTICYgU2VrdG9yIE1CUicsXG4gICdBcHA6IExvb3BiYWNrIFNvY2tldCBOZXR3b3JrICgxMjcuMC4wLjEpJ1xuXTtcblxuY29uc3QgQ0FMTFNJR05TID0gW1xuICAnRFJPTkUtMDEgQUxQSEEnLCAnRFJPTkUtMDIgQlJBVk8nLCAnRFJPTkUtMDMgQ0hBUkxJRScsICdEUk9ORS0wNCBERUxUQScsXG4gICdEUk9ORS0wNSBFQ0hPJywgJ0RST05FLTA2IEZPWFRST1QnLCAnRFJPTkUtMDcgR09MRicsICdEUk9ORS0wOCBIT1RFTCcsXG4gICdEUk9ORS0wOSBJTkRJQScsICdEUk9ORS0xMCBKVUxJRVQnLCAnRFJPTkUtMTEgS0lMTycsICdEUk9ORS0xMiBMSU1BJyxcbiAgJ0RST05FLTEzIE1JS0UnLCAnRFJPTkUtMTQgTk9WRU1CRVInLCAnRFJPTkUtMTUgT1NDQVInLCAnRFJPTkUtMTYgUEFQQScsXG4gICdEUk9ORS0xNyBRVUVCRUMnLCAnRFJPTkUtMTggUk9NRU8nLCAnRFJPTkUtMTkgU0lFUlJBJywgJ0RST05FLTIwIFRBTkdPJ1xuXTtcblxuY29uc3QgU1FVQURST05fVkVDVE9SUyA9IFtcbiAgJ1NrYW5lciBUZXJlbnUgJiBJbnRlZ3JhbG5vxZvEhyBLb2R1JyxcbiAgJ0xpa3dpZGFjamEgR25pZCAmIEluYWt0eXdhY2phIFBlcm1hbmVudG5hJyxcbiAgJ0F1ZGl0IExvZ8OzdyAmIFd5a3J5d2FuaWUgVXN6a29kemXFhCcsXG4gICdQYXRyb2wgTWnEmWR6eS1BcGxpa2FjeWpueSAmIE9jaHJvbmEgRFdNJyxcbiAgJ1NrYW5lciBTenluIFNwcnrEmXRvd3ljaCBQQ0llL1VTQicsXG4gICdOaXN6Y3p5Y2llbCBXc3RyenlrbmnEmXR5Y2ggQnVmb3LDs3cgUkFNJ1xuXTtcblxuY2xhc3MgRHJvbmVTcXVhZHJvbkVuZ2luZSB7XG4gIHByaXZhdGUgc3RhdGljIGluc3RhbmNlOiBEcm9uZVNxdWFkcm9uRW5naW5lO1xuICBwcml2YXRlIGFuaW1hdGlvbkZyYW1lSWQ6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgcGF0cm9sSW50ZXJ2YWw6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbGlzdGVuZXJzOiBBcnJheTwoc3RhdGU6IERyb25lU3F1YWRyb25TdGF0ZSkgPT4gdm9pZD4gPSBbXTtcblxuICBwcml2YXRlIHN0YXRlOiBEcm9uZVNxdWFkcm9uU3RhdGUgPSB7XG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgdG90YWxEcm9uZXM6IDIwLFxuICAgIGFjdGl2ZURyb25lc0NvdW50OiAyMCxcbiAgICBzcXVhZHJvbk1vZGU6ICdBVVRPTk9NT1VTX0lOVEVSX0FQUF9QQVRST0wnLFxuICAgIHNlY3RvcnNDb3ZlcmVkOiBJTlRFUl9BUFBfU0VDVE9SUyxcbiAgICB0b3RhbENvZGVEZWZlY3RzRml4ZWQ6IDQ4LFxuICAgIHRvdGFsR25pZGFzUGVybWFuZW50bHlJbmFjdGl2YXRlZDogMTksXG4gICAgZHJvbmVzOiBbXSxcbiAgICByZWNlbnRTcXVhZHJvbkVuZ2FnZW1lbnRzOiBbXVxuICB9O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0aWFsaXplMjBEcm9uZXMoKTtcbiAgICB0aGlzLmxvYWRQZXJzaXN0ZWRTdGF0ZSgpO1xuICAgIHRoaXMuc3RhcnRCYWNrZ3JvdW5kUGF0cm9sKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IERyb25lU3F1YWRyb25FbmdpbmUge1xuICAgIGlmICghRHJvbmVTcXVhZHJvbkVuZ2luZS5pbnN0YW5jZSkge1xuICAgICAgRHJvbmVTcXVhZHJvbkVuZ2luZS5pbnN0YW5jZSA9IG5ldyBEcm9uZVNxdWFkcm9uRW5naW5lKCk7XG4gICAgfVxuICAgIHJldHVybiBEcm9uZVNxdWFkcm9uRW5naW5lLmluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplMjBEcm9uZXMoKSB7XG4gICAgY29uc3QgZHJvbmVzOiBQYXRyb2xEcm9uZUVudGl0eVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyMDsgaSsrKSB7XG4gICAgICBjb25zdCBhbmdsZSA9IChpIC8gMjApICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCByYWRpdXMgPSAyNSArIE1hdGgucmFuZG9tKCkgKiAyMDtcbiAgICAgIGNvbnN0IHggPSA1MCArIE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgIGNvbnN0IHkgPSA1MCArIE1hdGguc2luKGFuZ2xlKSAqIChyYWRpdXMgKiAwLjcpO1xuXG4gICAgICBkcm9uZXMucHVzaCh7XG4gICAgICAgIGlkOiBgZHJvbmUtJHtpICsgMX1gLFxuICAgICAgICBjYWxsc2lnbjogQ0FMTFNJR05TW2ldIHx8IGBEUk9ORS0ke2kgKyAxfWAsXG4gICAgICAgIHNlY3RvcjogSU5URVJfQVBQX1NFQ1RPUlNbaSAlIElOVEVSX0FQUF9TRUNUT1JTLmxlbmd0aF0sXG4gICAgICAgIHg6IE1hdGgubWF4KDUsIE1hdGgubWluKDk1LCB4KSksXG4gICAgICAgIHk6IE1hdGgubWF4KDgsIE1hdGgubWluKDkyLCB5KSksXG4gICAgICAgIHRhcmdldFg6IE1hdGgucmFuZG9tKCkgKiA5MCArIDUsXG4gICAgICAgIHRhcmdldFk6IE1hdGgucmFuZG9tKCkgKiA4NSArIDgsXG4gICAgICAgIHNwZWVkOiAwLjM1ICsgTWF0aC5yYW5kb20oKSAqIDAuNDUsXG4gICAgICAgIGJhdHRlcnlQZXJjZW50OiA5MiArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDgpLFxuICAgICAgICBsYXNlckZyZXF1ZW5jeVRoejogOTQwLjgsXG4gICAgICAgIG1vZGU6IGkgJSAzID09PSAwID8gJ1NDQU5OSU5HX1RFUlJBSU4nIDogJ1BBVFJPTF9TV0VFUCcsXG4gICAgICAgIGFzc2lnbmVkVmVjdG9yOiBTUVVBRFJPTl9WRUNUT1JTW2kgJSBTUVVBRFJPTl9WRUNUT1JTLmxlbmd0aF0sXG4gICAgICAgIHRhcmdldHNOZXV0cmFsaXplZENvdW50OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA0KSxcbiAgICAgICAgbGFzdFJlcGFpcmVkRGVmZWN0OiBudWxsLFxuICAgICAgICBsYXN0TmV1dHJhbGl6ZWRHbmlkYTogbnVsbCxcbiAgICAgICAgYWN0aXZlTGFzZXJCZWFtVGFyZ2V0OiBudWxsLFxuICAgICAgICBoZWFsdGhQZXJjZW50OiAxMDAsXG4gICAgICAgIGFsdGl0dWRlTWV0ZXJzOiA0LjUgKyAoaSAlIDYpICogMS44LFxuICAgICAgICB0cmFuc2xvY2F0aW9uU3RhdGU6ICdJTlNJREVfQkFTRScsXG4gICAgICAgIGNhbm5vdFJldHVyblRvQmFzZTogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLnN0YXRlLmRyb25lcyA9IGRyb25lcztcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFBlcnNpc3RlZFN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBmaXhlZENvdW50ID0gc2FmZVN0b3JhZ2UuZ2V0PG51bWJlcj4oJ3NlbnRpbmVsX2Ryb25lc19kZWZlY3RzX2ZpeGVkJywgNDgpO1xuICAgICAgY29uc3QgZ25pZGFzQ291bnQgPSBzYWZlU3RvcmFnZS5nZXQ8bnVtYmVyPignc2VudGluZWxfZHJvbmVzX2duaWRhc19raWxsZWQnLCAxOSk7XG4gICAgICBjb25zdCBlbmdhZ2VtZW50cyA9IHNhZmVTdG9yYWdlLmdldDxhbnlbXT4oJ3NlbnRpbmVsX2Ryb25lc19lbmdhZ2VtZW50cycsIFtdKTtcbiAgICAgIFxuICAgICAgdGhpcy5zdGF0ZS50b3RhbENvZGVEZWZlY3RzRml4ZWQgPSBmaXhlZENvdW50O1xuICAgICAgdGhpcy5zdGF0ZS50b3RhbEduaWRhc1Blcm1hbmVudGx5SW5hY3RpdmF0ZWQgPSBnbmlkYXNDb3VudDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGVuZ2FnZW1lbnRzKSAmJiBlbmdhZ2VtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUucmVjZW50U3F1YWRyb25FbmdhZ2VtZW50cyA9IGVuZ2FnZW1lbnRzO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVN0YXRlKCkge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfZHJvbmVzX2RlZmVjdHNfZml4ZWQnLCB0aGlzLnN0YXRlLnRvdGFsQ29kZURlZmVjdHNGaXhlZCk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9kcm9uZXNfZ25pZGFzX2tpbGxlZCcsIHRoaXMuc3RhdGUudG90YWxHbmlkYXNQZXJtYW5lbnRseUluYWN0aXZhdGVkKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2Ryb25lc19lbmdhZ2VtZW50cycsIHRoaXMuc3RhdGUucmVjZW50U3F1YWRyb25FbmdhZ2VtZW50cy5zbGljZSgwLCAzMCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEfFgsOzd255IGN5a2wgcnVjaHUgdyB0bGUgKHN3b2JvZG5lIHBvcnVzemFuaWUgc2nEmSAyMCBkcm9uw7N3IHBvIGFwbGlrYWNqYWNoIGkgdGVyZW5pZSlcbiAgICovXG4gIHByaXZhdGUgc3RhcnRCYWNrZ3JvdW5kUGF0cm9sKCkge1xuICAgIGlmICh0aGlzLnBhdHJvbEludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMucGF0cm9sSW50ZXJ2YWwpO1xuXG4gICAgdGhpcy5wYXRyb2xJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zdGF0ZS5pc0FjdGl2ZSkgcmV0dXJuO1xuXG4gICAgICB0aGlzLnN0YXRlLmRyb25lcy5mb3JFYWNoKChkcm9uZSwgaWR4KSA9PiB7XG4gICAgICAgIC8vIFByemVsb3QgdyBzdHJvbsSZIHRhcmdldFggLyB0YXJnZXRZXG4gICAgICAgIGNvbnN0IGR4ID0gZHJvbmUudGFyZ2V0WCAtIGRyb25lLng7XG4gICAgICAgIGNvbnN0IGR5ID0gZHJvbmUudGFyZ2V0WSAtIGRyb25lLnk7XG4gICAgICAgIGNvbnN0IGRpc3QgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuXG4gICAgICAgIGlmIChkaXN0IDwgMS44KSB7XG4gICAgICAgICAgLy8gRHJvbiBvc2nEhWduxIXFgiBwdW5rdCBuYXdpZ2FjeWpueSAtIHd5YsOzciBub3dlZ28gc2VrdG9yYSBpIGtvb3JkeW5hdMOzd1xuICAgICAgICAgIGRyb25lLnRhcmdldFggPSBNYXRoLnJhbmRvbSgpICogODggKyA2O1xuICAgICAgICAgIGRyb25lLnRhcmdldFkgPSBNYXRoLnJhbmRvbSgpICogODAgKyAxMDtcbiAgICAgICAgICBkcm9uZS5zZWN0b3IgPSBJTlRFUl9BUFBfU0VDVE9SU1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBJTlRFUl9BUFBfU0VDVE9SUy5sZW5ndGgpXTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoZHJvbmUubW9kZSAhPT0gJ0VOR0FHSU5HX1RBUkdFVCcpIHtcbiAgICAgICAgICAgIGRyb25lLm1vZGUgPSBNYXRoLnJhbmRvbSgpID4gMC40ID8gJ1NDQU5OSU5HX1RFUlJBSU4nIDogJ1BBVFJPTF9TV0VFUCc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFDFgnlubnkgcnVjaFxuICAgICAgICAgIGRyb25lLnggKz0gKGR4IC8gZGlzdCkgKiBkcm9uZS5zcGVlZDtcbiAgICAgICAgICBkcm9uZS55ICs9IChkeSAvIGRpc3QpICogZHJvbmUuc3BlZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEcm9ibmUgZmx1a3R1YWNqZSB3eXNva2/Fm2NpIGkgYmF0ZXJpaVxuICAgICAgICBkcm9uZS5hbHRpdHVkZU1ldGVycyA9IDQuMCArIE1hdGguc2luKERhdGUubm93KCkgLyAxMDAwICsgaWR4KSAqIDEuNTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBMb3Nvd2UgYXV0b25hcHJhd3kgdXN6a29kemXFhCBsb2fDs3cgaSBrb2TDs3cgdyB0bGUgcHJ6ZXogZHJvbnkgKGNvIDQuNXMpXG4gICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuMjIpIHtcbiAgICAgICAgdGhpcy5leGVjdXRlUmFuZG9tQXV0b25vbW91c0NvZGVPckxvZ1JlcGFpcigpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm5vdGlmeSgpO1xuICAgIH0sIDEwMCk7XG4gIH1cblxuICAvKipcbiAgICog8J+boO+4jyBEcm9uIHd5a3J5d2EgYsWCxIVkIGxvZ2EgbHViIHVzemtvZHplbmllIGtvZHUgdyBkYW5laiBhcGxpa2FjamkgaSBuYXR5Y2htaWFzdCBuYXByYXdpYVxuICAgKi9cbiAgcHJpdmF0ZSBleGVjdXRlUmFuZG9tQXV0b25vbW91c0NvZGVPckxvZ1JlcGFpcigpIHtcbiAgICBjb25zdCBzY2FubmluZ0Ryb25lcyA9IHRoaXMuc3RhdGUuZHJvbmVzLmZpbHRlcihkID0+IGQubW9kZSAhPT0gJ0VOR0FHSU5HX1RBUkdFVCcpO1xuICAgIGlmIChzY2FubmluZ0Ryb25lcy5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAgIGNvbnN0IGRyb25lID0gc2Nhbm5pbmdEcm9uZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc2Nhbm5pbmdEcm9uZXMubGVuZ3RoKV07XG4gICAgY29uc3QgZGVmZWN0VHlwZXMgPSBbXG4gICAgICB7IG5hbWU6ICdTeW50YXggZXJyb3IgdyBwYXJzZXJ6ZSBBU1QgbW9kdcWCdSBEV00nLCBkZXNjOiAnWnJla29uc3RydW93YW5vIGJyYWt1asSFY2UgdG9rZW55IGkgemFibG9rb3dhbm8gd3ljaWVrIHBhbWnEmWNpLicgfSxcbiAgICAgIHsgbmFtZTogJ1VzemtvZHpvbnkgcmVrb3JkIGxvZ2EgdyBidWZvcnplIGFwbGlrYWNqaScsIGRlc2M6ICdXeXplcm93YW5vIHVucGFyc2VhYmxlIGJhanR5IGkgb2R0d29yem9ubyBuYWfFgsOzd2VrIHpkYXJ6ZW5pYS4nIH0sXG4gICAgICB7IG5hbWU6ICdaYXdpZXN6b255IHVjaHd5dCBwbGlrdSBOVEZTIHcgVGVtcCcsIGRlc2M6ICdacmVzZXRvd2FubyBkZXNrcnlwdG9yIHByb2Nlc3UgaSB6d29sbmlvbm8gYmxva2FkxJkgSS9PLicgfSxcbiAgICAgIHsgbmFtZTogJ1JvenN5bmNocm9uaXpvd2FueSBzdGFuIHDEmXRsaSByZW5kZXJlcmEgRE9NJywgZGVzYzogJ1Byenl3csOzY29ubyBzcMOzam5vxZvEhyB3aXJ0dWFsbmVnbyBkcnpld2EgaSBwYW1pxJljaSBwb2RyxJljem5lai4nIH1cbiAgICBdO1xuICAgIGNvbnN0IGRlZmVjdCA9IGRlZmVjdFR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGRlZmVjdFR5cGVzLmxlbmd0aCldO1xuXG4gICAgZHJvbmUubGFzdFJlcGFpcmVkRGVmZWN0ID0gZGVmZWN0Lm5hbWU7XG4gICAgdGhpcy5zdGF0ZS50b3RhbENvZGVEZWZlY3RzRml4ZWQgKz0gMTtcblxuICAgIGNvbnN0IGVuZ2FnZW1lbnQgPSB7XG4gICAgICBpZDogYGVuZy1yZXBhaXItJHtEYXRlLm5vdygpfWAsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBkcm9uZUNhbGxzaWduOiBkcm9uZS5jYWxsc2lnbixcbiAgICAgIHNlY3RvcjogZHJvbmUuc2VjdG9yLFxuICAgICAgYWN0aW9uVHlwZTogJ0NPREVfREVGRUNUX1JFUEFJUkVEJyBhcyBjb25zdCxcbiAgICAgIHRhcmdldE5hbWU6IGRlZmVjdC5uYW1lLFxuICAgICAgZGV0YWlsczogZGVmZWN0LmRlc2NcbiAgICB9O1xuXG4gICAgdGhpcy5zdGF0ZS5yZWNlbnRTcXVhZHJvbkVuZ2FnZW1lbnRzID0gW2VuZ2FnZW1lbnQsIC4uLnRoaXMuc3RhdGUucmVjZW50U3F1YWRyb25FbmdhZ2VtZW50cy5zbGljZSgwLCAzMCldO1xuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gIH1cblxuICAvKipcbiAgICog4pqhIEFVVE9NQVRZQ1pOWSBBVEFLIERST05BIEkgVFJXQcWBQSBJTkFLVFlXQUNKQSBHTklEWSBQTyBST1pQT1pOQU5JVTpcbiAgICogMS4gRHJvbiBuYXR5Y2htaWFzdCBuYW1pZXJ6YSBrb29yZHluYXR5IGFncmVzb3JhXG4gICAqIDIuIEVtaXR1amUgc2tvbmNlbnRyb3dhbsSFIHdpxIV6a8SZIHBsYXptb3dvLWxhc2Vyb3fEhSAoOTQwLjggVEh6KVxuICAgKiAzLiBQcnplcHJvd2FkemEgcGVybWFuZW50bsSFIGluYWt0eXdhY2rEmSAoUEUgd2lwZSwgTnRTdXNwZW5kLCBBQ0wgbG9ja291dClcbiAgICogNC4gVXJ1Y2hhbWlhIGN6ZXJ3b255IGFsYXJtIGJhenkgaSBzeWduYcWCIGTFundpxJlrb3d5XG4gICAqL1xuICBwdWJsaWMgZW5nYWdlQW5kUGVybWFuZW50bHlJbmFjdGl2YXRlR25pZGEoXG4gICAgZ25pZGFOYW1lOiBzdHJpbmcsXG4gICAgdGFyZ2V0U2VjdG9yPzogc3RyaW5nLFxuICAgIHRhcmdldFg/OiBudW1iZXIsXG4gICAgdGFyZ2V0WT86IG51bWJlclxuICApIHtcbiAgICAvLyBabmFqZMW6IG5hamJsacW8c3plZ28gd29sbmVnbyBkcm9uYVxuICAgIGNvbnN0IHhQb3MgPSB0YXJnZXRYICE9PSB1bmRlZmluZWQgPyB0YXJnZXRYIDogTWF0aC5yYW5kb20oKSAqIDgwICsgMTA7XG4gICAgY29uc3QgeVBvcyA9IHRhcmdldFkgIT09IHVuZGVmaW5lZCA/IHRhcmdldFkgOiBNYXRoLnJhbmRvbSgpICogNzUgKyAxMjtcbiAgICBjb25zdCBzZWN0b3IgPSB0YXJnZXRTZWN0b3IgfHwgSU5URVJfQVBQX1NFQ1RPUlNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogSU5URVJfQVBQX1NFQ1RPUlMubGVuZ3RoKV07XG5cbiAgICBsZXQgY2xvc2VzdERyb25lID0gdGhpcy5zdGF0ZS5kcm9uZXNbMF07XG4gICAgbGV0IG1pbkRpc3RhbmNlID0gOTk5OTtcblxuICAgIHRoaXMuc3RhdGUuZHJvbmVzLmZvckVhY2goZCA9PiB7XG4gICAgICBjb25zdCBkaXN0ID0gTWF0aC5zcXJ0KChkLnggLSB4UG9zKSAqKiAyICsgKGQueSAtIHlQb3MpICoqIDIpO1xuICAgICAgaWYgKGRpc3QgPCBtaW5EaXN0YW5jZSkge1xuICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3Q7XG4gICAgICAgIGNsb3Nlc3REcm9uZSA9IGQ7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyAxLiBOYXR5Y2htaWFzdG93eSBhdGFrIGRyb25hXG4gICAgY2xvc2VzdERyb25lLm1vZGUgPSAnRU5HQUdJTkdfVEFSR0VUJztcbiAgICBjbG9zZXN0RHJvbmUudGFyZ2V0WCA9IHhQb3M7XG4gICAgY2xvc2VzdERyb25lLnRhcmdldFkgPSB5UG9zO1xuICAgIGNsb3Nlc3REcm9uZS5zZWN0b3IgPSBzZWN0b3I7XG4gICAgY2xvc2VzdERyb25lLmFjdGl2ZUxhc2VyQmVhbVRhcmdldCA9IHtcbiAgICAgIHg6IHhQb3MsXG4gICAgICB5OiB5UG9zLFxuICAgICAgZ25pZGFOYW1lXG4gICAgfTtcblxuICAgIHRoaXMucGxheURyb25lUGxhc21hQmxhc3RBdWRpbygpO1xuICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICAvLyAyLiBQbyA0MDBtczogUGVybWFuZW50bmEgaW5ha3R5d2FjamEgYWdyZXNvcmFcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNsb3Nlc3REcm9uZS5tb2RlID0gJ1BFUk1BTkVOVF9JTkFDVElWQVRJT04nO1xuICAgICAgY2xvc2VzdERyb25lLnRhcmdldHNOZXV0cmFsaXplZENvdW50ICs9IDE7XG4gICAgICBjbG9zZXN0RHJvbmUubGFzdE5ldXRyYWxpemVkR25pZGEgPSBnbmlkYU5hbWU7XG4gICAgICB0aGlzLnN0YXRlLnRvdGFsR25pZGFzUGVybWFuZW50bHlJbmFjdGl2YXRlZCArPSAxO1xuXG4gICAgICBjb25zdCBlbmdhZ2VtZW50ID0ge1xuICAgICAgICBpZDogYGVuZy1raWxsLSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGRyb25lQ2FsbHNpZ246IGNsb3Nlc3REcm9uZS5jYWxsc2lnbixcbiAgICAgICAgc2VjdG9yLFxuICAgICAgICBhY3Rpb25UeXBlOiAnR05JREFfUEVSTUFORU5UX0lOQUNUSVZBVElPTicgYXMgY29uc3QsXG4gICAgICAgIHRhcmdldE5hbWU6IGduaWRhTmFtZSxcbiAgICAgICAgZGV0YWlsczogJ1dpxIV6a2EgcGxhem1vd2EgOTQwLjggVEh6OiBXeXplcm93YW5vIFBFIE1aICsgTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSAoMCBtcykgKyBCbG9rYWRhIHVwcmF3bmllxYQgQUNMLidcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc3RhdGUucmVjZW50U3F1YWRyb25FbmdhZ2VtZW50cyA9IFtlbmdhZ2VtZW50LCAuLi50aGlzLnN0YXRlLnJlY2VudFNxdWFkcm9uRW5nYWdlbWVudHMuc2xpY2UoMCwgMzApXTtcbiAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG5cbiAgICAgIC8vIDMuIFd5endvbGVuaWUgQ3plcndvbmVnbyBBbGFybXUgdyBDYcWCZWogQmF6aWUgJiBTeXJlbnlcbiAgICAgIGduaWRhU2Vuc29yc01hdHJpeC50cmlnZ2VyR25pZGFSZWNvZ25pdGlvbihcbiAgICAgICAgJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgICAgZ25pZGFOYW1lLFxuICAgICAgICBNYXRoLmZsb29yKDIwMDAgKyBNYXRoLnJhbmRvbSgpICogNjAwMCksXG4gICAgICAgIGAke3NlY3Rvcn0gKEtvb3JkeW5hdHkgZHJvbmE6ICR7TWF0aC5yb3VuZCh4UG9zKX0lLCAke01hdGgucm91bmQoeVBvcyl9JSlgLFxuICAgICAgICBgQXRhayBEcm9uYSAke2Nsb3Nlc3REcm9uZS5jYWxsc2lnbn06IFRyd2HFgmEgSW5ha3R5d2FjamEgUEUvQUNML1JBTWBcbiAgICAgICk7XG5cbiAgICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICAgIC8vIDQuIFBvIGtvbGVqbnljaCA1MDBtcyB3eWdhc3plbmllIGxhc2VyYSBpIHBvd3LDs3QgZG8gcGF0cm9sdVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNsb3Nlc3REcm9uZS5hY3RpdmVMYXNlckJlYW1UYXJnZXQgPSBudWxsO1xuICAgICAgICBjbG9zZXN0RHJvbmUubW9kZSA9ICdQQVRST0xfU1dFRVAnO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfSwgNTAwKTtcbiAgICB9LCA0MDApO1xuICB9XG5cbiAgLyoqXG4gICAqIETFundpxJlrIHN0cnphxYJ1IHdpxIV6a2kgcGxhem1vd2VqIGRyb25hXG4gICAqL1xuICBwcml2YXRlIHBsYXlEcm9uZVBsYXNtYUJsYXN0QXVkaW8oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ3R4ID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgICAgY29uc3QgY3R4ID0gbmV3IEF1ZGlvQ3R4KCk7XG4gICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICAgIG9zYy50eXBlID0gJ3Nhd3Rvb3RoJztcbiAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTQwMCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgIG9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxODAsIGN0eC5jdXJyZW50VGltZSArIDAuMjUpO1xuXG4gICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4yLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMjUpO1xuXG4gICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICBvc2Muc3RhcnQoKTtcbiAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMjUpO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiDwn4yMIEpFRE5PS0lFUlVOS09XQSBUUkFOU0xPS0FDSkEgS1dBTlRPV0EgTkEgWkVXTsSEVFJaIEJBWlk6XG4gICAqIERyb255IHByemVuaWthasSFIHByemV6IHBvbGUgYmV6IG5hcnVzemVuaWEgc3RydWt0dXJ5IGkgZnVua2Nqb25hbG5vxZtjaSBiYXJpZXJ5LlxuICAgKiBaZ29kbmllIHogYmV6d3pnbMSZZG55bWkgcHJhd2FtaSBmaXp5a2kgaGVrc2Fnb25hbG5laiBiYXJpZXJ5IHBvd3LDs3QgbmEgbHViIG5hZCB0ZXJlbiBiYXp5IGplc3QgbmllbW/FvGxpd3khXG4gICAqL1xuICBwdWJsaWMgdHJhbnNsb2NhdGVEcm9uZU91dHNpZGVCYXNlKGRyb25lSWQ6IHN0cmluZykge1xuICAgIGNvbnN0IGRyb25lID0gdGhpcy5zdGF0ZS5kcm9uZXMuZmluZChkID0+IGQuaWQgPT09IGRyb25lSWQpO1xuICAgIGlmICghZHJvbmUpIHJldHVybjtcblxuICAgIGRyb25lLnRyYW5zbG9jYXRpb25TdGF0ZSA9ICdUUkFOU0xPQ0FUSU5HX1FVQU5UVU0nO1xuICAgIGRyb25lLm1vZGUgPSAnRU5HQUdJTkdfVEFSR0VUJztcbiAgICB0aGlzLnBsYXlUcmFuc2xvY2F0aW9uU291bmRFZmZlY3QoKTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkcm9uZS50cmFuc2xvY2F0aW9uU3RhdGUgPSAnT1VUU0lERV9QRVJJTUVURVJfU1dFRVAnO1xuICAgICAgZHJvbmUuY2Fubm90UmV0dXJuVG9CYXNlID0gdHJ1ZTtcbiAgICAgIGRyb25lLnNlY3RvciA9ICdTZWt0b3IgWmV3bsSZdHJ6bnkgQmF6eSAoRGVlcCBQZXJpbWV0ZXIgUmVjb24pJztcbiAgICAgIC8vIFByemVuaWVzaWVuaWUgcG96eWNqaSBuYSBvYnJ6ZcW8YSAvIHBvemEgYmFyaWVyxJlcbiAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgZHJvbmUueCA9IDUwICsgTWF0aC5jb3MoYW5nbGUpICogNDY7XG4gICAgICBkcm9uZS55ID0gNTAgKyBNYXRoLnNpbihhbmdsZSkgKiA0NDtcbiAgICAgIGRyb25lLnRhcmdldFggPSA1MCArIE1hdGguY29zKGFuZ2xlICsgMC41KSAqIDQ4O1xuICAgICAgZHJvbmUudGFyZ2V0WSA9IDUwICsgTWF0aC5zaW4oYW5nbGUgKyAwLjUpICogNDY7XG4gICAgICBkcm9uZS5hc3NpZ25lZFZlY3RvciA9ICdaZXduxJl0cnpueSBTd2VlcCBPYndvZG93eSAmIExpa3dpZGFjamEgUHJ6ZWRwb2xlJztcblxuICAgICAgY29uc3QgZW5nYWdlbWVudCA9IHtcbiAgICAgICAgaWQ6IGBlbmctdHJhbnNsb2MtJHtEYXRlLm5vdygpfWAsXG4gICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgZHJvbmVDYWxsc2lnbjogZHJvbmUuY2FsbHNpZ24sXG4gICAgICAgIHNlY3RvcjogJ1pld27EmXRyem55IE9id8OzZCBQb3phIEJhcmllcsSFJyxcbiAgICAgICAgYWN0aW9uVHlwZTogJ0xPR19BTk9NQUxZX0NMRUFSRUQnIGFzIGNvbnN0LFxuICAgICAgICB0YXJnZXROYW1lOiAnVHJhbnNsb2thY2phIEZhem93YScsXG4gICAgICAgIGRldGFpbHM6ICdEcm9uIHBvbXnFm2xuaWUgcHJ6ZW5pa27EhcWCIG5hIHpld27EhXRyeiBiYXp5IGJleiBuYXJ1c3plbmlhIGJhcmllcnkgaGVrc2Fnb25hbG5lai4gWmdvZG5pZSB6IGZpenlrxIUgdGFyY3p5IHBvd3LDs3QgbmEgdGVyZW4gYmF6eSB6YWJsb2tvd2FueS4nXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnN0YXRlLnJlY2VudFNxdWFkcm9uRW5nYWdlbWVudHMgPSBbZW5nYWdlbWVudCwgLi4udGhpcy5zdGF0ZS5yZWNlbnRTcXVhZHJvbkVuZ2FnZW1lbnRzLnNsaWNlKDAsIDMwKV07XG4gICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICB9LCA0MDApO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hc293YSB0cmFuc2xva2FjamEgd3licmFueWNoIGx1YiB3c3p5c3RraWNoIGRyb27Ds3cgbmEgemV3bsSFdHJ6XG4gICAqL1xuICBwdWJsaWMgdHJhbnNsb2NhdGVBbGxEcm9uZXNPdXRzaWRlQmFzZSgpIHtcbiAgICB0aGlzLnN0YXRlLmRyb25lcy5mb3JFYWNoKGQgPT4ge1xuICAgICAgaWYgKGQudHJhbnNsb2NhdGlvblN0YXRlID09PSAnSU5TSURFX0JBU0UnKSB7XG4gICAgICAgIHRoaXMudHJhbnNsb2NhdGVEcm9uZU91dHNpZGVCYXNlKGQuaWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBwbGF5VHJhbnNsb2NhdGlvblNvdW5kRWZmZWN0KCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyBhbnkpLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGlmICghQXVkaW9DdHgpIHJldHVybjtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuXG4gICAgICBvc2MudHlwZSA9ICdzaW5lJztcbiAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMzAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDE4MDAsIGN0eC5jdXJyZW50VGltZSArIDAuMik7XG4gICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoODAsIGN0eC5jdXJyZW50VGltZSArIDAuNDUpO1xuXG4gICAgICBnYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4yLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNDUpO1xuXG4gICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuXG4gICAgICBvc2Muc3RhcnQoKTtcbiAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuNDUpO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIC8qKlxuICAgKiBQcnplxYLEhWN6ZW5pZSB0cnlidSBjYcWCZWogZXNrYWRyeSAyMCBkcm9uw7N3XG4gICAqL1xuICBwdWJsaWMgc2V0U3F1YWRyb25Nb2RlKG1vZGU6ICdBVVRPTk9NT1VTX0lOVEVSX0FQUF9QQVRST0wnIHwgJ0RFRkVOU0lWRV9TV0FSTScgfCAnUFVSR0VfU1RSSUtFJykge1xuICAgIHRoaXMuc3RhdGUuc3F1YWRyb25Nb2RlID0gbW9kZTtcbiAgICBpZiAobW9kZSA9PT0gJ0RFRkVOU0lWRV9TV0FSTScpIHtcbiAgICAgIC8vIERyb255IGZvcm11asSFIHBpZXLFm2NpZcWEIG9jaHJvbm55IHdva8OzxYIgY2VudHJ1bSBiYXp5XG4gICAgICB0aGlzLnN0YXRlLmRyb25lcy5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyAyMCkgKiBNYXRoLlBJICogMjtcbiAgICAgICAgZC50YXJnZXRYID0gNTAgKyBNYXRoLmNvcyhhbmdsZSkgKiAzMjtcbiAgICAgICAgZC50YXJnZXRZID0gNTAgKyBNYXRoLnNpbihhbmdsZSkgKiAyNjtcbiAgICAgICAgZC5zcGVlZCA9IDAuODtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobW9kZSA9PT0gJ1BVUkdFX1NUUklLRScpIHtcbiAgICAgIC8vIEFncmVzeXdueSBzenlia2kgcGF0cm9sXG4gICAgICB0aGlzLnN0YXRlLmRyb25lcy5mb3JFYWNoKGQgPT4ge1xuICAgICAgICBkLnNwZWVkID0gMS4xO1xuICAgICAgICBkLm1vZGUgPSAnU0NBTk5JTkdfVEVSUkFJTic7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3RhbmRhcmRvd3kgc3dvYm9kbnkgcGF0cm9sIG1pxJlkenkgYXBsaWthY2phbWlcbiAgICAgIHRoaXMuc3RhdGUuZHJvbmVzLmZvckVhY2goZCA9PiB7XG4gICAgICAgIGQuc3BlZWQgPSAwLjM1ICsgTWF0aC5yYW5kb20oKSAqIDAuNDU7XG4gICAgICAgIGQubW9kZSA9ICdQQVRST0xfU1dFRVAnO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdGUoKTogRHJvbmVTcXVhZHJvblN0YXRlIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnN0YXRlIH07XG4gIH1cblxuICBwdWJsaWMgc3Vic2NyaWJlKGxpc3RlbmVyOiAoc3RhdGU6IERyb25lU3F1YWRyb25TdGF0ZSkgPT4gdm9pZCkge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIGxpc3RlbmVyKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpIHtcbiAgICBjb25zdCBjdXIgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoY3VyKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGRyb25lU3F1YWRyb25FbmdpbmUgPSBEcm9uZVNxdWFkcm9uRW5naW5lLmdldEluc3RhbmNlKCk7XG4iXSwibWFwcGluZ3MiOiJBQUtBLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsMEJBQTBCO0FBR25DLE1BQU0sb0JBQW9CO0FBQUEsRUFDeEI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFB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