import admin from "firebase-admin";
// @ts-ignore
import * as serviceAccount from "../hladampsychologaFirebaseAdminSDK.json";

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

console.log("✅ Firebase Admin SDK initialized successfully");

export default admin;
