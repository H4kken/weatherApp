import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyALOWSc2s3Ycq3hRlQWPX4yZAJyygVTMH0",
  authDomain: "weatherapp-e006f.firebaseapp.com",
  projectId: "weatherapp-e006f",
  storageBucket: "weatherapp-e006f.appspot.com",
  messagingSenderId: "698807419973",
  appId: "1:698807419973:web:10340391d543f9cfc1cf2c"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const FIREBASE_DB = getFirestore(FIREBASE_APP);

export { FIREBASE_AUTH, FIREBASE_DB };
