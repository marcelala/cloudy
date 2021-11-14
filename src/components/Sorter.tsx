//dependencies
import { ChangeEvent, useState } from "react";

import { useDataContext } from "../state/FilesContext";
import iFile from "../types/iFile";

export default function Sorter() {
  const { filesData, setFilesData } = useDataContext();
  //local state
  const [activeSorter, setActiveSorter] = useState("");
  //methods
  function sortListByName(list: iFile[]) {
    return list.slice().sort((a, b) => a.name.localeCompare(b.name, "sv"));
  }

  function sortListBySize(list: iFile[]) {
    return list.slice().sort((a, b) => b.metadata.size - a.metadata.size);
  }

  function sortList(type: string) {
    if (type === "byName") return sortListByName(filesData);
    else if (type === "bySize") return sortListBySize(filesData);
  }

  function handleSorting(e: ChangeEvent<HTMLInputElement>) {
    setActiveSorter(e.target.value);
    const sortedList = sortList(e.target.value);
    setFilesData(sortedList);
  }

  return (
    <section id="sorter">
      <h4 className="sort-label">Sort by:</h4>
      <div className="btn-sort byName">
        <label htmlFor="byName">
          <input
            id="byName"
            type="radio"
            value={"byName"}
            checked={activeSorter === "byName"}
            onChange={(e) => handleSorting(e)}
          />
          A→Z
        </label>
      </div>
      <div className="btn-sort bySize">
        <label htmlFor="bySize">
          <input
            id="bySize"
            type="radio"
            value={"bySize"}
            checked={activeSorter === "bySize"}
            onChange={(e) => handleSorting(e)}
          />
          Size
        </label>
      </div>
    </section>
  );
}
