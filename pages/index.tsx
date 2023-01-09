import DashboardLayout from "components/layouts/dashboard/evaluator";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import { useRef, useState } from "react";

export default function Home() {
  // const divRef = useRef<any>(null);
  // const portalContainer: any = document.getElementById("portal");
  // const [isOpen, setIsOpen] = useState<boolean>(false);

  // useCloseByClickOutSide({
  //   ref: divRef,
  //   isOpened: isOpen,
  //   setIsOpened: setIsOpen,
  // });

  return (
    <>
      <DashboardLayout />
      {/* {isOpen &&
        ReactDOM.createPortal(
          <CustomPortal>
            <div
              ref={divRef}
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "red",
              }}
            >
              sfdssdfa
            </div>
          </CustomPortal>,
          portalContainer
        )} */}
    </>
  );
}
