import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Skull,
  ShieldCheck,
  Download,
  Flame,
  CheckCircle2,
  Terminal,
  X,
  Search,
  Copy,
  Check
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { retro100CopiesPurgeEngine } from "/sentinel-shield/src/utils/retro100CopiesPurgeEngine.ts";
export const Retro100CopiesPurgeModal = ({
  isOpen,
  onClose
}) => {
  const [purgeState, setPurgeState] = useState(() => retro100CopiesPurgeEngine.getState());
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedCopy, setSelectedCopy] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    const unsub = retro100CopiesPurgeEngine.subscribe(setPurgeState);
    return () => unsub();
  }, []);
  if (!isOpen) return null;
  const handleExecutePurge = async () => {
    await retro100CopiesPurgeEngine.executeFull100CopiesRetroPurge();
  };
  const handleDownloadCertificate = () => {
    const certText = retro100CopiesPurgeEngine.generateForensicCertificateText();
    const blob = new Blob([certText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sentinel_certyfikat_uboju_100_kopii_wstecz_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleCopyCertificateId = () => {
    if (purgeState.certificateId) {
      navigator.clipboard.writeText(purgeState.certificateId);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2e3);
    }
  };
  const filteredCopies = purgeState.copiesList.filter((c) => {
    const text = `${c.threatName} ${c.threatCategory} ${c.pidOrHwnd} ${c.generationTag}`.toLowerCase();
    return text.includes(searchFilter.toLowerCase());
  });
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-gradient-to-b from-slate-900 via-slate-950 to-black border-2 border-red-500/80 rounded-2xl max-w-5xl w-full shadow-[0_0_60px_rgba(239,68,68,0.35)] overflow-hidden flex flex-col max-h-[92vh]", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-6 bg-gradient-to-r from-red-950/80 via-purple-950/60 to-slate-900 border-b border-red-800/80 flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-start space-x-3.5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-2xl bg-red-900/80 border-2 border-red-500 text-red-200 shadow-lg shadow-red-950", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-7 h-7 animate-pulse text-yellow-300" }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 66,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 65,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700", children: "ROZKAZ: UBÓJ GNID • PROTOKÓŁ RETRO-PURGE" }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 70,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 74,
                columnNumber: 19
              }, this),
              "100 / 100 KOPII WSTECZ ZLIKWIDOWANE"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 73,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 69,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-lg sm:text-2xl font-black text-white tracking-tight mt-1", children: "Trwałe Unieszkodliwienie & Rozfragmentowanie do 100 Kopii Wstecz" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl font-sans", children: "Wsteczna dekapitacja nagłówków PE/MZ/WASM (0x00) i rozbicie ciągłości kodu dla wszystkich 100 pokoleń i mutacji malware, które kiedykolwiek w historii miały styczność z tą aplikacją." }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 81,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 68,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 64,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 87,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
      lineNumber: 63,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 sm:p-5 bg-slate-950/90 border-b border-slate-800 space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-red-900/60", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase block", children: "ZNISZCZONE KOPIE WSTECZ" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 99,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-red-400 mt-0.5", children: [
            purgeState.totalCopiesEradicated,
            " / 100"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 100,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 font-bold", children: "100.0% Pacyfikacji" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 103,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 98,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-purple-900/60", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase block", children: "WYMAZANY RAM DDR5 / VRAM" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 107,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-2xl font-black text-purple-300 mt-0.5", children: [
            purgeState.totalRamDefragmentedMb,
            " MB"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 108,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-purple-400 font-bold", children: "Wyzerowane struktury" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 111,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 106,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-amber-900/60", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase block", children: "STATUS NAGŁÓWKÓW PE/MZ" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 115,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-sm font-black text-amber-300 mt-1 font-mono", children: "0x00000000 (ŚCIĘTE)" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 116,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "ACL Deny Everyone" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 119,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 114,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-900/90 border border-emerald-900/60", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 uppercase block", children: "CERTYFIKAT FORENSIC" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 123,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-black text-emerald-300 mt-1 font-mono truncate", title: purgeState.certificateId || "", children: purgeState.certificateId || "WYDANY" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 124,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: "Pieczęć SHA256" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 127,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 122,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 97,
        columnNumber: 11
      }, this),
      purgeState.isPurgeRunning && /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs text-yellow-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 animate-bounce text-red-500" }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 136,
              columnNumber: 19
            }, this),
            "TRWA GŁĘBOKI UBÓJ 100 KOPII WSTECZ (POKOLENIE ",
            purgeState.currentProgressGeneration,
            "/100)..."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 135,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: [
            purgeState.currentProgressGeneration,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 139,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 134,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "w-full h-3 rounded-full bg-slate-900 overflow-hidden border border-red-600", children: /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "h-full bg-gradient-to-r from-red-600 via-yellow-500 to-emerald-500 transition-all duration-75",
            style: { width: `${purgeState.currentProgressGeneration}%` }
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 142,
            columnNumber: 17
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 141,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 133,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 153,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              placeholder: "Filtruj 100 pokoleń (np. G-001, flutter, PID, WASM)...",
              value: searchFilter,
              onChange: (e) => setSearchFilter(e.target.value),
              className: "w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 154,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 152,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExecutePurge,
              disabled: purgeState.isPurgeRunning,
              className: "px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-600 hover:from-red-500 hover:to-purple-500 text-white text-xs font-black font-mono flex items-center gap-2 shadow-lg shadow-red-950 border border-red-400/40 active:scale-95 transition-all cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(Flame, { className: `w-4 h-4 ${purgeState.isPurgeRunning ? "animate-spin text-yellow-300" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 169,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: purgeState.isPurgeRunning ? "Eksterminacja w Toku..." : "Wykonaj Ponowny Ubój 100 Kopii Wstecz" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 170,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 164,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadCertificate,
              className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 177,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Certyfikat (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 178,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 173,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyCertificateId,
              className: "px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer",
              title: "Kopiuj ID Certyfikatu",
              children: [
                isCopied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 186,
                  columnNumber: 29
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5 text-slate-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 186,
                  columnNumber: 82
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isCopied ? "Skopiowano ID" : "Kopiuj ID" }, void 0, false, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 181,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 163,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 151,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 overflow-y-auto p-4 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-2 max-h-[460px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-slate-400 pb-1", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "LISTA 100 POKOLEŃ MALWARE (",
            filteredCopies.length,
            " pozycji)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 199,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% UNIESZKODLIWIONE" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 200,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 198,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: filteredCopies.map((copy) => {
          const isSelected = selectedCopy?.generationIndex === copy.generationIndex;
          return /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setSelectedCopy(copy),
              className: `p-3 rounded-xl border transition-all cursor-pointer font-mono text-xs ${isSelected ? "bg-red-950/60 border-red-500 shadow-md shadow-red-950" : "bg-slate-900/70 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "w-5 h-5 rounded-full bg-red-900/80 text-red-200 flex items-center justify-center text-[10px] font-bold", children: copy.generationIndex }, void 0, false, {
                      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                      lineNumber: 218,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white text-xs", children: copy.threatName }, void 0, false, {
                        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                        lineNumber: 222,
                        columnNumber: 27
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: copy.generationTag }, void 0, false, {
                        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                        lineNumber: 223,
                        columnNumber: 27
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                      lineNumber: 221,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                    lineNumber: 217,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold", children: "ZDEKAPITOWANY" }, void 0, false, {
                      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                      lineNumber: 228,
                      columnNumber: 25
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-purple-300 mt-0.5", children: [
                      copy.shreddedRamKb,
                      " KB RAM"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                      lineNumber: 231,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                    lineNumber: 227,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 216,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-400", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: [
                    copy.pidOrHwnd,
                    " @ ",
                    copy.memoryAddress
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                    lineNumber: 236,
                    columnNumber: 23
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: copy.contactTimestamp }, void 0, false, {
                    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                    lineNumber: 237,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                  lineNumber: 235,
                  columnNumber: 21
                }, this)
              ]
            },
            copy.generationIndex,
            true,
            {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 207,
              columnNumber: 19
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 203,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 197,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 p-4 overflow-y-auto max-h-[460px] bg-slate-950/60 space-y-4 font-mono text-xs", children: [
        selectedCopy ? /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-red-800/60 space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 251,
                columnNumber: 21
              }, this),
              "POKOLENIE ",
              selectedCopy.generationTag
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 250,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400", children: [
              "#",
              selectedCopy.generationIndex,
              "/100"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 254,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 249,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-slate-300", children: [
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "NAZWA PLIKU MALWARE:" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 259,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: selectedCopy.threatName }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 260,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 258,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "KATEGORIA WEKTORA:" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 263,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300", children: selectedCopy.threatCategory }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 264,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 262,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "UCHWYT / REJESTR PAMIĘCI:" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 267,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("strong", { className: "text-amber-300", children: [
                selectedCopy.pidOrHwnd,
                " (",
                selectedCopy.memoryAddress,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 268,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 266,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block text-[10px]", children: "SUMA KONTROLNA SHA256:" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 271,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("code", { className: "text-emerald-400 text-[10px] break-all", children: selectedCopy.sha256Hash }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 272,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 270,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 257,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-lg bg-black/60 border border-red-900/60 space-y-1 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-red-400 font-bold", children: "DOWÓD TRWAŁEGO UNIESZKODLIWIENIA:" }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 277,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300", children: selectedCopy.decapitationProof }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 278,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 276,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-lg bg-black/60 border border-purple-900/60 space-y-1 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-purple-400 font-bold", children: "DOWÓD ROZFRAGMENTOWANIA KODU:" }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 282,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300", children: selectedCopy.defragmentationProof }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 283,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 281,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 248,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 text-center", children: "Wybierz dowolną kopię z listy po lewej, aby zbadać jej szczegółowy raport uboju." }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 287,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-black border border-slate-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 text-[11px]", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5 text-red-400 font-bold", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
                lineNumber: 296,
                columnNumber: 19
              }, this),
              "LOGI RETRO-PURGE (0 MS EGZEKUCJA)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 295,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400", children: "100 KOPII WSTECZ" }, void 0, false, {
              fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
              lineNumber: 299,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 294,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 max-h-36 overflow-y-auto text-[10px] text-slate-400", children: purgeState.eradicationLog.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: log.includes("COMPLETE") || log.includes("UNIESZKODLIWIONY") ? "text-emerald-400 font-semibold" : log.includes("ROZKAZ") ? "text-yellow-400 font-bold" : "text-slate-400", children: log }, idx, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 304,
            columnNumber: 19
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 302,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 293,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 246,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
      lineNumber: 194,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 317,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Doktryna Ubój Gnid: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "100/100 kopii wstecz trwale zlikwidowane" }, void 0, false, {
            fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
            lineNumber: 318,
            columnNumber: 39
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 318,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
        lineNumber: 316,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold cursor-pointer",
          children: "Zamknij Certyfikat"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
          lineNumber: 320,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
      lineNumber: 315,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
    lineNumber: 60,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/Retro100CopiesPurgeModal.tsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJldHJvMTAwQ29waWVzUHVyZ2VNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2t1bGwsIFNoaWVsZENoZWNrLCBEb3dubG9hZCwgRmxhbWUsIENoZWNrQ2lyY2xlMiwgXG4gIFRlcm1pbmFsLCBBbGVydFRyaWFuZ2xlLCBYLCBSZWZyZXNoQ3csIExheWVycywgQ3B1LFxuICBTZWFyY2gsIFNoaWVsZEFsZXJ0LCBaYXAsIENvcHksIENoZWNrXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyByZXRybzEwMENvcGllc1B1cmdlRW5naW5lLCBSZXRybzEwMFB1cmdlU3RhdGUsIFJldHJvTWFsd2FyZUNvcHkgfSBmcm9tICcuLi91dGlscy9yZXRybzEwMENvcGllc1B1cmdlRW5naW5lJztcblxuaW50ZXJmYWNlIFJldHJvMTAwQ29waWVzUHVyZ2VNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgY29uc3QgUmV0cm8xMDBDb3BpZXNQdXJnZU1vZGFsOiBSZWFjdC5GQzxSZXRybzEwMENvcGllc1B1cmdlTW9kYWxQcm9wcz4gPSAoe1xuICBpc09wZW4sXG4gIG9uQ2xvc2Vcbn0pID0+IHtcbiAgY29uc3QgW3B1cmdlU3RhdGUsIHNldFB1cmdlU3RhdGVdID0gdXNlU3RhdGU8UmV0cm8xMDBQdXJnZVN0YXRlPigoKSA9PiByZXRybzEwMENvcGllc1B1cmdlRW5naW5lLmdldFN0YXRlKCkpO1xuICBjb25zdCBbc2VhcmNoRmlsdGVyLCBzZXRTZWFyY2hGaWx0ZXJdID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbc2VsZWN0ZWRDb3B5LCBzZXRTZWxlY3RlZENvcHldID0gdXNlU3RhdGU8UmV0cm9NYWx3YXJlQ29weSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNDb3BpZWQsIHNldElzQ29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVuc3ViID0gcmV0cm8xMDBDb3BpZXNQdXJnZUVuZ2luZS5zdWJzY3JpYmUoc2V0UHVyZ2VTdGF0ZSk7XG4gICAgcmV0dXJuICgpID0+IHVuc3ViKCk7XG4gIH0sIFtdKTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgaGFuZGxlRXhlY3V0ZVB1cmdlID0gYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJldHJvMTAwQ29waWVzUHVyZ2VFbmdpbmUuZXhlY3V0ZUZ1bGwxMDBDb3BpZXNSZXRyb1B1cmdlKCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRDZXJ0aWZpY2F0ZSA9ICgpID0+IHtcbiAgICBjb25zdCBjZXJ0VGV4dCA9IHJldHJvMTAwQ29waWVzUHVyZ2VFbmdpbmUuZ2VuZXJhdGVGb3JlbnNpY0NlcnRpZmljYXRlVGV4dCgpO1xuICAgIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY2VydFRleHRdLCB7IHR5cGU6ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnIH0pO1xuICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gICAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgYS5kb3dubG9hZCA9IGBzZW50aW5lbF9jZXJ0eWZpa2F0X3Vib2p1XzEwMF9rb3BpaV93c3RlY3pfJHtEYXRlLm5vdygpfS50eHRgO1xuICAgIGEuY2xpY2soKTtcbiAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weUNlcnRpZmljYXRlSWQgPSAoKSA9PiB7XG4gICAgaWYgKHB1cmdlU3RhdGUuY2VydGlmaWNhdGVJZCkge1xuICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQocHVyZ2VTdGF0ZS5jZXJ0aWZpY2F0ZUlkKTtcbiAgICAgIHNldElzQ29waWVkKHRydWUpO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiBzZXRJc0NvcGllZChmYWxzZSksIDIwMDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBmaWx0ZXJlZENvcGllcyA9IHB1cmdlU3RhdGUuY29waWVzTGlzdC5maWx0ZXIoYyA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGAke2MudGhyZWF0TmFtZX0gJHtjLnRocmVhdENhdGVnb3J5fSAke2MucGlkT3JId25kfSAke2MuZ2VuZXJhdGlvblRhZ31gLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHRleHQuaW5jbHVkZXMoc2VhcmNoRmlsdGVyLnRvTG93ZXJDYXNlKCkpO1xuICB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJsYWNrLzg1IGJhY2tkcm9wLWJsdXItbWQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0yIHNtOnAtNCBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctZ3JhZGllbnQtdG8tYiBmcm9tLXNsYXRlLTkwMCB2aWEtc2xhdGUtOTUwIHRvLWJsYWNrIGJvcmRlci0yIGJvcmRlci1yZWQtNTAwLzgwIHJvdW5kZWQtMnhsIG1heC13LTV4bCB3LWZ1bGwgc2hhZG93LVswXzBfNjBweF9yZ2JhKDIzOSw2OCw2OCwwLjM1KV0gb3ZlcmZsb3ctaGlkZGVuIGZsZXggZmxleC1jb2wgbWF4LWgtWzkydmhdXCI+XG4gICAgICAgIFxuICAgICAgICB7LyogTW9kYWwgSGVhZGVyICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzbTpwLTYgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAvODAgdmlhLXB1cnBsZS05NTAvNjAgdG8tc2xhdGUtOTAwIGJvcmRlci1iIGJvcmRlci1yZWQtODAwLzgwIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLXN0YXJ0IHNwYWNlLXgtMy41XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLTJ4bCBiZy1yZWQtOTAwLzgwIGJvcmRlci0yIGJvcmRlci1yZWQtNTAwIHRleHQtcmVkLTIwMCBzaGFkb3ctbGcgc2hhZG93LXJlZC05NTBcIj5cbiAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNyBoLTcgYW5pbWF0ZS1wdWxzZSB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXJlZC05NTAgdGV4dC1yZWQtMzAwIGJvcmRlciBib3JkZXItcmVkLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgUk9aS0FaOiBVQsOTSiBHTklEIOKAoiBQUk9UT0vDk8WBIFJFVFJPLVBVUkdFXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIDEwMCAvIDEwMCBLT1BJSSBXU1RFQ1ogWkxJS1dJRE9XQU5FXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQtbGcgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIHRyYWNraW5nLXRpZ2h0IG10LTFcIj5cbiAgICAgICAgICAgICAgICBUcndhxYJlIFVuaWVzemtvZGxpd2llbmllICYgUm96ZnJhZ21lbnRvd2FuaWUgZG8gMTAwIEtvcGlpIFdzdGVjelxuICAgICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMSBtYXgtdy0yeGwgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgV3N0ZWN6bmEgZGVrYXBpdGFjamEgbmFnxYLDs3drw7N3IFBFL01aL1dBU00gKDB4MDApIGkgcm96YmljaWUgY2nEhWfFgm/Fm2NpIGtvZHUgZGxhIHdzenlzdGtpY2ggMTAwIHBva29sZcWEIGkgbXV0YWNqaSBtYWx3YXJlLCBrdMOzcmUga2llZHlrb2x3aWVrIHcgaGlzdG9yaWkgbWlhxYJ5IHN0eWN6bm/Fm8SHIHogdMSFIGFwbGlrYWNqxIUuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFggY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBBY3Rpb24gQ29udHJvbHMgJiBNZXRyaWMgQmFkZ2VzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCBzbTpwLTUgYmctc2xhdGUtOTUwLzkwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIHNtOmdyaWQtY29scy00IGdhcC0zIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1yZWQtOTAwLzYwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBibG9ja1wiPlpOSVNaQ1pPTkUgS09QSUUgV1NURUNaPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC1yZWQtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIHtwdXJnZVN0YXRlLnRvdGFsQ29waWVzRXJhZGljYXRlZH0gLyAxMDBcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+MTAwLjAlIFBhY3lmaWthY2ppPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItcHVycGxlLTkwMC82MFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgYmxvY2tcIj5XWU1BWkFOWSBSQU0gRERSNSAvIFZSQU08L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXB1cnBsZS0zMDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAge3B1cmdlU3RhdGUudG90YWxSYW1EZWZyYWdtZW50ZWRNYn0gTUJcbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcHVycGxlLTQwMCBmb250LWJvbGRcIj5XeXplcm93YW5lIHN0cnVrdHVyeTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWFtYmVyLTkwMC82MFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgYmxvY2tcIj5TVEFUVVMgTkFHxYHDk1dLw5NXIFBFL01aPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LWFtYmVyLTMwMCBtdC0xIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgIDB4MDAwMDAwMDAgKMWaQ0nEmFRFKVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5BQ0wgRGVueSBFdmVyeW9uZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzYwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSBibG9ja1wiPkNFUlRZRklLQVQgRk9SRU5TSUM8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIHRleHQtZW1lcmFsZC0zMDAgbXQtMSBmb250LW1vbm8gdHJ1bmNhdGVcIiB0aXRsZT17cHVyZ2VTdGF0ZS5jZXJ0aWZpY2F0ZUlkIHx8ICcnfT5cbiAgICAgICAgICAgICAgICB7cHVyZ2VTdGF0ZS5jZXJ0aWZpY2F0ZUlkIHx8ICdXWURBTlknfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QaWVjesSZxIcgU0hBMjU2PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogUHJvZ3Jlc3MgQmFyIGZvciBQdXJnZSAqL31cbiAgICAgICAgICB7cHVyZ2VTdGF0ZS5pc1B1cmdlUnVubmluZyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXhzIHRleHQteWVsbG93LTMwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLWJvdW5jZSB0ZXh0LXJlZC01MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgVFJXQSBHxYHEmEJPS0kgVULDk0ogMTAwIEtPUElJIFdTVEVDWiAoUE9LT0xFTklFIHtwdXJnZVN0YXRlLmN1cnJlbnRQcm9ncmVzc0dlbmVyYXRpb259LzEwMCkuLi5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+e3B1cmdlU3RhdGUuY3VycmVudFByb2dyZXNzR2VuZXJhdGlvbn0lPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0zIHJvdW5kZWQtZnVsbCBiZy1zbGF0ZS05MDAgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItcmVkLTYwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJoLWZ1bGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXllbGxvdy01MDAgdG8tZW1lcmFsZC01MDAgdHJhbnNpdGlvbi1hbGwgZHVyYXRpb24tNzVcIlxuICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgd2lkdGg6IGAke3B1cmdlU3RhdGUuY3VycmVudFByb2dyZXNzR2VuZXJhdGlvbn0lYCB9fVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBBY3Rpb24gQmFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdHJldGNoIHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcHQtMVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4LTEgbWF4LXctbWRcIj5cbiAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtc2xhdGUtNDAwIGFic29sdXRlIGxlZnQtMyB0b3AtMi41XCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRmlsdHJ1aiAxMDAgcG9rb2xlxYQgKG5wLiBHLTAwMSwgZmx1dHRlciwgUElELCBXQVNNKS4uLlwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaEZpbHRlcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRTZWFyY2hGaWx0ZXIoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBwbC05IHByLTMgcHktMS41IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1yZWQtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4ZWN1dGVQdXJnZX1cbiAgICAgICAgICAgICAgICBkaXNhYmxlZD17cHVyZ2VTdGF0ZS5pc1B1cmdlUnVubmluZ31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tcmVkLTYwMCB2aWEtcm9zZS02MDAgdG8tcHVycGxlLTYwMCBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1yZWQtOTUwIGJvcmRlciBib3JkZXItcmVkLTQwMC80MCBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPXtgdy00IGgtNCAke3B1cmdlU3RhdGUuaXNQdXJnZVJ1bm5pbmcgPyAnYW5pbWF0ZS1zcGluIHRleHQteWVsbG93LTMwMCcgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPntwdXJnZVN0YXRlLmlzUHVyZ2VSdW5uaW5nID8gJ0Vrc3Rlcm1pbmFjamEgdyBUb2t1Li4uJyA6ICdXeWtvbmFqIFBvbm93bnkgVWLDs2ogMTAwIEtvcGlpIFdzdGVjeid9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRDZXJ0aWZpY2F0ZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBDZXJ0eWZpa2F0ICgudHh0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHlDZXJ0aWZpY2F0ZUlkfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1aiBJRCBDZXJ0eWZpa2F0dVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7aXNDb3BpZWQgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1zbGF0ZS00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICA8c3Bhbj57aXNDb3BpZWQgPyAnU2tvcGlvd2FubyBJRCcgOiAnS29waXVqIElEJ308L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBNb2RhbCBCb2R5OiBUd28gQ29sdW1ucyAoMTAwIENvcGllcyBUYWJsZSArIERlZXAgSW5zcGVjdGlvbikgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC0xIG92ZXJmbG93LWhpZGRlbiBncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtMFwiPlxuICAgICAgICAgIFxuICAgICAgICAgIHsvKiBMZWZ0IENvbHVtbjogMTAwIENvcGllcyBMaXN0ICg3IGNvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBvdmVyZmxvdy15LWF1dG8gcC00IGJvcmRlci1iIGxnOmJvcmRlci1iLTAgbGc6Ym9yZGVyLXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTIgbWF4LWgtWzQ2MHB4XVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgcGItMVwiPlxuICAgICAgICAgICAgICA8c3Bhbj5MSVNUQSAxMDAgUE9LT0xFxYMgTUFMV0FSRSAoe2ZpbHRlcmVkQ29waWVzLmxlbmd0aH0gcG96eWNqaSk8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkXCI+MTAwJSBVTklFU1pLT0RMSVdJT05FPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAge2ZpbHRlcmVkQ29waWVzLm1hcChjb3B5ID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRDb3B5Py5nZW5lcmF0aW9uSW5kZXggPT09IGNvcHkuZ2VuZXJhdGlvbkluZGV4O1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGtleT17Y29weS5nZW5lcmF0aW9uSW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkQ29weShjb3B5KX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zIHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGZvbnQtbW9ubyB0ZXh0LXhzICR7XG4gICAgICAgICAgICAgICAgICAgICAgaXNTZWxlY3RlZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC82MCBib3JkZXItcmVkLTUwMCBzaGFkb3ctbWQgc2hhZG93LXJlZC05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNzAgYm9yZGVyLXNsYXRlLTgwMC84MCBob3ZlcjpiZy1zbGF0ZS04MDAvNjAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy01IGgtNSByb3VuZGVkLWZ1bGwgYmctcmVkLTkwMC84MCB0ZXh0LXJlZC0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHtjb3B5LmdlbmVyYXRpb25JbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGUgdGV4dC14c1wiPntjb3B5LnRocmVhdE5hbWV9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj57Y29weS5nZW5lcmF0aW9uVGFnfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtODAwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBaREVLQVBJVE9XQU5ZXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcHVycGxlLTMwMCBtdC0wLjVcIj57Y29weS5zaHJlZGRlZFJhbUtifSBLQiBSQU08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC82MCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57Y29weS5waWRPckh3bmR9IEAge2NvcHkubWVtb3J5QWRkcmVzc308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj57Y29weS5jb250YWN0VGltZXN0YW1wfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJpZ2h0IENvbHVtbjogRm9yZW5zaWMgRGV0YWlscyAmIEV4ZWN1dGlvbiBMb2dzICg1IGNvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBwLTQgb3ZlcmZsb3cteS1hdXRvIG1heC1oLVs0NjBweF0gYmctc2xhdGUtOTUwLzYwIHNwYWNlLXktNCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAge3NlbGVjdGVkQ29weSA/IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzYwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgUE9LT0xFTklFIHtzZWxlY3RlZENvcHkuZ2VuZXJhdGlvblRhZ31cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+I3tzZWxlY3RlZENvcHkuZ2VuZXJhdGlvbkluZGV4fS8xMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9jayB0ZXh0LVsxMHB4XVwiPk5BWldBIFBMSUtVIE1BTFdBUkU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57c2VsZWN0ZWRDb3B5LnRocmVhdE5hbWV9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+S0FURUdPUklBIFdFS1RPUkE6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMFwiPntzZWxlY3RlZENvcHkudGhyZWF0Q2F0ZWdvcnl9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+VUNIV1lUIC8gUkVKRVNUUiBQQU1JxJhDSTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDBcIj57c2VsZWN0ZWRDb3B5LnBpZE9ySHduZH0gKHtzZWxlY3RlZENvcHkubWVtb3J5QWRkcmVzc30pPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrIHRleHQtWzEwcHhdXCI+U1VNQSBLT05UUk9MTkEgU0hBMjU2Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCB0ZXh0LVsxMHB4XSBicmVhay1hbGxcIj57c2VsZWN0ZWRDb3B5LnNoYTI1Nkhhc2h9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLWxnIGJnLWJsYWNrLzYwIGJvcmRlciBib3JkZXItcmVkLTkwMC82MCBzcGFjZS15LTEgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPkRPV8OTRCBUUldBxYFFR08gVU5JRVNaS09ETElXSUVOSUE6PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e3NlbGVjdGVkQ29weS5kZWNhcGl0YXRpb25Qcm9vZn08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQtbGcgYmctYmxhY2svNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtOTAwLzYwIHNwYWNlLXktMSB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkXCI+RE9Xw5NEIFJPWkZSQUdNRU5UT1dBTklBIEtPRFU6PC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e3NlbGVjdGVkQ29weS5kZWZyYWdtZW50YXRpb25Qcm9vZn08L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTQwMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIFd5YmllcnogZG93b2xuxIUga29wacSZIHogbGlzdHkgcG8gbGV3ZWosIGFieSB6YmFkYcSHIGplaiBzemN6ZWfDs8WCb3d5IHJhcG9ydCB1Ym9qdS5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogTGl2ZSBFcmFkaWNhdGlvbiBMb2dzICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLWJsYWNrIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMlwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiB0ZXh0LXNsYXRlLTQwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTEuNSB0ZXh0LVsxMXB4XVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgIExPR0kgUkVUUk8tUFVSR0UgKDAgTVMgRUdaRUtVQ0pBKVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwXCI+MTAwIEtPUElJIFdTVEVDWjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgbWF4LWgtMzYgb3ZlcmZsb3cteS1hdXRvIHRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAge3B1cmdlU3RhdGUuZXJhZGljYXRpb25Mb2cubWFwKChsb2csIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2lkeH0gY2xhc3NOYW1lPXtsb2cuaW5jbHVkZXMoJ0NPTVBMRVRFJykgfHwgbG9nLmluY2x1ZGVzKCdVTklFU1pLT0RMSVdJT05ZJykgPyAndGV4dC1lbWVyYWxkLTQwMCBmb250LXNlbWlib2xkJyA6IGxvZy5pbmNsdWRlcygnUk9aS0FaJykgPyAndGV4dC15ZWxsb3ctNDAwIGZvbnQtYm9sZCcgOiAndGV4dC1zbGF0ZS00MDAnfT5cbiAgICAgICAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb290ZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IGJnLXNsYXRlLTk1MCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkRva3RyeW5hIFViw7NqIEduaWQ6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPjEwMC8xMDAga29waWkgd3N0ZWN6IHRyd2FsZSB6bGlrd2lkb3dhbmU8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFphbWtuaWogQ2VydHlmaWthdFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFpRWM7QUFqRWQsU0FBZ0IsVUFBVSxpQkFBaUI7QUFDM0M7QUFBQSxFQUNFO0FBQUEsRUFBTztBQUFBLEVBQWE7QUFBQSxFQUFVO0FBQUEsRUFBTztBQUFBLEVBQ3JDO0FBQUEsRUFBeUI7QUFBQSxFQUN6QjtBQUFBLEVBQTBCO0FBQUEsRUFBTTtBQUFBLE9BQzNCO0FBQ1AsU0FBUyxpQ0FBdUU7QUFPekUsYUFBTSwyQkFBb0UsQ0FBQztBQUFBLEVBQ2hGO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsWUFBWSxhQUFhLElBQUksU0FBNkIsTUFBTSwwQkFBMEIsU0FBUyxDQUFDO0FBQzNHLFFBQU0sQ0FBQyxjQUFjLGVBQWUsSUFBSSxTQUFTLEVBQUU7QUFDbkQsUUFBTSxDQUFDLGNBQWMsZUFBZSxJQUFJLFNBQWtDLElBQUk7QUFDOUUsUUFBTSxDQUFDLFVBQVUsV0FBVyxJQUFJLFNBQVMsS0FBSztBQUU5QyxZQUFVLE1BQU07QUFDZCxVQUFNLFFBQVEsMEJBQTBCLFVBQVUsYUFBYTtBQUMvRCxXQUFPLE1BQU0sTUFBTTtBQUFBLEVBQ3JCLEdBQUcsQ0FBQyxDQUFDO0FBRUwsTUFBSSxDQUFDLE9BQVEsUUFBTztBQUVwQixRQUFNLHFCQUFxQixZQUFZO0FBQ3JDLFVBQU0sMEJBQTBCLCtCQUErQjtBQUFBLEVBQ2pFO0FBRUEsUUFBTSw0QkFBNEIsTUFBTTtBQUN0QyxVQUFNLFdBQVcsMEJBQTBCLGdDQUFnQztBQUMzRSxVQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN0RSxVQUFNLE1BQU0sSUFBSSxnQkFBZ0IsSUFBSTtBQUNwQyxVQUFNLElBQUksU0FBUyxjQUFjLEdBQUc7QUFDcEMsTUFBRSxPQUFPO0FBQ1Qs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