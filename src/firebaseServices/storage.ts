// dependencies
import { ref, deleteObject } from "firebase/storage";

//project files
import { storageInstance } from "./firebase";

export function alertError(error: any) {
  console.error("Upload failed", error);
  switch (error.code) {
    case "storage/object-not-found":
      alert("File doesn't exist");
      break;
    case "storage/unauthorized":
      alert("User doesn't have permission to access the object");
      break;
    case "storage/canceled":
      alert("User canceled the upload");
      break;
    case "storage/unknown":
      alert("Unknown error occurred, inspect the server response");
      break;
  }
}

export async function deleteFile(file: any) {
  const filePath = `files/${file.name}`;
  const storageReference = ref(storageInstance, filePath);
  deleteObject(storageReference)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}
