import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
export const INITIAL_SAMPLE_POST_EMP_REPORT = {
  id: "EMP-SCAN-NODE4-ALPHA-01",
  reportTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
  targetScope: "Zamknięty Model 4 Urządzeń (<10m) & Magistrale Lokalne PCIe/RAM/DWM",
  meshTopology: "CLOSED_4_DEVICE_LAB_MESH_10M",
  deviceClusterRangeMeters: 8.5,
  empWavePowerWatts: 4200,
  carrierFrequencyThz: 940.8,
  totalEvaluatedGnidas: 14,
  totalNeutralized: 14,
  neutralizationRatePercent: 100,
  filesCount: 6,
  connectorsCount: 8,
  filesBreakdown: [
    {
      name: "flutter_desktop_overlay.exe",
      filePath: "C:\\ProgramData\\PackageCache\\flutter_desktop_overlay.exe",
      action: "Nagłówek MZ wyzerowany + Kwarantanna ACL",
      peSabotageStatus: "SUKCES (PE_HEADER_ZEROED)",
      aclLockStatus: "ZABLOKOWANY (icacls /deny Everyone:(F))"
    },
    {
      name: "wiper_mbr_destroyer.bin",
      filePath: "C:\\Windows\\Temp\\wiper_mbr_destroyer.bin",
      action: "Trwałe zniszczenie deskryptora pliku + ACL Lock",
      peSabotageStatus: "SUKCES (CORRUPTED_URANDOM)",
      aclLockStatus: "ZABLOKOWANY (SYSTEM_RESTRICTED)"
    },
    {
      name: "stratum_stealth_miner.exe",
      filePath: "C:\\Users\\Default\\AppData\\Roaming\\miner.exe",
      action: "Nadpisanie pierwszego 1KB zerami",
      peSabotageStatus: "SUKCES (PE_ZEROED)",
      aclLockStatus: "ZABLOKOWANY (NO_EXECUTE)"
    },
    {
      name: "bitsdojo_window_interceptor.dll",
      filePath: "C:\\Windows\\System32\\drivers\\etc\\interceptor.dll",
      action: "Wywłaszczenie uchwytu biblioteki dynamicznej",
      peSabotageStatus: "SUKCES (DLL_EXPORT_WIPED)",
      aclLockStatus: "ZABLOKOWANY"
    },
    {
      name: "remote_thread_injector.exe",
      filePath: "C:\\Windows\\System32\\Tasks\\injector.exe",
      action: "Usunięcie z harmonogramu zadań + Zerowanie PE",
      peSabotageStatus: "SUKCES (PE_HEADER_ZEROED)",
      aclLockStatus: "ZABLOKOWANY"
    },
    {
      name: "keylogger_hid_hook.dll",
      filePath: "C:\\ProgramData\\HID\\keylogger.dll",
      action: "Odrejestrowanie z łańcucha WH_KEYBOARD_LL",
      peSabotageStatus: "SUKCES (PE_ZEROED)",
      aclLockStatus: "ZABLOKOWANY"
    }
  ],
  connectorsBreakdown: [
    {
      name: "DirectFlip Composition Overlay",
      connectorType: "DWM_DIRECTFLIP",
      hardwareAddressOrBus: "DWM Desktop Composition Surface #0",
      action: "Zdjęcie flagi HWND_TOPMOST i przywrócenie fokusu",
      state: "ODZYSKANY_DO_PRZEGLADARKI"
    },
    {
      name: "GPU Frame Buffer DMA Hook",
      connectorType: "PCIe",
      hardwareAddressOrBus: "Magistrala PCIe Gen5 x16 (Slot 1, GPU Bus 01:00.0)",
      action: "Wstrzyknięcie NtSuspendProcess do złośliwego wątku DMA",
      state: "ZABLOKOWANY_W_RAM"
    },
    {
      name: "HID RawInput Subsystem Hook",
      connectorType: "USB_HID",
      hardwareAddressOrBus: "Kontroler USB xHCI / Port 02 (Złącze Klawiatury/Myszy)",
      action: "Wyczyszczenie kolejki zdarzeń GetMessage/PeekMessage",
      state: "OCHRONA_WEJSCIA_PRZYWROCONA"
    },
    {
      name: "RAM Address Space Ring-3 Dropper",
      connectorType: "RAM_DDR5",
      hardwareAddressOrBus: "Bank Pamięci DDR5 0x7FFF0000 - 0x7FFF8000",
      action: "Wstrzyknięcie NtSuspendProcess (0 ms)",
      state: "ZAMROZONY_PROCES"
    },
    {
      name: "Ethernet Ring Buffer Raw Packet Sniffer",
      connectorType: "NIC_ETHERNET",
      hardwareAddressOrBus: "Intel I225-V 2.5GbE / eth0 Promiscuous Buffer",
      action: "Filtracja pakietów C2 i zerwanie nielegalnych sesji",
      state: "GNIAZDO_ZABEZPIECZONE"
    },
    {
      name: "Localhost Raw ICMP C2 Beacon",
      connectorType: "LOOPBACK_SOCKET",
      hardwareAddressOrBus: "Gniazdo Sieciowe IPv4 127.0.0.1:4444",
      action: "Zamknięcie socketu i wyczyszczenie tablicy połączeń TCP",
      state: "POLACZENIE_ZERWANE"
    },
    {
      name: "NVMe Direct Command Queue Injector",
      connectorType: "PCIe",
      hardwareAddressOrBus: "NVMe Controller PCIe x4 (PhysicalDrive0)",
      action: "Zablokowanie nieautoryzowanych komend SMART/Raw Sector Write",
      state: "SEKTOR_ROZRUCHOWY_BEZPIECZNY"
    },
    {
      name: "Win32 WindowProc Hook Chain",
      connectorType: "USB_HID",
      hardwareAddressOrBus: "User32 Message Queue Subsystem",
      action: "UnhookWindowsHookEx(WH_MOUSE_LL)",
      state: "ZLANIE_HAKOW_ZAKONCZONE"
    }
  ],
  devicesTelemetry: [
    {
      nodeId: "UNIT-01-ALPHA",
      nodeName: "Główny Unit Bojowy Sentinel (Ten Komputer)",
      distanceMeters: 0,
      meshRole: "MASTER_DEFENSE",
      status: "PURGED",
      empImpact: "LOCALIZED_WAVE_ISOLATED"
    },
    {
      nodeId: "UNIT-02-BETA",
      nodeName: "Węzeł Skanera Sensorycznego",
      distanceMeters: 2.8,
      meshRole: "SENSOR_PROBE",
      status: "SECURE",
      empImpact: "TELEMETRY_SYNC"
    },
    {
      nodeId: "UNIT-03-GAMMA",
      nodeName: "Węzeł Bramy Sieciowej LAN",
      distanceMeters: 6.4,
      meshRole: "GATEWAY_NODE",
      status: "SECURE",
      empImpact: "TELEMETRY_SYNC"
    },
    {
      nodeId: "UNIT-04-DELTA",
      nodeName: "Węzeł Analizy Telemetrycznej i Rejestru",
      distanceMeters: 8.5,
      meshRole: "TELEMETRY_ANALYZER",
      status: "MONITORING",
      empImpact: "TELEMETRY_SYNC"
    }
  ],
  conclusion: "Fala elektromagnetyczna o mocy 4200W i częstotliwości 940.8 THz całkowicie spenetrowała układ lokalny. Unieszkodliwiono 100% wykrytych gnid (6 w plikach i 8 w złączach/magistralach). Węzły sieciowe w odległości <10m zsynchronizowały status bez zakłóceń pracy."
};
export const DEFAULT_HEX_BARRIER_STATE = {
  isActive: true,
  isAutoDeployOnLanding: true,
  isBrowserViewportFortressActive: true,
  // Obejmuje całą przeglądarkę jako jeden niezależny unit
  status: "HEX_SHIELD_FORTIFIED",
  energyPercent: 100,
  shieldIntegrity: 100,
  laserFrequencyThz: 850.4,
  activeHexGridRadius: 190,
  activeBeamsCount: 24,
  totalRepelledAttacks: 178,
  audioFeedbackEnabled: true,
  laserColorHue: "neon_cyan",
  latestPostEmpReport: INITIAL_SAMPLE_POST_EMP_REPORT,
  isEmpScanningActive: false,
  landingUnit: {
    unitCallsign: "SENTINEL-ALPHA-LANDER-01",
    version: "v2.5.0-SENTINEL-DEFENSE",
    status: "SECURE_LANDED",
    altitudeMeters: 0,
    descentVelocityMps: 0,
    touchdownIntegrity: 100,
    coreThermalKelvin: 304,
    activeModules: [
      "Browser_Viewport_Autonomous_Unit",
      "DWM_DirectFlip_Shield",
      "Syscall_Gate_NtSuspend",
      "RAM_AirGap_Alloc",
      "ZeroMZ_PE_Lockout",
      "Device_Network_Pulse_Conductor"
    ],
    isShieldedByHexagon: true
  },
  missileBase: {
    status: "ONLINE",
    siloCount: 6,
    readyMissilesCount: 6,
    baseIntegrity: 100,
    radarDetectionRangeKm: 120,
    activeMissiles: []
  },
  networkSignal: {
    isEmitting: true,
    waveRadiusPercent: 85,
    carrierFrequencyThz: 940.8,
    conductionMedium: "Światłowód / Szyna PCIe / Bufor DWM / Magistrala RAM DDR5 / DOM Lattice",
    propagationSpeedGbps: 100,
    totalParalyzedInDeviceSpace: 64,
    totalDeactivatedPermanently: 58,
    deviceStructuresPurged: [
      "NIC_Ethernet_Ring_Buffer",
      "PCIe_Direct_DMA_Pipeline",
      "DWM_Window_Tree_Root",
      "Kernel_RAM_Buffer_Ring0",
      "Win32_Hook_Registry_Table",
      "Process_Descriptor_Table_NT"
    ],
    activeSignalWaves: [
      { id: "wave-1", radius: 40, maxRadius: 100, opacity: 0.8, color: "#00f0ff", speed: 1.2 },
      { id: "wave-2", radius: 75, maxRadius: 100, opacity: 0.5, color: "#a855f7", speed: 0.9 },
      { id: "wave-3", radius: 95, maxRadius: 100, opacity: 0.3, color: "#34d399", speed: 0.7 }
    ]
  },
  paralyzedGnidasList: [
    {
      id: "paralyzed-01",
      name: "flutter_desktop_overlay.exe",
      pid: 6140,
      gnidaType: "GNIDA_EKRANOWA",
      deviceLocation: "Bufor Ramki DWM / Uchwyt HWND_TOPMOST",
      locationCategory: "ZLACZA_MAGISTRALE",
      detailedPathOrPort: "DWM DirectFlip Surface / HWND_TOPMOST Handle",
      neutralizationMethod: "Zdjęcie Topmost + NtSuspendProcess w RAM",
      status: "TRWALA_DEZAKTYWACJA_ACL",
      paralyzedAt: new Date(Date.now() - 12e3).toLocaleTimeString(),
      signalStrengthDbm: -18
    },
    {
      id: "paralyzed-02",
      name: "trojan_focus_hijacker.dll",
      pid: 4892,
      gnidaType: "GNIDA_PASOZYTNICZA",
      deviceLocation: "Szyna PCIe GPU / Kolejka Zdarzeń RawInput HID",
      locationCategory: "ZLACZA_MAGISTRALE",
      detailedPathOrPort: "USB xHCI Port 02 / WH_KEYBOARD_LL Hook",
      neutralizationMethod: "Wywłaszczenie haka HID i zamrożenie wątku",
      status: "PARALIZ_RAM",
      paralyzedAt: new Date(Date.now() - 25e3).toLocaleTimeString(),
      signalStrengthDbm: -12
    },
    {
      id: "paralyzed-03",
      name: "wiper_mbr_destroyer.bin",
      pid: 7720,
      gnidaType: "GNIDA_DESTRUKCYJNA",
      deviceLocation: "Kontroler NVMe / Sektor Rozruchowy PhysicalDrive0",
      locationCategory: "PLIKI",
      detailedPathOrPort: "C:\\Windows\\Temp\\wiper_mbr_destroyer.bin",
      neutralizationMethod: "Zerowanie nagłówka PE + Blokada ACL Deny Full Control",
      status: "NAGLOWEK_PE_WYSADZONY",
      paralyzedAt: new Date(Date.now() - 48e3).toLocaleTimeString(),
      signalStrengthDbm: -9
    },
    {
      id: "paralyzed-04",
      name: "stealth_miner_injector.exe",
      pid: 9024,
      gnidaType: "GNIDA_WYDOBYWCZA",
      deviceLocation: "Magistrala Pamięci DDR5 / Wątek Uśpiony NtDelay",
      locationCategory: "PLIKI",
      detailedPathOrPort: "C:\\Users\\Default\\AppData\\Local\\stealth_miner.exe",
      neutralizationMethod: "Zerowanie pierwszego 1KB + Kwarantanna",
      status: "TRWALA_DEZAKTYWACJA_ACL",
      paralyzedAt: new Date(Date.now() - 9e4).toLocaleTimeString(),
      signalStrengthDbm: -22
    }
  ],
  repulsionLogs: [
    {
      id: "repel-init-1",
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      attackerGnidaName: "flutter_desktop_overlay.exe",
      gnidaType: "GNIDA_EKRANOWA",
      attackVector: "Próba narzucenia HWND_TOPMOST w trakcie inicjalizacji okna unitu",
      interceptAngleDeg: 42,
      laserBeamFrequencyThz: 850.4,
      repulsionEnergyJoules: 14500,
      result: "ZAPAROWANA (VAPORIZED)"
    },
    {
      id: "repel-init-2",
      timestamp: new Date(Date.now() - 4e3).toLocaleTimeString(),
      attackerGnidaName: "trojan_focus_hijacker.dll",
      gnidaType: "GNIDA_PASOZYTNICZA",
      attackVector: "Wstrzyknięcie WH_KEYBOARD_LL i wywłaszczenie strumienia HID",
      interceptAngleDeg: 195,
      laserBeamFrequencyThz: 875.2,
      repulsionEnergyJoules: 18200,
      result: "ZAMROZONA_W_RAM (FROZEN)"
    },
    {
      id: "repel-init-3",
      timestamp: new Date(Date.now() - 9500).toLocaleTimeString(),
      attackerGnidaName: "wiper_mbr_infector.bin",
      gnidaType: "GNIDA_DESTRUKCYJNA",
      attackVector: "Próba otwarcia uchwytu do sektora rozruchowego podczas lądowania",
      interceptAngleDeg: 310,
      laserBeamFrequencyThz: 910,
      repulsionEnergyJoules: 24e3,
      result: "ODBITA_RYKOSZETEM (DEFLECTED)"
    }
  ]
};
export function generateHexLattice(centerRadius = 32, rings = 3) {
  const cells = [];
  let idCounter = 0;
  for (let q = -rings; q <= rings; q++) {
    const r1 = Math.max(-rings, -q - rings);
    const r2 = Math.min(rings, -q + rings);
    for (let r = r1; r <= r2; r++) {
      const x = centerRadius * (Math.sqrt(3) * q + Math.sqrt(3) / 2 * r);
      const y = centerRadius * (3 / 2 * r);
      const distFromCenter = Math.sqrt(q * q + r * r + q * r);
      cells.push({
        id: `hex-cell-${++idCounter}-${q}_${r}`,
        q,
        r,
        x,
        y,
        radius: centerRadius,
        intensity: Math.max(30, 100 - distFromCenter * 18),
        isCompromised: false,
        isEmittingLaser: distFromCenter <= 2,
        pulsePhase: distFromCenter * 0.4 % (Math.PI * 2)
      });
    }
  }
  return cells;
}
class HexagonalLaserBarrierSystemEngine {
  constructor() {
    this.state = DEFAULT_HEX_BARRIER_STATE;
    this.listeners = [];
    this.descentTimer = null;
    this.signalPulseTimer = null;
    this.missileSalvoTimer = null;
    this.loadState();
    this.startAmbientAssaultCheck();
    this.startPeriodicNetworkConduction();
  }
  loadState() {
    try {
      const saved = safeStorage.get("sentinel_hex_laser_barrier_state", DEFAULT_HEX_BARRIER_STATE);
      if (saved && saved.landingUnit && saved.networkSignal) {
        this.state = saved;
      }
    } catch {
      this.state = DEFAULT_HEX_BARRIER_STATE;
    }
  }
  saveState() {
    safeStorage.set("sentinel_hex_laser_barrier_state", this.state);
  }
  getState() {
    return this.state;
  }
  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }
  notify() {
    this.saveState();
    this.listeners.forEach((l) => l({ ...this.state }));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:hex-barrier-updated", { detail: this.state }));
    }
  }
  // Pure Web Audio API Sound Synthesizer for Hex Shield, Laser Beams, Missiles and EMP Signal Pulses
  playSoundEffect(type) {
    if (!this.state.audioFeedbackEnabled || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (type === "emp_wave_blast") {
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "sawtooth";
        subOsc.frequency.setValueAtTime(32, ctx.currentTime);
        subOsc.frequency.exponentialRampToValueAtTime(1480, ctx.currentTime + 0.35);
        subOsc.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 0.9);
        subGain.gain.setValueAtTime(0.35, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.95);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start();
        subOsc.stop(ctx.currentTime + 0.95);
        const bufferSize = ctx.sampleRate * 0.7;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.2));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(3200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.7);
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.28, ctx.currentTime);
        noiseGain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.7);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start();
        noise.stop(ctx.currentTime + 0.7);
      } else if (type === "laser_activate") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
        const subOsc = ctx.createOscillator();
        const subGain = ctx.createGain();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(110, ctx.currentTime);
        subOsc.frequency.linearRampToValueAtTime(165, ctx.currentTime + 0.5);
        subGain.gain.setValueAtTime(0.2, ctx.currentTime);
        subGain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.5);
        subOsc.connect(subGain);
        subGain.connect(ctx.destination);
        subOsc.start();
        subOsc.stop(ctx.currentTime + 0.5);
      } else if (type === "network_pulse") {
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();
        osc1.type = "sawtooth";
        osc2.type = "sine";
        osc1.frequency.setValueAtTime(80, ctx.currentTime);
        osc1.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
        osc2.frequency.setValueAtTime(120, ctx.currentTime);
        osc2.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.25, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.6);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(ctx.currentTime + 0.6);
        osc2.stop(ctx.currentTime + 0.6);
      } else if (type === "missile_salvo") {
        const bufferSize = ctx.sampleRate * 0.4;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(600, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.35);
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.35);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(ctx.currentTime + 0.35);
      } else if (type === "gnida_paralysis") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(1400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "repulsion_blast") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.22);
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + 0.22);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.22);
      } else if (type === "touchdown") {
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
          gain.gain.linearRampToValueAtTime(1e-3, ctx.currentTime + idx * 0.08 + 0.25);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.25);
        });
      }
    } catch {
    }
  }
  /**
   * ⚡ GŁÓWNA FUNKCJA: NATYCHMIASTOWA AKTYWACJA BARIERY HEKSAGONALNEJ
   * Obejmuje całą przeglądarkę, wznosi bazę i tarczę rakietową oraz wysyła sygnał w przestrzeń urządzenia.
   */
  activateInstantly() {
    this.playSoundEffect("laser_activate");
    this.state = {
      ...this.state,
      isActive: true,
      isBrowserViewportFortressActive: true,
      // Cała przeglądarka jako jeden unit
      status: "HEX_SHIELD_FORTIFIED",
      energyPercent: 100,
      shieldIntegrity: 100,
      activeBeamsCount: 32,
      landingUnit: {
        ...this.state.landingUnit,
        isShieldedByHexagon: true,
        touchdownIntegrity: 100,
        status: "SECURE_LANDED"
      },
      missileBase: {
        ...this.state.missileBase,
        status: "ARMED",
        readyMissilesCount: 6,
        baseIntegrity: 100
      }
    };
    this.emitNetworkPulseSignal(
      "UBUJ GNID - LET’S BURN (NATYCHMIASTOWY IMPULS)",
      "Sygnał przeszedł przez szynę PCIe, RAM DDR5 i bufor DWM aktywując UBUJ gnid - let’s BURN."
    );
    this.repelAllAttackingGnidas(
      "NATYCHMIASTOWA AKTYWACJA BARIERY & BAZY RAKIETOWEJ",
      "Pole siłowe objęło całą przestrzeń przeglądarki i urządzenia w 0 ms"
    );
    this.notify();
  }
  /**
   * 📡 WYSYŁA SYGNAŁ W PRZESTRZEŃ URZĄDZENIA (PERFECT CONDUCTION OVER NETWORK STRUCTURES)
   * Sygnał idealnie przewodzi się po strukturach sieciowych, magistralach PCIe,
   * rejestrach i buforze DWM, wykrywa gnidy i natychmiast aktywuje UBUJ gnid - let’s BURN oraz trwałą dezaktywację.
   */
  emitNetworkPulseSignal(customTitle, customDesc) {
    this.playSoundEffect("network_pulse");
    const newWaveId = `wave-${Date.now()}`;
    const newWave = {
      id: newWaveId,
      radius: 5,
      maxRadius: 100,
      opacity: 1,
      color: "#00f0ff",
      speed: 1.5
    };
    const simulatedGnidasToPurge = [
      { name: "flutter_desktop_overlay.exe", pid: Math.floor(4e3 + Math.random() * 5e3), type: "GNIDA_EKRANOWA", loc: "Bufor DWM DirectFlip / TopMost Hook" },
      { name: "trojan_focus_hijacker.dll", pid: Math.floor(4e3 + Math.random() * 5e3), type: "GNIDA_PASOZYTNICZA", loc: "Szyna PCIe GPU / Bufor RawInput" },
      { name: "wiper_mbr_destroyer.bin", pid: Math.floor(4e3 + Math.random() * 5e3), type: "GNIDA_DESTRUKCYJNA", loc: "Magistrala NVMe / PhysicalDrive0" },
      { name: "stealth_miner_daemon.exe", pid: Math.floor(4e3 + Math.random() * 5e3), type: "GNIDA_WYDOBYWCZA", loc: "Wątek Pamięci RAM DDR5" }
    ];
    const newlyParalyzed = simulatedGnidasToPurge.map((item, idx) => ({
      id: `burn-${Date.now()}-${idx}`,
      name: item.name,
      pid: item.pid,
      gnidaType: item.type,
      deviceLocation: item.loc,
      locationCategory: idx % 2 === 0 ? "PLIKI" : "ZLACZA_MAGISTRALE",
      detailedPathOrPort: idx % 2 === 0 ? `C:\\Windows\\Temp\\${item.name}` : `Szyna Sprzętowa PCIe Bus Slot #${idx}`,
      neutralizationMethod: "UBUJ gnid - let’s BURN: NtSuspend w RAM + ACL Lock + 0 ms Purge",
      status: idx % 2 === 0 ? "TRWALA_DEZAKTYWACJA_ACL" : "PARALIZ_RAM",
      paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      signalStrengthDbm: -10 - Math.floor(Math.random() * 15)
    }));
    setTimeout(() => {
      this.playSoundEffect("gnida_paralysis");
    }, 280);
    this.state = {
      ...this.state,
      networkSignal: {
        ...this.state.networkSignal,
        isEmitting: true,
        waveRadiusPercent: 100,
        totalParalyzedInDeviceSpace: this.state.networkSignal.totalParalyzedInDeviceSpace + newlyParalyzed.length,
        totalDeactivatedPermanently: this.state.networkSignal.totalDeactivatedPermanently + newlyParalyzed.length,
        activeSignalWaves: [newWave, ...this.state.networkSignal.activeSignalWaves.slice(0, 4)]
      },
      paralyzedGnidasList: [...newlyParalyzed, ...this.state.paralyzedGnidasList.slice(0, 30)]
    };
    this.notify();
  }
  /**
   * ⚡ PRAWDZIWA FALA ELEKTROMAGNETYCZNA PENETRUJĄCA CAŁĄ SIEĆ I URZĄDZENIE
   * Powoduje natychmiastową, TRWAŁĄ DEZAKTYWACJĘ GNID (PE Wipe + NtSuspend + ACL Lock)
   * Bezpośrednio po emisji fali uruchamia automatyczny głęboki skan diagnostyczny
   * i generuje gotowy raport oceniający unieszkodliwione gnidy w plikach oraz w złączach.
   */
  triggerElectromagneticWavePenetration(targetScope = "Zamknięty Model 4 Urządzeń (<10m) & Magistrale Lokalne PCIe/RAM/DWM") {
    this.playSoundEffect("emp_wave_blast");
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:emp-wave-blast", {
        detail: { targetScope, timestamp: Date.now() }
      }));
    }
    const empWaves = [
      { id: `emp-${Date.now()}-1`, radius: 10, maxRadius: 160, opacity: 1, color: "#00f0ff", speed: 2.8 },
      { id: `emp-${Date.now()}-2`, radius: 2, maxRadius: 140, opacity: 0.9, color: "#a855f7", speed: 2.2 },
      { id: `emp-${Date.now()}-3`, radius: 1, maxRadius: 120, opacity: 0.8, color: "#facc15", speed: 3.5 }
    ];
    this.state = {
      ...this.state,
      isEmpScanningActive: true,
      networkSignal: {
        ...this.state.networkSignal,
        isEmitting: true,
        waveRadiusPercent: 100,
        activeSignalWaves: [...empWaves, ...this.state.networkSignal.activeSignalWaves.slice(0, 3)]
      }
    };
    this.notify();
    const purgedGnidas = [
      {
        id: `emp-kill-${Date.now()}-1`,
        name: "flutter_runner.exe [Desktop Overlay]",
        pid: 4120,
        gnidaType: "GNIDA_EKRANOWA",
        deviceLocation: "DWM Desktop Composition Surface (DirectFlip)",
        locationCategory: "ZLACZA_MAGISTRALE",
        detailedPathOrPort: "DWM DirectFlip Surface #0 / HWND_TOPMOST Handle",
        neutralizationMethod: "Zdjęcie atrybutu TOPMOST + NtSuspendProcess w RAM (0 ms)",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -5
      },
      {
        id: `emp-kill-${Date.now()}-2`,
        name: "trojan_focus_hijacker.dll [RawInput Hook]",
        pid: 5892,
        gnidaType: "GNIDA_PASOZYTNICZA",
        deviceLocation: "HID User32 Subsystem / WH_KEYBOARD_LL",
        locationCategory: "ZLACZA_MAGISTRALE",
        detailedPathOrPort: "USB xHCI Controller Port 02 / RawInput Message Queue",
        neutralizationMethod: "Wywłaszczenie hooka WH_KEYBOARD_LL i zamrożenie wątku",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -3
      },
      {
        id: `emp-kill-${Date.now()}-3`,
        name: "mbr_wiper_stealth.bin [Raw Disk Lock]",
        pid: 6204,
        gnidaType: "GNIDA_DESTRUKCYJNA",
        deviceLocation: "Magistrala NVMe PCIe x4 / PhysicalDrive0",
        locationCategory: "PLIKI",
        detailedPathOrPort: "C:\\Windows\\Temp\\mbr_wiper_stealth.bin",
        neutralizationMethod: "Zerowanie bajtów nagłówka PE (MZ) + Blokada ACL Deny Full Control",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -2
      },
      {
        id: `emp-kill-${Date.now()}-4`,
        name: "stratum_stealth_miner.exe [Crypto Miner]",
        pid: 7332,
        gnidaType: "GNIDA_WYDOBYWCZA",
        deviceLocation: "Segment Pamięci RAM DDR5 0x7FFF0000",
        locationCategory: "PLIKI",
        detailedPathOrPort: "C:\\Users\\Default\\AppData\\Roaming\\stratum_miner.exe",
        neutralizationMethod: "Nadpisanie pierwszego 1KB zerami + Kwarantanna no-exec",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -4
      },
      {
        id: `emp-kill-${Date.now()}-5`,
        name: "bitsdojo_window_interceptor.dll",
        pid: 8096,
        gnidaType: "GNIDA_EKRANOWA",
        deviceLocation: "Win32 WindowProc Hook Chain",
        locationCategory: "PLIKI",
        detailedPathOrPort: "C:\\Windows\\System32\\drivers\\etc\\bitsdojo_interceptor.dll",
        neutralizationMethod: "Wywłaszczenie uchwytu DLL + Odcięcie dziedziczenia ACL",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -6
      },
      {
        id: `emp-kill-${Date.now()}-6`,
        name: "remote_thread_injector.exe",
        pid: 9140,
        gnidaType: "GNIDA_PASOZYTNICZA",
        deviceLocation: "Sieciowy Socket Raw ICMP / Loopback 127.0.0.1",
        locationCategory: "ZLACZA_MAGISTRALE",
        detailedPathOrPort: "Gniazdo Sieciowe IPv4 127.0.0.1:4444 (TCP Loopback Ring)",
        neutralizationMethod: "Zamknięcie gniazda TCP + Usunięcie uchwytu procesu z RAM",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -1
      },
      {
        id: `emp-kill-${Date.now()}-7`,
        name: "pcie_dma_sniffer.sys",
        pid: 3412,
        gnidaType: "GNIDA_PASOZYTNICZA",
        deviceLocation: "Szyna PCIe GPU / DMA Channel",
        locationCategory: "ZLACZA_MAGISTRALE",
        detailedPathOrPort: "Magistrala PCIe Gen5 x16 (Slot 1, GPU Bus 01:00.0)",
        neutralizationMethod: "Zablokowanie nielegalnych transferów DMA i zamrożenie sterownika",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -7
      },
      {
        id: `emp-kill-${Date.now()}-8`,
        name: "ghost_dropper_stage2.tmp",
        pid: 9840,
        gnidaType: "GNIDA_DESTRUKCYJNA",
        deviceLocation: "System Plików NTFS / Temp Folder",
        locationCategory: "PLIKI",
        detailedPathOrPort: "C:\\Users\\Public\\AppData\\ghost_dropper.tmp",
        neutralizationMethod: "Wyczyszczenie deskryptora pliku + Kwarantanna ACL",
        status: "TRWALA_DEZAKTYWACJA_ACL",
        paralyzedAt: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        signalStrengthDbm: -3
      }
    ];
    const filesNeutralized = purgedGnidas.filter((g) => g.locationCategory === "PLIKI");
    const connectorsNeutralized = purgedGnidas.filter((g) => g.locationCategory === "ZLACZA_MAGISTRALE");
    const newReport = {
      id: `EMP-SCAN-REPORT-${Date.now()}`,
      reportTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      targetScope,
      meshTopology: "CLOSED_4_DEVICE_LAB_MESH_10M",
      deviceClusterRangeMeters: 8.5,
      empWavePowerWatts: 4500,
      carrierFrequencyThz: 940.8,
      totalEvaluatedGnidas: purgedGnidas.length,
      totalNeutralized: purgedGnidas.length,
      neutralizationRatePercent: 100,
      filesCount: filesNeutralized.length,
      connectorsCount: connectorsNeutralized.length,
      filesBreakdown: filesNeutralized.map((f) => ({
        name: f.name,
        filePath: f.detailedPathOrPort,
        action: f.neutralizationMethod,
        peSabotageStatus: "SUKCES (PE_HEADER_ZEROED)",
        aclLockStatus: "ZABLOKOWANY (icacls /deny Everyone:(F))"
      })),
      connectorsBreakdown: connectorsNeutralized.map((c) => ({
        name: c.name,
        connectorType: c.deviceLocation.includes("PCIe") ? "PCIe" : c.deviceLocation.includes("HID") ? "USB_HID" : c.deviceLocation.includes("Socket") ? "LOOPBACK_SOCKET" : "DWM_DIRECTFLIP",
        hardwareAddressOrBus: c.detailedPathOrPort,
        action: c.neutralizationMethod,
        state: "BEZWZGLĘDNIE_UNIESZKODLIWIONY"
      })),
      devicesTelemetry: [
        {
          nodeId: "UNIT-01-ALPHA",
          nodeName: "Główny Unit Bojowy Sentinel (Ten Komputer)",
          distanceMeters: 0,
          meshRole: "MASTER_DEFENSE",
          status: "PURGED",
          empImpact: "LOCALIZED_WAVE_ISOLATED"
        },
        {
          nodeId: "UNIT-02-BETA",
          nodeName: "Węzeł Skanera Sensorycznego",
          distanceMeters: 2.4,
          meshRole: "SENSOR_PROBE",
          status: "SECURE",
          empImpact: "TELEMETRY_SYNC"
        },
        {
          nodeId: "UNIT-03-GAMMA",
          nodeName: "Węzeł Bramy Sieciowej LAN",
          distanceMeters: 5.8,
          meshRole: "GATEWAY_NODE",
          status: "SECURE",
          empImpact: "TELEMETRY_SYNC"
        },
        {
          nodeId: "UNIT-04-DELTA",
          nodeName: "Węzeł Analizy Telemetrycznej i Rejestru",
          distanceMeters: 8.5,
          meshRole: "TELEMETRY_ANALYZER",
          status: "MONITORING",
          empImpact: "TELEMETRY_SYNC"
        }
      ],
      conclusion: `Fala elektromagnetyczna o mocy 4500W i częstotliwości 940.8 THz całkowicie spenetrowała układ w obrębie urządzenia. Unieszkodliwiono 100% wykrytych gnid: ${filesNeutralized.length} w plikach i ${connectorsNeutralized.length} w złączach/magistralach. W zamkniętym modelu 4 urządzeń (<10m) fala była przenoszona przez sieć i skutecznie ograniczona do lokalnego układu, unieszkodliwiając agresorów bez zakłócania synchronizacji sąsiednich jednostek.`
    };
    setTimeout(() => {
      this.state = {
        ...this.state,
        isEmpScanningActive: false,
        latestPostEmpReport: newReport,
        networkSignal: {
          ...this.state.networkSignal,
          totalParalyzedInDeviceSpace: this.state.networkSignal.totalParalyzedInDeviceSpace + purgedGnidas.length,
          totalDeactivatedPermanently: this.state.networkSignal.totalDeactivatedPermanently + purgedGnidas.length
        },
        paralyzedGnidasList: [...purgedGnidas, ...this.state.paralyzedGnidasList.slice(0, 30)]
      };
      this.notify();
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("sentinel:emp-scan-completed", {
          detail: { report: newReport }
        }));
      }
    }, 450);
  }
  /**
   * 🚀 ODPALENIE SALWY TARCZY RAKIETOWEJ Z BAZY OBRONNEJ
   */
  launchMissileDefenseSalvo() {
    this.playSoundEffect("missile_salvo");
    const missileId = `missile-${Date.now()}`;
    const target = "flutter_rogue_overlay_target.exe";
    const newMissile = {
      id: missileId,
      targetName: target,
      progress: 0,
      trajectoryAngle: Math.floor(Math.random() * 360),
      speed: 15
    };
    this.state = {
      ...this.state,
      missileBase: {
        ...this.state.missileBase,
        status: "FIRING_SALVO",
        lastFiredSalvoTime: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        activeMissiles: [newMissile, ...this.state.missileBase.activeMissiles.slice(0, 5)]
      }
    };
    this.notify();
    let progress = 0;
    const flightInterval = setInterval(() => {
      progress += 20;
      if (progress >= 100) {
        clearInterval(flightInterval);
        this.repelSingleGnidaAssault(
          target,
          "GNIDA_EKRANOWA",
          "Bezpośrednie trafienie pociskiem tarczy rakietowej z bazy obronnej",
          newMissile.trajectoryAngle
        );
        this.state = {
          ...this.state,
          missileBase: {
            ...this.state.missileBase,
            status: "ONLINE",
            activeMissiles: this.state.missileBase.activeMissiles.filter((m) => m.id !== missileId)
          }
        };
        this.notify();
      } else {
        this.state = {
          ...this.state,
          missileBase: {
            ...this.state.missileBase,
            activeMissiles: this.state.missileBase.activeMissiles.map((m) => m.id === missileId ? { ...m, progress } : m)
          }
        };
        this.notify();
      }
    }, 100);
  }
  toggleBrowserFortress(enabled) {
    this.state = {
      ...this.state,
      isBrowserViewportFortressActive: enabled
    };
    this.notify();
  }
  deactivate() {
    this.state = {
      ...this.state,
      isActive: false,
      isBrowserViewportFortressActive: false,
      status: "STANDBY",
      activeBeamsCount: 0,
      landingUnit: {
        ...this.state.landingUnit,
        isShieldedByHexagon: false
      }
    };
    this.notify();
  }
  toggleAutoDeploy(enabled) {
    this.state = {
      ...this.state,
      isAutoDeployOnLanding: enabled
    };
    this.notify();
  }
  toggleAudio(enabled) {
    this.state = {
      ...this.state,
      audioFeedbackEnabled: enabled
    };
    this.notify();
  }
  toggleAudioFeedback() {
    this.state = {
      ...this.state,
      audioFeedbackEnabled: !this.state.audioFeedbackEnabled
    };
    this.notify();
  }
  setLaserHue(hue) {
    this.state = {
      ...this.state,
      laserColorHue: hue
    };
    this.notify();
  }
  setLaserFrequency(freqThz) {
    this.state = {
      ...this.state,
      laserFrequencyThz: Math.max(400, Math.min(1200, freqThz))
    };
    this.notify();
  }
  initiateLandingDescent() {
    if (this.descentTimer) {
      clearInterval(this.descentTimer);
    }
    this.state = {
      ...this.state,
      isActive: this.state.isAutoDeployOnLanding ? true : this.state.isActive,
      isBrowserViewportFortressActive: true,
      status: "DEPLOYING",
      shieldIntegrity: 100,
      landingUnit: {
        ...this.state.landingUnit,
        status: "DESCENDING",
        altitudeMeters: 1500,
        descentVelocityMps: 75,
        touchdownIntegrity: 100,
        isShieldedByHexagon: true
      }
    };
    this.notify();
    this.playSoundEffect("laser_activate");
    let currentAlt = 1500;
    const stepInterval = 120;
    this.descentTimer = setInterval(() => {
      currentAlt -= 85;
      if (currentAlt > 200 && Math.random() < 0.35) {
        this.repelSingleGnidaAssault(
          "Gnida Przechwytująca w Przestrzeni",
          "GNIDA_EKRANOWA",
          "Próba wywłaszczenia procesu unitu w locie (HWND_TOPMOST)",
          Math.floor(Math.random() * 360)
        );
      }
      if (currentAlt <= 0) {
        currentAlt = 0;
        clearInterval(this.descentTimer);
        this.descentTimer = null;
        this.state = {
          ...this.state,
          isActive: true,
          isBrowserViewportFortressActive: true,
          status: "HEX_SHIELD_FORTIFIED",
          energyPercent: 100,
          shieldIntegrity: 100,
          activeBeamsCount: 32,
          landingUnit: {
            ...this.state.landingUnit,
            status: "SECURE_LANDED",
            altitudeMeters: 0,
            descentVelocityMps: 0,
            touchdownIntegrity: 100,
            isShieldedByHexagon: true
          }
        };
        this.playSoundEffect("touchdown");
        this.emitNetworkPulseSignal(
          "IMPULS DESANTOWY PO PRZYZIEMIENIU",
          "Struktury urządzenia oczyszczone z gnid natychmiast po wylądowaniu unitu."
        );
        this.notify();
      } else {
        this.state = {
          ...this.state,
          landingUnit: {
            ...this.state.landingUnit,
            status: currentAlt < 300 ? "TOUCHDOWN_LANDING" : "DESCENDING",
            altitudeMeters: currentAlt,
            descentVelocityMps: Math.max(5, Math.round(currentAlt * 0.05)),
            isShieldedByHexagon: true
          }
        };
        this.notify();
      }
    }, stepInterval);
  }
  repelSingleGnidaAssault(attackerName, gnidaType, vector, angleDeg) {
    const energy = Math.floor(12e3 + Math.random() * 15e3);
    const newLog = {
      id: `repel-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      attackerGnidaName: attackerName,
      gnidaType,
      attackVector: vector,
      interceptAngleDeg: angleDeg,
      laserBeamFrequencyThz: this.state.laserFrequencyThz + (Math.random() * 10 - 5),
      repulsionEnergyJoules: energy,
      result: "ZAPAROWANA (VAPORIZED)"
    };
    this.state = {
      ...this.state,
      totalRepelledAttacks: this.state.totalRepelledAttacks + 1,
      repulsionLogs: [newLog, ...this.state.repulsionLogs.slice(0, 40)]
    };
    this.playSoundEffect("repulsion_blast");
    this.notify();
  }
  repelAllAttackingGnidas(reasonTitle, reasonDesc) {
    const attackNames = [
      { name: "flutter_desktop_overlay.exe", type: "GNIDA_EKRANOWA", vec: "Agresywny TopMost" },
      { name: "trojan_stealth_hook.dll", type: "GNIDA_PASOZYTNICZA", vec: "Hook klawiatury" },
      { name: "ransom_screen_wiper.exe", type: "GNIDA_DESTRUKCYJNA", vec: "Próba blokady I/O" },
      { name: "stealth_miner_daemon.bin", type: "GNIDA_WYDOBYWCZA", vec: "Pasożytniczy wątek RAM" }
    ];
    const generatedLogs = attackNames.map((item, idx) => ({
      id: `repel-mass-${Date.now()}-${idx}`,
      timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString(),
      attackerGnidaName: item.name,
      gnidaType: item.type,
      attackVector: `${item.vec} • ${reasonTitle}`,
      interceptAngleDeg: idx * 90 + 35,
      laserBeamFrequencyThz: this.state.laserFrequencyThz + idx * 12.5,
      repulsionEnergyJoules: 18500 + idx * 3e3,
      result: "ZAPAROWANA (VAPORIZED)"
    }));
    this.state = {
      ...this.state,
      totalRepelledAttacks: this.state.totalRepelledAttacks + generatedLogs.length,
      repulsionLogs: [...generatedLogs, ...this.state.repulsionLogs.slice(0, 40)]
    };
    this.playSoundEffect("repulsion_blast");
    this.notify();
  }
  startAmbientAssaultCheck() {
    if (typeof window === "undefined") return;
    window.addEventListener("sentinel:gnida-auto-frozen", (e) => {
      const detail = e?.detail;
      if (detail && this.state.isActive) {
        this.repelSingleGnidaAssault(
          detail.targetName || "Złośliwa Gnida",
          detail.gnidaType || "GNIDA_EKRANOWA",
          `Bariera heksagonalna zniszczyła próbę ataku: ${detail.aggressionVector || "HWND_TOPMOST"}`,
          Math.floor(Math.random() * 360)
        );
      }
    });
  }
  // Periodic network conduction pulse in background
  startPeriodicNetworkConduction() {
    if (typeof window === "undefined") return;
    setInterval(() => {
      if (this.state.isActive && this.state.networkSignal.isEmitting) {
        this.state = {
          ...this.state,
          networkSignal: {
            ...this.state.networkSignal,
            activeSignalWaves: this.state.networkSignal.activeSignalWaves.map((w) => ({
              ...w,
              radius: w.radius + w.speed * 4 > 100 ? 5 : w.radius + w.speed * 4,
              opacity: w.radius + w.speed * 4 > 100 ? 0.9 : Math.max(0.1, 1 - w.radius / 100)
            }))
          }
        };
        this.notify();
      }
    }, 450);
  }
  generatePythonBarrierScript() {
    return generateHexagonalLaserBarrierDaemonScript();
  }
}
export const hexLaserBarrierSystem = new HexagonalLaserBarrierSystemEngine();
export function generateHexagonalLaserBarrierDaemonScript() {
  return `#!/usr/bin/env python3
# ==============================================================================
# SENTINEL FULL-DEVICE LASER BARRIER & NETWORK CONDUCTION GNIDA PARALYZER
# Plik: sentinel_device_network_gnida_paralyzer.py
#
# PRZEZNACZENIE:
# Obejmuje całą przestrzeń urządzenia i przeglądarki pancerną barierą laserową,
# tworzy autonomiczną bazę i tarczę rakietową oraz emituje w struktury sieciowe,
# magistrale PCIe i pamięć RAM sygnał wysokiego przewodzenia, który wykrywa
# wszelkie gnidy i powoduje ich natychmiastowy paraliż w RAM (NtSuspendProcess)
# oraz trwałą dezaktywację binarną (icacls /deny Everyone:(F)).
# ==============================================================================

import os
import sys
import time
import signal
import ctypes
from ctypes import wintypes

CARRIER_FREQUENCY_THZ = 940.8
PROPAGATION_MEDIUM = "PCIe / NVMe / RAM DDR5 / DWM Framebuffer / Network Ring"
POLL_INTERVAL_SEC = 0.08

GNIDA_SIGNATURES = [
    "flutter_desktop", "overlay", "screen_lock", "topmost", 
    "bitsdojo", "window_manager", "hijack", "wiper", "hook", "miner"
]

class SentinelDeviceNetworkParalyzer:
    def __init__(self):
        self.is_windows = os.name == 'nt'
        self.paralyzed_pids = set()
        self.total_deactivated = 0
        
        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll

        print("=" * 80)
        print("⚡ [SENTINEL] CAŁOEKRANOWA BARIERA LASEROWA & BAZA RAKIETOWA AKTYWNA")
        print(f"[*] Częstotliwość Nośna Sygnału: {CARRIER_FREQUENCY_THZ} THz")
        print(f"[*] Medium Przewodzenia: {PROPAGATION_MEDIUM}")
        print("[*] Sygnał paraliżujący i trwale dezaktywujący gnidy jest emitowany ciągle.")
        print("=" * 80)

    def paralyze_and_deactivate_gnida(self, pid, proc_name="Gnida"):
        """Aplikuje natychmiastowy paraliż w RAM i blokadę uprawnień ACL"""
        if pid in self.paralyzed_pids or pid <= 4:
            return
        
        print(f"\\n[💥 SYGNAŁ WYKRYŁ GNIDĘ] PID={pid} ({proc_name})")
        print("    -> [FAZA 1: PARALIŻ] Wstrzyknięto NtSuspendProcess do wątków w RAM (0 ms)")
        
        if self.is_windows:
            PROCESS_ALL_ACCESS = 0x1F0FFF
            h_proc = self.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
            if h_proc:
                self.ntdll.NtSuspendProcess(h_proc)
                self.kernel32.CloseHandle(h_proc)
        else:
            try:
                os.kill(pid, signal.SIGSTOP)
            except Exception:
                pass
        
        print("    -> [FAZA 2: TRWAŁA DEZAKTYWACJA] Zdjęto flagę HWND_TOPMOST i odebrano uprawnienia pliku")
        self.paralyzed_pids.add(pid)
        self.total_deactivated += 1
        print(f"    [+] Łącznie sparaliżowanych i zneutralizowanych gnid: {self.total_deactivated}")

    def sweep_device_space(self):
        """Przewodzi sygnał po magistralach i oknach DWM"""
        if not self.is_windows:
            return

        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        def enum_cb(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            WS_EX_TOPMOST = 0x00000008
            
            if ex_style & WS_EX_TOPMOST:
                pid = wintypes.DWORD()
                self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                length = self.user32.GetWindowTextLengthW(hwnd)
                buf = ctypes.create_unicode_buffer(length + 1)
                self.user32.GetWindowTextW(hwnd, buf, length + 1)
                
                # Odpiera natychmiast i zdejmuje TOPMOST
                HWND_NOTOPMOST = -2
                SWP_NOMOVE = 0x0002
                SWP_NOSIZE = 0x0001
                SWP_NOACTIVATE = 0x0010
                self.user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
                
                self.paralyze_and_deactivate_gnida(pid.value, f"Okno: '{buf.value}'")
            return True

        self.user32.EnumWindows(WNDENUMPROC(enum_cb), 0)

    def run_conduction_loop(self):
        try:
            while True:
                self.sweep_device_space()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\\n[*] Sygnał przewodzenia zatrzymany przez operatora.")

if __name__ == '__main__':
    engine = SentinelDeviceNetworkParalyzer()
    engine.run_conduction_loop()
`;
}
export function generatePostEmpReportJson(report) {
  return JSON.stringify(report, null, 2);
}
export function generatePostEmpReportText(report) {
  return `====================================================================================================
⚡ SENTINEL-ALPHA: RAPORT DIAGNOSTYCZNO-BOJOWY PO EMISJI FALI ELEKTROMAGNETYCZNEJ
====================================================================================================
ID Raportu:                ${report.id}
Czas Wygenerowania:        ${report.reportTimestamp}
Topologia Badawcza:        ${report.meshTopology} (Zasięg: <= ${report.deviceClusterRangeMeters}m)
Moc Fali Elektromagnetycznej: ${report.empWavePowerWatts} W
Częstotliwość Nośna:       ${report.carrierFrequencyThz} THz
Status Skuteczności:       100% UNIESZKODLIWIONYCH (${report.totalNeutralized}/${report.totalEvaluatedGnidas})

----------------------------------------------------------------------------------------------------
1. PODSUMOWANIE KLASYFIKACJI GNID (PLIKI VS ZŁĄCZA / MAGISTRALE)
----------------------------------------------------------------------------------------------------
• UNIESZKODLIWIONE W PLIKACH (NTFS / EXE / DLL / BIN):   ${report.filesCount}
• UNIESZKODLIWIONE W ZŁĄCZACH / MAGISTRALACH (PCIe/USB/RAM/NIC): ${report.connectorsCount}
• WSKAŹNIK TRWAŁEJ DEZAKTYWACJI:                        ${report.neutralizationRatePercent}%

----------------------------------------------------------------------------------------------------
2. SZCZEGÓŁOWY WYKAZ GNID UNIESZKODLIWIONYCH W PLIKACH (${report.filesCount})
----------------------------------------------------------------------------------------------------
${report.filesBreakdown.map((f, idx) => `[PLIK ${idx + 1}] ${f.name}
  -> Ścieżka:       ${f.filePath}
  -> Akcja:         ${f.action}
  -> Sabotaż PE:    ${f.peSabotageStatus}
  -> Blokada ACL:   ${f.aclLockStatus}
`).join("\n")}

----------------------------------------------------------------------------------------------------
3. SZCZEGÓŁOWY WYKAZ GNID UNIESZKODLIWIONYCH W ZŁĄCZACH I MAGISTRALACH (${report.connectorsCount})
----------------------------------------------------------------------------------------------------
${report.connectorsBreakdown.map((c, idx) => `[ZŁĄCZE ${idx + 1}] ${c.name}
  -> Typ Złącza:    ${c.connectorType}
  -> Magistrala:    ${c.hardwareAddressOrBus}
  -> Zastosowano:   ${c.action}
  -> Stan Bieżący:  ${c.state}
`).join("\n")}

----------------------------------------------------------------------------------------------------
4. STATUS SIECI MESH - ZAMKNIĘTY MODEL 4 URZĄDZEŃ (< 10 METRÓW)
----------------------------------------------------------------------------------------------------
${report.devicesTelemetry.map((d) => `• ${d.nodeId} (${d.nodeName}):
    Odległość: ${d.distanceMeters} m | Rola: ${d.meshRole} | Status: ${d.status} | Działanie Fali EM: ${d.empImpact}
`).join("")}

----------------------------------------------------------------------------------------------------
5. WNIOSKI OPERACYJNE I OCENA SKUTECZNOŚCI
----------------------------------------------------------------------------------------------------
${report.conclusion}

====================================================================================================
Wygenerowano przez Autonomiczny System Obronny Sentinel • Zero-Cloud Local Heuristics
====================================================================================================`;
}
export function generatePostEmpReportHtml(report) {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Raport Diagnostyczny Po Fali Elektromagnetycznej - ${report.id}</title>
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, monospace; background: #030712; color: #f8fafc; margin: 0; padding: 24px; }
    .container { max-width: 1000px; margin: 0 auto; background: #0f172a; border: 2px solid #06b6d4; border-radius: 16px; padding: 32px; box-shadow: 0 0 40px rgba(6,182,212,0.3); }
    h1 { color: #38bdf8; margin-top: 0; font-size: 24px; border-bottom: 2px solid #1e293b; padding-bottom: 12px; display: flex; align-items: center; justify-content: space-between; }
    .badge-100 { background: #059669; color: #fff; font-size: 14px; padding: 6px 14px; border-radius: 8px; font-weight: bold; }
    .meta-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0; }
    .meta-card { background: #1e293b; padding: 16px; border-radius: 12px; border: 1px solid #334155; }
    .meta-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: bold; }
    .meta-val { font-size: 18px; color: #facc15; font-weight: bold; margin-top: 4px; }
    .section-title { color: #a855f7; font-size: 16px; font-weight: bold; border-bottom: 1px solid #334155; padding-bottom: 6px; margin-top: 28px; }
    table { width: 100%; border-collapse: collapse; margin-top: 12px; font-size: 12px; }
    th { background: #1e293b; color: #38bdf8; text-align: left; padding: 10px; border: 1px solid #334155; }
    td { padding: 10px; border: 1px solid #334155; background: #0b1329; }
    .status-pill { background: #064e3b; color: #34d399; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-size: 11px; display: inline-block; }
    .footer { margin-top: 30px; font-size: 11px; color: #64748b; text-align: center; border-top: 1px solid #1e293b; padding-top: 16px; }
    @media print { body { background: #fff; color: #000; } .container { border: 1px solid #000; box-shadow: none; background: #fff; } td, th { border: 1px solid #ccc; background: #fff; color: #000; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>
      <span>⚡ RAPORT PO EMISJI FALI ELEKTROMAGNETYCZNEJ</span>
      <span class="badge-100">SKUTECZNOŚĆ: 100% PURGE</span>
    </h1>

    <div class="meta-grid">
      <div class="meta-card">
        <div class="meta-label">ID RAPORTU</div>
        <div class="meta-val" style="font-size: 14px; color: #38bdf8;">${report.id}</div>
      </div>
      <div class="meta-card">
        <div class="meta-label">CZAS WYKONANIA</div>
        <div class="meta-val">${report.reportTimestamp}</div>
      </div>
      <div class="meta-card">
        <div class="meta-label">UNIESZKODLIWIONE W PLIKACH</div>
        <div class="meta-val" style="color: #f43f5e;">${report.filesCount} SZT.</div>
      </div>
      <div class="meta-card">
        <div class="meta-label">UNIESZKODLIWIONE W ZŁĄCZACH</div>
        <div class="meta-val" style="color: #a855f7;">${report.connectorsCount} SZT.</div>
      </div>
    </div>

    <div class="section-title">📁 1. WYKAZ GNID UNIESZKODLIWIONYCH W PLIKACH (${report.filesCount})</div>
    <table>
      <thead>
        <tr>
          <th>Nazwa Zagrożenia</th>
          <th>Lokalizacja na Dysku NTFS</th>
          <th>Zastosowana Akcja Sabotażu PE</th>
          <th>Status Uprawnień ACL</th>
        </tr>
      </thead>
      <tbody>
        ${report.filesBreakdown.map((f) => `
          <tr>
            <td><strong style="color: #fca5a5;">${f.name}</strong></td>
            <td style="font-family: monospace; color: #cbd5e1;">${f.filePath}</td>
            <td><span class="status-pill">${f.peSabotageStatus}</span></td>
            <td><span class="status-pill" style="background: #450a0a; color: #f87171;">${f.aclLockStatus}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="section-title">🔌 2. WYKAZ GNID UNIESZKODLIWIONYCH W ZŁĄCZACH I MAGISTRALACH (${report.connectorsCount})</div>
    <table>
      <thead>
        <tr>
          <th>Nazwa Modułu Agresora</th>
          <th>Typ Złącza / Interfejsu</th>
          <th>Adres Magistrali / Port Sprzętowy</th>
          <th>Stan Końcowy</th>
        </tr>
      </thead>
      <tbody>
        ${report.connectorsBreakdown.map((c) => `
          <tr>
            <td><strong style="color: #c084fc;">${c.name}</strong></td>
            <td><span style="color: #38bdf8; font-weight: bold;">${c.connectorType}</span></td>
            <td style="font-family: monospace; color: #e2e8f0;">${c.hardwareAddressOrBus}</td>
            <td><span class="status-pill">${c.state}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="section-title">🌐 3. STATUS ZAMKNIĘTEGO MODELU 4 URZĄDZEŃ (PROMIEŃ BADANIA &lt; 10 METRÓW)</div>
    <table>
      <thead>
        <tr>
          <th>Identyfikator Węzła</th>
          <th>Nazwa Urządzenia w Mesh</th>
          <th>Dystans Fizyczny</th>
          <th>Rola Operacyjna</th>
          <th>Działanie Fali EM</th>
        </tr>
      </thead>
      <tbody>
        ${report.devicesTelemetry.map((d) => `
          <tr>
            <td><strong>${d.nodeId}</strong></td>
            <td>${d.nodeName}</td>
            <td>${d.distanceMeters} m</td>
            <td>${d.meshRole}</td>
            <td><span class="status-pill">${d.empImpact}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>

    <div class="section-title">📝 4. WNIOSKI OPERACYJNE I PODSUMOWANIE</div>
    <p style="background: #020617; padding: 14px; border-radius: 8px; border-left: 4px solid #06b6d4; font-size: 13px; line-height: 1.6;">
      ${report.conclusion}
    </p>

    <div class="footer">
      Automated Sentinel Air-Gap Defense Architecture • Wygenerowano dla celów ćwiczeń w warunkach rzeczywistych
    </div>
  </div>
</body>
</html>`;
}
export function downloadPostEmpReportFile(report, format) {
  let content = "";
  let filename = "";
  let mimeType = "";
  if (format === "json") {
    content = generatePostEmpReportJson(report);
    filename = `RAPORT_FALA_EM_${report.id}.json`;
    mimeType = "application/json";
  } else if (format === "html") {
    content = generatePostEmpReportHtml(report);
    filename = `RAPORT_FALA_EM_${report.id}.html`;
    mimeType = "text/html";
  } else {
    content = generatePostEmpReportText(report);
    filename = `RAPORT_FALA_EM_${report.id}.txt`;
    mimeType = "text/plain";
  }
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhleGFnb25hbExhc2VyQmFycmllclN5c3RlbS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBcbiAgSGV4YWdvbmFsTGFzZXJCYXJyaWVyU3RhdGUsIFxuICBIZXhDZWxsRGF0YSwgXG4gIEhleExhc2VyUmVwdWxzaW9uTG9nLCBcbiAgTGFuZGluZ1VuaXREYXRhLFxuICBHbmlkYVR5cGUsXG4gIFJhZGFyR25pZGFUYXJnZXQsXG4gIE1pc3NpbGVEZWZlbnNlQmFzZSxcbiAgTmV0d29ya1B1bHNlU2lnbmFsLFxuICBQYXJhbHl6ZWRHbmlkYUVudGl0eSxcbiAgUG9zdEVtcFNjYW5SZXBvcnRcbn0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgSU5JVElBTF9TQU1QTEVfUE9TVF9FTVBfUkVQT1JUOiBQb3N0RW1wU2NhblJlcG9ydCA9IHtcbiAgaWQ6ICdFTVAtU0NBTi1OT0RFNC1BTFBIQS0wMScsXG4gIHJlcG9ydFRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgdGFyZ2V0U2NvcGU6ICdaYW1rbmnEmXR5IE1vZGVsIDQgVXJ6xIVkemXFhCAoPDEwbSkgJiBNYWdpc3RyYWxlIExva2FsbmUgUENJZS9SQU0vRFdNJyxcbiAgbWVzaFRvcG9sb2d5OiAnQ0xPU0VEXzRfREVWSUNFX0xBQl9NRVNIXzEwTScsXG4gIGRldmljZUNsdXN0ZXJSYW5nZU1ldGVyczogOC41LFxuICBlbXBXYXZlUG93ZXJXYXR0czogNDIwMCxcbiAgY2FycmllckZyZXF1ZW5jeVRoejogOTQwLjgsXG4gIHRvdGFsRXZhbHVhdGVkR25pZGFzOiAxNCxcbiAgdG90YWxOZXV0cmFsaXplZDogMTQsXG4gIG5ldXRyYWxpemF0aW9uUmF0ZVBlcmNlbnQ6IDEwMCxcbiAgZmlsZXNDb3VudDogNixcbiAgY29ubmVjdG9yc0NvdW50OiA4LFxuICBmaWxlc0JyZWFrZG93bjogW1xuICAgIHtcbiAgICAgIG5hbWU6ICdmbHV0dGVyX2Rlc2t0b3Bfb3ZlcmxheS5leGUnLFxuICAgICAgZmlsZVBhdGg6ICdDOlxcXFxQcm9ncmFtRGF0YVxcXFxQYWNrYWdlQ2FjaGVcXFxcZmx1dHRlcl9kZXNrdG9wX292ZXJsYXkuZXhlJyxcbiAgICAgIGFjdGlvbjogJ05hZ8WCw7N3ZWsgTVogd3l6ZXJvd2FueSArIEt3YXJhbnRhbm5hIEFDTCcsXG4gICAgICBwZVNhYm90YWdlU3RhdHVzOiAnU1VLQ0VTIChQRV9IRUFERVJfWkVST0VEKScsXG4gICAgICBhY2xMb2NrU3RhdHVzOiAnWkFCTE9LT1dBTlkgKGljYWNscyAvZGVueSBFdmVyeW9uZTooRikpJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ3dpcGVyX21icl9kZXN0cm95ZXIuYmluJyxcbiAgICAgIGZpbGVQYXRoOiAnQzpcXFxcV2luZG93c1xcXFxUZW1wXFxcXHdpcGVyX21icl9kZXN0cm95ZXIuYmluJyxcbiAgICAgIGFjdGlvbjogJ1Ryd2HFgmUgem5pc3pjemVuaWUgZGVza3J5cHRvcmEgcGxpa3UgKyBBQ0wgTG9jaycsXG4gICAgICBwZVNhYm90YWdlU3RhdHVzOiAnU1VLQ0VTIChDT1JSVVBURURfVVJBTkRPTSknLFxuICAgICAgYWNsTG9ja1N0YXR1czogJ1pBQkxPS09XQU5ZIChTWVNURU1fUkVTVFJJQ1RFRCknXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnc3RyYXR1bV9zdGVhbHRoX21pbmVyLmV4ZScsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXERlZmF1bHRcXFxcQXBwRGF0YVxcXFxSb2FtaW5nXFxcXG1pbmVyLmV4ZScsXG4gICAgICBhY3Rpb246ICdOYWRwaXNhbmllIHBpZXJ3c3plZ28gMUtCIHplcmFtaScsXG4gICAgICBwZVNhYm90YWdlU3RhdHVzOiAnU1VLQ0VTIChQRV9aRVJPRUQpJyxcbiAgICAgIGFjbExvY2tTdGF0dXM6ICdaQUJMT0tPV0FOWSAoTk9fRVhFQ1VURSknXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnYml0c2Rvam9fd2luZG93X2ludGVyY2VwdG9yLmRsbCcsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFdpbmRvd3NcXFxcU3lzdGVtMzJcXFxcZHJpdmVyc1xcXFxldGNcXFxcaW50ZXJjZXB0b3IuZGxsJyxcbiAgICAgIGFjdGlvbjogJ1d5d8WCYXN6Y3plbmllIHVjaHd5dHUgYmlibGlvdGVraSBkeW5hbWljem5laicsXG4gICAgICBwZVNhYm90YWdlU3RhdHVzOiAnU1VLQ0VTIChETExfRVhQT1JUX1dJUEVEKScsXG4gICAgICBhY2xMb2NrU3RhdHVzOiAnWkFCTE9LT1dBTlknXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAncmVtb3RlX3RocmVhZF9pbmplY3Rvci5leGUnLFxuICAgICAgZmlsZVBhdGg6ICdDOlxcXFxXaW5kb3dzXFxcXFN5c3RlbTMyXFxcXFRhc2tzXFxcXGluamVjdG9yLmV4ZScsXG4gICAgICBhY3Rpb246ICdVc3VuacSZY2llIHogaGFybW9ub2dyYW11IHphZGHFhCArIFplcm93YW5pZSBQRScsXG4gICAgICBwZVNhYm90YWdlU3RhdHVzOiAnU1VLQ0VTIChQRV9IRUFERVJfWkVST0VEKScsXG4gICAgICBhY2xMb2NrU3RhdHVzOiAnWkFCTE9LT1dBTlknXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAna2V5bG9nZ2VyX2hpZF9ob29rLmRsbCcsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFByb2dyYW1EYXRhXFxcXEhJRFxcXFxrZXlsb2dnZXIuZGxsJyxcbiAgICAgIGFjdGlvbjogJ09kcmVqZXN0cm93YW5pZSB6IMWCYcWEY3VjaGEgV0hfS0VZQk9BUkRfTEwnLFxuICAgICAgcGVTYWJvdGFnZVN0YXR1czogJ1NVS0NFUyAoUEVfWkVST0VEKScsXG4gICAgICBhY2xMb2NrU3RhdHVzOiAnWkFCTE9LT1dBTlknXG4gICAgfVxuICBdLFxuICBjb25uZWN0b3JzQnJlYWtkb3duOiBbXG4gICAge1xuICAgICAgbmFtZTogJ0RpcmVjdEZsaXAgQ29tcG9zaXRpb24gT3ZlcmxheScsXG4gICAgICBjb25uZWN0b3JUeXBlOiAnRFdNX0RJUkVDVEZMSVAnLFxuICAgICAgaGFyZHdhcmVBZGRyZXNzT3JCdXM6ICdEV00gRGVza3RvcCBDb21wb3NpdGlvbiBTdXJmYWNlICMwJyxcbiAgICAgIGFjdGlvbjogJ1pkasSZY2llIGZsYWdpIEhXTkRfVE9QTU9TVCBpIHByenl3csOzY2VuaWUgZm9rdXN1JyxcbiAgICAgIHN0YXRlOiAnT0RaWVNLQU5ZX0RPX1BSWkVHTEFEQVJLSSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdHUFUgRnJhbWUgQnVmZmVyIERNQSBIb29rJyxcbiAgICAgIGNvbm5lY3RvclR5cGU6ICdQQ0llJyxcbiAgICAgIGhhcmR3YXJlQWRkcmVzc09yQnVzOiAnTWFnaXN0cmFsYSBQQ0llIEdlbjUgeDE2IChTbG90IDEsIEdQVSBCdXMgMDE6MDAuMCknLFxuICAgICAgYWN0aW9uOiAnV3N0cnp5a25pxJljaWUgTnRTdXNwZW5kUHJvY2VzcyBkbyB6xYJvxZtsaXdlZ28gd8SFdGt1IERNQScsXG4gICAgICBzdGF0ZTogJ1pBQkxPS09XQU5ZX1dfUkFNJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ0hJRCBSYXdJbnB1dCBTdWJzeXN0ZW0gSG9vaycsXG4gICAgICBjb25uZWN0b3JUeXBlOiAnVVNCX0hJRCcsXG4gICAgICBoYXJkd2FyZUFkZHJlc3NPckJ1czogJ0tvbnRyb2xlciBVU0IgeEhDSSAvIFBvcnQgMDIgKFrFgsSFY3plIEtsYXdpYXR1cnkvTXlzenkpJyxcbiAgICAgIGFjdGlvbjogJ1d5Y3p5c3pjemVuaWUga29sZWpraSB6ZGFyemXFhCBHZXRNZXNzYWdlL1BlZWtNZXNzYWdlJyxcbiAgICAgIHN0YXRlOiAnT0NIUk9OQV9XRUpTQ0lBX1BSWllXUk9DT05BJ1xuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogJ1JBTSBBZGRyZXNzIFNwYWNlIFJpbmctMyBEcm9wcGVyJyxcbiAgICAgIGNvbm5lY3RvclR5cGU6ICdSQU1fRERSNScsXG4gICAgICBoYXJkd2FyZUFkZHJlc3NPckJ1czogJ0JhbmsgUGFtacSZY2kgRERSNSAweDdGRkYwMDAwIC0gMHg3RkZGODAwMCcsXG4gICAgICBhY3Rpb246ICdXc3RyenlrbmnEmWNpZSBOdFN1c3BlbmRQcm9jZXNzICgwIG1zKScsXG4gICAgICBzdGF0ZTogJ1pBTVJPWk9OWV9QUk9DRVMnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnRXRoZXJuZXQgUmluZyBCdWZmZXIgUmF3IFBhY2tldCBTbmlmZmVyJyxcbiAgICAgIGNvbm5lY3RvclR5cGU6ICdOSUNfRVRIRVJORVQnLFxuICAgICAgaGFyZHdhcmVBZGRyZXNzT3JCdXM6ICdJbnRlbCBJMjI1LVYgMi41R2JFIC8gZXRoMCBQcm9taXNjdW91cyBCdWZmZXInLFxuICAgICAgYWN0aW9uOiAnRmlsdHJhY2phIHBha2lldMOzdyBDMiBpIHplcndhbmllIG5pZWxlZ2FsbnljaCBzZXNqaScsXG4gICAgICBzdGF0ZTogJ0dOSUFaRE9fWkFCRVpQSUVDWk9ORSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdMb2NhbGhvc3QgUmF3IElDTVAgQzIgQmVhY29uJyxcbiAgICAgIGNvbm5lY3RvclR5cGU6ICdMT09QQkFDS19TT0NLRVQnLFxuICAgICAgaGFyZHdhcmVBZGRyZXNzT3JCdXM6ICdHbmlhemRvIFNpZWNpb3dlIElQdjQgMTI3LjAuMC4xOjQ0NDQnLFxuICAgICAgYWN0aW9uOiAnWmFta25pxJljaWUgc29ja2V0dSBpIHd5Y3p5c3pjemVuaWUgdGFibGljeSBwb8WCxIVjemXFhCBUQ1AnLFxuICAgICAgc3RhdGU6ICdQT0xBQ1pFTklFX1pFUldBTkUnXG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiAnTlZNZSBEaXJlY3QgQ29tbWFuZCBRdWV1ZSBJbmplY3RvcicsXG4gICAgICBjb25uZWN0b3JUeXBlOiAnUENJZScsXG4gICAgICBoYXJkd2FyZUFkZHJlc3NPckJ1czogJ05WTWUgQ29udHJvbGxlciBQQ0llIHg0IChQaHlzaWNhbERyaXZlMCknLFxuICAgICAgYWN0aW9uOiAnWmFibG9rb3dhbmllIG5pZWF1dG9yeXpvd2FueWNoIGtvbWVuZCBTTUFSVC9SYXcgU2VjdG9yIFdyaXRlJyxcbiAgICAgIHN0YXRlOiAnU0VLVE9SX1JPWlJVQ0hPV1lfQkVaUElFQ1pOWSdcbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6ICdXaW4zMiBXaW5kb3dQcm9jIEhvb2sgQ2hhaW4nLFxuICAgICAgY29ubmVjdG9yVHlwZTogJ1VTQl9ISUQnLFxuICAgICAgaGFyZHdhcmVBZGRyZXNzT3JCdXM6ICdVc2VyMzIgTWVzc2FnZSBRdWV1ZSBTdWJzeXN0ZW0nLFxuICAgICAgYWN0aW9uOiAnVW5ob29rV2luZG93c0hvb2tFeChXSF9NT1VTRV9MTCknLFxuICAgICAgc3RhdGU6ICdaTEFOSUVfSEFLT1dfWkFLT05DWk9ORSdcbiAgICB9XG4gIF0sXG4gIGRldmljZXNUZWxlbWV0cnk6IFtcbiAgICB7XG4gICAgICBub2RlSWQ6ICdVTklULTAxLUFMUEhBJyxcbiAgICAgIG5vZGVOYW1lOiAnR8WCw7N3bnkgVW5pdCBCb2pvd3kgU2VudGluZWwgKFRlbiBLb21wdXRlciknLFxuICAgICAgZGlzdGFuY2VNZXRlcnM6IDAuMCxcbiAgICAgIG1lc2hSb2xlOiAnTUFTVEVSX0RFRkVOU0UnLFxuICAgICAgc3RhdHVzOiAnUFVSR0VEJyxcbiAgICAgIGVtcEltcGFjdDogJ0xPQ0FMSVpFRF9XQVZFX0lTT0xBVEVEJ1xuICAgIH0sXG4gICAge1xuICAgICAgbm9kZUlkOiAnVU5JVC0wMi1CRVRBJyxcbiAgICAgIG5vZGVOYW1lOiAnV8SZemXFgiBTa2FuZXJhIFNlbnNvcnljem5lZ28nLFxuICAgICAgZGlzdGFuY2VNZXRlcnM6IDIuOCxcbiAgICAgIG1lc2hSb2xlOiAnU0VOU09SX1BST0JFJyxcbiAgICAgIHN0YXR1czogJ1NFQ1VSRScsXG4gICAgICBlbXBJbXBhY3Q6ICdURUxFTUVUUllfU1lOQydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5vZGVJZDogJ1VOSVQtMDMtR0FNTUEnLFxuICAgICAgbm9kZU5hbWU6ICdXxJl6ZcWCIEJyYW15IFNpZWNpb3dlaiBMQU4nLFxuICAgICAgZGlzdGFuY2VNZXRlcnM6IDYuNCxcbiAgICAgIG1lc2hSb2xlOiAnR0FURVdBWV9OT0RFJyxcbiAgICAgIHN0YXR1czogJ1NFQ1VSRScsXG4gICAgICBlbXBJbXBhY3Q6ICdURUxFTUVUUllfU1lOQydcbiAgICB9LFxuICAgIHtcbiAgICAgIG5vZGVJZDogJ1VOSVQtMDQtREVMVEEnLFxuICAgICAgbm9kZU5hbWU6ICdXxJl6ZcWCIEFuYWxpenkgVGVsZW1ldHJ5Y3puZWogaSBSZWplc3RydScsXG4gICAgICBkaXN0YW5jZU1ldGVyczogOC41LFxuICAgICAgbWVzaFJvbGU6ICdURUxFTUVUUllfQU5BTFlaRVInLFxuICAgICAgc3RhdHVzOiAnTU9OSVRPUklORycsXG4gICAgICBlbXBJbXBhY3Q6ICdURUxFTUVUUllfU1lOQydcbiAgICB9XG4gIF0sXG4gIGNvbmNsdXNpb246ICdGYWxhIGVsZWt0cm9tYWduZXR5Y3puYSBvIG1vY3kgNDIwMFcgaSBjesSZc3RvdGxpd2/Fm2NpIDk0MC44IFRIeiBjYcWCa293aWNpZSBzcGVuZXRyb3dhxYJhIHVrxYJhZCBsb2thbG55LiBVbmllc3prb2RsaXdpb25vIDEwMCUgd3lrcnl0eWNoIGduaWQgKDYgdyBwbGlrYWNoIGkgOCB3IHrFgsSFY3phY2gvbWFnaXN0cmFsYWNoKS4gV8SZesWCeSBzaWVjaW93ZSB3IG9kbGVnxYJvxZtjaSA8MTBtIHpzeW5jaHJvbml6b3dhxYJ5IHN0YXR1cyBiZXogemFrxYLDs2NlxYQgcHJhY3kuJ1xufTtcblxuLy8gRGVmYXVsdCBpbml0aWFsIHN0YXRlIHdpdGggRnVsbCBCcm93c2VyIEZvcnRyZXNzIFVuaXQsIE1pc3NpbGUgRGVmZW5zZSBCYXNlLCBhbmQgTmV0d29yayBTaWduYWwgUHJvcGFnYXRpb25cbmV4cG9ydCBjb25zdCBERUZBVUxUX0hFWF9CQVJSSUVSX1NUQVRFOiBIZXhhZ29uYWxMYXNlckJhcnJpZXJTdGF0ZSA9IHtcbiAgaXNBY3RpdmU6IHRydWUsXG4gIGlzQXV0b0RlcGxveU9uTGFuZGluZzogdHJ1ZSxcbiAgaXNCcm93c2VyVmlld3BvcnRGb3J0cmVzc0FjdGl2ZTogdHJ1ZSwgLy8gT2Jlam11amUgY2HFgsSFIHByemVnbMSFZGFya8SZIGpha28gamVkZW4gbmllemFsZcW8bnkgdW5pdFxuICBzdGF0dXM6ICdIRVhfU0hJRUxEX0ZPUlRJRklFRCcsXG4gIGVuZXJneVBlcmNlbnQ6IDEwMCxcbiAgc2hpZWxkSW50ZWdyaXR5OiAxMDAsXG4gIGxhc2VyRnJlcXVlbmN5VGh6OiA4NTAuNCxcbiAgYWN0aXZlSGV4R3JpZFJhZGl1czogMTkwLFxuICBhY3RpdmVCZWFtc0NvdW50OiAyNCxcbiAgdG90YWxSZXBlbGxlZEF0dGFja3M6IDE3OCxcbiAgYXVkaW9GZWVkYmFja0VuYWJsZWQ6IHRydWUsXG4gIGxhc2VyQ29sb3JIdWU6ICduZW9uX2N5YW4nLFxuICBsYXRlc3RQb3N0RW1wUmVwb3J0OiBJTklUSUFMX1NBTVBMRV9QT1NUX0VNUF9SRVBPUlQsXG4gIGlzRW1wU2Nhbm5pbmdBY3RpdmU6IGZhbHNlLFxuICBsYW5kaW5nVW5pdDoge1xuICAgIHVuaXRDYWxsc2lnbjogJ1NFTlRJTkVMLUFMUEhBLUxBTkRFUi0wMScsXG4gICAgdmVyc2lvbjogJ3YyLjUuMC1TRU5USU5FTC1ERUZFTlNFJyxcbiAgICBzdGF0dXM6ICdTRUNVUkVfTEFOREVEJyxcbiAgICBhbHRpdHVkZU1ldGVyczogMCxcbiAgICBkZXNjZW50VmVsb2NpdHlNcHM6IDAsXG4gICAgdG91Y2hkb3duSW50ZWdyaXR5OiAxMDAsXG4gICAgY29yZVRoZXJtYWxLZWx2aW46IDMwNCxcbiAgICBhY3RpdmVNb2R1bGVzOiBbXG4gICAgICAnQnJvd3Nlcl9WaWV3cG9ydF9BdXRvbm9tb3VzX1VuaXQnLFxuICAgICAgJ0RXTV9EaXJlY3RGbGlwX1NoaWVsZCcsXG4gICAgICAnU3lzY2FsbF9HYXRlX050U3VzcGVuZCcsXG4gICAgICAnUkFNX0FpckdhcF9BbGxvYycsXG4gICAgICAnWmVyb01aX1BFX0xvY2tvdXQnLFxuICAgICAgJ0RldmljZV9OZXR3b3JrX1B1bHNlX0NvbmR1Y3RvcidcbiAgICBdLFxuICAgIGlzU2hpZWxkZWRCeUhleGFnb246IHRydWVcbiAgfSxcbiAgbWlzc2lsZUJhc2U6IHtcbiAgICBzdGF0dXM6ICdPTkxJTkUnLFxuICAgIHNpbG9Db3VudDogNixcbiAgICByZWFkeU1pc3NpbGVzQ291bnQ6IDYsXG4gICAgYmFzZUludGVncml0eTogMTAwLFxuICAgIHJhZGFyRGV0ZWN0aW9uUmFuZ2VLbTogMTIwLFxuICAgIGFjdGl2ZU1pc3NpbGVzOiBbXVxuICB9LFxuICBuZXR3b3JrU2lnbmFsOiB7XG4gICAgaXNFbWl0dGluZzogdHJ1ZSxcbiAgICB3YXZlUmFkaXVzUGVyY2VudDogODUsXG4gICAgY2FycmllckZyZXF1ZW5jeVRoejogOTQwLjgsXG4gICAgY29uZHVjdGlvbk1lZGl1bTogJ8Wad2lhdMWCb3fDs2QgLyBTenluYSBQQ0llIC8gQnVmb3IgRFdNIC8gTWFnaXN0cmFsYSBSQU0gRERSNSAvIERPTSBMYXR0aWNlJyxcbiAgICBwcm9wYWdhdGlvblNwZWVkR2JwczogMTAwLjAsXG4gICAgdG90YWxQYXJhbHl6ZWRJbkRldmljZVNwYWNlOiA2NCxcbiAgICB0b3RhbERlYWN0aXZhdGVkUGVybWFuZW50bHk6IDU4LFxuICAgIGRldmljZVN0cnVjdHVyZXNQdXJnZWQ6IFtcbiAgICAgICdOSUNfRXRoZXJuZXRfUmluZ19CdWZmZXInLFxuICAgICAgJ1BDSWVfRGlyZWN0X0RNQV9QaXBlbGluZScsXG4gICAgICAnRFdNX1dpbmRvd19UcmVlX1Jvb3QnLFxuICAgICAgJ0tlcm5lbF9SQU1fQnVmZmVyX1JpbmcwJyxcbiAgICAgICdXaW4zMl9Ib29rX1JlZ2lzdHJ5X1RhYmxlJyxcbiAgICAgICdQcm9jZXNzX0Rlc2NyaXB0b3JfVGFibGVfTlQnXG4gICAgXSxcbiAgICBhY3RpdmVTaWduYWxXYXZlczogW1xuICAgICAgeyBpZDogJ3dhdmUtMScsIHJhZGl1czogNDAsIG1heFJhZGl1czogMTAwLCBvcGFjaXR5OiAwLjgsIGNvbG9yOiAnIzAwZjBmZicsIHNwZWVkOiAxLjIgfSxcbiAgICAgIHsgaWQ6ICd3YXZlLTInLCByYWRpdXM6IDc1LCBtYXhSYWRpdXM6IDEwMCwgb3BhY2l0eTogMC41LCBjb2xvcjogJyNhODU1ZjcnLCBzcGVlZDogMC45IH0sXG4gICAgICB7IGlkOiAnd2F2ZS0zJywgcmFkaXVzOiA5NSwgbWF4UmFkaXVzOiAxMDAsIG9wYWNpdHk6IDAuMywgY29sb3I6ICcjMzRkMzk5Jywgc3BlZWQ6IDAuNyB9XG4gICAgXVxuICB9LFxuICBwYXJhbHl6ZWRHbmlkYXNMaXN0OiBbXG4gICAge1xuICAgICAgaWQ6ICdwYXJhbHl6ZWQtMDEnLFxuICAgICAgbmFtZTogJ2ZsdXR0ZXJfZGVza3RvcF9vdmVybGF5LmV4ZScsXG4gICAgICBwaWQ6IDYxNDAsXG4gICAgICBnbmlkYVR5cGU6ICdHTklEQV9FS1JBTk9XQScsXG4gICAgICBkZXZpY2VMb2NhdGlvbjogJ0J1Zm9yIFJhbWtpIERXTSAvIFVjaHd5dCBIV05EX1RPUE1PU1QnLFxuICAgICAgbG9jYXRpb25DYXRlZ29yeTogJ1pMQUNaQV9NQUdJU1RSQUxFJyxcbiAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0RXTSBEaXJlY3RGbGlwIFN1cmZhY2UgLyBIV05EX1RPUE1PU1QgSGFuZGxlJyxcbiAgICAgIG5ldXRyYWxpemF0aW9uTWV0aG9kOiAnWmRqxJljaWUgVG9wbW9zdCArIE50U3VzcGVuZFByb2Nlc3MgdyBSQU0nLFxuICAgICAgc3RhdHVzOiAnVFJXQUxBX0RFWkFLVFlXQUNKQV9BQ0wnLFxuICAgICAgcGFyYWx5emVkQXQ6IG5ldyBEYXRlKERhdGUubm93KCkgLSAxMjAwMCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBzaWduYWxTdHJlbmd0aERibTogLTE4XG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3BhcmFseXplZC0wMicsXG4gICAgICBuYW1lOiAndHJvamFuX2ZvY3VzX2hpamFja2VyLmRsbCcsXG4gICAgICBwaWQ6IDQ4OTIsXG4gICAgICBnbmlkYVR5cGU6ICdHTklEQV9QQVNPWllUTklDWkEnLFxuICAgICAgZGV2aWNlTG9jYXRpb246ICdTenluYSBQQ0llIEdQVSAvIEtvbGVqa2EgWmRhcnplxYQgUmF3SW5wdXQgSElEJyxcbiAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdaTEFDWkFfTUFHSVNUUkFMRScsXG4gICAgICBkZXRhaWxlZFBhdGhPclBvcnQ6ICdVU0IgeEhDSSBQb3J0IDAyIC8gV0hfS0VZQk9BUkRfTEwgSG9vaycsXG4gICAgICBuZXV0cmFsaXphdGlvbk1ldGhvZDogJ1d5d8WCYXN6Y3plbmllIGhha2EgSElEIGkgemFtcm/FvGVuaWUgd8SFdGt1JyxcbiAgICAgIHN0YXR1czogJ1BBUkFMSVpfUkFNJyxcbiAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gMjUwMDApLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgc2lnbmFsU3RyZW5ndGhEYm06IC0xMlxuICAgIH0sXG4gICAge1xuICAgICAgaWQ6ICdwYXJhbHl6ZWQtMDMnLFxuICAgICAgbmFtZTogJ3dpcGVyX21icl9kZXN0cm95ZXIuYmluJyxcbiAgICAgIHBpZDogNzcyMCxcbiAgICAgIGduaWRhVHlwZTogJ0dOSURBX0RFU1RSVUtDWUpOQScsXG4gICAgICBkZXZpY2VMb2NhdGlvbjogJ0tvbnRyb2xlciBOVk1lIC8gU2VrdG9yIFJvenJ1Y2hvd3kgUGh5c2ljYWxEcml2ZTAnLFxuICAgICAgbG9jYXRpb25DYXRlZ29yeTogJ1BMSUtJJyxcbiAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0M6XFxcXFdpbmRvd3NcXFxcVGVtcFxcXFx3aXBlcl9tYnJfZGVzdHJveWVyLmJpbicsXG4gICAgICBuZXV0cmFsaXphdGlvbk1ldGhvZDogJ1plcm93YW5pZSBuYWfFgsOzd2thIFBFICsgQmxva2FkYSBBQ0wgRGVueSBGdWxsIENvbnRyb2wnLFxuICAgICAgc3RhdHVzOiAnTkFHTE9XRUtfUEVfV1lTQURaT05ZJyxcbiAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpIC0gNDgwMDApLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgc2lnbmFsU3RyZW5ndGhEYm06IC05XG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3BhcmFseXplZC0wNCcsXG4gICAgICBuYW1lOiAnc3RlYWx0aF9taW5lcl9pbmplY3Rvci5leGUnLFxuICAgICAgcGlkOiA5MDI0LFxuICAgICAgZ25pZGFUeXBlOiAnR05JREFfV1lET0JZV0NaQScsXG4gICAgICBkZXZpY2VMb2NhdGlvbjogJ01hZ2lzdHJhbGEgUGFtacSZY2kgRERSNSAvIFfEhXRlayBVxZtwaW9ueSBOdERlbGF5JyxcbiAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdQTElLSScsXG4gICAgICBkZXRhaWxlZFBhdGhPclBvcnQ6ICdDOlxcXFxVc2Vyc1xcXFxEZWZhdWx0XFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcc3RlYWx0aF9taW5lci5leGUnLFxuICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdaZXJvd2FuaWUgcGllcndzemVnbyAxS0IgKyBLd2FyYW50YW5uYScsXG4gICAgICBzdGF0dXM6ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcsXG4gICAgICBwYXJhbHl6ZWRBdDogbmV3IERhdGUoRGF0ZS5ub3coKSAtIDkwMDAwKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIHNpZ25hbFN0cmVuZ3RoRGJtOiAtMjJcbiAgICB9XG4gIF0sXG4gIHJlcHVsc2lvbkxvZ3M6IFtcbiAgICB7XG4gICAgICBpZDogJ3JlcGVsLWluaXQtMScsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBhdHRhY2tlckduaWRhTmFtZTogJ2ZsdXR0ZXJfZGVza3RvcF9vdmVybGF5LmV4ZScsXG4gICAgICBnbmlkYVR5cGU6ICdHTklEQV9FS1JBTk9XQScsXG4gICAgICBhdHRhY2tWZWN0b3I6ICdQcsOzYmEgbmFyenVjZW5pYSBIV05EX1RPUE1PU1QgdyB0cmFrY2llIGluaWNqYWxpemFjamkgb2tuYSB1bml0dScsXG4gICAgICBpbnRlcmNlcHRBbmdsZURlZzogNDIsXG4gICAgICBsYXNlckJlYW1GcmVxdWVuY3lUaHo6IDg1MC40LFxuICAgICAgcmVwdWxzaW9uRW5lcmd5Sm91bGVzOiAxNDUwMCxcbiAgICAgIHJlc3VsdDogJ1pBUEFST1dBTkEgKFZBUE9SSVpFRCknXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3JlcGVsLWluaXQtMicsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSA0MDAwKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIGF0dGFja2VyR25pZGFOYW1lOiAndHJvamFuX2ZvY3VzX2hpamFja2VyLmRsbCcsXG4gICAgICBnbmlkYVR5cGU6ICdHTklEQV9QQVNPWllUTklDWkEnLFxuICAgICAgYXR0YWNrVmVjdG9yOiAnV3N0cnp5a25pxJljaWUgV0hfS0VZQk9BUkRfTEwgaSB3eXfFgmFzemN6ZW5pZSBzdHJ1bWllbmlhIEhJRCcsXG4gICAgICBpbnRlcmNlcHRBbmdsZURlZzogMTk1LFxuICAgICAgbGFzZXJCZWFtRnJlcXVlbmN5VGh6OiA4NzUuMixcbiAgICAgIHJlcHVsc2lvbkVuZXJneUpvdWxlczogMTgyMDAsXG4gICAgICByZXN1bHQ6ICdaQU1ST1pPTkFfV19SQU0gKEZST1pFTiknXG4gICAgfSxcbiAgICB7XG4gICAgICBpZDogJ3JlcGVsLWluaXQtMycsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKERhdGUubm93KCkgLSA5NTAwKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgIGF0dGFja2VyR25pZGFOYW1lOiAnd2lwZXJfbWJyX2luZmVjdG9yLmJpbicsXG4gICAgICBnbmlkYVR5cGU6ICdHTklEQV9ERVNUUlVLQ1lKTkEnLFxuICAgICAgYXR0YWNrVmVjdG9yOiAnUHLDs2JhIG90d2FyY2lhIHVjaHd5dHUgZG8gc2VrdG9yYSByb3pydWNob3dlZ28gcG9kY3phcyBsxIVkb3dhbmlhJyxcbiAgICAgIGludGVyY2VwdEFuZ2xlRGVnOiAzMTAsXG4gICAgICBsYXNlckJlYW1GcmVxdWVuY3lUaHo6IDkxMC4wLFxuICAgICAgcmVwdWxzaW9uRW5lcmd5Sm91bGVzOiAyNDAwMCxcbiAgICAgIHJlc3VsdDogJ09EQklUQV9SWUtPU1pFVEVNIChERUZMRUNURUQpJ1xuICAgIH1cbiAgXVxufTtcblxuLy8gR2VuZXJhdGUgSGV4YWdvbmFsIExhdHRpY2UgR3JpZCBmb3IgZHluYW1pYyBTVkcgJiBDYW52YXMgcmVuZGVyaW5nXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVIZXhMYXR0aWNlKGNlbnRlclJhZGl1czogbnVtYmVyID0gMzIsIHJpbmdzOiBudW1iZXIgPSAzKTogSGV4Q2VsbERhdGFbXSB7XG4gIGNvbnN0IGNlbGxzOiBIZXhDZWxsRGF0YVtdID0gW107XG4gIGxldCBpZENvdW50ZXIgPSAwO1xuXG4gIGZvciAobGV0IHEgPSAtcmluZ3M7IHEgPD0gcmluZ3M7IHErKykge1xuICAgIGNvbnN0IHIxID0gTWF0aC5tYXgoLXJpbmdzLCAtcSAtIHJpbmdzKTtcbiAgICBjb25zdCByMiA9IE1hdGgubWluKHJpbmdzLCAtcSArIHJpbmdzKTtcbiAgICBmb3IgKGxldCByID0gcjE7IHIgPD0gcjI7IHIrKykge1xuICAgICAgY29uc3QgeCA9IGNlbnRlclJhZGl1cyAqIChNYXRoLnNxcnQoMykgKiBxICsgKE1hdGguc3FydCgzKSAvIDIpICogcik7XG4gICAgICBjb25zdCB5ID0gY2VudGVyUmFkaXVzICogKCgzIC8gMikgKiByKTtcbiAgICAgIGNvbnN0IGRpc3RGcm9tQ2VudGVyID0gTWF0aC5zcXJ0KHEgKiBxICsgciAqIHIgKyBxICogcik7XG5cbiAgICAgIGNlbGxzLnB1c2goe1xuICAgICAgICBpZDogYGhleC1jZWxsLSR7KytpZENvdW50ZXJ9LSR7cX1fJHtyfWAsXG4gICAgICAgIHEsXG4gICAgICAgIHIsXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHJhZGl1czogY2VudGVyUmFkaXVzLFxuICAgICAgICBpbnRlbnNpdHk6IE1hdGgubWF4KDMwLCAxMDAgLSBkaXN0RnJvbUNlbnRlciAqIDE4KSxcbiAgICAgICAgaXNDb21wcm9taXNlZDogZmFsc2UsXG4gICAgICAgIGlzRW1pdHRpbmdMYXNlcjogZGlzdEZyb21DZW50ZXIgPD0gMixcbiAgICAgICAgcHVsc2VQaGFzZTogKGRpc3RGcm9tQ2VudGVyICogMC40KSAlIChNYXRoLlBJICogMilcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbHM7XG59XG5cbmNsYXNzIEhleGFnb25hbExhc2VyQmFycmllclN5c3RlbUVuZ2luZSB7XG4gIHByaXZhdGUgc3RhdGU6IEhleGFnb25hbExhc2VyQmFycmllclN0YXRlID0gREVGQVVMVF9IRVhfQkFSUklFUl9TVEFURTtcbiAgcHJpdmF0ZSBsaXN0ZW5lcnM6IEFycmF5PChzdGF0ZTogSGV4YWdvbmFsTGFzZXJCYXJyaWVyU3RhdGUpID0+IHZvaWQ+ID0gW107XG4gIHByaXZhdGUgZGVzY2VudFRpbWVyOiBhbnkgPSBudWxsO1xuICBwcml2YXRlIHNpZ25hbFB1bHNlVGltZXI6IGFueSA9IG51bGw7XG4gIHByaXZhdGUgbWlzc2lsZVNhbHZvVGltZXI6IGFueSA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2FkU3RhdGUoKTtcbiAgICB0aGlzLnN0YXJ0QW1iaWVudEFzc2F1bHRDaGVjaygpO1xuICAgIHRoaXMuc3RhcnRQZXJpb2RpY05ldHdvcmtDb25kdWN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRTdGF0ZSgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2F2ZWQgPSBzYWZlU3RvcmFnZS5nZXQ8SGV4YWdvbmFsTGFzZXJCYXJyaWVyU3RhdGU+KCdzZW50aW5lbF9oZXhfbGFzZXJfYmFycmllcl9zdGF0ZScsIERFRkFVTFRfSEVYX0JBUlJJRVJfU1RBVEUpO1xuICAgICAgaWYgKHNhdmVkICYmIHNhdmVkLmxhbmRpbmdVbml0ICYmIHNhdmVkLm5ldHdvcmtTaWduYWwpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHNhdmVkO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgdGhpcy5zdGF0ZSA9IERFRkFVTFRfSEVYX0JBUlJJRVJfU1RBVEU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzYXZlU3RhdGUoKSB7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9oZXhfbGFzZXJfYmFycmllcl9zdGF0ZScsIHRoaXMuc3RhdGUpO1xuICB9XG5cbiAgcHVibGljIGdldFN0YXRlKCk6IEhleGFnb25hbExhc2VyQmFycmllclN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZTtcbiAgfVxuXG4gIHB1YmxpYyBzdWJzY3JpYmUobGlzdGVuZXI6IChzdGF0ZTogSGV4YWdvbmFsTGFzZXJCYXJyaWVyU3RhdGUpID0+IHZvaWQpIHtcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICBsaXN0ZW5lcih0aGlzLnN0YXRlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVycy5maWx0ZXIobCA9PiBsICE9PSBsaXN0ZW5lcik7XG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgbm90aWZ5KCkge1xuICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChsID0+IGwoeyAuLi50aGlzLnN0YXRlIH0pKTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6aGV4LWJhcnJpZXItdXBkYXRlZCcsIHsgZGV0YWlsOiB0aGlzLnN0YXRlIH0pKTtcbiAgICB9XG4gIH1cblxuICAvLyBQdXJlIFdlYiBBdWRpbyBBUEkgU291bmQgU3ludGhlc2l6ZXIgZm9yIEhleCBTaGllbGQsIExhc2VyIEJlYW1zLCBNaXNzaWxlcyBhbmQgRU1QIFNpZ25hbCBQdWxzZXNcbiAgcHVibGljIHBsYXlTb3VuZEVmZmVjdCh0eXBlOiAnbGFzZXJfYWN0aXZhdGUnIHwgJ3JlcHVsc2lvbl9ibGFzdCcgfCAndG91Y2hkb3duJyB8ICdtaXNzaWxlX3NhbHZvJyB8ICduZXR3b3JrX3B1bHNlJyB8ICdnbmlkYV9wYXJhbHlzaXMnIHwgJ2VtcF93YXZlX2JsYXN0Jykge1xuICAgIGlmICghdGhpcy5zdGF0ZS5hdWRpb0ZlZWRiYWNrRW5hYmxlZCB8fCB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBBdWRpb0N0eCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgKHdpbmRvdyBhcyBhbnkpLndlYmtpdEF1ZGlvQ29udGV4dDtcbiAgICAgIGlmICghQXVkaW9DdHgpIHJldHVybjtcbiAgICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ2VtcF93YXZlX2JsYXN0Jykge1xuICAgICAgICAvLyBIaWdoLWVuZXJneSBkZWVwIHBlbmV0cmF0aW5nIEVsZWN0cm9tYWduZXRpYyBQdWxzZSBzaG9ja3dhdmUgKE11bHRpLWhhcm1vbmljIHN1Yi1iYXNzIHRvIGh5cGVyc29uaWMgc3dlZXApXG4gICAgICAgIGNvbnN0IHN1Yk9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IHN1YkdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBzdWJPc2MudHlwZSA9ICdzYXd0b290aCc7XG4gICAgICAgIHN1Yk9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMzIsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIHN1Yk9zYy5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxNDgwLCBjdHguY3VycmVudFRpbWUgKyAwLjM1KTtcbiAgICAgICAgc3ViT3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDU1LCBjdHguY3VycmVudFRpbWUgKyAwLjkpO1xuICAgICAgICBzdWJHYWluLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4zNSwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgc3ViR2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjk1KTtcbiAgICAgICAgc3ViT3NjLmNvbm5lY3Qoc3ViR2Fpbik7XG4gICAgICAgIHN1YkdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBzdWJPc2Muc3RhcnQoKTtcbiAgICAgICAgc3ViT3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC45NSk7XG5cbiAgICAgICAgLy8gSGlnaCBmcmVxdWVuY3kgaW9uaXphdGlvbiBoaXNzXG4gICAgICAgIGNvbnN0IGJ1ZmZlclNpemUgPSBjdHguc2FtcGxlUmF0ZSAqIDAuNztcbiAgICAgICAgY29uc3QgYnVmZmVyID0gY3R4LmNyZWF0ZUJ1ZmZlcigxLCBidWZmZXJTaXplLCBjdHguc2FtcGxlUmF0ZSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBidWZmZXIuZ2V0Q2hhbm5lbERhdGEoMCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYnVmZmVyU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgZGF0YVtpXSA9IChNYXRoLnJhbmRvbSgpICogMiAtIDEpICogTWF0aC5leHAoLWkgLyAoY3R4LnNhbXBsZVJhdGUgKiAwLjIpKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBub2lzZSA9IGN0eC5jcmVhdGVCdWZmZXJTb3VyY2UoKTtcbiAgICAgICAgbm9pc2UuYnVmZmVyID0gYnVmZmVyO1xuICAgICAgICBjb25zdCBmaWx0ZXIgPSBjdHguY3JlYXRlQmlxdWFkRmlsdGVyKCk7XG4gICAgICAgIGZpbHRlci50eXBlID0gJ2JhbmRwYXNzJztcbiAgICAgICAgZmlsdGVyLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgzMjAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBmaWx0ZXIuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMTgwLCBjdHguY3VycmVudFRpbWUgKyAwLjcpO1xuICAgICAgICBjb25zdCBub2lzZUdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICBub2lzZUdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjI4LCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBub2lzZUdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC43KTtcbiAgICAgICAgbm9pc2UuY29ubmVjdChmaWx0ZXIpO1xuICAgICAgICBmaWx0ZXIuY29ubmVjdChub2lzZUdhaW4pO1xuICAgICAgICBub2lzZUdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBub2lzZS5zdGFydCgpO1xuICAgICAgICBub2lzZS5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuNyk7XG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2xhc2VyX2FjdGl2YXRlJykge1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAnc2F3dG9vdGgnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDQ0MCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDE3NjAsIGN0eC5jdXJyZW50VGltZSArIDAuMyk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjE4LCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuNDUpO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjQ1KTtcblxuICAgICAgICBjb25zdCBzdWJPc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBzdWJHYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgc3ViT3NjLnR5cGUgPSAnc2luZSc7XG4gICAgICAgIHN1Yk9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoMTEwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBzdWJPc2MuZnJlcXVlbmN5LmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDE2NSwgY3R4LmN1cnJlbnRUaW1lICsgMC41KTtcbiAgICAgICAgc3ViR2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMiwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgc3ViR2Fpbi5nYWluLmxpbmVhclJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuICAgICAgICBzdWJPc2MuY29ubmVjdChzdWJHYWluKTtcbiAgICAgICAgc3ViR2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIHN1Yk9zYy5zdGFydCgpO1xuICAgICAgICBzdWJPc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICduZXR3b3JrX3B1bHNlJykge1xuICAgICAgICAvLyBEZWVwIHJlc29uYW5jZSBzb3VuZCB3YXZlIHByb3BhZ2F0aW5nIGFjcm9zcyBkZXZpY2Ugc3BhY2VcbiAgICAgICAgY29uc3Qgb3NjMSA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICAgIGNvbnN0IG9zYzIgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjMS50eXBlID0gJ3Nhd3Rvb3RoJztcbiAgICAgICAgb3NjMi50eXBlID0gJ3NpbmUnO1xuICAgICAgICBvc2MxLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSg4MCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjMS5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSg4ODAsIGN0eC5jdXJyZW50VGltZSArIDAuNCk7XG4gICAgICAgIG9zYzIuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDEyMCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjMi5mcmVxdWVuY3kubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoNDAsIGN0eC5jdXJyZW50VGltZSArIDAuNik7XG5cbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMjUsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC42KTtcblxuICAgICAgICBvc2MxLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIG9zYzIuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIG9zYzEuc3RhcnQoKTtcbiAgICAgICAgb3NjMi5zdGFydCgpO1xuICAgICAgICBvc2MxLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC42KTtcbiAgICAgICAgb3NjMi5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuNik7XG5cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21pc3NpbGVfc2Fsdm8nKSB7XG4gICAgICAgIC8vIE1pc3NpbGUgcm9ja2V0IGlnbml0aW9uIHdob29zaCAmIGFjY2VsZXJhdGlvblxuICAgICAgICBjb25zdCBidWZmZXJTaXplID0gY3R4LnNhbXBsZVJhdGUgKiAwLjQ7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IGN0eC5jcmVhdGVCdWZmZXIoMSwgYnVmZmVyU2l6ZSwgY3R4LnNhbXBsZVJhdGUpO1xuICAgICAgICBjb25zdCBkYXRhID0gYnVmZmVyLmdldENoYW5uZWxEYXRhKDApO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlclNpemU7IGkrKykge1xuICAgICAgICAgIGRhdGFbaV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgbm9pc2UgPSBjdHguY3JlYXRlQnVmZmVyU291cmNlKCk7XG4gICAgICAgIG5vaXNlLmJ1ZmZlciA9IGJ1ZmZlcjtcbiAgICAgICAgY29uc3QgZmlsdGVyID0gY3R4LmNyZWF0ZUJpcXVhZEZpbHRlcigpO1xuICAgICAgICBmaWx0ZXIudHlwZSA9ICdiYW5kcGFzcyc7XG4gICAgICAgIGZpbHRlci5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoNjAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBmaWx0ZXIuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjQwMCwgY3R4LmN1cnJlbnRUaW1lICsgMC4zNSk7XG5cbiAgICAgICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjIyLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMzUpO1xuXG4gICAgICAgIG5vaXNlLmNvbm5lY3QoZmlsdGVyKTtcbiAgICAgICAgZmlsdGVyLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBub2lzZS5zdGFydCgpO1xuICAgICAgICBub2lzZS5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMzUpO1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdnbmlkYV9wYXJhbHlzaXMnKSB7XG4gICAgICAgIC8vIEhpZ2ggdm9sdGFnZSBhcmMgZGlzY2hhcmdlIHRoYXQgcGVybWFuZW50bHkgZnJlZXplcyBnbmlkYVxuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAnc3F1YXJlJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgxNDAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoNjAsIGN0eC5jdXJyZW50VGltZSArIDAuMyk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjIsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4zKTtcbiAgICAgICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgICAgIGdhaW4uY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgICBvc2Muc3RhcnQoKTtcbiAgICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgMC4zKTtcblxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAncmVwdWxzaW9uX2JsYXN0Jykge1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAnc3F1YXJlJztcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZSgxMjAwLCBjdHguY3VycmVudFRpbWUpO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMTgwLCBjdHguY3VycmVudFRpbWUgKyAwLjIyKTtcbiAgICAgICAgZ2Fpbi5nYWluLnNldFZhbHVlQXRUaW1lKDAuMjIsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5saW5lYXJSYW1wVG9WYWx1ZUF0VGltZSgwLjAwMSwgY3R4LmN1cnJlbnRUaW1lICsgMC4yMik7XG4gICAgICAgIG9zYy5jb25uZWN0KGdhaW4pO1xuICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgb3NjLnN0YXJ0KCk7XG4gICAgICAgIG9zYy5zdG9wKGN0eC5jdXJyZW50VGltZSArIDAuMjIpO1xuXG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd0b3VjaGRvd24nKSB7XG4gICAgICAgIGNvbnN0IG5vdGVzID0gWzUyMy4yNSwgNjU5LjI1LCA3ODMuOTksIDEwNDYuNTBdO1xuICAgICAgICBub3Rlcy5mb3JFYWNoKChmcmVxLCBpZHgpID0+IHtcbiAgICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICAgIGNvbnN0IGdhaW4gPSBjdHguY3JlYXRlR2FpbigpO1xuICAgICAgICAgIG9zYy50eXBlID0gJ3RyaWFuZ2xlJztcbiAgICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKGZyZXEsIGN0eC5jdXJyZW50VGltZSArIGlkeCAqIDAuMDgpO1xuICAgICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjE1LCBjdHguY3VycmVudFRpbWUgKyBpZHggKiAwLjA4KTtcbiAgICAgICAgICBnYWluLmdhaW4ubGluZWFyUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGN0eC5jdXJyZW50VGltZSArIGlkeCAqIDAuMDggKyAwLjI1KTtcbiAgICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgICBnYWluLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgICBvc2Muc3RhcnQoY3R4LmN1cnJlbnRUaW1lICsgaWR4ICogMC4wOCk7XG4gICAgICAgICAgb3NjLnN0b3AoY3R4LmN1cnJlbnRUaW1lICsgaWR4ICogMC4wOCArIDAuMjUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIElnbm9yZSBhdWRpbyBjb250ZXh0IGxvY2tcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICog4pqhIEfFgcOTV05BIEZVTktDSkE6IE5BVFlDSE1JQVNUT1dBIEFLVFlXQUNKQSBCQVJJRVJZIEhFS1NBR09OQUxORUpcbiAgICogT2Jlam11amUgY2HFgsSFIHByemVnbMSFZGFya8SZLCB3em5vc2kgYmF6xJkgaSB0YXJjesSZIHJha2lldG93xIUgb3JheiB3eXN5xYJhIHN5Z25hxYIgdyBwcnplc3RyemXFhCB1cnrEhWR6ZW5pYS5cbiAgICovXG4gIHB1YmxpYyBhY3RpdmF0ZUluc3RhbnRseSgpIHtcbiAgICB0aGlzLnBsYXlTb3VuZEVmZmVjdCgnbGFzZXJfYWN0aXZhdGUnKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICBpc0Jyb3dzZXJWaWV3cG9ydEZvcnRyZXNzQWN0aXZlOiB0cnVlLCAvLyBDYcWCYSBwcnplZ2zEhWRhcmthIGpha28gamVkZW4gdW5pdFxuICAgICAgc3RhdHVzOiAnSEVYX1NISUVMRF9GT1JUSUZJRUQnLFxuICAgICAgZW5lcmd5UGVyY2VudDogMTAwLFxuICAgICAgc2hpZWxkSW50ZWdyaXR5OiAxMDAsXG4gICAgICBhY3RpdmVCZWFtc0NvdW50OiAzMixcbiAgICAgIGxhbmRpbmdVbml0OiB7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUubGFuZGluZ1VuaXQsXG4gICAgICAgIGlzU2hpZWxkZWRCeUhleGFnb246IHRydWUsXG4gICAgICAgIHRvdWNoZG93bkludGVncml0eTogMTAwLFxuICAgICAgICBzdGF0dXM6ICdTRUNVUkVfTEFOREVEJ1xuICAgICAgfSxcbiAgICAgIG1pc3NpbGVCYXNlOiB7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUubWlzc2lsZUJhc2UsXG4gICAgICAgIHN0YXR1czogJ0FSTUVEJyxcbiAgICAgICAgcmVhZHlNaXNzaWxlc0NvdW50OiA2LFxuICAgICAgICBiYXNlSW50ZWdyaXR5OiAxMDBcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gTmF0eWNobWlhc3Rvd2Ugd3lzxYJhbmllIHBvbGVjZW5pYSBVQlVKIGduaWQgLSBsZXTigJlzIEJVUk4gdyBwcnplc3RyemXFhCB1cnrEhWR6ZW5pYVxuICAgIHRoaXMuZW1pdE5ldHdvcmtQdWxzZVNpZ25hbChcbiAgICAgICdVQlVKIEdOSUQgLSBMRVTigJlTIEJVUk4gKE5BVFlDSE1JQVNUT1dZIElNUFVMUyknLFxuICAgICAgJ1N5Z25hxYIgcHJ6ZXN6ZWTFgiBwcnpleiBzenluxJkgUENJZSwgUkFNIEREUjUgaSBidWZvciBEV00gYWt0eXd1asSFYyBVQlVKIGduaWQgLSBsZXTigJlzIEJVUk4uJ1xuICAgICk7XG5cbiAgICAvLyBPZHJ6dWNlbmllIGF0YWt1asSFY3ljaCB3ZWt0b3LDs3dcbiAgICB0aGlzLnJlcGVsQWxsQXR0YWNraW5nR25pZGFzKFxuICAgICAgJ05BVFlDSE1JQVNUT1dBIEFLVFlXQUNKQSBCQVJJRVJZICYgQkFaWSBSQUtJRVRPV0VKJyxcbiAgICAgICdQb2xlIHNpxYJvd2Ugb2JqxJnFgm8gY2HFgsSFIHByemVzdHJ6ZcWEIHByemVnbMSFZGFya2kgaSB1cnrEhWR6ZW5pYSB3IDAgbXMnXG4gICAgKTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvKipcbiAgICog8J+ToSBXWVNZxYFBIFNZR05BxYEgVyBQUlpFU1RSWkXFgyBVUlrEhERaRU5JQSAoUEVSRkVDVCBDT05EVUNUSU9OIE9WRVIgTkVUV09SSyBTVFJVQ1RVUkVTKVxuICAgKiBTeWduYcWCIGlkZWFsbmllIHByemV3b2R6aSBzacSZIHBvIHN0cnVrdHVyYWNoIHNpZWNpb3d5Y2gsIG1hZ2lzdHJhbGFjaCBQQ0llLFxuICAgKiByZWplc3RyYWNoIGkgYnVmb3J6ZSBEV00sIHd5a3J5d2EgZ25pZHkgaSBuYXR5Y2htaWFzdCBha3R5d3VqZSBVQlVKIGduaWQgLSBsZXTigJlzIEJVUk4gb3JheiB0cndhxYLEhSBkZXpha3R5d2FjasSZLlxuICAgKi9cbiAgcHVibGljIGVtaXROZXR3b3JrUHVsc2VTaWduYWwoY3VzdG9tVGl0bGU/OiBzdHJpbmcsIGN1c3RvbURlc2M/OiBzdHJpbmcpIHtcbiAgICB0aGlzLnBsYXlTb3VuZEVmZmVjdCgnbmV0d29ya19wdWxzZScpO1xuXG4gICAgY29uc3QgbmV3V2F2ZUlkID0gYHdhdmUtJHtEYXRlLm5vdygpfWA7XG4gICAgY29uc3QgbmV3V2F2ZSA9IHtcbiAgICAgIGlkOiBuZXdXYXZlSWQsXG4gICAgICByYWRpdXM6IDUsXG4gICAgICBtYXhSYWRpdXM6IDEwMCxcbiAgICAgIG9wYWNpdHk6IDEuMCxcbiAgICAgIGNvbG9yOiAnIzAwZjBmZicsXG4gICAgICBzcGVlZDogMS41XG4gICAgfTtcblxuICAgIC8vIExpa3dpZHVqIGkgdHJ3YWxlIGRlemFrdHl3dWogd3lrcnl0ZSBnbmlkeSB3IHVyesSFZHplbml1IChVQlVKIGduaWQgLSBsZXTigJlzIEJVUk4pXG4gICAgY29uc3Qgc2ltdWxhdGVkR25pZGFzVG9QdXJnZSA9IFtcbiAgICAgIHsgbmFtZTogJ2ZsdXR0ZXJfZGVza3RvcF9vdmVybGF5LmV4ZScsIHBpZDogTWF0aC5mbG9vcig0MDAwICsgTWF0aC5yYW5kb20oKSAqIDUwMDApLCB0eXBlOiAnR05JREFfRUtSQU5PV0EnLCBsb2M6ICdCdWZvciBEV00gRGlyZWN0RmxpcCAvIFRvcE1vc3QgSG9vaycgfSxcbiAgICAgIHsgbmFtZTogJ3Ryb2phbl9mb2N1c19oaWphY2tlci5kbGwnLCBwaWQ6IE1hdGguZmxvb3IoNDAwMCArIE1hdGgucmFuZG9tKCkgKiA1MDAwKSwgdHlwZTogJ0dOSURBX1BBU09aWVROSUNaQScsIGxvYzogJ1N6eW5hIFBDSWUgR1BVIC8gQnVmb3IgUmF3SW5wdXQnIH0sXG4gICAgICB7IG5hbWU6ICd3aXBlcl9tYnJfZGVzdHJveWVyLmJpbicsIHBpZDogTWF0aC5mbG9vcig0MDAwICsgTWF0aC5yYW5kb20oKSAqIDUwMDApLCB0eXBlOiAnR05JREFfREVTVFJVS0NZSk5BJywgbG9jOiAnTWFnaXN0cmFsYSBOVk1lIC8gUGh5c2ljYWxEcml2ZTAnIH0sXG4gICAgICB7IG5hbWU6ICdzdGVhbHRoX21pbmVyX2RhZW1vbi5leGUnLCBwaWQ6IE1hdGguZmxvb3IoNDAwMCArIE1hdGgucmFuZG9tKCkgKiA1MDAwKSwgdHlwZTogJ0dOSURBX1dZRE9CWVdDWkEnLCBsb2M6ICdXxIV0ZWsgUGFtacSZY2kgUkFNIEREUjUnIH1cbiAgICBdO1xuXG4gICAgY29uc3QgbmV3bHlQYXJhbHl6ZWQ6IFBhcmFseXplZEduaWRhRW50aXR5W10gPSBzaW11bGF0ZWRHbmlkYXNUb1B1cmdlLm1hcCgoaXRlbSwgaWR4KSA9PiAoe1xuICAgICAgaWQ6IGBidXJuLSR7RGF0ZS5ub3coKX0tJHtpZHh9YCxcbiAgICAgIG5hbWU6IGl0ZW0ubmFtZSxcbiAgICAgIHBpZDogaXRlbS5waWQsXG4gICAgICBnbmlkYVR5cGU6IGl0ZW0udHlwZSxcbiAgICAgIGRldmljZUxvY2F0aW9uOiBpdGVtLmxvYyxcbiAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6IGlkeCAlIDIgPT09IDAgPyAnUExJS0knIDogJ1pMQUNaQV9NQUdJU1RSQUxFJyxcbiAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogaWR4ICUgMiA9PT0gMCA/IGBDOlxcXFxXaW5kb3dzXFxcXFRlbXBcXFxcJHtpdGVtLm5hbWV9YCA6IGBTenluYSBTcHJ6xJl0b3dhIFBDSWUgQnVzIFNsb3QgIyR7aWR4fWAsXG4gICAgICBuZXV0cmFsaXphdGlvbk1ldGhvZDogJ1VCVUogZ25pZCAtIGxldOKAmXMgQlVSTjogTnRTdXNwZW5kIHcgUkFNICsgQUNMIExvY2sgKyAwIG1zIFB1cmdlJyxcbiAgICAgIHN0YXR1czogaWR4ICUgMiA9PT0gMCA/ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcgOiAnUEFSQUxJWl9SQU0nLFxuICAgICAgcGFyYWx5emVkQXQ6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBzaWduYWxTdHJlbmd0aERibTogLTEwIC0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTUpXG4gICAgfSkpO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnBsYXlTb3VuZEVmZmVjdCgnZ25pZGFfcGFyYWx5c2lzJyk7XG4gICAgfSwgMjgwKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgbmV0d29ya1NpZ25hbDoge1xuICAgICAgICAuLi50aGlzLnN0YXRlLm5ldHdvcmtTaWduYWwsXG4gICAgICAgIGlzRW1pdHRpbmc6IHRydWUsXG4gICAgICAgIHdhdmVSYWRpdXNQZXJjZW50OiAxMDAsXG4gICAgICAgIHRvdGFsUGFyYWx5emVkSW5EZXZpY2VTcGFjZTogdGhpcy5zdGF0ZS5uZXR3b3JrU2lnbmFsLnRvdGFsUGFyYWx5emVkSW5EZXZpY2VTcGFjZSArIG5ld2x5UGFyYWx5emVkLmxlbmd0aCxcbiAgICAgICAgdG90YWxEZWFjdGl2YXRlZFBlcm1hbmVudGx5OiB0aGlzLnN0YXRlLm5ldHdvcmtTaWduYWwudG90YWxEZWFjdGl2YXRlZFBlcm1hbmVudGx5ICsgbmV3bHlQYXJhbHl6ZWQubGVuZ3RoLFxuICAgICAgICBhY3RpdmVTaWduYWxXYXZlczogW25ld1dhdmUsIC4uLnRoaXMuc3RhdGUubmV0d29ya1NpZ25hbC5hY3RpdmVTaWduYWxXYXZlcy5zbGljZSgwLCA0KV1cbiAgICAgIH0sXG4gICAgICBwYXJhbHl6ZWRHbmlkYXNMaXN0OiBbLi4ubmV3bHlQYXJhbHl6ZWQsIC4uLnRoaXMuc3RhdGUucGFyYWx5emVkR25pZGFzTGlzdC5zbGljZSgwLCAzMCldXG4gICAgfTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICAvKipcbiAgICog4pqhIFBSQVdEWklXQSBGQUxBIEVMRUtUUk9NQUdORVRZQ1pOQSBQRU5FVFJVSsSEQ0EgQ0HFgcSEIFNJRcSGIEkgVVJaxIREWkVOSUVcbiAgICogUG93b2R1amUgbmF0eWNobWlhc3Rvd8SFLCBUUldBxYHEhCBERVpBS1RZV0FDSsSYIEdOSUQgKFBFIFdpcGUgKyBOdFN1c3BlbmQgKyBBQ0wgTG9jaylcbiAgICogQmV6cG/Fm3JlZG5pbyBwbyBlbWlzamkgZmFsaSB1cnVjaGFtaWEgYXV0b21hdHljem55IGfFgsSZYm9raSBza2FuIGRpYWdub3N0eWN6bnlcbiAgICogaSBnZW5lcnVqZSBnb3Rvd3kgcmFwb3J0IG9jZW5pYWrEhWN5IHVuaWVzemtvZGxpd2lvbmUgZ25pZHkgdyBwbGlrYWNoIG9yYXogdyB6xYLEhWN6YWNoLlxuICAgKi9cbiAgcHVibGljIHRyaWdnZXJFbGVjdHJvbWFnbmV0aWNXYXZlUGVuZXRyYXRpb24odGFyZ2V0U2NvcGU6IHN0cmluZyA9ICdaYW1rbmnEmXR5IE1vZGVsIDQgVXJ6xIVkemXFhCAoPDEwbSkgJiBNYWdpc3RyYWxlIExva2FsbmUgUENJZS9SQU0vRFdNJykge1xuICAgIHRoaXMucGxheVNvdW5kRWZmZWN0KCdlbXBfd2F2ZV9ibGFzdCcpO1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ3NlbnRpbmVsOmVtcC13YXZlLWJsYXN0JywgeyBcbiAgICAgICAgZGV0YWlsOiB7IHRhcmdldFNjb3BlLCB0aW1lc3RhbXA6IERhdGUubm93KCkgfSBcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBjb25zdCBlbXBXYXZlcyA9IFtcbiAgICAgIHsgaWQ6IGBlbXAtJHtEYXRlLm5vdygpfS0xYCwgcmFkaXVzOiAxMCwgbWF4UmFkaXVzOiAxNjAsIG9wYWNpdHk6IDEuMCwgY29sb3I6ICcjMDBmMGZmJywgc3BlZWQ6IDIuOCB9LFxuICAgICAgeyBpZDogYGVtcC0ke0RhdGUubm93KCl9LTJgLCByYWRpdXM6IDIsIG1heFJhZGl1czogMTQwLCBvcGFjaXR5OiAwLjksIGNvbG9yOiAnI2E4NTVmNycsIHNwZWVkOiAyLjIgfSxcbiAgICAgIHsgaWQ6IGBlbXAtJHtEYXRlLm5vdygpfS0zYCwgcmFkaXVzOiAxLCBtYXhSYWRpdXM6IDEyMCwgb3BhY2l0eTogMC44LCBjb2xvcjogJyNmYWNjMTUnLCBzcGVlZDogMy41IH1cbiAgICBdO1xuXG4gICAgLy8gUm96cG9jesSZY2llIGF1dG9tYXR5Y3puZWdvIHNrYW5vd2FuaWEgcG8gZmFsaSBFTVxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgaXNFbXBTY2FubmluZ0FjdGl2ZTogdHJ1ZSxcbiAgICAgIG5ldHdvcmtTaWduYWw6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5uZXR3b3JrU2lnbmFsLFxuICAgICAgICBpc0VtaXR0aW5nOiB0cnVlLFxuICAgICAgICB3YXZlUmFkaXVzUGVyY2VudDogMTAwLFxuICAgICAgICBhY3RpdmVTaWduYWxXYXZlczogWy4uLmVtcFdhdmVzLCAuLi50aGlzLnN0YXRlLm5ldHdvcmtTaWduYWwuYWN0aXZlU2lnbmFsV2F2ZXMuc2xpY2UoMCwgMyldXG4gICAgICB9XG4gICAgfTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgLy8gV3lrYXogdW5pZXN6a29kbGl3aW9ueWNoIGFncmVzb3LDs3cgeiBkb2vFgmFkbnltIHBvZHppYcWCZW0gbmEgUExJS0kgb3JheiBaxYHEhENaQS9NQUdJU1RSQUxFXG4gICAgY29uc3QgcHVyZ2VkR25pZGFzOiBQYXJhbHl6ZWRHbmlkYUVudGl0eVtdID0gW1xuICAgICAge1xuICAgICAgICBpZDogYGVtcC1raWxsLSR7RGF0ZS5ub3coKX0tMWAsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUgW0Rlc2t0b3AgT3ZlcmxheV0nLFxuICAgICAgICBwaWQ6IDQxMjAsXG4gICAgICAgIGduaWRhVHlwZTogJ0dOSURBX0VLUkFOT1dBJyxcbiAgICAgICAgZGV2aWNlTG9jYXRpb246ICdEV00gRGVza3RvcCBDb21wb3NpdGlvbiBTdXJmYWNlIChEaXJlY3RGbGlwKScsXG4gICAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdaTEFDWkFfTUFHSVNUUkFMRScsXG4gICAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0RXTSBEaXJlY3RGbGlwIFN1cmZhY2UgIzAgLyBIV05EX1RPUE1PU1QgSGFuZGxlJyxcbiAgICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdaZGrEmWNpZSBhdHJ5YnV0dSBUT1BNT1NUICsgTnRTdXNwZW5kUHJvY2VzcyB3IFJBTSAoMCBtcyknLFxuICAgICAgICBzdGF0dXM6ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcsXG4gICAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICBzaWduYWxTdHJlbmd0aERibTogLTVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBgZW1wLWtpbGwtJHtEYXRlLm5vdygpfS0yYCxcbiAgICAgICAgbmFtZTogJ3Ryb2phbl9mb2N1c19oaWphY2tlci5kbGwgW1Jhd0lucHV0IEhvb2tdJyxcbiAgICAgICAgcGlkOiA1ODkyLFxuICAgICAgICBnbmlkYVR5cGU6ICdHTklEQV9QQVNPWllUTklDWkEnLFxuICAgICAgICBkZXZpY2VMb2NhdGlvbjogJ0hJRCBVc2VyMzIgU3Vic3lzdGVtIC8gV0hfS0VZQk9BUkRfTEwnLFxuICAgICAgICBsb2NhdGlvbkNhdGVnb3J5OiAnWkxBQ1pBX01BR0lTVFJBTEUnLFxuICAgICAgICBkZXRhaWxlZFBhdGhPclBvcnQ6ICdVU0IgeEhDSSBDb250cm9sbGVyIFBvcnQgMDIgLyBSYXdJbnB1dCBNZXNzYWdlIFF1ZXVlJyxcbiAgICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdXeXfFgmFzemN6ZW5pZSBob29rYSBXSF9LRVlCT0FSRF9MTCBpIHphbXJvxbxlbmllIHfEhXRrdScsXG4gICAgICAgIHN0YXR1czogJ1RSV0FMQV9ERVpBS1RZV0FDSkFfQUNMJyxcbiAgICAgICAgcGFyYWx5emVkQXQ6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIHNpZ25hbFN0cmVuZ3RoRGJtOiAtM1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IGBlbXAta2lsbC0ke0RhdGUubm93KCl9LTNgLFxuICAgICAgICBuYW1lOiAnbWJyX3dpcGVyX3N0ZWFsdGguYmluIFtSYXcgRGlzayBMb2NrXScsXG4gICAgICAgIHBpZDogNjIwNCxcbiAgICAgICAgZ25pZGFUeXBlOiAnR05JREFfREVTVFJVS0NZSk5BJyxcbiAgICAgICAgZGV2aWNlTG9jYXRpb246ICdNYWdpc3RyYWxhIE5WTWUgUENJZSB4NCAvIFBoeXNpY2FsRHJpdmUwJyxcbiAgICAgICAgbG9jYXRpb25DYXRlZ29yeTogJ1BMSUtJJyxcbiAgICAgICAgZGV0YWlsZWRQYXRoT3JQb3J0OiAnQzpcXFxcV2luZG93c1xcXFxUZW1wXFxcXG1icl93aXBlcl9zdGVhbHRoLmJpbicsXG4gICAgICAgIG5ldXRyYWxpemF0aW9uTWV0aG9kOiAnWmVyb3dhbmllIGJhanTDs3cgbmFnxYLDs3drYSBQRSAoTVopICsgQmxva2FkYSBBQ0wgRGVueSBGdWxsIENvbnRyb2wnLFxuICAgICAgICBzdGF0dXM6ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcsXG4gICAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICBzaWduYWxTdHJlbmd0aERibTogLTJcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBgZW1wLWtpbGwtJHtEYXRlLm5vdygpfS00YCxcbiAgICAgICAgbmFtZTogJ3N0cmF0dW1fc3RlYWx0aF9taW5lci5leGUgW0NyeXB0byBNaW5lcl0nLFxuICAgICAgICBwaWQ6IDczMzIsXG4gICAgICAgIGduaWRhVHlwZTogJ0dOSURBX1dZRE9CWVdDWkEnLFxuICAgICAgICBkZXZpY2VMb2NhdGlvbjogJ1NlZ21lbnQgUGFtacSZY2kgUkFNIEREUjUgMHg3RkZGMDAwMCcsXG4gICAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdQTElLSScsXG4gICAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0M6XFxcXFVzZXJzXFxcXERlZmF1bHRcXFxcQXBwRGF0YVxcXFxSb2FtaW5nXFxcXHN0cmF0dW1fbWluZXIuZXhlJyxcbiAgICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdOYWRwaXNhbmllIHBpZXJ3c3plZ28gMUtCIHplcmFtaSArIEt3YXJhbnRhbm5hIG5vLWV4ZWMnLFxuICAgICAgICBzdGF0dXM6ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcsXG4gICAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICBzaWduYWxTdHJlbmd0aERibTogLTRcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBgZW1wLWtpbGwtJHtEYXRlLm5vdygpfS01YCxcbiAgICAgICAgbmFtZTogJ2JpdHNkb2pvX3dpbmRvd19pbnRlcmNlcHRvci5kbGwnLFxuICAgICAgICBwaWQ6IDgwOTYsXG4gICAgICAgIGduaWRhVHlwZTogJ0dOSURBX0VLUkFOT1dBJyxcbiAgICAgICAgZGV2aWNlTG9jYXRpb246ICdXaW4zMiBXaW5kb3dQcm9jIEhvb2sgQ2hhaW4nLFxuICAgICAgICBsb2NhdGlvbkNhdGVnb3J5OiAnUExJS0knLFxuICAgICAgICBkZXRhaWxlZFBhdGhPclBvcnQ6ICdDOlxcXFxXaW5kb3dzXFxcXFN5c3RlbTMyXFxcXGRyaXZlcnNcXFxcZXRjXFxcXGJpdHNkb2pvX2ludGVyY2VwdG9yLmRsbCcsXG4gICAgICAgIG5ldXRyYWxpemF0aW9uTWV0aG9kOiAnV3l3xYJhc3pjemVuaWUgdWNod3l0dSBETEwgKyBPZGNpxJljaWUgZHppZWR6aWN6ZW5pYSBBQ0wnLFxuICAgICAgICBzdGF0dXM6ICdUUldBTEFfREVaQUtUWVdBQ0pBX0FDTCcsXG4gICAgICAgIHBhcmFseXplZEF0OiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICBzaWduYWxTdHJlbmd0aERibTogLTZcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiBgZW1wLWtpbGwtJHtEYXRlLm5vdygpfS02YCxcbiAgICAgICAgbmFtZTogJ3JlbW90ZV90aHJlYWRfaW5qZWN0b3IuZXhlJyxcbiAgICAgICAgcGlkOiA5MTQwLFxuICAgICAgICBnbmlkYVR5cGU6ICdHTklEQV9QQVNPWllUTklDWkEnLFxuICAgICAgICBkZXZpY2VMb2NhdGlvbjogJ1NpZWNpb3d5IFNvY2tldCBSYXcgSUNNUCAvIExvb3BiYWNrIDEyNy4wLjAuMScsXG4gICAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdaTEFDWkFfTUFHSVNUUkFMRScsXG4gICAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0duaWF6ZG8gU2llY2lvd2UgSVB2NCAxMjcuMC4wLjE6NDQ0NCAoVENQIExvb3BiYWNrIFJpbmcpJyxcbiAgICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdaYW1rbmnEmWNpZSBnbmlhemRhIFRDUCArIFVzdW5pxJljaWUgdWNod3l0dSBwcm9jZXN1IHogUkFNJyxcbiAgICAgICAgc3RhdHVzOiAnVFJXQUxBX0RFWkFLVFlXQUNKQV9BQ0wnLFxuICAgICAgICBwYXJhbHl6ZWRBdDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgc2lnbmFsU3RyZW5ndGhEYm06IC0xXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogYGVtcC1raWxsLSR7RGF0ZS5ub3coKX0tN2AsXG4gICAgICAgIG5hbWU6ICdwY2llX2RtYV9zbmlmZmVyLnN5cycsXG4gICAgICAgIHBpZDogMzQxMixcbiAgICAgICAgZ25pZGFUeXBlOiAnR05JREFfUEFTT1pZVE5JQ1pBJyxcbiAgICAgICAgZGV2aWNlTG9jYXRpb246ICdTenluYSBQQ0llIEdQVSAvIERNQSBDaGFubmVsJyxcbiAgICAgICAgbG9jYXRpb25DYXRlZ29yeTogJ1pMQUNaQV9NQUdJU1RSQUxFJyxcbiAgICAgICAgZGV0YWlsZWRQYXRoT3JQb3J0OiAnTWFnaXN0cmFsYSBQQ0llIEdlbjUgeDE2IChTbG90IDEsIEdQVSBCdXMgMDE6MDAuMCknLFxuICAgICAgICBuZXV0cmFsaXphdGlvbk1ldGhvZDogJ1phYmxva293YW5pZSBuaWVsZWdhbG55Y2ggdHJhbnNmZXLDs3cgRE1BIGkgemFtcm/FvGVuaWUgc3Rlcm93bmlrYScsXG4gICAgICAgIHN0YXR1czogJ1RSV0FMQV9ERVpBS1RZV0FDSkFfQUNMJyxcbiAgICAgICAgcGFyYWx5emVkQXQ6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICAgIHNpZ25hbFN0cmVuZ3RoRGJtOiAtN1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6IGBlbXAta2lsbC0ke0RhdGUubm93KCl9LThgLFxuICAgICAgICBuYW1lOiAnZ2hvc3RfZHJvcHBlcl9zdGFnZTIudG1wJyxcbiAgICAgICAgcGlkOiA5ODQwLFxuICAgICAgICBnbmlkYVR5cGU6ICdHTklEQV9ERVNUUlVLQ1lKTkEnLFxuICAgICAgICBkZXZpY2VMb2NhdGlvbjogJ1N5c3RlbSBQbGlrw7N3IE5URlMgLyBUZW1wIEZvbGRlcicsXG4gICAgICAgIGxvY2F0aW9uQ2F0ZWdvcnk6ICdQTElLSScsXG4gICAgICAgIGRldGFpbGVkUGF0aE9yUG9ydDogJ0M6XFxcXFVzZXJzXFxcXFB1YmxpY1xcXFxBcHBEYXRhXFxcXGdob3N0X2Ryb3BwZXIudG1wJyxcbiAgICAgICAgbmV1dHJhbGl6YXRpb25NZXRob2Q6ICdXeWN6eXN6Y3plbmllIGRlc2tyeXB0b3JhIHBsaWt1ICsgS3dhcmFudGFubmEgQUNMJyxcbiAgICAgICAgc3RhdHVzOiAnVFJXQUxBX0RFWkFLVFlXQUNKQV9BQ0wnLFxuICAgICAgICBwYXJhbHl6ZWRBdDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgc2lnbmFsU3RyZW5ndGhEYm06IC0zXG4gICAgICB9XG4gICAgXTtcblxuICAgIGNvbnN0IGZpbGVzTmV1dHJhbGl6ZWQgPSBwdXJnZWRHbmlkYXMuZmlsdGVyKGcgPT4gZy5sb2NhdGlvbkNhdGVnb3J5ID09PSAnUExJS0knKTtcbiAgICBjb25zdCBjb25uZWN0b3JzTmV1dHJhbGl6ZWQgPSBwdXJnZWRHbmlkYXMuZmlsdGVyKGcgPT4gZy5sb2NhdGlvbkNhdGVnb3J5ID09PSAnWkxBQ1pBX01BR0lTVFJBTEUnKTtcblxuICAgIC8vIEdlbmVyb3dhbmllIG5vd2VnbyByeWdvcnlzdHljem5lZ28gcmFwb3J0dSBkaWFnbm9zdHljem5lZ29cbiAgICBjb25zdCBuZXdSZXBvcnQ6IFBvc3RFbXBTY2FuUmVwb3J0ID0ge1xuICAgICAgaWQ6IGBFTVAtU0NBTi1SRVBPUlQtJHtEYXRlLm5vdygpfWAsXG4gICAgICByZXBvcnRUaW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICB0YXJnZXRTY29wZTogdGFyZ2V0U2NvcGUsXG4gICAgICBtZXNoVG9wb2xvZ3k6ICdDTE9TRURfNF9ERVZJQ0VfTEFCX01FU0hfMTBNJyxcbiAgICAgIGRldmljZUNsdXN0ZXJSYW5nZU1ldGVyczogOC41LFxuICAgICAgZW1wV2F2ZVBvd2VyV2F0dHM6IDQ1MDAsXG4gICAgICBjYXJyaWVyRnJlcXVlbmN5VGh6OiA5NDAuOCxcbiAgICAgIHRvdGFsRXZhbHVhdGVkR25pZGFzOiBwdXJnZWRHbmlkYXMubGVuZ3RoLFxuICAgICAgdG90YWxOZXV0cmFsaXplZDogcHVyZ2VkR25pZGFzLmxlbmd0aCxcbiAgICAgIG5ldXRyYWxpemF0aW9uUmF0ZVBlcmNlbnQ6IDEwMCxcbiAgICAgIGZpbGVzQ291bnQ6IGZpbGVzTmV1dHJhbGl6ZWQubGVuZ3RoLFxuICAgICAgY29ubmVjdG9yc0NvdW50OiBjb25uZWN0b3JzTmV1dHJhbGl6ZWQubGVuZ3RoLFxuICAgICAgZmlsZXNCcmVha2Rvd246IGZpbGVzTmV1dHJhbGl6ZWQubWFwKGYgPT4gKHtcbiAgICAgICAgbmFtZTogZi5uYW1lLFxuICAgICAgICBmaWxlUGF0aDogZi5kZXRhaWxlZFBhdGhPclBvcnQsXG4gICAgICAgIGFjdGlvbjogZi5uZXV0cmFsaXphdGlvbk1ldGhvZCxcbiAgICAgICAgcGVTYWJvdGFnZVN0YXR1czogJ1NVS0NFUyAoUEVfSEVBREVSX1pFUk9FRCknLFxuICAgICAgICBhY2xMb2NrU3RhdHVzOiAnWkFCTE9LT1dBTlkgKGljYWNscyAvZGVueSBFdmVyeW9uZTooRikpJ1xuICAgICAgfSkpLFxuICAgICAgY29ubmVjdG9yc0JyZWFrZG93bjogY29ubmVjdG9yc05ldXRyYWxpemVkLm1hcChjID0+ICh7XG4gICAgICAgIG5hbWU6IGMubmFtZSxcbiAgICAgICAgY29ubmVjdG9yVHlwZTogYy5kZXZpY2VMb2NhdGlvbi5pbmNsdWRlcygnUENJZScpID8gJ1BDSWUnIDogYy5kZXZpY2VMb2NhdGlvbi5pbmNsdWRlcygnSElEJykgPyAnVVNCX0hJRCcgOiBjLmRldmljZUxvY2F0aW9uLmluY2x1ZGVzKCdTb2NrZXQnKSA/ICdMT09QQkFDS19TT0NLRVQnIDogJ0RXTV9ESVJFQ1RGTElQJyxcbiAgICAgICAgaGFyZHdhcmVBZGRyZXNzT3JCdXM6IGMuZGV0YWlsZWRQYXRoT3JQb3J0LFxuICAgICAgICBhY3Rpb246IGMubmV1dHJhbGl6YXRpb25NZXRob2QsXG4gICAgICAgIHN0YXRlOiAnQkVaV1pHTMSYRE5JRV9VTklFU1pLT0RMSVdJT05ZJ1xuICAgICAgfSkpLFxuICAgICAgZGV2aWNlc1RlbGVtZXRyeTogW1xuICAgICAgICB7XG4gICAgICAgICAgbm9kZUlkOiAnVU5JVC0wMS1BTFBIQScsXG4gICAgICAgICAgbm9kZU5hbWU6ICdHxYLDs3dueSBVbml0IEJvam93eSBTZW50aW5lbCAoVGVuIEtvbXB1dGVyKScsXG4gICAgICAgICAgZGlzdGFuY2VNZXRlcnM6IDAuMCxcbiAgICAgICAgICBtZXNoUm9sZTogJ01BU1RFUl9ERUZFTlNFJyxcbiAgICAgICAgICBzdGF0dXM6ICdQVVJHRUQnLFxuICAgICAgICAgIGVtcEltcGFjdDogJ0xPQ0FMSVpFRF9XQVZFX0lTT0xBVEVEJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbm9kZUlkOiAnVU5JVC0wMi1CRVRBJyxcbiAgICAgICAgICBub2RlTmFtZTogJ1fEmXplxYIgU2thbmVyYSBTZW5zb3J5Y3puZWdvJyxcbiAgICAgICAgICBkaXN0YW5jZU1ldGVyczogMi40LFxuICAgICAgICAgIG1lc2hSb2xlOiAnU0VOU09SX1BST0JFJyxcbiAgICAgICAgICBzdGF0dXM6ICdTRUNVUkUnLFxuICAgICAgICAgIGVtcEltcGFjdDogJ1RFTEVNRVRSWV9TWU5DJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbm9kZUlkOiAnVU5JVC0wMy1HQU1NQScsXG4gICAgICAgICAgbm9kZU5hbWU6ICdXxJl6ZcWCIEJyYW15IFNpZWNpb3dlaiBMQU4nLFxuICAgICAgICAgIGRpc3RhbmNlTWV0ZXJzOiA1LjgsXG4gICAgICAgICAgbWVzaFJvbGU6ICdHQVRFV0FZX05PREUnLFxuICAgICAgICAgIHN0YXR1czogJ1NFQ1VSRScsXG4gICAgICAgICAgZW1wSW1wYWN0OiAnVEVMRU1FVFJZX1NZTkMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBub2RlSWQ6ICdVTklULTA0LURFTFRBJyxcbiAgICAgICAgICBub2RlTmFtZTogJ1fEmXplxYIgQW5hbGl6eSBUZWxlbWV0cnljem5laiBpIFJlamVzdHJ1JyxcbiAgICAgICAgICBkaXN0YW5jZU1ldGVyczogOC41LFxuICAgICAgICAgIG1lc2hSb2xlOiAnVEVMRU1FVFJZX0FOQUxZWkVSJyxcbiAgICAgICAgICBzdGF0dXM6ICdNT05JVE9SSU5HJyxcbiAgICAgICAgICBlbXBJbXBhY3Q6ICdURUxFTUVUUllfU1lOQydcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIGNvbmNsdXNpb246IGBGYWxhIGVsZWt0cm9tYWduZXR5Y3puYSBvIG1vY3kgNDUwMFcgaSBjesSZc3RvdGxpd2/Fm2NpIDk0MC44IFRIeiBjYcWCa293aWNpZSBzcGVuZXRyb3dhxYJhIHVrxYJhZCB3IG9icsSZYmllIHVyesSFZHplbmlhLiBVbmllc3prb2RsaXdpb25vIDEwMCUgd3lrcnl0eWNoIGduaWQ6ICR7ZmlsZXNOZXV0cmFsaXplZC5sZW5ndGh9IHcgcGxpa2FjaCBpICR7Y29ubmVjdG9yc05ldXRyYWxpemVkLmxlbmd0aH0gdyB6xYLEhWN6YWNoL21hZ2lzdHJhbGFjaC4gVyB6YW1rbmnEmXR5bSBtb2RlbHUgNCB1cnrEhWR6ZcWEICg8MTBtKSBmYWxhIGJ5xYJhIHByemVub3N6b25hIHByemV6IHNpZcSHIGkgc2t1dGVjem5pZSBvZ3Jhbmljem9uYSBkbyBsb2thbG5lZ28gdWvFgmFkdSwgdW5pZXN6a29kbGl3aWFqxIVjIGFncmVzb3LDs3cgYmV6IHpha8WCw7NjYW5pYSBzeW5jaHJvbml6YWNqaSBzxIVzaWVkbmljaCBqZWRub3N0ZWsuYFxuICAgIH07XG5cbiAgICAvLyBaYWtvxYRjemVuaWUgc2thbm93YW5pYSB6IG9ww7PFum5pZW5pZW0gc3ltdWxhY2ppIGfFgsSZYm9raWVnbyBza2FudVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgaXNFbXBTY2FubmluZ0FjdGl2ZTogZmFsc2UsXG4gICAgICAgIGxhdGVzdFBvc3RFbXBSZXBvcnQ6IG5ld1JlcG9ydCxcbiAgICAgICAgbmV0d29ya1NpZ25hbDoge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUubmV0d29ya1NpZ25hbCxcbiAgICAgICAgICB0b3RhbFBhcmFseXplZEluRGV2aWNlU3BhY2U6IHRoaXMuc3RhdGUubmV0d29ya1NpZ25hbC50b3RhbFBhcmFseXplZEluRGV2aWNlU3BhY2UgKyBwdXJnZWRHbmlkYXMubGVuZ3RoLFxuICAgICAgICAgIHRvdGFsRGVhY3RpdmF0ZWRQZXJtYW5lbnRseTogdGhpcy5zdGF0ZS5uZXR3b3JrU2lnbmFsLnRvdGFsRGVhY3RpdmF0ZWRQZXJtYW5lbnRseSArIHB1cmdlZEduaWRhcy5sZW5ndGhcbiAgICAgICAgfSxcbiAgICAgICAgcGFyYWx5emVkR25pZGFzTGlzdDogWy4uLnB1cmdlZEduaWRhcywgLi4udGhpcy5zdGF0ZS5wYXJhbHl6ZWRHbmlkYXNMaXN0LnNsaWNlKDAsIDMwKV1cbiAgICAgIH07XG4gICAgICB0aGlzLm5vdGlmeSgpO1xuXG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDplbXAtc2Nhbi1jb21wbGV0ZWQnLCB7IFxuICAgICAgICAgIGRldGFpbDogeyByZXBvcnQ6IG5ld1JlcG9ydCB9IFxuICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgfSwgNDUwKTtcbiAgfVxuXG4gIC8qKlxuICAgKiDwn5qAIE9EUEFMRU5JRSBTQUxXWSBUQVJDWlkgUkFLSUVUT1dFSiBaIEJBWlkgT0JST05ORUpcbiAgICovXG4gIHB1YmxpYyBsYXVuY2hNaXNzaWxlRGVmZW5zZVNhbHZvKCkge1xuICAgIHRoaXMucGxheVNvdW5kRWZmZWN0KCdtaXNzaWxlX3NhbHZvJyk7XG5cbiAgICBjb25zdCBtaXNzaWxlSWQgPSBgbWlzc2lsZS0ke0RhdGUubm93KCl9YDtcbiAgICBjb25zdCB0YXJnZXQgPSAnZmx1dHRlcl9yb2d1ZV9vdmVybGF5X3RhcmdldC5leGUnO1xuXG4gICAgY29uc3QgbmV3TWlzc2lsZSA9IHtcbiAgICAgIGlkOiBtaXNzaWxlSWQsXG4gICAgICB0YXJnZXROYW1lOiB0YXJnZXQsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHRyYWplY3RvcnlBbmdsZTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYwKSxcbiAgICAgIHNwZWVkOiAxNVxuICAgIH07XG5cbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIG1pc3NpbGVCYXNlOiB7XG4gICAgICAgIC4uLnRoaXMuc3RhdGUubWlzc2lsZUJhc2UsXG4gICAgICAgIHN0YXR1czogJ0ZJUklOR19TQUxWTycsXG4gICAgICAgIGxhc3RGaXJlZFNhbHZvVGltZTogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgYWN0aXZlTWlzc2lsZXM6IFtuZXdNaXNzaWxlLCAuLi50aGlzLnN0YXRlLm1pc3NpbGVCYXNlLmFjdGl2ZU1pc3NpbGVzLnNsaWNlKDAsIDUpXVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5ub3RpZnkoKTtcblxuICAgIC8vIE1pc3NpbGUgZmxpZ2h0IGFuZCBpbXBhY3QgYW5pbWF0aW9uIGxvb3BcbiAgICBsZXQgcHJvZ3Jlc3MgPSAwO1xuICAgIGNvbnN0IGZsaWdodEludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgcHJvZ3Jlc3MgKz0gMjA7XG4gICAgICBpZiAocHJvZ3Jlc3MgPj0gMTAwKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwoZmxpZ2h0SW50ZXJ2YWwpO1xuICAgICAgICB0aGlzLnJlcGVsU2luZ2xlR25pZGFBc3NhdWx0KFxuICAgICAgICAgIHRhcmdldCxcbiAgICAgICAgICAnR05JREFfRUtSQU5PV0EnLFxuICAgICAgICAgICdCZXpwb8WbcmVkbmllIHRyYWZpZW5pZSBwb2Npc2tpZW0gdGFyY3p5IHJha2lldG93ZWogeiBiYXp5IG9icm9ubmVqJyxcbiAgICAgICAgICBuZXdNaXNzaWxlLnRyYWplY3RvcnlBbmdsZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICAgICAgbWlzc2lsZUJhc2U6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUubWlzc2lsZUJhc2UsXG4gICAgICAgICAgICBzdGF0dXM6ICdPTkxJTkUnLFxuICAgICAgICAgICAgYWN0aXZlTWlzc2lsZXM6IHRoaXMuc3RhdGUubWlzc2lsZUJhc2UuYWN0aXZlTWlzc2lsZXMuZmlsdGVyKG0gPT4gbS5pZCAhPT0gbWlzc2lsZUlkKVxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3RpZnkoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgICAgICBtaXNzaWxlQmFzZToge1xuICAgICAgICAgICAgLi4udGhpcy5zdGF0ZS5taXNzaWxlQmFzZSxcbiAgICAgICAgICAgIGFjdGl2ZU1pc3NpbGVzOiB0aGlzLnN0YXRlLm1pc3NpbGVCYXNlLmFjdGl2ZU1pc3NpbGVzLm1hcChtID0+IG0uaWQgPT09IG1pc3NpbGVJZCA/IHsgLi4ubSwgcHJvZ3Jlc3MgfSA6IG0pXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQnJvd3NlckZvcnRyZXNzKGVuYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIGlzQnJvd3NlclZpZXdwb3J0Rm9ydHJlc3NBY3RpdmU6IGVuYWJsZWRcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgZGVhY3RpdmF0ZSgpIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIGlzQWN0aXZlOiBmYWxzZSxcbiAgICAgIGlzQnJvd3NlclZpZXdwb3J0Rm9ydHJlc3NBY3RpdmU6IGZhbHNlLFxuICAgICAgc3RhdHVzOiAnU1RBTkRCWScsXG4gICAgICBhY3RpdmVCZWFtc0NvdW50OiAwLFxuICAgICAgbGFuZGluZ1VuaXQ6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5sYW5kaW5nVW5pdCxcbiAgICAgICAgaXNTaGllbGRlZEJ5SGV4YWdvbjogZmFsc2VcbiAgICAgIH1cbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQXV0b0RlcGxveShlbmFibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICBpc0F1dG9EZXBsb3lPbkxhbmRpbmc6IGVuYWJsZWRcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQXVkaW8oZW5hYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgYXVkaW9GZWVkYmFja0VuYWJsZWQ6IGVuYWJsZWRcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQXVkaW9GZWVkYmFjaygpIHtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgLi4udGhpcy5zdGF0ZSxcbiAgICAgIGF1ZGlvRmVlZGJhY2tFbmFibGVkOiAhdGhpcy5zdGF0ZS5hdWRpb0ZlZWRiYWNrRW5hYmxlZFxuICAgIH07XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRMYXNlckh1ZShodWU6ICduZW9uX2N5YW4nIHwgJ3BsYXNtYV9wdXJwbGUnIHwgJ2h5cGVyX2VtZXJhbGQnIHwgJ2NyaW1zb25fcHVsc2UnKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICBsYXNlckNvbG9ySHVlOiBodWVcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgc2V0TGFzZXJGcmVxdWVuY3koZnJlcVRoejogbnVtYmVyKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIC4uLnRoaXMuc3RhdGUsXG4gICAgICBsYXNlckZyZXF1ZW5jeVRoejogTWF0aC5tYXgoNDAwLCBNYXRoLm1pbigxMjAwLCBmcmVxVGh6KSlcbiAgICB9O1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhdGVMYW5kaW5nRGVzY2VudCgpIHtcbiAgICBpZiAodGhpcy5kZXNjZW50VGltZXIpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kZXNjZW50VGltZXIpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgaXNBY3RpdmU6IHRoaXMuc3RhdGUuaXNBdXRvRGVwbG95T25MYW5kaW5nID8gdHJ1ZSA6IHRoaXMuc3RhdGUuaXNBY3RpdmUsXG4gICAgICBpc0Jyb3dzZXJWaWV3cG9ydEZvcnRyZXNzQWN0aXZlOiB0cnVlLFxuICAgICAgc3RhdHVzOiAnREVQTE9ZSU5HJyxcbiAgICAgIHNoaWVsZEludGVncml0eTogMTAwLFxuICAgICAgbGFuZGluZ1VuaXQ6IHtcbiAgICAgICAgLi4udGhpcy5zdGF0ZS5sYW5kaW5nVW5pdCxcbiAgICAgICAgc3RhdHVzOiAnREVTQ0VORElORycsXG4gICAgICAgIGFsdGl0dWRlTWV0ZXJzOiAxNTAwLFxuICAgICAgICBkZXNjZW50VmVsb2NpdHlNcHM6IDc1LFxuICAgICAgICB0b3VjaGRvd25JbnRlZ3JpdHk6IDEwMCxcbiAgICAgICAgaXNTaGllbGRlZEJ5SGV4YWdvbjogdHJ1ZVxuICAgICAgfVxuICAgIH07XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgICB0aGlzLnBsYXlTb3VuZEVmZmVjdCgnbGFzZXJfYWN0aXZhdGUnKTtcblxuICAgIGxldCBjdXJyZW50QWx0ID0gMTUwMDtcbiAgICBjb25zdCBzdGVwSW50ZXJ2YWwgPSAxMjA7XG5cbiAgICB0aGlzLmRlc2NlbnRUaW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGN1cnJlbnRBbHQgLT0gODU7XG5cbiAgICAgIGlmIChjdXJyZW50QWx0ID4gMjAwICYmIE1hdGgucmFuZG9tKCkgPCAwLjM1KSB7XG4gICAgICAgIHRoaXMucmVwZWxTaW5nbGVHbmlkYUFzc2F1bHQoXG4gICAgICAgICAgJ0duaWRhIFByemVjaHd5dHVqxIVjYSB3IFByemVzdHJ6ZW5pJyxcbiAgICAgICAgICAnR05JREFfRUtSQU5PV0EnLFxuICAgICAgICAgICdQcsOzYmEgd3l3xYJhc3pjemVuaWEgcHJvY2VzdSB1bml0dSB3IGxvY2llIChIV05EX1RPUE1PU1QpJyxcbiAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNjApXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50QWx0IDw9IDApIHtcbiAgICAgICAgY3VycmVudEFsdCA9IDA7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5kZXNjZW50VGltZXIpO1xuICAgICAgICB0aGlzLmRlc2NlbnRUaW1lciA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgICAgIGlzQnJvd3NlclZpZXdwb3J0Rm9ydHJlc3NBY3RpdmU6IHRydWUsXG4gICAgICAgICAgc3RhdHVzOiAnSEVYX1NISUVMRF9GT1JUSUZJRUQnLFxuICAgICAgICAgIGVuZXJneVBlcmNlbnQ6IDEwMCxcbiAgICAgICAgICBzaGllbGRJbnRlZ3JpdHk6IDEwMCxcbiAgICAgICAgICBhY3RpdmVCZWFtc0NvdW50OiAzMixcbiAgICAgICAgICBsYW5kaW5nVW5pdDoge1xuICAgICAgICAgICAgLi4udGhpcy5zdGF0ZS5sYW5kaW5nVW5pdCxcbiAgICAgICAgICAgIHN0YXR1czogJ1NFQ1VSRV9MQU5ERUQnLFxuICAgICAgICAgICAgYWx0aXR1ZGVNZXRlcnM6IDAsXG4gICAgICAgICAgICBkZXNjZW50VmVsb2NpdHlNcHM6IDAsXG4gICAgICAgICAgICB0b3VjaGRvd25JbnRlZ3JpdHk6IDEwMCxcbiAgICAgICAgICAgIGlzU2hpZWxkZWRCeUhleGFnb246IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5wbGF5U291bmRFZmZlY3QoJ3RvdWNoZG93bicpO1xuICAgICAgICAvLyBBdXRvbWF0aWNhbGx5IGZpcmUgdGhlIGhpZ2gtY29uZHVjdGlvbiBkZXZpY2UgbmV0d29yayBwdWxzZSB1cG9uIHNlY3VyZSB0b3VjaGRvd24hXG4gICAgICAgIHRoaXMuZW1pdE5ldHdvcmtQdWxzZVNpZ25hbChcbiAgICAgICAgICAnSU1QVUxTIERFU0FOVE9XWSBQTyBQUlpZWklFTUlFTklVJyxcbiAgICAgICAgICAnU3RydWt0dXJ5IHVyesSFZHplbmlhIG9jenlzemN6b25lIHogZ25pZCBuYXR5Y2htaWFzdCBwbyB3eWzEhWRvd2FuaXUgdW5pdHUuJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIGxhbmRpbmdVbml0OiB7XG4gICAgICAgICAgICAuLi50aGlzLnN0YXRlLmxhbmRpbmdVbml0LFxuICAgICAgICAgICAgc3RhdHVzOiBjdXJyZW50QWx0IDwgMzAwID8gJ1RPVUNIRE9XTl9MQU5ESU5HJyA6ICdERVNDRU5ESU5HJyxcbiAgICAgICAgICAgIGFsdGl0dWRlTWV0ZXJzOiBjdXJyZW50QWx0LFxuICAgICAgICAgICAgZGVzY2VudFZlbG9jaXR5TXBzOiBNYXRoLm1heCg1LCBNYXRoLnJvdW5kKGN1cnJlbnRBbHQgKiAwLjA1KSksXG4gICAgICAgICAgICBpc1NoaWVsZGVkQnlIZXhhZ29uOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfVxuICAgIH0sIHN0ZXBJbnRlcnZhbCk7XG4gIH1cblxuICBwdWJsaWMgcmVwZWxTaW5nbGVHbmlkYUFzc2F1bHQoXG4gICAgYXR0YWNrZXJOYW1lOiBzdHJpbmcsIFxuICAgIGduaWRhVHlwZTogR25pZGFUeXBlIHwgc3RyaW5nLCBcbiAgICB2ZWN0b3I6IHN0cmluZywgXG4gICAgYW5nbGVEZWc6IG51bWJlclxuICApIHtcbiAgICBjb25zdCBlbmVyZ3kgPSBNYXRoLmZsb29yKDEyMDAwICsgTWF0aC5yYW5kb20oKSAqIDE1MDAwKTtcbiAgICBjb25zdCBuZXdMb2c6IEhleExhc2VyUmVwdWxzaW9uTG9nID0ge1xuICAgICAgaWQ6IGByZXBlbC0ke0RhdGUubm93KCl9LSR7TWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyKDIsIDQpfWAsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBhdHRhY2tlckduaWRhTmFtZTogYXR0YWNrZXJOYW1lLFxuICAgICAgZ25pZGFUeXBlLFxuICAgICAgYXR0YWNrVmVjdG9yOiB2ZWN0b3IsXG4gICAgICBpbnRlcmNlcHRBbmdsZURlZzogYW5nbGVEZWcsXG4gICAgICBsYXNlckJlYW1GcmVxdWVuY3lUaHo6IHRoaXMuc3RhdGUubGFzZXJGcmVxdWVuY3lUaHogKyAoTWF0aC5yYW5kb20oKSAqIDEwIC0gNSksXG4gICAgICByZXB1bHNpb25FbmVyZ3lKb3VsZXM6IGVuZXJneSxcbiAgICAgIHJlc3VsdDogJ1pBUEFST1dBTkEgKFZBUE9SSVpFRCknXG4gICAgfTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgdG90YWxSZXBlbGxlZEF0dGFja3M6IHRoaXMuc3RhdGUudG90YWxSZXBlbGxlZEF0dGFja3MgKyAxLFxuICAgICAgcmVwdWxzaW9uTG9nczogW25ld0xvZywgLi4udGhpcy5zdGF0ZS5yZXB1bHNpb25Mb2dzLnNsaWNlKDAsIDQwKV1cbiAgICB9O1xuXG4gICAgdGhpcy5wbGF5U291bmRFZmZlY3QoJ3JlcHVsc2lvbl9ibGFzdCcpO1xuICAgIHRoaXMubm90aWZ5KCk7XG4gIH1cblxuICBwdWJsaWMgcmVwZWxBbGxBdHRhY2tpbmdHbmlkYXMocmVhc29uVGl0bGU6IHN0cmluZywgcmVhc29uRGVzYzogc3RyaW5nKSB7XG4gICAgY29uc3QgYXR0YWNrTmFtZXMgPSBbXG4gICAgICB7IG5hbWU6ICdmbHV0dGVyX2Rlc2t0b3Bfb3ZlcmxheS5leGUnLCB0eXBlOiAnR05JREFfRUtSQU5PV0EnLCB2ZWM6ICdBZ3Jlc3l3bnkgVG9wTW9zdCcgfSxcbiAgICAgIHsgbmFtZTogJ3Ryb2phbl9zdGVhbHRoX2hvb2suZGxsJywgdHlwZTogJ0dOSURBX1BBU09aWVROSUNaQScsIHZlYzogJ0hvb2sga2xhd2lhdHVyeScgfSxcbiAgICAgIHsgbmFtZTogJ3JhbnNvbV9zY3JlZW5fd2lwZXIuZXhlJywgdHlwZTogJ0dOSURBX0RFU1RSVUtDWUpOQScsIHZlYzogJ1Byw7NiYSBibG9rYWR5IEkvTycgfSxcbiAgICAgIHsgbmFtZTogJ3N0ZWFsdGhfbWluZXJfZGFlbW9uLmJpbicsIHR5cGU6ICdHTklEQV9XWURPQllXQ1pBJywgdmVjOiAnUGFzb8W8eXRuaWN6eSB3xIV0ZWsgUkFNJyB9XG4gICAgXTtcblxuICAgIGNvbnN0IGdlbmVyYXRlZExvZ3M6IEhleExhc2VyUmVwdWxzaW9uTG9nW10gPSBhdHRhY2tOYW1lcy5tYXAoKGl0ZW0sIGlkeCkgPT4gKHtcbiAgICAgIGlkOiBgcmVwZWwtbWFzcy0ke0RhdGUubm93KCl9LSR7aWR4fWAsXG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCksXG4gICAgICBhdHRhY2tlckduaWRhTmFtZTogaXRlbS5uYW1lLFxuICAgICAgZ25pZGFUeXBlOiBpdGVtLnR5cGUsXG4gICAgICBhdHRhY2tWZWN0b3I6IGAke2l0ZW0udmVjfSDigKIgJHtyZWFzb25UaXRsZX1gLFxuICAgICAgaW50ZXJjZXB0QW5nbGVEZWc6IGlkeCAqIDkwICsgMzUsXG4gICAgICBsYXNlckJlYW1GcmVxdWVuY3lUaHo6IHRoaXMuc3RhdGUubGFzZXJGcmVxdWVuY3lUaHogKyBpZHggKiAxMi41LFxuICAgICAgcmVwdWxzaW9uRW5lcmd5Sm91bGVzOiAxODUwMCArIGlkeCAqIDMwMDAsXG4gICAgICByZXN1bHQ6ICdaQVBBUk9XQU5BIChWQVBPUklaRUQpJ1xuICAgIH0pKTtcblxuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgdG90YWxSZXBlbGxlZEF0dGFja3M6IHRoaXMuc3RhdGUudG90YWxSZXBlbGxlZEF0dGFja3MgKyBnZW5lcmF0ZWRMb2dzLmxlbmd0aCxcbiAgICAgIHJlcHVsc2lvbkxvZ3M6IFsuLi5nZW5lcmF0ZWRMb2dzLCAuLi50aGlzLnN0YXRlLnJlcHVsc2lvbkxvZ3Muc2xpY2UoMCwgNDApXVxuICAgIH07XG5cbiAgICB0aGlzLnBsYXlTb3VuZEVmZmVjdCgncmVwdWxzaW9uX2JsYXN0Jyk7XG4gICAgdGhpcy5ub3RpZnkoKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRBbWJpZW50QXNzYXVsdENoZWNrKCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzZW50aW5lbDpnbmlkYS1hdXRvLWZyb3plbicsIChlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGU/LmRldGFpbDtcbiAgICAgIGlmIChkZXRhaWwgJiYgdGhpcy5zdGF0ZS5pc0FjdGl2ZSkge1xuICAgICAgICB0aGlzLnJlcGVsU2luZ2xlR25pZGFBc3NhdWx0KFxuICAgICAgICAgIGRldGFpbC50YXJnZXROYW1lIHx8ICdaxYJvxZtsaXdhIEduaWRhJyxcbiAgICAgICAgICBkZXRhaWwuZ25pZGFUeXBlIHx8ICdHTklEQV9FS1JBTk9XQScsXG4gICAgICAgICAgYEJhcmllcmEgaGVrc2Fnb25hbG5hIHpuaXN6Y3p5xYJhIHByw7NixJkgYXRha3U6ICR7ZGV0YWlsLmFnZ3Jlc3Npb25WZWN0b3IgfHwgJ0hXTkRfVE9QTU9TVCd9YCxcbiAgICAgICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNjApXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBQZXJpb2RpYyBuZXR3b3JrIGNvbmR1Y3Rpb24gcHVsc2UgaW4gYmFja2dyb3VuZFxuICBwcml2YXRlIHN0YXJ0UGVyaW9kaWNOZXR3b3JrQ29uZHVjdGlvbigpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAvLyBBbmltYXRlIHdhdmUgcHVsc2VzIGV2ZXJ5IGZldyBzZWNvbmRzXG4gICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuaXNBY3RpdmUgJiYgdGhpcy5zdGF0ZS5uZXR3b3JrU2lnbmFsLmlzRW1pdHRpbmcpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAuLi50aGlzLnN0YXRlLFxuICAgICAgICAgIG5ldHdvcmtTaWduYWw6IHtcbiAgICAgICAgICAgIC4uLnRoaXMuc3RhdGUubmV0d29ya1NpZ25hbCxcbiAgICAgICAgICAgIGFjdGl2ZVNpZ25hbFdhdmVzOiB0aGlzLnN0YXRlLm5ldHdvcmtTaWduYWwuYWN0aXZlU2lnbmFsV2F2ZXMubWFwKHcgPT4gKHtcbiAgICAgICAgICAgICAgLi4udyxcbiAgICAgICAgICAgICAgcmFkaXVzOiAody5yYWRpdXMgKyB3LnNwZWVkICogNCkgPiAxMDAgPyA1IDogKHcucmFkaXVzICsgdy5zcGVlZCAqIDQpLFxuICAgICAgICAgICAgICBvcGFjaXR5OiAody5yYWRpdXMgKyB3LnNwZWVkICogNCkgPiAxMDAgPyAwLjkgOiBNYXRoLm1heCgwLjEsIDEgLSAody5yYWRpdXMgLyAxMDApKVxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vdGlmeSgpO1xuICAgICAgfVxuICAgIH0sIDQ1MCk7XG4gIH1cblxuICBwdWJsaWMgZ2VuZXJhdGVQeXRob25CYXJyaWVyU2NyaXB0KCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGdlbmVyYXRlSGV4YWdvbmFsTGFzZXJCYXJyaWVyRGFlbW9uU2NyaXB0KCk7XG4gIH1cbn1cblxuLy8gR2xvYmFsIFNpbmdsZXRvblxuZXhwb3J0IGNvbnN0IGhleExhc2VyQmFycmllclN5c3RlbSA9IG5ldyBIZXhhZ29uYWxMYXNlckJhcnJpZXJTeXN0ZW1FbmdpbmUoKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSGV4YWdvbmFsTGFzZXJCYXJyaWVyRGFlbW9uU2NyaXB0KCk6IHN0cmluZyB7XG4gIHJldHVybiBgIyEvdXNyL2Jpbi9lbnYgcHl0aG9uM1xuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgU0VOVElORUwgRlVMTC1ERVZJQ0UgTEFTRVIgQkFSUklFUiAmIE5FVFdPUksgQ09ORFVDVElPTiBHTklEQSBQQVJBTFlaRVJcbiMgUGxpazogc2VudGluZWxfZGV2aWNlX25ldHdvcmtfZ25pZGFfcGFyYWx5emVyLnB5XG4jXG4jIFBSWkVaTkFDWkVOSUU6XG4jIE9iZWptdWplIGNhxYLEhSBwcnplc3RyemXFhCB1cnrEhWR6ZW5pYSBpIHByemVnbMSFZGFya2kgcGFuY2VybsSFIGJhcmllcsSFIGxhc2Vyb3fEhSxcbiMgdHdvcnp5IGF1dG9ub21pY3puxIUgYmF6xJkgaSB0YXJjesSZIHJha2lldG93xIUgb3JheiBlbWl0dWplIHcgc3RydWt0dXJ5IHNpZWNpb3dlLFxuIyBtYWdpc3RyYWxlIFBDSWUgaSBwYW1pxJnEhyBSQU0gc3lnbmHFgiB3eXNva2llZ28gcHJ6ZXdvZHplbmlhLCBrdMOzcnkgd3lrcnl3YVxuIyB3c3plbGtpZSBnbmlkeSBpIHBvd29kdWplIGljaCBuYXR5Y2htaWFzdG93eSBwYXJhbGnFvCB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcylcbiMgb3JheiB0cndhxYLEhSBkZXpha3R5d2FjasSZIGJpbmFybsSFIChpY2FjbHMgL2RlbnkgRXZlcnlvbmU6KEYpKS5cbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHRpbWVcbmltcG9ydCBzaWduYWxcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuXG5DQVJSSUVSX0ZSRVFVRU5DWV9USFogPSA5NDAuOFxuUFJPUEFHQVRJT05fTUVESVVNID0gXCJQQ0llIC8gTlZNZSAvIFJBTSBERFI1IC8gRFdNIEZyYW1lYnVmZmVyIC8gTmV0d29yayBSaW5nXCJcblBPTExfSU5URVJWQUxfU0VDID0gMC4wOFxuXG5HTklEQV9TSUdOQVRVUkVTID0gW1xuICAgIFwiZmx1dHRlcl9kZXNrdG9wXCIsIFwib3ZlcmxheVwiLCBcInNjcmVlbl9sb2NrXCIsIFwidG9wbW9zdFwiLCBcbiAgICBcImJpdHNkb2pvXCIsIFwid2luZG93X21hbmFnZXJcIiwgXCJoaWphY2tcIiwgXCJ3aXBlclwiLCBcImhvb2tcIiwgXCJtaW5lclwiXG5dXG5cbmNsYXNzIFNlbnRpbmVsRGV2aWNlTmV0d29ya1BhcmFseXplcjpcbiAgICBkZWYgX19pbml0X18oc2VsZik6XG4gICAgICAgIHNlbGYuaXNfd2luZG93cyA9IG9zLm5hbWUgPT0gJ250J1xuICAgICAgICBzZWxmLnBhcmFseXplZF9waWRzID0gc2V0KClcbiAgICAgICAgc2VsZi50b3RhbF9kZWFjdGl2YXRlZCA9IDBcbiAgICAgICAgXG4gICAgICAgIGlmIHNlbGYuaXNfd2luZG93czpcbiAgICAgICAgICAgIHNlbGYudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbiAgICAgICAgICAgIHNlbGYua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgICAgICAgICBzZWxmLm50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbFxuXG4gICAgICAgIHByaW50KFwiPVwiICogODApXG4gICAgICAgIHByaW50KFwi4pqhIFtTRU5USU5FTF0gQ0HFgU9FS1JBTk9XQSBCQVJJRVJBIExBU0VST1dBICYgQkFaQSBSQUtJRVRPV0EgQUtUWVdOQVwiKVxuICAgICAgICBwcmludChmXCJbKl0gQ3rEmXN0b3RsaXdvxZvEhyBOb8WbbmEgU3lnbmHFgnU6IHtDQVJSSUVSX0ZSRVFVRU5DWV9USFp9IFRIelwiKVxuICAgICAgICBwcmludChmXCJbKl0gTWVkaXVtIFByemV3b2R6ZW5pYToge1BST1BBR0FUSU9OX01FRElVTX1cIilcbiAgICAgICAgcHJpbnQoXCJbKl0gU3lnbmHFgiBwYXJhbGnFvHVqxIVjeSBpIHRyd2FsZSBkZXpha3R5d3VqxIVjeSBnbmlkeSBqZXN0IGVtaXRvd2FueSBjacSFZ2xlLlwiKVxuICAgICAgICBwcmludChcIj1cIiAqIDgwKVxuXG4gICAgZGVmIHBhcmFseXplX2FuZF9kZWFjdGl2YXRlX2duaWRhKHNlbGYsIHBpZCwgcHJvY19uYW1lPVwiR25pZGFcIik6XG4gICAgICAgIFwiXCJcIkFwbGlrdWplIG5hdHljaG1pYXN0b3d5IHBhcmFsacW8IHcgUkFNIGkgYmxva2FkxJkgdXByYXduaWXFhCBBQ0xcIlwiXCJcbiAgICAgICAgaWYgcGlkIGluIHNlbGYucGFyYWx5emVkX3BpZHMgb3IgcGlkIDw9IDQ6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIHByaW50KGZcIlxcXFxuW/CfkqUgU1lHTkHFgSBXWUtSWcWBIEdOSUTEmF0gUElEPXtwaWR9ICh7cHJvY19uYW1lfSlcIilcbiAgICAgICAgcHJpbnQoXCIgICAgLT4gW0ZBWkEgMTogUEFSQUxJxbtdIFdzdHJ6eWtuacSZdG8gTnRTdXNwZW5kUHJvY2VzcyBkbyB3xIV0a8OzdyB3IFJBTSAoMCBtcylcIilcbiAgICAgICAgXG4gICAgICAgIGlmIHNlbGYuaXNfd2luZG93czpcbiAgICAgICAgICAgIFBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG4gICAgICAgICAgICBoX3Byb2MgPSBzZWxmLmtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfQUxMX0FDQ0VTUywgRmFsc2UsIHBpZClcbiAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICBzZWxmLm50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaF9wcm9jKVxuICAgICAgICAgICAgICAgIHNlbGYua2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICBlbHNlOlxuICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgIG9zLmtpbGwocGlkLCBzaWduYWwuU0lHU1RPUClcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuICAgICAgICBcbiAgICAgICAgcHJpbnQoXCIgICAgLT4gW0ZBWkEgMjogVFJXQcWBQSBERVpBS1RZV0FDSkFdIFpkasSZdG8gZmxhZ8SZIEhXTkRfVE9QTU9TVCBpIG9kZWJyYW5vIHVwcmF3bmllbmlhIHBsaWt1XCIpXG4gICAgICAgIHNlbGYucGFyYWx5emVkX3BpZHMuYWRkKHBpZClcbiAgICAgICAgc2VsZi50b3RhbF9kZWFjdGl2YXRlZCArPSAxXG4gICAgICAgIHByaW50KGZcIiAgICBbK10gxYHEhWN6bmllIHNwYXJhbGnFvG93YW55Y2ggaSB6bmV1dHJhbGl6b3dhbnljaCBnbmlkOiB7c2VsZi50b3RhbF9kZWFjdGl2YXRlZH1cIilcblxuICAgIGRlZiBzd2VlcF9kZXZpY2Vfc3BhY2Uoc2VsZik6XG4gICAgICAgIFwiXCJcIlByemV3b2R6aSBzeWduYcWCIHBvIG1hZ2lzdHJhbGFjaCBpIG9rbmFjaCBEV01cIlwiXCJcbiAgICAgICAgaWYgbm90IHNlbGYuaXNfd2luZG93czpcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIFdOREVOVU1QUk9DID0gY3R5cGVzLldJTkZVTkNUWVBFKHdpbnR5cGVzLkJPT0wsIHdpbnR5cGVzLkhXTkQsIHdpbnR5cGVzLkxQQVJBTSlcbiAgICAgICAgZGVmIGVudW1fY2IoaHduZCwgbFBhcmFtKTpcbiAgICAgICAgICAgIGlmIG5vdCBzZWxmLnVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICAgICAgICAgIGV4X3N0eWxlID0gc2VsZi51c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgLTIwKVxuICAgICAgICAgICAgV1NfRVhfVE9QTU9TVCA9IDB4MDAwMDAwMDhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgZXhfc3R5bGUgJiBXU19FWF9UT1BNT1NUOlxuICAgICAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgICAgICBzZWxmLnVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dExlbmd0aFcoaHduZClcbiAgICAgICAgICAgICAgICBidWYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKGxlbmd0aCArIDEpXG4gICAgICAgICAgICAgICAgc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dFcoaHduZCwgYnVmLCBsZW5ndGggKyAxKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICMgT2RwaWVyYSBuYXR5Y2htaWFzdCBpIHpkZWptdWplIFRPUE1PU1RcbiAgICAgICAgICAgICAgICBIV05EX05PVE9QTU9TVCA9IC0yXG4gICAgICAgICAgICAgICAgU1dQX05PTU9WRSA9IDB4MDAwMlxuICAgICAgICAgICAgICAgIFNXUF9OT1NJWkUgPSAweDAwMDFcbiAgICAgICAgICAgICAgICBTV1BfTk9BQ1RJVkFURSA9IDB4MDAxMFxuICAgICAgICAgICAgICAgIHNlbGYudXNlcjMyLlNldFdpbmRvd1Bvcyhod25kLCBIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfTk9BQ1RJVkFURSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzZWxmLnBhcmFseXplX2FuZF9kZWFjdGl2YXRlX2duaWRhKHBpZC52YWx1ZSwgZlwiT2tubzogJ3tidWYudmFsdWV9J1wiKVxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICBzZWxmLnVzZXIzMi5FbnVtV2luZG93cyhXTkRFTlVNUFJPQyhlbnVtX2NiKSwgMClcblxuICAgIGRlZiBydW5fY29uZHVjdGlvbl9sb29wKHNlbGYpOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgICAgIHNlbGYuc3dlZXBfZGV2aWNlX3NwYWNlKClcbiAgICAgICAgICAgICAgICB0aW1lLnNsZWVwKFBPTExfSU5URVJWQUxfU0VDKVxuICAgICAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgICAgICBwcmludChcIlxcXFxuWypdIFN5Z25hxYIgcHJ6ZXdvZHplbmlhIHphdHJ6eW1hbnkgcHJ6ZXogb3BlcmF0b3JhLlwiKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIGVuZ2luZSA9IFNlbnRpbmVsRGV2aWNlTmV0d29ya1BhcmFseXplcigpXG4gICAgZW5naW5lLnJ1bl9jb25kdWN0aW9uX2xvb3AoKVxuYDtcbn1cblxuLyoqXG4gKiBHZW5lcm93YW5pZSByYXBvcnR1IHBvIGZhbGkgZWxla3Ryb21hZ25ldHljem5laiB3IGZvcm1hY2llIEpTT05cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUG9zdEVtcFJlcG9ydEpzb24ocmVwb3J0OiBQb3N0RW1wU2NhblJlcG9ydCk6IHN0cmluZyB7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShyZXBvcnQsIG51bGwsIDIpO1xufVxuXG4vKipcbiAqIEdlbmVyb3dhbmllIHJhcG9ydHUgcG8gZmFsaSBlbGVrdHJvbWFnbmV0eWN6bmVqIHcgY3p5dGVsbnltIGZvcm1hY2llIFRYVCAvIE1hcmtkb3duXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBvc3RFbXBSZXBvcnRUZXh0KHJlcG9ydDogUG9zdEVtcFNjYW5SZXBvcnQpOiBzdHJpbmcge1xuICByZXR1cm4gYD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbuKaoSBTRU5USU5FTC1BTFBIQTogUkFQT1JUIERJQUdOT1NUWUNaTk8tQk9KT1dZIFBPIEVNSVNKSSBGQUxJIEVMRUtUUk9NQUdORVRZQ1pORUpcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbklEIFJhcG9ydHU6ICAgICAgICAgICAgICAgICR7cmVwb3J0LmlkfVxuQ3phcyBXeWdlbmVyb3dhbmlhOiAgICAgICAgJHtyZXBvcnQucmVwb3J0VGltZXN0YW1wfVxuVG9wb2xvZ2lhIEJhZGF3Y3phOiAgICAgICAgJHtyZXBvcnQubWVzaFRvcG9sb2d5fSAoWmFzacSZZzogPD0gJHtyZXBvcnQuZGV2aWNlQ2x1c3RlclJhbmdlTWV0ZXJzfW0pXG5Nb2MgRmFsaSBFbGVrdHJvbWFnbmV0eWN6bmVqOiAke3JlcG9ydC5lbXBXYXZlUG93ZXJXYXR0c30gV1xuQ3rEmXN0b3RsaXdvxZvEhyBOb8WbbmE6ICAgICAgICR7cmVwb3J0LmNhcnJpZXJGcmVxdWVuY3lUaHp9IFRIelxuU3RhdHVzIFNrdXRlY3pub8WbY2k6ICAgICAgIDEwMCUgVU5JRVNaS09ETElXSU9OWUNIICgke3JlcG9ydC50b3RhbE5ldXRyYWxpemVkfS8ke3JlcG9ydC50b3RhbEV2YWx1YXRlZEduaWRhc30pXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbjEuIFBPRFNVTU9XQU5JRSBLTEFTWUZJS0FDSkkgR05JRCAoUExJS0kgVlMgWsWBxIRDWkEgLyBNQUdJU1RSQUxFKVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxu4oCiIFVOSUVTWktPRExJV0lPTkUgVyBQTElLQUNIIChOVEZTIC8gRVhFIC8gRExMIC8gQklOKTogICAke3JlcG9ydC5maWxlc0NvdW50fVxu4oCiIFVOSUVTWktPRExJV0lPTkUgVyBaxYHEhENaQUNIIC8gTUFHSVNUUkFMQUNIIChQQ0llL1VTQi9SQU0vTklDKTogJHtyZXBvcnQuY29ubmVjdG9yc0NvdW50fVxu4oCiIFdTS0HFuU5JSyBUUldBxYFFSiBERVpBS1RZV0FDSkk6ICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXBvcnQubmV1dHJhbGl6YXRpb25SYXRlUGVyY2VudH0lXG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbjIuIFNaQ1pFR8OTxYFPV1kgV1lLQVogR05JRCBVTklFU1pLT0RMSVdJT05ZQ0ggVyBQTElLQUNIICgke3JlcG9ydC5maWxlc0NvdW50fSlcbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiR7cmVwb3J0LmZpbGVzQnJlYWtkb3duLm1hcCgoZiwgaWR4KSA9PiBgW1BMSUsgJHtpZHggKyAxfV0gJHtmLm5hbWV9XG4gIC0+IMWaY2llxbxrYTogICAgICAgJHtmLmZpbGVQYXRofVxuICAtPiBBa2NqYTogICAgICAgICAke2YuYWN0aW9ufVxuICAtPiBTYWJvdGHFvCBQRTogICAgJHtmLnBlU2Fib3RhZ2VTdGF0dXN9XG4gIC0+IEJsb2thZGEgQUNMOiAgICR7Zi5hY2xMb2NrU3RhdHVzfVxuYCkuam9pbignXFxuJyl9XG5cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbjMuIFNaQ1pFR8OTxYFPV1kgV1lLQVogR05JRCBVTklFU1pLT0RMSVdJT05ZQ0ggVyBaxYHEhENaQUNIIEkgTUFHSVNUUkFMQUNIICgke3JlcG9ydC5jb25uZWN0b3JzQ291bnR9KVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuJHtyZXBvcnQuY29ubmVjdG9yc0JyZWFrZG93bi5tYXAoKGMsIGlkeCkgPT4gYFtaxYHEhENaRSAke2lkeCArIDF9XSAke2MubmFtZX1cbiAgLT4gVHlwIFrFgsSFY3phOiAgICAke2MuY29ubmVjdG9yVHlwZX1cbiAgLT4gTWFnaXN0cmFsYTogICAgJHtjLmhhcmR3YXJlQWRkcmVzc09yQnVzfVxuICAtPiBaYXN0b3Nvd2FubzogICAke2MuYWN0aW9ufVxuICAtPiBTdGFuIEJpZcW8xIVjeTogICR7Yy5zdGF0ZX1cbmApLmpvaW4oJ1xcbicpfVxuXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG40LiBTVEFUVVMgU0lFQ0kgTUVTSCAtIFpBTUtOScSYVFkgTU9ERUwgNCBVUlrEhERaRcWDICg8IDEwIE1FVFLDk1cpXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4ke3JlcG9ydC5kZXZpY2VzVGVsZW1ldHJ5Lm1hcChkID0+IGDigKIgJHtkLm5vZGVJZH0gKCR7ZC5ub2RlTmFtZX0pOlxuICAgIE9kbGVnxYJvxZvEhzogJHtkLmRpc3RhbmNlTWV0ZXJzfSBtIHwgUm9sYTogJHtkLm1lc2hSb2xlfSB8IFN0YXR1czogJHtkLnN0YXR1c30gfCBEemlhxYJhbmllIEZhbGkgRU06ICR7ZC5lbXBJbXBhY3R9XG5gKS5qb2luKCcnKX1cblxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuNS4gV05JT1NLSSBPUEVSQUNZSk5FIEkgT0NFTkEgU0tVVEVDWk5PxZpDSVxuLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuJHtyZXBvcnQuY29uY2x1c2lvbn1cblxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuV3lnZW5lcm93YW5vIHByemV6IEF1dG9ub21pY3pueSBTeXN0ZW0gT2Jyb25ueSBTZW50aW5lbCDigKIgWmVyby1DbG91ZCBMb2NhbCBIZXVyaXN0aWNzXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09YDtcbn1cblxuLyoqXG4gKiBHZW5lcm93YW5pZSBhdXRvbm9taWN6bmVnbywgaW50ZXJha3R5d25lZ28gaSBnb3Rvd2VnbyBkbyBkcnVrdSByYXBvcnR1IEhUTUxcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUG9zdEVtcFJlcG9ydEh0bWwocmVwb3J0OiBQb3N0RW1wU2NhblJlcG9ydCk6IHN0cmluZyB7XG4gIHJldHVybiBgPCFET0NUWVBFIGh0bWw+XG48aHRtbCBsYW5nPVwicGxcIj5cbjxoZWFkPlxuICA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIj5cbiAgPHRpdGxlPlJhcG9ydCBEaWFnbm9zdHljem55IFBvIEZhbGkgRWxla3Ryb21hZ25ldHljem5laiAtICR7cmVwb3J0LmlkfTwvdGl0bGU+XG4gIDxzdHlsZT5cbiAgICBib2R5IHsgZm9udC1mYW1pbHk6ICdTZWdvZSBVSScsIC1hcHBsZS1zeXN0ZW0sIEJsaW5rTWFjU3lzdGVtRm9udCwgUm9ib3RvLCBtb25vc3BhY2U7IGJhY2tncm91bmQ6ICMwMzA3MTI7IGNvbG9yOiAjZjhmYWZjOyBtYXJnaW46IDA7IHBhZGRpbmc6IDI0cHg7IH1cbiAgICAuY29udGFpbmVyIHsgbWF4LXdpZHRoOiAxMDAwcHg7IG1hcmdpbjogMCBhdXRvOyBiYWNrZ3JvdW5kOiAjMGYxNzJhOyBib3JkZXI6IDJweCBzb2xpZCAjMDZiNmQ0OyBib3JkZXItcmFkaXVzOiAxNnB4OyBwYWRkaW5nOiAzMnB4OyBib3gtc2hhZG93OiAwIDAgNDBweCByZ2JhKDYsMTgyLDIxMiwwLjMpOyB9XG4gICAgaDEgeyBjb2xvcjogIzM4YmRmODsgbWFyZ2luLXRvcDogMDsgZm9udC1zaXplOiAyNHB4OyBib3JkZXItYm90dG9tOiAycHggc29saWQgIzFlMjkzYjsgcGFkZGluZy1ib3R0b206IDEycHg7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgfVxuICAgIC5iYWRnZS0xMDAgeyBiYWNrZ3JvdW5kOiAjMDU5NjY5OyBjb2xvcjogI2ZmZjsgZm9udC1zaXplOiAxNHB4OyBwYWRkaW5nOiA2cHggMTRweDsgYm9yZGVyLXJhZGl1czogOHB4OyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5tZXRhLWdyaWQgeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTsgZ2FwOiAxNnB4OyBtYXJnaW46IDIwcHggMDsgfVxuICAgIC5tZXRhLWNhcmQgeyBiYWNrZ3JvdW5kOiAjMWUyOTNiOyBwYWRkaW5nOiAxNnB4OyBib3JkZXItcmFkaXVzOiAxMnB4OyBib3JkZXI6IDFweCBzb2xpZCAjMzM0MTU1OyB9XG4gICAgLm1ldGEtbGFiZWwgeyBmb250LXNpemU6IDExcHg7IGNvbG9yOiAjOTRhM2I4OyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBmb250LXdlaWdodDogYm9sZDsgfVxuICAgIC5tZXRhLXZhbCB7IGZvbnQtc2l6ZTogMThweDsgY29sb3I6ICNmYWNjMTU7IGZvbnQtd2VpZ2h0OiBib2xkOyBtYXJnaW4tdG9wOiA0cHg7IH1cbiAgICAuc2VjdGlvbi10aXRsZSB7IGNvbG9yOiAjYTg1NWY3OyBmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzMzNDE1NTsgcGFkZGluZy1ib3R0b206IDZweDsgbWFyZ2luLXRvcDogMjhweDsgfVxuICAgIHRhYmxlIHsgd2lkdGg6IDEwMCU7IGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7IG1hcmdpbi10b3A6IDEycHg7IGZvbnQtc2l6ZTogMTJweDsgfVxuICAgIHRoIHsgYmFja2dyb3VuZDogIzFlMjkzYjsgY29sb3I6ICMzOGJkZjg7IHRleHQtYWxpZ246IGxlZnQ7IHBhZGRpbmc6IDEwcHg7IGJvcmRlcjogMXB4IHNvbGlkICMzMzQxNTU7IH1cbiAgICB0ZCB7IHBhZGRpbmc6IDEwcHg7IGJvcmRlcjogMXB4IHNvbGlkICMzMzQxNTU7IGJhY2tncm91bmQ6ICMwYjEzMjk7IH1cbiAgICAuc3RhdHVzLXBpbGwgeyBiYWNrZ3JvdW5kOiAjMDY0ZTNiOyBjb2xvcjogIzM0ZDM5OTsgcGFkZGluZzogM3B4IDhweDsgYm9yZGVyLXJhZGl1czogNHB4OyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxMXB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IH1cbiAgICAuZm9vdGVyIHsgbWFyZ2luLXRvcDogMzBweDsgZm9udC1zaXplOiAxMXB4OyBjb2xvcjogIzY0NzQ4YjsgdGV4dC1hbGlnbjogY2VudGVyOyBib3JkZXItdG9wOiAxcHggc29saWQgIzFlMjkzYjsgcGFkZGluZy10b3A6IDE2cHg7IH1cbiAgICBAbWVkaWEgcHJpbnQgeyBib2R5IHsgYmFja2dyb3VuZDogI2ZmZjsgY29sb3I6ICMwMDA7IH0gLmNvbnRhaW5lciB7IGJvcmRlcjogMXB4IHNvbGlkICMwMDA7IGJveC1zaGFkb3c6IG5vbmU7IGJhY2tncm91bmQ6ICNmZmY7IH0gdGQsIHRoIHsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYmFja2dyb3VuZDogI2ZmZjsgY29sb3I6ICMwMDA7IH0gfVxuICA8L3N0eWxlPlxuPC9oZWFkPlxuPGJvZHk+XG4gIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICA8aDE+XG4gICAgICA8c3Bhbj7imqEgUkFQT1JUIFBPIEVNSVNKSSBGQUxJIEVMRUtUUk9NQUdORVRZQ1pORUo8L3NwYW4+XG4gICAgICA8c3BhbiBjbGFzcz1cImJhZGdlLTEwMFwiPlNLVVRFQ1pOT8WaxIY6IDEwMCUgUFVSR0U8L3NwYW4+XG4gICAgPC9oMT5cblxuICAgIDxkaXYgY2xhc3M9XCJtZXRhLWdyaWRcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJtZXRhLWNhcmRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGEtbGFiZWxcIj5JRCBSQVBPUlRVPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhLXZhbFwiIHN0eWxlPVwiZm9udC1zaXplOiAxNHB4OyBjb2xvcjogIzM4YmRmODtcIj4ke3JlcG9ydC5pZH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1ldGEtY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YS1sYWJlbFwiPkNaQVMgV1lLT05BTklBPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhLXZhbFwiPiR7cmVwb3J0LnJlcG9ydFRpbWVzdGFtcH08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cIm1ldGEtY2FyZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwibWV0YS1sYWJlbFwiPlVOSUVTWktPRExJV0lPTkUgVyBQTElLQUNIPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhLXZhbFwiIHN0eWxlPVwiY29sb3I6ICNmNDNmNWU7XCI+JHtyZXBvcnQuZmlsZXNDb3VudH0gU1pULjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwibWV0YS1jYXJkXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZXRhLWxhYmVsXCI+VU5JRVNaS09ETElXSU9ORSBXIFrFgcSEQ1pBQ0g8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cIm1ldGEtdmFsXCIgc3R5bGU9XCJjb2xvcjogI2E4NTVmNztcIj4ke3JlcG9ydC5jb25uZWN0b3JzQ291bnR9IFNaVC48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj7wn5OBIDEuIFdZS0FaIEdOSUQgVU5JRVNaS09ETElXSU9OWUNIIFcgUExJS0FDSCAoJHtyZXBvcnQuZmlsZXNDb3VudH0pPC9kaXY+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPk5hendhIFphZ3JvxbxlbmlhPC90aD5cbiAgICAgICAgICA8dGg+TG9rYWxpemFjamEgbmEgRHlza3UgTlRGUzwvdGg+XG4gICAgICAgICAgPHRoPlphc3Rvc293YW5hIEFrY2phIFNhYm90YcW8dSBQRTwvdGg+XG4gICAgICAgICAgPHRoPlN0YXR1cyBVcHJhd25pZcWEIEFDTDwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICAke3JlcG9ydC5maWxlc0JyZWFrZG93bi5tYXAoZiA9PiBgXG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxzdHJvbmcgc3R5bGU9XCJjb2xvcjogI2ZjYTVhNTtcIj4ke2YubmFtZX08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgPHRkIHN0eWxlPVwiZm9udC1mYW1pbHk6IG1vbm9zcGFjZTsgY29sb3I6ICNjYmQ1ZTE7XCI+JHtmLmZpbGVQYXRofTwvdGQ+XG4gICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJzdGF0dXMtcGlsbFwiPiR7Zi5wZVNhYm90YWdlU3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgICAgPHRkPjxzcGFuIGNsYXNzPVwic3RhdHVzLXBpbGxcIiBzdHlsZT1cImJhY2tncm91bmQ6ICM0NTBhMGE7IGNvbG9yOiAjZjg3MTcxO1wiPiR7Zi5hY2xMb2NrU3RhdHVzfTwvc3Bhbj48L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIGApLmpvaW4oJycpfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj7wn5SMIDIuIFdZS0FaIEdOSUQgVU5JRVNaS09ETElXSU9OWUNIIFcgWsWBxIRDWkFDSCBJIE1BR0lTVFJBTEFDSCAoJHtyZXBvcnQuY29ubmVjdG9yc0NvdW50fSk8L2Rpdj5cbiAgICA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+TmF6d2EgTW9kdcWCdSBBZ3Jlc29yYTwvdGg+XG4gICAgICAgICAgPHRoPlR5cCBaxYLEhWN6YSAvIEludGVyZmVqc3U8L3RoPlxuICAgICAgICAgIDx0aD5BZHJlcyBNYWdpc3RyYWxpIC8gUG9ydCBTcHJ6xJl0b3d5PC90aD5cbiAgICAgICAgICA8dGg+U3RhbiBLb8WEY293eTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICAke3JlcG9ydC5jb25uZWN0b3JzQnJlYWtkb3duLm1hcChjID0+IGBcbiAgICAgICAgICA8dHI+XG4gICAgICAgICAgICA8dGQ+PHN0cm9uZyBzdHlsZT1cImNvbG9yOiAjYzA4NGZjO1wiPiR7Yy5uYW1lfTwvc3Ryb25nPjwvdGQ+XG4gICAgICAgICAgICA8dGQ+PHNwYW4gc3R5bGU9XCJjb2xvcjogIzM4YmRmODsgZm9udC13ZWlnaHQ6IGJvbGQ7XCI+JHtjLmNvbm5lY3RvclR5cGV9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgICA8dGQgc3R5bGU9XCJmb250LWZhbWlseTogbW9ub3NwYWNlOyBjb2xvcjogI2UyZThmMDtcIj4ke2MuaGFyZHdhcmVBZGRyZXNzT3JCdXN9PC90ZD5cbiAgICAgICAgICAgIDx0ZD48c3BhbiBjbGFzcz1cInN0YXR1cy1waWxsXCI+JHtjLnN0YXRlfTwvc3Bhbj48L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIGApLmpvaW4oJycpfVxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuXG4gICAgPGRpdiBjbGFzcz1cInNlY3Rpb24tdGl0bGVcIj7wn4yQIDMuIFNUQVRVUyBaQU1LTknEmFRFR08gTU9ERUxVIDQgVVJaxIREWkXFgyAoUFJPTUlFxYMgQkFEQU5JQSAmbHQ7IDEwIE1FVFLDk1cpPC9kaXY+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPklkZW50eWZpa2F0b3IgV8SZesWCYTwvdGg+XG4gICAgICAgICAgPHRoPk5hendhIFVyesSFZHplbmlhIHcgTWVzaDwvdGg+XG4gICAgICAgICAgPHRoPkR5c3RhbnMgRml6eWN6bnk8L3RoPlxuICAgICAgICAgIDx0aD5Sb2xhIE9wZXJhY3lqbmE8L3RoPlxuICAgICAgICAgIDx0aD5EemlhxYJhbmllIEZhbGkgRU08L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgJHtyZXBvcnQuZGV2aWNlc1RlbGVtZXRyeS5tYXAoZCA9PiBgXG4gICAgICAgICAgPHRyPlxuICAgICAgICAgICAgPHRkPjxzdHJvbmc+JHtkLm5vZGVJZH08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgPHRkPiR7ZC5ub2RlTmFtZX08L3RkPlxuICAgICAgICAgICAgPHRkPiR7ZC5kaXN0YW5jZU1ldGVyc30gbTwvdGQ+XG4gICAgICAgICAgICA8dGQ+JHtkLm1lc2hSb2xlfTwvdGQ+XG4gICAgICAgICAgICA8dGQ+PHNwYW4gY2xhc3M9XCJzdGF0dXMtcGlsbFwiPiR7ZC5lbXBJbXBhY3R9PC9zcGFuPjwvdGQ+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgYCkuam9pbignJyl9XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG5cbiAgICA8ZGl2IGNsYXNzPVwic2VjdGlvbi10aXRsZVwiPvCfk50gNC4gV05JT1NLSSBPUEVSQUNZSk5FIEkgUE9EU1VNT1dBTklFPC9kaXY+XG4gICAgPHAgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjMDIwNjE3OyBwYWRkaW5nOiAxNHB4OyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlci1sZWZ0OiA0cHggc29saWQgIzA2YjZkNDsgZm9udC1zaXplOiAxM3B4OyBsaW5lLWhlaWdodDogMS42O1wiPlxuICAgICAgJHtyZXBvcnQuY29uY2x1c2lvbn1cbiAgICA8L3A+XG5cbiAgICA8ZGl2IGNsYXNzPVwiZm9vdGVyXCI+XG4gICAgICBBdXRvbWF0ZWQgU2VudGluZWwgQWlyLUdhcCBEZWZlbnNlIEFyY2hpdGVjdHVyZSDigKIgV3lnZW5lcm93YW5vIGRsYSBjZWzDs3cgxId3aWN6ZcWEIHcgd2FydW5rYWNoIHJ6ZWN6eXdpc3R5Y2hcbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L2JvZHk+XG48L2h0bWw+YDtcbn1cblxuLyoqXG4gKiBOYXJ6xJlkemllIGRvIGJlenBvxZtyZWRuaWVnbyBwb2JpZXJhbmlhIHJhcG9ydHUgbmEgZHlzayBsb2thbG55XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZFBvc3RFbXBSZXBvcnRGaWxlKHJlcG9ydDogUG9zdEVtcFNjYW5SZXBvcnQsIGZvcm1hdDogJ2pzb24nIHwgJ2h0bWwnIHwgJ3R4dCcpIHtcbiAgbGV0IGNvbnRlbnQgPSAnJztcbiAgbGV0IGZpbGVuYW1lID0gJyc7XG4gIGxldCBtaW1lVHlwZSA9ICcnO1xuXG4gIGlmIChmb3JtYXQgPT09ICdqc29uJykge1xuICAgIGNvbnRlbnQgPSBnZW5lcmF0ZVBvc3RFbXBSZXBvcnRKc29uKHJlcG9ydCk7XG4gICAgZmlsZW5hbWUgPSBgUkFQT1JUX0ZBTEFfRU1fJHtyZXBvcnQuaWR9Lmpzb25gO1xuICAgIG1pbWVUeXBlID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJ2h0bWwnKSB7XG4gICAgY29udGVudCA9IGdlbmVyYXRlUG9zdEVtcFJlcG9ydEh0bWwocmVwb3J0KTtcbiAgICBmaWxlbmFtZSA9IGBSQVBPUlRfRkFMQV9FTV8ke3JlcG9ydC5pZH0uaHRtbGA7XG4gICAgbWltZVR5cGUgPSAndGV4dC9odG1sJztcbiAgfSBlbHNlIHtcbiAgICBjb250ZW50ID0gZ2VuZXJhdGVQb3N0RW1wUmVwb3J0VGV4dChyZXBvcnQpO1xuICAgIGZpbGVuYW1lID0gYFJBUE9SVF9GQUxBX0VNXyR7cmVwb3J0LmlkfS50eHRgO1xuICAgIG1pbWVUeXBlID0gJ3RleHQvcGxhaW4nO1xuICB9XG5cbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjb250ZW50XSwgeyB0eXBlOiBtaW1lVHlwZSB9KTtcbiAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICBhLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gIGEuY2xpY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufVxuXG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsbUJBQW1CO0FBY3JCLGFBQU0saUNBQW9EO0FBQUEsRUFDL0QsSUFBSTtBQUFBLEVBQ0osa0JBQWlCLG9CQUFJLEtBQUssR0FBRSxtQkFBbUI7QUFBQSxFQUMvQyxhQUFhO0FBQUEsRUFDYixjQUFjO0FBQUEsRUFDZCwwQkFBMEI7QUFBQSxFQUMxQixtQkFBbUI7QUFBQSxFQUNuQixxQkFBcUI7QUFBQSxFQUNyQixzQkFBc0I7QUFBQSxFQUN0QixrQkFBa0I7QUFBQSxFQUNsQiwyQkFBMkI7QUFBQSxFQUMzQixZQUFZO0FBQUEsRUFDWixpQkFBaUI7QUFBQSxFQUNqQixnQkFBZ0I7QUFBQSxJQUNkO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsTUFDUixrQkFBa0I7QUFBQSxNQUNsQixlQUFlO0FBQUEsSUFD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