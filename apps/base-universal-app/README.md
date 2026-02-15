# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Running Modes

This app supports two different running modes:

### Expo Go Mode (Quick Testing)

Use Expo Go for quick iteration without needing to build a custom native binary. Some features (like persistent storage) will use in-memory fallbacks in this mode.

```bash
# Run in Expo Go mode
pnpm run start:go
```

### Development Client Mode (Full Features)

Use the development client to access all native features including persistent storage via MMKV. This requires building and installing a custom development client first.

```bash
# Run in development client mode (requires custom build)
pnpm run start:dev

# Or simply
pnpm start
```

### Mode Comparison

| Feature            | Expo Go        | Development Client       |
| ------------------ | -------------- | ------------------------ |
| No build required  | ✅             | ❌ (needs custom build)  |
| Hot reload         | ✅             | ✅                       |
| Persistent storage | In-memory only | Full MMKV support        |
| Native modules     | Limited        | Full support             |
| Launch speed       | Fast           | Fast after initial build |

### Creating a Development Build

To use the development client, you need to create a custom build:

```bash
# Create iOS development build
npx expo run:ios

# Create Android development build
npx expo run:android

# Or use EAS Build
npx eas build --profile development
```

## Styling with NativeWind 🎨

This project uses [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native) for styling:

- **Tailwind CSS v3** - Utility-first CSS framework
- **NativeWind v4** - React Native integration
- Custom design tokens for colors, spacing, and border radius

See [NATIVEWIND.md](./NATIVEWIND.md) for detailed usage guide.

## Get started

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Start the app (choose your mode):

   ```bash
   # For quick testing with Expo Go
   pnpm run start:go

   # For full features with development client (requires build)
   pnpm run start:dev
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Available Scripts

- `pnpm start` - Start with development client (default)
- `pnpm run start:go` - Start in Expo Go mode
- `pnpm run start:dev` - Start with development client
- `pnpm run android` - Start on Android device/emulator
- `pnpm run ios` - Start on iOS device/simulator
- `pnpm run web` - Start web version
- `pnpm run lint` - Run ESLint

## Get a fresh project

When you're ready, run:

```bash
pnpm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.
- [Development builds](https://docs.expo.dev/develop/development-builds/introduction/): Learn about creating custom development clients.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
