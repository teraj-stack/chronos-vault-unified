export function generateCustomPythonScript(config) {
  const isPeCorruption = config.action === "corrupt_pe" || config.action === "hybrid_sabotage";
  const isAclLockout = config.action === "acl_lockout" || config.action === "hybrid_sabotage";
  const peMethod = config.peCorruptionMethod || "zero_mz_and_pe";
  const inheritanceStrip = config.aclInheritanceRemoval !== false;
  if (config.os === "linux") {
    return `"""
=============================================================================
NIESTANDARDOWY SKRYPT PYTHON - LINUX FLUTTER OVERLAY KILLER & SABOTAŻ ELF (100% OFFLINE)
=============================================================================
Konfiguracja:
- Interwał sprawdzania: ${config.pollIntervalMs} ms
- Akcja: ${config.action === "corrupt_pe" ? "Trwałe uszkodzenie nagłówka ELF (Magic Byte Zeroing \\x7fELF)" : config.action === "acl_lockout" ? "Blokada uprawnień systemu plików (chmod 000 + chattr +i)" : config.action === "hybrid_sabotage" ? "Hybrydowy Sabotaż: Freeze (SIGSTOP) + Uszkodzenie ELF + chmod 000" : config.action === "quarantine_lock" ? "Kwarantanna (chmod 000 + SIGSTOP + SIGKILL)" : config.action === "suspend" ? "Zamrożenie procesu (SIGSTOP)" : "Zabicie procesu (SIGKILL)"}
=============================================================================
Instalacja narzędzi:
  sudo apt install xdotool wmctrl x11-utils
  pip install psutil
=============================================================================
"""
import subprocess
import time
import psutil
import os
import sys

WHITELIST = set(${JSON.stringify(config.whitelist)})
KEYWORDS = ${JSON.stringify(config.processKeywords)}

def corrupt_elf_header(file_path):
    """Trwale niszczy nagłówek ELF pliku binarnego Linux (Magic Bytes \\x7fELF)."""
    if not file_path or not os.path.exists(file_path):
        return False
    try:
        with open(file_path, "r+b") as f:
            magic = f.read(4)
            if magic == b"\\x7fELF":
                f.seek(0)
                # Zerowanie nagłówka ELF i pierwszego 1 KB pliku
                f.write(b"\\x00" * 1024)
                f.flush()
                print(f"[+] [SABOTAŻ ELF] Zniszczono nagłówek binarny pliku: {file_path}")
                print(f"    System Linux odrzuci próbę uruchomienia z błędem 'Exec format error' (ENOEXEC).")
                return True
    except Exception as e:
        print(f"[-] Błąd uszkadzania nagłówka ELF: {e}")
    return False

def lock_file_permissions(file_path):
    """Blokuje uprawnienia do pliku binarnego na poziomie systemu plików."""
    if not file_path or not os.path.exists(file_path):
        return False
    try:
        # 1. Odebranie wszelkich uprawnień (rwx) dla wszystkich użytkowników
        os.chmod(file_path, 0o000)
        print(f"[+] [BLOKADA ACL] Nadano uprawnienia chmod 000 dla: {file_path}")
        
        # 2. Próba nadania atrybutu immutable (niezmienny)
        try:
            subprocess.run(["chattr", "+i", file_path], stderr=subprocess.DEVNULL, stdout=subprocess.DEVNULL)
            print(f"[+] [IMMUTABLE] Nadano atrybut 'chattr +i' (plik zablokowany przed modyfikacją).")
        except Exception:
            pass
        return True
    except Exception as e:
        print(f"[-] Błąd blokowania uprawnień: {e}")
        return False

def process_action(proc):
    pid = proc.info['pid']
    name = proc.info['name']
    print("=" * 65)
    print(f"[!] WYKRYTO FLUTTERA / MALWARE: PID {pid} ({name})")
    
    ${config.action === "corrupt_pe" ? `try:
        proc.suspend()
        exe_path = proc.exe()
        corrupt_elf_header(exe_path)
        proc.kill()
        print(f"[+] [SUKCES] Plik {name} trwale uszkodzony i proces PID {pid} zabity.")
    except Exception as e:
        print(f"[-] Błąd akcji: {e}")` : config.action === "acl_lockout" ? `try:
        proc.suspend()
        exe_path = proc.exe()
        lock_file_permissions(exe_path)
        proc.kill()
        print(f"[+] [SUKCES] Uprawnienia pliku {name} zablokowane i proces PID {pid} zabity.")
    except Exception as e:
        print(f"[-] Błąd akcji: {e}")` : config.action === "hybrid_sabotage" ? `try:
        proc.suspend()
        print(f"[+] [1. FREEZE] Proces PID {pid} zamrożony w RAM.")
        exe_path = proc.exe()
        corrupt_elf_header(exe_path)
        lock_file_permissions(exe_path)
        proc.kill()
        print(f"[+] [SUKCES] Pełny sabotaż i likwidacja procesu {name} zakończona sukcesem.")
    except Exception as e:
        print(f"[-] Błąd akcji: {e}")` : config.action === "quarantine_lock" ? `try:
        proc.suspend()
        exe_path = proc.exe()
        lock_file_permissions(exe_path)
        proc.kill()
        print(f"[+] [SUKCES] Kwarantanna i zabicie PID {pid}")
    except Exception as e:
        os.system(f"kill -9 {pid}")` : config.action === "suspend" ? `proc.suspend()
    print(f"[+] [ZAMROŻONO] Wstrzymano proces (SIGSTOP) PID {pid}")` : `proc.kill()
    print(f"[+] [ZLIKWIDOWANO] Zabito proces PID {pid}")`}
    print("=" * 65)

def kill_flutter_overlay():
    for proc in psutil.process_iter(['pid', 'name', 'cmdline']):
        try:
            name = proc.info['name'].lower()
            cmdline = " ".join(proc.info['cmdline'] or []).lower()

            if name in WHITELIST:
                continue

            matches_keyword = any(k in name or k in cmdline for k in KEYWORDS)
            if matches_keyword:
                process_action(proc)
        except (psutil.NoSuchProcess, psutil.AccessDenied):
            pass

if __name__ == "__main__":
    print("[*] Skaner Linux aktywny (100% OFFLINE). Interwał: ${config.pollIntervalMs} ms...")
    try:
        while True:
            kill_flutter_overlay()
            time.sleep(${config.pollIntervalMs / 1e3})
    except KeyboardInterrupt:
        print("\\n[*] Zatrzymano.")
`;
  }
  return `"""
=============================================================================
SPERSONALIZOWANY STRAŻNIK ANTY-OVERLAY & ANTY-MALWARE (WINDOWS)
TRWAŁY SABOTAŻ PLIKU WYKONYWALNEGO (PE HEADER CORRUPTION & ACL LOCKOUT)
=============================================================================
Tryb pracy: 100% OFFLINE (Brak połączeń sieciowych, pełna integralność lokalna)
Konfiguracja:
- Wykrywanie TopMost: ${config.checkTopMostFlag ? "TAK" : "NIE"}
- Wykrywanie Pełnego Ekranu: ${config.checkFullScreenBounds ? "TAK" : "NIE"}
- Skanowanie DLL Fluttera: ${config.checkFlutterDlls ? "TAK" : "NIE"}
- Akcja Defensywna: ${config.action === "corrupt_pe" ? "TRWAŁE USZKODZENIE NAGŁÓWKA PE (DOS MZ & PE Signature Invalidation)" : config.action === "acl_lockout" ? "BLOKADA ACL (icacls /inheritance:r /deny Everyone:(F,X,R,W))" : config.action === "hybrid_sabotage" ? "HYBRYDOWY PANCERNY SABOTAŻ (Freeze RAM + Uszkodzenie PE + Blokada ACL + IFEO)" : config.action === "quarantine_lock" ? "UNIERUCHOMIENIE & KWARANTANNA (Freeze RAM + icacls + IFEO)" : config.action.toUpperCase()}
- Metoda Sabotażu PE: ${peMethod === "zero_mz_and_pe" ? "Zerowanie sygnatury MZ (0x5A4D) i offsetu PE w nagłówku" : peMethod === "random_urandom" ? "Kryptograficzne nadpisanie pierwszego 1 KB nagłówka (os.urandom)" : "Wyczyszczenie pierwszego 1024 bajtów zerami (0x00)"}
- Usunięcie dziedziczenia ACL: ${inheritanceStrip ? "TAK (/inheritance:r)" : "NIE"}
- Blokada rejestru IFEO (Anti-Respawn): ${config.enableIfeoBlock ? "TAK" : "NIE"}
- Interwał skanowania: ${config.pollIntervalMs} ms
=============================================================================
Uruchomienie w wierszu poleceń jako Administrator:
  python custom_overlay_sentinel.py
=============================================================================
"""
import time
import os
import sys
import struct
import ctypes
from ctypes import wintypes
import psutil
${config.hotkey ? "import keyboard\n" : ""}
user32 = ctypes.windll.user32
kernel32 = ctypes.windll.kernel32
ntdll = ctypes.windll.ntdll
advapi32 = ctypes.windll.advapi32

# Stałe Win32 API
GWL_EXSTYLE = -20
WS_EX_TOPMOST = 0x00000008
SW_MINIMIZE = 6
HWND_NOTOPMOST = -2
SWP_NOSIZE = 0x0001
SWP_NOMOVE = 0x0002
SWP_SHOWWINDOW = 0x0040
PROCESS_TERMINATE = 0x0001
PROCESS_SUSPEND_RESUME = 0x0800
PROCESS_QUERY_LIMITED_INFORMATION = 0x1000

# Bezpieczne pobieranie funkcji stylu okna (kompatybilność x86 / x64)
if hasattr(user32, "GetWindowLongPtrW"):
    GetWindowLongPtr = user32.GetWindowLongPtrW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LPARAM
else:
    GetWindowLongPtr = user32.GetWindowLongW
    GetWindowLongPtr.argtypes = [wintypes.HWND, ctypes.c_int]
    GetWindowLongPtr.restype = wintypes.LONG

# Biała lista procesów chronionych przed jakimkolwiek sabotażem
WHITELIST = set(${JSON.stringify(config.whitelist.map((w) => w.toLowerCase()))})

# Słowa kluczowe procesów i biblioteki Fluttera
FLUTTER_MODULES = {"flutter_windows.dll", "flutter_engine.dll", "flutter_embedder.dll"}
PROCESS_KEYWORDS = ${JSON.stringify(config.processKeywords.map((k) => k.toLowerCase()))}

def get_screen_size():
    return user32.GetSystemMetrics(0), user32.GetSystemMetrics(1)

def is_topmost_window(hwnd):
    try:
        ex_style = GetWindowLongPtr(hwnd, GWL_EXSTYLE)
        return bool(ex_style & WS_EX_TOPMOST)
    except Exception:
        return False

def is_fullscreen_window(hwnd, screen_w, screen_h):
    rect = wintypes.RECT()
    if user32.GetWindowRect(hwnd, ctypes.byref(rect)):
        w = rect.right - rect.left
        h = rect.bottom - rect.top
        return (w >= screen_w * 0.9 and h >= screen_h * 0.9), w, h
    return False, 0, 0

def inspect_process(hwnd):
    pid = wintypes.DWORD()
    user32.GetWindowThreadProcessId(hwnd, ctypes.byref(pid))
    if pid.value == 0:
        return None, None
    try:
        proc = psutil.Process(pid.value)
        return pid.value, proc
    except Exception:
        return pid.value, None

def get_exe_path(pid):
    """Pobiera pełną ścieżkę do pliku wykonywalnego na dysku."""
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

def freeze_process_threads(pid):
    """Błyskawicznie zamraża wszystkie wątki procesu w pamięci RAM."""
    h = kernel32.OpenProcess(PROCESS_SUSPEND_RESUME, False, pid)
    if h:
        ntdll.NtSuspendProcess(h)
        kernel32.CloseHandle(h)
        return True
    return False

# =============================================================================
# MODUŁ 1: TRWAŁE USZKADZANIE NAGŁÓWKA PE (DOS MZ & PE HEADER CORRUPTION)
# =============================================================================
def corrupt_pe_header(exe_path):
    """
    Trwale niszczy strukturę Portable Executable (PE) pliku wykonywalnego na dysku.
    Zeruje sygnaturę DOS 'MZ' (0x5A4D), wskaźnik e_lfanew (0x3C) oraz sygnaturę PE 'PE\\0\\0'.
    
    REZULTAT:
    System Windows PE Loader (ntdll.dll!LdrpInitializeProcess) przy jakiejkolwiek
    próbie uruchomienia zwróci błąd krytyczny STATUS_INVALID_IMAGE_FORMAT (0xC000007B)
    z komunikatem: 'Ta aplikacja nie może działać na Twoim komputerze'.
    Plik staje się w 100% bezużyteczny i niemożliwy do uruchomienia.
    """
    if not exe_path or not os.path.exists(exe_path):
        print(f"[-] [SABOTAŻ PE] Plik nie istnieje lub brak ścieżki: {exe_path}")
        return False

    try:
        # Zdejmij atrybuty tylko-do-odczytu/ukryty jeśli istnieją
        kernel32.SetFileAttributesW(exe_path, 0x80) # FILE_ATTRIBUTE_NORMAL
        
        with open(exe_path, "r+b") as f:
            # 1. Sprawdź sygnaturę DOS (0x00 - 0x02)
            f.seek(0)
            dos_magic = f.read(2)
            if dos_magic != b"MZ":
                print(f"[!] [SABOTAŻ PE] Plik nie posiada sygnatury MZ lub został już wcześniej uszkodzony.")
            
            # 2. Odczytaj offset nagłówka PE (e_lfanew pod adresem 0x3C)
            f.seek(0x3C)
            e_lfanew_bytes = f.read(4)
            pe_offset = 0
            if len(e_lfanew_bytes) == 4:
                pe_offset = struct.unpack("<I", e_lfanew_bytes)[0]

            # 3. Zastosuj wybraną metodę zniszczenia nagłówka
            ${peMethod === "random_urandom" ? `f.seek(0)
            # Nadpisanie pierwszych 2048 bajtów losowymi śmieciami kryptograficznymi
            garbage = os.urandom(2048)
            f.write(garbage)
            f.flush()` : peMethod === "wipe_first_1kb" ? `f.seek(0)
            # Wyzerowanie całego bloku nagłówków DOS i NT (1024 bajty)
            f.write(b"\\x00" * 1024)
            f.flush()` : `# Precyzyjny sabotaż:
            # a) Zniszcz sygnaturę DOS MZ (zamiana na \\x00\\x00 lub \\xDE\\xAD)
            f.seek(0)
            f.write(b"\\xDE\\xAD")
            
            # b) Zniszcz wskaźnik do nagłówka PE pod adresem 0x3C
            f.seek(0x3C)
            f.write(b"\\xFF\\xFF\\xFF\\xFF")
            
            # c) Jeśli zlokalizowano nagłówek PE, nadpisz sygnaturę 'PE\\0\\0' (0x50 0x45 0x00 0x00)
            if 0 < pe_offset < 1048576:
                try:
                    f.seek(pe_offset)
                    f.write(b"\\x00\\x00\\x00\\x00\\xFF\\xFF\\xFF\\xFF")
                except Exception:
                    pass
            
            # d) Nadpisz pierwsze 512 bajtów zerami
            f.seek(2)
            f.write(b"\\x00" * 510)
            f.flush()`}

        print(f"[+] [SUKCES - SABOTAŻ PE] Pomyślnie zniszczono nagłówek PE pliku: {exe_path}")
        print(f"    [!] Loader Windows (LdrpInitializeProcess) odrzuci plik z błędem 0xC000007B (STATUS_INVALID_IMAGE_FORMAT).")
        return True
    except PermissionError:
        print(f"[-] [SABOTAŻ PE] Plik zablokowany przez proces. Próba wymuszenia po zabiciu wątków...")
        return False
    except Exception as e:
        print(f"[-] [SABOTAŻ PE] Błąd podczas modyfikacji binarnej: {e}")
        return False

# =============================================================================
# MODUŁ 2: BLOKADA UPRAWNIEŃ SYSTEMU PLIKÓW (ACL / DACL LOCKOUT)
# =============================================================================
def lock_file_acl(exe_path):
    """
    Definitywnie blokuje uprawnienia na poziomie Access Control List (DACL) w NTFS.
    Odbiera uprawnienia do uruchamiania (Execute), odczytu (Read), zapisu (Write)
    i pełnej kontroli dla wszystkich użytkowników (SID S-1-1-0 / Everyone / Wszyscy)
    oraz zeruje dziedziczenie uprawnień.
    """
    if not exe_path or not os.path.exists(exe_path):
        return False

    try:
        print(f"[*] [BLOKADA ACL] Konfiguracja restrykcji NTFS dla: {exe_path}")
        
        # 1. Usunięcie dziedziczenia uprawnień (izolacja obiektu)
        ${inheritanceStrip ? `cmd_inherit = f'icacls "{exe_path}" /inheritance:r >nul 2>&1'
        os.system(cmd_inherit)` : ""}

        # 2. Nadanie explicite reguły DENY dla grupy Wszyscy (SID: *S-1-1-0 / Everyone)
        # Uprawnienia: F = Pełna kontrola, X = Wykonywanie, R = Odczyt, W = Zapis
        cmd_deny = f'icacls "{exe_path}" /deny *S-1-1-0:(F,X,R,W) >nul 2>&1'
        os.system(cmd_deny)

        # 3. Dodatkowa blokada przez standardową nazwę grupy Everyone
        os.system(f'icacls "{exe_path}" /deny Everyone:(F,X,R,W) >nul 2>&1')

        # 4. Ustawienie atrybutów systemowych (Ukryty + Systemowy + Tylko do odczytu)
        kernel32.SetFileAttributesW(exe_path, 0x01 | 0x02 | 0x04) # READONLY | HIDDEN | SYSTEM

        print(f"[+] [SUKCES - BLOKADA ACL] Uprawnienia pliku zostały odcięte (Access Denied).")
        print(f"    Żaden użytkownik ani proces potomny nie może odczytać ani uruchomić tego pliku.")
        return True
    except Exception as e:
        print(f"[-] [BLOKADA ACL] Błąd konfiguracji ACL: {e}")
        return False

def block_via_ifeo(proc_name):
    """Rejestruje atrapę debuggera w Image File Execution Options (IFEO)."""
    try:
        cmd = f'reg add "HKLM\\\\SOFTWARE\\\\Microsoft\\\\Windows NT\\\\CurrentVersion\\\\Image File Execution Options\\\\{proc_name}" /v Debugger /t REG_SZ /d "systray.exe" /f >nul 2>&1'
        os.system(cmd)
        print(f"[+] [IFEO LOCK] Dodano wpis rejestru blokujący autostart '{proc_name}'.")
    except Exception:
        pass

def check_flutter_signatures(proc):
    if not proc:
        return False, ""
    try:
        name = proc.name().lower()
        if name in WHITELIST:
            return False, "whitelist"
        
        if any(k in name for k in PROCESS_KEYWORDS):
            return True, f"Nazwa procesu '{name}'"

        cmdline = " ".join(proc.cmdline() or []).lower()
        if any(k in cmdline for k in PROCESS_KEYWORDS):
            return True, f"Wiersz poleceń: '{cmdline}'"

        ${config.checkFlutterDlls ? `if hasattr(proc, "memory_maps"):
            for mm in proc.memory_maps():
                dll = os.path.basename(mm.path).lower()
                if dll in FLUTTER_MODULES:
                    return True, f"Załadowana biblioteka silnika Fluttera: {dll}"` : ""}
    except Exception:
        pass
    return False, ""

def neutralize_overlay(hwnd, pid, proc_name, reason):
    print("=" * 70)
    print(f"[!] WYKRYTO BLOKUJĄCY PROCES MALWARE / OVERLAY!")
    print(f"    Proces : {proc_name} (PID: {pid})")
    print(f"    Powód  : {reason}")
    ${config.playAlertSound ? "ctypes.windll.user32.MessageBeep(0xFFFFFFFF)\n" : ""}
    
    # 1. Natychmiastowe ukrycie i minimalizacja okna z pulpitu
    try:
        user32.ShowWindow(hwnd, 0)
        user32.SetWindowPos(hwnd, 1, 0, 0, 0, 0, 0x0001 | 0x0002 | 0x0080)
    except Exception:
        pass

    ${config.action === "corrupt_pe" ? `# KROK 1: Zamrożenie wątków w pamięci RAM (NtSuspendProcess)
    freeze_process_threads(pid)
    print(f"[+] [1. FREEZE] Wszystkie wątki PID {pid} zostały zatrzymane w pamięci RAM.")

    # KROK 2: Pobranie ścieżki do pliku na dysku
    exe_file = get_exe_path(pid)

    # KROK 3: Zabicie procesu w pamięci, aby zwolnić uchwyt do pliku na dysku
    try:
        p = psutil.Process(pid)
        p.kill()
        time.sleep(0.05)
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

    # KROK 4: TRWAŁE USZKODZENIE NAGŁÓWKA PE
    if exe_file:
        corrupt_pe_header(exe_file)

    print(f"[+] [SUKCES] Zlikwidowano proces {proc_name} i unieszkodliwiono plik binarany na dysku.")` : config.action === "acl_lockout" ? `# KROK 1: Zamrożenie wątków w RAM
    freeze_process_threads(pid)
    print(f"[+] [1. FREEZE] Zamrożono wątki PID {pid}.")

    # KROK 2: Pobranie ścieżki
    exe_file = get_exe_path(pid)

    # KROK 3: BLOKADA UPRAWNIEŃ ACL (icacls Deny)
    if exe_file:
        lock_file_acl(exe_file)

    # KROK 4: Zabicie procesu
    try:
        p = psutil.Process(pid)
        p.kill()
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

    print(f"[+] [SUKCES] Uprawnienia pliku {proc_name} zostały całkowicie zablokowane.")` : config.action === "hybrid_sabotage" ? `# KROK 1: Błyskawiczne zamrożenie w RAM
    freeze_process_threads(pid)
    print(f"[+] [1. FREEZE] Zamrożono proces PID {pid} w pamięci RAM (NtSuspendProcess).")

    # KROK 2: Pobranie ścieżki do pliku wykonywalnego
    exe_file = get_exe_path(pid)

    # KROK 3: Zakończenie procesu w celu odblokowania uchwytu
    try:
        p = psutil.Process(pid)
        p.kill()
        time.sleep(0.05)
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")

    # KROK 4: USZKODZENIE NAGŁÓWKA PE + BLOKADA ACL + IFEO
    if exe_file:
        corrupt_pe_header(exe_file)
        lock_file_acl(exe_file)
    
    ${config.enableIfeoBlock ? "block_via_ifeo(proc_name)\n" : ""}
    print(f"[+] [SUKCES] Wykonano pełny potrójny sabotaż (PE Header Zeroing + ACL Deny + IFEO)!")` : config.action === "quarantine_lock" ? `# 1. ZAMROŻENIE WĄTKÓW (Freeze w RAM)
    freeze_process_threads(pid)
    print(f"[+] [ZAMROŻONO] Wszystkie wątki procesu PID {pid} są zatrzymane.")

    # 2. KWARANTANNA PLIKU NA DYSKU
    exe_file = get_exe_path(pid)
    if exe_file and os.path.exists(exe_file):
        try:
            # Zmiana nazwy na .quarantined_lock
            os.rename(exe_file, exe_file + ".quarantined_lock")
            print(f"[+] [KWARANTANNA] Zmieniono nazwę: {exe_file}.quarantined_lock")
        except Exception:
            # Fallback - odebranie uprawnień do uruchomienia
            lock_file_acl(exe_file)

    # 3. BLOKADA W REJESTRZE WINDOWS (IFEO)
    ${config.enableIfeoBlock ? `block_via_ifeo(proc_name)` : ""}

    # 4. DEFINITYWNE ZABICIE PROCESU
    try:
        p = psutil.Process(pid)
        p.kill()
        print(f"[+] [SUKCES] Zlikwidowano proces {proc_name} (PID: {pid})")
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")` : config.action === "suspend" ? `freeze_process_threads(pid)
    print(f"[+] [SUKCES] Proces PID {pid} został trwale ZAMROŻONY w pamięci RAM.")` : config.action === "strip_topmost" ? `user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_SHOWWINDOW)
    user32.ShowWindow(hwnd, SW_MINIMIZE)
    print(f"[+] [SUKCES] Zdjęto atrybut TOPMOST i zminimalizowano okno!")` : config.action === "minimize" ? `user32.ShowWindow(hwnd, SW_MINIMIZE)
    print(f"[+] [SUKCES] Zminimalizowano okno nakładki.")` : `try:
        p = psutil.Process(pid)
        p.kill()
        print(f"[+] [SUKCES] Proces {proc_name} (PID: {pid}) został natychmiast ZABITY!")
    except Exception:
        os.system(f"taskkill /F /PID {pid} >nul 2>&1")`}
    print("=" * 70)

def scan_windows():
    screen_w, screen_h = get_screen_size()

    def callback(hwnd, lparam):
        if not user32.IsWindowVisible(hwnd):
            return True
        if hwnd in (user32.GetDesktopWindow(), user32.GetShellWindow()):
            return True

        pid, proc = inspect_process(hwnd)
        if not proc:
            return True

        proc_name = proc.name().lower()
        if proc_name in WHITELIST:
            return True

        is_top = is_topmost_window(hwnd) if ${config.checkTopMostFlag} else False
        is_full, w, h = is_fullscreen_window(hwnd, screen_w, screen_h) if ${config.checkFullScreenBounds} else (False, 0, 0)
        is_flt, flt_reason = check_flutter_signatures(proc)

        if (is_top and is_full) or (is_flt and (is_top or is_full)) or (is_flt and "flutter" in proc_name):
            reason = f"TopMost={is_top}, Fullscreen={is_full} ({w}x{h})"
            if is_flt:
                reason += f" | {flt_reason}"
            neutralize_overlay(hwnd, pid, proc_name, reason)

        return True

    EnumProc = ctypes.WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
    user32.EnumWindows(EnumProc(callback), 0)

${config.hotkey ? `def on_panic_hotkey():
    print("\\n[!] Wciśnięto skrót awaryjny (${config.hotkey})! Błyskawiczny skan...")
    scan_windows()
