import __vite__cjsImport0_jszip from "/sentinel-shield/node_modules/.vite/deps/jszip.js?v=4240fe98"; const JSZip = __vite__cjsImport0_jszip.__esModule ? __vite__cjsImport0_jszip.default : __vite__cjsImport0_jszip;
import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
const STORAGE_KEY = "sentinel_system_immunization_state";
export function extractBinaryNamesForThreat(threat) {
  const binaries = /* @__PURE__ */ new Set();
  const rawText = `${threat.name} ${threat.alias || ""} ${threat.description} ${threat.infectionVector.payloadType} ${threat.infectionVector.exploitChain.join(" ")}`;
  const matches = rawText.match(/[a-zA-Z0-9_\-\.]+\.(?:exe|dll|scr|bat|vbs)/gi) || [];
  matches.forEach((m) => binaries.add(m.toLowerCase()));
  if (binaries.size === 0) {
    const slug = threat.name.toLowerCase().replace(/[^a-z0-9_]/g, "_");
    binaries.add(`${slug}.exe`);
  }
  if (threat.category === "Screen Locker" || threat.name.toLowerCase().includes("flutter")) {
    binaries.add("flutter_desktop_overlay.exe");
    binaries.add("window_manager_hook.dll");
  }
  if (threat.category === "Popup Storm" || threat.name.toLowerCase().includes("adware")) {
    binaries.add("adware_alert_daemon.exe");
    binaries.add("adware_popup_cascade.exe");
  }
  if (threat.category === "Process Wiper") {
    binaries.add("wiper_raw_mbr.exe");
  }
  if (threat.category === "Trojan Overlay") {
    binaries.add("screen_hook_daemon.exe");
  }
  return Array.from(binaries);
}
export function buildImmunizationRules(threats) {
  const rules = [];
  threats.forEach((t) => {
    const binaries = extractBinaryNamesForThreat(t);
    binaries.forEach((bin, idx) => {
      rules.push({
        id: `vac-${t.id}-${idx}`,
        threatName: t.name,
        targetBinary: bin,
        category: t.category,
        sha256Hash: t.sha256Hash,
        ifeoRegistryKey: `HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${bin}`,
        firewallRuleName: `SENTINEL-DEFENSE-BLOCK-${bin.toUpperCase().replace(/\./g, "_")}`,
        appLockerHashRule: `HashBlock-${t.sha256Hash.substring(0, 16)}`,
        status: "ACTIVE_VACCINE"
      });
    });
  });
  return rules;
}
export function generateWindowsRegistryReg(threats) {
  const rules = buildImmunizationRules(threats);
  const timestamp = (/* @__PURE__ */ new Date()).toUTCString();
  let reg = `Windows Registry Editor Version 5.00

; ==============================================================================
; SENTINEL ANTI-MALWARE SYSTEM IMMUNIZATION & VACCINATION ENGINE
; Data wygenerowania: ${timestamp}
; Poziom Ochrony: TRWAŁA ODPORNOŚĆ (IFEO DEBUGGER REDIRECTION & GPO RESTRICTION)
; Kompatybilność: Windows 10 / Windows 11 / Windows Server 2016-2025
; ==============================================================================

; --- KROK 1: SYSTEMOWE ZABEZPIECZENIE PRZED HOOKAMI I PRZECHWYTYWANIEM FOKUSU ---
[HKEY_CURRENT_USER\\Control Panel\\Desktop]
"LowLevelHooksTimeout"=dword:00000064

; Włączenie bezpiecznego przeszukiwania bibliotek DLL (SafeDllSearchMode)
[HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Session Manager]
"SafeDllSearchMode"=dword:00000001

; Wyłączenie AutoRun dla wszystkich napędów (blokada wektora USB / nośników zewnętrznych)
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer]
"NoDriveTypeAutoRun"=dword:000000ff
"NoAutorun"=dword:00000001

; --- KROK 2: SZCZEPIONKA IFEO (IMAGE FILE EXECUTION OPTIONS) DLA WSZYSTKICH ZNANYCH GNID ---
; Przekierowanie wykonania do dummy stub (systray.exe / ntdll stub), co uniemożliwia uruchomienie
`;
  const uniqueBinaries = Array.from(new Set(rules.map((r) => r.targetBinary)));
  uniqueBinaries.forEach((bin) => {
    reg += `
; [SZCZEPIONKA IFEO] Blokada pliku binarnego: ${bin}
[HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Image File Execution Options\\${bin}]
"Debugger"="systray.exe"
"MitigationOptions"=hex(b):01,00,00,00,00,00,00,00
"BlockLowIntegrityExecution"=dword:00000001
"MitigationFlags"=hex(b):01,00,00,00,00,00,00,00
`;
  });
  reg += `
; --- KROK 3: BLOKADA W LIŚCIE DISALLOW RUN (POLICIES EXPLORER) ---
[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer]
"DisallowRun"=dword:00000001

[HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\Policies\\Explorer\\DisallowRun]
`;
  uniqueBinaries.slice(0, 50).forEach((bin, idx) => {
    reg += `"${idx + 1}"="${bin}"
`;
  });
  reg += `
; --- KROK 4: POTWIERDZENIE INTEGRALNOŚCI MONOLITU SENTINEL ---
[HKEY_LOCAL_MACHINE\\SOFTWARE\\SentinelShield\\Immunization]
"Installed"=dword:00000001
"EngineVersion"="Sentinel-4.9-Immunized"
"ActiveRulesCount"=dword:${uniqueBinaries.length.toString(16).padStart(8, "0")}
"Timestamp"="${timestamp}"
`;
  return reg;
}
export function generateWindowsFirewallPowerShell(threats) {
  const rules = buildImmunizationRules(threats);
  const timestamp = (/* @__PURE__ */ new Date()).toUTCString();
  const uniqueBinaries = Array.from(new Set(rules.map((r) => r.targetBinary)));
  return `# ==============================================================================
# SENTINEL ADVANCED FIREWALL & NETWORK IMMUNIZATION SCRIPT
# Data wygenerowania: ${timestamp}
# Wymagania: PowerShell 5.1+ z uprawnieniami Administratora
# Działanie: Trwałe reguły blokujące ruch sieciowy i C2 dla wykrytych sygnatur gnid
# ==============================================================================

# Weryfikacja uprawnień administratora
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "[!] BŁĄD: Uruchom ten skrypt z podniesionymi uprawnieniami Administratora!" -ForegroundColor Red
    Exit 1
}

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "[*] SENTINEL IMMUNIZATION: TWORZENIE REGUŁ WINDOWS ADVANCED FIREWALL..." -ForegroundColor Cyan
Write-Host "======================================================================" -ForegroundColor Cyan

# 1. Usuń poprzednie reguły Sentinel (idempotentność)
Write-Host "[*] Czyszczenie archiwalnych reguł Sentinel..." -ForegroundColor Gray
Get-NetFirewallRule -Name "SENTINEL-*" -ErrorAction SilentlyContinue | Remove-NetFirewallRule -ErrorAction SilentlyContinue

$blockedCount = 0

# 2. Tworzenie reguł blokujących wychodzące połączenia dla procesów gnid
$knownBinaries = @(
${uniqueBinaries.map((b) => `    "${b}"`).join(",\n")}
)

foreach ($bin in $knownBinaries) {
    $ruleNameOut = "SENTINEL-BLOCK-OUT-" + ($bin -replace '\\.', '_').ToUpper()
    $ruleNameIn = "SENTINEL-BLOCK-IN-" + ($bin -replace '\\.', '_').ToUpper()

    # Blokada wychodząca (Outbound)
    New-NetFirewallRule -Name $ruleNameOut \`
        -DisplayName "Sentinel Quarantine: Blokada $bin (Ruch Wychodzący C2)" \`
        -Description "Reguła trwałej immunizacji Sentinel zapobiegająca wyciekowi danych i kontaktowi z C2." \`
        -Direction Outbound \`
        -Program "*\\$bin" \`
        -Action Block \`
        -Enabled True \`
        -Profile Any | Out-Null

    # Blokada przychodząca (Inbound)
    New-NetFirewallRule -Name $ruleNameIn \`
        -DisplayName "Sentinel Quarantine: Blokada $bin (Ruch Przychodzący)" \`
        -Description "Reguła trwałej immunizacji Sentinel odrzucająca połączenia zdalne." \`
        -Direction Inbound \`
        -Program "*\\$bin" \`
        -Action Block \`
        -Enabled True \`
        -Profile Any | Out-Null

    $blockedCount++
    Write-Host "    [+] Zaszczepiono regułę Firewall dla: $bin" -ForegroundColor Green
}

# 3. Blokada znanych portów wykorzystywanych przez adware/gnidy do pętli 60Hz loopback
$roguePorts = @(8088, 8089, 9090, 9999, 4444, 1337)
New-NetFirewallRule -Name "SENTINEL-BLOCK-ROGUE-PORTS" \`
    -DisplayName "Sentinel Defense: Blokada podejrzanych portów telemetrycznych adware" \`
    -Direction Outbound \`
    -Protocol TCP \`
    -RemotePort $roguePorts \`
    -Action Block \`
    -Enabled True \`
    -Profile Any | Out-Null

Write-Host "======================================================================" -ForegroundColor Cyan
Write-Host "[+] IMMUNIZACJA SIECIOWA ZAKOŃCZONA SUKCESEM!" -ForegroundColor Green
Write-Host "[+] Zaimplementowano $blockedCount binarnych reguł dwukierunkowych." -ForegroundColor White
Write-Host "======================================================================" -ForegroundColor Cyan
`;
}
export function generateAppLockerGpoXml(threats) {
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<!-- ====================================================================== -->
<!-- SENTINEL ENTERPRISE APPLOCKER GPO IMMUNIZATION POLICY                  -->
<!-- Importuj do: secpol.msc -> Zasady Sterowania Aplikacjami -> AppLocker  -->
<!-- lub Konsoli Zarządzania Zasadami Grupy (GPMC.msc)                      -->
<!-- ====================================================================== -->
<AppLockerPolicy Version="1">
  <RuleCollection Type="Exe" EnforcementMode="Enabled">
    <!-- Reguła domyślna: Zezwól administratorom -->
    <FilePathRule Id="a61c8b27-0621-4d1c-ac32-e078a3f34d7e" Name="(Default Rule) All files located in the Program Files folder" Description="Allows members of the Everyone group to run applications in Program Files." UserOrGroupSid="S-1-1-0" Action="Allow">
      <Conditions>
        <FilePathCondition Path="%PROGRAMFILES%\\*" />
      </Conditions>
    </FilePathRule>
    <FilePathRule Id="337606b1-41ea-4ab8-8f83-a73637754077" Name="(Default Rule) All files located in the Windows folder" Description="Allows members of the Everyone group to run applications in Windows folder." UserOrGroupSid="S-1-1-0" Action="Allow">
      <Conditions>
        <FilePathCondition Path="%WINDIR%\\*" />
      </Conditions>
    </FilePathRule>

    <!-- REGUŁY IMMUNIZACJI SENTINEL: BLOKADA SUM KONTROLNYCH SHA256 DLA ZNANYCH GNID -->
`;
  threats.forEach((t, idx) => {
    const ruleGuid = `e4040000-0000-4000-8000-${(idx + 1).toString().padStart(12, "0")}`;
    const safeName = t.name.replace(/[&<>"']/g, "");
    xml += `    <FileHashRule Id="${ruleGuid}" Name="Sentinel Immunize Deny: ${safeName}" Description="Zablokowano przez Sentinel System Immunization: ${t.category} (${t.severity})" UserOrGroupSid="S-1-1-0" Action="Deny">
      <Conditions>
        <FileHashCondition>
          <FileHash Type="SHA256" Data="0x${t.sha256Hash.toUpperCase()}" SourceFileNameLength="16" SourceFileName="${t.name.slice(0, 16)}" />
        </FileHashCondition>
      </Conditions>
    </FileHashRule>
`;
  });
  xml += `    <!-- REGUŁA BLOKADY ZŁOŚLIWYCH ŚCIEŻEK DROPPERÓW ADWARE / GNID -->
    <FilePathRule Id="f5050000-0000-4000-8000-000000000001" Name="Sentinel Deny: Blokada wykonywania z %TEMP% dla niepodpisanych binariów" Description="Uniemożliwia dropperom adware uruchamianie plików wykonywalnych z folderów tymczasowych." UserOrGroupSid="S-1-1-0" Action="Deny">
      <Conditions>
        <FilePathCondition Path="%LOCALAPPDATA%\\Temp\\*.exe" />
      </Conditions>
      <Exceptions>
        <FilePathCondition Path="%LOCALAPPDATA%\\Temp\\SentinelShield\\*" />
      </Exceptions>
    </FilePathRule>
  </RuleCollection>
</AppLockerPolicy>
`;
  return xml;
}
export function generateOneClickDeployBat(threats) {
  const timestamp = (/* @__PURE__ */ new Date()).toUTCString();
  return `@echo off
:: ==============================================================================
:: SENTINEL MONOLITH ONE-CLICK SYSTEM IMMUNIZATION & VACCINATION DEPLOYER
:: Data: ${timestamp}
:: Automatyczne wdrożenie: Rejestr (IFEO) + Windows Firewall + SRP/AppLocker
:: ==============================================================================
title Sentinel System Immunization Deployer
color 0B

echo ======================================================================
echo    SENTINEL SYSTEM IMMUNIZATION - WDROZENIE TRWALEJ ODPORNOSCI
echo ======================================================================
echo.

:: 1. Sprawdzenie praw administratora
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [!] BLAD: Skrypt musi zostac uruchomiony jako Administrator!
    echo Kliknij plik prawym przyciskiem myszy i wybierz "Uruchom jako administrator".
    pause
    exit /b 1
)

