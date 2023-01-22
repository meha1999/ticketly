import axios from "axios";
import { FC, useState } from "react";
import { formatBytes } from "src/tools/bitTobite";
import { RxDownload } from "react-icons/rx";
import { BsCheckLg } from "react-icons/bs";

interface FileMassageDownloaderProps {
  fileDownloadSrc: string;
  fileSize: number;
}

const FileMassageDownloader: FC<FileMassageDownloaderProps> = ({
  fileDownloadSrc,
  fileSize,
}) => {
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);

  const downloadFileData = async () => {
    const data = await axios.get(fileDownloadSrc, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        let percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        setPercentage(percentCompleted);
      },
    });
    const anchorTag = document.createElement("a");
    const href = URL.createObjectURL(data.data);
    anchorTag.href = href;
    anchorTag.setAttribute("href", href);
    anchorTag.setAttribute("target", "_blank");
    anchorTag.setAttribute("download", "new-file");
    anchorTag.click();
    URL.revokeObjectURL(href);
  };

  const filePathArr = fileDownloadSrc.split("/");
  const fileName = filePathArr[filePathArr.length - 1];

  return (
    <div className="file-download-massage-wrapper">
      <span>{formatBytes(fileSize)}</span>
      <div className="file-detail">
        <p>
          {fileName.substring(0, 25) +
            "..." +
            fileName.split(".")[fileName.split(".").length - 1]}
        </p>
        <button
          className="download"
          onClick={() => {
            setLoading(true);
            downloadFileData();
          }}
        >
          {loading ? (
            percentage === 100 ? (
              <BsCheckLg />
            ) : (
              percentage
            )
          ) : (
            <RxDownload />
          )}
        </button>
      </div>
    </div>
  );
};

export default FileMassageDownloader;
