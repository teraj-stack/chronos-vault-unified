import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  ShieldCheck,
  Zap,
  Radio,
  Skull,
  Target,
  Flame,
  AlertTriangle,
  Sliders
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { TitaniumToggleSwitch } from "/sentinel-shield/src/components/TitaniumMilitarySwitch.tsx";
export const TacticalWarRoomHoloTable = () => {
  const [isHoloEmitterActive, setIsHoloEmitterActive] = useState(true);
  const [holoTheme, setHoloTheme] = useState("cyan");
  const [isDefconArmed, setIsDefconArmed] = useState(false);
  const [tableRotationAngle, setTableRotationAngle] = useState(15);
  const [hologramOpacity, setHologramOpacity] = useState(85);
  const [selectedScreenId, setSelectedScreenId] = useState("screen-alpha");
  const [activeSalvoStrike, setActiveSalvoStrike] = useState(false);
  const [strikeLogs, setStrikeLogs] = useState([
    "SYSTEM GOTOWOŚCI BOJOWEJ: Stół sztabowy zsynchronizowany z emiterem 940.8 THz.",
    "PROJEKCJA HOLOGRAMOWA: 4 ekrany przezroczyste ustabilizowane w przestrzeni."
  ]);
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setTick((t) => (t + 1) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, []);
  const themeColors = {
    cyan: {
      border: "border-cyan-400/60",
      text: "text-cyan-300",
      bgGlow: "rgba(6, 182, 212, 0.25)",
      accent: "#22d3ee",
      glowShadow: "shadow-[0_0_25px_rgba(34,211,238,0.35)]",
      beamGradient: "from-cyan-500/40 via-sky-500/10 to-transparent"
    },
    emerald: {
      border: "border-emerald-400/60",
      text: "text-emerald-300",
      bgGlow: "rgba(16, 185, 129, 0.25)",
      accent: "#34d399",
      glowShadow: "shadow-[0_0_25px_rgba(52,211,153,0.35)]",
      beamGradient: "from-emerald-500/40 via-teal-500/10 to-transparent"
    },
    amber: {
      border: "border-amber-400/60",
      text: "text-amber-300",
      bgGlow: "rgba(245, 158, 11, 0.25)",
      accent: "#fbbf24",
      glowShadow: "shadow-[0_0_25px_rgba(251,191,36,0.35)]",
      beamGradient: "from-amber-500/40 via-yellow-500/10 to-transparent"
    },
    crimson: {
      border: "border-red-500/70",
      text: "text-red-300",
      bgGlow: "rgba(239, 68, 68, 0.3)",
      accent: "#f87171",
      glowShadow: "shadow-[0_0_25px_rgba(248,113,113,0.4)]",
      beamGradient: "from-red-600/50 via-rose-500/15 to-transparent"
    }
  }[holoTheme];
  const handleTriggerSalvoStrike = () => {
    setActiveSalvoStrike(true);
    setStrikeLogs((prev) => [
      `[SALVO STRIKE] Autoryzacja ognia fotonowego DEFCON 1 przez stół dowodzenia!`,
      `[PROCES GNIDA] Zlokalizowano koordynaty HWND: 0x7FFF9210. Rozpoczęto natychmiastową dekapitację.`,
      `[STATUS BARIERY] Emisja 940.8 THz spopieliła klastry pamięci wrogiego overlay.`,
      ...prev.slice(0, 5)
    ]);
    setTimeout(() => {
      setActiveSalvoStrike(false);
      setStrikeLogs((prev) => [
        `[POTWIERDZENIE] Cel zneutralizowany. 100% integralności stacji roboczej.`,
        ...prev
      ]);
    }, 3200);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl titanium-steel-surface border border-slate-600/80 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-2 milspec-rivet" }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 91,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 right-2 milspec-rivet" }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 92,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 left-2 milspec-rivet" }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 93,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 milspec-rivet" }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10 pl-2", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-black/80 text-cyan-300 border border-cyan-500/50 font-bold tracking-wider", children: "MIL-STD-810H // STANAG 4569" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 99,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-500/50 font-bold flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 103,
                columnNumber: 17
              }, this),
              "DEFCON 1 TACTICAL WAR ROOM"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 102,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-700", children: "CAGE: 1K892 • SECTOR-ALPHA" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 106,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 98,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white font-mono tracking-wide mt-2 flex items-center gap-2.5", children: /* @__PURE__ */ jsxDEV("span", { children: "Stół Konferencyjny Dowództwa & Ekrany Hologramowe" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 112,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed", children: [
            "Okrągły stół sztabowy z polerowanego tytanu i stali pancernej z centralnym emiterem optycznym rzucającym w przestrzeń ",
            /* @__PURE__ */ jsxDEV("strong", { children: "wielopłaszczyznowe przezroczyste ekrany hologramowe" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 115,
              columnNumber: 133
            }, this),
            ". Zapewnia pełną telemetrię orbitalną, dekompilację wrogich procesów i taktyczną autoryzację uboju."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 114,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 97,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[10px] text-slate-400 uppercase mr-1", children: "Spektrum Projekcji:" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 121,
            columnNumber: 13
          }, this),
          ["cyan", "emerald", "amber", "crimson"].map((color) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setHoloTheme(color),
              className: `px-2.5 py-1 rounded-lg font-mono text-[11px] font-bold uppercase transition-all cursor-pointer ${holoTheme === color ? "bg-slate-800 text-white border-2 border-white/80 shadow-lg" : "bg-black/60 text-slate-400 border border-slate-700 hover:text-white"}`,
              children: [
                color === "cyan" && "Cyjan 480nm",
                color === "emerald" && "Szmaragd 532nm",
                color === "amber" && "Bursztyn 590nm",
                color === "crimson" && "Karmin 650nm"
              ]
            },
            color,
            true,
            {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 123,
              columnNumber: 15
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 120,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 96,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
      lineNumber: 89,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative min-h-[640px] rounded-3xl bg-gradient-to-b from-[#06080d] via-[#0b1018] to-[#04060a] border-2 border-slate-700/80 shadow-2xl overflow-hidden p-4 sm:p-8 flex flex-col justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none opacity-20", children: /* @__PURE__ */ jsxDEV("svg", { className: "w-full h-full", xmlns: "http://www.w3.org/2000/svg", children: [
        /* @__PURE__ */ jsxDEV("defs", { children: /* @__PURE__ */ jsxDEV("pattern", { id: "warroom-ceiling-grid", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxDEV("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: "rgba(255,255,255,0.15)", strokeWidth: "0.8" }, void 0, false, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 150,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 149,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 148,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("rect", { width: "100%", height: "100%", fill: "url(#warroom-ceiling-grid)" }, void 0, false, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 147,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 146,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: `absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b ${themeColors.beamGradient} blur-3xl pointer-events-none transition-all duration-500` }, void 0, false, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 holo-screen-container", children: [
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedScreenId("screen-alpha"),
            className: `holo-glass-panel rounded-2xl p-4 transition-all duration-300 cursor-pointer ${selectedScreenId === "screen-alpha" ? `${themeColors.border} ${themeColors.glowShadow} scale-102` : "border-slate-700/60 opacity-80 hover:opacity-100"}`,
            style: { opacity: isHoloEmitterActive ? hologramOpacity / 100 : 0.08 },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-cyan-500/30 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 font-bold tracking-wider text-cyan-300", children: [
                  /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 175,
                    columnNumber: 17
                  }, this),
                  "HOLO-EKRAN I: TEATR ORBITALNY"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 174,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "NORAD-SEC-LINK" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 178,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 173,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative h-44 my-2 flex items-center justify-center overflow-hidden", children: [
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "w-32 h-32 rounded-full border border-cyan-400/40 relative flex items-center justify-center shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]",
                    style: { transform: `rotate(${tick}deg)` },
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-2 rounded-full border border-dashed border-cyan-400/30" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 188,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-x-0 top-1/2 h-0.5 bg-cyan-400/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 189,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-y-0 left-1/2 w-0.5 bg-cyan-400/40" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 190,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 right-8 w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 193,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute top-6 right-8 w-2 h-2 rounded-full bg-red-500" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 194,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-6 left-8 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#22d3ee]" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 197,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 183,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                    style: { transform: `rotate(${tick * 2}deg)` },
                    children: /* @__PURE__ */ jsxDEV("div", { className: "w-36 h-0.5 bg-gradient-to-r from-transparent to-cyan-300 shadow-[0_0_8px_#22d3ee]" }, void 0, false, {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 205,
                      columnNumber: 17
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 201,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1 right-2 text-[9px] font-mono text-cyan-400/80", children: "LAT: 52.2297° N | LON: 21.0122° E" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 208,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 182,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-cyan-500/20 text-[10px] font-mono flex items-center justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "STATUS: ŚLEDZENIE CELU" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 214,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% LOCKED" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 215,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 213,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 166,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedScreenId("screen-beta"),
            className: `holo-glass-panel rounded-2xl p-4 transition-all duration-300 cursor-pointer ${selectedScreenId === "screen-beta" ? `${themeColors.border} ${themeColors.glowShadow} scale-102` : "border-slate-700/60 opacity-80 hover:opacity-100"}`,
            style: { opacity: isHoloEmitterActive ? hologramOpacity / 100 : 0.08 },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-purple-500/30 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 font-bold tracking-wider text-purple-300", children: [
                  /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 229,
                    columnNumber: 17
                  }, this),
                  "HOLO-EKRAN II: ANATOMIA GNIDY"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 228,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "DISASSEMBLY" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 232,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 227,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative h-44 my-2 flex items-center justify-center overflow-hidden font-mono text-[9px]", children: [
                /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    className: "w-28 h-28 border border-purple-400/50 rounded-2xl relative flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)]",
                    style: { transform: `rotateY(${tick * 1.5}deg) rotateX(25deg)` },
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-3 border border-dashed border-red-500/60 rounded-xl" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 242,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-center text-red-400 font-bold", children: [
                        /* @__PURE__ */ jsxDEV("div", { children: "[HWND_HOOK]" }, void 0, false, {
                          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                          lineNumber: 244,
                          columnNumber: 19
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "text-[7px] text-slate-300 mt-1", children: "PID: 8940" }, void 0, false, {
                          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                          lineNumber: 245,
                          columnNumber: 19
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 243,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 238,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-x-2 bottom-1 bg-black/60 p-1.5 rounded border border-purple-500/30 text-[8px] text-purple-200", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: "0x7FFF0010: PUSH RBP" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 251,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: "0x7FFF0018: CALL NtSuspendProcess" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 252,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: "0x7FFF0020: RET [PURGED]" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 253,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 250,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 236,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-purple-500/20 text-[10px] font-mono flex items-center justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "ENTROPIA: 7.94 / 8.00" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 258,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: "ZDEKAPITOWANO" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 259,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 257,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 220,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedScreenId("screen-gamma"),
            className: `holo-glass-panel rounded-2xl p-4 transition-all duration-300 cursor-pointer ${selectedScreenId === "screen-gamma" ? `${themeColors.border} ${themeColors.glowShadow} scale-102` : "border-slate-700/60 opacity-80 hover:opacity-100"}`,
            style: { opacity: isHoloEmitterActive ? hologramOpacity / 100 : 0.08 },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-indigo-500/30 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 font-bold tracking-wider text-indigo-300", children: [
                  /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 273,
                    columnNumber: 17
                  }, this),
                  "HOLO-EKRAN III: TARCZA 940.8 THz"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 272,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "FORCEFIELD" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 276,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 271,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "relative h-44 my-2 flex items-center justify-center overflow-hidden", children: [
                /* @__PURE__ */ jsxDEV("svg", { className: "w-full h-full", viewBox: "0 0 200 120", children: [
                  /* @__PURE__ */ jsxDEV("ellipse", { cx: "100", cy: "60", rx: "80", ry: "40", fill: "none", stroke: "rgba(99,102,241,0.3)", strokeWidth: "1", strokeDasharray: "4 2" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 283,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("ellipse", { cx: "100", cy: "60", rx: "60", ry: "25", fill: "none", stroke: "rgba(99,102,241,0.5)", strokeWidth: "1.2" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 284,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("ellipse", { cx: "100", cy: "60", rx: "35", ry: "12", fill: "none", stroke: "rgba(129,140,248,0.8)", strokeWidth: "1.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 285,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "path",
                    {
                      d: `M 10 60 Q 55 ${60 - Math.sin(tick * 0.1) * 20}, 100 60 T 190 60`,
                      fill: "none",
                      stroke: "#818cf8",
                      strokeWidth: "2"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 288,
                      columnNumber: 17
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 281,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 left-2 text-[8px] font-mono text-indigo-300 bg-black/60 px-1 rounded", children: "MOC: 2,450 MW" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 296,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 right-2 text-[8px] font-mono text-indigo-300 bg-black/60 px-1 rounded", children: "PULSY: 10 PPM" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 299,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 280,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-indigo-500/20 text-[10px] font-mono flex items-center justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "BIEGUNOWOŚĆ: HARMONICZNA" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 305,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% AKTYWNA" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 306,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 304,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 264,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedScreenId("screen-delta"),
            className: `holo-glass-panel rounded-2xl p-4 transition-all duration-300 cursor-pointer ${selectedScreenId === "screen-delta" ? `${themeColors.border} ${themeColors.glowShadow} scale-102` : "border-slate-700/60 opacity-80 hover:opacity-100"}`,
            style: { opacity: isHoloEmitterActive ? hologramOpacity / 100 : 0.08 },
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-red-500/30 text-[10px] font-mono", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 font-bold tracking-wider text-red-300", children: [
                  /* @__PURE__ */ jsxDEV(Target, { className: "w-3.5 h-3.5 text-red-400 animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 320,
                    columnNumber: 17
                  }, this),
                  "HOLO-EKRAN IV: AUTORYZACJA OGNIA"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 319,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "DEFCON 1" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 323,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 318,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "h-44 my-2 flex flex-col items-center justify-center p-2 text-center space-y-2.5", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-mono text-xs text-red-300 font-bold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-red-500" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 329,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "ROZKAZ: SPOPIELENIE 0 MS" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 330,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 328,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-black/80 border border-red-500/40 w-full text-[10px] font-mono text-slate-300", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "KLUCZ BEZPIECZEŃSTWA:" }, void 0, false, {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 335,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: isDefconArmed ? "text-red-400 font-bold" : "text-slate-500", children: isDefconArmed ? "ODBLOKOWANY" : "ZARYGLOWANY" }, void 0, false, {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 336,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 334,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between mt-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: "POTWIERDZENIE RADARU:" }, void 0, false, {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 341,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "POZYTYWNE" }, void 0, false, {
                      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                      lineNumber: 342,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 340,
                    columnNumber: 17
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 333,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: handleTriggerSalvoStrike,
                    disabled: activeSalvoStrike || !isDefconArmed,
                    className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-mono font-black text-xs shadow-lg shadow-red-950/80 border border-red-400/60 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2",
                    children: [
                      /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 351,
                        columnNumber: 17
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: activeSalvoStrike ? "SALWA W TOKU..." : "WYKONAJ UDERZENIE" }, void 0, false, {
                        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                        lineNumber: 352,
                        columnNumber: 17
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 346,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 327,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-red-500/20 text-[10px] font-mono flex items-center justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "PROTOKÓŁ: PURGE_100_COPIES" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 357,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-300 font-bold", children: "READY" }, void 0, false, {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 358,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 356,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 311,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 163,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-5xl mx-auto my-6 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full h-80 rounded-[50%] titanium-steel-surface border-4 border-slate-500/80 shadow-[0_25px_60px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden", children: [
          Array.from({ length: 12 }).map((_, i) => {
            const angle = i * 30 * (Math.PI / 180);
            const rx = 44;
            const ry = 42;
            const left = 50 + rx * Math.cos(angle);
            const top = 50 + ry * Math.sin(angle);
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute milspec-rivet z-10",
                style: { left: `${left}%`, top: `${top}%`, transform: "translate(-50%, -50%)" },
                title: `Stanowisko Operatorskie #${i + 1}`
              },
              i,
              false,
              {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 379,
                columnNumber: 17
              },
              this
            );
          }),
          /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-6 rounded-[50%] bg-[#0d131f] border-2 border-slate-700/80 shadow-inner flex items-center justify-center", children: [
            /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: "absolute inset-8 rounded-[50%] border border-dashed border-slate-600/50 flex items-center justify-center transition-transform duration-1000",
                style: { transform: `rotate(${tableRotationAngle}deg)` },
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute top-2 font-mono text-[9px] text-slate-400", children: "N 000°" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 396,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-2 font-mono text-[9px] text-slate-400", children: "S 180°" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 397,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute right-4 font-mono text-[9px] text-slate-400", children: "E 090°" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 398,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "absolute left-4 font-mono text-[9px] text-slate-400", children: "W 270°" }, void 0, false, {
                    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                    lineNumber: 399,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 392,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "relative w-44 h-44 rounded-full titanium-switch-socket border-4 border-slate-600 shadow-[0_0_35px_rgba(0,0,0,0.9)] flex items-center justify-center z-10", children: [
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/60",
                  style: { transform: `rotate(${tick * -2}deg)` }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 405,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute inset-5 rounded-full border border-cyan-300/40",
                  style: { transform: `rotate(${tick * 3}deg)` }
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 409,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("div", { className: `w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center ${isHoloEmitterActive ? "bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_35px_#22d3ee] animate-pulse" : "bg-zinc-800 border border-zinc-700"}`, children: /* @__PURE__ */ jsxDEV(Zap, { className: `w-8 h-8 ${isHoloEmitterActive ? "text-black animate-spin" : "text-slate-600"}` }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 420,
                columnNumber: 19
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 415,
                columnNumber: 17
              }, this),
              isHoloEmitterActive && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-64 w-48 h-64 holo-emitter-glow pointer-events-none" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 425,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 403,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 389,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 369,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-3 font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-black/80 px-4 py-1.5 rounded-full border border-slate-700 flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "STÓŁ SZTABOWY TYTAN-STAL MK-IX" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 433,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 434,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: "EMITER FOTONOWY: 940.8 THz" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 435,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 436,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "PROJEKCJA 3D: AKTYWNA" }, void 0, false, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 437,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 432,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 366,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 w-full mt-4 p-5 rounded-2xl titanium-steel-surface border-2 border-slate-600 shadow-2xl", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-700/80", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "font-mono font-black text-sm text-white tracking-wider uppercase flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 448,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Panel Sterowania Stołu Sztabowego (Przełączniki Tytanowo-Stalowe)" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 449,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 447,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 font-sans mt-0.5", children: "Rzeczywiste przełączniki hebelkowe z osłonami bezpieczeństwa, potencjometry radełkowane i wskaźniki stanu DEFCON." }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 451,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 446,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-slate-400", children: "Przezroczystość Hologramów:" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 457,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "range",
                min: "20",
                max: "100",
                value: hologramOpacity,
                onChange: (e) => setHologramOpacity(Number(e.target.value)),
                className: "w-32 accent-cyan-400 cursor-pointer"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 458,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-xs text-cyan-300 w-8 text-right font-bold", children: [
              hologramOpacity,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 466,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 456,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 445,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4", children: [
          /* @__PURE__ */ jsxDEV(
            TitaniumToggleSwitch,
            {
              label: "Zasilanie Emisji Hologramów",
              sublabel: "Załącza centralny emiter kwantowy i wiązki HUD",
              code: "SW-HOLO-PWR-01",
              checked: isHoloEmitterActive,
              onChange: setIsHoloEmitterActive
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 472,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            TitaniumToggleSwitch,
            {
              label: "Autoryzacja Ognia DEFCON 1",
              sublabel: "Podnieś osłonę, aby odryglować salwę spopielenia",
              code: "SW-DEFCON-ARM-02",
              hasSafetyCover: true,
              dangerLevel: "CRITICAL",
              checked: isDefconArmed,
              onChange: setIsDefconArmed
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 480,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl titanium-steel-surface border border-slate-600/60 shadow-xl flex items-center justify-between relative select-none", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 left-1.5 milspec-rivet" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 491,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute top-1.5 right-1.5 milspec-rivet" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 492,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 left-1.5 milspec-rivet" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 493,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "absolute bottom-1.5 right-1.5 milspec-rivet" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 494,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "pl-3.5 pr-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono text-[9px] text-slate-400 uppercase tracking-widest bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700/80", children: "ROT-AZIMUTH-03" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 497,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h4", { className: "font-mono font-bold text-xs text-slate-100 tracking-wide mt-1", children: "Obrót Stołu Sztabowego" }, void 0, false, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 500,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 font-sans mt-0.5", children: [
                "Kąt azymutu projekcji: ",
                tableRotationAngle,
                "°"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                lineNumber: 503,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 496,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pr-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setTableRotationAngle((a) => (a - 45 + 360) % 360),
                  className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-300 border border-slate-600 cursor-pointer",
                  children: "-45°"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 509,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setTableRotationAngle((a) => (a + 45) % 360),
                  className: "px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-cyan-300 border border-slate-600 cursor-pointer",
                  children: "+45°"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
                  lineNumber: 515,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 508,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 490,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 471,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-1.5 border-b border-slate-900 text-slate-500 text-[10px]", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "DZIENNIK ZDARZEŃ STOŁU DOWODZENIA (WAR ROOM AUDIT TRAIL)" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 528,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: "100% OPERATIONAL" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 529,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 527,
            columnNumber: 13
          }, this),
          strikeLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 font-bold", children: "»" }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 533,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: idx === 0 ? "text-white font-bold" : "text-slate-400", children: log }, void 0, false, {
              fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
              lineNumber: 534,
              columnNumber: 17
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
            lineNumber: 532,
            columnNumber: 15
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
          lineNumber: 526,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
        lineNumber: 444,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
      lineNumber: 143,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/TacticalWarRoomHoloTable.tsx",
    lineNumber: 87,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhY3RpY2FsV2FyUm9vbUhvbG9UYWJsZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBTaGllbGRDaGVjaywgU2hpZWxkQWxlcnQsIFphcCwgUmFkaW8sIFNrdWxsLCBBY3Rpdml0eSwgXG4gIENwdSwgVGFyZ2V0LCBGbGFtZSwgTGF5ZXJzLCBNYXhpbWl6ZTIsIE1pbmltaXplMiwgRXllLFxuICBTcGFya2xlcywgUmVmcmVzaEN3LCBQb3dlciwgRGlzYywgTG9jaywgVW5sb2NrLCBBbGVydFRyaWFuZ2xlLFxuICBWb2x1bWUyLCBWb2x1bWVYLCBDaGVja0NpcmNsZTIsIFRlcm1pbmFsLCBTbGlkZXJzLCBDaGV2cm9uUmlnaHRcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFRpdGFuaXVtVG9nZ2xlU3dpdGNoIH0gZnJvbSAnLi9UaXRhbml1bU1pbGl0YXJ5U3dpdGNoJztcblxuZXhwb3J0IGNvbnN0IFRhY3RpY2FsV2FyUm9vbUhvbG9UYWJsZTogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIC8vIE1hc3RlciBUYWJsZSBTdGF0ZVxuICBjb25zdCBbaXNIb2xvRW1pdHRlckFjdGl2ZSwgc2V0SXNIb2xvRW1pdHRlckFjdGl2ZV0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW2hvbG9UaGVtZSwgc2V0SG9sb1RoZW1lXSA9IHVzZVN0YXRlPCdjeWFuJyB8ICdlbWVyYWxkJyB8ICdhbWJlcicgfCAnY3JpbXNvbic+KCdjeWFuJyk7XG4gIGNvbnN0IFtpc0RlZmNvbkFybWVkLCBzZXRJc0RlZmNvbkFybWVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3RhYmxlUm90YXRpb25BbmdsZSwgc2V0VGFibGVSb3RhdGlvbkFuZ2xlXSA9IHVzZVN0YXRlPG51bWJlcj4oMTUpO1xuICBjb25zdCBbaG9sb2dyYW1PcGFjaXR5LCBzZXRIb2xvZ3JhbU9wYWNpdHldID0gdXNlU3RhdGU8bnVtYmVyPig4NSk7XG4gIGNvbnN0IFtzZWxlY3RlZFNjcmVlbklkLCBzZXRTZWxlY3RlZFNjcmVlbklkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KCdzY3JlZW4tYWxwaGEnKTtcbiAgY29uc3QgW2FjdGl2ZVNhbHZvU3RyaWtlLCBzZXRBY3RpdmVTYWx2b1N0cmlrZV0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtzdHJpa2VMb2dzLCBzZXRTdHJpa2VMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgJ1NZU1RFTSBHT1RPV0/FmkNJIEJPSk9XRUo6IFN0w7PFgiBzenRhYm93eSB6c3luY2hyb25pem93YW55IHogZW1pdGVyZW0gOTQwLjggVEh6LicsXG4gICAgJ1BST0pFS0NKQSBIT0xPR1JBTU9XQTogNCBla3JhbnkgcHJ6ZXpyb2N6eXN0ZSB1c3RhYmlsaXpvd2FuZSB3IHByemVzdHJ6ZW5pLidcbiAgXSk7XG5cbiAgLy8gQXV0b21hdGVkIHJvdGF0aW9uIHRpY2tlciBmb3IgaG9sb2dyYXBoaWMgZ2xvYmUgJiBlbnRpdHlcbiAgY29uc3QgW3RpY2ssIHNldFRpY2tdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHNldFRpY2sodCA9PiAodCArIDEpICUgMzYwKTtcbiAgICB9LCA0MCk7XG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgdGhlbWVDb2xvcnMgPSB7XG4gICAgY3lhbjoge1xuICAgICAgYm9yZGVyOiAnYm9yZGVyLWN5YW4tNDAwLzYwJyxcbiAgICAgIHRleHQ6ICd0ZXh0LWN5YW4tMzAwJyxcbiAgICAgIGJnR2xvdzogJ3JnYmEoNiwgMTgyLCAyMTIsIDAuMjUpJyxcbiAgICAgIGFjY2VudDogJyMyMmQzZWUnLFxuICAgICAgZ2xvd1NoYWRvdzogJ3NoYWRvdy1bMF8wXzI1cHhfcmdiYSgzNCwyMTEsMjM4LDAuMzUpXScsXG4gICAgICBiZWFtR3JhZGllbnQ6ICdmcm9tLWN5YW4tNTAwLzQwIHZpYS1za3ktNTAwLzEwIHRvLXRyYW5zcGFyZW50J1xuICAgIH0sXG4gICAgZW1lcmFsZDoge1xuICAgICAgYm9yZGVyOiAnYm9yZGVyLWVtZXJhbGQtNDAwLzYwJyxcbiAgICAgIHRleHQ6ICd0ZXh0LWVtZXJhbGQtMzAwJyxcbiAgICAgIGJnR2xvdzogJ3JnYmEoMTYsIDE4NSwgMTI5LCAwLjI1KScsXG4gICAgICBhY2NlbnQ6ICcjMzRkMzk5JyxcbiAgICAgIGdsb3dTaGFkb3c6ICdzaGFkb3ctWzBfMF8yNXB4X3JnYmEoNTIsMjExLDE1MywwLjM1KV0nLFxuICAgICAgYmVhbUdyYWRpZW50OiAnZnJvbS1lbWVyYWxkLTUwMC80MCB2aWEtdGVhbC01MDAvMTAgdG8tdHJhbnNwYXJlbnQnXG4gICAgfSxcbiAgICBhbWJlcjoge1xuICAgICAgYm9yZGVyOiAnYm9yZGVyLWFtYmVyLTQwMC82MCcsXG4gICAgICB0ZXh0OiAndGV4dC1hbWJlci0zMDAnLFxuICAgICAgYmdHbG93OiAncmdiYSgyNDUsIDE1OCwgMTEsIDAuMjUpJyxcbiAgICAgIGFjY2VudDogJyNmYmJmMjQnLFxuICAgICAgZ2xvd1NoYWRvdzogJ3NoYWRvdy1bMF8wXzI1cHhfcmdiYSgyNTEsMTkxLDM2LDAuMzUpXScsXG4gICAgICBiZWFtR3JhZGllbnQ6ICdmcm9tLWFtYmVyLTUwMC80MCB2aWEteWVsbG93LTUwMC8xMCB0by10cmFuc3BhcmVudCdcbiAgICB9LFxuICAgIGNyaW1zb246IHtcbiAgICAgIGJvcmRlcjogJ2JvcmRlci1yZWQtNTAwLzcwJyxcbiAgICAgIHRleHQ6ICd0ZXh0LXJlZC0zMDAnLFxuICAgICAgYmdHbG93OiAncmdiYSgyMzksIDY4LCA2OCwgMC4zKScsXG4gICAgICBhY2NlbnQ6ICcjZjg3MTcxJyxcbiAgICAgIGdsb3dTaGFkb3c6ICdzaGFkb3ctWzBfMF8yNXB4X3JnYmEoMjQ4LDExMywxMTMsMC40KV0nLFxuICAgICAgYmVhbUdyYWRpZW50OiAnZnJvbS1yZWQtNjAwLzUwIHZpYS1yb3NlLTUwMC8xNSB0by10cmFuc3BhcmVudCdcbiAgICB9XG4gIH1baG9sb1RoZW1lXTtcblxuICBjb25zdCBoYW5kbGVUcmlnZ2VyU2Fsdm9TdHJpa2UgPSAoKSA9PiB7XG4gICAgc2V0QWN0aXZlU2Fsdm9TdHJpa2UodHJ1ZSk7XG4gICAgc2V0U3RyaWtlTG9ncyhwcmV2ID0+IFtcbiAgICAgIGBbU0FMVk8gU1RSSUtFXSBBdXRvcnl6YWNqYSBvZ25pYSBmb3Rvbm93ZWdvIERFRkNPTiAxIHByemV6IHN0w7PFgiBkb3dvZHplbmlhIWAsXG4gICAgICBgW1BST0NFUyBHTklEQV0gWmxva2FsaXpvd2FubyBrb29yZHluYXR5IEhXTkQ6IDB4N0ZGRjkyMTAuIFJvenBvY3rEmXRvIG5hdHljaG1pYXN0b3fEhSBkZWthcGl0YWNqxJkuYCxcbiAgICAgIGBbU1RBVFVTIEJBUklFUlldIEVtaXNqYSA5NDAuOCBUSHogc3BvcGllbGnFgmEga2xhc3RyeSBwYW1pxJljaSB3cm9naWVnbyBvdmVybGF5LmAsXG4gICAgICAuLi5wcmV2LnNsaWNlKDAsIDUpXG4gICAgXSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldEFjdGl2ZVNhbHZvU3RyaWtlKGZhbHNlKTtcbiAgICAgIHNldFN0cmlrZUxvZ3MocHJldiA9PiBbXG4gICAgICAgIGBbUE9UV0lFUkRaRU5JRV0gQ2VsIHpuZXV0cmFsaXpvd2FueS4gMTAwJSBpbnRlZ3JhbG5vxZtjaSBzdGFjamkgcm9ib2N6ZWouYCxcbiAgICAgICAgLi4ucHJldlxuICAgICAgXSk7XG4gICAgfSwgMzIwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb3AgTWlsaXRhcnkgQ29tbWFuZCBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCB0aXRhbml1bS1zdGVlbC1zdXJmYWNlIGJvcmRlciBib3JkZXItc2xhdGUtNjAwLzgwIHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIHsvKiBIZXggUml2ZXRzIGFsb25nIGNvcm5lcnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgbGVmdC0yIG1pbHNwZWMtcml2ZXRcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0yIHJpZ2h0LTIgbWlsc3BlYy1yaXZldFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTIgbGVmdC0yIG1pbHNwZWMtcml2ZXRcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTIgbWlsc3BlYy1yaXZldFwiIC8+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcmVsYXRpdmUgei0xMCBwbC0yXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzEwcHhdIHB4LTIgcHktMC41IHJvdW5kZWQgYmctYmxhY2svODAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIGZvbnQtYm9sZCB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgIE1JTC1TVEQtODEwSCAvLyBTVEFOQUcgNDU2OVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWFtYmVyLTk1MC84MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC81MCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBERUZDT04gMSBUQUNUSUNBTCBXQVIgUk9PTVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LVsxMHB4XSBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMFwiPlxuICAgICAgICAgICAgICAgIENBR0U6IDFLODkyIOKAoiBTRUNUT1ItQUxQSEFcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmb250LW1vbm8gdHJhY2tpbmctd2lkZSBtdC0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4+U3TDs8WCIEtvbmZlcmVuY3lqbnkgRG93w7NkenR3YSAmIEVrcmFueSBIb2xvZ3JhbW93ZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG10LTEgbWF4LXctM3hsIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBPa3LEhWfFgnkgc3TDs8WCIHN6dGFib3d5IHogcG9sZXJvd2FuZWdvIHR5dGFudSBpIHN0YWxpIHBhbmNlcm5laiB6IGNlbnRyYWxueW0gZW1pdGVyZW0gb3B0eWN6bnltIHJ6dWNhasSFY3ltIHcgcHJ6ZXN0cnplxYQgPHN0cm9uZz53aWVsb3DFgmFzemN6eXpub3dlIHByemV6cm9jenlzdGUgZWtyYW55IGhvbG9ncmFtb3dlPC9zdHJvbmc+LiBaYXBld25pYSBwZcWCbsSFIHRlbGVtZXRyacSZIG9yYml0YWxuxIUsIGRla29tcGlsYWNqxJkgd3JvZ2ljaCBwcm9jZXPDs3cgaSB0YWt0eWN6bsSFIGF1dG9yeXphY2rEmSB1Ym9qdS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBRdWljayB0aGVtZSB0b2dnbGVzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIG1yLTFcIj5TcGVrdHJ1bSBQcm9qZWtjamk6PC9zcGFuPlxuICAgICAgICAgICAgeyhbJ2N5YW4nLCAnZW1lcmFsZCcsICdhbWJlcicsICdjcmltc29uJ10gYXMgY29uc3QpLm1hcChjb2xvciA9PiAoXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBrZXk9e2NvbG9yfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEhvbG9UaGVtZShjb2xvcil9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBmb250LW1vbm8gdGV4dC1bMTFweF0gZm9udC1ib2xkIHVwcGVyY2FzZSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgICAgaG9sb1RoZW1lID09PSBjb2xvciBcbiAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtd2hpdGUgYm9yZGVyLTIgYm9yZGVyLXdoaXRlLzgwIHNoYWRvdy1sZycgXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLWJsYWNrLzYwIHRleHQtc2xhdGUtNDAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y29sb3IgPT09ICdjeWFuJyAmJiAnQ3lqYW4gNDgwbm0nfVxuICAgICAgICAgICAgICAgIHtjb2xvciA9PT0gJ2VtZXJhbGQnICYmICdTem1hcmFnZCA1MzJubSd9XG4gICAgICAgICAgICAgICAge2NvbG9yID09PSAnYW1iZXInICYmICdCdXJzenR5biA1OTBubSd9XG4gICAgICAgICAgICAgICAge2NvbG9yID09PSAnY3JpbXNvbicgJiYgJ0thcm1pbiA2NTBubSd9XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFdhciBSb29tICYgVGFibGUgQXJlbmEgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLVs2NDBweF0gcm91bmRlZC0zeGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLVsjMDYwODBkXSB2aWEtWyMwYjEwMThdIHRvLVsjMDQwNjBhXSBib3JkZXItMiBib3JkZXItc2xhdGUtNzAwLzgwIHNoYWRvdy0yeGwgb3ZlcmZsb3ctaGlkZGVuIHAtNCBzbTpwLTggZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBPdmVyaGVhZCBNaWxpdGFyeSBSb29tIEdyaWQgJiBDZWlsaW5nIFNwb3RsaWdodHMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBwb2ludGVyLWV2ZW50cy1ub25lIG9wYWNpdHktMjBcIj5cbiAgICAgICAgICA8c3ZnIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgICAgPHBhdHRlcm4gaWQ9XCJ3YXJyb29tLWNlaWxpbmctZ3JpZFwiIHdpZHRoPVwiNDBcIiBoZWlnaHQ9XCI0MFwiIHBhdHRlcm5Vbml0cz1cInVzZXJTcGFjZU9uVXNlXCI+XG4gICAgICAgICAgICAgICAgPHBhdGggZD1cIk0gNDAgMCBMIDAgMCAwIDQwXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpXCIgc3Ryb2tlV2lkdGg9XCIwLjhcIiAvPlxuICAgICAgICAgICAgICA8L3BhdHRlcm4+XG4gICAgICAgICAgICA8L2RlZnM+XG4gICAgICAgICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsbD1cInVybCgjd2Fycm9vbS1jZWlsaW5nLWdyaWQpXCIgLz5cbiAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEFtYmllbnQgVG9wIExpZ2h0IEJlYW0gc2hpbmluZyBkb3duIG9uIHRoZSB0YWJsZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BhYnNvbHV0ZSB0b3AtMCBsZWZ0LTEvMiAtdHJhbnNsYXRlLXgtMS8yIHctMy80IGgtOTYgYmctZ3JhZGllbnQtdG8tYiAke3RoZW1lQ29sb3JzLmJlYW1HcmFkaWVudH0gYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZSB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi01MDBgfSAvPlxuXG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogNCBGTE9BVElORyBUUkFOU1BBUkVOVCBIT0xPR1JBUEhJQyBTQ1JFRU5TIEFCT1ZFIFRIRSBUQUJMRSAgICAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTIwIHctZnVsbCBncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00IG1iLTggaG9sby1zY3JlZW4tY29udGFpbmVyXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFNDUkVFTiAxOiBPUkJJVEFMIFRIRUFURVIgJiBUSFJFQVQgTUFQICovfVxuICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNjcmVlbklkKCdzY3JlZW4tYWxwaGEnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGhvbG8tZ2xhc3MtcGFuZWwgcm91bmRlZC0yeGwgcC00IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBzZWxlY3RlZFNjcmVlbklkID09PSAnc2NyZWVuLWFscGhhJyA/IGAke3RoZW1lQ29sb3JzLmJvcmRlcn0gJHt0aGVtZUNvbG9ycy5nbG93U2hhZG93fSBzY2FsZS0xMDJgIDogJ2JvcmRlci1zbGF0ZS03MDAvNjAgb3BhY2l0eS04MCBob3ZlcjpvcGFjaXR5LTEwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgc3R5bGU9e3sgb3BhY2l0eTogaXNIb2xvRW1pdHRlckFjdGl2ZSA/IGhvbG9ncmFtT3BhY2l0eSAvIDEwMCA6IDAuMDggfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1jeWFuLTUwMC8zMCB0ZXh0LVsxMHB4XSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1jeWFuLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICBIT0xPLUVLUkFOIEk6IFRFQVRSIE9SQklUQUxOWVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+Tk9SQUQtU0VDLUxJTks8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFdpcmVmcmFtZSBSb3RhdGluZyBHbG9iZSAmIFJhZGFyIFN3ZWVwICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTQ0IG15LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0zMiBoLTMyIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwLzQwIHJlbGF0aXZlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1baW5zZXRfMF8wXzE1cHhfcmdiYSg2LDE4MiwyMTIsMC4zKV1cIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RpY2t9ZGVnKWAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsvKiBMYXQvTG9uZyBSaW5ncyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTIgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItZGFzaGVkIGJvcmRlci1jeWFuLTQwMC8zMFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC14LTAgdG9wLTEvMiBoLTAuNSBiZy1jeWFuLTQwMC80MFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC15LTAgbGVmdC0xLzIgdy0wLjUgYmctY3lhbi00MDAvNDBcIiAvPlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHsvKiBIb3N0aWxlIFRhcmdldCBQaW5nICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTYgcmlnaHQtOCB3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctcmVkLTUwMCBhbmltYXRlLXBpbmdcIiAvPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTYgcmlnaHQtOCB3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1yZWQtNTAwXCIgLz5cblxuICAgICAgICAgICAgICAgIHsvKiBGcmllbmRseSBCYXNlIFVuaXQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tNiBsZWZ0LTggdy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctY3lhbi0zMDAgc2hhZG93LVswXzBfOHB4XyMyMmQzZWVdXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFJhZGFyIFN3ZWVwIE5lZWRsZSAqL31cbiAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHBvaW50ZXItZXZlbnRzLW5vbmVcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RpY2sgKiAyfWRlZylgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMzYgaC0wLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXRyYW5zcGFyZW50IHRvLWN5YW4tMzAwIHNoYWRvdy1bMF8wXzhweF8jMjJkM2VlXVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEgcmlnaHQtMiB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tNDAwLzgwXCI+XG4gICAgICAgICAgICAgICAgTEFUOiA1Mi4yMjk3wrAgTiB8IExPTjogMjEuMDEyMsKwIEVcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1jeWFuLTUwMC8yMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlNUQVRVUzogxZpMRURaRU5JRSBDRUxVPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPjEwMCUgTE9DS0VEPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU0NSRUVOIDI6IDNEIEFOQVRPTVkgT0YgR05JREEgLyBIT1NUSUxFIFBST0NFU1MgKi99XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkU2NyZWVuSWQoJ3NjcmVlbi1iZXRhJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bob2xvLWdsYXNzLXBhbmVsIHJvdW5kZWQtMnhsIHAtNCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRTY3JlZW5JZCA9PT0gJ3NjcmVlbi1iZXRhJyA/IGAke3RoZW1lQ29sb3JzLmJvcmRlcn0gJHt0aGVtZUNvbG9ycy5nbG93U2hhZG93fSBzY2FsZS0xMDJgIDogJ2JvcmRlci1zbGF0ZS03MDAvNjAgb3BhY2l0eS04MCBob3ZlcjpvcGFjaXR5LTEwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgc3R5bGU9e3sgb3BhY2l0eTogaXNIb2xvRW1pdHRlckFjdGl2ZSA/IGhvbG9ncmFtT3BhY2l0eSAvIDEwMCA6IDAuMDggfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQtWzEwcHhdIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZvbnQtYm9sZCB0cmFja2luZy13aWRlciB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICBIT0xPLUVLUkFOIElJOiBBTkFUT01JQSBHTklEWVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+RElTQVNTRU1CTFk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIDNEIFdpcmVmcmFtZSBNYWx3YXJlIFNrZWxldG9uIE1vZGVsICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBoLTQ0IG15LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuIGZvbnQtbW9ubyB0ZXh0LVs5cHhdXCI+XG4gICAgICAgICAgICAgIHsvKiBSb3RhdGluZyBXaXJlZnJhbWUgSGV4YWdvbiBDb3JlICovfVxuICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctMjggaC0yOCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNTAgcm91bmRlZC0yeGwgcmVsYXRpdmUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgc2hhZG93LVswXzBfMjBweF9yZ2JhKDE2OCw4NSwyNDcsMC4zKV1cIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZVkoJHt0aWNrICogMS41fWRlZykgcm90YXRlWCgyNWRlZylgIH19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTMgYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLXJlZC01MDAvNjAgcm91bmRlZC14bFwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlciB0ZXh0LXJlZC00MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PltIV05EX0hPT0tdPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzdweF0gdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPlBJRDogODk0MDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogU3RyZWFtaW5nIERpc2Fzc2VtYmx5IE92ZXJsYXkgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQteC0yIGJvdHRvbS0xIGJnLWJsYWNrLzYwIHAtMS41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzMwIHRleHQtWzhweF0gdGV4dC1wdXJwbGUtMjAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdj4weDdGRkYwMDEwOiBQVVNIIFJCUDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+MHg3RkZGMDAxODogQ0FMTCBOdFN1c3BlbmRQcm9jZXNzPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj4weDdGRkYwMDIwOiBSRVQgW1BVUkdFRF08L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1wdXJwbGUtNTAwLzIwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+RU5UUk9QSUE6IDcuOTQgLyA4LjAwPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1ib2xkXCI+WkRFS0FQSVRPV0FOTzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNDUkVFTiAzOiA5NDAuOCBUSHogUEhPVE9OIERPTUUgJiBIQVJNT05JQyBTSElFTEQgKi99XG4gICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkU2NyZWVuSWQoJ3NjcmVlbi1nYW1tYScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgaG9sby1nbGFzcy1wYW5lbCByb3VuZGVkLTJ4bCBwLTQgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tMzAwIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIHNlbGVjdGVkU2NyZWVuSWQgPT09ICdzY3JlZW4tZ2FtbWEnID8gYCR7dGhlbWVDb2xvcnMuYm9yZGVyfSAke3RoZW1lQ29sb3JzLmdsb3dTaGFkb3d9IHNjYWxlLTEwMmAgOiAnYm9yZGVyLXNsYXRlLTcwMC82MCBvcGFjaXR5LTgwIGhvdmVyOm9wYWNpdHktMTAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICBzdHlsZT17eyBvcGFjaXR5OiBpc0hvbG9FbWl0dGVyQWN0aXZlID8gaG9sb2dyYW1PcGFjaXR5IC8gMTAwIDogMC4wOCB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTIgYm9yZGVyLWIgYm9yZGVyLWluZGlnby01MDAvMzAgdGV4dC1bMTBweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIHRleHQtaW5kaWdvLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgIEhPTE8tRUtSQU4gSUlJOiBUQVJDWkEgOTQwLjggVEh6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5GT1JDRUZJRUxEPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBSb3RhdGluZyAzRCBFbmVyZ3kgRG9tZSBTaW5lIFdhdmUgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIGgtNDQgbXktMiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsXCIgdmlld0JveD1cIjAgMCAyMDAgMTIwXCI+XG4gICAgICAgICAgICAgICAgey8qIENvbmNlbnRyaWMgRWxsaXB0aWNhbCBGb3JjZWZpZWxkIFJpbmdzICovfVxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTAwXCIgY3k9XCI2MFwiIHJ4PVwiODBcIiByeT1cIjQwXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJyZ2JhKDk5LDEwMiwyNDEsMC4zKVwiIHN0cm9rZVdpZHRoPVwiMVwiIHN0cm9rZURhc2hhcnJheT1cIjQgMlwiIC8+XG4gICAgICAgICAgICAgICAgPGVsbGlwc2UgY3g9XCIxMDBcIiBjeT1cIjYwXCIgcng9XCI2MFwiIHJ5PVwiMjVcIiBmaWxsPVwibm9uZVwiIHN0cm9rZT1cInJnYmEoOTksMTAyLDI0MSwwLjUpXCIgc3Ryb2tlV2lkdGg9XCIxLjJcIiAvPlxuICAgICAgICAgICAgICAgIDxlbGxpcHNlIGN4PVwiMTAwXCIgY3k9XCI2MFwiIHJ4PVwiMzVcIiByeT1cIjEyXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJyZ2JhKDEyOSwxNDAsMjQ4LDAuOClcIiBzdHJva2VXaWR0aD1cIjEuNVwiIC8+XG5cbiAgICAgICAgICAgICAgICB7LyogQW5pbWF0ZWQgU2luZSBSZXNvbmFuY2UgV2F2ZSAqL31cbiAgICAgICAgICAgICAgICA8cGF0aCBcbiAgICAgICAgICAgICAgICAgIGQ9e2BNIDEwIDYwIFEgNTUgJHs2MCAtIE1hdGguc2luKHRpY2sgKiAwLjEpICogMjB9LCAxMDAgNjAgVCAxOTAgNjBgfVxuICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIiBcbiAgICAgICAgICAgICAgICAgIHN0cm9rZT1cIiM4MThjZjhcIiBcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMlwiIFxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgbGVmdC0yIHRleHQtWzhweF0gZm9udC1tb25vIHRleHQtaW5kaWdvLTMwMCBiZy1ibGFjay82MCBweC0xIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICBNT0M6IDIsNDUwIE1XXG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS0yIHJpZ2h0LTIgdGV4dC1bOHB4XSBmb250LW1vbm8gdGV4dC1pbmRpZ28tMzAwIGJnLWJsYWNrLzYwIHB4LTEgcm91bmRlZFwiPlxuICAgICAgICAgICAgICAgIFBVTFNZOiAxMCBQUE1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1pbmRpZ28tNTAwLzIwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4+QklFR1VOT1dPxZrEhjogSEFSTU9OSUNaTkE8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+MTAwJSBBS1RZV05BPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU0NSRUVOIDQ6IERFRkNPTiAxIERFQ0lTSU9OICYgU0FMVk8gVFJJR0dFUiAqL31cbiAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRTY3JlZW5JZCgnc2NyZWVuLWRlbHRhJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2Bob2xvLWdsYXNzLXBhbmVsIHJvdW5kZWQtMnhsIHAtNCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgc2VsZWN0ZWRTY3JlZW5JZCA9PT0gJ3NjcmVlbi1kZWx0YScgPyBgJHt0aGVtZUNvbG9ycy5ib3JkZXJ9ICR7dGhlbWVDb2xvcnMuZ2xvd1NoYWRvd30gc2NhbGUtMTAyYCA6ICdib3JkZXItc2xhdGUtNzAwLzYwIG9wYWNpdHktODAgaG92ZXI6b3BhY2l0eS0xMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHN0eWxlPXt7IG9wYWNpdHk6IGlzSG9sb0VtaXR0ZXJBY3RpdmUgPyBob2xvZ3JhbU9wYWNpdHkgLyAxMDAgOiAwLjA4IH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItcmVkLTUwMC8zMCB0ZXh0LVsxMHB4XSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgdGV4dC1yZWQtMzAwXCI+XG4gICAgICAgICAgICAgICAgPFRhcmdldCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJlZC00MDAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICBIT0xPLUVLUkFOIElWOiBBVVRPUllaQUNKQSBPR05JQVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+REVGQ09OIDE8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFRhY3RpY2FsIFN0cmlrZSBUcmlnZ2VyIEludGVyZmFjZSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC00NCBteS0yIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtMiB0ZXh0LWNlbnRlciBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtcmVkLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+Uk9aS0FaOiBTUE9QSUVMRU5JRSAwIE1TPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLWJsYWNrLzgwIGJvcmRlciBib3JkZXItcmVkLTUwMC80MCB3LWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S0xVQ1ogQkVaUElFQ1pFxYNTVFdBOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17aXNEZWZjb25Bcm1lZCA/ICd0ZXh0LXJlZC00MDAgZm9udC1ib2xkJyA6ICd0ZXh0LXNsYXRlLTUwMCd9PlxuICAgICAgICAgICAgICAgICAgICB7aXNEZWZjb25Bcm1lZCA/ICdPREJMT0tPV0FOWScgOiAnWkFSWUdMT1dBTlknfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UE9UV0lFUkRaRU5JRSBSQURBUlU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlBPWllUWVdORTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRyaWdnZXJTYWx2b1N0cmlrZX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17YWN0aXZlU2Fsdm9TdHJpa2UgfHwgIWlzRGVmY29uQXJtZWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNjAwIHZpYS1yb3NlLTYwMCB0by1yZWQtNzAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1yb3NlLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQteHMgc2hhZG93LWxnIHNoYWRvdy1yZWQtOTUwLzgwIGJvcmRlciBib3JkZXItcmVkLTQwMC82MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTQwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPnthY3RpdmVTYWx2b1N0cmlrZSA/ICdTQUxXQSBXIFRPS1UuLi4nIDogJ1dZS09OQUogVURFUlpFTklFJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItcmVkLTUwMC8yMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlBST1RPS8OTxYE6IFBVUkdFXzEwMF9DT1BJRVM8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMCBmb250LWJvbGRcIj5SRUFEWTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgey8qIFRIRSBCUlVTSEVEIFRJVEFOSVVNLVNURUVMIENPTkZFUkVOQ0UgVEFCTEUgKFNUw5PFgSBTWlRBQk9XWSkgICAgICAgICAgICAgICovfVxuICAgICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgbWF4LXctNXhsIG14LWF1dG8gbXktNiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBUYWJsZSBDaGFtZmVyZWQgVGl0YW5pdW0gUmltICYgU3VyZmFjZSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBoLTgwIHJvdW5kZWQtWzUwJV0gdGl0YW5pdW0tc3RlZWwtc3VyZmFjZSBib3JkZXItNCBib3JkZXItc2xhdGUtNTAwLzgwIHNoYWRvdy1bMF8yNXB4XzYwcHhfcmdiYSgwLDAsMCwwLjk1KV0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHsvKiBIZXggQm9sdCBSaXZldHMgYXJvdW5kIHRoZSB0YWJsZSByaW0gKDEyIHN0YXRpb25zKSAqL31cbiAgICAgICAgICAgIHtBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMiB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYW5nbGUgPSAoaSAqIDMwKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICAgICAgICAgICAgY29uc3QgcnggPSA0NDsgLy8gcGVyY2VudCByYWRpdXMgeFxuICAgICAgICAgICAgICBjb25zdCByeSA9IDQyOyAvLyBwZXJjZW50IHJhZGl1cyB5XG4gICAgICAgICAgICAgIGNvbnN0IGxlZnQgPSA1MCArIHJ4ICogTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICAgICAgICBjb25zdCB0b3AgPSA1MCArIHJ5ICogTWF0aC5zaW4oYW5nbGUpO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBrZXk9e2l9IFxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgbWlsc3BlYy1yaXZldCB6LTEwXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6IGAke2xlZnR9JWAsIHRvcDogYCR7dG9wfSVgLCB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknIH19XG4gICAgICAgICAgICAgICAgICB0aXRsZT17YFN0YW5vd2lza28gT3BlcmF0b3Jza2llICMke2kgKyAxfWB9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuXG4gICAgICAgICAgICB7LyogVGFjdGljYWwgQ2FyYm9uIEZpYmVyIFdlYXZlIElubmVyIFRhYmxlIFRvcCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtNiByb3VuZGVkLVs1MCVdIGJnLVsjMGQxMzFmXSBib3JkZXItMiBib3JkZXItc2xhdGUtNzAwLzgwIHNoYWRvdy1pbm5lciBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIENvbmNlbnRyaWMgVGFjdGljYWwgQ29tcGFzcyAvIEF6aW11dGggUmluZyAqL31cbiAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC04IHJvdW5kZWQtWzUwJV0gYm9yZGVyIGJvcmRlci1kYXNoZWQgYm9yZGVyLXNsYXRlLTYwMC81MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi0xMDAwXCJcbiAgICAgICAgICAgICAgICBzdHlsZT17eyB0cmFuc2Zvcm06IGByb3RhdGUoJHt0YWJsZVJvdGF0aW9uQW5nbGV9ZGVnKWAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTIgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5OIDAwMMKwPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMiBmb250LW1vbm8gdGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlMgMTgwwrA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHJpZ2h0LTQgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5FIDA5MMKwPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBsZWZ0LTQgZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDBcIj5XIDI3MMKwPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBDZW50cmFsIEhvbG9ncmFtIFByb2plY3RvciBPcHRpY2FsIFdlbGwgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy00NCBoLTQ0IHJvdW5kZWQtZnVsbCB0aXRhbml1bS1zd2l0Y2gtc29ja2V0IGJvcmRlci00IGJvcmRlci1zbGF0ZS02MDAgc2hhZG93LVswXzBfMzVweF9yZ2JhKDAsMCwwLDAuOSldIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHotMTBcIj5cbiAgICAgICAgICAgICAgICB7LyogUm90YXRpbmcgT3B0aWNhbCBMZW5zZXMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTIgcm91bmRlZC1mdWxsIGJvcmRlci0yIGJvcmRlci1kYXNoZWQgYm9yZGVyLWN5YW4tNDAwLzYwXCJcbiAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRyYW5zZm9ybTogYHJvdGF0ZSgke3RpY2sgKiAtMn1kZWcpYCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTUgcm91bmRlZC1mdWxsIGJvcmRlciBib3JkZXItY3lhbi0zMDAvNDBcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiBgcm90YXRlKCR7dGljayAqIDN9ZGVnKWAgfX1cbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgey8qIENvcmUgTGFzZXIgRW1pdHRlciBMZW5zICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgdy0yMCBoLTIwIHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgIGlzSG9sb0VtaXR0ZXJBY3RpdmUgXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1jeWFuLTQwMCB2aWEtc2t5LTMwMCB0by1ibHVlLTUwMCBzaGFkb3ctWzBfMF8zNXB4XyMyMmQzZWVdIGFuaW1hdGUtcHVsc2UnIFxuICAgICAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXppbmMtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPXtgdy04IGgtOCAke2lzSG9sb0VtaXR0ZXJBY3RpdmUgPyAndGV4dC1ibGFjayBhbmltYXRlLXNwaW4nIDogJ3RleHQtc2xhdGUtNjAwJ31gfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIEhvbG9ncmFwaGljIFByb2plY3Rpb24gQ29sdW1uIHJpc2luZyB1cCAqL31cbiAgICAgICAgICAgICAgICB7aXNIb2xvRW1pdHRlckFjdGl2ZSAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtNjQgdy00OCBoLTY0IGhvbG8tZW1pdHRlci1nbG93IHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVGFibGUgU3RlbmNpbGVkIFNwZWMgUGxhcXVlICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBmb250LW1vbm8gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBiZy1ibGFjay84MCBweC00IHB5LTEuNSByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxzcGFuPlNUw5PFgSBTWlRBQk9XWSBUWVRBTi1TVEFMIE1LLUlYPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj5FTUlURVIgRk9UT05PV1k6IDk0MC44IFRIejwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5QUk9KRUtDSkEgM0Q6IEFLVFlXTkE8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgICB7LyogVEFDVElMRSBIQVJEV0FSRSBDT05UUk9MIENPTlNPTEUgV0lUSCBUSVRBTklVTS1TVEVFTCBTV0lUQ0hFUyAgICAgICAgICAgICAqL31cbiAgICAgICAgey8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCB3LWZ1bGwgbXQtNCBwLTUgcm91bmRlZC0yeGwgdGl0YW5pdW0tc3RlZWwtc3VyZmFjZSBib3JkZXItMiBib3JkZXItc2xhdGUtNjAwIHNoYWRvdy0yeGxcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS03MDAvODBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXNtIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZXIgdXBwZXJjYXNlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFNsaWRlcnMgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5QYW5lbCBTdGVyb3dhbmlhIFN0b8WCdSBTenRhYm93ZWdvIChQcnplxYLEhWN6bmlraSBUeXRhbm93by1TdGFsb3dlKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS0zMDAgZm9udC1zYW5zIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIFJ6ZWN6eXdpc3RlIHByemXFgsSFY3puaWtpIGhlYmVsa293ZSB6IG9zxYJvbmFtaSBiZXpwaWVjemXFhHN0d2EsIHBvdGVuY2pvbWV0cnkgcmFkZcWCa293YW5lIGkgd3NrYcW6bmlraSBzdGFudSBERUZDT04uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+UHJ6ZXpyb2N6eXN0b8WbxIcgSG9sb2dyYW3Ds3c6PC9zcGFuPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwicmFuZ2VcIlxuICAgICAgICAgICAgICAgIG1pbj1cIjIwXCJcbiAgICAgICAgICAgICAgICBtYXg9XCIxMDBcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtob2xvZ3JhbU9wYWNpdHl9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRIb2xvZ3JhbU9wYWNpdHkoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0zMiBhY2NlbnQtY3lhbi00MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gdGV4dC14cyB0ZXh0LWN5YW4tMzAwIHctOCB0ZXh0LXJpZ2h0IGZvbnQtYm9sZFwiPntob2xvZ3JhbU9wYWNpdHl9JTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIDMgSGVhdnkgTWlsaXRhcnkgU3dpdGNoZXMgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0zIGdhcC00IG10LTRcIj5cbiAgICAgICAgICAgIDxUaXRhbml1bVRvZ2dsZVN3aXRjaFxuICAgICAgICAgICAgICBsYWJlbD1cIlphc2lsYW5pZSBFbWlzamkgSG9sb2dyYW3Ds3dcIlxuICAgICAgICAgICAgICBzdWJsYWJlbD1cIlphxYLEhWN6YSBjZW50cmFsbnkgZW1pdGVyIGt3YW50b3d5IGkgd2nEhXpraSBIVURcIlxuICAgICAgICAgICAgICBjb2RlPVwiU1ctSE9MTy1QV1ItMDFcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtpc0hvbG9FbWl0dGVyQWN0aXZlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0SXNIb2xvRW1pdHRlckFjdGl2ZX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxUaXRhbml1bVRvZ2dsZVN3aXRjaFxuICAgICAgICAgICAgICBsYWJlbD1cIkF1dG9yeXphY2phIE9nbmlhIERFRkNPTiAxXCJcbiAgICAgICAgICAgICAgc3VibGFiZWw9XCJQb2RuaWXFmyBvc8WCb27EmSwgYWJ5IG9kcnlnbG93YcSHIHNhbHfEmSBzcG9waWVsZW5pYVwiXG4gICAgICAgICAgICAgIGNvZGU9XCJTVy1ERUZDT04tQVJNLTAyXCJcbiAgICAgICAgICAgICAgaGFzU2FmZXR5Q292ZXI9e3RydWV9XG4gICAgICAgICAgICAgIGRhbmdlckxldmVsPVwiQ1JJVElDQUxcIlxuICAgICAgICAgICAgICBjaGVja2VkPXtpc0RlZmNvbkFybWVkfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0SXNEZWZjb25Bcm1lZH1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIHRpdGFuaXVtLXN0ZWVsLXN1cmZhY2UgYm9yZGVyIGJvcmRlci1zbGF0ZS02MDAvNjAgc2hhZG93LXhsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiByZWxhdGl2ZSBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIHRvcC0xLjUgbGVmdC0xLjUgbWlsc3BlYy1yaXZldFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTEuNSByaWdodC0xLjUgbWlsc3BlYy1yaXZldFwiIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTEuNSBsZWZ0LTEuNSBtaWxzcGVjLXJpdmV0XCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMS41IHJpZ2h0LTEuNSBtaWxzcGVjLXJpdmV0XCIgLz5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBsLTMuNSBwci0yXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtWzlweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVzdCBiZy1zbGF0ZS05MDAvODAgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICBST1QtQVpJTVVUSC0wM1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtc2xhdGUtMTAwIHRyYWNraW5nLXdpZGUgbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgT2Jyw7N0IFN0b8WCdSBTenRhYm93ZWdvXG4gICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LXNhbnMgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICBLxIV0IGF6eW11dHUgcHJvamVrY2ppOiB7dGFibGVSb3RhdGlvbkFuZ2xlfcKwXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHByLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUYWJsZVJvdGF0aW9uQW5nbGUoYSA9PiAoYSAtIDQ1ICsgMzYwKSAlIDM2MCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTYwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgLTQ1wrBcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRUYWJsZVJvdGF0aW9uQW5nbGUoYSA9PiAoYSArIDQ1KSAlIDM2MCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yIHB5LTEgcm91bmRlZCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNjAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICArNDXCsFxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJlYWwtVGltZSBUYWN0aWNhbCBTdHJpa2UgQ29uc29sZSBMb2cgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtMyByb3VuZGVkLXhsIGJnLWJsYWNrLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMS41IGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgdGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgPHNwYW4+RFpJRU5OSUsgWkRBUlpFxYMgU1RPxYFVIERPV09EWkVOSUEgKFdBUiBST09NIEFVRElUIFRSQUlMKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj4xMDAlIE9QRVJBVElPTkFMPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICB7c3RyaWtlTG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmb250LWJvbGRcIj7Cuzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2lkeCA9PT0gMCA/ICd0ZXh0LXdoaXRlIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAnfT57bG9nfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTBGUTtBQTFGUixTQUFnQixVQUFVLGlCQUF5QjtBQUNuRDtBQUFBLEVBQ0U7QUFBQSxFQUEwQjtBQUFBLEVBQUs7QUFBQSxFQUFPO0FBQUEsRUFDakM7QUFBQSxFQUFRO0FBQUEsRUFDbUM7QUFBQSxFQUNOO0FBQUEsT0FDckM7QUFDUCxTQUFTLDRCQUE0QjtBQUU5QixhQUFNLDJCQUFxQyxNQUFNO0FBRXRELFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLElBQUksU0FBa0IsSUFBSTtBQUM1RSxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBbUQsTUFBTTtBQUMzRixRQUFNLENBQUMsZUFBZSxnQkFBZ0IsSUFBSSxTQUFrQixLQUFLO0FBQ2pFLFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLElBQUksU0FBaUIsRUFBRTtBQUN2RSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQWlCLEVBQUU7QUFDakUsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUF3QixjQUFjO0FBQ3RGLFFBQU0sQ0FBQyxtQkFBbUIsb0JBQW9CLElBQUksU0FBa0IsS0FBSztBQUN6RSxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBbUI7QUFBQSxJQUNyRDtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFHRCxRQUFNLENBQUMsTUFBTSxPQUFPLElBQUksU0FBaUIsQ0FBQztBQUMxQyxZQUFVLE1BQU07QUFDZCxVQUFNLFdBQVcsWUFBWSxNQUFNO0FBQ2pDLGNBQVEsUUFB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