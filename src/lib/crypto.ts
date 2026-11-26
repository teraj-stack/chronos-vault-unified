/**
 * Real End-to-End Encryption (E2EE) Module using Web Crypto API (AES-256-GCM + PBKDF2)
 * Ensures task titles and descriptions are encrypted client-side before syncing to Firestore.
 */

const E2EE_PREFIX = 'E2EE_V1:';
const PBKDF2_ITERATIONS = 100000;

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function deriveAESKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const baseKey = await window.crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt as unknown as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export function isCiphertext(value: string): boolean {
  return typeof value === 'string' && value.startsWith(E2EE_PREFIX);
}

export async function encryptTextE2EE(plaintext: string, passphrase: string): Promise<string> {
  if (!plaintext || !passphrase) return plaintext;
  if (isCiphertext(plaintext)) return plaintext;

  const encoder = new TextEncoder();
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveAESKey(passphrase, salt);

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv as unknown as BufferSource },
    key,
    encoder.encode(plaintext)
  );

  const payload = `${E2EE_PREFIX}${bufferToBase64(salt)}:${bufferToBase64(iv)}:${bufferToBase64(encryptedBuffer)}`;
  return payload;
}

export async function decryptTextE2EE(ciphertext: string, passphrase: string): Promise<string> {
  if (!ciphertext || !isCiphertext(ciphertext)) return ciphertext;
  if (!passphrase) return '🔒 [Zaszyfrowane E2EE AES-256-GCM — Odblokuj klucz w pasku bezpieczeństwa]';

  try {
    const raw = ciphertext.slice(E2EE_PREFIX.length);
    const parts = raw.split(':');
    if (parts.length !== 3) return '🔒 [Nieprawidłowy format szyfrogramu E2EE]';

    const salt = base64ToUint8Array(parts[0]);
    const iv = base64ToUint8Array(parts[1]);
    const data = base64ToUint8Array(parts[2]);

    const key = await deriveAESKey(passphrase, salt);
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv as unknown as BufferSource },
      key,
      data as unknown as BufferSource
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch {
    return '🔒 [Błędne hasło klucza E2EE — Nie można odszyfrować]';
  }
}

export async function computeKeyFingerprint(passphrase: string): Promise<string> {
  if (!passphrase) return 'BRAK KLUCZA';
  const encoder = new TextEncoder();
  const digest = await window.crypto.subtle.digest('SHA-256', encoder.encode(passphrase));
  const hex = Array.from(new Uint8Array(digest))
    .slice(0, 6)
    .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
    .join(':');
  return hex;
}
