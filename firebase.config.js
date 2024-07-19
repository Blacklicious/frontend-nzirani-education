import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Print environment variables to debug
console.log("Firebase Config:");
console.log("API Key:", process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
console.log("Auth Domain:", process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN);
console.log("Project ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("Storage Bucket:", process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log("Messaging Sender ID:", process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID);
console.log("App ID:", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);
console.log("Measurement ID:", process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
console.log("Firebase app initialized:", app.name); // Check if app initialization is successful

export const auth = getAuth(app);
console.log("Firebase Auth initialized"); // Check if Auth initialization is successful

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
  console.log("Firebase Analytics initialized"); // Check if Analytics initialization is successful
}

export { analytics };
