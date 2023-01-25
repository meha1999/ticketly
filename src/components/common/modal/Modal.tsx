import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

type BackdropCloseType = "active" | "de-active";

interface ModalProps {
  children: any;
  isOpen?: boolean;
  className?: string;
  notClosableByUser?: boolean;
  onClose?: () => void;
  needToBeFixed?: boolean;
  noSwipeAnimation?: boolean;
  container?: HTMLElement | null;
  backdropClose?: BackdropCloseType;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose = () => {},
  className,
  isOpen = false,
  needToBeFixed,
  noSwipeAnimation,
  backdropClose,
  notClosableByUser,
  container = document.body,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsModalOpen(false), 500);
      return () => clearTimeout(timer);
    } else {
      setIsModalOpen(true);
    }
  }, [isOpen]);

  const container2: any = document.getElementById("portal");
  const ref = useRef(null);
  if (isModalOpen) {
    return (
      <>
        {ReactDOM.createPortal(
          <div
            className="modal-wrapper"
            style={{
              position: needToBeFixed ? "fixed" : "absolute",
            }}
          >
            <span className={`masked-fix ${isOpen ? "" : "fade-out"}`}></span>
            <div
              ref={ref}
              className={`${className || ""} container__modal ${
                isOpen
                  ? noSwipeAnimation
                    ? "no-animation"
                    : "swipe"
                  : noSwipeAnimation
                  ? "pop-out"
                  : "swipe-out"
              }`}
              onClick={(e) => {
                if (e.target === ref.current) {
                  backdropClose && !notClosableByUser ? onClose!() : "";
                }
              }}
            >
              {children}
            </div>
          </div>,
          container2
        )}
      </>
    );
  } else {
    return <></>;
  }
};
export default Modal;
