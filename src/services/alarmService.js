// Alarm & Sleep Schedule Audio & Notification Service for DailyRep
import { store } from '../state/store.js';

let audioCtx = null;
let currentAlarmLoop = null;
let activeAlarmState = null; // { type: 'bedtime' | 'wake', time: string }
let lastTriggeredMinute = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a soothing, rich synthesizer chime using Web Audio API
 */
export function playChime(type = 'wake') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'bedtime') {
      // Calming descending wind-down chord: G4 -> E4 -> C4
      const notes = [392.00, 329.63, 261.63];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.4);

        gain.gain.setValueAtTime(0.001, now + idx * 0.4);
        gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.4 + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.4 + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.4);
        osc.stop(now + idx * 0.4 + 1.3);
      });
    } else {
      // Energizing gentle sunrise wake chime: C5 -> E5 -> G5 -> C6
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.22);

        gain.gain.setValueAtTime(0.001, now + idx * 0.22);
        gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.22 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.22 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.22);
        osc.stop(now + idx * 0.22 + 1.0);
      });
    }
  } catch (err) {
    console.warn('Audio play chime failed:', err);
  }
}

/**
 * Start repeating alarm chime until dismissed
 */
export function startAlarmSound(type = 'wake') {
  stopAlarmSound();
  playChime(type);
  currentAlarmLoop = setInterval(() => {
    playChime(type);
  }, 2200);

  if ('vibrate' in navigator) {
    try {
      navigator.vibrate([400, 250, 400, 250, 400]);
    } catch (_) {}
  }
}

export function stopAlarmSound() {
  if (currentAlarmLoop) {
    clearInterval(currentAlarmLoop);
    currentAlarmLoop = null;
  }
}

/**
 * Trigger an active in-app alarm alert modal
 */
export function triggerAlarm(type = 'wake') {
  const stats = store.state.stats || {};
  const isWake = type === 'wake';
  const label = isWake ? 'Wake Up Alarm' : 'Bedtime Alarm';
  const sub = isWake
    ? 'Good morning! Rise and shine, time to conquer your daily goals.'
    : 'Time to wind down! Rest and recovery recharge your streak.';

  activeAlarmState = {
    type,
    title: label,
    subtitle: sub,
    time: isWake ? (stats.sleepWakeTime || '08:15') : (stats.sleepStartTime || '23:00')
  };

  startAlarmSound(type);

  // Add an entry in notifications center
  store.state.notifications.unshift({
    id: `notif-alarm-${Date.now()}`,
    type: isWake ? 'streak' : 'rest',
    title: `${label} ringing`,
    desc: sub,
    time: 'Just now',
    read: false,
    icon: isWake ? 'wb_sunny' : 'bedtime',
    color: isWake ? '#F59E0B' : '#6366F1'
  });

  store.notify();
}

export function dismissAlarm() {
  stopAlarmSound();
  activeAlarmState = null;
  store.notify();
}

export function snoozeAlarm(minutes = 5) {
  stopAlarmSound();
  activeAlarmState = null;
  store.showToast(`Alarm snoozed for ${minutes} minutes`, 'info');
  store.notify();

  setTimeout(() => {
    triggerAlarm('wake');
  }, minutes * 60 * 1000);
}

export function getActiveAlarm() {
  return activeAlarmState;
}

/**
 * Render Active Ringing Alarm Overlay
 */
export function renderActiveAlarmOverlay() {
  if (!activeAlarmState) return '';

  const isWake = activeAlarmState.type === 'wake';
  const bgGrad = isWake
    ? 'from-amber-500 via-orange-500 to-amber-600'
    : 'from-indigo-600 via-purple-700 to-slate-900';

  return `
    <div id="alarm-overlay" class="fixed inset-0 z-[100] flex flex-col items-center justify-between p-8 bg-gradient-to-b ${bgGrad} text-white animate-fade-in select-none">
      
      <!-- Top Pulsing Bell -->
      <div class="flex flex-col items-center mt-12">
        <div class="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center animate-bounce shadow-2xl">
          <span class="material-symbols-outlined text-[48px] text-white">
            ${isWake ? 'alarm_on' : 'bedtime'}
          </span>
        </div>
        <span class="mt-4 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-widest">
          ${isWake ? '☀️ Morning Call' : '🌙 Wind-down Time'}
        </span>
      </div>

      <!-- Center Big Time & Label -->
      <div class="text-center my-auto flex flex-col items-center">
        <h1 class="text-6xl font-black tracking-tight drop-shadow-md">
          ${activeAlarmState.time}
        </h1>
        <h2 class="text-2xl font-bold mt-2">${activeAlarmState.title}</h2>
        <p class="text-sm text-white/80 max-w-xs mt-2">${activeAlarmState.subtitle}</p>
      </div>

      <!-- Action Buttons (Snooze / Dismiss) -->
      <div class="w-full max-w-xs flex flex-col gap-3 mb-8">
        <button id="alarm-dismiss-btn" type="button" class="w-full py-4 rounded-2xl bg-white text-[#101317] font-black text-base shadow-xl active:scale-95 transition-all hover:bg-gray-100 flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[22px]">alarm_off</span>
          <span>Dismiss Alarm</span>
        </button>

        <button id="alarm-snooze-btn" type="button" class="w-full py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-sm active:scale-95 transition-all flex items-center justify-center gap-2">
          <span class="material-symbols-outlined text-[18px]">snooze</span>
          <span>Snooze (5 min)</span>
        </button>
      </div>
    </div>
  `;
}

export function bindAlarmOverlayEvents() {
  const dismissBtn = document.getElementById('alarm-dismiss-btn');
  if (dismissBtn) {
    dismissBtn.onclick = () => dismissAlarm();
  }

  const snoozeBtn = document.getElementById('alarm-snooze-btn');
  if (snoozeBtn) {
    snoozeBtn.onclick = () => snoozeAlarm(5);
  }
}

/**
 * Background loop to check alarms against current system time
 */
export function initAlarmWatcher() {
  setInterval(() => {
    const stats = store.state.stats;
    if (!stats) return;

    const now = new Date();
    const currentH = String(now.getHours()).padStart(2, '0');
    const currentM = String(now.getMinutes()).padStart(2, '0');
    const currentHM = `${currentH}:${currentM}`;

    // Only fire once per minute
    if (lastTriggeredMinute === currentHM) return;

    // Check Bedtime Alarm
    if (stats.bedtimeAlarmEnabled && stats.sleepStartTime === currentHM) {
      lastTriggeredMinute = currentHM;
      triggerAlarm('bedtime');
      return;
    }

    // Check Wake Up Alarm
    if (stats.wakeAlarmEnabled && stats.sleepWakeTime === currentHM) {
      lastTriggeredMinute = currentHM;
      triggerAlarm('wake');
      return;
    }
  }, 10000);
}
