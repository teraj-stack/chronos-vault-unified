import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const Fragment = __vite__cjsImport0_react_jsxDevRuntime["Fragment"]; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"];
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
  Flame
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
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
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6 font-sans", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "p-6 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-red-950 border border-purple-800/50 shadow-2xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "p-2 rounded-xl bg-purple-600/30 border border-purple-500/50 text-purple-300", children: /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-5 h-5 animate-pulse text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 165,
              columnNumber: 17
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 164,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white tracking-tight", children: "Autonomiczny Łowca Gemini & Silnik Uboju Malware" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 167,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/60", children: "AI Heuristic Hunter" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 170,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 163,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl", children: "Wykorzystaj zaawansowane modele Gemini do dynamicznego polowania na agresywne procesy nakładek, analizy kodu Dart/Win32/C++, oceny poziomu zagrożenia i syntezy dedykowanych skryptów uboju w RAM." }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 174,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 162,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-3 bg-slate-950/80 p-3 rounded-2xl border border-purple-800/60 shadow-lg", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white", children: "Status Łowcy AI" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 182,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] font-mono text-purple-400", children: isHunterEnabled ? "AKTYWNY / POLOWANIE WŁĄCZONE" : "UŚPIONY / TYLKO LOKALNY" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 183,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 181,
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
                  lineNumber: 193,
                  columnNumber: 15
                },
                this
              )
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 187,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 180,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 161,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 flex-wrap text-xs", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 font-mono", children: "Przykładowe Cele Polowania:" }, void 0, false, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 204,
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
            lineNumber: 205,
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
            lineNumber: 211,
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
            lineNumber: 217,
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
            lineNumber: 223,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 203,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/GeminiHunter.tsx",
      lineNumber: 160,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-white font-bold text-sm", children: [
          /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 238,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Parametry Polowania i Dane Heurystyczne" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 239,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 237,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Nazwa Procesu / Pliku Binarnego:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 244,
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
              lineNumber: 247,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 243,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Tryb Operacyjny Łowcy:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 258,
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
                  lineNumber: 266,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "RAPID_PROCESS_PURGE", children: "Błyskawiczna Dekapitacja Procesowa (Rapid Purge)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 267,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "MEMORY_HOOK_DISASSEMBLY", children: "Dezasemblacja Hooków w RAM (Memory Hook Purge)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 268,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "REVERSE_OVERLAY_ENGINEERING", children: "Inżynieria Wsteczna Nakładki Flutter (Reverse Eng)" }, void 0, false, {
                  fileName: "/app/applet/src/components/GeminiHunter.tsx",
                  lineNumber: 269,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 261,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 257,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Podejrzewany Wektor Wniknięcia:" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 275,
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
              lineNumber: 278,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 274,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { className: "block text-xs font-mono text-slate-300 mb-1", children: "Sygnatury Kodu / Heurystyka (Dart, C++, Win32, Assembly):" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 289,
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
              lineNumber: 292,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 288,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleExecuteHunt,
            disabled: isHunting || !isHunterEnabled,
            className: `w-full py-3 rounded-xl font-bold font-mono text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${!isHunterEnabled ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 hover:from-purple-500 hover:to-red-500 text-white shadow-purple-950/60 border border-purple-400/30"}`,
            children: isHunting ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-4 h-4 animate-spin text-white" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 313,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Gemini Analizuje Sygnatury i Tworzy Łańcuch Uboju..." }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 314,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 312,
              columnNumber: 17
            }, this) : /* @__PURE__ */ jsxDEV(Fragment, { children: [
              /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 318,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Rozpocznij Polowanie i Generuj Łańcuch Uboju" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 319,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 317,
              columnNumber: 17
            }, this)
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 302,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 236,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 235,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 min-h-[500px]", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsxDEV(Sparkles, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 332,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-sm text-white", children: "Raport Kryminalistyczny & Dedykowany Skrypt Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 333,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 331,
            columnNumber: 15
          }, this),
          generatedScript && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: handleRunSimulationPurge,
                disabled: isSimulatingPurge,
                className: "px-3 py-1 rounded-lg bg-red-700 hover:bg-red-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 345,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: isSimulatingPurge ? "Egzekucja w toku..." : "Wykonaj Ubój" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 346,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 340,
                columnNumber: 19
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
                    lineNumber: 353,
                    columnNumber: 33
                  }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 353,
                    columnNumber: 86
                  }, this),
                  /* @__PURE__ */ jsxDEV("span", { children: isCopied ? "Skopiowano" : "Kopiuj .py" }, void 0, false, {
                    fileName: "/app/applet/src/components/GeminiHunter.tsx",
                    lineNumber: 354,
                    columnNumber: 21
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 349,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 339,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 330,
          columnNumber: 13
        }, this),
        isSimulatingPurge && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-black rounded-xl border-2 border-red-500/80 font-mono text-xs text-red-400 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "font-bold flex items-center gap-2 pb-1 border-b border-red-900/60", children: [
            /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 animate-spin text-red-500" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 364,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "AUTONOMICZNY PROTOKÓŁ UBOJU W TOKU (LIVE SENTINEL EXECUTION)" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 365,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 363,
            columnNumber: 17
          }, this),
          purgeLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "text-slate-300", children: log }, idx, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 368,
            columnNumber: 19
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 362,
          columnNumber: 15
        }, this),
        huntResult ? /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
          isLocalEngine && /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-purple-950/60 border border-purple-600/50 flex items-center gap-2.5 text-xs text-purple-200", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-purple-400 flex-shrink-0" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 378,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { children: [
              /* @__PURE__ */ jsxDEV("span", { className: "font-bold text-white", children: "Tryb Autonomiczny (Heurystyka Sentinel): " }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 380,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: cooldownNotice || "Odpowiedź i skrypt uboju wygenerowane przez wbudowany silnik heurystyczny (aktywny limit zapytań API chmury). Kod jest w 100% gotowy do uruchomienia." }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 381,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 379,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 377,
            columnNumber: 19
          }, this),
          threatScore !== null && /* @__PURE__ */ jsxDEV("div", { className: "p-3 rounded-xl bg-red-950/40 border border-red-800/60 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-mono text-red-300 font-bold", children: "POZIOM ZAGROŻENIA PROCESU (THREAT SCORE):" }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 390,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-mono font-black text-red-400 px-2 py-0.5 bg-red-900/80 rounded border border-red-700", children: [
              threatScore,
              "% [KRYTYCZNY]"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 393,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 389,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-200 font-sans leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto", children: huntResult }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 399,
            columnNumber: 17
          }, this),
          generatedScript && /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(FileCode, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 406,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wygenerowany Skrypt Egzekucyjny w Pythonie:" }, void 0, false, {
                fileName: "/app/applet/src/components/GeminiHunter.tsx",
                lineNumber: 407,
                columnNumber: 23
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 405,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("pre", { className: "p-3 bg-black/95 rounded-xl border border-purple-900/50 font-mono text-xs text-emerald-400 overflow-x-auto max-h-64", children: /* @__PURE__ */ jsxDEV("code", { children: generatedScript }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 410,
              columnNumber: 23
            }, this) }, void 0, false, {
              fileName: "/app/applet/src/components/GeminiHunter.tsx",
              lineNumber: 409,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 404,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 375,
          columnNumber: 15
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col items-center justify-center p-12 text-center text-slate-500 space-y-3", children: [
          /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-12 h-12 text-purple-500/40 animate-pulse" }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 417,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-mono text-slate-400 max-w-sm", children: 'Wybierz cel, wprowadź sygnatury i kliknij "Rozpocznij Polowanie", aby Gemini przeprowadziło dekompozycję wirusa i wygenerowało łańcuch uboju.' }, void 0, false, {
            fileName: "/app/applet/src/components/GeminiHunter.tsx",
            lineNumber: 418,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/GeminiHunter.tsx",
          lineNumber: 416,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 329,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/GeminiHunter.tsx",
        lineNumber: 327,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/GeminiHunter.tsx",
      lineNumber: 233,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/GeminiHunter.tsx",
    lineNumber: 158,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkdlbWluaUh1bnRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgXG4gIFNwYXJrbGVzLCBDcm9zc2hhaXIsIFNrdWxsLCBUZXJtaW5hbCwgUGxheSwgQ29weSwgQ2hlY2ssIFxuICBTaGllbGRBbGVydCwgWmFwLCBBbGVydFRyaWFuZ2xlLCBDcHUsIFJlZnJlc2hDdywgTGF5ZXJzLCBDaGVja0NpcmNsZTIsIEZpbGVDb2RlLCBGbGFtZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgT1NUeXBlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuLi91dGlscy9zZWxmUmVwYWlyU3lzdGVtJztcblxuaW50ZXJmYWNlIFByb3BzIHtcbiAgc2VsZWN0ZWRPUzogT1NUeXBlO1xufVxuXG5leHBvcnQgY29uc3QgR2VtaW5pSHVudGVyOiBSZWFjdC5GQzxQcm9wcz4gPSAoeyBzZWxlY3RlZE9TIH0pID0+IHtcbiAgY29uc3QgW2lzSHVudGVyRW5hYmxlZCwgc2V0SXNIdW50ZXJFbmFibGVkXSA9IHVzZVN0YXRlPGJvb2xlYW4+KCgpID0+IHtcbiAgICByZXR1cm4gc2FmZVN0b3JhZ2UuZ2V0PGJvb2xlYW4+KCdzZW50aW5lbF9odW50ZXJfZW5hYmxlZCcsIHRydWUpO1xuICB9KTtcblxuICBjb25zdCBbdGFyZ2V0UHJvY2Vzcywgc2V0VGFyZ2V0UHJvY2Vzc10gPSB1c2VTdGF0ZSgnZmx1dHRlcl9kZXNrdG9wX292ZXJsYXkuZXhlJyk7XG4gIGNvbnN0IFtyYXdIZXVyaXN0aWNzLCBzZXRSYXdIZXVyaXN0aWNzXSA9IHVzZVN0YXRlKGAvLyBQb2RlanJ6YW55IGtvZCBGbHV0dGVyIERlc2t0b3AgcHJ6ZWptdWrEhWN5IGVrcmFuXG5pbXBvcnQgJ3BhY2thZ2U6Yml0c2Rvam9fd2luZG93L2JpdHNkb2pvX3dpbmRvdy5kYXJ0JztcbmltcG9ydCAncGFja2FnZTp3aW5kb3dfbWFuYWdlci93aW5kb3dfbWFuYWdlci5kYXJ0Jztcblxudm9pZCBtYWluKCkgYXN5bmMge1xuICBXaWRnZXRzRmx1dHRlckJpbmRpbmcuZW5zdXJlSW5pdGlhbGl6ZWQoKTtcbiAgYXdhaXQgd2luZG93TWFuYWdlci5lbnN1cmVJbml0aWFsaXplZCgpO1xuICBcbiAgV2luZG93T3B0aW9ucyB3aW5kb3dPcHRpb25zID0gY29uc3QgV2luZG93T3B0aW9ucyhcbiAgICBzaXplOiBTaXplKDE5MjAsIDEwODApLFxuICAgIGZ1bGxTY3JlZW46IHRydWUsXG4gICAgYWx3YXlzT25Ub3A6IHRydWUsXG4gICAgc2tpcFRhc2tiYXI6IHRydWUsXG4gICk7XG4gIFxuICB3aW5kb3dNYW5hZ2VyLndhaXRVbnRpbFJlYWR5VG9TaG93KHdpbmRvd09wdGlvbnMsICgpIGFzeW5jIHtcbiAgICBhd2FpdCB3aW5kb3dNYW5hZ2VyLnNob3coKTtcbiAgICBhd2FpdCB3aW5kb3dNYW5hZ2VyLmZvY3VzKCk7XG4gICAgYXdhaXQgd2luZG93TWFuYWdlci5zZXRQcmV2ZW50Q2xvc2UodHJ1ZSk7XG4gIH0pO1xufWApO1xuXG4gIGNvbnN0IFtpbmZlY3Rpb25WZWN0b3IsIHNldEluZmVjdGlvblZlY3Rvcl0gPSB1c2VTdGF0ZSgnWmFpbmZla293YW5hIGJpYmxpb3Rla2Ega29tcG9uZW50w7N3IFVJIHBvYnJhbmEgeiBwdWJsaWN6bmVnbyByZXBvenl0b3JpdW0gKFN1cHBseSBDaGFpbiknKTtcbiAgY29uc3QgW2h1bnRNb2RlLCBzZXRIdW50TW9kZV0gPSB1c2VTdGF0ZTwnREVFUF9IRVVSSVNUSUNfSFVOVCcgfCAnUkFQSURfUFJPQ0VTU19QVVJHRScgfCAnTUVNT1JZX0hPT0tfRElTQVNTRU1CTFknIHwgJ1JFVkVSU0VfT1ZFUkxBWV9FTkdJTkVFUklORyc+KCdERUVQX0hFVVJJU1RJQ19IVU5UJyk7XG4gIGNvbnN0IFtpc0h1bnRpbmcsIHNldElzSHVudGluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtodW50UmVzdWx0LCBzZXRIdW50UmVzdWx0XSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbZ2VuZXJhdGVkU2NyaXB0LCBzZXRHZW5lcmF0ZWRTY3JpcHRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFt0aHJlYXRTY29yZSwgc2V0VGhyZWF0U2NvcmVdID0gdXNlU3RhdGU8bnVtYmVyIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0NvcGllZCwgc2V0SXNDb3BpZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbaXNTaW11bGF0aW5nUHVyZ2UsIHNldElzU2ltdWxhdGluZ1B1cmdlXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3B1cmdlTG9ncywgc2V0UHVyZ2VMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXSk7XG4gIGNvbnN0IFtjb29sZG93bk5vdGljZSwgc2V0Q29vbGRvd25Ob3RpY2VdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtpc0xvY2FsRW5naW5lLCBzZXRJc0xvY2FsRW5naW5lXSA9IHVzZVN0YXRlPGJvb2xlYW4+KGZhbHNlKTtcblxuICBjb25zdCBoYW5kbGVUb2dnbGVIdW50ZXIgPSAoZW5hYmxlZDogYm9vbGVhbikgPT4ge1xuICAgIHNldElzSHVudGVyRW5hYmxlZChlbmFibGVkKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX2h1bnRlcl9lbmFibGVkJywgZW5hYmxlZCk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRXhlY3V0ZUh1bnQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0h1bnRlckVuYWJsZWQpIHJldHVybjtcbiAgICBzZXRJc0h1bnRpbmcodHJ1ZSk7XG4gICAgc2V0SHVudFJlc3VsdChudWxsKTtcbiAgICBzZXRHZW5lcmF0ZWRTY3JpcHQobnVsbCk7XG4gICAgc2V0VGhyZWF0U2NvcmUobnVsbCk7XG4gICAgc2V0Q29vbGRvd25Ob3RpY2UobnVsbCk7XG4gICAgc2V0SXNMb2NhbEVuZ2luZShmYWxzZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnL2FwaS9haS1odW50ZXInLCB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIHRhcmdldFByb2Nlc3MsXG4gICAgICAgICAgcmF3SGV1cmlzdGljcyxcbiAgICAgICAgICBpbmZlY3Rpb25WZWN0b3IsXG4gICAgICAgICAgb3NUYXJnZXQ6IHNlbGVjdGVkT1MsXG4gICAgICAgICAgaHVudE1vZGUsXG4gICAgICAgIH0pLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICBpZiAoZGF0YS50ZXh0KSB7XG4gICAgICAgIHNldEh1bnRSZXN1bHQoZGF0YS50ZXh0KTtcbiAgICAgICAgaWYgKGRhdGEudGhyZWF0U2NvcmUpIHNldFRocmVhdFNjb3JlKGRhdGEudGhyZWF0U2NvcmUpO1xuICAgICAgICBpZiAoZGF0YS5nZW5lcmF0ZWRTY3JpcHQpIHNldEdlbmVyYXRlZFNjcmlwdChkYXRhLmdlbmVyYXRlZFNjcmlwdCk7XG4gICAgICAgIGlmIChkYXRhLmlzRmFsbGJhY2spIHNldElzTG9jYWxFbmdpbmUodHJ1ZSk7XG4gICAgICAgIGlmIChkYXRhLmNvb2xkb3duTm90aWNlKSBzZXRDb29sZG93bk5vdGljZShkYXRhLmNvb2xkb3duTm90aWNlKTtcbiAgICAgICAgXG4gICAgICAgIC8vIEV4dHJhY3QgUHl0aG9uIHNjcmlwdCBmcm9tIHJlc3BvbnNlIGlmIHdyYXBwZWQgaW4gY29kZSBibG9ja1xuICAgICAgICBjb25zdCBtYXRjaCA9IGRhdGEudGV4dC5tYXRjaCgvYGBgcHl0aG9uKFtcXHNcXFNdKj8pYGBgLyk7XG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkge1xuICAgICAgICAgIHNldEdlbmVyYXRlZFNjcmlwdChtYXRjaFsxXS50cmltKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgc2V0SHVudFJlc3VsdChgW0LFgsSFZCBzaWxuaWthIMWCb3djeV06ICR7ZGF0YS5lcnJvcn1gKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgc2V0SHVudFJlc3VsdChgW1d5asSFdGVrIHNpZWNpb3d5XTogJHtlcnIubWVzc2FnZSB8fCAnQnJhayDFgsSFY3pub8WbY2kgeiBzZXJ3ZXJlbSd9YCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHNldElzSHVudGluZyhmYWxzZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlTY3JpcHQgPSAoKSA9PiB7XG4gICAgaWYgKCFnZW5lcmF0ZWRTY3JpcHQpIHJldHVybjtcbiAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChnZW5lcmF0ZWRTY3JpcHQpO1xuICAgIHNldElzQ29waWVkKHRydWUpO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gc2V0SXNDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVSdW5TaW11bGF0aW9uUHVyZ2UgPSAoKSA9PiB7XG4gICAgc2V0SXNTaW11bGF0aW5nUHVyZ2UodHJ1ZSk7XG4gICAgc2V0UHVyZ2VMb2dzKFtcbiAgICAgIGBbR0VNSU5JIEhVTlRFUl0gQ2VsIG5hbWllcnpvbnk6ICR7dGFyZ2V0UHJvY2Vzc31gLFxuICAgICAgYFtTWVNURU1dIFJlamVzdHJhY2phIHVjaHd5dHUgasSFZHJhIHByemV6IE9wZW5Qcm9jZXNzKFBST0NFU1NfQUxMX0FDQ0VTUylgLFxuICAgICAgYFtSQU0gRlJFRVpFXSBXc3RyenlrbmnEmWNpZSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzIC0+IFfEhXRraSB1bmllcnVjaG9taW9uZSB3IDIgbXNgLFxuICAgICAgYFtQRSBTQUJPVEFHRV0gWmFzdMSFcGllbmllIHBpZXJ3c3p5Y2ggMTAyNCBiYWp0w7N3IHBsaWt1IGJpbmFybmVnbyB6ZXJhbWkgKDB4MDApYCxcbiAgICAgIGBbQUNMIFJFVk9LRV0gV3l3b8WCYW5pZSBpY2FjbHMgL2RlbnkgRXZlcnlvbmU6KEYpIC0+IFBsaWsgdHJ3YWxlIHphYmxva293YW55YCxcbiAgICAgIGBbUFVSR0UgREVDQVBJVEFUSU9OXSBrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGhQcm9jLCAweERFQURCRUVGKSAtPiBabGlrd2lkb3dhbm9gLFxuICAgICAgYFtTVEFUVVNdIENFTCBXIDEwMCUgWk5JU1pDWk9OWS4gQlJBSyBBS1RZV05ZQ0ggUkVTWlRFSyBXIFBBTUnEmENJIFJBTS5gXG4gICAgXSk7XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldElzU2ltdWxhdGluZ1B1cmdlKGZhbHNlKTtcbiAgICB9LCA0MDAwKTtcbiAgfTtcblxuICBjb25zdCBhcHBseVByZXNldCA9ICh0eXBlOiAnZmx1dHRlcicgfCAnaG9vaycgfCAnbWluZXInIHwgJ3dpcGVyJykgPT4ge1xuICAgIGlmICh0eXBlID09PSAnZmx1dHRlcicpIHtcbiAgICAgIHNldFRhcmdldFByb2Nlc3MoJ2ZsdXR0ZXJfc2NyZWVuX2hpamFja2VyLmV4ZScpO1xuICAgICAgc2V0UmF3SGV1cmlzdGljcyhgaW1wb3J0ICdwYWNrYWdlOmJpdHNkb2pvX3dpbmRvdy9iaXRzZG9qb193aW5kb3cuZGFydCc7XG5hcHBXaW5kb3cuc2l6ZSA9IFNpemUoMTkyMCwgMTA4MCk7XG5hcHBXaW5kb3cuaXNBbHdheXNPblRvcCA9IHRydWU7XG5hcHBXaW5kb3cuc2hvdygpO2ApO1xuICAgICAgc2V0SW5mZWN0aW9uVmVjdG9yKCdaYWluZmVrb3dhbmEgYmlibGlvdGVrYSBGbHV0dGVyIERlc2t0b3AgdyBwdWJzcGVjLnlhbWwnKTtcbiAgICAgIHNldEh1bnRNb2RlKCdERUVQX0hFVVJJU1RJQ19IVU5UJyk7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnaG9vaycpIHtcbiAgICAgIHNldFRhcmdldFByb2Nlc3MoJ3N0ZWFsdGhfaG9va19zcHkuZXhlJyk7XG4gICAgICBzZXRSYXdIZXVyaXN0aWNzKGBISE9PSyBob29rID0gU2V0V2luZG93c0hvb2tFeChXSF9LRVlCT0FSRF9MTCwgS2V5Ym9hcmRQcm9jLCBoSW5zdCwgMCk7XG5TZXRXaW5kb3dQb3MoaFduZCwgSFdORF9UT1BNT1NULCAwLCAwLCAwLCAwLCBTV1BfTk9NT1ZFIHwgU1dQX05PU0laRSk7YCk7XG4gICAgICBzZXRJbmZlY3Rpb25WZWN0b3IoJ1rFgm/Fm2xpd3kgemHFgsSFY3puaWsgWklQIHVkYWrEhWN5IGRva3VtZW50IGZha3R1cnknKTtcbiAgICAgIHNldEh1bnRNb2RlKCdNRU1PUllfSE9PS19ESVNBU1NFTUJMWScpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ21pbmVyJykge1xuICAgICAgc2V0VGFyZ2V0UHJvY2VzcygnaGlkZGVuX2dob3N0X21pbmVyLmV4ZScpO1xuICAgICAgc2V0UmF3SGV1cmlzdGljcyhgVmlydHVhbEFsbG9jRXgoaFRhcmdldCwgTlVMTCwgMjA0OCoxMDI0KjEwMjQsIE1FTV9DT01NSVQsIFBBR0VfRVhFQ1VURV9SRUFEV1JJVEUpO1xuU2V0VGhyZWFkQ29udGV4dChoVGhyZWFkLCAmY3R4KTtgKTtcbiAgICAgIHNldEluZmVjdGlvblZlY3RvcignSW5zdGFsYXRvciBtb2RhIGRvIGdyeSBwb2JyYW55IHogc2llY2kgUDJQJyk7XG4gICAgICBzZXRIdW50TW9kZSgnUkFQSURfUFJPQ0VTU19QVVJHRScpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3dpcGVyJykge1xuICAgICAgc2V0VGFyZ2V0UHJvY2VzcygnZGlza19kZXN0cnVjdG9yX3dpcGVyLmV4ZScpO1xuICAgICAgc2V0UmF3SGV1cmlzdGljcyhgSEFORExFIGhEaXNrID0gQ3JlYXRlRmlsZVcoTFwiXFxcXFxcXFxcXFxcXFxcXC5cXFxcXFxcXFBoeXNpY2FsRHJpdmUwXCIsIEdFTkVSSUNfV1JJVEUsIDAsIE5VTEwsIE9QRU5fRVhJU1RJTkcsIDAsIE5VTEwpO1xuV3JpdGVGaWxlKGhEaXNrLCB6ZXJvX2J1ZmZlciwgNTEyLCAmYnl0ZXNfd3JpdHRlbiwgTlVMTCk7YCk7XG4gICAgICBzZXRJbmZlY3Rpb25WZWN0b3IoJ0tvbXByb21pdGFjamEgemFzYWQgZ3J1cHkgR1BPIHcgZG9tZW5pZScpO1xuICAgICAgc2V0SHVudE1vZGUoJ1JBUElEX1BST0NFU1NfUFVSR0UnKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNiBmb250LXNhbnNcIj5cbiAgICAgIHsvKiBUb3AgQWN0aXZhdGlvbiBIZWFkZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNiByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTk1MCB2aWEtc2xhdGUtOTAwIHRvLXJlZC05NTAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzUwIHNoYWRvdy0yeGwgcmVsYXRpdmUgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwLzMwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC81MCB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctNSBoLTUgYW5pbWF0ZS1wdWxzZSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIHNtOnRleHQtMnhsIGZvbnQtYmxhY2sgdGV4dC13aGl0ZSB0cmFja2luZy10aWdodFwiPlxuICAgICAgICAgICAgICAgIEF1dG9ub21pY3pueSDFgW93Y2EgR2VtaW5pICYgU2lsbmlrIFVib2p1IE1hbHdhcmVcbiAgICAgICAgICAgICAgPC9oMj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTcwMC82MFwiPlxuICAgICAgICAgICAgICAgIEFJIEhldXJpc3RpYyBIdW50ZXJcbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS0zMDAgbXQtMiBtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgV3lrb3J6eXN0YWogemFhd2Fuc293YW5lIG1vZGVsZSBHZW1pbmkgZG8gZHluYW1pY3puZWdvIHBvbG93YW5pYSBuYSBhZ3Jlc3l3bmUgcHJvY2VzeSBuYWvFgmFkZWssIGFuYWxpenkga29kdSBEYXJ0L1dpbjMyL0MrKywgb2NlbnkgcG96aW9tdSB6YWdyb8W8ZW5pYSBpIHN5bnRlenkgZGVkeWtvd2FueWNoIHNrcnlwdMOzdyB1Ym9qdSB3IFJBTS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBUb2dnbGUgU3dpdGNoICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0zIGJnLXNsYXRlLTk1MC84MCBwLTMgcm91bmRlZC0yeGwgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwLzYwIHNoYWRvdy1sZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPlN0YXR1cyDFgW93Y3kgQUk8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1wdXJwbGUtNDAwXCI+XG4gICAgICAgICAgICAgICAge2lzSHVudGVyRW5hYmxlZCA/ICdBS1RZV05ZIC8gUE9MT1dBTklFIFfFgcSEQ1pPTkUnIDogJ1XFmlBJT05ZIC8gVFlMS08gTE9LQUxOWSd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRvZ2dsZUh1bnRlcighaXNIdW50ZXJFbmFibGVkKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy0xNCBoLTcgcm91bmRlZC1mdWxsIHRyYW5zaXRpb24tY29sb3JzIHJlbGF0aXZlIHAtMSBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICAgIGlzSHVudGVyRW5hYmxlZCA/ICdiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTYwMCB0by1yZWQtNjAwJyA6ICdiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy01IGgtNSByb3VuZGVkLWZ1bGwgYmctd2hpdGUgdHJhbnNpdGlvbi10cmFuc2Zvcm0gdHJhbnNmb3JtIHNoYWRvdy1tZCAke1xuICAgICAgICAgICAgICAgICAgaXNIdW50ZXJFbmFibGVkID8gJ3RyYW5zbGF0ZS14LTcnIDogJ3RyYW5zbGF0ZS14LTAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFByZXNldCBCdXR0b25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTQgcHQtNCBib3JkZXItdCBib3JkZXItc2xhdGUtODAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcCB0ZXh0LXhzXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+UHJ6eWvFgmFkb3dlIENlbGUgUG9sb3dhbmlhOjwvc3Bhbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseVByZXNldCgnZmx1dHRlcicpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1zbGF0ZS05MDAgaG92ZXI6YmctcHVycGxlLTkwMC82MCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAvNDAgdGV4dC1wdXJwbGUtMjAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBGbHV0dGVyIE92ZXJsYXkgSGlqYWNrXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ2hvb2snKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLXJlZC05MDAvNjAgYm9yZGVyIGJvcmRlci1yZWQtODAwLzQwIHRleHQtcmVkLTIwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgV2luMzIgS2V5Ym9hcmQgSG9vayBTcHlcbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseVByZXNldCgnbWluZXInKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctc2xhdGUtOTAwIGhvdmVyOmJnLWFtYmVyLTkwMC82MCBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMC80MCB0ZXh0LWFtYmVyLTIwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgR2hvc3QgQ3J5cHRvbWluZXIgQVZYXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ3dpcGVyJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1yb3NlLTkwMC82MCBib3JkZXIgYm9yZGVyLXJvc2UtODAwLzQwIHRleHQtcm9zZS0yMDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIE1CUiBEaXNrIFdpcGVyXG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFdvcmtzcGFjZSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgey8qIExlZnQgQ29sdW1uOiBUYXJnZXQgSW5wdXQgJiBDb25maWcgKDUgY29scykgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBzcGFjZS15LTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNSByb3VuZGVkLTJ4bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgc2hhZG93LXhsIHNwYWNlLXktNFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbVwiPlxuICAgICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UGFyYW1ldHJ5IFBvbG93YW5pYSBpIERhbmUgSGV1cnlzdHljem5lPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBUYXJnZXQgUHJvY2VzcyBOYW1lICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICBOYXp3YSBQcm9jZXN1IC8gUGxpa3UgQmluYXJuZWdvOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3RhcmdldFByb2Nlc3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0VGFyZ2V0UHJvY2VzcyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gb3ZlcmxheV9zY3JlZW5fbG9jay5leGUsIGZsdXR0ZXJfYXBwLmV4ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIEh1bnQgTW9kZSAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgVHJ5YiBPcGVyYWN5am55IMWBb3djeTpcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtodW50TW9kZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRIdW50TW9kZShlLnRhcmdldC52YWx1ZSBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIkRFRVBfSEVVUklTVElDX0hVTlRcIj5HxYLEmWJva2llIFBvbG93YW5pZSBIZXVyeXN0eWN6bmUgKERlZXAgSHVudCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiUkFQSURfUFJPQ0VTU19QVVJHRVwiPkLFgnlza2F3aWN6bmEgRGVrYXBpdGFjamEgUHJvY2Vzb3dhIChSYXBpZCBQdXJnZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiTUVNT1JZX0hPT0tfRElTQVNTRU1CTFlcIj5EZXphc2VtYmxhY2phIEhvb2vDs3cgdyBSQU0gKE1lbW9yeSBIb29rIFB1cmdlKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJSRVZFUlNFX09WRVJMQVlfRU5HSU5FRVJJTkdcIj5JbsW8eW5pZXJpYSBXc3RlY3puYSBOYWvFgmFka2kgRmx1dHRlciAoUmV2ZXJzZSBFbmcpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBJbmZlY3Rpb24gVmVjdG9yICovfVxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtMzAwIG1iLTFcIj5cbiAgICAgICAgICAgICAgICBQb2RlanJ6ZXdhbnkgV2VrdG9yIFduaWtuacSZY2lhOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e2luZmVjdGlvblZlY3Rvcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17ZSA9PiBzZXRJbmZlY3Rpb25WZWN0b3IoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwibnAuIFNmYcWCc3pvd2FueSBpbnN0YWxhdG9yLCBwYWN6a2EgcHViLmRldiwgZXhwbG9pdCBDVkVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBweC0zIHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDAgdGV4dC14cyB0ZXh0LXNsYXRlLTIwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBSYXcgSGV1cmlzdGljcyAvIENvZGUgU25pcHBldCAqL31cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgU3lnbmF0dXJ5IEtvZHUgLyBIZXVyeXN0eWthIChEYXJ0LCBDKyssIFdpbjMyLCBBc3NlbWJseSk6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIHJvd3M9ezd9XG4gICAgICAgICAgICAgICAgdmFsdWU9e3Jhd0hldXJpc3RpY3N9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e2UgPT4gc2V0UmF3SGV1cmlzdGljcyhlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJXa2xlaiBmcmFnbWVudCBrb2R1LCB1Y2h3eXR5IG9rbmEgbHViIHN5Z25hdHVyeS4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiByb3VuZGVkLXhsIGJnLWJsYWNrLzkwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgZm9udC1tb25vIHRleHQtcHVycGxlLTMwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBFeGVjdXRlIEJ1dHRvbiAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlRXhlY3V0ZUh1bnR9XG4gICAgICAgICAgICAgIGRpc2FibGVkPXtpc0h1bnRpbmcgfHwgIWlzSHVudGVyRW5hYmxlZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgdy1mdWxsIHB5LTMgcm91bmRlZC14bCBmb250LWJvbGQgZm9udC1tb25vIHRleHQteHMgc206dGV4dC1zbSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBzaGFkb3ctbGcgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgICAhaXNIdW50ZXJFbmFibGVkXG4gICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS01MDAgY3Vyc29yLW5vdC1hbGxvd2VkJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS02MDAgdmlhLXBpbmstNjAwIHRvLXJlZC02MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNTAwIGhvdmVyOnRvLXJlZC01MDAgdGV4dC13aGl0ZSBzaGFkb3ctcHVycGxlLTk1MC82MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvMzAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7aXNIdW50aW5nID8gKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluIHRleHQtd2hpdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+R2VtaW5pIEFuYWxpenVqZSBTeWduYXR1cnkgaSBUd29yenkgxYFhxYRjdWNoIFVib2p1Li4uPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+Um96cG9jem5paiBQb2xvd2FuaWUgaSBHZW5lcnVqIMWBYcWEY3VjaCBVYm9qdTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBBSSBBbmFseXNpcyAmIEtpbGwtQ2hhaW4gUGF5bG9hZCAoNyBjb2xzKSAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IHNwYWNlLXktNFwiPlxuICAgICAgICAgIHsvKiBTdGF0dXMgLyBPdXRwdXQgQ29udGFpbmVyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdW5kZWQtMnhsIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBzaGFkb3cteGwgc3BhY2UteS00IG1pbi1oLVs1MDBweF1cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMlwiPlxuICAgICAgICAgICAgICAgIDxTcGFya2xlcyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2xkIHRleHQtc20gdGV4dC13aGl0ZVwiPlxuICAgICAgICAgICAgICAgICAgUmFwb3J0IEtyeW1pbmFsaXN0eWN6bnkgJiBEZWR5a293YW55IFNrcnlwdCBVYm9qdVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge2dlbmVyYXRlZFNjcmlwdCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVSdW5TaW11bGF0aW9uUHVyZ2V9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtpc1NpbXVsYXRpbmdQdXJnZX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIHJvdW5kZWQtbGcgYmctcmVkLTcwMCBob3ZlcjpiZy1yZWQtNjAwIHRleHQtd2hpdGUgdGV4dC14cyBmb250LW1vbm8gZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgc2hhZG93LW1kIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2lzU2ltdWxhdGluZ1B1cmdlID8gJ0VnemVrdWNqYSB3IHRva3UuLi4nIDogJ1d5a29uYWogVWLDs2onfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZUNvcHlTY3JpcHR9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWxnIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0yMDAgdGV4dC14cyBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWNvbG9ycyBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtpc0NvcGllZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57aXNDb3BpZWQgPyAnU2tvcGlvd2FubycgOiAnS29waXVqIC5weSd9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIFNpbXVsYXRpb24gVGVybWluYWwgQmFubmVyIChpZiBhY3RpdmUpICovfVxuICAgICAgICAgICAge2lzU2ltdWxhdGluZ1B1cmdlICYmIChcbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctYmxhY2sgcm91bmRlZC14bCBib3JkZXItMiBib3JkZXItcmVkLTUwMC84MCBmb250LW1vbm8gdGV4dC14cyB0ZXh0LXJlZC00MDAgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcGItMSBib3JkZXItYiBib3JkZXItcmVkLTkwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctNCBoLTQgYW5pbWF0ZS1zcGluIHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5BVVRPTk9NSUNaTlkgUFJPVE9Lw5PFgSBVQk9KVSBXIFRPS1UgKExJVkUgU0VOVElORUwgRVhFQ1VUSU9OKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7cHVyZ2VMb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpZHh9IGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e2xvZ308L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuXG4gICAgICAgICAgICB7LyogQW5hbHlzaXMgVGV4dCAvIFJlc3VsdCAqL31cbiAgICAgICAgICAgIHtodW50UmVzdWx0ID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgICAgICAgIHtpc0xvY2FsRW5naW5lICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcHVycGxlLTk1MC82MCBib3JkZXIgYm9yZGVyLXB1cnBsZS02MDAvNTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIuNSB0ZXh0LXhzIHRleHQtcHVycGxlLTIwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8WmFwIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwIGZsZXgtc2hyaW5rLTBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+VHJ5YiBBdXRvbm9taWN6bnkgKEhldXJ5c3R5a2EgU2VudGluZWwpOiA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29vbGRvd25Ob3RpY2UgfHwgJ09kcG93aWVkxbogaSBza3J5cHQgdWJvanUgd3lnZW5lcm93YW5lIHByemV6IHdidWRvd2FueSBzaWxuaWsgaGV1cnlzdHljem55IChha3R5d255IGxpbWl0IHphcHl0YcWEIEFQSSBjaG11cnkpLiBLb2QgamVzdCB3IDEwMCUgZ290b3d5IGRvIHVydWNob21pZW5pYS4nfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuXG4gICAgICAgICAgICAgICAge3RocmVhdFNjb3JlICE9PSBudWxsICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctcmVkLTk1MC80MCBib3JkZXIgYm9yZGVyLXJlZC04MDAvNjAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1tb25vIHRleHQtcmVkLTMwMCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQT1pJT00gWkFHUk/Fu0VOSUEgUFJPQ0VTVSAoVEhSRUFUIFNDT1JFKTpcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbW9ubyBmb250LWJsYWNrIHRleHQtcmVkLTQwMCBweC0yIHB5LTAuNSBiZy1yZWQtOTAwLzgwIHJvdW5kZWQgYm9yZGVyIGJvcmRlci1yZWQtNzAwXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3RocmVhdFNjb3JlfSUgW0tSWVRZQ1pOWV1cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKX1cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzgwIHRleHQteHMgdGV4dC1zbGF0ZS0yMDAgZm9udC1zYW5zIGxlYWRpbmctcmVsYXhlZCB3aGl0ZXNwYWNlLXByZS13cmFwIG1heC1oLTk2IG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgICAgICAge2h1bnRSZXN1bHR9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7Z2VuZXJhdGVkU2NyaXB0ICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LW1vbm8gdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPEZpbGVDb2RlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5XeWdlbmVyb3dhbnkgU2tyeXB0IEVnemVrdWN5am55IHcgUHl0aG9uaWU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJwLTMgYmctYmxhY2svOTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXB1cnBsZS05MDAvNTAgZm9udC1tb25vIHRleHQteHMgdGV4dC1lbWVyYWxkLTQwMCBvdmVyZmxvdy14LWF1dG8gbWF4LWgtNjRcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8Y29kZT57Z2VuZXJhdGVkU2NyaXB0fTwvY29kZT5cbiAgICAgICAgICAgICAgICAgICAgPC9wcmU+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC0xMiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgICAgICA8Q3Jvc3NoYWlyIGNsYXNzTmFtZT1cInctMTIgaC0xMiB0ZXh0LXB1cnBsZS01MDAvNDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMCBtYXgtdy1zbVwiPlxuICAgICAgICAgICAgICAgICAgV3liaWVyeiBjZWwsIHdwcm93YWTFuiBzeWduYXR1cnkgaSBrbGlrbmlqIFwiUm96cG9jem5paiBQb2xvd2FuaWVcIiwgYWJ5IEdlbWluaSBwcnplcHJvd2FkemnFgm8gZGVrb21wb3p5Y2rEmSB3aXJ1c2EgaSB3eWdlbmVyb3dhxYJvIMWCYcWEY3VjaCB1Ym9qdS5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBb0tnQixTQW1KQSxVQW5KQTtBQXBLaEIsU0FBZ0IsZ0JBQWdCO0FBQ2hDO0FBQUEsRUFDRTtBQUFBLEVBQVU7QUFBQSxFQUFXO0FBQUEsRUFBdUI7QUFBQSxFQUFNO0FBQUEsRUFDckM7QUFBQSxFQUFvQjtBQUFBLEVBQUs7QUFBQSxFQUFpQztBQUFBLEVBQVU7QUFBQSxPQUM1RTtBQUVQLFNBQVMsbUJBQW1CO0FBTXJCLGFBQU0sZUFBZ0MsQ0FBQyxFQUFFLFdBQVcsTUFBTTtBQUMvRCxRQUFNLENBQUMsaUJBQWlCLGtCQUFrQixJQUFJLFNBQWtCLE1BQU07QUFDcEUsV0FBTyxZQUFZLElBQWEsMkJBQTJCLElBQUk7QUFBQSxFQUNqRSxDQUFDO0FBRUQsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBUyw2QkFBNkI7QUFDaEYsUUFBTSxDQUFDLGVBQWUsZ0JBQWdCLElBQUksU0FBUztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFvQm5EO0FBRUEsUUFBTSxDQUFDLGlCQUFpQixrQkFBa0IsSUFBSSxTQUFTLDBGQUEwRjtBQUNqSixRQUFNLENBQUMsVUFBVSxXQUFXLElBQUksU0FBb0gscUJBQXFCO0FBQ3pLLFFBQU0sQ0FBQyxXQUFXLFlBQVksSUFBSSxTQUFTLEtBQUs7QUFDaEQsUUFBTSxDQUFDLFlBQVksYUFBYSxJQUFJLFNBQXdCLElBQUk7QUFDaEUsUUFBTSxDQUFDLGlCQUFpQixr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