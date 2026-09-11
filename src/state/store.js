// Central State Store for DailyRep with localStorage persistence
// Production-grade reactive store with complete CRUD and telemetry management

const STORAGE_KEY = 'dailyrep_app_state_v2';

const defaultState = {
  currentTab: 'home',
  selectedDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  isWorkoutActive: false,
  isNotificationsOpen: false,
  isEditProfileOpen: false,
  isCustomizeGoalsOpen: false,
  isAddHabitOpen: false,
  isSprintWeekOpen: false,
  
  // Athlete Profile
  user: {
    name: 'Sarah',
    fullName: 'Sarah Jenkins',
    tier: 'Tier 4 Endurance Athlete',
    level: 28,
    bio: 'Endurance runner & mindful movement enthusiast. Chasing the 50-day streak milestone.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    memberSince: 'Jan 2024',
    readiness: 94
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
    sleep: '7h 45m',
    sleepScore: '92% quality',
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
    { id: 'e1', name: 'Barbell Deadlift', details: '4 sets × 8 reps @ 85kg', done: true, cat: 'strength', weight: 85, reps: 8, sets: 4 },
    { id: 'e2', name: 'Dumbbell Incline Press', details: '3 sets × 12 reps @ 24kg', done: false, cat: 'strength', weight: 24, reps: 12, sets: 3 },
    { id: 'e3', name: 'Plank to Push-up', details: '3 sets × 45 sec interval', done: false, cat: 'mobility', weight: 0, reps: 15, sets: 3 },
    { id: 'e4', name: 'Sprint Interval Repeats', details: '6 rounds × 30s sprint / 30s rest', done: false, cat: 'hiit', weight: 0, reps: 6, sets: 6 }
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
    { id: 'apple-health', name: 'Apple Health', status: 'Connected', lastSync: '12m ago', icon: 'favorite' },
    { id: 'health-connect', name: 'Health Connect', status: 'Connected', lastSync: '1h ago', icon: 'sync' },
    { id: 'oura', name: 'Oura Ring Gen 3', status: 'Connected', lastSync: '4m ago', icon: 'watch' },
    { id: 'withings', name: 'Withings Body Scan', status: 'Connected', lastSync: 'Today, 7:15 AM', icon: 'monitor_weight' }
  ],

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
          breathingCoach: { ...defaultState.breathingCoach }
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

  // Toast System
  showToast(message, type = 'success') {
    const id = 'toast_' + Date.now();
    this.state.toasts.push({ id, message, type });
    this.notify();
    setTimeout(() => {
      this.state.toasts = this.state.toasts.filter(t => t.id !== id);
      this.notify();
    }, 3200);
  },

  // Navigation Tabs
  setTab(tab) {
    this.state.currentTab = tab;
    this.notify();
  },

  // Date Navigation
  shiftDate(days) {
    const current = new Date(this.state.selectedDate);
    current.setDate(current.getDate() + days);
    this.state.selectedDate = current.toISOString().split('T')[0];
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
        this.showToast(`Completed: ${habit.name} 🔥 (Streak: ${habit.streak}d)`, 'success');
      } else {
        habit.streak = Math.max(0, habit.streak - 1);
        this.state.stats.burn = Math.max(0, this.state.stats.burn - 45);
      }
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
    this.showToast(`Added habit: "${newHabit.name}"`, 'success');
    this.notify();
  },

  deleteHabit(id) {
    const habit = this.state.habits.find(h => h.id === id);
    const name = habit ? habit.name : 'Habit';
    this.state.habits = this.state.habits.filter(h => h.id !== id);
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
    this.notify();
  },

  // Step Logger
  logSteps(deltaSteps) {
    this.state.stats.steps = Math.max(0, this.state.stats.steps + deltaSteps);
    this.state.stats.move = Math.min(this.state.stats.moveTarget, this.state.stats.move + Math.round(deltaSteps / 100));
    this.showToast(`+${deltaSteps} steps logged!`, 'success');
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
      sets: exerciseData.sets || 3
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

  // Device Sync
  syncDevice(id) {
    const dev = this.state.connectedDevices.find(d => d.id === id);
    if (dev) {
      dev.lastSync = 'Just now';
      this.showToast(`${dev.name} telemetry synced!`, 'success');
      this.notify();
    }
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
