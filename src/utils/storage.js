// Storage API polyfill for local development
if (typeof window !== 'undefined' && !window.storage) {
  window.storage = {
    async get(key, shared = false) {
      try {
        const storageKey = shared ? `shared:${key}` : `user:${key}`;
        const value = localStorage.getItem(storageKey);
        if (value === null) {
          throw new Error('Key not found');
        }
        return { key, value, shared };
      } catch (error) {
        throw error;
      }
    },
    async set(key, value, shared = false) {
      try {
        const storageKey = shared ? `shared:${key}` : `user:${key}`;
        localStorage.setItem(storageKey, value);
        return { key, value, shared };
      } catch (error) {
        return null;
      }
    },
    async delete(key, shared = false) {
      try {
        const storageKey = shared ? `shared:${key}` : `user:${key}`;
        localStorage.removeItem(storageKey);
        return { key, deleted: true, shared };
      } catch (error) {
        return null;
      }
    },
    async list(prefix = '', shared = false) {
      try {
        const storagePrefix = shared ? `shared:${prefix}` : `user:${prefix}`;
        const keys = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith(storagePrefix)) {
            keys.push(key.replace(/^(shared:|user:)/, ''));
          }
        }
        return { keys, prefix, shared };
      } catch (error) {
        return null;
      }
    }
  };
}

// Helper functions for data persistence
export const loadFromStorage = async (key, shared = false) => {
  try {
    const result = await window.storage.get(key, shared);
    return result?.value ? JSON.parse(result.value) : null;
  } catch (err) {
    console.log(`No stored data found for key: ${key}`);
    return null;
  }
};

export const saveToStorage = async (key, data, shared = false) => {
  try {
    await window.storage.set(key, JSON.stringify(data), shared);
    return true;
  } catch (err) {
    console.error(`Storage error for key ${key}:`, err);
    return false;
  }
};

