import { NativeModules, Platform } from 'react-native';

export interface StorageAdapter {
  getItem: (name: string) => string | null;
  setItem: (name: string, value: string) => void;
  removeItem: (name: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let mmkvInstance: any = null;

const createMMKVStorage = (): StorageAdapter => {
  if (!mmkvInstance) {
    // Dynamic require to prevent import errors in Expo Go
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

const createInMemoryStorage = (): StorageAdapter => {
  const storage = new Map<string, string>();

  return {
    getItem: (name) => storage.get(name) ?? null,
    setItem: (name, value) => storage.set(name, value),
    removeItem: (name) => storage.delete(name),
  };
};

const isExpoGo = (): boolean => {
  try {
    return NativeModules.ExponentConstants?.appOwnership === 'expo';
  } catch {
    return false;
  }
};

export const createStorage = (): StorageAdapter => {
  if (Platform.OS === 'web') {
    try {
      return createMMKVStorage();
    } catch {
      return createInMemoryStorage();
    }
  }

  if (isExpoGo()) {
    console.warn('[storage] Using in-memory storage (Expo Go detected)');
    return createInMemoryStorage();
  }

  try {
    return createMMKVStorage();
  } catch {
    return createInMemoryStorage();
  }
};
