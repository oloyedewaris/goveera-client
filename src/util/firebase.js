import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBqRTn7_9WKvlnEH7svcKy5SMxiegXeUG0",
  authDomain: "goveera-3c5e4.firebaseapp.com",
  projectId: "goveera-3c5e4",
  storageBucket: "goveera-3c5e4.appspot.com",
  messagingSenderId: "884772168511",
  appId: "1:884772168511:web:22481833ea901e5d5a698a",
  measurementId: "G-XS43V7F1QB"
};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
const analytics = getAnalytics(app)
console.log('analytics', analytics)
