import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Smartphone,
  ShieldCheck,
  Zap,
  Crosshair,
  CheckCircle2,
  Flame,
  RefreshCw,
  Download,
  Code,
  Play,
  Radio,
  Lock,
  Cpu,
  Terminal,
  Globe,
  MessageSquare,
  CreditCard,
  Image,
  ShoppingBag,
  Settings,
  Folder,
  Camera,
  Key,
  Gamepad2,
  Share2,
  PlaySquare,
  Cloud,
  MapPin,
  Coins,
  Sliders,
  Fingerprint,
  LayoutGrid,
  Sparkles,
  Move,
  Target,
  X,
  Volume2,
  VolumeX,
  Sun,
  AlertOctagon
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { combatAudio } from "/sentinel-shield/src/utils/combatAudioEngine.ts";
import {
  mobileAreaConquestEngine
} from "/sentinel-shield/src/utils/mobileAreaConquestEngine.ts";
import { PhoneRearScreenShield } from "/sentinel-shield/src/components/PhoneRearScreenShield.tsx";
import { CpuThermalGovernorPanel } from "/sentinel-shield/src/components/CpuThermalGovernorPanel.tsx";
const playKillGnidaLaserAudio = (pitch = 880, type = "sawtooth") => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(pitch, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.18);
    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1e-3, ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.22);
  } catch {
  }
};
export const MobileTacticalDesantArea = ({
  onNotify,
  isCompact = false
}) => {
  const [state, setState] = useState(() => mobileAreaConquestEngine.getState());
  const [connectors, setConnectors] = useState(() => mobileAreaConquestEngine.getConnectors());
  const [apps, setApps] = useState(() => mobileAreaConquestEngine.getApps());
  const [activeTab, setActiveTab] = useState("screen_matrix");
  const [copied, setCopied] = useState(false);
  const [activeDronesAnim, setActiveDronesAnim] = useState([]);
  const [fullSalvoActive, setFullSalvoActive] = useState(false);
  const [inspectingAppId, setInspectingAppId] = useState(null);
  const [armedUnitType, setArmedUnitType] = useState(null);
  const [isGromDesantActive, setIsGromDesantActive] = useState(false);
  const [gromTimeRemaining, setGromTimeRemaining] = useState(20);
  const [isGromVictoriousSerene, setIsGromVictoriousSerene] = useState(false);
  const [isCombatAudioMuted, setIsCombatAudioMuted] = useState(false);
  useEffect(() => {
    const unsub = mobileAreaConquestEngine.subscribe((newState, newConnectors, newApps) => {
      setState(newState);
      setConnectors(newConnectors);
      setApps(newApps);
    });
    return () => unsub();
  }, []);
  const triggerKittenBreachAnimation = (targetAppId, unitType, appName, clientX, clientY) => {
    const animId = `drone-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newDrone = {
      id: animId,
      targetAppId,
      unitType,
      startX: clientX || window.innerWidth / 2,
      startY: clientY || 200,
      targetAppName: appName
    };
    setActiveDronesAnim((prev) => [...prev, newDrone]);
    playKillGnidaLaserAudio(unitType === "KITTEN_DRONE_GARRISON" ? 1200 : 950);
    setTimeout(() => {
      setActiveDronesAnim((prev) => prev.filter((d) => d.id !== animId));
    }, 1100);
  };
  const inspectingApp = apps.find((a) => a.id === inspectingAppId) || null;
  const handleKillGnidaInstantSalvo = () => {
    setFullSalvoActive(true);
    playKillGnidaLaserAudio(1400, "square");
    mobileAreaConquestEngine.executeStage1HostBase();
    mobileAreaConquestEngine.executeStage2CleanseConnectors();
    mobileAreaConquestEngine.executeStage3Screen1Desant();
    mobileAreaConquestEngine.executeStage4MultiScreenDesant();
    if (onNotify) {
      onNotify("⚡🗡️ SALWA ZABIJ GNIDĘ: Drony-kotki i wieża laserowa spopieliły wszystkie gnidy w systemie (0 ms)!");
    }
    setTimeout(() => {
      setFullSalvoActive(false);
    }, 1800);
  };
  const handleStartAutoConquest = () => {
    playKillGnidaLaserAudio(800);
    mobileAreaConquestEngine.startAutomatedConquest();
    if (onNotify) {
      onNotify("🚀 ROZPOCZĘTO AUTOMATYCZNE ZAJMOWANIE OBSZARU: Etap 1 -> 2 -> 3 -> 4 w toku!");
    }
  };
  const handleAdvanceStep = () => {
    playKillGnidaLaserAudio(900);
    mobileAreaConquestEngine.advanceNextStep();
    if (onNotify) {
      onNotify("➡️ Wykonano kolejny etap taktycznego desantu!");
    }
  };
  const handleStartGrom20sDesant = () => {
    setIsGromVictoriousSerene(false);
    setIsGromDesantActive(true);
    setGromTimeRemaining(20);
    combatAudio.startCombatAudio();
    if (onNotify) {
      onNotify("🚨 [G.R.O.M.] ROZPOCZĘTO 20-SEKUNDOWY DESANT BOJOWY! CZERWONY ALARM PULSUJE, DŹWIĘKI WALKI W TOKU!");
    }
    const startTime = Date.now();
    const duration = 2e4;
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, (duration - elapsed) / 1e3);
      setGromTimeRemaining(Number(remaining.toFixed(1)));
      if (elapsed >= 5e3 && elapsed < 6e3) {
        mobileAreaConquestEngine.executeStage1HostBase();
      } else if (elapsed >= 1e4 && elapsed < 11e3) {
        mobileAreaConquestEngine.executeStage2CleanseConnectors();
      } else if (elapsed >= 15e3 && elapsed < 16e3) {
        mobileAreaConquestEngine.executeStage3Screen1Desant();
      }
      if (elapsed >= duration) {
        clearInterval(timer);
        setIsGromDesantActive(false);
        setGromTimeRemaining(0);
        mobileAreaConquestEngine.executeStage4MultiScreenDesant();
        setIsGromVictoriousSerene(true);
        combatAudio.playVictorySunbeamChime();
        if (onNotify) {
          onNotify("☀️ [G.R.O.M. SUKCES] DESANT 20 SEKUND UKOŃCZONY! EKRAN ROZJAŚNIONY, POGODNE NIEBO, OBSZAR W 100% BEZPIECZNY!");
        }
      }
    }, 100);
  };
  const handleToggleCombatAudio = () => {
    const nextMuted = !isCombatAudioMuted;
    setIsCombatAudioMuted(nextMuted);
    combatAudio.setMuted(nextMuted);
  };
  const handleInstantFullConquest = () => {
    handleKillGnidaInstantSalvo();
  };
  const handleReset = () => {
    mobileAreaConquestEngine.resetToInitialState();
    if (onNotify) {
      onNotify("🔄 Zresetowano poligon desantu smartfona do stanu wyjściowego.");
    }
  };
  const handleCleanseConnector = (id) => {
    playKillGnidaLaserAudio(1100);
    mobileAreaConquestEngine.cleanseSpecificConnector(id);
    if (onNotify) {
      onNotify("🗡️ Zneutralizowano gnidy na wybranym złączu komunikacyjnym!");
    }
  };
  const handleCopyScript = () => {
    const script = mobileAreaConquestEngine.generateMobileConquestScript();
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    if (onNotify) {
      onNotify("📋 Skopiowano skrypt automatycznego desantu (Android/Python) do schowka!");
    }
  };
  const handleDownloadScript = () => {
    const script = mobileAreaConquestEngine.generateMobileConquestScript();
    const blob = new Blob([script], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sentinel_mobile_area_conquest.py";
    a.click();
    URL.revokeObjectURL(url);
    if (onNotify) {
      onNotify("💾 Pobrano plik sentinel_mobile_area_conquest.py!");
    }
  };
  const handleDragStartUnit = (unitType, e) => {
    e.dataTransfer.setData("text/plain", unitType);
    mobileAreaConquestEngine.setDraggedUnitType(unitType);
  };
  const handleDragOverApp = (e) => {
    e.preventDefault();
  };
  const handleDropOnApp = (appId, e) => {
    e.preventDefault();
    const unitType = e.dataTransfer.getData("text/plain") || state.draggedUnitType || "LASER_TOWER_BEAM";
    const targetApp = apps.find((a) => a.id === appId);
    triggerKittenBreachAnimation(appId, unitType, targetApp?.appName || "Aplikacja", e.clientX, e.clientY);
    mobileAreaConquestEngine.deployDesantVectorToApp(appId, unitType);
    mobileAreaConquestEngine.setDraggedUnitType(null);
    if (onNotify) {
      onNotify(`🛩️ Przeprowadzono desant jednostką ${unitType} na aplikację! Przeniknięto barierę!`);
    }
  };
  const handleAppCardClick = (app, e) => {
    if (armedUnitType) {
      triggerKittenBreachAnimation(app.id, armedUnitType, app.appName, e?.clientX, e?.clientY);
      mobileAreaConquestEngine.deployDesantVectorToApp(app.id, armedUnitType);
      if (onNotify) {
        onNotify(`🎯 Desant taktyczny uderzył w ${app.appName}! Dron-kotek spopielił gnidy!`);
      }
      setArmedUnitType(null);
    } else {
      setInspectingAppId(app.id);
    }
  };
  const handleCleanseSubConnection = (connId) => {
    if (!inspectingAppId) return;
    mobileAreaConquestEngine.cleanseSubConnection(inspectingAppId, connId);
    if (onNotify) {
      onNotify(`⚡ Zdezynfekowano wybrane pod-złącze aplikacji!`);
    }
  };
  const renderAppIcon = (iconName, isBase) => {
    const props = { className: `w-5 h-5 ${isBase ? "text-emerald-300 animate-pulse" : "text-cyan-300"}` };
    switch (iconName) {
      case "ShieldCheck":
        return /* @__PURE__ */ jsxDEV(ShieldCheck, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 310,
          columnNumber: 34
        }, this);
      case "Globe":
        return /* @__PURE__ */ jsxDEV(Globe, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 311,
          columnNumber: 28
        }, this);
      case "MessageSquare":
        return /* @__PURE__ */ jsxDEV(MessageSquare, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 312,
          columnNumber: 36
        }, this);
      case "CreditCard":
        return /* @__PURE__ */ jsxDEV(CreditCard, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 313,
          columnNumber: 33
        }, this);
      case "Image":
        return /* @__PURE__ */ jsxDEV(Image, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 314,
          columnNumber: 28
        }, this);
      case "ShoppingBag":
        return /* @__PURE__ */ jsxDEV(ShoppingBag, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 315,
          columnNumber: 34
        }, this);
      case "Settings":
        return /* @__PURE__ */ jsxDEV(Settings, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 316,
          columnNumber: 31
        }, this);
      case "Folder":
        return /* @__PURE__ */ jsxDEV(Folder, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 317,
          columnNumber: 29
        }, this);
      case "Terminal":
        return /* @__PURE__ */ jsxDEV(Terminal, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 318,
          columnNumber: 31
        }, this);
      case "Camera":
        return /* @__PURE__ */ jsxDEV(Camera, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 319,
          columnNumber: 29
        }, this);
      case "Lock":
        return /* @__PURE__ */ jsxDEV(Lock, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 320,
          columnNumber: 27
        }, this);
      case "Key":
        return /* @__PURE__ */ jsxDEV(Key, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 321,
          columnNumber: 26
        }, this);
      case "Gamepad2":
        return /* @__PURE__ */ jsxDEV(Gamepad2, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 322,
          columnNumber: 31
        }, this);
      case "Share2":
        return /* @__PURE__ */ jsxDEV(Share2, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 323,
          columnNumber: 29
        }, this);
      case "PlaySquare":
        return /* @__PURE__ */ jsxDEV(PlaySquare, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 324,
          columnNumber: 33
        }, this);
      case "Cloud":
        return /* @__PURE__ */ jsxDEV(Cloud, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 325,
          columnNumber: 28
        }, this);
      case "MapPin":
        return /* @__PURE__ */ jsxDEV(MapPin, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 326,
          columnNumber: 29
        }, this);
      case "Coins":
        return /* @__PURE__ */ jsxDEV(Coins, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 327,
          columnNumber: 28
        }, this);
      case "Sliders":
        return /* @__PURE__ */ jsxDEV(Sliders, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 328,
          columnNumber: 30
        }, this);
      case "Fingerprint":
        return /* @__PURE__ */ jsxDEV(Fingerprint, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 329,
          columnNumber: 34
        }, this);
      case "LayoutGrid":
        return /* @__PURE__ */ jsxDEV(LayoutGrid, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 330,
          columnNumber: 33
        }, this);
      case "Cpu":
        return /* @__PURE__ */ jsxDEV(Cpu, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 331,
          columnNumber: 26
        }, this);
      default:
        return /* @__PURE__ */ jsxDEV(Smartphone, { ...props }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 332,
          columnNumber: 23
        }, this);
    }
  };
  const getAggressionColor = (score) => {
    if (score === 0) return { text: "text-emerald-400", bg: "bg-emerald-950", border: "border-emerald-500", bar: "bg-emerald-500" };
    if (score < 50) return { text: "text-yellow-400", bg: "bg-yellow-950", border: "border-yellow-500", bar: "bg-yellow-500" };
    if (score < 80) return { text: "text-orange-400", bg: "bg-orange-950", border: "border-orange-500", bar: "bg-orange-500" };
    return { text: "text-rose-500", bg: "bg-rose-950", border: "border-rose-500", bar: "bg-rose-500" };
  };
  const activeScreenApps = apps.filter((a) => a.screenIndex === state.activeScreenView);
  return /* @__PURE__ */ jsxDEV("div", { className: `w-full rounded-3xl transition-all duration-700 p-4 sm:p-6 text-white space-y-6 ${isGromDesantActive ? "bg-slate-950 ring-8 ring-red-600/80 shadow-[inset_0_0_120px_rgba(239,68,68,0.75),0_0_60px_rgba(220,38,38,0.6)] animate-pulse" : isGromVictoriousSerene ? "bg-gradient-to-b from-[#101b2b] via-[#0c1522] to-[#080d14] border-2 border-amber-300 shadow-[0_0_70px_rgba(254,240,138,0.35)] filter brightness-110" : "bg-slate-950/95 backdrop-blur-md border-2 border-emerald-500/50 shadow-2xl"}`, children: [
    isGromDesantActive && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-red-950 via-rose-900 to-red-950 border-2 border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.85)] animate-pulse flex flex-col sm:flex-row items-center justify-between gap-3 text-white", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center animate-bounce shadow-lg shadow-black shrink-0", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-6 h-6 text-white" }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 360,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 359,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-black text-sm tracking-widest text-red-100 uppercase", children: "🚨 CZERWONY ALARM BOJOWY: TRWA DESANT G.R.O.M." }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 364,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-black/80 font-mono text-xs text-yellow-300 font-black border border-yellow-500/60 shadow", children: [
              "POZOSTAŁO: ",
              gromTimeRemaining.toFixed(1),
              "s"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 367,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 363,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-200 font-mono mt-0.5", children: "Dźwięki walki w tle aktywne • Zrzut desantowy i wypalanie gnid laserem 940.8 THz na 4 etapach" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 371,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 362,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 358,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "w-full sm:w-56 bg-black/80 rounded-full h-3.5 border border-red-400 overflow-hidden shrink-0", children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: "h-full bg-gradient-to-r from-amber-400 via-rose-400 to-red-500 transition-all duration-100",
          style: { width: `${(20 - gromTimeRemaining) / 20 * 100}%` }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 378,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 377,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 357,
      columnNumber: 9
    }, this),
    isGromVictoriousSerene && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-amber-500/25 via-sky-500/20 to-emerald-500/25 border-2 border-amber-300/80 shadow-[0_0_50px_rgba(254,240,138,0.5)] flex flex-col sm:flex-row items-center justify-between gap-3 text-white animate-fadeIn", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-lg shadow-amber-500/40 shrink-0", children: /* @__PURE__ */ jsxDEV(Sun, { className: "w-6 h-6 text-black animate-spin" }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 391,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 390,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-black text-sm tracking-widest text-amber-200 uppercase", children: "☀️ POGODNE NIEBO & CAŁKOWITY SPOKÓJ: DESANT G.R.O.M. ZAKOŃCZONY SUKCESEM" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 395,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-emerald-950 font-mono text-[10px] text-emerald-300 font-bold border border-emerald-500", children: "100% BEZPIECZEŃSTWA" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 398,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-amber-100/90 font-mono mt-0.5", children: "Po 20 sekundach walki obszar smartfona został w 100% odbity. Czyste niebo, ekran rozjaśniony, brak zagrożeń w pamięci." }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 402,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 393,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 389,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setIsGromVictoriousSerene(false),
          className: "px-3 py-1 rounded-lg bg-black/60 hover:bg-black/90 text-[10px] font-mono text-slate-300 cursor-pointer shrink-0",
          children: "Zamknij powiadomienie"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 407,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 388,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30 shrink-0", children: /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-7 h-7 text-emerald-300 animate-bounce" }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 420,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 419,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-black font-mono tracking-tight text-white uppercase flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Mobilny Desant Smartfona // G.R.O.M." }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 425,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 424,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${state.isCompleted ? "bg-emerald-950 border-emerald-400 text-emerald-300 shadow-[0_0_12px_#10b981]" : "bg-cyan-950 border-cyan-400 text-cyan-300 animate-pulse"}`, children: state.isCompleted ? "👑 100% SMARTFONA ZDOBYTE" : `ETAP: ${state.currentStage}` }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 427,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 423,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-mono mt-0.5", children: "Automatyczne zajęcie aplikacji bazy, oczyszczenie złączy IPC/Sockets z gnid, raport złączy oraz desant drag-and-drop na ekrany smartfona." }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 435,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 422,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 418,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap w-full lg:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleStartGrom20sDesant,
            disabled: isGromDesantActive,
            className: `relative px-5 py-3 rounded-2xl font-mono font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-2xl border-2 transition-all cursor-pointer ${isGromDesantActive ? "bg-red-700 text-white border-red-300 shadow-[0_0_30px_#ef4444] animate-pulse cursor-wait" : "titanium-steel-surface text-yellow-300 border-amber-400 hover:border-yellow-200 shadow-amber-950/80 hover:scale-103"}`,
            title: "AKRONIM: G.R.O.M. (Grupa Reagowania Operacyjno-Manewrowego). Czas trwania: dokładnie 20 sekund z dźwiękami walki w tle i pulsującym czerwonym światłem!",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1 left-1 milspec-rivet" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 455,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1 right-1 milspec-rivet" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 456,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1 left-1 milspec-rivet" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 457,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1 right-1 milspec-rivet" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 458,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(Flame, { className: `w-4 h-4 ${isGromDesantActive ? "text-white animate-spin" : "text-amber-400 fill-amber-400 animate-bounce"}` }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 460,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col text-left", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "tracking-wider text-xs sm:text-sm", children: isGromDesantActive ? `⚡ WALKA G.R.O.M. (${gromTimeRemaining.toFixed(1)}s)` : "⚡ DESANT G.R.O.M. (20 SEKUND)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 462,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] font-sans text-slate-300 opacity-90", children: isGromDesantActive ? "CZERWONY ALARM • OGNIE WALKI" : "AKRONIM: GRUPA REAGOWANIA OPERACYJNO-MANEWROWEGO" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 465,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 461,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 445,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleToggleCombatAudio,
            className: `p-2.5 rounded-xl border transition-all cursor-pointer ${isCombatAudioMuted ? "bg-slate-900 border-slate-700 text-slate-500" : "bg-red-950/80 border-red-500 text-red-300 shadow-md shadow-red-950/60"}`,
            title: isCombatAudioMuted ? "Włącz dźwięki walki w tle" : "Wycisz dźwięki walki w tle",
            children: isCombatAudioMuted ? /* @__PURE__ */ jsxDEV(VolumeX, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 479,
              columnNumber: 35
            }, this) : /* @__PURE__ */ jsxDEV(Volume2, { className: "w-4 h-4 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 479,
              columnNumber: 69
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 472,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleKillGnidaInstantSalvo,
            className: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 hover:from-rose-500 hover:to-amber-400 text-white font-mono font-black text-xs flex items-center justify-center gap-2 shadow-2xl shadow-rose-950 border-2 border-rose-400 cursor-pointer active:scale-95 transition-all animate-pulse",
            title: "Wypal natychmiast wszystkie gnidy na wszystkich ekranach i złączach (0 ms)!",
            children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4 text-amber-200 animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 488,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "🗡️ ZABIJ GNIDĘ (0 MS)" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 489,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 483,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleStartAutoConquest,
            disabled: state.isAutoExecuting || isGromDesantActive,
            className: `flex-1 lg:flex-none px-4 py-2.5 rounded-xl font-mono font-black text-xs flex items-center justify-center gap-2 shadow-xl border cursor-pointer active:scale-95 transition-all ${state.isAutoExecuting ? "bg-slate-800 text-slate-400 border-slate-700 cursor-not-allowed" : "bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black border-white shadow-emerald-950"}`,
            title: "Uruchom w pełni automatyczne 4-etapowe zajęcie obszaru",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 fill-black" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 502,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: state.isAutoExecuting ? "DESANT W TOKU..." : "AUTOMATYCZNY DESANT" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 503,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 492,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleAdvanceStep,
            disabled: state.isAutoExecuting || isGromDesantActive,
            className: "px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all",
            title: "Wykonaj pojedynczy krok taktyczny",
            children: [
              /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 512,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Krok Desantu" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 513,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 506,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleReset,
            className: "p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white cursor-pointer",
            title: "Resetuj stan desantu",
            children: /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 521,
              columnNumber: 13
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 516,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 442,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 417,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl border transition-all ${state.currentStage === "STAGE_1_HOST_APP" || state.overallProgress >= 25 ? "bg-emerald-950/80 border-emerald-400 shadow-[0_0_12px_#10b981]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] flex items-center justify-center font-black", children: "1" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 537,
              columnNumber: 15
            }, this),
            "Aplikacja Macierzysta"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 536,
            columnNumber: 13
          }, this),
          state.overallProgress >= 25 && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 540,
            columnNumber: 45
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 535,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Przejęcie procesu bazy, bufora ART i odcięcie wątków od złośliwych nakładek." }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 542,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 530,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl border transition-all ${state.currentStage === "STAGE_2_CONNECTORS" || state.overallProgress >= 50 ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_12px_#06b6d4]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-cyan-500/30 border border-cyan-400 text-cyan-300 text-[10px] flex items-center justify-center font-black", children: "2" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 555,
              columnNumber: 15
            }, this),
            "Oczyszczenie Złączy (Raport)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 554,
            columnNumber: 13
          }, this),
          state.overallProgress >= 50 && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 558,
            columnNumber: 45
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 553,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Prześwietlenie 8 wejść/wyjść (Binder, Sockets, Ashmem) & Raport ilości gnid." }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 560,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 548,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl border transition-all ${state.currentStage === "STAGE_3_SCREEN_DESANT" || state.overallProgress >= 75 ? "bg-teal-950/80 border-teal-400 shadow-[0_0_12px_#14b8a6]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-teal-500/30 border border-teal-400 text-teal-300 text-[10px] flex items-center justify-center font-black", children: "3" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 573,
              columnNumber: 15
            }, this),
            "Desant na Ekran 1"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 572,
            columnNumber: 13
          }, this),
          state.overallProgress >= 75 && /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-teal-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 576,
            columnNumber: 45
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 571,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Wystrzelenie promieni na sąsiednie kafelki aplikacji (Zdobycie 100% Ekranu 1)." }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 578,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 566,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `p-3 rounded-xl border transition-all ${state.currentStage === "STAGE_4_MULTI_SCREEN" || state.isCompleted ? "bg-emerald-950/90 border-emerald-400 shadow-[0_0_14px_#10b981]" : "bg-slate-950/60 border-slate-800 text-slate-500"}`, children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs text-white flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-emerald-500/30 border border-emerald-400 text-emerald-300 text-[10px] flex items-center justify-center font-black", children: "4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 591,
              columnNumber: 15
            }, this),
            "Desant na Kolejne Ekrany"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 590,
            columnNumber: 13
          }, this),
          state.isCompleted && /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 594,
            columnNumber: 35
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 589,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-300 mt-1", children: "Opanowanie Ekranu Narzędzi (2), Tła (3) oraz Paska Powiadomień i SystemUI (4)." }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 596,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 584,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 527,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-2 border-cyan-500/50 shadow-xl space-y-3", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Target, { className: "w-4 h-4 text-cyan-400 animate-spin" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 606,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-black text-cyan-300 uppercase tracking-wider", children: "Interaktywny Panel Kontroli Taktycznej • Wektory Ataku Gnid (Drag-and-Drop)" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 607,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 605,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-slate-400", children: [
          "🖱️ ",
          /* @__PURE__ */ jsxDEV("strong", { children: "Przeciągnij jednostkę" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 612,
            columnNumber: 17
          }, this),
          " na kafel aplikacji lub ",
          /* @__PURE__ */ jsxDEV("strong", { children: "kliknij" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 612,
            columnNumber: 79
          }, this),
          ", aby wycelować"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 611,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 604,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 pt-1 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            draggable: true,
            onDragStart: (e) => handleDragStartUnit("LASER_TOWER_BEAM", e),
            onClick: () => setArmedUnitType(armedUnitType === "LASER_TOWER_BEAM" ? null : "LASER_TOWER_BEAM"),
            className: `p-3 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${armedUnitType === "LASER_TOWER_BEAM" ? "bg-cyan-950 border-cyan-400 ring-2 ring-cyan-400 shadow-[0_0_15px_#06b6d4]" : "bg-slate-900/90 hover:bg-slate-850 border-cyan-500/40 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300 shrink-0", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 fill-cyan-300" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 631,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 630,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-black text-cyan-300 text-[11px] flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Promień Wieży Laserowej" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 635,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(Move, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 636,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 634,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-400", children: "Wypala gnidy w RAM (0 ms)" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 638,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 633,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 620,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            draggable: true,
            onDragStart: (e) => handleDragStartUnit("KITTEN_DRONE_GARRISON", e),
            onClick: () => setArmedUnitType(armedUnitType === "KITTEN_DRONE_GARRISON" ? null : "KITTEN_DRONE_GARRISON"),
            className: `p-3 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${armedUnitType === "KITTEN_DRONE_GARRISON" ? "bg-amber-950 border-amber-400 ring-2 ring-amber-400 shadow-[0_0_15px_#f59e0b]" : "bg-slate-900/90 hover:bg-slate-850 border-amber-500/40 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-amber-950 border border-amber-400 flex items-center justify-center text-amber-300 shrink-0 text-sm", children: "🐱" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 653,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-black text-amber-300 text-[11px] flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Dron Bojowy Kociak" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 658,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(Move, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 659,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 657,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-400", children: "Garnizon obronny kafelka" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 661,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 656,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 643,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            draggable: true,
            onDragStart: (e) => handleDragStartUnit("EMP_RESONATOR", e),
            onClick: () => setArmedUnitType(armedUnitType === "EMP_RESONATOR" ? null : "EMP_RESONATOR"),
            className: `p-3 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${armedUnitType === "EMP_RESONATOR" ? "bg-rose-950 border-rose-400 ring-2 ring-rose-400 shadow-[0_0_15px_#f43f5e]" : "bg-slate-900/90 hover:bg-slate-850 border-rose-500/40 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-rose-950 border border-rose-400 flex items-center justify-center text-rose-300 shrink-0", children: /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 fill-rose-300" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 677,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 676,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-black text-rose-300 text-[11px] flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Rezonator Impulsów EMP" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 681,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(Move, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 682,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 680,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-400", children: "Smaży gniazda C2 & Adware" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 684,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 679,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 666,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            draggable: true,
            onDragStart: (e) => handleDragStartUnit("BASE_COMMAND_CORE", e),
            onClick: () => setArmedUnitType(armedUnitType === "BASE_COMMAND_CORE" ? null : "BASE_COMMAND_CORE"),
            className: `p-3 rounded-xl border flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${armedUnitType === "BASE_COMMAND_CORE" ? "bg-emerald-950 border-emerald-400 ring-2 ring-emerald-400 shadow-[0_0_15px_#10b981]" : "bg-slate-900/90 hover:bg-slate-850 border-emerald-500/40 text-slate-200"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0", children: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 fill-emerald-300 text-black" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 700,
                columnNumber: 15
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 699,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-black text-emerald-300 text-[11px] flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Rdzeń Bazy Dowodzenia" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 704,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(Move, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 705,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 703,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-slate-400", children: "Trwała fortyfikacja obszaru" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 707,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 702,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 689,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 617,
        columnNumber: 9
      }, this),
      armedUnitType && /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-200 text-xs font-mono flex items-center justify-between animate-pulse", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4 text-cyan-300 animate-spin" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 715,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("strong", { children: "TRYB CELOWNIKA AKTYWNY:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 716,
            columnNumber: 15
          }, this),
          " Kliknij dowolną aplikację poniżej, aby natychmiast zrzucić jednostkę ",
          /* @__PURE__ */ jsxDEV("em", { children: armedUnitType }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 716,
            columnNumber: 125
          }, this),
          "!"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 714,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setArmedUnitType(null),
            className: "px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 text-[10px]",
            children: "Anuluj celownik"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 718,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 713,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 603,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 border-b border-slate-800 pb-2 text-xs font-mono flex-wrap gap-y-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("screen_matrix"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "screen_matrix" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 738,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Matryca Ekranów (",
              apps.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 739,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 730,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("rear_shield"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer relative ${activeTab === "rear_shield" ? "bg-gradient-to-r from-cyan-600 to-rose-600 text-white shadow-lg shadow-rose-950/60" : "bg-zinc-900 text-cyan-300 hover:text-white border border-cyan-500/30"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-rose-400 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 750,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Tarcza Tyłu Ekranu (0 ms Śmierć)" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 751,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded-full bg-rose-500 text-[9px] text-white font-mono font-bold", children: "940 THz" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 752,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 742,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("cpu_thermal"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer ${activeTab === "cpu_thermal" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950" : "bg-zinc-900 text-indigo-300 hover:text-white border border-indigo-500/30"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 765,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Kontrola Temp CPU & Kriogenika" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 766,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 757,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("connectors_report"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer relative ${activeTab === "connectors_report" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 777,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Raport Złączy (",
              connectors.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 778,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded-full bg-rose-500/80 text-[9px] text-white font-mono font-bold animate-pulse", children: [
              state.totalGnidasOnConnectors,
              " GNID"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 779,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 769,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("script"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "script" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Code, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 792,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Skrypt Python/ADB" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 793,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 784,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("logs"),
          className: `px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors cursor-pointer ${activeTab === "logs" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950" : "bg-slate-900 text-slate-400 hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 804,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Dziennik Desantu (",
              state.lastAssaultLog.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 805,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 796,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 729,
      columnNumber: 7
    }, this),
    activeTab === "rear_shield" && /* @__PURE__ */ jsxDEV(PhoneRearScreenShield, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 811,
      columnNumber: 9
    }, this),
    activeTab === "cpu_thermal" && /* @__PURE__ */ jsxDEV(CpuThermalGovernorPanel, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 816,
      columnNumber: 9
    }, this),
    activeTab === "screen_matrix" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: [
        { idx: 1, label: "Ekran 1: Główny Pulpit", subtitle: "Przeglądarka, Bank, SMS" },
        { idx: 2, label: "Ekran 2: Narzędzia & System", subtitle: "Ustawienia, Termux, VPN" },
        { idx: 3, label: "Ekran 3: Gry & Aplikacje w Tle", subtitle: "Adware, Chmura, Portfel" },
        { idx: 4, label: "Ekran 4: Pasek Powiadomień", subtitle: "SystemUI, Lockscreen, Demony" }
      ].map((sc) => {
        const scApps = apps.filter((a) => a.screenIndex === sc.idx);
        const isSecured = scApps.every((a) => a.conquestState === "CONQUERED_AND_CLEANSED");
        const activeCount = scApps.filter((a) => a.conquestState === "CONQUERED_AND_CLEANSED").length;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => mobileAreaConquestEngine.setActiveScreenView(sc.idx),
            className: `p-3 rounded-2xl border text-left transition-all cursor-pointer ${state.activeScreenView === sc.idx ? "bg-emerald-950/90 border-emerald-400 shadow-lg shadow-emerald-950" : "bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-400"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs text-white font-mono", children: sc.label }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 846,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `text-[10px] font-mono px-1.5 py-0.2 rounded ${isSecured ? "bg-emerald-900 text-emerald-200 border border-emerald-500" : "bg-slate-950 text-slate-400"}`, children: [
                  activeCount,
                  "/",
                  scApps.length
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 847,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 845,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: sc.subtitle }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 853,
                columnNumber: 19
              }, this)
            ]
          },
          sc.idx,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 836,
            columnNumber: 17
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 824,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-950 border-2 border-slate-800 shadow-inner space-y-4 relative overflow-hidden", children: [
        fullSalvoActive && /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 z-30 bg-rose-950/40 backdrop-blur-xs flex items-center justify-center pointer-events-none animate-in fade-in duration-150", children: /* @__PURE__ */ jsxDEV("div", { className: "text-center space-y-2 p-6 rounded-3xl bg-black/90 border-2 border-rose-500 shadow-[0_0_50px_#f43f5e] animate-bounce", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-4xl", children: "🐱⚡💥🗡️" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 866,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black font-mono text-rose-300 tracking-wider", children: "SALWA ZABIJ GNIDĘ: 8 DRONÓW-KOTKÓW W AKCJI!" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 867,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-emerald-400", children: "Spopielono 100% gnid w RAM i złączach we/wy (0 MS)!" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 870,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 865,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 864,
          columnNumber: 15
        }, this),
        activeDronesAnim.map((drone) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "absolute z-40 pointer-events-none flex flex-col items-center justify-center animate-in zoom-in-50 fade-in duration-300 transition-all",
            style: {
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: "pulse 0.6s infinite alternate"
            },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "relative", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "absolute -inset-6 rounded-full border-2 border-dashed border-amber-400/80 animate-spin" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 891,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "w-14 h-14 rounded-2xl bg-amber-950/90 border-2 border-amber-300 flex items-center justify-center shadow-[0_0_30px_#fbbf24] text-2xl", children: "🐱" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 892,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 left-3 w-1 h-16 bg-rose-500 shadow-[0_0_10px_#f43f5e] -rotate-12 transform origin-top" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 896,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-3 right-3 w-1 h-16 bg-rose-500 shadow-[0_0_10px_#f43f5e] rotate-12 transform origin-top" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 897,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 889,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "mt-2 px-2.5 py-0.5 rounded-full bg-black/90 border border-amber-400 text-amber-300 font-mono text-[10px] font-black shadow-lg", children: [
                "⚡ PRZENIKANIE BARIERY: ",
                drone.targetAppName
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 899,
                columnNumber: 17
              }, this)
            ]
          },
          drone.id,
          true,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 879,
            columnNumber: 15
          },
          this
        )),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300 flex items-center gap-1.5 font-bold", children: [
            /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 907,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Widok Ekranu ",
              state.activeScreenView,
              " Smartfona • Kafelki Aplikacji & Podgląd Połączeń na Żywo"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 908,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 906,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-cyan-300 font-mono", children: "Kliknij aplikację, aby otworzyć inspekcję połączeń I/O" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 910,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 905,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5", children: activeScreenApps.map((app) => {
          const isConquered = app.conquestState === "CONQUERED_AND_CLEANSED";
          const isBase = app.isBaseApp;
          const agg = getAggressionColor(app.aggressionScore || 0);
          const totalSub = app.connections?.length || 0;
          const cleansedSub = app.connections?.filter((c) => c.status === "CLEANSED").length || 0;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onDragOver: handleDragOverApp,
              onDrop: (e) => handleDropOnApp(app.id, e),
              onClick: (e) => handleAppCardClick(app, e),
              className: `p-3.5 rounded-2xl border-2 transition-all cursor-pointer select-none space-y-2.5 relative overflow-hidden group ${isBase ? "bg-gradient-to-br from-emerald-950/90 via-slate-900 to-slate-950 border-emerald-400 shadow-[0_0_15px_#10b981]" : isConquered ? "bg-slate-900/90 border-teal-500/70 shadow-md" : "bg-slate-950/80 hover:bg-slate-900 border-slate-800 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: `w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${isConquered ? "bg-emerald-950 border-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-slate-900 border-slate-700"}`, children: renderAppIcon(app.iconName, isBase) }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 941,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxDEV("h4", { className: "font-bold text-xs text-white font-mono truncate", children: app.appName }, void 0, false, {
                        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                        lineNumber: 947,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono block truncate", children: app.packageName }, void 0, false, {
                        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                        lineNumber: 948,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 946,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 940,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[9px] font-mono font-bold border ${isConquered ? "bg-emerald-950 text-emerald-300 border-emerald-400" : "bg-rose-950 text-rose-300 border-rose-500 animate-pulse"}`, children: isConquered ? "100% ZDOBYTA" : `${app.gnidaCount} GNID` }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 952,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 939,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-slate-950 border border-slate-800 text-[10px] font-mono space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Złącza / Kanały:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 964,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("strong", { className: isConquered ? "text-emerald-400" : "text-yellow-400", children: [
                      cleansedSub,
                      "/",
                      totalSub,
                      " oczyszczone"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 965,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 963,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "Przepustowość:" }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 971,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold truncate max-w-[130px]", children: app.liveThroughput || "32 MB/s" }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 972,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 970,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-0.5 pt-0.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[9px]", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Agresja Gnid:" }, void 0, false, {
                        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                        lineNumber: 978,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${agg.text}`, children: [
                        app.aggressionScore || 0,
                        "%"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                        lineNumber: 979,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 977,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "w-full h-1.5 rounded-full bg-slate-800 overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: `h-full ${agg.bar} transition-all`, style: { width: `${app.aggressionScore || 0}%` } }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 982,
                      columnNumber: 27
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 981,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 976,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 962,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-800/80", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Jednostka:" }, void 0, false, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 989,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 991,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: app.desantUnitType }, void 0, false, {
                      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                      lineNumber: 992,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                    lineNumber: 990,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 988,
                  columnNumber: 21
                }, this)
              ]
            },
            app.id,
            true,
            {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 925,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 915,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 860,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 821,
      columnNumber: 9
    }, this),
    activeTab === "connectors_report" && /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-950 border-2 border-slate-800 space-y-4 font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1009,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Oficjalny Raport Ilości Gnid na Złączach We/Wy Smartfona" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1010,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1008,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "8 kluczowych magistral komunikacyjnych systemu Android (Binder, Content Providers, Sockets, Ashmem)." }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1012,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1007,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400", children: "Łącznie Wykrytych Gnid:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1017,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-rose-400", children: [
            state.totalGnidasOnConnectors,
            " ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-emerald-400 font-normal", children: [
              "(",
              state.totalGnidasPurgedOnConnectors,
              " oczyszczonych)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1019,
              columnNumber: 49
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1018,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1016,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1006,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-xs text-left border-collapse", children: [
        /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { className: "border-b border-slate-800 text-slate-400 uppercase text-[10px]", children: [
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3", children: "Złącze / Magistrala I/O" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1028,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3", children: "Typ Złącza" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1029,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3", children: "Gnid Wykryto" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1030,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3", children: "Przepustowość" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1031,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3", children: "Stan Ochrony" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1032,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("th", { className: "py-2.5 px-3 text-right", children: "Akcja Oczyszczenia" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1033,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1027,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1026,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60", children: connectors.map((conn) => {
          const isClean = conn.securityStatus === "100% SECURE & PURGED";
          return /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-900/50 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white", children: conn.name }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1042,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: conn.threatDescription }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1043,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1041,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-cyan-300 text-[10px]", children: conn.connectorType }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1046,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1045,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3 font-bold text-rose-400", children: [
              conn.gnidasDetectedCount,
              " gnid"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1050,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3 text-slate-300", children: conn.throughputBandwidth }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1053,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3", children: /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold border ${isClean ? "bg-emerald-950 text-emerald-300 border-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-rose-950 text-rose-300 border-rose-500 animate-pulse"}`, children: conn.securityStatus }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1057,
              columnNumber: 25
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1056,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "py-3 px-3 text-right", children: !isClean ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCleanseConnector(conn.id),
                className: "px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-bold text-[10px] cursor-pointer active:scale-95 transition-all shadow",
                children: "Oczyść Złącze (Laser)"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1067,
                columnNumber: 27
              },
              this
            ) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 text-[11px] font-bold", children: "✓ 100% Oczyszczone" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1074,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1065,
              columnNumber: 23
            }, this)
          ] }, conn.id, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1040,
            columnNumber: 21
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1036,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1025,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1024,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 1005,
      columnNumber: 9
    }, this),
    activeTab === "script" && /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-950 border-2 border-slate-800 space-y-3 font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Code, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1092,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Natywny Skrypt Automatycznego Desantu Smartfona (`sentinel_mobile_area_conquest.py`)" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1093,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1091,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Gotowy do wykonania w środowisku mobilnym Android (Termux / ADB Shell / Python 3)." }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1095,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1090,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyScript,
              className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1 cursor-pointer",
              children: /* @__PURE__ */ jsxDEV("span", { children: copied ? "✓ Skopiowano!" : "Kopiuj Skrypt" }, void 0, false, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1104,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1100,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadScript,
              className: "px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black text-xs font-black flex items-center gap-1 cursor-pointer shadow",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 1110,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .PY" }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 1111,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1106,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1099,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1089,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-black border border-slate-800 text-xs text-emerald-300 max-h-80 overflow-y-auto font-mono leading-relaxed", children: /* @__PURE__ */ jsxDEV("pre", { children: mobileAreaConquestEngine.generateMobileConquestScript() }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1117,
        columnNumber: 13
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1116,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 1088,
      columnNumber: 9
    }, this),
    activeTab === "logs" && /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-slate-950 border-2 border-slate-800 space-y-3 font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1127,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Taktyczny Desantu Mobilnego" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1128,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1126,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400", children: [
          state.lastAssaultLog.length,
          " wpisów"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1130,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1125,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-2xl bg-black border border-slate-800 text-xs space-y-1.5 max-h-80 overflow-y-auto", children: state.lastAssaultLog.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("💥") || log.includes("🏆") ? "text-emerald-300 font-bold" : log.includes("⚡") ? "text-cyan-300" : "text-slate-300", children: log }, idx, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1135,
        columnNumber: 15
      }, this)) }, void 0, false, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1133,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 1124,
      columnNumber: 9
    }, this),
    inspectingApp && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "w-full max-w-2xl rounded-3xl bg-slate-950 border-2 border-cyan-500/60 shadow-2xl p-5 space-y-4 text-white font-mono animate-in fade-in zoom-in-95 duration-200", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-cyan-300", children: renderAppIcon(inspectingApp.iconName, inspectingApp.isBaseApp) }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1151,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-black text-white", children: inspectingApp.appName }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1155,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: [
              inspectingApp.packageName,
              " • Ekran ",
              inspectingApp.screenIndex
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1156,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1154,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setInspectingAppId(null),
            className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1164,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1160,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-2.5 text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Gnid w Aplikacji:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1171,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-rose-400 mt-0.5", children: inspectingApp.gnidaCount }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1172,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1170,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Przepustowość Live:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1176,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-cyan-300 mt-0.5", children: inspectingApp.liveThroughput }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1177,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1175,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900 border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Moc Garnizonu:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1181,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-black text-emerald-400 mt-0.5", children: [
            inspectingApp.laserGarrisonPower,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1182,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1180,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1169,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-slate-300 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Podgląd Połączeń I/O & Magistral Aplikacji:" }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1189,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: 'Kliknij "Oczyść", aby wypalić pojedyncze złącze' }, void 0, false, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1190,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1188,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 max-h-60 overflow-y-auto", children: inspectingApp.connections?.map((sub) => {
          const isClean = sub.status === "CLEANSED";
          return /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 text-xs", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { children: sub.name }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 1200,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-slate-950 text-cyan-300 border border-slate-700", children: sub.type }, void 0, false, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 1201,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1199,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-0.5", children: [
                "Przepustowość: ",
                sub.bandwidth,
                " • Agresja: ",
                /* @__PURE__ */ jsxDEV("strong", { className: isClean ? "text-emerald-400" : "text-rose-400", children: [
                  sub.aggressionPercent,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                  lineNumber: 1204,
                  columnNumber: 69
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1203,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1198,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 shrink-0", children: !isClean ? /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCleanseSubConnection(sub.id),
                className: "px-2.5 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-[10px] cursor-pointer shadow active:scale-95 transition-all",
                children: "Oczyść Złącze"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
                lineNumber: 1210,
                columnNumber: 27
              },
              this
            ) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 text-[10px] font-bold", children: "✓ 100% Czyste" }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1217,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
              lineNumber: 1208,
              columnNumber: 23
            }, this)
          ] }, sub.id, true, {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1197,
            columnNumber: 21
          }, this);
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1193,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1187,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Natychmiastowe zdobycie i neutralizacja:" }, void 0, false, {
          fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
          lineNumber: 1228,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              mobileAreaConquestEngine.deployDesantVectorToApp(inspectingApp.id, "LASER_TOWER_BEAM");
              setInspectingAppId(null);
              if (onNotify) onNotify(`⚡ Zneutralizowano aplikację ${inspectingApp.appName}!`);
            },
            className: "px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-black font-mono font-black text-xs cursor-pointer shadow active:scale-95 transition-all",
            children: "Wypal Wszystkie Złącza Aplikacji (0 MS)"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
            lineNumber: 1229,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
        lineNumber: 1227,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 1146,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
      lineNumber: 1145,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/MobileTacticalDesantArea.tsx",
    lineNumber: 347,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1vYmlsZVRhY3RpY2FsRGVzYW50QXJlYS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU21hcnRwaG9uZSwgU2hpZWxkQ2hlY2ssIFphcCwgU2t1bGwsIENyb3NzaGFpciwgQXJyb3dSaWdodCwgXG4gIExheWVycywgQ2hlY2tDaXJjbGUyLCBGbGFtZSwgUmVmcmVzaEN3LCBEb3dubG9hZCwgQ29kZSwgUGxheSxcbiAgQWxlcnRUcmlhbmdsZSwgUmFkaW8sIExvY2ssIEFjdGl2aXR5LCBFeWUsIFNoaWVsZEFsZXJ0LCBDcHUsIFxuICBUZXJtaW5hbCwgR2xvYmUsIE1lc3NhZ2VTcXVhcmUsIENyZWRpdENhcmQsIEltYWdlLCBTaG9wcGluZ0JhZyxcbiAgU2V0dGluZ3MsIEZvbGRlciwgQ2FtZXJhLCBLZXksIEdhbWVwYWQyLCBTaGFyZTIsIFBsYXlTcXVhcmUsXG4gIENsb3VkLCBNYXBQaW4sIENvaW5zLCBTbGlkZXJzLCBGaW5nZXJwcmludCwgTGF5b3V0R3JpZCwgU3BhcmtsZXMsXG4gIE1vdmUsIFRhcmdldCwgR2F1Z2UsIFgsIFZvbHVtZTIsIFZvbHVtZVgsIFN1biwgQ2xvdWRTdW4sIEFsZXJ0T2N0YWdvblxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgY29tYmF0QXVkaW8gfSBmcm9tICcuLi91dGlscy9jb21iYXRBdWRpb0VuZ2luZSc7XG5pbXBvcnQgeyBcbiAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLCBcbiAgSU5JVElBTF9DT05ORUNUT1JTX1JFUE9SVCwgXG4gIElOSVRJQUxfUEhPTkVfQVBQUyBcbn0gZnJvbSAnLi4vdXRpbHMvbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lJztcbmltcG9ydCB7IFBob25lUmVhclNjcmVlblNoaWVsZCB9IGZyb20gJy4vUGhvbmVSZWFyU2NyZWVuU2hpZWxkJztcbmltcG9ydCB7IENwdVRoZXJtYWxHb3Zlcm5vclBhbmVsIH0gZnJvbSAnLi9DcHVUaGVybWFsR292ZXJub3JQYW5lbCc7XG5pbXBvcnQgeyBcbiAgTW9iaWxlRGVzYW50U3RhZ2UsIFxuICBBcHBDb25uZWN0b3JSZXBvcnRJdGVtLCBcbiAgUGhvbmVTY3JlZW5BcHBOb2RlLCBcbiAgTW9iaWxlQXJlYUNvbnF1ZXN0U3RhdGUsXG4gIEFwcFN1YkNvbm5lY3Rpb25UZWxlbWV0cnkgXG59IGZyb20gJy4uL3R5cGVzJztcblxuaW50ZXJmYWNlIE1vYmlsZVRhY3RpY2FsRGVzYW50QXJlYVByb3BzIHtcbiAgb25Ob3RpZnk/OiAobXNnOiBzdHJpbmcpID0+IHZvaWQ7XG4gIGlzQ29tcGFjdD86IGJvb2xlYW47XG59XG5cbnR5cGUgRGVzYW50VW5pdFR5cGUgPSAnQkFTRV9DT01NQU5EX0NPUkUnIHwgJ0xBU0VSX1RPV0VSX0JFQU0nIHwgJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicgfCAnRU1QX1JFU09OQVRPUic7XG5cbmludGVyZmFjZSBGbHlpbmdLaXR0ZW5Ecm9uZUFuaW1hdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRhcmdldEFwcElkOiBzdHJpbmc7XG4gIHVuaXRUeXBlOiBEZXNhbnRVbml0VHlwZTtcbiAgc3RhcnRYOiBudW1iZXI7XG4gIHN0YXJ0WTogbnVtYmVyO1xuICB0YXJnZXRBcHBOYW1lOiBzdHJpbmc7XG59XG5cbi8vIEF1ZGlvIHN5bnRoZXNpemVyIGZvciBpbnN0YW50IGxhc2VyIHphcCBzb3VuZCBlZmZlY3RzICgwIG1zIGxhdGVuY3kpXG5jb25zdCBwbGF5S2lsbEduaWRhTGFzZXJBdWRpbyA9IChwaXRjaCA9IDg4MCwgdHlwZTogT3NjaWxsYXRvclR5cGUgPSAnc2F3dG9vdGgnKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgdW5rbm93biBhcyB7IHdlYmtpdEF1ZGlvQ29udGV4dDogdHlwZW9mIEF1ZGlvQ29udGV4dCB9KS53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgIGNvbnN0IG9zYyA9IGN0eC5jcmVhdGVPc2NpbGxhdG9yKCk7XG4gICAgY29uc3QgZ2FpbiA9IGN0eC5jcmVhdGVHYWluKCk7XG5cbiAgICBvc2MudHlwZSA9IHR5cGU7XG4gICAgb3NjLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShwaXRjaCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICBvc2MuZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMTEwLCBjdHguY3VycmVudFRpbWUgKyAwLjE4KTtcblxuICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjM1LCBjdHguY3VycmVudFRpbWUpO1xuICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBjdHguY3VycmVudFRpbWUgKyAwLjIpO1xuXG4gICAgb3NjLmNvbm5lY3QoZ2Fpbik7XG4gICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG5cbiAgICBvc2Muc3RhcnQoKTtcbiAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjIyKTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gQXVkaW9Db250ZXh0IGZhbGxiYWNrXG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCBNb2JpbGVUYWN0aWNhbERlc2FudEFyZWE6IFJlYWN0LkZDPE1vYmlsZVRhY3RpY2FsRGVzYW50QXJlYVByb3BzPiA9ICh7XG4gIG9uTm90aWZ5LFxuICBpc0NvbXBhY3QgPSBmYWxzZVxufSkgPT4ge1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHVzZVN0YXRlPE1vYmlsZUFyZWFDb25xdWVzdFN0YXRlPigoKSA9PiBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtjb25uZWN0b3JzLCBzZXRDb25uZWN0b3JzXSA9IHVzZVN0YXRlPEFwcENvbm5lY3RvclJlcG9ydEl0ZW1bXT4oKCkgPT4gbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmdldENvbm5lY3RvcnMoKSk7XG4gIGNvbnN0IFthcHBzLCBzZXRBcHBzXSA9IHVzZVN0YXRlPFBob25lU2NyZWVuQXBwTm9kZVtdPigoKSA9PiBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZ2V0QXBwcygpKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdzY3JlZW5fbWF0cml4JyB8ICdyZWFyX3NoaWVsZCcgfCAnY3B1X3RoZXJtYWwnIHwgJ2Nvbm5lY3RvcnNfcmVwb3J0JyB8ICdzY3JpcHQnIHwgJ2xvZ3MnPignc2NyZWVuX21hdHJpeCcpO1xuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIEFjdGl2ZSBmbHlpbmcga2l0dGVuIGRyb25lcyAvIGJyZWFjaCB0cmFuc2l0aW9uIGFuaW1hdGlvbnNcbiAgY29uc3QgW2FjdGl2ZURyb25lc0FuaW0sIHNldEFjdGl2ZURyb25lc0FuaW1dID0gdXNlU3RhdGU8Rmx5aW5nS2l0dGVuRHJvbmVBbmltYXRpb25bXT4oW10pO1xuICBjb25zdCBbZnVsbFNhbHZvQWN0aXZlLCBzZXRGdWxsU2Fsdm9BY3RpdmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gIC8vIFNlbGVjdGVkIEFwcCBmb3IgRGV0YWlsZWQgU3ViLUNvbm5lY3Rpb24gVGVsZW1ldHJ5IE1vZGFsXG4gIGNvbnN0IFtpbnNwZWN0aW5nQXBwSWQsIHNldEluc3BlY3RpbmdBcHBJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyBBcm1lZCBVbml0IGZvciBDbGljay10by1UYXJnZXQgQXR0YWNrIFZlY3RvciBNb2RlXG4gIGNvbnN0IFthcm1lZFVuaXRUeXBlLCBzZXRBcm1lZFVuaXRUeXBlXSA9IHVzZVN0YXRlPERlc2FudFVuaXRUeXBlIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gRy5SLk8uTS4gMjAtU2Vjb25kIFRhY3RpY2FsIEJhdHRsZSBEZXNhbnQgU3RhdGVcbiAgY29uc3QgW2lzR3JvbURlc2FudEFjdGl2ZSwgc2V0SXNHcm9tRGVzYW50QWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW2dyb21UaW1lUmVtYWluaW5nLCBzZXRHcm9tVGltZVJlbWFpbmluZ10gPSB1c2VTdGF0ZTxudW1iZXI+KDIwLjApO1xuICBjb25zdCBbaXNHcm9tVmljdG9yaW91c1NlcmVuZSwgc2V0SXNHcm9tVmljdG9yaW91c1NlcmVuZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtpc0NvbWJhdEF1ZGlvTXV0ZWQsIHNldElzQ29tYmF0QXVkaW9NdXRlZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YiA9IG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5zdWJzY3JpYmUoKG5ld1N0YXRlLCBuZXdDb25uZWN0b3JzLCBuZXdBcHBzKSA9PiB7XG4gICAgICBzZXRTdGF0ZShuZXdTdGF0ZSk7XG4gICAgICBzZXRDb25uZWN0b3JzKG5ld0Nvbm5lY3RvcnMpO1xuICAgICAgc2V0QXBwcyhuZXdBcHBzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGNvbnN0IHRyaWdnZXJLaXR0ZW5CcmVhY2hBbmltYXRpb24gPSAodGFyZ2V0QXBwSWQ6IHN0cmluZywgdW5pdFR5cGU6IERlc2FudFVuaXRUeXBlLCBhcHBOYW1lOiBzdHJpbmcsIGNsaWVudFg/OiBudW1iZXIsIGNsaWVudFk/OiBudW1iZXIpID0+IHtcbiAgICBjb25zdCBhbmltSWQgPSBgZHJvbmUtJHtEYXRlLm5vdygpfS0ke01hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA1KX1gO1xuICAgIGNvbnN0IG5ld0Ryb25lOiBGbHlpbmdLaXR0ZW5Ecm9uZUFuaW1hdGlvbiA9IHtcbiAgICAgIGlkOiBhbmltSWQsXG4gICAgICB0YXJnZXRBcHBJZCxcbiAgICAgIHVuaXRUeXBlLFxuICAgICAgc3RhcnRYOiBjbGllbnRYIHx8IHdpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICAgIHN0YXJ0WTogY2xpZW50WSB8fCAyMDAsXG4gICAgICB0YXJnZXRBcHBOYW1lOiBhcHBOYW1lXG4gICAgfTtcblxuICAgIHNldEFjdGl2ZURyb25lc0FuaW0ocHJldiA9PiBbLi4ucHJldiwgbmV3RHJvbmVdKTtcbiAgICBwbGF5S2lsbEduaWRhTGFzZXJBdWRpbyh1bml0VHlwZSA9PT0gJ0tJVFRFTl9EUk9ORV9HQVJSSVNPTicgPyAxMjAwIDogOTUwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0QWN0aXZlRHJvbmVzQW5pbShwcmV2ID0+IHByZXYuZmlsdGVyKGQgPT4gZC5pZCAhPT0gYW5pbUlkKSk7XG4gICAgfSwgMTEwMCk7XG4gIH07XG5cbiAgY29uc3QgaW5zcGVjdGluZ0FwcCA9IGFwcHMuZmluZChhID0+IGEuaWQgPT09IGluc3BlY3RpbmdBcHBJZCkgfHwgbnVsbDtcblxuICAvLyBLaWxsIEduaWRhIC0gUmFwaWQgU3F1YWRyb24gRXh0ZXJtaW5hdGlvblxuICBjb25zdCBoYW5kbGVLaWxsR25pZGFJbnN0YW50U2Fsdm8gPSAoKSA9PiB7XG4gICAgc2V0RnVsbFNhbHZvQWN0aXZlKHRydWUpO1xuICAgIHBsYXlLaWxsR25pZGFMYXNlckF1ZGlvKDE0MDAsICdzcXVhcmUnKTtcbiAgICBcbiAgICAvLyBDb25jdXJyZW50bHkgdHJpZ2dlciBpbnN0YW50IGNvbnF1ZXN0XG4gICAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmV4ZWN1dGVTdGFnZTFIb3N0QmFzZSgpO1xuICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5leGVjdXRlU3RhZ2UyQ2xlYW5zZUNvbm5lY3RvcnMoKTtcbiAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZXhlY3V0ZVN0YWdlM1NjcmVlbjFEZXNhbnQoKTtcbiAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZXhlY3V0ZVN0YWdlNE11bHRpU2NyZWVuRGVzYW50KCk7XG5cbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfimqHwn5eh77iPIFNBTFdBIFpBQklKIEdOSUTEmDogRHJvbnkta290a2kgaSB3aWXFvGEgbGFzZXJvd2Egc3BvcGllbGnFgnkgd3N6eXN0a2llIGduaWR5IHcgc3lzdGVtaWUgKDAgbXMpIScpO1xuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0RnVsbFNhbHZvQWN0aXZlKGZhbHNlKTtcbiAgICB9LCAxODAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVTdGFydEF1dG9Db25xdWVzdCA9ICgpID0+IHtcbiAgICBwbGF5S2lsbEduaWRhTGFzZXJBdWRpbyg4MDApO1xuICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5zdGFydEF1dG9tYXRlZENvbnF1ZXN0KCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeSgn8J+agCBST1pQT0NaxJhUTyBBVVRPTUFUWUNaTkUgWkFKTU9XQU5JRSBPQlNaQVJVOiBFdGFwIDEgLT4gMiAtPiAzIC0+IDQgdyB0b2t1IScpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVBZHZhbmNlU3RlcCA9ICgpID0+IHtcbiAgICBwbGF5S2lsbEduaWRhTGFzZXJBdWRpbyg5MDApO1xuICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5hZHZhbmNlTmV4dFN0ZXAoKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfinqHvuI8gV3lrb25hbm8ga29sZWpueSBldGFwIHRha3R5Y3puZWdvIGRlc2FudHUhJyk7XG4gICAgfVxuICB9O1xuXG4gIC8vIDIwLVNlY29uZCBEZXNhbnQgRy5SLk8uTS4gd2l0aCBSZWQgUHVsc2luZyBBbGVydCAmIEJhdHRsZSBBdWRpbywgY29uY2x1ZGluZyB3aXRoIHNlcmVuZSBjbGVhcmluZ1xuICBjb25zdCBoYW5kbGVTdGFydEdyb20yMHNEZXNhbnQgPSAoKSA9PiB7XG4gICAgc2V0SXNHcm9tVmljdG9yaW91c1NlcmVuZShmYWxzZSk7XG4gICAgc2V0SXNHcm9tRGVzYW50QWN0aXZlKHRydWUpO1xuICAgIHNldEdyb21UaW1lUmVtYWluaW5nKDIwLjApO1xuXG4gICAgLy8gU3RhcnQgYmFja2dyb3VuZCBiYXR0bGUgYXVkaW9cbiAgICBjb21iYXRBdWRpby5zdGFydENvbWJhdEF1ZGlvKCk7XG5cbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfwn5qoIFtHLlIuTy5NLl0gUk9aUE9DWsSYVE8gMjAtU0VLVU5ET1dZIERFU0FOVCBCT0pPV1khIENaRVJXT05ZIEFMQVJNIFBVTFNVSkUsIETFuVdJxJhLSSBXQUxLSSBXIFRPS1UhJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IDIwMDAwO1xuXG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCBlbGFwc2VkID0gRGF0ZS5ub3coKSAtIHN0YXJ0VGltZTtcbiAgICAgIGNvbnN0IHJlbWFpbmluZyA9IE1hdGgubWF4KDAsIChkdXJhdGlvbiAtIGVsYXBzZWQpIC8gMTAwMCk7XG4gICAgICBzZXRHcm9tVGltZVJlbWFpbmluZyhOdW1iZXIocmVtYWluaW5nLnRvRml4ZWQoMSkpKTtcblxuICAgICAgLy8gU3RlcCBwcm9ncmVzc2l2ZSB0YWN0aWNhbCBjb25xdWVzdHMgYWNyb3NzIDIwIHNlY29uZHNcbiAgICAgIGlmIChlbGFwc2VkID49IDUwMDAgJiYgZWxhcHNlZCA8IDYwMDApIHtcbiAgICAgICAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmV4ZWN1dGVTdGFnZTFIb3N0QmFzZSgpO1xuICAgICAgfSBlbHNlIGlmIChlbGFwc2VkID49IDEwMDAwICYmIGVsYXBzZWQgPCAxMTAwMCkge1xuICAgICAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZXhlY3V0ZVN0YWdlMkNsZWFuc2VDb25uZWN0b3JzKCk7XG4gICAgICB9IGVsc2UgaWYgKGVsYXBzZWQgPj0gMTUwMDAgJiYgZWxhcHNlZCA8IDE2MDAwKSB7XG4gICAgICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5leGVjdXRlU3RhZ2UzU2NyZWVuMURlc2FudCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZWxhcHNlZCA+PSBkdXJhdGlvbikge1xuICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcbiAgICAgICAgc2V0SXNHcm9tRGVzYW50QWN0aXZlKGZhbHNlKTtcbiAgICAgICAgc2V0R3JvbVRpbWVSZW1haW5pbmcoMCk7XG5cbiAgICAgICAgLy8gU3RhZ2UgNCBtdWx0aS1zY3JlZW4gZmluYWwgY29ucXVlc3RcbiAgICAgICAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmV4ZWN1dGVTdGFnZTRNdWx0aVNjcmVlbkRlc2FudCgpO1xuXG4gICAgICAgIC8vIFRyaWdnZXIgc2VyZW5lIHdlYXRoZXIgY2xlYXJpbmcgJiB2aWN0b3Jpb3VzIGNoaW1lIVxuICAgICAgICBzZXRJc0dyb21WaWN0b3Jpb3VzU2VyZW5lKHRydWUpO1xuICAgICAgICBjb21iYXRBdWRpby5wbGF5VmljdG9yeVN1bmJlYW1DaGltZSgpO1xuXG4gICAgICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgICAgIG9uTm90aWZ5KCfimIDvuI8gW0cuUi5PLk0uIFNVS0NFU10gREVTQU5UIDIwIFNFS1VORCBVS0/Fg0NaT05ZISBFS1JBTiBST1pKQcWaTklPTlksIFBPR09ETkUgTklFQk8sIE9CU1pBUiBXIDEwMCUgQkVaUElFQ1pOWSEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIDEwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlQ29tYmF0QXVkaW8gPSAoKSA9PiB7XG4gICAgY29uc3QgbmV4dE11dGVkID0gIWlzQ29tYmF0QXVkaW9NdXRlZDtcbiAgICBzZXRJc0NvbWJhdEF1ZGlvTXV0ZWQobmV4dE11dGVkKTtcbiAgICBjb21iYXRBdWRpby5zZXRNdXRlZChuZXh0TXV0ZWQpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUluc3RhbnRGdWxsQ29ucXVlc3QgPSAoKSA9PiB7XG4gICAgaGFuZGxlS2lsbEduaWRhSW5zdGFudFNhbHZvKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUmVzZXQgPSAoKSA9PiB7XG4gICAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLnJlc2V0VG9Jbml0aWFsU3RhdGUoKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfwn5SEIFpyZXNldG93YW5vIHBvbGlnb24gZGVzYW50dSBzbWFydGZvbmEgZG8gc3RhbnUgd3lqxZtjaW93ZWdvLicpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDbGVhbnNlQ29ubmVjdG9yID0gKGlkOiBzdHJpbmcpID0+IHtcbiAgICBwbGF5S2lsbEduaWRhTGFzZXJBdWRpbygxMTAwKTtcbiAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuY2xlYW5zZVNwZWNpZmljQ29ubmVjdG9yKGlkKTtcbiAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgIG9uTm90aWZ5KCfwn5eh77iPIFpuZXV0cmFsaXpvd2FubyBnbmlkeSBuYSB3eWJyYW55bSB6xYLEhWN6dSBrb211bmlrYWN5am55bSEnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weVNjcmlwdCA9ICgpID0+IHtcbiAgICBjb25zdCBzY3JpcHQgPSBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZ2VuZXJhdGVNb2JpbGVDb25xdWVzdFNjcmlwdCgpO1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHNjcmlwdCk7XG4gICAgc2V0Q29waWVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkKGZhbHNlKSwgMjUwMCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeSgn8J+TiyBTa29waW93YW5vIHNrcnlwdCBhdXRvbWF0eWN6bmVnbyBkZXNhbnR1IChBbmRyb2lkL1B5dGhvbikgZG8gc2Nob3drYSEnKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRTY3JpcHQgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2NyaXB0ID0gbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmdlbmVyYXRlTW9iaWxlQ29ucXVlc3RTY3JpcHQoKTtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3NjcmlwdF0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gJ3NlbnRpbmVsX21vYmlsZV9hcmVhX2NvbnF1ZXN0LnB5JztcbiAgICBhLmNsaWNrKCk7XG4gICAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xuICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgb25Ob3RpZnkoJ/Cfkr4gUG9icmFubyBwbGlrIHNlbnRpbmVsX21vYmlsZV9hcmVhX2NvbnF1ZXN0LnB5IScpO1xuICAgIH1cbiAgfTtcblxuICAvLyBEcmFnLWFuZC1Ecm9wIEhhbmRsZXJzXG4gIGNvbnN0IGhhbmRsZURyYWdTdGFydFVuaXQgPSAodW5pdFR5cGU6IERlc2FudFVuaXRUeXBlLCBlOiBSZWFjdC5EcmFnRXZlbnQpID0+IHtcbiAgICBlLmRhdGFUcmFuc2Zlci5zZXREYXRhKCd0ZXh0L3BsYWluJywgdW5pdFR5cGUpO1xuICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5zZXREcmFnZ2VkVW5pdFR5cGUodW5pdFR5cGUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURyYWdPdmVyQXBwID0gKGU6IFJlYWN0LkRyYWdFdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEcm9wT25BcHAgPSAoYXBwSWQ6IHN0cmluZywgZTogUmVhY3QuRHJhZ0V2ZW50KSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IHVuaXRUeXBlID0gZS5kYXRhVHJhbnNmZXIuZ2V0RGF0YSgndGV4dC9wbGFpbicpIGFzIERlc2FudFVuaXRUeXBlIHx8IHN0YXRlLmRyYWdnZWRVbml0VHlwZSB8fCAnTEFTRVJfVE9XRVJfQkVBTSc7XG4gICAgY29uc3QgdGFyZ2V0QXBwID0gYXBwcy5maW5kKGEgPT4gYS5pZCA9PT0gYXBwSWQpO1xuICAgIFxuICAgIC8vIFRyaWdnZXIgZmx5aW5nIGtpdHRlbiBkcm9uZSB0cmFuc2l0aW9uIGFuaW1hdGlvbiB3aXRoIGJhcnJpZXIgYnJlYWNoIHZpc3VhbFxuICAgIHRyaWdnZXJLaXR0ZW5CcmVhY2hBbmltYXRpb24oYXBwSWQsIHVuaXRUeXBlLCB0YXJnZXRBcHA/LmFwcE5hbWUgfHwgJ0FwbGlrYWNqYScsIGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgICBcbiAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZGVwbG95RGVzYW50VmVjdG9yVG9BcHAoYXBwSWQsIHVuaXRUeXBlKTtcbiAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuc2V0RHJhZ2dlZFVuaXRUeXBlKG51bGwpO1xuICAgIGlmIChvbk5vdGlmeSkge1xuICAgICAgb25Ob3RpZnkoYPCfm6nvuI8gUHJ6ZXByb3dhZHpvbm8gZGVzYW50IGplZG5vc3RrxIUgJHt1bml0VHlwZX0gbmEgYXBsaWthY2rEmSEgUHJ6ZW5pa25pxJl0byBiYXJpZXLEmSFgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gQ2xpY2sgb24gQXBwIENhcmQgKEVpdGhlciBEZXBsb3kgQXJtZWQgVW5pdCBPUiBPcGVuIFRlbGVtZXRyeSBNb2RhbClcbiAgY29uc3QgaGFuZGxlQXBwQ2FyZENsaWNrID0gKGFwcDogUGhvbmVTY3JlZW5BcHBOb2RlLCBlPzogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgIGlmIChhcm1lZFVuaXRUeXBlKSB7XG4gICAgICB0cmlnZ2VyS2l0dGVuQnJlYWNoQW5pbWF0aW9uKGFwcC5pZCwgYXJtZWRVbml0VHlwZSwgYXBwLmFwcE5hbWUsIGU/LmNsaWVudFgsIGU/LmNsaWVudFkpO1xuICAgICAgbW9iaWxlQXJlYUNvbnF1ZXN0RW5naW5lLmRlcGxveURlc2FudFZlY3RvclRvQXBwKGFwcC5pZCwgYXJtZWRVbml0VHlwZSk7XG4gICAgICBpZiAob25Ob3RpZnkpIHtcbiAgICAgICAgb25Ob3RpZnkoYPCfjq8gRGVzYW50IHRha3R5Y3pueSB1ZGVyennFgiB3ICR7YXBwLmFwcE5hbWV9ISBEcm9uLWtvdGVrIHNwb3BpZWxpxYIgZ25pZHkhYCk7XG4gICAgICB9XG4gICAgICBzZXRBcm1lZFVuaXRUeXBlKG51bGwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZXRJbnNwZWN0aW5nQXBwSWQoYXBwLmlkKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ2xlYW5zZVN1YkNvbm5lY3Rpb24gPSAoY29ubklkOiBzdHJpbmcpID0+IHtcbiAgICBpZiAoIWluc3BlY3RpbmdBcHBJZCkgcmV0dXJuO1xuICAgIG1vYmlsZUFyZWFDb25xdWVzdEVuZ2luZS5jbGVhbnNlU3ViQ29ubmVjdGlvbihpbnNwZWN0aW5nQXBwSWQsIGNvbm5JZCk7XG4gICAgaWYgKG9uTm90aWZ5KSB7XG4gICAgICBvbk5vdGlmeShg4pqhIFpkZXp5bmZla293YW5vIHd5YnJhbmUgcG9kLXrFgsSFY3plIGFwbGlrYWNqaSFgKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gSGVscGVyIGljb24gcmVuZGVyZXJcbiAgY29uc3QgcmVuZGVyQXBwSWNvbiA9IChpY29uTmFtZTogc3RyaW5nLCBpc0Jhc2U6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zdCBwcm9wcyA9IHsgY2xhc3NOYW1lOiBgdy01IGgtNSAke2lzQmFzZSA/ICd0ZXh0LWVtZXJhbGQtMzAwIGFuaW1hdGUtcHVsc2UnIDogJ3RleHQtY3lhbi0zMDAnfWAgfTtcbiAgICBzd2l0Y2ggKGljb25OYW1lKSB7XG4gICAgICBjYXNlICdTaGllbGRDaGVjayc6IHJldHVybiA8U2hpZWxkQ2hlY2sgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ0dsb2JlJzogcmV0dXJuIDxHbG9iZSB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnTWVzc2FnZVNxdWFyZSc6IHJldHVybiA8TWVzc2FnZVNxdWFyZSB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnQ3JlZGl0Q2FyZCc6IHJldHVybiA8Q3JlZGl0Q2FyZCB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnSW1hZ2UnOiByZXR1cm4gPEltYWdlIHsuLi5wcm9wc30gLz47XG4gICAgICBjYXNlICdTaG9wcGluZ0JhZyc6IHJldHVybiA8U2hvcHBpbmdCYWcgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ1NldHRpbmdzJzogcmV0dXJuIDxTZXR0aW5ncyB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnRm9sZGVyJzogcmV0dXJuIDxGb2xkZXIgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ1Rlcm1pbmFsJzogcmV0dXJuIDxUZXJtaW5hbCB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnQ2FtZXJhJzogcmV0dXJuIDxDYW1lcmEgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ0xvY2snOiByZXR1cm4gPExvY2sgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ0tleSc6IHJldHVybiA8S2V5IHsuLi5wcm9wc30gLz47XG4gICAgICBjYXNlICdHYW1lcGFkMic6IHJldHVybiA8R2FtZXBhZDIgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ1NoYXJlMic6IHJldHVybiA8U2hhcmUyIHsuLi5wcm9wc30gLz47XG4gICAgICBjYXNlICdQbGF5U3F1YXJlJzogcmV0dXJuIDxQbGF5U3F1YXJlIHsuLi5wcm9wc30gLz47XG4gICAgICBjYXNlICdDbG91ZCc6IHJldHVybiA8Q2xvdWQgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ01hcFBpbic6IHJldHVybiA8TWFwUGluIHsuLi5wcm9wc30gLz47XG4gICAgICBjYXNlICdDb2lucyc6IHJldHVybiA8Q29pbnMgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ1NsaWRlcnMnOiByZXR1cm4gPFNsaWRlcnMgey4uLnByb3BzfSAvPjtcbiAgICAgIGNhc2UgJ0ZpbmdlcnByaW50JzogcmV0dXJuIDxGaW5nZXJwcmludCB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnTGF5b3V0R3JpZCc6IHJldHVybiA8TGF5b3V0R3JpZCB7Li4ucHJvcHN9IC8+O1xuICAgICAgY2FzZSAnQ3B1JzogcmV0dXJuIDxDcHUgey4uLnByb3BzfSAvPjtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiA8U21hcnRwaG9uZSB7Li4ucHJvcHN9IC8+O1xuICAgIH1cbiAgfTtcblxuICAvLyBBZ2dyZXNzaW9uIGNvbG9yXG4gIGNvbnN0IGdldEFnZ3Jlc3Npb25Db2xvciA9IChzY29yZTogbnVtYmVyKSA9PiB7XG4gICAgaWYgKHNjb3JlID09PSAwKSByZXR1cm4geyB0ZXh0OiAndGV4dC1lbWVyYWxkLTQwMCcsIGJnOiAnYmctZW1lcmFsZC05NTAnLCBib3JkZXI6ICdib3JkZXItZW1lcmFsZC01MDAnLCBiYXI6ICdiZy1lbWVyYWxkLTUwMCcgfTtcbiAgICBpZiAoc2NvcmUgPCA1MCkgcmV0dXJuIHsgdGV4dDogJ3RleHQteWVsbG93LTQwMCcsIGJnOiAnYmcteWVsbG93LTk1MCcsIGJvcmRlcjogJ2JvcmRlci15ZWxsb3ctNTAwJywgYmFyOiAnYmcteWVsbG93LTUwMCcgfTtcbiAgICBpZiAoc2NvcmUgPCA4MCkgcmV0dXJuIHsgdGV4dDogJ3RleHQtb3JhbmdlLTQwMCcsIGJnOiAnYmctb3JhbmdlLTk1MCcsIGJvcmRlcjogJ2JvcmRlci1vcmFuZ2UtNTAwJywgYmFyOiAnYmctb3JhbmdlLTUwMCcgfTtcbiAgICByZXR1cm4geyB0ZXh0OiAndGV4dC1yb3NlLTUwMCcsIGJnOiAnYmctcm9zZS05NTAnLCBib3JkZXI6ICdib3JkZXItcm9zZS01MDAnLCBiYXI6ICdiZy1yb3NlLTUwMCcgfTtcbiAgfTtcblxuICBjb25zdCBhY3RpdmVTY3JlZW5BcHBzID0gYXBwcy5maWx0ZXIoYSA9PiBhLnNjcmVlbkluZGV4ID09PSBzdGF0ZS5hY3RpdmVTY3JlZW5WaWV3KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtgdy1mdWxsIHJvdW5kZWQtM3hsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTcwMCBwLTQgc206cC02IHRleHQtd2hpdGUgc3BhY2UteS02ICR7XG4gICAgICBpc0dyb21EZXNhbnRBY3RpdmVcbiAgICAgICAgPyAnYmctc2xhdGUtOTUwIHJpbmctOCByaW5nLXJlZC02MDAvODAgc2hhZG93LVtpbnNldF8wXzBfMTIwcHhfcmdiYSgyMzksNjgsNjgsMC43NSksMF8wXzYwcHhfcmdiYSgyMjAsMzgsMzgsMC42KV0gYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgOiBpc0dyb21WaWN0b3Jpb3VzU2VyZW5lXG4gICAgICAgICAgPyAnYmctZ3JhZGllbnQtdG8tYiBmcm9tLVsjMTAxYjJiXSB2aWEtWyMwYzE1MjJdIHRvLVsjMDgwZDE0XSBib3JkZXItMiBib3JkZXItYW1iZXItMzAwIHNoYWRvdy1bMF8wXzcwcHhfcmdiYSgyNTQsMjQwLDEzOCwwLjM1KV0gZmlsdGVyIGJyaWdodG5lc3MtMTEwJ1xuICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC85NSBiYWNrZHJvcC1ibHVyLW1kIGJvcmRlci0yIGJvcmRlci1lbWVyYWxkLTUwMC81MCBzaGFkb3ctMnhsJ1xuICAgIH1gfT5cbiAgICAgIFxuICAgICAgey8qIPCfmqggUFVMU0lORyBSRUQgQ09NQkFUIExJR0hUICYgQkFUVExFIENMT0NLIChEVVJJTkcgMjBzIEcuUi5PLk0uIERFU0FOVCkgKi99XG4gICAgICB7aXNHcm9tRGVzYW50QWN0aXZlICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAgdmlhLXJvc2UtOTAwIHRvLXJlZC05NTAgYm9yZGVyLTIgYm9yZGVyLXJlZC01MDAgc2hhZG93LVswXzBfNDBweF9yZ2JhKDIzOSw2OCw2OCwwLjg1KV0gYW5pbWF0ZS1wdWxzZSBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMCBoLTEwIHJvdW5kZWQteGwgYmctcmVkLTYwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBhbmltYXRlLWJvdW5jZSBzaGFkb3ctbGcgc2hhZG93LWJsYWNrIHNocmluay0wXCI+XG4gICAgICAgICAgICAgIDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXNtIHRyYWNraW5nLXdpZGVzdCB0ZXh0LXJlZC0xMDAgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICDwn5qoIENaRVJXT05ZIEFMQVJNIEJPSk9XWTogVFJXQSBERVNBTlQgRy5SLk8uTS5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1ibGFjay84MCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LXllbGxvdy0zMDAgZm9udC1ibGFjayBib3JkZXIgYm9yZGVyLXllbGxvdy01MDAvNjAgc2hhZG93XCI+XG4gICAgICAgICAgICAgICAgICBQT1pPU1RBxYFPOiB7Z3JvbVRpbWVSZW1haW5pbmcudG9GaXhlZCgxKX1zXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXJlZC0yMDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIETFundpxJlraSB3YWxraSB3IHRsZSBha3R5d25lIOKAoiBacnp1dCBkZXNhbnRvd3kgaSB3eXBhbGFuaWUgZ25pZCBsYXNlcmVtIDk0MC44IFRIeiBuYSA0IGV0YXBhY2hcbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBzbTp3LTU2IGJnLWJsYWNrLzgwIHJvdW5kZWQtZnVsbCBoLTMuNSBib3JkZXIgYm9yZGVyLXJlZC00MDAgb3ZlcmZsb3ctaGlkZGVuIHNocmluay0wXCI+XG4gICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTQwMCB2aWEtcm9zZS00MDAgdG8tcmVkLTUwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0xMDBcIlxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7KCgyMCAtIGdyb21UaW1lUmVtYWluaW5nKSAvIDIwKSAqIDEwMH0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7Lyog4piA77iPIFBPR09ETkUgTklFQk8gSSBST1pKQcWaTklPTlkgRUtSQU4gUE8gMjAgU0VLVU5EQUNIIERFU0FOVFUgKi99XG4gICAgICB7aXNHcm9tVmljdG9yaW91c1NlcmVuZSAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci01MDAvMjUgdmlhLXNreS01MDAvMjAgdG8tZW1lcmFsZC01MDAvMjUgYm9yZGVyLTIgYm9yZGVyLWFtYmVyLTMwMC84MCBzaGFkb3ctWzBfMF81MHB4X3JnYmEoMjU0LDI0MCwxMzgsMC41KV0gZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHRleHQtd2hpdGUgYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNDAwIHRvLXllbGxvdy01MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1hbWJlci01MDAvNDAgc2hyaW5rLTBcIj5cbiAgICAgICAgICAgICAgPFN1biBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtYmxhY2sgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXNtIHRyYWNraW5nLXdpZGVzdCB0ZXh0LWFtYmVyLTIwMCB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICAgIOKYgO+4jyBQT0dPRE5FIE5JRUJPICYgQ0HFgUtPV0lUWSBTUE9Lw5NKOiBERVNBTlQgRy5SLk8uTS4gWkFLT8WDQ1pPTlkgU1VLQ0VTRU1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC05NTAgZm9udC1tb25vIHRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDBcIj5cbiAgICAgICAgICAgICAgICAgIDEwMCUgQkVaUElFQ1pFxYNTVFdBXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LWFtYmVyLTEwMC85MCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgUG8gMjAgc2VrdW5kYWNoIHdhbGtpIG9ic3phciBzbWFydGZvbmEgem9zdGHFgiB3IDEwMCUgb2RiaXR5LiBDenlzdGUgbmllYm8sIGVrcmFuIHJvemphxZtuaW9ueSwgYnJhayB6YWdyb8W8ZcWEIHcgcGFtacSZY2kuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0dyb21WaWN0b3Jpb3VzU2VyZW5lKGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWxnIGJnLWJsYWNrLzYwIGhvdmVyOmJnLWJsYWNrLzkwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCBjdXJzb3ItcG9pbnRlciBzaHJpbmstMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgWmFta25paiBwb3dpYWRvbWllbmllXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRvcCBCYW5uZXIgJiBUZWxlbWV0cnkgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbGc6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbGc6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMuNVwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy0xMyBoLTEzIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLWJyIGZyb20tZW1lcmFsZC05MDAgdmlhLXRlYWwtOTUwIHRvLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTUwMC8zMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy03IGgtNyB0ZXh0LWVtZXJhbGQtMzAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+TW9iaWxueSBEZXNhbnQgU21hcnRmb25hIC8vIEcuUi5PLk0uPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ibGFjayBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICBzdGF0ZS5pc0NvbXBsZXRlZCBcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtOTUwIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwIHNoYWRvdy1bMF8wXzEycHhfIzEwYjk4MV0nXG4gICAgICAgICAgICAgICAgICA6ICdiZy1jeWFuLTk1MCBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAge3N0YXRlLmlzQ29tcGxldGVkID8gJ/CfkZEgMTAwJSBTTUFSVEZPTkEgWkRPQllURScgOiBgRVRBUDogJHtzdGF0ZS5jdXJyZW50U3RhZ2V9YH1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGZvbnQtbW9ubyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgQXV0b21hdHljem5lIHphasSZY2llIGFwbGlrYWNqaSBiYXp5LCBvY3p5c3pjemVuaWUgesWCxIVjenkgSVBDL1NvY2tldHMgeiBnbmlkLCByYXBvcnQgesWCxIVjenkgb3JheiBkZXNhbnQgZHJhZy1hbmQtZHJvcCBuYSBla3Jhbnkgc21hcnRmb25hLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogR2xvYmFsIEFjdGlvbiBCdXR0b25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjUgZmxleC13cmFwIHctZnVsbCBsZzp3LWF1dG8ganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7Lyog4q2QIFBST01JTkVOVCBISUdITElHSFRFRCBHLlIuTy5NLiAyMC1TRUNPTkQgREVTQU5UIEJVVFRPTiDirZAgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU3RhcnRHcm9tMjBzRGVzYW50fVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2lzR3JvbURlc2FudEFjdGl2ZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHB4LTUgcHktMyByb3VuZGVkLTJ4bCBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXhzIHNtOnRleHQtc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIuNSBzaGFkb3ctMnhsIGJvcmRlci0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGlzR3JvbURlc2FudEFjdGl2ZVxuICAgICAgICAgICAgICAgID8gJ2JnLXJlZC03MDAgdGV4dC13aGl0ZSBib3JkZXItcmVkLTMwMCBzaGFkb3ctWzBfMF8zMHB4XyNlZjQ0NDRdIGFuaW1hdGUtcHVsc2UgY3Vyc29yLXdhaXQnXG4gICAgICAgICAgICAgICAgOiAndGl0YW5pdW0tc3RlZWwtc3VyZmFjZSB0ZXh0LXllbGxvdy0zMDAgYm9yZGVyLWFtYmVyLTQwMCBob3Zlcjpib3JkZXIteWVsbG93LTIwMCBzaGFkb3ctYW1iZXItOTUwLzgwIGhvdmVyOnNjYWxlLTEwMydcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgdGl0bGU9XCJBS1JPTklNOiBHLlIuTy5NLiAoR3J1cGEgUmVhZ293YW5pYSBPcGVyYWN5am5vLU1hbmV3cm93ZWdvKS4gQ3phcyB0cndhbmlhOiBkb2vFgmFkbmllIDIwIHNla3VuZCB6IGTFundpxJlrYW1pIHdhbGtpIHcgdGxlIGkgcHVsc3VqxIVjeW0gY3plcndvbnltIMWbd2lhdMWCZW0hXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xIGxlZnQtMSBtaWxzcGVjLXJpdmV0XCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEgcmlnaHQtMSBtaWxzcGVjLXJpdmV0XCIgLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEgbGVmdC0xIG1pbHNwZWMtcml2ZXRcIiAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMSByaWdodC0xIG1pbHNwZWMtcml2ZXRcIiAvPlxuXG4gICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPXtgdy00IGgtNCAke2lzR3JvbURlc2FudEFjdGl2ZSA/ICd0ZXh0LXdoaXRlIGFuaW1hdGUtc3BpbicgOiAndGV4dC1hbWJlci00MDAgZmlsbC1hbWJlci00MDAgYW5pbWF0ZS1ib3VuY2UnfWB9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRyYWNraW5nLXdpZGVyIHRleHQteHMgc206dGV4dC1zbVwiPlxuICAgICAgICAgICAgICAgIHtpc0dyb21EZXNhbnRBY3RpdmUgPyBg4pqhIFdBTEtBIEcuUi5PLk0uICgke2dyb21UaW1lUmVtYWluaW5nLnRvRml4ZWQoMSl9cylgIDogJ+KaoSBERVNBTlQgRy5SLk8uTS4gKDIwIFNFS1VORCknfVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzhweF0gZm9udC1zYW5zIHRleHQtc2xhdGUtMzAwIG9wYWNpdHktOTBcIj5cbiAgICAgICAgICAgICAgICB7aXNHcm9tRGVzYW50QWN0aXZlID8gJ0NaRVJXT05ZIEFMQVJNIOKAoiBPR05JRSBXQUxLSScgOiAnQUtST05JTTogR1JVUEEgUkVBR09XQU5JQSBPUEVSQUNZSk5PLU1BTkVXUk9XRUdPJ31cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogQXVkaW8gTXV0ZS9Vbm11dGUgVG9nZ2xlICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRvZ2dsZUNvbWJhdEF1ZGlvfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yLjUgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgaXNDb21iYXRBdWRpb011dGVkID8gJ2JnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtNTAwJyA6ICdiZy1yZWQtOTUwLzgwIGJvcmRlci1yZWQtNTAwIHRleHQtcmVkLTMwMCBzaGFkb3ctbWQgc2hhZG93LXJlZC05NTAvNjAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPXtpc0NvbWJhdEF1ZGlvTXV0ZWQgPyAnV8WCxIVjeiBkxbp3acSZa2kgd2Fsa2kgdyB0bGUnIDogJ1d5Y2lzeiBkxbp3acSZa2kgd2Fsa2kgdyB0bGUnfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0NvbWJhdEF1ZGlvTXV0ZWQgPyA8Vm9sdW1lWCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz4gOiA8Vm9sdW1lMiBjbGFzc05hbWU9XCJ3LTQgaC00IGFuaW1hdGUtcHVsc2VcIiAvPn1cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBVTFRJTUFURSBLSUxMIEdOSURBIEJVVFRPTiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVLaWxsR25pZGFJbnN0YW50U2Fsdm99XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yb3NlLTYwMCB2aWEtcGluay02MDAgdG8tYW1iZXItNTAwIGhvdmVyOmZyb20tcm9zZS01MDAgaG92ZXI6dG8tYW1iZXItNDAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYmxhY2sgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctMnhsIHNoYWRvdy1yb3NlLTk1MCBib3JkZXItMiBib3JkZXItcm9zZS00MDAgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgdGl0bGU9XCJXeXBhbCBuYXR5Y2htaWFzdCB3c3p5c3RraWUgZ25pZHkgbmEgd3N6eXN0a2ljaCBla3JhbmFjaCBpIHrFgsSFY3phY2ggKDAgbXMpIVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItMjAwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICA8c3Bhbj7wn5eh77iPIFpBQklKIEdOSUTEmCAoMCBNUyk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdGFydEF1dG9Db25xdWVzdH1cbiAgICAgICAgICAgIGRpc2FibGVkPXtzdGF0ZS5pc0F1dG9FeGVjdXRpbmcgfHwgaXNHcm9tRGVzYW50QWN0aXZlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleC0xIGxnOmZsZXgtbm9uZSBweC00IHB5LTIuNSByb3VuZGVkLXhsIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LXhsIGJvcmRlciBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgc3RhdGUuaXNBdXRvRXhlY3V0aW5nIFxuICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwIGN1cnNvci1ub3QtYWxsb3dlZCdcbiAgICAgICAgICAgICAgICA6ICdiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC01MDAgdmlhLXRlYWwtNTAwIHRvLWN5YW4tNTAwIGhvdmVyOmZyb20tZW1lcmFsZC00MDAgaG92ZXI6dG8tY3lhbi00MDAgdGV4dC1ibGFjayBib3JkZXItd2hpdGUgc2hhZG93LWVtZXJhbGQtOTUwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIlVydWNob20gdyBwZcWCbmkgYXV0b21hdHljem5lIDQtZXRhcG93ZSB6YWrEmWNpZSBvYnN6YXJ1XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC1ibGFja1wiIC8+XG4gICAgICAgICAgICA8c3Bhbj57c3RhdGUuaXNBdXRvRXhlY3V0aW5nID8gJ0RFU0FOVCBXIFRPS1UuLi4nIDogJ0FVVE9NQVRZQ1pOWSBERVNBTlQnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUFkdmFuY2VTdGVwfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e3N0YXRlLmlzQXV0b0V4ZWN1dGluZyB8fCBpc0dyb21EZXNhbnRBY3RpdmV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgdGl0bGU9XCJXeWtvbmFqIHBvamVkeW5jenkga3JvayB0YWt0eWN6bnlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+S3JvayBEZXNhbnR1PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzZXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlJlc2V0dWogc3RhbiBkZXNhbnR1XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogNC1TdGFnZSBUYWN0aWNhbCBQcm9ncmVzcyBQaXBlbGluZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtMi41IHAtMy41IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICBcbiAgICAgICAgey8qIFN0YWdlIDEgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgc3RhdGUuY3VycmVudFN0YWdlID09PSAnU1RBR0VfMV9IT1NUX0FQUCcgfHwgc3RhdGUub3ZlcmFsbFByb2dyZXNzID49IDI1XG4gICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC84MCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LVswXzBfMTJweF8jMTBiOTgxXSdcbiAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwJ1xuICAgICAgICB9YH0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTUgaC01IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTUwMC8zMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIHRleHQtZW1lcmFsZC0zMDAgdGV4dC1bMTBweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZm9udC1ibGFja1wiPjE8L3NwYW4+XG4gICAgICAgICAgICAgIEFwbGlrYWNqYSBNYWNpZXJ6eXN0YVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAge3N0YXRlLm92ZXJhbGxQcm9ncmVzcyA+PSAyNSAmJiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgIFByemVqxJljaWUgcHJvY2VzdSBiYXp5LCBidWZvcmEgQVJUIGkgb2RjacSZY2llIHfEhXRrw7N3IG9kIHrFgm/Fm2xpd3ljaCBuYWvFgmFkZWsuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3RhZ2UgMiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICBzdGF0ZS5jdXJyZW50U3RhZ2UgPT09ICdTVEFHRV8yX0NPTk5FQ1RPUlMnIHx8IHN0YXRlLm92ZXJhbGxQcm9ncmVzcyA+PSA1MFxuICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvODAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1bMF8wXzEycHhfIzA2YjZkNF0nXG4gICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgfWB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctY3lhbi01MDAvMzAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwIHRleHQtWzEwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYmxhY2tcIj4yPC9zcGFuPlxuICAgICAgICAgICAgICBPY3p5c3pjemVuaWUgWsWCxIVjenkgKFJhcG9ydClcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIHtzdGF0ZS5vdmVyYWxsUHJvZ3Jlc3MgPj0gNTAgJiYgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICBQcnplxZt3aWV0bGVuaWUgOCB3ZWrFm8SHL3d5asWbxIcgKEJpbmRlciwgU29ja2V0cywgQXNobWVtKSAmIFJhcG9ydCBpbG/Fm2NpIGduaWQuXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogU3RhZ2UgMyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICBzdGF0ZS5jdXJyZW50U3RhZ2UgPT09ICdTVEFHRV8zX1NDUkVFTl9ERVNBTlQnIHx8IHN0YXRlLm92ZXJhbGxQcm9ncmVzcyA+PSA3NVxuICAgICAgICAgICAgPyAnYmctdGVhbC05NTAvODAgYm9yZGVyLXRlYWwtNDAwIHNoYWRvdy1bMF8wXzEycHhfIzE0YjhhNl0nXG4gICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgfWB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctdGVhbC01MDAvMzAgYm9yZGVyIGJvcmRlci10ZWFsLTQwMCB0ZXh0LXRlYWwtMzAwIHRleHQtWzEwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYmxhY2tcIj4zPC9zcGFuPlxuICAgICAgICAgICAgICBEZXNhbnQgbmEgRWtyYW4gMVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAge3N0YXRlLm92ZXJhbGxQcm9ncmVzcyA+PSA3NSAmJiA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC10ZWFsLTQwMFwiIC8+fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtMzAwIG10LTFcIj5cbiAgICAgICAgICAgIFd5c3RyemVsZW5pZSBwcm9taWVuaSBuYSBzxIVzaWVkbmllIGthZmVsa2kgYXBsaWthY2ppIChaZG9ieWNpZSAxMDAlIEVrcmFudSAxKS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBTdGFnZSA0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIGJvcmRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgIHN0YXRlLmN1cnJlbnRTdGFnZSA9PT0gJ1NUQUdFXzRfTVVMVElfU0NSRUVOJyB8fCBzdGF0ZS5pc0NvbXBsZXRlZFxuICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvOTAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1bMF8wXzE0cHhfIzEwYjk4MV0nXG4gICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAvNjAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTUwMCdcbiAgICAgICAgfWB9PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC01MDAvMzAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMCB0ZXh0LWVtZXJhbGQtMzAwIHRleHQtWzEwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGZvbnQtYmxhY2tcIj40PC9zcGFuPlxuICAgICAgICAgICAgICBEZXNhbnQgbmEgS29sZWpuZSBFa3JhbnlcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIHtzdGF0ZS5pc0NvbXBsZXRlZCAmJiA8TG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPn1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+XG4gICAgICAgICAgICBPcGFub3dhbmllIEVrcmFudSBOYXJ6xJlkemkgKDIpLCBUxYJhICgzKSBvcmF6IFBhc2thIFBvd2lhZG9taWXFhCBpIFN5c3RlbVVJICg0KS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBORVc6IElOVEVSQUNUSVZFIFRBQ1RJQ0FMIEFSU0VOQUwgUEFORUwgKERSQUctQU5ELURST1AgREVTQU5UIFZFQ1RPUlMpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXNsYXRlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNTAgc2hhZG93LXhsIHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBmbGV4LXdyYXAgZ2FwLTJcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8VGFyZ2V0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMCBhbmltYXRlLXNwaW5cIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LWN5YW4tMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICBJbnRlcmFrdHl3bnkgUGFuZWwgS29udHJvbGkgVGFrdHljem5laiDigKIgV2VrdG9yeSBBdGFrdSBHbmlkIChEcmFnLWFuZC1Ecm9wKVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAg8J+Wse+4jyA8c3Ryb25nPlByemVjacSFZ25paiBqZWRub3N0a8SZPC9zdHJvbmc+IG5hIGthZmVsIGFwbGlrYWNqaSBsdWIgPHN0cm9uZz5rbGlrbmlqPC9zdHJvbmc+LCBhYnkgd3ljZWxvd2HEh1xuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIERyYWdnYWJsZSBBcnNlbmFsIFRva2VucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy00IGdhcC0yLjUgcHQtMSB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBVbml0IDE6IExBU0VSIFRPV0VSIEJFQU0gKi99XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IGhhbmRsZURyYWdTdGFydFVuaXQoJ0xBU0VSX1RPV0VSX0JFQU0nLCBlKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFybWVkVW5pdFR5cGUoYXJtZWRVbml0VHlwZSA9PT0gJ0xBU0VSX1RPV0VSX0JFQU0nID8gbnVsbCA6ICdMQVNFUl9UT1dFUl9CRUFNJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgY3Vyc29yLWdyYWIgYWN0aXZlOmN1cnNvci1ncmFiYmluZyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBhcm1lZFVuaXRUeXBlID09PSAnTEFTRVJfVE9XRVJfQkVBTSdcbiAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTk1MCBib3JkZXItY3lhbi00MDAgcmluZy0yIHJpbmctY3lhbi00MDAgc2hhZG93LVswXzBfMTVweF8jMDZiNmQ0XSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvOTAgaG92ZXI6Ymctc2xhdGUtODUwIGJvcmRlci1jeWFuLTUwMC80MCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWxnIGJnLWN5YW4tOTUwIGJvcmRlciBib3JkZXItY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jeWFuLTMwMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgZmlsbC1jeWFuLTMwMFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC1jeWFuLTMwMCB0ZXh0LVsxMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlByb21pZcWEIFdpZcW8eSBMYXNlcm93ZWo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPE1vdmUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5XeXBhbGEgZ25pZHkgdyBSQU0gKDAgbXMpPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBVbml0IDI6IEtJVFRFTiBEUk9ORSBHQVJSSVNPTiAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4gaGFuZGxlRHJhZ1N0YXJ0VW5pdCgnS0lUVEVOX0RST05FX0dBUlJJU09OJywgZSl9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBcm1lZFVuaXRUeXBlKGFybWVkVW5pdFR5cGUgPT09ICdLSVRURU5fRFJPTkVfR0FSUklTT04nID8gbnVsbCA6ICdLSVRURU5fRFJPTkVfR0FSUklTT04nKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFybWVkVW5pdFR5cGUgPT09ICdLSVRURU5fRFJPTkVfR0FSUklTT04nXG4gICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwIGJvcmRlci1hbWJlci00MDAgcmluZy0yIHJpbmctYW1iZXItNDAwIHNoYWRvdy1bMF8wXzE1cHhfI2Y1OWUwYl0nXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzkwIGhvdmVyOmJnLXNsYXRlLTg1MCBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtc2xhdGUtMjAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTggaC04IHJvdW5kZWQtbGcgYmctYW1iZXItOTUwIGJvcmRlciBib3JkZXItYW1iZXItNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtYW1iZXItMzAwIHNocmluay0wIHRleHQtc21cIj5cbiAgICAgICAgICAgICAg8J+QsVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJsYWNrIHRleHQtYW1iZXItMzAwIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+RHJvbiBCb2pvd3kgS29jaWFrPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxNb3ZlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwXCI+R2Fybml6b24gb2Jyb25ueSBrYWZlbGthPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBVbml0IDM6IEVNUCBSRVNPTkFUT1IgKi99XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgZHJhZ2dhYmxlXG4gICAgICAgICAgICBvbkRyYWdTdGFydD17KGUpID0+IGhhbmRsZURyYWdTdGFydFVuaXQoJ0VNUF9SRVNPTkFUT1InLCBlKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFybWVkVW5pdFR5cGUoYXJtZWRVbml0VHlwZSA9PT0gJ0VNUF9SRVNPTkFUT1InID8gbnVsbCA6ICdFTVBfUkVTT05BVE9SJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgY3Vyc29yLWdyYWIgYWN0aXZlOmN1cnNvci1ncmFiYmluZyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBhcm1lZFVuaXRUeXBlID09PSAnRU1QX1JFU09OQVRPUidcbiAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTk1MCBib3JkZXItcm9zZS00MDAgcmluZy0yIHJpbmctcm9zZS00MDAgc2hhZG93LVswXzBfMTVweF8jZjQzZjVlXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvOTAgaG92ZXI6Ymctc2xhdGUtODUwIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWxnIGJnLXJvc2UtOTUwIGJvcmRlciBib3JkZXItcm9zZS00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1yb3NlLTMwMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy00IGgtNCBmaWxsLXJvc2UtMzAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXJvc2UtMzAwIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+UmV6b25hdG9yIEltcHVsc8OzdyBFTVA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPE1vdmUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5TbWHFvHkgZ25pYXpkYSBDMiAmIEFkd2FyZTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVW5pdCA0OiBCQVNFIENPTU1BTkQgQ09SRSAqL31cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBkcmFnZ2FibGVcbiAgICAgICAgICAgIG9uRHJhZ1N0YXJ0PXsoZSkgPT4gaGFuZGxlRHJhZ1N0YXJ0VW5pdCgnQkFTRV9DT01NQU5EX0NPUkUnLCBlKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFybWVkVW5pdFR5cGUoYXJtZWRVbml0VHlwZSA9PT0gJ0JBU0VfQ09NTUFORF9DT1JFJyA/IG51bGwgOiAnQkFTRV9DT01NQU5EX0NPUkUnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMyByb3VuZGVkLXhsIGJvcmRlciBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBjdXJzb3ItZ3JhYiBhY3RpdmU6Y3Vyc29yLWdyYWJiaW5nIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFybWVkVW5pdFR5cGUgPT09ICdCQVNFX0NPTU1BTkRfQ09SRSdcbiAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MCBib3JkZXItZW1lcmFsZC00MDAgcmluZy0yIHJpbmctZW1lcmFsZC00MDAgc2hhZG93LVswXzBfMTVweF8jMTBiOTgxXSdcbiAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvOTAgaG92ZXI6Ymctc2xhdGUtODUwIGJvcmRlci1lbWVyYWxkLTUwMC80MCB0ZXh0LXNsYXRlLTIwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkLWxnIGJnLWVtZXJhbGQtOTUwIGJvcmRlciBib3JkZXItZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1lbWVyYWxkLTMwMCBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCBmaWxsLWVtZXJhbGQtMzAwIHRleHQtYmxhY2tcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi13LTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJsYWNrIHRleHQtZW1lcmFsZC0zMDAgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5SZHplxYQgQmF6eSBEb3dvZHplbmlhPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxNb3ZlIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHRleHQtc2xhdGUtNDAwXCI+VHJ3YcWCYSBmb3J0eWZpa2FjamEgb2JzemFydTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHthcm1lZFVuaXRUeXBlICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLWN5YW4tOTUwIGJvcmRlciBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTIwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi0zMDAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgPHN0cm9uZz5UUllCIENFTE9XTklLQSBBS1RZV05ZOjwvc3Ryb25nPiBLbGlrbmlqIGRvd29sbsSFIGFwbGlrYWNqxJkgcG9uacW8ZWosIGFieSBuYXR5Y2htaWFzdCB6cnp1Y2nEhyBqZWRub3N0a8SZIDxlbT57YXJtZWRVbml0VHlwZX08L2VtPiFcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QXJtZWRVbml0VHlwZShudWxsKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIHRleHQtWzEwcHhdXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQW51bHVqIGNlbG93bmlrXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTmF2aWdhdGlvbiBTdWJ0YWJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0yIHRleHQteHMgZm9udC1tb25vIGZsZXgtd3JhcCBnYXAteS0yXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3NjcmVlbl9tYXRyaXgnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3NjcmVlbl9tYXRyaXgnXG4gICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MCdcbiAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgfWB9XG4gICAgICAgID5cbiAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICA8c3Bhbj5NYXRyeWNhIEVrcmFuw7N3ICh7YXBwcy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigncmVhcl9zaGllbGQnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3JlYXJfc2hpZWxkJ1xuICAgICAgICAgICAgICA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi02MDAgdG8tcm9zZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LXJvc2UtOTUwLzYwJ1xuICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCB0ZXh0LWN5YW4tMzAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC8zMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgIDxzcGFuPlRhcmN6YSBUecWCdSBFa3JhbnUgKDAgbXMgxZptaWVyxIcpPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEuNSBweS0wLjIgcm91bmRlZC1mdWxsIGJnLXJvc2UtNTAwIHRleHQtWzlweF0gdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICA5NDAgVEh6XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdjcHVfdGhlcm1hbCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXhsIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnY3B1X3RoZXJtYWwnXG4gICAgICAgICAgICAgID8gJ2JnLWluZGlnby02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWluZGlnby05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIHRleHQtaW5kaWdvLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC8zMCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgIDxzcGFuPktvbnRyb2xhIFRlbXAgQ1BVICYgS3Jpb2dlbmlrYTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignY29ubmVjdG9yc19yZXBvcnQnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgcmVsYXRpdmUgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2Nvbm5lY3RvcnNfcmVwb3J0J1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPlJhcG9ydCBaxYLEhWN6eSAoe2Nvbm5lY3RvcnMubGVuZ3RofSk8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuMiByb3VuZGVkLWZ1bGwgYmctcm9zZS01MDAvODAgdGV4dC1bOXB4XSB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJvbGQgYW5pbWF0ZS1wdWxzZVwiPlxuICAgICAgICAgICAge3N0YXRlLnRvdGFsR25pZGFzT25Db25uZWN0b3JzfSBHTklEXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdzY3JpcHQnKX1cbiAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC14bCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3NjcmlwdCdcbiAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwJ1xuICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICB9YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxDb2RlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPlNrcnlwdCBQeXRob24vQURCPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdsb2dzJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdsb2dzJ1xuICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgIH1gfVxuICAgICAgICA+XG4gICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgIDxzcGFuPkR6aWVubmlrIERlc2FudHUgKHtzdGF0ZS5sYXN0QXNzYXVsdExvZy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFNVQlRBQjogUkVBUiBTQ1JFRU4gU0hJRUxEICYgREVBVEggT04gQ09OVEFDVCAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdyZWFyX3NoaWVsZCcgJiYgKFxuICAgICAgICA8UGhvbmVSZWFyU2NyZWVuU2hpZWxkIG9uTm90aWZ5PXtvbk5vdGlmeX0gLz5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBTVUJUQUI6IENQVSBUSEVSTUFMIEdPVkVSTk9SICYgQ1JZTyBDT09MSU5HICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2NwdV90aGVybWFsJyAmJiAoXG4gICAgICAgIDxDcHVUaGVybWFsR292ZXJub3JQYW5lbCBvbk5vdGlmeT17b25Ob3RpZnl9IC8+XG4gICAgICApfVxuXG4gICAgICB7LyogU1VCVEFCIDE6IFNDUkVFTiBNQVRSSVggJiBBUFBTIExJVkUgREVTQU5UIERJU1BMQVkgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAnc2NyZWVuX21hdHJpeCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBTY3JlZW4gU3dpdGNoZXIgVGFicyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICAgIHtbXG4gICAgICAgICAgICAgIHsgaWR4OiAxLCBsYWJlbDogJ0VrcmFuIDE6IEfFgsOzd255IFB1bHBpdCcsIHN1YnRpdGxlOiAnUHJ6ZWdsxIVkYXJrYSwgQmFuaywgU01TJyB9LFxuICAgICAgICAgICAgICB7IGlkeDogMiwgbGFiZWw6ICdFa3JhbiAyOiBOYXJ6xJlkemlhICYgU3lzdGVtJywgc3VidGl0bGU6ICdVc3Rhd2llbmlhLCBUZXJtdXgsIFZQTicgfSxcbiAgICAgICAgICAgICAgeyBpZHg6IDMsIGxhYmVsOiAnRWtyYW4gMzogR3J5ICYgQXBsaWthY2plIHcgVGxlJywgc3VidGl0bGU6ICdBZHdhcmUsIENobXVyYSwgUG9ydGZlbCcgfSxcbiAgICAgICAgICAgICAgeyBpZHg6IDQsIGxhYmVsOiAnRWtyYW4gNDogUGFzZWsgUG93aWFkb21pZcWEJywgc3VidGl0bGU6ICdTeXN0ZW1VSSwgTG9ja3NjcmVlbiwgRGVtb255JyB9XG4gICAgICAgICAgICBdLm1hcChzYyA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHNjQXBwcyA9IGFwcHMuZmlsdGVyKGEgPT4gYS5zY3JlZW5JbmRleCA9PT0gc2MuaWR4KTtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWN1cmVkID0gc2NBcHBzLmV2ZXJ5KGEgPT4gYS5jb25xdWVzdFN0YXRlID09PSAnQ09OUVVFUkVEX0FORF9DTEVBTlNFRCcpO1xuICAgICAgICAgICAgICBjb25zdCBhY3RpdmVDb3VudCA9IHNjQXBwcy5maWx0ZXIoYSA9PiBhLmNvbnF1ZXN0U3RhdGUgPT09ICdDT05RVUVSRURfQU5EX0NMRUFOU0VEJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzYy5pZHh9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuc2V0QWN0aXZlU2NyZWVuVmlldyhzYy5pZHgpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciB0ZXh0LWxlZnQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuYWN0aXZlU2NyZWVuVmlldyA9PT0gc2MuaWR4XG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAvOTAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1sZyBzaGFkb3ctZW1lcmFsZC05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgdGV4dC13aGl0ZSBmb250LW1vbm9cIj57c2MubGFiZWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuMiByb3VuZGVkICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNTZWN1cmVkID8gJ2JnLWVtZXJhbGQtOTAwIHRleHQtZW1lcmFsZC0yMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCcgOiAnYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZUNvdW50fS97c2NBcHBzLmxlbmd0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPntzYy5zdWJ0aXRsZX08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFBob25lIFNjcmVlbiBHcmlkIChJbnRlcmFjdGl2ZSBEcm9wcGFibGUgQXBwIENhcmRzKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3ctaW5uZXIgc3BhY2UteS00IHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgXG4gICAgICAgICAgICB7LyogRlVMTCBTQUxWTyAvIEtJTEwgR05JREEgRlVMTCBTQ1JFRU4gU0hPQ0tXQVZFIE9WRVJMQVkgKi99XG4gICAgICAgICAgICB7ZnVsbFNhbHZvQWN0aXZlICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHotMzAgYmctcm9zZS05NTAvNDAgYmFja2Ryb3AtYmx1ci14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwb2ludGVyLWV2ZW50cy1ub25lIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0xNTBcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHNwYWNlLXktMiBwLTYgcm91bmRlZC0zeGwgYmctYmxhY2svOTAgYm9yZGVyLTIgYm9yZGVyLXJvc2UtNTAwIHNoYWRvdy1bMF8wXzUwcHhfI2Y0M2Y1ZV0gYW5pbWF0ZS1ib3VuY2VcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC00eGxcIj7wn5Cx4pqh8J+SpfCfl6HvuI88L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXJvc2UtMzAwIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIFNBTFdBIFpBQklKIEdOSUTEmDogOCBEUk9Ow5NXLUtPVEvDk1cgVyBBS0NKSSFcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIFNwb3BpZWxvbm8gMTAwJSBnbmlkIHcgUkFNIGkgesWCxIVjemFjaCB3ZS93eSAoMCBNUykhXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogRkxZSU5HIEtJVFRFTiBEUk9ORSBUUkFOU0lUSU9OIFBBUlRJQ0xFUyAoQkFSUklFUiBQRU5FVFJBVElPTikgKi99XG4gICAgICAgICAgICB7YWN0aXZlRHJvbmVzQW5pbS5tYXAoZHJvbmUgPT4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtkcm9uZS5pZH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSB6LTQwIHBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgYW5pbWF0ZS1pbiB6b29tLWluLTUwIGZhZGUtaW4gZHVyYXRpb24tMzAwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgdG9wOiAnNDAlJyxcbiAgICAgICAgICAgICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKC01MCUsIC01MCUpJyxcbiAgICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogJ3B1bHNlIDAuNnMgaW5maW5pdGUgYWx0ZXJuYXRlJ1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgICAgICB7LyogSGV4YWdvbmFsIEJhcnJpZXIgRnJhY3R1cmUgU2hvY2t3YXZlICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtaW5zZXQtNiByb3VuZGVkLWZ1bGwgYm9yZGVyLTIgYm9yZGVyLWRhc2hlZCBib3JkZXItYW1iZXItNDAwLzgwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTQgaC0xNCByb3VuZGVkLTJ4bCBiZy1hbWJlci05NTAvOTAgYm9yZGVyLTIgYm9yZGVyLWFtYmVyLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctWzBfMF8zMHB4XyNmYmJmMjRdIHRleHQtMnhsXCI+XG4gICAgICAgICAgICAgICAgICAgIPCfkLFcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgey8qIER1YWwgTGFzZXIgRXllcyBCZWFtcyAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTMgbGVmdC0zIHctMSBoLTE2IGJnLXJvc2UtNTAwIHNoYWRvdy1bMF8wXzEwcHhfI2Y0M2Y1ZV0gLXJvdGF0ZS0xMiB0cmFuc2Zvcm0gb3JpZ2luLXRvcFwiIC8+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0zIHJpZ2h0LTMgdy0xIGgtMTYgYmctcm9zZS01MDAgc2hhZG93LVswXzBfMTBweF8jZjQzZjVlXSByb3RhdGUtMTIgdHJhbnNmb3JtIG9yaWdpbi10b3BcIiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm10LTIgcHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctYmxhY2svOTAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAgdGV4dC1hbWJlci0zMDAgZm9udC1tb25vIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgc2hhZG93LWxnXCI+XG4gICAgICAgICAgICAgICAgICDimqEgUFJaRU5JS0FOSUUgQkFSSUVSWToge2Ryb25lLnRhcmdldEFwcE5hbWV9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIGZvbnQtbW9ubyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPldpZG9rIEVrcmFudSB7c3RhdGUuYWN0aXZlU2NyZWVuVmlld30gU21hcnRmb25hIOKAoiBLYWZlbGtpIEFwbGlrYWNqaSAmIFBvZGdsxIVkIFBvxYLEhWN6ZcWEIG5hIMW7eXdvPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtY3lhbi0zMDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgS2xpa25paiBhcGxpa2FjasSZLCBhYnkgb3R3b3J6ecSHIGluc3Bla2NqxJkgcG/FgsSFY3plxYQgSS9PXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTMgZ2FwLTMuNVwiPlxuICAgICAgICAgICAgICB7YWN0aXZlU2NyZWVuQXBwcy5tYXAoYXBwID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc0NvbnF1ZXJlZCA9IGFwcC5jb25xdWVzdFN0YXRlID09PSAnQ09OUVVFUkVEX0FORF9DTEVBTlNFRCc7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNCYXNlID0gYXBwLmlzQmFzZUFwcDtcbiAgICAgICAgICAgICAgICBjb25zdCBhZ2cgPSBnZXRBZ2dyZXNzaW9uQ29sb3IoYXBwLmFnZ3Jlc3Npb25TY29yZSB8fCAwKTtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsU3ViID0gYXBwLmNvbm5lY3Rpb25zPy5sZW5ndGggfHwgMDtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGVhbnNlZFN1YiA9IGFwcC5jb25uZWN0aW9ucz8uZmlsdGVyKGMgPT4gYy5zdGF0dXMgPT09ICdDTEVBTlNFRCcpLmxlbmd0aCB8fCAwO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAga2V5PXthcHAuaWR9XG4gICAgICAgICAgICAgICAgICAgIG9uRHJhZ092ZXI9e2hhbmRsZURyYWdPdmVyQXBwfVxuICAgICAgICAgICAgICAgICAgICBvbkRyb3A9eyhlKSA9PiBoYW5kbGVEcm9wT25BcHAoYXBwLmlkLCBlKX1cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGUpID0+IGhhbmRsZUFwcENhcmRDbGljayhhcHAsIGUpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMuNSByb3VuZGVkLTJ4bCBib3JkZXItMiB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZSBzcGFjZS15LTIuNSByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gZ3JvdXAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc0Jhc2VcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20tZW1lcmFsZC05NTAvOTAgdmlhLXNsYXRlLTkwMCB0by1zbGF0ZS05NTAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1bMF8wXzE1cHhfIzEwYjk4MV0nXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGlzQ29ucXVlcmVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLXRlYWwtNTAwLzcwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC84MCBob3ZlcjpiZy1zbGF0ZS05MDAgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgey8qIFRvcCBBcHAgSGVhZGVyICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2B3LTkgaC05IHJvdW5kZWQteGwgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNocmluay0wICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29ucXVlcmVkID8gJ2JnLWVtZXJhbGQtOTUwIGJvcmRlci1lbWVyYWxkLTQwMCBzaGFkb3ctWzBfMF84cHhfIzEwYjk4MV0nIDogJ2JnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVyQXBwSWNvbihhcHAuaWNvbk5hbWUsIGlzQmFzZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgdGV4dC13aGl0ZSBmb250LW1vbm8gdHJ1bmNhdGVcIj57YXBwLmFwcE5hbWV9PC9oND5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIGJsb2NrIHRydW5jYXRlXCI+e2FwcC5wYWNrYWdlTmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bOXB4XSBmb250LW1vbm8gZm9udC1ib2xkIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgaXNDb25xdWVyZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXJvc2UtOTUwIHRleHQtcm9zZS0zMDAgYm9yZGVyLXJvc2UtNTAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge2lzQ29ucXVlcmVkID8gJzEwMCUgWkRPQllUQScgOiBgJHthcHAuZ25pZGFDb3VudH0gR05JRGB9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogTElWRSBOVU1FUklDQUwgVEVMRU1FVFJZIE9GIENMRUFOU0VEIENPTk5FQ1RJT05TICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlrFgsSFY3phIC8gS2FuYcWCeTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT17aXNDb25xdWVyZWQgPyAndGV4dC1lbWVyYWxkLTQwMCcgOiAndGV4dC15ZWxsb3ctNDAwJ30+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjbGVhbnNlZFN1Yn0ve3RvdGFsU3VifSBvY3p5c3pjem9uZVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UHJ6ZXB1c3Rvd2/Fm8SHOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkIHRydW5jYXRlIG1heC13LVsxMzBweF1cIj57YXBwLmxpdmVUaHJvdWdocHV0IHx8ICczMiBNQi9zJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICB7LyogQWdncmVzc2lvbiBtZXRlciAqL31cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMC41IHB0LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bOXB4XVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkFncmVzamEgR25pZDo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCAke2FnZy50ZXh0fWB9PnthcHAuYWdncmVzc2lvblNjb3JlIHx8IDB9JTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXNsYXRlLTgwMCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BoLWZ1bGwgJHthZ2cuYmFyfSB0cmFuc2l0aW9uLWFsbGB9IHN0eWxlPXt7IHdpZHRoOiBgJHthcHAuYWdncmVzc2lvblNjb3JlIHx8IDB9JWAgfX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogR2Fycmlzb24gJiBEZXNhbnQgVmVjdG9yIFRhZyAqL31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vIHB0LTEgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+SmVkbm9zdGthOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57YXBwLmRlc2FudFVuaXRUeXBlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogU1VCVEFCIDI6IENPTk5FQ1RPUlMgUFVSSUZJQ0FUSU9OIFJFUE9SVCAmIEdOSURBIENPVU5UUyAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdjb25uZWN0b3JzX3JlcG9ydCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTQgZm9udC1tb25vXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPk9maWNqYWxueSBSYXBvcnQgSWxvxZtjaSBHbmlkIG5hIFrFgsSFY3phY2ggV2UvV3kgU21hcnRmb25hPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIDgga2x1Y3pvd3ljaCBtYWdpc3RyYWwga29tdW5pa2FjeWpueWNoIHN5c3RlbXUgQW5kcm9pZCAoQmluZGVyLCBDb250ZW50IFByb3ZpZGVycywgU29ja2V0cywgQXNobWVtKS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+xYHEhWN6bmllIFd5a3J5dHljaCBHbmlkOjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtcm9zZS00MDBcIj5cbiAgICAgICAgICAgICAgICB7c3RhdGUudG90YWxHbmlkYXNPbkNvbm5lY3RvcnN9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1lbWVyYWxkLTQwMCBmb250LW5vcm1hbFwiPih7c3RhdGUudG90YWxHbmlkYXNQdXJnZWRPbkNvbm5lY3RvcnN9IG9jenlzemN6b255Y2gpPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG9cIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC14cyB0ZXh0LWxlZnQgYm9yZGVyLWNvbGxhcHNlXCI+XG4gICAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwiYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtM1wiPlrFgsSFY3plIC8gTWFnaXN0cmFsYSBJL088L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zXCI+VHlwIFrFgsSFY3phPC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtM1wiPkduaWQgV3lrcnl0bzwvdGg+XG4gICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicHktMi41IHB4LTNcIj5QcnplcHVzdG93b8WbxIc8L3RoPlxuICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInB5LTIuNSBweC0zXCI+U3RhbiBPY2hyb255PC90aD5cbiAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJweS0yLjUgcHgtMyB0ZXh0LXJpZ2h0XCI+QWtjamEgT2N6eXN6Y3plbmlhPC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICA8dGJvZHkgY2xhc3NOYW1lPVwiZGl2aWRlLXkgZGl2aWRlLXNsYXRlLTgwMC82MFwiPlxuICAgICAgICAgICAgICAgIHtjb25uZWN0b3JzLm1hcChjb25uID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzQ2xlYW4gPSBjb25uLnNlY3VyaXR5U3RhdHVzID09PSAnMTAwJSBTRUNVUkUgJiBQVVJHRUQnO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17Y29ubi5pZH0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtOTAwLzUwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZVwiPntjb25uLm5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+e2Nvbm4udGhyZWF0RGVzY3JpcHRpb259PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LWN5YW4tMzAwIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25uLmNvbm5lY3RvclR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zIGZvbnQtYm9sZCB0ZXh0LXJvc2UtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29ubi5nbmlkYXNEZXRlY3RlZENvdW50fSBnbmlkXG4gICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicHktMyBweC0zIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29ubi50aHJvdWdocHV0QmFuZHdpZHRofVxuICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInB5LTMgcHgtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ2xlYW4gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LVswXzBfOHB4XyMxMGI5ODFdJyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlci1yb3NlLTUwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Y29ubi5zZWN1cml0eVN0YXR1c31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJweS0zIHB4LTMgdGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyFpc0NsZWFuID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xlYW5zZUNvbm5lY3Rvcihjb25uLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LWJsYWNrIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XSBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgc2hhZG93XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9jennFm8SHIFrFgsSFY3plIChMYXNlcilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIHRleHQtWzExcHhdIGZvbnQtYm9sZFwiPuKckyAxMDAlIE9jenlzemN6b25lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFNVQlRBQiAzOiBQWVRIT04vQURCIEFORFJPSUQgU0NSSVBUICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3NjcmlwdCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBwYi0zXCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxDb2RlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+TmF0eXdueSBTa3J5cHQgQXV0b21hdHljem5lZ28gRGVzYW50dSBTbWFydGZvbmEgKGBzZW50aW5lbF9tb2JpbGVfYXJlYV9jb25xdWVzdC5weWApPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIEdvdG93eSBkbyB3eWtvbmFuaWEgdyDFm3JvZG93aXNrdSBtb2JpbG55bSBBbmRyb2lkIChUZXJtdXggLyBBREIgU2hlbGwgLyBQeXRob24gMykuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weVNjcmlwdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZCA/ICfinJMgU2tvcGlvd2FubyEnIDogJ0tvcGl1aiBTa3J5cHQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFNjcmlwdH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLWVtZXJhbGQtNjAwIGhvdmVyOmJnLWVtZXJhbGQtNTAwIHRleHQtYmxhY2sgdGV4dC14cyBmb250LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIHNoYWRvd1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogLlBZPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC0yeGwgYmctYmxhY2sgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyB0ZXh0LWVtZXJhbGQtMzAwIG1heC1oLTgwIG92ZXJmbG93LXktYXV0byBmb250LW1vbm8gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICA8cHJlPnttb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZ2VuZXJhdGVNb2JpbGVDb25xdWVzdFNjcmlwdCgpfTwvcHJlPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBTVUJUQUIgNDogQ09NQkFUICYgQVNTQVVMVCBMT0dTICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2xvZ3MnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0zIGZvbnQtbW9ub1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIFRha3R5Y3pueSBEZXNhbnR1IE1vYmlsbmVnbzwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+e3N0YXRlLmxhc3RBc3NhdWx0TG9nLmxlbmd0aH0gd3Bpc8Ozdzwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQtMnhsIGJnLWJsYWNrIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHMgc3BhY2UteS0xLjUgbWF4LWgtODAgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICB7c3RhdGUubGFzdEFzc2F1bHRMb2cubWFwKChsb2csIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9e2xvZy5pbmNsdWRlcygn8J+SpScpIHx8IGxvZy5pbmNsdWRlcygn8J+PhicpID8gJ3RleHQtZW1lcmFsZC0zMDAgZm9udC1ib2xkJyA6IGxvZy5pbmNsdWRlcygn4pqhJykgPyAndGV4dC1jeWFuLTMwMCcgOiAndGV4dC1zbGF0ZS0zMDAnfT5cbiAgICAgICAgICAgICAgICB7bG9nfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBERVRBSUxFRCBTVUItQ09OTkVDVElPTiBURUxFTUVUUlkgTU9EQUwgRk9SIFNFTEVDVEVEIEFQUCAqL31cbiAgICAgIHtpbnNwZWN0aW5nQXBwICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgYmctYmxhY2svODAgYmFja2Ryb3AtYmx1ci1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy0yeGwgcm91bmRlZC0zeGwgYmctc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC82MCBzaGFkb3ctMnhsIHAtNSBzcGFjZS15LTQgdGV4dC13aGl0ZSBmb250LW1vbm8gYW5pbWF0ZS1pbiBmYWRlLWluIHpvb20taW4tOTUgZHVyYXRpb24tMjAwXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBNb2RhbCBIZWFkZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTAgaC0xMCByb3VuZGVkLXhsIGJnLWN5YW4tOTUwIGJvcmRlciBib3JkZXItY3lhbi00MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgICAge3JlbmRlckFwcEljb24oaW5zcGVjdGluZ0FwcC5pY29uTmFtZSwgaW5zcGVjdGluZ0FwcC5pc0Jhc2VBcHApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJsYWNrIHRleHQtd2hpdGVcIj57aW5zcGVjdGluZ0FwcC5hcHBOYW1lfTwvaDM+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPntpbnNwZWN0aW5nQXBwLnBhY2thZ2VOYW1lfSDigKIgRWtyYW4ge2luc3BlY3RpbmdBcHAuc2NyZWVuSW5kZXh9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SW5zcGVjdGluZ0FwcElkKG51bGwpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1ldHJpY3MgT3ZlcnZpZXcgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTIuNSB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPkduaWQgdyBBcGxpa2Fjamk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC1yb3NlLTQwMCBtdC0wLjVcIj57aW5zcGVjdGluZ0FwcC5nbmlkYUNvdW50fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QcnplcHVzdG93b8WbxIcgTGl2ZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LWN5YW4tMzAwIG10LTAuNVwiPntpbnNwZWN0aW5nQXBwLmxpdmVUaHJvdWdocHV0fTwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5Nb2MgR2Fybml6b251Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+e2luc3BlY3RpbmdBcHAubGFzZXJHYXJyaXNvblBvd2VyfSU8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFN1Yi1jb25uZWN0aW9ucyBMaXN0ICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2RnbMSFZCBQb8WCxIVjemXFhCBJL08gJiBNYWdpc3RyYWwgQXBsaWthY2ppOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPktsaWtuaWogXCJPY3p5xZvEh1wiLCBhYnkgd3lwYWxpxIcgcG9qZWR5bmN6ZSB6xYLEhWN6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIgbWF4LWgtNjAgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICAgICAge2luc3BlY3RpbmdBcHAuY29ubmVjdGlvbnM/Lm1hcChzdWIgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNDbGVhbiA9IHN1Yi5zdGF0dXMgPT09ICdDTEVBTlNFRCc7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17c3ViLmlkfSBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLXctMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntzdWIubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzlweF0gcHgtMS41IHB5LTAuMiByb3VuZGVkIGJnLXNsYXRlLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwXCI+e3N1Yi50eXBlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgUHJ6ZXB1c3Rvd2/Fm8SHOiB7c3ViLmJhbmR3aWR0aH0g4oCiIEFncmVzamE6IDxzdHJvbmcgY2xhc3NOYW1lPXtpc0NsZWFuID8gJ3RleHQtZW1lcmFsZC00MDAnIDogJ3RleHQtcm9zZS00MDAnfT57c3ViLmFnZ3Jlc3Npb25QZXJjZW50fSU8L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaHJpbmstMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyFpc0NsZWFuID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ2xlYW5zZVN1YkNvbm5lY3Rpb24oc3ViLmlkKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1lbWVyYWxkLTUwMCB0by10ZWFsLTUwMCBob3Zlcjpmcm9tLWVtZXJhbGQtNDAwIGhvdmVyOnRvLXRlYWwtNDAwIHRleHQtYmxhY2sgZm9udC1ib2xkIHRleHQtWzEwcHhdIGN1cnNvci1wb2ludGVyIHNoYWRvdyBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2N6ecWbxIcgWsWCxIVjemVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPuKckyAxMDAlIEN6eXN0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFF1aWNrIFN0cmlrZSBCdXR0b24gZnJvbSBNb2RhbCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPk5hdHljaG1pYXN0b3dlIHpkb2J5Y2llIGkgbmV1dHJhbGl6YWNqYTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBtb2JpbGVBcmVhQ29ucXVlc3RFbmdpbmUuZGVwbG95RGVzYW50VmVjdG9yVG9BcHAoaW5zcGVjdGluZ0FwcC5pZCwgJ0xBU0VSX1RPV0VSX0JFQU0nKTtcbiAgICAgICAgICAgICAgICAgIHNldEluc3BlY3RpbmdBcHBJZChudWxsKTtcbiAgICAgICAgICAgICAgICAgIGlmIChvbk5vdGlmeSkgb25Ob3RpZnkoYOKaoSBabmV1dHJhbGl6b3dhbm8gYXBsaWthY2rEmSAke2luc3BlY3RpbmdBcHAuYXBwTmFtZX0hYCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi01MDAgdG8tZW1lcmFsZC01MDAgaG92ZXI6ZnJvbS1jeWFuLTQwMCBob3Zlcjp0by1lbWVyYWxkLTQwMCB0ZXh0LWJsYWNrIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQteHMgY3Vyc29yLXBvaW50ZXIgc2hhZG93IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBXeXBhbCBXc3p5c3RraWUgWsWCxIVjemEgQXBsaWthY2ppICgwIE1TKVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBcVRpQztBQXJUakMsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FB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