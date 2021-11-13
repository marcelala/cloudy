//dependencies
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
//project files
import { firebaseConfig } from "../firebase.env";

const firebaseInstance = initializeApp(firebaseConfig);
export const fireStoreInstance = getFirestore(firebaseInstance);
export const authInstance = getAuth(firebaseInstance);
export const storageInstance = getStorage(firebaseInstance);
