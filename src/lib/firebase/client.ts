// Firebase client init (client-side only).
// Used for Google Authentication + storing per-user data (saved articles,
// followed topics, reading history) in the Realtime Database.
// News article data stays in Prisma/SQLite — Firebase is for USER data only.

import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getDatabase, type Database } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB5U9Zxh-5ysQJrCRcSTfWzAya0neQuYW4",
  authDomain: "sign-up-e0b5e.firebaseapp.com",
  databaseURL: "https://sign-up-e0b5e-default-rtdb.firebaseio.com",
  projectId: "sign-up-e0b5e",
  storageBucket: "sign-up-e0b5e.firebasestorage.app",
  messagingSenderId: "1738474768",
  appId: "1:1738474768:web:85cfad4ca10bce0ff65195",
  measurementId: "G-FPH575EBL8",
};

let app: FirebaseApp;
let auth: Auth;
let db: Database;

if (typeof window !== "undefined") {
  app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getDatabase(app);
}

export { app, auth, db };
