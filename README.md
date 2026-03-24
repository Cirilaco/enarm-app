# Plan ENARM 180 Días - React Native App

A comprehensive 180-day study plan app for ENARM (medical exam) preparation following AMIR Mexico methodology.

## Overview

This is a fully converted React Native application ready to be built into an Android APK. The app provides:

- 180-day structured study schedule
- Daily study tasks with time allocations
- Progress tracking and completion checkmarks
- Subject-specific priorities (Pediatría, Gineco-Obstetricia, Cirugía General, Medicina Interna, Especialidades)
- Study methodology guidance
- Mobile-optimized interface
- Local state management

## App Features

### Study Planning
- 6-month (180-day) structured curriculum
- 3 distinct study phases:
  - Phase 1 (Days 1-60): Foundation building with manual coverage
  - Phase 2 (Days 61-150): GPC (Clinical Practice Guidelines) mastery with case studies
  - Phase 3 (Days 151-180): Intensive practice exams and consolidation

### Subject Priorities (AMIR Mexico)
- Medicina Interna: 35%
- Pediatría: 17%
- Gineco-Obstetricia: 17%
- Cirugía General: 15%
- Especialidades/Miscelánea: 16%

### Features
- ✓ Day navigation (calendar-style grid)
- ✓ Task completion tracking
- ✓ Progress percentage calculation
- ✓ Visual progress bar
- ✓ Rest day identification
- ✓ Time allocation per task
- ✓ Study methodology tips
- ✓ Responsive mobile design

## Tech Stack

- **Framework**: React Native 0.73
- **Language**: TypeScript
- **Build System**: Gradle (Android)
- **Build Tool**: Metro Bundler
- **Components**: Lucide React Native (icons)

## Project Structure

```
.
├── App.tsx                          # Main React Native component
├── index.js                         # App entry point
├── app.json                         # App configuration
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── babel.config.js                  # Babel configuration
├── metro.config.js                  # Metro bundler config
├── android/                         # Android native code
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml
│   │   │   ├── java/com/enarm/plan180dias/
│   │   │   │   ├── MainActivity.kt
│   │   │   │   └── MainApplication.kt
│   │   │   └── res/
│   │   │       ├── values/strings.xml
│   │   │       └── values/styles.xml
│   │   ├── build.gradle
│   │   └── proguard-rules.pro
│   ├── build.gradle
│   ├── settings.gradle
│   └── gradle.properties
├── BUILD_APK.md                     # Detailed APK build instructions
├── QUICK_START.md                   # Quick start guide
└── README.md                        # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ with npm
- Java Development Kit (JDK) 11+
- Android Studio
- Android SDK (API level 33 minimum)

### Installation

1. Navigate to project directory
2. Install dependencies (already done):
   ```bash
   npm install
   ```

### Development

Start the Metro development server:
```bash
npm start
```

In another terminal, run on Android device or emulator:
```bash
npm run android
```

### Building APK

#### Debug APK (for testing)
```bash
npm run android
```
or
```bash
cd android && ./gradlew assembleDebug && cd ..
```

#### Release APK (for distribution)
```bash
npm run build-apk
```

For detailed instructions including keystore setup and signing, see `BUILD_APK.md`.

## Study Schedule Details

### Daily Study Pattern

**Weekdays (Monday-Saturday)**: 4 hours of focused study
- Phase 1: Multiple subjects (2h + 2h)
- Phase 2: GPC + Case Studies + Flashcards (1.5h + 1.5h + 1h)
- Phase 3: Practice Exams + Reviews (2h + 1h + 1h)

**Sundays**: Complete rest day (0h)

### Study Topics Included

The app includes a comprehensive curriculum covering:
- Recién Nacido Sano, Reanimación Neonatal
- Control Prenatal, Hemorragias obstétricas
- Apendicitis Aguda, Colecistitis, Heridas traumáticas
- Hipertensión, Diabetes, EPOC, VIH, TB
- And much more...

## Usage

1. **Navigation**: Tap day numbers to jump to specific days
2. **Tracking Progress**: Tap tasks to mark them complete (visual checkmark appears)
3. **View Progress**: See overall completion percentage at top
4. **Subject References**: Check sidebar for AMIR priority weightings
5. **Daily Guidance**: Read study tips and methodology recommendations

## App Package Details

- **Package Name**: com.enarm.plan180dias
- **App Name**: Plan ENARM 180 Días
- **Version**: 1.0.0
- **Minimum SDK**: 21
- **Target SDK**: 33

## Performance

The app is optimized for mobile with:
- Lazy-loaded schedule generation
- Efficient state management
- No external API calls (local-only)
- Minimal dependencies
- Fast startup time

## Customization

To customize the app:

### Change Study Schedule
Edit the `topics` object in `App.tsx` (lines 29-35)

### Modify Subject Weights
Update the `subjects` array in `App.tsx` (lines 26-31)

### Change App Name/Icon
- Edit `app.json` for app display name
- Replace icon files in `android/app/src/main/res/`

### Adjust Colors
All colors are defined in the `StyleSheet` at the bottom of `App.tsx`

## Building for Play Store

To submit to Google Play Store:

1. Build release APK or AAB (see `BUILD_APK.md`)
2. Create Google Play Developer account
3. Follow Play Store submission guidelines
4. Add app metadata, screenshots, and description

## Support & Resources

- **React Native Documentation**: https://reactnative.dev
- **Android Development**: https://developer.android.com
- **TypeScript Guide**: https://www.typescriptlang.org

## Troubleshooting

See `BUILD_APK.md` for common build issues and solutions.

## License

This project is ready for personal and educational use.

---

**Status**: ✓ Ready to build APK
**Last Updated**: 2024
**Framework**: React Native 0.73.0
