import { store } from '../state/store.js';

let selectedCategory = 'all';
let isAddExerciseOpen = false;
let activeSuggestedCategory = 'biceps';

const SUGGESTED_CATEGORIES = [
  { id: 'biceps', label: 'Biceps', icon: 'fitness_center' },
  { id: 'triceps', label: 'Triceps', icon: 'front_hand' },
  { id: 'shoulder', label: 'Shoulder', icon: 'accessibility_new' },
  { id: 'leg', label: 'Leg', icon: 'directions_walk' },
  { id: 'chest', label: 'Chest', icon: 'sports_gymnastics' },
  { id: 'back', label: 'Back', icon: 'exercise' }
];

const SUGGESTED_EXERCISES_BY_CATEGORY = {
  biceps: [
    {
      name: 'Dumbbell Biceps Curl',
      category: 'biceps',
      catLabel: 'Overall Bicep Mass',
      sets: 4,
      reps: 10,
      weight: 16,
      scheme: '4 Sets • 10 Reps • 16kg',
      image: '/exercises/bicep_dumbbell.jpg',
      tag: 'Classic Dumbbell'
    },
    {
      name: 'Hammer Curl',
      category: 'biceps',
      catLabel: 'Brachialis & Forearms',
      sets: 4,
      reps: 10,
      weight: 18,
      scheme: '4 Sets • 10 Reps • 18kg',
      image: '/exercises/bicep_hands_dumbbell.jpg',
      tag: 'Brachialis'
    },
    {
      name: 'Barbell Curl',
      category: 'biceps',
      catLabel: 'Heavy Mass & Density',
      sets: 4,
      reps: 8,
      weight: 35,
      scheme: '4 Sets • 8 Reps • 35kg',
      image: '/exercises/bicep_curl.jpg',
      tag: 'Barbell Peak'
    },
    {
      name: 'EZ-Bar Curl',
      category: 'biceps',
      catLabel: 'Semi-Supinated Power',
      sets: 4,
      reps: 10,
      weight: 30,
      scheme: '4 Sets • 10 Reps • 30kg',
      image: '/exercises/bicep_curl_barbell.jpg',
      tag: 'EZ Bar Peak'
    },
    {
      name: 'Preacher Curl',
      category: 'biceps',
      catLabel: 'Strict Short-Head Focus',
      sets: 3,
      reps: 12,
      weight: 24,
      scheme: '3 Sets • 12 Reps • 24kg',
      image: '/exercises/bicep_preacher.jpg',
      tag: 'Strict Isolation'
    },
    {
      name: 'Incline Dumbbell Curl',
      category: 'biceps',
      catLabel: 'Long Head Stretch',
      sets: 3,
      reps: 12,
      weight: 14,
      scheme: '3 Sets • 12 Reps • 14kg',
      image: '/exercises/bicep_dumbbell.jpg',
      tag: 'Long Head'
    },
    {
      name: 'Concentration Curl',
      category: 'biceps',
      catLabel: 'Peak Flex Contraction',
      sets: 3,
      reps: 12,
      weight: 14,
      scheme: '3 Sets • 12 Reps • 14kg',
      image: '/exercises/concentration_curl.jpg',
      tag: 'Peak Squeeze'
    },
    {
      name: 'Cable Biceps Curl',
      category: 'biceps',
      catLabel: 'Constant Tension Range',
      sets: 4,
      reps: 12,
      weight: 25,
      scheme: '4 Sets • 12 Reps • 25kg',
      image: '/exercises/cable_curl.jpg',
      tag: 'Cable Tension'
    },
    {
      name: 'Spider Curl',
      category: 'biceps',
      catLabel: 'Chest-Supported Peak',
      sets: 3,
      reps: 10,
      weight: 20,
      scheme: '3 Sets • 10 Reps • 20kg',
      image: '/exercises/spider_curl.jpg',
      tag: 'Spider Peak'
    },
    {
      name: 'Reverse Curl',
      category: 'biceps',
      catLabel: 'Brachioradialis & Grip',
      sets: 3,
      reps: 12,
      weight: 20,
      scheme: '3 Sets • 12 Reps • 20kg',
      image: '/exercises/reverse_curl.jpg',
      tag: 'Reverse Grip'
    }
  ],
  triceps: [
    {
      name: 'Tricep Rope Pushdown',
      category: 'triceps',
      catLabel: 'Lateral Horseshoe Squeeze',
      sets: 4,
      reps: 15,
      weight: 27,
      scheme: '4 Sets • 15 Reps • 27kg',
      image: '/exercises/battleropes.jpg',
      tag: 'Horseshoe Peak'
    },
    {
      name: 'Lying Skull Crushers',
      category: 'triceps',
      catLabel: 'Long Head Extension',
      sets: 3,
      reps: 10,
      weight: 32,
      scheme: '3 Sets • 10 Reps • 32kg',
      image: '/exercises/bench.jpg',
      tag: 'Long Head'
    },
    {
      name: 'Close-Grip Bench Press',
      category: 'triceps',
      catLabel: 'Compound Tricep Power',
      sets: 5,
      reps: 6,
      weight: 70,
      scheme: '5 Sets • 6 Reps • 70kg',
      image: '/exercises/bench.jpg',
      tag: 'Heavy Power'
    },
    {
      name: 'Overhead Dumbbell Extension',
      category: 'triceps',
      catLabel: 'Deep Fascia Elongation',
      sets: 3,
      reps: 12,
      weight: 24,
      scheme: '3 Sets • 12 Reps • 24kg',
      image: '/exercises/shoulder.jpg',
      tag: 'Fascia Stretch'
    },
    {
      name: 'Parallel Bar Dips',
      category: 'triceps',
      catLabel: 'Lockout Strength & Density',
      sets: 4,
      reps: 8,
      weight: 15,
      scheme: '4 Sets • 8 Reps • +15kg',
      image: '/exercises/pullup.jpg',
      tag: 'Lockout Density'
    }
  ],
  shoulder: [
    {
      name: 'Overhead Military Press',
      category: 'shoulder',
      catLabel: 'Anterior Delt Power',
      sets: 5,
      reps: 5,
      weight: 55,
      scheme: '5 Sets • 5 Reps • 55kg',
      image: '/exercises/shoulder.jpg',
      tag: 'Heavy Overhead'
    },
    {
      name: 'Dumbbell Lateral Raise',
      category: 'shoulder',
      catLabel: 'Medial Deltoid Cap Width',
      sets: 4,
      reps: 16,
      weight: 10,
      scheme: '4 Sets • 16 Reps • 10kg',
      image: '/exercises/shoulder.jpg',
      tag: 'Medial Width'
    },
    {
      name: 'Face Pulls with Rope',
      category: 'shoulder',
      catLabel: 'Posterior Delts & Posture',
      sets: 3,
      reps: 18,
      weight: 25,
      scheme: '3 Sets • 18 Reps • 25kg',
      image: '/exercises/battleropes.jpg',
      tag: 'Rotator Cuff'
    },
    {
      name: 'Incline Rear Delt Flyes',
      category: 'shoulder',
      catLabel: 'Scapular Posterior Squeeze',
      sets: 3,
      reps: 14,
      weight: 9,
      scheme: '3 Sets • 14 Reps • 9kg',
      image: '/exercises/bench.jpg',
      tag: 'Rear Delt'
    },
    {
      name: 'Arnold Dumbbell Press',
      category: 'shoulder',
      catLabel: 'Continuous Rotational Load',
      sets: 4,
      reps: 9,
      weight: 20,
      scheme: '4 Sets • 9 Reps • 20kg',
      image: '/exercises/shoulder.jpg',
      tag: 'Full Deltoid'
    }
  ],
  leg: [
    {
      name: 'Barbell Back Squat',
      category: 'leg',
      catLabel: 'Quad & Glute Drive',
      sets: 5,
      reps: 5,
      weight: 100,
      scheme: '5 Sets • 5 Reps • 100kg',
      image: '/exercises/squat.jpg',
      tag: 'Compound King'
    },
    {
      name: 'Romanian Deadlift (RDL)',
      category: 'leg',
      catLabel: 'Hamstrings & Glute Stretch',
      sets: 4,
      reps: 8,
      weight: 85,
      scheme: '4 Sets • 8 Reps • 85kg',
      image: '/exercises/deadlift.jpg',
      tag: 'Posterior Chain'
    },
    {
      name: 'Walking Dumbbell Lunges',
      category: 'leg',
      catLabel: 'Unilateral Balance & Quads',
      sets: 3,
      reps: 14,
      weight: 18,
      scheme: '3 Sets • 14 Reps • 18kg',
      image: '/exercises/lunge.jpg',
      tag: 'Unilateral'
    },
    {
      name: 'Bulgarian Split Squat',
      category: 'leg',
      catLabel: 'Deep Hip & Quad Loading',
      sets: 4,
      reps: 10,
      weight: 16,
      scheme: '4 Sets • 10 Reps • 16kg',
      image: '/exercises/lunge.jpg',
      tag: 'Deep Loading'
    },
    {
      name: 'Standing Calf Raises',
      category: 'leg',
      catLabel: 'Gastrocnemius Power Drive',
      sets: 4,
      reps: 20,
      weight: 60,
      scheme: '4 Sets • 20 Reps • 60kg',
      image: '/exercises/boxjump.jpg',
      tag: 'Calf Burnout'
    }
  ],
  chest: [
    {
      name: 'Barbell Flat Bench Press',
      category: 'chest',
      catLabel: 'Mid-Pectoral Power',
      sets: 5,
      reps: 5,
      weight: 90,
      scheme: '5 Sets • 5 Reps • 90kg',
      image: '/exercises/bench.jpg',
      tag: 'Heavy Power'
    },
    {
      name: 'Incline Dumbbell Press',
      category: 'chest',
      catLabel: 'Upper Clavicular Pecs',
      sets: 4,
      reps: 8,
      weight: 28,
      scheme: '4 Sets • 8 Reps • 28kg',
      image: '/exercises/bench.jpg',
      tag: 'Upper Clavicular'
    },
    {
      name: 'Weighted Chest Dips',
      category: 'chest',
      catLabel: 'Lower Sternal Pec Focus',
      sets: 3,
      reps: 10,
      weight: 15,
      scheme: '3 Sets • 10 Reps • +15kg',
      image: '/exercises/pullup.jpg',
      tag: 'Lower Pecs'
    },
    {
      name: 'Standing Cable Pec Flyes',
      category: 'chest',
      catLabel: 'Continuous Tension Contraction',
      sets: 3,
      reps: 16,
      weight: 18,
      scheme: '3 Sets • 16 Reps • 18kg',
      image: '/exercises/battleropes.jpg',
      tag: 'Isolation'
    },
    {
      name: 'Decline Dumbbell Press',
      category: 'chest',
      catLabel: 'Lower Sternal Chest Shelf',
      sets: 4,
      reps: 11,
      weight: 26,
      scheme: '4 Sets • 11 Reps • 26kg',
      image: '/exercises/bench.jpg',
      tag: 'Lower Shelf'
    }
  ],
  back: [
    {
      name: 'Conventional Deadlift',
      category: 'back',
      catLabel: 'Entire Posterior Chain',
      sets: 4,
      reps: 4,
      weight: 120,
      scheme: '4 Sets • 4 Reps • 120kg',
      image: '/exercises/deadlift.jpg',
      tag: 'Posterior King'
    },
    {
      name: 'Wide-Grip Pull-Up',
      category: 'back',
      catLabel: 'Upper Lat V-Taper Width',
      sets: 4,
      reps: 10,
      weight: 0,
      scheme: '4 Sets • 10 Reps • Bodyweight',
      image: '/exercises/pullup.jpg',
      tag: 'V-Taper Width'
    },
    {
      name: 'Barbell Bent-Over Row',
      category: 'back',
      catLabel: 'Lat & Rhomboid Thickness',
      sets: 4,
      reps: 7,
      weight: 75,
      scheme: '4 Sets • 7 Reps • 75kg',
      image: '/exercises/deadlift.jpg',
      tag: 'Lat Thickness'
    },
    {
      name: 'Seated Cable Row',
      category: 'back',
      catLabel: 'Scapular Retraction & Traps',
      sets: 3,
      reps: 13,
      weight: 60,
      scheme: '3 Sets • 13 Reps • 60kg',
      image: '/exercises/battleropes.jpg',
      tag: 'Scapula Retract'
    },
    {
      name: 'Single-Arm Dumbbell Row',
      category: 'back',
      catLabel: 'Unilateral Lat Stretch & Flare',
      sets: 3,
      reps: 9,
      weight: 32,
      scheme: '3 Sets • 9 Reps • 32kg',
      image: '/exercises/kettlebell.jpg',
      tag: 'Unilateral Lat'
    }
  ]
};

