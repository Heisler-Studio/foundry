interface StorageAdapter {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mmkvInstance: any = null;

/**
 * Creates MMKV storage instance.
 * MMKV v4+ works on both web and native platforms.
 * This is the primary storage for production apps.
 */
const createMMKVStorage = (): StorageAdapter => {
  if (!mmkvInstance) {
    // Dynamic require to prevent import errors if MMKV isn't available
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createMMKV } = require('react-native-mmkv');
    mmkvInstance = createMMKV({ id: 'theme-storage' });
  }

  return {
    getItem: (name) => mmkvInstance.getString(name) ?? null,
    setItem: (name, value) => mmkvInstance.set(name, value),
    removeItem: (name) => mmkvInstance.remove(name),
  };
};

/**
 * Creates a no-op storage adapter that does nothing.
 * This fallback is used when MMKV is unavailable (e.g., Expo Go).
 * Settings will not persist in this mode, but the app won't crash.
 */
const createNoOpStorage = (): StorageAdapter => {
  return {
    getItem: () => null,
    setItem: () => {
      /* no-op - storage unavailable */
    },
    removeItem: () => {
      /* no-op - storage unavailable */
    },
  };
};

/**
 * Creates the appropriate storage adapter for the current environment.
 *
 * MMKV v4+ works on both web and native platforms, so we always try it first.
 * If MMKV throws (typically in Expo Go where native modules are missing),
 * we fall back to no-op storage. This is intentional - we prioritize the
 * production native app experience. Settings won't persist in Expo Go or
 * other environments where native modules are unavailable, but the app
 * will continue to function without crashing.
 */
export const createStorage = (): StorageAdapter => {
  try {
    return createMMKVStorage();
  } catch {
    console.info(
      '[storage] MMKV unavailable, using no-op storage. Settings will not persist.',
    );
    return createNoOpStorage();
  }
};
