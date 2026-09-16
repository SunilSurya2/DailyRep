import { store } from '../state/store.js';
import { playChime } from '../services/alarmService.js';

function to24h(h12, min, ampm) {
  let h = parseInt(h12, 10);
  const m = parseInt(min, 10);
  if (ampm === 'PM' && h < 12) h += 12;
  if (ampm === 'AM' && h === 12) h = 0;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function from24h(timeStr) {
  const parts = (timeStr || '00:00').split(':');
  const h24 = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  const ampm = h24 >= 12 ? 'PM' : 'AM';
  let h12 = h24 % 12;
  if (h12 === 0) h12 = 12;
  // Round minute to nearest 5 for selector
  const roundedMin = Math.round(m / 5) * 5 % 60;
  return { h12, min: roundedMin, ampm };
}

function calculateDuration(startStr, wakeStr) {
  if (!startStr || !wakeStr) return { hours: 7, mins: 45 };
  const [sh, sm] = startStr.split(':').map(Number);
  const [wh, wm] = wakeStr.split(':').map(Number);
  let startMinutes = sh * 60 + sm;
  let wakeMinutes = wh * 60 + wm;
  if (wakeMinutes <= startMinutes) {
    wakeMinutes += 24 * 60;
  }
  const diffMinutes = wakeMinutes - startMinutes;
  return {
    hours: Math.floor(diffMinutes / 60),
    mins: diffMinutes % 60
  };
}

export function renderEditVitalsModal() {
  const { isEditVitalsOpen, stats, activeEditVitalsField } = store.state;
  if (!isEditVitalsOpen) return '';

  let activeField = activeEditVitalsField || 'sleep';
  if (activeField === 'hr' || activeField === 'all') activeField = 'sleep';

  // Sleep start and wake defaults
  const startTime = stats.sleepStartTime || '23:00';
  const wakeTime = stats.sleepWakeTime || '08:15';
  const isBedtimeAlarmOn = stats.bedtimeAlarmEnabled !== undefined ? stats.bedtimeAlarmEnabled : true;
  const isWakeAlarmOn = stats.wakeAlarmEnabled !== undefined ? stats.wakeAlarmEnabled : true;
  const startParsed = from24h(startTime);
  const wakeParsed = from24h(wakeTime);
  const dur = calculateDuration(startTime, wakeTime);

  const HOURS_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const MINS_OPTIONS = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  return `
    <div id="vitals-modal-backdrop" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-fade-in cursor-pointer">
      <div class="bg-white rounded-t-[32px] p-6 shadow-2xl border-t border-gray-100 flex flex-col gap-5 animate-sheet-up cursor-default">
        
        <!-- Drag Handle -->
        <div class="w-10 h-1 rounded-full bg-gray-200 mx-auto -mt-2 mb-1"></div>

        <!-- Metric Switcher Tabs (Steps & Sleep) with Smooth Sliding Pill Indicator -->
        <div class="relative flex p-1 bg-gray-100/80 rounded-2xl select-none">
          <div id="vitals-tab-indicator" class="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] rounded-xl bg-white shadow-sm pointer-events-none transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" style="transform: translateX(${activeField === 'steps' ? '100%' : '0%'});"></div>
          <button data-vitals-tab="sleep" type="button" class="relative z-10 flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 flex items-center justify-center gap-1.5 ${
            activeField === 'sleep' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-700'
          }">
            <span class="material-symbols-outlined text-[15px]">bedtime</span>
            <span>Sleep</span>
          </button>
          <button data-vitals-tab="steps" type="button" class="relative z-10 flex-1 py-1.5 rounded-xl text-xs font-bold transition-colors duration-200 flex items-center justify-center gap-1.5 ${
            activeField === 'steps' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'
          }">
            <span class="material-symbols-outlined text-[15px]">directions_walk</span>
            <span>Steps</span>
          </button>
        </div>

        <form id="edit-single-vital-form" class="flex flex-col gap-4">

          <!-- Sliding Viewport: Smooth side-to-side translation -->
          <div class="w-full vitals-slider-viewport overflow-x-clip overflow-y-visible">
            <div id="vitals-slider-track" class="flex transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] w-full will-change-transform" style="transform: translateX(${activeField === 'steps' ? '-100%' : '0%'});">

              <!-- ================= 1. CLEAN MINIMALIST SLEEP PANEL ================= -->
              <div id="vitals-panel-sleep" class="w-full shrink-0 flex flex-col gap-3.5 pr-0.5 transition-opacity duration-200 ${activeField === 'sleep' ? 'opacity-100' : 'opacity-25 pointer-events-none'}">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#101317]">Sleep Schedule</h3>
                    <p class="text-xs text-gray-400">Bedtime and wake-up alarms</p>
                  </div>
                </div>

                <!-- Two Clean Minimalist Cards -->
                <div class="grid grid-cols-2 gap-3">
                  
                  <!-- Bedtime Card -->
                  <div class="bg-gray-50/70 hover:bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex flex-col gap-3 transition-colors">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                        <span class="material-symbols-outlined text-[16px] text-indigo-500">bedtime</span>
                        <span>Bedtime</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <button type="button" id="test-bedtime-chime-btn" title="Preview gentle chime" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-90 transition-all">
                          <span class="material-symbols-outlined text-[14px]">volume_up</span>
                        </button>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" id="vitals-bedtime-alarm-toggle" class="sr-only peer" ${isBedtimeAlarmOn ? 'checked' : ''}>
                          <div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#101317]"></div>
                        </label>
                      </div>
                    </div>

                    <!-- Direct Hour & Minute Controls with Custom Dropdowns -->
                    <div class="flex items-center justify-center gap-1.5 pt-0.5 relative">
                      
                      <!-- Hour Custom Dropdown (Upward) -->
                      <div class="relative custom-dropdown-wrap">
                        <input type="hidden" id="vitals-start-hour" value="${startParsed.h12 < 10 ? '0' + startParsed.h12 : startParsed.h12}">
                        <button type="button" class="time-dropdown-trigger flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-base font-bold text-[#101317] rounded-xl px-2.5 py-1.5 border border-gray-200 shadow-2xs hover:border-black active:scale-95 transition-all">
                          <span class="trigger-label">${startParsed.h12 < 10 ? '0' + startParsed.h12 : startParsed.h12}</span>
                          <span class="material-symbols-outlined text-[15px] text-gray-400 transition-transform dropdown-chevron">expand_less</span>
                        </button>
                        <div class="time-dropdown-menu hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-16 max-h-40 overflow-y-auto dropdown-slim-scroll bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-1 flex flex-col gap-0.5">
                          ${HOURS_OPTIONS.map(h => {
                            const valStr = h < 10 ? '0' + h : String(h);
                            const isSel = (startParsed.h12 === h);
                            return `
                              <button type="button" data-val="${valStr}" class="time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all ${isSel ? 'bg-[#101317] text-white shadow-2xs' : 'text-gray-700 hover:bg-gray-100'}">
                                ${valStr}
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>

                      <span class="text-base font-bold text-gray-300">:</span>

                      <!-- Minute Custom Dropdown (Upward) -->
                      <div class="relative custom-dropdown-wrap">
                        <input type="hidden" id="vitals-start-min" value="${startParsed.min < 10 ? '0' + startParsed.min : startParsed.min}">
                        <button type="button" class="time-dropdown-trigger flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-base font-bold text-[#101317] rounded-xl px-2.5 py-1.5 border border-gray-200 shadow-2xs hover:border-black active:scale-95 transition-all">
                          <span class="trigger-label">${startParsed.min < 10 ? '0' + startParsed.min : startParsed.min}</span>
                          <span class="material-symbols-outlined text-[15px] text-gray-400 transition-transform dropdown-chevron">expand_less</span>
                        </button>
                        <div class="time-dropdown-menu hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-16 max-h-40 overflow-y-auto dropdown-slim-scroll bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-1 flex flex-col gap-0.5">
                          ${MINS_OPTIONS.map(m => {
                            const valStr = m < 10 ? '0' + m : String(m);
                            const isSel = (startParsed.min === m);
                            return `
                              <button type="button" data-val="${valStr}" class="time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all ${isSel ? 'bg-[#101317] text-white shadow-2xs' : 'text-gray-700 hover:bg-gray-100'}">
                                ${valStr}
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>

                      <button type="button" id="vitals-start-ampm" class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#101317] text-white hover:bg-black active:scale-95 transition-all">
                        ${startParsed.ampm}
                      </button>
                    </div>
                  </div>

                  <!-- Wake Up Card -->
                  <div class="bg-gray-50/70 hover:bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex flex-col gap-3 transition-colors">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                        <span class="material-symbols-outlined text-[16px] text-amber-500">wb_sunny</span>
                        <span>Wake Up</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <button type="button" id="test-wake-chime-btn" title="Preview morning chime" class="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-amber-600 hover:bg-amber-50 active:scale-90 transition-all">
                          <span class="material-symbols-outlined text-[14px]">volume_up</span>
                        </button>
                        <label class="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" id="vitals-wake-alarm-toggle" class="sr-only peer" ${isWakeAlarmOn ? 'checked' : ''}>
                          <div class="w-8 h-4 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-[#101317]"></div>
                        </label>
                      </div>
                    </div>

                    <!-- Direct Hour & Minute Controls with Custom Dropdowns -->
                    <div class="flex items-center justify-center gap-1.5 pt-0.5 relative">
                      
                      <!-- Hour Custom Dropdown (Upward) -->
                      <div class="relative custom-dropdown-wrap">
                        <input type="hidden" id="vitals-wake-hour" value="${wakeParsed.h12 < 10 ? '0' + wakeParsed.h12 : wakeParsed.h12}">
                        <button type="button" class="time-dropdown-trigger flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-base font-bold text-[#101317] rounded-xl px-2.5 py-1.5 border border-gray-200 shadow-2xs hover:border-black active:scale-95 transition-all">
                          <span class="trigger-label">${wakeParsed.h12 < 10 ? '0' + wakeParsed.h12 : wakeParsed.h12}</span>
                          <span class="material-symbols-outlined text-[15px] text-gray-400 transition-transform dropdown-chevron">expand_less</span>
                        </button>
                        <div class="time-dropdown-menu hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-16 max-h-40 overflow-y-auto dropdown-slim-scroll bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-1 flex flex-col gap-0.5">
                          ${HOURS_OPTIONS.map(h => {
                            const valStr = h < 10 ? '0' + h : String(h);
                            const isSel = (wakeParsed.h12 === h);
                            return `
                              <button type="button" data-val="${valStr}" class="time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all ${isSel ? 'bg-[#101317] text-white shadow-2xs' : 'text-gray-700 hover:bg-gray-100'}">
                                ${valStr}
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>

                      <span class="text-base font-bold text-gray-300">:</span>

                      <!-- Minute Custom Dropdown (Upward) -->
                      <div class="relative custom-dropdown-wrap">
                        <input type="hidden" id="vitals-wake-min" value="${wakeParsed.min < 10 ? '0' + wakeParsed.min : wakeParsed.min}">
                        <button type="button" class="time-dropdown-trigger flex items-center justify-center gap-1 bg-white hover:bg-gray-50 text-base font-bold text-[#101317] rounded-xl px-2.5 py-1.5 border border-gray-200 shadow-2xs hover:border-black active:scale-95 transition-all">
                          <span class="trigger-label">${wakeParsed.min < 10 ? '0' + wakeParsed.min : wakeParsed.min}</span>
                          <span class="material-symbols-outlined text-[15px] text-gray-400 transition-transform dropdown-chevron">expand_less</span>
                        </button>
                        <div class="time-dropdown-menu hidden absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-16 max-h-40 overflow-y-auto dropdown-slim-scroll bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100 p-1 flex flex-col gap-0.5">
                          ${MINS_OPTIONS.map(m => {
                            const valStr = m < 10 ? '0' + m : String(m);
                            const isSel = (wakeParsed.min === m);
                            return `
                              <button type="button" data-val="${valStr}" class="time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all ${isSel ? 'bg-[#101317] text-white shadow-2xs' : 'text-gray-700 hover:bg-gray-100'}">
                                ${valStr}
                              </button>
                            `;
                          }).join('')}
                        </div>
                      </div>

                      <button type="button" id="vitals-wake-ampm" class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-[#101317] text-white hover:bg-black active:scale-95 transition-all">
                        ${wakeParsed.ampm}
                      </button>
                    </div>
                  </div>

                </div>

                <!-- Minimalist Duration Row -->
                <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 rounded-2xl border border-gray-100/80">
                  <span class="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px]">bedtime</span>
                    <span>Total Sleep</span>
                  </span>
                  <span id="sleep-duration-big" class="text-sm font-extrabold text-[#101317]">
                    ${dur.hours}h ${dur.mins}m
                  </span>
                </div>
              </div>

              <!-- ================= 2. CLEAN MINIMALIST STEPS PANEL ================= -->
              <div id="vitals-panel-steps" class="w-full shrink-0 flex flex-col gap-3.5 pl-0.5 transition-opacity duration-200 ${activeField === 'steps' ? 'opacity-100' : 'opacity-25 pointer-events-none'}">
                <div class="flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-bold text-[#101317]">Daily Steps</h3>
                    <p class="text-xs text-gray-400">Pedometer telemetry and target</p>
                  </div>
                </div>

                <!-- Steps Card matching Sleep Card height & style -->
                <div class="bg-gray-50/70 hover:bg-gray-50 rounded-2xl p-3.5 border border-gray-100 flex flex-col items-center justify-center gap-2.5 transition-colors">
                  <div class="flex flex-col items-center justify-center py-1">
                    <input
                      id="vitals-input-steps"
                      type="number"
                      min="0"
                      step="100"
                      value="${stats.steps}"
                      class="w-full text-center text-4xl font-extrabold text-[#101317] focus:outline-none bg-transparent"
                    />
                    <span class="text-xs font-medium text-gray-400 mt-1">Logged steps today</span>
                  </div>

                  <!-- Quick Step Chips -->
                  <div class="flex items-center justify-center gap-1.5">
                    <button type="button" data-add-steps="500" class="quick-step-chip px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 active:scale-95 transition-all shadow-2xs">+500</button>
                    <button type="button" data-add-steps="1000" class="quick-step-chip px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 active:scale-95 transition-all shadow-2xs">+1k</button>
                    <button type="button" data-add-steps="5000" class="quick-step-chip px-2.5 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-600 border border-blue-100 hover:bg-blue-50 active:scale-95 transition-all shadow-2xs">+5k</button>
                    <button type="button" id="vitals-reset-steps-btn" class="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-gray-200/70 text-gray-600 hover:bg-gray-200 active:scale-95 transition-all">Clear</button>
                  </div>
                </div>

                <!-- Daily Target summary banner -->
                <div class="flex items-center justify-between px-4 py-2.5 bg-gray-50/70 rounded-2xl border border-gray-100/80">
                  <span class="text-xs font-medium text-gray-400 flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[15px] text-blue-500">flag</span>
                    <span>Daily Goal</span>
                  </span>
                  <span class="text-sm font-extrabold text-[#101317]">
                    ${(stats.stepsTarget || 10000).toLocaleString()} steps
                  </span>
                </div>
              </div>

            </div>
          </div>

          <!-- Bottom Action Buttons -->
          <div class="flex items-center gap-2 pt-1">
            <button type="button" id="vitals-modal-cancel-btn" class="flex-1 h-11 rounded-2xl bg-gray-100 text-gray-600 font-bold text-xs hover:bg-gray-200 active:scale-95 transition-all">
              Cancel
            </button>
            <button type="submit" id="vitals-modal-save-btn" class="flex-1 h-11 rounded-2xl bg-[#101317] text-white font-bold text-xs hover:bg-black active:scale-95 transition-all">
              Save
            </button>
          </div>

        </form>

      </div>
    </div>
  `;
}

export function bindEditVitalsEvents() {
  function closeEditVitalsSmoothly(callback) {
    const backdrop = document.getElementById('vitals-modal-backdrop');
    const sheet = backdrop ? backdrop.querySelector('.animate-sheet-up, .bg-white') : null;

    if (backdrop && sheet) {
      backdrop.classList.remove('animate-fade-in');
      backdrop.classList.add('animate-backdrop-out');
      sheet.classList.remove('animate-sheet-up');
      sheet.classList.add('animate-sheet-down');

      setTimeout(() => {
        if (callback) callback();
        else store.toggleEditVitals(false);
      }, 260);
    } else {
      if (callback) callback();
      else store.toggleEditVitals(false);
    }
  }

  const cancelBtn = document.getElementById('vitals-modal-cancel-btn');
  if (cancelBtn) {
    cancelBtn.onclick = () => closeEditVitalsSmoothly();
  }

  // Close smoothly on outside backdrop click
  const backdrop = document.getElementById('vitals-modal-backdrop');
  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        closeEditVitalsSmoothly();
      }
    };
  }

  // Switch between tabs with smooth sliding side animation
  const sliderTrack = document.getElementById('vitals-slider-track');
  const sleepPanel = document.getElementById('vitals-panel-sleep');
  const stepsPanel = document.getElementById('vitals-panel-steps');
  const tabIndicator = document.getElementById('vitals-tab-indicator');
  const sleepTabBtn = document.querySelector('[data-vitals-tab="sleep"]');
  const stepsTabBtn = document.querySelector('[data-vitals-tab="steps"]');

  function setActiveTab(tab) {
    store.state.activeEditVitalsField = tab;
    closeAllDropdowns();

    if (sliderTrack) {
      if (tab === 'steps') {
        sliderTrack.style.transform = 'translateX(-100%)';
        if (tabIndicator) tabIndicator.style.transform = 'translateX(100%)';
        if (stepsPanel) {
          stepsPanel.classList.remove('opacity-25', 'pointer-events-none');
          stepsPanel.classList.add('opacity-100');
        }
        if (sleepPanel) {
          sleepPanel.classList.add('opacity-25', 'pointer-events-none');
          sleepPanel.classList.remove('opacity-100');
        }
        if (stepsTabBtn) {
          stepsTabBtn.classList.add('text-blue-600');
          stepsTabBtn.classList.remove('text-gray-400');
        }
        if (sleepTabBtn) {
          sleepTabBtn.classList.remove('text-indigo-600');
          sleepTabBtn.classList.add('text-gray-400');
        }
      } else {
        sliderTrack.style.transform = 'translateX(0%)';
        if (tabIndicator) tabIndicator.style.transform = 'translateX(0%)';
        if (sleepPanel) {
          sleepPanel.classList.remove('opacity-25', 'pointer-events-none');
          sleepPanel.classList.add('opacity-100');
        }
        if (stepsPanel) {
          stepsPanel.classList.add('opacity-25', 'pointer-events-none');
          stepsPanel.classList.remove('opacity-100');
        }
        if (sleepTabBtn) {
          sleepTabBtn.classList.add('text-indigo-600');
          sleepTabBtn.classList.remove('text-gray-400');
        }
        if (stepsTabBtn) {
          stepsTabBtn.classList.remove('text-blue-600');
          stepsTabBtn.classList.add('text-gray-400');
        }
      }
    }
  }

  document.querySelectorAll('[data-vitals-tab]').forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      const tab = btn.getAttribute('data-vitals-tab');
      if (tab) setActiveTab(tab);
    };
  });

  // Helper to read current start and wake 24h strings
  function getCurrentTimes() {
    const startH = document.getElementById('vitals-start-hour');
    const startM = document.getElementById('vitals-start-min');
    const startAmpmBtn = document.getElementById('vitals-start-ampm');
    const wakeH = document.getElementById('vitals-wake-hour');
    const wakeM = document.getElementById('vitals-wake-min');
    const wakeAmpmBtn = document.getElementById('vitals-wake-ampm');

    if (!startH || !startM || !startAmpmBtn || !wakeH || !wakeM || !wakeAmpmBtn) return null;

    const start24 = to24h(startH.value, startM.value, startAmpmBtn.textContent.trim());
    const wake24 = to24h(wakeH.value, wakeM.value, wakeAmpmBtn.textContent.trim());
    return { start24, wake24 };
  }

  function recalculateSleep() {
    const times = getCurrentTimes();
    if (!times) return;
    const dur = calculateDuration(times.start24, times.wake24);
    const bigDur = document.getElementById('sleep-duration-big');
    if (bigDur) {
      bigDur.textContent = `${dur.hours}h ${dur.mins}m`;
    }
  }

  // Custom Minimalist Dropdown Handlers
  const dropdownWraps = document.querySelectorAll('.custom-dropdown-wrap');

  function closeAllDropdowns() {
    dropdownWraps.forEach(wrap => {
      const menu = wrap.querySelector('.time-dropdown-menu');
      const chevron = wrap.querySelector('.dropdown-chevron');
      if (menu) menu.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    });
  }

  dropdownWraps.forEach(wrap => {
    const trigger = wrap.querySelector('.time-dropdown-trigger');
    const menu = wrap.querySelector('.time-dropdown-menu');
    const chevron = wrap.querySelector('.dropdown-chevron');
    const input = wrap.querySelector('input[type="hidden"]');
    const label = wrap.querySelector('.trigger-label');

    if (!trigger || !menu) return;

    trigger.onclick = (e) => {
      e.stopPropagation();
      const isCurrentlyOpen = !menu.classList.contains('hidden');
      closeAllDropdowns();
      if (!isCurrentlyOpen) {
        menu.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
        const activeItem = menu.querySelector('.bg-\\[\\#101317\\]');
        if (activeItem) {
          activeItem.scrollIntoView({ block: 'nearest' });
        }
      }
    };

    wrap.querySelectorAll('.time-dropdown-item').forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        const val = item.getAttribute('data-val');
        if (val) {
          if (input) input.value = val;
          if (label) label.textContent = val;

          // Update active styling
          wrap.querySelectorAll('.time-dropdown-item').forEach(btn => {
            btn.className = 'time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all text-gray-700 hover:bg-gray-100';
          });
          item.className = 'time-dropdown-item w-full py-1.5 px-1 rounded-xl text-xs font-bold text-center transition-all bg-[#101317] text-white shadow-2xs';

          closeAllDropdowns();
          recalculateSleep();
        }
      };
    });
  });

  // Close custom dropdowns when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown-wrap')) {
      closeAllDropdowns();
    }
  });

  // AM/PM button click toggles
  const startAmpmBtn = document.getElementById('vitals-start-ampm');
  if (startAmpmBtn) {
    startAmpmBtn.onclick = () => {
      startAmpmBtn.textContent = startAmpmBtn.textContent.trim() === 'PM' ? 'AM' : 'PM';
      recalculateSleep();
    };
  }

  const wakeAmpmBtn = document.getElementById('vitals-wake-ampm');
  if (wakeAmpmBtn) {
    wakeAmpmBtn.onclick = () => {
      wakeAmpmBtn.textContent = wakeAmpmBtn.textContent.trim() === 'AM' ? 'PM' : 'AM';
      recalculateSleep();
    };
  }

  // Steps quick increment chips
  document.querySelectorAll('.quick-step-chip').forEach(btn => {
    btn.onclick = () => {
      const addVal = parseInt(btn.getAttribute('data-add-steps'), 10) || 0;
      const stepsInput = document.getElementById('vitals-input-steps');
      if (stepsInput) {
        stepsInput.value = Math.max(0, (parseInt(stepsInput.value, 10) || 0) + addVal);
      }
    };
  });

  const resetStepsBtn = document.getElementById('vitals-reset-steps-btn');
  if (resetStepsBtn) {
    resetStepsBtn.onclick = () => {
      const stepsInput = document.getElementById('vitals-input-steps');
      if (stepsInput) stepsInput.value = 0;
    };
  }

  // Test chime buttons
  const testBedtimeBtn = document.getElementById('test-bedtime-chime-btn');
  if (testBedtimeBtn) {
    testBedtimeBtn.onclick = () => {
      playChime('bedtime');
      store.showToast('Playing Bedtime gentle chime 🌙', 'info');
    };
  }

  const testWakeBtn = document.getElementById('test-wake-chime-btn');
  if (testWakeBtn) {
    testWakeBtn.onclick = () => {
      playChime('wake');
      store.showToast('Playing Wake Up morning chime ☀️', 'info');
    };
  }

  // Submit form
  const form = document.getElementById('edit-single-vital-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();

      const updates = {};

      const stepsInput = document.getElementById('vitals-input-steps');
      if (stepsInput) {
        updates.steps = Math.max(0, parseInt(stepsInput.value, 10) || 0);
      }

      const times = getCurrentTimes();
      if (times) {
        const dur = calculateDuration(times.start24, times.wake24);
        updates.sleep = `${dur.hours}h ${dur.mins}m`;
        updates.sleepStartTime = times.start24;
        updates.sleepWakeTime = times.wake24;

        const bedtimeToggle = document.getElementById('vitals-bedtime-alarm-toggle');
        const wakeToggle = document.getElementById('vitals-wake-alarm-toggle');
        if (bedtimeToggle) updates.bedtimeAlarmEnabled = bedtimeToggle.checked;
        if (wakeToggle) updates.wakeAlarmEnabled = wakeToggle.checked;
      }

      closeEditVitalsSmoothly(() => {
        store.updateVitals(updates);
      });
    };
  }
}
