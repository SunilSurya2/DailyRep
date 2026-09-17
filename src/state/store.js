// Central State Store for DailyRep with localStorage persistence
// Production-grade reactive store with complete CRUD and telemetry management

const STORAGE_KEY = 'dailyrep_app_state_v2';

export const WORKOUT_ROTATION = [
  {
    name: 'HIIT Cardio Burst',
    desc: 'High-intensity aerobic intervals designed for peak metabolic rate.',
    duration: 25,
    calories: 320,
    category: 'Cardio',
    exercise: 'Alternating High Knees'
  },
  {
    name: 'Nordic Endurance Run',
    desc: 'Aerobic threshold pacing through varied gradients and cadences.',
    duration: 45,
    calories: 480,
    category: 'Endurance',
    exercise: 'Cadence Strides'
  },
  {
    name: 'Upper Body Hypertrophy',
    desc: 'Targeted shoulder, chest, and lat loading with strict tempo control.',
    duration: 40,
    calories: 390,
    category: 'Strength',
    exercise: 'Incline Dumbbell Press'
  },
  {
    name: 'Zone 2 Recovery Ride',
    desc: 'Low-lactate sustained aerobic flush to accelerate muscle replenishment.',
    duration: 35,
    calories: 280,
    category: 'Recovery',
    exercise: 'Low Cadence Spin'
  },
  {
    name: 'Core & Mobility Flow',
    desc: 'Dynamic hip openers, spinal decompressions, and deep core bracing.',
    duration: 20,
    calories: 180,
    category: 'Mobility',
    exercise: 'Bird-Dog to Plank'
  },
  {
    name: 'Threshold Power Intervals',
    desc: 'VO2-max bursts alternated with active recovery for lactate clearing.',
    duration: 30,
    calories: 375,
    category: 'HIIT',
    exercise: 'Kettlebell Swings'
  },
  {
    name: 'Restorative Breath & Stretch',
    desc: 'Parasympathetic down-regulation and fascia release session.',
    duration: 15,
    calories: 120,
    category: 'Recovery',
    exercise: 'Box Breathing Cadence'
  }
];

