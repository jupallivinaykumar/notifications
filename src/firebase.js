import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDimYwGCNdw9VfA5XSO6kQ9yn7sDWRezpg",
  authDomain: "notifictions-88846.firebaseapp.com",
  projectId: "notifictions-88846",
  storageBucket: "notifictions-88846.firebasestorage.app",
  messagingSenderId: "817050390176",
  appId: "1:817050390176:web:8758186afa4a9a36a1c3c5",
  measurementId: "G-J0BR8CT3F8"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;