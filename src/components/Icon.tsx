interface iProps {
  fileName: string;
}

export default function Icon({ fileName }: iProps) {
  const iconObject = require(`assets/images/${fileName}.svg`);
  const iconURL = iconObject.default;
  return (
    <img
      src={iconURL}
      alt={"icon-of-" + fileName}
      className={"icon icon-" + fileName}
    />
  );
}
