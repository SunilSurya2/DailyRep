import { store } from './state/store.js';
import { renderHeader, bindHeaderEvents } from './components/Header.js';
import { renderBottomNav, bindBottomNavEvents } from './components/BottomNav.js';
import { renderHomeView, bindHomeEvents } from './views/HomeView.js';
import { renderFitnessView, bindFitnessEvents } from './views/FitnessView.js';
import { renderDailyHabitsView, bindDailyHabitsEvents } from './views/DailyHabitsView.js';
import { renderProgressView, bindProgressEvents } from './views/ProgressView.js';
import { renderProfileView, bindProfileEvents } from './views/ProfileView.js';
import { renderActiveWorkoutModal, bindActiveWorkoutEvents } from './views/ActiveWorkoutModal.js';
import { renderNotificationsModal, bindNotificationsEvents } from './views/NotificationsModal.js';

function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const { currentTab, toasts } = store.state;

  let viewHtml = '';
  switch (currentTab) {
    case 'home':
      viewHtml = renderHomeView();
      break;
    case 'fitness':
      viewHtml = renderFitnessView();
      break;
    case 'daily':
      viewHtml = renderDailyHabitsView();
      break;
    case 'progress':
      viewHtml = renderProgressView();
      break;
    case 'profile':
      viewHtml = renderProfileView();
      break;
    default:
      viewHtml = renderHomeView();
  }

  appEl.innerHTML = `
    <!-- Floating In-App Toast Container -->
    <div class="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-xs px-4 pointer-events-none">
      ${toasts.map(t => `
        <div class="pointer-events-auto px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border animate-toast-in ${
          t.type === 'error' ? 'bg-red-600 text-white border-red-700 shadow-red-500/20' :
          t.type === 'info' ? 'bg-gray-900 text-white border-gray-800 shadow-black/30' :
          'bg-blue-600 text-white border-blue-700 shadow-blue-500/30'
        }">
          <span class="material-symbols-outlined text-[18px]">
            ${t.type === 'error' ? 'error' : t.type === 'info' ? 'info' : 'check_circle'}
          </span>
          <span class="flex-1">${t.message}</span>
        </div>
      `).join('')}
    </div>

    <!-- Header (Scrolls naturally with content) -->
    ${renderHeader()}

    <!-- Main Dynamic View Container -->
    <main class="flex-1 flex flex-col relative w-full pb-24 bg-surface px-margin-mobile pt-2">
      ${viewHtml}
    </main>

    <!-- Bottom Navigation Bar -->
    ${renderBottomNav()}

    <!-- Modals -->
    ${renderActiveWorkoutModal()}
    ${renderNotificationsModal()}
  `;

  // Bind DOM events
  bindHeaderEvents();
  bindBottomNavEvents();
  bindActiveWorkoutEvents();
  bindNotificationsEvents();

  switch (currentTab) {
    case 'home':
      bindHomeEvents();
      break;
    case 'fitness':
      bindFitnessEvents();
      break;
    case 'daily':
      bindDailyHabitsEvents();
      break;
    case 'progress':
      bindProgressEvents();
      break;
    case 'profile':
      bindProfileEvents();
      break;
  }
}

// Subscribe to reactive store changes
store.subscribe(() => {
  renderApp();
});

// Live workout session telemetry loop
setInterval(() => {
  if (store.state.isWorkoutActive && store.state.activeWorkoutSession.isRunning) {
    store.tickWorkout();
  }
}, 1000);

// Live Box Breathing cadence coach loop
setInterval(() => {
  if (store.state.breathingCoach && store.state.breathingCoach.isActive) {
    store.tickBreathing();
  }
}, 1000);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

renderApp();
