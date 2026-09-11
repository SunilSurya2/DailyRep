import { store } from '../state/store.js';

export function renderHomeView() {
  const { user, stats, habits, selectedDate } = store.state;
  const completedHabitsCount = habits.filter(h => h.completed).length;

  // Exact Mathematical Convergence Calculation
  const burnPct = Math.min(1, stats.burn / stats.burnTarget);
  const movePct = Math.min(1, stats.move / stats.moveTarget);
  const waterPct = Math.min(1, stats.water / stats.waterTarget);
  const overallConvergence = Math.round(((burnPct + movePct + waterPct) / 3) * 100);

  // SVG Circumferences
  // Outer (Burn): 2 * PI * 82 = 515.22
  const burnCircumference = 515.22;
  const burnOffset = +(burnCircumference * (1 - burnPct)).toFixed(2);

  // Middle (Move): 2 * PI * 66 = 414.69
  const moveCircumference = 414.69;
  const moveOffset = +(moveCircumference * (1 - movePct)).toFixed(2);

  // Inner (Water): 2 * PI * 51 = 320.44
  const waterCircumference = 320.44;
  const waterOffset = +(waterCircumference * (1 - waterPct)).toFixed(2);

  // Format Display Date
  const dateObj = new Date(selectedDate);
  const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  return `
    <div class="flex flex-col w-full gap-unit-lg pb-unit-3xl pt-2">
      <!-- Date Navigator & Readiness Section -->
      <section class="flex flex-col gap-unit-xs">
        <div class="flex items-center justify-between">
          <div class="inline-flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-on-surface-variant font-label-md text-xs font-semibold">
            <button id="home-prev-date-btn" class="w-5 h-5 flex items-center justify-center hover:text-on-surface active:scale-90 transition-transform">
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <span class="px-1">${dateStr}</span>
            <button id="home-next-date-btn" class="w-5 h-5 flex items-center justify-center hover:text-on-surface active:scale-90 transition-transform">
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
          <div class="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 px-unit-sm py-unit-2xs rounded-full shadow-xs">
            <span class="material-symbols-outlined text-emerald-600 text-[16px] fill">bolt</span>
            <span class="font-label-md text-label-md tracking-wide font-bold">Ready ${user.readiness}%</span>
          </div>
        </div>
        <div class="flex flex-col mt-unit-2xs">
          <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-extrabold">Good day, ${user.name}</h1>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Your vitals are peaked for endurance today. Let's conquer the streak.</p>
        </div>
      </section>

      <!-- Daily Convergence Ring Card -->
      <section class="relative bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/60 overflow-hidden">
        <div class="flex items-center justify-between mb-unit-md">
          <div class="flex items-center gap-unit-2xs">
            <span class="material-symbols-outlined text-primary text-[20px] fill">donut_large</span>
            <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider text-[11px] font-bold">Daily Convergence</span>
          </div>
          <span class="font-label-md text-label-md text-blue-700 bg-blue-50 px-unit-xs py-unit-2xs rounded-full font-bold">
            ${overallConvergence >= 100 ? 'Goal Surpassed! 🏆' : overallConvergence >= 75 ? 'Optimal Pace' : 'Pacing Today'}
          </span>
        </div>
        
        <div class="relative flex items-center justify-center my-unit-xs">
          <svg class="w-52 h-52 transform -rotate-90" viewBox="0 0 200 200">
            <!-- Outer Ring: Burn (Blue) -->
            <circle cx="100" cy="100" fill="none" r="82" stroke="#E9ECEF" stroke-width="9"></circle>
            <circle cx="100" cy="100" fill="none" r="82" stroke="#3B82F6" stroke-dasharray="${burnCircumference}" stroke-dashoffset="${burnOffset}" stroke-linecap="round" stroke-width="9" class="transition-all duration-700"></circle>
            
            <!-- Middle Ring: Move (Obsidian) -->
            <circle cx="100" cy="100" fill="none" r="66" stroke="#E9ECEF" stroke-width="8"></circle>
            <circle cx="100" cy="100" fill="none" r="66" stroke="#101317" stroke-dasharray="${moveCircumference}" stroke-dashoffset="${moveOffset}" stroke-linecap="round" stroke-width="8" class="transition-all duration-700"></circle>
            
            <!-- Inner Ring: Water (Hyper Mint) -->
            <circle cx="100" cy="100" fill="none" r="51" stroke="#E9ECEF" stroke-width="7"></circle>
            <circle cx="100" cy="100" fill="none" r="51" stroke="#00E599" stroke-dasharray="${waterCircumference}" stroke-dashoffset="${waterOffset}" stroke-linecap="round" stroke-width="7" class="transition-all duration-700"></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span class="font-stat-counter text-stat-counter text-on-surface font-extrabold leading-none tracking-tight">${overallConvergence}<span class="text-headline-md font-bold text-primary">%</span></span>
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[10px] mt-1 font-bold">Convergence</span>
          </div>
        </div>

        <!-- Telemetry Breakdown Chips -->
        <div class="grid grid-cols-3 gap-unit-xs pt-unit-md mt-unit-sm border-t border-gray-100">
          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              <span class="font-label-md text-xs text-on-surface-variant font-bold">Burn</span>
            </div>
            <span class="font-headline-md font-extrabold text-on-surface mt-1">${stats.burn}<span class="text-xs font-normal text-gray-500">/${stats.burnTarget}</span></span>
            <span class="text-[10px] text-gray-400 font-semibold">kcal</span>
          </div>

          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-[#101317] shadow-[0_0_8px_rgba(16,19,23,0.4)]"></span>
              <span class="font-label-md text-xs text-on-surface-variant font-bold">Move</span>
            </div>
            <span class="font-headline-md font-extrabold text-on-surface mt-1">${stats.move}<span class="text-xs font-normal text-gray-500">/${stats.moveTarget}</span></span>
            <span class="text-[10px] text-gray-400 font-semibold">minutes</span>
          </div>

          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low relative">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-[#00E599] shadow-[0_0_8px_rgba(0,229,153,0.6)]"></span>
              <span class="font-label-md text-xs text-on-surface-variant font-bold">Water</span>
            </div>
            <span class="font-headline-md font-extrabold text-on-surface mt-1">${stats.water}<span class="text-xs font-normal text-gray-500">/${stats.waterTarget}</span></span>
            
            <!-- Quick Water Increment / Decrement Stepper -->
            <div class="flex items-center gap-1.5 mt-1">
              <button id="home-water-dec-btn" title="Remove 250ml" class="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 active:scale-90 transition-transform text-xs font-bold">-</button>
              <span class="text-[10px] text-gray-500 font-bold">L</span>
              <button id="home-water-inc-btn" title="Add 250ml" class="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-90 transition-transform text-xs font-bold">+</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Key Vitals Grid (Steps, Sleep, Resting HR) -->
      <section class="grid grid-cols-3 gap-unit-xs">
        <!-- Steps Card with Quick Logger -->
        <div class="bg-surface-container-lowest rounded-2xl p-unit-md shadow-sm border border-surface-container-high/40 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="material-symbols-outlined text-[20px] text-blue-600">directions_walk</span>
            <button id="home-quick-steps-btn" title="Log 1,000 steps" class="text-[10px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded-full hover:bg-blue-100 active:scale-95 transition-all">+1k</button>
          </div>
          <div class="mt-2">
            <span class="font-stat-counter text-xl font-extrabold text-on-surface block leading-tight">${stats.steps.toLocaleString()}</span>
            <span class="font-label-md text-xs text-gray-500 font-semibold">Steps Today</span>
          </div>
        </div>

        <!-- Sleep Quality Card -->
        <div class="bg-surface-container-lowest rounded-2xl p-unit-md shadow-sm border border-surface-container-high/40 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="material-symbols-outlined text-[20px] text-indigo-500">bedtime</span>
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
          </div>
          <div class="mt-2">
            <span class="font-stat-counter text-xl font-extrabold text-on-surface block leading-tight">${stats.sleep}</span>
            <span class="font-label-md text-xs text-gray-500 font-semibold">${stats.sleepScore}</span>
          </div>
        </div>

        <!-- Resting Heart Rate Card -->
        <div class="bg-surface-container-lowest rounded-2xl p-unit-md shadow-sm border border-surface-container-high/40 flex flex-col justify-between">
          <div class="flex items-center justify-between">
            <span class="material-symbols-outlined text-[20px] text-red-500 fill">favorite</span>
            <span class="text-[11px] font-bold text-emerald-600">${stats.hrChange}</span>
          </div>
          <div class="mt-2">
            <span class="font-stat-counter text-xl font-extrabold text-on-surface block leading-tight">${stats.restingHr} <span class="text-xs font-normal text-gray-400">bpm</span></span>
            <span class="font-label-md text-xs text-gray-500 font-semibold">Resting HR</span>
          </div>
        </div>
      </section>

      <!-- Featured Workout Hero Launch Banner -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101317] via-[#1a202c] to-[#101317] text-white shadow-xl flex flex-col justify-between min-h-[200px] p-unit-lg border border-gray-800">
        <div class="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="relative z-10 flex items-start justify-between">
          <span class="bg-blue-600 text-white font-label-md text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px]">local_fire_department</span> Scheduled
          </span>
          <span class="text-xs font-semibold text-white/70">Starts in 25 min</span>
        </div>

        <div class="relative z-10 my-2">
          <h2 class="font-headline-lg-mobile text-2xl font-extrabold tracking-tight text-white">HIIT Cardio Burst</h2>
          <p class="font-body-sm text-xs text-white/70 mt-0.5">High-intensity aerobic intervals designed for peak metabolic rate.</p>
        </div>

        <div class="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
          <div class="flex items-center gap-3 text-xs text-white/80 font-semibold">
            <span>25 min</span>
            <span>•</span>
            <span>320 kcal target</span>
          </div>
          <button id="home-start-workout-btn" class="h-10 px-5 rounded-full bg-blue-600 text-white font-label-md text-xs font-bold flex items-center gap-1 shadow-lg shadow-blue-500/30 hover:bg-blue-500 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px] fill">play_arrow</span>
            <span>Start Session</span>
          </button>
        </div>
      </section>

      <!-- Priority Daily Habits Checklist -->
      <section class="flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-blue-600 text-[20px]">task_alt</span>
            <h3 class="font-headline-md text-headline-md text-on-surface font-extrabold">Today's Habits</h3>
          </div>
          <button id="home-manage-habits-btn" class="font-label-md text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5">
            <span>View All (${completedHabitsCount}/${habits.length})</span>
            <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div class="flex flex-col gap-unit-xs">
          ${habits.map(habit => {
            const isDone = habit.completed;
            const borderStyle = isDone ? 'border-emerald-200 bg-emerald-50/40' : 'border-gray-200 bg-white hover:bg-gray-50';
            const iconBg = isDone ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400 hover:text-gray-700';

            return `
              <div class="p-unit-md rounded-2xl border transition-all flex items-center justify-between shadow-xs ${borderStyle}">
                <div class="flex items-center gap-unit-sm min-w-0">
                  <button data-habit-id="${habit.id}" class="habit-toggle w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform active:scale-90 ${iconBg}">
                    <span class="material-symbols-outlined text-[20px] font-bold">${isDone ? 'check' : 'radio_button_unchecked'}</span>
                  </button>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-lg font-bold text-on-surface truncate text-sm ${isDone ? 'line-through text-gray-500' : ''}">${habit.name}</span>
                    <span class="font-body-sm text-xs text-gray-500 truncate">${habit.desc}</span>
                  </div>
                </div>
                <div class="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-label-md text-xs font-extrabold shrink-0">
                  <span class="material-symbols-outlined text-[14px] fill">local_fire_department</span>
                  <span>${habit.streak}d</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Sprint Week Active Card -->
      <section id="home-sprint-card" class="relative rounded-3xl p-unit-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 overflow-hidden flex items-center justify-between cursor-pointer active:scale-98 transition-all">
        <div class="flex items-center gap-unit-md z-10">
          <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <span class="material-symbols-outlined text-[26px]">celebration</span>
          </div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface font-extrabold leading-snug">Sprint Week Active!</h3>
            <p class="font-body-sm text-xs text-on-surface-variant">Top 4% of DailyRep endurance athletes today.</p>
          </div>
        </div>
        <span class="material-symbols-outlined text-[20px] text-blue-600">chevron_right</span>
      </section>

      <!-- Sprint Week Leaderboard Modal -->
      ${store.state.isSprintWeekOpen ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div class="bg-white w-full max-w-sm rounded-3xl p-unit-lg shadow-2xl border border-gray-200 flex flex-col gap-unit-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-amber-500 text-2xl">emoji_events</span>
                <h3 class="font-headline-md text-lg font-extrabold text-gray-900">Sprint Week #32</h3>
              </div>
              <button id="modal-close-sprint-btn" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div class="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-full border-2 border-blue-600 overflow-hidden">
                  <img src="${store.state.user.avatarUrl}" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 class="font-bold text-sm text-gray-900">${store.state.user.fullName}</h4>
                  <span class="text-xs text-blue-700 font-semibold">Rank #4 • 4,820 XP</span>
                </div>
              </div>
              <span class="px-2 py-1 rounded-full text-xs font-black bg-blue-600 text-white">Top 4%</span>
            </div>

            <div class="flex flex-col gap-2">
              <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Weekly Objectives</span>
              <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>5 / 5 Workouts Completed</span>
                <span class="text-emerald-600 font-bold">100%</span>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>7 / 7 Days Hydration Met</span>
                <span class="text-emerald-600 font-bold">85%</span>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between text-xs font-semibold text-gray-700">
                <span>50,000 Step Milestone</span>
                <span class="text-blue-600 font-bold">42.1k / 50k</span>
              </div>
            </div>

            <button id="modal-claim-sprint-btn" class="w-full h-11 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-95 transition-all">
              Claim Sprint Badge
            </button>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function bindHomeEvents() {
  const startBtn = document.getElementById('home-start-workout-btn');
  if (startBtn) {
    startBtn.onclick = () => store.openWorkout('HIIT Cardio Burst', 320, 'Alternating High Knees');
  }

  const manageHabitsBtn = document.getElementById('home-manage-habits-btn');
  if (manageHabitsBtn) {
    manageHabitsBtn.onclick = () => store.setTab('daily');
  }

  const prevDateBtn = document.getElementById('home-prev-date-btn');
  if (prevDateBtn) {
    prevDateBtn.onclick = () => store.shiftDate(-1);
  }

  const nextDateBtn = document.getElementById('home-next-date-btn');
  if (nextDateBtn) {
    nextDateBtn.onclick = () => store.shiftDate(1);
  }

  const waterIncBtn = document.getElementById('home-water-inc-btn');
  if (waterIncBtn) {
    waterIncBtn.onclick = () => store.logWater(0.25);
  }

  const waterDecBtn = document.getElementById('home-water-dec-btn');
  if (waterDecBtn) {
    waterDecBtn.onclick = () => store.logWater(-0.25);
  }

  const quickStepsBtn = document.getElementById('home-quick-steps-btn');
  if (quickStepsBtn) {
    quickStepsBtn.onclick = () => store.logSteps(1000);
  }

  const sprintCard = document.getElementById('home-sprint-card');
  if (sprintCard) {
    sprintCard.onclick = () => store.toggleSprintWeek(true);
  }

  const closeSprintBtn = document.getElementById('modal-close-sprint-btn');
  if (closeSprintBtn) {
    closeSprintBtn.onclick = () => store.toggleSprintWeek(false);
  }

  const claimSprintBtn = document.getElementById('modal-claim-sprint-btn');
  if (claimSprintBtn) {
    claimSprintBtn.onclick = () => {
      store.toggleSprintWeek(false);
      store.showToast('Sprint Week Diamond Badge added to your profile!', 'success');
    };
  }

  document.querySelectorAll('.habit-toggle').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-habit-id');
      if (id) store.toggleHabit(id);
    };
  });
}
