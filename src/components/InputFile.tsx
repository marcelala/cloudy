// NPM packages
// Project files
import Placeholder from "assets/images/file.svg";

// Interfaces
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

  // Properties
  const File = state === "" ? Placeholder : state;

  // Methods
  // async function onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   const file_url = await uploadFile(file, metadata);
  //   alert("File uploaded");
  //   onChange(key, file_url);
  // }

  return (
    <fieldset className="file-input">
      <label className="custom-file-chooser">
        {label}
        <img src={File} alt="User generated content" />
        <input
          accept="application/pdf,text/xml, image/jpg"
          onChange={(event) => onFileChange(event)}
          type="file"
        />
        <a href={File} target="_blank" rel="noreferrer">
          Download file
        </a>
        <small>{instructions}</small>
      </label>
    </fieldset>
  );
}
