//dependencies
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
//project files
import { firebaseConfig } from "../firebase.env";

const firebaseInstance = initializeApp(firebaseConfig);
export const fireStoreInstance = getFirestore(firebaseInstance);
export const storageInstance = getStorage(firebaseInstance);
