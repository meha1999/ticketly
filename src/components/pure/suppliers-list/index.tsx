import Title from "components/common/title";
import React, { FC, useRef } from "react";
import suppliersListIcon from "images/icons/suppliers_list.svg";
import Divider from "components/common/divider";
import { BiCheck } from "react-icons/bi";
import UserIcon from "images/icons/user_icon";
import Image from "next/image";
import { JalaliDateTime } from "jalali-date-time";
import { READY_MESSAGES } from "src/static/readyMessages";

interface SuppliersListProps {
  suppliersList: Array<any>;
  cancel: () => void;
  confirm: () => void;
  elementRef: React.RefObject<HTMLDivElement>;
  handleSelect: (id: number) => void;
  selectedSuppliers: Array<any>;
  setSentText: (value: string) => void;
}

const SuppliersList: FC<SuppliersListProps> = ({
  suppliersList,
  cancel,
  confirm,
  elementRef,
  handleSelect,
  selectedSuppliers,
  setSentText,
}) => {
  const dateTimeConfig = {
    timezone: "Asia/Tehran",
    locale: "en",
    fullTextFormat: "d N ماه Y  -  H:I ",
    titleFormat: "W, D N Y ",
    dateFormat: "Y-M-D",
    timeFormat: "H:I:S",
  };

  const sentTextRef: any = useRef();

  const handleSentTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value && setSentText(e.target.value);
  };

  const handleSelectMessage = (value: string) => {
    setSentText(value);
    sentTextRef.current.value = value;
  };

  return (
    <div className="suppliers-list-modal" ref={elementRef}>
      <Title titleText="لیست تامین کنندگان" titleIcon={suppliersListIcon} />
      <Divider />
      <div className="suppliers-list-wrapper">
        <div>
          <div className="list-headings">
            <span>انتخاب</span>
            <span>نام تامین کننده</span>
            <span>تعداد محصول عرضه شده</span>
            <span>تاریخ عضویت</span>
          </div>
          <ul className="list-content">
            {suppliersList?.map((supplier: any, index: number) => (
              <li className="list-item" key={supplier.id}>
                <div
                  className="check-box"
                  onClick={() => handleSelect(supplier.id)}
                >
                  {selectedSuppliers.some((item) => item === supplier.id) && (
                    <BiCheck />
                  )}
                </div>
                <div className="name">
                  <span className="row-number">{index + 1}</span>
                  <div className="profile-image">
                    {supplier.photo ? (
                      <Image
                        src={supplier.photo}
                        alt="profile-image"
                        width={42}
                        height={42}
                      />
                    ) : (
                      <UserIcon color="#F3C701" />
                    )}
                  </div>
                  <span className="username">{supplier.username}</span>
                </div>
                <div className="product-count">0</div>
                <div className="date-and-time">
                  {JalaliDateTime(dateTimeConfig).toFullText(
                    new Date(supplier.date_joined)
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="sent-text-container">
          <label htmlFor="sent-text" className="title">
            متن ارسالی:
          </label>
          <input
            type="text"
            name="sent-text"
            id="sent-text"
            className="sent-text-input"
            onChange={handleSentTextChange}
            ref={sentTextRef}
          />
        </div>
        <ul className="ready-messages">
          {READY_MESSAGES.map((item: string, index: number) => (
            <li
              key={index}
              className="message"
              onClick={() => handleSelectMessage(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        <div className="actions-btn">
          <button className="cancel-btn" onClick={cancel}>
            لغو
          </button>
          <button className="confirm-btn" onClick={confirm}>
            تایید و ارسال متن
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuppliersList;
