import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"]; const useRef = __vite__cjsImport1_react["useRef"]; const useMemo = __vite__cjsImport1_react["useMemo"]; const useCallback = __vite__cjsImport1_react["useCallback"];
import { motion } from "/sentinel-toolkit/node_modules/.vite/deps/framer-motion.js?v=a92be3d0";
import {
  Crosshair,
  Skull,
  Shield,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RefreshCw,
  Monitor,
  Radio,
  CheckCircle2,
  Layers,
  Terminal,
  Target,
  Flame,
  Lock,
  Sparkles
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
import { gnidaSensor } from "/sentinel-toolkit/src/utils/gnidaAutoFreezeSensor.ts";
import { AfricanHornetSwarmModal } from "/sentinel-toolkit/src/components/AfricanHornetSwarmModal.tsx";
import { ActiveRadarProcessRoster } from "/sentinel-toolkit/src/components/ActiveRadarProcessRoster.tsx";
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
    laserIntensity: 100,
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
    isSecured: true,
    stage: "FORTIFIED",
    shieldPercent: 100,
    laserIntensity: 100,
    activeBeamsCount: 4,
    cleansedNodesCount: 2,
    description: "Szyna pamięci RAM DDR5, strefy DLL i piaskownica NtSuspendProcess."
  },
  {
    layerIndex: 2,
    name: "Warstwa 2: Pulpit Monitora & Urządzenia I/O (HID)",
    depthRangeKm: "50 - 75 KM",
    minDistance: 0.5,
    maxDistance: 0.75,
    isSecured: true,
    stage: "FORTIFIED",
    shieldPercent: 100,
    laserIntensity: 100,
    activeBeamsCount: 4,
    cleansedNodesCount: 3,
    description: "Bufor ramki DWM, pulpit monitora, klawiatura i wskaźnik myszy."
  },
  {
    layerIndex: 3,
    name: "Warstwa 3: Perymetr Sieciowy NIC & Magazyn NVMe",
    depthRangeKm: "75 - 100 KM",
    minDistance: 0.75,
    maxDistance: 1,
    isSecured: true,
    stage: "FORTIFIED",
    shieldPercent: 100,
    laserIntensity: 100,
    activeBeamsCount: 4,
    cleansedNodesCount: 3,
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
    status: "RECONSTRUCTED",
    xRatio: 50,
    yRatio: 18,
    radarAngleDeg: 0,
    radarRingRadius: 0.72,
    trafficBandwidth: "4K @ 144Hz (18.2 Gbps)",
    compromisedByGnidaId: null,
    protectingBarrier: "TopMost Window Barrier & DirectFlip Sandbox",
    shieldLayerIndex: 2,
    isShielded: true
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
    status: "RECONSTRUCTED",
    xRatio: 15,
    yRatio: 65,
    radarAngleDeg: 230,
    radarRingRadius: 0.85,
    trafficBandwidth: "2.5 Gbps Full-Duplex",
    compromisedByGnidaId: null,
    protectingBarrier: "WFP Kernel Packet Firewall",
    shieldLayerIndex: 3,
    isShielded: true
  },
  {
    id: "node-ram",
    name: "Szyna Pamięci RAM & Mostek Pamięci Host",
    code: "BUS-RAM-05",
    type: "CORE_BUS",
    description: "Magistrala pamięci operacyjnej DDR5, przestrzeń adresowa jądra i bufor wstrzyknięć DLL.",
    status: "RECONSTRUCTED",
    xRatio: 50,
    yRatio: 50,
    radarAngleDeg: 180,
    radarRingRadius: 0.35,
    trafficBandwidth: "64 GB/s (DDR5-6000)",
    compromisedByGnidaId: null,
    protectingBarrier: "NtSuspendProcess Memory Sandbox",
    shieldLayerIndex: 1,
    isShielded: true
  },
  {
    id: "node-storage",
    name: "Subsystem Dyskowy NVMe & System Plików NTFS",
    code: "IO-NVME-06",
    type: "INPUT_OUTPUT",
    description: "Pamięć masowa, odczyt i zapis plików wykonywalnych PE, tablice MBR/GPT.",
    status: "RECONSTRUCTED",
    xRatio: 85,
    yRatio: 65,
    radarAngleDeg: 130,
    radarRingRadius: 0.82,
    trafficBandwidth: "7400 MB/s Read / 6800 MB/s Write",
    compromisedByGnidaId: null,
    protectingBarrier: "PE Header Sabotage & icacls Quarantine",
    shieldLayerIndex: 3,
    isShielded: true
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
    state: "ZNISZCZONA",
    healthPercent: 0,
    associatedIONodeId: "node-monitor",
    signatureSha: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    activeProcessName: "flutter_screen_hijack.exe",
    aggressionDescription: "Wymuszała stałe okno HWND_TOPMOST na monitorze. Zneutralizowana, nagłówek PE wyzerowany, kordon postawiony.",
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
    state: "ZNISZCZONA",
    healthPercent: 0,
    associatedIONodeId: "node-storage",
    signatureSha: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    activeProcessName: "blackcat_encryptor.exe",
    aggressionDescription: "Przejmowała wątki I/O dysku NVMe. Całkowicie zniszczona przez laser sektorowy, szyna I/O zabezpieczona.",
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
    state: "ZNISZCZONA",
    healthPercent: 0,
    associatedIONodeId: "node-nic",
    signatureSha: "185f8db32271fe25f561a6fc938b2e264306ec304eda518007d1764826381969",
    activeProcessName: "redline_stealer_agent.exe",
    aggressionDescription: "Gniazda TCP do serwera C2 trwale odcięte. Gnida zlikwidowana kordonem sanitarnym.",
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
    state: "ZNISZCZONA",
    healthPercent: 0,
    associatedIONodeId: "node-ram",
    signatureSha: "cb4771694f4a3636f4007b8a733792cb153164998782a2080a290238053a4792",
    activeProcessName: "ghost_ram_injector.dll",
    aggressionDescription: "Wstrzyknięcia pamięci operacyjnej zneutralizowane przez NtSuspendProcess. Wątki zlikwidowane.",
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
    state: "ZNISZCZONA",
    healthPercent: 0,
    associatedIONodeId: "node-storage",
    signatureSha: "03c39385d38ff02a969b828bfebfa146e492b45070003cbba8d42cb3a95dcfc1",
    activeProcessName: "hermetic_mbr_wiper.sys",
    aggressionDescription: "Próba nadpisania MBR udaremniona. Sektor rozruchowy chroniony, proces zneutralizowany.",
    infectionVector: "Zainfekowana aktualizacja oprogramowania bazodanowego",
    velocity: 640
  }
];
export const MilitaryRadarScanner = () => {
  const [gnidas, setGnidas] = useState(() => {
    const saved = safeStorage.get("sentinel_radar_gnidas", INITIAL_RADAR_GNIDAS);
    return saved.map((g) => ({ ...g, state: "ZNISZCZONA", healthPercent: 0 }));
  });
  const [ioNodes, setIoNodes] = useState(() => {
    const saved = safeStorage.get("sentinel_radar_io_nodes", INITIAL_SYSTEM_IO_NODES);
    return saved.map((n) => ({
      ...n,
      status: "RECONSTRUCTED",
      isShielded: true,
      compromisedByGnidaId: null
    }));
  });
  const [securedLayers, setSecuredLayers] = useState(() => {
    return safeStorage.get("sentinel_radar_secured_layers", INITIAL_SECURED_LAYERS);
  });
  const [cascadeState, setCascadeState] = useState({
    stage: "FORTIFIED",
    isActive: true,
    currentSectorName: "Cały Monolit Systemowy (Warstwy 0-3)",
    currentBearingDeg: 0,
    currentDistanceRatio: 0.5,
    activeLaserOrigin: null,
    activeLaserTargets: [],
    securedLayers: INITIAL_SECURED_LAYERS,
    totalMalwareExterminated: true,
    overallFortressShieldPercent: 100,
    statusMessage: "👑 WSZYSTKIE GNIDY ZLIKWIDOWANE (FIRST KILL GNIDAS). 4 warstwy monolitu w 100% zabezpieczone kordonem pancernym i laserem!"
  });
  const [hunterState, setHunterState] = useState({
    callsign: "GEMINI-HUNTER-01",
    bearingDeg: 45,
    distanceRatio: 0.25,
    targetGnidaId: null,
    status: "VICTORY",
    repairProgress: 100,
    slaughterPower: 100,
    interceptSpeed: 820,
    killsCount: 5,
    fixedNodesCount: 9
  });
  const [isScanning, setIsScanning] = useState(true);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [sweepSpeedRpm, setSweepSpeedRpm] = useState(24);
  const [selectedTargetId, setSelectedTargetId] = useState("gnida-01");
  const [activeViewMode, setActiveViewMode] = useState("RADAR_PPI");
  const [radarRangeKm, setRadarRangeKm] = useState(100);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [autoPurgeActive, setAutoPurgeActive] = useState(false);
  const [hornetModalOpen, setHornetModalOpen] = useState(false);
  const [combatLogs, setCombatLogs] = useState([
    `[SYS-BOOT] Inicjalizacja Radaru Wojskowego Monolitu Systemowego (Pasmo X / 9.4 GHz)`,
    `[FIRST KILL GNIDAS] Wykonano natychmiastowy ubój gnid: 100% pasożytów zlikwidowanych w RAM i na dysku.`,
    `[MONOLITH] Zmapowano 9 węzłów wejścia/wyjścia (I/O) z integracją pulpitu monitora. Węzły zrekonstruowane.`,
    `[BARIERA-KASKADOWA] 4-stopniowy system kordonu: Warstwy 0-3 zabezpieczone w 100% siatką laserową.`,
    `[GEMINI-AI] Łowca Gemini zneutralizował wszystkie aktywne zagrożenia. Status: WIKTORIA (VICTORY).`,
    `[CZUJNIK-GNID] Autonomiczny czujnik i daemon natychmiastowego auto-freezu (0 ms NtSuspendProcess) AKTYWNY.`
  ]);
  const [sensorStatus, setSensorStatus] = useState(() => gnidaSensor.getStatus());
  const [illuminatedGnidaIds, setIlluminatedGnidaIds] = useState({});
  const [radarListTab, setRadarListTab] = useState("PROCESS_LIST");
  const [processFilter, setProcessFilter] = useState("ALL");
  const [isForceRefreshing, setIsForceRefreshing] = useState(false);
  const [searchProcessTerm, setSearchProcessTerm] = useState("");
  useEffect(() => {
    const unsubscribe = gnidaSensor.subscribe((status) => {
      setSensorStatus(status);
    });
    const handleAutoFrozenEvent = (e) => {
      const detail = e.detail;
      if (detail) {
        addCombatLog(`[⚡ CZUJNIK GNID - AUTO-FREEZE] Natychmiastowe zamrożenie w RAM (0 ms): ${detail.targetName} -> Węzeł I/O przywrócony!`);
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
  const selectedGnida = useMemo(() => {
    return gnidas.find((g) => g.id === selectedTargetId) || gnidas[0] || null;
  }, [gnidas, selectedTargetId]);
  const filteredGnidas = useMemo(() => {
    let list = gnidas;
    if (processFilter === "ACTIVE") {
      list = list.filter((g) => g.state !== "ZNISZCZONA");
    } else if (processFilter === "CRITICAL") {
      list = list.filter((g) => getGnidaThreatScore(g) >= 80);
    } else if (processFilter === "PURGED") {
      list = list.filter((g) => g.state === "ZNISZCZONA");
    }
    if (searchProcessTerm.trim()) {
      const q = searchProcessTerm.toLowerCase();
      list = list.filter(
        (g) => g.name.toLowerCase().includes(q) || g.activeProcessName.toLowerCase().includes(q) || g.typeLabel.toLowerCase().includes(q) || g.associatedIONodeId.toLowerCase().includes(q)
      );
    }
    return list;
  }, [gnidas, processFilter, searchProcessTerm]);
  const addCombatLog = useCallback((msg) => {
    const time = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    setCombatLogs((prev) => [`[${time}] ${msg}`, ...prev.slice(0, 59)]);
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
          gnidas.forEach((g) => {
            const diff = Math.abs((next - g.bearingDeg + 540) % 360 - 180);
            if (diff < 9) {
              setIlluminatedGnidaIds((ill) => {
                const now = Date.now();
                if (ill[g.id] && now - ill[g.id] < 1200) return ill;
                return { ...ill, [g.id]: now };
              });
            }
          });
          return next;
        });
      }
      animFrame = requestAnimationFrame(renderLoop);
    };
    animFrame = requestAnimationFrame(renderLoop);
    return () => cancelAnimationFrame(animFrame);
  }, [isScanning, sweepSpeedRpm, gnidas]);
  const handleTriggerRadarOmniScan = () => {
    setIsForceRefreshing(true);
    playRadarTone(1200, 200, "square");
    addCombatLog(`[RADAR-OMNI] Wymuszono pełny impuls skanowania aktywnego (Pasmo X / 9.4 GHz). Odświeżono listę procesów.`);
    const now = Date.now();
    const updatedIllumination = {};
    gnidas.forEach((g, idx) => {
      updatedIllumination[g.id] = now + idx * 60;
    });
    setIlluminatedGnidaIds(updatedIllumination);
    setTimeout(() => {
      setIsForceRefreshing(false);
    }, 1400);
  };
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
  const executeKillAllGnidasNow = useCallback(() => {
    playRadarTone(1400, 600, "square");
    addCombatLog(`[💥 ROZKAZ WOJSKOWY: FIRST KILL GNIDAS] Natychmiastowy ubój i neutralizacja WSZYSTKICH Gnid w Monolicie!`);
    setGnidas((prev) => {
      const slaughtered = prev.map((g) => {
        addCombatLog(`[UBÓJ GNIDY] Zlikwidowano pasożyta: ${g.name} (${g.activeProcessName}). Wyzerowano nagłówek MZ/PE, odcięto kursor i pamięć RAM.`);
        return {
          ...g,
          state: "ZNISZCZONA",
          healthPercent: 0
        };
      });
      safeStorage.set("sentinel_radar_gnidas", slaughtered);
      return slaughtered;
    });
    setIoNodes((prev) => {
      const restored = prev.map((node) => ({
        ...node,
        status: "RECONSTRUCTED",
        compromisedByGnidaId: null,
        isShielded: true
      }));
      safeStorage.set("sentinel_radar_io_nodes", restored);
      return restored;
    });
    const fullyFortifiedLayers = INITIAL_SECURED_LAYERS.map((l) => ({
      ...l,
      isSecured: true,
      stage: "FORTIFIED",
      shieldPercent: 100,
      laserIntensity: 100,
      activeBeamsCount: 4,
      cleansedNodesCount: 3,
      securedTimestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    }));
    setSecuredLayers(fullyFortifiedLayers);
    safeStorage.set("sentinel_radar_secured_layers", fullyFortifiedLayers);
    setCascadeState({
      stage: "FORTIFIED",
      isActive: true,
      currentSectorName: "Wszystkie Sektory Monolitu (0-360°)",
      currentBearingDeg: 0,
      currentDistanceRatio: 0.5,
      activeLaserOrigin: null,
      activeLaserTargets: [],
      securedLayers: fullyFortifiedLayers,
      totalMalwareExterminated: true,
      overallFortressShieldPercent: 100,
      statusMessage: "👑 WSZYSTKIE GNIDY ZOSTAŁY ZLIKWIDOWANE (FIRST KILL GNIDAS)! Kordon antywirusowy i siatka laserowa w 100% zabezpieczyły monolit."
    });
    setHunterState((prev) => ({
      ...prev,
      status: "VICTORY",
      killsCount: prev.killsCount + 5,
      slaughterPower: 100,
      fixedNodesCount: 9,
      targetGnidaId: null,
      repairProgress: 100
    }));
    setAutoPurgeActive(false);
    try {
      const procs = safeStorage.get("sentinel_simulated_processes", []);
      if (Array.isArray(procs)) {
        const killedProcs = procs.map((p) => ({ ...p, status: "neutralized", isBlocked: true, opacity: 0.1 }));
        safeStorage.set("sentinel_simulated_processes", killedProcs);
      }
    } catch {
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:all-gnidas-killed"));
    }
  }, [playRadarTone, addCombatLog]);
  useEffect(() => {
    const handleGlobalKill = () => {
      executeKillAllGnidasNow();
    };
    if (typeof window !== "undefined") {
      window.addEventListener("sentinel:kill-all-gnidas", handleGlobalKill);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("sentinel:kill-all-gnidas", handleGlobalKill);
      }
    };
  }, [executeKillAllGnidasNow]);
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
    const radius = Math.min(centerX, centerY) - 20;
    ctx.fillStyle = "#030806";
    ctx.fillRect(0, 0, width, height);
    const radialGrad = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, radius);
    radialGrad.addColorStop(0, "rgba(0, 35, 15, 0.7)");
    radialGrad.addColorStop(0.7, "rgba(0, 20, 8, 0.85)");
    radialGrad.addColorStop(1, "rgba(1, 10, 4, 0.98)");
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
          ctx.fillStyle = "rgba(0, 255, 200, 0.16)";
        } else if (layer.stage === "SECTOR_LASER") {
          ctx.fillStyle = "rgba(0, 240, 255, 0.22)";
        } else if (layer.stage === "NEIGHBOR_CASCADE") {
          ctx.fillStyle = "rgba(16, 185, 129, 0.20)";
        } else {
          ctx.fillStyle = "rgba(5, 150, 105, 0.12)";
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
      ctx.strokeStyle = isSecured ? "rgba(0, 255, 200, 0.75)" : idx === 3 ? "rgba(0, 255, 100, 0.5)" : "rgba(0, 255, 100, 0.2)";
      ctx.lineWidth = isSecured ? 2.2 : idx === 3 ? 2 : 1;
      ctx.setLineDash(idx === 3 || isSecured ? [] : [4, 4]);
      if (isSecured) {
        ctx.shadowColor = "#00ffcc";
        ctx.shadowBlur = 8;
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.setLineDash([]);
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.fillStyle = isSecured ? "#00ffcc" : "rgba(0, 255, 100, 0.6)";
      const statusSuffix = isSecured ? ` [🛡️ ${layer.shieldPercent}% TARCZA]` : "";
      ctx.fillText(`${ringLabels[idx]}${statusSuffix}`, centerX + 8, centerY - r + 12);
    });
    for (let deg = 0; deg < 360; deg += 30) {
      const rad = (deg - 90) * (Math.PI / 180);
      const xEnd = centerX + radius * Math.cos(rad);
      const yEnd = centerY + radius * Math.sin(rad);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(xEnd, yEnd);
      ctx.strokeStyle = deg % 90 === 0 ? "rgba(0, 255, 100, 0.35)" : "rgba(0, 255, 100, 0.12)";
      ctx.lineWidth = deg % 90 === 0 ? 1.5 : 0.8;
      ctx.stroke();
      const labelDist = radius + 12;
      const xLbl = centerX + labelDist * Math.cos(rad);
      const yLbl = centerY + labelDist * Math.sin(rad);
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = deg % 90 === 0 ? "rgba(0, 255, 150, 0.9)" : "rgba(0, 255, 100, 0.5)";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${deg}°`, xLbl, yLbl);
    }
    if (cascadeState.isActive && (cascadeState.stage === "SECTOR_LASER" || cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "IMMEDIATE_LOCK")) {
      const targetRad = (cascadeState.currentBearingDeg - 90) * (Math.PI / 180);
      const targetDist = radius * cascadeState.currentDistanceRatio;
      const tx = centerX + targetDist * Math.cos(targetRad);
      const ty = centerY + targetDist * Math.sin(targetRad);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(tx, ty);
      ctx.strokeStyle = cascadeState.stage === "SECTOR_LASER" ? "#ff0055" : "#00ffff";
      ctx.lineWidth = 3.5;
      ctx.shadowColor = cascadeState.stage === "SECTOR_LASER" ? "#ff0055" : "#00ffff";
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      const arcStart = targetRad - 0.4;
      const arcEnd = targetRad + 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, targetDist, arcStart, arcEnd);
      ctx.strokeStyle = "rgba(0, 255, 240, 0.9)";
      ctx.lineWidth = 2.5;
      ctx.shadowColor = "#00ffff";
      ctx.shadowBlur = 15;
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
          ctx.lineWidth = 2;
          ctx.shadowColor = "#34d399";
          ctx.shadowBlur = 12;
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
      }
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
        ctx.arc(x, y, 15, 0, Math.PI * 2);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
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
    ctx.lineWidth = 3;
    ctx.stroke();
  }, [sweepAngle, gnidas, ioNodes, hunterState, selectedTargetId, securedLayers, cascadeState]);
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
    const testSquad = [
      {
        id: "gnida-test-01",
        name: "Gnida Testowa [Locker Ekranowy]",
        gnidaType: "GNIDA_EKRANOWA",
        typeLabel: "Gnida Ekranowa (Screen Locker)",
        bearingDeg: 25,
        distanceRatio: 0.7,
        altitudeKm: 12,
        threatLevel: "EKSTREMALNY",
        threatScore: 95,
        state: "WYKRYTA",
        healthPercent: 100,
        associatedIONodeId: "node-monitor",
        signatureSha: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
        activeProcessName: "test_screen_hijack.exe",
        aggressionDescription: "Próba przejęcia okna HWND_TOPMOST monitora w celach testowych.",
        infectionVector: "Środowisko testowe",
        velocity: 410
      },
      {
        id: "gnida-test-02",
        name: "Gnida Testowa [Szyfrator NVMe]",
        gnidaType: "GNIDA_SZYFRUJACA",
        typeLabel: "Gnida Szyfrująca (Ransomware)",
        bearingDeg: 140,
        distanceRatio: 0.78,
        altitudeKm: 17.5,
        threatLevel: "EKSTREMALNY",
        threatScore: 98,
        state: "WYKRYTA",
        healthPercent: 100,
        associatedIONodeId: "node-storage",
        signatureSha: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
        activeProcessName: "test_ransomware.exe",
        aggressionDescription: "Zainicjowano próbne szyfrowanie I/O dyskowego.",
        infectionVector: "Środowisko testowe",
        velocity: 520
      }
    ];
    setGnidas(testSquad);
    safeStorage.set("sentinel_radar_gnidas", testSquad);
    setIoNodes((prev) => prev.map((n) => n.id === "node-monitor" ? { ...n, status: "COMPROMISED", isShielded: false } : n));
    setSelectedTargetId("gnida-test-01");
    setAutoPurgeActive(false);
    addCombatLog(`[TEST-RELOAD] Załadowano próbną eskadrę Gnid do weryfikacji procedury uboju i bariery.`);
  };
  const activeGnidasCount = gnidas.filter((g) => g.state !== "ZNISZCZONA").length;
  const destroyedGnidasCount = gnidas.filter((g) => g.state === "ZNISZCZONA").length;
  const compromisedNodesCount = ioNodes.filter((n) => n.status === "COMPROMISED").length;
  const systemIntegrityPercent = Math.round(
    (ioNodes.length - compromisedNodesCount) / ioNodes.length * 100
  );
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-emerald-950/80 to-slate-950 border border-emerald-800/50 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950", children: /* @__PURE__ */ jsxDEV(Radio, { className: "w-6 h-6 animate-pulse text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1595,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1594,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Radar Wojskowy & Skaner Monolitycznej Powierzchni Systemu" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1599,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1598,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-emerald-400 mt-0.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1602,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "MONOLIT I/O: MONITOR + RAM + DYSK + SIECI • TERMINOLOGIA: GNIDY (MALWARE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1603,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1601,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1597,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1593,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: [
            "Klasyczny radar wojskowy do śledzenia zagrożeń (Gnid). Monitor stanowi integralną część powierzchni wejścia/wyjścia (I/O). Śledź na żywo postęp prac ",
            /* @__PURE__ */ jsxDEV("strong", { children: "Łowcy Gemini AI" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1608,
              columnNumber: 164
            }, this),
            ", który poluje na aktywne Gnidy, dekapituje ich wątki i dokonuje rekonstrukcji zaatakowanych węzłów."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1607,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1592,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsAudioEnabled(!isAudioEnabled),
              className: `p-2.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${isAudioEnabled ? "bg-emerald-950 text-emerald-300 border-emerald-700" : "bg-slate-900 text-slate-400 border-slate-800"}`,
              title: "Przełącznik dźwięku sonaru i lasera uboju",
              children: [
                isAudioEnabled ? /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1623,
                  columnNumber: 33
                }, this) : /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1623,
                  columnNumber: 84
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isAudioEnabled ? "Dźwięk WŁ." : "Wyciszony" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1624,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1614,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: executeKillAllGnidasNow,
              className: "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black font-mono flex items-center gap-2 shadow-xl transition-all cursor-pointer bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-red-950/70 border-2 border-red-400/60 active:scale-95 animate-pulse",
              title: "Wykonaj natychmiastowy ubój wszystkich gnid (First Kill Gnidas) i wzmocnij kordon pancerny",
              children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-yellow-300 animate-bounce" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1632,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "UBÓJ WSZYSTKICH GNID (FIRST KILL GNIDAS)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1633,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1627,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerFullExterminationCascade,
              className: "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-950/60 border border-emerald-400/40",
              title: "Automatyczna likwidacja pasożytów i sekwencja barier: 0 ms -> Laser -> Sąsiednie Warstwy -> Trwałe Zabezpieczenie",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1641,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Kaskada Barier & Ubój (0ms ➔ Laser ➔ Warstwy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1642,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1636,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setAutoPurgeActive(!autoPurgeActive),
              className: `px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center gap-2 shadow-lg transition-all cursor-pointer ${autoPurgeActive ? "bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white shadow-red-950/60 border border-red-400/40 animate-pulse" : "bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white shadow-purple-950/60 border border-purple-400/30"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1653,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: autoPurgeActive ? "Autonomiczny Ubój w Toku..." : "Pętla Uboju Łowcy Gemini" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1654,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1645,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleSpawnCustomGnida,
              className: "px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-800/60 text-purple-300 text-xs font-bold font-mono flex items-center gap-1.5 transition-colors cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1661,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wypuść Gnidę" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1662,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1657,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleRebootRadarSubsystem,
              className: "p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer",
              title: "Reset radaru",
              children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1670,
                columnNumber: 15
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1665,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1613,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1591,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-5 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Integralność Monolitu" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1678,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-emerald-400", children: [
            systemIntegrityPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1679,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1677,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Aktywne Gnidy" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1683,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-red-400", children: [
            activeGnidasCount,
            " wrogie"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1684,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1682,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Ubite Gnidy" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1688,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-base font-black text-purple-400", children: [
            destroyedGnidasCount,
            " zlikwidowanych"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1689,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1687,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-br from-emerald-950/70 to-slate-950 p-2.5 rounded-xl border border-emerald-500/50 col-span-2 sm:col-span-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 text-[10px] uppercase font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1694,
              columnNumber: 15
            }, this),
            "Czujnik Gnid (Auto-Free)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1693,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-white flex items-center justify-between mt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "0 ms NtSuspend" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1698,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-emerald-900/80 text-[10px] text-emerald-200 border border-emerald-600", children: [
              sensorStatus.totalAutoFrozen,
              " zamrożonych"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1699,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1697,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1692,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Tarcza 4 Warstw" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1706,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-emerald-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1708,
              columnNumber: 15
            }, this),
            cascadeState.overallFortressShieldPercent,
            "% Twierdza"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1707,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1705,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Stan Łowcy Gemini" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1714,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-cyan-400 flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1716,
              columnNumber: 15
            }, this),
            hunterState.status
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1715,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1713,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/90 p-2.5 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 text-[10px] uppercase block", children: "Prędkość Skanera" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1722,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-amber-400", children: [
            sweepSpeedRpm,
            " RPM (Pasmo X)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1723,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1721,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1676,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-4 rounded-xl bg-slate-950/90 border border-emerald-700/60 shadow-lg font-mono text-xs space-y-2.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40", children: /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-emerald-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1732,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1731,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-xs block", children: "PROTOKÓŁ BARIERY ANTYWIRUSOWEJ (KASKADA OBRONNA MONOLITU):" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1735,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-emerald-300", children: cascadeState.statusMessage }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1738,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1734,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1730,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-1 rounded-full text-[10px] font-bold border ${cascadeState.totalMalwareExterminated ? "bg-emerald-950 text-emerald-300 border-emerald-500 shadow-[0_0_12px_#10b981]" : cascadeState.stage !== "IDLE" ? "bg-cyan-950 text-cyan-300 border-cyan-500 animate-pulse" : "bg-slate-900 text-slate-400 border-slate-700"}`, children: cascadeState.totalMalwareExterminated ? "👑 100% EKSTERMINACJA MALWARE - MONOLIT ZABEZPIECZONY" : `ETAP BARIERY: ${cascadeState.stage}` }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1745,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1744,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1729,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "IMMEDIATE_LOCK" ? "bg-emerald-950/80 border-emerald-400 shadow-[0_0_12px_#10b981]" : cascadeState.stage !== "IDLE" ? "bg-slate-900/90 border-emerald-800/80 text-emerald-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-[9px] flex items-center justify-center font-black", children: "1" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1771,
                  columnNumber: 19
                }, this),
                "Bariera 0 ms (Natychmiast)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1770,
                columnNumber: 17
              }, this),
              cascadeState.stage !== "IDLE" && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1774,
                columnNumber: 51
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1769,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Kordon sanitarny w punkcie uboju, odcięcie magistrali I/O i ochrona RAM." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1776,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1762,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "SECTOR_LASER" ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_12px_#06b6d4]" : cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "FORTIFIED" ? "bg-slate-900/90 border-cyan-800/80 text-cyan-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-cyan-500/30 border border-cyan-400 text-cyan-200 text-[9px] flex items-center justify-center font-black", children: "2" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1791,
                  columnNumber: 19
                }, this),
                "Laser Sektora (Wypalanie)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1790,
                columnNumber: 17
              }, this),
              (cascadeState.stage === "NEIGHBOR_CASCADE" || cascadeState.stage === "FORTIFIED") && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1794,
                columnNumber: 103
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1789,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Zogniskowana wiązka laserowa z bieżącego azymutu niszczy pozostałości kodu PE." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1796,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1782,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "NEIGHBOR_CASCADE" ? "bg-teal-950/80 border-teal-400 shadow-[0_0_12px_#14b8a6]" : cascadeState.stage === "FORTIFIED" ? "bg-slate-900/90 border-teal-800/80 text-teal-400" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-teal-500/30 border border-teal-400 text-teal-200 text-[9px] flex items-center justify-center font-black", children: "3" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1811,
                  columnNumber: 19
                }, this),
                "Kaskada Sąsiednich Warstw"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1810,
                columnNumber: 17
              }, this),
              cascadeState.stage === "FORTIFIED" && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-teal-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1814,
                columnNumber: 56
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1809,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Propagacja tarczy na warstwy przyległe, synchronizacja węzłów i mostków." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1816,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1802,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2.5 rounded-lg border transition-all ${cascadeState.stage === "FORTIFIED" ? "bg-emerald-950/90 border-emerald-400 shadow-[0_0_14px_#10b981]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-[11px] text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-4 h-4 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-200 text-[9px] flex items-center justify-center font-black", children: "4" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 1829,
                  columnNumber: 19
                }, this),
                "Trwałe Zabezpieczenie"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1828,
                columnNumber: 17
              }, this),
              cascadeState.stage === "FORTIFIED" && /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 1832,
                columnNumber: 56
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1827,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Obszary zablokowane i chronione do całkowitej eksterminacji wszystkich wirusów." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1834,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1822,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1760,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1728,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 1590,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveViewMode("RADAR_PPI"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeViewMode === "RADAR_PPI" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1852,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Radar Wojskowy PPI (Ekran CRT)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1853,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1844,
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
              lineNumber: 1864,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Monolityczna Powierzchnia Systemu & Punkty We/Wy (I/O)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1865,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1856,
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
              lineNumber: 1876,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Dziennik Bojowy Łowcy Gemini (",
              combatLogs.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1877,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1868,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 1843,
      columnNumber: 7
    }, this),
    activeViewMode === "RADAR_PPI" && /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-950 border-2 border-emerald-900/60 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-[520px] aspect-square flex items-center justify-center", children: [
          /* @__PURE__ */ jsxDEV(
            "canvas",
            {
              ref: canvasRef,
              width: 520,
              height: 520,
              onClick: handleCanvasClick,
              className: "rounded-full cursor-crosshair border border-emerald-500/40 shadow-[0_0_50px_rgba(0,255,100,0.15)] w-full h-full"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 1889,
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
                lineNumber: 1900,
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
                lineNumber: 1916,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1899,
            columnNumber: 19
          }, this),
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
                      lineNumber: 1964,
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
                      lineNumber: 1987,
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
                        lineNumber: 2026,
                        columnNumber: 27
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2009,
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
                      lineNumber: 2030,
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
                      lineNumber: 2046,
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
                lineNumber: 1952,
                columnNumber: 23
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 1937,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 text-[10px] font-mono text-emerald-400/90 bg-black/80 px-2.5 py-1 rounded-md border border-emerald-800 shadow-md backdrop-blur-xs flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2063,
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
              lineNumber: 2064,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2062,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 text-[10px] font-mono text-emerald-400/90 bg-black/80 px-2.5 py-1 rounded-md border border-emerald-800 shadow-md backdrop-blur-xs", children: [
            "ZASIĘG: ",
            radarRangeKm,
            " KM"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2067,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-3 left-3 text-[10px] font-mono text-cyan-400 bg-black/80 px-2.5 py-1 rounded-md border border-cyan-800 shadow-md backdrop-blur-xs flex items-center gap-1", children: [
            /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3 h-3 text-cyan-300 animate-spin" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2072,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "ŁOWCA GEMINI: ",
              hunterState.status
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2073,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2071,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 1888,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 w-full p-3.5 bg-slate-900/95 rounded-xl border border-slate-800 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-2.5 flex-wrap gap-1", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2081,
                columnNumber: 21
              }, this),
              "SKALA BARW ZAGROŻENIA GNID (THREAT SCORE SPECTRUM):"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2080,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-emerald-300" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2085,
                columnNumber: 21
              }, this),
              "Pulsowanie Framer-Motion Aktywne"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2084,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2079,
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
                  lineNumber: 2093,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-300 font-bold block text-[11px]", children: "50 - 67% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2099,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-yellow-400/80", children: "Ostrzegawczy (Żółty)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2100,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2098,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2092,
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
                  lineNumber: 2106,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-orange-300 font-bold block text-[11px]", children: "68 - 79% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2112,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-orange-400/80", children: "Podwyższony (Pomarańcz)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2113,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2111,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2105,
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
                  lineNumber: 2119,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-rose-300 font-bold block text-[11px]", children: "80 - 89% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2125,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-rose-400/80", children: "Krytyczny (Czerwony)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2126,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2124,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2118,
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
                  lineNumber: 2132,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-red-300 font-black block text-[11px]", children: "90 - 100% Threat" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2138,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-red-400 font-bold", children: "Jaskrawa Czerwień (Ekstremum)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2139,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2137,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2131,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2090,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2078,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 w-full flex items-center justify-between gap-4 text-xs font-mono px-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Prędkość Skanera:" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2148,
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
                lineNumber: 2149,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
              sweepSpeedRpm,
              " RPM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2157,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2147,
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
                  lineNumber: 2165,
                  columnNumber: 35
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2165,
                  columnNumber: 71
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isScanning ? "Pauza Radaru" : "Wznów Skan" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2166,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2161,
              columnNumber: 19
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2160,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2146,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1886,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 1885,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center p-1 bg-slate-950 rounded-xl border border-emerald-900/60 text-xs font-mono shadow-md", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setRadarListTab("PROCESS_LIST"),
              className: `flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${radarListTab === "PROCESS_LIST" ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md shadow-emerald-950/80" : "text-slate-400 hover:text-emerald-300"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-emerald-300 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2185,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Aktywny Radar: Procesy (",
                  activeGnidasCount,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2186,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2177,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setRadarListTab("TARGET_DOSSIER"),
              className: `flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${radarListTab === "TARGET_DOSSIER" ? "bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-md shadow-purple-950/80" : "text-slate-400 hover:text-purple-300"}`,
              children: [
                /* @__PURE__ */ jsxDEV(Target, { className: "w-3.5 h-3.5 text-purple-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2196,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Dossier Celu ",
                  selectedGnida ? `[${selectedGnida.name.split(" ")[0]}]` : ""
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2197,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2188,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2176,
          columnNumber: 13
        }, this),
        radarListTab === "PROCESS_LIST" ? /* @__PURE__ */ jsxDEV(
          ActiveRadarProcessRoster,
          {
            gnidas,
            selectedTargetId,
            sweepAngle,
            sweepSpeedRpm,
            illuminatedGnidaIds,
            isForceRefreshing,
            onSelectTarget: (id) => {
              setSelectedTargetId(id);
              playRadarTone(900, 100, "sine");
            },
            onTriggerOmniScan: handleTriggerRadarOmniScan,
            onSpawnGnida: handleSpawnCustomGnida,
            onTriggerCascade: triggerAntivirusCascade,
            onOpenDossier: (id) => {
              setSelectedTargetId(id);
              setRadarListTab("TARGET_DOSSIER");
            },
            systemIntegrityPercent
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2203,
            columnNumber: 15
          },
          this
        ) : selectedGnida ? (() => {
          const selScore = getGnidaThreatScore(selectedGnida);
          const selColorCfg = getThreatColor(selScore);
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "p-5 rounded-2xl bg-slate-900/90 border shadow-xl space-y-4 transition-all",
              style: {
                borderColor: selColorCfg.hex,
                boxShadow: `0 0 24px ${selColorCfg.glowHex}`
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
                          lineNumber: 2240,
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
                              lineNumber: 2256,
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
                          lineNumber: 2250,
                          columnNumber: 27
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2239,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white mt-1.5", children: selectedGnida.name }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2260,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2238,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-right font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 block", children: "Status na Radarze:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2266,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `text-xs font-bold ${selectedGnida.state === "ZNISZCZONA" ? "text-slate-500" : "text-red-400"}`, children: selectedGnida.state }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2267,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2265,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2237,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Poziom Zagrożenia (Threat Gauge):" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2276,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "font-black", style: { color: selColorCfg.hex }, children: [
                      selScore,
                      "% • ",
                      selColorCfg.label
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2277,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2275,
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
                      lineNumber: 2282,
                      columnNumber: 25
                    },
                    this
                  ) }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2281,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[9px] font-mono text-slate-500 pt-0.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "50% Żółty" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2292,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "70% Pomarańcz" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2293,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "85% Czerwień" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2294,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "100% Jaskrawa" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2295,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2291,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2274,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2 text-center text-xs font-mono", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Azymut" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2302,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
                      selectedGnida.bearingDeg,
                      "°"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2303,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2301,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Zasięg" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2306,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: [
                      Math.round(selectedGnida.distanceRatio * 100),
                      " km"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2307,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2305,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: "Zdrowie Gnidy" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2310,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold", children: [
                      selectedGnida.healthPercent,
                      "%"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2311,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2309,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2300,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5 text-xs", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Proces Gnidy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2318,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: selectedGnida.activeProcessName }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2319,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2317,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Zainfekowany Węzeł:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2322,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-400 font-bold", children: selectedGnida.associatedIONodeId }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2323,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2321,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between font-mono text-[10px]", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "SHA-256:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2326,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
                      selectedGnida.signatureSha.slice(0, 16),
                      "..."
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2327,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2325,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2316,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 text-xs", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-red-950/20 border border-red-900/40 text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400 block mb-1 font-mono", children: "Mechanizm Agresji Gnidy:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2334,
                      columnNumber: 25
                    }, this),
                    selectedGnida.aggressionDescription
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2333,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-slate-300", children: [
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-400 block mb-1 font-mono", children: "Sposób Wniknięcia (Wektor Infekcji):" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2339,
                      columnNumber: 25
                    }, this),
                    selectedGnida.infectionVector
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2338,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2332,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => setHornetModalOpen(true),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-2.5 rounded-xl text-xs sm:text-sm font-black font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white shadow-amber-950/60 border border-amber-300/40 animate-pulse active:scale-95"}`,
                      title: "Wypuść Rój Dzikich Afrykańskich Szerszeni na wybraną gnidę",
                      children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "text-base", children: "🐝" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2356,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Wypuść Rój Afrykańskich Szerszeni na Gnidę" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2357,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2346,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => triggerAntivirusCascade(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-3 rounded-xl text-xs sm:text-sm font-bold font-mono flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white shadow-emerald-950/60 border border-emerald-400/50"}`,
                      children: [
                        /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-200" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2369,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: selectedGnida.state === "ZNISZCZONA" ? "Sektor Zabezpieczony Barierą" : `Likwiduj & Uruchom Kaskadę (0ms ➔ Laser ➔ Warstwy)` }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2370,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2360,
                      columnNumber: 23
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleOrderHunterSlaughter(selectedGnida),
                      disabled: selectedGnida.state === "ZNISZCZONA",
                      className: `w-full py-2 rounded-xl text-xs font-bold font-mono flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${selectedGnida.state === "ZNISZCZONA" ? "bg-slate-800/40 text-slate-600 cursor-not-allowed border border-slate-800" : "bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white shadow-red-950/60 border border-red-400/40"}`,
                      children: [
                        /* @__PURE__ */ jsxDEV(Target, { className: "w-3.5 h-3.5" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2386,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Standardowy Ubój Łowcy Gemini" }, void 0, false, {
                          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                          lineNumber: 2387,
                          columnNumber: 25
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2377,
                      columnNumber: 23
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2345,
                  columnNumber: 21
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2230,
              columnNumber: 19
            },
            this
          );
        })() : /* @__PURE__ */ jsxDEV("div", { className: "p-8 text-center bg-slate-900/60 rounded-2xl border border-slate-800 text-slate-400 text-xs", children: "Wybierz Gnidę na radarze, aby zobaczyć szczegóły taktyczne." }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2394,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-cyan-950/40 to-slate-950 border border-cyan-800/40 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2403,
                columnNumber: 19
              }, this),
              "POSTĘP PRAC ŁOWCY GEMINI AI:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2402,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: [
              hunterState.repairProgress,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2406,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2401,
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
              lineNumber: 2411,
              columnNumber: 17
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2410,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[11px] font-mono text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Zlikwidowane Gnidy: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: hunterState.killsCount }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2418,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2418,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Uleczone Węzły I/O: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: hunterState.fixedNodesCount }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2419,
                columnNumber: 43
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2419,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2417,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2400,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2174,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-12 mt-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2429,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kaskadowa Ochrona 4 Warstw Monolitu & Siatka Laserowa" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2430,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2428,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-0.5", children: "Każdy oczyszczony z Gnid obszar zostaje natychmiast zabezpieczony kordonem antywirusowym, następnie laserem sektorowym, a na koniec kaskadowo wiąże sąsiednie warstwy do momentu całkowitej eksterminacji malware." }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2432,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2427,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-mono font-bold", children: [
            "Suma Ochrony: ",
            cascadeState.overallFortressShieldPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2438,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2437,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2426,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 font-mono text-xs", children: securedLayers.map((layer) => {
          const stageColor = layer.stage === "IMMEDIATE_LOCK" ? "border-emerald-500 bg-emerald-950/30" : layer.stage === "SECTOR_LASER" ? "border-cyan-500 bg-cyan-950/30" : layer.stage === "NEIGHBOR_CASCADE" ? "border-teal-500 bg-teal-950/30" : layer.isSecured ? "border-emerald-700 bg-slate-950/90" : "border-slate-800 bg-slate-950/60";
          return /* @__PURE__ */ jsxDEV("div", { className: `p-3.5 rounded-xl border ${stageColor} space-y-2.5 transition-all`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900 border border-slate-700 text-slate-300", children: layer.depthRangeKm }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2459,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-bold ${layer.isSecured ? "text-emerald-400" : "text-slate-500"}`, children: layer.isSecured ? "ZABEZPIECZONA" : "NIEAKTYWNA" }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2462,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2458,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-white text-xs", children: layer.name }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2468,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 block mt-0.5", children: layer.description }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2471,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2467,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between text-[10px]", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Moc Tarczy:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2479,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: [
                  layer.shieldPercent,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2480,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2478,
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
                  lineNumber: 2483,
                  columnNumber: 25
                },
                this
              ) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2482,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2477,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 text-[10px] space-y-1 text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Wiązki laserowe:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2492,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: [
                  layer.activeBeamsCount,
                  " laserów"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2493,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2491,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Oczyszczone węzły:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2496,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-bold", children: [
                  layer.cleansedNodesCount,
                  " pkt"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2497,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2495,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Etap Kaskady:" }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2500,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: layer.stage }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2501,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2499,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2490,
              columnNumber: 21
            }, this)
          ] }, layer.layerIndex, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2457,
            columnNumber: 19
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2444,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2425,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 1883,
      columnNumber: 9
    }, this),
    activeViewMode === "MONOLITH_SURFACE" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Monitor, { className: "w-5 h-5 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2519,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Monolityczna Powierzchnia Systemu z Węzłami Wejścia i Wyjścia (I/O)" }, void 0, false, {
              fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
              lineNumber: 2520,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2518,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Pulpit nawigacyjny monitora stanowi centralny punkt wyjściowy interakcji człowieka z maszyną. Zabezpieczono wszystkie magistrale i porty przed penetracją Gnid." }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2522,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2517,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800", children: "9 Zmapowanych Węzłów I/O" }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2528,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2527,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2516,
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
                lineNumber: 2553,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold px-1.5 py-0.2 bg-slate-900 rounded border border-slate-700 text-slate-300", children: node.code }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2561,
                    columnNumber: 27
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.2 rounded bg-purple-950 text-purple-300", children: node.type }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2564,
                    columnNumber: 27
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2560,
                  columnNumber: 25
                }, this),
                /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white mt-1", children: node.name }, void 0, false, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2568,
                  columnNumber: 25
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2559,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2558,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 leading-relaxed", children: node.description }, void 0, false, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2574,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 space-y-1 text-xs font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Przepustowość:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2580,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: node.trafficBandwidth }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2581,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2579,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Stan Ochrony:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2584,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: isCompromised ? "text-red-400 font-bold" : "text-emerald-400", children: node.status }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2585,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2583,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px]", children: "Bariera:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2590,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 truncate max-w-[160px]", title: node.protectingBarrier, children: node.protectingBarrier }, void 0, false, {
                    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                    lineNumber: 2591,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2589,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                lineNumber: 2578,
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
                      lineNumber: 2607,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Rekonstruuj Węzeł Jednym Kliknięciem" }, void 0, false, {
                      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                      lineNumber: 2608,
                      columnNumber: 25
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
                  lineNumber: 2599,
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
            lineNumber: 2548,
            columnNumber: 19
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2535,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2515,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2514,
      columnNumber: 9
    }, this),
    activeViewMode === "COMBAT_LOGS" && /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
          /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2624,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Bojowy & Telemetria Likwidacji Gnid" }, void 0, false, {
            fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
            lineNumber: 2625,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
          lineNumber: 2623,
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
            lineNumber: 2627,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2622,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-black font-mono text-xs text-emerald-300 space-y-1.5 max-h-96 overflow-y-auto border border-emerald-950", children: combatLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("[ALARM") || log.includes("[OSTRZAŁ") ? "text-red-400" : log.includes("[EKSTERMINACJA") || log.includes("[SEKTOR") ? "text-yellow-300 font-bold" : "text-slate-300", children: log }, idx, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2637,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2635,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
      lineNumber: 2621,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      AfricanHornetSwarmModal,
      {
        isOpen: hornetModalOpen,
        onClose: () => setHornetModalOpen(false),
        targetGnidaName: selectedGnida?.activeProcessName || "gnida_radar_target.exe",
        targetPid: Math.floor(1e3 + Math.random() * 8e3),
        onDecapitationComplete: () => {
          if (selectedGnida) triggerAntivirusCascade(selectedGnida);
          setHornetModalOpen(false);
        }
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
        lineNumber: 2646,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/MilitaryRadarScanner.tsx",
    lineNumber: 1588,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1pbGl0YXJ5UmFkYXJTY2FubmVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VNZW1vLCB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBcbiAgQ3Jvc3NoYWlyLCBTa3VsbCwgU2hpZWxkLCBTaGllbGRBbGVydCwgU2hpZWxkQ2hlY2ssIFphcCwgQWN0aXZpdHksIFxuICBWb2x1bWUyLCBWb2x1bWVYLCBQbGF5LCBQYXVzZSwgUmVmcmVzaEN3LCBFeWUsIE1vbml0b3IsIENwdSwgXG4gIEhhcmREcml2ZSwgV2lmaSwgUmFkaW8sIFNsaWRlcnMsIENoZWNrQ2lyY2xlMiwgQWxlcnRUcmlhbmdsZSwgTGF5ZXJzLFxuICBUZXJtaW5hbCwgVGFyZ2V0LCBGbGFtZSwgQ2hldnJvblJpZ2h0LCBMb2NrLCBVbmxvY2ssIFNwYXJrbGVzLCBGaWx0ZXIsXG4gIEFsZXJ0Q2lyY2xlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBcbiAgR25pZGFTdGF0ZSwgR25pZGFUeXBlLCBSYWRhckduaWRhVGFyZ2V0LCBTeXN0ZW1JT05vZGUsIEdlbWluaUh1bnRlclJhZGFyU3RhdGUsXG4gIEFudGl2aXJ1c0JhcnJpZXJTdGFnZSwgU2VjdXJlZExheWVyWm9uZSwgQW50aXZpcnVzQ2FzY2FkZVN0YXRlIFxufSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3IsIFNlbnNvckF1dG9tYXRvblN0YXR1cyB9IGZyb20gJy4uL3V0aWxzL2duaWRhQXV0b0ZyZWV6ZVNlbnNvcic7XG5pbXBvcnQgeyBBZnJpY2FuSG9ybmV0U3dhcm1Nb2RhbCB9IGZyb20gJy4vQWZyaWNhbkhvcm5ldFN3YXJtTW9kYWwnO1xuaW1wb3J0IHsgQWN0aXZlUmFkYXJQcm9jZXNzUm9zdGVyIH0gZnJvbSAnLi9BY3RpdmVSYWRhclByb2Nlc3NSb3N0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIFRocmVhdENvbG9yQ29uZmlnIHtcbiAgaGV4OiBzdHJpbmc7XG4gIGdsb3dIZXg6IHN0cmluZztcbiAgdGFpbHdpbmRUZXh0OiBzdHJpbmc7XG4gIHRhaWx3aW5kQm9yZGVyOiBzdHJpbmc7XG4gIHRhaWx3aW5kQmc6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbiAgcHVsc2VEdXJhdGlvbjogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R25pZGFUaHJlYXRTY29yZShnbmlkYTogUmFkYXJHbmlkYVRhcmdldCk6IG51bWJlciB7XG4gIGlmICh0eXBlb2YgZ25pZGEudGhyZWF0U2NvcmUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMSwgZ25pZGEudGhyZWF0U2NvcmUpKTtcbiAgfVxuICBzd2l0Y2ggKGduaWRhLnRocmVhdExldmVsKSB7XG4gICAgY2FzZSAnRUtTVFJFTUFMTlknOlxuICAgICAgcmV0dXJuIDk2O1xuICAgIGNhc2UgJ0tSWVRZQ1pOWSc6XG4gICAgICByZXR1cm4gODQ7XG4gICAgY2FzZSAnV1lTT0tJJzpcbiAgICAgIHJldHVybiA3NDtcbiAgICBjYXNlICdTUkVETkknOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gNTg7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRocmVhdENvbG9yKHNjb3JlOiBudW1iZXIpOiBUaHJlYXRDb2xvckNvbmZpZyB7XG4gIGlmIChzY29yZSA+PSA5MCkge1xuICAgIC8vIEphc2tyYXdhIEN6ZXJ3aWXFhCAvIEJsYXppbmcgTmVvbiBSZWQgKDkwIC0gMTAwJSlcbiAgICByZXR1cm4ge1xuICAgICAgaGV4OiAnI2ZmMDAzYycsXG4gICAgICBnbG93SGV4OiAncmdiYSgyNTUsIDAsIDYwLCAwLjk1KScsXG4gICAgICB0YWlsd2luZFRleHQ6ICd0ZXh0LXJlZC01MDAnLFxuICAgICAgdGFpbHdpbmRCb3JkZXI6ICdib3JkZXItcmVkLTUwMCcsXG4gICAgICB0YWlsd2luZEJnOiAnYmctcmVkLTUwMC8yMCcsXG4gICAgICBsYWJlbDogJ0VLU1RSRU1BTE5ZICg5MC0xMDAlKScsXG4gICAgICBwdWxzZUR1cmF0aW9uOiAwLjc1XG4gICAgfTtcbiAgfSBlbHNlIGlmIChzY29yZSA+PSA4MCkge1xuICAgIC8vIEN6ZXJ3b255IFN6a2FyxYJhdCAvIFJvc2UtQ3JpbXNvbiAoODAgLSA4OSUpXG4gICAgcmV0dXJuIHtcbiAgICAgIGhleDogJyNmNDNmNWUnLFxuICAgICAgZ2xvd0hleDogJ3JnYmEoMjQ0LCA2MywgOTQsIDAuODUpJyxcbiAgICAgIHRhaWx3aW5kVGV4dDogJ3RleHQtcm9zZS01MDAnLFxuICAgICAgdGFpbHdpbmRCb3JkZXI6ICdib3JkZXItcm9zZS01MDAnLFxuICAgICAgdGFpbHdpbmRCZzogJ2JnLXJvc2UtNTAwLzIwJyxcbiAgICAgIGxhYmVsOiAnS1JZVFlDWk5ZICg4MC04OSUpJyxcbiAgICAgIHB1bHNlRHVyYXRpb246IDEuMDVcbiAgICB9O1xuICB9IGVsc2UgaWYgKHNjb3JlID49IDY4KSB7XG4gICAgLy8gUG9tYXJhxYRjem93eSAvIE5lb24gQW1iZXItT3JhbmdlICg2OCAtIDc5JSlcbiAgICByZXR1cm4ge1xuICAgICAgaGV4OiAnI2Y5NzMxNicsXG4gICAgICBnbG93SGV4OiAncmdiYSgyNDksIDExNSwgMjIsIDAuOCknLFxuICAgICAgdGFpbHdpbmRUZXh0OiAndGV4dC1vcmFuZ2UtNDAwJyxcbiAgICAgIHRhaWx3aW5kQm9yZGVyOiAnYm9yZGVyLW9yYW5nZS01MDAnLFxuICAgICAgdGFpbHdpbmRCZzogJ2JnLW9yYW5nZS01MDAvMjAnLFxuICAgICAgbGFiZWw6ICdXWVNPS0kgKDY4LTc5JSknLFxuICAgICAgcHVsc2VEdXJhdGlvbjogMS40NVxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgLy8gxbvDs8WCdHkgLyBOZW9uIFdhcm5pbmcgWWVsbG93ICg1MCAtIDY3JSlcbiAgICByZXR1cm4ge1xuICAgICAgaGV4OiAnI2ZhY2MxNScsXG4gICAgICBnbG93SGV4OiAncmdiYSgyNTAsIDIwNCwgMjEsIDAuNzUpJyxcbiAgICAgIHRhaWx3aW5kVGV4dDogJ3RleHQteWVsbG93LTQwMCcsXG4gICAgICB0YWlsd2luZEJvcmRlcjogJ2JvcmRlci15ZWxsb3ctNTAwJyxcbiAgICAgIHRhaWx3aW5kQmc6ICdiZy15ZWxsb3ctNTAwLzIwJyxcbiAgICAgIGxhYmVsOiAnT1NUUlpFR0FXQ1pZICg1MC02NyUpJyxcbiAgICAgIHB1bHNlRHVyYXRpb246IDEuOVxuICAgIH07XG4gIH1cbn1cblxuLy8gSW5pY2phbG5lIDQgS29uY2VudHJ5Y3puZSBXYXJzdHd5IE9jaHJvbm5lIE1vbm9saXR1IFN5c3RlbW93ZWdvXG5leHBvcnQgY29uc3QgSU5JVElBTF9TRUNVUkVEX0xBWUVSUzogU2VjdXJlZExheWVyWm9uZVtdID0gW1xuICB7XG4gICAgbGF5ZXJJbmRleDogMCxcbiAgICBuYW1lOiAnV2Fyc3R3YSAwOiBSZHplxYQgTW9ub2xpdHUgKEtlcm5lbCBOVCBSaW5nLTApJyxcbiAgICBkZXB0aFJhbmdlS206ICcwIC0gMjUgS00nLFxuICAgIG1pbkRpc3RhbmNlOiAwLFxuICAgIG1heERpc3RhbmNlOiAwLjI1LFxuICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogNCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDEsXG4gICAgZGVzY3JpcHRpb246ICdDZW50cmFsbmUgasSFZHJvIG9wZXJhY3lqbmUsIERpc3BhdGNoZXIgc3lzY2FsbCBpIEtlcm5lbCBHdWFyZC4nXG4gIH0sXG4gIHtcbiAgICBsYXllckluZGV4OiAxLFxuICAgIG5hbWU6ICdXYXJzdHdhIDE6IFBhbWnEmcSHIFJBTSAmIE1hZ2lzdHJhbGUgTWFnaXN0cmFsbmUnLFxuICAgIGRlcHRoUmFuZ2VLbTogJzI1IC0gNTAgS00nLFxuICAgIG1pbkRpc3RhbmNlOiAwLjI1LFxuICAgIG1heERpc3RhbmNlOiAwLjUwLFxuICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogNCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDIsXG4gICAgZGVzY3JpcHRpb246ICdTenluYSBwYW1pxJljaSBSQU0gRERSNSwgc3RyZWZ5IERMTCBpIHBpYXNrb3duaWNhIE50U3VzcGVuZFByb2Nlc3MuJ1xuICB9LFxuICB7XG4gICAgbGF5ZXJJbmRleDogMixcbiAgICBuYW1lOiAnV2Fyc3R3YSAyOiBQdWxwaXQgTW9uaXRvcmEgJiBVcnrEhWR6ZW5pYSBJL08gKEhJRCknLFxuICAgIGRlcHRoUmFuZ2VLbTogJzUwIC0gNzUgS00nLFxuICAgIG1pbkRpc3RhbmNlOiAwLjUwLFxuICAgIG1heERpc3RhbmNlOiAwLjc1LFxuICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogNCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDMsXG4gICAgZGVzY3JpcHRpb246ICdCdWZvciByYW1raSBEV00sIHB1bHBpdCBtb25pdG9yYSwga2xhd2lhdHVyYSBpIHdza2HFum5payBteXN6eS4nXG4gIH0sXG4gIHtcbiAgICBsYXllckluZGV4OiAzLFxuICAgIG5hbWU6ICdXYXJzdHdhIDM6IFBlcnltZXRyIFNpZWNpb3d5IE5JQyAmIE1hZ2F6eW4gTlZNZScsXG4gICAgZGVwdGhSYW5nZUttOiAnNzUgLSAxMDAgS00nLFxuICAgIG1pbkRpc3RhbmNlOiAwLjc1LFxuICAgIG1heERpc3RhbmNlOiAxLjAwLFxuICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICBzdGFnZTogJ0ZPUlRJRklFRCcsXG4gICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgYWN0aXZlQmVhbXNDb3VudDogNCxcbiAgICBjbGVhbnNlZE5vZGVzQ291bnQ6IDMsXG4gICAgZGVzY3JpcHRpb246ICdaZXduxJl0cnpueSBwZXJ5bWV0ciBzaWVjaW93eSwgemFwb3JhIFdGUCBpIHN5c3RlbSBwbGlrw7N3IGR5c2tvd3ljaCBOVEZTLidcbiAgfVxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldExheWVySW5kZXhGb3JEaXN0YW5jZShkaXN0YW5jZVJhdGlvOiBudW1iZXIpOiBudW1iZXIge1xuICBpZiAoZGlzdGFuY2VSYXRpbyA8PSAwLjI1KSByZXR1cm4gMDtcbiAgaWYgKGRpc3RhbmNlUmF0aW8gPD0gMC41MCkgcmV0dXJuIDE7XG4gIGlmIChkaXN0YW5jZVJhdGlvIDw9IDAuNzUpIHJldHVybiAyO1xuICByZXR1cm4gMztcbn1cblxuLy8gSW5pY2phbG5lIHB1bmt0eSB3ZWrFm2NpYSBpIHd5asWbY2lhIG1vbm9saXR1IHN5c3RlbW93ZWdvXG5jb25zdCBJTklUSUFMX1NZU1RFTV9JT19OT0RFUzogU3lzdGVtSU9Ob2RlW10gPSBbXG4gIHtcbiAgICBpZDogJ25vZGUtbW9uaXRvcicsXG4gICAgbmFtZTogJ01vbml0b3IgJiBCdWZvciBSYW1raSAoRGlzcGxheSBQaXBlbGluZSknLFxuICAgIGNvZGU6ICdPVVQtRFdNLTAxJyxcbiAgICB0eXBlOiAnT1VUUFVUJyxcbiAgICBkZXNjcmlwdGlvbjogJ0ludGVncmFsbnkgcHVscGl0IG5hd2lnYWN5am55LCBtZW5lZMW8ZXIgb2tpZW4gRFdNLCBEaXJlY3QzRCBpIHN0cnVtaWXFhCBwaWtzZWxpIG5hIGVrcmFuLicsXG4gICAgc3RhdHVzOiAnUkVDT05TVFJVQ1RFRCcsXG4gICAgeFJhdGlvOiA1MCxcbiAgICB5UmF0aW86IDE4LFxuICAgIHJhZGFyQW5nbGVEZWc6IDAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjcyLFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICc0SyBAIDE0NEh6ICgxOC4yIEdicHMpJyxcbiAgICBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbCxcbiAgICBwcm90ZWN0aW5nQmFycmllcjogJ1RvcE1vc3QgV2luZG93IEJhcnJpZXIgJiBEaXJlY3RGbGlwIFNhbmRib3gnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDIsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLWtleWJvYXJkJyxcbiAgICBuYW1lOiAnS2xhd2lhdHVyYSAmIFN1cm93eSBTdHJ1bWllxYQgSElEIChSYXcgSW5wdXQpJyxcbiAgICBjb2RlOiAnSU4tS0JELTAyJyxcbiAgICB0eXBlOiAnSU5QVVQnLFxuICAgIGRlc2NyaXB0aW9uOiAnU3Rlcm93bmlrIGk4MDQycHJ0L1VTQiBISUQsIHDEmXRsYSB6ZGFyemXFhCBrbGF3aXN6eSBpIGtvbGVqa2EgV01fS0VZRE9XTi4nLFxuICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgIHhSYXRpbzogMjIsXG4gICAgeVJhdGlvOiAzOCxcbiAgICByYWRhckFuZ2xlRGVnOiAzMTAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjY1LFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICcxMDAwIEh6IFBvbGxpbmcgKDY0IEIvcyknLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnV0hfS0VZQk9BUkQgSG9vayBEZWZsZWN0b3InLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDIsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLW1vdXNlJyxcbiAgICBuYW1lOiAnTXlzeiAmIFdza2HFum5payBFa3Jhbm93eSAoUG9pbnRlciBFbmdpbmUpJyxcbiAgICBjb2RlOiAnSU4tUFRSLTAzJyxcbiAgICB0eXBlOiAnSU5QVVQnLFxuICAgIGRlc2NyaXB0aW9uOiAnS3Vyc29yIGVrcmFub3d5LCBwcnplY2h3eXR5d2FuaWUgZm9rdXN1IG15c3p5IGkgZ3JhbmljZSBDbGlwQ3Vyc29yLicsXG4gICAgc3RhdHVzOiAnT1BUSU1BTCcsXG4gICAgeFJhdGlvOiA3OCxcbiAgICB5UmF0aW86IDM4LFxuICAgIHJhZGFyQW5nbGVEZWc6IDUwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC42NSxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnODAwMCBEUEkgKDEyOCBCL3MpJyxcbiAgICBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbCxcbiAgICBwcm90ZWN0aW5nQmFycmllcjogJ0ZvY3VzIFRoZWZ0IE5ldXRyYWxpemVyJyxcbiAgICBzaGllbGRMYXllckluZGV4OiAyLFxuICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1uaWMnLFxuICAgIG5hbWU6ICdLYXJ0YSBTaWVjaW93YSBOSUMgJiBHbmlhemRhIFRDUC9VRFAnLFxuICAgIGNvZGU6ICdJTy1OSUMtMDQnLFxuICAgIHR5cGU6ICdJTlBVVF9PVVRQVVQnLFxuICAgIGRlc2NyaXB0aW9uOiAnSW50ZXJmZWpzIHNpZWNpb3d5LCB3ZWrFm2NpZSBwYWtpZXTDs3cgeiBpbnRlcm5ldHUgaSB3eWrFm2NpZSBla3NmaWx0cmFjamkgdGVsZW1ldHJ5Y3puZWouJyxcbiAgICBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyxcbiAgICB4UmF0aW86IDE1LFxuICAgIHlSYXRpbzogNjUsXG4gICAgcmFkYXJBbmdsZURlZzogMjMwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC44NSxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnMi41IEdicHMgRnVsbC1EdXBsZXgnLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnV0ZQIEtlcm5lbCBQYWNrZXQgRmlyZXdhbGwnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDMsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLXJhbScsXG4gICAgbmFtZTogJ1N6eW5hIFBhbWnEmWNpIFJBTSAmIE1vc3RlayBQYW1pxJljaSBIb3N0JyxcbiAgICBjb2RlOiAnQlVTLVJBTS0wNScsXG4gICAgdHlwZTogJ0NPUkVfQlVTJyxcbiAgICBkZXNjcmlwdGlvbjogJ01hZ2lzdHJhbGEgcGFtacSZY2kgb3BlcmFjeWpuZWogRERSNSwgcHJ6ZXN0cnplxYQgYWRyZXNvd2EgasSFZHJhIGkgYnVmb3Igd3N0cnp5a25pxJnEhyBETEwuJyxcbiAgICBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyxcbiAgICB4UmF0aW86IDUwLFxuICAgIHlSYXRpbzogNTAsXG4gICAgcmFkYXJBbmdsZURlZzogMTgwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC4zNSxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnNjQgR0IvcyAoRERSNS02MDAwKScsXG4gICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgcHJvdGVjdGluZ0JhcnJpZXI6ICdOdFN1c3BlbmRQcm9jZXNzIE1lbW9yeSBTYW5kYm94JyxcbiAgICBzaGllbGRMYXllckluZGV4OiAxLFxuICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1zdG9yYWdlJyxcbiAgICBuYW1lOiAnU3Vic3lzdGVtIER5c2tvd3kgTlZNZSAmIFN5c3RlbSBQbGlrw7N3IE5URlMnLFxuICAgIGNvZGU6ICdJTy1OVk1FLTA2JyxcbiAgICB0eXBlOiAnSU5QVVRfT1VUUFVUJyxcbiAgICBkZXNjcmlwdGlvbjogJ1BhbWnEmcSHIG1hc293YSwgb2Rjenl0IGkgemFwaXMgcGxpa8OzdyB3eWtvbnl3YWxueWNoIFBFLCB0YWJsaWNlIE1CUi9HUFQuJyxcbiAgICBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyxcbiAgICB4UmF0aW86IDg1LFxuICAgIHlSYXRpbzogNjUsXG4gICAgcmFkYXJBbmdsZURlZzogMTMwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC44MixcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnNzQwMCBNQi9zIFJlYWQgLyA2ODAwIE1CL3MgV3JpdGUnLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnUEUgSGVhZGVyIFNhYm90YWdlICYgaWNhY2xzIFF1YXJhbnRpbmUnLFxuICAgIHNoaWVsZExheWVySW5kZXg6IDMsXG4gICAgaXNTaGllbGRlZDogdHJ1ZVxuICB9LFxuICB7XG4gICAgaWQ6ICdub2RlLXVzYicsXG4gICAgbmFtZTogJ01hZ2lzdHJhbGEgVVNCICYgUG9ydHkgUGVyeWZlcnlqbmUnLFxuICAgIGNvZGU6ICdJTy1VU0ItMDcnLFxuICAgIHR5cGU6ICdJTlBVVF9PVVRQVVQnLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9ydHkgemV3bsSZdHJ6bmUgVVNCLUMgLyBUaHVuZGVyYm9sdCwgd2VrdG9yeSBmaXp5Y3puZWdvIHdwcm93YWR6YW5pYSBkYW55Y2guJyxcbiAgICBzdGF0dXM6ICdPUFRJTUFMJyxcbiAgICB4UmF0aW86IDMwLFxuICAgIHlSYXRpbzogODIsXG4gICAgcmFkYXJBbmdsZURlZzogMjAwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC41OCxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnVVNCIDQuMCAoNDAgR2JwcyknLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnVVNCIERldmljZSBEZXNjcmlwdG9yIEZpbHRlcicsXG4gICAgc2hpZWxkTGF5ZXJJbmRleDogMixcbiAgICBpc1NoaWVsZGVkOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBpZDogJ25vZGUtYXVkaW8nLFxuICAgIG5hbWU6ICdLYXJ0YSBExbp3acSZa293YSAmIFByemV0d29ybmlrIEF1ZGlvIERBQycsXG4gICAgY29kZTogJ09VVC1BVUQtMDgnLFxuICAgIHR5cGU6ICdPVVRQVVQnLFxuICAgIGRlc2NyaXB0aW9uOiAnV3lqxZtjaWUgc3lnbmHFgsOzdyBha3VzdHljem55Y2gsIHN5bnRldHljem5lIGFsYXJteSBib2pvd2UgaSBidWZvciBkxbp3acSZa293eS4nLFxuICAgIHN0YXR1czogJ09QVElNQUwnLFxuICAgIHhSYXRpbzogNzAsXG4gICAgeVJhdGlvOiA4MixcbiAgICByYWRhckFuZ2xlRGVnOiAxNjAsXG4gICAgcmFkYXJSaW5nUmFkaXVzOiAwLjU4LFxuICAgIHRyYWZmaWNCYW5kd2lkdGg6ICczMi1iaXQgLyAxOTIga0h6IChIRCBBdWRpbyknLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnV0FTQVBJIEV4Y2x1c2l2ZSBTdHJlYW0gU2hpZWxkJyxcbiAgICBzaGllbGRMYXllckluZGV4OiAyLFxuICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgfSxcbiAge1xuICAgIGlkOiAnbm9kZS1rZXJuZWwnLFxuICAgIG5hbWU6ICdEeXNwb3p5dG9yIErEhWRyYSAmIFDEmXRsYSBLb211bmlrYXTDs3cgV2luMzInLFxuICAgIGNvZGU6ICdDT1JFLU5ULTAwJyxcbiAgICB0eXBlOiAnQ09SRV9CVVMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ2VudHJhbG55IHJkemXFhCBtb25vbGl0eWN6bnksIG9ic8WCdWdhIHd5d2/FgmHFhCBzeXN0ZW1vd3ljaCBzeXNjYWxsIGkga29sZWprYSBHZXRNZXNzYWdlLicsXG4gICAgc3RhdHVzOiAnT1BUSU1BTCcsXG4gICAgeFJhdGlvOiA1MCxcbiAgICB5UmF0aW86IDM1LFxuICAgIHJhZGFyQW5nbGVEZWc6IDkwLFxuICAgIHJhZGFyUmluZ1JhZGl1czogMC4yMCxcbiAgICB0cmFmZmljQmFuZHdpZHRoOiAnUmluZyAwIERpc3BhdGNoZXIgKDAuMSBucyknLFxuICAgIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsLFxuICAgIHByb3RlY3RpbmdCYXJyaWVyOiAnUGF0Y2hHdWFyZCAmIEtlcm5lbCBHdWFyZCBCYXJyaWVyJyxcbiAgICBzaGllbGRMYXllckluZGV4OiAwLFxuICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgfVxuXTtcblxuLy8gSW5pY2phbG5hIGVza2FkcmEgR25pZCAoV3N6eXN0a2llIHpsaWt3aWRvd2FuZSB6Z29kbmllIHogcG9sZWNlbmllbSBcImZpcnN0IGtpbGwgZ25pZGFzXCIpXG5jb25zdCBJTklUSUFMX1JBREFSX0dOSURBUzogUmFkYXJHbmlkYVRhcmdldFtdID0gW1xuICB7XG4gICAgaWQ6ICdnbmlkYS0wMScsXG4gICAgbmFtZTogJ0duaWRhLTAxIFtOYWvFgmFka2EgRWtyYW5vd2EgRmx1dHRlcl0nLFxuICAgIGduaWRhVHlwZTogJ0dOSURBX0VLUkFOT1dBJyxcbiAgICB0eXBlTGFiZWw6ICdHbmlkYSBFa3Jhbm93YSAoU2NyZWVuIExvY2tlciknLFxuICAgIGJlYXJpbmdEZWc6IDE1LFxuICAgIGRpc3RhbmNlUmF0aW86IDAuNzIsXG4gICAgYWx0aXR1ZGVLbTogMTIuNCxcbiAgICB0aHJlYXRMZXZlbDogJ0VLU1RSRU1BTE5ZJyxcbiAgICB0aHJlYXRTY29yZTogOTYsXG4gICAgc3RhdGU6ICdaTklTWkNaT05BJyxcbiAgICBoZWFsdGhQZXJjZW50OiAwLFxuICAgIGFzc29jaWF0ZWRJT05vZGVJZDogJ25vZGUtbW9uaXRvcicsXG4gICAgc2lnbmF0dXJlU2hhOiAnZTNiMGM0NDI5OGZjMWMxNDlhZmJmNGM4OTk2ZmI5MjQyN2FlNDFlNDY0OWI5MzRjYTQ5NTk5MWI3ODUyYjg1NScsXG4gICAgYWN0aXZlUHJvY2Vzc05hbWU6ICdmbHV0dGVyX3NjcmVlbl9oaWphY2suZXhlJyxcbiAgICBhZ2dyZXNzaW9uRGVzY3JpcHRpb246ICdXeW11c3phxYJhIHN0YcWCZSBva25vIEhXTkRfVE9QTU9TVCBuYSBtb25pdG9yemUuIFpuZXV0cmFsaXpvd2FuYSwgbmFnxYLDs3dlayBQRSB3eXplcm93YW55LCBrb3Jkb24gcG9zdGF3aW9ueS4nLFxuICAgIGluZmVjdGlvblZlY3RvcjogJ1phaW5mZWtvd2FuYSBiaWJsaW90ZWthIGtvbXBvbmVudMOzdyBva2llbmtvd3ljaCBwdWIuZGV2IC8gU3VwcGx5IENoYWluJyxcbiAgICB2ZWxvY2l0eTogNDIwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2duaWRhLTAyJyxcbiAgICBuYW1lOiAnR25pZGEtMDIgW1N6eWZyYXRvciBNYXNvd3kgQmxhY2tDYXRdJyxcbiAgICBnbmlkYVR5cGU6ICdHTklEQV9TWllGUlVKQUNBJyxcbiAgICB0eXBlTGFiZWw6ICdHbmlkYSBTenlmcnVqxIVjYSAoUmFuc29td2FyZSknLFxuICAgIGJlYXJpbmdEZWc6IDEzNSxcbiAgICBkaXN0YW5jZVJhdGlvOiAwLjgwLFxuICAgIGFsdGl0dWRlS206IDE4LjIsXG4gICAgdGhyZWF0TGV2ZWw6ICdFS1NUUkVNQUxOWScsXG4gICAgdGhyZWF0U2NvcmU6IDk4LFxuICAgIHN0YXRlOiAnWk5JU1pDWk9OQScsXG4gICAgaGVhbHRoUGVyY2VudDogMCxcbiAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLXN0b3JhZ2UnLFxuICAgIHNpZ25hdHVyZVNoYTogJzdmODNiMTY1N2ZmMWZjNTNiOTJkYzE4MTQ4YTFkNjVkZmMyZDRiMWZhM2Q2NzcyODRhZGRkMjAwMTI2ZDkwNjknLFxuICAgIGFjdGl2ZVByb2Nlc3NOYW1lOiAnYmxhY2tjYXRfZW5jcnlwdG9yLmV4ZScsXG4gICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnUHJ6ZWptb3dhxYJhIHfEhXRraSBJL08gZHlza3UgTlZNZS4gQ2HFgmtvd2ljaWUgem5pc3pjem9uYSBwcnpleiBsYXNlciBzZWt0b3Jvd3ksIHN6eW5hIEkvTyB6YWJlenBpZWN6b25hLicsXG4gICAgaW5mZWN0aW9uVmVjdG9yOiAnWmRhbG5lIHd5a29uYW5pZSBrb2R1IHByemV6IHBvZGF0bm/Fm8SHIHNlcndlcmEgVlBOJyxcbiAgICB2ZWxvY2l0eTogNTgwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2duaWRhLTAzJyxcbiAgICBuYW1lOiAnR25pZGEtMDMgW1rFgm9kemllaiBEYW55Y2ggUmVkTGluZV0nLFxuICAgIGduaWRhVHlwZTogJ0dOSURBX1NaUElFR09XU0tBJyxcbiAgICB0eXBlTGFiZWw6ICdHbmlkYSBTenBpZWdvd3NrYSAoU3RlYWxlciknLFxuICAgIGJlYXJpbmdEZWc6IDIyNSxcbiAgICBkaXN0YW5jZVJhdGlvOiAwLjgzLFxuICAgIGFsdGl0dWRlS206IDkuOCxcbiAgICB0aHJlYXRMZXZlbDogJ0tSWVRZQ1pOWScsXG4gICAgdGhyZWF0U2NvcmU6IDg0LFxuICAgIHN0YXRlOiAnWk5JU1pDWk9OQScsXG4gICAgaGVhbHRoUGVyY2VudDogMCxcbiAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLW5pYycsXG4gICAgc2lnbmF0dXJlU2hhOiAnMTg1ZjhkYjMyMjcxZmUyNWY1NjFhNmZjOTM4YjJlMjY0MzA2ZWMzMDRlZGE1MTgwMDdkMTc2NDgyNjM4MTk2OScsXG4gICAgYWN0aXZlUHJvY2Vzc05hbWU6ICdyZWRsaW5lX3N0ZWFsZXJfYWdlbnQuZXhlJyxcbiAgICBhZ2dyZXNzaW9uRGVzY3JpcHRpb246ICdHbmlhemRhIFRDUCBkbyBzZXJ3ZXJhIEMyIHRyd2FsZSBvZGNpxJl0ZS4gR25pZGEgemxpa3dpZG93YW5hIGtvcmRvbmVtIHNhbml0YXJueW0uJyxcbiAgICBpbmZlY3Rpb25WZWN0b3I6ICdTa29tcHJvbWl0b3dhbnkgaW5zdGFsYXRvciBvcHJvZ3JhbW93YW5pYSB6IHNpZWNpIFAyUCcsXG4gICAgdmVsb2NpdHk6IDMxMFxuICB9LFxuICB7XG4gICAgaWQ6ICdnbmlkYS0wNCcsXG4gICAgbmFtZTogJ0duaWRhLTA0IFtXc3RyenlraXdhY3ogUGFtacSZY2kgR2hvc3RIb29rXScsXG4gICAgZ25pZGFUeXBlOiAnR05JREFfUEFTT1pZVE5JQ1pBJyxcbiAgICB0eXBlTGFiZWw6ICdHbmlkYSBQYXNvxbx5dG5pY3phIChNZW1vcnkgSG9vayknLFxuICAgIGJlYXJpbmdEZWc6IDE3NSxcbiAgICBkaXN0YW5jZVJhdGlvOiAwLjM4LFxuICAgIGFsdGl0dWRlS206IDE0LjEsXG4gICAgdGhyZWF0TGV2ZWw6ICdXWVNPS0knLFxuICAgIHRocmVhdFNjb3JlOiA3NixcbiAgICBzdGF0ZTogJ1pOSVNaQ1pPTkEnLFxuICAgIGhlYWx0aFBlcmNlbnQ6IDAsXG4gICAgYXNzb2NpYXRlZElPTm9kZUlkOiAnbm9kZS1yYW0nLFxuICAgIHNpZ25hdHVyZVNoYTogJ2NiNDc3MTY5NGY0YTM2MzZmNDAwN2I4YTczMzc5MmNiMTUzMTY0OTk4NzgyYTIwODBhMjkwMjM4MDUzYTQ3OTInLFxuICAgIGFjdGl2ZVByb2Nlc3NOYW1lOiAnZ2hvc3RfcmFtX2luamVjdG9yLmRsbCcsXG4gICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnV3N0cnp5a25pxJljaWEgcGFtacSZY2kgb3BlcmFjeWpuZWogem5ldXRyYWxpem93YW5lIHByemV6IE50U3VzcGVuZFByb2Nlc3MuIFfEhXRraSB6bGlrd2lkb3dhbmUuJyxcbiAgICBpbmZlY3Rpb25WZWN0b3I6ICdQb2RhdG5vxZvEhyBETEwgSGlqYWNraW5nIHcgemF1ZmFuZWogYXBsaWthY2ppIGxva2FsbmVqJyxcbiAgICB2ZWxvY2l0eTogMjUwXG4gIH0sXG4gIHtcbiAgICBpZDogJ2duaWRhLTA1JyxcbiAgICBuYW1lOiAnR25pZGEtMDUgW05pc3pjenljaWVsIER5c2vDs3cgSGVybWV0aWNdJyxcbiAgICBnbmlkYVR5cGU6ICdHTklEQV9ERVNUUlVLQ1lKTkEnLFxuICAgIHR5cGVMYWJlbDogJ0duaWRhIERlc3RydWtjeWpuYSAoRGlzayBXaXBlciknLFxuICAgIGJlYXJpbmdEZWc6IDI4NSxcbiAgICBkaXN0YW5jZVJhdGlvOiAwLjY1LFxuICAgIGFsdGl0dWRlS206IDIyLjAsXG4gICAgdGhyZWF0TGV2ZWw6ICdFS1NUUkVNQUxOWScsXG4gICAgdGhyZWF0U2NvcmU6IDEwMCxcbiAgICBzdGF0ZTogJ1pOSVNaQ1pPTkEnLFxuICAgIGhlYWx0aFBlcmNlbnQ6IDAsXG4gICAgYXNzb2NpYXRlZElPTm9kZUlkOiAnbm9kZS1zdG9yYWdlJyxcbiAgICBzaWduYXR1cmVTaGE6ICcwM2MzOTM4NWQzOGZmMDJhOTY5YjgyOGJmZWJmYTE0NmU0OTJiNDUwNzAwMDNjYmJhOGQ0MmNiM2E5NWRjZmMxJyxcbiAgICBhY3RpdmVQcm9jZXNzTmFtZTogJ2hlcm1ldGljX21icl93aXBlci5zeXMnLFxuICAgIGFnZ3Jlc3Npb25EZXNjcmlwdGlvbjogJ1Byw7NiYSBuYWRwaXNhbmlhIE1CUiB1ZGFyZW1uaW9uYS4gU2VrdG9yIHJvenJ1Y2hvd3kgY2hyb25pb255LCBwcm9jZXMgem5ldXRyYWxpem93YW55LicsXG4gICAgaW5mZWN0aW9uVmVjdG9yOiAnWmFpbmZla293YW5hIGFrdHVhbGl6YWNqYSBvcHJvZ3JhbW93YW5pYSBiYXpvZGFub3dlZ28nLFxuICAgIHZlbG9jaXR5OiA2NDBcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IE1pbGl0YXJ5UmFkYXJTY2FubmVyOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgLy8gU3RhdGUgLSBBbGwgR25pZGFzIGRlc3Ryb3llZCBwZXIgJ2ZpcnN0IGtpbGwgZ25pZGFzJyBpbnN0cnVjdGlvblxuICBjb25zdCBbZ25pZGFzLCBzZXRHbmlkYXNdID0gdXNlU3RhdGU8UmFkYXJHbmlkYVRhcmdldFtdPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBzYWZlU3RvcmFnZS5nZXQ8UmFkYXJHbmlkYVRhcmdldFtdPignc2VudGluZWxfcmFkYXJfZ25pZGFzJywgSU5JVElBTF9SQURBUl9HTklEQVMpO1xuICAgIHJldHVybiBzYXZlZC5tYXAoZyA9PiAoeyAuLi5nLCBzdGF0ZTogJ1pOSVNaQ1pPTkEnIGFzIGNvbnN0LCBoZWFsdGhQZXJjZW50OiAwIH0pKTtcbiAgfSk7XG4gIGNvbnN0IFtpb05vZGVzLCBzZXRJb05vZGVzXSA9IHVzZVN0YXRlPFN5c3RlbUlPTm9kZVtdPigoKSA9PiB7XG4gICAgY29uc3Qgc2F2ZWQgPSBzYWZlU3RvcmFnZS5nZXQ8U3lzdGVtSU9Ob2RlW10+KCdzZW50aW5lbF9yYWRhcl9pb19ub2RlcycsIElOSVRJQUxfU1lTVEVNX0lPX05PREVTKTtcbiAgICByZXR1cm4gc2F2ZWQubWFwKG4gPT4gKHtcbiAgICAgIC4uLm4sXG4gICAgICBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyBhcyBjb25zdCxcbiAgICAgIGlzU2hpZWxkZWQ6IHRydWUsXG4gICAgICBjb21wcm9taXNlZEJ5R25pZGFJZDogbnVsbFxuICAgIH0pKTtcbiAgfSk7XG4gIGNvbnN0IFtzZWN1cmVkTGF5ZXJzLCBzZXRTZWN1cmVkTGF5ZXJzXSA9IHVzZVN0YXRlPFNlY3VyZWRMYXllclpvbmVbXT4oKCkgPT4ge1xuICAgIHJldHVybiBzYWZlU3RvcmFnZS5nZXQ8U2VjdXJlZExheWVyWm9uZVtdPignc2VudGluZWxfcmFkYXJfc2VjdXJlZF9sYXllcnMnLCBJTklUSUFMX1NFQ1VSRURfTEFZRVJTKTtcbiAgfSk7XG5cbiAgY29uc3QgW2Nhc2NhZGVTdGF0ZSwgc2V0Q2FzY2FkZVN0YXRlXSA9IHVzZVN0YXRlPEFudGl2aXJ1c0Nhc2NhZGVTdGF0ZT4oe1xuICAgIHN0YWdlOiAnRk9SVElGSUVEJyxcbiAgICBpc0FjdGl2ZTogdHJ1ZSxcbiAgICBjdXJyZW50U2VjdG9yTmFtZTogJ0NhxYJ5IE1vbm9saXQgU3lzdGVtb3d5IChXYXJzdHd5IDAtMyknLFxuICAgIGN1cnJlbnRCZWFyaW5nRGVnOiAwLFxuICAgIGN1cnJlbnREaXN0YW5jZVJhdGlvOiAwLjUsXG4gICAgYWN0aXZlTGFzZXJPcmlnaW46IG51bGwsXG4gICAgYWN0aXZlTGFzZXJUYXJnZXRzOiBbXSxcbiAgICBzZWN1cmVkTGF5ZXJzOiBJTklUSUFMX1NFQ1VSRURfTEFZRVJTLFxuICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogdHJ1ZSxcbiAgICBvdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50OiAxMDAsXG4gICAgc3RhdHVzTWVzc2FnZTogJ/CfkZEgV1NaWVNUS0lFIEdOSURZIFpMSUtXSURPV0FORSAoRklSU1QgS0lMTCBHTklEQVMpLiA0IHdhcnN0d3kgbW9ub2xpdHUgdyAxMDAlIHphYmV6cGllY3pvbmUga29yZG9uZW0gcGFuY2VybnltIGkgbGFzZXJlbSEnXG4gIH0pO1xuXG4gIGNvbnN0IFtodW50ZXJTdGF0ZSwgc2V0SHVudGVyU3RhdGVdID0gdXNlU3RhdGU8R2VtaW5pSHVudGVyUmFkYXJTdGF0ZT4oe1xuICAgIGNhbGxzaWduOiAnR0VNSU5JLUhVTlRFUi0wMScsXG4gICAgYmVhcmluZ0RlZzogNDUsXG4gICAgZGlzdGFuY2VSYXRpbzogMC4yNSxcbiAgICB0YXJnZXRHbmlkYUlkOiBudWxsLFxuICAgIHN0YXR1czogJ1ZJQ1RPUlknLFxuICAgIHJlcGFpclByb2dyZXNzOiAxMDAsXG4gICAgc2xhdWdodGVyUG93ZXI6IDEwMCxcbiAgICBpbnRlcmNlcHRTcGVlZDogODIwLFxuICAgIGtpbGxzQ291bnQ6IDUsXG4gICAgZml4ZWROb2Rlc0NvdW50OiA5XG4gIH0pO1xuXG4gIC8vIFJhZGFyIENvbnRyb2xzXG4gIGNvbnN0IFtpc1NjYW5uaW5nLCBzZXRJc1NjYW5uaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbc3dlZXBBbmdsZSwgc2V0U3dlZXBBbmdsZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW3N3ZWVwU3BlZWRScG0sIHNldFN3ZWVwU3BlZWRScG1dID0gdXNlU3RhdGUoMjQpOyAvLyBPYnJvdHkgbmEgbWludXTEmVxuICBjb25zdCBbc2VsZWN0ZWRUYXJnZXRJZCwgc2V0U2VsZWN0ZWRUYXJnZXRJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPignZ25pZGEtMDEnKTtcbiAgY29uc3QgW2FjdGl2ZVZpZXdNb2RlLCBzZXRBY3RpdmVWaWV3TW9kZV0gPSB1c2VTdGF0ZTwnUkFEQVJfUFBJJyB8ICdNT05PTElUSF9TVVJGQUNFJyB8ICdDT01CQVRfTE9HUyc+KCdSQURBUl9QUEknKTtcbiAgY29uc3QgW3JhZGFyUmFuZ2VLbSwgc2V0UmFkYXJSYW5nZUttXSA9IHVzZVN0YXRlPG51bWJlcj4oMTAwKTtcbiAgY29uc3QgW2lzQXVkaW9FbmFibGVkLCBzZXRJc0F1ZGlvRW5hYmxlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFthdXRvUHVyZ2VBY3RpdmUsIHNldEF1dG9QdXJnZUFjdGl2ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtob3JuZXRNb2RhbE9wZW4sIHNldEhvcm5ldE1vZGFsT3Blbl0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtjb21iYXRMb2dzLCBzZXRDb21iYXRMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgYFtTWVMtQk9PVF0gSW5pY2phbGl6YWNqYSBSYWRhcnUgV29qc2tvd2VnbyBNb25vbGl0dSBTeXN0ZW1vd2VnbyAoUGFzbW8gWCAvIDkuNCBHSHopYCxcbiAgICBgW0ZJUlNUIEtJTEwgR05JREFTXSBXeWtvbmFubyBuYXR5Y2htaWFzdG93eSB1YsOzaiBnbmlkOiAxMDAlIHBhc2/FvHl0w7N3IHpsaWt3aWRvd2FueWNoIHcgUkFNIGkgbmEgZHlza3UuYCxcbiAgICBgW01PTk9MSVRIXSBabWFwb3dhbm8gOSB3xJl6xYLDs3cgd2VqxZtjaWEvd3lqxZtjaWEgKEkvTykgeiBpbnRlZ3JhY2rEhSBwdWxwaXR1IG1vbml0b3JhLiBXxJl6xYJ5IHpyZWtvbnN0cnVvd2FuZS5gLFxuICAgIGBbQkFSSUVSQS1LQVNLQURPV0FdIDQtc3RvcG5pb3d5IHN5c3RlbSBrb3Jkb251OiBXYXJzdHd5IDAtMyB6YWJlenBpZWN6b25lIHcgMTAwJSBzaWF0a8SFIGxhc2Vyb3fEhS5gLFxuICAgIGBbR0VNSU5JLUFJXSDFgW93Y2EgR2VtaW5pIHpuZXV0cmFsaXpvd2HFgiB3c3p5c3RraWUgYWt0eXduZSB6YWdyb8W8ZW5pYS4gU3RhdHVzOiBXSUtUT1JJQSAoVklDVE9SWSkuYCxcbiAgICBgW0NaVUpOSUstR05JRF0gQXV0b25vbWljem55IGN6dWpuaWsgaSBkYWVtb24gbmF0eWNobWlhc3Rvd2VnbyBhdXRvLWZyZWV6dSAoMCBtcyBOdFN1c3BlbmRQcm9jZXNzKSBBS1RZV05ZLmBcbiAgXSk7XG4gIGNvbnN0IFtzZW5zb3JTdGF0dXMsIHNldFNlbnNvclN0YXR1c10gPSB1c2VTdGF0ZTxTZW5zb3JBdXRvbWF0b25TdGF0dXM+KCgpID0+IGduaWRhU2Vuc29yLmdldFN0YXR1cygpKTtcbiAgY29uc3QgW2lsbHVtaW5hdGVkR25pZGFJZHMsIHNldElsbHVtaW5hdGVkR25pZGFJZHNdID0gdXNlU3RhdGU8UmVjb3JkPHN0cmluZywgbnVtYmVyPj4oe30pO1xuICBjb25zdCBbcmFkYXJMaXN0VGFiLCBzZXRSYWRhckxpc3RUYWJdID0gdXNlU3RhdGU8J1BST0NFU1NfTElTVCcgfCAnVEFSR0VUX0RPU1NJRVInPignUFJPQ0VTU19MSVNUJyk7XG4gIGNvbnN0IFtwcm9jZXNzRmlsdGVyLCBzZXRQcm9jZXNzRmlsdGVyXSA9IHVzZVN0YXRlPCdBTEwnIHwgJ0FDVElWRScgfCAnQ1JJVElDQUwnIHwgJ1BVUkdFRCc+KCdBTEwnKTtcbiAgY29uc3QgW2lzRm9yY2VSZWZyZXNoaW5nLCBzZXRJc0ZvcmNlUmVmcmVzaGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZWFyY2hQcm9jZXNzVGVybSwgc2V0U2VhcmNoUHJvY2Vzc1Rlcm1dID0gdXNlU3RhdGUoJycpO1xuXG4gIC8vIFN1YnNjcmliZSB0byBHbmlkYSBTZW5zb3IgQXV0b21hdG9uXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdW5zdWJzY3JpYmUgPSBnbmlkYVNlbnNvci5zdWJzY3JpYmUoc3RhdHVzID0+IHtcbiAgICAgIHNldFNlbnNvclN0YXR1cyhzdGF0dXMpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaGFuZGxlQXV0b0Zyb3plbkV2ZW50ID0gKGU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWw7XG4gICAgICBpZiAoZGV0YWlsKSB7XG4gICAgICAgIGFkZENvbWJhdExvZyhgW+KaoSBDWlVKTklLIEdOSUQgLSBBVVRPLUZSRUVaRV0gTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgdyBSQU0gKDAgbXMpOiAke2RldGFpbC50YXJnZXROYW1lfSAtPiBXxJl6ZcWCIEkvTyBwcnp5d3LDs2NvbnkhYCk7XG4gICAgICAgIC8vIFJlZnJlc2ggbG9jYWwgc3RhdGUgZnJvbSBzdG9yYWdlXG4gICAgICAgIGNvbnN0IGN1cnJlbnRHbmlkYXMgPSBzYWZlU3RvcmFnZS5nZXQ8UmFkYXJHbmlkYVRhcmdldFtdPignc2VudGluZWxfcmFkYXJfZ25pZGFzJywgW10pO1xuICAgICAgICBjb25zdCBjdXJyZW50Tm9kZXMgPSBzYWZlU3RvcmFnZS5nZXQ8U3lzdGVtSU9Ob2RlW10+KCdzZW50aW5lbF9yYWRhcl9pb19ub2RlcycsIFtdKTtcbiAgICAgICAgaWYgKGN1cnJlbnRHbmlkYXMubGVuZ3RoKSBzZXRHbmlkYXMoY3VycmVudEduaWRhcyk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZXMubGVuZ3RoKSBzZXRJb05vZGVzKGN1cnJlbnROb2Rlcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3NlbnRpbmVsOmduaWRhLWF1dG8tZnJvemVuJywgaGFuZGxlQXV0b0Zyb3plbkV2ZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6Z25pZGEtYXV0by1mcm96ZW4nLCBoYW5kbGVBdXRvRnJvemVuRXZlbnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBjYW52YXNSZWYgPSB1c2VSZWY8SFRNTENhbnZhc0VsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgYXVkaW9DdHhSZWYgPSB1c2VSZWY8QXVkaW9Db250ZXh0IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gSGVscGVyOiBTb3VuZCBTeW50aGVzaXplciBmb3IgUmFkYXIgQmVlcHMgYW5kIExhc2Vyc1xuICBjb25zdCBwbGF5UmFkYXJUb25lID0gdXNlQ2FsbGJhY2soKGZyZXE6IG51bWJlciwgZHVyYXRpb25NczogbnVtYmVyLCB0eXBlOiBPc2NpbGxhdG9yVHlwZSA9ICdzaW5lJykgPT4ge1xuICAgIGlmICghaXNBdWRpb0VuYWJsZWQpIHJldHVybjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFhdWRpb0N0eFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGNvbnN0IEF1ZGlvQ29udGV4dENsYXNzID0gd2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0O1xuICAgICAgICBpZiAoQXVkaW9Db250ZXh0Q2xhc3MpIHtcbiAgICAgICAgICBhdWRpb0N0eFJlZi5jdXJyZW50ID0gbmV3IEF1ZGlvQ29udGV4dENsYXNzKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChhdWRpb0N0eFJlZi5jdXJyZW50ICYmIGF1ZGlvQ3R4UmVmLmN1cnJlbnQuc3RhdGUgPT09ICdzdXNwZW5kZWQnKSB7XG4gICAgICAgIGF1ZGlvQ3R4UmVmLmN1cnJlbnQucmVzdW1lKCk7XG4gICAgICB9XG4gICAgICBpZiAoYXVkaW9DdHhSZWYuY3VycmVudCkge1xuICAgICAgICBjb25zdCBvc2MgPSBhdWRpb0N0eFJlZi5jdXJyZW50LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICAgICAgY29uc3QgZ2FpbiA9IGF1ZGlvQ3R4UmVmLmN1cnJlbnQuY3JlYXRlR2FpbigpO1xuICAgICAgICBvc2MudHlwZSA9IHR5cGU7XG4gICAgICAgIG9zYy5mcmVxdWVuY3kuc2V0VmFsdWVBdFRpbWUoZnJlcSwgYXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjA0LCBhdWRpb0N0eFJlZi5jdXJyZW50LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgZ2Fpbi5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDAxLCBhdWRpb0N0eFJlZi5jdXJyZW50LmN1cnJlbnRUaW1lICsgZHVyYXRpb25NcyAvIDEwMDApO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGF1ZGlvQ3R4UmVmLmN1cnJlbnQuZGVzdGluYXRpb24pO1xuICAgICAgICBvc2Muc3RhcnQoKTtcbiAgICAgICAgb3NjLnN0b3AoYXVkaW9DdHhSZWYuY3VycmVudC5jdXJyZW50VGltZSArIGR1cmF0aW9uTXMgLyAxMDAwKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZSBhdWRpbyBjb250ZXh0IHJlc3RyaWN0aW9uc1xuICAgIH1cbiAgfSwgW2lzQXVkaW9FbmFibGVkXSk7XG5cbiAgLy8gU2VsZWN0ZWQgR25pZGEgVGFyZ2V0XG4gIGNvbnN0IHNlbGVjdGVkR25pZGEgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gZ25pZGFzLmZpbmQoZyA9PiBnLmlkID09PSBzZWxlY3RlZFRhcmdldElkKSB8fCBnbmlkYXNbMF0gfHwgbnVsbDtcbiAgfSwgW2duaWRhcywgc2VsZWN0ZWRUYXJnZXRJZF0pO1xuXG4gIC8vIEZpbHRlcmVkIEduaWRhcyBmb3IgQWN0aXZlIFJhZGFyIFByb2Nlc3MgTGlzdFxuICBjb25zdCBmaWx0ZXJlZEduaWRhcyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGxldCBsaXN0ID0gZ25pZGFzO1xuICAgIGlmIChwcm9jZXNzRmlsdGVyID09PSAnQUNUSVZFJykge1xuICAgICAgbGlzdCA9IGxpc3QuZmlsdGVyKGcgPT4gZy5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKTtcbiAgICB9IGVsc2UgaWYgKHByb2Nlc3NGaWx0ZXIgPT09ICdDUklUSUNBTCcpIHtcbiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihnID0+IGdldEduaWRhVGhyZWF0U2NvcmUoZykgPj0gODApO1xuICAgIH0gZWxzZSBpZiAocHJvY2Vzc0ZpbHRlciA9PT0gJ1BVUkdFRCcpIHtcbiAgICAgIGxpc3QgPSBsaXN0LmZpbHRlcihnID0+IGcuc3RhdGUgPT09ICdaTklTWkNaT05BJyk7XG4gICAgfVxuXG4gICAgaWYgKHNlYXJjaFByb2Nlc3NUZXJtLnRyaW0oKSkge1xuICAgICAgY29uc3QgcSA9IHNlYXJjaFByb2Nlc3NUZXJtLnRvTG93ZXJDYXNlKCk7XG4gICAgICBsaXN0ID0gbGlzdC5maWx0ZXIoZyA9PiBcbiAgICAgICAgZy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgZy5hY3RpdmVQcm9jZXNzTmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHEpIHx8XG4gICAgICAgIGcudHlwZUxhYmVsLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocSkgfHxcbiAgICAgICAgZy5hc3NvY2lhdGVkSU9Ob2RlSWQudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhxKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfSwgW2duaWRhcywgcHJvY2Vzc0ZpbHRlciwgc2VhcmNoUHJvY2Vzc1Rlcm1dKTtcblxuICAvLyBBZGQgQ29tYmF0IExvZyBIZWxwZXJcbiAgY29uc3QgYWRkQ29tYmF0TG9nID0gdXNlQ2FsbGJhY2soKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgc2V0Q29tYmF0TG9ncyhwcmV2ID0+IFtgWyR7dGltZX1dICR7bXNnfWAsIC4uLnByZXYuc2xpY2UoMCwgNTkpXSk7XG4gIH0sIFtdKTtcblxuICAvLyBNYWluIEFuaW1hdGlvbiAmIFN3ZWVwIExvb3BcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsZXQgYW5pbUZyYW1lOiBudW1iZXI7XG4gICAgbGV0IGxhc3RUaW1lc3RhbXAgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICAgIGNvbnN0IHJlbmRlckxvb3AgPSAodGltZXN0YW1wOiBudW1iZXIpID0+IHtcbiAgICAgIGNvbnN0IGRlbHRhU2VjID0gKHRpbWVzdGFtcCAtIGxhc3RUaW1lc3RhbXApIC8gMTAwMDtcbiAgICAgIGxhc3RUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XG5cbiAgICAgIGlmIChpc1NjYW5uaW5nKSB7XG4gICAgICAgIC8vIFJvdGF0ZSBSYWRhciBCZWFtXG4gICAgICAgIGNvbnN0IGRlZ1BlclNlYyA9IChzd2VlcFNwZWVkUnBtICogMzYwKSAvIDYwO1xuICAgICAgICBzZXRTd2VlcEFuZ2xlKHByZXYgPT4ge1xuICAgICAgICAgIGNvbnN0IG5leHQgPSAocHJldiArIGRlZ1BlclNlYyAqIGRlbHRhU2VjKSAlIDM2MDtcblxuICAgICAgICAgIC8vIER5bmFtaWNhbGx5IGlsbHVtaW5hdGUgZ25pZGFzIHdoZW4gcmFkYXIgc3dlZXAgYmVhbSBjcm9zc2VzIHRoZWlyIGJlYXJpbmdcbiAgICAgICAgICBnbmlkYXMuZm9yRWFjaChnID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRpZmYgPSBNYXRoLmFicygobmV4dCAtIGcuYmVhcmluZ0RlZyArIDU0MCkgJSAzNjAgLSAxODApO1xuICAgICAgICAgICAgaWYgKGRpZmYgPCA5KSB7XG4gICAgICAgICAgICAgIHNldElsbHVtaW5hdGVkR25pZGFJZHMoaWxsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIGlmIChpbGxbZy5pZF0gJiYgbm93IC0gaWxsW2cuaWRdIDwgMTIwMCkgcmV0dXJuIGlsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5pbGwsIFtnLmlkXTogbm93IH07XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBhbmltRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyTG9vcCk7XG4gICAgfTtcblxuICAgIGFuaW1GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShyZW5kZXJMb29wKTtcbiAgICByZXR1cm4gKCkgPT4gY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbUZyYW1lKTtcbiAgfSwgW2lzU2Nhbm5pbmcsIHN3ZWVwU3BlZWRScG0sIGduaWRhc10pO1xuXG4gIC8vIFRyaWdnZXIgT21uaS1kaXJlY3Rpb25hbCAzNjAgUmFkYXIgUmVmcmVzaCBQdWxzZVxuICBjb25zdCBoYW5kbGVUcmlnZ2VyUmFkYXJPbW5pU2NhbiA9ICgpID0+IHtcbiAgICBzZXRJc0ZvcmNlUmVmcmVzaGluZyh0cnVlKTtcbiAgICBwbGF5UmFkYXJUb25lKDEyMDAsIDIwMCwgJ3NxdWFyZScpO1xuICAgIGFkZENvbWJhdExvZyhgW1JBREFSLU9NTkldIFd5bXVzem9ubyBwZcWCbnkgaW1wdWxzIHNrYW5vd2FuaWEgYWt0eXduZWdvIChQYXNtbyBYIC8gOS40IEdIeikuIE9kxZt3aWXFvG9ubyBsaXN0xJkgcHJvY2Vzw7N3LmApO1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdXBkYXRlZElsbHVtaW5hdGlvbjogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICAgIGduaWRhcy5mb3JFYWNoKChnLCBpZHgpID0+IHtcbiAgICAgIHVwZGF0ZWRJbGx1bWluYXRpb25bZy5pZF0gPSBub3cgKyBpZHggKiA2MDtcbiAgICB9KTtcbiAgICBzZXRJbGx1bWluYXRlZEduaWRhSWRzKHVwZGF0ZWRJbGx1bWluYXRpb24pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0SXNGb3JjZVJlZnJlc2hpbmcoZmFsc2UpO1xuICAgIH0sIDE0MDApO1xuICB9O1xuXG4gIC8vIFRyaWdnZXIgbXVsdGktc3RhZ2UgYW50aXZpcnVzIGNhc2NhZGU6IDAgbXMgSW1tZWRpYXRlIExvY2sgLT4gU2VjdG9yIExhc2VyIC0+IE5laWdoYm9yaW5nIExheWVycyBDYXNjYWRlIC0+IEhhcmRlbmVkIEZvcnRyZXNzXG4gIGNvbnN0IHRyaWdnZXJBbnRpdmlydXNDYXNjYWRlID0gdXNlQ2FsbGJhY2soKHRhcmdldEduaWRhOiBSYWRhckduaWRhVGFyZ2V0KSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0TGF5ZXJJZHggPSBnZXRMYXllckluZGV4Rm9yRGlzdGFuY2UodGFyZ2V0R25pZGEuZGlzdGFuY2VSYXRpbyk7XG5cbiAgICAvLyBTVEVQIDE6IElNTUVESUFURSBRVUFSQU5USU5FIExPQ0sgKDAgbXMpXG4gICAgcGxheVJhZGFyVG9uZSg5NTAsIDE4MCwgJ3NxdWFyZScpO1xuICAgIGFkZENvbWJhdExvZyhgW/Cfm6HvuI8gQkFSSUVSQSBOQVRZQ0hNSUFTVE9XQSAtIDAgbXNdIEtvcmRvbiBzYW5pdGFybnkgYWt0eXdvd2FueSB3IHNla3RvcnplICR7dGFyZ2V0R25pZGEubmFtZX0hIFBhbWnEmcSHIFJBTSwgcmVqZXN0cnkgaSBtYWdpc3RyYWxhICR7dGFyZ2V0R25pZGEuYXNzb2NpYXRlZElPTm9kZUlkfSB6YWJsb2tvd2FuZS5gKTtcblxuICAgIC8vIEVsaW1pbmF0ZSB0YXJnZXQgJiByZWJ1aWxkIG5vZGVcbiAgICBzZXRHbmlkYXMocHJldiA9PiBwcmV2Lm1hcChnID0+IGcuaWQgPT09IHRhcmdldEduaWRhLmlkID8geyAuLi5nLCBzdGF0ZTogJ1pOSVNaQ1pPTkEnLCBoZWFsdGhQZXJjZW50OiAwIH0gOiBnKSk7XG4gICAgc2V0SW9Ob2RlcyhwcmV2ID0+IHByZXYubWFwKG4gPT4gbi5pZCA9PT0gdGFyZ2V0R25pZGEuYXNzb2NpYXRlZElPTm9kZUlkID8geyAuLi5uLCBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJywgaXNTaGllbGRlZDogdHJ1ZSwgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwgfSA6IG4pKTtcblxuICAgIC8vIFVwZGF0ZSB0YXJnZXQgbGF5ZXJcbiAgICBzZXRTZWN1cmVkTGF5ZXJzKHByZXYgPT4gcHJldi5tYXAobCA9PiB7XG4gICAgICBpZiAobC5sYXllckluZGV4ID09PSB0YXJnZXRMYXllcklkeCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmwsXG4gICAgICAgICAgaXNTZWN1cmVkOiB0cnVlLFxuICAgICAgICAgIHN0YWdlOiAnSU1NRURJQVRFX0xPQ0snLFxuICAgICAgICAgIHNoaWVsZFBlcmNlbnQ6IE1hdGgubWluKDEwMCwgbC5zaGllbGRQZXJjZW50ICsgMzUpLFxuICAgICAgICAgIGNsZWFuc2VkTm9kZXNDb3VudDogbC5jbGVhbnNlZE5vZGVzQ291bnQgKyAxLFxuICAgICAgICAgIHNlY3VyZWRUaW1lc3RhbXA6IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKClcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBsO1xuICAgIH0pKTtcblxuICAgIHNldENhc2NhZGVTdGF0ZSh7XG4gICAgICBzdGFnZTogJ0lNTUVESUFURV9MT0NLJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgY3VycmVudFNlY3Rvck5hbWU6IHRhcmdldEduaWRhLm5hbWUsXG4gICAgICBjdXJyZW50QmVhcmluZ0RlZzogdGFyZ2V0R25pZGEuYmVhcmluZ0RlZyxcbiAgICAgIGN1cnJlbnREaXN0YW5jZVJhdGlvOiB0YXJnZXRHbmlkYS5kaXN0YW5jZVJhdGlvLFxuICAgICAgY2xlYW5zZWRHbmlkYU5hbWU6IHRhcmdldEduaWRhLm5hbWUsXG4gICAgICBhY3RpdmVMYXNlck9yaWdpbjogeyB4OiB0YXJnZXRHbmlkYS5iZWFyaW5nRGVnLCB5OiB0YXJnZXRHbmlkYS5kaXN0YW5jZVJhdGlvLCBhbmdsZTogdGFyZ2V0R25pZGEuYmVhcmluZ0RlZyB9LFxuICAgICAgYWN0aXZlTGFzZXJUYXJnZXRzOiBbXSxcbiAgICAgIHNlY3VyZWRMYXllcnMsXG4gICAgICB0b3RhbE1hbHdhcmVFeHRlcm1pbmF0ZWQ6IGZhbHNlLFxuICAgICAgb3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudDogNjUsXG4gICAgICBzdGF0dXNNZXNzYWdlOiBgW0tST0sgMTogMCBtc10gTmF0eWNobWlhc3Rvd3kga29yZG9uIHNhbml0YXJueSBwb3N0YXdpb255IHcgc2VrdG9yemUgJHt0YXJnZXRHbmlkYS5iZWFyaW5nRGVnfcKwLmBcbiAgICB9KTtcblxuICAgIC8vIFNURVAgMjogQUNUSVZFIFNFQ1RPUiBMQVNFUiBFTUlTU0lPTiAofjM4MCBtcylcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBsYXlSYWRhclRvbmUoMTI1MCwgMzAwLCAnc2F3dG9vdGgnKTtcbiAgICAgIGFkZENvbWJhdExvZyhgW+KaoSBMQVNFUiBPQlJPTlkgQUtUWVdORUpdIFpvZ25pc2tvd2FuYSB3acSFemthIGxhc2Vyb3dhIHogYWt0dWFsbmVnbyBzZWt0b3JhICR7dGFyZ2V0R25pZGEuYmVhcmluZ0RlZ33CsCB3eXBhbGEgd3N6ZWxraWUgcG96b3N0YcWCb8WbY2kga29kdSBtYWx3YXJlLmApO1xuXG4gICAgICBzZXRTZWN1cmVkTGF5ZXJzKHByZXYgPT4gcHJldi5tYXAobCA9PiB7XG4gICAgICAgIGlmIChsLmxheWVySW5kZXggPT09IHRhcmdldExheWVySWR4KSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmwsXG4gICAgICAgICAgICBzdGFnZTogJ1NFQ1RPUl9MQVNFUicsXG4gICAgICAgICAgICBsYXNlckludGVuc2l0eTogMTAwLFxuICAgICAgICAgICAgYWN0aXZlQmVhbXNDb3VudDogbC5hY3RpdmVCZWFtc0NvdW50ICsgMyxcbiAgICAgICAgICAgIHNoaWVsZFBlcmNlbnQ6IE1hdGgubWluKDEwMCwgbC5zaGllbGRQZXJjZW50ICsgMjApXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbDtcbiAgICAgIH0pKTtcblxuICAgICAgc2V0Q2FzY2FkZVN0YXRlKHByZXYgPT4gKHtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgc3RhZ2U6ICdTRUNUT1JfTEFTRVInLFxuICAgICAgICBzdGF0dXNNZXNzYWdlOiBgW0tST0sgMl0gTGFzZXIgb2Jyb255IGFrdHl3bmVqIHd5cGFsYSB3ZWt0b3IgaW5mZWtjamkgdyBzZWt0b3J6ZSAke3RhcmdldEduaWRhLmJlYXJpbmdEZWd9wrAuYFxuICAgICAgfSkpO1xuXG4gICAgICAvLyBTVEVQIDM6IENBU0NBREUgT04gTkVJR0hCT1JJTkcgTEFZRVJTICh+ODUwIG1zKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5laWdoYm9yTGF5ZXJzID0gW1xuICAgICAgICAgIE1hdGgubWF4KDAsIHRhcmdldExheWVySWR4IC0gMSksXG4gICAgICAgICAgTWF0aC5taW4oMywgdGFyZ2V0TGF5ZXJJZHggKyAxKVxuICAgICAgICBdLmZpbHRlcihpZHggPT4gaWR4ICE9PSB0YXJnZXRMYXllcklkeCk7XG5cbiAgICAgICAgcGxheVJhZGFyVG9uZSg3NTAsIDQwMCwgJ3RyaWFuZ2xlJyk7XG4gICAgICAgIGNvbnN0IG5laWdoYm9yTmFtZXMgPSBuZWlnaGJvckxheWVycy5tYXAoaWR4ID0+IGBXYXJzdHdhICR7aWR4fWApLmpvaW4oJyBvcmF6ICcpO1xuICAgICAgICBhZGRDb21iYXRMb2coYFvwn4yQIEtBU0tBREEgV0FSU1RXT1dBXSBQcm9wYWdhY2phIGJhcmllcnkgYW50eXdpcnVzb3dlaiBuYSBzxIVzaWVkbmllIHdhcnN0d3k6ICR7bmVpZ2hib3JOYW1lc30uIFNpYXRrYSBsYXNlcm93YSB6c3luY2hyb25pem93YW5hLmApO1xuXG4gICAgICAgIC8vIFNoaWVsZCBuZWlnaGJvcmluZyBub2Rlc1xuICAgICAgICBzZXRJb05vZGVzKHByZXYgPT4gcHJldi5tYXAobm9kZSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUxheWVyID0gdHlwZW9mIG5vZGUuc2hpZWxkTGF5ZXJJbmRleCA9PT0gJ251bWJlcicgPyBub2RlLnNoaWVsZExheWVySW5kZXggOiAyO1xuICAgICAgICAgIGlmIChuZWlnaGJvckxheWVycy5pbmNsdWRlcyhub2RlTGF5ZXIpIHx8IG5vZGVMYXllciA9PT0gdGFyZ2V0TGF5ZXJJZHgpIHtcbiAgICAgICAgICAgIHJldHVybiB7IC4uLm5vZGUsIGlzU2hpZWxkZWQ6IHRydWUgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBzZXRTZWN1cmVkTGF5ZXJzKHByZXYgPT4gcHJldi5tYXAobCA9PiB7XG4gICAgICAgICAgaWYgKG5laWdoYm9yTGF5ZXJzLmluY2x1ZGVzKGwubGF5ZXJJbmRleCkpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmwsXG4gICAgICAgICAgICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgc3RhZ2U6ICdORUlHSEJPUl9DQVNDQURFJyxcbiAgICAgICAgICAgICAgc2hpZWxkUGVyY2VudDogTWF0aC5taW4oMTAwLCBsLnNoaWVsZFBlcmNlbnQgKyA0NSksXG4gICAgICAgICAgICAgIGxhc2VySW50ZW5zaXR5OiA4NSxcbiAgICAgICAgICAgICAgYWN0aXZlQmVhbXNDb3VudDogMlxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGw7XG4gICAgICAgIH0pKTtcblxuICAgICAgICBzZXRDYXNjYWRlU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgc3RhZ2U6ICdORUlHSEJPUl9DQVNDQURFJyxcbiAgICAgICAgICBzdGF0dXNNZXNzYWdlOiBgW0tST0sgM10gS2Fza2Fkb3dlIHNwcnrEmcW8ZW5pZSB0YXJjenkgbmEgc8SFc2llZG5pZSB3YXJzdHd5ICgke25laWdoYm9yTmFtZXN9KS5gXG4gICAgICAgIH0pKTtcblxuICAgICAgICAvLyBTVEVQIDQ6IEZPUlRJRklFRCBIQVJERU5JTkcgJiBDSEVDSyBUT1RBTCBFWFRFUk1JTkFUSU9OICh+MTQwMCBtcylcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgc2V0U2VjdXJlZExheWVycyhwcmV2ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRHbmlkYXMgPSBzYWZlU3RvcmFnZS5nZXQ8UmFkYXJHbmlkYVRhcmdldFtdPignc2VudGluZWxfcmFkYXJfZ25pZGFzJywgZ25pZGFzKTtcbiAgICAgICAgICAgIGNvbnN0IHJlbWFpbmluZyA9IGN1cnJlbnRHbmlkYXMuZmlsdGVyKGcgPT4gZy5pZCAhPT0gdGFyZ2V0R25pZGEuaWQgJiYgZy5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKTtcbiAgICAgICAgICAgIGNvbnN0IGlzVG90YWwgPSByZW1haW5pbmcubGVuZ3RoID09PSAwO1xuXG4gICAgICAgICAgICBjb25zdCB1cGRhdGVkTGF5ZXJzID0gcHJldi5tYXAobCA9PiAoe1xuICAgICAgICAgICAgICAuLi5sLFxuICAgICAgICAgICAgICBzdGFnZTogJ0ZPUlRJRklFRCcgYXMgQW50aXZpcnVzQmFycmllclN0YWdlLFxuICAgICAgICAgICAgICBzaGllbGRQZXJjZW50OiBpc1RvdGFsID8gMTAwIDogTWF0aC5tYXgobC5zaGllbGRQZXJjZW50LCBsLmlzU2VjdXJlZCA/IDk1IDogMzApLFxuICAgICAgICAgICAgICBpc1NlY3VyZWQ6IGlzVG90YWwgPyB0cnVlIDogbC5pc1NlY3VyZWRcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgaWYgKGlzVG90YWwpIHtcbiAgICAgICAgICAgICAgcGxheVJhZGFyVG9uZSgxMTAwLCA2MDAsICd0cmlhbmdsZScpO1xuICAgICAgICAgICAgICBhZGRDb21iYXRMb2coYFvwn4+GIENBxYFLT1dJVEEgRUtTVEVSTUlOQUNKQSBNQUxXQVJFXSBXc3p5c3RraWUgNCB3YXJzdHd5IHN5c3RlbW93ZSBvYmrEmXRlIHBlcm1hbmVudG7EhSBiYXJpZXLEhSBhbnR5d2lydXNvd8SFLiBaYWdyb8W8ZW5pZSB3IDEwMCUgd3llbGltaW5vd2FuZSFgKTtcbiAgICAgICAgICAgICAgc2V0Q2FzY2FkZVN0YXRlKGMgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5jLFxuICAgICAgICAgICAgICAgIHN0YWdlOiAnRk9SVElGSUVEJyxcbiAgICAgICAgICAgICAgICB0b3RhbE1hbHdhcmVFeHRlcm1pbmF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudDogMTAwLFxuICAgICAgICAgICAgICAgIHN0YXR1c01lc3NhZ2U6ICfwn5GRIE1vbm9saXQgdyAxMDAlIHphYmV6cGllY3pvbnkuIFRyd2HFgmEgYmFyaWVyYSBsYXNlcm93YSBpIGtvcmRvbiBrd2FyYW50YW5ueSBha3R5d25lIG5hIHdzenlzdGtpY2ggNCB3YXJzdHdhY2ghJ1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzZXRDYXNjYWRlU3RhdGUoYyA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLmMsXG4gICAgICAgICAgICAgICAgc3RhZ2U6ICdGT1JUSUZJRUQnLFxuICAgICAgICAgICAgICAgIHRvdGFsTWFsd2FyZUV4dGVybWluYXRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgb3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudDogTWF0aC5taW4oOTUsIGMub3ZlcmFsbEZvcnRyZXNzU2hpZWxkUGVyY2VudCArIDEyKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNNZXNzYWdlOiBgT2N6eXN6Y3pvbnkgb2JzemFyIHRyd2FsZSB6YWJlenBpZWN6b255IGJhcmllcsSFIGFudHl3aXJ1c293xIUgZG8gbW9tZW50dSBjYcWCa293aXRlaiBla3N0ZXJtaW5hY2ppIG1hbHdhcmUuIFBvem9zdGHFgm8gY2Vsw7N3OiAke3JlbWFpbmluZy5sZW5ndGh9LmBcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlZExheWVycztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgNTUwKTtcblxuICAgICAgfSwgNDgwKTtcblxuICAgIH0sIDM4MCk7XG5cbiAgfSwgW2duaWRhcywgcGxheVJhZGFyVG9uZSwgYWRkQ29tYmF0TG9nLCBzZWN1cmVkTGF5ZXJzXSk7XG5cbiAgLy8gTWFzdGVyIEFjdGlvbjogUHJvdG9jb2wgZm9yIFRvdGFsIE1hbHdhcmUgRXh0ZXJtaW5hdGlvbiB3aXRoIE11bHRpLUxheWVyIEJhcnJpZXIgQ2FzY2FkZVxuICBjb25zdCB0cmlnZ2VyRnVsbEV4dGVybWluYXRpb25DYXNjYWRlID0gKCkgPT4ge1xuICAgIGFkZENvbWJhdExvZyhgW1BST1RPS8OTxYEgV09KU0tPV1ldIFVydWNob21pb25vIHByb2NlZHVyxJkgQ2HFgmtvd2l0ZWogRWtzdGVybWluYWNqaSBNYWx3YXJlIHogS2Fza2FkxIUgQmFyaWVyIGkgU2lhdGvEhSBMYXNlcm93xIUuYCk7XG4gICAgcGxheVJhZGFyVG9uZSgxMzAwLCA1MDAsICdzcXVhcmUnKTtcbiAgICBzZXRBdXRvUHVyZ2VBY3RpdmUodHJ1ZSk7XG5cbiAgICBjb25zdCBhY3RpdmVUYXJnZXRzID0gZ25pZGFzLmZpbHRlcihnID0+IGcuc3RhdGUgIT09ICdaTklTWkNaT05BJyk7XG4gICAgaWYgKGFjdGl2ZVRhcmdldHMubGVuZ3RoID09PSAwKSB7XG4gICAgICBzZXRTZWN1cmVkTGF5ZXJzKHByZXYgPT4gcHJldi5tYXAobCA9PiAoe1xuICAgICAgICAuLi5sLFxuICAgICAgICBpc1NlY3VyZWQ6IHRydWUsXG4gICAgICAgIHN0YWdlOiAnRk9SVElGSUVEJyxcbiAgICAgICAgc2hpZWxkUGVyY2VudDogMTAwLFxuICAgICAgICBsYXNlckludGVuc2l0eTogMTAwLFxuICAgICAgICBhY3RpdmVCZWFtc0NvdW50OiA0XG4gICAgICB9KSkpO1xuICAgICAgc2V0Q2FzY2FkZVN0YXRlKGMgPT4gKHtcbiAgICAgICAgLi4uYyxcbiAgICAgICAgc3RhZ2U6ICdGT1JUSUZJRUQnLFxuICAgICAgICB0b3RhbE1hbHdhcmVFeHRlcm1pbmF0ZWQ6IHRydWUsXG4gICAgICAgIG92ZXJhbGxGb3J0cmVzc1NoaWVsZFBlcmNlbnQ6IDEwMCxcbiAgICAgICAgc3RhdHVzTWVzc2FnZTogJ/CfkZEgV3N6eXN0a2llIDQgd2Fyc3R3eSBtb25vbGl0dSB3IDEwMCUgemFiZXpwaWVjem9uZSBrb3Jkb25lbSBwYW5jZXJueW0gaSBsYXNlcmVtLidcbiAgICAgIH0pKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZShhY3RpdmVUYXJnZXRzWzBdKTtcbiAgfTtcblxuICAvLyBNYXN0ZXIgQ29tbWFuZDogSW5zdGFudCBFeHRlcm1pbmF0aW9uIG9mIEFMTCBHbmlkYXMgKFVzZXIgRGlyZWN0aXZlOiBcImZpcnN0IGtpbGwgZ25pZGFzXCIpXG4gIGNvbnN0IGV4ZWN1dGVLaWxsQWxsR25pZGFzTm93ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHBsYXlSYWRhclRvbmUoMTQwMCwgNjAwLCAnc3F1YXJlJyk7XG4gICAgYWRkQ29tYmF0TG9nKGBb8J+SpSBST1pLQVogV09KU0tPV1k6IEZJUlNUIEtJTEwgR05JREFTXSBOYXR5Y2htaWFzdG93eSB1YsOzaiBpIG5ldXRyYWxpemFjamEgV1NaWVNUS0lDSCBHbmlkIHcgTW9ub2xpY2llIWApO1xuXG4gICAgc2V0R25pZGFzKHByZXYgPT4ge1xuICAgICAgY29uc3Qgc2xhdWdodGVyZWQgPSBwcmV2Lm1hcChnID0+IHtcbiAgICAgICAgYWRkQ29tYmF0TG9nKGBbVULDk0ogR05JRFldIFpsaWt3aWRvd2FubyBwYXNvxbx5dGE6ICR7Zy5uYW1lfSAoJHtnLmFjdGl2ZVByb2Nlc3NOYW1lfSkuIFd5emVyb3dhbm8gbmFnxYLDs3dlayBNWi9QRSwgb2RjacSZdG8ga3Vyc29yIGkgcGFtacSZxIcgUkFNLmApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmcsXG4gICAgICAgICAgc3RhdGU6ICdaTklTWkNaT05BJyBhcyBjb25zdCxcbiAgICAgICAgICBoZWFsdGhQZXJjZW50OiAwXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfZ25pZGFzJywgc2xhdWdodGVyZWQpO1xuICAgICAgcmV0dXJuIHNsYXVnaHRlcmVkO1xuICAgIH0pO1xuXG4gICAgc2V0SW9Ob2RlcyhwcmV2ID0+IHtcbiAgICAgIGNvbnN0IHJlc3RvcmVkID0gcHJldi5tYXAobm9kZSA9PiAoe1xuICAgICAgICAuLi5ub2RlLFxuICAgICAgICBzdGF0dXM6ICdSRUNPTlNUUlVDVEVEJyBhcyBjb25zdCxcbiAgICAgICAgY29tcHJvbWlzZWRCeUduaWRhSWQ6IG51bGwsXG4gICAgICAgIGlzU2hpZWxkZWQ6IHRydWVcbiAgICAgIH0pKTtcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfaW9fbm9kZXMnLCByZXN0b3JlZCk7XG4gICAgICByZXR1cm4gcmVzdG9yZWQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCBmdWxseUZvcnRpZmllZExheWVyczogU2VjdXJlZExheWVyWm9uZVtdID0gSU5JVElBTF9TRUNVUkVEX0xBWUVSUy5tYXAobCA9PiAoe1xuICAgICAgLi4ubCxcbiAgICAgIGlzU2VjdXJlZDogdHJ1ZSxcbiAgICAgIHN0YWdlOiAnRk9SVElGSUVEJyBhcyBjb25zdCxcbiAgICAgIHNoaWVsZFBlcmNlbnQ6IDEwMCxcbiAgICAgIGxhc2VySW50ZW5zaXR5OiAxMDAsXG4gICAgICBhY3RpdmVCZWFtc0NvdW50OiA0LFxuICAgICAgY2xlYW5zZWROb2Rlc0NvdW50OiAzLFxuICAgICAgc2VjdXJlZFRpbWVzdGFtcDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKVxuICAgIH0pKTtcbiAgICBzZXRTZWN1cmVkTGF5ZXJzKGZ1bGx5Rm9ydGlmaWVkTGF5ZXJzKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX3NlY3VyZWRfbGF5ZXJzJywgZnVsbHlGb3J0aWZpZWRMYXllcnMpO1xuXG4gICAgc2V0Q2FzY2FkZVN0YXRlKHtcbiAgICAgIHN0YWdlOiAnRk9SVElGSUVEJyxcbiAgICAgIGlzQWN0aXZlOiB0cnVlLFxuICAgICAgY3VycmVudFNlY3Rvck5hbWU6ICdXc3p5c3RraWUgU2VrdG9yeSBNb25vbGl0dSAoMC0zNjDCsCknLFxuICAgICAgY3VycmVudEJlYXJpbmdEZWc6IDAsXG4gICAgICBjdXJyZW50RGlzdGFuY2VSYXRpbzogMC41LFxuICAgICAgYWN0aXZlTGFzZXJPcmlnaW46IG51bGwsXG4gICAgICBhY3RpdmVMYXNlclRhcmdldHM6IFtdLFxuICAgICAgc2VjdXJlZExheWVyczogZnVsbHlGb3J0aWZpZWRMYXllcnMsXG4gICAgICB0b3RhbE1hbHdhcmVFeHRlcm1pbmF0ZWQ6IHRydWUsXG4gICAgICBvdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50OiAxMDAsXG4gICAgICBzdGF0dXNNZXNzYWdlOiAn8J+RkSBXU1pZU1RLSUUgR05JRFkgWk9TVEHFgVkgWkxJS1dJRE9XQU5FIChGSVJTVCBLSUxMIEdOSURBUykhIEtvcmRvbiBhbnR5d2lydXNvd3kgaSBzaWF0a2EgbGFzZXJvd2EgdyAxMDAlIHphYmV6cGllY3p5xYJ5IG1vbm9saXQuJ1xuICAgIH0pO1xuXG4gICAgc2V0SHVudGVyU3RhdGUocHJldiA9PiAoe1xuICAgICAgLi4ucHJldixcbiAgICAgIHN0YXR1czogJ1ZJQ1RPUlknLFxuICAgICAga2lsbHNDb3VudDogcHJldi5raWxsc0NvdW50ICsgNSxcbiAgICAgIHNsYXVnaHRlclBvd2VyOiAxMDAsXG4gICAgICBmaXhlZE5vZGVzQ291bnQ6IDksXG4gICAgICB0YXJnZXRHbmlkYUlkOiBudWxsLFxuICAgICAgcmVwYWlyUHJvZ3Jlc3M6IDEwMFxuICAgIH0pKTtcblxuICAgIHNldEF1dG9QdXJnZUFjdGl2ZShmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHJvY3MgPSBzYWZlU3RvcmFnZS5nZXQ8YW55W10+KCdzZW50aW5lbF9zaW11bGF0ZWRfcHJvY2Vzc2VzJywgW10pO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocHJvY3MpKSB7XG4gICAgICAgIGNvbnN0IGtpbGxlZFByb2NzID0gcHJvY3MubWFwKHAgPT4gKHsgLi4ucCwgc3RhdHVzOiAnbmV1dHJhbGl6ZWQnLCBpc0Jsb2NrZWQ6IHRydWUsIG9wYWNpdHk6IDAuMSB9KSk7XG4gICAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfc2ltdWxhdGVkX3Byb2Nlc3NlcycsIGtpbGxlZFByb2NzKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIGlnbm9yZVxuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDphbGwtZ25pZGFzLWtpbGxlZCcpKTtcbiAgICB9XG4gIH0sIFtwbGF5UmFkYXJUb25lLCBhZGRDb21iYXRMb2ddKTtcblxuICAvLyBHbG9iYWwgbGlzdGVuZXIgZm9yIGNyb3NzLWNvbXBvbmVudCBraWxsIGNvbW1hbmRzXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlR2xvYmFsS2lsbCA9ICgpID0+IHtcbiAgICAgIGV4ZWN1dGVLaWxsQWxsR25pZGFzTm93KCk7XG4gICAgfTtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzZW50aW5lbDpraWxsLWFsbC1nbmlkYXMnLCBoYW5kbGVHbG9iYWxLaWxsKTtcbiAgICB9XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6a2lsbC1hbGwtZ25pZGFzJywgaGFuZGxlR2xvYmFsS2lsbCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSwgW2V4ZWN1dGVLaWxsQWxsR25pZGFzTm93XSk7XG5cbiAgLy8gQXV0b25vbW91cyBHZW1pbmkgSHVudGVyIEZsaWdodCAmIFNsYXVnaHRlciBFbmdpbmVcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWF1dG9QdXJnZUFjdGl2ZSkgcmV0dXJuO1xuXG4gICAgY29uc3QgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBhY3RpdmVUYXJnZXRzID0gZ25pZGFzLmZpbHRlcihnID0+IGcuc3RhdGUgIT09ICdaTklTWkNaT05BJyk7XG4gICAgICBcbiAgICAgIGlmIChhY3RpdmVUYXJnZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBzZXRBdXRvUHVyZ2VBY3RpdmUoZmFsc2UpO1xuICAgICAgICBzZXRIdW50ZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICBzdGF0dXM6ICdQQVRST0wnLFxuICAgICAgICAgIHRhcmdldEduaWRhSWQ6IG51bGwsXG4gICAgICAgICAgcmVwYWlyUHJvZ3Jlc3M6IDEwMFxuICAgICAgICB9KSk7XG4gICAgICAgIGFkZENvbWJhdExvZyhgW1NFS1RPUiBPQ1pZU1pDWk9OWV0gV3N6eXN0a2llIEduaWR5IHpvc3RhxYJ5IHcgMTAwJSB6bGlrd2lkb3dhbmUuIE1vbm9saXQgc3lzdGVtb3d5IGkgbW9uaXRvciBiZXpwaWVjem5lLmApO1xuICAgICAgICBwbGF5UmFkYXJUb25lKDg4MCwgNDAwLCAndHJpYW5nbGUnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjdXJyZW50VGFyZ2V0ID0gYWN0aXZlVGFyZ2V0c1swXTtcblxuICAgICAgc2V0SHVudGVyU3RhdGUocHJldiA9PiB7XG4gICAgICAgIGNvbnN0IGFuZ2xlRGlmZiA9IChjdXJyZW50VGFyZ2V0LmJlYXJpbmdEZWcgLSBwcmV2LmJlYXJpbmdEZWcgKyAzNjApICUgMzYwO1xuICAgICAgICBjb25zdCBzdGVwQW5nbGUgPSBhbmdsZURpZmYgPiAxODAgPyAtMTIgOiAxMjtcbiAgICAgICAgY29uc3QgbmV3QW5nbGUgPSAocHJldi5iZWFyaW5nRGVnICsgc3RlcEFuZ2xlICsgMzYwKSAlIDM2MDtcbiAgICAgICAgY29uc3QgbmV3RGlzdCA9IHByZXYuZGlzdGFuY2VSYXRpbyArIChjdXJyZW50VGFyZ2V0LmRpc3RhbmNlUmF0aW8gLSBwcmV2LmRpc3RhbmNlUmF0aW8pICogMC4zNTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgYmVhcmluZ0RlZzogbmV3QW5nbGUsXG4gICAgICAgICAgZGlzdGFuY2VSYXRpbzogbmV3RGlzdCxcbiAgICAgICAgICB0YXJnZXRHbmlkYUlkOiBjdXJyZW50VGFyZ2V0LmlkLFxuICAgICAgICAgIHN0YXR1czogJ0xPQ0tfT04nLFxuICAgICAgICAgIGFjdGl2ZUJlYW1BbmdsZTogY3VycmVudFRhcmdldC5iZWFyaW5nRGVnXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgLy8gQXR0YWNrICYgU2xhdWdodGVyIFByb2dyZXNzaW9uIHdpdGggQW50aXZpcnVzIEJhcnJpZXIgVHJpZ2dlclxuICAgICAgc2V0R25pZGFzKHByZXZHbmlkYXMgPT4ge1xuICAgICAgICByZXR1cm4gcHJldkduaWRhcy5tYXAoZyA9PiB7XG4gICAgICAgICAgaWYgKGcuaWQgIT09IGN1cnJlbnRUYXJnZXQuaWQpIHJldHVybiBnO1xuXG4gICAgICAgICAgaWYgKGcuc3RhdGUgPT09ICdXWUtSWVRBJykge1xuICAgICAgICAgICAgYWRkQ29tYmF0TG9nKGBbxYFPV0NBIEdFTUlOSV0gTmFtaWVyemVuaWUgd2nEhXprxIUgcmFkYXJvd8SFOiAke2cubmFtZX0gKFfEmXplxYI6ICR7Zy5hc3NvY2lhdGVkSU9Ob2RlSWR9KWApO1xuICAgICAgICAgICAgcGxheVJhZGFyVG9uZSg2MDAsIDE1MCwgJ3Nhd3Rvb3RoJyk7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5nLCBzdGF0ZTogJ05BTUlFUlpPTkEnIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChnLnN0YXRlID09PSAnTkFNSUVSWk9OQScpIHtcbiAgICAgICAgICAgIGFkZENvbWJhdExvZyhgW09TVFJaQcWBIFJBTV0gTnRTdXNwZW5kUHJvY2VzcyB3c3RyenlrbmnEmXR5IGRvICR7Zy5hY3RpdmVQcm9jZXNzTmFtZX0uIFfEhXRraSB6YW1yb8W8b25lLmApO1xuICAgICAgICAgICAgcGxheVJhZGFyVG9uZSg3NTAsIDE4MCwgJ3NxdWFyZScpO1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uZywgc3RhdGU6ICdPU1RSWkFMX1dfVE9LVScsIGhlYWx0aFBlcmNlbnQ6IDUwIH07XG4gICAgICAgICAgfSBlbHNlIGlmIChnLnN0YXRlID09PSAnT1NUUlpBTF9XX1RPS1UnKSB7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIEFudGl2aXJ1cyBDYXNjYWRlIGZvciB0aGlzIGRlc3Ryb3llZCB0YXJnZXQhXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgdHJpZ2dlckFudGl2aXJ1c0Nhc2NhZGUoZyk7XG4gICAgICAgICAgICB9LCA1MCk7XG5cbiAgICAgICAgICAgIHNldEh1bnRlclN0YXRlKGggPT4gKHtcbiAgICAgICAgICAgICAgLi4uaCxcbiAgICAgICAgICAgICAga2lsbHNDb3VudDogaC5raWxsc0NvdW50ICsgMSxcbiAgICAgICAgICAgICAgZml4ZWROb2Rlc0NvdW50OiBoLmZpeGVkTm9kZXNDb3VudCArIDEsXG4gICAgICAgICAgICAgIHJlcGFpclByb2dyZXNzOiBNYXRoLm1pbigxMDAsIGgucmVwYWlyUHJvZ3Jlc3MgKyAxNSlcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICAgICAgcmV0dXJuIHsgLi4uZywgc3RhdGU6ICdaTklTWkNaT05BJywgaGVhbHRoUGVyY2VudDogMCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgIH0sIDEyMDApO1xuXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbYXV0b1B1cmdlQWN0aXZlLCBnbmlkYXMsIGFkZENvbWJhdExvZywgcGxheVJhZGFyVG9uZSwgdHJpZ2dlckFudGl2aXJ1c0Nhc2NhZGVdKTtcblxuICAvLyBTYXZlIHRvIHNhZmUgc3RvcmFnZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfcmFkYXJfZ25pZGFzJywgZ25pZGFzKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3JhZGFyX2lvX25vZGVzJywgaW9Ob2Rlcyk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9yYWRhcl9zZWN1cmVkX2xheWVycycsIHNlY3VyZWRMYXllcnMpO1xuICB9LCBbZ25pZGFzLCBpb05vZGVzLCBzZWN1cmVkTGF5ZXJzXSk7XG5cbiAgLy8gQ2FudmFzIERyYXdpbmcgZm9yIENsYXNzaWMgTWlsaXRhcnkgUFBJIFJhZGFyIENSVCBEaXNwbGF5XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBpZiAoIWN0eCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgd2lkdGggPSBjYW52YXMud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gY2FudmFzLmhlaWdodDtcbiAgICBjb25zdCBjZW50ZXJYID0gd2lkdGggLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSBoZWlnaHQgLyAyO1xuICAgIGNvbnN0IHJhZGl1cyA9IE1hdGgubWluKGNlbnRlclgsIGNlbnRlclkpIC0gMjA7XG5cbiAgICAvLyBDbGVhciBDYW52YXMgd2l0aCBNaWxpdGFyeSBSYWRhciBHcmVlbi1CbGFjayBHbG93XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDMwODA2JztcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG5cbiAgICAvLyAxLiBSYWRhciBDaXJjdWxhciBCYWNrZ3JvdW5kIEdyYWRpZW50c1xuICAgIGNvbnN0IHJhZGlhbEdyYWQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoY2VudGVyWCwgY2VudGVyWSwgNSwgY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzKTtcbiAgICByYWRpYWxHcmFkLmFkZENvbG9yU3RvcCgwLCAncmdiYSgwLCAzNSwgMTUsIDAuNyknKTtcbiAgICByYWRpYWxHcmFkLmFkZENvbG9yU3RvcCgwLjcsICdyZ2JhKDAsIDIwLCA4LCAwLjg1KScpO1xuICAgIHJhZGlhbEdyYWQuYWRkQ29sb3JTdG9wKDEsICdyZ2JhKDEsIDEwLCA0LCAwLjk4KScpO1xuICAgIGN0eC5maWxsU3R5bGUgPSByYWRpYWxHcmFkO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIHJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICAvLyAyLiBDb25jZW50cmljIFJhbmdlIFJpbmdzICYgQW50aXZpcnVzIExheWVyIFNoaWVsZCBCYW5kc1xuICAgIGNvbnN0IHJpbmdGcmFjdGlvbnMgPSBbMC4yNSwgMC41MCwgMC43NSwgMS4wXTtcbiAgICBjb25zdCByaW5nTGFiZWxzID0gWycyNSBLTSAoUmR6ZcWEIE5UKScsICc1MCBLTSAoUGFtacSZxIcgUkFNKScsICc3NSBLTSAoTW9uaXRvciAmIEkvTyknLCAnMTAwIEtNIChQZXJ5bWV0ciknXTtcblxuICAgIC8vIERyYXcgU2VjdXJlZCBMYXllciBTaGllbGQgQmFuZHNcbiAgICBzZWN1cmVkTGF5ZXJzLmZvckVhY2goKGxheWVyLCBpZHgpID0+IHtcbiAgICAgIGlmIChsYXllci5pc1NlY3VyZWQpIHtcbiAgICAgICAgY29uc3QgaW5uZXJSID0gaWR4ID09PSAwID8gMCA6IHJhZGl1cyAqIHJpbmdGcmFjdGlvbnNbaWR4IC0gMV07XG4gICAgICAgIGNvbnN0IG91dGVyUiA9IHJhZGl1cyAqIHJpbmdGcmFjdGlvbnNbaWR4XTtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgb3V0ZXJSLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGlmIChpbm5lclIgPiAwKSB7XG4gICAgICAgICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCBpbm5lclIsIDAsIE1hdGguUEkgKiAyLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG5cbiAgICAgICAgLy8gTGF5ZXIgU3RhZ2UgVGludFxuICAgICAgICBpZiAobGF5ZXIuc3RhZ2UgPT09ICdJTU1FRElBVEVfTE9DSycpIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMDAsIDAuMTYpJztcbiAgICAgICAgfSBlbHNlIGlmIChsYXllci5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUicpIHtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjQwLCAyNTUsIDAuMjIpJztcbiAgICAgICAgfSBlbHNlIGlmIChsYXllci5zdGFnZSA9PT0gJ05FSUdIQk9SX0NBU0NBREUnKSB7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDE2LCAxODUsIDEyOSwgMC4yMCknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSg1LCAxNTAsIDEwNSwgMC4xMiknO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICByaW5nRnJhY3Rpb25zLmZvckVhY2goKGZyYWMsIGlkeCkgPT4ge1xuICAgICAgY29uc3QgciA9IHJhZGl1cyAqIGZyYWM7XG4gICAgICBjb25zdCBsYXllciA9IHNlY3VyZWRMYXllcnNbaWR4XTtcbiAgICAgIGNvbnN0IGlzU2VjdXJlZCA9IGxheWVyPy5pc1NlY3VyZWQ7XG5cbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgciwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNTZWN1cmVkIFxuICAgICAgICA/ICdyZ2JhKDAsIDI1NSwgMjAwLCAwLjc1KScgXG4gICAgICAgIDogaWR4ID09PSAzID8gJ3JnYmEoMCwgMjU1LCAxMDAsIDAuNSknIDogJ3JnYmEoMCwgMjU1LCAxMDAsIDAuMiknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IGlzU2VjdXJlZCA/IDIuMiA6IChpZHggPT09IDMgPyAyIDogMSk7XG4gICAgICBjdHguc2V0TGluZURhc2goaWR4ID09PSAzIHx8IGlzU2VjdXJlZCA/IFtdIDogWzQsIDRdKTtcbiAgICAgIGlmIChpc1NlY3VyZWQpIHtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmY2MnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDg7XG4gICAgICB9XG4gICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDA7XG4gICAgICBjdHguc2V0TGluZURhc2goW10pO1xuXG4gICAgICAvLyBSaW5nIFJhbmdlIERpc3RhbmNlIExhYmVscyArIFNoaWVsZCBTdGF0dXNcbiAgICAgIGN0eC5mb250ID0gJzlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICBjdHguZmlsbFN0eWxlID0gaXNTZWN1cmVkID8gJyMwMGZmY2MnIDogJ3JnYmEoMCwgMjU1LCAxMDAsIDAuNiknO1xuICAgICAgY29uc3Qgc3RhdHVzU3VmZml4ID0gaXNTZWN1cmVkID8gYCBb8J+boe+4jyAke2xheWVyLnNoaWVsZFBlcmNlbnR9JSBUQVJDWkFdYCA6ICcnO1xuICAgICAgY3R4LmZpbGxUZXh0KGAke3JpbmdMYWJlbHNbaWR4XX0ke3N0YXR1c1N1ZmZpeH1gLCBjZW50ZXJYICsgOCwgY2VudGVyWSAtIHIgKyAxMik7XG4gICAgfSk7XG5cbiAgICAvLyAzLiBBemltdXRoIENyb3NzaGFpcnMgJiAzMC1kZWdyZWUgU2VjdG9yIExpbmVzXG4gICAgZm9yIChsZXQgZGVnID0gMDsgZGVnIDwgMzYwOyBkZWcgKz0gMzApIHtcbiAgICAgIGNvbnN0IHJhZCA9IChkZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb25zdCB4RW5kID0gY2VudGVyWCArIHJhZGl1cyAqIE1hdGguY29zKHJhZCk7XG4gICAgICBjb25zdCB5RW5kID0gY2VudGVyWSArIHJhZGl1cyAqIE1hdGguc2luKHJhZCk7XG5cbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICBjdHgubGluZVRvKHhFbmQsIHlFbmQpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gKGRlZyAlIDkwID09PSAwKSA/ICdyZ2JhKDAsIDI1NSwgMTAwLCAwLjM1KScgOiAncmdiYSgwLCAyNTUsIDEwMCwgMC4xMiknO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IChkZWcgJSA5MCA9PT0gMCkgPyAxLjUgOiAwLjg7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIERlZ3JlZSBMYWJlbHNcbiAgICAgIGNvbnN0IGxhYmVsRGlzdCA9IHJhZGl1cyArIDEyO1xuICAgICAgY29uc3QgeExibCA9IGNlbnRlclggKyBsYWJlbERpc3QgKiBNYXRoLmNvcyhyYWQpO1xuICAgICAgY29uc3QgeUxibCA9IGNlbnRlclkgKyBsYWJlbERpc3QgKiBNYXRoLnNpbihyYWQpO1xuICAgICAgY3R4LmZvbnQgPSAnMTBweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICBjdHguZmlsbFN0eWxlID0gKGRlZyAlIDkwID09PSAwKSA/ICdyZ2JhKDAsIDI1NSwgMTUwLCAwLjkpJyA6ICdyZ2JhKDAsIDI1NSwgMTAwLCAwLjUpJztcbiAgICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgICAgIGN0eC5maWxsVGV4dChgJHtkZWd9wrBgLCB4TGJsLCB5TGJsKTtcbiAgICB9XG5cbiAgICAvLyAzYi4gQWN0aXZlIEFudGl2aXJ1cyBDYXNjYWRlIExhc2VyIEVtaXR0ZXJzICYgTmVpZ2hib3JpbmcgU3Bva2UgQ29uZHVpdHNcbiAgICBpZiAoY2FzY2FkZVN0YXRlLmlzQWN0aXZlICYmIChjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInIHx8IGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ05FSUdIQk9SX0NBU0NBREUnIHx8IGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0lNTUVESUFURV9MT0NLJykpIHtcbiAgICAgIGNvbnN0IHRhcmdldFJhZCA9IChjYXNjYWRlU3RhdGUuY3VycmVudEJlYXJpbmdEZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb25zdCB0YXJnZXREaXN0ID0gcmFkaXVzICogY2FzY2FkZVN0YXRlLmN1cnJlbnREaXN0YW5jZVJhdGlvO1xuICAgICAgY29uc3QgdHggPSBjZW50ZXJYICsgdGFyZ2V0RGlzdCAqIE1hdGguY29zKHRhcmdldFJhZCk7XG4gICAgICBjb25zdCB0eSA9IGNlbnRlclkgKyB0YXJnZXREaXN0ICogTWF0aC5zaW4odGFyZ2V0UmFkKTtcblxuICAgICAgLy8gUHJpbWFyeSBJbmNpbmVyYXRpb24gTGFzZXIgQmVhbSBmcm9tIE1vbm9saXRoIENvcmVcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICBjdHgubGluZVRvKHR4LCB0eSk7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInID8gJyNmZjAwNTUnIDogJyMwMGZmZmYnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDMuNTtcbiAgICAgIGN0eC5zaGFkb3dDb2xvciA9IGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ1NFQ1RPUl9MQVNFUicgPyAnI2ZmMDA1NScgOiAnIzAwZmZmZic7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDIwO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAvLyBMYXNlciBTd2VlcCBBcmMgb24gQ3VycmVudCBTZWN0b3JcbiAgICAgIGNvbnN0IGFyY1N0YXJ0ID0gdGFyZ2V0UmFkIC0gMC40O1xuICAgICAgY29uc3QgYXJjRW5kID0gdGFyZ2V0UmFkICsgMC40O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCB0YXJnZXREaXN0LCBhcmNTdGFydCwgYXJjRW5kKTtcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICdyZ2JhKDAsIDI1NSwgMjQwLCAwLjkpJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAyLjU7XG4gICAgICBjdHguc2hhZG93Q29sb3IgPSAnIzAwZmZmZic7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAvLyBOZWlnaGJvcmluZyBMYXllciBDb25kdWl0c1xuICAgICAgaWYgKGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ05FSUdIQk9SX0NBU0NBREUnKSB7XG4gICAgICAgIFstMC4zLCAwLjNdLmZvckVhY2gob2Zmc2V0ID0+IHtcbiAgICAgICAgICBjb25zdCBzcG9rZVJhZCA9IHRhcmdldFJhZCArIG9mZnNldDtcbiAgICAgICAgICBjb25zdCBzeCA9IGNlbnRlclggKyByYWRpdXMgKiAwLjkgKiBNYXRoLmNvcyhzcG9rZVJhZCk7XG4gICAgICAgICAgY29uc3Qgc3kgPSBjZW50ZXJZICsgcmFkaXVzICogMC45ICogTWF0aC5zaW4oc3Bva2VSYWQpO1xuXG4gICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgIGN0eC5tb3ZlVG8odHgsIHR5KTtcbiAgICAgICAgICBjdHgubGluZVRvKHN4LCBzeSk7XG4gICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoNTIsIDIxMSwgMTUzLCAwLjg1KSc7XG4gICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XG4gICAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMzNGQzOTknO1xuICAgICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMTI7XG4gICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gNC4gRHJhdyBTeXN0ZW0gSS9PIE5vZGVzIG9uIFJhZGFyIEdyaWQgKE1vbml0b3IsIFJBTSwgU3RvcmFnZSwgTklDLCBLZXlib2FyZClcbiAgICBpb05vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBjb25zdCByYWQgPSAobm9kZS5yYWRhckFuZ2xlRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgY29uc3QgZGlzdCA9IHJhZGl1cyAqIG5vZGUucmFkYXJSaW5nUmFkaXVzO1xuICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBkaXN0ICogTWF0aC5jb3MocmFkKTtcbiAgICAgIGNvbnN0IHkgPSBjZW50ZXJZICsgZGlzdCAqIE1hdGguc2luKHJhZCk7XG5cbiAgICAgIGNvbnN0IGlzQ29tcHJvbWlzZWQgPSBub2RlLnN0YXR1cyA9PT0gJ0NPTVBST01JU0VEJztcbiAgICAgIGNvbnN0IGlzUmVjb25zdHJ1Y3RlZCA9IG5vZGUuc3RhdHVzID09PSAnUkVDT05TVFJVQ1RFRCc7XG4gICAgICBjb25zdCBpc1NoaWVsZGVkID0gbm9kZS5pc1NoaWVsZGVkIHx8IGlzUmVjb25zdHJ1Y3RlZDtcblxuICAgICAgLy8gSGV4YWdvbmFsIFNoaWVsZCBGb3JjZWZpZWxkIEZyYW1lIGlmIFByb3RlY3RlZFxuICAgICAgaWYgKGlzU2hpZWxkZWQpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICAgIGNvbnN0IGEgPSAoaSAqIDYwIC0gMzApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICAgIGNvbnN0IGh4ID0geCArIDE2ICogTWF0aC5jb3MoYSk7XG4gICAgICAgICAgY29uc3QgaHkgPSB5ICsgMTYgKiBNYXRoLnNpbihhKTtcbiAgICAgICAgICBpZiAoaSA9PT0gMCkgY3R4Lm1vdmVUbyhoeCwgaHkpO1xuICAgICAgICAgIGVsc2UgY3R4LmxpbmVUbyhoeCwgaHkpO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMGZmY2MnO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMDQsIDAuMTgpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuODtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmY2MnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDEwO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcbiAgICAgIH1cblxuICAgICAgLy8gTm9kZSBIYWxvIEJveFxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LnJlY3QoeCAtIDksIHkgLSA5LCAxOCwgMTgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQ29tcHJvbWlzZWQgXG4gICAgICAgID8gJ3JnYmEoMjU1LCA1MCwgNTAsIDAuMjUpJyBcbiAgICAgICAgOiBpc1NoaWVsZGVkIFxuICAgICAgICA/ICdyZ2JhKDAsIDI1NSwgMjAwLCAwLjI4KScgXG4gICAgICAgIDogJ3JnYmEoMCwgMTUwLCAyNTUsIDAuMiknO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gaXNDb21wcm9taXNlZCBcbiAgICAgICAgPyAnI2ZmMzM0NCcgXG4gICAgICAgIDogaXNTaGllbGRlZCBcbiAgICAgICAgPyAnIzAwZmZjYycgXG4gICAgICAgIDogJyMwMGJiZmYnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFNwZWNpYWwgSWNvbiBNYXJrIGZvciBNb25pdG9yXG4gICAgICBpZiAobm9kZS5pZCA9PT0gJ25vZGUtbW9uaXRvcicpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZlZWRkJztcbiAgICAgICAgY3R4LmZvbnQgPSAnYm9sZCA4cHggbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxUZXh0KCdNT05JVE9SJywgeCwgeSAtIDE0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29kZSB0YWdcbiAgICAgIGN0eC5mb250ID0gJzhweCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzQ29tcHJvbWlzZWQgPyAnI2ZmODg4OCcgOiBpc1NoaWVsZGVkID8gJyMwMGZmY2MnIDogJyM4OGVlZmYnO1xuICAgICAgY3R4LmZpbGxUZXh0KG5vZGUuY29kZSwgeCwgeSArIDE1KTtcbiAgICB9KTtcblxuICAgIC8vIDUuIERyYXcgUmFkYXIgUm90YXRpbmcgU3dlZXAgQmVhbSB3aXRoIFBob3NwaG9yIFRyYWlsXG4gICAgY29uc3Qgc3dlZXBSYWQgPSAoc3dlZXBBbmdsZSAtIDkwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICBjb25zdCB0cmFpbFNlZ21lbnRzID0gMjU7XG4gICAgY29uc3QgdHJhaWxBbmdsZVNwYW4gPSAwLjU1OyAvLyBpbiByYWRpYW5zXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRyYWlsU2VnbWVudHM7IGkrKykge1xuICAgICAgY29uc3Qgc3RhcnRBID0gc3dlZXBSYWQgLSAodHJhaWxBbmdsZVNwYW4gKiAoaSArIDEpKSAvIHRyYWlsU2VnbWVudHM7XG4gICAgICBjb25zdCBlbmRBID0gc3dlZXBSYWQgLSAodHJhaWxBbmdsZVNwYW4gKiBpKSAvIHRyYWlsU2VnbWVudHM7XG4gICAgICBjb25zdCBhbHBoYSA9ICgxIC0gaSAvIHRyYWlsU2VnbWVudHMpICogMC4yMjtcblxuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYLCBjZW50ZXJZKTtcbiAgICAgIGN0eC5hcmMoY2VudGVyWCwgY2VudGVyWSwgcmFkaXVzLCBzdGFydEEsIGVuZEEpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2JhKDAsIDI1NSwgMTIwLCAke2FscGhhfSlgO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG5cbiAgICAvLyBMZWFkaW5nIEhpZ2gtSW50ZW5zaXR5IFN3ZWVwIExpbmVcbiAgICBjb25zdCBzd2VlcFggPSBjZW50ZXJYICsgcmFkaXVzICogTWF0aC5jb3Moc3dlZXBSYWQpO1xuICAgIGNvbnN0IHN3ZWVwWSA9IGNlbnRlclkgKyByYWRpdXMgKiBNYXRoLnNpbihzd2VlcFJhZCk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oY2VudGVyWCwgY2VudGVyWSk7XG4gICAgY3R4LmxpbmVUbyhzd2VlcFgsIHN3ZWVwWSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMTgwLCAyNTUsIDIwMCwgMC45NSknO1xuICAgIGN0eC5saW5lV2lkdGggPSAyLjI7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwgMjU1LCAxMjAsIDAuOCknO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTA7XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMDsgLy8gcmVzZXRcblxuICAgIC8vIDYuIERyYXcgR25pZGFzIChUaHJlYXQgVGFyZ2V0cykgd2l0aCBBaXItVHJhZmZpYyBSYWRhciBCbGlwc1xuICAgIGduaWRhcy5mb3JFYWNoKGduaWRhID0+IHtcbiAgICAgIGNvbnN0IHNjb3JlID0gZ2V0R25pZGFUaHJlYXRTY29yZShnbmlkYSk7XG4gICAgICBjb25zdCBjb2xvckNmZyA9IGdldFRocmVhdENvbG9yKHNjb3JlKTtcbiAgICAgIGNvbnN0IGduaWRhUmFkID0gKGduaWRhLmJlYXJpbmdEZWcgLSA5MCkgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgICBjb25zdCBnbmlkYURpc3QgPSByYWRpdXMgKiBnbmlkYS5kaXN0YW5jZVJhdGlvO1xuICAgICAgY29uc3QgeCA9IGNlbnRlclggKyBnbmlkYURpc3QgKiBNYXRoLmNvcyhnbmlkYVJhZCk7XG4gICAgICBjb25zdCB5ID0gY2VudGVyWSArIGduaWRhRGlzdCAqIE1hdGguc2luKGduaWRhUmFkKTtcblxuICAgICAgY29uc3QgaXNEZXN0cm95ZWQgPSBnbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnO1xuICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IGduaWRhLmlkID09PSBzZWxlY3RlZFRhcmdldElkO1xuXG4gICAgICBpZiAoaXNEZXN0cm95ZWQpIHtcbiAgICAgICAgLy8gRGVzdHJveWVkIHdyZWNrYWdlIG1hcmtlclxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCwgeSwgNCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTAwLCAxMDAsIDEwMCwgMC40KSc7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjNTU1NTU1JztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHguZm9udCA9ICc4cHggbW9ub3NwYWNlJztcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjNjY2NjY2JztcbiAgICAgICAgY3R4LmZpbGxUZXh0KGBbUFVSR0VEXWAsIHgsIHkgKyAxMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gTGl2ZSBHbmlkYSBCbGlwIChHbG93aW5nIERpYW1vbmQgd2l0aCBEeW5hbWljIFRocmVhdCBDb2xvcilcbiAgICAgIGNvbnN0IGJsaXBTaXplID0gaXNTZWxlY3RlZCA/IDggOiA2O1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyh4LCB5IC0gYmxpcFNpemUpO1xuICAgICAgY3R4LmxpbmVUbyh4ICsgYmxpcFNpemUsIHkpO1xuICAgICAgY3R4LmxpbmVUbyh4LCB5ICsgYmxpcFNpemUpO1xuICAgICAgY3R4LmxpbmVUbyh4IC0gYmxpcFNpemUsIHkpO1xuICAgICAgY3R4LmNsb3NlUGF0aCgpO1xuXG4gICAgICBjdHguZmlsbFN0eWxlID0gY29sb3JDZmcuaGV4O1xuICAgICAgY3R4LnNoYWRvd0NvbG9yID0gY29sb3JDZmcuZ2xvd0hleDtcbiAgICAgIGN0eC5zaGFkb3dCbHVyID0gaXNTZWxlY3RlZCA/IDE2IDogMTA7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgICAvLyBTZWxlY3Rpb24gUmV0aWNsZVxuICAgICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHgsIHksIDE1LCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFszLCAzXSk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgIH1cblxuICAgICAgLy8gQWlyLVRyYWZmaWMgVHJhY2sgVmVjdG9yIExlYWRlciBMaW5lXG4gICAgICBjb25zdCB2ZWN0b3JSYWQgPSBnbmlkYVJhZCArIE1hdGguUEkgLyA0O1xuICAgICAgY29uc3QgdmVjRW5kWCA9IHggKyAxOCAqIE1hdGguY29zKHZlY3RvclJhZCk7XG4gICAgICBjb25zdCB2ZWNFbmRZID0geSArIDE4ICogTWF0aC5zaW4odmVjdG9yUmFkKTtcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8oeCwgeSk7XG4gICAgICBjdHgubGluZVRvKHZlY0VuZFgsIHZlY0VuZFkpO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3JDZmcuaGV4O1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIC8vIFRyYW5zcG9uZGVyIFRhZyAmIFRhcmdldCBEZXRhaWxzXG4gICAgICBjdHguZm9udCA9ICdib2xkIDlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdsZWZ0JztcbiAgICAgIGN0eC5maWxsVGV4dChgJHtnbmlkYS5uYW1lLnNwbGl0KCcgJylbMF19YCwgeCArIDEwLCB5IC0gNCk7XG4gICAgICBjdHguZm9udCA9ICdib2xkIDhweCBtb25vc3BhY2UnO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yQ2ZnLmhleDtcbiAgICAgIGN0eC5maWxsVGV4dChgVEhSRUFUICR7c2NvcmV9JSB8IEFMVCAke2duaWRhLmFsdGl0dWRlS219a2AsIHggKyAxMCwgeSArIDYpO1xuICAgICAgY3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgIH0pO1xuXG4gICAgLy8gNy4gRHJhdyDFgU9XQ0EgR0VNSU5JIEFJIChJbnRlcmNlcHRvciBDb21iYXQgQmVhY29uKVxuICAgIGNvbnN0IGh1bnRlclJhZCA9IChodW50ZXJTdGF0ZS5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgIGNvbnN0IGh1bnRlckRpc3QgPSByYWRpdXMgKiBodW50ZXJTdGF0ZS5kaXN0YW5jZVJhdGlvO1xuICAgIGNvbnN0IGh4ID0gY2VudGVyWCArIGh1bnRlckRpc3QgKiBNYXRoLmNvcyhodW50ZXJSYWQpO1xuICAgIGNvbnN0IGh5ID0gY2VudGVyWSArIGh1bnRlckRpc3QgKiBNYXRoLnNpbihodW50ZXJSYWQpO1xuXG4gICAgLy8gSWYgR2VtaW5pIGlzIGxvY2tpbmcgb250byBhIHRhcmdldCwgZHJhdyBkeW5hbWljIGxhc2VyIGZpcmluZyBiZWFtXG4gICAgaWYgKGh1bnRlclN0YXRlLnRhcmdldEduaWRhSWQpIHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IGduaWRhcy5maW5kKGcgPT4gZy5pZCA9PT0gaHVudGVyU3RhdGUudGFyZ2V0R25pZGFJZCk7XG4gICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5zdGF0ZSAhPT0gJ1pOSVNaQ1pPTkEnKSB7XG4gICAgICAgIGNvbnN0IHR4UmFkID0gKHRhcmdldC5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgICBjb25zdCB0eERpc3QgPSByYWRpdXMgKiB0YXJnZXQuZGlzdGFuY2VSYXRpbztcbiAgICAgICAgY29uc3QgdHggPSBjZW50ZXJYICsgdHhEaXN0ICogTWF0aC5jb3ModHhSYWQpO1xuICAgICAgICBjb25zdCB0eSA9IGNlbnRlclkgKyB0eERpc3QgKiBNYXRoLnNpbih0eFJhZCk7XG5cbiAgICAgICAgLy8gUHVsc2luZyBMYXNlciBFeHRlcm1pbmF0aW9uIEJlYW1cbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubW92ZVRvKGh4LCBoeSk7XG4gICAgICAgIGN0eC5saW5lVG8odHgsIHR5KTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyMzAsIDAuODUpJztcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDIuNTtcbiAgICAgICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgICAgICBjdHguc2hhZG93Qmx1ciA9IDE1O1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGN0eC5zaGFkb3dCbHVyID0gMDtcblxuICAgICAgICAvLyBMYXNlciBJbXBhY3QgQnVyc3RcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKHR4LCB0eSwgOCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMjU1LCAyNTUsIDAuNiknO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdlbWluaSBIdW50ZXIgSW50ZXJjZXB0b3IgSmV0IEdseXBoIChUcmlhbmdsZSAmIFdpbmdzKVxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LnRyYW5zbGF0ZShoeCwgaHkpO1xuICAgIGN0eC5yb3RhdGUoaHVudGVyUmFkICsgTWF0aC5QSSAvIDIpO1xuXG4gICAgLy8gSmV0IEJvZHlcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbygwLCAtMTIpOyAvLyBub3NlXG4gICAgY3R4LmxpbmVUbyg5LCAxMCk7ICAvLyByaWdodCB3aW5nXG4gICAgY3R4LmxpbmVUbygwLCA2KTsgICAvLyBjZW50ZXIgdGFpbFxuICAgIGN0eC5saW5lVG8oLTksIDEwKTsgLy8gbGVmdCB3aW5nXG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwZmZmZic7XG4gICAgY3R4LnNoYWRvd0NvbG9yID0gJyMwMGZmZmYnO1xuICAgIGN0eC5zaGFkb3dCbHVyID0gMTQ7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgY3R4LmxpbmVXaWR0aCA9IDEuNTtcbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnNoYWRvd0JsdXIgPSAwO1xuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIC8vIEh1bnRlciBUYWdcbiAgICBjdHguZm9udCA9ICdib2xkIDlweCBcIkpldEJyYWlucyBNb25vXCIsIG1vbm9zcGFjZSc7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDBmZmZmJztcbiAgICBjdHguZmlsbFRleHQoYOKaoSAke2h1bnRlclN0YXRlLmNhbGxzaWdufWAsIGh4LCBoeSAtIDE2KTtcbiAgICBjdHguZm9udCA9ICc4cHggbW9ub3NwYWNlJztcbiAgICBjdHguZmlsbFN0eWxlID0gJyM4OGZmZmYnO1xuICAgIGN0eC5maWxsVGV4dChgU1RBTjogJHtodW50ZXJTdGF0ZS5zdGF0dXN9YCwgaHgsIGh5ICsgMTYpO1xuXG4gICAgLy8gOC4gQ1JUIFNjcmVlbiBTY2FubGluZSAmIFZpZ25ldHRlIEVmZmVjdFxuICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgwLCAwLCAwLCAwLjA1KSc7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkgKz0gNCkge1xuICAgICAgY3R4LmZpbGxSZWN0KDAsIHksIHdpZHRoLCAxLjUpO1xuICAgIH1cblxuICAgIC8vIE91dGVyIEJlemVsIFJpbmcgd2l0aCBCZWFyaW5nIEdyYXRpY3VsZXNcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCByYWRpdXMgKyAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMGZmODgnO1xuICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgIGN0eC5zdHJva2UoKTtcblxuICB9LCBbc3dlZXBBbmdsZSwgZ25pZGFzLCBpb05vZGVzLCBodW50ZXJTdGF0ZSwgc2VsZWN0ZWRUYXJnZXRJZCwgc2VjdXJlZExheWVycywgY2FzY2FkZVN0YXRlXSk7XG5cbiAgLy8gQ2xpY2sgb24gQ2FudmFzIHRvIFNlbGVjdCAvIFRhcmdldCBHbmlkYSBvciBOb2RlXG4gIGNvbnN0IGhhbmRsZUNhbnZhc0NsaWNrID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTENhbnZhc0VsZW1lbnQ+KSA9PiB7XG4gICAgY29uc3QgY2FudmFzID0gY2FudmFzUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjYW52YXMpIHJldHVybjtcbiAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGNvbnN0IGNsaWNrWCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdDtcbiAgICBjb25zdCBjbGlja1kgPSBlLmNsaWVudFkgLSByZWN0LnRvcDtcblxuICAgIGNvbnN0IHdpZHRoID0gY2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHQ7XG4gICAgY29uc3QgY2VudGVyWCA9IHdpZHRoIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gaGVpZ2h0IC8gMjtcbiAgICBjb25zdCByYWRpdXMgPSBNYXRoLm1pbihjZW50ZXJYLCBjZW50ZXJZKSAtIDIwO1xuXG4gICAgLy8gQ2hlY2sgY2xpY2sgcHJveGltaXR5IHRvIGFueSBHbmlkYVxuICAgIGZvciAoY29uc3QgZ25pZGEgb2YgZ25pZGFzKSB7XG4gICAgICBjb25zdCBnbmlkYVJhZCA9IChnbmlkYS5iZWFyaW5nRGVnIC0gOTApICogKE1hdGguUEkgLyAxODApO1xuICAgICAgY29uc3QgZ25pZGFEaXN0ID0gcmFkaXVzICogZ25pZGEuZGlzdGFuY2VSYXRpbztcbiAgICAgIGNvbnN0IGd4ID0gY2VudGVyWCArIGduaWRhRGlzdCAqIE1hdGguY29zKGduaWRhUmFkKTtcbiAgICAgIGNvbnN0IGd5ID0gY2VudGVyWSArIGduaWRhRGlzdCAqIE1hdGguc2luKGduaWRhUmFkKTtcblxuICAgICAgY29uc3QgZGlzdCA9IE1hdGguaHlwb3QoY2xpY2tYIC0gZ3gsIGNsaWNrWSAtIGd5KTtcbiAgICAgIGlmIChkaXN0IDwgMjIpIHtcbiAgICAgICAgc2V0U2VsZWN0ZWRUYXJnZXRJZChnbmlkYS5pZCk7XG4gICAgICAgIHBsYXlSYWRhclRvbmUoOTAwLCAxMDAsICdzaW5lJyk7XG4gICAgICAgIGFkZENvbWJhdExvZyhgW1JBREFSLU1BTlVBTF0gWmF6bmFjem9ubyBjZWw6ICR7Z25pZGEubmFtZX0gbmEgYXp5bXVjaWUgJHtnbmlkYS5iZWFyaW5nRGVnfcKwLmApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8vIFRyaWdnZXIgR2VtaW5pIEludGVyY2VwdCBvbiBTZWxlY3RlZCBHbmlkYVxuICBjb25zdCBoYW5kbGVPcmRlckh1bnRlclNsYXVnaHRlciA9IChnbmlkYTogUmFkYXJHbmlkYVRhcmdldCkgPT4ge1xuICAgIGlmIChnbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnKSByZXR1cm47XG4gICAgYWRkQ29tYmF0TG9nKGBbUk9aS0FaIEJPSk9XWV0gxYFvd2NhIEdlbWluaSB3eXPFgmFueSBkbyBuYXR5Y2htaWFzdG93ZWdvIHVib2p1IGNlbHU6ICR7Z25pZGEubmFtZX1gKTtcbiAgICBwbGF5UmFkYXJUb25lKDEwNTAsIDIwMCwgJ3RyaWFuZ2xlJyk7XG5cbiAgICBzZXRIdW50ZXJTdGF0ZShwcmV2ID0+ICh7XG4gICAgICAuLi5wcmV2LFxuICAgICAgdGFyZ2V0R25pZGFJZDogZ25pZGEuaWQsXG4gICAgICBzdGF0dXM6ICdJTlRFUkNFUFRJTkcnLFxuICAgICAgYmVhcmluZ0RlZzogZ25pZGEuYmVhcmluZ0RlZyxcbiAgICAgIGRpc3RhbmNlUmF0aW86IGduaWRhLmRpc3RhbmNlUmF0aW9cbiAgICB9KSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEh1bnRlclN0YXRlKHByZXYgPT4gKHsgLi4ucHJldiwgc3RhdHVzOiAnTE9DS19PTicgfSkpO1xuICAgICAgcGxheVJhZGFyVG9uZSg4MDAsIDIwMCwgJ3NxdWFyZScpO1xuICAgICAgXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gRGVzdHJveSB0YXJnZXRcbiAgICAgICAgc2V0R25pZGFzKHByZXYgPT4gcHJldi5tYXAoZyA9PiB7XG4gICAgICAgICAgaWYgKGcuaWQgPT09IGduaWRhLmlkKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5nLCBzdGF0ZTogJ1pOSVNaQ1pPTkEnLCBoZWFsdGhQZXJjZW50OiAwIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBnO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgLy8gSGVhbCBJL08gTm9kZVxuICAgICAgICBzZXRJb05vZGVzKHByZXYgPT4gcHJldi5tYXAobiA9PiB7XG4gICAgICAgICAgaWYgKG4uaWQgPT09IGduaWRhLmFzc29jaWF0ZWRJT05vZGVJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ubiwgc3RhdHVzOiAnUkVDT05TVFJVQ1RFRCcsIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICB9KSk7XG5cbiAgICAgICAgc2V0SHVudGVyU3RhdGUocHJldiA9PiAoe1xuICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgc3RhdHVzOiAnUEFUUk9MJyxcbiAgICAgICAgICBraWxsc0NvdW50OiBwcmV2LmtpbGxzQ291bnQgKyAxLFxuICAgICAgICAgIGZpeGVkTm9kZXNDb3VudDogcHJldi5maXhlZE5vZGVzQ291bnQgKyAxLFxuICAgICAgICAgIHJlcGFpclByb2dyZXNzOiBNYXRoLm1pbigxMDAsIHByZXYucmVwYWlyUHJvZ3Jlc3MgKyAyMClcbiAgICAgICAgfSkpO1xuXG4gICAgICAgIGFkZENvbWJhdExvZyhgW0VLU1RFUk1JTkFDSkFdIEduaWRhICR7Z25pZGEubmFtZX0gemxpa3dpZG93YW5hLiBXxJl6ZcWCIEkvTyB6cmVrb25zdHJ1b3dhbnkuYCk7XG4gICAgICAgIHBsYXlSYWRhclRvbmUoNDQwLCAzNTAsICdzYXd0b290aCcpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSwgODAwKTtcbiAgfTtcblxuICAvLyBTcGF3biBOZXcgR25pZGFcbiAgY29uc3QgaGFuZGxlU3Bhd25DdXN0b21HbmlkYSA9ICgpID0+IHtcbiAgICBjb25zdCB0eXBlczogR25pZGFUeXBlW10gPSBbJ0dOSURBX0VLUkFOT1dBJywgJ0dOSURBX1NaWUZSVUpBQ0EnLCAnR05JREFfU1pQSUVHT1dTS0EnLCAnR05JREFfUEFTT1pZVE5JQ1pBJ107XG4gICAgY29uc3QgcmFuZG9tVHlwZSA9IHR5cGVzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHR5cGVzLmxlbmd0aCldO1xuICAgIGNvbnN0IGlkID0gYGduaWRhLSR7RGF0ZS5ub3coKS50b1N0cmluZygpLnNsaWNlKC00KX1gO1xuICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYwKTtcbiAgICBjb25zdCBkaXN0ID0gMC40ICsgTWF0aC5yYW5kb20oKSAqIDAuNDU7XG5cbiAgICBjb25zdCBzY29yZSA9IE1hdGguZmxvb3IoNTggKyBNYXRoLnJhbmRvbSgpICogNDIpOyAvLyA1OCUgLSA5OSVcbiAgICBsZXQgdGhyZWF0TGV2ZWw6ICdFS1NUUkVNQUxOWScgfCAnS1JZVFlDWk5ZJyB8ICdXWVNPS0knIHwgJ1NSRUROSScgPSAnU1JFRE5JJztcbiAgICBpZiAoc2NvcmUgPj0gOTApIHRocmVhdExldmVsID0gJ0VLU1RSRU1BTE5ZJztcbiAgICBlbHNlIGlmIChzY29yZSA+PSA4MCkgdGhyZWF0TGV2ZWwgPSAnS1JZVFlDWk5ZJztcbiAgICBlbHNlIGlmIChzY29yZSA+PSA2OCkgdGhyZWF0TGV2ZWwgPSAnV1lTT0tJJztcblxuICAgIGNvbnN0IG5ld0duaWRhOiBSYWRhckduaWRhVGFyZ2V0ID0ge1xuICAgICAgaWQsXG4gICAgICBuYW1lOiBgR25pZGEtJHtpZC5zbGljZSgtMil9IFtQYXNvxbx5dCBTZWt0b3Jvd3ldYCxcbiAgICAgIGduaWRhVHlwZTogcmFuZG9tVHlwZSxcbiAgICAgIHR5cGVMYWJlbDogJ0duaWRhIElud2F6eWpuYSAoRHluYW1pYyBTcGF3biknLFxuICAgICAgYmVhcmluZ0RlZzogYW5nbGUsXG4gICAgICBkaXN0YW5jZVJhdGlvOiBkaXN0LFxuICAgICAgYWx0aXR1ZGVLbTogTWF0aC5yb3VuZCg1ICsgTWF0aC5yYW5kb20oKSAqIDIwKSxcbiAgICAgIHRocmVhdExldmVsLFxuICAgICAgdGhyZWF0U2NvcmU6IHNjb3JlLFxuICAgICAgc3RhdGU6ICdXWUtSWVRBJyxcbiAgICAgIGhlYWx0aFBlcmNlbnQ6IDEwMCxcbiAgICAgIGFzc29jaWF0ZWRJT05vZGVJZDogJ25vZGUtbW9uaXRvcicsXG4gICAgICBzaWduYXR1cmVTaGE6IEFycmF5LmZyb20oeyBsZW5ndGg6IDY0IH0sICgpID0+IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDE2KS50b1N0cmluZygxNikpLmpvaW4oJycpLFxuICAgICAgYWN0aXZlUHJvY2Vzc05hbWU6IGByb2d1ZV9nbmlkYV8ke2lkLnNsaWNlKC0yKX0uZXhlYCxcbiAgICAgIGFnZ3Jlc3Npb25EZXNjcmlwdGlvbjogJ1d5a3J5dG8gbm93xIUgYWdyZXN5d27EhSBwcsOzYsSZIHByemVqxJljaWEgc3RydW1pZW5pYSBkYW55Y2ggZWtyYW51IG1vbml0b3JhLicsXG4gICAgICBpbmZlY3Rpb25WZWN0b3I6ICdaZGFsbmUgd3N0cnp5a25pxJljaWUgcGFtacSZY2kgcGF5bG9hZHUnLFxuICAgICAgdmVsb2NpdHk6IDQ1MFxuICAgIH07XG5cbiAgICBzZXRHbmlkYXMocHJldiA9PiBbbmV3R25pZGEsIC4uLnByZXZdKTtcbiAgICBzZXRTZWxlY3RlZFRhcmdldElkKG5ld0duaWRhLmlkKTtcbiAgICBhZGRDb21iYXRMb2coYFtBTEFSTSBSQURBUk9XWV0gV3lrcnl0byBub3fEhSB3cm9nxIUgR25pZMSZIG5hIGF6eW11Y2llICR7YW5nbGV9wrAgKFphc2nEmWc6ICR7TWF0aC5yb3VuZChkaXN0ICogMTAwKX0ga20sIFRocmVhdCBTY29yZTogJHtzY29yZX0lKSFgKTtcbiAgICBwbGF5UmFkYXJUb25lKDk1MCwgMzAwLCAnc2F3dG9vdGgnKTtcbiAgfTtcblxuICAvLyBSZXNldC9SZWJvb3QgQWxsIE5vZGVzIGFuZCBUaHJlYXRzIChsb2FkcyB0ZXN0IHRocmVhdHMgaWYgdXNlciB3aXNoZXMgdG8gcmUtdGVzdClcbiAgY29uc3QgaGFuZGxlUmVib290UmFkYXJTdWJzeXN0ZW0gPSAoKSA9PiB7XG4gICAgY29uc3QgdGVzdFNxdWFkOiBSYWRhckduaWRhVGFyZ2V0W10gPSBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnZ25pZGEtdGVzdC0wMScsXG4gICAgICAgIG5hbWU6ICdHbmlkYSBUZXN0b3dhIFtMb2NrZXIgRWtyYW5vd3ldJyxcbiAgICAgICAgZ25pZGFUeXBlOiAnR05JREFfRUtSQU5PV0EnLFxuICAgICAgICB0eXBlTGFiZWw6ICdHbmlkYSBFa3Jhbm93YSAoU2NyZWVuIExvY2tlciknLFxuICAgICAgICBiZWFyaW5nRGVnOiAyNSxcbiAgICAgICAgZGlzdGFuY2VSYXRpbzogMC43MCxcbiAgICAgICAgYWx0aXR1ZGVLbTogMTIuMCxcbiAgICAgICAgdGhyZWF0TGV2ZWw6ICdFS1NUUkVNQUxOWScsXG4gICAgICAgIHRocmVhdFNjb3JlOiA5NSxcbiAgICAgICAgc3RhdGU6ICdXWUtSWVRBJyxcbiAgICAgICAgaGVhbHRoUGVyY2VudDogMTAwLFxuICAgICAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLW1vbml0b3InLFxuICAgICAgICBzaWduYXR1cmVTaGE6ICdlM2IwYzQ0Mjk4ZmMxYzE0OWFmYmY0Yzg5OTZmYjkyNDI3YWU0MWU0NjQ5YjkzNGNhNDk1OTkxYjc4NTJiODU1JyxcbiAgICAgICAgYWN0aXZlUHJvY2Vzc05hbWU6ICd0ZXN0X3NjcmVlbl9oaWphY2suZXhlJyxcbiAgICAgICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnUHLDs2JhIHByemVqxJljaWEgb2tuYSBIV05EX1RPUE1PU1QgbW9uaXRvcmEgdyBjZWxhY2ggdGVzdG93eWNoLicsXG4gICAgICAgIGluZmVjdGlvblZlY3RvcjogJ8Wacm9kb3dpc2tvIHRlc3Rvd2UnLFxuICAgICAgICB2ZWxvY2l0eTogNDEwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2duaWRhLXRlc3QtMDInLFxuICAgICAgICBuYW1lOiAnR25pZGEgVGVzdG93YSBbU3p5ZnJhdG9yIE5WTWVdJyxcbiAgICAgICAgZ25pZGFUeXBlOiAnR05JREFfU1pZRlJVSkFDQScsXG4gICAgICAgIHR5cGVMYWJlbDogJ0duaWRhIFN6eWZydWrEhWNhIChSYW5zb213YXJlKScsXG4gICAgICAgIGJlYXJpbmdEZWc6IDE0MCxcbiAgICAgICAgZGlzdGFuY2VSYXRpbzogMC43OCxcbiAgICAgICAgYWx0aXR1ZGVLbTogMTcuNSxcbiAgICAgICAgdGhyZWF0TGV2ZWw6ICdFS1NUUkVNQUxOWScsXG4gICAgICAgIHRocmVhdFNjb3JlOiA5OCxcbiAgICAgICAgc3RhdGU6ICdXWUtSWVRBJyxcbiAgICAgICAgaGVhbHRoUGVyY2VudDogMTAwLFxuICAgICAgICBhc3NvY2lhdGVkSU9Ob2RlSWQ6ICdub2RlLXN0b3JhZ2UnLFxuICAgICAgICBzaWduYXR1cmVTaGE6ICc3ZjgzYjE2NTdmZjFmYzUzYjkyZGMxODE0OGExZDY1ZGZjMmQ0YjFmYTNkNjc3Mjg0YWRkZDIwMDEyNmQ5MDY5JyxcbiAgICAgICAgYWN0aXZlUHJvY2Vzc05hbWU6ICd0ZXN0X3JhbnNvbXdhcmUuZXhlJyxcbiAgICAgICAgYWdncmVzc2lvbkRlc2NyaXB0aW9uOiAnWmFpbmljam93YW5vIHByw7NibmUgc3p5ZnJvd2FuaWUgSS9PIGR5c2tvd2Vnby4nLFxuICAgICAgICBpbmZlY3Rpb25WZWN0b3I6ICfFmnJvZG93aXNrbyB0ZXN0b3dlJyxcbiAgICAgICAgdmVsb2NpdHk6IDUyMFxuICAgICAgfVxuICAgIF07XG4gICAgc2V0R25pZGFzKHRlc3RTcXVhZCk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF9yYWRhcl9nbmlkYXMnLCB0ZXN0U3F1YWQpO1xuICAgIHNldElvTm9kZXMocHJldiA9PiBwcmV2Lm1hcChuID0+IG4uaWQgPT09ICdub2RlLW1vbml0b3InID8geyAuLi5uLCBzdGF0dXM6ICdDT01QUk9NSVNFRCcgYXMgY29uc3QsIGlzU2hpZWxkZWQ6IGZhbHNlIH0gOiBuKSk7XG4gICAgc2V0U2VsZWN0ZWRUYXJnZXRJZCgnZ25pZGEtdGVzdC0wMScpO1xuICAgIHNldEF1dG9QdXJnZUFjdGl2ZShmYWxzZSk7XG4gICAgYWRkQ29tYmF0TG9nKGBbVEVTVC1SRUxPQURdIFphxYJhZG93YW5vIHByw7NibsSFIGVza2FkcsSZIEduaWQgZG8gd2VyeWZpa2FjamkgcHJvY2VkdXJ5IHVib2p1IGkgYmFyaWVyeS5gKTtcbiAgfTtcblxuICAvLyBDYWxjdWxhdGUgU3lzdGVtIEhlYWx0aCBmcm9tIE5vZGVzICYgR25pZGFzXG4gIGNvbnN0IGFjdGl2ZUduaWRhc0NvdW50ID0gZ25pZGFzLmZpbHRlcihnID0+IGcuc3RhdGUgIT09ICdaTklTWkNaT05BJykubGVuZ3RoO1xuICBjb25zdCBkZXN0cm95ZWRHbmlkYXNDb3VudCA9IGduaWRhcy5maWx0ZXIoZyA9PiBnLnN0YXRlID09PSAnWk5JU1pDWk9OQScpLmxlbmd0aDtcbiAgY29uc3QgY29tcHJvbWlzZWROb2Rlc0NvdW50ID0gaW9Ob2Rlcy5maWx0ZXIobiA9PiBuLnN0YXR1cyA9PT0gJ0NPTVBST01JU0VEJykubGVuZ3RoO1xuICBjb25zdCBzeXN0ZW1JbnRlZ3JpdHlQZXJjZW50ID0gTWF0aC5yb3VuZChcbiAgICAoKGlvTm9kZXMubGVuZ3RoIC0gY29tcHJvbWlzZWROb2Rlc0NvdW50KSAvIGlvTm9kZXMubGVuZ3RoKSAqIDEwMFxuICApO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgZm9udC1zYW5zXCI+XG4gICAgICB7LyogVG9wIEhlYWRlciBUYWN0aWNhbCBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2xhdGUtOTUwIHZpYS1lbWVyYWxkLTk1MC84MCB0by1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC81MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctZW1lcmFsZC02MDAvMjAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC81MCB0ZXh0LWVtZXJhbGQtMzAwIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTBcIj5cbiAgICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy02IGgtNiBhbmltYXRlLXB1bHNlIHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5SYWRhciBXb2pza293eSAmIFNrYW5lciBNb25vbGl0eWN6bmVqIFBvd2llcnpjaG5pIFN5c3RlbXU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXBpbmdcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5NT05PTElUIEkvTzogTU9OSVRPUiArIFJBTSArIERZU0sgKyBTSUVDSSDigKIgVEVSTUlOT0xPR0lBOiBHTklEWSAoTUFMV0FSRSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMiBtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgS2xhc3ljem55IHJhZGFyIHdvanNrb3d5IGRvIMWbbGVkemVuaWEgemFncm/FvGXFhCAoR25pZCkuIE1vbml0b3Igc3Rhbm93aSBpbnRlZ3JhbG7EhSBjesSZxZvEhyBwb3dpZXJ6Y2huaSB3ZWrFm2NpYS93eWrFm2NpYSAoSS9PKS4gxZpsZWTFuiBuYSDFvHl3byBwb3N0xJlwIHByYWMgPHN0cm9uZz7FgW93Y3kgR2VtaW5pIEFJPC9zdHJvbmc+LCBrdMOzcnkgcG9sdWplIG5hIGFrdHl3bmUgR25pZHksIGRla2FwaXR1amUgaWNoIHfEhXRraSBpIGRva29udWplIHJla29uc3RydWtjamkgemFhdGFrb3dhbnljaCB3xJl6xYLDs3cuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQWN0aW9uIFRvb2xiYXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNBdWRpb0VuYWJsZWQoIWlzQXVkaW9FbmFibGVkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBpc0F1ZGlvRW5hYmxlZCBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNzAwJyBcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgdGl0bGU9XCJQcnplxYLEhWN6bmlrIGTFundpxJlrdSBzb25hcnUgaSBsYXNlcmEgdWJvanVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNBdWRpb0VuYWJsZWQgPyA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxWb2x1bWVYIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e2lzQXVkaW9FbmFibGVkID8gJ0TFundpxJlrIFfFgS4nIDogJ1d5Y2lzem9ueSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17ZXhlY3V0ZUtpbGxBbGxHbmlkYXNOb3d9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB2aWEtcm9zZS02MDAgdG8tcGluay02MDAgaG92ZXI6ZnJvbS1yZWQtNTAwIGhvdmVyOnRvLXBpbmstNTAwIHRleHQtd2hpdGUgc2hhZG93LXJlZC05NTAvNzAgYm9yZGVyLTIgYm9yZGVyLXJlZC00MDAvNjAgYWN0aXZlOnNjYWxlLTk1IGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICB0aXRsZT1cIld5a29uYWogbmF0eWNobWlhc3Rvd3kgdWLDs2ogd3N6eXN0a2ljaCBnbmlkIChGaXJzdCBLaWxsIEduaWRhcykgaSB3em1vY25paiBrb3Jkb24gcGFuY2VybnlcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5VQsOTSiBXU1pZU1RLSUNIIEdOSUQgKEZJUlNUIEtJTEwgR05JREFTKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RyaWdnZXJGdWxsRXh0ZXJtaW5hdGlvbkNhc2NhZGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTYwMCB2aWEtdGVhbC02MDAgdG8tY3lhbi02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by1jeWFuLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1lbWVyYWxkLTk1MC82MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzQwXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJBdXRvbWF0eWN6bmEgbGlrd2lkYWNqYSBwYXNvxbx5dMOzdyBpIHNla3dlbmNqYSBiYXJpZXI6IDAgbXMgLT4gTGFzZXIgLT4gU8SFc2llZG5pZSBXYXJzdHd5IC0+IFRyd2HFgmUgWmFiZXpwaWVjemVuaWVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtMjAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+S2Fza2FkYSBCYXJpZXIgJiBVYsOzaiAoMG1zIOKelCBMYXNlciDinpQgV2Fyc3R3eSk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBdXRvUHVyZ2VBY3RpdmUoIWF1dG9QdXJnZUFjdGl2ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMi41IHJvdW5kZWQteGwgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgYXV0b1B1cmdlQWN0aXZlXG4gICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB2aWEtcGluay02MDAgdG8tcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItcmVkLTQwMC80MCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS03MDAgdG8taW5kaWdvLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8taW5kaWdvLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1wdXJwbGUtOTUwLzYwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC8zMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2F1dG9QdXJnZUFjdGl2ZSA/ICdBdXRvbm9taWN6bnkgVWLDs2ogdyBUb2t1Li4uJyA6ICdQxJl0bGEgVWJvanUgxYFvd2N5IEdlbWluaSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU3Bhd25DdXN0b21HbmlkYX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwIHRleHQtcHVycGxlLTMwMCB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPld5cHXFm8SHIEduaWTEmTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJlYm9vdFJhZGFyU3Vic3lzdGVtfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUmVzZXQgcmFkYXJ1XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFJlZnJlc2hDdyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmVhbC10aW1lIFN0YXR1cyBNZXRyaWMgQmFkZ2VzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTUgZ3JpZCBncmlkLWNvbHMtMiBzbTpncmlkLWNvbHMtNCBsZzpncmlkLWNvbHMtNyBnYXAtMyBwdC00IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC85MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XSB1cHBlcmNhc2UgYmxvY2tcIj5JbnRlZ3JhbG5vxZvEhyBNb25vbGl0dTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDBcIj57c3lzdGVtSW50ZWdyaXR5UGVyY2VudH0lPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+QWt0eXduZSBHbmlkeTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtcmVkLTQwMFwiPnthY3RpdmVHbmlkYXNDb3VudH0gd3JvZ2llPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+VWJpdGUgR25pZHk8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ibGFjayB0ZXh0LXB1cnBsZS00MDBcIj57ZGVzdHJveWVkR25pZGFzQ291bnR9IHpsaWt3aWRvd2FueWNoPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1iciBmcm9tLWVtZXJhbGQtOTUwLzcwIHRvLXNsYXRlLTk1MCBwLTIuNSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgY29sLXNwYW4tMiBzbTpjb2wtc3Bhbi0xXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgQ3p1am5payBHbmlkIChBdXRvLUZyZWUpXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbXQtMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+MCBtcyBOdFN1c3BlbmQ8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1lbWVyYWxkLTkwMC84MCB0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtMjAwIGJvcmRlciBib3JkZXItZW1lcmFsZC02MDBcIj5cbiAgICAgICAgICAgICAgICB7c2Vuc29yU3RhdHVzLnRvdGFsQXV0b0Zyb3plbn0gemFtcm/FvG9ueWNoXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPlRhcmN6YSA0IFdhcnN0dzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5vdmVyYWxsRm9ydHJlc3NTaGllbGRQZXJjZW50fSUgVHdpZXJkemFcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwLzkwIHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzEwcHhdIHVwcGVyY2FzZSBibG9ja1wiPlN0YW4gxYFvd2N5IEdlbWluaTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgICB7aHVudGVyU3RhdGUuc3RhdHVzfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF0gdXBwZXJjYXNlIGJsb2NrXCI+UHLEmWRrb8WbxIcgU2thbmVyYTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtYW1iZXItNDAwXCI+e3N3ZWVwU3BlZWRScG19IFJQTSAoUGFzbW8gWCk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBEeW5hbWljIEFudGl2aXJ1cyBCYXJyaWVyIENhc2NhZGUgU2VxdWVuY2UgVHJhY2tlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC85MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwLzYwIHNoYWRvdy1sZyBmb250LW1vbm8gdGV4dC14cyBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLWVtZXJhbGQtNTAwLzIwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRleHQteHMgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICAgIFBST1RPS8OTxYEgQkFSSUVSWSBBTlRZV0lSVVNPV0VKIChLQVNLQURBIE9CUk9OTkEgTU9OT0xJVFUpOlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWVtZXJhbGQtMzAwXCI+XG4gICAgICAgICAgICAgICAgICB7Y2FzY2FkZVN0YXRlLnN0YXR1c01lc3NhZ2V9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgY2FzY2FkZVN0YXRlLnRvdGFsTWFsd2FyZUV4dGVybWluYXRlZFxuICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC01MDAgc2hhZG93LVswXzBfMTJweF8jMTBiOTgxXSdcbiAgICAgICAgICAgICAgICAgIDogY2FzY2FkZVN0YXRlLnN0YWdlICE9PSAnSURMRSdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyLWN5YW4tNTAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgIHtjYXNjYWRlU3RhdGUudG90YWxNYWx3YXJlRXh0ZXJtaW5hdGVkXG4gICAgICAgICAgICAgICAgICA/ICfwn5GRIDEwMCUgRUtTVEVSTUlOQUNKQSBNQUxXQVJFIC0gTU9OT0xJVCBaQUJFWlBJRUNaT05ZJ1xuICAgICAgICAgICAgICAgICAgOiBgRVRBUCBCQVJJRVJZOiAke2Nhc2NhZGVTdGF0ZS5zdGFnZX1gfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiA0LVN0ZXAgU2VxdWVuY2UgVmlzdWFsIEZsb3cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgey8qIFN0ZXAgMSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC1sZyBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnSU1NRURJQVRFX0xPQ0snXG4gICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvODAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1bMF8wXzEycHhfIzEwYjk4MV0nXG4gICAgICAgICAgICAgICAgOiBjYXNjYWRlU3RhdGUuc3RhZ2UgIT09ICdJRExFJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTkwMC85MCBib3JkZXItZW1lcmFsZC04MDAvODAgdGV4dC1lbWVyYWxkLTQwMCdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1bMTFweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8zMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAgdGV4dC1bOXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJsYWNrXCI+MTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIEJhcmllcmEgMCBtcyAoTmF0eWNobWlhc3QpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHtjYXNjYWRlU3RhdGUuc3RhZ2UgIT09ICdJRExFJyAmJiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgICAgICBLb3Jkb24gc2FuaXRhcm55IHcgcHVua2NpZSB1Ym9qdSwgb2RjacSZY2llIG1hZ2lzdHJhbGkgSS9PIGkgb2Nocm9uYSBSQU0uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU3RlcCAyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInXG4gICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvODAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1bMF8wXzEycHhfIzA2YjZkNF0nXG4gICAgICAgICAgICAgICAgOiAoY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERScgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnRk9SVElGSUVEJylcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLWN5YW4tODAwLzgwIHRleHQtY3lhbi00MDAnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTUwLzYwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAnXG4gICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtWzExcHhdIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy00IGgtNCByb3VuZGVkLWZ1bGwgYmctY3lhbi01MDAvMzAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMjAwIHRleHQtWzlweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1ibGFja1wiPjI8L3NwYW4+XG4gICAgICAgICAgICAgICAgICBMYXNlciBTZWt0b3JhIChXeXBhbGFuaWUpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIHsoY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERScgfHwgY2FzY2FkZVN0YXRlLnN0YWdlID09PSAnRk9SVElGSUVEJykgJiYgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgWm9nbmlza293YW5hIHdpxIV6a2EgbGFzZXJvd2EgeiBiaWXFvMSFY2VnbyBhenltdXR1IG5pc3pjenkgcG96b3N0YcWCb8WbY2kga29kdSBQRS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ05FSUdIQk9SX0NBU0NBREUnXG4gICAgICAgICAgICAgICAgPyAnYmctdGVhbC05NTAvODAgYm9yZGVyLXRlYWwtNDAwIHNoYWRvdy1bMF8wXzEycHhfIzE0YjhhNl0nXG4gICAgICAgICAgICAgICAgOiBjYXNjYWRlU3RhdGUuc3RhZ2UgPT09ICdGT1JUSUZJRUQnXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci10ZWFsLTgwMC84MCB0ZXh0LXRlYWwtNDAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwJ1xuICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LVsxMXB4XSB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctNCBoLTQgcm91bmRlZC1mdWxsIGJnLXRlYWwtNTAwLzMwIGJvcmRlciBib3JkZXItdGVhbC00MDAgdGV4dC10ZWFsLTIwMCB0ZXh0LVs5cHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYmxhY2tcIj4zPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgS2Fza2FkYSBTxIVzaWVkbmljaCBXYXJzdHdcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCcgJiYgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXRlYWwtNDAwXCIgLz59XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICAgICAgUHJvcGFnYWNqYSB0YXJjenkgbmEgd2Fyc3R3eSBwcnp5bGVnxYJlLCBzeW5jaHJvbml6YWNqYSB3xJl6xYLDs3cgaSBtb3N0a8Ozdy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTdGVwIDQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGNhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCdcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC85MCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LVswXzBfMTRweF8jMTBiOTgxXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1bMTFweF0gdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8zMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0yMDAgdGV4dC1bOXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBmb250LWJsYWNrXCI+NDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIFRyd2HFgmUgWmFiZXpwaWVjemVuaWVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAge2Nhc2NhZGVTdGF0ZS5zdGFnZSA9PT0gJ0ZPUlRJRklFRCcgJiYgPExvY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+fVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPlxuICAgICAgICAgICAgICAgIE9ic3phcnkgemFibG9rb3dhbmUgaSBjaHJvbmlvbmUgZG8gY2HFgmtvd2l0ZWogZWtzdGVybWluYWNqaSB3c3p5c3RraWNoIHdpcnVzw7N3LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZpZXcgU3dpdGNoZXIgVGFicyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlld01vZGUoJ1JBREFSX1BQSScpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgYWN0aXZlVmlld01vZGUgPT09ICdSQURBUl9QUEknXG4gICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPHNwYW4+UmFkYXIgV29qc2tvd3kgUFBJIChFa3JhbiBDUlQpPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlld01vZGUoJ01PTk9MSVRIX1NVUkZBQ0UnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVZpZXdNb2RlID09PSAnTU9OT0xJVEhfU1VSRkFDRSdcbiAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwJ1xuICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxMYXllcnMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPHNwYW4+TW9ub2xpdHljem5hIFBvd2llcnpjaG5pYSBTeXN0ZW11ICYgUHVua3R5IFdlL1d5IChJL08pPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVmlld01vZGUoJ0NPTUJBVF9MT0dTJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICBhY3RpdmVWaWV3TW9kZSA9PT0gJ0NPTUJBVF9MT0dTJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPkR6aWVubmlrIEJvam93eSDFgW93Y3kgR2VtaW5pICh7Y29tYmF0TG9ncy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZJRVcgMTogUkFEQVIgV09KU0tPV1kgQ1JUIERJU1BMQVkgKyBUQVJHRVQgSU5TUEVDVE9SICovfVxuICAgICAge2FjdGl2ZVZpZXdNb2RlID09PSAnUkFEQVJfUFBJJyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgICB7LyogTGVmdCAvIENlbnRlcjogTWlsaXRhcnkgUmFkYXIgUFBJIFNjcmVlbiAoNyBjb2xzKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLWVtZXJhbGQtOTAwLzYwIHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgIHsvKiBSYWRhciBDUlQgQ2FudmFzICsgRnJhbWVyLU1vdGlvbiBQdWxzaW5nIFRhY3RpY2FsIE92ZXJsYXkgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LVs1MjBweF0gYXNwZWN0LXNxdWFyZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIDxjYW52YXNcbiAgICAgICAgICAgICAgICAgIHJlZj17Y2FudmFzUmVmfVxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezUyMH1cbiAgICAgICAgICAgICAgICAgIGhlaWdodD17NTIwfVxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ2FudmFzQ2xpY2t9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkLWZ1bGwgY3Vyc29yLWNyb3NzaGFpciBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzQwIHNoYWRvdy1bMF8wXzUwcHhfcmdiYSgwLDI1NSwxMDAsMC4xNSldIHctZnVsbCBoLWZ1bGxcIlxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICB7LyogRnJhbWVyLU1vdGlvbiBEeW5hbWljIENlbnRlciBTb25hciBQdWxzZSBSaXBwbGVzICovfVxuICAgICAgICAgICAgICAgIHtpc1NjYW5uaW5nICYmIChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAvNTAgcG9pbnRlci1ldmVudHMtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogJzUwJScsIHRvcDogJzUwJScgfX1cbiAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogWycwJScsICc5MiUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogWycwJScsICc5MiUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6ICctNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6ICctNTAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IFswLjc1LCAwXVxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDMuMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiAnZWFzZU91dCdcbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLmRpdlxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtMzAwLzM1IHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICc1MCUnLCB0b3A6ICc1MCUnIH19XG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFsnMCUnLCAnOTIlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFsnMCUnLCAnOTIlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiAnLTUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiAnLTUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBbMC42NSwgMF1cbiAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogMS42LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwZWF0OiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0J1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIEZyYW1lci1Nb3Rpb24gRHluYW1pYyBQdWxzaW5nIEduaWRhIFRhcmdldCBNYXJrZXJzIE92ZXJsYXkgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgb3ZlcmZsb3ctaGlkZGVuIHJvdW5kZWQtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAge2duaWRhcy5tYXAoZ25pZGEgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJykgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjb3JlID0gZ2V0R25pZGFUaHJlYXRTY29yZShnbmlkYSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yQ2ZnID0gZ2V0VGhyZWF0Q29sb3Ioc2NvcmUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gZ25pZGEuaWQgPT09IHNlbGVjdGVkVGFyZ2V0SWQ7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzTG9ja2VkQnlIdW50ZXIgPSBodW50ZXJTdGF0ZS50YXJnZXRHbmlkYUlkID09PSBnbmlkYS5pZDtcblxuICAgICAgICAgICAgICAgICAgICAvLyBQb3NpdGlvbiBjYWxjdWxhdGlvbiBpbiBwZXJjZW50YWdlOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCByYWQgPSAoZ25pZGEuYmVhcmluZ0RlZyAtIDkwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdFBjdCA9IGduaWRhLmRpc3RhbmNlUmF0aW8gKiA0Mi41OyAvLyBkaXN0YW5jZSBmcm9tIGNlbnRlciBpbiAlXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxlZnRQY3QgPSA1MCArIGRpc3RQY3QgKiBNYXRoLmNvcyhyYWQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3BQY3QgPSA1MCArIGRpc3RQY3QgKiBNYXRoLnNpbihyYWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtnbmlkYS5pZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBwb2ludGVyLWV2ZW50cy1hdXRvIGN1cnNvci1wb2ludGVyIGdyb3VwIHotMjBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgbGVmdDogYCR7bGVmdFBjdH0lYCwgdG9wOiBgJHt0b3BQY3R9JWAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFyZ2V0SWQoZ25pZGEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UmFkYXJUb25lKDkwMCwgMTAwLCAnc2luZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRDb21iYXRMb2coYFtSQURBUi1NQU5VQUxdIFd5YnJhbm8gY2VsOiAke2duaWRhLm5hbWV9IChUaHJlYXQgU2NvcmU6ICR7c2NvcmV9JSAtICR7Y29sb3JDZmcubGFiZWx9KWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogUHVsc2luZyBPdXRlciBUaHJlYXQgV2F2ZSBSaW5nIChGcmFtZXIgTW90aW9uKSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIHJvdW5kZWQtZnVsbCBib3JkZXIgcG9pbnRlci1ldmVudHMtbm9uZSAtdHJhbnNsYXRlLXgtMS8yIC10cmFuc2xhdGUteS0xLzJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBjb2xvckNmZy5oZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwIDE2cHggJHtjb2xvckNmZy5nbG93SGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFsxOCwgNDgsIDE4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFsxOCwgNDgsIDE4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBbMC44NSwgMC4xLCAwLjg1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTogWzEsIDEuNCwgMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBjb2xvckNmZy5wdWxzZUR1cmF0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWFzZTogJ2Vhc2VJbk91dCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBTZWNvbmRhcnkgUmFwaWQgUHVsc2UgUmluZyBmb3IgSGlnaCBUaHJlYXRzICg4MCUrKSAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIHtzY29yZSA+PSA4MCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItZGFzaGVkIHBvaW50ZXItZXZlbnRzLW5vbmUgLXRyYW5zbGF0ZS14LTEvMiAtdHJhbnNsYXRlLXktMS8yXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yQ2ZnLmhleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiAnNTAlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IFsxMiwgMzQsIDEyXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogWzEyLCAzNCwgMTJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogWzAuOTUsIDAuMiwgMC45NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGU6IFswLCAxODAsIDM2MF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBjb2xvckNmZy5wdWxzZUR1cmF0aW9uICogMC43NSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcGVhdDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlYXNlOiAnbGluZWFyJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogQ29yZSBUYXJnZXQgR2x5cGggd2l0aCBEeW5hbWljIENvbG9yIFNjYWxlICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5kaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLW1kIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZyByZWxhdGl2ZSB6LTEwIHRyYW5zaXRpb24tdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZCA/ICdzY2FsZS0xMjUgcmluZy0yIHJpbmctd2hpdGUnIDogJ2dyb3VwLWhvdmVyOnNjYWxlLTExNSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvckNmZy5oZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwIDEycHggJHtjb2xvckNmZy5nbG93SGV4fWBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlOiBpc1NlbGVjdGVkID8gWzEuMiwgMS4zNSwgMS4yXSA6IFswLjk1LCAxLjEsIDAuOTVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogY29sb3JDZmcucHVsc2VEdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6ICdlYXNlSW5PdXQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtYmxhY2sgZm9udC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsvKiBEeW5hbWljIFRocmVhdCBTY29yZSBMYWJlbCBQaWxsICovfVxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtZnVsbCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIG10LTEgcHgtMS41IHB5LTAuNSByb3VuZGVkIHRleHQtWzhweF0gZm9udC1tb25vIGZvbnQtYmxhY2sgd2hpdGVzcGFjZS1ub3dyYXAgc2hhZG93LW1kIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlID49IDkwID8gJ2JnLXJlZC05NTAvOTAgdGV4dC1yZWQtMzAwIGJvcmRlci1yZWQtNTAwJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmUgPj0gODAgPyAnYmctcm9zZS05NTAvOTAgdGV4dC1yb3NlLTMwMCBib3JkZXItcm9zZS01MDAnIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY29yZSA+PSA2OCA/ICdiZy1vcmFuZ2UtOTUwLzkwIHRleHQtb3JhbmdlLTMwMCBib3JkZXItb3JhbmdlLTUwMCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiZy15ZWxsb3ctOTUwLzkwIHRleHQteWVsbG93LTMwMCBib3JkZXIteWVsbG93LTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBgMCAwIDhweCAke2NvbG9yQ2ZnLmdsb3dIZXh9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2NvcmV9JSBUSFJFQVRcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgICB7LyogU2VsZWN0aW9uIFJldGljbGUgd2l0aCBSb3RhdGluZyBCcmFja2V0cyAqL31cbiAgICAgICAgICAgICAgICAgICAgICAgIHsoaXNTZWxlY3RlZCB8fCBpc0xvY2tlZEJ5SHVudGVyKSAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWluc2V0LTMgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci1kYXNoZWQgcG9pbnRlci1ldmVudHMtbm9uZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiBpc0xvY2tlZEJ5SHVudGVyID8gJyMwMGZmZmYnIDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm94U2hhZG93OiBpc0xvY2tlZEJ5SHVudGVyID8gJzAgMCAxNHB4ICMwMGZmZmYnIDogJzAgMCAxMHB4ICNmZmZmZmYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHJvdGF0ZTogMzYwIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogNCwgcmVwZWF0OiBJbmZpbml0eSwgZWFzZTogJ2xpbmVhcicgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBSYWRhciBPdmVybGF5IEdyaWQgTGFiZWxzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTMgbGVmdC0zIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwLzkwIGJnLWJsYWNrLzgwIHB4LTIuNSBweS0xIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMCBzaGFkb3ctbWQgYmFja2Ryb3AtYmx1ci14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC00MDAgYW5pbWF0ZS1waW5nXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkFaWU1VVDoge01hdGgucm91bmQoc3dlZXBBbmdsZSl9wrAgfCB7c3dlZXBTcGVlZFJwbX0gUlBNPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMyByaWdodC0zIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwLzkwIGJnLWJsYWNrLzgwIHB4LTIuNSBweS0xIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMCBzaGFkb3ctbWQgYmFja2Ryb3AtYmx1ci14c1wiPlxuICAgICAgICAgICAgICAgICAgWkFTScSYRzoge3JhZGFyUmFuZ2VLbX0gS01cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTMgbGVmdC0zIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwIGJnLWJsYWNrLzgwIHB4LTIuNSBweS0xIHJvdW5kZWQtbWQgYm9yZGVyIGJvcmRlci1jeWFuLTgwMCBzaGFkb3ctbWQgYmFja2Ryb3AtYmx1ci14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtY3lhbi0zMDAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPsWBT1dDQSBHRU1JTkk6IHtodW50ZXJTdGF0ZS5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogRHluYW1pYyBUaHJlYXQgU2NvcmUgQ29sb3IgU3BlY3RydW0gTGVnZW5kIChGcmFtZXItTW90aW9uKSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHctZnVsbCBwLTMuNSBiZy1zbGF0ZS05MDAvOTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTIuNSBmbGV4LXdyYXAgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgICAgICBTS0FMQSBCQVJXIFpBR1JPxbtFTklBIEdOSUQgKFRIUkVBVCBTQ09SRSBTUEVDVFJVTSk6XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICBQdWxzb3dhbmllIEZyYW1lci1Nb3Rpb24gQWt0eXduZVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICB7LyogWWVsbG93IExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy15ZWxsb3ctOTUwLzQwIGJvcmRlciBib3JkZXIteWVsbG93LTUwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy15ZWxsb3ctNDAwIHNoYWRvdy1bMF8wXzhweF8jZmFjYzE1XVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNDUsIDFdLCBvcGFjaXR5OiBbMC44LCAxLCAwLjhdIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS45LCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwIGZvbnQtYm9sZCBibG9jayB0ZXh0LVsxMXB4XVwiPjUwIC0gNjclIFRocmVhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQteWVsbG93LTQwMC84MFwiPk9zdHJ6ZWdhd2N6eSAoxbvDs8WCdHkpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogT3JhbmdlIExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1vcmFuZ2UtOTUwLzQwIGJvcmRlciBib3JkZXItb3JhbmdlLTUwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTMgaC0zIHJvdW5kZWQtZnVsbCBiZy1vcmFuZ2UtNTAwIHNoYWRvdy1bMF8wXzhweF8jZjk3MzE2XVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNDUsIDFdLCBvcGFjaXR5OiBbMC44LCAxLCAwLjhdIH19XG4gICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogMS40NSwgcmVwZWF0OiBJbmZpbml0eSB9fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb3JhbmdlLTMwMCBmb250LWJvbGQgYmxvY2sgdGV4dC1bMTFweF1cIj42OCAtIDc5JSBUaHJlYXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LW9yYW5nZS00MDAvODBcIj5Qb2R3ecW8c3pvbnkgKFBvbWFyYcWEY3opPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogQ3JpbXNvbiBSZWQgTGV2ZWwgKi99XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXJvc2UtOTUwLzQwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPG1vdGlvbi5zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0zIGgtMyByb3VuZGVkLWZ1bGwgYmctcm9zZS01MDAgc2hhZG93LVswXzBfOHB4XyNmNDNmNWVdXCJcbiAgICAgICAgICAgICAgICAgICAgICBhbmltYXRlPXt7IHNjYWxlOiBbMSwgMS41LCAxXSwgb3BhY2l0eTogWzAuOCwgMSwgMC44XSB9fVxuICAgICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb249e3sgZHVyYXRpb246IDEuMDUsIHJlcGVhdDogSW5maW5pdHkgfX1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtMzAwIGZvbnQtYm9sZCBibG9jayB0ZXh0LVsxMXB4XVwiPjgwIC0gODklIFRocmVhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtcm9zZS00MDAvODBcIj5Lcnl0eWN6bnkgKEN6ZXJ3b255KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgey8qIE5lb24gVml2aWQgUmVkIExldmVsICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1yZWQtOTUwLzYwIGJvcmRlciBib3JkZXItcmVkLTUwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctWzBfMF8xMnB4X3JnYmEoMjU1LDAsNjAsMC4yNSldXCI+XG4gICAgICAgICAgICAgICAgICAgIDxtb3Rpb24uc3BhblxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMyBoLTMgcm91bmRlZC1mdWxsIGJnLXJlZC01MDAgc2hhZG93LVswXzBfMTJweF8jZmYwMDNjXVwiXG4gICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuNiwgMV0sIG9wYWNpdHk6IFswLjgsIDEsIDAuOF0gfX1cbiAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uPXt7IGR1cmF0aW9uOiAwLjc1LCByZXBlYXQ6IEluZmluaXR5IH19XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwIGZvbnQtYmxhY2sgYmxvY2sgdGV4dC1bMTFweF1cIj45MCAtIDEwMCUgVGhyZWF0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPkphc2tyYXdhIEN6ZXJ3aWXFhCAoRWtzdHJlbXVtKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFJhZGFyIFNwZWVkIENvbnRyb2xzICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgdy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCB0ZXh0LXhzIGZvbnQtbW9ubyBweC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UHLEmWRrb8WbxIcgU2thbmVyYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cInJhbmdlXCJcbiAgICAgICAgICAgICAgICAgICAgbWluPVwiMTBcIlxuICAgICAgICAgICAgICAgICAgICBtYXg9XCI2MFwiXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzd2VlcFNwZWVkUnBtfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTd2VlcFNwZWVkUnBtKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LTI4IGFjY2VudC1lbWVyYWxkLTUwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj57c3dlZXBTcGVlZFJwbX0gUlBNPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNTY2FubmluZyghaXNTY2FubmluZyl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc1NjYW5uaW5nID8gPFBhdXNlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gOiA8UGxheSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNTY2FubmluZyA/ICdQYXV6YSBSYWRhcnUnIDogJ1d6bsOzdyBTa2FuJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBSaWdodCBDb2x1bW46IEFjdGl2ZSBSYWRhciBQcm9jZXNzIFJvc3RlciAmIFRhcmdldCBGb3JlbnNpYyBEb3NzaWVyICg1IGNvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIHsvKiBUb3AgVmlldyBUb2dnbGUgU3dpdGNoZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHAtMSBiZy1zbGF0ZS05NTAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzYwIHRleHQteHMgZm9udC1tb25vIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UmFkYXJMaXN0VGFiKCdQUk9DRVNTX0xJU1QnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4LTEgcHktMS41IHB4LTMgcm91bmRlZC1sZyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgcmFkYXJMaXN0VGFiID09PSAnUFJPQ0VTU19MSVNUJ1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdG8tdGVhbC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LWVtZXJhbGQtOTUwLzgwJ1xuICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LWVtZXJhbGQtMzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+QWt0eXdueSBSYWRhcjogUHJvY2VzeSAoe2FjdGl2ZUduaWRhc0NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0UmFkYXJMaXN0VGFiKCdUQVJHRVRfRE9TU0lFUicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXgtMSBweS0xLjUgcHgtMyByb3VuZGVkLWxnIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICByYWRhckxpc3RUYWIgPT09ICdUQVJHRVRfRE9TU0lFUidcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8tcmVkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MC84MCdcbiAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1wdXJwbGUtMzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPFRhcmdldCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS0zMDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkRvc3NpZXIgQ2VsdSB7c2VsZWN0ZWRHbmlkYSA/IGBbJHtzZWxlY3RlZEduaWRhLm5hbWUuc3BsaXQoJyAnKVswXX1dYCA6ICcnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFRBQiAxOiBEWU5BTUlDIEFLVFlXTlkgUkFEQVIgUFJPQ0VTUyBST1NURVIgV0lUSCBDU1MgQU5JTUFUSU9OUyAqL31cbiAgICAgICAgICAgIHtyYWRhckxpc3RUYWIgPT09ICdQUk9DRVNTX0xJU1QnID8gKFxuICAgICAgICAgICAgICA8QWN0aXZlUmFkYXJQcm9jZXNzUm9zdGVyXG4gICAgICAgICAgICAgICAgZ25pZGFzPXtnbmlkYXN9XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRUYXJnZXRJZD17c2VsZWN0ZWRUYXJnZXRJZH1cbiAgICAgICAgICAgICAgICBzd2VlcEFuZ2xlPXtzd2VlcEFuZ2xlfVxuICAgICAgICAgICAgICAgIHN3ZWVwU3BlZWRScG09e3N3ZWVwU3BlZWRScG19XG4gICAgICAgICAgICAgICAgaWxsdW1pbmF0ZWRHbmlkYUlkcz17aWxsdW1pbmF0ZWRHbmlkYUlkc31cbiAgICAgICAgICAgICAgICBpc0ZvcmNlUmVmcmVzaGluZz17aXNGb3JjZVJlZnJlc2hpbmd9XG4gICAgICAgICAgICAgICAgb25TZWxlY3RUYXJnZXQ9eyhpZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgc2V0U2VsZWN0ZWRUYXJnZXRJZChpZCk7XG4gICAgICAgICAgICAgICAgICBwbGF5UmFkYXJUb25lKDkwMCwgMTAwLCAnc2luZScpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25UcmlnZ2VyT21uaVNjYW49e2hhbmRsZVRyaWdnZXJSYWRhck9tbmlTY2FufVxuICAgICAgICAgICAgICAgIG9uU3Bhd25HbmlkYT17aGFuZGxlU3Bhd25DdXN0b21HbmlkYX1cbiAgICAgICAgICAgICAgICBvblRyaWdnZXJDYXNjYWRlPXt0cmlnZ2VyQW50aXZpcnVzQ2FzY2FkZX1cbiAgICAgICAgICAgICAgICBvbk9wZW5Eb3NzaWVyPXsoaWQpID0+IHtcbiAgICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkVGFyZ2V0SWQoaWQpO1xuICAgICAgICAgICAgICAgICAgc2V0UmFkYXJMaXN0VGFiKCdUQVJHRVRfRE9TU0lFUicpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgc3lzdGVtSW50ZWdyaXR5UGVyY2VudD17c3lzdGVtSW50ZWdyaXR5UGVyY2VudH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIHNlbGVjdGVkR25pZGEgPyAoXG4gICAgICAgICAgICAgICgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgc2VsU2NvcmUgPSBnZXRHbmlkYVRocmVhdFNjb3JlKHNlbGVjdGVkR25pZGEpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbENvbG9yQ2ZnID0gZ2V0VGhyZWF0Q29sb3Ioc2VsU2NvcmUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgc2hhZG93LXhsIHNwYWNlLXktNCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNlbENvbG9yQ2ZnLmhleCxcbiAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMjRweCAke3NlbENvbG9yQ2ZnLmdsb3dIZXh9YFxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMiBweS0wLjUgcm91bmRlZCBib3JkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHNlbENvbG9yQ2ZnLmhleCArICcyMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogc2VsQ29sb3JDZmcuaGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHNlbENvbG9yQ2ZnLmhleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRHbmlkYS50eXBlTGFiZWwudG9VcHBlckNhc2UoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8bW90aW9uLnNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtWzEwcHhdIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGJhY2tncm91bmRDb2xvcjogc2VsQ29sb3JDZmcuaGV4IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZT17eyBzY2FsZTogWzEsIDEuMDYsIDFdIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbj17eyBkdXJhdGlvbjogc2VsQ29sb3JDZmcucHVsc2VEdXJhdGlvbiwgcmVwZWF0OiBJbmZpbml0eSB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgVEhSRUFUOiB7c2VsU2NvcmV9JVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L21vdGlvbi5zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgbXQtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBibG9ja1wiPlN0YXR1cyBuYSBSYWRhcnplOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHRleHQteHMgZm9udC1ib2xkICR7c2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnID8gJ3RleHQtc2xhdGUtNTAwJyA6ICd0ZXh0LXJlZC00MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRHbmlkYS5zdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRocmVhdCBTY29yZSBTcGVjdHJ1bSBHYXVnZSBNZXRlciAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Qb3ppb20gWmFncm/FvGVuaWEgKFRocmVhdCBHYXVnZSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ibGFja1wiIHN0eWxlPXt7IGNvbG9yOiBzZWxDb2xvckNmZy5oZXggfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxTY29yZX0lIOKAoiB7c2VsQ29sb3JDZmcubGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIHJvdW5kZWQtZnVsbCBoLTMgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDAgcm91bmRlZC1mdWxsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7c2VsU2NvcmV9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogYGxpbmVhci1ncmFkaWVudCg5MGRlZywgI2ZhY2MxNSAwJSwgI2Y5NzMxNiA0MCUsICNmNDNmNWUgNzUlLCAjZmYwMDNjIDEwMCUpYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3hTaGFkb3c6IGAwIDAgMTBweCAke3NlbENvbG9yQ2ZnLmhleH1gXG4gICAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDAgcHQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj41MCUgxbvDs8WCdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj43MCUgUG9tYXJhxYRjejwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPjg1JSBDemVyd2llxYQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4xMDAlIEphc2tyYXdhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogVGVsZW1ldHJ5IEdyaWQgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMiB0ZXh0LWNlbnRlciB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBibG9ja1wiPkF6eW11dDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+e3NlbGVjdGVkR25pZGEuYmVhcmluZ0RlZ33CsDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5aYXNpxJlnPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj57TWF0aC5yb3VuZChzZWxlY3RlZEduaWRhLmRpc3RhbmNlUmF0aW8gKiAxMDApfSBrbTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5aZHJvd2llIEduaWR5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtYm9sZFwiPntzZWxlY3RlZEduaWRhLmhlYWx0aFBlcmNlbnR9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRhcmdldCBQcm9jZXNzICYgSS9PIE5vZGUgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTk1MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMS41IHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+UHJvY2VzIEduaWR5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBmb250LWJvbGRcIj57c2VsZWN0ZWRHbmlkYS5hY3RpdmVQcm9jZXNzTmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlphaW5mZWtvd2FueSBXxJl6ZcWCOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTQwMCBmb250LWJvbGRcIj57c2VsZWN0ZWRHbmlkYS5hc3NvY2lhdGVkSU9Ob2RlSWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5TSEEtMjU2Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+e3NlbGVjdGVkR25pZGEuc2lnbmF0dXJlU2hhLnNsaWNlKDAsIDE2KX0uLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBBZ2dyZXNzaW9uICYgSW5mZWN0aW9uIERldGFpbHMgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXJlZC05NTAvMjAgYm9yZGVyIGJvcmRlci1yZWQtOTAwLzQwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBibG9jayBtYi0xIGZvbnQtbW9ub1wiPk1lY2hhbml6bSBBZ3Jlc2ppIEduaWR5Ojwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkR25pZGEuYWdncmVzc2lvbkRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1wdXJwbGUtOTUwLzIwIGJvcmRlciBib3JkZXItcHVycGxlLTkwMC80MCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgYmxvY2sgbWItMSBmb250LW1vbm9cIj5TcG9zw7NiIFduaWtuacSZY2lhIChXZWt0b3IgSW5mZWtjamkpOjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAge3NlbGVjdGVkR25pZGEuaW5mZWN0aW9uVmVjdG9yfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogQWN0aW9uIEJ1dHRvbnM6IENhc2NhZGUgQW50aXZpcnVzIEJhcnJpZXIgJiBNYW51YWwgSHVudGVyIEV4ZWN1dGlvbiAmIEhvcm5ldCBTd2FybSAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRIb3JuZXRNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTIuNSByb3VuZGVkLXhsIHRleHQteHMgc206dGV4dC1zbSBmb250LWJsYWNrIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNTAwIHZpYS1vcmFuZ2UtNjAwIHRvLXJlZC02MDAgaG92ZXI6ZnJvbS1hbWJlci00MDAgaG92ZXI6dG8tcmVkLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy1hbWJlci05NTAvNjAgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAvNDAgYW5pbWF0ZS1wdWxzZSBhY3RpdmU6c2NhbGUtOTUnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiV3lwdcWbxIcgUsOzaiBEemlraWNoIEFmcnlrYcWEc2tpY2ggU3plcnN6ZW5pIG5hIHd5YnJhbsSFIGduaWTEmVwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1iYXNlXCI+8J+QnTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPld5cHXFm8SHIFLDs2ogQWZyeWthxYRza2ljaCBTemVyc3plbmkgbmEgR25pZMSZPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gdHJpZ2dlckFudGl2aXJ1c0Nhc2NhZGUoc2VsZWN0ZWRHbmlkYSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17c2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTMgcm91bmRlZC14bCB0ZXh0LXhzIHNtOnRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRHbmlkYS5zdGF0ZSA9PT0gJ1pOSVNaQ1pPTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdmlhLXRlYWwtNjAwIHRvLWN5YW4tNjAwIGhvdmVyOmZyb20tZW1lcmFsZC01MDAgaG92ZXI6dG8tY3lhbi01MDAgdGV4dC13aGl0ZSBzaGFkb3ctZW1lcmFsZC05NTAvNjAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC0yMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdTZWt0b3IgWmFiZXpwaWVjem9ueSBCYXJpZXLEhSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGBMaWt3aWR1aiAmIFVydWNob20gS2Fza2FkxJkgKDBtcyDinpQgTGFzZXIg4p6UIFdhcnN0d3kpYH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZU9yZGVySHVudGVyU2xhdWdodGVyKHNlbGVjdGVkR25pZGEpfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e3NlbGVjdGVkR25pZGEuc3RhdGUgPT09ICdaTklTWkNaT05BJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0yIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEduaWRhLnN0YXRlID09PSAnWk5JU1pDWk9OQSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAvNDAgdGV4dC1zbGF0ZS02MDAgY3Vyc29yLW5vdC1hbGxvd2VkIGJvcmRlciBib3JkZXItc2xhdGUtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNjAwIHZpYS1waW5rLTYwMCB0by1wdXJwbGUtNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1wdXJwbGUtNTAwIHRleHQtd2hpdGUgc2hhZG93LXJlZC05NTAvNjAgYm9yZGVyIGJvcmRlci1yZWQtNDAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRhcmdldCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TdGFuZGFyZG93eSBVYsOzaiDFgW93Y3kgR2VtaW5pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC04IHRleHQtY2VudGVyIGJnLXNsYXRlLTkwMC82MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgICAgV3liaWVyeiBHbmlkxJkgbmEgcmFkYXJ6ZSwgYWJ5IHpvYmFjennEhyBzemN6ZWfDs8WCeSB0YWt0eWN6bmUuXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgIHsvKiBIdW50ZXIgVGVsZW1ldHJ5IFN1YmNhcmQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2xhdGUtOTUwIHZpYS1jeWFuLTk1MC80MCB0by1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTgwMC80MCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICBQT1NUxJhQIFBSQUMgxYFPV0NZIEdFTUlOSSBBSTpcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGRcIj57aHVudGVyU3RhdGUucmVwYWlyUHJvZ3Jlc3N9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFByb2dyZXNzIEJhciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIHJvdW5kZWQtZnVsbCBoLTIuNSBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1jeWFuLTkwMC82MFwiPlxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTUwMCB0by1lbWVyYWxkLTQwMCBoLWZ1bGwgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNTAwXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtodW50ZXJTdGF0ZS5yZXBhaXJQcm9ncmVzc30lYCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlpsaWt3aWRvd2FuZSBHbmlkeTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e2h1bnRlclN0YXRlLmtpbGxzQ291bnR9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlVsZWN6b25lIFfEmXrFgnkgSS9POiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj57aHVudGVyU3RhdGUuZml4ZWROb2Rlc0NvdW50fTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiA0IENvbmNlbnRyaWMgU2VjdXJpdHkgTGF5ZXJzIE92ZXJ2aWV3ICYgTGFzZXIgR3JpZCBNYXRyaXggKDEyIGNvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMTIgbXQtMiBwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy0yeGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S2Fza2Fkb3dhIE9jaHJvbmEgNCBXYXJzdHcgTW9ub2xpdHUgJiBTaWF0a2EgTGFzZXJvd2E8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgIEthxbxkeSBvY3p5c3pjem9ueSB6IEduaWQgb2JzemFyIHpvc3RhamUgbmF0eWNobWlhc3QgemFiZXpwaWVjem9ueSBrb3Jkb25lbSBhbnR5d2lydXNvd3ltLCBuYXN0xJlwbmllIGxhc2VyZW0gc2VrdG9yb3d5bSwgYSBuYSBrb25pZWMga2Fza2Fkb3dvIHdpxIXFvGUgc8SFc2llZG5pZSB3YXJzdHd5IGRvIG1vbWVudHUgY2HFgmtvd2l0ZWogZWtzdGVybWluYWNqaSBtYWx3YXJlLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgU3VtYSBPY2hyb255OiB7Y2FzY2FkZVN0YXRlLm92ZXJhbGxGb3J0cmVzc1NoaWVsZFBlcmNlbnR9JVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0zIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIHtzZWN1cmVkTGF5ZXJzLm1hcCgobGF5ZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFnZUNvbG9yID0gbGF5ZXIuc3RhZ2UgPT09ICdJTU1FRElBVEVfTE9DSydcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTUwMCBiZy1lbWVyYWxkLTk1MC8zMCdcbiAgICAgICAgICAgICAgICAgIDogbGF5ZXIuc3RhZ2UgPT09ICdTRUNUT1JfTEFTRVInXG4gICAgICAgICAgICAgICAgICA/ICdib3JkZXItY3lhbi01MDAgYmctY3lhbi05NTAvMzAnXG4gICAgICAgICAgICAgICAgICA6IGxheWVyLnN0YWdlID09PSAnTkVJR0hCT1JfQ0FTQ0FERSdcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci10ZWFsLTUwMCBiZy10ZWFsLTk1MC8zMCdcbiAgICAgICAgICAgICAgICAgIDogbGF5ZXIuaXNTZWN1cmVkXG4gICAgICAgICAgICAgICAgICA/ICdib3JkZXItZW1lcmFsZC03MDAgYmctc2xhdGUtOTUwLzkwJ1xuICAgICAgICAgICAgICAgICAgOiAnYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAvNjAnO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtsYXllci5sYXllckluZGV4fSBjbGFzc05hbWU9e2BwLTMuNSByb3VuZGVkLXhsIGJvcmRlciAke3N0YWdlQ29sb3J9IHNwYWNlLXktMi41IHRyYW5zaXRpb24tYWxsYH0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIuZGVwdGhSYW5nZUttfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LWJvbGQgJHtsYXllci5pc1NlY3VyZWQgPyAndGV4dC1lbWVyYWxkLTQwMCcgOiAndGV4dC1zbGF0ZS01MDAnfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2xheWVyLmlzU2VjdXJlZCA/ICdaQUJFWlBJRUNaT05BJyA6ICdOSUVBS1RZV05BJ31cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsYXllci5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgYmxvY2sgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7bGF5ZXIuZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogU2hpZWxkIE1ldGVyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+TW9jIFRhcmN6eTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtYm9sZFwiPntsYXllci5zaGllbGRQZXJjZW50fSU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIHJvdW5kZWQtZnVsbCBoLTEuNSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtNTAwIHRvLWN5YW4tNDAwIGgtZnVsbCByb3VuZGVkLWZ1bGwgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7bGF5ZXIuc2hpZWxkUGVyY2VudH0lYCB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgdGV4dC1bMTBweF0gc3BhY2UteS0xIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+V2nEhXpraSBsYXNlcm93ZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPntsYXllci5hY3RpdmVCZWFtc0NvdW50fSBsYXNlcsOzdzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5PY3p5c3pjem9uZSB3xJl6xYJ5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkXCI+e2xheWVyLmNsZWFuc2VkTm9kZXNDb3VudH0gcGt0PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkV0YXAgS2Fza2FkeTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPntsYXllci5zdGFnZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVklFVyAyOiBNT05PTElUWUNaTkEgUE9XSUVSWkNITklBIFNZU1RFTVUgKEFSQ0hJVEVLVFVSQSBJL08pICovfVxuICAgICAge2FjdGl2ZVZpZXdNb2RlID09PSAnTU9OT0xJVEhfU1VSRkFDRScgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctMnhsIHNwYWNlLXktNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcGItNCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TW9ub2xpdHljem5hIFBvd2llcnpjaG5pYSBTeXN0ZW11IHogV8SZesWCYW1pIFdlasWbY2lhIGkgV3lqxZtjaWEgKEkvTyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgUHVscGl0IG5hd2lnYWN5am55IG1vbml0b3JhIHN0YW5vd2kgY2VudHJhbG55IHB1bmt0IHd5asWbY2lvd3kgaW50ZXJha2NqaSBjesWCb3dpZWthIHogbWFzenluxIUuIFphYmV6cGllY3pvbm8gd3N6eXN0a2llIG1hZ2lzdHJhbGUgaSBwb3J0eSBwcnplZCBwZW5ldHJhY2rEhSBHbmlkLlxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwXCI+XG4gICAgICAgICAgICAgICAgICA5IFptYXBvd2FueWNoIFfEmXrFgsOzdyBJL09cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBHcmlkIG9mIEkvTyBTeXN0ZW0gTm9kZXMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTRcIj5cbiAgICAgICAgICAgICAge2lvTm9kZXMubWFwKG5vZGUgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9uaXRvciA9IG5vZGUuaWQgPT09ICdub2RlLW1vbml0b3InO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzQ29tcHJvbWlzZWQgPSBub2RlLnN0YXR1cyA9PT0gJ0NPTVBST01JU0VEJztcbiAgICAgICAgICAgICAgICBjb25zdCBpc1JlY29uc3RydWN0ZWQgPSBub2RlLnN0YXR1cyA9PT0gJ1JFQ09OU1RSVUNURUQnO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzQ29sb3IgPSBpc0NvbXByb21pc2VkIFxuICAgICAgICAgICAgICAgICAgPyAnYm9yZGVyLXJlZC02MDAvNzAgYmctcmVkLTk1MC8yMCcgXG4gICAgICAgICAgICAgICAgICA6IGlzUmVjb25zdHJ1Y3RlZCBcbiAgICAgICAgICAgICAgICAgID8gJ2JvcmRlci1lbWVyYWxkLTYwMC83MCBiZy1lbWVyYWxkLTk1MC8yMCcgXG4gICAgICAgICAgICAgICAgICA6ICdib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTk1MC84MCc7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e25vZGUuaWR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLXhsIGJvcmRlciAke3N0YXR1c0NvbG9yfSBzcGFjZS15LTMgdHJhbnNpdGlvbi1hbGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuYH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2lzTW9uaXRvciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMCByaWdodC0wIHB4LTIgcHktMC41IHJvdW5kZWQtYmwtbGcgYmctZW1lcmFsZC03MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gdGV4dC1bOXB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFBVTFBJVCBNT05JVE9SXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMS41IHB5LTAuMiBiZy1zbGF0ZS05MDAgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtub2RlLmNvZGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtub2RlLnR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIHNwYWNlLXktMSB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMXB4XVwiPlByemVwdXN0b3dvxZvEhzo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPntub2RlLnRyYWZmaWNCYW5kd2lkdGh9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMXB4XVwiPlN0YW4gT2Nocm9ueTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2lzQ29tcHJvbWlzZWQgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1lbWVyYWxkLTQwMCd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7bm9kZS5zdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzExcHhdXCI+QmFyaWVyYTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgdHJ1bmNhdGUgbWF4LXctWzE2MHB4XVwiIHRpdGxlPXtub2RlLnByb3RlY3RpbmdCYXJyaWVyfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge25vZGUucHJvdGVjdGluZ0JhcnJpZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9uIGZvciBDb21wcm9taXNlZCBOb2RlcyAqL31cbiAgICAgICAgICAgICAgICAgICAge2lzQ29tcHJvbWlzZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW9Ob2RlcyhwcmV2ID0+IHByZXYubWFwKG4gPT4gbi5pZCA9PT0gbm9kZS5pZCA/IHsgLi4ubiwgc3RhdHVzOiAnUkVDT05TVFJVQ1RFRCcsIGNvbXByb21pc2VkQnlHbmlkYUlkOiBudWxsIH0gOiBuKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFkZENvbWJhdExvZyhgW0FVVE9OQVBSQVdBXSBXxJl6ZcWCICR7bm9kZS5uYW1lfSB6b3N0YcWCIG9kY2nEmXR5IG9kIEduaWR5IGkgenJla29uc3RydW93YW55LmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5UmFkYXJUb25lKDgwMCwgMjAwLCAnc2luZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweS0xLjUgcm91bmRlZC1sZyBiZy1lbWVyYWxkLTcwMCBob3ZlcjpiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmVrb25zdHJ1dWogV8SZemXFgiBKZWRueW0gS2xpa25pxJljaWVtPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVklFVyAzOiBDT01CQVQgVEVMRU1FVFJZIExPR1MgKi99XG4gICAgICB7YWN0aXZlVmlld01vZGUgPT09ICdDT01CQVRfTE9HUycgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIEJvam93eSAmIFRlbGVtZXRyaWEgTGlrd2lkYWNqaSBHbmlkPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldENvbWJhdExvZ3MoW10pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgZm9udC1tb25vIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgV3ljennFm8SHIExvZ2lcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1ibGFjayBmb250LW1vbm8gdGV4dC14cyB0ZXh0LWVtZXJhbGQtMzAwIHNwYWNlLXktMS41IG1heC1oLTk2IG92ZXJmbG93LXktYXV0byBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTUwXCI+XG4gICAgICAgICAgICB7Y29tYmF0TG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT17bG9nLmluY2x1ZGVzKCdbQUxBUk0nKSB8fCBsb2cuaW5jbHVkZXMoJ1tPU1RSWkHFgScpID8gJ3RleHQtcmVkLTQwMCcgOiBsb2cuaW5jbHVkZXMoJ1tFS1NURVJNSU5BQ0pBJykgfHwgbG9nLmluY2x1ZGVzKCdbU0VLVE9SJykgPyAndGV4dC15ZWxsb3ctMzAwIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS0zMDAnfT5cbiAgICAgICAgICAgICAgICB7bG9nfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBBZnJpY2FuIEhvcm5ldCBTd2FybSBNb2RhbCBpbiBSYWRhciAqL31cbiAgICAgIDxBZnJpY2FuSG9ybmV0U3dhcm1Nb2RhbFxuICAgICAgICBpc09wZW49e2hvcm5ldE1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SG9ybmV0TW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgICAgdGFyZ2V0R25pZGFOYW1lPXtzZWxlY3RlZEduaWRhPy5hY3RpdmVQcm9jZXNzTmFtZSB8fCAnZ25pZGFfcmFkYXJfdGFyZ2V0LmV4ZSd9XG4gICAgICAgIHRhcmdldFBpZD17TWF0aC5mbG9vcigxMDAwICsgTWF0aC5yYW5kb20oKSAqIDgwMDApfVxuICAgICAgICBvbkRlY2FwaXRhdGlvbkNvbXBsZXRlPXsoKSA9PiB7XG4gICAgICAgICAgaWYgKHNlbGVjdGVkR25pZGEpIHRyaWdnZXJBbnRpdmlydXNDYXNjYWRlKHNlbGVjdGVkR25pZGEpO1xuICAgICAgICAgIHNldEhvcm5ldE1vZGFsT3BlbihmYWxzZSk7XG4gICAgICAgIH19XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBMGpEZ0IsU0FnVEUsVUFoVEY7QUExakRoQixTQUFnQixVQUFVLFdBQVcsUUFBUSxTQUFTLG1CQUFtQjtBQUN6RSxTQUFTLGNBQStCO0FBQ3hDO0FBQUEsRUFDRTtBQUFBLEVBQVc7QUFBQSxFQUFPO0FBQUEsRUFBcUI7QUFBQSxFQUFhO0FBQUEsRUFDcEQ7QUFBQSxFQUFTO0FBQUEsRUFBUztBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBZ0I7QUFBQSxFQUM5QjtBQUFBLEVBQWdCO0FBQUEsRUFBNkI7QUFBQSxFQUM5RDtBQUFBLEVBQVU7QUFBQSxFQUFRO0FBQUEsRUFBcUI7QUFBQSxFQUFjO0FBQUEs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K0VBO0FBQUEsU0FuR0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQW9HQSxLQXJHRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBc0dBO0FBQUEsSUFJRCxtQkFBbUIsaUJBQ2xCLHVCQUFDLFNBQUksV0FBVSxnRkFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLCtCQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLGlDQUFDLFlBQVMsV0FBVSw4QkFBcEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBK0M7QUFBQSxVQUMvQyx1QkFBQyxVQUFLLDREQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQWtEO0FBQUEsYUFGcEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGNBQWMsQ0FBQyxDQUFDO0FBQUEsWUFDL0IsV0FBVTtBQUFBLFlBQ1g7QUFBQTtBQUFBLFVBSEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBS0E7QUFBQSxXQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFXQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDZIQUNaLHFCQUFXLElBQUksQ0FBQyxLQUFLLFFBQ3BCLHVCQUFDLFNBQWMsV0FBVyxJQUFJLFNBQVMsUUFBUSxLQUFLLElBQUksU0FBUyxVQUFVLElBQUksaUJBQWlCLElBQUksU0FBUyxnQkFBZ0IsS0FBSyxJQUFJLFNBQVMsU0FBUyxJQUFJLDhCQUE4QixrQkFDdkwsaUJBRE8sS0FBVjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUEsQ0FDRCxLQUxIO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFNQTtBQUFBLFNBcEJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FxQkE7QUFBQSxJQUlGO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQyxRQUFRO0FBQUEsUUFDUixTQUFTLE1BQU0sbUJBQW1CLEtBQUs7QUFBQSxRQUN2QyxpQkFBaUIsZUFBZSxxQkFBcUI7QUFBQSxRQUNyRCxXQUFXLEtBQUssTUFBTSxNQUFPLEtBQUssT0FBTyxJQUFJLEdBQUk7QUFBQSxRQUNqRCx3QkFBd0IsTUFBTTtBQUM1QixjQUFJLGNBQWUseUJBQXdCLGFBQWE7QUFDeEQsNkJBQW1CLEtBQUs7QUFBQSxRQUMxQjtBQUFBO0FBQUEsTUFSRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFTQTtBQUFBLE9BM2lDRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBNGlDQTtBQUVKOyIsIm5hbWVzIjpbImh4IiwiaHkiXX0=