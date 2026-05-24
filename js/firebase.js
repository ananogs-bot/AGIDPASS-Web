import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyC2Ao8h5tlyYMtH0myQB6Nvl-tLMulvnqI",
    authDomain: "agidpass.firebaseapp.com",
    projectId: "agidpass",
    storageBucket: "agidpass.firebasestorage.app",
    messagingSenderId: "528182016924",
    appId: "1:528182016924:web:27976c43d6b8d61393a659",
    measurementId: "G-2TEZFTHN0K"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);