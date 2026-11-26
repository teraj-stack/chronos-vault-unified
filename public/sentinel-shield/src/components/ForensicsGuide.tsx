import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
import { BookOpen, AlertOctagon, Terminal, Layers, CheckCircle2, ChevronRight, Lock, Download, FileText, Check } from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { FORENSICS_TOPICS } from "/sentinel-shield/src/data/forensicsGuide.ts";
import { CodeBlock } from "/sentinel-shield/src/components/CodeBlock.tsx";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
export const ForensicsGuide = () => {
  const [selectedTopicId, setSelectedTopicId] = useState(FORENSICS_TOPICS[0].id);
  const [downloadSuccess, setDownloadSuccess] = useState(null);
  const selectedTopic = FORENSICS_TOPICS.find((t) => t.id === selectedTopicId) || FORENSICS_TOPICS[0];
  const handleExportTopicReport = (topic) => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19);
    const divider = "=".repeat(80);
    const subDivider = "-".repeat(80);
    const reportLines = [
      divider,
      "SENTINEL CYBER-DEFENSE & FORENSIC RESEARCH LAB - EKSPERTYZA ŚLEDCZA",
      divider,
      `Identyfikator Ekspertyzy : SENTINEL-FORENSIC-${topic.id.toUpperCase()}`,
      `Data Wygenerowania       : ${timestamp} UTC`,
      `Kategoria Analizy        : ${topic.category.toUpperCase()}`,
      `Temat Raportu            : ${topic.title}`,
      `Klasyfikacja Bezpieczeństwa: POUFNE / BADANIE PODATNOŚCI SYSTEMOWYCH`,
      `Metoda Weryfikacji       : 100% OFFLINE HEURISTIC & IN-DEPTH WIN32/X11 REVERSE AUDIT`,
      divider,
      "",
      "1. STRESZCZENIE ANALITYCZNE I DIAGNOZA WEKTORA ZAGROŻENIA:",
      subDivider,
      topic.summary,
      "",
      "2. SZCZEGÓŁOWA ANALIZA KRYMINALISTYCZNA (TECHNICAL DEEP DIVE):",
      subDivider,
      topic.details,
      "",
      "3. KLUCZOWE WYNIKI BADAŃ I PODATNOŚCI JĄDRA SYSTEMU:",
      subDivider,
      ...topic.bulletPoints.map((bp, i) => `  [${i + 1}] ${bp}`),
      "",
      "4. DOWODY KODU BADAWCZEGO / SEKWENCJE WYKONAWCZE I POLECENIA SYSTEMOWE:",
      subDivider,
      topic.codeSnippet || "Brak specyficznego kodu dla wybranego zagadnienia.",
      "",
      "5. REKOMENDOWANY PROTOKÓŁ REAKCJI & PROCEDURA AWARYJNA (KILL-CHAIN RESPONSE):",
      subDivider,
      "  - [A] Natychmiastowe zamrożenie wątków w pamięci RAM za pomocą NtSuspendProcess / SIGSTOP (Signal 19).",
      "  - [B] Weryfikacja parametrów szyn PCIe oraz skoków poboru mocy na stykach (PciHardwareTelemetryMonitor).",
      "  - [C] Sabotaż binarny nagłówka MZ/PE (DOS Header byte corruption) uniemożliwiający załadowanie kodu.",
      "  - [D] Kwarantanna uprawnień NTFS DACL poprzez icacls /inheritance:r /deny *S-1-1-0:(F).",
      "  - [E] Usunięcie wpisów z Rejestru Image File Execution Options (IFEO) i autostartu.",
      "",
      divider,
      "Podpis Cyfrowy: Sentinel Forensic & Anti-Overlay Intelligence Engine v2.5",
      "Plik wygenerowany autonomicznie w przeglądarce - pełna poufność danych (Zero Cloud Leak)",
      divider
    ];
    const content = reportLines.join("\n");
    const safeFilename = `RAPORT_KRYMINALISTYCZNY_${topic.id.toUpperCase()}.txt`;
    downloadFile(safeFilename, content, "text/plain;charset=utf-8");
    setDownloadSuccess(`Pomyślnie wyeksportowano raport: ${safeFilename}`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };
  const handleExportAllTopicsReport = () => {
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19);
    const divider = "=".repeat(80);
    const subDivider = "-".repeat(80);
    const masterLines = [
      divider,
      "SENTINEL LAB: KOMPLETNE KOMPENDIUM WIEDZY KRYMINALISTYCZNEJ I INŻYNIERII WSTECZNEJ",
      divider,
      `Data Utworzenia Zrzutu : ${timestamp} UTC`,
      `Łączna Liczba Rozdziałów: ${FORENSICS_TOPICS.length}`,
      `Wersja Dokumentacji   : 2.5.0-SENTINEL-OFFLINE`,
      divider,
      ""
    ];
    FORENSICS_TOPICS.forEach((topic, idx) => {
      masterLines.push(
        `[ROZDZIAŁ ${idx + 1}/${FORENSICS_TOPICS.length}] ${topic.title.toUpperCase()}`,
        `Kategoria: ${topic.category} | ID: ${topic.id}`,
        subDivider,
        `Podsumowanie:`,
        topic.summary,
        "",
        `Szczegóły Techniczne:`,
        topic.details,
        "",
        `Kluczowe Punkty Badawcze:`,
        ...topic.bulletPoints.map((bp) => `  • ${bp}`),
        "",
        `Kod Źródłowy / Instrukcje Shell:`,
        topic.codeSnippet || "Brak kodu.",
        "",
        divider,
        ""
      );
    });
    const content = masterLines.join("\n");
    const safeFilename = `KOMPLETNE_KOMPENDIUM_KRYMINALISTYKI_SENTINEL.txt`;
    downloadFile(safeFilename, content, "text/plain;charset=utf-8");
    setDownloadSuccess(`Pomyślnie wyeksportowano pełne kompendium: ${safeFilename}`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-rose-400 text-xs uppercase font-bold tracking-wider mb-1", children: [
            /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 121,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Baza Wiedzy i Inżynieria Wsteczna" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 122,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 120,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-bold text-white", children: "Jak Działają Nakładki Flutter i Mechanizmy Blokad" }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 124,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-400 mt-1 max-w-2xl", children: "Kompendium wiedzy o strukturach okien Win32, bibliotekach Fluttera (window_manager, bitsdojo_window), bezpiecznym pulpicie Windows oraz procedurach awaryjnych." }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 127,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 119,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5 shrink-0 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleExportTopicReport(selectedTopic),
              className: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-rose-950/50 border border-rose-400/40 transition-all cursor-pointer active:scale-95",
              title: "Zapisz bieżącą analizę i raport heurystyczny jako lokalny plik .txt",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 text-white" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 138,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Eksportuj Raport (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 139,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 133,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleExportAllTopicsReport,
              className: "px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-zinc-300 hover:text-white text-xs font-mono font-medium flex items-center gap-1.5 transition-all cursor-pointer",
              title: "Zapisz wszystkie rozdziały bazy wiedzy do jednego pliku .txt",
              children: [
                /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5 text-zinc-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 147,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Wszystkie Tematy (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 148,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 142,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 132,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 118,
        columnNumber: 9
      }, this),
      downloadSuccess && /* @__PURE__ */ jsxDEV("div", { className: "mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-in fade-in duration-200", children: [
        /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 155,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: downloadSuccess }, void 0, false, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 156,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 154,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ForensicsGuide.tsx",
      lineNumber: 117,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-2", children: FORENSICS_TOPICS.map((topic) => {
        const isSelected = topic.id === selectedTopicId;
        return /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedTopicId(topic.id),
            className: `w-full text-left p-3.5 rounded-xl border transition-all flex items-start justify-between ${isSelected ? "bg-rose-950/50 border-rose-500/60 text-white shadow-lg shadow-rose-950/40" : "bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:text-white"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                  topic.category === "flutter_mechanics" && /* @__PURE__ */ jsxDEV(Lock, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 179,
                    columnNumber: 64
                  }, this),
                  topic.category === "emergency_bypass" && /* @__PURE__ */ jsxDEV(AlertOctagon, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 180,
                    columnNumber: 63
                  }, this),
                  topic.category === "powershell_cmd" && /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 181,
                    columnNumber: 61
                  }, this),
                  topic.category === "os_internals" && /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5 text-blue-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 182,
                    columnNumber: 59
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold", children: topic.title }, void 0, false, {
                    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                    lineNumber: 183,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 178,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 line-clamp-2", children: topic.summary }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 185,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 177,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(ChevronRight, { className: `w-4 h-4 mt-0.5 transition-transform ${isSelected ? "text-rose-400 translate-x-1" : "text-slate-600"}` }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 187,
                columnNumber: 17
              }, this)
            ]
          },
          topic.id,
          true,
          {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 168,
            columnNumber: 15
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 164,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-rose-400 text-xs font-mono uppercase", children: [
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Sekcja: ",
                selectedTopic.category
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 198,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 199,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: [
                "ID: ",
                selectedTopic.id
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                lineNumber: 200,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 197,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-xl font-bold text-white mt-1", children: selectedTopic.title }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 202,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 196,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleExportTopicReport(selectedTopic),
              className: "self-start sm:self-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer active:scale-95",
              title: "Pobierz ten raport jako .txt",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-rose-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 210,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Zapisz .txt" }, void 0, false, {
                  fileName: "/app/applet/src/components/ForensicsGuide.tsx",
                  lineNumber: 211,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 205,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 195,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-sm text-slate-300 leading-relaxed", children: selectedTopic.details }, void 0, false, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 215,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold uppercase text-slate-200 block mb-2", children: "Kluczowe zagadnienia techniczne:" }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 219,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("ul", { className: "space-y-2", children: selectedTopic.bulletPoints.map((bp, idx) => /* @__PURE__ */ jsxDEV("li", { className: "flex items-start space-x-2 text-xs sm:text-sm text-slate-300", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 225,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: bp }, void 0, false, {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 226,
              columnNumber: 19
            }, this)
          ] }, idx, true, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 224,
            columnNumber: 17
          }, this)) }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 222,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 218,
          columnNumber: 11
        }, this),
        selectedTopic.codeSnippet && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 block", children: "Przykładowy kod / polecenia:" }, void 0, false, {
            fileName: "/app/applet/src/components/ForensicsGuide.tsx",
            lineNumber: 235,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            CodeBlock,
            {
              code: selectedTopic.codeSnippet,
              language: selectedTopic.category === "powershell_cmd" ? "bash" : "dart",
              filename: selectedTopic.category === "powershell_cmd" ? "terminal_commands.sh" : "blocking_overlay.dart"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ForensicsGuide.tsx",
              lineNumber: 236,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ForensicsGuide.tsx",
          lineNumber: 234,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ForensicsGuide.tsx",
        lineNumber: 194,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ForensicsGuide.tsx",
      lineNumber: 162,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ForensicsGuide.tsx",
    lineNumber: 115,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcmVuc2ljc0d1aWRlLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBCb29rT3BlbiwgU2hpZWxkQ2hlY2ssIEFsZXJ0T2N0YWdvbiwgVGVybWluYWwsIEhlbHBDaXJjbGUsIExheWVycywgQ2hlY2tDaXJjbGUyLCBDaGV2cm9uUmlnaHQsIExvY2ssIERvd25sb2FkLCBGaWxlVGV4dCwgQ2hlY2sgfSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgRk9SRU5TSUNTX1RPUElDUywgRm9yZW5zaWNzVG9waWMgfSBmcm9tICcuLi9kYXRhL2ZvcmVuc2ljc0d1aWRlJztcbmltcG9ydCB7IENvZGVCbG9jayB9IGZyb20gJy4vQ29kZUJsb2NrJztcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuXG5leHBvcnQgY29uc3QgRm9yZW5zaWNzR3VpZGU6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbc2VsZWN0ZWRUb3BpY0lkLCBzZXRTZWxlY3RlZFRvcGljSWRdID0gdXNlU3RhdGU8c3RyaW5nPihGT1JFTlNJQ1NfVE9QSUNTWzBdLmlkKTtcbiAgY29uc3QgW2Rvd25sb2FkU3VjY2Vzcywgc2V0RG93bmxvYWRTdWNjZXNzXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuXG4gIGNvbnN0IHNlbGVjdGVkVG9waWMgPSBGT1JFTlNJQ1NfVE9QSUNTLmZpbmQoKHQpID0+IHQuaWQgPT09IHNlbGVjdGVkVG9waWNJZCkgfHwgRk9SRU5TSUNTX1RPUElDU1swXTtcblxuICBjb25zdCBoYW5kbGVFeHBvcnRUb3BpY1JlcG9ydCA9ICh0b3BpYzogRm9yZW5zaWNzVG9waWMpID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnVCcsICcgJykuc3Vic3RyaW5nKDAsIDE5KTtcbiAgICBjb25zdCBkaXZpZGVyID0gJz0nLnJlcGVhdCg4MCk7XG4gICAgY29uc3Qgc3ViRGl2aWRlciA9ICctJy5yZXBlYXQoODApO1xuXG4gICAgY29uc3QgcmVwb3J0TGluZXMgPSBbXG4gICAgICBkaXZpZGVyLFxuICAgICAgJ1NFTlRJTkVMIENZQkVSLURFRkVOU0UgJiBGT1JFTlNJQyBSRVNFQVJDSCBMQUIgLSBFS1NQRVJUWVpBIMWaTEVEQ1pBJyxcbiAgICAgIGRpdmlkZXIsXG4gICAgICBgSWRlbnR5ZmlrYXRvciBFa3NwZXJ0eXp5IDogU0VOVElORUwtRk9SRU5TSUMtJHt0b3BpYy5pZC50b1VwcGVyQ2FzZSgpfWAsXG4gICAgICBgRGF0YSBXeWdlbmVyb3dhbmlhICAgICAgIDogJHt0aW1lc3RhbXB9IFVUQ2AsXG4gICAgICBgS2F0ZWdvcmlhIEFuYWxpenkgICAgICAgIDogJHt0b3BpYy5jYXRlZ29yeS50b1VwcGVyQ2FzZSgpfWAsXG4gICAgICBgVGVtYXQgUmFwb3J0dSAgICAgICAgICAgIDogJHt0b3BpYy50aXRsZX1gLFxuICAgICAgYEtsYXN5ZmlrYWNqYSBCZXpwaWVjemXFhHN0d2E6IFBPVUZORSAvIEJBREFOSUUgUE9EQVROT8WaQ0kgU1lTVEVNT1dZQ0hgLFxuICAgICAgYE1ldG9kYSBXZXJ5ZmlrYWNqaSAgICAgICA6IDEwMCUgT0ZGTElORSBIRVVSSVNUSUMgJiBJTi1ERVBUSCBXSU4zMi9YMTEgUkVWRVJTRSBBVURJVGAsXG4gICAgICBkaXZpZGVyLFxuICAgICAgJycsXG4gICAgICAnMS4gU1RSRVNaQ1pFTklFIEFOQUxJVFlDWk5FIEkgRElBR05PWkEgV0VLVE9SQSBaQUdST8W7RU5JQTonLFxuICAgICAgc3ViRGl2aWRlcixcbiAgICAgIHRvcGljLnN1bW1hcnksXG4gICAgICAnJyxcbiAgICAgICcyLiBTWkNaRUfDk8WBT1dBIEFOQUxJWkEgS1JZTUlOQUxJU1RZQ1pOQSAoVEVDSE5JQ0FMIERFRVAgRElWRSk6JyxcbiAgICAgIHN1YkRpdmlkZXIsXG4gICAgICB0b3BpYy5kZXRhaWxzLFxuICAgICAgJycsXG4gICAgICAnMy4gS0xVQ1pPV0UgV1lOSUtJIEJBREHFgyBJIFBPREFUTk/FmkNJIErEhERSQSBTWVNURU1VOicsXG4gICAgICBzdWJEaXZpZGVyLFxuICAgICAgLi4udG9waWMuYnVsbGV0UG9pbnRzLm1hcCgoYnAsIGkpID0+IGAgIFske2kgKyAxfV0gJHticH1gKSxcbiAgICAgICcnLFxuICAgICAgJzQuIERPV09EWSBLT0RVIEJBREFXQ1pFR08gLyBTRUtXRU5DSkUgV1lLT05BV0NaRSBJIFBPTEVDRU5JQSBTWVNURU1PV0U6JyxcbiAgICAgIHN1YkRpdmlkZXIsXG4gICAgICB0b3BpYy5jb2RlU25pcHBldCB8fCAnQnJhayBzcGVjeWZpY3puZWdvIGtvZHUgZGxhIHd5YnJhbmVnbyB6YWdhZG5pZW5pYS4nLFxuICAgICAgJycsXG4gICAgICAnNS4gUkVLT01FTkRPV0FOWSBQUk9UT0vDk8WBIFJFQUtDSkkgJiBQUk9DRURVUkEgQVdBUllKTkEgKEtJTEwtQ0hBSU4gUkVTUE9OU0UpOicsXG4gICAgICBzdWJEaXZpZGVyLFxuICAgICAgJyAgLSBbQV0gTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgd8SFdGvDs3cgdyBwYW1pxJljaSBSQU0gemEgcG9tb2PEhSBOdFN1c3BlbmRQcm9jZXNzIC8gU0lHU1RPUCAoU2lnbmFsIDE5KS4nLFxuICAgICAgJyAgLSBbQl0gV2VyeWZpa2FjamEgcGFyYW1ldHLDs3cgc3p5biBQQ0llIG9yYXogc2tva8OzdyBwb2JvcnUgbW9jeSBuYSBzdHlrYWNoIChQY2lIYXJkd2FyZVRlbGVtZXRyeU1vbml0b3IpLicsXG4gICAgICAnICAtIFtDXSBTYWJvdGHFvCBiaW5hcm55IG5hZ8WCw7N3a2EgTVovUEUgKERPUyBIZWFkZXIgYnl0ZSBjb3JydXB0aW9uKSB1bmllbW/FvGxpd2lhasSFY3kgemHFgmFkb3dhbmllIGtvZHUuJyxcbiAgICAgICcgIC0gW0RdIEt3YXJhbnRhbm5hIHVwcmF3bmllxYQgTlRGUyBEQUNMIHBvcHJ6ZXogaWNhY2xzIC9pbmhlcml0YW5jZTpyIC9kZW55ICpTLTEtMS0wOihGKS4nLFxuICAgICAgJyAgLSBbRV0gVXN1bmnEmWNpZSB3cGlzw7N3IHogUmVqZXN0cnUgSW1hZ2UgRmlsZSBFeGVjdXRpb24gT3B0aW9ucyAoSUZFTykgaSBhdXRvc3RhcnR1LicsXG4gICAgICAnJyxcbiAgICAgIGRpdmlkZXIsXG4gICAgICAnUG9kcGlzIEN5ZnJvd3k6IFNlbnRpbmVsIEZvcmVuc2ljICYgQW50aS1PdmVybGF5IEludGVsbGlnZW5jZSBFbmdpbmUgdjIuNScsXG4gICAgICAnUGxpayB3eWdlbmVyb3dhbnkgYXV0b25vbWljem5pZSB3IHByemVnbMSFZGFyY2UgLSBwZcWCbmEgcG91Zm5vxZvEhyBkYW55Y2ggKFplcm8gQ2xvdWQgTGVhayknLFxuICAgICAgZGl2aWRlcixcbiAgICBdO1xuXG4gICAgY29uc3QgY29udGVudCA9IHJlcG9ydExpbmVzLmpvaW4oJ1xcbicpO1xuICAgIGNvbnN0IHNhZmVGaWxlbmFtZSA9IGBSQVBPUlRfS1JZTUlOQUxJU1RZQ1pOWV8ke3RvcGljLmlkLnRvVXBwZXJDYXNlKCl9LnR4dGA7XG4gICAgZG93bmxvYWRGaWxlKHNhZmVGaWxlbmFtZSwgY29udGVudCwgJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcpO1xuXG4gICAgc2V0RG93bmxvYWRTdWNjZXNzKGBQb215xZtsbmllIHd5ZWtzcG9ydG93YW5vIHJhcG9ydDogJHtzYWZlRmlsZW5hbWV9YCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXREb3dubG9hZFN1Y2Nlc3MobnVsbCksIDM1MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUV4cG9ydEFsbFRvcGljc1JlcG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkucmVwbGFjZSgnVCcsICcgJykuc3Vic3RyaW5nKDAsIDE5KTtcbiAgICBjb25zdCBkaXZpZGVyID0gJz0nLnJlcGVhdCg4MCk7XG4gICAgY29uc3Qgc3ViRGl2aWRlciA9ICctJy5yZXBlYXQoODApO1xuXG4gICAgY29uc3QgbWFzdGVyTGluZXMgPSBbXG4gICAgICBkaXZpZGVyLFxuICAgICAgJ1NFTlRJTkVMIExBQjogS09NUExFVE5FIEtPTVBFTkRJVU0gV0lFRFpZIEtSWU1JTkFMSVNUWUNaTkVKIEkgSU7Fu1lOSUVSSUkgV1NURUNaTkVKJyxcbiAgICAgIGRpdmlkZXIsXG4gICAgICBgRGF0YSBVdHdvcnplbmlhIFpyenV0dSA6ICR7dGltZXN0YW1wfSBVVENgLFxuICAgICAgYMWBxIVjem5hIExpY3piYSBSb3pkemlhxYLDs3c6ICR7Rk9SRU5TSUNTX1RPUElDUy5sZW5ndGh9YCxcbiAgICAgIGBXZXJzamEgRG9rdW1lbnRhY2ppICAgOiAyLjUuMC1TRU5USU5FTC1PRkZMSU5FYCxcbiAgICAgIGRpdmlkZXIsXG4gICAgICAnJyxcbiAgICBdO1xuXG4gICAgRk9SRU5TSUNTX1RPUElDUy5mb3JFYWNoKCh0b3BpYywgaWR4KSA9PiB7XG4gICAgICBtYXN0ZXJMaW5lcy5wdXNoKFxuICAgICAgICBgW1JPWkRaSUHFgSAke2lkeCArIDF9LyR7Rk9SRU5TSUNTX1RPUElDUy5sZW5ndGh9XSAke3RvcGljLnRpdGxlLnRvVXBwZXJDYXNlKCl9YCxcbiAgICAgICAgYEthdGVnb3JpYTogJHt0b3BpYy5jYXRlZ29yeX0gfCBJRDogJHt0b3BpYy5pZH1gLFxuICAgICAgICBzdWJEaXZpZGVyLFxuICAgICAgICBgUG9kc3Vtb3dhbmllOmAsXG4gICAgICAgIHRvcGljLnN1bW1hcnksXG4gICAgICAgICcnLFxuICAgICAgICBgU3pjemVnw7PFgnkgVGVjaG5pY3puZTpgLFxuICAgICAgICB0b3BpYy5kZXRhaWxzLFxuICAgICAgICAnJyxcbiAgICAgICAgYEtsdWN6b3dlIFB1bmt0eSBCYWRhd2N6ZTpgLFxuICAgICAgICAuLi50b3BpYy5idWxsZXRQb2ludHMubWFwKGJwID0+IGAgIOKAoiAke2JwfWApLFxuICAgICAgICAnJyxcbiAgICAgICAgYEtvZCDFuXLDs2TFgm93eSAvIEluc3RydWtjamUgU2hlbGw6YCxcbiAgICAgICAgdG9waWMuY29kZVNuaXBwZXQgfHwgJ0JyYWsga29kdS4nLFxuICAgICAgICAnJyxcbiAgICAgICAgZGl2aWRlcixcbiAgICAgICAgJydcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250ZW50ID0gbWFzdGVyTGluZXMuam9pbignXFxuJyk7XG4gICAgY29uc3Qgc2FmZUZpbGVuYW1lID0gYEtPTVBMRVRORV9LT01QRU5ESVVNX0tSWU1JTkFMSVNUWUtJX1NFTlRJTkVMLnR4dGA7XG4gICAgZG93bmxvYWRGaWxlKHNhZmVGaWxlbmFtZSwgY29udGVudCwgJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCcpO1xuXG4gICAgc2V0RG93bmxvYWRTdWNjZXNzKGBQb215xZtsbmllIHd5ZWtzcG9ydG93YW5vIHBlxYJuZSBrb21wZW5kaXVtOiAke3NhZmVGaWxlbmFtZX1gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldERvd25sb2FkU3VjY2VzcyhudWxsKSwgMzUwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIFRvcCBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTJ4bCBwLTYgc2hhZG93LXhsXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtcm9zZS00MDAgdGV4dC14cyB1cHBlcmNhc2UgZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5CYXphIFdpZWR6eSBpIEluxbx5bmllcmlhIFdzdGVjem5hPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICBKYWsgRHppYcWCYWrEhSBOYWvFgmFka2kgRmx1dHRlciBpIE1lY2hhbml6bXkgQmxva2FkXG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTQwMCBtdC0xIG1heC13LTJ4bFwiPlxuICAgICAgICAgICAgICBLb21wZW5kaXVtIHdpZWR6eSBvIHN0cnVrdHVyYWNoIG9raWVuIFdpbjMyLCBiaWJsaW90ZWthY2ggRmx1dHRlcmEgKHdpbmRvd19tYW5hZ2VyLCBiaXRzZG9qb193aW5kb3cpLCBiZXpwaWVjem55bSBwdWxwaWNpZSBXaW5kb3dzIG9yYXogcHJvY2VkdXJhY2ggYXdhcnlqbnljaC5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSBzaHJpbmstMCBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRXhwb3J0VG9waWNSZXBvcnQoc2VsZWN0ZWRUb3BpYyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJvc2UtNjAwIHRvLXJvc2UtNzAwIGhvdmVyOmZyb20tcm9zZS01MDAgaG92ZXI6dG8tcm9zZS02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2hhZG93LWxnIHNoYWRvdy1yb3NlLTk1MC81MCBib3JkZXIgYm9yZGVyLXJvc2UtNDAwLzQwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFwaXN6IGJpZcW8xIVjxIUgYW5hbGl6xJkgaSByYXBvcnQgaGV1cnlzdHljem55IGpha28gbG9rYWxueSBwbGlrIC50eHRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXdoaXRlXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+RWtzcG9ydHVqIFJhcG9ydCAoLnR4dCk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVFeHBvcnRBbGxUb3BpY3NSZXBvcnR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctemluYy04MDAvODAgaG92ZXI6YmctemluYy03MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMzAwIGhvdmVyOnRleHQtd2hpdGUgdGV4dC14cyBmb250LW1vbm8gZm9udC1tZWRpdW0gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFwaXN6IHdzenlzdGtpZSByb3pkemlhxYJ5IGJhenkgd2llZHp5IGRvIGplZG5lZ28gcGxpa3UgLnR4dFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXppbmMtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+V3N6eXN0a2llIFRlbWF0eSAoLnR4dCk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAge2Rvd25sb2FkU3VjY2VzcyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHAtMyByb3VuZGVkLXhsIGJnLWVtZXJhbGQtOTUwLzgwIGJvcmRlciBib3JkZXItZW1lcmFsZC01MDAvNTAgdGV4dC1lbWVyYWxkLTMwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBhbmltYXRlLWluIGZhZGUtaW4gZHVyYXRpb24tMjAwXCI+XG4gICAgICAgICAgICA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPntkb3dubG9hZFN1Y2Nlc3N9PC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBHdWlkZSBDb250ZW50IExheW91dCAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgey8qIFRvcGljIExpc3QgU2lkZWJhciAoNCBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHNwYWNlLXktMlwiPlxuICAgICAgICAgIHtGT1JFTlNJQ1NfVE9QSUNTLm1hcCgodG9waWMpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSB0b3BpYy5pZCA9PT0gc2VsZWN0ZWRUb3BpY0lkO1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGtleT17dG9waWMuaWR9XG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2VsZWN0ZWRUb3BpY0lkKHRvcGljLmlkKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LWZ1bGwgdGV4dC1sZWZ0IHAtMy41IHJvdW5kZWQteGwgYm9yZGVyIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuICR7XG4gICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTUwLzUwIGJvcmRlci1yb3NlLTUwMC82MCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctcm9zZS05NTAvNDAnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTkwMC82MCBib3JkZXItc2xhdGUtODAwIHRleHQtc2xhdGUtMzAwIGhvdmVyOmJnLXNsYXRlLTgwMC84MCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTFcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0b3BpYy5jYXRlZ29yeSA9PT0gJ2ZsdXR0ZXJfbWVjaGFuaWNzJyAmJiA8TG9jayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJvc2UtNDAwXCIgLz59XG4gICAgICAgICAgICAgICAgICAgIHt0b3BpYy5jYXRlZ29yeSA9PT0gJ2VtZXJnZW5jeV9ieXBhc3MnICYmIDxBbGVydE9jdGFnb24gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1hbWJlci00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAge3RvcGljLmNhdGVnb3J5ID09PSAncG93ZXJzaGVsbF9jbWQnICYmIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz59XG4gICAgICAgICAgICAgICAgICAgIHt0b3BpYy5jYXRlZ29yeSA9PT0gJ29zX2ludGVybmFscycgJiYgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWJsdWUtNDAwXCIgLz59XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkXCI+e3RvcGljLnRpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgbGluZS1jbGFtcC0yXCI+e3RvcGljLnN1bW1hcnl9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxDaGV2cm9uUmlnaHQgY2xhc3NOYW1lPXtgdy00IGgtNCBtdC0wLjUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gJHtpc1NlbGVjdGVkID8gJ3RleHQtcm9zZS00MDAgdHJhbnNsYXRlLXgtMScgOiAndGV4dC1zbGF0ZS02MDAnfWB9IC8+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFNlbGVjdGVkIFRvcGljIENvbnRlbnQgKDggY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC02IHNoYWRvdy14bCBzcGFjZS15LTVcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTRcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtcm9zZS00MDAgdGV4dC14cyBmb250LW1vbm8gdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U2VrY2phOiB7c2VsZWN0ZWRUb3BpYy5jYXRlZ29yeX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwXCI+SUQ6IHtzZWxlY3RlZFRvcGljLmlkfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG10LTFcIj57c2VsZWN0ZWRUb3BpYy50aXRsZX08L2gzPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRXhwb3J0VG9waWNSZXBvcnQoc2VsZWN0ZWRUb3BpYyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInNlbGYtc3RhcnQgc206c2VsZi1jZW50ZXIgcHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHRlbiByYXBvcnQgamFrbyAudHh0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcm9zZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aYXBpc3ogLnR4dDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBsZWFkaW5nLXJlbGF4ZWRcIj57c2VsZWN0ZWRUb3BpYy5kZXRhaWxzfTwvcD5cblxuICAgICAgICAgIHsvKiBLZXkgQnVsbGV0IFBvaW50cyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MC84MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTIwMCBibG9jayBtYi0yXCI+XG4gICAgICAgICAgICAgIEtsdWN6b3dlIHphZ2FkbmllbmlhIHRlY2huaWN6bmU6XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8dWwgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIHtzZWxlY3RlZFRvcGljLmJ1bGxldFBvaW50cy5tYXAoKGJwLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICA8bGkga2V5PXtpZHh9IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQgc3BhY2UteC0yIHRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcm9zZS00MDAgZmxleC1zaHJpbmstMCBtdC0wLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2JwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ29kZSBTbmlwcGV0IGlmIHByZXNlbnQgKi99XG4gICAgICAgICAge3NlbGVjdGVkVG9waWMuY29kZVNuaXBwZXQgJiYgKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgYmxvY2tcIj5Qcnp5a8WCYWRvd3kga29kIC8gcG9sZWNlbmlhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPENvZGVCbG9ja1xuICAgICAgICAgICAgICAgIGNvZGU9e3NlbGVjdGVkVG9waWMuY29kZVNuaXBwZXR9XG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2U9e3NlbGVjdGVkVG9waWMuY2F0ZWdvcnkgPT09ICdwb3dlcnNoZWxsX2NtZCcgPyAnYmFzaCcgOiAnZGFydCd9XG4gICAgICAgICAgICAgICAgZmlsZW5hbWU9e3NlbGVjdGVkVG9waWMuY2F0ZWdvcnkgPT09ICdwb3dlcnNoZWxsX2NtZCcgPyAndGVybWluYWxfY29tbWFuZHMuc2gnIDogJ2Jsb2NraW5nX292ZXJsYXkuZGFydCd9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBd0hjO0FBeEhkLFNBQWdCLGdCQUFnQjtBQUNoQyxTQUFTLFVBQXVCLGNBQWMsVUFBc0IsUUFBUSxjQUFjLGNBQWMsTUFBTSxVQUFVLFVBQVUsYUFBYTtBQUMvSSxTQUFTLHdCQUF3QztBQUNqRCxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLG9CQUFvQjtBQUV0QixhQUFNLGlCQUEyQixNQUFNO0FBQzVDLFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLElBQUksU0FBaUIsaUJBQWlCLENBQUMsRUFBRSxFQUFFO0FBQ3JGLFFBQU0sQ0FBQyxpQkFBaUIsa0JBQWtCLElBQUksU0FBd0IsSUFBSTtBQUUxRSxRQUFNLGdCQUFnQixpQkFBaUIsS0FBSyxD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