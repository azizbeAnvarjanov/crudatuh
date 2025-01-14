// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAY6ou-HmUnd7IlOvFCe_UBy4CTAuTjcx0",
  authDomain: "task-manag-c4c3f.firebaseapp.com",
  projectId: "task-manag-c4c3f",
  storageBucket: "task-manag-c4c3f.firebasestorage.app",
  messagingSenderId: "176868033009",
  appId: "1:176868033009:web:7d6e613c0a9ba21ebbc450",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
