// Central state store for DailyRep with localStorage persistence

const STORAGE_KEY = 'dailyrep_app_state_v1';

const defaultState = {
  currentTab: 'home',
  isWorkoutActive: false,
  isNotificationsOpen: false,
  user: {
    name: 'Sarah',
    fullName: 'Sarah Jenkins',
    tier: 'Tier 4 Endurance Athlete',
    level: 28,
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzIj7IV2jWolJwvNtsN46M3Mc7Tu2GrFNYTfeA4EKUbfDMcI2CHOrBQ7EPeWs7K3MV21RJ6N5uTOGNkikongG0NsAxASQkPe9EfM7QUSLXj0YSr02M_UzSkOdjA2-KoxnhkNArQitWwPWI0PVAHdnLbW3VZjNZVRckCLX2UfzIVKIkpXWxukJg4dEPj86wy6FeUuGduaqI3ngVrCqHhxT6xFxxvI0CeIMxc-uTkvUWx6qY_CygnOl7',
    readiness: 94
  },
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
  habits: [
    {
      id: 'h1',
      name: 'Morning Meditation',
      desc: '15 mins mindful breath',
      streak: 14,
      completed: true,
      category: 'morning',
      time: '07:00 AM',
      color: '#3B82F6'
    },
    {
      id: 'h2',
      name: 'Hydrate 500ml Electrolytes',
      desc: 'Completed with breakfast',
      streak: 8,
      completed: true,
      category: 'morning',
      time: '08:30 AM',
      color: '#00E599'
    },
    {
      id: 'h3',
      name: 'Upper Body Strength Session',
      desc: 'Planned for 5:30 PM',
      streak: 21,
      completed: false,
      category: 'afternoon',
      time: '05:30 PM',
      color: '#FF5A36'
    },
    {
      id: 'h4',
      name: '10,000 Daily Steps Goal',
      desc: '8,420 of 10,000 steps logged',
      streak: 12,
      completed: false,
      category: 'all',
      time: 'All Day',
      color: '#3B82F6'
    },
    {
      id: 'h5',
      name: 'Evening Mobility & Foam Roll',
      desc: '12 mins lower back and hips',
      streak: 5,
      completed: false,
      category: 'evening',
      time: '09:00 PM',
      color: '#AAB2BD'
    }
  ],
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
  activeWorkoutSession: {
    name: 'HIIT Cardio Burst',
    duration: 1500, // 25 mins in seconds
    elapsed: 412,
    isRunning: false,
    currentHr: 148,
    calories: 135,
    targetCalories: 320,
    currentExercise: 'Alternating High Knees',
    currentSet: 2,
    totalSets: 4
  }
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultState, ...JSON.parse(saved) };
  } catch (e) {
    console.warn('Could not load saved state:', e);
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
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('Could not save state:', e);
    }
    this.listeners.forEach(fn => fn(this.state));
  },

  setTab(tab) {
    this.state.currentTab = tab;
    this.notify();
  },

  toggleHabit(id) {
    const habit = this.state.habits.find(h => h.id === id);
    if (habit) {
      habit.completed = !habit.completed;
      if (habit.completed) {
        habit.streak += 1;
      } else {
        habit.streak = Math.max(0, habit.streak - 1);
      }
      this.notify();
    }
  },

  openWorkout(name = 'HIIT Cardio Burst') {
    this.state.activeWorkoutSession.name = name;
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

  tickWorkout() {
    if (this.state.activeWorkoutSession.isRunning) {
      this.state.activeWorkoutSession.elapsed += 1;
      this.state.activeWorkoutSession.calories += 0.2;
      this.notify();
    }
  },

  completeWorkout() {
    this.state.stats.burn += Math.round(this.state.activeWorkoutSession.calories);
    this.state.stats.move += Math.round(this.state.activeWorkoutSession.elapsed / 60);
    this.closeWorkout();
  },

  toggleNotifications() {
    this.state.isNotificationsOpen = !this.state.isNotificationsOpen;
    this.notify();
  },

  markNotificationsRead() {
    this.state.notifications.forEach(n => { n.read = true; });
    this.notify();
  }
};
