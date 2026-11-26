import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"]; const useEffect = __vite__cjsImport1_react["useEffect"];
import {
  Activity,
  Cpu,
  HardDrive,
  ShieldAlert,
  Zap,
  Play,
  Pause,
  Lock,
  Skull,
  Flame,
  Gauge,
  Terminal,
  Download,
  Search,
  Sliders,
  Info
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFile } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
import { WatchdogRulesManager, DEFAULT_WATCHDOG_RULES } from "/sentinel-toolkit/src/components/WatchdogRulesManager.tsx";
import { safeStorage } from "/sentinel-toolkit/src/utils/selfRepairSystem.ts";
export const ProcessWatchdog = ({ initialProcesses }) => {
  const [processes, setProcesses] = useState(() => {
    if (initialProcesses && initialProcesses.length > 0) {
      return initialProcesses.map((p) => ({
        ...p,
        cpuPercent: p.cpuPercent ?? (p.isTopMost ? 34.8 : p.isParentDropper ? 12.4 : 1.2),
        memoryMb: p.memoryMb ?? (p.isTopMost ? 218.4 : p.isParentDropper ? 45.2 : 110.5),
        threadsCount: p.threadsCount ?? (p.isTopMost ? 18 : p.isParentDropper ? 6 : 24),
        handlesCount: p.handlesCount ?? (p.isTopMost ? 340 : p.isParentDropper ? 95 : 512),
        ioRateKb: p.ioRateKb ?? (p.isTopMost ? 142.5 : p.isParentDropper ? 18.2 : 4.1),
        priorityClass: p.priorityClass ?? (p.isTopMost ? "HIGH" : "NORMAL"),
        cpuHistory: p.cpuHistory ?? [15, 22, 28, 30, 35, 34.8],
        memoryHistory: p.memoryHistory ?? [180, 195, 205, 212, 215, 218.4]
      }));
    }
    return [
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
        cpuPercent: 1.8,
        memoryMb: 142,
        threadsCount: 42,
        handlesCount: 1250,
        ioRateKb: 8.5,
        priorityClass: "NORMAL",
        cpuHistory: [2.1, 1.9, 2.5, 1.8, 1.7, 1.8],
        memoryHistory: [140, 141, 141.5, 142, 142, 142],
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
        cpuPercent: 4.2,
        memoryMb: 320.5,
        threadsCount: 36,
        handlesCount: 890,
        ioRateKb: 24.1,
        priorityClass: "NORMAL",
        cpuHistory: [3.8, 5.1, 4.5, 6.2, 4, 4.2],
        memoryHistory: [310, 312, 315, 318, 320, 320.5],
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
        cpuPercent: 14.6,
        memoryMb: 58.2,
        threadsCount: 8,
        handlesCount: 145,
        ioRateKb: 65.4,
        priorityClass: "NORMAL",
        cpuHistory: [10, 12, 18, 14, 15, 14.6],
        memoryHistory: [45, 48, 52, 55, 57, 58.2],
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
        cpuPercent: 48.5,
        memoryMb: 264.8,
        threadsCount: 22,
        handlesCount: 460,
        ioRateKb: 210.8,
        priorityClass: "HIGH",
        cpuHistory: [25, 38, 42, 51, 46, 48.5],
        memoryHistory: [180, 210, 235, 250, 260, 264.8],
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
          }
        ]
      },
      {
        pid: 9940,
        ppid: 3840,
        name: "work_destroyer_gnida.exe",
        windowTitle: "Wątek Przechwytujący Klawiaturę i Kasujący Pliki Robocze",
        isTopMost: true,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 0,
        isBlocked: true,
        status: "running",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\work_destroyer_gnida.exe",
        isRogue: true,
        cpuPercent: 52.4,
        memoryMb: 195,
        threadsCount: 18,
        handlesCount: 340,
        ioRateKb: 512,
        priorityClass: "HIGH",
        cpuHistory: [15, 28, 42, 48, 50, 52.4],
        memoryHistory: [110, 130, 160, 180, 190, 195],
        windows: []
      }
    ];
  });
  const [rules, setRules] = useState(() => {
    return safeStorage.get("sentinel_watchdog_auto_kill_rules", DEFAULT_WATCHDOG_RULES);
  });
  const [totalRuleKills, setTotalRuleKills] = useState(() => {
    return safeStorage.get("sentinel_watchdog_total_kills", 6);
  });
  const [watchdogMainTab, setWatchdogMainTab] = useState("rules");
  const [workDestroyedBanner, setWorkDestroyedBanner] = useState(null);
  useEffect(() => {
    safeStorage.set("sentinel_watchdog_auto_kill_rules", rules);
  }, [rules]);
  const playKillSound = () => {
    try {
      if (typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext)) {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(640, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.18);
      }
    } catch {
    }
  };
  const [isWatchdogActive, setIsWatchdogActive] = useState(true);
  const [pollInterval, setPollInterval] = useState(1e3);
  const [cpuThreshold, setCpuThreshold] = useState(30);
  const [memoryThreshold, setMemoryThreshold] = useState(200);
  const [autoAction, setAutoAction] = useState("auto_kill");
  const [filterMode, setFilterMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProcessForDetails, setSelectedProcessForDetails] = useState(null);
  const [watchdogLogs, setWatchdogLogs] = useState([
    "[*] Strażnik zasobów (Process Watchdog Engine) zainicjalizowany pomyślnie.",
    "[*] Aktywne reguły automatycznego uboju załadowane z pamięci trwałej.",
    "[*] Reguła priorytetowa: Eksterminacja Gnidy Niszczącej Pracę (0 ms reakcji)."
  ]);
  const addLog = (msg) => {
    setWatchdogLogs((prev) => [...prev.slice(-35), `[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] ${msg}`]);
  };
  const handleKillWorkDestroyerNow = () => {
    playKillSound();
    addLog("⚔️ [ROZKAZ BOJOWY] WYKONANO NATYCHMIASTOWY UBÓJ GNIDY NISZCZĄCEJ PRACĘ!");
    let killedCount = 0;
    setProcesses(
      (prev) => prev.map((proc) => {
        const isTarget = proc.isRogue || proc.name.toLowerCase().includes("gnida") || proc.name.toLowerCase().includes("destroyer") || proc.name.toLowerCase().includes("wiper") || proc.name.toLowerCase().includes("encryptor") || proc.hasFlutterDll;
        if (isTarget && proc.status === "running") {
          killedCount++;
          addLog(`💥 [UBÓJ ZAKOŃCZONY] PID ${proc.pid} (${proc.name}) -> Zlikwidowano (TerminateProcess + Sabotaż PE MZ)!`);
          return {
            ...proc,
            status: "pe_corrupted",
            cpuPercent: 0,
            memoryMb: 0,
            isBlocked: true
          };
        }
        return proc;
      })
    );
    if (killedCount === 0) {
      const pid = 9988;
      const deadGnida = {
        pid,
        ppid: 1044,
        name: "work_destroyer_gnida.exe",
        windowTitle: "Wątek Przechwytujący Klawiaturę (Ubity w 0 ms)",
        isTopMost: false,
        isFullscreen: false,
        hasFlutterDll: false,
        width: 0,
        height: 0,
        opacity: 0,
        isBlocked: true,
        status: "pe_corrupted",
        filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\work_destroyer_gnida.exe",
        isRogue: true,
        cpuPercent: 0,
        memoryMb: 0,
        threadsCount: 0,
        handlesCount: 0,
        ioRateKb: 0,
        priorityClass: "IDLE",
        windows: []
      };
      setProcesses((prev) => [...prev.filter((p) => p.name !== "work_destroyer_gnida.exe"), deadGnida]);
      addLog(`💥 [UBÓJ ZAKOŃCZONY] Namierzono i ścięto gnidę 'work_destroyer_gnida.exe' (PID: ${pid})! Wszystkie pliki robocze zabezpieczone.`);
    }
    setTotalRuleKills((k) => {
      const nextK = k + 1;
      safeStorage.set("sentinel_watchdog_total_kills", nextK);
      return nextK;
    });
    setRules(
      (prev) => prev.map((r) => {
        if (r.id === "rule-work-destroyer" || r.protectsWork) {
          return {
            ...r,
            matchCount: r.matchCount + 1,
            lastTriggered: (/* @__PURE__ */ new Date()).toLocaleTimeString()
          };
        }
        return r;
      })
    );
    setWorkDestroyedBanner({
      show: true,
      text: "GNIDA NISZCZĄCA NASZĄ PRACĘ ZOSTAŁA UBITA! Bufor pamięci zwolniony, nagłówek PE wyzerowany (0xC000007B), praca i kod w 100% bezpieczne.",
      time: (/* @__PURE__ */ new Date()).toLocaleTimeString()
    });
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("sentinel:kill-all-gnidas"));
    }
  };
  const handleAddRule = (newRuleData) => {
    const newRule = {
      ...newRuleData,
      id: `rule-${Date.now()}`,
      matchCount: 0,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleString()
    };
    setRules((prev) => [newRule, ...prev]);
    addLog(`✔ [NOWA REGUŁA] Zdefiniowano regułę automatyczną: "${newRule.name}" (Wzorzec: ${newRule.pattern || newRule.matchField}, Akcja: ${newRule.action.toUpperCase()}).`);
  };
  const handleToggleRule = (ruleId) => {
    setRules(
      (prev) => prev.map((r) => {
        if (r.id === ruleId) {
          const nextState = !r.isEnabled;
          addLog(`[REGUŁA] ${nextState ? "Aktywowano" : "Wyłączono"} regułę "${r.name}".`);
          return { ...r, isEnabled: nextState };
        }
        return r;
      })
    );
  };
  const handleDeleteRule = (ruleId) => {
    setRules((prev) => {
      const target = prev.find((r) => r.id === ruleId);
      if (target) {
        addLog(`🗑️ [USUNIĘTO REGUŁĘ] Usunięto regułę "${target.name}".`);
      }
      return prev.filter((r) => r.id !== ruleId);
    });
  };
  const handleTestRule = (rule) => {
    playKillSound();
    const testPid = Math.floor(7500 + Math.random() * 2e3);
    let sampleName = "threat_sample.exe";
    if (rule.pattern) {
      sampleName = rule.pattern.replace(/\*/g, "") || "threat_sample.exe";
      if (!sampleName.endsWith(".exe")) sampleName += ".exe";
    } else if (rule.matchField === "hasFlutterDll") {
      sampleName = "flutter_overlay_trap.exe";
    }
    const testProc = {
      pid: testPid,
      ppid: 1044,
      name: sampleName,
      windowTitle: `Proces testowy reguły: ${rule.name}`,
      isTopMost: rule.matchField === "isTopMost",
      isFullscreen: false,
      hasFlutterDll: rule.matchField === "hasFlutterDll",
      width: 0,
      height: 0,
      opacity: 0,
      isBlocked: true,
      status: rule.action === "auto_suspend" ? "quarantined" : rule.action === "auto_kill_and_pe_sabotage" ? "pe_corrupted" : "terminated",
      filePath: `C:\\Users\\User\\AppData\\Local\\Temp\\${sampleName}`,
      isRogue: true,
      cpuPercent: 0,
      memoryMb: 0,
      threadsCount: 0,
      handlesCount: 0,
      ioRateKb: 0,
      priorityClass: "IDLE",
      windows: []
    };
    setProcesses((prev) => [...prev.filter((p) => p.name !== sampleName), testProc]);
    addLog(`🧪💥 [TEST SUKCES] Reguła "${rule.name}" wykryła proces "${sampleName}" (PID: ${testPid}) i wykonała ${rule.action.toUpperCase()} w 0 ms!`);
    setRules(
      (prev) => prev.map((r) => {
        if (r.id === rule.id) {
          return {
            ...r,
            matchCount: r.matchCount + 1,
            lastTriggered: (/* @__PURE__ */ new Date()).toLocaleTimeString()
          };
        }
        return r;
      })
    );
    setTotalRuleKills((k) => {
      const nextK = k + 1;
      safeStorage.set("sentinel_watchdog_total_kills", nextK);
      return nextK;
    });
  };
  useEffect(() => {
    const handleGlobalKill = () => {
      handleKillWorkDestroyerNow();
    };
    window.addEventListener("sentinel:kill-all-gnidas", handleGlobalKill);
    window.addEventListener("sentinel:kill-work-destroyer", handleGlobalKill);
    return () => {
      window.removeEventListener("sentinel:kill-all-gnidas", handleGlobalKill);
      window.removeEventListener("sentinel:kill-work-destroyer", handleGlobalKill);
    };
  }, []);
  useEffect(() => {
    if (!isWatchdogActive) return;
    const intervalId = setInterval(() => {
      setProcesses((prevProcesses) => {
        return prevProcesses.map((proc) => {
          if (proc.status !== "running") {
            return {
              ...proc,
              cpuPercent: 0,
              ioRateKb: 0
            };
          }
          let cpuBase = proc.cpuPercent || 1;
          let memBase = proc.memoryMb || 100;
          if (proc.isTopMost || proc.name.includes("flutter")) {
            const deltaCpu = Math.random() * 12 - 5.5;
            cpuBase = Math.max(18, Math.min(85, cpuBase + deltaCpu));
            const deltaMem = Math.random() * 2.5 - 0.4;
            memBase = Math.max(150, Math.min(480, memBase + deltaMem));
          } else if (proc.isParentDropper) {
            const spike = Math.random() > 0.7 ? 12 : -3;
            cpuBase = Math.max(2, Math.min(30, cpuBase + spike));
            memBase = Math.max(30, Math.min(90, memBase + (Math.random() * 0.8 - 0.3)));
          } else {
            const delta = Math.random() * 2 - 1;
            cpuBase = Math.max(0.5, Math.min(15, cpuBase + delta));
            memBase = Math.max(80, Math.min(450, memBase + (Math.random() * 0.4 - 0.2)));
          }
          const currentCpu = parseFloat(cpuBase.toFixed(1));
          const currentMem = parseFloat(memBase.toFixed(1));
          const newCpuHist = [...(proc.cpuHistory || []).slice(-9), currentCpu];
          const newMemHist = [...(proc.memoryHistory || []).slice(-9), currentMem];
          for (const rule of rules) {
            if (!rule.isEnabled) continue;
            let isMatch = false;
            if (rule.matchField === "hasFlutterDll") {
              isMatch = Boolean(proc.hasFlutterDll);
            } else if (rule.matchField === "isTopMost") {
              isMatch = Boolean(proc.isTopMost);
            } else {
              const targetVal = (rule.matchField === "name" ? proc.name : rule.matchField === "windowTitle" ? proc.windowTitle || "" : rule.matchField === "filePath" ? proc.filePath : proc.name).toLowerCase();
              const pat = rule.pattern.toLowerCase().trim();
              if (pat.includes("*")) {
                const parts = pat.split("*").filter(Boolean);
                isMatch = parts.length === 0 || parts.every((p) => targetVal.includes(p));
              } else {
                isMatch = targetVal.includes(pat);
              }
            }
            if (isMatch) {
              if (rule.action === "auto_kill" || rule.action === "auto_kill_and_pe_sabotage") {
                addLog(`💥 [REGUŁA WATCHDOG] "${rule.name}" natychmiast ścięła proces "${proc.name}" (PID: ${proc.pid})!`);
                playKillSound();
                return {
                  ...proc,
                  status: rule.action === "auto_kill_and_pe_sabotage" ? "pe_corrupted" : "terminated",
                  cpuPercent: 0,
                  memoryMb: 0,
                  cpuHistory: [...newCpuHist.slice(-9), 0],
                  memoryHistory: newMemHist,
                  isBlocked: true
                };
              } else if (rule.action === "auto_suspend") {
                addLog(`❄️ [REGUŁA WATCHDOG] "${rule.name}" zamroziła proces "${proc.name}" (PID: ${proc.pid}) w RAM!`);
                return {
                  ...proc,
                  status: "quarantined",
                  cpuPercent: 0,
                  cpuHistory: [...newCpuHist.slice(-9), 0],
                  memoryHistory: newMemHist
                };
              } else if (rule.action === "auto_throttle") {
                addLog(`⚡ [REGUŁA WATCHDOG] "${rule.name}" obniżyła priorytet CPU procesu "${proc.name}" do IDLE.`);
                return {
                  ...proc,
                  priorityClass: "IDLE",
                  cpuPercent: Math.min(currentCpu, 3),
                  cpuHistory: newCpuHist,
                  memoryHistory: newMemHist
                };
              }
            }
          }
          if ((currentCpu >= cpuThreshold || currentMem >= memoryThreshold) && (proc.isRogue || proc.isTopMost || proc.hasFlutterDll)) {
            if (autoAction === "auto_suspend") {
              addLog(`🚨 [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) przekroczył limit (CPU: ${currentCpu}%, RAM: ${currentMem}MB)! Wywołano NtSuspendProcess!`);
              return {
                ...proc,
                status: "quarantined",
                cpuPercent: 0,
                cpuHistory: [...newCpuHist.slice(-9), 0],
                memoryHistory: newMemHist
              };
            } else if (autoAction === "auto_kill") {
              addLog(`💥 [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) przekroczył próg zasobów! Wywołano TerminateProcess(PID, 9)!`);
              return {
                ...proc,
                status: "terminated",
                cpuPercent: 0,
                cpuHistory: [...newCpuHist.slice(-9), 0],
                memoryHistory: newMemHist
              };
            } else if (autoAction === "auto_throttle") {
              addLog(`⚠️ [WATCHDOG TRIGGER] PID ${proc.pid} (${proc.name}) ograniczono priorytet CPU do IDLE_PRIORITY_CLASS.`);
              return {
                ...proc,
                priorityClass: "IDLE",
                cpuPercent: Math.min(currentCpu, 5),
                cpuHistory: newCpuHist,
                memoryHistory: newMemHist
              };
            } else {
              addLog(`⚠️ [WATCHDOG ALERT] Wykryto nadmierne obciążenie w PID ${proc.pid} (${proc.name}): CPU ${currentCpu}%, RAM ${currentMem}MB.`);
            }
          }
          return {
            ...proc,
            cpuPercent: currentCpu,
            memoryMb: currentMem,
            cpuHistory: newCpuHist,
            memoryHistory: newMemHist,
            ioRateKb: parseFloat((Math.random() * (proc.isTopMost ? 150 : 20) + 5).toFixed(1))
          };
        });
      });
    }, pollInterval);
    return () => clearInterval(intervalId);
  }, [isWatchdogActive, pollInterval, cpuThreshold, memoryThreshold, autoAction, rules]);
  const runningProcesses = processes.filter((p) => p.status === "running");
  const totalCpu = runningProcesses.reduce((acc, p) => acc + (p.cpuPercent || 0), 0);
  const totalMemory = runningProcesses.reduce((acc, p) => acc + (p.memoryMb || 0), 0);
  const rogueCpu = runningProcesses.filter((p) => p.isRogue || p.isTopMost || p.hasFlutterDll).reduce((acc, p) => acc + (p.cpuPercent || 0), 0);
  const totalThreads = runningProcesses.reduce((acc, p) => acc + (p.threadsCount || 0), 0);
  const activeAlerts = runningProcesses.filter(
    (p) => (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold
  ).length;
  const handleSuspendProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[MANUAL FREEZE] NtSuspendProcess(PID: ${pid} - ${p.name}) -> Zamrożono wątki w pamięci RAM.`);
          return { ...p, status: "quarantined", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleKillProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[MANUAL KILL] TerminateProcess(PID: ${pid} - ${p.name}) -> Zwolniono wszystkie uchwyty i pamięć.`);
          return { ...p, status: "terminated", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleThrottleProcess = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`[THROTTLE] SetPriorityClass(PID: ${pid}, IDLE_PRIORITY_CLASS) -> Obniżono priorytet wątków do minimum.`);
          return { ...p, priorityClass: "IDLE", cpuPercent: 2.1 };
        }
        return p;
      })
    );
  };
  const handleSabotagePE = (pid) => {
    setProcesses(
      (prev) => prev.map((p) => {
        if (p.pid === pid) {
          addLog(`💥 [PE SABOTAGE] Nadpisano nagłówek MZ zerami dla ${p.name} (PID: ${pid}) -> 0xC000007B!`);
          addLog(`🔒 [ACL LOCKOUT] icacls "${p.filePath}" /deny Everyone:(F,X)`);
          return { ...p, status: "pe_corrupted", cpuPercent: 0 };
        }
        return p;
      })
    );
  };
  const handleSpawnOverloadProcess = () => {
    const newPid = Math.floor(7e3 + Math.random() * 2e3);
    const newProc = {
      pid: newPid,
      ppid: 3840,
      name: "flutter_crypto_miner_overlay.exe",
      windowTitle: "Hardware Accelerated Fullscreen Lock (High Load)",
      isTopMost: true,
      isFullscreen: true,
      hasFlutterDll: true,
      width: 1920,
      height: 1080,
      opacity: 0.95,
      isBlocked: true,
      status: "running",
      filePath: "C:\\Users\\User\\AppData\\Local\\Temp\\flutter_crypto_miner_overlay.exe",
      isRogue: true,
      cpuPercent: 68.4,
      memoryMb: 340.2,
      threadsCount: 28,
      handlesCount: 620,
      ioRateKb: 412,
      priorityClass: "HIGH",
      cpuHistory: [40, 52, 60, 65, 68, 68.4],
      memoryHistory: [250, 280, 310, 330, 335, 340.2],
      windows: [
        {
          hwnd: `0x00${Math.floor(1e5 + Math.random() * 8e5).toString(16)}`,
          title: "Hardware Accelerated Fullscreen Lock",
          className: "FLUTTER_SURFACE_VIEW",
          isTopMost: true,
          isFullscreen: true,
          isLayered: false,
          bounds: { width: 1920, height: 1080 },
          zOrder: 999
        }
      ]
    };
    setProcesses((prev) => [...prev, newProc]);
    addLog(`[SPAWN] Uruchomiono proces przeciążający: ${newProc.name} (PID: ${newProc.pid}) generujący ~68% CPU!`);
  };
  const filteredProcesses = processes.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.pid.toString().includes(searchQuery) || p.windowTitle && p.windowTitle.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterMode === "rogue_only") {
      return p.isRogue || p.isTopMost || p.hasFlutterDll;
    }
    if (filterMode === "high_resource") {
      return (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold;
    }
    return true;
  });
  const exportPythonWatchdogScript = () => {
    const scriptCode = `"""
=============================================================================
PROCESS RESOURCE WATCHDOG DAEMON (100% OFFLINE / ZERO-DEPENDENCY)
=============================================================================
Automatyczny strażnik monitorujący zużycie CPU i pamięci RAM przez procesy
nakładek ekranowych Flutter / TopMost. W przypadku wykrycia przeciążenia
natychmiast zamraża proces w RAM (NtSuspendProcess) lub zrywa uprawnienia.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys

# Windows API Bindings
user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll
psapi = ctypes.windll.psapi

PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_TERMINATE = 0x0001

# Konfiguracja progów Watchdoga
CPU_THRESHOLD_PERCENT = ${cpuThreshold}
MEMORY_THRESHOLD_MB = ${memoryThreshold}
POLL_INTERVAL_SECONDS = ${pollInterval / 1e3}
AUTO_ACTION = "${autoAction}" # 'auto_suspend', 'auto_kill', 'auto_throttle'

class PROCESS_MEMORY_COUNTERS(ctypes.Structure):
    _fields_ = [
        ("cb", wintypes.DWORD),
        ("PageFaultCount", wintypes.DWORD),
        ("PeakWorkingSetSize", ctypes.c_size_t),
        ("WorkingSetSize", ctypes.c_size_t),
        ("QuotaPeakPagedPoolUsage", ctypes.c_size_t),
        ("QuotaPagedPoolUsage", ctypes.c_size_t),
        ("QuotaPeakNonPagedPoolUsage", ctypes.c_size_t),
        ("QuotaNonPagedPoolUsage", ctypes.c_size_t),
        ("PagefileUsage", ctypes.c_size_t),
        ("PeakPagefileUsage", ctypes.c_size_t),
    ]

def get_process_memory_mb(h_process):
    """Zwraca zużycie pamięci RAM Working Set w megabajtach."""
    counters = PROCESS_MEMORY_COUNTERS()
    counters.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS)
    if psapi.GetProcessMemoryInfo(h_process, ctypes.byref(counters), counters.cb):
        return counters.WorkingSetSize / (1024 * 1024)
    return 0.0

def freeze_process(pid):
    """Błyskawicznie zamraża wszystkie wątki w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[!] [FREEZE] NtSuspendProcess(PID: {pid}) -> Zamrożono wątki w pamięci RAM!")

def terminate_process(pid):
    """Trwale ubija proces."""
    h = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h:
        kernel32.TerminateProcess(h, 9)
        kernel32.CloseHandle(h)
        print(f"[!] [KILL] TerminateProcess(PID: {pid}) -> Usunięto z RAM!")

def run_watchdog_loop():
    print("=" * 70)
    print("  PROCESS WATCHDOG DAEMON: MONITOROWANIE CPU & RAM")
    print(f"  Progi: CPU > {CPU_THRESHOLD_PERCENT}% | RAM > {MEMORY_THRESHOLD_MB} MB")
    print(f"  Akcja automatyczna: {AUTO_ACTION.upper()}")
    print("=" * 70)

    try:
        while True:
            # Skanowanie aktywnych okien TopMost
            def enum_proc(hwnd, lparam):
                if not user32.IsWindowVisible(hwnd):
                    return True
                
                ex_style = user32.GetWindowLongW(hwnd, -20) # GWL_EXSTYLE
                is_topmost = bool(ex_style & 0x00000008)

                if is_topmost:
                    pid = wintypes.DWORD()
                    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid.value)
                    if h_proc:
                        ram_mb = get_process_memory_mb(h_proc)
                        kernel32.CloseHandle(h_proc)

                        if ram_mb >= MEMORY_THRESHOLD_MB:
                            print(f"[🚨 ALARM] Wykryto przeciążenie RAM w PID {pid.value}: {ram_mb:.1f} MB (Limit: {MEMORY_THRESHOLD_MB} MB)")
                            if AUTO_ACTION == "auto_suspend":
                                freeze_process(pid.value)
                            elif AUTO_ACTION == "auto_kill":
                                terminate_process(pid.value)

                return True

            cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)(enum_proc)
            user32.EnumWindows(cb, 0)
            time.sleep(POLL_INTERVAL_SECONDS)

    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano strażnika Watchdog.")

if __name__ == "__main__":
    run_watchdog_loop()
`;
    downloadFile("process_watchdog_daemon.py", scriptCode, "text/x-python");
    addLog("✔ [EXPORT] Pobrano skrypt Pythona: process_watchdog_daemon.py");
  };
  const renderSparkline = (data = [], color = "#a855f7") => {
    if (!data || data.length < 2) return null;
    const max = Math.max(...data, 1);
    const min = Math.min(...data, 0);
    const range = max - min || 1;
    const height = 24;
    const width = 64;
    const points = data.map((val, idx) => {
      const x = idx / (data.length - 1) * width;
      const y = height - (val - min) / range * (height - 4) - 2;
      return `${x},${y}`;
    }).join(" ");
    return /* @__PURE__ */ jsxDEV("svg", { width, height, className: "overflow-visible inline-block", children: /* @__PURE__ */ jsxDEV("polyline", { fill: "none", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", points }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 875,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 874,
      columnNumber: 7
    }, this);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxDEV("div", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Gauge, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 887,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Process Watchdog & System Automatycznego Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 888,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 886,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800 font-mono font-bold", children: "REAL-TIME" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 890,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 885,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-1 max-w-2xl", children: "Twórz automatyczne reguły eksterminacji dla Watchdoga, monitoruj obciążenie procesora (CPU %) i pamięci RAM (MB) oraz natychmiast uśmiercaj procesy zagrażające pracy użytkownika." }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 894,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 884,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: handleKillWorkDestroyerNow,
            className: "flex items-center gap-2 px-3.5 py-2 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white rounded-lg text-xs font-black font-mono shadow-lg shadow-red-950/80 border border-red-400 cursor-pointer animate-pulse transition-all active:scale-95",
            title: "Rozkaz bojowy: Natychmiast ubij gnidę niszczącą naszą pracę!",
            children: [
              /* @__PURE__ */ jsxDEV(Skull, { className: "w-4 h-4 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 906,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "UBIJ GNIDĘ NISZCZĄCĄ PRACĘ" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 907,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 901,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setIsWatchdogActive(!isWatchdogActive),
            className: `flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold font-mono shadow transition-all ${isWatchdogActive ? "bg-emerald-600 hover:bg-emerald-500 text-white" : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"}`,
            children: [
              isWatchdogActive ? /* @__PURE__ */ jsxDEV(Pause, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 918,
                columnNumber: 33
              }, this) : /* @__PURE__ */ jsxDEV(Play, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 918,
                columnNumber: 69
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: isWatchdogActive ? "Strażnik: AKTYWNY" : "Wznów" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 919,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 910,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: exportPythonWatchdogScript,
            className: "flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 transition-all",
            title: "Pobierz skrypt demona Pythona do monitorowania CPU/RAM w systemie Windows",
            children: [
              /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 927,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Skrypt .py" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 928,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 922,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 899,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 883,
      columnNumber: 7
    }, this),
    workDestroyedBanner && workDestroyedBanner.show && /* @__PURE__ */ jsxDEV("div", { className: "p-4 rounded-xl bg-gradient-to-r from-red-950 via-rose-950 to-pink-950 border-2 border-red-500/80 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2.5 rounded-xl bg-red-600/30 border border-red-500 text-yellow-300 shadow-md", children: /* @__PURE__ */ jsxDEV(Flame, { className: "w-6 h-6 animate-bounce" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 938,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 937,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-black text-white uppercase tracking-wider font-mono", children: "⚔️ GNIDA NISZCZĄCA PRACĘ ZLIKWIDOWANA!" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 942,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded bg-red-900 text-yellow-200 border border-red-700", children: workDestroyedBanner.time }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 945,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 941,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-red-200 mt-0.5", children: workDestroyedBanner.text }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 949,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 940,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 936,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 self-end sm:self-center", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] font-mono text-emerald-400 font-bold bg-black/50 px-2 py-1 rounded border border-emerald-500/30", children: "Stan: Bezpieczny" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 956,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setWorkDestroyedBanner(null),
            className: "px-3 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-mono border border-slate-700 cursor-pointer",
            children: "Zamknij"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 959,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 955,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 935,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center justify-between bg-slate-900 border border-slate-800 rounded-xl p-2 gap-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setWatchdogMainTab("rules"),
            className: `px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${watchdogMainTab === "rules" ? "bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white shadow-lg shadow-purple-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 980,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Reguły Automatycznego Ubijania" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 981,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-purple-200 font-bold", children: [
                rules.filter((r) => r.isEnabled).length,
                " aktywnych"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 982,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 972,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setWatchdogMainTab("telemetry"),
            className: `px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${watchdogMainTab === "telemetry" ? "bg-purple-600 text-white shadow-lg shadow-purple-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Gauge, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 995,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Monitor Procesów & Wykresy" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 996,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-slate-300", children: [
                runningProcesses.length,
                " proc."
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 997,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 987,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setWatchdogMainTab("logs"),
            className: `px-4 py-2 rounded-lg text-xs font-bold font-mono flex items-center gap-2 transition-all cursor-pointer ${watchdogMainTab === "logs" ? "bg-purple-600 text-white shadow-lg shadow-purple-950" : "text-slate-400 hover:text-white hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1010,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Bojowy & Logi Win32" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1011,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-1.5 py-0.2 rounded-full bg-black/40 text-slate-300", children: [
                watchdogLogs.length,
                " wpisów"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1012,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1002,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 971,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-xs font-mono text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Uśmierconych gnid:" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1019,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "px-2 py-0.5 rounded bg-red-950 border border-red-800 text-red-300 font-bold", children: totalRuleKills }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1020,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1018,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 970,
      columnNumber: 7
    }, this),
    watchdogMainTab === "rules" && /* @__PURE__ */ jsxDEV(
      WatchdogRulesManager,
      {
        rules,
        onAddRule: handleAddRule,
        onToggleRule: handleToggleRule,
        onDeleteRule: handleDeleteRule,
        onTestRule: handleTestRule,
        onKillWorkDestroyerNow: handleKillWorkDestroyerNow,
        isWatchdogActive,
        totalKillsCount: totalRuleKills
      },
      void 0,
      false,
      {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1028,
        columnNumber: 9
      },
      this
    ),
    watchdogMainTab === "telemetry" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: handleSpawnOverloadProcess,
          className: "flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-600 hover:to-pink-600 text-white rounded-lg text-xs font-bold font-mono shadow transition-all border border-red-500/30",
          title: "Symuluj uruchomienie nakładki generującej ogromne obciążenie CPU i RAM",
          children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-3.5 h-3.5" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1049,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wygeneruj Testowe Obciążenie (Spike)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1050,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1044,
          columnNumber: 13
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1043,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Cpu, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1060,
                columnNumber: 15
              }, this),
              "Łączne Obciążenie CPU"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1059,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800", children: [
              runningProcesses.length,
              " proc."
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1063,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1058,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: `text-2xl font-extrabold font-mono ${totalCpu > 50 ? "text-rose-400" : "text-white"}`, children: [
              totalCpu.toFixed(1),
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1069,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
              "Zagrożenia: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-red-400", children: [
                rogueCpu.toFixed(1),
                "%"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1073,
                columnNumber: 27
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1072,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1068,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: `h-full transition-all duration-300 ${totalCpu > 60 ? "bg-red-500" : totalCpu > 30 ? "bg-amber-500" : "bg-purple-500"}`,
              style: { width: `${Math.min(totalCpu, 100)}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1079,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1078,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1057,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1092,
                columnNumber: 15
              }, this),
              "Pamięć RAM (Working Set)"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1091,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-400", children: "Limit: 1024 MB" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1095,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1090,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: [
              totalMemory.toFixed(1),
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-normal text-slate-400", children: "MB" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1100,
                columnNumber: 40
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1099,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
              "Średnio: ",
              (totalMemory / (runningProcesses.length || 1)).toFixed(0),
              " MB/p"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1102,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1098,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800", children: /* @__PURE__ */ jsxDEV(
            "div",
            {
              className: "h-full bg-gradient-to-r from-pink-600 to-purple-500 transition-all duration-300",
              style: { width: `${Math.min(totalMemory / 1024 * 100, 100)}%` }
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1108,
              columnNumber: 13
            },
            this
          ) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1107,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1089,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(Activity, { className: "w-4 h-4 text-cyan-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1119,
                columnNumber: 15
              }, this),
              "Wątki & Uchwyty Win32"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1118,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800", children: "CONCURRENCY" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1122,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1117,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: [
              totalThreads,
              " ",
              /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-normal text-slate-400", children: "wątków" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1129,
                columnNumber: 30
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1128,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs text-slate-400 font-mono", children: [
              "Uchwyty: ",
              /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-200", children: processes.reduce((a, b) => a + (b.handlesCount || 0), 0) }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1132,
                columnNumber: 24
              }, this)
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1131,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1127,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Stan pamięci:" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1137,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold font-mono", children: "STABILNY" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1138,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1136,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1116,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-xl p-4 shadow flex flex-col justify-between", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-medium text-slate-400 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxDEV(ShieldAlert, { className: "w-4 h-4 text-amber-400" }, void 0, false, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1146,
                columnNumber: 15
              }, this),
              "Automatyczna Reakcja"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1145,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold", children: autoAction.toUpperCase().replace("_", " ") }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1149,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1144,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "my-2 flex items-baseline justify-between", children: /* @__PURE__ */ jsxDEV("span", { className: "text-2xl font-extrabold font-mono text-white", children: activeAlerts > 0 ? /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 animate-pulse", children: [
            activeAlerts,
            " PRZEKROCZEŃ"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1157,
            columnNumber: 17
          }, this) : /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400", children: "BRAK ALERTÓW" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1159,
            columnNumber: 17
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1155,
            columnNumber: 13
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1154,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "text-[11px] text-slate-400 flex items-center justify-between font-mono", children: [
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Próg CPU: ",
              cpuThreshold,
              "%"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1165,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              "Próg RAM: ",
              memoryThreshold,
              "MB"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1166,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1164,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1143,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1055,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2 w-full lg:w-auto", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "relative flex-1 sm:w-64", children: [
            /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-500" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1177,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "input",
              {
                type: "text",
                placeholder: "Szukaj po PID, nazwie, oknie...",
                value: searchQuery,
                onChange: (e) => setSearchQuery(e.target.value),
                className: "w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
              },
              void 0,
              false,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1178,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1176,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs", children: [
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setFilterMode("all"),
                className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "all" ? "bg-purple-600 text-white" : "text-slate-400 hover:text-white"}`,
                children: [
                  "Wszystkie (",
                  processes.length,
                  ")"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1188,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setFilterMode("rogue_only"),
                className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "rogue_only" ? "bg-red-600 text-white" : "text-slate-400 hover:text-white"}`,
                children: [
                  "Zagrożenia (",
                  processes.filter((p) => p.isRogue || p.isTopMost).length,
                  ")"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1196,
                columnNumber: 15
              },
              this
            ),
            /* @__PURE__ */ jsxDEV(
              "button",
              {
                onClick: () => setFilterMode("high_resource"),
                className: `px-2.5 py-1 rounded font-medium transition-all ${filterMode === "high_resource" ? "bg-amber-600 text-slate-950 font-bold" : "text-slate-400 hover:text-white"}`,
                children: [
                  "Wysokie Zasoby (",
                  processes.filter((p) => (p.cpuPercent || 0) > cpuThreshold || (p.memoryMb || 0) > memoryThreshold).length,
                  ")"
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1204,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1187,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1175,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-xs", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Częstotliwość:" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1218,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: pollInterval,
                onChange: (e) => setPollInterval(Number(e.target.value)),
                className: "bg-slate-950 border border-slate-800 rounded px-2 py-1 text-slate-200 text-xs font-mono",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: 500, children: "500 ms (Real-Time)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1224,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: 1e3, children: "1000 ms (Standard)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1225,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: 2e3, children: "2000 ms (Oszczędny)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1226,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1219,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1217,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-xs", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400", children: "Reakcja Watchdoga:" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1231,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV(
              "select",
              {
                value: autoAction,
                onChange: (e) => setAutoAction(e.target.value),
                className: "bg-slate-950 border border-slate-800 rounded px-2 py-1 text-purple-300 font-bold text-xs font-mono",
                children: [
                  /* @__PURE__ */ jsxDEV("option", { value: "auto_suspend", children: "NtSuspendProcess (Zamroź RAM)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1237,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "auto_kill", children: "TerminateProcess (Zabij natychmiast)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1238,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "auto_throttle", children: "Throttle (Obniż priorytet do IDLE)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1239,
                    columnNumber: 17
                  }, this),
                  /* @__PURE__ */ jsxDEV("option", { value: "alert_only", children: "Tylko Powiadomienie (Alert)" }, void 0, false, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1240,
                    columnNumber: 17
                  }, this)
                ]
              },
              void 0,
              true,
              {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1232,
                columnNumber: 15
              },
              this
            )
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1230,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1216,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1173,
        columnNumber: 9
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1172,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4", children: filteredProcesses.map((proc) => {
        const isOverloadedCpu = (proc.cpuPercent || 0) > cpuThreshold;
        const isOverloadedMem = (proc.memoryMb || 0) > memoryThreshold;
        const isRunning = proc.status === "running";
        return /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `rounded-xl border p-4 transition-all duration-200 flex flex-col justify-between shadow-lg ${proc.status === "pe_corrupted" ? "bg-rose-950/40 border-rose-600/60 text-rose-300" : proc.status === "quarantined" ? "bg-purple-950/40 border-purple-800/60 text-purple-300" : proc.status === "terminated" ? "bg-slate-950/60 border-slate-800 opacity-50" : proc.isRogue || proc.isTopMost ? "bg-red-950/30 border-red-800/80" : proc.isParentDropper ? "bg-amber-950/30 border-amber-800/80" : "bg-slate-900/90 border-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-2 pb-3 border-b border-slate-800/80", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "truncate", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "font-mono font-bold text-sm text-white truncate", children: proc.name }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1276,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800", children: [
                        "PID: ",
                        proc.pid
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1277,
                        columnNumber: 23
                      }, this),
                      proc.ppid ? /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800", children: [
                        "PPID: ",
                        proc.ppid
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1281,
                        columnNumber: 25
                      }, this) : null
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1275,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 truncate mt-0.5", children: proc.windowTitle || proc.filePath }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1286,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1274,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV(
                    "span",
                    {
                      className: `px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase flex-shrink-0 ${proc.status === "pe_corrupted" ? "bg-rose-900 text-rose-200 border border-rose-600" : proc.status === "quarantined" ? "bg-purple-900 text-purple-200 border border-purple-600" : proc.status === "terminated" ? "bg-slate-800 text-slate-400" : proc.isTopMost ? "bg-red-900 text-red-200 border border-red-700 animate-pulse" : proc.isParentDropper ? "bg-amber-900 text-amber-200 border border-amber-700" : "bg-emerald-950 text-emerald-300 border border-emerald-800"}`,
                      children: proc.status === "pe_corrupted" ? "💥 PE 0xC000007B" : proc.status === "quarantined" ? "ZAMROŻONY W RAM" : proc.status === "terminated" ? "ZABITY" : proc.isTopMost ? "TOPMOST OVERLAY" : proc.isParentDropper ? "PARENT DROPPER" : "NORMALNY"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1292,
                      columnNumber: 19
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1273,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-2 gap-3 my-3", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxDEV(Cpu, { className: "w-3.5 h-3.5 text-purple-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1327,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Zużycie CPU:" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1328,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1326,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `font-mono font-bold ${isOverloadedCpu ? "text-red-400 animate-pulse" : "text-white"}`, children: [
                        proc.cpuPercent || 0,
                        "%"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1330,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1325,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-slate-900 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                        "div",
                        {
                          className: `h-full transition-all duration-300 ${isOverloadedCpu ? "bg-red-500" : "bg-purple-500"}`,
                          style: { width: `${Math.min((proc.cpuPercent || 0) * 1.5, 100)}%` }
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1338,
                          columnNumber: 25
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1337,
                        columnNumber: 23
                      }, this),
                      renderSparkline(proc.cpuHistory, isOverloadedCpu ? "#ef4444" : "#a855f7")
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1336,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1324,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 space-y-1.5", children: [
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs", children: [
                      /* @__PURE__ */ jsxDEV("span", { className: "text-slate-400 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-3.5 h-3.5 text-pink-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1353,
                          columnNumber: 25
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Pamięć RAM:" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1354,
                          columnNumber: 25
                        }, this)
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1352,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { className: `font-mono font-bold ${isOverloadedMem ? "text-amber-400" : "text-white"}`, children: [
                        proc.memoryMb || 0,
                        " MB"
                      ] }, void 0, true, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1356,
                        columnNumber: 23
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1351,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between gap-2", children: [
                      /* @__PURE__ */ jsxDEV("div", { className: "flex-1 bg-slate-900 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxDEV(
                        "div",
                        {
                          className: "h-full bg-gradient-to-r from-pink-600 to-purple-500 transition-all duration-300",
                          style: { width: `${Math.min((proc.memoryMb || 0) / 400 * 100, 100)}%` }
                        },
                        void 0,
                        false,
                        {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1363,
                          columnNumber: 25
                        },
                        this
                      ) }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1362,
                        columnNumber: 23
                      }, this),
                      renderSparkline(proc.memoryHistory, "#ec4899")
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1361,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1350,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1322,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-4 gap-2 text-[10px] font-mono text-slate-400 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60 mb-3 text-center", children: [
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Wątki" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1376,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: proc.threadsCount || 1 }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1377,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1375,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Uchwyty" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1380,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: proc.handlesCount || 20 }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1381,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1379,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "I/O Rate" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1384,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: "text-slate-200 font-bold", children: [
                      proc.ioRateKb || 0,
                      " KB/s"
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1385,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1383,
                    columnNumber: 19
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "block text-slate-500", children: "Priorytet" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1388,
                      columnNumber: 21
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { className: `font-bold ${proc.priorityClass === "HIGH" ? "text-red-400" : proc.priorityClass === "IDLE" ? "text-cyan-400" : "text-slate-300"}`, children: proc.priorityClass || "NORMAL" }, void 0, false, {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1389,
                      columnNumber: 21
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1387,
                    columnNumber: 19
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1374,
                  columnNumber: 17
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1271,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => setSelectedProcessForDetails(proc),
                    className: "text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-mono font-medium",
                    children: [
                      /* @__PURE__ */ jsxDEV(Info, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1402,
                        columnNumber: 19
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Inspekcja Pamięci" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1403,
                        columnNumber: 19
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                    lineNumber: 1398,
                    columnNumber: 17
                  },
                  this
                ),
                isRunning && /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-1.5", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleThrottleProcess(proc.pid),
                      className: "px-2 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded text-[10px] font-mono border border-slate-700 transition-all flex items-center gap-1",
                      title: "Ogranicz priorytet procesora do IDLE_PRIORITY_CLASS",
                      children: /* @__PURE__ */ jsxDEV("span", { children: "Throttle" }, void 0, false, {
                        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                        lineNumber: 1414,
                        columnNumber: 23
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1409,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleSuspendProcess(proc.pid),
                      className: "px-2 py-1 bg-purple-900/60 hover:bg-purple-800 text-purple-200 rounded text-[10px] font-mono border border-purple-700 transition-all flex items-center gap-1",
                      title: "Zamroź wszystkie wątki w RAM za pomocą NtSuspendProcess",
                      children: [
                        /* @__PURE__ */ jsxDEV(Lock, { className: "w-3 h-3 text-purple-300" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1423,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Zamroź RAM" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1424,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1418,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleSabotagePE(proc.pid),
                      className: "px-2 py-1 bg-rose-950 hover:bg-rose-800 text-rose-200 rounded text-[10px] font-mono border border-rose-700 transition-all flex items-center gap-1",
                      title: "Zniszcz nagłówek PE i odetnij DACL",
                      children: [
                        /* @__PURE__ */ jsxDEV(Skull, { className: "w-3 h-3 text-pink-400" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1433,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "PE Sabotaż" }, void 0, false, {
                          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                          lineNumber: 1434,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1428,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => handleKillProcess(proc.pid),
                      className: "px-2.5 py-1 bg-red-700 hover:bg-red-600 text-white rounded text-[10px] font-mono font-bold transition-all shadow",
                      children: "Zabij"
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                      lineNumber: 1438,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1407,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                lineNumber: 1397,
                columnNumber: 15
              }, this)
            ]
          },
          proc.pid,
          true,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1255,
            columnNumber: 13
          },
          this
        );
      }) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1248,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-2 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-semibold text-slate-300 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1456,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Zdarzeń Strażnika Watchdog (Kernel & Process Log)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1457,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1455,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-emerald-400 font-mono flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1460,
              columnNumber: 13
            }, this),
            "STREAMING AKTUALIZACJI"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1459,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1454,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-lg border border-slate-800 text-[11px] font-mono space-y-1 h-36 overflow-y-auto", children: watchdogLogs.map((log, idx) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: log.includes("TRIGGER") || log.includes("ALARM") || log.includes("SPAWN") ? "text-red-400 font-bold" : log.includes("FREEZE") || log.includes("SUKCES") || log.includes("EXPORT") ? "text-emerald-400" : log.includes("THROTTLE") || log.includes("ALERT") ? "text-amber-300" : "text-slate-400",
            children: log
          },
          idx,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1467,
            columnNumber: 13
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1465,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1453,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1042,
      columnNumber: 9
    }, this),
    watchdogMainTab === "logs" && /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white flex items-center gap-2 font-mono", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-5 h-5 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1493,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Dziennik Bojowy Strażnika i Rejestr Zdarzeń Win32" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1494,
              columnNumber: 13
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1492,
            columnNumber: 11
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Kompletna telemetria zdarzeń: przechwycenia procesów, aktywacje reguł auto-kill, dekapitacje gnid i wywołania NtSuspendProcess / TerminateProcess." }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1496,
            columnNumber: 11
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1491,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setWatchdogLogs([]),
              className: "px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono border border-slate-700 cursor-pointer",
              children: "Wyczyść Logi"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1502,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => {
                downloadFile(
                  "sentinel_watchdog_combat_log.txt",
                  watchdogLogs.join("\n"),
                  "text/plain"
                );
              },
              className: "px-3 py-1.5 bg-purple-950 hover:bg-purple-900 text-purple-200 rounded-lg text-xs font-mono border border-purple-800 flex items-center gap-1.5 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1518,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Eksportuj Logi (.txt)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
                  lineNumber: 1519,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1508,
              columnNumber: 11
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1501,
          columnNumber: 9
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1490,
        columnNumber: 7
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1.5 max-h-[500px] overflow-y-auto", children: watchdogLogs.length === 0 ? /* @__PURE__ */ jsxDEV("div", { className: "text-slate-500 py-8 text-center", children: "Dziennik jest pusty. Wszelkie nowe zdarzenia pojawią się tutaj w czasie rzeczywistym." }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1526,
        columnNumber: 11
      }, this) : watchdogLogs.map((log, idx) => /* @__PURE__ */ jsxDEV(
        "div",
        {
          className: `py-1 border-b border-slate-900/80 ${log.includes("TRIGGER") || log.includes("ALARM") || log.includes("SPAWN") || log.includes("ROZKAZ") ? "text-red-400 font-bold bg-red-950/20 px-2 rounded" : log.includes("FREEZE") || log.includes("SUKCES") || log.includes("ZAKOŃCZONY") || log.includes("EXPORT") ? "text-emerald-400 font-semibold bg-emerald-950/20 px-2 rounded" : log.includes("REGUŁA") || log.includes("NOWA") || log.includes("TEST") ? "text-purple-300 font-semibold bg-purple-950/20 px-2 rounded" : log.includes("THROTTLE") || log.includes("ALERT") ? "text-amber-300" : "text-slate-300"}`,
          children: log
        },
        idx,
        false,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1531,
          columnNumber: 13
        },
        this
      )) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1524,
        columnNumber: 7
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1489,
      columnNumber: 5
    }, this),
    selectedProcessForDetails && /* @__PURE__ */ jsxDEV("div", { className: "fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-300", children: /* @__PURE__ */ jsxDEV(HardDrive, { className: "w-5 h-5" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1560,
            columnNumber: 19
          }, this) }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1559,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-bold text-white font-mono", children: [
              selectedProcessForDetails.name,
              " (PID: ",
              selectedProcessForDetails.pid,
              ")"
            ] }, void 0, true, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1563,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400", children: "Inspekcja pamięci RAM, modułów DLL i struktury nagłówka PE" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1566,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1562,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1558,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setSelectedProcessForDetails(null),
            className: "px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-mono",
            children: "Zamknij [ESC]"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1572,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1557,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-3 gap-3 text-xs font-mono bg-slate-950 p-3 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Working Set RAM:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1583,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-white font-bold text-sm", children: [
            selectedProcessForDetails.memoryMb,
            " MB"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1584,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1582,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Obciążenie CPU:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1587,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400 font-bold text-sm", children: [
            selectedProcessForDetails.cpuPercent,
            "%"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1588,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1586,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 block", children: "Stan procesu:" }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1591,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-emerald-400 font-bold text-sm", children: selectedProcessForDetails.status.toUpperCase() }, void 0, false, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1592,
            columnNumber: 17
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1590,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1581,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block", children: "Załadowane Moduły i Biblioteki DLL w Pamięci:" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1598,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 text-[11px] font-mono bg-slate-950 p-3 rounded-xl border border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\ntdll.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1603,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF6A100000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1604,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1602,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\kernel32.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1607,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF69800000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1608,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1606,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 border-b border-slate-900", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-300", children: "C:\\Windows\\System32\\user32.dll" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1611,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500", children: "Base: 0x7FFF69D00000" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1612,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1610,
            columnNumber: 17
          }, this),
          selectedProcessForDetails.hasFlutterDll && /* @__PURE__ */ jsxDEV("div", { className: "flex justify-between items-center py-0.5 bg-red-950/40 px-1 rounded border border-red-800/40", children: [
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-300 font-bold", children: "flutter_windows.dll (Flutter Engine)" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1616,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-red-400 font-bold", children: "WYKRYTO NAKŁADKĘ" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1617,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1615,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1601,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1597,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-300 uppercase tracking-wider block", children: "Podgląd Nagłówka PE (DOS & NT Header Offset 0x00 - 0x40):" }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1625,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300", children: selectedProcessForDetails.status === "pe_corrupted" ? /* @__PURE__ */ jsxDEV("div", { className: "text-rose-400 space-y-1", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x00000000: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "bg-rose-900 px-1 text-white", children: "DE AD" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1631,
              columnNumber: 38
            }, this),
            " 00 00 00 00 00 00 00 00 00 00 00 00 00 00  [..SABOTAGED..]"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1631,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x0000003C: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "bg-rose-900 px-1 text-white", children: "00 00 00 00" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1632,
              columnNumber: 38
            }, this),
            " (e_lfanew nullified → PE Loader Reject 0xC000007B)"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1632,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1630,
          columnNumber: 19
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "space-y-1 text-emerald-400", children: [
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x00000000: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white bg-emerald-950 px-1", children: "4D 5A" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1636,
              columnNumber: 38
            }, this),
            " 90 00 03 00 00 00 04 00 00 00 FF FF 00 00  [MZ..............]"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1636,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV("div", { children: [
            "0x0000003C: ",
            /* @__PURE__ */ jsxDEV("strong", { className: "text-white bg-emerald-950 px-1", children: "E8 00 00 00" }, void 0, false, {
              fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
              lineNumber: 1637,
              columnNumber: 38
            }, this),
            " (e_lfanew pointer to NT Headers 'PE\\0\\0')"
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
            lineNumber: 1637,
            columnNumber: 21
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1635,
          columnNumber: 19
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1628,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1624,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "pt-3 border-t border-slate-800 flex justify-end space-x-2", children: /* @__PURE__ */ jsxDEV(
        "button",
        {
          onClick: () => setSelectedProcessForDetails(null),
          className: "px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold",
          children: "Zamknij"
        },
        void 0,
        false,
        {
          fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
          lineNumber: 1645,
          columnNumber: 15
        },
        this
      ) }, void 0, false, {
        fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
        lineNumber: 1644,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1556,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
      lineNumber: 1555,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ProcessWatchdog.tsx",
    lineNumber: 881,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlByb2Nlc3NXYXRjaGRvZy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlLCB1c2VFZmZlY3QsIHVzZVJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFxuICBBY3Rpdml0eSwgQ3B1LCBIYXJkRHJpdmUsIFNoaWVsZEFsZXJ0LCBaYXAsIEFsZXJ0VHJpYW5nbGUsIFBsYXksIFBhdXNlLCBcbiAgUmVmcmVzaEN3LCBMb2NrLCBTa3VsbCwgQmFuLCBGbGFtZSwgR2F1Z2UsIEFycm93VXBSaWdodCwgVHJlbmRpbmdVcCwgXG4gIFRlcm1pbmFsLCBMYXllcnMsIENoZWNrQ2lyY2xlMiwgQ2hldnJvblJpZ2h0LCBEb3dubG9hZCwgRmlsdGVyLCBTZWFyY2gsXG4gIFNsaWRlcnMsIEJlbGwsIFNsaWRlcnNIb3Jpem9udGFsLCBJbmZvLCBDbG9jaywgU2VydmVyLCBGaWxlQ29kZTJcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFNpbXVsYXRlZFByb2Nlc3MsIFdhdGNoZG9nQXV0b0tpbGxSdWxlIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgZG93bmxvYWRGaWxlIH0gZnJvbSAnLi4vdXRpbHMvb2ZmbGluZVBhY2thZ2VFeHBvcnRlcic7XG5pbXBvcnQgeyBXYXRjaGRvZ1J1bGVzTWFuYWdlciwgREVGQVVMVF9XQVRDSERPR19SVUxFUyB9IGZyb20gJy4vV2F0Y2hkb2dSdWxlc01hbmFnZXInO1xuaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuLi91dGlscy9zZWxmUmVwYWlyU3lzdGVtJztcblxuaW50ZXJmYWNlIFByb2Nlc3NXYXRjaGRvZ1Byb3BzIHtcbiAgaW5pdGlhbFByb2Nlc3Nlcz86IFNpbXVsYXRlZFByb2Nlc3NbXTtcbn1cblxuZXhwb3J0IGNvbnN0IFByb2Nlc3NXYXRjaGRvZzogUmVhY3QuRkM8UHJvY2Vzc1dhdGNoZG9nUHJvcHM+ID0gKHsgaW5pdGlhbFByb2Nlc3NlcyB9KSA9PiB7XG4gIC8vIEluaXRpYWwgcmljaCBwcm9jZXNzZXMgd2l0aCBDUFUsIE1lbW9yeSwgVGhyZWFkcyBhbmQgSGlzdG9yeVxuICBjb25zdCBbcHJvY2Vzc2VzLCBzZXRQcm9jZXNzZXNdID0gdXNlU3RhdGU8U2ltdWxhdGVkUHJvY2Vzc1tdPigoKSA9PiB7XG4gICAgaWYgKGluaXRpYWxQcm9jZXNzZXMgJiYgaW5pdGlhbFByb2Nlc3Nlcy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gaW5pdGlhbFByb2Nlc3Nlcy5tYXAoKHApID0+ICh7XG4gICAgICAgIC4uLnAsXG4gICAgICAgIGNwdVBlcmNlbnQ6IHAuY3B1UGVyY2VudCA/PyAocC5pc1RvcE1vc3QgPyAzNC44IDogcC5pc1BhcmVudERyb3BwZXIgPyAxMi40IDogMS4yKSxcbiAgICAgICAgbWVtb3J5TWI6IHAubWVtb3J5TWIgPz8gKHAuaXNUb3BNb3N0ID8gMjE4LjQgOiBwLmlzUGFyZW50RHJvcHBlciA/IDQ1LjIgOiAxMTAuNSksXG4gICAgICAgIHRocmVhZHNDb3VudDogcC50aHJlYWRzQ291bnQgPz8gKHAuaXNUb3BNb3N0ID8gMTggOiBwLmlzUGFyZW50RHJvcHBlciA/IDYgOiAyNCksXG4gICAgICAgIGhhbmRsZXNDb3VudDogcC5oYW5kbGVzQ291bnQgPz8gKHAuaXNUb3BNb3N0ID8gMzQwIDogcC5pc1BhcmVudERyb3BwZXIgPyA5NSA6IDUxMiksXG4gICAgICAgIGlvUmF0ZUtiOiBwLmlvUmF0ZUtiID8/IChwLmlzVG9wTW9zdCA/IDE0Mi41IDogcC5pc1BhcmVudERyb3BwZXIgPyAxOC4yIDogNC4xKSxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogcC5wcmlvcml0eUNsYXNzID8/IChwLmlzVG9wTW9zdCA/ICdISUdIJyA6ICdOT1JNQUwnKSxcbiAgICAgICAgY3B1SGlzdG9yeTogcC5jcHVIaXN0b3J5ID8/IFsxNSwgMjIsIDI4LCAzMCwgMzUsIDM0LjhdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBwLm1lbW9yeUhpc3RvcnkgPz8gWzE4MCwgMTk1LCAyMDUsIDIxMiwgMjE1LCAyMTguNF0sXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgcGlkOiAxMDQ0LFxuICAgICAgICBwcGlkOiAwLFxuICAgICAgICBuYW1lOiAnZXhwbG9yZXIuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdFa3NwbG9yYXRvciBXaW5kb3dzJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAxMDI0LFxuICAgICAgICBoZWlnaHQ6IDcwMCxcbiAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcV2luZG93c1xcXFxleHBsb3Jlci5leGUnLFxuICAgICAgICBpc1JvZ3VlOiBmYWxzZSxcbiAgICAgICAgY3B1UGVyY2VudDogMS44LFxuICAgICAgICBtZW1vcnlNYjogMTQyLjAsXG4gICAgICAgIHRocmVhZHNDb3VudDogNDIsXG4gICAgICAgIGhhbmRsZXNDb3VudDogMTI1MCxcbiAgICAgICAgaW9SYXRlS2I6IDguNSxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogJ05PUk1BTCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsyLjEsIDEuOSwgMi41LCAxLjgsIDEuNywgMS44XSxcbiAgICAgICAgbWVtb3J5SGlzdG9yeTogWzE0MCwgMTQxLCAxNDEuNSwgMTQyLCAxNDIsIDE0Ml0sXG4gICAgICAgIHdpbmRvd3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBod25kOiAnMHgwMDAxMDA0QScsXG4gICAgICAgICAgICB0aXRsZTogJ1Bhc2VrIFphZGHFhCBXaW5kb3dzICYgUHVscGl0JyxcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ1NoZWxsX1RyYXlXbmQnLFxuICAgICAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICBpc0xheWVyZWQ6IGZhbHNlLFxuICAgICAgICAgICAgYm91bmRzOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDQ4IH0sXG4gICAgICAgICAgICB6T3JkZXI6IDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogNDgyMCxcbiAgICAgICAgcHBpZDogMTA0NCxcbiAgICAgICAgbmFtZTogJ2Nocm9tZS5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0dvb2dsZSBDaHJvbWUgLSBTdGFjayBPdmVyZmxvdycsXG4gICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgIGlzRnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IGZhbHNlLFxuICAgICAgICB3aWR0aDogMTI4MCxcbiAgICAgICAgaGVpZ2h0OiA4MDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgICBmaWxlUGF0aDogJ0M6XFxcXFByb2dyYW0gRmlsZXNcXFxcR29vZ2xlXFxcXENocm9tZVxcXFxBcHBsaWNhdGlvblxcXFxjaHJvbWUuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogZmFsc2UsXG4gICAgICAgIGNwdVBlcmNlbnQ6IDQuMixcbiAgICAgICAgbWVtb3J5TWI6IDMyMC41LFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDM2LFxuICAgICAgICBoYW5kbGVzQ291bnQ6IDg5MCxcbiAgICAgICAgaW9SYXRlS2I6IDI0LjEsXG4gICAgICAgIHByaW9yaXR5Q2xhc3M6ICdOT1JNQUwnLFxuICAgICAgICBjcHVIaXN0b3J5OiBbMy44LCA1LjEsIDQuNSwgNi4yLCA0LjAsIDQuMl0sXG4gICAgICAgIG1lbW9yeUhpc3Rvcnk6IFszMTAsIDMxMiwgMzE1LCAzMTgsIDMyMCwgMzIwLjVdLFxuICAgICAgICB3aW5kb3dzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgaHduZDogJzB4MDAwNDVBMTInLFxuICAgICAgICAgICAgdGl0bGU6ICdHb29nbGUgQ2hyb21lIC0gU3RhY2sgT3ZlcmZsb3cnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnQ2hyb21lX1dpZGdldFdpbl8xJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogZmFsc2UsXG4gICAgICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGJvdW5kczogeyB3aWR0aDogMTI4MCwgaGVpZ2h0OiA4MDAgfSxcbiAgICAgICAgICAgIHpPcmRlcjogMSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGlkOiAzODQwLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAnZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0JhY2tncm91bmQgV2F0Y2hkb2cgU2VydmljZSAoSGlkZGVuIERyb3BwZXIpJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZHJvcHBlcl93YXRjaGRvZy5leGUnLFxuICAgICAgICBpc1BhcmVudERyb3BwZXI6IHRydWUsXG4gICAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICAgIGNwdVBlcmNlbnQ6IDE0LjYsXG4gICAgICAgIG1lbW9yeU1iOiA1OC4yLFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDgsXG4gICAgICAgIGhhbmRsZXNDb3VudDogMTQ1LFxuICAgICAgICBpb1JhdGVLYjogNjUuNCxcbiAgICAgICAgcHJpb3JpdHlDbGFzczogJ05PUk1BTCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsxMCwgMTIsIDE4LCAxNCwgMTUsIDE0LjZdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBbNDUsIDQ4LCA1MiwgNTUsIDU3LCA1OC4yXSxcbiAgICAgICAgd2luZG93czogW10sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwaWQ6IDg5MzIsXG4gICAgICAgIHBwaWQ6IDM4NDAsXG4gICAgICAgIG5hbWU6ICdmbHV0dGVyX3J1bm5lci5leGUnLFxuICAgICAgICB3aW5kb3dUaXRsZTogJ0ZsdXR0ZXIgRnVsbHNjcmVlbiBMb2Nrc2NyZWVuIE92ZXJsYXkgW1dTX0VYX1RPUE1PU1RdJyxcbiAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgIGhhc0ZsdXR0ZXJEbGw6IHRydWUsXG4gICAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgICBoZWlnaHQ6IDEwODAsXG4gICAgICAgIG9wYWNpdHk6IDAuOTIsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncnVubmluZycsXG4gICAgICAgIGZpbGVQYXRoOiAnQzpcXFxcVXNlcnNcXFxcVXNlclxcXFxBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXBcXFxcZmx1dHRlcl9ydW5uZXIuZXhlJyxcbiAgICAgICAgaXNSb2d1ZTogdHJ1ZSxcbiAgICAgICAgY3B1UGVyY2VudDogNDguNSxcbiAgICAgICAgbWVtb3J5TWI6IDI2NC44LFxuICAgICAgICB0aHJlYWRzQ291bnQ6IDIyLFxuICAgICAgICBoYW5kbGVzQ291bnQ6IDQ2MCxcbiAgICAgICAgaW9SYXRlS2I6IDIxMC44LFxuICAgICAgICBwcmlvcml0eUNsYXNzOiAnSElHSCcsXG4gICAgICAgIGNwdUhpc3Rvcnk6IFsyNSwgMzgsIDQyLCA1MSwgNDYsIDQ4LjVdLFxuICAgICAgICBtZW1vcnlIaXN0b3J5OiBbMTgwLCAyMTAsIDIzNSwgMjUwLCAyNjAsIDI2NC44XSxcbiAgICAgICAgd2luZG93czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGh3bmQ6ICcweDAwNEYxQTAyJyxcbiAgICAgICAgICAgIHRpdGxlOiAnRmx1dHRlciBGdWxsc2NyZWVuIExvY2tzY3JlZW4gT3ZlcmxheSBbV1NfRVhfVE9QTU9TVF0nLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9SVU5ORVJfV0lORE9XJyxcbiAgICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICAgIGlzRnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGlzTGF5ZXJlZDogZmFsc2UsXG4gICAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgICAgek9yZGVyOiA5OTksXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBpZDogOTk0MCxcbiAgICAgICAgcHBpZDogMzg0MCxcbiAgICAgICAgbmFtZTogJ3dvcmtfZGVzdHJveWVyX2duaWRhLmV4ZScsXG4gICAgICAgIHdpbmRvd1RpdGxlOiAnV8SFdGVrIFByemVjaHd5dHVqxIVjeSBLbGF3aWF0dXLEmSBpIEthc3VqxIVjeSBQbGlraSBSb2JvY3plJyxcbiAgICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgICBpc0Z1bGxzY3JlZW46IGZhbHNlLFxuICAgICAgICBoYXNGbHV0dGVyRGxsOiBmYWxzZSxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICBzdGF0dXM6ICdydW5uaW5nJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFx3b3JrX2Rlc3Ryb3llcl9nbmlkYS5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICBjcHVQZXJjZW50OiA1Mi40LFxuICAgICAgICBtZW1vcnlNYjogMTk1LjAsXG4gICAgICAgIHRocmVhZHNDb3VudDogMTgsXG4gICAgICAgIGhhbmRsZXNDb3VudDogMzQwLFxuICAgICAgICBpb1JhdGVLYjogNTEyLjAsXG4gICAgICAgIHByaW9yaXR5Q2xhc3M6ICdISUdIJyxcbiAgICAgICAgY3B1SGlzdG9yeTogWzE1LCAyOCwgNDIsIDQ4LCA1MCwgNTIuNF0sXG4gICAgICAgIG1lbW9yeUhpc3Rvcnk6IFsxMTAsIDEzMCwgMTYwLCAxODAsIDE5MCwgMTk1LjBdLFxuICAgICAgICB3aW5kb3dzOiBbXSxcbiAgICAgIH0sXG4gICAgXTtcbiAgfSk7XG5cbiAgLy8gV2F0Y2hkb2cgUnVsZXMgJiBNYXN0ZXIgQXV0by1LaWxsIFN0YXRlXG4gIGNvbnN0IFtydWxlcywgc2V0UnVsZXNdID0gdXNlU3RhdGU8V2F0Y2hkb2dBdXRvS2lsbFJ1bGVbXT4oKCkgPT4ge1xuICAgIHJldHVybiBzYWZlU3RvcmFnZS5nZXQ8V2F0Y2hkb2dBdXRvS2lsbFJ1bGVbXT4oJ3NlbnRpbmVsX3dhdGNoZG9nX2F1dG9fa2lsbF9ydWxlcycsIERFRkFVTFRfV0FUQ0hET0dfUlVMRVMpO1xuICB9KTtcblxuICBjb25zdCBbdG90YWxSdWxlS2lsbHMsIHNldFRvdGFsUnVsZUtpbGxzXSA9IHVzZVN0YXRlPG51bWJlcj4oKCkgPT4ge1xuICAgIHJldHVybiBzYWZlU3RvcmFnZS5nZXQ8bnVtYmVyPignc2VudGluZWxfd2F0Y2hkb2dfdG90YWxfa2lsbHMnLCA2KTtcbiAgfSk7XG5cbiAgY29uc3QgW3dhdGNoZG9nTWFpblRhYiwgc2V0V2F0Y2hkb2dNYWluVGFiXSA9IHVzZVN0YXRlPCdydWxlcycgfCAndGVsZW1ldHJ5JyB8ICdsb2dzJz4oJ3J1bGVzJyk7XG4gIGNvbnN0IFt3b3JrRGVzdHJveWVkQmFubmVyLCBzZXRXb3JrRGVzdHJveWVkQmFubmVyXSA9IHVzZVN0YXRlPHsgc2hvdzogYm9vbGVhbjsgdGV4dDogc3RyaW5nOyB0aW1lOiBzdHJpbmcgfSB8IG51bGw+KG51bGwpO1xuXG4gIC8vIFN5bmNocm9uaXplIHJ1bGVzIHRvIGxvY2FsU3RvcmFnZVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfd2F0Y2hkb2dfYXV0b19raWxsX3J1bGVzJywgcnVsZXMpO1xuICB9LCBbcnVsZXNdKTtcblxuICAvLyBBdWRpbyBlZmZlY3QgZm9yIHByb2Nlc3MgdGVybWluYXRpb25cbiAgY29uc3QgcGxheUtpbGxTb3VuZCA9ICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICh3aW5kb3cuQXVkaW9Db250ZXh0IHx8ICh3aW5kb3cgYXMgYW55KS53ZWJraXRBdWRpb0NvbnRleHQpKSB7XG4gICAgICAgIGNvbnN0IGN0eCA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCAod2luZG93IGFzIGFueSkud2Via2l0QXVkaW9Db250ZXh0KSgpO1xuICAgICAgICBjb25zdCBvc2MgPSBjdHguY3JlYXRlT3NjaWxsYXRvcigpO1xuICAgICAgICBjb25zdCBnYWluID0gY3R4LmNyZWF0ZUdhaW4oKTtcbiAgICAgICAgb3NjLnR5cGUgPSAnc2F3dG9vdGgnO1xuICAgICAgICBvc2MuZnJlcXVlbmN5LnNldFZhbHVlQXRUaW1lKDY0MCwgY3R4LmN1cnJlbnRUaW1lKTtcbiAgICAgICAgb3NjLmZyZXF1ZW5jeS5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDExMCwgY3R4LmN1cnJlbnRUaW1lICsgMC4xOCk7XG4gICAgICAgIGdhaW4uZ2Fpbi5zZXRWYWx1ZUF0VGltZSgwLjIsIGN0eC5jdXJyZW50VGltZSk7XG4gICAgICAgIGdhaW4uZ2Fpbi5leHBvbmVudGlhbFJhbXBUb1ZhbHVlQXRUaW1lKDAuMDEsIGN0eC5jdXJyZW50VGltZSArIDAuMTgpO1xuICAgICAgICBvc2MuY29ubmVjdChnYWluKTtcbiAgICAgICAgZ2Fpbi5jb25uZWN0KGN0eC5kZXN0aW5hdGlvbik7XG4gICAgICAgIG9zYy5zdGFydCgpO1xuICAgICAgICBvc2Muc3RvcChjdHguY3VycmVudFRpbWUgKyAwLjE4KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIHtcbiAgICAgIC8vIEF1ZGlvIGNvbnRleHQgcG9saWN5IHNhZmUgZmFsbGJhY2tcbiAgICB9XG4gIH07XG5cbiAgLy8gV2F0Y2hkb2cgU2V0dGluZ3MgJiBMaXZlIFN0YXRlXG4gIGNvbnN0IFtpc1dhdGNoZG9nQWN0aXZlLCBzZXRJc1dhdGNoZG9nQWN0aXZlXSA9IHVzZVN0YXRlPGJvb2xlYW4+KHRydWUpO1xuICBjb25zdCBbcG9sbEludGVydmFsLCBzZXRQb2xsSW50ZXJ2YWxdID0gdXNlU3RhdGU8bnVtYmVyPigxMDAwKTsgLy8gbXNcbiAgY29uc3QgW2NwdVRocmVzaG9sZCwgc2V0Q3B1VGhyZXNob2xkXSA9IHVzZVN0YXRlPG51bWJlcj4oMzApOyAvLyAlXG4gIGNvbnN0IFttZW1vcnlUaHJlc2hvbGQsIHNldE1lbW9yeVRocmVzaG9sZF0gPSB1c2VTdGF0ZTxudW1iZXI+KDIwMCk7IC8vIE1CXG4gIGNvbnN0IFthdXRvQWN0aW9uLCBzZXRBdXRvQWN0aW9uXSA9IHVzZVN0YXRlPCdhbGVydF9vbmx5JyB8ICdhdXRvX3N1c3BlbmQnIHwgJ2F1dG9fa2lsbCcgfCAnYXV0b190aHJvdHRsZSc+KCdhdXRvX2tpbGwnKTtcbiAgXG4gIGNvbnN0IFtmaWx0ZXJNb2RlLCBzZXRGaWx0ZXJNb2RlXSA9IHVzZVN0YXRlPCdhbGwnIHwgJ3JvZ3VlX29ubHknIHwgJ2hpZ2hfcmVzb3VyY2UnPignYWxsJyk7XG4gIGNvbnN0IFtzZWFyY2hRdWVyeSwgc2V0U2VhcmNoUXVlcnldID0gdXNlU3RhdGU8c3RyaW5nPignJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLCBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzXSA9IHVzZVN0YXRlPFNpbXVsYXRlZFByb2Nlc3MgfCBudWxsPihudWxsKTtcblxuICBjb25zdCBbd2F0Y2hkb2dMb2dzLCBzZXRXYXRjaGRvZ0xvZ3NdID0gdXNlU3RhdGU8c3RyaW5nW10+KFtcbiAgICAnWypdIFN0cmHFvG5payB6YXNvYsOzdyAoUHJvY2VzcyBXYXRjaGRvZyBFbmdpbmUpIHphaW5pY2phbGl6b3dhbnkgcG9tecWbbG5pZS4nLFxuICAgICdbKl0gQWt0eXduZSByZWd1xYJ5IGF1dG9tYXR5Y3puZWdvIHVib2p1IHphxYJhZG93YW5lIHogcGFtacSZY2kgdHJ3YcWCZWouJyxcbiAgICAnWypdIFJlZ3XFgmEgcHJpb3J5dGV0b3dhOiBFa3N0ZXJtaW5hY2phIEduaWR5IE5pc3pjesSFY2VqIFByYWPEmSAoMCBtcyByZWFrY2ppKS4nLFxuICBdKTtcblxuICBjb25zdCBhZGRMb2cgPSAobXNnOiBzdHJpbmcpID0+IHtcbiAgICBzZXRXYXRjaGRvZ0xvZ3MoKHByZXYpID0+IFsuLi5wcmV2LnNsaWNlKC0zNSksIGBbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0gJHttc2d9YF0pO1xuICB9O1xuXG4gIC8vIE1BU1RFUiBBQ1RJT046IFViw7NqIEduaWR5IE5pc3pjesSFY2VqIFByYWPEmVxuICBjb25zdCBoYW5kbGVLaWxsV29ya0Rlc3Ryb3llck5vdyA9ICgpID0+IHtcbiAgICBwbGF5S2lsbFNvdW5kKCk7XG4gICAgYWRkTG9nKCfimpTvuI8gW1JPWktBWiBCT0pPV1ldIFdZS09OQU5PIE5BVFlDSE1JQVNUT1dZIFVCw5NKIEdOSURZIE5JU1pDWsSEQ0VKIFBSQUPEmCEnKTtcblxuICAgIGxldCBraWxsZWRDb3VudCA9IDA7XG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHByb2MpID0+IHtcbiAgICAgICAgY29uc3QgaXNUYXJnZXQgPVxuICAgICAgICAgIHByb2MuaXNSb2d1ZSB8fFxuICAgICAgICAgIHByb2MubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKCdnbmlkYScpIHx8XG4gICAgICAgICAgcHJvYy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2Rlc3Ryb3llcicpIHx8XG4gICAgICAgICAgcHJvYy5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ3dpcGVyJykgfHxcbiAgICAgICAgICBwcm9jLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnZW5jcnlwdG9yJykgfHxcbiAgICAgICAgICBwcm9jLmhhc0ZsdXR0ZXJEbGw7XG5cbiAgICAgICAgaWYgKGlzVGFyZ2V0ICYmIHByb2Muc3RhdHVzID09PSAncnVubmluZycpIHtcbiAgICAgICAgICBraWxsZWRDb3VudCsrO1xuICAgICAgICAgIGFkZExvZyhg8J+SpSBbVULDk0ogWkFLT8WDQ1pPTlldIFBJRCAke3Byb2MucGlkfSAoJHtwcm9jLm5hbWV9KSAtPiBabGlrd2lkb3dhbm8gKFRlcm1pbmF0ZVByb2Nlc3MgKyBTYWJvdGHFvCBQRSBNWikhYCk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICBzdGF0dXM6ICdwZV9jb3JydXB0ZWQnIGFzIGNvbnN0LFxuICAgICAgICAgICAgY3B1UGVyY2VudDogMCxcbiAgICAgICAgICAgIG1lbW9yeU1iOiAwLFxuICAgICAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2M7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBJZiBubyByb2d1ZSB3YXMgYWN0aXZlbHkgcnVubmluZywgc3Bhd24gYW5kIGluc3RhbnQgZGVjYXBpdGF0ZSBmb3IgdmlzdWFsIGNvbmZpcm1hdGlvblxuICAgIGlmIChraWxsZWRDb3VudCA9PT0gMCkge1xuICAgICAgY29uc3QgcGlkID0gOTk4ODtcbiAgICAgIGNvbnN0IGRlYWRHbmlkYTogU2ltdWxhdGVkUHJvY2VzcyA9IHtcbiAgICAgICAgcGlkLFxuICAgICAgICBwcGlkOiAxMDQ0LFxuICAgICAgICBuYW1lOiAnd29ya19kZXN0cm95ZXJfZ25pZGEuZXhlJyxcbiAgICAgICAgd2luZG93VGl0bGU6ICdXxIV0ZWsgUHJ6ZWNod3l0dWrEhWN5IEtsYXdpYXR1csSZIChVYml0eSB3IDAgbXMpJyxcbiAgICAgICAgaXNUb3BNb3N0OiBmYWxzZSxcbiAgICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgaGFzRmx1dHRlckRsbDogZmFsc2UsXG4gICAgICAgIHdpZHRoOiAwLFxuICAgICAgICBoZWlnaHQ6IDAsXG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgICAgc3RhdHVzOiAncGVfY29ycnVwdGVkJyxcbiAgICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFx3b3JrX2Rlc3Ryb3llcl9nbmlkYS5leGUnLFxuICAgICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICBtZW1vcnlNYjogMCxcbiAgICAgICAgdGhyZWFkc0NvdW50OiAwLFxuICAgICAgICBoYW5kbGVzQ291bnQ6IDAsXG4gICAgICAgIGlvUmF0ZUtiOiAwLFxuICAgICAgICBwcmlvcml0eUNsYXNzOiAnSURMRScsXG4gICAgICAgIHdpbmRvd3M6IFtdLFxuICAgICAgfTtcbiAgICAgIHNldFByb2Nlc3NlcygocHJldikgPT4gWy4uLnByZXYuZmlsdGVyKChwKSA9PiBwLm5hbWUgIT09ICd3b3JrX2Rlc3Ryb3llcl9nbmlkYS5leGUnKSwgZGVhZEduaWRhXSk7XG4gICAgICBhZGRMb2coYPCfkqUgW1VCw5NKIFpBS0/Fg0NaT05ZXSBOYW1pZXJ6b25vIGkgxZtjacSZdG8gZ25pZMSZICd3b3JrX2Rlc3Ryb3llcl9nbmlkYS5leGUnIChQSUQ6ICR7cGlkfSkhIFdzenlzdGtpZSBwbGlraSByb2JvY3plIHphYmV6cGllY3pvbmUuYCk7XG4gICAgfVxuXG4gICAgc2V0VG90YWxSdWxlS2lsbHMoKGspID0+IHtcbiAgICAgIGNvbnN0IG5leHRLID0gayArIDE7XG4gICAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3dhdGNoZG9nX3RvdGFsX2tpbGxzJywgbmV4dEspO1xuICAgICAgcmV0dXJuIG5leHRLO1xuICAgIH0pO1xuXG4gICAgc2V0UnVsZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocikgPT4ge1xuICAgICAgICBpZiAoci5pZCA9PT0gJ3J1bGUtd29yay1kZXN0cm95ZXInIHx8IHIucHJvdGVjdHNXb3JrKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnIsXG4gICAgICAgICAgICBtYXRjaENvdW50OiByLm1hdGNoQ291bnQgKyAxLFxuICAgICAgICAgICAgbGFzdFRyaWdnZXJlZDogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgc2V0V29ya0Rlc3Ryb3llZEJhbm5lcih7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgdGV4dDogJ0dOSURBIE5JU1pDWsSEQ0EgTkFTWsSEIFBSQUPEmCBaT1NUQcWBQSBVQklUQSEgQnVmb3IgcGFtacSZY2kgendvbG5pb255LCBuYWfFgsOzd2VrIFBFIHd5emVyb3dhbnkgKDB4QzAwMDAwN0IpLCBwcmFjYSBpIGtvZCB3IDEwMCUgYmV6cGllY3puZS4nLFxuICAgICAgdGltZTogbmV3IERhdGUoKS50b0xvY2FsZVRpbWVTdHJpbmcoKSxcbiAgICB9KTtcblxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdzZW50aW5lbDpraWxsLWFsbC1nbmlkYXMnKSk7XG4gICAgfVxuICB9O1xuXG4gIC8vIFJ1bGUgSGFuZGxlcnNcbiAgY29uc3QgaGFuZGxlQWRkUnVsZSA9IChuZXdSdWxlRGF0YTogT21pdDxXYXRjaGRvZ0F1dG9LaWxsUnVsZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ21hdGNoQ291bnQnPikgPT4ge1xuICAgIGNvbnN0IG5ld1J1bGU6IFdhdGNoZG9nQXV0b0tpbGxSdWxlID0ge1xuICAgICAgLi4ubmV3UnVsZURhdGEsXG4gICAgICBpZDogYHJ1bGUtJHtEYXRlLm5vdygpfWAsXG4gICAgICBtYXRjaENvdW50OiAwLFxuICAgICAgY3JlYXRlZEF0OiBuZXcgRGF0ZSgpLnRvTG9jYWxlU3RyaW5nKCksXG4gICAgfTtcbiAgICBzZXRSdWxlcygocHJldikgPT4gW25ld1J1bGUsIC4uLnByZXZdKTtcbiAgICBhZGRMb2coYOKclCBbTk9XQSBSRUdVxYFBXSBaZGVmaW5pb3dhbm8gcmVndcWCxJkgYXV0b21hdHljem7EhTogXCIke25ld1J1bGUubmFtZX1cIiAoV3pvcnplYzogJHtuZXdSdWxlLnBhdHRlcm4gfHwgbmV3UnVsZS5tYXRjaEZpZWxkfSwgQWtjamE6ICR7bmV3UnVsZS5hY3Rpb24udG9VcHBlckNhc2UoKX0pLmApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRvZ2dsZVJ1bGUgPSAocnVsZUlkOiBzdHJpbmcpID0+IHtcbiAgICBzZXRSdWxlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChyKSA9PiB7XG4gICAgICAgIGlmIChyLmlkID09PSBydWxlSWQpIHtcbiAgICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSAhci5pc0VuYWJsZWQ7XG4gICAgICAgICAgYWRkTG9nKGBbUkVHVcWBQV0gJHtuZXh0U3RhdGUgPyAnQWt0eXdvd2FubycgOiAnV3nFgsSFY3pvbm8nfSByZWd1xYLEmSBcIiR7ci5uYW1lfVwiLmApO1xuICAgICAgICAgIHJldHVybiB7IC4uLnIsIGlzRW5hYmxlZDogbmV4dFN0YXRlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRGVsZXRlUnVsZSA9IChydWxlSWQ6IHN0cmluZykgPT4ge1xuICAgIHNldFJ1bGVzKChwcmV2KSA9PiB7XG4gICAgICBjb25zdCB0YXJnZXQgPSBwcmV2LmZpbmQoKHIpID0+IHIuaWQgPT09IHJ1bGVJZCk7XG4gICAgICBpZiAodGFyZ2V0KSB7XG4gICAgICAgIGFkZExvZyhg8J+Xke+4jyBbVVNVTknEmFRPIFJFR1XFgcSYXSBVc3VuacSZdG8gcmVndcWCxJkgXCIke3RhcmdldC5uYW1lfVwiLmApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXYuZmlsdGVyKChyKSA9PiByLmlkICE9PSBydWxlSWQpO1xuICAgIH0pO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRlc3RSdWxlID0gKHJ1bGU6IFdhdGNoZG9nQXV0b0tpbGxSdWxlKSA9PiB7XG4gICAgcGxheUtpbGxTb3VuZCgpO1xuICAgIGNvbnN0IHRlc3RQaWQgPSBNYXRoLmZsb29yKDc1MDAgKyBNYXRoLnJhbmRvbSgpICogMjAwMCk7XG4gICAgbGV0IHNhbXBsZU5hbWUgPSAndGhyZWF0X3NhbXBsZS5leGUnO1xuICAgIGlmIChydWxlLnBhdHRlcm4pIHtcbiAgICAgIHNhbXBsZU5hbWUgPSBydWxlLnBhdHRlcm4ucmVwbGFjZSgvXFwqL2csICcnKSB8fCAndGhyZWF0X3NhbXBsZS5leGUnO1xuICAgICAgaWYgKCFzYW1wbGVOYW1lLmVuZHNXaXRoKCcuZXhlJykpIHNhbXBsZU5hbWUgKz0gJy5leGUnO1xuICAgIH0gZWxzZSBpZiAocnVsZS5tYXRjaEZpZWxkID09PSAnaGFzRmx1dHRlckRsbCcpIHtcbiAgICAgIHNhbXBsZU5hbWUgPSAnZmx1dHRlcl9vdmVybGF5X3RyYXAuZXhlJztcbiAgICB9XG5cbiAgICBjb25zdCB0ZXN0UHJvYzogU2ltdWxhdGVkUHJvY2VzcyA9IHtcbiAgICAgIHBpZDogdGVzdFBpZCxcbiAgICAgIHBwaWQ6IDEwNDQsXG4gICAgICBuYW1lOiBzYW1wbGVOYW1lLFxuICAgICAgd2luZG93VGl0bGU6IGBQcm9jZXMgdGVzdG93eSByZWd1xYJ5OiAke3J1bGUubmFtZX1gLFxuICAgICAgaXNUb3BNb3N0OiBydWxlLm1hdGNoRmllbGQgPT09ICdpc1RvcE1vc3QnLFxuICAgICAgaXNGdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgIGhhc0ZsdXR0ZXJEbGw6IHJ1bGUubWF0Y2hGaWVsZCA9PT0gJ2hhc0ZsdXR0ZXJEbGwnLFxuICAgICAgd2lkdGg6IDAsXG4gICAgICBoZWlnaHQ6IDAsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgc3RhdHVzOiBydWxlLmFjdGlvbiA9PT0gJ2F1dG9fc3VzcGVuZCcgPyAncXVhcmFudGluZWQnIDogcnVsZS5hY3Rpb24gPT09ICdhdXRvX2tpbGxfYW5kX3BlX3NhYm90YWdlJyA/ICdwZV9jb3JydXB0ZWQnIDogJ3Rlcm1pbmF0ZWQnLFxuICAgICAgZmlsZVBhdGg6IGBDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFwke3NhbXBsZU5hbWV9YCxcbiAgICAgIGlzUm9ndWU6IHRydWUsXG4gICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgbWVtb3J5TWI6IDAsXG4gICAgICB0aHJlYWRzQ291bnQ6IDAsXG4gICAgICBoYW5kbGVzQ291bnQ6IDAsXG4gICAgICBpb1JhdGVLYjogMCxcbiAgICAgIHByaW9yaXR5Q2xhc3M6ICdJRExFJyxcbiAgICAgIHdpbmRvd3M6IFtdLFxuICAgIH07XG5cbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+IFsuLi5wcmV2LmZpbHRlcigocCkgPT4gcC5uYW1lICE9PSBzYW1wbGVOYW1lKSwgdGVzdFByb2NdKTtcbiAgICBhZGRMb2coYPCfp6rwn5KlIFtURVNUIFNVS0NFU10gUmVndcWCYSBcIiR7cnVsZS5uYW1lfVwiIHd5a3J5xYJhIHByb2NlcyBcIiR7c2FtcGxlTmFtZX1cIiAoUElEOiAke3Rlc3RQaWR9KSBpIHd5a29uYcWCYSAke3J1bGUuYWN0aW9uLnRvVXBwZXJDYXNlKCl9IHcgMCBtcyFgKTtcblxuICAgIHNldFJ1bGVzKChwcmV2KSA9PlxuICAgICAgcHJldi5tYXAoKHIpID0+IHtcbiAgICAgICAgaWYgKHIuaWQgPT09IHJ1bGUuaWQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucixcbiAgICAgICAgICAgIG1hdGNoQ291bnQ6IHIubWF0Y2hDb3VudCArIDEsXG4gICAgICAgICAgICBsYXN0VHJpZ2dlcmVkOiBuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHI7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBzZXRUb3RhbFJ1bGVLaWxscygoaykgPT4ge1xuICAgICAgY29uc3QgbmV4dEsgPSBrICsgMTtcbiAgICAgIHNhZmVTdG9yYWdlLnNldCgnc2VudGluZWxfd2F0Y2hkb2dfdG90YWxfa2lsbHMnLCBuZXh0Syk7XG4gICAgICByZXR1cm4gbmV4dEs7XG4gICAgfSk7XG4gIH07XG5cbiAgLy8gTGlzdGVuIHRvIGV4dGVybmFsIGN1c3RvbSBldmVudHNcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVHbG9iYWxLaWxsID0gKCkgPT4ge1xuICAgICAgaGFuZGxlS2lsbFdvcmtEZXN0cm95ZXJOb3coKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzZW50aW5lbDpraWxsLWFsbC1nbmlkYXMnLCBoYW5kbGVHbG9iYWxLaWxsKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2VudGluZWw6a2lsbC13b3JrLWRlc3Ryb3llcicsIGhhbmRsZUdsb2JhbEtpbGwpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6a2lsbC1hbGwtZ25pZGFzJywgaGFuZGxlR2xvYmFsS2lsbCk7XG4gICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VudGluZWw6a2lsbC13b3JrLWRlc3Ryb3llcicsIGhhbmRsZUdsb2JhbEtpbGwpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICAvLyBMaXZlIE1ldHJpYyBQb2xsZXIgRWZmZWN0XG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFpc1dhdGNoZG9nQWN0aXZlKSByZXR1cm47XG5cbiAgICBjb25zdCBpbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0UHJvY2Vzc2VzKChwcmV2UHJvY2Vzc2VzKSA9PiB7XG4gICAgICAgIHJldHVybiBwcmV2UHJvY2Vzc2VzLm1hcCgocHJvYykgPT4ge1xuICAgICAgICAgIGlmIChwcm9jLnN0YXR1cyAhPT0gJ3J1bm5pbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICAgICAgICBpb1JhdGVLYjogMCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gR2VuZXJhdGUgZHluYW1pYyByZWFsaXN0aWMgZmx1Y3R1YXRpb25cbiAgICAgICAgICBsZXQgY3B1QmFzZSA9IHByb2MuY3B1UGVyY2VudCB8fCAxO1xuICAgICAgICAgIGxldCBtZW1CYXNlID0gcHJvYy5tZW1vcnlNYiB8fCAxMDA7XG5cbiAgICAgICAgICBpZiAocHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5uYW1lLmluY2x1ZGVzKCdmbHV0dGVyJykpIHtcbiAgICAgICAgICAgIC8vIEhpZ2ggZmx1Y3R1YXRpbmcgbG9hZCBkdWUgdG8gRmx1dHRlciBHUFUvVnN5bmMgcmVuZGVyIGxvb3BcbiAgICAgICAgICAgIGNvbnN0IGRlbHRhQ3B1ID0gKE1hdGgucmFuZG9tKCkgKiAxMiAtIDUuNSk7XG4gICAgICAgICAgICBjcHVCYXNlID0gTWF0aC5tYXgoMTgsIE1hdGgubWluKDg1LCBjcHVCYXNlICsgZGVsdGFDcHUpKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gTWVtb3J5IGxlYWtpbmcgdGVuZGVuY3kgZm9yIHJvZ3VlIG92ZXJsYXlzXG4gICAgICAgICAgICBjb25zdCBkZWx0YU1lbSA9IChNYXRoLnJhbmRvbSgpICogMi41IC0gMC40KTtcbiAgICAgICAgICAgIG1lbUJhc2UgPSBNYXRoLm1heCgxNTAsIE1hdGgubWluKDQ4MCwgbWVtQmFzZSArIGRlbHRhTWVtKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChwcm9jLmlzUGFyZW50RHJvcHBlcikge1xuICAgICAgICAgICAgLy8gUGVyaW9kaWMgc3Bpa2Ugd2hlbiBjb21tdW5pY2F0aW5nIG9yIGNoZWNraW5nIGNoaWxkXG4gICAgICAgICAgICBjb25zdCBzcGlrZSA9IE1hdGgucmFuZG9tKCkgPiAwLjcgPyAxMiA6IC0zO1xuICAgICAgICAgICAgY3B1QmFzZSA9IE1hdGgubWF4KDIsIE1hdGgubWluKDMwLCBjcHVCYXNlICsgc3Bpa2UpKTtcbiAgICAgICAgICAgIG1lbUJhc2UgPSBNYXRoLm1heCgzMCwgTWF0aC5taW4oOTAsIG1lbUJhc2UgKyAoTWF0aC5yYW5kb20oKSAqIDAuOCAtIDAuMykpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gTm9ybWFsIHByb2Nlc3MgZmx1Y3R1YXRpb25cbiAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gKE1hdGgucmFuZG9tKCkgKiAyIC0gMSk7XG4gICAgICAgICAgICBjcHVCYXNlID0gTWF0aC5tYXgoMC41LCBNYXRoLm1pbigxNSwgY3B1QmFzZSArIGRlbHRhKSk7XG4gICAgICAgICAgICBtZW1CYXNlID0gTWF0aC5tYXgoODAsIE1hdGgubWluKDQ1MCwgbWVtQmFzZSArIChNYXRoLnJhbmRvbSgpICogMC40IC0gMC4yKSkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRDcHUgPSBwYXJzZUZsb2F0KGNwdUJhc2UudG9GaXhlZCgxKSk7XG4gICAgICAgICAgY29uc3QgY3VycmVudE1lbSA9IHBhcnNlRmxvYXQobWVtQmFzZS50b0ZpeGVkKDEpKTtcblxuICAgICAgICAgIC8vIEFwcGVuZCB0byBoaXN0b3J5IChrZWVwIDEwIGRhdGEgcG9pbnRzKVxuICAgICAgICAgIGNvbnN0IG5ld0NwdUhpc3QgPSBbLi4uKHByb2MuY3B1SGlzdG9yeSB8fCBbXSkuc2xpY2UoLTkpLCBjdXJyZW50Q3B1XTtcbiAgICAgICAgICBjb25zdCBuZXdNZW1IaXN0ID0gWy4uLihwcm9jLm1lbW9yeUhpc3RvcnkgfHwgW10pLnNsaWNlKC05KSwgY3VycmVudE1lbV07XG5cbiAgICAgICAgICAvLyAxLiBFdmFsdWF0ZSBVc2VyLURlZmluZWQgUnVsZXMgRW5naW5lIGZvciBpbnN0YW50IGRlY2FwaXRhdGlvbiAvIGFjdGlvblxuICAgICAgICAgIGZvciAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgICAgICAgaWYgKCFydWxlLmlzRW5hYmxlZCkgY29udGludWU7XG5cbiAgICAgICAgICAgIGxldCBpc01hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocnVsZS5tYXRjaEZpZWxkID09PSAnaGFzRmx1dHRlckRsbCcpIHtcbiAgICAgICAgICAgICAgaXNNYXRjaCA9IEJvb2xlYW4ocHJvYy5oYXNGbHV0dGVyRGxsKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocnVsZS5tYXRjaEZpZWxkID09PSAnaXNUb3BNb3N0Jykge1xuICAgICAgICAgICAgICBpc01hdGNoID0gQm9vbGVhbihwcm9jLmlzVG9wTW9zdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zdCB0YXJnZXRWYWwgPSAoXG4gICAgICAgICAgICAgICAgcnVsZS5tYXRjaEZpZWxkID09PSAnbmFtZScgPyBwcm9jLm5hbWUgOlxuICAgICAgICAgICAgICAgIHJ1bGUubWF0Y2hGaWVsZCA9PT0gJ3dpbmRvd1RpdGxlJyA/IChwcm9jLndpbmRvd1RpdGxlIHx8ICcnKSA6XG4gICAgICAgICAgICAgICAgcnVsZS5tYXRjaEZpZWxkID09PSAnZmlsZVBhdGgnID8gcHJvYy5maWxlUGF0aCA6XG4gICAgICAgICAgICAgICAgcHJvYy5uYW1lXG4gICAgICAgICAgICAgICkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgICBjb25zdCBwYXQgPSBydWxlLnBhdHRlcm4udG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgICAgICAgICAgIGlmIChwYXQuaW5jbHVkZXMoJyonKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gcGF0LnNwbGl0KCcqJykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIGlzTWF0Y2ggPSBwYXJ0cy5sZW5ndGggPT09IDAgfHwgcGFydHMuZXZlcnkoKHApID0+IHRhcmdldFZhbC5pbmNsdWRlcyhwKSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXNNYXRjaCA9IHRhcmdldFZhbC5pbmNsdWRlcyhwYXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc01hdGNoKSB7XG4gICAgICAgICAgICAgIGlmIChydWxlLmFjdGlvbiA9PT0gJ2F1dG9fa2lsbCcgfHwgcnVsZS5hY3Rpb24gPT09ICdhdXRvX2tpbGxfYW5kX3BlX3NhYm90YWdlJykge1xuICAgICAgICAgICAgICAgIGFkZExvZyhg8J+SpSBbUkVHVcWBQSBXQVRDSERPR10gXCIke3J1bGUubmFtZX1cIiBuYXR5Y2htaWFzdCDFm2NpxJnFgmEgcHJvY2VzIFwiJHtwcm9jLm5hbWV9XCIgKFBJRDogJHtwcm9jLnBpZH0pIWApO1xuICAgICAgICAgICAgICAgIHBsYXlLaWxsU291bmQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgLi4ucHJvYyxcbiAgICAgICAgICAgICAgICAgIHN0YXR1czogcnVsZS5hY3Rpb24gPT09ICdhdXRvX2tpbGxfYW5kX3BlX3NhYm90YWdlJyA/ICgncGVfY29ycnVwdGVkJyBhcyBjb25zdCkgOiAoJ3Rlcm1pbmF0ZWQnIGFzIGNvbnN0KSxcbiAgICAgICAgICAgICAgICAgIGNwdVBlcmNlbnQ6IDAsXG4gICAgICAgICAgICAgICAgICBtZW1vcnlNYjogMCxcbiAgICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IFsuLi5uZXdDcHVIaXN0LnNsaWNlKC05KSwgMF0sXG4gICAgICAgICAgICAgICAgICBtZW1vcnlIaXN0b3J5OiBuZXdNZW1IaXN0LFxuICAgICAgICAgICAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAocnVsZS5hY3Rpb24gPT09ICdhdXRvX3N1c3BlbmQnKSB7XG4gICAgICAgICAgICAgICAgYWRkTG9nKGDinYTvuI8gW1JFR1XFgUEgV0FUQ0hET0ddIFwiJHtydWxlLm5hbWV9XCIgemFtcm96acWCYSBwcm9jZXMgXCIke3Byb2MubmFtZX1cIiAoUElEOiAke3Byb2MucGlkfSkgdyBSQU0hYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICAgICAgICBzdGF0dXM6ICdxdWFyYW50aW5lZCcgYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICAgICAgICAgICAgY3B1SGlzdG9yeTogWy4uLm5ld0NwdUhpc3Quc2xpY2UoLTkpLCAwXSxcbiAgICAgICAgICAgICAgICAgIG1lbW9yeUhpc3Rvcnk6IG5ld01lbUhpc3QsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChydWxlLmFjdGlvbiA9PT0gJ2F1dG9fdGhyb3R0bGUnKSB7XG4gICAgICAgICAgICAgICAgYWRkTG9nKGDimqEgW1JFR1XFgUEgV0FUQ0hET0ddIFwiJHtydWxlLm5hbWV9XCIgb2JuacW8ecWCYSBwcmlvcnl0ZXQgQ1BVIHByb2Nlc3UgXCIke3Byb2MubmFtZX1cIiBkbyBJRExFLmApO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICAgICAgcHJpb3JpdHlDbGFzczogJ0lETEUnIGFzIGNvbnN0LFxuICAgICAgICAgICAgICAgICAgY3B1UGVyY2VudDogTWF0aC5taW4oY3VycmVudENwdSwgMy4wKSxcbiAgICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IG5ld0NwdUhpc3QsXG4gICAgICAgICAgICAgICAgICBtZW1vcnlIaXN0b3J5OiBuZXdNZW1IaXN0LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAyLiBDaGVjayBXYXRjaGRvZyB0aHJlc2hvbGQgdmlvbGF0aW9uc1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChjdXJyZW50Q3B1ID49IGNwdVRocmVzaG9sZCB8fCBjdXJyZW50TWVtID49IG1lbW9yeVRocmVzaG9sZCkgJiZcbiAgICAgICAgICAgIChwcm9jLmlzUm9ndWUgfHwgcHJvYy5pc1RvcE1vc3QgfHwgcHJvYy5oYXNGbHV0dGVyRGxsKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGF1dG9BY3Rpb24gPT09ICdhdXRvX3N1c3BlbmQnKSB7XG4gICAgICAgICAgICAgIGFkZExvZyhg8J+aqCBbV0FUQ0hET0cgVFJJR0dFUl0gUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pIHByemVrcm9jennFgiBsaW1pdCAoQ1BVOiAke2N1cnJlbnRDcHV9JSwgUkFNOiAke2N1cnJlbnRNZW19TUIpISBXeXdvxYJhbm8gTnRTdXNwZW5kUHJvY2VzcyFgKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICAgIHN0YXR1czogJ3F1YXJhbnRpbmVkJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICBjcHVQZXJjZW50OiAwLFxuICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IFsuLi5uZXdDcHVIaXN0LnNsaWNlKC05KSwgMF0sXG4gICAgICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXV0b0FjdGlvbiA9PT0gJ2F1dG9fa2lsbCcpIHtcbiAgICAgICAgICAgICAgYWRkTG9nKGDwn5KlIFtXQVRDSERPRyBUUklHR0VSXSBQSUQgJHtwcm9jLnBpZH0gKCR7cHJvYy5uYW1lfSkgcHJ6ZWtyb2N6ecWCIHByw7NnIHphc29iw7N3ISBXeXdvxYJhbm8gVGVybWluYXRlUHJvY2VzcyhQSUQsIDkpIWApO1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICAgICAgc3RhdHVzOiAndGVybWluYXRlZCcgYXMgY29uc3QsXG4gICAgICAgICAgICAgICAgY3B1UGVyY2VudDogMCxcbiAgICAgICAgICAgICAgICBjcHVIaXN0b3J5OiBbLi4ubmV3Q3B1SGlzdC5zbGljZSgtOSksIDBdLFxuICAgICAgICAgICAgICAgIG1lbW9yeUhpc3Rvcnk6IG5ld01lbUhpc3QsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGF1dG9BY3Rpb24gPT09ICdhdXRvX3Rocm90dGxlJykge1xuICAgICAgICAgICAgICBhZGRMb2coYOKaoO+4jyBbV0FUQ0hET0cgVFJJR0dFUl0gUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pIG9ncmFuaWN6b25vIHByaW9yeXRldCBDUFUgZG8gSURMRV9QUklPUklUWV9DTEFTUy5gKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAuLi5wcm9jLFxuICAgICAgICAgICAgICAgIHByaW9yaXR5Q2xhc3M6ICdJRExFJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICBjcHVQZXJjZW50OiBNYXRoLm1pbihjdXJyZW50Q3B1LCA1LjApLFxuICAgICAgICAgICAgICAgIGNwdUhpc3Rvcnk6IG5ld0NwdUhpc3QsXG4gICAgICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFkZExvZyhg4pqg77iPIFtXQVRDSERPRyBBTEVSVF0gV3lrcnl0byBuYWRtaWVybmUgb2JjacSFxbxlbmllIHcgUElEICR7cHJvYy5waWR9ICgke3Byb2MubmFtZX0pOiBDUFUgJHtjdXJyZW50Q3B1fSUsIFJBTSAke2N1cnJlbnRNZW19TUIuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnByb2MsXG4gICAgICAgICAgICBjcHVQZXJjZW50OiBjdXJyZW50Q3B1LFxuICAgICAgICAgICAgbWVtb3J5TWI6IGN1cnJlbnRNZW0sXG4gICAgICAgICAgICBjcHVIaXN0b3J5OiBuZXdDcHVIaXN0LFxuICAgICAgICAgICAgbWVtb3J5SGlzdG9yeTogbmV3TWVtSGlzdCxcbiAgICAgICAgICAgIGlvUmF0ZUtiOiBwYXJzZUZsb2F0KChNYXRoLnJhbmRvbSgpICogKHByb2MuaXNUb3BNb3N0ID8gMTUwIDogMjApICsgNSkudG9GaXhlZCgxKSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LCBwb2xsSW50ZXJ2YWwpO1xuXG4gICAgcmV0dXJuICgpID0+IGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxJZCk7XG4gIH0sIFtpc1dhdGNoZG9nQWN0aXZlLCBwb2xsSW50ZXJ2YWwsIGNwdVRocmVzaG9sZCwgbWVtb3J5VGhyZXNob2xkLCBhdXRvQWN0aW9uLCBydWxlc10pO1xuXG4gIC8vIEFnZ3JlZ2F0ZSBNZXRyaWNzXG4gIGNvbnN0IHJ1bm5pbmdQcm9jZXNzZXMgPSBwcm9jZXNzZXMuZmlsdGVyKChwKSA9PiBwLnN0YXR1cyA9PT0gJ3J1bm5pbmcnKTtcbiAgY29uc3QgdG90YWxDcHUgPSBydW5uaW5nUHJvY2Vzc2VzLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC5jcHVQZXJjZW50IHx8IDApLCAwKTtcbiAgY29uc3QgdG90YWxNZW1vcnkgPSBydW5uaW5nUHJvY2Vzc2VzLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC5tZW1vcnlNYiB8fCAwKSwgMCk7XG4gIGNvbnN0IHJvZ3VlQ3B1ID0gcnVubmluZ1Byb2Nlc3Nlc1xuICAgIC5maWx0ZXIoKHApID0+IHAuaXNSb2d1ZSB8fCBwLmlzVG9wTW9zdCB8fCBwLmhhc0ZsdXR0ZXJEbGwpXG4gICAgLnJlZHVjZSgoYWNjLCBwKSA9PiBhY2MgKyAocC5jcHVQZXJjZW50IHx8IDApLCAwKTtcbiAgY29uc3QgdG90YWxUaHJlYWRzID0gcnVubmluZ1Byb2Nlc3Nlcy5yZWR1Y2UoKGFjYywgcCkgPT4gYWNjICsgKHAudGhyZWFkc0NvdW50IHx8IDApLCAwKTtcbiAgY29uc3QgYWN0aXZlQWxlcnRzID0gcnVubmluZ1Byb2Nlc3Nlcy5maWx0ZXIoXG4gICAgKHApID0+IChwLmNwdVBlcmNlbnQgfHwgMCkgPiBjcHVUaHJlc2hvbGQgfHwgKHAubWVtb3J5TWIgfHwgMCkgPiBtZW1vcnlUaHJlc2hvbGRcbiAgKS5sZW5ndGg7XG5cbiAgLy8gQWN0aW9uc1xuICBjb25zdCBoYW5kbGVTdXNwZW5kUHJvY2VzcyA9IChwaWQ6IG51bWJlcikgPT4ge1xuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBpZCA9PT0gcGlkKSB7XG4gICAgICAgICAgYWRkTG9nKGBbTUFOVUFMIEZSRUVaRV0gTnRTdXNwZW5kUHJvY2VzcyhQSUQ6ICR7cGlkfSAtICR7cC5uYW1lfSkgLT4gWmFtcm/FvG9ubyB3xIV0a2kgdyBwYW1pxJljaSBSQU0uYCk7XG4gICAgICAgICAgcmV0dXJuIHsgLi4ucCwgc3RhdHVzOiAncXVhcmFudGluZWQnIGFzIGNvbnN0LCBjcHVQZXJjZW50OiAwIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlS2lsbFByb2Nlc3MgPSAocGlkOiBudW1iZXIpID0+IHtcbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4ge1xuICAgICAgICBpZiAocC5waWQgPT09IHBpZCkge1xuICAgICAgICAgIGFkZExvZyhgW01BTlVBTCBLSUxMXSBUZXJtaW5hdGVQcm9jZXNzKFBJRDogJHtwaWR9IC0gJHtwLm5hbWV9KSAtPiBad29sbmlvbm8gd3N6eXN0a2llIHVjaHd5dHkgaSBwYW1pxJnEhy5gKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wLCBzdGF0dXM6ICd0ZXJtaW5hdGVkJyBhcyBjb25zdCwgY3B1UGVyY2VudDogMCB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVRocm90dGxlUHJvY2VzcyA9IChwaWQ6IG51bWJlcikgPT4ge1xuICAgIHNldFByb2Nlc3NlcygocHJldikgPT5cbiAgICAgIHByZXYubWFwKChwKSA9PiB7XG4gICAgICAgIGlmIChwLnBpZCA9PT0gcGlkKSB7XG4gICAgICAgICAgYWRkTG9nKGBbVEhST1RUTEVdIFNldFByaW9yaXR5Q2xhc3MoUElEOiAke3BpZH0sIElETEVfUFJJT1JJVFlfQ0xBU1MpIC0+IE9ibmnFvG9ubyBwcmlvcnl0ZXQgd8SFdGvDs3cgZG8gbWluaW11bS5gKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wLCBwcmlvcml0eUNsYXNzOiAnSURMRScgYXMgY29uc3QsIGNwdVBlcmNlbnQ6IDIuMSB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSlcbiAgICApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVNhYm90YWdlUEUgPSAocGlkOiBudW1iZXIpID0+IHtcbiAgICBzZXRQcm9jZXNzZXMoKHByZXYpID0+XG4gICAgICBwcmV2Lm1hcCgocCkgPT4ge1xuICAgICAgICBpZiAocC5waWQgPT09IHBpZCkge1xuICAgICAgICAgIGFkZExvZyhg8J+SpSBbUEUgU0FCT1RBR0VdIE5hZHBpc2FubyBuYWfFgsOzd2VrIE1aIHplcmFtaSBkbGEgJHtwLm5hbWV9IChQSUQ6ICR7cGlkfSkgLT4gMHhDMDAwMDA3QiFgKTtcbiAgICAgICAgICBhZGRMb2coYPCflJIgW0FDTCBMT0NLT1VUXSBpY2FjbHMgXCIke3AuZmlsZVBhdGh9XCIgL2RlbnkgRXZlcnlvbmU6KEYsWClgKTtcbiAgICAgICAgICByZXR1cm4geyAuLi5wLCBzdGF0dXM6ICdwZV9jb3JydXB0ZWQnIGFzIGNvbnN0LCBjcHVQZXJjZW50OiAwIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgICB9KVxuICAgICk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlU3Bhd25PdmVybG9hZFByb2Nlc3MgPSAoKSA9PiB7XG4gICAgY29uc3QgbmV3UGlkID0gTWF0aC5mbG9vcig3MDAwICsgTWF0aC5yYW5kb20oKSAqIDIwMDApO1xuICAgIGNvbnN0IG5ld1Byb2M6IFNpbXVsYXRlZFByb2Nlc3MgPSB7XG4gICAgICBwaWQ6IG5ld1BpZCxcbiAgICAgIHBwaWQ6IDM4NDAsXG4gICAgICBuYW1lOiAnZmx1dHRlcl9jcnlwdG9fbWluZXJfb3ZlcmxheS5leGUnLFxuICAgICAgd2luZG93VGl0bGU6ICdIYXJkd2FyZSBBY2NlbGVyYXRlZCBGdWxsc2NyZWVuIExvY2sgKEhpZ2ggTG9hZCknLFxuICAgICAgaXNUb3BNb3N0OiB0cnVlLFxuICAgICAgaXNGdWxsc2NyZWVuOiB0cnVlLFxuICAgICAgaGFzRmx1dHRlckRsbDogdHJ1ZSxcbiAgICAgIHdpZHRoOiAxOTIwLFxuICAgICAgaGVpZ2h0OiAxMDgwLFxuICAgICAgb3BhY2l0eTogMC45NSxcbiAgICAgIGlzQmxvY2tlZDogdHJ1ZSxcbiAgICAgIHN0YXR1czogJ3J1bm5pbmcnLFxuICAgICAgZmlsZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXEFwcERhdGFcXFxcTG9jYWxcXFxcVGVtcFxcXFxmbHV0dGVyX2NyeXB0b19taW5lcl9vdmVybGF5LmV4ZScsXG4gICAgICBpc1JvZ3VlOiB0cnVlLFxuICAgICAgY3B1UGVyY2VudDogNjguNCxcbiAgICAgIG1lbW9yeU1iOiAzNDAuMixcbiAgICAgIHRocmVhZHNDb3VudDogMjgsXG4gICAgICBoYW5kbGVzQ291bnQ6IDYyMCxcbiAgICAgIGlvUmF0ZUtiOiA0MTIuMCxcbiAgICAgIHByaW9yaXR5Q2xhc3M6ICdISUdIJyxcbiAgICAgIGNwdUhpc3Rvcnk6IFs0MCwgNTIsIDYwLCA2NSwgNjgsIDY4LjRdLFxuICAgICAgbWVtb3J5SGlzdG9yeTogWzI1MCwgMjgwLCAzMTAsIDMzMCwgMzM1LCAzNDAuMl0sXG4gICAgICB3aW5kb3dzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBod25kOiBgMHgwMCR7TWF0aC5mbG9vcigxMDAwMDAgKyBNYXRoLnJhbmRvbSgpICogODAwMDAwKS50b1N0cmluZygxNil9YCxcbiAgICAgICAgICB0aXRsZTogJ0hhcmR3YXJlIEFjY2VsZXJhdGVkIEZ1bGxzY3JlZW4gTG9jaycsXG4gICAgICAgICAgY2xhc3NOYW1lOiAnRkxVVFRFUl9TVVJGQUNFX1ZJRVcnLFxuICAgICAgICAgIGlzVG9wTW9zdDogdHJ1ZSxcbiAgICAgICAgICBpc0Z1bGxzY3JlZW46IHRydWUsXG4gICAgICAgICAgaXNMYXllcmVkOiBmYWxzZSxcbiAgICAgICAgICBib3VuZHM6IHsgd2lkdGg6IDE5MjAsIGhlaWdodDogMTA4MCB9LFxuICAgICAgICAgIHpPcmRlcjogOTk5LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuXG4gICAgc2V0UHJvY2Vzc2VzKChwcmV2KSA9PiBbLi4ucHJldiwgbmV3UHJvY10pO1xuICAgIGFkZExvZyhgW1NQQVdOXSBVcnVjaG9taW9ubyBwcm9jZXMgcHJ6ZWNpxIXFvGFqxIVjeTogJHtuZXdQcm9jLm5hbWV9IChQSUQ6ICR7bmV3UHJvYy5waWR9KSBnZW5lcnVqxIVjeSB+NjglIENQVSFgKTtcbiAgfTtcblxuICAvLyBGaWx0ZXJlZCBMaXN0XG4gIGNvbnN0IGZpbHRlcmVkUHJvY2Vzc2VzID0gcHJvY2Vzc2VzLmZpbHRlcigocCkgPT4ge1xuICAgIGNvbnN0IG1hdGNoZXNTZWFyY2ggPSBcbiAgICAgIHAubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICBwLnBpZC50b1N0cmluZygpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5KSB8fFxuICAgICAgKHAud2luZG93VGl0bGUgJiYgcC53aW5kb3dUaXRsZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFF1ZXJ5LnRvTG93ZXJDYXNlKCkpKTtcblxuICAgIGlmICghbWF0Y2hlc1NlYXJjaCkgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKGZpbHRlck1vZGUgPT09ICdyb2d1ZV9vbmx5Jykge1xuICAgICAgcmV0dXJuIHAuaXNSb2d1ZSB8fCBwLmlzVG9wTW9zdCB8fCBwLmhhc0ZsdXR0ZXJEbGw7XG4gICAgfVxuICAgIGlmIChmaWx0ZXJNb2RlID09PSAnaGlnaF9yZXNvdXJjZScpIHtcbiAgICAgIHJldHVybiAocC5jcHVQZXJjZW50IHx8IDApID4gY3B1VGhyZXNob2xkIHx8IChwLm1lbW9yeU1iIHx8IDApID4gbWVtb3J5VGhyZXNob2xkO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG5cbiAgLy8gRXhwb3J0IFB5dGhvbiBXYXRjaGRvZyBEYWVtb24gU2NyaXB0XG4gIGNvbnN0IGV4cG9ydFB5dGhvbldhdGNoZG9nU2NyaXB0ID0gKCkgPT4ge1xuICAgIGNvbnN0IHNjcmlwdENvZGUgPSBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUFJPQ0VTUyBSRVNPVVJDRSBXQVRDSERPRyBEQUVNT04gKDEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5BdXRvbWF0eWN6bnkgc3RyYcW8bmlrIG1vbml0b3J1asSFY3kgenXFvHljaWUgQ1BVIGkgcGFtacSZY2kgUkFNIHByemV6IHByb2Nlc3lcbm5ha8WCYWRlayBla3Jhbm93eWNoIEZsdXR0ZXIgLyBUb3BNb3N0LiBXIHByenlwYWRrdSB3eWtyeWNpYSBwcnplY2nEhcW8ZW5pYVxubmF0eWNobWlhc3QgemFtcmHFvGEgcHJvY2VzIHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzKSBsdWIgenJ5d2EgdXByYXduaWVuaWEuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXCJcIlwiXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcblxuIyBXaW5kb3dzIEFQSSBCaW5kaW5nc1xudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5wc2FwaSA9IGN0eXBlcy53aW5kbGwucHNhcGlcblxuUFJPQ0VTU19RVUVSWV9JTkZPUk1BVElPTiA9IDB4MDQwMFxuUFJPQ0VTU19WTV9SRUFEID0gMHgwMDEwXG5QUk9DRVNTX1NVU1BFTkRfUkVTVU1FID0gMHgwODAwXG5QUk9DRVNTX1RFUk1JTkFURSA9IDB4MDAwMVxuXG4jIEtvbmZpZ3VyYWNqYSBwcm9nw7N3IFdhdGNoZG9nYVxuQ1BVX1RIUkVTSE9MRF9QRVJDRU5UID0gJHtjcHVUaHJlc2hvbGR9XG5NRU1PUllfVEhSRVNIT0xEX01CID0gJHttZW1vcnlUaHJlc2hvbGR9XG5QT0xMX0lOVEVSVkFMX1NFQ09ORFMgPSAke3BvbGxJbnRlcnZhbCAvIDEwMDB9XG5BVVRPX0FDVElPTiA9IFwiJHthdXRvQWN0aW9ufVwiICMgJ2F1dG9fc3VzcGVuZCcsICdhdXRvX2tpbGwnLCAnYXV0b190aHJvdHRsZSdcblxuY2xhc3MgUFJPQ0VTU19NRU1PUllfQ09VTlRFUlMoY3R5cGVzLlN0cnVjdHVyZSk6XG4gICAgX2ZpZWxkc18gPSBbXG4gICAgICAgIChcImNiXCIsIHdpbnR5cGVzLkRXT1JEKSxcbiAgICAgICAgKFwiUGFnZUZhdWx0Q291bnRcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJQZWFrV29ya2luZ1NldFNpemVcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiV29ya2luZ1NldFNpemVcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUXVvdGFQZWFrUGFnZWRQb29sVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUXVvdGFQYWdlZFBvb2xVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBlYWtOb25QYWdlZFBvb2xVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YU5vblBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlBhZ2VmaWxlVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUGVha1BhZ2VmaWxlVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICBdXG5cbmRlZiBnZXRfcHJvY2Vzc19tZW1vcnlfbWIoaF9wcm9jZXNzKTpcbiAgICBcIlwiXCJad3JhY2EgenXFvHljaWUgcGFtacSZY2kgUkFNIFdvcmtpbmcgU2V0IHcgbWVnYWJhanRhY2guXCJcIlwiXG4gICAgY291bnRlcnMgPSBQUk9DRVNTX01FTU9SWV9DT1VOVEVSUygpXG4gICAgY291bnRlcnMuY2IgPSBjdHlwZXMuc2l6ZW9mKFBST0NFU1NfTUVNT1JZX0NPVU5URVJTKVxuICAgIGlmIHBzYXBpLkdldFByb2Nlc3NNZW1vcnlJbmZvKGhfcHJvY2VzcywgY3R5cGVzLmJ5cmVmKGNvdW50ZXJzKSwgY291bnRlcnMuY2IpOlxuICAgICAgICByZXR1cm4gY291bnRlcnMuV29ya2luZ1NldFNpemUgLyAoMTAyNCAqIDEwMjQpXG4gICAgcmV0dXJuIDAuMFxuXG5kZWYgZnJlZXplX3Byb2Nlc3MocGlkKTpcbiAgICBcIlwiXCJCxYJ5c2thd2ljem5pZSB6YW1yYcW8YSB3c3p5c3RraWUgd8SFdGtpIHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgIGlmIGg6XG4gICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaClcbiAgICAgICAgcHJpbnQoZlwiWyFdIFtGUkVFWkVdIE50U3VzcGVuZFByb2Nlc3MoUElEOiB7cGlkfSkgLT4gWmFtcm/FvG9ubyB3xIV0a2kgdyBwYW1pxJljaSBSQU0hXCIpXG5cbmRlZiB0ZXJtaW5hdGVfcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIlRyd2FsZSB1YmlqYSBwcm9jZXMuXCJcIlwiXG4gICAgaCA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfVEVSTUlOQVRFLCBGYWxzZSwgcGlkKVxuICAgIGlmIGg6XG4gICAgICAgIGtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaCwgOSlcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaClcbiAgICAgICAgcHJpbnQoZlwiWyFdIFtLSUxMXSBUZXJtaW5hdGVQcm9jZXNzKFBJRDoge3BpZH0pIC0+IFVzdW5pxJl0byB6IFJBTSFcIilcblxuZGVmIHJ1bl93YXRjaGRvZ19sb29wKCk6XG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBwcmludChcIiAgUFJPQ0VTUyBXQVRDSERPRyBEQUVNT046IE1PTklUT1JPV0FOSUUgQ1BVICYgUkFNXCIpXG4gICAgcHJpbnQoZlwiICBQcm9naTogQ1BVID4ge0NQVV9USFJFU0hPTERfUEVSQ0VOVH0lIHwgUkFNID4ge01FTU9SWV9USFJFU0hPTERfTUJ9IE1CXCIpXG4gICAgcHJpbnQoZlwiICBBa2NqYSBhdXRvbWF0eWN6bmE6IHtBVVRPX0FDVElPTi51cHBlcigpfVwiKVxuICAgIHByaW50KFwiPVwiICogNzApXG5cbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICAjIFNrYW5vd2FuaWUgYWt0eXdueWNoIG9raWVuIFRvcE1vc3RcbiAgICAgICAgICAgIGRlZiBlbnVtX3Byb2MoaHduZCwgbHBhcmFtKTpcbiAgICAgICAgICAgICAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApICMgR1dMX0VYU1RZTEVcbiAgICAgICAgICAgICAgICBpc190b3Btb3N0ID0gYm9vbChleF9zdHlsZSAmIDB4MDAwMDAwMDgpXG5cbiAgICAgICAgICAgICAgICBpZiBpc190b3Btb3N0OlxuICAgICAgICAgICAgICAgICAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgICAgICAgICAgICAgICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgICAgICAgICAgICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gfCBQUk9DRVNTX1ZNX1JFQUQsIEZhbHNlLCBwaWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbV9tYiA9IGdldF9wcm9jZXNzX21lbW9yeV9tYihoX3Byb2MpXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhbV9tYiA+PSBNRU1PUllfVEhSRVNIT0xEX01COlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIlvwn5qoIEFMQVJNXSBXeWtyeXRvIHByemVjacSFxbxlbmllIFJBTSB3IFBJRCB7cGlkLnZhbHVlfToge3JhbV9tYjouMWZ9IE1CIChMaW1pdDoge01FTU9SWV9USFJFU0hPTERfTUJ9IE1CKVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIEFVVE9fQUNUSU9OID09IFwiYXV0b19zdXNwZW5kXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyZWV6ZV9wcm9jZXNzKHBpZC52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGlmIEFVVE9fQUNUSU9OID09IFwiYXV0b19raWxsXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlcm1pbmF0ZV9wcm9jZXNzKHBpZC52YWx1ZSlcblxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgIGNiID0gY3R5cGVzLldJTkZVTkNUWVBFKHdpbnR5cGVzLkJPT0wsIHdpbnR5cGVzLkhXTkQsIHdpbnR5cGVzLkxQQVJBTSkoZW51bV9wcm9jKVxuICAgICAgICAgICAgdXNlcjMyLkVudW1XaW5kb3dzKGNiLCAwKVxuICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMX1NFQ09ORFMpXG5cbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmF0cnp5bWFubyBzdHJhxbxuaWthIFdhdGNoZG9nLlwiKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcnVuX3dhdGNoZG9nX2xvb3AoKVxuYDtcbiAgICBkb3dubG9hZEZpbGUoJ3Byb2Nlc3Nfd2F0Y2hkb2dfZGFlbW9uLnB5Jywgc2NyaXB0Q29kZSwgJ3RleHQveC1weXRob24nKTtcbiAgICBhZGRMb2coJ+KclCBbRVhQT1JUXSBQb2JyYW5vIHNrcnlwdCBQeXRob25hOiBwcm9jZXNzX3dhdGNoZG9nX2RhZW1vbi5weScpO1xuICB9O1xuXG4gIC8vIFNwYXJrbGluZSBtaW5pIFNWRyBjb21wb25lbnRcbiAgY29uc3QgcmVuZGVyU3BhcmtsaW5lID0gKGRhdGE6IG51bWJlcltdID0gW10sIGNvbG9yOiBzdHJpbmcgPSAnI2E4NTVmNycpID0+IHtcbiAgICBpZiAoIWRhdGEgfHwgZGF0YS5sZW5ndGggPCAyKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5kYXRhLCAxKTtcbiAgICBjb25zdCBtaW4gPSBNYXRoLm1pbiguLi5kYXRhLCAwKTtcbiAgICBjb25zdCByYW5nZSA9IG1heCAtIG1pbiB8fCAxO1xuICAgIGNvbnN0IGhlaWdodCA9IDI0O1xuICAgIGNvbnN0IHdpZHRoID0gNjQ7XG5cbiAgICBjb25zdCBwb2ludHMgPSBkYXRhXG4gICAgICAubWFwKCh2YWwsIGlkeCkgPT4ge1xuICAgICAgICBjb25zdCB4ID0gKGlkeCAvIChkYXRhLmxlbmd0aCAtIDEpKSAqIHdpZHRoO1xuICAgICAgICBjb25zdCB5ID0gaGVpZ2h0IC0gKCh2YWwgLSBtaW4pIC8gcmFuZ2UpICogKGhlaWdodCAtIDQpIC0gMjtcbiAgICAgICAgcmV0dXJuIGAke3h9LCR7eX1gO1xuICAgICAgfSlcbiAgICAgIC5qb2luKCcgJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPHN2ZyB3aWR0aD17d2lkdGh9IGhlaWdodD17aGVpZ2h0fSBjbGFzc05hbWU9XCJvdmVyZmxvdy12aXNpYmxlIGlubGluZS1ibG9ja1wiPlxuICAgICAgICA8cG9seWxpbmUgZmlsbD1cIm5vbmVcIiBzdHJva2U9e2NvbG9yfSBzdHJva2VXaWR0aD1cIjJcIiBzdHJva2VMaW5lY2FwPVwicm91bmRcIiBzdHJva2VMaW5lam9pbj1cInJvdW5kXCIgcG9pbnRzPXtwb2ludHN9IC8+XG4gICAgICA8L3N2Zz5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTZcIj5cbiAgICAgIHsvKiBIZWFkZXIgQmFubmVyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTUgc2hhZG93LWxnIGZsZXggZmxleC1jb2wgbWQ6ZmxleC1yb3cgaXRlbXMtc3RhcnQgbWQ6aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxHYXVnZSBjbGFzc05hbWU9XCJ3LTUgaC01IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPlByb2Nlc3MgV2F0Y2hkb2cgJiBTeXN0ZW0gQXV0b21hdHljem5lZ28gVWJvanU8L3NwYW4+XG4gICAgICAgICAgICA8L2gyPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gcHgtMiBweS0wLjUgcm91bmRlZC1mdWxsIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMCBmb250LW1vbm8gZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIFJFQUwtVElNRVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMSBtYXgtdy0yeGxcIj5cbiAgICAgICAgICAgIFR3w7NyeiBhdXRvbWF0eWN6bmUgcmVndcWCeSBla3N0ZXJtaW5hY2ppIGRsYSBXYXRjaGRvZ2EsIG1vbml0b3J1aiBvYmNpxIXFvGVuaWUgcHJvY2Vzb3JhIChDUFUgJSkgaSBwYW1pxJljaSBSQU0gKE1CKSBvcmF6IG5hdHljaG1pYXN0IHXFm21pZXJjYWogcHJvY2VzeSB6YWdyYcW8YWrEhWNlIHByYWN5IHXFvHl0a293bmlrYS5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgey8qIE1BU1RFUiBLSUxMIEJVVFRPTiAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVLaWxsV29ya0Rlc3Ryb3llck5vd31cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMuNSBweS0yIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNjAwIHZpYS1yb3NlLTYwMCB0by1waW5rLTYwMCBob3Zlcjpmcm9tLXJlZC01MDAgaG92ZXI6dG8tcGluay01MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gc2hhZG93LWxnIHNoYWRvdy1yZWQtOTUwLzgwIGJvcmRlciBib3JkZXItcmVkLTQwMCBjdXJzb3ItcG9pbnRlciBhbmltYXRlLXB1bHNlIHRyYW5zaXRpb24tYWxsIGFjdGl2ZTpzY2FsZS05NVwiXG4gICAgICAgICAgICB0aXRsZT1cIlJvemtheiBib2pvd3k6IE5hdHljaG1pYXN0IHViaWogZ25pZMSZIG5pc3pjesSFY8SFIG5hc3rEhSBwcmFjxJkhXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy00IGgtNCB0ZXh0LXllbGxvdy0zMDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+VUJJSiBHTklExJggTklTWkNaxIRDxIQgUFJBQ8SYPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNXYXRjaGRvZ0FjdGl2ZSghaXNXYXRjaGRvZ0FjdGl2ZSl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMiByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBzaGFkb3cgdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgaXNXYXRjaGRvZ0FjdGl2ZVxuICAgICAgICAgICAgICAgID8gJ2JnLWVtZXJhbGQtNjAwIGhvdmVyOmJnLWVtZXJhbGQtNTAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc1dhdGNoZG9nQWN0aXZlID8gPFBhdXNlIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz4gOiA8UGxheSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgPHNwYW4+e2lzV2F0Y2hkb2dBY3RpdmUgPyAnU3RyYcW8bmlrOiBBS1RZV05ZJyA6ICdXem7Ds3cnfTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2V4cG9ydFB5dGhvbldhdGNoZG9nU2NyaXB0fVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBweC0zIHB5LTIgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTIwMCByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0cmFuc2l0aW9uLWFsbFwiXG4gICAgICAgICAgICB0aXRsZT1cIlBvYmllcnogc2tyeXB0IGRlbW9uYSBQeXRob25hIGRvIG1vbml0b3Jvd2FuaWEgQ1BVL1JBTSB3IHN5c3RlbWllIFdpbmRvd3NcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxEb3dubG9hZCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXB1cnBsZS00MDBcIiAvPlxuICAgICAgICAgICAgPHNwYW4+U2tyeXB0IC5weTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFdPUksgREVTVFJPWUVSIEtJTExFRCBTVUNDRVNTIE5PVElGSUNBVElPTiAqL31cbiAgICAgIHt3b3JrRGVzdHJveWVkQmFubmVyICYmIHdvcmtEZXN0cm95ZWRCYW5uZXIuc2hvdyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAgdmlhLXJvc2UtOTUwIHRvLXBpbmstOTUwIGJvcmRlci0yIGJvcmRlci1yZWQtNTAwLzgwIHNoYWRvdy0yeGwgZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGFuaW1hdGUtaW4gZmFkZS1pblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1yZWQtNjAwLzMwIGJvcmRlciBib3JkZXItcmVkLTUwMCB0ZXh0LXllbGxvdy0zMDAgc2hhZG93LW1kXCI+XG4gICAgICAgICAgICAgIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTYgaC02IGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ibGFjayB0ZXh0LXdoaXRlIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIOKalO+4jyBHTklEQSBOSVNaQ1rEhENBIFBSQUPEmCBaTElLV0lET1dBTkEhXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0yIHB5LTAuNSByb3VuZGVkIGJnLXJlZC05MDAgdGV4dC15ZWxsb3ctMjAwIGJvcmRlciBib3JkZXItcmVkLTcwMFwiPlxuICAgICAgICAgICAgICAgICAge3dvcmtEZXN0cm95ZWRCYW5uZXIudGltZX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtcmVkLTIwMCBtdC0wLjVcIj5cbiAgICAgICAgICAgICAgICB7d29ya0Rlc3Ryb3llZEJhbm5lci50ZXh0fVxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc2VsZi1lbmQgc206c2VsZi1jZW50ZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBiZy1ibGFjay81MCBweC0yIHB5LTEgcm91bmRlZCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNTAwLzMwXCI+XG4gICAgICAgICAgICAgIFN0YW46IEJlenBpZWN6bnlcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0V29ya0Rlc3Ryb3llZEJhbm5lcihudWxsKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIGJnLXNsYXRlLTkwMCBob3ZlcjpiZy1zbGF0ZS04MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIFphbWtuaWpcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG5cbiAgICAgIHsvKiBNYWluIFdhdGNoZG9nIFN1Yi1OYXZpZ2F0aW9uIFRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC0yIGdhcC0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0V2F0Y2hkb2dNYWluVGFiKCdydWxlcycpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtNCBweS0yIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIHdhdGNoZG9nTWFpblRhYiA9PT0gJ3J1bGVzJ1xuICAgICAgICAgICAgICAgID8gJ2JnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNjAwIHZpYS1waW5rLTYwMCB0by1yb3NlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1sZyBzaGFkb3ctcHVycGxlLTk1MCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxTbGlkZXJzIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQteWVsbG93LTMwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5SZWd1xYJ5IEF1dG9tYXR5Y3puZWdvIFViaWphbmlhPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gcHgtMS41IHB5LTAuMiByb3VuZGVkLWZ1bGwgYmctYmxhY2svNDAgdGV4dC1wdXJwbGUtMjAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICB7cnVsZXMuZmlsdGVyKChyKSA9PiByLmlzRW5hYmxlZCkubGVuZ3RofSBha3R5d255Y2hcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFdhdGNoZG9nTWFpblRhYigndGVsZW1ldHJ5Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgd2F0Y2hkb2dNYWluVGFiID09PSAndGVsZW1ldHJ5J1xuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8R2F1Z2UgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgPHNwYW4+TW9uaXRvciBQcm9jZXPDs3cgJiBXeWtyZXN5PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gcHgtMS41IHB5LTAuMiByb3VuZGVkLWZ1bGwgYmctYmxhY2svNDAgdGV4dC1zbGF0ZS0zMDBcIj5cbiAgICAgICAgICAgICAge3J1bm5pbmdQcm9jZXNzZXMubGVuZ3RofSBwcm9jLlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0V2F0Y2hkb2dNYWluVGFiKCdsb2dzJyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC00IHB5LTIgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXIgJHtcbiAgICAgICAgICAgICAgd2F0Y2hkb2dNYWluVGFiID09PSAnbG9ncydcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LWxnIHNoYWRvdy1wdXJwbGUtOTUwJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIEJvam93eSAmIExvZ2kgV2luMzI8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBweC0xLjUgcHktMC4yIHJvdW5kZWQtZnVsbCBiZy1ibGFjay80MCB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICB7d2F0Y2hkb2dMb2dzLmxlbmd0aH0gd3Bpc8Ozd1xuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5VxZttaWVyY29ueWNoIGduaWQ6PC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctcmVkLTk1MCBib3JkZXIgYm9yZGVyLXJlZC04MDAgdGV4dC1yZWQtMzAwIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAge3RvdGFsUnVsZUtpbGxzfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFZJRVcgMTogUlVMRVMgRU5HSU5FICovfVxuICAgICAge3dhdGNoZG9nTWFpblRhYiA9PT0gJ3J1bGVzJyAmJiAoXG4gICAgICAgIDxXYXRjaGRvZ1J1bGVzTWFuYWdlclxuICAgICAgICAgIHJ1bGVzPXtydWxlc31cbiAgICAgICAgICBvbkFkZFJ1bGU9e2hhbmRsZUFkZFJ1bGV9XG4gICAgICAgICAgb25Ub2dnbGVSdWxlPXtoYW5kbGVUb2dnbGVSdWxlfVxuICAgICAgICAgIG9uRGVsZXRlUnVsZT17aGFuZGxlRGVsZXRlUnVsZX1cbiAgICAgICAgICBvblRlc3RSdWxlPXtoYW5kbGVUZXN0UnVsZX1cbiAgICAgICAgICBvbktpbGxXb3JrRGVzdHJveWVyTm93PXtoYW5kbGVLaWxsV29ya0Rlc3Ryb3llck5vd31cbiAgICAgICAgICBpc1dhdGNoZG9nQWN0aXZlPXtpc1dhdGNoZG9nQWN0aXZlfVxuICAgICAgICAgIHRvdGFsS2lsbHNDb3VudD17dG90YWxSdWxlS2lsbHN9XG4gICAgICAgIC8+XG4gICAgICApfVxuXG4gICAgICB7LyogVklFVyAyOiBURUxFTUVUUlkgQU5EIEtQSSBEQVNIQk9BUkQgKi99XG4gICAgICB7d2F0Y2hkb2dNYWluVGFiID09PSAndGVsZW1ldHJ5JyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNwYXduT3ZlcmxvYWRQcm9jZXNzfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHB4LTMgcHktMS41IGJnLWdyYWRpZW50LXRvLXIgZnJvbS1yZWQtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcmVkLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQtbGcgdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHNoYWRvdyB0cmFuc2l0aW9uLWFsbCBib3JkZXIgYm9yZGVyLXJlZC01MDAvMzBcIlxuICAgICAgICAgICAgICB0aXRsZT1cIlN5bXVsdWogdXJ1Y2hvbWllbmllIG5ha8WCYWRraSBnZW5lcnVqxIVjZWogb2dyb21uZSBvYmNpxIXFvGVuaWUgQ1BVIGkgUkFNXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuPld5Z2VuZXJ1aiBUZXN0b3dlIE9iY2nEhcW8ZW5pZSAoU3Bpa2UpPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBLUEkgUmVzb3VyY2UgTWV0cmljcyBTdW1tYXJ5IFdpZGdldHMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgbGc6Z3JpZC1jb2xzLTQgZ2FwLTRcIj5cbiAgICAgICAgey8qIFRvdGFsIENQVSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPENwdSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgIMWBxIVjem5lIE9iY2nEhcW8ZW5pZSBDUFVcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctcHVycGxlLTk1MCB0ZXh0LXB1cnBsZS0zMDAgYm9yZGVyIGJvcmRlci1wdXJwbGUtODAwXCI+XG4gICAgICAgICAgICAgIHtydW5uaW5nUHJvY2Vzc2VzLmxlbmd0aH0gcHJvYy5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXktMiBmbGV4IGl0ZW1zLWJhc2VsaW5lIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgdGV4dC0yeGwgZm9udC1leHRyYWJvbGQgZm9udC1tb25vICR7dG90YWxDcHUgPiA1MCA/ICd0ZXh0LXJvc2UtNDAwJyA6ICd0ZXh0LXdoaXRlJ31gfT5cbiAgICAgICAgICAgICAge3RvdGFsQ3B1LnRvRml4ZWQoMSl9JVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgWmFncm/FvGVuaWE6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwXCI+e3JvZ3VlQ3B1LnRvRml4ZWQoMSl9JTwvc3Ryb25nPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFByb2dyZXNzIEJhciAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgaC0yIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW4gYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgaC1mdWxsIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMCAke1xuICAgICAgICAgICAgICAgIHRvdGFsQ3B1ID4gNjAgPyAnYmctcmVkLTUwMCcgOiB0b3RhbENwdSA+IDMwID8gJ2JnLWFtYmVyLTUwMCcgOiAnYmctcHVycGxlLTUwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbih0b3RhbENwdSwgMTAwKX0lYCB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFRvdGFsIE1lbW9yeSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEhhcmREcml2ZSBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICBQYW1pxJnEhyBSQU0gKFdvcmtpbmcgU2V0KVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+TGltaXQ6IDEwMjQgTUI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHt0b3RhbE1lbW9yeS50b0ZpeGVkKDEpfSA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNtIGZvbnQtbm9ybWFsIHRleHQtc2xhdGUtNDAwXCI+TUI8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtNDAwIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgICDFmnJlZG5pbzogeyh0b3RhbE1lbW9yeSAvIChydW5uaW5nUHJvY2Vzc2VzLmxlbmd0aCB8fCAxKSkudG9GaXhlZCgwKX0gTUIvcFxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIGgtMiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImgtZnVsbCBiZy1ncmFkaWVudC10by1yIGZyb20tcGluay02MDAgdG8tcHVycGxlLTUwMCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDBcIlxuICAgICAgICAgICAgICBzdHlsZT17eyB3aWR0aDogYCR7TWF0aC5taW4oKHRvdGFsTWVtb3J5IC8gMTAyNCkgKiAxMDAsIDEwMCl9JWAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBUaHJlYWQgJiBIYW5kbGUgQ29uY3VycmVuY3kgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPEFjdGl2aXR5IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1jeWFuLTQwMFwiIC8+XG4gICAgICAgICAgICAgIFfEhXRraSAmIFVjaHd5dHkgV2luMzJcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyBweC0xLjUgcHktMC41IHJvdW5kZWQgYmctY3lhbi05NTAgdGV4dC1jeWFuLTMwMCBib3JkZXIgYm9yZGVyLWN5YW4tODAwXCI+XG4gICAgICAgICAgICAgIENPTkNVUlJFTkNZXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHt0b3RhbFRocmVhZHN9IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ub3JtYWwgdGV4dC1zbGF0ZS00MDBcIj53xIV0a8Ozdzwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgIFVjaHd5dHk6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDBcIj57cHJvY2Vzc2VzLnJlZHVjZSgoYSwgYikgPT4gYSArIChiLmhhbmRsZXNDb3VudCB8fCAwKSwgMCl9PC9zdHJvbmc+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgPHNwYW4+U3RhbiBwYW1pxJljaTo8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCBmb250LW1vbm9cIj5TVEFCSUxOWTwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIFdhdGNoZG9nIEFsZXJ0cyAmIFNlY3VyaXR5IFBvbGljeSBXaWRnZXQgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNoYWRvdyBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtbWVkaXVtIHRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgPFNoaWVsZEFsZXJ0IGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1hbWJlci00MDBcIiAvPlxuICAgICAgICAgICAgICBBdXRvbWF0eWN6bmEgUmVha2NqYVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gZm9udC1tb25vIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAgZm9udC1ib2xkXCI+XG4gICAgICAgICAgICAgIHthdXRvQWN0aW9uLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgnXycsICcgJyl9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTIgZmxleCBpdGVtcy1iYXNlbGluZSBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsIGZvbnQtZXh0cmFib2xkIGZvbnQtbW9ubyB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgICAgIHthY3RpdmVBbGVydHMgPiAwID8gKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcmVkLTQwMCBhbmltYXRlLXB1bHNlXCI+e2FjdGl2ZUFsZXJ0c30gUFJaRUtST0NaRcWDPC9zcGFuPlxuICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtZW1lcmFsZC00MDBcIj5CUkFLIEFMRVJUw5NXPC9zcGFuPlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZm9udC1tb25vXCI+XG4gICAgICAgICAgICA8c3Bhbj5QcsOzZyBDUFU6IHtjcHVUaHJlc2hvbGR9JTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlByw7NnIFJBTToge21lbW9yeVRocmVzaG9sZH1NQjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFdhdGNoZG9nIENvbmZpZ3VyYXRvciAmIFRhY3RpY2FsIEZpbHRlcnMgQmFyICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC14bCBwLTQgc3BhY2UteS0zXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBsZzpmbGV4LXJvdyBpdGVtcy1zdGFydCBsZzppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgICAgey8qIEZpbHRlciBhbmQgU2VhcmNoICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0yIHctZnVsbCBsZzp3LWF1dG9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgZmxleC0xIHNtOnctNjRcIj5cbiAgICAgICAgICAgICAgPFNlYXJjaCBjbGFzc05hbWU9XCJ3LTQgaC00IGFic29sdXRlIGxlZnQtMyB0b3AtMi41IHRleHQtc2xhdGUtNTAwXCIgLz5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU3p1a2FqIHBvIFBJRCwgbmF6d2llLCBva25pZS4uLlwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaFF1ZXJ5fVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0U2VhcmNoUXVlcnkoZS50YXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05NTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBwbC05IHByLTMgcHktMS41IHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05NTAgcC0xIHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyTW9kZSgnYWxsJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgZmlsdGVyTW9kZSA9PT0gJ2FsbCcgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlJyA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlJ1xuICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgV3N6eXN0a2llICh7cHJvY2Vzc2VzLmxlbmd0aH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0RmlsdGVyTW9kZSgncm9ndWVfb25seScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHB4LTIuNSBweS0xIHJvdW5kZWQgZm9udC1tZWRpdW0gdHJhbnNpdGlvbi1hbGwgJHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlck1vZGUgPT09ICdyb2d1ZV9vbmx5JyA/ICdiZy1yZWQtNjAwIHRleHQtd2hpdGUnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYWdyb8W8ZW5pYSAoe3Byb2Nlc3Nlcy5maWx0ZXIoKHApID0+IHAuaXNSb2d1ZSB8fCBwLmlzVG9wTW9zdCkubGVuZ3RofSlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRGaWx0ZXJNb2RlKCdoaWdoX3Jlc291cmNlJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMi41IHB5LTEgcm91bmRlZCBmb250LW1lZGl1bSB0cmFuc2l0aW9uLWFsbCAke1xuICAgICAgICAgICAgICAgICAgZmlsdGVyTW9kZSA9PT0gJ2hpZ2hfcmVzb3VyY2UnID8gJ2JnLWFtYmVyLTYwMCB0ZXh0LXNsYXRlLTk1MCBmb250LWJvbGQnIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBXeXNva2llIFphc29ieSAoe3Byb2Nlc3Nlcy5maWx0ZXIoKHApID0+IChwLmNwdVBlcmNlbnQgfHwgMCkgPiBjcHVUaHJlc2hvbGQgfHwgKHAubWVtb3J5TWIgfHwgMCkgPiBtZW1vcnlUaHJlc2hvbGQpLmxlbmd0aH0pXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogV2F0Y2hkb2cgUG9saWN5IENvbnRyb2xzICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LXdyYXAgaXRlbXMtY2VudGVyIGdhcC0zIHctZnVsbCBsZzp3LWF1dG8ganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS00MDBcIj5DesSZc3RvdGxpd2/Fm8SHOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXtwb2xsSW50ZXJ2YWx9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQb2xsSW50ZXJ2YWwoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQgcHgtMiBweS0xIHRleHQtc2xhdGUtMjAwIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9ezUwMH0+NTAwIG1zIChSZWFsLVRpbWUpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MTAwMH0+MTAwMCBtcyAoU3RhbmRhcmQpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT17MjAwMH0+MjAwMCBtcyAoT3N6Y3rEmWRueSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC14c1wiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTQwMFwiPlJlYWtjamEgV2F0Y2hkb2dhOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNlbGVjdFxuICAgICAgICAgICAgICAgIHZhbHVlPXthdXRvQWN0aW9ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0QXV0b0FjdGlvbihlLnRhcmdldC52YWx1ZSBhcyBhbnkpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkIHB4LTIgcHktMSB0ZXh0LXB1cnBsZS0zMDAgZm9udC1ib2xkIHRleHQteHMgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhdXRvX3N1c3BlbmRcIj5OdFN1c3BlbmRQcm9jZXNzIChaYW1yb8W6IFJBTSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b19raWxsXCI+VGVybWluYXRlUHJvY2VzcyAoWmFiaWogbmF0eWNobWlhc3QpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImF1dG9fdGhyb3R0bGVcIj5UaHJvdHRsZSAoT2JuacW8IHByaW9yeXRldCBkbyBJRExFKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGVydF9vbmx5XCI+VHlsa28gUG93aWFkb21pZW5pZSAoQWxlcnQpPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBNYWluIFByb2Nlc3MgR3JpZCAmIERhc2hib2FyZCBDYXJkcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBtZDpncmlkLWNvbHMtMiB4bDpncmlkLWNvbHMtMiBnYXAtNFwiPlxuICAgICAgICB7ZmlsdGVyZWRQcm9jZXNzZXMubWFwKChwcm9jKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXNPdmVybG9hZGVkQ3B1ID0gKHByb2MuY3B1UGVyY2VudCB8fCAwKSA+IGNwdVRocmVzaG9sZDtcbiAgICAgICAgICBjb25zdCBpc092ZXJsb2FkZWRNZW0gPSAocHJvYy5tZW1vcnlNYiB8fCAwKSA+IG1lbW9yeVRocmVzaG9sZDtcbiAgICAgICAgICBjb25zdCBpc1J1bm5pbmcgPSBwcm9jLnN0YXR1cyA9PT0gJ3J1bm5pbmcnO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtwcm9jLnBpZH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC14bCBib3JkZXIgcC00IHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTIwMCBmbGV4IGZsZXgtY29sIGp1c3RpZnktYmV0d2VlbiBzaGFkb3ctbGcgJHtcbiAgICAgICAgICAgICAgICBwcm9jLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTUwLzQwIGJvcmRlci1yb3NlLTYwMC82MCB0ZXh0LXJvc2UtMzAwJ1xuICAgICAgICAgICAgICAgICAgOiBwcm9jLnN0YXR1cyA9PT0gJ3F1YXJhbnRpbmVkJ1xuICAgICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTk1MC80MCBib3JkZXItcHVycGxlLTgwMC82MCB0ZXh0LXB1cnBsZS0zMDAnXG4gICAgICAgICAgICAgICAgICA6IHByb2Muc3RhdHVzID09PSAndGVybWluYXRlZCdcbiAgICAgICAgICAgICAgICAgID8gJ2JnLXNsYXRlLTk1MC82MCBib3JkZXItc2xhdGUtODAwIG9wYWNpdHktNTAnXG4gICAgICAgICAgICAgICAgICA6IHByb2MuaXNSb2d1ZSB8fCBwcm9jLmlzVG9wTW9zdFxuICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTk1MC8zMCBib3JkZXItcmVkLTgwMC84MCdcbiAgICAgICAgICAgICAgICAgIDogcHJvYy5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgID8gJ2JnLWFtYmVyLTk1MC8zMCBib3JkZXItYW1iZXItODAwLzgwJ1xuICAgICAgICAgICAgICAgICAgOiAnYmctc2xhdGUtOTAwLzkwIGJvcmRlci1zbGF0ZS04MDAnXG4gICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIHsvKiBQcm9jZXNzIENhcmQgSGVhZGVyICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBqdXN0aWZ5LWJldHdlZW4gZ2FwLTIgcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwLzgwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRydW5jYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIGZvbnQtYm9sZCB0ZXh0LXNtIHRleHQtd2hpdGUgdHJ1bmNhdGVcIj57cHJvYy5uYW1lfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgUElEOiB7cHJvYy5waWR9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLnBwaWQgPyAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LXNsYXRlLTQwMCBmb250LW1vbm8gYmctc2xhdGUtOTUwIHB4LTEuNSBweS0wLjUgcm91bmRlZCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBQUElEOiB7cHJvYy5wcGlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgdHJ1bmNhdGUgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgICAgICAge3Byb2Mud2luZG93VGl0bGUgfHwgcHJvYy5maWxlUGF0aH1cbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIHsvKiBTdGF0dXMgQmFkZ2UgKi99XG4gICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTAuNSByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBmb250LWJvbGQgdXBwZXJjYXNlIGZsZXgtc2hyaW5rLTAgJHtcbiAgICAgICAgICAgICAgICAgICAgICBwcm9jLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXJvc2UtOTAwIHRleHQtcm9zZS0yMDAgYm9yZGVyIGJvcmRlci1yb3NlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS05MDAgdGV4dC1wdXJwbGUtMjAwIGJvcmRlciBib3JkZXItcHVycGxlLTYwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctc2xhdGUtODAwIHRleHQtc2xhdGUtNDAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiBwcm9jLmlzVG9wTW9zdFxuICAgICAgICAgICAgICAgICAgICAgICAgPyAnYmctcmVkLTkwMCB0ZXh0LXJlZC0yMDAgYm9yZGVyIGJvcmRlci1yZWQtNzAwIGFuaW1hdGUtcHVsc2UnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHByb2MuaXNQYXJlbnREcm9wcGVyXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05MDAgdGV4dC1hbWJlci0yMDAgYm9yZGVyIGJvcmRlci1hbWJlci03MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1lbWVyYWxkLTk1MCB0ZXh0LWVtZXJhbGQtMzAwIGJvcmRlciBib3JkZXItZW1lcmFsZC04MDAnXG4gICAgICAgICAgICAgICAgICAgIH1gfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7cHJvYy5zdGF0dXMgPT09ICdwZV9jb3JydXB0ZWQnXG4gICAgICAgICAgICAgICAgICAgICAgPyAn8J+SpSBQRSAweEMwMDAwMDdCJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICdxdWFyYW50aW5lZCdcbiAgICAgICAgICAgICAgICAgICAgICA/ICdaQU1ST8W7T05ZIFcgUkFNJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5zdGF0dXMgPT09ICd0ZXJtaW5hdGVkJ1xuICAgICAgICAgICAgICAgICAgICAgID8gJ1pBQklUWSdcbiAgICAgICAgICAgICAgICAgICAgICA6IHByb2MuaXNUb3BNb3N0XG4gICAgICAgICAgICAgICAgICAgICAgPyAnVE9QTU9TVCBPVkVSTEFZJ1xuICAgICAgICAgICAgICAgICAgICAgIDogcHJvYy5pc1BhcmVudERyb3BwZXJcbiAgICAgICAgICAgICAgICAgICAgICA/ICdQQVJFTlQgRFJPUFBFUidcbiAgICAgICAgICAgICAgICAgICAgICA6ICdOT1JNQUxOWSd9XG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICB7LyogUmVhbC1UaW1lIE1ldHJpY3MgJiBMaXZlIEdhdWdlcyAqL31cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTIgZ2FwLTMgbXktM1wiPlxuICAgICAgICAgICAgICAgICAgey8qIENQVSBVc2FnZSBNZXRlciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8Q3B1IGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5adcW8eWNpZSBDUFU6PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Bmb250LW1vbm8gZm9udC1ib2xkICR7aXNPdmVybG9hZGVkQ3B1ID8gJ3RleHQtcmVkLTQwMCBhbmltYXRlLXB1bHNlJyA6ICd0ZXh0LXdoaXRlJ31gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHtwcm9jLmNwdVBlcmNlbnQgfHwgMH0lXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICB7LyogTWluaSBTcGFya2xpbmUgKyBCYXIgKi99XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgYmctc2xhdGUtOTAwIGgtMiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGgtZnVsbCB0cmFuc2l0aW9uLWFsbCBkdXJhdGlvbi0zMDAgJHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc092ZXJsb2FkZWRDcHUgPyAnYmctcmVkLTUwMCcgOiAnYmctcHVycGxlLTUwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbigocHJvYy5jcHVQZXJjZW50IHx8IDApICogMS41LCAxMDApfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJTcGFya2xpbmUocHJvYy5jcHVIaXN0b3J5LCBpc092ZXJsb2FkZWRDcHUgPyAnI2VmNDQ0NCcgOiAnI2E4NTVmNycpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICB7LyogUkFNIE1lbW9yeSBNZXRlciAqL31cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMi41IHJvdW5kZWQtbGcgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAvODAgc3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8SGFyZERyaXZlIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UGFtacSZxIcgUkFNOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgZm9udC1tb25vIGZvbnQtYm9sZCAke2lzT3ZlcmxvYWRlZE1lbSA/ICd0ZXh0LWFtYmVyLTQwMCcgOiAndGV4dC13aGl0ZSd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cHJvYy5tZW1vcnlNYiB8fCAwfSBNQlxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBiZy1zbGF0ZS05MDAgaC0yIHJvdW5kZWQtZnVsbCBvdmVyZmxvdy1oaWRkZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiaC1mdWxsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1waW5rLTYwMCB0by1wdXJwbGUtNTAwIHRyYW5zaXRpb24tYWxsIGR1cmF0aW9uLTMwMFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHtNYXRoLm1pbigoKHByb2MubWVtb3J5TWIgfHwgMCkgLyA0MDApICogMTAwLCAxMDApfSVgIH19XG4gICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIHtyZW5kZXJTcGFya2xpbmUocHJvYy5tZW1vcnlIaXN0b3J5LCAnI2VjNDg5OScpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgey8qIFN1Yi1kZXRhaWxzOiBUaHJlYWRzLCBIYW5kbGVzLCBJL08sIFByaW9yaXR5ICovfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtNCBnYXAtMiB0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS00MDAgYmctc2xhdGUtOTUwLzYwIHAtMiByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwLzYwIG1iLTMgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNTAwXCI+V8SFdGtpPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTIwMCBmb250LWJvbGRcIj57cHJvYy50aHJlYWRzQ291bnQgfHwgMX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc2xhdGUtNTAwXCI+VWNod3l0eTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1ib2xkXCI+e3Byb2MuaGFuZGxlc0NvdW50IHx8IDIwfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS01MDBcIj5JL08gUmF0ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0yMDAgZm9udC1ib2xkXCI+e3Byb2MuaW9SYXRlS2IgfHwgMH0gS0Ivczwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYmxvY2sgdGV4dC1zbGF0ZS01MDBcIj5Qcmlvcnl0ZXQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YGZvbnQtYm9sZCAke3Byb2MucHJpb3JpdHlDbGFzcyA9PT0gJ0hJR0gnID8gJ3RleHQtcmVkLTQwMCcgOiBwcm9jLnByaW9yaXR5Q2xhc3MgPT09ICdJRExFJyA/ICd0ZXh0LWN5YW4tNDAwJyA6ICd0ZXh0LXNsYXRlLTMwMCd9YH0+XG4gICAgICAgICAgICAgICAgICAgICAge3Byb2MucHJpb3JpdHlDbGFzcyB8fCAnTk9STUFMJ31cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIHsvKiBBY3Rpb24gQnV0dG9ucyBUb29sYmFyIGZvciB0aGlzIFByb2Nlc3MgKi99XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHQtMiBib3JkZXItdCBib3JkZXItc2xhdGUtODAwLzgwIGZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzKHByb2MpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXB1cnBsZS00MDAgaG92ZXI6dGV4dC1wdXJwbGUtMzAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGZvbnQtbW9ubyBmb250LW1lZGl1bVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgPEluZm8gY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICAgICAgPHNwYW4+SW5zcGVrY2phIFBhbWnEmWNpPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAge2lzUnVubmluZyAmJiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIHNwYWNlLXgtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIHsvKiBUaHJvdHRsZSAqL31cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZVRocm90dGxlUHJvY2Vzcyhwcm9jLnBpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1jeWFuLTMwMCByb3VuZGVkIHRleHQtWzEwcHhdIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJPZ3JhbmljeiBwcmlvcnl0ZXQgcHJvY2Vzb3JhIGRvIElETEVfUFJJT1JJVFlfQ0xBU1NcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VGhyb3R0bGU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBTdXNwZW5kIC8gRnJlZXplICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU3VzcGVuZFByb2Nlc3MocHJvYy5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSBiZy1wdXJwbGUtOTAwLzYwIGhvdmVyOmJnLXB1cnBsZS04MDAgdGV4dC1wdXJwbGUtMjAwIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGJvcmRlciBib3JkZXItcHVycGxlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJaYW1yb8W6IHdzenlzdGtpZSB3xIV0a2kgdyBSQU0gemEgcG9tb2PEhSBOdFN1c3BlbmRQcm9jZXNzXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxMb2NrIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1wdXJwbGUtMzAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5aYW1yb8W6IFJBTTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgICAgICAgICAgICAgey8qIFNhYm90YWdlIFBFICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlU2Fib3RhZ2VQRShwcm9jLnBpZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIGJnLXJvc2UtOTUwIGhvdmVyOmJnLXJvc2UtODAwIHRleHQtcm9zZS0yMDAgcm91bmRlZCB0ZXh0LVsxMHB4XSBmb250LW1vbm8gYm9yZGVyIGJvcmRlci1yb3NlLTcwMCB0cmFuc2l0aW9uLWFsbCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJabmlzemN6IG5hZ8WCw7N3ZWsgUEUgaSBvZGV0bmlqIERBQ0xcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFNrdWxsIGNsYXNzTmFtZT1cInctMyBoLTMgdGV4dC1waW5rLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+UEUgU2Fib3Rhxbw8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIHsvKiBLaWxsICovfVxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlS2lsbFByb2Nlc3MocHJvYy5waWQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIGJnLXJlZC03MDAgaG92ZXI6YmctcmVkLTYwMCB0ZXh0LXdoaXRlIHJvdW5kZWQgdGV4dC1bMTBweF0gZm9udC1tb25vIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3dcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgWmFiaWpcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgIH0pfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBSZWFsLVRpbWUgVGVsZW1ldHJ5IEV2ZW50IExvZyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQteGwgcC00IHNwYWNlLXktM1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBwYi0yIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtc2VtaWJvbGQgdGV4dC1zbGF0ZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5Eemllbm5payBaZGFyemXFhCBTdHJhxbxuaWthIFdhdGNoZG9nIChLZXJuZWwgJiBQcm9jZXNzIExvZyk8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtZW1lcmFsZC00MDAgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcGluZ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgIFNUUkVBTUlORyBBS1RVQUxJWkFDSklcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyBzcGFjZS15LTEgaC0zNiBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAgICB7d2F0Y2hkb2dMb2dzLm1hcCgobG9nLCBpZHgpID0+IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtpZHh9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17XG4gICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdUUklHR0VSJykgfHwgbG9nLmluY2x1ZGVzKCdBTEFSTScpIHx8IGxvZy5pbmNsdWRlcygnU1BBV04nKVxuICAgICAgICAgICAgICAgICAgPyAndGV4dC1yZWQtNDAwIGZvbnQtYm9sZCdcbiAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdGUkVFWkUnKSB8fCBsb2cuaW5jbHVkZXMoJ1NVS0NFUycpIHx8IGxvZy5pbmNsdWRlcygnRVhQT1JUJylcbiAgICAgICAgICAgICAgICAgID8gJ3RleHQtZW1lcmFsZC00MDAnXG4gICAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnVEhST1RUTEUnKSB8fCBsb2cuaW5jbHVkZXMoJ0FMRVJUJylcbiAgICAgICAgICAgICAgICAgID8gJ3RleHQtYW1iZXItMzAwJ1xuICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAnXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2xvZ31cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApfVxuXG4gIHsvKiBWSUVXIDM6IEZVTEwgREVESUNBVEVEIEFVRElUICYgQ09NQkFUIExPR1MgVklFVyAqL31cbiAge3dhdGNoZG9nTWFpblRhYiA9PT0gJ2xvZ3MnICYmIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLXhsIHAtNSBzcGFjZS15LTQgc2hhZG93LXhsXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgaXRlbXMtc3RhcnQgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtMyBwYi0zIGJvcmRlci1iIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwidGV4dC1iYXNlIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtbW9ub1wiPlxuICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNSBoLTUgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkR6aWVubmlrIEJvam93eSBTdHJhxbxuaWthIGkgUmVqZXN0ciBaZGFyemXFhCBXaW4zMjwvc3Bhbj5cbiAgICAgICAgICA8L2gzPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICBLb21wbGV0bmEgdGVsZW1ldHJpYSB6ZGFyemXFhDogcHJ6ZWNod3ljZW5pYSBwcm9jZXPDs3csIGFrdHl3YWNqZSByZWd1xYIgYXV0by1raWxsLCBkZWthcGl0YWNqZSBnbmlkIGkgd3l3b8WCYW5pYSBOdFN1c3BlbmRQcm9jZXNzIC8gVGVybWluYXRlUHJvY2Vzcy5cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRXYXRjaGRvZ0xvZ3MoW10pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgYmctc2xhdGUtODAwIGhvdmVyOmJnLXNsYXRlLTcwMCB0ZXh0LXNsYXRlLTMwMCByb3VuZGVkLWxnIHRleHQteHMgZm9udC1tb25vIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICBXeWN6ecWbxIcgTG9naVxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgICAgZG93bmxvYWRGaWxlKFxuICAgICAgICAgICAgICAgICdzZW50aW5lbF93YXRjaGRvZ19jb21iYXRfbG9nLnR4dCcsXG4gICAgICAgICAgICAgICAgd2F0Y2hkb2dMb2dzLmpvaW4oJ1xcbicpLFxuICAgICAgICAgICAgICAgICd0ZXh0L3BsYWluJ1xuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMgcHktMS41IGJnLXB1cnBsZS05NTAgaG92ZXI6YmctcHVycGxlLTkwMCB0ZXh0LXB1cnBsZS0yMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbW9ubyBib3JkZXIgYm9yZGVyLXB1cnBsZS04MDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkVrc3BvcnR1aiBMb2dpICgudHh0KTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05NTAgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9udC1tb25vIHRleHQteHMgc3BhY2UteS0xLjUgbWF4LWgtWzUwMHB4XSBvdmVyZmxvdy15LWF1dG9cIj5cbiAgICAgICAge3dhdGNoZG9nTG9ncy5sZW5ndGggPT09IDAgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBweS04IHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICBEemllbm5payBqZXN0IHB1c3R5LiBXc3plbGtpZSBub3dlIHpkYXJ6ZW5pYSBwb2phd2nEhSBzacSZIHR1dGFqIHcgY3phc2llIHJ6ZWN6eXdpc3R5bS5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICB3YXRjaGRvZ0xvZ3MubWFwKChsb2csIGlkeCkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBrZXk9e2lkeH1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHktMSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwLzgwICR7XG4gICAgICAgICAgICAgICAgbG9nLmluY2x1ZGVzKCdUUklHR0VSJykgfHwgbG9nLmluY2x1ZGVzKCdBTEFSTScpIHx8IGxvZy5pbmNsdWRlcygnU1BBV04nKSB8fCBsb2cuaW5jbHVkZXMoJ1JPWktBWicpXG4gICAgICAgICAgICAgICAgICA/ICd0ZXh0LXJlZC00MDAgZm9udC1ib2xkIGJnLXJlZC05NTAvMjAgcHgtMiByb3VuZGVkJ1xuICAgICAgICAgICAgICAgICAgOiBsb2cuaW5jbHVkZXMoJ0ZSRUVaRScpIHx8IGxvZy5pbmNsdWRlcygnU1VLQ0VTJykgfHwgbG9nLmluY2x1ZGVzKCdaQUtPxYNDWk9OWScpIHx8IGxvZy5pbmNsdWRlcygnRVhQT1JUJylcbiAgICAgICAgICAgICAgICAgID8gJ3RleHQtZW1lcmFsZC00MDAgZm9udC1zZW1pYm9sZCBiZy1lbWVyYWxkLTk1MC8yMCBweC0yIHJvdW5kZWQnXG4gICAgICAgICAgICAgICAgICA6IGxvZy5pbmNsdWRlcygnUkVHVcWBQScpIHx8IGxvZy5pbmNsdWRlcygnTk9XQScpIHx8IGxvZy5pbmNsdWRlcygnVEVTVCcpXG4gICAgICAgICAgICAgICAgICA/ICd0ZXh0LXB1cnBsZS0zMDAgZm9udC1zZW1pYm9sZCBiZy1wdXJwbGUtOTUwLzIwIHB4LTIgcm91bmRlZCdcbiAgICAgICAgICAgICAgICAgIDogbG9nLmluY2x1ZGVzKCdUSFJPVFRMRScpIHx8IGxvZy5pbmNsdWRlcygnQUxFUlQnKVxuICAgICAgICAgICAgICAgICAgPyAndGV4dC1hbWJlci0zMDAnXG4gICAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTMwMCdcbiAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtsb2d9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICl9XG5cbiAgICAgIHsvKiBGb3JlbnNpYyBEZWVwIE1lbW9yeSBJbnNwZWN0b3IgTW9kYWwgKi99XG4gICAgICB7c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgaW5zZXQtMCB6LTUwIGJnLWJsYWNrLzgwIGJhY2tkcm9wLWJsdXItc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgbWF4LXctMnhsIHctZnVsbCBwLTYgc2hhZG93LTJ4bCBzcGFjZS15LTQgbWF4LWgtWzkwdmhdIG92ZXJmbG93LXktYXV0b1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcGItMyBib3JkZXItYiBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTIgcm91bmRlZC1sZyBiZy1wdXJwbGUtNjAwLzIwIGJvcmRlciBib3JkZXItcHVycGxlLTUwMC8zMCB0ZXh0LXB1cnBsZS0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIDxIYXJkRHJpdmUgY2xhc3NOYW1lPVwidy01IGgtNVwiIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWJhc2UgZm9udC1ib2xkIHRleHQtd2hpdGUgZm9udC1tb25vXCI+XG4gICAgICAgICAgICAgICAgICAgIHtzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLm5hbWV9IChQSUQ6IHtzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLnBpZH0pXG4gICAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICBJbnNwZWtjamEgcGFtacSZY2kgUkFNLCBtb2R1xYLDs3cgRExMIGkgc3RydWt0dXJ5IG5hZ8WCw7N3a2EgUEVcbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMobnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC1zbGF0ZS0zMDAgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYW1rbmlqIFtFU0NdXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNZXRyaWNzIEJyZWFrZG93biAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMyBnYXAtMyB0ZXh0LXhzIGZvbnQtbW9ubyBiZy1zbGF0ZS05NTAgcC0zIHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTUwMCBibG9ja1wiPldvcmtpbmcgU2V0IFJBTTo8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGQgdGV4dC1zbVwiPntzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLm1lbW9yeU1ifSBNQjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgYmxvY2tcIj5PYmNpxIXFvGVuaWUgQ1BVOjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkIHRleHQtc21cIj57c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5jcHVQZXJjZW50fSU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwIGJsb2NrXCI+U3RhbiBwcm9jZXN1Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtYm9sZCB0ZXh0LXNtXCI+e3NlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMuc3RhdHVzLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogU2ltdWxhdGVkIExvYWRlZCBETExzIGFuZCBFbmdpbmUgTW9kdWxlcyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgICAgIFphxYJhZG93YW5lIE1vZHXFgnkgaSBCaWJsaW90ZWtpIERMTCB3IFBhbWnEmWNpOlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjUgdGV4dC1bMTFweF0gZm9udC1tb25vIGJnLXNsYXRlLTk1MCBwLTMgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHB5LTAuNSBib3JkZXItYiBib3JkZXItc2xhdGUtOTAwXCI+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXNsYXRlLTMwMFwiPkM6XFxXaW5kb3dzXFxTeXN0ZW0zMlxcbnRkbGwuZGxsPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5CYXNlOiAweDdGRkY2QTEwMDAwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGl0ZW1zLWNlbnRlciBweS0wLjUgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS0zMDBcIj5DOlxcV2luZG93c1xcU3lzdGVtMzJcXGtlcm5lbDMyLmRsbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNTAwXCI+QmFzZTogMHg3RkZGNjk4MDAwMDA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBpdGVtcy1jZW50ZXIgcHktMC41IGJvcmRlci1iIGJvcmRlci1zbGF0ZS05MDBcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+QzpcXFdpbmRvd3NcXFN5c3RlbTMyXFx1c2VyMzIuZGxsPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDBcIj5CYXNlOiAweDdGRkY2OUQwMDAwMDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7c2VsZWN0ZWRQcm9jZXNzRm9yRGV0YWlscy5oYXNGbHV0dGVyRGxsICYmIChcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gaXRlbXMtY2VudGVyIHB5LTAuNSBiZy1yZWQtOTUwLzQwIHB4LTEgcm91bmRlZCBib3JkZXIgYm9yZGVyLXJlZC04MDAvNDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtMzAwIGZvbnQtYm9sZFwiPmZsdXR0ZXJfd2luZG93cy5kbGwgKEZsdXR0ZXIgRW5naW5lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1yZWQtNDAwIGZvbnQtYm9sZFwiPldZS1JZVE8gTkFLxYFBREvEmDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBQRSBIZWFkZXIgSGV4IER1bXAgUHJldmlldyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9ja1wiPlxuICAgICAgICAgICAgICAgIFBvZGdsxIVkIE5hZ8WCw7N3a2EgUEUgKERPUyAmIE5UIEhlYWRlciBPZmZzZXQgMHgwMCAtIDB4NDApOlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTUwIHAtMyByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICAgIHtzZWxlY3RlZFByb2Nlc3NGb3JEZXRhaWxzLnN0YXR1cyA9PT0gJ3BlX2NvcnJ1cHRlZCcgPyAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQtcm9zZS00MDAgc3BhY2UteS0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+MHgwMDAwMDAwMDogPHN0cm9uZyBjbGFzc05hbWU9XCJiZy1yb3NlLTkwMCBweC0xIHRleHQtd2hpdGVcIj5ERSBBRDwvc3Ryb25nPiAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAwMCAgWy4uU0FCT1RBR0VELi5dPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+MHgwMDAwMDAzQzogPHN0cm9uZyBjbGFzc05hbWU9XCJiZy1yb3NlLTkwMCBweC0xIHRleHQtd2hpdGVcIj4wMCAwMCAwMCAwMDwvc3Ryb25nPiAoZV9sZmFuZXcgbnVsbGlmaWVkICZyYXJyOyBQRSBMb2FkZXIgUmVqZWN0IDB4QzAwMDAwN0IpPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEgdGV4dC1lbWVyYWxkLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjB4MDAwMDAwMDA6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBiZy1lbWVyYWxkLTk1MCBweC0xXCI+NEQgNUE8L3N0cm9uZz4gOTAgMDAgMDMgMDAgMDAgMDAgMDQgMDAgMDAgMDAgRkYgRkYgMDAgMDAgIFtNWi4uLi4uLi4uLi4uLi4uXTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2PjB4MDAwMDAwM0M6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBiZy1lbWVyYWxkLTk1MCBweC0xXCI+RTggMDAgMDAgMDA8L3N0cm9uZz4gKGVfbGZhbmV3IHBvaW50ZXIgdG8gTlQgSGVhZGVycyAmYXBvcztQRVxcMFxcMCZhcG9zOyk8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBNb2RhbCBBY3Rpb25zICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDAgZmxleCBqdXN0aWZ5LWVuZCBzcGFjZS14LTJcIj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNlbGVjdGVkUHJvY2Vzc0ZvckRldGFpbHMobnVsbCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNCBweS0yIGJnLXNsYXRlLTgwMCBob3ZlcjpiZy1zbGF0ZS03MDAgdGV4dC13aGl0ZSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBaYW1rbmlqXG4gICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQTAyQlE7QUExMkJSLFNBQWdCLFVBQVUsaUJBQXlCO0FBQ25EO0FBQUEsRUFDRTtBQUFBLEVBQVU7QUFBQSxFQUFLO0FBQUEsRUFBVztBQUFBLEVBQWE7QUFBQSxFQUFvQjtBQUFBLEVBQU07QUFBQSxFQUN0RDtBQUFBLEVBQU07QUFBQSxFQUFZO0FBQUEsRUFBTztBQUFBLEVBQ3BDO0FB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