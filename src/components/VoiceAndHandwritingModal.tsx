import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, PenTool, Upload, Sparkles, Check, Trash2, FileAudio, RefreshCw, X, FolderOpen, Download } from 'lucide-react';

export interface ExtractedTaskDraft {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDateOffsetDays: number;
  estimatedMinutes: number;
  tags: string[];
}

export interface SavedVoiceNoteRecord {
  id: string;
  fileName: string;
  relativePath: string;
  absolutePath: string;
  audioUrl: string;
  mimeType: string;
  sizeBytes: number;
  durationSeconds: number;
  transcript: string;
  tasksCount: number;
  createdAt: string;
}

interface SpeechRecognitionAlternativeLike {
  transcript: string;
}

interface SpeechRecognitionResultLike {
  isFinal: boolean;
  length: number;
  0: SpeechRecognitionAlternativeLike;
}

interface SpeechRecognitionEventLike {
  resultIndex: number;
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionLike {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: unknown) => void) | null;
  start: () => void;
  stop: () => void;
}

interface VoiceAndHandwritingModalProps {
  isOpen: boolean;
  initialTab: 'voice' | 'handwriting';
  onClose: () => void;
  onCreateTasks: (tasks: ExtractedTaskDraft[], sourceType: 'voice' | 'handwriting') => Promise<void>;
}

const PRIORITY_NAMES: Record<ExtractedTaskDraft['priority'], string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
  urgent: 'Krytyczny',
};

