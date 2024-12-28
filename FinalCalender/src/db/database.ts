import { openDB } from 'idb';
import type { DailyEntry } from '../types/tracker';

const dbName = 'productivityDB';
const storeName = 'entries';

const initDB = async () => {
  const db = await openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(storeName)) {
        const store = db.createObjectStore(storeName, { keyPath: 'date' });
        store.createIndex('date', 'date', { unique: true });
      }
    },
  });
  return db;
};

export const saveEntry = async (entry: DailyEntry) => {
  const db = await initDB();
  await db.put(storeName, entry);
  return entry;
};

export const getEntry = async (date: string) => {
  const db = await initDB();
  return db.get(storeName, date);
};

export const getAllEntries = async () => {
  const db = await initDB();
  return db.getAll(storeName);
};