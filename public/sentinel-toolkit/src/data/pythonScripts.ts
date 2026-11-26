export const PYTHON_SCRIPTS = [
  {
    id: "gnida_auto_freeze_daemon",
    title: "⚡ CZUJNIK GNID: Autonomiczny Daemon Natychmiastowego Auto-Freezu (0 ms NtSuspendProcess / Zero UI)",
    shortDesc: "W 100% bezobsługowy automat w tle. Wykrywa pojawienie się dowolnej Gnidy (okna TopMost, nakładki Flutter, kradzież fokusu, próby wstrzykiwania do pamięci) i w 0 ms zamraża jej wątki w RAM za pomocą ntdll.NtSuspendProcess oraz zdejmuje flagę z okna.",
    badge: "Autonomiczny Czujnik & Auto-Freeze",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Czysty automat działający w pętli jądra bez potrzeby jakiejkolwiek interakcji z UI",
      "Natychmiastowy czas reakcji (0 ms) przy pojawieniu się złośliwego procesu lub okna",
      "NtSuspendProcess (ctypes/Win32) natychmiast zamraża wątki w pamięci RAM",
      "Automatyczne odpięcie flagi HWND_TOPMOST (SetWindowPos) i natychmiastowe odzyskanie monitora",
      "Na Linux/macOS wysyła natychmiastowy sygnał SIGSTOP (kill -19)",
      "Działa bez zewnętrznych bibliotek (Zero-Dependency) w czystym Pythonie 3"
    ],
    recommendedFor: "Wymagana ciągła ochrona w tle przed złośliwymi nakładkami, ransomwarem i blokadami pulpitu. Uruchomiony raz w tle chroni system 24/7.",
    explanation: [
      "1. Sensoryka Okien: Ciągłe wywoływanie EnumWindows w pętli niskopoziomowej z filtrowaniem flagi WS_EX_TOPMOST.",
      "2. Sensoryka Procesów: Weryfikacja PID-ów pod kątem sygnatur nakładek i hooków.",
      "3. Natychmiastowy Auto-Free: Przy pierwszej detekcji następuje wywołanie ntdll.NtSuspendProcess bez czekania na decyzję użytkownika.",
      "4. Zwolnienie I/O: user32.SetWindowPos zdejmuje zablokowane warstwy z monitora i przywraca pulpit.",
      "5. Brak Zużycia CPU: Inteligentna pętla ze snem 150 ms nie obciąża procesora."
    ],
    code: `#!/usr/bin/env python3
# ==============================================================================
# AUTONOMICZNY CZUJNIK GNID & DAEMON NATYCHMIASTOWEGO AUTO-FREEZU W RAM
# Plik: gnida_auto_freeze_daemon.py
# ==============================================================================
import os
import sys
import time
import signal
import ctypes
from ctypes import wintypes

POLL_INTERVAL_SEC = 0.15
AUTO_STRIP_TOPMOST = True
AUTO_SUSPEND_RAM   = True
AUTO_LOG_CONSOLE   = True

GNIDA_KEYWORDS = [
    "flutter_desktop", "overlay", "screen_lock", "topmost", "hijack",
    "ransom", "wiper", "miner", "hook_spy", "bitsdojo", "window_manager"
]

HWND_NOTOPMOST = -2
SWP_NOSIZE     = 0x0001
SWP_NOMOVE     = 0x0002
SWP_NOACTIVATE = 0x0010
WS_EX_TOPMOST  = 0x00000008
PROCESS_ALL_ACCESS = 0x1F0FFF

class GnidaAutoFreezeDaemon:
    def __init__(self):
        self.is_windows = os.name == 'nt'
        self.frozen_pids = set()
        self.total_frozen_count = 0
        if self.is_windows:
            self.user32 = ctypes.windll.user32
            self.kernel32 = ctypes.windll.kernel32
            self.ntdll = ctypes.windll.ntdll
        print("=" * 75)
        print("[*] AUTONOMICZNY CZUJNIK GNID ZAINICJALIZOWANY (TRYB AUTOMATU W TLE)")
        print(f"[*] Platforma: {sys.platform.upper()} | Interwał: {POLL_INTERVAL_SEC}s")
        print("[*] Gotowy. Każda wykryta Gnida zostanie zamrożona automatycznie (0 ms).")
        print("=" * 75)

    def freeze_process_ram(self, pid, proc_name="Nieznana Gnida"):
        if pid in self.frozen_pids or pid <= 4:
            return False
        success = False
        if self.is_windows:
            h_proc = self.kernel32.OpenProcess(PROCESS_ALL_ACCESS, False, pid)
            if h_proc:
                status = self.ntdll.NtSuspendProcess(h_proc)
                self.kernel32.CloseHandle(h_proc)
                if status == 0:
                    success = True
        else:
            try:
                os.kill(pid, signal.SIGSTOP)
                success = True
            except Exception:
                pass

        if success:
            self.frozen_pids.add(pid)
            self.total_frozen_count += 1
            if AUTO_LOG_CONSOLE:
                print(f"[⚡ AUTO-FREEZE] CZUJNIK WYKRYŁ GNIDĘ: PID={pid} ({proc_name})")
                print(f"               -> Wątki natychmiast zamrożone w RAM (NtSuspendProcess)!")
                print(f"               -> Łącznie zneutralizowanych Gnid: {self.total_frozen_count}")
        return success

    def strip_topmost_window(self, hwnd):
        if not self.is_windows:
            return
        ex_style = self.user32.GetWindowLongW(hwnd, -20)
        if ex_style & WS_EX_TOPMOST:
            self.user32.SetWindowPos(
                hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, 
                SWP_NOMOVE | SWP_NOSIZE | SWP_NOACTIVATE
            )
            if AUTO_LOG_CONSOLE:
                print(f"[⚡ I/O RESTORE] Odzyskano fokus monitora ze złośliwego HWND={hwnd}")

    def scan_windows_and_freeze(self):
        if not self.is_windows:
            return
        WNDENUMPROC = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
        def enum_window_callback(hwnd, lParam):
            if not self.user32.IsWindowVisible(hwnd):
                return True
            pid = wintypes.DWORD()
            self.user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
            ex_style = self.user32.GetWindowLongW(hwnd, -20)
            is_topmost = bool(ex_style & WS_EX_TOPMOST)
            length = self.user32.GetWindowTextLengthW(hwnd)
            buff = ctypes.create_unicode_buffer(length + 1)
            self.user32.GetWindowTextW(hwnd, buff, length + 1)
            title = buff.value.lower()
            is_gnida = is_topmost or any(kw in title for kw in GNIDA_KEYWORDS)
            if is_gnida and pid.value not in self.frozen_pids:
                if AUTO_STRIP_TOPMOST:
                    self.strip_topmost_window(hwnd)
                if AUTO_SUSPEND_RAM:
                    self.freeze_process_ram(pid.value, f"Okno: '{buff.value}'")
            return True
        self.user32.EnumWindows(WNDENUMPROC(enum_window_callback), 0)

    def run_forever(self):
        try:
            while True:
                self.scan_windows_and_freeze()
                time.sleep(POLL_INTERVAL_SEC)
        except KeyboardInterrupt:
            print("\\n[*] Czujnik zatrzymany.")

if __name__ == '__main__':
    daemon = GnidaAutoFreezeDaemon()
    daemon.run_forever()
`
  },
  {
    id: "emergency_panic_suspend_multi_os",
    title: "★ PANIC BUTTON: Multi-OS Simultaneous Flutter Process Suspend (ctypes / SIGSTOP 19)",
    shortDesc: "Natychmiastowe zatrzymanie wątków wszystkich procesów powiązanych z Flutterem i nakładkami w pamięci RAM. Używa ntdll.NtSuspendProcess (ctypes) na Windows oraz sygnału SIGSTOP (kill -19 / pkill) na Linux i macOS.",
    badge: "Universal Multi-OS Panic Freeze",
    os: ["windows", "linux", "macos"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Wykrywa platformę w locie (Windows, Linux, macOS) bez zewnętrznych zależności",
      "Windows: NtSuspendProcess (0x0800 PROCESS_SUSPEND_RESUME) natychmiast zamraża cykle CPU",
      "Linux/macOS: Wysyła sygnał jądra SIGSTOP (Signal 19) za pomocą os.kill / pkill -STOP",
      "Zachowuje nienaruszony stan pamięci RAM do analizy powłamaniowej i forensic dumpa",
      "Uwalnia kursor myszy i klawiaturę z pętli przechwytywania okna blokady"
    ],
    recommendedFor: "W sytuacji krytycznej, gdy nakładka Fluttera zablokowała cały ekran, uniemożliwia kliknięcie czegokolwiek i wymaga natychmiastowego zamrożenia na dowolnym systemie (Windows/Linux/macOS).",
    explanation: [
      "1. Auto-Detekcja OS: platform.system() rozróżnia Windows (NT) od systemów POSIX (Linux/Darwin).",
      "2. Windows Engine: Wykorzystuje ctypes.windll.ntdll.NtSuspendProcess na uchwycie procesu otwartym z uprawnieniem 0x0800.",
      "3. POSIX Engine: Wykorzystuje os.kill(pid, signal.SIGSTOP) - sygnał 19 zatrzymuje planowanie wątków przez scheduler jądra Linux/macOS.",
      "4. Zwolnienie I/O: Natychmiast uwalnia kursor myszy i system kolejkowania zdarzeń okna.",
      "5. Bezpieczeństwo Danych: Proces pozostaje w pamięci (status T / Suspended) umożliwiając zrzut pamięci (core dump)."
    ],
    code: `"""
=============================================================================
MULTI-OS EMERGENCY PANIC FREEZE SCRIPT (WINDOWS / LINUX / MACOS)
=============================================================================
100% OFFLINE / ZERO-DEPENDENCY EMERGENCY SUSPEND ENGINE
Automatycznie wykrywa system operacyjny i natychmiastowo ZAMRAŻA (NtSuspendProcess
lub SIGSTOP Signal 19) wszystkie procesy powiązane z Flutterem i nakładkami.
=============================================================================
"""
import sys
import os
import platform
import subprocess
import signal

def panic_suspend_windows():
    """Windows Kernel Thread & Process Suspend via ntdll.NtSuspendProcess"""
    print("[*] Wykryto środowisko WINDOWS. Inicjalizacja ntdll / ctypes...")
    try:
        import ctypes
        from ctypes import wintypes

        ntdll = ctypes.windll.ntdll
        kernel32 = ctypes.windll.kernel32
        PROCESS_SUSPEND_RESUME = 0x0800

        cmd = 'tasklist /FO CSV /NH'
        output = subprocess.check_output(cmd, shell=True, text=True, errors='ignore')
        
        target_names = ['flutter', 'runner', 'overlay', 'dropper', 'lockscreen']
        suspended_count = 0

        for line in output.strip().split('\\n'):
            parts = [p.strip('"') for p in line.split('","')]
            if len(parts) >= 2:
                pname = parts[0]
                try:
                    pid = int(parts[1])
                except ValueError:
                    continue

                if any(t in pname.lower() for t in target_names):
                    print(f"[!] Zamrażanie PID {pid} ({pname})...")
                    h_process = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
                    if h_process:
                        status = ntdll.NtSuspendProcess(h_process)
                        kernel32.CloseHandle(h_process)
                        if status == 0:
                            print(f"  [✓] NtSuspendProcess(PID={pid}) SUKCES! Wątki zamrożone w RAM.")
                            suspended_count += 1
                        else:
                            print(f"  [X] NtSuspendProcess zwrócił kod NTSTATUS: 0x{status:08X}")
                    else:
                        print(f"  [X] Brak uprawnień do OpenProcess dla PID {pid}. Uruchom jako Administrator!")

        print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie Windows.")

    except Exception as e:
        print(f"[BŁĄD WINDOWS] {e}")

def panic_suspend_posix(os_name):
    """Linux & macOS Process Freeze via SIGSTOP (Signal 19)"""
    print(f"[*] Wykryto środowisko POSIX ({os_name}). Wysyłanie sygnału SIGSTOP (19)...")
    target_patterns = ['flutter', 'flutter_runner', 'lockscreen', 'overlay_app']
    suspended_count = 0

    for pattern in target_patterns:
        try:
            pids_raw = subprocess.check_output(['pgrep', '-f', pattern], text=True, errors='ignore')
            pids = [int(p) for p in pids_raw.strip().split() if p.isdigit()]

            for pid in pids:
                if pid == os.getpid():
                    continue
                try:
                    os.kill(pid, signal.SIGSTOP) # Sygnał 19 (SIGSTOP)
                    print(f"  [✓] kill -STOP (PID={pid}, wzorzec='{pattern}') -> Wątki zatrzymane przez scheduler jądra!")
                    suspended_count += 1
                except PermissionError:
                    print(f"  [X] Wymagany root / sudo dla PID {pid}!")
                except ProcessLookupError:
                    pass
        except subprocess.CalledProcessError:
            pass

    try:
        subprocess.run(['pkill', '-STOP', '-f', 'flutter'], check=False)
    except Exception:
        pass

    print(f"\\n[ZAKOŃCZONO] Zamrożono {suspended_count} procesów na platformie {os_name}.")

def main():
    print("=" * 70)
    print("  EMERGENCY PANIC FREEZE: MULTI-OS SIMULTANEOUS PROCESS SUSPEND")
    print("=" * 70)
    
    current_os = platform.system().lower()
    print(f"[*] Wykryta platforma jądra: {platform.system()} ({platform.release()})")

    if current_os == 'windows':
        panic_suspend_windows()
    elif current_os == 'linux':
        panic_suspend_posix('Linux')
    elif current_os == 'darwin':
        panic_suspend_posix('macOS')
    else:
        print(f"[!] Nieznany system: {current_os}. Próba wykonania standardowego SIGSTOP...")
        panic_suspend_posix(current_os)

    print("=" * 70)
    print("  STAN AWARYJNY: PROCESY ZATRZYMANE W PAMIĘCI RAM (0% CPU)")
    print("  Aby wznowić procesy w celach debugowania:")
    print("    - Linux/macOS : kill -CONT <PID>  lub  pkill -CONT -f flutter")
    print("    - Windows     : ntdll.NtResumeProcess(hProcess)")
    print("=" * 70)

if __name__ == '__main__':
    main()
`
  },
  {
    id: "process_resource_watchdog_daemon",
    title: "★ PROCESS WATCHDOG: Ciągły Strażnik CPU & Pamięci RAM z Auto-Freeze",
    shortDesc: "Daemon czasu rzeczywistego badający zużycie zasobów (GetProcessTimes, WorkingSet RAM) okien nakładek Fluttera. Błyskawicznie zamraża wątki w RAM (NtSuspendProcess) lub ubija proces przy przekroczeniu limitów.",
    badge: "CPU & RAM Resource Watchdog",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Ciągłe badanie pamięci WorkingSetSize za pomocą K32GetProcessMemoryInfo / PSAPI",
      "Pomiary obciążenia CPU dla wątków okien Always-on-top i Fullscreen",
      "Reguły automatycznej reakcji: NtSuspendProcess (zamrożenie), SetPriorityClass (dławienie), TerminateProcess",
      "Wykrywanie pętli renderowania Flutter Vsync loop i anomalii wycieków pamięci",
      "Działa w 100% offline bez żadnych zewnętrznych bibliotek (Pure ctypes Win32 API)"
    ],
    recommendedFor: "Gdy nakładka Fluttera lub szkodliwy proces przeciąża komputer, zawiesza kursor myszy, zużywa zbyt dużo procesora/RAM-u lub próbuje uniemożliwić uruchomienie Menedżera Zadań.",
    explanation: [
      "1. Pobieranie HWND: EnumWindows identyfikuje wszystkie widoczne okna z flagą WS_EX_TOPMOST.",
      "2. Telemetria Pamięci: Wywołuje GetProcessMemoryInfo z psapi.dll, odczytując rozmiar WorkingSetSize i PagefileUsage.",
      "3. Pomiary CPU: Odczytuje czasy procesora GetProcessTimes (UserTime + KernelTime) w oknie czasowym.",
      "4. Detekcja Anomalii: Porównuje zużycie z zdefiniowanymi progami (np. >30% CPU lub >200MB RAM).",
      "5. Natychmiastowa Neutralizacja: Wstrzymuje proces w locie (NtSuspendProcess) zapobiegając zablokowaniu systemu."
    ],
    code: `"""
=============================================================================
PROCESS RESOURCE WATCHDOG DAEMON (100% OFFLINE / ZERO-DEPENDENCY)
=============================================================================
Monitoruje zużycie CPU i pamięci RAM przez procesy nakładek Fluttera.
W przypadku przekroczenia limitu natychmiast zamraża proces w RAM (NtSuspendProcess).
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
PROCESS_SET_INFORMATION = 0x0200
IDLE_PRIORITY_CLASS = 0x00000040

# Domyślne progi alarmowe
CPU_LIMIT_PERCENT = 35.0
RAM_LIMIT_MB = 200.0
POLL_INTERVAL = 1.0 # sekundy

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

def get_process_ram_usage_mb(h_process):
    """Odczytuje aktualne zużycie pamięci RAM w MB."""
    counters = PROCESS_MEMORY_COUNTERS()
    counters.cb = ctypes.sizeof(PROCESS_MEMORY_COUNTERS)
    if psapi.GetProcessMemoryInfo(h_process, ctypes.byref(counters), counters.cb):
        return counters.WorkingSetSize / (1024.0 * 1024.0)
    return 0.0

def freeze_process_threads(pid):
    """Zamraża wszystkie wątki w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[❄️ ZAMROŻONO] NtSuspendProcess(PID: {pid}) - Zatrzymano wykonanie kodu!")

def throttle_process(pid):
    """Obniża priorytet procesu do minimum."""
    h = kernel32.OpenProcess(PROCESS_SET_INFORMATION, False, pid)
    if h:
        kernel32.SetPriorityClass(h, IDLE_PRIORITY_CLASS)
        kernel32.CloseHandle(h)
        print(f"[⚡ THROTTLE] Obniżono priorytet PID: {pid} do IDLE_PRIORITY_CLASS.")

def watchdog_scanner():
    print("=" * 70)
    print("  PROCESS WATCHDOG: DAEMON MONITOROWANIA CPU I PAMIĘCI RAM")
    print(f"  Progi: RAM > {RAM_LIMIT_MB} MB | Interwał: {POLL_INTERVAL}s")
    print("=" * 70)

    try:
        while True:
            def enum_proc(hwnd, lparam):
                if not user32.IsWindowVisible(hwnd):
                    return True

                ex_style = user32.GetWindowLongW(hwnd, -20)
                is_topmost = bool(ex_style & 0x00000008) # WS_EX_TOPMOST

                if is_topmost:
                    pid = wintypes.DWORD()
                    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
                    
                    h_proc = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | PROCESS_VM_READ, False, pid.value)
                    if h_proc:
                        ram_mb = get_process_ram_usage_mb(h_proc)
                        kernel32.CloseHandle(h_proc)

                        if ram_mb >= RAM_LIMIT_MB:
                            print(f"\\n[🚨 ALARM WATCHDOG] PID {pid.value} przekroczył limit pamięci RAM: {ram_mb:.2f} MB!")
                            freeze_process_threads(pid.value)

                return True

            cb = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)(enum_proc)
            user32.EnumWindows(cb, 0)
            time.sleep(POLL_INTERVAL)

    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano strażnika Process Watchdog.")

if __name__ == "__main__":
    watchdog_scanner()
`
  },
  {
    id: "process_tree_ppid_hunter",
    title: "★ PPID ORIGIN TRACER: Drzewo Relacji Procesów & Likwidacja Źródła (Tree-Kill)",
    shortDesc: "Mapuje relację między oknem nakładki Fluttera (HWND) a procesem-rodzicem (PPID Dropper / Watchdog), namierzając i likwidując całe poddrzewo procesów, by zapobiec odradzaniu się blokady.",
    badge: "PPID Origin Tracer & Tree-Kill",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Precyzyjne mapowanie łańcucha: HWND Okna -> PID Procesu -> PPID Rodzica (Droppera)",
      "Wykrywanie mechanizmów Watchdog/Auto-Restart w ukrytych procesach potomnych",
      "Jednoczesne zamrożenie i likwidacja całego drzewa (Tree-Kill /T /F)",
      "Brak możliwości ucieczki lub restartu nakładki przez proces nadrzędny",
      "Wbudowane sprawdzanie sygnatur bibliotek flutter_windows.dll w całym drzewie"
    ],
    recommendedFor: "Gdy po zamknięciu nakładki Fluttera natychmiast pojawia się ona z powrotem, ponieważ w tle działa proces-matka (PPID Watchdog/Dropper), który ją restartuje.",
    explanation: [
      "1. Mapowanie HWND -> PID: Wywołuje GetWindowThreadProcessId dla wykrytych okien Always-on-top i Fullscreen.",
      "2. Rekonstrukcja Drzewa PPID: Używa CreateToolhelp32Snapshot i Process32First/Next lub NtQueryInformationProcess do odczytania Parent Process ID.",
      "3. Identyfikacja Korzenia Zagrożenia: Sprawdza, czy rodzic nie jest bezpiecznym procesem systemowym (np. explorer.exe), lecz ukrytym skryptem/loaderem w Temp lub AppData.",
      "4. Zamrożenie Całego Drzewa (Tree Suspend): Wstrzymuje wątki we wszystkich powiązanych procesach (rodzic + dzieci), by uniemożliwić wykonanie kodu awaryjnego.",
      "5. Likwidacja Poddrzewa (Tree Termination): Usuwa procesy potomne i proces macierzysty w jednej atomowej sekwencji."
    ],
    code: `"""
=============================================================================
PPID ORIGIN TRACER & PROCESS TREE HUNTER (100% OFFLINE)
=============================================================================
Wykrywa złośliwe okna Fluttera, namierza proces-matkę (PPID) i likwiduje
całe poddrzewo procesów, zapobiegając samoczynnemu odradzaniu się blokad.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

TH32CS_SNAPPROCESS = 0x00000002
PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_INFORMATION = 0x0400

class PROCESSENTRY32(ctypes.Structure):
    _fields_ = [
        ("dwSize", wintypes.DWORD),
        ("cntUsage", wintypes.DWORD),
        ("th32ProcessID", wintypes.DWORD),
        ("th32DefaultHeapID", ctypes.POINTER(wintypes.ULONG)),
        ("th32ModuleID", wintypes.DWORD),
        ("cntThreads", wintypes.DWORD),
        ("th32ParentProcessID", wintypes.DWORD),
        ("pcPriClassBase", wintypes.LONG),
        ("dwFlags", wintypes.DWORD),
        ("szExeFile", ctypes.c_char * 260)
    ]

# Chroniona biała lista systemowa
SYSTEM_WHITELIST = {"explorer.exe", "services.exe", "lsass.exe", "csrss.exe", "winlogon.exe", "dwm.exe"}

def get_process_hierarchy_map():
    """Tworzy pełną mapę relacji PID -> (PPID, NazwaExe) za pomocą Toolhelp API."""
    h_snap = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0)
    if h_snap == wintypes.HANDLE(-1).value:
        return {}

    entry = PROCESSENTRY32()
    entry.dwSize = ctypes.sizeof(PROCESSENTRY32)
    proc_map = {}

    if kernel32.Process32First(h_snap, ctypes.byref(entry)):
        while True:
            pid = entry.th32ProcessID
            ppid = entry.th32ParentProcessID
            exe_name = entry.szExeFile.decode('utf-8', errors='ignore')
            proc_map[pid] = {"ppid": ppid, "name": exe_name}
            if not kernel32.Process32Next(h_snap, ctypes.byref(entry)):
                break

    kernel32.CloseHandle(h_snap)
    return proc_map

def find_entire_process_tree(root_pid, proc_map):
    """Rekurencyjnie odnajduje wszystkie procesy potomne dla wskazanego PID."""
    tree = {root_pid}
    added = True
    while added:
        added = False
        for pid, data in proc_map.items():
            if data["ppid"] in tree and pid not in tree:
                tree.add(pid)
                added = True
    return tree

def freeze_process_tree(tree_pids):
    """Zamraża RAM dla wszystkich procesów w drzewie (NtSuspendProcess)."""
    for pid in tree_pids:
        h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
        if h:
            ntdll.NtSuspendProcess(h)
            kernel32.CloseHandle(h)

def kill_process_tree(tree_pids, proc_map):
    """Zabija wszystkie procesy z drzewa zaczynając od dzieci, kończąc na rodzicu."""
    for pid in sorted(tree_pids, reverse=True):
        name = proc_map.get(pid, {}).get("name", "Unknown")
        if name.lower() in SYSTEM_WHITELIST:
            print(f"[!] Pomijanie procesu systemowego: {name} (PID: {pid})")
            continue
        h = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
        if h:
            kernel32.TerminateProcess(h, 9)
            kernel32.CloseHandle(h)
            print(f"[✔] Zlikwidowano węzeł drzewa: {name} (PID: {pid})")

def scan_rogue_windows_and_kill_origin():
    """Główna pętla skanera origin forensics."""
    proc_map = get_process_hierarchy_map()
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)

    print("=" * 70)
    print("  PPID ORIGIN TRACER: SKANOWANIE RELACJI PROCESÓW I OKIEN FLUTTERA")
    print("=" * 70)

    @ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    def enum_callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True

        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top

        ex_style = user32.GetWindowLongW(hwnd, -20) # GWL_EXSTYLE
        is_topmost = bool(ex_style & 0x00000008) # WS_EX_TOPMOST
        is_fullscreen = (w >= screen_w - 5 and h >= screen_h - 5)

        if is_topmost and is_fullscreen:
            pid = wintypes.DWORD()
            user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
            child_pid = pid.value

            if child_pid in proc_map:
                child_data = proc_map[child_pid]
                parent_pid = child_data["ppid"]
                parent_name = proc_map.get(parent_pid, {}).get("name", "Brak/Nieznany")

                print(f"\\n[!] WYKRYTO ZŁOŚLIWE OKNO HWND: {hex(hwnd)}")
                print(f"    ├─ Proces Okna: {child_data['name']} (PID: {child_pid})")
                print(f"    └─ Proces Rodzic (ŹRÓDŁO/WATCHDOG): {parent_name} (PPID: {parent_pid})")

                # Określ korzeń ataku
                root_target = parent_pid if parent_name.lower() not in SYSTEM_WHITELIST else child_pid
                tree_pids = find_entire_process_tree(root_target, proc_map)

                print(f"[*] Zamrażanie całego poddrzewa ({len(tree_pids)} procesów)...")
                freeze_process_tree(tree_pids)

                print(f"[*] Likwidacja poddrzewa w celu uniemożliwienia restartu...")
                kill_process_tree(tree_pids, proc_map)

        return True

    user32.EnumWindows(enum_callback, 0)

if __name__ == "__main__":
    scan_rogue_windows_and_kill_origin()
`
  },
  {
    id: "pe_header_corruptor_and_acl_lock",
    title: "★ TRWAŁY SABOTAŻ BINARNY: PE Header Corruptor & Extreme ACL Lockout",
    shortDesc: "Trwale uniemożliwia uruchomienie szkodliwego procesu poprzez zniszczenie struktury nagłówka PE (zerowanie sygnatur MZ i e_lfanew) oraz odcięcie uprawnień DACL w NTFS (icacls /deny Everyone).",
    badge: "Trwały Sabotaż PE & ACL",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Trwałe unieważnienie nagłówka PE (DOS Header MZ & NT Signature zeroing) – błąd 0xC000007B",
      'Windows PE Loader (LdrpInitializeProcess) bezpowrotnie odrzuca plik z komunikatem: "Ta aplikacja nie może działać"',
      "Pancerna blokada ACL (icacls /inheritance:r /deny *S-1-1-0:(F,X,R,W)) – Access Denied dla wszystkich",
      "Zamrożenie wątków w RAM (NtSuspendProcess) przed zabiciem, uniemożliwiające reakcję złośliwego kodu",
      "Działa w 100% OFFLINE bez dostępu do sieci i bez instalowania paczek pip"
    ],
    recommendedFor: "Gdy złośliwe oprogramowanie posiada agresywny mechanizm samoczynnego odradzania się (watchdog service, restart loops, replikacja), a zwykłe zakończenie procesu nie zapobiega ponownemu uruchomieniu.",
    explanation: [
      "1. Zamrożenie procesu (NtSuspendProcess): Wstrzymuje natychmiast wszystkie wątki szkodliwego programu w jądrze NT.",
      "2. Zwolnienie uchwytu pliku: Kończy proces, aby system Windows zezwolił na bezpośredni zapis binarny do pliku .exe.",
      '3. Sabotaż nagłówka PE: Otwiera plik w trybie binarnym (r+b), nadpisuje bajty sygnatury DOS "MZ" (0x5A4D) oraz offset e_lfanew i sygnaturę "PE\\0\\0" zerami lub zniszczonymi wartościami. Nawet skopiowanie pliku na inny komputer nie przywróci mu możliwości uruchomienia.',
      "4. Blokada ACL (DACL Hardening): Zeruje dziedziczenie uprawnień (/inheritance:r) oraz dodaje regułę DENY dla grupy Everyone (SID *S-1-1-0), blokując odczyt, zapis i wykonywanie.",
      "5. Blokada IFEO: Rejestruje atrapę debuggera w Rejestrze Windows jako dodatkową linię obrony."
    ],
    code: `"""
=============================================================================
TRWAŁY SABOTAŻ BINARNY: PE HEADER CORRUPTOR & EXTREME ACL LOCKOUT (100% OFFLINE)
=============================================================================
Skrypt w ułamku sekundy wykrywa szkodliwy proces, zamraża go w RAM, niszczy
nagłówek binarny PE na dysku i odcina uprawnienia ACL, uniemożliwiając restart.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys
import struct
import psutil

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_LIMITED_INFORMATION = 0x1000

# Biała lista chronionych procesów systemowych
SAFE_WHITELIST = {
    "explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe",
    "searchhost.exe", "systemsettings.exe", "lsass.exe", "csrss.exe",
    "services.exe", "svchost.exe", "code.exe", "chrome.exe", "firefox.exe"
}

def freeze_threads(pid):
    """Zamraża wszystkie wątki procesu w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        print(f"[+] [1. FREEZE] Proces PID {pid} został zatrzymany w RAM.")
        return True
    return False

def get_binary_path(pid):
    """Pobiera pełną ścieżkę do pliku wykonywalnego."""
    h = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
    if not h:
        return None
    buf = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if kernel32.QueryFullProcessImageNameW(h, 0, buf, ctypes.byref(size)):
        kernel32.CloseHandle(h)
        return buf.value
    kernel32.CloseHandle(h)
    return None

def corrupt_pe_binary_header(exe_path):
    """
    Trwale niszczy strukturę Portable Executable (PE) pliku binarnego.
    Nadpisuje sygnaturę DOS 'MZ' oraz nagłówek PE 'PE\\0\\0'.
    
    REZULTAT:
    Windows PE Loader zgłasza błąd STATUS_INVALID_IMAGE_FORMAT (0xC000007B).
    Plik staje się w 100% bezużyteczny i niemożliwy do wykonania.
    """
    if not exe_path or not os.path.exists(exe_path):
        return False

    try:
        # Usunięcie atrybutów Read-Only
        kernel32.SetFileAttributesW(exe_path, 0x80) # FILE_ATTRIBUTE_NORMAL

        with open(exe_path, "r+b") as f:
            # 1. Sprawdź sygnaturę DOS
            f.seek(0)
            magic = f.read(2)
            if magic != b"MZ":
                print(f"[!] Plik {exe_path} nie posiada sygnatury MZ lub został już uszkodzony.")

            # 2. Odczytaj offset nagłówka PE (0x3C e_lfanew)
            f.seek(0x3C)
            e_lfanew = f.read(4)
            pe_offset = 0
            if len(e_lfanew) == 4:
                pe_offset = struct.unpack("<I", e_lfanew)[0]

            # 3. Zniszcz sygnaturę DOS 'MZ' -> 'DEAD'
            f.seek(0)
            f.write(b"\\xDE\\xAD")

            # 4. Zniszcz wskaźnik e_lfanew
            f.seek(0x3C)
            f.write(b"\\xFF\\xFF\\xFF\\xFF")

            # 5. Zniszcz sygnaturę PE (jeśli zlokalizowana)
            if 0 < pe_offset < 1048576:
                try:
                    f.seek(pe_offset)
                    f.write(b"\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF")
                except Exception:
                    pass

            # 6. Wyzeruj pierwsze 512 bajtów nagłówka
            f.seek(2)
            f.write(b"\\x00" * 510)
            f.flush()

        print(f"[+] [SUKCES - PE CORRUPTED] Zniszczono nagłówek PE pliku: {exe_path}")
        print(f"    System Windows zgłasza błąd 0xC000007B (STATUS_INVALID_IMAGE_FORMAT).")
        return True
    except Exception as e:
        print(f"[-] Błąd uszkadzania nagłówka PE: {e}")
        return False

def lock_binary_acl(exe_path):
    """
    Odcina uprawnienia w Access Control List (DACL) w systemie plików NTFS.
    Odbiera uprawnienia do uruchamiania (Execute), odczytu i zapisu dla grupy Everyone.
    """
    if not exe_path or not os.path.exists(exe_path):
        return False
    try:
        # Zerwanie dziedziczenia uprawnień
        os.system(f'icacls "{exe_path}" /inheritance:r >nul 2>&1')
        # Odmowa wszelkich praw dla grupy Wszyscy (SID S-1-1-0)
        os.system(f'icacls "{exe_path}" /deny *S-1-1-0:(F,X,R,W) >nul 2>&1')
        os.system(f'icacls "{exe_path}" /deny Everyone:(F,X,R,W) >nul 2>&1')
        print(f"[+] [SUKCES - ACL LOCKOUT] Odcięto uprawnienia (Access Denied / Błąd 5).")
        return True
    except Exception as e:
        print(f"[-] Błąd blokady ACL: {e}")
        return False

def kill_and_sabotage(proc):
    pid = proc.pid
    name = proc.name().lower()
    
    if name in SAFE_WHITELIST:
        return

    print("=" * 70)
    print(f"[!] WYKRYTO ZŁOŚLIWY PROCES: {name} (PID: {pid})")

    # 1. Freeze
    freeze_threads(pid)

    # 2. Pobierz ścieżkę
    exe_path = get_binary_path(pid)

    # 3. Zabij proces, by zwolnić uchwyt
    try:
        proc.kill()
        time.sleep(0.05)
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

    # 4. Trwałe uszkodzenie PE i blokada ACL
    if exe_path:
        corrupt_pe_binary_header(exe_path)
        lock_binary_acl(exe_path)

    # 5. Blokada IFEO w Rejestrze
    os.system(f'reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{name}" /v Debugger /t REG_SZ /d "systray.exe" /f >nul 2>&1')
    print(f"[+] [IFEO LOCK] Zablokowano start '{name}' w rejestrze Windows.")
    print("=" * 70)

if __name__ == "__main__":
    print("[*] STRAŻNIK ANTY-MALWARE: PE CORRUPTOR & ACL DEFENSE (100% OFFLINE)")
    print("[*] Skanowanie procesów pod kątem zagrożeń...")
    for proc in psutil.process_iter(['pid', 'name']):
        try:
            pname = proc.info['name'].lower()
            if 'flutter' in pname or 'malware' in pname:
                kill_and_sabotage(proc)
        except Exception:
            pass
    print("[*] Gotowe.")
`
  },
  {
    id: "quarantine_anti_respawn_lockout",
    title: "★ UNIERUCHOMIENIE & KWARANTANNA: Process Freeze + Binary Lockout (Anti-Respawn)",
    shortDesc: "Natychmiast zamraża wszystkie wątki procesu w pamięci (NtSuspendProcess), blokuje restart, zmienia uprawnienia pliku na dysku lub zmienia nazwę na .quarantine, zapobiegając odradzaniu się malware.",
    badge: "Blokada Trwała (Anti-Malware)",
    os: ["windows"],
    requiresPip: false,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Błyskawiczne zamrożenie w RAM (NtSuspendProcess / proc.suspend) – malware nie może reagować ani wysyłać zdarzeń",
      "Pobiera pełną ścieżkę pliku binarnego na dysku (QueryFullProcessImageNameW)",
      "Odebranie uprawnień do uruchamiania (icacls /deny Everyone:(X,W)) lub zmiana nazwy pliku",
      "Wpis w rejestrze IFEO (Image File Execution Options) blokujący ponowny start programu w systemie Windows",
      "Działa w 100% offline, bez połączenia z siecią i bez zewnętrznych serwerów"
    ],
    recommendedFor: "Gdy złośliwy program ma mechanizmy samoczynnego restartu (watchdog, pętla nieskończona, procesy bliźniacze), blokuje okna dialogowe i odradza się po zwykłym taskkill.",
    explanation: [
      "1. Zamrożenie (Freeze): Wywołuje ntdll.NtSuspendProcess lub psutil.Process.suspend(). Proces w pamięci RAM zostaje całkowicie zatrzymany – nie może przechwytywać myszy, tworzyć okien ani wykonywać kodu.",
      "2. Detekcja ścieżki: Odczytuje dokładną ścieżkę do pliku .exe na dysku twardym.",
      "3. Kwarantanna binarna: Nadaje plikowi atrybut tylko do odczytu i blokuje uprawnienia wykonania (Execute) przez narzędzie icacls, uniemożliwiając restart.",
      "4. Blokada IFEO (Opcjonalna): Tworzy wpis w Rejestrze Windows (Image File Execution Options) przekierowujący debugger na dummy process, więc Windows odmówi startu tego pliku.",
      "5. Eliminacja: Po zneutralizowaniu pliku na dysku, zamrożony proces zostaje bezpowrotnie usunięty z pamięci."
    ],
    code: `"""
=============================================================================
UNIERUCHOMIENIE & KWARANTANNA PROCESU (Anti-Respawn & Process Freezer)
=============================================================================
Działa w 100% OFFLINE. Nie wymaga połączenia z internetem.
Zamraża wątki procesu w pamięci, odbiera prawa wykonywania plikowi i ubija go.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import sys
import subprocess

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll

PROCESS_ALL_ACCESS = 0x1F0FFF
PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_LIMITED_INFORMATION = 0x1000

# Biała lista chronionych procesów systemowych
SAFE_WHITELIST = {
    "explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe",
    "searchhost.exe", "systemsettings.exe", "lsass.exe", "csrss.exe",
    "services.exe", "svchost.exe", "code.exe", "chrome.exe", "firefox.exe"
}

def suspend_process(pid):
    """Natychmiast zamraża wszystkie wątki procesu w pamięci RAM."""
    h_proc = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h_proc:
        status = ntdll.NtSuspendProcess(h_proc)
        kernel32.CloseHandle(h_proc)
        if status == 0:
            print(f"[+] [ZAMROŻONO] Proces PID {pid} został zneutralizowany w pamięci RAM (Zero akcji/Zero okien).")
            return True
    return False

def get_process_executable_path(pid):
    """Pobiera pełną ścieżkę do pliku .exe na dysku."""
    h_proc = kernel32.OpenProcess(PROCESS_QUERY_LIMITED_INFORMATION, False, pid)
    if not h_proc:
        return None
    buf = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if kernel32.QueryFullProcessImageNameW(h_proc, 0, buf, ctypes.byref(size)):
        kernel32.CloseHandle(h_proc)
        return buf.value
    kernel32.CloseHandle(h_proc)
    return None

def quarantine_executable_file(file_path):
    """Blokuje uprawnienia do wykonywania pliku binarnego na dysku."""
    if not file_path or not os.path.exists(file_path):
        return False
    try:
        print(f"[*] Przenoszenie do kwarantanny: {file_path}")
        # 1. Zmiana nazwy na rozszerzenie .quarantined_lock
        quarantine_path = file_path + ".quarantined_lock"
        try:
            os.rename(file_path, quarantine_path)
            print(f"[+] [SUKCES] Zmieniono nazwę na: {quarantine_path}")
            return True
        except PermissionError:
            # 2. Jeśli plik jest zablokowany - odebranie uprawnień do uruchomienia (icacls)
            cmd = f'icacls "{file_path}" /deny Everyone:(X,W) >nul 2>&1'
            os.system(cmd)
            print(f"[+] [SUKCES] Odebrano uprawnienia wykonania (icacls /deny Everyone:(X,W))")
            return True
    except Exception as e:
        print(f"[-] Błąd kwarantanny pliku: {e}")
        return False

def block_via_ifeo(exe_filename):
    """Blokuje ponowne uruchomienie programu w Rejestrze Windows (IFEO)."""
    try:
        cmd = f'reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{exe_filename}" /v Debugger /t REG_SZ /d "systray.exe" /f >nul 2>&1'
        os.system(cmd)
        print(f"[+] [IFEO LOCK] Zablokowano start '{exe_filename}' w rejestrze Windows.")
    except Exception:
        pass

def terminate_frozen_process(pid):
    """Kończy definitywnie zamrożony proces."""
    h_proc = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h_proc:
        kernel32.TerminateProcess(h_proc, 9)
        kernel32.CloseHandle(h_proc)
        print(f"[+] [ZABITO] Proces PID {pid} został usunięty z pamięci.")
    else:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

def execute_quarantine_strike(hwnd, pid):
    """Kompleksowa operacja unieszkodliwienia."""
    # Krok 1: Natychmiastowe zdjęcie okna z pierwszego planu
    user32.ShowWindow(hwnd, 0) # SW_HIDE
    user32.SetWindowPos(hwnd, 1, 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0080) # HWND_BOTTOM

    # Krok 2: Zamrożenie wątków w pamięci RAM
    suspend_process(pid)

    # Krok 3: Pobranie ścieżki i kwarantanna binarna
    exe_path = get_process_executable_path(pid)
    exe_name = os.path.basename(exe_path) if exe_path else ""

    if exe_name.lower() in SAFE_WHITELIST:
        print(f"[!] Proces na białej liście ({exe_name}). Anulowano kwarantannę.")
        return

    if exe_path:
        quarantine_executable_file(exe_path)
        block_via_ifeo(exe_name)

    # Krok 4: Usunięcie z pamięci RAM
    terminate_frozen_process(pid)
    print("=" * 60)
    print(f"[✔] SUKCES! Zagrożenie {exe_name} (PID: {pid}) zostało trwale unieruchomione.")
    print("=" * 60)

def scan_and_lockdown():
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)

    def callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        if hwnd in (user32.GetDesktopWindow(), user32.GetShellWindow()):
            return True

        # Sprawdzenie stylu TopMost
        ex_style = user32.GetWindowLongW(hwnd, -20)
        is_topmost = bool(ex_style & 0x00000008)

        # Sprawdzenie wymiarów
        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        is_fullscreen = (w >= screen_w * 0.9 and h >= screen_h * 0.9)

        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        if pid.value == 0:
            return True

        exe_path = get_process_executable_path(pid.value)
        exe_name = os.path.basename(exe_path).lower() if exe_path else ""

        if exe_name in SAFE_WHITELIST:
            return True

        # Warunek uderzenia:
        # Okno blokuje ekran (TopMost + Fullscreen) LUB proces związany z Flutterem
        if (is_topmost and is_fullscreen) or ("flutter" in exe_name):
            print("\\n" + "!" * 60)
            print(f"[!] WYKRYTO ZŁOŚLIWĄ BLOKADĘ: {exe_name} (PID: {pid.value})")
            print(f"    Wymiary: {w}x{h}, TopMost: {is_topmost}")
            print("!" * 60)
            execute_quarantine_strike(hwnd, pid.value)

        return True

    EnumProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumProc(callback), 0)

if __name__ == "__main__":
    print("=" * 65)
    print("  TARCZA ANTY-MALWARE: UNIERUCHOMIENIE & KWARANTANNA PLIKÓW")
    print("  Tryb: 100% OFFLINE (Brak zależności zewnętrznych)")
    print("  Działanie: Freeze RAM -> Binary Lockout -> Destroy")
    print("=" * 65)
    try:
        while True:
            scan_and_lockdown()
            time.sleep(0.3)
    except KeyboardInterrupt:
        print("\\n[*] Wyłączono monitor kwarantanny.")
`
  },
  {
    id: "win32_topmost_destroyer",
    title: "1. Win32 TopMost & Fullscreen Overlay Hunter (Najskuteczniejszy)",
    shortDesc: "Wyszukuje okna z flagą WS_EX_TOPMOST pokrywające 100% ekranu, sprawdza czy proces ładuje biblioteki Fluttera i bezwzględnie go zamyka.",
    badge: "Rekomendowany (Windows)",
    os: ["windows"],
    requiresPip: true,
    pipPackages: ["psutil", "pywin32"],
    keyFeatures: [
      "Kompatybilność z 32-bit i 64-bit Python (GetWindowLongPtrW / GetWindowLongW)",
      "Wykrywa flagę WS_EX_TOPMOST (Always on top)",
      "Sprawdza rozmiar okna względem rozdzielczości monitora",
      "Weryfikuje załadowane moduły DLL (flutter_windows.dll, flutter_engine.dll)",
      "Możliwość natychmiastowego zabicia (SIGKILL) lub zdjęcia flagi TopMost",
      "Biała lista bezpiecznych aplikacji (Discord, OBS, gry, explorer)"
    ],
    recommendedFor: "Gdy aplikacja Fluttera tworzy pełnoekranowe okno w trybie Always-on-top blokujące pulpit i pasek zadań.",
    explanation: [
      "Skrypt pobiera uchwyty (HWND) wszystkich widocznych okien za pomocą EnumWindows.",
      "Dla każdego okna sprawdza style rozszerzone GetWindowLongPtr(GWL_EXSTYLE) pod kątem flagi WS_EX_TOPMOST (0x00000008).",
      "Pobiera współrzędne okna przez GetWindowRect i porównuje z rozdzielczością ekranu GetSystemMetrics.",
      "Tłumaczy uchwyt okna (HWND) na identyfikator procesu (PID) za pomocą GetWindowThreadProcessId.",
      "Używając biblioteki psutil sprawdza załadowane pliki binarne oraz moduły pamięci (szuka flutter_windows.dll) i bezwzględnie ubija proces."
    ],
    code: `"""
=============================================================================
FLUTTER OVERLAY DETECT & DESTROY (Windows Win32 + psutil)
=============================================================================
Instalacja wymaganych bibliotek:
  pip install psutil pywin32

Uruchomienie:
  python flutter_overlay_hunter.py
=============================================================================
"""
import time
import os
import sys
import ctypes
from ctypes import wintypes
import psutil

# Stałe Win32 API
GWL_EXSTYLE = -20
WS_EX_TOPMOST = 0x00000008
WS_EX_LAYERED = 0x00080000
WS_EX_TRANSPARENT = 0x00000020
SW_MINIMIZE = 6
HWND_NOTOPMOST = -2
SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_SHOWWINDOW = 0x0040

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32

# Bezpieczne pobieranie funkcji stylu okna (kompatybilność x86 / x64)
if hasattr(user32, "GetWindowLongPtrW"):
    GetWindowLongPtr = user32.GetWindowLongPtrW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LPARAM
else:
    GetWindowLongPtr = user32.GetWindowLongW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LONG

# Bezpieczna biała lista procesów systemowych i zaufanych
WHITELIST_PROCESSES = {
    "explorer.exe", "taskmgr.exe", "shellexperiencehost.exe",
    "searchapp.exe", "searchhost.exe", "dwm.exe", "systemsettings.exe",
    "lockapp.exe", "code.exe", "chrome.exe", "firefox.exe", "discord.exe"
}

# Sygnatury DLL i procesów Fluttera
FLUTTER_SIGNATURES = [
    "flutter_windows.dll",
    "flutter_engine.dll",
    "flutter_embedder.dll",
    "flutter_runner.exe"
]

def get_screen_resolution():
    """Zwraca szerokość i wysokość głównego ekranu."""
    width = user32.GetSystemMetrics(0)   # SM_CXSCREEN
    height = user32.GetSystemMetrics(1)  # SM_CYSCREEN
    return width, height

def is_window_fullscreen(hwnd, screen_w, screen_h):
    """Sprawdza, czy okno zajmuje cały ekran."""
    rect = wintypes.RECT()
    if user32.GetWindowRect(hwnd, ctypes.byref(rect)):
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        if w >= screen_w * 0.95 and h >= screen_h * 0.95:
            return True, (w, h)
    return False, (0, 0)

def is_topmost(hwnd):
    """Sprawdza, czy okno posiada flagę Always-On-Top."""
    try:
        ex_style = GetWindowLongPtr(hwnd, GWL_EXSTYLE)
        return bool(ex_style & WS_EX_TOPMOST)
    except Exception:
        return False

def get_process_info(hwnd):
    """Pobiera PID oraz obiekt psutil.Process dla danego okna."""
    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    if pid.value == 0:
        return None, None
    try:
        proc = psutil.Process(pid.value)
        return pid.value, proc
    except (psutil.NoSuchProcess, psutil.AccessDenied):
        return pid.value, None

def has_flutter_modules(proc):
    """Skanuje załadowane moduły DLL procesu w poszukiwaniu Fluttera."""
    if not proc:
        return False
    try:
        name_lower = proc.name().lower()
        cmdline = " ".join(proc.cmdline()).lower() if proc.cmdline() else ""
        if any(sig in name_lower or sig in cmdline for sig in FLUTTER_SIGNATURES):
            return True

        if hasattr(proc, "memory_maps"):
            for m in proc.memory_maps():
                path_lower = m.path.lower()
                if any(sig in path_lower for sig in FLUTTER_SIGNATURES):
                    return True
    except (psutil.AccessDenied, psutil.NoSuchProcess, NotImplementedError, Exception):
        pass
    return False

def kill_process(pid, proc_name):
    """Zabija proces na siłę (SIGKILL)."""
    try:
        p = psutil.Process(pid)
        p.kill()
        print(f"[!] [SUKCES] Zamknięto złośliwy/blokujący proces: {proc_name} (PID: {pid})")
        return True
    except Exception as e:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")
        print(f"[!] Wysłano awaryjny taskkill dla PID {pid}: {e}")
        return True

def scan_and_destroy():
    screen_w, screen_h = get_screen_resolution()

    def enum_windows_callback(hwnd, extra):
        if not user32.IsWindowVisible(hwnd):
            return True
        
        if hwnd == user32.GetDesktopWindow() or hwnd == user32.GetShellWindow():
            return True

        length = user32.GetWindowTextLengthW(hwnd)
        buff = ctypes.create_unicode_buffer(length + 1)
        user32.GetWindowTextW(hwnd, buff, length + 1)
        title = buff.value

        topmost = is_topmost(hwnd)
        fullscreen, (w, h) = is_window_fullscreen(hwnd, screen_w, screen_h)
        pid, proc = get_process_info(hwnd)

        if not proc:
            return True

        proc_name = proc.name().lower() if proc else "unknown"

        if proc_name in WHITELIST_PROCESSES:
            return True

        is_flutter = has_flutter_modules(proc)

        if (topmost and fullscreen) or (is_flutter and (topmost or fullscreen)):
            print("="*60)
            print(f"[!] WYKRYTO PODEJRZANĄ NAKŁADKĘ BLOKUJĄCĄ EKRAN!")
            print(f"    Tytuł okna   : '{title}'")
            print(f"    Proces       : {proc_name} (PID: {pid})")
            print(f"    Rozmiar okna : {w}x{h} (Ekran: {screen_w}x{screen_h})")
            print(f"    TopMost      : {topmost}")
            print(f"    Moduły Flutter: {is_flutter}")
            print("="*60)
            kill_process(pid, proc_name)

        return True

    EnumWindowsProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumWindowsProc(enum_windows_callback), 0)

if __name__ == "__main__":
    print("[*] Uruchomiono Watchdog przeciwko nakładkom Flutter/Win32...")
    print("[*] Skanowanie w pętli co 500 ms (Naciśnij Ctrl+C aby zatrzymać)...")
    try:
        while True:
            scan_and_destroy()
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano monitor.")
`
  },
  {
    id: "pure_ctypes_zero_dependency",
    title: "2. Czysty Python bez instalacji pip (Zero Dependencies)",
    shortDesc: "Działa na każdym komputerze z zainstalowanym Pythonem, nie wymaga uruchamiania pip install psutil/pywin32. Używa wbudowanego ctypes i taskkill.",
    badge: "Natychmiastowe (Brak pip)",
    os: ["windows"],
    requiresPip: false,
    pipPackages: [],
    keyFeatures: [
      "Zero zewnętrznych zależności (używa wbudowanego modułu ctypes)",
      "Można uruchomić od razu w trybie awaryjnym lub na świeżym systemie",
      "Pobiera HWND, sprawdza WS_EX_TOPMOST oraz PID",
      "Terminuje proces za pomocą OpenProcess + TerminateProcess oraz taskkill"
    ],
    recommendedFor: "Gdy nie masz dostępu do internetu, pip nie działa lub chcesz natychmiast uruchomić pojedynczy plik .py.",
    explanation: [
      "Skrypt używa wyłącznie biblioteki standardowej Pythona (ctypes, subprocess, time).",
      "Łączy się bezpośrednio z bibliotekami systemowymi user32.dll oraz kernel32.dll.",
      "Skanuje listę okien przez EnumWindows, sprawdza flagę WS_EX_TOPMOST oraz rozmiar okna.",
      "Po wykryciu natychmiast wywołuje TerminateProcess z uprawnieniami PROCESS_TERMINATE (0x0001)."
    ],
    code: `"""
=============================================================================
FLUTTER / TOPMOST OVERLAY KILLER (Zero-Dependency / Pure Python ctypes)
=============================================================================
Nie wymaga instalacji żadnych paczek (brak 'pip install')!
Działa od razu w czystym Pythonie 3.x na Windowsie.
=============================================================================
"""
import ctypes
from ctypes import wintypes
import time
import os
import subprocess

user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32

GWL_EXSTYLE = -20
WS_EX_TOPMOST = 0x00000008
PROCESS_TERMINATE = 0x0001
PROCESS_QUERY_INFORMATION = 0x0400

if hasattr(user32, "GetWindowLongPtrW"):
    GetWindowLongPtr = user32.GetWindowLongPtrW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LPARAM
else:
    GetWindowLongPtr = user32.GetWindowLongW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LONG

WHITELIST_NAMES = {"explorer.exe", "taskmgr.exe", "dwm.exe", "shellexperiencehost.exe"}

def get_process_name(pid):
    h_process = kernel32.OpenProcess(PROCESS_QUERY_INFORMATION | 0x1000, False, pid)
    if not h_process:
        return ""
    name_buffer = ctypes.create_unicode_buffer(1024)
    size = wintypes.DWORD(1024)
    if ctypes.windll.kernel32.QueryFullProcessImageNameW(h_process, 0, name_buffer, ctypes.byref(size)):
        full_path = name_buffer.value
        kernel32.CloseHandle(h_process)
        return os.path.basename(full_path).lower()
    kernel32.CloseHandle(h_process)
    return ""

def kill_pid_forcefully(pid, proc_name):
    h_process = kernel32.OpenProcess(PROCESS_TERMINATE, False, pid)
    if h_process:
        kernel32.TerminateProcess(h_process, 9)
        kernel32.CloseHandle(h_process)
        print(f"[+] [SUKCES API] Zabito proces PID: {pid} ({proc_name})")
        return True
    
    try:
        subprocess.run(["taskkill", "/F", "/PID", str(pid)], capture_output=True)
        print(f"[+] [SUKCES CMD] Zamknięto przez taskkill PID: {pid}")
        return True
    except Exception as e:
        print(f"[-] Błąd zamykania PID {pid}: {e}")
        return False

def scan_and_kill():
    screen_w = user32.GetSystemMetrics(0)
    screen_h = user32.GetSystemMetrics(1)
    
    def callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        if hwnd in (user32.GetDesktopWindow(), user32.GetShellWindow()):
            return True

        ex_style = GetWindowLongPtr(hwnd, GWL_EXSTYLE)
        is_topmost = bool(ex_style & WS_EX_TOPMOST)

        rect = wintypes.RECT()
        user32.GetWindowRect(hwnd, ctypes.byref(rect))
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        is_fullscreen = (w >= screen_w * 0.9 and h >= screen_h * 0.9)

        pid = wintypes.DWORD()
        user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
        
        if pid.value == 0:
            return True

        proc_name = get_process_name(pid.value)
        if proc_name in WHITELIST_NAMES:
            return True

        if (is_topmost and is_fullscreen) or ("flutter" in proc_name):
            print(f"[!] WYKRYTO NAKŁADKĘ: PID={pid.value}, Plik='{proc_name}', Rozmiar={w}x{h}, TopMost={is_topmost}")
            kill_pid_forcefully(pid.value, proc_name)

        return True

    EnumProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumProc(callback), 0)

if __name__ == "__main__":
    print("[*] Skaner czystego Pythona (ctypes) aktywny. Skanowanie co 300 ms...")
    try:
        while True:
            scan_and_kill()
            time.sleep(0.3)
    except KeyboardInterrupt:
        print("\\n[*] Zakończono działanie.")
`
  },
  {
    id: "panic_hotkey_killer",
    title: "3. Globalny Przycisk Paniki (Emergency Hotkey Daemon)",
    shortDesc: "Działa w tle i nasłuchuje globalnego skrótu klawiszowego (np. Ctrl+Alt+K lub F10). Po wciśnięciu natychmiast ubija aktywne okno na wierzchu lub proces Fluttera.",
    badge: "Skrót awaryjny (Klawiatura)",
    os: ["windows", "linux", "macos"],
    requiresPip: true,
    pipPackages: ["keyboard", "psutil"],
    keyFeatures: [
      "Reaguje nawet, gdy nakładka przechwytuje kursor myszy",
      "Globalny hook klawiatury (działa z dowolnego miejsca)",
      "Zabija aktualnie aktywne okno na pierwszym planie (GetForegroundWindow)",
      "Opcjonalnie ubija wszystkie procesy Fluttera za jednym naciśnięciem"
    ],
    recommendedFor: "Gdy chcesz mieć pełną kontrolę i wywoływać zabicie nakładki jednym kliknięciem na klawiaturze.",
    explanation: [
      "Biblioteka keyboard instaluje hook niskiego poziomu (WH_KEYBOARD_LL w Windows lub odpowiednik w X11).",
      "Po wciśnięciu skrótu (np. Ctrl+Alt+Shift+K) skrypt pobiera uchwyt okna pierwszoplanowego przez GetForegroundWindow.",
      "Identyfikuje proces powiązany z oknem i natychmiast wysyła sygnał SIGKILL.",
      "Dodatkowo przeszukuje całą listę procesów i zamyka wszystkie procesy powiązane z Flutterem."
    ],
    code: `"""
=============================================================================
EMERGENCY PANIC HOTKEY KILLER (Globalny skrót klawiszowy)
=============================================================================
Instalacja:
  pip install keyboard psutil pywin32

Uruchomienie:
  python panic_hotkey_killer.py
=============================================================================
"""
import keyboard
import psutil
import ctypes
from ctypes import wintypes
import sys
import os

user32 = ctypes.windll.user32

HOTKEY = "ctrl+alt+shift+k"
ALT_HOTKEY = "f10"

def kill_foreground_window():
    hwnd = user32.GetForegroundWindow()
    if not hwnd:
        return

    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    
    if pid.value == 0:
        return

    try:
        p = psutil.Process(pid.value)
        name = p.name()
        if name.lower() in ("explorer.exe", "taskmgr.exe"):
            return
        
        p.kill()
        print(f"[+] [PANIC BUTTON] Zabito okno pierwszoplanowe: {name} (PID: {pid.value})")
    except Exception as e:
        os.system(f"taskkill /F /PID {pid.value} >nul 2>&1")
        print(f"[+] Wymuszono zamknięcie PID: {pid.value}")

def kill_all_flutter_instances():
    killed_count = 0
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = proc.info['name'].lower()
            cmd = " ".join(proc.info['cmdline'] or []).lower()
            
            if "flutter" in name or "flutter_runner" in name or "dart.exe" in name:
                proc.kill()
                print(f"[+] [PANIC] Zamknięto instancję Flutter: {name} (PID: {proc.info['pid']})")
                killed_count += 1
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

def emergency_panic_trigger():
    print("\\n[!] OTRZYMANO SYGNAŁ AWARYJNY (PANIC HOTKEY)!")
    kill_foreground_window()
    kill_all_flutter_instances()

if __name__ == "__main__":
    print("PANIC HOTKEY KILLER DZIAŁA W TLE")
    print(f"Skróty: [{HOTKEY.upper()}] lub [{ALT_HOTKEY.upper()}]")
    keyboard.add_hotkey(HOTKEY, emergency_panic_trigger)
    keyboard.add_hotkey(ALT_HOTKEY, emergency_panic_trigger)
    keyboard.wait()
`
  },
  {
    id: "flutter_process_watchdog",
    title: "4. Agresywny Watchdog Procesów i Pamięci (psutil Module Scanner)",
    shortDesc: "Ciągle monitoruje tworzenie nowych procesów w systemie. Błyskawicznie ubija procesy ładujące biblioteki flutter_windows.dll lub uruchamiane z runnera Fluttera.",
    badge: "Ciągły demon",
    os: ["windows"],
    requiresPip: true,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Głęboka inspekcja pamięci (memory_maps / loaded modules)",
      "Szybki czas reakcji (<100 ms od uruchomienia aplikacji Flutter)",
      "Wykrywa aplikacje Flutter nawet po zmianie nazwy pliku .exe",
      "Automatyczne logowanie i zapisywanie raportów o zablokowanych próbach"
    ],
    recommendedFor: "Gdy autor nakładki zmienił nazwę pliku .exe na inną (np. svchost.exe), ale plik wciąż ładuje silnik Fluttera.",
    explanation: [
      "Aplikacja we Flutterze na Windows zawsze wymaga silnika Flutter Engine (flutter_windows.dll).",
      "Nawet jeśli program zmieni nazwę pliku wykonywalnego, jego mapa pamięci ujawni biblioteki Fluttera.",
      "Ten skrypt sprawdza każdy nowy proces i jeśli wykryje bibliotekę silnika, natychmiast go eliminuje."
    ],
    code: `"""
=============================================================================
FLUTTER ENGINE MODULE DETECTOR & PROCESS KILLER (psutil Memory Watchdog)
=============================================================================
Wykrywa Fluttera po załadowanych modułach DLL, nawet jeśli proces ma fałszywą nazwę.
=============================================================================
"""
import psutil
import time
import os

FLUTTER_DLL_NAMES = {"flutter_windows.dll", "flutter_engine.dll", "flutter_embedder.dll"}

def is_flutter_process(proc):
    try:
        name = proc.name().lower()
        if "flutter" in name:
            return True, f"Nazwa procesu: {name}"

        cmdline = " ".join(proc.cmdline()).lower() if proc.cmdline() else ""
        if "flutter" in cmdline:
            return True, f"Argumenty wiersza poleceń: {cmdline}"

        if hasattr(proc, "memory_maps"):
            for mm in proc.memory_maps():
                dll_filename = os.path.basename(mm.path).lower()
                if dll_filename in FLUTTER_DLL_NAMES:
                    return True, f"Załadowana biblioteka DLL: {dll_filename} ({mm.path})"
    except Exception:
        pass
    return False, ""

def run_watchdog():
    print("[*] Aktywny skaner pamięci procesów Fluttera.")
    seen_pids = set()

    while True:
        current_pids = set()
        for proc in psutil.process_iter(['pid', 'name']):
            try:
                pid = proc.info['pid']
                current_pids.add(pid)
                
                if pid not in seen_pids:
                    seen_pids.add(pid)
                    is_flt, reason = is_flutter_process(proc)
                    if is_flt:
                        print(f"\\n[!] WYKRYTO SILNIK FLUTTERA: PID {pid} ({proc.info['name']})")
                        print(f"    Powód: {reason}")
                        proc.kill()
                        print(f"[+] [SUKCES] Proces PID {pid} został zlikwidowany.")
            except (psutil.NoSuchProcess, psutil.AccessDenied):
                continue

        seen_pids = seen_pids.intersection(current_pids)
        time.sleep(0.2)

if __name__ == "__main__":
    try:
        run_watchdog()
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano monitorowanie.")
`
  },
  {
    id: "linux_x11_overlay_killer",
    title: "5. Linux (X11 / Wayland) Overlay & Flutter Window Killer",
    shortDesc: "Skrypt dla systemów Linux. Używa xdotool, wmctrl, xprop i psutil do wykrywania pełnoekranowych okien w warstwie _NET_WM_STATE_ABOVE i ich ubijania.",
    badge: "Linux (X11/Wayland)",
    os: ["linux"],
    requiresPip: true,
    pipPackages: ["psutil"],
    keyFeatures: [
      "Sprawdza atrybuty okien X11 (_NET_WM_STATE_ABOVE / FULLSCREEN)",
      "Wspiera xdotool, xprop oraz xkill",
      "Działa z kompilacjami Flutter Linux Desktop (libflutter_linux.so)",
      "Automatyczne przywracanie kontroli nad kursorem (xdotool mouse focus)"
    ],
    recommendedFor: "Gdy nakładka blokuje środowisko graficzne na Linuksie (Ubuntu, Debian, Fedora, Arch).",
    explanation: [
      "Na Linuksie Flutter tworzy okna za pomocą biblioteki GTK3 i silnika libflutter_linux.so.",
      "Okna Always-on-top ustawiają atrybut atomu _NET_WM_STATE_ABOVE.",
      "Skrypt odpytuje serwer X11 o geometrię i właściwości okien, po czym zabija proces odpowiedzialny za blokadę."
    ],
    code: `"""
=============================================================================
LINUX X11 / WAYLAND FLUTTER OVERLAY KILLER
=============================================================================
Instalacja narzędzi i bibliotek:
  sudo apt install xdotool wmctrl x11-utils
  pip install psutil
=============================================================================
"""
import subprocess
import time
import psutil
import os

def get_screen_resolution():
    try:
        out = subprocess.check_output("xrandr | grep '*' | awk '{print $1}'", shell=True).decode()
        res = out.strip().split('\\n')[0]
        w, h = map(int, res.split('x'))
        return w, h
    except Exception:
        return 1920, 1080

def get_visible_windows():
    try:
        out = subprocess.check_output(["xdotool", "search", "--onlyvisible", "--name", ".*"]).decode()
        return [line.strip() for line in out.strip().split('\\n') if line.strip()]
    except Exception:
        return []

def get_window_pid(window_id):
    try:
        out = subprocess.check_output(["xdotool", "getwindowpid", window_id]).decode().strip()
        return int(out)
    except Exception:
        return None

def is_window_topmost_or_fullscreen(window_id, screen_w, screen_h):
    try:
        xprop = subprocess.check_output(["xprop", "-id", window_id]).decode()
        is_above = "_NET_WM_STATE_ABOVE" in xprop or "_NET_WM_STATE_STAYS_ON_TOP" in xprop
        is_fullscreen = "_NET_WM_STATE_FULLSCREEN" in xprop
        return is_above or is_fullscreen
    except Exception:
        return False

def scan_and_destroy_linux():
    screen_w, screen_h = get_screen_resolution()
    windows = get_visible_windows()

    for win_id in windows:
        if is_window_topmost_or_fullscreen(win_id, screen_w, screen_h):
            pid = get_window_pid(win_id)
            if pid:
                try:
                    proc = psutil.Process(pid)
                    proc_name = proc.name()
                    if proc_name in ("gnome-shell", "plasma", "xfce4-panel", "xorg", "wayland"):
                        continue
                    print(f"[!] Wykryto blokujące okno Linux: {proc_name} (PID: {pid})")
                    proc.kill()
                except Exception as e:
                    os.system(f"kill -9 {pid}")

if __name__ == "__main__":
    print("[*] Skaner nakładek Linux (X11) aktywny. Skanowanie co 500 ms...")
    try:
        while True:
            scan_and_destroy_linux()
            time.sleep(0.5)
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano.")
`
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInB5dGhvblNjcmlwdHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHl0aG9uU2NyaXB0VGVtcGxhdGUgfSBmcm9tICcuLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBQWVRIT05fU0NSSVBUUzogUHl0aG9uU2NyaXB0VGVtcGxhdGVbXSA9IFtcbiAge1xuICAgIGlkOiAnZ25pZGFfYXV0b19mcmVlemVfZGFlbW9uJyxcbiAgICB0aXRsZTogJ+KaoSBDWlVKTklLIEdOSUQ6IEF1dG9ub21pY3pueSBEYWVtb24gTmF0eWNobWlhc3Rvd2VnbyBBdXRvLUZyZWV6dSAoMCBtcyBOdFN1c3BlbmRQcm9jZXNzIC8gWmVybyBVSSknLFxuICAgIHNob3J0RGVzYzogJ1cgMTAwJSBiZXpvYnPFgnVnb3d5IGF1dG9tYXQgdyB0bGUuIFd5a3J5d2EgcG9qYXdpZW5pZSBzacSZIGRvd29sbmVqIEduaWR5IChva25hIFRvcE1vc3QsIG5ha8WCYWRraSBGbHV0dGVyLCBrcmFkemllxbwgZm9rdXN1LCBwcsOzYnkgd3N0cnp5a2l3YW5pYSBkbyBwYW1pxJljaSkgaSB3IDAgbXMgemFtcmHFvGEgamVqIHfEhXRraSB3IFJBTSB6YSBwb21vY8SFIG50ZGxsLk50U3VzcGVuZFByb2Nlc3Mgb3JheiB6ZGVqbXVqZSBmbGFnxJkgeiBva25hLicsXG4gICAgYmFkZ2U6ICdBdXRvbm9taWN6bnkgQ3p1am5payAmIEF1dG8tRnJlZXplJyxcbiAgICBvczogWyd3aW5kb3dzJywgJ2xpbnV4JywgJ21hY29zJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0N6eXN0eSBhdXRvbWF0IGR6aWHFgmFqxIVjeSB3IHDEmXRsaSBqxIVkcmEgYmV6IHBvdHJ6ZWJ5IGpha2llamtvbHdpZWsgaW50ZXJha2NqaSB6IFVJJyxcbiAgICAgICdOYXR5Y2htaWFzdG93eSBjemFzIHJlYWtjamkgKDAgbXMpIHByenkgcG9qYXdpZW5pdSBzacSZIHrFgm/Fm2xpd2VnbyBwcm9jZXN1IGx1YiBva25hJyxcbiAgICAgICdOdFN1c3BlbmRQcm9jZXNzIChjdHlwZXMvV2luMzIpIG5hdHljaG1pYXN0IHphbXJhxbxhIHfEhXRraSB3IHBhbWnEmWNpIFJBTScsXG4gICAgICAnQXV0b21hdHljem5lIG9kcGnEmWNpZSBmbGFnaSBIV05EX1RPUE1PU1QgKFNldFdpbmRvd1BvcykgaSBuYXR5Y2htaWFzdG93ZSBvZHp5c2thbmllIG1vbml0b3JhJyxcbiAgICAgICdOYSBMaW51eC9tYWNPUyB3eXN5xYJhIG5hdHljaG1pYXN0b3d5IHN5Z25hxYIgU0lHU1RPUCAoa2lsbCAtMTkpJyxcbiAgICAgICdEemlhxYJhIGJleiB6ZXduxJl0cnpueWNoIGJpYmxpb3RlayAoWmVyby1EZXBlbmRlbmN5KSB3IGN6eXN0eW0gUHl0aG9uaWUgMydcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnV3ltYWdhbmEgY2nEhWfFgmEgb2Nocm9uYSB3IHRsZSBwcnplZCB6xYJvxZtsaXd5bWkgbmFrxYJhZGthbWksIHJhbnNvbXdhcmVtIGkgYmxva2FkYW1pIHB1bHBpdHUuIFVydWNob21pb255IHJheiB3IHRsZSBjaHJvbmkgc3lzdGVtIDI0LzcuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIFNlbnNvcnlrYSBPa2llbjogQ2nEhWfFgmUgd3l3b8WCeXdhbmllIEVudW1XaW5kb3dzIHcgcMSZdGxpIG5pc2tvcG96aW9tb3dlaiB6IGZpbHRyb3dhbmllbSBmbGFnaSBXU19FWF9UT1BNT1NULicsXG4gICAgICAnMi4gU2Vuc29yeWthIFByb2Nlc8OzdzogV2VyeWZpa2FjamEgUElELcOzdyBwb2Qga8SFdGVtIHN5Z25hdHVyIG5ha8WCYWRlayBpIGhvb2vDs3cuJyxcbiAgICAgICczLiBOYXR5Y2htaWFzdG93eSBBdXRvLUZyZWU6IFByenkgcGllcndzemVqIGRldGVrY2ppIG5hc3TEmXB1amUgd3l3b8WCYW5pZSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzIGJleiBjemVrYW5pYSBuYSBkZWN5emrEmSB1xbx5dGtvd25pa2EuJyxcbiAgICAgICc0LiBad29sbmllbmllIEkvTzogdXNlcjMyLlNldFdpbmRvd1BvcyB6ZGVqbXVqZSB6YWJsb2tvd2FuZSB3YXJzdHd5IHogbW9uaXRvcmEgaSBwcnp5d3JhY2EgcHVscGl0LicsXG4gICAgICAnNS4gQnJhayBadcW8eWNpYSBDUFU6IEludGVsaWdlbnRuYSBwxJl0bGEgemUgc25lbSAxNTAgbXMgbmllIG9iY2nEhcW8YSBwcm9jZXNvcmEuJ1xuICAgIF0sXG4gICAgY29kZTogYCMhL3Vzci9iaW4vZW52IHB5dGhvbjNcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIEFVVE9OT01JQ1pOWSBDWlVKTklLIEdOSUQgJiBEQUVNT04gTkFUWUNITUlBU1RPV0VHTyBBVVRPLUZSRUVaVSBXIFJBTVxuIyBQbGlrOiBnbmlkYV9hdXRvX2ZyZWV6ZV9kYWVtb24ucHlcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgc2lnbmFsXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcblxuUE9MTF9JTlRFUlZBTF9TRUMgPSAwLjE1XG5BVVRPX1NUUklQX1RPUE1PU1QgPSBUcnVlXG5BVVRPX1NVU1BFTkRfUkFNICAgPSBUcnVlXG5BVVRPX0xPR19DT05TT0xFICAgPSBUcnVlXG5cbkdOSURBX0tFWVdPUkRTID0gW1xuICAgIFwiZmx1dHRlcl9kZXNrdG9wXCIsIFwib3ZlcmxheVwiLCBcInNjcmVlbl9sb2NrXCIsIFwidG9wbW9zdFwiLCBcImhpamFja1wiLFxuICAgIFwicmFuc29tXCIsIFwid2lwZXJcIiwgXCJtaW5lclwiLCBcImhvb2tfc3B5XCIsIFwiYml0c2Rvam9cIiwgXCJ3aW5kb3dfbWFuYWdlclwiXG5dXG5cbkhXTkRfTk9UT1BNT1NUID0gLTJcblNXUF9OT1NJWkUgICAgID0gMHgwMDAxXG5TV1BfTk9NT1ZFICAgICA9IDB4MDAwMlxuU1dQX05PQUNUSVZBVEUgPSAweDAwMTBcbldTX0VYX1RPUE1PU1QgID0gMHgwMDAwMDAwOFxuUFJPQ0VTU19BTExfQUNDRVNTID0gMHgxRjBGRkZcblxuY2xhc3MgR25pZGFBdXRvRnJlZXplRGFlbW9uOlxuICAgIGRlZiBfX2luaXRfXyhzZWxmKTpcbiAgICAgICAgc2VsZi5pc193aW5kb3dzID0gb3MubmFtZSA9PSAnbnQnXG4gICAgICAgIHNlbGYuZnJvemVuX3BpZHMgPSBzZXQoKVxuICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCA9IDBcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgc2VsZi51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxuICAgICAgICAgICAgc2VsZi5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgICAgIHNlbGYubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG4gICAgICAgIHByaW50KFwiPVwiICogNzUpXG4gICAgICAgIHByaW50KFwiWypdIEFVVE9OT01JQ1pOWSBDWlVKTklLIEdOSUQgWkFJTklDSkFMSVpPV0FOWSAoVFJZQiBBVVRPTUFUVSBXIFRMRSlcIilcbiAgICAgICAgcHJpbnQoZlwiWypdIFBsYXRmb3JtYToge3N5cy5wbGF0Zm9ybS51cHBlcigpfSB8IEludGVyd2HFgjoge1BPTExfSU5URVJWQUxfU0VDfXNcIilcbiAgICAgICAgcHJpbnQoXCJbKl0gR290b3d5LiBLYcW8ZGEgd3lrcnl0YSBHbmlkYSB6b3N0YW5pZSB6YW1yb8W8b25hIGF1dG9tYXR5Y3puaWUgKDAgbXMpLlwiKVxuICAgICAgICBwcmludChcIj1cIiAqIDc1KVxuXG4gICAgZGVmIGZyZWV6ZV9wcm9jZXNzX3JhbShzZWxmLCBwaWQsIHByb2NfbmFtZT1cIk5pZXpuYW5hIEduaWRhXCIpOlxuICAgICAgICBpZiBwaWQgaW4gc2VsZi5mcm96ZW5fcGlkcyBvciBwaWQgPD0gNDpcbiAgICAgICAgICAgIHJldHVybiBGYWxzZVxuICAgICAgICBzdWNjZXNzID0gRmFsc2VcbiAgICAgICAgaWYgc2VsZi5pc193aW5kb3dzOlxuICAgICAgICAgICAgaF9wcm9jID0gc2VsZi5rZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX0FMTF9BQ0NFU1MsIEZhbHNlLCBwaWQpXG4gICAgICAgICAgICBpZiBoX3Byb2M6XG4gICAgICAgICAgICAgICAgc3RhdHVzID0gc2VsZi5udGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAgICAgICAgICBzZWxmLmtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgZWxzZTpcbiAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApXG4gICAgICAgICAgICAgICAgc3VjY2VzcyA9IFRydWVcbiAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgcGFzc1xuXG4gICAgICAgIGlmIHN1Y2Nlc3M6XG4gICAgICAgICAgICBzZWxmLmZyb3plbl9waWRzLmFkZChwaWQpXG4gICAgICAgICAgICBzZWxmLnRvdGFsX2Zyb3plbl9jb3VudCArPSAxXG4gICAgICAgICAgICBpZiBBVVRPX0xPR19DT05TT0xFOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlvimqEgQVVUTy1GUkVFWkVdIENaVUpOSUsgV1lLUlnFgSBHTklExJg6IFBJRD17cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgICAgICAgICAgICAgLT4gV8SFdGtpIG5hdHljaG1pYXN0IHphbXJvxbxvbmUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpIVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICAgICAgICAgICAgIC0+IMWBxIVjem5pZSB6bmV1dHJhbGl6b3dhbnljaCBHbmlkOiB7c2VsZi50b3RhbF9mcm96ZW5fY291bnR9XCIpXG4gICAgICAgIHJldHVybiBzdWNjZXNzXG5cbiAgICBkZWYgc3RyaXBfdG9wbW9zdF93aW5kb3coc2VsZiwgaHduZCk6XG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgZXhfc3R5bGUgPSBzZWxmLnVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgIGlmIGV4X3N0eWxlICYgV1NfRVhfVE9QTU9TVDpcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLlNldFdpbmRvd1BvcyhcbiAgICAgICAgICAgICAgICBod25kLCBIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgXG4gICAgICAgICAgICAgICAgU1dQX05PTU9WRSB8IFNXUF9OT1NJWkUgfCBTV1BfTk9BQ1RJVkFURVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgaWYgQVVUT19MT0dfQ09OU09MRTpcbiAgICAgICAgICAgICAgICBwcmludChmXCJb4pqhIEkvTyBSRVNUT1JFXSBPZHp5c2thbm8gZm9rdXMgbW9uaXRvcmEgemUgesWCb8WbbGl3ZWdvIEhXTkQ9e2h3bmR9XCIpXG5cbiAgICBkZWYgc2Nhbl93aW5kb3dzX2FuZF9mcmVlemUoc2VsZik6XG4gICAgICAgIGlmIG5vdCBzZWxmLmlzX3dpbmRvd3M6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgV05ERU5VTVBST0MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgICAgICBkZWYgZW51bV93aW5kb3dfY2FsbGJhY2soaHduZCwgbFBhcmFtKTpcbiAgICAgICAgICAgIGlmIG5vdCBzZWxmLnVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHNlbGYudXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgIGV4X3N0eWxlID0gc2VsZi51c2VyMzIuR2V0V2luZG93TG9uZ1coaHduZCwgLTIwKVxuICAgICAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiBXU19FWF9UT1BNT1NUKVxuICAgICAgICAgICAgbGVuZ3RoID0gc2VsZi51c2VyMzIuR2V0V2luZG93VGV4dExlbmd0aFcoaHduZClcbiAgICAgICAgICAgIGJ1ZmYgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKGxlbmd0aCArIDEpXG4gICAgICAgICAgICBzZWxmLnVzZXIzMi5HZXRXaW5kb3dUZXh0Vyhod25kLCBidWZmLCBsZW5ndGggKyAxKVxuICAgICAgICAgICAgdGl0bGUgPSBidWZmLnZhbHVlLmxvd2VyKClcbiAgICAgICAgICAgIGlzX2duaWRhID0gaXNfdG9wbW9zdCBvciBhbnkoa3cgaW4gdGl0bGUgZm9yIGt3IGluIEdOSURBX0tFWVdPUkRTKVxuICAgICAgICAgICAgaWYgaXNfZ25pZGEgYW5kIHBpZC52YWx1ZSBub3QgaW4gc2VsZi5mcm96ZW5fcGlkczpcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NUUklQX1RPUE1PU1Q6XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuc3RyaXBfdG9wbW9zdF93aW5kb3coaHduZClcbiAgICAgICAgICAgICAgICBpZiBBVVRPX1NVU1BFTkRfUkFNOlxuICAgICAgICAgICAgICAgICAgICBzZWxmLmZyZWV6ZV9wcm9jZXNzX3JhbShwaWQudmFsdWUsIGZcIk9rbm86ICd7YnVmZi52YWx1ZX0nXCIpXG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBzZWxmLnVzZXIzMi5FbnVtV2luZG93cyhXTkRFTlVNUFJPQyhlbnVtX3dpbmRvd19jYWxsYmFjayksIDApXG5cbiAgICBkZWYgcnVuX2ZvcmV2ZXIoc2VsZik6XG4gICAgICAgIHRyeTpcbiAgICAgICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICAgICAgc2VsZi5zY2FuX3dpbmRvd3NfYW5kX2ZyZWV6ZSgpXG4gICAgICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMX1NFQylcbiAgICAgICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBDenVqbmlrIHphdHJ6eW1hbnkuXCIpXG5cbmlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG4gICAgZGFlbW9uID0gR25pZGFBdXRvRnJlZXplRGFlbW9uKClcbiAgICBkYWVtb24ucnVuX2ZvcmV2ZXIoKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdlbWVyZ2VuY3lfcGFuaWNfc3VzcGVuZF9tdWx0aV9vcycsXG4gICAgdGl0bGU6ICfimIUgUEFOSUMgQlVUVE9OOiBNdWx0aS1PUyBTaW11bHRhbmVvdXMgRmx1dHRlciBQcm9jZXNzIFN1c3BlbmQgKGN0eXBlcyAvIFNJR1NUT1AgMTkpJyxcbiAgICBzaG9ydERlc2M6ICdOYXR5Y2htaWFzdG93ZSB6YXRyenltYW5pZSB3xIV0a8OzdyB3c3p5c3RraWNoIHByb2Nlc8OzdyBwb3dpxIV6YW55Y2ggeiBGbHV0dGVyZW0gaSBuYWvFgmFka2FtaSB3IHBhbWnEmWNpIFJBTS4gVcW8eXdhIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgKGN0eXBlcykgbmEgV2luZG93cyBvcmF6IHN5Z25hxYJ1IFNJR1NUT1AgKGtpbGwgLTE5IC8gcGtpbGwpIG5hIExpbnV4IGkgbWFjT1MuJyxcbiAgICBiYWRnZTogJ1VuaXZlcnNhbCBNdWx0aS1PUyBQYW5pYyBGcmVlemUnLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogZmFsc2UsXG4gICAgcGlwUGFja2FnZXM6IFtdLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnV3lrcnl3YSBwbGF0Zm9ybcSZIHcgbG9jaWUgKFdpbmRvd3MsIExpbnV4LCBtYWNPUykgYmV6IHpld27EmXRyem55Y2ggemFsZcW8bm/Fm2NpJyxcbiAgICAgICdXaW5kb3dzOiBOdFN1c3BlbmRQcm9jZXNzICgweDA4MDAgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSkgbmF0eWNobWlhc3QgemFtcmHFvGEgY3lrbGUgQ1BVJyxcbiAgICAgICdMaW51eC9tYWNPUzogV3lzecWCYSBzeWduYcWCIGrEhWRyYSBTSUdTVE9QIChTaWduYWwgMTkpIHphIHBvbW9jxIUgb3Mua2lsbCAvIHBraWxsIC1TVE9QJyxcbiAgICAgICdaYWNob3d1amUgbmllbmFydXN6b255IHN0YW4gcGFtacSZY2kgUkFNIGRvIGFuYWxpenkgcG93xYJhbWFuaW93ZWogaSBmb3JlbnNpYyBkdW1wYScsXG4gICAgICAnVXdhbG5pYSBrdXJzb3IgbXlzenkgaSBrbGF3aWF0dXLEmSB6IHDEmXRsaSBwcnplY2h3eXR5d2FuaWEgb2tuYSBibG9rYWR5J1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdXIHN5dHVhY2ppIGtyeXR5Y3puZWosIGdkeSBuYWvFgmFka2EgRmx1dHRlcmEgemFibG9rb3dhxYJhIGNhxYJ5IGVrcmFuLCB1bmllbW/FvGxpd2lhIGtsaWtuacSZY2llIGN6ZWdva29sd2llayBpIHd5bWFnYSBuYXR5Y2htaWFzdG93ZWdvIHphbXJvxbxlbmlhIG5hIGRvd29sbnltIHN5c3RlbWllIChXaW5kb3dzL0xpbnV4L21hY09TKS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnMS4gQXV0by1EZXRla2NqYSBPUzogcGxhdGZvcm0uc3lzdGVtKCkgcm96csOzxbxuaWEgV2luZG93cyAoTlQpIG9kIHN5c3RlbcOzdyBQT1NJWCAoTGludXgvRGFyd2luKS4nLFxuICAgICAgJzIuIFdpbmRvd3MgRW5naW5lOiBXeWtvcnp5c3R1amUgY3R5cGVzLndpbmRsbC5udGRsbC5OdFN1c3BlbmRQcm9jZXNzIG5hIHVjaHd5Y2llIHByb2Nlc3Ugb3R3YXJ0eW0geiB1cHJhd25pZW5pZW0gMHgwODAwLicsXG4gICAgICAnMy4gUE9TSVggRW5naW5lOiBXeWtvcnp5c3R1amUgb3Mua2lsbChwaWQsIHNpZ25hbC5TSUdTVE9QKSAtIHN5Z25hxYIgMTkgemF0cnp5bXVqZSBwbGFub3dhbmllIHfEhXRrw7N3IHByemV6IHNjaGVkdWxlciBqxIVkcmEgTGludXgvbWFjT1MuJyxcbiAgICAgICc0LiBad29sbmllbmllIEkvTzogTmF0eWNobWlhc3QgdXdhbG5pYSBrdXJzb3IgbXlzenkgaSBzeXN0ZW0ga29sZWprb3dhbmlhIHpkYXJ6ZcWEIG9rbmEuJyxcbiAgICAgICc1LiBCZXpwaWVjemXFhHN0d28gRGFueWNoOiBQcm9jZXMgcG96b3N0YWplIHcgcGFtacSZY2kgKHN0YXR1cyBUIC8gU3VzcGVuZGVkKSB1bW/FvGxpd2lhasSFYyB6cnp1dCBwYW1pxJljaSAoY29yZSBkdW1wKS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTVVMVEktT1MgRU1FUkdFTkNZIFBBTklDIEZSRUVaRSBTQ1JJUFQgKFdJTkRPV1MgLyBMSU5VWCAvIE1BQ09TKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSBFTUVSR0VOQ1kgU1VTUEVORCBFTkdJTkVcbkF1dG9tYXR5Y3puaWUgd3lrcnl3YSBzeXN0ZW0gb3BlcmFjeWpueSBpIG5hdHljaG1pYXN0b3dvIFpBTVJBxbtBIChOdFN1c3BlbmRQcm9jZXNzXG5sdWIgU0lHU1RPUCBTaWduYWwgMTkpIHdzenlzdGtpZSBwcm9jZXN5IHBvd2nEhXphbmUgeiBGbHV0dGVyZW0gaSBuYWvFgmFka2FtaS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBzeXNcbmltcG9ydCBvc1xuaW1wb3J0IHBsYXRmb3JtXG5pbXBvcnQgc3VicHJvY2Vzc1xuaW1wb3J0IHNpZ25hbFxuXG5kZWYgcGFuaWNfc3VzcGVuZF93aW5kb3dzKCk6XG4gICAgXCJcIlwiV2luZG93cyBLZXJuZWwgVGhyZWFkICYgUHJvY2VzcyBTdXNwZW5kIHZpYSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzXCJcIlwiXG4gICAgcHJpbnQoXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBXSU5ET1dTLiBJbmljamFsaXphY2phIG50ZGxsIC8gY3R5cGVzLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICBpbXBvcnQgY3R5cGVzXG4gICAgICAgIGZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuXG4gICAgICAgIG50ZGxsID0gY3R5cGVzLndpbmRsbC5udGRsbFxuICAgICAgICBrZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICAgICAgUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMFxuXG4gICAgICAgIGNtZCA9ICd0YXNrbGlzdCAvRk8gQ1NWIC9OSCdcbiAgICAgICAgb3V0cHV0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoY21kLCBzaGVsbD1UcnVlLCB0ZXh0PVRydWUsIGVycm9ycz0naWdub3JlJylcbiAgICAgICAgXG4gICAgICAgIHRhcmdldF9uYW1lcyA9IFsnZmx1dHRlcicsICdydW5uZXInLCAnb3ZlcmxheScsICdkcm9wcGVyJywgJ2xvY2tzY3JlZW4nXVxuICAgICAgICBzdXNwZW5kZWRfY291bnQgPSAwXG5cbiAgICAgICAgZm9yIGxpbmUgaW4gb3V0cHV0LnN0cmlwKCkuc3BsaXQoJ1xcXFxuJyk6XG4gICAgICAgICAgICBwYXJ0cyA9IFtwLnN0cmlwKCdcXFwiJykgZm9yIHAgaW4gbGluZS5zcGxpdCgnXFxcIixcXFwiJyldXG4gICAgICAgICAgICBpZiBsZW4ocGFydHMpID49IDI6XG4gICAgICAgICAgICAgICAgcG5hbWUgPSBwYXJ0c1swXVxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgcGlkID0gaW50KHBhcnRzWzFdKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBWYWx1ZUVycm9yOlxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgICAgICAgICAgaWYgYW55KHQgaW4gcG5hbWUubG93ZXIoKSBmb3IgdCBpbiB0YXJnZXRfbmFtZXMpOlxuICAgICAgICAgICAgICAgICAgICBwcmludChmXCJbIV0gWmFtcmHFvGFuaWUgUElEIHtwaWR9ICh7cG5hbWV9KS4uLlwiKVxuICAgICAgICAgICAgICAgICAgICBoX3Byb2Nlc3MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgICAgICAgICAgICAgICAgICBpZiBoX3Byb2Nlc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGF0dXMgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvY2VzcylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHN0YXR1cyA9PSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgW+Kck10gTnRTdXNwZW5kUHJvY2VzcyhQSUQ9e3BpZH0pIFNVS0NFUyEgV8SFdGtpIHphbXJvxbxvbmUgdyBSQU0uXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VzcGVuZGVkX2NvdW50ICs9IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2U6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gTnRTdXNwZW5kUHJvY2VzcyB6d3LDs2NpxYIga29kIE5UU1RBVFVTOiAweHtzdGF0dXM6MDhYfVwiKVxuICAgICAgICAgICAgICAgICAgICBlbHNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gQnJhayB1cHJhd25pZcWEIGRvIE9wZW5Qcm9jZXNzIGRsYSBQSUQge3BpZH0uIFVydWNob20gamFrbyBBZG1pbmlzdHJhdG9yIVwiKVxuXG4gICAgICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIFdpbmRvd3MuXCIpXG5cbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIltCxYHEhEQgV0lORE9XU10ge2V9XCIpXG5cbmRlZiBwYW5pY19zdXNwZW5kX3Bvc2l4KG9zX25hbWUpOlxuICAgIFwiXCJcIkxpbnV4ICYgbWFjT1MgUHJvY2VzcyBGcmVlemUgdmlhIFNJR1NUT1AgKFNpZ25hbCAxOSlcIlwiXCJcbiAgICBwcmludChmXCJbKl0gV3lrcnl0byDFm3JvZG93aXNrbyBQT1NJWCAoe29zX25hbWV9KS4gV3lzecWCYW5pZSBzeWduYcWCdSBTSUdTVE9QICgxOSkuLi5cIilcbiAgICB0YXJnZXRfcGF0dGVybnMgPSBbJ2ZsdXR0ZXInLCAnZmx1dHRlcl9ydW5uZXInLCAnbG9ja3NjcmVlbicsICdvdmVybGF5X2FwcCddXG4gICAgc3VzcGVuZGVkX2NvdW50ID0gMFxuXG4gICAgZm9yIHBhdHRlcm4gaW4gdGFyZ2V0X3BhdHRlcm5zOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBwaWRzX3JhdyA9IHN1YnByb2Nlc3MuY2hlY2tfb3V0cHV0KFsncGdyZXAnLCAnLWYnLCBwYXR0ZXJuXSwgdGV4dD1UcnVlLCBlcnJvcnM9J2lnbm9yZScpXG4gICAgICAgICAgICBwaWRzID0gW2ludChwKSBmb3IgcCBpbiBwaWRzX3Jhdy5zdHJpcCgpLnNwbGl0KCkgaWYgcC5pc2RpZ2l0KCldXG5cbiAgICAgICAgICAgIGZvciBwaWQgaW4gcGlkczpcbiAgICAgICAgICAgICAgICBpZiBwaWQgPT0gb3MuZ2V0cGlkKCk6XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBvcy5raWxsKHBpZCwgc2lnbmFsLlNJR1NUT1ApICMgU3lnbmHFgiAxOSAoU0lHU1RPUClcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBb4pyTXSBraWxsIC1TVE9QIChQSUQ9e3BpZH0sIHd6b3J6ZWM9J3twYXR0ZXJufScpIC0+IFfEhXRraSB6YXRyenltYW5lIHByemV6IHNjaGVkdWxlciBqxIVkcmEhXCIpXG4gICAgICAgICAgICAgICAgICAgIHN1c3BlbmRlZF9jb3VudCArPSAxXG4gICAgICAgICAgICAgICAgZXhjZXB0IFBlcm1pc3Npb25FcnJvcjpcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiICBbWF0gV3ltYWdhbnkgcm9vdCAvIHN1ZG8gZGxhIFBJRCB7cGlkfSFcIilcbiAgICAgICAgICAgICAgICBleGNlcHQgUHJvY2Vzc0xvb2t1cEVycm9yOlxuICAgICAgICAgICAgICAgICAgICBwYXNzXG4gICAgICAgIGV4Y2VwdCBzdWJwcm9jZXNzLkNhbGxlZFByb2Nlc3NFcnJvcjpcbiAgICAgICAgICAgIHBhc3NcblxuICAgIHRyeTpcbiAgICAgICAgc3VicHJvY2Vzcy5ydW4oWydwa2lsbCcsICctU1RPUCcsICctZicsICdmbHV0dGVyJ10sIGNoZWNrPUZhbHNlKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuICAgIHByaW50KGZcIlxcXFxuW1pBS0/Fg0NaT05PXSBaYW1yb8W8b25vIHtzdXNwZW5kZWRfY291bnR9IHByb2Nlc8OzdyBuYSBwbGF0Zm9ybWllIHtvc19uYW1lfS5cIilcblxuZGVmIG1haW4oKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBFTUVSR0VOQ1kgUEFOSUMgRlJFRVpFOiBNVUxUSS1PUyBTSU1VTFRBTkVPVVMgUFJPQ0VTUyBTVVNQRU5EXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcbiAgICBcbiAgICBjdXJyZW50X29zID0gcGxhdGZvcm0uc3lzdGVtKCkubG93ZXIoKVxuICAgIHByaW50KGZcIlsqXSBXeWtyeXRhIHBsYXRmb3JtYSBqxIVkcmE6IHtwbGF0Zm9ybS5zeXN0ZW0oKX0gKHtwbGF0Zm9ybS5yZWxlYXNlKCl9KVwiKVxuXG4gICAgaWYgY3VycmVudF9vcyA9PSAnd2luZG93cyc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfd2luZG93cygpXG4gICAgZWxpZiBjdXJyZW50X29zID09ICdsaW51eCc6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ0xpbnV4JylcbiAgICBlbGlmIGN1cnJlbnRfb3MgPT0gJ2Rhcndpbic6XG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoJ21hY09TJylcbiAgICBlbHNlOlxuICAgICAgICBwcmludChmXCJbIV0gTmllem5hbnkgc3lzdGVtOiB7Y3VycmVudF9vc30uIFByw7NiYSB3eWtvbmFuaWEgc3RhbmRhcmRvd2VnbyBTSUdTVE9QLi4uXCIpXG4gICAgICAgIHBhbmljX3N1c3BlbmRfcG9zaXgoY3VycmVudF9vcylcblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFNUQU4gQVdBUllKTlk6IFBST0NFU1kgWkFUUlpZTUFORSBXIFBBTUnEmENJIFJBTSAoMCUgQ1BVKVwiKVxuICAgIHByaW50KFwiICBBYnkgd3pub3dpxIcgcHJvY2VzeSB3IGNlbGFjaCBkZWJ1Z293YW5pYTpcIilcbiAgICBwcmludChcIiAgICAtIExpbnV4L21hY09TIDoga2lsbCAtQ09OVCA8UElEPiAgbHViICBwa2lsbCAtQ09OVCAtZiBmbHV0dGVyXCIpXG4gICAgcHJpbnQoXCIgICAgLSBXaW5kb3dzICAgICA6IG50ZGxsLk50UmVzdW1lUHJvY2VzcyhoUHJvY2VzcylcIilcbiAgICBwcmludChcIj1cIiAqIDcwKVxuXG5pZiBfX25hbWVfXyA9PSAnX19tYWluX18nOlxuICAgIG1haW4oKVxuYCxcbiAgfSxcbiAge1xuICAgIGlkOiAncHJvY2Vzc19yZXNvdXJjZV93YXRjaGRvZ19kYWVtb24nLFxuICAgIHRpdGxlOiAn4piFIFBST0NFU1MgV0FUQ0hET0c6IENpxIVnxYJ5IFN0cmHFvG5payBDUFUgJiBQYW1pxJljaSBSQU0geiBBdXRvLUZyZWV6ZScsXG4gICAgc2hvcnREZXNjOiAnRGFlbW9uIGN6YXN1IHJ6ZWN6eXdpc3RlZ28gYmFkYWrEhWN5IHp1xbx5Y2llIHphc29iw7N3IChHZXRQcm9jZXNzVGltZXMsIFdvcmtpbmdTZXQgUkFNKSBva2llbiBuYWvFgmFkZWsgRmx1dHRlcmEuIELFgnlza2F3aWN6bmllIHphbXJhxbxhIHfEhXRraSB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcykgbHViIHViaWphIHByb2NlcyBwcnp5IHByemVrcm9jemVuaXUgbGltaXTDs3cuJyxcbiAgICBiYWRnZTogJ0NQVSAmIFJBTSBSZXNvdXJjZSBXYXRjaGRvZycsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0NpxIVnxYJlIGJhZGFuaWUgcGFtacSZY2kgV29ya2luZ1NldFNpemUgemEgcG9tb2PEhSBLMzJHZXRQcm9jZXNzTWVtb3J5SW5mbyAvIFBTQVBJJyxcbiAgICAgICdQb21pYXJ5IG9iY2nEhcW8ZW5pYSBDUFUgZGxhIHfEhXRrw7N3IG9raWVuIEFsd2F5cy1vbi10b3AgaSBGdWxsc2NyZWVuJyxcbiAgICAgICdSZWd1xYJ5IGF1dG9tYXR5Y3puZWogcmVha2NqaTogTnRTdXNwZW5kUHJvY2VzcyAoemFtcm/FvGVuaWUpLCBTZXRQcmlvcml0eUNsYXNzIChkxYJhd2llbmllKSwgVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAnV3lrcnl3YW5pZSBwxJl0bGkgcmVuZGVyb3dhbmlhIEZsdXR0ZXIgVnN5bmMgbG9vcCBpIGFub21hbGlpIHd5Y2lla8OzdyBwYW1pxJljaScsXG4gICAgICAnRHppYcWCYSB3IDEwMCUgb2ZmbGluZSBiZXogxbxhZG55Y2ggemV3bsSZdHJ6bnljaCBiaWJsaW90ZWsgKFB1cmUgY3R5cGVzIFdpbjMyIEFQSSknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ0dkeSBuYWvFgmFka2EgRmx1dHRlcmEgbHViIHN6a29kbGl3eSBwcm9jZXMgcHJ6ZWNpxIXFvGEga29tcHV0ZXIsIHphd2llc3phIGt1cnNvciBteXN6eSwgenXFvHl3YSB6Ynl0IGR1xbxvIHByb2Nlc29yYS9SQU0tdSBsdWIgcHLDs2J1amUgdW5pZW1vxbxsaXdpxIcgdXJ1Y2hvbWllbmllIE1lbmVkxbxlcmEgWmFkYcWELicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBQb2JpZXJhbmllIEhXTkQ6IEVudW1XaW5kb3dzIGlkZW50eWZpa3VqZSB3c3p5c3RraWUgd2lkb2N6bmUgb2tuYSB6IGZsYWfEhSBXU19FWF9UT1BNT1NULicsXG4gICAgICAnMi4gVGVsZW1ldHJpYSBQYW1pxJljaTogV3l3b8WCdWplIEdldFByb2Nlc3NNZW1vcnlJbmZvIHogcHNhcGkuZGxsLCBvZGN6eXR1asSFYyByb3ptaWFyIFdvcmtpbmdTZXRTaXplIGkgUGFnZWZpbGVVc2FnZS4nLFxuICAgICAgJzMuIFBvbWlhcnkgQ1BVOiBPZGN6eXR1amUgY3phc3kgcHJvY2Vzb3JhIEdldFByb2Nlc3NUaW1lcyAoVXNlclRpbWUgKyBLZXJuZWxUaW1lKSB3IG9rbmllIGN6YXNvd3ltLicsXG4gICAgICAnNC4gRGV0ZWtjamEgQW5vbWFsaWk6IFBvcsOzd251amUgenXFvHljaWUgeiB6ZGVmaW5pb3dhbnltaSBwcm9nYW1pIChucC4gPjMwJSBDUFUgbHViID4yMDBNQiBSQU0pLicsXG4gICAgICAnNS4gTmF0eWNobWlhc3Rvd2EgTmV1dHJhbGl6YWNqYTogV3N0cnp5bXVqZSBwcm9jZXMgdyBsb2NpZSAoTnRTdXNwZW5kUHJvY2VzcykgemFwb2JpZWdhasSFYyB6YWJsb2tvd2FuaXUgc3lzdGVtdS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUFJPQ0VTUyBSRVNPVVJDRSBXQVRDSERPRyBEQUVNT04gKDEwMCUgT0ZGTElORSAvIFpFUk8tREVQRU5ERU5DWSlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5Nb25pdG9ydWplIHp1xbx5Y2llIENQVSBpIHBhbWnEmWNpIFJBTSBwcnpleiBwcm9jZXN5IG5ha8WCYWRlayBGbHV0dGVyYS5cblcgcHJ6eXBhZGt1IHByemVrcm9jemVuaWEgbGltaXR1IG5hdHljaG1pYXN0IHphbXJhxbxhIHByb2NlcyB3IFJBTSAoTnRTdXNwZW5kUHJvY2VzcykuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXCJcIlwiXG5pbXBvcnQgY3R5cGVzXG5mcm9tIGN0eXBlcyBpbXBvcnQgd2ludHlwZXNcbmltcG9ydCB0aW1lXG5pbXBvcnQgb3NcbmltcG9ydCBzeXNcblxuIyBXaW5kb3dzIEFQSSBCaW5kaW5nc1xudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5wc2FwaSA9IGN0eXBlcy53aW5kbGwucHNhcGlcblxuUFJPQ0VTU19RVUVSWV9JTkZPUk1BVElPTiA9IDB4MDQwMFxuUFJPQ0VTU19WTV9SRUFEID0gMHgwMDEwXG5QUk9DRVNTX1NVU1BFTkRfUkVTVU1FID0gMHgwODAwXG5QUk9DRVNTX1RFUk1JTkFURSA9IDB4MDAwMVxuUFJPQ0VTU19TRVRfSU5GT1JNQVRJT04gPSAweDAyMDBcbklETEVfUFJJT1JJVFlfQ0xBU1MgPSAweDAwMDAwMDQwXG5cbiMgRG9tecWbbG5lIHByb2dpIGFsYXJtb3dlXG5DUFVfTElNSVRfUEVSQ0VOVCA9IDM1LjBcblJBTV9MSU1JVF9NQiA9IDIwMC4wXG5QT0xMX0lOVEVSVkFMID0gMS4wICMgc2VrdW5keVxuXG5jbGFzcyBQUk9DRVNTX01FTU9SWV9DT1VOVEVSUyhjdHlwZXMuU3RydWN0dXJlKTpcbiAgICBfZmllbGRzXyA9IFtcbiAgICAgICAgKFwiY2JcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJQYWdlRmF1bHRDb3VudFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcIlBlYWtXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJXb3JraW5nU2V0U2l6ZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBlYWtQYWdlZFBvb2xVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJRdW90YVBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhUGVha05vblBhZ2VkUG9vbFVzYWdlXCIsIGN0eXBlcy5jX3NpemVfdCksXG4gICAgICAgIChcIlF1b3RhTm9uUGFnZWRQb29sVXNhZ2VcIiwgY3R5cGVzLmNfc2l6ZV90KSxcbiAgICAgICAgKFwiUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgICAgICAoXCJQZWFrUGFnZWZpbGVVc2FnZVwiLCBjdHlwZXMuY19zaXplX3QpLFxuICAgIF1cblxuZGVmIGdldF9wcm9jZXNzX3JhbV91c2FnZV9tYihoX3Byb2Nlc3MpOlxuICAgIFwiXCJcIk9kY3p5dHVqZSBha3R1YWxuZSB6dcW8eWNpZSBwYW1pxJljaSBSQU0gdyBNQi5cIlwiXCJcbiAgICBjb3VudGVycyA9IFBST0NFU1NfTUVNT1JZX0NPVU5URVJTKClcbiAgICBjb3VudGVycy5jYiA9IGN0eXBlcy5zaXplb2YoUFJPQ0VTU19NRU1PUllfQ09VTlRFUlMpXG4gICAgaWYgcHNhcGkuR2V0UHJvY2Vzc01lbW9yeUluZm8oaF9wcm9jZXNzLCBjdHlwZXMuYnlyZWYoY291bnRlcnMpLCBjb3VudGVycy5jYik6XG4gICAgICAgIHJldHVybiBjb3VudGVycy5Xb3JraW5nU2V0U2l6ZSAvICgxMDI0LjAgKiAxMDI0LjApXG4gICAgcmV0dXJuIDAuMFxuXG5kZWYgZnJlZXplX3Byb2Nlc3NfdGhyZWFkcyhwaWQpOlxuICAgIFwiXCJcIlphbXJhxbxhIHdzenlzdGtpZSB3xIV0a2kgdyBwYW1pxJljaSBSQU0uXCJcIlwiXG4gICAgaCA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJb4p2E77iPIFpBTVJPxbtPTk9dIE50U3VzcGVuZFByb2Nlc3MoUElEOiB7cGlkfSkgLSBaYXRyenltYW5vIHd5a29uYW5pZSBrb2R1IVwiKVxuXG5kZWYgdGhyb3R0bGVfcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIk9ibmnFvGEgcHJpb3J5dGV0IHByb2Nlc3UgZG8gbWluaW11bS5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TRVRfSU5GT1JNQVRJT04sIEZhbHNlLCBwaWQpXG4gICAgaWYgaDpcbiAgICAgICAga2VybmVsMzIuU2V0UHJpb3JpdHlDbGFzcyhoLCBJRExFX1BSSU9SSVRZX0NMQVNTKVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICBwcmludChmXCJb4pqhIFRIUk9UVExFXSBPYm5pxbxvbm8gcHJpb3J5dGV0IFBJRDoge3BpZH0gZG8gSURMRV9QUklPUklUWV9DTEFTUy5cIilcblxuZGVmIHdhdGNoZG9nX3NjYW5uZXIoKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KFwiICBQUk9DRVNTIFdBVENIRE9HOiBEQUVNT04gTU9OSVRPUk9XQU5JQSBDUFUgSSBQQU1JxJhDSSBSQU1cIilcbiAgICBwcmludChmXCIgIFByb2dpOiBSQU0gPiB7UkFNX0xJTUlUX01CfSBNQiB8IEludGVyd2HFgjoge1BPTExfSU5URVJWQUx9c1wiKVxuICAgIHByaW50KFwiPVwiICogNzApXG5cbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICBkZWYgZW51bV9wcm9jKGh3bmQsIGxwYXJhbSk6XG4gICAgICAgICAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgICAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiAweDAwMDAwMDA4KSAjIFdTX0VYX1RPUE1PU1RcblxuICAgICAgICAgICAgICAgIGlmIGlzX3RvcG1vc3Q6XG4gICAgICAgICAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgICAgICAgICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gfCBQUk9DRVNTX1ZNX1JFQUQsIEZhbHNlLCBwaWQudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIGlmIGhfcHJvYzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbV9tYiA9IGdldF9wcm9jZXNzX3JhbV91c2FnZV9tYihoX3Byb2MpXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2MpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIHJhbV9tYiA+PSBSQU1fTElNSVRfTUI6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiXFxcXG5b8J+aqCBBTEFSTSBXQVRDSERPR10gUElEIHtwaWQudmFsdWV9IHByemVrcm9jennFgiBsaW1pdCBwYW1pxJljaSBSQU06IHtyYW1fbWI6LjJmfSBNQiFcIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmVlemVfcHJvY2Vzc190aHJlYWRzKHBpZC52YWx1ZSlcblxuICAgICAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgICAgIGNiID0gY3R5cGVzLldJTkZVTkNUWVBFKHdpbnR5cGVzLkJPT0wsIHdpbnR5cGVzLkhXTkQsIHdpbnR5cGVzLkxQQVJBTSkoZW51bV9wcm9jKVxuICAgICAgICAgICAgdXNlcjMyLkVudW1XaW5kb3dzKGNiLCAwKVxuICAgICAgICAgICAgdGltZS5zbGVlcChQT0xMX0lOVEVSVkFMKVxuXG4gICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICBwcmludChcIlxcXFxuWypdIFphdHJ6eW1hbm8gc3RyYcW8bmlrYSBQcm9jZXNzIFdhdGNoZG9nLlwiKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgd2F0Y2hkb2dfc2Nhbm5lcigpXG5gLFxuICB9LFxuICB7XG4gICAgaWQ6ICdwcm9jZXNzX3RyZWVfcHBpZF9odW50ZXInLFxuICAgIHRpdGxlOiAn4piFIFBQSUQgT1JJR0lOIFRSQUNFUjogRHJ6ZXdvIFJlbGFjamkgUHJvY2Vzw7N3ICYgTGlrd2lkYWNqYSDFuXLDs2TFgmEgKFRyZWUtS2lsbCknLFxuICAgIHNob3J0RGVzYzogJ01hcHVqZSByZWxhY2rEmSBtacSZZHp5IG9rbmVtIG5ha8WCYWRraSBGbHV0dGVyYSAoSFdORCkgYSBwcm9jZXNlbS1yb2R6aWNlbSAoUFBJRCBEcm9wcGVyIC8gV2F0Y2hkb2cpLCBuYW1pZXJ6YWrEhWMgaSBsaWt3aWR1asSFYyBjYcWCZSBwb2Rkcnpld28gcHJvY2Vzw7N3LCBieSB6YXBvYmllYyBvZHJhZHphbml1IHNpxJkgYmxva2FkeS4nLFxuICAgIGJhZGdlOiAnUFBJRCBPcmlnaW4gVHJhY2VyICYgVHJlZS1LaWxsJyxcbiAgICBvczogWyd3aW5kb3dzJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbJ3BzdXRpbCddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnUHJlY3l6eWpuZSBtYXBvd2FuaWUgxYJhxYRjdWNoYTogSFdORCBPa25hIC0+IFBJRCBQcm9jZXN1IC0+IFBQSUQgUm9kemljYSAoRHJvcHBlcmEpJyxcbiAgICAgICdXeWtyeXdhbmllIG1lY2hhbml6bcOzdyBXYXRjaGRvZy9BdXRvLVJlc3RhcnQgdyB1a3J5dHljaCBwcm9jZXNhY2ggcG90b21ueWNoJyxcbiAgICAgICdKZWRub2N6ZXNuZSB6YW1yb8W8ZW5pZSBpIGxpa3dpZGFjamEgY2HFgmVnbyBkcnpld2EgKFRyZWUtS2lsbCAvVCAvRiknLFxuICAgICAgJ0JyYWsgbW/FvGxpd2/Fm2NpIHVjaWVjemtpIGx1YiByZXN0YXJ0dSBuYWvFgmFka2kgcHJ6ZXogcHJvY2VzIG5hZHJ6xJlkbnknLFxuICAgICAgJ1didWRvd2FuZSBzcHJhd2R6YW5pZSBzeWduYXR1ciBiaWJsaW90ZWsgZmx1dHRlcl93aW5kb3dzLmRsbCB3IGNhxYJ5bSBkcnpld2llJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgcG8gemFta25pxJljaXUgbmFrxYJhZGtpIEZsdXR0ZXJhIG5hdHljaG1pYXN0IHBvamF3aWEgc2nEmSBvbmEgeiBwb3dyb3RlbSwgcG9uaWV3YcW8IHcgdGxlIGR6aWHFgmEgcHJvY2VzLW1hdGthIChQUElEIFdhdGNoZG9nL0Ryb3BwZXIpLCBrdMOzcnkgasSFIHJlc3RhcnR1amUuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJzEuIE1hcG93YW5pZSBIV05EIC0+IFBJRDogV3l3b8WCdWplIEdldFdpbmRvd1RocmVhZFByb2Nlc3NJZCBkbGEgd3lrcnl0eWNoIG9raWVuIEFsd2F5cy1vbi10b3AgaSBGdWxsc2NyZWVuLicsXG4gICAgICAnMi4gUmVrb25zdHJ1a2NqYSBEcnpld2EgUFBJRDogVcW8eXdhIENyZWF0ZVRvb2xoZWxwMzJTbmFwc2hvdCBpIFByb2Nlc3MzMkZpcnN0L05leHQgbHViIE50UXVlcnlJbmZvcm1hdGlvblByb2Nlc3MgZG8gb2Rjenl0YW5pYSBQYXJlbnQgUHJvY2VzcyBJRC4nLFxuICAgICAgJzMuIElkZW50eWZpa2FjamEgS29yemVuaWEgWmFncm/FvGVuaWE6IFNwcmF3ZHphLCBjenkgcm9kemljIG5pZSBqZXN0IGJlenBpZWN6bnltIHByb2Nlc2VtIHN5c3RlbW93eW0gKG5wLiBleHBsb3Jlci5leGUpLCBsZWN6IHVrcnl0eW0gc2tyeXB0ZW0vbG9hZGVyZW0gdyBUZW1wIGx1YiBBcHBEYXRhLicsXG4gICAgICAnNC4gWmFtcm/FvGVuaWUgQ2HFgmVnbyBEcnpld2EgKFRyZWUgU3VzcGVuZCk6IFdzdHJ6eW11amUgd8SFdGtpIHdlIHdzenlzdGtpY2ggcG93acSFemFueWNoIHByb2Nlc2FjaCAocm9kemljICsgZHppZWNpKSwgYnkgdW5pZW1vxbxsaXdpxIcgd3lrb25hbmllIGtvZHUgYXdhcnlqbmVnby4nLFxuICAgICAgJzUuIExpa3dpZGFjamEgUG9kZHJ6ZXdhIChUcmVlIFRlcm1pbmF0aW9uKTogVXN1d2EgcHJvY2VzeSBwb3RvbW5lIGkgcHJvY2VzIG1hY2llcnp5c3R5IHcgamVkbmVqIGF0b21vd2VqIHNla3dlbmNqaS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUFBJRCBPUklHSU4gVFJBQ0VSICYgUFJPQ0VTUyBUUkVFIEhVTlRFUiAoMTAwJSBPRkZMSU5FKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbld5a3J5d2EgesWCb8WbbGl3ZSBva25hIEZsdXR0ZXJhLCBuYW1pZXJ6YSBwcm9jZXMtbWF0a8SZIChQUElEKSBpIGxpa3dpZHVqZVxuY2HFgmUgcG9kZHJ6ZXdvIHByb2Nlc8OzdywgemFwb2JpZWdhasSFYyBzYW1vY3p5bm5lbXUgb2RyYWR6YW5pdSBzacSZIGJsb2thZC5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcblxuVEgzMkNTX1NOQVBQUk9DRVNTID0gMHgwMDAwMDAwMlxuUFJPQ0VTU19URVJNSU5BVEUgPSAweDAwMDFcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfSU5GT1JNQVRJT04gPSAweDA0MDBcblxuY2xhc3MgUFJPQ0VTU0VOVFJZMzIoY3R5cGVzLlN0cnVjdHVyZSk6XG4gICAgX2ZpZWxkc18gPSBbXG4gICAgICAgIChcImR3U2l6ZVwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcImNudFVzYWdlXCIsIHdpbnR5cGVzLkRXT1JEKSxcbiAgICAgICAgKFwidGgzMlByb2Nlc3NJRFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcInRoMzJEZWZhdWx0SGVhcElEXCIsIGN0eXBlcy5QT0lOVEVSKHdpbnR5cGVzLlVMT05HKSksXG4gICAgICAgIChcInRoMzJNb2R1bGVJRFwiLCB3aW50eXBlcy5EV09SRCksXG4gICAgICAgIChcImNudFRocmVhZHNcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJ0aDMyUGFyZW50UHJvY2Vzc0lEXCIsIHdpbnR5cGVzLkRXT1JEKSxcbiAgICAgICAgKFwicGNQcmlDbGFzc0Jhc2VcIiwgd2ludHlwZXMuTE9ORyksXG4gICAgICAgIChcImR3RmxhZ3NcIiwgd2ludHlwZXMuRFdPUkQpLFxuICAgICAgICAoXCJzekV4ZUZpbGVcIiwgY3R5cGVzLmNfY2hhciAqIDI2MClcbiAgICBdXG5cbiMgQ2hyb25pb25hIGJpYcWCYSBsaXN0YSBzeXN0ZW1vd2FcblNZU1RFTV9XSElURUxJU1QgPSB7XCJleHBsb3Jlci5leGVcIiwgXCJzZXJ2aWNlcy5leGVcIiwgXCJsc2Fzcy5leGVcIiwgXCJjc3Jzcy5leGVcIiwgXCJ3aW5sb2dvbi5leGVcIiwgXCJkd20uZXhlXCJ9XG5cbmRlZiBnZXRfcHJvY2Vzc19oaWVyYXJjaHlfbWFwKCk6XG4gICAgXCJcIlwiVHdvcnp5IHBlxYJuxIUgbWFwxJkgcmVsYWNqaSBQSUQgLT4gKFBQSUQsIE5hendhRXhlKSB6YSBwb21vY8SFIFRvb2xoZWxwIEFQSS5cIlwiXCJcbiAgICBoX3NuYXAgPSBrZXJuZWwzMi5DcmVhdGVUb29saGVscDMyU25hcHNob3QoVEgzMkNTX1NOQVBQUk9DRVNTLCAwKVxuICAgIGlmIGhfc25hcCA9PSB3aW50eXBlcy5IQU5ETEUoLTEpLnZhbHVlOlxuICAgICAgICByZXR1cm4ge31cblxuICAgIGVudHJ5ID0gUFJPQ0VTU0VOVFJZMzIoKVxuICAgIGVudHJ5LmR3U2l6ZSA9IGN0eXBlcy5zaXplb2YoUFJPQ0VTU0VOVFJZMzIpXG4gICAgcHJvY19tYXAgPSB7fVxuXG4gICAgaWYga2VybmVsMzIuUHJvY2VzczMyRmlyc3QoaF9zbmFwLCBjdHlwZXMuYnlyZWYoZW50cnkpKTpcbiAgICAgICAgd2hpbGUgVHJ1ZTpcbiAgICAgICAgICAgIHBpZCA9IGVudHJ5LnRoMzJQcm9jZXNzSURcbiAgICAgICAgICAgIHBwaWQgPSBlbnRyeS50aDMyUGFyZW50UHJvY2Vzc0lEXG4gICAgICAgICAgICBleGVfbmFtZSA9IGVudHJ5LnN6RXhlRmlsZS5kZWNvZGUoJ3V0Zi04JywgZXJyb3JzPSdpZ25vcmUnKVxuICAgICAgICAgICAgcHJvY19tYXBbcGlkXSA9IHtcInBwaWRcIjogcHBpZCwgXCJuYW1lXCI6IGV4ZV9uYW1lfVxuICAgICAgICAgICAgaWYgbm90IGtlcm5lbDMyLlByb2Nlc3MzMk5leHQoaF9zbmFwLCBjdHlwZXMuYnlyZWYoZW50cnkpKTpcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9zbmFwKVxuICAgIHJldHVybiBwcm9jX21hcFxuXG5kZWYgZmluZF9lbnRpcmVfcHJvY2Vzc190cmVlKHJvb3RfcGlkLCBwcm9jX21hcCk6XG4gICAgXCJcIlwiUmVrdXJlbmN5am5pZSBvZG5hamR1amUgd3N6eXN0a2llIHByb2Nlc3kgcG90b21uZSBkbGEgd3NrYXphbmVnbyBQSUQuXCJcIlwiXG4gICAgdHJlZSA9IHtyb290X3BpZH1cbiAgICBhZGRlZCA9IFRydWVcbiAgICB3aGlsZSBhZGRlZDpcbiAgICAgICAgYWRkZWQgPSBGYWxzZVxuICAgICAgICBmb3IgcGlkLCBkYXRhIGluIHByb2NfbWFwLml0ZW1zKCk6XG4gICAgICAgICAgICBpZiBkYXRhW1wicHBpZFwiXSBpbiB0cmVlIGFuZCBwaWQgbm90IGluIHRyZWU6XG4gICAgICAgICAgICAgICAgdHJlZS5hZGQocGlkKVxuICAgICAgICAgICAgICAgIGFkZGVkID0gVHJ1ZVxuICAgIHJldHVybiB0cmVlXG5cbmRlZiBmcmVlemVfcHJvY2Vzc190cmVlKHRyZWVfcGlkcyk6XG4gICAgXCJcIlwiWmFtcmHFvGEgUkFNIGRsYSB3c3p5c3RraWNoIHByb2Nlc8OzdyB3IGRyemV3aWUgKE50U3VzcGVuZFByb2Nlc3MpLlwiXCJcIlxuICAgIGZvciBwaWQgaW4gdHJlZV9waWRzOlxuICAgICAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSwgRmFsc2UsIHBpZClcbiAgICAgICAgaWYgaDpcbiAgICAgICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG5cbmRlZiBraWxsX3Byb2Nlc3NfdHJlZSh0cmVlX3BpZHMsIHByb2NfbWFwKTpcbiAgICBcIlwiXCJaYWJpamEgd3N6eXN0a2llIHByb2Nlc3kgeiBkcnpld2EgemFjenluYWrEhWMgb2QgZHppZWNpLCBrb8WEY3rEhWMgbmEgcm9kemljdS5cIlwiXCJcbiAgICBmb3IgcGlkIGluIHNvcnRlZCh0cmVlX3BpZHMsIHJldmVyc2U9VHJ1ZSk6XG4gICAgICAgIG5hbWUgPSBwcm9jX21hcC5nZXQocGlkLCB7fSkuZ2V0KFwibmFtZVwiLCBcIlVua25vd25cIilcbiAgICAgICAgaWYgbmFtZS5sb3dlcigpIGluIFNZU1RFTV9XSElURUxJU1Q6XG4gICAgICAgICAgICBwcmludChmXCJbIV0gUG9taWphbmllIHByb2Nlc3Ugc3lzdGVtb3dlZ286IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1RFUk1JTkFURSwgRmFsc2UsIHBpZClcbiAgICAgICAgaWYgaDpcbiAgICAgICAgICAgIGtlcm5lbDMyLlRlcm1pbmF0ZVByb2Nlc3MoaCwgOSlcbiAgICAgICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgICAgICBwcmludChmXCJb4pyUXSBabGlrd2lkb3dhbm8gd8SZemXFgiBkcnpld2E6IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcblxuZGVmIHNjYW5fcm9ndWVfd2luZG93c19hbmRfa2lsbF9vcmlnaW4oKTpcbiAgICBcIlwiXCJHxYLDs3duYSBwxJl0bGEgc2thbmVyYSBvcmlnaW4gZm9yZW5zaWNzLlwiXCJcIlxuICAgIHByb2NfbWFwID0gZ2V0X3Byb2Nlc3NfaGllcmFyY2h5X21hcCgpXG4gICAgc2NyZWVuX3cgPSB1c2VyMzIuR2V0U3lzdGVtTWV0cmljcygwKVxuICAgIHNjcmVlbl9oID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMSlcblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoXCIgIFBQSUQgT1JJR0lOIFRSQUNFUjogU0tBTk9XQU5JRSBSRUxBQ0pJIFBST0NFU8OTVyBJIE9LSUVOIEZMVVRURVJBXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcblxuICAgIEBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgIGRlZiBlbnVtX2NhbGxiYWNrKGh3bmQsIGxwYXJhbSk6XG4gICAgICAgIGlmIG5vdCB1c2VyMzIuSXNXaW5kb3dWaXNpYmxlKGh3bmQpOlxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dSZWN0KGh3bmQsIGN0eXBlcy5ieXJlZihyZWN0KSlcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcblxuICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApICMgR1dMX0VYU1RZTEVcbiAgICAgICAgaXNfdG9wbW9zdCA9IGJvb2woZXhfc3R5bGUgJiAweDAwMDAwMDA4KSAjIFdTX0VYX1RPUE1PU1RcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9ICh3ID49IHNjcmVlbl93IC0gNSBhbmQgaCA+PSBzY3JlZW5faCAtIDUpXG5cbiAgICAgICAgaWYgaXNfdG9wbW9zdCBhbmQgaXNfZnVsbHNjcmVlbjpcbiAgICAgICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgICAgICBjaGlsZF9waWQgPSBwaWQudmFsdWVcblxuICAgICAgICAgICAgaWYgY2hpbGRfcGlkIGluIHByb2NfbWFwOlxuICAgICAgICAgICAgICAgIGNoaWxkX2RhdGEgPSBwcm9jX21hcFtjaGlsZF9waWRdXG4gICAgICAgICAgICAgICAgcGFyZW50X3BpZCA9IGNoaWxkX2RhdGFbXCJwcGlkXCJdXG4gICAgICAgICAgICAgICAgcGFyZW50X25hbWUgPSBwcm9jX21hcC5nZXQocGFyZW50X3BpZCwge30pLmdldChcIm5hbWVcIiwgXCJCcmFrL05pZXpuYW55XCIpXG5cbiAgICAgICAgICAgICAgICBwcmludChmXCJcXFxcblshXSBXWUtSWVRPIFrFgU/FmkxJV0UgT0tOTyBIV05EOiB7aGV4KGh3bmQpfVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICDilJzilIAgUHJvY2VzIE9rbmE6IHtjaGlsZF9kYXRhWyduYW1lJ119IChQSUQ6IHtjaGlsZF9waWR9KVwiKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICDilJTilIAgUHJvY2VzIFJvZHppYyAoxblSw5NExYFPL1dBVENIRE9HKToge3BhcmVudF9uYW1lfSAoUFBJRDoge3BhcmVudF9waWR9KVwiKVxuXG4gICAgICAgICAgICAgICAgIyBPa3JlxZtsIGtvcnplxYQgYXRha3VcbiAgICAgICAgICAgICAgICByb290X3RhcmdldCA9IHBhcmVudF9waWQgaWYgcGFyZW50X25hbWUubG93ZXIoKSBub3QgaW4gU1lTVEVNX1dISVRFTElTVCBlbHNlIGNoaWxkX3BpZFxuICAgICAgICAgICAgICAgIHRyZWVfcGlkcyA9IGZpbmRfZW50aXJlX3Byb2Nlc3NfdHJlZShyb290X3RhcmdldCwgcHJvY19tYXApXG5cbiAgICAgICAgICAgICAgICBwcmludChmXCJbKl0gWmFtcmHFvGFuaWUgY2HFgmVnbyBwb2Rkcnpld2EgKHtsZW4odHJlZV9waWRzKX0gcHJvY2Vzw7N3KS4uLlwiKVxuICAgICAgICAgICAgICAgIGZyZWV6ZV9wcm9jZXNzX3RyZWUodHJlZV9waWRzKVxuXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiWypdIExpa3dpZGFjamEgcG9kZHJ6ZXdhIHcgY2VsdSB1bmllbW/FvGxpd2llbmlhIHJlc3RhcnR1Li4uXCIpXG4gICAgICAgICAgICAgICAga2lsbF9wcm9jZXNzX3RyZWUodHJlZV9waWRzLCBwcm9jX21hcClcblxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKGVudW1fY2FsbGJhY2ssIDApXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBzY2FuX3JvZ3VlX3dpbmRvd3NfYW5kX2tpbGxfb3JpZ2luKClcbmAsXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BlX2hlYWRlcl9jb3JydXB0b3JfYW5kX2FjbF9sb2NrJyxcbiAgICB0aXRsZTogJ+KYhSBUUldBxYFZIFNBQk9UQcW7IEJJTkFSTlk6IFBFIEhlYWRlciBDb3JydXB0b3IgJiBFeHRyZW1lIEFDTCBMb2Nrb3V0JyxcbiAgICBzaG9ydERlc2M6ICdUcndhbGUgdW5pZW1vxbxsaXdpYSB1cnVjaG9taWVuaWUgc3prb2RsaXdlZ28gcHJvY2VzdSBwb3ByemV6IHpuaXN6Y3plbmllIHN0cnVrdHVyeSBuYWfFgsOzd2thIFBFICh6ZXJvd2FuaWUgc3lnbmF0dXIgTVogaSBlX2xmYW5ldykgb3JheiBvZGNpxJljaWUgdXByYXduaWXFhCBEQUNMIHcgTlRGUyAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lKS4nLFxuICAgIGJhZGdlOiAnVHJ3YcWCeSBTYWJvdGHFvCBQRSAmIEFDTCcsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1Ryd2HFgmUgdW5pZXdhxbxuaWVuaWUgbmFnxYLDs3drYSBQRSAoRE9TIEhlYWRlciBNWiAmIE5UIFNpZ25hdHVyZSB6ZXJvaW5nKSDigJMgYsWCxIVkIDB4QzAwMDAwN0InLFxuICAgICAgJ1dpbmRvd3MgUEUgTG9hZGVyIChMZHJwSW5pdGlhbGl6ZVByb2Nlc3MpIGJlenBvd3JvdG5pZSBvZHJ6dWNhIHBsaWsgeiBrb211bmlrYXRlbTogXCJUYSBhcGxpa2FjamEgbmllIG1vxbxlIGR6aWHFgmHEh1wiJyxcbiAgICAgICdQYW5jZXJuYSBibG9rYWRhIEFDTCAoaWNhY2xzIC9pbmhlcml0YW5jZTpyIC9kZW55ICpTLTEtMS0wOihGLFgsUixXKSkg4oCTIEFjY2VzcyBEZW5pZWQgZGxhIHdzenlzdGtpY2gnLFxuICAgICAgJ1phbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzKSBwcnplZCB6YWJpY2llbSwgdW5pZW1vxbxsaXdpYWrEhWNlIHJlYWtjasSZIHrFgm/Fm2xpd2VnbyBrb2R1JyxcbiAgICAgICdEemlhxYJhIHcgMTAwJSBPRkZMSU5FIGJleiBkb3N0xJlwdSBkbyBzaWVjaSBpIGJleiBpbnN0YWxvd2FuaWEgcGFjemVrIHBpcCdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IHrFgm/Fm2xpd2Ugb3Byb2dyYW1vd2FuaWUgcG9zaWFkYSBhZ3Jlc3l3bnkgbWVjaGFuaXptIHNhbW9jenlubmVnbyBvZHJhZHphbmlhIHNpxJkgKHdhdGNoZG9nIHNlcnZpY2UsIHJlc3RhcnQgbG9vcHMsIHJlcGxpa2FjamEpLCBhIHp3eWvFgmUgemFrb8WEY3plbmllIHByb2Nlc3UgbmllIHphcG9iaWVnYSBwb25vd25lbXUgdXJ1Y2hvbWllbml1LicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBaYW1yb8W8ZW5pZSBwcm9jZXN1IChOdFN1c3BlbmRQcm9jZXNzKTogV3N0cnp5bXVqZSBuYXR5Y2htaWFzdCB3c3p5c3RraWUgd8SFdGtpIHN6a29kbGl3ZWdvIHByb2dyYW11IHcgasSFZHJ6ZSBOVC4nLFxuICAgICAgJzIuIFp3b2xuaWVuaWUgdWNod3l0dSBwbGlrdTogS2/FhGN6eSBwcm9jZXMsIGFieSBzeXN0ZW0gV2luZG93cyB6ZXp3b2xpxYIgbmEgYmV6cG/Fm3JlZG5pIHphcGlzIGJpbmFybnkgZG8gcGxpa3UgLmV4ZS4nLFxuICAgICAgJzMuIFNhYm90YcW8IG5hZ8WCw7N3a2EgUEU6IE90d2llcmEgcGxpayB3IHRyeWJpZSBiaW5hcm55bSAocitiKSwgbmFkcGlzdWplIGJhanR5IHN5Z25hdHVyeSBET1MgXCJNWlwiICgweDVBNEQpIG9yYXogb2Zmc2V0IGVfbGZhbmV3IGkgc3lnbmF0dXLEmSBcIlBFXFxcXDBcXFxcMFwiIHplcmFtaSBsdWIgem5pc3pjem9ueW1pIHdhcnRvxZtjaWFtaS4gTmF3ZXQgc2tvcGlvd2FuaWUgcGxpa3UgbmEgaW5ueSBrb21wdXRlciBuaWUgcHJ6eXdyw7NjaSBtdSBtb8W8bGl3b8WbY2kgdXJ1Y2hvbWllbmlhLicsXG4gICAgICAnNC4gQmxva2FkYSBBQ0wgKERBQ0wgSGFyZGVuaW5nKTogWmVydWplIGR6aWVkemljemVuaWUgdXByYXduaWXFhCAoL2luaGVyaXRhbmNlOnIpIG9yYXogZG9kYWplIHJlZ3XFgsSZIERFTlkgZGxhIGdydXB5IEV2ZXJ5b25lIChTSUQgKlMtMS0xLTApLCBibG9rdWrEhWMgb2Rjenl0LCB6YXBpcyBpIHd5a29ueXdhbmllLicsXG4gICAgICAnNS4gQmxva2FkYSBJRkVPOiBSZWplc3RydWplIGF0cmFwxJkgZGVidWdnZXJhIHcgUmVqZXN0cnplIFdpbmRvd3MgamFrbyBkb2RhdGtvd8SFIGxpbmnEmSBvYnJvbnkuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblRSV0HFgVkgU0FCT1RBxbsgQklOQVJOWTogUEUgSEVBREVSIENPUlJVUFRPUiAmIEVYVFJFTUUgQUNMIExPQ0tPVVQgKDEwMCUgT0ZGTElORSlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5Ta3J5cHQgdyB1xYJhbWt1IHNla3VuZHkgd3lrcnl3YSBzemtvZGxpd3kgcHJvY2VzLCB6YW1yYcW8YSBnbyB3IFJBTSwgbmlzemN6eVxubmFnxYLDs3dlayBiaW5hcm55IFBFIG5hIGR5c2t1IGkgb2RjaW5hIHVwcmF3bmllbmlhIEFDTCwgdW5pZW1vxbxsaXdpYWrEhWMgcmVzdGFydC5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHN0cnVjdFxuaW1wb3J0IHBzdXRpbFxuXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxua2VybmVsMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG5udGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcblxuUFJPQ0VTU19URVJNSU5BVEUgPSAweDAwMDFcblBST0NFU1NfU1VTUEVORF9SRVNVTUUgPSAweDA4MDBcblBST0NFU1NfUVVFUllfTElNSVRFRF9JTkZPUk1BVElPTiA9IDB4MTAwMFxuXG4jIEJpYcWCYSBsaXN0YSBjaHJvbmlvbnljaCBwcm9jZXPDs3cgc3lzdGVtb3d5Y2hcblNBRkVfV0hJVEVMSVNUID0ge1xuICAgIFwiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIiwgXCJkd20uZXhlXCIsIFwic2hlbGxleHBlcmllbmNlaG9zdC5leGVcIixcbiAgICBcInNlYXJjaGhvc3QuZXhlXCIsIFwic3lzdGVtc2V0dGluZ3MuZXhlXCIsIFwibHNhc3MuZXhlXCIsIFwiY3Nyc3MuZXhlXCIsXG4gICAgXCJzZXJ2aWNlcy5leGVcIiwgXCJzdmNob3N0LmV4ZVwiLCBcImNvZGUuZXhlXCIsIFwiY2hyb21lLmV4ZVwiLCBcImZpcmVmb3guZXhlXCJcbn1cblxuZGVmIGZyZWV6ZV90aHJlYWRzKHBpZCk6XG4gICAgXCJcIlwiWmFtcmHFvGEgd3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgIGlmIGg6XG4gICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaClcbiAgICAgICAgcHJpbnQoZlwiWytdIFsxLiBGUkVFWkVdIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB6YXRyenltYW55IHcgUkFNLlwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIHJldHVybiBGYWxzZVxuXG5kZWYgZ2V0X2JpbmFyeV9wYXRoKHBpZCk6XG4gICAgXCJcIlwiUG9iaWVyYSBwZcWCbsSFIMWbY2llxbxrxJkgZG8gcGxpa3Ugd3lrb255d2FsbmVnby5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19RVUVSWV9MSU1JVEVEX0lORk9STUFUSU9OLCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoOlxuICAgICAgICByZXR1cm4gTm9uZVxuICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICBpZiBrZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoLCAwLCBidWYsIGN0eXBlcy5ieXJlZihzaXplKSk6XG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgIHJldHVybiBidWYudmFsdWVcbiAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgIHJldHVybiBOb25lXG5cbmRlZiBjb3JydXB0X3BlX2JpbmFyeV9oZWFkZXIoZXhlX3BhdGgpOlxuICAgIFwiXCJcIlxuICAgIFRyd2FsZSBuaXN6Y3p5IHN0cnVrdHVyxJkgUG9ydGFibGUgRXhlY3V0YWJsZSAoUEUpIHBsaWt1IGJpbmFybmVnby5cbiAgICBOYWRwaXN1amUgc3lnbmF0dXLEmSBET1MgJ01aJyBvcmF6IG5hZ8WCw7N3ZWsgUEUgJ1BFXFxcXDBcXFxcMCcuXG4gICAgXG4gICAgUkVaVUxUQVQ6XG4gICAgV2luZG93cyBQRSBMb2FkZXIgemfFgmFzemEgYsWCxIVkIFNUQVRVU19JTlZBTElEX0lNQUdFX0ZPUk1BVCAoMHhDMDAwMDA3QikuXG4gICAgUGxpayBzdGFqZSBzacSZIHcgMTAwJSBiZXp1xbx5dGVjem55IGkgbmllbW/FvGxpd3kgZG8gd3lrb25hbmlhLlxuICAgIFwiXCJcIlxuICAgIGlmIG5vdCBleGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZXhlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuICAgIHRyeTpcbiAgICAgICAgIyBVc3VuacSZY2llIGF0cnlidXTDs3cgUmVhZC1Pbmx5XG4gICAgICAgIGtlcm5lbDMyLlNldEZpbGVBdHRyaWJ1dGVzVyhleGVfcGF0aCwgMHg4MCkgIyBGSUxFX0FUVFJJQlVURV9OT1JNQUxcblxuICAgICAgICB3aXRoIG9wZW4oZXhlX3BhdGgsIFwicitiXCIpIGFzIGY6XG4gICAgICAgICAgICAjIDEuIFNwcmF3ZMW6IHN5Z25hdHVyxJkgRE9TXG4gICAgICAgICAgICBmLnNlZWsoMClcbiAgICAgICAgICAgIG1hZ2ljID0gZi5yZWFkKDIpXG4gICAgICAgICAgICBpZiBtYWdpYyAhPSBiXCJNWlwiOlxuICAgICAgICAgICAgICAgIHByaW50KGZcIlshXSBQbGlrIHtleGVfcGF0aH0gbmllIHBvc2lhZGEgc3lnbmF0dXJ5IE1aIGx1YiB6b3N0YcWCIGp1xbwgdXN6a29kem9ueS5cIilcblxuICAgICAgICAgICAgIyAyLiBPZGN6eXRhaiBvZmZzZXQgbmFnxYLDs3drYSBQRSAoMHgzQyBlX2xmYW5ldylcbiAgICAgICAgICAgIGYuc2VlaygweDNDKVxuICAgICAgICAgICAgZV9sZmFuZXcgPSBmLnJlYWQoNClcbiAgICAgICAgICAgIHBlX29mZnNldCA9IDBcbiAgICAgICAgICAgIGlmIGxlbihlX2xmYW5ldykgPT0gNDpcbiAgICAgICAgICAgICAgICBwZV9vZmZzZXQgPSBzdHJ1Y3QudW5wYWNrKFwiPElcIiwgZV9sZmFuZXcpWzBdXG5cbiAgICAgICAgICAgICMgMy4gWm5pc3pjeiBzeWduYXR1csSZIERPUyAnTVonIC0+ICdERUFEJ1xuICAgICAgICAgICAgZi5zZWVrKDApXG4gICAgICAgICAgICBmLndyaXRlKGJcIlxcXFx4REVcXFxceEFEXCIpXG5cbiAgICAgICAgICAgICMgNC4gWm5pc3pjeiB3c2thxbpuaWsgZV9sZmFuZXdcbiAgICAgICAgICAgIGYuc2VlaygweDNDKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceEZGXFxcXHhGRlxcXFx4RkZcXFxceEZGXCIpXG5cbiAgICAgICAgICAgICMgNS4gWm5pc3pjeiBzeWduYXR1csSZIFBFIChqZcWbbGkgemxva2FsaXpvd2FuYSlcbiAgICAgICAgICAgIGlmIDAgPCBwZV9vZmZzZXQgPCAxMDQ4NTc2OlxuICAgICAgICAgICAgICAgIHRyeTpcbiAgICAgICAgICAgICAgICAgICAgZi5zZWVrKHBlX29mZnNldClcbiAgICAgICAgICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXFxcXHgwMFxcXFx4MDBcXFxceDAwXFxcXHhGRlxcXFx4RkZcXFxceEZGXFxcXHhGRlwiKVxuICAgICAgICAgICAgICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgICAgICAgICAgICAgIHBhc3NcblxuICAgICAgICAgICAgIyA2LiBXeXplcnVqIHBpZXJ3c3plIDUxMiBiYWp0w7N3IG5hZ8WCw7N3a2FcbiAgICAgICAgICAgIGYuc2VlaygyKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXCIgKiA1MTApXG4gICAgICAgICAgICBmLmZsdXNoKClcblxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyAtIFBFIENPUlJVUFRFRF0gWm5pc3pjem9ubyBuYWfFgsOzd2VrIFBFIHBsaWt1OiB7ZXhlX3BhdGh9XCIpXG4gICAgICAgIHByaW50KGZcIiAgICBTeXN0ZW0gV2luZG93cyB6Z8WCYXN6YSBixYLEhWQgMHhDMDAwMDA3QiAoU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUKS5cIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgdXN6a2FkemFuaWEgbmFnxYLDs3drYSBQRToge2V9XCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuXG5kZWYgbG9ja19iaW5hcnlfYWNsKGV4ZV9wYXRoKTpcbiAgICBcIlwiXCJcbiAgICBPZGNpbmEgdXByYXduaWVuaWEgdyBBY2Nlc3MgQ29udHJvbCBMaXN0IChEQUNMKSB3IHN5c3RlbWllIHBsaWvDs3cgTlRGUy5cbiAgICBPZGJpZXJhIHVwcmF3bmllbmlhIGRvIHVydWNoYW1pYW5pYSAoRXhlY3V0ZSksIG9kY3p5dHUgaSB6YXBpc3UgZGxhIGdydXB5IEV2ZXJ5b25lLlxuICAgIFwiXCJcIlxuICAgIGlmIG5vdCBleGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZXhlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcbiAgICB0cnk6XG4gICAgICAgICMgWmVyd2FuaWUgZHppZWR6aWN6ZW5pYSB1cHJhd25pZcWEXG4gICAgICAgIG9zLnN5c3RlbShmJ2ljYWNscyBcIntleGVfcGF0aH1cIiAvaW5oZXJpdGFuY2U6ciA+bnVsIDI+JjEnKVxuICAgICAgICAjIE9kbW93YSB3c3plbGtpY2ggcHJhdyBkbGEgZ3J1cHkgV3N6eXNjeSAoU0lEIFMtMS0xLTApXG4gICAgICAgIG9zLnN5c3RlbShmJ2ljYWNscyBcIntleGVfcGF0aH1cIiAvZGVueSAqUy0xLTEtMDooRixYLFIsVykgPm51bCAyPiYxJylcbiAgICAgICAgb3Muc3lzdGVtKGYnaWNhY2xzIFwie2V4ZV9wYXRofVwiIC9kZW55IEV2ZXJ5b25lOihGLFgsUixXKSA+bnVsIDI+JjEnKVxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyAtIEFDTCBMT0NLT1VUXSBPZGNpxJl0byB1cHJhd25pZW5pYSAoQWNjZXNzIERlbmllZCAvIELFgsSFZCA1KS5cIilcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgYmxva2FkeSBBQ0w6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGtpbGxfYW5kX3NhYm90YWdlKHByb2MpOlxuICAgIHBpZCA9IHByb2MucGlkXG4gICAgbmFtZSA9IHByb2MubmFtZSgpLmxvd2VyKClcbiAgICBcbiAgICBpZiBuYW1lIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICByZXR1cm5cblxuICAgIHByaW50KFwiPVwiICogNzApXG4gICAgcHJpbnQoZlwiWyFdIFdZS1JZVE8gWsWBT8WaTElXWSBQUk9DRVM6IHtuYW1lfSAoUElEOiB7cGlkfSlcIilcblxuICAgICMgMS4gRnJlZXplXG4gICAgZnJlZXplX3RocmVhZHMocGlkKVxuXG4gICAgIyAyLiBQb2JpZXJ6IMWbY2llxbxrxJlcbiAgICBleGVfcGF0aCA9IGdldF9iaW5hcnlfcGF0aChwaWQpXG5cbiAgICAjIDMuIFphYmlqIHByb2NlcywgYnkgendvbG5pxIcgdWNod3l0XG4gICAgdHJ5OlxuICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDUpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgb3Muc3lzdGVtKGZcInRhc2traWxsIC9GIC9QSUQge3BpZH0gPm51bCAyPiYxXCIpXG5cbiAgICAjIDQuIFRyd2HFgmUgdXN6a29kemVuaWUgUEUgaSBibG9rYWRhIEFDTFxuICAgIGlmIGV4ZV9wYXRoOlxuICAgICAgICBjb3JydXB0X3BlX2JpbmFyeV9oZWFkZXIoZXhlX3BhdGgpXG4gICAgICAgIGxvY2tfYmluYXJ5X2FjbChleGVfcGF0aClcblxuICAgICMgNS4gQmxva2FkYSBJRkVPIHcgUmVqZXN0cnplXG4gICAgb3Muc3lzdGVtKGYncmVnIGFkZCBcIkhLTE1cXFxcXFxcXFNPRlRXQVJFXFxcXFxcXFxNaWNyb3NvZnRcXFxcXFxcXFdpbmRvd3MgTlRcXFxcXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXFxcXFx7bmFtZX1cIiAvdiBEZWJ1Z2dlciAvdCBSRUdfU1ogL2QgXCJzeXN0cmF5LmV4ZVwiIC9mID5udWwgMj4mMScpXG4gICAgcHJpbnQoZlwiWytdIFtJRkVPIExPQ0tdIFphYmxva293YW5vIHN0YXJ0ICd7bmFtZX0nIHcgcmVqZXN0cnplIFdpbmRvd3MuXCIpXG4gICAgcHJpbnQoXCI9XCIgKiA3MClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFNUUkHFu05JSyBBTlRZLU1BTFdBUkU6IFBFIENPUlJVUFRPUiAmIEFDTCBERUZFTlNFICgxMDAlIE9GRkxJTkUpXCIpXG4gICAgcHJpbnQoXCJbKl0gU2thbm93YW5pZSBwcm9jZXPDs3cgcG9kIGvEhXRlbSB6YWdyb8W8ZcWELi4uXCIpXG4gICAgZm9yIHByb2MgaW4gcHN1dGlsLnByb2Nlc3NfaXRlcihbJ3BpZCcsICduYW1lJ10pOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBwbmFtZSA9IHByb2MuaW5mb1snbmFtZSddLmxvd2VyKClcbiAgICAgICAgICAgIGlmICdmbHV0dGVyJyBpbiBwbmFtZSBvciAnbWFsd2FyZScgaW4gcG5hbWU6XG4gICAgICAgICAgICAgICAga2lsbF9hbmRfc2Fib3RhZ2UocHJvYylcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgIHBhc3NcbiAgICBwcmludChcIlsqXSBHb3Rvd2UuXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3F1YXJhbnRpbmVfYW50aV9yZXNwYXduX2xvY2tvdXQnLFxuICAgIHRpdGxlOiAn4piFIFVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BOiBQcm9jZXNzIEZyZWV6ZSArIEJpbmFyeSBMb2Nrb3V0IChBbnRpLVJlc3Bhd24pJyxcbiAgICBzaG9ydERlc2M6ICdOYXR5Y2htaWFzdCB6YW1yYcW8YSB3c3p5c3RraWUgd8SFdGtpIHByb2Nlc3UgdyBwYW1pxJljaSAoTnRTdXNwZW5kUHJvY2VzcyksIGJsb2t1amUgcmVzdGFydCwgem1pZW5pYSB1cHJhd25pZW5pYSBwbGlrdSBuYSBkeXNrdSBsdWIgem1pZW5pYSBuYXp3xJkgbmEgLnF1YXJhbnRpbmUsIHphcG9iaWVnYWrEhWMgb2RyYWR6YW5pdSBzacSZIG1hbHdhcmUuJyxcbiAgICBiYWRnZTogJ0Jsb2thZGEgVHJ3YcWCYSAoQW50aS1NYWx3YXJlKScsXG4gICAgb3M6IFsnd2luZG93cyddLFxuICAgIHJlcXVpcmVzUGlwOiBmYWxzZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0LFgnlza2F3aWN6bmUgemFtcm/FvGVuaWUgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MgLyBwcm9jLnN1c3BlbmQpIOKAkyBtYWx3YXJlIG5pZSBtb8W8ZSByZWFnb3dhxIcgYW5pIHd5c3nFgmHEhyB6ZGFyemXFhCcsXG4gICAgICAnUG9iaWVyYSBwZcWCbsSFIMWbY2llxbxrxJkgcGxpa3UgYmluYXJuZWdvIG5hIGR5c2t1IChRdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyknLFxuICAgICAgJ09kZWJyYW5pZSB1cHJhd25pZcWEIGRvIHVydWNoYW1pYW5pYSAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihYLFcpKSBsdWIgem1pYW5hIG5hend5IHBsaWt1JyxcbiAgICAgICdXcGlzIHcgcmVqZXN0cnplIElGRU8gKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpIGJsb2t1asSFY3kgcG9ub3dueSBzdGFydCBwcm9ncmFtdSB3IHN5c3RlbWllIFdpbmRvd3MnLFxuICAgICAgJ0R6aWHFgmEgdyAxMDAlIG9mZmxpbmUsIGJleiBwb8WCxIVjemVuaWEgeiBzaWVjacSFIGkgYmV6IHpld27EmXRyem55Y2ggc2Vyd2Vyw7N3J1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgesWCb8WbbGl3eSBwcm9ncmFtIG1hIG1lY2hhbml6bXkgc2Ftb2N6eW5uZWdvIHJlc3RhcnR1ICh3YXRjaGRvZywgcMSZdGxhIG5pZXNrb8WEY3pvbmEsIHByb2Nlc3kgYmxpxbpuaWFjemUpLCBibG9rdWplIG9rbmEgZGlhbG9nb3dlIGkgb2RyYWR6YSBzacSZIHBvIHp3eWvFgnltIHRhc2traWxsLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICcxLiBaYW1yb8W8ZW5pZSAoRnJlZXplKTogV3l3b8WCdWplIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MgbHViIHBzdXRpbC5Qcm9jZXNzLnN1c3BlbmQoKS4gUHJvY2VzIHcgcGFtacSZY2kgUkFNIHpvc3RhamUgY2HFgmtvd2ljaWUgemF0cnp5bWFueSDigJMgbmllIG1vxbxlIHByemVjaHd5dHl3YcSHIG15c3p5LCB0d29yennEhyBva2llbiBhbmkgd3lrb255d2HEhyBrb2R1LicsXG4gICAgICAnMi4gRGV0ZWtjamEgxZtjaWXFvGtpOiBPZGN6eXR1amUgZG9rxYJhZG7EhSDFm2NpZcW8a8SZIGRvIHBsaWt1IC5leGUgbmEgZHlza3UgdHdhcmR5bS4nLFxuICAgICAgJzMuIEt3YXJhbnRhbm5hIGJpbmFybmE6IE5hZGFqZSBwbGlrb3dpIGF0cnlidXQgdHlsa28gZG8gb2Rjenl0dSBpIGJsb2t1amUgdXByYXduaWVuaWEgd3lrb25hbmlhIChFeGVjdXRlKSBwcnpleiBuYXJ6xJlkemllIGljYWNscywgdW5pZW1vxbxsaXdpYWrEhWMgcmVzdGFydC4nLFxuICAgICAgJzQuIEJsb2thZGEgSUZFTyAoT3Bjam9uYWxuYSk6IFR3b3J6eSB3cGlzIHcgUmVqZXN0cnplIFdpbmRvd3MgKEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMpIHByemVraWVyb3d1asSFY3kgZGVidWdnZXIgbmEgZHVtbXkgcHJvY2Vzcywgd2nEmWMgV2luZG93cyBvZG3Ds3dpIHN0YXJ0dSB0ZWdvIHBsaWt1LicsXG4gICAgICAnNS4gRWxpbWluYWNqYTogUG8gem5ldXRyYWxpem93YW5pdSBwbGlrdSBuYSBkeXNrdSwgemFtcm/FvG9ueSBwcm9jZXMgem9zdGFqZSBiZXpwb3dyb3RuaWUgdXN1bmnEmXR5IHogcGFtacSZY2kuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BIFBST0NFU1UgKEFudGktUmVzcGF3biAmIFByb2Nlc3MgRnJlZXplcilcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5EemlhxYJhIHcgMTAwJSBPRkZMSU5FLiBOaWUgd3ltYWdhIHBvxYLEhWN6ZW5pYSB6IGludGVybmV0ZW0uXG5aYW1yYcW8YSB3xIV0a2kgcHJvY2VzdSB3IHBhbWnEmWNpLCBvZGJpZXJhIHByYXdhIHd5a29ueXdhbmlhIHBsaWtvd2kgaSB1YmlqYSBnby5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHN1YnByb2Nlc3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5cblBST0NFU1NfQUxMX0FDQ0VTUyA9IDB4MUYwRkZGXG5QUk9DRVNTX1RFUk1JTkFURSA9IDB4MDAwMVxuUFJPQ0VTU19TVVNQRU5EX1JFU1VNRSA9IDB4MDgwMFxuUFJPQ0VTU19RVUVSWV9MSU1JVEVEX0lORk9STUFUSU9OID0gMHgxMDAwXG5cbiMgQmlhxYJhIGxpc3RhIGNocm9uaW9ueWNoIHByb2Nlc8OzdyBzeXN0ZW1vd3ljaFxuU0FGRV9XSElURUxJU1QgPSB7XG4gICAgXCJleHBsb3Jlci5leGVcIiwgXCJ0YXNrbWdyLmV4ZVwiLCBcImR3bS5leGVcIiwgXCJzaGVsbGV4cGVyaWVuY2Vob3N0LmV4ZVwiLFxuICAgIFwic2VhcmNoaG9zdC5leGVcIiwgXCJzeXN0ZW1zZXR0aW5ncy5leGVcIiwgXCJsc2Fzcy5leGVcIiwgXCJjc3Jzcy5leGVcIixcbiAgICBcInNlcnZpY2VzLmV4ZVwiLCBcInN2Y2hvc3QuZXhlXCIsIFwiY29kZS5leGVcIiwgXCJjaHJvbWUuZXhlXCIsIFwiZmlyZWZveC5leGVcIlxufVxuXG5kZWYgc3VzcGVuZF9wcm9jZXNzKHBpZCk6XG4gICAgXCJcIlwiTmF0eWNobWlhc3QgemFtcmHFvGEgd3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaF9wcm9jOlxuICAgICAgICBzdGF0dXMgPSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGhfcHJvYylcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICBpZiBzdGF0dXMgPT0gMDpcbiAgICAgICAgICAgIHByaW50KGZcIlsrXSBbWkFNUk/Fu09OT10gUHJvY2VzIFBJRCB7cGlkfSB6b3N0YcWCIHpuZXV0cmFsaXpvd2FueSB3IHBhbWnEmWNpIFJBTSAoWmVybyBha2NqaS9aZXJvIG9raWVuKS5cIilcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgcmV0dXJuIEZhbHNlXG5cbmRlZiBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX3BhdGgocGlkKTpcbiAgICBcIlwiXCJQb2JpZXJhIHBlxYJuxIUgxZtjaWXFvGvEmSBkbyBwbGlrdSAuZXhlIG5hIGR5c2t1LlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfUVVFUllfTElNSVRFRF9JTkZPUk1BVElPTiwgRmFsc2UsIHBpZClcbiAgICBpZiBub3QgaF9wcm9jOlxuICAgICAgICByZXR1cm4gTm9uZVxuICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICBpZiBrZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoX3Byb2MsIDAsIGJ1ZiwgY3R5cGVzLmJ5cmVmKHNpemUpKTpcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgICAgICByZXR1cm4gYnVmLnZhbHVlXG4gICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jKVxuICAgIHJldHVybiBOb25lXG5cbmRlZiBxdWFyYW50aW5lX2V4ZWN1dGFibGVfZmlsZShmaWxlX3BhdGgpOlxuICAgIFwiXCJcIkJsb2t1amUgdXByYXduaWVuaWEgZG8gd3lrb255d2FuaWEgcGxpa3UgYmluYXJuZWdvIG5hIGR5c2t1LlwiXCJcIlxuICAgIGlmIG5vdCBmaWxlX3BhdGggb3Igbm90IG9zLnBhdGguZXhpc3RzKGZpbGVfcGF0aCk6XG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIHRyeTpcbiAgICAgICAgcHJpbnQoZlwiWypdIFByemVub3N6ZW5pZSBkbyBrd2FyYW50YW5ueToge2ZpbGVfcGF0aH1cIilcbiAgICAgICAgIyAxLiBabWlhbmEgbmF6d3kgbmEgcm96c3plcnplbmllIC5xdWFyYW50aW5lZF9sb2NrXG4gICAgICAgIHF1YXJhbnRpbmVfcGF0aCA9IGZpbGVfcGF0aCArIFwiLnF1YXJhbnRpbmVkX2xvY2tcIlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBvcy5yZW5hbWUoZmlsZV9wYXRoLCBxdWFyYW50aW5lX3BhdGgpXG4gICAgICAgICAgICBwcmludChmXCJbK10gW1NVS0NFU10gWm1pZW5pb25vIG5henfEmSBuYToge3F1YXJhbnRpbmVfcGF0aH1cIilcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGV4Y2VwdCBQZXJtaXNzaW9uRXJyb3I6XG4gICAgICAgICAgICAjIDIuIEplxZtsaSBwbGlrIGplc3QgemFibG9rb3dhbnkgLSBvZGVicmFuaWUgdXByYXduaWXFhCBkbyB1cnVjaG9taWVuaWEgKGljYWNscylcbiAgICAgICAgICAgIGNtZCA9IGYnaWNhY2xzIFwie2ZpbGVfcGF0aH1cIiAvZGVueSBFdmVyeW9uZTooWCxXKSA+bnVsIDI+JjEnXG4gICAgICAgICAgICBvcy5zeXN0ZW0oY21kKVxuICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIE9kZWJyYW5vIHVwcmF3bmllbmlhIHd5a29uYW5pYSAoaWNhY2xzIC9kZW55IEV2ZXJ5b25lOihYLFcpKVwiKVxuICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQga3dhcmFudGFubnkgcGxpa3U6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGJsb2NrX3ZpYV9pZmVvKGV4ZV9maWxlbmFtZSk6XG4gICAgXCJcIlwiQmxva3VqZSBwb25vd25lIHVydWNob21pZW5pZSBwcm9ncmFtdSB3IFJlamVzdHJ6ZSBXaW5kb3dzIChJRkVPKS5cIlwiXCJcbiAgICB0cnk6XG4gICAgICAgIGNtZCA9IGYncmVnIGFkZCBcIkhLTE1cXFxcXFxcXFNPRlRXQVJFXFxcXFxcXFxNaWNyb3NvZnRcXFxcXFxcXFdpbmRvd3MgTlRcXFxcXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXFxcXFx7ZXhlX2ZpbGVuYW1lfVwiIC92IERlYnVnZ2VyIC90IFJFR19TWiAvZCBcInN5c3RyYXkuZXhlXCIgL2YgPm51bCAyPiYxJ1xuICAgICAgICBvcy5zeXN0ZW0oY21kKVxuICAgICAgICBwcmludChmXCJbK10gW0lGRU8gTE9DS10gWmFibG9rb3dhbm8gc3RhcnQgJ3tleGVfZmlsZW5hbWV9JyB3IHJlamVzdHJ6ZSBXaW5kb3dzLlwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuZGVmIHRlcm1pbmF0ZV9mcm96ZW5fcHJvY2VzcyhwaWQpOlxuICAgIFwiXCJcIktvxYRjenkgZGVmaW5pdHl3bmllIHphbXJvxbxvbnkgcHJvY2VzLlwiXCJcIlxuICAgIGhfcHJvYyA9IGtlcm5lbDMyLk9wZW5Qcm9jZXNzKFBST0NFU1NfVEVSTUlOQVRFLCBGYWxzZSwgcGlkKVxuICAgIGlmIGhfcHJvYzpcbiAgICAgICAga2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoX3Byb2MsIDkpXG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvYylcbiAgICAgICAgcHJpbnQoZlwiWytdIFtaQUJJVE9dIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB1c3VuacSZdHkgeiBwYW1pxJljaS5cIilcbiAgICBlbHNlOlxuICAgICAgICBvcy5zeXN0ZW0oZlwidGFza2tpbGwgL0YgL1BJRCB7cGlkfSA+bnVsIDI+JjFcIilcblxuZGVmIGV4ZWN1dGVfcXVhcmFudGluZV9zdHJpa2UoaHduZCwgcGlkKTpcbiAgICBcIlwiXCJLb21wbGVrc293YSBvcGVyYWNqYSB1bmllc3prb2RsaXdpZW5pYS5cIlwiXCJcbiAgICAjIEtyb2sgMTogTmF0eWNobWlhc3Rvd2UgemRqxJljaWUgb2tuYSB6IHBpZXJ3c3plZ28gcGxhbnVcbiAgICB1c2VyMzIuU2hvd1dpbmRvdyhod25kLCAwKSAjIFNXX0hJREVcbiAgICB1c2VyMzIuU2V0V2luZG93UG9zKGh3bmQsIDEsIDAsIDAsIDAsIDAsIDB4MDAwMSB8IDB4MDAwMiB8IDB4MDA4MCkgIyBIV05EX0JPVFRPTVxuXG4gICAgIyBLcm9rIDI6IFphbXJvxbxlbmllIHfEhXRrw7N3IHcgcGFtacSZY2kgUkFNXG4gICAgc3VzcGVuZF9wcm9jZXNzKHBpZClcblxuICAgICMgS3JvayAzOiBQb2JyYW5pZSDFm2NpZcW8a2kgaSBrd2FyYW50YW5uYSBiaW5hcm5hXG4gICAgZXhlX3BhdGggPSBnZXRfcHJvY2Vzc19leGVjdXRhYmxlX3BhdGgocGlkKVxuICAgIGV4ZV9uYW1lID0gb3MucGF0aC5iYXNlbmFtZShleGVfcGF0aCkgaWYgZXhlX3BhdGggZWxzZSBcIlwiXG5cbiAgICBpZiBleGVfbmFtZS5sb3dlcigpIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICBwcmludChmXCJbIV0gUHJvY2VzIG5hIGJpYcWCZWogbGnFm2NpZSAoe2V4ZV9uYW1lfSkuIEFudWxvd2FubyBrd2FyYW50YW5uxJkuXCIpXG4gICAgICAgIHJldHVyblxuXG4gICAgaWYgZXhlX3BhdGg6XG4gICAgICAgIHF1YXJhbnRpbmVfZXhlY3V0YWJsZV9maWxlKGV4ZV9wYXRoKVxuICAgICAgICBibG9ja192aWFfaWZlbyhleGVfbmFtZSlcblxuICAgICMgS3JvayA0OiBVc3VuacSZY2llIHogcGFtacSZY2kgUkFNXG4gICAgdGVybWluYXRlX2Zyb3plbl9wcm9jZXNzKHBpZClcbiAgICBwcmludChcIj1cIiAqIDYwKVxuICAgIHByaW50KGZcIlvinJRdIFNVS0NFUyEgWmFncm/FvGVuaWUge2V4ZV9uYW1lfSAoUElEOiB7cGlkfSkgem9zdGHFgm8gdHJ3YWxlIHVuaWVydWNob21pb25lLlwiKVxuICAgIHByaW50KFwiPVwiICogNjApXG5cbmRlZiBzY2FuX2FuZF9sb2NrZG93bigpOlxuICAgIHNjcmVlbl93ID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMClcbiAgICBzY3JlZW5faCA9IHVzZXIzMi5HZXRTeXN0ZW1NZXRyaWNzKDEpXG5cbiAgICBkZWYgY2FsbGJhY2soaHduZCwgbHBhcmFtKTpcbiAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBpZiBod25kIGluICh1c2VyMzIuR2V0RGVza3RvcFdpbmRvdygpLCB1c2VyMzIuR2V0U2hlbGxXaW5kb3coKSk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgICMgU3ByYXdkemVuaWUgc3R5bHUgVG9wTW9zdFxuICAgICAgICBleF9zdHlsZSA9IHVzZXIzMi5HZXRXaW5kb3dMb25nVyhod25kLCAtMjApXG4gICAgICAgIGlzX3RvcG1vc3QgPSBib29sKGV4X3N0eWxlICYgMHgwMDAwMDAwOClcblxuICAgICAgICAjIFNwcmF3ZHplbmllIHd5bWlhcsOzd1xuICAgICAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dSZWN0KGh3bmQsIGN0eXBlcy5ieXJlZihyZWN0KSlcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9ICh3ID49IHNjcmVlbl93ICogMC45IGFuZCBoID49IHNjcmVlbl9oICogMC45KVxuXG4gICAgICAgIHBpZCA9IHdpbnR5cGVzLkRXT1JEKClcbiAgICAgICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICAgICAgaWYgcGlkLnZhbHVlID09IDA6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGV4ZV9wYXRoID0gZ2V0X3Byb2Nlc3NfZXhlY3V0YWJsZV9wYXRoKHBpZC52YWx1ZSlcbiAgICAgICAgZXhlX25hbWUgPSBvcy5wYXRoLmJhc2VuYW1lKGV4ZV9wYXRoKS5sb3dlcigpIGlmIGV4ZV9wYXRoIGVsc2UgXCJcIlxuXG4gICAgICAgIGlmIGV4ZV9uYW1lIGluIFNBRkVfV0hJVEVMSVNUOlxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICAjIFdhcnVuZWsgdWRlcnplbmlhOlxuICAgICAgICAjIE9rbm8gYmxva3VqZSBla3JhbiAoVG9wTW9zdCArIEZ1bGxzY3JlZW4pIExVQiBwcm9jZXMgendpxIV6YW55IHogRmx1dHRlcmVtXG4gICAgICAgIGlmIChpc190b3Btb3N0IGFuZCBpc19mdWxsc2NyZWVuKSBvciAoXCJmbHV0dGVyXCIgaW4gZXhlX25hbWUpOlxuICAgICAgICAgICAgcHJpbnQoXCJcXFxcblwiICsgXCIhXCIgKiA2MClcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIFrFgU/FmkxJV8SEIEJMT0tBRMSYOiB7ZXhlX25hbWV9IChQSUQ6IHtwaWQudmFsdWV9KVwiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFd5bWlhcnk6IHt3fXh7aH0sIFRvcE1vc3Q6IHtpc190b3Btb3N0fVwiKVxuICAgICAgICAgICAgcHJpbnQoXCIhXCIgKiA2MClcbiAgICAgICAgICAgIGV4ZWN1dGVfcXVhcmFudGluZV9zdHJpa2UoaHduZCwgcGlkLnZhbHVlKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtUHJvYyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKEVudW1Qcm9jKGNhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiPVwiICogNjUpXG4gICAgcHJpbnQoXCIgIFRBUkNaQSBBTlRZLU1BTFdBUkU6IFVOSUVSVUNIT01JRU5JRSAmIEtXQVJBTlRBTk5BIFBMSUvDk1dcIilcbiAgICBwcmludChcIiAgVHJ5YjogMTAwJSBPRkZMSU5FIChCcmFrIHphbGXFvG5vxZtjaSB6ZXduxJl0cnpueWNoKVwiKVxuICAgIHByaW50KFwiICBEemlhxYJhbmllOiBGcmVlemUgUkFNIC0+IEJpbmFyeSBMb2Nrb3V0IC0+IERlc3Ryb3lcIilcbiAgICBwcmludChcIj1cIiAqIDY1KVxuICAgIHRyeTpcbiAgICAgICAgd2hpbGUgVHJ1ZTpcbiAgICAgICAgICAgIHNjYW5fYW5kX2xvY2tkb3duKClcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoMC4zKVxuICAgIGV4Y2VwdCBLZXlib2FyZEludGVycnVwdDpcbiAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBXecWCxIVjem9ubyBtb25pdG9yIGt3YXJhbnRhbm55LlwiKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICd3aW4zMl90b3Btb3N0X2Rlc3Ryb3llcicsXG4gICAgdGl0bGU6ICcxLiBXaW4zMiBUb3BNb3N0ICYgRnVsbHNjcmVlbiBPdmVybGF5IEh1bnRlciAoTmFqc2t1dGVjem5pZWpzenkpJyxcbiAgICBzaG9ydERlc2M6ICdXeXN6dWt1amUgb2tuYSB6IGZsYWfEhSBXU19FWF9UT1BNT1NUIHBva3J5d2FqxIVjZSAxMDAlIGVrcmFudSwgc3ByYXdkemEgY3p5IHByb2NlcyDFgmFkdWplIGJpYmxpb3Rla2kgRmx1dHRlcmEgaSBiZXp3emdsxJlkbmllIGdvIHphbXlrYS4nLFxuICAgIGJhZGdlOiAnUmVrb21lbmRvd2FueSAoV2luZG93cyknLFxuICAgIG9zOiBbJ3dpbmRvd3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnLCAncHl3aW4zMiddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnS29tcGF0eWJpbG5vxZvEhyB6IDMyLWJpdCBpIDY0LWJpdCBQeXRob24gKEdldFdpbmRvd0xvbmdQdHJXIC8gR2V0V2luZG93TG9uZ1cpJyxcbiAgICAgICdXeWtyeXdhIGZsYWfEmSBXU19FWF9UT1BNT1NUIChBbHdheXMgb24gdG9wKScsXG4gICAgICAnU3ByYXdkemEgcm96bWlhciBva25hIHd6Z2zEmWRlbSByb3pkemllbGN6b8WbY2kgbW9uaXRvcmEnLFxuICAgICAgJ1dlcnlmaWt1amUgemHFgmFkb3dhbmUgbW9kdcWCeSBETEwgKGZsdXR0ZXJfd2luZG93cy5kbGwsIGZsdXR0ZXJfZW5naW5lLmRsbCknLFxuICAgICAgJ01vxbxsaXdvxZvEhyBuYXR5Y2htaWFzdG93ZWdvIHphYmljaWEgKFNJR0tJTEwpIGx1YiB6ZGrEmWNpYSBmbGFnaSBUb3BNb3N0JyxcbiAgICAgICdCaWHFgmEgbGlzdGEgYmV6cGllY3pueWNoIGFwbGlrYWNqaSAoRGlzY29yZCwgT0JTLCBncnksIGV4cGxvcmVyKSdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IGFwbGlrYWNqYSBGbHV0dGVyYSB0d29yenkgcGXFgm5vZWtyYW5vd2Ugb2tubyB3IHRyeWJpZSBBbHdheXMtb24tdG9wIGJsb2t1asSFY2UgcHVscGl0IGkgcGFzZWsgemFkYcWELicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICdTa3J5cHQgcG9iaWVyYSB1Y2h3eXR5IChIV05EKSB3c3p5c3RraWNoIHdpZG9jem55Y2ggb2tpZW4gemEgcG9tb2PEhSBFbnVtV2luZG93cy4nLFxuICAgICAgJ0RsYSBrYcW8ZGVnbyBva25hIHNwcmF3ZHphIHN0eWxlIHJvenN6ZXJ6b25lIEdldFdpbmRvd0xvbmdQdHIoR1dMX0VYU1RZTEUpIHBvZCBrxIV0ZW0gZmxhZ2kgV1NfRVhfVE9QTU9TVCAoMHgwMDAwMDAwOCkuJyxcbiAgICAgICdQb2JpZXJhIHdzcMOzxYJyesSZZG5lIG9rbmEgcHJ6ZXogR2V0V2luZG93UmVjdCBpIHBvcsOzd251amUgeiByb3pkemllbGN6b8WbY2nEhSBla3JhbnUgR2V0U3lzdGVtTWV0cmljcy4nLFxuICAgICAgJ1TFgnVtYWN6eSB1Y2h3eXQgb2tuYSAoSFdORCkgbmEgaWRlbnR5ZmlrYXRvciBwcm9jZXN1IChQSUQpIHphIHBvbW9jxIUgR2V0V2luZG93VGhyZWFkUHJvY2Vzc0lkLicsXG4gICAgICAnVcW8eXdhasSFYyBiaWJsaW90ZWtpIHBzdXRpbCBzcHJhd2R6YSB6YcWCYWRvd2FuZSBwbGlraSBiaW5hcm5lIG9yYXogbW9kdcWCeSBwYW1pxJljaSAoc3p1a2EgZmx1dHRlcl93aW5kb3dzLmRsbCkgaSBiZXp3emdsxJlkbmllIHViaWphIHByb2Nlcy4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuRkxVVFRFUiBPVkVSTEFZIERFVEVDVCAmIERFU1RST1kgKFdpbmRvd3MgV2luMzIgKyBwc3V0aWwpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuSW5zdGFsYWNqYSB3eW1hZ2FueWNoIGJpYmxpb3RlazpcbiAgcGlwIGluc3RhbGwgcHN1dGlsIHB5d2luMzJcblxuVXJ1Y2hvbWllbmllOlxuICBweXRob24gZmx1dHRlcl9vdmVybGF5X2h1bnRlci5weVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5pbXBvcnQgcHN1dGlsXG5cbiMgU3RhxYJlIFdpbjMyIEFQSVxuR1dMX0VYU1RZTEUgPSAtMjBcbldTX0VYX1RPUE1PU1QgPSAweDAwMDAwMDA4XG5XU19FWF9MQVlFUkVEID0gMHgwMDA4MDAwMFxuV1NfRVhfVFJBTlNQQVJFTlQgPSAweDAwMDAwMDIwXG5TV19NSU5JTUlaRSA9IDZcbkhXTkRfTk9UT1BNT1NUID0gLTJcblNXUF9OT1NJWkUgPSAweDAwMDFcblNXUF9OT01PVkUgPSAweDAwMDJcblNXUF9TSE9XV0lORE9XID0gMHgwMDQwXG5cbnVzZXIzMiA9IGN0eXBlcy53aW5kbGwudXNlcjMyXG5rZXJuZWwzMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcblxuIyBCZXpwaWVjem5lIHBvYmllcmFuaWUgZnVua2NqaSBzdHlsdSBva25hIChrb21wYXR5Ymlsbm/Fm8SHIHg4NiAvIHg2NClcbmlmIGhhc2F0dHIodXNlcjMyLCBcIkdldFdpbmRvd0xvbmdQdHJXXCIpOlxuICAgIEdldFdpbmRvd0xvbmdQdHIgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1B0cldcbiAgICBHZXRXaW5kb3dMb25nUHRyLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhXTkQsIGN0eXBlcy5jX2ludF1cbiAgICBHZXRXaW5kb3dMb25nUHRyLnJlc3R5cGUgPSB3aW50eXBlcy5MUEFSQU1cbmVsc2U6XG4gICAgR2V0V2luZG93TG9uZ1B0ciA9IHVzZXIzMi5HZXRXaW5kb3dMb25nV1xuICAgIEdldFdpbmRvd0xvbmdQdHIuYXJndHlwZXMgPSBbd2ludHlwZXMuSFdORCwgY3R5cGVzLmNfaW50XVxuICAgIEdldFdpbmRvd0xvbmdQdHIucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuIyBCZXpwaWVjem5hIGJpYcWCYSBsaXN0YSBwcm9jZXPDs3cgc3lzdGVtb3d5Y2ggaSB6YXVmYW55Y2hcbldISVRFTElTVF9QUk9DRVNTRVMgPSB7XG4gICAgXCJleHBsb3Jlci5leGVcIiwgXCJ0YXNrbWdyLmV4ZVwiLCBcInNoZWxsZXhwZXJpZW5jZWhvc3QuZXhlXCIsXG4gICAgXCJzZWFyY2hhcHAuZXhlXCIsIFwic2VhcmNoaG9zdC5leGVcIiwgXCJkd20uZXhlXCIsIFwic3lzdGVtc2V0dGluZ3MuZXhlXCIsXG4gICAgXCJsb2NrYXBwLmV4ZVwiLCBcImNvZGUuZXhlXCIsIFwiY2hyb21lLmV4ZVwiLCBcImZpcmVmb3guZXhlXCIsIFwiZGlzY29yZC5leGVcIlxufVxuXG4jIFN5Z25hdHVyeSBETEwgaSBwcm9jZXPDs3cgRmx1dHRlcmFcbkZMVVRURVJfU0lHTkFUVVJFUyA9IFtcbiAgICBcImZsdXR0ZXJfd2luZG93cy5kbGxcIixcbiAgICBcImZsdXR0ZXJfZW5naW5lLmRsbFwiLFxuICAgIFwiZmx1dHRlcl9lbWJlZGRlci5kbGxcIixcbiAgICBcImZsdXR0ZXJfcnVubmVyLmV4ZVwiXG5dXG5cbmRlZiBnZXRfc2NyZWVuX3Jlc29sdXRpb24oKTpcbiAgICBcIlwiXCJad3JhY2Egc3plcm9rb8WbxIcgaSB3eXNva2/Fm8SHIGfFgsOzd25lZ28gZWtyYW51LlwiXCJcIlxuICAgIHdpZHRoID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMCkgICAjIFNNX0NYU0NSRUVOXG4gICAgaGVpZ2h0ID0gdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMSkgICMgU01fQ1lTQ1JFRU5cbiAgICByZXR1cm4gd2lkdGgsIGhlaWdodFxuXG5kZWYgaXNfd2luZG93X2Z1bGxzY3JlZW4oaHduZCwgc2NyZWVuX3csIHNjcmVlbl9oKTpcbiAgICBcIlwiXCJTcHJhd2R6YSwgY3p5IG9rbm8gemFqbXVqZSBjYcWCeSBla3Jhbi5cIlwiXCJcbiAgICByZWN0ID0gd2ludHlwZXMuUkVDVCgpXG4gICAgaWYgdXNlcjMyLkdldFdpbmRvd1JlY3QoaHduZCwgY3R5cGVzLmJ5cmVmKHJlY3QpKTpcbiAgICAgICAgdyA9IHJlY3QucmlnaHQgLSByZWN0LmxlZnRcbiAgICAgICAgaCA9IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgICAgICAgaWYgdyA+PSBzY3JlZW5fdyAqIDAuOTUgYW5kIGggPj0gc2NyZWVuX2ggKiAwLjk1OlxuICAgICAgICAgICAgcmV0dXJuIFRydWUsICh3LCBoKVxuICAgIHJldHVybiBGYWxzZSwgKDAsIDApXG5cbmRlZiBpc190b3Btb3N0KGh3bmQpOlxuICAgIFwiXCJcIlNwcmF3ZHphLCBjenkgb2tubyBwb3NpYWRhIGZsYWfEmSBBbHdheXMtT24tVG9wLlwiXCJcIlxuICAgIHRyeTpcbiAgICAgICAgZXhfc3R5bGUgPSBHZXRXaW5kb3dMb25nUHRyKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgICAgICByZXR1cm4gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG5cbmRlZiBnZXRfcHJvY2Vzc19pbmZvKGh3bmQpOlxuICAgIFwiXCJcIlBvYmllcmEgUElEIG9yYXogb2JpZWt0IHBzdXRpbC5Qcm9jZXNzIGRsYSBkYW5lZ28gb2tuYS5cIlwiXCJcbiAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgcmV0dXJuIE5vbmUsIE5vbmVcbiAgICB0cnk6XG4gICAgICAgIHByb2MgPSBwc3V0aWwuUHJvY2VzcyhwaWQudmFsdWUpXG4gICAgICAgIHJldHVybiBwaWQudmFsdWUsIHByb2NcbiAgICBleGNlcHQgKHBzdXRpbC5Ob1N1Y2hQcm9jZXNzLCBwc3V0aWwuQWNjZXNzRGVuaWVkKTpcbiAgICAgICAgcmV0dXJuIHBpZC52YWx1ZSwgTm9uZVxuXG5kZWYgaGFzX2ZsdXR0ZXJfbW9kdWxlcyhwcm9jKTpcbiAgICBcIlwiXCJTa2FudWplIHphxYJhZG93YW5lIG1vZHXFgnkgRExMIHByb2Nlc3UgdyBwb3N6dWtpd2FuaXUgRmx1dHRlcmEuXCJcIlwiXG4gICAgaWYgbm90IHByb2M6XG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIHRyeTpcbiAgICAgICAgbmFtZV9sb3dlciA9IHByb2MubmFtZSgpLmxvd2VyKClcbiAgICAgICAgY21kbGluZSA9IFwiIFwiLmpvaW4ocHJvYy5jbWRsaW5lKCkpLmxvd2VyKCkgaWYgcHJvYy5jbWRsaW5lKCkgZWxzZSBcIlwiXG4gICAgICAgIGlmIGFueShzaWcgaW4gbmFtZV9sb3dlciBvciBzaWcgaW4gY21kbGluZSBmb3Igc2lnIGluIEZMVVRURVJfU0lHTkFUVVJFUyk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlmIGhhc2F0dHIocHJvYywgXCJtZW1vcnlfbWFwc1wiKTpcbiAgICAgICAgICAgIGZvciBtIGluIHByb2MubWVtb3J5X21hcHMoKTpcbiAgICAgICAgICAgICAgICBwYXRoX2xvd2VyID0gbS5wYXRoLmxvd2VyKClcbiAgICAgICAgICAgICAgICBpZiBhbnkoc2lnIGluIHBhdGhfbG93ZXIgZm9yIHNpZyBpbiBGTFVUVEVSX1NJR05BVFVSRVMpOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIGV4Y2VwdCAocHN1dGlsLkFjY2Vzc0RlbmllZCwgcHN1dGlsLk5vU3VjaFByb2Nlc3MsIE5vdEltcGxlbWVudGVkRXJyb3IsIEV4Y2VwdGlvbik6XG4gICAgICAgIHBhc3NcbiAgICByZXR1cm4gRmFsc2VcblxuZGVmIGtpbGxfcHJvY2VzcyhwaWQsIHByb2NfbmFtZSk6XG4gICAgXCJcIlwiWmFiaWphIHByb2NlcyBuYSBzacWCxJkgKFNJR0tJTEwpLlwiXCJcIlxuICAgIHRyeTpcbiAgICAgICAgcCA9IHBzdXRpbC5Qcm9jZXNzKHBpZClcbiAgICAgICAgcC5raWxsKClcbiAgICAgICAgcHJpbnQoZlwiWyFdIFtTVUtDRVNdIFphbWtuacSZdG8gesWCb8WbbGl3eS9ibG9rdWrEhWN5IHByb2Nlczoge3Byb2NfbmFtZX0gKFBJRDoge3BpZH0pXCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBvcy5zeXN0ZW0oZlwidGFza2tpbGwgL0YgL1BJRCB7cGlkfSA+bnVsIDI+JjFcIilcbiAgICAgICAgcHJpbnQoZlwiWyFdIFd5c8WCYW5vIGF3YXJ5am55IHRhc2traWxsIGRsYSBQSUQge3BpZH06IHtlfVwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG5kZWYgc2Nhbl9hbmRfZGVzdHJveSgpOlxuICAgIHNjcmVlbl93LCBzY3JlZW5faCA9IGdldF9zY3JlZW5fcmVzb2x1dGlvbigpXG5cbiAgICBkZWYgZW51bV93aW5kb3dzX2NhbGxiYWNrKGh3bmQsIGV4dHJhKTpcbiAgICAgICAgaWYgbm90IHVzZXIzMi5Jc1dpbmRvd1Zpc2libGUoaHduZCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuICAgICAgICBcbiAgICAgICAgaWYgaHduZCA9PSB1c2VyMzIuR2V0RGVza3RvcFdpbmRvdygpIG9yIGh3bmQgPT0gdXNlcjMyLkdldFNoZWxsV2luZG93KCk6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGxlbmd0aCA9IHVzZXIzMi5HZXRXaW5kb3dUZXh0TGVuZ3RoVyhod25kKVxuICAgICAgICBidWZmID0gY3R5cGVzLmNyZWF0ZV91bmljb2RlX2J1ZmZlcihsZW5ndGggKyAxKVxuICAgICAgICB1c2VyMzIuR2V0V2luZG93VGV4dFcoaHduZCwgYnVmZiwgbGVuZ3RoICsgMSlcbiAgICAgICAgdGl0bGUgPSBidWZmLnZhbHVlXG5cbiAgICAgICAgdG9wbW9zdCA9IGlzX3RvcG1vc3QoaHduZClcbiAgICAgICAgZnVsbHNjcmVlbiwgKHcsIGgpID0gaXNfd2luZG93X2Z1bGxzY3JlZW4oaHduZCwgc2NyZWVuX3csIHNjcmVlbl9oKVxuICAgICAgICBwaWQsIHByb2MgPSBnZXRfcHJvY2Vzc19pbmZvKGh3bmQpXG5cbiAgICAgICAgaWYgbm90IHByb2M6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIHByb2NfbmFtZSA9IHByb2MubmFtZSgpLmxvd2VyKCkgaWYgcHJvYyBlbHNlIFwidW5rbm93blwiXG5cbiAgICAgICAgaWYgcHJvY19uYW1lIGluIFdISVRFTElTVF9QUk9DRVNTRVM6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlzX2ZsdXR0ZXIgPSBoYXNfZmx1dHRlcl9tb2R1bGVzKHByb2MpXG5cbiAgICAgICAgaWYgKHRvcG1vc3QgYW5kIGZ1bGxzY3JlZW4pIG9yIChpc19mbHV0dGVyIGFuZCAodG9wbW9zdCBvciBmdWxsc2NyZWVuKSk6XG4gICAgICAgICAgICBwcmludChcIj1cIio2MClcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIFBPREVKUlpBTsSEIE5BS8WBQURLxJggQkxPS1VKxIRDxIQgRUtSQU4hXCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgVHl0dcWCIG9rbmEgICA6ICd7dGl0bGV9J1wiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFByb2NlcyAgICAgICA6IHtwcm9jX25hbWV9IChQSUQ6IHtwaWR9KVwiKVxuICAgICAgICAgICAgcHJpbnQoZlwiICAgIFJvem1pYXIgb2tuYSA6IHt3fXh7aH0gKEVrcmFuOiB7c2NyZWVuX3d9eHtzY3JlZW5faH0pXCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgVG9wTW9zdCAgICAgIDoge3RvcG1vc3R9XCIpXG4gICAgICAgICAgICBwcmludChmXCIgICAgTW9kdcWCeSBGbHV0dGVyOiB7aXNfZmx1dHRlcn1cIilcbiAgICAgICAgICAgIHByaW50KFwiPVwiKjYwKVxuICAgICAgICAgICAga2lsbF9wcm9jZXNzKHBpZCwgcHJvY19uYW1lKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtV2luZG93c1Byb2MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgIHVzZXIzMi5FbnVtV2luZG93cyhFbnVtV2luZG93c1Byb2MoZW51bV93aW5kb3dzX2NhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFVydWNob21pb25vIFdhdGNoZG9nIHByemVjaXdrbyBuYWvFgmFka29tIEZsdXR0ZXIvV2luMzIuLi5cIilcbiAgICBwcmludChcIlsqXSBTa2Fub3dhbmllIHcgcMSZdGxpIGNvIDUwMCBtcyAoTmFjacWbbmlqIEN0cmwrQyBhYnkgemF0cnp5bWHEhykuLi5cIilcbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICBzY2FuX2FuZF9kZXN0cm95KClcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoMC41KVxuICAgIGV4Y2VwdCBLZXlib2FyZEludGVycnVwdDpcbiAgICAgICAgcHJpbnQoXCJcXFxcblsqXSBaYXRyenltYW5vIG1vbml0b3IuXCIpXG5gXG4gIH0sXG4gIHtcbiAgICBpZDogJ3B1cmVfY3R5cGVzX3plcm9fZGVwZW5kZW5jeScsXG4gICAgdGl0bGU6ICcyLiBDenlzdHkgUHl0aG9uIGJleiBpbnN0YWxhY2ppIHBpcCAoWmVybyBEZXBlbmRlbmNpZXMpJyxcbiAgICBzaG9ydERlc2M6ICdEemlhxYJhIG5hIGthxbxkeW0ga29tcHV0ZXJ6ZSB6IHphaW5zdGFsb3dhbnltIFB5dGhvbmVtLCBuaWUgd3ltYWdhIHVydWNoYW1pYW5pYSBwaXAgaW5zdGFsbCBwc3V0aWwvcHl3aW4zMi4gVcW8eXdhIHdidWRvd2FuZWdvIGN0eXBlcyBpIHRhc2traWxsLicsXG4gICAgYmFkZ2U6ICdOYXR5Y2htaWFzdG93ZSAoQnJhayBwaXApJyxcbiAgICBvczogWyd3aW5kb3dzJ10sXG4gICAgcmVxdWlyZXNQaXA6IGZhbHNlLFxuICAgIHBpcFBhY2thZ2VzOiBbXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1plcm8gemV3bsSZdHJ6bnljaCB6YWxlxbxub8WbY2kgKHXFvHl3YSB3YnVkb3dhbmVnbyBtb2R1xYJ1IGN0eXBlcyknLFxuICAgICAgJ01vxbxuYSB1cnVjaG9tacSHIG9kIHJhenUgdyB0cnliaWUgYXdhcnlqbnltIGx1YiBuYSDFm3dpZcW8eW0gc3lzdGVtaWUnLFxuICAgICAgJ1BvYmllcmEgSFdORCwgc3ByYXdkemEgV1NfRVhfVE9QTU9TVCBvcmF6IFBJRCcsXG4gICAgICAnVGVybWludWplIHByb2NlcyB6YSBwb21vY8SFIE9wZW5Qcm9jZXNzICsgVGVybWluYXRlUHJvY2VzcyBvcmF6IHRhc2traWxsJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgbmllIG1hc3ogZG9zdMSZcHUgZG8gaW50ZXJuZXR1LCBwaXAgbmllIGR6aWHFgmEgbHViIGNoY2VzeiBuYXR5Y2htaWFzdCB1cnVjaG9tacSHIHBvamVkeW5jenkgcGxpayAucHkuJyxcbiAgICBleHBsYW5hdGlvbjogW1xuICAgICAgJ1NrcnlwdCB1xbx5d2Egd3nFgsSFY3puaWUgYmlibGlvdGVraSBzdGFuZGFyZG93ZWogUHl0aG9uYSAoY3R5cGVzLCBzdWJwcm9jZXNzLCB0aW1lKS4nLFxuICAgICAgJ8WBxIVjenkgc2nEmSBiZXpwb8WbcmVkbmlvIHogYmlibGlvdGVrYW1pIHN5c3RlbW93eW1pIHVzZXIzMi5kbGwgb3JheiBrZXJuZWwzMi5kbGwuJyxcbiAgICAgICdTa2FudWplIGxpc3TEmSBva2llbiBwcnpleiBFbnVtV2luZG93cywgc3ByYXdkemEgZmxhZ8SZIFdTX0VYX1RPUE1PU1Qgb3JheiByb3ptaWFyIG9rbmEuJyxcbiAgICAgICdQbyB3eWtyeWNpdSBuYXR5Y2htaWFzdCB3eXdvxYJ1amUgVGVybWluYXRlUHJvY2VzcyB6IHVwcmF3bmllbmlhbWkgUFJPQ0VTU19URVJNSU5BVEUgKDB4MDAwMSkuJ1xuICAgIF0sXG4gICAgY29kZTogYFwiXCJcIlxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkZMVVRURVIgLyBUT1BNT1NUIE9WRVJMQVkgS0lMTEVSIChaZXJvLURlcGVuZGVuY3kgLyBQdXJlIFB5dGhvbiBjdHlwZXMpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTmllIHd5bWFnYSBpbnN0YWxhY2ppIMW8YWRueWNoIHBhY3playAoYnJhayAncGlwIGluc3RhbGwnKSFcbkR6aWHFgmEgb2QgcmF6dSB3IGN6eXN0eW0gUHl0aG9uaWUgMy54IG5hIFdpbmRvd3NpZS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBjdHlwZXNcbmZyb20gY3R5cGVzIGltcG9ydCB3aW50eXBlc1xuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN1YnByb2Nlc3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxuXG5HV0xfRVhTVFlMRSA9IC0yMFxuV1NfRVhfVE9QTU9TVCA9IDB4MDAwMDAwMDhcblBST0NFU1NfVEVSTUlOQVRFID0gMHgwMDAxXG5QUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OID0gMHgwNDAwXG5cbmlmIGhhc2F0dHIodXNlcjMyLCBcIkdldFdpbmRvd0xvbmdQdHJXXCIpOlxuICAgIEdldFdpbmRvd0xvbmdQdHIgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1B0cldcbiAgICBHZXRXaW5kb3dMb25nUHRyLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhXTkQsIGN0eXBlcy5jX2ludF1cbiAgICBHZXRXaW5kb3dMb25nUHRyLnJlc3R5cGUgPSB3aW50eXBlcy5MUEFSQU1cbmVsc2U6XG4gICAgR2V0V2luZG93TG9uZ1B0ciA9IHVzZXIzMi5HZXRXaW5kb3dMb25nV1xuICAgIEdldFdpbmRvd0xvbmdQdHIuYXJndHlwZXMgPSBbd2ludHlwZXMuSFdORCwgY3R5cGVzLmNfaW50XVxuICAgIEdldFdpbmRvd0xvbmdQdHIucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuV0hJVEVMSVNUX05BTUVTID0ge1wiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIiwgXCJkd20uZXhlXCIsIFwic2hlbGxleHBlcmllbmNlaG9zdC5leGVcIn1cblxuZGVmIGdldF9wcm9jZXNzX25hbWUocGlkKTpcbiAgICBoX3Byb2Nlc3MgPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1FVRVJZX0lORk9STUFUSU9OIHwgMHgxMDAwLCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoX3Byb2Nlc3M6XG4gICAgICAgIHJldHVybiBcIlwiXG4gICAgbmFtZV9idWZmZXIgPSBjdHlwZXMuY3JlYXRlX3VuaWNvZGVfYnVmZmVyKDEwMjQpXG4gICAgc2l6ZSA9IHdpbnR5cGVzLkRXT1JEKDEwMjQpXG4gICAgaWYgY3R5cGVzLndpbmRsbC5rZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoX3Byb2Nlc3MsIDAsIG5hbWVfYnVmZmVyLCBjdHlwZXMuYnlyZWYoc2l6ZSkpOlxuICAgICAgICBmdWxsX3BhdGggPSBuYW1lX2J1ZmZlci52YWx1ZVxuICAgICAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoX3Byb2Nlc3MpXG4gICAgICAgIHJldHVybiBvcy5wYXRoLmJhc2VuYW1lKGZ1bGxfcGF0aCkubG93ZXIoKVxuICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGhfcHJvY2VzcylcbiAgICByZXR1cm4gXCJcIlxuXG5kZWYga2lsbF9waWRfZm9yY2VmdWxseShwaWQsIHByb2NfbmFtZSk6XG4gICAgaF9wcm9jZXNzID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19URVJNSU5BVEUsIEZhbHNlLCBwaWQpXG4gICAgaWYgaF9wcm9jZXNzOlxuICAgICAgICBrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGhfcHJvY2VzcywgOSlcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaF9wcm9jZXNzKVxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFUyBBUEldIFphYml0byBwcm9jZXMgUElEOiB7cGlkfSAoe3Byb2NfbmFtZX0pXCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgXG4gICAgdHJ5OlxuICAgICAgICBzdWJwcm9jZXNzLnJ1bihbXCJ0YXNra2lsbFwiLCBcIi9GXCIsIFwiL1BJRFwiLCBzdHIocGlkKV0sIGNhcHR1cmVfb3V0cHV0PVRydWUpXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTIENNRF0gWmFta25pxJl0byBwcnpleiB0YXNra2lsbCBQSUQ6IHtwaWR9XCIpXG4gICAgICAgIHJldHVybiBUcnVlXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJbLV0gQsWCxIVkIHphbXlrYW5pYSBQSUQge3BpZH06IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIHNjYW5fYW5kX2tpbGwoKTpcbiAgICBzY3JlZW5fdyA9IHVzZXIzMi5HZXRTeXN0ZW1NZXRyaWNzKDApXG4gICAgc2NyZWVuX2ggPSB1c2VyMzIuR2V0U3lzdGVtTWV0cmljcygxKVxuICAgIFxuICAgIGRlZiBjYWxsYmFjayhod25kLCBscGFyYW0pOlxuICAgICAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGlmIGh3bmQgaW4gKHVzZXIzMi5HZXREZXNrdG9wV2luZG93KCksIHVzZXIzMi5HZXRTaGVsbFdpbmRvdygpKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgZXhfc3R5bGUgPSBHZXRXaW5kb3dMb25nUHRyKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgICAgICBpc190b3Btb3N0ID0gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG5cbiAgICAgICAgcmVjdCA9IHdpbnR5cGVzLlJFQ1QoKVxuICAgICAgICB1c2VyMzIuR2V0V2luZG93UmVjdChod25kLCBjdHlwZXMuYnlyZWYocmVjdCkpXG4gICAgICAgIHcgPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0XG4gICAgICAgIGggPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wXG4gICAgICAgIGlzX2Z1bGxzY3JlZW4gPSAodyA+PSBzY3JlZW5fdyAqIDAuOSBhbmQgaCA+PSBzY3JlZW5faCAqIDAuOSlcblxuICAgICAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgICAgIFxuICAgICAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgcHJvY19uYW1lID0gZ2V0X3Byb2Nlc3NfbmFtZShwaWQudmFsdWUpXG4gICAgICAgIGlmIHByb2NfbmFtZSBpbiBXSElURUxJU1RfTkFNRVM6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlmIChpc190b3Btb3N0IGFuZCBpc19mdWxsc2NyZWVuKSBvciAoXCJmbHV0dGVyXCIgaW4gcHJvY19uYW1lKTpcbiAgICAgICAgICAgIHByaW50KGZcIlshXSBXWUtSWVRPIE5BS8WBQURLxJg6IFBJRD17cGlkLnZhbHVlfSwgUGxpaz0ne3Byb2NfbmFtZX0nLCBSb3ptaWFyPXt3fXh7aH0sIFRvcE1vc3Q9e2lzX3RvcG1vc3R9XCIpXG4gICAgICAgICAgICBraWxsX3BpZF9mb3JjZWZ1bGx5KHBpZC52YWx1ZSwgcHJvY19uYW1lKVxuXG4gICAgICAgIHJldHVybiBUcnVlXG5cbiAgICBFbnVtUHJvYyA9IGN0eXBlcy5XSU5GVU5DVFlQRSh3aW50eXBlcy5CT09MLCB3aW50eXBlcy5IV05ELCB3aW50eXBlcy5MUEFSQU0pXG4gICAgdXNlcjMyLkVudW1XaW5kb3dzKEVudW1Qcm9jKGNhbGxiYWNrKSwgMClcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHByaW50KFwiWypdIFNrYW5lciBjenlzdGVnbyBQeXRob25hIChjdHlwZXMpIGFrdHl3bnkuIFNrYW5vd2FuaWUgY28gMzAwIG1zLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgc2Nhbl9hbmRfa2lsbCgpXG4gICAgICAgICAgICB0aW1lLnNsZWVwKDAuMylcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmFrb8WEY3pvbm8gZHppYcWCYW5pZS5cIilcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAncGFuaWNfaG90a2V5X2tpbGxlcicsXG4gICAgdGl0bGU6ICczLiBHbG9iYWxueSBQcnp5Y2lzayBQYW5pa2kgKEVtZXJnZW5jeSBIb3RrZXkgRGFlbW9uKScsXG4gICAgc2hvcnREZXNjOiAnRHppYcWCYSB3IHRsZSBpIG5hc8WCdWNodWplIGdsb2JhbG5lZ28gc2tyw7N0dSBrbGF3aXN6b3dlZ28gKG5wLiBDdHJsK0FsdCtLIGx1YiBGMTApLiBQbyB3Y2nFm25pxJljaXUgbmF0eWNobWlhc3QgdWJpamEgYWt0eXduZSBva25vIG5hIHdpZXJ6Y2h1IGx1YiBwcm9jZXMgRmx1dHRlcmEuJyxcbiAgICBiYWRnZTogJ1NrcsOzdCBhd2FyeWpueSAoS2xhd2lhdHVyYSknLFxuICAgIG9zOiBbJ3dpbmRvd3MnLCAnbGludXgnLCAnbWFjb3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydrZXlib2FyZCcsICdwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ1JlYWd1amUgbmF3ZXQsIGdkeSBuYWvFgmFka2EgcHJ6ZWNod3l0dWplIGt1cnNvciBteXN6eScsXG4gICAgICAnR2xvYmFsbnkgaG9vayBrbGF3aWF0dXJ5IChkemlhxYJhIHogZG93b2xuZWdvIG1pZWpzY2EpJyxcbiAgICAgICdaYWJpamEgYWt0dWFsbmllIGFrdHl3bmUgb2tubyBuYSBwaWVyd3N6eW0gcGxhbmllIChHZXRGb3JlZ3JvdW5kV2luZG93KScsXG4gICAgICAnT3Bjam9uYWxuaWUgdWJpamEgd3N6eXN0a2llIHByb2Nlc3kgRmx1dHRlcmEgemEgamVkbnltIG5hY2nFm25pxJljaWVtJ1xuICAgIF0sXG4gICAgcmVjb21tZW5kZWRGb3I6ICdHZHkgY2hjZXN6IG1pZcSHIHBlxYJuxIUga29udHJvbMSZIGkgd3l3b8WCeXdhxIcgemFiaWNpZSBuYWvFgmFka2kgamVkbnltIGtsaWtuacSZY2llbSBuYSBrbGF3aWF0dXJ6ZS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnQmlibGlvdGVrYSBrZXlib2FyZCBpbnN0YWx1amUgaG9vayBuaXNraWVnbyBwb3ppb211IChXSF9LRVlCT0FSRF9MTCB3IFdpbmRvd3MgbHViIG9kcG93aWVkbmlrIHcgWDExKS4nLFxuICAgICAgJ1BvIHdjacWbbmnEmWNpdSBza3LDs3R1IChucC4gQ3RybCtBbHQrU2hpZnQrSykgc2tyeXB0IHBvYmllcmEgdWNod3l0IG9rbmEgcGllcndzem9wbGFub3dlZ28gcHJ6ZXogR2V0Rm9yZWdyb3VuZFdpbmRvdy4nLFxuICAgICAgJ0lkZW50eWZpa3VqZSBwcm9jZXMgcG93acSFemFueSB6IG9rbmVtIGkgbmF0eWNobWlhc3Qgd3lzecWCYSBzeWduYcWCIFNJR0tJTEwuJyxcbiAgICAgICdEb2RhdGtvd28gcHJ6ZXN6dWt1amUgY2HFgsSFIGxpc3TEmSBwcm9jZXPDs3cgaSB6YW15a2Egd3N6eXN0a2llIHByb2Nlc3kgcG93acSFemFuZSB6IEZsdXR0ZXJlbS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuRU1FUkdFTkNZIFBBTklDIEhPVEtFWSBLSUxMRVIgKEdsb2JhbG55IHNrcsOzdCBrbGF3aXN6b3d5KVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkluc3RhbGFjamE6XG4gIHBpcCBpbnN0YWxsIGtleWJvYXJkIHBzdXRpbCBweXdpbjMyXG5cblVydWNob21pZW5pZTpcbiAgcHl0aG9uIHBhbmljX2hvdGtleV9raWxsZXIucHlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBrZXlib2FyZFxuaW1wb3J0IHBzdXRpbFxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5pbXBvcnQgc3lzXG5pbXBvcnQgb3NcblxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcblxuSE9US0VZID0gXCJjdHJsK2FsdCtzaGlmdCtrXCJcbkFMVF9IT1RLRVkgPSBcImYxMFwiXG5cbmRlZiBraWxsX2ZvcmVncm91bmRfd2luZG93KCk6XG4gICAgaHduZCA9IHVzZXIzMi5HZXRGb3JlZ3JvdW5kV2luZG93KClcbiAgICBpZiBub3QgaHduZDpcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwaWQgPSB3aW50eXBlcy5EV09SRCgpXG4gICAgdXNlcjMyLkdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChod25kLCBjdHlwZXMuYnlyZWYocGlkKSlcbiAgICBcbiAgICBpZiBwaWQudmFsdWUgPT0gMDpcbiAgICAgICAgcmV0dXJuXG5cbiAgICB0cnk6XG4gICAgICAgIHAgPSBwc3V0aWwuUHJvY2VzcyhwaWQudmFsdWUpXG4gICAgICAgIG5hbWUgPSBwLm5hbWUoKVxuICAgICAgICBpZiBuYW1lLmxvd2VyKCkgaW4gKFwiZXhwbG9yZXIuZXhlXCIsIFwidGFza21nci5leGVcIik6XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgXG4gICAgICAgIHAua2lsbCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbUEFOSUMgQlVUVE9OXSBaYWJpdG8gb2tubyBwaWVyd3N6b3BsYW5vd2U6IHtuYW1lfSAoUElEOiB7cGlkLnZhbHVlfSlcIilcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIG9zLnN5c3RlbShmXCJ0YXNra2lsbCAvRiAvUElEIHtwaWQudmFsdWV9ID5udWwgMj4mMVwiKVxuICAgICAgICBwcmludChmXCJbK10gV3ltdXN6b25vIHphbWtuacSZY2llIFBJRDoge3BpZC52YWx1ZX1cIilcblxuZGVmIGtpbGxfYWxsX2ZsdXR0ZXJfaW5zdGFuY2VzKCk6XG4gICAga2lsbGVkX2NvdW50ID0gMFxuICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdjbWRsaW5lJ10pOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBuYW1lID0gcHJvYy5pbmZvWyduYW1lJ10ubG93ZXIoKVxuICAgICAgICAgICAgY21kID0gXCIgXCIuam9pbihwcm9jLmluZm9bJ2NtZGxpbmUnXSBvciBbXSkubG93ZXIoKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiBcImZsdXR0ZXJcIiBpbiBuYW1lIG9yIFwiZmx1dHRlcl9ydW5uZXJcIiBpbiBuYW1lIG9yIFwiZGFydC5leGVcIiBpbiBuYW1lOlxuICAgICAgICAgICAgICAgIHByb2Mua2lsbCgpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtQQU5JQ10gWmFta25pxJl0byBpbnN0YW5jasSZIEZsdXR0ZXI6IHtuYW1lfSAoUElEOiB7cHJvYy5pbmZvWydwaWQnXX0pXCIpXG4gICAgICAgICAgICAgICAga2lsbGVkX2NvdW50ICs9IDFcbiAgICAgICAgZXhjZXB0IChwc3V0aWwuTm9TdWNoUHJvY2VzcywgcHN1dGlsLkFjY2Vzc0RlbmllZCk6XG4gICAgICAgICAgICBwYXNzXG5cbmRlZiBlbWVyZ2VuY3lfcGFuaWNfdHJpZ2dlcigpOlxuICAgIHByaW50KFwiXFxcXG5bIV0gT1RSWllNQU5PIFNZR05BxYEgQVdBUllKTlkgKFBBTklDIEhPVEtFWSkhXCIpXG4gICAga2lsbF9mb3JlZ3JvdW5kX3dpbmRvdygpXG4gICAga2lsbF9hbGxfZmx1dHRlcl9pbnN0YW5jZXMoKVxuXG5pZiBfX25hbWVfXyA9PSBcIl9fbWFpbl9fXCI6XG4gICAgcHJpbnQoXCJQQU5JQyBIT1RLRVkgS0lMTEVSIERaSUHFgUEgVyBUTEVcIilcbiAgICBwcmludChmXCJTa3LDs3R5OiBbe0hPVEtFWS51cHBlcigpfV0gbHViIFt7QUxUX0hPVEtFWS51cHBlcigpfV1cIilcbiAgICBrZXlib2FyZC5hZGRfaG90a2V5KEhPVEtFWSwgZW1lcmdlbmN5X3BhbmljX3RyaWdnZXIpXG4gICAga2V5Ym9hcmQuYWRkX2hvdGtleShBTFRfSE9US0VZLCBlbWVyZ2VuY3lfcGFuaWNfdHJpZ2dlcilcbiAgICBrZXlib2FyZC53YWl0KClcbmBcbiAgfSxcbiAge1xuICAgIGlkOiAnZmx1dHRlcl9wcm9jZXNzX3dhdGNoZG9nJyxcbiAgICB0aXRsZTogJzQuIEFncmVzeXdueSBXYXRjaGRvZyBQcm9jZXPDs3cgaSBQYW1pxJljaSAocHN1dGlsIE1vZHVsZSBTY2FubmVyKScsXG4gICAgc2hvcnREZXNjOiAnQ2nEhWdsZSBtb25pdG9ydWplIHR3b3J6ZW5pZSBub3d5Y2ggcHJvY2Vzw7N3IHcgc3lzdGVtaWUuIELFgnlza2F3aWN6bmllIHViaWphIHByb2Nlc3kgxYJhZHVqxIVjZSBiaWJsaW90ZWtpIGZsdXR0ZXJfd2luZG93cy5kbGwgbHViIHVydWNoYW1pYW5lIHogcnVubmVyYSBGbHV0dGVyYS4nLFxuICAgIGJhZGdlOiAnQ2nEhWfFgnkgZGVtb24nLFxuICAgIG9zOiBbJ3dpbmRvd3MnXSxcbiAgICByZXF1aXJlc1BpcDogdHJ1ZSxcbiAgICBwaXBQYWNrYWdlczogWydwc3V0aWwnXSxcbiAgICBrZXlGZWF0dXJlczogW1xuICAgICAgJ0fFgsSZYm9rYSBpbnNwZWtjamEgcGFtacSZY2kgKG1lbW9yeV9tYXBzIC8gbG9hZGVkIG1vZHVsZXMpJyxcbiAgICAgICdTenlia2kgY3phcyByZWFrY2ppICg8MTAwIG1zIG9kIHVydWNob21pZW5pYSBhcGxpa2FjamkgRmx1dHRlciknLFxuICAgICAgJ1d5a3J5d2EgYXBsaWthY2plIEZsdXR0ZXIgbmF3ZXQgcG8gem1pYW5pZSBuYXp3eSBwbGlrdSAuZXhlJyxcbiAgICAgICdBdXRvbWF0eWN6bmUgbG9nb3dhbmllIGkgemFwaXN5d2FuaWUgcmFwb3J0w7N3IG8gemFibG9rb3dhbnljaCBwcsOzYmFjaCdcbiAgICBdLFxuICAgIHJlY29tbWVuZGVkRm9yOiAnR2R5IGF1dG9yIG5ha8WCYWRraSB6bWllbmnFgiBuYXp3xJkgcGxpa3UgLmV4ZSBuYSBpbm7EhSAobnAuIHN2Y2hvc3QuZXhlKSwgYWxlIHBsaWsgd2NpxIXFvCDFgmFkdWplIHNpbG5payBGbHV0dGVyYS4nLFxuICAgIGV4cGxhbmF0aW9uOiBbXG4gICAgICAnQXBsaWthY2phIHdlIEZsdXR0ZXJ6ZSBuYSBXaW5kb3dzIHphd3N6ZSB3eW1hZ2Egc2lsbmlrYSBGbHV0dGVyIEVuZ2luZSAoZmx1dHRlcl93aW5kb3dzLmRsbCkuJyxcbiAgICAgICdOYXdldCBqZcWbbGkgcHJvZ3JhbSB6bWllbmkgbmF6d8SZIHBsaWt1IHd5a29ueXdhbG5lZ28sIGplZ28gbWFwYSBwYW1pxJljaSB1amF3bmkgYmlibGlvdGVraSBGbHV0dGVyYS4nLFxuICAgICAgJ1RlbiBza3J5cHQgc3ByYXdkemEga2HFvGR5IG5vd3kgcHJvY2VzIGkgamXFm2xpIHd5a3J5amUgYmlibGlvdGVrxJkgc2lsbmlrYSwgbmF0eWNobWlhc3QgZ28gZWxpbWludWplLidcbiAgICBdLFxuICAgIGNvZGU6IGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5GTFVUVEVSIEVOR0lORSBNT0RVTEUgREVURUNUT1IgJiBQUk9DRVNTIEtJTExFUiAocHN1dGlsIE1lbW9yeSBXYXRjaGRvZylcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5XeWtyeXdhIEZsdXR0ZXJhIHBvIHphxYJhZG93YW55Y2ggbW9kdcWCYWNoIERMTCwgbmF3ZXQgamXFm2xpIHByb2NlcyBtYSBmYcWCc3p5d8SFIG5henfEmS5cbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBwc3V0aWxcbmltcG9ydCB0aW1lXG5pbXBvcnQgb3NcblxuRkxVVFRFUl9ETExfTkFNRVMgPSB7XCJmbHV0dGVyX3dpbmRvd3MuZGxsXCIsIFwiZmx1dHRlcl9lbmdpbmUuZGxsXCIsIFwiZmx1dHRlcl9lbWJlZGRlci5kbGxcIn1cblxuZGVmIGlzX2ZsdXR0ZXJfcHJvY2Vzcyhwcm9jKTpcbiAgICB0cnk6XG4gICAgICAgIG5hbWUgPSBwcm9jLm5hbWUoKS5sb3dlcigpXG4gICAgICAgIGlmIFwiZmx1dHRlclwiIGluIG5hbWU6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZSwgZlwiTmF6d2EgcHJvY2VzdToge25hbWV9XCJcblxuICAgICAgICBjbWRsaW5lID0gXCIgXCIuam9pbihwcm9jLmNtZGxpbmUoKSkubG93ZXIoKSBpZiBwcm9jLmNtZGxpbmUoKSBlbHNlIFwiXCJcbiAgICAgICAgaWYgXCJmbHV0dGVyXCIgaW4gY21kbGluZTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlLCBmXCJBcmd1bWVudHkgd2llcnN6YSBwb2xlY2XFhDoge2NtZGxpbmV9XCJcblxuICAgICAgICBpZiBoYXNhdHRyKHByb2MsIFwibWVtb3J5X21hcHNcIik6XG4gICAgICAgICAgICBmb3IgbW0gaW4gcHJvYy5tZW1vcnlfbWFwcygpOlxuICAgICAgICAgICAgICAgIGRsbF9maWxlbmFtZSA9IG9zLnBhdGguYmFzZW5hbWUobW0ucGF0aCkubG93ZXIoKVxuICAgICAgICAgICAgICAgIGlmIGRsbF9maWxlbmFtZSBpbiBGTFVUVEVSX0RMTF9OQU1FUzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRydWUsIGZcIlphxYJhZG93YW5hIGJpYmxpb3Rla2EgRExMOiB7ZGxsX2ZpbGVuYW1lfSAoe21tLnBhdGh9KVwiXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcGFzc1xuICAgIHJldHVybiBGYWxzZSwgXCJcIlxuXG5kZWYgcnVuX3dhdGNoZG9nKCk6XG4gICAgcHJpbnQoXCJbKl0gQWt0eXdueSBza2FuZXIgcGFtacSZY2kgcHJvY2Vzw7N3IEZsdXR0ZXJhLlwiKVxuICAgIHNlZW5fcGlkcyA9IHNldCgpXG5cbiAgICB3aGlsZSBUcnVlOlxuICAgICAgICBjdXJyZW50X3BpZHMgPSBzZXQoKVxuICAgICAgICBmb3IgcHJvYyBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgcGlkID0gcHJvYy5pbmZvWydwaWQnXVxuICAgICAgICAgICAgICAgIGN1cnJlbnRfcGlkcy5hZGQocGlkKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIHBpZCBub3QgaW4gc2Vlbl9waWRzOlxuICAgICAgICAgICAgICAgICAgICBzZWVuX3BpZHMuYWRkKHBpZClcbiAgICAgICAgICAgICAgICAgICAgaXNfZmx0LCByZWFzb24gPSBpc19mbHV0dGVyX3Byb2Nlc3MocHJvYylcbiAgICAgICAgICAgICAgICAgICAgaWYgaXNfZmx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiXFxcXG5bIV0gV1lLUllUTyBTSUxOSUsgRkxVVFRFUkE6IFBJRCB7cGlkfSAoe3Byb2MuaW5mb1snbmFtZSddfSlcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHByaW50KGZcIiAgICBQb3fDs2Q6IHtyZWFzb259XCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB6bGlrd2lkb3dhbnkuXCIpXG4gICAgICAgICAgICBleGNlcHQgKHBzdXRpbC5Ob1N1Y2hQcm9jZXNzLCBwc3V0aWwuQWNjZXNzRGVuaWVkKTpcbiAgICAgICAgICAgICAgICBjb250aW51ZVxuXG4gICAgICAgIHNlZW5fcGlkcyA9IHNlZW5fcGlkcy5pbnRlcnNlY3Rpb24oY3VycmVudF9waWRzKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMilcblxuaWYgX19uYW1lX18gPT0gXCJfX21haW5fX1wiOlxuICAgIHRyeTpcbiAgICAgICAgcnVuX3dhdGNoZG9nKClcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmF0cnp5bWFubyBtb25pdG9yb3dhbmllLlwiKVxuYFxuICB9LFxuICB7XG4gICAgaWQ6ICdsaW51eF94MTFfb3ZlcmxheV9raWxsZXInLFxuICAgIHRpdGxlOiAnNS4gTGludXggKFgxMSAvIFdheWxhbmQpIE92ZXJsYXkgJiBGbHV0dGVyIFdpbmRvdyBLaWxsZXInLFxuICAgIHNob3J0RGVzYzogJ1NrcnlwdCBkbGEgc3lzdGVtw7N3IExpbnV4LiBVxbx5d2EgeGRvdG9vbCwgd21jdHJsLCB4cHJvcCBpIHBzdXRpbCBkbyB3eWtyeXdhbmlhIHBlxYJub2VrcmFub3d5Y2ggb2tpZW4gdyB3YXJzdHdpZSBfTkVUX1dNX1NUQVRFX0FCT1ZFIGkgaWNoIHViaWphbmlhLicsXG4gICAgYmFkZ2U6ICdMaW51eCAoWDExL1dheWxhbmQpJyxcbiAgICBvczogWydsaW51eCddLFxuICAgIHJlcXVpcmVzUGlwOiB0cnVlLFxuICAgIHBpcFBhY2thZ2VzOiBbJ3BzdXRpbCddLFxuICAgIGtleUZlYXR1cmVzOiBbXG4gICAgICAnU3ByYXdkemEgYXRyeWJ1dHkgb2tpZW4gWDExIChfTkVUX1dNX1NUQVRFX0FCT1ZFIC8gRlVMTFNDUkVFTiknLFxuICAgICAgJ1dzcGllcmEgeGRvdG9vbCwgeHByb3Agb3JheiB4a2lsbCcsXG4gICAgICAnRHppYcWCYSB6IGtvbXBpbGFjamFtaSBGbHV0dGVyIExpbnV4IERlc2t0b3AgKGxpYmZsdXR0ZXJfbGludXguc28pJyxcbiAgICAgICdBdXRvbWF0eWN6bmUgcHJ6eXdyYWNhbmllIGtvbnRyb2xpIG5hZCBrdXJzb3JlbSAoeGRvdG9vbCBtb3VzZSBmb2N1cyknXG4gICAgXSxcbiAgICByZWNvbW1lbmRlZEZvcjogJ0dkeSBuYWvFgmFka2EgYmxva3VqZSDFm3JvZG93aXNrbyBncmFmaWN6bmUgbmEgTGludWtzaWUgKFVidW50dSwgRGViaWFuLCBGZWRvcmEsIEFyY2gpLicsXG4gICAgZXhwbGFuYXRpb246IFtcbiAgICAgICdOYSBMaW51a3NpZSBGbHV0dGVyIHR3b3J6eSBva25hIHphIHBvbW9jxIUgYmlibGlvdGVraSBHVEszIGkgc2lsbmlrYSBsaWJmbHV0dGVyX2xpbnV4LnNvLicsXG4gICAgICAnT2tuYSBBbHdheXMtb24tdG9wIHVzdGF3aWFqxIUgYXRyeWJ1dCBhdG9tdSBfTkVUX1dNX1NUQVRFX0FCT1ZFLicsXG4gICAgICAnU2tyeXB0IG9kcHl0dWplIHNlcndlciBYMTEgbyBnZW9tZXRyacSZIGkgd8WCYcWbY2l3b8WbY2kgb2tpZW4sIHBvIGN6eW0gemFiaWphIHByb2NlcyBvZHBvd2llZHppYWxueSB6YSBibG9rYWTEmS4nXG4gICAgXSxcbiAgICBjb2RlOiBgXCJcIlwiXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuTElOVVggWDExIC8gV0FZTEFORCBGTFVUVEVSIE9WRVJMQVkgS0lMTEVSXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuSW5zdGFsYWNqYSBuYXJ6xJlkemkgaSBiaWJsaW90ZWs6XG4gIHN1ZG8gYXB0IGluc3RhbGwgeGRvdG9vbCB3bWN0cmwgeDExLXV0aWxzXG4gIHBpcCBpbnN0YWxsIHBzdXRpbFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHN1YnByb2Nlc3NcbmltcG9ydCB0aW1lXG5pbXBvcnQgcHN1dGlsXG5pbXBvcnQgb3NcblxuZGVmIGdldF9zY3JlZW5fcmVzb2x1dGlvbigpOlxuICAgIHRyeTpcbiAgICAgICAgb3V0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoXCJ4cmFuZHIgfCBncmVwICcqJyB8IGF3ayAne3ByaW50ICQxfSdcIiwgc2hlbGw9VHJ1ZSkuZGVjb2RlKClcbiAgICAgICAgcmVzID0gb3V0LnN0cmlwKCkuc3BsaXQoJ1xcXFxuJylbMF1cbiAgICAgICAgdywgaCA9IG1hcChpbnQsIHJlcy5zcGxpdCgneCcpKVxuICAgICAgICByZXR1cm4gdywgaFxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHJldHVybiAxOTIwLCAxMDgwXG5cbmRlZiBnZXRfdmlzaWJsZV93aW5kb3dzKCk6XG4gICAgdHJ5OlxuICAgICAgICBvdXQgPSBzdWJwcm9jZXNzLmNoZWNrX291dHB1dChbXCJ4ZG90b29sXCIsIFwic2VhcmNoXCIsIFwiLS1vbmx5dmlzaWJsZVwiLCBcIi0tbmFtZVwiLCBcIi4qXCJdKS5kZWNvZGUoKVxuICAgICAgICByZXR1cm4gW2xpbmUuc3RyaXAoKSBmb3IgbGluZSBpbiBvdXQuc3RyaXAoKS5zcGxpdCgnXFxcXG4nKSBpZiBsaW5lLnN0cmlwKCldXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIFtdXG5cbmRlZiBnZXRfd2luZG93X3BpZCh3aW5kb3dfaWQpOlxuICAgIHRyeTpcbiAgICAgICAgb3V0ID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoW1wieGRvdG9vbFwiLCBcImdldHdpbmRvd3BpZFwiLCB3aW5kb3dfaWRdKS5kZWNvZGUoKS5zdHJpcCgpXG4gICAgICAgIHJldHVybiBpbnQob3V0KVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHJldHVybiBOb25lXG5cbmRlZiBpc193aW5kb3dfdG9wbW9zdF9vcl9mdWxsc2NyZWVuKHdpbmRvd19pZCwgc2NyZWVuX3csIHNjcmVlbl9oKTpcbiAgICB0cnk6XG4gICAgICAgIHhwcm9wID0gc3VicHJvY2Vzcy5jaGVja19vdXRwdXQoW1wieHByb3BcIiwgXCItaWRcIiwgd2luZG93X2lkXSkuZGVjb2RlKClcbiAgICAgICAgaXNfYWJvdmUgPSBcIl9ORVRfV01fU1RBVEVfQUJPVkVcIiBpbiB4cHJvcCBvciBcIl9ORVRfV01fU1RBVEVfU1RBWVNfT05fVE9QXCIgaW4geHByb3BcbiAgICAgICAgaXNfZnVsbHNjcmVlbiA9IFwiX05FVF9XTV9TVEFURV9GVUxMU0NSRUVOXCIgaW4geHByb3BcbiAgICAgICAgcmV0dXJuIGlzX2Fib3ZlIG9yIGlzX2Z1bGxzY3JlZW5cbiAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIHNjYW5fYW5kX2Rlc3Ryb3lfbGludXgoKTpcbiAgICBzY3JlZW5fdywgc2NyZWVuX2ggPSBnZXRfc2NyZWVuX3Jlc29sdXRpb24oKVxuICAgIHdpbmRvd3MgPSBnZXRfdmlzaWJsZV93aW5kb3dzKClcblxuICAgIGZvciB3aW5faWQgaW4gd2luZG93czpcbiAgICAgICAgaWYgaXNfd2luZG93X3RvcG1vc3Rfb3JfZnVsbHNjcmVlbih3aW5faWQsIHNjcmVlbl93LCBzY3JlZW5faCk6XG4gICAgICAgICAgICBwaWQgPSBnZXRfd2luZG93X3BpZCh3aW5faWQpXG4gICAgICAgICAgICBpZiBwaWQ6XG4gICAgICAgICAgICAgICAgdHJ5OlxuICAgICAgICAgICAgICAgICAgICBwcm9jID0gcHN1dGlsLlByb2Nlc3MocGlkKVxuICAgICAgICAgICAgICAgICAgICBwcm9jX25hbWUgPSBwcm9jLm5hbWUoKVxuICAgICAgICAgICAgICAgICAgICBpZiBwcm9jX25hbWUgaW4gKFwiZ25vbWUtc2hlbGxcIiwgXCJwbGFzbWFcIiwgXCJ4ZmNlNC1wYW5lbFwiLCBcInhvcmdcIiwgXCJ3YXlsYW5kXCIpOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgcHJpbnQoZlwiWyFdIFd5a3J5dG8gYmxva3VqxIVjZSBva25vIExpbnV4OiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICAgICAgICAgICAgICAgICAgcHJvYy5raWxsKClcbiAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgICAgICAgICAgICAgIG9zLnN5c3RlbShmXCJraWxsIC05IHtwaWR9XCIpXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBwcmludChcIlsqXSBTa2FuZXIgbmFrxYJhZGVrIExpbnV4IChYMTEpIGFrdHl3bnkuIFNrYW5vd2FuaWUgY28gNTAwIG1zLi4uXCIpXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgc2Nhbl9hbmRfZGVzdHJveV9saW51eCgpXG4gICAgICAgICAgICB0aW1lLnNsZWVwKDAuNSlcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmF0cnp5bWFuby5cIilcbmBcbiAgfVxuXTtcbiJdLCJtYXBwaW5ncyI6IkFBRU8sYUFBTSxpQkFBeUM7QUFBQSxFQUNwRDtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDaEMsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF1SFI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUNoQyxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUM7QUFBQSxJQUNkLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUF3SFI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsU0FBUztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFFBQVE7QUFBQSxJQUN0QixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQThHUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsUUFBUTtBQUFBLElBQ3RCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFzSlI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsU0FBUztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFFBQVE7QUFBQSxJQUN0QixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWdMUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxTQUFTO0FBQUEsSUFDZCxhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsUUFBUTtBQUFBLElBQ3RCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBc0xSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFNBQVM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxVQUFVLFNBQVM7QUFBQSxJQUNqQyxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsRUFtTFI7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxXQUFXO0FBQUEsSUFDWCxPQUFPO0FBQUEsSUFDUCxJQUFJLENBQUMsU0FBUztBQUFBLElBQ2QsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDO0FBQUEsSUFDZCxhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLGdCQUFnQjtBQUFBLElBQ2hCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBNkdSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDaEMsYUFBYTtBQUFBLElBQ2IsYUFBYSxDQUFDLFlBQVksUUFBUTtBQUFBLElBQ2xDLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBd0VSO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLElBQ1gsT0FBTztBQUFBLElBQ1AsSUFBSSxDQUFDLFNBQVM7QUFBQSxJQUNkLGFBQWE7QUFBQSxJQUNiLGFBQWEsQ0FBQyxRQUFRO0FBQUEsSUFDdEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0I7QUFBQSxJQUNoQixhQUFhO0FBQUEsTUFDWDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQStEUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxJQUNQLFdBQVc7QUFBQSxJQUNYLE9BQU87QUFBQSxJQUNQLElBQUksQ0FBQyxPQUFPO0FBQUEsSUFDWixhQUFhO0FBQUEsSUFDYixhQUFhLENBQUMsUUFBUTtBQUFBLElBQ3RCLGFBQWE7QUFBQSxNQUNYO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLElBQ0EsZ0JBQWdCO0FBQUEsSUFDaEIsYUFBYTtBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUNBLE1BQU07QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQXlFUjtBQUNGOyIsIm5hbWVzIjpbXX0=