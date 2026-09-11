import { store } from '../state/store.js';

let selectedCategory = 'all';
let isAddExerciseOpen = false;

export function renderFitnessView() {
  const { exercises } = store.state;
  const completedCount = exercises.filter(e => e.done).length;
  const targetPct = exercises.length > 0 ? Math.round((completedCount / exercises.length) * 100) : 0;

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'strength', label: 'Strength' },
    { id: 'hiit', label: 'HIIT Cardio' },
    { id: 'recovery', label: 'Recovery' },
    { id: 'mobility', label: 'Mobility' }
  ];

  const filteredExercises = selectedCategory === 'all'
    ? exercises
    : exercises.filter(e => e.cat === selectedCategory);

  return `
    <div class="flex flex-col w-full gap-unit-lg pb-unit-3xl pt-2">
      <!-- Interactive Category Filter Bar -->
      <section class="flex items-center gap-unit-xs overflow-x-auto no-scrollbar -mx-margin-mobile px-margin-mobile py-unit-2xs">
        ${categories.map(c => {
          const isActive = selectedCategory === c.id;
          const cls = isActive 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';
          return `
            <button data-cat="${c.id}" class="fitness-filter-btn px-unit-lg py-unit-xs rounded-full font-label-lg text-label-lg transition-all font-semibold whitespace-nowrap active:scale-95 ${cls}">
              ${c.label}
            </button>
          `;
        }).join('')}
      </section>

      <!-- Weekly Target Summary Banner -->
      <section class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span class="material-symbols-outlined text-[18px] fill">bolt</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Daily Routine Progress</span>
              <span class="font-headline-md text-headline-md text-on-surface font-bold">${completedCount} of ${exercises.length} logged</span>
            </div>
          </div>
          <span class="font-label-lg text-label-lg text-blue-600 font-bold bg-blue-50 px-unit-xs py-unit-2xs rounded-full">
            ${targetPct}% Done
          </span>
        </div>
        
        <div class="flex flex-col gap-unit-2xs mt-unit-2xs">
          <div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden flex">
            <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: ${targetPct}%;"></div>
          </div>
          <div class="flex justify-between text-on-surface-variant font-label-md text-xs pt-unit-2xs font-semibold">
            <span class="${targetPct >= 20 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Warmup</span>
            <span class="${targetPct >= 50 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Compound</span>
            <span class="${targetPct >= 75 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Metabolic</span>
            <span class="${targetPct >= 100 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Cooldown 🎯</span>
          </div>
        </div>
      </section>

      <!-- Featured Workout Hero Card -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101317] via-[#1a202c] to-[#101317] text-white shadow-xl flex flex-col justify-between min-h-[260px] p-unit-lg border border-gray-800">
        <div class="absolute -top-10 -right-10 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex items-start justify-between gap-unit-sm">
          <div class="flex flex-wrap gap-unit-2xs">
            <span class="bg-blue-600 text-white font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full font-bold uppercase tracking-wider flex items-center gap-1 text-[10px]">
              <span class="material-symbols-outlined text-[14px]">local_fire_department</span> Featured
            </span>
            <span class="bg-white/10 backdrop-blur-md text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full font-medium text-[11px]">
              Intermediate
            </span>
          </div>
          <button id="fitness-play-featured-btn" aria-label="Start Workout" class="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[26px] fill">play_arrow</span>
          </button>
        </div>

        <div class="relative z-10 flex flex-col gap-unit-xs my-unit-sm">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-white font-bold tracking-tight">
            Full-Body Dynamic Hypertrophy
          </h2>
          <div class="flex items-center gap-unit-md text-white/80 font-body-sm text-body-sm">
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">timer</span> 45 min
            </span>
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">local_fire_department</span> 420 kcal
            </span>
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">fitness_center</span> 12 Sets
            </span>
          </div>
        </div>

        <div class="relative z-10 flex items-center gap-unit-xs pt-unit-xs">
          <span class="text-white/70 font-label-md text-label-md text-[11px]">Targets:</span>
          <div class="flex items-center gap-unit-2xs">
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Legs</span>
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Core</span>
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Shoulders</span>
          </div>
        </div>
      </section>

      <!-- Today's Workout Routine List -->
      <section class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-md">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Active Routine</span>
            <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Today's Session Movements</h3>
          </div>
          <button id="fitness-toggle-add-btn" class="flex items-center gap-1 font-label-md text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-bold hover:bg-blue-100 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Movement</span>
          </button>
        </div>

        <!-- Add Exercise Inline Panel -->
        ${isAddExerciseOpen ? `
          <div class="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex flex-col gap-3 animate-fade-in">
            <div class="flex items-center justify-between">
              <span class="font-label-lg font-bold text-blue-900 text-sm">New Movement</span>
              <button id="fitness-cancel-add-btn" class="text-xs text-gray-500 font-bold hover:text-gray-800">Cancel</button>
            </div>
            <input id="new-exercise-name" type="text" placeholder="Movement name (e.g. Bulgarian Split Squat)" class="w-full px-3.5 py-2 rounded-xl bg-white border border-gray-200 font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="text-[10px] text-gray-500 font-bold uppercase block mb-1">Sets</label>
                <input id="new-exercise-sets" type="number" value="3" min="1" max="10" class="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-body-sm text-sm" />
              </div>
              <div>
                <label class="text-[10px] text-gray-500 font-bold uppercase block mb-1">Reps</label>
                <input id="new-exercise-reps" type="number" value="10" min="1" max="100" class="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-body-sm text-sm" />
              </div>
              <div>
                <label class="text-[10px] text-gray-500 font-bold uppercase block mb-1">Weight (kg)</label>
                <input id="new-exercise-weight" type="number" value="20" min="0" max="500" class="w-full px-3 py-1.5 rounded-xl bg-white border border-gray-200 font-body-sm text-sm" />
              </div>
            </div>
            <button id="fitness-save-exercise-btn" class="w-full h-10 rounded-xl bg-blue-600 text-white font-label-md text-xs font-bold shadow-md active:scale-95 transition-all">
              Save Movement
            </button>
          </div>
        ` : ''}

        <div class="flex flex-col gap-unit-xs" id="exerciseLogList">
          ${filteredExercises.map(ex => {
            const isDone = ex.done;
            const cardBg = isDone ? 'bg-blue-50/50 border-blue-200' : 'bg-surface-container-low border-surface-container-high/40 hover:bg-surface-container/60';
            const textStyle = isDone ? 'line-through opacity-70' : '';
            const icon = isDone ? 'task_alt' : 'radio_button_unchecked';
            const iconColor = isDone ? 'text-blue-600' : 'text-on-surface-variant/40';

            return `
              <div data-exercise-id="${ex.id}" class="exercise-item group flex items-center justify-between p-unit-md rounded-2xl border transition-all cursor-pointer ${cardBg}">
                <div class="flex items-center gap-unit-sm min-w-0">
                  <div class="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-surface-container-high/60 group-hover:scale-105 transition-transform">
                    <span class="material-symbols-outlined text-[20px] ${iconColor}">${icon}</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-lg text-label-lg font-bold text-on-surface truncate ${textStyle}">
                      ${ex.name}
                    </span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      ${ex.details}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button data-exercise-start="${ex.id}" class="exercise-quick-start w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[16px] fill">play_arrow</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button id="fitness-start-session-btn" class="w-full h-12 rounded-full bg-blue-600 text-white font-label-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all mt-unit-xs">
          <span class="material-symbols-outlined text-[20px]">fitness_center</span>
          <span>Launch Full Interactive Session</span>
        </button>
      </section>
    </div>
  `;
}

export function bindFitnessEvents() {
  document.querySelectorAll('.fitness-filter-btn').forEach(btn => {
    btn.onclick = () => {
      selectedCategory = btn.getAttribute('data-cat') || 'all';
      store.notify();
    };
  });

  document.querySelectorAll('.exercise-item').forEach(item => {
    item.onclick = (e) => {
      if (e.target.closest('.exercise-quick-start')) return;
      const id = item.getAttribute('data-exercise-id');
      if (id) store.toggleExercise(id);
    };
  });

  document.querySelectorAll('.exercise-quick-start').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-exercise-start');
      const ex = store.state.exercises.find(x => x.id === id);
      if (ex) {
        store.openWorkout(ex.name, 180, ex.name);
      }
    };
  });

  const playFeatured = document.getElementById('fitness-play-featured-btn');
  if (playFeatured) {
    playFeatured.onclick = () => store.openWorkout('Full-Body Dynamic Hypertrophy', 420, 'Barbell Deadlift');
  }

  const startSession = document.getElementById('fitness-start-session-btn');
  if (startSession) {
    startSession.onclick = () => store.openWorkout("Today's Session Plan", 350, 'Barbell Deadlift');
  }

  const toggleAddBtn = document.getElementById('fitness-toggle-add-btn');
  if (toggleAddBtn) {
    toggleAddBtn.onclick = () => {
      isAddExerciseOpen = !isAddExerciseOpen;
      store.notify();
    };
  }

  const cancelAddBtn = document.getElementById('fitness-cancel-add-btn');
  if (cancelAddBtn) {
    cancelAddBtn.onclick = () => {
      isAddExerciseOpen = false;
      store.notify();
    };
  }

  const saveExBtn = document.getElementById('fitness-save-exercise-btn');
  if (saveExBtn) {
    saveExBtn.onclick = () => {
      const nameInput = document.getElementById('new-exercise-name');
      const setsInput = document.getElementById('new-exercise-sets');
      const repsInput = document.getElementById('new-exercise-reps');
      const weightInput = document.getElementById('new-exercise-weight');

      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        store.showToast('Please enter a movement name', 'error');
        return;
      }

      store.addExercise({
        name,
        sets: setsInput ? Number(setsInput.value) : 3,
        reps: repsInput ? Number(repsInput.value) : 10,
        weight: weightInput ? Number(weightInput.value) : 0,
        cat: selectedCategory !== 'all' ? selectedCategory : 'strength'
      });

      isAddExerciseOpen = false;
    };
  }
}
