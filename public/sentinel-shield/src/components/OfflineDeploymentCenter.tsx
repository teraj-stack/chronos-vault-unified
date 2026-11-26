import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useMemo = __vite__cjsImport1_react["useMemo"];
import {
  Download,
  HardDrive,
  Zap,
  Terminal,
  Cpu,
  Sparkles,
  Play,
  Copy,
  Check,
  FileCode,
  Layers,
  Radio,
  Skull,
  Rocket,
  Eye,
  FileText,
  Share2,
  ShieldAlert,
  BookOpen,
  Sliders,
  CheckSquare
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import {
  downloadCompleteOfflineStandaloneBundle,
  downloadOfflineResearchZipPackage,
  generateOfficialSafetyResearchReportMarkdown,
  getOfflineResearchCodePortfolio,
  generateInstantAutorunBatScript,
  generateNativePythonTkinterGuiScript,
  generateStandaloneSingleFileAppHtml,
  generate4DeviceMeshExerciseScript,
  generateRetro100CopiesAncestorFreezeScript,
  generatePluginsFreezeAlarmAndDefragmentationScript,
  OfflineLocalHeuristicEngine
} from "/sentinel-shield/src/utils/offlineStandaloneEnvironment.ts";
import {
  generateHexagonalLaserBarrierDaemonScript,
  hexLaserBarrierSystem,
  downloadPostEmpReportFile
} from "/sentinel-shield/src/utils/hexagonalLaserBarrierSystem.ts";
import { downloadFile } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { PostEmpReportModal } from "/sentinel-shield/src/components/PostEmpReportModal.tsx";
import { downloadThreatDatabaseJson, exportThreatsToJsonString } from "/sentinel-shield/src/utils/threatDatabaseExporter.ts";
import { INITIAL_NEUTRALIZED_THREATS } from "/sentinel-shield/src/data/neutralizedViruses.ts";
import { INITIAL_FOCUS_HIJACK_LOGS } from "/sentinel-shield/src/utils/focusHijackTracker.ts";
export const OfflineDeploymentCenter = () => {
  const [copiedFile, setCopiedFile] = useState(null);
  const [simStep, setSimStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simLogs, setSimLogs] = useState([]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [retro100Frozen, setRetro100Frozen] = useState(false);
  const [pluginsAlarmTriggered, setPluginsAlarmTriggered] = useState(false);
  const [defragLogs, setDefragLogs] = useState([]);
  const portfolioFiles = useMemo(() => getOfflineResearchCodePortfolio(), []);
  const [selectedFileId, setSelectedFileId] = useState("doc_report");
  const [isDownloadingZip, setIsDownloadingZip] = useState(false);
  const selectedFile = useMemo(() => {
    return portfolioFiles.find((f) => f.id === selectedFileId) || portfolioFiles[0];
  }, [portfolioFiles, selectedFileId]);
  const handleDownloadAllZip = async () => {
    setIsDownloadingZip(true);
    try {
      await downloadOfflineResearchZipPackage();
    } catch (err) {
      console.error("Błąd generowania ZIP:", err);
    } finally {
      setIsDownloadingZip(false);
    }
  };
  const [offlineInput, setOfflineInput] = useState("flutter_runner.exe - wywłaszczenie HWND_TOPMOST w pamięci RAM i blokada pętli zdarzeń DWM");
  const [analysisResult, setAnalysisResult] = useState(
    () => OfflineLocalHeuristicEngine.analyzeThreat("flutter_runner.exe - wywłaszczenie HWND_TOPMOST w pamięci RAM i blokada pętli zdarzeń DWM")
  );
  const barrierState = hexLaserBarrierSystem.getState();
  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(id);
    setTimeout(() => setCopiedFile(null), 2e3);
  };
  const handleRunOfflineAnalysis = () => {
    if (!offlineInput.trim()) return;
    const res = OfflineLocalHeuristicEngine.analyzeThreat(offlineInput);
    setAnalysisResult(res);
  };
  const handleStartDropperSimulation = () => {
    setIsSimulating(true);
    setSimStep(1);
    setSimLogs(["[FAZA 1] Zrzut pliku 1_SENTINEL_AUTORUN_INSTANT_KILLER.bat na zainfekowany komputer (Brak internetu)..."]);
    setTimeout(() => {
      setSimStep(2);
      setSimLogs((prev) => [
        ...prev,
        "[FAZA 2] Uruchomienie z uprawnieniami administratora -> PowerShell/Win32 zdjęło flagę HWND_TOPMOST ze wszystkich okien DWM!"
      ]);
    }, 1e3);
    setTimeout(() => {
      setSimStep(3);
      setSimLogs((prev) => [
        ...prev,
        "[FAZA 3] Wstrzyknięcie NtSuspendProcess w pamięć RAM (0 ms) -> Wątki agresora trwale unieruchomione!"
      ]);
    }, 2e3);
    setTimeout(() => {
      setSimStep(4);
      setSimLogs((prev) => [
        ...prev,
        "[FAZA 4] Uszkodzenie nagłówka PE (zerowanie bajtów MZ) i kwarantanna ACL (icacls /deny Everyone:(F)) -> Plik unieszkodliwiony!"
      ]);
    }, 3e3);
    setTimeout(() => {
      setSimStep(5);
      setIsSimulating(false);
      setSimLogs((prev) => [
        ...prev,
        "[FAZA 5] Sukces! Całoekranowa bariera laserowa i baza rakietowa zabezpieczyły stację roboczą w 100% offline."
      ]);
    }, 4e3);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-zinc-950/95 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-950/40 relative overflow-hidden", children: /* @__PURE__ */ jsxDEV("div", { className: "relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-lg bg-cyan-950 border border-cyan-400/60 text-cyan-300 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm", children: [
            /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 134,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "100% OFFLINE AIR-GAP MONOLIT" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 135,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 133,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 font-mono text-xs font-bold", children: "WCAG 2.1 AAA SAFE (0 HZ / 0 DB)" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 137,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-1 rounded-lg bg-indigo-950/70 border border-indigo-500/50 text-indigo-200 font-mono text-xs", children: "PAKIET BADAWCZY DLA DECYDENTÓW" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 140,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 132,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight", children: "Stanowisko Badawcze & Globalny Pakiet Offline" }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 145,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed", children: [
          "Kompletne, samowystarczalne środowisko obronne i laboratoryjne. ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-cyan-300", children: "Działa w 100% lokalnie bez połączenia z internetem i chmurą Google" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 150,
            columnNumber: 79
          }, this),
          ". Zawiera wszystkie zastosowane kody operacyjne (Batch, Python, HTML), odczyty telemetrii złączy PCI i matrycy czujników oraz oficjalny raport medyczno-techniczny wyjaśniający fizykę zjawiska i bezpieczeństwo neurologiczne pacjentów."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 149,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 131,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleDownloadAllZip,
            disabled: isDownloadingZip,
            className: "px-5 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:to-yellow-300 text-black font-black font-mono text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/20 border border-amber-300 active:translate-y-0.5 transition-all cursor-pointer disabled:opacity-60",
            title: "Pobierz kompletny pakiet archiwalny .ZIP zawierający wszystkie 8 skryptów, bazę JSON oraz dokumentację medyczno-techniczną",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-5 h-5 text-black" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 163,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isDownloadingZip ? "Pakowanie ZIP..." : "📦 POBIERZ PAKIET BADAWCZY (.ZIP)" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 164,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 157,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => downloadFile("DOKUMENTACJA_DLA_OSOB_DECYZYJNYCH_RAPORT_BEZPIECZENSTWA.md", generateOfficialSafetyResearchReportMarkdown(), "text/markdown;charset=utf-8"),
            className: "px-4 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-cyan-300 font-bold font-mono text-xs flex items-center justify-center gap-2 border border-cyan-500/50 shadow-lg transition-all cursor-pointer",
            title: "Pobierz oficjalny raport w formacie Markdown dla dyrekcji i komisji bezpieczeństwa",
            children: [
              /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 173,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "DOKUMENTACJA (.MD)" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 174,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 168,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: downloadCompleteOfflineStandaloneBundle,
            className: "px-4 py-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-emerald-300 font-bold font-mono text-xs flex items-center justify-center gap-2 border border-emerald-500/50 shadow-lg transition-all cursor-pointer",
            title: "Pobierz rozpakowane pojedyncze pliki do bezpośredniego wdrożenia na pendrive",
            children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 183,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "ZRZUT PLIKÓW" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 184,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 178,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 155,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 130,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 129,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800", children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400", children: /* @__PURE__ */ jsxDEV(BookOpen, { className: "w-5 h-5" }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 195,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 194,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "ANALIZA DLA OSÓB DECYZYJNYCH: FIZYKA PĘTLI KODU A BEZPIECZEŃSTWO W GABINECIE" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 199,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600/40", children: "STANDARD WCAG 2.1" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 200,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 198,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Rzetelna weryfikacja techniczna hipotezy rezonansu cewek indukcyjnych, identyfikacja przyczyn incydentów i protokół ochronny." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 204,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 197,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 193,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 192,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-cyan-300 text-[11px] uppercase", children: "1. HIPOTEZA REZONANSU" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 217,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 218,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 216,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 mt-2 text-[12px] leading-relaxed", children: [
              "Pętle programistyczne (",
              /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300 font-mono", children: "while" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 221,
                columnNumber: 40
              }, this),
              ", instrukcje DWM) wykonują się wyłącznie w krzemie CPU/GPU. Cewki zasilacza (dławiki VRM) mogą generować zjawisko magnetostrykcji akustycznej (coil whine), lecz natężenie pola magnetycznego (",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "<0.05 µT" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 221,
                columnNumber: 285
              }, this),
              ") w odległości 20 cm spada do zera."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 220,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 215,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-zinc-950 border border-cyan-900/40 text-[11px] font-mono text-cyan-300", children: "Wniosek: Brak fizycznej możliwości rezonansu radiowego przez głośniki w przestrzeń gabinetu." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 224,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 214,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-rose-300 text-[11px] uppercase", children: "2. ŹRÓDŁO RYZYKA (EPILEPSJA)" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 233,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 234,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 232,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 mt-2 text-[12px] leading-relaxed", children: [
              "Rzeczywistą przyczyną napadów padaczkowych w gabinecie jest ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-rose-300", children: "fotostymulacja (PSE)" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 237,
                columnNumber: 77
              }, this),
              " wywoływana przez migotanie ekranu i szybkie animacje stroboskopowe w pasmie krytycznym ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "3 Hz – 30 Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 237,
                columnNumber: 228
              }, this),
              ", wzmocniona nagłym akustycznym odruchem zaskoczenia (startle reflex) modulowanej syreny alarmowej."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 236,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 231,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-zinc-950 border border-rose-900/40 text-[11px] font-mono text-rose-300", children: "Klucz: Eliminacja błysków i wyciszenie klaksonu usuwa wyzwalacz napadów." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 240,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 230,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-emerald-300 text-[11px] uppercase", children: "3. WDROŻONA OCHRONA" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 249,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(CheckSquare, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 250,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 248,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 mt-2 text-[12px] leading-relaxed", children: [
              "Aplikacja została trwale przestawiona w ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-300", children: "Tryb Bezpieczny" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 253,
                columnNumber: 57
              }, this),
              ": syreny i dźwięki Web Audio trwale wyciszone (",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "0 dB" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 253,
                columnNumber: 165
              }, this),
              "), wyłączono animacje stroboskopowe (",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "0 Hz" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 253,
                columnNumber: 246
              }, this),
              "), usunięto latające drony i lasery, a wykresy mają stałe, czytelne osie."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 252,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 247,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-zinc-950 border border-emerald-900/40 text-[11px] font-mono text-emerald-300", children: "Stan: Zgodność z kryteriami sukcesu 2.3.1 i 2.3.2 normy WCAG 2.1 AAA." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 256,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 246,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex flex-col justify-between space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-zinc-800", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-amber-300 text-[11px] uppercase", children: "4. DLA KIEROWNICTWA" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 265,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 266,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 264,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-zinc-300 mt-2 text-[12px] leading-relaxed", children: [
              "Zaleca się skierowanie pacjentów na kliniczne badanie EEG z próbą PhS, sprawdzenie rezystancji uziemienia ochronnego PE w gabinecie (",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: "<5 Ω" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 269,
                columnNumber: 150
              }, this),
              ", norma PN-HD 60364-7-710) oraz stosowanie monitorów ze stabilnym podświetleniem Flicker-Free min. 75/120 Hz."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 268,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 263,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-zinc-950 border border-amber-900/40 text-[11px] font-mono text-amber-300", children: "Dokumentacja: Gotowa do wydruku w pliku .MD zawartym w paczce ZIP." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 272,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 262,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 212,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 191,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-zinc-950/95 border-2 border-indigo-500/40 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-300", children: /* @__PURE__ */ jsxDEV(FileCode, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 284,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 283,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "PEŁNY MATERIAŁ BADAWCZY: KODY ŹRÓDŁOWE & METRYKI CZUJNIKÓW" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 288,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-950 text-indigo-300 border border-indigo-500/40", children: [
                portfolioFiles.length,
                " PLIKÓW OFFLINE"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 289,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 287,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-zinc-400 mt-0.5", children: "Kliknij dowolną pozycję, aby bezpośrednio zbadać kod, skopiować treść lub pobrać pojedynczy plik." }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 293,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 286,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 282,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(selectedFile.getContent(), selectedFile.id),
              className: "px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                copiedFile === selectedFile.id ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 304,
                  columnNumber: 49
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4 text-zinc-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 304,
                  columnNumber: 98
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedFile === selectedFile.id ? "Skopiowano!" : "Kopiuj Cały Kod" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 305,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 300,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile(
                selectedFile.filename,
                selectedFile.getContent(),
                selectedFile.language === "json" ? "application/json;charset=utf-8" : selectedFile.language === "batch" ? "application/x-bat" : selectedFile.language === "html" ? "text/html" : "text/plain;charset=utf-8"
              ),
              className: "px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 316,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: [
                  "Pobierz (",
                  selectedFile.filename,
                  ")"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 317,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 308,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 299,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 281,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-4 space-y-1.5 max-h-[480px] overflow-y-auto pr-1", children: portfolioFiles.map((file) => {
          const isSelected = selectedFileId === file.id;
          return /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedFileId(file.id),
              className: `w-full text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-1 ${isSelected ? "bg-zinc-800 text-white border-indigo-500/70 shadow-md" : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:bg-zinc-800/60 hover:text-zinc-200"}`,
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-1", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-xs text-slate-100 truncate", children: file.name }, void 0, false, {
                    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                    lineNumber: 339,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: `text-[9px] font-mono px-1.5 py-0.2 rounded uppercase ${file.category === "DOKUMENTACJA_MEDYCZNA" ? "bg-amber-950 text-amber-300 border border-amber-700/40" : file.category === "TELEMETRIA_CZUJNIKI" ? "bg-cyan-950 text-cyan-300 border border-cyan-700/40" : "bg-zinc-950 text-slate-300 border border-zinc-700"}`, children: file.language }, void 0, false, {
                    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                    lineNumber: 342,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 338,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-zinc-400 truncate", children: file.filename }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 352,
                  columnNumber: 19
                }, this)
              ]
            },
            file.id,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 329,
              columnNumber: 17
            },
            this
          );
        }) }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 325,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-8 rounded-xl bg-black border border-zinc-800 flex flex-col justify-between overflow-hidden", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-400", children: "Plik:" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 364,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold", children: selectedFile.filename }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 365,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 363,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-zinc-500 text-[11px]", children: selectedFile.description }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 367,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 362,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 overflow-x-auto max-h-[420px] overflow-y-auto font-mono text-[11px] text-zinc-200 leading-relaxed bg-[#0a0d14]", children: /* @__PURE__ */ jsxDEV("pre", { className: "whitespace-pre-wrap select-text", children: selectedFile.getContent() }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 373,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 372,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 361,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 323,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 280,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-cyan-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-700/50 font-bold", children: "1-CLICK BAT" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 385,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 388,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 384,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "1_SENTINEL_AUTORUN.bat" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 390,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: [
            "Błyskawiczny skrypt wsadowy. Zdejmuje ",
            /* @__PURE__ */ jsxDEV("code", { className: "text-cyan-300", children: "HWND_TOPMOST" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 392,
              columnNumber: 53
            }, this),
            ", ubija procesy Flutter i wstrzykuje paraliż Win32."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 391,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 383,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("1_SENTINEL_AUTORUN_INSTANT_KILLER.bat", generateInstantAutorunBatScript(), "application/x-bat"),
              className: "flex-1 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .bat"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 396,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generateInstantAutorunBatScript(), "bat1"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "bat1" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 407,
                columnNumber: 40
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 407,
                columnNumber: 89
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 402,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 395,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 382,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-emerald-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/50 font-bold", children: "NATIVE GUI (NO BROWSER)" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 416,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 419,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 415,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "2_SENTINEL_GUI.py" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 421,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Natywne okno pulpitu Tkinter + Ctypes. Działa bez przeglądarki, z przyciskami bariery, rakiet i paraliżu RAM." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 422,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 414,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("2_SENTINEL_NATIVE_GUI_LAUNCHER.py", generateNativePythonTkinterGuiScript(), "text/x-python"),
              className: "flex-1 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .py"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 427,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generateNativePythonTkinterGuiScript(), "py2"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "py2" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 438,
                columnNumber: 39
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 438,
                columnNumber: 88
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 433,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 426,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 413,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-purple-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700/50 font-bold", children: "SINGLE-FILE .HTML" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 447,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Layers, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 450,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 446,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "3_SENTINEL_OFFLINE.html" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 452,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Samodzielny plik HTML ze zintegrowanymi stylami, silnikiem dźwiękowym Web Audio i sterowaniem barierą." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 453,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 445,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("3_SENTINEL_OFFLINE_AUTONOMOUS_STANDALONE.html", generateStandaloneSingleFileAppHtml(), "text/html"),
              className: "flex-1 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .html"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 458,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generateStandaloneSingleFileAppHtml(), "html3"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "html3" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 469,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 469,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 464,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 457,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 444,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-amber-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-700/50 font-bold", children: "CONDUCTION DAEMON" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 478,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Radio, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 481,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 477,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "4_paralyzer_daemon.py" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 483,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Sygnał 940.8 THz w tle. Monitoruje szynę PCIe, RAM DDR5 i zdejmuje uchwyty TopMost w czasie rzeczywistym." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 484,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 476,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("4_sentinel_device_network_gnida_paralyzer.py", generateHexagonalLaserBarrierDaemonScript(), "text/x-python"),
              className: "flex-1 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-black font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .py"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 489,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generateHexagonalLaserBarrierDaemonScript(), "py4"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "py4" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 500,
                columnNumber: 39
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 500,
                columnNumber: 88
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 495,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 488,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 475,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-rose-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-700/50 font-bold", children: "MODEL 4 URZĄDZEŃ (≤10M)" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 509,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Rocket, { className: "w-4 h-4 text-rose-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 512,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 508,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "5_MESH_LAB_EXERCISE.bat" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 514,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Ćwiczenia desantu w warunkach rzeczywistych. Test penetracji fali EM (4500W) i ocena w plikach vs złączach." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 515,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 507,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("5_SENTINEL_4_DEVICE_MESH_LAB_EXERCISE.bat", generate4DeviceMeshExerciseScript(), "application/x-bat"),
              className: "flex-1 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .bat"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 520,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generate4DeviceMeshExerciseScript(), "bat5"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "bat5" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 531,
                columnNumber: 40
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 531,
                columnNumber: 89
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 526,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 519,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 506,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-indigo-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50 font-bold", children: "100 KOPII WSTECZ" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 540,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 543,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 539,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "6_RETRO_100_COPIES_ANCESTOR_FREEZE.py" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 545,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Śledzenie linii genealogicznej i binarium matki. Zamrożenie 100 generacji kopii w RAM (0 ms) i kwarantanna ACL." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 546,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 538,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("6_SENTINEL_RETRO_100_COPIES_ANCESTOR_FREEZE.py", generateRetro100CopiesAncestorFreezeScript(), "text/x-python"),
              className: "flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .py"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 551,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generateRetro100CopiesAncestorFreezeScript(), "py6"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "py6" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 562,
                columnNumber: 39
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 562,
                columnNumber: 88
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 557,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 550,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 537,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-red-800/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-700/50 font-bold animate-pulse", children: "ALARM & AUTO-DEFRAG" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 571,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-red-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 574,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 570,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "7_PLUGINS_FREEZE_ALARM_AND_DEFRAG.py" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 576,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Kody zamrażania i syrena alarmowa we wszystkich wtyczkach. Auto-wyzwolenie defragmentacji i deatomizacji kodu malware." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 577,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 569,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadFile("7_SENTINEL_ALL_PLUGINS_FREEZE_ALARM_AND_DEFRAG.py", generatePluginsFreezeAlarmAndDefragmentationScript(), "text/x-python"),
              className: "flex-1 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .py"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 582,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(generatePluginsFreezeAlarmAndDefragmentationScript(), "py7"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "py7" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 593,
                columnNumber: 39
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 593,
                columnNumber: 88
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 588,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 581,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 568,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-900/90 border border-cyan-500/60 shadow-lg flex flex-col justify-between space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-400/60 font-bold", children: "JSON AIR-GAP SYNC" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 602,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(Share2, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 605,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 601,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold text-white mt-2", children: "8_NEUTRALIZED_THREATS_AND_SIGNATURES.json" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 607,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 mt-1 leading-relaxed", children: "Baza sygnatur wykrytych gnid, hashe SHA-256, reguły YARA i parametry uboju do synchronizacji offline z innymi stacjami Sentinel." }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 608,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 600,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-2 border-t border-slate-800", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadThreatDatabaseJson(INITIAL_NEUTRALIZED_THREATS, INITIAL_FOCUS_HIJACK_LOGS, "FULL_THREAT_LEDGER"),
              className: "flex-1 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold font-mono text-xs text-center cursor-pointer transition-colors",
              children: "Pobierz .json"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 613,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleCopy(exportThreatsToJsonString(INITIAL_NEUTRALIZED_THREATS, INITIAL_FOCUS_HIJACK_LOGS, true), "json8"),
              className: "p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer",
              title: "Kopiuj zawartość",
              children: copiedFile === "json8" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-4 h-4 text-emerald-400" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 624,
                columnNumber: 41
              }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 624,
                columnNumber: 90
              }, this)
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 619,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 612,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 599,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 380,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-950 border-2 border-indigo-500/50 shadow-2xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "p-2.5 rounded-xl bg-indigo-950 border border-indigo-500/60 text-indigo-300", children: /* @__PURE__ */ jsxDEV(Layers, { className: "w-6 h-6 text-indigo-400" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 635,
            columnNumber: 15
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 634,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black text-white font-mono flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "ZAMRAŻANIE 100 KOPII WSTECZ + ALARM WTYCZEK + AUTO-DEFRAGMENTACJA" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 639,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500 text-[10px] font-bold", children: "OFFLINE KERNEL ENGINE" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 640,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 638,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono", children: "Śledzenie binarium matki i unieruchomienie 100 pokoleń wstecz oraz rozbicie kodu malware po aktywacji alarmu wtyczek." }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 644,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 637,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 633,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setRetro100Frozen(true);
                setDefragLogs((prev) => [
                  ...prev,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ❄️ [ANCESTOR PURGE] Wykryto proces macierzysty -> Zamrożono 100 kopii wstecz (NtSuspendProcess 0 ms)!`,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🛡️ [ACL LOCKDOWN] Nałożono icacls /deny Everyone:(F) na 100 generacji binariów!`
                ]);
              },
              className: "px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-indigo-950",
              children: [
                /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 662,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: retro100Frozen ? "❄️ 100 Kopii Zamrożonych" : "❄️ Zamroź 100 Kopii Wstecz" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 663,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 651,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                setPluginsAlarmTriggered(true);
                setDefragLogs((prev) => [
                  ...prev,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🚨 [ALARM WE WTYCZKACH] Aktywowano syrenę alarmową we wszystkich wtyczkach (Chrome, VS Code, DWM, OBS, Flutter)!`,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 🧩 [KODY ZAMRAŻANIA] Wstrzyknięto Object.freeze + Proxy Trap do obiektów globalnych.`,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 💥 [AUTO-DEFRAGMENTACJA] VirtualProtect(PAGE_READWRITE) + nadpisanie .text zerami i rozbicie nagłówków PE!`,
                  `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] 👑 [SUKCES] Kod malware zdefragmentowany i bezpowrotnie zneutralizowany!`
                ]);
              },
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-red-950 animate-pulse",
              children: [
                /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 679,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "🚨 Alarm Wtyczek & Auto-Defragmentacja" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 680,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 666,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 650,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 632,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-black/90 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-1 h-36 overflow-y-auto", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 pb-1 border-b border-slate-900 flex justify-between", children: [
          /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Reakcji Ancestor Traceback & Defragmentacji:" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 688,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold", children: "100% OFFLINE READY" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 689,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 687,
          columnNumber: 11
        }, this),
        defragLogs.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 italic", children: "Kliknij przycisk powyżej, aby przetestować zamrożenie 100 kopii lub alarm wtyczek z defragmentacją kodu." }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 692,
          columnNumber: 13
        }, this) : defragLogs.map((l, idx) => /* @__PURE__ */ jsxDEV("div", { className: l.includes("SUKCES") ? "text-emerald-400 font-bold" : l.includes("ALARM") || l.includes("DEFRAGMENTACJA") ? "text-red-400 font-bold" : "text-indigo-300", children: l }, idx, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 695,
          columnNumber: 15
        }, this))
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 686,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 631,
      columnNumber: 7
    }, this),
    barrierState.latestPostEmpReport && /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border-2 border-cyan-500/50 shadow-xl space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-cyan-950 border border-cyan-400 text-cyan-300", children: /* @__PURE__ */ jsxDEV(Zap, { className: "w-5 h-5 text-yellow-300 animate-bounce" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 709,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 708,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm sm:text-base font-black text-white font-mono flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { children: "RAPORT DIAGNOSTYCZNY PO FALI ELEKTROMAGNETYCZNEJ" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 713,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500 text-[10px] font-bold", children: "100% UNIESZKODLIWIONYCH" }, void 0, false, {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 714,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 712,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 font-mono", children: "Ocena unieszkodliwienia agresorów w plikach vs złączach dla zamkniętego modelu 4 urządzeń (< 10m)" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 718,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 711,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 707,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsReportModalOpen(true),
              className: "px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs flex items-center gap-1.5 shadow active:scale-95 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 729,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Podgląd Raportu" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 730,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 725,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadPostEmpReportFile(barrierState.latestPostEmpReport, "html"),
              className: "px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-600/50 font-mono font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 736,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz HTML" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 737,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 732,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => downloadPostEmpReportFile(barrierState.latestPostEmpReport, "json"),
              className: "px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-600/40 font-mono font-bold text-xs flex items-center gap-1 active:scale-95 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 743,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "JSON" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 744,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 739,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 724,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 706,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-rose-900/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "UNIESZKODLIWIONE W PLIKACH" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 751,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-bold text-rose-400 mt-1", children: [
            barrierState.latestPostEmpReport.filesCount,
            " SZT."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 752,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "NTFS / PE Wiped" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 753,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 750,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-purple-900/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "UNIESZKODLIWIONE W ZŁĄCZACH" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 756,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-bold text-purple-400 mt-1", children: [
            barrierState.latestPostEmpReport.connectorsCount,
            " SZT."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 757,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "PCIe / USB / Sockets" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 758,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 755,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-cyan-900/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "TOPOLOGIA BADAWCZA" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 761,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-base font-bold text-cyan-300 mt-1", children: "4 URZĄDZENIA" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 762,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "Promień ≤ 10 metrów" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 763,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 760,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-slate-950 border border-emerald-900/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-400 text-[10px]", children: "MOC FALI EM" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 766,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xl font-bold text-emerald-400 mt-1", children: [
            barrierState.latestPostEmpReport.empWavePowerWatts,
            " W"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 767,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-500 mt-0.5", children: "Częstotliwość 940.8 THz" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 768,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 765,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 749,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 705,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 781,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold font-mono text-white", children: "Symulator Zrzutu na Zainfekowany Komputer (Air-Gap Sandbox)" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 782,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 780,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleStartDropperSimulation,
              disabled: isSimulating,
              className: "px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-black font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: `w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 791,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isSimulating ? "Symulacja w toku..." : "Rozpocznij Test Zrzutu" }, void 0, false, {
                  fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                  lineNumber: 792,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 786,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 779,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-5 gap-1.5 text-center font-mono text-[10px]", children: [
          /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg border ${simStep >= 1 ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-600"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "KROK 1" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 799,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: "Zrzut USB" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 800,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 798,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg border ${simStep >= 2 ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-600"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "KROK 2" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 803,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: "TopMost Strip" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 804,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 802,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg border ${simStep >= 3 ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-600"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "KROK 3" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 807,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: "NtSuspend" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 808,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 806,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg border ${simStep >= 4 ? "bg-cyan-950 border-cyan-500 text-cyan-300" : "bg-slate-950 border-slate-800 text-slate-600"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "KROK 4" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 811,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: "PE/ACL Lock" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 812,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 810,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: `p-2 rounded-lg border ${simStep >= 5 ? "bg-emerald-950 border-emerald-500 text-emerald-300" : "bg-slate-950 border-slate-800 text-slate-600"}`, children: [
            /* @__PURE__ */ jsxDEV("div", { className: "font-bold", children: "KROK 5" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 815,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: "Pulpit Czysty" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 816,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 814,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 797,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 h-56 overflow-y-auto space-y-1.5 leading-relaxed", children: simLogs.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 italic py-10 text-center", children: "Kliknij „Rozpocznij Test Zrzutu”, aby zasymulować uruchomienie pakietu offline na maszynie bez dostępu do sieci." }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 823,
          columnNumber: 15
        }, this) : simLogs.map((log, index) => /* @__PURE__ */ jsxDEV("div", { className: "flex items-start gap-2", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-600 select-none", children: [
            "[",
            index + 1,
            "]"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 829,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: log.includes("Sukces") ? "text-emerald-400 font-bold" : log.includes("FAZA") ? "text-yellow-300" : "text-cyan-300", children: log }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 830,
            columnNumber: 19
          }, this)
        ] }, index, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 828,
          columnNumber: 17
        }, this)) }, void 0, false, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 821,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 778,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-6 bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-3", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 843,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h3", { className: "text-sm font-bold font-mono text-white", children: "Wbudowany Silnik Heurystyczny Offline (Zero-Google Mode)" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 844,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 842,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-purple-950 border border-purple-600/50 text-purple-300 text-[10px] font-mono font-bold", children: "100% LOKALNY" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 848,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 841,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs text-slate-400 font-mono block", children: "Wprowadź nazwę procesu, zrzut logów lub podejrzany kod do natychmiastowej analizy offline:" }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 855,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                value: offlineInput,
                onChange: (e) => setOfflineInput(e.target.value),
                placeholder: "np. trojan_overlay.exe lub flutter_runner.exe",
                className: "flex-1 px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-purple-500"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 859,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleRunOfflineAnalysis,
                className: "px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold font-mono text-xs cursor-pointer transition-colors",
                children: "Analizuj Offline"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 866,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 858,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 854,
          columnNumber: 11
        }, this),
        analysisResult && /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-slate-950 border border-purple-900/50 text-xs font-mono space-y-2.5", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Poziom Zagrożenia:" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 879,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: `px-2 py-0.5 rounded text-[10px] font-bold ${analysisResult.threatLevel === "KRYTYCZNE" ? "bg-red-950 text-red-300 border border-red-700" : "bg-amber-950 text-amber-300 border border-amber-700"}`, children: analysisResult.threatLevel }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 880,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 878,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Wykryte Sygnatury:" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 888,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap gap-1 mt-1", children: analysisResult.detectedSignatures.map((sig, idx) => /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300 text-[10px]", children: sig }, idx, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 891,
              columnNumber: 21
            }, this)) }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 889,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 887,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300 text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-slate-800", children: analysisResult.offlineVerdict }, void 0, false, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 898,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Wygenerowano lokalny kod neutralizacji .bat" }, void 0, false, {
              fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
              lineNumber: 903,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => handleCopy(analysisResult.autoGeneratedCode, "custom_ai"),
                className: "text-cyan-400 hover:text-cyan-300 flex items-center gap-1 text-[11px] cursor-pointer",
                children: [
                  copiedFile === "custom_ai" ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                    lineNumber: 908,
                    columnNumber: 49
                  }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                    lineNumber: 908,
                    columnNumber: 102
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: copiedFile === "custom_ai" ? "Skopiowano!" : "Kopiuj Skrypt .bat" }, void 0, false, {
                    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                    lineNumber: 909,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
                lineNumber: 904,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
            lineNumber: 902,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
          lineNumber: 877,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 840,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
      lineNumber: 776,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      PostEmpReportModal,
      {
        report: barrierState.latestPostEmpReport,
        isOpen: isReportModalOpen,
        onClose: () => setIsReportModalOpen(false)
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
        lineNumber: 918,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/OfflineDeploymentCenter.tsx",
    lineNumber: 127,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9mZmxpbmVEZXBsb3ltZW50Q2VudGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZU1lbW8gfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgRG93bmxvYWQsIEhhcmREcml2ZSwgWmFwLCBTaGllbGRDaGVjaywgVGVybWluYWwsIENwdSwgXG4gIFNwYXJrbGVzLCBDaGVja0NpcmNsZTIsIEFsZXJ0VHJpYW5nbGUsIFBsYXksIFJlZnJlc2hDdywgXG4gIENvcHksIENoZWNrLCBGaWxlQ29kZSwgTGF5ZXJzLCBSYWRpbywgU2t1bGwsIFJvY2tldCwgRXh0ZXJuYWxMaW5rLFxuICBFeWUsIEZpbGVUZXh0LCBTaGFyZTIsIEZpbGVKc29uLCBEYXRhYmFzZSwgU2hpZWxkQWxlcnQsIEJvb2tPcGVuLCBTbGlkZXJzLCBDaGVja1NxdWFyZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgXG4gIGRvd25sb2FkQ29tcGxldGVPZmZsaW5lU3RhbmRhbG9uZUJ1bmRsZSxcbiAgZG93bmxvYWRPZmZsaW5lUmVzZWFyY2haaXBQYWNrYWdlLFxuICBnZW5lcmF0ZU9mZmljaWFsU2FmZXR5UmVzZWFyY2hSZXBvcnRNYXJrZG93bixcbiAgZ2VuZXJhdGVQY2lDb25uZWN0b3JzQW5kU2Vuc29yc1RlbGVtZXRyeUpzb24sXG4gIGdldE9mZmxpbmVSZXNlYXJjaENvZGVQb3J0Zm9saW8sXG4gIFJlc2VhcmNoQ29kZUZpbGUsXG4gIGdlbmVyYXRlSW5zdGFudEF1dG9ydW5CYXRTY3JpcHQsXG4gIGdlbmVyYXRlTmF0aXZlUHl0aG9uVGtpbnRlckd1aVNjcmlwdCxcbiAgZ2VuZXJhdGVTdGFuZGFsb25lU2luZ2xlRmlsZUFwcEh0bWwsXG4gIGdlbmVyYXRlNERldmljZU1lc2hFeGVyY2lzZVNjcmlwdCxcbiAgZ2VuZXJhdGVSZXRybzEwMENvcGllc0FuY2VzdG9yRnJlZXplU2NyaXB0LFxuICBnZW5lcmF0ZVBsdWdpbnNGcmVlemVBbGFybUFuZERlZnJhZ21lbnRhdGlvblNjcmlwdCxcbiAgT2ZmbGluZUxvY2FsSGV1cmlzdGljRW5naW5lLFxuICBPZmZsaW5lQW5hbHlzaXNSZXN1bHRcbn0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVN0YW5kYWxvbmVFbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBcbiAgZ2VuZXJhdGVIZXhhZ29uYWxMYXNlckJhcnJpZXJEYWVtb25TY3JpcHQsXG4gIGhleExhc2VyQmFycmllclN5c3RlbSxcbiAgZG93bmxvYWRQb3N0RW1wUmVwb3J0RmlsZVxufSBmcm9tICcuLi91dGlscy9oZXhhZ29uYWxMYXNlckJhcnJpZXJTeXN0ZW0nO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBQb3N0RW1wUmVwb3J0TW9kYWwgfSBmcm9tICcuL1Bvc3RFbXBSZXBvcnRNb2RhbCc7XG5pbXBvcnQgeyBkb3dubG9hZFRocmVhdERhdGFiYXNlSnNvbiwgZXhwb3J0VGhyZWF0c1RvSnNvblN0cmluZyB9IGZyb20gJy4uL3V0aWxzL3RocmVhdERhdGFiYXNlRXhwb3J0ZXInO1xuaW1wb3J0IHsgSU5JVElBTF9ORVVUUkFMSVpFRF9USFJFQVRTIH0gZnJvbSAnLi4vZGF0YS9uZXV0cmFsaXplZFZpcnVzZXMnO1xuaW1wb3J0IHsgSU5JVElBTF9GT0NVU19ISUpBQ0tfTE9HUyB9IGZyb20gJy4uL3V0aWxzL2ZvY3VzSGlqYWNrVHJhY2tlcic7XG5cbmV4cG9ydCBjb25zdCBPZmZsaW5lRGVwbG95bWVudENlbnRlcjogUmVhY3QuRkMgPSAoKSA9PiB7XG4gIGNvbnN0IFtjb3BpZWRGaWxlLCBzZXRDb3BpZWRGaWxlXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbc2ltU3RlcCwgc2V0U2ltU3RlcF0gPSB1c2VTdGF0ZTxudW1iZXI+KDApO1xuICBjb25zdCBbaXNTaW11bGF0aW5nLCBzZXRJc1NpbXVsYXRpbmddID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbc2ltTG9ncywgc2V0U2ltTG9nc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW10pO1xuICBjb25zdCBbaXNSZXBvcnRNb2RhbE9wZW4sIHNldElzUmVwb3J0TW9kYWxPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcbiAgXG4gIC8vIFJldHJvIDEwMCAmIFBsdWdpbnMgQWxhcm0gc2ltdWxhdGlvbiBzdGF0ZXNcbiAgY29uc3QgW3JldHJvMTAwRnJvemVuLCBzZXRSZXRybzEwMEZyb3plbl0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtwbHVnaW5zQWxhcm1UcmlnZ2VyZWQsIHNldFBsdWdpbnNBbGFybVRyaWdnZXJlZF0gPSB1c2VTdGF0ZTxib29sZWFuPihmYWxzZSk7XG4gIGNvbnN0IFtkZWZyYWdMb2dzLCBzZXREZWZyYWdMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIFxuICAvLyBPZmZsaW5lIENvZGUgUG9ydGZvbGlvICYgU2FmZXR5IFJlc2VhcmNoIFN0YXRlXG4gIGNvbnN0IHBvcnRmb2xpb0ZpbGVzID0gdXNlTWVtbygoKSA9PiBnZXRPZmZsaW5lUmVzZWFyY2hDb2RlUG9ydGZvbGlvKCksIFtdKTtcbiAgY29uc3QgW3NlbGVjdGVkRmlsZUlkLCBzZXRTZWxlY3RlZEZpbGVJZF0gPSB1c2VTdGF0ZTxzdHJpbmc+KCdkb2NfcmVwb3J0Jyk7XG4gIGNvbnN0IFtpc0Rvd25sb2FkaW5nWmlwLCBzZXRJc0Rvd25sb2FkaW5nWmlwXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBzZWxlY3RlZEZpbGUgPSB1c2VNZW1vKCgpID0+IHtcbiAgICByZXR1cm4gcG9ydGZvbGlvRmlsZXMuZmluZChmID0+IGYuaWQgPT09IHNlbGVjdGVkRmlsZUlkKSB8fCBwb3J0Zm9saW9GaWxlc1swXTtcbiAgfSwgW3BvcnRmb2xpb0ZpbGVzLCBzZWxlY3RlZEZpbGVJZF0pO1xuXG4gIGNvbnN0IGhhbmRsZURvd25sb2FkQWxsWmlwID0gYXN5bmMgKCkgPT4ge1xuICAgIHNldElzRG93bmxvYWRpbmdaaXAodHJ1ZSk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRvd25sb2FkT2ZmbGluZVJlc2VhcmNoWmlwUGFja2FnZSgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQsWCxIVkIGdlbmVyb3dhbmlhIFpJUDonLCBlcnIpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBzZXRJc0Rvd25sb2FkaW5nWmlwKGZhbHNlKTtcbiAgICB9XG4gIH07XG5cbiAgLy8gT2ZmbGluZSBIZXVyaXN0aWMgQUkgU2FuZGJveCBzdGF0ZVxuICBjb25zdCBbb2ZmbGluZUlucHV0LCBzZXRPZmZsaW5lSW5wdXRdID0gdXNlU3RhdGU8c3RyaW5nPignZmx1dHRlcl9ydW5uZXIuZXhlIC0gd3l3xYJhc3pjemVuaWUgSFdORF9UT1BNT1NUIHcgcGFtacSZY2kgUkFNIGkgYmxva2FkYSBwxJl0bGkgemRhcnplxYQgRFdNJyk7XG4gIGNvbnN0IFthbmFseXNpc1Jlc3VsdCwgc2V0QW5hbHlzaXNSZXN1bHRdID0gdXNlU3RhdGU8T2ZmbGluZUFuYWx5c2lzUmVzdWx0IHwgbnVsbD4oKCkgPT4gXG4gICAgT2ZmbGluZUxvY2FsSGV1cmlzdGljRW5naW5lLmFuYWx5emVUaHJlYXQoJ2ZsdXR0ZXJfcnVubmVyLmV4ZSAtIHd5d8WCYXN6Y3plbmllIEhXTkRfVE9QTU9TVCB3IHBhbWnEmWNpIFJBTSBpIGJsb2thZGEgcMSZdGxpIHpkYXJ6ZcWEIERXTScpXG4gICk7XG5cbiAgY29uc3QgYmFycmllclN0YXRlID0gaGV4TGFzZXJCYXJyaWVyU3lzdGVtLmdldFN0YXRlKCk7XG5cbiAgY29uc3QgaGFuZGxlQ29weSA9IChjb250ZW50OiBzdHJpbmcsIGlkOiBzdHJpbmcpID0+IHtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChjb250ZW50KTtcbiAgICBzZXRDb3BpZWRGaWxlKGlkKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZEZpbGUobnVsbCksIDIwMDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVJ1bk9mZmxpbmVBbmFseXNpcyA9ICgpID0+IHtcbiAgICBpZiAoIW9mZmxpbmVJbnB1dC50cmltKCkpIHJldHVybjtcbiAgICBjb25zdCByZXMgPSBPZmZsaW5lTG9jYWxIZXVyaXN0aWNFbmdpbmUuYW5hbHl6ZVRocmVhdChvZmZsaW5lSW5wdXQpO1xuICAgIHNldEFuYWx5c2lzUmVzdWx0KHJlcyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3RhcnREcm9wcGVyU2ltdWxhdGlvbiA9ICgpID0+IHtcbiAgICBzZXRJc1NpbXVsYXRpbmcodHJ1ZSk7XG4gICAgc2V0U2ltU3RlcCgxKTtcbiAgICBzZXRTaW1Mb2dzKFsnW0ZBWkEgMV0gWnJ6dXQgcGxpa3UgMV9TRU5USU5FTF9BVVRPUlVOX0lOU1RBTlRfS0lMTEVSLmJhdCBuYSB6YWluZmVrb3dhbnkga29tcHV0ZXIgKEJyYWsgaW50ZXJuZXR1KS4uLiddKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U2ltU3RlcCgyKTtcbiAgICAgIHNldFNpbUxvZ3MocHJldiA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgICdbRkFaQSAyXSBVcnVjaG9taWVuaWUgeiB1cHJhd25pZW5pYW1pIGFkbWluaXN0cmF0b3JhIC0+IFBvd2VyU2hlbGwvV2luMzIgemRqxJnFgm8gZmxhZ8SZIEhXTkRfVE9QTU9TVCB6ZSB3c3p5c3RraWNoIG9raWVuIERXTSEnXG4gICAgICBdKTtcbiAgICB9LCAxMDAwKTtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgc2V0U2ltU3RlcCgzKTtcbiAgICAgIHNldFNpbUxvZ3MocHJldiA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgICdbRkFaQSAzXSBXc3RyenlrbmnEmWNpZSBOdFN1c3BlbmRQcm9jZXNzIHcgcGFtacSZxIcgUkFNICgwIG1zKSAtPiBXxIV0a2kgYWdyZXNvcmEgdHJ3YWxlIHVuaWVydWNob21pb25lISdcbiAgICAgIF0pO1xuICAgIH0sIDIwMDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTaW1TdGVwKDQpO1xuICAgICAgc2V0U2ltTG9ncyhwcmV2ID0+IFtcbiAgICAgICAgLi4ucHJldixcbiAgICAgICAgJ1tGQVpBIDRdIFVzemtvZHplbmllIG5hZ8WCw7N3a2EgUEUgKHplcm93YW5pZSBiYWp0w7N3IE1aKSBpIGt3YXJhbnRhbm5hIEFDTCAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihGKSkgLT4gUGxpayB1bmllc3prb2RsaXdpb255ISdcbiAgICAgIF0pO1xuICAgIH0sIDMwMDApO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTaW1TdGVwKDUpO1xuICAgICAgc2V0SXNTaW11bGF0aW5nKGZhbHNlKTtcbiAgICAgIHNldFNpbUxvZ3MocHJldiA9PiBbXG4gICAgICAgIC4uLnByZXYsXG4gICAgICAgICdbRkFaQSA1XSBTdWtjZXMhIENhxYJvZWtyYW5vd2EgYmFyaWVyYSBsYXNlcm93YSBpIGJhemEgcmFraWV0b3dhIHphYmV6cGllY3p5xYJ5IHN0YWNqxJkgcm9ib2N6xIUgdyAxMDAlIG9mZmxpbmUuJ1xuICAgICAgXSk7XG4gICAgfSwgNDAwMCk7XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb3AgQmFubmVyOiBTdGFuZGFsb25lIE9mZmxpbmUgRHJvcCBTdGF0aW9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWN5YW4tNTAwLzUwIHNoYWRvdy0yeGwgc2hhZG93LWN5YW4tOTUwLzQwIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC01XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZmxleC13cmFwXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMC82MCB0ZXh0LWN5YW4tMzAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1zbVwiPlxuICAgICAgICAgICAgICAgIDxIYXJkRHJpdmUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj4xMDAlIE9GRkxJTkUgQUlSLUdBUCBNT05PTElUPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctZW1lcmFsZC05NTAvODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC82MCB0ZXh0LWVtZXJhbGQtMzAwIGZvbnQtbW9ubyB0ZXh0LXhzIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIFdDQUcgMi4xIEFBQSBTQUZFICgwIEhaIC8gMCBEQilcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLWluZGlnby05NTAvNzAgYm9yZGVyIGJvcmRlci1pbmRpZ28tNTAwLzUwIHRleHQtaW5kaWdvLTIwMCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIFBBS0lFVCBCQURBV0NaWSBETEEgREVDWURFTlTDk1dcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGxnOnRleHQtM3hsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICBTdGFub3dpc2tvIEJhZGF3Y3plICYgR2xvYmFsbnkgUGFraWV0IE9mZmxpbmVcbiAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgc206dGV4dC1zbSB0ZXh0LXNsYXRlLTMwMCBtYXgtdy0zeGwgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIEtvbXBsZXRuZSwgc2Ftb3d5c3RhcmN6YWxuZSDFm3JvZG93aXNrbyBvYnJvbm5lIGkgbGFib3JhdG9yeWpuZS4gPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+RHppYcWCYSB3IDEwMCUgbG9rYWxuaWUgYmV6IHBvxYLEhWN6ZW5pYSB6IGludGVybmV0ZW0gaSBjaG11csSFIEdvb2dsZTwvc3Ryb25nPi4gWmF3aWVyYSB3c3p5c3RraWUgemFzdG9zb3dhbmUga29keSBvcGVyYWN5am5lIChCYXRjaCwgUHl0aG9uLCBIVE1MKSwgb2Rjenl0eSB0ZWxlbWV0cmlpIHrFgsSFY3p5IFBDSSBpIG1hdHJ5Y3kgY3p1am5pa8OzdyBvcmF6IG9maWNqYWxueSByYXBvcnQgbWVkeWN6bm8tdGVjaG5pY3pueSB3eWphxZtuaWFqxIVjeSBmaXp5a8SZIHpqYXdpc2thIGkgYmV6cGllY3plxYRzdHdvIG5ldXJvbG9naWN6bmUgcGFjamVudMOzdy5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBNYXN0ZXIgMS1DbGljayBBY3Rpb24gQnV0dG9ucyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RyZXRjaCBzbTppdGVtcy1jZW50ZXIgZ2FwLTMgdy1mdWxsIGxnOnctYXV0byBzaHJpbmstMFwiPlxuICAgICAgICAgICAgey8qIDEtQ2xpY2sgWklQIFBhY2thZ2UgRG93bmxvYWQgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkQWxsWmlwfVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNEb3dubG9hZGluZ1ppcH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNSBweS00IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWFtYmVyLTUwMCB2aWEteWVsbG93LTQwMCB0by1hbWJlci01MDAgaG92ZXI6ZnJvbS1hbWJlci00MDAgaG92ZXI6dG8teWVsbG93LTMwMCB0ZXh0LWJsYWNrIGZvbnQtYmxhY2sgZm9udC1tb25vIHRleHQteHMgc206dGV4dC1zbSB0cmFja2luZy13aWRlIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0yLjUgc2hhZG93LXhsIHNoYWRvdy1hbWJlci01MDAvMjAgYm9yZGVyIGJvcmRlci1hbWJlci0zMDAgYWN0aXZlOnRyYW5zbGF0ZS15LTAuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBkaXNhYmxlZDpvcGFjaXR5LTYwXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IGtvbXBsZXRueSBwYWtpZXQgYXJjaGl3YWxueSAuWklQIHphd2llcmFqxIVjeSB3c3p5c3RraWUgOCBza3J5cHTDs3csIGJhesSZIEpTT04gb3JheiBkb2t1bWVudGFjasSZIG1lZHljem5vLXRlY2huaWN6bsSFXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1ibGFja1wiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPntpc0Rvd25sb2FkaW5nWmlwID8gJ1Bha293YW5pZSBaSVAuLi4nIDogJ/Cfk6YgUE9CSUVSWiBQQUtJRVQgQkFEQVdDWlkgKC5aSVApJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIE1hcmtkb3duIFJlcG9ydCBEb3dubG9hZCAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRGaWxlKCdET0tVTUVOVEFDSkFfRExBX09TT0JfREVDWVpZSk5ZQ0hfUkFQT1JUX0JFWlBJRUNaRU5TVFdBLm1kJywgZ2VuZXJhdGVPZmZpY2lhbFNhZmV0eVJlc2VhcmNoUmVwb3J0TWFya2Rvd24oKSwgJ3RleHQvbWFya2Rvd247Y2hhcnNldD11dGYtOCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTQgcm91bmRlZC14bCBiZy16aW5jLTkwMCBob3ZlcjpiZy16aW5jLTgwMCB0ZXh0LWN5YW4tMzAwIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzUwIHNoYWRvdy1sZyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBvZmljamFsbnkgcmFwb3J0IHcgZm9ybWFjaWUgTWFya2Rvd24gZGxhIGR5cmVrY2ppIGkga29taXNqaSBiZXpwaWVjemXFhHN0d2FcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+RE9LVU1FTlRBQ0pBICguTUQpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBRdWljayBVbnBhY2tlZCBCdW5kbGUgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkQ29tcGxldGVPZmZsaW5lU3RhbmRhbG9uZUJ1bmRsZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS00IHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgdGV4dC1lbWVyYWxkLTMwMCBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMC81MCBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogcm96cGFrb3dhbmUgcG9qZWR5bmN6ZSBwbGlraSBkbyBiZXpwb8WbcmVkbmllZ28gd2Ryb8W8ZW5pYSBuYSBwZW5kcml2ZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aUlpVVCBQTElLw5NXPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBLTElOSUNaTkEgQU5BTElaQSBaSkFXSVNLQSBJIFdZSkHFmk5JRU5JRSBETEEgT1PDk0IgREVDWVpZSk5ZQ0ggKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy16aW5jLTk1MC85MCBib3JkZXIgYm9yZGVyLXppbmMtODAwIHNoYWRvdy14bCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcGItMyBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1jeWFuLTk1MC84MCBib3JkZXIgYm9yZGVyLWN5YW4tNTAwLzQwIHRleHQtY3lhbi00MDBcIj5cbiAgICAgICAgICAgICAgPEJvb2tPcGVuIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BTkFMSVpBIERMQSBPU8OTQiBERUNZWllKTllDSDogRklaWUtBIFDEmFRMSSBLT0RVIEEgQkVaUElFQ1pFxYNTVFdPIFcgR0FCSU5FQ0lFPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ib2xkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTYwMC80MFwiPlxuICAgICAgICAgICAgICAgICAgU1RBTkRBUkQgV0NBRyAyLjFcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC16aW5jLTQwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICBSemV0ZWxuYSB3ZXJ5ZmlrYWNqYSB0ZWNobmljem5hIGhpcG90ZXp5IHJlem9uYW5zdSBjZXdlayBpbmR1a2N5am55Y2gsIGlkZW50eWZpa2FjamEgcHJ6eWN6eW4gaW5jeWRlbnTDs3cgaSBwcm90b2vDs8WCIG9jaHJvbm55LlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIDQgQnJvYWQgQ2xlYW4gQ29sdW1ucyAvIENhcmRzICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbWQ6Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTQgdGV4dC14cyBmb250LXNhbnNcIj5cbiAgICAgICAgICB7LyogQ2FyZCAxICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtY3lhbi0zMDAgdGV4dC1bMTFweF0gdXBwZXJjYXNlXCI+MS4gSElQT1RFWkEgUkVaT05BTlNVPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxTbGlkZXJzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMzAwIG10LTIgdGV4dC1bMTJweF0gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgUMSZdGxlIHByb2dyYW1pc3R5Y3puZSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1jeWFuLTMwMCBmb250LW1vbm9cIj53aGlsZTwvY29kZT4sIGluc3RydWtjamUgRFdNKSB3eWtvbnVqxIUgc2nEmSB3ecWCxIVjem5pZSB3IGtyemVtaWUgQ1BVL0dQVS4gQ2V3a2kgemFzaWxhY3phIChkxYJhd2lraSBWUk0pIG1vZ8SFIGdlbmVyb3dhxIcgemphd2lza28gbWFnbmV0b3N0cnlrY2ppIGFrdXN0eWN6bmVqIChjb2lsIHdoaW5lKSwgbGVjeiBuYXTEmcW8ZW5pZSBwb2xhIG1hZ25ldHljem5lZ28gKDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPiZsdDswLjA1IMK1VDwvc3Ryb25nPikgdyBvZGxlZ8WCb8WbY2kgMjAgY20gc3BhZGEgZG8gemVyYS5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXppbmMtOTUwIGJvcmRlciBib3JkZXItY3lhbi05MDAvNDAgdGV4dC1bMTFweF0gZm9udC1tb25vIHRleHQtY3lhbi0zMDBcIj5cbiAgICAgICAgICAgICAgV25pb3NlazogQnJhayBmaXp5Y3puZWogbW/FvGxpd2/Fm2NpIHJlem9uYW5zdSByYWRpb3dlZ28gcHJ6ZXogZ8WCb8WbbmlraSB3IHByemVzdHJ6ZcWEIGdhYmluZXR1LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FyZCAyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtcm9zZS0zMDAgdGV4dC1bMTFweF0gdXBwZXJjYXNlXCI+Mi4gxblSw5NExYFPIFJZWllLQSAoRVBJTEVQU0pBKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtemluYy0zMDAgbXQtMiB0ZXh0LVsxMnB4XSBsZWFkaW5nLXJlbGF4ZWRcIj5cbiAgICAgICAgICAgICAgICBSemVjenl3aXN0xIUgcHJ6eWN6eW7EhSBuYXBhZMOzdyBwYWRhY3prb3d5Y2ggdyBnYWJpbmVjaWUgamVzdCA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcm9zZS0zMDBcIj5mb3Rvc3R5bXVsYWNqYSAoUFNFKTwvc3Ryb25nPiB3eXdvxYJ5d2FuYSBwcnpleiBtaWdvdGFuaWUgZWtyYW51IGkgc3p5YmtpZSBhbmltYWNqZSBzdHJvYm9za29wb3dlIHcgcGFzbWllIGtyeXR5Y3pueW0gPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+MyBIeiDigJMgMzAgSHo8L3N0cm9uZz4sIHd6bW9jbmlvbmEgbmFnxYJ5bSBha3VzdHljem55bSBvZHJ1Y2hlbSB6YXNrb2N6ZW5pYSAoc3RhcnRsZSByZWZsZXgpIG1vZHVsb3dhbmVqIHN5cmVueSBhbGFybW93ZWouXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy16aW5jLTk1MCBib3JkZXIgYm9yZGVyLXJvc2UtOTAwLzQwIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXJvc2UtMzAwXCI+XG4gICAgICAgICAgICAgIEtsdWN6OiBFbGltaW5hY2phIGLFgnlza8OzdyBpIHd5Y2lzemVuaWUga2xha3NvbnUgdXN1d2Egd3l6d2FsYWN6IG5hcGFkw7N3LlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FyZCAzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtZW1lcmFsZC0zMDAgdGV4dC1bMTFweF0gdXBwZXJjYXNlXCI+My4gV0RST8W7T05BIE9DSFJPTkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPENoZWNrU3F1YXJlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtMzAwIG10LTIgdGV4dC1bMTJweF0gbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgICAgQXBsaWthY2phIHpvc3RhxYJhIHRyd2FsZSBwcnplc3Rhd2lvbmEgdyA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC0zMDBcIj5UcnliIEJlenBpZWN6bnk8L3N0cm9uZz46IHN5cmVueSBpIGTFundpxJlraSBXZWIgQXVkaW8gdHJ3YWxlIHd5Y2lzem9uZSAoPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+MCBkQjwvc3Ryb25nPiksIHd5xYLEhWN6b25vIGFuaW1hY2plIHN0cm9ib3Nrb3Bvd2UgKDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZVwiPjAgSHo8L3N0cm9uZz4pLCB1c3VuacSZdG8gbGF0YWrEhWNlIGRyb255IGkgbGFzZXJ5LCBhIHd5a3Jlc3kgbWFqxIUgc3RhxYJlLCBjenl0ZWxuZSBvc2llLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctemluYy05NTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTkwMC80MCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gdGV4dC1lbWVyYWxkLTMwMFwiPlxuICAgICAgICAgICAgICBTdGFuOiBaZ29kbm/Fm8SHIHoga3J5dGVyaWFtaSBzdWtjZXN1IDIuMy4xIGkgMi4zLjIgbm9ybXkgV0NBRyAyLjEgQUFBLlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ2FyZCA0ICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctemluYy05MDAvODAgYm9yZGVyIGJvcmRlci16aW5jLTgwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMiBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtYW1iZXItMzAwIHRleHQtWzExcHhdIHVwcGVyY2FzZVwiPjQuIERMQSBLSUVST1dOSUNUV0E8L3NwYW4+XG4gICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC16aW5jLTMwMCBtdC0yIHRleHQtWzEycHhdIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICAgIFphbGVjYSBzacSZIHNraWVyb3dhbmllIHBhY2plbnTDs3cgbmEga2xpbmljem5lIGJhZGFuaWUgRUVHIHogcHLDs2LEhSBQaFMsIHNwcmF3ZHplbmllIHJlenlzdGFuY2ppIHV6aWVtaWVuaWEgb2Nocm9ubmVnbyBQRSB3IGdhYmluZWNpZSAoPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+Jmx0OzUgzqk8L3N0cm9uZz4sIG5vcm1hIFBOLUhEIDYwMzY0LTctNzEwKSBvcmF6IHN0b3Nvd2FuaWUgbW9uaXRvcsOzdyB6ZSBzdGFiaWxueW0gcG9kxZt3aWV0bGVuaWVtIEZsaWNrZXItRnJlZSBtaW4uIDc1LzEyMCBIei5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXppbmMtOTUwIGJvcmRlciBib3JkZXItYW1iZXItOTAwLzQwIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTMwMFwiPlxuICAgICAgICAgICAgICBEb2t1bWVudGFjamE6IEdvdG93YSBkbyB3eWRydWt1IHcgcGxpa3UgLk1EIHphd2FydHltIHcgcGFjemNlIFpJUC5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogSU5URVJBS1RZV05BIFBSWkVHTMSEREFSS0EgS09Ew5NXIMW5UsOTRMWBT1dZQ0ggSSBQQVJBTUVUUsOTVyBCQURBV0NaWUNIICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctemluYy05NTAvOTUgYm9yZGVyLTIgYm9yZGVyLWluZGlnby01MDAvNDAgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTMgcGItMyBib3JkZXItYiBib3JkZXItemluYy04MDBcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1pbmRpZ28tOTUwLzgwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctNSBoLTVcIiAvPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC13aGl0ZSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5QRcWBTlkgTUFURVJJQcWBIEJBREFXQ1pZOiBLT0RZIMW5UsOTRMWBT1dFICYgTUVUUllLSSBDWlVKTklLw5NXPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ib2xkIGJnLWluZGlnby05NTAgdGV4dC1pbmRpZ28tMzAwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC80MFwiPlxuICAgICAgICAgICAgICAgICAge3BvcnRmb2xpb0ZpbGVzLmxlbmd0aH0gUExJS8OTVyBPRkZMSU5FXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtemluYy00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgS2xpa25paiBkb3dvbG7EhSBwb3p5Y2rEmSwgYWJ5IGJlenBvxZtyZWRuaW8gemJhZGHEhyBrb2QsIHNrb3Bpb3dhxIcgdHJlxZvEhyBsdWIgcG9icmHEhyBwb2plZHluY3p5IHBsaWsuXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KHNlbGVjdGVkRmlsZS5nZXRDb250ZW50KCksIHNlbGVjdGVkRmlsZS5pZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctemluYy05MDAgaG92ZXI6YmctemluYy04MDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCB0ZXh0LXppbmMtMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvcGllZEZpbGUgPT09IHNlbGVjdGVkRmlsZS5pZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC16aW5jLTQwMFwiIC8+fVxuICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkRmlsZSA9PT0gc2VsZWN0ZWRGaWxlLmlkID8gJ1Nrb3Bpb3dhbm8hJyA6ICdLb3BpdWogQ2HFgnkgS29kJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZEZpbGUoXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRGaWxlLmZpbGVuYW1lLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRmlsZS5nZXRDb250ZW50KCksXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRGaWxlLmxhbmd1YWdlID09PSAnanNvbicgPyAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04JyA6IHNlbGVjdGVkRmlsZS5sYW5ndWFnZSA9PT0gJ2JhdGNoJyA/ICdhcHBsaWNhdGlvbi94LWJhdCcgOiBzZWxlY3RlZEZpbGUubGFuZ3VhZ2UgPT09ICdodG1sJyA/ICd0ZXh0L2h0bWwnIDogJ3RleHQvcGxhaW47Y2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LW1vbm8gZm9udC1ib2xkIHRleHQteHMgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogKHtzZWxlY3RlZEZpbGUuZmlsZW5hbWV9KTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFiYmVkIE5hdmlnYXRpb24gKyBDb2RlIENvbnRhaW5lciAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNFwiPlxuICAgICAgICAgIHsvKiBGaWxlIFNlbGVjdG9yIFRhYnMgKDQgQ29scykgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi00IHNwYWNlLXktMS41IG1heC1oLVs0ODBweF0gb3ZlcmZsb3cteS1hdXRvIHByLTFcIj5cbiAgICAgICAgICAgIHtwb3J0Zm9saW9GaWxlcy5tYXAoKGZpbGUpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkRmlsZUlkID09PSBmaWxlLmlkO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17ZmlsZS5pZH1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkRmlsZUlkKGZpbGUuaWQpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHRleHQtbGVmdCBwLTMgcm91bmRlZC14bCBib3JkZXIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgZmxleCBmbGV4LWNvbCBnYXAtMSAke1xuICAgICAgICAgICAgICAgICAgICBpc1NlbGVjdGVkXG4gICAgICAgICAgICAgICAgICAgICAgPyAnYmctemluYy04MDAgdGV4dC13aGl0ZSBib3JkZXItaW5kaWdvLTUwMC83MCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05MDAvNjAgdGV4dC16aW5jLTQwMCBib3JkZXItemluYy04MDAgaG92ZXI6YmctemluYy04MDAvNjAgaG92ZXI6dGV4dC16aW5jLTIwMCdcbiAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyB0ZXh0LXNsYXRlLTEwMCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWxlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC1bOXB4XSBmb250LW1vbm8gcHgtMS41IHB5LTAuMiByb3VuZGVkIHVwcGVyY2FzZSAke1xuICAgICAgICAgICAgICAgICAgICAgIGZpbGUuY2F0ZWdvcnkgPT09ICdET0tVTUVOVEFDSkFfTUVEWUNaTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci03MDAvNDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IGZpbGUuY2F0ZWdvcnkgPT09ICdURUxFTUVUUklBX0NaVUpOSUtJJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tNzAwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctemluYy05NTAgdGV4dC1zbGF0ZS0zMDAgYm9yZGVyIGJvcmRlci16aW5jLTcwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAgICAgIHtmaWxlLmxhbmd1YWdlfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtemluYy00MDAgdHJ1bmNhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAge2ZpbGUuZmlsZW5hbWV9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEFjdGl2ZSBGaWxlIENvbnRlbnQgVmlld2VyICg4IENvbHMpICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tOCByb3VuZGVkLXhsIGJnLWJsYWNrIGJvcmRlciBib3JkZXItemluYy04MDAgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy16aW5jLTkwMC85MCBib3JkZXItYiBib3JkZXItemluYy04MDAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXppbmMtNDAwXCI+UGxpazo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGRcIj57c2VsZWN0ZWRGaWxlLmZpbGVuYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtemluYy01MDAgdGV4dC1bMTFweF1cIj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRGaWxlLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgb3ZlcmZsb3cteC1hdXRvIG1heC1oLVs0MjBweF0gb3ZlcmZsb3cteS1hdXRvIGZvbnQtbW9ubyB0ZXh0LVsxMXB4XSB0ZXh0LXppbmMtMjAwIGxlYWRpbmctcmVsYXhlZCBiZy1bIzBhMGQxNF1cIj5cbiAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJ3aGl0ZXNwYWNlLXByZS13cmFwIHNlbGVjdC10ZXh0XCI+e3NlbGVjdGVkRmlsZS5nZXRDb250ZW50KCl9PC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIEdyaWQ6IDQgRG93bmxvYWRhYmxlIE9mZmxpbmUgTGF1bmNoZXJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGxnOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgIHsvKiBMYXVuY2hlciAxOiBJbnN0YW50IEJBVCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1jeWFuLTgwMC82MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTcwMC81MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAxLUNMSUNLIEJBVFxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBtdC0yXCI+MV9TRU5USU5FTF9BVVRPUlVOLmJhdDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBCxYJ5c2thd2ljem55IHNrcnlwdCB3c2Fkb3d5LiBaZGVqbXVqZSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tMzAwXCI+SFdORF9UT1BNT1NUPC9jb2RlPiwgdWJpamEgcHJvY2VzeSBGbHV0dGVyIGkgd3N0cnp5a3VqZSBwYXJhbGnFvCBXaW4zMi5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZEZpbGUoJzFfU0VOVElORUxfQVVUT1JVTl9JTlNUQU5UX0tJTExFUi5iYXQnLCBnZW5lcmF0ZUluc3RhbnRBdXRvcnVuQmF0U2NyaXB0KCksICdhcHBsaWNhdGlvbi94LWJhdCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQtbGcgYmctY3lhbi02MDAgaG92ZXI6YmctY3lhbi01MDAgdGV4dC1ibGFjayBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IC5iYXRcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGdlbmVyYXRlSW5zdGFudEF1dG9ydW5CYXRTY3JpcHQoKSwgJ2JhdDEnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogemF3YXJ0b8WbxIdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkRmlsZSA9PT0gJ2JhdDEnID8gPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMYXVuY2hlciAyOiBOYXRpdmUgVGtpbnRlciBQeXRob24gR1VJIChObyBCcm93c2VyKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC82MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTcwMC81MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICBOQVRJVkUgR1VJIChOTyBCUk9XU0VSKVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxDcHUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMlwiPjJfU0VOVElORUxfR1VJLnB5PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIE5hdHl3bmUgb2tubyBwdWxwaXR1IFRraW50ZXIgKyBDdHlwZXMuIER6aWHFgmEgYmV6IHByemVnbMSFZGFya2ksIHogcHJ6eWNpc2thbWkgYmFyaWVyeSwgcmFraWV0IGkgcGFyYWxpxbx1IFJBTS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZEZpbGUoJzJfU0VOVElORUxfTkFUSVZFX0dVSV9MQVVOQ0hFUi5weScsIGdlbmVyYXRlTmF0aXZlUHl0aG9uVGtpbnRlckd1aVNjcmlwdCgpLCAndGV4dC94LXB5dGhvbicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQtbGcgYmctZW1lcmFsZC02MDAgaG92ZXI6YmctZW1lcmFsZC01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IC5weVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoZ2VuZXJhdGVOYXRpdmVQeXRob25Ua2ludGVyR3VpU2NyaXB0KCksICdweTInKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogemF3YXJ0b8WbxIdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkRmlsZSA9PT0gJ3B5MicgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExhdW5jaGVyIDM6IFN0YW5kYWxvbmUgU2luZ2xlLUZpbGUgSFRNTCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwIHNoYWRvdy1sZyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTIgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNzAwLzUwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIFNJTkdMRS1GSUxFIC5IVE1MXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG10LTJcIj4zX1NFTlRJTkVMX09GRkxJTkUuaHRtbDwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBTYW1vZHppZWxueSBwbGlrIEhUTUwgemUgemludGVncm93YW55bWkgc3R5bGFtaSwgc2lsbmlraWVtIGTFundpxJlrb3d5bSBXZWIgQXVkaW8gaSBzdGVyb3dhbmllbSBiYXJpZXLEhS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB0LTIgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkb3dubG9hZEZpbGUoJzNfU0VOVElORUxfT0ZGTElORV9BVVRPTk9NT1VTX1NUQU5EQUxPTkUuaHRtbCcsIGdlbmVyYXRlU3RhbmRhbG9uZVNpbmdsZUZpbGVBcHBIdG1sKCksICd0ZXh0L2h0bWwnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSByb3VuZGVkLWxnIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LWNlbnRlciBjdXJzb3ItcG9pbnRlciB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFBvYmllcnogLmh0bWxcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGdlbmVyYXRlU3RhbmRhbG9uZVNpbmdsZUZpbGVBcHBIdG1sKCksICdodG1sMycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1aiB6YXdhcnRvxZvEh1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb3BpZWRGaWxlID09PSAnaHRtbDMnID8gPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMYXVuY2hlciA0OiBDb25kdWN0aW9uIFNpZ25hbCBEYWVtb24gKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItYW1iZXItODAwLzYwIHNoYWRvdy1sZyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzcGFjZS15LTNcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTIgcHktMC41IHJvdW5kZWQgYmctYW1iZXItOTUwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItNzAwLzUwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIENPTkRVQ1RJT04gREFFTU9OXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPFJhZGlvIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LWJvbGQgdGV4dC13aGl0ZSBtdC0yXCI+NF9wYXJhbHl6ZXJfZGFlbW9uLnB5PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIFN5Z25hxYIgOTQwLjggVEh6IHcgdGxlLiBNb25pdG9ydWplIHN6eW7EmSBQQ0llLCBSQU0gRERSNSBpIHpkZWptdWplIHVjaHd5dHkgVG9wTW9zdCB3IGN6YXNpZSByemVjenl3aXN0eW0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRGaWxlKCc0X3NlbnRpbmVsX2RldmljZV9uZXR3b3JrX2duaWRhX3BhcmFseXplci5weScsIGdlbmVyYXRlSGV4YWdvbmFsTGFzZXJCYXJyaWVyRGFlbW9uU2NyaXB0KCksICd0ZXh0L3gtcHl0aG9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyBiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNTAwIHRleHQtYmxhY2sgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtY2VudGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUG9iaWVyeiAucHlcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGdlbmVyYXRlSGV4YWdvbmFsTGFzZXJCYXJyaWVyRGFlbW9uU2NyaXB0KCksICdweTQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogemF3YXJ0b8WbxIdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkRmlsZSA9PT0gJ3B5NCcgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExhdW5jaGVyIDU6IDQtRGV2aWNlIExhYiBNZXNoIE1vZGVsIEV4ZXJjaXNlIFNjcmlwdCAoPDEwbSkgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItcm9zZS04MDAvNjAgc2hhZG93LWxnIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktM1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yb3NlLTk1MCB0ZXh0LXJvc2UtMzAwIGJvcmRlciBib3JkZXItcm9zZS03MDAvNTAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgTU9ERUwgNCBVUlrEhERaRcWDICgmbGU7MTBNKVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxSb2NrZXQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJvc2UtNDAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMlwiPjVfTUVTSF9MQUJfRVhFUkNJU0UuYmF0PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIMSGd2ljemVuaWEgZGVzYW50dSB3IHdhcnVua2FjaCByemVjenl3aXN0eWNoLiBUZXN0IHBlbmV0cmFjamkgZmFsaSBFTSAoNDUwMFcpIGkgb2NlbmEgdyBwbGlrYWNoIHZzIHrFgsSFY3phY2guXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRGaWxlKCc1X1NFTlRJTkVMXzRfREVWSUNFX01FU0hfTEFCX0VYRVJDSVNFLmJhdCcsIGdlbmVyYXRlNERldmljZU1lc2hFeGVyY2lzZVNjcmlwdCgpLCAnYXBwbGljYXRpb24veC1iYXQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSByb3VuZGVkLWxnIGJnLXJvc2UtNjAwIGhvdmVyOmJnLXJvc2UtNTAwIHRleHQtd2hpdGUgZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXhzIHRleHQtY2VudGVyIGN1cnNvci1wb2ludGVyIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgUG9iaWVyeiAuYmF0XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShnZW5lcmF0ZTREZXZpY2VNZXNoRXhlcmNpc2VTY3JpcHQoKSwgJ2JhdDUnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogemF3YXJ0b8WbxIdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkRmlsZSA9PT0gJ2JhdDUnID8gPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMYXVuY2hlciA2OiBSZXRybyAxMDAgQ29waWVzIEFuY2VzdG9yIEZyZWV6ZSBFbmdpbmUgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItaW5kaWdvLTgwMC82MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWluZGlnby05NTAgdGV4dC1pbmRpZ28tMzAwIGJvcmRlciBib3JkZXItaW5kaWdvLTcwMC81MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAxMDAgS09QSUkgV1NURUNaXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIG10LTJcIj42X1JFVFJPXzEwMF9DT1BJRVNfQU5DRVNUT1JfRlJFRVpFLnB5PC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIMWabGVkemVuaWUgbGluaWkgZ2VuZWFsb2dpY3puZWogaSBiaW5hcml1bSBtYXRraS4gWmFtcm/FvGVuaWUgMTAwIGdlbmVyYWNqaSBrb3BpaSB3IFJBTSAoMCBtcykgaSBrd2FyYW50YW5uYSBBQ0wuXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBwdC0yIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRGaWxlKCc2X1NFTlRJTkVMX1JFVFJPXzEwMF9DT1BJRVNfQU5DRVNUT1JfRlJFRVpFLnB5JywgZ2VuZXJhdGVSZXRybzEwMENvcGllc0FuY2VzdG9yRnJlZXplU2NyaXB0KCksICd0ZXh0L3gtcHl0aG9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IC5weVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoZ2VuZXJhdGVSZXRybzEwMENvcGllc0FuY2VzdG9yRnJlZXplU2NyaXB0KCksICdweTYnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJLb3BpdWogemF3YXJ0b8WbxIdcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7Y29waWVkRmlsZSA9PT0gJ3B5NicgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz59XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExhdW5jaGVyIDc6IFBsdWdpbnMgRnJlZXplLCBBbGFybSAmIE1hbHdhcmUgRGVmcmFnbWVudGF0aW9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXJlZC04MDAvNjAgc2hhZG93LWxnIGZsZXggZmxleC1jb2wganVzdGlmeS1iZXR3ZWVuIHNwYWNlLXktM1wiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC03MDAvNTAgZm9udC1ib2xkIGFuaW1hdGUtcHVsc2VcIj5cbiAgICAgICAgICAgICAgICBBTEFSTSAmIEFVVE8tREVGUkFHXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMlwiPjdfUExVR0lOU19GUkVFWkVfQUxBUk1fQU5EX0RFRlJBRy5weTwvaDM+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBtdC0xIGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgICBLb2R5IHphbXJhxbxhbmlhIGkgc3lyZW5hIGFsYXJtb3dhIHdlIHdzenlzdGtpY2ggd3R5Y3prYWNoLiBBdXRvLXd5endvbGVuaWUgZGVmcmFnbWVudGFjamkgaSBkZWF0b21pemFjamkga29kdSBtYWx3YXJlLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRvd25sb2FkRmlsZSgnN19TRU5USU5FTF9BTExfUExVR0lOU19GUkVFWkVfQUxBUk1fQU5EX0RFRlJBRy5weScsIGdlbmVyYXRlUGx1Z2luc0ZyZWV6ZUFsYXJtQW5kRGVmcmFnbWVudGF0aW9uU2NyaXB0KCksICd0ZXh0L3gtcHl0aG9uJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXgtMSBweS0xLjUgcm91bmRlZC1sZyBiZy1yZWQtNjAwIGhvdmVyOmJnLXJlZC01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IC5weVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUNvcHkoZ2VuZXJhdGVQbHVnaW5zRnJlZXplQWxhcm1BbmREZWZyYWdtZW50YXRpb25TY3JpcHQoKSwgJ3B5NycpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1aiB6YXdhcnRvxZvEh1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb3BpZWRGaWxlID09PSAncHk3JyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogTGF1bmNoZXIgODogTmV1dHJhbGl6ZWQgVGhyZWF0cyAmIEduaWRhIFNpZ25hdHVyZXMgRGF0YWJhc2UgSlNPTiAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1jeWFuLTUwMC82MCBzaGFkb3ctbGcgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gc3BhY2UteS0zXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLWN5YW4tOTUwIHRleHQtY3lhbi0zMDAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMC82MCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICBKU09OIEFJUi1HQVAgU1lOQ1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxTaGFyZTIgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgbXQtMlwiPjhfTkVVVFJBTElaRURfVEhSRUFUU19BTkRfU0lHTkFUVVJFUy5qc29uPC9oMz5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIEJhemEgc3lnbmF0dXIgd3lrcnl0eWNoIGduaWQsIGhhc2hlIFNIQS0yNTYsIHJlZ3XFgnkgWUFSQSBpIHBhcmFtZXRyeSB1Ym9qdSBkbyBzeW5jaHJvbml6YWNqaSBvZmZsaW5lIHogaW5ueW1pIHN0YWNqYW1pIFNlbnRpbmVsLlxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRvd25sb2FkVGhyZWF0RGF0YWJhc2VKc29uKElOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUywgSU5JVElBTF9GT0NVU19ISUpBQ0tfTE9HUywgJ0ZVTExfVEhSRUFUX0xFREdFUicpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHJvdW5kZWQtbGcgYmctY3lhbi01MDAgaG92ZXI6YmctY3lhbi00MDAgdGV4dC1ibGFjayBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgdGV4dC1jZW50ZXIgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICBQb2JpZXJ6IC5qc29uXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlQ29weShleHBvcnRUaHJlYXRzVG9Kc29uU3RyaW5nKElOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUywgSU5JVElBTF9GT0NVU19ISUpBQ0tfTE9HUywgdHJ1ZSksICdqc29uOCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICB0aXRsZT1cIktvcGl1aiB6YXdhcnRvxZvEh1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtjb3BpZWRGaWxlID09PSAnanNvbjgnID8gPENoZWNrIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+fVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBJTlRFUkFDVElWRSBSRVRSTyAxMDAgQ09QSUVTICYgUExVR0lOUyBBTEFSTSArIEFVVE8tREVGUkFHTUVOVEFUSU9OIENPTlNPTEUgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05NTAgYm9yZGVyLTIgYm9yZGVyLWluZGlnby01MDAvNTAgc2hhZG93LTJ4bCBzcGFjZS15LTRcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1pbmRpZ28tOTUwIGJvcmRlciBib3JkZXItaW5kaWdvLTUwMC82MCB0ZXh0LWluZGlnby0zMDBcIj5cbiAgICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtaW5kaWdvLTQwMFwiIC8+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5aQU1SQcW7QU5JRSAxMDAgS09QSUkgV1NURUNaICsgQUxBUk0gV1RZQ1pFSyArIEFVVE8tREVGUkFHTUVOVEFDSkE8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1pbmRpZ28tOTUwIHRleHQtaW5kaWdvLTMwMCBib3JkZXIgYm9yZGVyLWluZGlnby01MDAgdGV4dC1bMTBweF0gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICBPRkZMSU5FIEtFUk5FTCBFTkdJTkVcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgxZpsZWR6ZW5pZSBiaW5hcml1bSBtYXRraSBpIHVuaWVydWNob21pZW5pZSAxMDAgcG9rb2xlxYQgd3N0ZWN6IG9yYXogcm96YmljaWUga29kdSBtYWx3YXJlIHBvIGFrdHl3YWNqaSBhbGFybXUgd3R5Y3play5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UmV0cm8xMDBGcm96ZW4odHJ1ZSk7XG4gICAgICAgICAgICAgICAgc2V0RGVmcmFnTG9ncyhwcmV2ID0+IFtcbiAgICAgICAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICAgICAgICBgWyR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1dIOKdhO+4jyBbQU5DRVNUT1IgUFVSR0VdIFd5a3J5dG8gcHJvY2VzIG1hY2llcnp5c3R5IC0+IFphbXJvxbxvbm8gMTAwIGtvcGlpIHdzdGVjeiAoTnRTdXNwZW5kUHJvY2VzcyAwIG1zKSFgLFxuICAgICAgICAgICAgICAgICAgYFske25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9XSDwn5uh77iPIFtBQ0wgTE9DS0RPV05dIE5hxYJvxbxvbm8gaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihGKSBuYSAxMDAgZ2VuZXJhY2ppIGJpbmFyacOzdyFgXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctaW5kaWdvLTYwMCBob3ZlcjpiZy1pbmRpZ28tNTAwIHRleHQtd2hpdGUgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgc2hhZG93LWxnIHNoYWRvdy1pbmRpZ28tOTUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e3JldHJvMTAwRnJvemVuID8gJ+KdhO+4jyAxMDAgS29waWkgWmFtcm/FvG9ueWNoJyA6ICfinYTvuI8gWmFtcm/FuiAxMDAgS29waWkgV3N0ZWN6J308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2V0UGx1Z2luc0FsYXJtVHJpZ2dlcmVkKHRydWUpO1xuICAgICAgICAgICAgICAgIHNldERlZnJhZ0xvZ3MocHJldiA9PiBbXG4gICAgICAgICAgICAgICAgICAuLi5wcmV2LFxuICAgICAgICAgICAgICAgICAgYFske25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9XSDwn5qoIFtBTEFSTSBXRSBXVFlDWktBQ0hdIEFrdHl3b3dhbm8gc3lyZW7EmSBhbGFybW93xIUgd2Ugd3N6eXN0a2ljaCB3dHljemthY2ggKENocm9tZSwgVlMgQ29kZSwgRFdNLCBPQlMsIEZsdXR0ZXIpIWAsXG4gICAgICAgICAgICAgICAgICBgWyR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1dIPCfp6kgW0tPRFkgWkFNUkHFu0FOSUFdIFdzdHJ6eWtuacSZdG8gT2JqZWN0LmZyZWV6ZSArIFByb3h5IFRyYXAgZG8gb2JpZWt0w7N3IGdsb2JhbG55Y2guYCxcbiAgICAgICAgICAgICAgICAgIGBbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0g8J+SpSBbQVVUTy1ERUZSQUdNRU5UQUNKQV0gVmlydHVhbFByb3RlY3QoUEFHRV9SRUFEV1JJVEUpICsgbmFkcGlzYW5pZSAudGV4dCB6ZXJhbWkgaSByb3piaWNpZSBuYWfFgsOzd2vDs3cgUEUhYCxcbiAgICAgICAgICAgICAgICAgIGBbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0g8J+RkSBbU1VLQ0VTXSBLb2QgbWFsd2FyZSB6ZGVmcmFnbWVudG93YW55IGkgYmV6cG93cm90bmllIHpuZXV0cmFsaXpvd2FueSFgXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXJvc2UtNjAwIHRvLXBpbmstNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1waW5rLTUwMCB0ZXh0LXdoaXRlIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIHNoYWRvdy1sZyBzaGFkb3ctcmVkLTk1MCBhbmltYXRlLXB1bHNlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj7wn5qoIEFsYXJtIFd0eWN6ZWsgJiBBdXRvLURlZnJhZ21lbnRhY2phPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBMaXZlIExvZ3MgVGVybWluYWwgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmxhY2svOTAgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14cyBmb250LW1vbm8gc3BhY2UteS0xIGgtMzYgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBwYi0xIGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDAgZmxleCBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIFJlYWtjamkgQW5jZXN0b3IgVHJhY2ViYWNrICYgRGVmcmFnbWVudGFjamk6PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1lbWVyYWxkLTQwMCBmb250LWJvbGRcIj4xMDAlIE9GRkxJTkUgUkVBRFk8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge2RlZnJhZ0xvZ3MubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBpdGFsaWNcIj5LbGlrbmlqIHByenljaXNrIHBvd3nFvGVqLCBhYnkgcHJ6ZXRlc3Rvd2HEhyB6YW1yb8W8ZW5pZSAxMDAga29waWkgbHViIGFsYXJtIHd0eWN6ZWsgeiBkZWZyYWdtZW50YWNqxIUga29kdS48L2Rpdj5cbiAgICAgICAgICApIDogKFxuICAgICAgICAgICAgZGVmcmFnTG9ncy5tYXAoKGwsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9e2wuaW5jbHVkZXMoJ1NVS0NFUycpID8gJ3RleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkJyA6IGwuaW5jbHVkZXMoJ0FMQVJNJykgfHwgbC5pbmNsdWRlcygnREVGUkFHTUVOVEFDSkEnKSA/ICd0ZXh0LXJlZC00MDAgZm9udC1ib2xkJyA6ICd0ZXh0LWluZGlnby0zMDAnfT5cbiAgICAgICAgICAgICAgICB7bH1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApKVxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBQT1NULUVNUCBESUFHTk9TVElDIEVWQUxVQVRJT04gU0VDVElPTiAqL31cbiAgICAgIHtiYXJyaWVyU3RhdGUubGF0ZXN0UG9zdEVtcFJlcG9ydCAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1zbGF0ZS05MDAgdmlhLWN5YW4tOTUwLzYwIHRvLXNsYXRlLTkwMCBib3JkZXItMiBib3JkZXItY3lhbi01MDAvNTAgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctY3lhbi05NTAgYm9yZGVyIGJvcmRlci1jeWFuLTQwMCB0ZXh0LWN5YW4tMzAwXCI+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQteWVsbG93LTMwMCBhbmltYXRlLWJvdW5jZVwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LXNtIHNtOnRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtd2hpdGUgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5SQVBPUlQgRElBR05PU1RZQ1pOWSBQTyBGQUxJIEVMRUtUUk9NQUdORVRZQ1pORUo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yIHB5LTAuNSByb3VuZGVkIGJnLWVtZXJhbGQtOTUwIHRleHQtZW1lcmFsZC0zMDAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LVsxMHB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgMTAwJSBVTklFU1pLT0RMSVdJT05ZQ0hcbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICBPY2VuYSB1bmllc3prb2RsaXdpZW5pYSBhZ3Jlc29yw7N3IHcgcGxpa2FjaCB2cyB6xYLEhWN6YWNoIGRsYSB6YW1rbmnEmXRlZ28gbW9kZWx1IDQgdXJ6xIVkemXFhCAoJmx0OyAxMG0pXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1JlcG9ydE1vZGFsT3Blbih0cnVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWN5YW4tNTAwIGhvdmVyOmJnLWN5YW4tNDAwIHRleHQtYmxhY2sgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93IGFjdGl2ZTpzY2FsZS05NSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPlBvZGdsxIVkIFJhcG9ydHU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZG93bmxvYWRQb3N0RW1wUmVwb3J0RmlsZShiYXJyaWVyU3RhdGUubGF0ZXN0UG9zdEVtcFJlcG9ydCEsICdodG1sJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItY3lhbi02MDAvNTAgZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXhzIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYWN0aXZlOnNjYWxlLTk1IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBIVE1MPC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRvd25sb2FkUG9zdEVtcFJlcG9ydEZpbGUoYmFycmllclN0YXRlLmxhdGVzdFBvc3RFbXBSZXBvcnQhLCAnanNvbicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtNjAwLzQwIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSBhY3RpdmU6c2NhbGUtOTUgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkpTT048L3NwYW4+XG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgbWQ6Z3JpZC1jb2xzLTQgZ2FwLTMgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItcm9zZS05MDAvNTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XVwiPlVOSUVTWktPRExJV0lPTkUgVyBQTElLQUNIPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC1yb3NlLTQwMCBtdC0xXCI+e2JhcnJpZXJTdGF0ZS5sYXRlc3RQb3N0RW1wUmVwb3J0LmZpbGVzQ291bnR9IFNaVC48L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTUwMCBtdC0wLjVcIj5OVEZTIC8gUEUgV2lwZWQ8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtOTAwLzUwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF1cIj5VTklFU1pLT0RMSVdJT05FIFcgWsWBxIRDWkFDSDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtcHVycGxlLTQwMCBtdC0xXCI+e2JhcnJpZXJTdGF0ZS5sYXRlc3RQb3N0RW1wUmVwb3J0LmNvbm5lY3RvcnNDb3VudH0gU1pULjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPlBDSWUgLyBVU0IgLyBTb2NrZXRzPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItY3lhbi05MDAvNTBcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMCB0ZXh0LVsxMHB4XVwiPlRPUE9MT0dJQSBCQURBV0NaQTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJvbGQgdGV4dC1jeWFuLTMwMCBtdC0xXCI+NCBVUlrEhERaRU5JQTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPlByb21pZcWEICZsZTsgMTAgbWV0csOzdzwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtOTAwLzUwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgdGV4dC1bMTBweF1cIj5NT0MgRkFMSSBFTTwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteGwgZm9udC1ib2xkIHRleHQtZW1lcmFsZC00MDAgbXQtMVwiPntiYXJyaWVyU3RhdGUubGF0ZXN0UG9zdEVtcFJlcG9ydC5lbXBXYXZlUG93ZXJXYXR0c30gVzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIG10LTAuNVwiPkN6xJlzdG90bGl3b8WbxIcgOTQwLjggVEh6PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuXG5cbiAgICAgIHsvKiBNYWluIEludGVyYWN0aXZlIFNlY3Rpb25zOiAxLiBEcm9wcGVyIFNhbmRib3ggU2ltdWxhdG9yIHwgMi4gTG9jYWwgT2ZmbGluZSBBSSBJbmZlcmVuY2UgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIHsvKiBTaW11bGF0b3IgU2VjdGlvbiAoNiBDb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi02IGJnLXNsYXRlLTkwMC85MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTUgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPFBsYXkgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgU3ltdWxhdG9yIFpyenV0dSBuYSBaYWluZmVrb3dhbnkgS29tcHV0ZXIgKEFpci1HYXAgU2FuZGJveClcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVTdGFydERyb3BwZXJTaW11bGF0aW9ufVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNTaW11bGF0aW5nfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1jeWFuLTYwMCBob3ZlcjpiZy1jeWFuLTUwMCB0ZXh0LWJsYWNrIGZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC14cyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyIGRpc2FibGVkOm9wYWNpdHktNTBcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT17YHctMy41IGgtMy41ICR7aXNTaW11bGF0aW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj57aXNTaW11bGF0aW5nID8gJ1N5bXVsYWNqYSB3IHRva3UuLi4nIDogJ1JvenBvY3puaWogVGVzdCBacnp1dHUnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFN0ZXBwZXIgVmlzdWFsaXphdGlvbiAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTUgZ2FwLTEuNSB0ZXh0LWNlbnRlciBmb250LW1vbm8gdGV4dC1bMTBweF1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyICR7c2ltU3RlcCA+PSAxID8gJ2JnLWN5YW4tOTUwIGJvcmRlci1jeWFuLTUwMCB0ZXh0LWN5YW4tMzAwJyA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTYwMCd9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+S1JPSyAxPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+WnJ6dXQgVVNCPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyICR7c2ltU3RlcCA+PSAyID8gJ2JnLWN5YW4tOTUwIGJvcmRlci1jeWFuLTUwMCB0ZXh0LWN5YW4tMzAwJyA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTYwMCd9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+S1JPSyAyPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+VG9wTW9zdCBTdHJpcDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLWxnIGJvcmRlciAke3NpbVN0ZXAgPj0gMyA/ICdiZy1jeWFuLTk1MCBib3JkZXItY3lhbi01MDAgdGV4dC1jeWFuLTMwMCcgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS02MDAnfWB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPktST0sgMzwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2Pk50U3VzcGVuZDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YHAtMiByb3VuZGVkLWxnIGJvcmRlciAke3NpbVN0ZXAgPj0gNCA/ICdiZy1jeWFuLTk1MCBib3JkZXItY3lhbi01MDAgdGV4dC1jeWFuLTMwMCcgOiAnYmctc2xhdGUtOTUwIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS02MDAnfWB9PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvbnQtYm9sZFwiPktST0sgNDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlBFL0FDTCBMb2NrPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtgcC0yIHJvdW5kZWQtbGcgYm9yZGVyICR7c2ltU3RlcCA+PSA1ID8gJ2JnLWVtZXJhbGQtOTUwIGJvcmRlci1lbWVyYWxkLTUwMCB0ZXh0LWVtZXJhbGQtMzAwJyA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTYwMCd9YH0+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkXCI+S1JPSyA1PC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+UHVscGl0IEN6eXN0eTwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogU2ltdWxhdGVkIEV4ZWN1dGlvbiBMb2cgVGVybWluYWwgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LWN5YW4tMzAwIGgtNTYgb3ZlcmZsb3cteS1hdXRvIHNwYWNlLXktMS41IGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAge3NpbUxvZ3MubGVuZ3RoID09PSAwID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGl0YWxpYyBweS0xMCB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgIEtsaWtuaWog4oCeUm96cG9jem5paiBUZXN0IFpyenV0deKAnSwgYWJ5IHphc3ltdWxvd2HEhyB1cnVjaG9taWVuaWUgcGFraWV0dSBvZmZsaW5lIG5hIG1hc3p5bmllIGJleiBkb3N0xJlwdSBkbyBzaWVjaS5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICBzaW1Mb2dzLm1hcCgobG9nLCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpbmRleH0gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS02MDAgc2VsZWN0LW5vbmVcIj5be2luZGV4ICsgMX1dPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtsb2cuaW5jbHVkZXMoJ1N1a2NlcycpID8gJ3RleHQtZW1lcmFsZC00MDAgZm9udC1ib2xkJyA6IGxvZy5pbmNsdWRlcygnRkFaQScpID8gJ3RleHQteWVsbG93LTMwMCcgOiAndGV4dC1jeWFuLTMwMCd9PlxuICAgICAgICAgICAgICAgICAgICB7bG9nfVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIExvY2FsIEhldXJpc3RpYyBBSSBFbmdpbmUgU2VjdGlvbiAoNiBDb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi02IGJnLXNsYXRlLTkwMC85MCByb3VuZGVkLTJ4bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBwLTUgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDAgcGItM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPFNwYXJrbGVzIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgICAgV2J1ZG93YW55IFNpbG5payBIZXVyeXN0eWN6bnkgT2ZmbGluZSAoWmVyby1Hb29nbGUgTW9kZSlcbiAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1wdXJwbGUtOTUwIGJvcmRlciBib3JkZXItcHVycGxlLTYwMC81MCB0ZXh0LXB1cnBsZS0zMDAgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAxMDAlIExPS0FMTllcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnB1dCBmb3IgaGV1cmlzdGljIHRlc3RpbmcgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ubyBibG9ja1wiPlxuICAgICAgICAgICAgICBXcHJvd2FkxbogbmF6d8SZIHByb2Nlc3UsIHpyenV0IGxvZ8OzdyBsdWIgcG9kZWpyemFueSBrb2QgZG8gbmF0eWNobWlhc3Rvd2VqIGFuYWxpenkgb2ZmbGluZTpcbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZ2FwLTJcIj5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtvZmZsaW5lSW5wdXR9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRPZmZsaW5lSW5wdXQoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIHRyb2phbl9vdmVybGF5LmV4ZSBsdWIgZmx1dHRlcl9ydW5uZXIuZXhlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9udC1tb25vIHRleHQteHMgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVJ1bk9mZmxpbmVBbmFseXNpc31cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS01MDAgdGV4dC13aGl0ZSBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgQW5hbGl6dWogT2ZmbGluZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEhldXJpc3RpYyBPdXRwdXQgKi99XG4gICAgICAgICAge2FuYWx5c2lzUmVzdWx0ICYmIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtOTAwLzUwIHRleHQteHMgZm9udC1tb25vIHNwYWNlLXktMi41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5Qb3ppb20gWmFncm/FvGVuaWE6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YHB4LTIgcHktMC41IHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1ib2xkICR7XG4gICAgICAgICAgICAgICAgICBhbmFseXNpc1Jlc3VsdC50aHJlYXRMZXZlbCA9PT0gJ0tSWVRZQ1pORScgPyAnYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtNzAwJyA6ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci03MDAnXG4gICAgICAgICAgICAgICAgfWB9PlxuICAgICAgICAgICAgICAgICAge2FuYWx5c2lzUmVzdWx0LnRocmVhdExldmVsfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPld5a3J5dGUgU3lnbmF0dXJ5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGdhcC0xIG10LTFcIj5cbiAgICAgICAgICAgICAgICAgIHthbmFseXNpc1Jlc3VsdC5kZXRlY3RlZFNpZ25hdHVyZXMubWFwKChzaWcsIGlkeCkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBrZXk9e2lkeH0gY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1wdXJwbGUtMzAwIHRleHQtWzEwcHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3NpZ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDAgdGV4dC1bMTFweF0gYmctc2xhdGUtOTAwLzgwIHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICB7YW5hbHlzaXNSZXN1bHQub2ZmbGluZVZlcmRpY3R9XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwXCI+V3lnZW5lcm93YW5vIGxva2Fsbnkga29kIG5ldXRyYWxpemFjamkgLmJhdDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVDb3B5KGFuYWx5c2lzUmVzdWx0LmF1dG9HZW5lcmF0ZWRDb2RlLCAnY3VzdG9tX2FpJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LWN5YW4tNDAwIGhvdmVyOnRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdGV4dC1bMTFweF0gY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtjb3BpZWRGaWxlID09PSAnY3VzdG9tX2FpJyA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZEZpbGUgPT09ICdjdXN0b21fYWknID8gJ1Nrb3Bpb3dhbm8hJyA6ICdLb3BpdWogU2tyeXB0IC5iYXQnfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogUG9zdC1FTVAgRGlhZ25vc3RpYyBSZXBvcnQgTW9kYWwgKi99XG4gICAgICA8UG9zdEVtcFJlcG9ydE1vZGFsXG4gICAgICAgIHJlcG9ydD17YmFycmllclN0YXRlLmxhdGVzdFBvc3RFbXBSZXBvcnR9XG4gICAgICAgIGlzT3Blbj17aXNSZXBvcnRNb2RhbE9wZW59XG4gICAgICAgIG9uQ2xvc2U9eygpID0+IHNldElzUmVwb3J0TW9kYWxPcGVuKGZhbHNlKX1cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFxSWdCO0FBckloQixTQUFnQixVQUFVLGVBQWU7QUFDekM7QUFBQSxFQUNFO0FBQUEsRUFBVTtBQUFBLEVBQVc7QUFBQSxFQUFrQjtBQUFBLEVBQVU7QUFBQSxFQUNqRDtBQUFBLEVBQXVDO0FBQUEsRUFDdkM7QUFBQSxFQUFNO0FBQUEsRUFBTztBQUFBLEVBQVU7QUFBQSxFQUFRO0FBQUEsRUFBTztBQUFBLEVBQU87QUFBQSxFQUM3QztBQUFBLEVBQUs7QUFBQSxFQUFVO0FBQUEsRUFBNEI7QUFBQSxFQUFhO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxPQUN0RTtBQUNQO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUVLO0FBQ1A7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxPQUNLO0FBQ1AsU0FBUyxvQkFBb0I7QUFDN0IsU0FBUywwQkFBMEI7QUFDbkMsU0FBUyw0QkFBNEIsaUNBQWlDO0FBQ3RFLFNBQVMsbUNBQW1DO0FBQzVDLFNBQVMsaUNBQWlDO0FBRW5DLGFBQU0sMEJBQW9DLE1BQU07QUFDckQs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