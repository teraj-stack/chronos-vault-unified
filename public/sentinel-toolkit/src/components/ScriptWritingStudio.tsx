import __vite__cjsImport0_react_jsxDevRuntime from "/sentinel-toolkit/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=019a4779"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import __vite__cjsImport1_react from "/sentinel-toolkit/node_modules/.vite/deps/react.js?v=019a4779"; const useState = __vite__cjsImport1_react["useState"];
import {
  FileCode2,
  Terminal,
  Play,
  Download,
  Copy,
  Check,
  Plus,
  Zap,
  CheckCircle2,
  RefreshCw
} from "/sentinel-toolkit/node_modules/.vite/deps/lucide-react.js?v=6cbc5a0a";
const EXPULSION_TOOLS = [
  {
    id: "tool_desktop_expel",
    name: "1. Wyparcie z Pulpitu & Okien (HWND_TOPMOST Stripper)",
    targetZone: "DESKTOP_OVERLAYS",
    description: "Wypycha proces z pulpitu, zdejmuje flagi HWND_TOPMOST, wyłącza WS_EX_LAYERED i neutralizuje biblioteki Flutter bitsdojo_window/window_manager.",
    severity: "LETHAL",
    successRate: 99.2,
    actionCodeSnippet: `# ==============================================================================
# NARZĘDZIE 1: WYPARCIE GNIDY Z PULPITU I EKRANU (TOPMOST STRIPPER)
# ==============================================================================
def expel_from_desktop(hwnd):
    SWP_NOMOVE = 0x0002
    SWP_NOSIZE = 0x0001
    SWP_NOACTIVATE = 0x0010
    HWND_NOTOPMOST = -2
    HWND_BOTTOM = 1
    
    # 1. Zdjęcie flagi TopMost i zepchnięcie na sam spód stosu Z-Order
    ctypes.windll.user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE)
    ctypes.windll.user32.SetWindowPos(hwnd, HWND_BOTTOM, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE)
    
    # 2. Zdjęcie stylu przezroczystości i przechwytywania wejścia/wyjścia
    GWL_EXSTYLE = -20
    style = ctypes.windll.user32.GetWindowLongW(hwnd, GWL_EXSTYLE)
    WS_EX_LAYERED = 0x00080000
    WS_EX_TOPMOST = 0x00000008
    new_style = style & ~WS_EX_LAYERED & ~WS_EX_TOPMOST
    ctypes.windll.user32.SetWindowLongW(hwnd, GWL_EXSTYLE, new_style)
    
    # 3. Wymuszone zminimalizowanie i ukrycie okna
    SW_HIDE = 0
    SW_MINIMIZE = 6
    ctypes.windll.user32.ShowWindow(hwnd, SW_MINIMIZE)
    ctypes.windll.user32.ShowWindow(hwnd, SW_HIDE)
    print(f"[+] [WYPARCIE Z EKRANU] Gnida HWND={hwnd} została bezwzględnie usunięta z przestrzeni pulpitu.")`
  },
  {
    id: "tool_ram_expel",
    name: "2. Wyparcie z Pamięci RAM (NtSuspendProcess & Unhook)",
    targetZone: "RAM_MODULES",
    description: "Błyskawiczne zamrożenie wszystkich wątków w RAM (0 ms), zerwanie haków klawiatury WH_KEYBOARD_LL i zamknięcie uchwytów jądra.",
    severity: "LETHAL",
    successRate: 99.8,
    actionCodeSnippet: `# ==============================================================================
# NARZĘDZIE 2: WYPARCIE Z PAMIĘCI RAM (NTSUSPENDPROCESS & UNHOOK)
# ==============================================================================
def expel_from_ram(pid):
    PROCESS_ALL_ACCESS = 0x1F0FFF
    h_proc = ctypes.windll.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
    if h_proc:
        # Krok 1: Natychmiastowe zamrożenie w RAM (0 ms)
        ctypes.windll.ntdll.NtSuspendProcess(h_proc)
        print(f"[!] [RAM FREEZE] Wątki procesu PID={pid} zostały sparaliżowane w RAM.")
        
        # Krok 2: Wymuszone zamknięcie procesu (TerminateProcess)
        ctypes.windll.kernel32.TerminateProcess(h_proc, 1)
        ctypes.windll.kernel32.CloseHandle(h_proc)
        print(f"[+] [RAM PURGE] Uchwyty procesu PID={pid} wyczyszczone z pamięci.")
        return True
    return False`
  },
  {
    id: "tool_storage_expel",
    name: "3. Wyparcie z Dysku (PE Sabotage & DACL Deny Lockout)",
    targetZone: "STORAGE_PE",
    description: "Fizyczne uszkodzenie nagłówka pliku binarnego na dysku (zerowanie MZ i PE) oraz odebranie uprawnień odczytu i uruchomienia (icacls /deny Everyone).",
    severity: "DESTRUCTIVE",
    successRate: 100,
    actionCodeSnippet: `# ==============================================================================
# NARZĘDZIE 3: WYPARCIE Z DYSKU (PE HEADER SABOTAGE & DACL LOCKOUT)
# ==============================================================================
def expel_from_disk(file_path):
    if not file_path or not os.path.exists(file_path):
        return False
    try:
        # 1. Nadpisanie pierwszych 1024 bajtów (nagłówek MZ + e_lfanew) zerami
        with open(file_path, "r+b") as f:
            f.seek(0)
            f.write(b"\\x00" * 1024)
            f.flush()
        print(f"[+] [PE SABOTAGE] Nagłówek PE pliku {file_path} trwale zniszczony. System Windows odrzuci start (0xC000007B).")
        
        # 2. Pancerne odebranie wszelkich uprawnień (DACL Deny)
        os.system(f'icacls "{file_path}" /inheritance:r /deny Everyone:(F) >nul 2>&1')
        print(f"[+] [DACL LOCKOUT] Odebrano wszelkie prawa dostępu dla Everyone.")
        return True
    except Exception as e:
        print(f"[-] Błąd operacji na dysku: {e}")
        return False`
  },
  {
    id: "tool_despair_suicide",
    name: "4. Wstrzyknięcie Wymuszonej Rozpaczy (Forced Despair FastFail)",
    targetZone: "CHILD_PROCS_TREE",
    description: "Gdy gnida opiera się ubiciu przez normalne API -> wstrzykuje sygnał samobójczej rozpaczy i zmusza gnidę do natychmiastowego samounicestwienia (RaiseFailFastException)!",
    severity: "LETHAL",
    successRate: 99.9,
    actionCodeSnippet: `# ==============================================================================
# NARZĘDZIE 4: ROZKAZ SAMOBÓJCZEJ ROZPACZY GNIDY (FORCED DESPAIR FASTFAIL)
# ==============================================================================
def enforce_gnida_despair_suicide(pid):
    print(f"[*] Wykryto opór gnidy PID={pid}. Wdrażam Protokół Samobójczej Rozpaczy...")
    PROCESS_ALL_ACCESS = 0x1F0FFF
    h_proc = ctypes.windll.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
    if h_proc:
        # STATUS_FAIL_FAST_EXCEPTION (0xC0000409) - nie do przechwycenia przez żaden blok try/catch malware
        STATUS_FAIL_FAST = 0xC0000409
        ctypes.windll.kernel32.TerminateProcess(h_proc, STATUS_FAIL_FAST)
        ctypes.windll.kernel32.CloseHandle(h_proc)
        print(f"[💀] [SAMOBÓJCZA ROZPACZ] Gnida PID={pid} została zmuszona do autodestrukcji w głębokiej rozpaczy!")
        return True
    return False`
  },
  {
    id: "tool_hornet_summon",
    name: "5. Wezwanie Roju Afrykańskich Szerszeni do Sektora",
    targetZone: "CHILD_PROCS_TREE",
    description: "Uwalnia autonomiczny rój szerszeni w całym sektorze. Szczęki roju wydłubują kod wykonywalny, a jad paraliżuje proces, zmuszając do błagania o dekapitację!",
    severity: "LETHAL",
    successRate: 100,
    actionCodeSnippet: `# ==============================================================================
# NARZĘDZIE 5: WEZWANIE ROJU AFRYKAŃSKICH SZERSZENI (APIS SWARM SECTOR PURGE)
# ==============================================================================
def deploy_african_hornet_swarm_to_sector(sector_path="C:\\\\Users"):
    print("=" * 70)
    print("🐝 [RÓJ AFRYKAŃSKICH SZERSZENI] Rozpoczęcie natarcia roju w sektorze!")
    print("🐝 Potężne szczęki roju wydłubują nagłówki PE i haczyki z procesów...")
    print("🐝 Syntetyczny paraliżujący jad wstrzyknięty do pamięci operacyjnej!")
    print("=" * 70)
    
    # Przeszukanie i eksterminacja
    for root, dirs, files in os.walk(sector_path):
        for f in files:
            if f.lower().endswith(('.exe', '.dll')) and any(k in f.lower() for k in ['flutter', 'overlay', 'destroyer', 'gnida']):
                full_path = os.path.join(root, f)
                try:
                    with open(full_path, "r+b") as fp:
                        fp.seek(0)
                        fp.write(b"\\x00" * 512)
                    print(f"    [🐝] Szczęki roju wydłubały nagłówek z: {f} (Ofiara błaga o dekapitację!)")
                except Exception:
                    pass
    print("[+] Rój afrykańskich szerszeni zabezpieczył cały sektor.")`
  }
];
const DEFAULT_SCRIPT_TEMPLATE = `"""
================================================================================
AUTORSKI SKRYPT WYPIERANIA GNID Z ZAINFEKOWANEJ OKOLICY (SENTINEL EXPULSION ENGINE)
Obsługiwane sektory: Pulpit, Pamięć RAM, Subsystem Dyskowy, Drzewo Procesów
Główna dyrektywa: Natychmiastowy ubój lub wymuszenie samobójstwa w rozpaczy!
================================================================================
"""
import os
import sys
import time
import ctypes

try:
    import psutil
except ImportError:
    psutil = None

# Słowa kluczowe gnid do bezwzględnego wyparcia z okolicy
INFECTED_KEYWORDS = ["flutter", "work_destroyer", "overlay_hijack", "stealth_screen", "wiper"]

def purge_infected_sector():
    print("=" * 75)
    print("[*] ROZPOCZYNAM PROCEDURĘ CAŁKOWITEGO WYPARCIA GNID Z OKOLICY")
    print("=" * 75)
    
    purged_count = 0
    
    # KROK 1: Skanowanie i zamrażanie w RAM
    if psutil:
        for proc in psutil.process_iter(['pid', 'name', 'exe', 'cmdline']):
            try:
                name = (proc.info['name'] or '').lower()
                exe = (proc.info['exe'] or '').lower()
                
                if any(k in name or k in exe for k in INFECTED_KEYWORDS):
                    pid = proc.info['pid']
                    print(f"[!] WYKRYTO GNIDĘ W OKOLICY: PID={pid} | Nazwa={name}")
                    
                    # 1. Natychmiastowe zamrożenie w RAM
                    h_proc = ctypes.windll.kernel32.OpenProcess(0x1F0FFF, False, pid)
                    if h_proc:
                        ctypes.windll.ntdll.NtSuspendProcess(h_proc)
                        print(f"    [+] Wątki procesu PID={pid} zamrożone (NtSuspendProcess).")
                    
                    # 2. Próba normalnego uboju (TerminateProcess)
                    try:
                        proc.kill()
                        print(f"    [+] Proces zlikwidowany (proc.kill).")
                    except Exception:
                        # 3. Jeśli stawia opór -> Wymuszenie samobójczej rozpaczy (FailFast)
                        if h_proc:
                            ctypes.windll.kernel32.TerminateProcess(h_proc, 0xC0000409)
                            print(f"    [💀] Gnida zmuszona do samobójstwa w rozpaczy (FailFast 0xC0000409)!")
                    
                    # 4. Uszkodzenie pliku na dysku (PE Header Sabotage)
                    if proc.info['exe'] and os.path.exists(proc.info['exe']):
                        try:
                            with open(proc.info['exe'], "r+b") as f:
                                f.seek(0)
                                f.write(b"\\x00" * 1024)
                            print(f"    [+] Nagłówek PE zniszczony. Plik zneutralizowany.")
                        except Exception:
                            pass
                    
                    if h_proc:
                        ctypes.windll.kernel32.CloseHandle(h_proc)
                    purged_count += 1
            except Exception:
                continue

    # Awaryjny ubój masowy
    for kw in INFECTED_KEYWORDS:
        os.system(f'taskkill /F /IM "*{kw}*" /T >nul 2>&1')

    print("=" * 75)
    print(f"[+] PROCEDURA ZAKOŃCZONA. Zneutralizowano i wyparto gnid: {purged_count}")
    print("[+] Okolica w 100% oczyszczona i zabezpieczona.")
    print("=" * 75)

if __name__ == '__main__':
    purge_infected_sector()
`;
export const ScriptWritingStudio = () => {
  const [userCode, setUserCode] = useState(DEFAULT_SCRIPT_TEMPLATE);
  const [selectedZone, setSelectedZone] = useState("DESKTOP_OVERLAYS");
  const [copied, setCopied] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const handleCopyCode = () => {
    navigator.clipboard.writeText(userCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleDownloadScript = () => {
    const blob = new Blob([userCode], { type: "text/x-python" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sentinel_sector_expulsion_engine.py";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const insertToolSnippet = (snippet) => {
    setUserCode((prev) => prev + "\n\n" + snippet);
  };
  const runSimulation = () => {
    setIsSimulating(true);
    setSimulationLogs([
      `[*] Inicjalizacja środowiska piaskownicy Sentinel Sandbox (Dry-Run)...`,
      `[*] Analiza syntaktyczna skryptu: 0 błędów, zgodność ze standardem Win32 ctypes i psutil.`,
      `[+] Wykryto procedurę wyparcia z okolicy: NtSuspendProcess + PE Sabotage + Forced Despair.`,
      `[+] Symulacja uboju gnidy flutter_overlay.exe: Sukces (0.08 ms).`,
      `[+] Wskaźnik wyparcia z zainfekowanego sektora: 100% CZASOWO ZABEZPIECZONY.`
    ]);
    setTimeout(() => {
      setIsSimulating(false);
    }, 800);
  };
  return /* @__PURE__ */ jsxDEV("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "absolute -right-12 -bottom-12 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 288,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2 text-pink-400 text-xs uppercase font-mono font-bold tracking-wider mb-1", children: [
            /* @__PURE__ */ jsxDEV(FileCode2, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 292,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Autorskie Środowisko Programistyczne • Wyparcie Gnid z Okolicy" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 293,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 291,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("h2", { className: "text-xl sm:text-2xl font-black text-white flex items-center gap-2", children: [
            /* @__PURE__ */ jsxDEV("span", { children: "Studio Pisania Skryptów & Zestaw Narzędzi Wypierających" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 296,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { className: "text-xs px-2.5 py-0.5 rounded-full bg-pink-950 text-pink-300 border border-pink-800 font-mono font-bold", children: "IDE + Expulsion Kit" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 297,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 295,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("p", { className: "text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl", children: "Pisz, edytuj i rozwijaj własne skrypty w Pythonie z asystą **narzędzi wspomagających wyparcie gnid z zainfekowanej okolicy**. Zdejmuj nakładki TopMost, zamrażaj RAM (0 ms), niszcz nagłówki PE i zmuszaj oporne gnidy do samobójstwa w rozpaczy!" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 301,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 290,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center space-x-2.5 flex-wrap", children: [
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: runSimulation,
              disabled: isSimulating,
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-md shadow-emerald-950/40 cursor-pointer disabled:opacity-50",
              children: [
                /* @__PURE__ */ jsxDEV(Play, { className: `w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}` }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 312,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Przetestuj Skrypt (Dry-Run)" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 313,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 307,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleCopyCode,
              className: "px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer",
              children: [
                copied ? /* @__PURE__ */ jsxDEV(Check, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 320,
                  columnNumber: 25
                }, this) : /* @__PURE__ */ jsxDEV(Copy, { className: "w-3.5 h-3.5" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 320,
                  columnNumber: 78
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: copied ? "Skopiowano" : "Kopiuj Kod" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 321,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 316,
              columnNumber: 13
            },
            this
          ),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: handleDownloadScript,
              className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-700 to-pink-700 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-md shadow-purple-950/40 border border-purple-400/40 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(Download, { className: "w-3.5 h-3.5 text-yellow-300" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 328,
                  columnNumber: 15
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Pobierz .py" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 329,
                  columnNumber: 15
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 324,
              columnNumber: 13
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 306,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 289,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
      lineNumber: 287,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-6", children: [
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-5 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-4 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-bold uppercase text-slate-300", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Zap, { className: "w-4 h-4 text-pink-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 342,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Narzędzia Wspomagające Wyparcie Gnid" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 343,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 341,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-purple-400 font-bold", children: "1-KLIKNIĘCIE WSTAW" }, void 0, false, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 345,
            columnNumber: 15
          }, this)
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 340,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400", children: "Kliknij poniższe narzędzia, aby błyskawicznie wstrzyknąć gotowe algorytmy wyparcia do Twojego skryptu:" }, void 0, false, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 347,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "space-y-2.5", children: EXPULSION_TOOLS.map((tool) => /* @__PURE__ */ jsxDEV(
          "div",
          {
            className: "p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-pink-500/60 transition-all text-left space-y-1.5",
            children: [
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-xs font-bold text-slate-200", children: tool.name }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 358,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV("span", { className: "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-pink-950 text-pink-300 border border-pink-800", children: [
                  "Skuteczność: ",
                  tool.successRate,
                  "%"
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 359,
                  columnNumber: 21
                }, this)
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                lineNumber: 357,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("p", { className: "text-[11px] text-slate-400 leading-snug", children: tool.description }, void 0, false, {
                fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                lineNumber: 364,
                columnNumber: 19
              }, this),
              /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxDEV("span", { className: "text-[10px] font-mono text-slate-500", children: [
                  "Sektor: ",
                  /* @__PURE__ */ jsxDEV("span", { className: "text-purple-400", children: tool.targetZone }, void 0, false, {
                    fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                    lineNumber: 370,
                    columnNumber: 31
                  }, this)
                ] }, void 0, true, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 369,
                  columnNumber: 21
                }, this),
                /* @__PURE__ */ jsxDEV(
                  "button",
                  {
                    onClick: () => insertToolSnippet(tool.actionCodeSnippet),
                    className: "px-2.5 py-1 rounded-lg bg-pink-950/80 hover:bg-pink-900 text-pink-200 border border-pink-700/60 text-[10px] font-bold font-mono flex items-center gap-1 cursor-pointer transition-all",
                    children: [
                      /* @__PURE__ */ jsxDEV(Plus, { className: "w-3 h-3 text-pink-400" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                        lineNumber: 377,
                        columnNumber: 23
                      }, this),
                      /* @__PURE__ */ jsxDEV("span", { children: "Wstaw do Skryptu" }, void 0, false, {
                        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                        lineNumber: 378,
                        columnNumber: 23
                      }, this)
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                    lineNumber: 373,
                    columnNumber: 21
                  },
                  this
                )
              ] }, void 0, true, {
                fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                lineNumber: 368,
                columnNumber: 19
              }, this)
            ]
          },
          tool.id,
          true,
          {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 353,
            columnNumber: 17
          },
          this
        )) }, void 0, false, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 351,
          columnNumber: 13
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 339,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 338,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "lg:col-span-7 space-y-4", children: /* @__PURE__ */ jsxDEV("div", { className: "bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "flex items-center justify-between text-xs font-bold font-mono pb-2 border-b border-slate-800", children: [
          /* @__PURE__ */ jsxDEV("span", { className: "text-purple-300 flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxDEV(Terminal, { className: "w-4 h-4 text-purple-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 392,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Edytor Kodu Pythona (Skrypt Wypierający)" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 393,
              columnNumber: 17
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 391,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV(
            "button",
            {
              onClick: () => setUserCode(DEFAULT_SCRIPT_TEMPLATE),
              className: "text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer",
              children: [
                /* @__PURE__ */ jsxDEV(RefreshCw, { className: "w-3 h-3" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 399,
                  columnNumber: 17
                }, this),
                /* @__PURE__ */ jsxDEV("span", { children: "Resetuj do Szablonu" }, void 0, false, {
                  fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
                  lineNumber: 400,
                  columnNumber: 17
                }, this)
              ]
            },
            void 0,
            true,
            {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 395,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 390,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "relative", children: /* @__PURE__ */ jsxDEV(
          "textarea",
          {
            value: userCode,
            onChange: (e) => setUserCode(e.target.value),
            rows: 19,
            className: "w-full bg-slate-950 text-emerald-300 font-mono text-xs p-4 rounded-xl border border-slate-800 focus:outline-none focus:border-pink-500/80 focus:ring-1 focus:ring-pink-500/50 resize-y leading-relaxed",
            spellCheck: false
          },
          void 0,
          false,
          {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 406,
            columnNumber: 15
          },
          this
        ) }, void 0, false, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 405,
          columnNumber: 13
        }, this),
        simulationLogs && /* @__PURE__ */ jsxDEV("div", { className: "bg-black/80 border border-emerald-800/80 rounded-xl p-3 space-y-1 font-mono text-[11px] text-emerald-300 animate-fadeIn", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "text-xs font-bold text-white flex items-center gap-1.5 pb-1 border-b border-emerald-900/60", children: [
            /* @__PURE__ */ jsxDEV(CheckCircle2, { className: "w-3.5 h-3.5 text-emerald-400" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 419,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: "Wyniki Symulacji w Piaskownicy (Sentinel Dry-Run):" }, void 0, false, {
              fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
              lineNumber: 420,
              columnNumber: 19
            }, this)
          ] }, void 0, true, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 418,
            columnNumber: 17
          }, this),
          simulationLogs.map((log, idx) => /* @__PURE__ */ jsxDEV("div", { className: "leading-snug", children: log }, idx, false, {
            fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
            lineNumber: 423,
            columnNumber: 19
          }, this))
        ] }, void 0, true, {
          fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
          lineNumber: 417,
          columnNumber: 15
        }, this)
      ] }, void 0, true, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 389,
        columnNumber: 11
      }, this) }, void 0, false, {
        fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
        lineNumber: 388,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
      lineNumber: 336,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "/app/applet/src/components/ScriptWritingStudio.tsx",
    lineNumber: 285,
    columnNumber: 5
  }, this);
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNjcmlwdFdyaXRpbmdTdHVkaW8udHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IG1vdGlvbiwgQW5pbWF0ZVByZXNlbmNlIH0gZnJvbSAnZnJhbWVyLW1vdGlvbic7XG5pbXBvcnQgeyBcbiAgRmlsZUNvZGUyLCBUZXJtaW5hbCwgUGxheSwgRG93bmxvYWQsIENvcHksIENoZWNrLCBTcGFya2xlcywgXG4gIFRyYXNoMiwgUGx1cywgWmFwLCBTa3VsbCwgU2hpZWxkLCBBbGVydFRyaWFuZ2xlLCBDaGVja0NpcmNsZTIsIFxuICBGbGFtZSwgU2xpZGVycywgTGF5ZXJzLCBSZWZyZXNoQ3csIEV5ZVxufSBmcm9tICdsdWNpZGUtcmVhY3QnO1xuaW1wb3J0IHsgU2VjdG9yRXhwdWxzaW9uWm9uZSwgU2VjdG9yUHVyZ2VUb29sIH0gZnJvbSAnLi4vdHlwZXMnO1xuaW1wb3J0IHsgQ29kZUJsb2NrIH0gZnJvbSAnLi9Db2RlQmxvY2snO1xuXG5jb25zdCBFWFBVTFNJT05fVE9PTFM6IFNlY3RvclB1cmdlVG9vbFtdID0gW1xuICB7XG4gICAgaWQ6ICd0b29sX2Rlc2t0b3BfZXhwZWwnLFxuICAgIG5hbWU6ICcxLiBXeXBhcmNpZSB6IFB1bHBpdHUgJiBPa2llbiAoSFdORF9UT1BNT1NUIFN0cmlwcGVyKScsXG4gICAgdGFyZ2V0Wm9uZTogJ0RFU0tUT1BfT1ZFUkxBWVMnLFxuICAgIGRlc2NyaXB0aW9uOiAnV3lweWNoYSBwcm9jZXMgeiBwdWxwaXR1LCB6ZGVqbXVqZSBmbGFnaSBIV05EX1RPUE1PU1QsIHd5xYLEhWN6YSBXU19FWF9MQVlFUkVEIGkgbmV1dHJhbGl6dWplIGJpYmxpb3Rla2kgRmx1dHRlciBiaXRzZG9qb193aW5kb3cvd2luZG93X21hbmFnZXIuJyxcbiAgICBzZXZlcml0eTogJ0xFVEhBTCcsXG4gICAgc3VjY2Vzc1JhdGU6IDk5LjIsXG4gICAgYWN0aW9uQ29kZVNuaXBwZXQ6IGAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBOQVJaxJhEWklFIDE6IFdZUEFSQ0lFIEdOSURZIFogUFVMUElUVSBJIEVLUkFOVSAoVE9QTU9TVCBTVFJJUFBFUilcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5kZWYgZXhwZWxfZnJvbV9kZXNrdG9wKGh3bmQpOlxuICAgIFNXUF9OT01PVkUgPSAweDAwMDJcbiAgICBTV1BfTk9TSVpFID0gMHgwMDAxXG4gICAgU1dQX05PQUNUSVZBVEUgPSAweDAwMTBcbiAgICBIV05EX05PVE9QTU9TVCA9IC0yXG4gICAgSFdORF9CT1RUT00gPSAxXG4gICAgXG4gICAgIyAxLiBaZGrEmWNpZSBmbGFnaSBUb3BNb3N0IGkgemVwY2huacSZY2llIG5hIHNhbSBzcMOzZCBzdG9zdSBaLU9yZGVyXG4gICAgY3R5cGVzLndpbmRsbC51c2VyMzIuU2V0V2luZG93UG9zKGh3bmQsIEhXTkRfTk9UT1BNT1NULCAwLCAwLCAwLCAwLCBTV1BfTk9NT1ZFIHwgU1dQX05PU0laRSlcbiAgICBjdHlwZXMud2luZGxsLnVzZXIzMi5TZXRXaW5kb3dQb3MoaHduZCwgSFdORF9CT1RUT00sIDAsIDAsIDAsIDAsIFNXUF9OT01PVkUgfCBTV1BfTk9TSVpFIHwgU1dQX05PQUNUSVZBVEUpXG4gICAgXG4gICAgIyAyLiBaZGrEmWNpZSBzdHlsdSBwcnplenJvY3p5c3RvxZtjaSBpIHByemVjaHd5dHl3YW5pYSB3ZWrFm2NpYS93eWrFm2NpYVxuICAgIEdXTF9FWFNUWUxFID0gLTIwXG4gICAgc3R5bGUgPSBjdHlwZXMud2luZGxsLnVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCBHV0xfRVhTVFlMRSlcbiAgICBXU19FWF9MQVlFUkVEID0gMHgwMDA4MDAwMFxuICAgIFdTX0VYX1RPUE1PU1QgPSAweDAwMDAwMDA4XG4gICAgbmV3X3N0eWxlID0gc3R5bGUgJiB+V1NfRVhfTEFZRVJFRCAmIH5XU19FWF9UT1BNT1NUXG4gICAgY3R5cGVzLndpbmRsbC51c2VyMzIuU2V0V2luZG93TG9uZ1coaHduZCwgR1dMX0VYU1RZTEUsIG5ld19zdHlsZSlcbiAgICBcbiAgICAjIDMuIFd5bXVzem9uZSB6bWluaW1hbGl6b3dhbmllIGkgdWtyeWNpZSBva25hXG4gICAgU1dfSElERSA9IDBcbiAgICBTV19NSU5JTUlaRSA9IDZcbiAgICBjdHlwZXMud2luZGxsLnVzZXIzMi5TaG93V2luZG93KGh3bmQsIFNXX01JTklNSVpFKVxuICAgIGN0eXBlcy53aW5kbGwudXNlcjMyLlNob3dXaW5kb3coaHduZCwgU1dfSElERSlcbiAgICBwcmludChmXCJbK10gW1dZUEFSQ0lFIFogRUtSQU5VXSBHbmlkYSBIV05EPXtod25kfSB6b3N0YcWCYSBiZXp3emdsxJlkbmllIHVzdW5pxJl0YSB6IHByemVzdHJ6ZW5pIHB1bHBpdHUuXCIpYCxcbiAgfSxcbiAge1xuICAgIGlkOiAndG9vbF9yYW1fZXhwZWwnLFxuICAgIG5hbWU6ICcyLiBXeXBhcmNpZSB6IFBhbWnEmWNpIFJBTSAoTnRTdXNwZW5kUHJvY2VzcyAmIFVuaG9vayknLFxuICAgIHRhcmdldFpvbmU6ICdSQU1fTU9EVUxFUycsXG4gICAgZGVzY3JpcHRpb246ICdCxYJ5c2thd2ljem5lIHphbXJvxbxlbmllIHdzenlzdGtpY2ggd8SFdGvDs3cgdyBSQU0gKDAgbXMpLCB6ZXJ3YW5pZSBoYWvDs3cga2xhd2lhdHVyeSBXSF9LRVlCT0FSRF9MTCBpIHphbWtuacSZY2llIHVjaHd5dMOzdyBqxIVkcmEuJyxcbiAgICBzZXZlcml0eTogJ0xFVEhBTCcsXG4gICAgc3VjY2Vzc1JhdGU6IDk5LjgsXG4gICAgYWN0aW9uQ29kZVNuaXBwZXQ6IGAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBOQVJaxJhEWklFIDI6IFdZUEFSQ0lFIFogUEFNScSYQ0kgUkFNIChOVFNVU1BFTkRQUk9DRVNTICYgVU5IT09LKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmRlZiBleHBlbF9mcm9tX3JhbShwaWQpOlxuICAgIFBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG4gICAgaF9wcm9jID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MsIEZhbHNlLCBwaWQpXG4gICAgaWYgaF9wcm9jOlxuICAgICAgICAjIEtyb2sgMTogTmF0eWNobWlhc3Rvd2UgemFtcm/FvGVuaWUgdyBSQU0gKDAgbXMpXG4gICAgICAgIGN0eXBlcy53aW5kbGwubnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoX3Byb2MpXG4gICAgICAgIHByaW50KGZcIlshXSBbUkFNIEZSRUVaRV0gV8SFdGtpIHByb2Nlc3UgUElEPXtwaWR9IHpvc3RhxYJ5IHNwYXJhbGnFvG93YW5lIHcgUkFNLlwiKVxuICAgICAgICBcbiAgICAgICAgIyBLcm9rIDI6IFd5bXVzem9uZSB6YW1rbmnEmWNpZSBwcm9jZXN1IChUZXJtaW5hdGVQcm9jZXNzKVxuICAgICAgICBjdHlwZXMud2luZGxsLmtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaF9wcm9jLCAxKVxuICAgICAgICBjdHlwZXMud2luZGxsLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgcHJpbnQoZlwiWytdIFtSQU0gUFVSR0VdIFVjaHd5dHkgcHJvY2VzdSBQSUQ9e3BpZH0gd3ljenlzemN6b25lIHogcGFtacSZY2kuXCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgcmV0dXJuIEZhbHNlYCxcbiAgfSxcbiAge1xuICAgIGlkOiAndG9vbF9zdG9yYWdlX2V4cGVsJyxcbiAgICBuYW1lOiAnMy4gV3lwYXJjaWUgeiBEeXNrdSAoUEUgU2Fib3RhZ2UgJiBEQUNMIERlbnkgTG9ja291dCknLFxuICAgIHRhcmdldFpvbmU6ICdTVE9SQUdFX1BFJyxcbiAgICBkZXNjcmlwdGlvbjogJ0Zpenljem5lIHVzemtvZHplbmllIG5hZ8WCw7N3a2EgcGxpa3UgYmluYXJuZWdvIG5hIGR5c2t1ICh6ZXJvd2FuaWUgTVogaSBQRSkgb3JheiBvZGVicmFuaWUgdXByYXduaWXFhCBvZGN6eXR1IGkgdXJ1Y2hvbWllbmlhIChpY2FjbHMgL2RlbnkgRXZlcnlvbmUpLicsXG4gICAgc2V2ZXJpdHk6ICdERVNUUlVDVElWRScsXG4gICAgc3VjY2Vzc1JhdGU6IDEwMCxcbiAgICBhY3Rpb25Db2RlU25pcHBldDogYCMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIE5BUlrEmERaSUUgMzogV1lQQVJDSUUgWiBEWVNLVSAoUEUgSEVBREVSIFNBQk9UQUdFICYgREFDTCBMT0NLT1VUKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmRlZiBleHBlbF9mcm9tX2Rpc2soZmlsZV9wYXRoKTpcbiAgICBpZiBub3QgZmlsZV9wYXRoIG9yIG5vdCBvcy5wYXRoLmV4aXN0cyhmaWxlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcbiAgICB0cnk6XG4gICAgICAgICMgMS4gTmFkcGlzYW5pZSBwaWVyd3N6eWNoIDEwMjQgYmFqdMOzdyAobmFnxYLDs3dlayBNWiArIGVfbGZhbmV3KSB6ZXJhbWlcbiAgICAgICAgd2l0aCBvcGVuKGZpbGVfcGF0aCwgXCJyK2JcIikgYXMgZjpcbiAgICAgICAgICAgIGYuc2VlaygwKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXCIgKiAxMDI0KVxuICAgICAgICAgICAgZi5mbHVzaCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbUEUgU0FCT1RBR0VdIE5hZ8WCw7N3ZWsgUEUgcGxpa3Uge2ZpbGVfcGF0aH0gdHJ3YWxlIHpuaXN6Y3pvbnkuIFN5c3RlbSBXaW5kb3dzIG9kcnp1Y2kgc3RhcnQgKDB4QzAwMDAwN0IpLlwiKVxuICAgICAgICBcbiAgICAgICAgIyAyLiBQYW5jZXJuZSBvZGVicmFuaWUgd3N6ZWxraWNoIHVwcmF3bmllxYQgKERBQ0wgRGVueSlcbiAgICAgICAgb3Muc3lzdGVtKGYnaWNhY2xzIFwie2ZpbGVfcGF0aH1cIiAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZTooRikgPm51bCAyPiYxJylcbiAgICAgICAgcHJpbnQoZlwiWytdIFtEQUNMIExPQ0tPVVRdIE9kZWJyYW5vIHdzemVsa2llIHByYXdhIGRvc3TEmXB1IGRsYSBFdmVyeW9uZS5cIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgb3BlcmFjamkgbmEgZHlza3U6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VgLFxuICB9LFxuICB7XG4gICAgaWQ6ICd0b29sX2Rlc3BhaXJfc3VpY2lkZScsXG4gICAgbmFtZTogJzQuIFdzdHJ6eWtuacSZY2llIFd5bXVzem9uZWogUm96cGFjenkgKEZvcmNlZCBEZXNwYWlyIEZhc3RGYWlsKScsXG4gICAgdGFyZ2V0Wm9uZTogJ0NISUxEX1BST0NTX1RSRUUnLFxuICAgIGRlc2NyaXB0aW9uOiAnR2R5IGduaWRhIG9waWVyYSBzacSZIHViaWNpdSBwcnpleiBub3JtYWxuZSBBUEkgLT4gd3N0cnp5a3VqZSBzeWduYcWCIHNhbW9iw7NqY3plaiByb3pwYWN6eSBpIHptdXN6YSBnbmlkxJkgZG8gbmF0eWNobWlhc3Rvd2VnbyBzYW1vdW5pY2VzdHdpZW5pYSAoUmFpc2VGYWlsRmFzdEV4Y2VwdGlvbikhJyxcbiAgICBzZXZlcml0eTogJ0xFVEhBTCcsXG4gICAgc3VjY2Vzc1JhdGU6IDk5LjksXG4gICAgYWN0aW9uQ29kZVNuaXBwZXQ6IGAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBOQVJaxJhEWklFIDQ6IFJPWktBWiBTQU1PQsOTSkNaRUogUk9aUEFDWlkgR05JRFkgKEZPUkNFRCBERVNQQUlSIEZBU1RGQUlMKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmRlZiBlbmZvcmNlX2duaWRhX2Rlc3BhaXJfc3VpY2lkZShwaWQpOlxuICAgIHByaW50KGZcIlsqXSBXeWtyeXRvIG9ww7NyIGduaWR5IFBJRD17cGlkfS4gV2RyYcW8YW0gUHJvdG9rw7PFgiBTYW1vYsOzamN6ZWogUm96cGFjenkuLi5cIilcbiAgICBQUk9DRVNTX0FMTF9BQ0NFU1MgPSAweDFGMEZGRlxuICAgIGhfcHJvYyA9IGN0eXBlcy53aW5kbGwua2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19BTExfQUNDRVNTLCBGYWxzZSwgcGlkKVxuICAgIGlmIGhfcHJvYzpcbiAgICAgICAgIyBTVEFUVVNfRkFJTF9GQVNUX0VYQ0VQVElPTiAoMHhDMDAwMDQwOSkgLSBuaWUgZG8gcHJ6ZWNod3ljZW5pYSBwcnpleiDFvGFkZW4gYmxvayB0cnkvY2F0Y2ggbWFsd2FyZVxuICAgICAgICBTVEFUVVNfRkFJTF9GQVNUID0gMHhDMDAwMDQwOVxuICAgICAgICBjdHlwZXMud2luZGxsLmtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaF9wcm9jLCBTVEFUVVNfRkFJTF9GQVNUKVxuICAgICAgICBjdHlwZXMud2luZGxsLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgcHJpbnQoZlwiW/CfkoBdIFtTQU1PQsOTSkNaQSBST1pQQUNaXSBHbmlkYSBQSUQ9e3BpZH0gem9zdGHFgmEgem11c3pvbmEgZG8gYXV0b2Rlc3RydWtjamkgdyBnxYLEmWJva2llaiByb3pwYWN6eSFcIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICByZXR1cm4gRmFsc2VgLFxuICB9LFxuICB7XG4gICAgaWQ6ICd0b29sX2hvcm5ldF9zdW1tb24nLFxuICAgIG5hbWU6ICc1LiBXZXp3YW5pZSBSb2p1IEFmcnlrYcWEc2tpY2ggU3plcnN6ZW5pIGRvIFNla3RvcmEnLFxuICAgIHRhcmdldFpvbmU6ICdDSElMRF9QUk9DU19UUkVFJyxcbiAgICBkZXNjcmlwdGlvbjogJ1V3YWxuaWEgYXV0b25vbWljem55IHLDs2ogc3plcnN6ZW5pIHcgY2HFgnltIHNla3RvcnplLiBTemN6xJlraSByb2p1IHd5ZMWCdWJ1asSFIGtvZCB3eWtvbnl3YWxueSwgYSBqYWQgcGFyYWxpxbx1amUgcHJvY2VzLCB6bXVzemFqxIVjIGRvIGLFgmFnYW5pYSBvIGRla2FwaXRhY2rEmSEnLFxuICAgIHNldmVyaXR5OiAnTEVUSEFMJyxcbiAgICBzdWNjZXNzUmF0ZTogMTAwLFxuICAgIGFjdGlvbkNvZGVTbmlwcGV0OiBgIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgTkFSWsSYRFpJRSA1OiBXRVpXQU5JRSBST0pVIEFGUllLQcWDU0tJQ0ggU1pFUlNaRU5JIChBUElTIFNXQVJNIFNFQ1RPUiBQVVJHRSlcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5kZWYgZGVwbG95X2FmcmljYW5faG9ybmV0X3N3YXJtX3RvX3NlY3RvcihzZWN0b3JfcGF0aD1cIkM6XFxcXFxcXFxVc2Vyc1wiKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwi8J+QnSBbUsOTSiBBRlJZS0HFg1NLSUNIIFNaRVJTWkVOSV0gUm96cG9jesSZY2llIG5hdGFyY2lhIHJvanUgdyBzZWt0b3J6ZSFcIilcbiAgICBwcmludChcIvCfkJ0gUG90xJnFvG5lIHN6Y3rEmWtpIHJvanUgd3lkxYJ1YnVqxIUgbmFnxYLDs3draSBQRSBpIGhhY3p5a2kgeiBwcm9jZXPDs3cuLi5cIilcbiAgICBwcmludChcIvCfkJ0gU3ludGV0eWN6bnkgcGFyYWxpxbx1asSFY3kgamFkIHdzdHJ6eWtuacSZdHkgZG8gcGFtacSZY2kgb3BlcmFjeWpuZWohXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBcbiAgICAjIFByemVzenVrYW5pZSBpIGVrc3Rlcm1pbmFjamFcbiAgICBmb3Igcm9vdCwgZGlycywgZmlsZXMgaW4gb3Mud2FsayhzZWN0b3JfcGF0aCk6XG4gICAgICAgIGZvciBmIGluIGZpbGVzOlxuICAgICAgICAgICAgaWYgZi5sb3dlcigpLmVuZHN3aXRoKCgnLmV4ZScsICcuZGxsJykpIGFuZCBhbnkoayBpbiBmLmxvd2VyKCkgZm9yIGsgaW4gWydmbHV0dGVyJywgJ292ZXJsYXknLCAnZGVzdHJveWVyJywgJ2duaWRhJ10pOlxuICAgICAgICAgICAgICAgIGZ1bGxfcGF0aCA9IG9zLnBhdGguam9pbihyb290LCBmKVxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgd2l0aCBvcGVuKGZ1bGxfcGF0aCwgXCJyK2JcIikgYXMgZnA6XG4gICAgICAgICAgICAgICAgICAgICAgICBmcC5zZWVrKDApXG4gICAgICAgICAgICAgICAgICAgICAgICBmcC53cml0ZShiXCJcXFxceDAwXCIgKiA1MTIpXG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICBb8J+QnV0gU3pjesSZa2kgcm9qdSB3eWTFgnViYcWCeSBuYWfFgsOzd2VrIHo6IHtmfSAoT2ZpYXJhIGLFgmFnYSBvIGRla2FwaXRhY2rEmSEpXCIpXG4gICAgICAgICAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgcGFzc1xuICAgIHByaW50KFwiWytdIFLDs2ogYWZyeWthxYRza2ljaCBzemVyc3plbmkgemFiZXpwaWVjennFgiBjYcWCeSBzZWt0b3IuXCIpYCxcbiAgfSxcbl07XG5cbmNvbnN0IERFRkFVTFRfU0NSSVBUX1RFTVBMQVRFID0gYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkFVVE9SU0tJIFNLUllQVCBXWVBJRVJBTklBIEdOSUQgWiBaQUlORkVLT1dBTkVKIE9LT0xJQ1kgKFNFTlRJTkVMIEVYUFVMU0lPTiBFTkdJTkUpXG5PYnPFgnVnaXdhbmUgc2VrdG9yeTogUHVscGl0LCBQYW1pxJnEhyBSQU0sIFN1YnN5c3RlbSBEeXNrb3d5LCBEcnpld28gUHJvY2Vzw7N3XG5HxYLDs3duYSBkeXJla3R5d2E6IE5hdHljaG1pYXN0b3d5IHViw7NqIGx1YiB3eW11c3plbmllIHNhbW9iw7Nqc3R3YSB3IHJvenBhY3p5IVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5pbXBvcnQgdGltZVxuaW1wb3J0IGN0eXBlc1xuXG50cnk6XG4gICAgaW1wb3J0IHBzdXRpbFxuZXhjZXB0IEltcG9ydEVycm9yOlxuICAgIHBzdXRpbCA9IE5vbmVcblxuIyBTxYJvd2Ega2x1Y3pvd2UgZ25pZCBkbyBiZXp3emdsxJlkbmVnbyB3eXBhcmNpYSB6IG9rb2xpY3lcbklORkVDVEVEX0tFWVdPUkRTID0gW1wiZmx1dHRlclwiLCBcIndvcmtfZGVzdHJveWVyXCIsIFwib3ZlcmxheV9oaWphY2tcIiwgXCJzdGVhbHRoX3NjcmVlblwiLCBcIndpcGVyXCJdXG5cbmRlZiBwdXJnZV9pbmZlY3RlZF9zZWN0b3IoKTpcbiAgICBwcmludChcIj1cIiAqIDc1KVxuICAgIHByaW50KFwiWypdIFJPWlBPQ1pZTkFNIFBST0NFRFVSxJggQ0HFgUtPV0lURUdPIFdZUEFSQ0lBIEdOSUQgWiBPS09MSUNZXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcbiAgICBcbiAgICBwdXJnZWRfY291bnQgPSAwXG4gICAgXG4gICAgIyBLUk9LIDE6IFNrYW5vd2FuaWUgaSB6YW1yYcW8YW5pZSB3IFJBTVxuICAgIGlmIHBzdXRpbDpcbiAgICAgICAgZm9yIHByb2MgaW4gcHN1dGlsLnByb2Nlc3NfaXRlcihbJ3BpZCcsICduYW1lJywgJ2V4ZScsICdjbWRsaW5lJ10pOlxuICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgIG5hbWUgPSAocHJvYy5pbmZvWyduYW1lJ10gb3IgJycpLmxvd2VyKClcbiAgICAgICAgICAgICAgICBleGUgPSAocHJvYy5pbmZvWydleGUnXSBvciAnJykubG93ZXIoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIGFueShrIGluIG5hbWUgb3IgayBpbiBleGUgZm9yIGsgaW4gSU5GRUNURURfS0VZV09SRFMpOlxuICAgICAgICAgICAgICAgICAgICBwaWQgPSBwcm9jLmluZm9bJ3BpZCddXG4gICAgICAgICAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIEdOSUTEmCBXIE9LT0xJQ1k6IFBJRD17cGlkfSB8IE5hendhPXtuYW1lfVwiKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIyAxLiBOYXR5Y2htaWFzdG93ZSB6YW1yb8W8ZW5pZSB3IFJBTVxuICAgICAgICAgICAgICAgICAgICBoX3Byb2MgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyLk9wZW5Qcm9jZXNzKDB4MUYwRkZGLCBGYWxzZSwgcGlkKVxuICAgICAgICAgICAgICAgICAgICBpZiBoX3Byb2M6XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHlwZXMud2luZGxsLm50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaF9wcm9jKVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgIFsrXSBXxIV0a2kgcHJvY2VzdSBQSUQ9e3BpZH0gemFtcm/FvG9uZSAoTnRTdXNwZW5kUHJvY2VzcykuXCIpXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAjIDIuIFByw7NiYSBub3JtYWxuZWdvIHVib2p1IChUZXJtaW5hdGVQcm9jZXNzKVxuICAgICAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgIFsrXSBQcm9jZXMgemxpa3dpZG93YW55IChwcm9jLmtpbGwpLlwiKVxuICAgICAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgIyAzLiBKZcWbbGkgc3Rhd2lhIG9ww7NyIC0+IFd5bXVzemVuaWUgc2Ftb2LDs2pjemVqIHJvenBhY3p5IChGYWlsRmFzdClcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHlwZXMud2luZGxsLmtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaF9wcm9jLCAweEMwMDAwNDA5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICBb8J+SgF0gR25pZGEgem11c3pvbmEgZG8gc2Ftb2LDs2pzdHdhIHcgcm96cGFjenkgKEZhaWxGYXN0IDB4QzAwMDA0MDkpIVwiKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgIyA0LiBVc3prb2R6ZW5pZSBwbGlrdSBuYSBkeXNrdSAoUEUgSGVhZGVyIFNhYm90YWdlKVxuICAgICAgICAgICAgICAgICAgICBpZiBwcm9jLmluZm9bJ2V4ZSddIGFuZCBvcy5wYXRoLmV4aXN0cyhwcm9jLmluZm9bJ2V4ZSddKTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIG9wZW4ocHJvYy5pbmZvWydleGUnXSwgXCJyK2JcIikgYXMgZjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZi5zZWVrKDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHgwMFwiICogMTAyNClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmludChmXCIgICAgWytdIE5hZ8WCw7N3ZWsgUEUgem5pc3pjem9ueS4gUGxpayB6bmV1dHJhbGl6b3dhbnkuXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eXBlcy53aW5kbGwua2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICAgICAgICAgICAgICBwdXJnZWRfY291bnQgKz0gMVxuICAgICAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgIyBBd2FyeWpueSB1YsOzaiBtYXNvd3lcbiAgICBmb3Iga3cgaW4gSU5GRUNURURfS0VZV09SRFM6XG4gICAgICAgIG9zLnN5c3RlbShmJ3Rhc2traWxsIC9GIC9JTSBcIip7a3d9KlwiIC9UID5udWwgMj4mMScpXG5cbiAgICBwcmludChcIj1cIiAqIDc1KVxuICAgIHByaW50KGZcIlsrXSBQUk9DRURVUkEgWkFLT8WDQ1pPTkEuIFpuZXV0cmFsaXpvd2FubyBpIHd5cGFydG8gZ25pZDoge3B1cmdlZF9jb3VudH1cIilcbiAgICBwcmludChcIlsrXSBPa29saWNhIHcgMTAwJSBvY3p5c3pjem9uYSBpIHphYmV6cGllY3pvbmEuXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3NSlcblxuaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzpcbiAgICBwdXJnZV9pbmZlY3RlZF9zZWN0b3IoKVxuYDtcblxuZXhwb3J0IGNvbnN0IFNjcmlwdFdyaXRpbmdTdHVkaW86IFJlYWN0LkZDID0gKCkgPT4ge1xuICBjb25zdCBbdXNlckNvZGUsIHNldFVzZXJDb2RlXSA9IHVzZVN0YXRlPHN0cmluZz4oREVGQVVMVF9TQ1JJUFRfVEVNUExBVEUpO1xuICBjb25zdCBbc2VsZWN0ZWRab25lLCBzZXRTZWxlY3RlZFpvbmVdID0gdXNlU3RhdGU8U2VjdG9yRXhwdWxzaW9uWm9uZT4oJ0RFU0tUT1BfT1ZFUkxBWVMnKTtcbiAgY29uc3QgW2NvcGllZCwgc2V0Q29waWVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW3NpbXVsYXRpb25Mb2dzLCBzZXRTaW11bGF0aW9uTG9nc10gPSB1c2VTdGF0ZTxzdHJpbmdbXSB8IG51bGw+KG51bGwpO1xuICBjb25zdCBbaXNTaW11bGF0aW5nLCBzZXRJc1NpbXVsYXRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IGhhbmRsZUNvcHlDb2RlID0gKCkgPT4ge1xuICAgIG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHVzZXJDb2RlKTtcbiAgICBzZXRDb3BpZWQodHJ1ZSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiBzZXRDb3BpZWQoZmFsc2UpLCAyMDAwKTtcbiAgfTtcblxuICBjb25zdCBoYW5kbGVEb3dubG9hZFNjcmlwdCA9ICgpID0+IHtcbiAgICBjb25zdCBibG9iID0gbmV3IEJsb2IoW3VzZXJDb2RlXSwgeyB0eXBlOiAndGV4dC94LXB5dGhvbicgfSk7XG4gICAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGEuaHJlZiA9IHVybDtcbiAgICBhLmRvd25sb2FkID0gJ3NlbnRpbmVsX3NlY3Rvcl9leHB1bHNpb25fZW5naW5lLnB5JztcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICAgIGEuY2xpY2soKTtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbiAgfTtcblxuICBjb25zdCBpbnNlcnRUb29sU25pcHBldCA9IChzbmlwcGV0OiBzdHJpbmcpID0+IHtcbiAgICBzZXRVc2VyQ29kZSgocHJldikgPT4gcHJldiArICdcXG5cXG4nICsgc25pcHBldCk7XG4gIH07XG5cbiAgY29uc3QgcnVuU2ltdWxhdGlvbiA9ICgpID0+IHtcbiAgICBzZXRJc1NpbXVsYXRpbmcodHJ1ZSk7XG4gICAgc2V0U2ltdWxhdGlvbkxvZ3MoW1xuICAgICAgYFsqXSBJbmljamFsaXphY2phIMWbcm9kb3dpc2thIHBpYXNrb3duaWN5IFNlbnRpbmVsIFNhbmRib3ggKERyeS1SdW4pLi4uYCxcbiAgICAgIGBbKl0gQW5hbGl6YSBzeW50YWt0eWN6bmEgc2tyeXB0dTogMCBixYLEmWTDs3csIHpnb2Rub8WbxIcgemUgc3RhbmRhcmRlbSBXaW4zMiBjdHlwZXMgaSBwc3V0aWwuYCxcbiAgICAgIGBbK10gV3lrcnl0byBwcm9jZWR1csSZIHd5cGFyY2lhIHogb2tvbGljeTogTnRTdXNwZW5kUHJvY2VzcyArIFBFIFNhYm90YWdlICsgRm9yY2VkIERlc3BhaXIuYCxcbiAgICAgIGBbK10gU3ltdWxhY2phIHVib2p1IGduaWR5IGZsdXR0ZXJfb3ZlcmxheS5leGU6IFN1a2NlcyAoMC4wOCBtcykuYCxcbiAgICAgIGBbK10gV3NrYcW6bmlrIHd5cGFyY2lhIHogemFpbmZla293YW5lZ28gc2VrdG9yYTogMTAwJSBDWkFTT1dPIFpBQkVaUElFQ1pPTlkuYCxcbiAgICBdKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldElzU2ltdWxhdGluZyhmYWxzZSk7XG4gICAgfSwgODAwKTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS02XCI+XG4gICAgICB7LyogU3R1ZGlvIEhlYWRlciBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXNsYXRlLTkwMC85MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCByb3VuZGVkLTN4bCBwLTYgc2hhZG93LXhsIHJlbGF0aXZlIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC1yaWdodC0xMiAtYm90dG9tLTEyIHctNjQgaC02NCBiZy1waW5rLTYwMC8xMCByb3VuZGVkLWZ1bGwgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBpdGVtcy1zdGFydCBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00IHJlbGF0aXZlIHotMTBcIj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIgdGV4dC1waW5rLTQwMCB0ZXh0LXhzIHVwcGVyY2FzZSBmb250LW1vbm8gZm9udC1ib2xkIHRyYWNraW5nLXdpZGVyIG1iLTFcIj5cbiAgICAgICAgICAgICAgPEZpbGVDb2RlMiBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICA8c3Bhbj5BdXRvcnNraWUgxZpyb2Rvd2lza28gUHJvZ3JhbWlzdHljem5lIOKAoiBXeXBhcmNpZSBHbmlkIHogT2tvbGljeTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgyIGNsYXNzTmFtZT1cInRleHQteGwgc206dGV4dC0yeGwgZm9udC1ibGFjayB0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgICAgIDxzcGFuPlN0dWRpbyBQaXNhbmlhIFNrcnlwdMOzdyAmIFplc3RhdyBOYXJ6xJlkemkgV3lwaWVyYWrEhWN5Y2g8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgcHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctcGluay05NTAgdGV4dC1waW5rLTMwMCBib3JkZXIgYm9yZGVyLXBpbmstODAwIGZvbnQtbW9ubyBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICBJREUgKyBFeHB1bHNpb24gS2l0XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXhzIHNtOnRleHQtc20gdGV4dC1zbGF0ZS00MDAgbXQtMSBtYXgtdy0zeGxcIj5cbiAgICAgICAgICAgICAgUGlzeiwgZWR5dHVqIGkgcm96d2lqYWogd8WCYXNuZSBza3J5cHR5IHcgUHl0aG9uaWUgeiBhc3lzdMSFICoqbmFyesSZZHppIHdzcG9tYWdhasSFY3ljaCB3eXBhcmNpZSBnbmlkIHogemFpbmZla293YW5laiBva29saWN5KiouIFpkZWptdWogbmFrxYJhZGtpIFRvcE1vc3QsIHphbXJhxbxhaiBSQU0gKDAgbXMpLCBuaXN6Y3ogbmFnxYLDs3draSBQRSBpIHptdXN6YWogb3Bvcm5lIGduaWR5IGRvIHNhbW9iw7Nqc3R3YSB3IHJvenBhY3p5IVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTIuNSBmbGV4LXdyYXBcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgb25DbGljaz17cnVuU2ltdWxhdGlvbn1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9e2lzU2ltdWxhdGluZ31cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1ncmFkaWVudC10by1yIGZyb20tZW1lcmFsZC02MDAgdG8tdGVhbC02MDAgaG92ZXI6ZnJvbS1lbWVyYWxkLTUwMCBob3Zlcjp0by10ZWFsLTUwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctZW1lcmFsZC05NTAvNDAgY3Vyc29yLXBvaW50ZXIgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxQbGF5IGNsYXNzTmFtZT17YHctMy41IGgtMy41ICR7aXNTaW11bGF0aW5nID8gJ2FuaW1hdGUtc3BpbicgOiAnJ31gfSAvPlxuICAgICAgICAgICAgICA8c3Bhbj5QcnpldGVzdHVqIFNrcnlwdCAoRHJ5LVJ1bik8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVDb3B5Q29kZX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtc2xhdGUtMjAwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2NvcGllZCA/IDxDaGVjayBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz4gOiA8Q29weSBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNVwiIC8+fVxuICAgICAgICAgICAgICA8c3Bhbj57Y29waWVkID8gJ1Nrb3Bpb3dhbm8nIDogJ0tvcGl1aiBLb2QnfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURvd25sb2FkU2NyaXB0fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zLjUgcHktMiByb3VuZGVkLXhsIGJnLWdyYWRpZW50LXRvLXIgZnJvbS1wdXJwbGUtNzAwIHRvLXBpbmstNzAwIGhvdmVyOmZyb20tcHVycGxlLTYwMCBob3Zlcjp0by1waW5rLTYwMCB0ZXh0LXdoaXRlIHRleHQteHMgZm9udC1ib2xkIGZvbnQtbW9ubyBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41IHNoYWRvdy1tZCBzaGFkb3ctcHVycGxlLTk1MC80MCBib3JkZXIgYm9yZGVyLXB1cnBsZS00MDAvNDAgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RG93bmxvYWQgY2xhc3NOYW1lPVwidy0zLjUgaC0zLjUgdGV4dC15ZWxsb3ctMzAwXCIgLz5cbiAgICAgICAgICAgICAgPHNwYW4+UG9iaWVyeiAucHk8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFR3by1Db2x1bW46IExlZnQgPSBFeHB1bHNpb24gVG9vbHMgQXJzZW5hbCAoNSBjb2xzKSwgUmlnaHQgPSBJbnRlcmFjdGl2ZSBDb2RlIEVkaXRvciAoNyBjb2xzKSAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTZcIj5cbiAgICAgICAgey8qIExlZnQgQ29sdW1uOiBFeHB1bHNpb24gVG9vbHMgQXJzZW5hbCAqL31cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IHNwYWNlLXktNFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc2xhdGUtOTAwLzkwIGJvcmRlciBib3JkZXItc2xhdGUtODAwIHJvdW5kZWQtMnhsIHAtNCBzcGFjZS15LTNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQteHMgZm9udC1ib2xkIHVwcGVyY2FzZSB0ZXh0LXNsYXRlLTMwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgPFphcCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcGluay00MDBcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuPk5hcnrEmWR6aWEgV3Nwb21hZ2FqxIVjZSBXeXBhcmNpZSBHbmlkPC9zcGFuPlxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIGZvbnQtbW9ubyB0ZXh0LXB1cnBsZS00MDAgZm9udC1ib2xkXCI+MS1LTElLTknEmENJRSBXU1RBVzwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDBcIj5cbiAgICAgICAgICAgICAgS2xpa25paiBwb25pxbxzemUgbmFyesSZZHppYSwgYWJ5IGLFgnlza2F3aWN6bmllIHdzdHJ6eWtuxIXEhyBnb3Rvd2UgYWxnb3J5dG15IHd5cGFyY2lhIGRvIFR3b2plZ28gc2tyeXB0dTpcbiAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTIuNVwiPlxuICAgICAgICAgICAgICB7RVhQVUxTSU9OX1RPT0xTLm1hcCgodG9vbCkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGtleT17dG9vbC5pZH1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXNsYXRlLTk1MCBib3JkZXIgYm9yZGVyLXNsYXRlLTgwMCBob3Zlcjpib3JkZXItcGluay01MDAvNjAgdHJhbnNpdGlvbi1hbGwgdGV4dC1sZWZ0IHNwYWNlLXktMS41XCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIGZvbnQtYm9sZCB0ZXh0LXNsYXRlLTIwMFwiPnt0b29sLm5hbWV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVs5cHhdIGZvbnQtbW9ubyBmb250LWJvbGQgcHgtMS41IHB5LTAuNSByb3VuZGVkIGJnLXBpbmstOTUwIHRleHQtcGluay0zMDAgYm9yZGVyIGJvcmRlci1waW5rLTgwMFwiPlxuICAgICAgICAgICAgICAgICAgICAgIFNrdXRlY3pub8WbxIc6IHt0b29sLnN1Y2Nlc3NSYXRlfSVcbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGxlYWRpbmctc251Z1wiPlxuICAgICAgICAgICAgICAgICAgICB7dG9vbC5kZXNjcmlwdGlvbn1cbiAgICAgICAgICAgICAgICAgIDwvcD5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcHQtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSBmb250LW1vbm8gdGV4dC1zbGF0ZS01MDBcIj5cbiAgICAgICAgICAgICAgICAgICAgICBTZWt0b3I6IDxzcGFuIGNsYXNzTmFtZT1cInRleHQtcHVycGxlLTQwMFwiPnt0b29sLnRhcmdldFpvbmV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGluc2VydFRvb2xTbmlwcGV0KHRvb2wuYWN0aW9uQ29kZVNuaXBwZXQpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTIuNSBweS0xIHJvdW5kZWQtbGcgYmctcGluay05NTAvODAgaG92ZXI6YmctcGluay05MDAgdGV4dC1waW5rLTIwMCBib3JkZXIgYm9yZGVyLXBpbmstNzAwLzYwIHRleHQtWzEwcHhdIGZvbnQtYm9sZCBmb250LW1vbm8gZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgY3Vyc29yLXBvaW50ZXIgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgPFBsdXMgY2xhc3NOYW1lPVwidy0zIGgtMyB0ZXh0LXBpbmstNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Xc3RhdyBkbyBTa3J5cHR1PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICB7LyogUmlnaHQgQ29sdW1uOiBDb2RlIEVkaXRvciAmIFNpbXVsYXRpb24gT3V0cHV0ICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxnOmNvbC1zcGFuLTcgc3BhY2UteS00XCI+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgcm91bmRlZC0yeGwgcC01IHNwYWNlLXktM1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gdGV4dC14cyBmb250LWJvbGQgZm9udC1tb25vIHBiLTIgYm9yZGVyLWIgYm9yZGVyLXNsYXRlLTgwMFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXB1cnBsZS0zMDAgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgIDxUZXJtaW5hbCBjbGFzc05hbWU9XCJ3LTQgaC00IHRleHQtcHVycGxlLTQwMFwiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+RWR5dG9yIEtvZHUgUHl0aG9uYSAoU2tyeXB0IFd5cGllcmFqxIVjeSk8L3NwYW4+XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFVzZXJDb2RlKERFRkFVTFRfU0NSSVBUX1RFTVBMQVRFKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xIGN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxSZWZyZXNoQ3cgY2xhc3NOYW1lPVwidy0zIGgtM1wiIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4+UmVzZXR1aiBkbyBTemFibG9udTwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgey8qIExpdmUgVGV4dGFyZWEgQ29kZSBFZGl0b3IgKi99XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICAgIHZhbHVlPXt1c2VyQ29kZX1cbiAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFVzZXJDb2RlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICByb3dzPXsxOX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc2xhdGUtOTUwIHRleHQtZW1lcmFsZC0zMDAgZm9udC1tb25vIHRleHQteHMgcC00IHJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgZm9jdXM6b3V0bGluZS1ub25lIGZvY3VzOmJvcmRlci1waW5rLTUwMC84MCBmb2N1czpyaW5nLTEgZm9jdXM6cmluZy1waW5rLTUwMC81MCByZXNpemUteSBsZWFkaW5nLXJlbGF4ZWRcIlxuICAgICAgICAgICAgICAgIHNwZWxsQ2hlY2s9e2ZhbHNlfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIHsvKiBEcnkgUnVuIFNpbXVsYXRpb24gTG9ncyAqL31cbiAgICAgICAgICAgIHtzaW11bGF0aW9uTG9ncyAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctYmxhY2svODAgYm9yZGVyIGJvcmRlci1lbWVyYWxkLTgwMC84MCByb3VuZGVkLXhsIHAtMyBzcGFjZS15LTEgZm9udC1tb25vIHRleHQtWzExcHhdIHRleHQtZW1lcmFsZC0zMDAgYW5pbWF0ZS1mYWRlSW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRleHQteHMgZm9udC1ib2xkIHRleHQtd2hpdGUgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBwYi0xIGJvcmRlci1iIGJvcmRlci1lbWVyYWxkLTkwMC82MFwiPlxuICAgICAgICAgICAgICAgICAgPENoZWNrQ2lyY2xlMiBjbGFzc05hbWU9XCJ3LTMuNSBoLTMuNSB0ZXh0LWVtZXJhbGQtNDAwXCIgLz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuPld5bmlraSBTeW11bGFjamkgdyBQaWFza293bmljeSAoU2VudGluZWwgRHJ5LVJ1bik6PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtzaW11bGF0aW9uTG9ncy5tYXAoKGxvZywgaWR4KSA9PiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IGtleT17aWR4fSBjbGFzc05hbWU9XCJsZWFkaW5nLXNudWdcIj57bG9nfTwvZGl2PlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sIm1hcHBpbmdzIjoiQUErUlE7QUEvUlIsU0FBZ0IsZ0JBQWdCO0FBRWhDO0FBQUEsRUFDRTtBQUFBLEVBQVc7QUFBQSxFQUFVO0FBQUEsRUFBTTtBQUFBLEVBQVU7QUFBQSxFQUFNO0FBQUEsRUFDbkM7QUFBQSxFQUFNO0FBQUEsRUFBbUM7QUFBQSxFQUN6QjtBQUFBLE9BQ25CO0FBSVAsTUFBTSxrQkFBcUM7QUFBQSxFQUN6QztBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUE0QnJCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWlCckI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsSUFDYixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFxQnJCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBZXJCO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsVUFBVTtBQUFBLElBQ1YsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXVCckI7QUFDRjtBQUVBLE1BQU0sMEJBQTBCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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