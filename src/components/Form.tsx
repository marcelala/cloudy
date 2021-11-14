//dependencies
import { FormEvent, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

//project files
import { useDataContext } from "../state/FilesContext";
import { createDocument } from "../firebaseServices/firestore";
import { storageInstance } from "../firebaseServices/firebase";
import { alertError } from "../firebaseServices/storage";
import InputFile from "./InputFile";
import InputField from "./InputField";
import { newFile } from "../types/newFile";
import iFile from "../types/iFile";

export default function Form() {
  const { filesData, setFilesData } = useDataContext();
  const [newFileData, setNewFileData] = useState(newFile);
  const [progress, setProgress] = useState(0);
  const fields = require("data/formFields.json");
  const { fileURL, name, author, metadata } = newFileData;

  function onChange(key: string, value: string) {
    const field = { [key]: value };
    setNewFileData({ ...newFileData, ...field });
  }

  async function onFileChange(event: any) {
    event.preventDefault();
    const file = event.target.files[0];
    await cloudUpload(file);
  }

  async function cloudUpload(file: any) {
    if (!file) return;
    const fileExtension = file.name.split(".").pop();
    const myMetadata = {
      customMetadata: {
        author: author,
        extension: fileExtension,
      },
    };
    const fileName = newFileData.name
      ? `${newFileData.name}.${fileExtension}`
      : file.name;
    const filePath = `files/${fileName}`;
    const storageReference = ref(storageInstance, filePath);
    const uploadTask = uploadBytesResumable(storageReference, file, myMetadata);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => alertError(error),
      async () => {
        const savedMetadata = uploadTask.snapshot.metadata;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setNewFileData({
          ...newFileData,
          fileURL: downloadURL,
          metadata: savedMetadata,
        });
      }
    );
  }

  async function onSave(fileData: iFile, e: FormEvent) {
    e.preventDefault();
    if (author.length < 1)
      setNewFileData({ ...newFileData, author: "unknown" });
    const { size, customMetadata, fullPath, timeCreated, contentType } =
      metadata;
    const databaseBackup = {
      fileURL,
      name,
      author,
      metadata: {
        extension: customMetadata.extension,
        size,
        fullPath,
        timeCreated,
        contentType,
      },
    };
    const documentID = await createDocument("files", databaseBackup);
    documentID
      ? setFilesData([...filesData, databaseBackup])
      : alert(" Yikes, there was a problem adding this file");
    setProgress(0);
    alert("File uploaded");
    await setNewFileData(newFile);
  }

  return (
    <section id="form">
      <form onSubmit={(e) => onSave(newFileData, e)}>
        <InputField onChange={onChange} settings={fields.name} state={name} />
        <InputField
          onChange={onChange}
          settings={fields.author}
          state={author}
        />
        <InputFile
          onFileChange={onFileChange}
          settings={fields.fileURL}
          state={fileURL}
        />
        <h2>Uploading {progress}%</h2>
        <button className="btn-primary" type={"submit"}>
          Save
        </button>
      </form>
    </section>
  );
}
