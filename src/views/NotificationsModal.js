import { store } from '../state/store.js';

let activeFilter = 'all';

export function renderNotificationsModal() {
  const { isNotificationsOpen, notifications } = store.state;
  if (!isNotificationsOpen) return '';

  const filtered = activeFilter === 'all'
    ? notifications
    : notifications;

  return `
    <div class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-fade-in">
      <div class="bg-surface-container-lowest rounded-t-[32px] p-unit-lg shadow-2xl border-t border-gray-200 flex flex-col gap-unit-md max-h-[85vh] overflow-y-auto">
        <!-- Drag Handle -->
        <div class="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 mb-1"></div>

        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <button id="notif-close-btn" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-90 transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
            <h2 class="font-headline-md font-extrabold text-[#101317]">Notifications</h2>
          </div>
          <button id="notif-mark-read-btn" class="flex items-center gap-1 font-label-md text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">done_all</span>
            <span>Mark read</span>
          </button>
        </div>

        <!-- Notification List -->
        <div class="flex flex-col gap-unit-xs">
          ${filtered.map(n => `
            <div class="p-unit-md rounded-2xl bg-white border border-gray-200 shadow-xs flex items-start gap-3.5 relative">
              <div class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-[22px] fill">${n.icon}</span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <h4 class="font-label-lg font-bold text-[#101317] truncate">${n.title}</h4>
                  <span class="text-xs text-gray-400 whitespace-nowrap ml-2">${n.time}</span>
                </div>
                <p class="font-body-sm text-xs text-gray-600 mt-0.5 leading-relaxed">${n.body}</p>
              </div>
              ${!n.read ? `<span class="w-2.5 h-2.5 rounded-full bg-blue-600 ring-2 ring-white absolute top-4 right-4"></span>` : ''}
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
}
