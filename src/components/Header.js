import { store } from '../state/store.js';

export function renderHeader() {
  const { currentTab, user, notifications } = store.state;
  const unreadCount = notifications.filter(n => !n.read).length;

  const tabTitles = {
    home: 'Home',
    fitness: 'Workouts',
    daily: 'Daily Habits',
    progress: 'Analytics',
    profile: 'Profile'
  };

  const title = tabTitles[currentTab] || 'DailyRep';

  return `
    <header class="fixed top-0 max-w-md w-full z-40 bg-surface/90 backdrop-blur-xl pt-safe border-b border-surface-container-high/40">
      <div class="h-16 px-margin-mobile flex items-center justify-between">
        <div class="flex items-center gap-unit-sm">
          <div class="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center p-1 border border-blue-500/20 shadow-md shadow-blue-500/15 transition-transform active:scale-95">
            <img src="/logo.png" alt="DailyRep Logo" class="w-full h-full object-contain" />
          </div>
          <div class="flex flex-col">
            <span class="font-label-lg text-label-lg text-on-surface tracking-tight font-extrabold leading-none">DailyRep</span>
            <span class="font-label-md text-label-md text-on-surface-variant leading-tight capitalize">${title}</span>
          </div>
        </div>
        
        <div class="flex items-center gap-unit-xs">
          <button id="header-notif-btn" aria-label="Notifications" class="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
            <span class="material-symbols-outlined text-[22px]">notifications</span>
            ${unreadCount > 0 ? `<span class="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-surface animate-pulse"></span>` : ''}
          </button>
          <button id="header-profile-btn" class="p-0.5 rounded-full ring-2 ring-primary/30 transition-transform active:scale-95">
            <img alt="Profile" class="w-8 h-8 rounded-full object-cover" src="${user.avatarUrl}" />
          </button>
        </div>
      </div>
    </header>
  `;
}

export function bindHeaderEvents() {
  const notifBtn = document.getElementById('header-notif-btn');
  if (notifBtn) {
    notifBtn.onclick = () => store.toggleNotifications();
  }
  const profileBtn = document.getElementById('header-profile-btn');
  if (profileBtn) {
    profileBtn.onclick = () => store.setTab('profile');
  }
}
