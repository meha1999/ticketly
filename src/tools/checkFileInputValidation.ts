const expectedFileTypes = [
  "rar",
  "zip",
  "txt",
  "pdf",
  "docx",
  "xlsx",
  "mp4",
  "mp3",
  "png",
  "jpg",
  "jpeg",
  "mkv",
  "gif",
  "mov",
];

const expectedVideoType = ["mkv ", "mp4", "mov"];
const expectedImageType = ["png ", "jpeg", "jpg"];

export const checkFileInputValidation = (
  fileFullNameWithExtension: string,
  type: "file" | "image" | "video"
) => {
  const lookUpObj = {
    file: expectedFileTypes,
    image: expectedImageType,
    video: expectedVideoType,
  };
  const fileExtension = fileFullNameWithExtension
    .substring(fileFullNameWithExtension.lastIndexOf(".") + 1)
    .toLowerCase();
  const isValid = lookUpObj[type].some((i) => i === fileExtension);
  return isValid;
};
