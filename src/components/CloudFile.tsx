import Icon from "./Icon";
import iFile from "../types/iFile";
import { FormEvent } from "react";
import { deleteDocument } from "../firebaseServices/firestore";
import { deleteFile } from "../firebaseServices/storage";

type iProps = {
  file: iFile;
};

export default function CloudFile({ file }: iProps) {
  const { name, fileURL, author, metadata, id } = file;
  const { customName, size, timeCreated, fullPath, extension } = metadata;

  async function onDelete(e: FormEvent) {
    e.preventDefault();
    if (window.confirm("Are you sure you want to delete this file forever?")) {
      if (id != null) {
        await deleteDocument("files", id);
      }
      await deleteFile(fullPath);
    }
    return;
  }

  return (
    <li>
      <a href={fileURL} target="_blank" rel="noreferrer" download>
        <Icon fileName={extension} />
        <span>{name || customName}</span>
        <span>{size}</span>
        <span>{author}</span>
        <span>{timeCreated}</span>
      </a>

      <button onClick={(e) => onDelete(e)} className={"btn-delete"}>
        <Icon fileName={"cloud-off"} />
      </button>
    </li>
  );
}