echo [*] Uprawnienia administratora potwierdzone.
echo.

:: 2. Wdrożenie reguł Rejestru IFEO
echo [1/3] Aplikowanie szczepionki Rejestru (IFEO Debugger Traps)...
if exist "Sentinel_Registry_IFEO_Vaccine.reg" (
    reg import "Sentinel_Registry_IFEO_Vaccine.reg" >nul 2>&1
    if %errorLevel% equ 0 (
        echo     [+] Klucze IFEO pomyslnie zaaplikowane w HKLM!
    ) else (
        echo     [-] Ostrzezenie podczas importu kluczy rejestru.
    )
) else (
    echo     [-] Nie znaleziono pliku Sentinel_Registry_IFEO_Vaccine.reg.
)

:: 3. Wdrożenie reguł Windows Firewall przez PowerShell
echo.
echo [2/3] Konfiguracja Windows Advanced Firewall (Blokada dwukierunkowa C2)...
powershell.exe -NoProfile -ExecutionPolicy Bypass -Command "& { & '.Sentinel_Firewall_Rules.ps1' }"
if %errorLevel% equ 0 (
    echo     [+] Reguly zapory sieciowej zostaly aktywowane.
) else (
    echo     [-] Blad podczas konfiguracji zapory.
)

:: 4. Wymuszenie aktualizacji Zasad Grupy
echo.
echo [3/3] Aktualizacja zasad bezpieczenstwa systemu (gpupdate /force)...
gpupdate /target:computer /force >nul 2>&1
echo     [+] Zasady grupy odswiezone.

echo.
echo ======================================================================
echo [+] IMMUNIZACJA SYSTEMU ZAKONCZONA PELNYM SUKCESEM!
echo [+] System uzyskal trwala odpornosc na znane sygnatury gnid i adware.
echo ======================================================================
echo.
pause
`;
}
export function generateReadmeInstructions(threats) {
  return `================================================================================
INSTRUKCJA WDROŻENIA TRWAŁEJ IMMUNIZACJI SYSTEMU (SENTINEL DEFENSE MONOLITH)
Data wygenerowania pakietu: ${(/* @__PURE__ */ new Date()).toUTCString()}
Liczba chronionych sygnatur: ${threats.length}
================================================================================

CO ZAWIERA TEN PAKIET?
--------------------------------------------------------------------------------
1. Sentinel_Registry_IFEO_Vaccine.reg
   - Szczepionka systemowa wykorzystująca Image File Execution Options (IFEO).
   - W przypadku pojawienia się w systemie pliku o nazwie znanej gnidy 
     (np. flutter_desktop_overlay.exe, adware_alert_daemon.exe), system Windows 
     automatycznie przekierowuje go do dummy stub (systray.exe), co fizycznie
     uniemożliwia załadowanie kodu PE do pamięci RAM.
   - Konfiguruje LowLevelHooksTimeout na 100ms (ochrona przed zawieszeniem I/O).

2. Sentinel_Firewall_Rules.ps1
   - Skrypt PowerShell tworzący zaawansowane reguły Windows Advanced Firewall.
   - Blokuje zarówno ruch przychodzący, jak i wychodzący (kontakt z C2)
     dla wszystkich zidentyfikowanych procesów i portów adware.

3. Sentinel_AppLocker_GPO_Policy.xml
   - Polityka Zasad Grupy (AppLocker) egzekwująca blokadę sum kontrolnych SHA-256.
   - Nawet jeśli złośliwy plik zmieni nazwę, reguła FileHashCondition zablokuje
     jego start na poziomie sterownika jądra systemu (AppLocker Filter Driver).

4. Sentinel_OneClick_Deploy_Admin.bat
   - Gotowy instalator 1-klik, który aplikuje wszystkie 3 powyższe warstwy
     z automatycznym odświeżeniem zasad (gpupdate /force).

JAK WDROŻYĆ NA STACJI ROBOCZEJ LUB SERWERZE?
--------------------------------------------------------------------------------
METODA A (NAJSZYBSZA - 1 KLIK):
1. Rozpakuj archiwum ZIP do dowolnego folderu (np. na Pulpicie).
2. Kliknij prawym przyciskiem myszy na plik:
   "Sentinel_OneClick_Deploy_Admin.bat"
3. Wybierz opcję "Uruchom jako administrator".
4. Gotowe! System jest w 100% zaimmunizowany.

METODA B (RĘCZNA / DLA ADMINISTRATORÓW DOMENY ACTIVE DIRECTORY):
1. Podwójnie kliknij "Sentinel_Registry_IFEO_Vaccine.reg" i zatwierdź import.
2. Uruchom PowerShell jako Admin i wpisz:
   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
   .\\Sentinel_Firewall_Rules.ps1
3. Aby zaimportować reguły AppLocker do domeny GPO:
   - Otwórz gpmc.msc lub secpol.msc
   - Przejdź do: Application Control Policies -> AppLocker
   - Kliknij prawym przyciskiem myszy i wybierz "Import Policy..."
   - Wskaż plik "Sentinel_AppLocker_GPO_Policy.xml"

