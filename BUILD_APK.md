# Building APK - Plan ENARM 180 Días

This React Native app has been configured to generate an APK for Android devices. Follow these steps to build your APK.

## Prerequisites

Before building, ensure you have installed:

1. **Node.js & npm** (Latest LTS)
   - Download from: https://nodejs.org/

2. **Java Development Kit (JDK) 11 or higher**
   - Download from: https://www.oracle.com/java/technologies/downloads/

3. **Android Studio**
   - Download from: https://developer.android.com/studio
   - During installation, ensure you install:
     - Android SDK
     - Android SDK Platform-Tools
     - Android Emulator

4. **Set ANDROID_HOME Environment Variable**
   - macOS/Linux: `export ANDROID_HOME=~/Library/Android/Sdk` or `export ANDROID_HOME=~/Android/Sdk`
   - Windows: Set it to the Android SDK location (usually `C:\Users\YourUsername\AppData\Local\Android\sdk`)

## Building Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Build APK (Debug Version)

For testing on your device or emulator:

```bash
npm run android
```

Or build directly:

```bash
cd android
./gradlew assembleDebug
cd ..
```

The debug APK will be located at:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

### 3. Build APK (Release Version)

For production/Play Store submission:

```bash
npm run build-apk
```

Or manually:

```bash
cd android
./gradlew assembleRelease
cd ..
```

The release APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Signing the Release APK

Before building a release APK, you need to:

### 1. Create a Keystore (One-time setup)

```bash
keytool -genkey -v -keystore android/app/release.jks -keyalg RSA -keysize 2048 -validity 10000 -alias release
```

You'll be asked for:
- Keystore password
- Key password
- Your name, organization, etc.

### 2. Set Environment Variables (Before building)

```bash
export KEYSTORE_PASSWORD=your_keystore_password
export KEY_ALIAS=release
export KEY_PASSWORD=your_key_password
```

Or on Windows (PowerShell):
```powershell
$env:KEYSTORE_PASSWORD="your_keystore_password"
$env:KEY_ALIAS="release"
$env:KEY_PASSWORD="your_key_password"
```

### 3. Build Release APK

```bash
npm run build-apk
```

## Installing APK on Device

### Via ADB (Android Debug Bridge)

```bash
# Connect your Android device via USB
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

Or for release:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Manually on Device

Transfer the APK file to your device and tap it to install.

## Troubleshooting

### Issue: `ANDROID_HOME not found`
- Verify you've set the ANDROID_HOME environment variable correctly
- Restart your terminal/IDE after setting it

### Issue: `Gradle build failed`
- Run: `cd android && ./gradlew clean && cd ..`
- Then try building again

### Issue: `Java not found`
- Verify JDK 11+ is installed
- Set JAVA_HOME environment variable if needed

### Issue: `SDK version mismatch`
- Open Android Studio
- Go to Tools > SDK Manager
- Install the required SDK platforms (Android 33)

## Next Steps

- **Testing**: Install on a device and test the app
- **Play Store**: To submit to Google Play Store, you'll need:
  - A Google Play Developer Account ($25 one-time fee)
  - A signed release APK or AAB (Android App Bundle)
  - App metadata and screenshots

## Build for Google Play Store

To create an AAB (Android App Bundle) instead of APK:

```bash
npm run build-aab
```

This is recommended for Play Store submissions as it's more efficient.

## Support

For more information on React Native Android builds:
- Official Docs: https://reactnative.dev/docs/android-setup
- Android Developer Guide: https://developer.android.com/guide