` : ""}
if __name__ == "__main__":
    print("[*] ==========================================================================")
    print("[*] ANTY-OVERLAY SENTINEL: PE CORRUPTOR & ACL DEFENSE (100% OFFLINE)")
    print(f"[*] Interwał skanowania : ${config.pollIntervalMs} ms.")
    print(f"[*] Tryb reakcji        : ${config.action.toUpperCase()}")
    ${config.hotkey ? `print(f"[*] Skrót awaryjny      : [${config.hotkey.toUpperCase()}]")
    keyboard.add_hotkey("${config.hotkey}", on_panic_hotkey)` : ""}
    print("[*] Naciśnij Ctrl+C aby zatrzymać.")
    print("[*] ==========================================================================")
    
    try:
        while True:
            scan_windows()
            time.sleep(${config.pollIntervalMs / 1e3})
    except KeyboardInterrupt:
        print("\\n[*] Zakończono monitorowanie.")
`;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImN1c3RvbVNjcmlwdEJ1aWxkZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NyaXB0T3B0aW9uQ29uZmlnIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVDdXN0b21QeXRob25TY3JpcHQoY29uZmlnOiBTY3JpcHRPcHRpb25Db25maWcpOiBzdHJpbmcge1xuICBjb25zdCBpc1BlQ29ycnVwdGlvbiA9IGNvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJyB8fCBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJztcbiAgY29uc3QgaXNBY2xMb2Nrb3V0ID0gY29uZmlnLmFjdGlvbiA9PT0gJ2FjbF9sb2Nrb3V0JyB8fCBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJztcbiAgY29uc3QgcGVNZXRob2QgPSBjb25maWcucGVDb3JydXB0aW9uTWV0aG9kIHx8ICd6ZXJvX216X2FuZF9wZSc7XG4gIGNvbnN0IGluaGVyaXRhbmNlU3RyaXAgPSBjb25maWcuYWNsSW5oZXJpdGFuY2VSZW1vdmFsICE9PSBmYWxzZTtcblxuICBpZiAoY29uZmlnLm9zID09PSAnbGludXgnKSB7XG4gICAgcmV0dXJuIGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5OSUVTVEFOREFSRE9XWSBTS1JZUFQgUFlUSE9OIC0gTElOVVggRkxVVFRFUiBPVkVSTEFZIEtJTExFUiAmIFNBQk9UQcW7IEVMRiAoMTAwJSBPRkZMSU5FKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbktvbmZpZ3VyYWNqYTpcbi0gSW50ZXJ3YcWCIHNwcmF3ZHphbmlhOiAke2NvbmZpZy5wb2xsSW50ZXJ2YWxNc30gbXNcbi0gQWtjamE6ICR7XG4gICAgICBjb25maWcuYWN0aW9uID09PSAnY29ycnVwdF9wZSdcbiAgICAgICAgPyAnVHJ3YcWCZSB1c3prb2R6ZW5pZSBuYWfFgsOzd2thIEVMRiAoTWFnaWMgQnl0ZSBaZXJvaW5nIFxcXFx4N2ZFTEYpJ1xuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdhY2xfbG9ja291dCdcbiAgICAgICAgPyAnQmxva2FkYSB1cHJhd25pZcWEIHN5c3RlbXUgcGxpa8OzdyAoY2htb2QgMDAwICsgY2hhdHRyICtpKSdcbiAgICAgICAgOiBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJ1xuICAgICAgICA/ICdIeWJyeWRvd3kgU2Fib3Rhxbw6IEZyZWV6ZSAoU0lHU1RPUCkgKyBVc3prb2R6ZW5pZSBFTEYgKyBjaG1vZCAwMDAnXG4gICAgICAgIDogY29uZmlnLmFjdGlvbiA9PT0gJ3F1YXJhbnRpbmVfbG9jaydcbiAgICAgICAgPyAnS3dhcmFudGFubmEgKGNobW9kIDAwMCArIFNJR1NUT1AgKyBTSUdLSUxMKSdcbiAgICAgICAgOiBjb25maWcuYWN0aW9uID09PSAnc3VzcGVuZCdcbiAgICAgICAgPyAnWmFtcm/FvGVuaWUgcHJvY2VzdSAoU0lHU1RPUCknXG4gICAgICAgIDogJ1phYmljaWUgcHJvY2VzdSAoU0lHS0lMTCknXG4gICAgfVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbkluc3RhbGFjamEgbmFyesSZZHppOlxuICBzdWRvIGFwdCBpbnN0YWxsIHhkb3Rvb2wgd21jdHJsIHgxMS11dGlsc1xuICBwaXAgaW5zdGFsbCBwc3V0aWxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cIlwiXCJcbmltcG9ydCBzdWJwcm9jZXNzXG5pbXBvcnQgdGltZVxuaW1wb3J0IHBzdXRpbFxuaW1wb3J0IG9zXG5pbXBvcnQgc3lzXG5cbldISVRFTElTVCA9IHNldCgke0pTT04uc3RyaW5naWZ5KGNvbmZpZy53aGl0ZWxpc3QpfSlcbktFWVdPUkRTID0gJHtKU09OLnN0cmluZ2lmeShjb25maWcucHJvY2Vzc0tleXdvcmRzKX1cblxuZGVmIGNvcnJ1cHRfZWxmX2hlYWRlcihmaWxlX3BhdGgpOlxuICAgIFwiXCJcIlRyd2FsZSBuaXN6Y3p5IG5hZ8WCw7N3ZWsgRUxGIHBsaWt1IGJpbmFybmVnbyBMaW51eCAoTWFnaWMgQnl0ZXMgXFxcXHg3ZkVMRikuXCJcIlwiXG4gICAgaWYgbm90IGZpbGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZmlsZV9wYXRoKTpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG4gICAgdHJ5OlxuICAgICAgICB3aXRoIG9wZW4oZmlsZV9wYXRoLCBcInIrYlwiKSBhcyBmOlxuICAgICAgICAgICAgbWFnaWMgPSBmLnJlYWQoNClcbiAgICAgICAgICAgIGlmIG1hZ2ljID09IGJcIlxcXFx4N2ZFTEZcIjpcbiAgICAgICAgICAgICAgICBmLnNlZWsoMClcbiAgICAgICAgICAgICAgICAjIFplcm93YW5pZSBuYWfFgsOzd2thIEVMRiBpIHBpZXJ3c3plZ28gMSBLQiBwbGlrdVxuICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHgwMFwiICogMTAyNClcbiAgICAgICAgICAgICAgICBmLmZsdXNoKClcbiAgICAgICAgICAgICAgICBwcmludChmXCJbK10gW1NBQk9UQcW7IEVMRl0gWm5pc3pjem9ubyBuYWfFgsOzd2VrIGJpbmFybnkgcGxpa3U6IHtmaWxlX3BhdGh9XCIpXG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiICAgIFN5c3RlbSBMaW51eCBvZHJ6dWNpIHByw7NixJkgdXJ1Y2hvbWllbmlhIHogYsWCxJlkZW0gJ0V4ZWMgZm9ybWF0IGVycm9yJyAoRU5PRVhFQykuXCIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFRydWVcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIHByaW50KGZcIlstXSBCxYLEhWQgdXN6a2FkemFuaWEgbmFnxYLDs3drYSBFTEY6IHtlfVwiKVxuICAgIHJldHVybiBGYWxzZVxuXG5kZWYgbG9ja19maWxlX3Blcm1pc3Npb25zKGZpbGVfcGF0aCk6XG4gICAgXCJcIlwiQmxva3VqZSB1cHJhd25pZW5pYSBkbyBwbGlrdSBiaW5hcm5lZ28gbmEgcG96aW9taWUgc3lzdGVtdSBwbGlrw7N3LlwiXCJcIlxuICAgIGlmIG5vdCBmaWxlX3BhdGggb3Igbm90IG9zLnBhdGguZXhpc3RzKGZpbGVfcGF0aCk6XG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIHRyeTpcbiAgICAgICAgIyAxLiBPZGVicmFuaWUgd3N6ZWxraWNoIHVwcmF3bmllxYQgKHJ3eCkgZGxhIHdzenlzdGtpY2ggdcW8eXRrb3duaWvDs3dcbiAgICAgICAgb3MuY2htb2QoZmlsZV9wYXRoLCAwbzAwMClcbiAgICAgICAgcHJpbnQoZlwiWytdIFtCTE9LQURBIEFDTF0gTmFkYW5vIHVwcmF3bmllbmlhIGNobW9kIDAwMCBkbGE6IHtmaWxlX3BhdGh9XCIpXG4gICAgICAgIFxuICAgICAgICAjIDIuIFByw7NiYSBuYWRhbmlhIGF0cnlidXR1IGltbXV0YWJsZSAobmllem1pZW5ueSlcbiAgICAgICAgdHJ5OlxuICAgICAgICAgICAgc3VicHJvY2Vzcy5ydW4oW1wiY2hhdHRyXCIsIFwiK2lcIiwgZmlsZV9wYXRoXSwgc3RkZXJyPXN1YnByb2Nlc3MuREVWTlVMTCwgc3Rkb3V0PXN1YnByb2Nlc3MuREVWTlVMTClcbiAgICAgICAgICAgIHByaW50KGZcIlsrXSBbSU1NVVRBQkxFXSBOYWRhbm8gYXRyeWJ1dCAnY2hhdHRyICtpJyAocGxpayB6YWJsb2tvd2FueSBwcnplZCBtb2R5ZmlrYWNqxIUpLlwiKVxuICAgICAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICAgICAgcGFzc1xuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgcHJpbnQoZlwiWy1dIELFgsSFZCBibG9rb3dhbmlhIHVwcmF3bmllxYQ6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIHByb2Nlc3NfYWN0aW9uKHByb2MpOlxuICAgIHBpZCA9IHByb2MuaW5mb1sncGlkJ11cbiAgICBuYW1lID0gcHJvYy5pbmZvWyduYW1lJ11cbiAgICBwcmludChcIj1cIiAqIDY1KVxuICAgIHByaW50KGZcIlshXSBXWUtSWVRPIEZMVVRURVJBIC8gTUFMV0FSRTogUElEIHtwaWR9ICh7bmFtZX0pXCIpXG4gICAgXG4gICAgJHtcbiAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJ1xuICAgICAgICA/IGB0cnk6XG4gICAgICAgIHByb2Muc3VzcGVuZCgpXG4gICAgICAgIGV4ZV9wYXRoID0gcHJvYy5leGUoKVxuICAgICAgICBjb3JydXB0X2VsZl9oZWFkZXIoZXhlX3BhdGgpXG4gICAgICAgIHByb2Mua2lsbCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTXSBQbGlrIHtuYW1lfSB0cndhbGUgdXN6a29kem9ueSBpIHByb2NlcyBQSUQge3BpZH0gemFiaXR5LlwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgcHJpbnQoZlwiWy1dIELFgsSFZCBha2NqaToge2V9XCIpYFxuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdhY2xfbG9ja291dCdcbiAgICAgICAgPyBgdHJ5OlxuICAgICAgICBwcm9jLnN1c3BlbmQoKVxuICAgICAgICBleGVfcGF0aCA9IHByb2MuZXhlKClcbiAgICAgICAgbG9ja19maWxlX3Blcm1pc3Npb25zKGV4ZV9wYXRoKVxuICAgICAgICBwcm9jLmtpbGwoKVxuICAgICAgICBwcmludChmXCJbK10gW1NVS0NFU10gVXByYXduaWVuaWEgcGxpa3Uge25hbWV9IHphYmxva293YW5lIGkgcHJvY2VzIFBJRCB7cGlkfSB6YWJpdHkuXCIpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJbLV0gQsWCxIVkIGFrY2ppOiB7ZX1cIilgXG4gICAgICAgIDogY29uZmlnLmFjdGlvbiA9PT0gJ2h5YnJpZF9zYWJvdGFnZSdcbiAgICAgICAgPyBgdHJ5OlxuICAgICAgICBwcm9jLnN1c3BlbmQoKVxuICAgICAgICBwcmludChmXCJbK10gWzEuIEZSRUVaRV0gUHJvY2VzIFBJRCB7cGlkfSB6YW1yb8W8b255IHcgUkFNLlwiKVxuICAgICAgICBleGVfcGF0aCA9IHByb2MuZXhlKClcbiAgICAgICAgY29ycnVwdF9lbGZfaGVhZGVyKGV4ZV9wYXRoKVxuICAgICAgICBsb2NrX2ZpbGVfcGVybWlzc2lvbnMoZXhlX3BhdGgpXG4gICAgICAgIHByb2Mua2lsbCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTXSBQZcWCbnkgc2Fib3RhxbwgaSBsaWt3aWRhY2phIHByb2Nlc3Uge25hbWV9IHpha2/FhGN6b25hIHN1a2Nlc2VtLlwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgcHJpbnQoZlwiWy1dIELFgsSFZCBha2NqaToge2V9XCIpYFxuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdxdWFyYW50aW5lX2xvY2snXG4gICAgICAgID8gYHRyeTpcbiAgICAgICAgcHJvYy5zdXNwZW5kKClcbiAgICAgICAgZXhlX3BhdGggPSBwcm9jLmV4ZSgpXG4gICAgICAgIGxvY2tfZmlsZV9wZXJtaXNzaW9ucyhleGVfcGF0aClcbiAgICAgICAgcHJvYy5raWxsKClcbiAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIEt3YXJhbnRhbm5hIGkgemFiaWNpZSBQSUQge3BpZH1cIilcbiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6XG4gICAgICAgIG9zLnN5c3RlbShmXCJraWxsIC05IHtwaWR9XCIpYFxuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdzdXNwZW5kJ1xuICAgICAgICA/IGBwcm9jLnN1c3BlbmQoKVxuICAgIHByaW50KGZcIlsrXSBbWkFNUk/Fu09OT10gV3N0cnp5bWFubyBwcm9jZXMgKFNJR1NUT1ApIFBJRCB7cGlkfVwiKWBcbiAgICAgICAgOiBgcHJvYy5raWxsKClcbiAgICBwcmludChmXCJbK10gW1pMSUtXSURPV0FOT10gWmFiaXRvIHByb2NlcyBQSUQge3BpZH1cIilgXG4gICAgfVxuICAgIHByaW50KFwiPVwiICogNjUpXG5cbmRlZiBraWxsX2ZsdXR0ZXJfb3ZlcmxheSgpOlxuICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZScsICdjbWRsaW5lJ10pOlxuICAgICAgICB0cnk6XG4gICAgICAgICAgICBuYW1lID0gcHJvYy5pbmZvWyduYW1lJ10ubG93ZXIoKVxuICAgICAgICAgICAgY21kbGluZSA9IFwiIFwiLmpvaW4ocHJvYy5pbmZvWydjbWRsaW5lJ10gb3IgW10pLmxvd2VyKClcblxuICAgICAgICAgICAgaWYgbmFtZSBpbiBXSElURUxJU1Q6XG4gICAgICAgICAgICAgICAgY29udGludWVcblxuICAgICAgICAgICAgbWF0Y2hlc19rZXl3b3JkID0gYW55KGsgaW4gbmFtZSBvciBrIGluIGNtZGxpbmUgZm9yIGsgaW4gS0VZV09SRFMpXG4gICAgICAgICAgICBpZiBtYXRjaGVzX2tleXdvcmQ6XG4gICAgICAgICAgICAgICAgcHJvY2Vzc19hY3Rpb24ocHJvYylcbiAgICAgICAgZXhjZXB0IChwc3V0aWwuTm9TdWNoUHJvY2VzcywgcHN1dGlsLkFjY2Vzc0RlbmllZCk6XG4gICAgICAgICAgICBwYXNzXG5cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBwcmludChcIlsqXSBTa2FuZXIgTGludXggYWt0eXdueSAoMTAwJSBPRkZMSU5FKS4gSW50ZXJ3YcWCOiAke2NvbmZpZy5wb2xsSW50ZXJ2YWxNc30gbXMuLi5cIilcbiAgICB0cnk6XG4gICAgICAgIHdoaWxlIFRydWU6XG4gICAgICAgICAgICBraWxsX2ZsdXR0ZXJfb3ZlcmxheSgpXG4gICAgICAgICAgICB0aW1lLnNsZWVwKCR7Y29uZmlnLnBvbGxJbnRlcnZhbE1zIC8gMTAwMH0pXG4gICAgZXhjZXB0IEtleWJvYXJkSW50ZXJydXB0OlxuICAgICAgICBwcmludChcIlxcXFxuWypdIFphdHJ6eW1hbm8uXCIpXG5gO1xuICB9XG5cbiAgLy8gV2luZG93cyBHZW5lcmF0aW9uIHdpdGggQWR2YW5jZWQgUEUgSGVhZGVyIENvcnJ1cHRpb24gJiBBQ0wgTG9ja2Rvd25cbiAgcmV0dXJuIGBcIlwiXCJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5TUEVSU09OQUxJWk9XQU5ZIFNUUkHFu05JSyBBTlRZLU9WRVJMQVkgJiBBTlRZLU1BTFdBUkUgKFdJTkRPV1MpXG5UUldBxYFZIFNBQk9UQcW7IFBMSUtVIFdZS09OWVdBTE5FR08gKFBFIEhFQURFUiBDT1JSVVBUSU9OICYgQUNMIExPQ0tPVVQpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVHJ5YiBwcmFjeTogMTAwJSBPRkZMSU5FIChCcmFrIHBvxYLEhWN6ZcWEIHNpZWNpb3d5Y2gsIHBlxYJuYSBpbnRlZ3JhbG5vxZvEhyBsb2thbG5hKVxuS29uZmlndXJhY2phOlxuLSBXeWtyeXdhbmllIFRvcE1vc3Q6ICR7Y29uZmlnLmNoZWNrVG9wTW9zdEZsYWcgPyAnVEFLJyA6ICdOSUUnfVxuLSBXeWtyeXdhbmllIFBlxYJuZWdvIEVrcmFudTogJHtjb25maWcuY2hlY2tGdWxsU2NyZWVuQm91bmRzID8gJ1RBSycgOiAnTklFJ31cbi0gU2thbm93YW5pZSBETEwgRmx1dHRlcmE6ICR7Y29uZmlnLmNoZWNrRmx1dHRlckRsbHMgPyAnVEFLJyA6ICdOSUUnfVxuLSBBa2NqYSBEZWZlbnN5d25hOiAke1xuICAgIGNvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJ1xuICAgICAgPyAnVFJXQcWBRSBVU1pLT0RaRU5JRSBOQUfFgcOTV0tBIFBFIChET1MgTVogJiBQRSBTaWduYXR1cmUgSW52YWxpZGF0aW9uKSdcbiAgICAgIDogY29uZmlnLmFjdGlvbiA9PT0gJ2FjbF9sb2Nrb3V0J1xuICAgICAgPyAnQkxPS0FEQSBBQ0wgKGljYWNscyAvaW5oZXJpdGFuY2U6ciAvZGVueSBFdmVyeW9uZTooRixYLFIsVykpJ1xuICAgICAgOiBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJ1xuICAgICAgPyAnSFlCUllET1dZIFBBTkNFUk5ZIFNBQk9UQcW7IChGcmVlemUgUkFNICsgVXN6a29kemVuaWUgUEUgKyBCbG9rYWRhIEFDTCArIElGRU8pJ1xuICAgICAgOiBjb25maWcuYWN0aW9uID09PSAncXVhcmFudGluZV9sb2NrJ1xuICAgICAgPyAnVU5JRVJVQ0hPTUlFTklFICYgS1dBUkFOVEFOTkEgKEZyZWV6ZSBSQU0gKyBpY2FjbHMgKyBJRkVPKSdcbiAgICAgIDogY29uZmlnLmFjdGlvbi50b1VwcGVyQ2FzZSgpXG4gIH1cbi0gTWV0b2RhIFNhYm90YcW8dSBQRTogJHtcbiAgICBwZU1ldGhvZCA9PT0gJ3plcm9fbXpfYW5kX3BlJ1xuICAgICAgPyAnWmVyb3dhbmllIHN5Z25hdHVyeSBNWiAoMHg1QTREKSBpIG9mZnNldHUgUEUgdyBuYWfFgsOzd2t1J1xuICAgICAgOiBwZU1ldGhvZCA9PT0gJ3JhbmRvbV91cmFuZG9tJ1xuICAgICAgPyAnS3J5cHRvZ3JhZmljem5lIG5hZHBpc2FuaWUgcGllcndzemVnbyAxIEtCIG5hZ8WCw7N3a2EgKG9zLnVyYW5kb20pJ1xuICAgICAgOiAnV3ljenlzemN6ZW5pZSBwaWVyd3N6ZWdvIDEwMjQgYmFqdMOzdyB6ZXJhbWkgKDB4MDApJ1xuICB9XG4tIFVzdW5pxJljaWUgZHppZWR6aWN6ZW5pYSBBQ0w6ICR7aW5oZXJpdGFuY2VTdHJpcCA/ICdUQUsgKC9pbmhlcml0YW5jZTpyKScgOiAnTklFJ31cbi0gQmxva2FkYSByZWplc3RydSBJRkVPIChBbnRpLVJlc3Bhd24pOiAke2NvbmZpZy5lbmFibGVJZmVvQmxvY2sgPyAnVEFLJyA6ICdOSUUnfVxuLSBJbnRlcndhxYIgc2thbm93YW5pYTogJHtjb25maWcucG9sbEludGVydmFsTXN9IG1zXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuVXJ1Y2hvbWllbmllIHcgd2llcnN6dSBwb2xlY2XFhCBqYWtvIEFkbWluaXN0cmF0b3I6XG4gIHB5dGhvbiBjdXN0b21fb3ZlcmxheV9zZW50aW5lbC5weVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblwiXCJcIlxuaW1wb3J0IHRpbWVcbmltcG9ydCBvc1xuaW1wb3J0IHN5c1xuaW1wb3J0IHN0cnVjdFxuaW1wb3J0IGN0eXBlc1xuZnJvbSBjdHlwZXMgaW1wb3J0IHdpbnR5cGVzXG5pbXBvcnQgcHN1dGlsXG4ke2NvbmZpZy5ob3RrZXkgPyAnaW1wb3J0IGtleWJvYXJkXFxuJyA6ICcnfVxudXNlcjMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbmtlcm5lbDMyID0gY3R5cGVzLndpbmRsbC5rZXJuZWwzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5hZHZhcGkzMiA9IGN0eXBlcy53aW5kbGwuYWR2YXBpMzJcblxuIyBTdGHFgmUgV2luMzIgQVBJXG5HV0xfRVhTVFlMRSA9IC0yMFxuV1NfRVhfVE9QTU9TVCA9IDB4MDAwMDAwMDhcblNXX01JTklNSVpFID0gNlxuSFdORF9OT1RPUE1PU1QgPSAtMlxuU1dQX05PU0laRSA9IDB4MDAwMVxuU1dQX05PTU9WRSA9IDB4MDAwMlxuU1dQX1NIT1dXSU5ET1cgPSAweDAwNDBcblBST0NFU1NfVEVSTUlOQVRFID0gMHgwMDAxXG5QUk9DRVNTX1NVU1BFTkRfUkVTVU1FID0gMHgwODAwXG5QUk9DRVNTX1FVRVJZX0xJTUlURURfSU5GT1JNQVRJT04gPSAweDEwMDBcblxuIyBCZXpwaWVjem5lIHBvYmllcmFuaWUgZnVua2NqaSBzdHlsdSBva25hIChrb21wYXR5Ymlsbm/Fm8SHIHg4NiAvIHg2NClcbmlmIGhhc2F0dHIodXNlcjMyLCBcIkdldFdpbmRvd0xvbmdQdHJXXCIpOlxuICAgIEdldFdpbmRvd0xvbmdQdHIgPSB1c2VyMzIuR2V0V2luZG93TG9uZ1B0cldcbiAgICBHZXRXaW5kb3dMb25nUHRyLmFyZ3R5cGVzID0gW3dpbnR5cGVzLkhXTkQsIGN0eXBlcy5jX2ludF1cbiAgICBHZXRXaW5kb3dMb25nUHRyLnJlc3R5cGUgPSB3aW50eXBlcy5MUEFSQU1cbmVsc2U6XG4gICAgR2V0V2luZG93TG9uZ1B0ciA9IHVzZXIzMi5HZXRXaW5kb3dMb25nV1xuICAgIEdldFdpbmRvd0xvbmdQdHIuYXJndHlwZXMgPSBbd2ludHlwZXMuSFdORCwgY3R5cGVzLmNfaW50XVxuICAgIEdldFdpbmRvd0xvbmdQdHIucmVzdHlwZSA9IHdpbnR5cGVzLkxPTkdcblxuIyBCaWHFgmEgbGlzdGEgcHJvY2Vzw7N3IGNocm9uaW9ueWNoIHByemVkIGpha2lta29sd2llayBzYWJvdGHFvGVtXG5XSElURUxJU1QgPSBzZXQoJHtKU09OLnN0cmluZ2lmeShjb25maWcud2hpdGVsaXN0Lm1hcCgodykgPT4gdy50b0xvd2VyQ2FzZSgpKSl9KVxuXG4jIFPFgm93YSBrbHVjem93ZSBwcm9jZXPDs3cgaSBiaWJsaW90ZWtpIEZsdXR0ZXJhXG5GTFVUVEVSX01PRFVMRVMgPSB7XCJmbHV0dGVyX3dpbmRvd3MuZGxsXCIsIFwiZmx1dHRlcl9lbmdpbmUuZGxsXCIsIFwiZmx1dHRlcl9lbWJlZGRlci5kbGxcIn1cblBST0NFU1NfS0VZV09SRFMgPSAke0pTT04uc3RyaW5naWZ5KGNvbmZpZy5wcm9jZXNzS2V5d29yZHMubWFwKChrKSA9PiBrLnRvTG93ZXJDYXNlKCkpKX1cblxuZGVmIGdldF9zY3JlZW5fc2l6ZSgpOlxuICAgIHJldHVybiB1c2VyMzIuR2V0U3lzdGVtTWV0cmljcygwKSwgdXNlcjMyLkdldFN5c3RlbU1ldHJpY3MoMSlcblxuZGVmIGlzX3RvcG1vc3Rfd2luZG93KGh3bmQpOlxuICAgIHRyeTpcbiAgICAgICAgZXhfc3R5bGUgPSBHZXRXaW5kb3dMb25nUHRyKGh3bmQsIEdXTF9FWFNUWUxFKVxuICAgICAgICByZXR1cm4gYm9vbChleF9zdHlsZSAmIFdTX0VYX1RPUE1PU1QpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIEZhbHNlXG5cbmRlZiBpc19mdWxsc2NyZWVuX3dpbmRvdyhod25kLCBzY3JlZW5fdywgc2NyZWVuX2gpOlxuICAgIHJlY3QgPSB3aW50eXBlcy5SRUNUKClcbiAgICBpZiB1c2VyMzIuR2V0V2luZG93UmVjdChod25kLCBjdHlwZXMuYnlyZWYocmVjdCkpOlxuICAgICAgICB3ID0gcmVjdC5yaWdodCAtIHJlY3QubGVmdFxuICAgICAgICBoID0gcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuICAgICAgICByZXR1cm4gKHcgPj0gc2NyZWVuX3cgKiAwLjkgYW5kIGggPj0gc2NyZWVuX2ggKiAwLjkpLCB3LCBoXG4gICAgcmV0dXJuIEZhbHNlLCAwLCAwXG5cbmRlZiBpbnNwZWN0X3Byb2Nlc3MoaHduZCk6XG4gICAgcGlkID0gd2ludHlwZXMuRFdPUkQoKVxuICAgIHVzZXIzMi5HZXRXaW5kb3dUaHJlYWRQcm9jZXNzSWQoaHduZCwgY3R5cGVzLmJ5cmVmKHBpZCkpXG4gICAgaWYgcGlkLnZhbHVlID09IDA6XG4gICAgICAgIHJldHVybiBOb25lLCBOb25lXG4gICAgdHJ5OlxuICAgICAgICBwcm9jID0gcHN1dGlsLlByb2Nlc3MocGlkLnZhbHVlKVxuICAgICAgICByZXR1cm4gcGlkLnZhbHVlLCBwcm9jXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcmV0dXJuIHBpZC52YWx1ZSwgTm9uZVxuXG5kZWYgZ2V0X2V4ZV9wYXRoKHBpZCk6XG4gICAgXCJcIlwiUG9iaWVyYSBwZcWCbsSFIMWbY2llxbxrxJkgZG8gcGxpa3Ugd3lrb255d2FsbmVnbyBuYSBkeXNrdS5cIlwiXCJcbiAgICBoID0ga2VybmVsMzIuT3BlblByb2Nlc3MoUFJPQ0VTU19RVUVSWV9MSU1JVEVEX0lORk9STUFUSU9OLCBGYWxzZSwgcGlkKVxuICAgIGlmIG5vdCBoOlxuICAgICAgICByZXR1cm4gTm9uZVxuICAgIGJ1ZiA9IGN0eXBlcy5jcmVhdGVfdW5pY29kZV9idWZmZXIoMTAyNClcbiAgICBzaXplID0gd2ludHlwZXMuRFdPUkQoMTAyNClcbiAgICBpZiBrZXJuZWwzMi5RdWVyeUZ1bGxQcm9jZXNzSW1hZ2VOYW1lVyhoLCAwLCBidWYsIGN0eXBlcy5ieXJlZihzaXplKSk6XG4gICAgICAgIGtlcm5lbDMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgIHJldHVybiBidWYudmFsdWVcbiAgICBrZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgIHJldHVybiBOb25lXG5cbmRlZiBmcmVlemVfcHJvY2Vzc190aHJlYWRzKHBpZCk6XG4gICAgXCJcIlwiQsWCeXNrYXdpY3puaWUgemFtcmHFvGEgd3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IHcgcGFtacSZY2kgUkFNLlwiXCJcIlxuICAgIGggPSBrZXJuZWwzMi5PcGVuUHJvY2VzcyhQUk9DRVNTX1NVU1BFTkRfUkVTVU1FLCBGYWxzZSwgcGlkKVxuICAgIGlmIGg6XG4gICAgICAgIG50ZGxsLk50U3VzcGVuZFByb2Nlc3MoaClcbiAgICAgICAga2VybmVsMzIuQ2xvc2VIYW5kbGUoaClcbiAgICAgICAgcmV0dXJuIFRydWVcbiAgICByZXR1cm4gRmFsc2VcblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBNT0RVxYEgMTogVFJXQcWBRSBVU1pLQURaQU5JRSBOQUfFgcOTV0tBIFBFIChET1MgTVogJiBQRSBIRUFERVIgQ09SUlVQVElPTilcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmRlZiBjb3JydXB0X3BlX2hlYWRlcihleGVfcGF0aCk6XG4gICAgXCJcIlwiXG4gICAgVHJ3YWxlIG5pc3pjenkgc3RydWt0dXLEmSBQb3J0YWJsZSBFeGVjdXRhYmxlIChQRSkgcGxpa3Ugd3lrb255d2FsbmVnbyBuYSBkeXNrdS5cbiAgICBaZXJ1amUgc3lnbmF0dXLEmSBET1MgJ01aJyAoMHg1QTREKSwgd3NrYcW6bmlrIGVfbGZhbmV3ICgweDNDKSBvcmF6IHN5Z25hdHVyxJkgUEUgJ1BFXFxcXDBcXFxcMCcuXG4gICAgXG4gICAgUkVaVUxUQVQ6XG4gICAgU3lzdGVtIFdpbmRvd3MgUEUgTG9hZGVyIChudGRsbC5kbGwhTGRycEluaXRpYWxpemVQcm9jZXNzKSBwcnp5IGpha2llamtvbHdpZWtcbiAgICBwcsOzYmllIHVydWNob21pZW5pYSB6d3LDs2NpIGLFgsSFZCBrcnl0eWN6bnkgU1RBVFVTX0lOVkFMSURfSU1BR0VfRk9STUFUICgweEMwMDAwMDdCKVxuICAgIHoga29tdW5pa2F0ZW06ICdUYSBhcGxpa2FjamEgbmllIG1vxbxlIGR6aWHFgmHEhyBuYSBUd29pbSBrb21wdXRlcnplJy5cbiAgICBQbGlrIHN0YWplIHNpxJkgdyAxMDAlIGJlenXFvHl0ZWN6bnkgaSBuaWVtb8W8bGl3eSBkbyB1cnVjaG9taWVuaWEuXG4gICAgXCJcIlwiXG4gICAgaWYgbm90IGV4ZV9wYXRoIG9yIG5vdCBvcy5wYXRoLmV4aXN0cyhleGVfcGF0aCk6XG4gICAgICAgIHByaW50KGZcIlstXSBbU0FCT1RBxbsgUEVdIFBsaWsgbmllIGlzdG5pZWplIGx1YiBicmFrIMWbY2llxbxraToge2V4ZV9wYXRofVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuICAgIHRyeTpcbiAgICAgICAgIyBaZGVqbWlqIGF0cnlidXR5IHR5bGtvLWRvLW9kY3p5dHUvdWtyeXR5IGplxZtsaSBpc3RuaWVqxIVcbiAgICAgICAga2VybmVsMzIuU2V0RmlsZUF0dHJpYnV0ZXNXKGV4ZV9wYXRoLCAweDgwKSAjIEZJTEVfQVRUUklCVVRFX05PUk1BTFxuICAgICAgICBcbiAgICAgICAgd2l0aCBvcGVuKGV4ZV9wYXRoLCBcInIrYlwiKSBhcyBmOlxuICAgICAgICAgICAgIyAxLiBTcHJhd2TFuiBzeWduYXR1csSZIERPUyAoMHgwMCAtIDB4MDIpXG4gICAgICAgICAgICBmLnNlZWsoMClcbiAgICAgICAgICAgIGRvc19tYWdpYyA9IGYucmVhZCgyKVxuICAgICAgICAgICAgaWYgZG9zX21hZ2ljICE9IGJcIk1aXCI6XG4gICAgICAgICAgICAgICAgcHJpbnQoZlwiWyFdIFtTQUJPVEHFuyBQRV0gUGxpayBuaWUgcG9zaWFkYSBzeWduYXR1cnkgTVogbHViIHpvc3RhxYIganXFvCB3Y3plxZtuaWVqIHVzemtvZHpvbnkuXCIpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgMi4gT2Rjenl0YWogb2Zmc2V0IG5hZ8WCw7N3a2EgUEUgKGVfbGZhbmV3IHBvZCBhZHJlc2VtIDB4M0MpXG4gICAgICAgICAgICBmLnNlZWsoMHgzQylcbiAgICAgICAgICAgIGVfbGZhbmV3X2J5dGVzID0gZi5yZWFkKDQpXG4gICAgICAgICAgICBwZV9vZmZzZXQgPSAwXG4gICAgICAgICAgICBpZiBsZW4oZV9sZmFuZXdfYnl0ZXMpID09IDQ6XG4gICAgICAgICAgICAgICAgcGVfb2Zmc2V0ID0gc3RydWN0LnVucGFjayhcIjxJXCIsIGVfbGZhbmV3X2J5dGVzKVswXVxuXG4gICAgICAgICAgICAjIDMuIFphc3Rvc3VqIHd5YnJhbsSFIG1ldG9kxJkgem5pc3pjemVuaWEgbmFnxYLDs3drYVxuICAgICAgICAgICAgJHtcbiAgICAgICAgICAgICAgcGVNZXRob2QgPT09ICdyYW5kb21fdXJhbmRvbSdcbiAgICAgICAgICAgICAgICA/IGBmLnNlZWsoMClcbiAgICAgICAgICAgICMgTmFkcGlzYW5pZSBwaWVyd3N6eWNoIDIwNDggYmFqdMOzdyBsb3Nvd3ltaSDFm21pZWNpYW1pIGtyeXB0b2dyYWZpY3pueW1pXG4gICAgICAgICAgICBnYXJiYWdlID0gb3MudXJhbmRvbSgyMDQ4KVxuICAgICAgICAgICAgZi53cml0ZShnYXJiYWdlKVxuICAgICAgICAgICAgZi5mbHVzaCgpYFxuICAgICAgICAgICAgICAgIDogcGVNZXRob2QgPT09ICd3aXBlX2ZpcnN0XzFrYidcbiAgICAgICAgICAgICAgICA/IGBmLnNlZWsoMClcbiAgICAgICAgICAgICMgV3l6ZXJvd2FuaWUgY2HFgmVnbyBibG9rdSBuYWfFgsOzd2vDs3cgRE9TIGkgTlQgKDEwMjQgYmFqdHkpXG4gICAgICAgICAgICBmLndyaXRlKGJcIlxcXFx4MDBcIiAqIDEwMjQpXG4gICAgICAgICAgICBmLmZsdXNoKClgXG4gICAgICAgICAgICAgICAgOiBgIyBQcmVjeXp5am55IHNhYm90YcW8OlxuICAgICAgICAgICAgIyBhKSBabmlzemN6IHN5Z25hdHVyxJkgRE9TIE1aICh6YW1pYW5hIG5hIFxcXFx4MDBcXFxceDAwIGx1YiBcXFxceERFXFxcXHhBRClcbiAgICAgICAgICAgIGYuc2VlaygwKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceERFXFxcXHhBRFwiKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAjIGIpIFpuaXN6Y3ogd3NrYcW6bmlrIGRvIG5hZ8WCw7N3a2EgUEUgcG9kIGFkcmVzZW0gMHgzQ1xuICAgICAgICAgICAgZi5zZWVrKDB4M0MpXG4gICAgICAgICAgICBmLndyaXRlKGJcIlxcXFx4RkZcXFxceEZGXFxcXHhGRlxcXFx4RkZcIilcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgIyBjKSBKZcWbbGkgemxva2FsaXpvd2FubyBuYWfFgsOzd2VrIFBFLCBuYWRwaXN6IHN5Z25hdHVyxJkgJ1BFXFxcXDBcXFxcMCcgKDB4NTAgMHg0NSAweDAwIDB4MDApXG4gICAgICAgICAgICBpZiAwIDwgcGVfb2Zmc2V0IDwgMTA0ODU3NjpcbiAgICAgICAgICAgICAgICB0cnk6XG4gICAgICAgICAgICAgICAgICAgIGYuc2VlayhwZV9vZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIGYud3JpdGUoYlwiXFxcXHgwMFxcXFx4MDBcXFxceDAwXFxcXHgwMFxcXFx4RkZcXFxceEZGXFxcXHhGRlxcXFx4RkZcIilcbiAgICAgICAgICAgICAgICBleGNlcHQgRXhjZXB0aW9uOlxuICAgICAgICAgICAgICAgICAgICBwYXNzXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICMgZCkgTmFkcGlzeiBwaWVyd3N6ZSA1MTIgYmFqdMOzdyB6ZXJhbWlcbiAgICAgICAgICAgIGYuc2VlaygyKVxuICAgICAgICAgICAgZi53cml0ZShiXCJcXFxceDAwXCIgKiA1MTApXG4gICAgICAgICAgICBmLmZsdXNoKClgXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVMgLSBTQUJPVEHFuyBQRV0gUG9tecWbbG5pZSB6bmlzemN6b25vIG5hZ8WCw7N3ZWsgUEUgcGxpa3U6IHtleGVfcGF0aH1cIilcbiAgICAgICAgcHJpbnQoZlwiICAgIFshXSBMb2FkZXIgV2luZG93cyAoTGRycEluaXRpYWxpemVQcm9jZXNzKSBvZHJ6dWNpIHBsaWsgeiBixYLEmWRlbSAweEMwMDAwMDdCIChTVEFUVVNfSU5WQUxJRF9JTUFHRV9GT1JNQVQpLlwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIGV4Y2VwdCBQZXJtaXNzaW9uRXJyb3I6XG4gICAgICAgIHByaW50KGZcIlstXSBbU0FCT1RBxbsgUEVdIFBsaWsgemFibG9rb3dhbnkgcHJ6ZXogcHJvY2VzLiBQcsOzYmEgd3ltdXN6ZW5pYSBwbyB6YWJpY2l1IHfEhXRrw7N3Li4uXCIpXG4gICAgICAgIHJldHVybiBGYWxzZVxuICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgcHJpbnQoZlwiWy1dIFtTQUJPVEHFuyBQRV0gQsWCxIVkIHBvZGN6YXMgbW9keWZpa2FjamkgYmluYXJuZWo6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuIyBNT0RVxYEgMjogQkxPS0FEQSBVUFJBV05JRcWDIFNZU1RFTVUgUExJS8OTVyAoQUNMIC8gREFDTCBMT0NLT1VUKVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZGVmIGxvY2tfZmlsZV9hY2woZXhlX3BhdGgpOlxuICAgIFwiXCJcIlxuICAgIERlZmluaXR5d25pZSBibG9rdWplIHVwcmF3bmllbmlhIG5hIHBvemlvbWllIEFjY2VzcyBDb250cm9sIExpc3QgKERBQ0wpIHcgTlRGUy5cbiAgICBPZGJpZXJhIHVwcmF3bmllbmlhIGRvIHVydWNoYW1pYW5pYSAoRXhlY3V0ZSksIG9kY3p5dHUgKFJlYWQpLCB6YXBpc3UgKFdyaXRlKVxuICAgIGkgcGXFgm5laiBrb250cm9saSBkbGEgd3N6eXN0a2ljaCB1xbx5dGtvd25pa8OzdyAoU0lEIFMtMS0xLTAgLyBFdmVyeW9uZSAvIFdzenlzY3kpXG4gICAgb3JheiB6ZXJ1amUgZHppZWR6aWN6ZW5pZSB1cHJhd25pZcWELlxuICAgIFwiXCJcIlxuICAgIGlmIG5vdCBleGVfcGF0aCBvciBub3Qgb3MucGF0aC5leGlzdHMoZXhlX3BhdGgpOlxuICAgICAgICByZXR1cm4gRmFsc2VcblxuICAgIHRyeTpcbiAgICAgICAgcHJpbnQoZlwiWypdIFtCTE9LQURBIEFDTF0gS29uZmlndXJhY2phIHJlc3RyeWtjamkgTlRGUyBkbGE6IHtleGVfcGF0aH1cIilcbiAgICAgICAgXG4gICAgICAgICMgMS4gVXN1bmnEmWNpZSBkemllZHppY3plbmlhIHVwcmF3bmllxYQgKGl6b2xhY2phIG9iaWVrdHUpXG4gICAgICAgICR7XG4gICAgICAgICAgaW5oZXJpdGFuY2VTdHJpcFxuICAgICAgICAgICAgPyBgY21kX2luaGVyaXQgPSBmJ2ljYWNscyBcIntleGVfcGF0aH1cIiAvaW5oZXJpdGFuY2U6ciA+bnVsIDI+JjEnXG4gICAgICAgIG9zLnN5c3RlbShjbWRfaW5oZXJpdClgXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgIH1cblxuICAgICAgICAjIDIuIE5hZGFuaWUgZXhwbGljaXRlIHJlZ3XFgnkgREVOWSBkbGEgZ3J1cHkgV3N6eXNjeSAoU0lEOiAqUy0xLTEtMCAvIEV2ZXJ5b25lKVxuICAgICAgICAjIFVwcmF3bmllbmlhOiBGID0gUGXFgm5hIGtvbnRyb2xhLCBYID0gV3lrb255d2FuaWUsIFIgPSBPZGN6eXQsIFcgPSBaYXBpc1xuICAgICAgICBjbWRfZGVueSA9IGYnaWNhY2xzIFwie2V4ZV9wYXRofVwiIC9kZW55ICpTLTEtMS0wOihGLFgsUixXKSA+bnVsIDI+JjEnXG4gICAgICAgIG9zLnN5c3RlbShjbWRfZGVueSlcblxuICAgICAgICAjIDMuIERvZGF0a293YSBibG9rYWRhIHByemV6IHN0YW5kYXJkb3fEhSBuYXp3xJkgZ3J1cHkgRXZlcnlvbmVcbiAgICAgICAgb3Muc3lzdGVtKGYnaWNhY2xzIFwie2V4ZV9wYXRofVwiIC9kZW55IEV2ZXJ5b25lOihGLFgsUixXKSA+bnVsIDI+JjEnKVxuXG4gICAgICAgICMgNC4gVXN0YXdpZW5pZSBhdHJ5YnV0w7N3IHN5c3RlbW93eWNoIChVa3J5dHkgKyBTeXN0ZW1vd3kgKyBUeWxrbyBkbyBvZGN6eXR1KVxuICAgICAgICBrZXJuZWwzMi5TZXRGaWxlQXR0cmlidXRlc1coZXhlX3BhdGgsIDB4MDEgfCAweDAyIHwgMHgwNCkgIyBSRUFET05MWSB8IEhJRERFTiB8IFNZU1RFTVxuXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTIC0gQkxPS0FEQSBBQ0xdIFVwcmF3bmllbmlhIHBsaWt1IHpvc3RhxYJ5IG9kY2nEmXRlIChBY2Nlc3MgRGVuaWVkKS5cIilcbiAgICAgICAgcHJpbnQoZlwiICAgIMW7YWRlbiB1xbx5dGtvd25payBhbmkgcHJvY2VzIHBvdG9tbnkgbmllIG1vxbxlIG9kY3p5dGHEhyBhbmkgdXJ1Y2hvbWnEhyB0ZWdvIHBsaWt1LlwiKVxuICAgICAgICByZXR1cm4gVHJ1ZVxuICAgIGV4Y2VwdCBFeGNlcHRpb24gYXMgZTpcbiAgICAgICAgcHJpbnQoZlwiWy1dIFtCTE9LQURBIEFDTF0gQsWCxIVkIGtvbmZpZ3VyYWNqaSBBQ0w6IHtlfVwiKVxuICAgICAgICByZXR1cm4gRmFsc2VcblxuZGVmIGJsb2NrX3ZpYV9pZmVvKHByb2NfbmFtZSk6XG4gICAgXCJcIlwiUmVqZXN0cnVqZSBhdHJhcMSZIGRlYnVnZ2VyYSB3IEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMgKElGRU8pLlwiXCJcIlxuICAgIHRyeTpcbiAgICAgICAgY21kID0gZidyZWcgYWRkIFwiSEtMTVxcXFxcXFxcU09GVFdBUkVcXFxcXFxcXE1pY3Jvc29mdFxcXFxcXFxcV2luZG93cyBOVFxcXFxcXFxcQ3VycmVudFZlcnNpb25cXFxcXFxcXEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnNcXFxcXFxcXHtwcm9jX25hbWV9XCIgL3YgRGVidWdnZXIgL3QgUkVHX1NaIC9kIFwic3lzdHJheS5leGVcIiAvZiA+bnVsIDI+JjEnXG4gICAgICAgIG9zLnN5c3RlbShjbWQpXG4gICAgICAgIHByaW50KGZcIlsrXSBbSUZFTyBMT0NLXSBEb2Rhbm8gd3BpcyByZWplc3RydSBibG9rdWrEhWN5IGF1dG9zdGFydCAne3Byb2NfbmFtZX0nLlwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcblxuZGVmIGNoZWNrX2ZsdXR0ZXJfc2lnbmF0dXJlcyhwcm9jKTpcbiAgICBpZiBub3QgcHJvYzpcbiAgICAgICAgcmV0dXJuIEZhbHNlLCBcIlwiXG4gICAgdHJ5OlxuICAgICAgICBuYW1lID0gcHJvYy5uYW1lKCkubG93ZXIoKVxuICAgICAgICBpZiBuYW1lIGluIFdISVRFTElTVDpcbiAgICAgICAgICAgIHJldHVybiBGYWxzZSwgXCJ3aGl0ZWxpc3RcIlxuICAgICAgICBcbiAgICAgICAgaWYgYW55KGsgaW4gbmFtZSBmb3IgayBpbiBQUk9DRVNTX0tFWVdPUkRTKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlLCBmXCJOYXp3YSBwcm9jZXN1ICd7bmFtZX0nXCJcblxuICAgICAgICBjbWRsaW5lID0gXCIgXCIuam9pbihwcm9jLmNtZGxpbmUoKSBvciBbXSkubG93ZXIoKVxuICAgICAgICBpZiBhbnkoayBpbiBjbWRsaW5lIGZvciBrIGluIFBST0NFU1NfS0VZV09SRFMpOlxuICAgICAgICAgICAgcmV0dXJuIFRydWUsIGZcIldpZXJzeiBwb2xlY2XFhDogJ3tjbWRsaW5lfSdcIlxuXG4gICAgICAgICR7XG4gICAgICAgICAgY29uZmlnLmNoZWNrRmx1dHRlckRsbHNcbiAgICAgICAgICAgID8gYGlmIGhhc2F0dHIocHJvYywgXCJtZW1vcnlfbWFwc1wiKTpcbiAgICAgICAgICAgIGZvciBtbSBpbiBwcm9jLm1lbW9yeV9tYXBzKCk6XG4gICAgICAgICAgICAgICAgZGxsID0gb3MucGF0aC5iYXNlbmFtZShtbS5wYXRoKS5sb3dlcigpXG4gICAgICAgICAgICAgICAgaWYgZGxsIGluIEZMVVRURVJfTU9EVUxFUzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRydWUsIGZcIlphxYJhZG93YW5hIGJpYmxpb3Rla2Egc2lsbmlrYSBGbHV0dGVyYToge2RsbH1cImBcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgfVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIHBhc3NcbiAgICByZXR1cm4gRmFsc2UsIFwiXCJcblxuZGVmIG5ldXRyYWxpemVfb3ZlcmxheShod25kLCBwaWQsIHByb2NfbmFtZSwgcmVhc29uKTpcbiAgICBwcmludChcIj1cIiAqIDcwKVxuICAgIHByaW50KGZcIlshXSBXWUtSWVRPIEJMT0tVSsSEQ1kgUFJPQ0VTIE1BTFdBUkUgLyBPVkVSTEFZIVwiKVxuICAgIHByaW50KGZcIiAgICBQcm9jZXMgOiB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSlcIilcbiAgICBwcmludChmXCIgICAgUG93w7NkICA6IHtyZWFzb259XCIpXG4gICAgJHtjb25maWcucGxheUFsZXJ0U291bmQgPyAnY3R5cGVzLndpbmRsbC51c2VyMzIuTWVzc2FnZUJlZXAoMHhGRkZGRkZGRilcXG4nIDogJyd9XG4gICAgXG4gICAgIyAxLiBOYXR5Y2htaWFzdG93ZSB1a3J5Y2llIGkgbWluaW1hbGl6YWNqYSBva25hIHogcHVscGl0dVxuICAgIHRyeTpcbiAgICAgICAgdXNlcjMyLlNob3dXaW5kb3coaHduZCwgMClcbiAgICAgICAgdXNlcjMyLlNldFdpbmRvd1Bvcyhod25kLCAxLCAwLCAwLCAwLCAwLCAweDAwMDEgfCAweDAwMDIgfCAweDAwODApXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgcGFzc1xuXG4gICAgJHtcbiAgICAgIGNvbmZpZy5hY3Rpb24gPT09ICdjb3JydXB0X3BlJ1xuICAgICAgICA/IGAjIEtST0sgMTogWmFtcm/FvGVuaWUgd8SFdGvDs3cgdyBwYW1pxJljaSBSQU0gKE50U3VzcGVuZFByb2Nlc3MpXG4gICAgZnJlZXplX3Byb2Nlc3NfdGhyZWFkcyhwaWQpXG4gICAgcHJpbnQoZlwiWytdIFsxLiBGUkVFWkVdIFdzenlzdGtpZSB3xIV0a2kgUElEIHtwaWR9IHpvc3RhxYJ5IHphdHJ6eW1hbmUgdyBwYW1pxJljaSBSQU0uXCIpXG5cbiAgICAjIEtST0sgMjogUG9icmFuaWUgxZtjaWXFvGtpIGRvIHBsaWt1IG5hIGR5c2t1XG4gICAgZXhlX2ZpbGUgPSBnZXRfZXhlX3BhdGgocGlkKVxuXG4gICAgIyBLUk9LIDM6IFphYmljaWUgcHJvY2VzdSB3IHBhbWnEmWNpLCBhYnkgendvbG5pxIcgdWNod3l0IGRvIHBsaWt1IG5hIGR5c2t1XG4gICAgdHJ5OlxuICAgICAgICBwID0gcHN1dGlsLlByb2Nlc3MocGlkKVxuICAgICAgICBwLmtpbGwoKVxuICAgICAgICB0aW1lLnNsZWVwKDAuMDUpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgb3Muc3lzdGVtKGZcInRhc2traWxsIC9GIC9QSUQge3BpZH0gPm51bCAyPiYxXCIpXG5cbiAgICAjIEtST0sgNDogVFJXQcWBRSBVU1pLT0RaRU5JRSBOQUfFgcOTV0tBIFBFXG4gICAgaWYgZXhlX2ZpbGU6XG4gICAgICAgIGNvcnJ1cHRfcGVfaGVhZGVyKGV4ZV9maWxlKVxuXG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFpsaWt3aWRvd2FubyBwcm9jZXMge3Byb2NfbmFtZX0gaSB1bmllc3prb2RsaXdpb25vIHBsaWsgYmluYXJhbnkgbmEgZHlza3UuXCIpYFxuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdhY2xfbG9ja291dCdcbiAgICAgICAgPyBgIyBLUk9LIDE6IFphbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNXG4gICAgZnJlZXplX3Byb2Nlc3NfdGhyZWFkcyhwaWQpXG4gICAgcHJpbnQoZlwiWytdIFsxLiBGUkVFWkVdIFphbXJvxbxvbm8gd8SFdGtpIFBJRCB7cGlkfS5cIilcblxuICAgICMgS1JPSyAyOiBQb2JyYW5pZSDFm2NpZcW8a2lcbiAgICBleGVfZmlsZSA9IGdldF9leGVfcGF0aChwaWQpXG5cbiAgICAjIEtST0sgMzogQkxPS0FEQSBVUFJBV05JRcWDIEFDTCAoaWNhY2xzIERlbnkpXG4gICAgaWYgZXhlX2ZpbGU6XG4gICAgICAgIGxvY2tfZmlsZV9hY2woZXhlX2ZpbGUpXG5cbiAgICAjIEtST0sgNDogWmFiaWNpZSBwcm9jZXN1XG4gICAgdHJ5OlxuICAgICAgICBwID0gcHN1dGlsLlByb2Nlc3MocGlkKVxuICAgICAgICBwLmtpbGwoKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIG9zLnN5c3RlbShmXCJ0YXNra2lsbCAvRiAvUElEIHtwaWR9ID5udWwgMj4mMVwiKVxuXG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFVwcmF3bmllbmlhIHBsaWt1IHtwcm9jX25hbWV9IHpvc3RhxYJ5IGNhxYJrb3dpY2llIHphYmxva293YW5lLlwiKWBcbiAgICAgICAgOiBjb25maWcuYWN0aW9uID09PSAnaHlicmlkX3NhYm90YWdlJ1xuICAgICAgICA/IGAjIEtST0sgMTogQsWCeXNrYXdpY3puZSB6YW1yb8W8ZW5pZSB3IFJBTVxuICAgIGZyZWV6ZV9wcm9jZXNzX3RocmVhZHMocGlkKVxuICAgIHByaW50KGZcIlsrXSBbMS4gRlJFRVpFXSBaYW1yb8W8b25vIHByb2NlcyBQSUQge3BpZH0gdyBwYW1pxJljaSBSQU0gKE50U3VzcGVuZFByb2Nlc3MpLlwiKVxuXG4gICAgIyBLUk9LIDI6IFBvYnJhbmllIMWbY2llxbxraSBkbyBwbGlrdSB3eWtvbnl3YWxuZWdvXG4gICAgZXhlX2ZpbGUgPSBnZXRfZXhlX3BhdGgocGlkKVxuXG4gICAgIyBLUk9LIDM6IFpha2/FhGN6ZW5pZSBwcm9jZXN1IHcgY2VsdSBvZGJsb2tvd2FuaWEgdWNod3l0dVxuICAgIHRyeTpcbiAgICAgICAgcCA9IHBzdXRpbC5Qcm9jZXNzKHBpZClcbiAgICAgICAgcC5raWxsKClcbiAgICAgICAgdGltZS5zbGVlcCgwLjA1KVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIG9zLnN5c3RlbShmXCJ0YXNra2lsbCAvRiAvUElEIHtwaWR9ID5udWwgMj4mMVwiKVxuXG4gICAgIyBLUk9LIDQ6IFVTWktPRFpFTklFIE5BR8WBw5NXS0EgUEUgKyBCTE9LQURBIEFDTCArIElGRU9cbiAgICBpZiBleGVfZmlsZTpcbiAgICAgICAgY29ycnVwdF9wZV9oZWFkZXIoZXhlX2ZpbGUpXG4gICAgICAgIGxvY2tfZmlsZV9hY2woZXhlX2ZpbGUpXG4gICAgXG4gICAgJHtjb25maWcuZW5hYmxlSWZlb0Jsb2NrID8gJ2Jsb2NrX3ZpYV9pZmVvKHByb2NfbmFtZSlcXG4nIDogJyd9XG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFd5a29uYW5vIHBlxYJueSBwb3Ryw7Nqbnkgc2Fib3RhxbwgKFBFIEhlYWRlciBaZXJvaW5nICsgQUNMIERlbnkgKyBJRkVPKSFcIilgXG4gICAgICAgIDogY29uZmlnLmFjdGlvbiA9PT0gJ3F1YXJhbnRpbmVfbG9jaydcbiAgICAgICAgPyBgIyAxLiBaQU1ST8W7RU5JRSBXxIRUS8OTVyAoRnJlZXplIHcgUkFNKVxuICAgIGZyZWV6ZV9wcm9jZXNzX3RocmVhZHMocGlkKVxuICAgIHByaW50KGZcIlsrXSBbWkFNUk/Fu09OT10gV3N6eXN0a2llIHfEhXRraSBwcm9jZXN1IFBJRCB7cGlkfSBzxIUgemF0cnp5bWFuZS5cIilcblxuICAgICMgMi4gS1dBUkFOVEFOTkEgUExJS1UgTkEgRFlTS1VcbiAgICBleGVfZmlsZSA9IGdldF9leGVfcGF0aChwaWQpXG4gICAgaWYgZXhlX2ZpbGUgYW5kIG9zLnBhdGguZXhpc3RzKGV4ZV9maWxlKTpcbiAgICAgICAgdHJ5OlxuICAgICAgICAgICAgIyBabWlhbmEgbmF6d3kgbmEgLnF1YXJhbnRpbmVkX2xvY2tcbiAgICAgICAgICAgIG9zLnJlbmFtZShleGVfZmlsZSwgZXhlX2ZpbGUgKyBcIi5xdWFyYW50aW5lZF9sb2NrXCIpXG4gICAgICAgICAgICBwcmludChmXCJbK10gW0tXQVJBTlRBTk5BXSBabWllbmlvbm8gbmF6d8SZOiB7ZXhlX2ZpbGV9LnF1YXJhbnRpbmVkX2xvY2tcIilcbiAgICAgICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgICAgICMgRmFsbGJhY2sgLSBvZGVicmFuaWUgdXByYXduaWXFhCBkbyB1cnVjaG9taWVuaWFcbiAgICAgICAgICAgIGxvY2tfZmlsZV9hY2woZXhlX2ZpbGUpXG5cbiAgICAjIDMuIEJMT0tBREEgVyBSRUpFU1RSWkUgV0lORE9XUyAoSUZFTylcbiAgICAke1xuICAgICAgY29uZmlnLmVuYWJsZUlmZW9CbG9ja1xuICAgICAgICA/IGBibG9ja192aWFfaWZlbyhwcm9jX25hbWUpYFxuICAgICAgICA6ICcnXG4gICAgfVxuXG4gICAgIyA0LiBERUZJTklUWVdORSBaQUJJQ0lFIFBST0NFU1VcbiAgICB0cnk6XG4gICAgICAgIHAgPSBwc3V0aWwuUHJvY2VzcyhwaWQpXG4gICAgICAgIHAua2lsbCgpXG4gICAgICAgIHByaW50KGZcIlsrXSBbU1VLQ0VTXSBabGlrd2lkb3dhbm8gcHJvY2VzIHtwcm9jX25hbWV9IChQSUQ6IHtwaWR9KVwiKVxuICAgIGV4Y2VwdCBFeGNlcHRpb246XG4gICAgICAgIG9zLnN5c3RlbShmXCJ0YXNra2lsbCAvRiAvUElEIHtwaWR9ID5udWwgMj4mMVwiKWBcbiAgICAgICAgOiBjb25maWcuYWN0aW9uID09PSAnc3VzcGVuZCdcbiAgICAgICAgPyBgZnJlZXplX3Byb2Nlc3NfdGhyZWFkcyhwaWQpXG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFByb2NlcyBQSUQge3BpZH0gem9zdGHFgiB0cndhbGUgWkFNUk/Fu09OWSB3IHBhbWnEmWNpIFJBTS5cIilgXG4gICAgICAgIDogY29uZmlnLmFjdGlvbiA9PT0gJ3N0cmlwX3RvcG1vc3QnXG4gICAgICAgID8gYHVzZXIzMi5TZXRXaW5kb3dQb3MoaHduZCwgSFdORF9OT1RPUE1PU1QsIDAsIDAsIDAsIDAsIFNXUF9OT01PVkUgfCBTV1BfTk9TSVpFIHwgU1dQX1NIT1dXSU5ET1cpXG4gICAgdXNlcjMyLlNob3dXaW5kb3coaHduZCwgU1dfTUlOSU1JWkUpXG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFpkasSZdG8gYXRyeWJ1dCBUT1BNT1NUIGkgem1pbmltYWxpem93YW5vIG9rbm8hXCIpYFxuICAgICAgICA6IGNvbmZpZy5hY3Rpb24gPT09ICdtaW5pbWl6ZSdcbiAgICAgICAgPyBgdXNlcjMyLlNob3dXaW5kb3coaHduZCwgU1dfTUlOSU1JWkUpXG4gICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFptaW5pbWFsaXpvd2FubyBva25vIG5ha8WCYWRraS5cIilgXG4gICAgICAgIDogYHRyeTpcbiAgICAgICAgcCA9IHBzdXRpbC5Qcm9jZXNzKHBpZClcbiAgICAgICAgcC5raWxsKClcbiAgICAgICAgcHJpbnQoZlwiWytdIFtTVUtDRVNdIFByb2NlcyB7cHJvY19uYW1lfSAoUElEOiB7cGlkfSkgem9zdGHFgiBuYXR5Y2htaWFzdCBaQUJJVFkhXCIpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbjpcbiAgICAgICAgb3Muc3lzdGVtKGZcInRhc2traWxsIC9GIC9QSUQge3BpZH0gPm51bCAyPiYxXCIpYFxuICAgIH1cbiAgICBwcmludChcIj1cIiAqIDcwKVxuXG5kZWYgc2Nhbl93aW5kb3dzKCk6XG4gICAgc2NyZWVuX3csIHNjcmVlbl9oID0gZ2V0X3NjcmVlbl9zaXplKClcblxuICAgIGRlZiBjYWxsYmFjayhod25kLCBscGFyYW0pOlxuICAgICAgICBpZiBub3QgdXNlcjMyLklzV2luZG93VmlzaWJsZShod25kKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG4gICAgICAgIGlmIGh3bmQgaW4gKHVzZXIzMi5HZXREZXNrdG9wV2luZG93KCksIHVzZXIzMi5HZXRTaGVsbFdpbmRvdygpKTpcbiAgICAgICAgICAgIHJldHVybiBUcnVlXG5cbiAgICAgICAgcGlkLCBwcm9jID0gaW5zcGVjdF9wcm9jZXNzKGh3bmQpXG4gICAgICAgIGlmIG5vdCBwcm9jOlxuICAgICAgICAgICAgcmV0dXJuIFRydWVcblxuICAgICAgICBwcm9jX25hbWUgPSBwcm9jLm5hbWUoKS5sb3dlcigpXG4gICAgICAgIGlmIHByb2NfbmFtZSBpbiBXSElURUxJU1Q6XG4gICAgICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgICAgIGlzX3RvcCA9IGlzX3RvcG1vc3Rfd2luZG93KGh3bmQpIGlmICR7Y29uZmlnLmNoZWNrVG9wTW9zdEZsYWd9IGVsc2UgRmFsc2VcbiAgICAgICAgaXNfZnVsbCwgdywgaCA9IGlzX2Z1bGxzY3JlZW5fd2luZG93KGh3bmQsIHNjcmVlbl93LCBzY3JlZW5faCkgaWYgJHtjb25maWcuY2hlY2tGdWxsU2NyZWVuQm91bmRzfSBlbHNlIChGYWxzZSwgMCwgMClcbiAgICAgICAgaXNfZmx0LCBmbHRfcmVhc29uID0gY2hlY2tfZmx1dHRlcl9zaWduYXR1cmVzKHByb2MpXG5cbiAgICAgICAgaWYgKGlzX3RvcCBhbmQgaXNfZnVsbCkgb3IgKGlzX2ZsdCBhbmQgKGlzX3RvcCBvciBpc19mdWxsKSkgb3IgKGlzX2ZsdCBhbmQgXCJmbHV0dGVyXCIgaW4gcHJvY19uYW1lKTpcbiAgICAgICAgICAgIHJlYXNvbiA9IGZcIlRvcE1vc3Q9e2lzX3RvcH0sIEZ1bGxzY3JlZW49e2lzX2Z1bGx9ICh7d314e2h9KVwiXG4gICAgICAgICAgICBpZiBpc19mbHQ6XG4gICAgICAgICAgICAgICAgcmVhc29uICs9IGZcIiB8IHtmbHRfcmVhc29ufVwiXG4gICAgICAgICAgICBuZXV0cmFsaXplX292ZXJsYXkoaHduZCwgcGlkLCBwcm9jX25hbWUsIHJlYXNvbilcblxuICAgICAgICByZXR1cm4gVHJ1ZVxuXG4gICAgRW51bVByb2MgPSBjdHlwZXMuV0lORlVOQ1RZUEUod2ludHlwZXMuQk9PTCwgd2ludHlwZXMuSFdORCwgd2ludHlwZXMuTFBBUkFNKVxuICAgIHVzZXIzMi5FbnVtV2luZG93cyhFbnVtUHJvYyhjYWxsYmFjayksIDApXG5cbiR7XG4gIGNvbmZpZy5ob3RrZXlcbiAgICA/IGBkZWYgb25fcGFuaWNfaG90a2V5KCk6XG4gICAgcHJpbnQoXCJcXFxcblshXSBXY2nFm25pxJl0byBza3LDs3QgYXdhcnlqbnkgKCR7Y29uZmlnLmhvdGtleX0pISBCxYJ5c2thd2ljem55IHNrYW4uLi5cIilcbiAgICBzY2FuX3dpbmRvd3MoKVxuYFxuICAgIDogJydcbn1cbmlmIF9fbmFtZV9fID09IFwiX19tYWluX19cIjpcbiAgICBwcmludChcIlsqXSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKVxuICAgIHByaW50KFwiWypdIEFOVFktT1ZFUkxBWSBTRU5USU5FTDogUEUgQ09SUlVQVE9SICYgQUNMIERFRkVOU0UgKDEwMCUgT0ZGTElORSlcIilcbiAgICBwcmludChmXCJbKl0gSW50ZXJ3YcWCIHNrYW5vd2FuaWEgOiAke2NvbmZpZy5wb2xsSW50ZXJ2YWxNc30gbXMuXCIpXG4gICAgcHJpbnQoZlwiWypdIFRyeWIgcmVha2NqaSAgICAgICAgOiAke2NvbmZpZy5hY3Rpb24udG9VcHBlckNhc2UoKX1cIilcbiAgICAke2NvbmZpZy5ob3RrZXkgPyBgcHJpbnQoZlwiWypdIFNrcsOzdCBhd2FyeWpueSAgICAgIDogWyR7Y29uZmlnLmhvdGtleS50b1VwcGVyQ2FzZSgpfV1cIilcXG4gICAga2V5Ym9hcmQuYWRkX2hvdGtleShcIiR7Y29uZmlnLmhvdGtleX1cIiwgb25fcGFuaWNfaG90a2V5KWAgOiAnJ31cbiAgICBwcmludChcIlsqXSBOYWNpxZtuaWogQ3RybCtDIGFieSB6YXRyenltYcSHLlwiKVxuICAgIHByaW50KFwiWypdID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpXG4gICAgXG4gICAgdHJ5OlxuICAgICAgICB3aGlsZSBUcnVlOlxuICAgICAgICAgICAgc2Nhbl93aW5kb3dzKClcbiAgICAgICAgICAgIHRpbWUuc2xlZXAoJHtjb25maWcucG9sbEludGVydmFsTXMgLyAxMDAwfSlcbiAgICBleGNlcHQgS2V5Ym9hcmRJbnRlcnJ1cHQ6XG4gICAgICAgIHByaW50KFwiXFxcXG5bKl0gWmFrb8WEY3pvbm8gbW9uaXRvcm93YW5pZS5cIilcbmA7XG59XG4iXSwibWFwcGluZ3MiOiJBQUVPLGdCQUFTLDJCQUEyQixRQUFvQztBQUM3RSxRQUFNLGlCQUFpQixPQUFPLFdBQVcsZ0JBQWdCLE9BQU8sV0FBVztBQUMzRSxRQUFNLGVBQWUsT0FBTyxXQUFXLGlCQUFpQixPQUFPLFdBQVc7QUFDMUUsUUFBTSxXQUFXLE9BQU8sc0JBQXNC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LHFCQUl6RCxLQUFLLFVBQVUsT0FBTyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBMkZ6RSxhQUFhLG1CQUNUO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBS0EsYUFBYSxtQkFDYjtBQUFBO0FBQUE7QUFBQSx5QkFJQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBcUJOO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQThCRixtQkFDSTtBQUFBLGtDQUVBLEVBQ047QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFB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