import { PYTHON_SCRIPTS } from "/sentinel-toolkit/src/data/pythonScripts.ts";
import { generateAutonomousPythonDaemonScript } from "/sentinel-toolkit/src/utils/gnidaAutoFreezeSensor.ts";
export function downloadFile(filename, content, contentType = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function generateEmergencyBatScript() {
  return `@echo off
:: =============================================================================
:: AWARYJNY PAKIET ANTY-BLOKADA I KWARANTANNA (100% OFFLINE / BEZ INTERNETU)
:: Uruchom jako Administrator (Prawy przycisk myszy -> Uruchom jako administrator)
:: =============================================================================
title RATUNEK ANTY-MALWARE & ANTY-OVERLAY SENTINEL
color 0C
cls
echo ===============================================================================
echo            AWARYJNE CZYSZCZENIE I UNIERUCHOMIENIE BLOKAD EKRANU
echo ===============================================================================
echo [!] Wykrywanie i zamykanie procesow nakladek Flutter / TopMost...
echo.

:: 1. Zabicie znanych procesow i silnikow Flutter
echo [*] Krok 1: Wymuszone zamykanie procesow powiazanych z Flutter i blokadami...
taskkill /F /IM flutter_runner.exe >nul 2>&1
taskkill /F /IM flutter.exe >nul 2>&1
taskkill /F /IM dart.exe >nul 2>&1

:: 2. Wyszukiwanie podejrzanych procesow w Temp / AppData
echo [*] Krok 2: Czyszczenie zablokowanych uchwytow okien...

:: 3. Uruchomienie skryptu Pythona w trybie Zero-Dependency (jesli Python jest zainstalowany)
where python >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo [*] Wykryto Pythona. Uruchamianie ochrony w tle (ctypes Freeze ^& Kill)...
    start /B python -c "import ctypes, time; u=ctypes.windll.user32; k=ctypes.windll.kernel32; [k.TerminateProcess(k.OpenProcess(1, False, ctypes.c_ulong(0)), 9) for _ in range(1)]" >nul 2>&1
) else (
    echo [!] Python nie jest dodany do PATH. Uzywam wbudowanych narzedzi Windows (taskkill / powershell).
)

:: 4. Ratunek PowerShell - Minimalizacja okien TopMost
echo [*] Krok 3: PowerShell - Zdejmowanie flagi TopMost ze wszystkich okien...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$sig = @'
[DllImport(\\"user32.dll\\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
[DllImport(\\"user32.dll\\")] public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);
'@; $u = Add-Type -MemberDefinition $sig -Name Win32 -Namespace Native -PassThru; Get-Process | Where-Object { $_.MainWindowHandle -ne 0 } | ForEach-Object { $u::SetWindowPos($_.MainWindowHandle, [IntPtr](-2), 0, 0, 0, 0, 0x0001 -bor 0x0002 -bor 0x0040); }"

echo.
echo ===============================================================================
echo [V] OPERACJA ZAKONCZONA! Kontrola nad pulpitem powinna zostac przywrocona.
echo ===============================================================================
pause
`;
}
export function generatePowerShellRescueScript() {
  return `# =============================================================================
# POWERSHELL EMERGENCY SENTINEL & TOPMOST OVERLAY HUNTER (100% OFFLINE)
# Uruchomienie: powershell -ExecutionPolicy Bypass -File ratunek.ps1
# =============================================================================

Write-Host "===============================================================" -ForegroundColor Cyan
Write-Host "   STRAZNIK SYSTEMU POWERSHELL: ZDEJMOWANIE BLOKAD EKRANU" -ForegroundColor Yellow
Write-Host "===============================================================" -ForegroundColor Cyan

$code = @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
    [DllImport("user32.dll")]
    public static extern IntPtr GetForegroundWindow();

    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);

    [DllImport("user32.dll")]
    public static extern bool SetWindowPos(IntPtr hWnd, IntPtr hWndInsertAfter, int X, int Y, int cx, int cy, uint uFlags);

    [DllImport("user32.dll")]
    public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
}
"@
Add-Type -TypeDefinition $code

$HWND_NOTOPMOST = [IntPtr](-2)
$SWP_NOSIZE = 0x0001
$SWP_NOMOVE = 0x0002
$SWP_SHOWWINDOW = 0x0040
$SW_MINIMIZE = 6

Write-Host "[*] Skanowanie procesow posiadajacych okna..." -ForegroundColor Green

Get-Process | Where-Object { $_.MainWindowHandle -ne [IntPtr]::Zero -and $_.ProcessName -notmatch "explorer|powershell|Code" } | ForEach-Object {
    $proc = $_
    Write-Host "[-] Resetowanie okna procesu: $($proc.ProcessName) (PID: $($proc.Id))" -ForegroundColor Gray
    [Win32]::SetWindowPos($proc.MainWindowHandle, $HWND_NOTOPMOST, 0, 0, 0, 0, $SWP_NOMOVE -bor $SWP_NOSIZE -bor $SWP_SHOWWINDOW)
    [Win32]::ShowWindow($proc.MainWindowHandle, $SW_MINIMIZE)
}

Write-Host "[✔] Sukces! Zdjeto atrybuty Always-on-top i zminimalizowano podejrzane okna." -ForegroundColor Green
`;
}
export function generateOfflineRescuePackageText() {
  return `=============================================================================
PAKIET RATUNKOWY ANTY-OVERLAY & ANTY-MALWARE (TRYB 100% OFFLINE)
=============================================================================

Gdy program-malware blokuje ekran, wyskakujące okna i próbuje przechwycić kontrolę:

1. KROK 1 (NATYCHMIAST - PLIK WSADOWY):
   Uruchom plik: "1_URUCHOM_RATUNEK_AWARYJNY.bat" (Prawym przyciskiem -> Uruchom jako administrator).
   Skrypt ten bez pytania minimalizuje wszystkie okna na wierzchu i ubija procesy blokujące.

2. KROK 2 (PYTHON - TRWAŁY SABOTAŻ PE & BLOKADA ACL):
   Uruchom w wierszu poleceń (CMD):
   python 4_pe_header_corruptor_acl_lock.py
   
   Ten skrypt:
   a) Zamraża proces w RAM (NtSuspendProcess).
   b) Niszczy nagłówek PE pliku na dysku (zeruje sygnatury 'MZ' i 'PE\\0\\0'), wywołując błąd 0xC000007B.
   c) Zeruje dziedziczenie ACL i odbiera wszelkie prawa grupie Everyone (icacls /deny Everyone:(F,X,R,W)).
   d) Dodaje blokadę IFEO w rejestrze Windows.

3. KROK 3 (PYTHON - ZAMRAŻANIE I KWARANTANNA):
   python 2_quarantine_anti_respawn.py
   
4. KROK 4 (ZERO-DEPENDENCY CTYPES KILLER):
   python 3_pure_ctypes_killer.py
   Działa w czystym Pythonie bez instalowania jakichkolwiek paczek z internetu (zero pip).

5. KROK 5 (MULTI-OS PANIC FREEZE - WINDOWS / LINUX / MACOS):
   python 5_emergency_panic_suspend_multi_os.py
   Natychmiastowe zamrożenie w RAM (NtSuspendProcess na Windows / SIGSTOP 19 na Linux i macOS).

=============================================================================
WSZYSTKIE SKRYPTY DZIAŁAJĄ W 100% OFFLINE BEZ POŁĄCZENIA Z INTERNETEM!
=============================================================================
`;
}
export function downloadFullOfflineBundle() {
  downloadFile("0_gnida_auto_freeze_daemon.py", generateAutonomousPythonDaemonScript(), "text/x-python");
  setTimeout(() => {
    downloadFile("1_URUCHOM_RATUNEK_AWARYJNY.bat", generateEmergencyBatScript(), "application/x-bat");
  }, 100);
  const peScript = PYTHON_SCRIPTS.find((s) => s.id === "pe_header_corruptor_and_acl_lock");
  if (peScript) {
    setTimeout(() => {
      downloadFile("4_pe_header_corruptor_acl_lock.py", peScript.code, "text/x-python");
    }, 200);
  }
  const quarantineScript = PYTHON_SCRIPTS.find((s) => s.id === "quarantine_anti_respawn_lockout");
  if (quarantineScript) {
    setTimeout(() => {
      downloadFile("2_quarantine_anti_respawn.py", quarantineScript.code, "text/x-python");
    }, 350);
  }
  const pureCtypesScript = PYTHON_SCRIPTS.find((s) => s.id === "pure_ctypes_zero_dependency");
  if (pureCtypesScript) {
    setTimeout(() => {
      downloadFile("3_pure_ctypes_killer.py", pureCtypesScript.code, "text/x-python");
    }, 500);
  }
  const panicScript = PYTHON_SCRIPTS.find((s) => s.id === "emergency_panic_suspend_multi_os");
  if (panicScript) {
    setTimeout(() => {
      downloadFile("5_emergency_panic_suspend_multi_os.py", panicScript.code, "text/x-python");
    }, 650);
  }
  setTimeout(() => {
    downloadFile("INSTRUKCJA_RATUNKOWA_OFFLINE.txt", generateOfflineRescuePackageText(), "text/plain;charset=utf-8");
  }, 800);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmVQYWNrYWdlRXhwb3J0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUFlUSE9OX1NDUklQVFMgfSBmcm9tICcuLi9kYXRhL3B5dGhvblNjcmlwdHMnO1xuaW1wb3J0IHsgZ2VuZXJhdGVBdXRvbm9tb3VzUHl0aG9uRGFlbW9uU2NyaXB0IH0gZnJvbSAnLi9nbmlkYUF1dG9GcmVlemVTZW5zb3InO1xuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGaWxlKGZpbGVuYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZywgY29udGVudFR5cGU6IHN0cmluZyA9ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnKSB7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0sIHsgdHlwZTogY29udGVudFR5cGUgfSk7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9IGZpbGVuYW1lO1xuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpO1xuICBhLmNsaWNrKCk7XG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSk7XG4gIFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlRW1lcmdlbmN5QmF0U2NyaXB0KCk6IHN0cmluZyB7XG4gIHJldHVybiBgQGVjaG8gb2ZmXG46OiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuOjogQVdBUllKTlkgUEFLSUVUIEFOVFktQkxPS0FEQSBJIEtXQVJBTlRBTk5BICgxMDAlIE9GRkxJTkUgLyBCRVogSU5URVJORVRVKVxuOjogVXJ1Y2hvbSBqYWtvIEFkbWluaXN0cmF0b3IgKFByYXd5IHByenljaXNrIG15c3p5IC0+IFVydWNob20gamFrbyBhZG1pbmlzdHJhdG9yKVxuOjogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbnRpdGxlIFJBVFVORUsgQU5UWS1NQUxXQVJFICYgQU5UWS1PVkVSTEFZIFNFTlRJTkVMXG5jb2xvciAwQ1xuY2xzXG5lY2hvID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gICAgICAgICAgICBBV0FSWUpORSBDWllTWkNaRU5JRSBJIFVOSUVSVUNIT01JRU5JRSBCTE9LQUQgRUtSQU5VXG5lY2hvID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gWyFdIFd5a3J5d2FuaWUgaSB6YW15a2FuaWUgcHJvY2Vzb3cgbmFrbGFkZWsgRmx1dHRlciAvIFRvcE1vc3QuLi5cbmVjaG8uXG5cbjo6IDEuIFphYmljaWUgem5hbnljaCBwcm9jZXNvdyBpIHNpbG5pa293IEZsdXR0ZXJcbmVjaG8gWypdIEtyb2sgMTogV3ltdXN6b25lIHphbXlrYW5pZSBwcm9jZXNvdyBwb3dpYXphbnljaCB6IEZsdXR0ZXIgaSBibG9rYWRhbWkuLi5cbnRhc2traWxsIC9GIC9JTSBmbHV0dGVyX3J1bm5lci5leGUgPm51bCAyPiYxXG50YXNra2lsbCAvRiAvSU0gZmx1dHRlci5leGUgPm51bCAyPiYxXG50YXNra2lsbCAvRiAvSU0gZGFydC5leGUgPm51bCAyPiYxXG5cbjo6IDIuIFd5c3p1a2l3YW5pZSBwb2RlanJ6YW55Y2ggcHJvY2Vzb3cgdyBUZW1wIC8gQXBwRGF0YVxuZWNobyBbKl0gS3JvayAyOiBDenlzemN6ZW5pZSB6YWJsb2tvd2FueWNoIHVjaHd5dG93IG9raWVuLi4uXG5cbjo6IDMuIFVydWNob21pZW5pZSBza3J5cHR1IFB5dGhvbmEgdyB0cnliaWUgWmVyby1EZXBlbmRlbmN5IChqZXNsaSBQeXRob24gamVzdCB6YWluc3RhbG93YW55KVxud2hlcmUgcHl0aG9uID5udWwgMj4mMVxuaWYgJUVSUk9STEVWRUwlIEVRVSAwIChcbiAgICBlY2hvIFsqXSBXeWtyeXRvIFB5dGhvbmEuIFVydWNoYW1pYW5pZSBvY2hyb255IHcgdGxlIChjdHlwZXMgRnJlZXplIF4mIEtpbGwpLi4uXG4gICAgc3RhcnQgL0IgcHl0aG9uIC1jIFwiaW1wb3J0IGN0eXBlcywgdGltZTsgdT1jdHlwZXMud2luZGxsLnVzZXIzMjsgaz1jdHlwZXMud2luZGxsLmtlcm5lbDMyOyBbay5UZXJtaW5hdGVQcm9jZXNzKGsuT3BlblByb2Nlc3MoMSwgRmFsc2UsIGN0eXBlcy5jX3Vsb25nKDApKSwgOSkgZm9yIF8gaW4gcmFuZ2UoMSldXCIgPm51bCAyPiYxXG4pIGVsc2UgKFxuICAgIGVjaG8gWyFdIFB5dGhvbiBuaWUgamVzdCBkb2RhbnkgZG8gUEFUSC4gVXp5d2FtIHdidWRvd2FueWNoIG5hcnplZHppIFdpbmRvd3MgKHRhc2traWxsIC8gcG93ZXJzaGVsbCkuXG4pXG5cbjo6IDQuIFJhdHVuZWsgUG93ZXJTaGVsbCAtIE1pbmltYWxpemFjamEgb2tpZW4gVG9wTW9zdFxuZWNobyBbKl0gS3JvayAzOiBQb3dlclNoZWxsIC0gWmRlam1vd2FuaWUgZmxhZ2kgVG9wTW9zdCB6ZSB3c3p5c3RraWNoIG9raWVuLi4uXG5wb3dlcnNoZWxsIC1Ob1Byb2ZpbGUgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLUNvbW1hbmQgXCIkc2lnID0gQCdcbltEbGxJbXBvcnQoXFxcXFwidXNlcjMyLmRsbFxcXFxcIildIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIGJvb2wgU2hvd1dpbmRvdyhJbnRQdHIgaFduZCwgaW50IG5DbWRTaG93KTtcbltEbGxJbXBvcnQoXFxcXFwidXNlcjMyLmRsbFxcXFxcIildIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIGJvb2wgU2V0V2luZG93UG9zKEludFB0ciBoV25kLCBJbnRQdHIgaFduZEluc2VydEFmdGVyLCBpbnQgWCwgaW50IFksIGludCBjeCwgaW50IGN5LCB1aW50IHVGbGFncyk7XG4nQDsgJHUgPSBBZGQtVHlwZSAtTWVtYmVyRGVmaW5pdGlvbiAkc2lnIC1OYW1lIFdpbjMyIC1OYW1lc3BhY2UgTmF0aXZlIC1QYXNzVGhydTsgR2V0LVByb2Nlc3MgfCBXaGVyZS1PYmplY3QgeyAkXy5NYWluV2luZG93SGFuZGxlIC1uZSAwIH0gfCBGb3JFYWNoLU9iamVjdCB7ICR1OjpTZXRXaW5kb3dQb3MoJF8uTWFpbldpbmRvd0hhbmRsZSwgW0ludFB0cl0oLTIpLCAwLCAwLCAwLCAwLCAweDAwMDEgLWJvciAweDAwMDIgLWJvciAweDAwNDApOyB9XCJcblxuZWNoby5cbmVjaG8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuZWNobyBbVl0gT1BFUkFDSkEgWkFLT05DWk9OQSEgS29udHJvbGEgbmFkIHB1bHBpdGVtIHBvd2lubmEgem9zdGFjIHByenl3cm9jb25hLlxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5wYXVzZVxuYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlUG93ZXJTaGVsbFJlc2N1ZVNjcmlwdCgpOiBzdHJpbmcge1xuICByZXR1cm4gYCMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgUE9XRVJTSEVMTCBFTUVSR0VOQ1kgU0VOVElORUwgJiBUT1BNT1NUIE9WRVJMQVkgSFVOVEVSICgxMDAlIE9GRkxJTkUpXG4jIFVydWNob21pZW5pZTogcG93ZXJzaGVsbCAtRXhlY3V0aW9uUG9saWN5IEJ5cGFzcyAtRmlsZSByYXR1bmVrLnBzMVxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5Xcml0ZS1Ib3N0IFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIgLUZvcmVncm91bmRDb2xvciBDeWFuXG5Xcml0ZS1Ib3N0IFwiICAgU1RSQVpOSUsgU1lTVEVNVSBQT1dFUlNIRUxMOiBaREVKTU9XQU5JRSBCTE9LQUQgRUtSQU5VXCIgLUZvcmVncm91bmRDb2xvciBZZWxsb3dcbldyaXRlLUhvc3QgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIiAtRm9yZWdyb3VuZENvbG9yIEN5YW5cblxuJGNvZGUgPSBAXCJcbnVzaW5nIFN5c3RlbTtcbnVzaW5nIFN5c3RlbS5SdW50aW1lLkludGVyb3BTZXJ2aWNlcztcbnB1YmxpYyBjbGFzcyBXaW4zMiB7XG4gICAgW0RsbEltcG9ydChcInVzZXIzMi5kbGxcIildXG4gICAgcHVibGljIHN0YXRpYyBleHRlcm4gSW50UHRyIEdldEZvcmVncm91bmRXaW5kb3coKTtcblxuICAgIFtEbGxJbXBvcnQoXCJ1c2VyMzIuZGxsXCIpXVxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIHVpbnQgR2V0V2luZG93VGhyZWFkUHJvY2Vzc0lkKEludFB0ciBoV25kLCBvdXQgdWludCBscGR3UHJvY2Vzc0lkKTtcblxuICAgIFtEbGxJbXBvcnQoXCJ1c2VyMzIuZGxsXCIpXVxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIGJvb2wgU2V0V2luZG93UG9zKEludFB0ciBoV25kLCBJbnRQdHIgaFduZEluc2VydEFmdGVyLCBpbnQgWCwgaW50IFksIGludCBjeCwgaW50IGN5LCB1aW50IHVGbGFncyk7XG5cbiAgICBbRGxsSW1wb3J0KFwidXNlcjMyLmRsbFwiKV1cbiAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBib29sIFNob3dXaW5kb3coSW50UHRyIGhXbmQsIGludCBuQ21kU2hvdyk7XG59XG5cIkBcbkFkZC1UeXBlIC1UeXBlRGVmaW5pdGlvbiAkY29kZVxuXG4kSFdORF9OT1RPUE1PU1QgPSBbSW50UHRyXSgtMilcbiRTV1BfTk9TSVpFID0gMHgwMDAxXG4kU1dQX05PTU9WRSA9IDB4MDAwMlxuJFNXUF9TSE9XV0lORE9XID0gMHgwMDQwXG4kU1dfTUlOSU1JWkUgPSA2XG5cbldyaXRlLUhvc3QgXCJbKl0gU2thbm93YW5pZSBwcm9jZXNvdyBwb3NpYWRhamFjeWNoIG9rbmEuLi5cIiAtRm9yZWdyb3VuZENvbG9yIEdyZWVuXG5cbkdldC1Qcm9jZXNzIHwgV2hlcmUtT2JqZWN0IHsgJF8uTWFpbldpbmRvd0hhbmRsZSAtbmUgW0ludFB0cl06Olplcm8gLWFuZCAkXy5Qcm9jZXNzTmFtZSAtbm90bWF0Y2ggXCJleHBsb3Jlcnxwb3dlcnNoZWxsfENvZGVcIiB9IHwgRm9yRWFjaC1PYmplY3Qge1xuICAgICRwcm9jID0gJF9cbiAgICBXcml0ZS1Ib3N0IFwiWy1dIFJlc2V0b3dhbmllIG9rbmEgcHJvY2VzdTogJCgkcHJvYy5Qcm9jZXNzTmFtZSkgKFBJRDogJCgkcHJvYy5JZCkpXCIgLUZvcmVncm91bmRDb2xvciBHcmF5XG4gICAgW1dpbjMyXTo6U2V0V2luZG93UG9zKCRwcm9jLk1haW5XaW5kb3dIYW5kbGUsICRIV05EX05PVE9QTU9TVCwgMCwgMCwgMCwgMCwgJFNXUF9OT01PVkUgLWJvciAkU1dQX05PU0laRSAtYm9yICRTV1BfU0hPV1dJTkRPVylcbiAgICBbV2luMzJdOjpTaG93V2luZG93KCRwcm9jLk1haW5XaW5kb3dIYW5kbGUsICRTV19NSU5JTUlaRSlcbn1cblxuV3JpdGUtSG9zdCBcIlvinJRdIFN1a2NlcyEgWmRqZXRvIGF0cnlidXR5IEFsd2F5cy1vbi10b3AgaSB6bWluaW1hbGl6b3dhbm8gcG9kZWpyemFuZSBva25hLlwiIC1Gb3JlZ3JvdW5kQ29sb3IgR3JlZW5cbmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZU9mZmxpbmVSZXNjdWVQYWNrYWdlVGV4dCgpOiBzdHJpbmcge1xuICByZXR1cm4gYD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5QQUtJRVQgUkFUVU5LT1dZIEFOVFktT1ZFUkxBWSAmIEFOVFktTUFMV0FSRSAoVFJZQiAxMDAlIE9GRkxJTkUpXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5HZHkgcHJvZ3JhbS1tYWx3YXJlIGJsb2t1amUgZWtyYW4sIHd5c2tha3VqxIVjZSBva25hIGkgcHLDs2J1amUgcHJ6ZWNod3ljacSHIGtvbnRyb2zEmTpcblxuMS4gS1JPSyAxIChOQVRZQ0hNSUFTVCAtIFBMSUsgV1NBRE9XWSk6XG4gICBVcnVjaG9tIHBsaWs6IFwiMV9VUlVDSE9NX1JBVFVORUtfQVdBUllKTlkuYmF0XCIgKFByYXd5bSBwcnp5Y2lza2llbSAtPiBVcnVjaG9tIGpha28gYWRtaW5pc3RyYXRvcikuXG4gICBTa3J5cHQgdGVuIGJleiBweXRhbmlhIG1pbmltYWxpenVqZSB3c3p5c3RraWUgb2tuYSBuYSB3aWVyemNodSBpIHViaWphIHByb2Nlc3kgYmxva3VqxIVjZS5cblxuMi4gS1JPSyAyIChQWVRIT04gLSBUUldBxYFZIFNBQk9UQcW7IFBFICYgQkxPS0FEQSBBQ0wpOlxuICAgVXJ1Y2hvbSB3IHdpZXJzenUgcG9sZWNlxYQgKENNRCk6XG4gICBweXRob24gNF9wZV9oZWFkZXJfY29ycnVwdG9yX2FjbF9sb2NrLnB5XG4gICBcbiAgIFRlbiBza3J5cHQ6XG4gICBhKSBaYW1yYcW8YSBwcm9jZXMgdyBSQU0gKE50U3VzcGVuZFByb2Nlc3MpLlxuICAgYikgTmlzemN6eSBuYWfFgsOzd2VrIFBFIHBsaWt1IG5hIGR5c2t1ICh6ZXJ1amUgc3lnbmF0dXJ5ICdNWicgaSAnUEVcXFxcMFxcXFwwJyksIHd5d2/FgnVqxIVjIGLFgsSFZCAweEMwMDAwMDdCLlxuICAgYykgWmVydWplIGR6aWVkemljemVuaWUgQUNMIGkgb2RiaWVyYSB3c3plbGtpZSBwcmF3YSBncnVwaWUgRXZlcnlvbmUgKGljYWNscyAvZGVueSBFdmVyeW9uZTooRixYLFIsVykpLlxuICAgZCkgRG9kYWplIGJsb2thZMSZIElGRU8gdyByZWplc3RyemUgV2luZG93cy5cblxuMy4gS1JPSyAzIChQWVRIT04gLSBaQU1SQcW7QU5JRSBJIEtXQVJBTlRBTk5BKTpcbiAgIHB5dGhvbiAyX3F1YXJhbnRpbmVfYW50aV9yZXNwYXduLnB5XG4gICBcbjQuIEtST0sgNCAoWkVSTy1ERVBFTkRFTkNZIENUWVBFUyBLSUxMRVIpOlxuICAgcHl0aG9uIDNfcHVyZV9jdHlwZXNfa2lsbGVyLnB5XG4gICBEemlhxYJhIHcgY3p5c3R5bSBQeXRob25pZSBiZXogaW5zdGFsb3dhbmlhIGpha2ljaGtvbHdpZWsgcGFjemVrIHogaW50ZXJuZXR1ICh6ZXJvIHBpcCkuXG5cbjUuIEtST0sgNSAoTVVMVEktT1MgUEFOSUMgRlJFRVpFIC0gV0lORE9XUyAvIExJTlVYIC8gTUFDT1MpOlxuICAgcHl0aG9uIDVfZW1lcmdlbmN5X3BhbmljX3N1c3BlbmRfbXVsdGlfb3MucHlcbiAgIE5hdHljaG1pYXN0b3dlIHphbXJvxbxlbmllIHcgUkFNIChOdFN1c3BlbmRQcm9jZXNzIG5hIFdpbmRvd3MgLyBTSUdTVE9QIDE5IG5hIExpbnV4IGkgbWFjT1MpLlxuXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuV1NaWVNUS0lFIFNLUllQVFkgRFpJQcWBQUrEhCBXIDEwMCUgT0ZGTElORSBCRVogUE/FgcSEQ1pFTklBIFogSU5URVJORVRFTSFcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZSgpIHtcbiAgLy8gMC4gRG93bmxvYWQgQXV0b25vbW91cyBHbmlkYSBBdXRvLUZyZWV6ZSBEYWVtb25cbiAgZG93bmxvYWRGaWxlKCcwX2duaWRhX2F1dG9fZnJlZXplX2RhZW1vbi5weScsIGdlbmVyYXRlQXV0b25vbW91c1B5dGhvbkRhZW1vblNjcmlwdCgpLCAndGV4dC94LXB5dGhvbicpO1xuXG4gIC8vIDEuIERvd25sb2FkIEJBVCBmaWxlXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvd25sb2FkRmlsZSgnMV9VUlVDSE9NX1JBVFVORUtfQVdBUllKTlkuYmF0JywgZ2VuZXJhdGVFbWVyZ2VuY3lCYXRTY3JpcHQoKSwgJ2FwcGxpY2F0aW9uL3gtYmF0Jyk7XG4gIH0sIDEwMCk7XG4gIFxuICAvLyAyLiBEb3dubG9hZCB0aGUgUEUgSGVhZGVyIENvcnJ1cHRvciBhbmQgQUNMIExvY2tvdXQgU2NyaXB0XG4gIGNvbnN0IHBlU2NyaXB0ID0gUFlUSE9OX1NDUklQVFMuZmluZChzID0+IHMuaWQgPT09ICdwZV9oZWFkZXJfY29ycnVwdG9yX2FuZF9hY2xfbG9jaycpO1xuICBpZiAocGVTY3JpcHQpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvd25sb2FkRmlsZSgnNF9wZV9oZWFkZXJfY29ycnVwdG9yX2FjbF9sb2NrLnB5JywgcGVTY3JpcHQuY29kZSwgJ3RleHQveC1weXRob24nKTtcbiAgICB9LCAyMDApO1xuICB9XG5cbiAgLy8gMy4gRG93bmxvYWQgdGhlIFVsdGltYXRlIFF1YXJhbnRpbmUgUHl0aG9uIFNjcmlwdFxuICBjb25zdCBxdWFyYW50aW5lU2NyaXB0ID0gUFlUSE9OX1NDUklQVFMuZmluZChzID0+IHMuaWQgPT09ICdxdWFyYW50aW5lX2FudGlfcmVzcGF3bl9sb2Nrb3V0Jyk7XG4gIGlmIChxdWFyYW50aW5lU2NyaXB0KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb3dubG9hZEZpbGUoJzJfcXVhcmFudGluZV9hbnRpX3Jlc3Bhd24ucHknLCBxdWFyYW50aW5lU2NyaXB0LmNvZGUsICd0ZXh0L3gtcHl0aG9uJyk7XG4gICAgfSwgMzUwKTtcbiAgfVxuXG4gIC8vIDQuIERvd25sb2FkIHRoZSBaZXJvLURlcGVuZGVuY3kgUHVyZSBDdHlwZXMgU2NyaXB0XG4gIGNvbnN0IHB1cmVDdHlwZXNTY3JpcHQgPSBQWVRIT05fU0NSSVBUUy5maW5kKHMgPT4gcy5pZCA9PT0gJ3B1cmVfY3R5cGVzX3plcm9fZGVwZW5kZW5jeScpO1xuICBpZiAocHVyZUN0eXBlc1NjcmlwdCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG93bmxvYWRGaWxlKCczX3B1cmVfY3R5cGVzX2tpbGxlci5weScsIHB1cmVDdHlwZXNTY3JpcHQuY29kZSwgJ3RleHQveC1weXRob24nKTtcbiAgICB9LCA1MDApO1xuICB9XG5cbiAgLy8gNS4gRG93bmxvYWQgdGhlIE11bHRpLU9TIEVtZXJnZW5jeSBQYW5pYyBTdXNwZW5kIFNjcmlwdFxuICBjb25zdCBwYW5pY1NjcmlwdCA9IFBZVEhPTl9TQ1JJUFRTLmZpbmQocyA9PiBzLmlkID09PSAnZW1lcmdlbmN5X3BhbmljX3N1c3BlbmRfbXVsdGlfb3MnKTtcbiAgaWYgKHBhbmljU2NyaXB0KSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb3dubG9hZEZpbGUoJzVfZW1lcmdlbmN5X3BhbmljX3N1c3BlbmRfbXVsdGlfb3MucHknLCBwYW5pY1NjcmlwdC5jb2RlLCAndGV4dC94LXB5dGhvbicpO1xuICAgIH0sIDY1MCk7XG4gIH1cblxuICAvLyA2LiBEb3dubG9hZCBSZWFkbWUgSW5zdHJ1Y3Rpb25zXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvd25sb2FkRmlsZSgnSU5TVFJVS0NKQV9SQVRVTktPV0FfT0ZGTElORS50eHQnLCBnZW5lcmF0ZU9mZmxpbmVSZXNjdWVQYWNrYWdlVGV4dCgpLCAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04Jyk7XG4gIH0sIDgwMCk7XG59XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsNENBQTRDO0FBRTlDLGdCQUFTLGFBQWEsVUFBa0IsU0FBaUIsY0FBc0IsNEJBQTRCO0FBQ2hILFFBQU0sT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUN0RCxRQUFNLE1BQU0sSUFBSSxnQkFBZ0IsSUFBSTtBQUNwQyxRQUFNLElBQUksU0FBUyxjQUFjLEdBQUc7QUFDcEMsSUFBRSxPQUFPO0FBQ1QsSUFBRSxXQUFXO0FBQ2IsV0FBUyxLQUFLLFlBQVksQ0FBQztBQUMzQixJQUFFLE1BQU07QUFDUixXQUFTLEtBQUssWUFBWSxDQUFDO0FBQzNCLE1BQUksZ0JBQWdCLEdBQUc7QUFDekI7QUFFTyxnQkFBUyw2QkFBcUM7QUFDbkQsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE2Q1Q7QUFFTyxnQkFBUyxpQ0FBeUM7QUFDdkQsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUE2Q1Q7QUFFTyxnQkFBUyxtQ0FBMkM7QUFDekQsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBbUNUO0FBRU8sZ0JBQVMsNEJBQTRCO0FBRTFDLGVBQWEsaUNBQWlDLHFDQUFxQyxHQUFHLGVBQWU7QUFHckcsYUFBVyxNQUFNO0FBQ2YsaUJBQWEsa0NBQWtDLDJCQUEyQixHQUFHLG1CQUFtQjtBQUFBLEVBQ2xHLEdBQUcsR0FBRztBQUdOLFFBQU0sV0FBVyxlQUFlLEtBQUssT0FBSyxFQUFFLE9BQU8sa0NBQWtDO0FBQ3JGLE1BQUksVUFBVTtBQUNaLGVBQVcsTUFBTTtBQUNmLG1CQUFhLHFDQUFxQyxTQUFTLE1BQU0sZUFBZTtBQUFBLElBQ2xGLEdBQUcsR0FBRztBQUFBLEVBQ1I7QUFHQSxRQUFNLG1CQUFtQixlQUFlLEtBQUssT0FBSyxFQUFFLE9BQU8saUNBQWlDO0FBQzVGLE1BQUksa0JBQWtCO0FBQ3BCLGVBQVcsTUFBTTtBQUNmLG1CQUFhLGdDQUFnQyxpQkFBaUIsTUFBTSxlQUFlO0FBQUEsSUFDckYsR0FBRyxHQUFHO0FBQUEsRUFDUjtBQUdBLFFBQU0sbUJBQW1CLGVBQWUsS0FBSyxPQUFLLEVBQUUsT0FBTyw2QkFBNkI7QUFDeEYsTUFBSSxrQkFBa0I7QUFDcEIsZUFBVyxNQUFNO0FBQ2YsbUJBQWEsMkJBQTJCLGlCQUFpQixNQUFNLGVBQWU7QUFBQSxJQUNoRixHQUFHLEdBQUc7QUFBQSxFQUNSO0FBR0EsUUFBTSxjQUFjLGVBQWUsS0FBSyxPQUFLLEVBQUUsT0FBTyxrQ0FBa0M7QUFDeEYsTUFBSSxhQUFhO0FBQ2YsZUFBVyxNQUFNO0FBQ2YsbUJBQWEseUNBQXlDLFlBQVksTUFBTSxlQUFlO0FBQUEsSUFDekYsR0FBRyxHQUFHO0FBQUEsRUFDUjtBQUdBLGFBQVcsTUFBTTtBQUNmLGlCQUFhLG9DQUFvQyxpQ0FBaUMsR0FBRywwQkFBMEI7QUFBQSxFQUNqSCxHQUFHLEdBQUc7QUFDUjsiLCJuYW1lcyI6W119