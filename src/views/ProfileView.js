import { store } from '../state/store.js';

export function renderProfileView() {
  const { user, stats, settings, connectedDevices, habits, exercises, isEditProfileOpen, isCustomizeGoalsOpen } = store.state;

  // Real-time calculations for stats
  const completedHabitsCount = habits.filter(h => h.completed).length;
  const consistencyPercent = habits.length > 0 ? Math.round((completedHabitsCount / habits.length) * 100) : 85;
  const maxStreak = habits.reduce((max, h) => Math.max(max, h.streak || 0), 0);
  const totalCompletedReps = exercises.filter(e => e.done).length * 12 + 130;

  const stepsPct = Math.min(100, Math.round((stats.steps / stats.stepsTarget) * 100));
  const burnPct = Math.min(100, Math.round((stats.burn / stats.burnTarget) * 100));

  return `
    <div class="flex flex-col w-full pb-unit-3xl pt-2">
      <!-- Profile Header Card -->
      <div class="relative w-full rounded-3xl bg-surface-container-lowest p-unit-lg shadow-sm border border-gray-200 flex flex-col items-center text-center overflow-hidden mb-unit-md">
        <!-- Ambient Kinetic Glow Spot -->
        <div class="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none bg-blue-500/20"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl pointer-events-none bg-indigo-500/15"></div>
        
        <div class="relative mb-unit-sm">
          <div class="w-24 h-24 rounded-full p-1 bg-blue-600 shadow-xl shadow-blue-500/35">
            <img class="w-full h-full rounded-full object-cover" alt="${user.fullName}" src="${user.avatarUrl}" />
          </div>
          <button id="profile-edit-avatar-btn" aria-label="Edit Profile Photo" class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200 active:scale-95">
            <span class="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        <!-- Identity details -->
        <div class="flex items-center gap-unit-2xs mb-unit-2xs">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-[#101317] tracking-tight font-extrabold">${user.fullName}</h2>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-unit-xs mb-unit-xs">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
            ${user.tier}
          </span>
          <span class="text-gray-500 font-body-sm text-xs flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-[14px]">calendar_today</span>
            Member since ${user.memberSince || 'Jan 2024'}
          </span>
        </div>

        <p class="text-gray-600 font-body-sm text-sm max-w-xs mb-unit-md leading-relaxed">
          ${user.bio}
        </p>

        <div class="flex items-center gap-unit-xs w-full">
          <button id="profile-open-edit-btn" class="flex-1 h-11 rounded-full bg-blue-600 text-white font-label-md text-sm font-bold flex items-center justify-center gap-1 shadow-lg shadow-blue-500/25 active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Profile</span>
          </button>
          <button id="profile-share-badge-btn" aria-label="Share profile badge" class="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      <!-- Quick Stats Summary -->
      <div class="grid grid-cols-3 gap-unit-xs mb-unit-md">
        <div class="rounded-2xl p-unit-sm shadow-sm bg-white border border-gray-200 flex flex-col items-center text-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[18px]">fitness_center</span>
          </div>
          <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">${totalCompletedReps}</span>
          <span class="font-label-md text-xs text-gray-500">Reps & Sets</span>
        </div>
        
        <div class="rounded-2xl p-unit-sm shadow-sm bg-white border border-gray-200 flex flex-col items-center text-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[18px] fill">eco</span>
          </div>
          <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">${consistencyPercent}%</span>
          <span class="font-label-md text-xs text-gray-500">Consistency</span>
        </div>
        
        <div class="rounded-2xl p-unit-sm shadow-sm bg-white border border-gray-200 flex flex-col items-center text-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[18px] fill">local_fire_department</span>
          </div>
          <div class="flex items-baseline gap-0.5">
            <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">${maxStreak}</span>
            <span class="font-label-md text-xs text-gray-500 font-bold">d</span>
          </div>
          <span class="font-label-md text-xs text-gray-500">Top Streak</span>
        </div>
      </div>

      <!-- Daily Goals & Targets -->
      <div class="mb-unit-md">
        <div class="flex items-center justify-between mb-unit-xs px-1">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px] text-blue-600">flag</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-bold">Daily Goals & Targets</h3>
          </div>
          <button id="profile-open-goals-btn" class="font-label-md text-xs text-blue-600 font-bold hover:underline">Customize</button>
        </div>
        
        <div class="grid grid-cols-2 gap-unit-xs">
          <!-- Steps Goal -->
          <div class="rounded-2xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between cursor-pointer goal-card-trigger" data-target="goals">
            <div class="flex items-center justify-between mb-unit-xs">
              <div class="w-7 h-7 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                <span class="material-symbols-outlined text-[16px]">directions_walk</span>
              </div>
              <span class="material-symbols-outlined text-[16px] text-gray-400">edit</span>
            </div>
            <div>
              <span class="font-label-md text-xs block mb-0.5 text-gray-500">Daily Steps</span>
              <div class="flex items-baseline gap-1">
                <span class="font-headline-md font-extrabold text-[#101317]">${stats.steps.toLocaleString()}</span>
                <span class="text-xs text-gray-400 font-semibold">/ ${stats.stepsTarget.toLocaleString()}</span>
              </div>
              <div class="w-full rounded-full h-1.5 mt-unit-xs overflow-hidden bg-gray-200">
                <div class="h-full rounded-full bg-blue-600 transition-all duration-500" style="width: ${stepsPct}%;"></div>
              </div>
            </div>
          </div>
          
          <!-- Burn Goal -->
          <div class="rounded-2xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between cursor-pointer goal-card-trigger" data-target="goals">
            <div class="flex items-center justify-between mb-unit-xs">
              <div class="w-7 h-7 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                <span class="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
              <span class="material-symbols-outlined text-[16px] text-gray-400">edit</span>
            </div>
            <div>
              <span class="font-label-md text-xs block mb-0.5 text-gray-500">Active Burn</span>
              <div class="flex items-baseline gap-1">
                <span class="font-headline-md font-extrabold text-[#101317]">${stats.burn}</span>
                <span class="font-label-md text-xs text-gray-500 font-bold">/ ${stats.burnTarget} kcal</span>
              </div>
              <div class="w-full rounded-full h-1.5 mt-unit-xs overflow-hidden bg-gray-200">
                <div class="h-full rounded-full bg-blue-600 transition-all duration-500" style="width: ${burnPct}%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Connected Telemetry -->
      <div class="mb-unit-md">
        <div class="flex items-center justify-between mb-unit-xs px-1">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px] text-blue-600">sensors</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-bold">Connected Telemetry</h3>
          </div>
          <button id="profile-pair-device-btn" class="font-label-md text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[14px]">add</span>
            <span>Pair New</span>
          </button>
        </div>
        
        <div class="rounded-3xl bg-white p-unit-sm shadow-sm border border-gray-200 space-y-1">
          ${connectedDevices.map(dev => `
            <div class="flex items-center justify-between p-unit-sm rounded-2xl hover:bg-gray-50 transition-colors">
              <div class="flex items-center gap-unit-sm min-w-0">
                <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                  <span class="material-symbols-outlined text-[20px]">${dev.icon}</span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-label-lg text-sm font-bold text-on-surface truncate">${dev.name}</span>
                  <span class="font-body-sm text-xs text-gray-500">Synced: ${dev.lastSync}</span>
                </div>
              </div>
              <button data-sync-device="${dev.id}" class="sync-device-btn flex items-center gap-1 shrink-0 ml-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all">
                <span class="material-symbols-outlined text-[14px]">sync</span>
                <span>Sync</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- App Preferences -->
      <div class="mb-unit-md">
        <div class="flex items-center gap-1 mb-unit-xs px-1">
          <span class="material-symbols-outlined text-[18px] text-gray-500">tune</span>
          <h3 class="font-label-lg text-label-lg text-on-surface font-bold">Preferences & System</h3>
        </div>
        
        <div class="rounded-3xl bg-white shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          <!-- Push Reminders -->
          <div id="pref-toggle-push" class="flex items-center justify-between p-unit-md hover:bg-gray-50 transition-colors cursor-pointer select-none">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px] text-gray-600">notifications_active</span>
              <span class="font-label-lg text-sm font-semibold text-on-surface">Daily Push Reminders</span>
            </div>
            <span class="material-symbols-outlined text-[24px] ${settings.pushReminders ? 'text-blue-600' : 'text-gray-300'}">
              ${settings.pushReminders ? 'toggle_on' : 'toggle_off'}
            </span>
          </div>

          <!-- Theme Mode -->
          <div id="pref-toggle-theme" class="flex items-center justify-between p-unit-md hover:bg-gray-50 transition-colors cursor-pointer select-none">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px] text-gray-600">dark_mode</span>
              <span class="font-label-lg text-sm font-semibold text-on-surface">Theme Mode</span>
            </div>
            <div class="flex items-center gap-1">
              <span class="text-xs text-gray-500 font-semibold">${settings.themeMode}</span>
              <span class="material-symbols-outlined text-[16px] text-gray-400">sync_alt</span>
            </div>
          </div>

          <!-- Reset / Log Out -->
          <div id="pref-reset-data" class="flex items-center justify-between p-unit-md hover:bg-red-50 transition-colors cursor-pointer select-none text-red-600">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px]">restart_alt</span>
              <span class="font-label-lg text-sm font-bold">Reset Demo Data</span>
            </div>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- App Brand Footer -->
      <div class="flex flex-col items-center justify-center py-unit-lg text-center gap-2">
        <div class="h-10 w-16 flex items-center justify-center">
          <img src="/logo.png" alt="DailyRep Logo" class="w-full h-full object-contain filter drop-shadow-sm" />
        </div>
        <div class="flex flex-col">
          <span class="font-label-lg font-extrabold text-on-surface tracking-tight text-base">DailyRep</span>
          <span class="font-label-md text-xs text-on-surface-variant font-medium">Version 1.0.0 • Endless Momentum</span>
        </div>
      </div>

      <!-- Edit Profile Modal -->
      ${isEditProfileOpen ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div class="bg-white w-full max-w-sm rounded-3xl p-unit-lg shadow-2xl border border-gray-200 flex flex-col gap-unit-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">person</span>
                <h3 class="font-headline-md text-lg font-extrabold text-gray-900">Edit Athlete Profile</h3>
              </div>
              <button id="modal-close-profile-btn" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div class="flex flex-col gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input id="edit-profile-name" type="text" value="${user.fullName}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Athlete Tier</label>
                <input id="edit-profile-tier" type="text" value="${user.tier}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Bio</label>
                <textarea id="edit-profile-bio" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600 resize-none">${user.bio}</textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Avatar Image URL</label>
                <input id="edit-profile-avatar" type="url" value="${user.avatarUrl}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:outline-none focus:border-blue-600" />
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <button id="modal-cancel-profile-btn" class="flex-1 h-11 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200">Cancel</button>
              <button id="modal-save-profile-btn" class="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-95">Save Profile</button>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Customize Goals Modal -->
      ${isCustomizeGoalsOpen ? `
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div class="bg-white w-full max-w-sm rounded-3xl p-unit-lg shadow-2xl border border-gray-200 flex flex-col gap-unit-md">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-blue-600">tune</span>
                <h3 class="font-headline-md text-lg font-extrabold text-gray-900">Customize Daily Targets</h3>
              </div>
              <button id="modal-close-goals-btn" class="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <span class="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Steps Target</label>
                <input id="edit-goal-steps" type="number" step="500" value="${stats.stepsTarget}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Active Burn (kcal)</label>
                <input id="edit-goal-burn" type="number" step="50" value="${stats.burnTarget}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Move Minutes</label>
                <input id="edit-goal-move" type="number" step="5" value="${stats.moveTarget}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>

              <div>
                <label class="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Water Target (L)</label>
                <input id="edit-goal-water" type="number" step="0.25" value="${stats.waterTarget}" class="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold focus:outline-none focus:border-blue-600" />
              </div>
            </div>

            <div class="flex items-center gap-2 pt-2">
              <button id="modal-cancel-goals-btn" class="flex-1 h-11 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs hover:bg-gray-200">Cancel</button>
              <button id="modal-save-goals-btn" class="flex-1 h-11 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/25 active:scale-95">Save Targets</button>
            </div>
          </div>
        </div>
      ` : ''}
    </div>
  `;
}

export function bindProfileEvents() {
  // Edit Profile triggers
  const openEditBtn = document.getElementById('profile-open-edit-btn');
  if (openEditBtn) {
    openEditBtn.onclick = () => store.toggleEditProfile(true);
  }

  const editAvatarBtn = document.getElementById('profile-edit-avatar-btn');
  if (editAvatarBtn) {
    editAvatarBtn.onclick = () => store.toggleEditProfile(true);
  }

  const closeProfileBtn = document.getElementById('modal-close-profile-btn');
  if (closeProfileBtn) {
    closeProfileBtn.onclick = () => store.toggleEditProfile(false);
  }

  const cancelProfileBtn = document.getElementById('modal-cancel-profile-btn');
  if (cancelProfileBtn) {
    cancelProfileBtn.onclick = () => store.toggleEditProfile(false);
  }

  const saveProfileBtn = document.getElementById('modal-save-profile-btn');
  if (saveProfileBtn) {
    saveProfileBtn.onclick = () => {
      const nameInput = document.getElementById('edit-profile-name');
      const tierInput = document.getElementById('edit-profile-tier');
      const bioInput = document.getElementById('edit-profile-bio');
      const avatarInput = document.getElementById('edit-profile-avatar');

      const fullName = nameInput ? nameInput.value.trim() : '';
      if (!fullName) {
        store.showToast('Please enter your full name', 'error');
        return;
      }

      store.updateProfile({
        fullName,
        name: fullName.split(' ')[0],
        tier: tierInput ? tierInput.value.trim() : 'Athlete',
        bio: bioInput ? bioInput.value.trim() : '',
        avatarUrl: avatarInput && avatarInput.value.trim() ? avatarInput.value.trim() : store.state.user.avatarUrl
      });
    };
  }

  // Customize Goals triggers
  const openGoalsBtn = document.getElementById('profile-open-goals-btn');
  if (openGoalsBtn) {
    openGoalsBtn.onclick = () => store.toggleCustomizeGoals(true);
  }

  document.querySelectorAll('.goal-card-trigger').forEach(card => {
    card.onclick = () => store.toggleCustomizeGoals(true);
  });

  const closeGoalsBtn = document.getElementById('modal-close-goals-btn');
  if (closeGoalsBtn) {
    closeGoalsBtn.onclick = () => store.toggleCustomizeGoals(false);
  }

  const cancelGoalsBtn = document.getElementById('modal-cancel-goals-btn');
  if (cancelGoalsBtn) {
    cancelGoalsBtn.onclick = () => store.toggleCustomizeGoals(false);
  }

  const saveGoalsBtn = document.getElementById('modal-save-goals-btn');
  if (saveGoalsBtn) {
    saveGoalsBtn.onclick = () => {
      const stepsInput = document.getElementById('edit-goal-steps');
      const burnInput = document.getElementById('edit-goal-burn');
      const moveInput = document.getElementById('edit-goal-move');
      const waterInput = document.getElementById('edit-goal-water');

      store.updateDailyGoals({
        stepsTarget: stepsInput ? stepsInput.value : store.state.stats.stepsTarget,
        burnTarget: burnInput ? burnInput.value : store.state.stats.burnTarget,
        moveTarget: moveInput ? moveInput.value : store.state.stats.moveTarget,
        waterTarget: waterInput ? waterInput.value : store.state.stats.waterTarget
      });
    };
  }

  // Share profile badge
  const shareBtn = document.getElementById('profile-share-badge-btn');
  if (shareBtn) {
    shareBtn.onclick = () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${store.state.user.fullName} • DailyRep Athlete Profile`);
      }
      store.showToast('Profile badge copied to clipboard!', 'success');
    };
  }

  // Connected Devices Sync
  document.querySelectorAll('.sync-device-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-sync-device');
      if (id) store.syncDevice(id);
    };
  });

  const pairDeviceBtn = document.getElementById('profile-pair-device-btn');
  if (pairDeviceBtn) {
    pairDeviceBtn.onclick = () => {
      store.showToast('Scanning for nearby BLE health telemetry devices...', 'info');
    };
  }

  // Preferences Toggles
  const prefPush = document.getElementById('pref-toggle-push');
  if (prefPush) {
    prefPush.onclick = () => store.togglePushReminders();
  }

  const prefTheme = document.getElementById('pref-toggle-theme');
  if (prefTheme) {
    prefTheme.onclick = () => store.toggleTheme();
  }

  const prefReset = document.getElementById('pref-reset-data');
  if (prefReset) {
    prefReset.onclick = () => {
      if (confirm('Are you sure you want to reset all account and habit data back to demo defaults?')) {
        store.resetAllData();
      }
    };
  }
}
