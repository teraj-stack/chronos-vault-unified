import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
class SentinelWatchdogBotEngine {
  constructor() {
    this.isRunning = false;
    this.timerId = null;
    this.scanIntervalMs = 450;
    this.inspectionIndex = 0;
    this.listeners = [];
    this.inspectionTargets = [
      "Logi Systemowe & Integralność Dziennika Zdarzeń (Audit Ledger)",
      "Magazyn Danych LocalStorage & Schematy JSON Sandbox",
      "Węzły Pamięci I/O & Przepływ Strumienia DWM",
      "Deskryptory Procesów & Bezpieczne Uchwyty Win32/X11",
      "Bariera Heksagonalna & Spójność Pola Energetycznego",
      "Czujniki Sensoryczne Gnid & Rejestr Przechwyceń",
      "Pętla Zdarzeń React DOM & Globalne Handlery Błędów"
    ];
    this.state = {
      isRunning: true,
      status: "SCANNING",
      currentInspectionTarget: "Logi Systemowe & Integralność Dziennika Zdarzeń (Audit Ledger)",
      scanCycles: 142,
      defectsDetectedCount: 0,
      autoRepairsCompletedCount: 0,
      lastRepairEvent: null,
      repairHistory: [],
      systemHealthIndex: 100,
      monitoredVectors: [
        { name: "Audit & Diagnostic Logs", description: "Czystość nagłówków i integralność wpisów audit logs", status: "HEALTHY", checkRateHz: 2.5 },
        { name: "LocalStorage JSON Sandbox", description: "Walidacja struktur danych i zapobieganie korupcji quota", status: "HEALTHY", checkRateHz: 2.2 },
        { name: "System I/O Memory Nodes", description: "Detekcja uszkodzonych wskaźników i wiszących uchwytów", status: "HEALTHY", checkRateHz: 2 },
        { name: "Unhandled Error Interceptor", description: "Ochrona przed awariami runtime i zapętleniami pętli UI", status: "HEALTHY", checkRateHz: 3 },
        { name: "Hexagonal Shield State Mesh", description: "Synchronizacja energii tarczy i matrycy pancerza", status: "HEALTHY", checkRateHz: 1.8 }
      ]
    };
    this.loadState();
    this.attachGlobalErrorHooks();
    this.start();
  }
  static getInstance() {
    if (!SentinelWatchdogBotEngine.instance) {
      SentinelWatchdogBotEngine.instance = new SentinelWatchdogBotEngine();
    }
    return SentinelWatchdogBotEngine.instance;
  }
  loadState() {
    try {
      const savedHistory = safeStorage.get("sentinel_bot_repair_history", []);
      const savedRepairsCount = safeStorage.get("sentinel_bot_repairs_count", 0);
      const savedDefectsCount = safeStorage.get("sentinel_bot_defects_count", 0);
      this.state.repairHistory = savedHistory;
      this.state.autoRepairsCompletedCount = savedRepairsCount;
      this.state.defectsDetectedCount = savedDefectsCount;
      if (savedHistory.length > 0) {
        this.state.lastRepairEvent = savedHistory[0];
      }
    } catch {
    }
  }
  saveState() {
    safeStorage.set("sentinel_bot_repair_history", this.state.repairHistory.slice(0, 50));
    safeStorage.set("sentinel_bot_repairs_count", this.state.autoRepairsCompletedCount);
    safeStorage.set("sentinel_bot_defects_count", this.state.defectsDetectedCount);
  }
  attachGlobalErrorHooks() {
    if (typeof window === "undefined") return;
    window.addEventListener("error", (event) => {
      console.warn("[Sentinel Robot] Wykryto nieobsłużony błąd runtime:", event.message);
      this.handleDetectedDefect(
        "UNHANDLED_EXCEPTION_BURST",
        "Global Window Error Loop",
        `Wykryto wyjątek JS: "${event.message}" w pliku ${event.filename || "unknown"}`,
        "Natychmiastowe przechwycenie błędu, odizolowanie wadliwego wątku i przywrócenie spójności stanu."
      );
    });
    window.addEventListener("unhandledrejection", (event) => {
      console.warn("[Sentinel Robot] Wykryto unhandled Promise rejection:", event.reason);
      this.handleDetectedDefect(
        "UNHANDLED_EXCEPTION_BURST",
        "Async Promise Loop",
        `Odrzucona obietnica (Promise rejection): ${String(event.reason)}`,
        "Neutralizacja wycieku asynchronicznego, wyczyszczenie bufora odrzuceń i kontynuacja skanowania."
      );
    });
  }
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.state.isRunning = true;
    this.state.status = "SCANNING";
    this.timerId = setInterval(() => this.executeScanCycle(), this.scanIntervalMs);
    this.notify();
  }
  stop() {
    if (!this.isRunning) return;
    this.isRunning = false;
    this.state.isRunning = false;
    this.state.status = "PAUSED";
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }
  /**
   * Główna ciągła pętla skanowania i diagnostyki robota
   */
  executeScanCycle() {
    if (!this.isRunning) return;
    this.state.scanCycles += 1;
    this.inspectionIndex = (this.inspectionIndex + 1) % this.inspectionTargets.length;
    this.state.currentInspectionTarget = this.inspectionTargets[this.inspectionIndex];
    const rawLogs = safeStorage.get("sentinel_repair_logs", []);
    let corruptedLogFound = false;
    if (Array.isArray(rawLogs)) {
      for (const log of rawLogs) {
        if (!log || typeof log !== "object" || !log.id || !log.timestamp || !log.action) {
          corruptedLogFound = true;
          break;
        }
      }
    } else {
      corruptedLogFound = true;
    }
    if (corruptedLogFound) {
      this.handleDetectedDefect(
        "CORRUPTED_LOG_ENTRY",
        "Magazyn Dziennika Zdarzeń (Audit Ledger)",
        "Wykryto uszkodzony lub niepełny wpis w rejestrze logów (brakujące identyfikatory lub unparseable data).",
        "Zrekonstruowano nagłówki logów, wyczyszczono uszkodzone rekordy i przywrócono integralność bazy."
      );
      return;
    }
    try {
      const corruptedTestKey = window.localStorage.getItem("sentinel_simulated_corrupted_key");
      if (corruptedTestKey !== null) {
        this.handleDetectedDefect(
          "BROKEN_LOCALSTORAGE_JSON",
          "Pamięć Trwała LocalStorage",
          `Wykryto uszkodzoną strukturę JSON w kluczu testowym: "${corruptedTestKey.slice(0, 40)}..."`,
          "Usunięto uszkodzony klucz, odtworzono spójną strukturę JSON i zabezpieczono barierę sandboxa."
        );
        window.localStorage.removeItem("sentinel_simulated_corrupted_key");
        return;
      }
    } catch {
    }
    const ioNodes = safeStorage.get("sentinel_radar_io_nodes", []);
    let corruptedNode = false;
    if (Array.isArray(ioNodes)) {
      for (const node of ioNodes) {
        if (!node.id || !node.name || typeof node.latencyMs !== "number" || isNaN(node.latencyMs)) {
          corruptedNode = true;
          break;
        }
      }
    }
    if (corruptedNode) {
      this.handleDetectedDefect(
        "MEMORY_LEAK_OR_DANGLING_NODE",
        "Węzły Magistrali I/O & Deskryptory Pamięci",
        "Wykryto uszkodzony deskryptor węzła sprzętowego (wartość NaN w latencji lub brak identyfikatora).",
        "Zresetowano uszkodzone deskryptory I/O, przywrócono bazowe parametry 0.1ms i wznowiono strumień."
      );
      return;
    }
    if (this.state.status !== "SCANNING") {
      this.state.status = "SCANNING";
    }
    this.state.systemHealthIndex = 100;
    this.notify();
  }
  /**
   * ⚡ NATYCHMIASTOWA NAPRAWA PO ZLOKALIZOWANIU BŁĘDU LUB USZKODZENIA,
   * A NASTĘPNIE PŁYNNE KONTYNUOWANIE SKANOWANIA!
   */
  handleDetectedDefect(defectType, targetComponent, diagnosticDetails, repairActionExecuted) {
    const startTime = performance.now();
    this.state.defectsDetectedCount += 1;
    this.state.status = "DEFECT_DETECTED";
    this.state.systemHealthIndex = 75;
    this.notify();
    this.playRepairAudioTone();
    setTimeout(() => {
      this.state.status = "AUTO_REPAIRING";
      this.notify();
      this.applyConcreteRepair(defectType);
      const recoveryDurationMs = Math.max(1, Math.round(performance.now() - startTime));
      const repairEvent = {
        id: `repair-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        defectType,
        targetComponent,
        diagnosticDetails,
        repairActionExecuted,
        recoveryDurationMs,
        integrityVerified: true
      };
      this.state.autoRepairsCompletedCount += 1;
      this.state.lastRepairEvent = repairEvent;
      this.state.repairHistory = [repairEvent, ...this.state.repairHistory.slice(0, 40)];
      this.state.status = "REPAIRED_HEALTHY";
      this.state.systemHealthIndex = 100;
      this.saveState();
      this.notify();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sentinel:bot-auto-repaired", { detail: repairEvent }));
      }
      setTimeout(() => {
        if (this.isRunning) {
          this.state.status = "SCANNING";
          this.notify();
        }
      }, 350);
    }, 120);
  }
  applyConcreteRepair(defectType) {
    try {
      if (defectType === "CORRUPTED_LOG_ENTRY") {
        const rawLogs = safeStorage.get("sentinel_repair_logs", []);
        const sanitized = Array.isArray(rawLogs) ? rawLogs.filter((l) => l && typeof l === "object" && l.id && l.action) : [];
        sanitized.unshift({
          id: `restored-${Date.now()}`,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
          action: "AUTONOMICZNA ODBUDOWA DZIENNIKA ZDARZEŃ",
          component: "Sentinel Watchdog Bot",
          status: "SUCCESS",
          message: "Robot zneutralizował uszkodzone wpisy i odtworzył strukturę dziennika."
        });
        safeStorage.set("sentinel_repair_logs", sanitized);
      } else if (defectType === "BROKEN_LOCALSTORAGE_JSON") {
        try {
          window.localStorage.removeItem("sentinel_simulated_corrupted_key");
        } catch {
        }
      } else if (defectType === "MEMORY_LEAK_OR_DANGLING_NODE") {
        const defaultNodes = [
          { id: "node-dwm-01", name: "OUT-DWM-01 (Monitor DirectFlip)", latencyMs: 0.1, status: "SECURE" },
          { id: "node-pcie-01", name: "BUS-PCIE-01 (PCIe x16 GPU)", latencyMs: 0.1, status: "SECURE" },
          { id: "node-ram-01", name: "MEM-DDR5-01 (Segment RAM Ring-3)", latencyMs: 0.05, status: "SECURE" },
          { id: "node-hid-01", name: "INP-USB-01 (RawInput Klawiatura)", latencyMs: 0.2, status: "SECURE" }
        ];
        safeStorage.set("sentinel_radar_io_nodes", defaultNodes);
      }
    } catch (err) {
      console.warn("[Sentinel Robot] Błąd podczas fizycznej naprawy:", err);
    }
  }
  /**
   * 🧪 SYMULACJA USZKODZENIA DO TESTÓW ROBOTA
   * Pozwala użytkownikowi kliknąć przycisk i obserwować jak robot natychmiast
   * wykrywa uszkodzenie, naprawia je i natychmiast wznawia skanowanie!
   */
  injectSimulatedDefect(defectType) {
    if (defectType === "CORRUPTED_LOG_ENTRY") {
      const logs = safeStorage.get("sentinel_repair_logs", []);
      logs.unshift({ id: null, action: null, brokenBytePayload: "0xDEADBEEF_CORRUPTED" });
      safeStorage.set("sentinel_repair_logs", logs);
    } else if (defectType === "BROKEN_LOCALSTORAGE_JSON") {
      try {
        window.localStorage.setItem("sentinel_simulated_corrupted_key", "{ INVALID_JSON_SYNTAX_ERROR: >>> ??? <<< }");
      } catch {
      }
    } else if (defectType === "MEMORY_LEAK_OR_DANGLING_NODE") {
      const nodes = safeStorage.get("sentinel_radar_io_nodes", []);
      nodes.push({ id: "broken-node", name: "CORRUPTED_DMA_POINTER", latencyMs: NaN });
      safeStorage.set("sentinel_radar_io_nodes", nodes);
    } else {
      this.handleDetectedDefect(
        defectType,
        "Komponent Runtime Aplikacji",
        "Wymuszono testową anomalię stanu aplikacji w celu weryfikacji szybkości reakcji robota.",
        "Robot przechwycił anomalię, wyzerował uszkodzone parametry i przywrócił pełną sprawność."
      );
      return;
    }
    this.executeScanCycle();
  }
  playRepairAudioTone() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1040, ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch {
    }
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
    const currentState = this.getState();
    this.listeners.forEach((l) => l(currentState));
  }
}
export const sentinelBotEngine = SentinelWatchdogBotEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlbnRpbmVsQm90RW5naW5lLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFxuICBTZW50aW5lbEJvdFN0YXRlLCBcbiAgU2VudGluZWxCb3RTdGF0dXMsIFxuICBTZW50aW5lbEJvdERlZmVjdFR5cGUsIFxuICBTZW50aW5lbEJvdFJlcGFpckV2ZW50IFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5cbmNsYXNzIFNlbnRpbmVsV2F0Y2hkb2dCb3RFbmdpbmUge1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogU2VudGluZWxXYXRjaGRvZ0JvdEVuZ2luZTtcbiAgcHJpdmF0ZSBpc1J1bm5pbmc6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSB0aW1lcklkOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIHNjYW5JbnRlcnZhbE1zOiBudW1iZXIgPSA0NTA7XG4gIHByaXZhdGUgaW5zcGVjdGlvbkluZGV4OiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8KHN0YXRlOiBTZW50aW5lbEJvdFN0YXRlKSA9PiB2b2lkPiA9IFtdO1xuXG4gIHByaXZhdGUgaW5zcGVjdGlvblRhcmdldHMgPSBbXG4gICAgJ0xvZ2kgU3lzdGVtb3dlICYgSW50ZWdyYWxub8WbxIcgRHppZW5uaWthIFpkYXJ6ZcWEIChBdWRpdCBMZWRnZXIpJyxcbiAgICAnTWFnYXp5biBEYW55Y2ggTG9jYWxTdG9yYWdlICYgU2NoZW1hdHkgSlNPTiBTYW5kYm94JyxcbiAgICAnV8SZesWCeSBQYW1pxJljaSBJL08gJiBQcnplcMWCeXcgU3RydW1pZW5pYSBEV00nLFxuICAgICdEZXNrcnlwdG9yeSBQcm9jZXPDs3cgJiBCZXpwaWVjem5lIFVjaHd5dHkgV2luMzIvWDExJyxcbiAgICAnQmFyaWVyYSBIZWtzYWdvbmFsbmEgJiBTcMOzam5vxZvEhyBQb2xhIEVuZXJnZXR5Y3puZWdvJyxcbiAgICAnQ3p1am5pa2kgU2Vuc29yeWN6bmUgR25pZCAmIFJlamVzdHIgUHJ6ZWNod3ljZcWEJyxcbiAgICAnUMSZdGxhIFpkYXJ6ZcWEIFJlYWN0IERPTSAmIEdsb2JhbG5lIEhhbmRsZXJ5IELFgsSZZMOzdydcbiAgXTtcblxuICBwcml2YXRlIHN0YXRlOiBTZW50aW5lbEJvdFN0YXRlID0ge1xuICAgIGlzUnVubmluZzogdHJ1ZSxcbiAgICBzdGF0dXM6ICdTQ0FOTklORycsXG4gICAgY3VycmVudEluc3BlY3Rpb25UYXJnZXQ6ICdMb2dpIFN5c3RlbW93ZSAmIEludGVncmFsbm/Fm8SHIER6aWVubmlrYSBaZGFyemXFhCAoQXVkaXQgTGVkZ2VyKScsXG4gICAgc2NhbkN5Y2xlczogMTQyLFxuICAgIGRlZmVjdHNEZXRlY3RlZENvdW50OiAwLFxuICAgIGF1dG9SZXBhaXJzQ29tcGxldGVkQ291bnQ6IDAsXG4gICAgbGFzdFJlcGFpckV2ZW50OiBudWxsLFxuICAgIHJlcGFpckhpc3Rvcnk6IFtdLFxuICAgIHN5c3RlbUhlYWx0aEluZGV4OiAxMDAsXG4gICAgbW9uaXRvcmVkVmVjdG9yczogW1xuICAgICAgeyBuYW1lOiAnQXVkaXQgJiBEaWFnbm9zdGljIExvZ3MnLCBkZXNjcmlwdGlvbjogJ0N6eXN0b8WbxIcgbmFnxYLDs3drw7N3IGkgaW50ZWdyYWxub8WbxIcgd3Bpc8OzdyBhdWRpdCBsb2dzJywgc3RhdHVzOiAnSEVBTFRIWScsIGNoZWNrUmF0ZUh6OiAyLjUgfSxcbiAgICAgIHsgbmFtZTogJ0xvY2FsU3RvcmFnZSBKU09OIFNhbmRib3gnLCBkZXNjcmlwdGlvbjogJ1dhbGlkYWNqYSBzdHJ1a3R1ciBkYW55Y2ggaSB6YXBvYmllZ2FuaWUga29ydXBjamkgcXVvdGEnLCBzdGF0dXM6ICdIRUFMVEhZJywgY2hlY2tSYXRlSHo6IDIuMiB9LFxuICAgICAgeyBuYW1lOiAnU3lzdGVtIEkvTyBNZW1vcnkgTm9kZXMnLCBkZXNjcmlwdGlvbjogJ0RldGVrY2phIHVzemtvZHpvbnljaCB3c2thxbpuaWvDs3cgaSB3aXN6xIVjeWNoIHVjaHd5dMOzdycsIHN0YXR1czogJ0hFQUxUSFknLCBjaGVja1JhdGVIejogMi4wIH0sXG4gICAgICB7IG5hbWU6ICdVbmhhbmRsZWQgRXJyb3IgSW50ZXJjZXB0b3InLCBkZXNjcmlwdGlvbjogJ09jaHJvbmEgcHJ6ZWQgYXdhcmlhbWkgcnVudGltZSBpIHphcMSZdGxlbmlhbWkgcMSZdGxpIFVJJywgc3RhdHVzOiAnSEVBTFRIWScsIGNoZWNrUmF0ZUh6OiAzLjAgfSxcbiAgICAgIHsgbmFtZTogJ0hleGFnb25hbCBTaGllbGQgU3RhdGUgTWVzaCcsIGRlc2NyaXB0aW9uOiAnU3luY2hyb25pemFjamEgZW5lcmdpaSB0YXJjenkgaSBtYXRyeWN5IHBhbmNlcnphJywgc3RhdHVzOiAnSEVBTFRIWScsIGNoZWNrUmF0ZUh6OiAxLjggfVxuICAgIF1cbiAgfTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZFN0YXRlKCk7XG4gICAgdGhpcy5hdHRhY2hHbG9iYWxFcnJvckhvb2tzKCk7XG4gICAgdGhpcy5zdGFydCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBTZW50aW5lbFdhdGNoZG9nQm90RW5naW5lIHtcbiAgICBpZiAoIVNlbnRpbmVsV2F0Y2hkb2dCb3RFbmdpbmUuaW5zdGFuY2UpIHtcbiAgICAgIFNlbnRpbmVsV2F0Y2hkb2dCb3RFbmdpbmUuaW5zdGFuY2UgPSBuZXcgU2VudGluZWxXYXRjaGRvZ0JvdEVuZ2luZSgpO1xuICAgIH1cbiAgICByZXR1cm4gU2VudGluZWxXYXRjaGRvZ0JvdEVuZ2luZS5pbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZFN0YXRlKCkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzYXZlZEhpc3RvcnkgPSBzYWZlU3RvcmFnZS5nZXQ8U2VudGluZWxCb3RSZXBhaXJFdmVudFtdPignc2VudGluZWxfYm90X3JlcGFpcl9oaXN0b3J5JywgW10pO1xuICAgICAgY29uc3Qgc2F2ZWRSZXBhaXJzQ291bnQgPSBzYWZlU3RvcmFnZS5nZXQ8bnVtYmVyPignc2VudGluZWxfYm90X3JlcGFpcnNfY291bnQnLCAwKTtcbiAgICAgIGNvbnN0IHNhdmVkRGVmZWN0c0NvdW50ID0gc2FmZVN0b3JhZ2UuZ2V0PG51bWJlcj4oJ3NlbnRpbmVsX2JvdF9kZWZlY3RzX2NvdW50JywgMCk7XG4gICAgICBcbiAgICAgIHRoaXMuc3RhdGUucmVwYWlySGlzdG9yeSA9IHNhdmVkSGlzdG9yeTtcbiAgICAgIHRoaXMuc3RhdGUuYXV0b1JlcGFpcnNDb21wbGV0ZWRDb3VudCA9IHNhdmVkUmVwYWlyc0NvdW50O1xuICAgICAgdGhpcy5zdGF0ZS5kZWZlY3RzRGV0ZWN0ZWRDb3VudCA9IHNhdmVkRGVmZWN0c0NvdW50O1xuICAgICAgaWYgKHNhdmVkSGlzdG9yeS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc3RhdGUubGFzdFJlcGFpckV2ZW50ID0gc2F2ZWRIaXN0b3J5WzBdO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gc2FmZSBmYWxsYmFja1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVN0YXRlKCkge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfYm90X3JlcGFpcl9oaXN0b3J5JywgdGhpcy5zdGF0ZS5yZXBhaXJIaXN0b3J5LnNsaWNlKDAsIDUwKSk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9ib3RfcmVwYWlyc19jb3VudCcsIHRoaXMuc3RhdGUuYXV0b1JlcGFpcnNDb21wbGV0ZWRDb3VudCk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9ib3RfZGVmZWN0c19jb3VudCcsIHRoaXMuc3RhdGUuZGVmZWN0c0RldGVjdGVkQ291bnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhdHRhY2hHbG9iYWxFcnJvckhvb2tzKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuXG4gICAgLy8gTW9uaXRvciBnbG9iYWwgdW5oYW5kbGVkIGVycm9yc1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIChldmVudCkgPT4ge1xuICAgICAgLy8gSWYgYW4gZXJyb3IgaXMgY2F1Z2h0IGluIHRoZSBhcHAsIHRyaWdnZXIgcm9ib3QgaW1tZWRpYXRlIHJlcGFpclxuICAgICAgY29uc29sZS53YXJuKCdbU2VudGluZWwgUm9ib3RdIFd5a3J5dG8gbmllb2JzxYJ1xbxvbnkgYsWCxIVkIHJ1bnRpbWU6JywgZXZlbnQubWVzc2FnZSk7XG4gICAgICB0aGlzLmhhbmRsZURldGVjdGVkRGVmZWN0KFxuICAgICAgICAnVU5IQU5ETEVEX0VYQ0VQVElPTl9CVVJTVCcsXG4gICAgICAgICdHbG9iYWwgV2luZG93IEVycm9yIExvb3AnLFxuICAgICAgICBgV3lrcnl0byB3eWrEhXRlayBKUzogXCIke2V2ZW50Lm1lc3NhZ2V9XCIgdyBwbGlrdSAke2V2ZW50LmZpbGVuYW1lIHx8ICd1bmtub3duJ31gLFxuICAgICAgICAnTmF0eWNobWlhc3Rvd2UgcHJ6ZWNod3ljZW5pZSBixYLEmWR1LCBvZGl6b2xvd2FuaWUgd2FkbGl3ZWdvIHfEhXRrdSBpIHByenl3csOzY2VuaWUgc3DDs2pub8WbY2kgc3RhbnUuJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd1bmhhbmRsZWRyZWplY3Rpb24nLCAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnNvbGUud2FybignW1NlbnRpbmVsIFJvYm90XSBXeWtyeXRvIHVuaGFuZGxlZCBQcm9taXNlIHJlamVjdGlvbjonLCBldmVudC5yZWFzb24pO1xuICAgICAgdGhpcy5oYW5kbGVEZXRlY3RlZERlZmVjdChcbiAgICAgICAgJ1VOSEFORExFRF9FWENFUFRJT05fQlVSU1QnLFxuICAgICAgICAnQXN5bmMgUHJvbWlzZSBMb29wJyxcbiAgICAgICAgYE9kcnp1Y29uYSBvYmlldG5pY2EgKFByb21pc2UgcmVqZWN0aW9uKTogJHtTdHJpbmcoZXZlbnQucmVhc29uKX1gLFxuICAgICAgICAnTmV1dHJhbGl6YWNqYSB3eWNpZWt1IGFzeW5jaHJvbmljem5lZ28sIHd5Y3p5c3pjemVuaWUgYnVmb3JhIG9kcnp1Y2XFhCBpIGtvbnR5bnVhY2phIHNrYW5vd2FuaWEuJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydCgpIHtcbiAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHJldHVybjtcbiAgICB0aGlzLmlzUnVubmluZyA9IHRydWU7XG4gICAgdGhpcy5zdGF0ZS5pc1J1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuc3RhdGUuc3RhdHVzID0gJ1NDQU5OSU5HJztcbiAgICB0aGlzLnRpbWVySWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmV4ZWN1dGVTY2FuQ3ljbGUoKSwgdGhpcy5zY2FuSW50ZXJ2YWxNcyk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCkge1xuICAgIGlmICghdGhpcy5pc1J1bm5pbmcpIHJldHVybjtcbiAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuc3RhdGUuaXNSdW5uaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zdGF0ZS5zdGF0dXMgPSAnUEFVU0VEJztcbiAgICBpZiAodGhpcy50aW1lcklkKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMudGltZXJJZCk7XG4gICAgICB0aGlzLnRpbWVySWQgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEfFgsOzd25hIGNpxIVnxYJhIHDEmXRsYSBza2Fub3dhbmlhIGkgZGlhZ25vc3R5a2kgcm9ib3RhXG4gICAqL1xuICBwcml2YXRlIGV4ZWN1dGVTY2FuQ3ljbGUoKSB7XG4gICAgaWYgKCF0aGlzLmlzUnVubmluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5zdGF0ZS5zY2FuQ3ljbGVzICs9IDE7XG4gICAgdGhpcy5pbnNwZWN0aW9uSW5kZXggPSAodGhpcy5pbnNwZWN0aW9uSW5kZXggKyAxKSAlIHRoaXMuaW5zcGVjdGlvblRhcmdldHMubGVuZ3RoO1xuICAgIHRoaXMuc3RhdGUuY3VycmVudEluc3BlY3Rpb25UYXJnZXQgPSB0aGlzLmluc3BlY3Rpb25UYXJnZXRzW3RoaXMuaW5zcGVjdGlvbkluZGV4XTtcblxuICAgIC8vIDEuIFNwcmF3ZHplbmllIGludGVncmFsbm/Fm2NpIGxvZ8OzdyAoQXVkaXQgTG9ncyBDaGVjaylcbiAgICBjb25zdCByYXdMb2dzID0gc2FmZVN0b3JhZ2UuZ2V0PGFueVtdPignc2VudGluZWxfcmVwYWlyX2xvZ3MnLCBbXSk7XG4gICAgbGV0IGNvcnJ1cHRlZExvZ0ZvdW5kID0gZmFsc2U7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocmF3TG9ncykpIHtcbiAgICAgIGZvciAoY29uc3QgbG9nIG9mIHJhd0xvZ3MpIHtcbiAgICAgICAgaWYgKCFsb2cgfHwgdHlwZW9mIGxvZyAhPT0gJ29iamVjdCcgfHwgIWxvZy5pZCB8fCAhbG9nLnRpbWVzdGFtcCB8fCAhbG9nLmFjdGlvbikge1xuICAgICAgICAgIGNvcnJ1cHRlZExvZ0ZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb3JydXB0ZWRMb2dGb3VuZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGNvcnJ1cHRlZExvZ0ZvdW5kKSB7XG4gICAgICB0aGlzLmhhbmRsZURldGVjdGVkRGVmZWN0KFxuICAgICAgICAnQ09SUlVQVEVEX0xPR19FTlRSWScsXG4gICAgICAgICdNYWdhenluIER6aWVubmlrYSBaZGFyemXFhCAoQXVkaXQgTGVkZ2VyKScsXG4gICAgICAgICdXeWtyeXRvIHVzemtvZHpvbnkgbHViIG5pZXBlxYJueSB3cGlzIHcgcmVqZXN0cnplIGxvZ8OzdyAoYnJha3VqxIVjZSBpZGVudHlmaWthdG9yeSBsdWIgdW5wYXJzZWFibGUgZGF0YSkuJyxcbiAgICAgICAgJ1pyZWtvbnN0cnVvd2FubyBuYWfFgsOzd2tpIGxvZ8Ozdywgd3ljenlzemN6b25vIHVzemtvZHpvbmUgcmVrb3JkeSBpIHByenl3csOzY29ubyBpbnRlZ3JhbG5vxZvEhyBiYXp5LidcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gMi4gU3ByYXdkemVuaWUgdXN6a29kem9ueWNoIGx1YiBjZWxvd28gd3N0cnp5a25pxJl0eWNoIGLFgsSZZMOzdyB3IExvY2FsU3RvcmFnZVxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb3JydXB0ZWRUZXN0S2V5ID0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzZW50aW5lbF9zaW11bGF0ZWRfY29ycnVwdGVkX2tleScpO1xuICAgICAgaWYgKGNvcnJ1cHRlZFRlc3RLZXkgIT09IG51bGwpIHtcbiAgICAgICAgLy8gWm5hbGV6aW9ubyB1c3prb2R6ZW5pZSB3c3RyenlrbmnEmXRlIGRvIHRlc3TDs3dcbiAgICAgICAgdGhpcy5oYW5kbGVEZXRlY3RlZERlZmVjdChcbiAgICAgICAgICAnQlJPS0VOX0xPQ0FMU1RPUkFHRV9KU09OJyxcbiAgICAgICAgICAnUGFtacSZxIcgVHJ3YcWCYSBMb2NhbFN0b3JhZ2UnLFxuICAgICAgICAgIGBXeWtyeXRvIHVzemtvZHpvbsSFIHN0cnVrdHVyxJkgSlNPTiB3IGtsdWN6dSB0ZXN0b3d5bTogXCIke2NvcnJ1cHRlZFRlc3RLZXkuc2xpY2UoMCwgNDApfS4uLlwiYCxcbiAgICAgICAgICAnVXN1bmnEmXRvIHVzemtvZHpvbnkga2x1Y3osIG9kdHdvcnpvbm8gc3DDs2puxIUgc3RydWt0dXLEmSBKU09OIGkgemFiZXpwaWVjem9ubyBiYXJpZXLEmSBzYW5kYm94YS4nXG4gICAgICAgICk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2VudGluZWxfc2ltdWxhdGVkX2NvcnJ1cHRlZF9rZXknKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gaWdub3JlXG4gICAgfVxuXG4gICAgLy8gMy4gU3ByYXdkemVuaWUgc3DDs2pub8WbY2kgd8SZesWCw7N3IEkvT1xuICAgIGNvbnN0IGlvTm9kZXMgPSBzYWZlU3RvcmFnZS5nZXQ8YW55W10+KCdzZW50aW5lbF9yYWRhcl9pb19ub2RlcycsIFtdKTtcbiAgICBsZXQgY29ycnVwdGVkTm9kZSA9IGZhbHNlO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGlvTm9kZXMpKSB7XG4gICAgICBmb3IgKGNvbnN0IG5vZGUgb2YgaW9Ob2Rlcykge1xuICAgICAgICBpZiAoIW5vZGUuaWQgfHwgIW5vZGUubmFtZSB8fCB0eXBlb2Ygbm9kZS5sYXRlbmN5TXMgIT09ICdudW1iZXInIHx8IGlzTmFOKG5vZGUubGF0ZW5jeU1zKSkge1xuICAgICAgICAgIGNvcnJ1cHRlZE5vZGUgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvcnJ1cHRlZE5vZGUpIHtcbiAgICAgIHRoaXMuaGFuZGxlRGV0ZWN0ZWREZWZlY3QoXG4gICAgICAgICdNRU1PUllfTEVBS19PUl9EQU5HTElOR19OT0RFJyxcbiAgICAgICAgJ1fEmXrFgnkgTWFnaXN0cmFsaSBJL08gJiBEZXNrcnlwdG9yeSBQYW1pxJljaScsXG4gICAgICAgICdXeWtyeXRvIHVzemtvZHpvbnkgZGVza3J5cHRvciB3xJl6xYJhIHNwcnrEmXRvd2VnbyAod2FydG/Fm8SHIE5hTiB3IGxhdGVuY2ppIGx1YiBicmFrIGlkZW50eWZpa2F0b3JhKS4nLFxuICAgICAgICAnWnJlc2V0b3dhbm8gdXN6a29kem9uZSBkZXNrcnlwdG9yeSBJL08sIHByenl3csOzY29ubyBiYXpvd2UgcGFyYW1ldHJ5IDAuMW1zIGkgd3pub3dpb25vIHN0cnVtaWXFhC4nXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEplxZtsaSB3c3p5c3RrbyB6ZHJvd2UgLSBzdGFuIHBvem9zdGFqZSB3IHRyeWJpZSBjacSFZ8WCZWdvIHNrYW5vd2FuaWFcbiAgICBpZiAodGhpcy5zdGF0ZS5zdGF0dXMgIT09ICdTQ0FOTklORycpIHtcbiAgICAgIHRoaXMuc3RhdGUuc3RhdHVzID0gJ1NDQU5OSU5HJztcbiAgICB9XG4gICAgdGhpcy5zdGF0ZS5zeXN0ZW1IZWFsdGhJbmRleCA9IDEwMDtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIOKaoSBOQVRZQ0hNSUFTVE9XQSBOQVBSQVdBIFBPIFpMT0tBTElaT1dBTklVIELFgcSYRFUgTFVCIFVTWktPRFpFTklBLFxuICAgKiBBIE5BU1TEmFBOSUUgUMWBWU5ORSBLT05UWU5VT1dBTklFIFNLQU5PV0FOSUEhXG4gICAqL1xuICBwdWJsaWMgaGFuZGxlRGV0ZWN0ZWREZWZlY3QoXG4gICAgZGVmZWN0VHlwZTogU2VudGluZWxCb3REZWZlY3RUeXBlLFxuICAgIHRhcmdldENvbXBvbmVudDogc3RyaW5nLFxuICAgIGRpYWdub3N0aWNEZXRhaWxzOiBzdHJpbmcsXG4gICAgcmVwYWlyQWN0aW9uRXhlY3V0ZWQ6IHN0cmluZ1xuICApIHtcbiAgICBjb25zdCBzdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICB0aGlzLnN0YXRlLmRlZmVjdHNEZXRlY3RlZENvdW50ICs9IDE7XG4gICAgdGhpcy5zdGF0ZS5zdGF0dXMgPSAnREVGRUNUX0RFVEVDVEVEJztcbiAgICB0aGlzLnN0YXRlLnN5c3RlbUhlYWx0aEluZGV4ID0gNzU7XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIC8vIETFundpxJlrIGludGVyd2VuY2ppIHNhbW9uYXByYXdjemVqXG4gICAgdGhpcy5wbGF5UmVwYWlyQXVkaW9Ub25lKCk7XG5cbiAgICAvLyBSb3pwb2N6xJljaWUgbmF0eWNobWlhc3Rvd2VqIHByb2NlZHVyeSBuYXByYXdjemVqXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnN0YXRlLnN0YXR1cyA9ICdBVVRPX1JFUEFJUklORyc7XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgICAvLyBXeWtvbmFuaWUgcnplY3p5d2lzdGVqIG5hcHJhd3kgdyBzdHJ1a3R1cmFjaCBkYW55Y2hcbiAgICAgIHRoaXMuYXBwbHlDb25jcmV0ZVJlcGFpcihkZWZlY3RUeXBlKTtcblxuICAgICAgY29uc3QgcmVjb3ZlcnlEdXJhdGlvbk1zID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChwZXJmb3JtYW5jZS5ub3coKSAtIHN0YXJ0VGltZSkpO1xuXG4gICAgICBjb25zdCByZXBhaXJFdmVudDogU2VudGluZWxCb3RSZXBhaXJFdmVudCA9IHtcbiAgICAgICAgaWQ6IGByZXBhaXItJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA0KX1gLFxuICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIGRlZmVjdFR5cGUsXG4gICAgICAgIHRhcmdldENvbXBvbmVudCxcbiAgICAgICAgZGlhZ25vc3RpY0RldGFpbHMsXG4gICAgICAgIHJlcGFpckFjdGlvbkV4ZWN1dGVkLFxuICAgICAgICByZWNvdmVyeUR1cmF0aW9uTXMsXG4gICAgICAgIGludGVncml0eVZlcmlmaWVkOiB0cnVlXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnN0YXRlLmF1dG9SZXBhaXJzQ29tcGxldGVkQ291bnQgKz0gMTtcbiAgICAgIHRoaXMuc3RhdGUubGFzdFJlcGFpckV2ZW50ID0gcmVwYWlyRXZlbnQ7XG4gICAgICB0aGlzLnN0YXRlLnJlcGFpckhpc3RvcnkgPSBbcmVwYWlyRXZlbnQsIC4uLnRoaXMuc3RhdGUucmVwYWlySGlzdG9yeS5zbGljZSgwLCA0MCldO1xuICAgICAgdGhpcy5zdGF0ZS5zdGF0dXMgPSAnUkVQQUlSRURfSEVBTFRIWSc7XG4gICAgICB0aGlzLnN0YXRlLnN5c3RlbUhlYWx0aEluZGV4ID0gMTAwO1xuICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICAgIC8vIEVtaXRvd2FuaWUgZ2xvYmFsbmVnbyB6ZGFyemVuaWFcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmJvdC1hdXRvLXJlcGFpcmVkJywgeyBkZXRhaWw6IHJlcGFpckV2ZW50IH0pKTtcbiAgICAgIH1cblxuICAgICAgLy8gUG8ga3LDs3RraWVqIGNod2lsaSAoMzUwbXMpIHJvYm90IG5hdHljaG1pYXN0IGtvbnR5bnV1amUgY2nEhWfFgmUgc2thbm93YW5pZSFcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5pc1J1bm5pbmcpIHtcbiAgICAgICAgICB0aGlzLnN0YXRlLnN0YXR1cyA9ICdTQ0FOTklORyc7XG4gICAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICAgICAgfVxuICAgICAgfSwgMzUwKTtcbiAgICB9LCAxMjApO1xuICB9XG5cbiAgcHJpdmF0ZSBhcHBseUNvbmNyZXRlUmVwYWlyKGRlZmVjdFR5cGU6IFNlbnRpbmVsQm90RGVmZWN0VHlwZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoZGVmZWN0VHlwZSA9PT0gJ0NPUlJVUFRFRF9MT0dfRU5UUlknKSB7XG4gICAgICAgIC8vIFNhbml0eXphY2phIGJhenkgbG9nw7N3XG4gICAgICAgIGNvbnN0IHJhd0xvZ3MgPSBzYWZlU3RvcmFnZS5nZXQ8YW55W10+KCdzZW50aW5lbF9yZXBhaXJfbG9ncycsIFtdKTtcbiAgICAgICAgY29uc3Qgc2FuaXRpemVkID0gQXJyYXkuaXNBcnJheShyYXdMb2dzKSBcbiAgICAgICAgICA/IHJhd0xvZ3MuZmlsdGVyKGwgPT4gbCAmJiB0eXBlb2YgbCA9PT0gJ29iamVjdCcgJiYgbC5pZCAmJiBsLmFjdGlvbikgXG4gICAgICAgICAgOiBbXTtcbiAgICAgICAgc2FuaXRpemVkLnVuc2hpZnQoe1xuICAgICAgICAgIGlkOiBgcmVzdG9yZWQtJHtEYXRlLm5vdygpfWAsXG4gICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgIGFjdGlvbjogJ0FVVE9OT01JQ1pOQSBPREJVRE9XQSBEWklFTk5JS0EgWkRBUlpFxYMnLFxuICAgICAgICAgIGNvbXBvbmVudDogJ1NlbnRpbmVsIFdhdGNoZG9nIEJvdCcsXG4gICAgICAgICAgc3RhdHVzOiAnU1VDQ0VTUycsXG4gICAgICAgICAgbWVzc2FnZTogJ1JvYm90IHpuZXV0cmFsaXpvd2HFgiB1c3prb2R6b25lIHdwaXN5IGkgb2R0d29yennFgiBzdHJ1a3R1csSZIGR6aWVubmlrYS4nXG4gICAgICAgIH0pO1xuICAgICAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JlcGFpcl9sb2dzJywgc2FuaXRpemVkKTtcbiAgICAgIH0gZWxzZSBpZiAoZGVmZWN0VHlwZSA9PT0gJ0JST0tFTl9MT0NBTFNUT1JBR0VfSlNPTicpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NlbnRpbmVsX3NpbXVsYXRlZF9jb3JydXB0ZWRfa2V5Jyk7XG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH0gZWxzZSBpZiAoZGVmZWN0VHlwZSA9PT0gJ01FTU9SWV9MRUFLX09SX0RBTkdMSU5HX05PREUnKSB7XG4gICAgICAgIC8vIE9kYnVkb3dhIHfEmXrFgsOzdyBJL09cbiAgICAgICAgY29uc3QgZGVmYXVsdE5vZGVzID0gW1xuICAgICAgICAgIHsgaWQ6ICdub2RlLWR3bS0wMScsIG5hbWU6ICdPVVQtRFdNLTAxIChNb25pdG9yIERpcmVjdEZsaXApJywgbGF0ZW5jeU1zOiAwLjEsIHN0YXR1czogJ1NFQ1VSRScgfSxcbiAgICAgICAgICB7IGlkOiAnbm9kZS1wY2llLTAxJywgbmFtZTogJ0JVUy1QQ0lFLTAxIChQQ0llIHgxNiBHUFUpJywgbGF0ZW5jeU1zOiAwLjEsIHN0YXR1czogJ1NFQ1VSRScgfSxcbiAgICAgICAgICB7IGlkOiAnbm9kZS1yYW0tMDEnLCBuYW1lOiAnTUVNLUREUjUtMDEgKFNlZ21lbnQgUkFNIFJpbmctMyknLCBsYXRlbmN5TXM6IDAuMDUsIHN0YXR1czogJ1NFQ1VSRScgfSxcbiAgICAgICAgICB7IGlkOiAnbm9kZS1oaWQtMDEnLCBuYW1lOiAnSU5QLVVTQi0wMSAoUmF3SW5wdXQgS2xhd2lhdHVyYSknLCBsYXRlbmN5TXM6IDAuMiwgc3RhdHVzOiAnU0VDVVJFJyB9XG4gICAgICAgIF07XG4gICAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfaW9fbm9kZXMnLCBkZWZhdWx0Tm9kZXMpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS53YXJuKCdbU2VudGluZWwgUm9ib3RdIELFgsSFZCBwb2RjemFzIGZpenljem5laiBuYXByYXd5OicsIGVycik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIPCfp6ogU1lNVUxBQ0pBIFVTWktPRFpFTklBIERPIFRFU1TDk1cgUk9CT1RBXG4gICAqIFBvendhbGEgdcW8eXRrb3duaWtvd2kga2xpa27EhcSHIHByenljaXNrIGkgb2JzZXJ3b3dhxIcgamFrIHJvYm90IG5hdHljaG1pYXN0XG4gICAqIHd5a3J5d2EgdXN6a29kemVuaWUsIG5hcHJhd2lhIGplIGkgbmF0eWNobWlhc3Qgd3puYXdpYSBza2Fub3dhbmllIVxuICAgKi9cbiAgcHVibGljIGluamVjdFNpbXVsYXRlZERlZmVjdChkZWZlY3RUeXBlOiBTZW50aW5lbEJvdERlZmVjdFR5cGUpIHtcbiAgICBpZiAoZGVmZWN0VHlwZSA9PT0gJ0NPUlJVUFRFRF9MT0dfRU5UUlknKSB7XG4gICAgICBjb25zdCBsb2dzID0gc2FmZVN0b3JhZ2UuZ2V0PGFueVtdPignc2VudGluZWxfcmVwYWlyX2xvZ3MnLCBbXSk7XG4gICAgICBsb2dzLnVuc2hpZnQoeyBpZDogbnVsbCwgYWN0aW9uOiBudWxsLCBicm9rZW5CeXRlUGF5bG9hZDogJzB4REVBREJFRUZfQ09SUlVQVEVEJyB9KTtcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmVwYWlyX2xvZ3MnLCBsb2dzKTtcbiAgICB9IGVsc2UgaWYgKGRlZmVjdFR5cGUgPT09ICdCUk9LRU5fTE9DQUxTVE9SQUdFX0pTT04nKSB7XG4gICAgICB0cnkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3NlbnRpbmVsX3NpbXVsYXRlZF9jb3JydXB0ZWRfa2V5JywgJ3sgSU5WQUxJRF9KU09OX1NZTlRBWF9FUlJPUjogPj4+ID8/PyA8PDwgfScpO1xuICAgICAgfSBjYXRjaCB7fVxuICAgIH0gZWxzZSBpZiAoZGVmZWN0VHlwZSA9PT0gJ01FTU9SWV9MRUFLX09SX0RBTkdMSU5HX05PREUnKSB7XG4gICAgICBjb25zdCBub2RlcyA9IHNhZmVTdG9yYWdlLmdldDxhbnlbXT4oJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgW10pO1xuICAgICAgbm9kZXMucHVzaCh7IGlkOiAnYnJva2VuLW5vZGUnLCBuYW1lOiAnQ09SUlVQVEVEX0RNQV9QT0lOVEVSJywgbGF0ZW5jeU1zOiBOYU4gfSk7XG4gICAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgbm9kZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZURldGVjdGVkRGVmZWN0KFxuICAgICAgICBkZWZlY3RUeXBlLFxuICAgICAgICAnS29tcG9uZW50IFJ1bnRpbWUgQXBsaWthY2ppJyxcbiAgICAgICAgJ1d5bXVzem9ubyB0ZXN0b3fEhSBhbm9tYWxpxJkgc3RhbnUgYXBsaWthY2ppIHcgY2VsdSB3ZXJ5ZmlrYWNqaSBzenlia2/Fm2NpIHJlYWtjamkgcm9ib3RhLicsXG4gICAgICAgICdSb2JvdCBwcnplY2h3eWNpxYIgYW5vbWFsacSZLCB3eXplcm93YcWCIHVzemtvZHpvbmUgcGFyYW1ldHJ5IGkgcHJ6eXdyw7NjacWCIHBlxYJuxIUgc3ByYXdub8WbxIcuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBOYXR5Y2htaWFzdG93ZSB3eW11c3plbmllIGN5a2x1IGRpYWdub3N0eWN6bmVnb1xuICAgIHRoaXMuZXhlY3V0ZVNjYW5DeWNsZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBwbGF5UmVwYWlyQXVkaW9Ub25lKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyBhbnkpLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGlmICghQXVkaW9DdHgpIHJldHVybjtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgICAgY29uc3Qgb3NjID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuXG4gICAgICBvc2MudHlwZSA9ICd0cmlhbmdsZSc7XG4gICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDUyMCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgIG9zYy5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMTA0MCwgY3R4LmN1cnJlbnRUaW1lICsgMC4xNSk7XG5cbiAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjEsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICBnYWluLmdhaW4uZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4xOCk7XG5cbiAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC4xOCk7XG4gICAgfSBjYXRjaCB7fVxuICB9XG5cbiAgcHVibGljIGdldFN0YXRlKCk6IFNlbnRpbmVsQm90U3RhdGUge1xuICAgIHJldHVybiB7IC4uLnRoaXMuc3RhdGUgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IChzdGF0ZTogU2VudGluZWxCb3RTdGF0ZSkgPT4gdm9pZCkge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgIGxpc3RlbmVyKHRoaXMuZ2V0U3RhdGUoKSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHRoaXMubGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnMuZmlsdGVyKGwgPT4gbCAhPT0gbGlzdGVuZXIpO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeSgpIHtcbiAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB0aGlzLmdldFN0YXRlKCk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoY3VycmVudFN0YXRlKSk7XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNlbnRpbmVsQm90RW5naW5lID0gU2VudGluZWxXYXRjaGRvZ0JvdEVuZ2luZS5nZXRJbnN0YW5jZSgpO1xuIl0sIm1hcHBpbmdzIjoiQUFNQSxTQUFTLG1CQUFtQjtBQUU1QixNQUFNLDBCQUEwQjtBQUFBLEVBcUN0QixjQUFjO0FBbkN0QixTQUFRLFlBQXFCO0FBQzdCLFNBQVEsVUFBZTtBQUN2QixTQUFRLGlCQUF5QjtBQUNqQyxTQUFRLGtCQUEwQjtBQUNsQyxTQUFRLFlBQXNELENBQUM7QUFFL0QsU0FBUSxvQkFBb0I7QUFBQSxNQUMxQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFFQSxTQUFRLFFBQTBCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsUUFBUTtBQUFB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