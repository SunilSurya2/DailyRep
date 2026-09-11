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

  const { currentTab } = store.state;

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
    ${renderHeader()}
    <main class="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface px-margin-mobile">
      ${viewHtml}
    </main>
    ${renderBottomNav()}
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

// Subscribe to store updates
store.subscribe(() => {
  renderApp();
});

// Live workout timer loop
setInterval(() => {
  if (store.state.isWorkoutActive && store.state.activeWorkoutSession.isRunning) {
    store.tickWorkout();
  }
}, 1000);

// Initial render
document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

renderApp();
