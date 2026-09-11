import { store } from '../state/store.js';

let activeRange = 'Week';
let selectedDay = {
  day: 'Thursday',
  cal: '680 kcal burned • 92 min',
  pct: '100%',
  target: 'Target met'
};

const weekDays = [
  { day: 'Monday', cal: '480 kcal • 50 min', pct: '78%', height: 55, y: 65, active: false },
  { day: 'Tuesday', cal: '540 kcal • 62 min', pct: '85%', height: 70, y: 50, active: false },
  { day: 'Wednesday', cal: '510 kcal • 55 min', pct: '82%', height: 60, y: 60, active: false },
  { day: 'Thursday', cal: '680 kcal burned • 92 min', pct: '100%', height: 95, y: 25, active: true },
  { day: 'Friday', cal: '620 kcal • 75 min', pct: '94%', height: 80, y: 40, active: false },
  { day: 'Saturday', cal: '710 kcal • 88 min', pct: '100%', height: 90, y: 30, active: false },
  { day: 'Sunday', cal: '490 kcal • 45 min', pct: '80%', height: 65, y: 55, active: false }
];

export function renderProgressView() {
  const ranges = ['Week', 'Month', '3 Mo', 'Year'];

  return `
    <div class="flex flex-col w-full gap-unit-md pb-unit-3xl pt-2">
      <!-- Segmented Time Period Filter -->
      <div class="w-full bg-white rounded-full p-1 flex items-center justify-between border border-gray-200 shadow-xs">
        ${ranges.map(r => {
          const isActive = activeRange === r;
          const cls = isActive 
            ? 'bg-blue-600 text-white font-bold shadow-sm' 
            : 'text-gray-500 font-semibold hover:text-gray-900';
          return `
            <button data-range="${r}" class="progress-range-btn flex-1 py-unit-2xs text-center rounded-full font-label-md text-label-md transition-all">
              ${r}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Hero High-Performance Score Card -->
      <section class="relative overflow-hidden bg-white rounded-3xl p-unit-lg shadow-sm border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-unit-2xs">
            <span class="font-label-md text-label-md uppercase tracking-wider text-gray-500 font-bold text-[11px]">DailyRep Metric Core</span>
            <div class="flex items-baseline gap-unit-2xs">
              <span class="font-stat-counter text-stat-counter font-extrabold tracking-tight text-[#101317]">92</span>
              <span class="font-headline-md text-headline-md text-[#AAB2BD]">/100</span>
            </div>
          </div>
          <div class="flex items-center gap-1 px-unit-sm py-unit-2xs rounded-full font-label-md text-xs bg-blue-50 text-blue-600 font-bold">
            <span class="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+4% vs last week</span>
          </div>
        </div>
        <p class="font-body-sm text-body-sm mt-unit-2xs text-gray-600">Exceptional pacing. Your highest holistic execution score since joining.</p>
        
        <div class="grid grid-cols-3 gap-unit-xs mt-unit-md">
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Workouts</span>
              <span class="material-symbols-outlined text-[16px] text-blue-600">bolt</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">96%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-blue-600" style="width: 96%;"></div>
            </div>
          </div>
          
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Habits</span>
              <span class="material-symbols-outlined text-[16px] text-gray-800">check_circle</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">89%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-gray-800" style="width: 89%;"></div>
            </div>
          </div>
          
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Recovery</span>
              <span class="material-symbols-outlined text-[16px] text-gray-400">bedtime</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">91%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-gray-400" style="width: 91%;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Telemetry Chart Section -->
      <section class="bg-white rounded-3xl p-unit-lg shadow-sm border border-gray-200 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-headline-md text-headline-md text-[#101317] font-bold">Weekly Output</h2>
            <span class="font-body-sm text-body-sm text-gray-500">Volume • Caloric Burn • Rate</span>
          </div>
          <div class="flex items-center gap-unit-xs">
            <span class="flex items-center gap-1 font-label-md text-xs text-gray-700">
              <span class="w-2.5 h-2.5 rounded-full inline-block bg-blue-600"></span> Burn
            </span>
            <span class="flex items-center gap-1 font-label-md text-xs text-gray-700">
              <span class="w-2.5 h-2.5 rounded-full inline-block bg-gray-400"></span> Goal %
            </span>
          </div>
        </div>

        <div class="rounded-2xl p-unit-sm flex items-center justify-between transition-all bg-gray-50 border border-gray-200">
          <div class="flex items-center gap-unit-sm">
            <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
              <span class="material-symbols-outlined text-[20px]">local_fire_department</span>
            </div>
            <div>
              <span class="font-label-lg text-sm block leading-tight text-[#101317] font-bold">${selectedDay.day}</span>
              <span class="font-body-sm text-xs text-gray-600">${selectedDay.cal}</span>
            </div>
          </div>
          <div class="text-right">
            <span class="font-headline-md text-headline-md font-bold text-blue-600">${selectedDay.pct}</span>
            <span class="font-label-md text-xs text-gray-500 block">${selectedDay.target}</span>
          </div>
        </div>

        <div class="w-full relative pt-unit-xs select-none">
          <svg class="w-full h-44 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 160">
            <line stroke="#E2E8F0" stroke-dasharray="3 3" stroke-width="0.8" x1="0" x2="320" y1="20" y2="20"></line>
            <line stroke="#E2E8F0" stroke-dasharray="3 3" stroke-width="0.8" x1="0" x2="320" y1="70" y2="70"></line>
            <line stroke="#E2E8F0" stroke-width="0.8" x1="0" x2="320" y1="120" y2="120"></line>
            <defs>
              <linearGradient id="splineGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.3"></stop>
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0.0"></stop>
              </linearGradient>
            </defs>
            <path d="M 20 95 C 45 90, 45 75, 65 70 C 90 65, 90 100, 110 80 C 135 60, 135 30, 155 35 C 180 40, 180 50, 200 45 C 225 40, 225 25, 245 28 C 270 30, 270 65, 295 50 L 295 120 L 20 120 Z" fill="url(#splineGradient)"></path>
            <path d="M 20 95 C 45 90, 45 75, 65 70 C 90 65, 90 100, 110 80 C 135 60, 135 30, 155 35 C 180 40, 180 50, 200 45 C 225 40, 225 25, 245 28 C 270 30, 270 65, 295 50" fill="none" stroke="#3B82F6" stroke-linecap="round" stroke-width="2.5"></path>

            ${weekDays.map((w, idx) => {
              const xPos = 13 + (idx * 45);
              const isSel = selectedDay.day === w.day;
              const fill = isSel ? '#3B82F6' : '#CBD5E1';
              return `
                <rect data-day-index="${idx}" class="progress-bar-rect cursor-pointer transition-colors" fill="${fill}" height="${w.height}" rx="7" width="14" x="${xPos}" y="${w.y}"></rect>
              `;
            }).join('')}

            <circle cx="155" cy="35" fill="#FFFFFF" r="4.5" stroke="#3B82F6" stroke-width="2.5"></circle>

            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="20" y="145">M</text>
            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="65" y="145">T</text>
            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="110" y="145">W</text>
            <text fill="#3B82F6" font-size="10" font-weight="700" text-anchor="middle" x="155" y="145">T</text>
            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="200" y="145">F</text>
            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="245" y="145">S</text>
            <text fill="#64748B" font-size="10" font-weight="600" text-anchor="middle" x="295" y="145">S</text>
          </svg>
        </div>
      </section>

      <!-- Habit Mastery & Streak Milestones -->
      <section class="flex flex-col gap-unit-xs">
        <div class="flex items-center justify-between px-unit-2xs">
          <h3 class="font-headline-md text-headline-md text-[#101317] font-bold">Milestones</h3>
          <span class="font-label-md text-sm font-semibold flex items-center gap-1 cursor-pointer text-blue-600">
            View All <span class="material-symbols-outlined text-[16px]">chevron_right</span>
          </span>
        </div>

        <div class="grid grid-cols-1 gap-unit-xs">
          <div class="rounded-3xl p-unit-md shadow-sm bg-white border border-gray-200 flex items-center gap-unit-md">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-50 text-blue-600">
              <span class="material-symbols-outlined text-[24px]">workspace_premium</span>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-unit-2xs">
                <span class="font-label-lg font-bold text-[#101317]">21-Day Habit Mastery</span>
                <span class="material-symbols-outlined text-[16px] text-blue-600">verified</span>
              </div>
              <p class="font-body-sm text-xs text-gray-500 truncate">Full adherence across morning mindfulness and hydration routines.</p>
            </div>
            <span class="font-label-md text-xs px-2.5 py-1 rounded-full font-bold bg-blue-50 text-blue-600">Unlocked</span>
          </div>

          <div class="rounded-3xl p-unit-md shadow-sm bg-white border border-gray-200 flex items-center gap-unit-md">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-gray-100 text-gray-800">
              <span class="material-symbols-outlined text-[24px]">directions_run</span>
            </div>
            <div class="flex-1 min-w-0">
              <span class="font-label-lg font-bold text-[#101317]">100k Steps Club</span>
              <p class="font-body-sm text-xs text-gray-500 truncate">Completed 104,210 total strides in 7 consecutive days.</p>
            </div>
            <span class="font-label-md text-xs px-2.5 py-1 rounded-full font-bold bg-gray-100 text-gray-800">Top 5%</span>
          </div>
        </div>
      </section>

      <!-- Biometrics & Vitality -->
      <section class="flex flex-col gap-unit-xs">
        <h3 class="font-headline-md text-headline-md px-unit-2xs text-[#101317] font-bold">Biometrics & Vitality</h3>
        <div class="grid grid-cols-2 gap-unit-xs">
          <div class="rounded-3xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs font-bold text-gray-500 uppercase">Weight Delta</span>
              <span class="material-symbols-outlined text-[18px] text-gray-500">monitor_weight</span>
            </div>
            <div class="my-unit-xs">
              <div class="font-headline-lg-mobile font-extrabold text-[#101317]">-1.2 <span class="text-body-md font-normal text-gray-500">kg</span></div>
              <span class="font-body-sm text-xs font-semibold text-gray-700 flex items-center gap-0.5">
                <span class="material-symbols-outlined text-[14px]">south</span> Target zone
              </span>
            </div>
          </div>
          
          <div class="rounded-3xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs font-bold text-gray-500 uppercase">Resting HR</span>
              <span class="material-symbols-outlined text-[18px] text-blue-600">favorite</span>
            </div>
            <div class="my-unit-xs">
              <div class="font-headline-lg-mobile font-extrabold text-[#101317]">60 <span class="text-body-md font-normal text-gray-500">bpm</span></div>
              <span class="font-body-sm text-xs text-gray-500">Down 4 bpm this week</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Export Report CTA -->
      <div class="pt-unit-xs flex flex-col gap-unit-xs">
        <button class="w-full h-[52px] bg-blue-600 text-white rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-unit-xs shadow-lg shadow-blue-500/30 active:scale-98 transition-all">
          <span class="material-symbols-outlined text-[20px]">ios_share</span>
          <span>Export Executive Performance Report</span>
        </button>
        <div class="flex items-center justify-center gap-1 text-gray-500">
          <span class="material-symbols-outlined text-[14px]">lock</span>
          <span class="font-label-md text-xs">Biometric reports are locally encrypted • PDF / Apple Health</span>
        </div>
      </div>
    </div>
  `;
}

export function bindProgressEvents() {
  document.querySelectorAll('.progress-range-btn').forEach(btn => {
    btn.onclick = () => {
      activeRange = btn.getAttribute('data-range') || 'Week';
      store.notify();
    };
  });

  document.querySelectorAll('.progress-bar-rect').forEach(rect => {
    rect.onclick = () => {
      const idx = parseInt(rect.getAttribute('data-day-index'), 10);
      const d = weekDays[idx];
      if (d) {
        selectedDay = {
          day: d.day,
          cal: d.cal,
          pct: d.pct,
          target: d.pct === '100%' ? 'Target met' : 'Under target'
        };
        store.notify();
      }
    };
  });
}
