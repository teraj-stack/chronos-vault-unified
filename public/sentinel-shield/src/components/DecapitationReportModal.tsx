import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const React = __vite__cjsImport1_react.__esModule ? __vite__cjsImport1_react.default : __vite__cjsImport1_react; const useState = __vite__cjsImport1_react["useState"];
import {
  Skull,
  Flame,
  ShieldCheck,
  Download,
  Trash2,
  X,
  Sparkles
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { browserMalwareAutoScanner } from "/sentinel-shield/src/utils/browserMalwareAutoScanner.ts";
export const DecapitationReportModal = ({
  isOpen,
  onClose
}) => {
  const [scannerState, setScannerState] = useState(() => browserMalwareAutoScanner.getState());
  const [filterLevel, setFilterLevel] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  React.useEffect(() => {
    const unsub = browserMalwareAutoScanner.subscribe((s) => setScannerState(s));
    return () => unsub();
  }, []);
  if (!isOpen) return null;
  const handleDownloadTxt = () => {
    const reportText = browserMalwareAutoScanner.generateForensicDecapitationReportText();
    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel_malware_decapitation_report_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const handleTriggerManualScan = () => {
    browserMalwareAutoScanner.performScanCycle(true);
  };
  const filteredHistory = scannerState.decapitatedHistory.filter((item) => {
    const matchesFilter = filterLevel === "ALL" || item.threatLevel === filterLevel;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.vectorLocation.toLowerCase().includes(searchQuery.toLowerCase()) || item.threatType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-950 border-2 border-rose-500/80 shadow-[0_0_60px_rgba(244,63,94,0.35)] overflow-hidden", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 border-b border-rose-500/30 bg-gradient-to-r from-rose-950/80 via-slate-950 to-slate-900 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-2xl bg-rose-900/60 border border-rose-500/80 text-rose-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-6 h-6 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 62,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 61,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black font-mono text-white tracking-wider", children: "ROZKAZ: UBÓJ GNID • TRWAŁE UNIESZKODLIWIENIE & ROZFRAGMENTOWANIE" }, void 0, false, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 66,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950 border border-rose-500 text-rose-300", children: "REAKCJA 0 MS" }, void 0, false, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 69,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 65,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 font-mono mt-0.5", children: [
            /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-400", children: 'Rozkaz "Ubój gnid"' }, void 0, false, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 74,
              columnNumber: 17
            }, this),
            " = Trwałe unieszkodliwienie (ścięcie PE/MZ, odebranie tokenów ACL) i natychmiastowe rozfragmentowanie kodu malware w pamięci RAM/VRAM."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 73,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 64,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl bg-slate-900 hover:bg-rose-950 border border-slate-700 hover:border-rose-500/50 text-slate-400 hover:text-white transition-all cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 79,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 59,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-900/50 border-b border-slate-800 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[10px]", children: "STAN AUTOSKANERA" }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 90,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-emerald-400 font-black flex items-center gap-1.5 mt-0.5", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 92,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: scannerState.isAutoScanEnabled ? "WŁĄCZONY" : "WYŁĄCZONY" }, void 0, false, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 93,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 91,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 89,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[10px]", children: "ŁĄCZNA LICZBA SKANÓW" }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 98,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-cyan-300 font-black mt-0.5", children: [
          scannerState.totalScansCount,
          " cykli"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 99,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 97,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-rose-900/40", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[10px]", children: "ZDEKAPITOWANE MALWARE" }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 103,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-rose-400 font-black mt-0.5", children: [
          scannerState.totalDecapitatedCount,
          " obiektów"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 104,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 102,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-slate-950/80 border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[10px]", children: "WYFRAGMENTOWANY RAM" }, void 0, false, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "text-amber-400 font-black mt-0.5", children: [
          (scannerState.totalDefragmentedBytesKb / 1024).toFixed(2),
          " MB"
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 88,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950/90 border-b border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => browserMalwareAutoScanner.toggleAutoScan(),
            className: `px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${scannerState.isAutoScanEnabled ? "bg-emerald-950 text-emerald-300 border-emerald-500 hover:bg-emerald-900" : "bg-slate-900 text-slate-400 border-slate-700 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 124,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: scannerState.isAutoScanEnabled ? "Auto-Skan: WŁĄCZONY" : "Auto-Skan: WYŁĄCZONY" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 125,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 116,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleTriggerManualScan,
            disabled: scannerState.isCurrentlyScanning,
            className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: `w-3.5 h-3.5 ${scannerState.isCurrentlyScanning ? "animate-spin" : "animate-bounce"}` }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 133,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: scannerState.isCurrentlyScanning ? "SKANOWANIE & DEKAPITACJA..." : "SKANUJ & DEKAPITUJ TERAZ" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 134,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 128,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800 text-[10px]", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Interwał:" }, void 0, false, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 139,
            columnNumber: 15
          }, this),
          [2, 4, 8].map((sec) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => browserMalwareAutoScanner.setScanInterval(sec),
              className: `px-1.5 py-0.5 rounded cursor-pointer ${scannerState.scanIntervalSeconds === sec ? "bg-rose-500 text-white font-bold" : "text-slate-400 hover:text-white"}`,
              children: [
                sec,
                "s"
              ]
            },
            sec,
            true,
            {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 141,
              columnNumber: 17
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 138,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 115,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "input",
          {
            type: "text",
            placeholder: "Filtruj malware...",
            value: searchQuery,
            onChange: (e) => setSearchQuery(e.target.value),
            className: "px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-rose-500 w-full sm:w-44"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 157,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadTxt,
            className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/50 text-cyan-300 font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0",
            title: "Pobierz pełny raport kryminalistyczny z dekapitacji i defragmentacji w pliku .txt",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 170,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Raport .txt" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 171,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 165,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 156,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 114,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-4 space-y-3 max-h-[480px]", children: filteredHistory.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-center py-12 text-slate-500 font-mono text-xs", children: "Brak zarejestrowanych zagrożeń spełniających wybrane kryteria filtracji." }, void 0, false, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 179,
      columnNumber: 13
    }, this) : filteredHistory.map((threat) => /* @__PURE__ */ jsxDEV(
      "div",
      {
        className: "p-4 rounded-2xl bg-slate-900/90 border border-rose-900/50 hover:border-rose-500/60 transition-all font-mono space-y-2 text-xs",
        children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "p-1.5 rounded-lg bg-rose-950 border border-rose-600 text-rose-300", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 191,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 190,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "font-black text-white text-sm", children: threat.name }, void 0, false, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 194,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: [
                  threat.threatType,
                  " • ID/PID: ",
                  /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300 font-bold", children: threat.pidOrHwnd }, void 0, false, {
                    fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                    lineNumber: 196,
                    columnNumber: 55
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 195,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 193,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 189,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded-full text-[10px] font-bold border ${threat.threatLevel === "CRITICAL" ? "bg-rose-950 text-rose-300 border-rose-600" : threat.threatLevel === "HIGH" ? "bg-amber-950 text-amber-300 border-amber-600" : "bg-yellow-950 text-yellow-300 border-yellow-600"}`, children: threat.threatLevel }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 202,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: threat.decapitationTimestamp }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 211,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 201,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 188,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/80", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-rose-900/60", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-rose-400 font-bold flex items-center gap-1 mb-0.5", children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: "w-3 h-3 text-rose-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 218,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "TRWAŁE UNIESZKODLIWIENIE (ŚCIĘCIE PE/MZ):" }, void 0, false, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 219,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 217,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 text-[10px] leading-relaxed", children: threat.decapitationMethod }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 221,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 216,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-slate-950 border border-amber-900/60", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "text-amber-400 font-bold flex items-center gap-1 mb-0.5", children: [
                /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-3 h-3 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 226,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "ROZFRAGMENTOWANIE KODU (",
                  threat.shreddedBytesKb,
                  " KB):"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                  lineNumber: 227,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 225,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 text-[10px] leading-relaxed", children: threat.defragmentationStatus }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 229,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 224,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 215,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-[10px] text-slate-500 pt-1", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Wektor: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-400", children: threat.vectorLocation }, void 0, false, {
                fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
                lineNumber: 234,
                columnNumber: 33
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 234,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: [
              "Pewność: ",
              threat.confidenceScore,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 235,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ]
      },
      threat.id,
      true,
      {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 184,
        columnNumber: 15
      },
      this
    )) }, void 0, false, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 177,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between font-mono text-xs", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 text-[11px]", children: "Skanowanie Browser DWM / DOM / VRAM / WebSockets • Sentinel Auto-Decapitation Blade" }, void 0, false, {
        fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
        lineNumber: 244,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => browserMalwareAutoScanner.clearHistory(),
          className: "px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-rose-950 border border-slate-800 hover:border-rose-700/50 text-slate-400 hover:text-rose-300 flex items-center gap-1.5 cursor-pointer transition-all",
          children: [
            /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 251,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wyczyść Historię" }, void 0, false, {
              fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
              lineNumber: 252,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
          lineNumber: 247,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
      lineNumber: 243,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
    lineNumber: 56,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/DecapitationReportModal.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlY2FwaXRhdGlvblJlcG9ydE1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2t1bGwsIEZsYW1lLCBaYXAsIFNoaWVsZENoZWNrLCBEb3dubG9hZCwgVHJhc2gyLCBcbiAgQ2hlY2tDaXJjbGUyLCBBbGVydFRyaWFuZ2xlLCBSZWZyZXNoQ3csIFgsIEZpbGVUZXh0LCBMYXllcnMsXG4gIFRlcm1pbmFsLCBTaGllbGRBbGVydCwgQ3B1LCBTcGFya2xlc1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgYnJvd3Nlck1hbHdhcmVBdXRvU2Nhbm5lciwgRGVjYXBpdGF0ZWRNYWx3YXJlVGhyZWF0LCBCcm93c2VyQXV0b1NjYW5TdGF0ZSB9IGZyb20gJy4uL3V0aWxzL2Jyb3dzZXJNYWx3YXJlQXV0b1NjYW5uZXInO1xuXG5pbnRlcmZhY2UgRGVjYXBpdGF0aW9uUmVwb3J0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IERlY2FwaXRhdGlvblJlcG9ydE1vZGFsOiBSZWFjdC5GQzxEZWNhcGl0YXRpb25SZXBvcnRNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZVxufSkgPT4ge1xuICBjb25zdCBbc2Nhbm5lclN0YXRlLCBzZXRTY2FubmVyU3RhdGVdID0gdXNlU3RhdGU8QnJvd3NlckF1dG9TY2FuU3RhdGU+KCgpID0+IGJyb3dzZXJNYWx3YXJlQXV0b1NjYW5uZXIuZ2V0U3RhdGUoKSk7XG4gIGNvbnN0IFtmaWx0ZXJMZXZlbCwgc2V0RmlsdGVyTGV2ZWxdID0gdXNlU3RhdGU8J0FMTCcgfCAnQ1JJVElDQUwnIHwgJ0hJR0gnIHwgJ01FRElVTSc+KCdBTEwnKTtcbiAgY29uc3QgW3NlYXJjaFF1ZXJ5LCBzZXRTZWFyY2hRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCB1bnN1YiA9IGJyb3dzZXJNYWx3YXJlQXV0b1NjYW5uZXIuc3Vic2NyaWJlKHMgPT4gc2V0U2Nhbm5lclN0YXRlKHMpKTtcbiAgICByZXR1cm4gKCkgPT4gdW5zdWIoKTtcbiAgfSwgW10pO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFR4dCA9ICgpID0+IHtcbiAgICBjb25zdCByZXBvcnRUZXh0ID0gYnJvd3Nlck1hbHdhcmVBdXRvU2Nhbm5lci5nZW5lcmF0ZUZvcmVuc2ljRGVjYXBpdGF0aW9uUmVwb3J0VGV4dCgpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbcmVwb3J0VGV4dF0sIHsgdHlwZTogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gYHNlbnRpbmVsX21hbHdhcmVfZGVjYXBpdGF0aW9uX3JlcG9ydF8ke0RhdGUubm93KCl9LnR4dGA7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgICBhLmNsaWNrKCk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlVHJpZ2dlck1hbnVhbFNjYW4gPSAoKSA9PiB7XG4gICAgYnJvd3Nlck1hbHdhcmVBdXRvU2Nhbm5lci5wZXJmb3JtU2NhbkN5Y2xlKHRydWUpO1xuICB9O1xuXG4gIGNvbnN0IGZpbHRlcmVkSGlzdG9yeSA9IHNjYW5uZXJTdGF0ZS5kZWNhcGl0YXRlZEhpc3RvcnkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgIGNvbnN0IG1hdGNoZXNGaWx0ZXIgPSBmaWx0ZXJMZXZlbCA9PT0gJ0FMTCcgfHwgaXRlbS50aHJlYXRMZXZlbCA9PT0gZmlsdGVyTGV2ZWw7XG4gICAgY29uc3QgbWF0Y2hlc1NlYXJjaCA9IGl0ZW0ubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0udmVjdG9yTG9jYXRpb24udG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLnRocmVhdFR5cGUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyhzZWFyY2hRdWVyeS50b0xvd2VyQ2FzZSgpKTtcbiAgICByZXR1cm4gbWF0Y2hlc0ZpbHRlciAmJiBtYXRjaGVzU2VhcmNoO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay84MCBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LTR4bCBtYXgtaC1bOTB2aF0gZmxleCBmbGV4LWNvbCByb3VuZGVkLTN4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLXJvc2UtNTAwLzgwIHNoYWRvdy1bMF8wXzYwcHhfcmdiYSgyNDQsNjMsOTQsMC4zNSldIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICBcbiAgICAgICAgey8qIE1vZGFsIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgYm9yZGVyLWIgYm9yZGVyLXJvc2UtNTAwLzMwIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yb3NlLTk1MC84MCB2aWEtc2xhdGUtOTUwIHRvLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLTJ4bCBiZy1yb3NlLTkwMC82MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwLzgwIHRleHQtcm9zZS0zMDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTYgaC02IGFuaW1hdGUtcHVsc2VcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWxnIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZXJcIj5cbiAgICAgICAgICAgICAgICAgIFJPWktBWjogVULDk0ogR05JRCDigKIgVFJXQcWBRSBVTklFU1pLT0RMSVdJRU5JRSAmIFJPWkZSQUdNRU5UT1dBTklFXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCBiZy1yb3NlLTk1MCBib3JkZXIgYm9yZGVyLXJvc2UtNTAwIHRleHQtcm9zZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIFJFQUtDSkEgMCBNU1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1yb3NlLTQwMFwiPlJvemtheiBcIlViw7NqIGduaWRcIjwvc3Ryb25nPiA9IFRyd2HFgmUgdW5pZXN6a29kbGl3aWVuaWUgKMWbY2nEmWNpZSBQRS9NWiwgb2RlYnJhbmllIHRva2Vuw7N3IEFDTCkgaSBuYXR5Y2htaWFzdG93ZSByb3pmcmFnbWVudG93YW5pZSBrb2R1IG1hbHdhcmUgdyBwYW1pxJljaSBSQU0vVlJBTS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXJvc2UtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1yb3NlLTUwMC81MCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8WCBjbGFzc05hbWU9XCJ3LTUgaC01XCIgLz5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFN0YXRzIFJvdyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zIHAtNCBiZy1zbGF0ZS05MDAvNTAgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XVwiPlNUQU4gQVVUT1NLQU5FUkE8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJsYWNrIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgbXQtMC41XCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntzY2FubmVyU3RhdGUuaXNBdXRvU2NhbkVuYWJsZWQgPyAnV8WBxIRDWk9OWScgOiAnV1nFgcSEQ1pPTlknfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIHRleHQtWzEwcHhdXCI+xYHEhENaTkEgTElDWkJBIFNLQU7Dk1c8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LWJsYWNrIG10LTAuNVwiPntzY2FubmVyU3RhdGUudG90YWxTY2Fuc0NvdW50fSBjeWtsaTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC0yeGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItcm9zZS05MDAvNDBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTBweF1cIj5aREVLQVBJVE9XQU5FIE1BTFdBUkU8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yb3NlLTQwMCBmb250LWJsYWNrIG10LTAuNVwiPntzY2FubmVyU3RhdGUudG90YWxEZWNhcGl0YXRlZENvdW50fSBvYmlla3TDs3c8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtMnhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMHB4XVwiPldZRlJBR01FTlRPV0FOWSBSQU08L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1hbWJlci00MDAgZm9udC1ibGFjayBtdC0wLjVcIj57KHNjYW5uZXJTdGF0ZS50b3RhbERlZnJhZ21lbnRlZEJ5dGVzS2IgLyAxMDI0KS50b0ZpeGVkKDIpfSBNQjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQWN0aW9uIENvbnRyb2xzICYgRmlsdGVycyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtOTUwLzkwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdHJldGNoIHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgZm9udC1tb25vIHRleHQteHNcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBicm93c2VyTWFsd2FyZUF1dG9TY2FubmVyLnRvZ2dsZUF1dG9TY2FuKCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQteGwgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgc2Nhbm5lclN0YXRlLmlzQXV0b1NjYW5FbmFibGVkXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlci1lbWVyYWxkLTUwMCBob3ZlcjpiZy1lbWVyYWxkLTkwMCdcbiAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItc2xhdGUtNzAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj57c2Nhbm5lclN0YXRlLmlzQXV0b1NjYW5FbmFibGVkID8gJ0F1dG8tU2thbjogV8WBxIRDWk9OWScgOiAnQXV0by1Ta2FuOiBXWcWBxIRDWk9OWSd9PC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlVHJpZ2dlck1hbnVhbFNjYW59XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtzY2FubmVyU3RhdGUuaXNDdXJyZW50bHlTY2FubmluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcm9zZS02MDAgdG8tYW1iZXItNjAwIGhvdmVyOmZyb20tcm9zZS01MDAgaG92ZXI6dG8tYW1iZXItNTAwIHRleHQtd2hpdGUgZm9udC1ibGFjayBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPXtgdy0zLjUgaC0zLjUgJHtzY2FubmVyU3RhdGUuaXNDdXJyZW50bHlTY2FubmluZyA/ICdhbmltYXRlLXNwaW4nIDogJ2FuaW1hdGUtYm91bmNlJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57c2Nhbm5lclN0YXRlLmlzQ3VycmVudGx5U2Nhbm5pbmcgPyAnU0tBTk9XQU5JRSAmIERFS0FQSVRBQ0pBLi4uJyA6ICdTS0FOVUogJiBERUtBUElUVUogVEVSQVonfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogSW50ZXJ2YWwgU2VsZWN0b3IgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGJnLXNsYXRlLTkwMCBweC0yIHB5LTEgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMHB4XVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPkludGVyd2HFgjo8L3NwYW4+XG4gICAgICAgICAgICAgIHtbMiwgNCwgOF0ubWFwKHNlYyA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzZWN9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBicm93c2VyTWFsd2FyZUF1dG9TY2FubmVyLnNldFNjYW5JbnRlcnZhbChzZWMpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMS41IHB5LTAuNSByb3VuZGVkIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIHNjYW5uZXJTdGF0ZS5zY2FuSW50ZXJ2YWxTZWNvbmRzID09PSBzZWNcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3NlY31zXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZpbHRydWogbWFsd2FyZS4uLlwiXG4gICAgICAgICAgICAgIHZhbHVlPXtzZWFyY2hRdWVyeX1cbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTZWFyY2hRdWVyeShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgdGV4dC14cyBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1yb3NlLTUwMCB3LWZ1bGwgc206dy00NFwiXG4gICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkVHh0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC81MCB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNocmluay0wXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHBlxYJueSByYXBvcnQga3J5bWluYWxpc3R5Y3pueSB6IGRla2FwaXRhY2ppIGkgZGVmcmFnbWVudGFjamkgdyBwbGlrdSAudHh0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5SYXBvcnQgLnR4dDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogRGVjYXBpdGF0ZWQgVGhyZWF0cyBMaXN0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBvdmVyZmxvdy15LWF1dG8gcC00IHNwYWNlLXktMyBtYXgtaC1bNDgwcHhdXCI+XG4gICAgICAgICAge2ZpbHRlcmVkSGlzdG9yeS5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtY2VudGVyIHB5LTEyIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgICAgIEJyYWsgemFyZWplc3Ryb3dhbnljaCB6YWdyb8W8ZcWEIHNwZcWCbmlhasSFY3ljaCB3eWJyYW5lIGtyeXRlcmlhIGZpbHRyYWNqaS5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICBmaWx0ZXJlZEhpc3RvcnkubWFwKCh0aHJlYXQpID0+IChcbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGtleT17dGhyZWF0LmlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1yb3NlLTkwMC81MCBob3Zlcjpib3JkZXItcm9zZS01MDAvNjAgdHJhbnNpdGlvbi1hbGwgZm9udC1tb25vIHNwYWNlLXktMiB0ZXh0LXhzXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMS41IHJvdW5kZWQtbGcgYmctcm9zZS05NTAgYm9yZGVyIGJvcmRlci1yb3NlLTYwMCB0ZXh0LXJvc2UtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJsYWNrIHRleHQtd2hpdGUgdGV4dC1zbVwiPnt0aHJlYXQubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dGhyZWF0LnRocmVhdFR5cGV9IOKAoiBJRC9QSUQ6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDAgZm9udC1ib2xkXCI+e3RocmVhdC5waWRPckh3bmR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgYm9yZGVyICR7XG4gICAgICAgICAgICAgICAgICAgICAgdGhyZWF0LnRocmVhdExldmVsID09PSAnQ1JJVElDQUwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlci1yb3NlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdGhyZWF0LnRocmVhdExldmVsID09PSAnSElHSCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCBib3JkZXItYW1iZXItNjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmcteWVsbG93LTk1MCB0ZXh0LXllbGxvdy0zMDAgYm9yZGVyLXllbGxvdy02MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfT5cbiAgICAgICAgICAgICAgICAgICAgICB7dGhyZWF0LnRocmVhdExldmVsfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+e3RocmVhdC5kZWNhcGl0YXRpb25UaW1lc3RhbXB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC1bMTFweF0gcHQtMSBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItcm9zZS05MDAvNjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJvc2UtNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBtYi0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5UUldBxYFFIFVOSUVTWktPRExJV0lFTklFICjFmkNJxJhDSUUgUEUvTVopOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTBweF0gbGVhZGluZy1yZWxheGVkXCI+e3RocmVhdC5kZWNhcGl0YXRpb25NZXRob2R9PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWFtYmVyLTkwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYW1iZXItNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBtYi0wLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U3BhcmtsZXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Uk9aRlJBR01FTlRPV0FOSUUgS09EVSAoe3RocmVhdC5zaHJlZGRlZEJ5dGVzS2J9IEtCKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIHRleHQtWzEwcHhdIGxlYWRpbmctcmVsYXhlZFwiPnt0aHJlYXQuZGVmcmFnbWVudGF0aW9uU3RhdHVzfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBwdC0xXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XZWt0b3I6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj57dGhyZWF0LnZlY3RvckxvY2F0aW9ufTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+UGV3bm/Fm8SHOiB7dGhyZWF0LmNvbmZpZGVuY2VTY29yZX0lPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vZGFsIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtOTUwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LXhzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgU2thbm93YW5pZSBCcm93c2VyIERXTSAvIERPTSAvIFZSQU0gLyBXZWJTb2NrZXRzIOKAoiBTZW50aW5lbCBBdXRvLURlY2FwaXRhdGlvbiBCbGFkZVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGJyb3dzZXJNYWx3YXJlQXV0b1NjYW5uZXIuY2xlYXJIaXN0b3J5KCl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1yb3NlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcm9zZS03MDAvNTAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1yb3NlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VHJhc2gyIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPld5Y3p5xZvEhyBIaXN0b3JpxJk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTZEYztBQTdEZCxPQUFPLFNBQVMsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQU87QUFBQSxFQUFZO0FBQUEsRUFBYTtBQUFBLEVBQVU7QUFBQSxFQUNGO0FBQUEsRUFDWjtBQUFBLE9BQ3ZCO0FBQ1AsU0FBUyxpQ0FBaUY7QUFPbkYsYUFBTSwwQkFBa0UsQ0FBQztBQUFBLEVBQzlFO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsY0FBYyxlQUFlLElBQUksU0FBK0IsTUFBTSwwQkFBMEIsU0FBUyxDQUFDO0FBQ2pILFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFpRCxLQUFLO0FBQzVGLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFFakQsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxRQUFRLDBCQUEwQixVQUFVLE9BQUssZ0JBQWdCLENBQUMsQ0FBQztBQUN6RSxXQUFPLE1BQU0sTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsTUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixRQUFNLG9CQUFvQixNQUFNO0FBQzlCLFVBQU0sYUFBYSwwQkFBMEIsdUNBQXVDO0FBQ3BGLFVBQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxVQUFV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