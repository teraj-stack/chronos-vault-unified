import { formatLocalDateOnly } from './calendarSync';

export interface ClinicDeviceRecord {
  id: string;
  name: string;
  modelOrSerial: string;
  clinicLocation: string; // User-fillable clinic location field ("" when awaiting completion)
  roomName: string;
  status: 'operational' | 'in_use' | 'maintenance';
  usedHours: number;
  maxServiceHours: number;
  usedPulses: number;
  maxPulses: number;
  lastServiceDate: string;
  nextServiceDate: string;
  wearNotes: string;
  ownerId: string;
  collaboratorEmails: string[];
}

export interface ClinicTreatmentRecord {
  id: string;
  deviceId: string;
  deviceName: string;
  clinicLocation: string; // User-fillable clinic location field
  procedureName: string;
  patientRef: string;
  operatorName: string;
  scheduledDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  plannedPulses: number;
  durationMinutes: number;
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled';
  usageLogged: boolean;
  notes: string;
  ownerId: string;
  collaboratorEmails: string[];
}

export function getMondayOfWeek(anchorDateStr: string): Date {
  const parsed = anchorDateStr ? new Date(`${anchorDateStr.slice(0, 10)}T12:00:00`) : new Date();
  const safe = isNaN(parsed.getTime()) ? new Date() : parsed;
  const dayOfWeek = (safe.getDay() + 6) % 7; // 0 = Monday, 6 = Sunday
  const monday = new Date(safe);
  monday.setDate(safe.getDate() - dayOfWeek);
  monday.setHours(0, 0, 0, 0);
  return monday;
}

export function buildWeekDays(anchorDateStr: string): Array<{
  dateStr: string;
  shortDay: string;
  dayNumber: number;
  monthShort: string;
}> {
  const shortLabels = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'];
  const monday = getMondayOfWeek(anchorDateStr);

  return shortLabels.map((shortDay, idx) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + idx);
    return {
      dateStr: formatLocalDateOnly(d),
      shortDay,
      dayNumber: d.getDate(),
      monthShort: d.toLocaleDateString('pl-PL', { month: 'short' }),
    };
  });
}

export function computeMinutesBetween(startTime: string, endTime: string): number {
  const [sh, sm] = startTime.split(':').map(Number);
  const [eh, em] = endTime.split(':').map(Number);
  if ([sh, sm, eh, em].some((n) => Number.isNaN(n))) return 60;
  const diff = eh * 60 + em - (sh * 60 + sm);
  return diff > 0 ? Math.min(diff, 1440) : 60;
}

export function createInitialDemoDevices(): ClinicDeviceRecord[] {
  const today = new Date();
  const lastMonth = formatLocalDateOnly(new Date(today.getTime() - 86400000 * 28));
  const nextTwoMonths = formatLocalDateOnly(new Date(today.getTime() + 86400000 * 45));
  const nextTwoWeeks = formatLocalDateOnly(new Date(today.getTime() + 86400000 * 14));

  return [
    {
      id: 'dev_demo_1',
      name: 'Platforma Laserowa Er:YAG / Nd:YAG',
      modelOrSerial: 'ML-PRO-2940-01',
      clinicLocation: 'Klinika Warszawa — Śródmieście',
      roomName: 'Gabinet Laseroterapii 1',
      status: 'operational',
      usedHours: 318.5,
      maxServiceHours: 500,
      usedPulses: 164200,
      maxPulses: 250000,
      lastServiceDate: lastMonth,
      nextServiceDate: nextTwoMonths,
      wearNotes: 'Optyka głowicy frakcyjnej czysta, układ chłodzenia w normie. Kontrola lampy za ~180 godz.',
      ownerId: 'local_owner',
      collaboratorEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    },
    {
      id: 'dev_demo_2',
      name: 'System Ultradźwiękowy HIFU 3D',
      modelOrSerial: 'UF-HIFU-702',
      clinicLocation: 'Klinika Kraków — Podgórze',
      roomName: 'Gabinet Hi-Tech B',
      status: 'in_use',
      usedHours: 412,
      maxServiceHours: 500,
      usedPulses: 18900,
      maxPulses: 20000,
      lastServiceDate: lastMonth,
      nextServiceDate: nextTwoWeeks,
      wearNotes: 'Przetwornik 4.5 mm osiągnął 94.5% resursu linii — zamówić wymienny kartridż przed kolejnym tygodniem.',
      ownerId: 'local_owner',
      collaboratorEmails: ['anna.kowalska@zespol.pl'],
    },
    {
      id: 'dev_demo_3',
      name: 'Radiofrekwencja Mikroigłowa RF Vacuum',
      modelOrSerial: 'RF-MED-440',
      clinicLocation: '', // Intentionally empty so the user sees a "pole do uzupełnienia" slot ready to fill in
      roomName: 'Gabinet Zabiegowy 3',
      status: 'operational',
      usedHours: 96,
      maxServiceHours: 400,
      usedPulses: 41000,
      maxPulses: 200000,
      lastServiceDate: formatLocalDateOnly(new Date(today.getTime() - 86400000 * 10)),
      nextServiceDate: formatLocalDateOnly(new Date(today.getTime() + 86400000 * 80)),
      wearNotes: 'Nowe urządzenie mobilne oczekujące na przypisanie docelowej lokalizacji kliniki.',
      ownerId: 'local_owner',
      collaboratorEmails: ['piotr.nowak@zespol.pl'],
    },
  ];
}

