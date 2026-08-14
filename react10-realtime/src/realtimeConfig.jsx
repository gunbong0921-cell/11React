//파이어베이스 서비스 초기화 함수
import { initializeApp } from 'firebase/app';
//리얼타임 데이터베이스 함수
import { getDatabase } from 'firebase/database';

//리얼타임 데이터베이스 설정
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
};

//파이어베이스 서비스 초기화 및 리얼타임 데이터베이스 함수 반환
const app = initializeApp(firebaseConfig);
const realtime = getDatabase(app);

export { realtime };