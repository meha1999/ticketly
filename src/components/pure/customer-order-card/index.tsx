import { FC } from "react";
import Image from "next/image";
import notFoundImage from "images/icons/image_not_found.svg";

interface CustomerOrderCardProps {
  image: string;
  id: string;
  supplierName: string;
  name: string;
  brand: string;
  price: number;
  dateAndTime: string;
  status: string;
}

const CustomerOrderCard: FC<CustomerOrderCardProps> = ({
  image,
  id,
  supplierName,
  name,
  brand,
  price,
  dateAndTime,
  status,
}) => {
  return (
    <div className="customer-order-card">
      <div className="image-container">
        <Image src={notFoundImage} alt="image" />
      </div>
    </div>
  );
};

export default CustomerOrderCard;
