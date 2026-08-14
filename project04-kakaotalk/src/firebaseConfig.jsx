import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: (import.meta.env.VITE_DATABASE_URL || '').replace(/\/$/, '')
};

const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);
const storageUrl = (import.meta.env.VITE_STORAGE_URL || '').trim();
const storage = storageUrl ? getStorage(app, storageUrl) : getStorage(app);
storage.maxUploadRetryTime = 5000;
storage.maxOperationRetryTime = 5000;

export { realtime, storage };