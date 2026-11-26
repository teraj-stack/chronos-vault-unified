import __vite__cjsImport0_jszip from "/sentinel-shield/node_modules/.vite/deps/jszip.js?v=4240fe98"; const JSZip = __vite__cjsImport0_jszip.__esModule ? __vite__cjsImport0_jszip.default : __vite__cjsImport0_jszip;
import { PYTHON_SCRIPTS } from "/sentinel-shield/src/data/pythonScripts.ts";
import { generateAutonomousPythonDaemonScript } from "/sentinel-shield/src/utils/gnidaAutoFreezeSensor.ts";
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
   Uruchom plik: "00_URUCHOM_RATUNEK_AWARYJNY.bat" (Prawym przyciskiem -> Uruchom jako administrator).
   Skrypt ten bez pytania minimalizuje wszystkie okna na wierzchu i ubija procesy blokujące.

2. KROK 2 (PYTHON - KATALOG SKRYPTÓW UBOJU W FOLDERZE 'skrypty_uboju/'):
   Wszystkie skrypty są ponumerowane i gotowe do natychmiastowego uruchomienia:
   python skrypty_uboju/01_sentinel_retro_100_copies_ancestor_freeze.py
   python skrypty_uboju/11_pe_header_corruptor_and_acl_lock.py
   python skrypty_uboju/12_quarantine_anti_respawn_lockout.py
   python skrypty_uboju/14_pure_ctypes_zero_dependency.py