export function generateDayData(dateKey, baseHabits = []) {
  const [y, m, d] = dateKey.split('-').map(Number);
  const target = new Date(y, m - 1, d);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const habitsCopy = (baseHabits && baseHabits.length ? baseHabits : [
    { id: 'h1', name: 'Morning Meditation', desc: '15 mins mindful breath', streak: 14, completed: true, category: 'morning', time: '07:00 AM', color: '#3B82F6', icon: 'self_improvement' },
    { id: 'h2', name: 'Hydrate 500ml Electrolytes', desc: 'Electrolytes with breakfast', streak: 8, completed: true, category: 'morning', time: '08:30 AM', color: '#00E599', icon: 'water_drop' },
    { id: 'h3', name: 'Upper Body Strength Session', desc: 'Planned hypertrophy training', streak: 21, completed: false, category: 'afternoon', time: '05:30 PM', color: '#FF5A36', icon: 'fitness_center' },
    { id: 'h4', name: '10,000 Daily Steps Goal', desc: 'Brisk evening walk', streak: 12, completed: false, category: 'all', time: 'All Day', color: '#3B82F6', icon: 'directions_walk' },
    { id: 'h5', name: 'Evening Mobility & Foam Roll', desc: '12 mins lower back and hips', streak: 5, completed: false, category: 'evening', time: '09:00 PM', color: '#8B5CF6', icon: 'accessibility_new' }
  ]).map(h => ({ ...h }));

  if (diffDays === 0) {
    // Today
    if (habitsCopy.length >= 5) {
      habitsCopy[0].completed = true;
      habitsCopy[1].completed = true;
      habitsCopy[2].completed = false;
      habitsCopy[3].completed = false;
      habitsCopy[4].completed = false;
    }
    return {
      stats: {
        burn: 680,
        burnTarget: 850,
        move: 42,
        moveTarget: 60,
        water: 2.1,
        waterTarget: 2.8,
        steps: 8420,
        stepsTarget: 10000,
        sleep: '7h 45m',
        sleepScore: '92% quality',
        restingHr: 62,
        hrChange: '-3 bpm'
      },
      readiness: 94,
      readinessHeadline: 'Good day, Sarah',
      readinessSubtitle: "Your vitals are peaked for endurance today. Let's conquer the streak.",
      habits: habitsCopy,
      featuredWorkout: {
        name: 'HIIT Cardio Burst',
        desc: 'High-intensity aerobic intervals designed for peak metabolic rate.',
        duration: 25,
        calories: 320,
        category: 'Cardio',
        exercise: 'Alternating High Knees',
        statusTag: 'Scheduled',
        timeLabel: 'Starts in 25 min',
        isCompleted: false
      }
    };
  }

  if (diffDays === -1) {
    // Yesterday: Outstanding 5/5
    habitsCopy.forEach(h => { h.completed = true; });
    return {
      stats: {
        burn: 890,
        burnTarget: 850,
        move: 65,
        moveTarget: 60,
        water: 2.8,
        waterTarget: 2.8,
        steps: 11420,
        stepsTarget: 10000,
        sleep: '8h 12m',
        sleepScore: '96% quality',
        restingHr: 59,
        hrChange: '-4 bpm'
      },
      readiness: 96,
      readinessHeadline: 'Record Day Recorded',
      readinessSubtitle: 'All targets conquered yesterday with 105% convergence score.',
      habits: habitsCopy,
      featuredWorkout: {
        name: 'Nordic Endurance Run',
        desc: 'Aerobic threshold pacing through varied gradients and cadences.',
        duration: 45,
        calories: 480,
        category: 'Endurance',
        exercise: 'Cadence Strides',
        statusTag: 'Completed',
        timeLabel: 'Finished at 08:15 AM',
        isCompleted: true
      }
    };
  }

  if (diffDays === -2) {
    // 2 days ago: 4/5
    if (habitsCopy.length >= 5) {
      habitsCopy[0].completed = true;
      habitsCopy[1].completed = true;
      habitsCopy[2].completed = true;
      habitsCopy[3].completed = true;
      habitsCopy[4].completed = false;
    }
    return {
      stats: {
        burn: 760,
        burnTarget: 850,
        move: 48,
        moveTarget: 60,
        water: 2.4,
        waterTarget: 2.8,
        steps: 9280,
        stepsTarget: 10000,
        sleep: '7h 18m',
        sleepScore: '87% quality',
        restingHr: 63,
        hrChange: '+1 bpm'
      },
      readiness: 89,
      readinessHeadline: 'High Strength Day',
      readinessSubtitle: 'Hypertrophy target reached with 89% convergence.',
      habits: habitsCopy,
      featuredWorkout: {
        name: 'Upper Body Hypertrophy',
        desc: 'Targeted shoulder, chest, and lat loading with strict tempo control.',
        duration: 40,
        calories: 390,
        category: 'Strength',
        exercise: 'Incline Dumbbell Press',
        statusTag: 'Completed',
        timeLabel: 'Finished at 01:20 PM',
        isCompleted: true
      }
    };
  }

  if (diffDays === -3) {
    // 3 days ago: 5/5
    habitsCopy.forEach(h => { h.completed = true; });
    return {
      stats: {
        burn: 940,
        burnTarget: 850,
        move: 72,
        moveTarget: 60,
        water: 3.1,
        waterTarget: 2.8,
        steps: 13150,
        stepsTarget: 10000,
        sleep: '8h 25m',
        sleepScore: '98% quality',
        restingHr: 58,
        hrChange: '-5 bpm'
      },
      readiness: 98,
      readinessHeadline: 'Peak Aerobic Index',
      readinessSubtitle: 'Max milestone achieved across cardiovascular volume.',
      habits: habitsCopy,
      featuredWorkout: {
        name: 'Threshold Power Intervals',
        desc: 'VO2-max bursts alternated with active recovery for lactate clearing.',
        duration: 35,
        calories: 420,
        category: 'HIIT',
        exercise: 'Kettlebell Swings',
        statusTag: 'Completed',
        timeLabel: 'Finished at 07:45 AM',
        isCompleted: true
      }
    };
  }

  if (diffDays < 0) {
    const absDiff = Math.abs(diffDays);
    const completedCount = 3 + (absDiff % 3);
    habitsCopy.forEach((h, idx) => {
      h.completed = idx < completedCount;
    });

    const workout = WORKOUT_ROTATION[absDiff % WORKOUT_ROTATION.length];
    const burn = 640 + ((absDiff * 67) % 280);
    const move = 36 + ((absDiff * 13) % 35);
    const water = +(1.9 + ((absDiff * 4) % 11) * 0.1).toFixed(1);
    const steps = 7200 + ((absDiff * 843) % 6200);
    const restingHr = 59 + (absDiff % 6);
    const readiness = 86 + ((absDiff * 5) % 12);

    return {
      stats: {
        burn,
        burnTarget: 850,
        move,
        moveTarget: 60,
        water,
        waterTarget: 2.8,
        steps,
        stepsTarget: 10000,
        sleep: `${7 + (absDiff % 2)}h ${15 + (absDiff * 7) % 40}m`,
        sleepScore: `${85 + (absDiff * 3) % 12}% quality`,
        restingHr,
        hrChange: absDiff % 2 === 0 ? `-${(absDiff % 3) + 1} bpm` : `+${absDiff % 3} bpm`
      },
      readiness,
      readinessHeadline: 'Historical Log',
      readinessSubtitle: `Logged historical telemetry archive for ${dateKey}.`,
      habits: habitsCopy,
      featuredWorkout: {
        ...workout,
        statusTag: 'Completed',
        timeLabel: 'Finished Session',
        isCompleted: true
      }
    };
  }

  // Future days
  const absFuture = diffDays;
  const workout = WORKOUT_ROTATION[(absFuture + 2) % WORKOUT_ROTATION.length];
  habitsCopy.forEach(h => { h.completed = false; });

  return {
    stats: {
      burn: 0,
      burnTarget: 850,
      move: 0,
      moveTarget: 60,
      water: 0.0,
      waterTarget: 2.8,
      steps: 0,
      stepsTarget: 10000,
      sleep: 'Scheduled 8h',
      sleepScore: 'Predicted 92%',
      restingHr: 61,
      hrChange: 'Baseline'
    },
    readiness: 92,
    readinessHeadline: 'Upcoming Schedule',
    readinessSubtitle: `Planning ahead for ${dateKey}. Readiness projected at 92%.`,
    habits: habitsCopy,
    featuredWorkout: {
      ...workout,
      statusTag: 'Planned',
      timeLabel: absFuture === 1 ? 'Tomorrow at 07:30 AM' : `Day +${absFuture} Routine`,
      isCompleted: false
    }
  };
}

