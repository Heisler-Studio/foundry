import { ExpoConfig } from 'expo/config';
import { version } from './package.json';

// const EAS_PROJECT_ID = '87a1aadb-83ea-4956-864a-d7a8e4bd1cfa';
const PROJECT_SLUG = 'base-universal-app';

const APP_NAME = 'heisler-studio-foundry';
const BUNDLE_IDENTIFIER = 'com.heisler-studio.foundry.app';
const PACKAGE_NAME = 'com.heisler-studio.foundry.app';
const ICON = './assets/images/icon.png';
// const SCHEME = process.env.EXPO_PUBLIC_APP_SCHEME;
const SCHEME = 'heislerstudiofoundry';

export default (): ExpoConfig => {
  console.info('⚙️ Building app for environment:', process.env.APP_ENV);
  const { name, bundleIdentifier, icon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as 'development' | 'preview' | 'production') ||
        'development',
    );

  return {
    owner: 'heisler.studio',
    name,
    slug: PROJECT_SLUG, // Must be consistent across all environments.,
    version, // Automatically bump your project version with `npm version patch`, `npm version minor` or `npm version major`.
    orientation: 'portrait',
    icon,
    scheme,
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    runtimeVersion: {
      policy: 'appVersion',
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier,
    },
    android: {
      package: packageName,
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/android-icon-foreground.png',
        backgroundImage: './assets/images/android-icon-background.png',
        monochromeImage: './assets/images/android-icon-monochrome.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      output: 'server',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      [
        'expo-router',
        // TODO: configure EAS server
        // {
        //   origin: 'https://linora-app--production.expo.app/',
        // },
      ],
      'expo-dev-client',
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash-icon.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    // extra: {
    //   eas: {
    //     projectId: EAS_PROJECT_ID,
    //   },
    // },
  };
};

// Dynamically configure the app based on the environment.
// Update these placeholders with your actual values.
export const getDynamicAppConfig = (
  environment: 'development' | 'preview' | 'production',
) => {
  if (environment === 'production') {
    return {
      name: APP_NAME,
      bundleIdentifier: BUNDLE_IDENTIFIER,
      packageName: PACKAGE_NAME,
      icon: ICON,
      scheme: SCHEME,
    };
  }

  if (environment === 'preview') {
    return {
      name: `${APP_NAME} Preview`,
      bundleIdentifier: `${BUNDLE_IDENTIFIER}.preview`,
      packageName: `${PACKAGE_NAME}.preview`,
      icon: ICON,
      scheme: SCHEME, //`${SCHEME}-prev`,
    };
  }

  return {
    name: `${APP_NAME} Development`,
    bundleIdentifier: `${BUNDLE_IDENTIFIER}.dev`,
    packageName: `${PACKAGE_NAME}.dev`,
    icon: ICON,
    scheme: SCHEME, // `${SCHEME}-dev`,
  };
};
