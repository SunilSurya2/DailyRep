import { store } from '../state/store.js';

export function renderActiveWorkoutModal() {
  const { isWorkoutActive, activeWorkoutSession } = store.state;
  if (!isWorkoutActive) return '';

  const minutes = Math.floor(activeWorkoutSession.elapsed / 60);
  const seconds = activeWorkoutSession.elapsed % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return `
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-fade-in">
      <div class="bg-surface-container-lowest rounded-t-[32px] p-unit-lg shadow-2xl border-t border-gray-200 flex flex-col gap-unit-md max-h-[92vh] overflow-y-auto">
        <!-- Modal Drag Bar -->
        <div class="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 mb-1"></div>

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <button id="active-workout-close-btn" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-90 transition-all">
              <span class="material-symbols-outlined text-[20px]">expand_more</span>
            </button>
            <div class="flex flex-col">
              <span class="font-label-md text-xs uppercase tracking-wider text-blue-600 font-bold">Session Active</span>
              <h2 class="font-headline-md font-extrabold text-[#101317] leading-none truncate max-w-[200px]">${activeWorkoutSession.name}</h2>
            </div>
          </div>
          <button id="active-workout-end-btn" class="px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 font-label-md text-xs font-bold hover:bg-red-200 active:scale-95 transition-all flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">stop_circle</span>
            <span>End</span>
          </button>
        </div>

        <!-- Live Clock & Telemetry -->
        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
            <span class="font-stat-counter text-3xl font-extrabold text-[#101317] tracking-tight font-mono">${timeStr}</span>
            <span class="text-xs text-gray-500 uppercase font-semibold">Elapsed</span>
          </div>
          <button id="active-workout-play-btn" class="w-11 h-11 rounded-full ${activeWorkoutSession.isRunning ? 'bg-amber-500' : 'bg-blue-600'} text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[24px] fill">${activeWorkoutSession.isRunning ? 'pause' : 'play_arrow'}</span>
          </button>
        </div>

        <!-- Heart Rate & Calories Grid -->
        <div class="grid grid-cols-2 gap-unit-xs">
          <div class="rounded-2xl p-unit-md bg-white border border-gray-200 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs uppercase text-gray-500 font-bold">Heart Rate</span>
              <span class="w-7 h-7 rounded-full flex items-center justify-center bg-red-50 text-red-500">
                <span class="material-symbols-outlined text-[16px] fill">favorite</span>
              </span>
            </div>
            <div class="mt-2">
              <div class="font-headline-lg-mobile font-extrabold text-[#101317]">${activeWorkoutSession.currentHr} <span class="text-xs text-gray-500 font-normal">bpm</span></div>
              <span class="text-xs font-semibold text-emerald-600">Zone 3 • Aerobic</span>
            </div>
          </div>

          <div class="rounded-2xl p-unit-md bg-white border border-gray-200 shadow-xs flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs uppercase text-gray-500 font-bold">Energy Burn</span>
              <span class="w-7 h-7 rounded-full flex items-center justify-center bg-orange-50 text-orange-500">
                <span class="material-symbols-outlined text-[16px] fill">local_fire_department</span>
              </span>
            </div>
            <div class="mt-2">
              <div class="font-headline-lg-mobile font-extrabold text-[#101317]">${Math.round(activeWorkoutSession.calories)} <span class="text-xs text-gray-500 font-normal">kcal</span></div>
              <span class="text-xs text-gray-500">Target ${activeWorkoutSession.targetCalories} kcal</span>
            </div>
          </div>
        </div>

        <!-- Active Exercise Set Logger -->
        <div class="bg-white rounded-3xl p-unit-lg border border-gray-200 shadow-sm flex flex-col gap-unit-sm">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-500 uppercase">Current Movement</span>
              <h3 class="font-headline-md font-bold text-[#101317]">${activeWorkoutSession.currentExercise}</h3>
            </div>
            <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
              Set ${activeWorkoutSession.currentSet} of ${activeWorkoutSession.totalSets}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-unit-xs my-1">
            <div class="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-center">
              <span class="text-xs text-gray-500 block">Weight</span>
              <span class="text-xl font-extrabold text-[#101317]">85 kg</span>
            </div>
            <div class="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-center">
              <span class="text-xs text-gray-500 block">Reps</span>
              <span class="text-xl font-extrabold text-[#101317]">8 reps</span>
            </div>
          </div>

          <button id="active-workout-log-set-btn" class="w-full h-12 rounded-full bg-blue-600 text-white font-label-lg font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[20px]">check</span>
            <span>Log Set & Rest 60s</span>
          </button>
        </div>

        <!-- Finish Session Button -->
        <button id="active-workout-finish-btn" class="w-full h-12 rounded-full bg-emerald-600 text-white font-label-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 active:scale-95 transition-all">
          <span class="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Complete & Save Session</span>
        </button>
      </div>
    </div>
  `;
}

export function bindActiveWorkoutEvents() {
  const closeBtn = document.getElementById('active-workout-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => store.closeWorkout();
  }

  const endBtn = document.getElementById('active-workout-end-btn');
  if (endBtn) {
    endBtn.onclick = () => store.closeWorkout();
  }

  const playBtn = document.getElementById('active-workout-play-btn');
  if (playBtn) {
    playBtn.onclick = () => store.toggleWorkoutTimer();
  }

  const logSetBtn = document.getElementById('active-workout-log-set-btn');
  if (logSetBtn) {
    logSetBtn.onclick = () => {
      const { activeWorkoutSession } = store.state;
      if (activeWorkoutSession.currentSet < activeWorkoutSession.totalSets) {
        activeWorkoutSession.currentSet += 1;
        activeWorkoutSession.calories += 25;
        store.notify();
      } else {
        alert('All sets completed for this exercise! Moving to next.');
      }
    };
  }

  const finishBtn = document.getElementById('active-workout-finish-btn');
  if (finishBtn) {
    finishBtn.onclick = () => store.completeWorkout();
  }
}