export const VoiceAndHandwritingModal: React.FC<VoiceAndHandwritingModalProps> = ({
  isOpen,
  initialTab,
  onClose,
  onCreateTasks,
}) => {
  const [activeTab, setActiveTab] = useState<'voice' | 'handwriting'>(initialTab);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceNoteFallback, setVoiceNoteFallback] = useState('');
  const [liveInterimText, setLiveInterimText] = useState('');
  const [savedNotes, setSavedNotes] = useState<SavedVoiceNoteRecord[]>([]);
  const [voiceDirectory, setVoiceDirectory] = useState<string>('data/voice-notes');
  const [latestSavedNote, setLatestSavedNote] = useState<SavedVoiceNoteRecord | null>(null);
  const [speechActive, setSpeechActive] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingSecondsRef = useRef<number>(0);
  const voiceTranscriptRef = useRef<string>('');

  // Handwriting canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#0F172A');
  const [strokeWidth, setStrokeWidth] = useState(3);

  // AI Processing & Results state
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>('');
  const [extractedTasks, setExtractedTasks] = useState<ExtractedTaskDraft[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const loadSavedVoiceNotes = async () => {
    try {
      const res = await fetch('/api/voice-notes');
      if (!res.ok) return;
      const data = await res.json();
      if (data.directory) setVoiceDirectory(String(data.directory));
      if (Array.isArray(data.notes)) setSavedNotes(data.notes);
    } catch {
      // Ignore fetch failure when offline
    }
  };

  useEffect(() => {
    recordingSecondsRef.current = recordingSeconds;
  }, [recordingSeconds]);

  useEffect(() => {
    voiceTranscriptRef.current = voiceNoteFallback;
  }, [voiceNoteFallback]);

  useEffect(() => {
    setActiveTab(initialTab);
    setErrorMessage(null);
    if (isOpen) {
      loadSavedVoiceNotes();
    }
  }, [initialTab, isOpen]);

  useEffect(() => {
    let timer: number | undefined;
    if (isRecording) {
      timer = window.setInterval(() => {
        setRecordingSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRecording]);

  useEffect(() => {
    if (isOpen && activeTab === 'handwriting') {
      setTimeout(() => {
        initCanvasWithSample(false);
      }, 60);
    }
  }, [isOpen, activeTab]);

  if (!isOpen) return null;

  const initCanvasWithSample = (drawSampleText: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle ruled notebook lines
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 1;
    for (let y = 40; y < canvas.height; y += 36) {
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(canvas.width - 20, y);
      ctx.stroke();
    }

    if (drawSampleText) {
      ctx.fillStyle = '#1E293B';
      ctx.font = 'italic 22px "Georgia", serif';
      ctx.fillText('1. Audyt bezpieczeństwa bazy Firestore (Pilne - 60 min)', 32, 70);
      ctx.fillText('2. Wysłanie raportu PDF dla zarządu do jutra (30 min)', 32, 142);
      ctx.fillText('3. Synchronizacja kalendarza zespołu produkcyjnego (45 min)', 32, 214);
    }
  };

  const startRecording = async () => {
    setErrorMessage(null);
    setLatestSavedNote(null);
    setLiveInterimText('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];
      recordingSecondsRef.current = 0;

      // Start live Polish SpeechRecognition alongside MediaRecorder when supported
      const SpeechCtor =
        (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike; webkitSpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition ||
        (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition;

      if (SpeechCtor) {
        try {
          const recognition = new SpeechCtor();
          recognition.lang = 'pl-PL';
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.onresult = (event: SpeechRecognitionEventLike) => {
            let finalChunk = '';
            let interimChunk = '';
            for (let i = event.resultIndex; i < event.results.length; i += 1) {
              const res = event.results[i];
              const text = res[0]?.transcript || '';
              if (res.isFinal) finalChunk += `${text} `;
              else interimChunk += text;
            }
            if (finalChunk.trim()) {
              setVoiceNoteFallback((prev) => {
                const next = prev.trim() ? `${prev.trim()} ${finalChunk.trim()}` : finalChunk.trim();
                voiceTranscriptRef.current = next;
                return next;
              });
            }
            setLiveInterimText(interimChunk);
          };
          recognition.onerror = () => {
            setSpeechActive(false);
          };
          recognition.start();
          speechRecognitionRef.current = recognition;
          setSpeechActive(true);
        } catch {
          setSpeechActive(false);
        }
      }

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        if (speechRecognitionRef.current) {
          try {
            speechRecognitionRef.current.stop();
          } catch {
            // Ignore stop error
          }
          speechRecognitionRef.current = null;
        }
        setSpeechActive(false);
        setLiveInterimText('');
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await processAudioBlob(audioBlob, recordingSecondsRef.current);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setErrorMessage(
        'Brak dostępu do mikrofonu w bieżącym oknie przeglądarki. Możesz wpisać lub wgrać plik audio poniżej — plik zostanie zapisany na dysku.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64 = result.includes(',') ? result.split(',')[1] : result;
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const processAudioBlob = async (blob?: Blob, durationSec?: number) => {
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      let audioBase64: string | undefined;
      let mimeType: string | undefined;

      if (blob && blob.size > 0) {
        audioBase64 = await blobToBase64(blob);
        mimeType = blob.type || 'audio/webm';
      }

      const textToSend = (voiceTranscriptRef.current || voiceNoteFallback).trim();
      const response = await fetch('/api/ai/transcribe-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType,
          durationSeconds: durationSec ?? recordingSecondsRef.current,
          textFallback: textToSend,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Nie udało się przetworzyć notatki głosowej.');
      }

      if (data.directory) setVoiceDirectory(String(data.directory));
      if (data.savedNote) {
        setLatestSavedNote(data.savedNote);
        await loadSavedVoiceNotes();
      }
      setTranscript(data.transcript || '');
      setExtractedTasks(data.tasks || []);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Wystąpił błąd podczas zapisu notatki głosowej.');
    } finally {
      setIsProcessing(false);
    }
  };

  const deleteSavedVoiceNote = async (id: string) => {
    try {
      const res = await fetch(`/api/voice-notes/${encodeURIComponent(id)}`, { method: 'DELETE' });
      if (res.ok) {
        setSavedNotes((prev) => prev.filter((n) => n.id !== id));
        if (latestSavedNote?.id === id) setLatestSavedNote(null);
      }
    } catch {
      // Ignore delete error
    }
  };

  const handleAudioFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processAudioBlob(file);
  };

  // Canvas pointer handlers
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    setIsDrawing(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const recognizeCanvasHandwriting = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const imageBase64 = dataUrl.split(',')[1];

      const response = await fetch('/api/ai/recognize-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: 'image/png',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Błąd optycznego rozpoznawania pisma (OCR).');
      }

      setTranscript(data.transcript || '');
      setExtractedTasks(data.tasks || []);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Nie udało się rozpoznać pisma odręcznego.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHandwritingImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setErrorMessage(null);
    try {
      const imageBase64 = await blobToBase64(file);
      const response = await fetch('/api/ai/recognize-handwriting', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64,
          mimeType: file.type || 'image/png',
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Błąd analizy obrazu pisma odręcznego.');
      }

      setTranscript(data.transcript || '');
      setExtractedTasks(data.tasks || []);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Nie udało się odczytać zdjęcia notatki.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirmCreateTasks = async () => {
    if (extractedTasks.length === 0) return;
    setIsSaving(true);
    try {
      await onCreateTasks(extractedTasks, activeTab);
      setExtractedTasks([]);
      setTranscript('');
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const removeDraftTask = (idx: number) => {
    setExtractedTasks((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-3xl rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Inteligentna Konwersja Notatek na Zadania (AI)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Przekształcaj nagrania głosowe oraz odręczne szkice bezpośrednio w zadania na tablicy Kanban
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Zamknij okno"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="px-6 pt-4 flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
          <button
            onClick={() => setActiveTab('voice')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'voice'
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <Mic className="w-4 h-4" />
            Notatka Głosowa na Tekst i Zadania
          </button>
          <button
            onClick={() => setActiveTab('handwriting')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'handwriting'
                ? 'bg-slate-900 text-white dark:bg-sky-500 dark:text-slate-950'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
            }`}
          >
            <PenTool className="w-4 h-4" />
            Rozpoznawanie Pisma Odręcznego (OCR)
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200">
              {errorMessage}
            </div>
          )}

          {activeTab === 'voice' ? (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Natywne Nagrywanie Głosu + Zapis Plików Audio
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Nagrywa audio mikrofonem, rozpoznaje polską mowę na żywo i zapisuje pliki w{' '}
                    <code className="text-[11px] bg-slate-200/70 dark:bg-slate-800 px-1 py-0.5 rounded">
                      data/voice-notes/
                    </code>
                    .
                  </p>
                  {isRecording && (
                    <div className="text-xs font-medium text-red-600 dark:text-red-400">
                      ● Nagrywanie aktywne ({recordingSeconds}s)
                      {speechActive ? ' · Dyktowanie pl-PL aktywne' : ''}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      disabled={isProcessing}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <Mic className="w-4 h-4" />
                      Rozpocznij Nagrywanie
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <Square className="w-4 h-4 text-red-500" />
                      Zatrzymaj i Zapisz ({recordingSeconds}s)
                    </button>
                  )}

                  <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0">
                    <FileAudio className="w-4 h-4" />
                    Wgraj Audio
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleAudioFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {liveInterimText && (
                <div className="p-2.5 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-xs text-sky-900 dark:text-sky-200">
                  Rozpoznawanie na żywo: <span className="italic">{liveInterimText}</span>
                </div>
              )}

              {latestSavedNote && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center justify-between gap-2 text-xs text-emerald-900 dark:text-emerald-200">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Zapisano plik audio: {latestSavedNote.fileName}
                    </span>
                    <a
                      href={latestSavedNote.audioUrl}
                      download={latestSavedNote.fileName}
                      className="inline-flex items-center gap-1 font-medium underline"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Pobierz
                    </a>
                  </div>
                  <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 break-all">
                    Ścieżka na dysku: {latestSavedNote.absolutePath}
                  </div>
                  <audio controls src={latestSavedNote.audioUrl} className="w-full h-9" />
                </div>
              )}

              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Transkrypcja / treść notatki głosowej:
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setVoiceNoteFallback(
                          'Przygotować raport kwartalny na jutro (wysoki priorytet, 60 minut), a potem umówić przegląd kodu na 15 minut.'
                        )
                      }
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Wstaw przykład
                    </button>
                    <button
                      type="button"
                      onClick={() => processAudioBlob()}
                      disabled={isProcessing || !voiceNoteFallback.trim()}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                    >
                      {isProcessing ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Sparkles className="w-3.5 h-3.5" />
                      )}
                      Konwertuj na Zadania AI
                    </button>
                  </div>
                </div>
                <textarea
                  rows={3}
                  value={voiceNoteFallback}
                  onChange={(e) => setVoiceNoteFallback(e.target.value)}
                  placeholder="Kliknij 'Rozpocznij Nagrywanie' aby nagrać głos i zapisać plik audio na dysku, albo wpisz treść notatki..."
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <FolderOpen className="w-4 h-4 text-sky-500" />
                    Zapisane Pliki Audio na Dysku ({savedNotes.length})
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 break-all">
                    {voiceDirectory}
                  </span>
                </div>

                {savedNotes.length === 0 ? (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Brak zapisanych plików audio. Kliknij „Rozpocznij Nagrywanie” lub „Wgraj Audio”, aby utworzyć pierwsze nagranie w {voiceDirectory}.
                  </p>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {savedNotes.map((note) => (
                      <div
                        key={note.id}
                        className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="text-xs font-medium text-slate-800 dark:text-slate-200 truncate">
                            {note.fileName} ({Math.max(1, Math.round(note.sizeBytes / 1024))} KB)
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={note.audioUrl}
                              download={note.fileName}
                              className="text-xs text-blue-600 dark:text-sky-400 hover:underline"
                            >
                              Pobierz
                            </a>
                            <button
                              type="button"
                              onClick={() => deleteSavedVoiceNote(note.id)}
                              className="text-slate-400 hover:text-red-600"
                              title="Usuń nagranie z dysku"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <audio controls src={note.audioUrl} className="w-full h-8" />
                        {note.transcript && (
                          <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                            {note.transcript}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Kolor pióra:</span>
                  {['#0F172A', '#1D4ED8', '#047857', '#B91C1C'].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setStrokeColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        strokeColor === c ? 'scale-110 border-sky-500' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={`Kolor ${c}`}
                    />
                  ))}
                  <span className="text-xs text-slate-400 mx-1">·</span>
                  <button
                    type="button"
                    onClick={() => initCanvasWithSample(true)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                  >
                    Wstaw Przykładowe Pismo Odręczne
                  </button>
                  <button
                    type="button"
                    onClick={() => initCanvasWithSample(false)}
                    className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0"
                  >
                    Wyczyść
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    Wgraj Zdjęcie Notatki
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHandwritingImageUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={recognizeCanvasHandwriting}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-medium transition-colors whitespace-nowrap shrink-0"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    Rozpoznaj Pismo (OCR)
                  </button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={720}
                  height={260}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerLeave={handlePointerUp}
                  className="w-full h-[220px] touch-none cursor-crosshair block"
                />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Napisz zadania odręcznie myszką/rysikiem na kartce powyżej lub kliknij „Wstaw Przykładowe Pismo Odręczne”, a następnie „Rozpoznaj Pismo (OCR)”.
              </p>
            </div>
          )}

          {/* Extracted Results Preview */}
          {(transcript || extractedTasks.length > 0) && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              {transcript && (
                <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Odczytany tekst źródłowy:
                  </div>
                  <p className="text-sm text-slate-800 dark:text-slate-200">{transcript}</p>
                </div>
              )}

              {extractedTasks.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Wyodrębnione zadania do utworzenia ({extractedTasks.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleConfirmCreateTasks}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
                    >
                      <Check className="w-4 h-4" />
                      {isSaving ? 'Zapisywanie...' : `Dodaj wszystkie zadania (${extractedTasks.length})`}
                    </button>
                  </div>

                  <div className="space-y-2">
                    {extractedTasks.map((task, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex items-start justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {task.title}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1 tabular-nums">
                            <span>Priorytet: {PRIORITY_NAMES[task.priority] || task.priority}</span>
                            <span aria-hidden="true">·</span>
                            <span>Termin: +{task.dueDateOffsetDays} dni</span>
                            <span aria-hidden="true">·</span>
                            <span>Szacowany czas: {task.estimatedMinutes} min</span>
                            {task.tags?.length > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span>Tagi: {task.tags.join(', ')}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDraftTask(index)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                          title="Usuń ze szkicu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
