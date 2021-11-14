// NPM packages
import {
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
// Project files
import { fireStoreInstance } from "./firebase";

// Create
export async function createDocumentWithId(
  path: string,
  id: string,
  data: any
) {
  const documentReference = doc(fireStoreInstance, path, id);
  await setDoc(documentReference, data);
  return id;
}

export async function createDocument(path: string, data: any) {
  const collectionReference = collection(fireStoreInstance, path);
  const documentReference = await addDoc(collectionReference, data);
  return documentReference.id;
}

// Read
export async function getDocument(path: string, id: string) {
  const documentReference = doc(fireStoreInstance, path, id);
  const document = await getDoc(documentReference);
  return { id: document.id, ...document.data() };
}

export async function getCollection(path: string) {
  const collectionReference = collection(fireStoreInstance, path);
  const snapshot = await getDocs(collectionReference);
  const list = snapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return list;
}

// Update
export async function updateDocument(path: string, data: any) {
  const documentReference = doc(fireStoreInstance, path, data.id);
  await updateDoc(documentReference, data);
}

//Delete
export async function deleteDocument(path: string, docId: string) {
  const documentReference = doc(fireStoreInstance, path, docId);
  await deleteDoc(documentReference);
}
