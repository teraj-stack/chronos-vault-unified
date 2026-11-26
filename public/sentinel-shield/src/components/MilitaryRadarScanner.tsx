import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useCallback = __vite__cjsImport1_react["useCallback"];
import { motion, AnimatePresence } from "/sentinel-shield/node_modules/.vite/deps/framer-motion.js?v=120be383";
import {
  Crosshair,
  Skull,
  Shield,
  ShieldCheck,
  Zap,
  Activity,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RefreshCw,
  Monitor,
  Cpu,
  Radio,
  CheckCircle2,
  Layers,
  Terminal,
  Target,
  Flame,
  Lock,
  Sparkles,
  Maximize2,
  Minimize2
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensor } from "/sentinel-shield/src/utils/gnidaAutoFreezeSensor.ts";
import { InteractiveDataFlowConnectionsMap } from "/sentinel-shield/src/components/InteractiveDataFlowConnectionsMap.tsx";
import { DesktopSweepWaveBackground } from "/sentinel-shield/src/components/DesktopSweepWaveBackground.tsx";
export function getGnidaThreatScore(gnida) {
  if (typeof gnida.threatScore === "number") {
    return Math.min(100, Math.max(1, gnida.threatScore));
  }
  switch (gnida.threatLevel) {
    case "EKSTREMALNY":
      return 96;
    case "KRYTYCZNY":
      return 84;
    case "WYSOKI":
      return 74;
    case "SREDNI":
    default:
      return 58;
  }
}
export function getThreatColor(score) {
  if (score >= 90) {
    return {
      hex: "#ff003c",
      glowHex: "rgba(255, 0, 60, 0.95)",
      tailwindText: "text-red-500",
      tailwindBorder: "border-red-500",
      tailwindBg: "bg-red-500/20",
      label: "EKSTREMALNY (90-100%)",
      pulseDuration: 0.75
    };
  } else if (score >= 80) {
    return {
      hex: "#f43f5e",
      glowHex: "rgba(244, 63, 94, 0.85)",
      tailwindText: "text-rose-500",
      tailwindBorder: "border-rose-500",
      tailwindBg: "bg-rose-500/20",
      label: "KRYTYCZNY (80-89%)",
      pulseDuration: 1.05
    };
  } else if (score >= 68) {
    return {
      hex: "#f97316",
      glowHex: "rgba(249, 115, 22, 0.8)",
      tailwindText: "text-orange-400",
      tailwindBorder: "border-orange-500",
      tailwindBg: "bg-orange-500/20",
      label: "WYSOKI (68-79%)",
      pulseDuration: 1.45
    };
  } else {
    return {
      hex: "#facc15",
      glowHex: "rgba(250, 204, 21, 0.75)",
      tailwindText: "text-yellow-400",
      tailwindBorder: "border-yellow-500",
      tailwindBg: "bg-yellow-500/20",
      label: "OSTRZEGAWCZY (50-67%)",
      pulseDuration: 1.9
    };
  }
}
export const INITIAL_SECURED_LAYERS = [
  {
    layerIndex: 0,
    name: "Warstwa 0: Rdzeń Monolitu (Kernel NT Ring-0)",
    depthRangeKm: "0 - 25 KM",
    minDistance: 0,
    maxDistance: 0.25,
    isSecured: true,
    stage: "FORTIFIED",
    shieldPercent: 100,
    laserIntensity: 90,
    activeBeamsCount: 4,
    cleansedNodesCount: 1,
    description: "Centralne jądro operacyjne, Dispatcher syscall i Kernel Guard."
  },
  {
    layerIndex: 1,
    name: "Warstwa 1: Pamięć RAM & Magistrale Magistralne",
    depthRangeKm: "25 - 50 KM",
    minDistance: 0.25,
    maxDistance: 0.5,
    isSecured: false,
    stage: "IDLE",
    shieldPercent: 35,
    laserIntensity: 0,
    activeBeamsCount: 0,
    cleansedNodesCount: 0,
    description: "Szyna pamięci RAM DDR5, strefy DLL i piaskownica NtSuspendProcess."
  },
  {
    layerIndex: 2,
    name: "Warstwa 2: Pulpit Monitora & Urządzenia I/O (HID)",
    depthRangeKm: "50 - 75 KM",
    minDistance: 0.5,
    maxDistance: 0.75,
    isSecured: false,
    stage: "IDLE",
    shieldPercent: 25,
    laserIntensity: 0,
    activeBeamsCount: 0,
    cleansedNodesCount: 0,
    description: "Bufor ramki DWM, pulpit monitora, klawiatura i wskaźnik myszy."
  },
  {
    layerIndex: 3,
    name: "Warstwa 3: Perymetr Sieciowy NIC & Magazyn NVMe",
    depthRangeKm: "75 - 100 KM",
    minDistance: 0.75,
    maxDistance: 1,
    isSecured: false,
    stage: "IDLE",
    shieldPercent: 15,
    laserIntensity: 0,
    activeBeamsCount: 0,
    cleansedNodesCount: 0,
    description: "Zewnętrzny perymetr sieciowy, zapora WFP i system plików dyskowych NTFS."
  }
];
export function getLayerIndexForDistance(distanceRatio) {
  if (distanceRatio <= 0.25) return 0;
  if (distanceRatio <= 0.5) return 1;
  if (distanceRatio <= 0.75) return 2;
  return 3;
}
const INITIAL_SYSTEM_IO_NODES = [
  {
    id: "node-monitor",
    name: "Monitor & Bufor Ramki (Display Pipeline)",
    code: "OUT-DWM-01",
    type: "OUTPUT",
    description: "Integralny pulpit nawigacyjny, menedżer okien DWM, Direct3D i strumień pikseli na ekran.",
    status: "COMPROMISED",
    xRatio: 50,
    yRatio: 18,
    radarAngleDeg: 0,
    radarRingRadius: 0.72,
    trafficBandwidth: "4K @ 144Hz (18.2 Gbps)",
    compromisedByGnidaId: "gnida-01",
    protectingBarrier: "TopMost Window Barrier & DirectFlip Sandbox",
    shieldLayerIndex: 2,
    isShielded: false
  },
  {
    id: "node-keyboard",
    name: "Klawiatura & Surowy Strumień HID (Raw Input)",
    code: "IN-KBD-02",
    type: "INPUT",
    description: "Sterownik i8042prt/USB HID, pętla zdarzeń klawiszy i kolejka WM_KEYDOWN.",
    status: "OPTIMAL",
    xRatio: 22,
    yRatio: 38,
    radarAngleDeg: 310,
    radarRingRadius: 0.65,
    trafficBandwidth: "1000 Hz Polling (64 B/s)",
    compromisedByGnidaId: null,
    protectingBarrier: "WH_KEYBOARD Hook Deflector",
    shieldLayerIndex: 2,
    isShielded: true
  },
  {
    id: "node-mouse",
    name: "Mysz & Wskaźnik Ekranowy (Pointer Engine)",
    code: "IN-PTR-03",
    type: "INPUT",
    description: "Kursor ekranowy, przechwytywanie fokusu myszy i granice ClipCursor.",
    status: "OPTIMAL",
    xRatio: 78,
    yRatio: 38,
    radarAngleDeg: 50,
    radarRingRadius: 0.65,
    trafficBandwidth: "8000 DPI (128 B/s)",
    compromisedByGnidaId: null,
    protectingBarrier: "Focus Theft Neutralizer",
    shieldLayerIndex: 2,
    isShielded: true
  },
  {
    id: "node-nic",
    name: "Karta Sieciowa NIC & Gniazda TCP/UDP",
    code: "IO-NIC-04",
    type: "INPUT_OUTPUT",
    description: "Interfejs sieciowy, wejście pakietów z internetu i wyjście eksfiltracji telemetrycznej.",
    status: "COMPROMISED",
    xRatio: 15,
    yRatio: 65,
    radarAngleDeg: 230,
    radarRingRadius: 0.85,
    trafficBandwidth: "2.5 Gbps Full-Duplex",
    compromisedByGnidaId: "gnida-03",
    protectingBarrier: "WFP Kernel Packet Firewall",
    shieldLayerIndex: 3,
    isShielded: false
  },
  {
    id: "node-ram",
    name: "Szyna Pamięci RAM & Mostek Pamięci Host",
    code: "BUS-RAM-05",
    type: "CORE_BUS",
    description: "Magistrala pamięci operacyjnej DDR5, przestrzeń adresowa jądra i bufor wstrzyknięć DLL.",
    status: "COMPROMISED",
    xRatio: 50,
    yRatio: 50,
    radarAngleDeg: 180,
    radarRingRadius: 0.35,
    trafficBandwidth: "64 GB/s (DDR5-6000)",
    compromisedByGnidaId: "gnida-04",
    protectingBarrier: "NtSuspendProcess Memory Sandbox",
    shieldLayerIndex: 1,
    isShielded: false
  },
  {
    id: "node-storage",
    name: "Subsystem Dyskowy NVMe & System Plików NTFS",
    code: "IO-NVME-06",
    type: "INPUT_OUTPUT",
    description: "Pamięć masowa, odczyt i zapis plików wykonywalnych PE, tablice MBR/GPT.",
    status: "COMPROMISED",
    xRatio: 85,
    yRatio: 65,
    radarAngleDeg: 130,
    radarRingRadius: 0.82,
    trafficBandwidth: "7400 MB/s Read / 6800 MB/s Write",
    compromisedByGnidaId: "gnida-02",
    protectingBarrier: "PE Header Sabotage & icacls Quarantine",
    shieldLayerIndex: 3,
    isShielded: false
  },
  {
    id: "node-usb",
    name: "Magistrala USB & Porty Peryferyjne",
    code: "IO-USB-07",
    type: "INPUT_OUTPUT",
    description: "Porty zewnętrzne USB-C / Thunderbolt, wektory fizycznego wprowadzania danych.",
    status: "OPTIMAL",
    xRatio: 30,
    yRatio: 82,
    radarAngleDeg: 200,
    radarRingRadius: 0.58,
    trafficBandwidth: "USB 4.0 (40 Gbps)",
    compromisedByGnidaId: null,
    protectingBarrier: "USB Device Descriptor Filter",
    shieldLayerIndex: 2,
    isShielded: true
  },
  {
    id: "node-audio",
    name: "Karta Dźwiękowa & Przetwornik Audio DAC",
    code: "OUT-AUD-08",
    type: "OUTPUT",
    description: "Wyjście sygnałów akustycznych, syntetyczne alarmy bojowe i bufor dźwiękowy.",
    status: "OPTIMAL",
    xRatio: 70,
    yRatio: 82,
    radarAngleDeg: 160,
    radarRingRadius: 0.58,
    trafficBandwidth: "32-bit / 192 kHz (HD Audio)",
    compromisedByGnidaId: null,
    protectingBarrier: "WASAPI Exclusive Stream Shield",
    shieldLayerIndex: 2,
    isShielded: true
  },
  {
    id: "node-kernel",
    name: "Dyspozytor Jądra & Pętla Komunikatów Win32",
    code: "CORE-NT-00",
    type: "CORE_BUS",
    description: "Centralny rdzeń monolityczny, obsługa wywołań systemowych syscall i kolejka GetMessage.",
    status: "OPTIMAL",
    xRatio: 50,
    yRatio: 35,
    radarAngleDeg: 90,
    radarRingRadius: 0.2,
    trafficBandwidth: "Ring 0 Dispatcher (0.1 ns)",
    compromisedByGnidaId: null,
    protectingBarrier: "PatchGuard & Kernel Guard Barrier",
    shieldLayerIndex: 0,
    isShielded: true
  }
];
const INITIAL_RADAR_GNIDAS = [
  {
    id: "gnida-01",
    name: "Gnida-01 [Nakładka Ekranowa Flutter]",
    gnidaType: "GNIDA_EKRANOWA",
    typeLabel: "Gnida Ekranowa (Screen Locker)",
    bearingDeg: 15,
    distanceRatio: 0.72,
    altitudeKm: 12.4,
    threatLevel: "EKSTREMALNY",
    threatScore: 96,
    state: "WYKRYTA",
    healthPercent: 100,
    associatedIONodeId: "node-monitor",
    signatureSha: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    activeProcessName: "flutter_screen_hijack.exe",
    aggressionDescription: "Wymusza stałe okno HWND_TOPMOST na monitorze, blokuje kursor myszy i wywłaszcza fokus pulpitu.",
    infectionVector: "Zainfekowana biblioteka komponentów okienkowych pub.dev / Supply Chain",
    velocity: 420
  },
  {
    id: "gnida-02",
    name: "Gnida-02 [Szyfrator Masowy BlackCat]",
    gnidaType: "GNIDA_SZYFRUJACA",
    typeLabel: "Gnida Szyfrująca (Ransomware)",
    bearingDeg: 135,
    distanceRatio: 0.8,
    altitudeKm: 18.2,
    threatLevel: "EKSTREMALNY",
    threatScore: 98,
    state: "WYKRYTA",
    healthPercent: 100,
    associatedIONodeId: "node-storage",
    signatureSha: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    activeProcessName: "blackcat_encryptor.exe",
    aggressionDescription: "Przejmuje wątki I/O dysku NVMe, szyfruje pliki binarne algorytmem ChaCha20 i niszczy kopie w tle.",
    infectionVector: "Zdalne wykonanie kodu przez podatność serwera VPN",
    velocity: 580
  },
  {
    id: "gnida-03",
    name: "Gnida-03 [Złodziej Danych RedLine]",
    gnidaType: "GNIDA_SZPIEGOWSKA",
    typeLabel: "Gnida Szpiegowska (Stealer)",
    bearingDeg: 225,
    distanceRatio: 0.83,
    altitudeKm: 9.8,
    threatLevel: "KRYTYCZNY",
    threatScore: 84,
    state: "WYKRYTA",
    healthPercent: 100,
    associatedIONodeId: "node-nic",
    signatureSha: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",
    activeProcessName: "redline_stealer_agent.exe",
    aggressionDescription: "Otwiera ukryte gniazda TCP do serwera C2 i eksfiltruje poświadczenia z przeglądarek oraz portfelów.",
    infectionVector: "Skompromitowany instalator oprogramowania z sieci P2P",
    velocity: 310
  },
  {
    id: "gnida-04",
    name: "Gnida-04 [Wstrzykiwacz Pamięci GhostHook]",
    gnidaType: "GNIDA_PASOZYTNICZA",
    typeLabel: "Gnida Pasożytnicza (Memory Hook)",
    bearingDeg: 175,
    distanceRatio: 0.38,
    altitudeKm: 14.1,
    threatLevel: "WYSOKI",
    threatScore: 76,
    state: "WYKRYTA",
    healthPercent: 100,
    associatedIONodeId: "node-ram",
    signatureSha: "cb4771694f4a3636f4007b8a733792cb153164998782a2080a290238053a4792",
    activeProcessName: "ghost_ram_injector.dll",
    aggressionDescription: "Wstrzykuje złośliwy kod do przestrzeni adresowej procesów systemowych (Process Hollowing).",
    infectionVector: "Podatność DLL Hijacking w zaufanej aplikacji lokalnej",
    velocity: 250
  },
  {
    id: "gnida-05",
    name: "Gnida-05 [Niszczyciel Dysków Hermetic]",
    gnidaType: "GNIDA_DESTRUKCYJNA",
    typeLabel: "Gnida Destrukcyjna (Disk Wiper)",
    bearingDeg: 285,
    distanceRatio: 0.65,
    altitudeKm: 22,
    threatLevel: "EKSTREMALNY",
    threatScore: 100,
    state: "WYKRYTA",
    healthPercent: 100,
    associatedIONodeId: "node-storage",
    signatureSha: "03c39385d38ff02a969b828bfebfa146e492b45070003cbba8d42cb3a95dcfc1",
    activeProcessName: "hermetic_mbr_wiper.sys",
    aggressionDescription: "Nadpisuje zerami sektor rozruchowy MBR oraz tablicę partycji NTFS, uniemożliwiając start systemu.",
    infectionVector: "Zainfekowana aktualizacja oprogramowania bazodanowego",
    velocity: 640
  }
];
export const MilitaryRadarScanner = () => {
  const [gnidas, setGnidas] = useState(() => {
    return safeStorage.get("sentinel_radar_gnidas", INITIAL_RADAR_GNIDAS);
  });
  const [ioNodes, setIoNodes] = useState(() => {
    return safeStorage.get("sentinel_radar_io_nodes", INITIAL_SYSTEM_IO_NODES);
  });
  const [securedLayers, setSecuredLayers] = useState(() => {
    return safeStorage.get("sentinel_radar_secured_layers", INITIAL_SECURED_LAYERS);
  });
  const [cascadeState, setCascadeState] = useState({
    stage: "IDLE",
    isActive: false,
    currentSectorName: "Rdzeń Monolitu (Warstwa 0)",
    currentBearingDeg: 0,
    currentDistanceRatio: 0.2,
    activeLaserOrigin: null,
    activeLaserTargets: [],
    securedLayers: INITIAL_SECURED_LAYERS,
    totalMalwareExterminated: false,
    overallFortressShieldPercent: 45,
    statusMessage: "Gotowość kaskadowej bariery antywirusowej: 0 ms natychmiastowa blokada ➔ Laser sektorowy ➔ Propagacja na sąsiednie warstwy."
  });
  const [hunterState, setHunterState] = useState({
    callsign: "GEMINI-HUNTER-01",
    bearingDeg: 45,
    distanceRatio: 0.25,
    targetGnidaId: null,
    status: "PATROL",
    repairProgress: 45,
    slaughterPower: 98,
    interceptSpeed: 820,
    killsCount: 0,
    fixedNodesCount: 0
  });
  const [isScanning, setIsScanning] = useState(true);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [sweepSpeedRpm, setSweepSpeedRpm] = useState(24);
  const [selectedTargetId, setSelectedTargetId] = useState("gnida-01");
  const [activeViewMode, setActiveViewMode] = useState("RADAR_PPI");
  const [radarRangeKm, setRadarRangeKm] = useState(100);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [autoPurgeActive, setAutoPurgeActive] = useState(false);
  const [isDesktopSweepWaveActive, setIsDesktopSweepWaveActive] = useState(true);
  const [sweepWaveSpeedSeconds, setSweepWaveSpeedSeconds] = useState(3.5);
  const [manualSweepWaveTriggerCount, setManualSweepWaveTriggerCount] = useState(0);
  const [activeDoomRay, setActiveDoomRay] = useState(null);
  const [isRadarEnlarged, setIsRadarEnlarged] = useState(false);
  const [doomRayPreset, setDoomRayPreset] = useState("940THZ_CONTINUOUS");
  const [screenFlashActive, setScreenFlashActive] = useState(false);
  const [totalDoomKills, setTotalDoomKills] = useState(0);
  const particlesRef = useRef([]);
  const [combatLogs, setCombatLogs] = useState([
    `[SYS-BOOT] Inicjalizacja Radaru Wojskowego Monolitu Systemowego (Pasmo X / 9.4 GHz)`,
    `[MONOLITH] Zmapowano 9 węzłów wejścia/wyjścia (I/O) z integracją pulpitu monitora.`,
    `[PROMIEŃ-ZAGŁADY] Generator Wiązki Eksterminacji 940.8 THz w trybie natychmiastowej gotowości (0 ms).`,
    `[BARIERA-KASKADOWA] Gotowość 4-stopniowego systemu kordonu: 0 ms ➔ Laser ➔ Sąsiednie Warstwy ➔ Trwałe Zabezpieczenie.`,
    `[GEMINI-AI] Łowca Gemini nawiązał łączność z radiolatarnią. Gotowość bojowa do uboju Gnid: 100%.`,
    `[CZUJNIK-GNID] Autonomiczny czujnik i daemon natychmiastowego auto-freezu (0 ms NtSuspendProcess) AKTYWNY.`
  ]);
  const [sensorStatus, setSensorStatus] = useState(() => gnidaSensor.getStatus());
  useEffect(() => {
    const unsubscribe = gnidaSensor.subscribe((status) => {
      setSensorStatus(status);
    });
    const handleAutoFrozenEvent = (e) => {
      const detail = e.detail;
      if (detail) {
        addCombatLog(`[⚡ CZUJNIK GNID - AUTO-FREEZE] Natychmiastowe zamrożenie w RAM (0 ms): ${detail.targetName} -> Węzeł I/O przywrócony!`);
        addCombatLog(`[🔊 ACOUSTIC ALERT] Emisja nieinwazyjnego tonu haptycznego Web Audio API (58 Hz sub-bass) dla procesu: ${detail.targetName}`);
        const currentGnidas = safeStorage.get("sentinel_radar_gnidas", []);
        const currentNodes = safeStorage.get("sentinel_radar_io_nodes", []);
        if (currentGnidas.length) setGnidas(currentGnidas);
        if (currentNodes.length) setIoNodes(currentNodes);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("sentinel:gnida-auto-frozen", handleAutoFrozenEvent);
    }
    return () => {
      unsubscribe();
      if (typeof window !== "undefined") {
        window.removeEventListener("sentinel:gnida-auto-frozen", handleAutoFrozenEvent);
      }
    };
  }, []);
  const canvasRef = useRef(null);
  const audioCtxRef = useRef(null);
  const playRadarTone = useCallback((freq, durationMs, type = "sine") => {
    if (!isAudioEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
        gain.gain.setValueAtTime(0.04, audioCtxRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(1e-4, audioCtxRef.current.currentTime + durationMs / 1e3);
        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();
        osc.stop(audioCtxRef.current.currentTime + durationMs / 1e3);
      }
    } catch {
    }
  }, [isAudioEnabled]);
  const playDoomRayAudio = useCallback((mode = "SINGLE") => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const oscBeam = ctx.createOscillator();
      const gainBeam = ctx.createGain();
      oscBeam.type = "sawtooth";
      oscBeam.frequency.setValueAtTime(mode === "SALVO" ? 1420 : 940.8, now);
      oscBeam.frequency.exponentialRampToValueAtTime(180, now + (mode === "SALVO" ? 0.9 : 0.6));
      gainBeam.gain.setValueAtTime(0.25, now);
      gainBeam.gain.exponentialRampToValueAtTime(1e-3, now + (mode === "SALVO" ? 0.95 : 0.65));
      oscBeam.connect(gainBeam);
      gainBeam.connect(ctx.destination);
      oscBeam.start(now);
      oscBeam.stop(now + (mode === "SALVO" ? 1 : 0.7));
      const oscBass = ctx.createOscillator();
      const gainBass = ctx.createGain();
      oscBass.type = "triangle";
      oscBass.frequency.setValueAtTime(mode === "SALVO" ? 80 : 55, now);
      oscBass.frequency.exponentialRampToValueAtTime(25, now + (mode === "SALVO" ? 1.1 : 0.75));
      gainBass.gain.setValueAtTime(0.35, now);
      gainBass.gain.exponentialRampToValueAtTime(1e-3, now + (mode === "SALVO" ? 1.15 : 0.8));
      oscBass.connect(gainBass);
      gainBass.connect(ctx.destination);
      oscBass.start(now);
      oscBass.stop(now + (mode === "SALVO" ? 1.2 : 0.85));
      const oscCrackle = ctx.createOscillator();
      const gainCrackle = ctx.createGain();
      oscCrackle.type = "square";
      oscCrackle.frequency.setValueAtTime(2400, now);
      oscCrackle.frequency.exponentialRampToValueAtTime(450, now + 0.35);
      gainCrackle.gain.setValueAtTime(0.12, now);
      gainCrackle.gain.exponentialRampToValueAtTime(1e-3, now + 0.4);
      oscCrackle.connect(gainCrackle);
      gainCrackle.connect(ctx.destination);
      oscCrackle.start(now);
      oscCrackle.stop(now + 0.42);
    } catch {
    }
  }, []);
  const selectedGnida = useMemo(() => {
    return gnidas.find((g) => g.id === selectedTargetId) || gnidas[0] || null;
  }, [gnidas, selectedTargetId]);
  const addCombatLog = useCallback((msg) => {
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setCombatLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 59)]);
  }, []);
  const spawnExplosionParticles = useCallback((x, y, count = 35, color = "#ff0055") => {
    const newParticles = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 2;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: Math.random() * 0.4 + 0.5,
        color: i % 2 === 0 ? color : i % 3 === 0 ? "#00ffff" : "#ffffff",
        size: Math.random() * 3 + 1.5
      });
    }
    particlesRef.current = [...particlesRef.current, ...newParticles];
  }, []);
  useEffect(() => {
    let animFrame;
    let lastTimestamp = performance.now();
    const renderLoop = (timestamp) => {
      const deltaSec = (timestamp - lastTimestamp) / 1e3;
      lastTimestamp = timestamp;
      if (isScanning) {
        const degPerSec = sweepSpeedRpm * 360 / 60;
        setSweepAngle((prev) => {
          const next = (prev + degPerSec * deltaSec) % 360;
          return next;
        });
      }
      animFrame = requestAnimationFrame(renderLoop);
    };
    animFrame = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [isScanning, sweepSpeedRpm]);
  const triggerAntivirusCascade = useCallback((targetGnida) => {
    const targetLayerIdx = getLayerIndexForDistance(targetGnida.distanceRatio);
    playRadarTone(950, 180, "square");
    addCombatLog(`[🛡️ BARIERA NATYCHMIASTOWA - 0 ms] Kordon sanitarny aktywowany w sektorze ${targetGnida.name}! Pamięć RAM, rejestry i magistrala ${targetGnida.associatedIONodeId} zablokowane.`);
    setGnidas((prev) => prev.map((g) => g.id === targetGnida.id ? { ...g, state: "ZNISZCZONA", healthPercent: 0 } : g));
    setIoNodes((prev) => prev.map((n) => n.id === targetGnida.associatedIONodeId ? { ...n, status: "RECONSTRUCTED", isShielded: true, compromisedByGnidaId: null } : n));
    setSecuredLayers((prev) => prev.map((l) => {
      if (l.layerIndex === targetLayerIdx) {
        return {
          ...l,
          isSecured: true,
          stage: "IMMEDIATE_LOCK",
          shieldPercent: Math.min(100, l.shieldPercent + 35),
          cleansedNodesCount: l.cleansedNodesCount + 1,
          securedTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
        };
      }
      return l;
    }));
    setCascadeState({
      stage: "IMMEDIATE_LOCK",
      isActive: true,
      currentSectorName: targetGnida.name,
      currentBearingDeg: targetGnida.bearingDeg,
      currentDistanceRatio: targetGnida.distanceRatio,
      cleansedGnidaName: targetGnida.name,
      activeLaserOrigin: { x: targetGnida.bearingDeg, y: targetGnida.distanceRatio, angle: targetGnida.bearingDeg },
      activeLaserTargets: [],
      securedLayers,
      totalMalwareExterminated: false,
      overallFortressShieldPercent: 65,
      statusMessage: `[KROK 1: 0 ms] Natychmiastowy kordon sanitarny postawiony w sektorze ${targetGnida.bearingDeg}°.`
    });
    setTimeout(() => {
      playRadarTone(1250, 300, "sawtooth");
      addCombatLog(`[⚡ LASER OBRONY AKTYWNEJ] Zogniskowana wiązka laserowa z aktualnego sektora ${targetGnida.bearingDeg}° wypala wszelkie pozostałości kodu malware.`);
      setSecuredLayers((prev) => prev.map((l) => {
        if (l.layerIndex === targetLayerIdx) {
          return {
            ...l,
            stage: "SECTOR_LASER",
            laserIntensity: 100,
            activeBeamsCount: l.activeBeamsCount + 3,
            shieldPercent: Math.min(100, l.shieldPercent + 20)
          };
        }
        return l;
      }));
      setCascadeState((prev) => ({
        ...prev,
        stage: "SECTOR_LASER",
        statusMessage: `[KROK 2] Laser obrony aktywnej wypala wektor infekcji w sektorze ${targetGnida.bearingDeg}°.`
      }));
      setTimeout(() => {
        const neighborLayers = [
          Math.max(0, targetLayerIdx - 1),
          Math.min(3, targetLayerIdx + 1)
        ].filter((idx) => idx !== targetLayerIdx);
        playRadarTone(750, 400, "triangle");
        const neighborNames = neighborLayers.map((idx) => `Warstwa ${idx}`).join(" oraz ");
        addCombatLog(`[🌐 KASKADA WARSTWOWA] Propagacja bariery antywirusowej na sąsiednie warstwy: ${neighborNames}. Siatka laserowa zsynchronizowana.`);
        setIoNodes((prev) => prev.map((node) => {
          const nodeLayer = typeof node.shieldLayerIndex === "number" ? node.shieldLayerIndex : 2;
          if (neighborLayers.includes(nodeLayer) || nodeLayer === targetLayerIdx) {
            return { ...node, isShielded: true };
          }
          return node;
        }));
        setSecuredLayers((prev) => prev.map((l) => {
          if (neighborLayers.includes(l.layerIndex)) {
            return {
              ...l,
              isSecured: true,
              stage: "NEIGHBOR_CASCADE",
              shieldPercent: Math.min(100, l.shieldPercent + 45),
              laserIntensity: 85,
              activeBeamsCount: 2
            };
          }
          return l;
        }));
        setCascadeState((prev) => ({
          ...prev,
          stage: "NEIGHBOR_CASCADE",
          statusMessage: `[KROK 3] Kaskadowe sprzężenie tarczy na sąsiednie warstwy (${neighborNames}).`
        }));
        setTimeout(() => {
          setSecuredLayers((prev) => {
            const currentGnidas = safeStorage.get("sentinel_radar_gnidas", gnidas);
            const remaining = currentGnidas.filter((g) => g.id !== targetGnida.id && g.state !== "ZNISZCZONA");
            const isTotal = remaining.length === 0;
            const updatedLayers = prev.map((l) => ({
              ...l,
              stage: "FORTIFIED",
              shieldPercent: isTotal ? 100 : Math.max(l.shieldPercent, l.isSecured ? 95 : 30),
              isSecured: isTotal ? true : l.isSecured
            }));
            if (isTotal) {
              playRadarTone(1100, 600, "triangle");
              addCombatLog(`[🏆 CAŁKOWITA EKSTERMINACJA MALWARE] Wszystkie 4 warstwy systemowe objęte permanentną barierą antywirusową. Zagrożenie w 100% wyeliminowane!`);
              setCascadeState((c) => ({
                ...c,
                stage: "FORTIFIED",
                totalMalwareExterminated: true,
                overallFortressShieldPercent: 100,
                statusMessage: "👑 Monolit w 100% zabezpieczony. Trwała bariera laserowa i kordon kwarantanny aktywne na wszystkich 4 warstwach!"
              }));
            } else {
              setCascadeState((c) => ({
                ...c,
                stage: "FORTIFIED",
                totalMalwareExterminated: false,
                overallFortressShieldPercent: Math.min(95, c.overallFortressShieldPercent + 12),
                statusMessage: `Oczyszczony obszar trwale zabezpieczony barierą antywirusową do momentu całkowitej eksterminacji malware. Pozostało celów: ${remaining.length}.`
              }));
            }
            return updatedLayers;
          });
        }, 550);
      }, 480);
    }, 380);
  }, [gnidas, playRadarTone, addCombatLog, securedLayers]);
  const triggerFullExterminationCascade = () => {
    addCombatLog(`[PROTOKÓŁ WOJSKOWY] Uruchomiono procedurę Całkowitej Eksterminacji Malware z Kaskadą Barier i Siatką Laserową.`);
    playRadarTone(1300, 500, "square");
    setAutoPurgeActive(true);
    const activeTargets = gnidas.filter((g) => g.state !== "ZNISZCZONA");
    if (activeTargets.length === 0) {
      setSecuredLayers((prev) => prev.map((l) => ({
        ...l,
        isSecured: true,
        stage: "FORTIFIED",
        shieldPercent: 100,
        laserIntensity: 100,
        activeBeamsCount: 4
      })));
      setCascadeState((c) => ({
        ...c,
        stage: "FORTIFIED",
        totalMalwareExterminated: true,
        overallFortressShieldPercent: 100,
        statusMessage: "👑 Wszystkie 4 warstwy monolitu w 100% zabezpieczone kordonem pancernym i laserem."
      }));
      return;
    }
    triggerAntivirusCascade(activeTargets[0]);
  };
  const handleFireDoomRayOnTarget = useCallback((targetGnida) => {
    if (!targetGnida || targetGnida.state === "ZNISZCZONA") return;
    playDoomRayAudio("SINGLE");
    setScreenFlashActive(true);
    setTimeout(() => setScreenFlashActive(false), 240);
    const canvas = canvasRef.current;
    if (canvas) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;
      const targetRad = (targetGnida.bearingDeg - 90) * (Math.PI / 180);
      const targetDist = radius * targetGnida.distanceRatio;
      const tx = centerX + targetDist * Math.cos(targetRad);
      const ty = centerY + targetDist * Math.sin(targetRad);
      spawnExplosionParticles(tx, ty, 45, "#ff0055");
    }
    setActiveDoomRay({
      isActive: true,
      mode: "SINGLE",
      targetGnidaIds: [targetGnida.id],
      powerMw: 5.95,
      frequencyThz: 940.8,
      startedAt: Date.now(),
      durationMs: 1400,
      intensity: 100,
      logMessage: `[⚡ PROMIEŃ ZAGŁADY 940.8 THz] Spopielenie Gnidy ${targetGnida.name}! NtSuspendProcess + zerowanie bajtów PE.`
    });
    addCombatLog(`[⚡ PROMIEŃ ZAGŁADY 940.8 THz] SPOPIELENIE GNIDY: ${targetGnida.name}! Zniszczono proces ${targetGnida.activeProcessName}, odzyskano węzeł ${targetGnida.associatedIONodeId}.`);
    setTotalDoomKills((prev) => prev + 1);
    setTimeout(() => {
      setActiveDoomRay(null);
    }, 1400);
    triggerAntivirusCascade(targetGnida);
  }, [playDoomRayAudio, spawnExplosionParticles, addCombatLog, triggerAntivirusCascade]);
  const handleFireDoomRaySalvoAll = useCallback(() => {
    const liveTargets = gnidas.filter((g) => g.state !== "ZNISZCZONA");
    if (liveTargets.length === 0) {
      addCombatLog(`[PROMIEŃ ZAGŁADY - SALWA] Brak wrogich celów na radarze. Wszystkie sektory są czyste.`);
      return;
    }
    playDoomRayAudio("SALVO");
    setScreenFlashActive(true);
    setTimeout(() => setScreenFlashActive(false), 380);
    const canvas = canvasRef.current;
    if (canvas) {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;
      liveTargets.forEach((t) => {
        const targetRad = (t.bearingDeg - 90) * (Math.PI / 180);
        const targetDist = radius * t.distanceRatio;
        const tx = centerX + targetDist * Math.cos(targetRad);
        const ty = centerY + targetDist * Math.sin(targetRad);
        spawnExplosionParticles(tx, ty, 30, "#ff003c");
      });
    }
    const targetIds = liveTargets.map((t) => t.id);
    setActiveDoomRay({
      isActive: true,
      mode: "SALVO_ALL",
      targetGnidaIds: targetIds,
      powerMw: 24.8,
      frequencyThz: 940.8,
      startedAt: Date.now(),
      durationMs: 1800,
      intensity: 100,
      logMessage: `[💥 SALWA ZAGŁADY] Jednoczesny wystrzał wiązek plazmowych do ${liveTargets.length} Gnid! Całkowite oczyszczenie monolitu.`
    });
    addCombatLog(`[💥 SALWA ZAGŁADY] WYPALENIE WSZYSTKICH GNID! Wyemitowano ${liveTargets.length} wiązek 940.8 THz. Wszystkie procesy zamrożone w 0 ms.`);
    setTotalDoomKills((prev) => prev + liveTargets.length);
    setGnidas((prev) => prev.map((g) => ({ ...g, state: "ZNISZCZONA", healthPercent: 0 })));
    setIoNodes((prev) => prev.map((n) => ({ ...n, status: "RECONSTRUCTED", isShielded: true, compromisedByGnidaId: null })));
    setSecuredLayers((prev) => prev.map((l) => ({
      ...l,
      isSecured: true,
      stage: "FORTIFIED",
      shieldPercent: 100,
      laserIntensity: 100,
      activeBeamsCount: 4,
      securedTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    })));
    setCascadeState({
      stage: "FORTIFIED",
      isActive: true,
      currentSectorName: "Cały Monolit Systemowy",
      currentBearingDeg: 0,
      currentDistanceRatio: 1,
      cleansedGnidaName: "Wszystkie Gnidy",
      activeLaserOrigin: null,
      activeLaserTargets: [],
      securedLayers: INITIAL_SECURED_LAYERS.map((l) => ({ ...l, isSecured: true, shieldPercent: 100, stage: "FORTIFIED" })),
      totalMalwareExterminated: true,
      overallFortressShieldPercent: 100,
      statusMessage: "👑 SALWA ZAGŁADY: Wszystkie 4 warstwy systemowe w 100% oczyszczone i permanentnie zabezpieczone!"
    });
    setTimeout(() => {
      setActiveDoomRay(null);
    }, 1800);
  }, [gnidas, playDoomRayAudio, spawnExplosionParticles, addCombatLog]);
  const handleKillGnidaRetro100Copies = useCallback((targetGnida) => {
    if (!targetGnida) return;
    playDoomRayAudio("SINGLE");
    setScreenFlashActive(true);
    setTimeout(() => setScreenFlashActive(false), 200);
    addCombatLog(`[❄️ RETRO FREEZE 100 KOPII] Wstrzyknięto NtSuspendProcess do drzewa PID gnidy ${targetGnida.name}. Zamrożono 100 kopii wstecz lineage.`);
    handleFireDoomRayOnTarget(targetGnida);
  }, [playDoomRayAudio, addCombatLog, handleFireDoomRayOnTarget]);
  const handleDefragmentMalwareCode = useCallback((targetGnida) => {
    if (!targetGnida) return;
    playDoomRayAudio("SINGLE");
    setScreenFlashActive(true);
    setTimeout(() => setScreenFlashActive(false), 200);
    addCombatLog(`[🧩 DEFRAGMENTACJA KODU] VirtualProtect(PAGE_NOACCESS) + zerowanie nagłówków PE dla ${targetGnida.activeProcessName}. Wyzerowano 100% stron pamięci.`);
    handleFireDoomRayOnTarget(targetGnida);
  }, [playDoomRayAudio, addCombatLog, handleFireDoomRayOnTarget]);
  useEffect(() => {
    if (!autoPurgeActive) return;
    const interval = setInterval(() => {
      const activeTargets = gnidas.filter((g) => g.state !== "ZNISZCZONA");
      if (activeTargets.length === 0) {
        setAutoPurgeActive(false);
        setHunterState((prev) => ({
          ...prev,
          status: "PATROL",
          targetGnidaId: null,
          repairProgress: 100
        }));
        addCombatLog(`[SEKTOR OCZYSZCZONY] Wszystkie Gnidy zostały w 100% zlikwidowane. Monolit systemowy i monitor bezpieczne.`);
        playRadarTone(880, 400, "triangle");
        return;
      }
      const currentTarget = activeTargets[0];
      setHunterState((prev) => {
        const angleDiff = (currentTarget.bearingDeg - prev.bearingDeg + 360) % 360;
        const stepAngle = angleDiff > 180 ? -12 : 12;
        const newAngle = (prev.bearingDeg + stepAngle + 360) % 360;
        const newDist = prev.distanceRatio + (currentTarget.distanceRatio - prev.distanceRatio) * 0.35;
        return {
          ...prev,
          bearingDeg: newAngle,
          distanceRatio: newDist,
          targetGnidaId: currentTarget.id,
          status: "LOCK_ON",
          activeBeamAngle: currentTarget.bearingDeg
        };
      });
      setGnidas((prevGnidas) => {
        return prevGnidas.map((g) => {
          if (g.id !== currentTarget.id) return g;
          if (g.state === "WYKRYTA") {
            addCombatLog(`[ŁOWCA GEMINI] Namierzenie wiązką radarową: ${g.name} (Węzeł: ${g.associatedIONodeId})`);
            playRadarTone(600, 150, "sawtooth");
            return { ...g, state: "NAMIERZONA" };
          } else if (g.state === "NAMIERZONA") {
            addCombatLog(`[OSTRZAŁ RAM] NtSuspendProcess wstrzyknięty do ${g.activeProcessName}. Wątki zamrożone.`);
            playRadarTone(750, 180, "square");
            return { ...g, state: "OSTRZAL_W_TOKU", healthPercent: 50 };
          } else if (g.state === "OSTRZAL_W_TOKU") {
            setTimeout(() => {
              triggerAntivirusCascade(g);
            }, 50);
            setHunterState((h) => ({
              ...h,
              killsCount: h.killsCount + 1,
              fixedNodesCount: h.fixedNodesCount + 1,
              repairProgress: Math.min(100, h.repairProgress + 15)
            }));
            return { ...g, state: "ZNISZCZONA", healthPercent: 0 };
          }
          return g;
        });
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [autoPurgeActive, gnidas, addCombatLog, playRadarTone, triggerAntivirusCascade]);
  useEffect(() => {
    safeStorage.set("sentinel_radar_gnidas", gnidas);
    safeStorage.set("sentinel_radar_io_nodes", ioNodes);
    safeStorage.set("sentinel_radar_secured_layers", securedLayers);
  }, [gnidas, ioNodes, securedLayers]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 24;
    ctx.fillStyle = "#020604";
    ctx.fillRect(0, 0, width, height);
    const radialGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
    radialGrad.addColorStop(0, "rgba(0, 45, 20, 0.75)");
    radialGrad.addColorStop(0.65, "rgba(0, 25, 10, 0.88)");
    radialGrad.addColorStop(1, "rgba(1, 12, 5, 0.99)");
    ctx.fillStyle = radialGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    const ringFractions = [0.25, 0.5, 0.75, 1];
    const ringLabels = ["25 KM (Rdzeń NT)", "50 KM (Pamięć RAM)", "75 KM (Monitor & I/O)", "100 KM (Perymetr)"];
    securedLayers.forEach((layer, idx) => {
      if (layer.isSecured) {
        const innerR = idx === 0 ? 0 : radius * ringFractions[idx - 1];
        const outerR = radius * ringFractions[idx];
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2);
        if (innerR > 0) {
          ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2, true);
        }
        ctx.closePath();
        if (layer.stage === "IMMEDIATE_LOCK") {
          ctx.fillStyle = "rgba(0, 255, 200, 0.18)";
        } else if (layer.stage === "SECTOR_LASER") {
          ctx.fillStyle = "rgba(0, 240, 255, 0.25)";
        } else if (layer.stage === "NEIGHBOR_CASCADE") {
          ctx.fillStyle = "rgba(16, 185, 129, 0.22)";
        } else {
          ctx.fillStyle = "rgba(5, 150, 105, 0.14)";
        }
        ctx.fill();
        ctx.restore();
      }
    });
    ringFractions.forEach((frac, idx) => {
      const r = radius * frac;
      const layer = securedLayers[idx];
      const isSecured = layer?.isSecured;
      ctx.beginPath();
      ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
      ctx.strokeStyle = isSecured ? "rgba(0, 255, 200, 0.85)" : idx === 3 ? "rgba(0, 255, 100, 0.6)" : "rgba(0, 255, 100, 0.25)";
      ctx.lineWidth = isSecured ? 2.5 : idx === 3 ? 2 : 1;
      ctx.setLineDash(idx === 3 || isSecured ? [] : [4, 4]);
      if (isSecured) {
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 10;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = isSecured ? "#00ffcc" : "rgba(0, 255, 100, 0.7)";
      const statusSuffix = isSecured ? ` [🛡️ ${layer.shieldPercent}% TARCZA]` : "";
      ctx.fillText(`${ringLabels[idx]}${statusSuffix}`, centerX + 8, centerY - r + 12);
    });
    for (let deg = 0; deg < 360; deg += 15) {
      const isCardinal = deg % 90 === 0;
      const isMajor = deg % 45 === 0;
      const rad = (deg - 90) * (Math.PI / 180);
      const xEnd = centerX + radius * Math.cos(rad);
      const yEnd = centerY + radius * Math.sin(rad);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = isCardinal ? "rgba(0, 255, 150, 0.45)" : isMajor ? "rgba(0, 255, 100, 0.22)" : "rgba(0, 255, 100, 0.08)";
      ctx.lineWidth = isCardinal ? 1.8 : isMajor ? 1 : 0.5;
      ctx.stroke();
      if (deg % 30 === 0) {
        const labelDist = radius + 14;
        const xLbl = centerX + labelDist * Math.cos(rad);
        const yLbl = centerY + labelDist * Math.sin(rad);
        ctx.font = isCardinal ? 'bold 10px "JetBrains Mono", monospace' : '9px "JetBrains Mono", monospace';
        ctx.fillStyle = isCardinal ? "#5eead4" : "rgba(0, 255, 100, 0.6)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        let labelText = `${deg}°`;
        if (deg === 0) labelText = "0° N";
        else if (deg === 90) labelText = "90° E";
        else if (deg === 180) labelText = "180° S";
        else if (deg === 270) labelText = "270° W";
        ctx.fillText(labelText, xLbl, yLbl);
      }
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#00ffcc";
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 16, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(0, 255, 200, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
    if (cascadeState.isActive && (cascadeState.stage === "SECTOR_LASER" || cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "IMMEDIATE_LOCK")) {
      const targetRad = (cascadeState.currentBearingDeg - 90) * (Math.PI / 180);
      const targetDist = radius * cascadeState.currentDistanceRatio;
      const tx = centerX + targetDist * Math.cos(targetRad);
      const ty = centerY + targetDist * Math.sin(targetRad);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = cascadeState.stage === "SECTOR_LASER" ? "#ff0055" : "#00ffff";
      ctx.lineWidth = 4;
      ctx.shadowColor = cascadeState.stage === "SECTOR_LASER" ? "#ff0055" : "#00ffff";
      ctx.shadowBlur = 25;
      ctx.stroke();
      ctx.shadowBlur = 0;
      const arcStart = targetRad - 0.4;
      const arcEnd = targetRad + 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, targetDist, arcStart, arcEnd);
      ctx.strokeStyle = "rgba(0, 255, 240, 0.9)";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 18;
      ctx.stroke();
      ctx.shadowBlur = 0;
      if (cascadeState.stage === "NEIGHBOR_CASCADE") {
        [-0.3, 0.3].forEach((offset) => {
          const spokeRad = targetRad + offset;
          const sx = centerX + radius * 0.9 * Math.cos(spokeRad);
          const sy = centerY + radius * 0.9 * Math.sin(spokeRad);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(sx, sy);
          ctx.strokeStyle = "rgba(52, 211, 153, 0.85)";
          ctx.lineWidth = 2.5;
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 14;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      }
    }
    if (activeDoomRay && activeDoomRay.isActive) {
      const targetIds = activeDoomRay.targetGnidaIds;
      targetIds.forEach((tId) => {
        const target = gnidas.find((g) => g.id === tId);
        if (!target) return;
        const targetRad = (target.bearingDeg - 90) * (Math.PI / 180);
        const targetDist = radius * target.distanceRatio;
        const tx = centerX + targetDist * Math.cos(targetRad);
        const ty = centerY + targetDist * Math.sin(targetRad);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = activeDoomRay.mode === "RETRO_100" ? "rgba(0, 240, 255, 0.5)" : "rgba(255, 0, 70, 0.55)";
        ctx.lineWidth = 14;
        ctx.shadowColor = activeDoomRay.mode === "RETRO_100" ? "#00ffff" : "#ff0055";
        ctx.shadowBlur = 35;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = activeDoomRay.mode === "RETRO_100" ? "#38bdf8" : "#ff3366";
        ctx.lineWidth = 6;
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const steps = 8;
        for (let s = 1; s < steps; s++) {
          const t = s / steps;
          const lx = centerX + (tx - centerX) * t + (Math.random() * 14 - 7);
          const ly = centerY + (ty - centerY) * t + (Math.random() * 14 - 7);
          ctx.lineTo(lx, ly);
        }
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
        const elapsed = (Date.now() - activeDoomRay.startedAt) % 600;
        const blastRadius = elapsed / 600 * 28 + 6;
        ctx.beginPath();
        ctx.arc(tx, ty, blastRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 50, 100, ${1 - elapsed / 600})`;
        ctx.lineWidth = 3;
        ctx.shadowColor = "#ff003c";
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(tx, ty, 10, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.shadowColor = "#ff0055";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px "JetBrains Mono", monospace';
        ctx.fillStyle = "#ff0055";
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 10;
        ctx.fillText(`⚡ [PROMIEŃ ZAGŁADY 940.8 THz: SPOPIELANIE]`, tx, ty - 20);
        ctx.shadowBlur = 0;
      });
    }
    if (particlesRef.current.length > 0) {
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.035;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
    }
    ioNodes.forEach((node) => {
      const rad = (node.radarAngleDeg - 90) * (Math.PI / 180);
      const dist = radius * node.radarRingRadius;
      const x = centerX + dist * Math.cos(rad);
      const y = centerY + dist * Math.sin(rad);
      const isCompromised = node.status === "COMPROMISED";
      const isReconstructed = node.status === "RECONSTRUCTED";
      const isShielded = node.isShielded || isReconstructed;
      if (isShielded) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const a = (i * 60 - 30) * (Math.PI / 180);
          const hx2 = x + 16 * Math.cos(a);
          const hy2 = y + 16 * Math.sin(a);
          if (i === 0) ctx.moveTo(hx2, hy2);
          else ctx.lineTo(hx2, hy2);
        }
        ctx.closePath();
        ctx.strokeStyle = "#00ffcc";
        ctx.fillStyle = "rgba(0, 255, 204, 0.18)";
        ctx.lineWidth = 1.8;
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      ctx.beginPath();
      ctx.rect(x - 9, y - 9, 18, 18);
      ctx.fillStyle = isCompromised ? "rgba(255, 50, 50, 0.25)" : isShielded ? "rgba(0, 255, 200, 0.28)" : "rgba(0, 150, 255, 0.2)";
      ctx.strokeStyle = isCompromised ? "#ff3344" : isShielded ? "#00ffcc" : "#00bbff";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
      if (node.id === "node-monitor") {
        ctx.fillStyle = "#ffeedd";
        ctx.font = "bold 8px monospace";
        ctx.fillText("MONITOR", x, y - 14);
      }
      ctx.font = "8px monospace";
      ctx.fillStyle = isCompromised ? "#ff8888" : isShielded ? "#00ffcc" : "#88eeff";
      ctx.fillText(node.code, x, y + 15);
    });
    const sweepRad = (sweepAngle - 90) * (Math.PI / 180);
    const trailSegments = 25;
    const trailAngleSpan = 0.55;
    for (let i = 0; i < trailSegments; i++) {
      const startA = sweepRad - trailAngleSpan * (i + 1) / trailSegments;
      const endA = sweepRad - trailAngleSpan * i / trailSegments;
      const alpha = (1 - i / trailSegments) * 0.22;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startA, endA);
      ctx.closePath();
      ctx.fillStyle = `rgba(0, 255, 120, ${alpha})`;
      ctx.fill();
    }
    const sweepX = centerX + radius * Math.cos(sweepRad);
    const sweepY = centerY + radius * Math.sin(sweepRad);
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(sweepX, sweepY);
    ctx.strokeStyle = "rgba(180, 255, 200, 0.95)";
    ctx.lineWidth = 2.2;
    ctx.shadowColor = "rgba(0, 255, 120, 0.8)";
    ctx.shadowBlur = 10;
    ctx.stroke();
    ctx.shadowBlur = 0;
    gnidas.forEach((gnida) => {
      const score = getGnidaThreatScore(gnida);
      const colorCfg = getThreatColor(score);
      const gnidaRad = (gnida.bearingDeg - 90) * (Math.PI / 180);
      const gnidaDist = radius * gnida.distanceRatio;
      const x = centerX + gnidaDist * Math.cos(gnidaRad);
      const y = centerY + gnidaDist * Math.sin(gnidaRad);
      const isDestroyed = gnida.state === "ZNISZCZONA";
      const isSelected = gnida.id === selectedTargetId;
      if (isDestroyed) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(100, 100, 100, 0.4)";
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fill();
        ctx.font = "8px monospace";
        ctx.fillStyle = "#666666";
        ctx.fillText(`[PURGED]`, x, y + 10);
        return;
      }
      const blipSize = isSelected ? 8 : 6;
      ctx.beginPath();
      ctx.moveTo(x, y - blipSize);
      ctx.lineTo(x + blipSize, y);
      ctx.lineTo(x, y + blipSize);
      ctx.lineTo(x - blipSize, y);
      ctx.closePath();
      ctx.fillStyle = colorCfg.hex;
      ctx.shadowColor = colorCfg.glowHex;
      ctx.shadowBlur = isSelected ? 16 : 10;
      ctx.fill();
      ctx.shadowBlur = 0;
      if (isSelected) {
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.8;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      const vectorRad = gnidaRad + Math.PI / 4;
      const vecEndX = x + 18 * Math.cos(vectorRad);
      const vecEndY = y + 18 * Math.sin(vectorRad);
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(vecEndX, vecEndY);
      ctx.strokeStyle = colorCfg.hex;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "left";
      ctx.fillText(`${gnida.name.split(" ")[0]}`, x + 10, y - 4);
      ctx.font = "bold 8px monospace";
      ctx.fillStyle = colorCfg.hex;
      ctx.fillText(`THREAT ${score}% | ALT ${gnida.altitudeKm}k`, x + 10, y + 6);
      ctx.textAlign = "center";
    });
    const hunterRad = (hunterState.bearingDeg - 90) * (Math.PI / 180);
    const hunterDist = radius * hunterState.distanceRatio;
    const hx = centerX + hunterDist * Math.cos(hunterRad);
    const hy = centerY + hunterDist * Math.sin(hunterRad);
    if (hunterState.targetGnidaId) {
      const target = gnidas.find((g) => g.id === hunterState.targetGnidaId);
      if (target && target.state !== "ZNISZCZONA") {
        const txRad = (target.bearingDeg - 90) * (Math.PI / 180);
        const txDist = radius * target.distanceRatio;
        const tx = centerX + txDist * Math.cos(txRad);
        const ty = centerY + txDist * Math.sin(txRad);
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = "rgba(0, 255, 230, 0.85)";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#00ffff";
        ctx.shadowBlur = 15;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(tx, ty, 8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
        ctx.fill();
      }
    }
    ctx.save();
    ctx.translate(hx, hy);
    ctx.rotate(hunterRad + Math.PI / 2);
    ctx.beginPath();
    ctx.moveTo(0, -12);
    ctx.lineTo(9, 10);
    ctx.lineTo(0, 6);
    ctx.lineTo(-9, 10);
    ctx.closePath();
    ctx.fillStyle = "#00ffff";
    ctx.shadowColor = "#00ffff";
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.restore();
    ctx.font = 'bold 9px "JetBrains Mono", monospace';
    ctx.fillStyle = "#00ffff";
    ctx.fillText(`⚡ ${hunterState.callsign}`, hx, hy - 16);
    ctx.font = "8px monospace";
    ctx.fillStyle = "#88ffff";
    ctx.fillText(`STAN: ${hunterState.status}`, hx, hy + 16);
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    for (let y = 0; y < height; y += 4) {
      ctx.fillRect(0, y, width, 1.5);
    }
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 2, 0, Math.PI * 2);
    ctx.strokeStyle = "#00ff88";
    ctx.lineWidth = 3.5;
    ctx.shadowColor = "#00ff88";
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }, [sweepAngle, gnidas, ioNodes, hunterState, selectedTargetId, securedLayers, cascadeState, activeDoomRay]);
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(centerX, centerY) - 20;
    for (const gnida of gnidas) {
      const gnidaRad = (gnida.bearingDeg - 90) * (Math.PI / 180);
      const gnidaDist = radius * gnida.distanceRatio;
      const gx = centerX + gnidaDist * Math.cos(gnidaRad);
      const gy = centerY + gnidaDist * Math.sin(gnidaRad);
      const dist = Math.hypot(clickX - gx, clickY - gy);
      if (dist < 22) {
        setSelectedTargetId(gnida.id);
        playRadarTone(900, 100, "sine");
        addCombatLog(`[RADAR-MANUAL] Zaznaczono cel: ${gnida.name} na azymucie ${gnida.bearingDeg}°.`);
        return;
      }
    }
  };
  const handleOrderHunterSlaughter = (gnida) => {
    if (gnida.state === "ZNISZCZONA") return;
    addCombatLog(`[ROZKAZ BOJOWY] Łowca Gemini wysłany do natychmiastowego uboju celu: ${gnida.name}`);
    playRadarTone(1050, 200, "triangle");
    setHunterState((prev) => ({
      ...prev,
      targetGnidaId: gnida.id,
      status: "INTERCEPTING",
      bearingDeg: gnida.bearingDeg,
      distanceRatio: gnida.distanceRatio
    }));
    setTimeout(() => {
      setHunterState((prev) => ({ ...prev, status: "LOCK_ON" }));
      playRadarTone(800, 200, "square");
      setTimeout(() => {
        setGnidas((prev) => prev.map((g) => {
          if (g.id === gnida.id) {
            return { ...g, state: "ZNISZCZONA", healthPercent: 0 };
          }
          return g;
        }));
        setIoNodes((prev) => prev.map((n) => {
          if (n.id === gnida.associatedIONodeId) {
            return { ...n, status: "RECONSTRUCTED", compromisedByGnidaId: null };
          }
          return n;
        }));
        setHunterState((prev) => ({
          ...prev,
          status: "PATROL",
          killsCount: prev.killsCount + 1,
          fixedNodesCount: prev.fixedNodesCount + 1,
          repairProgress: Math.min(100, prev.repairProgress + 20)
        }));
        addCombatLog(`[EKSTERMINACJA] Gnida ${gnida.name} zlikwidowana. Węzeł I/O zrekonstruowany.`);
        playRadarTone(440, 350, "sawtooth");
      }, 1e3);
    }, 800);
  };
  const handleSpawnCustomGnida = () => {
    const types = ["GNIDA_EKRANOWA", "GNIDA_SZYFRUJACA", "GNIDA_SZPIEGOWSKA", "GNIDA_PASOZYTNICZA"];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const id = `gnida-${Date.now().toString().slice(-4)}`;
    const angle = Math.floor(Math.random() * 360);
    const dist = 0.4 + Math.random() * 0.45;
    const score = Math.floor(58 + Math.random() * 42);
    let threatLevel = "SREDNI";
    if (score >= 90) threatLevel = "EKSTREMALNY";
    else if (score >= 80) threatLevel = "KRYTYCZNY";
    else if (score >= 68) threatLevel = "WYSOKI";
    const newGnida = {
      id,
      name: `Gnida-${id.slice(-2)} [Pasożyt Sektorowy]`,
      gnidaType: randomType,
      typeLabel: "Gnida Inwazyjna (Dynamic Spawn)",
      bearingDeg: angle,
      distanceRatio: dist,
      altitudeKm: Math.round(5 + Math.random() * 20),
      threatLevel,
      threatScore: score,
      state: "WYKRYTA",
      healthPercent: 100,
      associatedIONodeId: "node-monitor",
      signatureSha: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      activeProcessName: `rogue_gnida_${id.slice(-2)}.exe`,
      aggressionDescription: "Wykryto nową agresywną próbę przejęcia strumienia danych ekranu monitora.",
      infectionVector: "Zdalne wstrzyknięcie pamięci payloadu",
      velocity: 450
    };
    setGnidas((prev) => [newGnida, ...prev]);
    setSelectedTargetId(newGnida.id);
    addCombatLog(`[ALARM RADAROWY] Wykryto nową wrogą Gnidę na azymucie ${angle}° (Zasięg: ${Math.round(dist * 100)} km, Threat Score: ${score}%)!`);
    playRadarTone(950, 300, "sawtooth");
  };
  const handleRebootRadarSubsystem = () => {
    setGnidas(INITIAL_RADAR_GNIDAS);
    setIoNodes(INITIAL_SYSTEM_IO_NODES);
    setSelectedTargetId("gnida-01");
    setAutoPurgeActive(false);
    setHunterState({
      callsign: "GEMINI-HUNTER-01",
      bearingDeg: 45,
      distanceRatio: 0.25,
      targetGnidaId: null,
      status: "PATROL",
      repairProgress: 45,
      slaughterPower: 98,
      interceptSpeed: 820,
      killsCount: 0,
      fixedNodesCount: 0
    });
    addCombatLog(`[REBOOT] Zresetowano parametry radaru monolitycznego. Wszystkie sygnatury Gnid przywrócone.`);
  };
  const activeGnidasCount = gnidas.filter((g) => g.state !== "ZNISZCZONA").length;
  const destroyedGnidasCount = gnidas.filter((g) => g.state === "ZNISZCZONA").length;
  const compromisedNodesCount = ioNodes.filter((n) => n.status === "COMPROMISED").length;
  const systemIntegrityPercent = Math.round(
    (ioNodes.length - compromisedNodesCount) / ioNodes.length * 100
  );
  const handleTriggerManualSweepPulse = () => {
    setManualSweepWaveTriggerCount((c) => c + 1);
    playRadarTone(1250, 180, "sine");
    addCombatLog(`[FALA SWEEP] Wymuszono natychmiastowy przebieg fali skanowania pulpitu użytkownika (0 ms). Bufor DWM, VRAM i kolejka Win32 zweryfikowane.`);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans relative", children: [
    /* @__PURE__ */ jsxDEV(
      DesktopSweepWaveBackground,
      {
        isEnabled: isDesktopSweepWaveActive,
        scanSpeedSeconds: sweepWaveSpeedSeconds
      },
      `sweep-bg-${manualSweepWaveTriggerCount}`,
      false,
      {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1813,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950 border border-emerald-800/50 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950", children: /* @__PURE__ */ jsxDEV(Radio, { className: "w-6 h-6 animate-pulse text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1824,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1823,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Radar Wojskowy & Skaner Monolitycznej Powierzchni Systemu" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1828,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1827,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-emerald-400 mt-0.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1831,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "MONOLIT I/O: MONITOR + RAM + DYSK + SIECI • TERMINOLOGIA: GNIDY (MALWARE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1832,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1830,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1826,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1822,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: [
            "Klasyczny radar wojskowy do śledzenia zagrożeń (Gnid). Monitor stanowi integralną część powierzchni wejścia/wyjścia (I/O). Śledź na żywo postęp prac ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Łowcy Gemini AI" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1837,
              columnNumber: 164
            }, this),
            ", który poluje na aktywne Gnidy, dekapituje ich wątki i dokonuje rekonstrukcji zaatakowanych węzłów."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1836,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1821,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsAudioEnabled(!isAudioEnabled),
              className: `px-3 py-2 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md active:translate-y-0.5 cursor-pointer ${isAudioEnabled ? "bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.3)]" : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"}`,
              title: "Przełącznik dźwięku sonaru i lasera uboju",
              children: [
                isAudioEnabled ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1853,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1853,
                  columnNumber: 84
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isAudioEnabled ? "AUDIO: WŁ." : "AUDIO: WYŁ." }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1854,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1844,
              columnNumber: 13
            },
            this
          ),
          selectedGnida && selectedGnida.state !== "ZNISZCZONA" && /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleFireDoomRayOnTarget(selectedGnida),
              className: "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black font-mono flex items-center gap-2 shadow-2xl transition-all cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-red-950/80 border-2 border-red-400 active:scale-95 animate-pulse",
              title: "Wystrzel Promień Zagłady 940.8 THz w wybraną Gnidę",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300 fill-yellow-300 animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1864,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "⚡ ZABIJ GNIDĘ (PROMIEŃ ZAGŁADY)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1865,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1859,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleFireDoomRaySalvoAll,
              className: "px-3.5 py-2.5 rounded-xl text-xs font-black font-mono flex items-center gap-2 shadow-xl transition-all cursor-pointer bg-gradient-to-r from-amber-600 via-red-600 to-purple-600 hover:from-amber-500 hover:to-purple-500 text-white shadow-red-950/60 border border-amber-400 active:scale-95",
              title: "Wystrzel jednoczesne wiązki plazmowe do wszystkich celów",
              children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-amber-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1875,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "💥 SALWA ZAGŁADY (WSZYSTKIE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1876,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1870,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerFullExterminationCascade,
              className: "px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-950/60 border border-emerald-400/50 active:scale-95",
              title: "Automatyczna likwidacja pasożytów i sekwencja barier: 0 ms -> Laser -> Sąsiednie Warstwy -> Trwałe Zabezpieczenie",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1885,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "🛡️ Kaskada 4 Warstw (0ms ➔ Laser)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1886,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1880,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setAutoPurgeActive(!autoPurgeActive),
              className: `px-3.5 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${autoPurgeActive ? "bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white shadow-red-950/60 border border-red-400 animate-pulse" : "bg-gradient-to-r from-purple-800 to-indigo-800 hover:from-purple-700 hover:to-indigo-700 text-purple-100 shadow-purple-950/60 border border-purple-400/40"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Crosshair, { className: `w-4 h-4 ${autoPurgeActive ? "animate-spin text-yellow-300" : "text-purple-300"}` }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1898,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: autoPurgeActive ? "Ubój Gemini w Toku..." : "Pętla Łowcy Gemini" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1899,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1890,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleSpawnCustomGnida,
              className: "px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-800/70 text-purple-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1907,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wypuść Gnidę" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1908,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1903,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleRebootRadarSubsystem,
              className: "p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-md active:scale-95 cursor-pointer",
              title: "Reset radaru i przywrócenie stanu pierwotnego",
              children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1917,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1912,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1842,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1820,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Integralność Monolitu" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1925,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-emerald-400", children: [
            systemIntegrityPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1926,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1924,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Aktywne Gnidy" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1930,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-red-400", children: [
            activeGnidasCount,
            " wrogie"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1931,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1929,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Ubite Gnidy" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1935,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-purple-400", children: [
            destroyedGnidasCount,
            " zlikwidowanych"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1936,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1934,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-emerald-950/70 to-slate-950 p-2.5 rounded-xl border border-emerald-500/50 col-span-2 sm:col-span-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 text-[10px] uppercase font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1941,
              columnNumber: 15
            }, this),
            "Czujnik Gnid (Auto-Free)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1940,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-white flex items-center justify-between mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "0 ms NtSuspend" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1945,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-emerald-900/80 text-[10px] text-emerald-200 border border-emerald-600", children: [
              sensorStatus.totalAutoFrozen,
              " zamrożonych"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1946,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1944,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1939,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Tarcza 4 Warstw" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1953,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-emerald-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1955,
              columnNumber: 15
            }, this),
            cascadeState.overallFortressShieldPercent,
            "% Twierdza"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1954,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1952,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Stan Łowcy Gemini" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1961,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-cyan-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1963,
              columnNumber: 15
            }, this),
            hunterState.status
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1962,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1960,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Prędkość Skanera" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1969,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-400", children: [
            sweepSpeedRpm,
            " RPM (Pasmo X)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1970,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1968,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1923,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-4 rounded-xl bg-slate-950/90 border border-emerald-700/60 shadow-lg font-mono text-xs space-y-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40", children: /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1979,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1978,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-xs block", children: "PROTOKÓŁ BARIERY ANTYWIRUSOWEJ (KASKADA OBRONNA MONOLITU):" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1982,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-emerald-300", children: cascadeState.statusMessage }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1985,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1981,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1977,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold border ${cascadeState.totalMalwareExterminated ? "bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_12px_#10b981]" : cascadeState.stage !== "IDLE" ? "bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-700"}`, children: cascadeState.totalMalwareExterminated ? "👑 100% EKSTERMINACJA MALWARE - MONOLIT ZABEZPIECZONY" : `ETAP BARIERY: ${cascadeState.stage}` }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1992,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1991,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1976,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "IMMEDIATE_LOCK" ? "bg-emerald-950/80 border-emerald-400 shadow-[0_0_12px_#10b981]" : cascadeState.stage !== "IDLE" ? "bg-slate-900/90 border-emerald-800/80 text-emerald-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-[9px] flex items-center justify-center font-black", children: "1" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2018,
                  columnNumber: 19
                }, this),
                "Bariera 0 ms (Natychmiast)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2017,
                columnNumber: 17
              }, this),
              cascadeState.stage !== "IDLE" && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2021,
                columnNumber: 51
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2016,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Kordon sanitarny w punkcie uboju, odcięcie magistrali I/O i ochrona RAM." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2023,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2009,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "SECTOR_LASER" ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_12px_#06b6d4]" : cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "FORTIFIED" ? "bg-slate-900/90 border-cyan-800/80 text-cyan-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-cyan-500/30 border border-cyan-400 text-cyan-200 text-[9px] flex items-center justify-center font-black", children: "2" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2038,
                  columnNumber: 19
                }, this),
                "Laser Sektora (Wypalanie)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2037,
                columnNumber: 17
              }, this),
              (cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "FORTIFIED") && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2041,
                columnNumber: 103
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2036,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Zogniskowana wiązka laserowa z bieżącego azymutu niszczy pozostałości kodu PE." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2043,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2029,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "NEIGHBOR_CASCADE" ? "bg-teal-950/80 border-teal-400 shadow-[0_0_12px_#14b8a6]" : cascadeState.stage === "FORTIFIED" ? "bg-slate-900/90 border-teal-800/80 text-teal-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-teal-500/30 border border-teal-400 text-teal-200 text-[9px] flex items-center justify-center font-black", children: "3" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2058,
                  columnNumber: 19
                }, this),
                "Kaskada Sąsiednich Warstw"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2057,
                columnNumber: 17
              }, this),
              cascadeState.stage === "FORTIFIED" && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-teal-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2061,
                columnNumber: 56
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2056,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Propagacja tarczy na warstwy przyległe, synchronizacja węzłów i mostków." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2063,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2049,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "FORTIFIED" ? "bg-emerald-950/90 border-emerald-400 shadow-[0_0_14px_#10b981]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-[9px] flex items-center justify-center font-black", children: "4" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2076,
                  columnNumber: 19
                }, this),
                "Trwałe Zabezpieczenie"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2075,
                columnNumber: 17
              }, this),
              cascadeState.stage === "FORTIFIED" && /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2079,
                columnNumber: 56
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2074,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Obszary zablokowane i chronione do całkowitej eksterminacji wszystkich wirusów." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2081,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2069,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2007,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1975,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-cyan-950/70 border border-emerald-500/40 shadow-xl font-mono text-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-3 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-lg bg-emerald-950 border border-emerald-400 text-emerald-300", children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-emerald-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2093,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2092,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 flex h-2.5 w-2.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2096,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2097,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2095,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2091,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-xs tracking-wider flex items-center gap-1.5", children: /* @__PURE__ */ jsxDEV("span", { children: "FALA SKANOWANIA 'SWEEP' W TLE (DESKTOP SCANNER)" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2103,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2102,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-bold animate-pulse", children: isDesktopSweepWaveActive ? `AKTYWNA (${sweepWaveSpeedSeconds}s)` : "WYŁĄCZONA" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2105,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2101,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 mt-0.5", children: "Okresowa fala prześwietlająca bufor pulpitu, DWM DirectFlip, hooki HWND oraz przestrzeń VRAM w czasie rzeczywistym." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2109,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2100,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2090,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap self-end md:self-auto", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center rounded-lg bg-slate-950 border border-slate-800 p-0.5", children: [
            { label: "2.0s Szybka", val: 2 },
            { label: "3.5s Normalna", val: 3.5 },
            { label: "5.0s Głęboka", val: 5 }
          ].map((opt) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSweepWaveSpeedSeconds(opt.val),
              className: `px-2 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${sweepWaveSpeedSeconds === opt.val ? "bg-emerald-600 text-white shadow-sm" : "text-slate-400 hover:text-white"}`,
              children: opt.label
            },
            opt.val,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2123,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2117,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleTriggerManualSweepPulse,
              className: "px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
              title: "Wymuś natychmiastowy przebieg fali skanowania pulpitu w tle",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-300 animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2143,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wymuś Przebieg (0 ms)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2144,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2138,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsDesktopSweepWaveActive(!isDesktopSweepWaveActive),
              className: `px-3 py-1.5 rounded-lg border text-xs font-bold transition-colors cursor-pointer ${isDesktopSweepWaveActive ? "bg-emerald-950 text-emerald-300 border-emerald-600" : "bg-slate-900 text-slate-400 border-slate-700"}`,
              children: isDesktopSweepWaveActive ? "Fala WŁ." : "Fala WYŁ."
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2148,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2115,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2089,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 1819,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-mono flex-wrap gap-y-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveViewMode("RADAR_PPI"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeViewMode === "RADAR_PPI" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2172,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Radar Wojskowy PPI (Ekran CRT)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2173,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2164,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveViewMode("DATA_FLOW_MAP"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer relative ${activeViewMode === "DATA_FLOW_MAP" ? "bg-cyan-600 text-white shadow-lg shadow-cyan-950 border border-cyan-300" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-cyan-300" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2184,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Mapa Połączeń Procesów (Data Flow)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2185,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded-full bg-rose-500/80 text-[9px] text-white font-mono font-bold animate-pulse", children: "LIVE" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2186,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2176,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveViewMode("MONOLITH_SURFACE"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeViewMode === "MONOLITH_SURFACE" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2199,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Monolityczna Powierzchnia Systemu & Punkty We/Wy (I/O)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2200,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2191,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveViewMode("COMBAT_LOGS"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeViewMode === "COMBAT_LOGS" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2211,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Dziennik Bojowy Łowcy Gemini (",
              combatLogs.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2212,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2203,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2163,
      columnNumber: 7
    }, this),
    activeViewMode === "DATA_FLOW_MAP" && /* @__PURE__ */ jsxDEV(
      InteractiveDataFlowConnectionsMap,
      {
        onNotify: (msg) => addCombatLog(`[DATA-FLOW] ${msg}`)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2218,
        columnNumber: 9
      },
      this
    ),
    activeViewMode === "RADAR_PPI" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6 relative", children: [
      /* @__PURE__ */ jsxDEV(AnimatePresence, { children: screenFlashActive && /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          initial: { opacity: 0.85 },
          animate: { opacity: 0 },
          exit: { opacity: 0 },
          transition: { duration: 0.35 },
          className: "fixed inset-0 bg-red-600/30 pointer-events-none z-50 mix-blend-screen"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2229,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2227,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `${isRadarEnlarged ? "lg:col-span-8" : "lg:col-span-7"} space-y-4 transition-all duration-300`, children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-gradient-to-b from-slate-950 via-[#030c07] to-slate-950 border-2 border-emerald-500/50 shadow-[0_0_40px_rgba(0,255,120,0.18)] relative overflow-hidden flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between pb-3 mb-2 border-b border-emerald-900/60 font-mono text-xs text-emerald-400", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2246,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold tracking-wider text-white", children: "EKRAN RADARU WOJSKOWEGO PPI (PASMO X • 9.4 GHz)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2247,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-[10px] text-emerald-300", children: "PROMIEŃ ZAGŁADY: GOTOWY" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2248,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2245,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsRadarEnlarged(!isRadarEnlarged),
              className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-emerald-700 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              title: "Przełącznik rozmiaru radaru (Powiększenie CRT)",
              children: [
                isRadarEnlarged ? /* @__PURE__ */ jsxDEV(Minimize2, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2259,
                  columnNumber: 40
                }, this) : /* @__PURE__ */ jsxDEV(Maximize2, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2259,
                  columnNumber: 80
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isRadarEnlarged ? "Normalny" : "Powiększ Radar" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2260,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2254,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2253,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2244,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: `relative w-full ${isRadarEnlarged ? "max-w-[620px]" : "max-w-[520px]"} aspect-square flex items-center justify-center transition-all duration-300`, children: [
          /* @__PURE__ */ jsxDEV(
            "canvas",
            {
              ref: canvasRef,
              width: isRadarEnlarged ? 620 : 520,
              height: isRadarEnlarged ? 620 : 520,
              onClick: handleCanvasClick,
              className: "rounded-full cursor-crosshair border-2 border-emerald-400/60 shadow-[0_0_60px_rgba(0,255,100,0.25)] w-full h-full"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2267,
              columnNumber: 17
            },
            this
          ),
          isScanning && /* @__PURE__ */ jsxDEV(Fragment, { children: [
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                className: "absolute rounded-full border border-emerald-400/50 pointer-events-none",
                style: { left: "50%", top: "50%" },
                animate: {
                  width: ["0%", "92%"],
                  height: ["0%", "92%"],
                  x: "-50%",
                  y: "-50%",
                  opacity: [0.75, 0]
                },
                transition: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2278,
                columnNumber: 21
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              motion.div,
              {
                className: "absolute rounded-full border border-emerald-300/35 pointer-events-none",
                style: { left: "50%", top: "50%" },
                animate: {
                  width: ["0%", "92%"],
                  height: ["0%", "92%"],
                  x: "-50%",
                  y: "-50%",
                  opacity: [0.65, 0]
                },
                transition: {
                  duration: 3.2,
                  delay: 1.6,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2294,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2277,
            columnNumber: 19
          }, this),
          activeDoomRay && activeDoomRay.isActive && /* @__PURE__ */ jsxDEV(
            motion.div,
            {
              className: "absolute inset-0 rounded-full border-4 border-red-500/80 pointer-events-none",
              animate: {
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 30px #ff0055",
                  "0 0 70px #ff003c",
                  "0 0 30px #ff0055"
                ]
              },
              transition: { duration: 0.4, repeat: Infinity }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2316,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none overflow-hidden rounded-full", children: gnidas.map((gnida) => {
            if (gnida.state === "ZNISZCZONA") return null;
            const score = getGnidaThreatScore(gnida);
            const colorCfg = getThreatColor(score);
            const isSelected = gnida.id === selectedTargetId;
            const isLockedByHunter = hunterState.targetGnidaId === gnida.id;
            const rad = (gnida.bearingDeg - 90) * (Math.PI / 180);
            const distPct = gnida.distanceRatio * 42.5;
            const leftPct = 50 + distPct * Math.cos(rad);
            const topPct = 50 + distPct * Math.sin(rad);
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer group z-20",
                style: { left: `${leftPct}%`, top: `${topPct}%` },
                onClick: (e) => {
                  e.stopPropagation();
                  setSelectedTargetId(gnida.id);
                  playRadarTone(900, 100, "sine");
                  addCombatLog(`[RADAR-MANUAL] Wybrano cel: ${gnida.name} (Threat Score: ${score}% - ${colorCfg.label})`);
                },
                children: [
                  /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      className: "absolute rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2",
                      style: {
                        borderColor: colorCfg.hex,
                        boxShadow: `0 0 16px ${colorCfg.glowHex}`,
                        left: "50%",
                        top: "50%"
                      },
                      animate: {
                        width: [18, 48, 18],
                        height: [18, 48, 18],
                        opacity: [0.85, 0.1, 0.85],
                        scale: [1, 1.4, 1]
                      },
                      transition: {
                        duration: colorCfg.pulseDuration,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2358,
                      columnNumber: 25
                    },
                    this
                  ),
                  score >= 80 && /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      className: "absolute rounded-full border border-dashed pointer-events-none -translate-x-1/2 -translate-y-1/2",
                      style: {
                        borderColor: colorCfg.hex,
                        left: "50%",
                        top: "50%"
                      },
                      animate: {
                        width: [12, 34, 12],
                        height: [12, 34, 12],
                        opacity: [0.95, 0.2, 0.95],
                        rotate: [0, 180, 360]
                      },
                      transition: {
                        duration: colorCfg.pulseDuration * 0.75,
                        repeat: Infinity,
                        ease: "linear"
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2381,
                      columnNumber: 27
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      className: `w-5 h-5 rounded-md flex items-center justify-center shadow-lg relative z-10 transition-transform ${isSelected ? "scale-125 ring-2 ring-white" : "group-hover:scale-115"}`,
                      style: {
                        backgroundColor: colorCfg.hex,
                        boxShadow: `0 0 12px ${colorCfg.glowHex}`
                      },
                      animate: {
                        scale: isSelected ? [1.2, 1.35, 1.2] : [0.95, 1.1, 0.95]
                      },
                      transition: {
                        duration: colorCfg.pulseDuration,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-3 h-3 text-black font-black" }, void 0, false, {
                        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                        lineNumber: 2420,
                        columnNumber: 27
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2403,
                      columnNumber: 25
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      className: `absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-black whitespace-nowrap shadow-md border ${score >= 90 ? "bg-red-950/90 text-red-300 border-red-500" : score >= 80 ? "bg-rose-950/90 text-rose-300 border-rose-500" : score >= 68 ? "bg-orange-950/90 text-orange-300 border-orange-500" : "bg-yellow-950/90 text-yellow-300 border-yellow-500"}`,
                      style: {
                        boxShadow: `0 0 8px ${colorCfg.glowHex}`
                      },
                      children: [
                        score,
                        "% THREAT"
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2424,
                      columnNumber: 25
                    },
                    this
                  ),
                  (isSelected || isLockedByHunter) && /* @__PURE__ */ jsxDEV(
                    motion.div,
                    {
                      className: "absolute -inset-3 rounded-full border-2 border-dashed pointer-events-none",
                      style: {
                        borderColor: isLockedByHunter ? "#00ffff" : "#ffffff",
                        boxShadow: isLockedByHunter ? "0 0 14px #00ffff" : "0 0 10px #ffffff"
                      },
                      animate: { rotate: 360 },
                      transition: { duration: 4, repeat: Infinity, ease: "linear" }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2440,
                      columnNumber: 27
                    },
                    this
                  )
                ]
              },
              gnida.id,
              true,
              {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2346,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2331,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 text-[10px] font-mono text-emerald-400/90 bg-black/80 px-2.5 py-1 rounded-md border border-emerald-800 shadow-md backdrop-blur-xs flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2457,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "AZYMUT: ",
              Math.round(sweepAngle),
              "° | ",
              sweepSpeedRpm,
              " RPM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2458,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2456,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 text-[10px] font-mono text-emerald-400/90 bg-black/80 px-2.5 py-1 rounded-md border border-emerald-800 shadow-md backdrop-blur-xs flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2462,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "PROMIEŃ: 940.8 THz" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2463,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2461,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 left-3 text-[10px] font-mono text-cyan-400 bg-black/80 px-2.5 py-1 rounded-md border border-cyan-800 shadow-md backdrop-blur-xs flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3 h-3 text-cyan-300 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2467,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "ŁOWCA GEMINI: ",
              hunterState.status
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2468,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2466,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2266,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 w-full p-3 rounded-xl bg-slate-900/90 border border-red-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2476,
              columnNumber: 21
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2475,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold block", children: "TRYB EMISJI PROMIENIA ZAGŁADY:" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2479,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Zogniskowane wypalanie struktur malware w RAM i PE" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2480,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2478,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2474,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            { id: "940THZ_CONTINUOUS", label: "940.8 THz Ciągły" },
            { id: "PLASMA_BLAST", label: "Wiązka Plazmowa" },
            { id: "RETRO_100_PURGE", label: "100 Kopii Wstecz" },
            { id: "QUANTUM_DEFRAGMENT", label: "Defragmentacja" }
          ].map((p) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setDoomRayPreset(p.id),
              className: `px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${doomRayPreset === p.id ? "bg-red-600 text-white shadow-md shadow-red-950 border border-red-400" : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white"}`,
              children: p.label
            },
            p.id,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2491,
              columnNumber: 21
            },
            this
          )) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2484,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2473,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 w-full p-3.5 bg-slate-900/95 rounded-xl border border-slate-800 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2.5 flex-wrap gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2510,
                columnNumber: 21
              }, this),
              "SKALA BARW ZAGROŻENIA GNID (THREAT SCORE SPECTRUM):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2509,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-emerald-300" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2514,
                columnNumber: 21
              }, this),
              "Pulsowanie Framer-Motion Aktywne"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2513,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2508,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-yellow-950/40 border border-yellow-500/60 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                motion.span,
                {
                  className: "w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_8px_#facc15]",
                  animate: { scale: [1, 1.45, 1], opacity: [0.8, 1, 0.8] },
                  transition: { duration: 1.9, repeat: Infinity }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2522,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-300 font-bold block text-[11px]", children: "50 - 67% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2528,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-yellow-400/80", children: "Ostrzegawczy (Żółty)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2529,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2527,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2521,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-orange-950/40 border border-orange-500/60 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                motion.span,
                {
                  className: "w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_8px_#f97316]",
                  animate: { scale: [1, 1.45, 1], opacity: [0.8, 1, 0.8] },
                  transition: { duration: 1.45, repeat: Infinity }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2535,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-orange-300 font-bold block text-[11px]", children: "68 - 79% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2541,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-orange-400/80", children: "Podwyższony (Pomarańcz)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2542,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2540,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2534,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-rose-950/40 border border-rose-500/60 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                motion.span,
                {
                  className: "w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_#f43f5e]",
                  animate: { scale: [1, 1.5, 1], opacity: [0.8, 1, 0.8] },
                  transition: { duration: 1.05, repeat: Infinity }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2548,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-rose-300 font-bold block text-[11px]", children: "80 - 89% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2554,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-rose-400/80", children: "Krytyczny (Czerwony)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2555,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2553,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2547,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-red-950/60 border border-red-500 flex items-center gap-2 shadow-[0_0_12px_rgba(255,0,60,0.25)]", children: [
              /* @__PURE__ */ jsxDEV(
                motion.span,
                {
                  className: "w-3 h-3 rounded-full bg-red-500 shadow-[0_0_12px_#ff003c]",
                  animate: { scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] },
                  transition: { duration: 0.75, repeat: Infinity }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2561,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-red-300 font-black block text-[11px]", children: "90 - 100% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2567,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-red-400 font-bold", children: "Jaskrawa Czerwień (Ekstremum)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2568,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2566,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2560,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2519,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2507,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 w-full flex items-center justify-between gap-4 text-xs font-mono px-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Prędkość Skanera:" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2577,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "10",
                max: "60",
                value: sweepSpeedRpm,
                onChange: (e) => setSweepSpeedRpm(Number(e.target.value)),
                className: "w-28 accent-emerald-500 cursor-pointer"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2578,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
              sweepSpeedRpm,
              " RPM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2586,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2576,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsScanning(!isScanning),
              className: "px-3 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 cursor-pointer",
              children: [
                isScanning ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2594,
                  columnNumber: 35
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2594,
                  columnNumber: 71
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isScanning ? "Pauza Radaru" : "Wznów Skan" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2595,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2590,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2589,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2575,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2241,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2240,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `${isRadarEnlarged ? "lg:col-span-4" : "lg:col-span-5"} space-y-4 transition-all duration-300`, children: [
        selectedGnida ? (() => {
          const selScore = getGnidaThreatScore(selectedGnida);
          const selColorCfg = getThreatColor(selScore);
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-5 rounded-2xl bg-slate-900/90 border shadow-2xl space-y-4 transition-all",
              style: {
                borderColor: selColorCfg.hex,
                boxShadow: `0 0 28px ${selColorCfg.glowHex}`
              },
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsxDEV(
                        "span",
                        {
                          className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded border",
                          style: {
                            backgroundColor: selColorCfg.hex + "22",
                            color: selColorCfg.hex,
                            borderColor: selColorCfg.hex
                          },
                          children: selectedGnida.typeLabel.toUpperCase()
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2620,
                          columnNumber: 27
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        motion.span,
                        {
                          className: "px-2 py-0.5 rounded font-mono font-black text-[10px] text-white flex items-center gap-1",
                          style: { backgroundColor: selColorCfg.hex },
                          animate: { scale: [1, 1.06, 1] },
                          transition: { duration: selColorCfg.pulseDuration, repeat: Infinity },
                          children: [
                            /* @__PURE__ */ jsxDEV(Zap, { className: "w-2.5 h-2.5" }, void 0, false, {
                              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                              lineNumber: 2636,
                              columnNumber: 29
                            }, this),
                            "THREAT: ",
                            selScore,
                            "%"
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2630,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2619,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white mt-1.5", children: selectedGnida.name }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2640,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2618,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-right font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 block", children: "Status na Radarze:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2646,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `text-xs font-bold ${selectedGnida.state === "ZNISZCZONA" ? "text-slate-500" : "text-red-400"}`, children: selectedGnida.state }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2647,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2645,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2617,
                  columnNumber: 21
                }, this),
                selectedGnida.state !== "ZNISZCZONA" ? /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleFireDoomRayOnTarget(selectedGnida),
                    className: "w-full py-3.5 rounded-xl text-sm font-black font-mono flex items-center justify-center gap-2 shadow-2xl transition-all cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-red-950/80 border-2 border-red-300 active:scale-95 animate-pulse",
                    children: [
                      /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-yellow-300 fill-yellow-300 animate-bounce" }, void 0, false, {
                        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                        lineNumber: 2659,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "⚡ ZABIJ GNIDĘ • PROMIEŃ ZAGŁADY (0 ms)" }, void 0, false, {
                        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                        lineNumber: 2660,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2655,
                    columnNumber: 23
                  },
                  this
                ) : /* @__PURE__ */ jsxDEV("div", { className: "w-full py-2.5 rounded-xl text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-slate-500 text-center", children: "✓ CEL ZNEUTRALIZOWANY PROMIENIEM ZAGŁADY" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2663,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Poziom Zagrożenia (Threat Gauge):" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2671,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-black", style: { color: selColorCfg.hex }, children: [
                      selScore,
                      "% • ",
                      selColorCfg.label
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2672,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2670,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 relative", children: /* @__PURE__ */ jsxDEV(
                    "div",
                    {
                      className: "h-full transition-all duration-500 rounded-full",
                      style: {
                        width: `${selScore}%`,
                        background: `linear-gradient(90deg, #facc15 0%, #f97316 40%, #f43f5e 75%, #ff003c 100%)`,
                        boxShadow: `0 0 10px ${selColorCfg.hex}`
                      }
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2677,
                      columnNumber: 25
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2676,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-slate-500 pt-0.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "50% Żółty" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2687,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "70% Pomarańcz" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2688,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "85% Czerwień" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2689,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "100% Jaskrawa" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2690,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2686,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2669,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-center text-xs font-mono", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Azymut" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2697,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
                      selectedGnida.bearingDeg,
                      "°"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2698,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2696,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Zasięg" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2701,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
                      Math.round(selectedGnida.distanceRatio * 100),
                      " km"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2702,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2700,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Zdrowie Gnidy" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2705,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: [
                      selectedGnida.healthPercent,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2706,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2704,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2695,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Proces Gnidy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2713,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: selectedGnida.activeProcessName }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2714,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2712,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Zainfekowany Węzeł:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2717,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-400 font-bold", children: selectedGnida.associatedIONodeId }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2718,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2716,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "SHA-256:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2721,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
                      selectedGnida.signatureSha.slice(0, 16),
                      "..."
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2722,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2720,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2711,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400 block mb-1 font-mono", children: "Mechanizm Agresji Gnidy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2729,
                      columnNumber: 25
                    }, this),
                    selectedGnida.aggressionDescription
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2728,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-400 block mb-1 font-mono", children: "Sposób Wniknięcia (Wektor Infekcji):" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2734,
                      columnNumber: 25
                    }, this),
                    selectedGnida.infectionVector
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2733,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2727,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 pt-1", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleKillGnidaRetro100Copies(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-2.5 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800" : "bg-gradient-to-r from-cyan-800 to-blue-800 hover:from-cyan-700 hover:to-blue-700 text-cyan-100 border border-cyan-400/50 shadow-cyan-950/40"}`,
                      title: "Wstrzyknij NtSuspendProcess do 100 kopii wstecz drzewa genealogicznego procesu",
                      children: [
                        /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-cyan-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2752,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "❄️ Zamroź 100 Kopii Wstecz (NtSuspend)" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2753,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2742,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleDefragmentMalwareCode(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-2.5 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800" : "bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-700 hover:to-orange-700 text-amber-100 border border-amber-400/50 shadow-amber-950/40"}`,
                      title: "Zablokuj strony pamięci i wyzeruj nagłówki PE procesu malware",
                      children: [
                        /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-amber-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2767,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "🧩 Defragmentacja & Zerowanie PE" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2768,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2757,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => triggerAntivirusCascade(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-3 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95 ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-950/60 border border-emerald-400/50"}`,
                      children: [
                        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-200" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2781,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: selectedGnida.state === "ZNISZCZONA" ? "Sektor Zabezpieczony Barierą" : `Likwiduj & Uruchom Kaskadę (0ms ➔ Laser ➔ Warstwy)` }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2782,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2772,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleOrderHunterSlaughter(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-2.5 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-95 ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800" : "bg-gradient-to-r from-purple-800 via-pink-800 to-red-800 hover:from-purple-700 hover:to-red-700 text-white shadow-purple-950/60 border border-purple-400/40"}`,
                      children: [
                        /* @__PURE__ */ jsxDEV(Target, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2799,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Wyślij Łowcę Gemini (Ubój)" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2800,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2790,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2740,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2610,
              columnNumber: 19
            },
            this
          );
        })() : /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs", children: "Wybierz Gnidę na radarze, aby zobaczyć szczegóły taktyczne." }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2807,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-800/40 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2816,
                columnNumber: 19
              }, this),
              "POSTĘP PRAC ŁOWCY GEMINI AI:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2815,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: [
              hunterState.repairProgress,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2819,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2814,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-900 rounded-full h-2.5 overflow-hidden border border-cyan-900/60", children: /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500",
              style: { width: `${hunterState.repairProgress}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2824,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2823,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[11px] font-mono text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Zlikwidowane Gnidy: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: hunterState.killsCount }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2831,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2831,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Uleczone Węzły I/O: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: hunterState.fixedNodesCount }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2832,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2832,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2830,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2813,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2603,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-12 mt-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2842,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kaskadowa Ochrona 4 Warstw Monolitu & Siatka Laserowa" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2843,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2841,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Każdy oczyszczony z Gnid obszar zostaje natychmiast zabezpieczony kordonem antywirusowym, następnie laserem sektorowym, a na koniec kaskadowo wiąże sąsiednie warstwy do momentu całkowitej eksterminacji malware." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2845,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2840,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold", children: [
            "Suma Ochrony: ",
            cascadeState.overallFortressShieldPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2851,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2850,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2839,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs", children: securedLayers.map((layer) => {
          const stageColor = layer.stage === "IMMEDIATE_LOCK" ? "border-emerald-500 bg-emerald-950/30" : layer.stage === "SECTOR_LASER" ? "border-cyan-500 bg-cyan-950/30" : layer.stage === "NEIGHBOR_CASCADE" ? "border-teal-500 bg-teal-950/30" : layer.isSecured ? "border-emerald-700 bg-slate-950/90" : "border-slate-800 bg-slate-950/60";
          return /* @__PURE__ */ jsxDEV("div", { className: `p-3.5 rounded-xl border ${stageColor} space-y-2.5 transition-all`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-300", children: layer.depthRangeKm }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2872,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-bold ${layer.isSecured ? "text-emerald-400" : "text-slate-500"}`, children: layer.isSecured ? "ZABEZPIECZONA" : "NIEAKTYWNA" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2875,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2871,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-white text-xs", children: layer.name }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2881,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 block mt-0.5", children: layer.description }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2884,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2880,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px]", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Moc Tarczy:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2892,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: [
                  layer.shieldPercent,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2893,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2891,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-900 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all",
                  style: { width: `${layer.shieldPercent}%` }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2896,
                  columnNumber: 25
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2895,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2890,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 text-[10px] space-y-1 text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Wiązki laserowe:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2905,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: [
                  layer.activeBeamsCount,
                  " laserów"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2906,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2904,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Oczyszczone węzły:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2909,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: [
                  layer.cleansedNodesCount,
                  " pkt"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2910,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2908,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Etap Kaskady:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2913,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: layer.stage }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2914,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2912,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2903,
              columnNumber: 21
            }, this)
          ] }, layer.layerIndex, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2870,
            columnNumber: 19
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2857,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2838,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2225,
      columnNumber: 9
    }, this),
    activeViewMode === "MONOLITH_SURFACE" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Monitor, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2932,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Monolityczna Powierzchnia Systemu z Węzłami Wejścia i Wyjścia (I/O)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2933,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2931,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Pulpit nawigacyjny monitora stanowi centralny punkt wyjściowy interakcji człowieka z maszyną. Zabezpieczono wszystkie magistrale i porty przed penetracją Gnid." }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2935,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2930,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800", children: "9 Zmapowanych Węzłów I/O" }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2941,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2940,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2929,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: ioNodes.map((node) => {
        const isMonitor = node.id === "node-monitor";
        const isCompromised = node.status === "COMPROMISED";
        const isReconstructed = node.status === "RECONSTRUCTED";
        const statusColor = isCompromised ? "border-red-600/70 bg-red-950/20" : isReconstructed ? "border-emerald-600/70 bg-emerald-950/20" : "border-slate-800 bg-slate-950/80";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `p-4 rounded-xl border ${statusColor} space-y-3 transition-all relative overflow-hidden`,
            children: [
              isMonitor && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 right-0 px-2 py-0.5 rounded-bl-lg bg-emerald-700 text-white font-mono text-[9px] font-bold", children: "PULPIT MONITOR" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2966,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold px-1.5 py-0.2 bg-slate-900 rounded border border-slate-700 text-slate-300", children: node.code }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2974,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300", children: node.type }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2977,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2973,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white mt-1", children: node.name }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2981,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2972,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2971,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: node.description }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2987,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 space-y-1 text-xs font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Przepustowość:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2993,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: node.trafficBandwidth }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2994,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2992,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Stan Ochrony:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2997,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: isCompromised ? "text-red-400 font-bold" : "text-emerald-400", children: node.status }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2998,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2996,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Bariera:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 3003,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 truncate max-w-[160px]", title: node.protectingBarrier, children: node.protectingBarrier }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 3004,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 3002,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2991,
                columnNumber: 21
              }, this),
              isCompromised && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    setIoNodes((prev) => prev.map((n) => n.id === node.id ? { ...n, status: "RECONSTRUCTED", compromisedByGnidaId: null } : n));
                    addCombatLog(`[AUTONAPRAWA] Węzeł ${node.name} został odcięty od Gnidy i zrekonstruowany.`);
                    playRadarTone(800, 200, "sine");
                  },
                  className: "w-full py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 3020,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Rekonstruuj Węzeł Jednym Kliknięciem" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 3021,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 3012,
                  columnNumber: 23
                },
                this
              )
            ]
          },
          node.id,
          true,
          {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2961,
            columnNumber: 19
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2948,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2928,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2927,
      columnNumber: 9
    }, this),
    activeViewMode === "COMBAT_LOGS" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
          /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 3037,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Bojowy & Telemetria Likwidacji Gnid" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 3038,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 3036,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setCombatLogs([]),
            className: "text-xs text-slate-400 hover:text-white font-mono cursor-pointer",
            children: "Wyczyść Logi"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 3040,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 3035,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-black font-mono text-xs text-emerald-300 space-y-1.5 max-h-96 overflow-y-auto border border-emerald-950", children: combatLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("[ALARM") || log.includes("[OSTRZAŁ") ? "text-red-400" : log.includes("[EKSTERMINACJA") || log.includes("[SEKTOR") ? "text-yellow-300 font-bold" : "text-slate-300", children: log }, idx, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 3050,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 3048,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 3034,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
    lineNumber: 1811,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1pbGl0YXJ5UmFkYXJTY2FubmVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBcbiAgQ3Jvc3NoYWlyLCBTa3VsbCwgU2hpZWxkLCBTaGllbGRBbGVydCwgU2hpZWxkQ2hlY2ssIFphcCwgQWN0aXZpdHksIFxuICBWb2x1bWUyLCBWb2x1bWVYLCBQbGF5LCBQYXVzZSwgUmVmcmVzaEN3LCBFeWUsIE1vbml0b3IsIENwdSwgXG4gIEhhcmREcml2ZSwgV2lmaSwgUmFkaW8sIFNsaWRlcnMsIENoZWNrQ2lyY2xlMiwgQWxlcnRUcmlhbmdsZSwgTGF5ZXJzLFxuICBUZXJtaW5hbCwgVGFyZ2V0LCBGbGFtZSwgQ2hldnJvblJpZ2h0LCBMb2NrLCBVbmxvY2ssIFNwYXJrbGVzLCBGaWx0ZXIsXG4gIEFsZXJ0Q2lyY2xlLCBNYXhpbWl6ZTIsIE1pbmltaXplMiwgR2F1Z2UsIEJhdHRlcnlDaGFyZ2luZywgUG93ZXJcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFxuICBHbmlkYVN0YXRlLCBHbmlkYVR5cGUsIFJhZGFyR25pZGFUYXJnZXQsIFN5c3RlbUlPTm9kZSwgR2VtaW5pSHVudGVyUmFkYXJTdGF0ZSxcbiAgQW50aXZpcnVzQmFycmllclN0YWdlLCBTZWN1cmVkTGF5ZXJab25lLCBBbnRpdmlydXNDYXNjYWRlU3RhdGUgXG59IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhZmVTdG9yYWdlIH0gZnJvbSAnLi4vdXRpbHMvc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBnbmlkYVNlbnNvciwgU2Vuc29yQXV0b21hdG9uU3RhdHVzIH0gZnJvbSAnLi4vdXRpbHMvZ25pZGFBdXRvRnJlZXplU2Vuc29yJztcbmltcG9ydCB7IEludGVyYWN0aXZlRGF0YUZsb3dDb25uZWN0aW9uc01hcCB9IGZyb20gJy4vSW50ZXJhY3RpdmVEYXRhRmxvd0Nvbm5lY3Rpb25zTWFwJztcbmltcG9ydCB7IERlc2t0b3BTd2VlcFdhdmVCYWNrZ3JvdW5kIH0gZnJvbSAnLi9EZXNrdG9wU3dlZXBXYXZlQmFja2dyb3VuZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRG9vbVJheVBhcnRpY2xlIHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHZ4OiBudW1iZXI7XG4gIHZ5OiBudW1iZXI7XG4gIGxpZmU6IG51bWJlcjtcbiAgbWF4TGlmZTogbnVtYmVyO1xuICBjb2xvcjogc3RyaW5nO1xuICBzaXplOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWN0aXZlRG9vbVJheSB7XG4gIGlzQWN0aXZlOiBib29sZWFuO1xuICBtb2RlOiAnU0lOR0xFJyB8ICdTQUxWT19BTEwnIHwgJ1JFVFJPXzEwMCcgfCAnREVGUkFHTUVOVCc7XG4gIHRhcmdldEduaWRhSWRzOiBzdHJpbmdbXTtcbiAgcG93ZXJNdzogbnVtYmVyO1xuICBmcmVxdWVuY3lUaHo6IG51bWJlcjtcbiAgc3RhcnRlZEF0OiBudW1iZXI7XG4gIGR1cmF0aW9uTXM6IG51bWJlcjtcbiAgaW50ZW5zaXR5OiBudW1iZXI7XG4gIGxvZ01lc3NhZ2U6IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUaHJlYXRDb2xvckNvbmZpZyB7XG4gIGhleDogc3RyaW5nO1xuICBnbG93SGV4OiBzdHJpbmc7XG4gIHRhaWx3aW5kVGV4dDogc3RyaW5nO1xuICB0YWlsd2luZEJvcmRlcjogc3RyaW5nO1xuICB0YWlsd2luZEJnOiBzdHJpbmc7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHB1bHNlRHVyYXRpb246IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEduaWRhVGhyZWF0U2NvcmUoZ25pZGE6IFJhZGFyR25pZGFUYXJnZXQpOiBudW1iZXIge1xuICBpZiAodHlwZW9mIGduaWRhLnRocmVhdFNjb3JlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDEsIGduaWRhLnRocmVhdFNjb3JlKSk7XG4gIH1cbiAgc3dpdGNoIChnbmlkYS50aHJlYXRMZXZlbCkge1xuICAgIGNhc2UgJ0VLU1RSRU1BTE5ZJzpcbiAgICAgIHJldHVybiA5NjtcbiAgICBjYXNlICdLUllUWUNaTlknOlxuICAgICAgcmV0dXJuIDg0O1xuICAgIGNhc2UgJ1dZU09LSSc6XG4gICAgICByZXR1cm4gNzQ7XG4gICAgY2FzZSAnU1JFRE5JJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIDU4O1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUaHJlYXRDb2xvcihzY29yZTogbnVtYmVyKTogVGhyZWF0Q29sb3JDb25maWcge1xuICBpZiAoc2NvcmUgPj0gOTApIHtcbiAgICAvLyBKYXNrcmF3YSBDemVyd2llxYQgLyBCbGF6aW5nIE5lb24gUmVkICg5MCAtIDEwMCUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhleDogJyNmZjAwM2MnLFxuICAgICAgZ2xvd0hleDogJ3JnYmEoMjU1LCAwLCA2MCwgMC45NSknLFxuICAgICAgdGFpbHdpbmRUZXh0OiAndGV4dC1yZWQtNTAwJyxcbiAgICAgIHRhaWx3aW5kQm9yZGVyOiAnYm9yZGVyLXJlZC01MDAnLFxuICAgICAgdGFpbHdpbmRCZzogJ2JnLXJlZC01MDAvMjAnLFxuICAgICAgbGFiZWw6ICdFS1NUUkVNQUxOWSAoOTAtMTAwJSknLFxuICAgICAgcHVsc2VEdXJhdGlvbjogMC43NVxuICAgIH07XG4gIH0gZWxzZSBpZiAoc2NvcmUgPj0gODApIHtcbiAgICAvLyBDemVyd29ueSBTemthcsWCYXQgLyBSb3NlLUNyaW1zb24gKDgwIC0gODklKVxuICAgIHJldHVybiB7XG4gICAgICBoZXg6ICcjZjQzZjVlJyxcbiAgICAgIGdsb3dIZXg6ICdyZ2JhKDI0NCwgNjMsIDk0LCAwLjg1KScsXG4gICAgICB0YWlsd2luZFRleHQ6ICd0ZXh0LXJvc2UtNTAwJyxcbiAgICAgIHRhaWx3aW5kQm9yZGVyOiAnYm9yZGVyLXJvc2UtNTAwJyxcbiAgICAgIHRhaWx3aW5kQmc6ICdiZy1yb3NlLTUwMC8yMCcsXG4gICAgICBsYWJlbDogJ0tSWVRZQ1pOWSAoODAtODklKScsXG4gICAgICBwdWxzZUR1cmF0aW9uOiAxLjA1XG4gICAgfTtcbiAgfSBlbHNlIGlmIChzY29yZSA+PSA2OCkge1xuICAgIC8vIFBvbWFyYcWEY3pvd3kgLyBOZW9uIEFtYmVyLU9yYW5nZSAoNjggLSA3OSUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhleDogJyNmOTczMTYnLFxuICAgICAgZ2xvd0hleDogJ3JnYmEoMjQ5LCAxMTUsIDIyLCAwLjgpJyxcbiAgICAgIHRhaWx3aW5kVGV4dDogJ3RleHQtb3JhbmdlLTQwMCcsXG4gICAgICB0YWlsd2luZEJvcmRlcjogJ2JvcmRlci1vcmFuZ2UtNTAwJyxcbiAgICAgIHRhaWx3aW5kQmc6ICdiZy1vcmFuZ2UtNTAwLzIwJyxcbiAgICAgIGxhYmVsOiAnV1lTT0tJICg2OC03OSUpJyxcbiAgICAgIHB1bHNlRHVyYXRpb246IDEuNDVcbiAgICB9O1xuICB9IGVsc2Uge1xuICAgIC8vIMW7w7PFgnR5IC8gTmVvbiBXYXJuaW5nIFllbGxvdyAoNTAgLSA2NyUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhleDogJyNmYWNjMTUnLFxuICAgICAgZ2xvd0hleDogJ3JnYmEoMjUwLCAyMDQsIDIxLCAwLjc1KScsXG4gICAgICB0YWlsd2luZFRleHQ6ICd0ZXh0LXllbGxvdy00MDAnLFxuICAgICAgdGFpbHdpbmRCb3JkZXI6ICdib3JkZXIteWVsbG93LTUwMCcsXG4gICAgICB0YWlsd2luZEJnOiAnYmcteWVsbG93LTUwMC8yMCcsXG4gICAgICBsYWJlbDogJ09TVFJaRUdBV0NaWSAoNTAtNjclKScsXG4gICAgICBwdWxzZUR1cmF0aW9uOiAxLjlcbiAgICB9O1xuICB9XG59XG5cbi8vIEluaWNqYWxuZSA0IEtvbmNlbnRyeWN6bmUgV2Fyc3R3eSBPY2hyb25uZSBNb25vbGl0dSBTeXN0ZW1vd2Vnb1xuZXhwb3J0IGNvbnN0IElOSVRJQUxfU0VDVVJFRF9MQVlFUlM6IFNlY3VyZWRMYXllclpvbmVbXSA9IFtcbiAge1xuICAgIGxheWVySW5kZXg6IDAsXG4gICAgbmFtZTogJ1dhcnN0d2EgMDogUmR6ZcWEIE1vbm9saXR1IChLZXJuZWwgTlQgUmluZy0wKScsXG4gICAgZGVwdGhSYW5nZUttOiAnMCAtIDI1IEtNJyxcbiAgICBtaW5EaXN0YW5jZTogMCxcbiAgICBtYXhEaXN0YW5jZTogMC4yNSxcbiAgICBpc1NlY3VyZWQ6IHRydWUsXG4gICAgc3RhZ2U6ICdGT1JUSUZJRUQnLFxuICAgIHNoaWVsZFBlcmNlbnQ6IDEwMCxcbiAgICBsYXNlckludGVuc2l0eTogOTAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogNCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDEsXG4gICAgZGVzY3JpcHRpb246ICdDZW50cmFsbmUgasSFZHJvIG9wZXJhY3lqbmUsIERpc3BhdGNoZXIgc3lzY2FsbCBpIEtlcm5lbCBHdWFyZC4nXG4gIH0sXG4gIHtcbiAgICBsYXllckluZGV4OiAxLFxuICAgIG5hbWU6ICdXYXJzdHdhIDE6IFBhbWnEmcSHIFJBTSAmIE1hZ2lzdHJhbGUgTWFnaXN0cmFsbmUnLFxuICAgIGRlcHRoUmFuZ2VLbTogJzI1IC0gNTAgS00nLFxuICAgIG1pbkRpc3RhbmNlOiAwLjI1LFxuICAgIG1heERpc3RhbmNlOiAwLjUwLFxuICAgIGlzU2VjdXJlZDogZmFsc2UsXG4gICAgc3RhZ2U6ICdJRExFJyxcbiAgICBzaGllbGRQZXJjZW50OiAzNSxcbiAgICBsYXNlckludGVuc2l0eTogMCxcbiAgICBhY3RpdmVCZWFtc0NvdW50OiAwLFxuICAgIGNsZWFuc2VkTm9kZXNDb3VudDogMCxcbiAgICBkZXNjcmlwdGlvbjogJ1N6eW5hIHBhbWnEmWNpIFJBTSBERFI1LCBzdHJlZnkgRExMIGkgcGlhc2tvd25pY2EgTnRTdXNwZW5kUHJvY2Vzcy4nXG4gIH0sXG4gIHtcbiAgICBsYXllckluZGV4OiAyLFxuICAgIG5hbWU6ICdXYXJzdHdhIDI6IFB1bHBpdCBNb25pdG9yYSAmIFVyesSFZHplbmlhIEkvTyAoSElEKScsXG4gICAgZGVwdGhSYW5nZUttOiAnNTAgLSA3NSBLTScsXG4gICAgbWluRGlzdGFuY2U6IDAuNTAsXG4gICAgbWF4RGlzdGFuY2U6IDAuNzUsXG4gICAgaXNTZWN1cmVkOiBmYWxzZSxcbiAgICBzdGFnZTogJ0lETEUnLFxuICAgIHNoaWVsZFBlcmNlbnQ6IDI1LFxuICAgIGxhc2VySW50ZW5zaXR5OiAwLFxuICAgIGFjdGl2ZUJlYW1zQ291bnQ6IDAsXG4gICAgY2xlYW5zZWROb2Rlc0NvdW50OiAwLFxuICAgIGRlc2NyaXB0aW9uOiAnQnVmb3IgcmFta2kgRFdNLCBwdWxwaXQgbW9uaXRvcmEsIGtsYXdpYXR1cmEgaSB3c2thxbpuaWsgbXlzenkuJ1xuICB9LFxuICB7XG4gICAgbGF5ZXJJbmRleDogMyxcbiAgICBuYW1lOiAnV2Fyc3R3YSAzOiBQZXJ5bWV0ciBTaWVjaW93eSBOSUMgJiBNYWdhenluIE5WTWUnLFxuICAgIGRlcHRoUmFuZ2VLbTogJzc1IC0gMTAwIEtNJyxcbiAgICBtaW5EaXN0YW5jZTogMC43NSxcbiAgICBtYXhEaXN0YW5jZTogMS4wMCxcbiAgICBpc1NlY3VyZWQ6IGZhbHNlLFxuICAgIHN0YWdlOiAnSURMRScsXG4gICAgc2hpZWxkUGVyY2VudDogMTUsXG4gICAgbGFzZXJJbnRlbnNpdHk6IDAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogMCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDAsXG4gICAgZGVzY3JpcHRpb246ICdaZXduxJl0cnpueSBwZXJ5bWV0ciBzaWVjaW93eSwgemFwb3JhIFdGUCBpIHN5c3RlbSBwbGlrw7N3IGR5c2tvd3ljaCBOVEZTLidcbiAgfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExheWVySW5kZXhGb3JEaXN0YW5jZShkaXN0YW5jZVJhdGlvOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoZGlzdGFuY2VSYXRpbyA8PSAwLjI1KSByZXR1cm4gMDtcbiAgaWYgKGRpc3RhbmNlUmF0aW8gPD0gMC41MCkgcmV0dXJuIDE7XG4gIGlmIChkaXN0YW5jZVJhdGlvIDw9IDAuNzUpIHJldHVybiAyO1xuICByZXR1cm4gMztcbn1cblxuLy8gSW5pY2phbG5lIHB1bmt0eSB3ZWrFm2NpYSBpIHd5asWbY2lhIG1vbm9saXR1IHN5c3RlbW93ZWdvXG5jb25zdCBJTklUSUFMX1NZU1RFTV9JT19OT0RFUzogU3lzdGVtSU9Ob2RlW10gPSBbXG4gIHtcbiAgICBpZDogJ25vZGUtbW9uaXRvcicsXG4gICAgbmFtZTogJ01vbml0b3IgJiBCdWZvciBSYW1raSAoRGlzcGxheSBQaXBlbGluZSknLFxuICAgIGNvZGU6ICdPVVQtRFdNLTAxJyxcbiAgICB0eXBlOiAnT1VUUFVUJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ludGVncmFsbnkgcHVscGl0IG5hd2lnYWN5am55LCBtZW5lZMW8ZXIgb2tpZW4gRFdNLCBEaXJlY3QzRCBpIHN0cnVtaWXFhCBwaWtzZWxpIG5hIGVrcmFuLicsXG4gICAgc3RhdHVzOiAnQ09NUFJPTUlTRUQnLFxuICAgIHhSYXRpbzogNTAsXG4gICAgeVJhdGlvOiAxOCxcbiAgICByYWRhckFuZ2xlRGVnOiAwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC43MixcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnNEsgQCAxNDRIeiAoMTguMiBHYnBzKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6ICdnbmlkYS0wMScsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdUb3BNb3N0IFdpbmRvdyBCYXJyaWVyICYgRGlyZWN0RmxpcCBTYW5kYm94JyxcbiAgICBzaGllbGRMYXllckluZGV4OiAyLFxuICAgIGlzU2hpZWxkZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUta2V5Ym9hcmQnLFxuICAgIG5hbWU6ICdLbGF3aWF0dXJhICYgU3Vyb3d5IFN0cnVtaWXFhCBISUQgKFJhdyBJbnB1dCknLFxuICAgIGNvZGU6ICdJTi1LQkQtMDInLFxuICAgIHR5cGU6ICdJTlBVVCcsXG4gICAgZGVzY3JpcHRpb246ICdTdGVyb3duaWsgaTgwNDJwcnQvVVNCIEhJRCwgcMSZdGxhIHpkYXJ6ZcWEIGtsYXdpc3p5IGkga29sZWprYSBXTV9LRVlET1dOLicsXG4gICAgc3RhdHVzOiAnT1BUSU1BTCcsXG4gICAgeFJhdGlvOiAyMixcbiAgICB5UmF0aW86IDM4LFxuICAgIHJhZGFyQW5nbGVEZWc6IDMxMCxcbiAgICByYWRhclJpbmdSYWRpdXM6IDAuNjUsXG4gICAgdHJhZmZpY0JhbmR3aWR0aDogJzEwMDAgSHogUG9sbGluZyAoNjQgQi9zKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdXSF9LRVlCT0FSRCBIb29rIERlZmxlY3RvcicsXG4gICAgc2hpZWxkTGF5ZXJJbmRleDogMixcbiAgICBpc1NoaWVsZGVkOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtbW91c2UnLFxuICAgIG5hbWU6ICdNeXN6ICYgV3NrYcW6bmlrIEVrcmFub3d5IChQb2ludGVyIEVuZ2luZSknLFxuICAgIGNvZGU6ICdJTi1QVFItMDMnLFxuICAgIHR5cGU6ICdJTlBVVCcsXG4gICAgZGVzY3JpcHRpb246ICdLdXJzb3IgZWtyYW5vd3ksIHByemVjaHd5dHl3YW5pZSBmb2t1c3UgbXlzenkgaSBncmFuaWNlIENsaXBDdXJzb3IuJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB4UmF0aW86IDc4LFxuICAgIHlSYXRpbzogMzgsXG4gICAgcmFkYXJBbmdsZURlZzogNTAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjY1LFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICc4MDAwIERQSSAoMTI4IEIvcyknLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnRm9jdXMgVGhlZnQgTmV1dHJhbGl6ZXInLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDIsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLW5pYycsXG4gICAgbmFtZTogJ0thcnRhIFNpZWNpb3dhIE5JQyAmIEduaWF6ZGEgVENQL1VEUCcsXG4gICAgY29kZTogJ0lPLU5JQy0wNCcsXG4gICAgdHlwZTogJ0lOUFVUX09VVFBVVCcsXG4gICAgZGVzY3JpcHRpb246ICdJbnRlcmZlanMgc2llY2lvd3ksIHdlasWbY2llIHBha2lldMOzdyB6IGludGVybmV0dSBpIHd5asWbY2llIGVrc2ZpbHRyYWNqaSB0ZWxlbWV0cnljem5lai4nLFxuICAgIHN0YXR1czogJ0NPTVBST01JU0VEJyxcbiAgICB4UmF0aW86IDE1LFxuICAgIHlSYXRpbzogNjUsXG4gICAgcmFkYXJBbmdsZURlZzogMjMwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC44NSxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnMi41IEdicHMgRnVsbC1EdXBsZXgnLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiAnZ25pZGEtMDMnLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnV0ZQIEtlcm5lbCBQYWNrZXQgRmlyZXdhbGwnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDMsXG4gICAgaXNTaGllbGRlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1yYW0nLFxuICAgIG5hbWU6ICdTenluYSBQYW1pxJljaSBSQU0gJiBNb3N0ZWsgUGFtacSZY2kgSG9zdCcsXG4gICAgY29kZTogJ0JVUy1SQU0tMDUnLFxuICAgIHR5cGU6ICdDT1JFX0JVUycsXG4gICAgZGVzY3JpcHRpb246ICdNYWdpc3RyYWxhIHBhbWnEmWNpIG9wZXJhY3lqbmVqIEREUjUsIHByemVzdHJ6ZcWEIGFkcmVzb3dhIGrEhWRyYSBpIGJ1Zm9yIHdzdHJ6eWtuacSZxIcgRExMLicsXG4gICAgc3RhdHVzOiAnQ09NUFJPTUlTRUQnLFxuICAgIHhSYXRpbzogNTAsXG4gICAgeVJhdGlvOiA1MCxcbiAgICByYWRhckFuZ2xlRGVnOiAxODAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjM1LFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICc2NCBHQi9zIChERFI1LTYwMDApJyxcbiAgICBjb21wcm9taXNlZEJ5R25pZGFJZDogJ2duaWRhLTA0JyxcbiAgICBwcm90ZWN0aW5nQmFycmllcjogJ050U3VzcGVuZFByb2Nlc3MgTWVtb3J5IFNhbmRib3gnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDEsXG4gICAgaXNTaGllbGRlZDogZmFsc2VcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1zdG9yYWdlJyxcbiAgICBuYW1lOiAnU3Vic3lzdGVtIER5c2tvd3kgTlZNZSAmIFN5c3RlbSBQbGlrw7N3IE5URlMnLFxuICAgIGNvZGU6ICdJTy1OVk1FLTA2JyxcbiAgICB0eXBlOiAnSU5QVVRfT1VUUFVUJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhbWnEmcSHIG1hc293YSwgb2Rjenl0IGkgemFwaXMgcGxpa8OzdyB3eWtvbnl3YWxueWNoIFBFLCB0YWJsaWNlIE1CUi9HUFQuJyxcbiAgICBzdGF0dXM6ICdDT01QUk9NSVNFRCcsXG4gICAgeFJhdGlvOiA4NSxcbiAgICB5UmF0aW86IDY1LFxuICAgIHJhZGFyQW5nbGVEZWc6IDEzMCxcbiAgICByYWRhclJpbmdSYWRpdXM6IDAuODIsXG4gICAgdHJhZmZpY0JhbmR3aWR0aDogJzc0MDAgTUIvcyBSZWFkIC8gNjgwMCBNQi9zIFdyaXRlJyxcbiAgICBjb21wcm9taXNlZEJ5R25pZGFJZDogJ2duaWRhLTAyJyxcbiAgICBwcm90ZWN0aW5nQmFycmllcjogJ1BFIEhlYWRlciBTYWJvdGFnZSAmIGljYWNscyBRdWFyYW50aW5lJyxcbiAgICBzaGllbGRMYXllckluZGV4OiAzLFxuICAgIGlzU2hpZWxkZWQ6IGZhbHNlXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtdXNiJyxcbiAgICBuYW1lOiAnTWFnaXN0cmFsYSBVU0IgJiBQb3J0eSBQZXJ5ZmVyeWpuZScsXG4gICAgY29kZTogJ0lPLVVTQi0wNycsXG4gICAgdHlwZTogJ0lOUFVUX09VVFBVVCcsXG4gICAgZGVzY3JpcHRpb246ICdQb3J0eSB6ZXduxJl0cnpuZSBVU0ItQyAvIFRodW5kZXJib2x0LCB3ZWt0b3J5IGZpenljem5lZ28gd3Byb3dhZHphbmlhIGRhbnljaC4nLFxuICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgIHhSYXRpbzogMzAsXG4gICAgeVJhdGlvOiA4MixcbiAgICByYWRhckFuZ2xlRGVnOiAyMDAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjU4LFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICdVU0IgNC4wICg0MCBHYnBzKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdVU0IgRGV2aWNlIERlc2NyaXB0b3IgRmlsdGVyJyxcbiAgICBzaGllbGRMYXllckluZGV4OiAyLFxuICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1hdWRpbycsXG4gICAgbmFtZTogJ0thcnRhIETFundpxJlrb3dhICYgUHJ6ZXR3b3JuaWsgQXVkaW8gREFDJyxcbiAgICBjb2RlOiAnT1VULUFVRC0wOCcsXG4gICAgdHlwZTogJ09VVFBVVCcsXG4gICAgZGVzY3JpcHRpb246ICdXeWrFm2NpZSBzeWduYcWCw7N3IGFrdXN0eWN6bnljaCwgc3ludGV0eWN6bmUgYWxhcm15IGJvam93ZSBpIGJ1Zm9yIGTFundpxJlrb3d5LicsXG4gICAgc3RhdHVzOiAnT1BUSU1BTCcsXG4gICAgeFJhdGlvOiA3MCxcbiAgICB5UmF0aW86IDgyLFxuICAgIHJhZGFyQW5nbGVEZWc6IDE2MCxcbiAgICByYWRhclJpbmdSYWRpdXM6IDAuNTgsXG4gICAgdHJhZmZpY0JhbmR3aWR0aDogJzMyLWJpdCAvIDE5MiBrSHogKEhEIEF1ZGlvKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdXQVNBUEkgRXhjbHVzaXZlIFN0cmVhbSBTaGllbGQnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDIsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLWtlcm5lbCcsXG4gICAgbmFtZTogJ0R5c3Bvenl0b3IgSsSFZHJhICYgUMSZdGxhIEtvbXVuaWthdMOzdyBXaW4zMicsXG4gICAgY29kZTogJ0NPUkUtTlQtMDAnLFxuICAgIHR5cGU6ICdDT1JFX0JVUycsXG4gICAgZGVzY3JpcHRpb246ICdDZW50cmFsbnkgcmR6ZcWEIG1vbm9saXR5Y3pueSwgb2JzxYJ1Z2Egd3l3b8WCYcWEIHN5c3RlbW93eWNoIHN5c2NhbGwgaSBrb2xlamthIEdldE1lc3NhZ2UuJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB4UmF0aW86IDUwLFxuICAgIHlSYXRpbzogMzUsXG4gICAgcmFkYXJBbmdsZURlZzogOTAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjIwLFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICdSaW5nIDAgRGlzcGF0Y2hlciAoMC4xIG5zKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdQYXRjaEd1YXJkICYgS2VybmVsIEd1YXJkIEJhcnJpZXInLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDAsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9XG5dO1xuXG4vLyBJbmljamFsbmEgZXNrYWRyYSBHbmlkIChXaXJ1c8OzdyBpIHrFgm/Fm2xpd2VnbyBvcHJvZ3JhbW93YW5pYSlcbmNvbnN0IElOSVRJQUxfUkFEQVJfR05JREFTOiBSYWRhckduaWRhVGFyZ2V0W10gPSBbXG4gIHtcbiAgICBpZDogJ2duaWRhLTAxJyxcbiAgICBuYW1lOiAnR25pZGEtMDEgW05ha8WCYWRrYSBFa3Jhbm93YSBGbHV0dGVyXScsXG4gICAgZ25pZGFUeXBlOiAnR05JREFfRUtSQU5PV0EnLFxuICAgIHR5cGVMYWJlbDogJ0duaWRhIEVrcmFub3dhIChTY3JlZW4gTG9ja2VyKScsXG4gICAgYmVhcmluZ0RlZzogMTUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC43MixcbiAgICBhbHRpdHVkZUttOiAxMi40LFxuICAgIHRocmVhdExldmVsOiAnRUtTVFJFTUFMTlknLFxuICAgIHRocmVhdFNjb3JlOiA5NixcbiAgICBzdGF0ZTogJ1dZS1JZVEEnLFxuICAgIGhlYWx0aFBlcmNlbnQ6IDEwMCxcbiAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLW1vbml0b3InLFxuICAgIHNpZ25hdHVyZVNoYTogJ2UzYjBjNDQyOThmYzFjMTQ5YWZiZjRjODk5NmZiOTI0MjdhZTQxZTQ2NDliOTM0Y2E0OTU5OTFiNzg1MmI4NTUnLFxuICAgIGFjdGl2ZVByb2Nlc3NOYW1lOiAnZmx1dHRlcl9zY3JlZW5faGlqYWNrLmV4ZScsXG4gICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnV3ltdXN6YSBzdGHFgmUgb2tubyBIV05EX1RPUE1PU1QgbmEgbW9uaXRvcnplLCBibG9rdWplIGt1cnNvciBteXN6eSBpIHd5d8WCYXN6Y3phIGZva3VzIHB1bHBpdHUuJyxcbiAgICBpbmZlY3Rpb25WZWN0b3I6ICdaYWluZmVrb3dhbmEgYmlibGlvdGVrYSBrb21wb25lbnTDs3cgb2tpZW5rb3d5Y2ggcHViLmRldiAvIFN1cHBseSBDaGFpbicsXG4gICAgdmVsb2NpdHk6IDQyMFxuICB9LFxuICB7XG4gICAgaWQ6ICdnbmlkYS0wMicsXG4gICAgbmFtZTogJ0duaWRhLTAyIFtTenlmcmF0b3IgTWFzb3d5IEJsYWNrQ2F0XScsXG4gICAgZ25pZGFUeXBlOiAnR05JREFfU1pZRlJVSkFDQScsXG4gICAgdHlwZUxhYmVsOiAnR25pZGEgU3p5ZnJ1asSFY2EgKFJhbnNvbXdhcmUpJyxcbiAgICBiZWFyaW5nRGVnOiAxMzUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC44MCxcbiAgICBhbHRpdHVkZUttOiAxOC4yLFxuICAgIHRocmVhdExldmVsOiAnRUtTVFJFTUFMTlknLFxuICAgIHRocmVhdFNjb3JlOiA5OCxcbiAgICBzdGF0ZTogJ1dZS1JZVEEnLFxuICAgIGhlYWx0aFBlcmNlbnQ6IDEwMCxcbiAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLXN0b3JhZ2UnLFxuICAgIHNpZ25hdHVyZVNoYTogJzdmODNiMTY1N2ZmMWZjNTNiOTJkYzE4MTQ4YTFkNjVkZmMyZDRiMWZhM2Q2NzcyODRhZGRkMjAwMTI2ZDkwNjknLFxuICAgIGFjdGl2ZVByb2Nlc3NOYW1lOiAnYmxhY2tjYXRfZW5jcnlwdG9yLmV4ZScsXG4gICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnUHJ6ZWptdWplIHfEhXRraSBJL08gZHlza3UgTlZNZSwgc3p5ZnJ1amUgcGxpa2kgYmluYXJuZSBhbGdvcnl0bWVtIENoYUNoYTIwIGkgbmlzemN6eSBrb3BpZSB3IHRsZS4nLFxuICAgIGluZmVjdGlvblZlY3RvcjogJ1pkYWxuZSB3eWtvbmFuaWUga29kdSBwcnpleiBwb2RhdG5vxZvEhyBzZXJ3ZXJhIFZQTicsXG4gICAgdmVsb2NpdHk6IDU4MFxuICB9LFxuICB7XG4gICAgaWQ6ICdnbmlkYS0wMycsXG4gICAgbmFtZTogJ0duaWRhLTAzIFtaxYJvZHppZWogRGFueWNoIFJlZExpbmVdJyxcbiAgICBnbmlkYVR5cGU6ICdHTklEQV9TWlBJRUdPV1NLQScsXG4gICAgdHlwZUxhYmVsOiAnR25pZGEgU3pwaWVnb3dza2EgKFN0ZWFsZXIpJyxcbiAgICBiZWFyaW5nRGVnOiAyMjUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC44MyxcbiAgICBhbHRpdHVkZUttOiA5LjgsXG4gICAgdGhyZWF0TGV2ZWw6ICdLUllUWUNaTlknLFxuICAgIHRocmVhdFNjb3JlOiA4NCxcbiAgICBzdGF0ZTogJ1dZS1JZVEEnLFxuICAgIGhlYWx0aFBlcmNlbnQ6IDEwMCxcbiAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLW5pYycsXG4gICAgc2lnbmF0dXJlU2hhOiAnMTg1ZjhkYjMyMjcxZmUyNWY1NjFhNmZjOTM4YjJlMjY0MzA2ZWMzMDRlZGE1MTgwMDdkMTc2NDgyNjM4MTk2OScsXG4gICAgYWN0aXZlUHJvY2Vzc05hbWU6ICdyZWRsaW5lX3N0ZWFsZXJfYWdlbnQuZXhlJyxcbiAgICBhZ2dyZXNzaW9uRGVzY3JpcHRpb246ICdPdHdpZXJhIHVrcnl0ZSBnbmlhemRhIFRDUCBkbyBzZXJ3ZXJhIEMyIGkgZWtzZmlsdHJ1amUgcG/Fm3dpYWRjemVuaWEgeiBwcnplZ2zEhWRhcmVrIG9yYXogcG9ydGZlbMOzdy4nLFxuICAgIGluZmVjdGlvblZlY3RvcjogJ1Nrb21wcm9taXRvd2FueSBpbnN0YWxhdG9yIG9wcm9ncmFtb3dhbmlhIHogc2llY2kgUDJQJyxcbiAgICB2ZWxvY2l0eTogMzEwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2duaWRhLTA0JyxcbiAgICBuYW1lOiAnR25pZGEtMDQgW1dzdHJ6eWtpd2FjeiBQYW1pxJljaSBHaG9zdEhvb2tdJyxcbiAgICBnbmlkYVR5cGU6ICdHTklEQV9QQVNPWllUTklDWkEnLFxuICAgIHR5cGVMYWJlbDogJ0duaWRhIFBhc2/FvHl0bmljemEgKE1lbW9yeSBIb29rKScsXG4gICAgYmVhcmluZ0RlZzogMTc1LFxuICAgIGRpc3RhbmNlUmF0aW86IDAuMzgsXG4gICAgYWx0aXR1ZGVLbTogMTQuMSxcbiAgICB0aHJlYXRMZXZlbDogJ1dZU09LSScsXG4gICAgdGhyZWF0U2NvcmU6IDc2LFxuICAgIHN0YXRlOiAnV1lLUllUQScsXG4gICAgaGVhbHRoUGVyY2VudDogMTAwLFxuICAgIGFzc29jaWF0ZWRJT05vZGVJZDogJ25vZGUtcmFtJyxcbiAgICBzaWduYXR1cmVTaGE6ICdjYjQ3NzE2OTRmNGEzNjM2ZjQwMDdiOGE3MzM3OTJjYjE1MzE2NDk5ODc4MmEyMDgwYTI5MDIzODA1M2E0NzkyJyxcbiAgICBhY3RpdmVQcm9jZXNzTmFtZTogJ2dob3N0X3JhbV9pbmplY3Rvci5kbGwnLFxuICAgIGFnZ3Jlc3Npb25EZXNjcmlwdGlvbjogJ1dzdHJ6eWt1amUgesWCb8WbbGl3eSBrb2QgZG8gcHJ6ZXN0cnplbmkgYWRyZXNvd2VqIHByb2Nlc8OzdyBzeXN0ZW1vd3ljaCAoUHJvY2VzcyBIb2xsb3dpbmcpLicsXG4gICAgaW5mZWN0aW9uVmVjdG9yOiAnUG9kYXRub8WbxIcgRExMIEhpamFja2luZyB3IHphdWZhbmVqIGFwbGlrYWNqaSBsb2thbG5laicsXG4gICAgdmVsb2NpdHk6IDI1MFxuICB9LFxuICB7XG4gICAgaWQ6ICdnbmlkYS0wNScsXG4gICAgbmFtZTogJ0duaWRhLTA1IFtOaXN6Y3p5Y2llbCBEeXNrw7N3IEhlcm1ldGljXScsXG4gICAgZ25pZGFUeXBlOiAnR05JREFfREVTVFJVS0NZSk5BJyxcbiAgICB0eXBlTGFiZWw6ICdHbmlkYSBEZXN0cnVrY3lqbmEgKERpc2sgV2lwZXIpJyxcbiAgICBiZWFyaW5nRGVnOiAyODUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC42NSxcbiAgICBhbHRpdHVkZUttOiAyMi4wLFxuICAgIHRocmVhdExldmVsOiAnRUtTVFJFTUFMTlknLFxuICAgIHRocmVhdFNjb3JlOiAxMDAsXG4gICAgc3RhdGU6ICdXWUtSWVRBJyxcbiAgICBoZWFsdGhQZXJjZW50OiAxMDAsXG4gICAgYXNzb2NpYXRlZElPTm9kZUlkOiAnbm9kZS1zdG9yYWdlJyxcbiAgICBzaWduYXR1cmVTaGE6ICcwM2MzOTM4NWQzOGZmMDJhOTY5YjgyOGJmZWJmYTE0NmU0OTJiNDUwNzAwMDNjYmJhOGQ0MmNiM2E5NWRjZmMxJyxcbiAgICBhY3RpdmVQcm9jZXNzTmFtZTogJ2hlcm1ldGljX21icl93aXBlci5zeXMnLFxuICAgIGFnZ3Jlc3Npb25EZXNjcmlwdGlvbjogJ05hZHBpc3VqZSB6ZXJhbWkgc2VrdG9yIHJvenJ1Y2hvd3kgTUJSIG9yYXogdGFibGljxJkgcGFydHljamkgTlRGUywgdW5pZW1vxbxsaXdpYWrEhWMgc3RhcnQgc3lzdGVtdS4nLFxuICAgIGluZmVjdGlvblZlY3RvcjogJ1phaW5mZWtvd2FuYSBha3R1YWxpemFjamEgb3Byb2dyYW1vd2FuaWEgYmF6b2Rhbm93ZWdvJyxcbiAgICB2ZWxvY2l0eTogNjQwXG4gIH1cbl07XG5cbmV4cG9ydCBjb25zdCBNaWxpdGFyeVJhZGFyU2Nhbm5lcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIC8vIFN0YXRlXG4gIGNvbnN0IFtnbmlkYXMsIHNldEduaWRhc10gPSB1c2VTdGF0ZTxSYWRhckduaWRhVGFyZ2V0W10+KCgpID0+IHtcbiAgICByZXR1cm4gc2FmZVN0b3JhZ2UuZ2V0PFJhZGFyR25pZGFUYXJnZXRbXT4oJ3NlbnRpbmVsX3JhZGFyX2duaWRhcycsIElOSVRJQUxfUkFEQVJfR05JREFTKTtcbiAgfSk7XG4gIGNvbnN0IFtpb05vZGVzLCBzZXRJb05vZGVzXSA9IHVzZVN0YXRlPFN5c3RlbUlPTm9kZVtdPigoKSA9PiB7XG4gICAgcmV0dXJuIHNhZmVTdG9yYWdlLmdldDxTeXN0ZW1JT05vZGVbXT4oJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgSU5JVElBTF9TWVNURU1fSU9fTk9ERVMpO1xuICB9KTtcbiAgY29uc3QgW3NlY3VyZWRMYXllcnMsIHNldFNlY3VyZWRMYXllcnNdID0gdXNlU3RhdGU8U2VjdXJlZExheWVyWm9uZVtdPigoKSA9PiB7XG4gICAgcmV0dXJuIHNhZmVTdG9yYWdlLmdldDxTZWN1cmVkTGF5ZXJab25lW10+KCdzZW50aW5lbF9yYWRhcl9zZWN1cmVkX2xheWVycycsIElOSVRJQUxfU0VDVVJFRF9MQVlFUlMpO1xuICB9KTtcblxuICBjb25zdCBbY2FzY2FkZVN0YXRlLCBzZXRDYXNjYWRlU3RhdGVdID0gdXNlU3RhdGU8QW50aXZpcnVzQ2FzY2FkZVN0YXRlPih7XG4gICAgc3RhZ2U6ICdJRExFJyxcbiAgICBpc0FjdGl2ZTogZmFsc2UsXG4gICAgY3VycmVudFNlY3Rvck5hbWU6ICdSZHplxYQgTW9ub2xpdHUgKFdhcnN0d2EgMCknLFxuICAgIGN1cnJlbnRCZWFyaW5nRGVnOiAwLFxuICAgIGN1cnJlbnREaXN0YW5jZVJhdGlvOiAwLjIsXG4gICAgYWN0aXZlTGFzZXJPcmlnaW46IG51bGwsXG4gICAgYWN0aXZlTGFzZXJUYXJnZXRzOiBbXSxcbiAgICBzZWN1cmVkTGF5ZXJzOiBJTklUSUFMX1NFQ1VSRURfTEFZRVJTLFxuICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogZmFsc2UsXG4gICAgb3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudDogNDUsXG4gICAgc3RhdHVzTWVzc2FnZTogJ0dvdG93b8WbxIcga2Fza2Fkb3dlaiBiYXJpZXJ5IGFudHl3aXJ1c293ZWo6IDAgbXMgbmF0eWNobWlhc3Rvd2EgYmxva2FkYSDinpQgTGFzZXIgc2VrdG9yb3d5IOKelCBQcm9wYWdhY2phIG5hIHPEhXNpZWRuaWUgd2Fyc3R3eS4nXG4gIH0pO1xuXG4gIGNvbnN0IFtodW50ZXJTdGF0ZSwgc2V0SHVudGVyU3RhdGVdID0gdXNlU3RhdGU8R2VtaW5pSHVudGVyUmFkYXJTdGF0ZT4oe1xuICAgIGNhbGxzaWduOiAnR0VNSU5JLUhVTlRFUi0wMScsXG4gICAgYmVhcmluZ0RlZzogNDUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC4yNSxcbiAgICB0YXJnZXRHbmlkYUlkOiBudWxsLFxuICAgIHN0YXR1czogJ1BBVFJPTCcsXG4gICAgcmVwYWlyUHJvZ3Jlc3M6IDQ1LFxuICAgIHNsYXVnaHRlclBvd2VyOiA5OCxcbiAgICBpbnRlcmNlcHRTcGVlZDogODIwLFxuICAgIGtpbGxzQ291bnQ6IDAsXG4gICAgZml4ZWROb2Rlc0NvdW50OiAwXG4gIH0pO1xuXG4gIC8vIFJhZGFyIENvbnRyb2xzXG4gIGNvbnN0IFtpc1NjYW5uaW5nLCBzZXRJc1NjYW5uaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3dlZXBBbmdsZSwgc2V0U3dlZXBBbmdsZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3N3ZWVwU3BlZWRScG0sIHNldFN3ZWVwU3BlZWRScG1dID0gdXNlU3RhdGUoMjQpOyAvLyBPYnJvdHkgbmEgbWludXTEmVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRJZCwgc2V0U2VsZWN0ZWRUYXJnZXRJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignZ25pZGEtMDEnKTtcbiAgY29uc3QgW2FjdGl2ZVZpZXdNb2RlLCBzZXRBY3RpdmVWaWV3TW9kZV0gPSB1c2VTdGF0ZTwnUkFEQVJfUFBJJyB8ICdEQVRBX0ZMT1dfTUFQJyB8ICdNT05PTElUSF9TVVJGQUNFJyB8ICdDT01CQVRfTE9HUyc+KCdSQURBUl9QUEknKTtcbiAgY29uc3QgW3JhZGFyUmFuZ2VLbSwgc2V0UmFkYXJSYW5nZUttXSA9IHVzZVN0YXRlPG51bWJlcj4oMTAwKTtcbiAgY29uc3QgW2lzQXVkaW9FbmFibGVkLCBzZXRJc0F1ZGlvRW5hYmxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthdXRvUHVyZ2VBY3RpdmUsIHNldEF1dG9QdXJnZUFjdGl2ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgLy8gQmFja2dyb3VuZCBEZXNrdG9wIFN3ZWVwIFdhdmUgU3RhdGUgJiBUZWxlbWV0cnlcbiAgY29uc3QgW2lzRGVza3RvcFN3ZWVwV2F2ZUFjdGl2ZSwgc2V0SXNEZXNrdG9wU3dlZXBXYXZlQWN0aXZlXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3dlZXBXYXZlU3BlZWRTZWNvbmRzLCBzZXRTd2VlcFdhdmVTcGVlZFNlY29uZHNdID0gdXNlU3RhdGU8bnVtYmVyPigzLjUpO1xuICBjb25zdCBbbWFudWFsU3dlZXBXYXZlVHJpZ2dlckNvdW50LCBzZXRNYW51YWxTd2VlcFdhdmVUcmlnZ2VyQ291bnRdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcblxuICAvLyBEb29tIFJheSBFbmdpbmUgU3RhdGUgKFByb21pZcWEIFphZ8WCYWR5IEduaWQpXG4gIGNvbnN0IFthY3RpdmVEb29tUmF5LCBzZXRBY3RpdmVEb29tUmF5XSA9IHVzZVN0YXRlPEFjdGl2ZURvb21SYXkgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzUmFkYXJFbmxhcmdlZCwgc2V0SXNSYWRhckVubGFyZ2VkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2Rvb21SYXlQcmVzZXQsIHNldERvb21SYXlQcmVzZXRdID0gdXNlU3RhdGU8Jzk0MFRIWl9DT05USU5VT1VTJyB8ICdQTEFTTUFfQkxBU1QnIHwgJ1JFVFJPXzEwMF9QVVJHRScgfCAnUVVBTlRVTV9ERUZSQUdNRU5UJz4oJzk0MFRIWl9DT05USU5VT1VTJyk7XG4gIGNvbnN0IFtzY3JlZW5GbGFzaEFjdGl2ZSwgc2V0U2NyZWVuRmxhc2hBY3RpdmVdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbdG90YWxEb29tS2lsbHMsIHNldFRvdGFsRG9vbUtpbGxzXSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIGNvbnN0IHBhcnRpY2xlc1JlZiA9IHVzZVJlZjxEb29tUmF5UGFydGljbGVbXT4oW10pO1xuXG4gIGNvbnN0IFtjb21iYXRMb2dzLCBzZXRDb21iYXRMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgYFtTWVMtQk9PVF0gSW5pY2phbGl6YWNqYSBSYWRhcnUgV29qc2tvd2VnbyBNb25vbGl0dSBTeXN0ZW1vd2VnbyAoUGFzbW8gWCAvIDkuNCBHSHopYCxcbiAgICBgW01PTk9MSVRIXSBabWFwb3dhbm8gOSB3xJl6xYLDs3cgd2VqxZtjaWEvd3lqxZtjaWEgKEkvTykgeiBpbnRlZ3JhY2rEhSBwdWxwaXR1IG1vbml0b3JhLmAsXG4gICAgYFtQUk9NSUXFgy1aQUfFgUFEWV0gR2VuZXJhdG9yIFdpxIV6a2kgRWtzdGVybWluYWNqaSA5NDAuOCBUSHogdyB0cnliaWUgbmF0eWNobWlhc3Rvd2VqIGdvdG93b8WbY2kgKDAgbXMpLmAsXG4gICAgYFtCQVJJRVJBLUtBU0tBRE9XQV0gR290b3dvxZvEhyA0LXN0b3BuaW93ZWdvIHN5c3RlbXUga29yZG9udTogMCBtcyDinpQgTGFzZXIg4p6UIFPEhXNpZWRuaWUgV2Fyc3R3eSDinpQgVHJ3YcWCZSBaYWJlenBpZWN6ZW5pZS5gLFxuICAgIGBbR0VNSU5JLUFJXSDFgW93Y2EgR2VtaW5pIG5hd2nEhXphxYIgxYLEhWN6bm/Fm8SHIHogcmFkaW9sYXRhcm5pxIUuIEdvdG93b8WbxIcgYm9qb3dhIGRvIHVib2p1IEduaWQ6IDEwMCUuYCxcbiAgICBgW0NaVUpOSUstR05JRF0gQXV0b25vbWljem55IGN6dWpuaWsgaSBkYWVtb24gbmF0eWNobWlhc3Rvd2VnbyBhdXRvLWZyZWV6dSAoMCBtcyBOdFN1c3BlbmRQcm9jZXNzKSBBS1RZV05ZLmBcbiAgXSk7XG4gIGNvbnN0IFtzZW5zb3JTdGF0dXMsIHNldFNlbnNvclN0YXR1c10gPSB1c2VTdGF0ZTxTZW5zb3JBdXRvbWF0b25TdGF0dXM+KCgpID0+IGduaWRhU2Vuc29yLmdldFN0YXR1cygpKTtcblxuICAvLyBTdWJzY3JpYmUgdG8gR25pZGEgU2Vuc29yIEF1dG9tYXRvblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gZ25pZGFTZW5zb3Iuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XG4gICAgICBzZXRTZW5zb3JTdGF0dXMoc3RhdHVzKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGhhbmRsZUF1dG9Gcm96ZW5FdmVudCA9IChlOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IGRldGFpbCA9IGUuZGV0YWlsO1xuICAgICAgaWYgKGRldGFpbCkge1xuICAgICAgICBhZGRDb21iYXRMb2coYFvimqEgQ1pVSk5JSyBHTklEIC0gQVVUTy1GUkVFWkVdIE5hdHljaG1pYXN0b3dlIHphbXJvxbxlbmllIHcgUkFNICgwIG1zKTogJHtkZXRhaWwudGFyZ2V0TmFtZX0gLT4gV8SZemXFgiBJL08gcHJ6eXdyw7Njb255IWApO1xuICAgICAgICBhZGRDb21iYXRMb2coYFvwn5SKIEFDT1VTVElDIEFMRVJUXSBFbWlzamEgbmllaW53YXp5am5lZ28gdG9udSBoYXB0eWN6bmVnbyBXZWIgQXVkaW8gQVBJICg1OCBIeiBzdWItYmFzcykgZGxhIHByb2Nlc3U6ICR7ZGV0YWlsLnRhcmdldE5hbWV9YCk7XG4gICAgICAgIC8vIFJlZnJlc2ggbG9jYWwgc3RhdGUgZnJvbSBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGN1cnJlbnRHbmlkYXMgPSBzYWZlU3RvcmFnZS5nZXQ8UmFkYXJHbmlkYVRhcmdldFtdPignc2VudGluZWxfcmFkYXJfZ25pZGFzJywgW10pO1xuICAgICAgICBjb25zdCBjdXJyZW50Tm9kZXMgPSBzYWZlU3RvcmFnZS5nZXQ8U3lzdGVtSU9Ob2RlW10+KCdzZW50aW5lbF9yYWRhcl9pb19ub2RlcycsIFtdKTtcbiAgICAgICAgaWYgKGN1cnJlbnRHbmlkYXMubGVuZ3RoKSBzZXRHbmlkYXMoY3VycmVudEduaWRhcyk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZXMubGVuZ3RoKSBzZXRJb05vZGVzKGN1cnJlbnROb2Rlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgaGFuZGxlQXV0b0Zyb3plbkV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6Z25pZGEtYXV0by1mcm96ZW4nLCBoYW5kbGVBdXRvRnJvemVuRXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYXVkaW9DdHhSZWYgPSB1c2VSZWY8QXVkaW9Db250ZXh0IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gSGVscGVyOiBTb3VuZCBTeW50aGVzaXplciBmb3IgUmFkYXIgQmVlcHMgYW5kIExhc2Vyc1xuICBjb25zdCBwbGF5UmFkYXJUb25lID0gdXNlQ2FsbGJhY2soKGZyZXE6IG51bWJlciwgZHVyYXRpb25NczogbnVtYmVyLCB0eXBlOiBPc2NpbGxhdG9yVHlwZSA9ICdzaW5lJykgPT4ge1xuICAgIGlmICghaXNBdWRpb0VuYWJsZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFhdWRpb0N0eFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dENsYXNzID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICBpZiAoQXVkaW9Db250ZXh0Q2xhc3MpIHtcbiAgICAgICAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gbmV3IEF1ZGlvQ29udGV4dENsYXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChhdWRpb0N0eFJlZi5jdXJyZW50ICYmIGF1ZGlvQ3R4UmVmLmN1cnJlbnQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XG4gICAgICAgIGF1ZGlvQ3R4UmVmLmN1cnJlbnQucmVzdW1lKCk7XG4gICAgICB9XG4gICAgICBpZiAoYXVkaW9DdHhSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBvc2MgPSBhdWRpb0N0eFJlZi5jdXJyZW50LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGF1ZGlvQ3R4UmVmLmN1cnJlbnQuY3JlYXRlR2FpbigpO1xuICAgICAgICBvc2MudHlwZSA9IHR5cGU7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgYXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjA0LCBhdWRpb0N0eFJlZi5jdXJyZW50LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBhdWRpb0N0eFJlZi5jdXJyZW50LmN1cnJlbnRUaW1lICsgZHVyYXRpb25NcyAvIDEwMDApO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGF1ZGlvQ3R4UmVmLmN1cnJlbnQuZGVzdGluYXRpb24pO1xuICAgICAgICBvc2Muc3RhcnQoKTtcbiAgICAgICAgb3NjLnN0b3AoYXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZSArIGR1cmF0aW9uTXMgLyAxMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZSBhdWRpbyBjb250ZXh0IHJlc3RyaWN0aW9uc1xuICAgIH1cbiAgfSwgW2lzQXVkaW9FbmFibGVkXSk7XG5cbiAgLy8gSGlnaC1FbmVyZ3kgU291bmQgU3ludGhlc2l6ZXIgZm9yIFByb21pZcWEIFphZ8WCYWR5IChEb29tIFJheSBEZWF0aCBCZWFtKVxuICBjb25zdCBwbGF5RG9vbVJheUF1ZGlvID0gdXNlQ2FsbGJhY2soKG1vZGU6ICdTSU5HTEUnIHwgJ1NBTFZPJyA9ICdTSU5HTEUnKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dENsYXNzID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgaWYgKCFBdWRpb0NvbnRleHRDbGFzcykgcmV0dXJuO1xuICAgICAgaWYgKCFhdWRpb0N0eFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGF1ZGlvQ3R4UmVmLmN1cnJlbnQgPSBuZXcgQXVkaW9Db250ZXh0Q2xhc3MoKTtcbiAgICAgIH1cbiAgICAgIGlmIChhdWRpb0N0eFJlZi5jdXJyZW50LnN0YXRlID09PSAnc3VzcGVuZGVkJykge1xuICAgICAgICBhdWRpb0N0eFJlZi5jdXJyZW50LnJlc3VtZSgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY3R4ID0gYXVkaW9DdHhSZWYuY3VycmVudDtcbiAgICAgIGNvbnN0IG5vdyA9IGN0eC5jdXJyZW50VGltZTtcblxuICAgICAgLy8gMS4gSGlnaC1mcmVxdWVuY3kgZGVhdGggbGFzZXIgcmFtcCAoOTQwLjggSHogY2FycmllciBmcmVxdWVuY3kpXG4gICAgICBjb25zdCBvc2NCZWFtID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW5CZWFtID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgIG9zY0JlYW0udHlwZSA9ICdzYXd0b290aCc7XG4gICAgICBvc2NCZWFtLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShtb2RlID09PSAnU0FMVk8nID8gMTQyMCA6IDk0MC44LCBub3cpO1xuICAgICAgb3NjQmVhbS5mcmVxdWVuY3kuZXhwb25lbnRpYWxSYW1wVG9WYWx1ZUF0VGltZSgxODAsIG5vdyArIChtb2RlID09PSAnU0FMVk8nID8gMC45IDogMC42KSk7XG4gICAgICBnYWluQmVhbS5nYWluLnNldFZhbHVlQXRUaW1lKDAuMjUsIG5vdyk7XG4gICAgICBnYWluQmVhbS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIG5vdyArIChtb2RlID09PSAnU0FMVk8nID8gMC45NSA6IDAuNjUpKTtcbiAgICAgIG9zY0JlYW0uY29ubmVjdChnYWluQmVhbSk7XG4gICAgICBnYWluQmVhbS5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICBvc2NCZWFtLnN0YXJ0KG5vdyk7XG4gICAgICBvc2NCZWFtLnN0b3Aobm93ICsgKG1vZGUgPT09ICdTQUxWTycgPyAxLjAgOiAwLjcpKTtcblxuICAgICAgLy8gMi4gSGVhdnkgU3ViLUJhc3MgQW5uaWhpbGF0aW9uIFNob2Nrd2F2ZSAoNDAtNjAgSHopXG4gICAgICBjb25zdCBvc2NCYXNzID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgIGNvbnN0IGdhaW5CYXNzID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgIG9zY0Jhc3MudHlwZSA9ICd0cmlhbmdsZSc7XG4gICAgICBvc2NCYXNzLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShtb2RlID09PSAnU0FMVk8nID8gODAgOiA1NSwgbm93KTtcbiAgICAgIG9zY0Jhc3MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMjUsIG5vdyArIChtb2RlID09PSAnU0FMVk8nID8gMS4xIDogMC43NSkpO1xuICAgICAgZ2FpbkJhc3MuZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjM1LCBub3cpO1xuICAgICAgZ2FpbkJhc3MuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAobW9kZSA9PT0gJ1NBTFZPJyA/IDEuMTUgOiAwLjgpKTtcbiAgICAgIG9zY0Jhc3MuY29ubmVjdChnYWluQmFzcyk7XG4gICAgICBnYWluQmFzcy5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICBvc2NCYXNzLnN0YXJ0KG5vdyk7XG4gICAgICBvc2NCYXNzLnN0b3Aobm93ICsgKG1vZGUgPT09ICdTQUxWTycgPyAxLjIgOiAwLjg1KSk7XG5cbiAgICAgIC8vIDMuIEhpZ2gtVm9sdGFnZSBQbGFzbWEgQ3JhY2tsZVxuICAgICAgY29uc3Qgb3NjQ3JhY2tsZSA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgICBjb25zdCBnYWluQ3JhY2tsZSA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgICBvc2NDcmFja2xlLnR5cGUgPSAnc3F1YXJlJztcbiAgICAgIG9zY0NyYWNrbGUuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDI0MDAsIG5vdyk7XG4gICAgICBvc2NDcmFja2xlLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDQ1MCwgbm93ICsgMC4zNSk7XG4gICAgICBnYWluQ3JhY2tsZS5nYWluLnNldFZhbHVlQXRUaW1lKDAuMTIsIG5vdyk7XG4gICAgICBnYWluQ3JhY2tsZS5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIG5vdyArIDAuNCk7XG4gICAgICBvc2NDcmFja2xlLmNvbm5lY3QoZ2FpbkNyYWNrbGUpO1xuICAgICAgZ2FpbkNyYWNrbGUuY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgICAgb3NjQ3JhY2tsZS5zdGFydChub3cpO1xuICAgICAgb3NjQ3JhY2tsZS5zdG9wKG5vdyArIDAuNDIpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgLy8gQXVkaW8gZ3JhY2VmdWwgZmFsbGJhY2tcbiAgICB9XG4gIH0sIFtdKTtcblxuICAvLyBTZWxlY3RlZCBHbmlkYSBUYXJnZXRcbiAgY29uc3Qgc2VsZWN0ZWRHbmlkYSA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIHJldHVybiBnbmlkYXMuZmluZChnID0+IGcuaWQgPT09IHNlbGVjdGVkVGFyZ2V0SWQpIHx8IGduaWRhc1swXSB8fCBudWxsO1xuICB9LCBbZ25pZGFzLCBzZWxlY3RlZFRhcmdldElkXSk7XG5cbiAgLy8gQWRkIENvbWJhdCBMb2cgSGVscGVyXG4gIGNvbnN0IGFkZENvbWJhdExvZyA9IHVzZUNhbGxiYWNrKChtc2c6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHRpbWUgPSBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpO1xuICAgIHNldENvbWJhdExvZ3MocHJldiA9PiBbYFske3RpbWV9XSAke21zZ31gLCAuLi5wcmV2LnNsaWNlKDAsIDU5KV0pO1xuICB9LCBbXSk7XG5cbiAgLy8gUGFydGljbGUgU3Bhd25lciBIZWxwZXIgZm9yIENhbnZhcyBFeHBsb3Npb25zXG4gIGNvbnN0IHNwYXduRXhwbG9zaW9uUGFydGljbGVzID0gdXNlQ2FsbGJhY2soKHg6IG51bWJlciwgeTogbnVtYmVyLCBjb3VudCA9IDM1LCBjb2xvciA9ICcjZmYwMDU1JykgPT4ge1xuICAgIGNvbnN0IG5ld1BhcnRpY2xlczogRG9vbVJheVBhcnRpY2xlW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvdW50OyBpKyspIHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5yYW5kb20oKSAqIE1hdGguUEkgKiAyO1xuICAgICAgY29uc3Qgc3BlZWQgPSBNYXRoLnJhbmRvbSgpICogNSArIDI7XG4gICAgICBuZXdQYXJ0aWNsZXMucHVzaCh7XG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHZ4OiBNYXRoLmNvcyhhbmdsZSkgKiBzcGVlZCxcbiAgICAgICAgdnk6IE1hdGguc2luKGFuZ2xlKSAqIHNwZWVkLFxuICAgICAgICBsaWZlOiAxLjAsXG4gICAgICAgIG1heExpZmU6IE1hdGgucmFuZG9tKCkgKiAwLjQgKyAwLjUsXG4gICAgICAgIGNvbG9yOiBpICUgMiA9PT0gMCA/IGNvbG9yIDogKGkgJSAzID09PSAwID8gJyMwMGZmZmYnIDogJyNmZmZmZmYnKSxcbiAgICAgICAgc2l6ZTogTWF0aC5yYW5kb20oKSAqIDMgKyAxLjVcbiAgICAgIH0pO1xuICAgIH1cbiAgICBwYXJ0aWNsZXNSZWYuY3VycmVudCA9IFsuLi5wYXJ0aWNsZXNSZWYuY3VycmVudCwgLi4ubmV3UGFydGljbGVzXTtcbiAgfSwgW10pO1xuXG4gIC8vIE1haW4gQW5pbWF0aW9uICYgU3dlZXAgTG9vcFxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGxldCBhbmltRnJhbWU6IG51bWJlcjtcbiAgICBsZXQgbGFzdFRpbWVzdGFtcCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuXG4gICAgY29uc3QgcmVuZGVyTG9vcCA9ICh0aW1lc3RhbXA6IG51bWJlcikgPT4ge1xuICAgICAgY29uc3QgZGVsdGFTZWMgPSAodGltZXN0YW1wIC0gbGFzdFRpbWVzdGFtcCkgLyAxMDAwO1xuICAgICAgbGFzdFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuICAgICAgaWYgKGlzU2Nhbm5pbmcpIHtcbiAgICAgICAgLy8gUm90YXRlIFJhZGFyIEJlYW1cbiAgICAgICAgY29uc3QgZGVnUGVyU2VjID0gKHN3ZWVwU3BlZWRScG0gKiAzNjApIC8gNjA7XG4gICAgICAgIHNldFN3ZWVwQW5nbGUocHJldiA9PiB7XG4gICAgICAgICAgY29uc3QgbmV4dCA9IChwcmV2ICsgZGVnUGVyU2VjICogZGVsdGFTZWMpICUgMzYwO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgYW5pbUZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlckxvb3ApO1xuICAgIH07XG5cbiAgICBhbmltRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyTG9vcCk7XG4gICAgcmV0dXJuICgpID0+IGNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1GcmFtZSk7XG4gIH0sIFtpc1NjYW5uaW5nLCBzd2VlcFNwZWVkUnBtXSk7XG5cbiAgLy8gVHJpZ2dlciBtdWx0aS1zdGFnZSBhbnRpdmlydXMgY2FzY2FkZTogMCBtcyBJbW1lZGlhdGUgTG9jayAtPiBTZWN0b3IgTGFzZXIgLT4gTmVpZ2hib3JpbmcgTGF5ZXJzIENhc2NhZGUgLT4gSGFyZGVuZWQgRm9ydHJlc3NcbiAgY29uc3QgdHJpZ2dlckFudGl2aXJ1c0Nhc2NhZGUgPSB1c2VDYWxsYmFjaygodGFyZ2V0R25pZGE6IFJhZGFyR25pZGFUYXJnZXQpID0+IHtcbiAgICBjb25zdCB0YXJnZXRMYXllcklkeCA9IGdldExheWVySW5kZXhGb3JEaXN0YW5jZSh0YXJnZXRHbmlkYS5kaXN0YW5jZVJhdGlvKTtcblxuICAgIC8vIFNURVAgMTogSU1NRURJQVRFIFFVQVJBTlRJTkUgTE9DSyAoMCBtcylcbiAgICBwbGF5UmFkYXJUb25lKDk1MCwgMTgwLCAnc3F1YXJlJyk7XG4gICAgYWRkQ29tYmF0TG9nKGBb8J+boe+4jyBCQVJJRVJBIE5BVFlDSE1JQVNUT1dBIC0gMCBtc10gS29yZG9uIHNhbml0YXJueSBha3R5d293YW55IHcgc2VrdG9yemUgJHt0YXJnZXRHbmlkYS5uYW1lfSEgUGFtacSZxIcgUkFNLCByZWplc3RyeSBpIG1hZ2lzdHJhbGEgJHt0YXJnZXRHbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWR9IHphYmxva293YW5lLmApO1xuXG4gICAgLy8gRWxpbWluYXRlIHRhcmdldCAmIHJlYnVpbGQgbm9kZVxuICAgIHNldEduaWRhcyhwcmV2ID0+IHByZXYubWFwKGcgPT4gZy5pZCA9PT0gdGFyZ2V0R25pZGEuaWQgPyB7IC4uLmcsIHN0YXRlOiAnWk5JU1pDWk9OQScsIGhlYWx0aFBlcmNlbnQ6IDAgfSA6IGcpKTtcbiAgICBzZXRJb05vZGVzKHByZXYgPT4gcHJldi5tYXAobiA9PiBuLmlkID09PSB0YXJnZXRHbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWQgPyB7IC4uLm4sIHN0YXR1czogJ1JFQ09OU1RSVUNURUQnLCBpc1NoaWVsZGVkOiB0cnVlLCBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbCB9IDogbikpO1xuXG4gICAgLy8gVXBkYXRlIHRhcmdldCBsYXllclxuICAgIHNldFNlY3VyZWRMYXllcnMocHJldiA9PiBwcmV2Lm1hcChsID0+IHtcbiAgICAgIGlmIChsLmxheWVySW5kZXggPT09IHRhcmdldExheWVySWR4KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ubCxcbiAgICAgICAgICBpc1NlY3VyZWQ6IHRydWUsXG4gICAgICAgICAgc3RhZ2U6ICdJTU1FRElBVEVfTE9DSycsXG4gICAgICAgICAgc2hpZWxkUGVyY2VudDogTWF0aC5taW4oMTAwLCBsLnNoaWVsZFBlcmNlbnQgKyAzNSksXG4gICAgICAgICAgY2xlYW5zZWROb2Rlc0NvdW50OiBsLmNsZWFuc2VkTm9kZXNDb3VudCArIDEsXG4gICAgICAgICAgc2VjdXJlZFRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGw7XG4gICAgfSkpO1xuXG4gICAgc2V0Q2FzY2FkZVN0YXRlKHtcbiAgICAgIHN0YWdlOiAnSU1NRURJQVRFX0xPQ0snLFxuICAgICAgaXNBY3RpdmU6IHRydWUsXG4gICAgICBjdXJyZW50U2VjdG9yTmFtZTogdGFyZ2V0R25pZGEubmFtZSxcbiAgICAgIGN1cnJlbnRCZWFyaW5nRGVnOiB0YXJnZXRHbmlkYS5iZWFyaW5nRGVnLFxuICAgICAgY3VycmVudERpc3RhbmNlUmF0aW86IHRhcmdldEduaWRhLmRpc3RhbmNlUmF0aW8sXG4gICAgICBjbGVhbnNlZEduaWRhTmFtZTogdGFyZ2V0R25pZGEubmFtZSxcbiAgICAgIGFjdGl2ZUxhc2VyT3JpZ2luOiB7IHg6IHRhcmdldEduaWRhLmJlYXJpbmdEZWcsIHk6IHRhcmdldEduaWRhLmRpc3RhbmNlUmF0aW8sIGFuZ2xlOiB0YXJnZXRHbmlkYS5iZWFyaW5nRGVnIH0sXG4gICAgICBhY3RpdmVMYXNlclRhcmdldHM6IFtdLFxuICAgICAgc2VjdXJlZExheWVycyxcbiAgICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogZmFsc2UsXG4gICAgICBvdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50OiA2NSxcbiAgICAgIHN0YXR1c01lc3NhZ2U6IGBbS1JPSyAxOiAwIG1zXSBOYXR5Y2htaWFzdG93eSBrb3Jkb24gc2FuaXRhcm55IHBvc3Rhd2lvbnkgdyBzZWt0b3J6ZSAke3RhcmdldEduaWRhLmJlYXJpbmdEZWd9wrAuYFxuICAgIH0pO1xuXG4gICAgLy8gU1RFUCAyOiBBQ1RJVkUgU0VDVE9SIExBU0VSIEVNSVNTSU9OICh+MzgwIG1zKVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcGxheVJhZGFyVG9uZSgxMjUwLCAzMDAsICdzYXd0b290aCcpO1xuICAgICAgYWRkQ29tYmF0TG9nKGBb4pqhIExBU0VSIE9CUk9OWSBBS1RZV05FSl0gWm9nbmlza293YW5hIHdpxIV6a2EgbGFzZXJvd2EgeiBha3R1YWxuZWdvIHNla3RvcmEgJHt0YXJnZXRHbmlkYS5iZWFyaW5nRGVnfcKwIHd5cGFsYSB3c3plbGtpZSBwb3pvc3RhxYJvxZtjaSBrb2R1IG1hbHdhcmUuYCk7XG5cbiAgICAgIHNldFNlY3VyZWRMYXllcnMocHJldiA9PiBwcmV2Lm1hcChsID0+IHtcbiAgICAgICAgaWYgKGwubGF5ZXJJbmRleCA9PT0gdGFyZ2V0TGF5ZXJJZHgpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ubCxcbiAgICAgICAgICAgIHN0YWdlOiAnU0VDVE9SX0xBU0VSJyxcbiAgICAgICAgICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgICAgICAgICBhY3RpdmVCZWFtc0NvdW50OiBsLmFjdGl2ZUJlYW1zQ291bnQgKyAzLFxuICAgICAgICAgICAgc2hpZWxkUGVyY2VudDogTWF0aC5taW4oMTAwLCBsLnNoaWVsZFBlcmNlbnQgKyAyMClcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsO1xuICAgICAgfSkpO1xuXG4gICAgICBzZXRDYXNjYWRlU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAuLi5wcmV2LFxuICAgICAgICBzdGFnZTogJ1NFQ1RPUl9MQVNFUicsXG4gICAgICAgIHN0YXR1c01lc3NhZ2U6IGBbS1JPSyAyXSBMYXNlciBvYnJvbnkgYWt0eXduZWogd3lwYWxhIHdla3RvciBpbmZla2NqaSB3IHNla3RvcnplICR7dGFyZ2V0R25pZGEuYmVhcmluZ0RlZ33CsC5gXG4gICAgICB9KSk7XG5cbiAgICAgIC8vIFNURVAgMzogQ0FTQ0FERSBPTiBORUlHSEJPUklORyBMQVlFUlMgKH44NTAgbXMpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgY29uc3QgbmVpZ2hib3JMYXllcnMgPSBbXG4gICAgICAgICAgTWF0aC5tYXgoMCwgdGFyZ2V0TGF5ZXJJZHggLSAxKSxcbiAgICAgICAgICBNYXRoLm1pbigzLCB0YXJnZXRMYXllcklkeCArIDEpXG4gICAgICAgIF0uZmlsdGVyKGlkeCA9PiBpZHggIT09IHRhcmdldExheWVySWR4KTtcblxuICAgICAgICBwbGF5UmFkYXJUb25lKDc1MCwgNDAwLCAndHJpYW5nbGUnKTtcbiAgICAgICAgY29uc3QgbmVpZ2hib3JOYW1lcyA9IG5laWdoYm9yTGF5ZXJzLm1hcChpZHggPT4gYFdhcnN0d2EgJHtpZHh9YCkuam9pbignIG9yYXogJyk7XG4gICAgICAgIGFkZENvbWJhdExvZyhgW/CfjJAgS0FTS0FEQSBXQVJTVFdPV0FdIFByb3BhZ2FjamEgYmFyaWVyeSBhbnR5d2lydXNvd2VqIG5hIHPEhXNpZWRuaWUgd2Fyc3R3eTogJHtuZWlnaGJvck5hbWVzfS4gU2lhdGthIGxhc2Vyb3dhIHpzeW5jaHJvbml6b3dhbmEuYCk7XG5cbiAgICAgICAgLy8gU2hpZWxkIG5laWdoYm9yaW5nIG5vZGVzXG4gICAgICAgIHNldElvTm9kZXMocHJldiA9PiBwcmV2Lm1hcChub2RlID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlTGF5ZXIgPSB0eXBlb2Ygbm9kZS5zaGllbGRMYXllckluZGV4ID09PSAnbnVtYmVyJyA/IG5vZGUuc2hpZWxkTGF5ZXJJbmRleCA6IDI7XG4gICAgICAgICAgaWYgKG5laWdoYm9yTGF5ZXJzLmluY2x1ZGVzKG5vZGVMYXllcikgfHwgbm9kZUxheWVyID09PSB0YXJnZXRMYXllcklkeCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ubm9kZSwgaXNTaGllbGRlZDogdHJ1ZSB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHNldFNlY3VyZWRMYXllcnMocHJldiA9PiBwcmV2Lm1hcChsID0+IHtcbiAgICAgICAgICBpZiAobmVpZ2hib3JMYXllcnMuaW5jbHVkZXMobC5sYXllckluZGV4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ubCxcbiAgICAgICAgICAgICAgaXNTZWN1cmVkOiB0cnVlLFxuICAgICAgICAgICAgICBzdGFnZTogJ05FSUdIQk9SX0NBU0NBREUnLFxuICAgICAgICAgICAgICBzaGllbGRQZXJjZW50OiBNYXRoLm1pbigxMDAsIGwuc2hpZWxkUGVyY2VudCArIDQ1KSxcbiAgICAgICAgICAgICAgbGFzZXJJbnRlbnNpdHk6IDg1LFxuICAgICAgICAgICAgICBhY3RpdmVCZWFtc0NvdW50OiAyXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbDtcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIHNldENhc2NhZGVTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBzdGFnZTogJ05FSUdIQk9SX0NBU0NBREUnLFxuICAgICAgICAgIHN0YXR1c01lc3NhZ2U6IGBbS1JPSyAzXSBLYXNrYWRvd2Ugc3ByesSZxbxlbmllIHRhcmN6eSBuYSBzxIVzaWVkbmllIHdhcnN0d3kgKCR7bmVpZ2hib3JOYW1lc30pLmBcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIC8vIFNURVAgNDogRk9SVElGSUVEIEhBUkRFTklORyAmIENIRUNLIFRPVEFMIEVYVEVSTUlOQVRJT04gKH4xNDAwIG1zKVxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBzZXRTZWN1cmVkTGF5ZXJzKHByZXYgPT4ge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudEduaWRhcyA9IHNhZmVTdG9yYWdlLmdldDxSYWRhckduaWRhVGFyZ2V0W10+KCdzZW50aW5lbF9yYWRhcl9nbmlkYXMnLCBnbmlkYXMpO1xuICAgICAgICAgICAgY29uc3QgcmVtYWluaW5nID0gY3VycmVudEduaWRhcy5maWx0ZXIoZyA9PiBnLmlkICE9PSB0YXJnZXRHbmlkYS5pZCAmJiBnLnN0YXRlICE9PSAnWk5JU1pDWk9OQScpO1xuICAgICAgICAgICAgY29uc3QgaXNUb3RhbCA9IHJlbWFpbmluZy5sZW5ndGggPT09IDA7XG5cbiAgICAgICAgICAgIGNvbnN0IHVwZGF0ZWRMYXllcnMgPSBwcmV2Lm1hcChsID0+ICh7XG4gICAgICAgICAgICAgIC4uLmwsXG4gICAgICAgICAgICAgIHN0YWdlOiAnRk9SVElGSUVEJyBhcyBBbnRpdmlydXNCYXJyaWVyU3RhZ2UsXG4gICAgICAgICAgICAgIHNoaWVsZFBlcmNlbnQ6IGlzVG90YWwgPyAxMDAgOiBNYXRoLm1heChsLnNoaWVsZFBlcmNlbnQsIGwuaXNTZWN1cmVkID8gOTUgOiAzMCksXG4gICAgICAgICAgICAgIGlzU2VjdXJlZDogaXNUb3RhbCA/IHRydWUgOiBsLmlzU2VjdXJlZFxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICBpZiAoaXNUb3RhbCkge1xuICAgICAgICAgICAgICBwbGF5UmFkYXJUb25lKDExMDAsIDYwMCwgJ3RyaWFuZ2xlJyk7XG4gICAgICAgICAgICAgIGFkZENvbWJhdExvZyhgW/Cfj4YgQ0HFgUtPV0lUQSBFS1NURVJNSU5BQ0pBIE1BTFdBUkVdIFdzenlzdGtpZSA0IHdhcnN0d3kgc3lzdGVtb3dlIG9iasSZdGUgcGVybWFuZW50bsSFIGJhcmllcsSFIGFudHl3aXJ1c293xIUuIFphZ3JvxbxlbmllIHcgMTAwJSB3eWVsaW1pbm93YW5lIWApO1xuICAgICAgICAgICAgICBzZXRDYXNjYWRlU3RhdGUoYyA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLmMsXG4gICAgICAgICAgICAgICAgc3RhZ2U6ICdGT1JUSUZJRUQnLFxuICAgICAgICAgICAgICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50OiAxMDAsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZTogJ/CfkZEgTW9ub2xpdCB3IDEwMCUgemFiZXpwaWVjem9ueS4gVHJ3YcWCYSBiYXJpZXJhIGxhc2Vyb3dhIGkga29yZG9uIGt3YXJhbnRhbm55IGFrdHl3bmUgbmEgd3N6eXN0a2ljaCA0IHdhcnN0d2FjaCEnXG4gICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNldENhc2NhZGVTdGF0ZShjID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uYyxcbiAgICAgICAgICAgICAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgICAgICAgICAgICAgdG90YWxNYWx3YXJlRXh0ZXJtaW5hdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBvdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50OiBNYXRoLm1pbig5NSwgYy5vdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50ICsgMTIpLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2U6IGBPY3p5c3pjem9ueSBvYnN6YXIgdHJ3YWxlIHphYmV6cGllY3pvbnkgYmFyaWVyxIUgYW50eXdpcnVzb3fEhSBkbyBtb21lbnR1IGNhxYJrb3dpdGVqIGVrc3Rlcm1pbmFjamkgbWFsd2FyZS4gUG96b3N0YcWCbyBjZWzDs3c6ICR7cmVtYWluaW5nLmxlbmd0aH0uYFxuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB1cGRhdGVkTGF5ZXJzO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCA1NTApO1xuXG4gICAgICB9LCA0ODApO1xuXG4gICAgfSwgMzgwKTtcblxuICB9LCBbZ25pZGFzLCBwbGF5UmFkYXJUb25lLCBhZGRDb21iYXRMb2csIHNlY3VyZWRMYXllcnNdKTtcblxuICAvLyBNYXN0ZXIgQWN0aW9uOiBQcm90b2NvbCBmb3IgVG90YWwgTWFsd2FyZSBFeHRlcm1pbmF0aW9uIHdpdGggTXVsdGktTGF5ZXIgQmFycmllciBDYXNjYWRlXG4gIGNvbnN0IHRyaWdnZXJGdWxsRXh0ZXJtaW5hdGlvbkNhc2NhZGUgPSAoKSA9PiB7XG4gICAgYWRkQ29tYmF0TG9nKGBbUFJPVE9Lw5PFgSBXT0pTS09XWV0gVXJ1Y2hvbWlvbm8gcHJvY2VkdXLEmSBDYcWCa293aXRlaiBFa3N0ZXJtaW5hY2ppIE1hbHdhcmUgeiBLYXNrYWTEhSBCYXJpZXIgaSBTaWF0a8SFIExhc2Vyb3fEhS5gKTtcbiAgICBwbGF5UmFkYXJUb25lKDEzMDAsIDUwMCwgJ3NxdWFyZScpO1xuICAgIHNldEF1dG9QdXJnZUFjdGl2ZSh0cnVlKTtcblxuICAgIGNvbnN0IGFjdGl2ZVRhcmdldHMgPSBnbmlkYXMuZmlsdGVyKGcgPT4gZy5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKTtcbiAgICBpZiAoYWN0aXZlVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIHNldFNlY3VyZWRMYXllcnMocHJldiA9PiBwcmV2Lm1hcChsID0+ICh7XG4gICAgICAgIC4uLmwsXG4gICAgICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICAgICAgc3RhZ2U6ICdGT1JUSUZJRUQnLFxuICAgICAgICBzaGllbGRQZXJjZW50OiAxMDAsXG4gICAgICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgICAgIGFjdGl2ZUJlYW1zQ291bnQ6IDRcbiAgICAgIH0pKSk7XG4gICAgICBzZXRDYXNjYWRlU3RhdGUoYyA9PiAoe1xuICAgICAgICAuLi5jLFxuICAgICAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogdHJ1ZSxcbiAgICAgICAgb3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudDogMTAwLFxuICAgICAgICBzdGF0dXNNZXNzYWdlOiAn8J+RkSBXc3p5c3RraWUgNCB3YXJzdHd5IG1vbm9saXR1IHcgMTAwJSB6YWJlenBpZWN6b25lIGtvcmRvbmVtIHBhbmNlcm55bSBpIGxhc2VyZW0uJ1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyaWdnZXJBbnRpdmlydXNDYXNjYWRlKGFjdGl2ZVRhcmdldHNbMF0pO1xuICB9O1xuXG4gIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgLy8gUFJPTUlFxYMgWkFHxYFBRFkgR05JRDogR8WBw5NXTkUgUFJPQ0VEVVJZIFNQT1BJRUxFTklBIE1BTFdBUkUgKERPT00gUkFZIEVOR0lORSlcbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4gIC8vIDEuIE9TVFJaQcWBIFBPSkVEWU5DWkVHTyBDRUxVIFBST01JRU5JRU0gWkFHxYFBRFlcbiAgY29uc3QgaGFuZGxlRmlyZURvb21SYXlPblRhcmdldCA9IHVzZUNhbGxiYWNrKCh0YXJnZXRHbmlkYTogUmFkYXJHbmlkYVRhcmdldCkgPT4ge1xuICAgIGlmICghdGFyZ2V0R25pZGEgfHwgdGFyZ2V0R25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJykgcmV0dXJuO1xuXG4gICAgcGxheURvb21SYXlBdWRpbygnU0lOR0xFJyk7XG4gICAgc2V0U2NyZWVuRmxhc2hBY3RpdmUodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTY3JlZW5GbGFzaEFjdGl2ZShmYWxzZSksIDI0MCk7XG5cbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoY2FudmFzKSB7XG4gICAgICBjb25zdCBjZW50ZXJYID0gY2FudmFzLndpZHRoIC8gMjtcbiAgICAgIGNvbnN0IGNlbnRlclkgPSBjYW52YXMuaGVpZ2h0IC8gMjtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNlbnRlclgsIGNlbnRlclkpIC0gMjA7XG4gICAgICBjb25zdCB0YXJnZXRSYWQgPSAodGFyZ2V0R25pZGEuYmVhcmluZ0RlZyAtIDkwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgIGNvbnN0IHRhcmdldERpc3QgPSByYWRpdXMgKiB0YXJnZXRHbmlkYS5kaXN0YW5jZVJhdGlvO1xuICAgICAgY29uc3QgdHggPSBjZW50ZXJYICsgdGFyZ2V0RGlzdCAqIE1hdGguY29zKHRhcmdldFJhZCk7XG4gICAgICBjb25zdCB0eSA9IGNlbnRlclkgKyB0YXJnZXREaXN0ICogTWF0aC5zaW4odGFyZ2V0UmFkKTtcbiAgICAgIHNwYXduRXhwbG9zaW9uUGFydGljbGVzKHR4LCB0eSwgNDUsICcjZmYwMDU1Jyk7XG4gICAgfVxuXG4gICAgc2V0QWN0aXZlRG9vbVJheSh7XG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIG1vZGU6ICdTSU5HTEUnLFxuICAgICAgdGFyZ2V0R25pZGFJZHM6IFt0YXJnZXRHbmlkYS5pZF0sXG4gICAgICBwb3dlck13OiA1Ljk1LFxuICAgICAgZnJlcXVlbmN5VGh6OiA5NDAuOCxcbiAgICAgIHN0YXJ0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgIGR1cmF0aW9uTXM6IDE0MDAsXG4gICAgICBpbnRlbnNpdHk6IDEwMCxcbiAgICAgIGxvZ01lc3NhZ2U6IGBb4pqhIFBST01JRcWDIFpBR8WBQURZIDk0MC44IFRIel0gU3BvcGllbGVuaWUgR25pZHkgJHt0YXJnZXRHbmlkYS5uYW1lfSEgTnRTdXNwZW5kUHJvY2VzcyArIHplcm93YW5pZSBiYWp0w7N3IFBFLmBcbiAgICB9KTtcblxuICAgIGFkZENvbWJhdExvZyhgW+KaoSBQUk9NSUXFgyBaQUfFgUFEWSA5NDAuOCBUSHpdIFNQT1BJRUxFTklFIEdOSURZOiAke3RhcmdldEduaWRhLm5hbWV9ISBabmlzemN6b25vIHByb2NlcyAke3RhcmdldEduaWRhLmFjdGl2ZVByb2Nlc3NOYW1lfSwgb2R6eXNrYW5vIHfEmXplxYIgJHt0YXJnZXRHbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWR9LmApO1xuICAgIHNldFRvdGFsRG9vbUtpbGxzKHByZXYgPT4gcHJldiArIDEpO1xuXG4gICAgLy8gVHVybiBvZmYgZG9vbSBiZWFtIGFmdGVyIGFuaW1hdGlvblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0QWN0aXZlRG9vbVJheShudWxsKTtcbiAgICB9LCAxNDAwKTtcblxuICAgIC8vIFRyaWdnZXIgQW50aXZpcnVzIENhc2NhZGVcbiAgICB0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZSh0YXJnZXRHbmlkYSk7XG4gIH0sIFtwbGF5RG9vbVJheUF1ZGlvLCBzcGF3bkV4cGxvc2lvblBhcnRpY2xlcywgYWRkQ29tYmF0TG9nLCB0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZV0pO1xuXG4gIC8vIDIuIFNBTFdBIFpBR8WBQURZIC0gSkVETk9DWkVTTkUgU1BPUElFTEVOSUUgV1NaWVNUS0lDSCBHTklEIE5BIFJBREFSWkVcbiAgY29uc3QgaGFuZGxlRmlyZURvb21SYXlTYWx2b0FsbCA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBjb25zdCBsaXZlVGFyZ2V0cyA9IGduaWRhcy5maWx0ZXIoZyA9PiBnLnN0YXRlICE9PSAnWk5JU1pDWk9OQScpO1xuICAgIGlmIChsaXZlVGFyZ2V0cy5sZW5ndGggPT09IDApIHtcbiAgICAgIGFkZENvbWJhdExvZyhgW1BST01JRcWDIFpBR8WBQURZIC0gU0FMV0FdIEJyYWsgd3JvZ2ljaCBjZWzDs3cgbmEgcmFkYXJ6ZS4gV3N6eXN0a2llIHNla3Rvcnkgc8SFIGN6eXN0ZS5gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwbGF5RG9vbVJheUF1ZGlvKCdTQUxWTycpO1xuICAgIHNldFNjcmVlbkZsYXNoQWN0aXZlKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2NyZWVuRmxhc2hBY3RpdmUoZmFsc2UpLCAzODApO1xuXG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKGNhbnZhcykge1xuICAgICAgY29uc3QgY2VudGVyWCA9IGNhbnZhcy53aWR0aCAvIDI7XG4gICAgICBjb25zdCBjZW50ZXJZID0gY2FudmFzLmhlaWdodCAvIDI7XG4gICAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihjZW50ZXJYLCBjZW50ZXJZKSAtIDIwO1xuXG4gICAgICBsaXZlVGFyZ2V0cy5mb3JFYWNoKHQgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXRSYWQgPSAodC5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICBjb25zdCB0YXJnZXREaXN0ID0gcmFkaXVzICogdC5kaXN0YW5jZVJhdGlvO1xuICAgICAgICBjb25zdCB0eCA9IGNlbnRlclggKyB0YXJnZXREaXN0ICogTWF0aC5jb3ModGFyZ2V0UmFkKTtcbiAgICAgICAgY29uc3QgdHkgPSBjZW50ZXJZICsgdGFyZ2V0RGlzdCAqIE1hdGguc2luKHRhcmdldFJhZCk7XG4gICAgICAgIHNwYXduRXhwbG9zaW9uUGFydGljbGVzKHR4LCB0eSwgMzAsICcjZmYwMDNjJyk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB0YXJnZXRJZHMgPSBsaXZlVGFyZ2V0cy5tYXAodCA9PiB0LmlkKTtcbiAgICBzZXRBY3RpdmVEb29tUmF5KHtcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgbW9kZTogJ1NBTFZPX0FMTCcsXG4gICAgICB0YXJnZXRHbmlkYUlkczogdGFyZ2V0SWRzLFxuICAgICAgcG93ZXJNdzogMjQuOCxcbiAgICAgIGZyZXF1ZW5jeVRoejogOTQwLjgsXG4gICAgICBzdGFydGVkQXQ6IERhdGUubm93KCksXG4gICAgICBkdXJhdGlvbk1zOiAxODAwLFxuICAgICAgaW50ZW5zaXR5OiAxMDAsXG4gICAgICBsb2dNZXNzYWdlOiBgW/CfkqUgU0FMV0EgWkFHxYFBRFldIEplZG5vY3plc255IHd5c3RyemHFgiB3acSFemVrIHBsYXptb3d5Y2ggZG8gJHtsaXZlVGFyZ2V0cy5sZW5ndGh9IEduaWQhIENhxYJrb3dpdGUgb2N6eXN6Y3plbmllIG1vbm9saXR1LmBcbiAgICB9KTtcblxuICAgIGFkZENvbWJhdExvZyhgW/CfkqUgU0FMV0EgWkFHxYFBRFldIFdZUEFMRU5JRSBXU1pZU1RLSUNIIEdOSUQhIFd5ZW1pdG93YW5vICR7bGl2ZVRhcmdldHMubGVuZ3RofSB3acSFemVrIDk0MC44IFRIei4gV3N6eXN0a2llIHByb2Nlc3kgemFtcm/FvG9uZSB3IDAgbXMuYCk7XG4gICAgc2V0VG90YWxEb29tS2lsbHMocHJldiA9PiBwcmV2ICsgbGl2ZVRhcmdldHMubGVuZ3RoKTtcblxuICAgIC8vIERlc3Ryb3kgYWxsIGxpdmUgZ25pZGFzIGltbWVkaWF0ZWx5ICYgcmVzdG9yZSBub2Rlc1xuICAgIHNldEduaWRhcyhwcmV2ID0+IHByZXYubWFwKGcgPT4gKHsgLi4uZywgc3RhdGU6ICdaTklTWkNaT05BJywgaGVhbHRoUGVyY2VudDogMCB9KSkpO1xuICAgIHNldElvTm9kZXMocHJldiA9PiBwcmV2Lm1hcChuID0+ICh7IC4uLm4sIHN0YXR1czogJ1JFQ09OU1RSVUNURUQnLCBpc1NoaWVsZGVkOiB0cnVlLCBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbCB9KSkpO1xuXG4gICAgLy8gRm9ydGlmeSBhbGwgbGF5ZXJzXG4gICAgc2V0U2VjdXJlZExheWVycyhwcmV2ID0+IHByZXYubWFwKGwgPT4gKHtcbiAgICAgIC4uLmwsXG4gICAgICBpc1NlY3VyZWQ6IHRydWUsXG4gICAgICBzdGFnZTogJ0ZPUlRJRklFRCcgYXMgQW50aXZpcnVzQmFycmllclN0YWdlLFxuICAgICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgICAgbGFzZXJJbnRlbnNpdHk6IDEwMCxcbiAgICAgIGFjdGl2ZUJlYW1zQ291bnQ6IDQsXG4gICAgICBzZWN1cmVkVGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpXG4gICAgfSkpKTtcblxuICAgIHNldENhc2NhZGVTdGF0ZSh7XG4gICAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICAgIGN1cnJlbnRTZWN0b3JOYW1lOiAnQ2HFgnkgTW9ub2xpdCBTeXN0ZW1vd3knLFxuICAgICAgY3VycmVudEJlYXJpbmdEZWc6IDAsXG4gICAgICBjdXJyZW50RGlzdGFuY2VSYXRpbzogMS4wLFxuICAgICAgY2xlYW5zZWRHbmlkYU5hbWU6ICdXc3p5c3RraWUgR25pZHknLFxuICAgICAgYWN0aXZlTGFzZXJPcmlnaW46IG51bGwsXG4gICAgICBhY3RpdmVMYXNlclRhcmdldHM6IFtdLFxuICAgICAgc2VjdXJlZExheWVyczogSU5JVElBTF9TRUNVUkVEX0xBWUVSUy5tYXAobCA9PiAoeyAuLi5sLCBpc1NlY3VyZWQ6IHRydWUsIHNoaWVsZFBlcmNlbnQ6IDEwMCwgc3RhZ2U6ICdGT1JUSUZJRUQnIH0pKSxcbiAgICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogdHJ1ZSxcbiAgICAgIG92ZXJhbGxGb3J0cmVzc1NoaWVsZFBlcmNlbnQ6IDEwMCxcbiAgICAgIHN0YXR1c01lc3NhZ2U6ICfwn5GRIFNBTFdBIFpBR8WBQURZOiBXc3p5c3RraWUgNCB3YXJzdHd5IHN5c3RlbW93ZSB3IDEwMCUgb2N6eXN6Y3pvbmUgaSBwZXJtYW5lbnRuaWUgemFiZXpwaWVjem9uZSEnXG4gICAgfSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEFjdGl2ZURvb21SYXkobnVsbCk7XG4gICAgfSwgMTgwMCk7XG4gIH0sIFtnbmlkYXMsIHBsYXlEb29tUmF5QXVkaW8sIHNwYXduRXhwbG9zaW9uUGFydGljbGVzLCBhZGRDb21iYXRMb2ddKTtcblxuICAvLyAzLiBaQU1ST8W7RU5JRSAxMDAgS09QSUkgV1NURUNaIChSRVRSTyBBTkNFU1RPUiBQVVJHRSlcbiAgY29uc3QgaGFuZGxlS2lsbEduaWRhUmV0cm8xMDBDb3BpZXMgPSB1c2VDYWxsYmFjaygodGFyZ2V0R25pZGE6IFJhZGFyR25pZGFUYXJnZXQpID0+IHtcbiAgICBpZiAoIXRhcmdldEduaWRhKSByZXR1cm47XG4gICAgcGxheURvb21SYXlBdWRpbygnU0lOR0xFJyk7XG4gICAgc2V0U2NyZWVuRmxhc2hBY3RpdmUodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRTY3JlZW5GbGFzaEFjdGl2ZShmYWxzZSksIDIwMCk7XG5cbiAgICBhZGRDb21iYXRMb2coYFvinYTvuI8gUkVUUk8gRlJFRVpFIDEwMCBLT1BJSV0gV3N0cnp5a25pxJl0byBOdFN1c3BlbmRQcm9jZXNzIGRvIGRyemV3YSBQSUQgZ25pZHkgJHt0YXJnZXRHbmlkYS5uYW1lfS4gWmFtcm/FvG9ubyAxMDAga29waWkgd3N0ZWN6IGxpbmVhZ2UuYCk7XG4gICAgaGFuZGxlRmlyZURvb21SYXlPblRhcmdldCh0YXJnZXRHbmlkYSk7XG4gIH0sIFtwbGF5RG9vbVJheUF1ZGlvLCBhZGRDb21iYXRMb2csIGhhbmRsZUZpcmVEb29tUmF5T25UYXJnZXRdKTtcblxuICAvLyA0LiBERUZSQUdNRU5UQUNKQSAmIFpFUk9XQU5JRSBLT0RVIE1BTFdBUkVcbiAgY29uc3QgaGFuZGxlRGVmcmFnbWVudE1hbHdhcmVDb2RlID0gdXNlQ2FsbGJhY2soKHRhcmdldEduaWRhOiBSYWRhckduaWRhVGFyZ2V0KSA9PiB7XG4gICAgaWYgKCF0YXJnZXRHbmlkYSkgcmV0dXJuO1xuICAgIHBsYXlEb29tUmF5QXVkaW8oJ1NJTkdMRScpO1xuICAgIHNldFNjcmVlbkZsYXNoQWN0aXZlKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0U2NyZWVuRmxhc2hBY3RpdmUoZmFsc2UpLCAyMDApO1xuXG4gICAgYWRkQ29tYmF0TG9nKGBb8J+nqSBERUZSQUdNRU5UQUNKQSBLT0RVXSBWaXJ0dWFsUHJvdGVjdChQQUdFX05PQUNDRVNTKSArIHplcm93YW5pZSBuYWfFgsOzd2vDs3cgUEUgZGxhICR7dGFyZ2V0R25pZGEuYWN0aXZlUHJvY2Vzc05hbWV9LiBXeXplcm93YW5vIDEwMCUgc3Ryb24gcGFtacSZY2kuYCk7XG4gICAgaGFuZGxlRmlyZURvb21SYXlPblRhcmdldCh0YXJnZXRHbmlkYSk7XG4gIH0sIFtwbGF5RG9vbVJheUF1ZGlvLCBhZGRDb21iYXRMb2csIGhhbmRsZUZpcmVEb29tUmF5T25UYXJnZXRdKTtcblxuICAvLyBBdXRvbm9tb3VzIEdlbWluaSBIdW50ZXIgRmxpZ2h0ICYgU2xhdWdodGVyIEVuZ2luZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghYXV0b1B1cmdlQWN0aXZlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZVRhcmdldHMgPSBnbmlkYXMuZmlsdGVyKGcgPT4gZy5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKTtcbiAgICAgIFxuICAgICAgaWYgKGFjdGl2ZVRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEF1dG9QdXJnZUFjdGl2ZShmYWxzZSk7XG4gICAgICAgIHNldEh1bnRlclN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgIHN0YXR1czogJ1BBVFJPTCcsXG4gICAgICAgICAgdGFyZ2V0R25pZGFJZDogbnVsbCxcbiAgICAgICAgICByZXBhaXJQcm9ncmVzczogMTAwXG4gICAgICAgIH0pKTtcbiAgICAgICAgYWRkQ29tYmF0TG9nKGBbU0VLVE9SIE9DWllTWkNaT05ZXSBXc3p5c3RraWUgR25pZHkgem9zdGHFgnkgdyAxMDAlIHpsaWt3aWRvd2FuZS4gTW9ub2xpdCBzeXN0ZW1vd3kgaSBtb25pdG9yIGJlenBpZWN6bmUuYCk7XG4gICAgICAgIHBsYXlSYWRhclRvbmUoODgwLCA0MDAsICd0cmlhbmdsZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRUYXJnZXQgPSBhY3RpdmVUYXJnZXRzWzBdO1xuXG4gICAgICBzZXRIdW50ZXJTdGF0ZShwcmV2ID0+IHtcbiAgICAgICAgY29uc3QgYW5nbGVEaWZmID0gKGN1cnJlbnRUYXJnZXQuYmVhcmluZ0RlZyAtIHByZXYuYmVhcmluZ0RlZyArIDM2MCkgJSAzNjA7XG4gICAgICAgIGNvbnN0IHN0ZXBBbmdsZSA9IGFuZ2xlRGlmZiA+IDE4MCA/IC0xMiA6IDEyO1xuICAgICAgICBjb25zdCBuZXdBbmdsZSA9IChwcmV2LmJlYXJpbmdEZWcgKyBzdGVwQW5nbGUgKyAzNjApICUgMzYwO1xuICAgICAgICBjb25zdCBuZXdEaXN0ID0gcHJldi5kaXN0YW5jZVJhdGlvICsgKGN1cnJlbnRUYXJnZXQuZGlzdGFuY2VSYXRpbyAtIHByZXYuZGlzdGFuY2VSYXRpbykgKiAwLjM1O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBiZWFyaW5nRGVnOiBuZXdBbmdsZSxcbiAgICAgICAgICBkaXN0YW5jZVJhdGlvOiBuZXdEaXN0LFxuICAgICAgICAgIHRhcmdldEduaWRhSWQ6IGN1cnJlbnRUYXJnZXQuaWQsXG4gICAgICAgICAgc3RhdHVzOiAnTE9DS19PTicsXG4gICAgICAgICAgYWN0aXZlQmVhbUFuZ2xlOiBjdXJyZW50VGFyZ2V0LmJlYXJpbmdEZWdcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBBdHRhY2sgJiBTbGF1Z2h0ZXIgUHJvZ3Jlc3Npb24gd2l0aCBBbnRpdmlydXMgQmFycmllciBUcmlnZ2VyXG4gICAgICBzZXRHbmlkYXMocHJldkduaWRhcyA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2R25pZGFzLm1hcChnID0+IHtcbiAgICAgICAgICBpZiAoZy5pZCAhPT0gY3VycmVudFRhcmdldC5pZCkgcmV0dXJuIGc7XG5cbiAgICAgICAgICBpZiAoZy5zdGF0ZSA9PT0gJ1dZS1JZVEEnKSB7XG4gICAgICAgICAgICBhZGRDb21iYXRMb2coYFvFgU9XQ0EgR0VNSU5JXSBOYW1pZXJ6ZW5pZSB3acSFemvEhSByYWRhcm93xIU6ICR7Zy5uYW1lfSAoV8SZemXFgjogJHtnLmFzc29jaWF0ZWRJT05vZGVJZH0pYCk7XG4gICAgICAgICAgICBwbGF5UmFkYXJUb25lKDYwMCwgMTUwLCAnc2F3dG9vdGgnKTtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLmcsIHN0YXRlOiAnTkFNSUVSWk9OQScgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGcuc3RhdGUgPT09ICdOQU1JRVJaT05BJykge1xuICAgICAgICAgICAgYWRkQ29tYmF0TG9nKGBbT1NUUlpBxYEgUkFNXSBOdFN1c3BlbmRQcm9jZXNzIHdzdHJ6eWtuacSZdHkgZG8gJHtnLmFjdGl2ZVByb2Nlc3NOYW1lfS4gV8SFdGtpIHphbXJvxbxvbmUuYCk7XG4gICAgICAgICAgICBwbGF5UmFkYXJUb25lKDc1MCwgMTgwLCAnc3F1YXJlJyk7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5nLCBzdGF0ZTogJ09TVFJaQUxfV19UT0tVJywgaGVhbHRoUGVyY2VudDogNTAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGcuc3RhdGUgPT09ICdPU1RSWkFMX1dfVE9LVScpIHtcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgQW50aXZpcnVzIENhc2NhZGUgZm9yIHRoaXMgZGVzdHJveWVkIHRhcmdldCFcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICB0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZShnKTtcbiAgICAgICAgICAgIH0sIDUwKTtcblxuICAgICAgICAgICAgc2V0SHVudGVyU3RhdGUoaCA9PiAoe1xuICAgICAgICAgICAgICAuLi5oLFxuICAgICAgICAgICAgICBraWxsc0NvdW50OiBoLmtpbGxzQ291bnQgKyAxLFxuICAgICAgICAgICAgICBmaXhlZE5vZGVzQ291bnQ6IGguZml4ZWROb2Rlc0NvdW50ICsgMSxcbiAgICAgICAgICAgICAgcmVwYWlyUHJvZ3Jlc3M6IE1hdGgubWluKDEwMCwgaC5yZXBhaXJQcm9ncmVzcyArIDE1KVxuICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICByZXR1cm4geyAuLi5nLCBzdGF0ZTogJ1pOSVNaQ1pPTkEnLCBoZWFsdGhQZXJjZW50OiAwIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgfSwgMTIwMCk7XG5cbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0sIFthdXRvUHVyZ2VBY3RpdmUsIGduaWRhcywgYWRkQ29tYmF0TG9nLCBwbGF5UmFkYXJUb25lLCB0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZV0pO1xuXG4gIC8vIFNhdmUgdG8gc2FmZSBzdG9yYWdlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9yYWRhcl9nbmlkYXMnLCBnbmlkYXMpO1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfaW9fbm9kZXMnLCBpb05vZGVzKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX3NlY3VyZWRfbGF5ZXJzJywgc2VjdXJlZExheWVycyk7XG4gIH0sIFtnbmlkYXMsIGlvTm9kZXMsIHNlY3VyZWRMYXllcnNdKTtcblxuICAvLyBDYW52YXMgRHJhd2luZyBmb3IgQ2xhc3NpYyBNaWxpdGFyeSBQUEkgUmFkYXIgQ1JUIERpc3BsYXkgKyBQcm9taWXFhCBaYWfFgmFkeVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGNhbnZhcyA9IGNhbnZhc1JlZi5jdXJyZW50O1xuICAgIGlmICghY2FudmFzKSByZXR1cm47XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgaWYgKCFjdHgpIHJldHVybjtcblxuICAgIGNvbnN0IHdpZHRoID0gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgY29uc3QgY2VudGVyWCA9IHdpZHRoIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gaGVpZ2h0IC8gMjtcbiAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihjZW50ZXJYLCBjZW50ZXJZKSAtIDI0O1xuXG4gICAgLy8gQ2xlYXIgQ2FudmFzIHdpdGggTWlsaXRhcnkgUmFkYXIgR3JlZW4tQmxhY2sgR2xvd1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAyMDYwNCc7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuXG4gICAgLy8gMS4gUmFkYXIgQ2lyY3VsYXIgQmFja2dyb3VuZCBHcmFkaWVudHNcbiAgICBjb25zdCByYWRpYWxHcmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGNlbnRlclgsIGNlbnRlclksIDUsIGNlbnRlclgsIGNlbnRlclksIHJhZGl1cyk7XG4gICAgcmFkaWFsR3JhZC5hZGRDb2xvclN0b3AoMCwgJ3JnYmEoMCwgNDUsIDIwLCAwLjc1KScpO1xuICAgIHJhZGlhbEdyYWQuYWRkQ29sb3JTdG9wKDAuNjUsICdyZ2JhKDAsIDI1LCAxMCwgMC44OCknKTtcbiAgICByYWRpYWxHcmFkLmFkZENvbG9yU3RvcCgxLCAncmdiYSgxLCAxMiwgNSwgMC45OSknKTtcbiAgICBjdHguZmlsbFN0eWxlID0gcmFkaWFsR3JhZDtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgLy8gMi4gQ29uY2VudHJpYyBSYW5nZSBSaW5ncyAmIEFudGl2aXJ1cyBMYXllciBTaGllbGQgQmFuZHNcbiAgICBjb25zdCByaW5nRnJhY3Rpb25zID0gWzAuMjUsIDAuNTAsIDAuNzUsIDEuMF07XG4gICAgY29uc3QgcmluZ0xhYmVscyA9IFsnMjUgS00gKFJkemXFhCBOVCknLCAnNTAgS00gKFBhbWnEmcSHIFJBTSknLCAnNzUgS00gKE1vbml0b3IgJiBJL08pJywgJzEwMCBLTSAoUGVyeW1ldHIpJ107XG5cbiAgICAvLyBEcmF3IFNlY3VyZWQgTGF5ZXIgU2hpZWxkIEJhbmRzXG4gICAgc2VjdXJlZExheWVycy5mb3JFYWNoKChsYXllciwgaWR4KSA9PiB7XG4gICAgICBpZiAobGF5ZXIuaXNTZWN1cmVkKSB7XG4gICAgICAgIGNvbnN0IGlubmVyUiA9IGlkeCA9PT0gMCA/IDAgOiByYWRpdXMgKiByaW5nRnJhY3Rpb25zW2lkeCAtIDFdO1xuICAgICAgICBjb25zdCBvdXRlclIgPSByYWRpdXMgKiByaW5nRnJhY3Rpb25zW2lkeF07XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIG91dGVyUiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBpZiAoaW5uZXJSID4gMCkge1xuICAgICAgICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgaW5uZXJSLCAwLCBNYXRoLlBJICogMiwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICAgIC8vIExheWVyIFN0YWdlIFRpbnRcbiAgICAgICAgaWYgKGxheWVyLnN0YWdlID09PSAnSU1NRURJQVRFX0xPQ0snKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDI1NSwgMjAwLCAwLjE4KSc7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDAsIDI0MCwgMjU1LCAwLjI1KSc7XG4gICAgICAgIH0gZWxzZSBpZiAobGF5ZXIuc3RhZ2UgPT09ICdORUlHSEJPUl9DQVNDQURFJykge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgxNiwgMTg1LCAxMjksIDAuMjIpJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoNSwgMTUwLCAxMDUsIDAuMTQpJztcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmluZ0ZyYWN0aW9ucy5mb3JFYWNoKChmcmFjLCBpZHgpID0+IHtcbiAgICAgIGNvbnN0IHIgPSByYWRpdXMgKiBmcmFjO1xuICAgICAgY29uc3QgbGF5ZXIgPSBzZWN1cmVkTGF5ZXJzW2lkeF07XG4gICAgICBjb25zdCBpc1NlY3VyZWQgPSBsYXllcj8uaXNTZWN1cmVkO1xuXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIHIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzU2VjdXJlZCBcbiAgICAgICAgPyAncmdiYSgwLCAyNTUsIDIwMCwgMC44NSknIFxuICAgICAgICA6IGlkeCA9PT0gMyA/ICdyZ2JhKDAsIDI1NSwgMTAwLCAwLjYpJyA6ICdyZ2JhKDAsIDI1NSwgMTAwLCAwLjI1KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gaXNTZWN1cmVkID8gMi41IDogKGlkeCA9PT0gMyA/IDIgOiAxKTtcbiAgICAgIGN0eC5zZXRMaW5lRGFzaChpZHggPT09IDMgfHwgaXNTZWN1cmVkID8gW10gOiBbNCwgNF0pO1xuICAgICAgaWYgKGlzU2VjdXJlZCkge1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAnIzAwZmZjYyc7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgICB9XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDA7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuXG4gICAgICAvLyBSaW5nIFJhbmdlIERpc3RhbmNlIExhYmVscyArIFNoaWVsZCBTdGF0dXNcbiAgICAgIGN0eC5mb250ID0gJ2JvbGQgOXB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBpc1NlY3VyZWQgPyAnIzAwZmZjYycgOiAncmdiYSgwLCAyNTUsIDEwMCwgMC43KSc7XG4gICAgICBjb25zdCBzdGF0dXNTdWZmaXggPSBpc1NlY3VyZWQgPyBgIFvwn5uh77iPICR7bGF5ZXIuc2hpZWxkUGVyY2VudH0lIFRBUkNaQV1gIDogJyc7XG4gICAgICBjdHguZmlsbFRleHQoYCR7cmluZ0xhYmVsc1tpZHhdfSR7c3RhdHVzU3VmZml4fWAsIGNlbnRlclggKyA4LCBjZW50ZXJZIC0gciArIDEyKTtcbiAgICB9KTtcblxuICAgIC8vIDMuIEF6aW11dGggQ3Jvc3NoYWlycyAmIENvbXBhc3MgR3JhdGljdWxlc1xuICAgIGZvciAobGV0IGRlZyA9IDA7IGRlZyA8IDM2MDsgZGVnICs9IDE1KSB7XG4gICAgICBjb25zdCBpc0NhcmRpbmFsID0gZGVnICUgOTAgPT09IDA7XG4gICAgICBjb25zdCBpc01ham9yID0gZGVnICUgNDUgPT09IDA7XG4gICAgICBjb25zdCByYWQgPSAoZGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgY29uc3QgeEVuZCA9IGNlbnRlclggKyByYWRpdXMgKiBNYXRoLmNvcyhyYWQpO1xuICAgICAgY29uc3QgeUVuZCA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihyYWQpO1xuXG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGNlbnRlclgsIGNlbnRlclkpO1xuICAgICAgY3R4LmxpbmVUbyh4RW5kLCB5RW5kKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGlzQ2FyZGluYWwgXG4gICAgICAgID8gJ3JnYmEoMCwgMjU1LCAxNTAsIDAuNDUpJyBcbiAgICAgICAgOiBpc01ham9yID8gJ3JnYmEoMCwgMjU1LCAxMDAsIDAuMjIpJyA6ICdyZ2JhKDAsIDI1NSwgMTAwLCAwLjA4KSc7XG4gICAgICBjdHgubGluZVdpZHRoID0gaXNDYXJkaW5hbCA/IDEuOCA6IChpc01ham9yID8gMS4wIDogMC41KTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgLy8gRGVncmVlIExhYmVsc1xuICAgICAgaWYgKGRlZyAlIDMwID09PSAwKSB7XG4gICAgICAgIGNvbnN0IGxhYmVsRGlzdCA9IHJhZGl1cyArIDE0O1xuICAgICAgICBjb25zdCB4TGJsID0gY2VudGVyWCArIGxhYmVsRGlzdCAqIE1hdGguY29zKHJhZCk7XG4gICAgICAgIGNvbnN0IHlMYmwgPSBjZW50ZXJZICsgbGFiZWxEaXN0ICogTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgY3R4LmZvbnQgPSBpc0NhcmRpbmFsID8gJ2JvbGQgMTBweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZScgOiAnOXB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQ2FyZGluYWwgPyAnIzVlZWFkNCcgOiAncmdiYSgwLCAyNTUsIDEwMCwgMC42KSc7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuXG4gICAgICAgIGxldCBsYWJlbFRleHQgPSBgJHtkZWd9wrBgO1xuICAgICAgICBpZiAoZGVnID09PSAwKSBsYWJlbFRleHQgPSAnMMKwIE4nO1xuICAgICAgICBlbHNlIGlmIChkZWcgPT09IDkwKSBsYWJlbFRleHQgPSAnOTDCsCBFJztcbiAgICAgICAgZWxzZSBpZiAoZGVnID09PSAxODApIGxhYmVsVGV4dCA9ICcxODDCsCBTJztcbiAgICAgICAgZWxzZSBpZiAoZGVnID09PSAyNzApIGxhYmVsVGV4dCA9ICcyNzDCsCBXJztcblxuICAgICAgICBjdHguZmlsbFRleHQobGFiZWxUZXh0LCB4TGJsLCB5TGJsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAzYi4gQ2VudHJhbCBNb25vbGl0aCBOdWNsZWFyIENvcmUgUmVhY3RvciBHbHlwaFxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIDEwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDBmZmNjJztcbiAgICBjdHguc2hhZG93Q29sb3IgPSAnIzAwZmZmZic7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSAxNTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIDE2LCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMDAsIDAuNiknO1xuICAgIGN0eC5saW5lV2lkdGggPSAxLjU7XG4gICAgY3R4LnNldExpbmVEYXNoKFszLCAzXSk7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5zZXRMaW5lRGFzaChbXSk7XG5cbiAgICAvLyA0LiBBY3RpdmUgQW50aXZpcnVzIENhc2NhZGUgTGFzZXIgRW1pdHRlcnMgJiBOZWlnaGJvcmluZyBTcG9rZSBDb25kdWl0c1xuICAgIGlmIChjYXNjYWRlU3RhdGUuaXNBY3RpdmUgJiYgKGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUicgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERScgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnSU1NRURJQVRFX0xPQ0snKSkge1xuICAgICAgY29uc3QgdGFyZ2V0UmFkID0gKGNhc2NhZGVTdGF0ZS5jdXJyZW50QmVhcmluZ0RlZyAtIDkwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgIGNvbnN0IHRhcmdldERpc3QgPSByYWRpdXMgKiBjYXNjYWRlU3RhdGUuY3VycmVudERpc3RhbmNlUmF0aW87XG4gICAgICBjb25zdCB0eCA9IGNlbnRlclggKyB0YXJnZXREaXN0ICogTWF0aC5jb3ModGFyZ2V0UmFkKTtcbiAgICAgIGNvbnN0IHR5ID0gY2VudGVyWSArIHRhcmdldERpc3QgKiBNYXRoLnNpbih0YXJnZXRSYWQpO1xuXG4gICAgICAvLyBQcmltYXJ5IEluY2luZXJhdGlvbiBMYXNlciBCZWFtIGZyb20gTW9ub2xpdGggQ29yZVxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUicgPyAnI2ZmMDA1NScgOiAnIzAwZmZmZic7XG4gICAgICBjdHgubGluZVdpZHRoID0gNDtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUicgPyAnI2ZmMDA1NScgOiAnIzAwZmZmZic7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDI1O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAvLyBMYXNlciBTd2VlcCBBcmMgb24gQ3VycmVudCBTZWN0b3JcbiAgICAgIGNvbnN0IGFyY1N0YXJ0ID0gdGFyZ2V0UmFkIC0gMC40O1xuICAgICAgY29uc3QgYXJjRW5kID0gdGFyZ2V0UmFkICsgMC40O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCB0YXJnZXREaXN0LCBhcmNTdGFydCwgYXJjRW5kKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsIDI1NSwgMjQwLCAwLjkpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAxODtcbiAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgLy8gTmVpZ2hib3JpbmcgTGF5ZXIgQ29uZHVpdHNcbiAgICAgIGlmIChjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdORUlHSEJPUl9DQVNDQURFJykge1xuICAgICAgICBbLTAuMywgMC4zXS5mb3JFYWNoKG9mZnNldCA9PiB7XG4gICAgICAgICAgY29uc3Qgc3Bva2VSYWQgPSB0YXJnZXRSYWQgKyBvZmZzZXQ7XG4gICAgICAgICAgY29uc3Qgc3ggPSBjZW50ZXJYICsgcmFkaXVzICogMC45ICogTWF0aC5jb3Moc3Bva2VSYWQpO1xuICAgICAgICAgIGNvbnN0IHN5ID0gY2VudGVyWSArIHJhZGl1cyAqIDAuOSAqIE1hdGguc2luKHNwb2tlUmFkKTtcblxuICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgICBjdHgubW92ZVRvKHR4LCB0eSk7XG4gICAgICAgICAgY3R4LmxpbmVUbyhzeCwgc3kpO1xuICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDUyLCAyMTEsIDE1MywgMC44NSknO1xuICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMzNGQzOTknO1xuICAgICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTQ7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIC8vIOKaoSBQUk9NSUXFgyBaQUfFgUFEWSBHTklEOiBSRU5ERVJJTkcgVUxUUkEtV1lTT0tJRUogV0nEhFpLSSBERVpJTlRFR1JBQ0pJXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIGlmIChhY3RpdmVEb29tUmF5ICYmIGFjdGl2ZURvb21SYXkuaXNBY3RpdmUpIHtcbiAgICAgIGNvbnN0IHRhcmdldElkcyA9IGFjdGl2ZURvb21SYXkudGFyZ2V0R25pZGFJZHM7XG5cbiAgICAgIHRhcmdldElkcy5mb3JFYWNoKHRJZCA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGduaWRhcy5maW5kKGcgPT4gZy5pZCA9PT0gdElkKTtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcblxuICAgICAgICBjb25zdCB0YXJnZXRSYWQgPSAodGFyZ2V0LmJlYXJpbmdEZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICAgIGNvbnN0IHRhcmdldERpc3QgPSByYWRpdXMgKiB0YXJnZXQuZGlzdGFuY2VSYXRpbztcbiAgICAgICAgY29uc3QgdHggPSBjZW50ZXJYICsgdGFyZ2V0RGlzdCAqIE1hdGguY29zKHRhcmdldFJhZCk7XG4gICAgICAgIGNvbnN0IHR5ID0gY2VudGVyWSArIHRhcmdldERpc3QgKiBNYXRoLnNpbih0YXJnZXRSYWQpO1xuXG4gICAgICAgIC8vIDEuIE91dGVyIE1hc3NpdmUgUGxhc21hIENvcm9uYSBBdXJhXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgICAgY3R4LmxpbmVUbyh0eCwgdHkpO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBhY3RpdmVEb29tUmF5Lm1vZGUgPT09ICdSRVRST18xMDAnID8gJ3JnYmEoMCwgMjQwLCAyNTUsIDAuNSknIDogJ3JnYmEoMjU1LCAwLCA3MCwgMC41NSknO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMTQ7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9IGFjdGl2ZURvb21SYXkubW9kZSA9PT0gJ1JFVFJPXzEwMCcgPyAnIzAwZmZmZicgOiAnI2ZmMDA1NSc7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMzU7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAgIC8vIDIuIE1pZGRsZSBJbnRlbnNlIExhc2VyIEJlYW1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGNlbnRlclgsIGNlbnRlclkpO1xuICAgICAgICBjdHgubGluZVRvKHR4LCB0eSk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGFjdGl2ZURvb21SYXkubW9kZSA9PT0gJ1JFVFJPXzEwMCcgPyAnIzM4YmRmOCcgOiAnI2ZmMzM2Nic7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSA2O1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAnI2ZmZmZmZic7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMjA7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAgIC8vIDMuIElubmVyIEJsaW5kaW5nIFdoaXRlLUhvdCBDb3JlIExpbmVcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGNlbnRlclgsIGNlbnRlclkpO1xuICAgICAgICBjdHgubGluZVRvKHR4LCB0eSk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDIuNTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICAgIC8vIDQuIFByb2NlZHVyYWwgRWxlY3RyaWMgTGlnaHRuaW5nIEFyY3MgQnJhbmNoaW5nIGZyb20gQmVhbVxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICAgIGNvbnN0IHN0ZXBzID0gODtcbiAgICAgICAgZm9yIChsZXQgcyA9IDE7IHMgPCBzdGVwczsgcysrKSB7XG4gICAgICAgICAgY29uc3QgdCA9IHMgLyBzdGVwcztcbiAgICAgICAgICBjb25zdCBseCA9IGNlbnRlclggKyAodHggLSBjZW50ZXJYKSAqIHQgKyAoTWF0aC5yYW5kb20oKSAqIDE0IC0gNyk7XG4gICAgICAgICAgY29uc3QgbHkgPSBjZW50ZXJZICsgKHR5IC0gY2VudGVyWSkgKiB0ICsgKE1hdGgucmFuZG9tKCkgKiAxNCAtIDcpO1xuICAgICAgICAgIGN0eC5saW5lVG8obHgsIGx5KTtcbiAgICAgICAgfVxuICAgICAgICBjdHgubGluZVRvKHR4LCB0eSk7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuMjtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgICAvLyA1LiBUYXJnZXQgSW1wYWN0IERldG9uYXRpb24gU2hvY2t3YXZlIFJpbmdcbiAgICAgICAgY29uc3QgZWxhcHNlZCA9IChEYXRlLm5vdygpIC0gYWN0aXZlRG9vbVJheS5zdGFydGVkQXQpICUgNjAwO1xuICAgICAgICBjb25zdCBibGFzdFJhZGl1cyA9IChlbGFwc2VkIC8gNjAwKSAqIDI4ICsgNjtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHR4LCB0eSwgYmxhc3RSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYmEoMjU1LCA1MCwgMTAwLCAkezEgLSBlbGFwc2VkIC8gNjAwfSlgO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyNmZjAwM2MnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgICAvLyBJbXBhY3QgQ29yZSBCbGFzdFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmModHgsIHR5LCAxMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC45KSc7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9ICcjZmYwMDU1JztcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAyMDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAgIC8vIDYuIERpcmVjdCBPbi1SYWRhciBIVUQgV2FybmluZyBCYW5uZXJcbiAgICAgICAgY3R4LmZvbnQgPSAnYm9sZCAxMHB4IFwiSmV0QnJhaW5zIE1vbm9cIiwgbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmYwMDU1JztcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyNmZjAwMDAnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguZmlsbFRleHQoYOKaoSBbUFJPTUlFxYMgWkFHxYFBRFkgOTQwLjggVEh6OiBTUE9QSUVMQU5JRV1gLCB0eCwgdHkgLSAyMCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBhbmQgRHJhdyBEaXNpbnRlZ3JhdGlvbiBQYXJ0aWNsZXNcbiAgICBpZiAocGFydGljbGVzUmVmLmN1cnJlbnQubGVuZ3RoID4gMCkge1xuICAgICAgcGFydGljbGVzUmVmLmN1cnJlbnQuZm9yRWFjaChwID0+IHtcbiAgICAgICAgcC54ICs9IHAudng7XG4gICAgICAgIHAueSArPSBwLnZ5O1xuICAgICAgICBwLmxpZmUgLT0gMC4wMzU7XG5cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHAueCwgcC55LCBNYXRoLm1heCgwLjUsIHAuc2l6ZSAqIHAubGlmZSksIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHAuY29sb3I7XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IE1hdGgubWF4KDAsIHAubGlmZSk7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9IHAuY29sb3I7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gODtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAxLjA7XG4gICAgICB9KTtcbiAgICAgIHBhcnRpY2xlc1JlZi5jdXJyZW50ID0gcGFydGljbGVzUmVmLmN1cnJlbnQuZmlsdGVyKHAgPT4gcC5saWZlID4gMCk7XG4gICAgfVxuXG4gICAgLy8gNS4gRHJhdyBTeXN0ZW0gSS9PIE5vZGVzIG9uIFJhZGFyIEdyaWQgKE1vbml0b3IsIFJBTSwgU3RvcmFnZSwgTklDLCBLZXlib2FyZClcbiAgICBpb05vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBjb25zdCByYWQgPSAobm9kZS5yYWRhckFuZ2xlRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgY29uc3QgZGlzdCA9IHJhZGl1cyAqIG5vZGUucmFkYXJSaW5nUmFkaXVzO1xuICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBkaXN0ICogTWF0aC5jb3MocmFkKTtcbiAgICAgIGNvbnN0IHkgPSBjZW50ZXJZICsgZGlzdCAqIE1hdGguc2luKHJhZCk7XG5cbiAgICAgIGNvbnN0IGlzQ29tcHJvbWlzZWQgPSBub2RlLnN0YXR1cyA9PT0gJ0NPTVBST01JU0VEJztcbiAgICAgIGNvbnN0IGlzUmVjb25zdHJ1Y3RlZCA9IG5vZGUuc3RhdHVzID09PSAnUkVDT05TVFJVQ1RFRCc7XG4gICAgICBjb25zdCBpc1NoaWVsZGVkID0gbm9kZS5pc1NoaWVsZGVkIHx8IGlzUmVjb25zdHJ1Y3RlZDtcblxuICAgICAgLy8gSGV4YWdvbmFsIFNoaWVsZCBGb3JjZWZpZWxkIEZyYW1lIGlmIFByb3RlY3RlZFxuICAgICAgaWYgKGlzU2hpZWxkZWQpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGEgPSAoaSAqIDYwIC0gMzApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICAgIGNvbnN0IGh4ID0geCArIDE2ICogTWF0aC5jb3MoYSk7XG4gICAgICAgICAgY29uc3QgaHkgPSB5ICsgMTYgKiBNYXRoLnNpbihhKTtcbiAgICAgICAgICBpZiAoaSA9PT0gMCkgY3R4Lm1vdmVUbyhoeCwgaHkpO1xuICAgICAgICAgIGVsc2UgY3R4LmxpbmVUbyhoeCwgaHkpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMGZmY2MnO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMDQsIDAuMTgpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuODtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmY2MnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgIH1cblxuICAgICAgLy8gTm9kZSBIYWxvIEJveFxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QoeCAtIDksIHkgLSA5LCAxOCwgMTgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQ29tcHJvbWlzZWQgXG4gICAgICAgID8gJ3JnYmEoMjU1LCA1MCwgNTAsIDAuMjUpJyBcbiAgICAgICAgOiBpc1NoaWVsZGVkIFxuICAgICAgICA/ICdyZ2JhKDAsIDI1NSwgMjAwLCAwLjI4KScgXG4gICAgICAgIDogJ3JnYmEoMCwgMTUwLCAyNTUsIDAuMiknO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNDb21wcm9taXNlZCBcbiAgICAgICAgPyAnI2ZmMzM0NCcgXG4gICAgICAgIDogaXNTaGllbGRlZCBcbiAgICAgICAgPyAnIzAwZmZjYycgXG4gICAgICAgIDogJyMwMGJiZmYnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFNwZWNpYWwgSWNvbiBNYXJrIGZvciBNb25pdG9yXG4gICAgICBpZiAobm9kZS5pZCA9PT0gJ25vZGUtbW9uaXRvcicpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZlZWRkJztcbiAgICAgICAgY3R4LmZvbnQgPSAnYm9sZCA4cHggbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KCdNT05JVE9SJywgeCwgeSAtIDE0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29kZSB0YWdcbiAgICAgIGN0eC5mb250ID0gJzhweCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQ29tcHJvbWlzZWQgPyAnI2ZmODg4OCcgOiBpc1NoaWVsZGVkID8gJyMwMGZmY2MnIDogJyM4OGVlZmYnO1xuICAgICAgY3R4LmZpbGxUZXh0KG5vZGUuY29kZSwgeCwgeSArIDE1KTtcbiAgICB9KTtcblxuICAgIC8vIDYuIERyYXcgUmFkYXIgUm90YXRpbmcgU3dlZXAgQmVhbSB3aXRoIFBob3NwaG9yIFRyYWlsXG4gICAgY29uc3Qgc3dlZXBSYWQgPSAoc3dlZXBBbmdsZSAtIDkwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICBjb25zdCB0cmFpbFNlZ21lbnRzID0gMjU7XG4gICAgY29uc3QgdHJhaWxBbmdsZVNwYW4gPSAwLjU1OyAvLyBpbiByYWRpYW5zXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWlsU2VnbWVudHM7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnRBID0gc3dlZXBSYWQgLSAodHJhaWxBbmdsZVNwYW4gKiAoaSArIDEpKSAvIHRyYWlsU2VnbWVudHM7XG4gICAgICBjb25zdCBlbmRBID0gc3dlZXBSYWQgLSAodHJhaWxBbmdsZVNwYW4gKiBpKSAvIHRyYWlsU2VnbWVudHM7XG4gICAgICBjb25zdCBhbHBoYSA9ICgxIC0gaSAvIHRyYWlsU2VnbWVudHMpICogMC4yMjtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBzdGFydEEsIGVuZEEpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDAsIDI1NSwgMTIwLCAke2FscGhhfSlgO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBMZWFkaW5nIEhpZ2gtSW50ZW5zaXR5IFN3ZWVwIExpbmVcbiAgICBjb25zdCBzd2VlcFggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3Moc3dlZXBSYWQpO1xuICAgIGNvbnN0IHN3ZWVwWSA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihzd2VlcFJhZCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSk7XG4gICAgY3R4LmxpbmVUbyhzd2VlcFgsIHN3ZWVwWSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMTgwLCAyNTUsIDIwMCwgMC45NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyLjI7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMjU1LCAxMjAsIDAuOCknO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMDsgLy8gcmVzZXRcblxuICAgIC8vIDcuIERyYXcgR25pZGFzIChUaHJlYXQgVGFyZ2V0cykgd2l0aCBBaXItVHJhZmZpYyBSYWRhciBCbGlwc1xuICAgIGduaWRhcy5mb3JFYWNoKGduaWRhID0+IHtcbiAgICAgIGNvbnN0IHNjb3JlID0gZ2V0R25pZGFUaHJlYXRTY29yZShnbmlkYSk7XG4gICAgICBjb25zdCBjb2xvckNmZyA9IGdldFRocmVhdENvbG9yKHNjb3JlKTtcbiAgICAgIGNvbnN0IGduaWRhUmFkID0gKGduaWRhLmJlYXJpbmdEZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb25zdCBnbmlkYURpc3QgPSByYWRpdXMgKiBnbmlkYS5kaXN0YW5jZVJhdGlvO1xuICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBnbmlkYURpc3QgKiBNYXRoLmNvcyhnbmlkYVJhZCk7XG4gICAgICBjb25zdCB5ID0gY2VudGVyWSArIGduaWRhRGlzdCAqIE1hdGguc2luKGduaWRhUmFkKTtcblxuICAgICAgY29uc3QgaXNEZXN0cm95ZWQgPSBnbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnO1xuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGduaWRhLmlkID09PSBzZWxlY3RlZFRhcmdldElkO1xuXG4gICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgLy8gRGVzdHJveWVkIHdyZWNrYWdlIG1hcmtlclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgNCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTAwLCAxMDAsIDEwMCwgMC40KSc7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNTU1NTU1JztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHguZm9udCA9ICc4cHggbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNjY2NjY2JztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGBbUFVSR0VEXWAsIHgsIHkgKyAxMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTGl2ZSBHbmlkYSBCbGlwIChHbG93aW5nIERpYW1vbmQgd2l0aCBEeW5hbWljIFRocmVhdCBDb2xvcilcbiAgICAgIGNvbnN0IGJsaXBTaXplID0gaXNTZWxlY3RlZCA/IDggOiA2O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh4LCB5IC0gYmxpcFNpemUpO1xuICAgICAgY3R4LmxpbmVUbyh4ICsgYmxpcFNpemUsIHkpO1xuICAgICAgY3R4LmxpbmVUbyh4LCB5ICsgYmxpcFNpemUpO1xuICAgICAgY3R4LmxpbmVUbyh4IC0gYmxpcFNpemUsIHkpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JDZmcuaGV4O1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gY29sb3JDZmcuZ2xvd0hleDtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gaXNTZWxlY3RlZCA/IDE2IDogMTA7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAvLyBTZWxlY3Rpb24gUmV0aWNsZVxuICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIDE2LCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuODtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFszLCAzXSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWlyLVRyYWZmaWMgVHJhY2sgVmVjdG9yIExlYWRlciBMaW5lXG4gICAgICBjb25zdCB2ZWN0b3JSYWQgPSBnbmlkYVJhZCArIE1hdGguUEkgLyA0O1xuICAgICAgY29uc3QgdmVjRW5kWCA9IHggKyAxOCAqIE1hdGguY29zKHZlY3RvclJhZCk7XG4gICAgICBjb25zdCB2ZWNFbmRZID0geSArIDE4ICogTWF0aC5zaW4odmVjdG9yUmFkKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICBjdHgubGluZVRvKHZlY0VuZFgsIHZlY0VuZFkpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JDZmcuaGV4O1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFRyYW5zcG9uZGVyIFRhZyAmIFRhcmdldCBEZXRhaWxzXG4gICAgICBjdHguZm9udCA9ICdib2xkIDlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIGN0eC5maWxsVGV4dChgJHtnbmlkYS5uYW1lLnNwbGl0KCcgJylbMF19YCwgeCArIDEwLCB5IC0gNCk7XG4gICAgICBjdHguZm9udCA9ICdib2xkIDhweCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yQ2ZnLmhleDtcbiAgICAgIGN0eC5maWxsVGV4dChgVEhSRUFUICR7c2NvcmV9JSB8IEFMVCAke2duaWRhLmFsdGl0dWRlS219a2AsIHggKyAxMCwgeSArIDYpO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIH0pO1xuXG4gICAgLy8gOC4gRHJhdyDFgU9XQ0EgR0VNSU5JIEFJIChJbnRlcmNlcHRvciBDb21iYXQgQmVhY29uKVxuICAgIGNvbnN0IGh1bnRlclJhZCA9IChodW50ZXJTdGF0ZS5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IGh1bnRlckRpc3QgPSByYWRpdXMgKiBodW50ZXJTdGF0ZS5kaXN0YW5jZVJhdGlvO1xuICAgIGNvbnN0IGh4ID0gY2VudGVyWCArIGh1bnRlckRpc3QgKiBNYXRoLmNvcyhodW50ZXJSYWQpO1xuICAgIGNvbnN0IGh5ID0gY2VudGVyWSArIGh1bnRlckRpc3QgKiBNYXRoLnNpbihodW50ZXJSYWQpO1xuXG4gICAgLy8gSWYgR2VtaW5pIGlzIGxvY2tpbmcgb250byBhIHRhcmdldCwgZHJhdyBkeW5hbWljIGxhc2VyIGZpcmluZyBiZWFtXG4gICAgaWYgKGh1bnRlclN0YXRlLnRhcmdldEduaWRhSWQpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGduaWRhcy5maW5kKGcgPT4gZy5pZCA9PT0gaHVudGVyU3RhdGUudGFyZ2V0R25pZGFJZCk7XG4gICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKSB7XG4gICAgICAgIGNvbnN0IHR4UmFkID0gKHRhcmdldC5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICBjb25zdCB0eERpc3QgPSByYWRpdXMgKiB0YXJnZXQuZGlzdGFuY2VSYXRpbztcbiAgICAgICAgY29uc3QgdHggPSBjZW50ZXJYICsgdHhEaXN0ICogTWF0aC5jb3ModHhSYWQpO1xuICAgICAgICBjb25zdCB0eSA9IGNlbnRlclkgKyB0eERpc3QgKiBNYXRoLnNpbih0eFJhZCk7XG5cbiAgICAgICAgLy8gUHVsc2luZyBMYXNlciBFeHRlcm1pbmF0aW9uIEJlYW1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGh4LCBoeSk7XG4gICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMzAsIDAuODUpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDIuNTtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgICAvLyBMYXNlciBJbXBhY3QgQnVyc3RcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHR4LCB0eSwgOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuNiknO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbWluaSBIdW50ZXIgSW50ZXJjZXB0b3IgSmV0IEdseXBoIChUcmlhbmdsZSAmIFdpbmdzKVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZShoeCwgaHkpO1xuICAgIGN0eC5yb3RhdGUoaHVudGVyUmFkICsgTWF0aC5QSSAvIDIpO1xuXG4gICAgLy8gSmV0IEJvZHlcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCAtMTIpOyAvLyBub3NlXG4gICAgY3R4LmxpbmVUbyg5LCAxMCk7ICAvLyByaWdodCB3aW5nXG4gICAgY3R4LmxpbmVUbygwLCA2KTsgICAvLyBjZW50ZXIgdGFpbFxuICAgIGN0eC5saW5lVG8oLTksIDEwKTsgLy8gbGVmdCB3aW5nXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwZmZmZic7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTQ7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIEh1bnRlciBUYWdcbiAgICBjdHguZm9udCA9ICdib2xkIDlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDBmZmZmJztcbiAgICBjdHguZmlsbFRleHQoYOKaoSAke2h1bnRlclN0YXRlLmNhbGxzaWdufWAsIGh4LCBoeSAtIDE2KTtcbiAgICBjdHguZm9udCA9ICc4cHggbW9ub3NwYWNlJztcbiAgICBjdHguZmlsbFN0eWxlID0gJyM4OGZmZmYnO1xuICAgIGN0eC5maWxsVGV4dChgU1RBTjogJHtodW50ZXJTdGF0ZS5zdGF0dXN9YCwgaHgsIGh5ICsgMTYpO1xuXG4gICAgLy8gOS4gQ1JUIFNjcmVlbiBTY2FubGluZSAmIFZpZ25ldHRlIEVmZmVjdFxuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjA1KSc7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gNCkge1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIHksIHdpZHRoLCAxLjUpO1xuICAgIH1cblxuICAgIC8vIE91dGVyIEJlemVsIFJpbmcgd2l0aCBCZWFyaW5nIEdyYXRpY3VsZXNcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMgKyAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMGZmODgnO1xuICAgIGN0eC5saW5lV2lkdGggPSAzLjU7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmODgnO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gODtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gIH0sIFtzd2VlcEFuZ2xlLCBnbmlkYXMsIGlvTm9kZXMsIGh1bnRlclN0YXRlLCBzZWxlY3RlZFRhcmdldElkLCBzZWN1cmVkTGF5ZXJzLCBjYXNjYWRlU3RhdGUsIGFjdGl2ZURvb21SYXldKTtcblxuICAvLyBDbGljayBvbiBDYW52YXMgdG8gU2VsZWN0IC8gVGFyZ2V0IEduaWRhIG9yIE5vZGVcbiAgY29uc3QgaGFuZGxlQ2FudmFzQ2xpY2sgPSAoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQ2FudmFzRWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBjYW52YXNSZWYuY3VycmVudDtcbiAgICBpZiAoIWNhbnZhcykgcmV0dXJuO1xuICAgIGNvbnN0IHJlY3QgPSBjYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgY2xpY2tYID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0O1xuICAgIGNvbnN0IGNsaWNrWSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gICAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICBjb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSBoZWlnaHQgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNlbnRlclgsIGNlbnRlclkpIC0gMjA7XG5cbiAgICAvLyBDaGVjayBjbGljayBwcm94aW1pdHkgdG8gYW55IEduaWRhXG4gICAgZm9yIChjb25zdCBnbmlkYSBvZiBnbmlkYXMpIHtcbiAgICAgIGNvbnN0IGduaWRhUmFkID0gKGduaWRhLmJlYXJpbmdEZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb25zdCBnbmlkYURpc3QgPSByYWRpdXMgKiBnbmlkYS5kaXN0YW5jZVJhdGlvO1xuICAgICAgY29uc3QgZ3ggPSBjZW50ZXJYICsgZ25pZGFEaXN0ICogTWF0aC5jb3MoZ25pZGFSYWQpO1xuICAgICAgY29uc3QgZ3kgPSBjZW50ZXJZICsgZ25pZGFEaXN0ICogTWF0aC5zaW4oZ25pZGFSYWQpO1xuXG4gICAgICBjb25zdCBkaXN0ID0gTWF0aC5oeXBvdChjbGlja1ggLSBneCwgY2xpY2tZIC0gZ3kpO1xuICAgICAgaWYgKGRpc3QgPCAyMikge1xuICAgICAgICBzZXRTZWxlY3RlZFRhcmdldElkKGduaWRhLmlkKTtcbiAgICAgICAgcGxheVJhZGFyVG9uZSg5MDAsIDEwMCwgJ3NpbmUnKTtcbiAgICAgICAgYWRkQ29tYmF0TG9nKGBbUkFEQVItTUFOVUFMXSBaYXpuYWN6b25vIGNlbDogJHtnbmlkYS5uYW1lfSBuYSBhenltdWNpZSAke2duaWRhLmJlYXJpbmdEZWd9wrAuYCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLy8gVHJpZ2dlciBHZW1pbmkgSW50ZXJjZXB0IG9uIFNlbGVjdGVkIEduaWRhXG4gIGNvbnN0IGhhbmRsZU9yZGVySHVudGVyU2xhdWdodGVyID0gKGduaWRhOiBSYWRhckduaWRhVGFyZ2V0KSA9PiB7XG4gICAgaWYgKGduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQScpIHJldHVybjtcbiAgICBhZGRDb21iYXRMb2coYFtST1pLQVogQk9KT1dZXSDFgW93Y2EgR2VtaW5pIHd5c8WCYW55IGRvIG5hdHljaG1pYXN0b3dlZ28gdWJvanUgY2VsdTogJHtnbmlkYS5uYW1lfWApO1xuICAgIHBsYXlSYWRhclRvbmUoMTA1MCwgMjAwLCAndHJpYW5nbGUnKTtcblxuICAgIHNldEh1bnRlclN0YXRlKHByZXYgPT4gKHtcbiAgICAgIC4uLnByZXYsXG4gICAgICB0YXJnZXRHbmlkYUlkOiBnbmlkYS5pZCxcbiAgICAgIHN0YXR1czogJ0lOVEVSQ0VQVElORycsXG4gICAgICBiZWFyaW5nRGVnOiBnbmlkYS5iZWFyaW5nRGVnLFxuICAgICAgZGlzdGFuY2VSYXRpbzogZ25pZGEuZGlzdGFuY2VSYXRpb1xuICAgIH0pKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SHVudGVyU3RhdGUocHJldiA9PiAoeyAuLi5wcmV2LCBzdGF0dXM6ICdMT0NLX09OJyB9KSk7XG4gICAgICBwbGF5UmFkYXJUb25lKDgwMCwgMjAwLCAnc3F1YXJlJyk7XG4gICAgICBcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBEZXN0cm95IHRhcmdldFxuICAgICAgICBzZXRHbmlkYXMocHJldiA9PiBwcmV2Lm1hcChnID0+IHtcbiAgICAgICAgICBpZiAoZy5pZCA9PT0gZ25pZGEuaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLmcsIHN0YXRlOiAnWk5JU1pDWk9OQScsIGhlYWx0aFBlcmNlbnQ6IDAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGc7XG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBIZWFsIEkvTyBOb2RlXG4gICAgICAgIHNldElvTm9kZXMocHJldiA9PiBwcmV2Lm1hcChuID0+IHtcbiAgICAgICAgICBpZiAobi5pZCA9PT0gZ25pZGEuYXNzb2NpYXRlZElPTm9kZUlkKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5uLCBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJywgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG47XG4gICAgICAgIH0pKTtcblxuICAgICAgICBzZXRIdW50ZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBzdGF0dXM6ICdQQVRST0wnLFxuICAgICAgICAgIGtpbGxzQ291bnQ6IHByZXYua2lsbHNDb3VudCArIDEsXG4gICAgICAgICAgZml4ZWROb2Rlc0NvdW50OiBwcmV2LmZpeGVkTm9kZXNDb3VudCArIDEsXG4gICAgICAgICAgcmVwYWlyUHJvZ3Jlc3M6IE1hdGgubWluKDEwMCwgcHJldi5yZXBhaXJQcm9ncmVzcyArIDIwKVxuICAgICAgICB9KSk7XG5cbiAgICAgICAgYWRkQ29tYmF0TG9nKGBbRUtTVEVSTUlOQUNKQV0gR25pZGEgJHtnbmlkYS5uYW1lfSB6bGlrd2lkb3dhbmEuIFfEmXplxYIgSS9PIHpyZWtvbnN0cnVvd2FueS5gKTtcbiAgICAgICAgcGxheVJhZGFyVG9uZSg0NDAsIDM1MCwgJ3Nhd3Rvb3RoJyk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9LCA4MDApO1xuICB9O1xuXG4gIC8vIFNwYXduIE5ldyBHbmlkYVxuICBjb25zdCBoYW5kbGVTcGF3bkN1c3RvbUduaWRhID0gKCkgPT4ge1xuICAgIGNvbnN0IHR5cGVzOiBHbmlkYVR5cGVbXSA9IFsnR05JREFfRUtSQU5PV0EnLCAnR05JREFfU1pZRlJVSkFDQScsICdHTklEQV9TWlBJRUdPV1NLQScsICdHTklEQV9QQVNPWllUTklDWkEnXTtcbiAgICBjb25zdCByYW5kb21UeXBlID0gdHlwZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdHlwZXMubGVuZ3RoKV07XG4gICAgY29uc3QgaWQgPSBgZ25pZGEtJHtEYXRlLm5vdygpLnRvU3RyaW5nKCkuc2xpY2UoLTQpfWA7XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNjApO1xuICAgIGNvbnN0IGRpc3QgPSAwLjQgKyBNYXRoLnJhbmRvbSgpICogMC40NTtcblxuICAgIGNvbnN0IHNjb3JlID0gTWF0aC5mbG9vcig1OCArIE1hdGgucmFuZG9tKCkgKiA0Mik7IC8vIDU4JSAtIDk5JVxuICAgIGxldCB0aHJlYXRMZXZlbDogJ0VLU1RSRU1BTE5ZJyB8ICdLUllUWUNaTlknIHwgJ1dZU09LSScgfCAnU1JFRE5JJyA9ICdTUkVETkknO1xuICAgIGlmIChzY29yZSA+PSA5MCkgdGhyZWF0TGV2ZWwgPSAnRUtTVFJFTUFMTlknO1xuICAgIGVsc2UgaWYgKHNjb3JlID49IDgwKSB0aHJlYXRMZXZlbCA9ICdLUllUWUNaTlknO1xuICAgIGVsc2UgaWYgKHNjb3JlID49IDY4KSB0aHJlYXRMZXZlbCA9ICdXWVNPS0knO1xuXG4gICAgY29uc3QgbmV3R25pZGE6IFJhZGFyR25pZGFUYXJnZXQgPSB7XG4gICAgICBpZCxcbiAgICAgIG5hbWU6IGBHbmlkYS0ke2lkLnNsaWNlKC0yKX0gW1Bhc2/FvHl0IFNla3Rvcm93eV1gLFxuICAgICAgZ25pZGFUeXBlOiByYW5kb21UeXBlLFxuICAgICAgdHlwZUxhYmVsOiAnR25pZGEgSW53YXp5am5hIChEeW5hbWljIFNwYXduKScsXG4gICAgICBiZWFyaW5nRGVnOiBhbmdsZSxcbiAgICAgIGRpc3RhbmNlUmF0aW86IGRpc3QsXG4gICAgICBhbHRpdHVkZUttOiBNYXRoLnJvdW5kKDUgKyBNYXRoLnJhbmRvbSgpICogMjApLFxuICAgICAgdGhyZWF0TGV2ZWwsXG4gICAgICB0aHJlYXRTY29yZTogc2NvcmUsXG4gICAgICBzdGF0ZTogJ1dZS1JZVEEnLFxuICAgICAgaGVhbHRoUGVyY2VudDogMTAwLFxuICAgICAgYXNzb2NpYXRlZElPTm9kZUlkOiAnbm9kZS1tb25pdG9yJyxcbiAgICAgIHNpZ25hdHVyZVNoYTogQXJyYXkuZnJvbSh7IGxlbmd0aDogNjQgfSwgKCkgPT4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpLnRvU3RyaW5nKDE2KSkuam9pbignJyksXG4gICAgICBhY3RpdmVQcm9jZXNzTmFtZTogYHJvZ3VlX2duaWRhXyR7aWQuc2xpY2UoLTIpfS5leGVgLFxuICAgICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnV3lrcnl0byBub3fEhSBhZ3Jlc3l3bsSFIHByw7NixJkgcHJ6ZWrEmWNpYSBzdHJ1bWllbmlhIGRhbnljaCBla3JhbnUgbW9uaXRvcmEuJyxcbiAgICAgIGluZmVjdGlvblZlY3RvcjogJ1pkYWxuZSB3c3RyenlrbmnEmWNpZSBwYW1pxJljaSBwYXlsb2FkdScsXG4gICAgICB2ZWxvY2l0eTogNDUwXG4gICAgfTtcblxuICAgIHNldEduaWRhcyhwcmV2ID0+IFtuZXdHbmlkYSwgLi4ucHJldl0pO1xuICAgIHNldFNlbGVjdGVkVGFyZ2V0SWQobmV3R25pZGEuaWQpO1xuICAgIGFkZENvbWJhdExvZyhgW0FMQVJNIFJBREFST1dZXSBXeWtyeXRvIG5vd8SFIHdyb2fEhSBHbmlkxJkgbmEgYXp5bXVjaWUgJHthbmdsZX3CsCAoWmFzacSZZzogJHtNYXRoLnJvdW5kKGRpc3QgKiAxMDApfSBrbSwgVGhyZWF0IFNjb3JlOiAke3Njb3JlfSUpIWApO1xuICAgIHBsYXlSYWRhclRvbmUoOTUwLCAzMDAsICdzYXd0b290aCcpO1xuICB9O1xuXG4gIC8vIFJlc2V0L1JlYm9vdCBBbGwgTm9kZXMgYW5kIFRocmVhdHNcbiAgY29uc3QgaGFuZGxlUmVib290UmFkYXJTdWJzeXN0ZW0gPSAoKSA9PiB7XG4gICAgc2V0R25pZGFzKElOSVRJQUxfUkFEQVJfR05JREFTKTtcbiAgICBzZXRJb05vZGVzKElOSVRJQUxfU1lTVEVNX0lPX05PREVTKTtcbiAgICBzZXRTZWxlY3RlZFRhcmdldElkKCdnbmlkYS0wMScpO1xuICAgIHNldEF1dG9QdXJnZUFjdGl2ZShmYWxzZSk7XG4gICAgc2V0SHVudGVyU3RhdGUoe1xuICAgICAgY2FsbHNpZ246ICdHRU1JTkktSFVOVEVSLTAxJyxcbiAgICAgIGJlYXJpbmdEZWc6IDQ1LFxuICAgICAgZGlzdGFuY2VSYXRpbzogMC4yNSxcbiAgICAgIHRhcmdldEduaWRhSWQ6IG51bGwsXG4gICAgICBzdGF0dXM6ICdQQVRST0wnLFxuICAgICAgcmVwYWlyUHJvZ3Jlc3M6IDQ1LFxuICAgICAgc2xhdWdodGVyUG93ZXI6IDk4LFxuICAgICAgaW50ZXJjZXB0U3BlZWQ6IDgyMCxcbiAgICAgIGtpbGxzQ291bnQ6IDAsXG4gICAgICBmaXhlZE5vZGVzQ291bnQ6IDBcbiAgICB9KTtcbiAgICBhZGRDb21iYXRMb2coYFtSRUJPT1RdIFpyZXNldG93YW5vIHBhcmFtZXRyeSByYWRhcnUgbW9ub2xpdHljem5lZ28uIFdzenlzdGtpZSBzeWduYXR1cnkgR25pZCBwcnp5d3LDs2NvbmUuYCk7XG4gIH07XG5cbiAgLy8gQ2FsY3VsYXRlIFN5c3RlbSBIZWFsdGggZnJvbSBOb2RlcyAmIEduaWRhc1xuICBjb25zdCBhY3RpdmVHbmlkYXNDb3VudCA9IGduaWRhcy5maWx0ZXIoZyA9PiBnLnN0YXRlICE9PSAnWk5JU1pDWk9OQScpLmxlbmd0aDtcbiAgY29uc3QgZGVzdHJveWVkR25pZGFzQ291bnQgPSBnbmlkYXMuZmlsdGVyKGcgPT4gZy5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnKS5sZW5ndGg7XG4gIGNvbnN0IGNvbXByb21pc2VkTm9kZXNDb3VudCA9IGlvTm9kZXMuZmlsdGVyKG4gPT4gbi5zdGF0dXMgPT09ICdDT01QUk9NSVNFRCcpLmxlbmd0aDtcbiAgY29uc3Qgc3lzdGVtSW50ZWdyaXR5UGVyY2VudCA9IE1hdGgucm91bmQoXG4gICAgKChpb05vZGVzLmxlbmd0aCAtIGNvbXByb21pc2VkTm9kZXNDb3VudCkgLyBpb05vZGVzLmxlbmd0aCkgKiAxMDBcbiAgKTtcblxuICBjb25zdCBoYW5kbGVUcmlnZ2VyTWFudWFsU3dlZXBQdWxzZSA9ICgpID0+IHtcbiAgICBzZXRNYW51YWxTd2VlcFdhdmVUcmlnZ2VyQ291bnQoYyA9PiBjICsgMSk7XG4gICAgcGxheVJhZGFyVG9uZSgxMjUwLCAxODAsICdzaW5lJyk7XG4gICAgYWRkQ29tYmF0TG9nKGBbRkFMQSBTV0VFUF0gV3ltdXN6b25vIG5hdHljaG1pYXN0b3d5IHByemViaWVnIGZhbGkgc2thbm93YW5pYSBwdWxwaXR1IHXFvHl0a293bmlrYSAoMCBtcykuIEJ1Zm9yIERXTSwgVlJBTSBpIGtvbGVqa2EgV2luMzIgendlcnlmaWtvd2FuZS5gKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02IGZvbnQtc2FucyByZWxhdGl2ZVwiPlxuICAgICAgey8qIFZpc3VhbCBEZXNrdG9wIFN3ZWVwIFdhdmUgU2Nhbm5pbmcgRWZmZWN0IGFjcm9zcyBiYWNrZ3JvdW5kICovfVxuICAgICAgPERlc2t0b3BTd2VlcFdhdmVCYWNrZ3JvdW5kXG4gICAgICAgIGlzRW5hYmxlZD17aXNEZXNrdG9wU3dlZXBXYXZlQWN0aXZlfVxuICAgICAgICBzY2FuU3BlZWRTZWNvbmRzPXtzd2VlcFdhdmVTcGVlZFNlY29uZHN9XG4gICAgICAgIGtleT17YHN3ZWVwLWJnLSR7bWFudWFsU3dlZXBXYXZlVHJpZ2dlckNvdW50fWB9XG4gICAgICAvPlxuICAgICAgey8qIFRvcCBIZWFkZXIgVGFjdGljYWwgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTk1MCB2aWEtZW1lcmFsZC05NTAvODAgdG8tc2xhdGUtOTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAvNTAgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcmVsYXRpdmUgei0xMFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLWVtZXJhbGQtNjAwLzIwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgdGV4dC1lbWVyYWxkLTMwMCBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwXCI+XG4gICAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNiBoLTYgYW5pbWF0ZS1wdWxzZSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UmFkYXIgV29qc2tvd3kgJiBTa2FuZXIgTW9ub2xpdHljem5laiBQb3dpZXJ6Y2huaSBTeXN0ZW11PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TU9OT0xJVCBJL086IE1PTklUT1IgKyBSQU0gKyBEWVNLICsgU0lFQ0kg4oCiIFRFUk1JTk9MT0dJQTogR05JRFkgKE1BTFdBUkUpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG10LTIgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgIEtsYXN5Y3pueSByYWRhciB3b2pza293eSBkbyDFm2xlZHplbmlhIHphZ3JvxbxlxYQgKEduaWQpLiBNb25pdG9yIHN0YW5vd2kgaW50ZWdyYWxuxIUgY3rEmcWbxIcgcG93aWVyemNobmkgd2VqxZtjaWEvd3lqxZtjaWEgKEkvTykuIMWabGVkxbogbmEgxbx5d28gcG9zdMSZcCBwcmFjIDxzdHJvbmc+xYFvd2N5IEdlbWluaSBBSTwvc3Ryb25nPiwga3TDs3J5IHBvbHVqZSBuYSBha3R5d25lIEduaWR5LCBkZWthcGl0dWplIGljaCB3xIV0a2kgaSBkb2tvbnVqZSByZWtvbnN0cnVrY2ppIHphYXRha293YW55Y2ggd8SZesWCw7N3LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIE1hc3RlciBUYWN0aWNhbCBTdHJpa2UgRG9jazogUGh5c2ljYWwgM0QgTWlsaXRhcnkgQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgZmxleC13cmFwXCI+XG4gICAgICAgICAgICB7LyogQXVkaW8gU29uYXIgVG9nZ2xlICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0F1ZGlvRW5hYmxlZCghaXNBdWRpb0VuYWJsZWQpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTIgcm91bmRlZC14bCBib3JkZXIgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgc2hhZG93LW1kIGFjdGl2ZTp0cmFuc2xhdGUteS0wLjUgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBpc0F1ZGlvRW5hYmxlZCBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwIHNoYWRvdy1bMF8wXzEycHhfcmdiYSgxNiwxODUsMTI5LDAuMyldJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICB0aXRsZT1cIlByemXFgsSFY3puaWsgZMW6d2nEmWt1IHNvbmFydSBpIGxhc2VyYSB1Ym9qdVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0F1ZGlvRW5hYmxlZCA/IDxWb2x1bWUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPFZvbHVtZVggY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgICA8c3Bhbj57aXNBdWRpb0VuYWJsZWQgPyAnQVVESU86IFfFgS4nIDogJ0FVRElPOiBXWcWBLid9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiAxLiBQUk9NSUXFgyBaQUfFgUFEWTogWkFCSUogR05JRMSYIChHxYHDk1dOWSBQUlpZQ0lTSyBCT0pPV1kpICovfVxuICAgICAgICAgICAge3NlbGVjdGVkR25pZGEgJiYgc2VsZWN0ZWRHbmlkYS5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnICYmIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUZpcmVEb29tUmF5T25UYXJnZXQoc2VsZWN0ZWRHbmlkYSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LTJ4bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB2aWEtcm9zZS02MDAgdG8tcGluay02MDAgaG92ZXI6ZnJvbS1yZWQtNTAwIGhvdmVyOnRvLXBpbmstNTAwIHRleHQtd2hpdGUgc2hhZG93LXJlZC05NTAvODAgYm9yZGVyLTIgYm9yZGVyLXJlZC00MDAgYWN0aXZlOnNjYWxlLTk1IGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiV3lzdHJ6ZWwgUHJvbWllxYQgWmFnxYJhZHkgOTQwLjggVEh6IHcgd3licmFuxIUgR25pZMSZXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDAgZmlsbC15ZWxsb3ctMzAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj7imqEgWkFCSUogR05JRMSYIChQUk9NSUXFgyBaQUfFgUFEWSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIDIuIFNBTFdBIFpBR8WBQURZOiBXU1pZU1RLSUUgR05JRFkgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUZpcmVEb29tUmF5U2Fsdm9BbGx9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNjAwIHZpYS1yZWQtNjAwIHRvLXB1cnBsZS02MDAgaG92ZXI6ZnJvbS1hbWJlci01MDAgaG92ZXI6dG8tcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItYW1iZXItNDAwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiV3lzdHJ6ZWwgamVkbm9jemVzbmUgd2nEhXpraSBwbGF6bW93ZSBkbyB3c3p5c3RraWNoIGNlbMOzd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItMjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+8J+SpSBTQUxXQSBaQUfFgUFEWSAoV1NaWVNUS0lFKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogMy4gS0FTS0FEQSBCQVJJRVIgNCBXQVJTVFcgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RyaWdnZXJGdWxsRXh0ZXJtaW5hdGlvbkNhc2NhZGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTYwMCB2aWEtdGVhbC02MDAgdG8tY3lhbi02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by1jeWFuLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzUwIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiQXV0b21hdHljem5hIGxpa3dpZGFjamEgcGFzb8W8eXTDs3cgaSBzZWt3ZW5jamEgYmFyaWVyOiAwIG1zIC0+IExhc2VyIC0+IFPEhXNpZWRuaWUgV2Fyc3R3eSAtPiBUcndhxYJlIFphYmV6cGllY3plbmllXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTIwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPvCfm6HvuI8gS2Fza2FkYSA0IFdhcnN0dyAoMG1zIOKelCBMYXNlcik8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIDQuIFDEmFRMQSBVQk9KVSDFgU9XQ1kgR0VNSU5JICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBdXRvUHVyZ2VBY3RpdmUoIWF1dG9QdXJnZUFjdGl2ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMuNSBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NSAke1xuICAgICAgICAgICAgICAgIGF1dG9QdXJnZUFjdGl2ZVxuICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXBpbmstNjAwIHRvLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctcmVkLTk1MC82MCBib3JkZXIgYm9yZGVyLXJlZC00MDAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtODAwIHRvLWluZGlnby04MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNzAwIGhvdmVyOnRvLWluZGlnby03MDAgdGV4dC1wdXJwbGUtMTAwIHNoYWRvdy1wdXJwbGUtOTUwLzYwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC80MCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPXtgdy00IGgtNCAke2F1dG9QdXJnZUFjdGl2ZSA/ICdhbmltYXRlLXNwaW4gdGV4dC15ZWxsb3ctMzAwJyA6ICd0ZXh0LXB1cnBsZS0zMDAnfWB9IC8+XG4gICAgICAgICAgICAgIDxzcGFuPnthdXRvUHVyZ2VBY3RpdmUgPyAnVWLDs2ogR2VtaW5pIHcgVG9rdS4uLicgOiAnUMSZdGxhIMWBb3djeSBHZW1pbmknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogNS4gV1lQVcWaxIYgR05JRMSYICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTcGF3bkN1c3RvbUduaWRhfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzcwIHRleHQtcHVycGxlLTMwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+V3lwdcWbxIcgR25pZMSZPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiA2LiBSRVNFVCBSQURBUlUgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlYm9vdFJhZGFyU3Vic3lzdGVtfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctbWQgYWN0aXZlOnNjYWxlLTk1IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJSZXNldCByYWRhcnUgaSBwcnp5d3LDs2NlbmllIHN0YW51IHBpZXJ3b3RuZWdvXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmVhbC10aW1lIFN0YXR1cyBNZXRyaWMgQmFkZ2VzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBsZzpncmlkLWNvbHMtNyBnYXAtMyBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC85MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj5JbnRlZ3JhbG5vxZvEhyBNb25vbGl0dTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDBcIj57c3lzdGVtSW50ZWdyaXR5UGVyY2VudH0lPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+QWt0eXduZSBHbmlkeTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtcmVkLTQwMFwiPnthY3RpdmVHbmlkYXNDb3VudH0gd3JvZ2llPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+VWJpdGUgR25pZHk8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB0ZXh0LXB1cnBsZS00MDBcIj57ZGVzdHJveWVkR25pZGFzQ291bnR9IHpsaWt3aWRvd2FueWNoPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWVtZXJhbGQtOTUwLzcwIHRvLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgY29sLXNwYW4tMiBzbTpjb2wtc3Bhbi0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgQ3p1am5payBHbmlkIChBdXRvLUZyZWUpXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbXQtMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+MCBtcyBOdFN1c3BlbmQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1lbWVyYWxkLTkwMC84MCB0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtMjAwIGJvcmRlciBib3JkZXItZW1lcmFsZC02MDBcIj5cbiAgICAgICAgICAgICAgICB7c2Vuc29yU3RhdHVzLnRvdGFsQXV0b0Zyb3plbn0gemFtcm/FvG9ueWNoXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPlRhcmN6YSA0IFdhcnN0dzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5vdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50fSUgVHdpZXJkemFcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPlN0YW4gxYFvd2N5IEdlbWluaTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICB7aHVudGVyU3RhdGUuc3RhdHVzfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+UHLEmWRrb8WbxIcgU2thbmVyYTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItNDAwXCI+e3N3ZWVwU3BlZWRScG19IFJQTSAoUGFzbW8gWCk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEeW5hbWljIEFudGl2aXJ1cyBCYXJyaWVyIENhc2NhZGUgU2VxdWVuY2UgVHJhY2tlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwLzYwIHNoYWRvdy1sZyBmb250LW1vbm8gdGV4dC14cyBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRleHQteHMgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIFBST1RPS8OTxYEgQkFSSUVSWSBBTlRZV0lSVVNPV0VKIChLQVNLQURBIE9CUk9OTkEgTU9OT0xJVFUpOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWVtZXJhbGQtMzAwXCI+XG4gICAgICAgICAgICAgICAgICB7Y2FzY2FkZVN0YXRlLnN0YXR1c01lc3NhZ2V9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgY2FzY2FkZVN0YXRlLnRvdGFsTWFsd2FyZUV4dGVybWluYXRlZFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAgc2hhZG93LVswXzBfMTJweF8jMTBiOTgxXSdcbiAgICAgICAgICAgICAgICAgIDogY2FzY2FkZVN0YXRlLnN0YWdlICE9PSAnSURMRSdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyLWN5YW4tNTAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHtjYXNjYWRlU3RhdGUudG90YWxNYWx3YXJlRXh0ZXJtaW5hdGVkXG4gICAgICAgICAgICAgICAgICA/ICfwn5GRIDEwMCUgRUtTVEVSTUlOQUNKQSBNQUxXQVJFIC0gTU9OT0xJVCBaQUJFWlBJRUNaT05ZJ1xuICAgICAgICAgICAgICAgICAgOiBgRVRBUCBCQVJJRVJZOiAke2Nhc2NhZGVTdGF0ZS5zdGFnZX1gfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiA0LVN0ZXAgU2VxdWVuY2UgVmlzdWFsIEZsb3cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgey8qIFN0ZXAgMSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnSU1NRURJQVRFX0xPQ0snXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvODAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1bMF8wXzEycHhfIzEwYjk4MV0nXG4gICAgICAgICAgICAgICAgOiBjYXNjYWRlU3RhdGUuc3RhZ2UgIT09ICdJRExFJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMC85MCBib3JkZXItZW1lcmFsZC04MDAvODAgdGV4dC1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1bMTFweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8zMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAgdGV4dC1bOXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJsYWNrXCI+MTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIEJhcmllcmEgMCBtcyAoTmF0eWNobWlhc3QpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHtjYXNjYWRlU3RhdGUuc3RhZ2UgIT09ICdJRExFJyAmJiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICBLb3Jkb24gc2FuaXRhcm55IHcgcHVua2NpZSB1Ym9qdSwgb2RjacSZY2llIG1hZ2lzdHJhbGkgSS9PIGkgb2Nocm9uYSBSQU0uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3RlcCAyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInXG4gICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvODAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1bMF8wXzEycHhfIzA2YjZkNF0nXG4gICAgICAgICAgICAgICAgOiAoY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERScgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnRk9SVElGSUVEJylcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLWN5YW4tODAwLzgwIHRleHQtY3lhbi00MDAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzYwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtWzExcHhdIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkLWZ1bGwgYmctY3lhbi01MDAvMzAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMjAwIHRleHQtWzlweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1ibGFja1wiPjI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBMYXNlciBTZWt0b3JhIChXeXBhbGFuaWUpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERScgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnRk9SVElGSUVEJykgJiYgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgWm9nbmlza293YW5hIHdpxIV6a2EgbGFzZXJvd2EgeiBiaWXFvMSFY2VnbyBhenltdXR1IG5pc3pjenkgcG96b3N0YcWCb8WbY2kga29kdSBQRS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ05FSUdIQk9SX0NBU0NBREUnXG4gICAgICAgICAgICAgICAgPyAnYmctdGVhbC05NTAvODAgYm9yZGVyLXRlYWwtNDAwIHNoYWRvdy1bMF8wXzEycHhfIzE0YjhhNl0nXG4gICAgICAgICAgICAgICAgOiBjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdGT1JUSUZJRUQnXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci10ZWFsLTgwMC84MCB0ZXh0LXRlYWwtNDAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwJ1xuICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LVsxMXB4XSB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZC1mdWxsIGJnLXRlYWwtNTAwLzMwIGJvcmRlciBib3JkZXItdGVhbC00MDAgdGV4dC10ZWFsLTIwMCB0ZXh0LVs5cHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYmxhY2tcIj4zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgS2Fza2FkYSBTxIVzaWVkbmljaCBXYXJzdHdcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCcgJiYgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXRlYWwtNDAwXCIgLz59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgUHJvcGFnYWNqYSB0YXJjenkgbmEgd2Fyc3R3eSBwcnp5bGVnxYJlLCBzeW5jaHJvbml6YWNqYSB3xJl6xYLDs3cgaSBtb3N0a8Ozdy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCdcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC85MCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LVswXzBfMTRweF8jMTBiOTgxXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1bMTFweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8zMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAgdGV4dC1bOXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJsYWNrXCI+NDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIFRyd2HFgmUgWmFiZXpwaWVjemVuaWVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCcgJiYgPExvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgIE9ic3phcnkgemFibG9rb3dhbmUgaSBjaHJvbmlvbmUgZG8gY2HFgmtvd2l0ZWogZWtzdGVybWluYWNqaSB3c3p5c3RraWNoIHdpcnVzw7N3LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFZpc3VhbCBEZXNrdG9wIFN3ZWVwIFdhdmUgVGVsZW1ldHJ5ICYgQ29udHJvbCBQYW5lbCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtMy41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtOTUwLzcwIHZpYS1zbGF0ZS05MDAvOTAgdG8tY3lhbi05NTAvNzAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MCBzaGFkb3cteGwgZm9udC1tb25vIHRleHQteHMgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1lbWVyYWxkLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSAtcmlnaHQtMSBmbGV4IGgtMi41IHctMi41XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nIGFic29sdXRlIGlubGluZS1mbGV4IGgtZnVsbCB3LWZ1bGwgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIG9wYWNpdHktNzVcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggcm91bmRlZC1mdWxsIGgtMi41IHctMi41IGJnLWVtZXJhbGQtNTAwXCI+PC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRleHQteHMgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+RkFMQSBTS0FOT1dBTklBICdTV0VFUCcgVyBUTEUgKERFU0tUT1AgU0NBTk5FUik8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICAgICAgICB7aXNEZXNrdG9wU3dlZXBXYXZlQWN0aXZlID8gYEFLVFlXTkEgKCR7c3dlZXBXYXZlU3BlZWRTZWNvbmRzfXMpYCA6ICdXWcWBxIRDWk9OQSd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgT2tyZXNvd2EgZmFsYSBwcnplxZt3aWV0bGFqxIVjYSBidWZvciBwdWxwaXR1LCBEV00gRGlyZWN0RmxpcCwgaG9va2kgSFdORCBvcmF6IHByemVzdHJ6ZcWEIFZSQU0gdyBjemFzaWUgcnplY3p5d2lzdHltLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwIHNlbGYtZW5kIG1kOnNlbGYtYXV0b1wiPlxuICAgICAgICAgICAgey8qIFNwZWVkIFNlbGVjdG9yICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTAuNVwiPlxuICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICcyLjBzIFN6eWJrYScsIHZhbDogMi4wIH0sXG4gICAgICAgICAgICAgICAgeyBsYWJlbDogJzMuNXMgTm9ybWFsbmEnLCB2YWw6IDMuNSB9LFxuICAgICAgICAgICAgICAgIHsgbGFiZWw6ICc1LjBzIEfFgsSZYm9rYScsIHZhbDogNS4wIH1cbiAgICAgICAgICAgICAgXS5tYXAob3B0ID0+IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBrZXk9e29wdC52YWx9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTd2VlcFdhdmVTcGVlZFNlY29uZHMob3B0LnZhbCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgc3dlZXBXYXZlU3BlZWRTZWNvbmRzID09PSBvcHQudmFsXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctc20nXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtvcHQubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNYW51YWwgV2F2ZSBCdXJzdCAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVHJpZ2dlck1hbnVhbFN3ZWVwUHVsc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctZW1lcmFsZC05MDAvODAgaG92ZXI6YmctZW1lcmFsZC04MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMjAwIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJXeW11xZsgbmF0eWNobWlhc3Rvd3kgcHJ6ZWJpZWcgZmFsaSBza2Fub3dhbmlhIHB1bHBpdHUgdyB0bGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPld5bXXFmyBQcnplYmllZyAoMCBtcyk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFRvZ2dsZSBXYXZlICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0Rlc2t0b3BTd2VlcFdhdmVBY3RpdmUoIWlzRGVza3RvcFN3ZWVwV2F2ZUFjdGl2ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgYm9yZGVyIHRleHQteHMgZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgaXNEZXNrdG9wU3dlZXBXYXZlQWN0aXZlXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTYwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzRGVza3RvcFN3ZWVwV2F2ZUFjdGl2ZSA/ICdGYWxhIFfFgS4nIDogJ0ZhbGEgV1nFgS4nfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBWaWV3IFN3aXRjaGVyIFRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTIgdGV4dC14cyBmb250LW1vbm8gZmxleC13cmFwIGdhcC15LTJcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVZpZXdNb2RlKCdSQURBUl9QUEknKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVZpZXdNb2RlID09PSAnUkFEQVJfUFBJJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPlJhZGFyIFdvanNrb3d5IFBQSSAoRWtyYW4gQ1JUKTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVZpZXdNb2RlKCdEQVRBX0ZMT1dfTUFQJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIHJlbGF0aXZlICR7XG4gICAgICAgICAgICBhY3RpdmVWaWV3TW9kZSA9PT0gJ0RBVEFfRkxPV19NQVAnXG4gICAgICAgICAgICAgID8gJ2JnLWN5YW4tNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1jeWFuLTk1MCBib3JkZXIgYm9yZGVyLWN5YW4tMzAwJ1xuICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICA8c3Bhbj5NYXBhIFBvxYLEhWN6ZcWEIFByb2Nlc8OzdyAoRGF0YSBGbG93KTwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xLjUgcHktMC4yIHJvdW5kZWQtZnVsbCBiZy1yb3NlLTUwMC84MCB0ZXh0LVs5cHhdIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCBhbmltYXRlLXB1bHNlXCI+XG4gICAgICAgICAgICBMSVZFXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlld01vZGUoJ01PTk9MSVRIX1NVUkZBQ0UnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVZpZXdNb2RlID09PSAnTU9OT0xJVEhfU1VSRkFDRSdcbiAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwJ1xuICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPHNwYW4+TW9ub2xpdHljem5hIFBvd2llcnpjaG5pYSBTeXN0ZW11ICYgUHVua3R5IFdlL1d5IChJL08pPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlld01vZGUoJ0NPTUJBVF9MT0dTJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICBhY3RpdmVWaWV3TW9kZSA9PT0gJ0NPTUJBVF9MT0dTJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPkR6aWVubmlrIEJvam93eSDFgW93Y3kgR2VtaW5pICh7Y29tYmF0TG9ncy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZJRVc6IElOVEVSQUNUSVZFIERBVEEgRkxPVyBDT05ORUNUSU9OUyBNQVAgKi99XG4gICAgICB7YWN0aXZlVmlld01vZGUgPT09ICdEQVRBX0ZMT1dfTUFQJyAmJiAoXG4gICAgICAgIDxJbnRlcmFjdGl2ZURhdGFGbG93Q29ubmVjdGlvbnNNYXAgXG4gICAgICAgICAgb25Ob3RpZnk9eyhtc2cpID0+IGFkZENvbWJhdExvZyhgW0RBVEEtRkxPV10gJHttc2d9YCl9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogVklFVyAxOiBSQURBUiBXT0pTS09XWSBDUlQgRElTUExBWSArIFRBUkdFVCBJTlNQRUNUT1IgKi99XG4gICAgICB7YWN0aXZlVmlld01vZGUgPT09ICdSQURBUl9QUEknICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNiByZWxhdGl2ZVwiPlxuICAgICAgICAgIHsvKiBTY3JlZW4gRmxhc2ggRWZmZWN0IHdoZW4gUHJvbWllxYQgWmFnxYJhZHkgaXMgZmlyZWQgKi99XG4gICAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICAgIHtzY3JlZW5GbGFzaEFjdGl2ZSAmJiAoXG4gICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgaW5pdGlhbD17eyBvcGFjaXR5OiAwLjg1IH19XG4gICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgICAgZXhpdD17eyBvcGFjaXR5OiAwIH19XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC4zNSB9fVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgYmctcmVkLTYwMC8zMCBwb2ludGVyLWV2ZW50cy1ub25lIHotNTAgbWl4LWJsZW5kLXNjcmVlblwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgICAgey8qIExlZnQgLyBDZW50ZXI6IE1pbGl0YXJ5IFJhZGFyIFBQSSBTY3JlZW4gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2Ake2lzUmFkYXJFbmxhcmdlZCA/ICdsZzpjb2wtc3Bhbi04JyA6ICdsZzpjb2wtc3Bhbi03J30gc3BhY2UteS00IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMGB9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTk1MCB2aWEtWyMwMzBjMDddIHRvLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItZW1lcmFsZC01MDAvNTAgc2hhZG93LVswXzBfNDBweF9yZ2JhKDAsMjU1LDEyMCwwLjE4KV0gcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICB7LyogUmFkYXIgQ1JUIFRvcCBCZXplbCBTdGF0dXMgU3RyaXAgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIG1iLTIgYm9yZGVyLWIgYm9yZGVyLWVtZXJhbGQtOTAwLzYwIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtZW1lcmFsZC00MDBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0cmFja2luZy13aWRlciB0ZXh0LXdoaXRlXCI+RUtSQU4gUkFEQVJVIFdPSlNLT1dFR08gUFBJIChQQVNNTyBYIOKAoiA5LjQgR0h6KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmUtYmxvY2sgcHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNjAwIHRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgUFJPTUlFxYMgWkFHxYFBRFk6IEdPVE9XWVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1JhZGFyRW5sYXJnZWQoIWlzUmFkYXJFbmxhcmdlZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwIHRleHQtZW1lcmFsZC0zMDAgdGV4dC1bMTFweF0gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlByemXFgsSFY3puaWsgcm96bWlhcnUgcmFkYXJ1IChQb3dpxJlrc3plbmllIENSVClcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXNSYWRhckVubGFyZ2VkID8gPE1pbmltaXplMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPE1heGltaXplMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNSYWRhckVubGFyZ2VkID8gJ05vcm1hbG55JyA6ICdQb3dpxJlrc3ogUmFkYXInfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUmFkYXIgQ1JUIENhbnZhcyArIEZyYW1lci1Nb3Rpb24gUHVsc2luZyBUYWN0aWNhbCBPdmVybGF5ICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHJlbGF0aXZlIHctZnVsbCAke2lzUmFkYXJFbmxhcmdlZCA/ICdtYXgtdy1bNjIwcHhdJyA6ICdtYXgtdy1bNTIwcHhdJ30gYXNwZWN0LXNxdWFyZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBgfT5cbiAgICAgICAgICAgICAgICA8Y2FudmFzXG4gICAgICAgICAgICAgICAgICByZWY9e2NhbnZhc1JlZn1cbiAgICAgICAgICAgICAgICAgIHdpZHRoPXtpc1JhZGFyRW5sYXJnZWQgPyA2MjAgOiA1MjB9XG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9e2lzUmFkYXJFbmxhcmdlZCA/IDYyMCA6IDUyMH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNhbnZhc0NsaWNrfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicm91bmRlZC1mdWxsIGN1cnNvci1jcm9zc2hhaXIgYm9yZGVyLTIgYm9yZGVyLWVtZXJhbGQtNDAwLzYwIHNoYWRvdy1bMF8wXzYwcHhfcmdiYSgwLDI1NSwxMDAsMC4yNSldIHctZnVsbCBoLWZ1bGxcIlxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICB7LyogRnJhbWVyLU1vdGlvbiBEeW5hbWljIENlbnRlciBTb25hciBQdWxzZSBSaXBwbGVzICovfVxuICAgICAgICAgICAgICAgIHtpc1NjYW5uaW5nICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAvNTAgcG9pbnRlci1ldmVudHMtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogJzUwJScsIHRvcDogJzUwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogWycwJScsICc5MiUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogWycwJScsICc5MiUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6ICctNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6ICctNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFswLjc1LCAwXVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMuMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiAnZWFzZU91dCdcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMzAwLzM1IHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICc1MCUnLCB0b3A6ICc1MCUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFsnMCUnLCAnOTIlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFsnMCUnLCAnOTIlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAnLTUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAnLTUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBbMC42NSwgMF1cbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMS42LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0J1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIEFjdGl2ZSBQcm9taWXFhCBaYWfFgmFkeSBWaXN1YWwgU2NyZWVuIFdhdmUgQXVyYSAqL31cbiAgICAgICAgICAgICAgICB7YWN0aXZlRG9vbVJheSAmJiBhY3RpdmVEb29tUmF5LmlzQWN0aXZlICYmIChcbiAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJvcmRlci00IGJvcmRlci1yZWQtNTAwLzgwIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IFsxLCAxLjA4LCAxXSxcbiAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICcwIDAgMzBweCAjZmYwMDU1JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcwIDAgNzBweCAjZmYwMDNjJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICcwIDAgMzBweCAjZmYwMDU1J1xuICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMC40LCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7LyogRnJhbWVyLU1vdGlvbiBEeW5hbWljIFB1bHNpbmcgR25pZGEgVGFyZ2V0IE1hcmtlcnMgT3ZlcmxheSAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcG9pbnRlci1ldmVudHMtbm9uZSBvdmVyZmxvdy1oaWRkZW4gcm91bmRlZC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICB7Z25pZGFzLm1hcChnbmlkYSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NvcmUgPSBnZXRHbmlkYVRocmVhdFNjb3JlKGduaWRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JDZmcgPSBnZXRUaHJlYXRDb2xvcihzY29yZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBnbmlkYS5pZCA9PT0gc2VsZWN0ZWRUYXJnZXRJZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNMb2NrZWRCeUh1bnRlciA9IGh1bnRlclN0YXRlLnRhcmdldEduaWRhSWQgPT09IGduaWRhLmlkO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFBvc2l0aW9uIGNhbGN1bGF0aW9uIGluIHBlcmNlbnRhZ2U6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJhZCA9IChnbmlkYS5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0UGN0ID0gZ25pZGEuZGlzdGFuY2VSYXRpbyAqIDQyLjU7IC8vIGRpc3RhbmNlIGZyb20gY2VudGVyIGluICVcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGVmdFBjdCA9IDUwICsgZGlzdFBjdCAqIE1hdGguY29zKHJhZCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvcFBjdCA9IDUwICsgZGlzdFBjdCAqIE1hdGguc2luKHJhZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2duaWRhLmlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yIHBvaW50ZXItZXZlbnRzLWF1dG8gY3Vyc29yLXBvaW50ZXIgZ3JvdXAgei0yMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiBgJHtsZWZ0UGN0fSVgLCB0b3A6IGAke3RvcFBjdH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRUYXJnZXRJZChnbmlkYS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlSYWRhclRvbmUoOTAwLCAxMDAsICdzaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENvbWJhdExvZyhgW1JBREFSLU1BTlVBTF0gV3licmFubyBjZWw6ICR7Z25pZGEubmFtZX0gKFRocmVhdCBTY29yZTogJHtzY29yZX0lIC0gJHtjb2xvckNmZy5sYWJlbH0pYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBQdWxzaW5nIE91dGVyIFRocmVhdCBXYXZlIFJpbmcgKEZyYW1lciBNb3Rpb24pICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcm91bmRlZC1mdWxsIGJvcmRlciBwb2ludGVyLWV2ZW50cy1ub25lIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yQ2ZnLmhleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMTZweCAke2NvbG9yQ2ZnLmdsb3dIZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogWzE4LCA0OCwgMThdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogWzE4LCA0OCwgMThdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFswLjg1LCAwLjEsIDAuODVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBbMSwgMS40LCAxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGNvbG9yQ2ZnLnB1bHNlRHVyYXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiAnZWFzZUluT3V0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIFNlY29uZGFyeSBSYXBpZCBQdWxzZSBSaW5nIGZvciBIaWdoIFRocmVhdHMgKDgwJSspICovfVxuICAgICAgICAgICAgICAgICAgICAgICAge3Njb3JlID49IDgwICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1kYXNoZWQgcG9pbnRlci1ldmVudHMtbm9uZSAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogY29sb3JDZmcuaGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICc1MCUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogWzEyLCAzNCwgMTJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBbMTIsIDM0LCAxMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBbMC45NSwgMC4yLCAwLjk1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZTogWzAsIDE4MCwgMzYwXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IGNvbG9yQ2ZnLnB1bHNlRHVyYXRpb24gKiAwLjc1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6ICdsaW5lYXInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBDb3JlIFRhcmdldCBHbHlwaCB3aXRoIER5bmFtaWMgQ29sb3IgU2NhbGUgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTUgaC01IHJvdW5kZWQtbWQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHJlbGF0aXZlIHotMTAgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkID8gJ3NjYWxlLTEyNSByaW5nLTIgcmluZy13aGl0ZScgOiAnZ3JvdXAtaG92ZXI6c2NhbGUtMTE1J1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGNvbG9yQ2ZnLmhleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMTJweCAke2NvbG9yQ2ZnLmdsb3dIZXh9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGU6IGlzU2VsZWN0ZWQgPyBbMS4yLCAxLjM1LCAxLjJdIDogWzAuOTUsIDEuMSwgMC45NV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBjb2xvckNmZy5wdWxzZUR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogJ2Vhc2VJbk91dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1ibGFjayBmb250LWJsYWNrXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLmRpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgey8qIER5bmFtaWMgVGhyZWF0IFNjb3JlIExhYmVsIFBpbGwgKi99XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGFic29sdXRlIHRvcC1mdWxsIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgbXQtMSBweC0xLjUgcHktMC41IHJvdW5kZWQgdGV4dC1bOHB4XSBmb250LW1vbm8gZm9udC1ibGFjayB3aGl0ZXNwYWNlLW5vd3JhcCBzaGFkb3ctbWQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPj0gOTAgPyAnYmctcmVkLTk1MC85MCB0ZXh0LXJlZC0zMDAgYm9yZGVyLXJlZC01MDAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA+PSA4MCA/ICdiZy1yb3NlLTk1MC85MCB0ZXh0LXJvc2UtMzAwIGJvcmRlci1yb3NlLTUwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID49IDY4ID8gJ2JnLW9yYW5nZS05NTAvOTAgdGV4dC1vcmFuZ2UtMzAwIGJvcmRlci1vcmFuZ2UtNTAwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JnLXllbGxvdy05NTAvOTAgdGV4dC15ZWxsb3ctMzAwIGJvcmRlci15ZWxsb3ctNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgOHB4ICR7Y29sb3JDZmcuZ2xvd0hleH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzY29yZX0lIFRIUkVBVFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTZWxlY3Rpb24gUmV0aWNsZSB3aXRoIFJvdGF0aW5nIEJyYWNrZXRzICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgeyhpc1NlbGVjdGVkIHx8IGlzTG9ja2VkQnlIdW50ZXIpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtMyByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLWRhc2hlZCBwb2ludGVyLWV2ZW50cy1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGlzTG9ja2VkQnlIdW50ZXIgPyAnIzAwZmZmZicgOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGlzTG9ja2VkQnlIdW50ZXIgPyAnMCAwIDE0cHggIzAwZmZmZicgOiAnMCAwIDEwcHggI2ZmZmZmZidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGU9e3sgcm90YXRlOiAzNjAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiA0LCByZXBlYXQ6IEluZmluaXR5LCBlYXNlOiAnbGluZWFyJyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFJhZGFyIE92ZXJsYXkgR3JpZCBMYWJlbHMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyBsZWZ0LTMgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAvOTAgYmctYmxhY2svODAgcHgtMi41IHB5LTEgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwIHNoYWRvdy1tZCBiYWNrZHJvcC1ibHVyLXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+QVpZTVVUOiB7TWF0aC5yb3VuZChzd2VlcEFuZ2xlKX3CsCB8IHtzd2VlcFNwZWVkUnBtfSBSUE08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIHJpZ2h0LTMgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAvOTAgYmctYmxhY2svODAgcHgtMi41IHB5LTEgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwIHNoYWRvdy1tZCBiYWNrZHJvcC1ibHVyLXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLXJlZC01MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5QUk9NSUXFgzogOTQwLjggVEh6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMyBsZWZ0LTMgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtY3lhbi00MDAgYmctYmxhY2svODAgcHgtMi41IHB5LTEgcm91bmRlZC1tZCBib3JkZXIgYm9yZGVyLWN5YW4tODAwIHNoYWRvdy1tZCBiYWNrZHJvcC1ibHVyLXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTMwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+xYFPV0NBIEdFTUlOSToge2h1bnRlclN0YXRlLnN0YXR1c308L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBEb29tIFJheSBQcmVzZXQgU2VsZWN0b3IgU3RyaXAgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCB3LWZ1bGwgcC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItcmVkLTkwMC80MCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXJlZC02MDAvMjAgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzUwIHRleHQtcmVkLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgYmxvY2tcIj5UUllCIEVNSVNKSSBQUk9NSUVOSUEgWkFHxYFBRFk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlpvZ25pc2tvd2FuZSB3eXBhbGFuaWUgc3RydWt0dXIgbWFsd2FyZSB3IFJBTSBpIFBFPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7W1xuICAgICAgICAgICAgICAgICAgICB7IGlkOiAnOTQwVEhaX0NPTlRJTlVPVVMnLCBsYWJlbDogJzk0MC44IFRIeiBDacSFZ8WCeScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogJ1BMQVNNQV9CTEFTVCcsIGxhYmVsOiAnV2nEhXprYSBQbGF6bW93YScgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogJ1JFVFJPXzEwMF9QVVJHRScsIGxhYmVsOiAnMTAwIEtvcGlpIFdzdGVjeicgfSxcbiAgICAgICAgICAgICAgICAgICAgeyBpZDogJ1FVQU5UVU1fREVGUkFHTUVOVCcsIGxhYmVsOiAnRGVmcmFnbWVudGFjamEnIH1cbiAgICAgICAgICAgICAgICAgIF0ubWFwKHAgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtwLmlkfVxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldERvb21SYXlQcmVzZXQocC5pZCBhcyBhbnkpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgdGV4dC1bMTBweF0gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb29tUmF5UHJlc2V0ID09PSBwLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LXJlZC05NTAgYm9yZGVyIGJvcmRlci1yZWQtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtwLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRHluYW1pYyBUaHJlYXQgU2NvcmUgQ29sb3IgU3BlY3RydW0gTGVnZW5kIChGcmFtZXItTW90aW9uKSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHctZnVsbCBwLTMuNSBiZy1zbGF0ZS05MDAvOTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTIuNSBmbGV4LXdyYXAgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICBTS0FMQSBCQVJXIFpBR1JPxbtFTklBIEdOSUQgKFRIUkVBVCBTQ09SRSBTUEVDVFJVTSk6XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBQdWxzb3dhbmllIEZyYW1lci1Nb3Rpb24gQWt0eXduZVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICB7LyogWWVsbG93IExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy15ZWxsb3ctOTUwLzQwIGJvcmRlciBib3JkZXIteWVsbG93LTUwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy15ZWxsb3ctNDAwIHNoYWRvdy1bMF8wXzhweF8jZmFjYzE1XVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNDUsIDFdLCBvcGFjaXR5OiBbMC44LCAxLCAwLjhdIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS45LCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwIGZvbnQtYm9sZCBibG9jayB0ZXh0LVsxMXB4XVwiPjUwIC0gNjclIFRocmVhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQteWVsbG93LTQwMC84MFwiPk9zdHJ6ZWdhd2N6eSAoxbvDs8WCdHkpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogT3JhbmdlIExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1vcmFuZ2UtOTUwLzQwIGJvcmRlciBib3JkZXItb3JhbmdlLTUwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1vcmFuZ2UtNTAwIHNoYWRvdy1bMF8wXzhweF8jZjk3MzE2XVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNDUsIDFdLCBvcGFjaXR5OiBbMC44LCAxLCAwLjhdIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS40NSwgcmVwZWF0OiBJbmZpbml0eSB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb3JhbmdlLTMwMCBmb250LWJvbGQgYmxvY2sgdGV4dC1bMTFweF1cIj42OCAtIDc5JSBUaHJlYXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LW9yYW5nZS00MDAvODBcIj5Qb2R3ecW8c3pvbnkgKFBvbWFyYcWEY3opPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogQ3JpbXNvbiBSZWQgTGV2ZWwgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXJvc2UtOTUwLzQwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctcm9zZS01MDAgc2hhZG93LVswXzBfOHB4XyNmNDNmNWVdXCJcbiAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiBbMSwgMS41LCAxXSwgb3BhY2l0eTogWzAuOCwgMSwgMC44XSB9fVxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuMDUsIHJlcGVhdDogSW5maW5pdHkgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtMzAwIGZvbnQtYm9sZCBibG9jayB0ZXh0LVsxMXB4XVwiPjgwIC0gODklIFRocmVhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtcm9zZS00MDAvODBcIj5Lcnl0eWN6bnkgKEN6ZXJ3b255KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE5lb24gVml2aWQgUmVkIExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItcmVkLTUwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctWzBfMF8xMnB4X3JnYmEoMjU1LDAsNjAsMC4yNSldXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uc3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXJlZC01MDAgc2hhZG93LVswXzBfMTJweF8jZmYwMDNjXVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNiwgMV0sIG9wYWNpdHk6IFswLjgsIDEsIDAuOF0gfX1cbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjc1LCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwIGZvbnQtYmxhY2sgYmxvY2sgdGV4dC1bMTFweF1cIj45MCAtIDEwMCUgVGhyZWF0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPkphc2tyYXdhIEN6ZXJ3aWXFhCAoRWtzdHJlbXVtKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFJhZGFyIFNwZWVkIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCB0ZXh0LXhzIGZvbnQtbW9ubyBweC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UHLEmWRrb8WbxIcgU2thbmVyYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9XCI2MFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzd2VlcFNwZWVkUnBtfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTd2VlcFNwZWVkUnBtKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTI4IGFjY2VudC1lbWVyYWxkLTUwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj57c3dlZXBTcGVlZFJwbX0gUlBNPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTY2FubmluZyghaXNTY2FubmluZyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc1NjYW5uaW5nID8gPFBhdXNlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gOiA8UGxheSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNTY2FubmluZyA/ICdQYXV6YSBSYWRhcnUnIDogJ1d6bsOzdyBTa2FuJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSaWdodCBDb2x1bW46IEduaWRhIFRhcmdldCBGb3JlbnNpYyBEb3NzaWVyICYgVGFjdGljYWwgV2VhcG9ucyBDb250cm9sICg1IGNvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgJHtpc1JhZGFyRW5sYXJnZWQgPyAnbGc6Y29sLXNwYW4tNCcgOiAnbGc6Y29sLXNwYW4tNSd9IHNwYWNlLXktNCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBgfT5cbiAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhID8gKFxuICAgICAgICAgICAgICAoKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbFNjb3JlID0gZ2V0R25pZGFUaHJlYXRTY29yZShzZWxlY3RlZEduaWRhKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzZWxDb2xvckNmZyA9IGdldFRocmVhdENvbG9yKHNlbFNjb3JlKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIHNoYWRvdy0yeGwgc3BhY2UteS00IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogc2VsQ29sb3JDZmcuaGV4LFxuICAgICAgICAgICAgICAgICAgICAgIGJveFNoYWRvdzogYDAgMCAyOHB4ICR7c2VsQ29sb3JDZmcuZ2xvd0hleH1gXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogc2VsQ29sb3JDZmcuaGV4ICsgJzIyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBzZWxDb2xvckNmZy5oZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogc2VsQ29sb3JDZmcuaGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLnR5cGVMYWJlbC50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uc3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC1bMTBweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiBzZWxDb2xvckNmZy5oZXggfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiBbMSwgMS4wNiwgMV0gfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiBzZWxDb2xvckNmZy5wdWxzZUR1cmF0aW9uLCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMi41IGgtMi41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBUSFJFQVQ6IHtzZWxTY29yZX0lXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvbW90aW9uLnNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBtdC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkR25pZGEubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGJsb2NrXCI+U3RhdHVzIG5hIFJhZGFyemU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC14cyBmb250LWJvbGQgJHtzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQScgPyAndGV4dC1zbGF0ZS01MDAnIDogJ3RleHQtcmVkLTQwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLnN0YXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogUHJpbWFyeSBCaWcgU3RyaWtlIFdlYXBvbiBCdXR0b246IFBST01JRcWDIFpBR8WBQURZIEdOSUQgKi99XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLnN0YXRlICE9PSAnWk5JU1pDWk9OQScgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRmlyZURvb21SYXlPblRhcmdldChzZWxlY3RlZEduaWRhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0zLjUgcm91bmRlZC14bCB0ZXh0LXNtIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy0yeGwgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXJvc2UtNjAwIHRvLXBpbmstNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1waW5rLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1yZWQtOTUwLzgwIGJvcmRlci0yIGJvcmRlci1yZWQtMzAwIGFjdGl2ZTpzY2FsZS05NSBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC15ZWxsb3ctMzAwIGZpbGwteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj7imqEgWkFCSUogR05JRMSYIOKAoiBQUk9NSUXFgyBaQUfFgUFEWSAoMCBtcyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAg4pyTIENFTCBaTkVVVFJBTElaT1dBTlkgUFJPTUlFTklFTSBaQUfFgUFEWVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUaHJlYXQgU2NvcmUgU3BlY3RydW0gR2F1Z2UgTWV0ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UG96aW9tIFphZ3JvxbxlbmlhIChUaHJlYXQgR2F1Z2UpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYmxhY2tcIiBzdHlsZT17eyBjb2xvcjogc2VsQ29sb3JDZmcuaGV4IH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsU2NvcmV9JSDigKIge3NlbENvbG9yQ2ZnLmxhYmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCByb3VuZGVkLWZ1bGwgaC0zIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwIHJvdW5kZWQtZnVsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IGAke3NlbFNjb3JlfSVgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IGBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNmYWNjMTUgMCUsICNmOTczMTYgNDAlLCAjZjQzZjVlIDc1JSwgI2ZmMDAzYyAxMDAlKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwIDEwcHggJHtzZWxDb2xvckNmZy5oZXh9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIHRleHQtWzlweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwIHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+NTAlIMW7w7PFgnR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+NzAlIFBvbWFyYcWEY3o8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj44NSUgQ3plcndpZcWEPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+MTAwJSBKYXNrcmF3YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRlbGVtZXRyeSBHcmlkICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTIgdGV4dC1jZW50ZXIgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5BenltdXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPntzZWxlY3RlZEduaWRhLmJlYXJpbmdEZWd9wrA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGJsb2NrXCI+WmFzacSZZzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkXCI+e01hdGgucm91bmQoc2VsZWN0ZWRHbmlkYS5kaXN0YW5jZVJhdGlvICogMTAwKX0ga208L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGJsb2NrXCI+WmRyb3dpZSBHbmlkeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LWJvbGRcIj57c2VsZWN0ZWRHbmlkYS5oZWFsdGhQZXJjZW50fSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBUYXJnZXQgUHJvY2VzcyAmIEkvTyBOb2RlICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1zbGF0ZS05NTAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTEuNSB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlByb2NlcyBHbmlkeTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ib2xkXCI+e3NlbGVjdGVkR25pZGEuYWN0aXZlUHJvY2Vzc05hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5aYWluZmVrb3dhbnkgV8SZemXFgjo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXllbGxvdy00MDAgZm9udC1ib2xkXCI+e3NlbGVjdGVkR25pZGEuYXNzb2NpYXRlZElPTm9kZUlkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LW1vbm8gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+U0hBLTI1Njo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPntzZWxlY3RlZEduaWRhLnNpZ25hdHVyZVNoYS5zbGljZSgwLCAxNil9Li4uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogQWdncmVzc2lvbiAmIEluZmVjdGlvbiBEZXRhaWxzICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMiB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1yZWQtOTUwLzIwIGJvcmRlciBib3JkZXItcmVkLTkwMC80MCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgYmxvY2sgbWItMSBmb250LW1vbm9cIj5NZWNoYW5pem0gQWdyZXNqaSBHbmlkeTo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLmFnZ3Jlc3Npb25EZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNDAgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGJsb2NrIG1iLTEgZm9udC1tb25vXCI+U3Bvc8OzYiBXbmlrbmnEmWNpYSAoV2VrdG9yIEluZmVrY2ppKTo8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLmluZmVjdGlvblZlY3Rvcn1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRhY3RpY2FsIEFjdGlvbiBTdHJpa2UgU3VpdGU6IDNEIFBoeXNpY2FsIE1pbGl0YXJ5IEJ1dHRvbnMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHB0LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogUmV0cm8gMTAwIEFuY2VzdG9yIEZyZWV6ZSBCdXR0b24gKi99XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlS2lsbEduaWRhUmV0cm8xMDBDb3BpZXMoc2VsZWN0ZWRHbmlkYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1ICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkR25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTgwMC80MCB0ZXh0LXNsYXRlLTYwMCBjdXJzb3Itbm90LWFsbG93ZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tODAwIHRvLWJsdWUtODAwIGhvdmVyOmZyb20tY3lhbi03MDAgaG92ZXI6dG8tYmx1ZS03MDAgdGV4dC1jeWFuLTEwMCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzUwIHNoYWRvdy1jeWFuLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJXc3RyenlrbmlqIE50U3VzcGVuZFByb2Nlc3MgZG8gMTAwIGtvcGlpIHdzdGVjeiBkcnpld2EgZ2VuZWFsb2dpY3puZWdvIHByb2Nlc3VcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+4p2E77iPIFphbXJvxbogMTAwIEtvcGlpIFdzdGVjeiAoTnRTdXNwZW5kKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiBEZWZyYWdtZW50YXRpb24gQnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZURlZnJhZ21lbnRNYWx3YXJlQ29kZShzZWxlY3RlZEduaWRhKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQSd9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwLzQwIHRleHQtc2xhdGUtNjAwIGN1cnNvci1ub3QtYWxsb3dlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItODAwIHRvLW9yYW5nZS04MDAgaG92ZXI6ZnJvbS1hbWJlci03MDAgaG92ZXI6dG8tb3JhbmdlLTcwMCB0ZXh0LWFtYmVyLTEwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMC81MCBzaGFkb3ctYW1iZXItOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlphYmxva3VqIHN0cm9ueSBwYW1pxJljaSBpIHd5emVydWogbmFnxYLDs3draSBQRSBwcm9jZXN1IG1hbHdhcmVcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+8J+nqSBEZWZyYWdtZW50YWNqYSAmIFplcm93YW5pZSBQRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgIHsvKiA0LUxheWVyIEFudGl2aXJ1cyBCYXJyaWVyIENhc2NhZGUgQnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHRyaWdnZXJBbnRpdmlydXNDYXNjYWRlKHNlbGVjdGVkR25pZGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbGVjdGVkR25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0zIHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTYwMCB2aWEtdGVhbC02MDAgdG8tY3lhbi02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by1jeWFuLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzUwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTIwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkR25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1Nla3RvciBaYWJlenBpZWN6b255IEJhcmllcsSFJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogYExpa3dpZHVqICYgVXJ1Y2hvbSBLYXNrYWTEmSAoMG1zIOKelCBMYXNlciDinpQgV2Fyc3R3eSlgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgey8qIEdlbWluaSBIdW50ZXIgRGlzcGF0Y2ggQnV0dG9uICovfVxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9yZGVySHVudGVyU2xhdWdodGVyKHNlbGVjdGVkR25pZGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbGVjdGVkR25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0yLjUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NSAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAvNDAgdGV4dC1zbGF0ZS02MDAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtODAwIHZpYS1waW5rLTgwMCB0by1yZWQtODAwIGhvdmVyOmZyb20tcHVycGxlLTcwMCBob3Zlcjp0by1yZWQtNzAwIHRleHQtd2hpdGUgc2hhZG93LXB1cnBsZS05NTAvNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhcmdldCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V3nFm2xpaiDFgW93Y8SZIEdlbWluaSAoVWLDs2opPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04IHRleHQtY2VudGVyIGJnLXNsYXRlLTkwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgV3liaWVyeiBHbmlkxJkgbmEgcmFkYXJ6ZSwgYWJ5IHpvYmFjennEhyBzemN6ZWfDs8WCeSB0YWt0eWN6bmUuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIEh1bnRlciBUZWxlbWV0cnkgU3ViY2FyZCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05NTAgdmlhLWN5YW4tOTUwLzQwIHRvLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWN5YW4tODAwLzQwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgIFBPU1TEmFAgUFJBQyDFgU9XQ1kgR0VNSU5JIEFJOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPntodW50ZXJTdGF0ZS5yZXBhaXJQcm9ncmVzc30lPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUHJvZ3Jlc3MgQmFyICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgcm91bmRlZC1mdWxsIGgtMi41IG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLWN5YW4tOTAwLzYwXCI+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNTAwIHRvLWVtZXJhbGQtNDAwIGgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke2h1bnRlclN0YXRlLnJlcGFpclByb2dyZXNzfSVgIH19XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+Wmxpa3dpZG93YW5lIEduaWR5OiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57aHVudGVyU3RhdGUua2lsbHNDb3VudH08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+VWxlY3pvbmUgV8SZesWCeSBJL086IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPntodW50ZXJTdGF0ZS5maXhlZE5vZGVzQ291bnR9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIDQgQ29uY2VudHJpYyBTZWN1cml0eSBMYXllcnMgT3ZlcnZpZXcgJiBMYXNlciBHcmlkIE1hdHJpeCAoMTIgY29scykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi0xMiBtdC0yIHAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5LYXNrYWRvd2EgT2Nocm9uYSA0IFdhcnN0dyBNb25vbGl0dSAmIFNpYXRrYSBMYXNlcm93YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgS2HFvGR5IG9jenlzemN6b255IHogR25pZCBvYnN6YXIgem9zdGFqZSBuYXR5Y2htaWFzdCB6YWJlenBpZWN6b255IGtvcmRvbmVtIGFudHl3aXJ1c293eW0sIG5hc3TEmXBuaWUgbGFzZXJlbSBzZWt0b3Jvd3ltLCBhIG5hIGtvbmllYyBrYXNrYWRvd28gd2nEhcW8ZSBzxIVzaWVkbmllIHdhcnN0d3kgZG8gbW9tZW50dSBjYcWCa293aXRlaiBla3N0ZXJtaW5hY2ppIG1hbHdhcmUuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC03MDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICBTdW1hIE9jaHJvbnk6IHtjYXNjYWRlU3RhdGUub3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudH0lXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTMgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICAgICAge3NlY3VyZWRMYXllcnMubWFwKChsYXllcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0YWdlQ29sb3IgPSBsYXllci5zdGFnZSA9PT0gJ0lNTUVESUFURV9MT0NLJ1xuICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNTAwIGJnLWVtZXJhbGQtOTUwLzMwJ1xuICAgICAgICAgICAgICAgICAgOiBsYXllci5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUidcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1jeWFuLTUwMCBiZy1jeWFuLTk1MC8zMCdcbiAgICAgICAgICAgICAgICAgIDogbGF5ZXIuc3RhZ2UgPT09ICdORUlHSEJPUl9DQVNDQURFJ1xuICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLXRlYWwtNTAwIGJnLXRlYWwtOTUwLzMwJ1xuICAgICAgICAgICAgICAgICAgOiBsYXllci5pc1NlY3VyZWRcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTcwMCBiZy1zbGF0ZS05NTAvOTAnXG4gICAgICAgICAgICAgICAgICA6ICdib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTk1MC82MCc7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2xheWVyLmxheWVySW5kZXh9IGNsYXNzTmFtZT17YHAtMy41IHJvdW5kZWQteGwgYm9yZGVyICR7c3RhZ2VDb2xvcn0gc3BhY2UteS0yLjUgdHJhbnNpdGlvbi1hbGxgfT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYXllci5kZXB0aFJhbmdlS219XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQtWzEwcHhdIGZvbnQtYm9sZCAke2xheWVyLmlzU2VjdXJlZCA/ICd0ZXh0LWVtZXJhbGQtNDAwJyA6ICd0ZXh0LXNsYXRlLTUwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIuaXNTZWN1cmVkID8gJ1pBQkVaUElFQ1pPTkEnIDogJ05JRUFLVFlXTkEnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAge2xheWVyLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBibG9jayBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYXllci5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBTaGllbGQgTWV0ZXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5Nb2MgVGFyY3p5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkXCI+e2xheWVyLnNoaWVsZFBlcmNlbnR9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgcm91bmRlZC1mdWxsIGgtMS41IG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC01MDAgdG8tY3lhbi00MDAgaC1mdWxsIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtsYXllci5zaGllbGRQZXJjZW50fSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MCB0ZXh0LVsxMHB4XSBzcGFjZS15LTEgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XacSFemtpIGxhc2Vyb3dlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e2xheWVyLmFjdGl2ZUJlYW1zQ291bnR9IGxhc2Vyw7N3PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPk9jenlzemN6b25lIHfEmXrFgnk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTMwMCBmb250LWJvbGRcIj57bGF5ZXIuY2xlYW5zZWROb2Rlc0NvdW50fSBwa3Q8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RXRhcCBLYXNrYWR5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1ib2xkXCI+e2xheWVyLnN0YWdlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBWSUVXIDI6IE1PTk9MSVRZQ1pOQSBQT1dJRVJaQ0hOSUEgU1lTVEVNVSAoQVJDSElURUtUVVJBIEkvTykgKi99XG4gICAgICB7YWN0aXZlVmlld01vZGUgPT09ICdNT05PTElUSF9TVVJGQUNFJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy0yeGwgc3BhY2UteS01XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Nb25vbGl0eWN6bmEgUG93aWVyemNobmlhIFN5c3RlbXUgeiBXxJl6xYJhbWkgV2VqxZtjaWEgaSBXeWrFm2NpYSAoSS9PKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICBQdWxwaXQgbmF3aWdhY3lqbnkgbW9uaXRvcmEgc3Rhbm93aSBjZW50cmFsbnkgcHVua3Qgd3lqxZtjaW93eSBpbnRlcmFrY2ppIGN6xYJvd2lla2EgeiBtYXN6eW7EhS4gWmFiZXpwaWVjem9ubyB3c3p5c3RraWUgbWFnaXN0cmFsZSBpIHBvcnR5IHByemVkIHBlbmV0cmFjasSFIEduaWQuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZCBiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDBcIj5cbiAgICAgICAgICAgICAgICAgIDkgWm1hcG93YW55Y2ggV8SZesWCw7N3IEkvT1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEdyaWQgb2YgSS9PIFN5c3RlbSBOb2RlcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtMyBnYXAtNFwiPlxuICAgICAgICAgICAgICB7aW9Ob2Rlcy5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNNb25pdG9yID0gbm9kZS5pZCA9PT0gJ25vZGUtbW9uaXRvcic7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNDb21wcm9taXNlZCA9IG5vZGUuc3RhdHVzID09PSAnQ09NUFJPTUlTRUQnO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzUmVjb25zdHJ1Y3RlZCA9IG5vZGUuc3RhdHVzID09PSAnUkVDT05TVFJVQ1RFRCc7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNDb2xvciA9IGlzQ29tcHJvbWlzZWQgXG4gICAgICAgICAgICAgICAgICA/ICdib3JkZXItcmVkLTYwMC83MCBiZy1yZWQtOTUwLzIwJyBcbiAgICAgICAgICAgICAgICAgIDogaXNSZWNvbnN0cnVjdGVkIFxuICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLWVtZXJhbGQtNjAwLzcwIGJnLWVtZXJhbGQtOTUwLzIwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JvcmRlci1zbGF0ZS04MDAgYmctc2xhdGUtOTUwLzgwJztcblxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17bm9kZS5pZH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgYm9yZGVyICR7c3RhdHVzQ29sb3J9IHNwYWNlLXktMyB0cmFuc2l0aW9uLWFsbCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXNNb25pdG9yICYmIChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0wIHJpZ2h0LTAgcHgtMiBweS0wLjUgcm91bmRlZC1ibC1sZyBiZy1lbWVyYWxkLTcwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyB0ZXh0LVs5cHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgUFVMUElUIE1PTklUT1JcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBweC0xLjUgcHktMC4yIGJnLXNsYXRlLTkwMCByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge25vZGUuY29kZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuMiByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge25vZGUudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtub2RlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtub2RlLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzExcHhdXCI+UHJ6ZXB1c3Rvd2/Fm8SHOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e25vZGUudHJhZmZpY0JhbmR3aWR0aH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzExcHhdXCI+U3RhbiBPY2hyb255Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aXNDb21wcm9taXNlZCA/ICd0ZXh0LXJlZC00MDAgZm9udC1ib2xkJyA6ICd0ZXh0LWVtZXJhbGQtNDAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtub2RlLnN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTFweF1cIj5CYXJpZXJhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCB0cnVuY2F0ZSBtYXgtdy1bMTYwcHhdXCIgdGl0bGU9e25vZGUucHJvdGVjdGluZ0JhcnJpZXJ9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5wcm90ZWN0aW5nQmFycmllcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEFjdGlvbiBCdXR0b24gZm9yIENvbXByb21pc2VkIE5vZGVzICovfVxuICAgICAgICAgICAgICAgICAgICB7aXNDb21wcm9taXNlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJb05vZGVzKHByZXYgPT4gcHJldi5tYXAobiA9PiBuLmlkID09PSBub2RlLmlkID8geyAuLi5uLCBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJywgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwgfSA6IG4pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkQ29tYmF0TG9nKGBbQVVUT05BUFJBV0FdIFfEmXplxYIgJHtub2RlLm5hbWV9IHpvc3RhxYIgb2RjacSZdHkgb2QgR25pZHkgaSB6cmVrb25zdHJ1b3dhbnkuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXlSYWRhclRvbmUoODAwLCAyMDAsICdzaW5lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTEuNSByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNzAwIGhvdmVyOmJnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5SZWtvbnN0cnV1aiBXxJl6ZcWCIEplZG55bSBLbGlrbmnEmWNpZW08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBWSUVXIDM6IENPTUJBVCBURUxFTUVUUlkgTE9HUyAqL31cbiAgICAgIHthY3RpdmVWaWV3TW9kZSA9PT0gJ0NPTUJBVF9MT0dTJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctMnhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+RHppZW5uaWsgQm9qb3d5ICYgVGVsZW1ldHJpYSBMaWt3aWRhY2ppIEduaWQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0Q29tYmF0TG9ncyhbXSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBmb250LW1vbm8gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBXeWN6ecWbxIcgTG9naVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtZW1lcmFsZC0zMDAgc3BhY2UteS0xLjUgbWF4LWgtOTYgb3ZlcmZsb3cteS1hdXRvIGJvcmRlciBib3JkZXItZW1lcmFsZC05NTBcIj5cbiAgICAgICAgICAgIHtjb21iYXRMb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPXtsb2cuaW5jbHVkZXMoJ1tBTEFSTScpIHx8IGxvZy5pbmNsdWRlcygnW09TVFJaQcWBJykgPyAndGV4dC1yZWQtNDAwJyA6IGxvZy5pbmNsdWRlcygnW0VLU1RFUk1JTkFDSkEnKSB8fCBsb2cuaW5jbHVkZXMoJ1tTRUtUT1InKSA/ICd0ZXh0LXllbGxvdy0zMDAgZm9udC1ib2xkJyA6ICd0ZXh0LXNsYXRlLTMwMCd9PlxuICAgICAgICAgICAgICAgIHtsb2d9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW94RE0sU0FnZFksVUFoZFo7QUFweEROLFNBQWdCLFVBQVUsV0FBVyxRQUFRLFNBQVMsbUJBQW1CO0FBQ3pFLFNBQVMsUUFBUSx1QkFBdUI7QUFDeEM7QUFBQSxFQUNFO0FBQUEsRUFBVztBQUFBLEVBQU87QUFBQSxFQUFxQjtBQUFBLEVBQWE7QUFBQSxFQUFLO0FBQUEsRUFDekQ7QUFBQSxFQUFTO0FBQUEsRUFBUztBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBZ0I7QUFBQSxFQUFTO0FBQUEsRUFDdkM7QUFBQSxFQUFnQjtBQUFBLEVBQTZCO0FBQUEsRUFDOUQ7QUFBQSxFQUFVO0FBQUEsRUFBUTtBQUFBLEVBQXFCO0FBQUEsRUFBYztBQUFBLEVBQ3hDO0FBQUEsRUFBVztBQUFBLE9BQ25CO0FBS1AsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxtQkFBMEM7QUFDbkQsU0FBUyx5Q0FBeUM7QUFDbEQsU0FBUyxrQ0FBa0M7QUFtQ3BDLGdCQUFTLG9CQUFvQixPQUFpQztBQUNuRSxNQUFJLE9BQU8sTUFBTSxnQkFBZ0IsVUFBVTtBQUN6QyxXQUFPLEtBQUssSUFBSSxLQUFLLEtBQUssSUFBSSxHQUFHLE1BQU0sV0FBVyxDQUFDO0FBQUEs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