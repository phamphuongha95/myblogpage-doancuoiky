// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmV7dj5B5WPSI4_iSDmGSm9awZmgYyD90",
  authDomain: "myblog2-26968.firebaseapp.com",
  projectId: "myblog2-26968",
  storageBucket: "myblog2-26968.firebasestorage.app",
  messagingSenderId: "701399807553",
  appId: "1:701399807553:web:3ea131fadab26258ebf8c0",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo dịch vụ Authentication để dùng cho đăng nhập
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);
