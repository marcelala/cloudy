import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./styles/index.sass";
import Form from "components/Form";
import iFile from "./types/iFile";
import { deleteDocument, getCollection } from "./firebaseServices/firestore";
import CloudFile from "./components/CloudFile";
import { deleteFile } from "./firebaseServices/storage";
function App() {
  const initialState: any[] = [];
  const [loadedData, setLoadedData] = useState(initialState);
  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  const getFiles = useCallback(async (path: string) => {
    try {
      const storedFiles = await getCollection(path);
      setLoadedData(storedFiles);
      setStatus(1);
    } catch {
      setStatus(2);
    }
  }, []);

  useEffect(() => {
    getFiles("files");
    console.log("fetch");
  }, [getFiles]);

  const Files = loadedData.map((file: iFile, index) => {
    if (loadedData.length === 0) {
      return null;
    }
    return <CloudFile key={file.id} file={file} />;
  });

  return (
    <div className="App">
      <h1>EsterCloud</h1>
      <p>
        Welcome to our cloud storage service. If you would like to alter the
        file's information just fill out the form below before uploading.
      </p>
      <Form />
      {status === 0 && <Spinner />}
      {status === 1 && <ul>{Files}</ul>}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}

export default App;
