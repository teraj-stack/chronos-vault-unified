import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Activity,
  Zap,
  ShieldAlert,
  Skull,
  AlertTriangle,
  ShieldCheck,
  ArrowUpRight,
  Radio,
  ChevronRight,
  ChevronLeft,
  Clock,
  CheckCircle2
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { focusTracker } from "/sentinel-shield/src/utils/focusHijackTracker.ts";
export const LiveThreatPulseSidebar = ({
  logs,
  onSelectLog,
  onNavigateToTab,
  isCollapsedByDefault = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(isCollapsedByDefault);
  const [pulseCounter, setPulseCounter] = useState(0);
  const [newestPulseId, setNewestPulseId] = useState(null);
  const last5Breaches = React.useMemo(() => {
    return [...logs].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).slice(0, 5);
  }, [logs]);
  useEffect(() => {
    if (last5Breaches.length > 0) {
      const top = last5Breaches[0];
      setNewestPulseId(top.id);
      const timer = setTimeout(() => {
        setNewestPulseId(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [last5Breaches]);
  useEffect(() => {
    const timer = setInterval(() => {
      setPulseCounter((c) => (c + 1) % 100);
    }, 2e3);
    return () => clearInterval(timer);
  }, []);
  const handleSimulateNewBreach = () => {
    const rogues = [
      { name: "flutter_trap_overlay.exe", pid: 8940, title: "FLUTTER_SURFACE_LOCKER_TOPMOST", api: "SetForegroundWindow(HWND)", sev: "CRITICAL", vec: "HWND_TOPMOST Hook Injection", details: "Próba wymuszenia fokusu okna przez pętlę 60 Hz SetWindowPos." },
      { name: "stealth_clickjacking_overlay.dll", pid: 5824, title: "Clickjacking Transparent Layer", api: "SetWindowLongPtr(GWL_EXSTYLE, WS_EX_LAYERED)", sev: "CRITICAL", vec: "DirectFlip DWM Hook", details: "Próba wstrzyknięcia przezroczystej powłoki wyłapującej kliknięcia." },
      { name: "wasm_crypto_stealer.wasm", pid: 7912, title: "Web Worker Thread Pool", api: "SharedArrayBuffer Infiltration", sev: "HIGH", vec: "WebAssembly Memory Probe", details: "Nieautoryzowana próba kradzieży cykli CPU do haszowania." },
      { name: "clipboard_hijacker_hook.js", pid: 4120, title: "Clipboard Crypto Monitor", api: "WH_CLIPBOARD / Event Listener", sev: "HIGH", vec: "Navigator Clipboard API Hook", details: "Próba podmieniania adresów portfeli krypto w buforze schowka." },
      { name: "popup_cascade_spammer.exe", pid: 3890, title: "Special System Warning", api: "SwitchToThisWindow", sev: "MEDIUM", vec: "Win32 Modal Loop Injection", details: "Wymuszanie okna dialogowego na wierzchu aktywnego pulpitu." }
    ];
    const picked = rogues[Math.floor(Math.random() * rogues.length)];
    focusTracker.recordAttempt(
      picked.name,
      picked.pid,
      picked.title,
      picked.api,
      picked.sev,
      picked.vec,
      picked.details
    );
  };
  const getSeverityStyles = (level) => {
    switch (level) {
      case "EXTREME":
      case "CRITICAL":
        return {
          cardBg: "bg-gradient-to-r from-red-950/80 via-slate-900/90 to-slate-950",
          border: "border-red-500/80 shadow-[0_0_15px_rgba(239,68,68,0.25)]",
          badgeBg: "bg-red-950 text-red-300 border-red-700",
          badgeText: "KRYTYCZNY (99.9%)",
          indicator: "bg-red-500",
          glowText: "text-red-400",
          icon: /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-red-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 85,
            columnNumber: 17
          }, this)
        };
      case "HIGH":
        return {
          cardBg: "bg-gradient-to-r from-amber-950/70 via-slate-900/90 to-slate-950",
          border: "border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
          badgeBg: "bg-amber-950 text-amber-300 border-amber-700",
          badgeText: "WYSOKI (85.0%)",
          indicator: "bg-amber-400",
          glowText: "text-amber-400",
          icon: /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 95,
            columnNumber: 17
          }, this)
        };
      case "MEDIUM":
        return {
          cardBg: "bg-gradient-to-r from-yellow-950/60 via-slate-900/90 to-slate-950",
          border: "border-yellow-500/70 shadow-[0_0_10px_rgba(234,179,8,0.15)]",
          badgeBg: "bg-yellow-950 text-yellow-300 border-yellow-700",
          badgeText: "ŚREDNI (60.0%)",
          indicator: "bg-yellow-400",
          glowText: "text-yellow-300",
          icon: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 105,
            columnNumber: 17
          }, this)
        };
      default:
        return {
          cardBg: "bg-gradient-to-r from-cyan-950/60 via-slate-900/90 to-slate-950",
          border: "border-cyan-500/70 shadow-[0_0_10px_rgba(6,182,212,0.15)]",
          badgeBg: "bg-cyan-950 text-cyan-300 border-cyan-700",
          badgeText: "NISKI (30.0%)",
          indicator: "bg-cyan-400",
          glowText: "text-cyan-300",
          icon: /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 115,
            columnNumber: 17
          }, this)
        };
    }
  };
  return /* @__PURE__ */ jsxDEV(
    "aside",
    {
      className: `transition-all duration-300 ease-in-out font-mono shrink-0 flex flex-col rounded-2xl border bg-slate-950/95 backdrop-blur-md shadow-2xl relative overflow-hidden ${isCollapsed ? "w-14 border-slate-800" : "w-full lg:w-80 xl:w-96 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]"}`,
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border-b border-cyan-500/40 flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5 overflow-hidden", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "relative flex items-center justify-center shrink-0 w-7 h-7 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300", children: [
              /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 133,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-1 -right-1 flex h-2.5 w-2.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 135,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 136,
                  columnNumber: 15
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 134,
                columnNumber: 13
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 132,
              columnNumber: 11
            }, this),
            !isCollapsed && /* @__PURE__ */ jsxDEV("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-white tracking-wider truncate", children: "LIVE THREAT PULSE" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 143,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-bold px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-600 animate-pulse", children: "5 OSTATNICH" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 146,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 142,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400 truncate", children: "Monitorowanie naruszeń w czasie rzeczywistym" }, void 0, false, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 150,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 141,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 130,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 shrink-0", children: [
            !isCollapsed && /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleSimulateNewBreach,
                className: "p-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-500/70 text-red-300 hover:text-white text-[10px] font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer",
                title: "Wstrzyknij próbę naruszenia (Test live pulse)",
                children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300 animate-bounce" }, void 0, false, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 165,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline", children: "+1 Skan" }, void 0, false, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 166,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 160,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setIsCollapsed(!isCollapsed),
                className: "p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer",
                title: isCollapsed ? "Rozwiń pasek boczny Live Threat Pulse" : "Zwiń pasek boczny",
                children: isCollapsed ? /* @__PURE__ */ jsxDEV(ChevronRight, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 175,
                  columnNumber: 28
                }, this) : /* @__PURE__ */ jsxDEV(ChevronLeft, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 175,
                  columnNumber: 81
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 170,
                columnNumber: 11
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 158,
            columnNumber: 9
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
          lineNumber: 129,
          columnNumber: 7
        }, this),
        isCollapsed ? /* @__PURE__ */ jsxDEV("div", { className: "py-4 flex flex-col items-center space-y-3 text-xs", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "writing-mode-vertical text-[10px] font-bold text-cyan-400 tracking-widest uppercase rotate-180 py-2", children: "PULSE MONITOR" }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 183,
            columnNumber: 11
          }, this),
          last5Breaches.map((b, idx) => {
            const styles = getSeverityStyles(b.aggressionLevel);
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                onClick: () => setIsCollapsed(false),
                className: "w-8 h-8 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center cursor-pointer hover:border-cyan-400 transition-colors",
                title: `${b.processName} [${b.aggressionLevel}] - Kliknij, aby rozwinąć`,
                children: /* @__PURE__ */ jsxDEV("span", { className: `w-2.5 h-2.5 rounded-full ${styles.indicator} ${idx === 0 ? "animate-ping" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 195,
                  columnNumber: 17
                }, this)
              },
              b.id || idx,
              false,
              {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 189,
                columnNumber: 15
              },
              this
            );
          })
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
          lineNumber: 182,
          columnNumber: 9
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex-1 flex flex-col min-h-0", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-cyan-300 font-bold", children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-3 h-3 text-cyan-400 animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 206,
                columnNumber: 15
              }, this),
              "NASŁUCH MAGISTRALI (0 MS)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 205,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% ZNEUTRALIZOWANE" }, void 0, false, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 209,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 204,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 space-y-2.5 overflow-y-auto max-h-[520px] scrollbar-thin scrollbar-thumb-slate-700", children: last5Breaches.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "p-6 text-center text-slate-500 text-xs", children: "Brak zarejestrowanych prób naruszenia." }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 217,
            columnNumber: 15
          }, this) : last5Breaches.map((breach, idx) => {
            const styles = getSeverityStyles(breach.aggressionLevel);
            const isNewest = breach.id === newestPulseId || idx === 0;
            return /* @__PURE__ */ jsxDEV(
              "div",
              {
                onClick: () => onSelectLog?.(breach),
                className: `p-3 rounded-xl border transition-all duration-200 cursor-pointer text-xs relative overflow-hidden group ${styles.cardBg} ${styles.border} ${isNewest ? "ring-2 ring-cyan-400/60 scale-[1.01]" : "hover:scale-[1.01]"}`,
                children: [
                  isNewest && /* @__PURE__ */ jsxDEV("div", { className: "absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 via-yellow-400 to-cyan-400 animate-pulse" }, void 0, false, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 237,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-black border flex items-center gap-1 ${styles.badgeBg}`, children: [
                      styles.icon,
                      /* @__PURE__ */ jsxDEV("span", { children: styles.badgeText }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 244,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 242,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-[10px] text-slate-400", children: [
                      /* @__PURE__ */ jsxDEV(Clock, { className: "w-3 h-3 text-slate-500" }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 248,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: breach.timestamp.split(" ")[1] || breach.timestamp }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 249,
                        columnNumber: 25
                      }, this),
                      breach.repeatCount > 1 && /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[9px] font-bold", children: [
                        "x",
                        breach.repeatCount
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 251,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 247,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 241,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "space-y-0.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-xs truncate group-hover:text-cyan-300 transition-colors", children: breach.processName }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 261,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono", children: [
                        "PID: ",
                        breach.pid
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 264,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 260,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-300 font-mono truncate", title: breach.sourceVector, children: [
                      "Wektor: ",
                      /* @__PURE__ */ jsxDEV("strong", { className: styles.glowText, children: breach.sourceVector }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 270,
                        columnNumber: 33
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 269,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 font-mono truncate", title: breach.abusedApi, children: [
                      "API: ",
                      /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300 text-[9px]", children: breach.abusedApi }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 274,
                        columnNumber: 30
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 273,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 259,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-2 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 281,
                        columnNumber: 25
                      }, this),
                      "UBÓJ GNID 0 MS"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 280,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 group-hover:text-cyan-300 flex items-center gap-0.5 text-[9px] transition-colors", children: [
                      /* @__PURE__ */ jsxDEV("span", { children: "Szczegóły" }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 286,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV(ArrowUpRight, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                        lineNumber: 287,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                      lineNumber: 285,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                    lineNumber: 279,
                    columnNumber: 21
                  }, this)
                ]
              },
              breach.id || idx,
              true,
              {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 226,
                columnNumber: 19
              },
              this
            );
          }) }, void 0, false, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 215,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-slate-900/90 border-t border-slate-800 text-[10px] space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-2 text-center", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 rounded-lg bg-slate-950 border border-slate-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[9px] block", children: "LICZBA PRÓB (OGÓŁEM)" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 300,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-red-400", children: logs.reduce((acc, l) => acc + l.repeatCount, 0) }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 301,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 299,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 rounded-lg bg-slate-950 border border-slate-800", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[9px] block", children: "CZAS REAKCJI" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 304,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-black text-emerald-400", children: "0 ms (Ścięcie PE)" }, void 0, false, {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 305,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                lineNumber: 303,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 298,
              columnNumber: 13
            }, this),
            onNavigateToTab && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 pt-1", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onNavigateToTab("ATTACK_FREQUENCY_CHART"),
                  className: "flex-1 py-1.5 rounded-lg bg-cyan-950 hover:bg-cyan-900 border border-cyan-600/60 text-cyan-300 font-bold text-[10px] transition-colors cursor-pointer text-center",
                  children: "Wykres Recharts →"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 311,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onNavigateToTab("FOCUS_HIJACK_LOGS"),
                  className: "flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold text-[10px] transition-colors cursor-pointer text-center",
                  children: "Wszystkie Logi →"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
                  lineNumber: 317,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
              lineNumber: 310,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
            lineNumber: 297,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
          lineNumber: 201,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/LiveThreatPulseSidebar.tsx",
      lineNumber: 121,
      columnNumber: 5
    },
    this
  );
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpdmVUaHJlYXRQdWxzZVNpZGViYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIEFjdGl2aXR5LCBaYXAsIFNoaWVsZEFsZXJ0LCBTa3VsbCwgQWxlcnRUcmlhbmdsZSwgU2hpZWxkQ2hlY2ssIFxuICBGbGFtZSwgQ3Jvc3NoYWlyLCBBcnJvd1VwUmlnaHQsIFJhZGlvLCBSZWZyZXNoQ3csIExheWVycywgXG4gIENoZXZyb25SaWdodCwgQ2hldnJvbkxlZnQsIEV5ZSwgQ2xvY2ssIENoZWNrQ2lyY2xlMlxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgRm9jdXNIaWphY2tBdHRlbXB0LCBUaHJlYXRTZXZlcml0eSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGZvY3VzVHJhY2tlciB9IGZyb20gJy4uL3V0aWxzL2ZvY3VzSGlqYWNrVHJhY2tlcic7XG5cbmludGVyZmFjZSBMaXZlVGhyZWF0UHVsc2VTaWRlYmFyUHJvcHMge1xuICBsb2dzOiBGb2N1c0hpamFja0F0dGVtcHRbXTtcbiAgb25TZWxlY3RMb2c/OiAobG9nOiBGb2N1c0hpamFja0F0dGVtcHQpID0+IHZvaWQ7XG4gIG9uTmF2aWdhdGVUb1RhYj86ICh0YWI6ICdWSVJVU19ET1NTSUVSJyB8ICdGT0NVU19ISUpBQ0tfTE9HUycgfCAnQVRUQUNLX0ZSRVFVRU5DWV9DSEFSVCcpID0+IHZvaWQ7XG4gIGlzQ29sbGFwc2VkQnlEZWZhdWx0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IExpdmVUaHJlYXRQdWxzZVNpZGViYXI6IFJlYWN0LkZDPExpdmVUaHJlYXRQdWxzZVNpZGViYXJQcm9wcz4gPSAoe1xuICBsb2dzLFxuICBvblNlbGVjdExvZyxcbiAgb25OYXZpZ2F0ZVRvVGFiLFxuICBpc0NvbGxhcHNlZEJ5RGVmYXVsdCA9IGZhbHNlXG59KSA9PiB7XG4gIGNvbnN0IFtpc0NvbGxhcHNlZCwgc2V0SXNDb2xsYXBzZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oaXNDb2xsYXBzZWRCeURlZmF1bHQpO1xuICBjb25zdCBbcHVsc2VDb3VudGVyLCBzZXRQdWxzZUNvdW50ZXJdID0gdXNlU3RhdGU8bnVtYmVyPigwKTtcbiAgY29uc3QgW25ld2VzdFB1bHNlSWQsIHNldE5ld2VzdFB1bHNlSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gVGFrZSB0aGUgbGFzdCA1IGRldGVjdGVkIGJyZWFjaCBhdHRlbXB0cyAobmV3ZXN0IGZpcnN0KVxuICBjb25zdCBsYXN0NUJyZWFjaGVzID0gUmVhY3QudXNlTWVtbygoKSA9PiB7XG4gICAgcmV0dXJuIFsuLi5sb2dzXVxuICAgICAgLnNvcnQoKGEsIGIpID0+IG5ldyBEYXRlKGIudGltZXN0YW1wKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLnRpbWVzdGFtcCkuZ2V0VGltZSgpKVxuICAgICAgLnNsaWNlKDAsIDUpO1xuICB9LCBbbG9nc10pO1xuXG4gIC8vIEZsYXNoIG5ld2VzdCBicmVhY2ggaW5kaWNhdG9yIG9uIGluY29taW5nIGxvZ3NcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAobGFzdDVCcmVhY2hlcy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCB0b3AgPSBsYXN0NUJyZWFjaGVzWzBdO1xuICAgICAgc2V0TmV3ZXN0UHVsc2VJZCh0b3AuaWQpO1xuICAgICAgY29uc3QgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2V0TmV3ZXN0UHVsc2VJZChudWxsKTtcbiAgICAgIH0sIDM1MDApO1xuICAgICAgcmV0dXJuICgpID0+IGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICB9LCBbbGFzdDVCcmVhY2hlc10pO1xuXG4gIC8vIEhlYXJ0YmVhdCBwdWxzZSBzaW11bGF0aW9uIHRpbWVyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBzZXRQdWxzZUNvdW50ZXIoYyA9PiAoYyArIDEpICUgMTAwKTtcbiAgICB9LCAyMDAwKTtcbiAgICByZXR1cm4gKCkgPT4gY2xlYXJJbnRlcnZhbCh0aW1lcik7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVTaW11bGF0ZU5ld0JyZWFjaCA9ICgpID0+IHtcbiAgICBjb25zdCByb2d1ZXMgPSBbXG4gICAgICB7IG5hbWU6ICdmbHV0dGVyX3RyYXBfb3ZlcmxheS5leGUnLCBwaWQ6IDg5NDAsIHRpdGxlOiAnRkxVVFRFUl9TVVJGQUNFX0xPQ0tFUl9UT1BNT1NUJywgYXBpOiAnU2V0Rm9yZWdyb3VuZFdpbmRvdyhIV05EKScsIHNldjogJ0NSSVRJQ0FMJyBhcyBjb25zdCwgdmVjOiAnSFdORF9UT1BNT1NUIEhvb2sgSW5qZWN0aW9uJywgZGV0YWlsczogJ1Byw7NiYSB3eW11c3plbmlhIGZva3VzdSBva25hIHByemV6IHDEmXRsxJkgNjAgSHogU2V0V2luZG93UG9zLicgfSxcbiAgICAgIHsgbmFtZTogJ3N0ZWFsdGhfY2xpY2tqYWNraW5nX292ZXJsYXkuZGxsJywgcGlkOiA1ODI0LCB0aXRsZTogJ0NsaWNramFja2luZyBUcmFuc3BhcmVudCBMYXllcicsIGFwaTogJ1NldFdpbmRvd0xvbmdQdHIoR1dMX0VYU1RZTEUsIFdTX0VYX0xBWUVSRUQpJywgc2V2OiAnQ1JJVElDQUwnIGFzIGNvbnN0LCB2ZWM6ICdEaXJlY3RGbGlwIERXTSBIb29rJywgZGV0YWlsczogJ1Byw7NiYSB3c3RyenlrbmnEmWNpYSBwcnplenJvY3p5c3RlaiBwb3fFgm9raSB3ecWCYXB1asSFY2VqIGtsaWtuacSZY2lhLicgfSxcbiAgICAgIHsgbmFtZTogJ3dhc21fY3J5cHRvX3N0ZWFsZXIud2FzbScsIHBpZDogNzkxMiwgdGl0bGU6ICdXZWIgV29ya2VyIFRocmVhZCBQb29sJywgYXBpOiAnU2hhcmVkQXJyYXlCdWZmZXIgSW5maWx0cmF0aW9uJywgc2V2OiAnSElHSCcgYXMgY29uc3QsIHZlYzogJ1dlYkFzc2VtYmx5IE1lbW9yeSBQcm9iZScsIGRldGFpbHM6ICdOaWVhdXRvcnl6b3dhbmEgcHLDs2JhIGtyYWR6aWXFvHkgY3lrbGkgQ1BVIGRvIGhhc3pvd2FuaWEuJyB9LFxuICAgICAgeyBuYW1lOiAnY2xpcGJvYXJkX2hpamFja2VyX2hvb2suanMnLCBwaWQ6IDQxMjAsIHRpdGxlOiAnQ2xpcGJvYXJkIENyeXB0byBNb25pdG9yJywgYXBpOiAnV0hfQ0xJUEJPQVJEIC8gRXZlbnQgTGlzdGVuZXInLCBzZXY6ICdISUdIJyBhcyBjb25zdCwgdmVjOiAnTmF2aWdhdG9yIENsaXBib2FyZCBBUEkgSG9vaycsIGRldGFpbHM6ICdQcsOzYmEgcG9kbWllbmlhbmlhIGFkcmVzw7N3IHBvcnRmZWxpIGtyeXB0byB3IGJ1Zm9yemUgc2Nob3drYS4nIH0sXG4gICAgICB7IG5hbWU6ICdwb3B1cF9jYXNjYWRlX3NwYW1tZXIuZXhlJywgcGlkOiAzODkwLCB0aXRsZTogJ1NwZWNpYWwgU3lzdGVtIFdhcm5pbmcnLCBhcGk6ICdTd2l0Y2hUb1RoaXNXaW5kb3cnLCBzZXY6ICdNRURJVU0nIGFzIGNvbnN0LCB2ZWM6ICdXaW4zMiBNb2RhbCBMb29wIEluamVjdGlvbicsIGRldGFpbHM6ICdXeW11c3phbmllIG9rbmEgZGlhbG9nb3dlZ28gbmEgd2llcnpjaHUgYWt0eXduZWdvIHB1bHBpdHUuJyB9XG4gICAgXTtcbiAgICBjb25zdCBwaWNrZWQgPSByb2d1ZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcm9ndWVzLmxlbmd0aCldO1xuICAgIGZvY3VzVHJhY2tlci5yZWNvcmRBdHRlbXB0KFxuICAgICAgcGlja2VkLm5hbWUsXG4gICAgICBwaWNrZWQucGlkLFxuICAgICAgcGlja2VkLnRpdGxlLFxuICAgICAgcGlja2VkLmFwaSxcbiAgICAgIHBpY2tlZC5zZXYsXG4gICAgICBwaWNrZWQudmVjLFxuICAgICAgcGlja2VkLmRldGFpbHNcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGdldFNldmVyaXR5U3R5bGVzID0gKGxldmVsOiBzdHJpbmcpID0+IHtcbiAgICBzd2l0Y2ggKGxldmVsKSB7XG4gICAgICBjYXNlICdFWFRSRU1FJzpcbiAgICAgIGNhc2UgJ0NSSVRJQ0FMJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjYXJkQmc6ICdiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTk1MC84MCB2aWEtc2xhdGUtOTAwLzkwIHRvLXNsYXRlLTk1MCcsXG4gICAgICAgICAgYm9yZGVyOiAnYm9yZGVyLXJlZC01MDAvODAgc2hhZG93LVswXzBfMTVweF9yZ2JhKDIzOSw2OCw2OCwwLjI1KV0nLFxuICAgICAgICAgIGJhZGdlQmc6ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTcwMCcsXG4gICAgICAgICAgYmFkZ2VUZXh0OiAnS1JZVFlDWk5ZICg5OS45JSknLFxuICAgICAgICAgIGluZGljYXRvcjogJ2JnLXJlZC01MDAnLFxuICAgICAgICAgIGdsb3dUZXh0OiAndGV4dC1yZWQtNDAwJyxcbiAgICAgICAgICBpY29uOiA8U2t1bGwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yZWQtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICB9O1xuICAgICAgY2FzZSAnSElHSCc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2FyZEJnOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTk1MC83MCB2aWEtc2xhdGUtOTAwLzkwIHRvLXNsYXRlLTk1MCcsXG4gICAgICAgICAgYm9yZGVyOiAnYm9yZGVyLWFtYmVyLTUwMC84MCBzaGFkb3ctWzBfMF8xMnB4X3JnYmEoMjQ1LDE1OCwxMSwwLjIpXScsXG4gICAgICAgICAgYmFkZ2VCZzogJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItNzAwJyxcbiAgICAgICAgICBiYWRnZVRleHQ6ICdXWVNPS0kgKDg1LjAlKScsXG4gICAgICAgICAgaW5kaWNhdG9yOiAnYmctYW1iZXItNDAwJyxcbiAgICAgICAgICBnbG93VGV4dDogJ3RleHQtYW1iZXItNDAwJyxcbiAgICAgICAgICBpY29uOiA8QWxlcnRUcmlhbmdsZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgIH07XG4gICAgICBjYXNlICdNRURJVU0nOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNhcmRCZzogJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS15ZWxsb3ctOTUwLzYwIHZpYS1zbGF0ZS05MDAvOTAgdG8tc2xhdGUtOTUwJyxcbiAgICAgICAgICBib3JkZXI6ICdib3JkZXIteWVsbG93LTUwMC83MCBzaGFkb3ctWzBfMF8xMHB4X3JnYmEoMjM0LDE3OSw4LDAuMTUpXScsXG4gICAgICAgICAgYmFkZ2VCZzogJ2JnLXllbGxvdy05NTAgdGV4dC15ZWxsb3ctMzAwIGJvcmRlci15ZWxsb3ctNzAwJyxcbiAgICAgICAgICBiYWRnZVRleHQ6ICfFmlJFRE5JICg2MC4wJSknLFxuICAgICAgICAgIGluZGljYXRvcjogJ2JnLXllbGxvdy00MDAnLFxuICAgICAgICAgIGdsb3dUZXh0OiAndGV4dC15ZWxsb3ctMzAwJyxcbiAgICAgICAgICBpY29uOiA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2FyZEJnOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tOTUwLzYwIHZpYS1zbGF0ZS05MDAvOTAgdG8tc2xhdGUtOTUwJyxcbiAgICAgICAgICBib3JkZXI6ICdib3JkZXItY3lhbi01MDAvNzAgc2hhZG93LVswXzBfMTBweF9yZ2JhKDYsMTgyLDIxMiwwLjE1KV0nLFxuICAgICAgICAgIGJhZGdlQmc6ICdiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlci1jeWFuLTcwMCcsXG4gICAgICAgICAgYmFkZ2VUZXh0OiAnTklTS0kgKDMwLjAlKScsXG4gICAgICAgICAgaW5kaWNhdG9yOiAnYmctY3lhbi00MDAnLFxuICAgICAgICAgIGdsb3dUZXh0OiAndGV4dC1jeWFuLTMwMCcsXG4gICAgICAgICAgaWNvbjogPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICB9O1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxhc2lkZSBcbiAgICAgIGNsYXNzTmFtZT17YHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBlYXNlLWluLW91dCBmb250LW1vbm8gc2hyaW5rLTAgZmxleCBmbGV4LWNvbCByb3VuZGVkLTJ4bCBib3JkZXIgYmctc2xhdGUtOTUwLzk1IGJhY2tkcm9wLWJsdXItbWQgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW4gJHtcbiAgICAgICAgaXNDb2xsYXBzZWQgXG4gICAgICAgICAgPyAndy0xNCBib3JkZXItc2xhdGUtODAwJyBcbiAgICAgICAgICA6ICd3LWZ1bGwgbGc6dy04MCB4bDp3LTk2IGJvcmRlci1jeWFuLTUwMC81MCBzaGFkb3ctWzBfMF8zMHB4X3JnYmEoNiwxODIsMjEyLDAuMildJ1xuICAgICAgfWB9XG4gICAgPlxuICAgICAgey8qIFRvcCBBbmltYXRlZCBQdWxzZSBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLWN5YW4tOTUwLzYwIHRvLXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItY3lhbi01MDAvNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgey8qIEFuaW1hdGVkIEhlYXJ0YmVhdCAvIFB1bHNlIFJpbmcgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaHJpbmstMCB3LTcgaC03IHJvdW5kZWQteGwgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xIC1yaWdodC0xIGZsZXggaC0yLjUgdy0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nIGFic29sdXRlIGlubGluZS1mbGV4IGgtZnVsbCB3LWZ1bGwgcm91bmRlZC1mdWxsIGJnLWN5YW4tNDAwIG9wYWNpdHktNzVcIj48L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlbGF0aXZlIGlubGluZS1mbGV4IHJvdW5kZWQtZnVsbCBoLTIuNSB3LTIuNSBiZy1jeWFuLTUwMFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHshaXNDb2xsYXBzZWQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtaW4tdy0wXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGVyIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICBMSVZFIFRIUkVBVCBQVUxTRVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtYm9sZCBweC0xLjUgcHktMC4yIHJvdW5kZWQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNjAwIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICAgIDUgT1NUQVROSUNIXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICBNb25pdG9yb3dhbmllIG5hcnVzemXFhCB3IGN6YXNpZSByemVjenl3aXN0eW1cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEFjdGlvbiBDb250cm9scyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaHJpbmstMFwiPlxuICAgICAgICAgIHshaXNDb2xsYXBzZWQgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTaW11bGF0ZU5ld0JyZWFjaH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1yZWQtOTUwLzgwIGhvdmVyOmJnLXJlZC05MDAgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzcwIHRleHQtcmVkLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIldzdHJ6eWtuaWogcHLDs2LEmSBuYXJ1c3plbmlhIChUZXN0IGxpdmUgcHVsc2UpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj4rMSBTa2FuPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzQ29sbGFwc2VkKCFpc0NvbGxhcHNlZCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT17aXNDb2xsYXBzZWQgPyAnUm96d2nFhCBwYXNlayBib2N6bnkgTGl2ZSBUaHJlYXQgUHVsc2UnIDogJ1p3acWEIHBhc2VrIGJvY3pueSd9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2lzQ29sbGFwc2VkID8gPENoZXZyb25SaWdodCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPiA6IDxDaGV2cm9uTGVmdCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEJvZHk6IENvbGxhcHNlZCBJY29uIEJhciB2cyBGdWxsIFNjcm9sbGFibGUgNSBCcmVhY2hlcyBMaXN0ICovfVxuICAgICAge2lzQ29sbGFwc2VkID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB5LTQgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgc3BhY2UteS0zIHRleHQteHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndyaXRpbmctbW9kZS12ZXJ0aWNhbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgdGV4dC1jeWFuLTQwMCB0cmFja2luZy13aWRlc3QgdXBwZXJjYXNlIHJvdGF0ZS0xODAgcHktMlwiPlxuICAgICAgICAgICAgUFVMU0UgTU9OSVRPUlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtsYXN0NUJyZWFjaGVzLm1hcCgoYiwgaWR4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRTZXZlcml0eVN0eWxlcyhiLmFnZ3Jlc3Npb25MZXZlbCk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgIGtleT17Yi5pZCB8fCBpZHh9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNDb2xsYXBzZWQoZmFsc2UpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgaG92ZXI6Ym9yZGVyLWN5YW4tNDAwIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgICAgICB0aXRsZT17YCR7Yi5wcm9jZXNzTmFtZX0gWyR7Yi5hZ2dyZXNzaW9uTGV2ZWx9XSAtIEtsaWtuaWosIGFieSByb3p3aW7EhcSHYH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHctMi41IGgtMi41IHJvdW5kZWQtZnVsbCAke3N0eWxlcy5pbmRpY2F0b3J9ICR7aWR4ID09PSAwID8gJ2FuaW1hdGUtcGluZycgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBtaW4taC0wXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFJlYWwtdGltZSBUaWNrZXIgU3ViaGVhZCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLXNsYXRlLTkwMC82MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWN5YW4tNDAwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgICAgIE5BU8WBVUNIIE1BR0lTVFJBTEkgKDAgTVMpXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAxMDAlIFpORVVUUkFMSVpPV0FORVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNjcm9sbGFibGUgTGlzdCBvZiA1IExhdGVzdCBCcmVhY2hlcyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBzcGFjZS15LTIuNSBvdmVyZmxvdy15LWF1dG8gbWF4LWgtWzUyMHB4XSBzY3JvbGxiYXItdGhpbiBzY3JvbGxiYXItdGh1bWItc2xhdGUtNzAwXCI+XG4gICAgICAgICAgICB7bGFzdDVCcmVhY2hlcy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC02IHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICBCcmFrIHphcmVqZXN0cm93YW55Y2ggcHLDs2IgbmFydXN6ZW5pYS5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICBsYXN0NUJyZWFjaGVzLm1hcCgoYnJlYWNoLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSBnZXRTZXZlcml0eVN0eWxlcyhicmVhY2guYWdncmVzc2lvbkxldmVsKTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc05ld2VzdCA9IGJyZWFjaC5pZCA9PT0gbmV3ZXN0UHVsc2VJZCB8fCBpZHggPT09IDA7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e2JyZWFjaC5pZCB8fCBpZHh9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uU2VsZWN0TG9nPy4oYnJlYWNoKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBjdXJzb3ItcG9pbnRlciB0ZXh0LXhzIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlbiBncm91cCAke1xuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlcy5jYXJkQmdcbiAgICAgICAgICAgICAgICAgICAgfSAke3N0eWxlcy5ib3JkZXJ9ICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNOZXdlc3QgPyAncmluZy0yIHJpbmctY3lhbi00MDAvNjAgc2NhbGUtWzEuMDFdJyA6ICdob3ZlcjpzY2FsZS1bMS4wMV0nXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7LyogVG9wIFB1bHNpbmcgQWNjZW50IEJhciBmb3IgIzEgbmV3ZXN0ICovfVxuICAgICAgICAgICAgICAgICAgICB7aXNOZXdlc3QgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgdG9wLTAgbGVmdC0wIHJpZ2h0LTAgaC0wLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC01MDAgdmlhLXllbGxvdy00MDAgdG8tY3lhbi00MDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIEJyZWFjaCBIZWFkZXI6IFNldmVyaXR5IEJhZGdlICsgVGltZXN0YW1wICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMiBtYi0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtYmxhY2sgYm9yZGVyIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xICR7c3R5bGVzLmJhZGdlQmd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c3R5bGVzLmljb259XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57c3R5bGVzLmJhZGdlVGV4dH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPENsb2NrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1zbGF0ZS01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2JyZWFjaC50aW1lc3RhbXAuc3BsaXQoJyAnKVsxXSB8fCBicmVhY2gudGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHticmVhY2gucmVwZWF0Q291bnQgPiAxICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuMiByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMCB0ZXh0LVs5cHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHh7YnJlYWNoLnJlcGVhdENvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogVGhyZWF0IElkZW50aXR5ICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0ZXh0LXhzIHRydW5jYXRlIGdyb3VwLWhvdmVyOnRleHQtY3lhbi0zMDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2JyZWFjaC5wcm9jZXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQSUQ6IHticmVhY2gucGlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gdHJ1bmNhdGVcIiB0aXRsZT17YnJlYWNoLnNvdXJjZVZlY3Rvcn0+XG4gICAgICAgICAgICAgICAgICAgICAgICBXZWt0b3I6IDxzdHJvbmcgY2xhc3NOYW1lPXtzdHlsZXMuZ2xvd1RleHR9PnticmVhY2guc291cmNlVmVjdG9yfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gdHJ1bmNhdGVcIiB0aXRsZT17YnJlYWNoLmFidXNlZEFwaX0+XG4gICAgICAgICAgICAgICAgICAgICAgICBBUEk6IDxjb2RlIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMCB0ZXh0LVs5cHhdXCI+e2JyZWFjaC5hYnVzZWRBcGl9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogRm9vdGVyIFN0YXR1cyBQaWxsICovfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgcHQtMS41IGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIFVCw5NKIEdOSUQgMCBNU1xuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGdyb3VwLWhvdmVyOnRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTAuNSB0ZXh0LVs5cHhdIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TemN6ZWfDs8WCeTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxBcnJvd1VwUmlnaHQgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEJvdHRvbSBUYWN0aWNhbCBGb290ZXIgJiBUZWxlbWV0cnkgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctc2xhdGUtOTAwLzkwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTBweF0gc3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzlweF0gYmxvY2tcIj5MSUNaQkEgUFLDk0IgKE9Hw5PFgUVNKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYmxhY2sgdGV4dC1yZWQtNDAwXCI+e2xvZ3MucmVkdWNlKChhY2MsIGwpID0+IGFjYyArIGwucmVwZWF0Q291bnQsIDApfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVs5cHhdIGJsb2NrXCI+Q1pBUyBSRUFLQ0pJPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ibGFjayB0ZXh0LWVtZXJhbGQtNDAwXCI+MCBtcyAoxZpjacSZY2llIFBFKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAge29uTmF2aWdhdGVUb1RhYiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwdC0xXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25OYXZpZ2F0ZVRvVGFiKCdBVFRBQ0tfRlJFUVVFTkNZX0NIQVJUJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQtbGcgYmctY3lhbi05NTAgaG92ZXI6YmctY3lhbi05MDAgYm9yZGVyIGJvcmRlci1jeWFuLTYwMC82MCB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgV3lrcmVzIFJlY2hhcnRzIOKGklxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uTmF2aWdhdGVUb1RhYignRk9DVVNfSElKQUNLX0xPR1MnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGZvbnQtYm9sZCB0ZXh0LVsxMHB4XSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgV3N6eXN0a2llIExvZ2kg4oaSXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9hc2lkZT5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQW9GZ0I7QUFwRmhCLE9BQU8sU0FBUyxVQUFVLGlCQUFpQjtBQUMzQztBQUFBLEVBQ0U7QUFBQSxFQUFVO0FBQUEsRUFBSztBQUFBLEVBQWE7QUFBQSxFQUFPO0FBQUEsRUFBZTtBQUFBLEVBQ2hDO0FBQUEsRUFBYztBQUFBLEVBQ2hDO0FBQUEsRUFBYztBQUFBLEVBQWtCO0FBQUEsRUFBTztBQUFBLE9BQ2xDO0FBRVAsU0FBUyxvQkFBb0I7QUFTdEIsYUFBTSx5QkFBZ0UsQ0FBQztBQUFBLEVBQzVFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLHVCQUF1QjtBQUN6QixNQUFNO0FBQ0osUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNB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