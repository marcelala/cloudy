import InputFile from "./InputFile";
import InputField from "./InputField";
import { FormEvent, useState } from "react";
import { newFile } from "../types/newFile";
import iFile from "../types/iFile";
import { createDocument } from "../firebaseServices/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storageInstance } from "../firebaseServices/firebase";
import { alertError } from "../firebaseServices/storage";

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
    const myMetadata = {
      customMetadata: {
        author: author || "unknown",
        extension: fileExtension,
      },
    };
    const fileName = fileData.name
      ? `${fileData.name}.${fileExtension}`
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

  async function onSave(fileData: iFile, e: FormEvent) {
    e.preventDefault();
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
      ? setFileData(newFile)
      : alert(" Yikes, there was a problem adding this file");
  }

  return (
    <section id="form">
      <form onSubmit={(e) => onSave(fileData, e)}>
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
