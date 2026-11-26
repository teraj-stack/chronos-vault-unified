import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { Navbar } from "/sentinel-toolkit/src/components/Navbar.tsx";
import { EmergencyBanner } from "/sentinel-toolkit/src/components/EmergencyBanner.tsx";
import { ActualizationGuardianBar } from "/sentinel-toolkit/src/components/ActualizationGuardianBar.tsx";
import { ScriptsLibrary } from "/sentinel-toolkit/src/components/ScriptsLibrary.tsx";
import { ScriptGenerator } from "/sentinel-toolkit/src/components/ScriptGenerator.tsx";
import { InteractiveSimulator } from "/sentinel-toolkit/src/components/InteractiveSimulator.tsx";
import { ProcessWatchdog } from "/sentinel-toolkit/src/components/ProcessWatchdog.tsx";
import { ForensicsGuide } from "/sentinel-toolkit/src/components/ForensicsGuide.tsx";
import { AIAssistant } from "/sentinel-toolkit/src/components/AIAssistant.tsx";
import { PanicButton } from "/sentinel-toolkit/src/components/PanicButton.tsx";
import { GeminiHunter } from "/sentinel-toolkit/src/components/GeminiHunter.tsx";
import { NeutralizedThreatsLedger } from "/sentinel-toolkit/src/components/NeutralizedThreatsLedger.tsx";
import { SelfHealingCenter } from "/sentinel-toolkit/src/components/SelfHealingCenter.tsx";
import { MilitaryRadarScanner } from "/sentinel-toolkit/src/components/MilitaryRadarScanner.tsx";
import { AIOptimizer } from "/sentinel-toolkit/src/components/AIOptimizer.tsx";
import { ArmoredGlassAquarium } from "/sentinel-toolkit/src/components/ArmoredGlassAquarium.tsx";
import { AfricanHornetSwarmModal } from "/sentinel-toolkit/src/components/AfricanHornetSwarmModal.tsx";
import { PlasmaEnergyField } from "/sentinel-toolkit/src/components/PlasmaEnergyField.tsx";
import { ThreeDDefenseCore } from "/sentinel-toolkit/src/components/ThreeDDefenseCore.tsx";
import { HolographicPenthouseDeck } from "/sentinel-toolkit/src/components/HolographicPenthouseDeck.tsx";
import { ErrorBoundary } from "/sentinel-toolkit/src/components/ErrorBoundary.tsx";
import { Shield, CheckCircle2, Skull, Crosshair, Radio, Zap, Box, Building2 } from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
export default function App() {
  const [activeTab, setActiveTab] = useState("hologram");
  const [selectedOS, setSelectedOS] = useState("windows");
  const [theme, setTheme] = useState("cyber");
  const [hornetModalOpen, setHornetModalOpen] = useState(false);
  useEffect(() => {
    const handleGlobalButtonClick = (e) => {
      const target = e.target?.closest("button");
      if (target) {
        target.classList.add("button-click-illuminated");
        const rect = target.getBoundingClientRect();
        window.dispatchEvent(
          new CustomEvent("sentinel:plasma-shockwave", {
            detail: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
          })
        );
        setTimeout(() => {
          target.classList.remove("button-click-illuminated");
        }, 450);
      }
    };
    window.addEventListener("click", handleGlobalButtonClick, true);
    return () => window.removeEventListener("click", handleGlobalButtonClick, true);
  }, []);
  const triggerGlobalPlasmaSurge = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("sentinel:plasma-shockwave", {
          detail: { x: window.innerWidth / 2, y: window.innerHeight * 0.3 }
        })
      );
    }
  };
  const themeClasses = {
    cyber: "bg-slate-950 text-slate-100 selection:bg-purple-600 selection:text-white",
    stealth: "bg-neutral-950 text-neutral-100 selection:bg-cyan-600 selection:text-white",
    tactical: "bg-zinc-950 text-zinc-100 selection:bg-red-600 selection:text-white"
  }[theme];
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Root Application Container", children: /* @__PURE__ */ jsxDEV("div", { className: `min-h-screen ${themeClasses} flex flex-col font-sans transition-colors duration-300 relative overflow-x-hidden`, children: [
    /* @__PURE__ */ jsxDEV(PlasmaEnergyField, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 77,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      Navbar,
      {
        activeTab,
        setActiveTab,
        selectedOS,
        setSelectedOS,
        theme,
        setTheme
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 80,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(EmergencyBanner, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 90,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(ActualizationGuardianBar, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 93,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 w-full relative z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("h1", { className: "text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5", children: /* @__PURE__ */ jsxDEV("span", { children: "Sentinel Anti-Malware & Overlay Decapitation Studio" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 101,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 100,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/60 shadow-md", children: "WebGL 3D Active" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 103,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 99,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl", children: [
          "Pancerne środowisko do detekcji, trójwymiarowej grafiki WebGL, polowania z Gemini AI, trwałego unieruchamiania w RAM (",
          /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 108,
            columnNumber: 135
          }, this),
          "), kwarantanny binarnej (",
          /* @__PURE__ */ jsxDEV("code", { className: "text-red-400 font-mono", children: "icacls /deny" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 108,
            columnNumber: 227
          }, this),
          ") oraz rozchodzącego się pola plazmy."
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 107,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "mt-2.5 flex items-center gap-2 flex-wrap text-[11px] font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-lg bg-slate-900/90 border border-purple-500/50 text-purple-200 flex items-center gap-1.5 shadow-sm", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 114,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Pole Plazmy: Biało-Niebiesko-Fioletowe" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 115,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 113,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-lg bg-slate-900/90 border border-cyan-500/50 text-cyan-200 flex items-center gap-1.5 shadow-sm", children: [
            /* @__PURE__ */ jsxDEV(Box, { className: "w-3 h-3 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 119,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Sterowniki 3D: Three.js Gotowe" }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 120,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 118,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerGlobalPlasmaSurge,
              className: "btn-glossy btn-glossy-primary px-2.5 py-0.5 text-[10px] font-mono flex items-center gap-1 text-white",
              title: "Wyślij falę uderzeniową plazmy przez ekran",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 128,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wyładuj Błyskawicę" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 129,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 123,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 112,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 98,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setHornetModalOpen(true),
            className: "btn-glossy btn-glossy-amber px-3.5 py-2 text-xs font-black font-mono flex items-center gap-1.5 animate-pulse",
            title: "Wypuść Rój Dzikich Afrykańskich Szerszeni do uboju gnidy!",
            children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm", children: "🐝" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 141,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Rój Szerszeni" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 142,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 136,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sentinel:kill-work-destroyer"));
                window.dispatchEvent(new CustomEvent("sentinel:kill-all-gnidas"));
              }
              setActiveTab("watchdog");
            },
            className: "btn-glossy btn-glossy-red px-3.5 py-2 text-xs font-black font-mono flex items-center gap-1.5",
            title: "Rozkaz bojowy: Natychmiastowy ubój gnidy niszczącej naszą pracę!",
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-yellow-200" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 156,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Ubij Gnidę Niszczącą Pracę" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 157,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 145,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("hologram"),
            className: `btn-glossy px-3.5 py-2 text-xs font-black font-mono flex items-center gap-1.5 ${activeTab === "hologram" ? "btn-glossy-primary is-active shadow-lg shadow-cyan-900/50" : "btn-glossy-cyan"}`,
            title: "Przejdź do sali konferencyjnej na 50. piętrze z hologramami Bujok Medical",
            children: [
              /* @__PURE__ */ jsxDEV(Building2, { className: "w-3.5 h-3.5 text-amber-300 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 167,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Biuro 50P Hologram" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 168,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 160,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("threed"),
            className: `btn-glossy px-3.5 py-2 text-xs font-bold font-mono flex items-center gap-1.5 ${activeTab === "threed" ? "btn-glossy-cyan is-active" : "btn-glossy-cyan"}`,
            title: "Przejdź do trójwymiarowego reaktora obronnego Three.js",
            children: [
              /* @__PURE__ */ jsxDEV(Box, { className: "w-3.5 h-3.5 text-white animate-spin" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 178,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Reaktor 3D" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 179,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 171,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("optimizer"),
            className: "btn-glossy btn-glossy-purple px-3 py-2 text-xs font-bold font-mono flex items-center gap-1.5",
            title: "Przejdź do permanentnego optymalizatora AI wykrywania i inaktywacji gnid",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-200 animate-pulse" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 187,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "AI Optymalizator" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 188,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 182,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("radar"),
            className: "btn-glossy btn-glossy-emerald px-3 py-2 text-xs font-bold font-mono flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 animate-pulse text-emerald-200" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 195,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Radar Wojskowy" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 196,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 191,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("hunter"),
            className: "btn-glossy btn-glossy-primary px-3 py-2 text-xs font-bold font-mono flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-3.5 h-3.5 animate-pulse text-cyan-200" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 203,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Łowca Gemini AI" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 204,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 199,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              const aquariumElement = document.getElementById("armored-glass-aquarium");
              if (aquariumElement) {
                aquariumElement.scrollIntoView({ behavior: "smooth" });
              }
            },
            className: "btn-glossy btn-glossy-dark px-3 py-2 text-xs font-bold font-mono flex items-center gap-1.5 text-emerald-300 border-emerald-700/60",
            title: "Przejdź do akwarium ze zbrojonego szkła",
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: "🧪" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 217,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Akwarium Gnid" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 207,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 135,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 97,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full relative z-10", children: [
      activeTab === "hologram" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Bujok Medical - Hologramowy Deck Dowodzenia 50. Piętro", children: /* @__PURE__ */ jsxDEV(HolographicPenthouseDeck, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 228,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 227,
        columnNumber: 13
      }, this),
      activeTab === "threed" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Reaktor Trójwymiarowy Three.js & WebGL", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-purple-950 border border-cyan-500/50 shadow-2xl relative overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-cyan-600/30 border border-cyan-500/50 text-cyan-300", children: /* @__PURE__ */ jsxDEV(Box, { className: "w-5 h-5 animate-pulse text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 240,
                columnNumber: 27
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 239,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Trójwymiarowy Rdzeń Obronny Sentinel (Three.js & WebGL)" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 242,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/60", children: "3D Graphics Active" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 245,
                columnNumber: 25
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 238,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: "Sterowniki trójwymiarowej grafiki Three.js załadowane pomyślnie. Reaktor generuje wieloosiowy żyroskop pola plazmowego w spektrum biało-niebiesko-fioletowym, zabezpieczając system przed iniekcjami pamięci RAM i nakładkami ekranowymi." }, void 0, false, {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 249,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 237,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerGlobalPlasmaSurge,
              className: "btn-glossy btn-glossy-cyan px-4 py-2.5 text-xs font-mono font-bold flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-cyan-200" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 258,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wyzwól Impuls 3D" }, void 0, false, {
                  fileName: "/app/applet/src/App.tsx",
                  lineNumber: 259,
                  columnNumber: 23
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/App.tsx",
              lineNumber: 254,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 236,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 235,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV(ThreeDDefenseCore, {}, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 265,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 234,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 233,
        columnNumber: 13
      }, this),
      activeTab === "radar" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Radar Wojskowy & Skaner Monolitycznej Powierzchni Systemu", children: /* @__PURE__ */ jsxDEV(MilitaryRadarScanner, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 272,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 271,
        columnNumber: 13
      }, this),
      activeTab === "optimizer" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Permanentny Optymalizator AI Metod Wykrywania i Inaktywacji", children: /* @__PURE__ */ jsxDEV(AIOptimizer, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 278,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 277,
        columnNumber: 13
      }, this),
      activeTab === "scripts" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Skrypty Python & Win32 Ctypes", children: /* @__PURE__ */ jsxDEV(ScriptsLibrary, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 284,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 283,
        columnNumber: 13
      }, this),
      activeTab === "hunter" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Łowca Gemini AI & Slaughter Engine", children: /* @__PURE__ */ jsxDEV(GeminiHunter, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 290,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      activeTab === "threats" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Kartoteka Zniszczonych Wirusów & Mechanizmów Agresji", children: /* @__PURE__ */ jsxDEV(NeutralizedThreatsLedger, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 296,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 295,
        columnNumber: 13
      }, this),
      activeTab === "healing" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Centrum Autonaprawy & Pancerne Bariery Ochronne", children: /* @__PURE__ */ jsxDEV(SelfHealingCenter, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 302,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 301,
        columnNumber: 13
      }, this),
      activeTab === "generator" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Generator Skryptów Eksterminacji .py & Studio Wypierania", children: /* @__PURE__ */ jsxDEV(ScriptGenerator, { initialOS: selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 308,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 307,
        columnNumber: 13
      }, this),
      activeTab === "simulator" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Interaktywny Symulator Procesów i Nakładek", children: /* @__PURE__ */ jsxDEV(InteractiveSimulator, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 314,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 313,
        columnNumber: 13
      }, this),
      activeTab === "watchdog" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Telemetria & Watchdog Zasobów CPU/RAM", children: /* @__PURE__ */ jsxDEV(ProcessWatchdog, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 320,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 319,
        columnNumber: 13
      }, this),
      activeTab === "forensics" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Baza Wiedzy Kryminalistycznej Win32/X11/Quartz", children: /* @__PURE__ */ jsxDEV(ForensicsGuide, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 326,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 325,
        columnNumber: 13
      }, this),
      activeTab === "ai" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Asystent AI Gemini", children: /* @__PURE__ */ jsxDEV(AIAssistant, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 332,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 331,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 225,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10", children: /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Akwarium ze Zbrojonego Szkła do Obserwacji Gnid", children: /* @__PURE__ */ jsxDEV(ArmoredGlassAquarium, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 340,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 339,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 338,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      AfricanHornetSwarmModal,
      {
        isOpen: hornetModalOpen,
        onClose: () => setHornetModalOpen(false),
        targetGnidaName: "gnida_niszczaca_prace.exe",
        targetPid: 5124
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 345,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(PanicButton, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 353,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("footer", { className: "bg-slate-950/90 backdrop-blur-md border-t border-slate-900 py-6 px-4 text-xs text-slate-500 mt-12 relative z-10", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-purple-500" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 359,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-400", children: "Sentinel Anti-Malware & Overlay Decapitation Studio" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 360,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 361,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Three.js 3D WebGL Engine Active" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 362,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 358,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 text-[11px] text-slate-500 flex-wrap justify-center sm:justify-end gap-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Box, { className: "w-3 h-3 text-cyan-300" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 367,
            columnNumber: 17
          }, this),
          "Grafika 3D: Three.js OK"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 366,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 370,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-purple-300 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 372,
            columnNumber: 17
          }, this),
          "Pole Plazmy: Biało-Niebiesko-Fioletowe"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 371,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 375,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 377,
            columnNumber: 17
          }, this),
          "Podświetlanie Przycisków Aktywne"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 376,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 365,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 357,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 356,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBOYXZiYXIsIFRhYlR5cGUgfSBmcm9tICcuL2NvbXBvbmVudHMvTmF2YmFyJztcbmltcG9ydCB7IEVtZXJnZW5jeUJhbm5lciB9IGZyb20gJy4vY29tcG9uZW50cy9FbWVyZ2VuY3lCYW5uZXInO1xuaW1wb3J0IHsgQWN0dWFsaXphdGlvbkd1YXJkaWFuQmFyIH0gZnJvbSAnLi9jb21wb25lbnRzL0FjdHVhbGl6YXRpb25HdWFyZGlhbkJhcic7XG5pbXBvcnQgeyBTY3JpcHRzTGlicmFyeSB9IGZyb20gJy4vY29tcG9uZW50cy9TY3JpcHRzTGlicmFyeSc7XG5pbXBvcnQgeyBTY3JpcHRHZW5lcmF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvU2NyaXB0R2VuZXJhdG9yJztcbmltcG9ydCB7IEludGVyYWN0aXZlU2ltdWxhdG9yIH0gZnJvbSAnLi9jb21wb25lbnRzL0ludGVyYWN0aXZlU2ltdWxhdG9yJztcbmltcG9ydCB7IFByb2Nlc3NXYXRjaGRvZyB9IGZyb20gJy4vY29tcG9uZW50cy9Qcm9jZXNzV2F0Y2hkb2cnO1xuaW1wb3J0IHsgRm9yZW5zaWNzR3VpZGUgfSBmcm9tICcuL2NvbXBvbmVudHMvRm9yZW5zaWNzR3VpZGUnO1xuaW1wb3J0IHsgQUlBc3Npc3RhbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvQUlBc3Npc3RhbnQnO1xuaW1wb3J0IHsgUGFuaWNCdXR0b24gfSBmcm9tICcuL2NvbXBvbmVudHMvUGFuaWNCdXR0b24nO1xuaW1wb3J0IHsgR2VtaW5pSHVudGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL0dlbWluaUh1bnRlcic7XG5pbXBvcnQgeyBOZXV0cmFsaXplZFRocmVhdHNMZWRnZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvTmV1dHJhbGl6ZWRUaHJlYXRzTGVkZ2VyJztcbmltcG9ydCB7IFNlbGZIZWFsaW5nQ2VudGVyIH0gZnJvbSAnLi9jb21wb25lbnRzL1NlbGZIZWFsaW5nQ2VudGVyJztcbmltcG9ydCB7IE1pbGl0YXJ5UmFkYXJTY2FubmVyIH0gZnJvbSAnLi9jb21wb25lbnRzL01pbGl0YXJ5UmFkYXJTY2FubmVyJztcbmltcG9ydCB7IEFJT3B0aW1pemVyIH0gZnJvbSAnLi9jb21wb25lbnRzL0FJT3B0aW1pemVyJztcbmltcG9ydCB7IEFybW9yZWRHbGFzc0FxdWFyaXVtIH0gZnJvbSAnLi9jb21wb25lbnRzL0FybW9yZWRHbGFzc0FxdWFyaXVtJztcbmltcG9ydCB7IEFmcmljYW5Ib3JuZXRTd2FybU1vZGFsIH0gZnJvbSAnLi9jb21wb25lbnRzL0FmcmljYW5Ib3JuZXRTd2FybU1vZGFsJztcbmltcG9ydCB7IFBsYXNtYUVuZXJneUZpZWxkIH0gZnJvbSAnLi9jb21wb25lbnRzL1BsYXNtYUVuZXJneUZpZWxkJztcbmltcG9ydCB7IFRocmVlRERlZmVuc2VDb3JlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RocmVlRERlZmVuc2VDb3JlJztcbmltcG9ydCB7IEhvbG9ncmFwaGljUGVudGhvdXNlRGVjayB9IGZyb20gJy4vY29tcG9uZW50cy9Ib2xvZ3JhcGhpY1BlbnRob3VzZURlY2snO1xuaW1wb3J0IHsgRXJyb3JCb3VuZGFyeSB9IGZyb20gJy4vY29tcG9uZW50cy9FcnJvckJvdW5kYXJ5JztcbmltcG9ydCB7IE9TVHlwZSB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgVGVybWluYWwsIFNoaWVsZCwgQ3B1LCBCb29rT3BlbiwgU3BhcmtsZXMsIEFsZXJ0VHJpYW5nbGUsIENoZWNrQ2lyY2xlMiwgRG93bmxvYWQsIFNoaWVsZEFsZXJ0LCBBY3Rpdml0eSwgU2t1bGwsIENyb3NzaGFpciwgV3JlbmNoLCBSYWRpbywgWmFwLCBTbGlkZXJzLCBCb3gsIEJ1aWxkaW5nMiB9IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi91dGlscy9vZmZsaW5lUGFja2FnZUV4cG9ydGVyJztcbmltcG9ydCB7IGduaWRhU2Vuc29yIH0gZnJvbSAnLi91dGlscy9nbmlkYUF1dG9GcmVlemVTZW5zb3InO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBcHAoKSB7XG4gIGNvbnN0IFthY3RpdmVUYWIsIHNldEFjdGl2ZVRhYl0gPSB1c2VTdGF0ZTxUYWJUeXBlPignaG9sb2dyYW0nKTtcbiAgY29uc3QgW3NlbGVjdGVkT1MsIHNldFNlbGVjdGVkT1NdID0gdXNlU3RhdGU8T1NUeXBlPignd2luZG93cycpO1xuICBjb25zdCBbdGhlbWUsIHNldFRoZW1lXSA9IHVzZVN0YXRlPCdjeWJlcicgfCAnc3RlYWx0aCcgfCAndGFjdGljYWwnPignY3liZXInKTtcbiAgY29uc3QgW2hvcm5ldE1vZGFsT3Blbiwgc2V0SG9ybmV0TW9kYWxPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICAvLyBHbG9iYWwgYnV0dG9uIGNsaWNrIGFjdGl2aXR5IGlsbHVtaW5hdGlvbiBsaXN0ZW5lcjpcbiAgLy8gV2hlbiBBTlkgYnV0dG9uIGlzIGNsaWNrZWQsIGhpZ2hsaWdodCBhY3Rpdml0eSB3aXRoIHJhZGlhbnQgZWxlY3RyaWMgaWxsdW1pbmF0aW9uIVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUdsb2JhbEJ1dHRvbkNsaWNrID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHRhcmdldCA9IChlLnRhcmdldCBhcyBIVE1MRWxlbWVudCk/LmNsb3Nlc3QoJ2J1dHRvbicpO1xuICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYnV0dG9uLWNsaWNrLWlsbHVtaW5hdGVkJyk7XG4gICAgICAgIGNvbnN0IHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxuICAgICAgICAgIG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6cGxhc21hLXNob2Nrd2F2ZScsIHtcbiAgICAgICAgICAgIGRldGFpbDogeyB4OiByZWN0LmxlZnQgKyByZWN0LndpZHRoIC8gMiwgeTogcmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIgfVxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidXR0b24tY2xpY2staWxsdW1pbmF0ZWQnKTtcbiAgICAgICAgfSwgNDUwKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlR2xvYmFsQnV0dG9uQ2xpY2ssIHRydWUpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVHbG9iYWxCdXR0b25DbGljaywgdHJ1ZSk7XG4gIH0sIFtdKTtcblxuICBjb25zdCB0cmlnZ2VyR2xvYmFsUGxhc21hU3VyZ2UgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcbiAgICAgICAgbmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpwbGFzbWEtc2hvY2t3YXZlJywge1xuICAgICAgICAgIGRldGFpbDogeyB4OiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsIHk6IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMyB9XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCB0aGVtZUNsYXNzZXMgPSB7XG4gICAgY3liZXI6ICdiZy1zbGF0ZS05NTAgdGV4dC1zbGF0ZS0xMDAgc2VsZWN0aW9uOmJnLXB1cnBsZS02MDAgc2VsZWN0aW9uOnRleHQtd2hpdGUnLFxuICAgIHN0ZWFsdGg6ICdiZy1uZXV0cmFsLTk1MCB0ZXh0LW5ldXRyYWwtMTAwIHNlbGVjdGlvbjpiZy1jeWFuLTYwMCBzZWxlY3Rpb246dGV4dC13aGl0ZScsXG4gICAgdGFjdGljYWw6ICdiZy16aW5jLTk1MCB0ZXh0LXppbmMtMTAwIHNlbGVjdGlvbjpiZy1yZWQtNjAwIHNlbGVjdGlvbjp0ZXh0LXdoaXRlJyxcbiAgfVt0aGVtZV07XG5cbiAgcmV0dXJuIChcbiAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiUm9vdCBBcHBsaWNhdGlvbiBDb250YWluZXJcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtgbWluLWgtc2NyZWVuICR7dGhlbWVDbGFzc2VzfSBmbGV4IGZsZXgtY29sIGZvbnQtc2FucyB0cmFuc2l0aW9uLWNvbG9ycyBkdXJhdGlvbi0zMDAgcmVsYXRpdmUgb3ZlcmZsb3cteC1oaWRkZW5gfT5cbiAgICAgICAgey8qIEFuaW1hdGVkIFNsb3dseSBFeHBhbmRpbmcgV2hpdGUtQmx1ZS1WaW9sZXQgUGxhc21hIEVuZXJneSBGaWVsZCAmIEVsZWN0cmljIExpZ2h0bmluZyBBcmNzICovfVxuICAgICAgICA8UGxhc21hRW5lcmd5RmllbGQgLz5cblxuICAgICAgICB7LyogTmF2YmFyIHdpdGggYWxsIHRhYnMgKi99XG4gICAgICAgIDxOYXZiYXJcbiAgICAgICAgICBhY3RpdmVUYWI9e2FjdGl2ZVRhYn1cbiAgICAgICAgICBzZXRBY3RpdmVUYWI9e3NldEFjdGl2ZVRhYn1cbiAgICAgICAgICBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfVxuICAgICAgICAgIHNldFNlbGVjdGVkT1M9e3NldFNlbGVjdGVkT1N9XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIHNldFRoZW1lPXtzZXRUaGVtZX1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogRW1lcmdlbmN5IFN0aWNreS9Ub3AgQmFubmVyICovfVxuICAgICAgICA8RW1lcmdlbmN5QmFubmVyIC8+XG5cbiAgICAgICAgey8qIEFjdHVhbGl6YXRpb24gR3VhcmRpYW46IEFudGktU2Fib3RhZ2UgU2hpZWxkICYgRGVzcGFpciBTdWljaWRlIEVuZm9yY2VyICovfVxuICAgICAgICA8QWN0dWFsaXphdGlvbkd1YXJkaWFuQmFyIC8+XG5cbiAgICAgICAgey8qIEhlcm8gSGVhZGVyIHdpdGggU3lzdGVtIFN0YXRlIFN1bW1hcnkgJiBQb2xpc2hlZCBHbG9zc3kgQnV0dG9ucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBwdC01IHBiLTIgdy1mdWxsIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgPGgxIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgbGc6dGV4dC0zeGwgZm9udC1ibGFjayB0cmFja2luZy10aWdodCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlNlbnRpbmVsIEFudGktTWFsd2FyZSAmIE92ZXJsYXkgRGVjYXBpdGF0aW9uIFN0dWRpbzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gxPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzYwIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgICAgV2ViR0wgM0QgQWN0aXZlXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctNHhsXCI+XG4gICAgICAgICAgICAgICAgUGFuY2VybmUgxZtyb2Rvd2lza28gZG8gZGV0ZWtjamksIHRyw7Nqd3ltaWFyb3dlaiBncmFmaWtpIFdlYkdMLCBwb2xvd2FuaWEgeiBHZW1pbmkgQUksIHRyd2HFgmVnbyB1bmllcnVjaGFtaWFuaWEgdyBSQU0gKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LW1vbm9cIj5OdFN1c3BlbmRQcm9jZXNzPC9jb2RlPiksIGt3YXJhbnRhbm55IGJpbmFybmVqICg8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDAgZm9udC1tb25vXCI+aWNhY2xzIC9kZW55PC9jb2RlPikgb3JheiByb3pjaG9kesSFY2VnbyBzacSZIHBvbGEgcGxhem15LlxuICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgey8qIFN0YXR1cyBJbmRpY2F0b3IgU3RyaXA6IFBsYXNtYSAmIDNEIERyaXZlcnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMi41IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCB0ZXh0LVsxMXB4XSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNTAgdGV4dC1wdXJwbGUtMjAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1jeWFuLTQwMCBhbmltYXRlLXBpbmcgaW5saW5lLWJsb2NrXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvbGUgUGxhem15OiBCaWHFgm8tTmllYmllc2tvLUZpb2xldG93ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHRleHQtY3lhbi0yMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgICAgICAgIDxCb3ggY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlN0ZXJvd25pa2kgM0Q6IFRocmVlLmpzIEdvdG93ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0cmlnZ2VyR2xvYmFsUGxhc21hU3VyZ2V9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcHJpbWFyeSBweC0yLjUgcHktMC41IHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiV3nFm2xpaiBmYWzEmSB1ZGVyemVuaW93xIUgcGxhem15IHByemV6IGVrcmFuXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPld5xYJhZHVqIELFgnlza2F3aWPEmTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFBvbGlzaGVkLCBHbG9zc3kgQWN0aW9uIEJ1dHRvbnMgd2l0aCBBY3Rpdml0eSBJbGx1bWluYXRpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SG9ybmV0TW9kYWxPcGVuKHRydWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbG9zc3kgYnRuLWdsb3NzeS1hbWJlciBweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYW5pbWF0ZS1wdWxzZVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJXeXB1xZvEhyBSw7NqIER6aWtpY2ggQWZyeWthxYRza2ljaCBTemVyc3plbmkgZG8gdWJvanUgZ25pZHkhXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc21cIj7wn5CdPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlLDs2ogU3plcnN6ZW5pPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6a2lsbC13b3JrLWRlc3Ryb3llcicpKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpraWxsLWFsbC1nbmlkYXMnKSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBzZXRBY3RpdmVUYWIoJ3dhdGNoZG9nJyk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcmVkIHB4LTMuNSBweS0yIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJSb3prYXogYm9qb3d5OiBOYXR5Y2htaWFzdG93eSB1YsOzaiBnbmlkeSBuaXN6Y3rEhWNlaiBuYXN6xIUgcHJhY8SZIVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMjAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5VYmlqIEduaWTEmSBOaXN6Y3rEhWPEhSBQcmFjxJk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2hvbG9ncmFtJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuLWdsb3NzeSBweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYmxhY2sgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2hvbG9ncmFtJyA/ICdidG4tZ2xvc3N5LXByaW1hcnkgaXMtYWN0aXZlIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05MDAvNTAnIDogJ2J0bi1nbG9zc3ktY3lhbidcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICB0aXRsZT1cIlByemVqZMW6IGRvIHNhbGkga29uZmVyZW5jeWpuZWogbmEgNTAuIHBpxJl0cnplIHogaG9sb2dyYW1hbWkgQnVqb2sgTWVkaWNhbFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QnVpbGRpbmcyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItMzAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkJpdXJvIDUwUCBIb2xvZ3JhbTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigndGhyZWVkJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnRuLWdsb3NzeSBweC0zLjUgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSAke1xuICAgICAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndGhyZWVkJyA/ICdidG4tZ2xvc3N5LWN5YW4gaXMtYWN0aXZlJyA6ICdidG4tZ2xvc3N5LWN5YW4nXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJQcnplamTFuiBkbyB0csOzand5bWlhcm93ZWdvIHJlYWt0b3JhIG9icm9ubmVnbyBUaHJlZS5qc1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Qm94IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGUgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5SZWFrdG9yIDNEPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdvcHRpbWl6ZXInKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcHVycGxlIHB4LTMgcHktMiB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJQcnplamTFuiBkbyBwZXJtYW5lbnRuZWdvIG9wdHltYWxpemF0b3JhIEFJIHd5a3J5d2FuaWEgaSBpbmFrdHl3YWNqaSBnbmlkXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMjAwIGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkFJIE9wdHltYWxpemF0b3I8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3JhZGFyJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsb3NzeSBidG4tZ2xvc3N5LWVtZXJhbGQgcHgtMyBweS0yIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXB1bHNlIHRleHQtZW1lcmFsZC0yMDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlJhZGFyIFdvanNrb3d5PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdodW50ZXInKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktcHJpbWFyeSBweC0zIHB5LTIgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSBhbmltYXRlLXB1bHNlIHRleHQtY3lhbi0yMDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPsWBb3djYSBHZW1pbmkgQUk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBhcXVhcml1bUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXJtb3JlZC1nbGFzcy1hcXVhcml1bScpO1xuICAgICAgICAgICAgICAgICAgaWYgKGFxdWFyaXVtRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBhcXVhcml1bUVsZW1lbnQuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJidG4tZ2xvc3N5IGJ0bi1nbG9zc3ktZGFyayBweC0zIHB5LTIgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC03MDAvNjBcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUHJ6ZWpkxbogZG8gYWt3YXJpdW0gemUgemJyb2pvbmVnbyBzemvFgmFcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPHNwYW4+8J+nqjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Ba3dhcml1bSBHbmlkPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTWFpbiBDb250ZW50IEFyZWEgd2l0aCBJc29sYXRlZCBFcnJvciBCb3VuZGFyaWVzIHBlciBNb2R1bGUgKi99XG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LTYgZmxleC0xIHctZnVsbCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2hvbG9ncmFtJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiQnVqb2sgTWVkaWNhbCAtIEhvbG9ncmFtb3d5IERlY2sgRG93b2R6ZW5pYSA1MC4gUGnEmXRyb1wiPlxuICAgICAgICAgICAgICA8SG9sb2dyYXBoaWNQZW50aG91c2VEZWNrIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICd0aHJlZWQnICYmIChcbiAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJSZWFrdG9yIFRyw7Nqd3ltaWFyb3d5IFRocmVlLmpzICYgV2ViR0xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTN4bCBiZy1ncmFkaWVudC10by1yIGZyb20tY3lhbi05NTAgdmlhLXNsYXRlLTkwMCB0by1wdXJwbGUtOTUwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNTAgc2hhZG93LTJ4bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMi41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1jeWFuLTYwMC8zMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEJveCBjbGFzc05hbWU9XCJ3LTUgaC01IGFuaW1hdGUtcHVsc2UgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgVHLDs2p3eW1pYXJvd3kgUmR6ZcWEIE9icm9ubnkgU2VudGluZWwgKFRocmVlLmpzICYgV2ViR0wpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTcwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAzRCBHcmFwaGljcyBBY3RpdmVcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMiBtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFN0ZXJvd25pa2kgdHLDs2p3eW1pYXJvd2VqIGdyYWZpa2kgVGhyZWUuanMgemHFgmFkb3dhbmUgcG9tecWbbG5pZS4gUmVha3RvciBnZW5lcnVqZSB3aWVsb29zaW93eSDFvHlyb3Nrb3AgcG9sYSBwbGF6bW93ZWdvIHcgc3Bla3RydW0gYmlhxYJvLW5pZWJpZXNrby1maW9sZXRvd3ltLCB6YWJlenBpZWN6YWrEhWMgc3lzdGVtIHByemVkIGluaWVrY2phbWkgcGFtacSZY2kgUkFNIGkgbmFrxYJhZGthbWkgZWtyYW5vd3ltaS5cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXt0cmlnZ2VyR2xvYmFsUGxhc21hU3VyZ2V9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYnRuLWdsb3NzeSBidG4tZ2xvc3N5LWN5YW4gcHgtNCBweS0yLjUgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tMjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XeXp3w7NsIEltcHVscyAzRDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiAzRCBXZWJHTCBDYW52YXMgUmVhY3RvciAqL31cbiAgICAgICAgICAgICAgICA8VGhyZWVERGVmZW5zZUNvcmUgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdyYWRhcicgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlJhZGFyIFdvanNrb3d5ICYgU2thbmVyIE1vbm9saXR5Y3puZWogUG93aWVyemNobmkgU3lzdGVtdVwiPlxuICAgICAgICAgICAgICA8TWlsaXRhcnlSYWRhclNjYW5uZXIgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ29wdGltaXplcicgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlBlcm1hbmVudG55IE9wdHltYWxpemF0b3IgQUkgTWV0b2QgV3lrcnl3YW5pYSBpIEluYWt0eXdhY2ppXCI+XG4gICAgICAgICAgICAgIDxBSU9wdGltaXplciAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc2NyaXB0cycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlNrcnlwdHkgUHl0aG9uICYgV2luMzIgQ3R5cGVzXCI+XG4gICAgICAgICAgICAgIDxTY3JpcHRzTGlicmFyeSBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnaHVudGVyJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwixYFvd2NhIEdlbWluaSBBSSAmIFNsYXVnaHRlciBFbmdpbmVcIj5cbiAgICAgICAgICAgICAgPEdlbWluaUh1bnRlciBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAndGhyZWF0cycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIkthcnRvdGVrYSBabmlzemN6b255Y2ggV2lydXPDs3cgJiBNZWNoYW5pem3Ds3cgQWdyZXNqaVwiPlxuICAgICAgICAgICAgICA8TmV1dHJhbGl6ZWRUaHJlYXRzTGVkZ2VyIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdoZWFsaW5nJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiQ2VudHJ1bSBBdXRvbmFwcmF3eSAmIFBhbmNlcm5lIEJhcmllcnkgT2Nocm9ubmVcIj5cbiAgICAgICAgICAgICAgPFNlbGZIZWFsaW5nQ2VudGVyIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdnZW5lcmF0b3InICYmIChcbiAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJHZW5lcmF0b3IgU2tyeXB0w7N3IEVrc3Rlcm1pbmFjamkgLnB5ICYgU3R1ZGlvIFd5cGllcmFuaWFcIj5cbiAgICAgICAgICAgICAgPFNjcmlwdEdlbmVyYXRvciBpbml0aWFsT1M9e3NlbGVjdGVkT1N9IC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdzaW11bGF0b3InICYmIChcbiAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJJbnRlcmFrdHl3bnkgU3ltdWxhdG9yIFByb2Nlc8OzdyBpIE5ha8WCYWRla1wiPlxuICAgICAgICAgICAgICA8SW50ZXJhY3RpdmVTaW11bGF0b3IgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3dhdGNoZG9nJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiVGVsZW1ldHJpYSAmIFdhdGNoZG9nIFphc29iw7N3IENQVS9SQU1cIj5cbiAgICAgICAgICAgICAgPFByb2Nlc3NXYXRjaGRvZyAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnZm9yZW5zaWNzJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiQmF6YSBXaWVkenkgS3J5bWluYWxpc3R5Y3puZWogV2luMzIvWDExL1F1YXJ0elwiPlxuICAgICAgICAgICAgICA8Rm9yZW5zaWNzR3VpZGUgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2FpJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiQXN5c3RlbnQgQUkgR2VtaW5pXCI+XG4gICAgICAgICAgICAgIDxBSUFzc2lzdGFudCBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvbWFpbj5cblxuICAgICAgICB7LyogT2dyb21uZSBBa3dhcml1bSB6ZSBaYnJvam9uZWdvIFN6a8WCYSB1bWllc3pjem9uZSBuYSBwbGF0Zm9ybWllIHBvbmnFvGVqICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHctZnVsbCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIkFrd2FyaXVtIHplIFpicm9qb25lZ28gU3prxYJhIGRvIE9ic2Vyd2FjamkgR25pZFwiPlxuICAgICAgICAgICAgPEFybW9yZWRHbGFzc0FxdWFyaXVtIC8+XG4gICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWZyaWNhbiBIb3JuZXQgU3dhcm0gTW9kYWwgKENhbiBiZSB0cmlnZ2VyZWQgYW55d2hlcmUpICovfVxuICAgICAgICA8QWZyaWNhbkhvcm5ldFN3YXJtTW9kYWxcbiAgICAgICAgICBpc09wZW49e2hvcm5ldE1vZGFsT3Blbn1cbiAgICAgICAgICBvbkNsb3NlPXsoKSA9PiBzZXRIb3JuZXRNb2RhbE9wZW4oZmFsc2UpfVxuICAgICAgICAgIHRhcmdldEduaWRhTmFtZT1cImduaWRhX25pc3pjemFjYV9wcmFjZS5leGVcIlxuICAgICAgICAgIHRhcmdldFBpZD17NTEyNH1cbiAgICAgICAgLz5cblxuICAgICAgICB7LyogRmxvYXRpbmcgUGFuaWMgQnV0dG9uIENvbXBvbmVudCAoRml4ZWQgYm90dG9tIHJpZ2h0KSAqL31cbiAgICAgICAgPFBhbmljQnV0dG9uIC8+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvOTAgYmFja2Ryb3AtYmx1ci1tZCBib3JkZXItdCBib3JkZXItc2xhdGUtOTAwIHB5LTYgcHgtNCB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIG10LTEyIHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCB0ZXh0LWNlbnRlciBzbTp0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgIDxTaGllbGQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS01MDBcIiAvPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwXCI+U2VudGluZWwgQW50aS1NYWx3YXJlICYgT3ZlcmxheSBEZWNhcGl0YXRpb24gU3R1ZGlvPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPlRocmVlLmpzIDNEIFdlYkdMIEVuZ2luZSBBY3RpdmU8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTMgdGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDAgZmxleC13cmFwIGp1c3RpZnktY2VudGVyIHNtOmp1c3RpZnktZW5kIGdhcC15LTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgIDxCb3ggY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWN5YW4tMzAwXCIgLz5cbiAgICAgICAgICAgICAgICBHcmFmaWthIDNEOiBUaHJlZS5qcyBPS1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtcHVycGxlLTMwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICBQb2xlIFBsYXpteTogQmlhxYJvLU5pZWJpZXNrby1GaW9sZXRvd2VcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgIFBvZMWbd2lldGxhbmllIFByenljaXNrw7N3IEFrdHl3bmVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZm9vdGVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9FcnJvckJvdW5kYXJ5PlxuICApO1xufVxuIl0sIm1hcHBpbmdzIjoiQUE0RVE7QUE1RVIsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0MsU0FBUyxjQUF1QjtBQUNoQyxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLHVCQUF1QjtBQUNoQyxTQUFTLHNCQUFzQjtBQUMvQixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLG1CQUFtQjtBQUM1QixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLGdDQUFnQztBQUN6QyxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLG1CQUFtQjtBQUM1QixTQUFTLDRCQUE0QjtBQUNyQyxTQUFTLCtCQUErQjtBQUN4QyxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLHlCQUF5QjtBQUNsQyxTQUFTLGdDQUFnQztBQUN6QyxTQUFTLHFCQUFxQjtBQUU5QixTQUFtQixRQUFnRCxjQUErQyxPQUFPLFdBQW1CLE9BQU8sS0FBYyxLQUFLLGlCQUFpQjtBQUl2TCx3QkFBd0IsTUFBTTtBQUM1QixRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBa0IsVUFBVTtBQUM5RCxRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBaUIsU0FBUztBQUM5RCxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksU0FBMkMsT0FBTztBQUM1RSxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQVMsS0FBSztBQUk1RCxZQUFVLE1BQU07QUFDZCxVQUFNLDBCQUEwQixDQUFDLE1BQWtCO0FBQ2pELFlBQU0sU0FBVSxFQUFFLFFBQXdCLFFBQVEsUUFBUTtBQUMxRCxVQUFJLFFBQVE7QUFDVixlQUFPLFVBQVUsSUFBSSwwQkFBMEI7QUFDL0MsY0FBTSxPQUFPLE9BQU8sc0JBQXNCO0FBQzFDLGVBQU87QUFBQSxVQUNMLElBQUksWUFBWSw2QkFBNkI7QUFBQSxZQUMzQyxRQUFRLEVBQUUsR0FBRyxLQUFLLE9BQU8sS0FBSyxRQUFRLEdBQUcsR0FBRyxLQUFLLE1BQU0sS0FBSyxTQUFTLEVBQUU7QUFBQSxVQUN6RSxDQUFDO0FBQUEsUUFDSDtBQUNBLG1CQUFXLE1BQU07QUFDZixpQkFBTyxVQUFVLE9BQU8sMEJBQTBCO0FBQUEsUUFDcEQsR0FBRyxHQUFHO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFFQSxXQUFPLGlCQUFpQixTQUFTLHlCQUF5QixJQUFJO0FBQzlELFdBQU8sTUFBTSxPQUFPLG9CQUFvQixTQUFTLHlCQUF5QixJQUFJO0FBQUEsRUFDaEYsR0FBRyxDQUFDLENBQUM7QUFFTCxRQUFNLDJCQUEyQixNQUFNO0FBQ3JDLFFBQUksT0FBTyxXQUFXLGFBQWE7QUFDakMsYUFBTztBQUFBLFFBQ0wsSUFBSSxZQUFZLDZCQUE2QjtBQUFBLFVBQzNDLFFBQVEsRUFBRSxHQUFHLE9BQU8sYUFBYSxHQUFHLEdBQUcsT0FBTyxjQUFjLElBQUk7QUFBQSxRQUNsRSxDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxlQUFlO0FBQUEsSUFDbkIsT0FBTztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLEVBQ1osRUFBRSxLQUFLO0FBRVAsU0FDRSx1QkFBQyxpQkFBYyxZQUFXLDhCQUN4QixpQ0FBQyxTQUFJLFdBQVcsZ0JBQWdCLFlBQVksc0ZBRTFDO0FBQUEsMkJBQUMsdUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFtQjtBQUFBLElBR25CO0FBQUEsTUFBQztBQUFBO0FBQUEsUUFDQztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUE7QUFBQSxNQU5GO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9BO0FBQUEsSUFHQSx1QkFBQyxxQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQWlCO0FBQUEsSUFHakIsdUJBQUMsOEJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUEwQjtBQUFBLElBRzFCLHVCQUFDLFNBQUksV0FBVSx5RUFDYixpQ0FBQyxTQUFJLFdBQVUsaUhBQ2I7QUFBQSw2QkFBQyxTQUNDO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUEsaUNBQUMsUUFBRyxXQUFVLGtHQUNaLGlDQUFDLFVBQUssbUVBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBeUQsS0FEM0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0EsdUJBQUMsVUFBSyxXQUFVLDRIQUEySCwrQkFBM0k7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLGFBTkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQU9BO0FBQUEsUUFDQSx1QkFBQyxPQUFFLFdBQVUsb0RBQW1EO0FBQUE7QUFBQSxVQUN3RCx1QkFBQyxVQUFLLFdBQVUsNkJBQTRCLGdDQUE1QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUE0RDtBQUFBLFVBQU87QUFBQSxVQUF5Qix1QkFBQyxVQUFLLFdBQVUsMEJBQXlCLDRCQUF6QztBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFxRDtBQUFBLFVBQU87QUFBQSxhQURoUjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUdBLHVCQUFDLFNBQUksV0FBVSxrRUFDYjtBQUFBLGlDQUFDLFVBQUssV0FBVSwwSEFDZDtBQUFBLG1DQUFDLFVBQUssV0FBVSxnRUFBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBNkU7QUFBQSxZQUM3RSx1QkFBQyxVQUFLLHNEQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQTRDO0FBQUEsZUFGOUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFHQTtBQUFBLFVBRUEsdUJBQUMsVUFBSyxXQUFVLHNIQUNkO0FBQUEsbUNBQUMsT0FBSSxXQUFVLDJCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQXVDO0FBQUEsWUFDdkMsdUJBQUMsVUFBSyw4Q0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFvQztBQUFBLGVBRnRDO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBR0E7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxXQUFVO0FBQUEsY0FDVixPQUFNO0FBQUEsY0FFTjtBQUFBLHVDQUFDLE9BQUksV0FBVSw2QkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF5QztBQUFBLGdCQUN6Qyx1QkFBQyxVQUFLLGtDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXdCO0FBQUE7QUFBQTtBQUFBLFlBTjFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU9BO0FBQUEsYUFsQkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQW1CQTtBQUFBLFdBakNGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFrQ0E7QUFBQSxNQUdBLHVCQUFDLFNBQUksV0FBVSxpREFDYjtBQUFBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sbUJBQW1CLElBQUk7QUFBQSxZQUN0QyxXQUFVO0FBQUEsWUFDVixPQUFNO0FBQUEsWUFFTjtBQUFBLHFDQUFDLFVBQUssV0FBVSxXQUFVLGtCQUExQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0QjtBQUFBLGNBQzVCLHVCQUFDLFVBQUssNkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBbUI7QUFBQTtBQUFBO0FBQUEsVUFOckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU07QUFDYixrQkFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQyx1QkFBTyxjQUFjLElBQUksWUFBWSw4QkFBOEIsQ0FBQztBQUNwRSx1QkFBTyxjQUFjLElBQUksWUFBWSwwQkFBMEIsQ0FBQztBQUFBLGNBQ2xFO0FBQ0EsMkJBQWEsVUFBVTtBQUFBLFlBQ3pCO0FBQUEsWUFDQSxXQUFVO0FBQUEsWUFDVixPQUFNO0FBQUEsWUFFTjtBQUFBLHFDQUFDLFNBQU0sV0FBVSxpQ0FBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBK0M7QUFBQSxjQUMvQyx1QkFBQyxVQUFLLDBDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdDO0FBQUE7QUFBQTtBQUFBLFVBWmxDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQWFBO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGFBQWEsVUFBVTtBQUFBLFlBQ3RDLFdBQVcsaUZBQ1QsY0FBYyxhQUFhLDhEQUE4RCxpQkFDM0Y7QUFBQSxZQUNBLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsYUFBVSxXQUFVLDhDQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFnRTtBQUFBLGNBQ2hFLHVCQUFDLFVBQUssa0NBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBd0I7QUFBQTtBQUFBO0FBQUEsVUFSMUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBU0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sYUFBYSxRQUFRO0FBQUEsWUFDcEMsV0FBVyxnRkFDVCxjQUFjLFdBQVcsOEJBQThCLGlCQUN6RDtBQUFBLFlBQ0EsT0FBTTtBQUFBLFlBRU47QUFBQSxxQ0FBQyxPQUFJLFdBQVUseUNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUQ7QUFBQSxjQUNyRCx1QkFBQyxVQUFLLDBCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQWdCO0FBQUE7QUFBQTtBQUFBLFVBUmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQVNBO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGFBQWEsV0FBVztBQUFBLFlBQ3ZDLFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsT0FBSSxXQUFVLCtDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTJEO0FBQUEsY0FDM0QsdUJBQUMsVUFBSyxnQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFzQjtBQUFBO0FBQUE7QUFBQSxVQU54QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFPQTtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVMsTUFBTSxhQUFhLE9BQU87QUFBQSxZQUNuQyxXQUFVO0FBQUEsWUFFVjtBQUFBLHFDQUFDLFNBQU0sV0FBVSxnREFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBOEQ7QUFBQSxjQUM5RCx1QkFBQyxVQUFLLDhCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9CO0FBQUE7QUFBQTtBQUFBLFVBTHRCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQU1BO0FBQUEsUUFFQTtBQUFBLFVBQUM7QUFBQTtBQUFBLFlBQ0MsU0FBUyxNQUFNLGFBQWEsUUFBUTtBQUFBLFlBQ3BDLFdBQVU7QUFBQSxZQUVWO0FBQUEscUNBQUMsYUFBVSxXQUFVLDZDQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUErRDtBQUFBLGNBQy9ELHVCQUFDLFVBQUssK0JBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUI7QUFBQTtBQUFBO0FBQUEsVUFMdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBTUE7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU07QUFDYixvQkFBTSxrQkFBa0IsU0FBUyxlQUFlLHdCQUF3QjtBQUN4RSxrQkFBSSxpQkFBaUI7QUFDbkIsZ0NBQWdCLGVBQWUsRUFBRSxVQUFVLFNBQVMsQ0FBQztBQUFBLGNBQ3ZEO0FBQUEsWUFDRjtBQUFBLFlBQ0EsV0FBVTtBQUFBLFlBQ1YsT0FBTTtBQUFBLFlBRU47QUFBQSxxQ0FBQyxVQUFLLGtCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQVE7QUFBQSxjQUNSLHVCQUFDLFVBQUssNkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBbUI7QUFBQTtBQUFBO0FBQUEsVUFYckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBWUE7QUFBQSxXQXBGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBcUZBO0FBQUEsU0EzSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTRIQSxLQTdIRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBOEhBO0FBQUEsSUFHQSx1QkFBQyxVQUFLLFdBQVUsMkVBQ2I7QUFBQSxvQkFBYyxjQUNiLHVCQUFDLGlCQUFjLFlBQVcsMERBQ3hCLGlDQUFDLDhCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBMEIsS0FENUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLFlBQ2IsdUJBQUMsaUJBQWMsWUFBVywwQ0FDeEIsaUNBQUMsU0FBSSxXQUFVLGFBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsNElBQ2IsaUNBQUMsU0FBSSxXQUFVLDZGQUNiO0FBQUEsaUNBQUMsU0FDQztBQUFBLG1DQUFDLFNBQUksV0FBVSxpQ0FDYjtBQUFBLHFDQUFDLFVBQUssV0FBVSx5RUFDZCxpQ0FBQyxPQUFJLFdBQVUseUNBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBcUQsS0FEdkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGNBQ0EsdUJBQUMsUUFBRyxXQUFVLDREQUEyRCx1RUFBekU7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGNBQ0EsdUJBQUMsVUFBSyxXQUFVLG9IQUFtSCxrQ0FBbkk7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFFQTtBQUFBLGlCQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBVUE7QUFBQSxZQUNBLHVCQUFDLE9BQUUsV0FBVSxvREFBbUQseVBBQWhFO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRUE7QUFBQSxlQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBZUE7QUFBQSxVQUVBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTO0FBQUEsY0FDVCxXQUFVO0FBQUEsY0FFVjtBQUFBLHVDQUFDLE9BQUksV0FBVSwyQkFBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUF1QztBQUFBLGdCQUN2Qyx1QkFBQyxVQUFLLGdDQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBQXNCO0FBQUE7QUFBQTtBQUFBLFlBTHhCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQU1BO0FBQUEsYUF4QkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQXlCQSxLQTFCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBMkJBO0FBQUEsUUFHQSx1QkFBQyx1QkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW1CO0FBQUEsV0EvQnJCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFnQ0EsS0FqQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWtDQTtBQUFBLE1BR0QsY0FBYyxXQUNiLHVCQUFDLGlCQUFjLFlBQVcsNkRBQ3hCLGlDQUFDLDBCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBc0IsS0FEeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLGVBQ2IsdUJBQUMsaUJBQWMsWUFBVywrREFDeEIsaUNBQUMsaUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFhLEtBRGY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLGFBQ2IsdUJBQUMsaUJBQWMsWUFBVyxpQ0FDeEIsaUNBQUMsa0JBQWUsY0FBaEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUF3QyxLQUQxQztBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUdELGNBQWMsWUFDYix1QkFBQyxpQkFBYyxZQUFXLHNDQUN4QixpQ0FBQyxnQkFBYSxjQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBc0MsS0FEeEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLGFBQ2IsdUJBQUMsaUJBQWMsWUFBVyx3REFDeEIsaUNBQUMsOEJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUEwQixLQUQ1QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUdELGNBQWMsYUFDYix1QkFBQyxpQkFBYyxZQUFXLG1EQUN4QixpQ0FBQyx1QkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQW1CLEtBRHJCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLE1BR0QsY0FBYyxlQUNiLHVCQUFDLGlCQUFjLFlBQVcsNERBQ3hCLGlDQUFDLG1CQUFnQixXQUFXLGNBQTVCO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBd0MsS0FEMUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLGVBQ2IsdUJBQUMsaUJBQWMsWUFBVyw4Q0FDeEIsaUNBQUMsMEJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUFzQixLQUR4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBRUE7QUFBQSxNQUdELGNBQWMsY0FDYix1QkFBQyxpQkFBYyxZQUFXLHlDQUN4QixpQ0FBQyxxQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQWlCLEtBRG5CO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFFQTtBQUFBLE1BR0QsY0FBYyxlQUNiLHVCQUFDLGlCQUFjLFlBQVcsa0RBQ3hCLGlDQUFDLG9CQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBZ0IsS0FEbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsTUFHRCxjQUFjLFFBQ2IsdUJBQUMsaUJBQWMsWUFBVyxzQkFDeEIsaUNBQUMsZUFBWSxjQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFBcUMsS0FEdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUVBO0FBQUEsU0E1R0o7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQThHQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLCtEQUNiLGlDQUFDLGlCQUFjLFlBQVcsbURBQ3hCLGlDQUFDLDBCQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FBc0IsS0FEeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUVBLEtBSEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUlBO0FBQUEsSUFHQTtBQUFBLE1BQUM7QUFBQTtBQUFBLFFBQ0MsUUFBUTtBQUFBLFFBQ1IsU0FBUyxNQUFNLG1CQUFtQixLQUFLO0FBQUEsUUFDdkMsaUJBQWdCO0FBQUEsUUFDaEIsV0FBVztBQUFBO0FBQUEsTUFKYjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFLQTtBQUFBLElBR0EsdUJBQUMsaUJBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUFhO0FBQUEsSUFHYix1QkFBQyxZQUFPLFdBQVUsbUhBQ2hCLGlDQUFDLFNBQUksV0FBVSwyR0FDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSwrQkFDYjtBQUFBLCtCQUFDLFVBQU8sV0FBVSw2QkFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUE0QztBQUFBLFFBQzVDLHVCQUFDLFVBQUssV0FBVSxnQ0FBK0IsbUVBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBa0c7QUFBQSxRQUNsRyx1QkFBQyxVQUFLLGlCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBTztBQUFBLFFBQ1AsdUJBQUMsVUFBSywrQ0FBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQXFDO0FBQUEsV0FKdkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUtBO0FBQUEsTUFFQSx1QkFBQyxTQUFJLFdBQVUsMEdBQ2I7QUFBQSwrQkFBQyxVQUFLLFdBQVUseUNBQ2Q7QUFBQSxpQ0FBQyxPQUFJLFdBQVUsMkJBQWY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBdUM7QUFBQSxVQUFFO0FBQUEsYUFEM0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsUUFDQSx1QkFBQyxVQUFLLGlCQUFOO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBTztBQUFBLFFBQ1AsdUJBQUMsVUFBSyxXQUFVLDJDQUNkO0FBQUEsaUNBQUMsT0FBSSxXQUFVLDJDQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBQXVEO0FBQUEsVUFBRTtBQUFBLGFBRDNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFHQTtBQUFBLFFBQ0EsdUJBQUMsVUFBSyxpQkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQU87QUFBQSxRQUNQLHVCQUFDLFVBQUssV0FBVSw0Q0FDZDtBQUFBLGlDQUFDLGdCQUFhLFdBQVUsYUFBeEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBa0M7QUFBQSxVQUFFO0FBQUEsYUFEdEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUdBO0FBQUEsV0FkRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZUE7QUFBQSxTQXZCRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBd0JBLEtBekJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0EwQkE7QUFBQSxPQW5URjtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBb1RBLEtBclRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FzVEE7QUFFSjsiLCJuYW1lcyI6W119