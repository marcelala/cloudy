// NPM package
import { createContext, ReactNode, useContext, useState } from "react";
import iFile from "../types/iFile";
//interface
interface iProps {
  children: ReactNode;
}
interface iContext {
  filesData: iFile[];
  setFilesData: Function;
}
// Properties
const initialState: iFile[] = [];
const FilesDataContext = createContext<iContext>({
  filesData: initialState,
  setFilesData: () => console.warn("context used outside the provider"),
});

export function FilesDataProvider({ children }: iProps) {
  // Local state
  const [filesData, setFilesData] = useState(initialState);

  return (
    <FilesDataContext.Provider value={{ filesData, setFilesData }}>
      {children}
    </FilesDataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(FilesDataContext);
}
