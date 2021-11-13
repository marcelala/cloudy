import InputFile from "./InputFile";
import InputField from "./InputField";
import { FormEvent, useState } from "react";
import { newFile } from "../types/newFile";
import iFile from "../types/iFile";
import { createDocument } from "../firebaseServices/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageInstance } from "../firebaseServices/firebase";

export default function Form() {
  const [fileData, setFileData] = useState(newFile);
  const [progress, setProgress] = useState(0);
  const fields = require("data/formFields.json");
  const { fileURL, name, author, metadata } = fileData;

  function onChange(key: string, value: string) {
    const field = { [key]: value };
    setFileData({ ...fileData, ...field });
  }

  async function onFileChange(event: any) {
    event.preventDefault();
    const file = event.target.files[0];
    await cloudUpload(file);
  }

  async function cloudUpload(file: any) {
    if (!file) return;
    const fileExtension = file.name.split(".").pop();
    const customData = {
      customMetadata: {
        author: author || "unknown",
        customName: name || file.name,
        extension: fileExtension,
      },
    };
    const filePath = `files/${fileData.name || file.name}.${fileExtension}`;
    const storageReference = ref(storageInstance, filePath);
    const uploadTask = uploadBytesResumable(storageReference, file, customData);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => alertError(error),
      async () => {
        const savedMetadata = uploadTask.snapshot.metadata;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFileData({
          ...fileData,
          fileURL: downloadURL,
          // @ts-ignore
          metadata: savedMetadata,
        });
        console.log("after upload", savedMetadata);
      }
    );
  }

  function alertError(error: any) {
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

  async function onSave(fileData: iFile, e: FormEvent) {
    e.preventDefault();
    const { name, size, customMetadata, fullPath, timeCreated, contentType } =
      metadata;
    const databaseBackup = {
      fileURL: fileURL,
      name: name,
      author: author,
      metadata: {
        name: metadata.name,
        extension: customMetadata.extension,
        size: size,
        fullPath: fullPath,
        timeCreated: timeCreated,
        contentType: contentType,
      },
    };
    const documentID = await createDocument("files", databaseBackup);
    fileData.id = documentID;
    documentID
      ? setFileData(newFile)
      : alert(" Yikes, there was a problem adding this file");
  }

  return (
    <form className="form" onSubmit={(e) => onSave(fileData, e)}>
      <InputField onChange={onChange} settings={fields.name} state={name} />
      <InputField onChange={onChange} settings={fields.author} state={author} />
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
  );
}
