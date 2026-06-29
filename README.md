## Created with Capacitor Create App

This app was created using [`@capacitor/create-app`](https://github.com/ionic-team/create-capacitor-app) and uses Solid + Vite for the web layer.

### Build an Android debug APK

These are the exact steps used to produce a debug APK from this repository. Run them from the project root.

1. Install dependencies (this project uses pnpm):

```bash
pnpm install --config.confirmModulesPurge=false
```

2. Build the web assets (this project uses `vp`, provided by `vite-plus`):

```bash
pnpm run build
```

3. Add or install the Capacitor Android platform (only required once):

```bash
pnpm add -D @capacitor/android
npx cap add android
```

4. Sync Capacitor to copy the built web assets into the Android project:

```bash
npx cap sync android
npx cap copy android
```

5. Ensure Android SDK and JDK are available on the machine. Create or update `android/local.properties` with your SDK path if it's not already set. Example (Windows):

```
sdk.dir=C:\Users\YOUR_USER\Documents\AndroidSDK
```

6. Build the Android debug APK with the Gradle wrapper (run in the `android` folder):

On Windows (recommended environment for this repo):

```bash
cd android
gradlew.bat assembleDebug
```

Or using the included Unix-style wrapper from a bash environment:

```bash
./gradlew assembleDebug
```

7. Output APK location:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

Notes and troubleshooting

- If Gradle fails with "SDK location not found", either set an `ANDROID_HOME`/`ANDROID_SDK_ROOT` environment variable or add `android/local.properties` with `sdk.dir` pointing to your SDK.
- If Gradle fails because Java is missing, install a JDK and set `JAVA_HOME` to the JDK install directory.
- For a release-signed APK you must provide a keystore and add a signing configuration to `android/app/build.gradle` (or use Android Studio's "Generate Signed Bundle / APK" wizard). I can add the signing configuration if you provide the keystore and passwords.
- If you prefer using Android Studio, open the `android` folder (`npx cap open android`) and build/sign from there.

If you want, I can add a `scripts` entry to package.json to automate these steps or help with creating a release signing configuration.
