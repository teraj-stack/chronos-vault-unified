import React, { useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  MapPin,
  Activity,
  ClipboardList,
  Wrench,
  CheckCircle2,
  Trash2,
  CalendarPlus,
  Edit3,
  Check,
  X,
  AlertTriangle,
} from 'lucide-react';
import { formatLocalDateOnly } from '../lib/calendarSync';
import {
  buildWeekDays,
  computeMinutesBetween,
  type ClinicDeviceRecord,
  type ClinicTreatmentRecord,
} from '../lib/clinicModels';
import { ClinicDeviceTwin3D } from './ClinicDeviceTwin3D';

interface ClinicEquipmentViewProps {
  devices: ClinicDeviceRecord[];
  treatments: ClinicTreatmentRecord[];
  onCreateDevice: (draft: Omit<ClinicDeviceRecord, 'id' | 'ownerId' | 'collaboratorEmails'>) => Promise<void>;
  onUpdateDevice: (
    deviceId: string,
    patch: Partial<Omit<ClinicDeviceRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => Promise<void>;
  onDeleteDevice: (deviceId: string) => Promise<void>;
  onCreateTreatment: (
    draft: Omit<ClinicTreatmentRecord, 'id' | 'ownerId' | 'collaboratorEmails'>
  ) => Promise<void>;
  onUpdateTreatment: (
    treatmentId: string,
    patch: Partial<Omit<ClinicTreatmentRecord, 'id' | 'ownerId' | 'collaboratorEmails'>>
  ) => Promise<void>;
  onDeleteTreatment: (treatmentId: string) => Promise<void>;
  onLogTreatmentWearToDevice: (treatment: ClinicTreatmentRecord) => Promise<void>;
  onPromoteTreatmentToTask: (treatment: ClinicTreatmentRecord) => Promise<void>;
}

const UNASSIGNED_LOCATION_KEY = '__UNASSIGNED_CLINIC__';

const DEVICE_STATUS_META: Record<
  ClinicDeviceRecord['status'],
  { label: string; textClass: string }
> = {
  operational: {
    label: 'Sprawne / Gotowe',
    textClass: 'text-emerald-600 dark:text-emerald-400 font-semibold',
  },
  in_use: {
    label: 'W trakcie pracy',
    textClass: 'text-blue-600 dark:text-sky-400 font-semibold',
  },
  maintenance: {
    label: 'Przegląd serwisowy',
    textClass: 'text-amber-600 dark:text-amber-400 font-semibold',
  },
};

const TREATMENT_STATUS_META: Record<
  ClinicTreatmentRecord['status'],
  { label: string; textClass: string }
> = {
  planned: {
    label: 'Zaplanowany',
    textClass: 'text-blue-600 dark:text-sky-400 font-medium',
  },
  confirmed: {
    label: 'Potwierdzony',
    textClass: 'text-emerald-600 dark:text-emerald-400 font-semibold',
  },
  completed: {
    label: 'Zakończony',
    textClass: 'text-slate-700 dark:text-slate-300 font-semibold',
  },
  cancelled: {
    label: 'Odwołany',
    textClass: 'text-red-600 dark:text-red-400',
  },
};

export const ClinicEquipmentView: React.FC<ClinicEquipmentViewProps> = ({
  devices,
  treatments,
  onCreateDevice,
  onUpdateDevice,
  onDeleteDevice,
  onCreateTreatment,
  onUpdateTreatment,
  onDeleteTreatment,
  onLogTreatmentWearToDevice,
  onPromoteTreatmentToTask,
}) => {
  // Week Navigation State
  const [weekAnchorDate, setWeekAnchorDate] = useState<string>(() =>
    formatLocalDateOnly(new Date())
  );

  // Clinic Location Filter & Quick Fill State
  const [selectedLocationFilter, setSelectedLocationFilter] = useState<string>('all');
  const [customLocationDraft, setCustomLocationDraft] = useState<string>('');

  // Dedicated Sub-Panel Subpage State ('wear' = Informacje o zużyciu sprzętu, 'treatments' = Plan zabiegów)
  const [activeSubpage, setActiveSubpage] = useState<'wear' | 'treatments'>('wear');
  const subpanelRef = useRef<HTMLDivElement | null>(null);

  // Inline Clinic Location Editing for Devices
  const [editingDeviceLocationId, setEditingDeviceLocationId] = useState<string | null>(null);
  const [editingDeviceLocationText, setEditingDeviceLocationText] = useState<string>('');

  // Inline Clinic Location Editing for Treatments
  const [editingTreatmentLocationId, setEditingTreatmentLocationId] = useState<string | null>(null);
  const [editingTreatmentLocationText, setEditingTreatmentLocationText] = useState<string>('');

  // Add New Device Modal / Expandable Panel
  const [isAddDeviceOpen, setIsAddDeviceOpen] = useState<boolean>(false);
  const [devName, setDevName] = useState('');
  const [devSerial, setDevSerial] = useState('');
  const [devClinicLocation, setDevClinicLocation] = useState('');
  const [devRoom, setDevRoom] = useState('Gabinet 1');
  const [devMaxHours, setDevMaxHours] = useState('500');
  const [devMaxPulses, setDevMaxPulses] = useState('200000');
  const [devNextService, setDevNextService] = useState(() =>
    formatLocalDateOnly(new Date(Date.now() + 86400000 * 60))
  );
  const [devWearNotes, setDevWearNotes] = useState('');

  // Wear Increment Quick Inputs per device
  const [wearDeltaInputs, setWearDeltaInputs] = useState<
    Record<string, { hours: string; pulses: string }>
  >({});
  const [editingWearNotesMap, setEditingWearNotesMap] = useState<Record<string, string>>({});
  const [editingNextServiceMap, setEditingNextServiceMap] = useState<Record<string, string>>({});

  // Treatment Plan Form State (inside Subpage 2: Plan zabiegów)
  const [trtDeviceId, setTrtDeviceId] = useState<string>(() => devices[0]?.id || '');
  const [trtClinicLocation, setTrtClinicLocation] = useState<string>(
    () => devices[0]?.clinicLocation || ''
  );
  const [trtProcedureName, setTrtProcedureName] = useState('');
  const [trtPatientRef, setTrtPatientRef] = useState('');
  const [trtOperatorName, setTrtOperatorName] = useState('');
  const [trtDate, setTrtDate] = useState<string>(() => formatLocalDateOnly(new Date()));
  const [trtStartTime, setTrtStartTime] = useState('10:00');
  const [trtEndTime, setTrtEndTime] = useState('11:00');
  const [trtPlannedPulses, setTrtPlannedPulses] = useState('1200');
  const [trtNotes, setTrtNotes] = useState('');
  const [trtStatusFilter, setTrtStatusFilter] = useState<string>('all');
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);

