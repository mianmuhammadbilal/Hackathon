// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc 
  , getDocs
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// 🔥 Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvYVgdw0mglUN7fx2Mt6QxeTGzyD5oGpU",
  authDomain: "coding-night15.firebaseapp.com",
  projectId: "coding-night15",
  storageBucket: "coding-night15.appspot.com",
  messagingSenderId: "947340866507",
  appId: "1:947340866507:web:3ab07e745122eb8a5afc4e"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export for use in other files
export { auth, db, getFirestore, getDocs,collection, addDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword };
