import React, { useEffect, useRef, useState } from 'react';
import { Mic, Square, PenTool, Upload, Sparkles, Check, Trash2, FileAudio, RefreshCw, X } from 'lucide-react';

export interface ExtractedTaskDraft {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDateOffsetDays: number;
  estimatedMinutes: number;
  tags: string[];
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
  const [voiceNoteFallback, setVoiceNoteFallback] = useState(
    'Przygotować raport kwartalny sprzedaży na jutro (wysoki priorytet, około 90 minut), a potem umówić spotkanie zespołu projektowego na piątek w sprawie wdrożenia szyfrowania E2EE (45 minut).'
  );
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

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

  useEffect(() => {
    setActiveTab(initialTab);
    setErrorMessage(null);
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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      audioChunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
        await processAudioBlob(audioBlob);
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch {
      setErrorMessage(
        'Brak dostępu do mikrofonu w bieżącym oknie przeglądarki. Możesz podyktować lub edytować treść notatki głosowej poniżej i uruchomić ekstrakcję zadań AI.'
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

  const processAudioBlob = async (blob?: Blob) => {
    setIsProcessing(true);
    setErrorMessage(null);
    try {
      let audioBase64: string | undefined;
      let mimeType: string | undefined;

      if (blob && blob.size > 0) {
        audioBase64 = await blobToBase64(blob);
        mimeType = blob.type || 'audio/webm';
      }

      const response = await fetch('/api/ai/transcribe-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          mimeType,
          textFallback: voiceNoteFallback,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Nie udało się przetworzyć notatki głosowej.');
      }

      setTranscript(data.transcript || '');
      setExtractedTasks(data.tasks || []);
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Wystąpił błąd podczas analizy AI.');
    } finally {
      setIsProcessing(false);
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
                    Nagrywanie Głosu (Gemini 3.5 Transcribe)
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Nagraj głos mikrofonem, prześlij plik audio lub przetestuj dyktowanie poniżej.
                  </p>
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
                      Zatrzymaj ({recordingSeconds}s)
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

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Zapis dyktowania głosowego / symulator notatki głosowej:
                  </label>
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
                <textarea
                  rows={3}
                  value={voiceNoteFallback}
                  onChange={(e) => setVoiceNoteFallback(e.target.value)}
                  placeholder="Wpisz lub podyktuj treść notatki głosowej, np. 'Zrobić przegląd kodu o 14:00 i wysłać ofertę do klienta jutro rano'..."
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
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
