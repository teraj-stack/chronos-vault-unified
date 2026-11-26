import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Play,
  Pause,
  RefreshCw,
  ShieldCheck,
  AlertTriangle,
  Terminal,
  Monitor,
  Lock,
  Eye,
  Zap,
  Crosshair,
  ShieldAlert,
  FileX,
  Download,
  FolderTree,
  Layers,
  Skull,
  Gauge
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFullOfflineBundle } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { ProcessTreeView } from "/sentinel-toolkit/src/components/ProcessTreeView.tsx";
import { ProcessWatchdog } from "/sentinel-toolkit/src/components/ProcessWatchdog.tsx";
import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
export const InteractiveSimulator = () => {
  const [activeTab, setActiveTab] = useState("integrated");
  const [processes, setProcesses] = useState([
    {
      pid: 1044,
      ppid: 0,
      name: "explorer.exe",
      windowTitle: "Eksplorator Windows",
      isTopMost: false,
      isFullscreen: false,
      hasFlutterDll: false,
      width: 1024,
      height: 700,
      opacity: 1,
      isBlocked: false,
      status: "running",
      filePath: "C:\\Windows\\explorer.exe",
      isRogue: false,
      windows: [
        {
          hwnd: "0x0001004A",
          title: "Pasek Zadań Windows & Pulpit",
          className: "Shell_TrayWnd",
          isTopMost: false,
          isFullscreen: false,
          isLayered: false,
          bounds: { width: 1920, height: 48 },
          zOrder: 0
        }
      ]
    },
    {
      pid: 4820,
      ppid: 1044,
      name: "chrome.exe",
      windowTitle: "Google Chrome - Stack Overflow",
      isTopMost: false,
      isFullscreen: false,
      hasFlutterDll: false,
      width: 1280,
      height: 800,
      opacity: 1,
      isBlocked: false,
      status: "running",
      filePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      isRogue: false,
      windows: [
        {
          hwnd: "0x00045A12",
          title: "Google Chrome - Stack Overflow",
          className: "Chrome_WidgetWin_1",
          isTopMost: false,
          isFullscreen: false,
          isLayered: false,
          bounds: { width: 1280, height: 800 },
          zOrder: 1
        }
      ]
    },
    {
      pid: 3840,
      ppid: 1044,
      name: "dropper_watchdog.exe",
      windowTitle: "Background Watchdog Service (Hidden Dropper)",
      isTopMost: false,
      isFullscreen: false,
      hasFlutterDll: false,
      width: 0,
      height: 0,
      opacity: 1,
      isBlocked: true,
      status: "running",
      filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\dropper_watchdog.exe",
      isParentDropper: true,
      isRogue: true,
      windows: []
    },
    {
      pid: 8932,
      ppid: 3840,
      name: "flutter_runner.exe",
      windowTitle: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
      isTopMost: true,
      isFullscreen: true,
      hasFlutterDll: true,
      width: 1920,
      height: 1080,
      opacity: 0.92,
      isBlocked: true,
      status: "running",
      filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\flutter_runner.exe",
      isRogue: true,
      windows: [
        {
          hwnd: "0x004F1A02",
          title: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
          className: "FLUTTER_RUNNER_WINDOW",
          isTopMost: true,
          isFullscreen: true,
          isLayered: false,
          bounds: { width: 1920, height: 1080 },
          zOrder: 999
        },
        {
          hwnd: "0x004F1A88",
          title: "Layered Transparent ClickTrap",
          className: "FLUTTER_SUBVIEW_MODAL",
          isTopMost: true,
          isFullscreen: true,
          isLayered: true,
          bounds: { width: 1920, height: 1080 },
          zOrder: 1e3
        }
      ]
    }
  ]);
  const [isRunningWatchdog, setIsRunningWatchdog] = useState(false);
  const [logs, setLogs] = useState([
    "[*] Inicjalizacja środowiska symulacji Win32 API & PPID Lineage Engine...",
    "[*] Załadowano mapę relacji procesów: [explorer.exe -> dropper_watchdog.exe -> flutter_runner.exe]",
    "[*] Gotowy do detekcji i unieruchamiania w trybie 100% OFFLINE."
  ]);
  const addLog = (msg) => {
    setLogs((prev) => [...prev.slice(-20), `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
  };
  const spawnOverlay = (type) => {
    const parentPid = Math.floor(2e3 + Math.random() * 2e3);
    const childPid = Math.floor(6e3 + Math.random() * 3e3);
    let parentProc;
    let childProc;
    if (type === "kiosk") {
      parentProc = {
        pid: parentPid,
        ppid: 1044,
        name: "kiosk_updater_service.exe",
        windowTitle: "Service Daemon (Auto-Restart Watchdog)",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 1,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Roaming\\kiosk_updater_service.exe",
        isParentDropper: true,
        isRogue: true,
        windows: []
      };
      childProc = {
        pid: childPid,
        ppid: parentPid,
        name: "flutter_kiosk_app.exe",
        windowTitle: "Flutter Kiosk Lock Overlay [ALWAYS_ON_TOP]",
        isTopMost: true,
        isFullscreen: true,
        hasFlutterDll: true,
        width: 1920,
        height: 1080,
        opacity: 0.95,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Roaming\\flutter_kiosk_app.exe",
        isRogue: true,
        windows: [
          {
            hwnd: `0x00${Math.floor(1e5 + Math.random() * 8e5).toString(16)}`,
            title: "Flutter Kiosk Lock Overlay [ALWAYS_ON_TOP]",
            className: "FLUTTER_RUNNER_WINDOW",
            isTopMost: true,
            isFullscreen: true,
            isLayered: false,
            bounds: { width: 1920, height: 1080 },
            zOrder: 999
          }
        ]
      };
    } else if (type === "stealth_flutter") {
      parentProc = {
        pid: parentPid,
        ppid: 1044,
        name: "malware_loader.exe",
        windowTitle: "Stealth Loader Subsystem",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 1,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\malware_loader.exe",
        isParentDropper: true,
        isRogue: true,
        windows: []
      };
      childProc = {
        pid: childPid,
        ppid: parentPid,
        name: "svchost_helper.exe",
        windowTitle: "System Alert (Flutter Engine Module)",
        isTopMost: true,
        isFullscreen: true,
        hasFlutterDll: true,
        width: 1920,
        height: 1080,
        opacity: 0.88,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\svchost_helper.exe",
        isRogue: true,
        windows: [
          {
            hwnd: `0x00${Math.floor(1e5 + Math.random() * 8e5).toString(16)}`,
            title: "System Alert (Flutter Engine Module)",
            className: "FLUTTER_HOST_WINDOW",
            isTopMost: true,
            isFullscreen: true,
            isLayered: false,
            bounds: { width: 1920, height: 1080 },
            zOrder: 999
          }
        ]
      };
    } else {
      parentProc = {
        pid: parentPid,
        ppid: 1044,
        name: "browser_injector.exe",
        windowTitle: "Transparent Overlay Spawner",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 1,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\Downloads\\browser_injector.exe",
        isParentDropper: true,
        isRogue: true,
        windows: []
      };
      childProc = {
        pid: childPid,
        ppid: parentPid,
        name: "flutter_overlay_clicktrap.exe",
        windowTitle: "Glass Overlay (Layered Transparent ClickTrap)",
        isTopMost: true,
        isFullscreen: true,
        hasFlutterDll: true,
        width: 1920,
        height: 1080,
        opacity: 0.4,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\Downloads\\flutter_overlay_clicktrap.exe",
        isRogue: true,
        windows: [
          {
            hwnd: `0x00${Math.floor(1e5 + Math.random() * 8e5).toString(16)}`,
            title: "Glass Overlay (Layered Transparent ClickTrap)",
            className: "FLUTTER_CLICKTRAP_WINDOW",
            isTopMost: true,
            isFullscreen: true,
            isLayered: true,
            bounds: { width: 1920, height: 1080 },
            zOrder: 1e3
          }
        ]
      };
    }
    setProcesses((prev) => [...prev.filter((p) => p.status === "running"), parentProc, childProc]);
    addLog(`[SPAWN] Uruchomiono proces rodzica: ${parentProc.name} (PID: ${parentProc.pid}) -> wygenerował potomka: ${childProc.name} (PID: ${childProc.pid})`);
  };
  const handleKillSingleProcess = (pid) => {
    const target = processes.find((p) => p.pid === pid);
    if (!target) return;
    addLog(`[KILL] TerminateProcess(PID: ${pid}, 9) -> Zamknięto proces ${target.name}.`);
    if (target.ppid && target.isRogue) {
      const parent = processes.find((p) => p.pid === target.ppid && p.status === "running");
      if (parent) {
        addLog(`[⚠️ OSTRZEŻENIE FORENSIC] Proces-rodzic '${parent.name}' (PID: ${parent.pid}) wciąż działa! Może wkrótce zrestartować okno Fluttera.`);
      }
    }
    setProcesses(
      (prev) => prev.map((p) => p.pid === pid ? { ...p, status: "terminated" } : p)
    );
  };
  const handleKillProcessTree = (rootPid) => {
    addLog("=".repeat(60));
    addLog(`🌳 [TREE-KILL /T] Rozpoczęto likwidację poddrzewa procesów od PID ${rootPid}...`);
    const pidsToKill = /* @__PURE__ */ new Set();
    const findChildren = (currentPid) => {
      pidsToKill.add(currentPid);
      processes.forEach((p) => {
        if (p.ppid === currentPid && !pidsToKill.has(p.pid)) {
          findChildren(p.pid);
        }
      });
    };
    findChildren(rootPid);
    pidsToKill.forEach((pid) => {
      const p = processes.find((item) => item.pid === pid);
      if (p) {
        addLog(`  -> [ZABITO] PID ${pid} (${p.name}) - Zwolniono uchwyty okien HWND.`);
      }
    });
    setProcesses(
      (prev) => prev.map((p) => pidsToKill.has(p.pid) ? { ...p, status: "terminated" } : p)
    );
    addLog(`✔ [SUKCES] Całe poddrzewo (${pidsToKill.size} procesów) zostało definitywnie usunięte z RAM.`);
    addLog("=".repeat(60));
  };
  const handleSuspendTree = (rootPid) => {
    addLog("=".repeat(60));
    addLog(`❄️ [FREEZE TREE] Zamrażanie wszystkich wątków w poddrzewie PID ${rootPid} (NtSuspendProcess)...`);
    const pidsToSuspend = /* @__PURE__ */ new Set();
    const findChildren = (currentPid) => {
      pidsToSuspend.add(currentPid);
      processes.forEach((p) => {
        if (p.ppid === currentPid && !pidsToSuspend.has(p.pid)) {
          findChildren(p.pid);
        }
      });
    };
    findChildren(rootPid);
    pidsToSuspend.forEach((pid) => {
      const p = processes.find((item) => item.pid === pid);
      if (p) {
        addLog(`  -> [ZAMROŻONO RAM] PID ${pid} (${p.name}) - Zatrzymano czas procesora.`);
      }
    });
    setProcesses(
      (prev) => prev.map((p) => pidsToSuspend.has(p.pid) ? { ...p, status: "quarantined" } : p)
    );
    addLog(`✔ [SUKCES] Zneutralizowano ${pidsToSuspend.size} procesów w pamięci.`);
    addLog("=".repeat(60));
  };
  const handleSabotageTree = (rootPid) => {
    addLog("=".repeat(65));
    addLog(`💥 [SABOTAŻ PE DRZEWA] Trwałe niszczenie nagłówków PE dla całego łańcucha PID ${rootPid}...`);
    const pidsToSabotage = /* @__PURE__ */ new Set();
    const findChildren = (currentPid) => {
      pidsToSabotage.add(currentPid);
      processes.forEach((p) => {
        if (p.ppid === currentPid && !pidsToSabotage.has(p.pid)) {
          findChildren(p.pid);
        }
      });
    };
    findChildren(rootPid);
    pidsToSabotage.forEach((pid) => {
      const p = processes.find((item) => item.pid === pid);
      if (p && p.filePath) {
        addLog(`  -> [PE CORRUPT] ${p.name} (PID ${pid}): Nadpisano nagłówek MZ zerami -> 0xC000007B!`);
        addLog(`  -> [ACL DENY] icacls "${p.filePath}" /inheritance:r /deny *S-1-1-0:(F,X,R,W)`);
      }
    });
    setProcesses(
      (prev) => prev.map((p) => pidsToSabotage.has(p.pid) ? { ...p, status: "pe_corrupted" } : p)
    );
    addLog(`✔ [SUKCES] Zniszczono binarnie ${pidsToSabotage.size} plików wykonywalnych na dysku.`);
    addLog("=".repeat(65));
  };
  const runDetectionCycle = () => {
    addLog(">> [Python] EnumWindows() & PPID Inspector skanuje listę okien i procesów...");
    setProcesses(
      (prev) => prev.map((proc) => {
        if (proc.status !== "running") return proc;
        const isTopmost = proc.isTopMost;
        const isFullscreen = proc.isFullscreen;
        const isFlutter = proc.hasFlutterDll || proc.name.includes("flutter");
        if (isTopmost && isFullscreen || isFlutter && isTopmost) {
          addLog(`[!] WYKRYTO: HWND PID ${proc.pid} (${proc.name}) [PPID: ${proc.ppid || "N/A"}] -> WS_EX_TOPMOST=${isTopmost}, Fullscreen=${isFullscreen}`);
          addLog(`[+] [KILL] psutil.Process(${proc.pid}).kill() -> PROCES ZLIKWIDOWANY!`);
          return { ...proc, status: "terminated" };
        }
        return proc;
      })
    );
  };
  const triggerQuarantineLockout = () => {
    addLog("=".repeat(55));
    addLog("⚡ [KWARANTANNA CAŁEGO ŁAŃCUCHA] Uruchomiono procedurę trwałego unieruchomienia!");
    setProcesses(
      (prev) => prev.map((proc) => {
        if (proc.status === "running" && (proc.isTopMost || proc.hasFlutterDll || proc.isBlocked || proc.isParentDropper)) {
          addLog(`[KROK 1] NtSuspendProcess(PID: ${proc.pid} - ${proc.name}) -> Zamrożono wątki w RAM.`);
          addLog(`[KROK 2] icacls "${proc.filePath}" /deny Everyone:(X,W) -> Zablokowano uprawnienia na dysku.`);
          addLog(`[KROK 3] IFEO Lock: Zablokowano ponowny start pliku '${proc.name}'.`);
          addLog(`[KROK 4] TerminateProcess(PID: ${proc.pid}) -> Zakończono proces.`);
          return { ...proc, status: "quarantined" };
        }
        return proc;
      })
    );
    addLog("✔ [SUKCES] Wszelkie złośliwe procesy (wraz z rodzicami) zostały spetryfikowane.");
    addLog("=".repeat(55));
  };
  const triggerPeSabotageAndAclLock = () => {
    addLog("=".repeat(60));
    addLog("💥 [SABOTAŻ PE & ACL] Uruchomiono trwałe uszkodzenie plików wykonywalnych!");
    setProcesses(
      (prev) => prev.map((proc) => {
        if (proc.status === "running" && (proc.isTopMost || proc.hasFlutterDll || proc.isBlocked || proc.isParentDropper)) {
          addLog(`[1. FREEZE] NtSuspendProcess(PID: ${proc.pid} - ${proc.name}) -> Zamrożenie wątków w RAM.`);
          addLog(`[2. KILL] TerminateProcess(PID: ${proc.pid}) -> Odblokowanie uchwytu pliku.`);
          addLog(`[3. PE SABOTAGE] Nadpisano sygnaturę DOS 'MZ' (0x5A4D) -> 'DEAD' oraz wyzerowano nagłówek PE.`);
          addLog(`    -> Windows PE Loader zwraca teraz błąd: 0xC000007B (STATUS_INVALID_IMAGE_FORMAT)!`);
          addLog(`[4. ACL LOCKOUT] icacls "${proc.filePath}" /inheritance:r /deny *S-1-1-0:(F,X,R,W)`);
          return { ...proc, status: "pe_corrupted" };
        }
        return proc;
      })
    );
    addLog("✔ [SUKCES] Pliki .exe (rodzic i dzieci) zostały trwale zniszczone binarnie!");
    addLog("=".repeat(60));
  };
  useEffect(() => {
    safeStorage.set("sentinel_simulated_processes", processes);
  }, [processes]);
  useEffect(() => {
    const handleAutoFrozen = (e) => {
      const detail = e.detail;
      if (detail && detail.pid) {
        addLog(`[⚡ CZUJNIK GNID AUTO-FREEZE] Natychmiastowe zamrożenie w RAM (0 ms): PID ${detail.pid} (${detail.targetName})`);
        setProcesses((prev) => prev.map((p) => {
          if (p.pid === detail.pid) {
            return { ...p, status: "suspended", isBlocked: true, opacity: 0.2 };
          }
          return p;
        }));
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("sentinel:gnida-auto-frozen", handleAutoFrozen);
    }
    let interval;
    if (isRunningWatchdog) {
      addLog("[*] Uruchomiono pętlę ciągłego monitorowania (Watchdog Daemon co 1200ms)");
      interval = setInterval(() => {
        runDetectionCycle();
      }, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (typeof window !== "undefined") {
        window.removeEventListener("sentinel:gnida-auto-frozen", handleAutoFrozen);
      }
    };
  }, [isRunningWatchdog]);
  const triggerPanicHotkey = () => {
    addLog("[PANIC] Wciśnięto globalny skrót awaryjny [Ctrl + Alt + Shift + K]!");
    setProcesses(
      (prev) => prev.map((proc) => {
        if (proc.status === "running" && (proc.isTopMost || proc.hasFlutterDll)) {
          addLog(`[PANIC KILL] Zlikwidowano natychmiast PID ${proc.pid} (${proc.name})`);
          return { ...proc, status: "terminated" };
        }
        return proc;
      })
    );
  };
  const resetAll = () => {
    setProcesses([
      {
        pid: 1044,
        ppid: 0,
        name: "explorer.exe",
        windowTitle: "Eksplorator Windows",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 1024,
        height: 700,
        opacity: 1,
        isBlocked: false,
        status: "running",
        filePath: "C:\\Windows\\explorer.exe",
        isRogue: false,
        windows: [
          {
            hwnd: "0x0001004A",
            title: "Pasek Zadań Windows & Pulpit",
            className: "Shell_TrayWnd",
            isTopMost: false,
            isFullscreen: false,
            isLayered: false,
            bounds: { width: 1920, height: 48 },
            zOrder: 0
          }
        ]
      },
      {
        pid: 4820,
        ppid: 1044,
        name: "chrome.exe",
        windowTitle: "Google Chrome - Pulpit",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 1280,
        height: 800,
        opacity: 1,
        isBlocked: false,
        status: "running",
        filePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        isRogue: false,
        windows: [
          {
            hwnd: "0x00045A12",
            title: "Google Chrome - Pulpit",
            className: "Chrome_WidgetWin_1",
            isTopMost: false,
            isFullscreen: false,
            isLayered: false,
            bounds: { width: 1280, height: 800 },
            zOrder: 1
          }
        ]
      },
      {
        pid: 3840,
        ppid: 1044,
        name: "dropper_watchdog.exe",
        windowTitle: "Background Watchdog Service (Hidden Dropper)",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 1,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\dropper_watchdog.exe",
        isParentDropper: true,
        isRogue: true,
        windows: []
      },
      {
        pid: 8932,
        ppid: 3840,
        name: "flutter_runner.exe",
        windowTitle: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
        isTopMost: true,
        isFullscreen: true,
        hasFlutterDll: true,
        width: 1920,
        height: 1080,
        opacity: 0.92,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\flutter_runner.exe",
        isRogue: true,
        windows: [
          {
            hwnd: "0x004F1A02",
            title: "Flutter Fullscreen Lockscreen Overlay [WS_EX_TOPMOST]",
            className: "FLUTTER_RUNNER_WINDOW",
            isTopMost: true,
            isFullscreen: true,
            isLayered: false,
            bounds: { width: 1920, height: 1080 },
            zOrder: 999
          },
          {
            hwnd: "0x004F1A88",
            title: "Layered Transparent ClickTrap",
            className: "FLUTTER_SUBVIEW_MODAL",
            isTopMost: true,
            isFullscreen: true,
            isLayered: true,
            bounds: { width: 1920, height: 1080 },
            zOrder: 1e3
          }
        ]
      }
    ]);
    addLog("[RESET] Zresetowano listę procesów i zrekonstruowano drzewo PPID.");
  };
  const activeOverlay = processes.find(
    (p) => p.status === "running" && (p.isTopMost || p.isFullscreen)
  );
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(Monitor, { className: "w-5 h-5 text-red-500" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 651,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Interaktywny Symulator Pamięci, Ekranu & Drzewa Procesów" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 652,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold", children: "TREE-VIEW & PPID TRACER" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 653,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 650,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: [
          "Wizualizuj relacje między procesem-matką (Dropper/Watchdog) a oknami nakładek Fluttera (",
          /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "HWND" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 658,
            columnNumber: 101
          }, this),
          "). Zidentyfikuj prawdziwe źródło złośliwego okna i zlikwiduj całe drzewo od korzenia."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 657,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 649,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: downloadFullOfflineBundle,
          className: "flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg text-xs font-semibold shadow transition-all",
          title: "Pobierz gotowy pakiet skryptów ratunkowych .bat i .py na dysk",
          children: [
            /* @__PURE__ */ jsxDEV(Download, { className: "w-4 h-4" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 668,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet Offline (.bat + .py)" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 669,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 663,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 662,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 648,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between bg-slate-900/80 p-1.5 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("integrated"),
            className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === "integrated" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Layers, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 685,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Widok Zintegrowany (Pulpit + Drzewo)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 686,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 677,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("tree"),
            className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === "tree" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(FolderTree, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 697,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Drzewo Procesów & Detektor Pochodzenia (Tree-View)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 698,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 689,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("desktop"),
            className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === "desktop" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Monitor, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 709,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wirtualny Pulpit & Podgląd RAM" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 710,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 701,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("watchdog"),
            className: `px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${activeTab === "watchdog" ? "bg-purple-600 text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Gauge, { className: "w-3.5 h-3.5 text-pink-400" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 721,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Process Watchdog (CPU / RAM Live)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 722,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 713,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 676,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 font-mono hidden sm:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Aktywne procesy: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: processes.filter((p) => p.status === "running").length }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 727,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 727,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 728,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Zagrożenia: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400", children: processes.filter((p) => p.status === "running" && p.isRogue).length }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 729,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 729,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 726,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 675,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block", children: "1. Wygeneruj Zdarzenie Zagrożenia" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 737,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => spawnOverlay("kiosk"),
              className: "w-full flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-red-300 rounded-lg text-xs font-medium border border-red-900/40 transition-colors",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Pełny Ekran (Dropper + Kiosk)" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 745,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 746,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 741,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => spawnOverlay("stealth_flutter"),
              className: "w-full flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg text-xs font-medium border border-amber-900/40 transition-colors",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Zakamuflowany (Loader + DLL)" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 753,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 754,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 749,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => spawnOverlay("translucent"),
              className: "w-full flex items-center justify-between px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-900/40 transition-colors",
              children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Przezroczysta Pułapka Myszki" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 761,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 762,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 757,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 740,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 736,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 lg:col-span-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block", children: "2. Wykonaj Akcję Obronną" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 769,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerPeSabotageAndAclLock,
              className: "flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-red-700 via-rose-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-red-900/40 transition-all border border-red-400/40 ring-1 ring-red-400/30",
              title: "Nadpisuje nagłówek PE (0x5A4D MZ -> DEAD) i odcina uprawnienia DACL (icacls /deny Everyone)",
              children: [
                /* @__PURE__ */ jsxDEV(FileX, { className: "w-4 h-4 text-amber-300 animate-pulse" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 779,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "💥 SABOTAŻ PE & ACL" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 780,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 774,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerQuarantineLockout,
              className: "flex items-center justify-center gap-1.5 px-3 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg text-xs font-bold shadow-lg shadow-purple-900/40 transition-all border border-purple-400/30",
              title: "Zamraża proces w RAM i odbiera uprawnienia plikowi na dysku",
              children: [
                /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 789,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "UNIERUCHOM W RAM" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 790,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 784,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: runDetectionCycle,
              className: "flex items-center justify-center gap-1.5 px-3 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-lg text-xs font-semibold shadow transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Crosshair, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 798,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skanuj & Zabij" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 799,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 794,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: triggerPanicHotkey,
              className: "flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-lg text-xs shadow transition-all",
              children: [
                /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 807,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skrót Paniki" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 808,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 803,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setIsRunningWatchdog(!isRunningWatchdog),
              className: `flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold shadow transition-all ${isRunningWatchdog ? "bg-emerald-600 hover:bg-emerald-500 text-white animate-pulse" : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"}`,
              children: [
                isRunningWatchdog ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 820,
                  columnNumber: 36
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 820,
                  columnNumber: 68
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isRunningWatchdog ? "Strażnik: ON" : "Demon Watchdog" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 821,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 812,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 772,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Drzewo PPID: identyfikuje procesy nadrzędne (Droppery/Watchdogi), zapobiegając odradzaniu się okien." }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 826,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: resetAll,
              className: "flex items-center gap-1 text-[11px] text-slate-400 hover:text-white",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 833,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Reset symulatora" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 834,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 829,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 825,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 768,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 734,
      columnNumber: 7
    }, this),
    activeTab === "watchdog" ? /* @__PURE__ */ jsxDEV(ProcessWatchdog, { initialProcesses: processes }, void 0, false, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 842,
      columnNumber: 9
    }, this) : activeTab === "tree" ? (
      /* Full Tree View Mode */
      /* @__PURE__ */ jsxDEV(
        ProcessTreeView,
        {
          processes,
          onKillProcess: handleKillSingleProcess,
          onKillProcessTree: handleKillProcessTree,
          onSuspendTree: handleSuspendTree,
          onSabotageTree: handleSabotageTree
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 845,
          columnNumber: 9
        },
        this
      )
    ) : (
      /* Split Integrated or Desktop View */
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800 mb-3", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Monitor, { className: "w-4 h-4 text-blue-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 860,
                  columnNumber: 19
                }, this),
                "Wirtualny Pulpit Windows 11 (1920x1080)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 859,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: "Z-ORDER / LAYER RENDER" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 863,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 858,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative aspect-video w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 p-3 flex flex-col justify-between pointer-events-none opacity-60", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[9px] font-bold text-blue-300", children: "Ten Komputer" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 871,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-300", children: "Kosz" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 874,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 870,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-600 font-mono", children: "Pulpit bezpieczny (Tryb testowy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 878,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 869,
                columnNumber: 17
              }, this),
              processes.filter((p) => p.status === "running" && !p.isFullscreen && p.width > 0).map((p) => /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute bg-slate-900/90 border border-slate-700 rounded shadow-xl p-2 text-[10px] text-slate-200",
                  style: {
                    width: `${p.width / 1920 * 100 * 0.7}%`,
                    height: `${p.height / 1080 * 100 * 0.7}%`,
                    top: "15%",
                    left: "15%"
                  },
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-1 border-b border-slate-800 mb-1", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-bold truncate", children: p.windowTitle }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 898,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-slate-500 font-mono", children: [
                        "PID ",
                        p.pid
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 899,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 897,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[9px]", children: "Aplikacja użytkownika działa poprawnie." }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 901,
                      columnNumber: 23
                    }, this)
                  ]
                },
                p.pid,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 887,
                  columnNumber: 21
                },
                this
              )),
              activeOverlay && /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: "absolute inset-0 bg-red-950/90 border-4 border-red-600 z-30 flex flex-col items-center justify-center p-6 text-center animate-pulse",
                  style: { opacity: activeOverlay.opacity },
                  children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-red-600/30 rounded-full border border-red-500 mb-2", children: /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-8 h-8 text-red-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 912,
                      columnNumber: 23
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 911,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-extrabold text-white tracking-wide uppercase", children: activeOverlay.windowTitle }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 914,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-200 mt-1 max-w-sm", children: [
                      "Proces potomny: ",
                      /* @__PURE__ */ jsxDEV("code", { className: "bg-red-900/80 px-1 py-0.5 rounded font-mono", children: activeOverlay.name }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 918,
                        columnNumber: 39
                      }, this),
                      " (PID: ",
                      activeOverlay.pid,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 917,
                      columnNumber: 21
                    }, this),
                    activeOverlay.ppid ? /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-amber-300 mt-1 font-mono", children: [
                      "⚠️ Źródło / Rodzic (PPID: ",
                      activeOverlay.ppid,
                      "): ",
                      processes.find((p) => p.pid === activeOverlay.ppid)?.name || "Nieznany"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 921,
                      columnNumber: 23
                    }, this) : null,
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 mt-2", children: [
                      "Atrybuty: ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "WS_EX_TOPMOST" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 926,
                        columnNumber: 33
                      }, this),
                      " | ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "100% Ekranu" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 926,
                        columnNumber: 99
                      }, this),
                      " | ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "Przechwytywanie wejścia" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 926,
                        columnNumber: 163
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 925,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "mt-4 flex flex-wrap gap-2 justify-center", children: [
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: () => handleKillProcessTree(activeOverlay.ppid || activeOverlay.pid),
                          className: "px-3 py-1.5 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded text-xs font-bold shadow flex items-center gap-1",
                          children: [
                            /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5" }, void 0, false, {
                              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                              lineNumber: 933,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "Zlikwiduj Całe Drzewo (/T)" }, void 0, false, {
                              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                              lineNumber: 934,
                              columnNumber: 25
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                          lineNumber: 929,
                          columnNumber: 23
                        },
                        this
                      ),
                      /* @__PURE__ */ jsxDEV(
                        "button",
                        {
                          onClick: triggerQuarantineLockout,
                          className: "px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded text-xs font-bold shadow",
                          children: "Unieruchom w RAM & Kwarantanna"
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                          lineNumber: 936,
                          columnNumber: 23
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 928,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 907,
                  columnNumber: 19
                },
                this
              ),
              !activeOverlay && /* @__PURE__ */ jsxDEV("div", { className: "z-10 text-center text-slate-500", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-8 h-8 text-emerald-500 mx-auto mb-1 opacity-80" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 948,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-emerald-400", children: "Pulpit czysty i odblokowany" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 949,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Brak niepożądanych nakładek na pierwszym planie." }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 950,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 947,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 867,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 857,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800 mb-3", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 960,
                  columnNumber: 19
                }, this),
                "Tabela Procesów & Stanu Win32"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 959,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV(
                "button",
                {
                  onClick: () => setActiveTab("tree"),
                  className: "text-[10px] text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono",
                  children: [
                    /* @__PURE__ */ jsxDEV(FolderTree, { className: "w-3 h-3" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 967,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Otwórz Pełne Drzewo PPID →" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 968,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 963,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 958,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "space-y-2 overflow-y-auto max-h-[300px] pr-1", children: processes.map((p) => /* @__PURE__ */ jsxDEV(
              "div",
              {
                className: `p-2.5 rounded-lg border text-xs transition-all ${p.status === "pe_corrupted" ? "bg-rose-950/60 border-rose-600/80 text-rose-200 shadow-md shadow-rose-950/40" : p.status === "quarantined" ? "bg-purple-950/40 border-purple-800/60 text-purple-300" : p.status === "terminated" ? "bg-slate-950/60 border-slate-800 opacity-40 line-through" : p.isRogue || p.isTopMost ? "bg-red-950/30 border-red-800 text-red-200" : p.isParentDropper ? "bg-amber-950/30 border-amber-800 text-amber-200" : "bg-slate-950 border-slate-800 text-slate-300"}`,
                children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-white", children: p.name }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 992,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: [
                        "PID: ",
                        p.pid,
                        " ",
                        p.ppid ? `(PPID: ${p.ppid})` : ""
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 993,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 991,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "span",
                      {
                        className: `px-1.5 py-0.5 rounded text-[10px] font-bold font-mono ${p.status === "pe_corrupted" ? "bg-rose-900 text-rose-100 border border-rose-500 animate-pulse" : p.status === "quarantined" ? "bg-purple-900 text-purple-200 border border-purple-600" : p.status === "terminated" ? "bg-slate-800 text-slate-400" : p.isTopMost ? "bg-red-900 text-red-200 animate-pulse" : p.isParentDropper ? "bg-amber-900 text-amber-200" : "bg-emerald-950 text-emerald-300"}`,
                        children: p.status === "pe_corrupted" ? "💥 PE CORRUPTED" : p.status === "quarantined" ? "KWARANTANNA" : p.status === "terminated" ? "ZABITY" : p.isTopMost ? "TOPMOST OVERLAY" : p.isParentDropper ? "PARENT DROPPER" : "NORMALNY"
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 998,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 990,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-1 flex flex-wrap gap-1 text-[10px] text-slate-400", children: [
                    p.isTopMost && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-red-900/50 text-red-300 rounded font-mono", children: "WS_EX_TOPMOST" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1029,
                      columnNumber: 25
                    }, this),
                    p.hasFlutterDll && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-amber-900/50 text-amber-300 rounded font-mono", children: "flutter_windows.dll" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1034,
                      columnNumber: 25
                    }, this),
                    p.isParentDropper && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-amber-950 text-amber-300 rounded font-mono border border-amber-800", children: [
                      "Parent Watchdog (PPID: ",
                      p.pid,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1039,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 1027,
                    columnNumber: 21
                  }, this)
                ]
              },
              p.pid,
              true,
              {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 974,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 972,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-slate-800 flex-1 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Zdarzeń Silnika Python / Win32:" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 1051,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-emerald-400", children: "● LIVE MONITOR" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 1052,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 1050,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[10px] font-mono text-slate-300 space-y-1 h-32 overflow-y-auto", children: logs.map((log, idx) => /* @__PURE__ */ jsxDEV(
                "div",
                {
                  className: log.includes("WYKRYTO") || log.includes("SPAWN") || log.includes("TREE-KILL") ? "text-amber-400" : log.includes("KILL") || log.includes("PANIC") || log.includes("OSTRZEŻENIE") ? "text-red-400 font-bold" : log.includes("KWARANTANNA") || log.includes("ZAMROŻONO") || log.includes("SUKCES") ? "text-emerald-400 font-bold" : "text-slate-400",
                  children: log
                },
                idx,
                false,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 1056,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 1054,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 1049,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 957,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 855,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV(
          ProcessTreeView,
          {
            processes,
            onKillProcess: handleKillSingleProcess,
            onKillProcessTree: handleKillProcessTree,
            onSuspendTree: handleSuspendTree,
            onSabotageTree: handleSabotageTree
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 1077,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 854,
        columnNumber: 9
      }, this)
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
    lineNumber: 646,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyYWN0aXZlU2ltdWxhdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBQbGF5LCBQYXVzZSwgUmVmcmVzaEN3LCBTaGllbGRDaGVjaywgQWxlcnRUcmlhbmdsZSwgVGVybWluYWwsIE1vbml0b3IsIExvY2ssIFxuICBFeWUsIFphcCwgQ3Jvc3NoYWlyLCBCYW4sIFNoaWVsZEFsZXJ0LCBGaWxlWCwgRG93bmxvYWQsIEdpdEZvcmssIEZvbGRlclRyZWUsIFxuICBMYXllcnMsIEZsYW1lLCBTa3VsbCwgQ29tcGFzcywgQWN0aXZpdHksIEdhdWdlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBTaW11bGF0ZWRQcm9jZXNzLCBTaW11bGF0ZWRXaW5kb3cgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBQcm9jZXNzVHJlZVZpZXcgfSBmcm9tICcuL1Byb2Nlc3NUcmVlVmlldyc7XG5pbXBvcnQgeyBQcm9jZXNzV2F0Y2hkb2cgfSBmcm9tICcuL1Byb2Nlc3NXYXRjaGRvZyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3IgfSBmcm9tICcuLi91dGlscy9nbmlkYUF1dG9GcmVlemVTZW5zb3InO1xuXG5leHBvcnQgY29uc3QgSW50ZXJhY3RpdmVTaW11bGF0b3I6IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gdXNlU3RhdGU8J2ludGVncmF0ZWQnIHwgJ3RyZWUnIHwgJ2Rlc2t0b3AnIHwgJ3dhdGNoZG9nJz4oJ2ludGVncmF0ZWQnKTtcblxuICBjb25zdCBbcHJvY2Vzc2VzLCBzZXRQcm9jZXNzZXNdID0gdXNlU3RhdGU8U2ltdWxhdGVkUHJvY2Vzc1tdPihbXG4gICAge1xuICAgICAgcGlkOiAxMDQ0LFxuICAgICAgcHBpZDogMCxcbiAgICAgIG5hbWU6ICdleHBsb3Jlci5leGUnLFxuICAgICAgd2luZG93VGl0bGU6ICdFa3NwbG9yYXRvciBXaW5kb3dzJyxcbiAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICB3aWR0aDogMTAyNCxcbiAgICAgIGhlaWdodDogNzAwLFxuICAgICAgb3BhY2l0eTogMSxcbiAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgIGZpbGVQYXRoOiAnQzpcXFxcV2luZG93c1xcXFxleHBsb3Jlci5leGUnLFxuICAgICAgaXNSb2d1ZTogZmFsc2UsXG4gICAgICB3aW5kb3dzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBod25kOiAnMHgwMDAxMDA0QScsXG4gICAgICAgICAgdGl0bGU6ICdQYXNlayBaYWRhxYQgV2luZG93cyAmIFB1bHBpdCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnU2hlbGxfVHJheVduZCcsXG4gICAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDQ4IH0sXG4gICAgICAgICAgek9yZGVyOiAwLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogNDgyMCxcbiAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICBuYW1lOiAnY2hyb21lLmV4ZScsXG4gICAgICB3aW5kb3dUaXRsZTogJ0dvb2dsZSBDaHJvbWUgLSBTdGFjayBPdmVyZmxvdycsXG4gICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgd2lkdGg6IDEyODAsXG4gICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFByb2dyYW0gRmlsZXNcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlJyxcbiAgICAgIGlzUm9ndWU6IGZhbHNlLFxuICAgICAgd2luZG93czogW1xuICAgICAgICB7XG4gICAgICAgICAgaHduZDogJzB4MDAwNDVBMTInLFxuICAgICAgICAgIHRpdGxlOiAnR29vZ2xlIENocm9tZSAtIFN0YWNrIE92ZXJmbG93JyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdDaHJvbWVfV2lkZ2V0V2luXzEnLFxuICAgICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSxcbiAgICAgICAgICB6T3JkZXI6IDEsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgcGlkOiAzODQwLFxuICAgICAgcHBpZDogMTA0NCxcbiAgICAgIG5hbWU6ICdkcm9wcGVyX3dhdGNoZG9nLmV4ZScsXG4gICAgICB3aW5kb3dUaXRsZTogJ0JhY2tncm91bmQgV2F0Y2hkb2cgU2VydmljZSAoSGlkZGVuIERyb3BwZXIpJyxcbiAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICB3aWR0aDogMCxcbiAgICAgIGhlaWdodDogMCxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgaXNQYXJlbnREcm9wcGVyOiB0cnVlLFxuICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgIHdpbmRvd3M6IFtdLFxuICAgIH0sXG4gICAge1xuICAgICAgcGlkOiA4OTMyLFxuICAgICAgcHBpZDogMzg0MCxcbiAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgd2luZG93VGl0bGU6ICdGbHV0dGVyIEZ1bGxzY3JlZW4gTG9ja3NjcmVlbiBPdmVybGF5IFtXU19FWF9UT1BNT1NUXScsXG4gICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICBoYXNGbHV0dGVyRGxsOiB0cnVlLFxuICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICBvcGFjaXR5OiAwLjkyLFxuICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXGZsdXR0ZXJfcnVubmVyLmV4ZScsXG4gICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgd2luZG93czogW1xuICAgICAgICB7XG4gICAgICAgICAgaHduZDogJzB4MDA0RjFBMDInLFxuICAgICAgICAgIHRpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfUlVOTkVSX1dJTkRPVycsXG4gICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBod25kOiAnMHgwMDRGMUE4OCcsXG4gICAgICAgICAgdGl0bGU6ICdMYXllcmVkIFRyYW5zcGFyZW50IENsaWNrVHJhcCcsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9TVUJWSUVXX01PREFMJyxcbiAgICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgIGlzTGF5ZXJlZDogdHJ1ZSxcbiAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgIHpPcmRlcjogMTAwMCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgXSk7XG5cbiAgY29uc3QgW2lzUnVubmluZ1dhdGNoZG9nLCBzZXRJc1J1bm5pbmdXYXRjaGRvZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsb2dzLCBzZXRMb2dzXSA9IHVzZVN0YXRlPHN0cmluZ1tdPihbXG4gICAgJ1sqXSBJbmljamFsaXphY2phIMWbcm9kb3dpc2thIHN5bXVsYWNqaSBXaW4zMiBBUEkgJiBQUElEIExpbmVhZ2UgRW5naW5lLi4uJyxcbiAgICAnWypdIFphxYJhZG93YW5vIG1hcMSZIHJlbGFjamkgcHJvY2Vzw7N3OiBbZXhwbG9yZXIuZXhlIC0+IGRyb3BwZXJfd2F0Y2hkb2cuZXhlIC0+IGZsdXR0ZXJfcnVubmVyLmV4ZV0nLFxuICAgICdbKl0gR290b3d5IGRvIGRldGVrY2ppIGkgdW5pZXJ1Y2hhbWlhbmlhIHcgdHJ5YmllIDEwMCUgT0ZGTElORS4nLFxuICBdKTtcblxuICBjb25zdCBhZGRMb2cgPSAobXNnOiBzdHJpbmcpID0+IHtcbiAgICBzZXRMb2dzKChwcmV2KSA9PiBbLi4ucHJldi5zbGljZSgtMjApLCBgWyR7bmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKX1dICR7bXNnfWBdKTtcbiAgfTtcblxuICBjb25zdCBzcGF3bk92ZXJsYXkgPSAodHlwZTogJ2tpb3NrJyB8ICdzdGVhbHRoX2ZsdXR0ZXInIHwgJ3RyYW5zbHVjZW50JykgPT4ge1xuICAgIGNvbnN0IHBhcmVudFBpZCA9IE1hdGguZmxvb3IoMjAwMCArIE1hdGgucmFuZG9tKCkgKiAyMDAwKTtcbiAgICBjb25zdCBjaGlsZFBpZCA9IE1hdGguZmxvb3IoNjAwMCArIE1hdGgucmFuZG9tKCkgKiAzMDAwKTtcblxuICAgIGxldCBwYXJlbnRQcm9jOiBTaW11bGF0ZWRQcm9jZXNzO1xuICAgIGxldCBjaGlsZFByb2M6IFNpbXVsYXRlZFByb2Nlc3M7XG5cbiAgICBpZiAodHlwZSA9PT0gJ2tpb3NrJykge1xuICAgICAgcGFyZW50UHJvYyA9IHtcbiAgICAgICAgcGlkOiBwYXJlbnRQaWQsXG4gICAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICAgIG5hbWU6ICdraW9za191cGRhdGVyX3NlcnZpY2UuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdTZXJ2aWNlIERhZW1vbiAoQXV0by1SZXN0YXJ0IFdhdGNoZG9nKScsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxSb2FtaW5nXFxcXGtpb3NrX3VwZGF0ZXJfc2VydmljZS5leGUnLFxuICAgICAgICBpc1BhcmVudERyb3BwZXI6IHRydWUsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtdLFxuICAgICAgfTtcblxuICAgICAgY2hpbGRQcm9jID0ge1xuICAgICAgICBwaWQ6IGNoaWxkUGlkLFxuICAgICAgICBwcGlkOiBwYXJlbnRQaWQsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX2tpb3NrX2FwcC5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0ZsdXR0ZXIgS2lvc2sgTG9jayBPdmVybGF5IFtBTFdBWVNfT05fVE9QXScsXG4gICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiB0cnVlLFxuICAgICAgICB3aWR0aDogMTkyMCxcbiAgICAgICAgaGVpZ2h0OiAxMDgwLFxuICAgICAgICBvcGFjaXR5OiAwLjk1LFxuICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxSb2FtaW5nXFxcXGZsdXR0ZXJfa2lvc2tfYXBwLmV4ZScsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiBgMHgwMCR7TWF0aC5mbG9vcigxMDAwMDAgKyBNYXRoLnJhbmRvbSgpICogODAwMDAwKS50b1N0cmluZygxNil9YCxcbiAgICAgICAgICAgIHRpdGxlOiAnRmx1dHRlciBLaW9zayBMb2NrIE92ZXJsYXkgW0FMV0FZU19PTl9UT1BdJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfUlVOTkVSX1dJTkRPVycsXG4gICAgICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODAgfSxcbiAgICAgICAgICAgIHpPcmRlcjogOTk5LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0ZWFsdGhfZmx1dHRlcicpIHtcbiAgICAgIHBhcmVudFByb2MgPSB7XG4gICAgICAgIHBpZDogcGFyZW50UGlkLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAnbWFsd2FyZV9sb2FkZXIuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdTdGVhbHRoIExvYWRlciBTdWJzeXN0ZW0nLFxuICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxtYWx3YXJlX2xvYWRlci5leGUnLFxuICAgICAgICBpc1BhcmVudERyb3BwZXI6IHRydWUsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtdLFxuICAgICAgfTtcblxuICAgICAgY2hpbGRQcm9jID0ge1xuICAgICAgICBwaWQ6IGNoaWxkUGlkLFxuICAgICAgICBwcGlkOiBwYXJlbnRQaWQsXG4gICAgICAgIG5hbWU6ICdzdmNob3N0X2hlbHBlci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ1N5c3RlbSBBbGVydCAoRmx1dHRlciBFbmdpbmUgTW9kdWxlKScsXG4gICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiB0cnVlLFxuICAgICAgICB3aWR0aDogMTkyMCxcbiAgICAgICAgaGVpZ2h0OiAxMDgwLFxuICAgICAgICBvcGFjaXR5OiAwLjg4LFxuICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXHN2Y2hvc3RfaGVscGVyLmV4ZScsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiBgMHgwMCR7TWF0aC5mbG9vcigxMDAwMDAgKyBNYXRoLnJhbmRvbSgpICogODAwMDAwKS50b1N0cmluZygxNil9YCxcbiAgICAgICAgICAgIHRpdGxlOiAnU3lzdGVtIEFsZXJ0IChGbHV0dGVyIEVuZ2luZSBNb2R1bGUpJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfSE9TVF9XSU5ET1cnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgICB6T3JkZXI6IDk5OSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50UHJvYyA9IHtcbiAgICAgICAgcGlkOiBwYXJlbnRQaWQsXG4gICAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICAgIG5hbWU6ICdicm93c2VyX2luamVjdG9yLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnVHJhbnNwYXJlbnQgT3ZlcmxheSBTcGF3bmVyJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEb3dubG9hZHNcXFxcYnJvd3Nlcl9pbmplY3Rvci5leGUnLFxuICAgICAgICBpc1BhcmVudERyb3BwZXI6IHRydWUsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtdLFxuICAgICAgfTtcblxuICAgICAgY2hpbGRQcm9jID0ge1xuICAgICAgICBwaWQ6IGNoaWxkUGlkLFxuICAgICAgICBwcGlkOiBwYXJlbnRQaWQsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX292ZXJsYXlfY2xpY2t0cmFwLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnR2xhc3MgT3ZlcmxheSAoTGF5ZXJlZCBUcmFuc3BhcmVudCBDbGlja1RyYXApJyxcbiAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IHRydWUsXG4gICAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICAgIG9wYWNpdHk6IDAuNCxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvd25sb2Fkc1xcXFxmbHV0dGVyX292ZXJsYXlfY2xpY2t0cmFwLmV4ZScsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiBgMHgwMCR7TWF0aC5mbG9vcigxMDAwMDAgKyBNYXRoLnJhbmRvbSgpICogODAwMDAwKS50b1N0cmluZygxNil9YCxcbiAgICAgICAgICAgIHRpdGxlOiAnR2xhc3MgT3ZlcmxheSAoTGF5ZXJlZCBUcmFuc3BhcmVudCBDbGlja1RyYXApJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfQ0xJQ0tUUkFQX1dJTkRPVycsXG4gICAgICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IHRydWUsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiAxMDAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIHNldFByb2Nlc3NlcygocHJldikgPT4gWy4uLnByZXYuZmlsdGVyKChwKSA9PiBwLnN0YXR1cyA9PT0gJ3J1bm5pbmcnKSwgcGFyZW50UHJvYywgY2hpbGRQcm9jXSk7XG4gICAgYWRkTG9nKGBbU1BBV05dIFVydWNob21pb25vIHByb2NlcyByb2R6aWNhOiAke3BhcmVudFByb2MubmFtZX0gKFBJRDogJHtwYXJlbnRQcm9jLnBpZH0pIC0+IHd5Z2VuZXJvd2HFgiBwb3RvbWthOiAke2NoaWxkUHJvYy5uYW1lfSAoUElEOiAke2NoaWxkUHJvYy5waWR9KWApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtpbGxTaW5nbGVQcm9jZXNzID0gKHBpZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gcHJvY2Vzc2VzLmZpbmQoKHApID0+IHAucGlkID09PSBwaWQpO1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgYWRkTG9nKGBbS0lMTF0gVGVybWluYXRlUHJvY2VzcyhQSUQ6ICR7cGlkfSwgOSkgLT4gWmFta25pxJl0byBwcm9jZXMgJHt0YXJnZXQubmFtZX0uYCk7XG4gICAgXG4gICAgLy8gQ2hlY2sgaWYgaXQgaGFzIGEgbGl2aW5nIHBhcmVudCBkcm9wcGVyXG4gICAgaWYgKHRhcmdldC5wcGlkICYmIHRhcmdldC5pc1JvZ3VlKSB7XG4gICAgICBjb25zdCBwYXJlbnQgPSBwcm9jZXNzZXMuZmluZCgocCkgPT4gcC5waWQgPT09IHRhcmdldC5wcGlkICYmIHAuc3RhdHVzID09PSAncnVubmluZycpO1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBhZGRMb2coYFvimqDvuI8gT1NUUlpFxbtFTklFIEZPUkVOU0lDXSBQcm9jZXMtcm9kemljICcke3BhcmVudC5uYW1lfScgKFBJRDogJHtwYXJlbnQucGlkfSkgd2NpxIXFvCBkemlhxYJhISBNb8W8ZSB3a3LDs3RjZSB6cmVzdGFydG93YcSHIG9rbm8gRmx1dHRlcmEuYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IChwLnBpZCA9PT0gcGlkID8geyAuLi5wLCBzdGF0dXM6ICd0ZXJtaW5hdGVkJyBhcyBjb25zdCB9IDogcCkpXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVLaWxsUHJvY2Vzc1RyZWUgPSAocm9vdFBpZDogbnVtYmVyKSA9PiB7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDYwKSk7XG4gICAgYWRkTG9nKGDwn4yzIFtUUkVFLUtJTEwgL1RdIFJvenBvY3rEmXRvIGxpa3dpZGFjasSZIHBvZGRyemV3YSBwcm9jZXPDs3cgb2QgUElEICR7cm9vdFBpZH0uLi5gKTtcbiAgICBcbiAgICAvLyBGaW5kIGFsbCBkZXNjZW5kYW50cyByZWN1cnNpdmVseVxuICAgIGNvbnN0IHBpZHNUb0tpbGwgPSBuZXcgU2V0PG51bWJlcj4oKTtcbiAgICBjb25zdCBmaW5kQ2hpbGRyZW4gPSAoY3VycmVudFBpZDogbnVtYmVyKSA9PiB7XG4gICAgICBwaWRzVG9LaWxsLmFkZChjdXJyZW50UGlkKTtcbiAgICAgIHByb2Nlc3Nlcy5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBwaWQgPT09IGN1cnJlbnRQaWQgJiYgIXBpZHNUb0tpbGwuaGFzKHAucGlkKSkge1xuICAgICAgICAgIGZpbmRDaGlsZHJlbihwLnBpZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZmluZENoaWxkcmVuKHJvb3RQaWQpO1xuXG4gICAgcGlkc1RvS2lsbC5mb3JFYWNoKChwaWQpID0+IHtcbiAgICAgIGNvbnN0IHAgPSBwcm9jZXNzZXMuZmluZCgoaXRlbSkgPT4gaXRlbS5waWQgPT09IHBpZCk7XG4gICAgICBpZiAocCkge1xuICAgICAgICBhZGRMb2coYCAgLT4gW1pBQklUT10gUElEICR7cGlkfSAoJHtwLm5hbWV9KSAtIFp3b2xuaW9ubyB1Y2h3eXR5IG9raWVuIEhXTkQuYCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHBpZHNUb0tpbGwuaGFzKHAucGlkKSA/IHsgLi4ucCwgc3RhdHVzOiAndGVybWluYXRlZCcgYXMgY29uc3QgfSA6IHApKVxuICAgICk7XG4gICAgYWRkTG9nKGDinJQgW1NVS0NFU10gQ2HFgmUgcG9kZHJ6ZXdvICgke3BpZHNUb0tpbGwuc2l6ZX0gcHJvY2Vzw7N3KSB6b3N0YcWCbyBkZWZpbml0eXduaWUgdXN1bmnEmXRlIHogUkFNLmApO1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2MCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVN1c3BlbmRUcmVlID0gKHJvb3RQaWQ6IG51bWJlcikgPT4ge1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2MCkpO1xuICAgIGFkZExvZyhg4p2E77iPIFtGUkVFWkUgVFJFRV0gWmFtcmHFvGFuaWUgd3N6eXN0a2ljaCB3xIV0a8OzdyB3IHBvZGRyemV3aWUgUElEICR7cm9vdFBpZH0gKE50U3VzcGVuZFByb2Nlc3MpLi4uYCk7XG4gICAgXG4gICAgY29uc3QgcGlkc1RvU3VzcGVuZCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgIGNvbnN0IGZpbmRDaGlsZHJlbiA9IChjdXJyZW50UGlkOiBudW1iZXIpID0+IHtcbiAgICAgIHBpZHNUb1N1c3BlbmQuYWRkKGN1cnJlbnRQaWQpO1xuICAgICAgcHJvY2Vzc2VzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgaWYgKHAucHBpZCA9PT0gY3VycmVudFBpZCAmJiAhcGlkc1RvU3VzcGVuZC5oYXMocC5waWQpKSB7XG4gICAgICAgICAgZmluZENoaWxkcmVuKHAucGlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBmaW5kQ2hpbGRyZW4ocm9vdFBpZCk7XG5cbiAgICBwaWRzVG9TdXNwZW5kLmZvckVhY2goKHBpZCkgPT4ge1xuICAgICAgY29uc3QgcCA9IHByb2Nlc3Nlcy5maW5kKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIGFkZExvZyhgICAtPiBbWkFNUk/Fu09OTyBSQU1dIFBJRCAke3BpZH0gKCR7cC5uYW1lfSkgLSBaYXRyenltYW5vIGN6YXMgcHJvY2Vzb3JhLmApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IChwaWRzVG9TdXNwZW5kLmhhcyhwLnBpZCkgPyB7IC4uLnAsIHN0YXR1czogJ3F1YXJhbnRpbmVkJyBhcyBjb25zdCB9IDogcCkpXG4gICAgKTtcbiAgICBhZGRMb2coYOKclCBbU1VLQ0VTXSBabmV1dHJhbGl6b3dhbm8gJHtwaWRzVG9TdXNwZW5kLnNpemV9IHByb2Nlc8OzdyB3IHBhbWnEmWNpLmApO1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2MCkpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhYm90YWdlVHJlZSA9IChyb290UGlkOiBudW1iZXIpID0+IHtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNjUpKTtcbiAgICBhZGRMb2coYPCfkqUgW1NBQk9UQcW7IFBFIERSWkVXQV0gVHJ3YcWCZSBuaXN6Y3plbmllIG5hZ8WCw7N3a8OzdyBQRSBkbGEgY2HFgmVnbyDFgmHFhGN1Y2hhIFBJRCAke3Jvb3RQaWR9Li4uYCk7XG5cbiAgICBjb25zdCBwaWRzVG9TYWJvdGFnZSA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgIGNvbnN0IGZpbmRDaGlsZHJlbiA9IChjdXJyZW50UGlkOiBudW1iZXIpID0+IHtcbiAgICAgIHBpZHNUb1NhYm90YWdlLmFkZChjdXJyZW50UGlkKTtcbiAgICAgIHByb2Nlc3Nlcy5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBwaWQgPT09IGN1cnJlbnRQaWQgJiYgIXBpZHNUb1NhYm90YWdlLmhhcyhwLnBpZCkpIHtcbiAgICAgICAgICBmaW5kQ2hpbGRyZW4ocC5waWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZpbmRDaGlsZHJlbihyb290UGlkKTtcblxuICAgIHBpZHNUb1NhYm90YWdlLmZvckVhY2goKHBpZCkgPT4ge1xuICAgICAgY29uc3QgcCA9IHByb2Nlc3Nlcy5maW5kKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKTtcbiAgICAgIGlmIChwICYmIHAuZmlsZVBhdGgpIHtcbiAgICAgICAgYWRkTG9nKGAgIC0+IFtQRSBDT1JSVVBUXSAke3AubmFtZX0gKFBJRCAke3BpZH0pOiBOYWRwaXNhbm8gbmFnxYLDs3dlayBNWiB6ZXJhbWkgLT4gMHhDMDAwMDA3QiFgKTtcbiAgICAgICAgYWRkTG9nKGAgIC0+IFtBQ0wgREVOWV0gaWNhY2xzIFwiJHtwLmZpbGVQYXRofVwiIC9pbmhlcml0YW5jZTpyIC9kZW55ICpTLTEtMS0wOihGLFgsUixXKWApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHApID0+IChwaWRzVG9TYWJvdGFnZS5oYXMocC5waWQpID8geyAuLi5wLCBzdGF0dXM6ICdwZV9jb3JydXB0ZWQnIGFzIGNvbnN0IH0gOiBwKSlcbiAgICApO1xuICAgIGFkZExvZyhg4pyUIFtTVUtDRVNdIFpuaXN6Y3pvbm8gYmluYXJuaWUgJHtwaWRzVG9TYWJvdGFnZS5zaXplfSBwbGlrw7N3IHd5a29ueXdhbG55Y2ggbmEgZHlza3UuYCk7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDY1KSk7XG4gIH07XG5cbiAgY29uc3QgcnVuRGV0ZWN0aW9uQ3ljbGUgPSAoKSA9PiB7XG4gICAgYWRkTG9nKCc+PiBbUHl0aG9uXSBFbnVtV2luZG93cygpICYgUFBJRCBJbnNwZWN0b3Igc2thbnVqZSBsaXN0xJkgb2tpZW4gaSBwcm9jZXPDs3cuLi4nKTtcblxuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwcm9jKSA9PiB7XG4gICAgICAgIGlmIChwcm9jLnN0YXR1cyAhPT0gJ3J1bm5pbmcnKSByZXR1cm4gcHJvYztcblxuICAgICAgICBjb25zdCBpc1RvcG1vc3QgPSBwcm9jLmlzVG9wTW9zdDtcbiAgICAgICAgY29uc3QgaXNGdWxsc2NyZWVuID0gcHJvYy5pc0Z1bGxzY3JlZW47XG4gICAgICAgIGNvbnN0IGlzRmx1dHRlciA9IHByb2MuaGFzRmx1dHRlckRsbCB8fCBwcm9jLm5hbWUuaW5jbHVkZXMoJ2ZsdXR0ZXInKTtcblxuICAgICAgICBpZiAoKGlzVG9wbW9zdCAmJiBpc0Z1bGxzY3JlZW4pIHx8IChpc0ZsdXR0ZXIgJiYgaXNUb3Btb3N0KSkge1xuICAgICAgICAgIGFkZExvZyhgWyFdIFdZS1JZVE86IEhXTkQgUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pIFtQUElEOiAke3Byb2MucHBpZCB8fCAnTi9BJ31dIC0+IFdTX0VYX1RPUE1PU1Q9JHtpc1RvcG1vc3R9LCBGdWxsc2NyZWVuPSR7aXNGdWxsc2NyZWVufWApO1xuICAgICAgICAgIGFkZExvZyhgWytdIFtLSUxMXSBwc3V0aWwuUHJvY2Vzcygke3Byb2MucGlkfSkua2lsbCgpIC0+IFBST0NFUyBaTElLV0lET1dBTlkhYCk7XG4gICAgICAgICAgcmV0dXJuIHsgLi4ucHJvYywgc3RhdHVzOiAndGVybWluYXRlZCcgYXMgY29uc3QgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvYztcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICAvLyBEZWRpY2F0ZWQgVU5JRVJVQ0hPTUlFTklFICYgS1dBUkFOVEFOTkEgKEZyZWV6ZSArIEJpbmFyeSBMb2Nrb3V0KVxuICBjb25zdCB0cmlnZ2VyUXVhcmFudGluZUxvY2tvdXQgPSAoKSA9PiB7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDU1KSk7XG4gICAgYWRkTG9nKCfimqEgW0tXQVJBTlRBTk5BIENBxYFFR08gxYFBxYNDVUNIQV0gVXJ1Y2hvbWlvbm8gcHJvY2VkdXLEmSB0cndhxYJlZ28gdW5pZXJ1Y2hvbWllbmlhIScpO1xuICAgIFxuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwcm9jKSA9PiB7XG4gICAgICAgIGlmIChwcm9jLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChwcm9jLmlzVG9wTW9zdCB8fCBwcm9jLmhhc0ZsdXR0ZXJEbGwgfHwgcHJvYy5pc0Jsb2NrZWQgfHwgcHJvYy5pc1BhcmVudERyb3BwZXIpKSB7XG4gICAgICAgICAgYWRkTG9nKGBbS1JPSyAxXSBOdFN1c3BlbmRQcm9jZXNzKFBJRDogJHtwcm9jLnBpZH0gLSAke3Byb2MubmFtZX0pIC0+IFphbXJvxbxvbm8gd8SFdGtpIHcgUkFNLmApO1xuICAgICAgICAgIGFkZExvZyhgW0tST0sgMl0gaWNhY2xzIFwiJHtwcm9jLmZpbGVQYXRofVwiIC9kZW55IEV2ZXJ5b25lOihYLFcpIC0+IFphYmxva293YW5vIHVwcmF3bmllbmlhIG5hIGR5c2t1LmApO1xuICAgICAgICAgIGFkZExvZyhgW0tST0sgM10gSUZFTyBMb2NrOiBaYWJsb2tvd2FubyBwb25vd255IHN0YXJ0IHBsaWt1ICcke3Byb2MubmFtZX0nLmApO1xuICAgICAgICAgIGFkZExvZyhgW0tST0sgNF0gVGVybWluYXRlUHJvY2VzcyhQSUQ6ICR7cHJvYy5waWR9KSAtPiBaYWtvxYRjem9ubyBwcm9jZXMuYCk7XG4gICAgICAgICAgcmV0dXJuIHsgLi4ucHJvYywgc3RhdHVzOiAncXVhcmFudGluZWQnIGFzIGNvbnN0IH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2M7XG4gICAgICB9KVxuICAgICk7XG4gICAgYWRkTG9nKCfinJQgW1NVS0NFU10gV3N6ZWxraWUgesWCb8WbbGl3ZSBwcm9jZXN5ICh3cmF6IHogcm9kemljYW1pKSB6b3N0YcWCeSBzcGV0cnlmaWtvd2FuZS4nKTtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNTUpKTtcbiAgfTtcblxuICAvLyBEZWRpY2F0ZWQgVFJXQcWBWSBTQUJPVEHFuyBQRSAmIEJMT0tBREEgQUNMIChaZXJvIE1aICsgQUNMIERlbnkpXG4gIGNvbnN0IHRyaWdnZXJQZVNhYm90YWdlQW5kQWNsTG9jayA9ICgpID0+IHtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNjApKTtcbiAgICBhZGRMb2coJ/CfkqUgW1NBQk9UQcW7IFBFICYgQUNMXSBVcnVjaG9taW9ubyB0cndhxYJlIHVzemtvZHplbmllIHBsaWvDs3cgd3lrb255d2FsbnljaCEnKTtcbiAgICBcbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocHJvYykgPT4ge1xuICAgICAgICBpZiAocHJvYy5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAocHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5oYXNGbHV0dGVyRGxsIHx8IHByb2MuaXNCbG9ja2VkIHx8IHByb2MuaXNQYXJlbnREcm9wcGVyKSkge1xuICAgICAgICAgIGFkZExvZyhgWzEuIEZSRUVaRV0gTnRTdXNwZW5kUHJvY2VzcyhQSUQ6ICR7cHJvYy5waWR9IC0gJHtwcm9jLm5hbWV9KSAtPiBaYW1yb8W8ZW5pZSB3xIV0a8OzdyB3IFJBTS5gKTtcbiAgICAgICAgICBhZGRMb2coYFsyLiBLSUxMXSBUZXJtaW5hdGVQcm9jZXNzKFBJRDogJHtwcm9jLnBpZH0pIC0+IE9kYmxva293YW5pZSB1Y2h3eXR1IHBsaWt1LmApO1xuICAgICAgICAgIGFkZExvZyhgWzMuIFBFIFNBQk9UQUdFXSBOYWRwaXNhbm8gc3lnbmF0dXLEmSBET1MgJ01aJyAoMHg1QTREKSAtPiAnREVBRCcgb3JheiB3eXplcm93YW5vIG5hZ8WCw7N3ZWsgUEUuYCk7XG4gICAgICAgICAgYWRkTG9nKGAgICAgLT4gV2luZG93cyBQRSBMb2FkZXIgendyYWNhIHRlcmF6IGLFgsSFZDogMHhDMDAwMDA3QiAoU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUKSFgKTtcbiAgICAgICAgICBhZGRMb2coYFs0LiBBQ0wgTE9DS09VVF0gaWNhY2xzIFwiJHtwcm9jLmZpbGVQYXRofVwiIC9pbmhlcml0YW5jZTpyIC9kZW55ICpTLTEtMS0wOihGLFgsUixXKWApO1xuICAgICAgICAgIHJldHVybiB7IC4uLnByb2MsIHN0YXR1czogJ3BlX2NvcnJ1cHRlZCcgYXMgY29uc3QgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvYztcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhZGRMb2coJ+KclCBbU1VLQ0VTXSBQbGlraSAuZXhlIChyb2R6aWMgaSBkemllY2kpIHpvc3RhxYJ5IHRyd2FsZSB6bmlzemN6b25lIGJpbmFybmllIScpO1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2MCkpO1xuICB9O1xuXG4gIC8vIENvbnRpbnVvdXMgV2F0Y2hkb2cgRWZmZWN0ICYgU2Vuc29yIEF1dG8tRnJlZXplIFN5bmNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3NpbXVsYXRlZF9wcm9jZXNzZXMnLCBwcm9jZXNzZXMpO1xuICB9LCBbcHJvY2Vzc2VzXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVBdXRvRnJvemVuID0gKGU6IGFueSkgPT4ge1xuICAgICAgY29uc3QgZGV0YWlsID0gZS5kZXRhaWw7XG4gICAgICBpZiAoZGV0YWlsICYmIGRldGFpbC5waWQpIHtcbiAgICAgICAgYWRkTG9nKGBb4pqhIENaVUpOSUsgR05JRCBBVVRPLUZSRUVaRV0gTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgdyBSQU0gKDAgbXMpOiBQSUQgJHtkZXRhaWwucGlkfSAoJHtkZXRhaWwudGFyZ2V0TmFtZX0pYCk7XG4gICAgICAgIHNldFByb2Nlc3NlcyhwcmV2ID0+IHByZXYubWFwKHAgPT4ge1xuICAgICAgICAgIGlmIChwLnBpZCA9PT0gZGV0YWlsLnBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4ucCwgc3RhdHVzOiAnc3VzcGVuZGVkJywgaXNCbG9ja2VkOiB0cnVlLCBvcGFjaXR5OiAwLjIgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2VudGluZWw6Z25pZGEtYXV0by1mcm96ZW4nLCBoYW5kbGVBdXRvRnJvemVuKTtcbiAgICB9XG5cbiAgICBsZXQgaW50ZXJ2YWw6IGFueTtcbiAgICBpZiAoaXNSdW5uaW5nV2F0Y2hkb2cpIHtcbiAgICAgIGFkZExvZygnWypdIFVydWNob21pb25vIHDEmXRsxJkgY2nEhWfFgmVnbyBtb25pdG9yb3dhbmlhIChXYXRjaGRvZyBEYWVtb24gY28gMTIwMG1zKScpO1xuICAgICAgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIHJ1bkRldGVjdGlvbkN5Y2xlKCk7XG4gICAgICB9LCAxMjAwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGludGVydmFsKSBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6Z25pZGEtYXV0by1mcm96ZW4nLCBoYW5kbGVBdXRvRnJvemVuKTtcbiAgICAgIH1cbiAgICB9O1xuICB9LCBbaXNSdW5uaW5nV2F0Y2hkb2ddKTtcblxuICBjb25zdCB0cmlnZ2VyUGFuaWNIb3RrZXkgPSAoKSA9PiB7XG4gICAgYWRkTG9nKCdbUEFOSUNdIFdjacWbbmnEmXRvIGdsb2JhbG55IHNrcsOzdCBhd2FyeWpueSBbQ3RybCArIEFsdCArIFNoaWZ0ICsgS10hJyk7XG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgaWYgKHByb2Muc3RhdHVzID09PSAncnVubmluZycgJiYgKHByb2MuaXNUb3BNb3N0IHx8IHByb2MuaGFzRmx1dHRlckRsbCkpIHtcbiAgICAgICAgICBhZGRMb2coYFtQQU5JQyBLSUxMXSBabGlrd2lkb3dhbm8gbmF0eWNobWlhc3QgUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pYCk7XG4gICAgICAgICAgcmV0dXJuIHsgLi4ucHJvYywgc3RhdHVzOiAndGVybWluYXRlZCcgYXMgY29uc3QgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvYztcbiAgICAgIH0pXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZXNldEFsbCA9ICgpID0+IHtcbiAgICBzZXRQcm9jZXNzZXMoW1xuICAgICAge1xuICAgICAgICBwaWQ6IDEwNDQsXG4gICAgICAgIHBwaWQ6IDAsXG4gICAgICAgIG5hbWU6ICdleHBsb3Jlci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0Vrc3Bsb3JhdG9yIFdpbmRvd3MnLFxuICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDEwMjQsXG4gICAgICAgIGhlaWdodDogNzAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxXaW5kb3dzXFxcXGV4cGxvcmVyLmV4ZScsXG4gICAgICAgIGlzUm9ndWU6IGZhbHNlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogJzB4MDAwMTAwNEEnLFxuICAgICAgICAgICAgdGl0bGU6ICdQYXNlayBaYWRhxYQgV2luZG93cyAmIFB1bHBpdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdTaGVsbF9UcmF5V25kJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiA0OCB9LFxuICAgICAgICAgICAgek9yZGVyOiAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwaWQ6IDQ4MjAsXG4gICAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICAgIG5hbWU6ICdjaHJvbWUuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdHb29nbGUgQ2hyb21lIC0gUHVscGl0JyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAxMjgwLFxuICAgICAgICBoZWlnaHQ6IDgwMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcUHJvZ3JhbSBGaWxlc1xcXFxHb29nbGVcXFxcQ2hyb21lXFxcXEFwcGxpY2F0aW9uXFxcXGNocm9tZS5leGUnLFxuICAgICAgICBpc1JvZ3VlOiBmYWxzZSxcbiAgICAgICAgd2luZG93czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGh3bmQ6ICcweDAwMDQ1QTEyJyxcbiAgICAgICAgICAgIHRpdGxlOiAnR29vZ2xlIENocm9tZSAtIFB1bHBpdCcsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdDaHJvbWVfV2lkZ2V0V2luXzEnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxMjgwLCBoZWlnaHQ6IDgwMCB9LFxuICAgICAgICAgICAgek9yZGVyOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwaWQ6IDM4NDAsXG4gICAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICAgIG5hbWU6ICdkcm9wcGVyX3dhdGNoZG9nLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnQmFja2dyb3VuZCBXYXRjaGRvZyBTZXJ2aWNlIChIaWRkZW4gRHJvcHBlciknLFxuICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxkcm9wcGVyX3dhdGNoZG9nLmV4ZScsXG4gICAgICAgIGlzUGFyZW50RHJvcHBlcjogdHJ1ZSxcbiAgICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgICAgd2luZG93czogW10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwaWQ6IDg5MzIsXG4gICAgICAgIHBwaWQ6IDM4NDAsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0ZsdXR0ZXIgRnVsbHNjcmVlbiBMb2Nrc2NyZWVuIE92ZXJsYXkgW1dTX0VYX1RPUE1PU1RdJyxcbiAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IHRydWUsXG4gICAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICAgIG9wYWNpdHk6IDAuOTIsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZmx1dHRlcl9ydW5uZXIuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgICAgd2luZG93czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGh3bmQ6ICcweDAwNEYxQTAyJyxcbiAgICAgICAgICAgIHRpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9SVU5ORVJfV0lORE9XJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiAnMHgwMDRGMUE4OCcsXG4gICAgICAgICAgICB0aXRsZTogJ0xheWVyZWQgVHJhbnNwYXJlbnQgQ2xpY2tUcmFwJyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfU1VCVklFV19NT0RBTCcsXG4gICAgICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IHRydWUsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiAxMDAwLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0pO1xuICAgIGFkZExvZygnW1JFU0VUXSBacmVzZXRvd2FubyBsaXN0xJkgcHJvY2Vzw7N3IGkgenJla29uc3RydW93YW5vIGRyemV3byBQUElELicpO1xuICB9O1xuXG4gIGNvbnN0IGFjdGl2ZU92ZXJsYXkgPSBwcm9jZXNzZXMuZmluZChcbiAgICAocCkgPT4gcC5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAocC5pc1RvcE1vc3QgfHwgcC5pc0Z1bGxzY3JlZW4pXG4gICk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNlwiPlxuICAgICAgey8qIEhlYWRlciBJbmZvIEJhbm5lciAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC01IHNoYWRvdy1sZyBmbGV4IGZsZXgtY29sIG1kOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IG1kOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwidGV4dC14bCBmb250LWJvbGQgdGV4dC13aGl0ZSBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgPE1vbml0b3IgY2xhc3NOYW1lPVwidy01IGgtNSB0ZXh0LXJlZC01MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+SW50ZXJha3R5d255IFN5bXVsYXRvciBQYW1pxJljaSwgRWtyYW51ICYgRHJ6ZXdhIFByb2Nlc8Ozdzwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1wdXJwbGUtOTUwIHRleHQtcHVycGxlLTMwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAgZm9udC1tb25vIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICBUUkVFLVZJRVcgJiBQUElEIFRSQUNFUlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0xIG1heC13LTJ4bFwiPlxuICAgICAgICAgICAgV2l6dWFsaXp1aiByZWxhY2plIG1pxJlkenkgcHJvY2VzZW0tbWF0a8SFIChEcm9wcGVyL1dhdGNoZG9nKSBhIG9rbmFtaSBuYWvFgmFkZWsgRmx1dHRlcmEgKDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMCBmb250LW1vbm9cIj5IV05EPC9jb2RlPikuIFppZGVudHlmaWt1aiBwcmF3ZHppd2Ugxbpyw7NkxYJvIHrFgm/Fm2xpd2VnbyBva25hIGkgemxpa3dpZHVqIGNhxYJlIGRyemV3byBvZCBrb3J6ZW5pYS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS03MDAgdG8tcGluay03MDAgaG92ZXI6ZnJvbS1wdXJwbGUtNjAwIGhvdmVyOnRvLXBpbmstNjAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgIHRpdGxlPVwiUG9iaWVyeiBnb3Rvd3kgcGFraWV0IHNrcnlwdMOzdyByYXR1bmtvd3ljaCAuYmF0IGkgLnB5IG5hIGR5c2tcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlBvYmllcnogUGFraWV0IE9mZmxpbmUgKC5iYXQgKyAucHkpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVmlldyBTd2l0Y2hlciBUYWJzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctc2xhdGUtOTAwLzgwIHAtMS41IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTFcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2ludGVncmF0ZWQnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnaW50ZWdyYXRlZCdcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPExheWVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5XaWRvayBaaW50ZWdyb3dhbnkgKFB1bHBpdCArIERyemV3byk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3RyZWUnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAndHJlZSdcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZvbGRlclRyZWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+RHJ6ZXdvIFByb2Nlc8OzdyAmIERldGVrdG9yIFBvY2hvZHplbmlhIChUcmVlLVZpZXcpPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdkZXNrdG9wJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2Rlc2t0b3AnXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxNb25pdG9yIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPldpcnR1YWxueSBQdWxwaXQgJiBQb2RnbMSFZCBSQU08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ3dhdGNoZG9nJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3dhdGNoZG9nJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R2F1Z2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Qcm9jZXNzIFdhdGNoZG9nIChDUFUgLyBSQU0gTGl2ZSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vIGhpZGRlbiBzbTpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxzcGFuPkFrdHl3bmUgcHJvY2VzeTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlXCI+e3Byb2Nlc3Nlcy5maWx0ZXIocCA9PiBwLnN0YXR1cyA9PT0gJ3J1bm5pbmcnKS5sZW5ndGh9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj5aYWdyb8W8ZW5pYTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXJlZC00MDBcIj57cHJvY2Vzc2VzLmZpbHRlcihwID0+IHAuc3RhdHVzID09PSAncnVubmluZycgJiYgcC5pc1JvZ3VlKS5sZW5ndGh9PC9zdHJvbmc+PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogQ29udHJvbCBCYXIgJiBBY3Rpb25zICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgIHsvKiBTcGF3biBDb250cm9scyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJsb2NrXCI+XG4gICAgICAgICAgICAxLiBXeWdlbmVydWogWmRhcnplbmllIFphZ3JvxbxlbmlhXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNwYXduT3ZlcmxheSgna2lvc2snKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXJlZC0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciBib3JkZXItcmVkLTkwMC80MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPlBlxYJueSBFa3JhbiAoRHJvcHBlciArIEtpb3NrKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc3Bhd25PdmVybGF5KCdzdGVhbHRoX2ZsdXR0ZXInKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gYm9yZGVyIGJvcmRlci1hbWJlci05MDAvNDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj5aYWthbXVmbG93YW55IChMb2FkZXIgKyBETEwpPC9zcGFuPlxuICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNwYXduT3ZlcmxheSgndHJhbnNsdWNlbnQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWluZGlnby0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciBib3JkZXItaW5kaWdvLTkwMC80MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPlByemV6cm9jenlzdGEgUHXFgmFwa2EgTXlzemtpPC9zcGFuPlxuICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFjdGljYWwgRGVmZW5zZSBBY3Rpb25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTMgbGc6Y29sLXNwYW4tM1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgMi4gV3lrb25haiBBa2NqxJkgT2Jyb25uxIVcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy01IGdhcC0yXCI+XG4gICAgICAgICAgICB7LyogVFJXQcWBWSBTQUJPVEHFuyBQRSAmIEFDTCAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlclBlU2Fib3RhZ2VBbmRBY2xMb2NrfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHB4LTMgcHktMi41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNzAwIHZpYS1yb3NlLTcwMCB0by1waW5rLTcwMCBob3Zlcjpmcm9tLXJlZC02MDAgaG92ZXI6dG8tcGluay02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1sZyBzaGFkb3ctcmVkLTkwMC80MCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXJlZC00MDAvNDAgcmluZy0xIHJpbmctcmVkLTQwMC8zMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiTmFkcGlzdWplIG5hZ8WCw7N3ZWsgUEUgKDB4NUE0RCBNWiAtPiBERUFEKSBpIG9kY2luYSB1cHJhd25pZW5pYSBEQUNMIChpY2FjbHMgL2RlbnkgRXZlcnlvbmUpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZpbGVYIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPvCfkqUgU0FCT1RBxbsgUEUgJiBBQ0w8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFVOSUVSVUNIT00gJiBLV0FSQU5UQU5OQSAtIFNQRUNJQUwgQlVUVE9OICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXt0cmlnZ2VyUXVhcmFudGluZUxvY2tvdXR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS03MDAgdG8taW5kaWdvLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8taW5kaWdvLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTAwLzQwIHRyYW5zaXRpb24tYWxsIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC8zMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFtcmHFvGEgcHJvY2VzIHcgUkFNIGkgb2RiaWVyYSB1cHJhd25pZW5pYSBwbGlrb3dpIG5hIGR5c2t1XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5VTklFUlVDSE9NIFcgUkFNPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBTa2FudWogJiBaYWJpaiBKZWRub3Jhem93byAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17cnVuRGV0ZWN0aW9uQ3ljbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yLjUgYmctcmVkLTYwMCBob3ZlcjpiZy1yZWQtNTAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+U2thbnVqICYgWmFiaWo8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFNrcsOzdCBQYW5pa2kgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RyaWdnZXJQYW5pY0hvdGtleX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIuNSBiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtYm9sZCByb3VuZGVkLWxnIHRleHQteHMgc2hhZG93IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+U2tyw7N0IFBhbmlraTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogV2F0Y2hkb2cgUMSZdGxhICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1J1bm5pbmdXYXRjaGRvZyghaXNSdW5uaW5nV2F0Y2hkb2cpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHB4LTMgcHktMi41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgIGlzUnVubmluZ1dhdGNoZG9nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzUnVubmluZ1dhdGNoZG9nID8gPFBhdXNlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e2lzUnVubmluZ1dhdGNoZG9nID8gJ1N0cmHFvG5pazogT04nIDogJ0RlbW9uIFdhdGNoZG9nJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIERyemV3byBQUElEOiBpZGVudHlmaWt1amUgcHJvY2VzeSBuYWRyesSZZG5lIChEcm9wcGVyeS9XYXRjaGRvZ2kpLCB6YXBvYmllZ2FqxIVjIG9kcmFkemFuaXUgc2nEmSBva2llbi5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17cmVzZXRBbGx9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5SZXNldCBzeW11bGF0b3JhPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBDb25kaXRpb25hbGx5IFJlbmRlcmVkIFZpZXdzICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3dhdGNoZG9nJyA/IChcbiAgICAgICAgPFByb2Nlc3NXYXRjaGRvZyBpbml0aWFsUHJvY2Vzc2VzPXtwcm9jZXNzZXN9IC8+XG4gICAgICApIDogYWN0aXZlVGFiID09PSAndHJlZScgPyAoXG4gICAgICAgIC8qIEZ1bGwgVHJlZSBWaWV3IE1vZGUgKi9cbiAgICAgICAgPFByb2Nlc3NUcmVlVmlld1xuICAgICAgICAgIHByb2Nlc3Nlcz17cHJvY2Vzc2VzfVxuICAgICAgICAgIG9uS2lsbFByb2Nlc3M9e2hhbmRsZUtpbGxTaW5nbGVQcm9jZXNzfVxuICAgICAgICAgIG9uS2lsbFByb2Nlc3NUcmVlPXtoYW5kbGVLaWxsUHJvY2Vzc1RyZWV9XG4gICAgICAgICAgb25TdXNwZW5kVHJlZT17aGFuZGxlU3VzcGVuZFRyZWV9XG4gICAgICAgICAgb25TYWJvdGFnZVRyZWU9e2hhbmRsZVNhYm90YWdlVHJlZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIC8qIFNwbGl0IEludGVncmF0ZWQgb3IgRGVza3RvcCBWaWV3ICovXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgICAgey8qIFZpcnR1YWwgRGVza3RvcCBEaXNwbGF5ICg3IGNvbHMpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYmx1ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgV2lydHVhbG55IFB1bHBpdCBXaW5kb3dzIDExICgxOTIweDEwODApXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlotT1JERVIgLyBMQVlFUiBSRU5ERVI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTY3JlZW4gQ2FudmFzIENvbnRhaW5lciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBhc3BlY3QtdmlkZW8gdy1mdWxsIGJnLXNsYXRlLTk1MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctaW5uZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogRGVza3RvcCBXYWxscGFwZXIgc2ltdWxhdGVkIGVsZW1lbnRzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBwLTMgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcG9pbnRlci1ldmVudHMtbm9uZSBvcGFjaXR5LTYwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZCBiZy1ibHVlLTYwMC8zMCBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtYmx1ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBUZW4gS29tcHV0ZXJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIEtvc3pcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS02MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIFB1bHBpdCBiZXpwaWVjem55IChUcnliIHRlc3Rvd3kpXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBSZW5kZXIgU3RhbmRhcmQgV2luZG93cyBiZWhpbmQgKi99XG4gICAgICAgICAgICAgICAge3Byb2Nlc3Nlc1xuICAgICAgICAgICAgICAgICAgLmZpbHRlcigocCkgPT4gcC5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAhcC5pc0Z1bGxzY3JlZW4gJiYgcC53aWR0aCA+IDApXG4gICAgICAgICAgICAgICAgICAubWFwKChwKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3AucGlkfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkIHNoYWRvdy14bCBwLTIgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7KHAud2lkdGggLyAxOTIwKSAqIDEwMCAqIDAuN30lYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7KHAuaGVpZ2h0IC8gMTA4MCkgKiAxMDAgKiAwLjd9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcxNSUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzE1JScsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdHJ1bmNhdGVcIj57cC53aW5kb3dUaXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlBJRCB7cC5waWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzlweF1cIj5BcGxpa2FjamEgdcW8eXRrb3duaWthIGR6aWHFgmEgcG9wcmF3bmllLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cblxuICAgICAgICAgICAgICAgIHsvKiBSZW5kZXIgQWN0aXZlIEZ1bGxzY3JlZW4gT3ZlcmxheSBpZiBydW5uaW5nICovfVxuICAgICAgICAgICAgICAgIHthY3RpdmVPdmVybGF5ICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1yZWQtOTUwLzkwIGJvcmRlci00IGJvcmRlci1yZWQtNjAwIHotMzAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC02IHRleHQtY2VudGVyIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBvcGFjaXR5OiBhY3RpdmVPdmVybGF5Lm9wYWNpdHkgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctcmVkLTYwMC8zMCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1yZWQtNTAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWV4dHJhYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZU92ZXJsYXkud2luZG93VGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1yZWQtMjAwIG10LTEgbWF4LXctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICBQcm9jZXMgcG90b21ueTogPGNvZGUgY2xhc3NOYW1lPVwiYmctcmVkLTkwMC84MCBweC0xIHB5LTAuNSByb3VuZGVkIGZvbnQtbW9ub1wiPnthY3RpdmVPdmVybGF5Lm5hbWV9PC9jb2RlPiAoUElEOiB7YWN0aXZlT3ZlcmxheS5waWR9KVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVPdmVybGF5LnBwaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1hbWJlci0zMDAgbXQtMSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKaoO+4jyDFuXLDs2TFgm8gLyBSb2R6aWMgKFBQSUQ6IHthY3RpdmVPdmVybGF5LnBwaWR9KToge3Byb2Nlc3Nlcy5maW5kKHAgPT4gcC5waWQgPT09IGFjdGl2ZU92ZXJsYXkucHBpZCk/Lm5hbWUgfHwgJ05pZXpuYW55J31cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQXRyeWJ1dHk6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtYm9sZFwiPldTX0VYX1RPUE1PU1Q8L3NwYW4+IHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+MTAwJSBFa3JhbnU8L3NwYW4+IHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+UHJ6ZWNod3l0eXdhbmllIHdlasWbY2lhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBmbGV4IGZsZXgtd3JhcCBnYXAtMiBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUtpbGxQcm9jZXNzVHJlZShhY3RpdmVPdmVybGF5LnBwaWQgfHwgYWN0aXZlT3ZlcmxheS5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC03MDAgdG8tcGluay03MDAgaG92ZXI6ZnJvbS1yZWQtNjAwIGhvdmVyOnRvLXBpbmstNjAwIHRleHQtd2hpdGUgcm91bmRlZCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3cgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5abGlrd2lkdWogQ2HFgmUgRHJ6ZXdvICgvVCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlclF1YXJhbnRpbmVMb2Nrb3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctcHVycGxlLTcwMCBob3ZlcjpiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgcm91bmRlZCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3dcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFVuaWVydWNob20gdyBSQU0gJiBLd2FyYW50YW5uYVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7IWFjdGl2ZU92ZXJsYXkgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LTEwIHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtZW1lcmFsZC01MDAgbXgtYXV0byBtYi0xIG9wYWNpdHktODBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1lbWVyYWxkLTQwMFwiPlB1bHBpdCBjenlzdHkgaSBvZGJsb2tvd2FueTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5CcmFrIG5pZXBvxbzEhWRhbnljaCBuYWvFgmFkZWsgbmEgcGllcndzenltIHBsYW5pZS48L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUHJvY2VzcyBUYWJsZSAmIFJlYWwtVGltZSBXaW4zMiBJbnNwZWN0b3IgKDUgY29scykgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBUYWJlbGEgUHJvY2Vzw7N3ICYgU3RhbnUgV2luMzJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd0cmVlJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS00MDAgaG92ZXI6dGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEZvbGRlclRyZWUgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5PdHfDs3J6IFBlxYJuZSBEcnpld28gUFBJRCDihpI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG92ZXJmbG93LXktYXV0byBtYXgtaC1bMzAwcHhdIHByLTFcIj5cbiAgICAgICAgICAgICAgICB7cHJvY2Vzc2VzLm1hcCgocCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e3AucGlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgcC5zdGF0dXMgPT09ICdwZV9jb3JydXB0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTk1MC82MCBib3JkZXItcm9zZS02MDAvODAgdGV4dC1yb3NlLTIwMCBzaGFkb3ctbWQgc2hhZG93LXJvc2UtOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLnN0YXR1cyA9PT0gJ3F1YXJhbnRpbmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC80MCBib3JkZXItcHVycGxlLTgwMC82MCB0ZXh0LXB1cnBsZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHAuc3RhdHVzID09PSAndGVybWluYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIG9wYWNpdHktNDAgbGluZS10aHJvdWdoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLmlzUm9ndWUgfHwgcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvMzAgYm9yZGVyLXJlZC04MDAgdGV4dC1yZWQtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLmlzUGFyZW50RHJvcHBlclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzMwIGJvcmRlci1hbWJlci04MDAgdGV4dC1hbWJlci0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntwLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBJRDoge3AucGlkfSB7cC5wcGlkID8gYChQUElEOiAke3AucHBpZH0pYCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTEuNSBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgZm9udC1tb25vICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAuc3RhdHVzID09PSAncGVfY29ycnVwdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTAwIHRleHQtcm9zZS0xMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwIHRleHQtcHVycGxlLTIwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwLnN0YXR1cyA9PT0gJ3Rlcm1pbmF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTAwIHRleHQtcmVkLTIwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05MDAgdGV4dC1hbWJlci0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn8J+SpSBQRSBDT1JSVVBURUQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnS1dBUkFOVEFOTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdaQUJJVFknXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnVE9QTU9TVCBPVkVSTEFZJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IHAuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1BBUkVOVCBEUk9QUEVSJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdOT1JNQUxOWSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZmxleCBmbGV4LXdyYXAgZ2FwLTEgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cC5pc1RvcE1vc3QgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMSBiZy1yZWQtOTAwLzUwIHRleHQtcmVkLTMwMCByb3VuZGVkIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBXU19FWF9UT1BNT1NUXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7cC5oYXNGbHV0dGVyRGxsICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEgYmctYW1iZXItOTAwLzUwIHRleHQtYW1iZXItMzAwIHJvdW5kZWQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsdXR0ZXJfd2luZG93cy5kbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHtwLmlzUGFyZW50RHJvcHBlciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xIGJnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJlbnQgV2F0Y2hkb2cgKFBQSUQ6IHtwLnBpZH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFRlbGVtZXRyeSBDb25zb2xlIExvZyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIG1iLTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIFpkYXJ6ZcWEIFNpbG5pa2EgUHl0aG9uIC8gV2luMzI6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwXCI+4pePIExJVkUgTU9OSVRPUjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0yLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgc3BhY2UteS0xIGgtMzIgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICB7bG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdXWUtSWVRPJykgfHwgbG9nLmluY2x1ZGVzKCdTUEFXTicpIHx8IGxvZy5pbmNsdWRlcygnVFJFRS1LSUxMJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1hbWJlci00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdLSUxMJykgfHwgbG9nLmluY2x1ZGVzKCdQQU5JQycpIHx8IGxvZy5pbmNsdWRlcygnT1NUUlpFxbtFTklFJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2cuaW5jbHVkZXMoJ0tXQVJBTlRBTk5BJykgfHwgbG9nLmluY2x1ZGVzKCdaQU1ST8W7T05PJykgfHwgbG9nLmluY2x1ZGVzKCdTVUtDRVMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnRlZ3JhdGVkIFRyZWUgVmlldyBlbWJlZGRlZCB1bmRlcm5lYXRoICovfVxuICAgICAgICAgIDxQcm9jZXNzVHJlZVZpZXdcbiAgICAgICAgICAgIHByb2Nlc3Nlcz17cHJvY2Vzc2VzfVxuICAgICAgICAgICAgb25LaWxsUHJvY2Vzcz17aGFuZGxlS2lsbFNpbmdsZVByb2Nlc3N9XG4gICAgICAgICAgICBvbktpbGxQcm9jZXNzVHJlZT17aGFuZGxlS2lsbFByb2Nlc3NUcmVlfVxuICAgICAgICAgICAgb25TdXNwZW5kVHJlZT17aGFuZGxlU3VzcGVuZFRyZWV9XG4gICAgICAgICAgICBvblNhYm90YWdlVHJlZT17aGFuZGxlU2Fib3RhZ2VUcmVlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTBvQlk7QUExb0JaLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBVztBQUFBLEVBQWE7QUFBQSxFQUFlO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUN2RTtBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBZ0I7QUFBQSxFQUFhO0FBQUEsRUFBTztBQUFBLEVBQW1CO0FBQUEsRUFDakU7QUFBQSxFQUFlO0FBQUEsRUFBMEI7QUFBQSxPQUNwQztBQUVQLFNBQVMsaUNBQWlDO0FBQzFDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsbUJBQW1CO0FBR3JCLGFBQU0sdUJBQWlDLE1BQU07QUFDbEQsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQXlELFlBQVk7QUFFdkcsUUFBTSxDQUFDLFdBQVcsWUFBWSxJQUFJLFNBQTZCO0FBQUEsSUFDN0Q7QUFBQSxNQUNFLEtBQUs7QUFBQSxNQUNMLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLGVBQWU7QUFBQSxNQUNmLE9BQU87QUFBQSxNQUNQLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxNQUNULFdBQVc7QUFBQSxNQUNYLFFBQVE7QUFBQSxNQUNSLFVBQVU7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUEs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