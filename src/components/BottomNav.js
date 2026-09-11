import { store } from '../state/store.js';

export function renderBottomNav() {
  const { currentTab } = store.state;

  const tabs = [
    { id: 'home', label: 'Home', icon: 'cottage' },
    { id: 'fitness', label: 'Fitness', icon: 'fitness_center' },
    { id: 'daily', label: 'Daily', icon: 'task_alt' },
    { id: 'progress', label: 'Progress', icon: 'insights' },
    { id: 'profile', label: 'Profile', icon: 'person' },
  ];

  return `
    <nav class="fixed bottom-0 max-w-md w-full z-40 pb-safe bg-surface/90 backdrop-blur-xl border-t border-surface-container-high/40 shadow-[0_-4px_24px_rgba(27,28,26,0.05)]">
      <div class="flex items-center justify-around h-16 px-unit-xs">
        ${tabs.map(tab => {
          const isActive = currentTab === tab.id;
          const activeColor = isActive ? 'text-primary font-bold' : 'text-[#AAB2BD] hover:text-on-surface-variant';
          const fillIcon = isActive ? 'fill' : '';
          return `
            <button data-tab="${tab.id}" class="nav-tab-btn flex-1 flex flex-col items-center justify-center py-unit-2xs gap-0.5 transition-all min-h-[48px] ${activeColor}">
              <span class="material-symbols-outlined text-[23px] ${fillIcon}">${tab.icon}</span>
              <span class="font-label-md text-[11px] leading-tight">${tab.label}</span>
              ${isActive ? `<span class="w-1.5 h-1.5 rounded-full bg-primary mt-0.5"></span>` : `<span class="w-1.5 h-1.5 opacity-0 mt-0.5"></span>`}
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