  const weekDays = useMemo(() => buildWeekDays(weekAnchorDate), [weekAnchorDate]);

  const shiftWeek = (deltaDays: number) => {
    const base = new Date(`${weekAnchorDate}T12:00:00`);
    base.setDate(base.getDate() + deltaDays);
    setWeekAnchorDate(formatLocalDateOnly(base));
  };

  // Unique filled-in clinic locations across both devices & treatments
  const knownLocations = useMemo(() => {
    const set = new Set<string>();
    devices.forEach((d) => {
      if (d.clinicLocation.trim()) set.add(d.clinicLocation.trim());
    });
    treatments.forEach((t) => {
      if (t.clinicLocation.trim()) set.add(t.clinicLocation.trim());
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'pl'));
  }, [devices, treatments]);

  const unassignedDevicesCount = useMemo(
    () => devices.filter((d) => !d.clinicLocation.trim()).length,
    [devices]
  );

  // Filtered Devices according to Clinic Location selection
  const filteredDevices = useMemo(() => {
    if (selectedLocationFilter === 'all') return devices;
    if (selectedLocationFilter === UNASSIGNED_LOCATION_KEY) {
      return devices.filter((d) => !d.clinicLocation.trim());
    }
    return devices.filter((d) => d.clinicLocation.trim() === selectedLocationFilter);
  }, [devices, selectedLocationFilter]);

  // Group filtered devices by Clinic Location for partitioned schedules ("grafiki urządzeń z podziałem na lokalizację klinik")
  const devicesGroupedByClinic = useMemo(() => {
    const groupsMap = new Map<string, ClinicDeviceRecord[]>();
    filteredDevices.forEach((dev) => {
      const key = dev.clinicLocation.trim() || UNASSIGNED_LOCATION_KEY;
      const existing = groupsMap.get(key) || [];
      existing.push(dev);
      groupsMap.set(key, existing);
    });

    return Array.from(groupsMap.entries()).map(([locationKey, groupDevices]) => ({
      locationKey,
      displayLabel:
        locationKey === UNASSIGNED_LOCATION_KEY
          ? 'Lokalizacja kliniki do uzupełnienia'
          : locationKey,
      isUnassigned: locationKey === UNASSIGNED_LOCATION_KEY,
      devices: groupDevices,
    }));
  }, [filteredDevices]);

  // Filtered Treatments for Subpage 2 ("Plan zabiegów")
  const filteredTreatments = useMemo(() => {
    return treatments
      .filter((t) => {
        const matchesLoc =
          selectedLocationFilter === 'all'
            ? true
            : selectedLocationFilter === UNASSIGNED_LOCATION_KEY
            ? !t.clinicLocation.trim()
            : t.clinicLocation.trim() === selectedLocationFilter;
        const matchesStatus = trtStatusFilter === 'all' || t.status === trtStatusFilter;
        return matchesLoc && matchesStatus;
      })
      .sort((a, b) =>
        `${a.scheduledDate}T${a.startTime}`.localeCompare(`${b.scheduledDate}T${b.startTime}`)
      );
  }, [treatments, selectedLocationFilter, trtStatusFilter]);

  // Computed Wear Telemetry for Subpage 1 ("Informacje o zużyciu sprzętu")
  const wearSummary = useMemo(() => {
    const totalHours = filteredDevices.reduce((sum, d) => sum + d.usedHours, 0);
    const totalPulses = filteredDevices.reduce((sum, d) => sum + d.usedPulses, 0);
    let highWearCount = 0;
    let pctSum = 0;

    filteredDevices.forEach((d) => {
      const hourPct = d.maxServiceHours > 0 ? (d.usedHours / d.maxServiceHours) * 100 : 0;
      const pulsePct = d.maxPulses > 0 ? (d.usedPulses / d.maxPulses) * 100 : 0;
      const maxPct = Math.max(hourPct, pulsePct);
      pctSum += Math.min(maxPct, 100);
      if (maxPct >= 75 || d.status === 'maintenance') {
        highWearCount += 1;
      }
    });

    const avgWearPct =
      filteredDevices.length > 0 ? Math.round(pctSum / filteredDevices.length) : 0;

    return {
      totalHours: Math.round(totalHours * 10) / 10,
      totalPulses,
      highWearCount,
      avgWearPct,
    };
  }, [filteredDevices]);