const defaultState = {
  currentTab: 'home',
  selectedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  isWorkoutActive: false,
  isNotificationsOpen: false,
  isEditProfileOpen: false,
  isCustomizeGoalsOpen: false,
  isAddHabitOpen: false,
  isSprintWeekOpen: false,
  lastCompletedHabitId: null,
  lastCompletedAt: null,
  dailyRecords: {},
  featuredWorkout: {
    name: 'HIIT Cardio Burst',
    desc: 'High-intensity aerobic intervals designed for peak metabolic rate.',
    duration: 25,
    calories: 320,
    category: 'Cardio',
    exercise: 'Alternating High Knees',
    statusTag: 'Scheduled',
    timeLabel: 'Starts in 25 min',
    isCompleted: false
  },
  
  // Athlete Profile
  user: {
    name: 'Sarah',
    fullName: 'Sarah Jenkins',
    tier: 'Tier 4 Endurance Athlete',
    level: 28,
    bio: 'Endurance runner & mindful movement enthusiast. Chasing the 50-day streak milestone.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    memberSince: 'Jan 2024',
    readiness: 94,
    readinessHeadline: 'Good day, Sarah',
    readinessSubtitle: "Your vitals are peaked for endurance today. Let's conquer the streak."
  },

  // Daily Telemetry & Targets
  stats: {
    burn: 680,
    burnTarget: 850,
    move: 42,
    moveTarget: 60,
    water: 2.1,
    waterTarget: 2.8,
    steps: 8420,
    stepsTarget: 10000,
    sleep: '9h 15m',
    sleepStartTime: '23:00',
    sleepWakeTime: '08:15',
    sleepScore: '92% quality',
    bedtimeAlarmEnabled: true,
    wakeAlarmEnabled: true,
    bedtimeAlarmSound: 'Gentle Chime',
    wakeAlarmSound: 'Sunrise Bells',
    restingHr: 62,
    hrChange: '-3 bpm'
  },

  // Daily Habits
  habits: [
    {
      id: 'h1',
      name: 'Morning Meditation',
      desc: '15 mins mindful breath',
      streak: 14,
      completed: true,
      category: 'morning',
      time: '07:00 AM',
      color: '#3B82F6',
      icon: 'self_improvement'
    },
    {
      id: 'h2',
      name: 'Hydrate 500ml Electrolytes',
      desc: 'Electrolytes with breakfast',
      streak: 8,
      completed: true,
      category: 'morning',
      time: '08:30 AM',
      color: '#00E599',
      icon: 'water_drop'
    },
    {
      id: 'h3',
      name: 'Upper Body Strength Session',
      desc: 'Planned hypertrophy training',
      streak: 21,
      completed: false,
      category: 'afternoon',
      time: '05:30 PM',
      color: '#FF5A36',
      icon: 'fitness_center'
    },
    {
      id: 'h4',
      name: '10,000 Daily Steps Goal',
      desc: 'Brisk evening walk',
      streak: 12,
      completed: false,
      category: 'all',
      time: 'All Day',
      color: '#3B82F6',
      icon: 'directions_walk'
    },
    {
      id: 'h5',
      name: 'Evening Mobility & Foam Roll',
      desc: '12 mins lower back and hips',
      streak: 5,
      completed: false,
      category: 'evening',
      time: '09:00 PM',
      color: '#8B5CF6',
      icon: 'accessibility_new'
    }
  ],

  // Routine Exercises for Fitness Tab
  exercises: [
    { id: 'e1', name: 'Barbell Deadlift', details: '4 sets × 8 reps @ 85kg', done: true, cat: 'back', weight: 85, reps: 8, sets: 4, image: '/exercises/deadlift.jpg' },
    { id: 'e2', name: 'Incline Dumbbell Press', details: '3 sets × 12 reps @ 24kg', done: false, cat: 'chest', weight: 24, reps: 12, sets: 3, image: '/exercises/bench.jpg' },
    { id: 'e3', name: 'Barbell Back Squat', details: '4 sets × 10 reps @ 80kg', done: false, cat: 'leg', weight: 80, reps: 10, sets: 4, image: '/exercises/squat.jpg' },
    { id: 'e4', name: 'Overhead Military Press', details: '3 sets × 10 reps @ 45kg', done: false, cat: 'shoulder', weight: 45, reps: 10, sets: 3, image: '/exercises/shoulder.jpg' },
    { id: 'e5', name: 'Standing Barbell Curl', details: '3 sets × 12 reps @ 28kg', done: false, cat: 'biceps', weight: 28, reps: 12, sets: 3, image: '/exercises/bicep_curl.jpg' },
    { id: 'e6', name: 'Tricep Rope Pushdown', details: '3 sets × 15 reps @ 25kg', done: false, cat: 'triceps', weight: 25, reps: 15, sets: 3, image: '/exercises/battleropes.jpg' }
  ],

  // Notifications Queue
  notifications: [
    {
      id: 'n1',
      title: 'Workout Scheduled Soon',
      body: 'HIIT Cardio Burst starts in 25 mins. Prepare electrolytes.',
      time: '12m ago',
      icon: 'fitness_center',
      read: false
    },
    {
      id: 'n2',
      title: 'Streak Milestone!',
      body: 'You just hit a 14-day streak on Morning Meditation!',
      time: '2h ago',
      icon: 'local_fire_department',
      read: false
    },
    {
      id: 'n3',
      title: 'Hydration Reminder',
      body: 'Time for 500ml water to stay at peak recovery index.',
      time: '4h ago',
      icon: 'water_drop',
      read: true
    }
  ],

  // Connected Health Ecosystem Devices
  connectedDevices: [
    { id: 'apple-health', name: 'Apple Health', type: 'app', status: 'Connected', lastSync: '12m ago', icon: 'favorite', battery: null, signal: 100 },
    { id: 'health-connect', name: 'Health Connect', type: 'app', status: 'Connected', lastSync: '1h ago', icon: 'sync', battery: null, signal: 100 },
    { id: 'oura', name: 'Oura Ring Gen 3', type: 'device', status: 'Connected', lastSync: '4m ago', icon: 'watch', battery: 84, signal: 92 },
    { id: 'withings', name: 'Withings Body Scan', type: 'device', status: 'Connected', lastSync: 'Today, 7:15 AM', icon: 'monitor_weight', battery: 92, signal: 85 }
  ],

  // Available Health Apps for OAuth / System Integration
  ecosystemApps: [
    {
      id: 'apple-health',
      name: 'Apple Health',
      brand: 'Apple HealthKit',
      icon: 'favorite',
      colorClass: 'text-rose-500 bg-rose-50 border-rose-200',
      connected: true,
      category: 'Health Ecosystem',
      description: 'Sync active calories, steps, resting HR, and sleep analysis from iOS HealthKit.',
      telemetryTypes: ['Steps', 'Active Burn', 'Sleep Stages', 'Resting HR'],
      permissions: { steps: true, burn: true, sleep: true, hr: true, workouts: true },
      lastSync: '12m ago'
    },
    {
      id: 'health-connect',
      name: 'Health Connect',
      brand: 'Google Health Connect',
      icon: 'sync',
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      connected: true,
      category: 'Health Ecosystem',
      description: 'Bi-directional sync for Android devices, Google Fit, and WearOS sensors.',
      telemetryTypes: ['Daily Steps', 'Active Time', 'Workouts', 'Hydration'],
      permissions: { steps: true, burn: true, sleep: false, hr: true, workouts: true },
      lastSync: '1h ago'
    },
    {
      id: 'strava',
      name: 'Strava',
      brand: 'Strava GPS',
      icon: 'directions_run',
      colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
      connected: false,
      category: 'GPS & Workouts',
      description: 'Import outdoor runs, cycling routes, elevation profiles, and segment PRs.',
      telemetryTypes: ['GPS Routes', 'Cadence', 'Elevation', 'Suffer Score'],
      permissions: { steps: false, burn: true, sleep: false, hr: true, workouts: true },
      lastSync: null
    },
    {
      id: 'garmin',
      name: 'Garmin Connect',
      brand: 'Garmin',
      icon: 'watch',
      colorClass: 'text-sky-600 bg-sky-50 border-sky-200',
      connected: false,
      category: 'Wearable Metrics',
      description: 'Sync Body Battery, HRV status, training readiness, and recovery hours.',
      telemetryTypes: ['Body Battery', 'HRV Status', 'Training Readiness', 'VO2 Max'],
      permissions: { steps: true, burn: true, sleep: true, hr: true, workouts: true },
      lastSync: null
    },
    {
      id: 'whoop',
      name: 'Whoop',
      brand: 'Whoop 4.0 API',
      icon: 'all_inclusive',
      colorClass: 'text-slate-800 bg-slate-100 border-slate-300',
      connected: false,
      category: 'Recovery & Strain',
      description: 'Sync 24/7 Day Strain, recovery score, respiratory rate, and sleep debt.',
      telemetryTypes: ['Day Strain', 'Recovery %', 'Sleep Performance', 'Skin Temp'],
      permissions: { steps: false, burn: true, sleep: true, hr: true, workouts: true },
      lastSync: null
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      brand: 'Fitbit by Google',
      icon: 'fitness_center',
      colorClass: 'text-teal-600 bg-teal-50 border-teal-200',
      connected: false,
      category: 'Activity & Sleep',
      description: 'Daily readiness score, cardio fitness index, and SpO2 oxygen trends.',
      telemetryTypes: ['Readiness Score', 'SpO2 Trends', 'Sleep Stages', 'Active Zone Min'],
      permissions: { steps: true, burn: true, sleep: true, hr: true, workouts: false },
      lastSync: null
    },
    {
      id: 'myfitnesspal',
      name: 'MyFitnessPal',
      brand: 'Under Armour',
      icon: 'restaurant',
      colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
      connected: false,
      category: 'Nutrition & Macros',
      description: 'Auto-sync calorie targets, protein breakdown, and micronutrient balance.',
      telemetryTypes: ['Net Calories', 'Protein / Carbs / Fat', 'Water Intake'],
      permissions: { steps: false, burn: false, sleep: false, hr: false, workouts: false },
      lastSync: null
    },
    {
      id: 'zwift',
      name: 'Zwift',
      brand: 'Zwift Cycling',
      icon: 'pedal_bike',
      colorClass: 'text-orange-600 bg-orange-50 border-orange-200',
      connected: false,
      category: 'Virtual Training',
      description: 'Stream indoor cycling FTP watts, cadence, and virtual power curves.',
      telemetryTypes: ['Power (Watts)', 'FTP Tracking', 'Virtual Distance', 'Cadence'],
      permissions: { steps: false, burn: true, sleep: false, hr: true, workouts: true },
      lastSync: null
    }
  ],

  // Available Discovered Hardware BLE Devices
  availableBleDevices: [
    { id: 'ble-polar-h10', name: 'Polar H10 Heart Rate Sensor', category: 'Chest Strap ECG', protocol: 'Bluetooth 5.0 BLE', icon: 'monitor_heart', signal: 96, battery: 94, rssi: -46 },
    { id: 'ble-garmin-hrm', name: 'Garmin HRM-Pro Plus', category: 'Running Dynamics & HR', protocol: 'Dual ANT+ / BLE', icon: 'ecg_heart', signal: 88, battery: 82, rssi: -52 },
    { id: 'ble-whoop-4', name: 'Whoop 4.0 Sensor Band', category: 'Biometric Wearable', protocol: 'Bluetooth LE', icon: 'all_inclusive', signal: 92, battery: 64, rssi: -48 },
    { id: 'ble-wahoo-tickr', name: 'Wahoo TICKR X v2', category: 'Cadence & Motion HR', protocol: 'Bluetooth Smart', icon: 'speed', signal: 84, battery: 90, rssi: -58 },
    { id: 'ble-forerunner-965', name: 'Garmin Forerunner 965', category: 'GPS Multisport Smartwatch', protocol: 'Bluetooth 5.3', icon: 'watch', signal: 85, battery: 78, rssi: -55 },
    { id: 'ble-withings-scale', name: 'Withings Body Comp Scale', category: 'Impedance Smart Scale', protocol: 'BLE & Wi-Fi', icon: 'monitor_weight', signal: 76, battery: 92, rssi: -66 },
    { id: 'ble-concept2-pm5', name: 'Concept2 PM5 Monitor', category: 'RowErg / SkiErg Telemetry', protocol: 'Bluetooth PM5', icon: 'rowing', signal: 72, battery: 100, rssi: -68 }
  ],

  // Device & App Pairing UI Modal State
  isPairDeviceModalOpen: false,
  activePairModalTab: 'apps', // 'apps' | 'bluetooth' | 'active'
  isScanningBluetooth: false,
  selectedAppForAuth: null,
  pairingInProgressId: null,

  // Vitals & Metrics Direct Editing Modal State
  isEditVitalsOpen: false,
  activeEditVitalsField: 'all', // 'steps' | 'sleep' | 'hr' | 'all'


  // Active Workout Session Telemetry
  activeWorkoutSession: {
    name: 'HIIT Cardio Burst',
    duration: 1500,
    elapsed: 412,
    isRunning: false,
    currentHr: 148,
    calories: 135,
    targetCalories: 320,
    currentExercise: 'Alternating High Knees',
    currentSet: 2,
    totalSets: 4,
    currentWeight: 0,
    currentReps: 20,
    restTimeRemaining: 0,
    isResting: false
  },

  // Box Breathing Coach State
  breathingCoach: {
    isActive: false,
    phase: 'Inhale', // 'Inhale' | 'Hold' | 'Exhale' | 'Hold'
    secondsLeft: 4,
    cyclesCompleted: 0
  },

  // System Settings
  settings: {
    pushReminders: true,
    themeMode: 'Light Minimal',
    soundEffects: true
  },

  // Toasts
  toasts: []
};

