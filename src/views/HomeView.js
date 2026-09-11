import { store } from '../state/store.js';

export function renderHomeView() {
  const { user, stats, habits } = store.state;
  const completedHabitsCount = habits.filter(h => h.completed).length;

  return `
    <div class="flex flex-col w-full gap-unit-lg pb-unit-3xl pt-2">
      <!-- Greeting & Readiness Section -->
      <section class="flex flex-col gap-unit-xs">
        <div class="flex items-center justify-between">
          <span class="inline-flex items-center gap-unit-2xs bg-surface-container-high px-unit-sm py-unit-2xs rounded-full font-label-md text-label-md text-on-surface-variant">
            <span class="material-symbols-outlined text-[15px]">calendar_today</span>
            Thursday, Oct 24
          </span>
          <div class="inline-flex items-center gap-unit-2xs bg-emerald-100 text-emerald-800 px-unit-sm py-unit-2xs rounded-full shadow-[0_2px_12px_rgba(0,101,145,0.12)]">
            <span class="material-symbols-outlined text-emerald-600 text-[16px] fill">bolt</span>
            <span class="font-label-md text-label-md tracking-wide font-bold">Ready ${user.readiness}%</span>
          </div>
        </div>
        <div class="flex flex-col mt-unit-2xs">
          <h1 class="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight font-extrabold">Good morning, ${user.name}</h1>
          <p class="font-body-sm text-body-sm text-on-surface-variant">Your vitals are peaked for endurance today. Let's conquer the streak.</p>
        </div>
      </section>

      <!-- Daily Convergence Ring Card -->
      <section class="relative bg-surface-container-lowest rounded-3xl p-unit-lg shadow-[0_12px_32px_-4px_rgba(17,24,39,0.05)] border border-surface-container-high/60 overflow-hidden">
        <div class="flex items-center justify-between mb-unit-md">
          <div class="flex items-center gap-unit-2xs">
            <span class="material-symbols-outlined text-primary text-[20px] fill">donut_large</span>
            <span class="font-label-lg text-label-lg text-on-surface uppercase tracking-wider text-[11px] font-bold">Daily Convergence</span>
          </div>
          <span class="font-label-md text-label-md text-on-surface-variant bg-surface-container px-unit-xs py-unit-2xs rounded-full">Optimal Pace</span>
        </div>
        
        <div class="relative flex items-center justify-center my-unit-xs">
          <svg class="w-52 h-52 transform -rotate-90" viewBox="0 0 200 200">
            <!-- Outer Ring: Burn -->
            <circle cx="100" cy="100" fill="none" r="82" stroke="#E9ECEF" stroke-width="9"></circle>
            <circle cx="100" cy="100" fill="none" r="82" stroke="#3B82F6" stroke-dasharray="515.22" stroke-dashoffset="103.04" stroke-linecap="round" stroke-width="9"></circle>
            <!-- Middle Ring: Move -->
            <circle cx="100" cy="100" fill="none" r="66" stroke="#E9ECEF" stroke-width="8"></circle>
            <circle cx="100" cy="100" fill="none" r="66" stroke="#101317" stroke-dasharray="414.69" stroke-dashoffset="124.40" stroke-linecap="round" stroke-width="8"></circle>
            <!-- Inner Ring: Water -->
            <circle cx="100" cy="100" fill="none" r="51" stroke="#E9ECEF" stroke-width="7"></circle>
            <circle cx="100" cy="100" fill="none" r="51" stroke="#00E599" stroke-dasharray="320.44" stroke-dashoffset="80.11" stroke-linecap="round" stroke-width="7"></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span class="font-stat-counter text-stat-counter text-on-surface font-extrabold leading-none tracking-tight">78<span class="text-headline-md font-bold text-primary">%</span></span>
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[10px] mt-1 font-bold">Goal Reached</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-unit-xs pt-unit-md mt-unit-sm">
          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></span>
              <span class="font-label-md text-label-md text-on-surface-variant">Burn</span>
            </div>
            <span class="font-headline-md text-headline-md text-on-surface font-bold mt-1">${stats.burn}</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">/ ${stats.burnTarget} kcal</span>
          </div>
          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-gray-900 shadow-[0_0_8px_rgba(16,19,23,0.6)]"></span>
              <span class="font-label-md text-label-md text-on-surface-variant">Move</span>
            </div>
            <span class="font-headline-md text-headline-md text-on-surface font-bold mt-1">${stats.move}</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">/ ${stats.moveTarget} mins</span>
          </div>
          <div class="flex flex-col items-center text-center p-unit-xs rounded-2xl bg-surface-container-low">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(0,229,153,0.6)]"></span>
              <span class="font-label-md text-label-md text-on-surface-variant">Water</span>
            </div>
            <span class="font-headline-md text-headline-md text-on-surface font-bold mt-1">${stats.water}</span>
            <span class="font-body-sm text-body-sm text-on-surface-variant">/ ${stats.waterTarget} L</span>
          </div>
        </div>
      </section>

      <!-- 3 Key Metric Cards -->
      <section class="grid grid-cols-3 gap-unit-xs">
        <div class="bg-surface-container-lowest rounded-3xl p-unit-sm shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] border border-surface-container-high/40 flex flex-col justify-between">
          <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <span class="material-symbols-outlined text-[18px]">directions_run</span>
          </div>
          <div class="mt-unit-sm">
            <span class="font-label-md text-label-md text-on-surface-variant">Steps</span>
            <div class="font-headline-md text-headline-md text-on-surface font-bold">${stats.steps.toLocaleString()}</div>
            <span class="font-body-sm text-body-sm text-white font-medium bg-blue-600 px-1.5 py-0.5 rounded-full text-[10px]">84% target</span>
          </div>
        </div>
        
        <div class="bg-surface-container-lowest rounded-3xl p-unit-sm shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] border border-surface-container-high/40 flex flex-col justify-between">
          <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <span class="material-symbols-outlined text-[18px]">bedtime</span>
          </div>
          <div class="mt-unit-sm">
            <span class="font-label-md text-label-md text-on-surface-variant">Sleep</span>
            <div class="font-headline-md text-headline-md text-on-surface font-bold">${stats.sleep}</div>
            <span class="font-body-sm text-body-sm text-indigo-900 bg-indigo-100 px-1.5 py-0.5 rounded-full text-[10px]">${stats.sleepScore}</span>
          </div>
        </div>
        
        <div class="bg-surface-container-lowest rounded-3xl p-unit-sm shadow-[0_4px_20px_-2px_rgba(17,24,39,0.03)] border border-surface-container-high/40 flex flex-col justify-between">
          <div class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <span class="material-symbols-outlined text-[18px]">favorite</span>
          </div>
          <div class="mt-unit-sm">
            <span class="font-label-md text-label-md text-on-surface-variant">Resting</span>
            <div class="font-headline-md text-headline-md text-on-surface font-bold">${stats.restingHr} <span class="text-[12px] font-normal text-on-surface-variant">bpm</span></div>
            <span class="font-body-sm text-body-sm text-emerald-600 font-medium text-[10px] flex items-center gap-0.5">
              <span class="material-symbols-outlined text-[12px]">arrow_downward</span> ${stats.hrChange}
            </span>
          </div>
        </div>
      </section>

      <!-- Hero Workout Banner: HIIT Cardio Burst -->
      <section class="relative bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0_12px_32px_-4px_rgba(17,24,39,0.06)] border border-surface-container-high/60">
        <div class="relative h-44 w-full">
          <img class="w-full h-full object-cover object-center" alt="Sprint Runner" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZg-vaGu8ufDyTy0JGg2SVxUKAFYjkV60pN6J1WZUIE-yef-tRI0iofY_dO_M8Sq8GKaAdgUkh8GIb1KHjnVe-3snfoZC6NofVsO600p_yCvoVHxYnp8ARv0a43Ha-E-zDy8Q-8UuVvTqzvdmRmt4FzIl0TnwY_15CZeYmcTaxtAr4UTkTCu8TuwJmgVWim1wsEJjDn-vVURXogX7YMEmtRtVvqwo5xPb4wDxfQ_7gUfBiahAcLbil" />
          <div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
          <div class="absolute top-unit-md left-unit-md">
            <span class="bg-blue-600 text-white font-label-md text-label-md px-unit-sm py-unit-2xs rounded-full uppercase tracking-wider text-[10px] font-bold shadow-[0_8px_24px_-4px_rgba(59,130,246,0.5)]">Next Up</span>
          </div>
          <div class="absolute bottom-unit-md left-unit-md right-unit-md flex items-end justify-between text-white">
            <div class="min-w-0 pr-unit-sm">
              <div class="flex items-center gap-unit-2xs text-white/80 font-label-md text-label-md mb-0.5">
                <span class="material-symbols-outlined text-[16px]">timer</span>
                <span>25 mins • High Intensity</span>
              </div>
              <h2 class="font-headline-md text-headline-md text-white font-bold truncate">HIIT Cardio Burst</h2>
            </div>
          </div>
        </div>
        <div class="p-unit-md flex items-center justify-between gap-unit-md bg-[#101317]">
          <div class="flex items-center gap-unit-2xs font-body-sm text-body-sm text-[#AAB2BD]">
            <span class="material-symbols-outlined text-[20px] text-blue-400">local_fire_department</span>
            <span>Est. ~320 kcal target</span>
          </div>
          <button id="home-start-workout-btn" class="h-[48px] px-unit-lg rounded-full font-label-lg text-label-lg font-bold flex items-center gap-unit-2xs hover:opacity-95 active:scale-95 transition-all text-white bg-blue-600 shadow-[0_8px_24px_-4px_rgba(59,130,246,0.4)]">
            <span>Start Session</span>
            <span class="material-symbols-outlined text-[18px]">play_arrow</span>
          </button>
        </div>
      </section>

      <!-- Priority Habits Checklist -->
      <section class="flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-2xs">
            <h2 class="font-headline-md text-headline-md text-on-surface font-bold">Priority Habits</h2>
            <span class="bg-surface-container-high text-on-surface-variant font-label-md text-label-md px-unit-xs py-0.5 rounded-full">${completedHabitsCount}/${habits.length} Done</span>
          </div>
          <button id="home-manage-habits-btn" class="px-3.5 py-1.5 rounded-full bg-surface-container-lowest/80 backdrop-blur-md border border-gray-200 font-label-md text-label-md font-semibold text-on-surface shadow-[0_2px_8px_rgba(27,28,26,0.06)] hover:bg-surface-container-lowest active:scale-95 transition-all">Manage</button>
        </div>
        
        <div class="flex flex-col gap-unit-xs" id="habit-container">
          ${habits.slice(0, 3).map(habit => {
            const isCompleted = habit.completed;
            const checkBtnClass = isCompleted 
              ? 'bg-blue-600 text-white shadow-[0_2px_8px_rgba(59,130,246,0.3)]' 
              : 'bg-surface-container text-transparent border border-gray-300';
            const streakBg = isCompleted ? 'bg-[#343A40] text-white' : 'bg-surface-container text-gray-700';
            const fireColor = isCompleted ? 'text-blue-400' : 'text-[#AAB2BD]';

            return `
              <div class="habit-item flex items-center justify-between p-unit-md rounded-2xl bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(17,24,39,0.02)] border border-surface-container-high/40 transition-all">
                <div class="flex items-center gap-unit-md min-w-0">
                  <button data-habit-id="${habit.id}" aria-label="Toggle habit" class="habit-toggle w-7 h-7 rounded-full flex items-center justify-center transition-transform active:scale-90 ${checkBtnClass}">
                    <span class="material-symbols-outlined text-[18px] font-bold">check</span>
                  </button>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-lg text-label-lg text-on-surface font-semibold truncate ${isCompleted ? 'line-through text-opacity-70' : ''}">${habit.name}</span>
                    <span class="font-body-sm text-body-sm text-[#AAB2BD]">${habit.desc}</span>
                  </div>
                </div>
                <div class="inline-flex items-center gap-1 px-unit-sm py-1 rounded-full flex-shrink-0 shadow-[0_4px_12px_rgba(17,24,39,0.08)] ${streakBg}">
                  <span class="material-symbols-outlined text-[16px] fill ${fireColor}">local_fire_department</span>
                  <span class="font-label-md text-label-md font-bold">${habit.streak}d</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </section>

      <!-- Sprint Week Active Celebration Card -->
      <section class="relative rounded-3xl p-unit-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 overflow-hidden flex items-center justify-between">
        <div class="flex items-center gap-unit-md z-10">
          <div class="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <span class="material-symbols-outlined text-[26px]">celebration</span>
          </div>
          <div>
            <h3 class="font-headline-md text-headline-md text-on-surface font-bold leading-snug">Sprint Week Active!</h3>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Top 4% of DailyRep endurance athletes today.</p>
          </div>
        </div>
        <div class="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-blue-500/10 pointer-events-none"></div>
      </section>
    </div>
  `;
}

export function bindHomeEvents() {
  const startBtn = document.getElementById('home-start-workout-btn');
  if (startBtn) {
    startBtn.onclick = () => store.openWorkout('HIIT Cardio Burst');
  }

  const manageHabitsBtn = document.getElementById('home-manage-habits-btn');
  if (manageHabitsBtn) {
    manageHabitsBtn.onclick = () => store.setTab('daily');
  }

  document.querySelectorAll('.habit-toggle').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-habit-id');
      if (id) store.toggleHabit(id);
    };
  });
}
