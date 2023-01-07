import UserIcon from "images/icons/user_icon";
import { FC } from "react";

interface OrderCompletionProps {
  subject: string;
  name: string;
  address: string;
  walletCash: number;
}

const OrderCompletion: FC<OrderCompletionProps> = ({
  subject,
  name,
  address,
  walletCash,
}) => {
  return (
    <div className="order-completion">
      <div className="subject">
        <span className="subject-title">موضوع تیکت:</span>
        <span className="subject-name">{subject}</span>
      </div>
      <div className="user">
        <div className="heading">
          <div className="profile-image">
            <UserIcon color="#00A48A" />
          </div>
          <span>{name}</span>
        </div>
        <button className="chat-user">چت با مکانیک</button>
      </div>
      <div className="address">
        <span className="address-title">آدرس محل سکونت:</span>
        <p className="address-content">{address}</p>
      </div>
      <div className="wallet">
        <span className="wallet-title">موجودی کیف پول:</span>
        <div className="tools">
          <div className="price">{walletCash} تومان</div>
          <button type="button" className="order-btn">
            تکمیل سفارش
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderCompletion;
