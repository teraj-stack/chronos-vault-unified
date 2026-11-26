import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { AlertOctagon, Copy, Check, Terminal, Download, ChevronDown, ChevronUp, Zap, Skull } from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFullOfflineBundle, downloadFile } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { gnidaSensor, generateAutonomousPythonDaemonScript } from "/sentinel-toolkit/src/utils/gnidaAutoFreezeSensor.ts";
export const EmergencyBanner = () => {
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [sensorStatus, setSensorStatus] = useState(() => gnidaSensor.getStatus());
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
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-r from-red-950 via-slate-900 to-purple-950 border-y border-red-800/40 py-3 px-4 shadow-inner", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 bg-red-600/20 text-red-400 rounded-lg border border-red-500/30 flex-shrink-0 animate-bounce", children: /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 33,
          columnNumber: 13
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 32,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-semibold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Program blokuje pulpit lub wyskakujące okna? Szybkie odblokowanie:" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 37,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline-block px-2 py-0.5 text-[10px] bg-red-600 text-white rounded font-mono font-bold", children: "Ctrl + Win + D" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 38,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 36,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-slate-300 text-xs", children: [
            "Użyj ",
            /* @__PURE__ */ jsxDEV("kbd", { className: "px-1.5 py-0.5 bg-slate-800 text-red-300 rounded font-mono border border-slate-700", children: "Ctrl + Win + D" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 43,
              columnNumber: 20
            }, this),
            " (Nowy Czysty Pulpit), ",
            /* @__PURE__ */ jsxDEV("kbd", { className: "px-1.5 py-0.5 bg-slate-800 text-red-300 rounded font-mono border border-slate-700", children: "Ctrl + Shift + Esc" }, void 0, false, {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 43,
              columnNumber: 162
            }, this),
            " lub pobierz gotowy pakiet offline."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 42,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 35,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 31,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full md:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => {
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("sentinel:kill-work-destroyer"));
                window.dispatchEvent(new CustomEvent("sentinel:kill-all-gnidas"));
              }
            },
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-lg border border-red-400 text-xs font-black font-mono shadow-md shadow-red-950 transition-all cursor-pointer animate-pulse active:scale-95",
            title: "Rozkaz bojowy: Natychmiast ubij gnidę niszczącą naszą pracę (Kill Work-Destroyer Gnida)",
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 60,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Ubij Gnidę Niszczącą Pracę" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 61,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 50,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-mono text-[11px] shadow-sm", children: [
          /* @__PURE__ */ jsxDEV(Zap, { className: "w-3 h-3 text-yellow-300 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 66,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-bold", children: "Czujnik Gnid:" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 67,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white", children: "Auto-Freeze (0 ms)" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 68,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-1 py-0.2 rounded bg-emerald-900 text-[10px] text-emerald-200", children: [
            sensorStatus.totalAutoFrozen,
            " zamrożonych"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 69,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 65,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadFullOfflineBundle,
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg border border-purple-500/40 text-xs font-bold shadow-md shadow-purple-950 transition-all cursor-pointer",
            title: "Pobierz kompletny pakiet skryptów ratunkowych .bat i .py działający 100% bez internetu",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 80,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet Offline" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 81,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 75,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadDaemon,
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-800 hover:bg-emerald-700 text-white rounded-lg border border-emerald-600 text-xs font-bold font-mono transition-all cursor-pointer",
            title: "Pobierz autonomiczny daemon czujnika gnid w tle (gnida_auto_freeze_daemon.py)",
            children: [
              /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 89,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Daemon .py" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 90,
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
            onClick: () => handleCopy("taskkill /F /IM flutter_runner.exe /T", "cmd1"),
            className: "flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg border border-slate-700 text-xs font-mono transition-all cursor-pointer",
            title: "Kopiuj polecenie taskkill dla Windows",
            children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 98,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "taskkill Flutter" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 99,
                columnNumber: 13
              }, this),
              copiedCmd === "cmd1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 101,
                columnNumber: 15
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3 text-slate-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 103,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 93,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setExpanded(!expanded),
            className: "flex items-center space-x-1 px-2.5 py-1.5 bg-red-950/60 hover:bg-red-900/60 text-red-300 rounded-lg border border-red-800/60 text-xs transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV("span", { children: expanded ? "Zwiń" : "Więcej skrótów" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 111,
                columnNumber: 13
              }, this),
              expanded ? /* @__PURE__ */ jsxDEV(ChevronUp, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 112,
                columnNumber: 25
              }, this) : /* @__PURE__ */ jsxDEV(ChevronDown, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 112,
                columnNumber: 65
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
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 48,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmergencyBanner.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    expanded && /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-red-900/40 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-emerald-400 block mb-1", children: "0. Autonomiczny Daemon w Tle" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 121,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Automatyczny czujnik Gnid w Pythonie. Działa jako demon bez UI i natychmiast zamraża procesy w RAM." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-300 font-mono truncate text-[10px]", children: "python 0_gnida_auto_freeze_daemon.py" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 126,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("python 0_gnida_auto_freeze_daemon.py", "cmd0"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "cmd0" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 133,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 133,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 129,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 125,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 120,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-red-400 block mb-1", children: "1. Nowy Pulpit Wirtualny" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 139,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Przenosi Cię na wolną przestrzeń roboczą, na której nakładka nie istnieje." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 140,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("code", { className: "block bg-slate-900 px-2 py-1 rounded text-red-300 font-mono", children: "Ctrl + Win + D" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 143,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 138,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-purple-400 block mb-1", children: "2. Trwałe Unieruchomienie" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Zamraża wątki w pamięci RAM i odbiera prawa plikowi .exe na dysku." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 150,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 font-mono truncate text-[10px]", children: "icacls *flutter* /deny Everyone:(X,W)" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 154,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("icacls *flutter* /deny Everyone:(X,W)", "cmd2"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "cmd2" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 161,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 161,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 157,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 153,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 148,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 bg-slate-950/60 rounded-lg border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-cyan-400 block mb-1", children: "3. PowerShell Force Kill" }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 167,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[11px] mb-2", children: "Ubija procesy z załadowanym silnikiem Flutter DLL." }, void 0, false, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 168,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900 px-2 py-1 rounded", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-mono truncate text-[10px]", children: "Stop-Process -Name *flutter* -Force" }, void 0, false, {
            fileName: "/app/applet/src/components/EmergencyBanner.tsx",
            lineNumber: 172,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy("Stop-Process -Name *flutter* -Force", "ps1"),
              className: "ml-1 text-slate-400 hover:text-white cursor-pointer",
              children: copiedCmd === "ps1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 179,
                columnNumber: 40
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/EmergencyBanner.tsx",
                lineNumber: 179,
                columnNumber: 89
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/EmergencyBanner.tsx",
              lineNumber: 175,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/EmergencyBanner.tsx",
          lineNumber: 171,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/EmergencyBanner.tsx",
        lineNumber: 166,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/EmergencyBanner.tsx",
      lineNumber: 119,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/EmergencyBanner.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVtZXJnZW5jeUJhbm5lci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBBbGVydE9jdGFnb24sIENvcHksIENoZWNrLCBUZXJtaW5hbCwgRG93bmxvYWQsIFNoaWVsZEFsZXJ0LCBDaGV2cm9uRG93biwgQ2hldnJvblVwLCBMb2NrLCBaYXAsIFNrdWxsIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IGRvd25sb2FkRnVsbE9mZmxpbmVCdW5kbGUsIGRvd25sb2FkRmlsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3IsIGdlbmVyYXRlQXV0b25vbW91c1B5dGhvbkRhZW1vblNjcmlwdCwgU2Vuc29yQXV0b21hdG9uU3RhdHVzIH0gZnJvbSAnLi4vdXRpbHMvZ25pZGFBdXRvRnJlZXplU2Vuc29yJztcblxuZXhwb3J0IGNvbnN0IEVtZXJnZW5jeUJhbm5lcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtjb3BpZWRDbWQsIHNldENvcGllZENtZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2V4cGFuZGVkLCBzZXRFeHBhbmRlZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtzZW5zb3JTdGF0dXMsIHNldFNlbnNvclN0YXR1c10gPSB1c2VTdGF0ZTxTZW5zb3JBdXRvbWF0b25TdGF0dXM+KCgpID0+IGduaWRhU2Vuc29yLmdldFN0YXR1cygpKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gZ25pZGFTZW5zb3Iuc3Vic2NyaWJlKHN0YXR1cyA9PiB7XG4gICAgICBzZXRTZW5zb3JTdGF0dXMoc3RhdHVzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdW5zdWI7XG4gIH0sIFtdKTtcblxuICBjb25zdCBoYW5kbGVDb3B5ID0gKGNtZDogc3RyaW5nLCBpZDogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY21kKTtcbiAgICBzZXRDb3BpZWRDbWQoaWQpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0Q29waWVkQ21kKG51bGwpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZERhZW1vbiA9ICgpID0+IHtcbiAgICBkb3dubG9hZEZpbGUoJzBfZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5JywgZ2VuZXJhdGVBdXRvbm9tb3VzUHl0aG9uRGFlbW9uU2NyaXB0KCksICd0ZXh0L3gtcHl0aG9uJyk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtOTUwIHZpYS1zbGF0ZS05MDAgdG8tcHVycGxlLTk1MCBib3JkZXIteSBib3JkZXItcmVkLTgwMC80MCBweS0zIHB4LTQgc2hhZG93LWlubmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTd4bCBteC1hdXRvIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIHNtOnRleHQtc21cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiBiZy1yZWQtNjAwLzIwIHRleHQtcmVkLTQwMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItcmVkLTUwMC8zMCBmbGV4LXNocmluay0wIGFuaW1hdGUtYm91bmNlXCI+XG4gICAgICAgICAgICA8QWxlcnRPY3RhZ29uIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3Bhbj5Qcm9ncmFtIGJsb2t1amUgcHVscGl0IGx1YiB3eXNrYWt1asSFY2Ugb2tuYT8gU3p5YmtpZSBvZGJsb2tvd2FuaWU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lLWJsb2NrIHB4LTIgcHktMC41IHRleHQtWzEwcHhdIGJnLXJlZC02MDAgdGV4dC13aGl0ZSByb3VuZGVkIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICBDdHJsICsgV2luICsgRFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgVcW8eWogPGtiZCBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IGJnLXNsYXRlLTgwMCB0ZXh0LXJlZC0zMDAgcm91bmRlZCBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5DdHJsICsgV2luICsgRDwva2JkPiAoTm93eSBDenlzdHkgUHVscGl0KSwgPGtiZCBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IGJnLXNsYXRlLTgwMCB0ZXh0LXJlZC0zMDAgcm91bmRlZCBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5DdHJsICsgU2hpZnQgKyBFc2M8L2tiZD4gbHViIHBvYmllcnogZ290b3d5IHBha2lldCBvZmZsaW5lLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMiB3LWZ1bGwgbWQ6dy1hdXRvIGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgey8qIFVCSUogR05JRMSYIE5JU1pDWsSEQ8SEIFBSQUPEmCBBQ1RJT04gQlVUVE9OICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpraWxsLXdvcmstZGVzdHJveWVyJykpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnc2VudGluZWw6a2lsbC1hbGwtZ25pZGFzJykpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgcHgtMyBweS0xLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXJvc2UtNjAwIHRvLXBpbmstNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1waW5rLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yZWQtNDAwIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gc2hhZG93LW1kIHNoYWRvdy1yZWQtOTUwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFuaW1hdGUtcHVsc2UgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgIHRpdGxlPVwiUm96a2F6IGJvam93eTogTmF0eWNobWlhc3QgdWJpaiBnbmlkxJkgbmlzemN6xIVjxIUgbmFzesSFIHByYWPEmSAoS2lsbCBXb3JrLURlc3Ryb3llciBHbmlkYSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VWJpaiBHbmlkxJkgTmlzemN6xIVjxIUgUHJhY8SZPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIENaVUpOSUsgR05JRCBBVVRPLUZSRUVaRSBCQURHRSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctZW1lcmFsZC05NTAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC82MCB0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSBzaGFkb3ctc21cIj5cbiAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj5DenVqbmlrIEduaWQ6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPkF1dG8tRnJlZXplICgwIG1zKTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEgcHktMC4yIHJvdW5kZWQgYmctZW1lcmFsZC05MDAgdGV4dC1bMTBweF0gdGV4dC1lbWVyYWxkLTIwMFwiPlxuICAgICAgICAgICAgICB7c2Vuc29yU3RhdHVzLnRvdGFsQXV0b0Zyb3plbn0gemFtcm/FvG9ueWNoXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUE9CSUVSWiBQQUtJRVQgUkFUVU5LT1dZIE9GRkxJTkUgKi99XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17ZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41IHB4LTMgcHktMS41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcHVycGxlLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzQwIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICB0aXRsZT1cIlBvYmllcnoga29tcGxldG55IHBha2lldCBza3J5cHTDs3cgcmF0dW5rb3d5Y2ggLmJhdCBpIC5weSBkemlhxYJhasSFY3kgMTAwJSBiZXogaW50ZXJuZXR1XCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgT2ZmbGluZTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkRGFlbW9ufVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgcHgtMyBweS0xLjUgYmctZW1lcmFsZC04MDAgaG92ZXI6YmctZW1lcmFsZC03MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZW1lcmFsZC02MDAgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBhdXRvbm9taWN6bnkgZGFlbW9uIGN6dWpuaWthIGduaWQgdyB0bGUgKGduaWRhX2F1dG9fZnJlZXplX2RhZW1vbi5weSlcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkRhZW1vbiAucHk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCd0YXNra2lsbCAvRiAvSU0gZmx1dHRlcl9ydW5uZXIuZXhlIC9UJywgJ2NtZDEnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41IHB4LTMgcHktMS41IGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgaG92ZXI6dGV4dC13aGl0ZSByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiS29waXVqIHBvbGVjZW5pZSB0YXNra2lsbCBkbGEgV2luZG93c1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcmVkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj50YXNra2lsbCBGbHV0dGVyPC9zcGFuPlxuICAgICAgICAgICAge2NvcGllZENtZCA9PT0gJ2NtZDEnID8gKFxuICAgICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxDb3B5IGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1zbGF0ZS00MDBcIiAvPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEV4cGFuZGVkKCFleHBhbmRlZCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEgcHgtMi41IHB5LTEuNSBiZy1yZWQtOTUwLzYwIGhvdmVyOmJnLXJlZC05MDAvNjAgdGV4dC1yZWQtMzAwIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwIHRleHQteHMgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPntleHBhbmRlZCA/ICdad2nFhCcgOiAnV2nEmWNlaiBza3LDs3TDs3cnfTwvc3Bhbj5cbiAgICAgICAgICAgIHtleHBhbmRlZCA/IDxDaGV2cm9uVXAgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPiA6IDxDaGV2cm9uRG93biBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRXhwYW5kZWQgUXVpY2sgQ2hlYXQgU2hlZXQgKi99XG4gICAgICB7ZXhwYW5kZWQgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTMgcHQtMyBib3JkZXItdCBib3JkZXItcmVkLTkwMC80MCBtYXgtdy03eGwgbXgtYXV0byBncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC0zIHRleHQteHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IGJnLXNsYXRlLTk1MC82MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtZW1lcmFsZC00MDAgYmxvY2sgbWItMVwiPjAuIEF1dG9ub21pY3pueSBEYWVtb24gdyBUbGU8L3NwYW4+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBtYi0yXCI+XG4gICAgICAgICAgICAgIEF1dG9tYXR5Y3pueSBjenVqbmlrIEduaWQgdyBQeXRob25pZS4gRHppYcWCYSBqYWtvIGRlbW9uIGJleiBVSSBpIG5hdHljaG1pYXN0IHphbXJhxbxhIHByb2Nlc3kgdyBSQU0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy1zbGF0ZS05MDAgcHgtMiBweS0xIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTMwMCBmb250LW1vbm8gdHJ1bmNhdGUgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICBweXRob24gMF9nbmlkYV9hdXRvX2ZyZWV6ZV9kYWVtb24ucHlcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weSgncHl0aG9uIDBfZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uLnB5JywgJ2NtZDAnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtbC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZENtZCA9PT0gJ2NtZDAnID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+fVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSBiZy1zbGF0ZS05NTAvNjAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1zZW1pYm9sZCB0ZXh0LXJlZC00MDAgYmxvY2sgbWItMVwiPjEuIE5vd3kgUHVscGl0IFdpcnR1YWxueTwvc3Bhbj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdIG1iLTJcIj5cbiAgICAgICAgICAgICAgUHJ6ZW5vc2kgQ2nEmSBuYSB3b2xuxIUgcHJ6ZXN0cnplxYQgcm9ib2N6xIUsIG5hIGt0w7NyZWogbmFrxYJhZGthIG5pZSBpc3RuaWVqZS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDxjb2RlIGNsYXNzTmFtZT1cImJsb2NrIGJnLXNsYXRlLTkwMCBweC0yIHB5LTEgcm91bmRlZCB0ZXh0LXJlZC0zMDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIEN0cmwgKyBXaW4gKyBEXG4gICAgICAgICAgICA8L2NvZGU+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IGJnLXNsYXRlLTk1MC82MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtcHVycGxlLTQwMCBibG9jayBtYi0xXCI+Mi4gVHJ3YcWCZSBVbmllcnVjaG9taWVuaWU8L3NwYW4+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMXB4XSBtYi0yXCI+XG4gICAgICAgICAgICAgIFphbXJhxbxhIHfEhXRraSB3IHBhbWnEmWNpIFJBTSBpIG9kYmllcmEgcHJhd2EgcGxpa293aSAuZXhlIG5hIGR5c2t1LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctc2xhdGUtOTAwIHB4LTIgcHktMSByb3VuZGVkXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCBmb250LW1vbm8gdHJ1bmNhdGUgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICBpY2FjbHMgKmZsdXR0ZXIqIC9kZW55IEV2ZXJ5b25lOihYLFcpXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoJ2ljYWNscyAqZmx1dHRlciogL2RlbnkgRXZlcnlvbmU6KFgsVyknLCAnY21kMicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1sLTEgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y29waWVkQ21kID09PSAnY21kMicgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IGJnLXNsYXRlLTk1MC82MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtY3lhbi00MDAgYmxvY2sgbWItMVwiPjMuIFBvd2VyU2hlbGwgRm9yY2UgS2lsbDwvc3Bhbj5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzExcHhdIG1iLTJcIj5cbiAgICAgICAgICAgICAgVWJpamEgcHJvY2VzeSB6IHphxYJhZG93YW55bSBzaWxuaWtpZW0gRmx1dHRlciBETEwuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy1zbGF0ZS05MDAgcHgtMiBweS0xIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LW1vbm8gdHJ1bmNhdGUgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICBTdG9wLVByb2Nlc3MgLU5hbWUgKmZsdXR0ZXIqIC1Gb3JjZVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KCdTdG9wLVByb2Nlc3MgLU5hbWUgKmZsdXR0ZXIqIC1Gb3JjZScsICdwczEnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtbC0xIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2NvcGllZENtZCA9PT0gJ3BzMScgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz59XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQWdDWTtBQWhDWixTQUFnQixVQUFVLGlCQUFpQjtBQUMzQyxTQUFTLGNBQWMsTUFBTSxPQUFPLFVBQVUsVUFBdUIsYUFBYSxXQUFpQixLQUFLLGFBQWE7QUFDckgsU0FBUywyQkFBMkIsb0JBQW9CO0FBQ3hELFNBQVMsYUFBYSw0Q0FBbUU7QUFFbEYsYUFBTSxrQkFBNEIsTUFBTTtBQUM3QyxRQUFNLENBQUMsV0FBVyxZQUFZLElBQUksU0FBd0IsSUFBSTtBQUM5RCxRQUFNLENBQUMs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