import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { AlertOctagon, Copy, Check, Terminal, ChevronDown, ChevronUp, Zap, ShieldCheck, HardDrive } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadCompleteOfflineStandaloneBundle } from "/sentinel-shield/src/utils/offlineStandaloneEnvironment.ts";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { gnidaSensor, generateAutonomousPythonDaemonScript } from "/sentinel-shield/src/utils/gnidaAutoFreezeSensor.ts";
import { hexLaserBarrierSystem } from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
import { AcousticAlertMonitor } from "/sentinel-shield/src/components/AcousticAlertMonitor.tsx";
export const EmergencyBanner = () => {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [sensorStatus, setSensorStatus] = useState(() => gnidaSensor.getStatus());
  const [hexActivated, setHexActivated] = useState(false);
  const [empActive, setEmpActive] = useState(false);
  useEffect(() => {
    const unsub = gnidaSensor.subscribe((status) => {
      setSensorStatus(status);
    });
    return unsub;
  }, []);
  const handleCopy = (cmd, id) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2e3);
  };
  const handleDownloadDaemon = () => {
    downloadFile("0_gnida_auto_freeze_daemon.py", generateAutonomousPythonDaemonScript(), "text/x-python");
  };
  const handleTriggerHexBarrier = () => {
    hexLaserBarrierSystem.activateInstantly();
    setHexActivated(true);
    setTimeout(() => setHexActivated(false), 2500);
  };
  const handleTriggerEmpWave = () => {
    hexLaserBarrierSystem.triggerElectromagneticWavePenetration("Cała Sieć i Urządzenie");
    setEmpActive(true);
    setTimeout(() => setEmpActive(false), 2500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-zinc-950/95 border-y border-white/10 py-2.5 px-4 shadow-xl backdrop-blur-xl", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-zinc-900 text-amber-400 rounded-xl border border-amber-500/20 flex-shrink-0", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-4 h-4" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 50,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 49,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-slate-100 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Program blokuje pulpit lub wyskakujące okna? Szybkie odblokowanie:" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 54,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline-block px-2 py-0.5 text-[10px] bg-zinc-900 border border-amber-500/30 text-amber-300 rounded font-mono font-medium", children: "Ctrl + Win + D" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 55,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 53,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-xs", children: [
            "Użyj ",
            /* @__PURE__ */ jsxDEV("kbd", { className: "px-1.5 py-0.5 bg-zinc-900 text-amber-300 rounded font-mono border border-white/10", children: "Ctrl + Win + D" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 60,
              columnNumber: 20
            }, this),
            " (Nowy Czysty Pulpit), aktywuj barierę lub zrzuć autonomiczny pakiet offline."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 59,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 52,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV(AcousticAlertMonitor, { compact: true }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 67,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleTriggerEmpWave,
            className: `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono font-medium text-xs shadow-md transition-all cursor-pointer ${empActive ? "bg-cyan-950 text-cyan-200 border border-cyan-400" : "bg-zinc-900 hover:bg-zinc-800 text-cyan-300 border border-cyan-500/30"}`,
            title: "Uruchamia falę elektromagnetyczną penetrującą magistrale",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 79,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: empActive ? "⚡ FALA EM NADAWANA" : "⚡ Fala EM" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 80,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 70,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleTriggerHexBarrier,
            className: `flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-mono font-medium text-xs shadow-md transition-all cursor-pointer ${hexActivated ? "bg-amber-950 text-amber-200 border border-amber-400" : "bg-zinc-900 hover:bg-zinc-800 text-amber-300 border border-amber-500/30"}`,
            title: "Natychmiastowo aktywuje laserową barierę heksagonalną (0 ms)",
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 93,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: hexActivated ? "🛡️ BARIERA AKTYWNA" : "🛡️ Bariera" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 94,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 84,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadCompleteOfflineStandaloneBundle,
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white rounded-xl border border-white/10 text-xs font-mono font-medium shadow-md transition-all cursor-pointer",
            title: "Pobierz kompletny pakiet samootwierający się .bat, .py i .html (100% offline, zero-install)",
            children: [
              /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 103,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zrzut Offline" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 104,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 98,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadDaemon,
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs font-medium font-mono transition-all cursor-pointer",
            title: "Pobierz autonomiczny daemon czujnika gnid w tle (gnida_auto_freeze_daemon.py)",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 112,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Daemon .py" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 113,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 107,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => handleCopy("taskkill /F /IM flutter_runner.exe /T", "cmd1"),
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-slate-300 hover:text-white rounded-xl border border-white/10 text-xs font-mono transition-all cursor-pointer",
            title: "Kopiuj polecenie taskkill dla Windows",
            children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 121,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "taskkill" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 122,
                columnNumber: 13
              }, this),
              copiedCmd === "cmd1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 124,
                columnNumber: 15
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 126,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 116,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setExpanded(!expanded),
            className: "flex items-center space-x-1 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-slate-300 rounded-xl border border-white/10 text-xs transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: expanded ? "Zwiń" : "Skróty" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 134,
                columnNumber: 13
              }, this),
              expanded ? /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 135,
                columnNumber: 25
              }, this) : /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 135,
                columnNumber: 65
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 130,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 65,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmergencyBanner.tsx",
      lineNumber: 47,
      columnNumber: 7
    }, this),
    expanded && /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-red-900/40 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-emerald-400 block mb-1", children: "0. Autonomiczny Daemon w Tle" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 145,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Automatyczny czujnik Gnid w Pythonie. Działa jako demon bez UI i natychmiast zamraża procesy w RAM." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 146,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-mono truncate text-[10px]", children: "python 0_gnida_auto_freeze_daemon.py" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 150,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("python 0_gnida_auto_freeze_daemon.py", "cmd0"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "cmd0" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 157,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 157,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 153,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 144,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-red-400 block mb-1", children: "1. Nowy Pulpit Wirtualny" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Przenosi Cię na wolną przestrzeń roboczą, na której nakładka nie istnieje." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 164,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("code", { className: "block bg-slate-900 px-2 py-1 rounded text-red-300 font-mono", children: "Ctrl + Win + D" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 162,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-400 block mb-1", children: "2. Trwałe Unieruchomienie" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 173,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Zamraża wątki w pamięci RAM i odbiera prawa plikowi .exe na dysku." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 174,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 font-mono truncate text-[10px]", children: "icacls *flutter* /deny Everyone:(X,W)" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 178,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("icacls *flutter* /deny Everyone:(X,W)", "cmd2"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "cmd2" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 185,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 185,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 181,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 177,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 172,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-cyan-400 block mb-1", children: "3. PowerShell Force Kill" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 191,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Ubija procesy z załadowanym silnikiem Flutter DLL." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 192,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-mono truncate text-[10px]", children: "Stop-Process -Name *flutter* -Force" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 196,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("Stop-Process -Name *flutter* -Force", "ps1"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "ps1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 203,
                columnNumber: 40
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 203,
                columnNumber: 89
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 199,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 195,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 190,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmergencyBanner.tsx",
      lineNumber: 143,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/EmergencyBanner.tsx",
    lineNumber: 46,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVtZXJnZW5jeUJhbm5lci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBbGVydE9jdGFnb24sIENvcHksIENoZWNrLCBUZXJtaW5hbCwgRG93bmxvYWQsIFNoaWVsZEFsZXJ0LCBDaGV2cm9uRG93biwgQ2hldnJvblVwLCBMb2NrLCBaYXAsIFNoaWVsZENoZWNrLCBIYXJkRHJpdmUgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgZG93bmxvYWRDb21wbGV0ZU9mZmxpbmVTdGFuZGFsb25lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVN0YW5kYWxvbmVFbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBkb3dubG9hZEZpbGUgfSBmcm9tICcuLi91dGlscy9vZmZsaW5lUGFja2FnZUV4cG9ydGVyJztcbmltcG9ydCB7IGduaWRhU2Vuc29yLCBnZW5lcmF0ZUF1dG9ub21vdXNQeXRob25EYWVtb25TY3JpcHQsIFNlbnNvckF1dG9tYXRvblN0YXR1cyB9IGZyb20gJy4uL3V0aWxzL2duaWRhQXV0b0ZyZWV6ZVNlbnNvcic7XG5pbXBvcnQgeyBoZXhMYXNlckJhcnJpZXJTeXN0ZW0gfSBmcm9tICcuLi91dGlscy9oZXhhZ29uYWxMYXNlckJhcnJpZXJTeXN0ZW0nO1xuaW1wb3J0IHsgQWNvdXN0aWNBbGVydE1vbml0b3IgfSBmcm9tICcuL0Fjb3VzdGljQWxlcnRNb25pdG9yJztcblxuZXhwb3J0IGNvbnN0IEVtZXJnZW5jeUJhbm5lcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtjb3BpZWRDbWQsIHNldENvcGllZENtZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2V4cGFuZGVkLCBzZXRFeHBhbmRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZW5zb3JTdGF0dXMsIHNldFNlbnNvclN0YXR1c10gPSB1c2VTdGF0ZTxTZW5zb3JBdXRvbWF0b25TdGF0dXM+KCgpID0+IGduaWRhU2Vuc29yLmdldFN0YXR1cygpKTtcbiAgY29uc3QgW2hleEFjdGl2YXRlZCwgc2V0SGV4QWN0aXZhdGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2VtcEFjdGl2ZSwgc2V0RW1wQWN0aXZlXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gZ25pZGFTZW5zb3Iuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XG4gICAgICBzZXRTZW5zb3JTdGF0dXMoc3RhdHVzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5zdWI7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDb3B5ID0gKGNtZDogc3RyaW5nLCBpZDogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY21kKTtcbiAgICBzZXRDb3BpZWRDbWQoaWQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkQ21kKG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZERhZW1vbiA9ICgpID0+IHtcbiAgICBkb3dubG9hZEZpbGUoJzBfZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5JywgZ2VuZXJhdGVBdXRvbm9tb3VzUHl0aG9uRGFlbW9uU2NyaXB0KCksICd0ZXh0L3gtcHl0aG9uJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVHJpZ2dlckhleEJhcnJpZXIgPSAoKSA9PiB7XG4gICAgaGV4TGFzZXJCYXJyaWVyU3lzdGVtLmFjdGl2YXRlSW5zdGFudGx5KCk7XG4gICAgc2V0SGV4QWN0aXZhdGVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SGV4QWN0aXZhdGVkKGZhbHNlKSwgMjUwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVHJpZ2dlckVtcFdhdmUgPSAoKSA9PiB7XG4gICAgaGV4TGFzZXJCYXJyaWVyU3lzdGVtLnRyaWdnZXJFbGVjdHJvbWFnbmV0aWNXYXZlUGVuZXRyYXRpb24oJ0NhxYJhIFNpZcSHIGkgVXJ6xIVkemVuaWUnKTtcbiAgICBzZXRFbXBBY3RpdmUodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRFbXBBY3RpdmUoZmFsc2UpLCAyNTAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctemluYy05NTAvOTUgYm9yZGVyLXkgYm9yZGVyLXdoaXRlLzEwIHB5LTIuNSBweC00IHNoYWRvdy14bCBiYWNrZHJvcC1ibHVyLXhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBiZy16aW5jLTkwMCB0ZXh0LWFtYmVyLTQwMCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzIwIGZsZXgtc2hyaW5rLTBcIj5cbiAgICAgICAgICAgIDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXNsYXRlLTEwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3Bhbj5Qcm9ncmFtIGJsb2t1amUgcHVscGl0IGx1YiB3eXNrYWt1asSFY2Ugb2tuYT8gU3p5YmtpZSBvZGJsb2tvd2FuaWU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWJsb2NrIHB4LTIgcHktMC41IHRleHQtWzEwcHhdIGJnLXppbmMtOTAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwIHRleHQtYW1iZXItMzAwIHJvdW5kZWQgZm9udC1tb25vIGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgICAgQ3RybCArIFdpbiArIERcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIFXFvHlqIDxrYmQgY2xhc3NOYW1lPVwicHgtMS41IHB5LTAuNSBiZy16aW5jLTkwMCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXdoaXRlLzEwXCI+Q3RybCArIFdpbiArIEQ8L2tiZD4gKE5vd3kgQ3p5c3R5IFB1bHBpdCksIGFrdHl3dWogYmFyaWVyxJkgbHViIHpyenXEhyBhdXRvbm9taWN6bnkgcGFraWV0IG9mZmxpbmUuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBtZDp3LWF1dG8ganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICB7LyogQUNPVVNUSUMgQUxFUlQgU1lTVEVNIChTVUItQkFTUyBIQVBUSUMgRkVFREJBQ0spICovfVxuICAgICAgICAgIDxBY291c3RpY0FsZXJ0TW9uaXRvciBjb21wYWN0PXt0cnVlfSAvPlxuXG4gICAgICAgICAgey8qIFBSWllDSVNLIEZBTEkgRUxFS1RST01BR05FVFlDWk5FSiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVUcmlnZ2VyRW1wV2F2ZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41IHB4LTMgcHktMS41IHJvdW5kZWQteGwgZm9udC1tb25vIGZvbnQtbWVkaXVtIHRleHQteHMgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGVtcEFjdGl2ZVxuICAgICAgICAgICAgICAgID8gJ2JnLWN5YW4tOTUwIHRleHQtY3lhbi0yMDAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCdcbiAgICAgICAgICAgICAgICA6ICdiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvMzAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICAgIHRpdGxlPVwiVXJ1Y2hhbWlhIGZhbMSZIGVsZWt0cm9tYWduZXR5Y3puxIUgcGVuZXRydWrEhWPEhSBtYWdpc3RyYWxlXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+e2VtcEFjdGl2ZSA/ICfimqEgRkFMQSBFTSBOQURBV0FOQScgOiAn4pqhIEZhbGEgRU0nfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIHsvKiBQUlpZQ0lTSyBOQVRZQ0hNSUFTVE9XRUogQkFSSUVSWSBIRUtTQUdPTkFMTkVKICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVRyaWdnZXJIZXhCYXJyaWVyfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgcHgtMyBweS0xLjUgcm91bmRlZC14bCBmb250LW1vbm8gZm9udC1tZWRpdW0gdGV4dC14cyBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgaGV4QWN0aXZhdGVkXG4gICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwIHRleHQtYW1iZXItMjAwIGJvcmRlciBib3JkZXItYW1iZXItNDAwJ1xuICAgICAgICAgICAgICAgIDogJ2JnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItNTAwLzMwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICB0aXRsZT1cIk5hdHljaG1pYXN0b3dvIGFrdHl3dWplIGxhc2Vyb3fEhSBiYXJpZXLEmSBoZWtzYWdvbmFsbsSFICgwIG1zKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntoZXhBY3RpdmF0ZWQgPyAn8J+boe+4jyBCQVJJRVJBIEFLVFlXTkEnIDogJ/Cfm6HvuI8gQmFyaWVyYSd9PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIFBPQklFUlogUEFLSUVUIFJBVFVOS09XWSBPRkZMSU5FICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkQ29tcGxldGVPZmZsaW5lU3RhbmRhbG9uZUJ1bmRsZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41IHB4LTMgcHktMS41IGJnLXppbmMtOTAwIGhvdmVyOmJnLXppbmMtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOnRleHQtd2hpdGUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQteHMgZm9udC1tb25vIGZvbnQtbWVkaXVtIHNoYWRvdy1tZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlBvYmllcnoga29tcGxldG55IHBha2lldCBzYW1vb3R3aWVyYWrEhWN5IHNpxJkgLmJhdCwgLnB5IGkgLmh0bWwgKDEwMCUgb2ZmbGluZSwgemVyby1pbnN0YWxsKVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5acnp1dCBPZmZsaW5lPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWREYWVtb259XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEuNSBweC0zIHB5LTEuNSBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LWVtZXJhbGQtMzAwIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC8zMCB0ZXh0LXhzIGZvbnQtbWVkaXVtIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogYXV0b25vbWljem55IGRhZW1vbiBjenVqbmlrYSBnbmlkIHcgdGxlIChnbmlkYV9hdXRvX2ZyZWV6ZV9kYWVtb24ucHkpXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RGFlbW9uIC5weTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoJ3Rhc2traWxsIC9GIC9JTSBmbHV0dGVyX3J1bm5lci5leGUgL1QnLCAnY21kMScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgcHgtMyBweS0xLjUgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItd2hpdGUvMTAgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogcG9sZWNlbmllIHRhc2traWxsIGRsYSBXaW5kb3dzXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yb3NlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj50YXNra2lsbDwvc3Bhbj5cbiAgICAgICAgICAgIHtjb3BpZWRDbWQgPT09ICdjbWQxJyA/IChcbiAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtc2xhdGUtNDAwXCIgLz5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFeHBhbmRlZCghZXhwYW5kZWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIHB4LTIuNSBweS0xLjUgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXdoaXRlLzEwIHRleHQteHMgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntleHBhbmRlZCA/ICdad2nFhCcgOiAnU2tyw7N0eSd9PC9zcGFuPlxuICAgICAgICAgICAge2V4cGFuZGVkID8gPENoZXZyb25VcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+IDogPENoZXZyb25Eb3duIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cblxuICAgICAgey8qIEV4cGFuZGVkIFF1aWNrIENoZWF0IFNoZWV0ICovfVxuICAgICAge2V4cGFuZGVkICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXJlZC05MDAvNDAgbWF4LXctN3hsIG14LWF1dG8gZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBsZzpncmlkLWNvbHMtNCBnYXAtMyB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWVtZXJhbGQtNDAwIGJsb2NrIG1iLTFcIj4wLiBBdXRvbm9taWN6bnkgRGFlbW9uIHcgVGxlPC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gbWItMlwiPlxuICAgICAgICAgICAgICBBdXRvbWF0eWN6bnkgY3p1am5payBHbmlkIHcgUHl0aG9uaWUuIER6aWHFgmEgamFrbyBkZW1vbiBiZXogVUkgaSBuYXR5Y2htaWFzdCB6YW1yYcW8YSBwcm9jZXN5IHcgUkFNLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctc2xhdGUtOTAwIHB4LTIgcHktMSByb3VuZGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDAgZm9udC1tb25vIHRydW5jYXRlIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgcHl0aG9uIDBfZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoJ3B5dGhvbiAwX2duaWRhX2F1dG9fZnJlZXplX2RhZW1vbi5weScsICdjbWQwJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWwtMSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWRDbWQgPT09ICdjbWQwJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPn1cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgYmctc2xhdGUtOTUwLzYwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC1yZWQtNDAwIGJsb2NrIG1iLTFcIj4xLiBOb3d5IFB1bHBpdCBXaXJ0dWFsbnk8L3NwYW4+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBtYi0yXCI+XG4gICAgICAgICAgICAgIFByemVub3NpIENpxJkgbmEgd29sbsSFIHByemVzdHJ6ZcWEIHJvYm9jesSFLCBuYSBrdMOzcmVqIG5ha8WCYWRrYSBuaWUgaXN0bmllamUuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJibG9jayBiZy1zbGF0ZS05MDAgcHgtMiBweS0xIHJvdW5kZWQgdGV4dC1yZWQtMzAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICBDdHJsICsgV2luICsgRFxuICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXB1cnBsZS00MDAgYmxvY2sgbWItMVwiPjIuIFRyd2HFgmUgVW5pZXJ1Y2hvbWllbmllPC9zcGFuPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gbWItMlwiPlxuICAgICAgICAgICAgICBaYW1yYcW8YSB3xIV0a2kgdyBwYW1pxJljaSBSQU0gaSBvZGJpZXJhIHByYXdhIHBsaWtvd2kgLmV4ZSBuYSBkeXNrdS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJnLXNsYXRlLTkwMCBweC0yIHB5LTEgcm91bmRlZFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vIHRydW5jYXRlIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgaWNhY2xzICpmbHV0dGVyKiAvZGVueSBFdmVyeW9uZTooWCxXKVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCdpY2FjbHMgKmZsdXR0ZXIqIC9kZW55IEV2ZXJ5b25lOihYLFcpJywgJ2NtZDInKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtbC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZENtZCA9PT0gJ2NtZDInID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LWN5YW4tNDAwIGJsb2NrIG1iLTFcIj4zLiBQb3dlclNoZWxsIEZvcmNlIEtpbGw8L3NwYW4+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBtYi0yXCI+XG4gICAgICAgICAgICAgIFViaWphIHByb2Nlc3kgeiB6YcWCYWRvd2FueW0gc2lsbmlraWVtIEZsdXR0ZXIgRExMLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctc2xhdGUtOTAwIHB4LTIgcHktMSByb3VuZGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1tb25vIHRydW5jYXRlIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgU3RvcC1Qcm9jZXNzIC1OYW1lICpmbHV0dGVyKiAtRm9yY2VcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weSgnU3RvcC1Qcm9jZXNzIC1OYW1lICpmbHV0dGVyKiAtRm9yY2UnLCAncHMxJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibWwtMSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWRDbWQgPT09ICdwczEnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFpRFk7QUFqRFosU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0MsU0FBUyxjQUFjLE1BQU0sT0FBTyxVQUFpQyxhQUFhLFdBQWlCLEtBQUssYUFBYSxpQkFBaUI7QUFDdEksU0FBUywrQ0FBK0M7QUFDeEQsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUyxhQUFhLDRDQUFtRTtBQUN6RixTQUFTLDZCQUE2QjtBQUN0QyxTQUFTLDRCQUE0QjtBQUU5QixhQUFNLGtCQUE0QixNQUFNO0FBQzdDLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUF3QixJQUFJO0FBQzlELFFBQU0sQ0FBQyxVQUFVLFdBQVcsSUFBSSxTQUFTLEtBQUs7QUFDOUMsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQWdDLE1BQU0sWUFBWSxVQUFVLENBQUM7QUFDckcsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQVMsS0FBSztBQUN0RCxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBUyxLQUFLO0FBRWhELFlBQVUsTUFBTTtBQUNkLFVBQU0sUUFBUSxZQUFZLFVBQVUsWUFBVTtBQUM1QyxzQkFBZ0IsTUFBTTtBQUFBLElBQ3hCLENBQUM7QUFDRCxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsQ0FBQztBQUVMLFFBQU0sYUFBYSxDQUFDLEtBQWEsT0FBZTtBQUM5QyxjQUFVLFVBQVUsVUFBVSxHQUFHO0FBQ2pDLGlCQUFhLEVBQUU7QUFDZixlQUFXLE1BQU0sYUFBYSxJQUFJLEdBQUcsR0FBSTtBQUFBLEVBQzNDO0FBRUEsUUFBTSx1QkFBdUIsTUFBTTtBQUNqQyxpQkFBYSxpQ0FBaUMscUNBQXFDLEdBQUcsZUFBZTtBQUFBLEVBQ3ZHO0FBRUEsUUFBTSwwQkFBMEIsTUFBTTtBQUNwQywwQkFBc0Isa0JBQWtCO0FBQ3hDLG9CQUFnQixJQUFJO0FBQ3BCLGVBQVcsTUFBTSxnQkFBZ0IsS0FBSyxHQUFHLElBQUk7QUFBQSxFQUMvQztBQUVBLFFBQU0sdUJBQXVCLE1BQU07QUFDakMsMEJBQXNCLHNDQUFzQyx3QkFBd0I7QUFDcEYsaUJBQWEsSUFBSTtBQUNqQixlQUFXLE1BQU0sYUFBYSxLQUFLLEdBQUcsSUFBSTtBQUFBLEVBQzVDO0FBRUEsU0FDRSx1QkFBQyxTQUFJLFdBQVUsa0ZBQ2I7QUFBQSwyQkFBQyxTQUFJLFdBQVUsb0hBQ2I7QUFBQSw2QkFBQyxTQUFJLFdBQVUsK0JBQ2I7QUFBQSwrQkFBQyxTQUFJLFdBQVUsc0ZBQ2IsaUNBQUMsZ0JBQWEsV0FBVSxhQUF4QjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQWtDLEtBRHBDO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsU0FDQztBQUFBLGlDQUFDLFNBQUksV0FBVSx3REFDYjtBQUFBLG1DQUFDLFVBQUssa0ZBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBd0U7QUFBQSxZQUN4RSx1QkFBQyxVQUFLLFdBQVUsc0lBQXFJLDhCQUFySjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUVBO0FBQUEsZUFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUtBO0FBQUEsVUFDQSx1QkFBQyxPQUFFLFdBQVUsMEJBQXlCO0FBQUE7QUFBQSxZQUMvQix1QkFBQyxTQUFJLFdBQVUscUZBQW9GLDhCQUFuRztBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFpSDtBQUFBLFlBQU07QUFBQSxlQUQ5SDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUVBO0FBQUEsYUFURjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBVUE7QUFBQSxXQWRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFlQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLGtFQUViO0FBQUEsK0JBQUMsd0JBQXFCLFNBQVMsUUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFxQztBQUFBLFFBR3JDO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTO0FBQUEsWUFDVCxXQUFXLDhIQUNULFlBQ0kscURBQ0EsdUVBQ047QUFBQSxZQUNBLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsT0FBSSxXQUFVLCtCQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTJDO0FBQUEsY0FDM0MsdUJBQUMsVUFBTSxzQkFBWSx1QkFBdUIsZUFBMUM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBc0Q7QUFBQTtBQUFBO0FBQUEsVUFWeEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBV0E7QUFBQSxRQUdBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTO0FBQUEsWUFDVCxXQUFXLDhIQUNULGVBQ0ksd0RBQ0EseUVBQ047QUFBQSxZQUNBLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsZUFBWSxXQUFVLGdDQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFvRDtBQUFBLGNBQ3BELHVCQUFDLFVBQU0seUJBQWUsd0JBQXdCLGlCQUE5QztBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0RDtBQUFBO0FBQUE7QUFBQSxVQVY5RDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFXQTtBQUFBLFFBR0E7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVM7QUFBQSxZQUNULFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsYUFBVSxXQUFVLGdDQUFyQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFrRDtBQUFBLGNBQ2xELHVCQUFDLFVBQUssNkJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBbUI7QUFBQTtBQUFBO0FBQUEsVUFOckI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTO0FBQUEsWUFDVCxXQUFVO0FBQUEsWUFDVixPQUFNO0FBQUEsWUFFTjtBQUFBLHFDQUFDLE9BQUksV0FBVSxrQ0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE4QztBQUFBLGNBQzlDLHVCQUFDLFVBQUssMEJBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBZ0I7QUFBQTtBQUFBO0FBQUEsVUFObEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBT0E7QUFBQSxRQUVBO0FBQUEsVUFBQztBQUFBO0FBQUEsWUFDQyxTQUFTLE1BQU0sV0FBVyx5Q0FBeUMsTUFBTTtBQUFBLFlBQ3pFLFdBQVU7QUFBQSxZQUNWLE9BQU07QUFBQSxZQUVOO0FBQUEscUNBQUMsWUFBUyxXQUFVLCtCQUFwQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFnRDtBQUFBLGNBQ2hELHVCQUFDLFVBQUssd0JBQU47QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBYztBQUFBLGNBQ2IsY0FBYyxTQUNiLHVCQUFDLFNBQU0sV0FBVSw4QkFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFBNEMsSUFFNUMsdUJBQUMsUUFBSyxXQUFVLDRCQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUF5QztBQUFBO0FBQUE7QUFBQSxVQVY3QztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFZQTtBQUFBLFFBRUE7QUFBQSxVQUFDO0FBQUE7QUFBQSxZQUNDLFNBQVMsTUFBTSxZQUFZLENBQUMsUUFBUTtBQUFBLFlBQ3BDLFdBQVU7QUFBQSxZQUVWO0FBQUEscUNBQUMsVUFBTSxxQkFBVyxTQUFTLFlBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW9DO0FBQUEsY0FDbkMsV0FBVyx1QkFBQyxhQUFVLFdBQVUsaUJBQXJCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQW1DLElBQUssdUJBQUMsZUFBWSxXQUFVLGlCQUF2QjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUFxQztBQUFBO0FBQUE7QUFBQSxVQUwzRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFNQTtBQUFBLFdBdkVGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUF3RUE7QUFBQSxTQTFGRjtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBMkZBO0FBQUEsSUFJQyxZQUNDLHVCQUFDLFNBQUksV0FBVSx1SEFDYjtBQUFBLDZCQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSw2Q0FBNEMsNENBQTVEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBd0Y7QUFBQSxRQUN4Rix1QkFBQyxPQUFFLFdBQVUsbUNBQWtDLG1IQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLGlDQUFDLFVBQUssV0FBVSxtREFBa0Qsb0RBQWxFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTLE1BQU0sV0FBVyx3Q0FBd0MsTUFBTTtBQUFBLGNBQ3hFLFdBQVU7QUFBQSxjQUVULHdCQUFjLFNBQVMsdUJBQUMsU0FBTSxXQUFVLDhCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0QyxJQUFLLHVCQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEwQjtBQUFBO0FBQUEsWUFKckc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFdBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWdCQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDREQUNiO0FBQUEsK0JBQUMsVUFBSyxXQUFVLHlDQUF3Qyx3Q0FBeEQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFnRjtBQUFBLFFBQ2hGLHVCQUFDLE9BQUUsV0FBVSxtQ0FBa0MsMEZBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsVUFBSyxXQUFVLCtEQUE4RCw4QkFBOUU7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEsV0FQRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBUUE7QUFBQSxNQUVBLHVCQUFDLFNBQUksV0FBVSw0REFDYjtBQUFBLCtCQUFDLFVBQUssV0FBVSw0Q0FBMkMseUNBQTNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBb0Y7QUFBQSxRQUNwRix1QkFBQyxPQUFFLFdBQVUsbUNBQWtDLGtGQUEvQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxvRUFDYjtBQUFBLGlDQUFDLFVBQUssV0FBVSxrREFBaUQscURBQWpFO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBRUE7QUFBQSxVQUNBO0FBQUEsWUFBQztBQUFBO0FBQUEsY0FDQyxTQUFTLE1BQU0sV0FBVyx5Q0FBeUMsTUFBTTtBQUFBLGNBQ3pFLFdBQVU7QUFBQSxjQUVULHdCQUFjLFNBQVMsdUJBQUMsU0FBTSxXQUFVLDhCQUFqQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUE0QyxJQUFLLHVCQUFDLFFBQUssV0FBVSxhQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUEwQjtBQUFBO0FBQUEsWUFKckc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxhQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFVQTtBQUFBLFdBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWdCQTtBQUFBLE1BRUEsdUJBQUMsU0FBSSxXQUFVLDREQUNiO0FBQUEsK0JBQUMsVUFBSyxXQUFVLDBDQUF5Qyx3Q0FBekQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFpRjtBQUFBLFFBQ2pGLHVCQUFDLE9BQUUsV0FBVSxtQ0FBa0Msa0VBQS9DO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLG9FQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLGdEQUErQyxtREFBL0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFFQTtBQUFBLFVBQ0E7QUFBQSxZQUFDO0FBQUE7QUFBQSxjQUNDLFNBQVMsTUFBTSxXQUFXLHVDQUF1QyxLQUFLO0FBQUEsY0FDdEUsV0FBVTtBQUFBLGNBRVQsd0JBQWMsUUFBUSx1QkFBQyxTQUFNLFdBQVUsOEJBQWpCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTRDLElBQUssdUJBQUMsUUFBSyxXQUFVLGFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBQTBCO0FBQUE7QUFBQSxZQUpwRztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFLQTtBQUFBLGFBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQVVBO0FBQUEsV0FmRjtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBZ0JBO0FBQUEsU0EvREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQWdFQTtBQUFBLE9BaktKO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FtS0E7QUFFSjsiLCJuYW1lcyI6W119