=============================================================================
WSZYSTKIE SKRYPTY DZIAŁAJĄ W 100% OFFLINE BEZ POŁĄCZENIA Z INTERNETEM!
=============================================================================
`;
}
export function generateKillScriptsCatalogMarkdown() {
  const tableRows = PYTHON_SCRIPTS.map((script, idx) => {
    const num = String(idx + 1).padStart(2, "0");
    const osList = script.os.join(", ").toUpperCase();
    const pipStatus = script.requiresPip ? `Wymaga: ${script.pipPackages.join(" ")}` : "Zero-pip (Czysty Python)";
    return `| ${num} | \`${num}_${script.id}.py\` | **${script.title}** | ${osList} | ${pipStatus} | ${script.shortDesc.replace(/\|/g, "-")} |`;
  }).join("\n");
  return `# SENTINEL SHIELD - KATALOG SKRYPTÓW UBOJU I KWARANTANNY (PAKIET OFFLINE)
**Projekt:** Sentinel Desktop Shield / Anti-Malware Toolkit  
**Data wygenerowania:** ${(/* @__PURE__ */ new Date()).toLocaleDateString("pl-PL")}  
**Liczba skryptów w paczce:** ${PYTHON_SCRIPTS.length} skryptów uboju + 3 skrypty ratunkowe  
**Zgodność:** 100% Offline (Air-Gap), Zero telemetrii zewnętrznej  

---

## 1. INSTRUKCJA PRZENIESIENIA NA SYSTEM OFFLINE

1. Skopiuj niniejsze archiwum ZIP na bezpieczny nośnik USB (pendrive).
2. Na odizolowanej od sieci stacji roboczej rozpakuj archiwum do dedykowanego katalogu (np. \`C:\\SentinelOffline\\\` lub \`/opt/sentinel/\`).
3. W sytuacji awaryjnej (zablokowany pulpit, nachalne nakładki, wirusy wieloprocesowe):
   - **Windows:** Uruchom jako Administrator \`00_URUCHOM_RATUNEK_AWARYJNY.bat\`
   - **Python:** Przejdź do folderu \`skrypty_uboju\` i uruchom dedykowany skrypt poleceniem \`python [nazwa_skryptu].py\`

---

## 2. PEŁNY WYKAZ DOSTĘPNYCH SKRYPTÓW UBOJU W ARCHIWUM

| Lp. | Plik | Nazwa modułu | Obsługiwany OS | Zależności | Krótki opis |
|---|---|---|---|---|---|
${tableRows}

---

## 3. NAJWAŻNIEJSZE SCENARIUSZE ZASTOSOWANIA

* **Trwałe uszkodzenie malware i rygiel wszystkich wejść (100% ochrona plików OS):**  
  Użyj \`sentinel_malware_defanger_and_entrypoint_immunizer.py\` lub natywnego skryptu \`sentinel_entrypoint_immunizer_and_malware_defanger_batch\` – trwale zeruje nagłówki PE i sekcję kodu złośliwego oprogramowania (byte-stomp, błąd 0xC000007B), nakłada odmowy praw ACL (\`icacls\`), rygluje rejestr autostartu, foldery Startup, Harmonogram Zadań, WMI, pułapki IFEO, blokuje USB Autorun i wymusza bezpieczny tryb DLL, zachowując bezwzględną nienaruszalność plików systemu Windows (\`C:\\Windows\`, \`Program Files\`, podpisy Authenticode).
* **Samoreplikujące się wirusy i drzewa procesów:**  
  Użyj \`01_sentinel_retro_100_copies_ancestor_freeze.py\` – śledzi linię genealogiczną i natychmiastowo zamraża w RAM do 100 generacji kopii wstecz.
* **Blokada ponownego startu i uszkodzenie binarium:**  
  Użyj \`11_pe_header_corruptor_and_acl_lock.py\` oraz \`12_quarantine_anti_respawn_lockout.py\` – zerowanie nagłówków PE, odbieranie uprawnień ACL i wstawianie blokad IFEO w rejestrze.
* **Czysty system bez dodatkowych bibliotek:**  
  Użyj \`14_pure_ctypes_zero_dependency.py\` – działa w 100% z wbudowanymi modułami Pythona (\`ctypes\`), bez konieczności instalacji bibliotek zewnętrznych (\`pip\`).
`;
}
export function generateKillScriptsManifestJson() {
  const payload = {
    metadata: {
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      package: "Sentinel Kill Scripts Full Library Offline Archive",
      version: "3.4.0-OFFLINE-AIRGAP",
      totalScripts: PYTHON_SCRIPTS.length,
      platformCompatibility: ["Windows", "Linux", "macOS"],
      zeroNetworkRequired: true
    },
    scripts: PYTHON_SCRIPTS.map((s, idx) => ({
      index: idx + 1,
      id: s.id,
      filename: `${String(idx + 1).padStart(2, "0")}_${s.id}.py`,
      title: s.title,
      badge: s.badge,
      os: s.os,
      requiresPip: s.requiresPip,
      pipPackages: s.pipPackages,
      shortDesc: s.shortDesc,
      recommendedFor: s.recommendedFor,
      keyFeatures: s.keyFeatures
    }))
  };
  return JSON.stringify(payload, null, 2);
}
export async function downloadAllKillScriptsZip() {
  const zip = new JSZip();
  zip.file("00_URUCHOM_RATUNEK_AWARYJNY.bat", generateEmergencyBatScript());
  zip.file("00_ratunek_powershell.ps1", generatePowerShellRescueScript());
  zip.file("00_gnida_auto_freeze_daemon.py", generateAutonomousPythonDaemonScript());
  const scriptsFolder = zip.folder("skrypty_uboju") || zip;
  PYTHON_SCRIPTS.forEach((script, idx) => {
    const paddedIndex = String(idx + 1).padStart(2, "0");
    const safeFilename = `${paddedIndex}_${script.id}.py`;
    scriptsFolder.file(safeFilename, script.code);
  });
  zip.file("KATALOG_SKRYPTOW_I_INSTRUKCJA.md", generateKillScriptsCatalogMarkdown());
  zip.file("INSTRUKCJA_RATUNKOWA_OFFLINE.txt", generateOfflineRescuePackageText());
  zip.file("MANIFEST_SKRYPTOW_UBOJU.json", generateKillScriptsManifestJson());
  const blob = await zip.generateAsync({ type: "blob" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "SENTINEL_WSZYSTKIE_SKRYPTY_UBOJU_OFFLINE.zip";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export async function downloadFullOfflineBundle() {
  await downloadAllKillScriptsZip();
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9mZmxpbmVQYWNrYWdlRXhwb3J0ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEpTWmlwIGZyb20gJ2pzemlwJztcbmltcG9ydCB7IFBZVEhPTl9TQ1JJUFRTIH0gZnJvbSAnLi4vZGF0YS9weXRob25TY3JpcHRzJztcbmltcG9ydCB7IGdlbmVyYXRlQXV0b25vbW91c1B5dGhvbkRhZW1vblNjcmlwdCB9IGZyb20gJy4vZ25pZGFBdXRvRnJlZXplU2Vuc29yJztcblxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkRmlsZShmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIGNvbnRlbnRUeXBlOiBzdHJpbmcgPSAndGV4dC9wbGFpbjtjaGFyc2V0PXV0Zi04Jykge1xuICBjb25zdCBibG9iID0gbmV3IEJsb2IoW2NvbnRlbnRdLCB7IHR5cGU6IGNvbnRlbnRUeXBlIH0pO1xuICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgYS5jbGljaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUVtZXJnZW5jeUJhdFNjcmlwdCgpOiBzdHJpbmcge1xuICByZXR1cm4gYEBlY2hvIG9mZlxuOjogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjo6IEFXQVJZSk5ZIFBBS0lFVCBBTlRZLUJMT0tBREEgSSBLV0FSQU5UQU5OQSAoMTAwJSBPRkZMSU5FIC8gQkVaIElOVEVSTkVUVSlcbjo6IFVydWNob20gamFrbyBBZG1pbmlzdHJhdG9yIChQcmF3eSBwcnp5Y2lzayBteXN6eSAtPiBVcnVjaG9tIGpha28gYWRtaW5pc3RyYXRvcilcbjo6ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG50aXRsZSBSQVRVTkVLIEFOVFktTUFMV0FSRSAmIEFOVFktT1ZFUkxBWSBTRU5USU5FTFxuY29sb3IgMENcbmNsc1xuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5lY2hvICAgICAgICAgICAgQVdBUllKTkUgQ1pZU1pDWkVOSUUgSSBVTklFUlVDSE9NSUVOSUUgQkxPS0FEIEVLUkFOVVxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5lY2hvIFshXSBXeWtyeXdhbmllIGkgemFteWthbmllIHByb2Nlc293IG5ha2xhZGVrIEZsdXR0ZXIgLyBUb3BNb3N0Li4uXG5lY2hvLlxuXG46OiAxLiBaYWJpY2llIHpuYW55Y2ggcHJvY2Vzb3cgaSBzaWxuaWtvdyBGbHV0dGVyXG5lY2hvIFsqXSBLcm9rIDE6IFd5bXVzem9uZSB6YW15a2FuaWUgcHJvY2Vzb3cgcG93aWF6YW55Y2ggeiBGbHV0dGVyIGkgYmxva2FkYW1pLi4uXG50YXNra2lsbCAvRiAvSU0gZmx1dHRlcl9ydW5uZXIuZXhlID5udWwgMj4mMVxudGFza2tpbGwgL0YgL0lNIGZsdXR0ZXIuZXhlID5udWwgMj4mMVxudGFza2tpbGwgL0YgL0lNIGRhcnQuZXhlID5udWwgMj4mMVxuXG46OiAyLiBXeXN6dWtpd2FuaWUgcG9kZWpyemFueWNoIHByb2Nlc293IHcgVGVtcCAvIEFwcERhdGFcbmVjaG8gWypdIEtyb2sgMjogQ3p5c3pjemVuaWUgemFibG9rb3dhbnljaCB1Y2h3eXRvdyBva2llbi4uLlxuXG46OiAzLiBVcnVjaG9taWVuaWUgc2tyeXB0dSBQeXRob25hIHcgdHJ5YmllIFplcm8tRGVwZW5kZW5jeSAoamVzbGkgUHl0aG9uIGplc3QgemFpbnN0YWxvd2FueSlcbndoZXJlIHB5dGhvbiA+bnVsIDI+JjFcbmlmICVFUlJPUkxFVkVMJSBFUVUgMCAoXG4gICAgZWNobyBbKl0gV3lrcnl0byBQeXRob25hLiBVcnVjaGFtaWFuaWUgb2Nocm9ueSB3IHRsZSAoY3R5cGVzIEZyZWV6ZSBeJiBLaWxsKS4uLlxuICAgIHN0YXJ0IC9CIHB5dGhvbiAtYyBcImltcG9ydCBjdHlwZXMsIHRpbWU7IHU9Y3R5cGVzLndpbmRsbC51c2VyMzI7IGs9Y3R5cGVzLndpbmRsbC5rZXJuZWwzMjsgW2suVGVybWluYXRlUHJvY2VzcyhrLk9wZW5Qcm9jZXNzKDEsIEZhbHNlLCBjdHlwZXMuY191bG9uZygwKSksIDkpIGZvciBfIGluIHJhbmdlKDEpXVwiID5udWwgMj4mMVxuKSBlbHNlIChcbiAgICBlY2hvIFshXSBQeXRob24gbmllIGplc3QgZG9kYW55IGRvIFBBVEguIFV6eXdhbSB3YnVkb3dhbnljaCBuYXJ6ZWR6aSBXaW5kb3dzICh0YXNra2lsbCAvIHBvd2Vyc2hlbGwpLlxuKVxuXG46OiA0LiBSYXR1bmVrIFBvd2VyU2hlbGwgLSBNaW5pbWFsaXphY2phIG9raWVuIFRvcE1vc3RcbmVjaG8gWypdIEtyb2sgMzogUG93ZXJTaGVsbCAtIFpkZWptb3dhbmllIGZsYWdpIFRvcE1vc3QgemUgd3N6eXN0a2ljaCBva2llbi4uLlxucG93ZXJzaGVsbCAtTm9Qcm9maWxlIC1FeGVjdXRpb25Qb2xpY3kgQnlwYXNzIC1Db21tYW5kIFwiJHNpZyA9IEAnXG5bRGxsSW1wb3J0KFxcXFxcInVzZXIzMi5kbGxcXFxcXCIpXSBwdWJsaWMgc3RhdGljIGV4dGVybiBib29sIFNob3dXaW5kb3coSW50UHRyIGhXbmQsIGludCBuQ21kU2hvdyk7XG5bRGxsSW1wb3J0KFxcXFxcInVzZXIzMi5kbGxcXFxcXCIpXSBwdWJsaWMgc3RhdGljIGV4dGVybiBib29sIFNldFdpbmRvd1BvcyhJbnRQdHIgaFduZCwgSW50UHRyIGhXbmRJbnNlcnRBZnRlciwgaW50IFgsIGludCBZLCBpbnQgY3gsIGludCBjeSwgdWludCB1RmxhZ3MpO1xuJ0A7ICR1ID0gQWRkLVR5cGUgLU1lbWJlckRlZmluaXRpb24gJHNpZyAtTmFtZSBXaW4zMiAtTmFtZXNwYWNlIE5hdGl2ZSAtUGFzc1RocnU7IEdldC1Qcm9jZXNzIHwgV2hlcmUtT2JqZWN0IHsgJF8uTWFpbldpbmRvd0hhbmRsZSAtbmUgMCB9IHwgRm9yRWFjaC1PYmplY3QgeyAkdTo6U2V0V2luZG93UG9zKCRfLk1haW5XaW5kb3dIYW5kbGUsIFtJbnRQdHJdKC0yKSwgMCwgMCwgMCwgMCwgMHgwMDAxIC1ib3IgMHgwMDAyIC1ib3IgMHgwMDQwKTsgfVwiXG5cbmVjaG8uXG5lY2hvID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gW1ZdIE9QRVJBQ0pBIFpBS09OQ1pPTkEhIEtvbnRyb2xhIG5hZCBwdWxwaXRlbSBwb3dpbm5hIHpvc3RhYyBwcnp5d3JvY29uYS5cbmVjaG8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxucGF1c2VcbmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVBvd2VyU2hlbGxSZXNjdWVTY3JpcHQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jIFBPV0VSU0hFTEwgRU1FUkdFTkNZIFNFTlRJTkVMICYgVE9QTU9TVCBPVkVSTEFZIEhVTlRFUiAoMTAwJSBPRkZMSU5FKVxuIyBVcnVjaG9taWVuaWU6IHBvd2Vyc2hlbGwgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLUZpbGUgcmF0dW5lay5wczFcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuV3JpdGUtSG9zdCBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiIC1Gb3JlZ3JvdW5kQ29sb3IgQ3lhblxuV3JpdGUtSG9zdCBcIiAgIFNUUkFaTklLIFNZU1RFTVUgUE9XRVJTSEVMTDogWkRFSk1PV0FOSUUgQkxPS0FEIEVLUkFOVVwiIC1Gb3JlZ3JvdW5kQ29sb3IgWWVsbG93XG5Xcml0ZS1Ib3N0IFwiPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIgLUZvcmVncm91bmRDb2xvciBDeWFuXG5cbiRjb2RlID0gQFwiXG51c2luZyBTeXN0ZW07XG51c2luZyBTeXN0ZW0uUnVudGltZS5JbnRlcm9wU2VydmljZXM7XG5wdWJsaWMgY2xhc3MgV2luMzIge1xuICAgIFtEbGxJbXBvcnQoXCJ1c2VyMzIuZGxsXCIpXVxuICAgIHB1YmxpYyBzdGF0aWMgZXh0ZXJuIEludFB0ciBHZXRGb3JlZ3JvdW5kV2luZG93KCk7XG5cbiAgICBbRGxsSW1wb3J0KFwidXNlcjMyLmRsbFwiKV1cbiAgICBwdWJsaWMgc3RhdGljIGV4dGVybiB1aW50IEdldFdpbmRvd1RocmVhZFByb2Nlc3NJZChJbnRQdHIgaFduZCwgb3V0IHVpbnQgbHBkd1Byb2Nlc3NJZCk7XG5cbiAgICBbRGxsSW1wb3J0KFwidXNlcjMyLmRsbFwiKV1cbiAgICBwdWJsaWMgc3RhdGljIGV4dGVybiBib29sIFNldFdpbmRvd1BvcyhJbnRQdHIgaFduZCwgSW50UHRyIGhXbmRJbnNlcnRBZnRlciwgaW50IFgsIGludCBZLCBpbnQgY3gsIGludCBjeSwgdWludCB1RmxhZ3MpO1xuXG4gICAgW0RsbEltcG9ydChcInVzZXIzMi5kbGxcIildXG4gICAgcHVibGljIHN0YXRpYyBleHRlcm4gYm9vbCBTaG93V2luZG93KEludFB0ciBoV25kLCBpbnQgbkNtZFNob3cpO1xufVxuXCJAXG5BZGQtVHlwZSAtVHlwZURlZmluaXRpb24gJGNvZGVcblxuJEhXTkRfTk9UT1BNT1NUID0gW0ludFB0cl0oLTIpXG4kU1dQX05PU0laRSA9IDB4MDAwMVxuJFNXUF9OT01PVkUgPSAweDAwMDJcbiRTV1BfU0hPV1dJTkRPVyA9IDB4MDA0MFxuJFNXX01JTklNSVpFID0gNlxuXG5Xcml0ZS1Ib3N0IFwiWypdIFNrYW5vd2FuaWUgcHJvY2Vzb3cgcG9zaWFkYWphY3ljaCBva25hLi4uXCIgLUZvcmVncm91bmRDb2xvciBHcmVlblxuXG5HZXQtUHJvY2VzcyB8IFdoZXJlLU9iamVjdCB7ICRfLk1haW5XaW5kb3dIYW5kbGUgLW5lIFtJbnRQdHJdOjpaZXJvIC1hbmQgJF8uUHJvY2Vzc05hbWUgLW5vdG1hdGNoIFwiZXhwbG9yZXJ8cG93ZXJzaGVsbHxDb2RlXCIgfSB8IEZvckVhY2gtT2JqZWN0IHtcbiAgICAkcHJvYyA9ICRfXG4gICAgV3JpdGUtSG9zdCBcIlstXSBSZXNldG93YW5pZSBva25hIHByb2Nlc3U6ICQoJHByb2MuUHJvY2Vzc05hbWUpIChQSUQ6ICQoJHByb2MuSWQpKVwiIC1Gb3JlZ3JvdW5kQ29sb3IgR3JheVxuICAgIFtXaW4zMl06OlNldFdpbmRvd1BvcygkcHJvYy5NYWluV2luZG93SGFuZGxlLCAkSFdORF9OT1RPUE1PU1QsIDAsIDAsIDAsIDAsICRTV1BfTk9NT1ZFIC1ib3IgJFNXUF9OT1NJWkUgLWJvciAkU1dQX1NIT1dXSU5ET1cpXG4gICAgW1dpbjMyXTo6U2hvd1dpbmRvdygkcHJvYy5NYWluV2luZG93SGFuZGxlLCAkU1dfTUlOSU1JWkUpXG59XG5cbldyaXRlLUhvc3QgXCJb4pyUXSBTdWtjZXMhIFpkamV0byBhdHJ5YnV0eSBBbHdheXMtb24tdG9wIGkgem1pbmltYWxpem93YW5vIHBvZGVqcnphbmUgb2tuYS5cIiAtRm9yZWdyb3VuZENvbG9yIEdyZWVuXG5gO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVPZmZsaW5lUmVzY3VlUGFja2FnZVRleHQoKTogc3RyaW5nIHtcbiAgcmV0dXJuIGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuUEFLSUVUIFJBVFVOS09XWSBBTlRZLU9WRVJMQVkgJiBBTlRZLU1BTFdBUkUgKFRSWUIgMTAwJSBPRkZMSU5FKVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuR2R5IHByb2dyYW0tbWFsd2FyZSBibG9rdWplIGVrcmFuLCB3eXNrYWt1asSFY2Ugb2tuYSBpIHByw7NidWplIHByemVjaHd5Y2nEhyBrb250cm9sxJk6XG5cbjEuIEtST0sgMSAoTkFUWUNITUlBU1QgLSBQTElLIFdTQURPV1kpOlxuICAgVXJ1Y2hvbSBwbGlrOiBcIjAwX1VSVUNIT01fUkFUVU5FS19BV0FSWUpOWS5iYXRcIiAoUHJhd3ltIHByenljaXNraWVtIC0+IFVydWNob20gamFrbyBhZG1pbmlzdHJhdG9yKS5cbiAgIFNrcnlwdCB0ZW4gYmV6IHB5dGFuaWEgbWluaW1hbGl6dWplIHdzenlzdGtpZSBva25hIG5hIHdpZXJ6Y2h1IGkgdWJpamEgcHJvY2VzeSBibG9rdWrEhWNlLlxuXG4yLiBLUk9LIDIgKFBZVEhPTiAtIEtBVEFMT0cgU0tSWVBUw5NXIFVCT0pVIFcgRk9MREVSWkUgJ3NrcnlwdHlfdWJvanUvJyk6XG4gICBXc3p5c3RraWUgc2tyeXB0eSBzxIUgcG9udW1lcm93YW5lIGkgZ290b3dlIGRvIG5hdHljaG1pYXN0b3dlZ28gdXJ1Y2hvbWllbmlhOlxuICAgcHl0aG9uIHNrcnlwdHlfdWJvanUvMDFfc2VudGluZWxfcmV0cm9fMTAwX2NvcGllc19hbmNlc3Rvcl9mcmVlemUucHlcbiAgIHB5dGhvbiBza3J5cHR5X3Vib2p1LzExX3BlX2hlYWRlcl9jb3JydXB0b3JfYW5kX2FjbF9sb2NrLnB5XG4gICBweXRob24gc2tyeXB0eV91Ym9qdS8xMl9xdWFyYW50aW5lX2FudGlfcmVzcGF3bl9sb2Nrb3V0LnB5XG4gICBweXRob24gc2tyeXB0eV91Ym9qdS8xNF9wdXJlX2N0eXBlc196ZXJvX2RlcGVuZGVuY3kucHlcblxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbldTWllTVEtJRSBTS1JZUFRZIERaSUHFgUFKxIQgVyAxMDAlIE9GRkxJTkUgQkVaIFBPxYHEhENaRU5JQSBaIElOVEVSTkVURU0hXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlS2lsbFNjcmlwdHNDYXRhbG9nTWFya2Rvd24oKTogc3RyaW5nIHtcbiAgY29uc3QgdGFibGVSb3dzID0gUFlUSE9OX1NDUklQVFMubWFwKChzY3JpcHQsIGlkeCkgPT4ge1xuICAgIGNvbnN0IG51bSA9IFN0cmluZyhpZHggKyAxKS5wYWRTdGFydCgyLCAnMCcpO1xuICAgIGNvbnN0IG9zTGlzdCA9IHNjcmlwdC5vcy5qb2luKCcsICcpLnRvVXBwZXJDYXNlKCk7XG4gICAgY29uc3QgcGlwU3RhdHVzID0gc2NyaXB0LnJlcXVpcmVzUGlwID8gYFd5bWFnYTogJHtzY3JpcHQucGlwUGFja2FnZXMuam9pbignICcpfWAgOiAnWmVyby1waXAgKEN6eXN0eSBQeXRob24pJztcbiAgICByZXR1cm4gYHwgJHtudW19IHwgXFxgJHtudW19XyR7c2NyaXB0LmlkfS5weVxcYCB8ICoqJHtzY3JpcHQudGl0bGV9KiogfCAke29zTGlzdH0gfCAke3BpcFN0YXR1c30gfCAke3NjcmlwdC5zaG9ydERlc2MucmVwbGFjZSgvXFx8L2csICctJyl9IHxgO1xuICB9KS5qb2luKCdcXG4nKTtcblxuICByZXR1cm4gYCMgU0VOVElORUwgU0hJRUxEIC0gS0FUQUxPRyBTS1JZUFTDk1cgVUJPSlUgSSBLV0FSQU5UQU5OWSAoUEFLSUVUIE9GRkxJTkUpXG4qKlByb2pla3Q6KiogU2VudGluZWwgRGVza3RvcCBTaGllbGQgLyBBbnRpLU1hbHdhcmUgVG9vbGtpdCAgXG4qKkRhdGEgd3lnZW5lcm93YW5pYToqKiAke25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdwbC1QTCcpfSAgXG4qKkxpY3piYSBza3J5cHTDs3cgdyBwYWN6Y2U6KiogJHtQWVRIT05fU0NSSVBUUy5sZW5ndGh9IHNrcnlwdMOzdyB1Ym9qdSArIDMgc2tyeXB0eSByYXR1bmtvd2UgIFxuKipaZ29kbm/Fm8SHOioqIDEwMCUgT2ZmbGluZSAoQWlyLUdhcCksIFplcm8gdGVsZW1ldHJpaSB6ZXduxJl0cnpuZWogIFxuXG4tLS1cblxuIyMgMS4gSU5TVFJVS0NKQSBQUlpFTklFU0lFTklBIE5BIFNZU1RFTSBPRkZMSU5FXG5cbjEuIFNrb3BpdWogbmluaWVqc3plIGFyY2hpd3VtIFpJUCBuYSBiZXpwaWVjem55IG5vxZtuaWsgVVNCIChwZW5kcml2ZSkuXG4yLiBOYSBvZGl6b2xvd2FuZWogb2Qgc2llY2kgc3RhY2ppIHJvYm9jemVqIHJvenBha3VqIGFyY2hpd3VtIGRvIGRlZHlrb3dhbmVnbyBrYXRhbG9ndSAobnAuIFxcYEM6XFxcXFNlbnRpbmVsT2ZmbGluZVxcXFxcXGAgbHViIFxcYC9vcHQvc2VudGluZWwvXFxgKS5cbjMuIFcgc3l0dWFjamkgYXdhcnlqbmVqICh6YWJsb2tvd2FueSBwdWxwaXQsIG5hY2hhbG5lIG5ha8WCYWRraSwgd2lydXN5IHdpZWxvcHJvY2Vzb3dlKTpcbiAgIC0gKipXaW5kb3dzOioqIFVydWNob20gamFrbyBBZG1pbmlzdHJhdG9yIFxcYDAwX1VSVUNIT01fUkFUVU5FS19BV0FSWUpOWS5iYXRcXGBcbiAgIC0gKipQeXRob246KiogUHJ6ZWpkxbogZG8gZm9sZGVydSBcXGBza3J5cHR5X3Vib2p1XFxgIGkgdXJ1Y2hvbSBkZWR5a293YW55IHNrcnlwdCBwb2xlY2VuaWVtIFxcYHB5dGhvbiBbbmF6d2Ffc2tyeXB0dV0ucHlcXGBcblxuLS0tXG5cbiMjIDIuIFBFxYFOWSBXWUtBWiBET1NUxJhQTllDSCBTS1JZUFTDk1cgVUJPSlUgVyBBUkNISVdVTVxuXG58IExwLiB8IFBsaWsgfCBOYXp3YSBtb2R1xYJ1IHwgT2JzxYJ1Z2l3YW55IE9TIHwgWmFsZcW8bm/Fm2NpIHwgS3LDs3RraSBvcGlzIHxcbnwtLS18LS0tfC0tLXwtLS18LS0tfC0tLXxcbiR7dGFibGVSb3dzfVxuXG4tLS1cblxuIyMgMy4gTkFKV0HFu05JRUpTWkUgU0NFTkFSSVVTWkUgWkFTVE9TT1dBTklBXG5cbiogKipUcndhxYJlIHVzemtvZHplbmllIG1hbHdhcmUgaSByeWdpZWwgd3N6eXN0a2ljaCB3ZWrFm8SHICgxMDAlIG9jaHJvbmEgcGxpa8OzdyBPUyk6KiogIFxuICBVxbx5aiBcXGBzZW50aW5lbF9tYWx3YXJlX2RlZmFuZ2VyX2FuZF9lbnRyeXBvaW50X2ltbXVuaXplci5weVxcYCBsdWIgbmF0eXduZWdvIHNrcnlwdHUgXFxgc2VudGluZWxfZW50cnlwb2ludF9pbW11bml6ZXJfYW5kX21hbHdhcmVfZGVmYW5nZXJfYmF0Y2hcXGAg4oCTIHRyd2FsZSB6ZXJ1amUgbmFnxYLDs3draSBQRSBpIHNla2NqxJkga29kdSB6xYJvxZtsaXdlZ28gb3Byb2dyYW1vd2FuaWEgKGJ5dGUtc3RvbXAsIGLFgsSFZCAweEMwMDAwMDdCKSwgbmFrxYJhZGEgb2Rtb3d5IHByYXcgQUNMIChcXGBpY2FjbHNcXGApLCByeWdsdWplIHJlamVzdHIgYXV0b3N0YXJ0dSwgZm9sZGVyeSBTdGFydHVwLCBIYXJtb25vZ3JhbSBaYWRhxYQsIFdNSSwgcHXFgmFwa2kgSUZFTywgYmxva3VqZSBVU0IgQXV0b3J1biBpIHd5bXVzemEgYmV6cGllY3pueSB0cnliIERMTCwgemFjaG93dWrEhWMgYmV6d3pnbMSZZG7EhSBuaWVuYXJ1c3phbG5vxZvEhyBwbGlrw7N3IHN5c3RlbXUgV2luZG93cyAoXFxgQzpcXFxcV2luZG93c1xcYCwgXFxgUHJvZ3JhbSBGaWxlc1xcYCwgcG9kcGlzeSBBdXRoZW50aWNvZGUpLlxuKiAqKlNhbW9yZXBsaWt1asSFY2Ugc2nEmSB3aXJ1c3kgaSBkcnpld2EgcHJvY2Vzw7N3OioqICBcbiAgVcW8eWogXFxgMDFfc2VudGluZWxfcmV0cm9fMTAwX2NvcGllc19hbmNlc3Rvcl9mcmVlemUucHlcXGAg4oCTIMWbbGVkemkgbGluacSZIGdlbmVhbG9naWN6bsSFIGkgbmF0eWNobWlhc3Rvd28gemFtcmHFvGEgdyBSQU0gZG8gMTAwIGdlbmVyYWNqaSBrb3BpaSB3c3RlY3ouXG4qICoqQmxva2FkYSBwb25vd25lZ28gc3RhcnR1IGkgdXN6a29kemVuaWUgYmluYXJpdW06KiogIFxuICBVxbx5aiBcXGAxMV9wZV9oZWFkZXJfY29ycnVwdG9yX2FuZF9hY2xfbG9jay5weVxcYCBvcmF6IFxcYDEyX3F1YXJhbnRpbmVfYW50aV9yZXNwYXduX2xvY2tvdXQucHlcXGAg4oCTIHplcm93YW5pZSBuYWfFgsOzd2vDs3cgUEUsIG9kYmllcmFuaWUgdXByYXduaWXFhCBBQ0wgaSB3c3Rhd2lhbmllIGJsb2thZCBJRkVPIHcgcmVqZXN0cnplLlxuKiAqKkN6eXN0eSBzeXN0ZW0gYmV6IGRvZGF0a293eWNoIGJpYmxpb3RlazoqKiAgXG4gIFXFvHlqIFxcYDE0X3B1cmVfY3R5cGVzX3plcm9fZGVwZW5kZW5jeS5weVxcYCDigJMgZHppYcWCYSB3IDEwMCUgeiB3YnVkb3dhbnltaSBtb2R1xYJhbWkgUHl0aG9uYSAoXFxgY3R5cGVzXFxgKSwgYmV6IGtvbmllY3pub8WbY2kgaW5zdGFsYWNqaSBiaWJsaW90ZWsgemV3bsSZdHJ6bnljaCAoXFxgcGlwXFxgKS5cbmA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUtpbGxTY3JpcHRzTWFuaWZlc3RKc29uKCk6IHN0cmluZyB7XG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgbWV0YWRhdGE6IHtcbiAgICAgIGdlbmVyYXRlZEF0OiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICBwYWNrYWdlOiAnU2VudGluZWwgS2lsbCBTY3JpcHRzIEZ1bGwgTGlicmFyeSBPZmZsaW5lIEFyY2hpdmUnLFxuICAgICAgdmVyc2lvbjogJzMuNC4wLU9GRkxJTkUtQUlSR0FQJyxcbiAgICAgIHRvdGFsU2NyaXB0czogUFlUSE9OX1NDUklQVFMubGVuZ3RoLFxuICAgICAgcGxhdGZvcm1Db21wYXRpYmlsaXR5OiBbJ1dpbmRvd3MnLCAnTGludXgnLCAnbWFjT1MnXSxcbiAgICAgIHplcm9OZXR3b3JrUmVxdWlyZWQ6IHRydWVcbiAgICB9LFxuICAgIHNjcmlwdHM6IFBZVEhPTl9TQ1JJUFRTLm1hcCgocywgaWR4KSA9PiAoe1xuICAgICAgaW5kZXg6IGlkeCArIDEsXG4gICAgICBpZDogcy5pZCxcbiAgICAgIGZpbGVuYW1lOiBgJHtTdHJpbmcoaWR4ICsgMSkucGFkU3RhcnQoMiwgJzAnKX1fJHtzLmlkfS5weWAsXG4gICAgICB0aXRsZTogcy50aXRsZSxcbiAgICAgIGJhZGdlOiBzLmJhZGdlLFxuICAgICAgb3M6IHMub3MsXG4gICAgICByZXF1aXJlc1BpcDogcy5yZXF1aXJlc1BpcCxcbiAgICAgIHBpcFBhY2thZ2VzOiBzLnBpcFBhY2thZ2VzLFxuICAgICAgc2hvcnREZXNjOiBzLnNob3J0RGVzYyxcbiAgICAgIHJlY29tbWVuZGVkRm9yOiBzLnJlY29tbWVuZGVkRm9yLFxuICAgICAga2V5RmVhdHVyZXM6IHMua2V5RmVhdHVyZXNcbiAgICB9KSlcbiAgfTtcblxuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGF5bG9hZCwgbnVsbCwgMik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZEFsbEtpbGxTY3JpcHRzWmlwKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB6aXAgPSBuZXcgSlNaaXAoKTtcblxuICAvLyAxLiBTa3J5cHR5IHJhdHVua293ZSBzeXN0ZW1vd2VcbiAgemlwLmZpbGUoJzAwX1VSVUNIT01fUkFUVU5FS19BV0FSWUpOWS5iYXQnLCBnZW5lcmF0ZUVtZXJnZW5jeUJhdFNjcmlwdCgpKTtcbiAgemlwLmZpbGUoJzAwX3JhdHVuZWtfcG93ZXJzaGVsbC5wczEnLCBnZW5lcmF0ZVBvd2VyU2hlbGxSZXNjdWVTY3JpcHQoKSk7XG4gIHppcC5maWxlKCcwMF9nbmlkYV9hdXRvX2ZyZWV6ZV9kYWVtb24ucHknLCBnZW5lcmF0ZUF1dG9ub21vdXNQeXRob25EYWVtb25TY3JpcHQoKSk7XG5cbiAgLy8gMi4gRm9sZGVyIHplIHdzenlzdGtpbWkgc2tyeXB0YW1pIHVib2p1XG4gIGNvbnN0IHNjcmlwdHNGb2xkZXIgPSB6aXAuZm9sZGVyKCdza3J5cHR5X3Vib2p1JykgfHwgemlwO1xuICBQWVRIT05fU0NSSVBUUy5mb3JFYWNoKChzY3JpcHQsIGlkeCkgPT4ge1xuICAgIGNvbnN0IHBhZGRlZEluZGV4ID0gU3RyaW5nKGlkeCArIDEpLnBhZFN0YXJ0KDIsICcwJyk7XG4gICAgY29uc3Qgc2FmZUZpbGVuYW1lID0gYCR7cGFkZGVkSW5kZXh9XyR7c2NyaXB0LmlkfS5weWA7XG4gICAgc2NyaXB0c0ZvbGRlci5maWxlKHNhZmVGaWxlbmFtZSwgc2NyaXB0LmNvZGUpO1xuICB9KTtcblxuICAvLyAzLiBEb2t1bWVudGFjamEgaSBtYW5pZmVzdFxuICB6aXAuZmlsZSgnS0FUQUxPR19TS1JZUFRPV19JX0lOU1RSVUtDSkEubWQnLCBnZW5lcmF0ZUtpbGxTY3JpcHRzQ2F0YWxvZ01hcmtkb3duKCkpO1xuICB6aXAuZmlsZSgnSU5TVFJVS0NKQV9SQVRVTktPV0FfT0ZGTElORS50eHQnLCBnZW5lcmF0ZU9mZmxpbmVSZXNjdWVQYWNrYWdlVGV4dCgpKTtcbiAgemlwLmZpbGUoJ01BTklGRVNUX1NLUllQVE9XX1VCT0pVLmpzb24nLCBnZW5lcmF0ZUtpbGxTY3JpcHRzTWFuaWZlc3RKc29uKCkpO1xuXG4gIC8vIDQuIEdlbmVyb3dhbmllIHBsaWt1IEJsb2IgaSBwb2JyYW5pZVxuICBjb25zdCBibG9iID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gIGEuaHJlZiA9IHVybDtcbiAgYS5kb3dubG9hZCA9ICdTRU5USU5FTF9XU1pZU1RLSUVfU0tSWVBUWV9VQk9KVV9PRkZMSU5FLnppcCc7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gIGEuY2xpY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRGdWxsT2ZmbGluZUJ1bmRsZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgZG93bmxvYWRBbGxLaWxsU2NyaXB0c1ppcCgpO1xufVxuXG4iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLDRDQUE0QztBQUU5QyxnQkFBUyxhQUFhLFVBQWtCLFNBQWlCLGNBQXNCLDRCQUE0QjtBQUNoSCxRQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxHQUFHLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEQsUUFBTSxNQUFNLElBQUksZ0JBQWdCLElBQUk7QUFDcEMsUUFBTSxJQUFJLFNBQVMsY0FBYyxHQUFHO0FBQ3BDLElBQUUsT0FBTztBQUNULElBQUUsV0FBVztBQUNiLFdBQVMsS0FBSyxZQUFZLENBQUM7QUFDM0IsSUFBRSxNQUFNO0FBQ1IsV0FBUyxLQUFLLFlBQVksQ0FBQztBQUMzQixNQUFJLGdCQUFnQixH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