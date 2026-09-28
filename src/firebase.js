import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3JBpuKKr5K7s2V7F_66q_DVL3C54bbUw",
  authDomain: "genesis-58aa3.firebaseapp.com",
  databaseURL: "https://genesis-58aa3-default-rtdb.firebaseio.com",
  projectId: "genesis-58aa3",
  storageBucket: "genesis-58aa3.firebasestorage.app",
  messagingSenderId: "632813358909",
  appId: "1:632813358909:web:a7f478d4742cb9801e3f54"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);