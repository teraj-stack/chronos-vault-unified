import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import { motion, AnimatePresence } from "/sentinel-shield/node_modules/.vite/deps/framer-motion.js?v=120be383";
import {
  Zap,
  Copy,
  Check,
  Terminal,
  Layers,
  Unlink,
  RefreshCw,
  Code2,
  CheckCircle2,
  Sparkles
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  ultraFreezeManager,
  ULTRA_SHORT_COMMANDS
} from "/sentinel-shield/src/utils/ultraFreezeLinksEngine.ts";
export const UltraShortFreezeModal = ({
  isOpen,
  onClose
}) => {
  const [plugins, setPlugins] = useState(() => ultraFreezeManager.getPlugins());
  const [links, setLinks] = useState(() => ultraFreezeManager.getLinks());
  const [telemetry, setTelemetry] = useState(() => ultraFreezeManager.getTelemetry());
  const [selectedCmdKey, setSelectedCmdKey] = useState("powershell");
  const [selectedPluginId, setSelectedPluginId] = useState(plugins[0]?.id || "plug-01");
  const [copiedKey, setCopiedKey] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionSuccessBanner, setExecutionSuccessBanner] = useState(null);
  useEffect(() => {
    const unsub = ultraFreezeManager.subscribe(() => {
      setPlugins(ultraFreezeManager.getPlugins());
      setLinks(ultraFreezeManager.getLinks());
      setTelemetry(ultraFreezeManager.getTelemetry());
    });
    return () => unsub();
  }, []);
  if (!isOpen) return null;
  const currentCmd = ULTRA_SHORT_COMMANDS[selectedCmdKey];
  const selectedPlugin = plugins.find((p) => p.id === selectedPluginId) || plugins[0];
  const handleCopyCommand = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };
  const handleExecuteAll = () => {
    setIsExecuting(true);
    setTimeout(() => {
      const res = ultraFreezeManager.executeUltraFreezeAndPluginImmobilization();
      setIsExecuting(false);
      setExecutionSuccessBanner({
        processes: res.processesFrozen,
        links: res.linksSevered,
        plugins: res.pluginsImmobilized
      });
      setTimeout(() => setExecutionSuccessBanner(null), 6e3);
    }, 900);
  };
  const handleReset = () => {
    ultraFreezeManager.resetAll();
    setExecutionSuccessBanner(null);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto font-sans", children: /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.95, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.95, y: 10 },
      className: "w-full max-w-5xl bg-slate-950 border border-purple-500/50 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden flex flex-col max-h-[92vh]",
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border-b border-purple-500/40 flex items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-purple-900/80 border border-purple-400/60 text-purple-200 shadow-lg shadow-purple-950", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-yellow-300 animate-bounce" }, void 0, false, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 87,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 86,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxDEV("h2", { className: "text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2", children: /* @__PURE__ */ jsxDEV("span", { children: "Maksymalnie Krótkie Polecenie Freeze & Wstrzykiwacz Wtyczek" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 92,
                  columnNumber: 19
                }, this) }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 91,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 text-[10px] font-mono font-bold", children: "0 ms NtSuspend + Reparse Severing" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 94,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 90,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-0.5", children: "Błyskawiczne zamrożenie każdego typu malware, odcięcie złączy i linków plików oraz wstrzyknięcie kodu unieruchamiającego do wszystkich wtyczek w systemie." }, void 0, false, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 98,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 89,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 85,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer",
              title: "Zamknij okno",
              children: "✕"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 104,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
          lineNumber: 84,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV(AnimatePresence, { children: executionSuccessBanner && /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            className: "bg-gradient-to-r from-emerald-950 via-teal-950 to-emerald-950 border-b border-emerald-500/80 p-3 px-5 text-xs font-mono text-emerald-200 flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400 animate-pulse shrink-0" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 123,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  /* @__PURE__ */ jsxDEV("strong", { children: "SUKCES WYKONANIA (0 MS):" }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 125,
                    columnNumber: 19
                  }, this),
                  " Zamrożono ",
                  /* @__PURE__ */ jsxDEV("strong", { children: executionSuccessBanner.processes }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 125,
                    columnNumber: 71
                  }, this),
                  " procesów malware, odcięto ",
                  /* @__PURE__ */ jsxDEV("strong", { children: executionSuccessBanner.links }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 125,
                    columnNumber: 149
                  }, this),
                  " złączy plików i zablokowano ",
                  /* @__PURE__ */ jsxDEV("strong", { children: executionSuccessBanner.plugins }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 125,
                    columnNumber: 225
                  }, this),
                  " wtyczek w systemie!"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 124,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 122,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-900 border border-emerald-500 text-[10px] font-bold", children: "100% ZABEZPIECZONE" }, void 0, false, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 128,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 116,
            columnNumber: 13
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
          lineNumber: 114,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 142,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-sm uppercase tracking-wider", children: "1. MAKSYMALNIE KRÓTKIE POLECENIE ZAMRAŻAJĄCE (ULTRA-SHORT 1-LINER)" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 143,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 141,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-purple-300 font-bold", children: [
                "Długość: ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-yellow-300", children: [
                  currentCmd.charCount,
                  " znaków"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 148,
                  columnNumber: 26
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 147,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 140,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: Object.keys(ULTRA_SHORT_COMMANDS).map((k) => /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setSelectedCmdKey(k),
                className: `p-2 rounded-xl border text-center transition-all cursor-pointer ${selectedCmdKey === k ? "bg-purple-900/90 text-white border-purple-400 shadow-md shadow-purple-950 font-black" : "bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] truncate", children: ULTRA_SHORT_COMMANDS[k].title.split("(")[0] }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 164,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-purple-300 opacity-80", children: [
                    ULTRA_SHORT_COMMANDS[k].charCount,
                    " zn."
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 165,
                    columnNumber: 19
                  }, this)
                ]
              },
              k,
              true,
              {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 155,
                columnNumber: 17
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 153,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 relative", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-300", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-purple-300 font-bold flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3.5 h-3.5 text-yellow-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 174,
                    columnNumber: 19
                  }, this),
                  currentCmd.title
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 173,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => handleCopyCommand(selectedCmdKey, currentCmd.command),
                    className: "px-3 py-1 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-600 text-purple-200 flex items-center gap-1.5 transition-colors cursor-pointer text-[11px] font-bold",
                    children: copiedKey === selectedCmdKey ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                      /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 183,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Skopiowano!" }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 184,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                      lineNumber: 182,
                      columnNumber: 21
                    }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                      /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 188,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Kopiuj 1-Liner" }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 189,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                      lineNumber: 187,
                      columnNumber: 21
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 177,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 172,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("pre", { className: "p-3 rounded-lg bg-black/90 text-emerald-400 font-mono text-[11px] overflow-x-auto border border-purple-900/50 select-all whitespace-pre-wrap break-all", children: currentCmd.command }, void 0, false, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 195,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-400", children: [
                "ℹ️ ",
                currentCmd.explanation
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 199,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 171,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 139,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-3 border-t border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV(Unlink, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 209,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-sm uppercase tracking-wider", children: "2. ODCIĘCIE ZŁĄCZY I LINKÓW MIĘDZY PLIKAMI (NTFS JUNCTIONS, SYMLINKS, IPC)" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 210,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 208,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: [
                "Zidentyfikowano: ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: [
                  links.length,
                  " złączy"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 215,
                  columnNumber: 34
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 214,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 207,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2.5", children: links.map((link) => {
              const isSevered = link.status === "SEVERED_FREEZED";
              return /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `p-3 rounded-xl border transition-all ${isSevered ? "bg-emerald-950/40 border-emerald-500/60" : "bg-slate-900/80 border-red-500/40"}`,
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2 mb-1", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-slate-950 border border-slate-700 text-purple-300 text-[10px] font-bold", children: link.linkType }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 232,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold border ${isSevered ? "bg-emerald-950 text-emerald-300 border-emerald-600" : "bg-red-950 text-red-300 border-red-700 animate-pulse"}`, children: isSevered ? "ODCIĘTE & ZAMROŻONE (0 MS)" : `RYZYKO ESKALACJI: ${link.riskScore}%` }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 235,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                      lineNumber: 231,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "space-y-0.5 text-[10px]", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 truncate", title: link.sourcePath, children: [
                        "Źródło: ",
                        /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: link.sourcePath }, void 0, false, {
                          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                          lineNumber: 246,
                          columnNumber: 33
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 245,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 truncate", title: link.targetTarget, children: [
                        "Cel / Hook: ",
                        /* @__PURE__ */ jsxDEV("code", { className: "text-red-300", children: link.targetTarget }, void 0, false, {
                          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                          lineNumber: 249,
                          columnNumber: 37
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 248,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                      lineNumber: 244,
                      columnNumber: 21
                    }, this)
                  ]
                },
                link.id,
                true,
                {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                },
                this
              );
            }) }, void 0, false, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 219,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 206,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 pt-3 border-t border-slate-800", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 262,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "font-black text-white text-sm uppercase tracking-wider", children: "3. KOD UNIERUCHAMIAJĄCY WPISANY W KAŻDĄ WTYCZKĘ SYSTEMOWĄ" }, void 0, false, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 263,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 261,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-cyan-300", children: [
                "Wtyczki w systemie: ",
                /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: [
                  plugins.length,
                  " chronionych"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 268,
                  columnNumber: 37
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 267,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 260,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-2", children: plugins.map((plugin) => {
                const isSelected = plugin.id === selectedPluginId;
                const isImmobilized = plugin.status === "IMMOBILIZED";
                return /* @__PURE__ */ jsxDEV(
                  "div",
                  {
                    onClick: () => setSelectedPluginId(plugin.id),
                    className: `p-2.5 rounded-xl border cursor-pointer transition-all ${isSelected ? "bg-cyan-950/80 border-cyan-400 shadow-md shadow-cyan-950" : "bg-slate-900/80 border-slate-800 hover:border-slate-700"}`,
                    children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white text-[11px] truncate", children: plugin.name }, void 0, false, {
                          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                          lineNumber: 292,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { className: `px-1.5 py-0.2 rounded text-[9px] font-bold border ${isImmobilized ? "bg-emerald-950 text-emerald-300 border-emerald-600" : "bg-yellow-950 text-yellow-300 border-yellow-700"}`, children: isImmobilized ? "ZABLOKOWANA" : "GOTOWA" }, void 0, false, {
                          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                          lineNumber: 295,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 291,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 mt-1 truncate", children: plugin.categoryLabel }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 304,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[9px] text-cyan-300 font-mono mt-0.5 truncate", children: [
                        "Wstrzyknięcie: ",
                        plugin.immobilizationMethod
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 308,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  plugin.id,
                  true,
                  {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 282,
                    columnNumber: 21
                  },
                  this
                );
              }) }, void 0, false, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 276,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-slate-900/90 rounded-xl border border-slate-800 p-3 space-y-2 flex flex-col justify-between", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-300 mb-1", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-cyan-300 text-[11px] flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxDEV(Code2, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 321,
                        columnNumber: 23
                      }, this),
                      "Kod Wstrzykiwany: ",
                      selectedPlugin.categoryLabel
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                      lineNumber: 320,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "button",
                      {
                        onClick: () => handleCopyCommand(selectedPlugin.id, selectedPlugin.codeSnippet),
                        className: "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-[10px] font-bold transition-colors cursor-pointer",
                        children: copiedKey === selectedPlugin.id ? "Skopiowano!" : "Kopiuj Kod Wtyczki"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                        lineNumber: 324,
                        columnNumber: 21
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 319,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("pre", { className: "p-2.5 rounded-lg bg-black text-cyan-300 font-mono text-[10px] overflow-x-auto border border-cyan-900/40 max-h-56 select-all whitespace-pre", children: selectedPlugin.codeSnippet }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 332,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 318,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400", children: [
                  "Ścieżka instalacji: ",
                  /* @__PURE__ */ jsxDEV("code", { className: "text-yellow-300", children: selectedPlugin.path }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 338,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 337,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 317,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 273,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 259,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
          lineNumber: 136,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-900/90 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-400", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 350,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Ostatnie wykonanie: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: telemetry.lastRunTimestamp }, void 0, false, {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 351,
                columnNumber: 39
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
              lineNumber: 351,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 349,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleReset,
                className: "px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold transition-colors cursor-pointer",
                children: "Resetuj"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 355,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleExecuteAll,
                disabled: isExecuting,
                className: "flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white font-black shadow-lg shadow-purple-950/60 border border-purple-400/40 flex items-center justify-center gap-2 transition-all cursor-pointer",
                children: isExecuting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 369,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Wstrzykiwanie w toku..." }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 370,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 368,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-yellow-300 animate-bounce" }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 374,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Uruchom Polecenie & Wstrzyknij do Wszystkich Wtyczek (0 ms)" }, void 0, false, {
                    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                    lineNumber: 375,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                  lineNumber: 373,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
                lineNumber: 362,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
            lineNumber: 354,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
          lineNumber: 348,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
      lineNumber: 77,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/UltraShortFreezeModal.tsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVsdHJhU2hvcnRGcmVlemVNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gJ2ZyYW1lci1tb3Rpb24nO1xuaW1wb3J0IHsgXG4gIFphcCwgU2t1bGwsIFNoaWVsZCwgU2hpZWxkQWxlcnQsIFNoaWVsZENoZWNrLCBDb3B5LCBDaGVjaywgVGVybWluYWwsIFxuICBMYXllcnMsIExpbmsyLCBVbmxpbmssIExvY2ssIFJlZnJlc2hDdywgQ3B1LCBDb2RlMiwgQWxlcnRUcmlhbmdsZSwgXG4gIEV4dGVybmFsTGluaywgRmlsZUNvZGUsIENoZWNrQ2lyY2xlMiwgU2xpZGVycywgUGxheSwgRG93bmxvYWQsIFNwYXJrbGVzXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBcbiAgdWx0cmFGcmVlemVNYW5hZ2VyLCBVTFRSQV9TSE9SVF9DT01NQU5EUywgXG4gIFNjYW5uZWRQbHVnaW5UYXJnZXQsIEZpbGVMaW5rUmVwYXJzZVRhcmdldCwgVWx0cmFGcmVlemVUZWxlbWV0cnkgXG59IGZyb20gJy4uL3V0aWxzL3VsdHJhRnJlZXplTGlua3NFbmdpbmUnO1xuaW1wb3J0IHsgQ29kZUJsb2NrIH0gZnJvbSAnLi9Db2RlQmxvY2snO1xuXG5pbnRlcmZhY2UgVWx0cmFTaG9ydEZyZWV6ZU1vZGFsUHJvcHMge1xuICBpc09wZW46IGJvb2xlYW47XG4gIG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBVbHRyYVNob3J0RnJlZXplTW9kYWw6IFJlYWN0LkZDPFVsdHJhU2hvcnRGcmVlemVNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZVxufSkgPT4ge1xuICBjb25zdCBbcGx1Z2lucywgc2V0UGx1Z2luc10gPSB1c2VTdGF0ZTxTY2FubmVkUGx1Z2luVGFyZ2V0W10+KCgpID0+IHVsdHJhRnJlZXplTWFuYWdlci5nZXRQbHVnaW5zKCkpO1xuICBjb25zdCBbbGlua3MsIHNldExpbmtzXSA9IHVzZVN0YXRlPEZpbGVMaW5rUmVwYXJzZVRhcmdldFtdPigoKSA9PiB1bHRyYUZyZWV6ZU1hbmFnZXIuZ2V0TGlua3MoKSk7XG4gIGNvbnN0IFt0ZWxlbWV0cnksIHNldFRlbGVtZXRyeV0gPSB1c2VTdGF0ZTxVbHRyYUZyZWV6ZVRlbGVtZXRyeT4oKCkgPT4gdWx0cmFGcmVlemVNYW5hZ2VyLmdldFRlbGVtZXRyeSgpKTtcbiAgY29uc3QgW3NlbGVjdGVkQ21kS2V5LCBzZXRTZWxlY3RlZENtZEtleV0gPSB1c2VTdGF0ZTxrZXlvZiB0eXBlb2YgVUxUUkFfU0hPUlRfQ09NTUFORFM+KCdwb3dlcnNoZWxsJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFBsdWdpbklkLCBzZXRTZWxlY3RlZFBsdWdpbklkXSA9IHVzZVN0YXRlPHN0cmluZz4ocGx1Z2luc1swXT8uaWQgfHwgJ3BsdWctMDEnKTtcbiAgY29uc3QgW2NvcGllZEtleSwgc2V0Q29waWVkS2V5XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNFeGVjdXRpbmcsIHNldElzRXhlY3V0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2V4ZWN1dGlvblN1Y2Nlc3NCYW5uZXIsIHNldEV4ZWN1dGlvblN1Y2Nlc3NCYW5uZXJdID0gdXNlU3RhdGU8e1xuICAgIHByb2Nlc3NlczogbnVtYmVyO1xuICAgIGxpbmtzOiBudW1iZXI7XG4gICAgcGx1Z2luczogbnVtYmVyO1xuICB9IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YiA9IHVsdHJhRnJlZXplTWFuYWdlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgc2V0UGx1Z2lucyh1bHRyYUZyZWV6ZU1hbmFnZXIuZ2V0UGx1Z2lucygpKTtcbiAgICAgIHNldExpbmtzKHVsdHJhRnJlZXplTWFuYWdlci5nZXRMaW5rcygpKTtcbiAgICAgIHNldFRlbGVtZXRyeSh1bHRyYUZyZWV6ZU1hbmFnZXIuZ2V0VGVsZW1ldHJ5KCkpO1xuICAgIH0pO1xuICAgIHJldHVybiAoKSA9PiB1bnN1YigpO1xuICB9LCBbXSk7XG5cbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xuXG4gIGNvbnN0IGN1cnJlbnRDbWQgPSBVTFRSQV9TSE9SVF9DT01NQU5EU1tzZWxlY3RlZENtZEtleV07XG4gIGNvbnN0IHNlbGVjdGVkUGx1Z2luID0gcGx1Z2lucy5maW5kKHAgPT4gcC5pZCA9PT0gc2VsZWN0ZWRQbHVnaW5JZCkgfHwgcGx1Z2luc1swXTtcblxuICBjb25zdCBoYW5kbGVDb3B5Q29tbWFuZCA9IChrZXk6IHN0cmluZywgdGV4dDogc3RyaW5nKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgc2V0Q29waWVkS2V5KGtleSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWRLZXkobnVsbCksIDI1MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4ZWN1dGVBbGwgPSAoKSA9PiB7XG4gICAgc2V0SXNFeGVjdXRpbmcodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSB1bHRyYUZyZWV6ZU1hbmFnZXIuZXhlY3V0ZVVsdHJhRnJlZXplQW5kUGx1Z2luSW1tb2JpbGl6YXRpb24oKTtcbiAgICAgIHNldElzRXhlY3V0aW5nKGZhbHNlKTtcbiAgICAgIHNldEV4ZWN1dGlvblN1Y2Nlc3NCYW5uZXIoe1xuICAgICAgICBwcm9jZXNzZXM6IHJlcy5wcm9jZXNzZXNGcm96ZW4sXG4gICAgICAgIGxpbmtzOiByZXMubGlua3NTZXZlcmVkLFxuICAgICAgICBwbHVnaW5zOiByZXMucGx1Z2luc0ltbW9iaWxpemVkXG4gICAgICB9KTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0RXhlY3V0aW9uU3VjY2Vzc0Jhbm5lcihudWxsKSwgNjAwMCk7XG4gICAgfSwgOTAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSZXNldCA9ICgpID0+IHtcbiAgICB1bHRyYUZyZWV6ZU1hbmFnZXIucmVzZXRBbGwoKTtcbiAgICBzZXRFeGVjdXRpb25TdWNjZXNzQmFubmVyKG51bGwpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIHotNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00IHNtOnAtNiBiZy1ibGFjay84NSBiYWNrZHJvcC1ibHVyLW1kIG92ZXJmbG93LXktYXV0byBmb250LXNhbnNcIj5cbiAgICAgIDxtb3Rpb24uZGl2IFxuICAgICAgICBpbml0aWFsPXt7IG9wYWNpdHk6IDAsIHNjYWxlOiAwLjk1LCB5OiAxMCB9fVxuICAgICAgICBhbmltYXRlPXt7IG9wYWNpdHk6IDEsIHNjYWxlOiAxLCB5OiAwIH19XG4gICAgICAgIGV4aXQ9e3sgb3BhY2l0eTogMCwgc2NhbGU6IDAuOTUsIHk6IDEwIH19XG4gICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy01eGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC81MCByb3VuZGVkLTJ4bCBzaGFkb3ctWzBfMF81MHB4X3JnYmEoMTY4LDg1LDI0NywwLjI1KV0gb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgbWF4LWgtWzkydmhdXCJcbiAgICAgID5cbiAgICAgICAgey8qIEhlYWRlciBSaWJib24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNSBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLXNsYXRlLTk1MCBib3JkZXItYiBib3JkZXItcHVycGxlLTUwMC80MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1wdXJwbGUtOTAwLzgwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC82MCB0ZXh0LXB1cnBsZS0yMDAgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwXCI+XG4gICAgICAgICAgICAgIDxaYXAgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXllbGxvdy0zMDAgYW5pbWF0ZS1ib3VuY2VcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBzbTp0ZXh0LXhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+TWFrc3ltYWxuaWUgS3LDs3RraWUgUG9sZWNlbmllIEZyZWV6ZSAmIFdzdHJ6eWtpd2FjeiBXdHljemVrPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS03MDAgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgMCBtcyBOdFN1c3BlbmQgKyBSZXBhcnNlIFNldmVyaW5nXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBCxYJ5c2thd2ljem5lIHphbXJvxbxlbmllIGthxbxkZWdvIHR5cHUgbWFsd2FyZSwgb2RjacSZY2llIHrFgsSFY3p5IGkgbGlua8OzdyBwbGlrw7N3IG9yYXogd3N0cnp5a25pxJljaWUga29kdSB1bmllcnVjaGFtaWFqxIVjZWdvIGRvIHdzenlzdGtpY2ggd3R5Y3playB3IHN5c3RlbWllLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b24gXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgIHRpdGxlPVwiWmFta25paiBva25vXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICDinJVcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEV4ZWN1dGlvbiBTdWNjZXNzIEFsZXJ0IEJhbm5lciAqL31cbiAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICB7ZXhlY3V0aW9uU3VjY2Vzc0Jhbm5lciAmJiAoXG4gICAgICAgICAgICA8bW90aW9uLmRpdiBcbiAgICAgICAgICAgICAgaW5pdGlhbD17eyBoZWlnaHQ6IDAsIG9wYWNpdHk6IDAgfX1cbiAgICAgICAgICAgICAgYW5pbWF0ZT17eyBoZWlnaHQ6ICdhdXRvJywgb3BhY2l0eTogMSB9fVxuICAgICAgICAgICAgICBleGl0PXt7IGhlaWdodDogMCwgb3BhY2l0eTogMCB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC05NTAgdmlhLXRlYWwtOTUwIHRvLWVtZXJhbGQtOTUwIGJvcmRlci1iIGJvcmRlci1lbWVyYWxkLTUwMC84MCBwLTMgcHgtNSB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtMjAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDAgYW5pbWF0ZS1wdWxzZSBzaHJpbmstMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICA8c3Ryb25nPlNVS0NFUyBXWUtPTkFOSUEgKDAgTVMpOjwvc3Ryb25nPiBaYW1yb8W8b25vIDxzdHJvbmc+e2V4ZWN1dGlvblN1Y2Nlc3NCYW5uZXIucHJvY2Vzc2VzfTwvc3Ryb25nPiBwcm9jZXPDs3cgbWFsd2FyZSwgb2RjacSZdG8gPHN0cm9uZz57ZXhlY3V0aW9uU3VjY2Vzc0Jhbm5lci5saW5rc308L3N0cm9uZz4gesWCxIVjenkgcGxpa8OzdyBpIHphYmxva293YW5vIDxzdHJvbmc+e2V4ZWN1dGlvblN1Y2Nlc3NCYW5uZXIucGx1Z2luc308L3N0cm9uZz4gd3R5Y3playB3IHN5c3RlbWllIVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05MDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAxMDAlIFpBQkVaUElFQ1pPTkVcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuXG4gICAgICAgIHsvKiBTY3JvbGxhYmxlIENvbnRlbnQgQm9keSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgc206cC02IG92ZXJmbG93LXktYXV0byBzcGFjZS15LTYgZmxleC0xIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgXG4gICAgICAgICAgey8qIFNFQ1RJT04gMTogVUxUUkEgU0hPUlQgQ09NTUFORCBHRU5FUkFUT1IgKDEtTElORVJTKSAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICA8VGVybWluYWwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0ZXh0LXNtIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgMS4gTUFLU1lNQUxOSUUgS1LDk1RLSUUgUE9MRUNFTklFIFpBTVJBxbtBSsSEQ0UgKFVMVFJBLVNIT1JUIDEtTElORVIpXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIETFgnVnb8WbxIc6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+e2N1cnJlbnRDbWQuY2hhckNvdW50fSB6bmFrw7N3PC9zdHJvbmc+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ29tbWFuZCBWYXJpYW50IFN3aXRjaGVyICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy01IGdhcC0yXCI+XG4gICAgICAgICAgICAgIHsoT2JqZWN0LmtleXMoVUxUUkFfU0hPUlRfQ09NTUFORFMpIGFzIEFycmF5PGtleW9mIHR5cGVvZiBVTFRSQV9TSE9SVF9DT01NQU5EUz4pLm1hcCgoaykgPT4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17a31cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ21kS2V5KGspfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQteGwgYm9yZGVyIHRleHQtY2VudGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQ21kS2V5ID09PSBrXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTkwMC85MCB0ZXh0LXdoaXRlIGJvcmRlci1wdXJwbGUtNDAwIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MCBmb250LWJsYWNrJ1xuICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC84MCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtODAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRydW5jYXRlXCI+e1VMVFJBX1NIT1JUX0NPTU1BTkRTW2tdLnRpdGxlLnNwbGl0KCcoJylbMF19PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1wdXJwbGUtMzAwIG9wYWNpdHktODBcIj57VUxUUkFfU0hPUlRfQ09NTUFORFNba10uY2hhckNvdW50fSB6bi48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNlbGVjdGVkIENvbW1hbmQgRGlzcGxheSAmIFF1aWNrIEFjdGlvbnMgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMiByZWxhdGl2ZVwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICB7Y3VycmVudENtZC50aXRsZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weUNvbW1hbmQoc2VsZWN0ZWRDbWRLZXksIGN1cnJlbnRDbWQuY29tbWFuZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1wdXJwbGUtOTUwIGhvdmVyOmJnLXB1cnBsZS05MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNjAwIHRleHQtcHVycGxlLTIwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIHRleHQtWzExcHhdIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2NvcGllZEtleSA9PT0gc2VsZWN0ZWRDbWRLZXkgPyAoXG4gICAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgICAgPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2tvcGlvd2FubyE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgICAgICA8Q29weSBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Lb3BpdWogMS1MaW5lcjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLWJsYWNrLzkwIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIHRleHQtWzExcHhdIG92ZXJmbG93LXgtYXV0byBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNTAgc2VsZWN0LWFsbCB3aGl0ZXNwYWNlLXByZS13cmFwIGJyZWFrLWFsbFwiPlxuICAgICAgICAgICAgICAgIHtjdXJyZW50Q21kLmNvbW1hbmR9XG4gICAgICAgICAgICAgIDwvcHJlPlxuXG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAg4oS577iPIHtjdXJyZW50Q21kLmV4cGxhbmF0aW9ufVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBTRUNUSU9OIDI6IEZJTEUgTElOS1MgJiBSRVBBUlNFIENPTk5FQ1RPUlMgKFrFgcSEQ1pBIEkgTElOS0kgUExJS8OTVykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMyBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxVbmxpbmsgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0ZXh0LXNtIHVwcGVyY2FzZSB0cmFja2luZy13aWRlclwiPlxuICAgICAgICAgICAgICAgICAgMi4gT0RDScSYQ0lFIFrFgcSEQ1pZIEkgTElOS8OTVyBNScSYRFpZIFBMSUtBTUkgKE5URlMgSlVOQ1RJT05TLCBTWU1MSU5LUywgSVBDKVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgWmlkZW50eWZpa293YW5vOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57bGlua3MubGVuZ3RofSB6xYLEhWN6eTwvc3Ryb25nPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC0yLjVcIj5cbiAgICAgICAgICAgICAge2xpbmtzLm1hcCgobGluaykgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2V2ZXJlZCA9IGxpbmsuc3RhdHVzID09PSAnU0VWRVJFRF9GUkVFWkVEJztcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgICAga2V5PXtsaW5rLmlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTMgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgICBpc1NldmVyZWQgXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC01MDAvNjAnIFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzgwIGJvcmRlci1yZWQtNTAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtcHVycGxlLTMwMCB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtsaW5rLmxpbmtUeXBlfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBib3JkZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2V2ZXJlZCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC02MDAnIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXItcmVkLTcwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtpc1NldmVyZWQgPyAnT0RDScSYVEUgJiBaQU1ST8W7T05FICgwIE1TKScgOiBgUllaWUtPIEVTS0FMQUNKSTogJHtsaW5rLnJpc2tTY29yZX0lYH1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0wLjUgdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRydW5jYXRlXCIgdGl0bGU9e2xpbmsuc291cmNlUGF0aH0+XG4gICAgICAgICAgICAgICAgICAgICAgICDFuXLDs2TFgm86IDxjb2RlIGNsYXNzTmFtZT1cInRleHQteWVsbG93LTMwMFwiPntsaW5rLnNvdXJjZVBhdGh9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGVcIiB0aXRsZT17bGluay50YXJnZXRUYXJnZXR9PlxuICAgICAgICAgICAgICAgICAgICAgICAgQ2VsIC8gSG9vazogPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwXCI+e2xpbmsudGFyZ2V0VGFyZ2V0fTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFNFQ1RJT04gMzogSU1NT0JJTElaQVRJT04gQ09ERSBJTkpFQ1RFRCBJTlRPIEFMTCBQTFVHSU5TICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRleHQtc20gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyXCI+XG4gICAgICAgICAgICAgICAgICAzLiBLT0QgVU5JRVJVQ0hBTUlBSsSEQ1kgV1BJU0FOWSBXIEtBxbtExIQgV1RZQ1pLxJggU1lTVEVNT1fEhFxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgICBXdHljemtpIHcgc3lzdGVtaWU6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPntwbHVnaW5zLmxlbmd0aH0gY2hyb25pb255Y2g8L3N0cm9uZz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQbHVnaW4gQ2FyZHMgTGlzdCAmIEluc3BlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIHsvKiBMZWZ0IENvbHVtbjogUGx1Z2luIHNlbGVjdG9yIGxpc3QgKDUgY29scykgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICB7cGx1Z2lucy5tYXAoKHBsdWdpbikgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHBsdWdpbi5pZCA9PT0gc2VsZWN0ZWRQbHVnaW5JZDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGlzSW1tb2JpbGl6ZWQgPSBwbHVnaW4uc3RhdHVzID09PSAnSU1NT0JJTElaRUQnO1xuXG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAga2V5PXtwbHVnaW4uaWR9XG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRQbHVnaW5JZChwbHVnaW4uaWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMi41IHJvdW5kZWQteGwgYm9yZGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkIFxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1jeWFuLTk1MC84MCBib3JkZXItY3lhbi00MDAgc2hhZG93LW1kIHNoYWRvdy1jeWFuLTk1MCcgXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC84MCBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1zbGF0ZS03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC1bMTFweF0gdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3BsdWdpbi5uYW1lfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMS41IHB5LTAuMiByb3VuZGVkIHRleHQtWzlweF0gZm9udC1ib2xkIGJvcmRlciAke1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpc0ltbW9iaWxpemVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXItZW1lcmFsZC02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmcteWVsbG93LTk1MCB0ZXh0LXllbGxvdy0zMDAgYm9yZGVyLXllbGxvdy03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICB9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtpc0ltbW9iaWxpemVkID8gJ1pBQkxPS09XQU5BJyA6ICdHT1RPV0EnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cGx1Z2luLmNhdGVnb3J5TGFiZWx9XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzlweF0gdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gbXQtMC41IHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICBXc3RyenlrbmnEmWNpZToge3BsdWdpbi5pbW1vYmlsaXphdGlvbk1ldGhvZH1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBDb2RlIHNuaXBwZXQgcHJldmlldyAoNyBjb2xzKSAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLXNsYXRlLTkwMC85MCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHAtMyBzcGFjZS15LTIgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1jeWFuLTMwMCB0ZXh0LVsxMXB4XSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENvZGUyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBLb2QgV3N0cnp5a2l3YW55OiB7c2VsZWN0ZWRQbHVnaW4uY2F0ZWdvcnlMYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weUNvbW1hbmQoc2VsZWN0ZWRQbHVnaW4uaWQsIHNlbGVjdGVkUGx1Z2luLmNvZGVTbmlwcGV0KX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTBweF0gZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIHtjb3BpZWRLZXkgPT09IHNlbGVjdGVkUGx1Z2luLmlkID8gJ1Nrb3Bpb3dhbm8hJyA6ICdLb3BpdWogS29kIFd0eWN6a2knfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQtbGcgYmctYmxhY2sgdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gdGV4dC1bMTBweF0gb3ZlcmZsb3cteC1hdXRvIGJvcmRlciBib3JkZXItY3lhbi05MDAvNDAgbWF4LWgtNTYgc2VsZWN0LWFsbCB3aGl0ZXNwYWNlLXByZVwiPlxuICAgICAgICAgICAgICAgICAgICB7c2VsZWN0ZWRQbHVnaW4uY29kZVNuaXBwZXR9XG4gICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICDFmmNpZcW8a2EgaW5zdGFsYWNqaTogPGNvZGUgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+e3NlbGVjdGVkUGx1Z2luLnBhdGh9PC9jb2RlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRhY3RpY2FsIEZvb3RlciB3aXRoIE1hc3RlciBFeGVjdXRpb24gQnV0dG9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Pc3RhdG5pZSB3eWtvbmFuaWU6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPnt0ZWxlbWV0cnkubGFzdFJ1blRpbWVzdGFtcH08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBzbTp3LWF1dG9cIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUmVzZXR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgZm9udC1ib2xkIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUmVzZXR1alxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhlY3V0ZUFsbH1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzRXhlY3V0aW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgc206ZmxleC1pbml0aWFsIHB4LTUgcHktMiByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHZpYS1waW5rLTYwMCB0by1yZWQtNjAwIGhvdmVyOmZyb20tcHVycGxlLTUwMCBob3Zlcjp0by1yZWQtNTAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAvNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNDAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzRXhlY3V0aW5nID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPldzdHJ6eWtpd2FuaWUgdyB0b2t1Li4uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMzAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlVydWNob20gUG9sZWNlbmllICYgV3N0cnp5a25paiBkbyBXc3p5c3RraWNoIFd0eWN6ZWsgKDAgbXMpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L21vdGlvbi5kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFzRmMsU0ErRk0sVUEvRk47QUF0RmQsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0MsU0FBUyxRQUFRLHVCQUF1QjtBQUN4QztBQUFBLEVBQ0U7QUFBQSxFQUE4QztBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFDM0Q7QUFBQSxFQUFlO0FBQUEsRUFBYztBQUFBLEVBQWdCO0FBQUEsRUFDckI7QUFBQSxFQUF1QztBQUFBLE9BQzFEO0FBQ1A7QUFBQSxFQUNFO0FBQUEsRUFBb0I7QUFBQSxPQUVmO0FBUUEsYUFBTSx3QkFBOEQsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsU0FBUyxVQUFVLElBQUksU0FBZ0MsTUFBTSxtQkFBbUIsV0FBVyxDQUFDO0FBQ25HLFFBQU0sQ0FBQyxPQUFPLFFBQVEsSUFBSSxTQUFrQyxNQUFNLG1CQUFtQixTQUFTLENBQUM7QUFDL0YsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQStCLE1BQU0sbUJBQW1CLGFBQWEsQ0FBQztBQUN4RyxRQUFNLENBQUMsZ0JBQWdCLGlCQUFpQixJQUFJLFNBQTRDLFlBQVk7QUFDcEcsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUFpQixRQUFRLENBQUMsR0FB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