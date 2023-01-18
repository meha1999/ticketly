import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";

type BackdropCloseType = "active" | "de-active";

interface ModalProps {
  children: any;
  isOpen?: boolean;
  className?: string;
  onClose?: () => void;
  needToBeFixed?: boolean;
  container?: HTMLElement | null;
  backdropClose?: BackdropCloseType;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  className,
  isOpen = false,
  needToBeFixed,
  backdropClose = "active",
  container = document.body,
}) => {
  const container2: any = document.getElementById("portal");
  const ref = useRef(null);
  if (isOpen) {
    return (
      <>
        {ReactDOM.createPortal(
          <div
            className="modal-wrapper"
            style={{
              position: needToBeFixed ? "fixed" : "absolute",
            }}
          >
            <span className="masked-fix"></span>
            <div
              ref={ref}
              className={`${className || ""} container__modal`}
              onClick={(e) => {
                if (e.target === ref.current) {
                  backdropClose === "active" ? onClose!() : "";
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