function loadState() {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('dailyrep_app_state_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultState,
          ...parsed,
          user: { ...defaultState.user, ...(parsed.user || {}) },
          stats: { ...defaultState.stats, ...(parsed.stats || {}) },
          settings: { ...defaultState.settings, ...(parsed.settings || {}) },
          activeWorkoutSession: { ...defaultState.activeWorkoutSession, ...(parsed.activeWorkoutSession || {}) },
          breathingCoach: { ...defaultState.breathingCoach },
          dailyRecords: parsed.dailyRecords || {},
          connectedDevices: (parsed.connectedDevices && parsed.connectedDevices.length > 0) ? parsed.connectedDevices : defaultState.connectedDevices,
          ecosystemApps: parsed.ecosystemApps || defaultState.ecosystemApps,
          availableBleDevices: defaultState.availableBleDevices,
          isPairDeviceModalOpen: false,
          activePairModalTab: 'apps',
          isScanningBluetooth: false,
          selectedAppForAuth: null,
          pairingInProgressId: null,
          isEditVitalsOpen: false,
          activeEditVitalsField: 'all'
        };
      }
    }
  } catch (e) {
    console.warn('Could not parse stored state, falling back to default:', e);
  }
  return JSON.parse(JSON.stringify(defaultState));
}

export const store = {
  state: loadState(),
  listeners: new Set(),

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  },

  notify() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch (e) {
      console.warn('Could not persist state:', e);
    }
    this.listeners.forEach(fn => fn(this.state));
  },

  // Per-Day Data Management & Sync
  getDailyRecord(dateKey) {
    if (!this.state.dailyRecords) {
      this.state.dailyRecords = {};
    }
    if (!this.state.dailyRecords[dateKey]) {
      this.state.dailyRecords[dateKey] = generateDayData(dateKey, defaultState.habits);
    }
    return this.state.dailyRecords[dateKey];
  },

  saveCurrentDateRecord() {
    if (!this.state.dailyRecords) this.state.dailyRecords = {};
    const key = this.state.selectedDate;
    this.state.dailyRecords[key] = {
      stats: JSON.parse(JSON.stringify(this.state.stats)),
      habits: JSON.parse(JSON.stringify(this.state.habits)),
      readiness: this.state.user.readiness,
      readinessHeadline: this.state.user.readinessHeadline,
      readinessSubtitle: this.state.user.readinessSubtitle,
      featuredWorkout: JSON.parse(JSON.stringify(this.state.featuredWorkout || defaultState.featuredWorkout))
    };
  },

  syncDateRecord(dateKey, shouldNotify = false) {
    const rec = this.getDailyRecord(dateKey);
    this.state.stats = JSON.parse(JSON.stringify(rec.stats));
    this.state.habits = JSON.parse(JSON.stringify(rec.habits));
    this.state.user.readiness = rec.readiness;
    this.state.user.readinessHeadline = rec.readinessHeadline;
    this.state.user.readinessSubtitle = rec.readinessSubtitle;
    this.state.featuredWorkout = JSON.parse(JSON.stringify(rec.featuredWorkout));
    if (shouldNotify) {
      this.notify();
    }
  },

  // Toast System (Disabled per user request)
  showToast(_message, _type = 'success') {
    this.state.toasts = [];
  },

  // Navigation Tabs
  setTab(tab) {
    this.state.currentTab = tab;
    this.notify();
  },

  // Date Navigation (Changes ALL daily data seamlessly)
  shiftDate(days) {
    this.saveCurrentDateRecord();
    const [y, m, d] = this.state.selectedDate.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    date.setDate(date.getDate() + days);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    this.state.selectedDate = `${yyyy}-${mm}-${dd}`;
    this.syncDateRecord(this.state.selectedDate, false);
    this.state.lastCompletedHabitId = null;
    this.notify();
  },

  setDate(targetDate) {
    this.saveCurrentDateRecord();
    this.state.selectedDate = targetDate;
    this.syncDateRecord(this.state.selectedDate, false);
    this.state.lastCompletedHabitId = null;
    this.notify();
  },

  // Habit Operations
  toggleHabit(id) {
    const habit = this.state.habits.find(h => h.id === id);
    if (habit) {
      habit.completed = !habit.completed;
      if (habit.completed) {
        habit.streak += 1;
        this.state.stats.burn = Math.min(this.state.stats.burnTarget, this.state.stats.burn + 45);
        this.state.lastCompletedHabitId = habit.id;
        this.state.lastCompletedAt = Date.now();
        this.showToast(`Completed: ${habit.name} 🔥 (Streak: ${habit.streak}d)`, 'success');
      } else {
        habit.streak = Math.max(0, habit.streak - 1);
        this.state.stats.burn = Math.max(0, this.state.stats.burn - 45);
        if (this.state.lastCompletedHabitId === habit.id) {
          this.state.lastCompletedHabitId = null;
        }
      }
      this.saveCurrentDateRecord();
      this.notify();
    }
  },

  addHabit(habitData) {
    const newHabit = {
      id: 'h_' + Date.now(),
      name: habitData.name || 'New Habit',
      desc: habitData.desc || 'Daily consistency goal',
      streak: 1,
      completed: false,
      category: habitData.category || 'morning',
      time: habitData.time || '08:00 AM',
      color: habitData.color || '#3B82F6',
      icon: habitData.icon || 'star'
    };
    this.state.habits.push(newHabit);
    this.state.isAddHabitOpen = false;
    this.saveCurrentDateRecord();
    this.showToast(`Added habit: "${newHabit.name}"`, 'success');
    this.notify();
  },

  deleteHabit(id) {
    const habit = this.state.habits.find(h => h.id === id);
    const name = habit ? habit.name : 'Habit';
    this.state.habits = this.state.habits.filter(h => h.id !== id);
    this.saveCurrentDateRecord();
    this.showToast(`Removed habit: "${name}"`, 'info');
    this.notify();
  },

  // Water Telemetry Logger
  logWater(deltaLiters) {
    const newAmount = Math.max(0, +(this.state.stats.water + deltaLiters).toFixed(2));
    this.state.stats.water = newAmount;
    if (deltaLiters > 0) {
      this.showToast(`Hydration logged: ${newAmount}L / ${this.state.stats.waterTarget}L`, 'success');
    }
    this.saveCurrentDateRecord();
    this.notify();
  },

  // Step Logger
  logSteps(deltaSteps) {
    this.state.stats.steps = Math.max(0, this.state.stats.steps + deltaSteps);
    this.state.stats.move = Math.min(this.state.stats.moveTarget, this.state.stats.move + Math.round(deltaSteps / 100));
    this.showToast(`+${deltaSteps} steps logged!`, 'success');
    this.saveCurrentDateRecord();
    this.notify();
  },

  // Exercise & Workout Routines
  toggleExercise(id) {
    const ex = this.state.exercises.find(e => e.id === id);
    if (ex) {
      ex.done = !ex.done;
      if (ex.done) {
        this.showToast(`Movement finished: ${ex.name}`, 'success');
      }
      this.notify();
    }
  },

  addExercise(exerciseData) {
    this.state.exercises.push({
      id: 'e_' + Date.now(),
      name: exerciseData.name || 'Custom Movement',
      details: `${exerciseData.sets || 3} sets × ${exerciseData.reps || 10} reps ${exerciseData.weight ? '@ ' + exerciseData.weight + 'kg' : ''}`,
      done: false,
      cat: exerciseData.cat || 'strength',
      weight: exerciseData.weight || 0,
      reps: exerciseData.reps || 10,
      sets: exerciseData.sets || 3,
      image: exerciseData.image || null
    });
    this.showToast(`Added movement to today's plan`, 'success');
    this.notify();
  },

  // Workout Session State
  openWorkout(name = 'HIIT Cardio Burst', targetCalories = 320, exercise = 'Alternating High Knees') {
    this.state.activeWorkoutSession.name = name;
    this.state.activeWorkoutSession.targetCalories = targetCalories;
    this.state.activeWorkoutSession.currentExercise = exercise;
    this.state.activeWorkoutSession.currentSet = 1;
    this.state.activeWorkoutSession.totalSets = 4;
    this.state.activeWorkoutSession.currentWeight = 85;
    this.state.activeWorkoutSession.currentReps = 8;
    this.state.activeWorkoutSession.elapsed = 0;
    this.state.activeWorkoutSession.calories = 0;
    this.state.activeWorkoutSession.isResting = false;
    this.state.activeWorkoutSession.restTimeRemaining = 0;
    this.state.isWorkoutActive = true;
    this.notify();
  },

  closeWorkout() {
    this.state.isWorkoutActive = false;
    this.state.activeWorkoutSession.isRunning = false;
    this.notify();
  },

  toggleWorkoutTimer() {
    this.state.activeWorkoutSession.isRunning = !this.state.activeWorkoutSession.isRunning;
    this.notify();
  },

  adjustWorkoutSet(weightDelta, repsDelta) {
    const s = this.state.activeWorkoutSession;
    s.currentWeight = Math.max(0, s.currentWeight + weightDelta);
    s.currentReps = Math.max(1, s.currentReps + repsDelta);
    this.notify();
  },

  logWorkoutSet() {
    const s = this.state.activeWorkoutSession;
    if (s.currentSet < s.totalSets) {
      s.currentSet += 1;
      s.calories += 30;
      s.isResting = true;
      s.restTimeRemaining = 60;
      this.showToast(`Set logged! 60s rest started.`, 'success');
    } else {
      this.showToast(`All sets completed! Finish when ready.`, 'info');
    }
    this.notify();
  },

  tickWorkout() {
    const s = this.state.activeWorkoutSession;
    if (s.isRunning) {
      s.elapsed += 1;
      s.calories += 0.25;
      
      // Heart rate fluctuation simulation
      if (s.elapsed % 5 === 0) {
        s.currentHr = Math.min(175, Math.max(135, s.currentHr + (Math.floor(Math.random() * 5) - 2)));
      }

      if (s.isResting && s.restTimeRemaining > 0) {
        s.restTimeRemaining -= 1;
        if (s.restTimeRemaining === 0) {
          s.isResting = false;
          this.showToast(`Rest period over! Begin Set ${s.currentSet}`, 'info');
        }
      }
      this.notify();
    }
  },

  completeWorkout() {
    const s = this.state.activeWorkoutSession;
    const burned = Math.round(s.calories);
    const minutes = Math.round(s.elapsed / 60);

    this.state.stats.burn += burned;
    this.state.stats.move += Math.max(1, minutes);
    this.closeWorkout();
    this.showToast(`Workout Complete! +${burned} kcal • ${minutes}m Move logged`, 'success');
  },

  // Box Breathing Coach
  startBreathing() {
    this.state.breathingCoach.isActive = true;
    this.state.breathingCoach.phase = 'Inhale';
    this.state.breathingCoach.secondsLeft = 4;
    this.notify();
  },

  stopBreathing() {
    this.state.breathingCoach.isActive = false;
    this.notify();
  },

  tickBreathing() {
    const b = this.state.breathingCoach;
    if (b.isActive) {
      b.secondsLeft -= 1;
      if (b.secondsLeft <= 0) {
        b.secondsLeft = 4;
        switch (b.phase) {
          case 'Inhale':
            b.phase = 'Hold (Full)';
            break;
          case 'Hold (Full)':
            b.phase = 'Exhale';
            break;
          case 'Exhale':
            b.phase = 'Hold (Empty)';
            break;
          case 'Hold (Empty)':
            b.phase = 'Inhale';
            b.cyclesCompleted += 1;
            break;
        }
      }
      this.notify();
    }
  },

  // Profile and Goals Customizer
  updateProfile(data) {
    this.state.user = { ...this.state.user, ...data };
    this.state.isEditProfileOpen = false;
    this.showToast('Profile updated successfully', 'success');
    this.notify();
  },

  updateDailyGoals(goals) {
    this.state.stats.stepsTarget = Number(goals.stepsTarget) || this.state.stats.stepsTarget;
    this.state.stats.burnTarget = Number(goals.burnTarget) || this.state.stats.burnTarget;
    this.state.stats.moveTarget = Number(goals.moveTarget) || this.state.stats.moveTarget;
    this.state.stats.waterTarget = Number(goals.waterTarget) || this.state.stats.waterTarget;
    this.state.isCustomizeGoalsOpen = false;
    this.showToast('Daily targets customized', 'success');
    this.notify();
  },

  // Device Sync & Telemetry Management
  syncDevice(id) {
    const dev = this.state.connectedDevices.find(d => d.id === id);
    if (dev) {
      dev.lastSync = 'Just now';
      this.showToast(`${dev.name} telemetry synced!`, 'success');
      this.notify();
    }
  },

  syncAllDevices() {
    this.state.connectedDevices.forEach(d => {
      d.lastSync = 'Just now';
    });
    this.showToast('All connected telemetry synchronized!', 'success');
    this.notify();
  },

  togglePairModal(open = null, tab = null) {
    this.state.isPairDeviceModalOpen = open !== null ? open : !this.state.isPairDeviceModalOpen;
    if (tab) {
      this.state.activePairModalTab = tab;
    }
    if (!this.state.isPairDeviceModalOpen) {
      this.state.isScanningBluetooth = false;
      this.state.selectedAppForAuth = null;
      this.state.pairingInProgressId = null;
    }
    this.notify();
  },

  setPairModalTab(tab) {
    this.state.activePairModalTab = tab;
    this.state.selectedAppForAuth = null;
    this.notify();
  },

  openAppAuthModal(appId) {
    this.state.selectedAppForAuth = appId;
    this.notify();
  },

  closeAppAuthModal() {
    this.state.selectedAppForAuth = null;
    this.notify();
  },

  connectApp(appId, customPermissions = null) {
    const app = this.state.ecosystemApps.find(a => a.id === appId);
    if (!app) return;
    app.connected = true;
    app.lastSync = 'Just now';
    if (customPermissions) {
      app.permissions = { ...app.permissions, ...customPermissions };
    }
    const existing = this.state.connectedDevices.find(d => d.id === appId);
    if (!existing) {
      this.state.connectedDevices.unshift({
        id: app.id,
        name: app.name,
        type: 'app',
        status: 'Connected',
        lastSync: 'Just now',
        icon: app.icon,
        battery: null,
        signal: 100
      });
    } else {
      existing.status = 'Connected';
      existing.lastSync = 'Just now';
    }
    this.state.selectedAppForAuth = null;
    this.showToast(`Connected to ${app.name}! Telemetry access granted.`, 'success');
    this.notify();
  },

  disconnectApp(appId) {
    const app = this.state.ecosystemApps.find(a => a.id === appId);
    if (app) {
      app.connected = false;
      app.lastSync = null;
    }
    this.state.connectedDevices = this.state.connectedDevices.filter(d => d.id !== appId);
    this.state.selectedAppForAuth = null;
    this.showToast(`Disconnected from ${app ? app.name : appId}`, 'info');
    this.notify();
  },

  async startBluetoothScan() {
    this.state.isScanningBluetooth = true;
    this.notify();

    // Check if Web Bluetooth API is supported
    if (typeof navigator !== 'undefined' && navigator.bluetooth && navigator.bluetooth.requestDevice) {
      try {
        const device = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
          optionalServices: ['heart_rate', 'battery_service']
        });
        if (device) {
          const newDev = {
            id: `ble-${device.id || Date.now()}`,
            name: device.name || 'Bluetooth Health Sensor',
            category: 'Paired BLE Device',
            protocol: 'Web Bluetooth API',
            icon: 'bluetooth_connected',
            signal: 95,
            battery: 88,
            rssi: -45
          };
          this.pairBleDevice(newDev);
          this.state.isScanningBluetooth = false;
          return;
        }
      } catch (err) {
        console.log('Web Bluetooth prompt cancelled or not available:', err);
      }
    }

    // High fidelity BLE ambient scan discovery simulation
    setTimeout(() => {
      if (this.state.isScanningBluetooth) {
        this.state.isScanningBluetooth = false;
        this.showToast(`Found ${this.state.availableBleDevices.length} nearby BLE fitness devices!`, 'success');
        this.notify();
      }
    }, 2000);
  },

  stopBluetoothScan() {
    this.state.isScanningBluetooth = false;
    this.notify();
  },

  pairBleDevice(deviceIdOrObj) {
    let devObj;
    if (typeof deviceIdOrObj === 'object') {
      devObj = deviceIdOrObj;
    } else {
      devObj = this.state.availableBleDevices.find(d => d.id === deviceIdOrObj);
    }
    if (!devObj) return;

    this.state.pairingInProgressId = devObj.id;
    this.notify();

    setTimeout(() => {
      this.state.pairingInProgressId = null;
      const existing = this.state.connectedDevices.find(d => d.id === devObj.id);
      if (!existing) {
        this.state.connectedDevices.unshift({
          id: devObj.id,
          name: devObj.name,
          type: 'device',
          status: 'Connected',
          lastSync: 'Just now',
          icon: devObj.icon || 'watch',
          battery: devObj.battery || 90,
          signal: devObj.signal || 92
        });
      } else {
        existing.status = 'Connected';
        existing.lastSync = 'Just now';
      }
      this.showToast(`Successfully paired ${devObj.name}!`, 'success');
      this.notify();
    }, 1200);
  },

  unpairDevice(id) {
    const dev = this.state.connectedDevices.find(d => d.id === id);
    const name = dev ? dev.name : 'Device';
    this.state.connectedDevices = this.state.connectedDevices.filter(d => d.id !== id);
    const app = this.state.ecosystemApps.find(a => a.id === id);
    if (app) {
      app.connected = false;
    }
    this.showToast(`Unpaired ${name}`, 'info');
    this.notify();
  },

  // Modals Toggles
  toggleNotifications() {
    this.state.isNotificationsOpen = !this.state.isNotificationsOpen;
    this.notify();
  },

  markNotificationsRead() {
    this.state.notifications.forEach(n => { n.read = true; });
    this.showToast('All notifications marked as read', 'info');
    this.notify();
  },

  deleteNotification(id) {
    this.state.notifications = this.state.notifications.filter(n => n.id !== id);
    this.notify();
  },

  clearNotifications() {
    this.state.notifications = [];
    this.showToast('All notifications cleared', 'info');
    this.notify();
  },

  toggleEditProfile(open = null) {
    this.state.isEditProfileOpen = open !== null ? open : !this.state.isEditProfileOpen;
    this.notify();
  },

  toggleCustomizeGoals(open = null) {
    this.state.isCustomizeGoalsOpen = open !== null ? open : !this.state.isCustomizeGoalsOpen;
    this.notify();
  },

  toggleAddHabit(open = null) {
    this.state.isAddHabitOpen = open !== null ? open : !this.state.isAddHabitOpen;
    this.notify();
  },

  toggleEditVitals(open = null, field = 'sleep') {
    this.state.isEditVitalsOpen = open !== null ? open : !this.state.isEditVitalsOpen;
    if (field) {
      this.state.activeEditVitalsField = (field === 'hr' || field === 'all') ? 'sleep' : field;
    }
    this.notify();
  },

  updateVitals(newStats) {
    if (newStats.steps !== undefined) {
      this.state.stats.steps = Math.max(0, parseInt(newStats.steps, 10) || 0);
    }
    if (newStats.stepsTarget !== undefined) {
      this.state.stats.stepsTarget = Math.max(500, parseInt(newStats.stepsTarget, 10) || 10000);
    }
    if (newStats.sleep !== undefined) {
      this.state.stats.sleep = String(newStats.sleep).trim();
    }
    if (newStats.sleepStartTime !== undefined) {
      this.state.stats.sleepStartTime = String(newStats.sleepStartTime).trim();
    }
    if (newStats.sleepWakeTime !== undefined) {
      this.state.stats.sleepWakeTime = String(newStats.sleepWakeTime).trim();
    }
    if (newStats.sleepScore !== undefined) {
      this.state.stats.sleepScore = String(newStats.sleepScore).trim();
    }
    if (newStats.bedtimeAlarmEnabled !== undefined) {
      this.state.stats.bedtimeAlarmEnabled = Boolean(newStats.bedtimeAlarmEnabled);
    }
    if (newStats.wakeAlarmEnabled !== undefined) {
      this.state.stats.wakeAlarmEnabled = Boolean(newStats.wakeAlarmEnabled);
    }
    if (newStats.bedtimeAlarmSound !== undefined) {
      this.state.stats.bedtimeAlarmSound = String(newStats.bedtimeAlarmSound).trim();
    }
    if (newStats.wakeAlarmSound !== undefined) {
      this.state.stats.wakeAlarmSound = String(newStats.wakeAlarmSound).trim();
    }
    if (newStats.restingHr !== undefined) {
      this.state.stats.restingHr = Math.max(30, parseInt(newStats.restingHr, 10) || 60);
    }
    if (newStats.hrChange !== undefined) {
      this.state.stats.hrChange = String(newStats.hrChange).trim();
    }
    if (newStats.burn !== undefined) {
      this.state.stats.burn = Math.max(0, parseInt(newStats.burn, 10) || 0);
    }
    if (newStats.move !== undefined) {
      this.state.stats.move = Math.max(0, parseInt(newStats.move, 10) || 0);
    }
    if (newStats.water !== undefined) {
      this.state.stats.water = Math.max(0, +(parseFloat(newStats.water) || 0).toFixed(2));
    }

    this.state.isEditVitalsOpen = false;
    this.saveCurrentDateRecord();
    this.showToast('Daily vitals & telemetry updated!', 'success');
    this.notify();
  },

  toggleSprintWeek(open = null) {
    this.state.isSprintWeekOpen = open !== null ? open : !this.state.isSprintWeekOpen;
    this.notify();
  },

  toggleTheme() {
    this.state.settings.themeMode = this.state.settings.themeMode === 'Dark Mode' ? 'Light Minimal' : 'Dark Mode';
    this.showToast(`Theme switched to ${this.state.settings.themeMode}`, 'info');
    this.notify();
  },

  togglePushReminders() {
    this.state.settings.pushReminders = !this.state.settings.pushReminders;
    this.showToast(`Push reminders: ${this.state.settings.pushReminders ? 'Enabled' : 'Disabled'}`, 'info');
    this.notify();
  },

  resetAllData() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = JSON.parse(JSON.stringify(defaultState));
    this.showToast('Account data reset to default demo', 'info');
    this.notify();
  }
};

// Ensure active date record is initialized on startup
store.syncDateRecord(store.state.selectedDate, false);
