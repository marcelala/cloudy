//dependencies
import React, { useCallback, useEffect, useState } from "react";
//project files
import "./styles/index.sass";
import { useDataContext } from "./state/FilesContext";
import { getCollection } from "./firebaseServices/firestore";
import Spinner from "components/Spinner";
import Hero from "components/Hero";
import Form from "components/Form";
import Sorter from "components/Sorter";
import CloudFile from "components/CloudFile";
import iFile from "./types/iFile";

function App() {
  const { filesData, setFilesData } = useDataContext();
  const [loadedData, setLoadedData] = useState(filesData);

  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  const getFiles = useCallback(
    async (path: string) => {
      try {
        const storedFiles = await getCollection(path);
        // @ts-ignore
        setLoadedData(storedFiles);
        setStatus(1);
        setFilesData(storedFiles);
      } catch {
        setStatus(2);
      }
    },
    [setFilesData]
  );

  useEffect(() => {
    getFiles("files");
  }, [getFiles]);

  const Files = filesData.map((file: iFile, index) => {
    if (filesData.length === 0) {
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
        <Sorter />
        {status === 0 && <Spinner />}
        {status === 1 && filesData.length === 0 ? (
          <p>You haven't added any files yet</p>
        ) : (
          <ul>{Files}</ul>
        )}
        {status === 2 && <p>Error 🚨</p>}
      </main>
    </div>
  );
}

export default App;
