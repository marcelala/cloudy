import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { FilesDataProvider } from "./state/FilesContext";

ReactDOM.render(
  <React.StrictMode>
    <FilesDataProvider>
      <App />
    </FilesDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
