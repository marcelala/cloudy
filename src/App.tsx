import React, { useCallback, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./styles/index.sass";
import Form from "components/Form";
import iFile from "./types/iFile";
import { getCollection } from "./firebaseServices/firestore";
import CloudFile from "./components/CloudFile";
import Hero from "./components/Hero";
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
