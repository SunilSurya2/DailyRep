# DailyRep - Fitness & Habit Tracker Mobile App

A cross-platform mobile application for **iOS** and **Android**, built directly from the **Stitch design system** (`projects/8556109689032087294`).

---

## Features

- **Home Dashboard**:
  - Daily convergence ring telemetry (Active Burn, Move mins, Hydration)
  - Key vitals (Step count, sleep quality index, resting heart rate)
  - Hero "Next Up" workout session launcher
  - Interactive priority habits checklist with real-time streak badges
  - Sprint week community celebration card
- **Fitness & Workouts**:
  - Category filters (Strength, HIIT, Recovery, Mobility)
  - Weekly target logging (80% completed with day breakdown)
  - Featured workout: Full-Body Dynamic Hypertrophy
  - Active routine set logging
- **Active Workout Session (Modal)**:
  - Live elapsed timer and telemetry
  - Zone 3 Aerobic heart rate monitoring and real-time calorie burn
  - Exercise set logger & rest interval tracker
- **Daily Habits Tracker**:
  - Weekly momentum strip with 7-day dot matrix adherence
  - Interactive habits with hydration counter, audio breathwork quick-play, and streak fire badges
  - Quick add habit template
- **Progress & Analytics**:
  - High-performance score card (92/100)
  - Interactive SVG weekly output telemetry with interactive day selector
  - Habit mastery & 100k Steps milestone badges
  - Biometrics and vital trend graphs
- **Profile & Settings**:
  - Athlete avatar and tier badge
  - Daily goals customization
  - Apple Health / Health Connect telemetry pairing
  - Notification and theme preferences

---

## Project Structure

```
dailyrep-app/
├── android/                   # Native Android Gradle project (builds .apk)
├── ios/                       # Native iOS Xcode workspace
├── src/
│   ├── components/            # Header, BottomNav
│   ├── views/                 # Home, Fitness, DailyHabits, Progress, Profile, Modals
│   ├── state/                 # Reactive store with localStorage persistence
│   ├── styles/app.css         # Tailwind & Stitch design system tokens
│   └── main.js                # App entry point & event listeners
├── .github/workflows/         # Automated GitHub Actions workflow for APK & iOS build
├── capacitor.config.json      # Capacitor native bridge configuration
├── tailwind.config.js         # Stitch color palette & typography
└── vite.config.js             # Vite bundler
```

---

## Running Locally

```bash
# Start development server with live reload:
npm run dev

# Build the production web bundle:
npm run build
```

---

## Building the Android APK

### Option A: Automated GitHub Actions (Recommended)
Push this repository to GitHub. The included workflow `.github/workflows/build-mobile.yml` will automatically:
1. Compile the **Android APK** (`app-debug.apk`)
2. Build the **iOS Simulator Package** (`App.app`)
3. Upload both as downloadable zip artifacts directly in the Actions tab.

### Option B: Local Android Studio
```bash
# Sync web assets to Android
npx cap sync android

# Open in Android Studio to build APK or run on connected device/emulator:
npx cap open android
```
Inside Android Studio, select **Build > Build Bundle(s) / APK(s) > Build APK(s)** to generate `app-debug.apk`.

---

## Building for iOS
```bash
# Sync web assets to iOS
npx cap sync ios

# Open in Xcode (on macOS):
npx cap open ios
```
In Xcode, select your device or simulator and hit **Run (Cmd+R)** or **Product > Archive** to export the `.ipa`.
