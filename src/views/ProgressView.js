import { store } from '../state/store.js';

let activeRange = 'Week';

const rangeTelemetry = {
  Week: {
    score: 92,
    scoreChange: '+4% vs last week',
    workoutsPct: 96,
    habitsPct: 89,
    recoveryPct: 91,
    summary: 'Exceptional pacing. Your highest holistic execution score this month.'
  },
  Month: {
    score: 88,
    scoreChange: '+8% vs last month',
    workoutsPct: 91,
    habitsPct: 84,
    recoveryPct: 87,
    summary: 'Consistent 4-week progression. 22 total training sessions completed.'
  },
  '3 Mo': {
    score: 85,
    scoreChange: '+14% quarterly',
    workoutsPct: 86,
    habitsPct: 82,
    recoveryPct: 85,
    summary: 'Long-term endurance adaptations firmly locked in across 90 days.'
  },
  Year: {
    score: 90,
    scoreChange: 'Peak Year Record',
    workoutsPct: 88,
    habitsPct: 86,
    recoveryPct: 89,
    summary: 'Over 340 active days logged. You are in the top 3% of athletes globally.'
  }
};

let weekDays = [
  { day: 'Mon', fullDay: 'Monday', cal: '480 kcal', min: '50 min', pct: '78%', height: 55, active: false },
  { day: 'Tue', fullDay: 'Tuesday', cal: '540 kcal', min: '62 min', pct: '85%', height: 70, active: false },
  { day: 'Wed', fullDay: 'Wednesday', cal: '510 kcal', min: '55 min', pct: '82%', height: 60, active: false },
  { day: 'Thu', fullDay: 'Thursday', cal: '680 kcal', min: '92 min', pct: '100%', height: 95, active: true },
  { day: 'Fri', fullDay: 'Friday', cal: '620 kcal', min: '75 min', pct: '94%', height: 80, active: false },
  { day: 'Sat', fullDay: 'Saturday', cal: '710 kcal', min: '88 min', pct: '100%', height: 90, active: false },
  { day: 'Sun', fullDay: 'Sunday', cal: '490 kcal', min: '45 min', pct: '80%', height: 65, active: false }
];

let selectedDay = weekDays[3]; // Thursday