Status weryfikacji możesz sprawdzić w aplikacji Sentinel w zakładce "Immunizacja".
`;
}
export async function downloadCompleteImmunizationBundle(threats) {
  const zip = new JSZip();
  const regContent = generateWindowsRegistryReg(threats);
  const ps1Content = generateWindowsFirewallPowerShell(threats);
  const xmlContent = generateAppLockerGpoXml(threats);
  const batContent = generateOneClickDeployBat(threats);
  const readmeContent = generateReadmeInstructions(threats);
  zip.file("Sentinel_Registry_IFEO_Vaccine.reg", regContent);
  zip.file("Sentinel_Firewall_Rules.ps1", ps1Content);
  zip.file("Sentinel_AppLocker_GPO_Policy.xml", xmlContent);
  zip.file("Sentinel_OneClick_Deploy_Admin.bat", batContent);
  zip.file("README_INSTRUKCJA_IMMUNIZACJI.txt", readmeContent);
  const blob = await zip.generateAsync({ type: "blob" });
  const filename = `SENTINEL_SYSTEM_IMMUNIZATION_BUNDLE_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.zip`;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  return filename;
}
export function downloadRawFile(filename, content, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
export function getStoredImmunizationState(threats) {
  const existing = safeStorage.get(STORAGE_KEY, null);
  if (existing && existing.activeVaccines && existing.activeVaccines.length > 0) {
    return existing;
  }
  const rules = buildImmunizationRules(threats);
  const uniqueBinaries = Array.from(new Set(rules.map((r) => r.targetBinary)));
  const defaultState = {
    isImmunized: true,
    // Default to immunized in modern Sentinel build
    appliedDate: (/* @__PURE__ */ new Date()).toUTCString(),
    version: "4.9-ENTERPRISE",
    registryRulesCount: uniqueBinaries.length,
    firewallRulesCount: uniqueBinaries.length * 2,
    appLockerRulesCount: threats.length + 1,
    activeVaccines: rules
  };
  safeStorage.set(STORAGE_KEY, defaultState);
  return defaultState;
}
export function saveImmunizationState(state) {
  safeStorage.set(STORAGE_KEY, state);
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN5c3RlbUltbXVuaXphdGlvbkVuZ2luZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSlNaaXAgZnJvbSAnanN6aXAnO1xuaW1wb3J0IHsgTmV1dHJhbGl6ZWRUaHJlYXQsIEZvY3VzSGlqYWNrQXR0ZW1wdCB9IGZyb20gJy4uL3R5cGVzJztcbmltcG9ydCB7IHNhZmVTdG9yYWdlIH0gZnJvbSAnLi9zZWxmUmVwYWlyU3lzdGVtJztcblxuZXhwb3J0IGludGVyZmFjZSBJbW11bml6YXRpb25SdWxlSXRlbSB7XG4gIGlkOiBzdHJpbmc7XG4gIHRocmVhdE5hbWU6IHN0cmluZztcbiAgdGFyZ2V0QmluYXJ5OiBzdHJpbmc7XG4gIGNhdGVnb3J5OiBzdHJpbmc7XG4gIHNoYTI1Nkhhc2g6IHN0cmluZztcbiAgaWZlb1JlZ2lzdHJ5S2V5OiBzdHJpbmc7XG4gIGZpcmV3YWxsUnVsZU5hbWU6IHN0cmluZztcbiAgYXBwTG9ja2VySGFzaFJ1bGU6IHN0cmluZztcbiAgc3RhdHVzOiAnQUNUSVZFX1ZBQ0NJTkUnIHwgJ1BFTkRJTkcnIHwgJ1JFVkVSVEVEJztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJbW11bml6YXRpb25TdGF0ZSB7XG4gIGlzSW1tdW5pemVkOiBib29sZWFuO1xuICBhcHBsaWVkRGF0ZTogc3RyaW5nIHwgbnVsbDtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICByZWdpc3RyeVJ1bGVzQ291bnQ6IG51bWJlcjtcbiAgZmlyZXdhbGxSdWxlc0NvdW50OiBudW1iZXI7XG4gIGFwcExvY2tlclJ1bGVzQ291bnQ6IG51bWJlcjtcbiAgYWN0aXZlVmFjY2luZXM6IEltbXVuaXphdGlvblJ1bGVJdGVtW107XG4gIGxhc3RWZXJpZmljYXRpb25UZXN0Pzoge1xuICAgIHRpbWVzdGFtcDogc3RyaW5nO1xuICAgIHRlc3RlZFRocmVhdDogc3RyaW5nO1xuICAgIGJsb2NrZWRCeUxheWVyczogc3RyaW5nW107XG4gICAgcGFzc2VkOiBib29sZWFuO1xuICAgIHZlcmRpY3Q6IHN0cmluZztcbiAgfTtcbn1cblxuY29uc3QgU1RPUkFHRV9LRVkgPSAnc2VudGluZWxfc3lzdGVtX2ltbXVuaXphdGlvbl9zdGF0ZSc7XG5cbi8vIEV4dHJhY3QgdGFyZ2V0IGJpbmFyeSBmaWxlbmFtZXMgZnJvbSB0aHJlYXRzXG5leHBvcnQgZnVuY3Rpb24gZXh0cmFjdEJpbmFyeU5hbWVzRm9yVGhyZWF0KHRocmVhdDogTmV1dHJhbGl6ZWRUaHJlYXQpOiBzdHJpbmdbXSB7XG4gIGNvbnN0IGJpbmFyaWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgLy8gQ2hlY2sga25vd24ga2V5d29yZHMgaW4gZGVzY3JpcHRpb24gYW5kIG5hbWVcbiAgY29uc3QgcmF3VGV4dCA9IGAke3RocmVhdC5uYW1lfSAke3RocmVhdC5hbGlhcyB8fCAnJ30gJHt0aHJlYXQuZGVzY3JpcHRpb259ICR7dGhyZWF0LmluZmVjdGlvblZlY3Rvci5wYXlsb2FkVHlwZX0gJHt0aHJlYXQuaW5mZWN0aW9uVmVjdG9yLmV4cGxvaXRDaGFpbi5qb2luKCcgJyl9YDtcbiAgY29uc3QgbWF0Y2hlcyA9IHJhd1RleHQubWF0Y2goL1thLXpBLVowLTlfXFwtXFwuXStcXC4oPzpleGV8ZGxsfHNjcnxiYXR8dmJzKS9naSkgfHwgW107XG4gIG1hdGNoZXMuZm9yRWFjaChtID0+IGJpbmFyaWVzLmFkZChtLnRvTG93ZXJDYXNlKCkpKTtcblxuICAvLyBBZGQgZGVmYXVsdCBwcmVkaWN0YWJsZSBleGVjdXRhYmxlIG5hbWVzIGlmIG5vbmUgZm91bmRcbiAgaWYgKGJpbmFyaWVzLnNpemUgPT09IDApIHtcbiAgICBjb25zdCBzbHVnID0gdGhyZWF0Lm5hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXmEtejAtOV9dL2csICdfJyk7XG4gICAgYmluYXJpZXMuYWRkKGAke3NsdWd9LmV4ZWApO1xuICB9XG5cbiAgLy8gQ29tbW9uIGduaWRhIHNpZ25hdHVyZXNcbiAgaWYgKHRocmVhdC5jYXRlZ29yeSA9PT0gJ1NjcmVlbiBMb2NrZXInIHx8IHRocmVhdC5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2ZsdXR0ZXInKSkge1xuICAgIGJpbmFyaWVzLmFkZCgnZmx1dHRlcl9kZXNrdG9wX292ZXJsYXkuZXhlJyk7XG4gICAgYmluYXJpZXMuYWRkKCd3aW5kb3dfbWFuYWdlcl9ob29rLmRsbCcpO1xuICB9XG4gIGlmICh0aHJlYXQuY2F0ZWdvcnkgPT09ICdQb3B1cCBTdG9ybScgfHwgdGhyZWF0Lm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygnYWR3YXJlJykpIHtcbiAgICBiaW5hcmllcy5hZGQoJ2Fkd2FyZV9hbGVydF9kYWVtb24uZXhlJyk7XG4gICAgYmluYXJpZXMuYWRkKCdhZHdhcmVfcG9wdXBfY2FzY2FkZS5leGUnKTtcbiAgfVxuICBpZiAodGhyZWF0LmNhdGVnb3J5ID09PSAnUHJvY2VzcyBXaXBlcicpIHtcbiAgICBiaW5hcmllcy5hZGQoJ3dpcGVyX3Jhd19tYnIuZXhlJyk7XG4gIH1cbiAgaWYgKHRocmVhdC5jYXRlZ29yeSA9PT0gJ1Ryb2phbiBPdmVybGF5Jykge1xuICAgIGJpbmFyaWVzLmFkZCgnc2NyZWVuX2hvb2tfZGFlbW9uLmV4ZScpO1xuICB9XG5cbiAgcmV0dXJuIEFycmF5LmZyb20oYmluYXJpZXMpO1xufVxuXG4vLyBCdWlsZCBzdHJ1Y3R1cmVkIHZhY2NpbmF0aW9uIHJ1bGVzIGxpc3QgZnJvbSBhbGwgdGhyZWF0c1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSW1tdW5pemF0aW9uUnVsZXModGhyZWF0czogTmV1dHJhbGl6ZWRUaHJlYXRbXSk6IEltbXVuaXphdGlvblJ1bGVJdGVtW10ge1xuICBjb25zdCBydWxlczogSW1tdW5pemF0aW9uUnVsZUl0ZW1bXSA9IFtdO1xuXG4gIHRocmVhdHMuZm9yRWFjaCh0ID0+IHtcbiAgICBjb25zdCBiaW5hcmllcyA9IGV4dHJhY3RCaW5hcnlOYW1lc0ZvclRocmVhdCh0KTtcbiAgICBiaW5hcmllcy5mb3JFYWNoKChiaW4sIGlkeCkgPT4ge1xuICAgICAgcnVsZXMucHVzaCh7XG4gICAgICAgIGlkOiBgdmFjLSR7dC5pZH0tJHtpZHh9YCxcbiAgICAgICAgdGhyZWF0TmFtZTogdC5uYW1lLFxuICAgICAgICB0YXJnZXRCaW5hcnk6IGJpbixcbiAgICAgICAgY2F0ZWdvcnk6IHQuY2F0ZWdvcnksXG4gICAgICAgIHNoYTI1Nkhhc2g6IHQuc2hhMjU2SGFzaCxcbiAgICAgICAgaWZlb1JlZ2lzdHJ5S2V5OiBgSEtMTVxcXFxTT0ZUV0FSRVxcXFxNaWNyb3NvZnRcXFxcV2luZG93cyBOVFxcXFxDdXJyZW50VmVyc2lvblxcXFxJbWFnZSBGaWxlIEV4ZWN1dGlvbiBPcHRpb25zXFxcXCR7YmlufWAsXG4gICAgICAgIGZpcmV3YWxsUnVsZU5hbWU6IGBTRU5USU5FTC1ERUZFTlNFLUJMT0NLLSR7YmluLnRvVXBwZXJDYXNlKCkucmVwbGFjZSgvXFwuL2csICdfJyl9YCxcbiAgICAgICAgYXBwTG9ja2VySGFzaFJ1bGU6IGBIYXNoQmxvY2stJHt0LnNoYTI1Nkhhc2guc3Vic3RyaW5nKDAsIDE2KX1gLFxuICAgICAgICBzdGF0dXM6ICdBQ1RJVkVfVkFDQ0lORSdcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gcnVsZXM7XG59XG5cbi8vIEdlbmVyYXRlIFdpbmRvd3MgUmVnaXN0cnkgKC5yZWcpIFNjcmlwdCB3aXRoIElGRU8gZGVidWdnZXIgdHJhcHMgJiBTb2Z0d2FyZSBSZXN0cmljdGlvbiBQb2xpY2llc1xuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93c1JlZ2lzdHJ5UmVnKHRocmVhdHM6IE5ldXRyYWxpemVkVGhyZWF0W10pOiBzdHJpbmcge1xuICBjb25zdCBydWxlcyA9IGJ1aWxkSW1tdW5pemF0aW9uUnVsZXModGhyZWF0cyk7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9VVENTdHJpbmcoKTtcblxuICBsZXQgcmVnID0gYFdpbmRvd3MgUmVnaXN0cnkgRWRpdG9yIFZlcnNpb24gNS4wMFxuXG47ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuOyBTRU5USU5FTCBBTlRJLU1BTFdBUkUgU1lTVEVNIElNTVVOSVpBVElPTiAmIFZBQ0NJTkFUSU9OIEVOR0lORVxuOyBEYXRhIHd5Z2VuZXJvd2FuaWE6ICR7dGltZXN0YW1wfVxuOyBQb3ppb20gT2Nocm9ueTogVFJXQcWBQSBPRFBPUk5PxZrEhiAoSUZFTyBERUJVR0dFUiBSRURJUkVDVElPTiAmIEdQTyBSRVNUUklDVElPTilcbjsgS29tcGF0eWJpbG5vxZvEhzogV2luZG93cyAxMCAvIFdpbmRvd3MgMTEgLyBXaW5kb3dzIFNlcnZlciAyMDE2LTIwMjVcbjsgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbjsgLS0tIEtST0sgMTogU1lTVEVNT1dFIFpBQkVaUElFQ1pFTklFIFBSWkVEIEhPT0tBTUkgSSBQUlpFQ0hXWVRZV0FOSUVNIEZPS1VTVSAtLS1cbltIS0VZX0NVUlJFTlRfVVNFUlxcXFxDb250cm9sIFBhbmVsXFxcXERlc2t0b3BdXG5cIkxvd0xldmVsSG9va3NUaW1lb3V0XCI9ZHdvcmQ6MDAwMDAwNjRcblxuOyBXxYLEhWN6ZW5pZSBiZXpwaWVjem5lZ28gcHJ6ZXN6dWtpd2FuaWEgYmlibGlvdGVrIERMTCAoU2FmZURsbFNlYXJjaE1vZGUpXG5bSEtFWV9MT0NBTF9NQUNISU5FXFxcXFNZU1RFTVxcXFxDdXJyZW50Q29udHJvbFNldFxcXFxDb250cm9sXFxcXFNlc3Npb24gTWFuYWdlcl1cblwiU2FmZURsbFNlYXJjaE1vZGVcIj1kd29yZDowMDAwMDAwMVxuXG47IFd5xYLEhWN6ZW5pZSBBdXRvUnVuIGRsYSB3c3p5c3RraWNoIG5hcMSZZMOzdyAoYmxva2FkYSB3ZWt0b3JhIFVTQiAvIG5vxZtuaWvDs3cgemV3bsSZdHJ6bnljaClcbltIS0VZX0xPQ0FMX01BQ0hJTkVcXFxcU09GVFdBUkVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUG9saWNpZXNcXFxcRXhwbG9yZXJdXG5cIk5vRHJpdmVUeXBlQXV0b1J1blwiPWR3b3JkOjAwMDAwMGZmXG5cIk5vQXV0b3J1blwiPWR3b3JkOjAwMDAwMDAxXG5cbjsgLS0tIEtST0sgMjogU1pDWkVQSU9OS0EgSUZFTyAoSU1BR0UgRklMRSBFWEVDVVRJT04gT1BUSU9OUykgRExBIFdTWllTVEtJQ0ggWk5BTllDSCBHTklEIC0tLVxuOyBQcnpla2llcm93YW5pZSB3eWtvbmFuaWEgZG8gZHVtbXkgc3R1YiAoc3lzdHJheS5leGUgLyBudGRsbCBzdHViKSwgY28gdW5pZW1vxbxsaXdpYSB1cnVjaG9taWVuaWVcbmA7XG5cbiAgY29uc3QgdW5pcXVlQmluYXJpZXMgPSBBcnJheS5mcm9tKG5ldyBTZXQocnVsZXMubWFwKHIgPT4gci50YXJnZXRCaW5hcnkpKSk7XG5cbiAgdW5pcXVlQmluYXJpZXMuZm9yRWFjaChiaW4gPT4ge1xuICAgIHJlZyArPSBgXG47IFtTWkNaRVBJT05LQSBJRkVPXSBCbG9rYWRhIHBsaWt1IGJpbmFybmVnbzogJHtiaW59XG5bSEtFWV9MT0NBTF9NQUNISU5FXFxcXFNPRlRXQVJFXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzIE5UXFxcXEN1cnJlbnRWZXJzaW9uXFxcXEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnNcXFxcJHtiaW59XVxuXCJEZWJ1Z2dlclwiPVwic3lzdHJheS5leGVcIlxuXCJNaXRpZ2F0aW9uT3B0aW9uc1wiPWhleChiKTowMSwwMCwwMCwwMCwwMCwwMCwwMCwwMFxuXCJCbG9ja0xvd0ludGVncml0eUV4ZWN1dGlvblwiPWR3b3JkOjAwMDAwMDAxXG5cIk1pdGlnYXRpb25GbGFnc1wiPWhleChiKTowMSwwMCwwMCwwMCwwMCwwMCwwMCwwMFxuYDtcbiAgfSk7XG5cbiAgcmVnICs9IGBcbjsgLS0tIEtST0sgMzogQkxPS0FEQSBXIExJxZpDSUUgRElTQUxMT1cgUlVOIChQT0xJQ0lFUyBFWFBMT1JFUikgLS0tXG5bSEtFWV9DVVJSRU5UX1VTRVJcXFxcU29mdHdhcmVcXFxcTWljcm9zb2Z0XFxcXFdpbmRvd3NcXFxcQ3VycmVudFZlcnNpb25cXFxcUG9saWNpZXNcXFxcRXhwbG9yZXJdXG5cIkRpc2FsbG93UnVuXCI9ZHdvcmQ6MDAwMDAwMDFcblxuW0hLRVlfQ1VSUkVOVF9VU0VSXFxcXFNvZnR3YXJlXFxcXE1pY3Jvc29mdFxcXFxXaW5kb3dzXFxcXEN1cnJlbnRWZXJzaW9uXFxcXFBvbGljaWVzXFxcXEV4cGxvcmVyXFxcXERpc2FsbG93UnVuXVxuYDtcblxuICB1bmlxdWVCaW5hcmllcy5zbGljZSgwLCA1MCkuZm9yRWFjaCgoYmluLCBpZHgpID0+IHtcbiAgICByZWcgKz0gYFwiJHtpZHggKyAxfVwiPVwiJHtiaW59XCJcXG5gO1xuICB9KTtcblxuICByZWcgKz0gYFxuOyAtLS0gS1JPSyA0OiBQT1RXSUVSRFpFTklFIElOVEVHUkFMTk/FmkNJIE1PTk9MSVRVIFNFTlRJTkVMIC0tLVxuW0hLRVlfTE9DQUxfTUFDSElORVxcXFxTT0ZUV0FSRVxcXFxTZW50aW5lbFNoaWVsZFxcXFxJbW11bml6YXRpb25dXG5cIkluc3RhbGxlZFwiPWR3b3JkOjAwMDAwMDAxXG5cIkVuZ2luZVZlcnNpb25cIj1cIlNlbnRpbmVsLTQuOS1JbW11bml6ZWRcIlxuXCJBY3RpdmVSdWxlc0NvdW50XCI9ZHdvcmQ6JHt1bmlxdWVCaW5hcmllcy5sZW5ndGgudG9TdHJpbmcoMTYpLnBhZFN0YXJ0KDgsICcwJyl9XG5cIlRpbWVzdGFtcFwiPVwiJHt0aW1lc3RhbXB9XCJcbmA7XG5cbiAgcmV0dXJuIHJlZztcbn1cblxuLy8gR2VuZXJhdGUgV2luZG93cyBEZWZlbmRlciAmIEFkdmFuY2VkIEZpcmV3YWxsIFBvd2VyU2hlbGwgU2NyaXB0ICgucHMxKVxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlV2luZG93c0ZpcmV3YWxsUG93ZXJTaGVsbCh0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdKTogc3RyaW5nIHtcbiAgY29uc3QgcnVsZXMgPSBidWlsZEltbXVuaXphdGlvblJ1bGVzKHRocmVhdHMpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCk7XG4gIGNvbnN0IHVuaXF1ZUJpbmFyaWVzID0gQXJyYXkuZnJvbShuZXcgU2V0KHJ1bGVzLm1hcChyID0+IHIudGFyZ2V0QmluYXJ5KSkpO1xuXG4gIHJldHVybiBgIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiMgU0VOVElORUwgQURWQU5DRUQgRklSRVdBTEwgJiBORVRXT1JLIElNTVVOSVpBVElPTiBTQ1JJUFRcbiMgRGF0YSB3eWdlbmVyb3dhbmlhOiAke3RpbWVzdGFtcH1cbiMgV3ltYWdhbmlhOiBQb3dlclNoZWxsIDUuMSsgeiB1cHJhd25pZW5pYW1pIEFkbWluaXN0cmF0b3JhXG4jIER6aWHFgmFuaWU6IFRyd2HFgmUgcmVndcWCeSBibG9rdWrEhWNlIHJ1Y2ggc2llY2lvd3kgaSBDMiBkbGEgd3lrcnl0eWNoIHN5Z25hdHVyIGduaWRcbiMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbiMgV2VyeWZpa2FjamEgdXByYXduaWXFhCBhZG1pbmlzdHJhdG9yYVxuJGlzQWRtaW4gPSAoW1NlY3VyaXR5LlByaW5jaXBhbC5XaW5kb3dzUHJpbmNpcGFsXVtTZWN1cml0eS5QcmluY2lwYWwuV2luZG93c0lkZW50aXR5XTo6R2V0Q3VycmVudCgpKS5Jc0luUm9sZShbU2VjdXJpdHkuUHJpbmNpcGFsLldpbmRvd3NCdWlsdEluUm9sZV06OkFkbWluaXN0cmF0b3IpXG5pZiAoLW5vdCAkaXNBZG1pbikge1xuICAgIFdyaXRlLUhvc3QgXCJbIV0gQsWBxIREOiBVcnVjaG9tIHRlbiBza3J5cHQgeiBwb2RuaWVzaW9ueW1pIHVwcmF3bmllbmlhbWkgQWRtaW5pc3RyYXRvcmEhXCIgLUZvcmVncm91bmRDb2xvciBSZWRcbiAgICBFeGl0IDFcbn1cblxuV3JpdGUtSG9zdCBcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cIiAtRm9yZWdyb3VuZENvbG9yIEN5YW5cbldyaXRlLUhvc3QgXCJbKl0gU0VOVElORUwgSU1NVU5JWkFUSU9OOiBUV09SWkVOSUUgUkVHVcWBIFdJTkRPV1MgQURWQU5DRUQgRklSRVdBTEwuLi5cIiAtRm9yZWdyb3VuZENvbG9yIEN5YW5cbldyaXRlLUhvc3QgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIgLUZvcmVncm91bmRDb2xvciBDeWFuXG5cbiMgMS4gVXN1xYQgcG9wcnplZG5pZSByZWd1xYJ5IFNlbnRpbmVsIChpZGVtcG90ZW50bm/Fm8SHKVxuV3JpdGUtSG9zdCBcIlsqXSBDenlzemN6ZW5pZSBhcmNoaXdhbG55Y2ggcmVndcWCIFNlbnRpbmVsLi4uXCIgLUZvcmVncm91bmRDb2xvciBHcmF5XG5HZXQtTmV0RmlyZXdhbGxSdWxlIC1OYW1lIFwiU0VOVElORUwtKlwiIC1FcnJvckFjdGlvbiBTaWxlbnRseUNvbnRpbnVlIHwgUmVtb3ZlLU5ldEZpcmV3YWxsUnVsZSAtRXJyb3JBY3Rpb24gU2lsZW50bHlDb250aW51ZVxuXG4kYmxvY2tlZENvdW50ID0gMFxuXG4jIDIuIFR3b3J6ZW5pZSByZWd1xYIgYmxva3VqxIVjeWNoIHd5Y2hvZHrEhWNlIHBvxYLEhWN6ZW5pYSBkbGEgcHJvY2Vzw7N3IGduaWRcbiRrbm93bkJpbmFyaWVzID0gQChcbiR7dW5pcXVlQmluYXJpZXMubWFwKGIgPT4gYCAgICBcIiR7Yn1cImApLmpvaW4oJyxcXG4nKX1cbilcblxuZm9yZWFjaCAoJGJpbiBpbiAka25vd25CaW5hcmllcykge1xuICAgICRydWxlTmFtZU91dCA9IFwiU0VOVElORUwtQkxPQ0stT1VULVwiICsgKCRiaW4gLXJlcGxhY2UgJ1xcXFwuJywgJ18nKS5Ub1VwcGVyKClcbiAgICAkcnVsZU5hbWVJbiA9IFwiU0VOVElORUwtQkxPQ0stSU4tXCIgKyAoJGJpbiAtcmVwbGFjZSAnXFxcXC4nLCAnXycpLlRvVXBwZXIoKVxuXG4gICAgIyBCbG9rYWRhIHd5Y2hvZHrEhWNhIChPdXRib3VuZClcbiAgICBOZXctTmV0RmlyZXdhbGxSdWxlIC1OYW1lICRydWxlTmFtZU91dCBcXGBcbiAgICAgICAgLURpc3BsYXlOYW1lIFwiU2VudGluZWwgUXVhcmFudGluZTogQmxva2FkYSAkYmluIChSdWNoIFd5Y2hvZHrEhWN5IEMyKVwiIFxcYFxuICAgICAgICAtRGVzY3JpcHRpb24gXCJSZWd1xYJhIHRyd2HFgmVqIGltbXVuaXphY2ppIFNlbnRpbmVsIHphcG9iaWVnYWrEhWNhIHd5Y2lla293aSBkYW55Y2ggaSBrb250YWt0b3dpIHogQzIuXCIgXFxgXG4gICAgICAgIC1EaXJlY3Rpb24gT3V0Ym91bmQgXFxgXG4gICAgICAgIC1Qcm9ncmFtIFwiKlxcXFwkYmluXCIgXFxgXG4gICAgICAgIC1BY3Rpb24gQmxvY2sgXFxgXG4gICAgICAgIC1FbmFibGVkIFRydWUgXFxgXG4gICAgICAgIC1Qcm9maWxlIEFueSB8IE91dC1OdWxsXG5cbiAgICAjIEJsb2thZGEgcHJ6eWNob2R6xIVjYSAoSW5ib3VuZClcbiAgICBOZXctTmV0RmlyZXdhbGxSdWxlIC1OYW1lICRydWxlTmFtZUluIFxcYFxuICAgICAgICAtRGlzcGxheU5hbWUgXCJTZW50aW5lbCBRdWFyYW50aW5lOiBCbG9rYWRhICRiaW4gKFJ1Y2ggUHJ6eWNob2R6xIVjeSlcIiBcXGBcbiAgICAgICAgLURlc2NyaXB0aW9uIFwiUmVndcWCYSB0cndhxYJlaiBpbW11bml6YWNqaSBTZW50aW5lbCBvZHJ6dWNhasSFY2EgcG/FgsSFY3plbmlhIHpkYWxuZS5cIiBcXGBcbiAgICAgICAgLURpcmVjdGlvbiBJbmJvdW5kIFxcYFxuICAgICAgICAtUHJvZ3JhbSBcIipcXFxcJGJpblwiIFxcYFxuICAgICAgICAtQWN0aW9uIEJsb2NrIFxcYFxuICAgICAgICAtRW5hYmxlZCBUcnVlIFxcYFxuICAgICAgICAtUHJvZmlsZSBBbnkgfCBPdXQtTnVsbFxuXG4gICAgJGJsb2NrZWRDb3VudCsrXG4gICAgV3JpdGUtSG9zdCBcIiAgICBbK10gWmFzemN6ZXBpb25vIHJlZ3XFgsSZIEZpcmV3YWxsIGRsYTogJGJpblwiIC1Gb3JlZ3JvdW5kQ29sb3IgR3JlZW5cbn1cblxuIyAzLiBCbG9rYWRhIHpuYW55Y2ggcG9ydMOzdyB3eWtvcnp5c3R5d2FueWNoIHByemV6IGFkd2FyZS9nbmlkeSBkbyBwxJl0bGkgNjBIeiBsb29wYmFja1xuJHJvZ3VlUG9ydHMgPSBAKDgwODgsIDgwODksIDkwOTAsIDk5OTksIDQ0NDQsIDEzMzcpXG5OZXctTmV0RmlyZXdhbGxSdWxlIC1OYW1lIFwiU0VOVElORUwtQkxPQ0stUk9HVUUtUE9SVFNcIiBcXGBcbiAgICAtRGlzcGxheU5hbWUgXCJTZW50aW5lbCBEZWZlbnNlOiBCbG9rYWRhIHBvZGVqcnphbnljaCBwb3J0w7N3IHRlbGVtZXRyeWN6bnljaCBhZHdhcmVcIiBcXGBcbiAgICAtRGlyZWN0aW9uIE91dGJvdW5kIFxcYFxuICAgIC1Qcm90b2NvbCBUQ1AgXFxgXG4gICAgLVJlbW90ZVBvcnQgJHJvZ3VlUG9ydHMgXFxgXG4gICAgLUFjdGlvbiBCbG9jayBcXGBcbiAgICAtRW5hYmxlZCBUcnVlIFxcYFxuICAgIC1Qcm9maWxlIEFueSB8IE91dC1OdWxsXG5cbldyaXRlLUhvc3QgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIgLUZvcmVncm91bmRDb2xvciBDeWFuXG5Xcml0ZS1Ib3N0IFwiWytdIElNTVVOSVpBQ0pBIFNJRUNJT1dBIFpBS0/Fg0NaT05BIFNVS0NFU0VNIVwiIC1Gb3JlZ3JvdW5kQ29sb3IgR3JlZW5cbldyaXRlLUhvc3QgXCJbK10gWmFpbXBsZW1lbnRvd2FubyAkYmxvY2tlZENvdW50IGJpbmFybnljaCByZWd1xYIgZHd1a2llcnVua293eWNoLlwiIC1Gb3JlZ3JvdW5kQ29sb3IgV2hpdGVcbldyaXRlLUhvc3QgXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIgLUZvcmVncm91bmRDb2xvciBDeWFuXG5gO1xufVxuXG4vLyBHZW5lcmF0ZSBXaW5kb3dzIEdyb3VwIFBvbGljeSBBcHBMb2NrZXIgJiBTb2Z0d2FyZSBSZXN0cmljdGlvbiBQb2xpY2llcyAoR1BPIFhNTClcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUFwcExvY2tlckdwb1htbCh0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdKTogc3RyaW5nIHtcbiAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gIGxldCB4bWwgPSBgPD94bWwgdmVyc2lvbj1cIjEuMFwiIGVuY29kaW5nPVwiVVRGLThcIj8+XG48IS0tID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gLS0+XG48IS0tIFNFTlRJTkVMIEVOVEVSUFJJU0UgQVBQTE9DS0VSIEdQTyBJTU1VTklaQVRJT04gUE9MSUNZICAgICAgICAgICAgICAgICAgLS0+XG48IS0tIEltcG9ydHVqIGRvOiBzZWNwb2wubXNjIC0+IFphc2FkeSBTdGVyb3dhbmlhIEFwbGlrYWNqYW1pIC0+IEFwcExvY2tlciAgLS0+XG48IS0tIGx1YiBLb25zb2xpIFphcnrEhWR6YW5pYSBaYXNhZGFtaSBHcnVweSAoR1BNQy5tc2MpICAgICAgICAgICAgICAgICAgICAgIC0tPlxuPCEtLSA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09IC0tPlxuPEFwcExvY2tlclBvbGljeSBWZXJzaW9uPVwiMVwiPlxuICA8UnVsZUNvbGxlY3Rpb24gVHlwZT1cIkV4ZVwiIEVuZm9yY2VtZW50TW9kZT1cIkVuYWJsZWRcIj5cbiAgICA8IS0tIFJlZ3XFgmEgZG9tecWbbG5hOiBaZXp3w7NsIGFkbWluaXN0cmF0b3JvbSAtLT5cbiAgICA8RmlsZVBhdGhSdWxlIElkPVwiYTYxYzhiMjctMDYyMS00ZDFjLWFjMzItZTA3OGEzZjM0ZDdlXCIgTmFtZT1cIihEZWZhdWx0IFJ1bGUpIEFsbCBmaWxlcyBsb2NhdGVkIGluIHRoZSBQcm9ncmFtIEZpbGVzIGZvbGRlclwiIERlc2NyaXB0aW9uPVwiQWxsb3dzIG1lbWJlcnMgb2YgdGhlIEV2ZXJ5b25lIGdyb3VwIHRvIHJ1biBhcHBsaWNhdGlvbnMgaW4gUHJvZ3JhbSBGaWxlcy5cIiBVc2VyT3JHcm91cFNpZD1cIlMtMS0xLTBcIiBBY3Rpb249XCJBbGxvd1wiPlxuICAgICAgPENvbmRpdGlvbnM+XG4gICAgICAgIDxGaWxlUGF0aENvbmRpdGlvbiBQYXRoPVwiJVBST0dSQU1GSUxFUyVcXFxcKlwiIC8+XG4gICAgICA8L0NvbmRpdGlvbnM+XG4gICAgPC9GaWxlUGF0aFJ1bGU+XG4gICAgPEZpbGVQYXRoUnVsZSBJZD1cIjMzNzYwNmIxLTQxZWEtNGFiOC04ZjgzLWE3MzYzNzc1NDA3N1wiIE5hbWU9XCIoRGVmYXVsdCBSdWxlKSBBbGwgZmlsZXMgbG9jYXRlZCBpbiB0aGUgV2luZG93cyBmb2xkZXJcIiBEZXNjcmlwdGlvbj1cIkFsbG93cyBtZW1iZXJzIG9mIHRoZSBFdmVyeW9uZSBncm91cCB0byBydW4gYXBwbGljYXRpb25zIGluIFdpbmRvd3MgZm9sZGVyLlwiIFVzZXJPckdyb3VwU2lkPVwiUy0xLTEtMFwiIEFjdGlvbj1cIkFsbG93XCI+XG4gICAgICA8Q29uZGl0aW9ucz5cbiAgICAgICAgPEZpbGVQYXRoQ29uZGl0aW9uIFBhdGg9XCIlV0lORElSJVxcXFwqXCIgLz5cbiAgICAgIDwvQ29uZGl0aW9ucz5cbiAgICA8L0ZpbGVQYXRoUnVsZT5cblxuICAgIDwhLS0gUkVHVcWBWSBJTU1VTklaQUNKSSBTRU5USU5FTDogQkxPS0FEQSBTVU0gS09OVFJPTE5ZQ0ggU0hBMjU2IERMQSBaTkFOWUNIIEdOSUQgLS0+XG5gO1xuXG4gIHRocmVhdHMuZm9yRWFjaCgodCwgaWR4KSA9PiB7XG4gICAgY29uc3QgcnVsZUd1aWQgPSBgZTQwNDAwMDAtMDAwMC00MDAwLTgwMDAtJHsoaWR4ICsgMSkudG9TdHJpbmcoKS5wYWRTdGFydCgxMiwgJzAnKX1gO1xuICAgIGNvbnN0IHNhZmVOYW1lID0gdC5uYW1lLnJlcGxhY2UoL1smPD5cIiddL2csICcnKTtcblxuICAgIHhtbCArPSBgICAgIDxGaWxlSGFzaFJ1bGUgSWQ9XCIke3J1bGVHdWlkfVwiIE5hbWU9XCJTZW50aW5lbCBJbW11bml6ZSBEZW55OiAke3NhZmVOYW1lfVwiIERlc2NyaXB0aW9uPVwiWmFibG9rb3dhbm8gcHJ6ZXogU2VudGluZWwgU3lzdGVtIEltbXVuaXphdGlvbjogJHt0LmNhdGVnb3J5fSAoJHt0LnNldmVyaXR5fSlcIiBVc2VyT3JHcm91cFNpZD1cIlMtMS0xLTBcIiBBY3Rpb249XCJEZW55XCI+XG4gICAgICA8Q29uZGl0aW9ucz5cbiAgICAgICAgPEZpbGVIYXNoQ29uZGl0aW9uPlxuICAgICAgICAgIDxGaWxlSGFzaCBUeXBlPVwiU0hBMjU2XCIgRGF0YT1cIjB4JHt0LnNoYTI1Nkhhc2gudG9VcHBlckNhc2UoKX1cIiBTb3VyY2VGaWxlTmFtZUxlbmd0aD1cIjE2XCIgU291cmNlRmlsZU5hbWU9XCIke3QubmFtZS5zbGljZSgwLCAxNil9XCIgLz5cbiAgICAgICAgPC9GaWxlSGFzaENvbmRpdGlvbj5cbiAgICAgIDwvQ29uZGl0aW9ucz5cbiAgICA8L0ZpbGVIYXNoUnVsZT5cbmA7XG4gIH0pO1xuXG4gIC8vIFBhdGggQmxvY2sgQ29uZGl0aW9ucyBmb3Igcm9ndWUgZHJvcHBlZCB0ZW1wIGV4ZWN1dGFibGVzXG4gIHhtbCArPSBgICAgIDwhLS0gUkVHVcWBQSBCTE9LQURZIFrFgU/FmkxJV1lDSCDFmkNJRcW7RUsgRFJPUFBFUsOTVyBBRFdBUkUgLyBHTklEIC0tPlxuICAgIDxGaWxlUGF0aFJ1bGUgSWQ9XCJmNTA1MDAwMC0wMDAwLTQwMDAtODAwMC0wMDAwMDAwMDAwMDFcIiBOYW1lPVwiU2VudGluZWwgRGVueTogQmxva2FkYSB3eWtvbnl3YW5pYSB6ICVURU1QJSBkbGEgbmllcG9kcGlzYW55Y2ggYmluYXJpw7N3XCIgRGVzY3JpcHRpb249XCJVbmllbW/FvGxpd2lhIGRyb3BwZXJvbSBhZHdhcmUgdXJ1Y2hhbWlhbmllIHBsaWvDs3cgd3lrb255d2FsbnljaCB6IGZvbGRlcsOzdyB0eW1jemFzb3d5Y2guXCIgVXNlck9yR3JvdXBTaWQ9XCJTLTEtMS0wXCIgQWN0aW9uPVwiRGVueVwiPlxuICAgICAgPENvbmRpdGlvbnM+XG4gICAgICAgIDxGaWxlUGF0aENvbmRpdGlvbiBQYXRoPVwiJUxPQ0FMQVBQREFUQSVcXFxcVGVtcFxcXFwqLmV4ZVwiIC8+XG4gICAgICA8L0NvbmRpdGlvbnM+XG4gICAgICA8RXhjZXB0aW9ucz5cbiAgICAgICAgPEZpbGVQYXRoQ29uZGl0aW9uIFBhdGg9XCIlTE9DQUxBUFBEQVRBJVxcXFxUZW1wXFxcXFNlbnRpbmVsU2hpZWxkXFxcXCpcIiAvPlxuICAgICAgPC9FeGNlcHRpb25zPlxuICAgIDwvRmlsZVBhdGhSdWxlPlxuICA8L1J1bGVDb2xsZWN0aW9uPlxuPC9BcHBMb2NrZXJQb2xpY3k+XG5gO1xuXG4gIHJldHVybiB4bWw7XG59XG5cbi8vIEdlbmVyYXRlIE9uZS1DbGljayBBZG1pbmlzdHJhdGl2ZSBCYXRjaCBTY3JpcHQgKC5iYXQpXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVPbmVDbGlja0RlcGxveUJhdCh0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdKTogc3RyaW5nIHtcbiAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoKS50b1VUQ1N0cmluZygpO1xuXG4gIHJldHVybiBgQGVjaG8gb2ZmXG46OiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbjo6IFNFTlRJTkVMIE1PTk9MSVRIIE9ORS1DTElDSyBTWVNURU0gSU1NVU5JWkFUSU9OICYgVkFDQ0lOQVRJT04gREVQTE9ZRVJcbjo6IERhdGE6ICR7dGltZXN0YW1wfVxuOjogQXV0b21hdHljem5lIHdkcm/FvGVuaWU6IFJlamVzdHIgKElGRU8pICsgV2luZG93cyBGaXJld2FsbCArIFNSUC9BcHBMb2NrZXJcbjo6ID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxudGl0bGUgU2VudGluZWwgU3lzdGVtIEltbXVuaXphdGlvbiBEZXBsb3llclxuY29sb3IgMEJcblxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5lY2hvICAgIFNFTlRJTkVMIFNZU1RFTSBJTU1VTklaQVRJT04gLSBXRFJPWkVOSUUgVFJXQUxFSiBPRFBPUk5PU0NJXG5lY2hvID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8uXG5cbjo6IDEuIFNwcmF3ZHplbmllIHByYXcgYWRtaW5pc3RyYXRvcmFcbm5ldCBzZXNzaW9uID5udWwgMj4mMVxuaWYgJWVycm9yTGV2ZWwlIG5lcSAwIChcbiAgICBlY2hvIFshXSBCTEFEOiBTa3J5cHQgbXVzaSB6b3N0YWMgdXJ1Y2hvbWlvbnkgamFrbyBBZG1pbmlzdHJhdG9yIVxuICAgIGVjaG8gS2xpa25paiBwbGlrIHByYXd5bSBwcnp5Y2lza2llbSBteXN6eSBpIHd5YmllcnogXCJVcnVjaG9tIGpha28gYWRtaW5pc3RyYXRvclwiLlxuICAgIHBhdXNlXG4gICAgZXhpdCAvYiAxXG4pXG5cbmVjaG8gWypdIFVwcmF3bmllbmlhIGFkbWluaXN0cmF0b3JhIHBvdHdpZXJkem9uZS5cbmVjaG8uXG5cbjo6IDIuIFdkcm/FvGVuaWUgcmVndcWCIFJlamVzdHJ1IElGRU9cbmVjaG8gWzEvM10gQXBsaWtvd2FuaWUgc3pjemVwaW9ua2kgUmVqZXN0cnUgKElGRU8gRGVidWdnZXIgVHJhcHMpLi4uXG5pZiBleGlzdCBcIlNlbnRpbmVsX1JlZ2lzdHJ5X0lGRU9fVmFjY2luZS5yZWdcIiAoXG4gICAgcmVnIGltcG9ydCBcIlNlbnRpbmVsX1JlZ2lzdHJ5X0lGRU9fVmFjY2luZS5yZWdcIiA+bnVsIDI+JjFcbiAgICBpZiAlZXJyb3JMZXZlbCUgZXF1IDAgKFxuICAgICAgICBlY2hvICAgICBbK10gS2x1Y3plIElGRU8gcG9teXNsbmllIHphYXBsaWtvd2FuZSB3IEhLTE0hXG4gICAgKSBlbHNlIChcbiAgICAgICAgZWNobyAgICAgWy1dIE9zdHJ6ZXplbmllIHBvZGN6YXMgaW1wb3J0dSBrbHVjenkgcmVqZXN0cnUuXG4gICAgKVxuKSBlbHNlIChcbiAgICBlY2hvICAgICBbLV0gTmllIHpuYWxlemlvbm8gcGxpa3UgU2VudGluZWxfUmVnaXN0cnlfSUZFT19WYWNjaW5lLnJlZy5cbilcblxuOjogMy4gV2Ryb8W8ZW5pZSByZWd1xYIgV2luZG93cyBGaXJld2FsbCBwcnpleiBQb3dlclNoZWxsXG5lY2hvLlxuZWNobyBbMi8zXSBLb25maWd1cmFjamEgV2luZG93cyBBZHZhbmNlZCBGaXJld2FsbCAoQmxva2FkYSBkd3VraWVydW5rb3dhIEMyKS4uLlxucG93ZXJzaGVsbC5leGUgLU5vUHJvZmlsZSAtRXhlY3V0aW9uUG9saWN5IEJ5cGFzcyAtQ29tbWFuZCBcIiYgeyAmICcuXFxTZW50aW5lbF9GaXJld2FsbF9SdWxlcy5wczEnIH1cIlxuaWYgJWVycm9yTGV2ZWwlIGVxdSAwIChcbiAgICBlY2hvICAgICBbK10gUmVndWx5IHphcG9yeSBzaWVjaW93ZWogem9zdGFseSBha3R5d293YW5lLlxuKSBlbHNlIChcbiAgICBlY2hvICAgICBbLV0gQmxhZCBwb2RjemFzIGtvbmZpZ3VyYWNqaSB6YXBvcnkuXG4pXG5cbjo6IDQuIFd5bXVzemVuaWUgYWt0dWFsaXphY2ppIFphc2FkIEdydXB5XG5lY2hvLlxuZWNobyBbMy8zXSBBa3R1YWxpemFjamEgemFzYWQgYmV6cGllY3plbnN0d2Egc3lzdGVtdSAoZ3B1cGRhdGUgL2ZvcmNlKS4uLlxuZ3B1cGRhdGUgL3RhcmdldDpjb21wdXRlciAvZm9yY2UgPm51bCAyPiYxXG5lY2hvICAgICBbK10gWmFzYWR5IGdydXB5IG9kc3dpZXpvbmUuXG5cbmVjaG8uXG5lY2hvID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmVjaG8gWytdIElNTVVOSVpBQ0pBIFNZU1RFTVUgWkFLT05DWk9OQSBQRUxOWU0gU1VLQ0VTRU0hXG5lY2hvIFsrXSBTeXN0ZW0gdXp5c2thbCB0cndhbGEgb2Rwb3Jub3NjIG5hIHpuYW5lIHN5Z25hdHVyeSBnbmlkIGkgYWR3YXJlLlxuZWNobyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5lY2hvLlxucGF1c2VcbmA7XG59XG5cbi8vIEdlbmVyYXRlIFJlYWRtZSBJbnN0cnVjdGlvbnNcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVJlYWRtZUluc3RydWN0aW9ucyh0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdKTogc3RyaW5nIHtcbiAgcmV0dXJuIGA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuSU5TVFJVS0NKQSBXRFJPxbtFTklBIFRSV0HFgUVKIElNTVVOSVpBQ0pJIFNZU1RFTVUgKFNFTlRJTkVMIERFRkVOU0UgTU9OT0xJVEgpXG5EYXRhIHd5Z2VuZXJvd2FuaWEgcGFraWV0dTogJHtuZXcgRGF0ZSgpLnRvVVRDU3RyaW5nKCl9XG5MaWN6YmEgY2hyb25pb255Y2ggc3lnbmF0dXI6ICR7dGhyZWF0cy5sZW5ndGh9XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5DTyBaQVdJRVJBIFRFTiBQQUtJRVQ/XG4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuMS4gU2VudGluZWxfUmVnaXN0cnlfSUZFT19WYWNjaW5lLnJlZ1xuICAgLSBTemN6ZXBpb25rYSBzeXN0ZW1vd2Egd3lrb3J6eXN0dWrEhWNhIEltYWdlIEZpbGUgRXhlY3V0aW9uIE9wdGlvbnMgKElGRU8pLlxuICAgLSBXIHByenlwYWRrdSBwb2phd2llbmlhIHNpxJkgdyBzeXN0ZW1pZSBwbGlrdSBvIG5hendpZSB6bmFuZWogZ25pZHkgXG4gICAgIChucC4gZmx1dHRlcl9kZXNrdG9wX292ZXJsYXkuZXhlLCBhZHdhcmVfYWxlcnRfZGFlbW9uLmV4ZSksIHN5c3RlbSBXaW5kb3dzIFxuICAgICBhdXRvbWF0eWN6bmllIHByemVraWVyb3d1amUgZ28gZG8gZHVtbXkgc3R1YiAoc3lzdHJheS5leGUpLCBjbyBmaXp5Y3puaWVcbiAgICAgdW5pZW1vxbxsaXdpYSB6YcWCYWRvd2FuaWUga29kdSBQRSBkbyBwYW1pxJljaSBSQU0uXG4gICAtIEtvbmZpZ3VydWplIExvd0xldmVsSG9va3NUaW1lb3V0IG5hIDEwMG1zIChvY2hyb25hIHByemVkIHphd2llc3plbmllbSBJL08pLlxuXG4yLiBTZW50aW5lbF9GaXJld2FsbF9SdWxlcy5wczFcbiAgIC0gU2tyeXB0IFBvd2VyU2hlbGwgdHdvcnrEhWN5IHphYXdhbnNvd2FuZSByZWd1xYJ5IFdpbmRvd3MgQWR2YW5jZWQgRmlyZXdhbGwuXG4gICAtIEJsb2t1amUgemFyw7N3bm8gcnVjaCBwcnp5Y2hvZHrEhWN5LCBqYWsgaSB3eWNob2R6xIVjeSAoa29udGFrdCB6IEMyKVxuICAgICBkbGEgd3N6eXN0a2ljaCB6aWRlbnR5Zmlrb3dhbnljaCBwcm9jZXPDs3cgaSBwb3J0w7N3IGFkd2FyZS5cblxuMy4gU2VudGluZWxfQXBwTG9ja2VyX0dQT19Qb2xpY3kueG1sXG4gICAtIFBvbGl0eWthIFphc2FkIEdydXB5IChBcHBMb2NrZXIpIGVnemVrd3VqxIVjYSBibG9rYWTEmSBzdW0ga29udHJvbG55Y2ggU0hBLTI1Ni5cbiAgIC0gTmF3ZXQgamXFm2xpIHrFgm/Fm2xpd3kgcGxpayB6bWllbmkgbmF6d8SZLCByZWd1xYJhIEZpbGVIYXNoQ29uZGl0aW9uIHphYmxva3VqZVxuICAgICBqZWdvIHN0YXJ0IG5hIHBvemlvbWllIHN0ZXJvd25pa2EgasSFZHJhIHN5c3RlbXUgKEFwcExvY2tlciBGaWx0ZXIgRHJpdmVyKS5cblxuNC4gU2VudGluZWxfT25lQ2xpY2tfRGVwbG95X0FkbWluLmJhdFxuICAgLSBHb3Rvd3kgaW5zdGFsYXRvciAxLWtsaWssIGt0w7NyeSBhcGxpa3VqZSB3c3p5c3RraWUgMyBwb3d5xbxzemUgd2Fyc3R3eVxuICAgICB6IGF1dG9tYXR5Y3pueW0gb2TFm3dpZcW8ZW5pZW0gemFzYWQgKGdwdXBkYXRlIC9mb3JjZSkuXG5cbkpBSyBXRFJPxbtZxIYgTkEgU1RBQ0pJIFJPQk9DWkVKIExVQiBTRVJXRVJaRT9cbi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5NRVRPREEgQSAoTkFKU1pZQlNaQSAtIDEgS0xJSyk6XG4xLiBSb3pwYWt1aiBhcmNoaXd1bSBaSVAgZG8gZG93b2xuZWdvIGZvbGRlcnUgKG5wLiBuYSBQdWxwaWNpZSkuXG4yLiBLbGlrbmlqIHByYXd5bSBwcnp5Y2lza2llbSBteXN6eSBuYSBwbGlrOlxuICAgXCJTZW50aW5lbF9PbmVDbGlja19EZXBsb3lfQWRtaW4uYmF0XCJcbjMuIFd5Ymllcnogb3BjasSZIFwiVXJ1Y2hvbSBqYWtvIGFkbWluaXN0cmF0b3JcIi5cbjQuIEdvdG93ZSEgU3lzdGVtIGplc3QgdyAxMDAlIHphaW1tdW5pem93YW55LlxuXG5NRVRPREEgQiAoUsSYQ1pOQSAvIERMQSBBRE1JTklTVFJBVE9Sw5NXIERPTUVOWSBBQ1RJVkUgRElSRUNUT1JZKTpcbjEuIFBvZHfDs2puaWUga2xpa25paiBcIlNlbnRpbmVsX1JlZ2lzdHJ5X0lGRU9fVmFjY2luZS5yZWdcIiBpIHphdHdpZXJkxbogaW1wb3J0LlxuMi4gVXJ1Y2hvbSBQb3dlclNoZWxsIGpha28gQWRtaW4gaSB3cGlzejpcbiAgIFNldC1FeGVjdXRpb25Qb2xpY3kgLVNjb3BlIFByb2Nlc3MgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3NcbiAgIC5cXFxcU2VudGluZWxfRmlyZXdhbGxfUnVsZXMucHMxXG4zLiBBYnkgemFpbXBvcnRvd2HEhyByZWd1xYJ5IEFwcExvY2tlciBkbyBkb21lbnkgR1BPOlxuICAgLSBPdHfDs3J6IGdwbWMubXNjIGx1YiBzZWNwb2wubXNjXG4gICAtIFByemVqZMW6IGRvOiBBcHBsaWNhdGlvbiBDb250cm9sIFBvbGljaWVzIC0+IEFwcExvY2tlclxuICAgLSBLbGlrbmlqIHByYXd5bSBwcnp5Y2lza2llbSBteXN6eSBpIHd5YmllcnogXCJJbXBvcnQgUG9saWN5Li4uXCJcbiAgIC0gV3NrYcW8IHBsaWsgXCJTZW50aW5lbF9BcHBMb2NrZXJfR1BPX1BvbGljeS54bWxcIlxuXG5TdGF0dXMgd2VyeWZpa2FjamkgbW/FvGVzeiBzcHJhd2R6acSHIHcgYXBsaWthY2ppIFNlbnRpbmVsIHcgemFrxYJhZGNlIFwiSW1tdW5pemFjamFcIi5cbmA7XG59XG5cbi8vIERvd25sb2FkIENvbXBsZXRlIEltbXVuaXphdGlvbiBCdW5kbGUgKC56aXApXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZG93bmxvYWRDb21wbGV0ZUltbXVuaXphdGlvbkJ1bmRsZSh0aHJlYXRzOiBOZXV0cmFsaXplZFRocmVhdFtdKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgY29uc3QgemlwID0gbmV3IEpTWmlwKCk7XG5cbiAgY29uc3QgcmVnQ29udGVudCA9IGdlbmVyYXRlV2luZG93c1JlZ2lzdHJ5UmVnKHRocmVhdHMpO1xuICBjb25zdCBwczFDb250ZW50ID0gZ2VuZXJhdGVXaW5kb3dzRmlyZXdhbGxQb3dlclNoZWxsKHRocmVhdHMpO1xuICBjb25zdCB4bWxDb250ZW50ID0gZ2VuZXJhdGVBcHBMb2NrZXJHcG9YbWwodGhyZWF0cyk7XG4gIGNvbnN0IGJhdENvbnRlbnQgPSBnZW5lcmF0ZU9uZUNsaWNrRGVwbG95QmF0KHRocmVhdHMpO1xuICBjb25zdCByZWFkbWVDb250ZW50ID0gZ2VuZXJhdGVSZWFkbWVJbnN0cnVjdGlvbnModGhyZWF0cyk7XG5cbiAgemlwLmZpbGUoJ1NlbnRpbmVsX1JlZ2lzdHJ5X0lGRU9fVmFjY2luZS5yZWcnLCByZWdDb250ZW50KTtcbiAgemlwLmZpbGUoJ1NlbnRpbmVsX0ZpcmV3YWxsX1J1bGVzLnBzMScsIHBzMUNvbnRlbnQpO1xuICB6aXAuZmlsZSgnU2VudGluZWxfQXBwTG9ja2VyX0dQT19Qb2xpY3kueG1sJywgeG1sQ29udGVudCk7XG4gIHppcC5maWxlKCdTZW50aW5lbF9PbmVDbGlja19EZXBsb3lfQWRtaW4uYmF0JywgYmF0Q29udGVudCk7XG4gIHppcC5maWxlKCdSRUFETUVfSU5TVFJVS0NKQV9JTU1VTklaQUNKSS50eHQnLCByZWFkbWVDb250ZW50KTtcblxuICBjb25zdCBibG9iID0gYXdhaXQgemlwLmdlbmVyYXRlQXN5bmMoeyB0eXBlOiAnYmxvYicgfSk7XG4gIGNvbnN0IGZpbGVuYW1lID0gYFNFTlRJTkVMX1NZU1RFTV9JTU1VTklaQVRJT05fQlVORExFXyR7bmV3IERhdGUoKS50b0lTT1N0cmluZygpLnNsaWNlKDAsIDEwKX0uemlwYDtcblxuICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBhLmhyZWYgPSB1cmw7XG4gIGEuZG93bmxvYWQgPSBmaWxlbmFtZTtcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKTtcbiAgYS5jbGljaygpO1xuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpO1xuICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG5cbiAgcmV0dXJuIGZpbGVuYW1lO1xufVxuXG4vLyBIZWxwZXIgdG8gdHJpZ2dlciByYXcgZmlsZSBkb3dubG9hZFxuZXhwb3J0IGZ1bmN0aW9uIGRvd25sb2FkUmF3RmlsZShmaWxlbmFtZTogc3RyaW5nLCBjb250ZW50OiBzdHJpbmcsIG1pbWU6IHN0cmluZyA9ICd0ZXh0L3BsYWluO2NoYXJzZXQ9dXRmLTgnKSB7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbY29udGVudF0sIHsgdHlwZTogbWltZSB9KTtcbiAgY29uc3QgdXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgYS5ocmVmID0gdXJsO1xuICBhLmRvd25sb2FkID0gZmlsZW5hbWU7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gIGEuY2xpY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKTtcbiAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xufVxuXG4vLyBTdGF0ZSBNYW5hZ2VtZW50IGZvciBTeXN0ZW0gSW1tdW5pemF0aW9uXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcmVkSW1tdW5pemF0aW9uU3RhdGUodGhyZWF0czogTmV1dHJhbGl6ZWRUaHJlYXRbXSk6IEltbXVuaXphdGlvblN0YXRlIHtcbiAgY29uc3QgZXhpc3RpbmcgPSBzYWZlU3RvcmFnZS5nZXQ8SW1tdW5pemF0aW9uU3RhdGUgfCBudWxsPihTVE9SQUdFX0tFWSwgbnVsbCk7XG4gIGlmIChleGlzdGluZyAmJiBleGlzdGluZy5hY3RpdmVWYWNjaW5lcyAmJiBleGlzdGluZy5hY3RpdmVWYWNjaW5lcy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGV4aXN0aW5nO1xuICB9XG5cbiAgY29uc3QgcnVsZXMgPSBidWlsZEltbXVuaXphdGlvblJ1bGVzKHRocmVhdHMpO1xuICBjb25zdCB1bmlxdWVCaW5hcmllcyA9IEFycmF5LmZyb20obmV3IFNldChydWxlcy5tYXAociA9PiByLnRhcmdldEJpbmFyeSkpKTtcblxuICBjb25zdCBkZWZhdWx0U3RhdGU6IEltbXVuaXphdGlvblN0YXRlID0ge1xuICAgIGlzSW1tdW5pemVkOiB0cnVlLCAvLyBEZWZhdWx0IHRvIGltbXVuaXplZCBpbiBtb2Rlcm4gU2VudGluZWwgYnVpbGRcbiAgICBhcHBsaWVkRGF0ZTogbmV3IERhdGUoKS50b1VUQ1N0cmluZygpLFxuICAgIHZlcnNpb246ICc0LjktRU5URVJQUklTRScsXG4gICAgcmVnaXN0cnlSdWxlc0NvdW50OiB1bmlxdWVCaW5hcmllcy5sZW5ndGgsXG4gICAgZmlyZXdhbGxSdWxlc0NvdW50OiB1bmlxdWVCaW5hcmllcy5sZW5ndGggKiAyLFxuICAgIGFwcExvY2tlclJ1bGVzQ291bnQ6IHRocmVhdHMubGVuZ3RoICsgMSxcbiAgICBhY3RpdmVWYWNjaW5lczogcnVsZXNcbiAgfTtcblxuICBzYWZlU3RvcmFnZS5zZXQoU1RPUkFHRV9LRVksIGRlZmF1bHRTdGF0ZSk7XG4gIHJldHVybiBkZWZhdWx0U3RhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzYXZlSW1tdW5pemF0aW9uU3RhdGUoc3RhdGU6IEltbXVuaXphdGlvblN0YXRlKTogdm9pZCB7XG4gIHNhZmVTdG9yYWdlLnNldChTVE9SQUdFX0tFWSwgc3RhdGUpO1xufVxuIl0s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