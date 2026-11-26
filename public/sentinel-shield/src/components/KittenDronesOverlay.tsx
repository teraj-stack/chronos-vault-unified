import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { Sparkles, Heart, Eye, Zap, Flower2 } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { kittenDroneEngine } from "/sentinel-shield/src/utils/kittenDroneEngine.ts";
export const KittenDronesOverlay = ({
  isMinimalLoadingMode = false,
  onNavigateToTab
}) => {
  const [kittens, setKittens] = useState(() => kittenDroneEngine.getKittens());
  const [memorial, setMemorial] = useState(() => kittenDroneEngine.getMemorialData());
  const [selectedKitten, setSelectedKitten] = useState(null);
  const [showKittens, setShowKittens] = useState(true);
  const [showTacticalBar, setShowTacticalBar] = useState(true);
  const [showMemorialWidget, setShowMemorialWidget] = useState(true);
  const [isChargingAnimActive, setIsChargingAnimActive] = useState(false);
  const [purrPulseKey, setPurrPulseKey] = useState(0);
  const [actionNotification, setActionNotification] = useState(null);
  useEffect(() => {
    const unsub = kittenDroneEngine.subscribe((k, m) => {
      setKittens(k);
      setMemorial(m);
      setIsChargingAnimActive(kittenDroneEngine.isChargingActive());
    });
    return () => unsub();
  }, []);
  const handleTriggerMemorialCharger = () => {
    kittenDroneEngine.triggerMemorialCharging();
    setIsChargingAnimActive(true);
    setPurrPulseKey((prev) => prev + 1);
    setActionNotification("⚡ Ładowarka Pomnikowa: Przesłano strumień energii kwantowej! Wszystkie kotki mruczą w harmonii 432 Hz 💖");
    setTimeout(() => setActionNotification(null), 4e3);
  };
  const handleKillGnidaSalvo = () => {
    kittenDroneEngine.triggerFullSquadronDeathGazeSalvo("aggressive_malware_trojan.exe");
    setActionNotification("🗡️ SALWA ŚMIERTELNEGO SPOJRZENIA (KILL GNIDA): 8 kotków natychmiast zdezintegrowało agresywne malware (0 ms)!");
    setTimeout(() => setActionNotification(null), 4500);
  };
  if (isMinimalLoadingMode) {
    return null;
  }
  if (!showKittens) {
    return /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-36 left-4 z-40 flex items-center gap-2 pointer-events-auto", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShowKittens(true),
        className: "px-3 py-1.5 rounded-xl bg-slate-950/95 hover:bg-slate-900 border border-amber-500/60 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-xl shadow-amber-950/50 cursor-pointer",
        title: "Pokaż małe drony-kotki 'Usuń Gnidę'",
        children: /* @__PURE__ */ jsxDEV("span", { children: "🐱 Drony-Kotki (8)" }, void 0, false, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 61,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 56,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this);
  }
  const momX = 88;
  const momY = 88;
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 pointer-events-none z-35 overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("svg", { className: "absolute inset-0 w-full h-full pointer-events-none", children: [
      /* @__PURE__ */ jsxDEV("defs", { children: [
        /* @__PURE__ */ jsxDEV("linearGradient", { id: "deathGazeBeamGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
          /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#f43f5e", stopOpacity: "1" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 78,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("stop", { offset: "50%", stopColor: "#fbbf24", stopOpacity: "0.9" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 79,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: "#ef4444", stopOpacity: "1" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("linearGradient", { id: "memorialChargerEnergyGrad", x1: "0%", y1: "100%", x2: "100%", y2: "0%", children: [
          /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#fbbf24", stopOpacity: "0.95" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 85,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("stop", { offset: "40%", stopColor: "#38bdf8", stopOpacity: "0.9" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 86,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("stop", { offset: "75%", stopColor: "#f43f5e", stopOpacity: "0.85" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 87,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: "#a855f7", stopOpacity: "0.95" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("filter", { id: "deathGazeGlow", children: [
          /* @__PURE__ */ jsxDEV("feGaussianBlur", { stdDeviation: "3.5", result: "glow" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("feMerge", { children: [
            /* @__PURE__ */ jsxDEV("feMergeNode", { in: "glow" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 94,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("feMergeNode", { in: "SourceGraphic" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 95,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 93,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("filter", { id: "chargerGlow", children: [
          /* @__PURE__ */ jsxDEV("feGaussianBlur", { stdDeviation: "4.5", result: "glow" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 100,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("feMerge", { children: [
            /* @__PURE__ */ jsxDEV("feMergeNode", { in: "glow" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 102,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("feMergeNode", { in: "SourceGraphic" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 103,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 101,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 99,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      isChargingAnimActive && /* @__PURE__ */ jsxDEV("g", { children: [
        /* @__PURE__ */ jsxDEV(
          "circle",
          {
            cx: `${momX}%`,
            cy: `${momY}%`,
            r: "45",
            fill: "none",
            stroke: "#fbbf24",
            strokeWidth: "2.5",
            opacity: "0.8",
            className: "animate-ping"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 112,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "circle",
          {
            cx: `${momX}%`,
            cy: `${momY}%`,
            r: "85",
            fill: "none",
            stroke: "#38bdf8",
            strokeWidth: "1.5",
            opacity: "0.6",
            className: "animate-ping",
            style: { animationDuration: "2s" }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 122,
            columnNumber: 13
          },
          this
        ),
        kittens.map((kitten, i) => /* @__PURE__ */ jsxDEV("g", { children: [
          /* @__PURE__ */ jsxDEV(
            "line",
            {
              x1: `${momX}%`,
              y1: `${momY}%`,
              x2: `${kitten.x}%`,
              y2: `${kitten.y}%`,
              stroke: "url(#memorialChargerEnergyGrad)",
              strokeWidth: "3.5",
              strokeDasharray: "8 6",
              filter: "url(#chargerGlow)",
              className: "animate-pulse"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 138,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "circle",
            {
              cx: `${kitten.x}%`,
              cy: `${kitten.y}%`,
              r: "24",
              fill: "none",
              stroke: "#fbbf24",
              strokeWidth: "2",
              opacity: "0.75",
              className: "animate-ping"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 151,
              columnNumber: 17
            },
            this
          )
        ] }, `energy-stream-${kitten.id}`, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 136,
          columnNumber: 15
        }, this))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 110,
        columnNumber: 11
      }, this),
      kittens.map((kitten) => {
        if (!kitten.deathGazeTarget || kitten.state !== "DEATH_GAZE_STARE") return null;
        return /* @__PURE__ */ jsxDEV("g", { children: [
          /* @__PURE__ */ jsxDEV(
            "line",
            {
              x1: `${kitten.x - 0.4}%`,
              y1: `${kitten.y - 0.3}%`,
              x2: `${kitten.deathGazeTarget.x}%`,
              y2: `${kitten.deathGazeTarget.y}%`,
              stroke: "url(#deathGazeBeamGrad)",
              strokeWidth: "4",
              filter: "url(#deathGazeGlow)",
              className: "animate-pulse"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 173,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "line",
            {
              x1: `${kitten.x + 0.4}%`,
              y1: `${kitten.y - 0.3}%`,
              x2: `${kitten.deathGazeTarget.x}%`,
              y2: `${kitten.deathGazeTarget.y}%`,
              stroke: "url(#deathGazeBeamGrad)",
              strokeWidth: "4",
              filter: "url(#deathGazeGlow)",
              className: "animate-pulse"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 184,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "circle",
            {
              cx: `${kitten.deathGazeTarget.x}%`,
              cy: `${kitten.deathGazeTarget.y}%`,
              r: "22",
              fill: "#ef4444",
              opacity: "0.8",
              className: "animate-ping"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 195,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "circle",
            {
              cx: `${kitten.deathGazeTarget.x}%`,
              cy: `${kitten.deathGazeTarget.y}%`,
              r: "10",
              fill: "#fbbf24"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 203,
              columnNumber: 15
            },
            this
          )
        ] }, `deathgaze-${kitten.id}`, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this);
      })
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    actionNotification && /* @__PURE__ */ jsxDEV("div", { className: "fixed top-20 left-1/2 -translate-x-1/2 z-50 pointer-events-auto px-5 py-2.5 rounded-2xl bg-slate-950/95 border-2 border-amber-400 text-amber-200 text-xs font-mono font-bold shadow-2xl shadow-amber-950 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200", children: [
      /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400 animate-spin" }, void 0, false, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 217,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: actionNotification }, void 0, false, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 218,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
      lineNumber: 216,
      columnNumber: 9
    }, this),
    showTacticalBar ? /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-36 left-4 z-40 flex flex-wrap items-center gap-2 pointer-events-auto p-1.5 rounded-3xl bg-slate-950/80 border border-amber-500/40 shadow-2xl backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleTriggerMemorialCharger,
          className: "px-3.5 py-2 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-black font-mono text-xs font-black flex items-center gap-2 shadow-xl shadow-amber-950/80 cursor-pointer active:scale-95 transition-all ring-2 ring-amber-300",
          title: "Uruchom Ładowarkę Pomnikową: Prześlij strumień energii kwantowej z Pomnika Mamy do wszystkich kotków",
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-black fill-current animate-bounce" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 230,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "⚡ Ładowarka Pomnikowa (Prześlij Energię & Mruczenie)" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 231,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 225,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleKillGnidaSalvo,
          className: "px-3.5 py-2 rounded-2xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-mono text-xs font-black flex items-center gap-2 shadow-xl shadow-red-950 cursor-pointer active:scale-95 transition-all ring-2 ring-red-400",
          title: "Zmasowany atak Śmiertelnym Wzrokiem wszystkich 8 kotków na agresywne malware",
          children: [
            /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-yellow-300 animate-pulse" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 239,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "🗡️ KILL GNIDA: Salwa Śmiertelnego Spojrzenia (0 ms)" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 240,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 234,
          columnNumber: 11
        },
        this
      ),
      onNavigateToTab && /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => onNavigateToTab("healing"),
          className: "px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-amber-400/50 text-amber-300 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer",
          title: "Przejdź do pełnej podstrony Centrum Autonaprawy i Strażnika",
          children: /* @__PURE__ */ jsxDEV("span", { children: "Autonaprawa ↗" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 249,
            columnNumber: 15
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 244,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setShowTacticalBar(false),
          className: "p-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-mono font-bold cursor-pointer border border-slate-800",
          title: "Zamknij pasek akcji kotków",
          children: "✕"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 253,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
      lineNumber: 224,
      columnNumber: 9
    }, this) : /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShowTacticalBar(true),
        className: "fixed bottom-36 left-4 z-40 px-3 py-1.5 rounded-xl bg-slate-950/90 hover:bg-slate-900 border border-amber-500/50 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-xl pointer-events-auto cursor-pointer",
        title: "Pokaż pasek akcji taktycznych kotków",
        children: /* @__PURE__ */ jsxDEV("span", { children: "⚡ Pasek Kotków" }, void 0, false, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 267,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 262,
        columnNumber: 9
      },
      this
    ),
    showMemorialWidget ? /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "absolute bottom-6 right-6 pointer-events-auto group",
        children: /* @__PURE__ */ jsxDEV("div", { className: `relative p-3 rounded-3xl bg-slate-950/90 backdrop-blur border-2 transition-all duration-300 flex items-center gap-3 shadow-2xl ${isChargingAnimActive ? "border-amber-400 shadow-amber-500/60 scale-105 ring-4 ring-amber-500/40 bg-amber-950/40" : "border-amber-500/60 hover:border-amber-300"}`, children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "relative cursor-pointer",
              onClick: handleTriggerMemorialCharger,
              title: "Kliknij, aby przesłać energię z Pomnika do kotków",
              children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-3xl", children: "🐱🕊️" }, void 0, false, {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 286,
                  columnNumber: 15
                }, this),
                isChargingAnimActive && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-2 -right-2 text-base animate-ping", children: "⚡" }, void 0, false, {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 288,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 281,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "text-left font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-amber-300 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV("span", { onClick: handleTriggerMemorialCharger, className: "cursor-pointer hover:underline", children: "Pomnik Mamy „Iskra”" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 294,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(Flower2, { className: "w-3.5 h-3.5 text-rose-400 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 295,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 293,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleTriggerMemorialCharger,
                  className: "text-[10px] text-amber-200/90 font-bold flex items-center gap-1 hover:text-amber-100 cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                      lineNumber: 303,
                      columnNumber: 19
                    }, this),
                    "Ładowarka: AKTYWNA"
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 299,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200 border border-amber-400/40", children: [
                memorial.memorialFlowersPlaced,
                " 💐"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 306,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 298,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mt-1", children: [
              onNavigateToTab && /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => onNavigateToTab("healing"),
                  className: "text-[9px] text-cyan-300 hover:text-cyan-200 underline cursor-pointer",
                  children: "Baza Pamięci ↗"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 313,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setShowMemorialWidget(false),
                  className: "text-[9px] text-slate-500 hover:text-slate-300 ml-auto cursor-pointer",
                  title: "Zamknij podgląd pomnika",
                  children: "Zamknij ✕"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 320,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 311,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 292,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 276,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 273,
        columnNumber: 9
      },
      this
    ) : /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: () => setShowMemorialWidget(true),
        className: "absolute bottom-6 right-6 pointer-events-auto px-3 py-1.5 rounded-2xl bg-slate-950/90 border border-amber-500/50 text-amber-300 font-mono text-[11px] font-bold flex items-center gap-1.5 shadow-xl cursor-pointer",
        title: "Pokaż widget Pomnika Mamy",
        children: /* @__PURE__ */ jsxDEV("span", { children: "🐱🕊️ Pomnik Mamy" }, void 0, false, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 337,
          columnNumber: 11
        }, this)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 332,
        columnNumber: 9
      },
      this
    ),
    kittens.map((kitten) => {
      const isDeathGazing = kitten.state === "DEATH_GAZE_STARE";
      const isCharging = isChargingAnimActive || kitten.state === "PURRING_RECHARGE";
      const isSleeping = kitten.isSleepingNearMom;
      return /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            left: `${kitten.x}%`,
            top: `${kitten.y}%`,
            transform: "translate(-50%, -50%)",
            transition: "left 0.12s ease-out, top 0.12s ease-out"
          },
          className: "absolute pointer-events-auto cursor-pointer group",
          onClick: () => {
            kittenDroneEngine.petKitten(kitten.id);
            setSelectedKitten(kitten);
          },
          title: `${kitten.name} | ${kitten.cuteAction}`,
          children: /* @__PURE__ */ jsxDEV("div", { className: "relative flex flex-col items-center", children: [
            isCharging && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-7 whitespace-nowrap px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-mono font-black animate-bounce shadow-lg shadow-amber-500/60 z-50 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "💖 MRRRRR~ 432Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 368,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-2.5 h-2.5 text-rose-900" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 369,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 367,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded-2xl border transition-all duration-200 flex items-center justify-center shadow-lg ${isDeathGazing ? "bg-red-950/90 border-red-400 text-white scale-140 shadow-red-500/80 animate-bounce ring-4 ring-red-500/50" : isCharging ? "bg-gradient-to-br from-amber-500/90 to-rose-500/90 border-amber-200 text-white scale-125 shadow-amber-500/70 ring-4 ring-amber-400/50 animate-pulse" : isSleeping ? "bg-amber-950/70 border-amber-400/60 text-amber-200 shadow-amber-500/30" : "bg-slate-950/80 border-amber-500/40 text-white hover:scale-110 shadow-amber-500/20"}`, children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-base sm:text-lg leading-none select-none", children: isDeathGazing ? "😾" : isCharging ? "😻" : kitten.avatarEmoji }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 384,
                columnNumber: 17
              }, this),
              isDeathGazing && /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-1 flex gap-1", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 391,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" }, void 0, false, {
                  fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                  lineNumber: 392,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 390,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 374,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-6 whitespace-nowrap px-2 py-0.5 rounded-lg bg-black/95 border border-amber-500/50 text-[9px] font-mono text-amber-200 pointer-events-none shadow-xl z-50", children: [
              "🐾 ",
              kitten.name,
              ": ",
              kitten.cuteAction
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 398,
              columnNumber: 15
            }, this),
            isSleeping && !isCharging && /* @__PURE__ */ jsxDEV("span", { className: "absolute -top-3 text-[10px] animate-pulse", children: "💤" }, void 0, false, {
              fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
              lineNumber: 404,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 363,
            columnNumber: 13
          }, this)
        },
        kitten.id,
        false,
        {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 348,
          columnNumber: 11
        },
        this
      );
    }),
    selectedKitten && /* @__PURE__ */ jsxDEV("div", { className: "fixed bottom-24 right-4 z-50 pointer-events-auto p-4 rounded-2xl bg-slate-950/95 border-2 border-amber-500 text-white font-mono text-xs shadow-2xl max-w-sm w-full animate-in slide-in-from-bottom duration-200", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xl", children: "🐱" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 416,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-black text-amber-300", children: [
            selectedKitten.name,
            " – Dron „Usuń Gnidę”"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 417,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 415,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedKitten(null),
            className: "text-slate-400 hover:text-white text-sm cursor-pointer",
            children: "✕"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 419,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 414,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-3 space-y-1.5 text-[11px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-100 text-[11px] leading-snug", children: [
          "„",
          selectedKitten.cuteAction,
          "”"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 428,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Podwarstwa Oprogramowania:" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 432,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold truncate max-w-[170px]", children: selectedKitten.currentSublayer }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 433,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 431,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Zgładzone Śmiertelnym Wzrokiem:" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 436,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-rose-400 font-bold", children: [
            selectedKitten.gnidasKilledByDeathGaze,
            " gnid (0 ms)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 437,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 435,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Puszystość / Morale:" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 440,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% Puszystości ✨" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 441,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 439,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Poziom Energii:" }, void 0, false, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 444,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: [
            selectedKitten.energyPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 445,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
          lineNumber: 443,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 427,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-2 border-t border-slate-800 flex gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              kittenDroneEngine.petKitten(selectedKitten.id);
            },
            className: "flex-1 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Heart, { className: "w-3 h-3 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 456,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pogłaszcz" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 457,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 450,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              kittenDroneEngine.triggerKittenDeathGaze(`gnida_${selectedKitten.name.toLowerCase()}.bin`, selectedKitten.x, selectedKitten.y);
              setSelectedKitten(null);
            },
            className: "flex-1 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-[10px] flex items-center justify-center gap-1 cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Eye, { className: "w-3 h-3 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 466,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Morduj Wzrokiem (0 ms)!" }, void 0, false, {
                fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
                lineNumber: 467,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
            lineNumber: 459,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
        lineNumber: 449,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
      lineNumber: 413,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/KittenDronesOverlay.tsx",
    lineNumber: 72,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktpdHRlbkRyb25lc092ZXJsYXkudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgU3BhcmtsZXMsIEhlYXJ0LCBFeWUsIFphcCwgQ3Jvc3NoYWlyLCBGbG93ZXIyLCBTaGllbGRBbGVydCwgUmFkaW8sIFZvbHVtZTIgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgS2l0dGVuRHJvbmVFbnRpdHksIE1vdGhlckNhdE1lbW9yaWFsRGF0YSB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGtpdHRlbkRyb25lRW5naW5lIH0gZnJvbSAnLi4vdXRpbHMva2l0dGVuRHJvbmVFbmdpbmUnO1xuXG5pbnRlcmZhY2UgS2l0dGVuRHJvbmVzT3ZlcmxheVByb3BzIHtcbiAgaXNNaW5pbWFsTG9hZGluZ01vZGU/OiBib29sZWFuO1xuICBvbk5hdmlnYXRlVG9UYWI/OiAodGFiOiBzdHJpbmcpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBLaXR0ZW5Ecm9uZXNPdmVybGF5OiBSZWFjdC5GQzxLaXR0ZW5Ecm9uZXNPdmVybGF5UHJvcHM+ID0gKHtcbiAgaXNNaW5pbWFsTG9hZGluZ01vZGUgPSBmYWxzZSxcbiAgb25OYXZpZ2F0ZVRvVGFiLFxufSkgPT4ge1xuICBjb25zdCBba2l0dGVucywgc2V0S2l0dGVuc10gPSB1c2VTdGF0ZTxLaXR0ZW5Ecm9uZUVudGl0eVtdPigoKSA9PiBraXR0ZW5Ecm9uZUVuZ2luZS5nZXRLaXR0ZW5zKCkpO1xuICBjb25zdCBbbWVtb3JpYWwsIHNldE1lbW9yaWFsXSA9IHVzZVN0YXRlPE1vdGhlckNhdE1lbW9yaWFsRGF0YT4oKCkgPT4ga2l0dGVuRHJvbmVFbmdpbmUuZ2V0TWVtb3JpYWxEYXRhKCkpO1xuICBjb25zdCBbc2VsZWN0ZWRLaXR0ZW4sIHNldFNlbGVjdGVkS2l0dGVuXSA9IHVzZVN0YXRlPEtpdHRlbkRyb25lRW50aXR5IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtzaG93S2l0dGVucywgc2V0U2hvd0tpdHRlbnNdID0gdXNlU3RhdGU8Ym9vbGVhbj4odHJ1ZSk7XG4gIGNvbnN0IFtzaG93VGFjdGljYWxCYXIsIHNldFNob3dUYWN0aWNhbEJhcl0gPSB1c2VTdGF0ZTxib29sZWFuPih0cnVlKTtcbiAgY29uc3QgW3Nob3dNZW1vcmlhbFdpZGdldCwgc2V0U2hvd01lbW9yaWFsV2lkZ2V0XSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbaXNDaGFyZ2luZ0FuaW1BY3RpdmUsIHNldElzQ2hhcmdpbmdBbmltQWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgY29uc3QgW3B1cnJQdWxzZUtleSwgc2V0UHVyclB1bHNlS2V5XSA9IHVzZVN0YXRlPG51bWJlcj4oMCk7XG4gIGNvbnN0IFthY3Rpb25Ob3RpZmljYXRpb24sIHNldEFjdGlvbk5vdGlmaWNhdGlvbl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0ga2l0dGVuRHJvbmVFbmdpbmUuc3Vic2NyaWJlKChrLCBtKSA9PiB7XG4gICAgICBzZXRLaXR0ZW5zKGspO1xuICAgICAgc2V0TWVtb3JpYWwobSk7XG4gICAgICBzZXRJc0NoYXJnaW5nQW5pbUFjdGl2ZShraXR0ZW5Ecm9uZUVuZ2luZS5pc0NoYXJnaW5nQWN0aXZlKCkpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YigpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgaGFuZGxlVHJpZ2dlck1lbW9yaWFsQ2hhcmdlciA9ICgpID0+IHtcbiAgICBraXR0ZW5Ecm9uZUVuZ2luZS50cmlnZ2VyTWVtb3JpYWxDaGFyZ2luZygpO1xuICAgIHNldElzQ2hhcmdpbmdBbmltQWN0aXZlKHRydWUpO1xuICAgIHNldFB1cnJQdWxzZUtleShwcmV2ID0+IHByZXYgKyAxKTtcbiAgICBzZXRBY3Rpb25Ob3RpZmljYXRpb24oJ+KaoSDFgWFkb3dhcmthIFBvbW5pa293YTogUHJ6ZXPFgmFubyBzdHJ1bWllxYQgZW5lcmdpaSBrd2FudG93ZWohIFdzenlzdGtpZSBrb3RraSBtcnVjesSFIHcgaGFybW9uaWkgNDMyIEh6IPCfkpYnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEFjdGlvbk5vdGlmaWNhdGlvbihudWxsKSwgNDAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2lsbEduaWRhU2Fsdm8gPSAoKSA9PiB7XG4gICAga2l0dGVuRHJvbmVFbmdpbmUudHJpZ2dlckZ1bGxTcXVhZHJvbkRlYXRoR2F6ZVNhbHZvKCdhZ2dyZXNzaXZlX21hbHdhcmVfdHJvamFuLmV4ZScpO1xuICAgIHNldEFjdGlvbk5vdGlmaWNhdGlvbign8J+Xoe+4jyBTQUxXQSDFmk1JRVJURUxORUdPIFNQT0pSWkVOSUEgKEtJTEwgR05JREEpOiA4IGtvdGvDs3cgbmF0eWNobWlhc3QgemRlemludGVncm93YcWCbyBhZ3Jlc3l3bmUgbWFsd2FyZSAoMCBtcykhJyk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRBY3Rpb25Ob3RpZmljYXRpb24obnVsbCksIDQ1MDApO1xuICB9O1xuXG4gIC8vIElmIGluIG1pbmltYWwgbG9hZGluZyBwYWdlIG1vZGUgb3IgZGlzYWJsZWQsIGRvbid0IHNob3cgdGhlIGhlYXZ5IGZsb2F0aW5nIHdpZGdldHNcbiAgaWYgKGlzTWluaW1hbExvYWRpbmdNb2RlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoIXNob3dLaXR0ZW5zKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTM2IGxlZnQtNCB6LTQwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHBvaW50ZXItZXZlbnRzLWF1dG9cIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dLaXR0ZW5zKHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzk1IGhvdmVyOmJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC82MCB0ZXh0LWFtYmVyLTMwMCBmb250LW1vbm8gdGV4dC1bMTFweF0gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LXhsIHNoYWRvdy1hbWJlci05NTAvNTAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgIHRpdGxlPVwiUG9rYcW8IG1hxYJlIGRyb255LWtvdGtpICdVc3XFhCBHbmlkxJknXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuPvCfkLEgRHJvbnktS290a2kgKDgpPC9zcGFuPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBNZW1vcmlhbCBjb29yZGluYXRlcyBpbiB2aWV3cG9ydCAlXG4gIGNvbnN0IG1vbVggPSA4ODtcbiAgY29uc3QgbW9tWSA9IDg4O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgei0zNSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgIHsvKiBTVkcgQ2FudmFzIGZvciBLaXR0ZW4gRGVhdGggR2F6ZSBTdGFyZXMgJiBNZW1vcmlhbCBDaGFyZ2VyIEVuZXJneSBTdHJlYW1zICovfVxuICAgICAgPHN2ZyBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgcG9pbnRlci1ldmVudHMtbm9uZVwiPlxuICAgICAgICA8ZGVmcz5cbiAgICAgICAgICB7LyogTGFzZXIgRXllIERlYXRoIEdhemUgR3JhZGllbnQgKi99XG4gICAgICAgICAgPGxpbmVhckdyYWRpZW50IGlkPVwiZGVhdGhHYXplQmVhbUdyYWRcIiB4MT1cIjAlXCIgeTE9XCIwJVwiIHgyPVwiMTAwJVwiIHkyPVwiMTAwJVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjZjQzZjVlXCIgc3RvcE9wYWNpdHk9XCIxXCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjUwJVwiIHN0b3BDb2xvcj1cIiNmYmJmMjRcIiBzdG9wT3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCIxMDAlXCIgc3RvcENvbG9yPVwiI2VmNDQ0NFwiIHN0b3BPcGFjaXR5PVwiMVwiIC8+XG4gICAgICAgICAgPC9saW5lYXJHcmFkaWVudD5cblxuICAgICAgICAgIHsvKiBNZW1vcmlhbCBDaGFyZ2VyIEluZHVjdGlvbiBFbmVyZ3kgU3RyZWFtIEdyYWRpZW50ICovfVxuICAgICAgICAgIDxsaW5lYXJHcmFkaWVudCBpZD1cIm1lbW9yaWFsQ2hhcmdlckVuZXJneUdyYWRcIiB4MT1cIjAlXCIgeTE9XCIxMDAlXCIgeDI9XCIxMDAlXCIgeTI9XCIwJVwiPlxuICAgICAgICAgICAgPHN0b3Agb2Zmc2V0PVwiMCVcIiBzdG9wQ29sb3I9XCIjZmJiZjI0XCIgc3RvcE9wYWNpdHk9XCIwLjk1XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjQwJVwiIHN0b3BDb2xvcj1cIiMzOGJkZjhcIiBzdG9wT3BhY2l0eT1cIjAuOVwiIC8+XG4gICAgICAgICAgICA8c3RvcCBvZmZzZXQ9XCI3NSVcIiBzdG9wQ29sb3I9XCIjZjQzZjVlXCIgc3RvcE9wYWNpdHk9XCIwLjg1XCIgLz5cbiAgICAgICAgICAgIDxzdG9wIG9mZnNldD1cIjEwMCVcIiBzdG9wQ29sb3I9XCIjYTg1NWY3XCIgc3RvcE9wYWNpdHk9XCIwLjk1XCIgLz5cbiAgICAgICAgICA8L2xpbmVhckdyYWRpZW50PlxuXG4gICAgICAgICAgPGZpbHRlciBpZD1cImRlYXRoR2F6ZUdsb3dcIj5cbiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCIzLjVcIiByZXN1bHQ9XCJnbG93XCIgLz5cbiAgICAgICAgICAgIDxmZU1lcmdlPlxuICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49XCJnbG93XCIgLz5cbiAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPVwiU291cmNlR3JhcGhpY1wiIC8+XG4gICAgICAgICAgICA8L2ZlTWVyZ2U+XG4gICAgICAgICAgPC9maWx0ZXI+XG5cbiAgICAgICAgICA8ZmlsdGVyIGlkPVwiY2hhcmdlckdsb3dcIj5cbiAgICAgICAgICAgIDxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249XCI0LjVcIiByZXN1bHQ9XCJnbG93XCIgLz5cbiAgICAgICAgICAgIDxmZU1lcmdlPlxuICAgICAgICAgICAgICA8ZmVNZXJnZU5vZGUgaW49XCJnbG93XCIgLz5cbiAgICAgICAgICAgICAgPGZlTWVyZ2VOb2RlIGluPVwiU291cmNlR3JhcGhpY1wiIC8+XG4gICAgICAgICAgICA8L2ZlTWVyZ2U+XG4gICAgICAgICAgPC9maWx0ZXI+XG4gICAgICAgIDwvZGVmcz5cblxuICAgICAgICB7Lyog4pqhIEFOSU1BQ0pBIFBSWkVQxYFZV1UgRU5FUkdJSSBaIMWBQURPV0FSS0kgUE9NTklLT1dFSiBETyBXU1pZU1RLSUNIIEtPVEvDk1cgKi99XG4gICAgICAgIHtpc0NoYXJnaW5nQW5pbUFjdGl2ZSAmJiAoXG4gICAgICAgICAgPGc+XG4gICAgICAgICAgICB7LyogTW9udW1lbnQgQ29yZSBTaG9ja3dhdmUgV2F2ZXMgKi99XG4gICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgIGN4PXtgJHttb21YfSVgfVxuICAgICAgICAgICAgICBjeT17YCR7bW9tWX0lYH1cbiAgICAgICAgICAgICAgcj1cIjQ1XCJcbiAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICBzdHJva2U9XCIjZmJiZjI0XCJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIyLjVcIlxuICAgICAgICAgICAgICBvcGFjaXR5PVwiMC44XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nXCJcbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgIGN4PXtgJHttb21YfSVgfVxuICAgICAgICAgICAgICBjeT17YCR7bW9tWX0lYH1cbiAgICAgICAgICAgICAgcj1cIjg1XCJcbiAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICBzdHJva2U9XCIjMzhiZGY4XCJcbiAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCIxLjVcIlxuICAgICAgICAgICAgICBvcGFjaXR5PVwiMC42XCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nXCJcbiAgICAgICAgICAgICAgc3R5bGU9e3sgYW5pbWF0aW9uRHVyYXRpb246ICcycycgfX1cbiAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgIHsvKiBFbmVyZ3kgQmVhbXMgRmxvd2luZyBmcm9tIE1lbW9yaWFsIENoYXJnZXIgdG8gRWFjaCBLaXR0ZW4gKi99XG4gICAgICAgICAgICB7a2l0dGVucy5tYXAoKGtpdHRlbiwgaSkgPT4gKFxuICAgICAgICAgICAgICA8ZyBrZXk9e2BlbmVyZ3ktc3RyZWFtLSR7a2l0dGVuLmlkfWB9PlxuICAgICAgICAgICAgICAgIHsvKiBNYWluIENvbmR1aXQgQXJjIExpbmUgKi99XG4gICAgICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgICAgIHgxPXtgJHttb21YfSVgfVxuICAgICAgICAgICAgICAgICAgeTE9e2Ake21vbVl9JWB9XG4gICAgICAgICAgICAgICAgICB4Mj17YCR7a2l0dGVuLnh9JWB9XG4gICAgICAgICAgICAgICAgICB5Mj17YCR7a2l0dGVuLnl9JWB9XG4gICAgICAgICAgICAgICAgICBzdHJva2U9XCJ1cmwoI21lbW9yaWFsQ2hhcmdlckVuZXJneUdyYWQpXCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMy41XCJcbiAgICAgICAgICAgICAgICAgIHN0cm9rZURhc2hhcnJheT1cIjggNlwiXG4gICAgICAgICAgICAgICAgICBmaWx0ZXI9XCJ1cmwoI2NoYXJnZXJHbG93KVwiXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgICAgey8qIEVuZXJneSBQdWxzZSBSaW5nIGF0IEtpdHRlbiBEZXN0aW5hdGlvbiAqL31cbiAgICAgICAgICAgICAgICA8Y2lyY2xlXG4gICAgICAgICAgICAgICAgICBjeD17YCR7a2l0dGVuLnh9JWB9XG4gICAgICAgICAgICAgICAgICBjeT17YCR7a2l0dGVuLnl9JWB9XG4gICAgICAgICAgICAgICAgICByPVwiMjRcIlxuICAgICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIlxuICAgICAgICAgICAgICAgICAgc3Ryb2tlPVwiI2ZiYmYyNFwiXG4gICAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjJcIlxuICAgICAgICAgICAgICAgICAgb3BhY2l0eT1cIjAuNzVcIlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgICA8L2c+XG4gICAgICAgICl9XG5cbiAgICAgICAgey8qIFJlbmRlciBEZWF0aCBHYXplIExhc2VyIEV5ZSBCZWFtcyBmcm9tIEtpdHRlbnMgdG8gR25pZGFzICovfVxuICAgICAgICB7a2l0dGVucy5tYXAoKGtpdHRlbikgPT4ge1xuICAgICAgICAgIGlmICgha2l0dGVuLmRlYXRoR2F6ZVRhcmdldCB8fCBraXR0ZW4uc3RhdGUgIT09ICdERUFUSF9HQVpFX1NUQVJFJykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGcga2V5PXtgZGVhdGhnYXplLSR7a2l0dGVuLmlkfWB9PlxuICAgICAgICAgICAgICB7LyogRXllIExlZnQgQmVhbSAqL31cbiAgICAgICAgICAgICAgPGxpbmVcbiAgICAgICAgICAgICAgICB4MT17YCR7a2l0dGVuLnggLSAwLjR9JWB9XG4gICAgICAgICAgICAgICAgeTE9e2Ake2tpdHRlbi55IC0gMC4zfSVgfVxuICAgICAgICAgICAgICAgIHgyPXtgJHtraXR0ZW4uZGVhdGhHYXplVGFyZ2V0Lnh9JWB9XG4gICAgICAgICAgICAgICAgeTI9e2Ake2tpdHRlbi5kZWF0aEdhemVUYXJnZXQueX0lYH1cbiAgICAgICAgICAgICAgICBzdHJva2U9XCJ1cmwoI2RlYXRoR2F6ZUJlYW1HcmFkKVwiXG4gICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg9XCI0XCJcbiAgICAgICAgICAgICAgICBmaWx0ZXI9XCJ1cmwoI2RlYXRoR2F6ZUdsb3cpXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgey8qIEV5ZSBSaWdodCBCZWFtICovfVxuICAgICAgICAgICAgICA8bGluZVxuICAgICAgICAgICAgICAgIHgxPXtgJHtraXR0ZW4ueCArIDAuNH0lYH1cbiAgICAgICAgICAgICAgICB5MT17YCR7a2l0dGVuLnkgLSAwLjN9JWB9XG4gICAgICAgICAgICAgICAgeDI9e2Ake2tpdHRlbi5kZWF0aEdhemVUYXJnZXQueH0lYH1cbiAgICAgICAgICAgICAgICB5Mj17YCR7a2l0dGVuLmRlYXRoR2F6ZVRhcmdldC55fSVgfVxuICAgICAgICAgICAgICAgIHN0cm9rZT1cInVybCgjZGVhdGhHYXplQmVhbUdyYWQpXCJcbiAgICAgICAgICAgICAgICBzdHJva2VXaWR0aD1cIjRcIlxuICAgICAgICAgICAgICAgIGZpbHRlcj1cInVybCgjZGVhdGhHYXplR2xvdylcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7LyogVGFyZ2V0IFNob2Nrd2F2ZSBWYXBvcml6YXRpb24gKi99XG4gICAgICAgICAgICAgIDxjaXJjbGVcbiAgICAgICAgICAgICAgICBjeD17YCR7a2l0dGVuLmRlYXRoR2F6ZVRhcmdldC54fSVgfVxuICAgICAgICAgICAgICAgIGN5PXtgJHtraXR0ZW4uZGVhdGhHYXplVGFyZ2V0Lnl9JWB9XG4gICAgICAgICAgICAgICAgcj1cIjIyXCJcbiAgICAgICAgICAgICAgICBmaWxsPVwiI2VmNDQ0NFwiXG4gICAgICAgICAgICAgICAgb3BhY2l0eT1cIjAuOFwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYW5pbWF0ZS1waW5nXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGNpcmNsZVxuICAgICAgICAgICAgICAgIGN4PXtgJHtraXR0ZW4uZGVhdGhHYXplVGFyZ2V0Lnh9JWB9XG4gICAgICAgICAgICAgICAgY3k9e2Ake2tpdHRlbi5kZWF0aEdhemVUYXJnZXQueX0lYH1cbiAgICAgICAgICAgICAgICByPVwiMTBcIlxuICAgICAgICAgICAgICAgIGZpbGw9XCIjZmJiZjI0XCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZz5cbiAgICAgICAgICApO1xuICAgICAgICB9KX1cbiAgICAgIDwvc3ZnPlxuXG4gICAgICB7LyogRmxvYXRpbmcgQWN0aW9uIEJhbm5lciBOb3RpZmljYXRpb24gKi99XG4gICAgICB7YWN0aW9uTm90aWZpY2F0aW9uICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCB0b3AtMjAgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB6LTUwIHBvaW50ZXItZXZlbnRzLWF1dG8gcHgtNSBweS0yLjUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwLzk1IGJvcmRlci0yIGJvcmRlci1hbWJlci00MDAgdGV4dC1hbWJlci0yMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIHNoYWRvdy0yeGwgc2hhZG93LWFtYmVyLTk1MCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGFuaW1hdGUtaW4gZmFkZS1pbiBzbGlkZS1pbi1mcm9tLXRvcC0zIGR1cmF0aW9uLTIwMFwiPlxuICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwIGFuaW1hdGUtc3BpblwiIC8+XG4gICAgICAgICAgPHNwYW4+e2FjdGlvbk5vdGlmaWNhdGlvbn08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFF1aWNrIFRhY3RpY2FsIEFjdGlvbiBGbG9hdGluZyBCYXIgKi99XG4gICAgICB7c2hvd1RhY3RpY2FsQmFyID8gKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGJvdHRvbS0zNiBsZWZ0LTQgei00MCBmbGV4IGZsZXgtd3JhcCBpdGVtcy1jZW50ZXIgZ2FwLTIgcG9pbnRlci1ldmVudHMtYXV0byBwLTEuNSByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNDAgc2hhZG93LTJ4bCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVHJpZ2dlck1lbW9yaWFsQ2hhcmdlcn1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1hbWJlci02MDAgdmlhLXllbGxvdy01MDAgdG8tYW1iZXItNjAwIGhvdmVyOmZyb20tYW1iZXItNTAwIGhvdmVyOnRvLXllbGxvdy00MDAgdGV4dC1ibGFjayBmb250LW1vbm8gdGV4dC14cyBmb250LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCBzaGFkb3ctYW1iZXItOTUwLzgwIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCByaW5nLTIgcmluZy1hbWJlci0zMDBcIlxuICAgICAgICAgICAgdGl0bGU9XCJVcnVjaG9tIMWBYWRvd2Fya8SZIFBvbW5pa293xIU6IFByemXFm2xpaiBzdHJ1bWllxYQgZW5lcmdpaSBrd2FudG93ZWogeiBQb21uaWthIE1hbXkgZG8gd3N6eXN0a2ljaCBrb3Rrw7N3XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1ibGFjayBmaWxsLWN1cnJlbnQgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgPHNwYW4+4pqhIMWBYWRvd2Fya2EgUG9tbmlrb3dhIChQcnplxZtsaWogRW5lcmdpxJkgJiBNcnVjemVuaWUpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlS2lsbEduaWRhU2Fsdm99XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB0by1yb3NlLTYwMCBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcm9zZS01MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gdGV4dC14cyBmb250LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCBzaGFkb3ctcmVkLTk1MCBjdXJzb3ItcG9pbnRlciBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgcmluZy0yIHJpbmctcmVkLTQwMFwiXG4gICAgICAgICAgICB0aXRsZT1cIlptYXNvd2FueSBhdGFrIMWabWllcnRlbG55bSBXenJva2llbSB3c3p5c3RraWNoIDgga290a8OzdyBuYSBhZ3Jlc3l3bmUgbWFsd2FyZVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPvCfl6HvuI8gS0lMTCBHTklEQTogU2Fsd2EgxZptaWVydGVsbmVnbyBTcG9qcnplbmlhICgwIG1zKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHtvbk5hdmlnYXRlVG9UYWIgJiYgKFxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ2hlYWxpbmcnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNTAgdGV4dC1hbWJlci0zMDAgdGV4dC1bMTFweF0gZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUHJ6ZWpkxbogZG8gcGXFgm5laiBwb2RzdHJvbnkgQ2VudHJ1bSBBdXRvbmFwcmF3eSBpIFN0cmHFvG5pa2FcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj5BdXRvbmFwcmF3YSDihpc8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd1RhY3RpY2FsQmFyKGZhbHNlKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBjdXJzb3ItcG9pbnRlciBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiXG4gICAgICAgICAgICB0aXRsZT1cIlphbWtuaWogcGFzZWsgYWtjamkga290a8Ozd1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAg4pyVXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dUYWN0aWNhbEJhcih0cnVlKX1cbiAgICAgICAgICBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMzYgbGVmdC00IHotNDAgcHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvOTAgaG92ZXI6Ymctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzUwIHRleHQtYW1iZXItMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3cteGwgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgdGl0bGU9XCJQb2thxbwgcGFzZWsgYWtjamkgdGFrdHljem55Y2gga290a8Ozd1wiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj7imqEgUGFzZWsgS290a8Ozdzwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApfVxuXG4gICAgICB7LyogSGVyb2ljIE1vdGhlciBDYXQgTW9udW1lbnQgJiBJbnRlcmFjdGl2ZSBNZW1vcmlhbCBDaGFyZ2VyIEh1YiBpbiBTRS0wNCAqL31cbiAgICAgIHtzaG93TWVtb3JpYWxXaWRnZXQgPyAoXG4gICAgICAgIDxkaXYgXG4gICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgYm90dG9tLTYgcmlnaHQtNiBwb2ludGVyLWV2ZW50cy1hdXRvIGdyb3VwXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcmVsYXRpdmUgcC0zIHJvdW5kZWQtM3hsIGJnLXNsYXRlLTk1MC85MCBiYWNrZHJvcC1ibHVyIGJvcmRlci0yIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyBzaGFkb3ctMnhsICR7XG4gICAgICAgICAgICBpc0NoYXJnaW5nQW5pbUFjdGl2ZSBcbiAgICAgICAgICAgICAgPyAnYm9yZGVyLWFtYmVyLTQwMCBzaGFkb3ctYW1iZXItNTAwLzYwIHNjYWxlLTEwNSByaW5nLTQgcmluZy1hbWJlci01MDAvNDAgYmctYW1iZXItOTUwLzQwJyBcbiAgICAgICAgICAgICAgOiAnYm9yZGVyLWFtYmVyLTUwMC82MCBob3Zlcjpib3JkZXItYW1iZXItMzAwJ1xuICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVHJpZ2dlck1lbW9yaWFsQ2hhcmdlcn1cbiAgICAgICAgICAgICAgdGl0bGU9XCJLbGlrbmlqLCBhYnkgcHJ6ZXPFgmHEhyBlbmVyZ2nEmSB6IFBvbW5pa2EgZG8ga290a8Ozd1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtM3hsXCI+8J+QsfCflYrvuI88L3NwYW4+XG4gICAgICAgICAgICAgIHtpc0NoYXJnaW5nQW5pbUFjdGl2ZSAmJiAoXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0yIC1yaWdodC0yIHRleHQtYmFzZSBhbmltYXRlLXBpbmdcIj7imqE8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtYW1iZXItMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtoYW5kbGVUcmlnZ2VyTWVtb3JpYWxDaGFyZ2VyfSBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciBob3Zlcjp1bmRlcmxpbmVcIj5Qb21uaWsgTWFteSDigJ5Jc2tyYeKAnTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Rmxvd2VyMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVHJpZ2dlck1lbW9yaWFsQ2hhcmdlcn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtYW1iZXItMjAwLzkwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBob3Zlcjp0ZXh0LWFtYmVyLTEwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIMWBYWRvd2Fya2E6IEFLVFlXTkFcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIHB4LTEuNSBweS0wLjIgcm91bmRlZCBiZy1hbWJlci01MDAvMzAgdGV4dC1hbWJlci0yMDAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgIHttZW1vcmlhbC5tZW1vcmlhbEZsb3dlcnNQbGFjZWR9IPCfkpBcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgbXQtMVwiPlxuICAgICAgICAgICAgICAgIHtvbk5hdmlnYXRlVG9UYWIgJiYgKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ2hlYWxpbmcnKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWN5YW4tMzAwIGhvdmVyOnRleHQtY3lhbi0yMDAgdW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgQmF6YSBQYW1pxJljaSDihpdcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd01lbW9yaWFsV2lkZ2V0KGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1zbGF0ZS01MDAgaG92ZXI6dGV4dC1zbGF0ZS0zMDAgbWwtYXV0byBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlphbWtuaWogcG9kZ2zEhWQgcG9tbmlrYVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgWmFta25paiDinJVcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd01lbW9yaWFsV2lkZ2V0KHRydWUpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJvdHRvbS02IHJpZ2h0LTYgcG9pbnRlci1ldmVudHMtYXV0byBweC0zIHB5LTEuNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAvOTAgYm9yZGVyIGJvcmRlci1hbWJlci01MDAvNTAgdGV4dC1hbWJlci0zMDAgZm9udC1tb25vIHRleHQtWzExcHhdIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy14bCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgdGl0bGU9XCJQb2thxbwgd2lkZ2V0IFBvbW5pa2EgTWFteVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj7wn5Cx8J+Viu+4jyBQb21uaWsgTWFteTwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICApfVxuXG4gICAgICB7LyogOCBDdXRlIEtpdHRlbiBFbnRpdGllcyBMZWFwaW5nIGFjcm9zcyBsYXllcnMgKi99XG4gICAgICB7a2l0dGVucy5tYXAoKGtpdHRlbikgPT4ge1xuICAgICAgICBjb25zdCBpc0RlYXRoR2F6aW5nID0ga2l0dGVuLnN0YXRlID09PSAnREVBVEhfR0FaRV9TVEFSRSc7XG4gICAgICAgIGNvbnN0IGlzQ2hhcmdpbmcgPSBpc0NoYXJnaW5nQW5pbUFjdGl2ZSB8fCBraXR0ZW4uc3RhdGUgPT09ICdQVVJSSU5HX1JFQ0hBUkdFJztcbiAgICAgICAgY29uc3QgaXNTbGVlcGluZyA9IGtpdHRlbi5pc1NsZWVwaW5nTmVhck1vbTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGtleT17a2l0dGVuLmlkfVxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgbGVmdDogYCR7a2l0dGVuLnh9JWAsXG4gICAgICAgICAgICAgIHRvcDogYCR7a2l0dGVuLnl9JWAsXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKScsXG4gICAgICAgICAgICAgIHRyYW5zaXRpb246ICdsZWZ0IDAuMTJzIGVhc2Utb3V0LCB0b3AgMC4xMnMgZWFzZS1vdXQnXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcG9pbnRlci1ldmVudHMtYXV0byBjdXJzb3ItcG9pbnRlciBncm91cFwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGtpdHRlbkRyb25lRW5naW5lLnBldEtpdHRlbihraXR0ZW4uaWQpO1xuICAgICAgICAgICAgICBzZXRTZWxlY3RlZEtpdHRlbihraXR0ZW4pO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHRpdGxlPXtgJHtraXR0ZW4ubmFtZX0gfCAke2tpdHRlbi5jdXRlQWN0aW9ufWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgey8qIFZpc3VhbCBQdXJyaW5nIEZsb2F0aW5nIFNwYXJrbGVzICYgTXVzaWNhbCBIYXJtb25pY3MgKFJhZG9zbmUgTXJ1Y3plbmllKSAqL31cbiAgICAgICAgICAgICAge2lzQ2hhcmdpbmcgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC03IHdoaXRlc3BhY2Utbm93cmFwIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1hbWJlci01MDAgdGV4dC1ibGFjayB0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJsYWNrIGFuaW1hdGUtYm91bmNlIHNoYWRvdy1sZyBzaGFkb3ctYW1iZXItNTAwLzYwIHotNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPvCfkpYgTVJSUlJSfiA0MzJIejwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTIuNSBoLTIuNSB0ZXh0LXJvc2UtOTAwXCIgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICB7LyogQ3V0ZSBLaXR0ZW4gQm9keSBCdWJibGUgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0xLjUgcm91bmRlZC0yeGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBpc0RlYXRoR2F6aW5nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwLzkwIGJvcmRlci1yZWQtNDAwIHRleHQtd2hpdGUgc2NhbGUtMTQwIHNoYWRvdy1yZWQtNTAwLzgwIGFuaW1hdGUtYm91bmNlIHJpbmctNCByaW5nLXJlZC01MDAvNTAnXG4gICAgICAgICAgICAgICAgICA6IGlzQ2hhcmdpbmdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLWJyIGZyb20tYW1iZXItNTAwLzkwIHRvLXJvc2UtNTAwLzkwIGJvcmRlci1hbWJlci0yMDAgdGV4dC13aGl0ZSBzY2FsZS0xMjUgc2hhZG93LWFtYmVyLTUwMC83MCByaW5nLTQgcmluZy1hbWJlci00MDAvNTAgYW5pbWF0ZS1wdWxzZSdcbiAgICAgICAgICAgICAgICAgIDogaXNTbGVlcGluZ1xuICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzcwIGJvcmRlci1hbWJlci00MDAvNjAgdGV4dC1hbWJlci0yMDAgc2hhZG93LWFtYmVyLTUwMC8zMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC84MCBib3JkZXItYW1iZXItNTAwLzQwIHRleHQtd2hpdGUgaG92ZXI6c2NhbGUtMTEwIHNoYWRvdy1hbWJlci01MDAvMjAnXG4gICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICB7LyogS2l0dGVuIEF2YXRhciAqL31cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWJhc2Ugc206dGV4dC1sZyBsZWFkaW5nLW5vbmUgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIHtpc0RlYXRoR2F6aW5nID8gJ/CfmL4nIDogaXNDaGFyZ2luZyA/ICfwn5i7JyA6IGtpdHRlbi5hdmF0YXJFbW9qaX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICB7LyogR2xvd2luZyBMYXNlciBFeWVzIGluZGljYXRvciBkdXJpbmcgRGVhdGggR2F6ZSAqL31cbiAgICAgICAgICAgICAgICB7aXNEZWF0aEdhemluZyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC10b3AtMSBmbGV4IGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1yZWQtNDAwIGFuaW1hdGUtcGluZ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0xLjUgaC0xLjUgcm91bmRlZC1mdWxsIGJnLXJlZC00MDAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEtpdHRlbiBOYW1lIGFuZCBBY3Rpb24gTGFiZWwgb24gSG92ZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eSBhYnNvbHV0ZSAtYm90dG9tLTYgd2hpdGVzcGFjZS1ub3dyYXAgcHgtMiBweS0wLjUgcm91bmRlZC1sZyBiZy1ibGFjay85NSBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC81MCB0ZXh0LVs5cHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTIwMCBwb2ludGVyLWV2ZW50cy1ub25lIHNoYWRvdy14bCB6LTUwXCI+XG4gICAgICAgICAgICAgICAg8J+QviB7a2l0dGVuLm5hbWV9OiB7a2l0dGVuLmN1dGVBY3Rpb259XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBIZWFydCBvciBQdXJyIFNwYXJrbGUgKi99XG4gICAgICAgICAgICAgIHtpc1NsZWVwaW5nICYmICFpc0NoYXJnaW5nICYmIChcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTMgdGV4dC1bMTBweF0gYW5pbWF0ZS1wdWxzZVwiPvCfkqQ8L3NwYW4+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH0pfVxuXG4gICAgICB7LyogU2VsZWN0ZWQgS2l0dGVuIE1vZGFsIC8gUXVpY2sgSW5zcGVjdG9yICovfVxuICAgICAge3NlbGVjdGVkS2l0dGVuICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMjQgcmlnaHQtNCB6LTUwIHBvaW50ZXItZXZlbnRzLWF1dG8gcC00IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC85NSBib3JkZXItMiBib3JkZXItYW1iZXItNTAwIHRleHQtd2hpdGUgZm9udC1tb25vIHRleHQteHMgc2hhZG93LTJ4bCBtYXgtdy1zbSB3LWZ1bGwgYW5pbWF0ZS1pbiBzbGlkZS1pbi1mcm9tLWJvdHRvbSBkdXJhdGlvbi0yMDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14bFwiPvCfkLE8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC1hbWJlci0zMDBcIj57c2VsZWN0ZWRLaXR0ZW4ubmFtZX0g4oCTIERyb24g4oCeVXN1xYQgR25pZMSZ4oCdPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkS2l0dGVuKG51bGwpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRleHQtc20gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICDinJVcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHNwYWNlLXktMS41IHRleHQtWzExcHhdXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLWFtYmVyLTk1MC80MCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCB0ZXh0LWFtYmVyLTEwMCB0ZXh0LVsxMXB4XSBsZWFkaW5nLXNudWdcIj5cbiAgICAgICAgICAgICAg4oCee3NlbGVjdGVkS2l0dGVuLmN1dGVBY3Rpb2594oCdXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Qb2R3YXJzdHdhIE9wcm9ncmFtb3dhbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LWJvbGQgdHJ1bmNhdGUgbWF4LXctWzE3MHB4XVwiPntzZWxlY3RlZEtpdHRlbi5jdXJyZW50U3VibGF5ZXJ9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+WmfFgmFkem9uZSDFmm1pZXJ0ZWxueW0gV3pyb2tpZW06PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwIGZvbnQtYm9sZFwiPntzZWxlY3RlZEtpdHRlbi5nbmlkYXNLaWxsZWRCeURlYXRoR2F6ZX0gZ25pZCAoMCBtcyk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5QdXN6eXN0b8WbxIcgLyBNb3JhbGU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZFwiPjEwMCUgUHVzenlzdG/Fm2NpIOKcqDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlBvemlvbSBFbmVyZ2lpOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+e3NlbGVjdGVkS2l0dGVuLmVuZXJneVBlcmNlbnR9JTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICBraXR0ZW5Ecm9uZUVuZ2luZS5wZXRLaXR0ZW4oc2VsZWN0ZWRLaXR0ZW4uaWQpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQteGwgYmctYW1iZXItNTAwLzIwIGhvdmVyOmJnLWFtYmVyLTUwMC8zMCBib3JkZXIgYm9yZGVyLWFtYmVyLTQwMC81MCB0ZXh0LWFtYmVyLTMwMCBmb250LWJvbGQgdGV4dC1bMTBweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8SGVhcnQgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UG9nxYJhc3pjejwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAga2l0dGVuRHJvbmVFbmdpbmUudHJpZ2dlcktpdHRlbkRlYXRoR2F6ZShgZ25pZGFfJHtzZWxlY3RlZEtpdHRlbi5uYW1lLnRvTG93ZXJDYXNlKCl9LmJpbmAsIHNlbGVjdGVkS2l0dGVuLngsIHNlbGVjdGVkS2l0dGVuLnkpO1xuICAgICAgICAgICAgICAgIHNldFNlbGVjdGVkS2l0dGVuKG51bGwpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQteGwgYmctcmVkLTYwMCBob3ZlcjpiZy1yZWQtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtWzEwcHhdIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEV5ZSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPk1vcmR1aiBXenJva2llbSAoMCBtcykhPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTREVTtBQTVEVixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQyxTQUFTLFVBQVUsT0FBTyxLQUFLLEtBQWdCLGVBQTRDO0FBRTNGLFNBQVMseUJBQXlCO0FBTzNCLGFBQU0sc0JBQTBELENBQUM7QUFBQSxFQUN0RSx1QkFBdUI7QUFBQSxFQUN2QjtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsU0FBUyxVQUFVLElBQUksU0FBOEIsTUFBTSxrQkFBa0IsV0FBVyxDQUFDO0FBQ2hHLFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFnQyxNQUFNLGtCQUFrQixnQkFBZ0IsQ0FBQztBQUN6RyxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQW1DLElBQUk7QUFDbkYsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQWtCLElBQUk7QUFDNUQsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSSxTQUFrQixJQUFJO0FBQ3BFLFFBQU0sQ0FBQyxvQkFBb0IscUJBQXFCLElBQUksU0FBa0IsSUFBSTtBQUMxRSxRQUFNLENBQUMsc0JBQXNCLHVCQUF1QixJQUFJLFNBQWtCLEtBQUs7QUFDL0UsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQWlCLENBQUM7QUFDMUQsUUFBTSxDQUFDLG9CQUFvQixxQkFBcUIsSUFBSSxTQUF3QixJQUFJO0FBRWhGLFlBQVUsTUFBTTtBQUNkLFVBQU0sUUFBUSxrQkFBa0IsVUFBVSxDQUFDLEdBQUcsTUFBTTtBQUNsRCxpQkFBVyxDQUFDO0FBQ1osa0JBQVksQ0FBQztBQUNi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