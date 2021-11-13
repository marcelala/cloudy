// dependencies
import { ref, deleteObject } from "firebase/storage";

//project files
import { storageInstance } from "./firebase";

export async function deleteFile(file: any) {
  const filePath = `${file.name}`;
  const storageReference = ref(storageInstance, filePath);
  deleteObject(storageReference)
    .then(() => {
      // File deleted successfully
    })
    .catch((error) => {
      // Uh-oh, an error occurred!
    });
}
