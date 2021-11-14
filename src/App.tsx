import React, { useCallback, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./styles/index.sass";
import Form from "components/Form";
import iFile from "./types/iFile";
import { getCollection } from "./firebaseServices/firestore";
import CloudFile from "./components/CloudFile";
import Hero from "./components/Hero";
import { useDataContext } from "./state/FilesContext";
function App() {
  const { filesData, setFilesData } = useDataContext();
  const [loadedData, setLoadedData] = useState(filesData);

  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  const getFiles = useCallback(async (path: string) => {
    try {
      const storedFiles = await getCollection(path);
      // @ts-ignore
      setLoadedData(storedFiles);
      setStatus(1);
      console.log("fetch");
      setFilesData(storedFiles);
      console.log("context", filesData);
    } catch {
      setStatus(2);
    }
  }, []);

  useEffect(() => {
    getFiles("files");
  }, [getFiles]);

  const Files = filesData.map((file: iFile, index) => {
    if (loadedData.length === 0) {
      return null;
    }
    return <CloudFile key={index} file={file} />;
  });

  return (
    <div className="App">
      <Hero />
      <Form />
      <main>
        <h2>Your files</h2>
        {status === 0 && <Spinner />}
        {status === 1 && <ul>{Files}</ul>}
        {status === 2 && <p>Error 🚨</p>}
      </main>
    </div>
  );
}

export default App;