export function createInitialDemoTreatments(): ClinicTreatmentRecord[] {
  const today = new Date();
  const todayStr = formatLocalDateOnly(today);
  const tomorrowStr = formatLocalDateOnly(new Date(today.getTime() + 86400000));
  const plusTwoStr = formatLocalDateOnly(new Date(today.getTime() + 86400000 * 2));

  return [
    {
      id: 'trt_demo_1',
      deviceId: 'dev_demo_1',
      deviceName: 'Platforma Laserowa Er:YAG / Nd:YAG',
      clinicLocation: 'Klinika Warszawa — Śródmieście',
      procedureName: 'Resurfacing frakcyjny + przebudowa kolagenu',
      patientRef: 'Karta #WAW-408',
      operatorName: 'dr Anna Kowalska',
      scheduledDate: todayStr,
      startTime: '10:00',
      endTime: '11:00',
      plannedPulses: 1850,
      durationMinutes: 60,
      status: 'confirmed',
      usageLogged: false,
      notes: 'Głowica frakcyjna 2940 nm, 2 przejścia, chłodzenie powietrzne poziom 4.',
      ownerId: 'local_owner',
      collaboratorEmails: ['anna.kowalska@zespol.pl', 'piotr.nowak@zespol.pl'],
    },
    {
      id: 'trt_demo_2',
      deviceId: 'dev_demo_2',
      deviceName: 'System Ultradźwiękowy HIFU 3D',
      clinicLocation: 'Klinika Kraków — Podgórze',
      procedureName: 'Lifting bezinwazyjny owalu twarzy HIFU',
      patientRef: 'Karta #KRK-119',
      operatorName: 'mgr Piotr Nowak',
      scheduledDate: tomorrowStr,
      startTime: '12:00',
      endTime: '13:30',
      plannedPulses: 420,
      durationMinutes: 90,
      status: 'planned',
      usageLogged: false,
      notes: 'Kartridże 3.0 mm oraz 4.5 mm — zweryfikować stan licznika przed zabiegiem.',
      ownerId: 'local_owner',
      collaboratorEmails: ['anna.kowalska@zespol.pl'],
    },
    {
      id: 'trt_demo_3',
      deviceId: 'dev_demo_3',
      deviceName: 'Radiofrekwencja Mikroigłowa RF Vacuum',
      clinicLocation: '',
      procedureName: 'Termolifting mikroigłowy blizn potrądzikowych',
      patientRef: 'Karta #MOB-052',
      operatorName: 'dr Marta Wiśniewska',
      scheduledDate: plusTwoStr,
      startTime: '14:00',
      endTime: '15:00',
      plannedPulses: 900,
      durationMinutes: 60,
      status: 'planned',
      usageLogged: false,
      notes: 'Uzupełnić docelową lokalizację kliniki wyjazdowej po potwierdzeniu grafiku.',
      ownerId: 'local_owner',
      collaboratorEmails: ['piotr.nowak@zespol.pl'],
    },
  ];
}
