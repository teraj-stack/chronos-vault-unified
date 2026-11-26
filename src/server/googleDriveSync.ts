import fs from 'fs';
import path from 'path';

export interface GoogleDriveSyncStatus {
  enabled: boolean;
  account: string;
  intervalSeconds: number;
  mountPath: string;
  liveSyncDir: string;
  mountAvailable: boolean;
  lastSyncAt: string | null;
  lastError: string | null;
  syncCount: number;
}

const DEFAULT_MOUNT_PATH =
  process.env.CHRONOS_GDRIVE_MOUNT ||
  '/Users/krzysztofjarzyna/Library/CloudStorage/GoogleDrive-kontakt@bmclinic.co/Mój dysk/Chronos-Vault';

const ACCOUNT_EMAIL = process.env.CHRONOS_GDRIVE_ACCOUNT || 'kontakt@bmclinic.co';
const SYNC_INTERVAL_MS = 60_000; // 1 minute per user rule

let timer: NodeJS.Timeout | null = null;
let lastSyncAt: string | null = null;
let lastError: string | null = null;
let syncCount = 0;

function getLiveSyncDir(): string {
  return path.join(DEFAULT_MOUNT_PATH, 'live-sync');
}

export function getGoogleDriveSyncStatus(): GoogleDriveSyncStatus {
  const mountAvailable = fs.existsSync(path.dirname(DEFAULT_MOUNT_PATH));
  return {
    enabled: Boolean(timer),
    account: ACCOUNT_EMAIL,
    intervalSeconds: Math.round(SYNC_INTERVAL_MS / 1000),
    mountPath: DEFAULT_MOUNT_PATH,
    liveSyncDir: getLiveSyncDir(),
    mountAvailable,
    lastSyncAt,
    lastError,
    syncCount,
  };
}

export function syncNowToGoogleDrive(
  projectRoot: string,
  clientPayload?: Record<string, unknown>
): GoogleDriveSyncStatus {
  const parentDriveRoot = path.dirname(DEFAULT_MOUNT_PATH);
  if (!fs.existsSync(parentDriveRoot)) {
    lastError = `Google Drive mount not found at ${parentDriveRoot}`;
    return getGoogleDriveSyncStatus();
  }

  try {
    const liveDir = getLiveSyncDir();
    fs.mkdirSync(liveDir, { recursive: true });

    const nowIso = new Date().toISOString();
    const manifest = {
      app: 'Chronos Vault Unified',
      account: ACCOUNT_EMAIL,
      syncedAt: nowIso,
      syncCount: syncCount + 1,
      intervalSeconds: Math.round(SYNC_INTERVAL_MS / 1000),
      sourceRoot: projectRoot,
    };

    fs.writeFileSync(
      path.join(liveDir, 'last-sync.json'),
      JSON.stringify(manifest, null, 2),
      'utf8'
    );

    // Sync reference telemetry if present
    const telemetrySrc = path.join(projectRoot, 'public', 'sentinel-telemetry-reference.json');
    if (fs.existsSync(telemetrySrc)) {
      fs.copyFileSync(telemetrySrc, path.join(liveDir, 'sentinel-telemetry-reference.json'));
    }

    // Save optional live client snapshot (e.g., mindmap/tasks metadata) if provided
    if (clientPayload && typeof clientPayload === 'object') {
      fs.writeFileSync(
        path.join(liveDir, 'client-state-snapshot.json'),
        JSON.stringify({ savedAt: nowIso, ...clientPayload }, null, 2),
        'utf8'
      );
    }

    lastSyncAt = nowIso;
    lastError = null;
    syncCount += 1;
  } catch (err) {
    lastError = err instanceof Error ? err.message : String(err);
  }

  return getGoogleDriveSyncStatus();
}

export function startGoogleDriveAutoSync(projectRoot: string): void {
  if (timer) return;
  // Run initial sync immediately on startup, then every 60 seconds
  syncNowToGoogleDrive(projectRoot);
  timer = setInterval(() => {
    syncNowToGoogleDrive(projectRoot);
  }, SYNC_INTERVAL_MS);
  if (typeof timer.unref === 'function') {
    timer.unref();
  }
  console.log(
    `[GoogleDriveSync] Auto-sync active every 60s -> ${getLiveSyncDir()} (${ACCOUNT_EMAIL})`
  );
}
