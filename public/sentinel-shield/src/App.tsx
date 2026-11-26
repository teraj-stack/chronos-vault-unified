import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"];
import { Navbar } from "/sentinel-shield/src/components/Navbar.tsx";
import { EmergencyBanner } from "/sentinel-shield/src/components/EmergencyBanner.tsx";
import { ScriptsLibrary } from "/sentinel-shield/src/components/ScriptsLibrary.tsx";
import { ScriptGenerator } from "/sentinel-shield/src/components/ScriptGenerator.tsx";
import { InteractiveSimulator } from "/sentinel-shield/src/components/InteractiveSimulator.tsx";
import { ProcessWatchdog } from "/sentinel-shield/src/components/ProcessWatchdog.tsx";
import { ForensicsGuide } from "/sentinel-shield/src/components/ForensicsGuide.tsx";
import { AIAssistant } from "/sentinel-shield/src/components/AIAssistant.tsx";
import { PanicButton } from "/sentinel-shield/src/components/PanicButton.tsx";
import { GeminiHunter } from "/sentinel-shield/src/components/GeminiHunter.tsx";
import { NeutralizedThreatsLedger } from "/sentinel-shield/src/components/NeutralizedThreatsLedger.tsx";
import { SelfHealingCenter } from "/sentinel-shield/src/components/SelfHealingCenter.tsx";
import { MilitaryRadarScanner } from "/sentinel-shield/src/components/MilitaryRadarScanner.tsx";
import { HexagonalLaserBarrierMatrix } from "/sentinel-shield/src/components/HexagonalLaserBarrierMatrix.tsx";
import { BrowserViewportLaserShield } from "/sentinel-shield/src/components/BrowserViewportLaserShield.tsx";
import { OfflineDeploymentCenter } from "/sentinel-shield/src/components/OfflineDeploymentCenter.tsx";
import { BaseRedAlertOverlay } from "/sentinel-shield/src/components/BaseRedAlertOverlay.tsx";
import { DroneInterAppPatrolOverlay } from "/sentinel-shield/src/components/DroneInterAppPatrolOverlay.tsx";
import { KittenDronesOverlay } from "/sentinel-shield/src/components/KittenDronesOverlay.tsx";
import { LoadingPage } from "/sentinel-shield/src/components/LoadingPage.tsx";
import { MobileTacticalDesantArea } from "/sentinel-shield/src/components/MobileTacticalDesantArea.tsx";
import { PanicCenterView } from "/sentinel-shield/src/components/PanicCenterView.tsx";
import { FreezeAllPluginModule } from "/sentinel-shield/src/components/FreezeAllPluginModule.tsx";
import { PciHardwareTelemetryMonitor } from "/sentinel-shield/src/components/PciHardwareTelemetryMonitor.tsx";
import { StressTestHarness } from "/sentinel-shield/src/components/StressTestHarness.tsx";
import { SystemImmunizationPanel } from "/sentinel-shield/src/components/SystemImmunizationPanel.tsx";
import { TacticalWarRoomHoloTable } from "/sentinel-shield/src/components/TacticalWarRoomHoloTable.tsx";
import { ErrorBoundary } from "/sentinel-shield/src/components/ErrorBoundary.tsx";
import { INITIAL_NEUTRALIZED_THREATS } from "/sentinel-shield/src/data/neutralizedViruses.ts";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { Shield, AlertOctagon, CheckCircle2, Activity, Radio, Zap, ShieldCheck, HardDrive, Navigation, Smartphone, Disc } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { slipperyEngine } from "/sentinel-shield/src/utils/slipperyButtonsEngine.ts";
export default function App() {
  const [activeTab, setActiveTab] = useState("loading");
  const [selectedOS, setSelectedOS] = useState("windows");
  const [theme, setTheme] = useState("cyber");
  const [threats] = useState(() => {
    const custom = safeStorage.get("sentinel_custom_threats", []);
    return [...INITIAL_NEUTRALIZED_THREATS, ...custom];
  });
  React.useEffect(() => {
    slipperyEngine.initialize();
  }, []);
  const isMinimal = activeTab === "loading";
  const themeClasses = {
    cyber: "bg-[#07090e] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200",
    stealth: "bg-[#05070a] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200",
    tactical: "bg-[#0a0d14] text-slate-100 selection:bg-rose-500/30 selection:text-rose-200"
  }[theme];
  return /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Root Application Container", children: /* @__PURE__ */ jsxDEV("div", { className: `min-h-screen ${themeClasses} flex flex-col font-sans transition-colors duration-300 relative`, children: [
    /* @__PURE__ */ jsxDEV(BaseRedAlertOverlay, { onNavigateToTab: (t) => setActiveTab(t) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 66,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      DroneInterAppPatrolOverlay,
      {
        isMinimalLoadingMode: isMinimal,
        onNavigateToTab: (t) => setActiveTab(t)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 69,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      KittenDronesOverlay,
      {
        isMinimalLoadingMode: isMinimal,
        onNavigateToTab: (t) => setActiveTab(t)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 75,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(
      BrowserViewportLaserShield,
      {
        isMinimalLoadingMode: isMinimal,
        onNavigateToTab: (t) => setActiveTab(t)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 81,
        columnNumber: 9
      },
      this
    ),
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
        lineNumber: 87,
        columnNumber: 9
      },
      this
    ),
    !isMinimal && /* @__PURE__ */ jsxDEV(EmergencyBanner, {}, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 97,
      columnNumber: 24
    }, this),
    !isMinimal && /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-2 w-full", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h1", { className: "text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white flex items-center gap-2.5", children: /* @__PURE__ */ jsxDEV("span", { children: "Sentinel Anti-Malware & Overlay Decapitation Studio" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 105,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 104,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-4xl", children: [
          "Pancerne środowisko do detekcji, polowania z wykorzystaniem Gemini AI, natychmiastowej aktywacji ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-400", children: "laserowej bariery heksagonalnej chroniącej unit aplikacji" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 108,
            columnNumber: 116
          }, this),
          ", trwałego unieruchamiania w RAM (",
          /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 108,
            columnNumber: 250
          }, this),
          ") oraz samonaprawy."
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 107,
          columnNumber: 17
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 103,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("immunization"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Otwórz moduł Immunizacji Systemu (Windows GPO / Firewall / IFEO Registry Traps)",
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 118,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Immunizacja GPO/IFEO" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 119,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 113,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("pci"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Otwórz systemy parametrów fal EM, znoszenia rezonansu, wykres wpływu na móżdżek i wtyczkę wymiarów Dashboard",
            children: [
              /* @__PURE__ */ jsxDEV(Activity, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 127,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Fale EM, Móżdżek & Wtyczka Dashboard" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 128,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 122,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("holotable"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer animate-pulse",
            title: "Stół Konferencyjny Dowództwa z Przezroczystymi Ekranami Hologramowymi",
            children: [
              /* @__PURE__ */ jsxDEV(Disc, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 136,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Stół Hologramowy (War Room)" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 137,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 131,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("mobile"),
            className: "px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 hover:from-emerald-900 hover:to-slate-800 border border-emerald-400/70 text-emerald-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer",
            title: "Otwórz moduł Desantu G.R.O.M. (20-sekundowa akcja z pulsującym czerwonym światłem i pogodnym rozjaśnieniem)",
            children: [
              /* @__PURE__ */ jsxDEV(Smartphone, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 145,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "⚡ Desant G.R.O.M. (20s)" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 146,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 140,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("loading"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 text-amber-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Przejdź do dedykowanego widoku Tarczy Laserowej & Gotowości Bojowej",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 154,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Widok Tarczy Laserowej" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 155,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 149,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("panic"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-rose-500/40 text-rose-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Otwórz pełną podstronę Panic Button (Multi-OS Emergency Freeze)",
            children: [
              /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 163,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Panic Button" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 164,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 158,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("healing"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-indigo-500/40 text-indigo-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Eskadra 20 Dronów Patrolujących & Robot Strażnik",
            children: [
              /* @__PURE__ */ jsxDEV(Navigation, { className: "w-3.5 h-3.5 text-indigo-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 172,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Drony & Strażnik" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 173,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 167,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("offline"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium flex items-center gap-2 shadow-lg transition-all cursor-pointer",
            title: "Stanowisko Zrzutu Offline (Zero-Install / Zero-Google)",
            children: [
              /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 181,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zrzut Offline" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 182,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 176,
            columnNumber: 17
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("radar"),
            className: "px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-slate-300 hover:text-white text-xs font-mono font-medium flex items-center gap-2 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 189,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Radar & I/O" }, void 0, false, {
                fileName: "/app/applet/src/App.tsx",
                lineNumber: 190,
                columnNumber: 19
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 185,
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
      lineNumber: 102,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 101,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full", children: [
      activeTab === "loading" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Dedykowany Ekran Gotowości Bojowej & Wizualizacja Tarczy Laserowej", children: /* @__PURE__ */ jsxDEV(
        LoadingPage,
        {
          onEnterFullStudio: () => setActiveTab("barrier"),
          onNavigateToTab: (tab) => setActiveTab(tab)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 201,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 200,
        columnNumber: 13
      }, this),
      activeTab === "holotable" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Stół Konferencyjny Dowództwa z Przezroczystymi Ekranami Hologramowymi", children: /* @__PURE__ */ jsxDEV(TacticalWarRoomHoloTable, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 210,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 209,
        columnNumber: 13
      }, this),
      activeTab === "immunization" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Mechanizm Immunizacji Systemu (Windows GPO/Firewall/Registry)", children: /* @__PURE__ */ jsxDEV(SystemImmunizationPanel, { threats }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 216,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 215,
        columnNumber: 13
      }, this),
      activeTab === "stresstest" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Poligon Obciążeniowy (Stress Test) & Weryfikacja Panic Button", children: /* @__PURE__ */ jsxDEV(
        StressTestHarness,
        {
          onNavigateToTab: (tab) => setActiveTab(tab)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 222,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 221,
        columnNumber: 13
      }, this),
      activeTab === "pci" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Odczyty Odbiorników Wyjść Złączy & Listwy PCI (Wykres Liniowy ze Współrzędnymi)", children: /* @__PURE__ */ jsxDEV(PciHardwareTelemetryMonitor, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 230,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 229,
        columnNumber: 13
      }, this),
      activeTab === "freezeall" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Moduł Wtyczki Freeze-All (Overlay, Window Manager, BitsDojo)", children: /* @__PURE__ */ jsxDEV(FreezeAllPluginModule, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 236,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 235,
        columnNumber: 13
      }, this),
      activeTab === "mobile" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Mobilne Automatyczne Zajmowanie Obszaru & Desant na Ekrany", children: /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: /* @__PURE__ */ jsxDEV(MobileTacticalDesantArea, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 243,
        columnNumber: 17
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 242,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 241,
        columnNumber: 13
      }, this),
      activeTab === "panic" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Pełna Podstrona Dowodzenia Panic Button (Multi-OS Freeze)", children: /* @__PURE__ */ jsxDEV(
        PanicCenterView,
        {
          onNavigateToTab: (tab) => setActiveTab(tab)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 250,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 249,
        columnNumber: 13
      }, this),
      activeTab === "barrier" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Laserowa Bariera Heksagonalna & Ochrona Unitu Aplikacji", children: /* @__PURE__ */ jsxDEV(HexagonalLaserBarrierMatrix, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 258,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 257,
        columnNumber: 13
      }, this),
      activeTab === "offline" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Stanowisko Zrzutu Offline & Środowisko Autonomiczne", children: /* @__PURE__ */ jsxDEV(OfflineDeploymentCenter, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 264,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 263,
        columnNumber: 13
      }, this),
      activeTab === "radar" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Radar Wojskowy & Skaner Monolitycznej Powierzchni Systemu", children: /* @__PURE__ */ jsxDEV(MilitaryRadarScanner, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 270,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 269,
        columnNumber: 13
      }, this),
      activeTab === "scripts" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Skrypty Python & Win32 Ctypes", children: /* @__PURE__ */ jsxDEV(ScriptsLibrary, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 276,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 275,
        columnNumber: 13
      }, this),
      activeTab === "hunter" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Łowca Gemini AI & Slaughter Engine", children: /* @__PURE__ */ jsxDEV(GeminiHunter, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 282,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 281,
        columnNumber: 13
      }, this),
      activeTab === "threats" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Kartoteka Zniszczonych Wirusów & Mechanizmów Agresji", children: /* @__PURE__ */ jsxDEV(NeutralizedThreatsLedger, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 288,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 287,
        columnNumber: 13
      }, this),
      activeTab === "healing" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Centrum Autonaprawy & Pancerne Bariery Ochronne", children: /* @__PURE__ */ jsxDEV(SelfHealingCenter, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 294,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 293,
        columnNumber: 13
      }, this),
      activeTab === "generator" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Generator Skryptów Eksterminacji .py", children: /* @__PURE__ */ jsxDEV(ScriptGenerator, { initialOS: selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 300,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 299,
        columnNumber: 13
      }, this),
      activeTab === "simulator" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Interaktywny Symulator Procesów i Nakładek", children: /* @__PURE__ */ jsxDEV(InteractiveSimulator, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 306,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 305,
        columnNumber: 13
      }, this),
      activeTab === "watchdog" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Telemetria & Watchdog Zasobów CPU/RAM", children: /* @__PURE__ */ jsxDEV(ProcessWatchdog, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 312,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 311,
        columnNumber: 13
      }, this),
      activeTab === "forensics" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Baza Wiedzy Kryminalistycznej Win32/X11/Quartz", children: /* @__PURE__ */ jsxDEV(ForensicsGuide, {}, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 318,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 317,
        columnNumber: 13
      }, this),
      activeTab === "ai" && /* @__PURE__ */ jsxDEV(ErrorBoundary, { moduleName: "Asystent AI Gemini", children: /* @__PURE__ */ jsxDEV(AIAssistant, { selectedOS }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 324,
        columnNumber: 15
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 323,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 198,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV(
      PanicButton,
      {
        isMinimalLoadingMode: isMinimal,
        onNavigateToTab: (t) => setActiveTab(t)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 330,
        columnNumber: 9
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("footer", { className: "bg-slate-950 border-t border-slate-900 py-6 px-4 text-xs text-slate-500 mt-12", children: /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(Shield, { className: "w-4 h-4 text-purple-500" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 339,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-slate-400", children: "Sentinel Anti-Malware & Overlay Decapitation Studio" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 340,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 341,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Python 3.x Win32 / Linux X11 / macOS Quartz" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 342,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 338,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 text-[11px] text-slate-500 flex-wrap justify-center sm:justify-end gap-y-1", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-400 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 347,
            columnNumber: 17
          }, this),
          "Czujnik Gnid: Auto-Freeze (0 ms) Aktywny"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 346,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 350,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3" }, void 0, false, {
            fileName: "/app/applet/src/App.tsx",
            lineNumber: 352,
            columnNumber: 17
          }, this),
          "Bariery Ochronne Aktywne"
        ] }, void 0, true, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 351,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 355,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Autonaprawa Włączona" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 356,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 357,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Gemini Threat Hunter Ready" }, void 0, false, {
          fileName: "/app/applet/src/App.tsx",
          lineNumber: 358,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/App.tsx",
        lineNumber: 345,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 337,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/App.tsx",
      lineNumber: 336,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 64,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/App.tsx",
    lineNumber: 63,
    columnNumber: 5
  }, this);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgTmF2YmFyLCBUYWJUeXBlIH0gZnJvbSAnLi9jb21wb25lbnRzL05hdmJhcic7XG5pbXBvcnQgeyBFbWVyZ2VuY3lCYW5uZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvRW1lcmdlbmN5QmFubmVyJztcbmltcG9ydCB7IFNjcmlwdHNMaWJyYXJ5IH0gZnJvbSAnLi9jb21wb25lbnRzL1NjcmlwdHNMaWJyYXJ5JztcbmltcG9ydCB7IFNjcmlwdEdlbmVyYXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9TY3JpcHRHZW5lcmF0b3InO1xuaW1wb3J0IHsgSW50ZXJhY3RpdmVTaW11bGF0b3IgfSBmcm9tICcuL2NvbXBvbmVudHMvSW50ZXJhY3RpdmVTaW11bGF0b3InO1xuaW1wb3J0IHsgUHJvY2Vzc1dhdGNoZG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL1Byb2Nlc3NXYXRjaGRvZyc7XG5pbXBvcnQgeyBGb3JlbnNpY3NHdWlkZSB9IGZyb20gJy4vY29tcG9uZW50cy9Gb3JlbnNpY3NHdWlkZSc7XG5pbXBvcnQgeyBBSUFzc2lzdGFudCB9IGZyb20gJy4vY29tcG9uZW50cy9BSUFzc2lzdGFudCc7XG5pbXBvcnQgeyBQYW5pY0J1dHRvbiB9IGZyb20gJy4vY29tcG9uZW50cy9QYW5pY0J1dHRvbic7XG5pbXBvcnQgeyBHZW1pbmlIdW50ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvR2VtaW5pSHVudGVyJztcbmltcG9ydCB7IE5ldXRyYWxpemVkVGhyZWF0c0xlZGdlciB9IGZyb20gJy4vY29tcG9uZW50cy9OZXV0cmFsaXplZFRocmVhdHNMZWRnZXInO1xuaW1wb3J0IHsgU2VsZkhlYWxpbmdDZW50ZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvU2VsZkhlYWxpbmdDZW50ZXInO1xuaW1wb3J0IHsgTWlsaXRhcnlSYWRhclNjYW5uZXIgfSBmcm9tICcuL2NvbXBvbmVudHMvTWlsaXRhcnlSYWRhclNjYW5uZXInO1xuaW1wb3J0IHsgSGV4YWdvbmFsTGFzZXJCYXJyaWVyTWF0cml4IH0gZnJvbSAnLi9jb21wb25lbnRzL0hleGFnb25hbExhc2VyQmFycmllck1hdHJpeCc7XG5pbXBvcnQgeyBCcm93c2VyVmlld3BvcnRMYXNlclNoaWVsZCB9IGZyb20gJy4vY29tcG9uZW50cy9Ccm93c2VyVmlld3BvcnRMYXNlclNoaWVsZCc7XG5pbXBvcnQgeyBPZmZsaW5lRGVwbG95bWVudENlbnRlciB9IGZyb20gJy4vY29tcG9uZW50cy9PZmZsaW5lRGVwbG95bWVudENlbnRlcic7XG5pbXBvcnQgeyBCYXNlUmVkQWxlcnRPdmVybGF5IH0gZnJvbSAnLi9jb21wb25lbnRzL0Jhc2VSZWRBbGVydE92ZXJsYXknO1xuaW1wb3J0IHsgRHJvbmVJbnRlckFwcFBhdHJvbE92ZXJsYXkgfSBmcm9tICcuL2NvbXBvbmVudHMvRHJvbmVJbnRlckFwcFBhdHJvbE92ZXJsYXknO1xuaW1wb3J0IHsgS2l0dGVuRHJvbmVzT3ZlcmxheSB9IGZyb20gJy4vY29tcG9uZW50cy9LaXR0ZW5Ecm9uZXNPdmVybGF5JztcbmltcG9ydCB7IExvYWRpbmdQYWdlIH0gZnJvbSAnLi9jb21wb25lbnRzL0xvYWRpbmdQYWdlJztcbmltcG9ydCB7IE1vYmlsZVRhY3RpY2FsRGVzYW50QXJlYSB9IGZyb20gJy4vY29tcG9uZW50cy9Nb2JpbGVUYWN0aWNhbERlc2FudEFyZWEnO1xuaW1wb3J0IHsgUGFuaWNDZW50ZXJWaWV3IH0gZnJvbSAnLi9jb21wb25lbnRzL1BhbmljQ2VudGVyVmlldyc7XG5pbXBvcnQgeyBGcmVlemVBbGxQbHVnaW5Nb2R1bGUgfSBmcm9tICcuL2NvbXBvbmVudHMvRnJlZXplQWxsUGx1Z2luTW9kdWxlJztcbmltcG9ydCB7IFBjaUhhcmR3YXJlVGVsZW1ldHJ5TW9uaXRvciB9IGZyb20gJy4vY29tcG9uZW50cy9QY2lIYXJkd2FyZVRlbGVtZXRyeU1vbml0b3InO1xuaW1wb3J0IHsgU3RyZXNzVGVzdEhhcm5lc3MgfSBmcm9tICcuL2NvbXBvbmVudHMvU3RyZXNzVGVzdEhhcm5lc3MnO1xuaW1wb3J0IHsgU3lzdGVtSW1tdW5pemF0aW9uUGFuZWwgfSBmcm9tICcuL2NvbXBvbmVudHMvU3lzdGVtSW1tdW5pemF0aW9uUGFuZWwnO1xuaW1wb3J0IHsgVGFjdGljYWxXYXJSb29tSG9sb1RhYmxlIH0gZnJvbSAnLi9jb21wb25lbnRzL1RhY3RpY2FsV2FyUm9vbUhvbG9UYWJsZSc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnknO1xuaW1wb3J0IHsgT1NUeXBlLCBOZXV0cmFsaXplZFRocmVhdCB9IGZyb20gJy4vdHlwZXMnO1xuaW1wb3J0IHsgSU5JVElBTF9ORVVUUkFMSVpFRF9USFJFQVRTIH0gZnJvbSAnLi9kYXRhL25ldXRyYWxpemVkVmlydXNlcyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4vdXRpbHMvc2VsZlJlcGFpclN5c3RlbSc7XG5pbXBvcnQgeyBUZXJtaW5hbCwgU2hpZWxkLCBDcHUsIEJvb2tPcGVuLCBTcGFya2xlcywgQWxlcnRUcmlhbmdsZSwgQWxlcnRPY3RhZ29uLCBDaGVja0NpcmNsZTIsIERvd25sb2FkLCBTaGllbGRBbGVydCwgQWN0aXZpdHksIFNrdWxsLCBDcm9zc2hhaXIsIFdyZW5jaCwgUmFkaW8sIFphcCwgU2hpZWxkQ2hlY2ssIFJvY2tldCwgSGFyZERyaXZlLCBCb3QsIE5hdmlnYXRpb24sIFNtYXJ0cGhvbmUsIERpc2MgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZG93bmxvYWRDb21wbGV0ZU9mZmxpbmVTdGFuZGFsb25lQnVuZGxlIH0gZnJvbSAnLi91dGlscy9vZmZsaW5lU3RhbmRhbG9uZUVudmlyb25tZW50JztcbmltcG9ydCB7IGduaWRhU2Vuc29yIH0gZnJvbSAnLi91dGlscy9nbmlkYUF1dG9GcmVlemVTZW5zb3InO1xuaW1wb3J0IHsgaGV4TGFzZXJCYXJyaWVyU3lzdGVtIH0gZnJvbSAnLi91dGlscy9oZXhhZ29uYWxMYXNlckJhcnJpZXJTeXN0ZW0nO1xuaW1wb3J0IHsgc2xpcHBlcnlFbmdpbmUgfSBmcm9tICcuL3V0aWxzL3NsaXBwZXJ5QnV0dG9uc0VuZ2luZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCgpIHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPFRhYlR5cGU+KCdsb2FkaW5nJyk7XG4gIGNvbnN0IFtzZWxlY3RlZE9TLCBzZXRTZWxlY3RlZE9TXSA9IHVzZVN0YXRlPE9TVHlwZT4oJ3dpbmRvd3MnKTtcbiAgY29uc3QgW3RoZW1lLCBzZXRUaGVtZV0gPSB1c2VTdGF0ZTwnY3liZXInIHwgJ3N0ZWFsdGgnIHwgJ3RhY3RpY2FsJz4oJ2N5YmVyJyk7XG5cbiAgY29uc3QgW3RocmVhdHNdID0gdXNlU3RhdGU8TmV1dHJhbGl6ZWRUaHJlYXRbXT4oKCkgPT4ge1xuICAgIGNvbnN0IGN1c3RvbSA9IHNhZmVTdG9yYWdlLmdldDxOZXV0cmFsaXplZFRocmVhdFtdPignc2VudGluZWxfY3VzdG9tX3RocmVhdHMnLCBbXSk7XG4gICAgcmV0dXJuIFsuLi5JTklUSUFMX05FVVRSQUxJWkVEX1RIUkVBVFMsIC4uLmN1c3RvbV07XG4gIH0pO1xuXG4gIC8vIEluaXRpYWxpemUgc2xpcHBlcnkgbGV2aXRhdGluZyBidXR0b25zIHBoeXNpY3NcbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBzbGlwcGVyeUVuZ2luZS5pbml0aWFsaXplKCk7XG4gIH0sIFtdKTtcblxuICBjb25zdCBpc01pbmltYWwgPSBhY3RpdmVUYWIgPT09ICdsb2FkaW5nJztcblxuICBjb25zdCB0aGVtZUNsYXNzZXMgPSB7XG4gICAgY3liZXI6ICdiZy1bIzA3MDkwZV0gdGV4dC1zbGF0ZS0xMDAgc2VsZWN0aW9uOmJnLWFtYmVyLTUwMC8zMCBzZWxlY3Rpb246dGV4dC1hbWJlci0yMDAnLFxuICAgIHN0ZWFsdGg6ICdiZy1bIzA1MDcwYV0gdGV4dC1zbGF0ZS0yMDAgc2VsZWN0aW9uOmJnLWN5YW4tNTAwLzMwIHNlbGVjdGlvbjp0ZXh0LWN5YW4tMjAwJyxcbiAgICB0YWN0aWNhbDogJ2JnLVsjMGEwZDE0XSB0ZXh0LXNsYXRlLTEwMCBzZWxlY3Rpb246Ymctcm9zZS01MDAvMzAgc2VsZWN0aW9uOnRleHQtcm9zZS0yMDAnLFxuICB9W3RoZW1lXTtcblxuICByZXR1cm4gKFxuICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJSb290IEFwcGxpY2F0aW9uIENvbnRhaW5lclwiPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2BtaW4taC1zY3JlZW4gJHt0aGVtZUNsYXNzZXN9IGZsZXggZmxleC1jb2wgZm9udC1zYW5zIHRyYW5zaXRpb24tY29sb3JzIGR1cmF0aW9uLTMwMCByZWxhdGl2ZWB9PlxuICAgICAgICB7LyogQmFzZS1XaWRlIFJlZCBBbGVydCBFbWVyZ2VuY3kgTGlnaHRpbmcsIEtsYXhvbiBTaXJlbiAmIEhpZ2gtUHJpb3JpdHkgQmFubmVyICovfVxuICAgICAgICA8QmFzZVJlZEFsZXJ0T3ZlcmxheSBvbk5hdmlnYXRlVG9UYWI9eyh0KSA9PiBzZXRBY3RpdmVUYWIodCBhcyBUYWJUeXBlKX0gLz5cblxuICAgICAgICB7Lyog8J+buCAyMCBJbnRlci1BcHAgUGF0cm9sIERyb25lcyBTd2VlcGluZyBWaWV3cG9ydCAmIE5ldXRyYWxpemluZyBDb2RlIERlZmVjdHMgJiBHbmlkYXMgKi99XG4gICAgICAgIDxEcm9uZUludGVyQXBwUGF0cm9sT3ZlcmxheSBcbiAgICAgICAgICBpc01pbmltYWxMb2FkaW5nTW9kZT17aXNNaW5pbWFsfSBcbiAgICAgICAgICBvbk5hdmlnYXRlVG9UYWI9eyh0KSA9PiBzZXRBY3RpdmVUYWIodCBhcyBUYWJUeXBlKX0gXG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIPCfkLEgRHJvbnkg4oCeVXN1xYQgR25pZMSZ4oCdOiBTxYJvZGtpZSBOaWVwb3JhZG5lIEtvdGtpIHplIMWabWllcnRlbG55bSBXenJva2llbSAmIFBvbW5payBNYW15ICovfVxuICAgICAgICA8S2l0dGVuRHJvbmVzT3ZlcmxheSBcbiAgICAgICAgICBpc01pbmltYWxMb2FkaW5nTW9kZT17aXNNaW5pbWFsfSBcbiAgICAgICAgICBvbk5hdmlnYXRlVG9UYWI9eyh0KSA9PiBzZXRBY3RpdmVUYWIodCBhcyBUYWJUeXBlKX0gXG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEZ1bGwtQnJvd3NlciBWaWV3cG9ydCBMYXNlciBTaGllbGQgJiBNaXNzaWxlIERlZmVuc2UgQmFzZSBQZXJpbWV0ZXIgKi99XG4gICAgICAgIDxCcm93c2VyVmlld3BvcnRMYXNlclNoaWVsZCBcbiAgICAgICAgICBpc01pbmltYWxMb2FkaW5nTW9kZT17aXNNaW5pbWFsfSBcbiAgICAgICAgICBvbk5hdmlnYXRlVG9UYWI9eyh0KSA9PiBzZXRBY3RpdmVUYWIodCBhcyBUYWJUeXBlKX0gXG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIE5hdmJhciB3aXRoIGFsbCB0YWJzICovfVxuICAgICAgICA8TmF2YmFyXG4gICAgICAgICAgYWN0aXZlVGFiPXthY3RpdmVUYWJ9XG4gICAgICAgICAgc2V0QWN0aXZlVGFiPXtzZXRBY3RpdmVUYWJ9XG4gICAgICAgICAgc2VsZWN0ZWRPUz17c2VsZWN0ZWRPU31cbiAgICAgICAgICBzZXRTZWxlY3RlZE9TPXtzZXRTZWxlY3RlZE9TfVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICBzZXRUaGVtZT17c2V0VGhlbWV9XG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEVtZXJnZW5jeSBTdGlja3kvVG9wIEJhbm5lciBvbmx5IGluIGZ1bGwgZGFzaGJvYXJkIG1vZGUgKi99XG4gICAgICAgIHshaXNNaW5pbWFsICYmIDxFbWVyZ2VuY3lCYW5uZXIgLz59XG5cbiAgICAgICAgey8qIEhlcm8gSGVhZGVyIG9uIHRvcCB3aXRoIHN5c3RlbSBzdGF0ZSBzdW1tYXJ5ICovfVxuICAgICAgICB7IWlzTWluaW1hbCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy03eGwgbXgtYXV0byBweC00IHNtOnB4LTYgbGc6cHgtOCBwdC01IHBiLTIgdy1mdWxsXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCBwYi00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAvODBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBsZzp0ZXh0LTN4bCBmb250LWJsYWNrIHRyYWNraW5nLXRpZ2h0IHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+U2VudGluZWwgQW50aS1NYWx3YXJlICYgT3ZlcmxheSBEZWNhcGl0YXRpb24gU3R1ZGlvPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDE+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctNHhsXCI+XG4gICAgICAgICAgICAgICAgICBQYW5jZXJuZSDFm3JvZG93aXNrbyBkbyBkZXRla2NqaSwgcG9sb3dhbmlhIHogd3lrb3J6eXN0YW5pZW0gR2VtaW5pIEFJLCBuYXR5Y2htaWFzdG93ZWogYWt0eXdhY2ppIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTQwMFwiPmxhc2Vyb3dlaiBiYXJpZXJ5IGhla3NhZ29uYWxuZWogY2hyb25pxIVjZWogdW5pdCBhcGxpa2Fjamk8L3N0cm9uZz4sIHRyd2HFgmVnbyB1bmllcnVjaGFtaWFuaWEgdyBSQU0gKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LW1vbm9cIj5OdFN1c3BlbmRQcm9jZXNzPC9jb2RlPikgb3JheiBzYW1vbmFwcmF3eS5cbiAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2ltbXVuaXphdGlvbicpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgdGV4dC1lbWVyYWxkLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPdHfDs3J6IG1vZHXFgiBJbW11bml6YWNqaSBTeXN0ZW11IChXaW5kb3dzIEdQTyAvIEZpcmV3YWxsIC8gSUZFTyBSZWdpc3RyeSBUcmFwcylcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkltbXVuaXphY2phIEdQTy9JRkVPPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdwY2knKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAvNDAgdGV4dC1pbmRpZ28tMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIk90d8Ozcnogc3lzdGVteSBwYXJhbWV0csOzdyBmYWwgRU0sIHpub3N6ZW5pYSByZXpvbmFuc3UsIHd5a3JlcyB3cMWCeXd1IG5hIG3Ds8W8ZMW8ZWsgaSB3dHljemvEmSB3eW1pYXLDs3cgRGFzaGJvYXJkXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8QWN0aXZpdHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkZhbGUgRU0sIE3Ds8W8ZMW8ZWsgJiBXdHljemthIERhc2hib2FyZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignaG9sb3RhYmxlJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMS41IHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMzAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU3TDs8WCIEtvbmZlcmVuY3lqbnkgRG93w7NkenR3YSB6IFByemV6cm9jenlzdHltaSBFa3JhbmFtaSBIb2xvZ3JhbW93eW1pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8RGlzYyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlN0w7PFgiBIb2xvZ3JhbW93eSAoV2FyIFJvb20pPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdtb2JpbGUnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC05NTAgdmlhLXRlYWwtOTUwIHRvLXNsYXRlLTkwMCBob3Zlcjpmcm9tLWVtZXJhbGQtOTAwIGhvdmVyOnRvLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwLzcwIHRleHQtZW1lcmFsZC0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MC82MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIk90d8OzcnogbW9kdcWCIERlc2FudHUgRy5SLk8uTS4gKDIwLXNla3VuZG93YSBha2NqYSB6IHB1bHN1asSFY3ltIGN6ZXJ3b255bSDFm3dpYXTFgmVtIGkgcG9nb2RueW0gcm96amHFm25pZW5pZW0pXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8U21hcnRwaG9uZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPuKaoSBEZXNhbnQgRy5SLk8uTS4gKDIwcyk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2xvYWRpbmcnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWFtYmVyLTUwMC80MCB0ZXh0LWFtYmVyLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LW1lZGl1bSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQcnplamTFuiBkbyBkZWR5a293YW5lZ28gd2lkb2t1IFRhcmN6eSBMYXNlcm93ZWogJiBHb3Rvd2/Fm2NpIEJvam93ZWpcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+V2lkb2sgVGFyY3p5IExhc2Vyb3dlajwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigncGFuaWMnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzQwIHRleHQtcm9zZS0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiT3R3w7NyeiBwZcWCbsSFIHBvZHN0cm9uxJkgUGFuaWMgQnV0dG9uIChNdWx0aS1PUyBFbWVyZ2VuY3kgRnJlZXplKVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEFsZXJ0T2N0YWdvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBhbmljIEJ1dHRvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignaGVhbGluZycpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTEuNSByb3VuZGVkLXhsIGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRXNrYWRyYSAyMCBEcm9uw7N3IFBhdHJvbHVqxIVjeWNoICYgUm9ib3QgU3RyYcW8bmlrXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8TmF2aWdhdGlvbiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWluZGlnby00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+RHJvbnkgJiBTdHJhxbxuaWs8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ29mZmxpbmUnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQtY3lhbi0zMDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiU3Rhbm93aXNrbyBacnp1dHUgT2ZmbGluZSAoWmVyby1JbnN0YWxsIC8gWmVyby1Hb29nbGUpXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+WnJ6dXQgT2ZmbGluZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigncmFkYXInKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0xLjUgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxSYWRpbyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5SYWRhciAmIEkvTzwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cblxuICAgICAgICB7LyogTWFpbiBDb250ZW50IEFyZWEgd2l0aCBJc29sYXRlZCBFcnJvciBCb3VuZGFyaWVzIHBlciBNb2R1bGUgKi99XG4gICAgICAgIDxtYWluIGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIHB4LTQgc206cHgtNiBsZzpweC04IHB5LTYgZmxleC0xIHctZnVsbFwiPlxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdsb2FkaW5nJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiRGVkeWtvd2FueSBFa3JhbiBHb3Rvd2/Fm2NpIEJvam93ZWogJiBXaXp1YWxpemFjamEgVGFyY3p5IExhc2Vyb3dlalwiPlxuICAgICAgICAgICAgICA8TG9hZGluZ1BhZ2UgXG4gICAgICAgICAgICAgICAgb25FbnRlckZ1bGxTdHVkaW89eygpID0+IHNldEFjdGl2ZVRhYignYmFycmllcicpfVxuICAgICAgICAgICAgICAgIG9uTmF2aWdhdGVUb1RhYj17KHRhYikgPT4gc2V0QWN0aXZlVGFiKHRhYiBhcyBUYWJUeXBlKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2hvbG90YWJsZScgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlN0w7PFgiBLb25mZXJlbmN5am55IERvd8OzZHp0d2EgeiBQcnplenJvY3p5c3R5bWkgRWtyYW5hbWkgSG9sb2dyYW1vd3ltaVwiPlxuICAgICAgICAgICAgICA8VGFjdGljYWxXYXJSb29tSG9sb1RhYmxlIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdpbW11bml6YXRpb24nICYmIChcbiAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJNZWNoYW5pem0gSW1tdW5pemFjamkgU3lzdGVtdSAoV2luZG93cyBHUE8vRmlyZXdhbGwvUmVnaXN0cnkpXCI+XG4gICAgICAgICAgICAgIDxTeXN0ZW1JbW11bml6YXRpb25QYW5lbCB0aHJlYXRzPXt0aHJlYXRzfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc3RyZXNzdGVzdCcgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlBvbGlnb24gT2JjacSFxbxlbmlvd3kgKFN0cmVzcyBUZXN0KSAmIFdlcnlmaWthY2phIFBhbmljIEJ1dHRvblwiPlxuICAgICAgICAgICAgICA8U3RyZXNzVGVzdEhhcm5lc3MgXG4gICAgICAgICAgICAgICAgb25OYXZpZ2F0ZVRvVGFiPXsodGFiKSA9PiBzZXRBY3RpdmVUYWIodGFiIGFzIFRhYlR5cGUpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAncGNpJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiT2Rjenl0eSBPZGJpb3JuaWvDs3cgV3lqxZvEhyBaxYLEhWN6eSAmIExpc3R3eSBQQ0kgKFd5a3JlcyBMaW5pb3d5IHplIFdzcMOzxYJyesSZZG55bWkpXCI+XG4gICAgICAgICAgICAgIDxQY2lIYXJkd2FyZVRlbGVtZXRyeU1vbml0b3IgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2ZyZWV6ZWFsbCcgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIk1vZHXFgiBXdHljemtpIEZyZWV6ZS1BbGwgKE92ZXJsYXksIFdpbmRvdyBNYW5hZ2VyLCBCaXRzRG9qbylcIj5cbiAgICAgICAgICAgICAgPEZyZWV6ZUFsbFBsdWdpbk1vZHVsZSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiTW9iaWxuZSBBdXRvbWF0eWN6bmUgWmFqbW93YW5pZSBPYnN6YXJ1ICYgRGVzYW50IG5hIEVrcmFueVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICAgIDxNb2JpbGVUYWN0aWNhbERlc2FudEFyZWEgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdwYW5pYycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlBlxYJuYSBQb2RzdHJvbmEgRG93b2R6ZW5pYSBQYW5pYyBCdXR0b24gKE11bHRpLU9TIEZyZWV6ZSlcIj5cbiAgICAgICAgICAgICAgPFBhbmljQ2VudGVyVmlldyBcbiAgICAgICAgICAgICAgICBvbk5hdmlnYXRlVG9UYWI9eyh0YWIpID0+IHNldEFjdGl2ZVRhYih0YWIgYXMgVGFiVHlwZSl9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdiYXJyaWVyJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiTGFzZXJvd2EgQmFyaWVyYSBIZWtzYWdvbmFsbmEgJiBPY2hyb25hIFVuaXR1IEFwbGlrYWNqaVwiPlxuICAgICAgICAgICAgICA8SGV4YWdvbmFsTGFzZXJCYXJyaWVyTWF0cml4IC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdvZmZsaW5lJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiU3Rhbm93aXNrbyBacnp1dHUgT2ZmbGluZSAmIMWacm9kb3dpc2tvIEF1dG9ub21pY3puZVwiPlxuICAgICAgICAgICAgICA8T2ZmbGluZURlcGxveW1lbnRDZW50ZXIgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ3JhZGFyJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiUmFkYXIgV29qc2tvd3kgJiBTa2FuZXIgTW9ub2xpdHljem5laiBQb3dpZXJ6Y2huaSBTeXN0ZW11XCI+XG4gICAgICAgICAgICAgIDxNaWxpdGFyeVJhZGFyU2Nhbm5lciAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc2NyaXB0cycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlNrcnlwdHkgUHl0aG9uICYgV2luMzIgQ3R5cGVzXCI+XG4gICAgICAgICAgICAgIDxTY3JpcHRzTGlicmFyeSBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnaHVudGVyJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwixYFvd2NhIEdlbWluaSBBSSAmIFNsYXVnaHRlciBFbmdpbmVcIj5cbiAgICAgICAgICAgICAgPEdlbWluaUh1bnRlciBzZWxlY3RlZE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAndGhyZWF0cycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIkthcnRvdGVrYSBabmlzemN6b255Y2ggV2lydXPDs3cgJiBNZWNoYW5pem3Ds3cgQWdyZXNqaVwiPlxuICAgICAgICAgICAgICA8TmV1dHJhbGl6ZWRUaHJlYXRzTGVkZ2VyIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdoZWFsaW5nJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiQ2VudHJ1bSBBdXRvbmFwcmF3eSAmIFBhbmNlcm5lIEJhcmllcnkgT2Nocm9ubmVcIj5cbiAgICAgICAgICAgICAgPFNlbGZIZWFsaW5nQ2VudGVyIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdnZW5lcmF0b3InICYmIChcbiAgICAgICAgICAgIDxFcnJvckJvdW5kYXJ5IG1vZHVsZU5hbWU9XCJHZW5lcmF0b3IgU2tyeXB0w7N3IEVrc3Rlcm1pbmFjamkgLnB5XCI+XG4gICAgICAgICAgICAgIDxTY3JpcHRHZW5lcmF0b3IgaW5pdGlhbE9TPXtzZWxlY3RlZE9TfSAvPlxuICAgICAgICAgICAgPC9FcnJvckJvdW5kYXJ5PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnc2ltdWxhdG9yJyAmJiAoXG4gICAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBtb2R1bGVOYW1lPVwiSW50ZXJha3R5d255IFN5bXVsYXRvciBQcm9jZXPDs3cgaSBOYWvFgmFkZWtcIj5cbiAgICAgICAgICAgICAgPEludGVyYWN0aXZlU2ltdWxhdG9yIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICd3YXRjaGRvZycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIlRlbGVtZXRyaWEgJiBXYXRjaGRvZyBaYXNvYsOzdyBDUFUvUkFNXCI+XG4gICAgICAgICAgICAgIDxQcm9jZXNzV2F0Y2hkb2cgLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2ZvcmVuc2ljcycgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIkJhemEgV2llZHp5IEtyeW1pbmFsaXN0eWN6bmVqIFdpbjMyL1gxMS9RdWFydHpcIj5cbiAgICAgICAgICAgICAgPEZvcmVuc2ljc0d1aWRlIC8+XG4gICAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdhaScgJiYgKFxuICAgICAgICAgICAgPEVycm9yQm91bmRhcnkgbW9kdWxlTmFtZT1cIkFzeXN0ZW50IEFJIEdlbWluaVwiPlxuICAgICAgICAgICAgICA8QUlBc3Npc3RhbnQgc2VsZWN0ZWRPUz17c2VsZWN0ZWRPU30gLz5cbiAgICAgICAgICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgICAgICAgICApfVxuICAgICAgICA8L21haW4+XG5cbiAgICAgICAgey8qIEZsb2F0aW5nIFBhbmljIEJ1dHRvbiBDb21wb25lbnQgKEZpeGVkIGJvdHRvbSByaWdodCAtIGhpZGRlbiBpbiBtaW5pbWFsIGxvYWRpbmcgbW9kZSkgKi99XG4gICAgICAgIDxQYW5pY0J1dHRvbiBcbiAgICAgICAgICBpc01pbmltYWxMb2FkaW5nTW9kZT17aXNNaW5pbWFsfSBcbiAgICAgICAgICBvbk5hdmlnYXRlVG9UYWI9eyh0KSA9PiBzZXRBY3RpdmVUYWIodCBhcyBUYWJUeXBlKX0gXG4gICAgICAgIC8+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCBweS02IHB4LTQgdGV4dC14cyB0ZXh0LXNsYXRlLTUwMCBtdC0xMlwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctN3hsIG14LWF1dG8gZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHRleHQtY2VudGVyIHNtOnRleHQtbGVmdFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTUwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS00MDBcIj5TZW50aW5lbCBBbnRpLU1hbHdhcmUgJiBPdmVybGF5IERlY2FwaXRhdGlvbiBTdHVkaW88L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+UHl0aG9uIDMueCBXaW4zMiAvIExpbnV4IFgxMSAvIG1hY09TIFF1YXJ0ejwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMyB0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTUwMCBmbGV4LXdyYXAganVzdGlmeS1jZW50ZXIgc206anVzdGlmeS1lbmQgZ2FwLXktMVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICBDenVqbmlrIEduaWQ6IEF1dG8tRnJlZXplICgwIG1zKSBBa3R5d255XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICBCYXJpZXJ5IE9jaHJvbm5lIEFrdHl3bmVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPkF1dG9uYXByYXdhIFfFgsSFY3pvbmE8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+R2VtaW5pIFRocmVhdCBIdW50ZXIgUmVhZHk8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb290ZXI+XG4gICAgICA8L2Rpdj5cbiAgICA8L0Vycm9yQm91bmRhcnk+XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiJBQWlFUTtBQWpFUixPQUFPLFNBQVMsZ0JBQWdCO0FBQ2hDLFNBQVMsY0FBdUI7QUFDaEMsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUyxzQkFBc0I7QUFD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