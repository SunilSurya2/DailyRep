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
    <!-- Header (Scrolls naturally with content) -->
    ${renderHeader()}

    <!-- Main Dynamic View Container -->
    <main class="flex-1 flex flex-col relative w-full pb-28 bg-surface px-margin-mobile pt-2">
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
