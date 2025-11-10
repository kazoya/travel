// Firebase configuration
// In production (Firebase App Hosting), these are auto-configured
// In development or other platforms, use environment variables or fallback to defaults
export const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "studio-9003095340-a6641",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:61502026081:web:664ac632df1e52afbb9520",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBpP9EUNnDJLrQEWWI2hfcaypGN6UosfC4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "studio-9003095340-a6641.firebaseapp.com",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "61502026081",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "studio-9003095340-a6641.appspot.com"
};
