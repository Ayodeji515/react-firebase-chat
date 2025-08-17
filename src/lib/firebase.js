import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAPkYQGwlNL3gQVb8yGGEeWzxI8scWogsk",
  authDomain: "chatapp-f464d.firebaseapp.com",
  projectId: "chatapp-f464d",
  storageBucket: "chatapp-f464d.appspot.com",
  messagingSenderId: "601844839638",
  appId: "1:601844839638:web:86eb753f4fef0c44744577"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);