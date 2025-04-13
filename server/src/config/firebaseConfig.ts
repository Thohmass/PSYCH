import admin from "firebase-admin";
import * as serviceAccount from "./hladampsychologaFirebaseAdminSDK.json";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

console.log("✅ Firebase Admin SDK initialized successfully");

export const db = admin.firestore();
