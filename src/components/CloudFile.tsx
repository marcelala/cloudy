import Icon from "./Icon";
import iFile from "../types/iFile";
import { FormEvent } from "react";
import { deleteDocument } from "../firebaseServices/firestore";
import { deleteFile } from "../firebaseServices/storage";
import moment from "moment";
import { formatBytes } from "../scripts/formatBytes";

type iProps = {
  file: iFile;
};

export default function CloudFile({ file }: iProps) {
  const { name, fileURL, author, metadata, id } = file;
  const { size, timeCreated, fullPath, extension } = metadata;
  const date = moment(timeCreated).format("DD-MM-YYYY");
  const timeAgo = moment(timeCreated).startOf("hour").fromNow();

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
        <span className="fileName">{name}</span>
      </a>
      <span className="author">{author}</span>
      <div className={"time"}>
        <span>{date}</span>
        <span>{timeAgo}</span>
      </div>
      <div className="size">
        <span>{formatBytes(size)}</span>

        <button onClick={(e) => onDelete(e)} className={"btn-delete"}>
          <Icon fileName={"cloud-off"} />
        </button>
      </div>
    </li>
  );
}
