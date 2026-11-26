import React, { useState } from 'react';
import { Shield, Lock, Unlock, Users, Plus, Trash2, KeyRound, Eye, EyeOff } from 'lucide-react';
import { isCiphertext } from '../lib/crypto';

export interface WorkspaceListModel {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  ownerEmail: string;
  memberEmails: string[];
  isEncrypted: boolean;
  color: string;
}

interface TeamAndSecurityViewProps {
  activeList: WorkspaceListModel;
  rawTasksPreview: Array<{ id: string; rawTitle: string; decryptedTitle: string; isEncrypted: boolean }>;
  e2eePassphrase: string;
  keyFingerprint: string;
  onUpdatePassphrase: (newPassphrase: string) => void;
  onAddCollaborator: (email: string) => Promise<void>;
  onRemoveCollaborator: (email: string) => Promise<void>;
  onToggleListEncryption: (enabled: boolean) => Promise<void>;
}

export const TeamAndSecurityView: React.FC<TeamAndSecurityViewProps> = ({
  activeList,
  rawTasksPreview,
  e2eePassphrase,
  keyFingerprint,
  onUpdatePassphrase,
  onAddCollaborator,
  onRemoveCollaborator,
  onToggleListEncryption,
}) => {
  const [newEmail, setNewEmail] = useState('');
  const [passphraseInput, setPassphraseInput] = useState(e2eePassphrase);
  const [showPassphrase, setShowPassphrase] = useState(false);
  const [statusNote, setStatusNote] = useState<string | null>(null);

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newEmail.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) return;
    if (activeList.memberEmails.length >= 10) {
      setStatusNote('Osiągnięto limit 10 współpracowników dla tej listy (reguła bezpieczeństwa Firestore).');
      return;
    }
    await onAddCollaborator(trimmed);
    setNewEmail('');
    setStatusNote(`Dodano współpracownika ${trimmed} do listy „${activeList.name}”.`);
  };

  const handleApplyPassphrase = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdatePassphrase(passphraseInput.trim());
    setStatusNote('Zaktualizowano klucz główny szyfrowania End-to-End (PBKDF2 / AES-256-GCM).');
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-slate-200 dark:border-slate-800">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Współdzielenie w Zespole i Szyfrowanie End-to-End (E2EE)
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Zarządzaj dostępem współpracowników do listy „{activeList.name}” oraz kluczami kryptograficznymi Web Crypto AES-256-GCM
        </p>
      </div>

      {statusNote && (
        <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-medium text-emerald-800 dark:text-emerald-200">
          {statusNote}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Card: Team Sharing & Access Control */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600 dark:text-sky-400" />
                Współpracownicy Listy ({activeList.memberEmails.length}/10)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Użytkownicy na tej liście mogą wyświetlać i aktualizować zadania w czasie rzeczywistym po zalogowaniu zweryfikowanym adresem e-mail.
              </p>
            </div>
          </div>

          <form onSubmit={handleAddMember} className="flex items-center gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="Wpisz adres e-mail współpracownika (np. anna@zespol.pl)..."
              className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3.5 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              Udostępnij
            </button>
          </form>

          <div className="space-y-2 pt-2">
            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {activeList.ownerEmail || 'Właściciel przestrzeni roboczej'}
                </span>
                <span className="text-slate-400 mx-2">·</span>
                <span className="text-slate-500 dark:text-slate-400">Właściciel (Pełne uprawnienia Tier 1)</span>
              </div>
            </div>

            {activeList.memberEmails.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                Lista jest obecnie prywatna. Dodaj adres e-mail powyżej, aby rozpocząć pracę zespołową.
              </div>
            ) : (
              activeList.memberEmails.map((email) => (
                <div
                  key={email}
                  className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-medium text-slate-800 dark:text-slate-200">{email}</span>
                    <span className="text-slate-400 mx-2">·</span>
                    <span className="text-slate-500 dark:text-slate-400">Współpracownik zespołu (Tier 2)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveCollaborator(email)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    title="Cofnij dostęp"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Card: End-to-End Encryption (E2EE) Vault Configuration */}
        <div className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Kryptografia End-to-End (Web Crypto AES-256-GCM)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Klucz szyfrujący jest derywowany wyłącznie lokalnie w Twojej przeglądarce (PBKDF2 100 000 iteracji SHA-256) i nigdy nie opuszcza urządzenia.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onToggleListEncryption(!activeList.isEncrypted)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeList.isEncrypted
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {activeList.isEncrypted ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
              {activeList.isEncrypted ? 'Domyślne E2EE: Włączone' : 'Domyślne E2EE: Wyłączone'}
            </button>
          </div>

          <form onSubmit={handleApplyPassphrase} className="space-y-3">
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
              Hasło Klucza Głównego Sejfu E2EE (wspólne dla zespołu):
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type={showPassphrase ? 'text' : 'password'}
                  value={passphraseInput}
                  onChange={(e) => setPassphraseInput(e.target.value)}
                  placeholder="Wprowadź hasło klucza E2EE..."
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 pl-3.5 pr-9 py-2 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassphrase((s) => !s)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                  aria-label="Pokaż lub ukryj hasło"
                >
                  {showPassphrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400 text-white dark:text-slate-950 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Ustaw Klucz
              </button>
            </div>
          </form>

          <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Odcisk klucza SHA-256:</span>
              <span className="font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">
                {keyFingerprint}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Algorytm szyfrowania:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">AES-256-GCM + 96-bit IV</span>
            </div>
          </div>

          {/* Live Zero-Knowledge Ciphertext Inspector */}
          <div className="space-y-2 pt-2">
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Inspektor Szyfrogramów w Chmurze (Weryfikacja Zero-Knowledge):
            </div>
            <div className="space-y-2 max-h-44 overflow-y-auto">
              {rawTasksPreview.slice(0, 4).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-900 dark:text-slate-100 truncate">
                      Odszyfrowane: {item.decryptedTitle}
                    </span>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 shrink-0 ml-2">
                      {item.isEncrypted || isCiphertext(item.rawTitle) ? 'AES-256-GCM' : 'Jawny tekst'}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    W bazie: {item.rawTitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
