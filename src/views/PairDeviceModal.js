import { store } from '../state/store.js';

export function renderPairDeviceModal() {
  const {
    isPairDeviceModalOpen,
    activePairModalTab,
    connectedDevices,
    ecosystemApps,
    availableBleDevices,
    isScanningBluetooth,
    selectedAppForAuth,
    pairingInProgressId
  } = store.state;

  if (!isPairDeviceModalOpen) return '';

  const selectedApp = selectedAppForAuth
    ? ecosystemApps.find(a => a.id === selectedAppForAuth)
    : null;

  return `
    <div id="pair-device-modal-backdrop" class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-fade-in cursor-pointer">
      <div class="bg-surface-container-lowest rounded-t-[32px] p-unit-md shadow-2xl border-t border-gray-200 flex flex-col gap-unit-sm max-h-[92vh] overflow-y-auto animate-sheet-up cursor-default">
        
        <!-- Drag Handle -->
        <div class="w-12 h-1.5 rounded-full bg-gray-300 mx-auto -mt-1 mb-1"></div>

        <!-- Header -->
        <div class="flex items-center justify-between pb-1">
          <div class="flex items-center gap-2">
            <button id="pair-modal-close-btn" class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-gray-200 active:scale-90 transition-all">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
            <div class="flex flex-col">
              <div class="flex items-center gap-1.5">
                <h2 class="font-headline-md font-extrabold text-[#101317] text-lg">Connect & Pair</h2>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-50 text-blue-600 border border-blue-200">
                  ${connectedDevices.length} Active
                </span>
              </div>
              <span class="font-body-sm text-xs text-gray-500">Live Health Ecosystem & Hardware BLE</span>
            </div>
          </div>

          <button id="pair-modal-sync-all-btn" class="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 hover:bg-blue-100 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[15px]">sync</span>
            <span>Sync All</span>
          </button>
        </div>

        <!-- Tab Switcher -->
        <div class="flex p-1 bg-gray-100 rounded-2xl gap-1">
          <button data-pair-tab="apps" class="flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activePairModalTab === 'apps'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }">
            <span class="material-symbols-outlined text-[16px]">apps</span>
            <span>Apps & Cloud</span>
          </button>
          <button data-pair-tab="bluetooth" class="flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activePairModalTab === 'bluetooth'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }">
            <span class="material-symbols-outlined text-[16px]">bluetooth</span>
            <span>Pair BLE</span>
          </button>
          <button data-pair-tab="active" class="flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activePairModalTab === 'active'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-900'
          }">
            <span class="material-symbols-outlined text-[16px]">sensors</span>
            <span>Connected (${connectedDevices.length})</span>
          </button>
        </div>

        <!-- ================= TAB CONTENT ================= -->

        ${activePairModalTab === 'apps' ? `
          <!-- TAB 1: ECOSYSTEM APPLICATIONS -->
          <div class="flex flex-col gap-unit-sm mt-1">
            <div class="bg-blue-50/70 border border-blue-100 rounded-2xl p-3 flex items-start gap-2.5">
              <span class="material-symbols-outlined text-blue-600 text-[20px] shrink-0 mt-0.5">verified_user</span>
              <div class="text-xs text-blue-900 leading-relaxed">
                <strong>Zero-Loss Sync:</strong> Connect authorized health services to automatically pull daily burn, steps, heart rate variability, and rest telemetry.
              </div>
            </div>

            <div class="space-y-2.5">
              ${ecosystemApps.map(app => {
                const isConn = app.connected || connectedDevices.some(d => d.id === app.id);
                return `
                  <div class="rounded-2xl bg-white border border-gray-200 p-3.5 shadow-sm hover:border-gray-300 transition-all flex flex-col gap-2.5">
                    <div class="flex items-start justify-between gap-2">
                      <div class="flex items-center gap-3">
                        <div class="w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${app.colorClass}">
                          <span class="material-symbols-outlined text-[22px]">${app.icon}</span>
                        </div>
                        <div class="flex flex-col">
                          <div class="flex items-center gap-1.5">
                            <span class="font-headline-md text-sm font-extrabold text-gray-900">${app.name}</span>
                            ${isConn ? `
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                                Connected
                              </span>
                            ` : `
                              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
                                Available
                              </span>
                            `}
                          </div>
                          <span class="text-xs text-gray-500 font-medium">${app.category} • ${app.brand}</span>
                        </div>
                      </div>

                      <div class="shrink-0">
                        ${isConn ? `
                          <button data-manage-app="${app.id}" class="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-95 transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">tune</span>
                            <span>Access</span>
                          </button>
                        ` : `
                          <button data-connect-app="${app.id}" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">add_link</span>
                            <span>Connect</span>
                          </button>
                        `}
                      </div>
                    </div>

                    <p class="text-xs text-gray-600 leading-relaxed font-normal">${app.description}</p>

                    <div class="flex flex-wrap items-center gap-1.5 pt-1 border-t border-gray-100">
                      <span class="text-[11px] font-bold text-gray-400 mr-1">Data:</span>
                      ${app.telemetryTypes.map(t => `
                        <span class="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-gray-50 text-gray-600 border border-gray-200">
                          ${t}
                        </span>
                      `).join('')}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        ${activePairModalTab === 'bluetooth' ? `
          <!-- TAB 2: BLUETOOTH HARDWARE PAIRING -->
          <div class="flex flex-col gap-unit-sm mt-1">
            <!-- Radar Scanner Display -->
            <div class="rounded-3xl bg-gradient-to-b from-[#101317] to-[#1a202c] p-6 text-white flex flex-col items-center justify-center relative overflow-hidden shadow-lg border border-gray-800">
              
              <!-- Radar ripple rings -->
              ${isScanningBluetooth ? `
                <div class="absolute w-44 h-44 rounded-full border border-blue-500/30 animate-radar-wave-1 pointer-events-none"></div>
                <div class="absolute w-44 h-44 rounded-full border border-blue-400/30 animate-radar-wave-2 pointer-events-none"></div>
                <div class="absolute w-44 h-44 rounded-full border border-indigo-400/30 animate-radar-wave-3 pointer-events-none"></div>
              ` : ''}

              <!-- Radar Center Device Beacon -->
              <div class="w-16 h-16 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center relative z-10 ${isScanningBluetooth ? 'animate-pulse-glow' : ''}">
                <span class="material-symbols-outlined text-[32px] text-blue-400 ${isScanningBluetooth ? 'animate-bounce' : ''}">
                  ${isScanningBluetooth ? 'bluetooth_searching' : 'bluetooth'}
                </span>
              </div>

              <div class="flex flex-col items-center text-center mt-3 z-10">
                <span class="font-headline-md font-extrabold text-white text-base">
                  ${isScanningBluetooth ? 'Scanning BLE Radios...' : 'BLE Health Radar'}
                </span>
                <p class="text-xs text-gray-300 max-w-xs mt-1">
                  ${isScanningBluetooth
                    ? 'Listening for GATT broadcasts from chest straps, smart rings, watches, and smart scales...'
                    : 'Pair chest straps, power meters, smart scales, or rings for real-time live telemetry.'}
                </p>
              </div>

              <!-- Action button -->
              <div class="mt-4 z-10 flex items-center gap-2">
                ${isScanningBluetooth ? `
                  <button id="ble-stop-scan-btn" class="px-5 py-2 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white active:scale-95 transition-all flex items-center gap-1.5">
                    <span class="material-symbols-outlined text-[16px]">stop</span>
                    <span>Stop Scan</span>
                  </button>
                ` : `
                  <button id="ble-start-scan-btn" class="px-6 py-2.5 rounded-full text-xs font-extrabold bg-blue-500 hover:bg-blue-400 text-white shadow-lg shadow-blue-500/30 active:scale-95 transition-all flex items-center gap-2">
                    <span class="material-symbols-outlined text-[16px]">radar</span>
                    <span>Scan for Devices</span>
                  </button>
                `}
              </div>
            </div>

            <!-- Discovered Devices Section -->
            <div class="flex items-center justify-between px-1 pt-2">
              <span class="font-headline-md text-xs font-bold text-gray-500 uppercase tracking-wider">
                Discovered Nearby Devices (${availableBleDevices.length})
              </span>
              <span class="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                <span class="material-symbols-outlined text-[13px]">wifi_tethering</span>
                BLE 5.0+ Ready
              </span>
            </div>

            <div class="space-y-2">
              ${availableBleDevices.map(dev => {
                const isAlreadyPaired = connectedDevices.some(d => d.id === dev.id);
                const isPairing = pairingInProgressId === dev.id;

                return `
                  <div class="rounded-2xl bg-white border border-gray-200 p-3 shadow-sm hover:border-gray-300 transition-all flex items-center justify-between gap-2">
                    <div class="flex items-center gap-3 min-w-0">
                      <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <span class="material-symbols-outlined text-[20px]">${dev.icon}</span>
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span class="font-headline-md text-xs font-extrabold text-gray-900 truncate">${dev.name}</span>
                        <div class="flex items-center gap-2 text-[11px] text-gray-500">
                          <span>${dev.category}</span>
                          <span>•</span>
                          <span class="flex items-center gap-0.5 text-emerald-600 font-bold">
                            <span class="material-symbols-outlined text-[13px]">battery_5_bar</span>
                            ${dev.battery}%
                          </span>
                          <span>•</span>
                          <span class="text-gray-400 font-mono text-[10px]">${dev.rssi} dBm</span>
                        </div>
                      </div>
                    </div>

                    <div class="shrink-0">
                      ${isAlreadyPaired ? `
                        <span class="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <span class="material-symbols-outlined text-[14px]">check</span>
                          <span>Paired</span>
                        </span>
                      ` : isPairing ? `
                        <button disabled class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 flex items-center gap-1.5">
                          <span class="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                          <span>Pairing...</span>
                        </button>
                      ` : `
                        <button data-pair-ble-id="${dev.id}" class="pair-ble-btn px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-1">
                          <span class="material-symbols-outlined text-[14px]">link</span>
                          <span>Pair</span>
                        </button>
                      `}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        ` : ''}

        ${activePairModalTab === 'active' ? `
          <!-- TAB 3: CURRENTLY CONNECTED HARDWARE & APPS -->
          <div class="flex flex-col gap-unit-sm mt-1">
            <div class="flex items-center justify-between px-1">
              <span class="font-headline-md text-xs font-bold text-gray-500 uppercase tracking-wider">
                Active Telemetry Pipelines (${connectedDevices.length})
              </span>
              <span class="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Real-Time Listening
              </span>
            </div>

            <div class="space-y-2">
              ${connectedDevices.length === 0 ? `
                <div class="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                  <span class="material-symbols-outlined text-gray-400 text-[36px] mb-2">sensors_off</span>
                  <p class="text-xs text-gray-500 font-bold">No active sensors or applications connected.</p>
                  <p class="text-[11px] text-gray-400 mt-1">Switch to "Apps & Cloud" or "Pair BLE" to link telemetry.</p>
                </div>
              ` : connectedDevices.map(dev => `
                <div class="rounded-2xl bg-white border border-gray-200 p-3.5 shadow-sm hover:border-gray-300 transition-all flex items-center justify-between gap-3">
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 relative">
                      <span class="material-symbols-outlined text-[22px]">${dev.icon}</span>
                      <span class="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <div class="flex items-center gap-1.5">
                        <span class="font-headline-md text-sm font-extrabold text-gray-900 truncate">${dev.name}</span>
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          dev.type === 'app' ? 'bg-purple-50 text-purple-700' : 'bg-cyan-50 text-cyan-700'
                        }">
                          ${dev.type === 'app' ? 'Cloud App' : 'BLE Sensor'}
                        </span>
                      </div>
                      <div class="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                        <span>Synced: <strong class="text-gray-700">${dev.lastSync}</strong></span>
                        ${dev.battery ? `
                          <span>•</span>
                          <span class="text-emerald-600 font-semibold flex items-center gap-0.5">
                            <span class="material-symbols-outlined text-[13px]">battery_charging_full</span>
                            ${dev.battery}%
                          </span>
                        ` : ''}
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-1.5 shrink-0">
                    <button data-sync-dev-id="${dev.id}" class="sync-active-dev-btn w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center active:scale-95 transition-all" title="Sync now">
                      <span class="material-symbols-outlined text-[16px]">sync</span>
                    </button>
                    <button data-unpair-dev-id="${dev.id}" class="unpair-active-dev-btn w-8 h-8 rounded-full bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center active:scale-95 transition-all" title="Disconnect / Unpair">
                      <span class="material-symbols-outlined text-[16px]">link_off</span>
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- ================= APPLICATION AUTH / PERMISSION MODAL ================= -->
        ${selectedApp ? `
          <div class="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div class="bg-white w-full max-w-sm rounded-3xl p-unit-lg shadow-2xl border border-gray-200 flex flex-col gap-unit-md animate-sheet-up">
              
              <div class="flex items-center justify-between pb-2 border-b border-gray-100">
                <div class="flex items-center gap-2">
                  <div class="w-8 h-8 rounded-xl flex items-center justify-center ${selectedApp.colorClass}">
                    <span class="material-symbols-outlined text-[18px]">${selectedApp.icon}</span>
                  </div>
                  <h3 class="font-headline-md text-base font-extrabold text-gray-900">${selectedApp.name} Permissions</h3>
                </div>
                <button id="auth-modal-close-btn" class="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                  <span class="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <!-- Visual Handshake Connection Graphic -->
              <div class="flex items-center justify-around py-2 bg-gray-50 rounded-2xl border border-gray-200">
                <div class="flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm ${selectedApp.colorClass}">
                    <span class="material-symbols-outlined text-[24px]">${selectedApp.icon}</span>
                  </div>
                  <span class="text-[11px] font-extrabold text-gray-700 mt-1">${selectedApp.name}</span>
                </div>

                <div class="flex items-center text-blue-600 gap-1 animate-pulse">
                  <span class="material-symbols-outlined text-[16px]">swap_horiz</span>
                </div>

                <div class="flex flex-col items-center">
                  <div class="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-gray-200 shadow-sm p-1.5">
                    <img src="/logo.png" alt="DailyRep" class="w-full h-full object-contain" />
                  </div>
                  <span class="text-[11px] font-extrabold text-gray-700 mt-1">DailyRep</span>
                </div>
              </div>

              <!-- Permission Toggles -->
              <div class="flex flex-col gap-2.5">
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">Requested Access Scopes:</span>
                
                <label class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-blue-600">directions_walk</span>
                    <span class="text-xs font-bold text-gray-800">Daily Steps & Distance</span>
                  </div>
                  <input type="checkbox" id="auth-perm-steps" checked class="w-4 h-4 text-blue-600 rounded accent-blue-600" />
                </label>

                <label class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-orange-500">local_fire_department</span>
                    <span class="text-xs font-bold text-gray-800">Active Burn & Caloric Target</span>
                  </div>
                  <input type="checkbox" id="auth-perm-burn" checked class="w-4 h-4 text-blue-600 rounded accent-blue-600" />
                </label>

                <label class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-red-500">favorite</span>
                    <span class="text-xs font-bold text-gray-800">Heart Rate, Resting HR & HRV</span>
                  </div>
                  <input type="checkbox" id="auth-perm-hr" checked class="w-4 h-4 text-blue-600 rounded accent-blue-600" />
                </label>

                <label class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-indigo-500">bedtime</span>
                    <span class="text-xs font-bold text-gray-800">Sleep Stages & Readiness Score</span>
                  </div>
                  <input type="checkbox" id="auth-perm-sleep" checked class="w-4 h-4 text-blue-600 rounded accent-blue-600" />
                </label>

                <label class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 cursor-pointer select-none border border-gray-200">
                  <div class="flex items-center gap-2">
                    <span class="material-symbols-outlined text-[18px] text-emerald-600">fitness_center</span>
                    <span class="text-xs font-bold text-gray-800">Write DailyRep Completed Workouts</span>
                  </div>
                  <input type="checkbox" id="auth-perm-workouts" checked class="w-4 h-4 text-blue-600 rounded accent-blue-600" />
                </label>
              </div>

              <div class="text-[11px] text-gray-500 flex items-center gap-1.5 px-1">
                <span class="material-symbols-outlined text-[15px] text-emerald-600">shield</span>
                <span>Protected by local biometric sandbox. We never sell health data.</span>
              </div>

              <!-- Buttons -->
              <div class="flex flex-col gap-2 pt-1">
                <button id="auth-submit-grant-btn" class="w-full h-11 rounded-xl bg-blue-600 text-white font-extrabold text-xs shadow-md shadow-blue-500/25 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-1.5">
                  <span class="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Authorize & Connect</span>
                </button>

                ${selectedApp.connected ? `
                  <button id="auth-submit-disconnect-btn" class="w-full h-10 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-1">
                    <span class="material-symbols-outlined text-[16px]">link_off</span>
                    <span>Revoke & Disconnect</span>
                  </button>
                ` : `
                  <button id="auth-cancel-btn" class="w-full h-10 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200 active:scale-95 transition-all">
                    Cancel
                  </button>
                `}
              </div>
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}

export function bindPairDeviceEvents() {
  const closeBtn = document.getElementById('pair-modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => store.togglePairModal(false);
  }

  const backdrop = document.getElementById('pair-device-modal-backdrop');
  if (backdrop) {
    backdrop.onclick = (e) => {
      if (e.target === backdrop) {
        store.togglePairModal(false);
      }
    };
  }

  const syncAllBtn = document.getElementById('pair-modal-sync-all-btn');
  if (syncAllBtn) {
    syncAllBtn.onclick = () => store.syncAllDevices();
  }

  // Tab switching
  document.querySelectorAll('[data-pair-tab]').forEach(btn => {
    btn.onclick = () => {
      const tab = btn.getAttribute('data-pair-tab');
      if (tab) store.setPairModalTab(tab);
    };
  });

  // Connect App triggers
  document.querySelectorAll('[data-connect-app]').forEach(btn => {
    btn.onclick = () => {
      const appId = btn.getAttribute('data-connect-app');
      if (appId) store.openAppAuthModal(appId);
    };
  });

  // Manage App triggers
  document.querySelectorAll('[data-manage-app]').forEach(btn => {
    btn.onclick = () => {
      const appId = btn.getAttribute('data-manage-app');
      if (appId) store.openAppAuthModal(appId);
    };
  });

  // Auth Modal events
  const authCloseBtn = document.getElementById('auth-modal-close-btn');
  if (authCloseBtn) {
    authCloseBtn.onclick = () => store.closeAppAuthModal();
  }

  const authCancelBtn = document.getElementById('auth-cancel-btn');
  if (authCancelBtn) {
    authCancelBtn.onclick = () => store.closeAppAuthModal();
  }

  const authGrantBtn = document.getElementById('auth-submit-grant-btn');
  if (authGrantBtn) {
    authGrantBtn.onclick = () => {
      const { selectedAppForAuth } = store.state;
      if (!selectedAppForAuth) return;

      const permSteps = document.getElementById('auth-perm-steps');
      const permBurn = document.getElementById('auth-perm-burn');
      const permHr = document.getElementById('auth-perm-hr');
      const permSleep = document.getElementById('auth-perm-sleep');
      const permWorkouts = document.getElementById('auth-perm-workouts');

      const customPermissions = {
        steps: permSteps ? permSteps.checked : true,
        burn: permBurn ? permBurn.checked : true,
        hr: permHr ? permHr.checked : true,
        sleep: permSleep ? permSleep.checked : true,
        workouts: permWorkouts ? permWorkouts.checked : true
      };

      authGrantBtn.innerHTML = `
        <span class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
        <span>Securing Handshake...</span>
      `;
      authGrantBtn.disabled = true;

      setTimeout(() => {
        store.connectApp(selectedAppForAuth, customPermissions);
      }, 700);
    };
  }

  const authDisconnectBtn = document.getElementById('auth-submit-disconnect-btn');
  if (authDisconnectBtn) {
    authDisconnectBtn.onclick = () => {
      const { selectedAppForAuth } = store.state;
      if (selectedAppForAuth) {
        store.disconnectApp(selectedAppForAuth);
      }
    };
  }

  // Bluetooth scanning triggers
  const startScanBtn = document.getElementById('ble-start-scan-btn');
  if (startScanBtn) {
    startScanBtn.onclick = () => store.startBluetoothScan();
  }

  const stopScanBtn = document.getElementById('ble-stop-scan-btn');
  if (stopScanBtn) {
    stopScanBtn.onclick = () => store.stopBluetoothScan();
  }

  // BLE Pairing buttons
  document.querySelectorAll('.pair-ble-btn').forEach(btn => {
    btn.onclick = () => {
      const devId = btn.getAttribute('data-pair-ble-id');
      if (devId) store.pairBleDevice(devId);
    };
  });

  // Active Device Actions
  document.querySelectorAll('.sync-active-dev-btn').forEach(btn => {
    btn.onclick = () => {
      const devId = btn.getAttribute('data-sync-dev-id');
      if (devId) store.syncDevice(devId);
    };
  });

  document.querySelectorAll('.unpair-active-dev-btn').forEach(btn => {
    btn.onclick = () => {
      const devId = btn.getAttribute('data-unpair-dev-id');
      if (devId) store.unpairDevice(devId);
    };
  });
}
