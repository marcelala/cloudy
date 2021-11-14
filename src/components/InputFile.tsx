// dependencies
import { useState } from "react";

// project files
import Icon from "./Icon";

// interfaces
interface iFields {
  key: string;
  label: string;
  instructions: string;
}
interface iProps {
  onFileChange: Function;
  settings: iFields;
  state: any;
}

export default function InputFile({ onFileChange, settings, state }: iProps) {
  const { label, key, instructions } = settings;
  const [preview, setPreview] = useState("file");
  // methods
  function getPreview(event: React.ChangeEvent<HTMLInputElement>) {
    // @ts-ignore
    const file = event.target.files[0];
    const fileExtension = file.name.split(".").pop();
    const imageName = `${fileExtension}`;
    imageName ? setPreview(imageName) : setPreview("cloud");
  }

  return (
    <fieldset className="file-input">
      <label className="custom-file-chooser">
        {label}
        <div className="preview-input-wrapper">
          <Icon fileName={preview} />
          <input
            accept=".pdf ,.xml, .jpeg"
            onChange={(event) => onFileChange(event).then(getPreview(event))}
            type="file"
            required
          />
        </div>
        <small>{instructions}</small>
      </label>
    </fieldset>
  );
}