export function renderFitnessView() {
  const { exercises } = store.state;
  const completedCount = exercises.filter(e => e.done).length;
  const targetPct = exercises.length > 0 ? Math.round((completedCount / exercises.length) * 100) : 0;

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'biceps', label: 'Biceps' },
    { id: 'triceps', label: 'Triceps' },
    { id: 'shoulder', label: 'Shoulder' },
    { id: 'leg', label: 'Leg' },
    { id: 'chest', label: 'Chest' },
    { id: 'back', label: 'Back' }
  ];

  const filteredExercises = selectedCategory === 'all'
    ? exercises
    : exercises.filter(e => e.cat === selectedCategory);

  return `
    <div class="flex flex-col w-full gap-unit-lg pb-unit-3xl pt-2">
      <!-- Interactive Category Filter Bar -->
      <section class="flex items-center gap-unit-xs overflow-x-auto no-scrollbar -mx-margin-mobile px-margin-mobile py-unit-2xs">
        ${categories.map(c => {
          const isActive = selectedCategory === c.id;
          const cls = isActive 
            ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
            : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50';
          return `
            <button data-cat="${c.id}" class="fitness-filter-btn px-unit-lg py-unit-xs rounded-full font-label-lg text-label-lg transition-all font-semibold whitespace-nowrap active:scale-95 ${cls}">
              ${c.label}
            </button>
          `;
        }).join('')}
      </section>

      <!-- Weekly Target Summary Banner -->
      <section class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-sm">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-unit-xs">
            <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <span class="material-symbols-outlined text-[18px] fill">bolt</span>
            </div>
            <div class="flex flex-col">
              <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Daily Routine Progress</span>
              <span class="font-headline-md text-headline-md text-on-surface font-bold">${completedCount} of ${exercises.length} logged</span>
            </div>
          </div>
          <span class="font-label-lg text-label-lg text-blue-600 font-bold bg-blue-50 px-unit-xs py-unit-2xs rounded-full">
            ${targetPct}% Done
          </span>
        </div>
        
        <div class="flex flex-col gap-unit-2xs mt-unit-2xs">
          <div class="w-full bg-surface-container h-2.5 rounded-full overflow-hidden flex">
            <div class="bg-blue-600 h-full rounded-full transition-all duration-500" style="width: ${targetPct}%;"></div>
          </div>
          <div class="flex justify-between text-on-surface-variant font-label-md text-xs pt-unit-2xs font-semibold">
            <span class="${targetPct >= 20 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Warmup</span>
            <span class="${targetPct >= 50 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Compound</span>
            <span class="${targetPct >= 75 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Metabolic</span>
            <span class="${targetPct >= 100 ? 'text-blue-600 font-bold' : 'text-gray-400'}">Cooldown 🎯</span>
          </div>
        </div>
      </section>

      <!-- Featured Workout Hero Card -->
      <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101317] via-[#1a202c] to-[#101317] text-white shadow-xl flex flex-col justify-between min-h-[260px] p-unit-lg border border-gray-800">
        <div class="absolute -top-10 -right-10 w-48 h-48 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <div class="relative z-10 flex items-start justify-between gap-unit-sm">
          <div class="flex flex-wrap gap-unit-2xs">
            <span class="bg-blue-600 text-white font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full font-bold uppercase tracking-wider flex items-center gap-1 text-[10px]">
              <span class="material-symbols-outlined text-[14px]">local_fire_department</span> Featured
            </span>
            <span class="bg-white/10 backdrop-blur-md text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full font-medium text-[11px]">
              Intermediate
            </span>
          </div>
          <button id="fitness-play-featured-btn" aria-label="Start Workout" class="w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-500/40 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform">
            <span class="material-symbols-outlined text-[26px] fill">play_arrow</span>
          </button>
        </div>

        <div class="relative z-10 flex flex-col gap-unit-xs my-unit-sm">
          <h2 class="font-headline-lg-mobile text-headline-lg-mobile text-white font-bold tracking-tight">
            Full-Body Dynamic Hypertrophy
          </h2>
          <div class="flex items-center gap-unit-md text-white/80 font-body-sm text-body-sm">
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">timer</span> 45 min
            </span>
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">local_fire_department</span> 420 kcal
            </span>
            <span class="flex items-center gap-unit-2xs">
              <span class="material-symbols-outlined text-[16px] text-blue-400">fitness_center</span> 12 Sets
            </span>
          </div>
        </div>

        <div class="relative z-10 flex items-center gap-unit-xs pt-unit-xs">
          <span class="text-white/70 font-label-md text-label-md text-[11px]">Targets:</span>
          <div class="flex items-center gap-unit-2xs">
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Legs</span>
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Core</span>
            <span class="bg-white/10 backdrop-blur-sm text-white/90 font-label-md text-label-md px-unit-xs py-unit-2xs rounded-full text-[11px]">Shoulders</span>
          </div>
        </div>
      </section>

      <!-- Today's Workout Routine List -->
      <section class="bg-surface-container-lowest rounded-3xl p-unit-lg shadow-sm border border-surface-container-high/50 flex flex-col gap-unit-md">
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider text-[11px] font-bold">Active Routine</span>
            <h3 class="font-headline-md text-headline-md text-on-surface font-bold">Today's Session Movements</h3>
          </div>
          <button id="fitness-toggle-add-btn" class="flex items-center gap-1 font-label-md text-xs text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full font-bold hover:bg-blue-100 active:scale-95 transition-all">
            <span class="material-symbols-outlined text-[16px]">add</span>
            <span>Add Movement</span>
          </button>
        </div>

        <!-- Add Exercise Inline Panel with Suggested Movements -->
        ${isAddExerciseOpen ? `
          <div class="p-4 rounded-3xl bg-blue-50/80 border border-blue-200/80 flex flex-col gap-3.5 animate-fade-in shadow-xs">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span class="font-headline-md font-extrabold text-blue-950 text-sm">Add Movement</span>
              </div>
              <button id="fitness-cancel-add-btn" class="text-xs text-gray-500 font-bold hover:text-gray-900 px-2.5 py-1 rounded-full hover:bg-white transition-colors">Cancel</button>
            </div>

            <!-- Suggested Exercises with High-Res Visuals -->
            <div class="flex flex-col gap-2.5">
              <div class="flex items-center justify-between">
                <span class="text-[11px] uppercase tracking-wider font-extrabold text-blue-900/80 flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px] text-blue-600">auto_awesome</span>
                  <span>Suggested Movements</span>
                </span>
                <span class="text-[10px] text-blue-600 font-semibold">Tap to select</span>
              </div>
              
              <!-- Category Filter Pills (Strength, HIIT, Mobility, Recovery) -->
              <div class="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none -mx-1 px-1">
                ${SUGGESTED_CATEGORIES.map(cat => {
                  const isCatActive = activeSuggestedCategory === cat.id;
                  return `
                    <button type="button" data-sug-cat="${cat.id}" class="sug-cat-btn flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                      isCatActive
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100 hover:text-gray-900'
                    }">
                      <span class="material-symbols-outlined text-[14px]">${cat.icon}</span>
                      <span>${cat.label}</span>
                      <span class="text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${isCatActive ? 'bg-blue-700 text-blue-100' : 'bg-gray-100 text-gray-500'}">${(SUGGESTED_EXERCISES_BY_CATEGORY[cat.id] || []).length}</span>
                    </button>
                  `;
                }).join('')}
              </div>

              <!-- 5 Exercises for Currently Selected Category -->
              <div class="flex gap-2.5 overflow-x-auto pb-1.5 pt-0.5 no-scrollbar -mx-1 px-1 snap-x">
                ${(SUGGESTED_EXERCISES_BY_CATEGORY[activeSuggestedCategory] || []).map((sug, idx) => `
                  <div data-suggest-idx="${idx}" data-suggest-cat="${activeSuggestedCategory}" class="suggest-exercise-card snap-start shrink-0 w-32 rounded-2xl bg-white border border-blue-100 hover:border-blue-400 p-2 flex flex-col gap-1.5 cursor-pointer shadow-2xs hover:shadow-md transition-all group active:scale-95">
                    <div class="w-full h-24 rounded-xl overflow-hidden relative bg-gray-100">
                      <img src="${sug.image}" alt="${sug.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <span class="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold tracking-wide">${sug.tag}</span>
                    </div>
                    <div class="flex flex-col min-w-0">
                      <span class="text-xs font-bold text-[#101317] truncate group-hover:text-blue-600 transition-colors">${sug.name}</span>
                      <span class="text-[10px] font-bold text-blue-600 mt-0.5">${sug.scheme || `${sug.sets} Sets • ${sug.reps} Reps ${sug.weight ? `• ${sug.weight}kg` : ''}`}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Movement Configuration Form -->
            <div class="flex flex-col gap-2.5 pt-2 border-t border-blue-100">
              <div class="flex items-center justify-between">
                <span class="text-[11px] uppercase tracking-wider font-extrabold text-blue-900/80">Movement Details</span>
                <span id="selected-sug-badge" class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full hidden">Ready</span>
              </div>
              
              <div class="relative">
                <input id="new-exercise-name" type="text" placeholder="Select a suggested exercise or type custom name..." class="w-full px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 font-body-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-[#101317]" />
                <input type="hidden" id="new-exercise-image" value="" />
                <input type="hidden" id="new-exercise-cat" value="biceps" />
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div class="bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  <label class="text-[10px] text-gray-400 font-bold uppercase block">Sets</label>
                  <input id="new-exercise-sets" type="number" value="3" min="1" max="15" class="w-full font-bold text-sm text-[#101317] focus:outline-none bg-transparent" />
                </div>
                <div class="bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  <label class="text-[10px] text-gray-400 font-bold uppercase block">Reps</label>
                  <input id="new-exercise-reps" type="number" value="10" min="1" max="100" class="w-full font-bold text-sm text-[#101317] focus:outline-none bg-transparent" />
                </div>
                <div class="bg-white px-3 py-1.5 rounded-xl border border-gray-200">
                  <label class="text-[10px] text-gray-400 font-bold uppercase block">Weight (kg)</label>
                  <input id="new-exercise-weight" type="number" value="20" min="0" max="500" class="w-full font-bold text-sm text-[#101317] focus:outline-none bg-transparent" />
                </div>
              </div>

              <button id="fitness-save-exercise-btn" class="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-label-md text-xs font-bold shadow-md shadow-blue-500/25 active:scale-95 transition-all flex items-center justify-center gap-1.5 mt-1">
                <span class="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Add to Today's Routine</span>
              </button>
            </div>
          </div>
        ` : ''}

        <div class="flex flex-col gap-unit-xs" id="exerciseLogList">
          ${filteredExercises.map(ex => {
            const isDone = ex.done;
            const cardBg = isDone ? 'bg-blue-50/50 border-blue-200' : 'bg-surface-container-low border-surface-container-high/40 hover:bg-surface-container/60';
            const textStyle = isDone ? 'line-through opacity-70' : '';
            const icon = isDone ? 'task_alt' : 'radio_button_unchecked';
            const iconColor = isDone ? 'text-blue-600' : 'text-on-surface-variant/40';

            return `
              <div data-exercise-id="${ex.id}" class="exercise-item group flex items-center justify-between p-unit-md rounded-2xl border transition-all cursor-pointer ${cardBg}">
                <div class="flex items-center gap-unit-sm min-w-0">
                  <div class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-gray-200/80 bg-gray-100 relative group-hover:scale-105 transition-all shadow-2xs">
                    ${ex.image ? `
                      <img src="${ex.image}" alt="${ex.name}" class="w-full h-full object-cover" />
                    ` : `
                      <div class="w-full h-full flex items-center justify-center bg-blue-50 text-blue-600">
                        <span class="material-symbols-outlined text-[20px]">${icon}</span>
                      </div>
                    `}
                    ${isDone ? `
                      <div class="absolute inset-0 bg-blue-600/75 backdrop-blur-[1px] flex items-center justify-center text-white">
                        <span class="material-symbols-outlined text-[20px] font-bold">check</span>
                      </div>
                    ` : ''}
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span class="font-label-lg text-label-lg font-bold text-on-surface truncate ${textStyle}">
                      ${ex.name}
                    </span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant text-xs">
                      ${ex.details}
                    </span>
                  </div>
                </div>

                <div class="flex items-center gap-2">
                  <button data-exercise-start="${ex.id}" class="exercise-quick-start w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                    <span class="material-symbols-outlined text-[16px] fill">play_arrow</span>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <button id="fitness-start-session-btn" class="w-full h-12 rounded-full bg-blue-600 text-white font-label-lg font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 transition-all mt-unit-xs">
          <span class="material-symbols-outlined text-[20px]">fitness_center</span>
          <span>Launch Full Interactive Session</span>
        </button>
      </section>
    </div>
  `;
}

export function bindFitnessEvents() {
  document.querySelectorAll('.fitness-filter-btn').forEach(btn => {
    btn.onclick = () => {
      selectedCategory = btn.getAttribute('data-cat') || 'all';
      store.notify();
    };
  });

  document.querySelectorAll('.exercise-item').forEach(item => {
    item.onclick = (e) => {
      if (e.target.closest('.exercise-quick-start')) return;
      const id = item.getAttribute('data-exercise-id');
      if (id) store.toggleExercise(id);
    };
  });

  document.querySelectorAll('.exercise-quick-start').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-exercise-start');
      const ex = store.state.exercises.find(x => x.id === id);
      if (ex) {
        store.openWorkout(ex.name, 180, ex.name);
      }
    };
  });

  const playFeatured = document.getElementById('fitness-play-featured-btn');
  if (playFeatured) {
    playFeatured.onclick = () => store.openWorkout('Full-Body Dynamic Hypertrophy', 420, 'Barbell Deadlift');
  }

  const startSession = document.getElementById('fitness-start-session-btn');
  if (startSession) {
    startSession.onclick = () => store.openWorkout("Today's Session Plan", 350, 'Barbell Deadlift');
  }

  const toggleAddBtn = document.getElementById('fitness-toggle-add-btn');
  if (toggleAddBtn) {
    toggleAddBtn.onclick = () => {
      isAddExerciseOpen = !isAddExerciseOpen;
      store.notify();
    };
  }

  const cancelAddBtn = document.getElementById('fitness-cancel-add-btn');
  if (cancelAddBtn) {
    cancelAddBtn.onclick = () => {
      isAddExerciseOpen = false;
      store.notify();
    };
  }

  // Category filter tabs inside Add Movement panel
  document.querySelectorAll('.sug-cat-btn').forEach(btn => {
    btn.onclick = () => {
      const cat = btn.getAttribute('data-sug-cat');
      if (cat && SUGGESTED_EXERCISES_BY_CATEGORY[cat]) {
        activeSuggestedCategory = cat;
        store.notify();
      }
    };
  });

  // Suggested exercise card click handler to auto-fill inputs
  document.querySelectorAll('.suggest-exercise-card').forEach(card => {
    card.onclick = () => {
      const idx = parseInt(card.getAttribute('data-suggest-idx'), 10);
      const cat = card.getAttribute('data-suggest-cat') || activeSuggestedCategory;
      const sug = (SUGGESTED_EXERCISES_BY_CATEGORY[cat] || [])[idx];
      if (!sug) return;

      // Visual card selection feedback
      document.querySelectorAll('.suggest-exercise-card').forEach(c => {
        c.classList.remove('ring-2', 'ring-blue-600', 'bg-blue-50/50');
      });
      card.classList.add('ring-2', 'ring-blue-600', 'bg-blue-50/50');

      // Autofill form inputs
      const nameInput = document.getElementById('new-exercise-name');
      const setsInput = document.getElementById('new-exercise-sets');
      const repsInput = document.getElementById('new-exercise-reps');
      const weightInput = document.getElementById('new-exercise-weight');
      const imageInput = document.getElementById('new-exercise-image');
      const catInput = document.getElementById('new-exercise-cat');
      const badge = document.getElementById('selected-sug-badge');

      if (nameInput) nameInput.value = sug.name;
      if (setsInput) setsInput.value = sug.sets;
      if (repsInput) repsInput.value = sug.reps;
      if (weightInput) weightInput.value = sug.weight;
      if (imageInput) imageInput.value = sug.image;
      if (catInput) catInput.value = sug.category;
      if (badge) {
        badge.textContent = `Selected: ${sug.tag}`;
        badge.classList.remove('hidden');
      }
    };
  });

  const saveExBtn = document.getElementById('fitness-save-exercise-btn');
  if (saveExBtn) {
    saveExBtn.onclick = () => {
      const nameInput = document.getElementById('new-exercise-name');
      const setsInput = document.getElementById('new-exercise-sets');
      const repsInput = document.getElementById('new-exercise-reps');
      const weightInput = document.getElementById('new-exercise-weight');
      const imageInput = document.getElementById('new-exercise-image');
      const catInput = document.getElementById('new-exercise-cat');

      const name = nameInput ? nameInput.value.trim() : '';
      if (!name) {
        store.showToast('Please select or enter an exercise', 'error');
        return;
      }

      store.addExercise({
        name,
        sets: setsInput ? Number(setsInput.value) : 3,
        reps: repsInput ? Number(repsInput.value) : 10,
        weight: weightInput ? Number(weightInput.value) : 0,
        cat: (catInput && catInput.value) ? catInput.value : (selectedCategory !== 'all' ? selectedCategory : 'biceps'),
        image: imageInput && imageInput.value ? imageInput.value : null
      });

      isAddExerciseOpen = false;
    };
  }
}
