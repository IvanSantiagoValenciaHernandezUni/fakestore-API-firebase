// firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnKJwpxJxl6jjTD2esMRfTd_xenC24OXY",
  authDomain: "fakestore-api-55a6a.firebaseapp.com",
  projectId: "fakestore-api-55a6a",
  storageBucket: "fakestore-api-55a6a.appspot.com",
  messagingSenderId: "671067418756",
  appId: "1:671067418756:web:98a3580e0ca38e1a1292d1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
