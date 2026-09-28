MOUNTAIN DAWN — PHONE TEST BUILD (PWA)

WHAT THIS IS
The complete Mountain Dawn game as an installable Progressive Web App: the same single-file engine plus a manifest, icon set, offline service worker and phone ergonomics. After the first load it runs fully offline.

TEST ON YOUR PHONE — OPTION A: ANDROID APK (easiest)
1. Copy MountainDawn-v1.0.0.apk to your phone (download, USB, or cloud drive).
2. Open it on the phone and allow "Install from unknown sources" when prompted (normal for sideloaded apps).
3. Launch Mountain Dawn from the app drawer — it opens fullscreen landscape, no browser, no URL bar.
Note: the APK loads the hosted game and works offline after first launch. Keep the APK + keystore files together: future updates must be signed with the same key.

TEST ON YOUR PHONE — OPTION B: HOSTED PWA (hosted — easiest)
1. Open the hosted URL (GitHub Pages) in Chrome or Safari on your phone.
2. Android Chrome: an INSTALL banner appears in-game — tap INSTALL. Or browser menu > "Install app" / "Add to Home screen".
3. iPhone Safari: Share menu > "Add to Home Screen". Launch from the home screen for fullscreen.
4. The first visit needs a connection once; after that the game boots with airplane mode on.

TEST OFFLINE FOLDER (no hosting)
- Option A: open index.html directly from the unpacked folder in any browser. The game runs; install-to-home-screen and offline service worker need HTTPS hosting, so they are active only when served (Option B) or on the hosted URL.
- Option B: serve locally on your Wi-Fi from a computer:
  cd pwa && python3 -m http.server 8080
  then open http://<your-computer-ip>:8080 on the same Wi-Fi on your phone.

WHAT TO CHECK ON THE PHONE
- Touch pads: left cluster move/jump/duck, centre truck/air/armory/pause, right dash/shield/swap/bomb/fire with press feedback.
- Landscape only: portrait shows the rotate prompt.
- Vibration on damage where the browser supports it (Android Chrome).
- Progress saving (furthest checkpoint + weapon crates) — reload the page and CONTINUE appears on the briefing screen.
- Gamepad over Bluetooth if you have one: Start pauses, stick/d-pad moves, A jumps, X fires.

FILES
index.html            the game + PWA layer
manifest.webmanifest  app identity, icons, landscape fullscreen
sw.js                 offline-first service worker (version: mountain-dawn-v1)
icons/                generated 192/512 + maskable + apple-touch icons

NOTES
- Google Fonts load once when online; the game falls back to system fonts offline.
- An original fictional, non-graphic arcade game featuring Kurdish defenders against ISIS forces.