import { store } from '../state/store.js';

export function renderBottomNav() {
  const { currentTab, settings } = store.state;
  const isDark = settings && settings.themeMode === 'Dark Mode';

  // Apple SF Symbols-inspired tab layout
  const tabs = [
    { id: 'home', label: 'Today', icon: 'donut_large' },
    { id: 'fitness', label: 'Workout', icon: 'fitness_center' },
    { id: 'daily', label: 'Habits', icon: 'checklist' },
    { id: 'progress', label: 'Summary', icon: 'show_chart' },
    { id: 'profile', label: 'Sharing', icon: 'account_circle' },
  ];

  // Authentic Apple iOS Tab Bar styling
  const barBg = isDark
    ? 'bg-[rgba(22,22,24,0.85)] border-t border-[rgba(84,84,88,0.36)]'
    : 'bg-[rgba(249,249,249,0.82)] border-t border-[rgba(60,60,67,0.18)]';

  const activeColor = isDark ? 'text-[#0A84FF]' : 'text-[#007AFF]';
  const inactiveColor = 'text-[#8E8E93]';

  return `
    <nav class="fixed bottom-0 inset-x-0 max-w-md mx-auto w-full z-40 ${barBg} backdrop-blur-[30px] backdrop-saturate-[180%] transition-colors duration-200">
      <div class="flex items-center justify-around h-[50px] px-1">
        ${tabs.map(tab => {
          const isActive = currentTab === tab.id;
          const iconCls = isActive ? 'fill font-semibold' : 'font-normal';
          const textCls = isActive 
            ? `${activeColor} font-semibold` 
            : `${inactiveColor} font-medium`;

          return `
            <button 
              data-tab="${tab.id}" 
              class="nav-tab-btn flex-1 h-full flex flex-col items-center justify-center pt-1 pb-1 transition-all duration-150 active:scale-[0.90] active:opacity-70 select-none group"
              style="font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Display', sans-serif;"
            >
              <span class="material-symbols-outlined text-[24px] ${isActive ? activeColor : inactiveColor} ${iconCls} transition-transform duration-150">
                ${tab.icon}
              </span>
              <span class="text-[10px] tracking-[-0.24px] leading-none mt-1 ${textCls}">
                ${tab.label}
              </span>
            </button>
          `;
        }).join('')}
      </div>
      <!-- iOS Home Indicator Safe Area spacing -->
      <div class="h-safe pb-safe pointer-events-none"></div>
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
