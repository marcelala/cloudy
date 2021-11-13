import React, { useCallback, useEffect, useState } from "react";
import Spinner from "./components/Spinner";
import "./App.css";
import Form from "components/Form";
import iFile from "./types/iFile";
import { list, listAll, ref } from "firebase/storage";
import { storageInstance } from "./firebaseServices/firebase";
function App() {
  const initialState: any = [];
  const [loadedData, setLoadedData] = useState(initialState);
  const [status, setStatus] = useState(0); // 0 pending, 1 ready, 2 error

  /*const getFiles = useCallback(async (path: string) => {
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


  ));*/

  // const getFiles = useCallback(async (bucketPath: string) => {
  //   try {
  //     const bucketReference = ref(storageInstance, bucketPath);
  //     const fileReferences = await list(bucketReference);
  //     fileReferences.items.forEach((ref) => {
  //       console.log(ref);
  //       console.log(ref.fullPath);
  //     });
  //     //setLoadedData(files);
  //     //console.log(files);
  //     setStatus(1);
  //   } catch {
  //     setStatus(2);
  //   }
  // }, []);

  // const firstPage = await list(bucketReference, { maxResults: 5 });
  //
  // // Use the result.
  // // processItems(firstPage.items)
  // // processPrefixes(firstPage.prefixes)
  //
  // // Fetch the second page if there are more elements.
  // if (firstPage.nextPageToken) {
  //     const secondPage = await list(bucketReference, {
  //         maxResults: 5,
  //         pageToken: firstPage.nextPageToken,
  //     });
  // processItems(secondPage.items)
  // processPrefixes(secondPage.prefixes)
  //
  // useEffect(() => {
  //   getFiles("files");
  // }, []);

  // const Files = loadedData.map((file: iFile) => (
  //   <span key={file.id}> {file.name})</span>
  // ));

  return (
    <div className="App">
      <Form />
      {status === 0 && <Spinner />}
      {/*{status === 1 && <ul>{Files}</ul>}*/}
      {status === 2 && <p>Error 🚨</p>}
    </div>
  );
}

export default App;
