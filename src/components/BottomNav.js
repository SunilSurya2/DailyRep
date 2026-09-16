import { store } from '../state/store.js';

export function renderBottomNav() {
  const { currentTab, settings } = store.state;
  const isDark = settings && settings.themeMode === 'Dark Mode';

  const tabs = [
    { id: 'home', label: 'Home', icon: 'cottage' },
    { id: 'fitness', label: 'Fitness', icon: 'fitness_center' },
    { id: 'daily', label: 'Daily', icon: 'task_alt' },
    { id: 'progress', label: 'Progress', icon: 'insights' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  const inactiveBtnCls = isDark
    ? 'text-gray-400 hover:text-blue-400'
    : 'text-gray-600 hover:text-blue-600';

  const inactiveLabelCls = isDark
    ? 'text-gray-400'
    : 'text-gray-500';

  return `
    <nav class="fixed bottom-3 inset-x-0 max-w-md mx-auto z-40 px-3.5 pointer-events-none pb-safe">
      <div class="pointer-events-auto glass-dock rounded-[32px] p-1.5 flex items-center justify-between gap-1 transition-all duration-300">
        ${tabs.map(tab => {
          const isActive = currentTab === tab.id;
          if (isActive) {
            return `
              <button data-tab="${tab.id}" class="nav-tab-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[24px] glass-pill-active text-white transition-all duration-300 active:scale-95 animate-pill-pop cursor-pointer">
                <span class="material-symbols-outlined text-[20px] fill drop-shadow-sm">${tab.icon}</span>
                <span class="font-label-lg font-bold text-xs tracking-tight drop-shadow-sm">${tab.label}</span>
              </button>
            `;
          }
          return `
            <button data-tab="${tab.id}" class="nav-tab-btn glass-pill-inactive flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-[24px] ${inactiveBtnCls} transition-all duration-200 active:scale-90 cursor-pointer">
              <span class="material-symbols-outlined text-[22px] transition-transform duration-200">${tab.icon}</span>
              <span class="font-label-md text-[10px] font-semibold ${inactiveLabelCls} mt-0.5 leading-none">${tab.label}</span>
            </button>
          `;
        }).join('')}
      </div>
    </nav>
  `;
}

export function bindBottomNavEvents() {
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) store.setTab(tab);
    };
  });
}
