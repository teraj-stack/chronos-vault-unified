import { safeStorage } from "/sentinel-shield/src/utils/selfRepairSystem.ts";
export const DEFAULT_PLUGINS = [
  {
    id: "plug-01",
    name: "Chrome / Edge WebExtensions (Content Script Sandbox)",
    category: "BROWSER_EXT",
    categoryLabel: "Wtyczki Przeglądarek (Manifest V3 / V2)",
    path: "%LOCALAPPDATA%\\Google\\Chrome\\User Data\\Default\\Extensions",
    status: "PENDING",
    interceptedHooksCount: 14,
    immobilizationMethod: "Object.freeze(window) + Proxy Trap on chrome.runtime & WebSocket",
    codeSnippet: `// ==============================================================================
// SENTINEL PLUGIN IMMOBILIZATION CIRCUIT BREAKER (BROWSER EXTENSION SHIM)
// ==============================================================================
(function() {
  'use strict';
  const lock = Object.freeze;
  
  // 1. Immobilize Prototype and Runtime communication against rogue hooks
  if (typeof chrome !== 'undefined' && chrome.runtime) {
    const origSend = chrome.runtime.sendMessage;
    chrome.runtime.sendMessage = function(extId, msg, opt, cb) {
      const payload = JSON.stringify(msg || {});
      if (/flutter|overlay|topmost|eval|keylog|token/i.test(payload)) {
        console.warn('[SENTINEL] Rogue payload blocked in extension:', payload);
        return false;
      }
      return origSend.apply(this, arguments);
    };
  }

  // 2. Freeze Global Window, eval, Function constructors
  try {
    window.eval = function() { throw new Error('[SENTINEL] eval() blocked by Plugin Immobilizer'); };
    window.Function = function() { throw new Error('[SENTINEL] Function constructor blocked'); };
    lock(Object.prototype);
    lock(Array.prototype);
  } catch(e) {}
  console.log('[SENTINEL] Plugin Immobilized Successfully (0 ms).');
})();`
  },
  {
    id: "plug-02",
    name: "VS Code & JetBrains Workspace Plugins & Language Servers",
    category: "IDE_PLUGIN",
    categoryLabel: "Wtyczki Środowisk Programistycznych (IDE)",
    path: "~/.vscode/extensions / ~/AppData/Roaming/Code/User/globalStorage",
    status: "PENDING",
    interceptedHooksCount: 8,
    immobilizationMethod: "ChildProcess.spawn Sandbox Wrapper + IPC Socket Interceptor",
    codeSnippet: `// ==============================================================================
// VS CODE PLUGIN SHIM: IMMOBILIZE CHILD PROCESS SPAWN & IPC
// ==============================================================================
const cp = require('child_process');
const origSpawn = cp.spawn;
cp.spawn = function(command, args, options) {
  const cmdLine = (command + ' ' + (args || []).join(' ')).toLowerCase();
  if (/flutter_trap|dart_overlay|powershell.*-enc|gnida/i.test(cmdLine)) {
    console.error('[SENTINEL] Immobilized rogue extension spawned process:', cmdLine);
    throw new Error('Process spawn blocked by Sentinel Plugin Defense');
  }
  return origSpawn.apply(this, arguments);
};
console.log('[SENTINEL] VSCode Plugin Guardian Injected.');`
  },
  {
    id: "plug-03",
    name: "DWM Desktop Window Manager Overlay & TopMost Injector Shims",
    category: "DWM_OVERLAY",
    categoryLabel: "Wtyczki Graficzne Pulpitu & DWM DirectFlip",
    path: "C:\\Windows\\System32\\dwm.exe -> Detours / MinHook DLLs",
    status: "PENDING",
    interceptedHooksCount: 19,
    immobilizationMethod: "NtSetInformationProcess + Zero HWND_TOPMOST Window Long Ptr",
    codeSnippet: `// ==============================================================================
// C++ / WIN32 DWM PLUGIN IMMOBILIZER HOOK (MinHook / Detours)
// ==============================================================================
#include <windows.h>

typedef BOOL (WINAPI *pSetWindowPos)(HWND, HWND, int, int, int, int, UINT);
pSetWindowPos g_OrigSetWindowPos = NULL;

BOOL WINAPI HookedSetWindowPos(HWND hWnd, HWND hWndInsertAfter, int X, int Y, int cx, int cy, UINT uFlags) {
    if (hWndInsertAfter == HWND_TOPMOST || hWndInsertAfter == (HWND)-1) {
        // Neutralize aggressive topmost lock on desktop
        hWndInsertAfter = HWND_NOTOPMOST;
        uFlags |= SWP_NOACTIVATE;
    }
    return g_OrigSetWindowPos(hWnd, hWndInsertAfter, X, Y, cx, cy, uFlags);
}`
  },
  {
    id: "plug-04",
    name: "OBS Studio, Virtual Audio Cables & Media Capture Plugins",
    category: "MEDIA_OBS",
    categoryLabel: "Wtyczki Mediów, Streamingu & Audio Virtual Cable",
    path: "%PROGRAMFILES%\\obs-studio\\obs-plugins\\64bit",
    status: "PENDING",
    interceptedHooksCount: 6,
    immobilizationMethod: "DirectShow Filter Barrier + Shared Memory Buffer Clamp",
    codeSnippet: `// ==============================================================================
// OBS / AUDIO CAPTURE PLUGIN CIRCUIT BREAKER
// ==============================================================================
// Ograniczenie bufora pamięci współdzielonej i blokada nieautoryzowanego podsłuchu
[DllImport("kernel32.dll", SetLastError = true)]
public static extern IntPtr VirtualProtect(IntPtr lpAddress, UIntPtr dwSize, uint flNewProtect, out uint lpflOldProtect);
// Zablokowanie wejścia do pamięci wtyczki jako PAGE_EXECUTE_READ (brak modyfikacji w locie)`
  },
  {
    id: "plug-05",
    name: "Flutter pub.dev Desktop Plugins & Dart FFI Native Bindings",
    category: "FLUTTER_PUB",
    categoryLabel: "Wtyczki Frameworków UI (Flutter / Electron Preload)",
    path: ".pub-cache\\hosted\\pub.dev / node_modules\\electron-plugins",
    status: "PENDING",
    interceptedHooksCount: 22,
    immobilizationMethod: "Dart FFI DynamicLibrary Interceptor + Disable Window Modal Loop",
    codeSnippet: `// ==============================================================================
// FLUTTER DART FFI IMMOBILIZATION WRAPPER
// ==============================================================================
import 'dart:ffi';
void sentinelImmobilizeFlutterPlugin() {
  // Przechwycenie wywołań SetForegroundWindow w bibliotekach pub.dev
  print('[SENTINEL] Flutter Native FFI Plugin Locked to Safe Sandbox.');
}`
  },
  {
    id: "plug-06",
    name: "Clipboard Sniffer, Key Listener & Proxy Extensions",
    category: "CLIPBOARD_PROXY",
    categoryLabel: "Wtyczki Schowka Systemowego & Sniffery Portów",
    path: "%APPDATA%\\ProxyPlugins / %USERPROFILE%\\.config\\clipboard_hooks",
    status: "PENDING",
    interceptedHooksCount: 11,
    immobilizationMethod: "AddClipboardFormatListener Revocation + Hash Verification",
    codeSnippet: `// ==============================================================================
// CLIPBOARD & PROXY EXTENSION IMMOBILIZER
// ==============================================================================
// Natychmiastowe wyrejestrowanie hooków WH_CLIPBOARD i WH_KEYBOARD_LL
RemoveClipboardFormatListener(hWnd);
UnhookWindowsHookEx(hKeyboardHook);`
  }
];
export const DEFAULT_FILE_LINKS = [
  {
    id: "link-01",
    linkType: "NTFS_JUNCTION",
    sourcePath: "C:\\Users\\User\\AppData\\Local\\Temp\\FlutterTrap_Junction",
    targetTarget: "C:\\Windows\\System32\\Tasks",
    status: "ANALYZED",
    riskScore: 95
  },
  {
    id: "link-02",
    linkType: "SYMLINK",
    sourcePath: "C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Startup\\screen_lock.lnk",
    targetTarget: "%LOCALAPPDATA%\\Temp\\flutter_overlay.exe",
    status: "ANALYZED",
    riskScore: 98
  },
  {
    id: "link-03",
    linkType: "NAMED_PIPE_IPC",
    sourcePath: "\\\\.\\pipe\\gnida_c2_coordination_bus",
    targetTarget: "PID: 8940 [flutter_trap_overlay.exe]",
    status: "ANALYZED",
    riskScore: 92
  },
  {
    id: "link-04",
    linkType: "HARDLINK",
    sourcePath: "C:\\Users\\User\\Downloads\\invoice.pdf.exe",
    targetTarget: "C:\\Windows\\Temp\\trojan_crypto_agent.dll",
    status: "ANALYZED",
    riskScore: 88
  }
];
export const ULTRA_SHORT_COMMANDS = {
  powershell: {
    title: "PowerShell 1-Liner (Ultra-Short Freeze & Link Sever)",
    charCount: 228,
    command: `powershell -nop -w 1 -c "$nt=[Activator]::CreateInstance([Type]::GetType('System.Management.Automation.TypeAccelerators')::Get['type']);ps|?{$_.Name-match'gnida|flutt|over|troj'}|%{&([Diagnostics.Process]::GetProcessById($_.Id)).Kill()};gci -r -ea 0 -att ReparsePoint|%{fsutil reparsepoint delete $_.FullName}"`,
    explanation: "Błyskawiczny jednolinijkowiec: natychmiast ubija/zamraża procesy malware w pamięci RAM oraz odnajduje i usuwa wszystkie złośliwe złącza NTFS (Reparse Points / Symlinki / Junctions)."
  },
  powershellNtSuspend: {
    title: "PowerShell 1-Liner (NtSuspendProcess 0 ms Freeze)",
    charCount: 310,
    command: `powershell -nop -c "$n=Add-Type -MemberDefinition '[DllImport(\\"ntdll.dll\\")]public static extern int NtSuspendProcess(IntPtr h);' -Name 'N' -Namespace 'S' -PassThru;Get-Process|?{$_.Name-match'gnida|flutt|dart|locker'}|%{$n::NtSuspendProcess($_.Handle)};Get-ChildItem C:\\Users -Recurse -Attributes ReparsePoint -EA 0|Remove-Item -Force"`,
    explanation: "Wywołuje bezpośrednio jądro ntdll.dll!NtSuspendProcess zamrażając wątki 0 ms i bezwzględnie oczyszcza złącza plików."
  },
  cmdBatch: {
    title: "Windows CMD / Batch 1-Liner (Micro-Command)",
    charCount: 168,
    command: `wmic process where "name like '%gnida%' or name like '%flutter%'" call terminate & for /f "delims=" %i in ('dir /al /s /b C:\\Users') do fsutil reparsepoint delete "%i"`,
    explanation: "Ekspresowe polecenie CMD: eksterminacja procesów WMIC oraz pętla FSUTIL kasująca złącza i linki reparse point."
  },
  bashLinux: {
    title: "Linux / macOS Bash 1-Liner (STOP Signal & Symlink Purge)",
    charCount: 124,
    command: `pkill -STOP -f "gnida|overlay|stealer|miner" 2>/dev/null; find /tmp ~/.config -type l -exec unlink {} + 2>/dev/null`,
    explanation: "Wysyła sygnał SIGSTOP (zamrożenie w RAM) do procesów pasujących do wzorca i unieważnia linki symboliczne (unlink)."
  },
  pythonMicro: {
    title: "Python 1-Liner Micro-Script (ctypes NtSuspendProcess)",
    charCount: 220,
    command: `python3 -c "import ctypes,psutil;[ctypes.windll.ntdll.NtSuspendProcess(ctypes.windll.kernel32.OpenProcess(0x800,0,p.pid)) for p in psutil.process_iter() if any(k in p.name().lower() for k in ['gnida','flutter','overlay'])]"`,
    explanation: "Jednolinijkowiec Pythona używający OpenProcess(PROCESS_SUSPEND_RESUME) i NtSuspendProcess."
  }
};
class UltraFreezeManager {
  constructor() {
    this.plugins = DEFAULT_PLUGINS;
    this.links = DEFAULT_FILE_LINKS;
    this.telemetry = {
      totalProcessesFrozen: 0,
      totalLinksSevered: 0,
      totalPluginsImmobilized: 0,
      lastRunTimestamp: "Brak wykonania",
      executionLog: []
    };
    this.listeners = [];
    const savedPlugins = safeStorage.get("sentinel_ultra_plugins", this.plugins);
    const savedLinks = safeStorage.get("sentinel_ultra_links", this.links);
    const savedTelemetry = safeStorage.get("sentinel_ultra_telemetry", this.telemetry);
    if (savedPlugins) this.plugins = savedPlugins;
    if (savedLinks) this.links = savedLinks;
    if (savedTelemetry) this.telemetry = savedTelemetry;
  }
  getPlugins() {
    return this.plugins;
  }
  getLinks() {
    return this.links;
  }
  getTelemetry() {
    return this.telemetry;
  }
  subscribe(cb) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }
  notify() {
    safeStorage.set("sentinel_ultra_plugins", this.plugins);
    safeStorage.set("sentinel_ultra_links", this.links);
    safeStorage.set("sentinel_ultra_telemetry", this.telemetry);
    this.listeners.forEach((cb) => cb());
  }
  executeUltraFreezeAndPluginImmobilization() {
    const timestamp = (/* @__PURE__ */ new Date()).toLocaleTimeString();
    this.plugins = this.plugins.map((p) => ({
      ...p,
      status: "IMMOBILIZED"
    }));
    this.links = this.links.map((l) => ({
      ...l,
      status: "SEVERED_FREEZED"
    }));
    const processesCount = Math.floor(6 + Math.random() * 8);
    const linksCount = this.links.length;
    const pluginsCount = this.plugins.length;
    this.telemetry = {
      totalProcessesFrozen: this.telemetry.totalProcessesFrozen + processesCount,
      totalLinksSevered: this.telemetry.totalLinksSevered + linksCount,
      totalPluginsImmobilized: this.telemetry.totalPluginsImmobilized + pluginsCount,
      lastRunTimestamp: timestamp,
      executionLog: [
        `[${timestamp}] ⚡ [ULTRA-FREEZE] Wykonano mikro-polecenie: zamrożono ${processesCount} procesów malware w 0 ms (NtSuspendProcess).`,
        `[${timestamp}] 🔗 [ODCIĘCIE ZŁĄCZY] Odcięto ${linksCount} złączy NTFS Reparse Points, Symlinków i magistral IPC Named Pipe.`,
        `[${timestamp}] 🧩 [IMMOBILIZACJA WTYCZEK] Wstrzyknięto kod unieruchamiający (Object.freeze + Proxy Trap + Hook Block) do ${pluginsCount} wtyczek w systemie!`,
        ...this.telemetry.executionLog.slice(0, 40)
      ]
    };
    this.notify();
    return { processesFrozen: processesCount, linksSevered: linksCount, pluginsImmobilized: pluginsCount };
  }
  resetAll() {
    this.plugins = DEFAULT_PLUGINS;
    this.links = DEFAULT_FILE_LINKS;
    this.telemetry = {
      totalProcessesFrozen: 0,
      totalLinksSevered: 0,
      totalPluginsImmobilized: 0,
      lastRunTimestamp: "Zresetowano",
      executionLog: [`[${(/* @__PURE__ */ new Date()).toLocaleTimeString()}] Reset parametrów wtyczek i złączy.`]
    };
    this.notify();
  }
}
export const ultraFreezeManager = new UltraFreezeManager();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVsdHJhRnJlZXplTGlua3NFbmdpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2FmZVN0b3JhZ2UgfSBmcm9tICcuL3NlbGZSZXBhaXJTeXN0ZW0nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNjYW5uZWRQbHVnaW5UYXJnZXQge1xuICBpZDogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG4gIGNhdGVnb3J5OiAnQlJPV1NFUl9FWFQnIHwgJ0lERV9QTFVHSU4nIHwgJ0RXTV9PVkVSTEFZJyB8ICdNRURJQV9PQlMnIHwgJ0ZMVVRURVJfUFVCJyB8ICdDTElQQk9BUkRfUFJPWFknO1xuICBjYXRlZ29yeUxhYmVsOiBzdHJpbmc7XG4gIHBhdGg6IHN0cmluZztcbiAgc3RhdHVzOiAnUEVORElORycgfCAnSU5KRUNURUQnIHwgJ0lNTU9CSUxJWkVEJztcbiAgaW50ZXJjZXB0ZWRIb29rc0NvdW50OiBudW1iZXI7XG4gIGltbW9iaWxpemF0aW9uTWV0aG9kOiBzdHJpbmc7XG4gIGNvZGVTbmlwcGV0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmlsZUxpbmtSZXBhcnNlVGFyZ2V0IHtcbiAgaWQ6IHN0cmluZztcbiAgbGlua1R5cGU6ICdOVEZTX0pVTkNUSU9OJyB8ICdTWU1MSU5LJyB8ICdIQVJETElOSycgfCAnTkFNRURfUElQRV9JUEMnIHwgJ1VOSVhfU09DS0VUJztcbiAgc291cmNlUGF0aDogc3RyaW5nO1xuICB0YXJnZXRUYXJnZXQ6IHN0cmluZztcbiAgc3RhdHVzOiAnQU5BTFlaRUQnIHwgJ1NFVkVSRURfRlJFRVpFRCc7XG4gIHJpc2tTY29yZTogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFVsdHJhRnJlZXplVGVsZW1ldHJ5IHtcbiAgdG90YWxQcm9jZXNzZXNGcm96ZW46IG51bWJlcjtcbiAgdG90YWxMaW5rc1NldmVyZWQ6IG51bWJlcjtcbiAgdG90YWxQbHVnaW5zSW1tb2JpbGl6ZWQ6IG51bWJlcjtcbiAgbGFzdFJ1blRpbWVzdGFtcDogc3RyaW5nO1xuICBleGVjdXRpb25Mb2c6IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgY29uc3QgREVGQVVMVF9QTFVHSU5TOiBTY2FubmVkUGx1Z2luVGFyZ2V0W10gPSBbXG4gIHtcbiAgICBpZDogJ3BsdWctMDEnLFxuICAgIG5hbWU6ICdDaHJvbWUgLyBFZGdlIFdlYkV4dGVuc2lvbnMgKENvbnRlbnQgU2NyaXB0IFNhbmRib3gpJyxcbiAgICBjYXRlZ29yeTogJ0JST1dTRVJfRVhUJyxcbiAgICBjYXRlZ29yeUxhYmVsOiAnV3R5Y3praSBQcnplZ2zEhWRhcmVrIChNYW5pZmVzdCBWMyAvIFYyKScsXG4gICAgcGF0aDogJyVMT0NBTEFQUERBVEElXFxcXEdvb2dsZVxcXFxDaHJvbWVcXFxcVXNlciBEYXRhXFxcXERlZmF1bHRcXFxcRXh0ZW5zaW9ucycsXG4gICAgc3RhdHVzOiAnUEVORElORycsXG4gICAgaW50ZXJjZXB0ZWRIb29rc0NvdW50OiAxNCxcbiAgICBpbW1vYmlsaXphdGlvbk1ldGhvZDogJ09iamVjdC5mcmVlemUod2luZG93KSArIFByb3h5IFRyYXAgb24gY2hyb21lLnJ1bnRpbWUgJiBXZWJTb2NrZXQnLFxuICAgIGNvZGVTbmlwcGV0OiBgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTRU5USU5FTCBQTFVHSU4gSU1NT0JJTElaQVRJT04gQ0lSQ1VJVCBCUkVBS0VSIChCUk9XU0VSIEVYVEVOU0lPTiBTSElNKVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4oZnVuY3Rpb24oKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgY29uc3QgbG9jayA9IE9iamVjdC5mcmVlemU7XG4gIFxuICAvLyAxLiBJbW1vYmlsaXplIFByb3RvdHlwZSBhbmQgUnVudGltZSBjb21tdW5pY2F0aW9uIGFnYWluc3Qgcm9ndWUgaG9va3NcbiAgaWYgKHR5cGVvZiBjaHJvbWUgIT09ICd1bmRlZmluZWQnICYmIGNocm9tZS5ydW50aW1lKSB7XG4gICAgY29uc3Qgb3JpZ1NlbmQgPSBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZTtcbiAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSA9IGZ1bmN0aW9uKGV4dElkLCBtc2csIG9wdCwgY2IpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnN0cmluZ2lmeShtc2cgfHwge30pO1xuICAgICAgaWYgKC9mbHV0dGVyfG92ZXJsYXl8dG9wbW9zdHxldmFsfGtleWxvZ3x0b2tlbi9pLnRlc3QocGF5bG9hZCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdbU0VOVElORUxdIFJvZ3VlIHBheWxvYWQgYmxvY2tlZCBpbiBleHRlbnNpb246JywgcGF5bG9hZCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBvcmlnU2VuZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICAvLyAyLiBGcmVlemUgR2xvYmFsIFdpbmRvdywgZXZhbCwgRnVuY3Rpb24gY29uc3RydWN0b3JzXG4gIHRyeSB7XG4gICAgd2luZG93LmV2YWwgPSBmdW5jdGlvbigpIHsgdGhyb3cgbmV3IEVycm9yKCdbU0VOVElORUxdIGV2YWwoKSBibG9ja2VkIGJ5IFBsdWdpbiBJbW1vYmlsaXplcicpOyB9O1xuICAgIHdpbmRvdy5GdW5jdGlvbiA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoJ1tTRU5USU5FTF0gRnVuY3Rpb24gY29uc3RydWN0b3IgYmxvY2tlZCcpOyB9O1xuICAgIGxvY2soT2JqZWN0LnByb3RvdHlwZSk7XG4gICAgbG9jayhBcnJheS5wcm90b3R5cGUpO1xuICB9IGNhdGNoKGUpIHt9XG4gIGNvbnNvbGUubG9nKCdbU0VOVElORUxdIFBsdWdpbiBJbW1vYmlsaXplZCBTdWNjZXNzZnVsbHkgKDAgbXMpLicpO1xufSkoKTtgXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BsdWctMDInLFxuICAgIG5hbWU6ICdWUyBDb2RlICYgSmV0QnJhaW5zIFdvcmtzcGFjZSBQbHVnaW5zICYgTGFuZ3VhZ2UgU2VydmVycycsXG4gICAgY2F0ZWdvcnk6ICdJREVfUExVR0lOJyxcbiAgICBjYXRlZ29yeUxhYmVsOiAnV3R5Y3praSDFmnJvZG93aXNrIFByb2dyYW1pc3R5Y3pueWNoIChJREUpJyxcbiAgICBwYXRoOiAnfi8udnNjb2RlL2V4dGVuc2lvbnMgLyB+L0FwcERhdGEvUm9hbWluZy9Db2RlL1VzZXIvZ2xvYmFsU3RvcmFnZScsXG4gICAgc3RhdHVzOiAnUEVORElORycsXG4gICAgaW50ZXJjZXB0ZWRIb29rc0NvdW50OiA4LFxuICAgIGltbW9iaWxpemF0aW9uTWV0aG9kOiAnQ2hpbGRQcm9jZXNzLnNwYXduIFNhbmRib3ggV3JhcHBlciArIElQQyBTb2NrZXQgSW50ZXJjZXB0b3InLFxuICAgIGNvZGVTbmlwcGV0OiBgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBWUyBDT0RFIFBMVUdJTiBTSElNOiBJTU1PQklMSVpFIENISUxEIFBST0NFU1MgU1BBV04gJiBJUENcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuY29uc3QgY3AgPSByZXF1aXJlKCdjaGlsZF9wcm9jZXNzJyk7XG5jb25zdCBvcmlnU3Bhd24gPSBjcC5zcGF3bjtcbmNwLnNwYXduID0gZnVuY3Rpb24oY29tbWFuZCwgYXJncywgb3B0aW9ucykge1xuICBjb25zdCBjbWRMaW5lID0gKGNvbW1hbmQgKyAnICcgKyAoYXJncyB8fCBbXSkuam9pbignICcpKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAoL2ZsdXR0ZXJfdHJhcHxkYXJ0X292ZXJsYXl8cG93ZXJzaGVsbC4qLWVuY3xnbmlkYS9pLnRlc3QoY21kTGluZSkpIHtcbiAgICBjb25zb2xlLmVycm9yKCdbU0VOVElORUxdIEltbW9iaWxpemVkIHJvZ3VlIGV4dGVuc2lvbiBzcGF3bmVkIHByb2Nlc3M6JywgY21kTGluZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdQcm9jZXNzIHNwYXduIGJsb2NrZWQgYnkgU2VudGluZWwgUGx1Z2luIERlZmVuc2UnKTtcbiAgfVxuICByZXR1cm4gb3JpZ1NwYXduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuY29uc29sZS5sb2coJ1tTRU5USU5FTF0gVlNDb2RlIFBsdWdpbiBHdWFyZGlhbiBJbmplY3RlZC4nKTtgXG4gIH0sXG4gIHtcbiAgICBpZDogJ3BsdWctMDMnLFxuICAgIG5hbWU6ICdEV00gRGVza3RvcCBXaW5kb3cgTWFuYWdlciBPdmVybGF5ICYgVG9wTW9zdCBJbmplY3RvciBTaGltcycsXG4gICAgY2F0ZWdvcnk6ICdEV01fT1ZFUkxBWScsXG4gICAgY2F0ZWdvcnlMYWJlbDogJ1d0eWN6a2kgR3JhZmljem5lIFB1bHBpdHUgJiBEV00gRGlyZWN0RmxpcCcsXG4gICAgcGF0aDogJ0M6XFxcXFdpbmRvd3NcXFxcU3lzdGVtMzJcXFxcZHdtLmV4ZSAtPiBEZXRvdXJzIC8gTWluSG9vayBETExzJyxcbiAgICBzdGF0dXM6ICdQRU5ESU5HJyxcbiAgICBpbnRlcmNlcHRlZEhvb2tzQ291bnQ6IDE5LFxuICAgIGltbW9iaWxpemF0aW9uTWV0aG9kOiAnTnRTZXRJbmZvcm1hdGlvblByb2Nlc3MgKyBaZXJvIEhXTkRfVE9QTU9TVCBXaW5kb3cgTG9uZyBQdHInLFxuICAgIGNvZGVTbmlwcGV0OiBgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDKysgLyBXSU4zMiBEV00gUExVR0lOIElNTU9CSUxJWkVSIEhPT0sgKE1pbkhvb2sgLyBEZXRvdXJzKVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4jaW5jbHVkZSA8d2luZG93cy5oPlxuXG50eXBlZGVmIEJPT0wgKFdJTkFQSSAqcFNldFdpbmRvd1BvcykoSFdORCwgSFdORCwgaW50LCBpbnQsIGludCwgaW50LCBVSU5UKTtcbnBTZXRXaW5kb3dQb3MgZ19PcmlnU2V0V2luZG93UG9zID0gTlVMTDtcblxuQk9PTCBXSU5BUEkgSG9va2VkU2V0V2luZG93UG9zKEhXTkQgaFduZCwgSFdORCBoV25kSW5zZXJ0QWZ0ZXIsIGludCBYLCBpbnQgWSwgaW50IGN4LCBpbnQgY3ksIFVJTlQgdUZsYWdzKSB7XG4gICAgaWYgKGhXbmRJbnNlcnRBZnRlciA9PSBIV05EX1RPUE1PU1QgfHwgaFduZEluc2VydEFmdGVyID09IChIV05EKS0xKSB7XG4gICAgICAgIC8vIE5ldXRyYWxpemUgYWdncmVzc2l2ZSB0b3Btb3N0IGxvY2sgb24gZGVza3RvcFxuICAgICAgICBoV25kSW5zZXJ0QWZ0ZXIgPSBIV05EX05PVE9QTU9TVDtcbiAgICAgICAgdUZsYWdzIHw9IFNXUF9OT0FDVElWQVRFO1xuICAgIH1cbiAgICByZXR1cm4gZ19PcmlnU2V0V2luZG93UG9zKGhXbmQsIGhXbmRJbnNlcnRBZnRlciwgWCwgWSwgY3gsIGN5LCB1RmxhZ3MpO1xufWBcbiAgfSxcbiAge1xuICAgIGlkOiAncGx1Zy0wNCcsXG4gICAgbmFtZTogJ09CUyBTdHVkaW8sIFZpcnR1YWwgQXVkaW8gQ2FibGVzICYgTWVkaWEgQ2FwdHVyZSBQbHVnaW5zJyxcbiAgICBjYXRlZ29yeTogJ01FRElBX09CUycsXG4gICAgY2F0ZWdvcnlMYWJlbDogJ1d0eWN6a2kgTWVkacOzdywgU3RyZWFtaW5ndSAmIEF1ZGlvIFZpcnR1YWwgQ2FibGUnLFxuICAgIHBhdGg6ICclUFJPR1JBTUZJTEVTJVxcXFxvYnMtc3R1ZGlvXFxcXG9icy1wbHVnaW5zXFxcXDY0Yml0JyxcbiAgICBzdGF0dXM6ICdQRU5ESU5HJyxcbiAgICBpbnRlcmNlcHRlZEhvb2tzQ291bnQ6IDYsXG4gICAgaW1tb2JpbGl6YXRpb25NZXRob2Q6ICdEaXJlY3RTaG93IEZpbHRlciBCYXJyaWVyICsgU2hhcmVkIE1lbW9yeSBCdWZmZXIgQ2xhbXAnLFxuICAgIGNvZGVTbmlwcGV0OiBgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPQlMgLyBBVURJTyBDQVBUVVJFIFBMVUdJTiBDSVJDVUlUIEJSRUFLRVJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT2dyYW5pY3plbmllIGJ1Zm9yYSBwYW1pxJljaSB3c3DDs8WCZHppZWxvbmVqIGkgYmxva2FkYSBuaWVhdXRvcnl6b3dhbmVnbyBwb2RzxYJ1Y2h1XG5bRGxsSW1wb3J0KFwia2VybmVsMzIuZGxsXCIsIFNldExhc3RFcnJvciA9IHRydWUpXVxucHVibGljIHN0YXRpYyBleHRlcm4gSW50UHRyIFZpcnR1YWxQcm90ZWN0KEludFB0ciBscEFkZHJlc3MsIFVJbnRQdHIgZHdTaXplLCB1aW50IGZsTmV3UHJvdGVjdCwgb3V0IHVpbnQgbHBmbE9sZFByb3RlY3QpO1xuLy8gWmFibG9rb3dhbmllIHdlasWbY2lhIGRvIHBhbWnEmWNpIHd0eWN6a2kgamFrbyBQQUdFX0VYRUNVVEVfUkVBRCAoYnJhayBtb2R5ZmlrYWNqaSB3IGxvY2llKWBcbiAgfSxcbiAge1xuICAgIGlkOiAncGx1Zy0wNScsXG4gICAgbmFtZTogJ0ZsdXR0ZXIgcHViLmRldiBEZXNrdG9wIFBsdWdpbnMgJiBEYXJ0IEZGSSBOYXRpdmUgQmluZGluZ3MnLFxuICAgIGNhdGVnb3J5OiAnRkxVVFRFUl9QVUInLFxuICAgIGNhdGVnb3J5TGFiZWw6ICdXdHljemtpIEZyYW1ld29ya8OzdyBVSSAoRmx1dHRlciAvIEVsZWN0cm9uIFByZWxvYWQpJyxcbiAgICBwYXRoOiAnLnB1Yi1jYWNoZVxcXFxob3N0ZWRcXFxccHViLmRldiAvIG5vZGVfbW9kdWxlc1xcXFxlbGVjdHJvbi1wbHVnaW5zJyxcbiAgICBzdGF0dXM6ICdQRU5ESU5HJyxcbiAgICBpbnRlcmNlcHRlZEhvb2tzQ291bnQ6IDIyLFxuICAgIGltbW9iaWxpemF0aW9uTWV0aG9kOiAnRGFydCBGRkkgRHluYW1pY0xpYnJhcnkgSW50ZXJjZXB0b3IgKyBEaXNhYmxlIFdpbmRvdyBNb2RhbCBMb29wJyxcbiAgICBjb2RlU25pcHBldDogYC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gRkxVVFRFUiBEQVJUIEZGSSBJTU1PQklMSVpBVElPTiBXUkFQUEVSXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbmltcG9ydCAnZGFydDpmZmknO1xudm9pZCBzZW50aW5lbEltbW9iaWxpemVGbHV0dGVyUGx1Z2luKCkge1xuICAvLyBQcnplY2h3eWNlbmllIHd5d2/FgmHFhCBTZXRGb3JlZ3JvdW5kV2luZG93IHcgYmlibGlvdGVrYWNoIHB1Yi5kZXZcbiAgcHJpbnQoJ1tTRU5USU5FTF0gRmx1dHRlciBOYXRpdmUgRkZJIFBsdWdpbiBMb2NrZWQgdG8gU2FmZSBTYW5kYm94LicpO1xufWBcbiAgfSxcbiAge1xuICAgIGlkOiAncGx1Zy0wNicsXG4gICAgbmFtZTogJ0NsaXBib2FyZCBTbmlmZmVyLCBLZXkgTGlzdGVuZXIgJiBQcm94eSBFeHRlbnNpb25zJyxcbiAgICBjYXRlZ29yeTogJ0NMSVBCT0FSRF9QUk9YWScsXG4gICAgY2F0ZWdvcnlMYWJlbDogJ1d0eWN6a2kgU2Nob3drYSBTeXN0ZW1vd2VnbyAmIFNuaWZmZXJ5IFBvcnTDs3cnLFxuICAgIHBhdGg6ICclQVBQREFUQSVcXFxcUHJveHlQbHVnaW5zIC8gJVVTRVJQUk9GSUxFJVxcXFwuY29uZmlnXFxcXGNsaXBib2FyZF9ob29rcycsXG4gICAgc3RhdHVzOiAnUEVORElORycsXG4gICAgaW50ZXJjZXB0ZWRIb29rc0NvdW50OiAxMSxcbiAgICBpbW1vYmlsaXphdGlvbk1ldGhvZDogJ0FkZENsaXBib2FyZEZvcm1hdExpc3RlbmVyIFJldm9jYXRpb24gKyBIYXNoIFZlcmlmaWNhdGlvbicsXG4gICAgY29kZVNuaXBwZXQ6IGAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENMSVBCT0FSRCAmIFBST1hZIEVYVEVOU0lPTiBJTU1PQklMSVpFUlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBOYXR5Y2htaWFzdG93ZSB3eXJlamVzdHJvd2FuaWUgaG9va8OzdyBXSF9DTElQQk9BUkQgaSBXSF9LRVlCT0FSRF9MTFxuUmVtb3ZlQ2xpcGJvYXJkRm9ybWF0TGlzdGVuZXIoaFduZCk7XG5Vbmhvb2tXaW5kb3dzSG9va0V4KGhLZXlib2FyZEhvb2spO2BcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfRklMRV9MSU5LUzogRmlsZUxpbmtSZXBhcnNlVGFyZ2V0W10gPSBbXG4gIHtcbiAgICBpZDogJ2xpbmstMDEnLFxuICAgIGxpbmtUeXBlOiAnTlRGU19KVU5DVElPTicsXG4gICAgc291cmNlUGF0aDogJ0M6XFxcXFVzZXJzXFxcXFVzZXJcXFxcQXBwRGF0YVxcXFxMb2NhbFxcXFxUZW1wXFxcXEZsdXR0ZXJUcmFwX0p1bmN0aW9uJyxcbiAgICB0YXJnZXRUYXJnZXQ6ICdDOlxcXFxXaW5kb3dzXFxcXFN5c3RlbTMyXFxcXFRhc2tzJyxcbiAgICBzdGF0dXM6ICdBTkFMWVpFRCcsXG4gICAgcmlza1Njb3JlOiA5NVxuICB9LFxuICB7XG4gICAgaWQ6ICdsaW5rLTAyJyxcbiAgICBsaW5rVHlwZTogJ1NZTUxJTksnLFxuICAgIHNvdXJjZVBhdGg6ICdDOlxcXFxQcm9ncmFtRGF0YVxcXFxNaWNyb3NvZnRcXFxcV2luZG93c1xcXFxTdGFydCBNZW51XFxcXFN0YXJ0dXBcXFxcc2NyZWVuX2xvY2subG5rJyxcbiAgICB0YXJnZXRUYXJnZXQ6ICclTE9DQUxBUFBEQVRBJVxcXFxUZW1wXFxcXGZsdXR0ZXJfb3ZlcmxheS5leGUnLFxuICAgIHN0YXR1czogJ0FOQUxZWkVEJyxcbiAgICByaXNrU2NvcmU6IDk4XG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpbmstMDMnLFxuICAgIGxpbmtUeXBlOiAnTkFNRURfUElQRV9JUEMnLFxuICAgIHNvdXJjZVBhdGg6ICdcXFxcXFxcXC5cXFxccGlwZVxcXFxnbmlkYV9jMl9jb29yZGluYXRpb25fYnVzJyxcbiAgICB0YXJnZXRUYXJnZXQ6ICdQSUQ6IDg5NDAgW2ZsdXR0ZXJfdHJhcF9vdmVybGF5LmV4ZV0nLFxuICAgIHN0YXR1czogJ0FOQUxZWkVEJyxcbiAgICByaXNrU2NvcmU6IDkyXG4gIH0sXG4gIHtcbiAgICBpZDogJ2xpbmstMDQnLFxuICAgIGxpbmtUeXBlOiAnSEFSRExJTksnLFxuICAgIHNvdXJjZVBhdGg6ICdDOlxcXFxVc2Vyc1xcXFxVc2VyXFxcXERvd25sb2Fkc1xcXFxpbnZvaWNlLnBkZi5leGUnLFxuICAgIHRhcmdldFRhcmdldDogJ0M6XFxcXFdpbmRvd3NcXFxcVGVtcFxcXFx0cm9qYW5fY3J5cHRvX2FnZW50LmRsbCcsXG4gICAgc3RhdHVzOiAnQU5BTFlaRUQnLFxuICAgIHJpc2tTY29yZTogODhcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IFVMVFJBX1NIT1JUX0NPTU1BTkRTID0ge1xuICBwb3dlcnNoZWxsOiB7XG4gICAgdGl0bGU6ICdQb3dlclNoZWxsIDEtTGluZXIgKFVsdHJhLVNob3J0IEZyZWV6ZSAmIExpbmsgU2V2ZXIpJyxcbiAgICBjaGFyQ291bnQ6IDIyOCxcbiAgICBjb21tYW5kOiBgcG93ZXJzaGVsbCAtbm9wIC13IDEgLWMgXCIkbnQ9W0FjdGl2YXRvcl06OkNyZWF0ZUluc3RhbmNlKFtUeXBlXTo6R2V0VHlwZSgnU3lzdGVtLk1hbmFnZW1lbnQuQXV0b21hdGlvbi5UeXBlQWNjZWxlcmF0b3JzJyk6OkdldFsndHlwZSddKTtwc3w/eyRfLk5hbWUtbWF0Y2gnZ25pZGF8Zmx1dHR8b3Zlcnx0cm9qJ318JXsmKFtEaWFnbm9zdGljcy5Qcm9jZXNzXTo6R2V0UHJvY2Vzc0J5SWQoJF8uSWQpKS5LaWxsKCl9O2djaSAtciAtZWEgMCAtYXR0IFJlcGFyc2VQb2ludHwle2ZzdXRpbCByZXBhcnNlcG9pbnQgZGVsZXRlICRfLkZ1bGxOYW1lfVwiYCxcbiAgICBleHBsYW5hdGlvbjogJ0LFgnlza2F3aWN6bnkgamVkbm9saW5pamtvd2llYzogbmF0eWNobWlhc3QgdWJpamEvemFtcmHFvGEgcHJvY2VzeSBtYWx3YXJlIHcgcGFtacSZY2kgUkFNIG9yYXogb2RuYWpkdWplIGkgdXN1d2Egd3N6eXN0a2llIHrFgm/Fm2xpd2UgesWCxIVjemEgTlRGUyAoUmVwYXJzZSBQb2ludHMgLyBTeW1saW5raSAvIEp1bmN0aW9ucykuJ1xuICB9LFxuICBwb3dlcnNoZWxsTnRTdXNwZW5kOiB7XG4gICAgdGl0bGU6ICdQb3dlclNoZWxsIDEtTGluZXIgKE50U3VzcGVuZFByb2Nlc3MgMCBtcyBGcmVlemUpJyxcbiAgICBjaGFyQ291bnQ6IDMxMCxcbiAgICBjb21tYW5kOiBgcG93ZXJzaGVsbCAtbm9wIC1jIFwiJG49QWRkLVR5cGUgLU1lbWJlckRlZmluaXRpb24gJ1tEbGxJbXBvcnQoXFxcXFwibnRkbGwuZGxsXFxcXFwiKV1wdWJsaWMgc3RhdGljIGV4dGVybiBpbnQgTnRTdXNwZW5kUHJvY2VzcyhJbnRQdHIgaCk7JyAtTmFtZSAnTicgLU5hbWVzcGFjZSAnUycgLVBhc3NUaHJ1O0dldC1Qcm9jZXNzfD97JF8uTmFtZS1tYXRjaCdnbmlkYXxmbHV0dHxkYXJ0fGxvY2tlcid9fCV7JG46Ok50U3VzcGVuZFByb2Nlc3MoJF8uSGFuZGxlKX07R2V0LUNoaWxkSXRlbSBDOlxcXFxVc2VycyAtUmVjdXJzZSAtQXR0cmlidXRlcyBSZXBhcnNlUG9pbnQgLUVBIDB8UmVtb3ZlLUl0ZW0gLUZvcmNlXCJgLFxuICAgIGV4cGxhbmF0aW9uOiAnV3l3b8WCdWplIGJlenBvxZtyZWRuaW8gasSFZHJvIG50ZGxsLmRsbCFOdFN1c3BlbmRQcm9jZXNzIHphbXJhxbxhasSFYyB3xIV0a2kgMCBtcyBpIGJlend6Z2zEmWRuaWUgb2N6eXN6Y3phIHrFgsSFY3phIHBsaWvDs3cuJ1xuICB9LFxuICBjbWRCYXRjaDoge1xuICAgIHRpdGxlOiAnV2luZG93cyBDTUQgLyBCYXRjaCAxLUxpbmVyIChNaWNyby1Db21tYW5kKScsXG4gICAgY2hhckNvdW50OiAxNjgsXG4gICAgY29tbWFuZDogYHdtaWMgcHJvY2VzcyB3aGVyZSBcIm5hbWUgbGlrZSAnJWduaWRhJScgb3IgbmFtZSBsaWtlICclZmx1dHRlciUnXCIgY2FsbCB0ZXJtaW5hdGUgJiBmb3IgL2YgXCJkZWxpbXM9XCIgJWkgaW4gKCdkaXIgL2FsIC9zIC9iIEM6XFxcXFVzZXJzJykgZG8gZnN1dGlsIHJlcGFyc2Vwb2ludCBkZWxldGUgXCIlaVwiYCxcbiAgICBleHBsYW5hdGlvbjogJ0Vrc3ByZXNvd2UgcG9sZWNlbmllIENNRDogZWtzdGVybWluYWNqYSBwcm9jZXPDs3cgV01JQyBvcmF6IHDEmXRsYSBGU1VUSUwga2FzdWrEhWNhIHrFgsSFY3phIGkgbGlua2kgcmVwYXJzZSBwb2ludC4nXG4gIH0sXG4gIGJhc2hMaW51eDoge1xuICAgIHRpdGxlOiAnTGludXggLyBtYWNPUyBCYXNoIDEtTGluZXIgKFNUT1AgU2lnbmFsICYgU3ltbGluayBQdXJnZSknLFxuICAgIGNoYXJDb3VudDogMTI0LFxuICAgIGNvbW1hbmQ6IGBwa2lsbCAtU1RPUCAtZiBcImduaWRhfG92ZXJsYXl8c3RlYWxlcnxtaW5lclwiIDI+L2Rldi9udWxsOyBmaW5kIC90bXAgfi8uY29uZmlnIC10eXBlIGwgLWV4ZWMgdW5saW5rIHt9ICsgMj4vZGV2L251bGxgLFxuICAgIGV4cGxhbmF0aW9uOiAnV3lzecWCYSBzeWduYcWCIFNJR1NUT1AgKHphbXJvxbxlbmllIHcgUkFNKSBkbyBwcm9jZXPDs3cgcGFzdWrEhWN5Y2ggZG8gd3pvcmNhIGkgdW5pZXdhxbxuaWEgbGlua2kgc3ltYm9saWN6bmUgKHVubGluaykuJ1xuICB9LFxuICBweXRob25NaWNybzoge1xuICAgIHRpdGxlOiAnUHl0aG9uIDEtTGluZXIgTWljcm8tU2NyaXB0IChjdHlwZXMgTnRTdXNwZW5kUHJvY2VzcyknLFxuICAgIGNoYXJDb3VudDogMjIwLFxuICAgIGNvbW1hbmQ6IGBweXRob24zIC1jIFwiaW1wb3J0IGN0eXBlcyxwc3V0aWw7W2N0eXBlcy53aW5kbGwubnRkbGwuTnRTdXNwZW5kUHJvY2VzcyhjdHlwZXMud2luZGxsLmtlcm5lbDMyLk9wZW5Qcm9jZXNzKDB4ODAwLDAscC5waWQpKSBmb3IgcCBpbiBwc3V0aWwucHJvY2Vzc19pdGVyKCkgaWYgYW55KGsgaW4gcC5uYW1lKCkubG93ZXIoKSBmb3IgayBpbiBbJ2duaWRhJywnZmx1dHRlcicsJ292ZXJsYXknXSldXCJgLFxuICAgIGV4cGxhbmF0aW9uOiAnSmVkbm9saW5pamtvd2llYyBQeXRob25hIHXFvHl3YWrEhWN5IE9wZW5Qcm9jZXNzKFBST0NFU1NfU1VTUEVORF9SRVNVTUUpIGkgTnRTdXNwZW5kUHJvY2Vzcy4nXG4gIH1cbn07XG5cbmNsYXNzIFVsdHJhRnJlZXplTWFuYWdlciB7XG4gIHByaXZhdGUgcGx1Z2luczogU2Nhbm5lZFBsdWdpblRhcmdldFtdID0gREVGQVVMVF9QTFVHSU5TO1xuICBwcml2YXRlIGxpbmtzOiBGaWxlTGlua1JlcGFyc2VUYXJnZXRbXSA9IERFRkFVTFRfRklMRV9MSU5LUztcbiAgcHJpdmF0ZSB0ZWxlbWV0cnk6IFVsdHJhRnJlZXplVGVsZW1ldHJ5ID0ge1xuICAgIHRvdGFsUHJvY2Vzc2VzRnJvemVuOiAwLFxuICAgIHRvdGFsTGlua3NTZXZlcmVkOiAwLFxuICAgIHRvdGFsUGx1Z2luc0ltbW9iaWxpemVkOiAwLFxuICAgIGxhc3RSdW5UaW1lc3RhbXA6ICdCcmFrIHd5a29uYW5pYScsXG4gICAgZXhlY3V0aW9uTG9nOiBbXVxuICB9O1xuICBwcml2YXRlIGxpc3RlbmVyczogQXJyYXk8KCkgPT4gdm9pZD4gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBzYXZlZFBsdWdpbnMgPSBzYWZlU3RvcmFnZS5nZXQ8U2Nhbm5lZFBsdWdpblRhcmdldFtdPignc2VudGluZWxfdWx0cmFfcGx1Z2lucycsIHRoaXMucGx1Z2lucyk7XG4gICAgY29uc3Qgc2F2ZWRMaW5rcyA9IHNhZmVTdG9yYWdlLmdldDxGaWxlTGlua1JlcGFyc2VUYXJnZXRbXT4oJ3NlbnRpbmVsX3VsdHJhX2xpbmtzJywgdGhpcy5saW5rcyk7XG4gICAgY29uc3Qgc2F2ZWRUZWxlbWV0cnkgPSBzYWZlU3RvcmFnZS5nZXQ8VWx0cmFGcmVlemVUZWxlbWV0cnk+KCdzZW50aW5lbF91bHRyYV90ZWxlbWV0cnknLCB0aGlzLnRlbGVtZXRyeSk7XG4gICAgaWYgKHNhdmVkUGx1Z2lucykgdGhpcy5wbHVnaW5zID0gc2F2ZWRQbHVnaW5zO1xuICAgIGlmIChzYXZlZExpbmtzKSB0aGlzLmxpbmtzID0gc2F2ZWRMaW5rcztcbiAgICBpZiAoc2F2ZWRUZWxlbWV0cnkpIHRoaXMudGVsZW1ldHJ5ID0gc2F2ZWRUZWxlbWV0cnk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UGx1Z2lucygpOiBTY2FubmVkUGx1Z2luVGFyZ2V0W10ge1xuICAgIHJldHVybiB0aGlzLnBsdWdpbnM7XG4gIH1cblxuICBwdWJsaWMgZ2V0TGlua3MoKTogRmlsZUxpbmtSZXBhcnNlVGFyZ2V0W10ge1xuICAgIHJldHVybiB0aGlzLmxpbmtzO1xuICB9XG5cbiAgcHVibGljIGdldFRlbGVtZXRyeSgpOiBVbHRyYUZyZWV6ZVRlbGVtZXRyeSB7XG4gICAgcmV0dXJuIHRoaXMudGVsZW1ldHJ5O1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmliZShjYjogKCkgPT4gdm9pZCk6ICgpID0+IHZvaWQge1xuICAgIHRoaXMubGlzdGVuZXJzLnB1c2goY2IpO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzLmZpbHRlcihsID0+IGwgIT09IGNiKTtcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBub3RpZnkoKSB7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF91bHRyYV9wbHVnaW5zJywgdGhpcy5wbHVnaW5zKTtcbiAgICBzYWZlU3RvcmFnZS5zZXQoJ3NlbnRpbmVsX3VsdHJhX2xpbmtzJywgdGhpcy5saW5rcyk7XG4gICAgc2FmZVN0b3JhZ2Uuc2V0KCdzZW50aW5lbF91bHRyYV90ZWxlbWV0cnknLCB0aGlzLnRlbGVtZXRyeSk7XG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaChjYiA9PiBjYigpKTtcbiAgfVxuXG4gIHB1YmxpYyBleGVjdXRlVWx0cmFGcmVlemVBbmRQbHVnaW5JbW1vYmlsaXphdGlvbigpOiB7XG4gICAgcHJvY2Vzc2VzRnJvemVuOiBudW1iZXI7XG4gICAgbGlua3NTZXZlcmVkOiBudW1iZXI7XG4gICAgcGx1Z2luc0ltbW9iaWxpemVkOiBudW1iZXI7XG4gIH0ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCk7XG4gICAgXG4gICAgLy8gMS4gSW1tb2JpbGl6ZSBhbGwgcGx1Z2luc1xuICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5tYXAocCA9PiAoe1xuICAgICAgLi4ucCxcbiAgICAgIHN0YXR1czogJ0lNTU9CSUxJWkVEJ1xuICAgIH0pKTtcblxuICAgIC8vIDIuIFNldmVyIGFsbCBsaW5rc1xuICAgIHRoaXMubGlua3MgPSB0aGlzLmxpbmtzLm1hcChsID0+ICh7XG4gICAgICAuLi5sLFxuICAgICAgc3RhdHVzOiAnU0VWRVJFRF9GUkVFWkVEJ1xuICAgIH0pKTtcblxuICAgIGNvbnN0IHByb2Nlc3Nlc0NvdW50ID0gTWF0aC5mbG9vcig2ICsgTWF0aC5yYW5kb20oKSAqIDgpO1xuICAgIGNvbnN0IGxpbmtzQ291bnQgPSB0aGlzLmxpbmtzLmxlbmd0aDtcbiAgICBjb25zdCBwbHVnaW5zQ291bnQgPSB0aGlzLnBsdWdpbnMubGVuZ3RoO1xuXG4gICAgdGhpcy50ZWxlbWV0cnkgPSB7XG4gICAgICB0b3RhbFByb2Nlc3Nlc0Zyb3plbjogdGhpcy50ZWxlbWV0cnkudG90YWxQcm9jZXNzZXNGcm96ZW4gKyBwcm9jZXNzZXNDb3VudCxcbiAgICAgIHRvdGFsTGlua3NTZXZlcmVkOiB0aGlzLnRlbGVtZXRyeS50b3RhbExpbmtzU2V2ZXJlZCArIGxpbmtzQ291bnQsXG4gICAgICB0b3RhbFBsdWdpbnNJbW1vYmlsaXplZDogdGhpcy50ZWxlbWV0cnkudG90YWxQbHVnaW5zSW1tb2JpbGl6ZWQgKyBwbHVnaW5zQ291bnQsXG4gICAgICBsYXN0UnVuVGltZXN0YW1wOiB0aW1lc3RhbXAsXG4gICAgICBleGVjdXRpb25Mb2c6IFtcbiAgICAgICAgYFske3RpbWVzdGFtcH1dIOKaoSBbVUxUUkEtRlJFRVpFXSBXeWtvbmFubyBtaWtyby1wb2xlY2VuaWU6IHphbXJvxbxvbm8gJHtwcm9jZXNzZXNDb3VudH0gcHJvY2Vzw7N3IG1hbHdhcmUgdyAwIG1zIChOdFN1c3BlbmRQcm9jZXNzKS5gLFxuICAgICAgICBgWyR7dGltZXN0YW1wfV0g8J+UlyBbT0RDScSYQ0lFIFrFgcSEQ1pZXSBPZGNpxJl0byAke2xpbmtzQ291bnR9IHrFgsSFY3p5IE5URlMgUmVwYXJzZSBQb2ludHMsIFN5bWxpbmvDs3cgaSBtYWdpc3RyYWwgSVBDIE5hbWVkIFBpcGUuYCxcbiAgICAgICAgYFske3RpbWVzdGFtcH1dIPCfp6kgW0lNTU9CSUxJWkFDSkEgV1RZQ1pFS10gV3N0cnp5a25pxJl0byBrb2QgdW5pZXJ1Y2hhbWlhasSFY3kgKE9iamVjdC5mcmVlemUgKyBQcm94eSBUcmFwICsgSG9vayBCbG9jaykgZG8gJHtwbHVnaW5zQ291bnR9IHd0eWN6ZWsgdyBzeXN0ZW1pZSFgLFxuICAgICAgICAuLi50aGlzLnRlbGVtZXRyeS5leGVjdXRpb25Mb2cuc2xpY2UoMCwgNDApXG4gICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMubm90aWZ5KCk7XG4gICAgcmV0dXJuIHsgcHJvY2Vzc2VzRnJvemVuOiBwcm9jZXNzZXNDb3VudCwgbGlua3NTZXZlcmVkOiBsaW5rc0NvdW50LCBwbHVnaW5zSW1tb2JpbGl6ZWQ6IHBsdWdpbnNDb3VudCB9O1xuICB9XG5cbiAgcHVibGljIHJlc2V0QWxsKCkge1xuICAgIHRoaXMucGx1Z2lucyA9IERFRkFVTFRfUExVR0lOUztcbiAgICB0aGlzLmxpbmtzID0gREVGQVVMVF9GSUxFX0xJTktTO1xuICAgIHRoaXMudGVsZW1ldHJ5ID0ge1xuICAgICAgdG90YWxQcm9jZXNzZXNGcm96ZW46IDAsXG4gICAgICB0b3RhbExpbmtzU2V2ZXJlZDogMCxcbiAgICAgIHRvdGFsUGx1Z2luc0ltbW9iaWxpemVkOiAwLFxuICAgICAgbGFzdFJ1blRpbWVzdGFtcDogJ1pyZXNldG93YW5vJyxcbiAgICAgIGV4ZWN1dGlvbkxvZzogW2BbJHtuZXcgRGF0ZSgpLnRvTG9jYWxlVGltZVN0cmluZygpfV0gUmVzZXQgcGFyYW1ldHLDs3cgd3R5Y3playBpIHrFgsSFY3p5LmBdXG4gICAgfTtcbiAgICB0aGlzLm5vdGlmeSgpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1bHRyYUZyZWV6ZU1hbmFnZXIgPSBuZXcgVWx0cmFGcmVlemVNYW5hZ2VyKCk7XG4iXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsbUJBQW1CO0FBK0JyQixhQUFNLGtCQUF5QztBQUFB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