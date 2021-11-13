import iFile from "../types/iFile";
import PropsFile from "../types/PropsFile";
import Icon from "./Icon";
export default function CloudFile({ file }: PropsFile) {
  const { name, fileURL, metadata } = file;
  return (
    <li>
      <a href={fileURL} target="_blank" rel="noreferrer" download>
        <Icon fileName={metadata.extension} />
        <span>{name}</span>
      </a>
    </li>
  );
}
