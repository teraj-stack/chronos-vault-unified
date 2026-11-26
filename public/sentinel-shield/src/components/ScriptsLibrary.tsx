import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import { Terminal, Check, ShieldCheck, Download, Filter, Zap, Archive, FolderArchive } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { PYTHON_SCRIPTS } from "/sentinel-shield/src/data/pythonScripts.ts";
import { CodeBlock } from "/sentinel-shield/src/components/CodeBlock.tsx";
import { downloadAllKillScriptsZip, downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { UltraShortFreezeModal } from "/sentinel-shield/src/components/UltraShortFreezeModal.tsx";
export const ScriptsLibrary = ({ selectedOS }) => {
  const [selectedScriptId, setSelectedScriptId] = useState(PYTHON_SCRIPTS[0].id);
  const [filterOS, setFilterOS] = useState("all");
  const [isUltraFreezeModalOpen, setIsUltraFreezeModalOpen] = useState(false);
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const handleExportAllZip = async () => {
    setIsExportingZip(true);
    setExportSuccess(false);
    try {
      await downloadAllKillScriptsZip();
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4e3);
    } catch (err) {
      console.error("Błąd podczas pakowania skryptów do ZIP:", err);
    } finally {
      setIsExportingZip(false);
    }
  };
  const filteredScripts = PYTHON_SCRIPTS.filter((s) => {
    if (filterOS === "all") return true;
    return s.os.includes(filterOS);
  });
  const selectedScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 45,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 49,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Kompletne Skrypty Ochronne (100% OFFLINE)" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 50,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 48,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white flex items-center gap-2.5 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Katalog Skryptów Pythona: Unieruchomienie, Kwarantanna i Likwidacja" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 53,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-600/50 text-purple-300 font-mono", children: [
              PYTHON_SCRIPTS.length,
              " skryptów uboju"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 54,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 52,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: [
            "Wybierz odpowiednią strategię: od zamrażania w pamięci RAM i trwałej kwarantanny binarnej (",
            /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess + icacls + IFEO" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 59,
              columnNumber: 106
            }, this),
            "), po bezwzględne zamykanie nakładek Win32 TopMost."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 58,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 47,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsUltraFreezeModalOpen(true),
              className: "flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-400 hover:to-red-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-950/40 border border-amber-300/40 transition-all cursor-pointer",
              title: "Generuj maksymalnie krótkie polecenie freeze, odetnij złącza i wstrzyknij kod do wtyczek",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 70,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "⚡ Mikro-Polecenie Freeze" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 71,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 65,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportAllZip,
              disabled: isExportingZip,
              className: "flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950/50 border border-purple-400/40 transition-all cursor-pointer disabled:opacity-60",
              title: `Eksportuj wszystkie ${PYTHON_SCRIPTS.length} skryptów uboju do pojedynczego archiwum .ZIP`,
              children: exportSuccess ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 83,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-200", children: "Pobrano archiwum .ZIP!" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 84,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 82,
                columnNumber: 17
              }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                /* @__PURE__ */ jsxDEV(FolderArchive, { className: "w-4 h-4 text-purple-200" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 88,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isExportingZip ? "Pakowanie archiwum ZIP..." : `Eksportuj Wszystkie Skrypty (.ZIP)` }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 89,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 87,
                columnNumber: 17
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 75,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 46,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Archive, { className: "w-4 h-4 text-purple-400 shrink-0" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 99,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: "Przenoszenie na stację offline (Air-Gap):" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this),
            " Pojedyncze archiwum ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-mono", children: "SENTINEL_WSZYSTKIE_SKRYPTY_UBOJU_OFFLINE.zip" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 101,
              columnNumber: 121
            }, this),
            " zawiera komplet ",
            PYTHON_SCRIPTS.length,
            " skryptów ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300 font-mono", children: ".py" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 101,
              columnNumber: 266
            }, this),
            ", skrypty wsadowe ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300 font-mono", children: ".bat" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 101,
              columnNumber: 336
            }, this),
            " / ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-blue-300 font-mono", children: ".ps1" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 101,
              columnNumber: 394
            }, this),
            " oraz katalog z instrukcją."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 100,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 98,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs shrink-0 self-end sm:self-auto", children: [
          /* @__PURE__ */ jsxDEV(Filter, { className: "w-3.5 h-3.5 text-slate-500 ml-1.5" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 107,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterOS("all"),
              className: `px-2.5 py-1 rounded-lg font-medium transition-colors ${filterOS === "all" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`,
              children: [
                "Wszystkie (",
                PYTHON_SCRIPTS.length,
                ")"
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 108,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterOS("windows"),
              className: `px-2.5 py-1 rounded-lg font-medium transition-colors ${filterOS === "windows" ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: "Windows"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 116,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setFilterOS("linux"),
              className: `px-2.5 py-1 rounded-lg font-medium transition-colors ${filterOS === "linux" ? "bg-amber-600 text-white" : "text-slate-400 hover:text-white"}`,
              children: "Linux"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 124,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 106,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 97,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
      lineNumber: 44,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-3", children: filteredScripts.map((script) => {
        const isSelected = script.id === selectedScriptId;
        const isQuarantine = script.id === "quarantine_anti_respawn_lockout";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            onClick: () => setSelectedScriptId(script.id),
            className: `p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? isQuarantine ? "bg-purple-950/50 border-purple-500 text-white shadow-xl shadow-purple-950/40 ring-1 ring-purple-500" : "bg-slate-900 border-red-500/80 shadow-xl shadow-red-950/30 ring-1 ring-red-500/50" : "bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "span",
                  {
                    className: `text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${isQuarantine ? "bg-purple-900 text-purple-200 border-purple-600" : isSelected ? "bg-red-950 text-red-300 border-red-800/80" : "bg-slate-800 text-slate-400 border-slate-700"}`,
                    children: script.badge
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                    lineNumber: 156,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 text-[10px] text-slate-500 font-mono", children: script.requiresPip ? /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400", children: "pip install" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 170,
                  columnNumber: 23
                }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "Zero-pip (Offline)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 172,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 168,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: script.title }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 177,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed", children: script.shortDesc }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 178,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 mt-3 pt-2 border-t border-slate-800/60 flex-wrap", children: script.keyFeatures.slice(0, 2).map((feat, idx) => /* @__PURE__ */ jsxDEV(
                "span",
                {
                  className: "text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800 truncate max-w-[200px]",
                  children: [
                    "✓ ",
                    feat
                  ]
                },
                idx,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 184,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 182,
                columnNumber: 17
              }, this)
            ]
          },
          script.id,
          true,
          {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 144,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 139,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800/60", children: selectedScript.badge }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 203,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: [
                "System: ",
                selectedScript.os.join(", ").toUpperCase()
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 206,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-emerald-400 font-bold ml-auto", children: "● 100% OFFLINE READY" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 209,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 202,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-white", children: selectedScript.title }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 213,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1", children: selectedScript.shortDesc }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 214,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 201,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex items-start space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 219,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white block mb-0.5", children: "Kiedy zastosować to rozwiązanie:" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 221,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: selectedScript.recommendedFor }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 222,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 220,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 218,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase text-slate-300 block", children: "Zasada działania algorytmu:" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 228,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1.5 pl-1", children: selectedScript.explanation.map((exp, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start space-x-2 text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 234,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: exp }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 235,
                columnNumber: 21
              }, this)
            ] }, idx, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 233,
              columnNumber: 19
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 231,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 227,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-800/80", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => downloadFile(`${selectedScript.id}.py`, selectedScript.code, "text/x-python;charset=utf-8"),
                  className: "flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors",
                  title: "Pobierz tylko ten pojedynczy skrypt .py",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                      lineNumber: 249,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      "Pobierz plik (",
                      selectedScript.id,
                      ".py)"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                      lineNumber: 250,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 244,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleExportAllZip,
                  disabled: isExportingZip,
                  className: "flex items-center gap-1.5 px-3 py-1.5 bg-purple-950/80 hover:bg-purple-900/80 text-purple-200 border border-purple-700/50 rounded-lg text-xs font-mono transition-colors disabled:opacity-60",
                  title: "Pobierz wszystkie 17 skryptów w jednym pliku .zip",
                  children: [
                    /* @__PURE__ */ jsxDEV(FolderArchive, { className: "w-3.5 h-3.5 text-purple-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                      lineNumber: 259,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: isExportingZip ? "Pakowanie..." : "Pobierz Całą Paczkę (.ZIP)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                      lineNumber: 260,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 253,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 243,
              columnNumber: 15
            }, this),
            selectedScript.requiresPip ? /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-amber-400", children: [
              "pip install ",
              selectedScript.pipPackages.join(" ")
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 265,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-emerald-400 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 270,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Czysty Python (Zero-pip)" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 271,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 269,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 242,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 200,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 281,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kod źródłowy skryptu Python" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 282,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 280,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-mono text-[11px]", children: "Brak telemetrii / 100% lokalne" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 284,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 279,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            CodeBlock,
            {
              code: selectedScript.code,
              language: "python",
              filename: `${selectedScript.id}.py`
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 287,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 278,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 198,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
      lineNumber: 137,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      UltraShortFreezeModal,
      {
        isOpen: isUltraFreezeModalOpen,
        onClose: () => setIsUltraFreezeModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 297,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHNMaWJyYXJ5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUZXJtaW5hbCwgQ2hlY2ssIFNoaWVsZENoZWNrLCBEb3dubG9hZCwgQWxlcnRDaXJjbGUsIENwdSwgRmlsdGVyLCBMYXllcnMsIFphcCwgU2hpZWxkQWxlcnQsIEZpbGVUZXh0LCBMb2NrLCBBcmNoaXZlLCBGb2xkZXJBcmNoaXZlIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFBZVEhPTl9TQ1JJUFRTIH0gZnJvbSAnLi4vZGF0YS9weXRob25TY3JpcHRzJztcbmltcG9ydCB7IE9TVHlwZSwgUHl0aG9uU2NyaXB0VGVtcGxhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDb2RlQmxvY2sgfSBmcm9tICcuL0NvZGVCbG9jayc7XG5pbXBvcnQgeyBkb3dubG9hZEFsbEtpbGxTY3JpcHRzWmlwLCBkb3dubG9hZEZpbGUgfSBmcm9tICcuLi91dGlscy9vZmZsaW5lUGFja2FnZUV4cG9ydGVyJztcbmltcG9ydCB7IFVsdHJhU2hvcnRGcmVlemVNb2RhbCB9IGZyb20gJy4vVWx0cmFTaG9ydEZyZWV6ZU1vZGFsJztcblxuaW50ZXJmYWNlIFNjcmlwdHNMaWJyYXJ5UHJvcHMge1xuICBzZWxlY3RlZE9TOiBPU1R5cGU7XG59XG5cbmV4cG9ydCBjb25zdCBTY3JpcHRzTGlicmFyeTogUmVhY3QuRkM8U2NyaXB0c0xpYnJhcnlQcm9wcz4gPSAoeyBzZWxlY3RlZE9TIH0pID0+IHtcbiAgY29uc3QgW3NlbGVjdGVkU2NyaXB0SWQsIHNldFNlbGVjdGVkU2NyaXB0SWRdID0gdXNlU3RhdGU8c3RyaW5nPihQWVRIT05fU0NSSVBUU1swXS5pZCk7XG4gIGNvbnN0IFtmaWx0ZXJPUywgc2V0RmlsdGVyT1NdID0gdXNlU3RhdGU8T1NUeXBlIHwgJ2FsbCc+KCdhbGwnKTtcbiAgY29uc3QgW2lzVWx0cmFGcmVlemVNb2RhbE9wZW4sIHNldElzVWx0cmFGcmVlemVNb2RhbE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNFeHBvcnRpbmdaaXAsIHNldElzRXhwb3J0aW5nWmlwXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2V4cG9ydFN1Y2Nlc3MsIHNldEV4cG9ydFN1Y2Nlc3NdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEFsbFppcCA9IGFzeW5jICgpID0+IHtcbiAgICBzZXRJc0V4cG9ydGluZ1ppcCh0cnVlKTtcbiAgICBzZXRFeHBvcnRTdWNjZXNzKGZhbHNlKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZG93bmxvYWRBbGxLaWxsU2NyaXB0c1ppcCgpO1xuICAgICAgc2V0RXhwb3J0U3VjY2Vzcyh0cnVlKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0RXhwb3J0U3VjY2VzcyhmYWxzZSksIDQwMDApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQsWCxIVkIHBvZGN6YXMgcGFrb3dhbmlhIHNrcnlwdMOzdyBkbyBaSVA6JywgZXJyKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNFeHBvcnRpbmdaaXAoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZFNjcmlwdHMgPSBQWVRIT05fU0NSSVBUUy5maWx0ZXIoKHMpID0+IHtcbiAgICBpZiAoZmlsdGVyT1MgPT09ICdhbGwnKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gcy5vcy5pbmNsdWRlcyhmaWx0ZXJPUyk7XG4gIH0pO1xuXG4gIGNvbnN0IHNlbGVjdGVkU2NyaXB0ID0gUFlUSE9OX1NDUklQVFMuZmluZCgocykgPT4gcy5pZCA9PT0gc2VsZWN0ZWRTY3JpcHRJZCkgfHwgUFlUSE9OX1NDUklQVFNbMF07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIEhlYWRlciBJbmZvICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC02IHNoYWRvdy14bCByZWxhdGl2ZSBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSAtdG9wLTEyIC1yaWdodC0xMiB3LTQ4IGgtNDggYmctcHVycGxlLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtcHVycGxlLTQwMCB0ZXh0LXhzIHVwcGVyY2FzZSBmb250LWJvbGQgdHJhY2tpbmctd2lkZXIgbWItMVwiPlxuICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPktvbXBsZXRuZSBTa3J5cHR5IE9jaHJvbm5lICgxMDAlIE9GRkxJTkUpPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8c3Bhbj5LYXRhbG9nIFNrcnlwdMOzdyBQeXRob25hOiBVbmllcnVjaG9taWVuaWUsIEt3YXJhbnRhbm5hIGkgTGlrd2lkYWNqYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBweC0yLjUgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtOTUwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTYwMC81MCB0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAge1BZVEhPTl9TQ1JJUFRTLmxlbmd0aH0gc2tyeXB0w7N3IHVib2p1XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICAgIFd5Ymllcnogb2Rwb3dpZWRuacSFIHN0cmF0ZWdpxJk6IG9kIHphbXJhxbxhbmlhIHcgcGFtacSZY2kgUkFNIGkgdHJ3YcWCZWoga3dhcmFudGFubnkgYmluYXJuZWogKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LW1vbm9cIj5OdFN1c3BlbmRQcm9jZXNzICsgaWNhY2xzICsgSUZFTzwvY29kZT4pLCBwbyBiZXp3emdsxJlkbmUgemFteWthbmllIG5ha8WCYWRlayBXaW4zMiBUb3BNb3N0LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0cmV0Y2ggc206aXRlbXMtY2VudGVyIGdhcC0zIHctZnVsbCBtZDp3LWF1dG9cIj5cbiAgICAgICAgICAgIHsvKiBVTFRSQS1TSE9SVCBGUkVFWkUgJiBQTFVHSU4gU0hJTSBCVVRUT04gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzVWx0cmFGcmVlemVNb2RhbE9wZW4odHJ1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgcHgtMy41IHB5LTIuNSBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNTAwIHZpYS1vcmFuZ2UtNjAwIHRvLXJlZC02MDAgaG92ZXI6ZnJvbS1hbWJlci00MDAgaG92ZXI6dG8tcmVkLTUwMCB0ZXh0LXdoaXRlIHJvdW5kZWQteGwgdGV4dC14cyBmb250LWJvbGQgc2hhZG93LWxnIHNoYWRvdy1vcmFuZ2UtOTUwLzQwIGJvcmRlciBib3JkZXItYW1iZXItMzAwLzQwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJHZW5lcnVqIG1ha3N5bWFsbmllIGtyw7N0a2llIHBvbGVjZW5pZSBmcmVlemUsIG9kZXRuaWogesWCxIVjemEgaSB3c3RyenlrbmlqIGtvZCBkbyB3dHljemVrXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQteWVsbG93LTIwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPuKaoSBNaWtyby1Qb2xlY2VuaWUgRnJlZXplPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBQT0JJRVJaIFdTWllTVEtJRSBTS1JZUFRZIFVCT0pVICguWklQKSAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhwb3J0QWxsWmlwfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeHBvcnRpbmdaaXB9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHB4LTQgcHktMi41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHZpYS1pbmRpZ28tNjAwIHRvLXB1cnBsZS03MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTAwIGhvdmVyOnRvLWluZGlnby01MDAgdGV4dC13aGl0ZSByb3VuZGVkLXhsIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC81MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZGlzYWJsZWQ6b3BhY2l0eS02MFwiXG4gICAgICAgICAgICAgIHRpdGxlPXtgRWtzcG9ydHVqIHdzenlzdGtpZSAke1BZVEhPTl9TQ1JJUFRTLmxlbmd0aH0gc2tyeXB0w7N3IHVib2p1IGRvIHBvamVkeW5jemVnbyBhcmNoaXd1bSAuWklQYH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2V4cG9ydFN1Y2Nlc3MgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTIwMFwiPlBvYnJhbm8gYXJjaGl3dW0gLlpJUCE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxGb2xkZXJBcmNoaXZlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtMjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPntpc0V4cG9ydGluZ1ppcCA/ICdQYWtvd2FuaWUgYXJjaGl3dW0gWklQLi4uJyA6IGBFa3Nwb3J0dWogV3N6eXN0a2llIFNrcnlwdHkgKC5aSVApYH08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE9mZmxpbmUgVHJhbnNmZXIgR3VpZGFuY2UgQmFyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPEFyY2hpdmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDAgc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj5Qcnplbm9zemVuaWUgbmEgc3RhY2rEmSBvZmZsaW5lIChBaXItR2FwKTo8L3N0cm9uZz4gUG9qZWR5bmN6ZSBhcmNoaXd1bSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vXCI+U0VOVElORUxfV1NaWVNUS0lFX1NLUllQVFlfVUJPSlVfT0ZGTElORS56aXA8L2NvZGU+IHphd2llcmEga29tcGxldCB7UFlUSE9OX1NDUklQVFMubGVuZ3RofSBza3J5cHTDs3cgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LW1vbm9cIj4ucHk8L2NvZGU+LCBza3J5cHR5IHdzYWRvd2UgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwIGZvbnQtbW9ub1wiPi5iYXQ8L2NvZGU+IC8gPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1ibHVlLTMwMCBmb250LW1vbm9cIj4ucHMxPC9jb2RlPiBvcmF6IGthdGFsb2cgeiBpbnN0cnVrY2rEhS5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBPUyBGaWx0ZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEuNSBiZy1zbGF0ZS05NTAgcC0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBzaHJpbmstMCBzZWxmLWVuZCBzbTpzZWxmLWF1dG9cIj5cbiAgICAgICAgICAgIDxGaWx0ZXIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1zbGF0ZS01MDAgbWwtMS41XCIgLz5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyT1MoJ2FsbCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgZmlsdGVyT1MgPT09ICdhbGwnID8gJ2JnLXNsYXRlLTgwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgV3N6eXN0a2llICh7UFlUSE9OX1NDUklQVFMubGVuZ3RofSlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJPUygnd2luZG93cycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgZmlsdGVyT1MgPT09ICd3aW5kb3dzJyA/ICdiZy1ibHVlLTYwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgV2luZG93c1xuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEZpbHRlck9TKCdsaW51eCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgZmlsdGVyT1MgPT09ICdsaW51eCcgPyAnYmctYW1iZXItNjAwIHRleHQtd2hpdGUnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBMaW51eFxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIEdyaWQgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIHsvKiBMZWZ0IFNjcmlwdCBDYXJkcyAoNSBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IHNwYWNlLXktM1wiPlxuICAgICAgICAgIHtmaWx0ZXJlZFNjcmlwdHMubWFwKChzY3JpcHQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzY3JpcHQuaWQgPT09IHNlbGVjdGVkU2NyaXB0SWQ7XG4gICAgICAgICAgICBjb25zdCBpc1F1YXJhbnRpbmUgPSBzY3JpcHQuaWQgPT09ICdxdWFyYW50aW5lX2FudGlfcmVzcGF3bl9sb2Nrb3V0JztcbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e3NjcmlwdC5pZH1cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNjcmlwdElkKHNjcmlwdC5pZCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC00IHJvdW5kZWQteGwgYm9yZGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gaXNRdWFyYW50aW5lXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC81MCBib3JkZXItcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHNoYWRvdy14bCBzaGFkb3ctcHVycGxlLTk1MC80MCByaW5nLTEgcmluZy1wdXJwbGUtNTAwJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCBib3JkZXItcmVkLTUwMC84MCBzaGFkb3cteGwgc2hhZG93LXJlZC05NTAvMzAgcmluZy0xIHJpbmctcmVkLTUwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtOTAwLzkwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LWJvbGQgdXBwZXJjYXNlIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc1F1YXJhbnRpbmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05MDAgdGV4dC1wdXJwbGUtMjAwIGJvcmRlci1wdXJwbGUtNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTgwMC84MCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3NjcmlwdC5iYWRnZX1cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTEgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzY3JpcHQucmVxdWlyZXNQaXAgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDBcIj5waXAgaW5zdGFsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+WmVyby1waXAgKE9mZmxpbmUpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBtdC0yXCI+e3NjcmlwdC50aXRsZX08L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMSBsaW5lLWNsYW1wLTIgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgICB7c2NyaXB0LnNob3J0RGVzY31cbiAgICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMyBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvNjAgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7c2NyaXB0LmtleUZlYXR1cmVzLnNsaWNlKDAsIDIpLm1hcCgoZmVhdCwgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gYmctc2xhdGUtOTUwIHRleHQtc2xhdGUtMzAwIHB4LTIgcHktMC41IHJvdW5kZWQgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdHJ1bmNhdGUgbWF4LXctWzIwMHB4XVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICDinJMge2ZlYXR9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2RlIERpc3BsYXkgJiBFeHBsYW5hdGlvbiAoNyBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IHNwYWNlLXktNVwiPlxuICAgICAgICAgIHsvKiBIZWFkZXIgb2Ygc2VsZWN0ZWQgc2NyaXB0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNSBzaGFkb3cteGwgc3BhY2UteS00XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIG1iLTFcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMC41IHJvdW5kZWQtbWQgdGV4dC14cyBmb250LWJvbGQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwXCI+XG4gICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRTY3JpcHQuYmFkZ2V9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICBTeXN0ZW06IHtzZWxlY3RlZFNjcmlwdC5vcy5qb2luKCcsICcpLnRvVXBwZXJDYXNlKCl9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkIG1sLWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgIOKXjyAxMDAlIE9GRkxJTkUgUkVBRFlcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+e3NlbGVjdGVkU2NyaXB0LnRpdGxlfTwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtdC0xXCI+e3NlbGVjdGVkU2NyaXB0LnNob3J0RGVzY308L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFdoZW4gcmVjb21tZW5kZWQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtMy41IHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1zdGFydCBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDAgZmxleC1zaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtc2VtaWJvbGQgdGV4dC13aGl0ZSBibG9jayBtYi0wLjVcIj5LaWVkeSB6YXN0b3Nvd2HEhyB0byByb3p3acSFemFuaWU6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+e3NlbGVjdGVkU2NyaXB0LnJlY29tbWVuZGVkRm9yfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEhvdyBpdCB3b3JrcyBicmVha2Rvd24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB1cHBlcmNhc2UgdGV4dC1zbGF0ZS0zMDAgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBaYXNhZGEgZHppYcWCYW5pYSBhbGdvcnl0bXU6XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHBsLTFcIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRTY3JpcHQuZXhwbGFuYXRpb24ubWFwKChleHAsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGxpIGtleT17aWR4fSBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IHNwYWNlLXgtMiB0ZXh0LXhzIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtNDAwIGZsZXgtc2hyaW5rLTAgbXQtMS41XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZXhwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEFjdGlvbiBCYXIgZm9yIFNlbGVjdGVkIFNjcmlwdCArIFppcCBFeHBvcnQgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZEZpbGUoYCR7c2VsZWN0ZWRTY3JpcHQuaWR9LnB5YCwgc2VsZWN0ZWRTY3JpcHQuY29kZSwgJ3RleHQveC1weXRob247Y2hhcnNldD11dGYtOCcpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTEuNSBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHR5bGtvIHRlbiBwb2plZHluY3p5IHNrcnlwdCAucHlcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogcGxpayAoe3NlbGVjdGVkU2NyaXB0LmlkfS5weSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRBbGxaaXB9XG4gICAgICAgICAgICAgICAgICBkaXNhYmxlZD17aXNFeHBvcnRpbmdaaXB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IGJnLXB1cnBsZS05NTAvODAgaG92ZXI6YmctcHVycGxlLTkwMC84MCB0ZXh0LXB1cnBsZS0yMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNzAwLzUwIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LW1vbm8gdHJhbnNpdGlvbi1jb2xvcnMgZGlzYWJsZWQ6b3BhY2l0eS02MFwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogd3N6eXN0a2llIDE3IHNrcnlwdMOzdyB3IGplZG55bSBwbGlrdSAuemlwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8Rm9sZGVyQXJjaGl2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzRXhwb3J0aW5nWmlwID8gJ1Bha293YW5pZS4uLicgOiAnUG9iaWVyeiBDYcWCxIUgUGFjemvEmSAoLlpJUCknfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3NlbGVjdGVkU2NyaXB0LnJlcXVpcmVzUGlwID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtYW1iZXItNDAwXCI+XG4gICAgICAgICAgICAgICAgICBwaXAgaW5zdGFsbCB7c2VsZWN0ZWRTY3JpcHQucGlwUGFja2FnZXMuam9pbignICcpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtZW1lcmFsZC00MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5DenlzdHkgUHl0aG9uIChaZXJvLXBpcCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGdWxsIENvZGUgQmxvY2sgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+S29kIMW6csOzZMWCb3d5IHNrcnlwdHUgUHl0aG9uPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+QnJhayB0ZWxlbWV0cmlpIC8gMTAwJSBsb2thbG5lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxDb2RlQmxvY2tcbiAgICAgICAgICAgICAgY29kZT17c2VsZWN0ZWRTY3JpcHQuY29kZX1cbiAgICAgICAgICAgICAgbGFuZ3VhZ2U9XCJweXRob25cIlxuICAgICAgICAgICAgICBmaWxlbmFtZT17YCR7c2VsZWN0ZWRTY3JpcHQuaWR9LnB5YH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBVbHRyYSBTaG9ydCBGcmVlemUgJiBQbHVnaW4gSW1tb2JpbGl6ZXIgTW9kYWwgKi99XG4gICAgICA8VWx0cmFTaG9ydEZyZWV6ZU1vZGFsXG4gICAgICAgIGlzT3Blbj17aXNVbHRyYUZyZWV6ZU1vZGFsT3Blbn1cbiAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0SXNVbHRyYUZyZWV6ZU1vZGFsT3BlbihmYWxzZSl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBNENRLFNBcUNRLFVBckNSO0FBNUNSLFNBQWdCLGdCQUFnQjtBQUNoQyxTQUFTLFVBQVUsT0FBTyxhQUFhLFVBQTRCLFFBQWdCLEtBQWtDLFNBQVMscUJBQXFCO0FBQ25KLFNBQVMsc0JBQXNCO0FBRS9CLFNBQVMsaUJBQWlCO0FBQzFCLFNBQVMsMkJBQTJCLG9CQUFvQjtBQUN4RCxTQUFTLDZCQUE2QjtBQU0vQixhQUFNLGlCQUFnRCxDQUFDLEVBQUUsV0FBVyxNQUFNO0FBQy9FLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUksU0FBaUIsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUNyRixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBeUIsS0FBSztBQUM5RCxRQUFNLENBQUMsd0JBQXdCLHlCQUF5QixJQUFJLFNBQVMsS0FBSztBQUMxRSxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQVMsS0FBSztBQUMx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