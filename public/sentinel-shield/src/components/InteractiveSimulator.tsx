import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-shield/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=c145fb30"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-shield/node_modules/.vite/deps/react.js?v=c145fb30"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
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
} from "/sentinel-shield/node_modules/.vite/deps/lucide-react.js?v=be40e23c";
import { downloadFullOfflineBundle } from "/sentinel-shield/src/utils/offlinePackageExporter.ts";
import { ProcessTreeView } from "/sentinel-shield/src/components/ProcessTreeView.tsx";
import { ProcessWatchdog } from "/sentinel-shield/src/components/ProcessWatchdog.tsx";
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
import { gnidaSensor } from "/sentinel-shield/src/utils/gnidaAutoFreezeSensor.ts";
import { AcousticAlertMonitor } from "/sentinel-shield/src/components/AcousticAlertMonitor.tsx";
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
    gnidaSensor.onHighThreatProcessLaunch(childProc.name, childProc.pid, "HIGH");
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
            lineNumber: 655,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { children: "Interaktywny Symulator Pamięci, Ekranu & Drzewa Procesów" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 656,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold", children: "TREE-VIEW & PPID TRACER" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 657,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 654,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: [
          "Wizualizuj relacje między procesem-matką (Dropper/Watchdog) a oknami nakładek Fluttera (",
          /* @__PURE__ */ jsxDEV("code", { className: "text-purple-400 font-mono", children: "HWND" }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 662,
            columnNumber: 101
          }, this),
          "). Zidentyfikuj prawdziwe źródło złośliwego okna i zlikwiduj całe drzewo od korzenia."
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 661,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 653,
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
              lineNumber: 672,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Pobierz Pakiet Offline (.bat + .py)" }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 673,
              columnNumber: 13
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 667,
          columnNumber: 11
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 666,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 652,
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
                lineNumber: 689,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Widok Zintegrowany (Pulpit + Drzewo)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 690,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 681,
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
                lineNumber: 701,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Drzewo Procesów & Detektor Pochodzenia (Tree-View)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 702,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 693,
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
                lineNumber: 713,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Wirtualny Pulpit & Podgląd RAM" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 714,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 705,
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
                lineNumber: 725,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Process Watchdog (CPU / RAM Live)" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 726,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 717,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 680,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 font-mono hidden sm:flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Aktywne procesy: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-white", children: processes.filter((p) => p.status === "running").length }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 731,
            columnNumber: 34
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 731,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 732,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: [
          "Zagrożenia: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400", children: processes.filter((p) => p.status === "running" && p.isRogue).length }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 733,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 733,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 730,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 679,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AcousticAlertMonitor, {}, void 0, false, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 738,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block", children: "1. Wygeneruj Zdarzenie Zagrożenia" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 744,
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
                  lineNumber: 752,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-red-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 753,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 748,
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
                  lineNumber: 760,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Lock, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 761,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 756,
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
                  lineNumber: 768,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV(Eye, { className: "w-4 h-4 text-indigo-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 769,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 764,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 747,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 743,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 lg:col-span-3", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-400 uppercase tracking-wider block", children: "2. Wykonaj Akcję Obronną" }, void 0, false, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 776,
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
                  lineNumber: 786,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "💥 SABOTAŻ PE & ACL" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 787,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 781,
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
                  lineNumber: 796,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "UNIERUCHOM W RAM" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 797,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 791,
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
                  lineNumber: 805,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skanuj & Zabij" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 806,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 801,
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
                  lineNumber: 814,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Skrót Paniki" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 815,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 810,
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
                  lineNumber: 827,
                  columnNumber: 36
                }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-4 h-4" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 827,
                  columnNumber: 68
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: isRunningWatchdog ? "Strażnik: ON" : "Demon Watchdog" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 828,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 819,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 779,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-400", children: "Drzewo PPID: identyfikuje procesy nadrzędne (Droppery/Watchdogi), zapobiegając odradzaniu się okien." }, void 0, false, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 833,
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
                  lineNumber: 840,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Reset symulatora" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 841,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 836,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 832,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 775,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 741,
      columnNumber: 7
    }, this),
    activeTab === "watchdog" ? /* @__PURE__ */ jsxDEV(ProcessWatchdog, { initialProcesses: processes }, void 0, false, {
      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
      lineNumber: 849,
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
          lineNumber: 852,
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
                  lineNumber: 867,
                  columnNumber: 19
                }, this),
                "Wirtualny Pulpit Windows 11 (1920x1080)"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 866,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: "Z-ORDER / LAYER RENDER" }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 870,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 865,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "relative aspect-video w-full bg-slate-950 rounded-lg border border-slate-800 overflow-hidden flex items-center justify-center shadow-inner", children: [
              /* @__PURE__ */ jsxDEV("div", { className: "absolute inset-0 p-3 flex flex-col justify-between pointer-events-none opacity-60", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-[9px] font-bold text-blue-300", children: "Ten Komputer" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 878,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[9px] font-bold text-slate-300", children: "Kosz" }, void 0, false, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 881,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 877,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "text-[10px] text-slate-600 font-mono", children: "Pulpit bezpieczny (Tryb testowy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 885,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 876,
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
                        lineNumber: 905,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[8px] text-slate-500 font-mono", children: [
                        "PID ",
                        p.pid
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 906,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 904,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-slate-400 text-[9px]", children: "Aplikacja użytkownika działa poprawnie." }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 908,
                      columnNumber: 23
                    }, this)
                  ]
                },
                p.pid,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 894,
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
                      lineNumber: 919,
                      columnNumber: 23
                    }, this) }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 918,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-extrabold text-white tracking-wide uppercase", children: activeOverlay.windowTitle }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 921,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-200 mt-1 max-w-sm", children: [
                      "Proces potomny: ",
                      /* @__PURE__ */ jsxDEV("code", { className: "bg-red-900/80 px-1 py-0.5 rounded font-mono", children: activeOverlay.name }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 925,
                        columnNumber: 39
                      }, this),
                      " (PID: ",
                      activeOverlay.pid,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 924,
                      columnNumber: 21
                    }, this),
                    activeOverlay.ppid ? /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-amber-300 mt-1 font-mono", children: [
                      "⚠️ Źródło / Rodzic (PPID: ",
                      activeOverlay.ppid,
                      "): ",
                      processes.find((p) => p.pid === activeOverlay.ppid)?.name || "Nieznany"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 928,
                      columnNumber: 23
                    }, this) : null,
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-300 mt-2", children: [
                      "Atrybuty: ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "WS_EX_TOPMOST" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 933,
                        columnNumber: 33
                      }, this),
                      " | ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "100% Ekranu" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 933,
                        columnNumber: 99
                      }, this),
                      " | ",
                      /* @__PURE__ */ jsxDEV("span", { className: "text-amber-300 font-bold", children: "Przechwytywanie wejścia" }, void 0, false, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 933,
                        columnNumber: 163
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 932,
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
                              lineNumber: 940,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV("span", { children: "Zlikwiduj Całe Drzewo (/T)" }, void 0, false, {
                              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                              lineNumber: 941,
                              columnNumber: 25
                            }, this)
                          ]
                        },
                        void 0,
                        true,
                        {
                          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                          lineNumber: 936,
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
                          lineNumber: 943,
                          columnNumber: 23
                        },
                        this
                      )
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 935,
                      columnNumber: 21
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 914,
                  columnNumber: 19
                },
                this
              ),
              !activeOverlay && /* @__PURE__ */ jsxDEV("div", { className: "z-10 text-center text-slate-500", children: [
                /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-8 h-8 text-emerald-500 mx-auto mb-1 opacity-80" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 955,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-emerald-400", children: "Pulpit czysty i odblokowany" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 956,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("p", { className: "text-[10px] text-slate-500", children: "Brak niepożądanych nakładek na pierwszym planie." }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 957,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 954,
                columnNumber: 19
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 874,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 864,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800 mb-3", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 967,
                  columnNumber: 19
                }, this),
                "Tabela Procesów & Stanu Win32"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 966,
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
                      lineNumber: 974,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "Otwórz Pełne Drzewo PPID →" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 975,
                      columnNumber: 19
                    }, this)
                  ]
                },
                void 0,
                true,
                {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 970,
                  columnNumber: 17
                },
                this
              )
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 965,
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
                        lineNumber: 999,
                        columnNumber: 25
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 font-mono", children: [
                        "PID: ",
                        p.pid,
                        " ",
                        p.ppid ? `(PPID: ${p.ppid})` : ""
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                        lineNumber: 1e3,
                        columnNumber: 25
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 998,
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
                        lineNumber: 1005,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 997,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "mt-1 flex flex-wrap gap-1 text-[10px] text-slate-400", children: [
                    p.isTopMost && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-red-900/50 text-red-300 rounded font-mono", children: "WS_EX_TOPMOST" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1036,
                      columnNumber: 25
                    }, this),
                    p.hasFlutterDll && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-amber-900/50 text-amber-300 rounded font-mono", children: "flutter_windows.dll" }, void 0, false, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1041,
                      columnNumber: 25
                    }, this),
                    p.isParentDropper && /* @__PURE__ */ jsxDEV("span", { className: "px-1 bg-amber-950 text-amber-300 rounded font-mono border border-amber-800", children: [
                      "Parent Watchdog (PPID: ",
                      p.pid,
                      ")"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                      lineNumber: 1046,
                      columnNumber: 25
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                    lineNumber: 1034,
                    columnNumber: 21
                  }, this)
                ]
              },
              p.pid,
              true,
              {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 981,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 979,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-slate-800 flex-1 flex flex-col", children: [
              /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono font-semibold text-slate-400 mb-1.5 flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Zdarzeń Silnika Python / Win32:" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 1058,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] text-emerald-400", children: "● LIVE MONITOR" }, void 0, false, {
                  fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                  lineNumber: 1059,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 1057,
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
                  lineNumber: 1063,
                  columnNumber: 21
                },
                this
              )) }, void 0, false, {
                fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
                lineNumber: 1061,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
              lineNumber: 1056,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
            lineNumber: 964,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
          lineNumber: 862,
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
            lineNumber: 1084,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
        lineNumber: 861,
        columnNumber: 9
      }, this)
    )
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/InteractiveSimulator.tsx",
    lineNumber: 650,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkludGVyYWN0aXZlU2ltdWxhdG9yLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBQbGF5LCBQYXVzZSwgUmVmcmVzaEN3LCBTaGllbGRDaGVjaywgQWxlcnRUcmlhbmdsZSwgVGVybWluYWwsIE1vbml0b3IsIExvY2ssIFxuICBFeWUsIFphcCwgQ3Jvc3NoYWlyLCBCYW4sIFNoaWVsZEFsZXJ0LCBGaWxlWCwgRG93bmxvYWQsIEdpdEZvcmssIEZvbGRlclRyZWUsIFxuICBMYXllcnMsIEZsYW1lLCBTa3VsbCwgQ29tcGFzcywgQWN0aXZpdHksIEdhdWdlXG59IGZyb20gJ2x1Y2lkZS1yZWFjdCc7XG5pbXBvcnQgeyBTaW11bGF0ZWRQcm9jZXNzLCBTaW11bGF0ZWRXaW5kb3cgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkb3dubG9hZEZ1bGxPZmZsaW5lQnVuZGxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBQcm9jZXNzVHJlZVZpZXcgfSBmcm9tICcuL1Byb2Nlc3NUcmVlVmlldyc7XG5pbXBvcnQgeyBQcm9jZXNzV2F0Y2hkb2cgfSBmcm9tICcuL1Byb2Nlc3NXYXRjaGRvZyc7XG5pbXBvcnQgeyBzYWZlU3RvcmFnZSB9IGZyb20gJy4uL3V0aWxzL3NlbGZSZXBhaXJTeXN0ZW0nO1xuaW1wb3J0IHsgZ25pZGFTZW5zb3IgfSBmcm9tICcuLi91dGlscy9nbmlkYUF1dG9GcmVlemVTZW5zb3InO1xuaW1wb3J0IHsgQWNvdXN0aWNBbGVydE1vbml0b3IgfSBmcm9tICcuL0Fjb3VzdGljQWxlcnRNb25pdG9yJztcblxuZXhwb3J0IGNvbnN0IEludGVyYWN0aXZlU2ltdWxhdG9yOiBSZWFjdC5GQyA9ICgpID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdpbnRlZ3JhdGVkJyB8ICd0cmVlJyB8ICdkZXNrdG9wJyB8ICd3YXRjaGRvZyc+KCdpbnRlZ3JhdGVkJyk7XG5cbiAgY29uc3QgW3Byb2Nlc3Nlcywgc2V0UHJvY2Vzc2VzXSA9IHVzZVN0YXRlPFNpbXVsYXRlZFByb2Nlc3NbXT4oW1xuICAgIHtcbiAgICAgIHBpZDogMTA0NCxcbiAgICAgIHBwaWQ6IDAsXG4gICAgICBuYW1lOiAnZXhwbG9yZXIuZXhlJyxcbiAgICAgIHdpbmRvd1RpdGxlOiAnRWtzcGxvcmF0b3IgV2luZG93cycsXG4gICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgd2lkdGg6IDEwMjQsXG4gICAgICBoZWlnaHQ6IDcwMCxcbiAgICAgIG9wYWNpdHk6IDEsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFdpbmRvd3NcXFxcZXhwbG9yZXIuZXhlJyxcbiAgICAgIGlzUm9ndWU6IGZhbHNlLFxuICAgICAgd2luZG93czogW1xuICAgICAgICB7XG4gICAgICAgICAgaHduZDogJzB4MDAwMTAwNEEnLFxuICAgICAgICAgIHRpdGxlOiAnUGFzZWsgWmFkYcWEIFdpbmRvd3MgJiBQdWxwaXQnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ1NoZWxsX1RyYXlXbmQnLFxuICAgICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiA0OCB9LFxuICAgICAgICAgIHpPcmRlcjogMCxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICB7XG4gICAgICBwaWQ6IDQ4MjAsXG4gICAgICBwcGlkOiAxMDQ0LFxuICAgICAgbmFtZTogJ2Nocm9tZS5leGUnLFxuICAgICAgd2luZG93VGl0bGU6ICdHb29nbGUgQ2hyb21lIC0gU3RhY2sgT3ZlcmZsb3cnLFxuICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgIHdpZHRoOiAxMjgwLFxuICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgZmlsZVBhdGg6ICdDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEdvb2dsZVxcXFxDaHJvbWVcXFxcQXBwbGljYXRpb25cXFxcY2hyb21lLmV4ZScsXG4gICAgICBpc1JvZ3VlOiBmYWxzZSxcbiAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGh3bmQ6ICcweDAwMDQ1QTEyJyxcbiAgICAgICAgICB0aXRsZTogJ0dvb2dsZSBDaHJvbWUgLSBTdGFjayBPdmVyZmxvdycsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnQ2hyb21lX1dpZGdldFdpbl8xJyxcbiAgICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0sXG4gICAgICAgICAgek9yZGVyOiAxLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogMzg0MCxcbiAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICBuYW1lOiAnZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgd2luZG93VGl0bGU6ICdCYWNrZ3JvdW5kIFdhdGNoZG9nIFNlcnZpY2UgKEhpZGRlbiBEcm9wcGVyKScsXG4gICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBvcGFjaXR5OiAxLFxuICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXGRyb3BwZXJfd2F0Y2hkb2cuZXhlJyxcbiAgICAgIGlzUGFyZW50RHJvcHBlcjogdHJ1ZSxcbiAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICB3aW5kb3dzOiBbXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHBpZDogODkzMixcbiAgICAgIHBwaWQ6IDM4NDAsXG4gICAgICBuYW1lOiAnZmx1dHRlcl9ydW5uZXIuZXhlJyxcbiAgICAgIHdpbmRvd1RpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgaGFzRmx1dHRlckRsbDogdHJ1ZSxcbiAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgaGVpZ2h0OiAxMDgwLFxuICAgICAgb3BhY2l0eTogMC45MixcbiAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAge1xuICAgICAgICAgIGh3bmQ6ICcweDAwNEYxQTAyJyxcbiAgICAgICAgICB0aXRsZTogJ0ZsdXR0ZXIgRnVsbHNjcmVlbiBMb2Nrc2NyZWVuIE92ZXJsYXkgW1dTX0VYX1RPUE1PU1RdJyxcbiAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX1JVTk5FUl9XSU5ET1cnLFxuICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgIHpPcmRlcjogOTk5LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgaHduZDogJzB4MDA0RjFBODgnLFxuICAgICAgICAgIHRpdGxlOiAnTGF5ZXJlZCBUcmFuc3BhcmVudCBDbGlja1RyYXAnLFxuICAgICAgICAgIGNsYXNzTmFtZTogJ0ZMVVRURVJfU1VCVklFV19NT0RBTCcsXG4gICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICBpc0xheWVyZWQ6IHRydWUsXG4gICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODAgfSxcbiAgICAgICAgICB6T3JkZXI6IDEwMDAsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0pO1xuXG4gIGNvbnN0IFtpc1J1bm5pbmdXYXRjaGRvZywgc2V0SXNSdW5uaW5nV2F0Y2hkb2ddID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbbG9ncywgc2V0TG9nc10gPSB1c2VTdGF0ZTxzdHJpbmdbXT4oW1xuICAgICdbKl0gSW5pY2phbGl6YWNqYSDFm3JvZG93aXNrYSBzeW11bGFjamkgV2luMzIgQVBJICYgUFBJRCBMaW5lYWdlIEVuZ2luZS4uLicsXG4gICAgJ1sqXSBaYcWCYWRvd2FubyBtYXDEmSByZWxhY2ppIHByb2Nlc8OzdzogW2V4cGxvcmVyLmV4ZSAtPiBkcm9wcGVyX3dhdGNoZG9nLmV4ZSAtPiBmbHV0dGVyX3J1bm5lci5leGVdJyxcbiAgICAnWypdIEdvdG93eSBkbyBkZXRla2NqaSBpIHVuaWVydWNoYW1pYW5pYSB3IHRyeWJpZSAxMDAlIE9GRkxJTkUuJyxcbiAgXSk7XG5cbiAgY29uc3QgYWRkTG9nID0gKG1zZzogc3RyaW5nKSA9PiB7XG4gICAgc2V0TG9ncygocHJldikgPT4gWy4uLnByZXYuc2xpY2UoLTIwKSwgYFske25ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCl9XSAke21zZ31gXSk7XG4gIH07XG5cbiAgY29uc3Qgc3Bhd25PdmVybGF5ID0gKHR5cGU6ICdraW9zaycgfCAnc3RlYWx0aF9mbHV0dGVyJyB8ICd0cmFuc2x1Y2VudCcpID0+IHtcbiAgICBjb25zdCBwYXJlbnRQaWQgPSBNYXRoLmZsb29yKDIwMDAgKyBNYXRoLnJhbmRvbSgpICogMjAwMCk7XG4gICAgY29uc3QgY2hpbGRQaWQgPSBNYXRoLmZsb29yKDYwMDAgKyBNYXRoLnJhbmRvbSgpICogMzAwMCk7XG5cbiAgICBsZXQgcGFyZW50UHJvYzogU2ltdWxhdGVkUHJvY2VzcztcbiAgICBsZXQgY2hpbGRQcm9jOiBTaW11bGF0ZWRQcm9jZXNzO1xuXG4gICAgaWYgKHR5cGUgPT09ICdraW9zaycpIHtcbiAgICAgIHBhcmVudFByb2MgPSB7XG4gICAgICAgIHBpZDogcGFyZW50UGlkLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAna2lvc2tfdXBkYXRlcl9zZXJ2aWNlLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnU2VydmljZSBEYWVtb24gKEF1dG8tUmVzdGFydCBXYXRjaGRvZyknLFxuICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcUm9hbWluZ1xcXFxraW9za191cGRhdGVyX3NlcnZpY2UuZXhlJyxcbiAgICAgICAgaXNQYXJlbnREcm9wcGVyOiB0cnVlLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXSxcbiAgICAgIH07XG5cbiAgICAgIGNoaWxkUHJvYyA9IHtcbiAgICAgICAgcGlkOiBjaGlsZFBpZCxcbiAgICAgICAgcHBpZDogcGFyZW50UGlkLFxuICAgICAgICBuYW1lOiAnZmx1dHRlcl9raW9za19hcHAuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdGbHV0dGVyIEtpb3NrIExvY2sgT3ZlcmxheSBbQUxXQVlTX09OX1RPUF0nLFxuICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICAgIGhlaWdodDogMTA4MCxcbiAgICAgICAgb3BhY2l0eTogMC45NSxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcUm9hbWluZ1xcXFxmbHV0dGVyX2tpb3NrX2FwcC5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogYDB4MDAke01hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDgwMDAwMCkudG9TdHJpbmcoMTYpfWAsXG4gICAgICAgICAgICB0aXRsZTogJ0ZsdXR0ZXIgS2lvc2sgTG9jayBPdmVybGF5IFtBTFdBWVNfT05fVE9QXScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX1JVTk5FUl9XSU5ET1cnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgICB6T3JkZXI6IDk5OSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzdGVhbHRoX2ZsdXR0ZXInKSB7XG4gICAgICBwYXJlbnRQcm9jID0ge1xuICAgICAgICBwaWQ6IHBhcmVudFBpZCxcbiAgICAgICAgcHBpZDogMTA0NCxcbiAgICAgICAgbmFtZTogJ21hbHdhcmVfbG9hZGVyLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnU3RlYWx0aCBMb2FkZXIgU3Vic3lzdGVtJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcbWFsd2FyZV9sb2FkZXIuZXhlJyxcbiAgICAgICAgaXNQYXJlbnREcm9wcGVyOiB0cnVlLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXSxcbiAgICAgIH07XG5cbiAgICAgIGNoaWxkUHJvYyA9IHtcbiAgICAgICAgcGlkOiBjaGlsZFBpZCxcbiAgICAgICAgcHBpZDogcGFyZW50UGlkLFxuICAgICAgICBuYW1lOiAnc3ZjaG9zdF9oZWxwZXIuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdTeXN0ZW0gQWxlcnQgKEZsdXR0ZXIgRW5naW5lIE1vZHVsZSknLFxuICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICAgIGhlaWdodDogMTA4MCxcbiAgICAgICAgb3BhY2l0eTogMC44OCxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxzdmNob3N0X2hlbHBlci5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogYDB4MDAke01hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDgwMDAwMCkudG9TdHJpbmcoMTYpfWAsXG4gICAgICAgICAgICB0aXRsZTogJ1N5c3RlbSBBbGVydCAoRmx1dHRlciBFbmdpbmUgTW9kdWxlKScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX0hPU1RfV0lORE9XJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudFByb2MgPSB7XG4gICAgICAgIHBpZDogcGFyZW50UGlkLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAnYnJvd3Nlcl9pbmplY3Rvci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ1RyYW5zcGFyZW50IE92ZXJsYXkgU3Bhd25lcicsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcRG93bmxvYWRzXFxcXGJyb3dzZXJfaW5qZWN0b3IuZXhlJyxcbiAgICAgICAgaXNQYXJlbnREcm9wcGVyOiB0cnVlLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXSxcbiAgICAgIH07XG5cbiAgICAgIGNoaWxkUHJvYyA9IHtcbiAgICAgICAgcGlkOiBjaGlsZFBpZCxcbiAgICAgICAgcHBpZDogcGFyZW50UGlkLFxuICAgICAgICBuYW1lOiAnZmx1dHRlcl9vdmVybGF5X2NsaWNrdHJhcC5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0dsYXNzIE92ZXJsYXkgKExheWVyZWQgVHJhbnNwYXJlbnQgQ2xpY2tUcmFwKScsXG4gICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiB0cnVlLFxuICAgICAgICB3aWR0aDogMTkyMCxcbiAgICAgICAgaGVpZ2h0OiAxMDgwLFxuICAgICAgICBvcGFjaXR5OiAwLjQsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxEb3dubG9hZHNcXFxcZmx1dHRlcl9vdmVybGF5X2NsaWNrdHJhcC5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogYDB4MDAke01hdGguZmxvb3IoMTAwMDAwICsgTWF0aC5yYW5kb20oKSAqIDgwMDAwMCkudG9TdHJpbmcoMTYpfWAsXG4gICAgICAgICAgICB0aXRsZTogJ0dsYXNzIE92ZXJsYXkgKExheWVyZWQgVHJhbnNwYXJlbnQgQ2xpY2tUcmFwKScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX0NMSUNLVFJBUF9XSU5ET1cnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiB0cnVlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODAgfSxcbiAgICAgICAgICAgIHpPcmRlcjogMTAwMCxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+IFsuLi5wcmV2LmZpbHRlcigocCkgPT4gcC5zdGF0dXMgPT09ICdydW5uaW5nJyksIHBhcmVudFByb2MsIGNoaWxkUHJvY10pO1xuICAgIGFkZExvZyhgW1NQQVdOXSBVcnVjaG9taW9ubyBwcm9jZXMgcm9kemljYTogJHtwYXJlbnRQcm9jLm5hbWV9IChQSUQ6ICR7cGFyZW50UHJvYy5waWR9KSAtPiB3eWdlbmVyb3dhxYIgcG90b21rYTogJHtjaGlsZFByb2MubmFtZX0gKFBJRDogJHtjaGlsZFByb2MucGlkfSlgKTtcbiAgICBcbiAgICAvLyBUcmlnZ2VyIEduaWRhIFNlbnNvciBkZXRlY3Rpb24gJiBBY291c3RpYyBBbGVydCBhdWRpdG9yeSBmZWVkYmFja1xuICAgIGduaWRhU2Vuc29yLm9uSGlnaFRocmVhdFByb2Nlc3NMYXVuY2goY2hpbGRQcm9jLm5hbWUsIGNoaWxkUHJvYy5waWQsICdISUdIJyk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2lsbFNpbmdsZVByb2Nlc3MgPSAocGlkOiBudW1iZXIpID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBwcm9jZXNzZXMuZmluZCgocCkgPT4gcC5waWQgPT09IHBpZCk7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICBhZGRMb2coYFtLSUxMXSBUZXJtaW5hdGVQcm9jZXNzKFBJRDogJHtwaWR9LCA5KSAtPiBaYW1rbmnEmXRvIHByb2NlcyAke3RhcmdldC5uYW1lfS5gKTtcbiAgICBcbiAgICAvLyBDaGVjayBpZiBpdCBoYXMgYSBsaXZpbmcgcGFyZW50IGRyb3BwZXJcbiAgICBpZiAodGFyZ2V0LnBwaWQgJiYgdGFyZ2V0LmlzUm9ndWUpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IHByb2Nlc3Nlcy5maW5kKChwKSA9PiBwLnBpZCA9PT0gdGFyZ2V0LnBwaWQgJiYgcC5zdGF0dXMgPT09ICdydW5uaW5nJyk7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIGFkZExvZyhgW+KaoO+4jyBPU1RSWkXFu0VOSUUgRk9SRU5TSUNdIFByb2Nlcy1yb2R6aWMgJyR7cGFyZW50Lm5hbWV9JyAoUElEOiAke3BhcmVudC5waWR9KSB3Y2nEhcW8IGR6aWHFgmEhIE1vxbxlIHdrcsOzdGNlIHpyZXN0YXJ0b3dhxIcgb2tubyBGbHV0dGVyYS5gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHAucGlkID09PSBwaWQgPyB7IC4uLnAsIHN0YXR1czogJ3Rlcm1pbmF0ZWQnIGFzIGNvbnN0IH0gOiBwKSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZUtpbGxQcm9jZXNzVHJlZSA9IChyb290UGlkOiBudW1iZXIpID0+IHtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNjApKTtcbiAgICBhZGRMb2coYPCfjLMgW1RSRUUtS0lMTCAvVF0gUm96cG9jesSZdG8gbGlrd2lkYWNqxJkgcG9kZHJ6ZXdhIHByb2Nlc8OzdyBvZCBQSUQgJHtyb290UGlkfS4uLmApO1xuICAgIFxuICAgIC8vIEZpbmQgYWxsIGRlc2NlbmRhbnRzIHJlY3Vyc2l2ZWx5XG4gICAgY29uc3QgcGlkc1RvS2lsbCA9IG5ldyBTZXQ8bnVtYmVyPigpO1xuICAgIGNvbnN0IGZpbmRDaGlsZHJlbiA9IChjdXJyZW50UGlkOiBudW1iZXIpID0+IHtcbiAgICAgIHBpZHNUb0tpbGwuYWRkKGN1cnJlbnRQaWQpO1xuICAgICAgcHJvY2Vzc2VzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgaWYgKHAucHBpZCA9PT0gY3VycmVudFBpZCAmJiAhcGlkc1RvS2lsbC5oYXMocC5waWQpKSB7XG4gICAgICAgICAgZmluZENoaWxkcmVuKHAucGlkKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcbiAgICBmaW5kQ2hpbGRyZW4ocm9vdFBpZCk7XG5cbiAgICBwaWRzVG9LaWxsLmZvckVhY2goKHBpZCkgPT4ge1xuICAgICAgY29uc3QgcCA9IHByb2Nlc3Nlcy5maW5kKChpdGVtKSA9PiBpdGVtLnBpZCA9PT0gcGlkKTtcbiAgICAgIGlmIChwKSB7XG4gICAgICAgIGFkZExvZyhgICAtPiBbWkFCSVRPXSBQSUQgJHtwaWR9ICgke3AubmFtZX0pIC0gWndvbG5pb25vIHVjaHd5dHkgb2tpZW4gSFdORC5gKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiAocGlkc1RvS2lsbC5oYXMocC5waWQpID8geyAuLi5wLCBzdGF0dXM6ICd0ZXJtaW5hdGVkJyBhcyBjb25zdCB9IDogcCkpXG4gICAgKTtcbiAgICBhZGRMb2coYOKclCBbU1VLQ0VTXSBDYcWCZSBwb2Rkcnpld28gKCR7cGlkc1RvS2lsbC5zaXplfSBwcm9jZXPDs3cpIHpvc3RhxYJvIGRlZmluaXR5d25pZSB1c3VuacSZdGUgeiBSQU0uYCk7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDYwKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3VzcGVuZFRyZWUgPSAocm9vdFBpZDogbnVtYmVyKSA9PiB7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDYwKSk7XG4gICAgYWRkTG9nKGDinYTvuI8gW0ZSRUVaRSBUUkVFXSBaYW1yYcW8YW5pZSB3c3p5c3RraWNoIHfEhXRrw7N3IHcgcG9kZHJ6ZXdpZSBQSUQgJHtyb290UGlkfSAoTnRTdXNwZW5kUHJvY2VzcykuLi5gKTtcbiAgICBcbiAgICBjb25zdCBwaWRzVG9TdXNwZW5kID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgY29uc3QgZmluZENoaWxkcmVuID0gKGN1cnJlbnRQaWQ6IG51bWJlcikgPT4ge1xuICAgICAgcGlkc1RvU3VzcGVuZC5hZGQoY3VycmVudFBpZCk7XG4gICAgICBwcm9jZXNzZXMuZm9yRWFjaCgocCkgPT4ge1xuICAgICAgICBpZiAocC5wcGlkID09PSBjdXJyZW50UGlkICYmICFwaWRzVG9TdXNwZW5kLmhhcyhwLnBpZCkpIHtcbiAgICAgICAgICBmaW5kQ2hpbGRyZW4ocC5waWQpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuICAgIGZpbmRDaGlsZHJlbihyb290UGlkKTtcblxuICAgIHBpZHNUb1N1c3BlbmQuZm9yRWFjaCgocGlkKSA9PiB7XG4gICAgICBjb25zdCBwID0gcHJvY2Vzc2VzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ucGlkID09PSBwaWQpO1xuICAgICAgaWYgKHApIHtcbiAgICAgICAgYWRkTG9nKGAgIC0+IFtaQU1ST8W7T05PIFJBTV0gUElEICR7cGlkfSAoJHtwLm5hbWV9KSAtIFphdHJ6eW1hbm8gY3phcyBwcm9jZXNvcmEuYCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHBpZHNUb1N1c3BlbmQuaGFzKHAucGlkKSA/IHsgLi4ucCwgc3RhdHVzOiAncXVhcmFudGluZWQnIGFzIGNvbnN0IH0gOiBwKSlcbiAgICApO1xuICAgIGFkZExvZyhg4pyUIFtTVUtDRVNdIFpuZXV0cmFsaXpvd2FubyAke3BpZHNUb1N1c3BlbmQuc2l6ZX0gcHJvY2Vzw7N3IHcgcGFtacSZY2kuYCk7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDYwKSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU2Fib3RhZ2VUcmVlID0gKHJvb3RQaWQ6IG51bWJlcikgPT4ge1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2NSkpO1xuICAgIGFkZExvZyhg8J+SpSBbU0FCT1RBxbsgUEUgRFJaRVdBXSBUcndhxYJlIG5pc3pjemVuaWUgbmFnxYLDs3drw7N3IFBFIGRsYSBjYcWCZWdvIMWCYcWEY3VjaGEgUElEICR7cm9vdFBpZH0uLi5gKTtcblxuICAgIGNvbnN0IHBpZHNUb1NhYm90YWdlID0gbmV3IFNldDxudW1iZXI+KCk7XG4gICAgY29uc3QgZmluZENoaWxkcmVuID0gKGN1cnJlbnRQaWQ6IG51bWJlcikgPT4ge1xuICAgICAgcGlkc1RvU2Fib3RhZ2UuYWRkKGN1cnJlbnRQaWQpO1xuICAgICAgcHJvY2Vzc2VzLmZvckVhY2goKHApID0+IHtcbiAgICAgICAgaWYgKHAucHBpZCA9PT0gY3VycmVudFBpZCAmJiAhcGlkc1RvU2Fib3RhZ2UuaGFzKHAucGlkKSkge1xuICAgICAgICAgIGZpbmRDaGlsZHJlbihwLnBpZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG4gICAgZmluZENoaWxkcmVuKHJvb3RQaWQpO1xuXG4gICAgcGlkc1RvU2Fib3RhZ2UuZm9yRWFjaCgocGlkKSA9PiB7XG4gICAgICBjb25zdCBwID0gcHJvY2Vzc2VzLmZpbmQoKGl0ZW0pID0+IGl0ZW0ucGlkID09PSBwaWQpO1xuICAgICAgaWYgKHAgJiYgcC5maWxlUGF0aCkge1xuICAgICAgICBhZGRMb2coYCAgLT4gW1BFIENPUlJVUFRdICR7cC5uYW1lfSAoUElEICR7cGlkfSk6IE5hZHBpc2FubyBuYWfFgsOzd2VrIE1aIHplcmFtaSAtPiAweEMwMDAwMDdCIWApO1xuICAgICAgICBhZGRMb2coYCAgLT4gW0FDTCBERU5ZXSBpY2FjbHMgXCIke3AuZmlsZVBhdGh9XCIgL2luaGVyaXRhbmNlOnIgL2RlbnkgKlMtMS0xLTA6KEYsWCxSLFcpYCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4gKHBpZHNUb1NhYm90YWdlLmhhcyhwLnBpZCkgPyB7IC4uLnAsIHN0YXR1czogJ3BlX2NvcnJ1cHRlZCcgYXMgY29uc3QgfSA6IHApKVxuICAgICk7XG4gICAgYWRkTG9nKGDinJQgW1NVS0NFU10gWm5pc3pjem9ubyBiaW5hcm5pZSAke3BpZHNUb1NhYm90YWdlLnNpemV9IHBsaWvDs3cgd3lrb255d2FsbnljaCBuYSBkeXNrdS5gKTtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNjUpKTtcbiAgfTtcblxuICBjb25zdCBydW5EZXRlY3Rpb25DeWNsZSA9ICgpID0+IHtcbiAgICBhZGRMb2coJz4+IFtQeXRob25dIEVudW1XaW5kb3dzKCkgJiBQUElEIEluc3BlY3RvciBza2FudWplIGxpc3TEmSBva2llbiBpIHByb2Nlc8Ozdy4uLicpO1xuXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgaWYgKHByb2Muc3RhdHVzICE9PSAncnVubmluZycpIHJldHVybiBwcm9jO1xuXG4gICAgICAgIGNvbnN0IGlzVG9wbW9zdCA9IHByb2MuaXNUb3BNb3N0O1xuICAgICAgICBjb25zdCBpc0Z1bGxzY3JlZW4gPSBwcm9jLmlzRnVsbHNjcmVlbjtcbiAgICAgICAgY29uc3QgaXNGbHV0dGVyID0gcHJvYy5oYXNGbHV0dGVyRGxsIHx8IHByb2MubmFtZS5pbmNsdWRlcygnZmx1dHRlcicpO1xuXG4gICAgICAgIGlmICgoaXNUb3Btb3N0ICYmIGlzRnVsbHNjcmVlbikgfHwgKGlzRmx1dHRlciAmJiBpc1RvcG1vc3QpKSB7XG4gICAgICAgICAgYWRkTG9nKGBbIV0gV1lLUllUTzogSFdORCBQSUQgJHtwcm9jLnBpZH0gKCR7cHJvYy5uYW1lfSkgW1BQSUQ6ICR7cHJvYy5wcGlkIHx8ICdOL0EnfV0gLT4gV1NfRVhfVE9QTU9TVD0ke2lzVG9wbW9zdH0sIEZ1bGxzY3JlZW49JHtpc0Z1bGxzY3JlZW59YCk7XG4gICAgICAgICAgYWRkTG9nKGBbK10gW0tJTExdIHBzdXRpbC5Qcm9jZXNzKCR7cHJvYy5waWR9KS5raWxsKCkgLT4gUFJPQ0VTIFpMSUtXSURPV0FOWSFgKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wcm9jLCBzdGF0dXM6ICd0ZXJtaW5hdGVkJyBhcyBjb25zdCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9jO1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIC8vIERlZGljYXRlZCBVTklFUlVDSE9NSUVOSUUgJiBLV0FSQU5UQU5OQSAoRnJlZXplICsgQmluYXJ5IExvY2tvdXQpXG4gIGNvbnN0IHRyaWdnZXJRdWFyYW50aW5lTG9ja291dCA9ICgpID0+IHtcbiAgICBhZGRMb2coJz0nIC5yZXBlYXQoNTUpKTtcbiAgICBhZGRMb2coJ+KaoSBbS1dBUkFOVEFOTkEgQ0HFgUVHTyDFgUHFg0NVQ0hBXSBVcnVjaG9taW9ubyBwcm9jZWR1csSZIHRyd2HFgmVnbyB1bmllcnVjaG9taWVuaWEhJyk7XG4gICAgXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgaWYgKHByb2Muc3RhdHVzID09PSAncnVubmluZycgJiYgKHByb2MuaXNUb3BNb3N0IHx8IHByb2MuaGFzRmx1dHRlckRsbCB8fCBwcm9jLmlzQmxvY2tlZCB8fCBwcm9jLmlzUGFyZW50RHJvcHBlcikpIHtcbiAgICAgICAgICBhZGRMb2coYFtLUk9LIDFdIE50U3VzcGVuZFByb2Nlc3MoUElEOiAke3Byb2MucGlkfSAtICR7cHJvYy5uYW1lfSkgLT4gWmFtcm/FvG9ubyB3xIV0a2kgdyBSQU0uYCk7XG4gICAgICAgICAgYWRkTG9nKGBbS1JPSyAyXSBpY2FjbHMgXCIke3Byb2MuZmlsZVBhdGh9XCIgL2RlbnkgRXZlcnlvbmU6KFgsVykgLT4gWmFibG9rb3dhbm8gdXByYXduaWVuaWEgbmEgZHlza3UuYCk7XG4gICAgICAgICAgYWRkTG9nKGBbS1JPSyAzXSBJRkVPIExvY2s6IFphYmxva293YW5vIHBvbm93bnkgc3RhcnQgcGxpa3UgJyR7cHJvYy5uYW1lfScuYCk7XG4gICAgICAgICAgYWRkTG9nKGBbS1JPSyA0XSBUZXJtaW5hdGVQcm9jZXNzKFBJRDogJHtwcm9jLnBpZH0pIC0+IFpha2/FhGN6b25vIHByb2Nlcy5gKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wcm9jLCBzdGF0dXM6ICdxdWFyYW50aW5lZCcgYXMgY29uc3QgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvYztcbiAgICAgIH0pXG4gICAgKTtcbiAgICBhZGRMb2coJ+KclCBbU1VLQ0VTXSBXc3plbGtpZSB6xYJvxZtsaXdlIHByb2Nlc3kgKHdyYXogeiByb2R6aWNhbWkpIHpvc3RhxYJ5IHNwZXRyeWZpa293YW5lLicpO1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg1NSkpO1xuICB9O1xuXG4gIC8vIERlZGljYXRlZCBUUldBxYFZIFNBQk9UQcW7IFBFICYgQkxPS0FEQSBBQ0wgKFplcm8gTVogKyBBQ0wgRGVueSlcbiAgY29uc3QgdHJpZ2dlclBlU2Fib3RhZ2VBbmRBY2xMb2NrID0gKCkgPT4ge1xuICAgIGFkZExvZygnPScgLnJlcGVhdCg2MCkpO1xuICAgIGFkZExvZygn8J+SpSBbU0FCT1RBxbsgUEUgJiBBQ0xdIFVydWNob21pb25vIHRyd2HFgmUgdXN6a29kemVuaWUgcGxpa8OzdyB3eWtvbnl3YWxueWNoIScpO1xuICAgIFxuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwcm9jKSA9PiB7XG4gICAgICAgIGlmIChwcm9jLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChwcm9jLmlzVG9wTW9zdCB8fCBwcm9jLmhhc0ZsdXR0ZXJEbGwgfHwgcHJvYy5pc0Jsb2NrZWQgfHwgcHJvYy5pc1BhcmVudERyb3BwZXIpKSB7XG4gICAgICAgICAgYWRkTG9nKGBbMS4gRlJFRVpFXSBOdFN1c3BlbmRQcm9jZXNzKFBJRDogJHtwcm9jLnBpZH0gLSAke3Byb2MubmFtZX0pIC0+IFphbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNLmApO1xuICAgICAgICAgIGFkZExvZyhgWzIuIEtJTExdIFRlcm1pbmF0ZVByb2Nlc3MoUElEOiAke3Byb2MucGlkfSkgLT4gT2RibG9rb3dhbmllIHVjaHd5dHUgcGxpa3UuYCk7XG4gICAgICAgICAgYWRkTG9nKGBbMy4gUEUgU0FCT1RBR0VdIE5hZHBpc2FubyBzeWduYXR1csSZIERPUyAnTVonICgweDVBNEQpIC0+ICdERUFEJyBvcmF6IHd5emVyb3dhbm8gbmFnxYLDs3dlayBQRS5gKTtcbiAgICAgICAgICBhZGRMb2coYCAgICAtPiBXaW5kb3dzIFBFIExvYWRlciB6d3JhY2EgdGVyYXogYsWCxIVkOiAweEMwMDAwMDdCIChTVEFUVVNfSU5WQUxJRF9JTUFHRV9GT1JNQVQpIWApO1xuICAgICAgICAgIGFkZExvZyhgWzQuIEFDTCBMT0NLT1VUXSBpY2FjbHMgXCIke3Byb2MuZmlsZVBhdGh9XCIgL2luaGVyaXRhbmNlOnIgL2RlbnkgKlMtMS0xLTA6KEYsWCxSLFcpYCk7XG4gICAgICAgICAgcmV0dXJuIHsgLi4ucHJvYywgc3RhdHVzOiAncGVfY29ycnVwdGVkJyBhcyBjb25zdCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9jO1xuICAgICAgfSlcbiAgICApO1xuICAgIGFkZExvZygn4pyUIFtTVUtDRVNdIFBsaWtpIC5leGUgKHJvZHppYyBpIGR6aWVjaSkgem9zdGHFgnkgdHJ3YWxlIHpuaXN6Y3pvbmUgYmluYXJuaWUhJyk7XG4gICAgYWRkTG9nKCc9JyAucmVwZWF0KDYwKSk7XG4gIH07XG5cbiAgLy8gQ29udGludW91cyBXYXRjaGRvZyBFZmZlY3QgJiBTZW5zb3IgQXV0by1GcmVlemUgU3luY1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfc2ltdWxhdGVkX3Byb2Nlc3NlcycsIHByb2Nlc3Nlcyk7XG4gIH0sIFtwcm9jZXNzZXNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGhhbmRsZUF1dG9Gcm96ZW4gPSAoZTogYW55KSA9PiB7XG4gICAgICBjb25zdCBkZXRhaWwgPSBlLmRldGFpbDtcbiAgICAgIGlmIChkZXRhaWwgJiYgZGV0YWlsLnBpZCkge1xuICAgICAgICBhZGRMb2coYFvimqEgQ1pVSk5JSyBHTklEIEFVVE8tRlJFRVpFXSBOYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSB3IFJBTSAoMCBtcyk6IFBJRCAke2RldGFpbC5waWR9ICgke2RldGFpbC50YXJnZXROYW1lfSlgKTtcbiAgICAgICAgc2V0UHJvY2Vzc2VzKHByZXYgPT4gcHJldi5tYXAocCA9PiB7XG4gICAgICAgICAgaWYgKHAucGlkID09PSBkZXRhaWwucGlkKSB7XG4gICAgICAgICAgICByZXR1cm4geyAuLi5wLCBzdGF0dXM6ICdzdXNwZW5kZWQnLCBpc0Jsb2NrZWQ6IHRydWUsIG9wYWNpdHk6IDAuMiB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcDtcbiAgICAgICAgfSkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzZW50aW5lbDpnbmlkYS1hdXRvLWZyb3plbicsIGhhbmRsZUF1dG9Gcm96ZW4pO1xuICAgIH1cblxuICAgIGxldCBpbnRlcnZhbDogYW55O1xuICAgIGlmIChpc1J1bm5pbmdXYXRjaGRvZykge1xuICAgICAgYWRkTG9nKCdbKl0gVXJ1Y2hvbWlvbm8gcMSZdGzEmSBjacSFZ8WCZWdvIG1vbml0b3Jvd2FuaWEgKFdhdGNoZG9nIERhZW1vbiBjbyAxMjAwbXMpJyk7XG4gICAgICBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgcnVuRGV0ZWN0aW9uQ3ljbGUoKTtcbiAgICAgIH0sIDEyMDApO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoaW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzZW50aW5lbDpnbmlkYS1hdXRvLWZyb3plbicsIGhhbmRsZUF1dG9Gcm96ZW4pO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtpc1J1bm5pbmdXYXRjaGRvZ10pO1xuXG4gIGNvbnN0IHRyaWdnZXJQYW5pY0hvdGtleSA9ICgpID0+IHtcbiAgICBhZGRMb2coJ1tQQU5JQ10gV2NpxZtuacSZdG8gZ2xvYmFsbnkgc2tyw7N0IGF3YXJ5am55IFtDdHJsICsgQWx0ICsgU2hpZnQgKyBLXSEnKTtcbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocHJvYykgPT4ge1xuICAgICAgICBpZiAocHJvYy5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAocHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5oYXNGbHV0dGVyRGxsKSkge1xuICAgICAgICAgIGFkZExvZyhgW1BBTklDIEtJTExdIFpsaWt3aWRvd2FubyBuYXR5Y2htaWFzdCBQSUQgJHtwcm9jLnBpZH0gKCR7cHJvYy5uYW1lfSlgKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wcm9jLCBzdGF0dXM6ICd0ZXJtaW5hdGVkJyBhcyBjb25zdCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9jO1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IHJlc2V0QWxsID0gKCkgPT4ge1xuICAgIHNldFByb2Nlc3NlcyhbXG4gICAgICB7XG4gICAgICAgIHBpZDogMTA0NCxcbiAgICAgICAgcHBpZDogMCxcbiAgICAgICAgbmFtZTogJ2V4cGxvcmVyLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnRWtzcGxvcmF0b3IgV2luZG93cycsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMTAyNCxcbiAgICAgICAgaGVpZ2h0OiA3MDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFdpbmRvd3NcXFxcZXhwbG9yZXIuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogZmFsc2UsXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiAnMHgwMDAxMDA0QScsXG4gICAgICAgICAgICB0aXRsZTogJ1Bhc2VrIFphZGHFhCBXaW5kb3dzICYgUHVscGl0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ1NoZWxsX1RyYXlXbmQnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDQ4IH0sXG4gICAgICAgICAgICB6T3JkZXI6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogNDgyMCxcbiAgICAgICAgcHBpZDogMTA0NCxcbiAgICAgICAgbmFtZTogJ2Nocm9tZS5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0dvb2dsZSBDaHJvbWUgLSBQdWxwaXQnLFxuICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDEyODAsXG4gICAgICAgIGhlaWdodDogODAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxQcm9ncmFtIEZpbGVzXFxcXEdvb2dsZVxcXFxDaHJvbWVcXFxcQXBwbGljYXRpb25cXFxcY2hyb21lLmV4ZScsXG4gICAgICAgIGlzUm9ndWU6IGZhbHNlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogJzB4MDAwNDVBMTInLFxuICAgICAgICAgICAgdGl0bGU6ICdHb29nbGUgQ2hyb21lIC0gUHVscGl0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ0Nocm9tZV9XaWRnZXRXaW5fMScsXG4gICAgICAgICAgICBpc1RvcE1vc3Q6IGZhbHNlLFxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDEyODAsIGhlaWdodDogODAwIH0sXG4gICAgICAgICAgICB6T3JkZXI6IDEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogMzg0MCxcbiAgICAgICAgcHBpZDogMTA0NCxcbiAgICAgICAgbmFtZTogJ2Ryb3BwZXJfd2F0Y2hkb2cuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdCYWNrZ3JvdW5kIFdhdGNoZG9nIFNlcnZpY2UgKEhpZGRlbiBEcm9wcGVyKScsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICBpc0Jsb2NrZWQ6IHRydWUsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXGRyb3BwZXJfd2F0Y2hkb2cuZXhlJyxcbiAgICAgICAgaXNQYXJlbnREcm9wcGVyOiB0cnVlLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogODkzMixcbiAgICAgICAgcHBpZDogMzg0MCxcbiAgICAgICAgbmFtZTogJ2ZsdXR0ZXJfcnVubmVyLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgICBpc1RvcE1vc3Q6IHRydWUsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IDE5MjAsXG4gICAgICAgIGhlaWdodDogMTA4MCxcbiAgICAgICAgb3BhY2l0eTogMC45MixcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogJzB4MDA0RjFBMDInLFxuICAgICAgICAgICAgdGl0bGU6ICdGbHV0dGVyIEZ1bGxzY3JlZW4gTG9ja3NjcmVlbiBPdmVybGF5IFtXU19FWF9UT1BNT1NUXScsXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdGTFVUVEVSX1JVTk5FUl9XSU5ET1cnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgICB6T3JkZXI6IDk5OSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGh3bmQ6ICcweDAwNEYxQTg4JyxcbiAgICAgICAgICAgIHRpdGxlOiAnTGF5ZXJlZCBUcmFuc3BhcmVudCBDbGlja1RyYXAnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9TVUJWSUVXX01PREFMJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogdHJ1ZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTkyMCwgaGVpZ2h0OiAxMDgwIH0sXG4gICAgICAgICAgICB6T3JkZXI6IDEwMDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSk7XG4gICAgYWRkTG9nKCdbUkVTRVRdIFpyZXNldG93YW5vIGxpc3TEmSBwcm9jZXPDs3cgaSB6cmVrb25zdHJ1b3dhbm8gZHJ6ZXdvIFBQSUQuJyk7XG4gIH07XG5cbiAgY29uc3QgYWN0aXZlT3ZlcmxheSA9IHByb2Nlc3Nlcy5maW5kKFxuICAgIChwKSA9PiBwLnN0YXR1cyA9PT0gJ3J1bm5pbmcnICYmIChwLmlzVG9wTW9zdCB8fCBwLmlzRnVsbHNjcmVlbilcbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICB7LyogSGVhZGVyIEluZm8gQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc2hhZG93LWxnIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcmVkLTUwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5JbnRlcmFrdHl3bnkgU3ltdWxhdG9yIFBhbWnEmWNpLCBFa3JhbnUgJiBEcnpld2EgUHJvY2Vzw7N3PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIFRSRUUtVklFVyAmIFBQSUQgVFJBQ0VSXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIG10LTEgbWF4LXctMnhsXCI+XG4gICAgICAgICAgICBXaXp1YWxpenVqIHJlbGFjamUgbWnEmWR6eSBwcm9jZXNlbS1tYXRrxIUgKERyb3BwZXIvV2F0Y2hkb2cpIGEgb2tuYW1pIG5ha8WCYWRlayBGbHV0dGVyYSAoPGNvZGUgY2xhc3NOYW1lPVwidGV4dC1wdXJwbGUtNDAwIGZvbnQtbW9ub1wiPkhXTkQ8L2NvZGU+KS4gWmlkZW50eWZpa3VqIHByYXdkeml3ZSDFunLDs2TFgm8gesWCb8WbbGl3ZWdvIG9rbmEgaSB6bGlrd2lkdWogY2HFgmUgZHJ6ZXdvIG9kIGtvcnplbmlhLlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2Rvd25sb2FkRnVsbE9mZmxpbmVCdW5kbGV9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiBiZy1ncmFkaWVudC10by1yIGZyb20tcHVycGxlLTcwMCB0by1waW5rLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8tcGluay02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBzaGFkb3cgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgdGl0bGU9XCJQb2JpZXJ6IGdvdG93eSBwYWtpZXQgc2tyeXB0w7N3IHJhdHVua293eWNoIC5iYXQgaSAucHkgbmEgZHlza1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiBQYWtpZXQgT2ZmbGluZSAoLmJhdCArIC5weSk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBWaWV3IFN3aXRjaGVyIFRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy1zbGF0ZS05MDAvODAgcC0xLjUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMVwiPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignaW50ZWdyYXRlZCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdpbnRlZ3JhdGVkJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TGF5ZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPldpZG9rIFppbnRlZ3Jvd2FueSAoUHVscGl0ICsgRHJ6ZXdvKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigndHJlZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICd0cmVlJ1xuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Rm9sZGVyVHJlZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Ecnpld28gUHJvY2Vzw7N3ICYgRGV0ZWt0b3IgUG9jaG9kemVuaWEgKFRyZWUtVmlldyk8L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRBY3RpdmVUYWIoJ2Rlc2t0b3AnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnZGVza3RvcCdcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPE1vbml0b3IgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+V2lydHVhbG55IFB1bHBpdCAmIFBvZGdsxIVkIFJBTTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignd2F0Y2hkb2cnKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTMgcHktMS41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgYWN0aXZlVGFiID09PSAnd2F0Y2hkb2cnXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXBpbmstNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlByb2Nlc3MgV2F0Y2hkb2cgKENQVSAvIFJBTSBMaXZlKTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPHNwYW4+QWt0eXduZSBwcm9jZXN5OiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGVcIj57cHJvY2Vzc2VzLmZpbHRlcihwID0+IHAuc3RhdHVzID09PSAncnVubmluZycpLmxlbmd0aH08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgPHNwYW4+4oCiPC9zcGFuPlxuICAgICAgICAgIDxzcGFuPlphZ3JvxbxlbmlhOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMFwiPntwcm9jZXNzZXMuZmlsdGVyKHAgPT4gcC5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiBwLmlzUm9ndWUpLmxlbmd0aH08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBBY291c3RpYyBBbGVydCBTeXN0ZW0gTW9uaXRvciAmIEhhcHRpYyBGZWVkYmFjayAqL31cbiAgICAgIDxBY291c3RpY0FsZXJ0TW9uaXRvciAvPlxuXG4gICAgICB7LyogQ29udHJvbCBCYXIgJiBBY3Rpb25zICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy00IGdhcC00XCI+XG4gICAgICAgIHsvKiBTcGF3biBDb250cm9scyAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGJsb2NrXCI+XG4gICAgICAgICAgICAxLiBXeWdlbmVydWogWmRhcnplbmllIFphZ3JvxbxlbmlhXG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNwYXduT3ZlcmxheSgna2lvc2snKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXJlZC0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciBib3JkZXItcmVkLTkwMC80MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPlBlxYJueSBFa3JhbiAoRHJvcHBlciArIEtpb3NrKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPEFsZXJ0VHJpYW5nbGUgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc3Bhd25PdmVybGF5KCdzdGVhbHRoX2ZsdXR0ZXInKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tZWRpdW0gYm9yZGVyIGJvcmRlci1hbWJlci05MDAvNDAgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8c3Bhbj5aYWthbXVmbG93YW55IChMb2FkZXIgKyBETEwpPC9zcGFuPlxuICAgICAgICAgICAgICA8TG9jayBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYW1iZXItNDAwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNwYXduT3ZlcmxheSgndHJhbnNsdWNlbnQnKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LWluZGlnby0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbWVkaXVtIGJvcmRlciBib3JkZXItaW5kaWdvLTkwMC80MCB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuPlByemV6cm9jenlzdGEgUHXFgmFwa2EgTXlzemtpPC9zcGFuPlxuICAgICAgICAgICAgICA8RXllIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1pbmRpZ28tNDAwXCIgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogVGFjdGljYWwgRGVmZW5zZSBBY3Rpb25zICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBzcGFjZS15LTMgbGc6Y29sLXNwYW4tM1wiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtNDAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgMi4gV3lrb25haiBBa2NqxJkgT2Jyb25uxIVcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0zIGxnOmdyaWQtY29scy01IGdhcC0yXCI+XG4gICAgICAgICAgICB7LyogVFJXQcWBWSBTQUJPVEHFuyBQRSAmIEFDTCAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlclBlU2Fib3RhZ2VBbmRBY2xMb2NrfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHB4LTMgcHktMi41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNzAwIHZpYS1yb3NlLTcwMCB0by1waW5rLTcwMCBob3Zlcjpmcm9tLXJlZC02MDAgaG92ZXI6dG8tcGluay02MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIHNoYWRvdy1sZyBzaGFkb3ctcmVkLTkwMC80MCB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXJlZC00MDAvNDAgcmluZy0xIHJpbmctcmVkLTQwMC8zMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiTmFkcGlzdWplIG5hZ8WCw7N3ZWsgUEUgKDB4NUE0RCBNWiAtPiBERUFEKSBpIG9kY2luYSB1cHJhd25pZW5pYSBEQUNMIChpY2FjbHMgL2RlbnkgRXZlcnlvbmUpXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPEZpbGVYIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci0zMDAgYW5pbWF0ZS1wdWxzZVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPvCfkqUgU0FCT1RBxbsgUEUgJiBBQ0w8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFVOSUVSVUNIT00gJiBLV0FSQU5UQU5OQSAtIFNQRUNJQUwgQlVUVE9OICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXt0cmlnZ2VyUXVhcmFudGluZUxvY2tvdXR9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXB1cnBsZS03MDAgdG8taW5kaWdvLTcwMCBob3Zlcjpmcm9tLXB1cnBsZS02MDAgaG92ZXI6dG8taW5kaWdvLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTAwLzQwIHRyYW5zaXRpb24tYWxsIGJvcmRlciBib3JkZXItcHVycGxlLTQwMC8zMFwiXG4gICAgICAgICAgICAgIHRpdGxlPVwiWmFtcmHFvGEgcHJvY2VzIHcgUkFNIGkgb2RiaWVyYSB1cHJhd25pZW5pYSBwbGlrb3dpIG5hIGR5c2t1XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5VTklFUlVDSE9NIFcgUkFNPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgIHsvKiBTa2FudWogJiBaYWJpaiBKZWRub3Jhem93byAqL31cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17cnVuRGV0ZWN0aW9uQ3ljbGV9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGdhcC0xLjUgcHgtMyBweS0yLjUgYmctcmVkLTYwMCBob3ZlcjpiZy1yZWQtNTAwIHRleHQtd2hpdGUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgc2hhZG93IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPENyb3NzaGFpciBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+U2thbnVqICYgWmFiaWo8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgey8qIFNrcsOzdCBQYW5pa2kgKi99XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RyaWdnZXJQYW5pY0hvdGtleX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIuNSBiZy1hbWJlci02MDAgaG92ZXI6YmctYW1iZXItNTAwIHRleHQtc2xhdGUtOTUwIGZvbnQtYm9sZCByb3VuZGVkLWxnIHRleHQteHMgc2hhZG93IHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00XCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+U2tyw7N0IFBhbmlraTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogV2F0Y2hkb2cgUMSZdGxhICovfVxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc1J1bm5pbmdXYXRjaGRvZyghaXNSdW5uaW5nV2F0Y2hkb2cpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHB4LTMgcHktMi41IHJvdW5kZWQtbGcgdGV4dC14cyBmb250LXNlbWlib2xkIHNoYWRvdyB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgIGlzUnVubmluZ1dhdGNoZG9nXG4gICAgICAgICAgICAgICAgICA/ICdiZy1lbWVyYWxkLTYwMCBob3ZlcjpiZy1lbWVyYWxkLTUwMCB0ZXh0LXdoaXRlIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwJ1xuICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2lzUnVubmluZ1dhdGNoZG9nID8gPFBhdXNlIGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPiA6IDxQbGF5IGNsYXNzTmFtZT1cInctNCBoLTRcIiAvPn1cbiAgICAgICAgICAgICAgPHNwYW4+e2lzUnVubmluZ1dhdGNoZG9nID8gJ1N0cmHFvG5pazogT04nIDogJ0RlbW9uIFdhdGNoZG9nJ308L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHB0LTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgIERyemV3byBQUElEOiBpZGVudHlmaWt1amUgcHJvY2VzeSBuYWRyesSZZG5lIChEcm9wcGVyeS9XYXRjaGRvZ2kpLCB6YXBvYmllZ2FqxIVjIG9kcmFkemFuaXUgc2nEmSBva2llbi5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17cmVzZXRBbGx9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGVcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8UmVmcmVzaEN3IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5SZXNldCBzeW11bGF0b3JhPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBDb25kaXRpb25hbGx5IFJlbmRlcmVkIFZpZXdzICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ3dhdGNoZG9nJyA/IChcbiAgICAgICAgPFByb2Nlc3NXYXRjaGRvZyBpbml0aWFsUHJvY2Vzc2VzPXtwcm9jZXNzZXN9IC8+XG4gICAgICApIDogYWN0aXZlVGFiID09PSAndHJlZScgPyAoXG4gICAgICAgIC8qIEZ1bGwgVHJlZSBWaWV3IE1vZGUgKi9cbiAgICAgICAgPFByb2Nlc3NUcmVlVmlld1xuICAgICAgICAgIHByb2Nlc3Nlcz17cHJvY2Vzc2VzfVxuICAgICAgICAgIG9uS2lsbFByb2Nlc3M9e2hhbmRsZUtpbGxTaW5nbGVQcm9jZXNzfVxuICAgICAgICAgIG9uS2lsbFByb2Nlc3NUcmVlPXtoYW5kbGVLaWxsUHJvY2Vzc1RyZWV9XG4gICAgICAgICAgb25TdXNwZW5kVHJlZT17aGFuZGxlU3VzcGVuZFRyZWV9XG4gICAgICAgICAgb25TYWJvdGFnZVRyZWU9e2hhbmRsZVNhYm90YWdlVHJlZX1cbiAgICAgICAgLz5cbiAgICAgICkgOiAoXG4gICAgICAgIC8qIFNwbGl0IEludGVncmF0ZWQgb3IgRGVza3RvcCBWaWV3ICovXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0xMiBnYXAtNlwiPlxuICAgICAgICAgICAgey8qIFZpcnR1YWwgRGVza3RvcCBEaXNwbGF5ICg3IGNvbHMpICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNCBmbGV4IGZsZXgtY29sXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBtYi0zXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICA8TW9uaXRvciBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtYmx1ZS00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgV2lydHVhbG55IFB1bHBpdCBXaW5kb3dzIDExICgxOTIweDEwODApXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlotT1JERVIgLyBMQVlFUiBSRU5ERVI8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBTY3JlZW4gQ2FudmFzIENvbnRhaW5lciAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBhc3BlY3QtdmlkZW8gdy1mdWxsIGJnLXNsYXRlLTk1MCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIG92ZXJmbG93LWhpZGRlbiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBzaGFkb3ctaW5uZXJcIj5cbiAgICAgICAgICAgICAgICB7LyogRGVza3RvcCBXYWxscGFwZXIgc2ltdWxhdGVkIGVsZW1lbnRzICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBwLTMgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcG9pbnRlci1ldmVudHMtbm9uZSBvcGFjaXR5LTYwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZCBiZy1ibHVlLTYwMC8zMCBib3JkZXIgYm9yZGVyLWJsdWUtNTAwLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtWzlweF0gZm9udC1ib2xkIHRleHQtYmx1ZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBUZW4gS29tcHV0ZXJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy04IGgtOCByb3VuZGVkIGJnLXNsYXRlLTgwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciB0ZXh0LVs5cHhdIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIEtvc3pcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS02MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIFB1bHBpdCBiZXpwaWVjem55IChUcnliIHRlc3Rvd3kpXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIHsvKiBSZW5kZXIgU3RhbmRhcmQgV2luZG93cyBiZWhpbmQgKi99XG4gICAgICAgICAgICAgICAge3Byb2Nlc3Nlc1xuICAgICAgICAgICAgICAgICAgLmZpbHRlcigocCkgPT4gcC5zdGF0dXMgPT09ICdydW5uaW5nJyAmJiAhcC5pc0Z1bGxzY3JlZW4gJiYgcC53aWR0aCA+IDApXG4gICAgICAgICAgICAgICAgICAubWFwKChwKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e3AucGlkfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCByb3VuZGVkIHNoYWRvdy14bCBwLTIgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS0yMDBcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogYCR7KHAud2lkdGggLyAxOTIwKSAqIDEwMCAqIDAuN30lYCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogYCR7KHAuaGVpZ2h0IC8gMTA4MCkgKiAxMDAgKiAwLjd9JWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICcxNSUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogJzE1JScsXG4gICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTEgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMCBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvbGQgdHJ1bmNhdGVcIj57cC53aW5kb3dUaXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs4cHhdIHRleHQtc2xhdGUtNTAwIGZvbnQtbW9ub1wiPlBJRCB7cC5waWR9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIHRleHQtWzlweF1cIj5BcGxpa2FjamEgdcW8eXRrb3duaWthIGR6aWHFgmEgcG9wcmF3bmllLjwvcD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cblxuICAgICAgICAgICAgICAgIHsvKiBSZW5kZXIgQWN0aXZlIEZ1bGxzY3JlZW4gT3ZlcmxheSBpZiBydW5uaW5nICovfVxuICAgICAgICAgICAgICAgIHthY3RpdmVPdmVybGF5ICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1yZWQtOTUwLzkwIGJvcmRlci00IGJvcmRlci1yZWQtNjAwIHotMzAgZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC02IHRleHQtY2VudGVyIGFuaW1hdGUtcHVsc2VcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBvcGFjaXR5OiBhY3RpdmVPdmVybGF5Lm9wYWNpdHkgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMgYmctcmVkLTYwMC8zMCByb3VuZGVkLWZ1bGwgYm9yZGVyIGJvcmRlci1yZWQtNTAwIG1iLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U2hpZWxkQWxlcnQgY2xhc3NOYW1lPVwidy04IGgtOCB0ZXh0LXJlZC00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWV4dHJhYm9sZCB0ZXh0LXdoaXRlIHRyYWNraW5nLXdpZGUgdXBwZXJjYXNlXCI+XG4gICAgICAgICAgICAgICAgICAgICAge2FjdGl2ZU92ZXJsYXkud2luZG93VGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1yZWQtMjAwIG10LTEgbWF4LXctc21cIj5cbiAgICAgICAgICAgICAgICAgICAgICBQcm9jZXMgcG90b21ueTogPGNvZGUgY2xhc3NOYW1lPVwiYmctcmVkLTkwMC84MCBweC0xIHB5LTAuNSByb3VuZGVkIGZvbnQtbW9ub1wiPnthY3RpdmVPdmVybGF5Lm5hbWV9PC9jb2RlPiAoUElEOiB7YWN0aXZlT3ZlcmxheS5waWR9KVxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIHthY3RpdmVPdmVybGF5LnBwaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1hbWJlci0zMDAgbXQtMSBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIOKaoO+4jyDFuXLDs2TFgm8gLyBSb2R6aWMgKFBQSUQ6IHthY3RpdmVPdmVybGF5LnBwaWR9KToge3Byb2Nlc3Nlcy5maW5kKHAgPT4gcC5waWQgPT09IGFjdGl2ZU92ZXJsYXkucHBpZCk/Lm5hbWUgfHwgJ05pZXpuYW55J31cbiAgICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTMwMCBtdC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQXRyeWJ1dHk6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtYW1iZXItMzAwIGZvbnQtYm9sZFwiPldTX0VYX1RPUE1PU1Q8L3NwYW4+IHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+MTAwJSBFa3JhbnU8L3NwYW4+IHwgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1hbWJlci0zMDAgZm9udC1ib2xkXCI+UHJ6ZWNod3l0eXdhbmllIHdlasWbY2lhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXQtNCBmbGV4IGZsZXgtd3JhcCBnYXAtMiBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUtpbGxQcm9jZXNzVHJlZShhY3RpdmVPdmVybGF5LnBwaWQgfHwgYWN0aXZlT3ZlcmxheS5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC03MDAgdG8tcGluay03MDAgaG92ZXI6ZnJvbS1yZWQtNjAwIGhvdmVyOnRvLXBpbmstNjAwIHRleHQtd2hpdGUgcm91bmRlZCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3cgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTa3VsbCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5abGlrd2lkdWogQ2HFgmUgRHJ6ZXdvICgvVCk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17dHJpZ2dlclF1YXJhbnRpbmVMb2Nrb3V0fVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctcHVycGxlLTcwMCBob3ZlcjpiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgcm91bmRlZCB0ZXh0LXhzIGZvbnQtYm9sZCBzaGFkb3dcIlxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIFVuaWVydWNob20gdyBSQU0gJiBLd2FyYW50YW5uYVxuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICB7IWFjdGl2ZU92ZXJsYXkgJiYgKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ6LTEwIHRleHQtY2VudGVyIHRleHQtc2xhdGUtNTAwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTggaC04IHRleHQtZW1lcmFsZC01MDAgbXgtYXV0byBtYi0xIG9wYWNpdHktODBcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1lbWVyYWxkLTQwMFwiPlB1bHBpdCBjenlzdHkgaSBvZGJsb2tvd2FueTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5CcmFrIG5pZXBvxbzEhWRhbnljaCBuYWvFgmFkZWsgbmEgcGllcndzenltIHBsYW5pZS48L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUHJvY2VzcyBUYWJsZSAmIFJlYWwtVGltZSBXaW4zMiBJbnNwZWN0b3IgKDUgY29scykgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTUgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IGZsZXggZmxleC1jb2xcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIG1iLTNcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICBUYWJlbGEgUHJvY2Vzw7N3ICYgU3RhbnUgV2luMzJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCd0cmVlJyl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXB1cnBsZS00MDAgaG92ZXI6dGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEZvbGRlclRyZWUgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgICA8c3Bhbj5PdHfDs3J6IFBlxYJuZSBEcnpld28gUFBJRCDihpI8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yIG92ZXJmbG93LXktYXV0byBtYXgtaC1bMzAwcHhdIHByLTFcIj5cbiAgICAgICAgICAgICAgICB7cHJvY2Vzc2VzLm1hcCgocCkgPT4gKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBrZXk9e3AucGlkfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BwLTIuNSByb3VuZGVkLWxnIGJvcmRlciB0ZXh0LXhzIHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICAgICAgcC5zdGF0dXMgPT09ICdwZV9jb3JydXB0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yb3NlLTk1MC82MCBib3JkZXItcm9zZS02MDAvODAgdGV4dC1yb3NlLTIwMCBzaGFkb3ctbWQgc2hhZG93LXJvc2UtOTUwLzQwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLnN0YXR1cyA9PT0gJ3F1YXJhbnRpbmVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC80MCBib3JkZXItcHVycGxlLTgwMC82MCB0ZXh0LXB1cnBsZS0zMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHAuc3RhdHVzID09PSAndGVybWluYXRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIG9wYWNpdHktNDAgbGluZS10aHJvdWdoJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLmlzUm9ndWUgfHwgcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJlZC05NTAvMzAgYm9yZGVyLXJlZC04MDAgdGV4dC1yZWQtMjAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwLmlzUGFyZW50RHJvcHBlclxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctYW1iZXItOTUwLzMwIGJvcmRlci1hbWJlci04MDAgdGV4dC1hbWJlci0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1zbGF0ZS05NTAgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbW9ubyBmb250LWJvbGQgdGV4dC13aGl0ZVwiPntwLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIFBJRDoge3AucGlkfSB7cC5wcGlkID8gYChQUElEOiAke3AucHBpZH0pYCA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTEuNSBweS0wLjUgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LWJvbGQgZm9udC1tb25vICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHAuc3RhdHVzID09PSAncGVfY29ycnVwdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTAwIHRleHQtcm9zZS0xMDAgYm9yZGVyIGJvcmRlci1yb3NlLTUwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtOTAwIHRleHQtcHVycGxlLTIwMCBib3JkZXIgYm9yZGVyLXB1cnBsZS02MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBwLnN0YXR1cyA9PT0gJ3Rlcm1pbmF0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTAwIHRleHQtcmVkLTIwMCBhbmltYXRlLXB1bHNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05MDAgdGV4dC1hbWJlci0yMDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAn8J+SpSBQRSBDT1JSVVBURUQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnS1dBUkFOVEFOTkEnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdaQUJJVFknXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogcC5pc1RvcE1vc3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnVE9QTU9TVCBPVkVSTEFZJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6IHAuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gJ1BBUkVOVCBEUk9QUEVSJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdOT1JNQUxOWSd9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTEgZmxleCBmbGV4LXdyYXAgZ2FwLTEgdGV4dC1bMTBweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICB7cC5pc1RvcE1vc3QgJiYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMSBiZy1yZWQtOTAwLzUwIHRleHQtcmVkLTMwMCByb3VuZGVkIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBXU19FWF9UT1BNT1NUXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7cC5oYXNGbHV0dGVyRGxsICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTEgYmctYW1iZXItOTAwLzUwIHRleHQtYW1iZXItMzAwIHJvdW5kZWQgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZsdXR0ZXJfd2luZG93cy5kbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgIHtwLmlzUGFyZW50RHJvcHBlciAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0xIGJnLWFtYmVyLTk1MCB0ZXh0LWFtYmVyLTMwMCByb3VuZGVkIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLWFtYmVyLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJlbnQgV2F0Y2hkb2cgKFBQSUQ6IHtwLnBpZH0pXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgey8qIFRlbGVtZXRyeSBDb25zb2xlIExvZyAqL31cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMCBmbGV4LTEgZmxleCBmbGV4LWNvbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyBmb250LXNlbWlib2xkIHRleHQtc2xhdGUtNDAwIG1iLTEuNSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIFpkYXJ6ZcWEIFNpbG5pa2EgUHl0aG9uIC8gV2luMzI6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bOXB4XSB0ZXh0LWVtZXJhbGQtNDAwXCI+4pePIExJVkUgTU9OSVRPUjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC0yLjUgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS0zMDAgc3BhY2UteS0xIGgtMzIgb3ZlcmZsb3cteS1hdXRvXCI+XG4gICAgICAgICAgICAgICAgICB7bG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdXWUtSWVRPJykgfHwgbG9nLmluY2x1ZGVzKCdTUEFXTicpIHx8IGxvZy5pbmNsdWRlcygnVFJFRS1LSUxMJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1hbWJlci00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdLSUxMJykgfHwgbG9nLmluY2x1ZGVzKCdQQU5JQycpIHx8IGxvZy5pbmNsdWRlcygnT1NUUlpFxbtFTklFJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiBsb2cuaW5jbHVkZXMoJ0tXQVJBTlRBTk5BJykgfHwgbG9nLmluY2x1ZGVzKCdaQU1ST8W7T05PJykgfHwgbG9nLmluY2x1ZGVzKCdTVUtDRVMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICA/ICd0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBJbnRlZ3JhdGVkIFRyZWUgVmlldyBlbWJlZGRlZCB1bmRlcm5lYXRoICovfVxuICAgICAgICAgIDxQcm9jZXNzVHJlZVZpZXdcbiAgICAgICAgICAgIHByb2Nlc3Nlcz17cHJvY2Vzc2VzfVxuICAgICAgICAgICAgb25LaWxsUHJvY2Vzcz17aGFuZGxlS2lsbFNpbmdsZVByb2Nlc3N9XG4gICAgICAgICAgICBvbktpbGxQcm9jZXNzVHJlZT17aGFuZGxlS2lsbFByb2Nlc3NUcmVlfVxuICAgICAgICAgICAgb25TdXNwZW5kVHJlZT17aGFuZGxlU3VzcGVuZFRyZWV9XG4gICAgICAgICAgICBvblNhYm90YWdlVHJlZT17aGFuZGxlU2Fib3RhZ2VUcmVlfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQThvQlk7QUE5b0JaLFNBQWdCLFVBQVUsaUJBQWlCO0FBQzNDO0FBQUEsRUFDRTtBQUFBLEVBQU07QUFBQSxFQUFPO0FBQUEsRUFBVztBQUFBLEVBQWE7QUFBQSxFQUFlO0FBQUEsRUFBVTtBQUFBLEVBQVM7QUFBQSxFQUN2RTtBQUFBLEVBQUs7QUFBQSxFQUFLO0FBQUEsRUFBZ0I7QUFBQSxFQUFhO0FBQUEsRUFBTztBQUFBLEVBQW1CO0FBQUEsRUFDakU7QUFBQSxFQUFlO0FBQUEsRUFBMEI7QUFBQSxPQUNwQztBQUVQLFNBQVMsaUNBQWlDO0FBQzFDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMs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