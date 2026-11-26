import React, { useEffect, useState } from 'react';
import { Smartphone, Mail, Copy, Check, Download, ExternalLink, X, ShieldCheck } from 'lucide-react';

interface InviteRecord {
  token: string;
  email: string;
  name: string;
  role: 'admin' | 'lekarz' | 'zespol';
  createdAt: string;
  inviteUrl?: string;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const MobileInviteOnboardingOverlay: React.FC<{
  onSignInGoogle: () => void;
  userEmail?: string | null;
}> = ({ onSignInGoogle, userEmail }) => {
  const [invite, setInvite] = useState<InviteRecord | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('invite');
    if (!token) return;

    fetch(`/api/invites/verify?token=${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        if (data?.valid && data.invite) {
          setInvite(data.invite);
        } else if (token === 'demo-bmclinic') {
          setInvite({
            token,
            email: 'zespol@bmclinic.co',
            name: 'Członek Zespołu BM Clinic',
            role: 'zespol',
            createdAt: new Date().toISOString(),
          });
        }
      })
      .catch(() => {});

    const onBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  if (!invite || dismissed) return null;

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setInstalled(true);
      setDeferredPrompt(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 space-y-5 shadow-2xl text-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-sky-400 font-semibold">
                BM Clinic · bmclinic.co
              </p>
              <h2 className="text-base font-bold">Witaj w Chronos Vault</h2>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Zamknij"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
          <p className="text-slate-400">Zaproszenie dla:</p>
          <p className="font-semibold text-white">{invite.name} ({invite.email})</p>
          <p className="text-emerald-400 flex items-center gap-1.5 pt-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Rola w przestrzeni: <span className="uppercase font-mono">{invite.role}</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={onSignInGoogle}
            className="w-full py-3 px-4 rounded-xl bg-white text-slate-950 font-semibold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
          >
            <span>{userEmail ? `Zalogowano: ${userEmail}` : '1. Zaloguj się kontem Google Workspace'}</span>
          </button>

          {installed ? (
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs text-center font-medium">
              Aplikacja Chronos Vault została zainstalowana na telefonie!
            </div>
          ) : deferredPrompt ? (
            <button
              type="button"
              onClick={handleInstallClick}
              className="w-full py-3 px-4 rounded-xl bg-sky-500 text-slate-950 font-semibold text-sm hover:bg-sky-400 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>2. Zainstaluj aplikację na telefonie (1 klik)</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-sky-950/50 border border-sky-800/60 text-xs text-sky-200 space-y-1.5">
              <p className="font-semibold flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                2. Instalacja na ekranie głównym telefonu (PWA):
              </p>
              {isIOS ? (
                <p className="text-sky-200/80">
                  W Safari kliknij ikonę <strong>Udostępnij</strong> na dole ekranu, a następnie wybierz{' '}
                  <strong>„Do ekranu początkowego”</strong>.
                </p>
              ) : (
                <p className="text-sky-200/80">
                  W Chrome/Edge kliknij menu przeglądarki (⋮) i wybierz{' '}
                  <strong>„Zainstaluj aplikację”</strong> lub <strong>„Dodaj do ekranu głównego”</strong>.
                </p>
              )}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="w-full py-2 text-xs text-slate-400 hover:text-white transition-colors"
        >
          Przejdź bezpośrednio do aplikacji →
        </button>
      </div>
    </div>
  );
};

export const WorkspaceInviteGeneratorModal: React.FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'zespol' | 'lekarz' | 'admin'>('zespol');
  const [invites, setInvites] = useState<InviteRecord[]>([]);
  const [lastCreated, setLastCreated] = useState<{
    inviteUrl: string;
    mailtoUrl: string;
    emailBody: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch('/api/invites', { cache: 'no-store' })
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.invites)) setInvites(d.invites);
      })
      .catch(() => {});
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, role }),
    });
    if (!res.ok) return;
    const data = await res.json();
    if (data?.invite) {
      setInvites((prev) => [data.invite, ...prev.filter((i) => i.email !== data.invite.email)]);
      setLastCreated({
        inviteUrl: data.invite.inviteUrl,
        mailtoUrl: data.mailtoUrl,
        emailBody: data.emailBody,
      });
      setEmail('');
      setName('');
    }
  };

  const copyLink = (url: string) => {
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-500" />
              Zaproś zespół (Link + Instalator PWA na telefon)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Wygeneruj link dla konta Google Workspace / bmclinic.co z instalacją 1-klik na smartfonie
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@bmclinic.co"
            className="sm:col-span-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as 'zespol' | 'lekarz' | 'admin')}
            className="rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
          >
            <option value="zespol">Zespół</option>
            <option value="lekarz">Lekarz</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Imię i nazwisko (opcjonalnie)"
            className="sm:col-span-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
          />
          <button
            type="submit"
            className="rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs py-2 px-3"
          >
            Generuj link
          </button>
        </form>

        {lastCreated && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2.5 text-xs">
            <p className="font-semibold text-emerald-800 dark:text-emerald-300">
              Gotowy link zaproszenia z instalatorem PWA:
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={lastCreated.inviteUrl}
                className="flex-1 rounded border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-slate-950 px-2.5 py-1.5 font-mono text-[11px] text-slate-800 dark:text-slate-200"
              />
              <button
                type="button"
                onClick={() => copyLink(lastCreated.inviteUrl)}
                className="px-2.5 py-1.5 rounded bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950 font-semibold flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Skopiowano' : 'Kopiuj'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <a
                href={lastCreated.mailtoUrl}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-500"
              >
                <Mail className="w-3.5 h-3.5" />
                Wyślij e-mail zaproszenia
              </a>
              <a
                href={lastCreated.inviteUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Podgląd ekranu telefonu
              </a>
            </div>
          </div>
        )}

        {invites.length > 0 && (
          <div className="space-y-1.5 max-h-40 overflow-y-auto pt-2 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[11px] font-semibold text-slate-500">Aktywne zaproszenia ({invites.length}):</p>
            {invites.map((inv) => (
              <div
                key={inv.token}
                className="flex items-center justify-between gap-2 text-xs p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800"
              >
                <span className="truncate">
                  <strong>{inv.email}</strong> <span className="opacity-60">({inv.role})</span>
                </span>
                {inv.inviteUrl && (
                  <button
                    type="button"
                    onClick={() => copyLink(inv.inviteUrl!)}
                    className="text-sky-600 dark:text-sky-400 hover:underline shrink-0"
                  >
                    Kopiuj link
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
