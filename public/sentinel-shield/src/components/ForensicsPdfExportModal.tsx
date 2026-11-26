import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import {
  X,
  CheckCircle2,
  Clock,
  Settings2,
  FileDown,
  Filter
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadNeutralizedThreatsPdf } from "/sentinel-shield/src/utils/forensicsPdfExporter.ts";
export const ForensicsPdfExportModal = ({
  isOpen,
  onClose,
  threats,
  focusLogs
}) => {
  const [reportTitle, setReportTitle] = useState("SENTINEL INCIDENT RESPONSE & FORENSICS AUDIT DOSSIER");
  const [classification, setClassification] = useState("RESTRICTED FORENSIC LOG");
  const [investigatorUnit, setInvestigatorUnit] = useState("Sentinel Cyber Defense Lab / Forensic Unit Alpha-4E04");
  const [stationNode, setStationNode] = useState("WORKSTATION-SECURE-NODE");
  const [severityFilter, setSeverityFilter] = useState("ALL");
  const [includeFocusLogs, setIncludeFocusLogs] = useState(true);
  const [includeKillSnippets, setIncludeKillSnippets] = useState(true);
  const [includeExploitChains, setIncludeExploitChains] = useState(true);
  const [customNotes, setCustomNotes] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [lastExportResult, setLastExportResult] = useState(null);
  if (!isOpen) return null;
  const targetThreatsCount = severityFilter === "ALL" ? threats.length : threats.filter((t) => t.severity === severityFilter).length;
  const handleExportPdf = async () => {
    setIsExporting(true);
    setLastExportResult(null);
    try {
      await new Promise((r) => setTimeout(r, 120));
      const result = await downloadNeutralizedThreatsPdf(threats, focusLogs, {
        reportTitle,
        classification,
        investigatorUnit,
        stationNode,
        filterSeverity: severityFilter,
        includeFocusLogs,
        includeKillSnippets,
        includeExploitChains,
        customNotes: customNotes.trim()
      });
      setLastExportResult({
        filename: result.filename,
        timestamp: result.timestamp,
        reportHash: result.reportHash,
        pages: result.stats.pages,
        threatsCount: result.stats.totalThreats
      });
    } catch (err) {
      console.error("Błąd podczas generowania raportu PDF:", err);
      alert("Nie udało się wygenerować raportu PDF: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsExporting(false);
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn", children: /* @__PURE__ */ jsxDEV(
    "div",
    {
      className: "w-full max-w-3xl bg-slate-900 border border-purple-500/40 rounded-2xl shadow-2xl shadow-purple-950/80 overflow-hidden flex flex-col max-h-[92vh]",
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-900 border-b border-purple-800/40 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300", children: /* @__PURE__ */ jsxDEV(FileDown, { className: "w-6 h-6" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 93,
              columnNumber: 15
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 92,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV("h3", { className: "text-lg font-black text-white tracking-tight", children: "Eksport Raportu Kryminalistycznego PDF" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 97,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-900/60 text-purple-300 border border-purple-700/50", children: "ISO/IEC 27037 & RFC 3161" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 100,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 96,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Generuj sformatowany, ostemplowany czasowo dokument PDF z podpisem kryptograficznym SHA-256 do celów audytu bezpieczeństwa i logów incydentów." }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 104,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 95,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 91,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: onClose,
              className: "p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all cursor-pointer",
              children: /* @__PURE__ */ jsxDEV(X, { className: "w-5 h-5" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 113,
                columnNumber: 13
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 109,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
          lineNumber: 90,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-5 overflow-y-auto space-y-5 text-sm", children: [
          lastExportResult && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-start gap-3 animate-fadeIn", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-5 h-5 text-emerald-400 shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-emerald-200", children: "Raport PDF został pomyślnie wygenerowany i pobrany!" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 124,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-1.5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-emerald-300/90", children: [
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Plik:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 129,
                    columnNumber: 21
                  }, this),
                  " ",
                  lastExportResult.filename
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 128,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Objętość:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 132,
                    columnNumber: 21
                  }, this),
                  " ",
                  lastExportResult.pages,
                  " stron (",
                  lastExportResult.threatsCount,
                  " zagrożeń)"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 131,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "sm:col-span-2 truncate", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Hash SHA-256:" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 135,
                    columnNumber: 21
                  }, this),
                  " ",
                  lastExportResult.reportHash
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 134,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 127,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 123,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 121,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Zagrożeń w rejestrze" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 145,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-cyan-400 mt-0.5", children: targetThreatsCount }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 146,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: [
                "z ",
                threats.length,
                " dostępnych"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 147,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 144,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Wpisy Fokusu" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 150,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-amber-400 mt-0.5", children: focusLogs.length }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 151,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "zdarzeń w RAM/Storage" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 152,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 149,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Standard Daty" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 155,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-emerald-400 mt-0.5", children: "RFC 3339" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 156,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "ISO 8601 UTC + Local" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 157,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 154,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400 uppercase", children: "Pieczęć Integralności" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 160,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-lg font-black text-purple-400 mt-0.5", children: "SHA-256" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 161,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Non-Repudiation Seal" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 162,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 159,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 143,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-black font-mono text-slate-300 uppercase tracking-wider flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(Settings2, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 169,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Parametry Raportu i Klauzule Bezpieczeństwa" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 170,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 168,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "Tytuł Raportu Kryminalistycznego" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 175,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: reportTitle,
                    onChange: (e) => setReportTitle(e.target.value),
                    className: "w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 178,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 174,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "Klauzula Klasyfikacji (Security Clearance)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 187,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "select",
                  {
                    value: classification,
                    onChange: (e) => setClassification(e.target.value),
                    className: "w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono",
                    children: [
                      /* @__PURE__ */ jsxDEV("option", { value: "RESTRICTED FORENSIC LOG", children: "RESTRICTED FORENSIC LOG (Domyślny Audyt)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                        lineNumber: 195,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "TLP:AMBER", children: "TLP:AMBER (Ograniczone Rozpowszechnianie)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                        lineNumber: 196,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "TLP:RED", children: "TLP:RED (Ściśle Tajne / Incydent Krytyczny)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                        lineNumber: 197,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "TLP:GREEN", children: "TLP:GREEN (Współdzielenie w Zespole)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                        lineNumber: 198,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("option", { value: "TLP:CLEAR", children: "TLP:CLEAR (Raport Jawny / Post-Mortem)" }, void 0, false, {
                        fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                        lineNumber: 199,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 190,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 186,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "Jednostka Śledcza / Operator" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 204,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: investigatorUnit,
                    onChange: (e) => setInvestigatorUnit(e.target.value),
                    className: "w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-sans"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 207,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 203,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "Identyfikator Węzła / Stacji Roboczej" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 216,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "input",
                  {
                    type: "text",
                    value: stationNode,
                    onChange: (e) => setStationNode(e.target.value),
                    className: "w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 219,
                    columnNumber: 17
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 215,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 173,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(Filter, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 232,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Zakres Zagrożeń (Filtr Poziomu Ryzyka):" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 233,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 231,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5 flex-wrap", children: ["ALL", "CRITICAL", "EXTREME", "HIGH"].map((sev) => /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSeverityFilter(sev),
                    className: `px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${severityFilter === sev ? "bg-purple-600 text-white shadow-md shadow-purple-900/50" : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"}`,
                    children: sev === "ALL" ? "Wszystkie (" + threats.length + ")" : sev
                  },
                  sev,
                  false,
                  {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 237,
                    columnNumber: 21
                  },
                  this
                )) }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 235,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 230,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2", children: [
                /* @__PURE__ */ jsxDEV("label", { className: "flex items-center space-x-2 text-xs text-slate-300 cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "checkbox",
                      checked: includeFocusLogs,
                      onChange: (e) => setIncludeFocusLogs(e.target.checked),
                      className: "rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-900"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                      lineNumber: 256,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { children: "Rejestr Przechwyceń Fokusu" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 262,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 255,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("label", { className: "flex items-center space-x-2 text-xs text-slate-300 cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "checkbox",
                      checked: includeKillSnippets,
                      onChange: (e) => setIncludeKillSnippets(e.target.checked),
                      className: "rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-900"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                      lineNumber: 266,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { children: "Kody Likwidacji (Python Kill-Chain)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 272,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 265,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("label", { className: "flex items-center space-x-2 text-xs text-slate-300 cursor-pointer select-none", children: [
                  /* @__PURE__ */ jsxDEV(
                    "input",
                    {
                      type: "checkbox",
                      checked: includeExploitChains,
                      onChange: (e) => setIncludeExploitChains(e.target.checked),
                      className: "rounded border-slate-700 text-purple-600 focus:ring-purple-500 bg-slate-900"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                      lineNumber: 276,
                      columnNumber: 19
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV("span", { children: "Łańcuchy Eksploatacji (Exploit Chain)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 282,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 275,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 254,
                columnNumber: 15
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 229,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-bold text-slate-300 mb-1", children: "Notatka Kryminalistyczna Śledczego (Opcjonalnie):" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 289,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV(
                "textarea",
                {
                  value: customNotes,
                  onChange: (e) => setCustomNotes(e.target.value),
                  placeholder: "Np.: Potwierdzono neutralizację nakładki Flutter Desktop na stacji roboczej. Wszystkie uchwyty okienne odzyskane.",
                  rows: 2,
                  className: "w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500 resize-none font-sans"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 292,
                  columnNumber: 15
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 288,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 167,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
          lineNumber: 118,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs text-slate-400 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Clock, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 306,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Format: Standardowy dokument PDF (A4) ze stopkami i numeracją stron" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
              lineNumber: 307,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 305,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 w-full sm:w-auto", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "flex-1 sm:flex-none px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer",
                children: "Zamknij"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 311,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                type: "button",
                onClick: handleExportPdf,
                disabled: isExporting,
                className: "flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xs font-black font-mono flex items-center justify-center gap-2 shadow-lg shadow-purple-950/60 border border-purple-400/50 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                children: isExporting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 327,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Generowanie PDF..." }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 328,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 326,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
                  /* @__PURE__ */ jsxDEV(FileDown, { className: "w-4 h-4" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 332,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport PDF (Forensics)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                    lineNumber: 333,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                  lineNumber: 331,
                  columnNumber: 17
                }, this)
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
                lineNumber: 319,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
            lineNumber: 310,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
          lineNumber: 304,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    true,
    {
      fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
      lineNumber: 85,
      columnNumber: 7
    },
    this
  ) }, void 0, false, {
    fileName: "/app/applet/src/components/ForensicsPdfExportModal.tsx",
    lineNumber: 84,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcmVuc2ljc1BkZkV4cG9ydE1vZGFsLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgWCwgRG93bmxvYWQsIEZpbGVUZXh0LCBTaGllbGRDaGVjaywgQ2hlY2tDaXJjbGUyLCBcbiAgQ2xvY2ssIEhhc2gsIFNldHRpbmdzMiwgRmlsZURvd24sIEFsZXJ0T2N0YWdvbiwgXG4gIFRlcm1pbmFsLCBTaGllbGRBbGVydCwgU3BhcmtsZXMsIEZpbHRlciwgTGF5ZXJzLCBDaGVja1xufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgTmV1dHJhbGl6ZWRUaHJlYXQsIEZvY3VzSGlqYWNrQXR0ZW1wdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IGRvd25sb2FkTmV1dHJhbGl6ZWRUaHJlYXRzUGRmLCBGb3JlbnNpY3NQZGZFeHBvcnRPcHRpb25zIH0gZnJvbSAnLi4vdXRpbHMvZm9yZW5zaWNzUGRmRXhwb3J0ZXInO1xuXG5pbnRlcmZhY2UgRm9yZW5zaWNzUGRmRXhwb3J0TW9kYWxQcm9wcyB7XG4gIGlzT3BlbjogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbiAgdGhyZWF0czogTmV1dHJhbGl6ZWRUaHJlYXRbXTtcbiAgZm9jdXNMb2dzOiBGb2N1c0hpamFja0F0dGVtcHRbXTtcbn1cblxuZXhwb3J0IGNvbnN0IEZvcmVuc2ljc1BkZkV4cG9ydE1vZGFsOiBSZWFjdC5GQzxGb3JlbnNpY3NQZGZFeHBvcnRNb2RhbFByb3BzPiA9ICh7XG4gIGlzT3BlbixcbiAgb25DbG9zZSxcbiAgdGhyZWF0cyxcbiAgZm9jdXNMb2dzXG59KSA9PiB7XG4gIGNvbnN0IFtyZXBvcnRUaXRsZSwgc2V0UmVwb3J0VGl0bGVdID0gdXNlU3RhdGUoJ1NFTlRJTkVMIElOQ0lERU5UIFJFU1BPTlNFICYgRk9SRU5TSUNTIEFVRElUIERPU1NJRVInKTtcbiAgY29uc3QgW2NsYXNzaWZpY2F0aW9uLCBzZXRDbGFzc2lmaWNhdGlvbl0gPSB1c2VTdGF0ZTxGb3JlbnNpY3NQZGZFeHBvcnRPcHRpb25zWydjbGFzc2lmaWNhdGlvbiddPignUkVTVFJJQ1RFRCBGT1JFTlNJQyBMT0cnKTtcbiAgY29uc3QgW2ludmVzdGlnYXRvclVuaXQsIHNldEludmVzdGlnYXRvclVuaXRdID0gdXNlU3RhdGUoJ1NlbnRpbmVsIEN5YmVyIERlZmVuc2UgTGFiIC8gRm9yZW5zaWMgVW5pdCBBbHBoYS00RTA0Jyk7XG4gIGNvbnN0IFtzdGF0aW9uTm9kZSwgc2V0U3RhdGlvbk5vZGVdID0gdXNlU3RhdGUoJ1dPUktTVEFUSU9OLVNFQ1VSRS1OT0RFJyk7XG4gIGNvbnN0IFtzZXZlcml0eUZpbHRlciwgc2V0U2V2ZXJpdHlGaWx0ZXJdID0gdXNlU3RhdGU8c3RyaW5nPignQUxMJyk7XG4gIGNvbnN0IFtpbmNsdWRlRm9jdXNMb2dzLCBzZXRJbmNsdWRlRm9jdXNMb2dzXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbaW5jbHVkZUtpbGxTbmlwcGV0cywgc2V0SW5jbHVkZUtpbGxTbmlwcGV0c10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2luY2x1ZGVFeHBsb2l0Q2hhaW5zLCBzZXRJbmNsdWRlRXhwbG9pdENoYWluc10gPSB1c2VTdGF0ZSh0cnVlKTtcbiAgY29uc3QgW2N1c3RvbU5vdGVzLCBzZXRDdXN0b21Ob3Rlc10gPSB1c2VTdGF0ZSgnJyk7XG4gIFxuICBjb25zdCBbaXNFeHBvcnRpbmcsIHNldElzRXhwb3J0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2xhc3RFeHBvcnRSZXN1bHQsIHNldExhc3RFeHBvcnRSZXN1bHRdID0gdXNlU3RhdGU8e1xuICAgIGZpbGVuYW1lOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBzdHJpbmc7XG4gICAgcmVwb3J0SGFzaDogc3RyaW5nO1xuICAgIHBhZ2VzOiBudW1iZXI7XG4gICAgdGhyZWF0c0NvdW50OiBudW1iZXI7XG4gIH0gfCBudWxsPihudWxsKTtcblxuICBpZiAoIWlzT3BlbikgcmV0dXJuIG51bGw7XG5cbiAgY29uc3QgdGFyZ2V0VGhyZWF0c0NvdW50ID0gc2V2ZXJpdHlGaWx0ZXIgPT09ICdBTEwnIFxuICAgID8gdGhyZWF0cy5sZW5ndGggXG4gICAgOiB0aHJlYXRzLmZpbHRlcih0ID0+IHQuc2V2ZXJpdHkgPT09IHNldmVyaXR5RmlsdGVyKS5sZW5ndGg7XG5cbiAgY29uc3QgaGFuZGxlRXhwb3J0UGRmID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzRXhwb3J0aW5nKHRydWUpO1xuICAgIHNldExhc3RFeHBvcnRSZXN1bHQobnVsbCk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gU21hbGwgdGljayBmb3IgVUkgcmVzcG9uc2l2ZW5lc3NcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKHIgPT4gc2V0VGltZW91dChyLCAxMjApKTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZG93bmxvYWROZXV0cmFsaXplZFRocmVhdHNQZGYodGhyZWF0cywgZm9jdXNMb2dzLCB7XG4gICAgICAgIHJlcG9ydFRpdGxlLFxuICAgICAgICBjbGFzc2lmaWNhdGlvbixcbiAgICAgICAgaW52ZXN0aWdhdG9yVW5pdCxcbiAgICAgICAgc3RhdGlvbk5vZGUsXG4gICAgICAgIGZpbHRlclNldmVyaXR5OiBzZXZlcml0eUZpbHRlcixcbiAgICAgICAgaW5jbHVkZUZvY3VzTG9ncyxcbiAgICAgICAgaW5jbHVkZUtpbGxTbmlwcGV0cyxcbiAgICAgICAgaW5jbHVkZUV4cGxvaXRDaGFpbnMsXG4gICAgICAgIGN1c3RvbU5vdGVzOiBjdXN0b21Ob3Rlcy50cmltKClcbiAgICAgIH0pO1xuXG4gICAgICBzZXRMYXN0RXhwb3J0UmVzdWx0KHtcbiAgICAgICAgZmlsZW5hbWU6IHJlc3VsdC5maWxlbmFtZSxcbiAgICAgICAgdGltZXN0YW1wOiByZXN1bHQudGltZXN0YW1wLFxuICAgICAgICByZXBvcnRIYXNoOiByZXN1bHQucmVwb3J0SGFzaCxcbiAgICAgICAgcGFnZXM6IHJlc3VsdC5zdGF0cy5wYWdlcyxcbiAgICAgICAgdGhyZWF0c0NvdW50OiByZXN1bHQuc3RhdHMudG90YWxUaHJlYXRzXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0LFgsSFZCBwb2RjemFzIGdlbmVyb3dhbmlhIHJhcG9ydHUgUERGOicsIGVycik7XG4gICAgICBhbGVydCgnTmllIHVkYcWCbyBzacSZIHd5Z2VuZXJvd2HEhyByYXBvcnR1IFBERjogJyArIChlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogU3RyaW5nKGVycikpKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgc2V0SXNFeHBvcnRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHAtNCBiZy1ibGFjay84MCBiYWNrZHJvcC1ibHVyLW1kIGFuaW1hdGUtZmFkZUluXCI+XG4gICAgICA8ZGl2IFxuICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbWF4LXctM3hsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgcm91bmRlZC0yeGwgc2hhZG93LTJ4bCBzaGFkb3ctcHVycGxlLTk1MC84MCBvdmVyZmxvdy1oaWRkZW4gZmxleCBmbGV4LWNvbCBtYXgtaC1bOTJ2aF1cIlxuICAgICAgICBvbkNsaWNrPXsoZSkgPT4gZS5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICAgID5cbiAgICAgICAgey8qIEhlYWRlciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS05NTAgdmlhLXNsYXRlLTkwMCB0by1zbGF0ZS05MDAgYm9yZGVyLWIgYm9yZGVyLXB1cnBsZS04MDAvNDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTNcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctcHVycGxlLTYwMC8yMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNDAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgIDxGaWxlRG93biBjbGFzc05hbWU9XCJ3LTYgaC02XCIgLz5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICAgIEVrc3BvcnQgUmFwb3J0dSBLcnltaW5hbGlzdHljem5lZ28gUERGXG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgYmctcHVycGxlLTkwMC82MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNzAwLzUwXCI+XG4gICAgICAgICAgICAgICAgICBJU08vSUVDIDI3MDM3ICYgUkZDIDMxNjFcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIEdlbmVydWogc2Zvcm1hdG93YW55LCBvc3RlbXBsb3dhbnkgY3phc293byBkb2t1bWVudCBQREYgeiBwb2RwaXNlbSBrcnlwdG9ncmFmaWN6bnltIFNIQS0yNTYgZG8gY2Vsw7N3IGF1ZHl0dSBiZXpwaWVjemXFhHN0d2EgaSBsb2fDs3cgaW5jeWRlbnTDs3cuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGhvdmVyOmJvcmRlci1zbGF0ZS03MDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxYIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogQ29udGVudCBCb2R5ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSBvdmVyZmxvdy15LWF1dG8gc3BhY2UteS01IHRleHQtc21cIj5cbiAgICAgICAgICB7LyogU3VjY2VzcyBCYW5uZXIgaWYgZXhwb3J0ZWQgKi99XG4gICAgICAgICAge2xhc3RFeHBvcnRSZXN1bHQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1lbWVyYWxkLTk1MC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzUwIGZsZXggaXRlbXMtc3RhcnQgZ2FwLTMgYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtZW1lcmFsZC00MDAgc2hyaW5rLTAgbXQtMC41XCIgLz5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTFcIj5cbiAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC1lbWVyYWxkLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgUmFwb3J0IFBERiB6b3N0YcWCIHBvbXnFm2xuaWUgd3lnZW5lcm93YW55IGkgcG9icmFueSFcbiAgICAgICAgICAgICAgICA8L2g0PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtMS41IGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTIgdGV4dC14cyBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTMwMC85MFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5QbGlrOjwvc3Bhbj4ge2xhc3RFeHBvcnRSZXN1bHQuZmlsZW5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+T2JqxJl0b8WbxIc6PC9zcGFuPiB7bGFzdEV4cG9ydFJlc3VsdC5wYWdlc30gc3Ryb24gKHtsYXN0RXhwb3J0UmVzdWx0LnRocmVhdHNDb3VudH0gemFncm/FvGXFhClcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIHRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+SGFzaCBTSEEtMjU2Ojwvc3Bhbj4ge2xhc3RFeHBvcnRSZXN1bHQucmVwb3J0SGFzaH1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG5cbiAgICAgICAgICB7LyogUXVpY2sgU3VtbWFyeSBQaWxsIEJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgc206Z3JpZC1jb2xzLTQgZ2FwLTIuNVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+WmFncm/FvGXFhCB3IHJlamVzdHJ6ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtY3lhbi00MDAgbXQtMC41XCI+e3RhcmdldFRocmVhdHNDb3VudH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+eiB7dGhyZWF0cy5sZW5ndGh9IGRvc3TEmXBueWNoPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCB1cHBlcmNhc2VcIj5XcGlzeSBGb2t1c3U8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtbGcgZm9udC1ibGFjayB0ZXh0LWFtYmVyLTQwMCBtdC0wLjVcIj57Zm9jdXNMb2dzLmxlbmd0aH08L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+emRhcnplxYQgdyBSQU0vU3RvcmFnZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlXCI+U3RhbmRhcmQgRGF0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtZW1lcmFsZC00MDAgbXQtMC41XCI+UkZDIDMzMzk8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+SVNPIDg2MDEgVVRDICsgTG9jYWw8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZVwiPlBpZWN6xJnEhyBJbnRlZ3JhbG5vxZtjaTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1sZyBmb250LWJsYWNrIHRleHQtcHVycGxlLTQwMCBtdC0wLjVcIj5TSEEtMjU2PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMFwiPk5vbi1SZXB1ZGlhdGlvbiBTZWFsPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ29uZmlndXJhdGlvbiBGb3JtICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS00XCI+XG4gICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJsYWNrIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCB1cHBlcmNhc2UgdHJhY2tpbmctd2lkZXIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPFNldHRpbmdzMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5QYXJhbWV0cnkgUmFwb3J0dSBpIEtsYXV6dWxlIEJlenBpZWN6ZcWEc3R3YTwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDQ+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBUeXR1xYIgUmFwb3J0dSBLcnltaW5hbGlzdHljem5lZ29cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3JlcG9ydFRpdGxlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSZXBvcnRUaXRsZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBLbGF1enVsYSBLbGFzeWZpa2FjamkgKFNlY3VyaXR5IENsZWFyYW5jZSlcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgIHZhbHVlPXtjbGFzc2lmaWNhdGlvbn1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Q2xhc3NpZmljYXRpb24oZS50YXJnZXQudmFsdWUgYXMgYW55KX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSRVNUUklDVEVEIEZPUkVOU0lDIExPR1wiPlJFU1RSSUNURUQgRk9SRU5TSUMgTE9HIChEb215xZtsbnkgQXVkeXQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVExQOkFNQkVSXCI+VExQOkFNQkVSIChPZ3Jhbmljem9uZSBSb3pwb3dzemVjaG5pYW5pZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUTFA6UkVEXCI+VExQOlJFRCAoxZpjacWbbGUgVGFqbmUgLyBJbmN5ZGVudCBLcnl0eWN6bnkpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiVExQOkdSRUVOXCI+VExQOkdSRUVOIChXc3DDs8WCZHppZWxlbmllIHcgWmVzcG9sZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJUTFA6Q0xFQVJcIj5UTFA6Q0xFQVIgKFJhcG9ydCBKYXdueSAvIFBvc3QtTW9ydGVtKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBKZWRub3N0a2EgxZpsZWRjemEgLyBPcGVyYXRvclxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICB2YWx1ZT17aW52ZXN0aWdhdG9yVW5pdH1cbiAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0SW52ZXN0aWdhdG9yVW5pdChlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1zYW5zXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICBJZGVudHlmaWthdG9yIFfEmXrFgmEgLyBTdGFjamkgUm9ib2N6ZWpcbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgdmFsdWU9e3N0YXRpb25Ob2RlfVxuICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRTdGF0aW9uTm9kZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkLXhsIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2NvcGUgLyBGaWx0ZXIgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICA8RmlsdGVyIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+WmFrcmVzIFphZ3JvxbxlxYQgKEZpbHRyIFBvemlvbXUgUnl6eWthKTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICB7WydBTEwnLCAnQ1JJVElDQUwnLCAnRVhUUkVNRScsICdISUdIJ10ubWFwKChzZXYpID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGtleT17c2V2fVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNldmVyaXR5RmlsdGVyKHNldil9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldmVyaXR5RmlsdGVyID09PSBzZXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTkwMC81MCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7c2V2ID09PSAnQUxMJyA/ICdXc3p5c3RraWUgKCcgKyB0aHJlYXRzLmxlbmd0aCArICcpJyA6IHNldn1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIENoZWNrYm94ZXMgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTMgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpbmNsdWRlRm9jdXNMb2dzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEluY2x1ZGVGb2N1c0xvZ3MoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXB1cnBsZS02MDAgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGJnLXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UmVqZXN0ciBQcnplY2h3eWNlxYQgRm9rdXN1PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG5cbiAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQteHMgdGV4dC1zbGF0ZS0zMDAgY3Vyc29yLXBvaW50ZXIgc2VsZWN0LW5vbmVcIj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBjaGVja2VkPXtpbmNsdWRlS2lsbFNuaXBwZXRzfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEluY2x1ZGVLaWxsU25pcHBldHMoZS50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXB1cnBsZS02MDAgZm9jdXM6cmluZy1wdXJwbGUtNTAwIGJnLXNsYXRlLTkwMFwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+S29keSBMaWt3aWRhY2ppIChQeXRob24gS2lsbC1DaGFpbik8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cblxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC14cyB0ZXh0LXNsYXRlLTMwMCBjdXJzb3ItcG9pbnRlciBzZWxlY3Qtbm9uZVwiPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e2luY2x1ZGVFeHBsb2l0Q2hhaW5zfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEluY2x1ZGVFeHBsb2l0Q2hhaW5zKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkIGJvcmRlci1zbGF0ZS03MDAgdGV4dC1wdXJwbGUtNjAwIGZvY3VzOnJpbmctcHVycGxlLTUwMCBiZy1zbGF0ZS05MDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPsWBYcWEY3VjaHkgRWtzcGxvYXRhY2ppIChFeHBsb2l0IENoYWluKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogQ3VzdG9tIE5vdGVzICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICBOb3RhdGthIEtyeW1pbmFsaXN0eWN6bmEgxZpsZWRjemVnbyAoT3Bjam9uYWxuaWUpOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICB2YWx1ZT17Y3VzdG9tTm90ZXN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRDdXN0b21Ob3RlcyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJOcC46IFBvdHdpZXJkem9ubyBuZXV0cmFsaXphY2rEmSBuYWvFgmFka2kgRmx1dHRlciBEZXNrdG9wIG5hIHN0YWNqaSByb2JvY3plai4gV3N6eXN0a2llIHVjaHd5dHkgb2tpZW5uZSBvZHp5c2thbmUuXCJcbiAgICAgICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHJvdW5kZWQteGwgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMCByZXNpemUtbm9uZSBmb250LXNhbnNcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBGb290ZXIgQWN0aW9ucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgYmctc2xhdGUtOTUwIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxDbG9jayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+Rm9ybWF0OiBTdGFuZGFyZG93eSBkb2t1bWVudCBQREYgKEE0KSB6ZSBzdG9wa2FtaSBpIG51bWVyYWNqxIUgc3Ryb248L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBzbTp3LWF1dG9cIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBzbTpmbGV4LW5vbmUgcHgtNCBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LXhzIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFphbWtuaWpcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRQZGZ9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0V4cG9ydGluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHNtOmZsZXgtbm9uZSBweC01IHB5LTIuNSByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHZpYS1pbmRpZ28tNjAwIHRvLWN5YW4tNjAwIGhvdmVyOmZyb20tcHVycGxlLTUwMCBob3Zlcjp0by1jeWFuLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwLzYwIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC81MCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTUwIGRpc2FibGVkOmN1cnNvci1ub3QtYWxsb3dlZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0V4cG9ydGluZyA/IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTQgaC00IGJvcmRlci0yIGJvcmRlci13aGl0ZS8zMCBib3JkZXItdC13aGl0ZSByb3VuZGVkLWZ1bGwgYW5pbWF0ZS1zcGluXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkdlbmVyb3dhbmllIFBERi4uLjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgPEZpbGVEb3duIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBSYXBvcnQgUERGIChGb3JlbnNpY3MpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUE0RmMsU0F5T0UsVUF6T0Y7QUE1RmQsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQW9DO0FBQUEsRUFDcEM7QUFBQSxFQUFhO0FBQUEsRUFBVztBQUFBLEVBQ1M7QUFBQSxPQUM1QjtBQUVQLFNBQVMscUNBQWdFO0FBU2xFLGFBQU0sMEJBQWtFLENBQUM7QUFBQSxFQUM5RTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQU07QUFDSixRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyxzREFBc0Q7QUFDckcsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFzRCx5QkFBeUI7QUFDM0gsUUFBTSxDQUFDLGtCQUFrQixtQkFBbUIsSUFBSSxTQUFTLHVEQUF1RDtBQUNoSCxRQUFNLENBQUMsYUFBYSxjQUFjLElBQUksU0FBUyx5QkFBeUI7QUFDeEUsUUFBTSxDQUFDLGdCQUFnQixpQkFBaUIsSUFBSSxTQUFpQixLQUFLO0FBQ2xFLFFBQU0sQ0FBQyxrQkFBa0IsbUJBQW1CLElBQUksU0FBUyxJQUFJO0FBQzdELFFBQU0sQ0FBQyxxQkFBcUIsc0JBQXNCLElBQUksU0FBUyxJQUFJO0FBQ25FLFFBQU0sQ0FBQyxzQkFBc0IsdUJBQXVCLElBQUksU0FBUyxJQUFJO0FBQ3JFLFFBQU0sQ0FBQyxhQUFhLGNBQWMsSUFBSSxTQUFTLEVBQUU7QUFFakQsUUFBTSxDQUFDLGFBQWEsY0FBYyxJQUFJLFNBQVMsS0FBSztBQUNwRCxRQUFNLENBQUMsa0JBQWtCLG1CQUFtQixJQUFJLFNBTXRDLElBQUk7QUFFZCxNQUFJLENBQUMsT0FBUSxRQUFPO0FBRXBCLFFBQU0scUJBQXFCLG1CQUFtQixRQUMxQyxRQUFRLFNBQ1IsUUFB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