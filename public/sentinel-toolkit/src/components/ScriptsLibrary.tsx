import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import { Terminal, ShieldCheck, Download, Filter, Zap } from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { PYTHON_SCRIPTS } from "/sentinel-toolkit/src/data/pythonScripts.ts";
import { CodeBlock } from "/sentinel-toolkit/src/components/CodeBlock.tsx";
import { downloadFullOfflineBundle } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
export const ScriptsLibrary = ({ selectedOS }) => {
  const [selectedScriptId, setSelectedScriptId] = useState(PYTHON_SCRIPTS[0].id);
  const [filterOS, setFilterOS] = useState("all");
  const filteredScripts = PYTHON_SCRIPTS.filter((s) => {
    if (filterOS === "all") return true;
    return s.os.includes(filterOS);
  });
  const selectedScript = PYTHON_SCRIPTS.find((s) => s.id === selectedScriptId) || PYTHON_SCRIPTS[0];
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -top-12 -right-12 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-purple-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 31,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Kompletne Skrypty Ochronne (100% OFFLINE)" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 32,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 30,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "Katalog Skryptów Pythona: Unieruchomienie, Kwarantanna i Likwidacja" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 34,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: [
            "Wybierz odpowiednią strategię: od zamrażania w pamięci RAM i trwałej kwarantanny binarnej (",
            /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "NtSuspendProcess + icacls + IFEO" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 38,
              columnNumber: 106
            }, this),
            "), po bezwzględne zamykanie nakładek Win32 TopMost."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 37,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 29,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-end sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: downloadFullOfflineBundle,
              className: "flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 hover:from-purple-600 hover:to-red-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-purple-950/40 border border-purple-400/30 transition-all",
              title: "Pobierz wszystkie skrypty .py oraz skrypt ratunkowy .bat do uruchomienia offline",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 49,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet Offline (.bat + .py)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 50,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 44,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs", children: [
            /* @__PURE__ */ jsxDEV(Filter, { className: "w-3.5 h-3.5 text-slate-500 ml-1.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 55,
              columnNumber: 15
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
                lineNumber: 56,
                columnNumber: 15
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
                lineNumber: 64,
                columnNumber: 15
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
                lineNumber: 72,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 54,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
      lineNumber: 26,
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
                    lineNumber: 105,
                    columnNumber: 19
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1 text-[10px] text-slate-500 font-mono", children: script.requiresPip ? /* @__PURE__ */ jsxDEV("span", { className: "text-amber-400", children: "pip install" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 119,
                  columnNumber: 23
                }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "Zero-pip (Offline)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 121,
                  columnNumber: 23
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                  lineNumber: 117,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 104,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: script.title }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 126,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed", children: script.shortDesc }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 127,
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
                  lineNumber: 133,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 131,
                columnNumber: 17
              }, this)
            ]
          },
          script.id,
          true,
          {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 93,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 88,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-md text-xs font-bold bg-purple-950 text-purple-300 border border-purple-800/60", children: selectedScript.badge }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 152,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: [
                "System: ",
                selectedScript.os.join(", ").toUpperCase()
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 155,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-emerald-400 font-bold ml-auto", children: "● 100% OFFLINE READY" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 158,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 151,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg sm:text-xl font-bold text-white", children: selectedScript.title }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 162,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1", children: selectedScript.shortDesc }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 163,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 150,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-300 flex items-start space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 168,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-semibold text-white block mb-0.5", children: "Kiedy zastosować to rozwiązanie:" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 170,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: selectedScript.recommendedFor }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 171,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 169,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 167,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase text-slate-300 block", children: "Zasada działania algorytmu:" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 177,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("ul", { className: "space-y-1.5 pl-1", children: selectedScript.explanation.map((exp, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start space-x-2 text-xs text-slate-400", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 183,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: exp }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 184,
                columnNumber: 21
              }, this)
            ] }, idx, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 182,
              columnNumber: 19
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 180,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 176,
            columnNumber: 13
          }, this),
          selectedScript.requiresPip ? /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Instalacja zależności:" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 193,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("code", { className: "text-emerald-400 font-bold", children: [
              "pip install ",
              selectedScript.pipPackages.join(" ")
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 194,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 192,
            columnNumber: 15
          }, this) : /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-lg border border-emerald-800/40 text-xs font-mono flex items-center gap-2 text-emerald-400", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 200,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Ten skrypt nie wymaga uruchamiania 'pip install'. Działa od razu w czystym Pythonie." }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 201,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 149,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 210,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kod źródłowy skryptu Python" }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
                lineNumber: 211,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 209,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-mono text-[11px]", children: "Brak telemetrii / 100% lokalne" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
              lineNumber: 213,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
            lineNumber: 208,
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
              lineNumber: 216,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
          lineNumber: 207,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
        lineNumber: 147,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScriptsLibrary.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdHNMaWJyYXJ5LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBUZXJtaW5hbCwgQ2hlY2ssIFNoaWVsZENoZWNrLCBEb3dubG9hZCwgQWxlcnRDaXJjbGUsIENwdSwgRmlsdGVyLCBMYXllcnMsIFphcCwgU2hpZWxkQWxlcnQsIEZpbGVUZXh0LCBMb2NrIH0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFBZVEhPTl9TQ1JJUFRTIH0gZnJvbSAnLi4vZGF0YS9weXRob25TY3JpcHRzJztcbmltcG9ydCB7IE9TVHlwZSwgUHl0aG9uU2NyaXB0VGVtcGxhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBDb2RlQmxvY2sgfSBmcm9tICcuL0NvZGVCbG9jayc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5cbmludGVyZmFjZSBTY3JpcHRzTGlicmFyeVByb3BzIHtcbiAgc2VsZWN0ZWRPUzogT1NUeXBlO1xufVxuXG5leHBvcnQgY29uc3QgU2NyaXB0c0xpYnJhcnk6IFJlYWN0LkZDPFNjcmlwdHNMaWJyYXJ5UHJvcHM+ID0gKHsgc2VsZWN0ZWRPUyB9KSA9PiB7XG4gIGNvbnN0IFtzZWxlY3RlZFNjcmlwdElkLCBzZXRTZWxlY3RlZFNjcmlwdElkXSA9IHVzZVN0YXRlPHN0cmluZz4oUFlUSE9OX1NDUklQVFNbMF0uaWQpO1xuICBjb25zdCBbZmlsdGVyT1MsIHNldEZpbHRlck9TXSA9IHVzZVN0YXRlPE9TVHlwZSB8ICdhbGwnPignYWxsJyk7XG5cbiAgY29uc3QgZmlsdGVyZWRTY3JpcHRzID0gUFlUSE9OX1NDUklQVFMuZmlsdGVyKChzKSA9PiB7XG4gICAgaWYgKGZpbHRlck9TID09PSAnYWxsJykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHMub3MuaW5jbHVkZXMoZmlsdGVyT1MpO1xuICB9KTtcblxuICBjb25zdCBzZWxlY3RlZFNjcmlwdCA9IFBZVEhPTl9TQ1JJUFRTLmZpbmQoKHMpID0+IHMuaWQgPT09IHNlbGVjdGVkU2NyaXB0SWQpIHx8IFBZVEhPTl9TQ1JJUFRTWzBdO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIHsvKiBIZWFkZXIgSW5mbyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNiBzaGFkb3cteGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0xMiAtcmlnaHQtMTIgdy00OCBoLTQ4IGJnLXB1cnBsZS02MDAvMTAgcm91bmRlZC1mdWxsIGJsdXItM3hsIHBvaW50ZXItZXZlbnRzLW5vbmVcIiAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMiB0ZXh0LXB1cnBsZS00MDAgdGV4dC14cyB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5Lb21wbGV0bmUgU2tyeXB0eSBPY2hyb25uZSAoMTAwJSBPRkZMSU5FKTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ib2xkIHRleHQtd2hpdGVcIj5cbiAgICAgICAgICAgICAgS2F0YWxvZyBTa3J5cHTDs3cgUHl0aG9uYTogVW5pZXJ1Y2hvbWllbmllLCBLd2FyYW50YW5uYSBpIExpa3dpZGFjamFcbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICAgIFd5Ymllcnogb2Rwb3dpZWRuacSFIHN0cmF0ZWdpxJk6IG9kIHphbXJhxbxhbmlhIHcgcGFtacSZY2kgUkFNIGkgdHJ3YcWCZWoga3dhcmFudGFubnkgYmluYXJuZWogKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LW1vbm9cIj5OdFN1c3BlbmRQcm9jZXNzICsgaWNhY2xzICsgSUZFTzwvY29kZT4pLCBwbyBiZXp3emdsxJlkbmUgemFteWthbmllIG5ha8WCYWRlayBXaW4zMiBUb3BNb3N0LlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWVuZCBzbTppdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIHsvKiBQT0JJRVJaIFdTWllTVEtPIE9GRkxJTkUgQlVUVE9OICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMuNSBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNzAwIHZpYS1waW5rLTcwMCB0by1yZWQtNzAwIGhvdmVyOmZyb20tcHVycGxlLTYwMCBob3Zlcjp0by1yZWQtNjAwIHRleHQtd2hpdGUgcm91bmRlZC14bCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAvNDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzMwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHdzenlzdGtpZSBza3J5cHR5IC5weSBvcmF6IHNrcnlwdCByYXR1bmtvd3kgLmJhdCBkbyB1cnVjaG9taWVuaWEgb2ZmbGluZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgT2ZmbGluZSAoLmJhdCArIC5weSk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIE9TIEZpbHRlciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xLjUgYmctc2xhdGUtOTUwIHAtMSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPEZpbHRlciBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXNsYXRlLTUwMCBtbC0xLjVcIiAvPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyT1MoJ2FsbCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQtbGcgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1jb2xvcnMgJHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlck9TID09PSAnYWxsJyA/ICdiZy1zbGF0ZS04MDAgdGV4dC13aGl0ZScgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSdcbiAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFdzenlzdGtpZSAoe1BZVEhPTl9TQ1JJUFRTLmxlbmd0aH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyT1MoJ3dpbmRvd3MnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yLjUgcHktMSByb3VuZGVkLWxnIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJPUyA9PT0gJ3dpbmRvd3MnID8gJ2JnLWJsdWUtNjAwIHRleHQtd2hpdGUnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBXaW5kb3dzXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyT1MoJ2xpbnV4Jyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWNvbG9ycyAke1xuICAgICAgICAgICAgICAgICAgZmlsdGVyT1MgPT09ICdsaW51eCcgPyAnYmctYW1iZXItNjAwIHRleHQtd2hpdGUnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBMaW51eFxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogTWFpbiBHcmlkICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICB7LyogTGVmdCBTY3JpcHQgQ2FyZHMgKDUgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTNcIj5cbiAgICAgICAgICB7ZmlsdGVyZWRTY3JpcHRzLm1hcCgoc2NyaXB0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2NyaXB0LmlkID09PSBzZWxlY3RlZFNjcmlwdElkO1xuICAgICAgICAgICAgY29uc3QgaXNRdWFyYW50aW5lID0gc2NyaXB0LmlkID09PSAncXVhcmFudGluZV9hbnRpX3Jlc3Bhd25fbG9ja291dCc7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAga2V5PXtzY3JpcHQuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRTY3JpcHRJZChzY3JpcHQuaWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLXhsIGJvcmRlciBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICA/IGlzUXVhcmFudGluZVxuICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05NTAvNTAgYm9yZGVyLXB1cnBsZS01MDAgdGV4dC13aGl0ZSBzaGFkb3cteGwgc2hhZG93LXB1cnBsZS05NTAvNDAgcmluZy0xIHJpbmctcHVycGxlLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAgYm9yZGVyLXJlZC01MDAvODAgc2hhZG93LXhsIHNoYWRvdy1yZWQtOTUwLzMwIHJpbmctMSByaW5nLXJlZC01MDAvNTAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC82MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTkwMC85MCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdGV4dC1bMTBweF0gZm9udC1ib2xkIHVwcGVyY2FzZSBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNRdWFyYW50aW5lXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwIHRleHQtcHVycGxlLTIwMCBib3JkZXItcHVycGxlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyLXJlZC04MDAvODAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtzY3JpcHQuYmFkZ2V9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0xIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICB7c2NyaXB0LnJlcXVpcmVzUGlwID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwXCI+cGlwIGluc3RhbGw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlplcm8tcGlwIChPZmZsaW5lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMlwiPntzY3JpcHQudGl0bGV9PC9oMz5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTEgbGluZS1jbGFtcC0yIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgICAge3NjcmlwdC5zaG9ydERlc2N9XG4gICAgICAgICAgICAgICAgPC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IG10LTMgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzYwIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAge3NjcmlwdC5rZXlGZWF0dXJlcy5zbGljZSgwLCAyKS5tYXAoKGZlYXQsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17aWR4fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGJnLXNsYXRlLTk1MCB0ZXh0LXNsYXRlLTMwMCBweC0yIHB5LTAuNSByb3VuZGVkIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRydW5jYXRlIG1heC13LVsyMDBweF1cIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAg4pyTIHtmZWF0fVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pfVxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29kZSBEaXNwbGF5ICYgRXhwbGFuYXRpb24gKDcgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBzcGFjZS15LTVcIj5cbiAgICAgICAgICB7LyogSGVhZGVyIG9mIHNlbGVjdGVkIHNjcmlwdCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTJ4bCBwLTUgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtYi0xXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLW1kIHRleHQteHMgZm9udC1ib2xkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC82MFwiPlxuICAgICAgICAgICAgICAgICAge3NlbGVjdGVkU2NyaXB0LmJhZGdlfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgU3lzdGVtOiB7c2VsZWN0ZWRTY3JpcHQub3Muam9pbignLCAnKS50b1VwcGVyQ2FzZSgpfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBtbC1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICDil48gMTAwJSBPRkZMSU5FIFJFQURZXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC14bCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntzZWxlY3RlZFNjcmlwdC50aXRsZX08L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMVwiPntzZWxlY3RlZFNjcmlwdC5zaG9ydERlc2N9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBXaGVuIHJlY29tbWVuZGVkICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTMuNSB0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtc3RhcnQgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwIGZsZXgtc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtd2hpdGUgYmxvY2sgbWItMC41XCI+S2llZHkgemFzdG9zb3dhxIcgdG8gcm96d2nEhXphbmllOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPntzZWxlY3RlZFNjcmlwdC5yZWNvbW1lbmRlZEZvcn08L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBIb3cgaXQgd29ya3MgYnJlYWtkb3duICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdXBwZXJjYXNlIHRleHQtc2xhdGUtMzAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgWmFzYWRhIGR6aWHFgmFuaWEgYWxnb3J5dG11OlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBwbC0xXCI+XG4gICAgICAgICAgICAgICAge3NlbGVjdGVkU2NyaXB0LmV4cGxhbmF0aW9uLm1hcCgoZXhwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxsaSBrZXk9e2lkeH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBzcGFjZS14LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTEuNSBoLTEuNSByb3VuZGVkLWZ1bGwgYmctcHVycGxlLTQwMCBmbGV4LXNocmluay0wIG10LTEuNVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2V4cH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQaXAgaW5zdHJ1Y3Rpb25zIGlmIGFueSAqL31cbiAgICAgICAgICAgIHtzZWxlY3RlZFNjcmlwdC5yZXF1aXJlc1BpcCA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5JbnN0YWxhY2phIHphbGXFvG5vxZtjaTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHBpcCBpbnN0YWxsIHtzZWxlY3RlZFNjcmlwdC5waXBQYWNrYWdlcy5qb2luKCcgJyl9XG4gICAgICAgICAgICAgICAgPC9jb2RlPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAvNDAgdGV4dC14cyBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1lbWVyYWxkLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRlbiBza3J5cHQgbmllIHd5bWFnYSB1cnVjaGFtaWFuaWEgJ3BpcCBpbnN0YWxsJy4gRHppYcWCYSBvZCByYXp1IHcgY3p5c3R5bSBQeXRob25pZS48L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBGdWxsIENvZGUgQmxvY2sgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+S29kIMW6csOzZMWCb3d5IHNrcnlwdHUgUHl0aG9uPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIHRleHQtWzExcHhdXCI+QnJhayB0ZWxlbWV0cmlpIC8gMTAwJSBsb2thbG5lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxDb2RlQmxvY2tcbiAgICAgICAgICAgICAgY29kZT17c2VsZWN0ZWRTY3JpcHQuY29kZX1cbiAgICAgICAgICAgICAgbGFuZ3VhZ2U9XCJweXRob25cIlxuICAgICAgICAgICAgICBmaWxlbmFtZT17YCR7c2VsZWN0ZWRTY3JpcHQuaWR9LnB5YH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUEwQlE7QUExQlIsU0FBZ0IsZ0JBQWdCO0FBQ2hDLFNBQVMsVUFBaUIsYUFBYSxVQUE0QixRQUFnQixXQUF3QztBQUMzSCxTQUFTLHNCQUFzQjtBQUUvQixTQUFTLGlCQUFpQjtBQUMxQixTQUFTLGlDQUFpQztBQU1uQyxhQUFNLGlCQUFnRCxDQUFDLEVBQUUsV0FBVyxNQUFNO0FBQy9FLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUksU0FBaUIsZUFBZSxDQUFDLEVBQUUsRUFBRTtBQUNyRixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBeUIsS0FBSztBQUU5RCxRQUFNLGtCQUFrQixlQUFlLE9BQU8sQ0FBQyxNQUFNO0FBQ25ELFFBQUksYUFBYSxNQUFPLFFBQU87QUFD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