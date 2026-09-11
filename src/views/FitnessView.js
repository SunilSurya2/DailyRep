import { store } from '../state/store.js';

let selectedCategory = 'all';
let exercises = [
  { id: 'e1', name: 'Barbell Deadlift', details: '4 sets × 8 reps @ 85kg', done: true, cat: 'strength' },
  { id: 'e2', name: 'Dumbbell Incline Press', details: '3 sets × 12 reps @ 24kg', done: false, cat: 'strength' },
  { id: 'e3', name: 'Plank to Push-up', details: '3 sets × 45 sec interval', done: false, cat: 'mobility' },
  { id: 'e4', name: 'Sprint Interval Repeats', details: '6 rounds × 30s sprint / 30s rest', done: false, cat: 'hiit' }
];

export function renderFitnessView() {
  const completedCount = exercises.filter(e => e.done).length;

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'strength', label: 'Strength' },
    { id: 'hiit', label: 'HIIT' },
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
            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface';
          return `
            <button data-cat="${c.id}" class="fitness-filter-btn px-unit-lg py-unit-xs rounded-full font-label-lg text-label-lg transition-all font-semibold whitespace-nowrap ${cls}">
              ${c.label}
            </button>
          `;
        }).join('')}
      </section>

      <!-- Weekly Target Summary Banner -->
      <section class="bg-surface-container-lowest rounded-2xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span class="material-symbols-outlined text-[18px] fill">bolt</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Weekly Target</span>
              <span class="font-headline-md text-headline-md text-on-surface font-bold">4 of 5 workouts logged</span>
            </div>
          </div>
          <span class="font-label-lg text-label-lg text-blue-600 font-bold bg-blue-50 px-unit-xs py-unit-2xs rounded-full">80% Done</span>
        </div>
        
        <div class="flex flex-col gap-unit-2xs mt-unit-2xs">
          <div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden flex">
            <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: 80%;"></div>
          </div>
          <div class="flex justify-between text-on-surface-variant font-label-md text-label-md pt-unit-2xs font-semibold">
            <span class="text-blue-600">Mon ✓</span>
            <span class="text-blue-600">Tue ✓</span>
            <span class="text-blue-600">Wed ✓</span>
            <span class="text-blue-600">Fri ✓</span>
            <span class="text-on-surface-variant/50">Sun ○</span>
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
            <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Today's Session Plan</h3>
          </div>
          <span class="bg-surface-container text-on-surface-variant font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full font-semibold">
            ${completedCount} of ${exercises.length} Done
          </span>
        </div>

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
                  <div class="w-6 h-6 rounded-full flex items-center justify-center">
                    <span class="material-symbols-outlined text-[22px] ${iconColor}">${icon}</span>
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="font-body-md text-body-md font-semibold text-on-surface truncate ${textStyle}">${ex.name}</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant truncate">${ex.details}</span>
                  </div>
                </div>
                <span class="font-label-md text-xs px-2 py-0.5 rounded-full bg-white/70 text-gray-600 border border-gray-100 uppercase">${ex.cat}</span>
              </div>
            `;
          }).join('')}
        </div>

        <button id="fitness-start-session-btn" class="w-full py-unit-sm rounded-2xl bg-blue-600 text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-unit-xs shadow-md shadow-blue-500/20 hover:opacity-95 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[18px]">play_circle</span> Start Live Workout Session
        </button>
      </section>

      <!-- Recent Activity Logs Section -->
      <section class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Recent History</h3>
          <span class="font-label-md text-label-md text-blue-600 font-semibold cursor-pointer">View All</span>
        </div>
        
        <div class="flex flex-col divide-y divide-surface-container-high/40">
          <div class="py-unit-sm flex items-center justify-between">
            <div class="flex items-center gap-unit-sm">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                <span class="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-lg font-bold text-on-surface">Upper Body Power</span>
                <span class="font-body-sm text-xs text-on-surface-variant">Yesterday • 52 mins</span>
              </div>
            </div>
            <div class="text-right">
              <div class="font-label-lg font-bold text-on-surface">480 kcal</div>
              <span class="font-label-md text-xs text-emerald-600 font-semibold">Peak HR 164</span>
            </div>
          </div>
          
          <div class="py-unit-sm flex items-center justify-between">
            <div class="flex items-center gap-unit-sm">
              <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <span class="material-symbols-outlined text-[20px]">self_improvement</span>
              </div>
              <div class="flex flex-col">
                <span class="font-label-lg font-bold text-on-surface">Morning Kinetic Flow</span>
                <span class="font-body-sm text-xs text-on-surface-variant">2 days ago • 30 mins</span>
              </div>
            </div>
            <div class="text-right">
              <div class="font-label-lg font-bold text-on-surface">210 kcal</div>
              <span class="font-label-md text-xs text-emerald-600 font-semibold">Avg HR 118</span>
            </div>
          </div>
        </div>
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
    item.onclick = () => {
      const id = item.getAttribute('data-exercise-id');
      const ex = exercises.find(e => e.id === id);
      if (ex) {
        ex.done = !ex.done;
        store.notify();
      }
    };
  });

  const playFeatured = document.getElementById('fitness-play-featured-btn');
  if (playFeatured) {
    playFeatured.onclick = () => store.openWorkout('Full-Body Dynamic Hypertrophy');
  }

  const startSession = document.getElementById('fitness-start-session-btn');
  if (startSession) {
    startSession.onclick = () => store.openWorkout("Today's Session Plan");
  }
}
