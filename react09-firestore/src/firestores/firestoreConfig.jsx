//파이어스토어 설정
import { initializeApp } from 'firebase/app';
//파이어스토어 가져오기
import { getFirestore } from 'firebase/firestore';

//파이어베이스 콘솔에서 APP 생성 후 발급받은 SDK 정보
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

//파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);
//파이어스토어 가져오기
const firestore = getFirestore(app);

export { firestore };
