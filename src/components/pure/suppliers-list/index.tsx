import { FC } from "react";

interface SuppliersListProps {
  // list: Array<any>;
  // cancel: () => void;
  // confirm: () => void;
  elementRef: React.RefObject<HTMLDivElement>;
}

const SuppliersList: FC<SuppliersListProps> = ({ elementRef }) => {
  return (
    <div className="suppliers-list-modal" ref={elementRef}>
      SuppliersList
    </div>
  );
};

export default SuppliersList;
