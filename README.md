# Kiki club mobile duplication

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

I've ported over the UI from the website to a react native app, and made some small tweaks:
- removed the "notifications" tab for a "messages" tab with semi-function (able to click into conversations and see previous messages, no sending new messages because I didn't build a backend for this).
- Added a map functionality to the explore page similar to Airbnb's map exploration functionality.

All the data comes from a mock data csv. None of the features actually connect to anything.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

⚠️ I haven't tested this outside of iOS simulator, so for best results, probably worth checking on that as well
