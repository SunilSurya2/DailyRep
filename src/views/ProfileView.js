import { store } from '../state/store.js';

export function renderProfileView() {
  const { user } = store.state;

  return `
    <div class="flex flex-col w-full pb-unit-3xl pt-2">
      <!-- Profile Header Card -->
      <div class="relative w-full rounded-3xl bg-surface-container-lowest p-unit-lg shadow-sm border border-gray-200 flex flex-col items-center text-center overflow-hidden mb-unit-md">
        <!-- Ambient Kinetic Glow Spot -->
        <div class="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none bg-blue-500/20"></div>
        <div class="absolute -bottom-8 -left-8 w-32 h-32 rounded-full blur-xl pointer-events-none bg-indigo-500/15"></div>
        
        <div class="relative mb-unit-sm">
          <div class="w-24 h-24 rounded-full p-1 bg-blue-600 shadow-xl shadow-blue-500/35">
            <img class="w-full h-full rounded-full object-cover" alt="Sarah Jenkins" src="${user.avatarUrl}" />
          </div>
          <button aria-label="Edit Profile Photo" class="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200">
            <span class="material-symbols-outlined text-[16px]">photo_camera</span>
          </button>
        </div>

        <!-- Identity details -->
        <div class="flex items-center gap-unit-2xs mb-unit-2xs">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-[#101317] tracking-tight font-extrabold">${user.fullName}</h2>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-unit-xs mb-unit-xs">
          <span class="text-gray-500 font-body-sm text-xs flex items-center gap-1 font-semibold">
            <span class="material-symbols-outlined text-[14px]">calendar_today</span>
            Member since Jan 2024
          </span>
        </div>

        <p class="text-gray-600 font-body-sm text-sm max-w-xs mb-unit-md leading-relaxed">
          Endurance runner & mindful movement enthusiast. Chasing the 50-day streak milestone.
        </p>

        <div class="flex items-center gap-unit-xs w-full">
          <button class="flex-1 h-11 rounded-full bg-blue-600 text-white font-label-md text-sm font-bold flex items-center justify-center gap-1 shadow-lg shadow-blue-500/25 active:scale-98 transition-all">
            <span class="material-symbols-outlined text-[18px]">edit</span>
            <span>Edit Profile</span>
          </button>
          <button aria-label="Share profile badge" class="w-11 h-11 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center active:scale-98 transition-all">
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
          <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">142</span>
          <span class="font-label-md text-xs text-gray-500">Workouts</span>
        </div>
        
        <div class="rounded-2xl p-unit-sm shadow-sm bg-white border border-gray-200 flex flex-col items-center text-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[18px] fill">eco</span>
          </div>
          <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">87%</span>
          <span class="font-label-md text-xs text-gray-500">Consistency</span>
        </div>
        
        <div class="rounded-2xl p-unit-sm shadow-sm bg-white border border-gray-200 flex flex-col items-center text-center">
          <div class="w-8 h-8 rounded-full flex items-center justify-center mb-1 bg-blue-50 text-blue-600">
            <span class="material-symbols-outlined text-[18px] fill">local_fire_department</span>
          </div>
          <div class="flex items-baseline gap-0.5">
            <span class="font-headline-md tracking-tight font-extrabold text-[#101317]">48</span>
            <span class="font-label-md text-xs text-gray-500 font-bold">d</span>
          </div>
          <span class="font-label-md text-xs text-gray-500">Best Streak</span>
        </div>
      </div>

      <!-- Daily Goals & Targets -->
      <div class="mb-unit-md">
        <div class="flex items-center justify-between mb-unit-xs px-1">
          <div class="flex items-center gap-1">
            <span class="material-symbols-outlined text-[18px] text-blue-600">flag</span>
            <h3 class="font-label-lg text-label-lg text-on-surface font-bold">Daily Goals & Targets</h3>
          </div>
          <button class="font-label-md text-xs text-blue-600 font-bold hover:underline">Customize</button>
        </div>
        
        <div class="grid grid-cols-2 gap-unit-xs">
          <div class="rounded-2xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-unit-xs">
              <div class="w-7 h-7 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                <span class="material-symbols-outlined text-[16px]">directions_walk</span>
              </div>
              <span class="material-symbols-outlined text-[16px] text-gray-400">edit</span>
            </div>
            <div>
              <span class="font-label-md text-xs block mb-0.5 text-gray-500">Daily Steps</span>
              <span class="font-headline-md font-extrabold text-[#101317]">10,000</span>
              <div class="w-full rounded-full h-1.5 mt-unit-xs overflow-hidden bg-gray-200">
                <div class="h-full rounded-full bg-blue-600" style="width: 82%;"></div>
              </div>
            </div>
          </div>
          
          <div class="rounded-2xl p-unit-md shadow-sm bg-white border border-gray-200 flex flex-col justify-between">
            <div class="flex items-center justify-between mb-unit-xs">
              <div class="w-7 h-7 rounded-full flex items-center justify-center bg-blue-50 text-blue-600">
                <span class="material-symbols-outlined text-[16px]">local_fire_department</span>
              </div>
              <span class="material-symbols-outlined text-[16px] text-gray-400">edit</span>
            </div>
            <div>
              <span class="font-label-md text-xs block mb-0.5 text-gray-500">Active Burn</span>
              <div class="flex items-baseline gap-1">
                <span class="font-headline-md font-extrabold text-[#101317]">750</span>
                <span class="font-label-md text-xs text-gray-500 font-bold">kcal</span>
              </div>
              <div class="w-full rounded-full h-1.5 mt-unit-xs overflow-hidden bg-gray-200">
                <div class="h-full rounded-full bg-blue-600" style="width: 65%;"></div>
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
          <button class="font-label-md text-xs text-blue-600 font-bold hover:underline flex items-center gap-0.5">
            <span class="material-symbols-outlined text-[14px]">add</span>
            <span>Pair New</span>
          </button>
        </div>
        
        <div class="rounded-3xl bg-white p-unit-sm shadow-sm border border-gray-200 space-y-1">
          <div class="flex items-center justify-between p-unit-sm rounded-2xl hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-unit-sm min-w-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 shrink-0">
                <span class="material-symbols-outlined text-[20px]">favorite</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-label-lg text-sm font-bold text-on-surface truncate">Apple Health / Health Connect</span>
                <span class="font-body-sm text-xs text-gray-500">Bi-directional real-time sync</span>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0 ml-2">
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
                <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>Connected
              </span>
              <span class="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
            </div>
          </div>

          <div class="flex items-center justify-between p-unit-sm rounded-2xl hover:bg-gray-50 transition-colors">
            <div class="flex items-center gap-unit-sm min-w-0">
              <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 shrink-0">
                <span class="material-symbols-outlined text-[20px]">ring_volume</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-label-lg text-sm font-bold text-on-surface truncate">Oura Ring Gen 3</span>
                <span class="font-body-sm text-xs text-gray-500">Sleep, HRV & Recovery readiness</span>
              </div>
            </div>
            <div class="flex items-center gap-1 shrink-0 ml-2">
              <span class="text-gray-400 font-label-md text-xs">Synced 12m ago</span>
              <span class="material-symbols-outlined text-[18px] text-gray-400">chevron_right</span>
            </div>
          </div>
        </div>
      </div>

      <!-- App Preferences -->
      <div class="mb-unit-md">
        <div class="flex items-center gap-1 mb-unit-xs px-1">
          <span class="material-symbols-outlined text-[18px] text-gray-500">tune</span>
          <h3 class="font-label-lg text-label-lg text-on-surface font-bold">Preferences & System</h3>
        </div>
        
        <div class="rounded-3xl bg-white shadow-sm border border-gray-200 divide-y divide-gray-100 overflow-hidden">
          <div class="flex items-center justify-between p-unit-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px] text-gray-600">notifications_active</span>
              <span class="font-label-lg text-sm font-semibold text-on-surface">Daily Push Reminders</span>
            </div>
            <span class="material-symbols-outlined text-[20px] text-blue-600">toggle_on</span>
          </div>

          <div class="flex items-center justify-between p-unit-md hover:bg-gray-50 transition-colors cursor-pointer">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px] text-gray-600">dark_mode</span>
              <span class="font-label-lg text-sm font-semibold text-on-surface">Theme Mode</span>
            </div>
            <span class="text-xs text-gray-500 font-semibold">Light Minimal</span>
          </div>

          <div class="flex items-center justify-between p-unit-md hover:bg-gray-50 transition-colors cursor-pointer text-red-600">
            <div class="flex items-center gap-unit-sm">
              <span class="material-symbols-outlined text-[20px]">logout</span>
              <span class="font-label-lg text-sm font-bold">Log Out</span>
            </div>
            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
          </div>
        </div>
      </div>

      <!-- App Brand Footer -->
      <div class="flex flex-col items-center justify-center py-unit-lg text-center gap-2">
        <div class="w-14 h-14 rounded-2xl bg-slate-950 p-2 border border-blue-500/20 shadow-lg shadow-blue-500/10 flex items-center justify-center">
          <img src="/logo.png" alt="DailyRep Logo" class="w-full h-full object-contain" />
        </div>
        <div class="flex flex-col">
          <span class="font-label-lg font-extrabold text-on-surface tracking-tight text-base">DailyRep</span>
          <span class="font-label-md text-xs text-on-surface-variant font-medium">Version 1.0.0 • Endless Momentum</span>
        </div>
      </div>
    </div>
  `;
}

export function bindProfileEvents() {}
