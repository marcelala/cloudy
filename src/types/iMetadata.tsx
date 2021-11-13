export default interface iMetadata {
  name: string;
  size: number;
  timeCreated: string;
  contentType: string;
  contentLanguage: string;
  customMedata?: {
    customName: string;
    author: string;
  };
}
