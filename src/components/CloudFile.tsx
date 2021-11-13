import Icon from "./Icon";
import iFile from "../types/iFile";

type iProps = {
  file: iFile;
  onClick: Function;
};

export default function CloudFile({ file, onClick }: iProps) {
  const { name, fileURL, metadata } = file;

  return (
    <li>
      <a href={fileURL} target="_blank" rel="noreferrer" download>
        <Icon fileName={metadata.extension} />
        <span>{name}</span>
      </a>

      <button onClick={(e) => onClick(e)} className={"btn-delete"}>
        <Icon fileName={"cloud-off"} />
      </button>
    </li>
  );
}
