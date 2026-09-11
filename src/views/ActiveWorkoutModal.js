import { store } from '../state/store.js';

export function renderActiveWorkoutModal() {
  const { isWorkoutActive, activeWorkoutSession } = store.state;
  if (!isWorkoutActive) return '';

  const minutes = Math.floor(activeWorkoutSession.elapsed / 60);
  const seconds = activeWorkoutSession.elapsed % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const currentWeight = activeWorkoutSession.currentWeight !== undefined ? activeWorkoutSession.currentWeight : 85;
  const currentReps = activeWorkoutSession.currentReps !== undefined ? activeWorkoutSession.currentReps : 8;

  return `
    <div class="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-fade-in">
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
              <span class="font-label-md text-xs uppercase tracking-wider text-blue-600 font-bold">Session Telemetry</span>
              <h2 class="font-headline-md font-extrabold text-[#101317] leading-none truncate max-w-[200px]">${activeWorkoutSession.name}</h2>
            </div>
          </div>
          <button id="active-workout-end-btn" class="px-3.5 py-1.5 rounded-full bg-red-100 text-red-700 font-label-md text-xs font-bold hover:bg-red-200 active:scale-95 transition-all flex items-center gap-1">
            <span class="material-symbols-outlined text-[16px]">stop_circle</span>
            <span>Discard</span>
          </button>
        </div>

        <!-- Live Clock & Telemetry -->
        <div class="flex items-center justify-between bg-gray-50 p-3 rounded-2xl border border-gray-200">
          <div class="flex items-center gap-2.5">
            <span class="w-3 h-3 rounded-full ${activeWorkoutSession.isRunning ? 'bg-emerald-500 animate-ping' : 'bg-amber-400'}"></span>
            <div class="flex flex-col">
              <span class="font-stat-counter text-3xl font-extrabold text-[#101317] tracking-tight font-mono">${timeStr}</span>
              <span class="text-[10px] text-gray-500 uppercase font-bold tracking-wider">${activeWorkoutSession.isRunning ? 'Active Timer' : 'Timer Paused'}</span>
            </div>
          </div>
          <button id="active-workout-play-btn" class="w-12 h-12 rounded-full ${activeWorkoutSession.isRunning ? 'bg-amber-500' : 'bg-blue-600'} text-white flex items-center justify-center shadow-md active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[26px] fill">${activeWorkoutSession.isRunning ? 'pause' : 'play_arrow'}</span>
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
              <span class="text-xs text-gray-500 font-semibold">Target ${activeWorkoutSession.targetCalories} kcal</span>
            </div>
          </div>
        </div>

        <!-- Rest Countdown Alert (when resting) -->
        ${activeWorkoutSession.isResting ? `
          <div class="bg-blue-50 border border-blue-200 rounded-2xl p-3 flex items-center justify-between animate-fade-in">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[20px] animate-spin">hourglass_top</span>
              <div>
                <span class="text-xs font-bold text-blue-900 block">Rest Interval in Progress</span>
                <span class="text-base font-black font-mono text-blue-700">${activeWorkoutSession.restTimeRemaining}s remaining</span>
              </div>
            </div>
            <button id="active-workout-skip-rest-btn" class="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold active:scale-95 transition-all">
              Skip Rest
            </button>
          </div>
        ` : ''}

        <!-- Active Exercise Set Logger -->
        <div class="bg-white rounded-3xl p-unit-lg border border-gray-200 shadow-sm flex flex-col gap-unit-sm">
          <div class="flex items-center justify-between">
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-500 uppercase">Current Movement</span>
              <h3 class="font-headline-md font-bold text-[#101317]">${activeWorkoutSession.currentExercise}</h3>
            </div>
            <span class="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
              Set ${activeWorkoutSession.currentSet} of ${activeWorkoutSession.totalSets}
            </span>
          </div>

          <!-- Weight & Reps Steppers -->
          <div class="grid grid-cols-2 gap-unit-xs my-1">
            <!-- Weight Stepper -->
            <div class="bg-gray-50 p-2.5 rounded-2xl border border-gray-200 flex flex-col items-center">
              <span class="text-xs text-gray-500 font-semibold mb-1">Weight</span>
              <span class="text-xl font-extrabold text-[#101317] mb-1">${currentWeight} kg</span>
              <div class="flex items-center gap-2">
                <button id="active-workout-weight-minus-btn" class="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 active:scale-95 shadow-2xs">
                  -
                </button>
                <button id="active-workout-weight-plus-btn" class="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 active:scale-95 shadow-2xs">
                  +
                </button>
              </div>
            </div>

            <!-- Reps Stepper -->
            <div class="bg-gray-50 p-2.5 rounded-2xl border border-gray-200 flex flex-col items-center">
              <span class="text-xs text-gray-500 font-semibold mb-1">Reps</span>
              <span class="text-xl font-extrabold text-[#101317] mb-1">${currentReps} reps</span>
              <div class="flex items-center gap-2">
                <button id="active-workout-reps-minus-btn" class="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 active:scale-95 shadow-2xs">
                  -
                </button>
                <button id="active-workout-reps-plus-btn" class="w-8 h-8 rounded-full bg-white border border-gray-300 text-gray-700 font-bold flex items-center justify-center hover:bg-gray-100 active:scale-95 shadow-2xs">
                  +
                </button>
              </div>
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
    endBtn.onclick = () => {
      if (confirm('Are you sure you want to discard this workout session?')) {
        store.closeWorkout();
      }
    };
  }

  const playBtn = document.getElementById('active-workout-play-btn');
  if (playBtn) {
    playBtn.onclick = () => store.toggleWorkoutTimer();
  }

  // Weight steppers
  const weightMinus = document.getElementById('active-workout-weight-minus-btn');
  if (weightMinus) {
    weightMinus.onclick = () => store.adjustWorkoutSet(-2.5, 0);
  }

  const weightPlus = document.getElementById('active-workout-weight-plus-btn');
  if (weightPlus) {
    weightPlus.onclick = () => store.adjustWorkoutSet(2.5, 0);
  }

  // Reps steppers
  const repsMinus = document.getElementById('active-workout-reps-minus-btn');
  if (repsMinus) {
    repsMinus.onclick = () => store.adjustWorkoutSet(0, -1);
  }

  const repsPlus = document.getElementById('active-workout-reps-plus-btn');
  if (repsPlus) {
    repsPlus.onclick = () => store.adjustWorkoutSet(0, 1);
  }

  // Log set
  const logSetBtn = document.getElementById('active-workout-log-set-btn');
  if (logSetBtn) {
    logSetBtn.onclick = () => store.logWorkoutSet();
  }

  // Skip rest
  const skipRestBtn = document.getElementById('active-workout-skip-rest-btn');
  if (skipRestBtn) {
    skipRestBtn.onclick = () => {
      store.state.activeWorkoutSession.isResting = false;
      store.state.activeWorkoutSession.restTimeRemaining = 0;
      store.notify();
    };
  }

  // Complete workout
  const finishBtn = document.getElementById('active-workout-finish-btn');
  if (finishBtn) {
    finishBtn.onclick = () => store.completeWorkout();
  }
}
