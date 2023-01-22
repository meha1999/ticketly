import Modal from "components/common/modal/Modal";
import Image from "next/image";
import { useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";

const ImageMassageViewer = ({ img }: { img?: string }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(false);

  return (
    <div
      className={`image-massage-viewer-wrapper ${loading ? "loading" : ""} `}
      onClick={() => {
        setLoading(false);
        setIsImageLoaded(true);
      }}
    >
      <Image
        width={180}
        height={180}
        onClick={() => isImageLoaded && setOpenImage(true)}
        className={isImageLoaded ? "active" : ""}
        // onLoadingComplete={() => {
        //   setLoading(false);
        //   setIsImageLoaded(true);
        // }}
        alt="messaga image"
        src="http://172.16.151.226:5000/media/files/blured_79f3683a6263dc31b16276851991176633vw9afDE59p6lKY0_faypwT7.png"
      />
      {!isImageLoaded && (
        <span className="download-icon">
          <BsArrowDownCircle />
        </span>
      )}
      <Modal isOpen={openImage} onClose={() => setOpenImage(false)}>
        <Image
          width={600}
          height={600}
          className={isImageLoaded ? "active" : ""}
          onLoadingComplete={() => {
            setLoading(false);
            setIsImageLoaded(true);
          }}
          alt="messaga image"
          src="http://172.16.151.226:5000/media/files/blured_79f3683a6263dc31b16276851991176633vw9afDE59p6lKY0_faypwT7.png"
        />
      </Modal>
    </div>
  );
};

export default ImageMassageViewer;
