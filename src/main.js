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
import { renderPairDeviceModal, bindPairDeviceEvents } from './views/PairDeviceModal.js';
import { renderEditVitalsModal, bindEditVitalsEvents } from './views/EditVitalsModal.js';
import { renderActiveAlarmOverlay, bindAlarmOverlayEvents, initAlarmWatcher } from './services/alarmService.js';

let lastRenderedTab = null;
const TAB_ORDER = ['home', 'fitness', 'daily', 'progress', 'profile'];

function getViewHtml(tab) {
  switch (tab) {
    case 'home':
      return renderHomeView();
    case 'fitness':
      return renderFitnessView();
    case 'daily':
      return renderDailyHabitsView();
    case 'progress':
      return renderProgressView();
    case 'profile':
      return renderProfileView();
    default:
      return renderHomeView();
  }
}

function bindCurrentTabEvents(tab) {
  switch (tab) {
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

function renderApp() {
  const appEl = document.getElementById('app');
  if (!appEl) return;

  const { currentTab } = store.state;
  const isPageSwitch = lastRenderedTab !== null && lastRenderedTab !== currentTab;
  const viewHtml = getViewHtml(currentTab);

  const pageWrapper = document.getElementById('page-view-wrapper');
  const headerContainer = document.getElementById('header-container');
  const bottomNavContainer = document.getElementById('bottom-nav-container');
  const modalsContainer = document.getElementById('modals-container');

  // Initial shell mount
  if (!pageWrapper || !headerContainer || !bottomNavContainer || !modalsContainer) {
    appEl.innerHTML = `
      <div id="header-container">${renderHeader()}</div>
      <main class="flex-1 flex flex-col relative w-full pb-28 bg-surface px-margin-mobile pt-2 overflow-x-hidden">
        <div id="page-view-wrapper" class="w-full flex-1 flex flex-col">
          ${viewHtml}
        </div>
      </main>
      <div id="bottom-nav-container">${renderBottomNav()}</div>
      <div id="modals-container">
        ${renderActiveWorkoutModal()}
        ${renderNotificationsModal()}
        ${renderPairDeviceModal()}
        ${renderEditVitalsModal()}
        ${renderActiveAlarmOverlay()}
      </div>
    `;

    bindHeaderEvents();
    bindBottomNavEvents();
    bindActiveWorkoutEvents();
    bindNotificationsEvents();
    bindPairDeviceEvents();
    bindEditVitalsEvents();
    bindAlarmOverlayEvents();
    bindCurrentTabEvents(currentTab);

    lastRenderedTab = currentTab;
    return;
  }

  // If SWITCHING TABS: smooth directional slide transition
  if (isPageSwitch) {
    const prevIdx = TAB_ORDER.indexOf(lastRenderedTab);
    const nextIdx = TAB_ORDER.indexOf(currentTab);
    const animClass = nextIdx >= prevIdx ? 'animate-page-forward' : 'animate-page-backward';

    pageWrapper.className = `w-full flex-1 flex flex-col ${animClass}`;
    pageWrapper.innerHTML = viewHtml;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    headerContainer.innerHTML = renderHeader();
    bindHeaderEvents();

    bottomNavContainer.innerHTML = renderBottomNav();
    bindBottomNavEvents();

    modalsContainer.innerHTML = `
      ${renderActiveWorkoutModal()}
      ${renderNotificationsModal()}
      ${renderPairDeviceModal()}
      ${renderEditVitalsModal()}
      ${renderActiveAlarmOverlay()}
    `;
    bindActiveWorkoutEvents();
    bindNotificationsEvents();
    bindPairDeviceEvents();
    bindEditVitalsEvents();
    bindAlarmOverlayEvents();

    bindCurrentTabEvents(currentTab);
    lastRenderedTab = currentTab;
    return;
  }

  // If STAYING ON SAME TAB (e.g. clicking checkmark tick, logging water, etc.):
  // Rock-solid in-place DOM update without page animations or blinking!
  pageWrapper.className = 'w-full flex-1 flex flex-col';
  pageWrapper.innerHTML = viewHtml;

  modalsContainer.innerHTML = `
    ${renderActiveWorkoutModal()}
    ${renderNotificationsModal()}
    ${renderPairDeviceModal()}
    ${renderEditVitalsModal()}
    ${renderActiveAlarmOverlay()}
  `;
  bindActiveWorkoutEvents();
  bindNotificationsEvents();
  bindPairDeviceEvents();
  bindEditVitalsEvents();
  bindAlarmOverlayEvents();

  bindCurrentTabEvents(currentTab);
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

// Initialize background alarm scheduler
initAlarmWatcher();

// Initial render
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp, { once: true });
} else {
  renderApp();
}
