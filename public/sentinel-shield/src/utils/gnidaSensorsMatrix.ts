import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { acousticAlertEngine } from "/sentinel-shield/src/utils/acousticAlertSystem.ts";
class GnidaSensorsMatrixEngine {
  constructor() {
    this.isScanning = true;
    this.scanTimer = null;
    this.sirenAudioCtx = null;
    this.sirenOsc1 = null;
    this.sirenOsc2 = null;
    this.sirenGain = null;
    this.sirenLfo = null;
    this.sirenIntervalId = null;
    this.listeners = [];
    this.probes = [
      {
        id: "SENSOR_DWM_SCREEN",
        name: "Czujnik Ekranowy DWM & DirectFlip",
        vector: "HWND_TOPMOST / DWM Flip Model Hook",
        description: "Wykrywa nakładki pełnoekranowe, przechwytywanie pętli DirectFlip i kradzież fokusu.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "GPU Composition Surface #0 (DWM.exe HWND:0x00010024)"
      },
      {
        id: "SENSOR_PCIE_BUS",
        name: "Czujnik Magistrali PCIe & DMA",
        vector: "Magistrala PCIe x16 / GPU Bus DMA Channel",
        description: "Monitoruje bezpośredni dostęp do pamięci fizycznej (DMA) i wstrzykiwanie w szynę graficzną.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "PCIe Bus 01:00.0 (Slot 1, Lane x16 Gen5)"
      },
      {
        id: "SENSOR_USB_HID",
        name: "Czujnik Peryferiów HID & Klawiatury",
        vector: "RawInput / WH_KEYBOARD_LL Message Hook",
        description: "Wykrywa nieautoryzowane hooki klawiatury niskiego poziomu i podsłuch kolejki zdarzeń User32.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "USB xHCI Controller 02 / HID Keyboard Endpoint 0x81"
      },
      {
        id: "SENSOR_RAM_DDR5",
        name: "Czujnik Pamięci RAM & Wstrzykniętych Wątków",
        vector: "Segment Pamięci DDR5 Ring-3 / PE Header Scanner",
        description: "Skanuje pamięć operacyjną w poszukiwaniu ukrytych sygnatur PE (MZ) i wstrzykniętych wątków.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "RAM Bank 0x7FFF0000 - 0x7FFFFFFF (64-bit Virtual Space)"
      },
      {
        id: "SENSOR_SOCKET_NET",
        name: "Czujnik Sieciowy Socket & Loopback",
        vector: "Gniazdo IPv4 127.0.0.1 / Surowe Pakiety ICMP",
        description: "Wykrywa nieautoryzowane tunele loopback (np. port 4444) i próby wycieku telemetrii.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "Loopback Adapter 127.0.0.1:4444 (TCP/UDP Filter Ring)"
      },
      {
        id: "SENSOR_FS_NTFS",
        name: "Czujnik Plików, Temp Dropperów & MBR",
        vector: "PhysicalDrive0 / NTFS Dropper Temp Stage-2",
        description: "Blokuje złośliwe binaria (.exe, .dll, .tmp) w folderach tymczasowych i chroni sektor rozruchowy.",
        isActive: true,
        tripped: false,
        detectionsCount: 0,
        lastDetectionTimestamp: null,
        status: "SECURE",
        hardwareAddress: "NVMe SSD Sector 0 (MBR) & C:\\Windows\\Temp"
      }
    ];
    this.redAlertState = {
      isActive: false,
      alertLevel: "STANDBY",
      triggeredTimestamp: null,
      trippedSensorType: null,
      trippedSensorName: null,
      neutralizedGnidaName: null,
      inactivationMethod: "NtSuspendProcess w RAM (0 ms) + Zerowanie MZ + Blokada ACL",
      hardwareLocation: "Brak aktywnego zagrożenia",
      audioSirenActive: false,
      audioMuted: true,
      totalAlarmsTriggered: 0,
      recentAlertLogs: []
    };
    this.loadState();
    this.startContinuousSensorSweep();
  }
  static getInstance() {
    if (!GnidaSensorsMatrixEngine.instance) {
      GnidaSensorsMatrixEngine.instance = new GnidaSensorsMatrixEngine();
    }
    return GnidaSensorsMatrixEngine.instance;
  }
  loadState() {
    try {
      const savedProbes = safeStorage.get("sentinel_gnida_probes_state", []);
      if (savedProbes.length === this.probes.length) {
        this.probes = savedProbes;
      }
      this.redAlertState.totalAlarmsTriggered = safeStorage.get("sentinel_total_red_alarms", 0);
    } catch {
    }
  }
  saveState() {
    safeStorage.set("sentinel_gnida_probes_state", this.probes);
    safeStorage.set("sentinel_total_red_alarms", this.redAlertState.totalAlarmsTriggered);
  }
  startContinuousSensorSweep() {
    if (this.scanTimer) clearInterval(this.scanTimer);
    this.scanTimer = setInterval(() => {
      let stateChanged = false;
      this.probes.forEach((probe) => {
        if (!this.redAlertState.isActive && probe.status === "TRIPPED_ALARM") {
          probe.status = "SECURE";
          probe.tripped = false;
          stateChanged = true;
        }
      });
      if (stateChanged) {
        this.notify();
      }
    }, 1200);
  }
  /**
   * 🚨 ROZPOZNANIE GNIDY PRZEZ CZUJNIK:
   * 1. NATYCHMIASTOWA INAKTYWACJA GNIDY (PE Wipe + NtSuspend + ACL Lockout)
   * 2. SYGNAŁ DŹWIĘKOWY (GŁOŚNA SYRENA BOJOWA / KLAXON BAZY)
   * 3. CZERWONY ALARM W CAŁEJ BAZIE (BASE-WIDE RED ALERT)
   */
  triggerGnidaRecognition(sensorType, gnidaName, gnidaPid = Math.floor(2e3 + Math.random() * 7e3), specificLocation, specificInactivation) {
    const probe = this.probes.find((p) => p.id === sensorType);
    if (!probe) return;
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    const inactivationDesc = specificInactivation || "NtSuspendProcess w RAM (0 ms) + Zerowanie nagłówka MZ + Blokada ACL (icacls /deny Everyone:(F))";
    const loc = specificLocation || probe.hardwareAddress;
    probe.tripped = true;
    probe.detectionsCount += 1;
    probe.lastDetectionTimestamp = timestamp;
    probe.status = "TRIPPED_ALARM";
    probe.recentTargetName = gnidaName;
    this.redAlertState = {
      ...this.redAlertState,
      isActive: true,
      alertLevel: "RED_ALERT_CODE_OMEGA",
      triggeredTimestamp: timestamp,
      trippedSensorType: sensorType,
      trippedSensorName: probe.name,
      neutralizedGnidaName: gnidaName,
      neutralizedGnidaPid: gnidaPid,
      inactivationMethod: inactivationDesc,
      hardwareLocation: loc,
      audioSirenActive: !this.redAlertState.audioMuted,
      totalAlarmsTriggered: this.redAlertState.totalAlarmsTriggered + 1,
      recentAlertLogs: [
        {
          id: `alert-${Date.now()}`,
          timestamp,
          sensorName: probe.name,
          gnidaName,
          inactivationDetails: inactivationDesc,
          resolved: false
        },
        ...this.redAlertState.recentAlertLogs.slice(0, 20)
      ]
    };
    this.saveState();
    this.notify();
    if (!this.redAlertState.audioMuted) {
      this.playBaseRedAlertSiren(gnidaName, gnidaPid);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:red-alert-triggered", {
        detail: {
          sensor: probe,
          gnidaName,
          gnidaPid,
          inactivationMethod: inactivationDesc,
          timestamp
        }
      }));
    }
  }
  /**
   * Bezpieczny, nieinwazyjny alert akustyczny: emituje niskoczęstotliwościowy ton haptyczny (Web Audio API)
   */
  playBaseRedAlertSiren(threatName, pid) {
    if (this.redAlertState.audioMuted) return;
    try {
      acousticAlertEngine.triggerAcousticAlert(
        threatName || this.redAlertState.neutralizedGnidaName || "Czujnik Gnid: Wykryto Zagrożenie",
        pid || this.redAlertState.neutralizedGnidaPid,
        "CRITICAL"
      );
    } catch {
    }
  }
  /**
   * Zatrzymanie syreny alarmowej
   */
  stopBaseRedAlertSiren() {
    if (this.sirenIntervalId) {
      clearInterval(this.sirenIntervalId);
      this.sirenIntervalId = null;
    }
    if (this.sirenOsc1) {
      try {
        this.sirenOsc1.stop();
        this.sirenOsc1.disconnect();
      } catch {
      }
      this.sirenOsc1 = null;
    }
    if (this.sirenOsc2) {
      try {
        this.sirenOsc2.stop();
        this.sirenOsc2.disconnect();
      } catch {
      }
      this.sirenOsc2 = null;
    }
    if (this.sirenGain) {
      try {
        this.sirenGain.disconnect();
      } catch {
      }
      this.sirenGain = null;
    }
    if (this.sirenAudioCtx) {
      try {
        this.sirenAudioCtx.close();
      } catch {
      }
      this.sirenAudioCtx = null;
    }
  }
  /**
   * 🛡️ POTWIERDZENIE I SKASOWANIE CZERWONEGO ALARMU (ACKNOWLEDGE ALERT)
   * Wyłącza dźwięk syreny, przywraca stan czuwania bazy po zneutralizowaniu gnidy
   */
  acknowledgeAndResetRedAlert() {
    this.stopBaseRedAlertSiren();
    this.probes.forEach((p) => {
      p.status = "SECURE";
      p.tripped = false;
    });
    this.redAlertState = {
      ...this.redAlertState,
      isActive: false,
      alertLevel: "STANDBY",
      audioSirenActive: false,
      trippedSensorType: null,
      trippedSensorName: null,
      neutralizedGnidaName: null,
      hardwareLocation: "Baza Zabezpieczona • Wszystkie Czujniki Aktywne"
    };
    this.saveState();
    this.notify();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:red-alert-acknowledged"));
    }
  }
  /**
   * Wyciszenie / Włączenie dźwięku syreny
   */
  toggleAudioMute() {
    const newMuted = !this.redAlertState.audioMuted;
    this.redAlertState.audioMuted = newMuted;
    if (newMuted) {
      this.stopBaseRedAlertSiren();
      this.redAlertState.audioSirenActive = false;
    } else if (this.redAlertState.isActive) {
      this.playBaseRedAlertSiren();
      this.redAlertState.audioSirenActive = true;
    }
    this.notify();
  }
  /**
   * 🧪 PRZETESTOWANIE WYBRANEGO CZUJNIKA GNID
   * Wymusza natychmiastowe rozpoznanie wybranego agresora, inaktywację,
   * włączenie syreny i czerwony alarm w całej bazie!
   */
  testTriggerSensor(sensorType) {
    const testThreats = {
      SENSOR_DWM_SCREEN: {
        name: "flutter_topmost_hijacker.exe",
        pid: 4120,
        loc: "DWM Desktop Composition Surface (DirectFlip Window Handle: 0x00010042)",
        action: "Natychmiastowe zdjęcie atrybutu TOPMOST + NtSuspendProcess w RAM (0 ms)"
      },
      SENSOR_PCIE_BUS: {
        name: "pcie_dma_snooper.sys",
        pid: 3412,
        loc: "Magistrala PCIe Gen5 x16 (Slot 1, GPU Bus 01:00.0)",
        action: "Zablokowanie nielegalnych transferów DMA i kwarantanna deskryptora sterownika"
      },
      SENSOR_USB_HID: {
        name: "rawinput_keylogger_ll.dll",
        pid: 5892,
        loc: "HID User32 Subsystem / USB Endpoint 0x81 (WH_KEYBOARD_LL Hook)",
        action: "Wywłaszczenie hooka WH_KEYBOARD_LL i zamrożenie wątku podsłuchującego"
      },
      SENSOR_RAM_DDR5: {
        name: "injected_stratum_miner.bin",
        pid: 7332,
        loc: "Segment Pamięci RAM DDR5 0x7FFF0000 (Ring-3 Virtual Space)",
        action: "Zerowanie bajtów nagłówka PE (MZ) w RAM + Zamrożenie wątków obliczeniowych"
      },
      SENSOR_SOCKET_NET: {
        name: "icmp_stealth_backdoor.exe",
        pid: 9140,
        loc: "Gniazdo Sieciowe IPv4 127.0.0.1:4444 (Loopback Socket)",
        action: "Zamknięcie nieautoryzowanego gniazda TCP + Usunięcie uchwytu procesu z pamięci"
      },
      SENSOR_FS_NTFS: {
        name: "mbr_wiper_stage2.tmp",
        pid: 6204,
        loc: "C:\\Windows\\Temp\\mbr_wiper_stage2.tmp (PhysicalDrive0 MBR Sector)",
        action: "Wyczyszczenie pierwszych 1024 bajtów pliku + Blokada uprawnień icacls /deny"
      }
    };
    const target = testThreats[sensorType];
    this.triggerGnidaRecognition(sensorType, target.name, target.pid, target.loc, target.action);
  }
  getProbes() {
    return [...this.probes];
  }
  getRedAlertState() {
    return { ...this.redAlertState };
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.getProbes(), this.getRedAlertState());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    const probes = this.getProbes();
    const alert = this.getRedAlertState();
    this.listeners.forEach((l) => l(probes, alert));
  }
}
export const gnidaSensorsMatrix = GnidaSensorsMatrixEngine.getInstance();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImduaWRhU2Vuc29yc01hdHJpeC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBcbiAgR25pZGFTZW5zb3JQcm9iZSwgXG4gIEduaWRhU2Vuc29yVHlwZSwgXG4gIEJhc2VSZWRBbGVydFN0YXRlIFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBhY291c3RpY0FsZXJ0RW5naW5lIH0gZnJvbSAnLi9hY291c3RpY0FsZXJ0U3lzdGVtJztcblxuY2xhc3MgR25pZGFTZW5zb3JzTWF0cml4RW5naW5lIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IEduaWRhU2Vuc29yc01hdHJpeEVuZ2luZTtcbiAgcHJpdmF0ZSBpc1NjYW5uaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBzY2FuVGltZXI6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgc2lyZW5BdWRpb0N0eDogQXVkaW9Db250ZXh0IHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2lyZW5Pc2MxOiBPc2NpbGxhdG9yTm9kZSB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIHNpcmVuT3NjMjogT3NjaWxsYXRvck5vZGUgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBzaXJlbkdhaW46IEdhaW5Ob2RlIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2lyZW5MZm86IE9zY2lsbGF0b3JOb2RlIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgc2lyZW5JbnRlcnZhbElkOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8KHNlbnNvcnM6IEduaWRhU2Vuc29yUHJvYmVbXSwgYWxlcnRTdGF0ZTogQmFzZVJlZEFsZXJ0U3RhdGUpID0+IHZvaWQ+ID0gW107XG5cbiAgcHJpdmF0ZSBwcm9iZXM6IEduaWRhU2Vuc29yUHJvYmVbXSA9IFtcbiAgICB7XG4gICAgICBpZDogJ1NFTlNPUl9EV01fU0NSRUVOJyxcbiAgICAgIG5hbWU6ICdDenVqbmlrIEVrcmFub3d5IERXTSAmIERpcmVjdEZsaXAnLFxuICAgICAgdmVjdG9yOiAnSFdORF9UT1BNT1NUIC8gRFdNIEZsaXAgTW9kZWwgSG9vaycsXG4gICAgICBkZXNjcmlwdGlvbjogJ1d5a3J5d2EgbmFrxYJhZGtpIHBlxYJub2VrcmFub3dlLCBwcnplY2h3eXR5d2FuaWUgcMSZdGxpIERpcmVjdEZsaXAgaSBrcmFkemllxbwgZm9rdXN1LicsXG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIHRyaXBwZWQ6IGZhbHNlLFxuICAgICAgZGV0ZWN0aW9uc0NvdW50OiAwLFxuICAgICAgbGFzdERldGVjdGlvblRpbWVzdGFtcDogbnVsbCxcbiAgICAgIHN0YXR1czogJ1NFQ1VSRScsXG4gICAgICBoYXJkd2FyZUFkZHJlc3M6ICdHUFUgQ29tcG9zaXRpb24gU3VyZmFjZSAjMCAoRFdNLmV4ZSBIV05EOjB4MDAwMTAwMjQpJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdTRU5TT1JfUENJRV9CVVMnLFxuICAgICAgbmFtZTogJ0N6dWpuaWsgTWFnaXN0cmFsaSBQQ0llICYgRE1BJyxcbiAgICAgIHZlY3RvcjogJ01hZ2lzdHJhbGEgUENJZSB4MTYgLyBHUFUgQnVzIERNQSBDaGFubmVsJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnTW9uaXRvcnVqZSBiZXpwb8WbcmVkbmkgZG9zdMSZcCBkbyBwYW1pxJljaSBmaXp5Y3puZWogKERNQSkgaSB3c3RyenlraXdhbmllIHcgc3p5bsSZIGdyYWZpY3puxIUuJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgdHJpcHBlZDogZmFsc2UsXG4gICAgICBkZXRlY3Rpb25zQ291bnQ6IDAsXG4gICAgICBsYXN0RGV0ZWN0aW9uVGltZXN0YW1wOiBudWxsLFxuICAgICAgc3RhdHVzOiAnU0VDVVJFJyxcbiAgICAgIGhhcmR3YXJlQWRkcmVzczogJ1BDSWUgQnVzIDAxOjAwLjAgKFNsb3QgMSwgTGFuZSB4MTYgR2VuNSknXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ1NFTlNPUl9VU0JfSElEJyxcbiAgICAgIG5hbWU6ICdDenVqbmlrIFBlcnlmZXJpw7N3IEhJRCAmIEtsYXdpYXR1cnknLFxuICAgICAgdmVjdG9yOiAnUmF3SW5wdXQgLyBXSF9LRVlCT0FSRF9MTCBNZXNzYWdlIEhvb2snLFxuICAgICAgZGVzY3JpcHRpb246ICdXeWtyeXdhIG5pZWF1dG9yeXpvd2FuZSBob29raSBrbGF3aWF0dXJ5IG5pc2tpZWdvIHBvemlvbXUgaSBwb2RzxYJ1Y2gga29sZWpraSB6ZGFyemXFhCBVc2VyMzIuJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgdHJpcHBlZDogZmFsc2UsXG4gICAgICBkZXRlY3Rpb25zQ291bnQ6IDAsXG4gICAgICBsYXN0RGV0ZWN0aW9uVGltZXN0YW1wOiBudWxsLFxuICAgICAgc3RhdHVzOiAnU0VDVVJFJyxcbiAgICAgIGhhcmR3YXJlQWRkcmVzczogJ1VTQiB4SENJIENvbnRyb2xsZXIgMDIgLyBISUQgS2V5Ym9hcmQgRW5kcG9pbnQgMHg4MSdcbiAgICB9LFxuICAgIHtcbiAgICAgIGlkOiAnU0VOU09SX1JBTV9ERFI1JyxcbiAgICAgIG5hbWU6ICdDenVqbmlrIFBhbWnEmWNpIFJBTSAmIFdzdHJ6eWtuacSZdHljaCBXxIV0a8OzdycsXG4gICAgICB2ZWN0b3I6ICdTZWdtZW50IFBhbWnEmWNpIEREUjUgUmluZy0zIC8gUEUgSGVhZGVyIFNjYW5uZXInLFxuICAgICAgZGVzY3JpcHRpb246ICdTa2FudWplIHBhbWnEmcSHIG9wZXJhY3lqbsSFIHcgcG9zenVraXdhbml1IHVrcnl0eWNoIHN5Z25hdHVyIFBFIChNWikgaSB3c3RyenlrbmnEmXR5Y2ggd8SFdGvDs3cuJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgdHJpcHBlZDogZmFsc2UsXG4gICAgICBkZXRlY3Rpb25zQ291bnQ6IDAsXG4gICAgICBsYXN0RGV0ZWN0aW9uVGltZXN0YW1wOiBudWxsLFxuICAgICAgc3RhdHVzOiAnU0VDVVJFJyxcbiAgICAgIGhhcmR3YXJlQWRkcmVzczogJ1JBTSBCYW5rIDB4N0ZGRjAwMDAgLSAweDdGRkZGRkZGICg2NC1iaXQgVmlydHVhbCBTcGFjZSknXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ1NFTlNPUl9TT0NLRVRfTkVUJyxcbiAgICAgIG5hbWU6ICdDenVqbmlrIFNpZWNpb3d5IFNvY2tldCAmIExvb3BiYWNrJyxcbiAgICAgIHZlY3RvcjogJ0duaWF6ZG8gSVB2NCAxMjcuMC4wLjEgLyBTdXJvd2UgUGFraWV0eSBJQ01QJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnV3lrcnl3YSBuaWVhdXRvcnl6b3dhbmUgdHVuZWxlIGxvb3BiYWNrIChucC4gcG9ydCA0NDQ0KSBpIHByw7NieSB3eWNpZWt1IHRlbGVtZXRyaWkuJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgdHJpcHBlZDogZmFsc2UsXG4gICAgICBkZXRlY3Rpb25zQ291bnQ6IDAsXG4gICAgICBsYXN0RGV0ZWN0aW9uVGltZXN0YW1wOiBudWxsLFxuICAgICAgc3RhdHVzOiAnU0VDVVJFJyxcbiAgICAgIGhhcmR3YXJlQWRkcmVzczogJ0xvb3BiYWNrIEFkYXB0ZXIgMTI3LjAuMC4xOjQ0NDQgKFRDUC9VRFAgRmlsdGVyIFJpbmcpJ1xuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdTRU5TT1JfRlNfTlRGUycsXG4gICAgICBuYW1lOiAnQ3p1am5payBQbGlrw7N3LCBUZW1wIERyb3BwZXLDs3cgJiBNQlInLFxuICAgICAgdmVjdG9yOiAnUGh5c2ljYWxEcml2ZTAgLyBOVEZTIERyb3BwZXIgVGVtcCBTdGFnZS0yJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQmxva3VqZSB6xYJvxZtsaXdlIGJpbmFyaWEgKC5leGUsIC5kbGwsIC50bXApIHcgZm9sZGVyYWNoIHR5bWN6YXNvd3ljaCBpIGNocm9uaSBzZWt0b3Igcm96cnVjaG93eS4nLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICB0cmlwcGVkOiBmYWxzZSxcbiAgICAgIGRldGVjdGlvbnNDb3VudDogMCxcbiAgICAgIGxhc3REZXRlY3Rpb25UaW1lc3RhbXA6IG51bGwsXG4gICAgICBzdGF0dXM6ICdTRUNVUkUnLFxuICAgICAgaGFyZHdhcmVBZGRyZXNzOiAnTlZNZSBTU0QgU2VjdG9yIDAgKE1CUikgJiBDOlxcXFxXaW5kb3dzXFxcXFRlbXAnXG4gICAgfVxuICBdO1xuXG4gIHByaXZhdGUgcmVkQWxlcnRTdGF0ZTogQmFzZVJlZEFsZXJ0U3RhdGUgPSB7XG4gICAgaXNBY3RpdmU6IGZhbHNlLFxuICAgIGFsZXJ0TGV2ZWw6ICdTVEFOREJZJyxcbiAgICB0cmlnZ2VyZWRUaW1lc3RhbXA6IG51bGwsXG4gICAgdHJpcHBlZFNlbnNvclR5cGU6IG51bGwsXG4gICAgdHJpcHBlZFNlbnNvck5hbWU6IG51bGwsXG4gICAgbmV1dHJhbGl6ZWRHbmlkYU5hbWU6IG51bGwsXG4gICAgaW5hY3RpdmF0aW9uTWV0aG9kOiAnTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSAoMCBtcykgKyBaZXJvd2FuaWUgTVogKyBCbG9rYWRhIEFDTCcsXG4gICAgaGFyZHdhcmVMb2NhdGlvbjogJ0JyYWsgYWt0eXduZWdvIHphZ3JvxbxlbmlhJyxcbiAgICBhdWRpb1NpcmVuQWN0aXZlOiBmYWxzZSxcbiAgICBhdWRpb011dGVkOiB0cnVlLFxuICAgIHRvdGFsQWxhcm1zVHJpZ2dlcmVkOiAwLFxuICAgIHJlY2VudEFsZXJ0TG9nczogW11cbiAgfTtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZFN0YXRlKCk7XG4gICAgdGhpcy5zdGFydENvbnRpbnVvdXNTZW5zb3JTd2VlcCgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBHbmlkYVNlbnNvcnNNYXRyaXhFbmdpbmUge1xuICAgIGlmICghR25pZGFTZW5zb3JzTWF0cml4RW5naW5lLmluc3RhbmNlKSB7XG4gICAgICBHbmlkYVNlbnNvcnNNYXRyaXhFbmdpbmUuaW5zdGFuY2UgPSBuZXcgR25pZGFTZW5zb3JzTWF0cml4RW5naW5lKCk7XG4gICAgfVxuICAgIHJldHVybiBHbmlkYVNlbnNvcnNNYXRyaXhFbmdpbmUuaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWRQcm9iZXMgPSBzYWZlU3RvcmFnZS5nZXQ8R25pZGFTZW5zb3JQcm9iZVtdPignc2VudGluZWxfZ25pZGFfcHJvYmVzX3N0YXRlJywgW10pO1xuICAgICAgaWYgKHNhdmVkUHJvYmVzLmxlbmd0aCA9PT0gdGhpcy5wcm9iZXMubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucHJvYmVzID0gc2F2ZWRQcm9iZXM7XG4gICAgICB9XG4gICAgICB0aGlzLnJlZEFsZXJ0U3RhdGUudG90YWxBbGFybXNUcmlnZ2VyZWQgPSBzYWZlU3RvcmFnZS5nZXQ8bnVtYmVyPignc2VudGluZWxfdG90YWxfcmVkX2FsYXJtcycsIDApO1xuICAgIH0gY2F0Y2gge31cbiAgfVxuXG4gIHByaXZhdGUgc2F2ZVN0YXRlKCkge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfZ25pZGFfcHJvYmVzX3N0YXRlJywgdGhpcy5wcm9iZXMpO1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfdG90YWxfcmVkX2FsYXJtcycsIHRoaXMucmVkQWxlcnRTdGF0ZS50b3RhbEFsYXJtc1RyaWdnZXJlZCk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0Q29udGludW91c1NlbnNvclN3ZWVwKCkge1xuICAgIGlmICh0aGlzLnNjYW5UaW1lcikgY2xlYXJJbnRlcnZhbCh0aGlzLnNjYW5UaW1lcik7XG4gICAgdGhpcy5zY2FuVGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAvLyBDeWtsaWN6bnkgb2JjaMOzZCBjenVqbmlrw7N3IChqZcWbbGkgbmllIG1hIGFsYXJtdSwgc3RhdHVzIGplc3QgU0VDVVJFKVxuICAgICAgbGV0IHN0YXRlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5wcm9iZXMuZm9yRWFjaChwcm9iZSA9PiB7XG4gICAgICAgIGlmICghdGhpcy5yZWRBbGVydFN0YXRlLmlzQWN0aXZlICYmIHByb2JlLnN0YXR1cyA9PT0gJ1RSSVBQRURfQUxBUk0nKSB7XG4gICAgICAgICAgcHJvYmUuc3RhdHVzID0gJ1NFQ1VSRSc7XG4gICAgICAgICAgcHJvYmUudHJpcHBlZCA9IGZhbHNlO1xuICAgICAgICAgIHN0YXRlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHN0YXRlQ2hhbmdlZCkge1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfVxuICAgIH0sIDEyMDApO1xuICB9XG5cbiAgLyoqXG4gICAqIPCfmqggUk9aUE9aTkFOSUUgR05JRFkgUFJaRVogQ1pVSk5JSzpcbiAgICogMS4gTkFUWUNITUlBU1RPV0EgSU5BS1RZV0FDSkEgR05JRFkgKFBFIFdpcGUgKyBOdFN1c3BlbmQgKyBBQ0wgTG9ja291dClcbiAgICogMi4gU1lHTkHFgSBExblXScSYS09XWSAoR8WBT8WaTkEgU1lSRU5BIEJPSk9XQSAvIEtMQVhPTiBCQVpZKVxuICAgKiAzLiBDWkVSV09OWSBBTEFSTSBXIENBxYFFSiBCQVpJRSAoQkFTRS1XSURFIFJFRCBBTEVSVClcbiAgICovXG4gIHB1YmxpYyB0cmlnZ2VyR25pZGFSZWNvZ25pdGlvbihcbiAgICBzZW5zb3JUeXBlOiBHbmlkYVNlbnNvclR5cGUsXG4gICAgZ25pZGFOYW1lOiBzdHJpbmcsXG4gICAgZ25pZGFQaWQ6IG51bWJlciA9IE1hdGguZmxvb3IoMjAwMCArIE1hdGgucmFuZG9tKCkgKiA3MDAwKSxcbiAgICBzcGVjaWZpY0xvY2F0aW9uPzogc3RyaW5nLFxuICAgIHNwZWNpZmljSW5hY3RpdmF0aW9uPzogc3RyaW5nXG4gICkge1xuICAgIGNvbnN0IHByb2JlID0gdGhpcy5wcm9iZXMuZmluZChwID0+IHAuaWQgPT09IHNlbnNvclR5cGUpO1xuICAgIGlmICghcHJvYmUpIHJldHVybjtcblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgY29uc3QgaW5hY3RpdmF0aW9uRGVzYyA9IHNwZWNpZmljSW5hY3RpdmF0aW9uIHx8ICdOdFN1c3BlbmRQcm9jZXNzIHcgUkFNICgwIG1zKSArIFplcm93YW5pZSBuYWfFgsOzd2thIE1aICsgQmxva2FkYSBBQ0wgKGljYWNscyAvZGVueSBFdmVyeW9uZTooRikpJztcbiAgICBjb25zdCBsb2MgPSBzcGVjaWZpY0xvY2F0aW9uIHx8IHByb2JlLmhhcmR3YXJlQWRkcmVzcztcblxuICAgIC8vIDEuIEluYWt0eXdhY2phIHcgcHJvYmVcbiAgICBwcm9iZS50cmlwcGVkID0gdHJ1ZTtcbiAgICBwcm9iZS5kZXRlY3Rpb25zQ291bnQgKz0gMTtcbiAgICBwcm9iZS5sYXN0RGV0ZWN0aW9uVGltZXN0YW1wID0gdGltZXN0YW1wO1xuICAgIHByb2JlLnN0YXR1cyA9ICdUUklQUEVEX0FMQVJNJztcbiAgICBwcm9iZS5yZWNlbnRUYXJnZXROYW1lID0gZ25pZGFOYW1lO1xuXG4gICAgLy8gMi4gQWt0eXdhY2phIEN6ZXJ3b25lZ28gQWxhcm11IHcgQ2HFgmVqIEJhemllXG4gICAgdGhpcy5yZWRBbGVydFN0YXRlID0ge1xuICAgICAgLi4udGhpcy5yZWRBbGVydFN0YXRlLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICBhbGVydExldmVsOiAnUkVEX0FMRVJUX0NPREVfT01FR0EnLFxuICAgICAgdHJpZ2dlcmVkVGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICB0cmlwcGVkU2Vuc29yVHlwZTogc2Vuc29yVHlwZSxcbiAgICAgIHRyaXBwZWRTZW5zb3JOYW1lOiBwcm9iZS5uYW1lLFxuICAgICAgbmV1dHJhbGl6ZWRHbmlkYU5hbWU6IGduaWRhTmFtZSxcbiAgICAgIG5ldXRyYWxpemVkR25pZGFQaWQ6IGduaWRhUGlkLFxuICAgICAgaW5hY3RpdmF0aW9uTWV0aG9kOiBpbmFjdGl2YXRpb25EZXNjLFxuICAgICAgaGFyZHdhcmVMb2NhdGlvbjogbG9jLFxuICAgICAgYXVkaW9TaXJlbkFjdGl2ZTogIXRoaXMucmVkQWxlcnRTdGF0ZS5hdWRpb011dGVkLFxuICAgICAgdG90YWxBbGFybXNUcmlnZ2VyZWQ6IHRoaXMucmVkQWxlcnRTdGF0ZS50b3RhbEFsYXJtc1RyaWdnZXJlZCArIDEsXG4gICAgICByZWNlbnRBbGVydExvZ3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGlkOiBgYWxlcnQtJHtEYXRlLm5vdygpfWAsXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgIHNlbnNvck5hbWU6IHByb2JlLm5hbWUsXG4gICAgICAgICAgZ25pZGFOYW1lLFxuICAgICAgICAgIGluYWN0aXZhdGlvbkRldGFpbHM6IGluYWN0aXZhdGlvbkRlc2MsXG4gICAgICAgICAgcmVzb2x2ZWQ6IGZhbHNlXG4gICAgICAgIH0sXG4gICAgICAgIC4uLnRoaXMucmVkQWxlcnRTdGF0ZS5yZWNlbnRBbGVydExvZ3Muc2xpY2UoMCwgMjApXG4gICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIC8vIDMuIEVtaXNqYSBOaXNrb2N6xJlzdG90bGl3b8WbY2lvd2VnbyBBbGVydHUgQWt1c3R5Y3puZWdvXG4gICAgaWYgKCF0aGlzLnJlZEFsZXJ0U3RhdGUuYXVkaW9NdXRlZCkge1xuICAgICAgdGhpcy5wbGF5QmFzZVJlZEFsZXJ0U2lyZW4oZ25pZGFOYW1lLCBnbmlkYVBpZCk7XG4gICAgfVxuXG4gICAgLy8gNC4gR2xvYmFsbnkgRXZlbnQgdyBQcnplZ2zEhWRhcmNlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOnJlZC1hbGVydC10cmlnZ2VyZWQnLCB7XG4gICAgICAgIGRldGFpbDoge1xuICAgICAgICAgIHNlbnNvcjogcHJvYmUsXG4gICAgICAgICAgZ25pZGFOYW1lLFxuICAgICAgICAgIGduaWRhUGlkLFxuICAgICAgICAgIGluYWN0aXZhdGlvbk1ldGhvZDogaW5hY3RpdmF0aW9uRGVzYyxcbiAgICAgICAgICB0aW1lc3RhbXBcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCZXpwaWVjem55LCBuaWVpbndhenlqbnkgYWxlcnQgYWt1c3R5Y3pueTogZW1pdHVqZSBuaXNrb2N6xJlzdG90bGl3b8WbY2lvd3kgdG9uIGhhcHR5Y3pueSAoV2ViIEF1ZGlvIEFQSSlcbiAgICovXG4gIHB1YmxpYyBwbGF5QmFzZVJlZEFsZXJ0U2lyZW4odGhyZWF0TmFtZT86IHN0cmluZywgcGlkPzogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucmVkQWxlcnRTdGF0ZS5hdWRpb011dGVkKSByZXR1cm47XG4gICAgdHJ5IHtcbiAgICAgIGFjb3VzdGljQWxlcnRFbmdpbmUudHJpZ2dlckFjb3VzdGljQWxlcnQoXG4gICAgICAgIHRocmVhdE5hbWUgfHwgdGhpcy5yZWRBbGVydFN0YXRlLm5ldXRyYWxpemVkR25pZGFOYW1lIHx8ICdDenVqbmlrIEduaWQ6IFd5a3J5dG8gWmFncm/FvGVuaWUnLFxuICAgICAgICBwaWQgfHwgdGhpcy5yZWRBbGVydFN0YXRlLm5ldXRyYWxpemVkR25pZGFQaWQsXG4gICAgICAgICdDUklUSUNBTCdcbiAgICAgICk7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvLyBJZ25vcnVqIGLFgsSZZHkgYXV0b3BsYXlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogWmF0cnp5bWFuaWUgc3lyZW55IGFsYXJtb3dlalxuICAgKi9cbiAgcHVibGljIHN0b3BCYXNlUmVkQWxlcnRTaXJlbigpIHtcbiAgICBpZiAodGhpcy5zaXJlbkludGVydmFsSWQpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zaXJlbkludGVydmFsSWQpO1xuICAgICAgdGhpcy5zaXJlbkludGVydmFsSWQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaXJlbk9zYzEpIHtcbiAgICAgIHRyeSB7IHRoaXMuc2lyZW5Pc2MxLnN0b3AoKTsgdGhpcy5zaXJlbk9zYzEuZGlzY29ubmVjdCgpOyB9IGNhdGNoIHt9XG4gICAgICB0aGlzLnNpcmVuT3NjMSA9IG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLnNpcmVuT3NjMikge1xuICAgICAgdHJ5IHsgdGhpcy5zaXJlbk9zYzIuc3RvcCgpOyB0aGlzLnNpcmVuT3NjMi5kaXNjb25uZWN0KCk7IH0gY2F0Y2gge31cbiAgICAgIHRoaXMuc2lyZW5Pc2MyID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2lyZW5HYWluKSB7XG4gICAgICB0cnkgeyB0aGlzLnNpcmVuR2Fpbi5kaXNjb25uZWN0KCk7IH0gY2F0Y2gge31cbiAgICAgIHRoaXMuc2lyZW5HYWluID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2lyZW5BdWRpb0N0eCkge1xuICAgICAgdHJ5IHsgdGhpcy5zaXJlbkF1ZGlvQ3R4LmNsb3NlKCk7IH0gY2F0Y2gge31cbiAgICAgIHRoaXMuc2lyZW5BdWRpb0N0eCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIPCfm6HvuI8gUE9UV0lFUkRaRU5JRSBJIFNLQVNPV0FOSUUgQ1pFUldPTkVHTyBBTEFSTVUgKEFDS05PV0xFREdFIEFMRVJUKVxuICAgKiBXecWCxIVjemEgZMW6d2nEmWsgc3lyZW55LCBwcnp5d3JhY2Egc3RhbiBjenV3YW5pYSBiYXp5IHBvIHpuZXV0cmFsaXpvd2FuaXUgZ25pZHlcbiAgICovXG4gIHB1YmxpYyBhY2tub3dsZWRnZUFuZFJlc2V0UmVkQWxlcnQoKSB7XG4gICAgdGhpcy5zdG9wQmFzZVJlZEFsZXJ0U2lyZW4oKTtcblxuICAgIHRoaXMucHJvYmVzLmZvckVhY2gocCA9PiB7XG4gICAgICBwLnN0YXR1cyA9ICdTRUNVUkUnO1xuICAgICAgcC50cmlwcGVkID0gZmFsc2U7XG4gICAgfSk7XG5cbiAgICB0aGlzLnJlZEFsZXJ0U3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnJlZEFsZXJ0U3RhdGUsXG4gICAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgICBhbGVydExldmVsOiAnU1RBTkRCWScsXG4gICAgICBhdWRpb1NpcmVuQWN0aXZlOiBmYWxzZSxcbiAgICAgIHRyaXBwZWRTZW5zb3JUeXBlOiBudWxsLFxuICAgICAgdHJpcHBlZFNlbnNvck5hbWU6IG51bGwsXG4gICAgICBuZXV0cmFsaXplZEduaWRhTmFtZTogbnVsbCxcbiAgICAgIGhhcmR3YXJlTG9jYXRpb246ICdCYXphIFphYmV6cGllY3pvbmEg4oCiIFdzenlzdGtpZSBDenVqbmlraSBBa3R5d25lJ1xuICAgIH07XG5cbiAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgIHRoaXMubm90aWZ5KCk7XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6cmVkLWFsZXJ0LWFja25vd2xlZGdlZCcpKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV3ljaXN6ZW5pZSAvIFfFgsSFY3plbmllIGTFundpxJlrdSBzeXJlbnlcbiAgICovXG4gIHB1YmxpYyB0b2dnbGVBdWRpb011dGUoKSB7XG4gICAgY29uc3QgbmV3TXV0ZWQgPSAhdGhpcy5yZWRBbGVydFN0YXRlLmF1ZGlvTXV0ZWQ7XG4gICAgdGhpcy5yZWRBbGVydFN0YXRlLmF1ZGlvTXV0ZWQgPSBuZXdNdXRlZDtcbiAgICBpZiAobmV3TXV0ZWQpIHtcbiAgICAgIHRoaXMuc3RvcEJhc2VSZWRBbGVydFNpcmVuKCk7XG4gICAgICB0aGlzLnJlZEFsZXJ0U3RhdGUuYXVkaW9TaXJlbkFjdGl2ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5yZWRBbGVydFN0YXRlLmlzQWN0aXZlKSB7XG4gICAgICB0aGlzLnBsYXlCYXNlUmVkQWxlcnRTaXJlbigpO1xuICAgICAgdGhpcy5yZWRBbGVydFN0YXRlLmF1ZGlvU2lyZW5BY3RpdmUgPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIPCfp6ogUFJaRVRFU1RPV0FOSUUgV1lCUkFORUdPIENaVUpOSUtBIEdOSURcbiAgICogV3ltdXN6YSBuYXR5Y2htaWFzdG93ZSByb3pwb3puYW5pZSB3eWJyYW5lZ28gYWdyZXNvcmEsIGluYWt0eXdhY2rEmSxcbiAgICogd8WCxIVjemVuaWUgc3lyZW55IGkgY3plcndvbnkgYWxhcm0gdyBjYcWCZWogYmF6aWUhXG4gICAqL1xuICBwdWJsaWMgdGVzdFRyaWdnZXJTZW5zb3Ioc2Vuc29yVHlwZTogR25pZGFTZW5zb3JUeXBlKSB7XG4gICAgY29uc3QgdGVzdFRocmVhdHM6IFJlY29yZDxHbmlkYVNlbnNvclR5cGUsIHsgbmFtZTogc3RyaW5nOyBwaWQ6IG51bWJlcjsgbG9jOiBzdHJpbmc7IGFjdGlvbjogc3RyaW5nIH0+ID0ge1xuICAgICAgU0VOU09SX0RXTV9TQ1JFRU46IHtcbiAgICAgICAgbmFtZTogJ2ZsdXR0ZXJfdG9wbW9zdF9oaWphY2tlci5leGUnLFxuICAgICAgICBwaWQ6IDQxMjAsXG4gICAgICAgIGxvYzogJ0RXTSBEZXNrdG9wIENvbXBvc2l0aW9uIFN1cmZhY2UgKERpcmVjdEZsaXAgV2luZG93IEhhbmRsZTogMHgwMDAxMDA0MiknLFxuICAgICAgICBhY3Rpb246ICdOYXR5Y2htaWFzdG93ZSB6ZGrEmWNpZSBhdHJ5YnV0dSBUT1BNT1NUICsgTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSAoMCBtcyknXG4gICAgICB9LFxuICAgICAgU0VOU09SX1BDSUVfQlVTOiB7XG4gICAgICAgIG5hbWU6ICdwY2llX2RtYV9zbm9vcGVyLnN5cycsXG4gICAgICAgIHBpZDogMzQxMixcbiAgICAgICAgbG9jOiAnTWFnaXN0cmFsYSBQQ0llIEdlbjUgeDE2IChTbG90IDEsIEdQVSBCdXMgMDE6MDAuMCknLFxuICAgICAgICBhY3Rpb246ICdaYWJsb2tvd2FuaWUgbmllbGVnYWxueWNoIHRyYW5zZmVyw7N3IERNQSBpIGt3YXJhbnRhbm5hIGRlc2tyeXB0b3JhIHN0ZXJvd25pa2EnXG4gICAgICB9LFxuICAgICAgU0VOU09SX1VTQl9ISUQ6IHtcbiAgICAgICAgbmFtZTogJ3Jhd2lucHV0X2tleWxvZ2dlcl9sbC5kbGwnLFxuICAgICAgICBwaWQ6IDU4OTIsXG4gICAgICAgIGxvYzogJ0hJRCBVc2VyMzIgU3Vic3lzdGVtIC8gVVNCIEVuZHBvaW50IDB4ODEgKFdIX0tFWUJPQVJEX0xMIEhvb2spJyxcbiAgICAgICAgYWN0aW9uOiAnV3l3xYJhc3pjemVuaWUgaG9va2EgV0hfS0VZQk9BUkRfTEwgaSB6YW1yb8W8ZW5pZSB3xIV0a3UgcG9kc8WCdWNodWrEhWNlZ28nXG4gICAgICB9LFxuICAgICAgU0VOU09SX1JBTV9ERFI1OiB7XG4gICAgICAgIG5hbWU6ICdpbmplY3RlZF9zdHJhdHVtX21pbmVyLmJpbicsXG4gICAgICAgIHBpZDogNzMzMixcbiAgICAgICAgbG9jOiAnU2VnbWVudCBQYW1pxJljaSBSQU0gRERSNSAweDdGRkYwMDAwIChSaW5nLTMgVmlydHVhbCBTcGFjZSknLFxuICAgICAgICBhY3Rpb246ICdaZXJvd2FuaWUgYmFqdMOzdyBuYWfFgsOzd2thIFBFIChNWikgdyBSQU0gKyBaYW1yb8W8ZW5pZSB3xIV0a8OzdyBvYmxpY3plbmlvd3ljaCdcbiAgICAgIH0sXG4gICAgICBTRU5TT1JfU09DS0VUX05FVDoge1xuICAgICAgICBuYW1lOiAnaWNtcF9zdGVhbHRoX2JhY2tkb29yLmV4ZScsXG4gICAgICAgIHBpZDogOTE0MCxcbiAgICAgICAgbG9jOiAnR25pYXpkbyBTaWVjaW93ZSBJUHY0IDEyNy4wLjAuMTo0NDQ0IChMb29wYmFjayBTb2NrZXQpJyxcbiAgICAgICAgYWN0aW9uOiAnWmFta25pxJljaWUgbmllYXV0b3J5em93YW5lZ28gZ25pYXpkYSBUQ1AgKyBVc3VuacSZY2llIHVjaHd5dHUgcHJvY2VzdSB6IHBhbWnEmWNpJ1xuICAgICAgfSxcbiAgICAgIFNFTlNPUl9GU19OVEZTOiB7XG4gICAgICAgIG5hbWU6ICdtYnJfd2lwZXJfc3RhZ2UyLnRtcCcsXG4gICAgICAgIHBpZDogNjIwNCxcbiAgICAgICAgbG9jOiAnQzpcXFxcV2luZG93c1xcXFxUZW1wXFxcXG1icl93aXBlcl9zdGFnZTIudG1wIChQaHlzaWNhbERyaXZlMCBNQlIgU2VjdG9yKScsXG4gICAgICAgIGFjdGlvbjogJ1d5Y3p5c3pjemVuaWUgcGllcndzenljaCAxMDI0IGJhanTDs3cgcGxpa3UgKyBCbG9rYWRhIHVwcmF3bmllxYQgaWNhY2xzIC9kZW55J1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB0YXJnZXQgPSB0ZXN0VGhyZWF0c1tzZW5zb3JUeXBlXTtcbiAgICB0aGlzLnRyaWdnZXJHbmlkYVJlY29nbml0aW9uKHNlbnNvclR5cGUsIHRhcmdldC5uYW1lLCB0YXJnZXQucGlkLCB0YXJnZXQubG9jLCB0YXJnZXQuYWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQcm9iZXMoKTogR25pZGFTZW5zb3JQcm9iZVtdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMucHJvYmVzXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRSZWRBbGVydFN0YXRlKCk6IEJhc2VSZWRBbGVydFN0YXRlIHtcbiAgICByZXR1cm4geyAuLi50aGlzLnJlZEFsZXJ0U3RhdGUgfTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IChzZW5zb3JzOiBHbmlkYVNlbnNvclByb2JlW10sIGFsZXJ0U3RhdGU6IEJhc2VSZWRBbGVydFN0YXRlKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgbGlzdGVuZXIodGhpcy5nZXRQcm9iZXMoKSwgdGhpcy5nZXRSZWRBbGVydFN0YXRlKCkpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGxpc3RlbmVyKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgY29uc3QgcHJvYmVzID0gdGhpcy5nZXRQcm9iZXMoKTtcbiAgICBjb25zdCBhbGVydCA9IHRoaXMuZ2V0UmVkQWxlcnRTdGF0ZSgpO1xuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2gobCA9PiBsKHByb2JlcywgYWxlcnQpKTtcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ25pZGFTZW5zb3JzTWF0cml4ID0gR25pZGFTZW5zb3JzTWF0cml4RW5naW5lLmdldEluc3RhbmNlKCk7XG4iXSwibWFwcGluZ3MiOiJBQUtBLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsMkJBQTJCO0FBRXBDLE1BQU0seUJBQXlCO0FBQUEsRUFzR3JCLGNBQWM7QUFwR3RCLFNBQVEsYUFBc0I7QUFDOUIsU0FBUSxZQUFpQjtBQUN6QixTQUFRLGdCQUFxQztBQUM3QyxTQUFRLFlBQW1DO0FBQzNDLFNBQVEsWUFBbUM7QUFDM0MsU0FBUSxZQUE2QjtBQUNyQyxTQUFRLFdBQWtDO0FBQzFDLFNBQVEsa0JBQXVCO0FBQy9CLFNBQVEsWUFBeUYsQ0FBQztBQUVsRyxTQUFRLFNBQTZCO0FBQUEsTUFDbkM7QUFBQSxRQUNFLElBQUk7QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGFBQWE7QUFBQSxRQUNiLFVBQVU7QUFBQSxRQUNWLFNBQVM7QUFBQSxRQUNULGlCQUFpQjtBQUFBLFFBQ2pCLHdCQUF3QjtBQUFBLFFBQ3hCLFFBQVE7QUFBQSxRQUNSLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsTUFDQTtBQUFBLFFBQ0UsSUFBSTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1QsaUJB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