  const handleQuickAssignBlankDevicesLocation = async () => {
    const loc = customLocationDraft.trim().slice(0, 160);
    if (!loc) return;
    const blankDevices = devices.filter((d) => !d.clinicLocation.trim());
    if (blankDevices.length > 0) {
      for (const dev of blankDevices) {
        await onUpdateDevice(dev.id, { clinicLocation: loc });
      }
      setFeedbackBanner(
        `Uzupełniono pole lokalizacji kliniki „${loc}” dla ${blankDevices.length} urządzeń.`
      );
    } else {
      setDevClinicLocation(loc);
      setTrtClinicLocation(loc);
      setIsAddDeviceOpen(true);
      setFeedbackBanner(
        `Wpisano lokalizację „${loc}” do formularza nowego urządzenia i planu zabiegów.`
      );
    }
    setCustomLocationDraft('');
  };

  const handleCreateDeviceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devName.trim()) return;

    await onCreateDevice({
      name: devName.trim().slice(0, 140),
      modelOrSerial: devSerial.trim().slice(0, 120),
      clinicLocation: devClinicLocation.trim().slice(0, 160),
      roomName: devRoom.trim().slice(0, 80) || 'Gabinet 1',
      status: 'operational',
      usedHours: 0,
      maxServiceHours: Math.max(1, Number(devMaxHours) || 500),
      usedPulses: 0,
      maxPulses: Math.max(1, Number(devMaxPulses) || 200000),
      lastServiceDate: formatLocalDateOnly(new Date()),
      nextServiceDate: devNextService || formatLocalDateOnly(new Date(Date.now() + 86400000 * 60)),
      wearNotes: devWearNotes.trim().slice(0, 1000) || 'Urządzenie zarejestrowane — licznik początkowy 0.',
    });

    setDevName('');
    setDevSerial('');
    setDevWearNotes('');
    setIsAddDeviceOpen(false);
    setFeedbackBanner('Dodano nowe urządzenie do grafiku kliniki.');
  };

  const handleCreateTreatmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trtProcedureName.trim()) return;

    const chosenDevice = devices.find((d) => d.id === trtDeviceId) || devices[0];
    if (!chosenDevice) return;

    const durationMinutes = computeMinutesBetween(trtStartTime, trtEndTime);
    const pulses = Math.max(0, Math.min(1000000, Math.round(Number(trtPlannedPulses) || 0)));

    await onCreateTreatment({
      deviceId: chosenDevice.id,
      deviceName: chosenDevice.name,
      clinicLocation: trtClinicLocation.trim().slice(0, 160),
      procedureName: trtProcedureName.trim().slice(0, 160),
      patientRef: trtPatientRef.trim().slice(0, 80) || 'Karta #ZAB-NOWA',
      operatorName: trtOperatorName.trim().slice(0, 120) || 'Zespół zabiegowy',
      scheduledDate: trtDate,
      startTime: trtStartTime,
      endTime: trtEndTime,
      plannedPulses: pulses,
      durationMinutes,
      status: 'planned',
      usageLogged: false,
      notes: trtNotes.trim().slice(0, 1000),
    });

    // If the device itself had an empty clinicLocation and user filled it during scheduling, offer seamless sync
    if (!chosenDevice.clinicLocation.trim() && trtClinicLocation.trim()) {
      await onUpdateDevice(chosenDevice.id, {
        clinicLocation: trtClinicLocation.trim().slice(0, 160),
      });
    }

    setTrtProcedureName('');
    setTrtPatientRef('');
    setTrtNotes('');
    setFeedbackBanner(
      `Dodano zabieg do planu zabiegów oraz tygodniowego grafiku urządzenia „${chosenDevice.name}”.`
    );
  };

  const openScheduleSlotInTreatmentPlan = (device: ClinicDeviceRecord, dateStr: string) => {
    setTrtDeviceId(device.id);
    setTrtClinicLocation(device.clinicLocation);
    setTrtDate(dateStr);
    setActiveSubpage('treatments');
    subpanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAddManualWearDelta = async (device: ClinicDeviceRecord) => {
    const delta = wearDeltaInputs[device.id] || { hours: '', pulses: '' };
    const addHours = Math.max(0, Number(delta.hours) || 0);
    const addPulses = Math.max(0, Math.round(Number(delta.pulses) || 0));
    if (addHours === 0 && addPulses === 0) return;

    const nextHours = Math.min(100000, Math.round((device.usedHours + addHours) * 10) / 10);
    const nextPulses = Math.min(50000000, device.usedPulses + addPulses);

    await onUpdateDevice(device.id, {
      usedHours: nextHours,
      usedPulses: nextPulses,
    });

    setWearDeltaInputs((prev) => ({
      ...prev,
      [device.id]: { hours: '', pulses: '' },
    }));
    setFeedbackBanner(
      `Zaktualizowano zużycie urządzenia „${device.name}” (+${addHours} godz., +${addPulses} imp.).`
    );
  };

  const weekRangeLabel = `${weekDays[0].dayNumber} ${weekDays[0].monthShort} – ${weekDays[6].dayNumber} ${weekDays[6].monthShort} ${weekDays[6].dateStr.slice(0, 4)}`;

  return (
    <div className="space-y-6">
      <datalist id="clinic-locations-datalist">
        {knownLocations.map((loc) => (
          <option key={loc} value={loc} />
        ))}
      </datalist>

      {/* Top Workspace Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Zarządzanie Aparaturą i Klinikami</span>
            <span aria-hidden="true">/</span>
            <span>Grafiki Tygodniowe · Zużycie Sprzętu · Plan Zabiegów</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-1">
            Grafiki Urządzeń wg Lokalizacji Klinik
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Podział tygodniowego obłożenia aparatury na lokalizacje klinik (z otwartym polem do uzupełnienia) wraz z podstronami zużycia sprzętu i planu zabiegów.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              if (
                selectedLocationFilter !== 'all' &&
                selectedLocationFilter !== UNASSIGNED_LOCATION_KEY
              ) {
                setDevClinicLocation(selectedLocationFilter);
              }
              setIsAddDeviceOpen((prev) => !prev);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
            Dodaj Urządzenie
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveSubpage('treatments');
              subpanelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0"
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Zaplanuj Zabieg w Grafiku
          </button>
        </div>
      </div>

      {feedbackBanner && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-3 text-xs font-medium text-emerald-900 dark:text-emerald-200">
          <span>{feedbackBanner}</span>
          <button
            type="button"
            onClick={() => setFeedbackBanner(null)}
            className="p-1 rounded hover:bg-emerald-100 dark:hover:bg-emerald-900"
            aria-label="Zamknij komunikat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Clinic Location Bar (Editable / Fillable Field + Partition Filter) */}
      <section className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-end">
          <div className="xl:col-span-7 space-y-2">
            <span className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Filtruj podział grafików według lokalizacji kliniki:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setSelectedLocationFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  selectedLocationFilter === 'all'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Wszystkie kliniki ({devices.length})
              </button>

              {knownLocations.map((loc) => {
                const count = devices.filter((d) => d.clinicLocation.trim() === loc).length;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocationFilter(loc)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      selectedLocationFilter === loc
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {loc} ({count})
                  </button>
                );
              })}

              {unassignedDevicesCount > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedLocationFilter(UNASSIGNED_LOCATION_KEY)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    selectedLocationFilter === UNASSIGNED_LOCATION_KEY
                      ? 'bg-white dark:bg-slate-800 text-amber-700 dark:text-amber-300 shadow-xs'
                      : 'text-amber-700 dark:text-amber-400 hover:text-amber-800'
                  }`}
                >
                  Do uzupełnienia ({unassignedDevicesCount})
                </button>
              )}
            </div>
          </div>

          {/* Open Fillable Clinic Location Input */}
          <div className="xl:col-span-5 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Lokalizacja kliniki (pole do uzupełnienia):
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                list="clinic-locations-datalist"
                maxLength={160}
                value={customLocationDraft}
                onChange={(e) => setCustomLocationDraft(e.target.value)}
                placeholder="Wpisz lokalizację kliniki, np. Klinika Wrocław Centrum..."
                className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onClick={handleQuickAssignBlankDevicesLocation}
                disabled={!customLocationDraft.trim()}
                className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 disabled:opacity-50 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0"
              >
                {unassignedDevicesCount > 0 ? 'Przypisz do nieuzupełnionych' : 'Użyj lokalizacji'}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Form: Add New Device */}
        {isAddDeviceOpen && (
          <form
            onSubmit={handleCreateDeviceSubmit}
            className="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Rejestracja Nowego Urządzenia w Grafiku Kliniki
              </h3>
              <button
                type="button"
                onClick={() => setIsAddDeviceOpen(false)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Zamknij formularz
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Nazwa urządzenia / aparatury *
                </label>
                <input
                  type="text"
                  required
                  maxLength={140}
                  value={devName}
                  onChange={(e) => setDevName(e.target.value)}
                  placeholder="Np. Laser Pikosekundowy / Kriolipoliza"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Lokalizacja kliniki (pole do uzupełnienia — można zostawić puste)
                </label>
                <input
                  type="text"
                  list="clinic-locations-datalist"
                  maxLength={160}
                  value={devClinicLocation}
                  onChange={(e) => setDevClinicLocation(e.target.value)}
                  placeholder="Wpisz oddział / adres kliniki lub uzupełnij później..."
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Gabinet / Sala oraz Nr seryjny
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    maxLength={80}
                    value={devRoom}
                    onChange={(e) => setDevRoom(e.target.value)}
                    placeholder="Gabinet 2"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                  <input
                    type="text"
                    maxLength={120}
                    value={devSerial}
                    onChange={(e) => setDevSerial(e.target.value)}
                    placeholder="SN-2026-X"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Resurs międzyserwisowy (godz.)
                </label>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={devMaxHours}
                  onChange={(e) => setDevMaxHours(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Maks. limit impulsów głowicy
                </label>
                <input
                  type="number"
                  min={1}
                  max={50000000}
                  value={devMaxPulses}
                  onChange={(e) => setDevMaxPulses(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Data następnego przeglądu
                </label>
                <input
                  type="date"
                  value={devNextService}
                  onChange={(e) => setDevNextService(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors whitespace-nowrap shrink-0"
              >
                Zapisz Urządzenie w Grafiku
              </button>
            </div>
          </form>
        )}
      </section>

      {/* ===================================================================== */}
      {/* 3D DIGITAL TWIN OF CLINICAL DEVICES (THREE.JS + CAD .OBJ EXPORT)      */}
      {/* ===================================================================== */}
      <ClinicDeviceTwin3D devices={filteredDevices} treatments={treatments} />

      {/* ===================================================================== */}
      {/* WEEKLY EQUIPMENT SCHEDULES PARTITIONED BY CLINIC LOCATION             */}
      {/* ===================================================================== */}
      <section className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Tygodniowe Grafiki Urządzeń z Podziałem na Lokalizacje Klinik
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Zakres tygodnia: <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">{weekRangeLabel}</span> · Kliknij „+ Zaplanuj” w dowolnym dniu, aby przypisać zabieg do urządzenia.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => shiftWeek(-7)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Poprzedni tydzień"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setWeekAnchorDate(formatLocalDateOnly(new Date()))}
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap shrink-0"
            >
              Bieżący tydzień
            </button>
            <button
              type="button"
              onClick={() => shiftWeek(7)}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
              aria-label="Następny tydzień"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {devicesGroupedByClinic.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Brak urządzeń spełniających kryteria wybranej lokalizacji kliniki.
            </p>
            <button
              type="button"
              onClick={() => setIsAddDeviceOpen(true)}
              className="text-xs font-semibold text-blue-600 dark:text-sky-400 hover:underline"
            >
              + Dodaj pierwsze urządzenie do grafiku
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {devicesGroupedByClinic.map((group) => (
              <div key={group.locationKey} className="space-y-3">
                {/* Clinic Location Partition Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin
                      className={`w-4 h-4 shrink-0 ${
                        group.isUnassigned
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-blue-600 dark:text-sky-400'
                      }`}
                    />
                    <h3
                      className={`text-sm font-semibold ${
                        group.isUnassigned
                          ? 'text-amber-700 dark:text-amber-300'
                          : 'text-slate-900 dark:text-slate-100'
                      }`}
                    >
                      {group.displayLabel}
                    </h3>
                    <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                      · {group.devices.length} urządz.
                    </span>
                  </div>
                  {group.isUnassigned && (
                    <span className="text-xs text-amber-600 dark:text-amber-400">
                      Wpisz lokalizację bezpośrednio przy urządzeniu poniżej
                    </span>
                  )}
                </div>

                {/* Responsive Weekly Schedule Matrix for this Clinic Location */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[980px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                        <th className="py-2.5 pr-4 w-64 font-semibold">
                          Urządzenie i Lokalizacja Kliniki
                        </th>
                        {weekDays.map((day) => {
                          const isToday = day.dateStr === formatLocalDateOnly(new Date());
                          return (
                            <th
                              key={day.dateStr}
                              className={`py-2.5 px-2 font-semibold font-mono tabular-nums ${
                                isToday
                                  ? 'text-blue-600 dark:text-sky-400'
                                  : 'text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <div>{day.shortDay}</div>
                              <div className="text-[11px] font-normal opacity-80">
                                {day.dayNumber} {day.monthShort}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {group.devices.map((device) => {
                        const statusMeta =
                          DEVICE_STATUS_META[device.status] || DEVICE_STATUS_META.operational;
                        const isEditingLoc = editingDeviceLocationId === device.id;

                        return (
                          <tr key={device.id} className="align-top">
                            {/* Device & Inline Editable Clinic Location Column */}
                            <td className="py-3.5 pr-4 space-y-2">
                              <div>
                                <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                                  {device.name}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5">
                                  {device.roomName}
                                  {device.modelOrSerial ? ` · ${device.modelOrSerial}` : ''}
                                </div>
                              </div>

                              <div className="text-[11px]">
                                <span className={statusMeta.textClass}>{statusMeta.label}</span>
                              </div>

                              {/* Inline Fillable Clinic Location Control */}
                              {isEditingLoc ? (
                                <div className="space-y-1.5 pt-1">
                                  <input
                                    type="text"
                                    list="clinic-locations-datalist"
                                    maxLength={160}
                                    value={editingDeviceLocationText}
                                    onChange={(e) => setEditingDeviceLocationText(e.target.value)}
                                    placeholder="Wpisz lokalizację kliniki..."
                                    className="w-full rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-1 text-[11px] text-slate-900 dark:text-slate-100"
                                  />
                                  <div className="flex items-center gap-1.5">
                                    <button
                                      type="button"
                                      onClick={async () => {
                                        const nextLoc = editingDeviceLocationText.trim().slice(0, 160);
                                        await onUpdateDevice(device.id, {
                                          clinicLocation: nextLoc,
                                        });
                                        setEditingDeviceLocationId(null);
                                      }}
                                      className="flex items-center gap-1 px-2 py-1 rounded bg-slate-900 dark:bg-sky-500 text-white dark:text-slate-950 text-[11px] font-semibold"
                                    >
                                      <Check className="w-3 h-3" />
                                      Zapisz
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setEditingDeviceLocationId(null)}
                                      className="px-2 py-1 rounded text-[11px] text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                                    >
                                      Anuluj
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingDeviceLocationId(device.id);
                                    setEditingDeviceLocationText(device.clinicLocation);
                                  }}
                                  className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-sky-400 hover:underline"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  {device.clinicLocation.trim()
                                    ? 'Zmień lokalizację kliniki'
                                    : 'Uzupełnij lokalizację kliniki'}
                                </button>
                              )}
                            </td>

                            {/* 7 Day Cells */}
                            {weekDays.map((day) => {
                              const cellBookings = treatments.filter(
                                (t) =>
                                  t.deviceId === device.id &&
                                  t.scheduledDate === day.dateStr &&
                                  t.status !== 'cancelled'
                              );

                              return (
                                <td key={day.dateStr} className="py-3 px-1.5 align-top">
                                  <div className="min-h-[88px] p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between gap-2">
                                    <div className="space-y-1.5">
                                      {cellBookings.length === 0 ? (
                                        <span className="text-[11px] text-slate-400 dark:text-slate-600 block">
                                          Wolny grafik
                                        </span>
                                      ) : (
                                        cellBookings.map((booking) => (
                                          <div
                                            key={booking.id}
                                            className="p-1.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-0.5"
                                          >
                                            <div className="text-[11px] font-mono tabular-nums font-semibold text-blue-600 dark:text-sky-400">
                                              {booking.startTime}–{booking.endTime}
                                            </div>
                                            <div className="text-[11px] font-medium text-slate-900 dark:text-slate-100 line-clamp-2 leading-tight">
                                              {booking.procedureName}
                                            </div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                                              {booking.operatorName}
                                            </div>
                                          </div>
                                        ))
                                      )}
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() =>
                                        openScheduleSlotInTreatmentPlan(device, day.dateStr)
                                      }
                                      className="text-[11px] font-medium text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-sky-400 text-left whitespace-nowrap"
                                    >
                                      + Zaplanuj
                                    </button>
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===================================================================== */}
      {/* DEDICATED SECONDARY PANEL WITH SUBPAGES:                              */}
      {/* PODSTRONA 1: INFORMACJE O ZUŻYCIU SPRZĘTU                             */}
      {/* PODSTRONA 2: PLAN ZABIEGÓW                                            */}
      {/* ===================================================================== */}
      <section
        ref={subpanelRef}
        className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-sky-400">
              Panel Eksploatacyjno-Zabiegowy Aparatury
            </div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 mt-0.5">
              {activeSubpage === 'wear'
                ? 'Podstrona 1: Informacje o Zużyciu Sprzętu i Resursie Głowic'
                : 'Podstrona 2: Plan Zabiegów i Harmonogram Procedur'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Przełączaj między podstronami, aby kontrolować motogodziny, liczniki impulsów i przeglądy lub zarządzać szczegółowym planem zabiegów w klinikach.
            </p>
          </div>

          {/* Subpage Navigation Switch */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setActiveSubpage('wear')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSubpage === 'wear'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Podstrona: Zużycie Sprzętu
            </button>
            <button
              type="button"
              onClick={() => setActiveSubpage('treatments')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                activeSubpage === 'treatments'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ClipboardList className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              Podstrona: Plan Zabiegów ({filteredTreatments.length})
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------------- */}
        {/* SUBPAGE 1: INFORMACJE O ZUŻYCIU SPRZĘTU                             */}
        {/* ------------------------------------------------------------------- */}
        {activeSubpage === 'wear' && (
          <div className="space-y-6">
            {/* Real Computed Equipment Wear KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Średnie wykorzystanie resursu
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  {wearSummary.avgWearPct}%
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Dla {filteredDevices.length} urządzeń w widoku
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Suma przepracowanych godzin
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  {wearSummary.totalHours} godz.
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Łączny czas pracy głowic i laserów
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Łączny licznik impulsów / strzałów
                </span>
                <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-slate-100">
                  {wearSummary.totalPulses.toLocaleString('pl-PL')}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Zarejestrowane impulsy zabiegowe
                </span>
              </div>

              <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Wymagające uwagi serwisowej (&ge;75%)
                </span>
                <div
                  className={`text-2xl font-bold font-mono tabular-nums ${
                    wearSummary.highWearCount > 0
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {wearSummary.highWearCount}
                </div>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                  Zbliżający się przegląd lub wymiana kartridża
                </span>
              </div>
            </div>

            {/* Detailed Wear Cards per Device */}
            <div className="space-y-4">
              {filteredDevices.map((dev) => {
                const hourPct = Math.min(
                  100,
                  Math.round((dev.usedHours / Math.max(1, dev.maxServiceHours)) * 100)
                );
                const pulsePct = Math.min(
                  100,
                  Math.round((dev.usedPulses / Math.max(1, dev.maxPulses)) * 100)
                );
                const isNearLimit = hourPct >= 80 || pulsePct >= 80;
                const delta = wearDeltaInputs[dev.id] || { hours: '', pulses: '' };
                const currentNotes =
                  editingWearNotesMap[dev.id] !== undefined
                    ? editingWearNotesMap[dev.id]
                    : dev.wearNotes;
                const currentNextService =
                  editingNextServiceMap[dev.id] !== undefined
                    ? editingNextServiceMap[dev.id]
                    : dev.nextServiceDate;

                return (
                  <div
                    key={dev.id}
                    className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {dev.clinicLocation.trim() || 'Lokalizacja kliniki do uzupełnienia'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{dev.roomName}</span>
                          {dev.modelOrSerial && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono">{dev.modelOrSerial}</span>
                            </>
                          )}
                        </div>
                        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span>{dev.name}</span>
                          {isNearLimit && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                              <AlertTriangle className="w-3.5 h-3.5" />
                              Wysokie zużycie eksploatacyjne
                            </span>
                          )}
                        </h3>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <select
                          value={dev.status}
                          onChange={(e) =>
                            onUpdateDevice(dev.id, {
                              status: e.target.value as ClinicDeviceRecord['status'],
                            })
                          }
                          aria-label="Status techniczny urządzenia"
                          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-900 dark:text-slate-100"
                        >
                          <option value="operational">Sprawne / Gotowe</option>
                          <option value="in_use">W trakcie zabiegu</option>
                          <option value="maintenance">Przegląd serwisowy</option>
                        </select>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateDevice(dev.id, {
                              usedHours: 0,
                              usedPulses: 0,
                              status: 'operational',
                              lastServiceDate: formatLocalDateOnly(new Date()),
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
                        >
                          <Wrench className="w-3.5 h-3.5 text-emerald-600" />
                          Potwierdź przegląd (zeruj licznik)
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteDevice(dev.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                          title="Usuń urządzenie"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Two Progress Meters: Operating Hours & Handpiece Pulses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                          <span className="font-sans font-medium text-slate-700 dark:text-slate-300">
                            Resurs godzinowy pracy:
                          </span>
                          <span className="text-slate-900 dark:text-slate-100 font-semibold">
                            {dev.usedHours} / {dev.maxServiceHours} godz. ({hourPct}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              hourPct >= 85
                                ? 'bg-red-600'
                                : hourPct >= 70
                                ? 'bg-amber-500'
                                : 'bg-emerald-600'
                            }`}
                            style={{ width: `${hourPct}%` }}
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-mono tabular-nums">
                          <span className="font-sans font-medium text-slate-700 dark:text-slate-300">
                            Zużycie impulsów głowicy / przetwornika:
                          </span>
                          <span className="text-slate-900 dark:text-slate-100 font-semibold">
                            {dev.usedPulses.toLocaleString('pl-PL')} /{' '}
                            {dev.maxPulses.toLocaleString('pl-PL')} imp. ({pulsePct}%)
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full transition-all ${
                              pulsePct >= 85
                                ? 'bg-red-600'
                                : pulsePct >= 70
                                ? 'bg-amber-500'
                                : 'bg-blue-600 dark:bg-sky-400'
                            }`}
                            style={{ width: `${pulsePct}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Manual Wear Entry + Inspection Notes */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 pt-2 items-end">
                      <div className="xl:col-span-5 space-y-1.5">
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300">
                          Dolicz bieżące zużycie (+ godziny / + impulsy):
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            step="0.5"
                            min={0}
                            placeholder="+ godz."
                            value={delta.hours}
                            onChange={(e) =>
                              setWearDeltaInputs((prev) => ({
                                ...prev,
                                [dev.id]: { ...delta, hours: e.target.value },
                              }))
                            }
                            className="w-24 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100"
                          />
                          <input
                            type="number"
                            min={0}
                            placeholder="+ impulsy"
                            value={delta.pulses}
                            onChange={(e) =>
                              setWearDeltaInputs((prev) => ({
                                ...prev,
                                [dev.id]: { ...delta, pulses: e.target.value },
                              }))
                            }
                            className="w-28 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2.5 py-1.5 text-xs font-mono text-slate-900 dark:text-slate-100"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddManualWearDelta(dev)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 text-xs font-semibold text-white whitespace-nowrap shrink-0"
                          >
                            Dolicz zużycie
                          </button>
                        </div>
                      </div>

                      <div className="xl:col-span-7 space-y-1.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-medium text-slate-700 dark:text-slate-300">
                            Notatki serwisowe i stan części eksploatacyjnych:
                          </span>
                          <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                            Ostatni przegląd: {dev.lastServiceDate || 'brak'} · Następny:
                            <input
                              type="date"
                              value={currentNextService}
                              onChange={(e) =>
                                setEditingNextServiceMap((prev) => ({
                                  ...prev,
                                  [dev.id]: e.target.value,
                                }))
                              }
                              className="ml-1.5 rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-1.5 py-0.5 text-[11px] font-mono text-slate-900 dark:text-slate-100"
                            />
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={1000}
                            value={currentNotes}
                            onChange={(e) =>
                              setEditingWearNotesMap((prev) => ({
                                ...prev,
                                [dev.id]: e.target.value,
                              }))
                            }
                            placeholder="Stan optyki, filtrów, kartridży, płynów chłodzących..."
                            className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              await onUpdateDevice(dev.id, {
                                wearNotes: currentNotes.trim().slice(0, 1000),
                                nextServiceDate: currentNextService,
                              });
                              setFeedbackBanner(
                                `Zapisano parametry serwisowe dla urządzenia „${dev.name}”.`
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap shrink-0"
                          >
                            Zapisz opis
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------- */}
        {/* SUBPAGE 2: PLAN ZABIEGÓW                                            */}
        {/* ------------------------------------------------------------------- */}
        {activeSubpage === 'treatments' && (
          <div className="space-y-6">
            {/* Create Treatment Plan Entry Form */}
            <form
              onSubmit={handleCreateTreatmentSubmit}
              className="p-5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4"
            >
              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Dodaj Pozycję do Planu Zabiegów i Grafiku Urządzenia
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Urządzenie zabiegowe *
                  </label>
                  <select
                    value={trtDeviceId}
                    onChange={(e) => {
                      const nextId = e.target.value;
                      setTrtDeviceId(nextId);
                      const found = devices.find((d) => d.id === nextId);
                      if (found) {
                        setTrtClinicLocation(found.clinicLocation);
                      }
                    }}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  >
                    {devices.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.clinicLocation.trim() || 'lokalizacja do uzupełnienia'})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Lokalizacja kliniki (pole do uzupełnienia)
                  </label>
                  <input
                    type="text"
                    list="clinic-locations-datalist"
                    maxLength={160}
                    value={trtClinicLocation}
                    onChange={(e) => setTrtClinicLocation(e.target.value)}
                    placeholder="Wpisz lub uzupełnij lokalizację kliniki..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Rodzaj zabiegu / procedury *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={160}
                    value={trtProcedureName}
                    onChange={(e) => setTrtProcedureName(e.target.value)}
                    placeholder="Np. Resurfacing laserowy / Lifting HIFU"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Data zabiegu *
                  </label>
                  <input
                    type="date"
                    required
                    value={trtDate}
                    onChange={(e) => setTrtDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Godzina od – do *
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <input
                      type="time"
                      required
                      value={trtStartTime}
                      onChange={(e) => setTrtStartTime(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                    />
                    <input
                      type="time"
                      required
                      value={trtEndTime}
                      onChange={(e) => setTrtEndTime(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-2 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Specjalista / Operator
                  </label>
                  <input
                    type="text"
                    maxLength={120}
                    value={trtOperatorName}
                    onChange={(e) => setTrtOperatorName(e.target.value)}
                    placeholder="Np. dr Anna Kowalska"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Kod karty zabiegowej
                  </label>
                  <input
                    type="text"
                    maxLength={80}
                    value={trtPatientRef}
                    onChange={(e) => setTrtPatientRef(e.target.value)}
                    placeholder="Np. Karta #WAW-512"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Szacowane impulsy
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={1000000}
                    value={trtPlannedPulses}
                    onChange={(e) => setTrtPlannedPulses(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <input
                  type="text"
                  maxLength={1000}
                  value={trtNotes}
                  onChange={(e) => setTrtNotes(e.target.value)}
                  placeholder="Parametry zabiegowe, głowica, protokół przygotowania..."
                  className="flex-1 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400 text-xs font-semibold text-white transition-colors whitespace-nowrap shrink-0"
                >
                  + Dodaj do Planu Zabiegów
                </button>
              </div>
            </form>

            {/* Treatment Plan Status Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                {[
                  { id: 'all', label: 'Wszystkie zabiegi' },
                  { id: 'planned', label: 'Zaplanowane' },
                  { id: 'confirmed', label: 'Potwierdzone' },
                  { id: 'completed', label: 'Zakończone' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setTrtStatusFilter(tab.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                      trtStatusFilter === tab.id
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400">
                Pozycji w planie: {filteredTreatments.length}
              </span>
            </div>

            {/* Treatment Plan List */}
            {filteredTreatments.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                Brak zaplanowanych zabiegów dla wybranych filtrów lokalizacji i statusu.
              </div>
            ) : (
              <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
                {filteredTreatments.map((trt) => {
                  const stMeta =
                    TREATMENT_STATUS_META[trt.status] || TREATMENT_STATUS_META.planned;
                  const isEditingTrtLoc = editingTreatmentLocationId === trt.id;

                  return (
                    <div
                      key={trt.id}
                      className="py-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                    >
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                          <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-slate-100">
                            {trt.scheduledDate} · {trt.startTime}–{trt.endTime}
                          </span>
                          <span aria-hidden="true" className="text-slate-400">·</span>
                          <span className={stMeta.textClass}>{stMeta.label}</span>
                          <span aria-hidden="true" className="text-slate-400">·</span>
                          <span className="font-mono tabular-nums text-slate-500 dark:text-slate-400">
                            {trt.durationMinutes} min · {trt.plannedPulses} imp.
                          </span>
                          <span aria-hidden="true" className="text-slate-400">·</span>
                          <span className="font-mono text-slate-600 dark:text-slate-300">
                            {trt.patientRef}
                          </span>
                        </div>

                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {trt.procedureName}
                        </h4>

                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
                          <span>Urządzenie: {trt.deviceName}</span>
                          <span aria-hidden="true">·</span>
                          <span>Operator: {trt.operatorName}</span>
                          <span aria-hidden="true">·</span>
                          {isEditingTrtLoc ? (
                            <span className="inline-flex items-center gap-1.5">
                              <input
                                type="text"
                                list="clinic-locations-datalist"
                                maxLength={160}
                                value={editingTreatmentLocationText}
                                onChange={(e) => setEditingTreatmentLocationText(e.target.value)}
                                placeholder="Wpisz lokalizację kliniki..."
                                className="rounded border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 px-2 py-0.5 text-xs text-slate-900 dark:text-slate-100"
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  await onUpdateTreatment(trt.id, {
                                    clinicLocation: editingTreatmentLocationText
                                      .trim()
                                      .slice(0, 160),
                                  });
                                  setEditingTreatmentLocationId(null);
                                }}
                                className="text-emerald-600 dark:text-emerald-400 font-semibold"
                              >
                                Zapisz
                              </button>
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingTreatmentLocationId(trt.id);
                                setEditingTreatmentLocationText(trt.clinicLocation);
                              }}
                              className={`inline-flex items-center gap-1 hover:underline ${
                                trt.clinicLocation.trim()
                                  ? 'text-slate-700 dark:text-slate-300 font-medium'
                                  : 'text-amber-600 dark:text-amber-400 font-semibold'
                              }`}
                            >
                              <MapPin className="w-3 h-3" />
                              {trt.clinicLocation.trim() ||
                                'Lokalizacja kliniki: kliknij, aby uzupełnić'}
                            </button>
                          )}
                        </div>

                        {trt.notes && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">{trt.notes}</p>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <select
                          value={trt.status}
                          onChange={(e) =>
                            onUpdateTreatment(trt.id, {
                              status: e.target.value as ClinicTreatmentRecord['status'],
                            })
                          }
                          aria-label="Status zabiegu"
                          className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-2.5 py-1.5 text-xs text-slate-900 dark:text-slate-100"
                        >
                          <option value="planned">Zaplanowany</option>
                          <option value="confirmed">Potwierdzony</option>
                          <option value="completed">Zakończony</option>
                          <option value="cancelled">Odwołany</option>
                        </select>

                        {trt.usageLogged ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 whitespace-nowrap shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Zużycie zaksięgowane
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={async () => {
                              await onLogTreatmentWearToDevice(trt);
                              setFeedbackBanner(
                                `Doliczono zabieg „${trt.procedureName}” (+${trt.plannedPulses} imp.) do karty zużycia urządzenia.`
                              );
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 transition-colors whitespace-nowrap shrink-0"
                          >
                            <Activity className="w-3.5 h-3.5 text-emerald-600" />
                            Zlicz do zużycia sprzętu
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={async () => {
                            await onPromoteTreatmentToTask(trt);
                            setFeedbackBanner(
                              `Dodano zabieg „${trt.procedureName}” jako zadanie z przypomnieniem w tablicy i kalendarzu.`
                            );
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors whitespace-nowrap shrink-0"
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
                          Do zadań
                        </button>

                        <button
                          type="button"
                          onClick={() => onDeleteTreatment(trt.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                          title="Usuń zabieg z planu"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
