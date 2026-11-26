import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  Download,
  FileText,
  CheckCircle2,
  ShieldAlert,
  Cpu,
  HardDrive,
  Radio,
  Layers,
  Zap,
  Code
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  downloadPostEmpReportFile,
  generatePostEmpReportText,
  generatePostEmpReportJson
} from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
export const PostEmpReportModal = ({
  report,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  if (!isOpen || !report) return null;
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "relative w-full max-w-5xl max-h-[90vh] bg-slate-950 border-2 border-cyan-500/80 rounded-2xl shadow-[0_0_60px_rgba(6,182,212,0.4)] flex flex-col overflow-hidden text-slate-200 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-cyan-950/80 to-slate-900 border-b border-cyan-500/40", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 animate-bounce fill-cyan-400 text-cyan-300" }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 43,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 42,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white tracking-wide font-mono", children: "RAPORT DIAGNOSTYCZNO-BOJOWY PO FALI ELEKTROMAGNETYCZNEJ" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 47,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500 text-emerald-300 font-mono text-xs font-bold", children: "100% UNIESZKODLIWIONYCH" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 50,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 46,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: [
            "ID: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-300", children: report.id }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 55,
              columnNumber: 21
            }, this),
            " • Czas: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-yellow-300", children: report.reportTimestamp }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 55,
              columnNumber: 80
            }, this),
            " • Topologia: ",
            /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300", children: "Model 4 Urządzeń (<=10m)" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 55,
              columnNumber: 159
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 54,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 45,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 41,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadPostEmpReportFile(report, "html"),
              className: "px-2.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow transition-all active:scale-95 cursor-pointer",
              title: "Pobierz gotowy raport HTML (do druku i offline)",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 68,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "HTML" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 69,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 63,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadPostEmpReportFile(report, "json"),
              className: "px-2.5 py-1.5 rounded-lg bg-purple-900/80 hover:bg-purple-800 border border-purple-500/50 text-purple-200 font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer",
              title: "Pobierz surowe dane telemetryczne w formacie JSON",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 76,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 77,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 71,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadPostEmpReportFile(report, "txt"),
              className: "px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer",
              title: "Pobierz sformatowany log tekstowy TXT",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 84,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "TXT" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 85,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 79,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 62,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "p-2 rounded-xl bg-slate-900 hover:bg-red-950/60 border border-slate-800 hover:border-red-500/60 text-slate-400 hover:text-red-300 transition-all cursor-pointer",
            title: "Zamknij podgląd raportu",
            children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 94,
              columnNumber: 15
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 89,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 60,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
      lineNumber: 40,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 px-6 pt-3 bg-slate-900/90 border-b border-slate-800 text-xs font-mono overflow-x-auto", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("overview"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "overview" ? "bg-slate-950 text-cyan-300 border-cyan-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 109,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Przegląd i Metryki" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 110,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 101,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("files"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "files" ? "bg-slate-950 text-rose-400 border-rose-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 121,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Unieszkodliwione w Plikach (",
              report.filesCount,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 122,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 113,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("connectors"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "connectors" ? "bg-slate-950 text-purple-400 border-purple-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 133,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Unieszkodliwione w Złączach / PCIe / USB (",
              report.connectorsCount,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 134,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 125,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("mesh4"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "mesh4" ? "bg-slate-950 text-emerald-400 border-emerald-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 145,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Model 4 Urządzeń (< 10m)" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 146,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 137,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("rawText"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "rawText" ? "bg-slate-950 text-yellow-400 border-yellow-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 157,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Tekst TXT" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 158,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 149,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("rawJson"),
          className: `px-4 py-2 rounded-t-lg font-bold transition-all cursor-pointer border-b-2 flex items-center gap-2 ${activeTab === "rawJson" ? "bg-slate-950 text-cyan-400 border-cyan-400 shadow-md" : "text-slate-400 hover:text-slate-200 border-transparent"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Code, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 169,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "JSON Surowy" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 170,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 161,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
      activeTab === "overview" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-slate-800 shadow-lg flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 uppercase font-bold", children: "ŁĄCZNIE UNIESZKODLIWIONO" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 183,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl sm:text-3xl font-black text-emerald-400 font-mono mt-1", children: [
              report.totalNeutralized,
              " / ",
              report.totalEvaluatedGnidas
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 184,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-emerald-500 font-mono mt-1 flex items-center gap-1", children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3 h-3" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 188,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Skuteczność: 100% PURGE" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 189,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 187,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 182,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-rose-900/50 shadow-lg flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-rose-300 uppercase font-bold", children: "W PLIKACH (NTFS/EXE/DLL)" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 194,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl sm:text-3xl font-black text-rose-400 font-mono mt-1", children: [
              report.filesCount,
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-normal", children: "zagrożeń" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 196,
                columnNumber: 41
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 195,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-rose-400 font-mono mt-1", children: "Wyzerowany nagłówek MZ + ACL Deny" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 198,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 193,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-purple-900/50 shadow-lg flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-purple-300 uppercase font-bold", children: "W ZŁĄCZACH & MAGISTRALACH" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 204,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl sm:text-3xl font-black text-purple-400 font-mono mt-1", children: [
              report.connectorsCount,
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-normal", children: "punktów" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 206,
                columnNumber: 46
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 205,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-purple-300 font-mono mt-1", children: "PCIe, USB HID, RAM DDR5, Sockets" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 208,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 203,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-cyan-900/50 shadow-lg flex flex-col justify-between", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-cyan-300 uppercase font-bold", children: "PARAMETRY FALI EM" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 214,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-2xl sm:text-3xl font-black text-cyan-300 font-mono mt-1", children: [
              report.empWavePowerWatts,
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-normal", children: "W" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 216,
                columnNumber: 48
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 215,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-cyan-400 font-mono mt-1", children: [
              "Częstotliwość nośna: ",
              report.carrierFrequencyThz,
              " THz"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 218,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 213,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 181,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/40", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-cyan-300 font-mono font-bold text-sm mb-2", children: [
            /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 227,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "OCENA SKUTECZNOŚCI ROZWIĄZANIA (WARUNKI RZECZYWISTE):" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 228,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 226,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 leading-relaxed font-sans", children: report.conclusion }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 230,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Topologia Badawcza: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "Zamknięty Model 4 Urządzeń" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 234,
                columnNumber: 45
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 234,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Promień Oddziaływania: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-yellow-300", children: "<= 10 metrów" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 235,
                columnNumber: 48
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 235,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Izolacja Oddziaływania Fali: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: "W obrębie 1 urządzenia (lokalna neutralizacja)" }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 236,
                columnNumber: 54
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 236,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 233,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 225,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-xs text-rose-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 246,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Unieszkodliwione w Plikach (",
                  report.filesCount,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 247,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 245,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveTab("files"),
                  className: "text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer",
                  children: "Szczegóły →"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 249,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 244,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: report.filesBreakdown.slice(0, 4).map((f, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-slate-950 border border-rose-950 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-slate-200 font-mono", children: f.name }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 259,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 truncate font-mono", children: f.filePath }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 260,
                columnNumber: 25
              }, this)
            ] }, i, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 258,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 256,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 243,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-xs text-purple-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 270,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Unieszkodliwione w Złączach & Magistralach (",
                  report.connectorsCount,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 271,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 269,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveTab("connectors"),
                  className: "text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer",
                  children: "Szczegóły →"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 273,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 268,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: report.connectorsBreakdown.slice(0, 4).map((c, i) => /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-slate-950 border border-purple-950 text-xs", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-slate-200 font-mono flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: c.name }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 284,
                  columnNumber: 27
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-purple-400", children: c.connectorType }, void 0, false, {
                  fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                  lineNumber: 285,
                  columnNumber: 27
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 283,
                columnNumber: 25
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400 truncate font-mono", children: c.hardwareAddressOrBus }, void 0, false, {
                fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
                lineNumber: 287,
                columnNumber: 25
              }, this)
            ] }, i, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 282,
              columnNumber: 23
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 280,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 267,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 241,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 179,
        columnNumber: 13
      }, this),
      activeTab === "files" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-rose-950/40 border border-rose-800/40 text-xs text-rose-200 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Wykryto i unieszkodliwiono ",
            /* @__PURE__ */ jsxDEV("strong", { children: [
              report.filesCount,
              " złośliwych binarek i bibliotek DLL"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 300,
              columnNumber: 50
            }, this),
            " na dysku NTFS."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 300,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400", children: "STATUS: PE_WIPED / ACL_LOCKED" }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 301,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 299,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto border border-slate-800 rounded-xl", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("thead", { className: "bg-slate-900 text-slate-300 border-b border-slate-800", children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Nazwa Pliku" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 308,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Ścieżka na Dysku" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 309,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Zastosowana Akcja" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 310,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Sabotaż PE" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 311,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Blokada ACL" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 312,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 307,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 306,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60 bg-slate-950", children: report.filesBreakdown.map((f, i) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-900/60 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 font-bold text-rose-300", children: f.name }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 318,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-slate-400 truncate max-w-xs", children: f.filePath }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 319,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-slate-300", children: f.action }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 320,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold", children: f.peSabotageStatus }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 322,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 321,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/50 text-[10px] font-bold", children: f.aclLockStatus }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 327,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 326,
              columnNumber: 25
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 317,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 315,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 305,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 304,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 298,
        columnNumber: 13
      }, this),
      activeTab === "connectors" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs text-purple-200 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Unieszkodliwiono ",
            /* @__PURE__ */ jsxDEV("strong", { children: [
              report.connectorsCount,
              " agresorów w magistralach sprzętowych i złączach wejścia/wyjścia"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 343,
              columnNumber: 40
            }, this),
            "."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 343,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-400", children: "STATUS: INTERFACES_PURGED" }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 344,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 342,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "overflow-x-auto border border-slate-800 rounded-xl", children: /* @__PURE__ */ jsxDEV("table", { className: "w-full text-left text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("thead", { className: "bg-slate-900 text-slate-300 border-b border-slate-800", children: /* @__PURE__ */ jsxDEV("tr", { children: [
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Nazwa Zagrożenia" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 351,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Typ Złącza / Interfejsu" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 352,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Adres Sprzętowy / Magistrala" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 353,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Zastosowana Neutralizacja" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 354,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("th", { className: "p-3", children: "Stan Końcowy" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 355,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 350,
            columnNumber: 21
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 349,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("tbody", { className: "divide-y divide-slate-800/60 bg-slate-950", children: report.connectorsBreakdown.map((c, i) => /* @__PURE__ */ jsxDEV("tr", { className: "hover:bg-slate-900/60 transition-colors", children: [
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 font-bold text-purple-300", children: c.name }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 361,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/50 text-[10px] font-bold", children: c.connectorType }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 363,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 362,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-slate-400", children: c.hardwareAddressOrBus }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 367,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3 text-slate-300", children: c.action }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 368,
              columnNumber: 25
            }, this),
            /* @__PURE__ */ jsxDEV("td", { className: "p-3", children: /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[10px] font-bold", children: c.state }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 370,
              columnNumber: 27
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 369,
              columnNumber: 25
            }, this)
          ] }, i, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 360,
            columnNumber: 23
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 358,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 348,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 347,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 341,
        columnNumber: 13
      }, this),
      activeTab === "mesh4" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900 border border-cyan-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "font-mono font-bold text-sm text-cyan-300", children: "ĆWICZENIA W WARUNKACH RZECZYWISTYCH: ZAMKNIĘTY MODEL 4 URZĄDZEŃ" }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 387,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: "Badanie skuteczności w obrębie niewielkich sieci lokalnych o dystansie do 10 metrów. Fala elektromagnetyczna propaguje przez sieć, lecz jej unieszkodliwianie działa precyzyjnie w obrębie danego urządzenia, nie uszkadzając połączeń mesh." }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 390,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 386,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-400 text-cyan-300 font-mono text-xs font-bold shrink-0", children: "ZASIĘG BADANIA: ≤ 10 METRÓW" }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 394,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 385,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: report.devicesTelemetry.map((d) => /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700", children: d.nodeId }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 403,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-yellow-300 font-bold", children: [
              d.distanceMeters,
              " m"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 406,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 402,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white text-xs font-mono", children: d.nodeName }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 410,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 font-mono", children: [
            "Rola: ",
            d.meshRole
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 411,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: d.status }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 413,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-cyan-400", children: d.empImpact }, void 0, false, {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 414,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 412,
            columnNumber: 21
          }, this)
        ] }, d.nodeId, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 401,
          columnNumber: 19
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 399,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 384,
        columnNumber: 13
      }, this),
      activeTab === "rawText" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "Sformatowany log raportu w formacie tekstowym:" }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 426,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generatePostEmpReportText(report)),
              className: "px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer",
              children: copied ? "✔ Skopiowano!" : "Kopiuj do Schowka"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 427,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 425,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 rounded-xl bg-slate-900 text-slate-300 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 max-h-96", children: generatePostEmpReportText(report) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 434,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 424,
        columnNumber: 13
      }, this),
      activeTab === "rawJson" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-slate-400", children: "Pełna struktura danych telemetrycznych w formacie JSON:" }, void 0, false, {
            fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
            lineNumber: 444,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generatePostEmpReportJson(report)),
              className: "px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-mono text-cyan-300 border border-slate-700 cursor-pointer",
              children: copied ? "✔ Skopiowano JSON!" : "Kopiuj JSON"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
              lineNumber: 445,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 443,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("pre", { className: "p-4 rounded-xl bg-slate-900 text-cyan-300 font-mono text-xs leading-relaxed overflow-x-auto border border-slate-800 max-h-96", children: generatePostEmpReportJson(report) }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 452,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 442,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
      lineNumber: 175,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between px-6 py-3.5 bg-slate-900/90 border-t border-slate-800 text-xs font-mono text-slate-400", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "h-2 w-2 rounded-full bg-emerald-400 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 463,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "Status: Raport zweryfikowany • Gotowy do archiwizacji i analizy powłamaniowej" }, void 0, false, {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 464,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
        lineNumber: 462,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all cursor-pointer",
          children: "Zamknij"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
          lineNumber: 466,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
      lineNumber: 461,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
    lineNumber: 37,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/PostEmpReportModal.tsx",
    lineNumber: 36,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBvc3RFbXBSZXBvcnRNb2RhbC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFgsIERvd25sb2FkLCBGaWxlVGV4dCwgQ2hlY2tDaXJjbGUyLCBTaGllbGRBbGVydCwgQ3B1LCBcbiAgSGFyZERyaXZlLCBSYWRpbywgTGF5ZXJzLCBaYXAsIEFsZXJ0VHJpYW5nbGUsIEV5ZSwgQ29kZSwgRmlsZUNvZGVcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFBvc3RFbXBTY2FuUmVwb3J0IH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgXG4gIGRvd25sb2FkUG9zdEVtcFJlcG9ydEZpbGUsIFxuICBnZW5lcmF0ZVBvc3RFbXBSZXBvcnRUZXh0LCBcbiAgZ2VuZXJhdGVQb3N0RW1wUmVwb3J0SnNvbiBcbn0gZnJvbSAnLi4vdXRpbHMvaGV4YWdvbmFsTGFzZXJCYXJyaWVyU3lzdGVtJztcblxuaW50ZXJmYWNlIFBvc3RFbXBSZXBvcnRNb2RhbFByb3BzIHtcbiAgcmVwb3J0OiBQb3N0RW1wU2NhblJlcG9ydCB8IG51bGw7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGNvbnN0IFBvc3RFbXBSZXBvcnRNb2RhbDogUmVhY3QuRkM8UG9zdEVtcFJlcG9ydE1vZGFsUHJvcHM+ID0gKHtcbiAgcmVwb3J0LFxuICBpc09wZW4sXG4gIG9uQ2xvc2Vcbn0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdvdmVydmlldycgfCAnZmlsZXMnIHwgJ2Nvbm5lY3RvcnMnIHwgJ21lc2g0JyB8ICdyYXdUZXh0JyB8ICdyYXdKc29uJz4oJ292ZXJ2aWV3Jyk7XG4gIGNvbnN0IFtjb3BpZWQsIHNldENvcGllZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG5cbiAgaWYgKCFpc09wZW4gfHwgIXJlcG9ydCkgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9ICh0ZXh0OiBzdHJpbmcpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay84MCBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgdy1mdWxsIG1heC13LTV4bCBtYXgtaC1bOTB2aF0gYmctc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC84MCByb3VuZGVkLTJ4bCBzaGFkb3ctWzBfMF82MHB4X3JnYmEoNiwxODIsMjEyLDAuNCldIGZsZXggZmxleC1jb2wgb3ZlcmZsb3ctaGlkZGVuIHRleHQtc2xhdGUtMjAwIGZvbnQtc2Fuc1wiPlxuICAgICAgICBcbiAgICAgICAgey8qIE1vZGFsIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS00IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLWN5YW4tOTUwLzgwIHRvLXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItY3lhbi01MDAvNDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLXhsIGJnLWN5YW4tOTUwIGJvcmRlciBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTUgaC01IGFuaW1hdGUtYm91bmNlIGZpbGwtY3lhbi00MDAgdGV4dC1jeWFuLTMwMFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgdHJhY2tpbmctd2lkZSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIFJBUE9SVCBESUFHTk9TVFlDWk5PLUJPSk9XWSBQTyBGQUxJIEVMRUtUUk9NQUdORVRZQ1pORUpcbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgMTAwJSBVTklFU1pLT0RMSVdJT05ZQ0hcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBJRDogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMFwiPntyZXBvcnQuaWR9PC9zcGFuPiDigKIgQ3phczogPHNwYW4gY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+e3JlcG9ydC5yZXBvcnRUaW1lc3RhbXB9PC9zcGFuPiDigKIgVG9wb2xvZ2lhOiA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDBcIj5Nb2RlbCA0IFVyesSFZHplxYQgKCZsdDs9MTBtKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICB7LyogRG93bmxvYWQgQnV0dG9ucyBHcm91cCAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBiZy1zbGF0ZS05MDAgcC0xIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRvd25sb2FkUG9zdEVtcFJlcG9ydEZpbGUocmVwb3J0LCAnaHRtbCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xLjUgcm91bmRlZC1sZyBiZy1jeWFuLTYwMCBob3ZlcjpiZy1jeWFuLTUwMCB0ZXh0LWJsYWNrIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdyB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBnb3Rvd3kgcmFwb3J0IEhUTUwgKGRvIGRydWt1IGkgb2ZmbGluZSlcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5IVE1MPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRvd25sb2FkUG9zdEVtcFJlcG9ydEZpbGUocmVwb3J0LCAnanNvbicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xLjUgcm91bmRlZC1sZyBiZy1wdXJwbGUtOTAwLzgwIGhvdmVyOmJnLXB1cnBsZS04MDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNTAwLzUwIHRleHQtcHVycGxlLTIwMCBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBzdXJvd2UgZGFuZSB0ZWxlbWV0cnljem5lIHcgZm9ybWFjaWUgSlNPTlwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkpTT048L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRQb3N0RW1wUmVwb3J0RmlsZShyZXBvcnQsICd0eHQnKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMS41IHJvdW5kZWQtbGcgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBhY3RpdmU6c2NhbGUtOTUgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBzZm9ybWF0b3dhbnkgbG9nIHRla3N0b3d5IFRYVFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRYVDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6YmctcmVkLTk1MC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcmVkLTUwMC82MCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXJlZC0zMDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlphbWtuaWogcG9kZ2zEhWQgcmFwb3J0dVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBOYXZpZ2F0aW9uIFRhYnMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgcHgtNiBwdC0zIGJnLXNsYXRlLTkwMC85MCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHRleHQteHMgZm9udC1tb25vIG92ZXJmbG93LXgtYXV0b1wiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignb3ZlcnZpZXcnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXQtbGcgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnb3ZlcnZpZXcnXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlByemVnbMSFZCBpIE1ldHJ5a2k8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2ZpbGVzJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC10LWxnIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXItYi0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2ZpbGVzJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MCB0ZXh0LXJvc2UtNDAwIGJvcmRlci1yb3NlLTQwMCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAgYm9yZGVyLXRyYW5zcGFyZW50J1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Vbmllc3prb2RsaXdpb25lIHcgUGxpa2FjaCAoe3JlcG9ydC5maWxlc0NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2Nvbm5lY3RvcnMnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXQtbGcgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnY29ubmVjdG9ycydcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAgdGV4dC1wdXJwbGUtNDAwIGJvcmRlci1wdXJwbGUtNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlVuaWVzemtvZGxpd2lvbmUgdyBaxYLEhWN6YWNoIC8gUENJZSAvIFVTQiAoe3JlcG9ydC5jb25uZWN0b3JzQ291bnR9KTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignbWVzaDQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXQtbGcgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnbWVzaDQnXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTUwIHRleHQtZW1lcmFsZC00MDAgYm9yZGVyLWVtZXJhbGQtNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UmFkaW8gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TW9kZWwgNCBVcnrEhWR6ZcWEICgmbHQ7IDEwbSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3Jhd1RleHQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXQtbGcgZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGJvcmRlci1iLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAncmF3VGV4dCdcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAgdGV4dC15ZWxsb3ctNDAwIGJvcmRlci15ZWxsb3ctNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VGVrc3QgVFhUPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdyYXdKc29uJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC10LWxnIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBib3JkZXItYi0yIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3Jhd0pzb24nXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTUwIHRleHQtY3lhbi00MDAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBib3JkZXItdHJhbnNwYXJlbnQnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Q29kZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5KU09OIFN1cm93eTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vZGFsIEJvZHkgQ29udGVudCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNiBzcGFjZS15LTZcIj5cblxuICAgICAgICAgIHsvKiBUQUIgMTogT1ZFUlZJRVcgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ292ZXJ2aWV3JyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgICAgICAgICB7LyogTWV0cmljIENhcmRzIEJhbm5lciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0yIG1kOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LWxnIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2UgZm9udC1ib2xkXCI+xYHEhENaTklFIFVOSUVTWktPRExJV0lPTk88L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC0yeGwgc206dGV4dC0zeGwgZm9udC1ibGFjayB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZXBvcnQudG90YWxOZXV0cmFsaXplZH0gLyB7cmVwb3J0LnRvdGFsRXZhbHVhdGVkR25pZGFzfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC01MDAgZm9udC1tb25vIG10LTEgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMgaC0zXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2t1dGVjem5vxZvEhzogMTAwJSBQVVJHRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1yb3NlLTkwMC81MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtcm9zZS0zMDAgdXBwZXJjYXNlIGZvbnQtYm9sZFwiPlcgUExJS0FDSCAoTlRGUy9FWEUvRExMKTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWJsYWNrIHRleHQtcm9zZS00MDAgZm9udC1tb25vIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlcG9ydC5maWxlc0NvdW50fSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbm9ybWFsXCI+emFncm/FvGXFhDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXJvc2UtNDAwIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFd5emVyb3dhbnkgbmFnxYLDs3dlayBNWiArIEFDTCBEZW55XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItcHVycGxlLTkwMC81MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCB1cHBlcmNhc2UgZm9udC1ib2xkXCI+VyBaxYHEhENaQUNIICYgTUFHSVNUUkFMQUNIPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtMnhsIHNtOnRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC1wdXJwbGUtNDAwIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZXBvcnQuY29ubmVjdG9yc0NvdW50fSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbm9ybWFsXCI+cHVua3TDs3c8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1wdXJwbGUtMzAwIGZvbnQtbW9ubyBtdC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIFBDSWUsIFVTQiBISUQsIFJBTSBERFI1LCBTb2NrZXRzXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItY3lhbi05MDAvNTAgc2hhZG93LWxnIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIHVwcGVyY2FzZSBmb250LWJvbGRcIj5QQVJBTUVUUlkgRkFMSSBFTTwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBzbTp0ZXh0LTN4bCBmb250LWJsYWNrIHRleHQtY3lhbi0zMDAgZm9udC1tb25vIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlcG9ydC5lbXBXYXZlUG93ZXJXYXR0c30gPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW5vcm1hbFwiPlc8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1jeWFuLTQwMCBmb250LW1vbm8gbXQtMVwiPlxuICAgICAgICAgICAgICAgICAgICBDesSZc3RvdGxpd2/Fm8SHIG5vxZtuYToge3JlcG9ydC5jYXJyaWVyRnJlcXVlbmN5VGh6fSBUSHpcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogQXNzZXNzbWVudCBDb25jbHVzaW9uICovfVxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2xhdGUtOTAwIHZpYS1jeWFuLTk1MC80MCB0by1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1jeWFuLTMwMCBmb250LW1vbm8gZm9udC1ib2xkIHRleHQtc20gbWItMlwiPlxuICAgICAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5PQ0VOQSBTS1VURUNaTk/FmkNJIFJPWldJxIRaQU5JQSAoV0FSVU5LSSBSWkVDWllXSVNURSk6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWQgZm9udC1zYW5zXCI+XG4gICAgICAgICAgICAgICAgICB7cmVwb3J0LmNvbmNsdXNpb259XG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMyBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC00IHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Ub3BvbG9naWEgQmFkYXdjemE6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPlphbWtuacSZdHkgTW9kZWwgNCBVcnrEhWR6ZcWEPC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UHJvbWllxYQgT2RkemlhxYJ5d2FuaWE6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC15ZWxsb3ctMzAwXCI+Jmx0Oz0gMTAgbWV0csOzdzwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkl6b2xhY2phIE9kZHppYcWCeXdhbmlhIEZhbGk6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMFwiPlcgb2JyxJliaWUgMSB1cnrEhWR6ZW5pYSAobG9rYWxuYSBuZXV0cmFsaXphY2phKTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFF1aWNrIFNwbGl0IFZpZXcgb2YgTmV1dHJhbGl6ZWQgVGFyZ2V0cyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgey8qIEZpbGVzIE1pbmkgTGlzdCAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItMlwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgdGV4dC1yb3NlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlVuaWVzemtvZGxpd2lvbmUgdyBQbGlrYWNoICh7cmVwb3J0LmZpbGVzQ291bnR9KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIFxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignZmlsZXMnKX0gXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtY3lhbi00MDAgaG92ZXI6dW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFN6Y3plZ8OzxYJ5ICZyYXJyO1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlcG9ydC5maWxlc0JyZWFrZG93bi5zbGljZSgwLCA0KS5tYXAoKGYsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aX0gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItcm9zZS05NTAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC1zbGF0ZS0yMDAgZm9udC1tb25vXCI+e2YubmFtZX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGUgZm9udC1tb25vXCI+e2YuZmlsZVBhdGh9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogQ29ubmVjdG9ycyBNaW5pIExpc3QgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIHRleHQtcHVycGxlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VW5pZXN6a29kbGl3aW9uZSB3IFrFgsSFY3phY2ggJiBNYWdpc3RyYWxhY2ggKHtyZXBvcnQuY29ubmVjdG9yc0NvdW50fSk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2Nvbm5lY3RvcnMnKX0gXG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtY3lhbi00MDAgaG92ZXI6dW5kZXJsaW5lIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIFN6Y3plZ8OzxYJ5ICZyYXJyO1xuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAge3JlcG9ydC5jb25uZWN0b3JzQnJlYWtkb3duLnNsaWNlKDAsIDQpLm1hcCgoYywgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpfSBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtOTUwIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc2xhdGUtMjAwIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2MubmFtZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtcHVycGxlLTQwMFwiPntjLmNvbm5lY3RvclR5cGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIHRydW5jYXRlIGZvbnQtbW9ub1wiPntjLmhhcmR3YXJlQWRkcmVzc09yQnVzfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogVEFCIDI6IEZJTEVTIEJSRUFLRE9XTiAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnZmlsZXMnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcm9zZS05NTAvNDAgYm9yZGVyIGJvcmRlci1yb3NlLTgwMC80MCB0ZXh0LXhzIHRleHQtcm9zZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+V3lrcnl0byBpIHVuaWVzemtvZGxpd2lvbm8gPHN0cm9uZz57cmVwb3J0LmZpbGVzQ291bnR9IHrFgm/Fm2xpd3ljaCBiaW5hcmVrIGkgYmlibGlvdGVrIERMTDwvc3Ryb25nPiBuYSBkeXNrdSBOVEZTLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDBcIj5TVEFUVVM6IFBFX1dJUEVEIC8gQUNMX0xPQ0tFRDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvdmVyZmxvdy14LWF1dG8gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bFwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICA8dGhlYWQgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtMzAwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTNcIj5OYXp3YSBQbGlrdTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtM1wiPsWaY2llxbxrYSBuYSBEeXNrdTwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInAtM1wiPlphc3Rvc293YW5hIEFrY2phPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zXCI+U2Fib3RhxbwgUEU8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTNcIj5CbG9rYWRhIEFDTDwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1zbGF0ZS04MDAvNjAgYmctc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZXBvcnQuZmlsZXNCcmVha2Rvd24ubWFwKChmLCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0gY2xhc3NOYW1lPVwiaG92ZXI6Ymctc2xhdGUtOTAwLzYwIHRyYW5zaXRpb24tY29sb3JzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0zIGZvbnQtYm9sZCB0ZXh0LXJvc2UtMzAwXCI+e2YubmFtZX08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMyB0ZXh0LXNsYXRlLTQwMCB0cnVuY2F0ZSBtYXgtdy14c1wiPntmLmZpbGVQYXRofTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0zIHRleHQtc2xhdGUtMzAwXCI+e2YuYWN0aW9ufTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmLnBlU2Fib3RhZ2VTdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzUwIHRleHQtWzEwcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmLmFjbExvY2tTdGF0dXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBUQUIgMzogQ09OTkVDVE9SUyBCUkVBS0RPV04gKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ2Nvbm5lY3RvcnMnICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC80MCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvNDAgdGV4dC14cyB0ZXh0LXB1cnBsZS0yMDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+VW5pZXN6a29kbGl3aW9ubyA8c3Ryb25nPntyZXBvcnQuY29ubmVjdG9yc0NvdW50fSBhZ3Jlc29yw7N3IHcgbWFnaXN0cmFsYWNoIHNwcnrEmXRvd3ljaCBpIHrFgsSFY3phY2ggd2VqxZtjaWEvd3lqxZtjaWE8L3N0cm9uZz4uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTQwMFwiPlNUQVRVUzogSU5URVJGQUNFU19QVVJHRUQ8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwib3ZlcmZsb3cteC1hdXRvIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGxcIj5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCB0ZXh0LXhzIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgPHRoZWFkIGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCB0ZXh0LXNsYXRlLTMwMCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zXCI+TmF6d2EgWmFncm/FvGVuaWE8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTNcIj5UeXAgWsWCxIVjemEgLyBJbnRlcmZlanN1PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zXCI+QWRyZXMgU3ByesSZdG93eSAvIE1hZ2lzdHJhbGE8L3RoPlxuICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwLTNcIj5aYXN0b3Nvd2FuYSBOZXV0cmFsaXphY2phPC90aD5cbiAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicC0zXCI+U3RhbiBLb8WEY293eTwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgICAgICAgPHRib2R5IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1zbGF0ZS04MDAvNjAgYmctc2xhdGUtOTUwXCI+XG4gICAgICAgICAgICAgICAgICAgIHtyZXBvcnQuY29ubmVjdG9yc0JyZWFrZG93bi5tYXAoKGMsIGkpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfSBjbGFzc05hbWU9XCJob3ZlcjpiZy1zbGF0ZS05MDAvNjAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTMgZm9udC1ib2xkIHRleHQtcHVycGxlLTMwMFwiPntjLm5hbWV9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1jeWFuLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi01MDAvNTAgdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2MuY29ubmVjdG9yVHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwLTMgdGV4dC1zbGF0ZS00MDBcIj57Yy5oYXJkd2FyZUFkZHJlc3NPckJ1c308L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtMyB0ZXh0LXNsYXRlLTMwMFwiPntjLmFjdGlvbn08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC81MCB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Yy5zdGF0ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRBQiA0OiBDTE9TRUQgNC1ERVZJQ0UgTUVTSCBMQUIgTU9ERUwgKi99XG4gICAgICAgICAge2FjdGl2ZVRhYiA9PT0gJ21lc2g0JyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLWN5YW4tODAwLzUwIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNtIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgxIZXSUNaRU5JQSBXIFdBUlVOS0FDSCBSWkVDWllXSVNUWUNIOiBaQU1LTknEmFRZIE1PREVMIDQgVVJaxIREWkXFg1xuICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMSBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgICAgICAgICAgQmFkYW5pZSBza3V0ZWN6bm/Fm2NpIHcgb2JyxJliaWUgbmlld2llbGtpY2ggc2llY2kgbG9rYWxueWNoIG8gZHlzdGFuc2llIGRvIDEwIG1ldHLDs3cuIEZhbGEgZWxla3Ryb21hZ25ldHljem5hIHByb3BhZ3VqZSBwcnpleiBzaWXEhywgbGVjeiBqZWogdW5pZXN6a29kbGl3aWFuaWUgZHppYcWCYSBwcmVjeXp5am5pZSB3IG9icsSZYmllIGRhbmVnbyB1cnrEhWR6ZW5pYSwgbmllIHVzemthZHphasSFYyBwb8WCxIVjemXFhCBtZXNoLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1jeWFuLTk1MCBib3JkZXIgYm9yZGVyLWN5YW4tNDAwIHRleHQtY3lhbi0zMDAgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICBaQVNJxJhHIEJBREFOSUE6ICZsZTsgMTAgTUVUUsOTV1xuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICB7cmVwb3J0LmRldmljZXNUZWxlbWV0cnkubWFwKChkKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17ZC5ub2RlSWR9IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gZm9udC1ib2xkIHB4LTIgcHktMC41IHJvdW5kZWQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7ZC5ub2RlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQteWVsbG93LTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtkLmRpc3RhbmNlTWV0ZXJzfSBtXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ub1wiPntkLm5vZGVOYW1lfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlJvbGE6IHtkLm1lc2hSb2xlfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC1bMTBweF0gZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj57ZC5zdGF0dXN9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtY3lhbi00MDBcIj57ZC5lbXBJbXBhY3R9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogVEFCIDU6IFJBVyBURVhUIFJFUE9SVCAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAncmF3VGV4dCcgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlNmb3JtYXRvd2FueSBsb2cgcmFwb3J0dSB3IGZvcm1hY2llIHRla3N0b3d5bTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShnZW5lcmF0ZVBvc3RFbXBSZXBvcnRUZXh0KHJlcG9ydCkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y29waWVkID8gJ+KclCBTa29waW93YW5vIScgOiAnS29waXVqIGRvIFNjaG93a2EnfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgdGV4dC1zbGF0ZS0zMDAgZm9udC1tb25vIHRleHQteHMgbGVhZGluZy1yZWxheGVkIG92ZXJmbG93LXgtYXV0byBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBtYXgtaC05NlwiPlxuICAgICAgICAgICAgICAgIHtnZW5lcmF0ZVBvc3RFbXBSZXBvcnRUZXh0KHJlcG9ydCl9XG4gICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBUQUIgNjogUkFXIEpTT04gUkVQT1JUICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdyYXdKc29uJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+UGXFgm5hIHN0cnVrdHVyYSBkYW55Y2ggdGVsZW1ldHJ5Y3pueWNoIHcgZm9ybWFjaWUgSlNPTjo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShnZW5lcmF0ZVBvc3RFbXBSZXBvcnRKc29uKHJlcG9ydCkpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7Y29waWVkID8gJ+KclCBTa29waW93YW5vIEpTT04hJyA6ICdLb3BpdWogSlNPTid9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMCB0ZXh0LWN5YW4tMzAwIGZvbnQtbW9ubyB0ZXh0LXhzIGxlYWRpbmctcmVsYXhlZCBvdmVyZmxvdy14LWF1dG8gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgbWF4LWgtOTZcIj5cbiAgICAgICAgICAgICAgICB7Z2VuZXJhdGVQb3N0RW1wUmVwb3J0SnNvbihyZXBvcnQpfVxuICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIE1vZGFsIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHgtNiBweS0zLjUgYmctc2xhdGUtOTAwLzkwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoLTIgdy0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlN0YXR1czogUmFwb3J0IHp3ZXJ5Zmlrb3dhbnkg4oCiIEdvdG93eSBkbyBhcmNoaXdpemFjamkgaSBhbmFsaXp5IHBvd8WCYW1hbmlvd2VqPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFphbWtuaWpcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBMENjO0FBMUNkLFNBQWdCLGdCQUFnQjtBQUNoQztBQUFBLEVBQ0U7QUFBQSxFQUFHO0FBQUEsRUFBVTtBQUFBLEVBQVU7QUFBQSxFQUFjO0FBQUEsRUFBYTtBQUFBLEVBQ2xEO0FBQUEsRUFBVztBQUFBLEVBQU87QUFBQSxFQUFRO0FBQUEsRUFBeUI7QUFBQSxPQUM5QztBQUVQO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDSztBQVFBLGFBQU0scUJBQXdELENBQUM7QUFBQSxFQUNwRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsTUFBTTtBQUNKLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFnRixVQUFVO0FBQzVILFFBQU0sQ0FBQyxRQUFRLFNBQVMsSUFBSSxTQUFrQixLQUFLO0FBRW5ELE1BQUksQ0FBQyxVQUFVLENBQUMsT0FBUSxRQUFPO0FBRS9CLFFBQU0sYUFBYSxDQUFDLFNBQWlCO0FBQ25DLGNBQVUsVUFBVSxVQUFVLElBQUk7QUFDbEMsY0FBVSxJQUFJO0FBQ2QsZUFBVyxNQUFNLFVBQVUsS0FBSyxHQUFHLEdBQUk7QUFBQSxFQUN6QztBQUVBLFNBQ0UsdUJBQUMsU0FBSSxXQUFVLHdIQUNiLGlDQUFDLFNBQUksV0FBVSw0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QUE7QUFBQTtBQUFBLGVBUUE7QUFBQSxRQUNBLHVCQUFDLFNBQUksV0FBVSxpSUFDWixvQ0FBMEIsTUFBTSxLQURuQztBQUFBO0FBQUE7QUFBQTtBQUFBLGVBRUE7QUFBQSxXQVpGO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFhQTtBQUFBLE1BSUQsY0FBYyxhQUNiLHVCQUFDLFNBQUksV0FBVSxhQUNiO0FBQUEsK0JBQUMsU0FBSSxXQUFVLHFDQUNiO0FBQUEsaUNBQUMsVUFBSyxXQUFVLG9DQUFtQyx1RUFBbkQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFBMEc7QUFBQSxVQUMxRztBQUFBLFlBQUM7QUFBQTtBQUFBLGNBQ0MsU0FBUyxNQUFNLFdBQVcsMEJBQTBCLE1BQU0sQ0FBQztBQUFBLGNBQzNELFdBQVU7QUFBQSxjQUVULG1CQUFTLHVCQUF1QjtBQUFBO0FBQUEsWUFKbkM7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFVBS0E7QUFBQSxhQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFRQTtBQUFBLFFBQ0EsdUJBQUMsU0FBSSxXQUFVLGdJQUNaLG9DQUEwQixNQUFNLEtBRG5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFFQTtBQUFBLFdBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQWFBO0FBQUEsU0F4Uko7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQTJSQTtBQUFBLElBR0EsdUJBQUMsU0FBSSxXQUFVLDRIQUNiO0FBQUEsNkJBQUMsU0FBSSxXQUFVLDJCQUNiO0FBQUEsK0JBQUMsVUFBSyxXQUFVLHVEQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW9FO0FBQUEsUUFDcEUsdUJBQUMsVUFBSyw2RkFBTjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQW1GO0FBQUEsV0FGckY7QUFBQTtBQUFBO0FBQUE7QUFBQSxhQUdBO0FBQUEsTUFDQTtBQUFBLFFBQUM7QUFBQTtBQUFBLFVBQ0MsU0FBUztBQUFBLFVBQ1QsV0FBVTtBQUFBLFVBQ1g7QUFBQTtBQUFBLFFBSEQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE1BS0E7QUFBQSxTQVZGO0FBQUE7QUFBQTtBQUFBO0FBQUEsV0FXQTtBQUFBLE9BbmJGO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FxYkEsS0F0YkY7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQXViQTtBQUVKOyIsIm5hbWVzIjpbXX0=