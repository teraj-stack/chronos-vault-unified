import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  Sparkles,
  ArrowRight,
  Activity,
  Skull,
  Smartphone,
  Shield,
  Disc,
  Scissors,
  Gauge
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { ScreenOneDefensePrevention } from "/sentinel-shield/src/components/ScreenOneDefensePrevention.tsx";
import { ScreenTwoCombatPanic } from "/sentinel-shield/src/components/ScreenTwoCombatPanic.tsx";
import { ScreenThreeWeaponsTelemetry } from "/sentinel-shield/src/components/ScreenThreeWeaponsTelemetry.tsx";
import { PciHardwareTelemetryMonitor } from "/sentinel-shield/src/components/PciHardwareTelemetryMonitor.tsx";
export const LoadingPage = ({
  onEnterFullStudio,
  onNavigateToTab
}) => {
  const [activeScreen, setActiveScreen] = useState("screen4");
  const [notification, setNotification] = useState(null);
  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3800);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "relative min-h-[92vh] flex flex-col items-center justify-between text-slate-100 overflow-hidden select-none py-6 px-4 sm:px-8", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center opacity-40", children: [
      /* @__PURE__ */ jsxDEV(
        "svg",
        {
          className: "absolute inset-0 w-full h-full animate-laser-pulse-10ppm",
          xmlns: "http://www.w3.org/2000/svg",
          children: [
            /* @__PURE__ */ jsxDEV("defs", { children: /* @__PURE__ */ jsxDEV(
              "pattern",
              {
                id: "luxury-hex-pattern",
                width: "80",
                height: "138.56",
                patternUnits: "userSpaceOnUse",
                children: /* @__PURE__ */ jsxDEV(
                  "path",
                  {
                    d: "M 40,0 L 80,23.09 L 80,69.28 L 40,92.37 L 0,69.28 L 0,23.09 Z M 40,138.56 L 80,115.47 L 80,69.28 L 40,92.37 L 0,69.28 L 0,115.47 Z",
                    fill: "none",
                    stroke: "rgba(217, 119, 6, 0.08)",
                    strokeWidth: "1"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/LoadingPage.tsx",
                    lineNumber: 50,
                    columnNumber: 15
                  },
                  this
                )
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 44,
                columnNumber: 13
              },
              this
            ) }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 43,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV("rect", { width: "100%", height: "100%", fill: "url(#luxury-hex-pattern)" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 58,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 39,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 bg-radial from-transparent via-[#07090e]/80 to-[#07090e]" }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 38,
      columnNumber: 7
    }, this),
    notification && /* @__PURE__ */ jsxDEV("div", { className: "fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-zinc-950/95 border border-amber-500/30 text-amber-100 text-xs font-mono font-bold shadow-2xl shadow-black flex items-center gap-3 animate-in fade-in slide-in-from-top duration-200 max-w-xl text-center backdrop-blur-md", children: [
      /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-amber-400 shrink-0 animate-spin" }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 68,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("span", { children: notification }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 67,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 w-full max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-3xl bg-zinc-950/90 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-black", children: /* @__PURE__ */ jsxDEV(Shield, { className: "w-6 h-6 text-amber-400" }, void 0, false, {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 77,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 76,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-base sm:text-lg font-bold font-mono tracking-wider text-white uppercase", children: "SENTINEL SHIELD • 3-EKRANOWE CENTRUM DOWODZENIA" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 81,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full bg-zinc-900 border border-amber-500/30 text-amber-300 text-[10px] font-mono font-medium", children: "10 PULSÓW / MIN • 940,8 THz" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 84,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 80,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-sans mt-0.5", children: "Ekran 1: Prewencja & Dekapitacja / Defragmentacja • Ekran 2: Panic Button + Ubój Gnid • Ekran 3: Panel Taktycznej Kontroli Energii (Potencjometry)" }, void 0, false, {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 79,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onNavigateToTab("holotable"),
            className: "px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/50 text-cyan-200 text-xs font-mono font-bold flex items-center gap-2 shadow-lg transition-all cursor-pointer animate-pulse",
            title: "Stół Konferencyjny Dowództwa z Przezroczystymi Ekranami Hologramowymi",
            children: [
              /* @__PURE__ */ jsxDEV(Disc, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 100,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Stół Hologramowy" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 101,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 95,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => onNavigateToTab("mobile"),
            className: "px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 hover:from-emerald-900 hover:to-slate-800 border border-emerald-400/70 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer",
            title: "Otwórz moduł Mobilnego Desantu G.R.O.M. (20-sekundowa akcja bojowa z pulsującym czerwonym światłem i rozjaśnieniem)",
            children: [
              /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3.5 h-3.5 text-emerald-300" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 109,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "⚡ Desant G.R.O.M. (20s)" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 110,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 104,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onEnterFullStudio,
            className: "px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-zinc-950 font-black text-xs font-mono flex items-center gap-2 shadow-xl shadow-amber-950/40 transition-all cursor-pointer",
            title: "Wejdź do pełnego panelu dowodzenia ze wszystkimi modułami",
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: "Pełne Studio" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 118,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 119,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 113,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 w-full max-w-6xl mt-5 mb-3", children: /* @__PURE__ */ jsxDEV("div", { className: "p-1.5 rounded-2xl bg-zinc-950/95 border border-white/10 shadow-2xl backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveScreen("screen4"),
          className: `py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${activeScreen === "screen4" ? "bg-zinc-900 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-950/80" : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-zinc-900/50"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded-lg ${activeScreen === "screen4" ? "bg-cyan-950 text-cyan-300" : "bg-zinc-900 text-slate-500"}`, children: /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 140,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 139,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "uppercase tracking-wider", children: "ODCZYTY ZŁĄCZY & PCI" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 143,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-sans font-normal opacity-80", children: "Wykres Liniowy • Współrzędne" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 144,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 142,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 131,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveScreen("screen1"),
          className: `py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${activeScreen === "screen1" ? "bg-zinc-900 border-emerald-500/50 text-emerald-200 shadow-lg shadow-black/80" : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-zinc-900/50"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded-lg ${activeScreen === "screen1" ? "bg-emerald-950 text-emerald-300" : "bg-zinc-900 text-slate-500"}`, children: /* @__PURE__ */ jsxDEV(Scissors, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 158,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 157,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "uppercase tracking-wider", children: "EKRAN 1: PREWENCJA" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 161,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-sans font-normal opacity-80", children: "Dekapitacja & Defragmentacja Gnid" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 162,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 160,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 149,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveScreen("screen2"),
          className: `py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${activeScreen === "screen2" ? "bg-zinc-900 border-rose-500/50 text-rose-200 shadow-lg shadow-black/80" : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-zinc-900/50"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded-lg ${activeScreen === "screen2" ? "bg-rose-950 text-rose-300" : "bg-zinc-900 text-slate-500"}`, children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 176,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 175,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "uppercase tracking-wider", children: "EKRAN 2: CENTRUM BOJOWE" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 179,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-sans font-normal opacity-80", children: "Przycisk Paniki + Ubój Gnid 3D" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 180,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 178,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 167,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveScreen("screen3"),
          className: `py-3 px-4 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2.5 transition-all cursor-pointer border ${activeScreen === "screen3" ? "bg-zinc-900 border-amber-500/50 text-amber-200 shadow-lg shadow-black/80" : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-zinc-900/50"}`,
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: `p-1.5 rounded-lg ${activeScreen === "screen3" ? "bg-amber-950 text-amber-300" : "bg-zinc-900 text-slate-500"}`, children: /* @__PURE__ */ jsxDEV(Gauge, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 194,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 193,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-left", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "uppercase tracking-wider", children: "EKRAN 3: KONTROLA ENERGII" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 197,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-sans font-normal opacity-80", children: "Panel Taktyczny • Potencjometry Broni" }, void 0, false, {
                fileName: "/app/applet/src/components/LoadingPage.tsx",
                lineNumber: 198,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/LoadingPage.tsx",
              lineNumber: 196,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 185,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 128,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 127,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 w-full max-w-6xl my-2", children: [
      activeScreen === "screen4" && /* @__PURE__ */ jsxDEV(PciHardwareTelemetryMonitor, { onNotify: showToast }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 210,
        columnNumber: 11
      }, this),
      activeScreen === "screen1" && /* @__PURE__ */ jsxDEV(ScreenOneDefensePrevention, { onNotify: showToast }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 214,
        columnNumber: 11
      }, this),
      activeScreen === "screen2" && /* @__PURE__ */ jsxDEV(
        ScreenTwoCombatPanic,
        {
          onNotify: showToast,
          onNavigateToTab
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/LoadingPage.tsx",
          lineNumber: 218,
          columnNumber: 11
        },
        this
      ),
      activeScreen === "screen3" && /* @__PURE__ */ jsxDEV(ScreenThreeWeaponsTelemetry, { onNotify: showToast }, void 0, false, {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 225,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 208,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "relative z-20 pt-6 flex items-center justify-center", children: /* @__PURE__ */ jsxDEV(
      "button",
      {
        onClick: onEnterFullStudio,
        className: "px-6 py-2.5 rounded-2xl bg-zinc-900/90 hover:bg-zinc-800 border border-white/10 text-slate-300 hover:text-white font-mono text-xs font-medium flex items-center gap-2 shadow-xl hover:border-amber-500/40 transition-all cursor-pointer",
        children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Przejdź do Pełnego Centrum Dowodzenia Sentinel Studio" }, void 0, false, {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 235,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(ArrowRight, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
            fileName: "/app/applet/src/components/LoadingPage.tsx",
            lineNumber: 236,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      true,
      {
        fileName: "/app/applet/src/components/LoadingPage.tsx",
        lineNumber: 231,
        columnNumber: 9
      },
      this
    ) }, void 0, false, {
      fileName: "/app/applet/src/components/LoadingPage.tsx",
      lineNumber: 230,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/LoadingPage.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvYWRpbmdQYWdlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBaYXAsIFJhZGlvLCBBbGVydE9jdGFnb24sIFNoaWVsZENoZWNrLCBTaGllbGRBbGVydCwgXG4gIFNwYXJrbGVzLCBFeHRlcm5hbExpbmssIEFycm93UmlnaHQsIFgsIFZvbHVtZTIsIFZvbHVtZVgsXG4gIExvY2ssIEV5ZSwgQ3B1LCBBY3Rpdml0eSwgUGxheSwgQ2hlY2tDaXJjbGUyLCBTa3VsbCwgVGFyZ2V0LFxuICBGbGFtZSwgQ3Jvc3NoYWlyLCBMYXllcnMsIFRyYXNoMiwgQ29kZSwgRG93bmxvYWQsIFJlZnJlc2hDdywgU21hcnRwaG9uZSxcbiAgU2hpZWxkLCBEaXNjLCBTY2lzc29ycywgSGFyZERyaXZlLCBHYXVnZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgaGV4TGFzZXJCYXJyaWVyU3lzdGVtIH0gZnJvbSAnLi4vdXRpbHMvaGV4YWdvbmFsTGFzZXJCYXJyaWVyU3lzdGVtJztcbmltcG9ydCB7IGduaWRhU2Vuc29yc01hdHJpeCB9IGZyb20gJy4uL3V0aWxzL2duaWRhU2Vuc29yc01hdHJpeCc7XG5pbXBvcnQgeyBhZHdhcmVQb3B1cERlc3Ryb3llciB9IGZyb20gJy4uL3V0aWxzL2Fkd2FyZVBvcHVwRGVzdHJveWVyJztcbmltcG9ydCB7IFNjcmVlbk9uZURlZmVuc2VQcmV2ZW50aW9uIH0gZnJvbSAnLi9TY3JlZW5PbmVEZWZlbnNlUHJldmVudGlvbic7XG5pbXBvcnQgeyBTY3JlZW5Ud29Db21iYXRQYW5pYyB9IGZyb20gJy4vU2NyZWVuVHdvQ29tYmF0UGFuaWMnO1xuaW1wb3J0IHsgU2NyZWVuVGhyZWVXZWFwb25zVGVsZW1ldHJ5IH0gZnJvbSAnLi9TY3JlZW5UaHJlZVdlYXBvbnNUZWxlbWV0cnknO1xuaW1wb3J0IHsgUGNpSGFyZHdhcmVUZWxlbWV0cnlNb25pdG9yIH0gZnJvbSAnLi9QY2lIYXJkd2FyZVRlbGVtZXRyeU1vbml0b3InO1xuXG5pbnRlcmZhY2UgTG9hZGluZ1BhZ2VQcm9wcyB7XG4gIG9uRW50ZXJGdWxsU3R1ZGlvOiAoKSA9PiB2b2lkO1xuICBvbk5hdmlnYXRlVG9UYWI6ICh0YWI6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IExvYWRpbmdQYWdlOiBSZWFjdC5GQzxMb2FkaW5nUGFnZVByb3BzPiA9ICh7XG4gIG9uRW50ZXJGdWxsU3R1ZGlvLFxuICBvbk5hdmlnYXRlVG9UYWIsXG59KSA9PiB7XG4gIGNvbnN0IFthY3RpdmVTY3JlZW4sIHNldEFjdGl2ZVNjcmVlbl0gPSB1c2VTdGF0ZTwnc2NyZWVuMScgfCAnc2NyZWVuMicgfCAnc2NyZWVuMycgfCAnc2NyZWVuNCc+KCdzY3JlZW40Jyk7XG4gIGNvbnN0IFtub3RpZmljYXRpb24sIHNldE5vdGlmaWNhdGlvbl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBzaG93VG9hc3QgPSAobXNnOiBzdHJpbmcpID0+IHtcbiAgICBzZXROb3RpZmljYXRpb24obXNnKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldE5vdGlmaWNhdGlvbihudWxsKSwgMzgwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIG1pbi1oLVs5MnZoXSBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0xMDAgb3ZlcmZsb3ctaGlkZGVuIHNlbGVjdC1ub25lIHB5LTYgcHgtNCBzbTpweC04XCI+XG4gICAgICBcbiAgICAgIHsvKiBCYWNrZ3JvdW5kIEFyY2hpdGVjdHVyYWwgSGV4IE1hdHJpeCAoU3ViZHVlZCBRdWlldCBMdXh1cnkpICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHBvaW50ZXItZXZlbnRzLW5vbmUgb3ZlcmZsb3ctaGlkZGVuIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIG9wYWNpdHktNDBcIj5cbiAgICAgICAgPHN2ZyBcbiAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIHctZnVsbCBoLWZ1bGwgYW5pbWF0ZS1sYXNlci1wdWxzZS0xMHBwbVwiXG4gICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGVmcz5cbiAgICAgICAgICAgIDxwYXR0ZXJuIFxuICAgICAgICAgICAgICBpZD1cImx1eHVyeS1oZXgtcGF0dGVyblwiIFxuICAgICAgICAgICAgICB3aWR0aD1cIjgwXCIgXG4gICAgICAgICAgICAgIGhlaWdodD1cIjEzOC41NlwiIFxuICAgICAgICAgICAgICBwYXR0ZXJuVW5pdHM9XCJ1c2VyU3BhY2VPblVzZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxwYXRoIFxuICAgICAgICAgICAgICAgIGQ9XCJNIDQwLDAgTCA4MCwyMy4wOSBMIDgwLDY5LjI4IEwgNDAsOTIuMzcgTCAwLDY5LjI4IEwgMCwyMy4wOSBaIE0gNDAsMTM4LjU2IEwgODAsMTE1LjQ3IEwgODAsNjkuMjggTCA0MCw5Mi4zNyBMIDAsNjkuMjggTCAwLDExNS40NyBaXCIgXG4gICAgICAgICAgICAgICAgZmlsbD1cIm5vbmVcIiBcbiAgICAgICAgICAgICAgICBzdHJva2U9XCJyZ2JhKDIxNywgMTE5LCA2LCAwLjA4KVwiIFxuICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMVwiIFxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9wYXR0ZXJuPlxuICAgICAgICAgIDwvZGVmcz5cbiAgICAgICAgICA8cmVjdCB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDAlXCIgZmlsbD1cInVybCgjbHV4dXJ5LWhleC1wYXR0ZXJuKVwiIC8+XG4gICAgICAgIDwvc3ZnPlxuXG4gICAgICAgIHsvKiBBbWJpZW50IFF1aWV0IEx1eHVyeSBMaWdodGluZyBWaWduZXR0ZSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBpbnNldC0wIGJnLXJhZGlhbCBmcm9tLXRyYW5zcGFyZW50IHZpYS1bIzA3MDkwZV0vODAgdG8tWyMwNzA5MGVdXCIgLz5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRmxvYXRpbmcgVG9hc3QgTm90aWZpY2F0aW9uICovfVxuICAgICAge25vdGlmaWNhdGlvbiAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgdG9wLTYgbGVmdC0xLzIgLXRyYW5zbGF0ZS14LTEvMiB6LTUwIHB4LTYgcHktMyByb3VuZGVkLTJ4bCBiZy16aW5jLTk1MC85NSBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC8zMCB0ZXh0LWFtYmVyLTEwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgc2hhZG93LTJ4bCBzaGFkb3ctYmxhY2sgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgYW5pbWF0ZS1pbiBmYWRlLWluIHNsaWRlLWluLWZyb20tdG9wIGR1cmF0aW9uLTIwMCBtYXgtdy14bCB0ZXh0LWNlbnRlciBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDAgc2hyaW5rLTAgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICA8c3Bhbj57bm90aWZpY2F0aW9ufTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG4gICAgICB7LyogVG9wIEhlYWRlciAvIFNlbnRpbmVsIFN0YXR1cyBCYXIgKFF1aWV0IEx1eHVyeSkgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMjAgdy1mdWxsIG1heC13LTZ4bCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcC00IHJvdW5kZWQtM3hsIGJnLXppbmMtOTUwLzkwIGJhY2tkcm9wLWJsdXIteGwgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctMnhsIHNoYWRvdy1ibGFjay84MFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMy41XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTEyIGgtMTIgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tYiBmcm9tLXppbmMtODAwIHRvLXppbmMtOTUwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHNoYWRvdy1sZyBzaGFkb3ctYmxhY2tcIj5cbiAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtYmFzZSBzbTp0ZXh0LWxnIGZvbnQtYm9sZCBmb250LW1vbm8gdHJhY2tpbmctd2lkZXIgdGV4dC13aGl0ZSB1cHBlcmNhc2VcIj5cbiAgICAgICAgICAgICAgICBTRU5USU5FTCBTSElFTEQg4oCiIDMtRUtSQU5PV0UgQ0VOVFJVTSBET1dPRFpFTklBXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHRleHQtYW1iZXItMzAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiPlxuICAgICAgICAgICAgICAgIDEwIFBVTFPDk1cgLyBNSU4g4oCiIDk0MCw4IFRIelxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1zYW5zIG10LTAuNVwiPlxuICAgICAgICAgICAgICBFa3JhbiAxOiBQcmV3ZW5jamEgJiBEZWthcGl0YWNqYSAvIERlZnJhZ21lbnRhY2phIOKAoiBFa3JhbiAyOiBQYW5pYyBCdXR0b24gKyBVYsOzaiBHbmlkIOKAoiBFa3JhbiAzOiBQYW5lbCBUYWt0eWN6bmVqIEtvbnRyb2xpIEVuZXJnaWkgKFBvdGVuY2pvbWV0cnkpXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ2hvbG90YWJsZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICB0aXRsZT1cIlN0w7PFgiBLb25mZXJlbmN5am55IERvd8OzZHp0d2EgeiBQcnplenJvY3p5c3R5bWkgRWtyYW5hbWkgSG9sb2dyYW1vd3ltaVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERpc2MgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5TdMOzxYIgSG9sb2dyYW1vd3k8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbk5hdmlnYXRlVG9UYWIoJ21vYmlsZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWVtZXJhbGQtOTUwIHZpYS10ZWFsLTk1MCB0by1zbGF0ZS05MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTkwMCBob3Zlcjp0by1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTQwMC83MCB0ZXh0LWVtZXJhbGQtMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwLzYwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiT3R3w7NyeiBtb2R1xYIgTW9iaWxuZWdvIERlc2FudHUgRy5SLk8uTS4gKDIwLXNla3VuZG93YSBha2NqYSBib2pvd2EgeiBwdWxzdWrEhWN5bSBjemVyd29ueW0gxZt3aWF0xYJlbSBpIHJvemphxZtuaWVuaWVtKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNtYXJ0cGhvbmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTMwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj7imqEgRGVzYW50IEcuUi5PLk0uICgyMHMpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25FbnRlckZ1bGxTdHVkaW99XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNjAwIHRvLWFtYmVyLTcwMCBob3Zlcjpmcm9tLWFtYmVyLTUwMCBob3Zlcjp0by1hbWJlci02MDAgdGV4dC16aW5jLTk1MCBmb250LWJsYWNrIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy14bCBzaGFkb3ctYW1iZXItOTUwLzQwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiV2VqZMW6IGRvIHBlxYJuZWdvIHBhbmVsdSBkb3dvZHplbmlhIHplIHdzenlzdGtpbWkgbW9kdcWCYW1pXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3Bhbj5QZcWCbmUgU3R1ZGlvPC9zcGFuPlxuICAgICAgICAgICAgPEFycm93UmlnaHQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIDQtRUtSQU5PV1kgR8WBw5NXTlkgUFJaRcWBxIRDWk5JSyBXSURPS8OTVyAoUVVJRVQgTFVYVVJZIDQtU0NSRUVOIFNXSVRDSEVSKSAgICAgKi99XG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0yMCB3LWZ1bGwgbWF4LXctNnhsIG10LTUgbWItM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTUwLzk1IGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LTJ4bCBiYWNrZHJvcC1ibHVyLXhsIGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTJcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogRUtSQU4gNCBUQUIgLSBEQVNIQk9BUkQgTU9VTlQgUENJICYgWsWBxIRDWkEgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2NyZWVuKCdzY3JlZW40Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlU2NyZWVuID09PSAnc2NyZWVuNCdcbiAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTkwMCBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTIwMCBzaGFkb3ctbGcgc2hhZG93LWN5YW4tOTUwLzgwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXRyYW5zcGFyZW50IGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXppbmMtOTAwLzUwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTEuNSByb3VuZGVkLWxnICR7YWN0aXZlU2NyZWVuID09PSAnc2NyZWVuNCcgPyAnYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCcgOiAnYmctemluYy05MDAgdGV4dC1zbGF0ZS01MDAnfWB9PlxuICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+T0RDWllUWSBaxYHEhENaWSAmIFBDSTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtc2FucyBmb250LW5vcm1hbCBvcGFjaXR5LTgwXCI+V3lrcmVzIExpbmlvd3kg4oCiIFdzcMOzxYJyesSZZG5lPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBFS1JBTiAxIFRBQiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVTY3JlZW4oJ3NjcmVlbjEnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB5LTMgcHgtNCByb3VuZGVkLXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMi41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlciAke1xuICAgICAgICAgICAgICBhY3RpdmVTY3JlZW4gPT09ICdzY3JlZW4xJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXppbmMtOTAwIGJvcmRlci1lbWVyYWxkLTUwMC81MCB0ZXh0LWVtZXJhbGQtMjAwIHNoYWRvdy1sZyBzaGFkb3ctYmxhY2svODAnXG4gICAgICAgICAgICAgICAgOiAnYmctdHJhbnNwYXJlbnQgYm9yZGVyLXRyYW5zcGFyZW50IHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6YmctemluYy05MDAvNTAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMS41IHJvdW5kZWQtbGcgJHthY3RpdmVTY3JlZW4gPT09ICdzY3JlZW4xJyA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwJyA6ICdiZy16aW5jLTkwMCB0ZXh0LXNsYXRlLTUwMCd9YH0+XG4gICAgICAgICAgICAgIDxTY2lzc29ycyBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5FS1JBTiAxOiBQUkVXRU5DSkE8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNhbnMgZm9udC1ub3JtYWwgb3BhY2l0eS04MFwiPkRla2FwaXRhY2phICYgRGVmcmFnbWVudGFjamEgR25pZDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICB7LyogRUtSQU4gMiBUQUIgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlU2NyZWVuKCdzY3JlZW4yJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweS0zIHB4LTQgcm91bmRlZC14bCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlU2NyZWVuID09PSAnc2NyZWVuMidcbiAgICAgICAgICAgICAgICA/ICdiZy16aW5jLTkwMCBib3JkZXItcm9zZS01MDAvNTAgdGV4dC1yb3NlLTIwMCBzaGFkb3ctbGcgc2hhZG93LWJsYWNrLzgwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXRyYW5zcGFyZW50IGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXppbmMtOTAwLzUwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTEuNSByb3VuZGVkLWxnICR7YWN0aXZlU2NyZWVuID09PSAnc2NyZWVuMicgPyAnYmctcm9zZS05NTAgdGV4dC1yb3NlLTMwMCcgOiAnYmctemluYy05MDAgdGV4dC1zbGF0ZS01MDAnfWB9PlxuICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+RUtSQU4gMjogQ0VOVFJVTSBCT0pPV0U8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LXNhbnMgZm9udC1ub3JtYWwgb3BhY2l0eS04MFwiPlByenljaXNrIFBhbmlraSArIFViw7NqIEduaWQgM0Q8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIEVLUkFOIDMgVEFCICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVNjcmVlbignc2NyZWVuMycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMyBweC00IHJvdW5kZWQteGwgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYm9yZGVyICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVNjcmVlbiA9PT0gJ3NjcmVlbjMnXG4gICAgICAgICAgICAgICAgPyAnYmctemluYy05MDAgYm9yZGVyLWFtYmVyLTUwMC81MCB0ZXh0LWFtYmVyLTIwMCBzaGFkb3ctbGcgc2hhZG93LWJsYWNrLzgwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXRyYW5zcGFyZW50IGJvcmRlci10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXppbmMtOTAwLzUwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2BwLTEuNSByb3VuZGVkLWxnICR7YWN0aXZlU2NyZWVuID09PSAnc2NyZWVuMycgPyAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMzAwJyA6ICdiZy16aW5jLTkwMCB0ZXh0LXNsYXRlLTUwMCd9YH0+XG4gICAgICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXJcIj5FS1JBTiAzOiBLT05UUk9MQSBFTkVSR0lJPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1zYW5zIGZvbnQtbm9ybWFsIG9wYWNpdHktODBcIj5QYW5lbCBUYWt0eWN6bnkg4oCiIFBvdGVuY2pvbWV0cnkgQnJvbmk8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovfVxuICAgICAgey8qIEFDVElWRSBTQ1JFRU4gQ09OVEVOVCBESVNQTEFZICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKi99XG4gICAgICB7LyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCB3LWZ1bGwgbWF4LXctNnhsIG15LTJcIj5cbiAgICAgICAge2FjdGl2ZVNjcmVlbiA9PT0gJ3NjcmVlbjQnICYmIChcbiAgICAgICAgICA8UGNpSGFyZHdhcmVUZWxlbWV0cnlNb25pdG9yIG9uTm90aWZ5PXtzaG93VG9hc3R9IC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2FjdGl2ZVNjcmVlbiA9PT0gJ3NjcmVlbjEnICYmIChcbiAgICAgICAgICA8U2NyZWVuT25lRGVmZW5zZVByZXZlbnRpb24gb25Ob3RpZnk9e3Nob3dUb2FzdH0gLz5cbiAgICAgICAgKX1cblxuICAgICAgICB7YWN0aXZlU2NyZWVuID09PSAnc2NyZWVuMicgJiYgKFxuICAgICAgICAgIDxTY3JlZW5Ud29Db21iYXRQYW5pYyBcbiAgICAgICAgICAgIG9uTm90aWZ5PXtzaG93VG9hc3R9IFxuICAgICAgICAgICAgb25OYXZpZ2F0ZVRvVGFiPXtvbk5hdmlnYXRlVG9UYWJ9IFxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2FjdGl2ZVNjcmVlbiA9PT0gJ3NjcmVlbjMnICYmIChcbiAgICAgICAgICA8U2NyZWVuVGhyZWVXZWFwb25zVGVsZW1ldHJ5IG9uTm90aWZ5PXtzaG93VG9hc3R9IC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFF1aWV0IEx1eHVyeSBGb290ZXIgQWNjZXNzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB6LTIwIHB0LTYgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIG9uQ2xpY2s9e29uRW50ZXJGdWxsU3R1ZGlvfVxuICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTYgcHktMi41IHJvdW5kZWQtMnhsIGJnLXppbmMtOTAwLzkwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBmb250LW1vbm8gdGV4dC14cyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3cteGwgaG92ZXI6Ym9yZGVyLWFtYmVyLTUwMC80MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj5QcnplamTFuiBkbyBQZcWCbmVnbyBDZW50cnVtIERvd29kemVuaWEgU2VudGluZWwgU3R1ZGlvPC9zcGFuPlxuICAgICAgICAgIDxBcnJvd1JpZ2h0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFpRGM7QUFqRGQsU0FBZ0IsZ0JBQTJCO0FBQzNDO0FBQUEsRUFFRTtBQUFBLEVBQXdCO0FBQUEsRUFDUjtBQUFBLEVBQThCO0FBQUEsRUFDZTtBQUFBLEVBQzdEO0FBQUEsRUFBUTtBQUFBLEVBQU07QUFBQSxFQUFxQjtBQUFBLE9BQzlCO0FBSVAsU0FBUyxrQ0FBa0M7QUFDM0MsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxtQ0FBbUM7QUFDNUMsU0FBUyxtQ0FBbUM7QUFPckMsYUFBTSxjQUEwQyxDQUFDO0FBQUEsRUFDdEQ7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUF3RCxTQUFTO0FBQ3pHLFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUF3QixJQUFJO0FBRXBFLFFBQU0sWUFBWSxDQUFDLFFBQWdCO0FBQ2pDLG9CQUFnQixHQUFHO0FBQ25CLGVBQVcsTUFBTSxnQkFBZ0IsSUFBSSxHQUFHLElBQUk7QUFBQSxFQUM5QztBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLGlJQUdiO0FBQUEsMkJBQUMsU0FBSSxXQUFVLG9HQUNiO0FBQUE7QUFBQSxRQUFDO0FBQUE7QUFBQSxVQUNDLFdB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