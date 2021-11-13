import React, { useCallback, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./App.css";
import Form from "components/Form";
import iFile from "./types/iFile";
import { getCollection } from "./firebaseServices/firestore";
import CloudFile from "./components/CloudFile";
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
  }, [getFiles]);

  const Files = loadedData.map((file: iFile) => (
    <CloudFile key={file.id} file={file} />
  ));

  return (
    <div className="App">
      <Form />
      {status === 0 && <Spinner />}
      {status === 1 && <ul>{Files}</ul>}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}

export default App;
