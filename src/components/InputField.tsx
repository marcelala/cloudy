//dependencies
import { useRef, useState } from "react";

interface iProps {
  onChange: Function;
  settings: {
    key: string;
    instructions: string;
    label: string;
    placeholder: string;
    type: string;
    maxLength: number;
    size: number;
    isRequired: boolean;
    minLength: number;
  };
  state: any;
}

export default function InputField({ onChange, settings, state }: iProps) {
  const {
    key,
    label,
    placeholder,
    type,
    instructions,
    isRequired,
    maxLength,
    minLength,
    size,
  } = settings;
  const [touched, setTouched] = useState(false);
  // Properties
  const inputReference = useRef<HTMLInputElement>(null);

  return (
    <fieldset className={`fieldset fieldset-${key}`}>
      <label
        onClick={() => setTouched(!touched)}
        className={`label label-${key}`}
      >
        {label}
        <input
          onChange={() => onChange(key, inputReference.current?.value)}
          placeholder={placeholder}
          ref={inputReference}
          type={type}
          value={state}
          className={`input-field input-field-${key}`}
          maxLength={maxLength}
          size={size}
          required={isRequired}
          minLength={minLength}
        />
        {touched && <small>{instructions}</small>}
      </label>
    </fieldset>
  );
}
