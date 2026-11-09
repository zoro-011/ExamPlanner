EXAM PLANNER — OLED BLACK ANDROID PROJECT

This is a native Android APK project wrapping the offline study planner UI in an Android WebView.
The app uses local browser storage inside its app sandbox, so checked tasks persist on the phone.
It does not request internet permission and works offline.

BUILD AN APK (free, using GitHub Actions):
1. Create a GitHub account if you don't have one.
2. Create a new repository named ExamPlannerOLED.
3. Upload the CONTENTS of this ZIP to the repository root (the .github folder must be included).
4. Open the repository's Actions tab.
5. Select "Build Android APK" and press "Run workflow" (or wait for the first push build).
6. When the workflow finishes successfully, open the run and download the artifact named
   "Exam-Planner-OLED-debug".
7. Extract the artifact ZIP on your phone and tap app-debug.apk to install.
8. If Android asks, allow Chrome or Files to install unknown apps for this installation.

This project is unsigned debug build, suitable for personal testing/installation.
For Play Store publishing, a signed release build and signing key are needed.

Project files:
- app/src/main/assets/ : complete offline planner interface and study plan
- app/src/main/java/.../MainActivity.java : Android WebView shell
- app/build.gradle : Android build config
- .github/workflows/android.yml : cloud APK build workflow

No Gradle wrapper is included; GitHub Actions installs Gradle 8.9.
