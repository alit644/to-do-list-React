// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpMUzNCmPSDCney9wworlUQ7xUxhTcIE4",
  authDomain: "to-do-list-ff446.firebaseapp.com",
  projectId: "to-do-list-ff446",
  storageBucket: "to-do-list-ff446.appspot.com",
  messagingSenderId: "40682644326",
  appId: "1:40682644326:web:e2435c48d4d86f66bfdea7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app);
export const db = getFirestore(app);
