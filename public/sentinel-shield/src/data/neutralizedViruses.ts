export const INITIAL_NEUTRALIZED_THREATS = [
  {
    id: "threat-adware-popup-storm",
    name: "Adware.Win32.PopupStorm.Gen",
    alias: "TopMost Adware Cascade & HWND Hijacker v9.1",
    category: "Popup Storm",
    severity: "CRITICAL",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2026-02-18",
    neutralizedAt: "2026-08-17 03:14:22 UTC",
    targetOS: ["windows", "linux", "macos"],
    sha256Hash: "9a77b819f03cc09b821415df8a149c4f6b2181de847bbd3876e481134015dc9a",
    entropy: 7.96,
    description: "Agresywny generator wyskakujących okien i pętli HWND_TOPMOST. Tworzy kaskadę nieusuwalnych okien dialogowych reklamujących fałszywe oprogramowanie, przejmuje komunikaty WM_CLOSE i resetuje pozycję okna w pętli 60 Hz przy próbie zamknięcia.",
    aggressionMechanism: {
      title: "Pętla Kaskady Okien Dialogowych & Ignorowanie WM_CLOSE",
      summary: "Podpięcie hooka okiennego i ignorowanie sygnałów zamknięcia przez ponowne generowanie HWND w wątkach potomnych.",
      technicalDetails: [
        "Przechwytywanie procedury WndProc okna i ignorowanie komunikatów WM_CLOSE oraz WM_DESTROY.",
        "Wymuszanie styli WS_POPUP | WS_EX_TOPMOST | WS_EX_LAYERED w celu uniemożliwienia przesunięcia okna.",
        "Wielowątkowe generowanie 10 kolejnych okien potomnych w przypadku wykrycia próby kliknięcia przycisku [X].",
        "Podpięcie mechanizmu autostartu w rejestrze i ukrytego zadania harmonogramu Schtasks."
      ],
      apisAbused: ["CreateWindowExW(WS_POPUP)", "SetWindowPos(HWND_TOPMOST)", "SetWindowsHookExW", "CreateProcessW"]
    },
    infectionVector: {
      channel: "Zatruta paczka instalacyjna freeware / Fałszywy instalator kodeków wideo",
      method: "Wstrzyknięcie biblioteki popup_engine.dll do procesów użytkownika i instalacja demona.",
      payloadType: "PE32+ Executable z zaszyfrowanymi zasobami HTML/DHTML dla okien dialogowych.",
      vulnerabilityCve: "CVE-2025-4190 (Desktop Window Manager Unsandboxed Focus Stealing)",
      exploitChain: [
        "1. Uruchomienie instalatora sponsorowanego z dołączonym dropperem adware.",
        "2. Upuszczenie binarnego payloadu do %LOCALAPPDATA%\\Temp\\adware_alert_daemon.exe.",
        "3. Inicjalizacja pętli tworzenia okien popup w tle.",
        "4. Zablokowanie zamykania przez dynamiczną kaskadę HWND."
      ]
    },
    neutralizationDetails: {
      methodName: "Trwałe Uszkodzenie Pętli Okien (Window Decapitation) + Czyszczenie Rejestru",
      slaughterMechanism: "Błyskawiczne zrzucenie styli okna (SetWindowLongPtr), zniszczenie uchwytów HWND, zamrożenie wątków w RAM (NtSuspendProcess) oraz likwidacja kluczy autostartu.",
      executionSteps: [
        {
          step: 1,
          action: "Zdjęcie flag WS_EX_TOPMOST oraz WS_POPUP z każdego okna kaskady",
          targetApi: "user32.SetWindowLongPtrW(hwnd, GWL_EXSTYLE, exStyle & ~WS_EX_TOPMOST)",
          result: "Wszystkie okna pozbawione priorytetu Z-Order",
          timestamp: "00:00.001"
        },
        {
          step: 2,
          action: "Wymuszone zniszczenie uchwytów HWND bez wywoływania procedury WndProc agresora",
          targetApi: "user32.DestroyWindow(hwnd)",
          result: "Pętla okien zerwana, okna zlikwidowane z bufora DWM",
          timestamp: "00:00.003"
        },
        {
          step: 3,
          action: "Binarne zamrożenie i uśmiercenie procesu matki adware",
          targetApi: "ntdll.NtSuspendProcess + TerminateProcess(0xDEADBEEF)",
          result: "Proces adware_alert_daemon.exe spopielony",
          timestamp: "00:00.006"
        },
        {
          step: 4,
          action: "Eradikacja wpisów autostartu i zaplanowanych zadań",
          targetApi: "RegDeleteValueW(HKCU\\...\\Run) + schtasks /delete /tn AdwareTask /f",
          result: "Wszystkie wektory powrotu adware trwale usunięte",
          timestamp: "00:00.012"
        }
      ],
      quarantineProof: "Wszystkie HWND zniszczone | Pamięć RAM czysta | Klucze rejestru zneutralizowane | Sygnatura PE zamazana zerami.",
      pythonKillSnippet: `import ctypes, psutil, winreg
user32 = ctypes.windll.user32
ntdll = ctypes.windll.ntdll

def kill_popup_adware():
    for p in psutil.process_iter(['pid', 'name']):
        if 'adware' in (p.info['name'] or '').lower() or 'popup' in (p.info['name'] or '').lower():
            h = ctypes.windll.kernel32.OpenProcess(0x1F0FFF, False, p.info['pid'])
            if h:
                ntdll.NtSuspendProcess(h)
                ctypes.windll.kernel32.TerminateProcess(h, 0xDEADBEEF)
                ctypes.windll.kernel32.CloseHandle(h)
                print(f"[+] Zniszczono proces adware: {p.info['name']} (PID: {p.info['pid']})")
`
    }
  },
  {
    id: "threat-flutter-locker",
    name: "FlutterLocker.Win32.OverlayKiller",
    alias: "TopMost Window Trap v4.2",
    category: "Screen Locker",
    severity: "CRITICAL",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-11-14",
    neutralizedAt: "2026-08-16 04:12:09 UTC",
    targetOS: ["windows", "linux", "macos"],
    sha256Hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    entropy: 7.94,
    description: "Zaawansowana nakładka pełnoekranowa skompilowana w technologii Flutter Desktop (flutter_windows.dll). Przejmuje pełny ekran w trybie HWND_TOPMOST, kradnie fokus co 10 milisekund i blokuje kombinacje Alt+Tab, Win+D oraz menedżer zadań.",
    aggressionMechanism: {
      title: "Agresywne Przejęcie Z-Order i Kradzież Fokusu Win32",
      summary: "Manipulacja oknem za pomocą SetWindowPos(HWND_TOPMOST) w pętli 100 Hz oraz wywołanie SetForegroundWindow z blokadą raw input listenera.",
      technicalDetails: [
        "Wywołanie SetWindowPos(hwnd, HWND_TOPMOST, 0, 0, screen_w, screen_h, SWP_SHOWWINDOW | SWP_NOACTIVATE) w pętli zdarzeń.",
        "Podpięcie biblioteki bitsdojo_window / window_manager z wymuszeniem parametru isAlwaysOnTop=true oraz isFullScreen=true.",
        "Wywłaszczenie pętli komunikatów systemowych przez ciągłe wywoływanie SetForegroundWindow i BringWindowToTop.",
        "Zarejestrowanie globalnego hooka klawiatury WH_KEYBOARD_LL, który zwraca wartość 1 dla kodów VK_ESCAPE, VK_TAB, VK_LWIN i VK_RWIN, neutralizując skróty systemowe."
      ],
      apisAbused: ["SetWindowPos (HWND_TOPMOST)", "SetForegroundWindow", "SetWindowsHookExW (WH_KEYBOARD_LL)", "flutter_windows.dll::FlutterDesktopEngineRun"]
    },
    infectionVector: {
      channel: "Zatruta paczka zależności (Supply Chain Attack) / Sfałszowany Instalator GUI",
      method: "Zatrucie publicznego repozytorium bibliotek komponentów interfejsu (trojanized flutter_custom_ui) oraz fałszywa aktualizacja kodeków audio.",
      payloadType: "Standalone x64 PE Binary z wbudowanym zasobem Flutter assets i skompilowanym kodem Dart AOT.",
      vulnerabilityCve: "CVE-2024-9182 (Improper Input & Focus Sandboxing in Desktop Frameworks)",
      exploitChain: [
        "1. Pobranie złośliwej paczki przez instalator lub program do automatyzacji zadań.",
        "2. Upuszczenie binarnego payloadu do %LOCALAPPDATA%\\Programs\\OverlayHelper\\overlay_runner.exe.",
        "3. Wpis do autostartu (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run).",
        "4. Natychmiastowe uruchomienie z uprawnieniami bieżącego użytkownika i inicjalizacja blokady ekranu."
      ]
    },
    neutralizationDetails: {
      methodName: "Dynamiczny Ubój Pamięciowy (NtSuspendProcess) + Sabotaż Nagłówka MZ/PE",
      slaughterMechanism: "Natychmiastowe zamrożenie stanu wątków w RAM przy użyciu ntdll.NtSuspendProcess bez możliwości wykonania procedur niszczących, zrzucenie flagi TOPMOST z okna, uśmiercenie procesu i unieważnienie uprawnień NTFS pliku.",
      executionSteps: [
        {
          step: 1,
          action: "Identyfikacja PID i pobranie uchwytu procesu z uprawnieniami PROCESS_ALL_ACCESS",
          targetApi: "kernel32.OpenProcess(0x1F0FFF, False, pid)",
          result: "Uchwyt hProcess=0x000004BC otwarty pomyślnie",
          timestamp: "00:00.002"
        },
        {
          step: 2,
          action: "Binarne zamrożenie wątków w pamięci RAM (Zero CPU execution cycles)",
          targetApi: "ntdll.NtSuspendProcess(hProcess)",
          result: "Wszystkie 14 wątków Fluttera unieruchomione",
          timestamp: "00:00.005"
        },
        {
          step: 3,
          action: "Zdjęcie flagi HWND_TOPMOST z okna i minimalizacja",
          targetApi: "user32.SetWindowPos(hwnd, HWND_NOTOPMOST, 0, 0, 0, 0, SWP_NOMOVE | SWP_NOSIZE | SWP_HIDEWINDOW)",
          result: "Z-Order przywrócony, pulpit odblokowany",
          timestamp: "00:00.009"
        },
        {
          step: 4,
          action: "Egzekucja procesu i ubój potomków drzewa",
          targetApi: "kernel32.TerminateProcess(hProcess, 0xDEADBEEF)",
          result: "Kod wyjścia 0xDEADBEEF, proces zlikwidowany",
          timestamp: "00:00.014"
        },
        {
          step: 5,
          action: "Kwarantanna i sabotaż nagłówka PE (zerowanie bajtów MZ)",
          targetApi: "SetNamedSecurityInfo / icacls /deny Everyone:(F)",
          result: "Plik zablokowany, sygnatura PE nadpisana zerami",
          timestamp: "00:00.021"
        }
      ],
      quarantineProof: "SHA256 binarnego wraku: e3b0c44298fc1c14... | Uprawnienia NTFS: ACL DENY EVERYONE | Nagłówek PE: 0x00000000 (WIPED)",
      pythonKillSnippet: `import ctypes, psutil, os

def slaughter_flutter_locker():
    ntdll = ctypes.windll.ntdll
    k32 = ctypes.windll.kernel32
    u32 = ctypes.windll.user32
    
    for proc in psutil.process_iter(['pid', 'name', 'exe']):
        name = (proc.info['name'] or '').lower()
        if 'flutter' in name or 'overlay' in name:
            pid = proc.info['pid']
            h = k32.OpenProcess(0x1F0FFF, False, pid)
            if h:
                ntdll.NtSuspendProcess(h)
                k32.TerminateProcess(h, 0xDEADBEEF)
                k32.CloseHandle(h)
            if proc.info['exe'] and os.path.exists(proc.info['exe']):
                with open(proc.info['exe'], 'r+b') as f:
                    f.seek(0)
                    f.write(b'\\x00' * 1024)
                os.system(f'icacls "{proc.info["exe"]}" /deny Everyone:(F) >nul 2>&1')
`
    }
  },
  {
    id: "threat-redline-stealer",
    name: "RedLine.Stealer.HookMaster",
    alias: "RedLine Credential & Overlay Spy",
    category: "Trojan Overlay",
    severity: "CRITICAL",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-08-20",
    neutralizedAt: "2026-08-16 02:45:11 UTC",
    targetOS: ["windows"],
    sha256Hash: "a7c9381fbb4621c54b7c8df0c36b41295b958c2794c4897f262a4d33457a8bf1",
    entropy: 7.88,
    description: "Groźny infostealer połączony z przezroczystą nakładką GUI na przeglądarki Chrome, Brave i Edge. Podmienia pola haseł i portfeli kryptowalutowych (MetaMask, Phantom) fałszywym oknem podglądu.",
    aggressionMechanism: {
      title: "Przechwytywanie Pól Hasłowych i Podmienianie Schowka",
      summary: "Tworzenie przezroczystego okna WS_EX_LAYERED | WS_EX_TRANSPARENT idealnie nad oknami przeglądarek i kradzież danych logowania.",
      technicalDetails: [
        "Monitorowanie procesów przeglądarek za pośrednictwem pętli CreateToolhelp32Snapshot.",
        "Nakładanie fałszywych ramek modalnych imitujących okna logowania Google / MetaMask.",
        "Wstrzykiwanie wątków (CreateRemoteThread) do pamięci explorer.exe w celu ukrycia procesu nadrzędnego.",
        "Kradzież tokenów sesyjnych Discord, plików cookies i baz danych SQLite z profilu użytkownika."
      ],
      apisAbused: ["CreateRemoteThread", "VirtualAllocEx", "WriteProcessMemory", "SetClipboardData", "SetWindowLongPtrA (WS_EX_LAYERED)"]
    },
    infectionVector: {
      channel: "Złośliwe wyniki wyszukiwania (SEO Poisoning) / Fałszywe oprogramowanie Crack",
      method: "Pobranie archiwum ZIP ze spakowanym loaderem chronionym hasłem w celu ominięcia skanerów antywirusowych bramki pocztowej.",
      payloadType: ".NET Assembly z obfuskacją ConfuserEx v2.",
      vulnerabilityCve: "CVE-2023-38831 (WinRAR Remote Code Execution)",
      exploitChain: [
        "1. Pobranie złośliwego archiwum .rar/.zip udającego generator licencji.",
        "2. Eksploitacja błędu parsera archiwów i ciche uruchomienie pliku wsadowego .cmd.",
        "3. Wstrzyknięcie payloadu .NET do procesu svchost.exe.",
        "4. Inicjalizacja komponentu nakładki ekranowej do przejmowania fraz seed i haseł."
      ]
    },
    neutralizationDetails: {
      methodName: "Unieszkodliwienie Wątków w Pamięci + Trwała Blokada IFEO Debugger",
      slaughterMechanism: "Wytropienie ukrytego procesu, zerwanie połączeń TCP C2 za pomocą uboju gniazd sieciowych, zamrożenie procesu nadrzędnego i podmiana klucza Image File Execution Options na czarną dziurę (systray_blackhole.exe).",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie zamaskowanego procesu za pomocą skanowania entropii pamięci",
          targetApi: "VirtualQueryEx + NtQueryInformationProcess",
          result: "Zidentyfikowano wstrzyknięty moduł w PID=4120",
          timestamp: "00:00.003"
        },
        {
          step: 2,
          action: "Odcięcie komunikacji z serwerem C2 (Command & Control)",
          targetApi: "iphlpapi.SetTcpEntry (MIB_TCP_STATE_DELETE_TCB)",
          result: "Gniazda TCP 185.220.101.4:443 natychmiast zresetowane",
          timestamp: "00:00.007"
        },
        {
          step: 3,
          action: "Egzekucja procesu i czyszczenie wstrzykniętych regionów pamięci",
          targetApi: "TerminateProcess(0xC0000005) + VirtualFreeEx",
          result: "Pamięć uwolniona, złośliwy wątek usunięty",
          timestamp: "00:00.012"
        },
        {
          step: 4,
          action: "Zablokowanie ponownego uruchomienia w rejestrze (IFEO Lockout)",
          targetApi: "RegCreateKeyEx (HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options)",
          result: "Klucz Debugger ustawiony na ntdll.dll (blokada startu)",
          timestamp: "00:00.019"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | C2 zablokowany | Rejestr IFEO zaryglowany",
      pythonKillSnippet: `import winreg, psutil, os

def purge_redline():
    for p in psutil.process_iter(['pid', 'name']):
        if p.info['name'] and 'redline' in p.info['name'].lower():
            p.kill()
    key_path = r"SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\redline.exe"
    try:
        with winreg.CreateKey(winreg.HKEY_LOCAL_MACHINE, key_path) as key:
            winreg.SetValueEx(key, "Debugger", 0, winreg.REG_SZ, "systray_blackhole.exe")
    except Exception as e:
        print(f"Błąd IFEO: {e}")
`
    }
  },
  {
    id: "threat-hermetic-wiper",
    name: "HermeticWiper.MasterAnnihilator",
    alias: "FoxBlade / DataWiper x64",
    category: "Process Wiper",
    severity: "EXTREME",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2024-02-23",
    neutralizedAt: "2026-08-16 01:19:30 UTC",
    targetOS: ["windows"],
    sha256Hash: "0385e05d9299491a62d08a543f49377be834dbba6d66e74b7c1abf83427be5fa",
    entropy: 7.97,
    description: "Destrukcyjny malware niszczący Master Boot Record (MBR), tablice partycji GUID (GPT) oraz struktury systemu plików NTFS (Master File Table - $MFT), wyświetlający fałszywą nakładkę aktualizacji systemu.",
    aggressionMechanism: {
      title: "Bezpośrednie Otwieranie Dysków Fizycznych (\\\\.\\PhysicalDrive0) i Destrukcja MBR",
      summary: "Uzyskanie uprawnień SeLoadDriverPrivilege, załadowanie podpisanego cyfrowo sterownika partycjonowania i zerowanie pierwszych sektorów dysków.",
      technicalDetails: [
        "Wywołanie CreateFileW z flagami GENERIC_READ | GENERIC_WRITE na urządzeniu surowym \\\\.\\PhysicalDrive0.",
        "Manipulacja strukturą MBR i GPT poprzez DeviceIoControl (FSCTL_LOCK_VOLUME, IOCTL_DISK_GET_DRIVE_LAYOUT_EX).",
        "Zastąpienie ekranu pulpitu fałszywym oknem błędu Windows Update w trybie ekskluzywnym, by uniemożliwić użytkownikowi reakcję.",
        "Wymuszenie natychmiastowego resetu zasilania (NtRaiseHardError / NtShutdownSystem) po zakończeniu niszczenia danych."
      ],
      apisAbused: ["CreateFileW (PhysicalDrive)", "DeviceIoControl", "AdjustTokenPrivileges", "NtRaiseHardError", "FSCTL_LOCK_VOLUME"]
    },
    infectionVector: {
      channel: "Kompromitacja Domeny Active Directory / Złośliwe Zasady Grupy (GPO)",
      method: "Rozprzestrzenianie za pośrednictwem skompromitowanego kontrolera domeny i zaplanowanych zadań (PsExec / WMI).",
      payloadType: "Natywna 32/64-bitowa binarka PE z legalnym, skradzionym certyfikatem cyfrowym Hermetica Digital Ltd.",
      vulnerabilityCve: "CVE-2021-34527 (PrintNightmare RCE) + CVE-2020-1472 (Zerologon)",
      exploitChain: [
        "1. Przejęcie uprawnień administratora domeny za pomocą luki Zerologon.",
        "2. Wypchnięcie paczki instalacyjnej na stacje robocze przez obiekt GPO.",
        "3. Wdrożenie i rejestracja złośliwego sterownika epmntdrv.sys.",
        "4. Zablokowanie ekranu nakładką maskującą i natychmiastowe niszczenie sektorów rozruchowych dysków."
      ]
    },
    neutralizationDetails: {
      methodName: "Awaryjny Wywłaszczający Kill-Chain + Cofnięcie Uprawnień Raw Disk I/O",
      slaughterMechanism: "Wykrycie zablokowanych wolumenów FSCTL, natychmiastowy twardy SIGKILL jądra, odładowanie złośliwego sterownika kernel-mode oraz zablokowanie uchwytów PhysicalDrive.",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie prób otwarcia uchwytów do PhysicalDrive i MBR",
          targetApi: "kernel32.CreateFileW(\\\\.\\PhysicalDrive0)",
          result: "Przechwycono próbę surowego zapisu do sektora 0",
          timestamp: "00:00.001"
        },
        {
          step: 2,
          action: "Awaryjne odcięcie uprawnień SeLoadDriverPrivilege i SeDebugPrivilege",
          targetApi: "advapi32.AdjustTokenPrivileges (SE_PRIVILEGE_REMOVED)",
          result: "Uprawnienia uprzywilejowane procesu odebrane",
          timestamp: "00:00.003"
        },
        {
          step: 3,
          action: "Natychmiastowe zniszczenie procesu wipera (Zero Grace Period)",
          targetApi: "ntdll.NtTerminateProcess(hProcess, 0)",
          result: "Proces zlikwidowany w 3 ms, MBR ocalony",
          timestamp: "00:00.006"
        },
        {
          step: 4,
          action: "Skasowanie złośliwych sterowników z rejestru usług",
          targetApi: "advapi32.DeleteService",
          result: "Sterownik epmntdrv trwale usunięty z listy usług",
          timestamp: "00:00.011"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | MBR nienaruszony | Sterownik usunięty | Entropia binarnego wraku: 0.00 (wyczyszczony)",
      pythonKillSnippet: `import ctypes, psutil

def purge_wiper():
    k32 = ctypes.windll.kernel32
    for p in psutil.process_iter(['pid', 'name']):
        if p.info['name'] and any(x in p.info['name'].lower() for x in ['wiper', 'hermetic', 'foxblade']):
            h = k32.OpenProcess(0x1, False, p.info['pid'])
            if h:
                k32.TerminateProcess(h, 0)
                k32.CloseHandle(h)
            p.kill()
`
    }
  },
  {
    id: "threat-blackcat-alphv",
    name: "BlackCat/ALPHV.LockScreenExtortionist",
    alias: "ALPHV Rust-Locker v3",
    category: "Ransomware",
    severity: "CRITICAL",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-06-11",
    neutralizedAt: "2026-08-16 03:02:18 UTC",
    targetOS: ["windows", "linux"],
    sha256Hash: "bc88712dfa7c8742c3d1976a47a46973e46b9a896d9333333333333333333333",
    entropy: 7.91,
    description: "Napisany w języku Rust ransomware blokujący ekran agresywnym oknem żądania okupu z licznikami czasu, szyfrujący pliki algorytmem ChaCha20-Poly1305 i niszczący kopie w tle (VSS Shadow Copies).",
    aggressionMechanism: {
      title: "Zatrzymanie Usług Systemowych, Kasowanie Kopii Cieniowych i Blokada Pulpitu",
      summary: "Wywołanie komend vssadmin delete shadows /all /quiet, zatrzymanie procesów SQL/Exchange i wyświetlenie okna modalnego w trybie wyłączności klawiatury.",
      technicalDetails: [
        "Zastosowanie biblioteki windows-rs do stworzenia niezniszczalnego okna w pętli obsługi wyjątków SEH.",
        "Wykonywanie asynchronicznego szyfrowania plików z użyciem wielowątkowości rayon (128 wątków równolegle).",
        "Zatrzymanie usług bazodanowych: MSSQL, MySQL, Veeam, BackupExec za pomocą interfejsu Service Control Manager.",
        "Modyfikacja tapety pulpitu i zablokowanie uruchamiania regedit, taskmgr i cmd."
      ],
      apisAbused: ["OpenSCManagerW", "EnumServicesStatusExW", "CryptGenRandom", "vssadmin.exe", "SetWindowPos"]
    },
    infectionVector: {
      channel: "Niezabezpieczone Porty RDP (Remote Desktop) / Podatności w bramach VPN",
      method: "Brute-force poświadczeń RDP oraz wykorzystanie skradzionych danych uwierzytelniających administratora z wycieków.",
      payloadType: "Skompilowana binarka w języku Rust (x86_64-pc-windows-msvc) z kompresją UPX i modyfikowanym nagłówkiem.",
      vulnerabilityCve: "CVE-2023-46805 (Ivanti Connect Secure Auth Bypass)",
      exploitChain: [
        "1. Przełamanie bramy VPN za pomocą podatności ominięcia autoryzacji.",
        "2. Rekonesans sieciowy i zrzucenie poświadczeń z procesu lsass.exe.",
        "3. Równoległe uruchomienie pliku wsadowego z ransomware BlackCat na wszystkich stacjach.",
        "4. Zablokowanie ekranu nakładką okupu i rozpoczęcie szyfrowania dysków."
      ]
    },
    neutralizationDetails: {
      methodName: "Wielowątkowa Pętla Eksterminacji + Ochrona Wolumenów VSS",
      slaughterMechanism: "Zamrożenie pętli szyfrującej, przywrócenie uprawnień kontrolera VSS, ubój procesów potomnych i wyczyszczenie wpisów blokujących z rejestru.",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie prób wywołania vssadmin i bcdedit",
          targetApi: "Process Creation Interception",
          result: "Przechwycono i zablokowano komendę kasowania kopii cieniowych",
          timestamp: "00:00.002"
        },
        {
          step: 2,
          action: "Masowe zamrożenie wątków szyfrujących (Rayon Thread Pool)",
          targetApi: "ntdll.NtSuspendProcess",
          result: "128 wątków szyfrujących wstrzymano w pamięci",
          timestamp: "00:00.004"
        },
        {
          step: 3,
          action: "Zniszczenie procesu ransomware i zabezpieczenie kluczy szyfrujących w RAM",
          targetApi: "kernel32.TerminateProcess",
          result: "Proces zlikwidowany, fragmenty pamięci zrzucone do analizy",
          timestamp: "00:00.008"
        },
        {
          step: 4,
          action: "Przywrócenie działania menedżera zadań i rejestru",
          targetApi: "RegDeleteValue (HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\System)",
          result: "Wartość DisableTaskMgr usunięta, system odblokowany",
          timestamp: "00:00.015"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | Pliki ocalone | Kopie VSS zachowane",
      pythonKillSnippet: `import os, psutil

def purge_blackcat():
    for proc in psutil.process_iter(['pid', 'name']):
        if proc.info['name'] and ('blackcat' in proc.info['name'].lower() or 'alphv' in proc.info['name'].lower()):
            proc.kill()
    # Odblokowanie menedżera zadań
    os.system('reg delete "HKCU\\\\Software\\\\Microsoft\\\\Windows\\\\CurrentVersion\\\\Policies\\\\System" /v DisableTaskMgr /f >nul 2>&1')
`
    }
  },
  {
    id: "threat-pylock-screenfreeze",
    name: "PyLock.ScreenFreeze.v4",
    alias: "Python Tkinter/PyQt Fullscreen Grabber",
    category: "Screen Locker",
    severity: "HIGH",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-09-02",
    neutralizedAt: "2026-08-16 00:54:12 UTC",
    targetOS: ["windows", "linux", "macos"],
    sha256Hash: "91f82c479426f8d098e98ec7a922374b5952f44485501869e5d41c96cb623912",
    entropy: 7.62,
    description: 'Skrypt w języku Python spakowany do pojedynczego pliku .exe (PyInstaller), tworzący okno Tkinter/PyQt w trybie `attributes("-fullscreen", True)` z przechwytywaniem wszystkich zdarzeń myszy i klawiatury `grab_set_global()`.',
    aggressionMechanism: {
      title: "Globalne Przejęcie Zdarzeń Wejścia i Pętla Ukrywania Kursora",
      summary: "Wykorzystanie Tkinter `wm_overrideredirect(True)` oraz `grab_set_global()`, które odcina pozostałe aplikacje systemu od komunikatów wejścia.",
      technicalDetails: [
        "Wywołanie okna z parametrem overrideredirect usuwającym pasek tytułu i przyciski systemowe.",
        'Wymuszenie ciągłego utrzymywania wierzchu za pomocą `root.lift()` oraz `root.attributes("-topmost", True)`.',
        "Podpięcie zdarzenia `<FocusOut>` powodującego natychmiastowe przywrócenie fokusu `root.focus_force()`.",
        'Ukrycie kursora myszy `root.config(cursor="none")` i zablokowanie zamykania oknem `protocol("WM_DELETE_WINDOW", lambda: None)`.'
      ],
      apisAbused: ["Tkinter::grab_set_global", "wm_overrideredirect", "attributes(-topmost)", "PyInstaller Bootloader"]
    },
    infectionVector: {
      channel: "Zainfekowane Pakiety PyPI (Typosquatting) / Discord Bot Tools",
      method: "Pobranie fałszywego modułu pythona (np. `reqeusts` lub `colorama-v2`) z repozytorium PyPI zawierającego złośliwy kod w `setup.py`.",
      payloadType: "Skompilowane archiwum PyInstaller zawierające interpreter Pythona i zasoby skryptu.",
      vulnerabilityCve: "N/A (Czyste nadużycie interfejsów okienkowych GUI)",
      exploitChain: [
        "1. Programista lub użytkownik instaluje literówkowy pakiet pip.",
        "2. Kod w `setup.py` pobiera i uruchamia w tle skompilowany plik PyLock.exe.",
        "3. Okno natychmiast przykrywa pulpit i żąda opłaty za odblokowanie.",
        "4. Zablokowanie możliwości zamknięcia przez standardowe zdarzenia systemowe."
      ]
    },
    neutralizationDetails: {
      methodName: "Wykrycie Sygnatury PyInstallera + Zrzucenie Uchwytu Okna i SIGKILL",
      slaughterMechanism: "Wyszukanie procesu ładującego biblioteki `python*.dll` lub `_tkinter.pyd`, zrzucenie właściwości okna przez EnumWindows i natychmiastowe zamknięcie procesu macierzystego.",
      executionSteps: [
        {
          step: 1,
          action: "Wyszukanie procesów z załadowanymi bibliotekami python3.dll / tkinter",
          targetApi: "EnumProcessModules",
          result: "Zidentyfikowano proces python_locker.exe (PID 6280)",
          timestamp: "00:00.002"
        },
        {
          step: 2,
          action: "Wysłanie komunikatu WM_CLOSE i WM_DESTROY do uchwytu okna",
          targetApi: "PostMessageW(hwnd, WM_CLOSE, 0, 0)",
          result: "Pętla Tkinter przerwana",
          timestamp: "00:00.005"
        },
        {
          step: 3,
          action: "Ostateczna likwidacja procesu",
          targetApi: "kernel32.TerminateProcess",
          result: "Proces zlikwidowany",
          timestamp: "00:00.008"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | Plik tymczasowy _MEI* wyczyszczony z %TEMP%",
      pythonKillSnippet: `import psutil, os

def kill_pylock():
    for p in psutil.process_iter(['pid', 'name']):
        if p.info['name'] and 'pylock' in p.info['name'].lower():
            p.kill()
`
    }
  },
  {
    id: "threat-xmrig-ghostminer",
    name: "XMRig.HiddenGhostMiner.x64",
    alias: "GhostMiner Overlay Stealth",
    category: "Stealth Miner",
    severity: "HIGH",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-10-05",
    neutralizedAt: "2026-08-16 05:11:02 UTC",
    targetOS: ["windows", "linux"],
    sha256Hash: "4a3b2c1d0e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b",
    entropy: 7.79,
    description: "Ukryta koparka kryptowalut Monero (XMR), która nakłada niewidoczną, przezroczystą warstwę na ekran i pauzuje swoje wątki w momencie otwarcia Menedżera Zadań lub Process Hackera, maskując zużycie CPU.",
    aggressionMechanism: {
      title: "Dynamiczne Ukrywanie Przed Narzędziami Diagnostycznymi i Przechwytywanie Wątków",
      summary: 'Ciągłe skanowanie listy okien w poszukiwaniu nazw "Task Manager", "Process Explorer" i natychmiastowe obniżanie zużycia procesora do 0%.',
      technicalDetails: [
        "Monitorowanie procesów za pomocą FindWindowA i EnumWindows.",
        "Wstrzyknięcie złośliwego kodu do procesu svchost.exe przez Process Hollowing.",
        "Używanie instrukcji SSE/AVX do maksymalizacji haszowania RandomX przy braku aktywności użytkownika.",
        "Blokowanie aktualizacji Windows Update i wyłączanie zapory sieciowej."
      ],
      apisAbused: ["NtUnmapViewOfSection", "VirtualAllocEx", "SetThreadContext", "FindWindowA"]
    },
    infectionVector: {
      channel: "Zainfekowane instalatory gier i modów / Torrenty",
      method: "Wpakowanie koparki jako cichego instalatora w tle podczas instalacji modyfikacji do gier.",
      payloadType: "Zaciemniony dropper C++ z zasobem zrzuconym do pamięci.",
      vulnerabilityCve: "CVE-2024-38077 (Windows Remote Desktop Licensing RCE)",
      exploitChain: [
        "1. Użytkownik uruchamia instalator moda do gry.",
        "2. Instalator upuszcza plik wininit_miner.exe w katalogu AppData.",
        "3. Dodanie zadania w harmonogramie zadań z uprawnieniami SYSTEM.",
        "4. Rozpoczęcie wydobycia w tle z detekcją otwarcia Menedżera Zadań."
      ]
    },
    neutralizationDetails: {
      methodName: "Heurystyczna Detekcja Instrukcji AVX + Ubój Procesu Nadrzędnego",
      slaughterMechanism: "Wytropienie procesu po wzorcach alokacji pamięci RandomX (2 GB HugePages) i natychmiastowe uśmiercenie wraz z usunięciem zadania w Harmonogramie Zadań.",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie nieautoryzowanej alokacji 2GB pamięci operacyjnej",
          targetApi: "VirtualQueryEx",
          result: "Zidentyfikowano bufor RandomX w PID 8144",
          timestamp: "00:00.003"
        },
        {
          step: 2,
          action: "Wymuszone uśmiercenie procesu i usunięcie z pamięci",
          targetApi: "kernel32.TerminateProcess",
          result: "Proces zlikwidowany, obciążenie CPU spadło z 100% do 1%",
          timestamp: "00:00.006"
        },
        {
          step: 3,
          action: "Skasowanie zaplanowanego zadania w harmonogramie",
          targetApi: 'schtasks.exe /Delete /TN "SystemUpdateTask" /F',
          result: "Zadanie trwale skasowane",
          timestamp: "00:00.012"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | Obciążenie CPU: 0% | Harmonogram oczyszczony",
      pythonKillSnippet: `import os, psutil

def purge_miner():
    for p in psutil.process_iter(['pid', 'name', 'cpu_percent']):
        if p.info['name'] and any(x in p.info['name'].lower() for x in ['xmrig', 'ghostminer', 'wininit_miner']):
            p.kill()
    os.system('schtasks /Delete /TN "SystemUpdateTask" /F >nul 2>&1')
`
    }
  },
  {
    id: "threat-darkwatchman-rat",
    name: "DarkWatchman.RAT.RegistryStealth",
    alias: "Fileless Registry Resident Trojan",
    category: "Rootkit Hook",
    severity: "EXTREME",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-07-19",
    neutralizedAt: "2026-08-16 03:33:45 UTC",
    targetOS: ["windows"],
    sha256Hash: "c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2",
    entropy: 7.85,
    description: "Niezwykle zaawansowany trojan bezplikowy (Fileless Malware), który ukrywa cały swój payload w kluczach rejestru Windows i wykorzystuje skrypt JavaScript w mshta.exe oraz PowerShell do rejestracji globalnych hooków okienkowych.",
    aggressionMechanism: {
      title: "Bezplikowa Rezydentura w Rejestrze i Przechwytywanie Wejścia",
      summary: "Przechowywanie zaszyfrowanego kodu w rejestrze i wykonywanie za pomocą natywnego interpretera Windows bez zapisywania plików na dysku.",
      technicalDetails: [
        "Zapisywanie payloadu w kluczu HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths.",
        "Wykonywanie za pośrednictwem wbudowanych narzędzi (LOLBins - Living off the Land Binaries) jak mshta, rundll32, regsvr32.",
        "Podgląd ekranu użytkownika i generowanie fałszywych monitów UAC w celu wyłudzenia hasła administratora.",
        "Zarządzanie poprzez kanał C2 z enkapsulacją w zapytaniach DNS (DNS Tunneling)."
      ],
      apisAbused: ["RegSetValueExW", "mshta.exe", "SetWindowsHookEx", "DnsQuery_W"]
    },
    infectionVector: {
      channel: "Ukierunkowany Spear-Phishing z Złośliwym Archiwum ZIP/LNK",
      method: "Załącznik e-mail z fałszywym plikiem .LNK (skrótem) imitującym dokument PDF z fakturą.",
      payloadType: "Skrypt JScript / PowerShell ładowany dynamicznie do pamięci procesu.",
      vulnerabilityCve: "CVE-2024-21412 (Internet Shortcut Files Security Feature Bypass)",
      exploitChain: [
        "1. Użytkownik klika fałszywy plik skrótu LNK.",
        "2. LNK wywołuje polecenie mshta vbscript:Execute(...) pobierające skrypt.",
        "3. Kod zapisuje się w rejestrze i instaluje mechanizm trwałości.",
        "4. Uruchomienie szpiegowskiej nakładki wyłudzającej dane logowania."
      ]
    },
    neutralizationDetails: {
      methodName: "Wyczyszczenie Kluczy Rejestru + Odcięcie Tunelu DNS + Ubój LolBins",
      slaughterMechanism: "Wytropienie ukrytych wartości w rejestrze, wyczyszczenie wpisów bezplikowych, zatrzymanie procesów potomnych mshta.exe i reset bufora DNS.",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie złośliwych wpisów Base64 w rejestrze HKCU",
          targetApi: "RegQueryValueExW",
          result: "Zidentyfikowano zaszyfrowany payload DarkWatchman w rejestrze",
          timestamp: "00:00.003"
        },
        {
          step: 2,
          action: "Ubój procesów mshta.exe i powershell.exe wykonujących payload",
          targetApi: "kernel32.TerminateProcess",
          result: "Procesy bezplikowe unieszkodliwione",
          timestamp: "00:00.006"
        },
        {
          step: 3,
          action: "Trwałe skasowanie skażonych kluczy rejestru",
          targetApi: "RegDeleteKeyW / RegDeleteValueW",
          result: "Klucze usunięte bezpowrotnie",
          timestamp: "00:00.010"
        },
        {
          step: 4,
          action: "Wyczyszczenie pamięci podręcznej DNS i zablokowanie domeny C2",
          targetApi: "DnsFlushResolverCache + hosts file update",
          result: "Komunikacja C2 odcięta w 100%",
          timestamp: "00:00.014"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | Rejestr wyczyszczony | DNS zabezpieczony",
      pythonKillSnippet: `import winreg, psutil, os

def purge_darkwatchman():
    for p in psutil.process_iter(['pid', 'name']):
        if p.info['name'] and p.info['name'].lower() in ['mshta.exe', 'wscript.exe', 'cscript.exe']:
            p.kill()
    os.system('ipconfig /flushdns >nul 2>&1')
`
    }
  },
  {
    id: "threat-pegasus-overlay",
    name: "Pegasus.OverlayGhost.ZeroDay",
    alias: "Mobile & Desktop Frame Mimic Spy",
    category: "Trojan Overlay",
    severity: "EXTREME",
    status: "ZNISZCZONY (100% PURGED)",
    firstSpotted: "2025-12-01",
    neutralizedAt: "2026-08-16 04:55:00 UTC",
    targetOS: ["windows", "macos", "linux"],
    sha256Hash: "f0e1d2c3b4a5968778695a4b3c2d1e0f0e1d2c3b4a5968778695a4b3c2d1e0f0",
    entropy: 7.99,
    description: "Zaawansowany szpiegowski moduł nakładkowy nowej generacji. Tworzy idealne, pixel-perfect klony okien komunikatorów (Signal, Telegram, WhatsApp), przechwytując wpisywane wiadomości przed ich zaszyfrowaniem metodą End-to-End.",
    aggressionMechanism: {
      title: "Przechwytywanie Buforów Renderowania Ramki Okna (Frame Hijacking)",
      summary: "Podpinanie się pod DirectComposition i Desktop Window Manager (DWM) w celu przechwytywania surowych pikseli i zdarzeń wejścia.",
      technicalDetails: [
        "Wykorzystanie API DirectComposition do tworzenia niewidocznych powierzchni renderowania.",
        "Wstrzyknięcie biblioteki DLL do procesu dwm.exe (Desktop Window Manager).",
        "Kradzież tokenów biometrycznych Windows Hello / Touch ID.",
        "Cicha archiwizacja dźwięku z mikrofonu przy aktywności okien rozmów."
      ],
      apisAbused: ["DwmRegisterThumbnail", "DirectComposition::CreateTarget", "OpenProcess(dwm.exe)"]
    },
    infectionVector: {
      channel: "Zero-Click Exploit przez Wiadomości Multimedialne (iMessage / WebRTC)",
      method: "Przesłanie spreparowanego pakietu wideo WebRTC powodującego przepełnienie bufora pamięci w procesie kodeka.",
      payloadType: "Binarny kod powłoki (Shellcode) w pamięci operacyjnej z automatyczną de-obfuskacją.",
      vulnerabilityCve: "CVE-2025-0199 (Zero-Click Video Processing Memory Corruption)",
      exploitChain: [
        "1. Odebranie złośliwego pakietu WebRTC bez żadnej interakcji użytkownika.",
        "2. Wykonanie shellcode w procesie przeglądarki lub komunikatora.",
        "3. Eskalacja uprawnień do poziomu NT AUTHORITY\\SYSTEM.",
        "4. Zagnieżdżenie modułu nakładki szpiegowskiej w DWM."
      ]
    },
    neutralizationDetails: {
      methodName: "Restart Usługi DWM + Oczyszczenie Pamięci Współdzielonej + Ubój Shellcode",
      slaughterMechanism: "Wymuszony kontrolowany restart procesu DWM, odcięcie złośliwych kanałów IPC i zniszczenie wstrzykniętego kodu w pamięci RAM.",
      executionSteps: [
        {
          step: 1,
          action: "Wykrycie zniekształconych haków renderowania w DWM",
          targetApi: "DwmGetCompositionTimingInfo",
          result: "Wykryto anomalię w kompozycji pulpitu",
          timestamp: "00:00.002"
        },
        {
          step: 2,
          action: "Wymuszone unieważnienie skompromitowanego procesu dwm.exe",
          targetApi: "kernel32.TerminateProcess(hDwm, 0)",
          result: "DWM zrestartowany przez winlogon w stanie czystym",
          timestamp: "00:00.005"
        },
        {
          step: 3,
          action: "Zamknięcie wszystkich podatnych gniazd WebRTC",
          targetApi: "WSAIoctl (SIO_FLUSH)",
          result: "Gniazda podsłuchowe zresetowane",
          timestamp: "00:00.009"
        }
      ],
      quarantineProof: "Status: 100% ZNISZCZONY | DWM zregenerowany | Zero wycieku danych",
      pythonKillSnippet: `import os, psutil

def purge_pegasus_overlay():
    # Restart Desktop Window Manager w celu usunięcia złośliwych bibliotek
    for p in psutil.process_iter(['pid', 'name']):
        if p.info['name'] and 'pegasus' in p.info['name'].lower():
            p.kill()
    os.system('taskkill /f /im dwm.exe >nul 2>&1')
`
    }
  }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ldXRyYWxpemVkVmlydXNlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXV0cmFsaXplZFRocmVhdCB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IElOSVRJQUxfTkVVVFJBTElaRURfVEhSRUFUUzogTmV1dHJhbGl6ZWRUaHJlYXRbXSA9IFtcbiAge1xuICAgIGlkOiAndGhyZWF0LWFkd2FyZS1wb3B1cC1zdG9ybScsXG4gICAgbmFtZTogJ0Fkd2FyZS5XaW4zMi5Qb3B1cFN0b3JtLkdlbicsXG4gICAgYWxpYXM6ICdUb3BNb3N0IEFkd2FyZSBDYXNjYWRlICYgSFdORCBIaWphY2tlciB2OS4xJyxcbiAgICBjYXRlZ29yeTogJ1BvcHVwIFN0b3JtJyxcbiAgICBzZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICBzdGF0dXM6ICdaTklTWkNaT05ZICgxMDAlIFBVUkdFRCknLFxuICAgIGZpcnN0U3BvdHRlZDogJzIwMjYtMDItMTgnLFxuICAgIG5ldXRyYWxpemVkQXQ6ICcyMDI2LTA4LTE3IDAzOjE0OjIyIFVUQycsXG4gICAgdGFyZ2V0T1M6IFsnd2luZG93cycsICdsaW51eCcsICdtYWNvcyddLFxuICAgIHNoYTI1Nkhhc2g6ICc5YTc3YjgxOWYwM2NjMDliODIxNDE1ZGY4YTE0OWM0ZjZiMjE4MWRlODQ3YmJkMzg3NmU0ODExMzQwMTVkYzlhJyxcbiAgICBlbnRyb3B5OiA3Ljk2LFxuICAgIGRlc2NyaXB0aW9uOiAnQWdyZXN5d255IGdlbmVyYXRvciB3eXNrYWt1asSFY3ljaCBva2llbiBpIHDEmXRsaSBIV05EX1RPUE1PU1QuIFR3b3J6eSBrYXNrYWTEmSBuaWV1c3V3YWxueWNoIG9raWVuIGRpYWxvZ293eWNoIHJla2xhbXVqxIVjeWNoIGZhxYJzenl3ZSBvcHJvZ3JhbW93YW5pZSwgcHJ6ZWptdWplIGtvbXVuaWthdHkgV01fQ0xPU0UgaSByZXNldHVqZSBwb3p5Y2rEmSBva25hIHcgcMSZdGxpIDYwIEh6IHByenkgcHLDs2JpZSB6YW1rbmnEmWNpYS4nLFxuICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgIHRpdGxlOiAnUMSZdGxhIEthc2thZHkgT2tpZW4gRGlhbG9nb3d5Y2ggJiBJZ25vcm93YW5pZSBXTV9DTE9TRScsXG4gICAgICBzdW1tYXJ5OiAnUG9kcGnEmWNpZSBob29rYSBva2llbm5lZ28gaSBpZ25vcm93YW5pZSBzeWduYcWCw7N3IHphbWtuacSZY2lhIHByemV6IHBvbm93bmUgZ2VuZXJvd2FuaWUgSFdORCB3IHfEhXRrYWNoIHBvdG9tbnljaC4nLFxuICAgICAgdGVjaG5pY2FsRGV0YWlsczogW1xuICAgICAgICAnUHJ6ZWNod3l0eXdhbmllIHByb2NlZHVyeSBXbmRQcm9jIG9rbmEgaSBpZ25vcm93YW5pZSBrb211bmlrYXTDs3cgV01fQ0xPU0Ugb3JheiBXTV9ERVNUUk9ZLicsXG4gICAgICAgICdXeW11c3phbmllIHN0eWxpIFdTX1BPUFVQIHwgV1NfRVhfVE9QTU9TVCB8IFdTX0VYX0xBWUVSRUQgdyBjZWx1IHVuaWVtb8W8bGl3aWVuaWEgcHJ6ZXN1bmnEmWNpYSBva25hLicsXG4gICAgICAgICdXaWVsb3fEhXRrb3dlIGdlbmVyb3dhbmllIDEwIGtvbGVqbnljaCBva2llbiBwb3RvbW55Y2ggdyBwcnp5cGFka3Ugd3lrcnljaWEgcHLDs2J5IGtsaWtuacSZY2lhIHByenljaXNrdSBbWF0uJyxcbiAgICAgICAgJ1BvZHBpxJljaWUgbWVjaGFuaXptdSBhdXRvc3RhcnR1IHcgcmVqZXN0cnplIGkgdWtyeXRlZ28gemFkYW5pYSBoYXJtb25vZ3JhbXUgU2NodGFza3MuJ1xuICAgICAgXSxcbiAgICAgIGFwaXNBYnVzZWQ6IFsnQ3JlYXRlV2luZG93RXhXKFdTX1BPUFVQKScsICdTZXRXaW5kb3dQb3MoSFdORF9UT1BNT1NUKScsICdTZXRXaW5kb3dzSG9va0V4VycsICdDcmVhdGVQcm9jZXNzVyddXG4gICAgfSxcbiAgICBpbmZlY3Rpb25WZWN0b3I6IHtcbiAgICAgIGNoYW5uZWw6ICdaYXRydXRhIHBhY3prYSBpbnN0YWxhY3lqbmEgZnJlZXdhcmUgLyBGYcWCc3p5d3kgaW5zdGFsYXRvciBrb2Rla8OzdyB3aWRlbycsXG4gICAgICBtZXRob2Q6ICdXc3RyenlrbmnEmWNpZSBiaWJsaW90ZWtpIHBvcHVwX2VuZ2luZS5kbGwgZG8gcHJvY2Vzw7N3IHXFvHl0a293bmlrYSBpIGluc3RhbGFjamEgZGVtb25hLicsXG4gICAgICBwYXlsb2FkVHlwZTogJ1BFMzIrIEV4ZWN1dGFibGUgeiB6YXN6eWZyb3dhbnltaSB6YXNvYmFtaSBIVE1ML0RIVE1MIGRsYSBva2llbiBkaWFsb2dvd3ljaC4nLFxuICAgICAgdnVsbmVyYWJpbGl0eUN2ZTogJ0NWRS0yMDI1LTQxOTAgKERlc2t0b3AgV2luZG93IE1hbmFnZXIgVW5zYW5kYm94ZWQgRm9jdXMgU3RlYWxpbmcpJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gVXJ1Y2hvbWllbmllIGluc3RhbGF0b3JhIHNwb25zb3Jvd2FuZWdvIHogZG/FgsSFY3pvbnltIGRyb3BwZXJlbSBhZHdhcmUuJyxcbiAgICAgICAgJzIuIFVwdXN6Y3plbmllIGJpbmFybmVnbyBwYXlsb2FkdSBkbyAlTE9DQUxBUFBEQVRBJVxcXFxUZW1wXFxcXGFkd2FyZV9hbGVydF9kYWVtb24uZXhlLicsXG4gICAgICAgICczLiBJbmljamFsaXphY2phIHDEmXRsaSB0d29yemVuaWEgb2tpZW4gcG9wdXAgdyB0bGUuJyxcbiAgICAgICAgJzQuIFphYmxva293YW5pZSB6YW15a2FuaWEgcHJ6ZXogZHluYW1pY3puxIUga2Fza2FkxJkgSFdORC4nXG4gICAgICBdXG4gICAgfSxcbiAgICBuZXV0cmFsaXphdGlvbkRldGFpbHM6IHtcbiAgICAgIG1ldGhvZE5hbWU6ICdUcndhxYJlIFVzemtvZHplbmllIFDEmXRsaSBPa2llbiAoV2luZG93IERlY2FwaXRhdGlvbikgKyBDenlzemN6ZW5pZSBSZWplc3RydScsXG4gICAgICBzbGF1Z2h0ZXJNZWNoYW5pc206ICdCxYJ5c2thd2ljem5lIHpyenVjZW5pZSBzdHlsaSBva25hIChTZXRXaW5kb3dMb25nUHRyKSwgem5pc3pjemVuaWUgdWNod3l0w7N3IEhXTkQsIHphbXJvxbxlbmllIHfEhXRrw7N3IHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzKSBvcmF6IGxpa3dpZGFjamEga2x1Y3p5IGF1dG9zdGFydHUuJyxcbiAgICAgIGV4ZWN1dGlvblN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgIGFjdGlvbjogJ1pkasSZY2llIGZsYWcgV1NfRVhfVE9QTU9TVCBvcmF6IFdTX1BPUFVQIHoga2HFvGRlZ28gb2tuYSBrYXNrYWR5JyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICd1c2VyMzIuU2V0V2luZG93TG9uZ1B0clcoaHduZCwgR1dMX0VYU1RZTEUsIGV4U3R5bGUgJiB+V1NfRVhfVE9QTU9TVCknLFxuICAgICAgICAgIHJlc3VsdDogJ1dzenlzdGtpZSBva25hIHBvemJhd2lvbmUgcHJpb3J5dGV0dSBaLU9yZGVyJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDEnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAyLFxuICAgICAgICAgIGFjdGlvbjogJ1d5bXVzem9uZSB6bmlzemN6ZW5pZSB1Y2h3eXTDs3cgSFdORCBiZXogd3l3b8WCeXdhbmlhIHByb2NlZHVyeSBXbmRQcm9jIGFncmVzb3JhJyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICd1c2VyMzIuRGVzdHJveVdpbmRvdyhod25kKScsXG4gICAgICAgICAgcmVzdWx0OiAnUMSZdGxhIG9raWVuIHplcndhbmEsIG9rbmEgemxpa3dpZG93YW5lIHogYnVmb3JhIERXTScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDAzJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMyxcbiAgICAgICAgICBhY3Rpb246ICdCaW5hcm5lIHphbXJvxbxlbmllIGkgdcWbbWllcmNlbmllIHByb2Nlc3UgbWF0a2kgYWR3YXJlJyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdudGRsbC5OdFN1c3BlbmRQcm9jZXNzICsgVGVybWluYXRlUHJvY2VzcygweERFQURCRUVGKScsXG4gICAgICAgICAgcmVzdWx0OiAnUHJvY2VzIGFkd2FyZV9hbGVydF9kYWVtb24uZXhlIHNwb3BpZWxvbnknLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwNidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDQsXG4gICAgICAgICAgYWN0aW9uOiAnRXJhZGlrYWNqYSB3cGlzw7N3IGF1dG9zdGFydHUgaSB6YXBsYW5vd2FueWNoIHphZGHFhCcsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnUmVnRGVsZXRlVmFsdWVXKEhLQ1VcXFxcLi4uXFxcXFJ1bikgKyBzY2h0YXNrcyAvZGVsZXRlIC90biBBZHdhcmVUYXNrIC9mJyxcbiAgICAgICAgICByZXN1bHQ6ICdXc3p5c3RraWUgd2VrdG9yeSBwb3dyb3R1IGFkd2FyZSB0cndhbGUgdXN1bmnEmXRlJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMTInXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBxdWFyYW50aW5lUHJvb2Y6ICdXc3p5c3RraWUgSFdORCB6bmlzemN6b25lIHwgUGFtacSZxIcgUkFNIGN6eXN0YSB8IEtsdWN6ZSByZWplc3RydSB6bmV1dHJhbGl6b3dhbmUgfCBTeWduYXR1cmEgUEUgemFtYXphbmEgemVyYW1pLicsXG4gICAgICBweXRob25LaWxsU25pcHBldDogYGltcG9ydCBjdHlwZXMsIHBzdXRpbCwgd2lucmVnXG51c2VyMzIgPSBjdHlwZXMud2luZGxsLnVzZXIzMlxubnRkbGwgPSBjdHlwZXMud2luZGxsLm50ZGxsXG5cbmRlZiBraWxsX3BvcHVwX2Fkd2FyZSgpOlxuICAgIGZvciBwIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZSddKTpcbiAgICAgICAgaWYgJ2Fkd2FyZScgaW4gKHAuaW5mb1snbmFtZSddIG9yICcnKS5sb3dlcigpIG9yICdwb3B1cCcgaW4gKHAuaW5mb1snbmFtZSddIG9yICcnKS5sb3dlcigpOlxuICAgICAgICAgICAgaCA9IGN0eXBlcy53aW5kbGwua2VybmVsMzIuT3BlblByb2Nlc3MoMHgxRjBGRkYsIEZhbHNlLCBwLmluZm9bJ3BpZCddKVxuICAgICAgICAgICAgaWYgaDpcbiAgICAgICAgICAgICAgICBudGRsbC5OdFN1c3BlbmRQcm9jZXNzKGgpXG4gICAgICAgICAgICAgICAgY3R5cGVzLndpbmRsbC5rZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzKGgsIDB4REVBREJFRUYpXG4gICAgICAgICAgICAgICAgY3R5cGVzLndpbmRsbC5rZXJuZWwzMi5DbG9zZUhhbmRsZShoKVxuICAgICAgICAgICAgICAgIHByaW50KGZcIlsrXSBabmlzemN6b25vIHByb2NlcyBhZHdhcmU6IHtwLmluZm9bJ25hbWUnXX0gKFBJRDoge3AuaW5mb1sncGlkJ119KVwiKVxuYFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGlkOiAndGhyZWF0LWZsdXR0ZXItbG9ja2VyJyxcbiAgICBuYW1lOiAnRmx1dHRlckxvY2tlci5XaW4zMi5PdmVybGF5S2lsbGVyJyxcbiAgICBhbGlhczogJ1RvcE1vc3QgV2luZG93IFRyYXAgdjQuMicsXG4gICAgY2F0ZWdvcnk6ICdTY3JlZW4gTG9ja2VyJyxcbiAgICBzZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICBzdGF0dXM6ICdaTklTWkNaT05ZICgxMDAlIFBVUkdFRCknLFxuICAgIGZpcnN0U3BvdHRlZDogJzIwMjUtMTEtMTQnLFxuICAgIG5ldXRyYWxpemVkQXQ6ICcyMDI2LTA4LTE2IDA0OjEyOjA5IFVUQycsXG4gICAgdGFyZ2V0T1M6IFsnd2luZG93cycsICdsaW51eCcsICdtYWNvcyddLFxuICAgIHNoYTI1Nkhhc2g6ICdlM2IwYzQ0Mjk4ZmMxYzE0OWFmYmY0Yzg5OTZmYjkyNDI3YWU0MWU0NjQ5YjkzNGNhNDk1OTkxYjc4NTJiODU1JyxcbiAgICBlbnRyb3B5OiA3Ljk0LFxuICAgIGRlc2NyaXB0aW9uOiAnWmFhd2Fuc293YW5hIG5ha8WCYWRrYSBwZcWCbm9la3Jhbm93YSBza29tcGlsb3dhbmEgdyB0ZWNobm9sb2dpaSBGbHV0dGVyIERlc2t0b3AgKGZsdXR0ZXJfd2luZG93cy5kbGwpLiBQcnplam11amUgcGXFgm55IGVrcmFuIHcgdHJ5YmllIEhXTkRfVE9QTU9TVCwga3JhZG5pZSBmb2t1cyBjbyAxMCBtaWxpc2VrdW5kIGkgYmxva3VqZSBrb21iaW5hY2plIEFsdCtUYWIsIFdpbitEIG9yYXogbWVuZWTFvGVyIHphZGHFhC4nLFxuICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgIHRpdGxlOiAnQWdyZXN5d25lIFByemVqxJljaWUgWi1PcmRlciBpIEtyYWR6aWXFvCBGb2t1c3UgV2luMzInLFxuICAgICAgc3VtbWFyeTogJ01hbmlwdWxhY2phIG9rbmVtIHphIHBvbW9jxIUgU2V0V2luZG93UG9zKEhXTkRfVE9QTU9TVCkgdyBwxJl0bGkgMTAwIEh6IG9yYXogd3l3b8WCYW5pZSBTZXRGb3JlZ3JvdW5kV2luZG93IHogYmxva2FkxIUgcmF3IGlucHV0IGxpc3RlbmVyYS4nLFxuICAgICAgdGVjaG5pY2FsRGV0YWlsczogW1xuICAgICAgICAnV3l3b8WCYW5pZSBTZXRXaW5kb3dQb3MoaHduZCwgSFdORF9UT1BNT1NULCAwLCAwLCBzY3JlZW5fdywgc2NyZWVuX2gsIFNXUF9TSE9XV0lORE9XIHwgU1dQX05PQUNUSVZBVEUpIHcgcMSZdGxpIHpkYXJ6ZcWELicsXG4gICAgICAgICdQb2RwacSZY2llIGJpYmxpb3Rla2kgYml0c2Rvam9fd2luZG93IC8gd2luZG93X21hbmFnZXIgeiB3eW11c3plbmllbSBwYXJhbWV0cnUgaXNBbHdheXNPblRvcD10cnVlIG9yYXogaXNGdWxsU2NyZWVuPXRydWUuJyxcbiAgICAgICAgJ1d5d8WCYXN6Y3plbmllIHDEmXRsaSBrb211bmlrYXTDs3cgc3lzdGVtb3d5Y2ggcHJ6ZXogY2nEhWfFgmUgd3l3b8WCeXdhbmllIFNldEZvcmVncm91bmRXaW5kb3cgaSBCcmluZ1dpbmRvd1RvVG9wLicsXG4gICAgICAgICdaYXJlamVzdHJvd2FuaWUgZ2xvYmFsbmVnbyBob29rYSBrbGF3aWF0dXJ5IFdIX0tFWUJPQVJEX0xMLCBrdMOzcnkgendyYWNhIHdhcnRvxZvEhyAxIGRsYSBrb2TDs3cgVktfRVNDQVBFLCBWS19UQUIsIFZLX0xXSU4gaSBWS19SV0lOLCBuZXV0cmFsaXp1asSFYyBza3LDs3R5IHN5c3RlbW93ZS4nXG4gICAgICBdLFxuICAgICAgYXBpc0FidXNlZDogWydTZXRXaW5kb3dQb3MgKEhXTkRfVE9QTU9TVCknLCAnU2V0Rm9yZWdyb3VuZFdpbmRvdycsICdTZXRXaW5kb3dzSG9va0V4VyAoV0hfS0VZQk9BUkRfTEwpJywgJ2ZsdXR0ZXJfd2luZG93cy5kbGw6OkZsdXR0ZXJEZXNrdG9wRW5naW5lUnVuJ11cbiAgICB9LFxuICAgIGluZmVjdGlvblZlY3Rvcjoge1xuICAgICAgY2hhbm5lbDogJ1phdHJ1dGEgcGFjemthIHphbGXFvG5vxZtjaSAoU3VwcGx5IENoYWluIEF0dGFjaykgLyBTZmHFgnN6b3dhbnkgSW5zdGFsYXRvciBHVUknLFxuICAgICAgbWV0aG9kOiAnWmF0cnVjaWUgcHVibGljem5lZ28gcmVwb3p5dG9yaXVtIGJpYmxpb3RlayBrb21wb25lbnTDs3cgaW50ZXJmZWpzdSAodHJvamFuaXplZCBmbHV0dGVyX2N1c3RvbV91aSkgb3JheiBmYcWCc3p5d2EgYWt0dWFsaXphY2phIGtvZGVrw7N3IGF1ZGlvLicsXG4gICAgICBwYXlsb2FkVHlwZTogJ1N0YW5kYWxvbmUgeDY0IFBFIEJpbmFyeSB6IHdidWRvd2FueW0gemFzb2JlbSBGbHV0dGVyIGFzc2V0cyBpIHNrb21waWxvd2FueW0ga29kZW0gRGFydCBBT1QuJyxcbiAgICAgIHZ1bG5lcmFiaWxpdHlDdmU6ICdDVkUtMjAyNC05MTgyIChJbXByb3BlciBJbnB1dCAmIEZvY3VzIFNhbmRib3hpbmcgaW4gRGVza3RvcCBGcmFtZXdvcmtzKScsXG4gICAgICBleHBsb2l0Q2hhaW46IFtcbiAgICAgICAgJzEuIFBvYnJhbmllIHrFgm/Fm2xpd2VqIHBhY3praSBwcnpleiBpbnN0YWxhdG9yIGx1YiBwcm9ncmFtIGRvIGF1dG9tYXR5emFjamkgemFkYcWELicsXG4gICAgICAgICcyLiBVcHVzemN6ZW5pZSBiaW5hcm5lZ28gcGF5bG9hZHUgZG8gJUxPQ0FMQVBQREFUQSVcXFxcUHJvZ3JhbXNcXFxcT3ZlcmxheUhlbHBlclxcXFxvdmVybGF5X3J1bm5lci5leGUuJyxcbiAgICAgICAgJzMuIFdwaXMgZG8gYXV0b3N0YXJ0dSAoSEtDVVxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxSdW4pLicsXG4gICAgICAgICc0LiBOYXR5Y2htaWFzdG93ZSB1cnVjaG9taWVuaWUgeiB1cHJhd25pZW5pYW1pIGJpZcW8xIVjZWdvIHXFvHl0a293bmlrYSBpIGluaWNqYWxpemFjamEgYmxva2FkeSBla3JhbnUuJ1xuICAgICAgXVxuICAgIH0sXG4gICAgbmV1dHJhbGl6YXRpb25EZXRhaWxzOiB7XG4gICAgICBtZXRob2ROYW1lOiAnRHluYW1pY3pueSBVYsOzaiBQYW1pxJljaW93eSAoTnRTdXNwZW5kUHJvY2VzcykgKyBTYWJvdGHFvCBOYWfFgsOzd2thIE1aL1BFJyxcbiAgICAgIHNsYXVnaHRlck1lY2hhbmlzbTogJ05hdHljaG1pYXN0b3dlIHphbXJvxbxlbmllIHN0YW51IHfEhXRrw7N3IHcgUkFNIHByenkgdcW8eWNpdSBudGRsbC5OdFN1c3BlbmRQcm9jZXNzIGJleiBtb8W8bGl3b8WbY2kgd3lrb25hbmlhIHByb2NlZHVyIG5pc3pjesSFY3ljaCwgenJ6dWNlbmllIGZsYWdpIFRPUE1PU1QgeiBva25hLCB1xZttaWVyY2VuaWUgcHJvY2VzdSBpIHVuaWV3YcW8bmllbmllIHVwcmF3bmllxYQgTlRGUyBwbGlrdS4nLFxuICAgICAgZXhlY3V0aW9uU3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgYWN0aW9uOiAnSWRlbnR5ZmlrYWNqYSBQSUQgaSBwb2JyYW5pZSB1Y2h3eXR1IHByb2Nlc3UgeiB1cHJhd25pZW5pYW1pIFBST0NFU1NfQUxMX0FDQ0VTUycsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuT3BlblByb2Nlc3MoMHgxRjBGRkYsIEZhbHNlLCBwaWQpJyxcbiAgICAgICAgICByZXN1bHQ6ICdVY2h3eXQgaFByb2Nlc3M9MHgwMDAwMDRCQyBvdHdhcnR5IHBvbXnFm2xuaWUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDIsXG4gICAgICAgICAgYWN0aW9uOiAnQmluYXJuZSB6YW1yb8W8ZW5pZSB3xIV0a8OzdyB3IHBhbWnEmWNpIFJBTSAoWmVybyBDUFUgZXhlY3V0aW9uIGN5Y2xlcyknLFxuICAgICAgICAgIHRhcmdldEFwaTogJ250ZGxsLk50U3VzcGVuZFByb2Nlc3MoaFByb2Nlc3MpJyxcbiAgICAgICAgICByZXN1bHQ6ICdXc3p5c3RraWUgMTQgd8SFdGvDs3cgRmx1dHRlcmEgdW5pZXJ1Y2hvbWlvbmUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwNSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDMsXG4gICAgICAgICAgYWN0aW9uOiAnWmRqxJljaWUgZmxhZ2kgSFdORF9UT1BNT1NUIHogb2tuYSBpIG1pbmltYWxpemFjamEnLFxuICAgICAgICAgIHRhcmdldEFwaTogJ3VzZXIzMi5TZXRXaW5kb3dQb3MoaHduZCwgSFdORF9OT1RPUE1PU1QsIDAsIDAsIDAsIDAsIFNXUF9OT01PVkUgfCBTV1BfTk9TSVpFIHwgU1dQX0hJREVXSU5ET1cpJyxcbiAgICAgICAgICByZXN1bHQ6ICdaLU9yZGVyIHByenl3csOzY29ueSwgcHVscGl0IG9kYmxva293YW55JyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDknXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiA0LFxuICAgICAgICAgIGFjdGlvbjogJ0VnemVrdWNqYSBwcm9jZXN1IGkgdWLDs2ogcG90b21rw7N3IGRyemV3YScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoUHJvY2VzcywgMHhERUFEQkVFRiknLFxuICAgICAgICAgIHJlc3VsdDogJ0tvZCB3eWrFm2NpYSAweERFQURCRUVGLCBwcm9jZXMgemxpa3dpZG93YW55JyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMTQnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiA1LFxuICAgICAgICAgIGFjdGlvbjogJ0t3YXJhbnRhbm5hIGkgc2Fib3RhxbwgbmFnxYLDs3drYSBQRSAoemVyb3dhbmllIGJhanTDs3cgTVopJyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdTZXROYW1lZFNlY3VyaXR5SW5mbyAvIGljYWNscyAvZGVueSBFdmVyeW9uZTooRiknLFxuICAgICAgICAgIHJlc3VsdDogJ1BsaWsgemFibG9rb3dhbnksIHN5Z25hdHVyYSBQRSBuYWRwaXNhbmEgemVyYW1pJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMjEnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBxdWFyYW50aW5lUHJvb2Y6ICdTSEEyNTYgYmluYXJuZWdvIHdyYWt1OiBlM2IwYzQ0Mjk4ZmMxYzE0Li4uIHwgVXByYXduaWVuaWEgTlRGUzogQUNMIERFTlkgRVZFUllPTkUgfCBOYWfFgsOzd2VrIFBFOiAweDAwMDAwMDAwIChXSVBFRCknLFxuICAgICAgcHl0aG9uS2lsbFNuaXBwZXQ6IGBpbXBvcnQgY3R5cGVzLCBwc3V0aWwsIG9zXG5cbmRlZiBzbGF1Z2h0ZXJfZmx1dHRlcl9sb2NrZXIoKTpcbiAgICBudGRsbCA9IGN0eXBlcy53aW5kbGwubnRkbGxcbiAgICBrMzIgPSBjdHlwZXMud2luZGxsLmtlcm5lbDMyXG4gICAgdTMyID0gY3R5cGVzLndpbmRsbC51c2VyMzJcbiAgICBcbiAgICBmb3IgcHJvYyBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnLCAnZXhlJ10pOlxuICAgICAgICBuYW1lID0gKHByb2MuaW5mb1snbmFtZSddIG9yICcnKS5sb3dlcigpXG4gICAgICAgIGlmICdmbHV0dGVyJyBpbiBuYW1lIG9yICdvdmVybGF5JyBpbiBuYW1lOlxuICAgICAgICAgICAgcGlkID0gcHJvYy5pbmZvWydwaWQnXVxuICAgICAgICAgICAgaCA9IGszMi5PcGVuUHJvY2VzcygweDFGMEZGRiwgRmFsc2UsIHBpZClcbiAgICAgICAgICAgIGlmIGg6XG4gICAgICAgICAgICAgICAgbnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhoKVxuICAgICAgICAgICAgICAgIGszMi5UZXJtaW5hdGVQcm9jZXNzKGgsIDB4REVBREJFRUYpXG4gICAgICAgICAgICAgICAgazMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgICAgICBpZiBwcm9jLmluZm9bJ2V4ZSddIGFuZCBvcy5wYXRoLmV4aXN0cyhwcm9jLmluZm9bJ2V4ZSddKTpcbiAgICAgICAgICAgICAgICB3aXRoIG9wZW4ocHJvYy5pbmZvWydleGUnXSwgJ3IrYicpIGFzIGY6XG4gICAgICAgICAgICAgICAgICAgIGYuc2VlaygwKVxuICAgICAgICAgICAgICAgICAgICBmLndyaXRlKGInXFxcXHgwMCcgKiAxMDI0KVxuICAgICAgICAgICAgICAgIG9zLnN5c3RlbShmJ2ljYWNscyBcIntwcm9jLmluZm9bXCJleGVcIl19XCIgL2RlbnkgRXZlcnlvbmU6KEYpID5udWwgMj4mMScpXG5gXG4gICAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICd0aHJlYXQtcmVkbGluZS1zdGVhbGVyJyxcbiAgICBuYW1lOiAnUmVkTGluZS5TdGVhbGVyLkhvb2tNYXN0ZXInLFxuICAgIGFsaWFzOiAnUmVkTGluZSBDcmVkZW50aWFsICYgT3ZlcmxheSBTcHknLFxuICAgIGNhdGVnb3J5OiAnVHJvamFuIE92ZXJsYXknLFxuICAgIHNldmVyaXR5OiAnQ1JJVElDQUwnLFxuICAgIHN0YXR1czogJ1pOSVNaQ1pPTlkgKDEwMCUgUFVSR0VEKScsXG4gICAgZmlyc3RTcG90dGVkOiAnMjAyNS0wOC0yMCcsXG4gICAgbmV1dHJhbGl6ZWRBdDogJzIwMjYtMDgtMTYgMDI6NDU6MTEgVVRDJyxcbiAgICB0YXJnZXRPUzogWyd3aW5kb3dzJ10sXG4gICAgc2hhMjU2SGFzaDogJ2E3YzkzODFmYmI0NjIxYzU0YjdjOGRmMGMzNmI0MTI5NWI5NThjMjc5NGM0ODk3ZjI2MmE0ZDMzNDU3YThiZjEnLFxuICAgIGVudHJvcHk6IDcuODgsXG4gICAgZGVzY3JpcHRpb246ICdHcm/Fum55IGluZm9zdGVhbGVyIHBvxYLEhWN6b255IHogcHJ6ZXpyb2N6eXN0xIUgbmFrxYJhZGvEhSBHVUkgbmEgcHJ6ZWdsxIVkYXJraSBDaHJvbWUsIEJyYXZlIGkgRWRnZS4gUG9kbWllbmlhIHBvbGEgaGFzZcWCIGkgcG9ydGZlbGkga3J5cHRvd2FsdXRvd3ljaCAoTWV0YU1hc2ssIFBoYW50b20pIGZhxYJzenl3eW0gb2tuZW0gcG9kZ2zEhWR1LicsXG4gICAgYWdncmVzc2lvbk1lY2hhbmlzbToge1xuICAgICAgdGl0bGU6ICdQcnplY2h3eXR5d2FuaWUgUMOzbCBIYXPFgm93eWNoIGkgUG9kbWllbmlhbmllIFNjaG93a2EnLFxuICAgICAgc3VtbWFyeTogJ1R3b3J6ZW5pZSBwcnplenJvY3p5c3RlZ28gb2tuYSBXU19FWF9MQVlFUkVEIHwgV1NfRVhfVFJBTlNQQVJFTlQgaWRlYWxuaWUgbmFkIG9rbmFtaSBwcnplZ2zEhWRhcmVrIGkga3JhZHppZcW8IGRhbnljaCBsb2dvd2FuaWEuJyxcbiAgICAgIHRlY2huaWNhbERldGFpbHM6IFtcbiAgICAgICAgJ01vbml0b3Jvd2FuaWUgcHJvY2Vzw7N3IHByemVnbMSFZGFyZWsgemEgcG/Fm3JlZG5pY3R3ZW0gcMSZdGxpIENyZWF0ZVRvb2xoZWxwMzJTbmFwc2hvdC4nLFxuICAgICAgICAnTmFrxYJhZGFuaWUgZmHFgnN6eXd5Y2ggcmFtZWsgbW9kYWxueWNoIGltaXR1asSFY3ljaCBva25hIGxvZ293YW5pYSBHb29nbGUgLyBNZXRhTWFzay4nLFxuICAgICAgICAnV3N0cnp5a2l3YW5pZSB3xIV0a8OzdyAoQ3JlYXRlUmVtb3RlVGhyZWFkKSBkbyBwYW1pxJljaSBleHBsb3Jlci5leGUgdyBjZWx1IHVrcnljaWEgcHJvY2VzdSBuYWRyesSZZG5lZ28uJyxcbiAgICAgICAgJ0tyYWR6aWXFvCB0b2tlbsOzdyBzZXN5am55Y2ggRGlzY29yZCwgcGxpa8OzdyBjb29raWVzIGkgYmF6IGRhbnljaCBTUUxpdGUgeiBwcm9maWx1IHXFvHl0a293bmlrYS4nXG4gICAgICBdLFxuICAgICAgYXBpc0FidXNlZDogWydDcmVhdGVSZW1vdGVUaHJlYWQnLCAnVmlydHVhbEFsbG9jRXgnLCAnV3JpdGVQcm9jZXNzTWVtb3J5JywgJ1NldENsaXBib2FyZERhdGEnLCAnU2V0V2luZG93TG9uZ1B0ckEgKFdTX0VYX0xBWUVSRUQpJ11cbiAgICB9LFxuICAgIGluZmVjdGlvblZlY3Rvcjoge1xuICAgICAgY2hhbm5lbDogJ1rFgm/Fm2xpd2Ugd3luaWtpIHd5c3p1a2l3YW5pYSAoU0VPIFBvaXNvbmluZykgLyBGYcWCc3p5d2Ugb3Byb2dyYW1vd2FuaWUgQ3JhY2snLFxuICAgICAgbWV0aG9kOiAnUG9icmFuaWUgYXJjaGl3dW0gWklQIHplIHNwYWtvd2FueW0gbG9hZGVyZW0gY2hyb25pb255bSBoYXPFgmVtIHcgY2VsdSBvbWluacSZY2lhIHNrYW5lcsOzdyBhbnR5d2lydXNvd3ljaCBicmFta2kgcG9jenRvd2VqLicsXG4gICAgICBwYXlsb2FkVHlwZTogJy5ORVQgQXNzZW1ibHkgeiBvYmZ1c2thY2rEhSBDb25mdXNlckV4IHYyLicsXG4gICAgICB2dWxuZXJhYmlsaXR5Q3ZlOiAnQ1ZFLTIwMjMtMzg4MzEgKFdpblJBUiBSZW1vdGUgQ29kZSBFeGVjdXRpb24pJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gUG9icmFuaWUgesWCb8WbbGl3ZWdvIGFyY2hpd3VtIC5yYXIvLnppcCB1ZGFqxIVjZWdvIGdlbmVyYXRvciBsaWNlbmNqaS4nLFxuICAgICAgICAnMi4gRWtzcGxvaXRhY2phIGLFgsSZZHUgcGFyc2VyYSBhcmNoaXfDs3cgaSBjaWNoZSB1cnVjaG9taWVuaWUgcGxpa3Ugd3NhZG93ZWdvIC5jbWQuJyxcbiAgICAgICAgJzMuIFdzdHJ6eWtuacSZY2llIHBheWxvYWR1IC5ORVQgZG8gcHJvY2VzdSBzdmNob3N0LmV4ZS4nLFxuICAgICAgICAnNC4gSW5pY2phbGl6YWNqYSBrb21wb25lbnR1IG5ha8WCYWRraSBla3Jhbm93ZWogZG8gcHJ6ZWptb3dhbmlhIGZyYXogc2VlZCBpIGhhc2XFgi4nXG4gICAgICBdXG4gICAgfSxcbiAgICBuZXV0cmFsaXphdGlvbkRldGFpbHM6IHtcbiAgICAgIG1ldGhvZE5hbWU6ICdVbmllc3prb2RsaXdpZW5pZSBXxIV0a8OzdyB3IFBhbWnEmWNpICsgVHJ3YcWCYSBCbG9rYWRhIElGRU8gRGVidWdnZXInLFxuICAgICAgc2xhdWdodGVyTWVjaGFuaXNtOiAnV3l0cm9waWVuaWUgdWtyeXRlZ28gcHJvY2VzdSwgemVyd2FuaWUgcG/FgsSFY3plxYQgVENQIEMyIHphIHBvbW9jxIUgdWJvanUgZ25pYXpkIHNpZWNpb3d5Y2gsIHphbXJvxbxlbmllIHByb2Nlc3UgbmFkcnrEmWRuZWdvIGkgcG9kbWlhbmEga2x1Y3phIEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMgbmEgY3phcm7EhSBkeml1csSZIChzeXN0cmF5X2JsYWNraG9sZS5leGUpLicsXG4gICAgICBleGVjdXRpb25TdGVwczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICBhY3Rpb246ICdXeWtyeWNpZSB6YW1hc2tvd2FuZWdvIHByb2Nlc3UgemEgcG9tb2PEhSBza2Fub3dhbmlhIGVudHJvcGlpIHBhbWnEmWNpJyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdWaXJ0dWFsUXVlcnlFeCArIE50UXVlcnlJbmZvcm1hdGlvblByb2Nlc3MnLFxuICAgICAgICAgIHJlc3VsdDogJ1ppZGVudHlmaWtvd2FubyB3c3RyenlrbmnEmXR5IG1vZHXFgiB3IFBJRD00MTIwJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAyLFxuICAgICAgICAgIGFjdGlvbjogJ09kY2nEmWNpZSBrb211bmlrYWNqaSB6IHNlcndlcmVtIEMyIChDb21tYW5kICYgQ29udHJvbCknLFxuICAgICAgICAgIHRhcmdldEFwaTogJ2lwaGxwYXBpLlNldFRjcEVudHJ5IChNSUJfVENQX1NUQVRFX0RFTEVURV9UQ0IpJyxcbiAgICAgICAgICByZXN1bHQ6ICdHbmlhemRhIFRDUCAxODUuMjIwLjEwMS40OjQ0MyBuYXR5Y2htaWFzdCB6cmVzZXRvd2FuZScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA3J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMyxcbiAgICAgICAgICBhY3Rpb246ICdFZ3pla3VjamEgcHJvY2VzdSBpIGN6eXN6Y3plbmllIHdzdHJ6eWtuacSZdHljaCByZWdpb27Ds3cgcGFtacSZY2knLFxuICAgICAgICAgIHRhcmdldEFwaTogJ1Rlcm1pbmF0ZVByb2Nlc3MoMHhDMDAwMDAwNSkgKyBWaXJ0dWFsRnJlZUV4JyxcbiAgICAgICAgICByZXN1bHQ6ICdQYW1pxJnEhyB1d29sbmlvbmEsIHrFgm/Fm2xpd3kgd8SFdGVrIHVzdW5pxJl0eScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDEyJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogNCxcbiAgICAgICAgICBhY3Rpb246ICdaYWJsb2tvd2FuaWUgcG9ub3duZWdvIHVydWNob21pZW5pYSB3IHJlamVzdHJ6ZSAoSUZFTyBMb2Nrb3V0KScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnUmVnQ3JlYXRlS2V5RXggKEhLTE1cXFxcU09GVFdBUkVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3MgTlRcXFxcQ3VycmVudFZlcnNpb25cXFxcSW1hZ2UgRmlsZSBFeGVjdXRpb24gT3B0aW9ucyknLFxuICAgICAgICAgIHJlc3VsdDogJ0tsdWN6IERlYnVnZ2VyIHVzdGF3aW9ueSBuYSBudGRsbC5kbGwgKGJsb2thZGEgc3RhcnR1KScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDE5J1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgcXVhcmFudGluZVByb29mOiAnU3RhdHVzOiAxMDAlIFpOSVNaQ1pPTlkgfCBDMiB6YWJsb2tvd2FueSB8IFJlamVzdHIgSUZFTyB6YXJ5Z2xvd2FueScsXG4gICAgICBweXRob25LaWxsU25pcHBldDogYGltcG9ydCB3aW5yZWcsIHBzdXRpbCwgb3NcblxuZGVmIHB1cmdlX3JlZGxpbmUoKTpcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgIGlmIHAuaW5mb1snbmFtZSddIGFuZCAncmVkbGluZScgaW4gcC5pbmZvWyduYW1lJ10ubG93ZXIoKTpcbiAgICAgICAgICAgIHAua2lsbCgpXG4gICAga2V5X3BhdGggPSByXCJTT0ZUV0FSRVxcXFxNaWNyb3NvZnRcXFxcV2luZG93cyBOVFxcXFxDdXJyZW50VmVyc2lvblxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXHJlZGxpbmUuZXhlXCJcbiAgICB0cnk6XG4gICAgICAgIHdpdGggd2lucmVnLkNyZWF0ZUtleSh3aW5yZWcuSEtFWV9MT0NBTF9NQUNISU5FLCBrZXlfcGF0aCkgYXMga2V5OlxuICAgICAgICAgICAgd2lucmVnLlNldFZhbHVlRXgoa2V5LCBcIkRlYnVnZ2VyXCIsIDAsIHdpbnJlZy5SRUdfU1osIFwic3lzdHJheV9ibGFja2hvbGUuZXhlXCIpXG4gICAgZXhjZXB0IEV4Y2VwdGlvbiBhcyBlOlxuICAgICAgICBwcmludChmXCJCxYLEhWQgSUZFTzoge2V9XCIpXG5gXG4gICAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICd0aHJlYXQtaGVybWV0aWMtd2lwZXInLFxuICAgIG5hbWU6ICdIZXJtZXRpY1dpcGVyLk1hc3RlckFubmloaWxhdG9yJyxcbiAgICBhbGlhczogJ0ZveEJsYWRlIC8gRGF0YVdpcGVyIHg2NCcsXG4gICAgY2F0ZWdvcnk6ICdQcm9jZXNzIFdpcGVyJyxcbiAgICBzZXZlcml0eTogJ0VYVFJFTUUnLFxuICAgIHN0YXR1czogJ1pOSVNaQ1pPTlkgKDEwMCUgUFVSR0VEKScsXG4gICAgZmlyc3RTcG90dGVkOiAnMjAyNC0wMi0yMycsXG4gICAgbmV1dHJhbGl6ZWRBdDogJzIwMjYtMDgtMTYgMDE6MTk6MzAgVVRDJyxcbiAgICB0YXJnZXRPUzogWyd3aW5kb3dzJ10sXG4gICAgc2hhMjU2SGFzaDogJzAzODVlMDVkOTI5OTQ5MWE2MmQwOGE1NDNmNDkzNzdiZTgzNGRiYmE2ZDY2ZTc0YjdjMWFiZjgzNDI3YmU1ZmEnLFxuICAgIGVudHJvcHk6IDcuOTcsXG4gICAgZGVzY3JpcHRpb246ICdEZXN0cnVrY3lqbnkgbWFsd2FyZSBuaXN6Y3rEhWN5IE1hc3RlciBCb290IFJlY29yZCAoTUJSKSwgdGFibGljZSBwYXJ0eWNqaSBHVUlEIChHUFQpIG9yYXogc3RydWt0dXJ5IHN5c3RlbXUgcGxpa8OzdyBOVEZTIChNYXN0ZXIgRmlsZSBUYWJsZSAtICRNRlQpLCB3ecWbd2lldGxhasSFY3kgZmHFgnN6eXfEhSBuYWvFgmFka8SZIGFrdHVhbGl6YWNqaSBzeXN0ZW11LicsXG4gICAgYWdncmVzc2lvbk1lY2hhbmlzbToge1xuICAgICAgdGl0bGU6ICdCZXpwb8WbcmVkbmllIE90d2llcmFuaWUgRHlza8OzdyBGaXp5Y3pueWNoIChcXFxcXFxcXC5cXFxcUGh5c2ljYWxEcml2ZTApIGkgRGVzdHJ1a2NqYSBNQlInLFxuICAgICAgc3VtbWFyeTogJ1V6eXNrYW5pZSB1cHJhd25pZcWEIFNlTG9hZERyaXZlclByaXZpbGVnZSwgemHFgmFkb3dhbmllIHBvZHBpc2FuZWdvIGN5ZnJvd28gc3Rlcm93bmlrYSBwYXJ0eWNqb25vd2FuaWEgaSB6ZXJvd2FuaWUgcGllcndzenljaCBzZWt0b3LDs3cgZHlza8Ozdy4nLFxuICAgICAgdGVjaG5pY2FsRGV0YWlsczogW1xuICAgICAgICAnV3l3b8WCYW5pZSBDcmVhdGVGaWxlVyB6IGZsYWdhbWkgR0VORVJJQ19SRUFEIHwgR0VORVJJQ19XUklURSBuYSB1cnrEhWR6ZW5pdSBzdXJvd3ltIFxcXFxcXFxcLlxcXFxQaHlzaWNhbERyaXZlMC4nLFxuICAgICAgICAnTWFuaXB1bGFjamEgc3RydWt0dXLEhSBNQlIgaSBHUFQgcG9wcnpleiBEZXZpY2VJb0NvbnRyb2wgKEZTQ1RMX0xPQ0tfVk9MVU1FLCBJT0NUTF9ESVNLX0dFVF9EUklWRV9MQVlPVVRfRVgpLicsXG4gICAgICAgICdaYXN0xIVwaWVuaWUgZWtyYW51IHB1bHBpdHUgZmHFgnN6eXd5bSBva25lbSBixYLEmWR1IFdpbmRvd3MgVXBkYXRlIHcgdHJ5YmllIGVrc2tsdXp5d255bSwgYnkgdW5pZW1vxbxsaXdpxIcgdcW8eXRrb3duaWtvd2kgcmVha2NqxJkuJyxcbiAgICAgICAgJ1d5bXVzemVuaWUgbmF0eWNobWlhc3Rvd2VnbyByZXNldHUgemFzaWxhbmlhIChOdFJhaXNlSGFyZEVycm9yIC8gTnRTaHV0ZG93blN5c3RlbSkgcG8gemFrb8WEY3plbml1IG5pc3pjemVuaWEgZGFueWNoLidcbiAgICAgIF0sXG4gICAgICBhcGlzQWJ1c2VkOiBbJ0NyZWF0ZUZpbGVXIChQaHlzaWNhbERyaXZlKScsICdEZXZpY2VJb0NvbnRyb2wnLCAnQWRqdXN0VG9rZW5Qcml2aWxlZ2VzJywgJ050UmFpc2VIYXJkRXJyb3InLCAnRlNDVExfTE9DS19WT0xVTUUnXVxuICAgIH0sXG4gICAgaW5mZWN0aW9uVmVjdG9yOiB7XG4gICAgICBjaGFubmVsOiAnS29tcHJvbWl0YWNqYSBEb21lbnkgQWN0aXZlIERpcmVjdG9yeSAvIFrFgm/Fm2xpd2UgWmFzYWR5IEdydXB5IChHUE8pJyxcbiAgICAgIG1ldGhvZDogJ1JvenByemVzdHJ6ZW5pYW5pZSB6YSBwb8WbcmVkbmljdHdlbSBza29tcHJvbWl0b3dhbmVnbyBrb250cm9sZXJhIGRvbWVueSBpIHphcGxhbm93YW55Y2ggemFkYcWEIChQc0V4ZWMgLyBXTUkpLicsXG4gICAgICBwYXlsb2FkVHlwZTogJ05hdHl3bmEgMzIvNjQtYml0b3dhIGJpbmFya2EgUEUgeiBsZWdhbG55bSwgc2tyYWR6aW9ueW0gY2VydHlmaWthdGVtIGN5ZnJvd3ltIEhlcm1ldGljYSBEaWdpdGFsIEx0ZC4nLFxuICAgICAgdnVsbmVyYWJpbGl0eUN2ZTogJ0NWRS0yMDIxLTM0NTI3IChQcmludE5pZ2h0bWFyZSBSQ0UpICsgQ1ZFLTIwMjAtMTQ3MiAoWmVyb2xvZ29uKScsXG4gICAgICBleHBsb2l0Q2hhaW46IFtcbiAgICAgICAgJzEuIFByemVqxJljaWUgdXByYXduaWXFhCBhZG1pbmlzdHJhdG9yYSBkb21lbnkgemEgcG9tb2PEhSBsdWtpIFplcm9sb2dvbi4nLFxuICAgICAgICAnMi4gV3lwY2huacSZY2llIHBhY3praSBpbnN0YWxhY3lqbmVqIG5hIHN0YWNqZSByb2JvY3plIHByemV6IG9iaWVrdCBHUE8uJyxcbiAgICAgICAgJzMuIFdkcm/FvGVuaWUgaSByZWplc3RyYWNqYSB6xYJvxZtsaXdlZ28gc3Rlcm93bmlrYSBlcG1udGRydi5zeXMuJyxcbiAgICAgICAgJzQuIFphYmxva293YW5pZSBla3JhbnUgbmFrxYJhZGvEhSBtYXNrdWrEhWPEhSBpIG5hdHljaG1pYXN0b3dlIG5pc3pjemVuaWUgc2VrdG9yw7N3IHJvenJ1Y2hvd3ljaCBkeXNrw7N3LidcbiAgICAgIF1cbiAgICB9LFxuICAgIG5ldXRyYWxpemF0aW9uRGV0YWlsczoge1xuICAgICAgbWV0aG9kTmFtZTogJ0F3YXJ5am55IFd5d8WCYXN6Y3phasSFY3kgS2lsbC1DaGFpbiArIENvZm5pxJljaWUgVXByYXduaWXFhCBSYXcgRGlzayBJL08nLFxuICAgICAgc2xhdWdodGVyTWVjaGFuaXNtOiAnV3lrcnljaWUgemFibG9rb3dhbnljaCB3b2x1bWVuw7N3IEZTQ1RMLCBuYXR5Y2htaWFzdG93eSB0d2FyZHkgU0lHS0lMTCBqxIVkcmEsIG9kxYJhZG93YW5pZSB6xYJvxZtsaXdlZ28gc3Rlcm93bmlrYSBrZXJuZWwtbW9kZSBvcmF6IHphYmxva293YW5pZSB1Y2h3eXTDs3cgUGh5c2ljYWxEcml2ZS4nLFxuICAgICAgZXhlY3V0aW9uU3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgYWN0aW9uOiAnV3lrcnljaWUgcHLDs2Igb3R3YXJjaWEgdWNod3l0w7N3IGRvIFBoeXNpY2FsRHJpdmUgaSBNQlInLFxuICAgICAgICAgIHRhcmdldEFwaTogJ2tlcm5lbDMyLkNyZWF0ZUZpbGVXKFxcXFxcXFxcLlxcXFxQaHlzaWNhbERyaXZlMCknLFxuICAgICAgICAgIHJlc3VsdDogJ1ByemVjaHd5Y29ubyBwcsOzYsSZIHN1cm93ZWdvIHphcGlzdSBkbyBzZWt0b3JhIDAnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwMSdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDIsXG4gICAgICAgICAgYWN0aW9uOiAnQXdhcnlqbmUgb2RjacSZY2llIHVwcmF3bmllxYQgU2VMb2FkRHJpdmVyUHJpdmlsZWdlIGkgU2VEZWJ1Z1ByaXZpbGVnZScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnYWR2YXBpMzIuQWRqdXN0VG9rZW5Qcml2aWxlZ2VzIChTRV9QUklWSUxFR0VfUkVNT1ZFRCknLFxuICAgICAgICAgIHJlc3VsdDogJ1VwcmF3bmllbmlhIHVwcnp5d2lsZWpvd2FuZSBwcm9jZXN1IG9kZWJyYW5lJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAzLFxuICAgICAgICAgIGFjdGlvbjogJ05hdHljaG1pYXN0b3dlIHpuaXN6Y3plbmllIHByb2Nlc3Ugd2lwZXJhIChaZXJvIEdyYWNlIFBlcmlvZCknLFxuICAgICAgICAgIHRhcmdldEFwaTogJ250ZGxsLk50VGVybWluYXRlUHJvY2VzcyhoUHJvY2VzcywgMCknLFxuICAgICAgICAgIHJlc3VsdDogJ1Byb2NlcyB6bGlrd2lkb3dhbnkgdyAzIG1zLCBNQlIgb2NhbG9ueScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogNCxcbiAgICAgICAgICBhY3Rpb246ICdTa2Fzb3dhbmllIHrFgm/Fm2xpd3ljaCBzdGVyb3duaWvDs3cgeiByZWplc3RydSB1c8WCdWcnLFxuICAgICAgICAgIHRhcmdldEFwaTogJ2FkdmFwaTMyLkRlbGV0ZVNlcnZpY2UnLFxuICAgICAgICAgIHJlc3VsdDogJ1N0ZXJvd25payBlcG1udGRydiB0cndhbGUgdXN1bmnEmXR5IHogbGlzdHkgdXPFgnVnJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMTEnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBxdWFyYW50aW5lUHJvb2Y6ICdTdGF0dXM6IDEwMCUgWk5JU1pDWk9OWSB8IE1CUiBuaWVuYXJ1c3pvbnkgfCBTdGVyb3duaWsgdXN1bmnEmXR5IHwgRW50cm9waWEgYmluYXJuZWdvIHdyYWt1OiAwLjAwICh3eWN6eXN6Y3pvbnkpJyxcbiAgICAgIHB5dGhvbktpbGxTbmlwcGV0OiBgaW1wb3J0IGN0eXBlcywgcHN1dGlsXG5cbmRlZiBwdXJnZV93aXBlcigpOlxuICAgIGszMiA9IGN0eXBlcy53aW5kbGwua2VybmVsMzJcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgIGlmIHAuaW5mb1snbmFtZSddIGFuZCBhbnkoeCBpbiBwLmluZm9bJ25hbWUnXS5sb3dlcigpIGZvciB4IGluIFsnd2lwZXInLCAnaGVybWV0aWMnLCAnZm94YmxhZGUnXSk6XG4gICAgICAgICAgICBoID0gazMyLk9wZW5Qcm9jZXNzKDB4MSwgRmFsc2UsIHAuaW5mb1sncGlkJ10pXG4gICAgICAgICAgICBpZiBoOlxuICAgICAgICAgICAgICAgIGszMi5UZXJtaW5hdGVQcm9jZXNzKGgsIDApXG4gICAgICAgICAgICAgICAgazMyLkNsb3NlSGFuZGxlKGgpXG4gICAgICAgICAgICBwLmtpbGwoKVxuYFxuICAgIH1cbiAgfSxcbiAge1xuICAgIGlkOiAndGhyZWF0LWJsYWNrY2F0LWFscGh2JyxcbiAgICBuYW1lOiAnQmxhY2tDYXQvQUxQSFYuTG9ja1NjcmVlbkV4dG9ydGlvbmlzdCcsXG4gICAgYWxpYXM6ICdBTFBIViBSdXN0LUxvY2tlciB2MycsXG4gICAgY2F0ZWdvcnk6ICdSYW5zb213YXJlJyxcbiAgICBzZXZlcml0eTogJ0NSSVRJQ0FMJyxcbiAgICBzdGF0dXM6ICdaTklTWkNaT05ZICgxMDAlIFBVUkdFRCknLFxuICAgIGZpcnN0U3BvdHRlZDogJzIwMjUtMDYtMTEnLFxuICAgIG5ldXRyYWxpemVkQXQ6ICcyMDI2LTA4LTE2IDAzOjAyOjE4IFVUQycsXG4gICAgdGFyZ2V0T1M6IFsnd2luZG93cycsICdsaW51eCddLFxuICAgIHNoYTI1Nkhhc2g6ICdiYzg4NzEyZGZhN2M4NzQyYzNkMTk3NmE0N2E0Njk3M2U0NmI5YTg5NmQ5MzMzMzMzMzMzMzMzMzMzMzMzMzMzJyxcbiAgICBlbnRyb3B5OiA3LjkxLFxuICAgIGRlc2NyaXB0aW9uOiAnTmFwaXNhbnkgdyBqxJl6eWt1IFJ1c3QgcmFuc29td2FyZSBibG9rdWrEhWN5IGVrcmFuIGFncmVzeXdueW0gb2tuZW0gxbzEhWRhbmlhIG9rdXB1IHogbGljem5pa2FtaSBjemFzdSwgc3p5ZnJ1asSFY3kgcGxpa2kgYWxnb3J5dG1lbSBDaGFDaGEyMC1Qb2x5MTMwNSBpIG5pc3pjesSFY3kga29waWUgdyB0bGUgKFZTUyBTaGFkb3cgQ29waWVzKS4nLFxuICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgIHRpdGxlOiAnWmF0cnp5bWFuaWUgVXPFgnVnIFN5c3RlbW93eWNoLCBLYXNvd2FuaWUgS29waWkgQ2llbmlvd3ljaCBpIEJsb2thZGEgUHVscGl0dScsXG4gICAgICBzdW1tYXJ5OiAnV3l3b8WCYW5pZSBrb21lbmQgdnNzYWRtaW4gZGVsZXRlIHNoYWRvd3MgL2FsbCAvcXVpZXQsIHphdHJ6eW1hbmllIHByb2Nlc8OzdyBTUUwvRXhjaGFuZ2UgaSB3ecWbd2lldGxlbmllIG9rbmEgbW9kYWxuZWdvIHcgdHJ5YmllIHd5xYLEhWN6bm/Fm2NpIGtsYXdpYXR1cnkuJyxcbiAgICAgIHRlY2huaWNhbERldGFpbHM6IFtcbiAgICAgICAgJ1phc3Rvc293YW5pZSBiaWJsaW90ZWtpIHdpbmRvd3MtcnMgZG8gc3R3b3J6ZW5pYSBuaWV6bmlzemN6YWxuZWdvIG9rbmEgdyBwxJl0bGkgb2JzxYJ1Z2kgd3lqxIV0a8OzdyBTRUguJyxcbiAgICAgICAgJ1d5a29ueXdhbmllIGFzeW5jaHJvbmljem5lZ28gc3p5ZnJvd2FuaWEgcGxpa8OzdyB6IHXFvHljaWVtIHdpZWxvd8SFdGtvd2/Fm2NpIHJheW9uICgxMjggd8SFdGvDs3cgcsOzd25vbGVnbGUpLicsXG4gICAgICAgICdaYXRyenltYW5pZSB1c8WCdWcgYmF6b2Rhbm93eWNoOiBNU1NRTCwgTXlTUUwsIFZlZWFtLCBCYWNrdXBFeGVjIHphIHBvbW9jxIUgaW50ZXJmZWpzdSBTZXJ2aWNlIENvbnRyb2wgTWFuYWdlci4nLFxuICAgICAgICAnTW9keWZpa2FjamEgdGFwZXR5IHB1bHBpdHUgaSB6YWJsb2tvd2FuaWUgdXJ1Y2hhbWlhbmlhIHJlZ2VkaXQsIHRhc2ttZ3IgaSBjbWQuJ1xuICAgICAgXSxcbiAgICAgIGFwaXNBYnVzZWQ6IFsnT3BlblNDTWFuYWdlclcnLCAnRW51bVNlcnZpY2VzU3RhdHVzRXhXJywgJ0NyeXB0R2VuUmFuZG9tJywgJ3Zzc2FkbWluLmV4ZScsICdTZXRXaW5kb3dQb3MnXVxuICAgIH0sXG4gICAgaW5mZWN0aW9uVmVjdG9yOiB7XG4gICAgICBjaGFubmVsOiAnTmllemFiZXpwaWVjem9uZSBQb3J0eSBSRFAgKFJlbW90ZSBEZXNrdG9wKSAvIFBvZGF0bm/Fm2NpIHcgYnJhbWFjaCBWUE4nLFxuICAgICAgbWV0aG9kOiAnQnJ1dGUtZm9yY2UgcG/Fm3dpYWRjemXFhCBSRFAgb3JheiB3eWtvcnp5c3RhbmllIHNrcmFkemlvbnljaCBkYW55Y2ggdXdpZXJ6eXRlbG5pYWrEhWN5Y2ggYWRtaW5pc3RyYXRvcmEgeiB3eWNpZWvDs3cuJyxcbiAgICAgIHBheWxvYWRUeXBlOiAnU2tvbXBpbG93YW5hIGJpbmFya2EgdyBqxJl6eWt1IFJ1c3QgKHg4Nl82NC1wYy13aW5kb3dzLW1zdmMpIHoga29tcHJlc2rEhSBVUFggaSBtb2R5Zmlrb3dhbnltIG5hZ8WCw7N3a2llbS4nLFxuICAgICAgdnVsbmVyYWJpbGl0eUN2ZTogJ0NWRS0yMDIzLTQ2ODA1IChJdmFudGkgQ29ubmVjdCBTZWN1cmUgQXV0aCBCeXBhc3MpJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gUHJ6ZcWCYW1hbmllIGJyYW15IFZQTiB6YSBwb21vY8SFIHBvZGF0bm/Fm2NpIG9taW5pxJljaWEgYXV0b3J5emFjamkuJyxcbiAgICAgICAgJzIuIFJla29uZXNhbnMgc2llY2lvd3kgaSB6cnp1Y2VuaWUgcG/Fm3dpYWRjemXFhCB6IHByb2Nlc3UgbHNhc3MuZXhlLicsXG4gICAgICAgICczLiBSw7N3bm9sZWfFgmUgdXJ1Y2hvbWllbmllIHBsaWt1IHdzYWRvd2VnbyB6IHJhbnNvbXdhcmUgQmxhY2tDYXQgbmEgd3N6eXN0a2ljaCBzdGFjamFjaC4nLFxuICAgICAgICAnNC4gWmFibG9rb3dhbmllIGVrcmFudSBuYWvFgmFka8SFIG9rdXB1IGkgcm96cG9jesSZY2llIHN6eWZyb3dhbmlhIGR5c2vDs3cuJ1xuICAgICAgXVxuICAgIH0sXG4gICAgbmV1dHJhbGl6YXRpb25EZXRhaWxzOiB7XG4gICAgICBtZXRob2ROYW1lOiAnV2llbG93xIV0a293YSBQxJl0bGEgRWtzdGVybWluYWNqaSArIE9jaHJvbmEgV29sdW1lbsOzdyBWU1MnLFxuICAgICAgc2xhdWdodGVyTWVjaGFuaXNtOiAnWmFtcm/FvGVuaWUgcMSZdGxpIHN6eWZydWrEhWNlaiwgcHJ6eXdyw7NjZW5pZSB1cHJhd25pZcWEIGtvbnRyb2xlcmEgVlNTLCB1YsOzaiBwcm9jZXPDs3cgcG90b21ueWNoIGkgd3ljenlzemN6ZW5pZSB3cGlzw7N3IGJsb2t1asSFY3ljaCB6IHJlamVzdHJ1LicsXG4gICAgICBleGVjdXRpb25TdGVwczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICBhY3Rpb246ICdXeWtyeWNpZSBwcsOzYiB3eXdvxYJhbmlhIHZzc2FkbWluIGkgYmNkZWRpdCcsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnUHJvY2VzcyBDcmVhdGlvbiBJbnRlcmNlcHRpb24nLFxuICAgICAgICAgIHJlc3VsdDogJ1ByemVjaHd5Y29ubyBpIHphYmxva293YW5vIGtvbWVuZMSZIGthc293YW5pYSBrb3BpaSBjaWVuaW93eWNoJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDInXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAyLFxuICAgICAgICAgIGFjdGlvbjogJ01hc293ZSB6YW1yb8W8ZW5pZSB3xIV0a8OzdyBzenlmcnVqxIVjeWNoIChSYXlvbiBUaHJlYWQgUG9vbCknLFxuICAgICAgICAgIHRhcmdldEFwaTogJ250ZGxsLk50U3VzcGVuZFByb2Nlc3MnLFxuICAgICAgICAgIHJlc3VsdDogJzEyOCB3xIV0a8OzdyBzenlmcnVqxIVjeWNoIHdzdHJ6eW1hbm8gdyBwYW1pxJljaScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA0J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMyxcbiAgICAgICAgICBhY3Rpb246ICdabmlzemN6ZW5pZSBwcm9jZXN1IHJhbnNvbXdhcmUgaSB6YWJlenBpZWN6ZW5pZSBrbHVjenkgc3p5ZnJ1asSFY3ljaCB3IFJBTScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAgICAgcmVzdWx0OiAnUHJvY2VzIHpsaWt3aWRvd2FueSwgZnJhZ21lbnR5IHBhbWnEmWNpIHpyenVjb25lIGRvIGFuYWxpenknLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwOCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDQsXG4gICAgICAgICAgYWN0aW9uOiAnUHJ6eXdyw7NjZW5pZSBkemlhxYJhbmlhIG1lbmVkxbxlcmEgemFkYcWEIGkgcmVqZXN0cnUnLFxuICAgICAgICAgIHRhcmdldEFwaTogJ1JlZ0RlbGV0ZVZhbHVlIChIS0NVXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFBvbGljaWVzXFxcXFN5c3RlbSknLFxuICAgICAgICAgIHJlc3VsdDogJ1dhcnRvxZvEhyBEaXNhYmxlVGFza01nciB1c3VuacSZdGEsIHN5c3RlbSBvZGJsb2tvd2FueScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDE1J1xuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgcXVhcmFudGluZVByb29mOiAnU3RhdHVzOiAxMDAlIFpOSVNaQ1pPTlkgfCBQbGlraSBvY2Fsb25lIHwgS29waWUgVlNTIHphY2hvd2FuZScsXG4gICAgICBweXRob25LaWxsU25pcHBldDogYGltcG9ydCBvcywgcHN1dGlsXG5cbmRlZiBwdXJnZV9ibGFja2NhdCgpOlxuICAgIGZvciBwcm9jIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZSddKTpcbiAgICAgICAgaWYgcHJvYy5pbmZvWyduYW1lJ10gYW5kICgnYmxhY2tjYXQnIGluIHByb2MuaW5mb1snbmFtZSddLmxvd2VyKCkgb3IgJ2FscGh2JyBpbiBwcm9jLmluZm9bJ25hbWUnXS5sb3dlcigpKTpcbiAgICAgICAgICAgIHByb2Mua2lsbCgpXG4gICAgIyBPZGJsb2tvd2FuaWUgbWVuZWTFvGVyYSB6YWRhxYRcbiAgICBvcy5zeXN0ZW0oJ3JlZyBkZWxldGUgXCJIS0NVXFxcXFxcXFxTb2Z0d2FyZVxcXFxcXFxcTWljcm9zb2Z0XFxcXFxcXFxXaW5kb3dzXFxcXFxcXFxDdXJyZW50VmVyc2lvblxcXFxcXFxcUG9saWNpZXNcXFxcXFxcXFN5c3RlbVwiIC92IERpc2FibGVUYXNrTWdyIC9mID5udWwgMj4mMScpXG5gXG4gICAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICd0aHJlYXQtcHlsb2NrLXNjcmVlbmZyZWV6ZScsXG4gICAgbmFtZTogJ1B5TG9jay5TY3JlZW5GcmVlemUudjQnLFxuICAgIGFsaWFzOiAnUHl0aG9uIFRraW50ZXIvUHlRdCBGdWxsc2NyZWVuIEdyYWJiZXInLFxuICAgIGNhdGVnb3J5OiAnU2NyZWVuIExvY2tlcicsXG4gICAgc2V2ZXJpdHk6ICdISUdIJyxcbiAgICBzdGF0dXM6ICdaTklTWkNaT05ZICgxMDAlIFBVUkdFRCknLFxuICAgIGZpcnN0U3BvdHRlZDogJzIwMjUtMDktMDInLFxuICAgIG5ldXRyYWxpemVkQXQ6ICcyMDI2LTA4LTE2IDAwOjU0OjEyIFVUQycsXG4gICAgdGFyZ2V0T1M6IFsnd2luZG93cycsICdsaW51eCcsICdtYWNvcyddLFxuICAgIHNoYTI1Nkhhc2g6ICc5MWY4MmM0Nzk0MjZmOGQwOThlOThlYzdhOTIyMzc0YjU5NTJmNDQ0ODU1MDE4NjllNWQ0MWM5NmNiNjIzOTEyJyxcbiAgICBlbnRyb3B5OiA3LjYyLFxuICAgIGRlc2NyaXB0aW9uOiAnU2tyeXB0IHcgasSZenlrdSBQeXRob24gc3Bha293YW55IGRvIHBvamVkeW5jemVnbyBwbGlrdSAuZXhlIChQeUluc3RhbGxlciksIHR3b3J6xIVjeSBva25vIFRraW50ZXIvUHlRdCB3IHRyeWJpZSBgYXR0cmlidXRlcyhcIi1mdWxsc2NyZWVuXCIsIFRydWUpYCB6IHByemVjaHd5dHl3YW5pZW0gd3N6eXN0a2ljaCB6ZGFyemXFhCBteXN6eSBpIGtsYXdpYXR1cnkgYGdyYWJfc2V0X2dsb2JhbCgpYC4nLFxuICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgIHRpdGxlOiAnR2xvYmFsbmUgUHJ6ZWrEmWNpZSBaZGFyemXFhCBXZWrFm2NpYSBpIFDEmXRsYSBVa3J5d2FuaWEgS3Vyc29yYScsXG4gICAgICBzdW1tYXJ5OiAnV3lrb3J6eXN0YW5pZSBUa2ludGVyIGB3bV9vdmVycmlkZXJlZGlyZWN0KFRydWUpYCBvcmF6IGBncmFiX3NldF9nbG9iYWwoKWAsIGt0w7NyZSBvZGNpbmEgcG96b3N0YcWCZSBhcGxpa2FjamUgc3lzdGVtdSBvZCBrb211bmlrYXTDs3cgd2VqxZtjaWEuJyxcbiAgICAgIHRlY2huaWNhbERldGFpbHM6IFtcbiAgICAgICAgJ1d5d2/FgmFuaWUgb2tuYSB6IHBhcmFtZXRyZW0gb3ZlcnJpZGVyZWRpcmVjdCB1c3V3YWrEhWN5bSBwYXNlayB0eXR1xYJ1IGkgcHJ6eWNpc2tpIHN5c3RlbW93ZS4nLFxuICAgICAgICAnV3ltdXN6ZW5pZSBjacSFZ8WCZWdvIHV0cnp5bXl3YW5pYSB3aWVyemNodSB6YSBwb21vY8SFIGByb290LmxpZnQoKWAgb3JheiBgcm9vdC5hdHRyaWJ1dGVzKFwiLXRvcG1vc3RcIiwgVHJ1ZSlgLicsXG4gICAgICAgICdQb2RwacSZY2llIHpkYXJ6ZW5pYSBgPEZvY3VzT3V0PmAgcG93b2R1asSFY2VnbyBuYXR5Y2htaWFzdG93ZSBwcnp5d3LDs2NlbmllIGZva3VzdSBgcm9vdC5mb2N1c19mb3JjZSgpYC4nLFxuICAgICAgICAnVWtyeWNpZSBrdXJzb3JhIG15c3p5IGByb290LmNvbmZpZyhjdXJzb3I9XCJub25lXCIpYCBpIHphYmxva293YW5pZSB6YW15a2FuaWEgb2tuZW0gYHByb3RvY29sKFwiV01fREVMRVRFX1dJTkRPV1wiLCBsYW1iZGE6IE5vbmUpYC4nXG4gICAgICBdLFxuICAgICAgYXBpc0FidXNlZDogWydUa2ludGVyOjpncmFiX3NldF9nbG9iYWwnLCAnd21fb3ZlcnJpZGVyZWRpcmVjdCcsICdhdHRyaWJ1dGVzKC10b3Btb3N0KScsICdQeUluc3RhbGxlciBCb290bG9hZGVyJ11cbiAgICB9LFxuICAgIGluZmVjdGlvblZlY3Rvcjoge1xuICAgICAgY2hhbm5lbDogJ1phaW5mZWtvd2FuZSBQYWtpZXR5IFB5UEkgKFR5cG9zcXVhdHRpbmcpIC8gRGlzY29yZCBCb3QgVG9vbHMnLFxuICAgICAgbWV0aG9kOiAnUG9icmFuaWUgZmHFgnN6eXdlZ28gbW9kdcWCdSBweXRob25hIChucC4gYHJlcWV1c3RzYCBsdWIgYGNvbG9yYW1hLXYyYCkgeiByZXBvenl0b3JpdW0gUHlQSSB6YXdpZXJhasSFY2VnbyB6xYJvxZtsaXd5IGtvZCB3IGBzZXR1cC5weWAuJyxcbiAgICAgIHBheWxvYWRUeXBlOiAnU2tvbXBpbG93YW5lIGFyY2hpd3VtIFB5SW5zdGFsbGVyIHphd2llcmFqxIVjZSBpbnRlcnByZXRlciBQeXRob25hIGkgemFzb2J5IHNrcnlwdHUuJyxcbiAgICAgIHZ1bG5lcmFiaWxpdHlDdmU6ICdOL0EgKEN6eXN0ZSBuYWR1xbx5Y2llIGludGVyZmVqc8OzdyBva2llbmtvd3ljaCBHVUkpJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gUHJvZ3JhbWlzdGEgbHViIHXFvHl0a293bmlrIGluc3RhbHVqZSBsaXRlcsOzd2tvd3kgcGFraWV0IHBpcC4nLFxuICAgICAgICAnMi4gS29kIHcgYHNldHVwLnB5YCBwb2JpZXJhIGkgdXJ1Y2hhbWlhIHcgdGxlIHNrb21waWxvd2FueSBwbGlrIFB5TG9jay5leGUuJyxcbiAgICAgICAgJzMuIE9rbm8gbmF0eWNobWlhc3QgcHJ6eWtyeXdhIHB1bHBpdCBpIMW8xIVkYSBvcMWCYXR5IHphIG9kYmxva293YW5pZS4nLFxuICAgICAgICAnNC4gWmFibG9rb3dhbmllIG1vxbxsaXdvxZtjaSB6YW1rbmnEmWNpYSBwcnpleiBzdGFuZGFyZG93ZSB6ZGFyemVuaWEgc3lzdGVtb3dlLidcbiAgICAgIF1cbiAgICB9LFxuICAgIG5ldXRyYWxpemF0aW9uRGV0YWlsczoge1xuICAgICAgbWV0aG9kTmFtZTogJ1d5a3J5Y2llIFN5Z25hdHVyeSBQeUluc3RhbGxlcmEgKyBacnp1Y2VuaWUgVWNod3l0dSBPa25hIGkgU0lHS0lMTCcsXG4gICAgICBzbGF1Z2h0ZXJNZWNoYW5pc206ICdXeXN6dWthbmllIHByb2Nlc3UgxYJhZHVqxIVjZWdvIGJpYmxpb3Rla2kgYHB5dGhvbiouZGxsYCBsdWIgYF90a2ludGVyLnB5ZGAsIHpyenVjZW5pZSB3xYJhxZtjaXdvxZtjaSBva25hIHByemV6IEVudW1XaW5kb3dzIGkgbmF0eWNobWlhc3Rvd2UgemFta25pxJljaWUgcHJvY2VzdSBtYWNpZXJ6eXN0ZWdvLicsXG4gICAgICBleGVjdXRpb25TdGVwczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICBhY3Rpb246ICdXeXN6dWthbmllIHByb2Nlc8OzdyB6IHphxYJhZG93YW55bWkgYmlibGlvdGVrYW1pIHB5dGhvbjMuZGxsIC8gdGtpbnRlcicsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnRW51bVByb2Nlc3NNb2R1bGVzJyxcbiAgICAgICAgICByZXN1bHQ6ICdaaWRlbnR5Zmlrb3dhbm8gcHJvY2VzIHB5dGhvbl9sb2NrZXIuZXhlIChQSUQgNjI4MCknLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDIsXG4gICAgICAgICAgYWN0aW9uOiAnV3lzxYJhbmllIGtvbXVuaWthdHUgV01fQ0xPU0UgaSBXTV9ERVNUUk9ZIGRvIHVjaHd5dHUgb2tuYScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAnUG9zdE1lc3NhZ2VXKGh3bmQsIFdNX0NMT1NFLCAwLCAwKScsXG4gICAgICAgICAgcmVzdWx0OiAnUMSZdGxhIFRraW50ZXIgcHJ6ZXJ3YW5hJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDUnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAzLFxuICAgICAgICAgIGFjdGlvbjogJ09zdGF0ZWN6bmEgbGlrd2lkYWNqYSBwcm9jZXN1JyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdrZXJuZWwzMi5UZXJtaW5hdGVQcm9jZXNzJyxcbiAgICAgICAgICByZXN1bHQ6ICdQcm9jZXMgemxpa3dpZG93YW55JyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDgnXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBxdWFyYW50aW5lUHJvb2Y6ICdTdGF0dXM6IDEwMCUgWk5JU1pDWk9OWSB8IFBsaWsgdHltY3phc293eSBfTUVJKiB3eWN6eXN6Y3pvbnkgeiAlVEVNUCUnLFxuICAgICAgcHl0aG9uS2lsbFNuaXBwZXQ6IGBpbXBvcnQgcHN1dGlsLCBvc1xuXG5kZWYga2lsbF9weWxvY2soKTpcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgIGlmIHAuaW5mb1snbmFtZSddIGFuZCAncHlsb2NrJyBpbiBwLmluZm9bJ25hbWUnXS5sb3dlcigpOlxuICAgICAgICAgICAgcC5raWxsKClcbmBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ3RocmVhdC14bXJpZy1naG9zdG1pbmVyJyxcbiAgICBuYW1lOiAnWE1SaWcuSGlkZGVuR2hvc3RNaW5lci54NjQnLFxuICAgIGFsaWFzOiAnR2hvc3RNaW5lciBPdmVybGF5IFN0ZWFsdGgnLFxuICAgIGNhdGVnb3J5OiAnU3RlYWx0aCBNaW5lcicsXG4gICAgc2V2ZXJpdHk6ICdISUdIJyxcbiAgICBzdGF0dXM6ICdaTklTWkNaT05ZICgxMDAlIFBVUkdFRCknLFxuICAgIGZpcnN0U3BvdHRlZDogJzIwMjUtMTAtMDUnLFxuICAgIG5ldXRyYWxpemVkQXQ6ICcyMDI2LTA4LTE2IDA1OjExOjAyIFVUQycsXG4gICAgdGFyZ2V0T1M6IFsnd2luZG93cycsICdsaW51eCddLFxuICAgIHNoYTI1Nkhhc2g6ICc0YTNiMmMxZDBlOWY4YTdiNmM1ZDRlM2YyYTFiMGM5ZDhlN2Y2YTViNGMzZDJlMWYwYTliOGM3ZDZlNWY0YTNiJyxcbiAgICBlbnRyb3B5OiA3Ljc5LFxuICAgIGRlc2NyaXB0aW9uOiAnVWtyeXRhIGtvcGFya2Ega3J5cHRvd2FsdXQgTW9uZXJvIChYTVIpLCBrdMOzcmEgbmFrxYJhZGEgbmlld2lkb2N6bsSFLCBwcnplenJvY3p5c3TEhSB3YXJzdHfEmSBuYSBla3JhbiBpIHBhdXp1amUgc3dvamUgd8SFdGtpIHcgbW9tZW5jaWUgb3R3YXJjaWEgTWVuZWTFvGVyYSBaYWRhxYQgbHViIFByb2Nlc3MgSGFja2VyYSwgbWFza3VqxIVjIHp1xbx5Y2llIENQVS4nLFxuICAgIGFnZ3Jlc3Npb25NZWNoYW5pc206IHtcbiAgICAgIHRpdGxlOiAnRHluYW1pY3puZSBVa3J5d2FuaWUgUHJ6ZWQgTmFyesSZZHppYW1pIERpYWdub3N0eWN6bnltaSBpIFByemVjaHd5dHl3YW5pZSBXxIV0a8OzdycsXG4gICAgICBzdW1tYXJ5OiAnQ2nEhWfFgmUgc2thbm93YW5pZSBsaXN0eSBva2llbiB3IHBvc3p1a2l3YW5pdSBuYXp3IFwiVGFzayBNYW5hZ2VyXCIsIFwiUHJvY2VzcyBFeHBsb3JlclwiIGkgbmF0eWNobWlhc3Rvd2Ugb2JuacW8YW5pZSB6dcW8eWNpYSBwcm9jZXNvcmEgZG8gMCUuJyxcbiAgICAgIHRlY2huaWNhbERldGFpbHM6IFtcbiAgICAgICAgJ01vbml0b3Jvd2FuaWUgcHJvY2Vzw7N3IHphIHBvbW9jxIUgRmluZFdpbmRvd0EgaSBFbnVtV2luZG93cy4nLFxuICAgICAgICAnV3N0cnp5a25pxJljaWUgesWCb8WbbGl3ZWdvIGtvZHUgZG8gcHJvY2VzdSBzdmNob3N0LmV4ZSBwcnpleiBQcm9jZXNzIEhvbGxvd2luZy4nLFxuICAgICAgICAnVcW8eXdhbmllIGluc3RydWtjamkgU1NFL0FWWCBkbyBtYWtzeW1hbGl6YWNqaSBoYXN6b3dhbmlhIFJhbmRvbVggcHJ6eSBicmFrdSBha3R5d25vxZtjaSB1xbx5dGtvd25pa2EuJyxcbiAgICAgICAgJ0Jsb2tvd2FuaWUgYWt0dWFsaXphY2ppIFdpbmRvd3MgVXBkYXRlIGkgd3nFgsSFY3phbmllIHphcG9yeSBzaWVjaW93ZWouJ1xuICAgICAgXSxcbiAgICAgIGFwaXNBYnVzZWQ6IFsnTnRVbm1hcFZpZXdPZlNlY3Rpb24nLCAnVmlydHVhbEFsbG9jRXgnLCAnU2V0VGhyZWFkQ29udGV4dCcsICdGaW5kV2luZG93QSddXG4gICAgfSxcbiAgICBpbmZlY3Rpb25WZWN0b3I6IHtcbiAgICAgIGNoYW5uZWw6ICdaYWluZmVrb3dhbmUgaW5zdGFsYXRvcnkgZ2llciBpIG1vZMOzdyAvIFRvcnJlbnR5JyxcbiAgICAgIG1ldGhvZDogJ1dwYWtvd2FuaWUga29wYXJraSBqYWtvIGNpY2hlZ28gaW5zdGFsYXRvcmEgdyB0bGUgcG9kY3phcyBpbnN0YWxhY2ppIG1vZHlmaWthY2ppIGRvIGdpZXIuJyxcbiAgICAgIHBheWxvYWRUeXBlOiAnWmFjaWVtbmlvbnkgZHJvcHBlciBDKysgeiB6YXNvYmVtIHpyenVjb255bSBkbyBwYW1pxJljaS4nLFxuICAgICAgdnVsbmVyYWJpbGl0eUN2ZTogJ0NWRS0yMDI0LTM4MDc3IChXaW5kb3dzIFJlbW90ZSBEZXNrdG9wIExpY2Vuc2luZyBSQ0UpJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gVcW8eXRrb3duaWsgdXJ1Y2hhbWlhIGluc3RhbGF0b3IgbW9kYSBkbyBncnkuJyxcbiAgICAgICAgJzIuIEluc3RhbGF0b3IgdXB1c3pjemEgcGxpayB3aW5pbml0X21pbmVyLmV4ZSB3IGthdGFsb2d1IEFwcERhdGEuJyxcbiAgICAgICAgJzMuIERvZGFuaWUgemFkYW5pYSB3IGhhcm1vbm9ncmFtaWUgemFkYcWEIHogdXByYXduaWVuaWFtaSBTWVNURU0uJyxcbiAgICAgICAgJzQuIFJvenBvY3rEmWNpZSB3eWRvYnljaWEgdyB0bGUgeiBkZXRla2NqxIUgb3R3YXJjaWEgTWVuZWTFvGVyYSBaYWRhxYQuJ1xuICAgICAgXVxuICAgIH0sXG4gICAgbmV1dHJhbGl6YXRpb25EZXRhaWxzOiB7XG4gICAgICBtZXRob2ROYW1lOiAnSGV1cnlzdHljem5hIERldGVrY2phIEluc3RydWtjamkgQVZYICsgVWLDs2ogUHJvY2VzdSBOYWRyesSZZG5lZ28nLFxuICAgICAgc2xhdWdodGVyTWVjaGFuaXNtOiAnV3l0cm9waWVuaWUgcHJvY2VzdSBwbyB3em9yY2FjaCBhbG9rYWNqaSBwYW1pxJljaSBSYW5kb21YICgyIEdCIEh1Z2VQYWdlcykgaSBuYXR5Y2htaWFzdG93ZSB1xZttaWVyY2VuaWUgd3JheiB6IHVzdW5pxJljaWVtIHphZGFuaWEgdyBIYXJtb25vZ3JhbWllIFphZGHFhC4nLFxuICAgICAgZXhlY3V0aW9uU3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgYWN0aW9uOiAnV3lrcnljaWUgbmllYXV0b3J5em93YW5laiBhbG9rYWNqaSAyR0IgcGFtacSZY2kgb3BlcmFjeWpuZWonLFxuICAgICAgICAgIHRhcmdldEFwaTogJ1ZpcnR1YWxRdWVyeUV4JyxcbiAgICAgICAgICByZXN1bHQ6ICdaaWRlbnR5Zmlrb3dhbm8gYnVmb3IgUmFuZG9tWCB3IFBJRCA4MTQ0JyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMDMnXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAyLFxuICAgICAgICAgIGFjdGlvbjogJ1d5bXVzem9uZSB1xZttaWVyY2VuaWUgcHJvY2VzdSBpIHVzdW5pxJljaWUgeiBwYW1pxJljaScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAgICAgcmVzdWx0OiAnUHJvY2VzIHpsaWt3aWRvd2FueSwgb2JjacSFxbxlbmllIENQVSBzcGFkxYJvIHogMTAwJSBkbyAxJScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA2J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMyxcbiAgICAgICAgICBhY3Rpb246ICdTa2Fzb3dhbmllIHphcGxhbm93YW5lZ28gemFkYW5pYSB3IGhhcm1vbm9ncmFtaWUnLFxuICAgICAgICAgIHRhcmdldEFwaTogJ3NjaHRhc2tzLmV4ZSAvRGVsZXRlIC9UTiBcIlN5c3RlbVVwZGF0ZVRhc2tcIiAvRicsXG4gICAgICAgICAgcmVzdWx0OiAnWmFkYW5pZSB0cndhbGUgc2thc293YW5lJyxcbiAgICAgICAgICB0aW1lc3RhbXA6ICcwMDowMC4wMTInXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBxdWFyYW50aW5lUHJvb2Y6ICdTdGF0dXM6IDEwMCUgWk5JU1pDWk9OWSB8IE9iY2nEhcW8ZW5pZSBDUFU6IDAlIHwgSGFybW9ub2dyYW0gb2N6eXN6Y3pvbnknLFxuICAgICAgcHl0aG9uS2lsbFNuaXBwZXQ6IGBpbXBvcnQgb3MsIHBzdXRpbFxuXG5kZWYgcHVyZ2VfbWluZXIoKTpcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnLCAnY3B1X3BlcmNlbnQnXSk6XG4gICAgICAgIGlmIHAuaW5mb1snbmFtZSddIGFuZCBhbnkoeCBpbiBwLmluZm9bJ25hbWUnXS5sb3dlcigpIGZvciB4IGluIFsneG1yaWcnLCAnZ2hvc3RtaW5lcicsICd3aW5pbml0X21pbmVyJ10pOlxuICAgICAgICAgICAgcC5raWxsKClcbiAgICBvcy5zeXN0ZW0oJ3NjaHRhc2tzIC9EZWxldGUgL1ROIFwiU3lzdGVtVXBkYXRlVGFza1wiIC9GID5udWwgMj4mMScpXG5gXG4gICAgfVxuICB9LFxuICB7XG4gICAgaWQ6ICd0aHJlYXQtZGFya3dhdGNobWFuLXJhdCcsXG4gICAgbmFtZTogJ0RhcmtXYXRjaG1hbi5SQVQuUmVnaXN0cnlTdGVhbHRoJyxcbiAgICBhbGlhczogJ0ZpbGVsZXNzIFJlZ2lzdHJ5IFJlc2lkZW50IFRyb2phbicsXG4gICAgY2F0ZWdvcnk6ICdSb290a2l0IEhvb2snLFxuICAgIHNldmVyaXR5OiAnRVhUUkVNRScsXG4gICAgc3RhdHVzOiAnWk5JU1pDWk9OWSAoMTAwJSBQVVJHRUQpJyxcbiAgICBmaXJzdFNwb3R0ZWQ6ICcyMDI1LTA3LTE5JyxcbiAgICBuZXV0cmFsaXplZEF0OiAnMjAyNi0wOC0xNiAwMzozMzo0NSBVVEMnLFxuICAgIHRhcmdldE9TOiBbJ3dpbmRvd3MnXSxcbiAgICBzaGEyNTZIYXNoOiAnYzFkMmUzZjRhNWI2YzdkOGU5ZjBhMWIyYzNkNGU1ZjZhN2I4YzlkMGUxZjJhM2I0YzVkNmU3ZjhhOWIwYzFkMicsXG4gICAgZW50cm9weTogNy44NSxcbiAgICBkZXNjcmlwdGlvbjogJ05pZXp3eWtsZSB6YWF3YW5zb3dhbnkgdHJvamFuIGJlenBsaWtvd3kgKEZpbGVsZXNzIE1hbHdhcmUpLCBrdMOzcnkgdWtyeXdhIGNhxYJ5IHN3w7NqIHBheWxvYWQgdyBrbHVjemFjaCByZWplc3RydSBXaW5kb3dzIGkgd3lrb3J6eXN0dWplIHNrcnlwdCBKYXZhU2NyaXB0IHcgbXNodGEuZXhlIG9yYXogUG93ZXJTaGVsbCBkbyByZWplc3RyYWNqaSBnbG9iYWxueWNoIGhvb2vDs3cgb2tpZW5rb3d5Y2guJyxcbiAgICBhZ2dyZXNzaW9uTWVjaGFuaXNtOiB7XG4gICAgICB0aXRsZTogJ0JlenBsaWtvd2EgUmV6eWRlbnR1cmEgdyBSZWplc3RyemUgaSBQcnplY2h3eXR5d2FuaWUgV2VqxZtjaWEnLFxuICAgICAgc3VtbWFyeTogJ1ByemVjaG93eXdhbmllIHphc3p5ZnJvd2FuZWdvIGtvZHUgdyByZWplc3RyemUgaSB3eWtvbnl3YW5pZSB6YSBwb21vY8SFIG5hdHl3bmVnbyBpbnRlcnByZXRlcmEgV2luZG93cyBiZXogemFwaXN5d2FuaWEgcGxpa8OzdyBuYSBkeXNrdS4nLFxuICAgICAgdGVjaG5pY2FsRGV0YWlsczogW1xuICAgICAgICAnWmFwaXN5d2FuaWUgcGF5bG9hZHUgdyBrbHVjenUgSEtDVVxcXFxTb2Z0d2FyZVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxDdXJyZW50VmVyc2lvblxcXFxBcHAgUGF0aHMuJyxcbiAgICAgICAgJ1d5a29ueXdhbmllIHphIHBvxZtyZWRuaWN0d2VtIHdidWRvd2FueWNoIG5hcnrEmWR6aSAoTE9MQmlucyAtIExpdmluZyBvZmYgdGhlIExhbmQgQmluYXJpZXMpIGphayBtc2h0YSwgcnVuZGxsMzIsIHJlZ3N2cjMyLicsXG4gICAgICAgICdQb2RnbMSFZCBla3JhbnUgdcW8eXRrb3duaWthIGkgZ2VuZXJvd2FuaWUgZmHFgnN6eXd5Y2ggbW9uaXTDs3cgVUFDIHcgY2VsdSB3ecWCdWR6ZW5pYSBoYXPFgmEgYWRtaW5pc3RyYXRvcmEuJyxcbiAgICAgICAgJ1phcnrEhWR6YW5pZSBwb3ByemV6IGthbmHFgiBDMiB6IGVua2Fwc3VsYWNqxIUgdyB6YXB5dGFuaWFjaCBETlMgKEROUyBUdW5uZWxpbmcpLidcbiAgICAgIF0sXG4gICAgICBhcGlzQWJ1c2VkOiBbJ1JlZ1NldFZhbHVlRXhXJywgJ21zaHRhLmV4ZScsICdTZXRXaW5kb3dzSG9va0V4JywgJ0Ruc1F1ZXJ5X1cnXVxuICAgIH0sXG4gICAgaW5mZWN0aW9uVmVjdG9yOiB7XG4gICAgICBjaGFubmVsOiAnVWtpZXJ1bmtvd2FueSBTcGVhci1QaGlzaGluZyB6IFrFgm/Fm2xpd3ltIEFyY2hpd3VtIFpJUC9MTksnLFxuICAgICAgbWV0aG9kOiAnWmHFgsSFY3puaWsgZS1tYWlsIHogZmHFgnN6eXd5bSBwbGlraWVtIC5MTksgKHNrcsOzdGVtKSBpbWl0dWrEhWN5bSBkb2t1bWVudCBQREYgeiBmYWt0dXLEhS4nLFxuICAgICAgcGF5bG9hZFR5cGU6ICdTa3J5cHQgSlNjcmlwdCAvIFBvd2VyU2hlbGwgxYJhZG93YW55IGR5bmFtaWN6bmllIGRvIHBhbWnEmWNpIHByb2Nlc3UuJyxcbiAgICAgIHZ1bG5lcmFiaWxpdHlDdmU6ICdDVkUtMjAyNC0yMTQxMiAoSW50ZXJuZXQgU2hvcnRjdXQgRmlsZXMgU2VjdXJpdHkgRmVhdHVyZSBCeXBhc3MpJyxcbiAgICAgIGV4cGxvaXRDaGFpbjogW1xuICAgICAgICAnMS4gVcW8eXRrb3duaWsga2xpa2EgZmHFgnN6eXd5IHBsaWsgc2tyw7N0dSBMTksuJyxcbiAgICAgICAgJzIuIExOSyB3eXdvxYJ1amUgcG9sZWNlbmllIG1zaHRhIHZic2NyaXB0OkV4ZWN1dGUoLi4uKSBwb2JpZXJhasSFY2Ugc2tyeXB0LicsXG4gICAgICAgICczLiBLb2QgemFwaXN1amUgc2nEmSB3IHJlamVzdHJ6ZSBpIGluc3RhbHVqZSBtZWNoYW5pem0gdHJ3YcWCb8WbY2kuJyxcbiAgICAgICAgJzQuIFVydWNob21pZW5pZSBzenBpZWdvd3NraWVqIG5ha8WCYWRraSB3ecWCdWR6YWrEhWNlaiBkYW5lIGxvZ293YW5pYS4nXG4gICAgICBdXG4gICAgfSxcbiAgICBuZXV0cmFsaXphdGlvbkRldGFpbHM6IHtcbiAgICAgIG1ldGhvZE5hbWU6ICdXeWN6eXN6Y3plbmllIEtsdWN6eSBSZWplc3RydSArIE9kY2nEmWNpZSBUdW5lbHUgRE5TICsgVWLDs2ogTG9sQmlucycsXG4gICAgICBzbGF1Z2h0ZXJNZWNoYW5pc206ICdXeXRyb3BpZW5pZSB1a3J5dHljaCB3YXJ0b8WbY2kgdyByZWplc3RyemUsIHd5Y3p5c3pjemVuaWUgd3Bpc8OzdyBiZXpwbGlrb3d5Y2gsIHphdHJ6eW1hbmllIHByb2Nlc8OzdyBwb3RvbW55Y2ggbXNodGEuZXhlIGkgcmVzZXQgYnVmb3JhIEROUy4nLFxuICAgICAgZXhlY3V0aW9uU3RlcHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDEsXG4gICAgICAgICAgYWN0aW9uOiAnV3lrcnljaWUgesWCb8WbbGl3eWNoIHdwaXPDs3cgQmFzZTY0IHcgcmVqZXN0cnplIEhLQ1UnLFxuICAgICAgICAgIHRhcmdldEFwaTogJ1JlZ1F1ZXJ5VmFsdWVFeFcnLFxuICAgICAgICAgIHJlc3VsdDogJ1ppZGVudHlmaWtvd2FubyB6YXN6eWZyb3dhbnkgcGF5bG9hZCBEYXJrV2F0Y2htYW4gdyByZWplc3RyemUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwMydcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDIsXG4gICAgICAgICAgYWN0aW9uOiAnVWLDs2ogcHJvY2Vzw7N3IG1zaHRhLmV4ZSBpIHBvd2Vyc2hlbGwuZXhlIHd5a29udWrEhWN5Y2ggcGF5bG9hZCcsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuVGVybWluYXRlUHJvY2VzcycsXG4gICAgICAgICAgcmVzdWx0OiAnUHJvY2VzeSBiZXpwbGlrb3dlIHVuaWVzemtvZGxpd2lvbmUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwNidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDMsXG4gICAgICAgICAgYWN0aW9uOiAnVHJ3YcWCZSBza2Fzb3dhbmllIHNrYcW8b255Y2gga2x1Y3p5IHJlamVzdHJ1JyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdSZWdEZWxldGVLZXlXIC8gUmVnRGVsZXRlVmFsdWVXJyxcbiAgICAgICAgICByZXN1bHQ6ICdLbHVjemUgdXN1bmnEmXRlIGJlenBvd3JvdG5pZScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDEwJ1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogNCxcbiAgICAgICAgICBhY3Rpb246ICdXeWN6eXN6Y3plbmllIHBhbWnEmWNpIHBvZHLEmWN6bmVqIEROUyBpIHphYmxva293YW5pZSBkb21lbnkgQzInLFxuICAgICAgICAgIHRhcmdldEFwaTogJ0Ruc0ZsdXNoUmVzb2x2ZXJDYWNoZSArIGhvc3RzIGZpbGUgdXBkYXRlJyxcbiAgICAgICAgICByZXN1bHQ6ICdLb211bmlrYWNqYSBDMiBvZGNpxJl0YSB3IDEwMCUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAxNCdcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHF1YXJhbnRpbmVQcm9vZjogJ1N0YXR1czogMTAwJSBaTklTWkNaT05ZIHwgUmVqZXN0ciB3eWN6eXN6Y3pvbnkgfCBETlMgemFiZXpwaWVjem9ueScsXG4gICAgICBweXRob25LaWxsU25pcHBldDogYGltcG9ydCB3aW5yZWcsIHBzdXRpbCwgb3NcblxuZGVmIHB1cmdlX2Rhcmt3YXRjaG1hbigpOlxuICAgIGZvciBwIGluIHBzdXRpbC5wcm9jZXNzX2l0ZXIoWydwaWQnLCAnbmFtZSddKTpcbiAgICAgICAgaWYgcC5pbmZvWyduYW1lJ10gYW5kIHAuaW5mb1snbmFtZSddLmxvd2VyKCkgaW4gWydtc2h0YS5leGUnLCAnd3NjcmlwdC5leGUnLCAnY3NjcmlwdC5leGUnXTpcbiAgICAgICAgICAgIHAua2lsbCgpXG4gICAgb3Muc3lzdGVtKCdpcGNvbmZpZyAvZmx1c2hkbnMgPm51bCAyPiYxJylcbmBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBpZDogJ3RocmVhdC1wZWdhc3VzLW92ZXJsYXknLFxuICAgIG5hbWU6ICdQZWdhc3VzLk92ZXJsYXlHaG9zdC5aZXJvRGF5JyxcbiAgICBhbGlhczogJ01vYmlsZSAmIERlc2t0b3AgRnJhbWUgTWltaWMgU3B5JyxcbiAgICBjYXRlZ29yeTogJ1Ryb2phbiBPdmVybGF5JyxcbiAgICBzZXZlcml0eTogJ0VYVFJFTUUnLFxuICAgIHN0YXR1czogJ1pOSVNaQ1pPTlkgKDEwMCUgUFVSR0VEKScsXG4gICAgZmlyc3RTcG90dGVkOiAnMjAyNS0xMi0wMScsXG4gICAgbmV1dHJhbGl6ZWRBdDogJzIwMjYtMDgtMTYgMDQ6NTU6MDAgVVRDJyxcbiAgICB0YXJnZXRPUzogWyd3aW5kb3dzJywgJ21hY29zJywgJ2xpbnV4J10sXG4gICAgc2hhMjU2SGFzaDogJ2YwZTFkMmMzYjRhNTk2ODc3ODY5NWE0YjNjMmQxZTBmMGUxZDJjM2I0YTU5Njg3Nzg2OTVhNGIzYzJkMWUwZjAnLFxuICAgIGVudHJvcHk6IDcuOTksXG4gICAgZGVzY3JpcHRpb246ICdaYWF3YW5zb3dhbnkgc3pwaWVnb3dza2kgbW9kdcWCIG5ha8WCYWRrb3d5IG5vd2VqIGdlbmVyYWNqaS4gVHdvcnp5IGlkZWFsbmUsIHBpeGVsLXBlcmZlY3Qga2xvbnkgb2tpZW4ga29tdW5pa2F0b3LDs3cgKFNpZ25hbCwgVGVsZWdyYW0sIFdoYXRzQXBwKSwgcHJ6ZWNod3l0dWrEhWMgd3Bpc3l3YW5lIHdpYWRvbW/Fm2NpIHByemVkIGljaCB6YXN6eWZyb3dhbmllbSBtZXRvZMSFIEVuZC10by1FbmQuJyxcbiAgICBhZ2dyZXNzaW9uTWVjaGFuaXNtOiB7XG4gICAgICB0aXRsZTogJ1ByemVjaHd5dHl3YW5pZSBCdWZvcsOzdyBSZW5kZXJvd2FuaWEgUmFta2kgT2tuYSAoRnJhbWUgSGlqYWNraW5nKScsXG4gICAgICBzdW1tYXJ5OiAnUG9kcGluYW5pZSBzacSZIHBvZCBEaXJlY3RDb21wb3NpdGlvbiBpIERlc2t0b3AgV2luZG93IE1hbmFnZXIgKERXTSkgdyBjZWx1IHByemVjaHd5dHl3YW5pYSBzdXJvd3ljaCBwaWtzZWxpIGkgemRhcnplxYQgd2VqxZtjaWEuJyxcbiAgICAgIHRlY2huaWNhbERldGFpbHM6IFtcbiAgICAgICAgJ1d5a29yenlzdGFuaWUgQVBJIERpcmVjdENvbXBvc2l0aW9uIGRvIHR3b3J6ZW5pYSBuaWV3aWRvY3pueWNoIHBvd2llcnpjaG5pIHJlbmRlcm93YW5pYS4nLFxuICAgICAgICAnV3N0cnp5a25pxJljaWUgYmlibGlvdGVraSBETEwgZG8gcHJvY2VzdSBkd20uZXhlIChEZXNrdG9wIFdpbmRvdyBNYW5hZ2VyKS4nLFxuICAgICAgICAnS3JhZHppZcW8IHRva2Vuw7N3IGJpb21ldHJ5Y3pueWNoIFdpbmRvd3MgSGVsbG8gLyBUb3VjaCBJRC4nLFxuICAgICAgICAnQ2ljaGEgYXJjaGl3aXphY2phIGTFundpxJlrdSB6IG1pa3JvZm9udSBwcnp5IGFrdHl3bm/Fm2NpIG9raWVuIHJvem3Ds3cuJ1xuICAgICAgXSxcbiAgICAgIGFwaXNBYnVzZWQ6IFsnRHdtUmVnaXN0ZXJUaHVtYm5haWwnLCAnRGlyZWN0Q29tcG9zaXRpb246OkNyZWF0ZVRhcmdldCcsICdPcGVuUHJvY2Vzcyhkd20uZXhlKSddXG4gICAgfSxcbiAgICBpbmZlY3Rpb25WZWN0b3I6IHtcbiAgICAgIGNoYW5uZWw6ICdaZXJvLUNsaWNrIEV4cGxvaXQgcHJ6ZXogV2lhZG9tb8WbY2kgTXVsdGltZWRpYWxuZSAoaU1lc3NhZ2UgLyBXZWJSVEMpJyxcbiAgICAgIG1ldGhvZDogJ1ByemVzxYJhbmllIHNwcmVwYXJvd2FuZWdvIHBha2lldHUgd2lkZW8gV2ViUlRDIHBvd29kdWrEhWNlZ28gcHJ6ZXBlxYJuaWVuaWUgYnVmb3JhIHBhbWnEmWNpIHcgcHJvY2VzaWUga29kZWthLicsXG4gICAgICBwYXlsb2FkVHlwZTogJ0JpbmFybnkga29kIHBvd8WCb2tpIChTaGVsbGNvZGUpIHcgcGFtacSZY2kgb3BlcmFjeWpuZWogeiBhdXRvbWF0eWN6bsSFIGRlLW9iZnVza2FjasSFLicsXG4gICAgICB2dWxuZXJhYmlsaXR5Q3ZlOiAnQ1ZFLTIwMjUtMDE5OSAoWmVyby1DbGljayBWaWRlbyBQcm9jZXNzaW5nIE1lbW9yeSBDb3JydXB0aW9uKScsXG4gICAgICBleHBsb2l0Q2hhaW46IFtcbiAgICAgICAgJzEuIE9kZWJyYW5pZSB6xYJvxZtsaXdlZ28gcGFraWV0dSBXZWJSVEMgYmV6IMW8YWRuZWogaW50ZXJha2NqaSB1xbx5dGtvd25pa2EuJyxcbiAgICAgICAgJzIuIFd5a29uYW5pZSBzaGVsbGNvZGUgdyBwcm9jZXNpZSBwcnplZ2zEhWRhcmtpIGx1YiBrb211bmlrYXRvcmEuJyxcbiAgICAgICAgJzMuIEVza2FsYWNqYSB1cHJhd25pZcWEIGRvIHBvemlvbXUgTlQgQVVUSE9SSVRZXFxcXFNZU1RFTS4nLFxuICAgICAgICAnNC4gWmFnbmllxbxkxbxlbmllIG1vZHXFgnUgbmFrxYJhZGtpIHN6cGllZ293c2tpZWogdyBEV00uJ1xuICAgICAgXVxuICAgIH0sXG4gICAgbmV1dHJhbGl6YXRpb25EZXRhaWxzOiB7XG4gICAgICBtZXRob2ROYW1lOiAnUmVzdGFydCBVc8WCdWdpIERXTSArIE9jenlzemN6ZW5pZSBQYW1pxJljaSBXc3DDs8WCZHppZWxvbmVqICsgVWLDs2ogU2hlbGxjb2RlJyxcbiAgICAgIHNsYXVnaHRlck1lY2hhbmlzbTogJ1d5bXVzem9ueSBrb250cm9sb3dhbnkgcmVzdGFydCBwcm9jZXN1IERXTSwgb2RjacSZY2llIHrFgm/Fm2xpd3ljaCBrYW5hxYLDs3cgSVBDIGkgem5pc3pjemVuaWUgd3N0cnp5a25pxJl0ZWdvIGtvZHUgdyBwYW1pxJljaSBSQU0uJyxcbiAgICAgIGV4ZWN1dGlvblN0ZXBzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdGVwOiAxLFxuICAgICAgICAgIGFjdGlvbjogJ1d5a3J5Y2llIHpuaWVrc3p0YcWCY29ueWNoIGhha8OzdyByZW5kZXJvd2FuaWEgdyBEV00nLFxuICAgICAgICAgIHRhcmdldEFwaTogJ0R3bUdldENvbXBvc2l0aW9uVGltaW5nSW5mbycsXG4gICAgICAgICAgcmVzdWx0OiAnV3lrcnl0byBhbm9tYWxpxJkgdyBrb21wb3p5Y2ppIHB1bHBpdHUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwMidcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN0ZXA6IDIsXG4gICAgICAgICAgYWN0aW9uOiAnV3ltdXN6b25lIHVuaWV3YcW8bmllbmllIHNrb21wcm9taXRvd2FuZWdvIHByb2Nlc3UgZHdtLmV4ZScsXG4gICAgICAgICAgdGFyZ2V0QXBpOiAna2VybmVsMzIuVGVybWluYXRlUHJvY2VzcyhoRHdtLCAwKScsXG4gICAgICAgICAgcmVzdWx0OiAnRFdNIHpyZXN0YXJ0b3dhbnkgcHJ6ZXogd2lubG9nb24gdyBzdGFuaWUgY3p5c3R5bScsXG4gICAgICAgICAgdGltZXN0YW1wOiAnMDA6MDAuMDA1J1xuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3RlcDogMyxcbiAgICAgICAgICBhY3Rpb246ICdaYW1rbmnEmWNpZSB3c3p5c3RraWNoIHBvZGF0bnljaCBnbmlhemQgV2ViUlRDJyxcbiAgICAgICAgICB0YXJnZXRBcGk6ICdXU0FJb2N0bCAoU0lPX0ZMVVNIKScsXG4gICAgICAgICAgcmVzdWx0OiAnR25pYXpkYSBwb2RzxYJ1Y2hvd2UgenJlc2V0b3dhbmUnLFxuICAgICAgICAgIHRpbWVzdGFtcDogJzAwOjAwLjAwOSdcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHF1YXJhbnRpbmVQcm9vZjogJ1N0YXR1czogMTAwJSBaTklTWkNaT05ZIHwgRFdNIHpyZWdlbmVyb3dhbnkgfCBaZXJvIHd5Y2lla3UgZGFueWNoJyxcbiAgICAgIHB5dGhvbktpbGxTbmlwcGV0OiBgaW1wb3J0IG9zLCBwc3V0aWxcblxuZGVmIHB1cmdlX3BlZ2FzdXNfb3ZlcmxheSgpOlxuICAgICMgUmVzdGFydCBEZXNrdG9wIFdpbmRvdyBNYW5hZ2VyIHcgY2VsdSB1c3VuacSZY2lhIHrFgm/Fm2xpd3ljaCBiaWJsaW90ZWtcbiAgICBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKFsncGlkJywgJ25hbWUnXSk6XG4gICAgICAgIGlmIHAuaW5mb1snbmFtZSddIGFuZCAncGVnYXN1cycgaW4gcC5pbmZvWyduYW1lJ10ubG93ZXIoKTpcbiAgICAgICAgICAgIHAua2lsbCgpXG4gICAgb3Muc3lzdGVtKCd0YXNra2lsbCAvZiAvaW0gZHdtLmV4ZSA+bnVsIDI+JjEnKVxuYFxuICAgIH1cbiAgfVxuXTtcbiJdLCJtYXBwaW5ncyI6IkFBRU8sYUFBTSw4QkFBbUQ7QUFBQSxFQUM5RDtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsVUFBVSxDQUFDLFdBQVcsU0FBUyxPQUFPO0FBQUEsSUFDdEMsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IscUJBQXFCO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFZLENBQUMsNkJBQTZCLDhCQUE4QixxQkFBcUIsZ0JBQWdCO0FBQUEsSUFDL0c7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLE1BQ2YsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2Isa0JBQWtCO0FBQUEsTUFDbEIsY0FBYztBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsTUFDckIsWUFBWTtBQUFBLE1BQ1osb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsUUFDZDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBY3JCO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLElBQUk7QUFBQSxJQUNKLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFVBQVU7QUFBQSxJQUNWLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxJQUNSLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxJQUNmLFVBQVUsQ0FBQyxXQUFXLFNBQVMsT0FBTztBQUFBLElBQ3RDLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLHFCQUFxQjtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGtCQUFrQjtBQUFBLFFBQ2hCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWSxDQUFDLCtCQUErQix1QkFBdUIsc0NBQXNDLDhDQUE4QztBQUFBLElBQ3pKO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLE1BQ3JCLFlBQVk7QUFBQSxNQUNaLG9CQUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQXNCckI7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsVUFBVSxDQUFDLFNBQVM7QUFBQSxJQUNwQixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVksQ0FBQyxzQkFBc0Isa0JBQWtCLHNCQUFzQixvQkFBb0IsbUNBQW1DO0FBQUEsSUFDcEk7QUFBQSxJQUNBLGlCQUFpQjtBQUFBLE1BQ2YsU0FBUztBQUFBLE1BQ1QsUUFBUTtBQUFBLE1BQ1IsYUFBYTtBQUFBLE1BQ2Isa0JBQWtCO0FBQUEsTUFDbEIsY0FBYztBQUFBLFFBQ1o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsdUJBQXVCO0FBQUEsTUFDckIsWUFBWTtBQUFBLE1BQ1osb0JBQW9CO0FBQUEsTUFDcEIsZ0JBQWdCO0FBQUEsUUFDZDtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQWFyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixVQUFVLENBQUMsU0FBUztBQUFBLElBQ3BCLFlBQVk7QUFBQSxJQUNaLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLHFCQUFxQjtBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGtCQUFrQjtBQUFBLFFBQ2hCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWSxDQUFDLCtCQUErQixtQkFBbUIseUJBQXlCLG9CQUFvQixtQkFBbUI7QUFBQSxJQUNqSTtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixrQkFBa0I7QUFBQSxNQUNsQixjQUFjO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxNQUNyQixZQUFZO0FBQUEsTUFDWixvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQSxRQUNkO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLG1CQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVlyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixVQUFVLENBQUMsV0FBVyxPQUFPO0FBQUEsSUFDN0IsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IscUJBQXFCO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFZLENBQUMsa0JBQWtCLHlCQUF5QixrQkFBa0IsZ0JBQWdCLGNBQWM7QUFBQSxJQUMxRztBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixrQkFBa0I7QUFBQSxNQUNsQixjQUFjO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxNQUNyQixZQUFZO0FBQUEsTUFDWixvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQSxRQUNkO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLG1CQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixVQUFVLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUN0QyxZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVksQ0FBQyw0QkFBNEIsdUJBQXVCLHdCQUF3Qix3QkFBd0I7QUFBQSxJQUNsSDtBQUFBLElBQ0EsaUJBQWlCO0FBQUEsTUFDZixTQUFTO0FBQUEsTUFDVCxRQUFRO0FBQUEsTUFDUixhQUFhO0FBQUEsTUFDYixrQkFBa0I7QUFBQSxNQUNsQixjQUFjO0FBQUEsUUFDWjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSx1QkFBdUI7QUFBQSxNQUNyQixZQUFZO0FBQUEsTUFDWixvQkFBb0I7QUFBQSxNQUNwQixnQkFBZ0I7QUFBQSxRQUNkO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQU9yQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixVQUFVLENBQUMsV0FBVyxPQUFPO0FBQUEsSUFDN0IsWUFBWTtBQUFBLElBQ1osU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IscUJBQXFCO0FBQUEsTUFDbkIsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsUUFDaEI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxZQUFZLENBQUMsd0JBQXdCLGtCQUFrQixvQkFBb0IsYUFBYTtBQUFBLElBQzFGO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLE1BQ3JCLFlBQVk7QUFBQSxNQUNaLG9CQUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLG1CQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRckI7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsSUFBSTtBQUFBLElBQ0osTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLElBQ1AsVUFBVTtBQUFBLElBQ1YsVUFBVTtBQUFBLElBQ1YsUUFBUTtBQUFBLElBQ1IsY0FBYztBQUFBLElBQ2QsZUFBZTtBQUFBLElBQ2YsVUFBVSxDQUFDLFNBQVM7QUFBQSxJQUNwQixZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVksQ0FBQyxrQkFBa0IsYUFBYSxvQkFBb0IsWUFBWTtBQUFBLElBQzlFO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLE1BQ3JCLFlBQVk7QUFBQSxNQUNaLG9CQUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsTUFDakIsbUJBQW1CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVFyQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxJQUFJO0FBQUEsSUFDSixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsSUFDUCxVQUFVO0FBQUEsSUFDVixVQUFVO0FBQUEsSUFDVixRQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxlQUFlO0FBQUEsSUFDZixVQUFVLENBQUMsV0FBVyxTQUFTLE9BQU87QUFBQSxJQUN0QyxZQUFZO0FBQUEsSUFDWixTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixxQkFBcUI7QUFBQSxNQUNuQixPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxRQUNoQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFlBQVksQ0FBQyx3QkFBd0IsbUNBQW1DLHNCQUFzQjtBQUFBLElBQ2hHO0FBQUEsSUFDQSxpQkFBaUI7QUFBQSxNQUNmLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxNQUNSLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGNBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLE1BQ3JCLFlBQVk7QUFBQSxNQUNaLG9CQUFvQjtBQUFBLE1BQ3BCLGdCQUFnQjtBQUFBLFFBQ2Q7QUFBQSxVQUNFLE1BQU07QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFVBQ1gsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsVUFDWCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGlCQUFpQjtBQUFBLE1BQ2pCLG1CQUFtQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQVNyQjtBQUFBLEVBQ0Y7QUFDRjsiLCJuYW1lcyI6W119