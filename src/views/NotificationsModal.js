import { store } from '../state/store.js';

let activeNotifFilter = 'all';

export function renderNotificationsModal() {
  const { isNotificationsOpen, notifications } = store.state;
  if (!isNotificationsOpen) return '';

  const unreadCount = notifications.filter(n => !n.read).length;
  const filtered = activeNotifFilter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  return `
    <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-fade-in">
      <div class="bg-surface-container-lowest rounded-t-[32px] p-unit-lg shadow-2xl border-t border-gray-200 flex flex-col gap-unit-md max-h-[85vh] overflow-y-auto">
        <!-- Drag Handle -->
        <div class="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 mb-1"></div>

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <button id="notif-close-btn" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-90 transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div class="h-6 w-9 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="Logo" class="w-full h-full object-contain" />
            </div>
            <h2 class="font-headline-md font-extrabold text-[#101317]">Notifications</h2>
          </div>
          <div class="flex items-center gap-1.5">
            ${notifications.length > 0 ? `
              <button id="notif-mark-read-btn" class="flex items-center gap-1 font-label-md text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1.5 rounded-full hover:bg-blue-100 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[15px]">done_all</span>
                <span>Read</span>
              </button>
              <button id="notif-clear-all-btn" class="flex items-center gap-1 font-label-md text-xs font-bold text-gray-500 bg-gray-100 px-2.5 py-1.5 rounded-full hover:bg-gray-200 active:scale-95 transition-all">
                <span>Clear</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Filter Pills -->
        <div class="flex items-center gap-2">
          <button data-notif-filter="all" class="notif-filter-btn px-3 py-1 rounded-full text-xs font-bold transition-all ${activeNotifFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}">
            All (${notifications.length})
          </button>
          <button data-notif-filter="unread" class="notif-filter-btn px-3 py-1 rounded-full text-xs font-bold transition-all ${activeNotifFilter === 'unread' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}">
            Unread (${unreadCount})
          </button>
        </div>

        <!-- Notification List -->
        <div class="flex flex-col gap-unit-xs">
          ${filtered.length === 0 ? `
            <div class="py-12 flex flex-col items-center justify-center text-center">
              <div class="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-2">
                <span class="material-symbols-outlined text-[28px]">notifications_off</span>
              </div>
              <span class="font-bold text-gray-800 text-sm">No notifications</span>
              <span class="text-xs text-gray-500 mt-1">You're all caught up with your daily momentum!</span>
            </div>
          ` : filtered.map(n => `
            <div class="p-unit-md rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-3.5 relative group">
              <div class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px] fill">${n.icon}</span>
              </div>
              <div class="flex-1 min-w-0 pr-6">
                <div class="flex items-center justify-between">
                  <h4 class="font-label-lg font-bold text-[#101317] truncate">${n.title}</h4>
                </div>
                <p class="font-body-sm text-xs text-gray-600 mt-0.5 leading-relaxed">${n.body}</p>
                <span class="text-[11px] text-gray-400 font-semibold block mt-1">${n.time}</span>
              </div>
              <div class="flex items-center gap-1 absolute top-3 right-3">
                ${!n.read ? `<span class="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white"></span>` : ''}
                <button data-delete-notif="${n.id}" class="delete-notif-btn text-gray-400 hover:text-red-500 p-1 rounded-full transition-colors" title="Delete">
                  <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function bindNotificationsEvents() {
  const closeBtn = document.getElementById('notif-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => store.toggleNotifications();
  }

  const markReadBtn = document.getElementById('notif-mark-read-btn');
  if (markReadBtn) {
    markReadBtn.onclick = () => store.markNotificationsRead();
  }

  const clearAllBtn = document.getElementById('notif-clear-all-btn');
  if (clearAllBtn) {
    clearAllBtn.onclick = () => store.clearNotifications();
  }

  document.querySelectorAll('.notif-filter-btn').forEach(btn => {
    btn.onclick = () => {
      activeNotifFilter = btn.getAttribute('data-notif-filter') || 'all';
      store.notify();
    };
  });

  document.querySelectorAll('.delete-notif-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-delete-notif');
      if (id) store.deleteNotification(id);
    };
  });
}