export function renderProgressView() {
  const ranges = ['Week', 'Month', '3 Mo', 'Year'];
  const currentData = rangeTelemetry[activeRange] || rangeTelemetry.Week;

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
            <button data-range="${r}" class="progress-range-btn flex-1 py-unit-2xs text-center rounded-full font-label-md text-label-md transition-all active:scale-95 ${cls}">
              ${r}
            </button>
          `;
        }).join('')}
      </div>

      <!-- Hero High-Performance Score Card -->
      <section class="relative overflow-hidden bg-white rounded-3xl p-unit-lg shadow-sm border border-gray-200">
        <div class="flex items-start justify-between">
          <div class="flex flex-col gap-unit-2xs">
            <span class="font-label-md text-label-md uppercase tracking-wider text-gray-500 font-bold text-[11px]">DailyRep Metric Core (${activeRange})</span>
            <div class="flex items-baseline gap-unit-2xs">
              <span class="font-stat-counter text-stat-counter font-extrabold tracking-tight text-[#101317]">${currentData.score}</span>
              <span class="font-headline-md text-headline-md text-[#AAB2BD]">/100</span>
            </div>
          </div>
          <div class="flex items-center gap-1 px-unit-sm py-unit-2xs rounded-full font-label-md text-xs bg-blue-50 text-blue-600 font-bold">
            <span class="material-symbols-outlined text-[16px]">trending_up</span>
            <span>${currentData.scoreChange}</span>
          </div>
        </div>
        <p class="font-body-sm text-body-sm mt-unit-2xs text-gray-600 leading-relaxed">${currentData.summary}</p>
        
        <div class="grid grid-cols-3 gap-unit-xs mt-unit-md">
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Workouts</span>
              <span class="material-symbols-outlined text-[16px] text-blue-600">bolt</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">${currentData.workoutsPct}%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-blue-600" style="width: ${currentData.workoutsPct}%;"></div>
            </div>
          </div>
          
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Habits</span>
              <span class="material-symbols-outlined text-[16px] text-gray-800">check_circle</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">${currentData.habitsPct}%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-gray-800" style="width: ${currentData.habitsPct}%;"></div>
            </div>
          </div>
          
          <div class="rounded-2xl p-unit-sm flex flex-col gap-unit-2xs bg-gray-50 border border-gray-200">
            <div class="flex items-center justify-between">
              <span class="font-label-md text-xs text-gray-700 font-semibold">Recovery</span>
              <span class="material-symbols-outlined text-[16px] text-gray-400">bedtime</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">${currentData.recoveryPct}%</span>
            <div class="w-full h-1.5 rounded-full overflow-hidden bg-gray-200">
              <div class="h-full rounded-full bg-gray-400" style="width: ${currentData.recoveryPct}%;"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Interactive Output Chart Section -->
      <section class="bg-white rounded-3xl p-unit-lg shadow-sm border border-gray-200 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="font-headline-md text-headline-md text-[#101317] font-bold">Training Volume Output</h2>
            <span class="font-body-sm text-xs text-gray-500">Tap any day bar to inspect exact telemetry</span>
          </div>
          <span class="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">Interactive</span>
        </div>

        <!-- 7-Day Interactive Histogram Chart -->
        <div class="h-44 flex items-end justify-between gap-2 pt-4 pb-2 px-1">
          ${weekDays.map(item => {
            const isSelected = item.day === selectedDay.day;
            const barBg = isSelected ? 'bg-blue-600 shadow-md shadow-blue-500/30' : 'bg-gray-100 hover:bg-gray-200';
            const labelStyle = isSelected ? 'text-blue-600 font-extrabold' : 'text-gray-500';

            return `
              <div data-chart-day="${item.day}" class="chart-day-bar flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group">
                <span class="text-[10px] font-bold text-gray-400 group-hover:text-gray-800 transition-colors">${item.pct}</span>
                <div class="w-full rounded-xl transition-all duration-300 ${barBg}" style="height: ${item.height}%;"></div>
                <span class="text-xs font-semibold ${labelStyle}">${item.day}</span>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Selected Day Inspector Breakdown Card -->
        <div class="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between transition-all">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <span class="material-symbols-outlined text-[20px]">insights</span>
            </div>
            <div>
              <div class="font-label-lg font-bold text-blue-900 text-sm">${selectedDay.fullDay} Telemetry</div>
              <div class="text-xs text-blue-700">${selectedDay.cal} • ${selectedDay.min}</div>
            </div>
          </div>
          <span class="font-label-md text-xs font-extrabold text-blue-600 bg-white px-2.5 py-1 rounded-full shadow-xs">
            ${selectedDay.pct} Met
          </span>
        </div>
      </section>

      <!-- Milestone Badges Grid -->
      <section class="bg-white rounded-3xl p-unit-lg shadow-sm border border-gray-200 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[20px] text-amber-500 fill">workspace_premium</span>
            <h3 class="font-headline-md font-bold text-[#101317]">Milestones Unlocked</h3>
          </div>
          <span class="text-xs text-gray-500 font-semibold">3 Unlocked</span>
        </div>

        <div class="grid grid-cols-3 gap-unit-xs">
          <div class="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-[28px] text-amber-600 fill mb-1">local_fire_department</span>
            <span class="font-label-md text-xs font-bold text-amber-900">21-Day Fire</span>
            <span class="text-[10px] text-amber-700">Hypertrophy Streak</span>
          </div>

          <div class="p-3 rounded-2xl bg-blue-50/60 border border-blue-200 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-[28px] text-blue-600 fill mb-1">water_drop</span>
            <span class="font-label-md text-xs font-bold text-blue-900">Hydra Hero</span>
            <span class="text-[10px] text-blue-700">2.8L Daily Met</span>
          </div>

          <div class="p-3 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col items-center text-center">
            <span class="material-symbols-outlined text-[28px] text-emerald-600 fill mb-1">speed</span>
            <span class="font-label-md text-xs font-bold text-emerald-900">Sprint King</span>
            <span class="text-[10px] text-emerald-700">Top 4% Endurance</span>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindProgressEvents() {
  document.querySelectorAll('.progress-range-btn').forEach(btn => {
    btn.onclick = () => {
      activeRange = btn.getAttribute('data-range') || 'Week';
      store.showToast(`Analytics range: ${activeRange}`, 'info');
      store.notify();
    };
  });

  document.querySelectorAll('.chart-day-bar').forEach(bar => {
    bar.onclick = () => {
      const dayCode = bar.getAttribute('data-chart-day');
      const found = weekDays.find(d => d.day === dayCode);
      if (found) {
        weekDays.forEach(d => { d.active = d.day === dayCode; });
        selectedDay = found;
        store.notify();
      }
    };
  });
}
