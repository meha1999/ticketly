import { FC } from "react";
import Image from "next/image";
import notFoundImage from "images/icons/image_not_found.svg";
import { JalaliDateTime } from "jalali-date-time";

interface CustomerOrderCardProps {
  image: string;
  id: string;
  manufacturer: string;
  name: string;
  brand: string;
  price: number;
  dateAndTime: string;
  status: string;
}

const CustomerOrderCard: FC<CustomerOrderCardProps> = ({
  image,
  id,
  manufacturer,
  name,
  brand,
  price,
  dateAndTime,
  status,
}) => {
  const statusTypes: Record<string, string> = {
    PENDING_ACCEPTION: "در انتظار تایید ارزیاب",
    DELIVERED: "تحویل داده شده است",
  };

  const dateTimeConfig = {
    timezone: "Asia/Tehran",
    locale: "en",
    fullTextFormat: "d N ماه Y  -  H:I ",
    titleFormat: "W, D N Y ",
    dateFormat: "Y-M-D",
    timeFormat: "H:I:S",
  };

  return (
    <div className="customer-order-card">
      <div className="image-container">
        <Image src={image ? image : notFoundImage} alt="image" />
      </div>
      <div className="heading">
        <span className="order-id">{id}</span>
        <button className="supplier-name">
          {manufacturer ? manufacturer : "نا‌مشخص"}
        </button>
      </div>
      <p className="name">{name}</p>
      <p className="brand-container">
        <span className="title">برند:</span>
        <span className="brand">{brand ? brand : "نا‌مشخص"}</span>
      </p>
      <p className="price-container">
        <span className="title">قیمت:</span>
        <span>{price}</span>
        <span>تومان</span>
      </p>
      <p className="date-and-time">
        {JalaliDateTime(dateTimeConfig).toFullText(new Date(dateAndTime))}
      </p>
      <div className="status">{statusTypes[status]}</div>
    </div>
  );
};

export default CustomerOrderCard;
