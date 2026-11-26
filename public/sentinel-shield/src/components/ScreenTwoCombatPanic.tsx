import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  Skull,
  AlertOctagon,
  Zap,
  ShieldCheck,
  Radio
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { hexLaserBarrierSystem } from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
import { gnidaSensorsMatrix } from "/sentinel-shield/src/utils/gnidaSensorsMatrix.ts";
import { adwarePopupDestroyer } from "/sentinel-shield/src/utils/adwarePopupDestroyer.ts";
import { MobileTacticalDesantArea } from "/sentinel-shield/src/components/MobileTacticalDesantArea.tsx";
const playTactileLuxuryClick = (frequency = 1600, tone = "kill") => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const oscClick = ctx.createOscillator();
    const gainClick = ctx.createGain();
    oscClick.type = "triangle";
    oscClick.frequency.setValueAtTime(frequency, now);
    oscClick.frequency.exponentialRampToValueAtTime(180, now + 0.045);
    gainClick.gain.setValueAtTime(0.4, now);
    gainClick.gain.exponentialRampToValueAtTime(1e-3, now + 0.05);
    oscClick.connect(gainClick);
    gainClick.connect(ctx.destination);
    oscClick.start(now);
    oscClick.stop(now + 0.055);
    const oscThud = ctx.createOscillator();
    const gainThud = ctx.createGain();
    oscThud.type = "sine";
    oscThud.frequency.setValueAtTime(tone === "panic" ? 95 : 120, now);
    oscThud.frequency.exponentialRampToValueAtTime(45, now + 0.08);
    gainThud.gain.setValueAtTime(0.35, now);
    gainThud.gain.exponentialRampToValueAtTime(1e-3, now + 0.09);
    oscThud.connect(gainThud);
    gainThud.connect(ctx.destination);
    oscThud.start(now);
    oscThud.stop(now + 0.095);
  } catch {
  }
};
const Physical3DButton = ({
  title,
  subtitle,
  tag,
  icon,
  isActive = false,
  onClick,
  accentColor,
  subLinkText,
  onSubLinkClick,
  soundPitch = 1600,
  soundType = "kill"
}) => {
  const [isDepressed, setIsDepressed] = useState(false);
  const handleMouseDown = () => {
    setIsDepressed(true);
    playTactileLuxuryClick(soundPitch, soundType);
  };
  const handleMouseUp = () => setIsDepressed(false);
  const handleMouseLeave = () => setIsDepressed(false);
  const colorMap = {
    emerald: {
      activeGlow: "shadow-[0_0_35px_rgba(16,185,129,0.5)] border-emerald-400",
      activeText: "text-emerald-200",
      activeLed: "bg-emerald-400 shadow-[0_0_12px_#34d399]",
      keycapGradient: "from-zinc-900 via-slate-900 to-zinc-950",
      tagBg: "bg-emerald-950/70 border-emerald-500/40 text-emerald-300",
      haloRing: "rgba(16,185,129,0.3)"
    },
    cyan: {
      activeGlow: "shadow-[0_0_35px_rgba(6,182,212,0.5)] border-cyan-400",
      activeText: "text-cyan-200",
      activeLed: "bg-cyan-400 shadow-[0_0_12px_#22d3ee]",
      keycapGradient: "from-zinc-900 via-slate-900 to-zinc-950",
      tagBg: "bg-cyan-950/70 border-cyan-500/40 text-cyan-300",
      haloRing: "rgba(6,182,212,0.3)"
    },
    gold: {
      activeGlow: "shadow-[0_0_35px_rgba(217,119,6,0.5)] border-amber-400",
      activeText: "text-amber-200",
      activeLed: "bg-amber-400 shadow-[0_0_12px_#fbbf24]",
      keycapGradient: "from-zinc-900 via-slate-900 to-zinc-950",
      tagBg: "bg-amber-950/70 border-amber-500/40 text-amber-300",
      haloRing: "rgba(245,158,11,0.3)"
    },
    sapphire: {
      activeGlow: "shadow-[0_0_35px_rgba(99,102,241,0.5)] border-indigo-400",
      activeText: "text-indigo-200",
      activeLed: "bg-indigo-400 shadow-[0_0_12px_#818cf8]",
      keycapGradient: "from-zinc-900 via-slate-900 to-zinc-950",
      tagBg: "bg-indigo-950/70 border-indigo-500/40 text-indigo-300",
      haloRing: "rgba(99,102,241,0.3)"
    },
    garnet: {
      activeGlow: "shadow-[0_0_35px_rgba(225,29,72,0.6)] border-rose-400",
      activeText: "text-rose-200",
      activeLed: "bg-rose-500 shadow-[0_0_14px_#f43f5e]",
      keycapGradient: "from-zinc-900 via-slate-900 to-zinc-950",
      tagBg: "bg-rose-950/70 border-rose-500/40 text-rose-300",
      haloRing: "rgba(244,63,94,0.35)"
    }
  }[accentColor];
  return /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col gap-2 group", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "tactile-button-socket p-1.5 rounded-2xl relative transition-all duration-300", children: [
      /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`,
          style: {
            boxShadow: `inset 0 0 20px ${colorMap.haloRing}, 0 0 25px ${colorMap.haloRing}`
          }
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 131,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick,
          onMouseDown: handleMouseDown,
          onMouseUp: handleMouseUp,
          onMouseLeave: handleMouseLeave,
          className: `w-full py-4 px-3.5 rounded-xl tactile-keycap-3d font-mono flex flex-col items-center justify-between text-center select-none cursor-pointer border ${isDepressed ? "is-pressed" : ""} ${isActive ? `bg-gradient-to-b ${colorMap.keycapGradient} ${colorMap.activeGlow}` : `bg-gradient-to-b ${colorMap.keycapGradient} border-white/10 hover:border-white/20 text-slate-200`}`,
          style: { minHeight: "138px" },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "w-full flex items-center justify-between gap-1 mb-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: `w-2 h-2 rounded-full transition-all duration-200 ${isActive ? colorMap.activeLed : "bg-slate-700"}` }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
                lineNumber: 155,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[9px] font-bold border transition-colors ${colorMap.tagBg}`, children: tag }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
                lineNumber: 158,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
              lineNumber: 154,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-white/10 text-white scale-110" : "bg-black/30 text-slate-300 group-hover:text-white group-hover:scale-105"}`, children: icon }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
              lineNumber: 163,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-2 space-y-0.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: `text-xs sm:text-sm font-black tracking-wider uppercase transition-colors ${isActive ? colorMap.activeText : "text-slate-100 group-hover:text-white"}`, children: title }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
                lineNumber: 172,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-sans tracking-wide", children: subtitle }, void 0, false, {
                fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
                lineNumber: 177,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
              lineNumber: 171,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 140,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    subLinkText && onSubLinkClick && /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: onSubLinkClick,
        className: "w-full py-1 px-2 rounded-lg bg-zinc-950/80 hover:bg-zinc-900 border border-white/5 hover:border-white/15 text-slate-400 hover:text-slate-200 font-mono text-[10px] flex items-center justify-center gap-1 transition-all cursor-pointer",
        children: /* @__PURE__ */ jsxDEV("span", { children: [
          subLinkText,
          " ↗"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 189,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
        lineNumber: 185,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
    lineNumber: 129,
    columnNumber: 5
  }, this);
};
export const ScreenTwoCombatPanic = ({ onNotify, onNavigateToTab }) => {
  const [isKillGnidaActive, setIsKillGnidaActive] = useState(false);
  const [isEmpActive, setIsEmpActive] = useState(false);
  const [isBarrierArmed, setIsBarrierArmed] = useState(true);
  const [isPulseActive, setIsPulseActive] = useState(false);
  const [isPanicFrozen, setIsPanicFrozen] = useState(false);
  const [killedCount, setKilledCount] = useState(12);
  const handleKillGnida = () => {
    setIsKillGnidaActive(true);
    setKilledCount((prev) => prev + 1);
    const { killedCount: killedAdware, purgedKeys } = adwarePopupDestroyer.killAllAdwareAndPopups();
    gnidaSensorsMatrix.triggerGnidaRecognition(
      "SENSOR_DWM_SCREEN",
      "hostile_malware_overlay_gnida.exe",
      8844,
      "Zmasowany Ostrzał Wieży Laserowej (Ubój Gnid)",
      `Trwałe uszkodzenie ${killedAdware} okien popup (HWND), zerowanie WS_EX_TOPMOST, usunięcie ${purgedKeys} kluczy autostartu i uśmiercenie procesów w RAM (0 ms)`
    );
    hexLaserBarrierSystem.triggerElectromagneticWavePenetration("Wieża Laserowa -> Bufor DWM -> Niszczenie Okien Popup & Adware");
    onNotify(`🗡️ UBÓJ GNID (KILL GNIDA): Zneutralizowano ${killedAdware} okien popup, ścięto flagi Z-Order i spopielono procesy w 0 ms!`);
    setTimeout(() => setIsKillGnidaActive(false), 1400);
  };
  const handleEmpWave = () => {
    setIsEmpActive(true);
    hexLaserBarrierSystem.triggerElectromagneticWavePenetration("Magistrala PCIe / Pamięć RAM DDR5 / Gniazda Sieciowe TCP/UDP / Bufor HWND");
    adwarePopupDestroyer.killAllAdwareAndPopups();
    onNotify("⚡ FALA EM (EMP): Rozproszono impuls elektromagnetyczny przez magistrale RAM i PCIe!");
    setTimeout(() => setIsEmpActive(false), 1500);
  };
  const handleActivateBarrier = () => {
    setIsBarrierArmed(true);
    hexLaserBarrierSystem.activateInstantly();
    onNotify("🛡️ BARIERA LASEROWA: Heksagonalna kopuła ochronna uzbrojona na 100% (10 pulsów/min)!");
  };
  const handleSignal940Thz = () => {
    setIsPulseActive(true);
    hexLaserBarrierSystem.emitNetworkPulseSignal(
      "SYGNAŁ NOŚNY 940.8 THz",
      "Wstrzyknięto częstotliwość rezonansową 940.8 THz przez iglicę wieży laserowej, bufor ekranu i kolejkę komunikatów Win32."
    );
    onNotify("📡 SYGNAŁ 940,8 THz: Wyemitowano rezonans kwantowy 940.8 THz przez całą strukturę monolitu!");
    setTimeout(() => setIsPulseActive(false), 1200);
  };
  const handlePanicFreeze = () => {
    setIsPanicFrozen(true);
    adwarePopupDestroyer.killAllAdwareAndPopups();
    onNotify("🚨 PANIC FREEZE: Błyskawicznie zamrożono wątki agresora w RAM (NtSuspendProcess / SIGSTOP 19)!");
    gnidaSensorsMatrix.triggerGnidaRecognition(
      "SENSOR_DWM_SCREEN",
      "aggressive_trojan_malware.exe",
      9120,
      "Wymuszenie Panic Button na Ekranie Głównym",
      "Błyskawiczne zawieszenie wątków w pamięci RAM (0 ms) + zdjęcie TopMost"
    );
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 animate-in fade-in duration-300", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-3xl bg-zinc-950/90 border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-zinc-900 border border-rose-500/30 rounded-2xl text-rose-400 shadow-md", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-6 h-6" }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 275,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 274,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-bold font-mono text-white uppercase tracking-wider", children: "EKRAN 2: CENTRUM BOJOWE • PRZYCISK PANIKI & UBÓJ GNID" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
              lineNumber: 279,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-zinc-900 border border-rose-500/40 text-rose-300 text-[10px] font-mono font-medium", children: "NATYCHMIASTOWA INAKTYWACJA (0 MS)" }, void 0, false, {
              fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
              lineNumber: 282,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 278,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-sans mt-0.5", children: "Główne 3D przyciski haptyczne z dźwiękiem kliknięcia: natychmiastowy ubój gnid laserem, zamrożenie RAM w 0 ms, fala EMP i mobilny desant." }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 286,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 277,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
        lineNumber: 273,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 font-mono text-xs", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "UBITE GNIDY" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 294,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 font-black", children: killedCount }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 295,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 293,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[10px] block", children: "STAN DYSZY" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 298,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-black", children: "GOTOWA (0 ms)" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 299,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 297,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
        lineNumber: 292,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
      lineNumber: 272,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5", children: [
      /* @__PURE__ */ jsxDEV(
        Physical3DButton,
        {
          title: "UBÓJ GNID",
          subtitle: "Spopielenie Wiązką 0 ms",
          tag: "KILL GNIDA",
          icon: /* @__PURE__ */ jsxDEV(Skull, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 311,
            columnNumber: 17
          }, this),
          isActive: isKillGnidaActive,
          onClick: handleKillGnida,
          accentColor: "emerald",
          soundPitch: 1750,
          soundType: "kill",
          subLinkText: "Kartoteka Gnid",
          onSubLinkClick: () => onNavigateToTab("threats")
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 307,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Physical3DButton,
        {
          title: "PRZYCISK PANIKI",
          subtitle: "Zamrożenie RAM w 0 ms",
          tag: "PANIC FREEZE",
          icon: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 326,
            columnNumber: 17
          }, this),
          isActive: isPanicFrozen,
          onClick: handlePanicFreeze,
          accentColor: "garnet",
          soundPitch: 1300,
          soundType: "panic",
          subLinkText: "Podstrona Panic",
          onSubLinkClick: () => onNavigateToTab("panic")
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 322,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Physical3DButton,
        {
          title: "FALA EM (EMP)",
          subtitle: "Penetracja PCIe & RAM",
          tag: "IMPULS EMP",
          icon: /* @__PURE__ */ jsxDEV(Zap, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 341,
            columnNumber: 17
          }, this),
          isActive: isEmpActive,
          onClick: handleEmpWave,
          accentColor: "cyan",
          soundPitch: 1500,
          soundType: "emp",
          subLinkText: "Radar Monolitu",
          onSubLinkClick: () => onNavigateToTab("radar")
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 337,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Physical3DButton,
        {
          title: "AKTYWUJ BARIERĘ",
          subtitle: "Heksagonalna Kopuła",
          tag: "10 PULSÓW / MIN",
          icon: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 356,
            columnNumber: 17
          }, this),
          isActive: isBarrierArmed,
          onClick: handleActivateBarrier,
          accentColor: "gold",
          soundPitch: 1650,
          soundType: "barrier",
          subLinkText: "Macierz Bariery",
          onSubLinkClick: () => onNavigateToTab("barrier")
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 352,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        Physical3DButton,
        {
          title: "SYGNAŁ 940.8 THz",
          subtitle: "Rezonans Kwantowy",
          tag: "NOŚNA KWANTOWA",
          icon: /* @__PURE__ */ jsxDEV(Radio, { className: "w-6 h-6" }, void 0, false, {
            fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
            lineNumber: 371,
            columnNumber: 17
          }, this),
          isActive: isPulseActive,
          onClick: handleSignal940Thz,
          accentColor: "sapphire",
          soundPitch: 1900,
          soundType: "quantum",
          subLinkText: "Autonaprawa",
          onSubLinkClick: () => onNavigateToTab("healing")
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
          lineNumber: 367,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
      lineNumber: 305,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "pt-2", children: /* @__PURE__ */ jsxDEV(MobileTacticalDesantArea, { onNotify }, void 0, false, {
      fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
      lineNumber: 384,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
      lineNumber: 383,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScreenTwoCombatPanic.tsx",
    lineNumber: 269,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmVlblR3b0NvbWJhdFBhbmljLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBTa3VsbCwgQWxlcnRPY3RhZ29uLCBaYXAsIFNoaWVsZENoZWNrLCBSYWRpbywgU21hcnRwaG9uZSwgXG4gIEFycm93UmlnaHQsIFNoaWVsZEFsZXJ0LCBTcGFya2xlcywgQWN0aXZpdHksIENyb3NzaGFpciwgRmxhbWUsXG4gIFRlcm1pbmFsLCBMb2NrLCBDaGVja0NpcmNsZTIsIFJlZnJlc2hDd1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgaGV4TGFzZXJCYXJyaWVyU3lzdGVtIH0gZnJvbSAnLi4vdXRpbHMvaGV4YWdvbmFsTGFzZXJCYXJyaWVyU3lzdGVtJztcbmltcG9ydCB7IGduaWRhU2Vuc29yc01hdHJpeCB9IGZyb20gJy4uL3V0aWxzL2duaWRhU2Vuc29yc01hdHJpeCc7XG5pbXBvcnQgeyBhZHdhcmVQb3B1cERlc3Ryb3llciB9IGZyb20gJy4uL3V0aWxzL2Fkd2FyZVBvcHVwRGVzdHJveWVyJztcbmltcG9ydCB7IE1vYmlsZVRhY3RpY2FsRGVzYW50QXJlYSB9IGZyb20gJy4vTW9iaWxlVGFjdGljYWxEZXNhbnRBcmVhJztcblxuLy8gQXVkaW8gU3ludGhlc2l6ZXIgZm9yIDNEIGJ1dHRvbnNcbmNvbnN0IHBsYXlUYWN0aWxlTHV4dXJ5Q2xpY2sgPSAoZnJlcXVlbmN5ID0gMTYwMCwgdG9uZTogJ2tpbGwnIHwgJ2VtcCcgfCAnYmFycmllcicgfCAncXVhbnR1bScgfCAncGFuaWMnID0gJ2tpbGwnKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3QgQXVkaW9DdHggPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgdW5rbm93biBhcyB7IHdlYmtpdEF1ZGlvQ29udGV4dDogdHlwZW9mIEF1ZGlvQ29udGV4dCB9KS53ZWJraXRBdWRpb0NvbnRleHQ7XG4gICAgaWYgKCFBdWRpb0N0eCkgcmV0dXJuO1xuICAgIGNvbnN0IGN0eCA9IG5ldyBBdWRpb0N0eCgpO1xuICAgIGNvbnN0IG5vdyA9IGN0eC5jdXJyZW50VGltZTtcblxuICAgIGNvbnN0IG9zY0NsaWNrID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICBjb25zdCBnYWluQ2xpY2sgPSBjdHguY3JlYXRlR2FpbigpO1xuICAgIG9zY0NsaWNrLnR5cGUgPSAndHJpYW5nbGUnO1xuICAgIG9zY0NsaWNrLmZyZXF1ZW5jeS5zZXRWYWx1ZUF0VGltZShmcmVxdWVuY3ksIG5vdyk7XG4gICAgb3NjQ2xpY2suZnJlcXVlbmN5LmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMTgwLCBub3cgKyAwLjA0NSk7XG4gICAgZ2FpbkNsaWNrLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC40LCBub3cpO1xuICAgIGdhaW5DbGljay5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIG5vdyArIDAuMDUpO1xuICAgIG9zY0NsaWNrLmNvbm5lY3QoZ2FpbkNsaWNrKTtcbiAgICBnYWluQ2xpY2suY29ubmVjdChjdHguZGVzdGluYXRpb24pO1xuICAgIG9zY0NsaWNrLnN0YXJ0KG5vdyk7XG4gICAgb3NjQ2xpY2suc3RvcChub3cgKyAwLjA1NSk7XG5cbiAgICBjb25zdCBvc2NUaHVkID0gY3R4LmNyZWF0ZU9zY2lsbGF0b3IoKTtcbiAgICBjb25zdCBnYWluVGh1ZCA9IGN0eC5jcmVhdGVHYWluKCk7XG4gICAgb3NjVGh1ZC50eXBlID0gJ3NpbmUnO1xuICAgIG9zY1RodWQuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKHRvbmUgPT09ICdwYW5pYycgPyA5NSA6IDEyMCwgbm93KTtcbiAgICBvc2NUaHVkLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDQ1LCBub3cgKyAwLjA4KTtcbiAgICBnYWluVGh1ZC5nYWluLnNldFZhbHVlQXRUaW1lKDAuMzUsIG5vdyk7XG4gICAgZ2FpblRodWQuZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDAxLCBub3cgKyAwLjA5KTtcbiAgICBvc2NUaHVkLmNvbm5lY3QoZ2FpblRodWQpO1xuICAgIGdhaW5UaHVkLmNvbm5lY3QoY3R4LmRlc3RpbmF0aW9uKTtcbiAgICBvc2NUaHVkLnN0YXJ0KG5vdyk7XG4gICAgb3NjVGh1ZC5zdG9wKG5vdyArIDAuMDk1KTtcbiAgfSBjYXRjaCB7XG4gICAgLy8gR3JhY2VmdWwgZmFsbGJhY2tcbiAgfVxufTtcblxuaW50ZXJmYWNlIFBoeXNpY2FsM0RCdXR0b25Qcm9wcyB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHN1YnRpdGxlOiBzdHJpbmc7XG4gIHRhZzogc3RyaW5nO1xuICBpY29uOiBSZWFjdC5SZWFjdE5vZGU7XG4gIGlzQWN0aXZlPzogYm9vbGVhbjtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbiAgYWNjZW50Q29sb3I6ICdlbWVyYWxkJyB8ICdjeWFuJyB8ICdnb2xkJyB8ICdzYXBwaGlyZScgfCAnZ2FybmV0JztcbiAgc3ViTGlua1RleHQ/OiBzdHJpbmc7XG4gIG9uU3ViTGlua0NsaWNrPzogKCkgPT4gdm9pZDtcbiAgc291bmRQaXRjaD86IG51bWJlcjtcbiAgc291bmRUeXBlPzogJ2tpbGwnIHwgJ2VtcCcgfCAnYmFycmllcicgfCAncXVhbnR1bScgfCAncGFuaWMnO1xufVxuXG5jb25zdCBQaHlzaWNhbDNEQnV0dG9uOiBSZWFjdC5GQzxQaHlzaWNhbDNEQnV0dG9uUHJvcHM+ID0gKHtcbiAgdGl0bGUsXG4gIHN1YnRpdGxlLFxuICB0YWcsXG4gIGljb24sXG4gIGlzQWN0aXZlID0gZmFsc2UsXG4gIG9uQ2xpY2ssXG4gIGFjY2VudENvbG9yLFxuICBzdWJMaW5rVGV4dCxcbiAgb25TdWJMaW5rQ2xpY2ssXG4gIHNvdW5kUGl0Y2ggPSAxNjAwLFxuICBzb3VuZFR5cGUgPSAna2lsbCdcbn0pID0+IHtcbiAgY29uc3QgW2lzRGVwcmVzc2VkLCBzZXRJc0RlcHJlc3NlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3QgaGFuZGxlTW91c2VEb3duID0gKCkgPT4ge1xuICAgIHNldElzRGVwcmVzc2VkKHRydWUpO1xuICAgIHBsYXlUYWN0aWxlTHV4dXJ5Q2xpY2soc291bmRQaXRjaCwgc291bmRUeXBlKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVNb3VzZVVwID0gKCkgPT4gc2V0SXNEZXByZXNzZWQoZmFsc2UpO1xuICBjb25zdCBoYW5kbGVNb3VzZUxlYXZlID0gKCkgPT4gc2V0SXNEZXByZXNzZWQoZmFsc2UpO1xuXG4gIGNvbnN0IGNvbG9yTWFwID0ge1xuICAgIGVtZXJhbGQ6IHtcbiAgICAgIGFjdGl2ZUdsb3c6ICdzaGFkb3ctWzBfMF8zNXB4X3JnYmEoMTYsMTg1LDEyOSwwLjUpXSBib3JkZXItZW1lcmFsZC00MDAnLFxuICAgICAgYWN0aXZlVGV4dDogJ3RleHQtZW1lcmFsZC0yMDAnLFxuICAgICAgYWN0aXZlTGVkOiAnYmctZW1lcmFsZC00MDAgc2hhZG93LVswXzBfMTJweF8jMzRkMzk5XScsXG4gICAgICBrZXljYXBHcmFkaWVudDogJ2Zyb20temluYy05MDAgdmlhLXNsYXRlLTkwMCB0by16aW5jLTk1MCcsXG4gICAgICB0YWdCZzogJ2JnLWVtZXJhbGQtOTUwLzcwIGJvcmRlci1lbWVyYWxkLTUwMC80MCB0ZXh0LWVtZXJhbGQtMzAwJyxcbiAgICAgIGhhbG9SaW5nOiAncmdiYSgxNiwxODUsMTI5LDAuMyknXG4gICAgfSxcbiAgICBjeWFuOiB7XG4gICAgICBhY3RpdmVHbG93OiAnc2hhZG93LVswXzBfMzVweF9yZ2JhKDYsMTgyLDIxMiwwLjUpXSBib3JkZXItY3lhbi00MDAnLFxuICAgICAgYWN0aXZlVGV4dDogJ3RleHQtY3lhbi0yMDAnLFxuICAgICAgYWN0aXZlTGVkOiAnYmctY3lhbi00MDAgc2hhZG93LVswXzBfMTJweF8jMjJkM2VlXScsXG4gICAgICBrZXljYXBHcmFkaWVudDogJ2Zyb20temluYy05MDAgdmlhLXNsYXRlLTkwMCB0by16aW5jLTk1MCcsXG4gICAgICB0YWdCZzogJ2JnLWN5YW4tOTUwLzcwIGJvcmRlci1jeWFuLTUwMC80MCB0ZXh0LWN5YW4tMzAwJyxcbiAgICAgIGhhbG9SaW5nOiAncmdiYSg2LDE4MiwyMTIsMC4zKSdcbiAgICB9LFxuICAgIGdvbGQ6IHtcbiAgICAgIGFjdGl2ZUdsb3c6ICdzaGFkb3ctWzBfMF8zNXB4X3JnYmEoMjE3LDExOSw2LDAuNSldIGJvcmRlci1hbWJlci00MDAnLFxuICAgICAgYWN0aXZlVGV4dDogJ3RleHQtYW1iZXItMjAwJyxcbiAgICAgIGFjdGl2ZUxlZDogJ2JnLWFtYmVyLTQwMCBzaGFkb3ctWzBfMF8xMnB4XyNmYmJmMjRdJyxcbiAgICAgIGtleWNhcEdyYWRpZW50OiAnZnJvbS16aW5jLTkwMCB2aWEtc2xhdGUtOTAwIHRvLXppbmMtOTUwJyxcbiAgICAgIHRhZ0JnOiAnYmctYW1iZXItOTUwLzcwIGJvcmRlci1hbWJlci01MDAvNDAgdGV4dC1hbWJlci0zMDAnLFxuICAgICAgaGFsb1Jpbmc6ICdyZ2JhKDI0NSwxNTgsMTEsMC4zKSdcbiAgICB9LFxuICAgIHNhcHBoaXJlOiB7XG4gICAgICBhY3RpdmVHbG93OiAnc2hhZG93LVswXzBfMzVweF9yZ2JhKDk5LDEwMiwyNDEsMC41KV0gYm9yZGVyLWluZGlnby00MDAnLFxuICAgICAgYWN0aXZlVGV4dDogJ3RleHQtaW5kaWdvLTIwMCcsXG4gICAgICBhY3RpdmVMZWQ6ICdiZy1pbmRpZ28tNDAwIHNoYWRvdy1bMF8wXzEycHhfIzgxOGNmOF0nLFxuICAgICAga2V5Y2FwR3JhZGllbnQ6ICdmcm9tLXppbmMtOTAwIHZpYS1zbGF0ZS05MDAgdG8temluYy05NTAnLFxuICAgICAgdGFnQmc6ICdiZy1pbmRpZ28tOTUwLzcwIGJvcmRlci1pbmRpZ28tNTAwLzQwIHRleHQtaW5kaWdvLTMwMCcsXG4gICAgICBoYWxvUmluZzogJ3JnYmEoOTksMTAyLDI0MSwwLjMpJ1xuICAgIH0sXG4gICAgZ2FybmV0OiB7XG4gICAgICBhY3RpdmVHbG93OiAnc2hhZG93LVswXzBfMzVweF9yZ2JhKDIyNSwyOSw3MiwwLjYpXSBib3JkZXItcm9zZS00MDAnLFxuICAgICAgYWN0aXZlVGV4dDogJ3RleHQtcm9zZS0yMDAnLFxuICAgICAgYWN0aXZlTGVkOiAnYmctcm9zZS01MDAgc2hhZG93LVswXzBfMTRweF8jZjQzZjVlXScsXG4gICAgICBrZXljYXBHcmFkaWVudDogJ2Zyb20temluYy05MDAgdmlhLXNsYXRlLTkwMCB0by16aW5jLTk1MCcsXG4gICAgICB0YWdCZzogJ2JnLXJvc2UtOTUwLzcwIGJvcmRlci1yb3NlLTUwMC80MCB0ZXh0LXJvc2UtMzAwJyxcbiAgICAgIGhhbG9SaW5nOiAncmdiYSgyNDQsNjMsOTQsMC4zNSknXG4gICAgfVxuICB9W2FjY2VudENvbG9yXTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMiBncm91cFwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWN0aWxlLWJ1dHRvbi1zb2NrZXQgcC0xLjUgcm91bmRlZC0yeGwgcmVsYXRpdmUgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwXCI+XG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPXtgYWJzb2x1dGUgaW5zZXQtMCByb3VuZGVkLTJ4bCBwb2ludGVyLWV2ZW50cy1ub25lIHRyYW5zaXRpb24tb3BhY2l0eSBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgIGlzQWN0aXZlID8gJ29wYWNpdHktMTAwJyA6ICdvcGFjaXR5LTAgZ3JvdXAtaG92ZXI6b3BhY2l0eS00MCdcbiAgICAgICAgICB9YH1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgYm94U2hhZG93OiBgaW5zZXQgMCAwIDIwcHggJHtjb2xvck1hcC5oYWxvUmluZ30sIDAgMCAyNXB4ICR7Y29sb3JNYXAuaGFsb1Jpbmd9YFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgb25Nb3VzZURvd249e2hhbmRsZU1vdXNlRG93bn1cbiAgICAgICAgICBvbk1vdXNlVXA9e2hhbmRsZU1vdXNlVXB9XG4gICAgICAgICAgb25Nb3VzZUxlYXZlPXtoYW5kbGVNb3VzZUxlYXZlfVxuICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS00IHB4LTMuNSByb3VuZGVkLXhsIHRhY3RpbGUta2V5Y2FwLTNkIGZvbnQtbW9ubyBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1jZW50ZXIgc2VsZWN0LW5vbmUgY3Vyc29yLXBvaW50ZXIgYm9yZGVyICR7XG4gICAgICAgICAgICBpc0RlcHJlc3NlZCA/ICdpcy1wcmVzc2VkJyA6ICcnXG4gICAgICAgICAgfSAke1xuICAgICAgICAgICAgaXNBY3RpdmVcbiAgICAgICAgICAgICAgPyBgYmctZ3JhZGllbnQtdG8tYiAke2NvbG9yTWFwLmtleWNhcEdyYWRpZW50fSAke2NvbG9yTWFwLmFjdGl2ZUdsb3d9YFxuICAgICAgICAgICAgICA6IGBiZy1ncmFkaWVudC10by1iICR7Y29sb3JNYXAua2V5Y2FwR3JhZGllbnR9IGJvcmRlci13aGl0ZS8xMCBob3Zlcjpib3JkZXItd2hpdGUvMjAgdGV4dC1zbGF0ZS0yMDBgXG4gICAgICAgICAgfWB9XG4gICAgICAgICAgc3R5bGU9e3sgbWluSGVpZ2h0OiAnMTM4cHgnIH19XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTEgbWItMS41XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2B3LTIgaC0yIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0yMDAgJHtcbiAgICAgICAgICAgICAgaXNBY3RpdmUgPyBjb2xvck1hcC5hY3RpdmVMZWQgOiAnYmctc2xhdGUtNzAwJ1xuICAgICAgICAgICAgfWB9IC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bOXB4XSBmb250LWJvbGQgYm9yZGVyIHRyYW5zaXRpb24tY29sb3JzICR7Y29sb3JNYXAudGFnQmd9YH0+XG4gICAgICAgICAgICAgIHt0YWd9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLXhsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgaXNBY3RpdmUgXG4gICAgICAgICAgICAgID8gJ2JnLXdoaXRlLzEwIHRleHQtd2hpdGUgc2NhbGUtMTEwJyBcbiAgICAgICAgICAgICAgOiAnYmctYmxhY2svMzAgdGV4dC1zbGF0ZS0zMDAgZ3JvdXAtaG92ZXI6dGV4dC13aGl0ZSBncm91cC1ob3ZlcjpzY2FsZS0xMDUnXG4gICAgICAgICAgfWB9PlxuICAgICAgICAgICAge2ljb259XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgc3BhY2UteS0wLjVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdGV4dC14cyBzbTp0ZXh0LXNtIGZvbnQtYmxhY2sgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgIGlzQWN0aXZlID8gY29sb3JNYXAuYWN0aXZlVGV4dCA6ICd0ZXh0LXNsYXRlLTEwMCBncm91cC1ob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAge3N1YnRpdGxlfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHtzdWJMaW5rVGV4dCAmJiBvblN1YkxpbmtDbGljayAmJiAoXG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXtvblN1YkxpbmtDbGlja31cbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMSBweC0yIHJvdW5kZWQtbGcgYmctemluYy05NTAvODAgaG92ZXI6YmctemluYy05MDAgYm9yZGVyIGJvcmRlci13aGl0ZS81IGhvdmVyOmJvcmRlci13aGl0ZS8xNSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4+e3N1YkxpbmtUZXh0fSDihpc8L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTY3JlZW5Ud29Db21iYXRQYW5pYzogUmVhY3QuRkM8eyBcbiAgb25Ob3RpZnk6IChtc2c6IHN0cmluZykgPT4gdm9pZDtcbiAgb25OYXZpZ2F0ZVRvVGFiOiAodGFiOiBzdHJpbmcpID0+IHZvaWQ7XG59PiA9ICh7IG9uTm90aWZ5LCBvbk5hdmlnYXRlVG9UYWIgfSkgPT4ge1xuICBjb25zdCBbaXNLaWxsR25pZGFBY3RpdmUsIHNldElzS2lsbEduaWRhQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzRW1wQWN0aXZlLCBzZXRJc0VtcEFjdGl2ZV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc0JhcnJpZXJBcm1lZCwgc2V0SXNCYXJyaWVyQXJtZWRdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtpc1B1bHNlQWN0aXZlLCBzZXRJc1B1bHNlQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2lzUGFuaWNGcm96ZW4sIHNldElzUGFuaWNGcm96ZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBba2lsbGVkQ291bnQsIHNldEtpbGxlZENvdW50XSA9IHVzZVN0YXRlKDEyKTtcblxuICAvLyAxLiBLSUxMIEdOSURBIChMYXNlciBJbmNpbmVyYXRpb24gKyBBZHdhcmUgV2lwZSlcbiAgY29uc3QgaGFuZGxlS2lsbEduaWRhID0gKCkgPT4ge1xuICAgIHNldElzS2lsbEduaWRhQWN0aXZlKHRydWUpO1xuICAgIHNldEtpbGxlZENvdW50KChwcmV2KSA9PiBwcmV2ICsgMSk7XG5cbiAgICBjb25zdCB7IGtpbGxlZENvdW50OiBraWxsZWRBZHdhcmUsIHB1cmdlZEtleXMgfSA9IGFkd2FyZVBvcHVwRGVzdHJveWVyLmtpbGxBbGxBZHdhcmVBbmRQb3B1cHMoKTtcblxuICAgIGduaWRhU2Vuc29yc01hdHJpeC50cmlnZ2VyR25pZGFSZWNvZ25pdGlvbihcbiAgICAgICdTRU5TT1JfRFdNX1NDUkVFTicsXG4gICAgICAnaG9zdGlsZV9tYWx3YXJlX292ZXJsYXlfZ25pZGEuZXhlJyxcbiAgICAgIDg4NDQsXG4gICAgICAnWm1hc293YW55IE9zdHJ6YcWCIFdpZcW8eSBMYXNlcm93ZWogKFViw7NqIEduaWQpJyxcbiAgICAgIGBUcndhxYJlIHVzemtvZHplbmllICR7a2lsbGVkQWR3YXJlfSBva2llbiBwb3B1cCAoSFdORCksIHplcm93YW5pZSBXU19FWF9UT1BNT1NULCB1c3VuacSZY2llICR7cHVyZ2VkS2V5c30ga2x1Y3p5IGF1dG9zdGFydHUgaSB1xZttaWVyY2VuaWUgcHJvY2Vzw7N3IHcgUkFNICgwIG1zKWBcbiAgICApO1xuXG4gICAgaGV4TGFzZXJCYXJyaWVyU3lzdGVtLnRyaWdnZXJFbGVjdHJvbWFnbmV0aWNXYXZlUGVuZXRyYXRpb24oJ1dpZcW8YSBMYXNlcm93YSAtPiBCdWZvciBEV00gLT4gTmlzemN6ZW5pZSBPa2llbiBQb3B1cCAmIEFkd2FyZScpO1xuICAgIG9uTm90aWZ5KGDwn5eh77iPIFVCw5NKIEdOSUQgKEtJTEwgR05JREEpOiBabmV1dHJhbGl6b3dhbm8gJHtraWxsZWRBZHdhcmV9IG9raWVuIHBvcHVwLCDFm2NpxJl0byBmbGFnaSBaLU9yZGVyIGkgc3BvcGllbG9ubyBwcm9jZXN5IHcgMCBtcyFgKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldElzS2lsbEduaWRhQWN0aXZlKGZhbHNlKSwgMTQwMCk7XG4gIH07XG5cbiAgLy8gMi4gRU1QIFdBVkVcbiAgY29uc3QgaGFuZGxlRW1wV2F2ZSA9ICgpID0+IHtcbiAgICBzZXRJc0VtcEFjdGl2ZSh0cnVlKTtcbiAgICBoZXhMYXNlckJhcnJpZXJTeXN0ZW0udHJpZ2dlckVsZWN0cm9tYWduZXRpY1dhdmVQZW5ldHJhdGlvbignTWFnaXN0cmFsYSBQQ0llIC8gUGFtacSZxIcgUkFNIEREUjUgLyBHbmlhemRhIFNpZWNpb3dlIFRDUC9VRFAgLyBCdWZvciBIV05EJyk7XG4gICAgYWR3YXJlUG9wdXBEZXN0cm95ZXIua2lsbEFsbEFkd2FyZUFuZFBvcHVwcygpO1xuICAgIG9uTm90aWZ5KCfimqEgRkFMQSBFTSAoRU1QKTogUm96cHJvc3pvbm8gaW1wdWxzIGVsZWt0cm9tYWduZXR5Y3pueSBwcnpleiBtYWdpc3RyYWxlIFJBTSBpIFBDSWUhJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc0VtcEFjdGl2ZShmYWxzZSksIDE1MDApO1xuICB9O1xuXG4gIC8vIDMuIEFDVElWQVRFIEJBUlJJRVJcbiAgY29uc3QgaGFuZGxlQWN0aXZhdGVCYXJyaWVyID0gKCkgPT4ge1xuICAgIHNldElzQmFycmllckFybWVkKHRydWUpO1xuICAgIGhleExhc2VyQmFycmllclN5c3RlbS5hY3RpdmF0ZUluc3RhbnRseSgpO1xuICAgIG9uTm90aWZ5KCfwn5uh77iPIEJBUklFUkEgTEFTRVJPV0E6IEhla3NhZ29uYWxuYSBrb3B1xYJhIG9jaHJvbm5hIHV6YnJvam9uYSBuYSAxMDAlICgxMCBwdWxzw7N3L21pbikhJyk7XG4gIH07XG5cbiAgLy8gNC4gUVVBTlRVTSBTSUdOQUxcbiAgY29uc3QgaGFuZGxlU2lnbmFsOTQwVGh6ID0gKCkgPT4ge1xuICAgIHNldElzUHVsc2VBY3RpdmUodHJ1ZSk7XG4gICAgaGV4TGFzZXJCYXJyaWVyU3lzdGVtLmVtaXROZXR3b3JrUHVsc2VTaWduYWwoXG4gICAgICAnU1lHTkHFgSBOT8WaTlkgOTQwLjggVEh6JyxcbiAgICAgICdXc3RyenlrbmnEmXRvIGN6xJlzdG90bGl3b8WbxIcgcmV6b25hbnNvd8SFIDk0MC44IFRIeiBwcnpleiBpZ2xpY8SZIHdpZcW8eSBsYXNlcm93ZWosIGJ1Zm9yIGVrcmFudSBpIGtvbGVqa8SZIGtvbXVuaWthdMOzdyBXaW4zMi4nXG4gICAgKTtcbiAgICBvbk5vdGlmeSgn8J+ToSBTWUdOQcWBIDk0MCw4IFRIejogV3llbWl0b3dhbm8gcmV6b25hbnMga3dhbnRvd3kgOTQwLjggVEh6IHByemV6IGNhxYLEhSBzdHJ1a3R1csSZIG1vbm9saXR1IScpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNQdWxzZUFjdGl2ZShmYWxzZSksIDEyMDApO1xuICB9O1xuXG4gIC8vIDUuIFBBTklDIEJVVFRPTiBGUkVFWkVcbiAgY29uc3QgaGFuZGxlUGFuaWNGcmVlemUgPSAoKSA9PiB7XG4gICAgc2V0SXNQYW5pY0Zyb3plbih0cnVlKTtcbiAgICBhZHdhcmVQb3B1cERlc3Ryb3llci5raWxsQWxsQWR3YXJlQW5kUG9wdXBzKCk7XG4gICAgb25Ob3RpZnkoJ/CfmqggUEFOSUMgRlJFRVpFOiBCxYJ5c2thd2ljem5pZSB6YW1yb8W8b25vIHfEhXRraSBhZ3Jlc29yYSB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcyAvIFNJR1NUT1AgMTkpIScpO1xuICAgIGduaWRhU2Vuc29yc01hdHJpeC50cmlnZ2VyR25pZGFSZWNvZ25pdGlvbihcbiAgICAgICdTRU5TT1JfRFdNX1NDUkVFTicsXG4gICAgICAnYWdncmVzc2l2ZV90cm9qYW5fbWFsd2FyZS5leGUnLFxuICAgICAgOTEyMCxcbiAgICAgICdXeW11c3plbmllIFBhbmljIEJ1dHRvbiBuYSBFa3JhbmllIEfFgsOzd255bScsXG4gICAgICAnQsWCeXNrYXdpY3puZSB6YXdpZXN6ZW5pZSB3xIV0a8OzdyB3IHBhbWnEmWNpIFJBTSAoMCBtcykgKyB6ZGrEmWNpZSBUb3BNb3N0J1xuICAgICk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMzAwXCI+XG4gICAgICBcbiAgICAgIHsvKiBTY3JlZW4gSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0zeGwgYmctemluYy05NTAvOTAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctMnhsIGJhY2tkcm9wLWJsdXIteGwgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zLjVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy16aW5jLTkwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzMwIHJvdW5kZWQtMnhsIHRleHQtcm9zZS00MDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgIEVLUkFOIDI6IENFTlRSVU0gQk9KT1dFIOKAoiBQUlpZQ0lTSyBQQU5JS0kgJiBVQsOTSiBHTklEXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItcm9zZS01MDAvNDAgdGV4dC1yb3NlLTMwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1tZWRpdW1cIj5cbiAgICAgICAgICAgICAgICBOQVRZQ0hNSUFTVE9XQSBJTkFLVFlXQUNKQSAoMCBNUylcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtc2FucyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgR8WCw7N3bmUgM0QgcHJ6eWNpc2tpIGhhcHR5Y3puZSB6IGTFundpxJlraWVtIGtsaWtuacSZY2lhOiBuYXR5Y2htaWFzdG93eSB1YsOzaiBnbmlkIGxhc2VyZW0sIHphbXJvxbxlbmllIFJBTSB3IDAgbXMsIGZhbGEgRU1QIGkgbW9iaWxueSBkZXNhbnQuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF0gYmxvY2tcIj5VQklURSBHTklEWTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcm9zZS00MDAgZm9udC1ibGFja1wiPntraWxsZWRDb3VudH08L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItd2hpdGUvMTBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdIGJsb2NrXCI+U1RBTiBEWVNaWTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ibGFja1wiPkdPVE9XQSAoMCBtcyk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiA1IFBoeXNpY2FsIDNEIFRhY3RpbGUgQnV0dG9ucyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNSBnYXAtMy41XCI+XG4gICAgICAgIHsvKiBCVVRUT04gMTogVULDk0ogR05JRCAqL31cbiAgICAgICAgPFBoeXNpY2FsM0RCdXR0b25cbiAgICAgICAgICB0aXRsZT1cIlVCw5NKIEdOSURcIlxuICAgICAgICAgIHN1YnRpdGxlPVwiU3BvcGllbGVuaWUgV2nEhXprxIUgMCBtc1wiXG4gICAgICAgICAgdGFnPVwiS0lMTCBHTklEQVwiXG4gICAgICAgICAgaWNvbj17PFNrdWxsIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPn1cbiAgICAgICAgICBpc0FjdGl2ZT17aXNLaWxsR25pZGFBY3RpdmV9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlS2lsbEduaWRhfVxuICAgICAgICAgIGFjY2VudENvbG9yPVwiZW1lcmFsZFwiXG4gICAgICAgICAgc291bmRQaXRjaD17MTc1MH1cbiAgICAgICAgICBzb3VuZFR5cGU9XCJraWxsXCJcbiAgICAgICAgICBzdWJMaW5rVGV4dD1cIkthcnRvdGVrYSBHbmlkXCJcbiAgICAgICAgICBvblN1YkxpbmtDbGljaz17KCkgPT4gb25OYXZpZ2F0ZVRvVGFiKCd0aHJlYXRzJyl9XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEJVVFRPTiAyOiBQUlpZQ0lTSyBQQU5JS0kgKi99XG4gICAgICAgIDxQaHlzaWNhbDNEQnV0dG9uXG4gICAgICAgICAgdGl0bGU9XCJQUlpZQ0lTSyBQQU5JS0lcIlxuICAgICAgICAgIHN1YnRpdGxlPVwiWmFtcm/FvGVuaWUgUkFNIHcgMCBtc1wiXG4gICAgICAgICAgdGFnPVwiUEFOSUMgRlJFRVpFXCJcbiAgICAgICAgICBpY29uPXs8QWxlcnRPY3RhZ29uIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPn1cbiAgICAgICAgICBpc0FjdGl2ZT17aXNQYW5pY0Zyb3plbn1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVQYW5pY0ZyZWV6ZX1cbiAgICAgICAgICBhY2NlbnRDb2xvcj1cImdhcm5ldFwiXG4gICAgICAgICAgc291bmRQaXRjaD17MTMwMH1cbiAgICAgICAgICBzb3VuZFR5cGU9XCJwYW5pY1wiXG4gICAgICAgICAgc3ViTGlua1RleHQ9XCJQb2RzdHJvbmEgUGFuaWNcIlxuICAgICAgICAgIG9uU3ViTGlua0NsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ3BhbmljJyl9XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEJVVFRPTiAzOiBGQUxBIEVMRUtUUk9NQUdORVRZQ1pOQSAqL31cbiAgICAgICAgPFBoeXNpY2FsM0RCdXR0b25cbiAgICAgICAgICB0aXRsZT1cIkZBTEEgRU0gKEVNUClcIlxuICAgICAgICAgIHN1YnRpdGxlPVwiUGVuZXRyYWNqYSBQQ0llICYgUkFNXCJcbiAgICAgICAgICB0YWc9XCJJTVBVTFMgRU1QXCJcbiAgICAgICAgICBpY29uPXs8WmFwIGNsYXNzTmFtZT1cInctNiBoLTZcIiAvPn1cbiAgICAgICAgICBpc0FjdGl2ZT17aXNFbXBBY3RpdmV9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlRW1wV2F2ZX1cbiAgICAgICAgICBhY2NlbnRDb2xvcj1cImN5YW5cIlxuICAgICAgICAgIHNvdW5kUGl0Y2g9ezE1MDB9XG4gICAgICAgICAgc291bmRUeXBlPVwiZW1wXCJcbiAgICAgICAgICBzdWJMaW5rVGV4dD1cIlJhZGFyIE1vbm9saXR1XCJcbiAgICAgICAgICBvblN1YkxpbmtDbGljaz17KCkgPT4gb25OYXZpZ2F0ZVRvVGFiKCdyYWRhcicpfVxuICAgICAgICAvPlxuXG4gICAgICAgIHsvKiBCVVRUT04gNDogQUtUWVdBQ0pBIEJBUklFUlkgKi99XG4gICAgICAgIDxQaHlzaWNhbDNEQnV0dG9uXG4gICAgICAgICAgdGl0bGU9XCJBS1RZV1VKIEJBUklFUsSYXCJcbiAgICAgICAgICBzdWJ0aXRsZT1cIkhla3NhZ29uYWxuYSBLb3B1xYJhXCJcbiAgICAgICAgICB0YWc9XCIxMCBQVUxTw5NXIC8gTUlOXCJcbiAgICAgICAgICBpY29uPXs8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy02IGgtNlwiIC8+fVxuICAgICAgICAgIGlzQWN0aXZlPXtpc0JhcnJpZXJBcm1lZH1cbiAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVBY3RpdmF0ZUJhcnJpZXJ9XG4gICAgICAgICAgYWNjZW50Q29sb3I9XCJnb2xkXCJcbiAgICAgICAgICBzb3VuZFBpdGNoPXsxNjUwfVxuICAgICAgICAgIHNvdW5kVHlwZT1cImJhcnJpZXJcIlxuICAgICAgICAgIHN1YkxpbmtUZXh0PVwiTWFjaWVyeiBCYXJpZXJ5XCJcbiAgICAgICAgICBvblN1YkxpbmtDbGljaz17KCkgPT4gb25OYXZpZ2F0ZVRvVGFiKCdiYXJyaWVyJyl9XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEJVVFRPTiA1OiBTWUdOQcWBIDk0MCw4IFRIeiAqL31cbiAgICAgICAgPFBoeXNpY2FsM0RCdXR0b25cbiAgICAgICAgICB0aXRsZT1cIlNZR05BxYEgOTQwLjggVEh6XCJcbiAgICAgICAgICBzdWJ0aXRsZT1cIlJlem9uYW5zIEt3YW50b3d5XCJcbiAgICAgICAgICB0YWc9XCJOT8WaTkEgS1dBTlRPV0FcIlxuICAgICAgICAgIGljb249ezxSYWRpbyBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz59XG4gICAgICAgICAgaXNBY3RpdmU9e2lzUHVsc2VBY3RpdmV9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlU2lnbmFsOTQwVGh6fVxuICAgICAgICAgIGFjY2VudENvbG9yPVwic2FwcGhpcmVcIlxuICAgICAgICAgIHNvdW5kUGl0Y2g9ezE5MDB9XG4gICAgICAgICAgc291bmRUeXBlPVwicXVhbnR1bVwiXG4gICAgICAgICAgc3ViTGlua1RleHQ9XCJBdXRvbmFwcmF3YVwiXG4gICAgICAgICAgb25TdWJMaW5rQ2xpY2s9eygpID0+IG9uTmF2aWdhdGVUb1RhYignaGVhbGluZycpfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNb2JpbGUgVGFjdGljYWwgRGVzYW50IEFyZWEgd2l0aCBLaXR0ZW4gRHJvbmVzIFBlbmV0cmF0aW5nIEJhcnJpZXJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yXCI+XG4gICAgICAgIDxNb2JpbGVUYWN0aWNhbERlc2FudEFyZWEgb25Ob3RpZnk9e29uTm90aWZ5fSAvPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFrSVE7QUFsSVIsU0FBZ0IsZ0JBQTJCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQU87QUFBQSxFQUFjO0FBQUEsRUFBSztBQUFBLEVBQWE7QUFBQSxPQUdsQztBQUNQLFNBQVMsNkJBQTZCO0FBQ3RDLFNBQVMsMEJBQTBCO0FBQ25DLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsZ0NBQWdDO0FBR3pD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