import { store } from '../state/store.js';

let activeCategory = 'all';
let waterCount = 3;
const totalWater = 4;

export function renderDailyHabitsView() {
  const { habits } = store.state;

  const categories = [
    { id: 'all', label: 'All Habits' },
    { id: 'morning', label: '🌅 Morning Ritual' },
    { id: 'health', label: '💧 Physical Health' },
    { id: 'mindfulness', label: '🧘 Mindfulness' },
    { id: 'evening', label: '🌙 Evening Wind-down' }
  ];

  return `
    <div class="flex flex-col w-full gap-unit-md pb-unit-3xl pt-2">
      <!-- Weekly Streak Strip Header Card -->
      <div class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-md relative overflow-hidden">
        <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full blur-2xl pointer-events-none bg-blue-500/15"></div>
        <div class="flex items-center justify-between z-10">
          <div class="flex flex-col">
            <span class="font-label-md text-label-md uppercase tracking-wider text-[#343A40] text-[11px] font-bold">Weekly Momentum</span>
            <div class="flex items-center gap-unit-xs mt-unit-2xs">
              <span class="font-headline-lg-mobile text-headline-lg-mobile font-bold text-[#101317]">6 of 7 Days</span>
              <span class="inline-flex items-center gap-unit-2xs px-unit-xs py-unit-2xs rounded-full font-label-md text-label-md bg-blue-50 text-blue-600 font-bold">
                <span class="material-symbols-outlined text-[16px] fill text-blue-600">local_fire_department</span>
                86%
              </span>
            </div>
          </div>
          <div class="w-11 h-11 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shadow-inner">
            <span class="material-symbols-outlined text-[24px]">verified</span>
          </div>
        </div>

        <!-- 7-Day Dot Matrix Track -->
        <div class="grid grid-cols-7 gap-unit-xs pt-unit-xs z-10">
          ${['M', 'T', 'W', 'T', 'F'].map(day => `
            <div class="flex flex-col items-center gap-unit-2xs">
              <span class="font-label-md text-xs font-semibold text-[#343A40]">${day}</span>
              <div class="w-9 h-9 rounded-full text-white flex items-center justify-center bg-[#343A40] shadow-sm">
                <span class="material-symbols-outlined text-[18px]">check</span>
              </div>
              <span class="w-1.5 h-1.5 rounded-full bg-[#343A40]"></span>
            </div>
          `).join('')}
          <div class="flex flex-col items-center gap-unit-2xs scale-105">
            <span class="font-label-md text-xs font-bold text-blue-600">S</span>
            <div class="w-9 h-9 rounded-full text-white flex items-center justify-center bg-blue-600 shadow-md shadow-blue-500/50 animate-pulse">
              <span class="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <span class="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          </div>
          <div class="flex flex-col items-center gap-unit-2xs opacity-70">
            <span class="font-label-md text-xs text-[#AAB2BD]">S</span>
            <div class="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 text-[#AAB2BD]">
              <span class="material-symbols-outlined text-[16px]">lock</span>
            </div>
            <span class="w-1.5 h-1.5 rounded-full bg-[#AAB2BD]"></span>
          </div>
        </div>
      </div>

      <!-- Horizontal Filter / Category Tabs -->
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

      <!-- Habit Cards Stack -->
      <div class="flex flex-col gap-unit-sm">
        <!-- Morning Walk & Sun -->
        <div class="group bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex items-center justify-between gap-unit-md transition-all hover:shadow-md relative overflow-hidden">
          <div class="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-600"></div>
          <div class="flex items-center gap-unit-sm min-w-0">
            <div class="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 shadow-sm">
              <img class="w-full h-full object-cover" alt="Morning Walk" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKkybobOHQa8AUADcocDPKC5RsEhbp4hlaDLhFuY7Rm2rDp5qK9-Wups6bvbj4lOLsPdZn734H2VD5CHkXvoXYELrWhUDUxOgpc_4aveVpzCzj8CjiBsd4sCjfXhjSVgX9XcO8Ub8qRS3T9OmkSSnBoMwM-6qzN12JgowdwXFP3Tic-Y4ya4yserlcVJG1SclG2owF-UnLLix0_hFzdTnSbcKylj1jXdW9F3lnBbHi83auBOEcoZGc" />
              <div class="absolute inset-0 flex items-center justify-center text-white bg-black/30 backdrop-blur-xs">
                <span class="material-symbols-outlined text-[20px]">sunny</span>
              </div>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-headline-md text-headline-md line-through opacity-80 truncate text-[#101317]">Morning Walk & Sun</span>
              <div class="flex items-center gap-unit-xs mt-unit-2xs font-body-sm text-body-sm text-[#343A40]">
                <span class="px-unit-xs py-0.5 rounded-full font-label-md text-xs bg-gray-100 text-gray-700">Morning</span>
                <span>•</span>
                <span>15 mins</span>
                <span>•</span>
                <span class="inline-flex items-center gap-0.5 font-label-md text-xs text-blue-600 font-bold">
                  <span class="material-symbols-outlined text-[14px] fill text-blue-600">local_fire_department</span> 21d
                </span>
              </div>
            </div>
          </div>
          <button class="w-11 h-11 rounded-full text-white flex items-center justify-center shrink-0 bg-blue-600 shadow-md shadow-blue-500/35 transition-transform active:scale-90">
            <span class="material-symbols-outlined text-[22px] font-bold">done_all</span>
          </button>
        </div>

        <!-- Electrolyte Water with interactive Log Glass -->
        <div class="bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex flex-col gap-unit-sm transition-all hover:shadow-md">
          <div class="flex items-center justify-between gap-unit-md">
            <div class="flex items-center gap-unit-sm min-w-0">
              <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
                <span class="material-symbols-outlined text-[24px]">water_drop</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-headline-md text-headline-md truncate text-[#101317]">Electrolyte Water</span>
                <div class="flex items-center gap-unit-xs mt-unit-2xs font-body-sm text-body-sm text-[#343A40]">
                  <span class="px-unit-xs py-0.5 rounded-full font-label-md text-xs bg-gray-100 text-gray-700">Health</span>
                  <span>•</span>
                  <span class="inline-flex items-center gap-0.5 font-label-md text-xs text-blue-600 font-bold">
                    <span class="material-symbols-outlined text-[14px] fill text-blue-600">local_fire_department</span> 34d streak
                  </span>
                </div>
              </div>
            </div>
            <button id="habits-log-water-btn" class="px-unit-sm py-unit-xs rounded-full text-white font-label-md text-label-md flex items-center gap-unit-2xs bg-blue-600 shadow-md shadow-blue-500/25 active:scale-95 transition-transform font-bold">
              <span class="material-symbols-outlined text-[16px]">add</span>
              <span>Log Glass</span>
            </button>
          </div>
          <div class="flex items-center gap-unit-xs pt-unit-2xs">
            ${[0, 1, 2, 3].map(idx => `
              <div class="flex-1 h-2 rounded-full transition-all ${idx < waterCount ? 'bg-blue-600' : 'bg-gray-300'}"></div>
            `).join('')}
            <span class="font-label-md text-xs font-bold ml-unit-xs text-gray-700">${waterCount}/${totalWater}</span>
          </div>
        </div>

        <!-- 10-Min Breathwork -->
        <div class="bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex items-center justify-between gap-unit-md transition-all hover:shadow-md">
          <div class="flex items-center gap-unit-sm min-w-0">
            <div class="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 flex items-center justify-center bg-gray-100">
              <img class="w-full h-full object-cover" alt="Breathwork Room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH0_zpoHHBtSympJTbS0vDjzGj9nzeuiCeC8b8kfuqopwhQvb78Be5tK79YNVp9KUWwQ68IQk9OoIPiRR3Bxsr0ythKtg2276OBeBAYgNbTOq0GgzB7ZfpmhmRxizESdpE7R3pkX-1Tv4yL0Z-QEMqyYTqsLuPGad9KRuydgqBVASdTTUQ1SOdGOhS6EIaM2WrGhHK96_KoN-m5zmayYlequrMiklZxVsa05rZVq9GL_RQBcsy6XnN" />
              <div class="absolute inset-0 flex items-center justify-center text-white bg-black/25">
                <span class="material-symbols-outlined text-[22px]">self_improvement</span>
              </div>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-headline-md text-headline-md truncate text-[#101317]">10-Min Breathwork</span>
              <div class="flex items-center gap-unit-xs mt-unit-2xs font-body-sm text-body-sm text-[#343A40]">
                <span class="px-unit-xs py-0.5 rounded-full font-label-md text-xs bg-gray-100 text-gray-700">Mindfulness</span>
                <span>•</span>
                <span class="inline-flex items-center gap-0.5 font-label-md text-xs text-blue-600 font-bold">
                  <span class="material-symbols-outlined text-[14px] fill text-blue-600">local_fire_department</span> 5d
                </span>
              </div>
            </div>
          </div>
          <button class="w-11 h-11 rounded-full flex items-center justify-center shrink-0 bg-blue-50 text-blue-600 shadow-sm active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[22px] fill text-blue-600">play_arrow</span>
          </button>
        </div>

        <!-- Cold Shower Protocol -->
        <div class="bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex items-center justify-between gap-unit-md transition-all hover:shadow-md">
          <div class="flex items-center gap-unit-sm min-w-0">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-blue-50 text-blue-600">
              <span class="material-symbols-outlined text-[24px]">ac_unit</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-headline-md text-headline-md truncate text-[#101317]">Cold Shower Protocol</span>
              <div class="flex items-center gap-unit-xs mt-unit-2xs font-body-sm text-body-sm text-[#343A40]">
                <span class="px-unit-xs py-0.5 rounded-full font-label-md text-xs bg-gray-100 text-gray-700">Recovery</span>
                <span>•</span>
                <span>3 mins</span>
                <span>•</span>
                <span class="inline-flex items-center gap-0.5 font-label-md text-xs text-blue-600 font-bold">
                  <span class="material-symbols-outlined text-[14px] fill text-blue-600">local_fire_department</span> 12d
                </span>
              </div>
            </div>
          </div>
          <button class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 border border-gray-300 text-gray-500 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[20px]">check</span>
          </button>
        </div>

        <!-- No Screens Pre-Bed -->
        <div class="bg-surface-container-lowest rounded-3xl p-unit-md shadow-sm border border-surface-container-high/40 flex items-center justify-between gap-unit-md transition-all hover:shadow-md">
          <div class="flex items-center gap-unit-sm min-w-0">
            <div class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gray-100 text-gray-800">
              <span class="material-symbols-outlined text-[24px]">bedtime</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-headline-md text-headline-md truncate text-[#101317]">No Screens Pre-Bed</span>
              <div class="flex items-center gap-unit-xs mt-unit-2xs font-body-sm text-body-sm text-[#343A40]">
                <span class="px-unit-xs py-0.5 rounded-full font-label-md text-xs bg-gray-100 text-gray-700">Evening</span>
                <span>•</span>
                <span>10:30 PM</span>
                <span>•</span>
                <span class="inline-flex items-center gap-0.5 font-label-md text-xs text-blue-600 font-bold">
                  <span class="material-symbols-outlined text-[14px] fill text-blue-600">local_fire_department</span> 9d
                </span>
              </div>
            </div>
          </div>
          <button class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gray-100 border border-gray-300 text-gray-400 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[20px]">hourglass_empty</span>
          </button>
        </div>
      </div>

      <!-- Quick Add Habit Template -->
      <div class="mt-unit-xs bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-md relative overflow-hidden">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <div class="w-8 h-8 rounded-full text-white flex items-center justify-center bg-blue-600 shadow-md shadow-blue-500/30">
              <span class="material-symbols-outlined text-[18px]">add</span>
            </div>
            <span class="font-headline-md text-headline-md font-bold text-[#101317]">Quick Add Habit</span>
          </div>
          <span class="px-unit-xs py-unit-2xs rounded-full font-label-md text-xs bg-gray-100 text-gray-700 font-semibold">Template</span>
        </div>

        <div class="flex flex-col gap-unit-2xs">
          <label class="font-label-md text-xs font-semibold text-gray-700">Habit Name</label>
          <div class="h-12 rounded-2xl px-unit-md flex items-center font-body-md text-body-md justify-between bg-gray-50 border border-gray-200">
            <input id="new-habit-name" type="text" value="Creatine 5g Monohydrate" class="bg-transparent border-none outline-none font-semibold text-[#101317] w-full" />
            <span class="material-symbols-outlined text-[20px] text-gray-500">edit</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-unit-xs">
          <div class="p-unit-sm rounded-2xl flex items-center justify-between bg-gray-50 border border-gray-100">
            <div class="flex flex-col">
              <span class="font-label-md text-[11px] text-gray-500">Frequency</span>
              <span class="font-label-lg text-sm font-bold text-[#101317]">Daily (7x)</span>
            </div>
            <span class="material-symbols-outlined text-[18px] text-gray-600">calendar_today</span>
          </div>
          <div class="p-unit-sm rounded-2xl flex items-center justify-between bg-gray-50 border border-gray-100">
            <div class="flex flex-col">
              <span class="font-label-md text-[11px] text-gray-500">Reminder</span>
              <span class="font-label-lg text-sm font-bold text-[#101317]">08:00 AM</span>
            </div>
            <span class="material-symbols-outlined text-[18px] text-gray-600">notifications_active</span>
          </div>
        </div>

        <button id="habits-save-new-btn" class="w-full h-[50px] mt-unit-2xs rounded-full text-white font-label-lg text-label-lg font-bold flex items-center justify-center gap-unit-xs bg-blue-600 shadow-lg shadow-blue-500/30 active:scale-98 transition-all">
          <span class="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Save Habit to Routine</span>
        </button>
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

  const waterBtn = document.getElementById('habits-log-water-btn');
  if (waterBtn) {
    waterBtn.onclick = () => {
      waterCount = waterCount >= totalWater ? 1 : waterCount + 1;
      store.notify();
    };
  }

  const saveBtn = document.getElementById('habits-save-new-btn');
  if (saveBtn) {
    saveBtn.onclick = () => {
      const input = document.getElementById('new-habit-name');
      const name = input ? input.value.trim() : 'Creatine 5g';
      if (name) {
        store.state.habits.push({
          id: 'h_' + Date.now(),
          name,
          desc: 'Daily supplement routine',
          streak: 1,
          completed: false,
          category: 'health',
          time: '08:00 AM',
          color: '#3B82F6'
        });
        store.notify();
      }
    };
  }
}
