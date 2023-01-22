import Modal from "components/common/modal/Modal";
import Image from "next/image";
import { FC, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import useUserTypeFinder from "src/tools/custom-hooks/useUserType";

interface ImageMassageViewerProps {
  thumbImg: string;
  bigImage: string;
}

const ImageMassageViewer: FC<ImageMassageViewerProps> = ({
  thumbImg,
  bigImage,
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const { userColorConfig } = useUserTypeFinder();

  return (
    <div
      className={`image-massage-viewer-wrapper ${loading ? "loading" : ""} `}
      style={{ outlineColor: userColorConfig }}
      onClick={() => {
        setLoading(false);
        setIsImageLoaded(true);
      }}
    >
      <Image
        src={isImageLoaded ? bigImage : thumbImg}
        width={180}
        height={180}
        alt="messaga image"
        placeholder="blur"
        blurDataURL={thumbImg}
        onClick={() => isImageLoaded && setOpenImage(true)}
        className={isImageLoaded ? "active" : ""}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadingComplete={() => {
          setLoading(false);
        }}
      />
      {!isImageLoaded && (
        <span className="download-icon">
          <BsArrowDownCircle />
        </span>
      )}
      <Modal isOpen={openImage} onClose={() => setOpenImage(false)}>
        <Image
          width={600}
          src={bigImage}
          height={600}
          placeholder="blur"
          blurDataURL={thumbImg}
          alt="messaga image"
          className={isImageLoaded ? "active" : ""}
        />
      </Modal>
    </div>
  );
};

export default ImageMassageViewer;
