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
