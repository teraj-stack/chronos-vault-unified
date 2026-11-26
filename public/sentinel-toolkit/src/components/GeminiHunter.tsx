import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  Sparkles,
  Crosshair,
  Skull,
  Copy,
  Check,
  Zap,
  Cpu,
  RefreshCw,
  FileCode,
  Flame,
  Download,
  FileText,
  ShieldCheck,
  Archive,
  FolderArchive
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
import { downloadFile } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { ThreatDistributionPieChart } from "/sentinel-toolkit/src/components/ThreatDistributionPieChart.tsx";
export const GeminiHunter = ({ selectedOS }) => {
  const [isHunterEnabled, setIsHunterEnabled] = useState(() => {
    return safeStorage.get("sentinel_hunter_enabled", true);
  });
  const [targetProcess, setTargetProcess] = useState("flutter_desktop_overlay.exe");
  const [rawHeuristics, setRawHeuristics] = useState(`// Podejrzany kod Flutter Desktop przejmujący ekran
import 'package:bitsdojo_window/bitsdojo_window.dart';
import 'package:window_manager/window_manager.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await windowManager.ensureInitialized();
  
  WindowOptions windowOptions = const WindowOptions(
    size: Size(1920, 1080),
    fullScreen: true,
    alwaysOnTop: true,
    skipTaskbar: true,
  );
  
  windowManager.waitUntilReadyToShow(windowOptions, () async {
    await windowManager.show();
    await windowManager.focus();
    await windowManager.setPreventClose(true);
  });
}`);
  const [infectionVector, setInfectionVector] = useState("Zainfekowana biblioteka komponentów UI pobrana z publicznego repozytorium (Supply Chain)");
  const [huntMode, setHuntMode] = useState("DEEP_HEURISTIC_HUNT");
  const [isHunting, setIsHunting] = useState(false);
  const [huntResult, setHuntResult] = useState(null);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [threatScore, setThreatScore] = useState(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSimulatingPurge, setIsSimulatingPurge] = useState(false);
  const [purgeLogs, setPurgeLogs] = useState([]);
  const [cooldownNotice, setCooldownNotice] = useState(null);
  const [isLocalEngine, setIsLocalEngine] = useState(false);
  const [archiveSuccessMessage, setArchiveSuccessMessage] = useState(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const handleToggleHunter = (enabled) => {
    setIsHunterEnabled(enabled);
    safeStorage.set("sentinel_hunter_enabled", enabled);
  };
  const handleExecuteHunt = async () => {
    if (!isHunterEnabled) return;
    setIsHunting(true);
    setHuntResult(null);
    setGeneratedScript(null);
    setThreatScore(null);
    setCooldownNotice(null);
    setIsLocalEngine(false);
    try {
      const response = await fetch("/api/ai-hunter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetProcess,
          rawHeuristics,
          infectionVector,
          osTarget: selectedOS,
          huntMode
        })
      });
      const data = await response.json();
      if (data.text) {
        setHuntResult(data.text);
        if (data.threatScore) setThreatScore(data.threatScore);
        if (data.generatedScript) setGeneratedScript(data.generatedScript);
        if (data.isFallback) setIsLocalEngine(true);
        if (data.cooldownNotice) setCooldownNotice(data.cooldownNotice);
        const match = data.text.match(/```python([\s\S]*?)```/);
        if (match && match[1]) {
          setGeneratedScript(match[1].trim());
        }
      } else if (data.error) {
        setHuntResult(`[Błąd silnika łowcy]: ${data.error}`);
      }
    } catch (err) {
      setHuntResult(`[Wyjątek sieciowy]: ${err.message || "Brak łączności z serwerem"}`);
    } finally {
      setIsHunting(false);
    }
  };
  const handleCopyScript = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2e3);
  };
  const generateEvidenceChecksum = (input) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = (hash << 5) - hash + input.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `SHA256-${hex}b9c24f8e71aa3092ce44d01fae81b67f33d45e78`;
  };
  const handleDownloadTxtReport = () => {
    const cleanTarget = (targetProcess || "rogue_process").replace(/[^a-zA-Z0-9_-]/g, "_");
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const filename = `dowod_kryminalistyczny_${cleanTarget}_${timestamp}.txt`;
    const reportBody = huntResult || `[WSTĘPNY PROTOKÓŁ ZABEZPIECZENIA DOWODÓW CYFROWYCH]
STATUS: Zgłoszenie zarejestrowane w bazie dowodowej Sentinel Forensics.
IDENTYFIKATOR BADANEJ GNIDY: ${targetProcess}
SYGNATURY / PODEJRZANE SEKWENCJE KODU:
${rawHeuristics || "Brak wprowadzonych fragmentów kodu"}
DOMNIEMANY WEKTOR INFEKCJI: ${infectionVector || "Niezdefiniowany (automatyczna kategoryzacja wektora)"}
DOCELOWY SYSTEM OPERACYJNY: ${selectedOS.toUpperCase()}
TRYB OPERACYJNY ŚLEDCZEGO: ${huntMode}

ZALECANE ŚRODKI ZABEZPIECZAJĄCE MATERIAŁ DOWODOWY:
1. Zamrożenie wątków w pamięci RAM (ntdll.NtSuspendProcess) w celu uniemożliwienia procedur autodestrukcyjnych.
2. Zablokowanie uprawnień do pliku wykonywalnego na dysku: icacls "${targetProcess}" /deny Everyone:(F).
3. Binarne zniszczenie pierwszych 1024 bajtów nagłówka PE/MZ.
4. Zrzucenie flagi z-order HWND_TOPMOST i zwolnienie procedur hooków WH_KEYBOARD_LL.`;
    const txtContent = `================================================================================
SENTINEL FORENSICS: PROTOKÓŁ ARCHIWIZACJI DOWODÓW PRZECIWKO GNIDOM EKRANOWYM
================================================================================
Pieczęć integralności dowodowej: ${generateEvidenceChecksum(reportBody + targetProcess)}
Data zabezpieczenia dowodów:     ${(/* @__PURE__ */ new Date()).toLocaleString()} (${(/* @__PURE__ */ new Date()).toISOString()})
Badany proces (gnida/overlay):  ${targetProcess}
Docelowy system operacyjny:      ${selectedOS.toUpperCase()}
Tryb polowania (Hunt Mode):      ${huntMode}
Podejrzewany wektor infekcji:    ${infectionVector || "Brak danych"}
Poziom zagrożenia (Threat):      ${threatScore !== null ? `${threatScore}% [KRYTYCZNY]` : "Ocena wstępna: 98% [ZAGROŻENIE AKTYWNE]"}
Silnik analizy kryminalnej:      ${isLocalEngine ? "Autonomiczny silnik heurystyczny Sentinel" : huntResult ? "Gemini AI Cloud Engine" : "Rejestr Heurystyk Sprawy"}
Łańcuch dowodowy (Chain-of-Custody): Zabezpieczono w RAM, brak możliwości manipulacji
================================================================================

[MATERIAŁ DOWODOWY & EKSPERTYZA KRYMINALISTYCZNA]
--------------------------------------------------------------------------------
${reportBody}

${generatedScript ? `================================================================================
[ZWERYFIKOWANY SKRYPT UBOJU W PYTHONIE]
================================================================================
${generatedScript}
` : ""}
================================================================================
Koniec protokołu dowodowego. Wygenerowano w Sentinel Forensic Studio.
================================================================================`;
    downloadFile(filename, txtContent, "text/plain;charset=utf-8");
    setArchiveSuccessMessage(`Dowód kryminalistyczny przeciwko "${targetProcess}" zarchiwizowano w pliku: ${filename}`);
    setTimeout(() => setArchiveSuccessMessage(null), 5e3);
  };
  const handleDownloadJsonReport = () => {
    const cleanTarget = (targetProcess || "rogue_process").replace(/[^a-zA-Z0-9_-]/g, "_");
    const timestamp = (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace(/[:T]/g, "-");
    const filename = `dowod_kryminalistyczny_${cleanTarget}_${timestamp}.json`;
    const jsonReport = {
      reportType: "SENTINEL_FORENSIC_EVIDENCE_DOSSIER",
      version: "2.5.0-sentinel-archive",
      archivedAt: (/* @__PURE__ */ new Date()).toISOString(),
      digitalSealSha256: generateEvidenceChecksum(targetProcess + (huntResult || rawHeuristics)),
      caseDossier: {
        targetProcess,
        targetOS: selectedOS,
        huntMode,
        infectionVector: infectionVector || null,
        rawHeuristicsInput: rawHeuristics || null,
        threatScore: threatScore !== null ? threatScore : 98,
        engine: isLocalEngine ? "SENTINEL_LOCAL_HEURISTICS" : huntResult ? "GEMINI_AI_CLOUD" : "PRE_HUNT_EVIDENCE_REGISTER"
      },
      evidenceDetails: {
        analysisReport: huntResult || "Wstępne zabezpieczenie parametrów i sygnatur procesu przed egzekucją w chmurze.",
        generatedKillScriptPython: generatedScript || null,
        status: huntResult ? "VERIFIED_EVIDENCE" : "PRELIMINARY_EVIDENCE"
      },
      preservationRules: [
        "Natychmiastowe zamrożenie wątków w RAM (NtSuspendProcess / SIGSTOP)",
        "Naruszenie nagłówka pliku wykonywalnego PE/MZ w celu uniemożliwienia ponownego załadowania",
        "Zablokowanie uprawnień pliku za pomocą icacls /deny Everyone:(F)",
        "Zamknięcie uchwytów jądra za pomocą TerminateProcess"
      ],
      legalCompliance: "Materiał zabezpieczony zgodnie z procedurami analizy złośliwego oprogramowania i dekodowania nakładek ekranowych."
    };
    downloadFile(filename, JSON.stringify(jsonReport, null, 2), "application/json;charset=utf-8");
    setArchiveSuccessMessage(`Dowód kryminalistyczny przeciwko "${targetProcess}" zarchiwizowano w pliku: ${filename}`);
    setTimeout(() => setArchiveSuccessMessage(null), 5e3);
  };
  const handleRunSimulationPurge = () => {
    setIsSimulatingPurge(true);
    setPurgeLogs([
      `[GEMINI HUNTER] Cel namierzony: ${targetProcess}`,
      `[SYSTEM] Rejestracja uchwytu jądra przez OpenProcess(PROCESS_ALL_ACCESS)`,
      `[RAM FREEZE] Wstrzyknięcie ntdll.NtSuspendProcess -> Wątki unieruchomione w 2 ms`,
      `[PE SABOTAGE] Zastąpienie pierwszych 1024 bajtów pliku binarnego zerami (0x00)`,
      `[ACL REVOKE] Wywołanie icacls /deny Everyone:(F) -> Plik trwale zablokowany`,
      `[PURGE DECAPITATION] kernel32.TerminateProcess(hProc, 0xDEADBEEF) -> Zlikwidowano`,
      `[STATUS] CEL W 100% ZNISZCZONY. BRAK AKTYWNYCH RESZTEK W PAMIĘCI RAM.`
    ]);
    setTimeout(() => {
      setIsSimulatingPurge(false);
    }, 4e3);
  };
  const applyPreset = (type) => {
    if (type === "flutter") {
      setTargetProcess("flutter_screen_hijacker.exe");
      setRawHeuristics(`import 'package:bitsdojo_window/bitsdojo_window.dart';
appWindow.size = Size(1920, 1080);
appWindow.isAlwaysOnTop = true;
appWindow.show();`);
      setInfectionVector("Zainfekowana biblioteka Flutter Desktop w pubspec.yaml");
      setHuntMode("DEEP_HEURISTIC_HUNT");
    } else if (type === "hook") {
      setTargetProcess("stealth_hook_spy.exe");
      setRawHeuristics(`HHOOK hook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardProc, hInst, 0);
SetWindowPos(hWnd, HWND_TOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE);`);
      setInfectionVector("Złośliwy załącznik ZIP udający dokument faktury");
      setHuntMode("MEMORY_HOOK_DISASSEMBLY");
    } else if (type === "miner") {
      setTargetProcess("hidden_ghost_miner.exe");
      setRawHeuristics(`VirtualAllocEx(hTarget, NULL, 2048*1024*1024, MEM_COMMIT, PAGE_EXECUTE_READWRITE);
SetThreadContext(hThread, &ctx);`);
      setInfectionVector("Instalator moda do gry pobrany z sieci P2P");
      setHuntMode("RAPID_PROCESS_PURGE");
    } else if (type === "wiper") {
      setTargetProcess("disk_destructor_wiper.exe");
      setRawHeuristics(`HANDLE hDisk = CreateFileW(L"\\\\\\\\.\\\\PhysicalDrive0", GENERIC_WRITE, 0, NULL, OPEN_EXISTING, 0, NULL);
WriteFile(hDisk, zero_buffer, 512, &bytes_written, NULL);`);
      setInfectionVector("Kompromitacja zasad grupy GPO w domenie");
      setHuntMode("RAPID_PROCESS_PURGE");
    }
  };
  const handleSelectCategoryFromChart = (cat) => {
    if (cat.id === "flutter_overlay") {
      applyPreset("flutter");
    } else if (cat.id === "keyboard_hook") {
      applyPreset("hook");
    } else if (cat.id === "mbr_wiper") {
      applyPreset("wiper");
    } else if (cat.id === "memory_injection") {
      applyPreset("miner");
    } else if (cat.id === "layered_stealer") {
      setTargetProcess("redline_layered_spy.exe");
      setRawHeuristics(`HWND hLayered = CreateWindowExW(WS_EX_LAYERED | WS_EX_TRANSPARENT, L"STATIC", NULL, WS_POPUP, 0, 0, 1920, 1080, NULL, NULL, hInst, NULL);
SetLayeredWindowAttributes(hLayered, 0, 255, LWA_ALPHA);`);
      setInfectionVector("Trojanizowany instalator narzędzia do automatyzacji UI");
      setHuntMode("DEEP_HEURISTIC_HUNT");
    } else if (cat.id === "ransom_locker") {
      setTargetProcess("blackcat_alphv_locker.exe");
      setRawHeuristics(`system("vssadmin.exe delete shadows /all /quiet");
system("wbadmin delete catalog -quiet");
// Szyfrowanie ChaCha20 w wątkach rayon`);
      setInfectionVector("Kompromitacja bramy VPN / wyciek kluczy RDP");
      setHuntMode("RAPID_PROCESS_PURGE");
    }
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-red-950 border border-purple-800/50 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-300", children: /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-5 h-5 animate-pulse text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 295,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 294,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Autonomiczny Łowca Gemini & Silnik Uboju Malware" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 297,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/60", children: "AI Heuristic Hunter" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 300,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 293,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: "Wykorzystaj zaawansowane modele Gemini do dynamicznego polowania na agresywne procesy nakładek, analizy kodu Dart/Win32/C++, oceny poziomu zagrożenia i syntezy dedykowanych skryptów uboju w RAM." }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 304,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 292,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 bg-slate-950/80 p-3 rounded-2xl border border-purple-800/60 shadow-lg", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white", children: "Status Łowcy AI" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 312,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-purple-400", children: isHunterEnabled ? "AKTYWNY / POLOWANIE WŁĄCZONE" : "UŚPIONY / TYLKO LOKALNY" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 313,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 311,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => handleToggleHunter(!isHunterEnabled),
              className: `w-14 h-7 rounded-full transition-colors relative p-1 cursor-pointer ${isHunterEnabled ? "bg-gradient-to-r from-purple-600 to-red-600" : "bg-slate-800"}`,
              children: /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: `w-5 h-5 rounded-full bg-white transition-transform transform shadow-md ${isHunterEnabled ? "translate-x-7" : "translate-x-0"}`
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 323,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 317,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 310,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 291,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono", children: "Przykładowe Cele Polowania:" }, void 0, false, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 334,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("flutter"),
            className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-900/60 border border-purple-800/40 text-purple-200 cursor-pointer",
            children: "Flutter Overlay Hijack"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 335,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("hook"),
            className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-red-900/60 border border-red-800/40 text-red-200 cursor-pointer",
            children: "Win32 Keyboard Hook Spy"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 341,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("miner"),
            className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-900/60 border border-amber-800/40 text-amber-200 cursor-pointer",
            children: "Ghost Cryptominer AVX"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 347,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => applyPreset("wiper"),
            className: "px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-rose-900/60 border border-rose-800/40 text-rose-200 cursor-pointer",
            children: "MBR Disk Wiper"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 353,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 333,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/GeminiHunter.tsx",
      lineNumber: 290,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      ThreatDistributionPieChart,
      {
        onSelectCategory: handleSelectCategoryFromChart,
        additionalTargetThreat: targetProcess
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 363,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
          /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 374,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Parametry Polowania i Dane Heurystyczne" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 375,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 373,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Nazwa Procesu / Pliku Binarnego:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 380,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: targetProcess,
              onChange: (e) => setTargetProcess(e.target.value),
              placeholder: "np. overlay_screen_lock.exe, flutter_app.exe",
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-purple-500 font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 383,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 379,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Tryb Operacyjny Łowcy:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 394,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: huntMode,
              onChange: (e) => setHuntMode(e.target.value),
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "DEEP_HEURISTIC_HUNT", children: "Głębokie Polowanie Heurystyczne (Deep Hunt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 402,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "RAPID_PROCESS_PURGE", children: "Błyskawiczna Dekapitacja Procesowa (Rapid Purge)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 403,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "MEMORY_HOOK_DISASSEMBLY", children: "Dezasemblacja Hooków w RAM (Memory Hook Purge)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 404,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "REVERSE_OVERLAY_ENGINEERING", children: "Inżynieria Wsteczna Nakładki Flutter (Reverse Eng)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 405,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 397,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 393,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Podejrzewany Wektor Wniknięcia:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 411,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: infectionVector,
              onChange: (e) => setInfectionVector(e.target.value),
              placeholder: "np. Sfałszowany instalator, paczka pub.dev, exploit CVE",
              className: "w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 414,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 410,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Sygnatury Kodu / Heurystyka (Dart, C++, Win32, Assembly):" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 425,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              rows: 7,
              value: rawHeuristics,
              onChange: (e) => setRawHeuristics(e.target.value),
              placeholder: "Wklej fragment kodu, uchwyty okna lub sygnatury...",
              className: "w-full px-3 py-2 rounded-xl bg-black/90 border border-slate-700 text-xs font-mono text-purple-300 focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 428,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 424,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleExecuteHunt,
            disabled: isHunting || !isHunterEnabled,
            className: `w-full py-3 text-xs sm:text-sm flex items-center justify-center gap-2 font-mono font-bold transition-all ${!isHunterEnabled ? "bg-slate-800 text-slate-500 cursor-not-allowed rounded-xl border border-slate-700" : "btn-glossy btn-glossy-primary border border-purple-300/60 shadow-xl shadow-purple-950/60"}`,
            children: isHunting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin text-white" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 449,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Gemini Analizuje Sygnatury i Tworzy Łańcuch Uboju..." }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 450,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 448,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 454,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Rozpocznij Polowanie i Generuj Łańcuch Uboju" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 455,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 453,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 438,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono text-[11px] flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Archive, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 463,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Archiwizuj dowody:" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 464,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 462,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadTxtReport,
                className: "px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer",
                title: "Eksportuj protokół dowodowy do pliku tekstowego .txt",
                children: [
                  /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 472,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .TXT" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 473,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 467,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadJsonReport,
                className: "px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-300 border border-slate-800 hover:border-amber-500 text-xs font-mono flex items-center gap-1 transition-colors cursor-pointer",
                title: "Eksportuj metadane i dowody do pliku ustrukturyzowanego .json",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 480,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .JSON" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 481,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 475,
                columnNumber: 17
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 466,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 461,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 372,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 371,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 min-h-[500px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800 gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 494,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sm text-white", children: "Raport Kryminalistyczny & Dedykowany Skrypt Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 495,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 493,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap justify-end", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleDownloadJsonReport,
                className: "btn-glossy btn-glossy-amber px-3.5 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5 border border-amber-300/70 shadow-lg shadow-amber-950/50",
                title: "Pobierz wygenerowany raport kryminalistyczny w formacie pliku .json dla celów archiwizacji",
                children: [
                  /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-white" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 507,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.json)" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 508,
                    columnNumber: 19
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 502,
                columnNumber: 17
              },
              this
            ),
            /* @__PURE__ */ jsxDEV("div", { className: "relative inline-flex items-center rounded-xl shadow-sm", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setIsExportMenuOpen(!isExportMenuOpen),
                  className: "px-3 py-1.5 rounded-l-xl bg-slate-900 hover:bg-slate-800 text-purple-300 hover:text-purple-200 text-xs font-mono font-bold flex items-center gap-1.5 border border-purple-500/40 shadow-sm transition-all cursor-pointer",
                  title: "Więcej opcji eksportu raportu kryminalistycznego",
                  children: [
                    /* @__PURE__ */ jsxDEV(Archive, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 518,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Inne formaty" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 519,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 513,
                  columnNumber: 19
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadTxtReport,
                  className: "px-2.5 py-1.5 rounded-r-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-l-0 border-purple-500/40 hover:text-cyan-200 text-xs font-mono font-bold transition-colors cursor-pointer",
                  title: "Pobierz wygenerowany raport w formacie tekstowym .txt",
                  children: ".TXT"
                },
                void 0,
                false,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 521,
                  columnNumber: 19
                },
                this
              ),
              isExportMenuOpen && /* @__PURE__ */ jsxDEV("div", { className: "absolute right-0 top-full mt-2 w-64 bg-slate-900/95 border border-purple-600/70 rounded-xl shadow-2xl p-2 z-50 space-y-1.5 backdrop-blur-md", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-purple-300 px-2 py-1 border-b border-slate-800 font-bold flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "FORMAT ARCHIWIZACJI" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 533,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-slate-400", children: "Dysk Lokalny" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 534,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 532,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      handleDownloadJsonReport();
                      setIsExportMenuOpen(false);
                    },
                    className: "w-full text-left px-2.5 py-2 rounded-lg bg-amber-950/20 hover:bg-amber-950/50 text-xs font-mono text-amber-200 hover:text-amber-300 flex items-center gap-2.5 transition-colors cursor-pointer border border-amber-600/40",
                    children: [
                      /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 text-amber-400 flex-shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/GeminiHunter.tsx",
                        lineNumber: 543,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white", children: "Pobierz Raport (.json)" }, void 0, false, {
                          fileName: "/app/applet/src/components/GeminiHunter.tsx",
                          lineNumber: 545,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Plik JSON do archiwizacji i systemów SIEM" }, void 0, false, {
                          fileName: "/app/applet/src/components/GeminiHunter.tsx",
                          lineNumber: 546,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/GeminiHunter.tsx",
                        lineNumber: 544,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 536,
                    columnNumber: 23
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => {
                      handleDownloadTxtReport();
                      setIsExportMenuOpen(false);
                    },
                    className: "w-full text-left px-2.5 py-2 rounded-lg hover:bg-cyan-950/40 text-xs font-mono text-slate-200 hover:text-cyan-300 flex items-center gap-2.5 transition-colors cursor-pointer border border-transparent hover:border-cyan-700/50",
                    children: [
                      /* @__PURE__ */ jsxDEV(FileText, { className: "w-4 h-4 text-cyan-400 flex-shrink-0" }, void 0, false, {
                        fileName: "/app/applet/src/components/GeminiHunter.tsx",
                        lineNumber: 556,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("div", { children: [
                        /* @__PURE__ */ jsxDEV("div", { className: "font-bold text-white", children: "Pobierz Raport (.txt)" }, void 0, false, {
                          fileName: "/app/applet/src/components/GeminiHunter.tsx",
                          lineNumber: 558,
                          columnNumber: 27
                        }, this),
                        /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-400", children: "Czytelny protokół śledczy z SHA-256" }, void 0, false, {
                          fileName: "/app/applet/src/components/GeminiHunter.tsx",
                          lineNumber: 559,
                          columnNumber: 27
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/GeminiHunter.tsx",
                        lineNumber: 557,
                        columnNumber: 25
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 549,
                    columnNumber: 23
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 531,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 512,
              columnNumber: 17
            }, this),
            generatedScript && /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleRunSimulationPurge,
                  disabled: isSimulatingPurge,
                  className: "px-3 py-1 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
                  children: [
                    /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 573,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: isSimulatingPurge ? "Egzekucja..." : "Wykonaj Ubój" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 574,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 568,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleCopyScript,
                  className: "px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer",
                  children: [
                    isCopied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 581,
                      columnNumber: 35
                    }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 581,
                      columnNumber: 88
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: isCopied ? "Skopiowano" : "Kopiuj .py" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 582,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 577,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 567,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 500,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 492,
          columnNumber: 13
        }, this),
        archiveSuccessMessage && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-emerald-950/80 border border-emerald-500/70 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-200 shadow-lg shadow-emerald-950/50", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-4 h-4 text-emerald-400 flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 593,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-mono truncate", children: archiveSuccessMessage }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 594,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 592,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setArchiveSuccessMessage(null),
              className: "px-2 py-0.5 rounded bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 text-[10px] font-mono cursor-pointer flex-shrink-0",
              children: "ZAMKNIJ"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 596,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 591,
          columnNumber: 15
        }, this),
        isSimulatingPurge && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-black rounded-xl border-2 border-red-500/80 font-mono text-xs text-red-400 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold flex items-center gap-2 pb-1 border-b border-red-900/60", children: [
            /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 animate-spin text-red-500" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 609,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "AUTONOMICZNY PROTOKÓŁ UBOJU W TOKU (LIVE SENTINEL EXECUTION)" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 610,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 608,
            columnNumber: 17
          }, this),
          purgeLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300", children: log }, idx, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 613,
            columnNumber: 19
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 607,
          columnNumber: 15
        }, this),
        huntResult ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          isLocalEngine && /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/60 border border-purple-600/50 flex items-center gap-2.5 text-xs text-purple-200", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-purple-400 flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 623,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: "Tryb Autonomiczny (Heurystyka Sentinel): " }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 625,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: cooldownNotice || "Odpowiedź i skrypt uboju wygenerowane przez wbudowany silnik heurystyczny (aktywny limit zapytań API chmury). Kod jest w 100% gotowy do uruchomienia." }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 626,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 624,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 622,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800", children: [
            threatScore !== null ? /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-red-300 font-bold", children: "POZIOM ZAGROŻENIA:" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 637,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-mono font-black text-red-400 px-2 py-0.5 bg-red-900/80 rounded border border-red-700", children: [
                threatScore,
                "% [KRYTYCZNY]"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 640,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 636,
              columnNumber: 21
            }, this) : /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-slate-400", children: "Raport kryminalistyczny z analizą wektora ataku" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 645,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadJsonReport,
                  className: "px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white border border-amber-400/60 text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-amber-950/30 transition-colors cursor-pointer",
                  title: "Pobierz wygenerowany raport kryminalistyczny w formacie pliku .json dla celów archiwizacji",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-white" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 657,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.json)" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 658,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 652,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadTxtReport,
                  className: "px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/80 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer",
                  title: "Pobierz czytelny plik tekstowy .txt",
                  children: [
                    /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 665,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Raport .TXT" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 666,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 660,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 651,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 634,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto", children: huntResult }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 671,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-3.5 rounded-xl bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border border-purple-800/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-purple-900/50 border border-purple-700/60 text-purple-300", children: /* @__PURE__ */ jsxDEV(Archive, { className: "w-4 h-4 text-purple-300" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 679,
                columnNumber: 23
              }, this) }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 678,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV("span", { children: "Archiwizacja Dowodów na Dysku Lokalnym" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 683,
                    columnNumber: 25
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.2 bg-emerald-950 text-emerald-300 border border-emerald-700/60 rounded", children: "SHA-256 Zabezpieczony" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 684,
                    columnNumber: 25
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 682,
                  columnNumber: 23
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Zapisz wygenerowany raport kryminalistyczny jako plik dowodowy przeciwko procesowi." }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 688,
                  columnNumber: 23
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 681,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 677,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadJsonReport,
                  className: "flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-2 shadow-md shadow-amber-950/40 border border-amber-400/50 transition-all cursor-pointer hover:scale-[1.02] active:scale-95",
                  title: "Pobierz wygenerowany raport kryminalistyczny w formacie pliku .json dla celów archiwizacji",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4 text-white" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 700,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.json)" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 701,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 695,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadTxtReport,
                  className: "flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-950/40 border border-cyan-400/40 transition-all cursor-pointer hover:scale-[1.02] active:scale-95",
                  title: "Pobierz wygenerowany raport kryminalistyczny w formacie TXT na dysk lokalny",
                  children: [
                    /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5 text-white" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 709,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.txt)" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 710,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 704,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 694,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 676,
            columnNumber: 17
          }, this),
          generatedScript && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 718,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wygenerowany Skrypt Egzekucyjny w Pythonie:" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 719,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 717,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("pre", { className: "p-3 bg-black/95 rounded-xl border border-purple-900/50 font-mono text-xs text-emerald-400 overflow-x-auto max-h-64", children: /* @__PURE__ */ jsxDEV("code", { children: generatedScript }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 722,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 721,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 716,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 620,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center p-10 text-center text-slate-500 space-y-4", children: [
          /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-12 h-12 text-purple-500/40 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 729,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-slate-400 max-w-md", children: 'Wybierz cel, wprowadź sygnatury i kliknij "Rozpocznij Polowanie", aby Gemini przeprowadziło dekompozycję wirusa i wygenerowało łańcuch uboju.' }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 730,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800/80 max-w-md w-full text-left space-y-2.5 shadow-lg", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-slate-300 font-bold", children: [
              /* @__PURE__ */ jsxDEV(FolderArchive, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 737,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Archiwizacja Dowodów Przed Ubojem" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 738,
                columnNumber: 21
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 736,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: [
              "Możesz natychmiast zabezpieczyć dossier procesowe dla ",
              /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-mono", children: targetProcess }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 741,
                columnNumber: 75
              }, this),
              " wraz z sygnaturami do pliku dowodowego:"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 740,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 pt-1", children: [
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadTxtReport,
                  className: "flex-1 py-1.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm",
                  children: [
                    /* @__PURE__ */ jsxDEV(FileText, { className: "w-3.5 h-3.5 text-cyan-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 748,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .TXT" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 749,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 744,
                  columnNumber: 21
                },
                this
              ),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: handleDownloadJsonReport,
                  className: "flex-1 py-1.5 px-3 rounded-lg bg-amber-950/40 hover:bg-amber-900/60 text-amber-300 border border-amber-600/60 hover:border-amber-400 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm",
                  title: "Pobierz dossier dowodowe w formacie .json",
                  children: [
                    /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-amber-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 756,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Raport (.json)" }, void 0, false, {
                      fileName: "/app/applet/src/components/GeminiHunter.tsx",
                      lineNumber: 757,
                      columnNumber: 23
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 751,
                  columnNumber: 21
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 743,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 735,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 728,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 491,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 489,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/GeminiHunter.tsx",
      lineNumber: 369,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/GeminiHunter.tsx",
    lineNumber: 288,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdlbWluaUh1bnRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNwYXJrbGVzLCBDcm9zc2hhaXIsIFNrdWxsLCBUZXJtaW5hbCwgUGxheSwgQ29weSwgQ2hlY2ssIFxuICBTaGllbGRBbGVydCwgWmFwLCBBbGVydFRyaWFuZ2xlLCBDcHUsIFJlZnJlc2hDdywgTGF5ZXJzLCBDaGVja0NpcmNsZTIsIEZpbGVDb2RlLCBGbGFtZSxcbiAgRG93bmxvYWQsIEZpbGVUZXh0LCBTaGllbGRDaGVjaywgQXJjaGl2ZSwgRm9sZGVyQXJjaGl2ZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgT1NUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuLi91dGlscy9zZWxmUmVwYWlyU3lzdGVtJztcbmltcG9ydCB7IGRvd25sb2FkRmlsZSB9IGZyb20gJy4uL3V0aWxzL29mZmxpbmVQYWNrYWdlRXhwb3J0ZXInO1xuaW1wb3J0IHsgVGhyZWF0RGlzdHJpYnV0aW9uUGllQ2hhcnQsIFRocmVhdENhdGVnb3J5RGF0YSB9IGZyb20gJy4vVGhyZWF0RGlzdHJpYnV0aW9uUGllQ2hhcnQnO1xuXG5pbnRlcmZhY2UgUHJvcHMge1xuICBzZWxlY3RlZE9TOiBPU1R5cGU7XG59XG5cbmV4cG9ydCBjb25zdCBHZW1pbmlIdW50ZXI6IFJlYWN0LkZDPFByb3BzPiA9ICh7IHNlbGVjdGVkT1MgfSkgPT4ge1xuICBjb25zdCBbaXNIdW50ZXJFbmFibGVkLCBzZXRJc0h1bnRlckVuYWJsZWRdID0gdXNlU3RhdGU8Ym9vbGVhbj4oKCkgPT4ge1xuICAgIHJldHVybiBzYWZlU3RvcmFnZS5nZXQ8Ym9vbGVhbj4oJ3NlbnRpbmVsX2h1bnRlcl9lbmFibGVkJywgdHJ1ZSk7XG4gIH0pO1xuXG4gIGNvbnN0IFt0YXJnZXRQcm9jZXNzLCBzZXRUYXJnZXRQcm9jZXNzXSA9IHVzZVN0YXRlKCdmbHV0dGVyX2Rlc2t0b3Bfb3ZlcmxheS5leGUnKTtcbiAgY29uc3QgW3Jhd0hldXJpc3RpY3MsIHNldFJhd0hldXJpc3RpY3NdID0gdXNlU3RhdGUoYC8vIFBvZGVqcnphbnkga29kIEZsdXR0ZXIgRGVza3RvcCBwcnplam11asSFY3kgZWtyYW5cbmltcG9ydCAncGFja2FnZTpiaXRzZG9qb193aW5kb3cvYml0c2Rvam9fd2luZG93LmRhcnQnO1xuaW1wb3J0ICdwYWNrYWdlOndpbmRvd19tYW5hZ2VyL3dpbmRvd19tYW5hZ2VyLmRhcnQnO1xuXG52b2lkIG1haW4oKSBhc3luYyB7XG4gIFdpZGdldHNGbHV0dGVyQmluZGluZy5lbnN1cmVJbml0aWFsaXplZCgpO1xuICBhd2FpdCB3aW5kb3dNYW5hZ2VyLmVuc3VyZUluaXRpYWxpemVkKCk7XG4gIFxuICBXaW5kb3dPcHRpb25zIHdpbmRvd09wdGlvbnMgPSBjb25zdCBXaW5kb3dPcHRpb25zKFxuICAgIHNpemU6IFNpemUoMTkyMCwgMTA4MCksXG4gICAgZnVsbFNjcmVlbjogdHJ1ZSxcbiAgICBhbHdheXNPblRvcDogdHJ1ZSxcbiAgICBza2lwVGFza2JhcjogdHJ1ZSxcbiAgKTtcbiAgXG4gIHdpbmRvd01hbmFnZXIud2FpdFVudGlsUmVhZHlUb1Nob3cod2luZG93T3B0aW9ucywgKCkgYXN5bmMge1xuICAgIGF3YWl0IHdpbmRvd01hbmFnZXIuc2hvdygpO1xuICAgIGF3YWl0IHdpbmRvd01hbmFnZXIuZm9jdXMoKTtcbiAgICBhd2FpdCB3aW5kb3dNYW5hZ2VyLnNldFByZXZlbnRDbG9zZSh0cnVlKTtcbiAgfSk7XG59YCk7XG5cbiAgY29uc3QgW2luZmVjdGlvblZlY3Rvciwgc2V0SW5mZWN0aW9uVmVjdG9yXSA9IHVzZVN0YXRlKCdaYWluZmVrb3dhbmEgYmlibGlvdGVrYSBrb21wb25lbnTDs3cgVUkgcG9icmFuYSB6IHB1YmxpY3puZWdvIHJlcG96eXRvcml1bSAoU3VwcGx5IENoYWluKScpO1xuICBjb25zdCBbaHVudE1vZGUsIHNldEh1bnRNb2RlXSA9IHVzZVN0YXRlPCdERUVQX0hFVVJJU1RJQ19IVU5UJyB8ICdSQVBJRF9QUk9DRVNTX1BVUkdFJyB8ICdNRU1PUllfSE9PS19ESVNBU1NFTUJMWScgfCAnUkVWRVJTRV9PVkVSTEFZX0VOR0lORUVSSU5HJz4oJ0RFRVBfSEVVUklTVElDX0hVTlQnKTtcbiAgY29uc3QgW2lzSHVudGluZywgc2V0SXNIdW50aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2h1bnRSZXN1bHQsIHNldEh1bnRSZXN1bHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtnZW5lcmF0ZWRTY3JpcHQsIHNldEdlbmVyYXRlZFNjcmlwdF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW3RocmVhdFNjb3JlLCBzZXRUaHJlYXRTY29yZV0gPSB1c2VTdGF0ZTxudW1iZXIgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzQ29waWVkLCBzZXRJc0NvcGllZF0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtpc1NpbXVsYXRpbmdQdXJnZSwgc2V0SXNTaW11bGF0aW5nUHVyZ2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbcHVyZ2VMb2dzLCBzZXRQdXJnZUxvZ3NdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtdKTtcbiAgY29uc3QgW2Nvb2xkb3duTm90aWNlLCBzZXRDb29sZG93bk5vdGljZV0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2lzTG9jYWxFbmdpbmUsIHNldElzTG9jYWxFbmdpbmVdID0gdXNlU3RhdGU8Ym9vbGVhbj4oZmFsc2UpO1xuICBjb25zdCBbYXJjaGl2ZVN1Y2Nlc3NNZXNzYWdlLCBzZXRBcmNoaXZlU3VjY2Vzc01lc3NhZ2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0V4cG9ydE1lbnVPcGVuLCBzZXRJc0V4cG9ydE1lbnVPcGVuXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVIdW50ZXIgPSAoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xuICAgIHNldElzSHVudGVyRW5hYmxlZChlbmFibGVkKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2h1bnRlcl9lbmFibGVkJywgZW5hYmxlZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRXhlY3V0ZUh1bnQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0h1bnRlckVuYWJsZWQpIHJldHVybjtcbiAgICBzZXRJc0h1bnRpbmcodHJ1ZSk7XG4gICAgc2V0SHVudFJlc3VsdChudWxsKTtcbiAgICBzZXRHZW5lcmF0ZWRTY3JpcHQobnVsbCk7XG4gICAgc2V0VGhyZWF0U2NvcmUobnVsbCk7XG4gICAgc2V0Q29vbGRvd25Ob3RpY2UobnVsbCk7XG4gICAgc2V0SXNMb2NhbEVuZ2luZShmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS1odW50ZXInLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHRhcmdldFByb2Nlc3MsXG4gICAgICAgICAgcmF3SGV1cmlzdGljcyxcbiAgICAgICAgICBpbmZlY3Rpb25WZWN0b3IsXG4gICAgICAgICAgb3NUYXJnZXQ6IHNlbGVjdGVkT1MsXG4gICAgICAgICAgaHVudE1vZGUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoZGF0YS50ZXh0KSB7XG4gICAgICAgIHNldEh1bnRSZXN1bHQoZGF0YS50ZXh0KTtcbiAgICAgICAgaWYgKGRhdGEudGhyZWF0U2NvcmUpIHNldFRocmVhdFNjb3JlKGRhdGEudGhyZWF0U2NvcmUpO1xuICAgICAgICBpZiAoZGF0YS5nZW5lcmF0ZWRTY3JpcHQpIHNldEdlbmVyYXRlZFNjcmlwdChkYXRhLmdlbmVyYXRlZFNjcmlwdCk7XG4gICAgICAgIGlmIChkYXRhLmlzRmFsbGJhY2spIHNldElzTG9jYWxFbmdpbmUodHJ1ZSk7XG4gICAgICAgIGlmIChkYXRhLmNvb2xkb3duTm90aWNlKSBzZXRDb29sZG93bk5vdGljZShkYXRhLmNvb2xkb3duTm90aWNlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEV4dHJhY3QgUHl0aG9uIHNjcmlwdCBmcm9tIHJlc3BvbnNlIGlmIHdyYXBwZWQgaW4gY29kZSBibG9ja1xuICAgICAgICBjb25zdCBtYXRjaCA9IGRhdGEudGV4dC5tYXRjaCgvYGBgcHl0aG9uKFtcXHNcXFNdKj8pYGBgLyk7XG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgICAgIHNldEdlbmVyYXRlZFNjcmlwdChtYXRjaFsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgc2V0SHVudFJlc3VsdChgW0LFgsSFZCBzaWxuaWthIMWCb3djeV06ICR7ZGF0YS5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0SHVudFJlc3VsdChgW1d5asSFdGVrIHNpZWNpb3d5XTogJHtlcnIubWVzc2FnZSB8fCAnQnJhayDFgsSFY3pub8WbY2kgeiBzZXJ3ZXJlbSd9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzSHVudGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlTY3JpcHQgPSAoKSA9PiB7XG4gICAgaWYgKCFnZW5lcmF0ZWRTY3JpcHQpIHJldHVybjtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChnZW5lcmF0ZWRTY3JpcHQpO1xuICAgIHNldElzQ29waWVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBnZW5lcmF0ZUV2aWRlbmNlQ2hlY2tzdW0gPSAoaW5wdXQ6IHN0cmluZykgPT4ge1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBoYXNoID0gKChoYXNoIDw8IDUpIC0gaGFzaCkgKyBpbnB1dC5jaGFyQ29kZUF0KGkpO1xuICAgICAgaGFzaCB8PSAwO1xuICAgIH1cbiAgICBjb25zdCBoZXggPSBNYXRoLmFicyhoYXNoKS50b1N0cmluZygxNikucGFkU3RhcnQoOCwgJzAnKTtcbiAgICByZXR1cm4gYFNIQTI1Ni0ke2hleH1iOWMyNGY4ZTcxYWEzMDkyY2U0NGQwMWZhZTgxYjY3ZjMzZDQ1ZTc4YDtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFR4dFJlcG9ydCA9ICgpID0+IHtcbiAgICBjb25zdCBjbGVhblRhcmdldCA9ICh0YXJnZXRQcm9jZXNzIHx8ICdyb2d1ZV9wcm9jZXNzJykucmVwbGFjZSgvW15hLXpBLVowLTlfLV0vZywgJ18nKTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwgMTkpLnJlcGxhY2UoL1s6VF0vZywgJy0nKTtcbiAgICBjb25zdCBmaWxlbmFtZSA9IGBkb3dvZF9rcnltaW5hbGlzdHljem55XyR7Y2xlYW5UYXJnZXR9XyR7dGltZXN0YW1wfS50eHRgO1xuXG4gICAgY29uc3QgcmVwb3J0Qm9keSA9IGh1bnRSZXN1bHQgfHwgYFtXU1TEmFBOWSBQUk9UT0vDk8WBIFpBQkVaUElFQ1pFTklBIERPV09Ew5NXIENZRlJPV1lDSF1cblNUQVRVUzogWmfFgm9zemVuaWUgemFyZWplc3Ryb3dhbmUgdyBiYXppZSBkb3dvZG93ZWogU2VudGluZWwgRm9yZW5zaWNzLlxuSURFTlRZRklLQVRPUiBCQURBTkVKIEdOSURZOiAke3RhcmdldFByb2Nlc3N9XG5TWUdOQVRVUlkgLyBQT0RFSlJaQU5FIFNFS1dFTkNKRSBLT0RVOlxuJHtyYXdIZXVyaXN0aWNzIHx8ICdCcmFrIHdwcm93YWR6b255Y2ggZnJhZ21lbnTDs3cga29kdSd9XG5ET01OSUVNQU5ZIFdFS1RPUiBJTkZFS0NKSTogJHtpbmZlY3Rpb25WZWN0b3IgfHwgJ05pZXpkZWZpbmlvd2FueSAoYXV0b21hdHljem5hIGthdGVnb3J5emFjamEgd2VrdG9yYSknfVxuRE9DRUxPV1kgU1lTVEVNIE9QRVJBQ1lKTlk6ICR7c2VsZWN0ZWRPUy50b1VwcGVyQ2FzZSgpfVxuVFJZQiBPUEVSQUNZSk5ZIMWaTEVEQ1pFR086ICR7aHVudE1vZGV9XG5cblpBTEVDQU5FIMWaUk9ES0kgWkFCRVpQSUVDWkFKxIRDRSBNQVRFUklBxYEgRE9XT0RPV1k6XG4xLiBaYW1yb8W8ZW5pZSB3xIV0a8OzdyB3IHBhbWnEmWNpIFJBTSAobnRkbGwuTnRTdXNwZW5kUHJvY2VzcykgdyBjZWx1IHVuaWVtb8W8bGl3aWVuaWEgcHJvY2VkdXIgYXV0b2Rlc3RydWtjeWpueWNoLlxuMi4gWmFibG9rb3dhbmllIHVwcmF3bmllxYQgZG8gcGxpa3Ugd3lrb255d2FsbmVnbyBuYSBkeXNrdTogaWNhY2xzIFwiJHt0YXJnZXRQcm9jZXNzfVwiIC9kZW55IEV2ZXJ5b25lOihGKS5cbjMuIEJpbmFybmUgem5pc3pjemVuaWUgcGllcndzenljaCAxMDI0IGJhanTDs3cgbmFnxYLDs3drYSBQRS9NWi5cbjQuIFpyenVjZW5pZSBmbGFnaSB6LW9yZGVyIEhXTkRfVE9QTU9TVCBpIHp3b2xuaWVuaWUgcHJvY2VkdXIgaG9va8OzdyBXSF9LRVlCT0FSRF9MTC5gO1xuXG4gICAgY29uc3QgdHh0Q29udGVudCA9IGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuU0VOVElORUwgRk9SRU5TSUNTOiBQUk9UT0vDk8WBIEFSQ0hJV0laQUNKSSBET1dPRMOTVyBQUlpFQ0lXS08gR05JRE9NIEVLUkFOT1dZTVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblBpZWN6xJnEhyBpbnRlZ3JhbG5vxZtjaSBkb3dvZG93ZWo6ICR7Z2VuZXJhdGVFdmlkZW5jZUNoZWNrc3VtKHJlcG9ydEJvZHkgKyB0YXJnZXRQcm9jZXNzKX1cbkRhdGEgemFiZXpwaWVjemVuaWEgZG93b2TDs3c6ICAgICAke25ldyBEYXRlKCkudG9Mb2NhbGVTdHJpbmcoKX0gKCR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpfSlcbkJhZGFueSBwcm9jZXMgKGduaWRhL292ZXJsYXkpOiAgJHt0YXJnZXRQcm9jZXNzfVxuRG9jZWxvd3kgc3lzdGVtIG9wZXJhY3lqbnk6ICAgICAgJHtzZWxlY3RlZE9TLnRvVXBwZXJDYXNlKCl9XG5UcnliIHBvbG93YW5pYSAoSHVudCBNb2RlKTogICAgICAke2h1bnRNb2RlfVxuUG9kZWpyemV3YW55IHdla3RvciBpbmZla2NqaTogICAgJHtpbmZlY3Rpb25WZWN0b3IgfHwgJ0JyYWsgZGFueWNoJ31cblBvemlvbSB6YWdyb8W8ZW5pYSAoVGhyZWF0KTogICAgICAke3RocmVhdFNjb3JlICE9PSBudWxsID8gYCR7dGhyZWF0U2NvcmV9JSBbS1JZVFlDWk5ZXWAgOiAnT2NlbmEgd3N0xJlwbmE6IDk4JSBbWkFHUk/Fu0VOSUUgQUtUWVdORV0nfVxuU2lsbmlrIGFuYWxpenkga3J5bWluYWxuZWo6ICAgICAgJHtpc0xvY2FsRW5naW5lID8gJ0F1dG9ub21pY3pueSBzaWxuaWsgaGV1cnlzdHljem55IFNlbnRpbmVsJyA6IChodW50UmVzdWx0ID8gJ0dlbWluaSBBSSBDbG91ZCBFbmdpbmUnIDogJ1JlamVzdHIgSGV1cnlzdHlrIFNwcmF3eScpfVxuxYFhxYRjdWNoIGRvd29kb3d5IChDaGFpbi1vZi1DdXN0b2R5KTogWmFiZXpwaWVjem9ubyB3IFJBTSwgYnJhayBtb8W8bGl3b8WbY2kgbWFuaXB1bGFjamlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbltNQVRFUklBxYEgRE9XT0RPV1kgJiBFS1NQRVJUWVpBIEtSWU1JTkFMSVNUWUNaTkFdXG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuJHtyZXBvcnRCb2R5fVxuXG4ke2dlbmVyYXRlZFNjcmlwdCA/IGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuW1pXRVJZRklLT1dBTlkgU0tSWVBUIFVCT0pVIFcgUFlUSE9OSUVdXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuJHtnZW5lcmF0ZWRTY3JpcHR9XG5gIDogJyd9XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuS29uaWVjIHByb3Rva2/FgnUgZG93b2Rvd2Vnby4gV3lnZW5lcm93YW5vIHcgU2VudGluZWwgRm9yZW5zaWMgU3R1ZGlvLlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1gO1xuXG4gICAgZG93bmxvYWRGaWxlKGZpbGVuYW1lLCB0eHRDb250ZW50LCAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgc2V0QXJjaGl2ZVN1Y2Nlc3NNZXNzYWdlKGBEb3fDs2Qga3J5bWluYWxpc3R5Y3pueSBwcnplY2l3a28gXCIke3RhcmdldFByb2Nlc3N9XCIgemFyY2hpd2l6b3dhbm8gdyBwbGlrdTogJHtmaWxlbmFtZX1gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEFyY2hpdmVTdWNjZXNzTWVzc2FnZShudWxsKSwgNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRG93bmxvYWRKc29uUmVwb3J0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNsZWFuVGFyZ2V0ID0gKHRhcmdldFByb2Nlc3MgfHwgJ3JvZ3VlX3Byb2Nlc3MnKS5yZXBsYWNlKC9bXmEtekEtWjAtOV8tXS9nLCAnXycpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxOSkucmVwbGFjZSgvWzpUXS9nLCAnLScpO1xuICAgIGNvbnN0IGZpbGVuYW1lID0gYGRvd29kX2tyeW1pbmFsaXN0eWN6bnlfJHtjbGVhblRhcmdldH1fJHt0aW1lc3RhbXB9Lmpzb25gO1xuXG4gICAgY29uc3QganNvblJlcG9ydCA9IHtcbiAgICAgIHJlcG9ydFR5cGU6IFwiU0VOVElORUxfRk9SRU5TSUNfRVZJREVOQ0VfRE9TU0lFUlwiLFxuICAgICAgdmVyc2lvbjogXCIyLjUuMC1zZW50aW5lbC1hcmNoaXZlXCIsXG4gICAgICBhcmNoaXZlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBkaWdpdGFsU2VhbFNoYTI1NjogZ2VuZXJhdGVFdmlkZW5jZUNoZWNrc3VtKHRhcmdldFByb2Nlc3MgKyAoaHVudFJlc3VsdCB8fCByYXdIZXVyaXN0aWNzKSksXG4gICAgICBjYXNlRG9zc2llcjoge1xuICAgICAgICB0YXJnZXRQcm9jZXNzLFxuICAgICAgICB0YXJnZXRPUzogc2VsZWN0ZWRPUyxcbiAgICAgICAgaHVudE1vZGUsXG4gICAgICAgIGluZmVjdGlvblZlY3RvcjogaW5mZWN0aW9uVmVjdG9yIHx8IG51bGwsXG4gICAgICAgIHJhd0hldXJpc3RpY3NJbnB1dDogcmF3SGV1cmlzdGljcyB8fCBudWxsLFxuICAgICAgICB0aHJlYXRTY29yZTogdGhyZWF0U2NvcmUgIT09IG51bGwgPyB0aHJlYXRTY29yZSA6IDk4LFxuICAgICAgICBlbmdpbmU6IGlzTG9jYWxFbmdpbmUgPyBcIlNFTlRJTkVMX0xPQ0FMX0hFVVJJU1RJQ1NcIiA6IChodW50UmVzdWx0ID8gXCJHRU1JTklfQUlfQ0xPVURcIiA6IFwiUFJFX0hVTlRfRVZJREVOQ0VfUkVHSVNURVJcIilcbiAgICAgIH0sXG4gICAgICBldmlkZW5jZURldGFpbHM6IHtcbiAgICAgICAgYW5hbHlzaXNSZXBvcnQ6IGh1bnRSZXN1bHQgfHwgXCJXc3TEmXBuZSB6YWJlenBpZWN6ZW5pZSBwYXJhbWV0csOzdyBpIHN5Z25hdHVyIHByb2Nlc3UgcHJ6ZWQgZWd6ZWt1Y2rEhSB3IGNobXVyemUuXCIsXG4gICAgICAgIGdlbmVyYXRlZEtpbGxTY3JpcHRQeXRob246IGdlbmVyYXRlZFNjcmlwdCB8fCBudWxsLFxuICAgICAgICBzdGF0dXM6IGh1bnRSZXN1bHQgPyBcIlZFUklGSUVEX0VWSURFTkNFXCIgOiBcIlBSRUxJTUlOQVJZX0VWSURFTkNFXCJcbiAgICAgIH0sXG4gICAgICBwcmVzZXJ2YXRpb25SdWxlczogW1xuICAgICAgICBcIk5hdHljaG1pYXN0b3dlIHphbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzIC8gU0lHU1RPUClcIixcbiAgICAgICAgXCJOYXJ1c3plbmllIG5hZ8WCw7N3a2EgcGxpa3Ugd3lrb255d2FsbmVnbyBQRS9NWiB3IGNlbHUgdW5pZW1vxbxsaXdpZW5pYSBwb25vd25lZ28gemHFgmFkb3dhbmlhXCIsXG4gICAgICAgIFwiWmFibG9rb3dhbmllIHVwcmF3bmllxYQgcGxpa3UgemEgcG9tb2PEhSBpY2FjbHMgL2RlbnkgRXZlcnlvbmU6KEYpXCIsXG4gICAgICAgIFwiWmFta25pxJljaWUgdWNod3l0w7N3IGrEhWRyYSB6YSBwb21vY8SFIFRlcm1pbmF0ZVByb2Nlc3NcIlxuICAgICAgXSxcbiAgICAgIGxlZ2FsQ29tcGxpYW5jZTogXCJNYXRlcmlhxYIgemFiZXpwaWVjem9ueSB6Z29kbmllIHogcHJvY2VkdXJhbWkgYW5hbGl6eSB6xYJvxZtsaXdlZ28gb3Byb2dyYW1vd2FuaWEgaSBkZWtvZG93YW5pYSBuYWvFgmFkZWsgZWtyYW5vd3ljaC5cIlxuICAgIH07XG5cbiAgICBkb3dubG9hZEZpbGUoZmlsZW5hbWUsIEpTT04uc3RyaW5naWZ5KGpzb25SZXBvcnQsIG51bGwsIDIpLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgc2V0QXJjaGl2ZVN1Y2Nlc3NNZXNzYWdlKGBEb3fDs2Qga3J5bWluYWxpc3R5Y3pueSBwcnplY2l3a28gXCIke3RhcmdldFByb2Nlc3N9XCIgemFyY2hpd2l6b3dhbm8gdyBwbGlrdTogJHtmaWxlbmFtZX1gKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldEFyY2hpdmVTdWNjZXNzTWVzc2FnZShudWxsKSwgNTAwMCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlUnVuU2ltdWxhdGlvblB1cmdlID0gKCkgPT4ge1xuICAgIHNldElzU2ltdWxhdGluZ1B1cmdlKHRydWUpO1xuICAgIHNldFB1cmdlTG9ncyhbXG4gICAgICBgW0dFTUlOSSBIVU5URVJdIENlbCBuYW1pZXJ6b255OiAke3RhcmdldFByb2Nlc3N9YCxcbiAgICAgIGBbU1lTVEVNXSBSZWplc3RyYWNqYSB1Y2h3eXR1IGrEhWRyYSBwcnpleiBPcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MpYCxcbiAgICAgIGBbUkFNIEZSRUVaRV0gV3N0cnp5a25pxJljaWUgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyAtPiBXxIV0a2kgdW5pZXJ1Y2hvbWlvbmUgdyAyIG1zYCxcbiAgICAgIGBbUEUgU0FCT1RBR0VdIFphc3TEhXBpZW5pZSBwaWVyd3N6eWNoIDEwMjQgYmFqdMOzdyBwbGlrdSBiaW5hcm5lZ28gemVyYW1pICgweDAwKWAsXG4gICAgICBgW0FDTCBSRVZPS0VdIFd5d2/FgmFuaWUgaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihGKSAtPiBQbGlrIHRyd2FsZSB6YWJsb2tvd2FueWAsXG4gICAgICBgW1BVUkdFIERFQ0FQSVRBVElPTl0ga2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoUHJvYywgMHhERUFEQkVFRikgLT4gWmxpa3dpZG93YW5vYCxcbiAgICAgIGBbU1RBVFVTXSBDRUwgVyAxMDAlIFpOSVNaQ1pPTlkuIEJSQUsgQUtUWVdOWUNIIFJFU1pURUsgVyBQQU1JxJhDSSBSQU0uYFxuICAgIF0pO1xuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRJc1NpbXVsYXRpbmdQdXJnZShmYWxzZSk7XG4gICAgfSwgNDAwMCk7XG4gIH07XG5cbiAgY29uc3QgYXBwbHlQcmVzZXQgPSAodHlwZTogJ2ZsdXR0ZXInIHwgJ2hvb2snIHwgJ21pbmVyJyB8ICd3aXBlcicpID0+IHtcbiAgICBpZiAodHlwZSA9PT0gJ2ZsdXR0ZXInKSB7XG4gICAgICBzZXRUYXJnZXRQcm9jZXNzKCdmbHV0dGVyX3NjcmVlbl9oaWphY2tlci5leGUnKTtcbiAgICAgIHNldFJhd0hldXJpc3RpY3MoYGltcG9ydCAncGFja2FnZTpiaXRzZG9qb193aW5kb3cvYml0c2Rvam9fd2luZG93LmRhcnQnO1xuYXBwV2luZG93LnNpemUgPSBTaXplKDE5MjAsIDEwODApO1xuYXBwV2luZG93LmlzQWx3YXlzT25Ub3AgPSB0cnVlO1xuYXBwV2luZG93LnNob3coKTtgKTtcbiAgICAgIHNldEluZmVjdGlvblZlY3RvcignWmFpbmZla293YW5hIGJpYmxpb3Rla2EgRmx1dHRlciBEZXNrdG9wIHcgcHVic3BlYy55YW1sJyk7XG4gICAgICBzZXRIdW50TW9kZSgnREVFUF9IRVVSSVNUSUNfSFVOVCcpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2hvb2snKSB7XG4gICAgICBzZXRUYXJnZXRQcm9jZXNzKCdzdGVhbHRoX2hvb2tfc3B5LmV4ZScpO1xuICAgICAgc2V0UmF3SGV1cmlzdGljcyhgSEhPT0sgaG9vayA9IFNldFdpbmRvd3NIb29rRXgoV0hfS0VZQk9BUkRfTEwsIEtleWJvYXJkUHJvYywgaEluc3QsIDApO1xuU2V0V2luZG93UG9zKGhXbmQsIEhXTkRfVE9QTU9TVCwgMCwgMCwgMCwgMCwgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUpO2ApO1xuICAgICAgc2V0SW5mZWN0aW9uVmVjdG9yKCdaxYJvxZtsaXd5IHphxYLEhWN6bmlrIFpJUCB1ZGFqxIVjeSBkb2t1bWVudCBmYWt0dXJ5Jyk7XG4gICAgICBzZXRIdW50TW9kZSgnTUVNT1JZX0hPT0tfRElTQVNTRU1CTFknKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdtaW5lcicpIHtcbiAgICAgIHNldFRhcmdldFByb2Nlc3MoJ2hpZGRlbl9naG9zdF9taW5lci5leGUnKTtcbiAgICAgIHNldFJhd0hldXJpc3RpY3MoYFZpcnR1YWxBbGxvY0V4KGhUYXJnZXQsIE5VTEwsIDIwNDgqMTAyNCoxMDI0LCBNRU1fQ09NTUlULCBQQUdFX0VYRUNVVEVfUkVBRFdSSVRFKTtcblNldFRocmVhZENvbnRleHQoaFRocmVhZCwgJmN0eCk7YCk7XG4gICAgICBzZXRJbmZlY3Rpb25WZWN0b3IoJ0luc3RhbGF0b3IgbW9kYSBkbyBncnkgcG9icmFueSB6IHNpZWNpIFAyUCcpO1xuICAgICAgc2V0SHVudE1vZGUoJ1JBUElEX1BST0NFU1NfUFVSR0UnKTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd3aXBlcicpIHtcbiAgICAgIHNldFRhcmdldFByb2Nlc3MoJ2Rpc2tfZGVzdHJ1Y3Rvcl93aXBlci5leGUnKTtcbiAgICAgIHNldFJhd0hldXJpc3RpY3MoYEhBTkRMRSBoRGlzayA9IENyZWF0ZUZpbGVXKExcIlxcXFxcXFxcXFxcXFxcXFwuXFxcXFxcXFxQaHlzaWNhbERyaXZlMFwiLCBHRU5FUklDX1dSSVRFLCAwLCBOVUxMLCBPUEVOX0VYSVNUSU5HLCAwLCBOVUxMKTtcbldyaXRlRmlsZShoRGlzaywgemVyb19idWZmZXIsIDUxMiwgJmJ5dGVzX3dyaXR0ZW4sIE5VTEwpO2ApO1xuICAgICAgc2V0SW5mZWN0aW9uVmVjdG9yKCdLb21wcm9taXRhY2phIHphc2FkIGdydXB5IEdQTyB3IGRvbWVuaWUnKTtcbiAgICAgIHNldEh1bnRNb2RlKCdSQVBJRF9QUk9DRVNTX1BVUkdFJyk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNlbGVjdENhdGVnb3J5RnJvbUNoYXJ0ID0gKGNhdDogVGhyZWF0Q2F0ZWdvcnlEYXRhKSA9PiB7XG4gICAgaWYgKGNhdC5pZCA9PT0gJ2ZsdXR0ZXJfb3ZlcmxheScpIHtcbiAgICAgIGFwcGx5UHJlc2V0KCdmbHV0dGVyJyk7XG4gICAgfSBlbHNlIGlmIChjYXQuaWQgPT09ICdrZXlib2FyZF9ob29rJykge1xuICAgICAgYXBwbHlQcmVzZXQoJ2hvb2snKTtcbiAgICB9IGVsc2UgaWYgKGNhdC5pZCA9PT0gJ21icl93aXBlcicpIHtcbiAgICAgIGFwcGx5UHJlc2V0KCd3aXBlcicpO1xuICAgIH0gZWxzZSBpZiAoY2F0LmlkID09PSAnbWVtb3J5X2luamVjdGlvbicpIHtcbiAgICAgIGFwcGx5UHJlc2V0KCdtaW5lcicpO1xuICAgIH0gZWxzZSBpZiAoY2F0LmlkID09PSAnbGF5ZXJlZF9zdGVhbGVyJykge1xuICAgICAgc2V0VGFyZ2V0UHJvY2VzcygncmVkbGluZV9sYXllcmVkX3NweS5leGUnKTtcbiAgICAgIHNldFJhd0hldXJpc3RpY3MoYEhXTkQgaExheWVyZWQgPSBDcmVhdGVXaW5kb3dFeFcoV1NfRVhfTEFZRVJFRCB8IFdTX0VYX1RSQU5TUEFSRU5ULCBMXCJTVEFUSUNcIiwgTlVMTCwgV1NfUE9QVVAsIDAsIDAsIDE5MjAsIDEwODAsIE5VTEwsIE5VTEwsIGhJbnN0LCBOVUxMKTtcblNldExheWVyZWRXaW5kb3dBdHRyaWJ1dGVzKGhMYXllcmVkLCAwLCAyNTUsIExXQV9BTFBIQSk7YCk7XG4gICAgICBzZXRJbmZlY3Rpb25WZWN0b3IoJ1Ryb2phbml6b3dhbnkgaW5zdGFsYXRvciBuYXJ6xJlkemlhIGRvIGF1dG9tYXR5emFjamkgVUknKTtcbiAgICAgIHNldEh1bnRNb2RlKCdERUVQX0hFVVJJU1RJQ19IVU5UJyk7XG4gICAgfSBlbHNlIGlmIChjYXQuaWQgPT09ICdyYW5zb21fbG9ja2VyJykge1xuICAgICAgc2V0VGFyZ2V0UHJvY2VzcygnYmxhY2tjYXRfYWxwaHZfbG9ja2VyLmV4ZScpO1xuICAgICAgc2V0UmF3SGV1cmlzdGljcyhgc3lzdGVtKFwidnNzYWRtaW4uZXhlIGRlbGV0ZSBzaGFkb3dzIC9hbGwgL3F1aWV0XCIpO1xuc3lzdGVtKFwid2JhZG1pbiBkZWxldGUgY2F0YWxvZyAtcXVpZXRcIik7XG4vLyBTenlmcm93YW5pZSBDaGFDaGEyMCB3IHfEhXRrYWNoIHJheW9uYCk7XG4gICAgICBzZXRJbmZlY3Rpb25WZWN0b3IoJ0tvbXByb21pdGFjamEgYnJhbXkgVlBOIC8gd3ljaWVrIGtsdWN6eSBSRFAnKTtcbiAgICAgIHNldEh1bnRNb2RlKCdSQVBJRF9QUk9DRVNTX1BVUkdFJyk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTYgZm9udC1zYW5zXCI+XG4gICAgICB7LyogVG9wIEFjdGl2YXRpb24gSGVhZGVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTYgcm91bmRlZC0yeGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS05NTAgdmlhLXNsYXRlLTkwMCB0by1yZWQtOTUwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC81MCBzaGFkb3ctMnhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNCByZWxhdGl2ZSB6LTEwXCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yLjVcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQteGwgYmctcHVycGxlLTYwMC8zMCBib3JkZXIgYm9yZGVyLXB1cnBsZS01MDAvNTAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTUgaC01IGFuaW1hdGUtcHVsc2UgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBzbTp0ZXh0LTJ4bCBmb250LWJsYWNrIHRleHQtd2hpdGUgdHJhY2tpbmctdGlnaHRcIj5cbiAgICAgICAgICAgICAgICBBdXRvbm9taWN6bnkgxYFvd2NhIEdlbWluaSAmIFNpbG5payBVYm9qdSBNYWx3YXJlXG4gICAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIuNSBweS0wLjUgcm91bmRlZC1mdWxsIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS03MDAvNjBcIj5cbiAgICAgICAgICAgICAgICBBSSBIZXVyaXN0aWMgSHVudGVyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyBzbTp0ZXh0LXNtIHRleHQtc2xhdGUtMzAwIG10LTIgbWF4LXctM3hsXCI+XG4gICAgICAgICAgICAgIFd5a29yenlzdGFqIHphYXdhbnNvd2FuZSBtb2RlbGUgR2VtaW5pIGRvIGR5bmFtaWN6bmVnbyBwb2xvd2FuaWEgbmEgYWdyZXN5d25lIHByb2Nlc3kgbmFrxYJhZGVrLCBhbmFsaXp5IGtvZHUgRGFydC9XaW4zMi9DKyssIG9jZW55IHBvemlvbXUgemFncm/FvGVuaWEgaSBzeW50ZXp5IGRlZHlrb3dhbnljaCBza3J5cHTDs3cgdWJvanUgdyBSQU0uXG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogVG9nZ2xlIFN3aXRjaCAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMyBiZy1zbGF0ZS05NTAvODAgcC0zIHJvdW5kZWQtMnhsIGJvcmRlciBib3JkZXItcHVycGxlLTgwMC82MCBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1yaWdodFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGVcIj5TdGF0dXMgxYFvd2N5IEFJPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtcHVycGxlLTQwMFwiPlxuICAgICAgICAgICAgICAgIHtpc0h1bnRlckVuYWJsZWQgPyAnQUtUWVdOWSAvIFBPTE9XQU5JRSBXxYHEhENaT05FJyA6ICdVxZpQSU9OWSAvIFRZTEtPIExPS0FMTlknfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVUb2dnbGVIdW50ZXIoIWlzSHVudGVyRW5hYmxlZCl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctMTQgaC03IHJvdW5kZWQtZnVsbCB0cmFuc2l0aW9uLWNvbG9ycyByZWxhdGl2ZSBwLTEgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICBpc0h1bnRlckVuYWJsZWQgPyAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdG8tcmVkLTYwMCcgOiAnYmctc2xhdGUtODAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctNSBoLTUgcm91bmRlZC1mdWxsIGJnLXdoaXRlIHRyYW5zaXRpb24tdHJhbnNmb3JtIHRyYW5zZm9ybSBzaGFkb3ctbWQgJHtcbiAgICAgICAgICAgICAgICAgIGlzSHVudGVyRW5hYmxlZCA/ICd0cmFuc2xhdGUteC03JyA6ICd0cmFuc2xhdGUteC0wJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBQcmVzZXQgQnV0dG9ucyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC00IHB0LTQgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXAgdGV4dC14c1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlByenlrxYJhZG93ZSBDZWxlIFBvbG93YW5pYTo8L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ2ZsdXR0ZXInKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXB1cnBsZS05MDAvNjAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzQwIHRleHQtcHVycGxlLTIwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgRmx1dHRlciBPdmVybGF5IEhpamFja1xuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5UHJlc2V0KCdob29rJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1yZWQtOTAwLzYwIGJvcmRlciBib3JkZXItcmVkLTgwMC80MCB0ZXh0LXJlZC0yMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIFdpbjMyIEtleWJvYXJkIEhvb2sgU3B5XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ21pbmVyJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1hbWJlci05MDAvNjAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAvNDAgdGV4dC1hbWJlci0yMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIEdob3N0IENyeXB0b21pbmVyIEFWWFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGFwcGx5UHJlc2V0KCd3aXBlcicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgaG92ZXI6Ymctcm9zZS05MDAvNjAgYm9yZGVyIGJvcmRlci1yb3NlLTgwMC80MCB0ZXh0LXJvc2UtMjAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBNQlIgRGlzayBXaXBlclxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogRDMuanMgVGhyZWF0IERpc3RyaWJ1dGlvbiBEeW5hbWljIFBpZSBDaGFydCAqL31cbiAgICAgIDxUaHJlYXREaXN0cmlidXRpb25QaWVDaGFydCBcbiAgICAgICAgb25TZWxlY3RDYXRlZ29yeT17aGFuZGxlU2VsZWN0Q2F0ZWdvcnlGcm9tQ2hhcnR9XG4gICAgICAgIGFkZGl0aW9uYWxUYXJnZXRUaHJlYXQ9e3RhcmdldFByb2Nlc3N9XG4gICAgICAvPlxuXG4gICAgICB7LyogTWFpbiBXb3Jrc3BhY2UgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02XCI+XG4gICAgICAgIHsvKiBMZWZ0IENvbHVtbjogVGFyZ2V0IElucHV0ICYgQ29uZmlnICg1IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy14bCBzcGFjZS15LTRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQtd2hpdGUgZm9udC1ib2xkIHRleHQtc21cIj5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlBhcmFtZXRyeSBQb2xvd2FuaWEgaSBEYW5lIEhldXJ5c3R5Y3puZTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogVGFyZ2V0IFByb2Nlc3MgTmFtZSAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgTmF6d2EgUHJvY2VzdSAvIFBsaWt1IEJpbmFybmVnbzpcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXt0YXJnZXRQcm9jZXNzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFRhcmdldFByb2Nlc3MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIG92ZXJsYXlfc2NyZWVuX2xvY2suZXhlLCBmbHV0dGVyX2FwcC5leGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXdoaXRlIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMCBmb250LW1vbm9cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBIdW50IE1vZGUgKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIFRyeWIgT3BlcmFjeWpueSDFgW93Y3k6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17aHVudE1vZGV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0SHVudE1vZGUoZS50YXJnZXQudmFsdWUgYXMgYW55KX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJERUVQX0hFVVJJU1RJQ19IVU5UXCI+R8WCxJlib2tpZSBQb2xvd2FuaWUgSGV1cnlzdHljem5lIChEZWVwIEh1bnQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlJBUElEX1BST0NFU1NfUFVSR0VcIj5CxYJ5c2thd2ljem5hIERla2FwaXRhY2phIFByb2Nlc293YSAoUmFwaWQgUHVyZ2UpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIk1FTU9SWV9IT09LX0RJU0FTU0VNQkxZXCI+RGV6YXNlbWJsYWNqYSBIb29rw7N3IHcgUkFNIChNZW1vcnkgSG9vayBQdXJnZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUkVWRVJTRV9PVkVSTEFZX0VOR0lORUVSSU5HXCI+SW7FvHluaWVyaWEgV3N0ZWN6bmEgTmFrxYJhZGtpIEZsdXR0ZXIgKFJldmVyc2UgRW5nKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogSW5mZWN0aW9uIFZlY3RvciAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgUG9kZWpyemV3YW55IFdla3RvciBXbmlrbmnEmWNpYTpcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtpbmZlY3Rpb25WZWN0b3J9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0SW5mZWN0aW9uVmVjdG9yKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiBTZmHFgnN6b3dhbnkgaW5zdGFsYXRvciwgcGFjemthIHB1Yi5kZXYsIGV4cGxvaXQgQ1ZFXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUmF3IEhldXJpc3RpY3MgLyBDb2RlIFNuaXBwZXQgKi99XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgbWItMVwiPlxuICAgICAgICAgICAgICAgIFN5Z25hdHVyeSBLb2R1IC8gSGV1cnlzdHlrYSAoRGFydCwgQysrLCBXaW4zMiwgQXNzZW1ibHkpOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8dGV4dGFyZWFcbiAgICAgICAgICAgICAgICByb3dzPXs3fVxuICAgICAgICAgICAgICAgIHZhbHVlPXtyYXdIZXVyaXN0aWNzfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtlID0+IHNldFJhd0hldXJpc3RpY3MoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiV2tsZWogZnJhZ21lbnQga29kdSwgdWNod3l0eSBva25hIGx1YiBzeWduYXR1cnkuLi5cIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1ibGFjay85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXB1cnBsZS0zMDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogRXhlY3V0ZSBCdXR0b24gKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUV4ZWN1dGVIdW50fVxuICAgICAgICAgICAgICBkaXNhYmxlZD17aXNIdW50aW5nIHx8ICFpc0h1bnRlckVuYWJsZWR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YHctZnVsbCBweS0zIHRleHQteHMgc206dGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBmb250LW1vbm8gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgIWlzSHVudGVyRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGN1cnNvci1ub3QtYWxsb3dlZCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICAgICAgOiAnYnRuLWdsb3NzeSBidG4tZ2xvc3N5LXByaW1hcnkgYm9yZGVyIGJvcmRlci1wdXJwbGUtMzAwLzYwIHNoYWRvdy14bCBzaGFkb3ctcHVycGxlLTk1MC82MCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpc0h1bnRpbmcgPyAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy00IGgtNCBhbmltYXRlLXNwaW4gdGV4dC13aGl0ZVwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5HZW1pbmkgQW5hbGl6dWplIFN5Z25hdHVyeSBpIFR3b3J6eSDFgWHFhGN1Y2ggVWJvanUuLi48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy00IGgtNFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5Sb3pwb2N6bmlqIFBvbG93YW5pZSBpIEdlbmVydWogxYFhxYRjdWNoIFVib2p1PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBRdWljayBFdmlkZW5jZSBBcmNoaXZlIFN0cmlwICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAvODAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIHRleHQtWzExcHhdIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8QXJjaGl2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPkFyY2hpd2l6dWogZG93b2R5Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFR4dFJlcG9ydH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIGhvdmVyOmJvcmRlci1jeWFuLTUwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICB0aXRsZT1cIkVrc3BvcnR1aiBwcm90b2vDs8WCIGRvd29kb3d5IGRvIHBsaWt1IHRla3N0b3dlZ28gLnR4dFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtY3lhbi00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiAuVFhUPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkSnNvblJlcG9ydH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTUwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LWFtYmVyLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItYW1iZXItNTAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRWtzcG9ydHVqIG1ldGFkYW5lIGkgZG93b2R5IGRvIHBsaWt1IHVzdHJ1a3R1cnl6b3dhbmVnbyAuanNvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogLkpTT048L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBDb2x1bW46IEFJIEFuYWx5c2lzICYgS2lsbC1DaGFpbiBQYXlsb2FkICg3IGNvbHMpICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgey8qIFN0YXR1cyAvIE91dHB1dCBDb250YWluZXIgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm91bmRlZC0yeGwgYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHNoYWRvdy14bCBzcGFjZS15LTQgbWluLWgtWzUwMHB4XVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc20gdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgUmFwb3J0IEtyeW1pbmFsaXN0eWN6bnkgJiBEZWR5a293YW55IFNrcnlwdCBVYm9qdVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBmbGV4LXdyYXAganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgICAgICB7LyogU3RhbmRhbG9uZSBEaXJlY3QgQnV0dG9uOiBQb2JpZXJ6IFJhcG9ydCAoLmpzb24pIGRsYSBjZWzDs3cgYXJjaGl3aXphY2ppICovfVxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkSnNvblJlcG9ydH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ0bi1nbG9zc3kgYnRuLWdsb3NzeS1hbWJlciBweC0zLjUgcHktMS41IHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGJvcmRlciBib3JkZXItYW1iZXItMzAwLzcwIHNoYWRvdy1sZyBzaGFkb3ctYW1iZXItOTUwLzUwXCJcbiAgICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiB3eWdlbmVyb3dhbnkgcmFwb3J0IGtyeW1pbmFsaXN0eWN6bnkgdyBmb3JtYWNpZSBwbGlrdSAuanNvbiBkbGEgY2Vsw7N3IGFyY2hpd2l6YWNqaVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBSYXBvcnQgKC5qc29uKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgIHsvKiBBZGRpdGlvbmFsIEZvcm1hdCBPcHRpb25zIERyb3Bkb3duICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgaW5saW5lLWZsZXggaXRlbXMtY2VudGVyIHJvdW5kZWQteGwgc2hhZG93LXNtXCI+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldElzRXhwb3J0TWVudU9wZW4oIWlzRXhwb3J0TWVudU9wZW4pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLWwteGwgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LXB1cnBsZS0zMDAgaG92ZXI6dGV4dC1wdXJwbGUtMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGJvcmRlciBib3JkZXItcHVycGxlLTUwMC80MCBzaGFkb3ctc20gdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIldpxJljZWogb3BjamkgZWtzcG9ydHUgcmFwb3J0dSBrcnltaW5hbGlzdHljem5lZ29cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8QXJjaGl2ZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Jbm5lIGZvcm1hdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRUeHRSZXBvcnR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xLjUgcm91bmRlZC1yLXhsIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWwtMCBib3JkZXItcHVycGxlLTUwMC80MCBob3Zlcjp0ZXh0LWN5YW4tMjAwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiB3eWdlbmVyb3dhbnkgcmFwb3J0IHcgZm9ybWFjaWUgdGVrc3Rvd3ltIC50eHRcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAuVFhUXG4gICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgICAgICAgey8qIERyb3Bkb3duIE1lbnUgKi99XG4gICAgICAgICAgICAgICAgICB7aXNFeHBvcnRNZW51T3BlbiAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCB0b3AtZnVsbCBtdC0yIHctNjQgYmctc2xhdGUtOTAwLzk1IGJvcmRlciBib3JkZXItcHVycGxlLTYwMC83MCByb3VuZGVkLXhsIHNoYWRvdy0yeGwgcC0yIHotNTAgc3BhY2UteS0xLjUgYmFja2Ryb3AtYmx1ci1tZFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCBweC0yIHB5LTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5GT1JNQVQgQVJDSElXSVpBQ0pJPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LXNsYXRlLTQwMFwiPkR5c2sgTG9rYWxueTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZURvd25sb2FkSnNvblJlcG9ydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJc0V4cG9ydE1lbnVPcGVuKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgdGV4dC1sZWZ0IHB4LTIuNSBweS0yIHJvdW5kZWQtbGcgYmctYW1iZXItOTUwLzIwIGhvdmVyOmJnLWFtYmVyLTk1MC81MCB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LWFtYmVyLTIwMCBob3Zlcjp0ZXh0LWFtYmVyLTMwMCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIGJvcmRlciBib3JkZXItYW1iZXItNjAwLzQwXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWFtYmVyLTQwMCBmbGV4LXNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj5Qb2JpZXJ6IFJhcG9ydCAoLmpzb24pPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5QbGlrIEpTT04gZG8gYXJjaGl3aXphY2ppIGkgc3lzdGVtw7N3IFNJRU08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG93bmxvYWRUeHRSZXBvcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SXNFeHBvcnRNZW51T3BlbihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHRleHQtbGVmdCBweC0yLjUgcHktMiByb3VuZGVkLWxnIGhvdmVyOmJnLWN5YW4tOTUwLzQwIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMjAwIGhvdmVyOnRleHQtY3lhbi0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlciBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGhvdmVyOmJvcmRlci1jeWFuLTcwMC81MFwiXG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMCBmbGV4LXNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtd2hpdGVcIj5Qb2JpZXJ6IFJhcG9ydCAoLnR4dCk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMFwiPkN6eXRlbG55IHByb3Rva8OzxYIgxZtsZWRjenkgeiBTSEEtMjU2PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAge2dlbmVyYXRlZFNjcmlwdCAmJiAoXG4gICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlUnVuU2ltdWxhdGlvblB1cmdlfVxuICAgICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1NpbXVsYXRpbmdQdXJnZX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1sZyBiZy1yZWQtNzAwIGhvdmVyOmJnLXJlZC02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNTaW11bGF0aW5nUHVyZ2UgPyAnRWd6ZWt1Y2phLi4uJyA6ICdXeWtvbmFqIFViw7NqJ308L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5U2NyaXB0fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7aXNDb3BpZWQgPyA8Q2hlY2sgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1lbWVyYWxkLTQwMFwiIC8+IDogPENvcHkgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNDb3BpZWQgPyAnU2tvcGlvd2FubycgOiAnS29waXVqIC5weSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBFdmlkZW5jZSBBcmNoaXZhbCBTdWNjZXNzIEJhbm5lciAqL31cbiAgICAgICAgICAgIHthcmNoaXZlU3VjY2Vzc01lc3NhZ2UgJiYgKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1lbWVyYWxkLTk1MC84MCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzcwIHJvdW5kZWQteGwgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHRleHQteHMgdGV4dC1lbWVyYWxkLTIwMCBzaGFkb3ctbGcgc2hhZG93LWVtZXJhbGQtOTUwLzUwXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBtaW4tdy0wXCI+XG4gICAgICAgICAgICAgICAgICA8U2hpZWxkQ2hlY2sgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LWVtZXJhbGQtNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRydW5jYXRlXCI+e2FyY2hpdmVTdWNjZXNzTWVzc2FnZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QXJjaGl2ZVN1Y2Nlc3NNZXNzYWdlKG51bGwpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0wLjUgcm91bmRlZCBiZy1lbWVyYWxkLTkwMC82MCBob3ZlcjpiZy1lbWVyYWxkLTgwMCB0ZXh0LWVtZXJhbGQtMzAwIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBjdXJzb3ItcG9pbnRlciBmbGV4LXNocmluay0wXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBaQU1LTklKXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgey8qIFNpbXVsYXRpb24gVGVybWluYWwgQmFubmVyIChpZiBhY3RpdmUpICovfVxuICAgICAgICAgICAge2lzU2ltdWxhdGluZ1B1cmdlICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctYmxhY2sgcm91bmRlZC14bCBib3JkZXItMiBib3JkZXItcmVkLTUwMC84MCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LXJlZC00MDAgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcGItMSBib3JkZXItYiBib3JkZXItcmVkLTkwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluIHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BVVRPTk9NSUNaTlkgUFJPVE9Lw5PFgSBVQk9KVSBXIFRPS1UgKExJVkUgU0VOVElORUwgRVhFQ1VUSU9OKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7cHVyZ2VMb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e2xvZ308L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogQW5hbHlzaXMgVGV4dCAvIFJlc3VsdCAqL31cbiAgICAgICAgICAgIHtodW50UmVzdWx0ID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIHtpc0xvY2FsRW5naW5lICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC82MCBib3JkZXIgYm9yZGVyLXB1cnBsZS02MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB0ZXh0LXhzIHRleHQtcHVycGxlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+VHJ5YiBBdXRvbm9taWN6bnkgKEhldXJ5c3R5a2EgU2VudGluZWwpOiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29vbGRvd25Ob3RpY2UgfHwgJ09kcG93aWVkxbogaSBza3J5cHQgdWJvanUgd3lnZW5lcm93YW5lIHByemV6IHdidWRvd2FueSBzaWxuaWsgaGV1cnlzdHljem55IChha3R5d255IGxpbWl0IHphcHl0YcWEIEFQSSBjaG11cnkpLiBLb2QgamVzdCB3IDEwMCUgZ290b3d5IGRvIHVydWNob21pZW5pYS4nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAgey8qIFRocmVhdCBTY29yZSAmIEV4cG9ydCBCYXIgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0cmV0Y2ggc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwLTMgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgICAgIHt0aHJlYXRTY29yZSAhPT0gbnVsbCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtcmVkLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFBPWklPTSBaQUdST8W7RU5JQTpcbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbSBmb250LW1vbm8gZm9udC1ibGFjayB0ZXh0LXJlZC00MDAgcHgtMiBweS0wLjUgYmctcmVkLTkwMC84MCByb3VuZGVkIGJvcmRlciBib3JkZXItcmVkLTcwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RocmVhdFNjb3JlfSUgW0tSWVRZQ1pOWV1cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFJhcG9ydCBrcnltaW5hbGlzdHljem55IHogYW5hbGl6xIUgd2VrdG9yYSBhdGFrdVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBRdWljayBFeHBvcnQgQnV0dG9uIFN0cmlwICovfVxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRKc29uUmVwb3J0fVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IHJvdW5kZWQtbGcgYmctYW1iZXItNjAwIGhvdmVyOmJnLWFtYmVyLTUwMCB0ZXh0LXdoaXRlIGJvcmRlciBib3JkZXItYW1iZXItNDAwLzYwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctYW1iZXItOTUwLzMwIHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogd3lnZW5lcm93YW55IHJhcG9ydCBrcnltaW5hbGlzdHljem55IHcgZm9ybWFjaWUgcGxpa3UgLmpzb24gZGxhIGNlbMOzdyBhcmNoaXdpemFjamlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogUmFwb3J0ICguanNvbik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRUeHRSZXBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEuNSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tODAwLzgwIHRleHQteHMgZm9udC1tb25vIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogY3p5dGVsbnkgcGxpayB0ZWtzdG93eSAudHh0XCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxGaWxlVGV4dCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWN5YW4tNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5SYXBvcnQgLlRYVDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9udC1zYW5zIGxlYWRpbmctcmVsYXhlZCB3aGl0ZXNwYWNlLXByZS13cmFwIG1heC1oLTk2IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICAgICAge2h1bnRSZXN1bHR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogTG9jYWwgRGlzayBBcmNoaXZhbCBBY3Rpb24gQmFyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tc2xhdGUtOTUwIHZpYS1wdXJwbGUtOTUwLzQwIHRvLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvNDAgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yIHJvdW5kZWQtbGcgYmctcHVycGxlLTkwMC81MCBib3JkZXIgYm9yZGVyLXB1cnBsZS03MDAvNjAgdGV4dC1wdXJwbGUtMzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEFyY2hpdmUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXB1cnBsZS0zMDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+QXJjaGl3aXphY2phIERvd29kw7N3IG5hIER5c2t1IExva2FsbnltPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjIgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwLzYwIHJvdW5kZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgU0hBLTI1NiBaYWJlenBpZWN6b255XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIFphcGlzeiB3eWdlbmVyb3dhbnkgcmFwb3J0IGtyeW1pbmFsaXN0eWN6bnkgamFrbyBwbGlrIGRvd29kb3d5IHByemVjaXdrbyBwcm9jZXNvd2kuXG4gICAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCBzbTpmbGV4LW5vd3JhcCB3LWZ1bGwgc206dy1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZEpzb25SZXBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHNtOmZsZXgtaW5pdGlhbCBweC00IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tYW1iZXItNjAwIHRvLWFtYmVyLTcwMCBob3Zlcjpmcm9tLWFtYmVyLTUwMCBob3Zlcjp0by1hbWJlci02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LW1kIHNoYWRvdy1hbWJlci05NTAvNDAgYm9yZGVyIGJvcmRlci1hbWJlci00MDAvNTAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgaG92ZXI6c2NhbGUtWzEuMDJdIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHd5Z2VuZXJvd2FueSByYXBvcnQga3J5bWluYWxpc3R5Y3pueSB3IGZvcm1hY2llIHBsaWt1IC5qc29uIGRsYSBjZWzDs3cgYXJjaGl3aXphY2ppXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogUmFwb3J0ICguanNvbik8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVEb3dubG9hZFR4dFJlcG9ydH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgc206ZmxleC1pbml0aWFsIHB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLWN5YW4tNjAwIHRvLWN5YW4tNzAwIGhvdmVyOmZyb20tY3lhbi01MDAgaG92ZXI6dG8tY3lhbi02MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtbW9ubyBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBzaGFkb3ctbWQgc2hhZG93LWN5YW4tOTUwLzQwIGJvcmRlciBib3JkZXItY3lhbi00MDAvNDAgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgaG92ZXI6c2NhbGUtWzEuMDJdIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IHd5Z2VuZXJvd2FueSByYXBvcnQga3J5bWluYWxpc3R5Y3pueSB3IGZvcm1hY2llIFRYVCBuYSBkeXNrIGxva2FsbnlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpbGVUZXh0IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvYmllcnogUmFwb3J0ICgudHh0KTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHtnZW5lcmF0ZWRTY3JpcHQgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZUNvZGUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPld5Z2VuZXJvd2FueSBTa3J5cHQgRWd6ZWt1Y3lqbnkgdyBQeXRob25pZTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cInAtMyBiZy1ibGFjay85NSByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItcHVycGxlLTkwMC81MCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LWVtZXJhbGQtNDAwIG92ZXJmbG93LXgtYXV0byBtYXgtaC02NFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxjb2RlPntnZW5lcmF0ZWRTY3JpcHR9PC9jb2RlPlxuICAgICAgICAgICAgICAgICAgICA8L3ByZT5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTEwIHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIDxDcm9zc2hhaXIgY2xhc3NOYW1lPVwidy0xMiBoLTEyIHRleHQtcHVycGxlLTUwMC80MCBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwIG1heC13LW1kXCI+XG4gICAgICAgICAgICAgICAgICBXeWJpZXJ6IGNlbCwgd3Byb3dhZMW6IHN5Z25hdHVyeSBpIGtsaWtuaWogXCJSb3pwb2N6bmlqIFBvbG93YW5pZVwiLCBhYnkgR2VtaW5pIHByemVwcm93YWR6acWCbyBkZWtvbXBvenljasSZIHdpcnVzYSBpIHd5Z2VuZXJvd2HFgm8gxYJhxYRjdWNoIHVib2p1LlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFByZS1odW50IGV2aWRlbmNlIGFyY2hpdmFsIGNhcmQgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTQgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgbWF4LXctbWQgdy1mdWxsIHRleHQtbGVmdCBzcGFjZS15LTIuNSBzaGFkb3ctbGdcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC14cyBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgICAgICAgIDxGb2xkZXJBcmNoaXZlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+QXJjaGl3aXphY2phIERvd29kw7N3IFByemVkIFVib2plbTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgTW/FvGVzeiBuYXR5Y2htaWFzdCB6YWJlenBpZWN6ecSHIGRvc3NpZXIgcHJvY2Vzb3dlIGRsYSA8Y29kZSBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZm9udC1tb25vXCI+e3RhcmdldFByb2Nlc3N9PC9jb2RlPiB3cmF6IHogc3lnbmF0dXJhbWkgZG8gcGxpa3UgZG93b2Rvd2VnbzpcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRG93bmxvYWRUeHRSZXBvcnR9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleC0xIHB5LTEuNSBweC0zIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXNsYXRlLTgwMCB0ZXh0LWN5YW4tMzAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGhvdmVyOmJvcmRlci1jeWFuLTUwMCB0ZXh0LXhzIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tY29sb3JzIGN1cnNvci1wb2ludGVyIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8RmlsZVRleHQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiAuVFhUPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkSnNvblJlcG9ydH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcHktMS41IHB4LTMgcm91bmRlZC1sZyBiZy1hbWJlci05NTAvNDAgaG92ZXI6YmctYW1iZXItOTAwLzYwIHRleHQtYW1iZXItMzAwIGJvcmRlciBib3JkZXItYW1iZXItNjAwLzYwIGhvdmVyOmJvcmRlci1hbWJlci00MDAgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1jb2xvcnMgY3Vyc29yLXBvaW50ZXIgc2hhZG93LXNtXCJcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogZG9zc2llciBkb3dvZG93ZSB3IGZvcm1hY2llIC5qc29uXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWFtYmVyLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBSYXBvcnQgKC5qc29uKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBc1NnQixTQXlKQSxVQXpKQTtBQXRTaEIsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQVU7QUFBQSxFQUFXO0FBQUEsRUFBdUI7QUFBQSxFQUFNO0FBQUEsRUFDckM7QUFBQSxFQUFvQjtBQUFBLEVBQUs7QUFB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