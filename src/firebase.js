import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAS2L6FKTjGSpsGiisFS0smYauJXCRvOAY",
  authDomain: "nowzyflix.firebaseapp.com",
  projectId: "nowzyflix",
  storageBucket: "nowzyflix.firebasestorage.app",
  messagingSenderId: "832893999548",
  appId: "1:832893999548:web:fff26447ecde06ccb6f3b9",
  measurementId: "G-CT4ZHHRLW0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
