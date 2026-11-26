#!/usr/bin/env zsh
set -euo pipefail

PROJECT_DIR="/Users/krzysztofjarzyna/.gemini/antigravity/scratch/chronos-vault"
DIST_DIR="$PROJECT_DIR/dist"
RELEASE_DIR="$PROJECT_DIR/release"
APP_NAME="Chronos Vault.app"
APP_DIR="$RELEASE_DIR/$APP_NAME"
DMG_STAGE="$RELEASE_DIR/.dmg_stage"
DMG_PATH="$RELEASE_DIR/Chronos-Vault-Offline-macOS.dmg"
ZIP_PATH="$RELEASE_DIR/Chronos-Vault-Offline-macOS.zip"
ICONSET_DIR="$RELEASE_DIR/.AppIcon.iconset"

if [[ ! -d "$DIST_DIR" || ! -f "$DIST_DIR/index.html" ]]; then
  echo "ERROR: Brak zbudowanego katalogu dist/ w $PROJECT_DIR"
  exit 1
fi

rm -rf "$APP_DIR" "$DMG_STAGE" "$ICONSET_DIR" "$DMG_PATH" "$ZIP_PATH"
mkdir -p "$APP_DIR/Contents/MacOS" "$APP_DIR/Contents/Resources/dist"

# 1. Copy compiled offline production bundle
cp -R "$DIST_DIR/." "$APP_DIR/Contents/Resources/dist/"

# 2. Generate native macOS AppIcon.icns from pwa-512x512.png
mkdir -p "$ICONSET_DIR"
SRC_ICON="$DIST_DIR/pwa-512x512.png"
if [[ -f "$SRC_ICON" ]]; then
  sips -z 16 16     "$SRC_ICON" --out "$ICONSET_DIR/icon_16x16.png"      >/dev/null
  sips -z 32 32     "$SRC_ICON" --out "$ICONSET_DIR/icon_16x16@2x.png"   >/dev/null
  sips -z 32 32     "$SRC_ICON" --out "$ICONSET_DIR/icon_32x32.png"      >/dev/null
  sips -z 64 64     "$SRC_ICON" --out "$ICONSET_DIR/icon_32x32@2x.png"   >/dev/null
  sips -z 128 128   "$SRC_ICON" --out "$ICONSET_DIR/icon_128x128.png"    >/dev/null
  sips -z 256 256   "$SRC_ICON" --out "$ICONSET_DIR/icon_128x128@2x.png" >/dev/null
  sips -z 256 256   "$SRC_ICON" --out "$ICONSET_DIR/icon_256x256.png"    >/dev/null
  sips -z 512 512   "$SRC_ICON" --out "$ICONSET_DIR/icon_256x256@2x.png" >/dev/null
  sips -z 512 512   "$SRC_ICON" --out "$ICONSET_DIR/icon_512x512.png"    >/dev/null
  cp "$SRC_ICON"                      "$ICONSET_DIR/icon_512x512@2x.png"
  iconutil -c icns "$ICONSET_DIR" -o "$APP_DIR/Contents/Resources/AppIcon.icns"
fi
rm -rf "$ICONSET_DIR"

# 3. Write Info.plist
cat > "$APP_DIR/Contents/Info.plist" << 'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleDevelopmentRegion</key>
  <string>pl</string>
  <key>CFBundleDisplayName</key>
  <string>Chronos Vault</string>
  <key>CFBundleExecutable</key>
  <string>ChronosVault</string>
  <key>CFBundleIconFile</key>
  <string>AppIcon</string>
  <key>CFBundleIdentifier</key>
  <string>local.chronos.vault.offline</string>
  <key>CFBundleInfoDictionaryVersion</key>
  <string>6.0</string>
  <key>CFBundleName</key>
  <string>Chronos Vault</string>
  <key>CFBundlePackageType</key>
  <string>APPL</string>
  <key>CFBundleShortVersionString</key>
  <string>1.0.0</string>
  <key>CFBundleVersion</key>
  <string>1</string>
  <key>LSMinimumSystemVersion</key>
  <string>12.0</string>
  <key>NSHighResolutionCapable</key>
  <true/>
</dict>
</plist>
PLIST

# 4. Write zero-dependency local Python 3 offline server
cat > "$APP_DIR/Contents/Resources/offline_server.py" << 'PYEOF'
#!/usr/bin/env python3
"""Chronos Vault — 100% Offline Local Server (Zero external dependencies)."""

import http.server
import json
import mimetypes
import os
import socketserver
import sys
import time
from urllib.parse import urlparse

PORT = int(os.environ.get("CHRONOS_PORT", "3020"))
HOST = "127.0.0.1"
DIST_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "dist")

mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("font/woff2", ".woff2")


class ChronosOfflineHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIST_DIR, **kwargs)

    def log_message(self, format, *args):
        # Quiet logging to avoid filling user logs
        pass

    def _send_json(self, payload, status=200):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        parsed = urlparse(self.path)
        req_path = parsed.path

        if req_path == "/__health":
            self._send_json({"status": "ok", "app": "Chronos Vault Offline", "port": PORT})
            return

        if req_path.startswith("/api/"):
            self._send_json({
                "offline": True,
                "mode": "local-standalone",
                "timestamp": int(time.time() * 1000),
                "metrics": {
                    "activeInstances": 1,
                    "p95LatencyMs": 4,
                    "requestsPerSec": 1,
                    "errorRate": 0,
                },
                "events": [],
                "errors": [],
                "message": "Chronos Vault działa w trybie 100% offline (lokalna instancja).",
            })
            return

        # Serve static file if it exists, otherwise SPA fallback to index.html
        rel = req_path.lstrip("/")
        full_path = os.path.normpath(os.path.join(DIST_DIR, rel))
        if rel == "" or not full_path.startswith(DIST_DIR) or not os.path.isfile(full_path):
            self.path = "/index.html"
        return super().do_GET()

    def do_POST(self):
        length = int(self.headers.get("Content-Length", "0") or "0")
        if length > 0:
            _ = self.rfile.read(min(length, 1024 * 1024))
        self._send_json({
            "offline": True,
            "ok": True,
            "message": "Tryb 100% offline: funkcje chmurowe AI są wyłączone; wszystkie dane lokalne, wykresy 3D i szyfrowanie E2EE działają bez sieci.",
        })


class ReusableTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


if __name__ == "__main__":
    try:
        with ReusableTCPServer((HOST, PORT), ChronosOfflineHandler) as httpd:
            httpd.serve_forever()
    except OSError as exc:
        sys.stderr.write(f"Chronos Vault server could not bind {HOST}:{PORT}: {exc}\n")
        sys.exit(1)
PYEOF
chmod +x "$APP_DIR/Contents/Resources/offline_server.py"

# 5. Write native macOS executable launcher
cat > "$APP_DIR/Contents/MacOS/ChronosVault" << 'LAUNCHER'
#!/usr/bin/env zsh
set -euo pipefail

APP_CONTENTS="$(cd "$(dirname "$0")/.." && pwd)"
RESOURCES_DIR="$APP_CONTENTS/Resources"
SERVER_SCRIPT="$RESOURCES_DIR/offline_server.py"
DATA_DIR="$HOME/Library/Application Support/ChronosVault"
LOG_FILE="$HOME/Library/Logs/ChronosVault.log"
PID_FILE="$DATA_DIR/server.pid"
PORT="3020"
URL="http://127.0.0.1:${PORT}/"

mkdir -p "$DATA_DIR" "$HOME/Library/Logs"

# Start local offline server if not already responding
if ! /usr/bin/curl -sf "http://127.0.0.1:${PORT}/__health" >/dev/null 2>&1; then
  nohup /usr/bin/python3 "$SERVER_SCRIPT" >>"$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"

  # Wait up to 5 seconds for server readiness
  for _ in {1..25}; do
    if /usr/bin/curl -sf "http://127.0.0.1:${PORT}/__health" >/dev/null 2>&1; then
      break
    fi
    sleep 0.2
  done
fi

# Open as an independent app window if a Chromium-based browser is installed,
# otherwise open in the default macOS browser.
CHROME_PROFILE="$DATA_DIR/app-profile"
for BROWSER_BIN in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser" \
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium"; do
  if [[ -x "$BROWSER_BIN" ]]; then
    nohup "$BROWSER_BIN" --app="$URL" --user-data-dir="$CHROME_PROFILE" --no-first-run >/dev/null 2>&1 &
    exit 0
  fi
done

/usr/bin/open "$URL"
LAUNCHER
chmod +x "$APP_DIR/Contents/MacOS/ChronosVault"

# 6. Ad-hoc sign the app bundle so macOS accepts it cleanly locally
codesign --force --deep --sign - "$APP_DIR" >/dev/null 2>&1 || true

# 7. Create portable ZIP archive
(cd "$RELEASE_DIR" && /usr/bin/zip -qry "$ZIP_PATH" "$APP_NAME")

# 8. Create macOS .dmg installer with Applications symlink + README
mkdir -p "$DMG_STAGE"
cp -R "$APP_DIR" "$DMG_STAGE/"
ln -s /Applications "$DMG_STAGE/Applications"
cat > "$DMG_STAGE/INSTRUKCJA_INSTALACJI.txt" << 'TXT'
CHRONOS VAULT — NIEZALEŻNA APLIKACJA OFFLINE (macOS)
=====================================================

1. Przeciągnij ikonę "Chronos Vault.app" na folder "Applications" (Aplikacje).
2. Otwórz "Chronos Vault" z folderu Aplikacje lub przez Spotlight (Cmd + Spacja).
3. Przy pierwszym uruchomieniu, jeśli macOS zapyta o potwierdzenie:
   kliknij prawym przyciskiem myszy na "Chronos Vault" -> Otwórz -> Otwórz.

Aplikacja działa w 100% lokalnie (offline) na porcie http://127.0.0.1:3020
i nie wymaga połączenia z internetem ani uruchomionego Antigravity.
TXT

hdiutil create \
  -volname "Chronos Vault Offline" \
  -srcfolder "$DMG_STAGE" \
  -ov \
  -format UDZO \
  "$DMG_PATH" >/dev/null

rm -rf "$DMG_STAGE"

echo "BUILD_COMPLETE"
ls -lh "$RELEASE_DIR"
