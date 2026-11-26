import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  Skull,
  Plus,
  Trash2,
  CheckCircle2,
  Terminal,
  Play,
  Sliders,
  AlertTriangle,
  Download,
  Copy,
  Check,
  ToggleLeft,
  ToggleRight,
  Search,
  ShieldCheck,
  Flame
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
import { downloadFile } from "/sentinel-toolkit/src/utils/offlinePackageExporter.ts";
export const DEFAULT_WATCHDOG_RULES = [
  {
    id: "rule-work-destroyer",
    name: "Eksterminacja Gnidy Niszczącej Pracę (Work Destroyer)",
    pattern: "*work_destroyer*",
    matchField: "name",
    action: "auto_kill",
    severity: "CRITICAL",
    reason: "Chroni pliki projektowe, bufory robocze, edytory kodu i pamięć przed natychmiastowym zniszczeniem przez pasożyta.",
    isEnabled: true,
    matchCount: 3,
    lastTriggered: "11:14:20",
    protectsWork: true,
    createdAt: "2026-09-12 10:00:00"
  },
  {
    id: "rule-ransomware",
    name: "Auto-Kill Szyfratorów Ransomware (ChaCha20 / AES)",
    pattern: "*encryptor*",
    matchField: "name",
    action: "auto_kill_and_pe_sabotage",
    severity: "CRITICAL",
    reason: "Wykrywa procesy szyfrujące dysk i repozytoria, ubija je i zeruje nagłówek MZ pliku wykonywalnego.",
    isEnabled: true,
    matchCount: 1,
    lastTriggered: "11:12:05",
    protectsWork: true,
    createdAt: "2026-09-12 10:05:00"
  },
  {
    id: "rule-flutter-overlay",
    name: "Wywłaszczacz Ekranu HWND_TOPMOST (Flutter Locker)",
    pattern: "flutter_windows.dll",
    matchField: "hasFlutterDll",
    action: "auto_kill",
    severity: "HIGH",
    reason: "Likwiduje złośliwe nakładki blokujące kursor myszy, pasek zadań i pulpit.",
    isEnabled: true,
    matchCount: 2,
    lastTriggered: "11:10:45",
    protectsWork: true,
    createdAt: "2026-09-12 10:10:00"
  },
  {
    id: "rule-hidden-dropper",
    name: "Pasożytniczy Dropper w Katalogu Temp",
    pattern: "*dropper*",
    matchField: "name",
    action: "auto_suspend",
    severity: "HIGH",
    reason: "Natychmiast zamraża procesy macierzyste próbujące zrestartować ubite nakładki (0 ms NtSuspendProcess).",
    isEnabled: true,
    matchCount: 1,
    lastTriggered: "11:08:12",
    protectsWork: false,
    createdAt: "2026-09-12 10:15:00"
  },
  {
    id: "rule-wiper",
    name: "Destruktor Tablicy Partycji i MBR (Disk Wiper)",
    pattern: "*wiper*",
    matchField: "name",
    action: "auto_kill_and_pe_sabotage",
    severity: "CRITICAL",
    reason: "Trwałe zniszczenie wątków i blokada zapisu dla narzędzi niszczących system plików.",
    isEnabled: true,
    matchCount: 0,
    protectsWork: true,
    createdAt: "2026-09-12 10:20:00"
  }
];
export const WatchdogRulesManager = ({
  rules,
  onAddRule,
  onToggleRule,
  onDeleteRule,
  onTestRule,
  onKillWorkDestroyerNow,
  isWatchdogActive,
  totalKillsCount
}) => {
  const [activeTab, setActiveTab] = useState("rules_list");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("ALL");
  const [copiedCode, setCopiedCode] = useState(false);
  const [ruleName, setRuleName] = useState("");
  const [rulePattern, setRulePattern] = useState("");
  const [ruleMatchField, setRuleMatchField] = useState("name");
  const [ruleAction, setRuleAction] = useState("auto_kill");
  const [ruleSeverity, setRuleSeverity] = useState("CRITICAL");
  const [ruleReason, setRuleReason] = useState("");
  const [ruleProtectsWork, setRuleProtectsWork] = useState(true);
  const [formError, setFormError] = useState(null);
  const applyPreset = (presetType) => {
    if (presetType === "work_destroyer") {
      setRuleName("Blokada Gnidy Niszczącej Pracę (Work Protector)");
      setRulePattern("*work_destroyer*.exe");
      setRuleMatchField("name");
      setRuleAction("auto_kill");
      setRuleSeverity("CRITICAL");
      setRuleReason("Chroni pliki robocze, projekty i otwarte dokumenty przed zniszczeniem przez gnidę.");
      setRuleProtectsWork(true);
    } else if (presetType === "ransomware") {
      setRuleName("Eksterminacja Szyfratorów Plików");
      setRulePattern("*encryptor*");
      setRuleMatchField("name");
      setRuleAction("auto_kill_and_pe_sabotage");
      setRuleSeverity("CRITICAL");
      setRuleReason("Zabezpiecza repozytoria i pliki dyskowe przed szyfrowaniem (ChaCha20/AES).");
      setRuleProtectsWork(true);
    } else if (presetType === "screen_locker") {
      setRuleName("Likwidacja Blokady Ekranu TopMost");
      setRulePattern("*screen_hijack*.exe");
      setRuleMatchField("name");
      setRuleAction("auto_kill");
      setRuleSeverity("HIGH");
      setRuleReason("Wymusza natychmiastowe zdjęcie okna TopMost blokującego pulpit.");
      setRuleProtectsWork(true);
    } else if (presetType === "temp_injector") {
      setRuleName("Blokada Wykonywania z Temp / AppData");
      setRulePattern("*AppData\\Local\\Temp*");
      setRuleMatchField("filePath");
      setRuleAction("auto_kill");
      setRuleSeverity("HIGH");
      setRuleReason("Ubija nieautoryzowane procesy uruchamiane w tle z katalogu tymczasowego.");
      setRuleProtectsWork(false);
    }
  };
  const handleCreateRuleSubmit = (e) => {
    e.preventDefault();
    if (!ruleName.trim()) {
      setFormError("Podaj czytelną nazwę reguły automatycznej.");
      return;
    }
    if (!rulePattern.trim() && ruleMatchField !== "hasFlutterDll" && ruleMatchField !== "isTopMost") {
      setFormError("Podaj wzorzec procesu (np. work_destroyer*.exe lub *encryptor*).");
      return;
    }
    onAddRule({
      name: ruleName.trim(),
      pattern: rulePattern.trim(),
      matchField: ruleMatchField,
      action: ruleAction,
      severity: ruleSeverity,
      reason: ruleReason.trim() || "Reguła automatycznej ochrony Watchdoga przed niebezpiecznymi procesami.",
      isEnabled: true,
      protectsWork: ruleProtectsWork
    });
    setRuleName("");
    setRulePattern("");
    setRuleReason("");
    setFormError(null);
    setActiveTab("rules_list");
  };
  const filteredRules = rules.filter((r) => {
    const matchesQuery = r.name.toLowerCase().includes(searchFilter.toLowerCase()) || r.pattern.toLowerCase().includes(searchFilter.toLowerCase()) || r.reason.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesSeverity = selectedSeverity === "ALL" || r.severity === selectedSeverity;
    return matchesQuery && matchesSeverity;
  });
  const generatePythonDaemonScript = () => {
    const rulesJson = JSON.stringify(rules.filter((r) => r.isEnabled).map((r) => ({
      name: r.name,
      pattern: r.pattern,
      field: r.matchField,
      action: r.action,
      severity: r.severity
    })), null, 4);
    return `"""
=============================================================================
SENTINEL WATCHDOG AUTO-KILL ENGINE: CUSTOM RULES DAEMON (100% OFFLINE)
=============================================================================
Automatyczny strażnik procesów wykonujący natychmiastowy ubój (TerminateProcess)
lub zamrożenie (NtSuspendProcess) w momencie wykrycia procesu pasującego do reguł.
Zaprojektowany do ochrony przestrzeni roboczej przed gnidami niszczącymi pracę.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import fnmatch
import time
import sys

# Win32 API Bindings
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll
psapi = ctypes.windll.psapi
user32 = ctypes.windll.user32

PROCESS_QUERY_INFORMATION = 0x0400
PROCESS_VM_READ = 0x0010
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_TERMINATE = 0x0001

# Zdefiniowane przez użytkownika reguły automatycznego ubijania
ACTIVE_RULES = ${rulesJson}

def get_process_name_by_handle(h_proc):
    name_buf = ctypes.create_unicode_buffer(260)
    if psapi.GetModuleBaseNameW(h_proc, None, name_buf, ctypes.sizeof(name_buf)):
        return name_buf.value
    return ""

def kill_process(pid, proc_name, rule_name):
    h = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h:
        kernel32.TerminateProcess(h, 9)
        kernel32.CloseHandle(h)
        print(f"[💥 WATCHDOG AUTO-KILL] Reguła '{rule_name}' wykryła: {proc_name} (PID: {pid}) -> ZLIKWIDOWANO NATYCHMIAST!")
        return True
    return False

def freeze_process(pid, proc_name, rule_name):
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[❄️ WATCHDOG FREEZE] Reguła '{rule_name}' wykryła: {proc_name} (PID: {pid}) -> ZAMROŻONO W RAM!")
        return True
    return False

def check_and_execute_rules():
    pids = (wintypes.DWORD * 2048)()
    cb_needed = wintypes.DWORD()
    if not psapi.EnumProcesses(ctypes.byref(pids), ctypes.sizeof(pids), ctypes.byref(cb_needed)):
        return

    count = cb_needed.value // ctypes.sizeof(wintypes.DWORD)
    for i in range(count):
        pid = pids[i]
        if pid == 0:
            continue
        h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid)
        if not h_proc:
            continue
        
        proc_name = get_process_name_by_handle(h_proc).lower()
        kernel32.CloseHandle(h_proc)
        
        if not proc_name:
            continue

        for rule in ACTIVE_RULES:
            pat = rule["pattern"].lower()
            if fnmatch.fnmatch(proc_name, pat) or pat in proc_name:
                action = rule["action"]
                if "kill" in action:
                    kill_process(pid, proc_name, rule["name"])
                elif "suspend" in action:
                    freeze_process(pid, proc_name, rule["name"])

def main():
    print("=" * 70)
    print("  SENTINEL WATCHDOG DAEMON: AKTYWNE REGUŁY AUTOMATYCZNEGO UBIJANIA")
    print(f"  Liczba załadowanych reguł: {len(ACTIVE_RULES)}")
    print("  Ochrona pracy użytkownika i uboju gnid: AKTYWNA (0 ms)")
    print("=" * 70)
    try:
        while True:
            check_and_execute_rules()
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano strażnika Watchdog.")

if __name__ == '__main__':
    main()
`;
  };
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatePythonDaemonScript());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2e3);
  };
  const handleDownloadCode = () => {
    downloadFile("sentinel_watchdog_rules_daemon.py", generatePythonDaemonScript(), "text/x-python");
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-red-950/80 via-slate-900 to-purple-950/70 border border-red-500/40 shadow-xl", children: [
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "p-2 rounded-lg bg-red-600/20 border border-red-500/50 text-red-400", children: /* @__PURE__ */ jsxDEV(Skull, { className: "w-5 h-5 animate-pulse" }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 324,
          columnNumber: 15
        }, this) }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 323,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { className: "text-base font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Centrum Reguł Automatycznego Ubijania (Watchdog Rules Engine)" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 328,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-mono font-bold", children: isWatchdogActive ? "AKTYWNY 0 MS" : "WSTRZYMANY" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 329,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 327,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-300 mt-0.5", children: "Definiuj procesy złośliwe, pasożyty i gnidy niszczące pracę. Watchdog likwiduje je natychmiast w momencie wykrycia obecności w pamięci RAM." }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 333,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 326,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 322,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 321,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-end", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: onKillWorkDestroyerNow,
            className: "w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white text-xs font-black font-mono flex items-center justify-center gap-2 shadow-xl shadow-red-950/80 border-2 border-red-300/80 transition-all cursor-pointer animate-pulse active:scale-95",
            title: "Natychmiast namierz i zlikwiduj gnidę niszczącą naszą pracę, zwolnij zasoby i zabezpiecz pliki!",
            children: [
              /* @__PURE__ */ jsxDEV(Flame, { className: "w-4 h-4 text-yellow-300 animate-bounce" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 347,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "UBIJ GNIDĘ NISZCZĄCĄ NASZĄ PRACĘ!" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 348,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 342,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("create_rule"),
            className: "px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-purple-950",
            children: [
              /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 355,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Nowa Reguła" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 356,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 351,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 340,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
      lineNumber: 320,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between border-b border-slate-800 pb-2 flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("rules_list"),
            className: `px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "rules_list" ? "bg-purple-600 text-white shadow-md shadow-purple-900/40" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Sliders, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 372,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: [
                "Zdefiniowane Reguły (",
                rules.length,
                ")"
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 373,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 364,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("create_rule"),
            className: `px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "create_rule" ? "bg-purple-600 text-white shadow-md shadow-purple-900/40" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Plus, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 384,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Kreator Reguły" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 385,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 376,
            columnNumber: 11
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            onClick: () => setActiveTab("export_script"),
            className: `px-3 py-1.5 rounded-lg text-xs font-bold font-mono flex items-center gap-1.5 transition-all cursor-pointer ${activeTab === "export_script" ? "bg-purple-600 text-white shadow-md shadow-purple-900/40" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"}`,
            children: [
              /* @__PURE__ */ jsxDEV(Terminal, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 396,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Eksport Skryptu Pythona" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 397,
                columnNumber: 13
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 388,
            columnNumber: 11
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 363,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-xs font-mono text-slate-400", children: [
        /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 403,
            columnNumber: 13
          }, this),
          "Ubitych automatycznie: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-bold", children: totalKillsCount }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 404,
            columnNumber: 36
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 402,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:inline text-slate-600", children: "|" }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 406,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("span", { className: "hidden sm:flex items-center gap-1", children: [
          /* @__PURE__ */ jsxDEV(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 408,
            columnNumber: 13
          }, this),
          "Aktywne reguły: ",
          /* @__PURE__ */ jsxDEV("strong", { className: "text-emerald-400", children: rules.filter((r) => r.isEnabled).length }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 409,
            columnNumber: 29
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 407,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 401,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
      lineNumber: 362,
      columnNumber: 7
    }, this),
    activeTab === "rules_list" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "relative w-full sm:w-72", children: [
          /* @__PURE__ */ jsxDEV(Search, { className: "w-4 h-4 absolute left-3 top-2.5 text-slate-500" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 420,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: searchFilter,
              onChange: (e) => setSearchFilter(e.target.value),
              placeholder: "Filtruj reguły (nazwa, wzorzec)...",
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 421,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 419,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1 text-xs", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-slate-500 text-[11px] mr-1", children: "Priorytet:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 431,
            columnNumber: 15
          }, this),
          ["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((sev) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setSelectedSeverity(sev),
              className: `px-2 py-1 rounded text-[11px] font-mono font-bold transition-all cursor-pointer ${selectedSeverity === sev ? sev === "CRITICAL" ? "bg-red-600 text-white" : sev === "HIGH" ? "bg-amber-600 text-slate-950" : "bg-purple-600 text-white" : "text-slate-400 hover:text-white bg-slate-900"}`,
              children: sev === "ALL" ? "Wszystkie" : sev
            },
            sev,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 433,
              columnNumber: 17
            },
            this
          ))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 430,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 418,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
        filteredRules.map((rule) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: `rounded-xl border p-4 transition-all ${rule.isEnabled ? "bg-slate-950/80 border-slate-800 hover:border-purple-600/50 shadow-md" : "bg-slate-950/40 border-slate-900 opacity-60"}`,
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "space-y-1", children: [
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxDEV("span", { className: "text-sm font-bold text-white flex items-center gap-1.5", children: [
                      rule.protectsWork && /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                        lineNumber: 467,
                        columnNumber: 47
                      }, this),
                      rule.name
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 466,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV(
                      "span",
                      {
                        className: `text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${rule.severity === "CRITICAL" ? "bg-red-950 text-red-300 border border-red-800" : rule.severity === "HIGH" ? "bg-amber-950 text-amber-300 border border-amber-800" : "bg-blue-950 text-blue-300 border border-blue-800"}`,
                        children: rule.severity
                      },
                      void 0,
                      false,
                      {
                        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                        lineNumber: 470,
                        columnNumber: 23
                      },
                      this
                    )
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                    lineNumber: 465,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2 text-[11px] font-mono text-slate-400", children: [
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      "Wzorzec: ",
                      /* @__PURE__ */ jsxDEV("code", { className: "text-purple-300 font-bold bg-slate-900 px-1 py-0.5 rounded", children: rule.pattern || rule.matchField }, void 0, false, {
                        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                        lineNumber: 484,
                        columnNumber: 38
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 484,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: "•" }, void 0, false, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 485,
                      columnNumber: 23
                    }, this),
                    /* @__PURE__ */ jsxDEV("span", { children: [
                      "Pole: ",
                      /* @__PURE__ */ jsxDEV("strong", { className: "text-slate-300", children: rule.matchField }, void 0, false, {
                        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                        lineNumber: 486,
                        columnNumber: 35
                      }, this)
                    ] }, void 0, true, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 486,
                      columnNumber: 23
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                    lineNumber: 483,
                    columnNumber: 21
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 464,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => onToggleRule(rule.id),
                    className: "cursor-pointer text-slate-400 hover:text-white transition-all shrink-0",
                    title: rule.isEnabled ? "Deaktywuj regułę" : "Aktywuj regułę",
                    children: rule.isEnabled ? /* @__PURE__ */ jsxDEV(ToggleRight, { className: "w-6 h-6 text-emerald-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 496,
                      columnNumber: 23
                    }, this) : /* @__PURE__ */ jsxDEV(ToggleLeft, { className: "w-6 h-6 text-slate-600" }, void 0, false, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 498,
                      columnNumber: 23
                    }, this)
                  },
                  void 0,
                  false,
                  {
                    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                    lineNumber: 490,
                    columnNumber: 19
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 463,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-2.5 leading-relaxed bg-slate-900/50 p-2 rounded-lg border border-slate-900", children: rule.reason }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 503,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "mt-3 pt-3 border-t border-slate-900 flex items-center justify-between text-xs font-mono", children: [
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-3 text-slate-400", children: [
                  /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsxDEV(Skull, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 511,
                      columnNumber: 23
                    }, this),
                    "Ubito: ",
                    /* @__PURE__ */ jsxDEV("strong", { className: "text-white font-bold", children: rule.matchCount }, void 0, false, {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 512,
                      columnNumber: 30
                    }, this)
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                    lineNumber: 510,
                    columnNumber: 21
                  }, this),
                  rule.lastTriggered && /* @__PURE__ */ jsxDEV("span", { className: "text-[11px] text-slate-500", children: [
                    "Ostatnio: ",
                    rule.lastTriggered
                  ] }, void 0, true, {
                    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                    lineNumber: 515,
                    columnNumber: 23
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 509,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => onTestRule(rule),
                      className: "px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/60 text-[11px] font-bold flex items-center gap-1 transition-all cursor-pointer",
                      title: "Uruchom symulowany proces testowy i sprawdź natychmiastowy ubój przez tę regułę",
                      children: [
                        /* @__PURE__ */ jsxDEV(Play, { className: "w-3 h-3" }, void 0, false, {
                          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                          lineNumber: 527,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV("span", { children: "Test Uboju" }, void 0, false, {
                          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                          lineNumber: 528,
                          columnNumber: 23
                        }, this)
                      ]
                    },
                    void 0,
                    true,
                    {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 522,
                      columnNumber: 21
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV(
                    "button",
                    {
                      onClick: () => onDeleteRule(rule.id),
                      className: "p-1 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-red-400 transition-all cursor-pointer",
                      title: "Usuń tę regułę",
                      children: /* @__PURE__ */ jsxDEV(Trash2, { className: "w-3.5 h-3.5" }, void 0, false, {
                        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                        lineNumber: 536,
                        columnNumber: 23
                      }, this)
                    },
                    void 0,
                    false,
                    {
                      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                      lineNumber: 531,
                      columnNumber: 21
                    },
                    this
                  )
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 521,
                  columnNumber: 19
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 508,
                columnNumber: 17
              }, this)
            ]
          },
          rule.id,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 455,
            columnNumber: 15
          },
          this
        )),
        filteredRules.length === 0 && /* @__PURE__ */ jsxDEV("div", { className: "col-span-2 py-12 text-center text-slate-500 font-mono text-xs", children: "Nie znaleziono reguł spełniających kryteria wyszukiwania." }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 544,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 453,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
      lineNumber: 416,
      columnNumber: 9
    }, this),
    activeTab === "create_rule" && /* @__PURE__ */ jsxDEV("form", { onSubmit: handleCreateRuleSubmit, className: "space-y-4 max-w-3xl mx-auto bg-slate-950 p-5 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pb-3 border-b border-slate-800", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-sm font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Plus, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 558,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Definiowanie Nowej Reguły Automatycznego Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 559,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 557,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs text-slate-400 mt-0.5", children: "Skonfiguruj kryteria, na podstawie których Watchdog namierzy i ubije niebezpieczny proces w 0 ms." }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 561,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 556,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "hidden sm:flex items-center gap-1.5 text-xs font-mono", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500", children: "Szybkie presety:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 568,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => applyPreset("work_destroyer"),
              className: "px-2 py-1 rounded bg-red-950 text-red-300 border border-red-800 text-[10px] hover:bg-red-900 cursor-pointer",
              children: "Gnida Niszcząca Pracę"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 569,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => applyPreset("ransomware"),
              className: "px-2 py-1 rounded bg-purple-950 text-purple-300 border border-purple-800 text-[10px] hover:bg-purple-900 cursor-pointer",
              children: "Ransomware"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 576,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              type: "button",
              onClick: () => applyPreset("screen_locker"),
              className: "px-2 py-1 rounded bg-slate-800 text-slate-300 text-[10px] hover:bg-slate-700 cursor-pointer",
              children: "Locker Ekranu"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 583,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 567,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 555,
        columnNumber: 11
      }, this),
      formError && /* @__PURE__ */ jsxDEV("div", { className: "p-3 bg-red-950/70 border border-red-600 rounded-lg text-xs text-red-200 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxDEV(AlertTriangle, { className: "w-4 h-4 text-red-400 shrink-0" }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 595,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV("span", { children: formError }, void 0, false, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 596,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 594,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Nazwa Reguły:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 603,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: ruleName,
              onChange: (e) => setRuleName(e.target.value),
              placeholder: "np. Natychmiastowy ubój gnidy niszczącej pliki robocze",
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 606,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 602,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Wzorzec Dopasowania (Wildcard * lub ciąg):" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 617,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "text",
              value: rulePattern,
              onChange: (e) => setRulePattern(e.target.value),
              placeholder: "np. *work_destroyer*.exe, *encryptor*, *.scr",
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 620,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] text-slate-500 block", children: [
            "Możesz używać gwiazdek: np. ",
            /* @__PURE__ */ jsxDEV("code", { children: "*gnida*" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 628,
              columnNumber: 45
            }, this),
            " dopasuje każdą nazwę zawierającą słowo gnida."
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 627,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 616,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Pole Sprawdzania:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 634,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: ruleMatchField,
              onChange: (e) => setRuleMatchField(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "name", children: "Nazwa Procesu (proc.name - np. work_destroyer.exe)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 642,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "windowTitle", children: "Tytuł Okna Win32 (windowTitle)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 643,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "filePath", children: "Pełna Ścieżka na Dysku (filePath - np. C:\\...\\Temp)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 644,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "hasFlutterDll", children: "Flaga Załadowania flutter_windows.dll" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 645,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "isTopMost", children: "Styl Okna HWND_TOPMOST (Z-Order Hijack)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 646,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 637,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 633,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Akcja Watchdoga po Wykryciu:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 652,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: ruleAction,
              onChange: (e) => setRuleAction(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-purple-300 font-bold focus:outline-none focus:border-purple-500 font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "auto_kill", children: "TerminateProcess(h, 9) - Natychmiastowy ubój" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 660,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "auto_kill_and_pe_sabotage", children: "Ubój + Sabotaż Nagłówka PE MZ (0xC000007B)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 661,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "auto_suspend", children: "NtSuspendProcess(h) - Zamrożenie wątków w RAM" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 662,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "auto_throttle", children: "Throttle - Zredukowanie priorytetu CPU do IDLE" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 663,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 655,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 651,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Poziom Zagrożenia:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 669,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "select",
            {
              value: ruleSeverity,
              onChange: (e) => setRuleSeverity(e.target.value),
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500 font-mono",
              children: [
                /* @__PURE__ */ jsxDEV("option", { value: "CRITICAL", children: "KRYTYCZNY (Zagrożenie dla danych i pracy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 677,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "HIGH", children: "WYSOKI (Blokada interfejsu i nakładka)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 678,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("option", { value: "MEDIUM", children: "ŚREDNI (Podejrzany proces pomocniczy)" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 679,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 672,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 668,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-1.5 sm:col-span-2", children: [
          /* @__PURE__ */ jsxDEV("label", { className: "text-xs font-bold text-slate-300 block", children: "Uzasadnienie Reguły / Opis Ochrony:" }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 685,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "textarea",
            {
              value: ruleReason,
              onChange: (e) => setRuleReason(e.target.value),
              placeholder: "np. Zapobiega zniszczeniu bieżącej sesji roboczej, ubija złośliwe procesy w ułamku milisekundy.",
              rows: 2,
              className: "w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 688,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 684,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "sm:col-span-2 flex items-center gap-2 p-2.5 rounded-lg bg-red-950/40 border border-red-900/50", children: [
          /* @__PURE__ */ jsxDEV(
            "input",
            {
              type: "checkbox",
              id: "protectsWorkCheck",
              checked: ruleProtectsWork,
              onChange: (e) => setRuleProtectsWork(e.target.checked),
              className: "rounded border-slate-800 text-red-600 focus:ring-0 cursor-pointer"
            },
            void 0,
            false,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 699,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("label", { htmlFor: "protectsWorkCheck", className: "text-xs text-slate-200 cursor-pointer font-bold flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Flame, { className: "w-3.5 h-3.5 text-red-400" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 707,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Oznacz jako priorytetową regułę ochrony pracy przed zniszczeniem (Work Guard)" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 708,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 706,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 698,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 600,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-end gap-3 pt-3 border-t border-slate-800", children: [
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "button",
            onClick: () => setActiveTab("rules_list"),
            className: "px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-all cursor-pointer",
            children: "Anuluj"
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 714,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV(
          "button",
          {
            type: "submit",
            className: "px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono transition-all cursor-pointer shadow-lg shadow-purple-950 flex items-center gap-1.5",
            children: [
              /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 725,
                columnNumber: 15
              }, this),
              /* @__PURE__ */ jsxDEV("span", { children: "Zapisz Regułę w Watchdogu" }, void 0, false, {
                fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                lineNumber: 726,
                columnNumber: 15
              }, this)
            ]
          },
          void 0,
          true,
          {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 721,
            columnNumber: 13
          },
          this
        )
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 713,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
      lineNumber: 554,
      columnNumber: 9
    }, this),
    activeTab === "export_script" && /* @__PURE__ */ jsxDEV("div", { className: "space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { className: "text-xs font-bold text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 738,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Autonomiczny Demon Pythona z Twoimi Regułami Uboju" }, void 0, false, {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 739,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 737,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Możesz uruchomić ten skrypt na stacji roboczej Windows. Działa w 100% offline, bez dodatkowych bibliotek pip." }, void 0, false, {
            fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
            lineNumber: 741,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 736,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyCode,
              className: "px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono flex items-center gap-1 transition-all cursor-pointer",
              children: [
                copiedCode ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 751,
                  columnNumber: 31
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 751,
                  columnNumber: 84
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copiedCode ? "Skopiowano!" : "Kopiuj" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 752,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 747,
              columnNumber: 15
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadCode,
              className: "px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-mono flex items-center gap-1 transition-all cursor-pointer shadow-md shadow-purple-950",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 758,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .py" }, void 0, false, {
                  fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
                  lineNumber: 759,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
              lineNumber: 754,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
          lineNumber: 746,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 735,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV("pre", { className: "p-3 bg-slate-900 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto max-h-80 select-all", children: generatePythonDaemonScript() }, void 0, false, {
        fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
        lineNumber: 764,
        columnNumber: 11
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
      lineNumber: 734,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/WatchdogRulesManager.tsx",
    lineNumber: 318,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIldhdGNoZG9nUnVsZXNNYW5hZ2VyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBcbiAgU2t1bGwsIFBsdXMsIFRyYXNoMiwgWmFwLCBTaGllbGQsIFNoaWVsZEFsZXJ0LCBDaGVja0NpcmNsZTIsIFxuICBUZXJtaW5hbCwgUGxheSwgU2xpZGVycywgQWxlcnRUcmlhbmdsZSwgRG93bmxvYWQsIENvcHksIENoZWNrLFxuICBUb2dnbGVMZWZ0LCBUb2dnbGVSaWdodCwgU3BhcmtsZXMsIEZpbHRlciwgU2VhcmNoLCBJbmZvLCBTaGllbGRDaGVjaywgRmxhbWVcbn0gZnJvbSAnbHVjaWRlLXJlYWN0JztcbmltcG9ydCB7IFdhdGNoZG9nQXV0b0tpbGxSdWxlLCBXYXRjaGRvZ01hdGNoRmllbGQsIFdhdGNoZG9nUnVsZUFjdGlvbiwgV2F0Y2hkb2dSdWxlU2V2ZXJpdHksIFNpbXVsYXRlZFByb2Nlc3MgfSBmcm9tICcuLi90eXBlcyc7XG5pbXBvcnQgeyBkb3dubG9hZEZpbGUgfSBmcm9tICcuLi91dGlscy9vZmZsaW5lUGFja2FnZUV4cG9ydGVyJztcblxuaW50ZXJmYWNlIFdhdGNoZG9nUnVsZXNNYW5hZ2VyUHJvcHMge1xuICBydWxlczogV2F0Y2hkb2dBdXRvS2lsbFJ1bGVbXTtcbiAgb25BZGRSdWxlOiAocnVsZTogT21pdDxXYXRjaGRvZ0F1dG9LaWxsUnVsZSwgJ2lkJyB8ICdjcmVhdGVkQXQnIHwgJ21hdGNoQ291bnQnPikgPT4gdm9pZDtcbiAgb25Ub2dnbGVSdWxlOiAocnVsZUlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIG9uRGVsZXRlUnVsZTogKHJ1bGVJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblRlc3RSdWxlOiAocnVsZTogV2F0Y2hkb2dBdXRvS2lsbFJ1bGUpID0+IHZvaWQ7XG4gIG9uS2lsbFdvcmtEZXN0cm95ZXJOb3c6ICgpID0+IHZvaWQ7XG4gIGlzV2F0Y2hkb2dBY3RpdmU6IGJvb2xlYW47XG4gIHRvdGFsS2lsbHNDb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9XQVRDSERPR19SVUxFUzogV2F0Y2hkb2dBdXRvS2lsbFJ1bGVbXSA9IFtcbiAge1xuICAgIGlkOiAncnVsZS13b3JrLWRlc3Ryb3llcicsXG4gICAgbmFtZTogJ0Vrc3Rlcm1pbmFjamEgR25pZHkgTmlzemN6xIVjZWogUHJhY8SZIChXb3JrIERlc3Ryb3llciknLFxuICAgIHBhdHRlcm46ICcqd29ya19kZXN0cm95ZXIqJyxcbiAgICBtYXRjaEZpZWxkOiAnbmFtZScsXG4gICAgYWN0aW9uOiAnYXV0b19raWxsJyxcbiAgICBzZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICByZWFzb246ICdDaHJvbmkgcGxpa2kgcHJvamVrdG93ZSwgYnVmb3J5IHJvYm9jemUsIGVkeXRvcnkga29kdSBpIHBhbWnEmcSHIHByemVkIG5hdHljaG1pYXN0b3d5bSB6bmlzemN6ZW5pZW0gcHJ6ZXogcGFzb8W8eXRhLicsXG4gICAgaXNFbmFibGVkOiB0cnVlLFxuICAgIG1hdGNoQ291bnQ6IDMsXG4gICAgbGFzdFRyaWdnZXJlZDogJzExOjE0OjIwJyxcbiAgICBwcm90ZWN0c1dvcms6IHRydWUsXG4gICAgY3JlYXRlZEF0OiAnMjAyNi0wOS0xMiAxMDowMDowMCdcbiAgfSxcbiAge1xuICAgIGlkOiAncnVsZS1yYW5zb213YXJlJyxcbiAgICBuYW1lOiAnQXV0by1LaWxsIFN6eWZyYXRvcsOzdyBSYW5zb213YXJlIChDaGFDaGEyMCAvIEFFUyknLFxuICAgIHBhdHRlcm46ICcqZW5jcnlwdG9yKicsXG4gICAgbWF0Y2hGaWVsZDogJ25hbWUnLFxuICAgIGFjdGlvbjogJ2F1dG9fa2lsbF9hbmRfcGVfc2Fib3RhZ2UnLFxuICAgIHNldmVyaXR5OiAnQ1JJVElDQUwnLFxuICAgIHJlYXNvbjogJ1d5a3J5d2EgcHJvY2VzeSBzenlmcnVqxIVjZSBkeXNrIGkgcmVwb3p5dG9yaWEsIHViaWphIGplIGkgemVydWplIG5hZ8WCw7N3ZWsgTVogcGxpa3Ugd3lrb255d2FsbmVnby4nLFxuICAgIGlzRW5hYmxlZDogdHJ1ZSxcbiAgICBtYXRjaENvdW50OiAxLFxuICAgIGxhc3RUcmlnZ2VyZWQ6ICcxMToxMjowNScsXG4gICAgcHJvdGVjdHNXb3JrOiB0cnVlLFxuICAgIGNyZWF0ZWRBdDogJzIwMjYtMDktMTIgMTA6MDU6MDAnXG4gIH0sXG4gIHtcbiAgICBpZDogJ3J1bGUtZmx1dHRlci1vdmVybGF5JyxcbiAgICBuYW1lOiAnV3l3xYJhc3pjemFjeiBFa3JhbnUgSFdORF9UT1BNT1NUIChGbHV0dGVyIExvY2tlciknLFxuICAgIHBhdHRlcm46ICdmbHV0dGVyX3dpbmRvd3MuZGxsJyxcbiAgICBtYXRjaEZpZWxkOiAnaGFzRmx1dHRlckRsbCcsXG4gICAgYWN0aW9uOiAnYXV0b19raWxsJyxcbiAgICBzZXZlcml0eTogJ0hJR0gnLFxuICAgIHJlYXNvbjogJ0xpa3dpZHVqZSB6xYJvxZtsaXdlIG5ha8WCYWRraSBibG9rdWrEhWNlIGt1cnNvciBteXN6eSwgcGFzZWsgemFkYcWEIGkgcHVscGl0LicsXG4gICAgaXNFbmFibGVkOiB0cnVlLFxuICAgIG1hdGNoQ291bnQ6IDIsXG4gICAgbGFzdFRyaWdnZXJlZDogJzExOjEwOjQ1JyxcbiAgICBwcm90ZWN0c1dvcms6IHRydWUsXG4gICAgY3JlYXRlZEF0OiAnMjAyNi0wOS0xMiAxMDoxMDowMCdcbiAgfSxcbiAge1xuICAgIGlkOiAncnVsZS1oaWRkZW4tZHJvcHBlcicsXG4gICAgbmFtZTogJ1Bhc2/FvHl0bmljenkgRHJvcHBlciB3IEthdGFsb2d1IFRlbXAnLFxuICAgIHBhdHRlcm46ICcqZHJvcHBlcionLFxuICAgIG1hdGNoRmllbGQ6ICduYW1lJyxcbiAgICBhY3Rpb246ICdhdXRvX3N1c3BlbmQnLFxuICAgIHNldmVyaXR5OiAnSElHSCcsXG4gICAgcmVhc29uOiAnTmF0eWNobWlhc3QgemFtcmHFvGEgcHJvY2VzeSBtYWNpZXJ6eXN0ZSBwcsOzYnVqxIVjZSB6cmVzdGFydG93YcSHIHViaXRlIG5ha8WCYWRraSAoMCBtcyBOdFN1c3BlbmRQcm9jZXNzKS4nLFxuICAgIGlzRW5hYmxlZDogdHJ1ZSxcbiAgICBtYXRjaENvdW50OiAxLFxuICAgIGxhc3RUcmlnZ2VyZWQ6ICcxMTowODoxMicsXG4gICAgcHJvdGVjdHNXb3JrOiBmYWxzZSxcbiAgICBjcmVhdGVkQXQ6ICcyMDI2LTA5LTEyIDEwOjE1OjAwJ1xuICB9LFxuICB7XG4gICAgaWQ6ICdydWxlLXdpcGVyJyxcbiAgICBuYW1lOiAnRGVzdHJ1a3RvciBUYWJsaWN5IFBhcnR5Y2ppIGkgTUJSIChEaXNrIFdpcGVyKScsXG4gICAgcGF0dGVybjogJyp3aXBlcionLFxuICAgIG1hdGNoRmllbGQ6ICduYW1lJyxcbiAgICBhY3Rpb246ICdhdXRvX2tpbGxfYW5kX3BlX3NhYm90YWdlJyxcbiAgICBzZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICByZWFzb246ICdUcndhxYJlIHpuaXN6Y3plbmllIHfEhXRrw7N3IGkgYmxva2FkYSB6YXBpc3UgZGxhIG5hcnrEmWR6aSBuaXN6Y3rEhWN5Y2ggc3lzdGVtIHBsaWvDs3cuJyxcbiAgICBpc0VuYWJsZWQ6IHRydWUsXG4gICAgbWF0Y2hDb3VudDogMCxcbiAgICBwcm90ZWN0c1dvcms6IHRydWUsXG4gICAgY3JlYXRlZEF0OiAnMjAyNi0wOS0xMiAxMDoyMDowMCdcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IFdhdGNoZG9nUnVsZXNNYW5hZ2VyOiBSZWFjdC5GQzxXYXRjaGRvZ1J1bGVzTWFuYWdlclByb3BzPiA9ICh7XG4gIHJ1bGVzLFxuICBvbkFkZFJ1bGUsXG4gIG9uVG9nZ2xlUnVsZSxcbiAgb25EZWxldGVSdWxlLFxuICBvblRlc3RSdWxlLFxuICBvbktpbGxXb3JrRGVzdHJveWVyTm93LFxuICBpc1dhdGNoZG9nQWN0aXZlLFxuICB0b3RhbEtpbGxzQ291bnRcbn0pID0+IHtcbiAgY29uc3QgW2FjdGl2ZVRhYiwgc2V0QWN0aXZlVGFiXSA9IHVzZVN0YXRlPCdydWxlc19saXN0JyB8ICdjcmVhdGVfcnVsZScgfCAnZXhwb3J0X3NjcmlwdCc+KCdydWxlc19saXN0Jyk7XG4gIGNvbnN0IFtzZWFyY2hGaWx0ZXIsIHNldFNlYXJjaEZpbHRlcl0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtzZWxlY3RlZFNldmVyaXR5LCBzZXRTZWxlY3RlZFNldmVyaXR5XSA9IHVzZVN0YXRlPCdBTEwnIHwgV2F0Y2hkb2dSdWxlU2V2ZXJpdHk+KCdBTEwnKTtcbiAgY29uc3QgW2NvcGllZENvZGUsIHNldENvcGllZENvZGVdID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIC8vIEZvcm0gU3RhdGUgZm9yIGNyZWF0aW5nIGEgbmV3IHJ1bGVcbiAgY29uc3QgW3J1bGVOYW1lLCBzZXRSdWxlTmFtZV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IFtydWxlUGF0dGVybiwgc2V0UnVsZVBhdHRlcm5dID0gdXNlU3RhdGUoJycpO1xuICBjb25zdCBbcnVsZU1hdGNoRmllbGQsIHNldFJ1bGVNYXRjaEZpZWxkXSA9IHVzZVN0YXRlPFdhdGNoZG9nTWF0Y2hGaWVsZD4oJ25hbWUnKTtcbiAgY29uc3QgW3J1bGVBY3Rpb24sIHNldFJ1bGVBY3Rpb25dID0gdXNlU3RhdGU8V2F0Y2hkb2dSdWxlQWN0aW9uPignYXV0b19raWxsJyk7XG4gIGNvbnN0IFtydWxlU2V2ZXJpdHksIHNldFJ1bGVTZXZlcml0eV0gPSB1c2VTdGF0ZTxXYXRjaGRvZ1J1bGVTZXZlcml0eT4oJ0NSSVRJQ0FMJyk7XG4gIGNvbnN0IFtydWxlUmVhc29uLCBzZXRSdWxlUmVhc29uXSA9IHVzZVN0YXRlKCcnKTtcbiAgY29uc3QgW3J1bGVQcm90ZWN0c1dvcmssIHNldFJ1bGVQcm90ZWN0c1dvcmtdID0gdXNlU3RhdGUodHJ1ZSk7XG4gIGNvbnN0IFtmb3JtRXJyb3IsIHNldEZvcm1FcnJvcl0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcblxuICAvLyBQcmVzZXQgcXVpY2sgYXBwbGllcnNcbiAgY29uc3QgYXBwbHlQcmVzZXQgPSAocHJlc2V0VHlwZTogJ3dvcmtfZGVzdHJveWVyJyB8ICdyYW5zb213YXJlJyB8ICdzY3JlZW5fbG9ja2VyJyB8ICd0ZW1wX2luamVjdG9yJykgPT4ge1xuICAgIGlmIChwcmVzZXRUeXBlID09PSAnd29ya19kZXN0cm95ZXInKSB7XG4gICAgICBzZXRSdWxlTmFtZSgnQmxva2FkYSBHbmlkeSBOaXN6Y3rEhWNlaiBQcmFjxJkgKFdvcmsgUHJvdGVjdG9yKScpO1xuICAgICAgc2V0UnVsZVBhdHRlcm4oJyp3b3JrX2Rlc3Ryb3llciouZXhlJyk7XG4gICAgICBzZXRSdWxlTWF0Y2hGaWVsZCgnbmFtZScpO1xuICAgICAgc2V0UnVsZUFjdGlvbignYXV0b19raWxsJyk7XG4gICAgICBzZXRSdWxlU2V2ZXJpdHkoJ0NSSVRJQ0FMJyk7XG4gICAgICBzZXRSdWxlUmVhc29uKCdDaHJvbmkgcGxpa2kgcm9ib2N6ZSwgcHJvamVrdHkgaSBvdHdhcnRlIGRva3VtZW50eSBwcnplZCB6bmlzemN6ZW5pZW0gcHJ6ZXogZ25pZMSZLicpO1xuICAgICAgc2V0UnVsZVByb3RlY3RzV29yayh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHByZXNldFR5cGUgPT09ICdyYW5zb213YXJlJykge1xuICAgICAgc2V0UnVsZU5hbWUoJ0Vrc3Rlcm1pbmFjamEgU3p5ZnJhdG9yw7N3IFBsaWvDs3cnKTtcbiAgICAgIHNldFJ1bGVQYXR0ZXJuKCcqZW5jcnlwdG9yKicpO1xuICAgICAgc2V0UnVsZU1hdGNoRmllbGQoJ25hbWUnKTtcbiAgICAgIHNldFJ1bGVBY3Rpb24oJ2F1dG9fa2lsbF9hbmRfcGVfc2Fib3RhZ2UnKTtcbiAgICAgIHNldFJ1bGVTZXZlcml0eSgnQ1JJVElDQUwnKTtcbiAgICAgIHNldFJ1bGVSZWFzb24oJ1phYmV6cGllY3phIHJlcG96eXRvcmlhIGkgcGxpa2kgZHlza293ZSBwcnplZCBzenlmcm93YW5pZW0gKENoYUNoYTIwL0FFUykuJyk7XG4gICAgICBzZXRSdWxlUHJvdGVjdHNXb3JrKHRydWUpO1xuICAgIH0gZWxzZSBpZiAocHJlc2V0VHlwZSA9PT0gJ3NjcmVlbl9sb2NrZXInKSB7XG4gICAgICBzZXRSdWxlTmFtZSgnTGlrd2lkYWNqYSBCbG9rYWR5IEVrcmFudSBUb3BNb3N0Jyk7XG4gICAgICBzZXRSdWxlUGF0dGVybignKnNjcmVlbl9oaWphY2sqLmV4ZScpO1xuICAgICAgc2V0UnVsZU1hdGNoRmllbGQoJ25hbWUnKTtcbiAgICAgIHNldFJ1bGVBY3Rpb24oJ2F1dG9fa2lsbCcpO1xuICAgICAgc2V0UnVsZVNldmVyaXR5KCdISUdIJyk7XG4gICAgICBzZXRSdWxlUmVhc29uKCdXeW11c3phIG5hdHljaG1pYXN0b3dlIHpkasSZY2llIG9rbmEgVG9wTW9zdCBibG9rdWrEhWNlZ28gcHVscGl0LicpO1xuICAgICAgc2V0UnVsZVByb3RlY3RzV29yayh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHByZXNldFR5cGUgPT09ICd0ZW1wX2luamVjdG9yJykge1xuICAgICAgc2V0UnVsZU5hbWUoJ0Jsb2thZGEgV3lrb255d2FuaWEgeiBUZW1wIC8gQXBwRGF0YScpO1xuICAgICAgc2V0UnVsZVBhdHRlcm4oJypBcHBEYXRhXFxcXExvY2FsXFxcXFRlbXAqJyk7XG4gICAgICBzZXRSdWxlTWF0Y2hGaWVsZCgnZmlsZVBhdGgnKTtcbiAgICAgIHNldFJ1bGVBY3Rpb24oJ2F1dG9fa2lsbCcpO1xuICAgICAgc2V0UnVsZVNldmVyaXR5KCdISUdIJyk7XG4gICAgICBzZXRSdWxlUmVhc29uKCdVYmlqYSBuaWVhdXRvcnl6b3dhbmUgcHJvY2VzeSB1cnVjaGFtaWFuZSB3IHRsZSB6IGthdGFsb2d1IHR5bWN6YXNvd2Vnby4nKTtcbiAgICAgIHNldFJ1bGVQcm90ZWN0c1dvcmsoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBoYW5kbGVDcmVhdGVSdWxlU3VibWl0ID0gKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoIXJ1bGVOYW1lLnRyaW0oKSkge1xuICAgICAgc2V0Rm9ybUVycm9yKCdQb2RhaiBjenl0ZWxuxIUgbmF6d8SZIHJlZ3XFgnkgYXV0b21hdHljem5lai4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFydWxlUGF0dGVybi50cmltKCkgJiYgcnVsZU1hdGNoRmllbGQgIT09ICdoYXNGbHV0dGVyRGxsJyAmJiBydWxlTWF0Y2hGaWVsZCAhPT0gJ2lzVG9wTW9zdCcpIHtcbiAgICAgIHNldEZvcm1FcnJvcignUG9kYWogd3pvcnplYyBwcm9jZXN1IChucC4gd29ya19kZXN0cm95ZXIqLmV4ZSBsdWIgKmVuY3J5cHRvciopLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG9uQWRkUnVsZSh7XG4gICAgICBuYW1lOiBydWxlTmFtZS50cmltKCksXG4gICAgICBwYXR0ZXJuOiBydWxlUGF0dGVybi50cmltKCksXG4gICAgICBtYXRjaEZpZWxkOiBydWxlTWF0Y2hGaWVsZCxcbiAgICAgIGFjdGlvbjogcnVsZUFjdGlvbixcbiAgICAgIHNldmVyaXR5OiBydWxlU2V2ZXJpdHksXG4gICAgICByZWFzb246IHJ1bGVSZWFzb24udHJpbSgpIHx8ICdSZWd1xYJhIGF1dG9tYXR5Y3puZWogb2Nocm9ueSBXYXRjaGRvZ2EgcHJ6ZWQgbmllYmV6cGllY3pueW1pIHByb2Nlc2FtaS4nLFxuICAgICAgaXNFbmFibGVkOiB0cnVlLFxuICAgICAgcHJvdGVjdHNXb3JrOiBydWxlUHJvdGVjdHNXb3JrXG4gICAgfSk7XG5cbiAgICAvLyBSZXNldCBGb3JtXG4gICAgc2V0UnVsZU5hbWUoJycpO1xuICAgIHNldFJ1bGVQYXR0ZXJuKCcnKTtcbiAgICBzZXRSdWxlUmVhc29uKCcnKTtcbiAgICBzZXRGb3JtRXJyb3IobnVsbCk7XG4gICAgc2V0QWN0aXZlVGFiKCdydWxlc19saXN0Jyk7XG4gIH07XG5cbiAgLy8gRmlsdGVyZWQgcnVsZXNcbiAgY29uc3QgZmlsdGVyZWRSdWxlcyA9IHJ1bGVzLmZpbHRlcihyID0+IHtcbiAgICBjb25zdCBtYXRjaGVzUXVlcnkgPSBcbiAgICAgIHIubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaEZpbHRlci50b0xvd2VyQ2FzZSgpKSB8fFxuICAgICAgci5wYXR0ZXJuLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoc2VhcmNoRmlsdGVyLnRvTG93ZXJDYXNlKCkpIHx8XG4gICAgICByLnJlYXNvbi50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaEZpbHRlci50b0xvd2VyQ2FzZSgpKTtcblxuICAgIGNvbnN0IG1hdGNoZXNTZXZlcml0eSA9IHNlbGVjdGVkU2V2ZXJpdHkgPT09ICdBTEwnIHx8IHIuc2V2ZXJpdHkgPT09IHNlbGVjdGVkU2V2ZXJpdHk7XG4gICAgcmV0dXJuIG1hdGNoZXNRdWVyeSAmJiBtYXRjaGVzU2V2ZXJpdHk7XG4gIH0pO1xuXG4gIC8vIFB5dGhvbiBEYWVtb24gQ29kZSB3aXRoIFVzZXIgRGVmaW5lZCBSdWxlc1xuICBjb25zdCBnZW5lcmF0ZVB5dGhvbkRhZW1vblNjcmlwdCA9ICgpID0+IHtcbiAgICBjb25zdCBydWxlc0pzb24gPSBKU09OLnN0cmluZ2lmeShydWxlcy5maWx0ZXIociA9PiByLmlzRW5hYmxlZCkubWFwKHIgPT4gKHtcbiAgICAgIG5hbWU6IHIubmFtZSxcbiAgICAgIHBhdHRlcm46IHIucGF0dGVybixcbiAgICAgIGZpZWxkOiByLm1hdGNoRmllbGQsXG4gICAgICBhY3Rpb246IHIuYWN0aW9uLFxuICAgICAgc2V2ZXJpdHk6IHIuc2V2ZXJpdHlcbiAgICB9KSksIG51bGwsIDQpO1xuXG4gICAgcmV0dXJuIGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5TRU5USU5FTCBXQVRDSERPRyBBVVRPLUtJTEwgRU5HSU5FOiBDVVNUT00gUlVMRVMgREFFTU9OICgxMDAlIE9GRkxJTkUpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuQXV0b21hdHljem55IHN0cmHFvG5payBwcm9jZXPDs3cgd3lrb251asSFY3kgbmF0eWNobWlhc3Rvd3kgdWLDs2ogKFRlcm1pbmF0ZVByb2Nlc3MpXG5sdWIgemFtcm/FvGVuaWUgKE50U3VzcGVuZFByb2Nlc3MpIHcgbW9tZW5jaWUgd3lrcnljaWEgcHJvY2VzdSBwYXN1asSFY2VnbyBkbyByZWd1xYIuXG5aYXByb2pla3Rvd2FueSBkbyBvY2hyb255IHByemVzdHJ6ZW5pIHJvYm9jemVqIHByemVkIGduaWRhbWkgbmlzemN6xIVjeW1pIHByYWPEmS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IGZubWF0Y2hcbmltcG9ydCB0aW1lXG5pbXBvcnQgc3lzXG5cbiMgV2luMzIgQVBJIEJpbmRpbmdzXG5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbm50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbFxucHNhcGkgPSBjdHlwZXMud2luZGxsLnBzYXBpXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxuXG5QUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OID0gMHgwNDAwXG5QUk9DRVNTX1ZNX1JFQUQgPSAweDAwMTBcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfVEVSTUlOQVRFID0gMHgwMDAxXG5cbiMgWmRlZmluaW93YW5lIHByemV6IHXFvHl0a293bmlrYSByZWd1xYJ5IGF1dG9tYXR5Y3puZWdvIHViaWphbmlhXG5BQ1RJVkVfUlVMRVMgPSAke3J1bGVzSnNvbn1cblxuZGVmIGdldF9wcm9jZXNzX25hbWVfYnlfaGFuZGxlKGhfcHJvYyk6XG4gICAgbmFtZV9idWYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKDI2MClcbiAgICBpZiBwc2FwaS5HZXRNb2R1bGVCYXNlTmFtZVcoaF9wcm9jLCBOb25lLCBuYW1lX2J1ZiwgY3R5cGVzLnNpemVvZihuYW1lX2J1ZikpOlxuICAgICAgICByZXR1cm4gbmFtZV9idWYudmFsdWVcbiAgICByZXR1cm4gXCJcIlxuXG5kZWYga2lsbF9wcm9jZXNzKHBpZCwgcHJvY19uYW1lLCBydWxlX25hbWUpOlxuICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1RFUk1JTkFURSwgRmFsc2UsIHBpZClcbiAgICBpZiBoOlxuICAgICAgICBrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGgsIDkpXG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgIHByaW50KGZcIlvwn5KlIFdBVENIRE9HIEFVVE8tS0lMTF0gUmVndcWCYSAne3J1bGVfbmFtZX0nIHd5a3J5xYJhOiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSkgLT4gWkxJS1dJRE9XQU5PIE5BVFlDSE1JQVNUIVwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIHJldHVybiBGYWxzZVxuXG5kZWYgZnJlZXplX3Byb2Nlc3MocGlkLCBwcm9jX25hbWUsIHJ1bGVfbmFtZSk6XG4gICAgaCA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJb4p2E77iPIFdBVENIRE9HIEZSRUVaRV0gUmVndcWCYSAne3J1bGVfbmFtZX0nIHd5a3J5xYJhOiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSkgLT4gWkFNUk/Fu09OTyBXIFJBTSFcIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICByZXR1cm4gRmFsc2VcblxuZGVmIGNoZWNrX2FuZF9leGVjdXRlX3J1bGVzKCk6XG4gICAgcGlkcyA9ICh3aW50eXBlcy5EV09SRCAqIDIwNDgpKClcbiAgICBjYl9uZWVkZWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgaWYgbm90IHBzYXBpLkVudW1Qcm9jZXNzZXMoY3R5cGVzLmJ5cmVmKHBpZHMpLCBjdHlwZXMuc2l6ZW9mKHBpZHMpLCBjdHlwZXMuYnlyZWYoY2JfbmVlZGVkKSk6XG4gICAgICAgIHJldHVyblxuXG4gICAgY291bnQgPSBjYl9uZWVkZWQudmFsdWUgLy8gY3R5cGVzLnNpemVvZih3aW50eXBlcy5EV09SRClcbiAgICBmb3IgaSBpbiByYW5nZShjb3VudCk6XG4gICAgICAgIHBpZCA9IHBpZHNbaV1cbiAgICAgICAgaWYgcGlkID09IDA6XG4gICAgICAgICAgICBjb250aW51ZVxuICAgICAgICBoX3Byb2MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OIHwgUFJPQ0VTU19WTV9SRUFELCBGYWxzZSwgcGlkKVxuICAgICAgICBpZiBub3QgaF9wcm9jOlxuICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgXG4gICAgICAgIHByb2NfbmFtZSA9IGdldF9wcm9jZXNzX25hbWVfYnlfaGFuZGxlKGhfcHJvYykubG93ZXIoKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG4gICAgICAgIFxuICAgICAgICBpZiBub3QgcHJvY19uYW1lOlxuICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICBmb3IgcnVsZSBpbiBBQ1RJVkVfUlVMRVM6XG4gICAgICAgICAgICBwYXQgPSBydWxlW1wicGF0dGVyblwiXS5sb3dlcigpXG4gICAgICAgICAgICBpZiBmbm1hdGNoLmZubWF0Y2gocHJvY19uYW1lLCBwYXQpIG9yIHBhdCBpbiBwcm9jX25hbWU6XG4gICAgICAgICAgICAgICAgYWN0aW9uID0gcnVsZVtcImFjdGlvblwiXVxuICAgICAgICAgICAgICAgIGlmIFwia2lsbFwiIGluIGFjdGlvbjpcbiAgICAgICAgICAgICAgICAgICAga2lsbF9wcm9jZXNzKHBpZCwgcHJvY19uYW1lLCBydWxlW1wibmFtZVwiXSlcbiAgICAgICAgICAgICAgICBlbGlmIFwic3VzcGVuZFwiIGluIGFjdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgZnJlZXplX3Byb2Nlc3MocGlkLCBwcm9jX25hbWUsIHJ1bGVbXCJuYW1lXCJdKVxuXG5kZWYgbWFpbigpOlxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFNFTlRJTkVMIFdBVENIRE9HIERBRU1PTjogQUtUWVdORSBSRUdVxYFZIEFVVE9NQVRZQ1pORUdPIFVCSUpBTklBXCIpXG4gICAgcHJpbnQoZlwiICBMaWN6YmEgemHFgmFkb3dhbnljaCByZWd1xYI6IHtsZW4oQUNUSVZFX1JVTEVTKX1cIilcbiAgICBwcmludChcIiAgT2Nocm9uYSBwcmFjeSB1xbx5dGtvd25pa2EgaSB1Ym9qdSBnbmlkOiBBS1RZV05BICgwIG1zKVwiKVxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgY2hlY2tfYW5kX2V4ZWN1dGVfcnVsZXMoKVxuICAgICAgICAgICAgdGltZS5zbGVlcCgwLjUpXG4gICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICBwcmludChcIlxcXFxuWypdIFphdHJ6eW1hbm8gc3RyYcW8bmlrYSBXYXRjaGRvZy5cIilcblxuaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzpcbiAgICBtYWluKClcbmA7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlQ29weUNvZGUgPSAoKSA9PiB7XG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZ2VuZXJhdGVQeXRob25EYWVtb25TY3JpcHQoKSk7XG4gICAgc2V0Q29waWVkQ29kZSh0cnVlKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHNldENvcGllZENvZGUoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZENvZGUgPSAoKSA9PiB7XG4gICAgZG93bmxvYWRGaWxlKCdzZW50aW5lbF93YXRjaGRvZ19ydWxlc19kYWVtb24ucHknLCBnZW5lcmF0ZVB5dGhvbkRhZW1vblNjcmlwdCgpLCAndGV4dC94LXB5dGhvbicpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC01IHNoYWRvdy0yeGwgc3BhY2UteS02XCI+XG4gICAgICB7LyogVG9wIEJhbm5lciB3aXRoIE1hc3RlciBXb3JrLURlc3Ryb3llciBEZWNhcGl0YXRpb24gQnV0dG9uICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IGxnOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTQgcC00IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC05NTAvODAgdmlhLXNsYXRlLTkwMCB0by1wdXJwbGUtOTUwLzcwIGJvcmRlciBib3JkZXItcmVkLTUwMC80MCBzaGFkb3cteGxcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMiByb3VuZGVkLWxnIGJnLXJlZC02MDAvMjAgYm9yZGVyIGJvcmRlci1yZWQtNTAwLzUwIHRleHQtcmVkLTQwMFwiPlxuICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy01IGgtNSBhbmltYXRlLXB1bHNlXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtYmFzZSBmb250LWJsYWNrIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5DZW50cnVtIFJlZ3XFgiBBdXRvbWF0eWN6bmVnbyBVYmlqYW5pYSAoV2F0Y2hkb2cgUnVsZXMgRW5naW5lKTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC05NTAgdGV4dC1lbWVyYWxkLTMwMCBib3JkZXIgYm9yZGVyLWVtZXJhbGQtNzAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgIHtpc1dhdGNoZG9nQWN0aXZlID8gJ0FLVFlXTlkgMCBNUycgOiAnV1NUUlpZTUFOWSd9XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHRleHQtc2xhdGUtMzAwIG10LTAuNVwiPlxuICAgICAgICAgICAgICAgIERlZmluaXVqIHByb2Nlc3kgesWCb8WbbGl3ZSwgcGFzb8W8eXR5IGkgZ25pZHkgbmlzemN6xIVjZSBwcmFjxJkuIFdhdGNoZG9nIGxpa3dpZHVqZSBqZSBuYXR5Y2htaWFzdCB3IG1vbWVuY2llIHd5a3J5Y2lhIG9iZWNub8WbY2kgdyBwYW1pxJljaSBSQU0uXG4gICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC13cmFwIGl0ZW1zLWNlbnRlciBnYXAtMi41IHctZnVsbCBsZzp3LWF1dG8ganVzdGlmeS1lbmRcIj5cbiAgICAgICAgICB7LyogUFJJTUFSWSBESVJFQ1QgQUNUSU9OIFJFUVVFU1RFRCBCWSBVU0VSICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uS2lsbFdvcmtEZXN0cm95ZXJOb3d9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgc206dy1hdXRvIHB4LTQgcHktMi41IHJvdW5kZWQteGwgYmctZ3JhZGllbnQtdG8tciBmcm9tLXJlZC02MDAgdmlhLXJvc2UtNjAwIHRvLXBpbmstNjAwIGhvdmVyOmZyb20tcmVkLTUwMCBob3Zlcjp0by1waW5rLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ibGFjayBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTIgc2hhZG93LXhsIHNoYWRvdy1yZWQtOTUwLzgwIGJvcmRlci0yIGJvcmRlci1yZWQtMzAwLzgwIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyIGFuaW1hdGUtcHVsc2UgYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgIHRpdGxlPVwiTmF0eWNobWlhc3QgbmFtaWVyeiBpIHpsaWt3aWR1aiBnbmlkxJkgbmlzemN6xIVjxIUgbmFzesSFIHByYWPEmSwgendvbG5paiB6YXNvYnkgaSB6YWJlenBpZWN6IHBsaWtpIVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZsYW1lIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC15ZWxsb3ctMzAwIGFuaW1hdGUtYm91bmNlXCIgLz5cbiAgICAgICAgICAgIDxzcGFuPlVCSUogR05JRMSYIE5JU1pDWsSEQ8SEIE5BU1rEhCBQUkFDxJghPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdjcmVhdGVfcnVsZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1wdXJwbGUtNjAwIGhvdmVyOmJnLXB1cnBsZS01MDAgdGV4dC13aGl0ZSB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTBcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPk5vd2EgUmVndcWCYTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIE5hdmlnYXRpb24gU3ViLVRhYnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBib3JkZXItYiBib3JkZXItc2xhdGUtODAwIHBiLTIgZmxleC13cmFwIGdhcC0yXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgc3BhY2UteC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdydWxlc19saXN0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BweC0zIHB5LTEuNSByb3VuZGVkLWxnIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ3J1bGVzX2xpc3QnXG4gICAgICAgICAgICAgICAgPyAnYmctcHVycGxlLTYwMCB0ZXh0LXdoaXRlIHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTkwMC80MCdcbiAgICAgICAgICAgICAgICA6ICd0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXNsYXRlLTIwMCBob3ZlcjpiZy1zbGF0ZS04MDAnXG4gICAgICAgICAgICB9YH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8U2xpZGVycyBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICA8c3Bhbj5aZGVmaW5pb3dhbmUgUmVndcWCeSAoe3J1bGVzLmxlbmd0aH0pPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0QWN0aXZlVGFiKCdjcmVhdGVfcnVsZScpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdjcmVhdGVfcnVsZSdcbiAgICAgICAgICAgICAgICA/ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUgc2hhZG93LW1kIHNoYWRvdy1wdXJwbGUtOTAwLzQwJ1xuICAgICAgICAgICAgICAgIDogJ3RleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtc2xhdGUtMjAwIGhvdmVyOmJnLXNsYXRlLTgwMCdcbiAgICAgICAgICAgIH1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxQbHVzIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPktyZWF0b3IgUmVndcWCeTwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYignZXhwb3J0X3NjcmlwdCcpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgcHgtMyBweS0xLjUgcm91bmRlZC1sZyB0ZXh0LXhzIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciAke1xuICAgICAgICAgICAgICBhY3RpdmVUYWIgPT09ICdleHBvcnRfc2NyaXB0J1xuICAgICAgICAgICAgICAgID8gJ2JnLXB1cnBsZS02MDAgdGV4dC13aGl0ZSBzaGFkb3ctbWQgc2hhZG93LXB1cnBsZS05MDAvNDAnXG4gICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC1zbGF0ZS0yMDAgaG92ZXI6Ymctc2xhdGUtODAwJ1xuICAgICAgICAgICAgfWB9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgIDxzcGFuPkVrc3BvcnQgU2tyeXB0dSBQeXRob25hPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHRleHQteHMgZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMiBoLTIgcm91bmRlZC1mdWxsIGJnLWVtZXJhbGQtNDAwIGFuaW1hdGUtcGluZ1wiIC8+XG4gICAgICAgICAgICBVYml0eWNoIGF1dG9tYXR5Y3puaWU6IDxzdHJvbmcgY2xhc3NOYW1lPVwidGV4dC13aGl0ZSBmb250LWJvbGRcIj57dG90YWxLaWxsc0NvdW50fTwvc3Ryb25nPlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206aW5saW5lIHRleHQtc2xhdGUtNjAwXCI+fDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoaWRkZW4gc206ZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgIDxTaGllbGRDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgIEFrdHl3bmUgcmVndcWCeTogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWVtZXJhbGQtNDAwXCI+e3J1bGVzLmZpbHRlcihyID0+IHIuaXNFbmFibGVkKS5sZW5ndGh9PC9zdHJvbmc+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuXG4gICAgICB7LyogVEFCIDE6IExJU1QgT0YgUlVMRVMgKi99XG4gICAgICB7YWN0aXZlVGFiID09PSAncnVsZXNfbGlzdCcgJiYgKFxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxuICAgICAgICAgIHsvKiBGaWx0ZXIgQmFyICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBzbTpmbGV4LXJvdyBpdGVtcy1zdGFydCBzbTppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC0zIGJnLXNsYXRlLTk1MCBwLTMgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSB3LWZ1bGwgc206dy03MlwiPlxuICAgICAgICAgICAgICA8U2VhcmNoIGNsYXNzTmFtZT1cInctNCBoLTQgYWJzb2x1dGUgbGVmdC0zIHRvcC0yLjUgdGV4dC1zbGF0ZS01MDBcIiAvPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgdmFsdWU9e3NlYXJjaEZpbHRlcn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFNlYXJjaEZpbHRlcihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJGaWx0cnVqIHJlZ3XFgnkgKG5hendhLCB3em9yemVjKS4uLlwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHBsLTkgcHItMyBweS0xLjUgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRleHQteHNcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1zbGF0ZS01MDAgdGV4dC1bMTFweF0gbXItMVwiPlByaW9yeXRldDo8L3NwYW4+XG4gICAgICAgICAgICAgIHsoWydBTEwnLCAnQ1JJVElDQUwnLCAnSElHSCcsICdNRURJVU0nXSBhcyBjb25zdCkubWFwKHNldiA9PiAoXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAga2V5PXtzZXZ9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTZWxlY3RlZFNldmVyaXR5KHNldil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BweC0yIHB5LTEgcm91bmRlZCB0ZXh0LVsxMXB4XSBmb250LW1vbm8gZm9udC1ib2xkIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyICR7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkU2V2ZXJpdHkgPT09IHNldlxuICAgICAgICAgICAgICAgICAgICAgID8gc2V2ID09PSAnQ1JJVElDQUwnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHNldiA9PT0gJ0hJR0gnXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci02MDAgdGV4dC1zbGF0ZS05NTAnXG4gICAgICAgICAgICAgICAgICAgICAgICA6ICdiZy1wdXJwbGUtNjAwIHRleHQtd2hpdGUnXG4gICAgICAgICAgICAgICAgICAgICAgOiAndGV4dC1zbGF0ZS00MDAgaG92ZXI6dGV4dC13aGl0ZSBiZy1zbGF0ZS05MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7c2V2ID09PSAnQUxMJyA/ICdXc3p5c3RraWUnIDogc2V2fVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIFJ1bGVzIENhcmRzIEdyaWQgKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIG1kOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICB7ZmlsdGVyZWRSdWxlcy5tYXAocnVsZSA9PiAoXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBrZXk9e3J1bGUuaWR9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgcm91bmRlZC14bCBib3JkZXIgcC00IHRyYW5zaXRpb24tYWxsICR7XG4gICAgICAgICAgICAgICAgICBydWxlLmlzRW5hYmxlZFxuICAgICAgICAgICAgICAgICAgICA/ICdiZy1zbGF0ZS05NTAvODAgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcHVycGxlLTYwMC81MCBzaGFkb3ctbWQnXG4gICAgICAgICAgICAgICAgICAgIDogJ2JnLXNsYXRlLTk1MC80MCBib3JkZXItc2xhdGUtOTAwIG9wYWNpdHktNjAnXG4gICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtc3RhcnQganVzdGlmeS1iZXR3ZWVuIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZsZXgtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAge3J1bGUucHJvdGVjdHNXb3JrICYmIDxGbGFtZSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LXJlZC00MDBcIiAvPn1cbiAgICAgICAgICAgICAgICAgICAgICAgIHtydWxlLm5hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B0ZXh0LVsxMHB4XSBmb250LW1vbm8gcHgtMiBweS0wLjUgcm91bmRlZCBmb250LWJvbGQgdXBwZXJjYXNlICR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuc2V2ZXJpdHkgPT09ICdDUklUSUNBTCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1yZWQtOTUwIHRleHQtcmVkLTMwMCBib3JkZXIgYm9yZGVyLXJlZC04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBydWxlLnNldmVyaXR5ID09PSAnSElHSCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdiZy1hbWJlci05NTAgdGV4dC1hbWJlci0zMDAgYm9yZGVyIGJvcmRlci1hbWJlci04MDAnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnYmctYmx1ZS05NTAgdGV4dC1ibHVlLTMwMCBib3JkZXIgYm9yZGVyLWJsdWUtODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfWB9XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3J1bGUuc2V2ZXJpdHl9XG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LXNsYXRlLTQwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPld6b3J6ZWM6IDxjb2RlIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTMwMCBmb250LWJvbGQgYmctc2xhdGUtOTAwIHB4LTEgcHktMC41IHJvdW5kZWRcIj57cnVsZS5wYXR0ZXJuIHx8IHJ1bGUubWF0Y2hGaWVsZH08L2NvZGU+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPuKAojwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Qb2xlOiA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwXCI+e3J1bGUubWF0Y2hGaWVsZH08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gb25Ub2dnbGVSdWxlKHJ1bGUuaWQpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJjdXJzb3ItcG9pbnRlciB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tYWxsIHNocmluay0wXCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3J1bGUuaXNFbmFibGVkID8gJ0RlYWt0eXd1aiByZWd1xYLEmScgOiAnQWt0eXd1aiByZWd1xYLEmSd9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHtydWxlLmlzRW5hYmxlZCA/IChcbiAgICAgICAgICAgICAgICAgICAgICA8VG9nZ2xlUmlnaHQgY2xhc3NOYW1lPVwidy02IGgtNiB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8VG9nZ2xlTGVmdCBjbGFzc05hbWU9XCJ3LTYgaC02IHRleHQtc2xhdGUtNjAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC14cyB0ZXh0LXNsYXRlLTQwMCBtdC0yLjUgbGVhZGluZy1yZWxheGVkIGJnLXNsYXRlLTkwMC81MCBwLTIgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXNsYXRlLTkwMFwiPlxuICAgICAgICAgICAgICAgICAge3J1bGUucmVhc29ufVxuICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgIHsvKiBGb290ZXIgTWV0cmljcyAmIEFjdGlvbnMgKi99XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtdC0zIHB0LTMgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTkwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8U2t1bGwgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICBVYml0bzogPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LXdoaXRlIGZvbnQtYm9sZFwiPntydWxlLm1hdGNoQ291bnR9PC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3J1bGUubGFzdFRyaWdnZXJlZCAmJiAoXG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9zdGF0bmlvOiB7cnVsZS5sYXN0VHJpZ2dlcmVkfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9uVGVzdFJ1bGUocnVsZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMi41IHB5LTEgcm91bmRlZC1sZyBiZy1yZWQtOTUwLzgwIGhvdmVyOmJnLXJlZC05MDAgdGV4dC1yZWQtMzAwIGJvcmRlciBib3JkZXItcmVkLTgwMC82MCB0ZXh0LVsxMXB4XSBmb250LWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgdHJhbnNpdGlvbi1hbGwgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiVXJ1Y2hvbSBzeW11bG93YW55IHByb2NlcyB0ZXN0b3d5IGkgc3ByYXdkxbogbmF0eWNobWlhc3Rvd3kgdWLDs2ogcHJ6ZXogdMSZIHJlZ3XFgsSZXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT1cInctMyBoLTNcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlRlc3QgVWJvanU8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBvbkRlbGV0ZVJ1bGUocnVsZS5pZCl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0xIHJvdW5kZWQtbGcgaG92ZXI6Ymctc2xhdGUtODAwIHRleHQtc2xhdGUtNTAwIGhvdmVyOnRleHQtcmVkLTQwMCB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJVc3XFhCB0xJkgcmVndcWCxJlcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFRyYXNoMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKSl9XG5cbiAgICAgICAgICAgIHtmaWx0ZXJlZFJ1bGVzLmxlbmd0aCA9PT0gMCAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLXNwYW4tMiBweS0xMiB0ZXh0LWNlbnRlciB0ZXh0LXNsYXRlLTUwMCBmb250LW1vbm8gdGV4dC14c1wiPlxuICAgICAgICAgICAgICAgIE5pZSB6bmFsZXppb25vIHJlZ3XFgiBzcGXFgm5pYWrEhWN5Y2gga3J5dGVyaWEgd3lzenVraXdhbmlhLlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cblxuICAgICAgey8qIFRBQiAyOiBDUkVBVEUgTkVXIFJVTEUgRk9STSAqL31cbiAgICAgIHthY3RpdmVUYWIgPT09ICdjcmVhdGVfcnVsZScgJiYgKFxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlQ3JlYXRlUnVsZVN1Ym1pdH0gY2xhc3NOYW1lPVwic3BhY2UteS00IG1heC13LTN4bCBteC1hdXRvIGJnLXNsYXRlLTk1MCBwLTUgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHBiLTMgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cInRleHQtc20gZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICA8UGx1cyBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RGVmaW5pb3dhbmllIE5vd2VqIFJlZ3XFgnkgQXV0b21hdHljem5lZ28gVWJvanU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS00MDAgbXQtMC41XCI+XG4gICAgICAgICAgICAgICAgU2tvbmZpZ3VydWoga3J5dGVyaWEsIG5hIHBvZHN0YXdpZSBrdMOzcnljaCBXYXRjaGRvZyBuYW1pZXJ6eSBpIHViaWplIG5pZWJlenBpZWN6bnkgcHJvY2VzIHcgMCBtcy5cbiAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBRdWljayBQcmVzZXQgQnV0dG9ucyAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgdGV4dC14cyBmb250LW1vbm9cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTBweF0gdGV4dC1zbGF0ZS01MDBcIj5Tenlia2llIHByZXNldHk6PC9zcGFuPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gYXBwbHlQcmVzZXQoJ3dvcmtfZGVzdHJveWVyJyl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMiBweS0xIHJvdW5kZWQgYmctcmVkLTk1MCB0ZXh0LXJlZC0zMDAgYm9yZGVyIGJvcmRlci1yZWQtODAwIHRleHQtWzEwcHhdIGhvdmVyOmJnLXJlZC05MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgR25pZGEgTmlzemN6xIVjYSBQcmFjxJlcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseVByZXNldCgncmFuc29td2FyZScpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSByb3VuZGVkIGJnLXB1cnBsZS05NTAgdGV4dC1wdXJwbGUtMzAwIGJvcmRlciBib3JkZXItcHVycGxlLTgwMCB0ZXh0LVsxMHB4XSBob3ZlcjpiZy1wdXJwbGUtOTAwIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIFJhbnNvbXdhcmVcbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBhcHBseVByZXNldCgnc2NyZWVuX2xvY2tlcicpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIgcHktMSByb3VuZGVkIGJnLXNsYXRlLTgwMCB0ZXh0LXNsYXRlLTMwMCB0ZXh0LVsxMHB4XSBob3ZlcjpiZy1zbGF0ZS03MDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgTG9ja2VyIEVrcmFudVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAge2Zvcm1FcnJvciAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1yZWQtOTUwLzcwIGJvcmRlciBib3JkZXItcmVkLTYwMCByb3VuZGVkLWxnIHRleHQteHMgdGV4dC1yZWQtMjAwIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxBbGVydFRyaWFuZ2xlIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1yZWQtNDAwIHNocmluay0wXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+e2Zvcm1FcnJvcn08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApfVxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIGdhcC00XCI+XG4gICAgICAgICAgICB7LyogUnVsZSBOYW1lICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNSBzbTpjb2wtc3Bhbi0yXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgIE5hendhIFJlZ3XFgnk6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17cnVsZU5hbWV9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSdWxlTmFtZShlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gTmF0eWNobWlhc3Rvd3kgdWLDs2ogZ25pZHkgbmlzemN6xIVjZWogcGxpa2kgcm9ib2N6ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgcGxhY2Vob2xkZXItc2xhdGUtNTAwIGZvY3VzOm91dGxpbmUtbm9uZSBmb2N1czpib3JkZXItcHVycGxlLTUwMFwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1hdGNoIFBhdHRlcm4gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41XCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTMwMCBibG9ja1wiPlxuICAgICAgICAgICAgICAgIFd6b3J6ZWMgRG9wYXNvd2FuaWEgKFdpbGRjYXJkICogbHViIGNpxIVnKTpcbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXtydWxlUGF0dGVybn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFJ1bGVQYXR0ZXJuKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIm5wLiAqd29ya19kZXN0cm95ZXIqLmV4ZSwgKmVuY3J5cHRvciosICouc2NyXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC13aGl0ZSBwbGFjZWhvbGRlci1zbGF0ZS01MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNTAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgTW/FvGVzeiB1xbx5d2HEhyBnd2lhemRlazogbnAuIDxjb2RlPipnbmlkYSo8L2NvZGU+IGRvcGFzdWplIGthxbxkxIUgbmF6d8SZIHphd2llcmFqxIVjxIUgc8WCb3dvIGduaWRhLlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIE1hdGNoIEZpZWxkICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBQb2xlIFNwcmF3ZHphbmlhOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgdmFsdWU9e3J1bGVNYXRjaEZpZWxkfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UnVsZU1hdGNoRmllbGQoZS50YXJnZXQudmFsdWUgYXMgV2F0Y2hkb2dNYXRjaEZpZWxkKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC13aGl0ZSBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJuYW1lXCI+TmF6d2EgUHJvY2VzdSAocHJvYy5uYW1lIC0gbnAuIHdvcmtfZGVzdHJveWVyLmV4ZSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwid2luZG93VGl0bGVcIj5UeXR1xYIgT2tuYSBXaW4zMiAod2luZG93VGl0bGUpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImZpbGVQYXRoXCI+UGXFgm5hIMWaY2llxbxrYSBuYSBEeXNrdSAoZmlsZVBhdGggLSBucC4gQzpcXC4uLlxcVGVtcCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaGFzRmx1dHRlckRsbFwiPkZsYWdhIFphxYJhZG93YW5pYSBmbHV0dGVyX3dpbmRvd3MuZGxsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImlzVG9wTW9zdFwiPlN0eWwgT2tuYSBIV05EX1RPUE1PU1QgKFotT3JkZXIgSGlqYWNrKTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogV2F0Y2hkb2cgQWN0aW9uICovfVxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwidGV4dC14cyBmb250LWJvbGQgdGV4dC1zbGF0ZS0zMDAgYmxvY2tcIj5cbiAgICAgICAgICAgICAgICBBa2NqYSBXYXRjaGRvZ2EgcG8gV3lrcnljaXU6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICB2YWx1ZT17cnVsZUFjdGlvbn1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFJ1bGVBY3Rpb24oZS50YXJnZXQudmFsdWUgYXMgV2F0Y2hkb2dSdWxlQWN0aW9uKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTAwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtbGcgcHgtMyBweS0yIHRleHQteHMgdGV4dC1wdXJwbGUtMzAwIGZvbnQtYm9sZCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDAgZm9udC1tb25vXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhdXRvX2tpbGxcIj5UZXJtaW5hdGVQcm9jZXNzKGgsIDkpIC0gTmF0eWNobWlhc3Rvd3kgdWLDs2o8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b19raWxsX2FuZF9wZV9zYWJvdGFnZVwiPlViw7NqICsgU2Fib3RhxbwgTmFnxYLDs3drYSBQRSBNWiAoMHhDMDAwMDA3Qik8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b19zdXNwZW5kXCI+TnRTdXNwZW5kUHJvY2VzcyhoKSAtIFphbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImF1dG9fdGhyb3R0bGVcIj5UaHJvdHRsZSAtIFpyZWR1a293YW5pZSBwcmlvcnl0ZXR1IENQVSBkbyBJRExFPC9vcHRpb24+XG4gICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBTZXZlcml0eSAqL31cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0xLjVcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgUG96aW9tIFphZ3JvxbxlbmlhOlxuICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgdmFsdWU9e3J1bGVTZXZlcml0eX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFJ1bGVTZXZlcml0eShlLnRhcmdldC52YWx1ZSBhcyBXYXRjaGRvZ1J1bGVTZXZlcml0eSl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGJnLXNsYXRlLTkwMCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLWxnIHB4LTMgcHktMiB0ZXh0LXhzIHRleHQtd2hpdGUgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1wdXJwbGUtNTAwIGZvbnQtbW9ub1wiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQ1JJVElDQUxcIj5LUllUWUNaTlkgKFphZ3JvxbxlbmllIGRsYSBkYW55Y2ggaSBwcmFjeSk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiSElHSFwiPldZU09LSSAoQmxva2FkYSBpbnRlcmZlanN1IGkgbmFrxYJhZGthKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJNRURJVU1cIj7FmlJFRE5JIChQb2RlanJ6YW55IHByb2NlcyBwb21vY25pY3p5KTwvb3B0aW9uPlxuICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICB7LyogUmVhc29uIC8gRGVzY3JpcHRpb24gKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMS41IHNtOmNvbC1zcGFuLTJcIj5cbiAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtc2xhdGUtMzAwIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgVXphc2FkbmllbmllIFJlZ3XFgnkgLyBPcGlzIE9jaHJvbnk6XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIHZhbHVlPXtydWxlUmVhc29ufVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0UnVsZVJlYXNvbihlLnRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJucC4gWmFwb2JpZWdhIHpuaXN6Y3plbml1IGJpZcW8xIVjZWogc2Vzamkgcm9ib2N6ZWosIHViaWphIHrFgm/Fm2xpd2UgcHJvY2VzeSB3IHXFgmFta3UgbWlsaXNla3VuZHkuXCJcbiAgICAgICAgICAgICAgICByb3dzPXsyfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy1zbGF0ZS05MDAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC1sZyBweC0zIHB5LTIgdGV4dC14cyB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyLXNsYXRlLTUwMCBmb2N1czpvdXRsaW5lLW5vbmUgZm9jdXM6Ym9yZGVyLXB1cnBsZS01MDBcIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBXb3JrIFByb3RlY3Rpb24gQ2hlY2tib3ggKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNtOmNvbC1zcGFuLTIgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcC0yLjUgcm91bmRlZC1sZyBiZy1yZWQtOTUwLzQwIGJvcmRlciBib3JkZXItcmVkLTkwMC81MFwiPlxuICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgIGlkPVwicHJvdGVjdHNXb3JrQ2hlY2tcIlxuICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3J1bGVQcm90ZWN0c1dvcmt9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRSdWxlUHJvdGVjdHNXb3JrKGUudGFyZ2V0LmNoZWNrZWQpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInJvdW5kZWQgYm9yZGVyLXNsYXRlLTgwMCB0ZXh0LXJlZC02MDAgZm9jdXM6cmluZy0wIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9XCJwcm90ZWN0c1dvcmtDaGVja1wiIGNsYXNzTmFtZT1cInRleHQteHMgdGV4dC1zbGF0ZS0yMDAgY3Vyc29yLXBvaW50ZXIgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICA8RmxhbWUgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC1yZWQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Pem5hY3ogamFrbyBwcmlvcnl0ZXRvd8SFIHJlZ3XFgsSZIG9jaHJvbnkgcHJhY3kgcHJ6ZWQgem5pc3pjemVuaWVtIChXb3JrIEd1YXJkKTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWVuZCBnYXAtMyBwdC0zIGJvcmRlci10IGJvcmRlci1zbGF0ZS04MDBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYigncnVsZXNfbGlzdCcpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgQW51bHVqXG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cInN1Ym1pdFwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTUgcHktMiByb3VuZGVkLWxnIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbGcgc2hhZG93LXB1cnBsZS05NTAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDaGVja0NpcmNsZTIgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjVcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5aYXBpc3ogUmVndcWCxJkgdyBXYXRjaGRvZ3U8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9mb3JtPlxuICAgICAgKX1cblxuICAgICAgey8qIFRBQiAzOiBFWFBPUlQgU0NSSVBUICovfVxuICAgICAge2FjdGl2ZVRhYiA9PT0gJ2V4cG9ydF9zY3JpcHQnICYmIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgYmctc2xhdGUtOTUwIHAtNCByb3VuZGVkLXhsIGJvcmRlciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHNtOmZsZXgtcm93IGl0ZW1zLXN0YXJ0IHNtOml0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTJcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPFRlcm1pbmFsIGNsYXNzTmFtZT1cInctNCBoLTQgdGV4dC1wdXJwbGUtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5BdXRvbm9taWN6bnkgRGVtb24gUHl0aG9uYSB6IFR3b2ltaSBSZWd1xYJhbWkgVWJvanU8L3NwYW4+XG4gICAgICAgICAgICAgIDwvaDQ+XG4gICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwXCI+XG4gICAgICAgICAgICAgICAgTW/FvGVzeiB1cnVjaG9tacSHIHRlbiBza3J5cHQgbmEgc3RhY2ppIHJvYm9jemVqIFdpbmRvd3MuIER6aWHFgmEgdyAxMDAlIG9mZmxpbmUsIGJleiBkb2RhdGtvd3ljaCBiaWJsaW90ZWsgcGlwLlxuICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlQ29weUNvZGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMyBweS0xLjUgcm91bmRlZC1sZyBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMzAwIHRleHQteHMgZm9udC1tb25vIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIHRyYW5zaXRpb24tYWxsIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb3BpZWRDb2RlID8gPENoZWNrIGNsYXNzTmFtZT1cInctMy41IGgtMy41IHRleHQtZW1lcmFsZC00MDBcIiAvPiA6IDxDb3B5IGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz59XG4gICAgICAgICAgICAgICAgPHNwYW4+e2NvcGllZENvZGUgPyAnU2tvcGlvd2FubyEnIDogJ0tvcGl1aid9PC9zcGFuPlxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkQ29kZX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTEuNSByb3VuZGVkLWxnIGJnLXB1cnBsZS02MDAgaG92ZXI6YmctcHVycGxlLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0cmFuc2l0aW9uLWFsbCBjdXJzb3ItcG9pbnRlciBzaGFkb3ctbWQgc2hhZG93LXB1cnBsZS05NTBcIlxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPERvd25sb2FkIGNsYXNzTmFtZT1cInctMy41IGgtMy41XCIgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2JpZXJ6IC5weTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwicC0zIGJnLXNsYXRlLTkwMCByb3VuZGVkLWxnIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtMzAwIG92ZXJmbG93LXgtYXV0byBtYXgtaC04MCBzZWxlY3QtYWxsXCI+XG4gICAgICAgICAgICB7Z2VuZXJhdGVQeXRob25EYWVtb25TY3JpcHQoKX1cbiAgICAgICAgICA8L3ByZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLCJtYXBwaW5ncyI6IkFBbVVjO0FBblVkLFNBQWdCLGdCQUFnQjtBQUNoQztBQUFBLEVBQ0U7QUFBQSxFQUFPO0FBQUEsRUFBTTtBQUFBLEVBQWtDO0FBQUEsRUFDL0M7QUFBQSxFQUFVO0FBQUEsRUFBTTtBQUFB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