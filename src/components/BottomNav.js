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

  const containerBg = isDark
    ? 'bg-[#101317]/90 border-gray-800/80 shadow-[0_16px_40px_rgba(0,0,0,0.6)] text-white'
    : 'bg-white/85 border-white/80 shadow-[0_12px_36px_rgba(37,99,235,0.14),0_4px_20px_rgba(0,0,0,0.06)] text-gray-800 ring-1 ring-black/[0.04]';

  const inactiveBtnCls = isDark
    ? 'text-gray-400 hover:text-blue-400 hover:bg-white/5'
    : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100/70';

  const inactiveLabelCls = isDark
    ? 'text-gray-400'
    : 'text-gray-500';

  return `
    <nav class="fixed bottom-3 inset-x-0 max-w-md mx-auto z-40 px-3.5 pointer-events-none pb-safe">
      <div class="pointer-events-auto ${containerBg} backdrop-blur-2xl border rounded-[30px] p-1.5 flex items-center justify-between gap-1 transition-all duration-300">
        ${tabs.map(tab => {
          const isActive = currentTab === tab.id;
          if (isActive) {
            return `
              <button data-tab="${tab.id}" class="nav-tab-btn flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[24px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 transition-all duration-300 active:scale-95 animate-fade-in">
                <span class="material-symbols-outlined text-[20px] fill">${tab.icon}</span>
                <span class="font-label-lg font-bold text-xs tracking-tight">${tab.label}</span>
              </button>
            `;
          }
          return `
            <button data-tab="${tab.id}" class="nav-tab-btn flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-[24px] ${inactiveBtnCls} transition-all duration-200 active:scale-90">
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
