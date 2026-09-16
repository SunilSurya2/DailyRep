import { store } from '../state/store.js';

let activeCategory = 'all';

export function renderDailyHabitsView() {
  const { habits, stats, breathingCoach, isAddHabitOpen } = store.state;

  const categories = [
    { id: 'all', label: 'All Habits' },
    { id: 'morning', label: '🌅 Morning Routine' },
    { id: 'afternoon', label: '⚡ Afternoon Focus' },
    { id: 'evening', label: '🌙 Evening Wind-down' }
  ];

  const filteredHabits = activeCategory === 'all'
    ? habits
    : habits.filter(h => h.category === activeCategory);

  const completedCount = habits.filter(h => h.completed).length;

  // Water calculation: 1 glass = 250ml (0.25L)
  const glassesLogged = Math.round(stats.water / 0.25);
  const totalGlasses = Math.round(stats.waterTarget / 0.25);

  return `
    <div class="flex flex-col w-full gap-unit-md pb-unit-3xl pt-2">
      <!-- Weekly Momentum Summary Card -->
      <div class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-md relative overflow-hidden">
        <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none bg-blue-500/15"></div>
        <div class="flex items-center justify-between z-10">
          <div class="flex flex-col">
            <span class="font-label-md text-label-md uppercase tracking-wider text-[#343A40] text-[11px] font-bold">Weekly Momentum</span>
            <div class="flex items-baseline gap-unit-2xs mt-0.5">
              <span class="font-stat-counter text-stat-counter font-extrabold text-[#101317] tracking-tight">
                ${habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0}%
              </span>
              <span class="font-body-sm text-body-sm text-emerald-600 font-bold ml-1">+12% vs last week</span>
            </div>
          </div>
          <button id="habits-open-add-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600 text-white font-label-md text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>New Habit</span>
          </button>
        </div>

        <!-- 7-Day Matrix Strip -->
        <div class="grid grid-cols-7 gap-1 pt-unit-xs z-10 border-t border-gray-100">
          ${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
            const isDone = idx <= 3; // Past days met
            const isToday = idx === 3;
            return `
              <div class="flex flex-col items-center gap-1">
                <span class="text-[11px] font-bold ${isToday ? 'text-blue-600' : 'text-gray-400'}">${day}</span>
                <div class="w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${isDone ? 'bg-blue-600 text-white shadow-xs' : 'bg-gray-100 text-gray-400'}">
                  ${isDone ? '✓' : '○'}
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Add Habit Modal / Inline Panel -->
      ${isAddHabitOpen ? `
        <div class="p-4 rounded-3xl bg-blue-50/80 border border-blue-200 flex flex-col gap-3 animate-fade-in shadow-sm">
          <div class="flex items-center justify-between">
            <span class="font-headline-md text-sm font-bold text-blue-900">Create New Habit</span>
            <button id="habits-cancel-add-btn" class="text-xs text-gray-500 font-bold hover:text-gray-800">Cancel</button>
          </div>
          <input id="new-habit-title" type="text" placeholder="Habit title (e.g., Cold Plunge 3m)" class="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <input id="new-habit-desc" type="text" placeholder="Description or target time" class="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          
          <div class="grid grid-cols-2 gap-2">
            <div>
              <label class="text-[10px] text-gray-500 font-bold uppercase block mb-1">Time of Day</label>
              <select id="new-habit-category" class="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-body-sm text-xs">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="all">All Day</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] text-gray-500 font-bold uppercase block mb-1">Schedule Time</label>
              <input id="new-habit-time" type="text" value="07:30 AM" class="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-body-sm text-xs" />
            </div>
          </div>

          <button id="habits-submit-new-btn" class="w-full h-10 rounded-xl bg-blue-600 text-white font-label-md text-xs font-bold shadow-md active:scale-95 transition-all">
            Save Habit to Routine
          </button>
        </div>
      ` : ''}

      <!-- Interactive Category Tabs -->
      <div class="flex items-center gap-unit-xs overflow-x-auto py-unit-2xs no-scrollbar -mx-margin-mobile px-margin-mobile">
        ${categories.map(c => {
          const isActive = activeCategory === c.id;
          const cls = isActive
            ? 'bg-[#101317] text-white shadow-sm'
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';
          return `
            <button data-cat="${c.id}" class="habits-cat-btn px-unit-md py-unit-xs rounded-full font-label-md text-label-md whitespace-nowrap transition-transform active:scale-95 ${cls}">
              ${c.label}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Dynamic Habit Cards Stack -->
      <div class="flex flex-col gap-unit-sm">
        ${filteredHabits.map(habit => {
          const isDone = habit.completed;
          const isRecent = store.state.lastCompletedHabitId === habit.id && (Date.now() - (store.state.lastCompletedAt || 0) < 1600);
          const cardBorder = isDone 
            ? `border-emerald-300/80 bg-emerald-50/30 ${isRecent ? 'animate-card-pulse ring-2 ring-emerald-400/30' : ''}` 
            : 'border-gray-200 bg-white hover:bg-gray-50';
          const buttonBg = isDone 
            ? `bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md shadow-emerald-500/25 ${isRecent ? 'animate-check-pop' : ''}` 
            : 'bg-gray-100 text-gray-400 hover:bg-gray-200/80 hover:text-gray-600 border border-gray-200/70';

          return `
            <div class="p-unit-md rounded-3xl border shadow-sm flex items-center justify-between gap-unit-md transition-all duration-300 relative overflow-hidden ${cardBorder}">
              <div class="flex items-center gap-unit-sm min-w-0">
                <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white" style="background-color: ${habit.color || '#3B82F6'};">
                  <span class="material-symbols-outlined text-[22px]">${habit.icon || 'check_circle'}</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-headline-md text-sm font-bold truncate transition-all duration-200 ${isDone ? 'line-through text-gray-400 decoration-gray-400/80' : 'text-[#101317]'}">
                    ${habit.name}
                  </span>
                  <div class="flex items-center gap-1.5 mt-0.5 text-xs text-gray-500">
                    <span class="capitalize px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold text-[10px]">${habit.category}</span>
                    <span>•</span>
                    <span>${habit.time}</span>
                    <span>•</span>
                    <span class="inline-flex items-center gap-0.5 font-bold text-orange-600">
                      <span class="material-symbols-outlined text-[13px] fill">local_fire_department</span> ${habit.streak}d
                    </span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button 
                  data-toggle-habit="${habit.id}" 
                  class="habit-complete-action group relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-md cursor-pointer select-none transition-all duration-300 active:scale-90 ${buttonBg}"
                  aria-label="${isDone ? 'Mark habit incomplete' : 'Mark habit complete'}"
                >
                  ${isDone ? `
                    <!-- 21st.dev Animated Checkmark SVG -->
                    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-none stroke-white stroke-[2.75] stroke-linecap-round stroke-linejoin-round origin-center">
                      <path class="${isRecent ? 'animate-check-draw' : ''}" d="M4.5 12.5l5 5L19.5 7" ${!isRecent ? 'style="stroke-dasharray: 28; stroke-dashoffset: 0;"' : ''}></path>
                    </svg>

                    ${isRecent ? `
                      <!-- 21st.dev Ring Pulse Ripple -->
                      <span class="absolute -inset-1 rounded-2xl border-2 border-emerald-400 pointer-events-none animate-check-ring"></span>

                      <!-- 21st.dev Micro-particles explosion -->
                      <span class="absolute inset-0 pointer-events-none overflow-visible">
                        <span class="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none top-1/2 left-1/2 animate-check-particle" style="--dx: 22px; --dy: -20px;"></span>
                        <span class="absolute w-1.5 h-1.5 rounded-full bg-teal-300 pointer-events-none top-1/2 left-1/2 animate-check-particle" style="--dx: -22px; --dy: -18px;"></span>
                        <span class="absolute w-1.5 h-1.5 rounded-full bg-emerald-300 pointer-events-none top-1/2 left-1/2 animate-check-particle" style="--dx: 24px; --dy: 14px;"></span>
                        <span class="absolute w-1.5 h-1.5 rounded-full bg-emerald-400 pointer-events-none top-1/2 left-1/2 animate-check-particle" style="--dx: -22px; --dy: 16px;"></span>
                      </span>
                    ` : ''}
                  ` : `
                    <!-- Unchecked Outline Ring -->
                    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round transition-transform duration-200 group-hover:scale-110">
                      <circle cx="12" cy="12" r="8.5"></circle>
                    </svg>
                  `}
                </button>
                <button data-delete-habit="${habit.id}" title="Remove habit" class="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 transition-colors">
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Interactive Glass-by-Glass Water Logger Card -->
      <div class="bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-sm">
            <div class="w-10 h-10 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600">
              <span class="material-symbols-outlined text-[22px] fill">water_drop</span>
            </div>
            <div>
              <h4 class="font-label-lg font-bold text-[#101317] text-sm">Hydration Goal</h4>
              <span class="text-xs text-gray-500">${stats.water}L of ${stats.waterTarget}L (${glassesLogged}/${totalGlasses} glasses)</span>
            </div>
          </div>
          <div class="flex items-center gap-1.5">
            <button id="habits-water-dec-btn" class="w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 active:scale-90 transition-all">-</button>
            <button id="habits-water-inc-btn" class="px-3 py-1.5 rounded-full bg-blue-600 text-white font-label-md text-xs font-bold shadow-sm active:scale-95 transition-all flex items-center gap-1">
              <span>+ Glass</span>
            </button>
          </div>
        </div>

        <!-- 8 Visual Glasses Grid -->
        <div class="grid grid-cols-8 gap-1.5 pt-1">
          ${Array.from({ length: totalGlasses }).map((_, i) => {
            const filled = i < glassesLogged;
            return `
              <div data-glass-idx="${i}" class="water-glass-item h-10 rounded-xl flex flex-col justify-end p-1 transition-all cursor-pointer ${filled ? 'bg-blue-600 text-white shadow-xs' : 'bg-blue-50 text-blue-300 border border-blue-100'}">
                <span class="material-symbols-outlined text-[16px] mx-auto">${filled ? 'water_full' : 'local_drink'}</span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Functional Interactive Box Breathing Coach -->
      <div class="rounded-3xl p-unit-lg text-white shadow-lg border border-gray-800 bg-gradient-to-br from-[#101317] to-[#1e293b] flex flex-col gap-unit-md overflow-hidden relative">
        <div class="flex items-center justify-between z-10">
          <div class="flex items-center gap-unit-xs">
            <span class="material-symbols-outlined text-[20px] text-blue-400">air</span>
            <span class="font-label-lg font-extrabold text-sm uppercase tracking-wider">Box Breathing Guide</span>
          </div>
          <span class="text-xs text-white/70 font-semibold">${breathingCoach.cyclesCompleted} cycles completed</span>
        </div>

        <div class="flex flex-col items-center justify-center my-2 z-10">
          <div class="relative w-32 h-32 rounded-full flex items-center justify-center border-4 border-blue-500/30 ${breathingCoach.isActive ? 'animate-breath' : ''}">
            <div class="flex flex-col items-center justify-center text-center">
              <span class="font-headline-lg-mobile text-2xl font-extrabold text-white tracking-tight">${breathingCoach.phase}</span>
              <span class="text-3xl font-mono font-black text-blue-400 mt-0.5">${breathingCoach.secondsLeft}s</span>
            </div>
          </div>
          <span class="text-xs text-white/60 mt-3 font-medium text-center">Inhale (4s) • Hold (4s) • Exhale (4s) • Hold (4s)</span>
        </div>

        <div class="flex items-center gap-2 z-10">
          <button id="habits-breathing-toggle-btn" class="flex-1 h-11 rounded-full ${breathingCoach.isActive ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'} font-label-md text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[18px] fill">${breathingCoach.isActive ? 'pause' : 'play_arrow'}</span>
            <span>${breathingCoach.isActive ? 'Pause Exercise' : 'Start 4-4-4-4 Breath'}</span>
          </button>
          ${breathingCoach.isActive ? `
            <button id="habits-breathing-stop-btn" class="h-11 px-4 rounded-full bg-white/10 text-white font-label-md text-xs font-bold hover:bg-white/20 active:scale-95 transition-all">
              Reset
            </button>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

export function bindDailyHabitsEvents() {
  document.querySelectorAll('.habits-cat-btn').forEach(btn => {
    btn.onclick = () => {
      activeCategory = btn.getAttribute('data-cat') || 'all';
      store.notify();
    };
  });

  document.querySelectorAll('.habit-complete-action').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-toggle-habit');
      if (id) store.toggleHabit(id);
    };
  });

  document.querySelectorAll('.water-glass-item').forEach(glass => {
    glass.onclick = () => {
      const idx = Number(glass.getAttribute('data-glass-idx'));
      const targetLiters = +( (idx + 1) * 0.25 ).toFixed(2);
      store.state.stats.water = targetLiters;
      store.showToast(`Hydration: ${targetLiters}L logged`, 'success');
      store.notify();
    };
  });

  document.querySelectorAll('[data-delete-habit]').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-delete-habit');
      if (id && confirm('Are you sure you want to remove this habit from your routine?')) {
        store.deleteHabit(id);
      }
    };
  });

  const waterIncBtn = document.getElementById('habits-water-inc-btn');
  if (waterIncBtn) {
    waterIncBtn.onclick = () => store.logWater(0.25);
  }

  const waterDecBtn = document.getElementById('habits-water-dec-btn');
  if (waterDecBtn) {
    waterDecBtn.onclick = () => store.logWater(-0.25);
  }

  const openAddBtn = document.getElementById('habits-open-add-btn');
  if (openAddBtn) {
    openAddBtn.onclick = () => store.toggleAddHabit(true);
  }

  const cancelAddBtn = document.getElementById('habits-cancel-add-btn');
  if (cancelAddBtn) {
    cancelAddBtn.onclick = () => store.toggleAddHabit(false);
  }

  const submitNewBtn = document.getElementById('habits-submit-new-btn');
  if (submitNewBtn) {
    submitNewBtn.onclick = () => {
      const titleInput = document.getElementById('new-habit-title');
      const descInput = document.getElementById('new-habit-desc');
      const catInput = document.getElementById('new-habit-category');
      const timeInput = document.getElementById('new-habit-time');

      const name = titleInput ? titleInput.value.trim() : '';
      if (!name) {
        store.showToast('Please enter a habit title', 'error');
        return;
      }

      store.addHabit({
        name,
        desc: descInput ? descInput.value.trim() || 'Daily habit routine' : 'Daily habit routine',
        category: catInput ? catInput.value : 'morning',
        time: timeInput ? timeInput.value : '08:00 AM',
        color: catInput && catInput.value === 'evening' ? '#8B5CF6' : catInput && catInput.value === 'afternoon' ? '#FF5A36' : '#3B82F6'
      });
    };
  }

  const breathToggleBtn = document.getElementById('habits-breathing-toggle-btn');
  if (breathToggleBtn) {
    breathToggleBtn.onclick = () => {
      if (store.state.breathingCoach.isActive) {
        store.stopBreathing();
      } else {
        store.startBreathing();
      }
    };
  }

  const breathStopBtn = document.getElementById('habits-breathing-stop-btn');
  if (breathStopBtn) {
    breathStopBtn.onclick = () => {
      store.stopBreathing();
      store.state.breathingCoach.phase = 'Inhale';
      store.state.breathingCoach.secondsLeft = 4;
      store.notify();
    };
  }
}
