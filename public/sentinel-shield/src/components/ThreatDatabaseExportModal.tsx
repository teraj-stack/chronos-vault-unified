import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useRef = __vite__cjsImport1_react["useRef"];
import {
  X,
  Download,
  Copy,
  Check,
  FileJson,
  Share2,
  Upload,
  ShieldCheck,
  AlertCircle,
  Database,
  Lock,
  Terminal,
  HardDrive,
  Cpu,
  CheckCircle2,
  FileDown
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  downloadThreatDatabaseJson,
  exportThreatsToJsonString,
  validateAndParseSentinelJson,
  mergeImportedThreats,
  extractGnidaSignatures
} from "/sentinel-shield/src/utils/threatDatabaseExporter.ts";
import { downloadNeutralizedThreatsPdf } from "/sentinel-shield/src/utils/forensicsPdfExporter.ts";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
export const ThreatDatabaseExportModal = ({
  isOpen,
  onClose,
  threats,
  focusLogs,
  onThreatsUpdated
}) => {
  const [exportType, setExportType] = useState("FULL_THREAT_LEDGER");
  const [activeTab, setActiveTab] = useState("EXPORT");
  const [copied, setCopied] = useState(false);
  const [importStatus, setImportStatus] = useState(null);
  const fileInputRef = useRef(null);
  if (!isOpen) return null;
  const signatures = extractGnidaSignatures(threats);
  const jsonPreview = exportThreatsToJsonString(threats, focusLogs, true, exportType);
  const handleCopyJson = () => {
    navigator.clipboard.writeText(jsonPreview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDownload = () => {
    downloadThreatDatabaseJson(threats, focusLogs, exportType);
  };
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (!content) return;
      const result = validateAndParseSentinelJson(content);
      if (!result.valid || !result.packageData) {
        setImportStatus({
          success: false,
          message: result.error || "Nie udało się przetworzyć pliku JSON."
        });
        return;
      }
      const incomingThreats = result.packageData.neutralizedThreats || [];
      if (incomingThreats.length === 0) {
        setImportStatus({
          success: true,
          message: `Wczytano pomyślnie ${result.packageData.gnidaSignatures?.length || 0} sygnatur gnid (tryb sygnaturowy).`,
          added: 0,
          updated: 0
        });
        return;
      }
      const mergeResult = mergeImportedThreats(incomingThreats, threats);
      safeStorage.set("sentinel_custom_threats", mergeResult.merged);
      onThreatsUpdated(mergeResult.merged);
      setImportStatus({
        success: true,
        message: `Pomyślnie scalono bazę zagrożeń z zewnętrznej jednostki Sentinel!`,
        added: mergeResult.addedCount,
        updated: mergeResult.updatedCount
      });
    };
    reader.readAsText(file);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 border-2 border-cyan-500/60 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl shadow-cyan-950/60 overflow-hidden font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 bg-gradient-to-r from-slate-900 via-cyan-950/80 to-slate-900 border-b border-cyan-500/40 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Share2, { className: "w-6 h-6 text-cyan-300 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 109,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 108,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("h2", { className: "text-lg font-black text-white font-mono tracking-wide", children: "WSPÓŁDZIELENIE BAZY ZAGROŻEŃ & SYGNATUR GNID (JSON AIR-GAP)" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 113,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-cyan-900/80 text-cyan-300 border border-cyan-400/50 text-[10px] font-bold font-mono", children: "v4.2 SYNC" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 116,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 112,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono mt-0.5", children: "Eksportuj i importuj sygnatury zneutralizowanych gnid w formatach JSON między odizolowanymi stacjami roboczymi." }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 120,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 111,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: onClose,
          className: "p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer",
          children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 130,
            columnNumber: 13
          }, this)
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 126,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex border-b border-slate-800 bg-slate-900/60 px-5 pt-3 gap-2", children: [
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("EXPORT"),
          className: `px-4 py-2 rounded-t-xl font-mono text-xs font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${activeTab === "EXPORT" ? "bg-slate-950 text-cyan-300 border-cyan-500/50 shadow-md" : "bg-transparent text-slate-400 border-transparent hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 144,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Eksport Bazy JSON (",
              threats.length,
              " Zagrożeń)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 145,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 136,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("SIGNATURES_BROWSER"),
          className: `px-4 py-2 rounded-t-xl font-mono text-xs font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${activeTab === "SIGNATURES_BROWSER" ? "bg-slate-950 text-purple-300 border-purple-500/50 shadow-md" : "bg-transparent text-slate-400 border-transparent hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Database, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 156,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Przeglądarka Sygnatur Gnid (",
              signatures.length,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 157,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 148,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setActiveTab("IMPORT_MERGE"),
          className: `px-4 py-2 rounded-t-xl font-mono text-xs font-bold flex items-center gap-2 border-t border-x transition-all cursor-pointer ${activeTab === "IMPORT_MERGE" ? "bg-slate-950 text-emerald-300 border-emerald-500/50 shadow-md" : "bg-transparent text-slate-400 border-transparent hover:text-slate-200"}`,
          children: [
            /* @__PURE__ */ jsxDEV(Upload, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 168,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Importuj & Scal Bazę z Innej Jednostki" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 169,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 160,
          columnNumber: 11
        },
        this
      )
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
      lineNumber: 135,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex-1 overflow-y-auto p-5 space-y-4", children: [
      activeTab === "EXPORT" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setExportType("FULL_THREAT_LEDGER"),
              className: `p-3.5 rounded-xl border cursor-pointer transition-all ${exportType === "FULL_THREAT_LEDGER" ? "bg-cyan-950/40 border-cyan-400 shadow-lg shadow-cyan-950/40" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs font-mono text-cyan-300", children: "Pełna Kartoteka Zagrożeń" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 190,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(FileJson, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 191,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 189,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Zawiera wszystkie szczegóły kryminalistyczne, wektory ataku, kroki uboju, skrypty Pythona i sygnatury." }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 193,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 181,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setExportType("GNIDA_SIGNATURES_ONLY"),
              className: `p-3.5 rounded-xl border cursor-pointer transition-all ${exportType === "GNIDA_SIGNATURES_ONLY" ? "bg-purple-950/40 border-purple-400 shadow-lg shadow-purple-950/40" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs font-mono text-purple-300", children: "Tylko Sygnatury Gnid" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 207,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 208,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 206,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Kompaktowy słownik sum SHA256, reguł YARA, słów kluczowych i kodów zamrażania dla demonów." }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 210,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 198,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "div",
            {
              onClick: () => setExportType("AIRGAP_RAPID_SYNC"),
              className: `p-3.5 rounded-xl border cursor-pointer transition-all ${exportType === "AIRGAP_RAPID_SYNC" ? "bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-950/40" : "bg-slate-900/60 border-slate-800 hover:border-slate-700"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between mb-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-xs font-mono text-emerald-300", children: "Szybki Pakiet Air-Gap" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 224,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 225,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 223,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Zoptymalizowany pod kątem przenoszenia pendrive'em USB między wieloma jednostkami Sentinel." }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 227,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 215,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 180,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "rounded-xl border border-slate-800 bg-slate-950 overflow-hidden shadow-inner", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-slate-300", children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 237,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Podgląd Wyjściowy JSON (",
                exportType,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 238,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 236,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => {
                    downloadNeutralizedThreatsPdf(threats, focusLogs, {
                      reportTitle: "SENTINEL INCIDENT RESPONSE & FORENSICS AUDIT DOSSIER",
                      classification: "RESTRICTED FORENSIC LOG"
                    });
                  },
                  className: "px-3 py-1 rounded bg-purple-700 hover:bg-purple-600 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-md shadow-purple-950/60",
                  title: "Pobierz pełny sformatowany i ostemplowany czasowo raport PDF",
                  children: [
                    /* @__PURE__ */ jsxDEV(FileDown, { className: "w-3 h-3 text-yellow-300" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 251,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Raport PDF (Forensics)" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 252,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 241,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleCopyJson,
                  className: "px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 cursor-pointer transition-colors",
                  children: [
                    copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3 h-3 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 258,
                      columnNumber: 33
                    }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 258,
                      columnNumber: 82
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: copied ? "Skopiowano!" : "Kopiuj JSON" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 259,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 254,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownload,
                  className: "px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-black font-bold flex items-center gap-1 cursor-pointer transition-colors",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 265,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Plik .json" }, void 0, false, {
                      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                      lineNumber: 266,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 261,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 240,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 235,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("pre", { className: "p-4 text-[11px] font-mono text-cyan-300/90 bg-black/70 overflow-x-auto max-h-[300px] leading-relaxed select-all", children: jsonPreview }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 270,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 234,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-cyan-400 shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 277,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: "100% ZGODNOŚĆ Z AIR-GAP & OFFLINE MONOLITH:" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 279,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "mt-0.5", children: [
              "Plik JSON zawiera sumę kontrolną autentyczności ",
              /* @__PURE__ */ jsxDEV("code", { children: "airGapSyncHash" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 281,
                columnNumber: 69
              }, this),
              ", co pozwala innym jednostkom Sentinel natychmiast zweryfikować integralność bazy bez potrzeby połączenia z siecią."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 280,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 278,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 276,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 178,
        columnNumber: 13
      }, this),
      activeTab === "SIGNATURES_BROWSER" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { children: [
            "Zarejestrowane Sygnatury Gnid (",
            signatures.length,
            "):"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 292,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400", children: "YARA & Win32 PE Heuristics" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 293,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 291,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1", children: signatures.map((sig) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/50 transition-all space-y-2",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800/60 font-bold", children: sig.signatureId }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 304,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white font-mono mt-1", children: sig.threatName }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 307,
                    columnNumber: 25
                  }, this),
                  sig.alias && /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 font-mono", children: [
                    "Alias: ",
                    sig.alias
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 308,
                    columnNumber: 39
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 303,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold font-mono ${sig.severity === "CRITICAL" ? "bg-red-950 text-red-300 border border-red-800" : "bg-amber-950 text-amber-300 border border-amber-800"}`, children: sig.severity }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 310,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 302,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] font-mono text-slate-400 space-y-1", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "SHA256:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 319,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300 text-[10px] truncate max-w-[280px]", children: sig.sha256Hash }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 320,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 318,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Kategoria:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 323,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: sig.category }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 324,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 322,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Flagi PE:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 327,
                    columnNumber: 25
                  }, this),
                  sig.peStructuralFlags.map((flag, idx) => /* @__PURE__ */ jsxDEV("span", { className: "px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-purple-300 border border-purple-800/40", children: flag }, idx, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 329,
                    columnNumber: 27
                  }, this))
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 326,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 317,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Status: ",
                  /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: sig.status }, void 0, false, {
                    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                    lineNumber: 337,
                    columnNumber: 37
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 337,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Entropia: ",
                  sig.entropy,
                  "/8.0"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 338,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 336,
                columnNumber: 21
              }, this)
            ]
          },
          sig.signatureId,
          true,
          {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 298,
            columnNumber: 19
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 296,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 290,
        columnNumber: 13
      }, this),
      activeTab === "IMPORT_MERGE" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-dashed border-emerald-500/40 text-center space-y-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "w-12 h-12 mx-auto rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center text-emerald-300", children: /* @__PURE__ */ jsxDEV(Upload, { className: "w-6 h-6 animate-bounce" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 351,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 350,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono", children: "Wgraj Plik Bazy Zagrożeń (.json) z Innej Jednostki Sentinel" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 354,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono mt-1 max-w-lg mx-auto", children: "Obsługuje pliki wyeksportowane z dowolnego węzła Sentinel Shield (Full Threat Ledger, Signatures Bundle lub AirGap Rapid Sync)." }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 357,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 353,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "file",
              ref: fileInputRef,
              onChange: handleFileUpload,
              accept: ".json,application/json",
              className: "hidden"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 362,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => fileInputRef.current?.click(),
              className: "px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-black font-bold font-mono text-xs shadow-lg shadow-emerald-950 transition-all cursor-pointer inline-flex items-center gap-2",
              children: [
                /* @__PURE__ */ jsxDEV(Upload, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 374,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wybierz Plik JSON z Dysku" }, void 0, false, {
                  fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                  lineNumber: 375,
                  columnNumber: 19
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 370,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 349,
          columnNumber: 15
        }, this),
        importStatus && /* @__PURE__ */ jsxDEV("div", { className: `p-4 rounded-xl border font-mono text-xs flex items-start gap-3 ${importStatus.success ? "bg-emerald-950/60 border-emerald-500/60 text-emerald-200" : "bg-red-950/60 border-red-500/60 text-red-200"}`, children: [
          importStatus.success ? /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 386,
            columnNumber: 21
          }, this) : /* @__PURE__ */ jsxDEV(AlertCircle, { className: "w-5 h-5 text-red-400 shrink-0 mt-0.5" }, void 0, false, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 388,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: importStatus.message }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 391,
              columnNumber: 21
            }, this),
            importStatus.success && importStatus.added !== void 0 && /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-emerald-300/80 mt-1", children: [
              "Dodano nowych incydentów: ",
              /* @__PURE__ */ jsxDEV("strong", { children: importStatus.added }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 394,
                columnNumber: 51
              }, this),
              " | Zaktualizowano istniejących: ",
              /* @__PURE__ */ jsxDEV("strong", { children: importStatus.updated }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 394,
                columnNumber: 120
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 393,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 390,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 380,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 font-mono text-xs text-slate-400", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-200 font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 404,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Procedura Dystrybucji Air-Gap w Odizolowanych Środowiskach:" }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 405,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 403,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("ol", { className: "list-decimal list-inside space-y-1 text-[11px] leading-relaxed text-slate-400", children: [
            /* @__PURE__ */ jsxDEV("li", { children: "Wyeksportuj plik JSON na komputerze laboratoryjnym jednostki Sentinel." }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 408,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: "Zapisz plik na sformatowanym nośniku USB (FAT32/exFAT)." }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 409,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: [
              "Przenieś nośnik na odizolowaną maszynę i kliknij ",
              /* @__PURE__ */ jsxDEV("em", { children: '"Wybierz Plik JSON z Dysku"' }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 410,
                columnNumber: 72
              }, this),
              "."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 410,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("li", { children: "System automatycznie zaktualizuje bazę sygnatur i zintegruje reguły uboju z lokalnym demonem NtSuspendProcess." }, void 0, false, {
              fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
              lineNumber: 411,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 407,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 402,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 348,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
      lineNumber: 174,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-xs font-mono", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Baza aktywna: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: [
            threats.length,
            " zagrożeń"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 421,
            columnNumber: 33
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 421,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 422,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Sygnatury: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-purple-300", children: [
            signatures.length,
            " reguł"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 423,
            columnNumber: 30
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
          lineNumber: 423,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 420,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownload,
            className: "px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold flex items-center gap-1.5 cursor-pointer shadow transition-all",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 431,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Eksportuj Baza JSON" }, void 0, false, {
                fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
                lineNumber: 432,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 427,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onClose,
            className: "px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold cursor-pointer transition-colors",
            children: "Zamknij"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
            lineNumber: 434,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
        lineNumber: 426,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
      lineNumber: 419,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
    lineNumber: 103,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "/app/applet/src/components/ThreatDatabaseExportModal.tsx",
    lineNumber: 102,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRocmVhdERhdGFiYXNlRXhwb3J0TW9kYWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFgsIERvd25sb2FkLCBDb3B5LCBDaGVjaywgRmlsZUpzb24sIFNoYXJlMiwgVXBsb2FkLCBcbiAgU2hpZWxkQ2hlY2ssIEFsZXJ0Q2lyY2xlLCBEYXRhYmFzZSwgTG9jaywgVGVybWluYWwsIFxuICBMYXllcnMsIEhhcmREcml2ZSwgQ3B1LCBDaGVja0NpcmNsZTIsIEFycm93UmlnaHQsIFJlZnJlc2hDdywgRmlsZURvd25cbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IE5ldXRyYWxpemVkVGhyZWF0LCBGb2N1c0hpamFja0F0dGVtcHQgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBcbiAgZG93bmxvYWRUaHJlYXREYXRhYmFzZUpzb24sIFxuICBleHBvcnRUaHJlYXRzVG9Kc29uU3RyaW5nLFxuICB2YWxpZGF0ZUFuZFBhcnNlU2VudGluZWxKc29uLFxuICBtZXJnZUltcG9ydGVkVGhyZWF0cyxcbiAgZXh0cmFjdEduaWRhU2lnbmF0dXJlcyxcbiAgR25pZGFTaWduYXR1cmVJdGVtXG59IGZyb20gJy4uL3V0aWxzL3RocmVhdERhdGFiYXNlRXhwb3J0ZXInO1xuaW1wb3J0IHsgZG93bmxvYWROZXV0cmFsaXplZFRocmVhdHNQZGYgfSBmcm9tICcuLi91dGlscy9mb3JlbnNpY3NQZGZFeHBvcnRlcic7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuXG5pbnRlcmZhY2UgVGhyZWF0RGF0YWJhc2VFeHBvcnRNb2RhbFByb3BzIHtcbiAgaXNPcGVuOiBib29sZWFuO1xuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xuICB0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdO1xuICBmb2N1c0xvZ3M6IEZvY3VzSGlqYWNrQXR0ZW1wdFtdO1xuICBvblRocmVhdHNVcGRhdGVkOiAodXBkYXRlZFRocmVhdHM6IE5ldXRyYWxpemVkVGhyZWF0W10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBjb25zdCBUaHJlYXREYXRhYmFzZUV4cG9ydE1vZGFsOiBSZWFjdC5GQzxUaHJlYXREYXRhYmFzZUV4cG9ydE1vZGFsUHJvcHM+ID0gKHtcbiAgaXNPcGVuLFxuICBvbkNsb3NlLFxuICB0aHJlYXRzLFxuICBmb2N1c0xvZ3MsXG4gIG9uVGhyZWF0c1VwZGF0ZWRcbn0pID0+IHtcbiAgY29uc3QgW2V4cG9ydFR5cGUsIHNldEV4cG9ydFR5cGVdID0gdXNlU3RhdGU8J0ZVTExfVEhSRUFUX0xFREdFUicgfCAnR05JREFfU0lHTkFUVVJFU19PTkxZJyB8ICdBSVJHQVBfUkFQSURfU1lOQyc+KCdGVUxMX1RIUkVBVF9MRURHRVInKTtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdFWFBPUlQnIHwgJ0lNUE9SVF9NRVJHRScgfCAnU0lHTkFUVVJFU19CUk9XU0VSJz4oJ0VYUE9SVCcpO1xuICBjb25zdCBbY29waWVkLCBzZXRDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaW1wb3J0U3RhdHVzLCBzZXRJbXBvcnRTdGF0dXNdID0gdXNlU3RhdGU8eyBzdWNjZXNzOiBib29sZWFuOyBtZXNzYWdlOiBzdHJpbmc7IGFkZGVkPzogbnVtYmVyOyB1cGRhdGVkPzogbnVtYmVyIH0gfCBudWxsPihudWxsKTtcbiAgY29uc3QgZmlsZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuXG4gIGlmICghaXNPcGVuKSByZXR1cm4gbnVsbDtcblxuICBjb25zdCBzaWduYXR1cmVzOiBHbmlkYVNpZ25hdHVyZUl0ZW1bXSA9IGV4dHJhY3RHbmlkYVNpZ25hdHVyZXModGhyZWF0cyk7XG4gIGNvbnN0IGpzb25QcmV2aWV3ID0gZXhwb3J0VGhyZWF0c1RvSnNvblN0cmluZyh0aHJlYXRzLCBmb2N1c0xvZ3MsIHRydWUsIGV4cG9ydFR5cGUpO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlKc29uID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGpzb25QcmV2aWV3KTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZCA9ICgpID0+IHtcbiAgICBkb3dubG9hZFRocmVhdERhdGFiYXNlSnNvbih0aHJlYXRzLCBmb2N1c0xvZ3MsIGV4cG9ydFR5cGUpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUZpbGVVcGxvYWQgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHtcbiAgICBjb25zdCBmaWxlID0gZS50YXJnZXQuZmlsZXM/LlswXTtcbiAgICBpZiAoIWZpbGUpIHJldHVybjtcblxuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgcmVhZGVyLm9ubG9hZCA9IChldmVudCkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGV2ZW50LnRhcmdldD8ucmVzdWx0IGFzIHN0cmluZztcbiAgICAgIGlmICghY29udGVudCkgcmV0dXJuO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSB2YWxpZGF0ZUFuZFBhcnNlU2VudGluZWxKc29uKGNvbnRlbnQpO1xuICAgICAgaWYgKCFyZXN1bHQudmFsaWQgfHwgIXJlc3VsdC5wYWNrYWdlRGF0YSkge1xuICAgICAgICBzZXRJbXBvcnRTdGF0dXMoe1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2U6IHJlc3VsdC5lcnJvciB8fCAnTmllIHVkYcWCbyBzacSZIHByemV0d29yennEhyBwbGlrdSBKU09OLidcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5jb21pbmdUaHJlYXRzID0gcmVzdWx0LnBhY2thZ2VEYXRhLm5ldXRyYWxpemVkVGhyZWF0cyB8fCBbXTtcbiAgICAgIGlmIChpbmNvbWluZ1RocmVhdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHNldEltcG9ydFN0YXR1cyh7XG4gICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICBtZXNzYWdlOiBgV2N6eXRhbm8gcG9tecWbbG5pZSAke3Jlc3VsdC5wYWNrYWdlRGF0YS5nbmlkYVNpZ25hdHVyZXM/Lmxlbmd0aCB8fCAwfSBzeWduYXR1ciBnbmlkICh0cnliIHN5Z25hdHVyb3d5KS5gLFxuICAgICAgICAgIGFkZGVkOiAwLFxuICAgICAgICAgIHVwZGF0ZWQ6IDBcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVyZ2VSZXN1bHQgPSBtZXJnZUltcG9ydGVkVGhyZWF0cyhpbmNvbWluZ1RocmVhdHMsIHRocmVhdHMpO1xuICAgICAgXG4gICAgICAvLyBTYXZlIGN1c3RvbSB0aHJlYXRzIGluIHBlcnNpc3RlbnQgc2FmZVN0b3JhZ2VcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfY3VzdG9tX3RocmVhdHMnLCBtZXJnZVJlc3VsdC5tZXJnZWQpO1xuICAgICAgb25UaHJlYXRzVXBkYXRlZChtZXJnZVJlc3VsdC5tZXJnZWQpO1xuXG4gICAgICBzZXRJbXBvcnRTdGF0dXMoe1xuICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICBtZXNzYWdlOiBgUG9tecWbbG5pZSBzY2Fsb25vIGJhesSZIHphZ3JvxbxlxYQgeiB6ZXduxJl0cnpuZWogamVkbm9zdGtpIFNlbnRpbmVsIWAsXG4gICAgICAgIGFkZGVkOiBtZXJnZVJlc3VsdC5hZGRlZENvdW50LFxuICAgICAgICB1cGRhdGVkOiBtZXJnZVJlc3VsdC51cGRhdGVkQ291bnRcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZWFkZXIucmVhZEFzVGV4dChmaWxlKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay84NSBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtaW4gZmFkZS1pbiBkdXJhdGlvbi0yMDBcIj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlci0yIGJvcmRlci1jeWFuLTUwMC82MCByb3VuZGVkLTJ4bCB3LWZ1bGwgbWF4LXctNXhsIG1heC1oLVs5MHZoXSBmbGV4IGZsZXgtY29sIHNoYWRvdy0yeGwgc2hhZG93LWN5YW4tOTUwLzYwIG92ZXJmbG93LWhpZGRlbiBmb250LXNhbnNcIj5cbiAgICAgICAgXG4gICAgICAgIHsvKiBIZWFkZXIgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLWN5YW4tOTUwLzgwIHRvLXNsYXRlLTkwMCBib3JkZXItYiBib3JkZXItY3lhbi01MDAvNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLWN5YW4tOTUwIGJvcmRlciBib3JkZXItY3lhbi00MDAgdGV4dC1jeWFuLTMwMCBzaGFkb3ctbWRcIj5cbiAgICAgICAgICAgICAgPFNoYXJlMiBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtY3lhbi0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIHRyYWNraW5nLXdpZGVcIj5cbiAgICAgICAgICAgICAgICAgIFdTUMOTxYFEWklFTEVOSUUgQkFaWSBaQUdST8W7RcWDICYgU1lHTkFUVVIgR05JRCAoSlNPTiBBSVItR0FQKVxuICAgICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1jeWFuLTkwMC84MCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi00MDAvNTAgdGV4dC1bMTBweF0gZm9udC1ib2xkIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgdjQuMiBTWU5DXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgRWtzcG9ydHVqIGkgaW1wb3J0dWogc3lnbmF0dXJ5IHpuZXV0cmFsaXpvd2FueWNoIGduaWQgdyBmb3JtYXRhY2ggSlNPTiBtacSZZHp5IG9kaXpvbG93YW55bWkgc3RhY2phbWkgcm9ib2N6eW1pLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFiIE5hdmlnYXRpb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGJnLXNsYXRlLTkwMC82MCBweC01IHB0LTMgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ0VYUE9SVCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQtdC14bCBmb250LW1vbm8gdGV4dC14cyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgYm9yZGVyLXQgYm9yZGVyLXggdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnRVhQT1JUJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MCB0ZXh0LWN5YW4tMzAwIGJvcmRlci1jeWFuLTUwMC81MCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgOiAnYmctdHJhbnNwYXJlbnQgdGV4dC1zbGF0ZS00MDAgYm9yZGVyLXRyYW5zcGFyZW50IGhvdmVyOnRleHQtc2xhdGUtMjAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkVrc3BvcnQgQmF6eSBKU09OICh7dGhyZWF0cy5sZW5ndGh9IFphZ3JvxbxlxYQpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdTSUdOQVRVUkVTX0JST1dTRVInKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTQgcHktMiByb3VuZGVkLXQteGwgZm9udC1tb25vIHRleHQteHMgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci10IGJvcmRlci14IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ1NJR05BVFVSRVNfQlJPV1NFUidcbiAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlci1wdXJwbGUtNTAwLzUwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICdiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItdHJhbnNwYXJlbnQgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8RGF0YWJhc2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UHJ6ZWdsxIVkYXJrYSBTeWduYXR1ciBHbmlkICh7c2lnbmF0dXJlcy5sZW5ndGh9KTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignSU1QT1JUX01FUkdFJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC10LXhsIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBib3JkZXItdCBib3JkZXIteCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdJTVBPUlRfTUVSR0UnXG4gICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICdiZy10cmFuc3BhcmVudCB0ZXh0LXNsYXRlLTQwMCBib3JkZXItdHJhbnNwYXJlbnQgaG92ZXI6dGV4dC1zbGF0ZS0yMDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8VXBsb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkltcG9ydHVqICYgU2NhbCBCYXrEmSB6IElubmVqIEplZG5vc3RraTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIENvbnRlbnQgQm9keSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgb3ZlcmZsb3cteS1hdXRvIHAtNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICBcbiAgICAgICAgICB7LyogVEFCIDE6IEVYUE9SVCAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnRVhQT1JUJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICB7LyogVHlwZSBTZWxlY3RvcnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMyBnYXAtM1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRFeHBvcnRUeXBlKCdGVUxMX1RIUkVBVF9MRURHRVInKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMy41IHJvdW5kZWQteGwgYm9yZGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydFR5cGUgPT09ICdGVUxMX1RIUkVBVF9MRURHRVInXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAvNDAgYm9yZGVyLWN5YW4tNDAwIHNoYWRvdy1sZyBzaGFkb3ctY3lhbi05NTAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzYwIGJvcmRlci1zbGF0ZS04MDAgaG92ZXI6Ym9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQteHMgZm9udC1tb25vIHRleHQtY3lhbi0zMDBcIj5QZcWCbmEgS2FydG90ZWthIFphZ3JvxbxlxYQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxGaWxlSnNvbiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBaYXdpZXJhIHdzenlzdGtpZSBzemN6ZWfDs8WCeSBrcnltaW5hbGlzdHljem5lLCB3ZWt0b3J5IGF0YWt1LCBrcm9raSB1Ym9qdSwgc2tyeXB0eSBQeXRob25hIGkgc3lnbmF0dXJ5LlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEV4cG9ydFR5cGUoJ0dOSURBX1NJR05BVFVSRVNfT05MWScpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcC0zLjUgcm91bmRlZC14bCBib3JkZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgICAgZXhwb3J0VHlwZSA9PT0gJ0dOSURBX1NJR05BVFVSRVNfT05MWSdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTUwLzQwIGJvcmRlci1wdXJwbGUtNDAwIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyBmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwXCI+VHlsa28gU3lnbmF0dXJ5IEduaWQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBLb21wYWt0b3d5IHPFgm93bmlrIHN1bSBTSEEyNTYsIHJlZ3XFgiBZQVJBLCBzxYLDs3cga2x1Y3pvd3ljaCBpIGtvZMOzdyB6YW1yYcW8YW5pYSBkbGEgZGVtb27Ds3cuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IFxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RXhwb3J0VHlwZSgnQUlSR0FQX1JBUElEX1NZTkMnKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHAtMy41IHJvdW5kZWQteGwgYm9yZGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydFR5cGUgPT09ICdBSVJHQVBfUkFQSURfU1lOQydcbiAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC80MCBib3JkZXItZW1lcmFsZC00MDAgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MC80MCdcbiAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05MDAvNjAgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdGV4dC14cyBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTMwMFwiPlN6eWJraSBQYWtpZXQgQWlyLUdhcDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBab3B0eW1hbGl6b3dhbnkgcG9kIGvEhXRlbSBwcnplbm9zemVuaWEgcGVuZHJpdmUnZW0gVVNCIG1pxJlkenkgd2llbG9tYSBqZWRub3N0a2FtaSBTZW50aW5lbC5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIEpTT04gTGl2ZSBWaWV3ZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBiZy1zbGF0ZS05NTAgb3ZlcmZsb3ctaGlkZGVuIHNoYWRvdy1pbm5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtNCBweS0yLjUgYmctc2xhdGUtOTAwLzkwIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtc2xhdGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UG9kZ2zEhWQgV3lqxZtjaW93eSBKU09OICh7ZXhwb3J0VHlwZX0pPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZE5ldXRyYWxpemVkVGhyZWF0c1BkZih0aHJlYXRzLCBmb2N1c0xvZ3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmVwb3J0VGl0bGU6ICdTRU5USU5FTCBJTkNJREVOVCBSRVNQT05TRSAmIEZPUkVOU0lDUyBBVURJVCBET1NTSUVSJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NpZmljYXRpb246ICdSRVNUUklDVEVEIEZPUkVOU0lDIExPRydcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgYmctcHVycGxlLTcwMCBob3ZlcjpiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MC82MFwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHBlxYJueSBzZm9ybWF0b3dhbnkgaSBvc3RlbXBsb3dhbnkgY3phc293byByYXBvcnQgUERGXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxGaWxlRG93biBjbGFzc05hbWU9XCJ3LTMgaC0zIHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UmFwb3J0IFBERiAoRm9yZW5zaWNzKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5SnNvbn1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgaG92ZXI6dGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29waWVkID8gPENoZWNrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+fVxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPntjb3BpZWQgPyAnU2tvcGlvd2FubyEnIDogJ0tvcGl1aiBKU09OJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQgYmctY3lhbi02MDAgaG92ZXI6YmctY3lhbi01MDAgdGV4dC1ibGFjayBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogUGxpayAuanNvbjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtNCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1jeWFuLTMwMC85MCBiZy1ibGFjay83MCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtWzMwMHB4XSBsZWFkaW5nLXJlbGF4ZWQgc2VsZWN0LWFsbFwiPlxuICAgICAgICAgICAgICAgICAge2pzb25QcmV2aWV3fVxuICAgICAgICAgICAgICAgIDwvcHJlPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7LyogSW5mbyBCYW5uZXIgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgZmxleCBpdGVtcy1zdGFydCBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgPExvY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMjAwIGZvbnQtYm9sZFwiPjEwMCUgWkdPRE5PxZrEhiBaIEFJUi1HQVAgJiBPRkZMSU5FIE1PTk9MSVRIOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICBQbGlrIEpTT04gemF3aWVyYSBzdW3EmSBrb250cm9sbsSFIGF1dGVudHljem5vxZtjaSA8Y29kZT5haXJHYXBTeW5jSGFzaDwvY29kZT4sIGNvIHBvendhbGEgaW5ueW0gamVkbm9zdGtvbSBTZW50aW5lbCBuYXR5Y2htaWFzdCB6d2VyeWZpa293YcSHIGludGVncmFsbm/Fm8SHIGJhenkgYmV6IHBvdHJ6ZWJ5IHBvxYLEhWN6ZW5pYSB6IHNpZWNpxIUuXG4gICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cblxuICAgICAgICAgIHsvKiBUQUIgMjogU0lHTkFUVVJFUyBCUk9XU0VSICovfVxuICAgICAgICAgIHthY3RpdmVUYWIgPT09ICdTSUdOQVRVUkVTX0JST1dTRVInICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0zXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuPlphcmVqZXN0cm93YW5lIFN5Z25hdHVyeSBHbmlkICh7c2lnbmF0dXJlcy5sZW5ndGh9KTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwXCI+WUFSQSAmIFdpbjMyIFBFIEhldXJpc3RpY3M8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiBnYXAtMyBtYXgtaC1bNDYwcHhdIG92ZXJmbG93LXktYXV0byBwci0xXCI+XG4gICAgICAgICAgICAgICAge3NpZ25hdHVyZXMubWFwKChzaWcpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYgXG4gICAgICAgICAgICAgICAgICAgIGtleT17c2lnLnNpZ25hdHVyZUlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC83MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcHVycGxlLTUwMC81MCB0cmFuc2l0aW9uLWFsbCBzcGFjZS15LTJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC82MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge3NpZy5zaWduYXR1cmVJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBtdC0xXCI+e3NpZy50aHJlYXROYW1lfTwvaDQ+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2lnLmFsaWFzICYmIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPkFsaWFzOiB7c2lnLmFsaWFzfTwvcD59XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgcHgtMiBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgZm9udC1tb25vICR7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWcuc2V2ZXJpdHkgPT09ICdDUklUSUNBTCcgPyAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwJyA6ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgICAge3NpZy5zZXZlcml0eX1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5TSEEyNTY6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCB0ZXh0LVsxMHB4XSB0cnVuY2F0ZSBtYXgtdy1bMjgwcHhdXCI+e3NpZy5zaGEyNTZIYXNofTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+S2F0ZWdvcmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e3NpZy5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5GbGFnaSBQRTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7c2lnLnBlU3RydWN0dXJhbEZsYWdzLm1hcCgoZmxhZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGtleT17aWR4fSBjbGFzc05hbWU9XCJweC0xLjUgcHktMC41IHJvdW5kZWQgYmctc2xhdGUtODAwIHRleHQtWzlweF0gdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC80MFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmbGFnfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgdGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNTAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlN0YXR1czogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+e3NpZy5zdGF0dXN9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkVudHJvcGlhOiB7c2lnLmVudHJvcHl9LzguMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgey8qIFRBQiAzOiBJTVBPUlQgJiBNRVJHRSAqL31cbiAgICAgICAgICB7YWN0aXZlVGFiID09PSAnSU1QT1JUX01FUkdFJyAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1iIGZyb20tc2xhdGUtOTAwIHRvLXNsYXRlLTk1MCBib3JkZXItMiBib3JkZXItZGFzaGVkIGJvcmRlci1lbWVyYWxkLTUwMC80MCB0ZXh0LWNlbnRlciBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTIgaC0xMiBteC1hdXRvIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtZW1lcmFsZC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy02IGgtNiBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIFdncmFqIFBsaWsgQmF6eSBaYWdyb8W8ZcWEICguanNvbikgeiBJbm5laiBKZWRub3N0a2kgU2VudGluZWxcbiAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBtdC0xIG1heC13LWxnIG14LWF1dG9cIj5cbiAgICAgICAgICAgICAgICAgICAgT2JzxYJ1Z3VqZSBwbGlraSB3eWVrc3BvcnRvd2FuZSB6IGRvd29sbmVnbyB3xJl6xYJhIFNlbnRpbmVsIFNoaWVsZCAoRnVsbCBUaHJlYXQgTGVkZ2VyLCBTaWduYXR1cmVzIEJ1bmRsZSBsdWIgQWlyR2FwIFJhcGlkIFN5bmMpLlxuICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGlucHV0IFxuICAgICAgICAgICAgICAgICAgdHlwZT1cImZpbGVcIiBcbiAgICAgICAgICAgICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfSBcbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVGaWxlVXBsb2FkfSBcbiAgICAgICAgICAgICAgICAgIGFjY2VwdD1cIi5qc29uLGFwcGxpY2F0aW9uL2pzb25cIiBcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImhpZGRlblwiIFxuICAgICAgICAgICAgICAgIC8+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBmaWxlSW5wdXRSZWYuY3VycmVudD8uY2xpY2soKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMi41IHJvdW5kZWQteGwgYmctZW1lcmFsZC02MDAgaG92ZXI6YmctZW1lcmFsZC01MDAgdGV4dC1ibGFjayBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgc2hhZG93LWxnIHNoYWRvdy1lbWVyYWxkLTk1MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBpbmxpbmUtZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxVcGxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5XeWJpZXJ6IFBsaWsgSlNPTiB6IER5c2t1PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICB7aW1wb3J0U3RhdHVzICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtNCByb3VuZGVkLXhsIGJvcmRlciBmb250LW1vbm8gdGV4dC14cyBmbGV4IGl0ZW1zLXN0YXJ0IGdhcC0zICR7XG4gICAgICAgICAgICAgICAgICBpbXBvcnRTdGF0dXMuc3VjY2Vzc1xuICAgICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTk1MC82MCBib3JkZXItZW1lcmFsZC01MDAvNjAgdGV4dC1lbWVyYWxkLTIwMCdcbiAgICAgICAgICAgICAgICAgICAgOiAnYmctcmVkLTk1MC82MCBib3JkZXItcmVkLTUwMC82MCB0ZXh0LXJlZC0yMDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge2ltcG9ydFN0YXR1cy5zdWNjZXNzID8gKFxuICAgICAgICAgICAgICAgICAgICA8Q2hlY2tDaXJjbGUyIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1lbWVyYWxkLTQwMCBzaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPEFsZXJ0Q2lyY2xlIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1yZWQtNDAwIHNocmluay0wIG10LTAuNVwiIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGRcIj57aW1wb3J0U3RhdHVzLm1lc3NhZ2V9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHtpbXBvcnRTdGF0dXMuc3VjY2VzcyAmJiBpbXBvcnRTdGF0dXMuYWRkZWQgIT09IHVuZGVmaW5lZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LWVtZXJhbGQtMzAwLzgwIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIERvZGFubyBub3d5Y2ggaW5jeWRlbnTDs3c6IDxzdHJvbmc+e2ltcG9ydFN0YXR1cy5hZGRlZH08L3N0cm9uZz4gfCBaYWt0dWFsaXpvd2FubyBpc3RuaWVqxIVjeWNoOiA8c3Ryb25nPntpbXBvcnRTdGF0dXMudXBkYXRlZH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgIHsvKiBJbnN0cnVjdGlvbnMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktMiBmb250LW1vbm8gdGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlByb2NlZHVyYSBEeXN0cnlidWNqaSBBaXItR2FwIHcgT2Rpem9sb3dhbnljaCDFmnJvZG93aXNrYWNoOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8b2wgY2xhc3NOYW1lPVwibGlzdC1kZWNpbWFsIGxpc3QtaW5zaWRlIHNwYWNlLXktMSB0ZXh0LVsxMXB4XSBsZWFkaW5nLXJlbGF4ZWQgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxsaT5XeWVrc3BvcnR1aiBwbGlrIEpTT04gbmEga29tcHV0ZXJ6ZSBsYWJvcmF0b3J5am55bSBqZWRub3N0a2kgU2VudGluZWwuPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5aYXBpc3ogcGxpayBuYSBzZm9ybWF0b3dhbnltIG5vxZtuaWt1IFVTQiAoRkFUMzIvZXhGQVQpLjwvbGk+XG4gICAgICAgICAgICAgICAgICA8bGk+UHJ6ZW5pZcWbIG5vxZtuaWsgbmEgb2Rpem9sb3dhbsSFIG1hc3p5bsSZIGkga2xpa25paiA8ZW0+XCJXeWJpZXJ6IFBsaWsgSlNPTiB6IER5c2t1XCI8L2VtPi48L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlN5c3RlbSBhdXRvbWF0eWN6bmllIHpha3R1YWxpenVqZSBiYXrEmSBzeWduYXR1ciBpIHppbnRlZ3J1amUgcmVndcWCeSB1Ym9qdSB6IGxva2FsbnltIGRlbW9uZW0gTnRTdXNwZW5kUHJvY2Vzcy48L2xpPlxuICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEZvb3RlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtOTAwLzkwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgPHNwYW4+QmF6YSBha3R5d25hOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtY3lhbi0zMDBcIj57dGhyZWF0cy5sZW5ndGh9IHphZ3JvxbxlxYQ8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj7igKI8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5TeWduYXR1cnk6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtMzAwXCI+e3NpZ25hdHVyZXMubGVuZ3RofSByZWd1xYI8L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1jeWFuLTUwMCBob3ZlcjpiZy1jeWFuLTQwMCB0ZXh0LWJsYWNrIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIHNoYWRvdyB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPkVrc3BvcnR1aiBCYXphIEpTT048L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBmb250LWJvbGQgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBaYW1rbmlqXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBNEdjO0FBNUdkLFNBQWdCLFVBQVUsY0FBYztBQUN4QztBQUFBLEVBQ0U7QUFBQSxFQUFHO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBVTtBQUFBLEVBQVE7QUFBQSxFQUM1QztBQUFBLEVBQWE7QUFBQSxFQUFhO0FBQUEsRUFBVTtBQUFBLEVBQU07QUFBQSxFQUNsQztBQUFBLEVBQVc7QUFBQSxFQUFLO0FBQUEsRUFBcUM7QUFBQSxPQUN4RDtBQUVQO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUVLO0FBQ1AsU0FBUyxxQ0FBcUM7QUFDOUMsU0FBUyxtQkFBbUI7QUFVckIsYUFBTSw0QkFBc0UsQ0FBQztBQUFBLEVBQ2xGO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsWUFB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