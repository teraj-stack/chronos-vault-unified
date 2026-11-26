#!/usr/bin/env zsh
cd "$(dirname "$0")"
export NODE_ENV=production
export PORT=3002
echo "Uruchamiam Chronos Vault Offline PWA na http://localhost:3002 ..."
exec npx tsx server.ts
