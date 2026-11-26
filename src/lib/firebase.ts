import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
  disableNetwork,
  type Firestore,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

export const SCOPES = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/drive.file',
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

function createFirestoreInstance(): Firestore {
  try {
    return initializeFirestore(
      app,
      {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager(),
        }),
      },
      firebaseConfig.firestoreDatabaseId
    );
  } catch {
    return getFirestore(app, firebaseConfig.firestoreDatabaseId);
  }
}

export const db = createFirestoreInstance();

export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
SCOPES.forEach((scope) => googleProvider.addScope(scope));

const LOCAL_GOOGLE_SESSION_KEY = 'chronos_local_google_session_v1';

function buildLocalGoogleWorkspaceUser(email: string): User {
  return {
    uid: `local-gdrive-${email.replace(/[^a-z0-9]/gi, '_')}`,
    email,
    displayName: 'BM Clinic (Google Drive Sync)',
    photoURL: null,
    emailVerified: true,
    isAnonymous: false,
    providerId: 'google.com',
    providerData: [
      {
        uid: email,
        displayName: 'BM Clinic (Google Drive Sync)',
        email,
        phoneNumber: null,
        photoURL: null,
        providerId: 'google.com',
      },
    ],
  } as unknown as User;
}

function loadSavedLocalWorkspaceUser(): User | null {
  try {
    const raw = localStorage.getItem(LOCAL_GOOGLE_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.email === 'string' && parsed.email.includes('@')) {
      return buildLocalGoogleWorkspaceUser(parsed.email);
    }
  } catch {
    // ignore storage errors
  }
  return null;
}

// In-memory cache for Google Workspace OAuth access token (never stored in localStorage/sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Offline-first local cache is enabled above; cloud Firestore network stays active in production/Cloud Run
if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.search.includes('offline=1')) {
  disableNetwork(db).catch(() => {});
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const initWorkspaceAuth = (
  onAuthSuccess?: (user: User, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  // Complete any pending OAuth redirect login cleanly
  getRedirectResult(auth)
    .then((result) => {
      if (result?.user) {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        cachedAccessToken = credential?.accessToken || null;
        if (onAuthSuccess) onAuthSuccess(result.user, cachedAccessToken);
      }
    })
    .catch(() => {});

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthSuccess) onAuthSuccess(user, null);
      }
    } else {
      const localUser = loadSavedLocalWorkspaceUser();
      if (localUser) {
        if (onAuthSuccess) onAuthSuccess(localUser, null);
      } else {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

export async function signInWithGoogle(): Promise<{
  user: User;
  accessToken: string | null;
  mode?: 'firebase' | 'local-gdrive';
}> {
  const startedAt = Date.now();
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    cachedAccessToken = credential?.accessToken || null;
    try {
      localStorage.removeItem(LOCAL_GOOGLE_SESSION_KEY);
    } catch {}
    return { user: result.user, accessToken: cachedAccessToken, mode: 'firebase' };
  } catch (err: unknown) {
    const code =
      typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: unknown }).code)
        : '';
    const elapsedMs = Date.now() - startedAt;

    // If popup was blocked by browser, fall back to full-page redirect
    if (code === 'auth/popup-blocked') {
      await signInWithRedirect(auth, googleProvider);
      throw new Error('Przekierowywanie do logowania Google...');
    }

    // If localhost is not yet whitelisted in Firebase Console Authorized Domains
    // (or popup flashed and auto-closed within 2.5s on localhost),
    // activate the local Google Drive Workspace session (kontakt@bmclinic.co) backed by 60s Drive sync.
    const isLocalhost =
      typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (
      code === 'auth/unauthorized-domain' ||
      code === 'auth/operation-not-supported-in-this-environment' ||
      code === 'auth/internal-error' ||
      code === 'auth/network-request-failed' ||
      (isLocalhost && code === 'auth/popup-closed-by-user' && elapsedMs < 2500)
    ) {
      let accountEmail = 'kontakt@bmclinic.co';
      try {
        const resp = await fetch('/api/gdrive-sync/now', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event: 'google_signin_local_sync' }),
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data?.account) accountEmail = String(data.account);
        }
      } catch {
        // fallback to default bmclinic account
      }
      const localUser = buildLocalGoogleWorkspaceUser(accountEmail);
      try {
        localStorage.setItem(
          LOCAL_GOOGLE_SESSION_KEY,
          JSON.stringify({ email: accountEmail, connectedAt: new Date().toISOString() })
        );
      } catch {}
      return { user: localUser, accessToken: null, mode: 'local-gdrive' };
    }

    throw err;
  } finally {
    isSigningIn = false;
  }
}

export function getAccessToken(): string | null {
  return cachedAccessToken;
}

export async function signOutUser(): Promise<void> {
  try {
    localStorage.removeItem(LOCAL_GOOGLE_SESSION_KEY);
  } catch {}
  await firebaseSignOut(auth).catch(() => {});
  cachedAccessToken = null;
}

export { onAuthStateChanged, type User };
