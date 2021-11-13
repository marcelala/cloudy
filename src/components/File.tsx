import iFile from "../types/iFile";

export default function File(item: iFile) {
  const { id, name, fileURL } = item;
  return (
    <li>
      <span>{name}</span>
    </li>
  );
}
