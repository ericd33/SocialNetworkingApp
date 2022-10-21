import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyD_Nag0IEcB8L0OzVJbW8Sezmt8ysjYWNE",
  authDomain: "concatusfirebase.firebaseapp.com",
  projectId: "concatusfirebase",
  storageBucket: "concatusfirebase.appspot.com",
  messagingSenderId: "975150430987",
  appId: "1:975150430987:web:7fd4c6e5a8d8ac1ff9400e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;