import { FC } from "react";
import { FiPackage } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";
import { CiCircleCheck } from "react-icons/ci";
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
  isSupplier?: boolean;
  onSupplierAction?: (OrderId: string) => void;
  onClientAction?: (
    OrderId: string,
    status: "RECEIVED" | "REJECTED" | "CONFIRMED"
  ) => void;
}

const CustomerOrderCard: FC<CustomerOrderCardProps> = ({
  image,
  id,
  manufacturer,
  name,
  brand,
  price,
  dateAndTime,
  isSupplier,
  status,
  onSupplierAction = () => {},
  onClientAction = () => {},
}) => {
  const statusTypes: Record<string, string> = {
    SUBMITED: "سفارش ثبت شده",
    SENT: " در حال ارسال",
    RECEIVED: "دریافت شده",
    REJECTED: "عودت داده شده",
    CONFIRMED: "تحویل داده شده است ",
    FAILED: "ناموفق",
  };

  const dateTimeConfig = {
    timezone: "Asia/Tehran",
    locale: "en",
    fullTextFormat: "d N ماه Y  -  H:I ",
    titleFormat: "W, D N Y ",
    dateFormat: "Y-M-D",
    timeFormat: "H:I:S",
  };

  const statusIconsConfig: Record<string, any> = {
    SENT: (
      <button
        className="icon dark-green"
        onClick={() => onClientAction(id, "RECEIVED")}
      >
        <FiPackage title="تحویل گرفتن" />
      </button>
    ),
    RECEIVED: (
      <>
        <button
          className="icon dark"
          onClick={() => onClientAction(id, "REJECTED")}
        >
          <TbArrowBackUp title="برگشت دادن" />
        </button>
        <button
          className="icon  light-green"
          onClick={() => onClientAction(id, "CONFIRMED")}
        >
          <CiCircleCheck title="تایید بسته" />
        </button>
      </>
    ),
  };

  const statusIconsConfigSupplier: Record<string, any> = {
    SUBMITED: (
      <button className="icon dark-green" onClick={() => onSupplierAction(id)}>
        <FiPackage title="ارسال" />
      </button>
    ),
  };

  const statusTextColorClass: Record<string, any> = {
    SUBMITED: "norm",
    SENT: "danger",
    CONFIRMED: "norm",
    RECEIVED: "norm",
    REJECTED: "alert",
    FAILED: "alert",
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
      <div className="status">
        <button className={"btn" + " " + statusTextColorClass[status] || ""}>
          {statusTypes[status]}
        </button>
        {isSupplier
          ? statusIconsConfigSupplier[status]
          : statusIconsConfig[status] || ""}
      </div>
    </div>
  );
};

export default CustomerOrderCard;
