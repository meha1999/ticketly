import CustomPortal from "components/common/portal";
import UserIcon from "images/icons/user_icon";
import { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { TicketService } from "services/ticket.service";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import ProductOrderRegistration from "../product-order-registration";

const ticketService = new TicketService();

interface OrderCompletionProps {
  subject: string;
  name: string;
  address: string;
  walletCash: number;
  openChat: () => void;
}

const OrderCompletion: FC<OrderCompletionProps> = ({
  subject,
  name,
  address,
  walletCash,
  openChat,
}) => {
  const portalContainer: any = document.getElementById("portal");

  const orderRegistrationModalRef = useRef<any>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [supplierList, setSupplierList] = useState<Array<any>>([]);

  useCloseByClickOutSide({
    ref: orderRegistrationModalRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  const getSuppliersList = async () => {
    const res = await ticketService.getSuppliersList("supplier");
    setSupplierList(res.data);
  };

  const handleOrderRegistration = () => setIsOpen(!isOpen);

  useEffect(() => {
    isOpen && getSuppliersList();
  }, [isOpen]);

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
        <button className="chat-user" onClick={openChat}>
          چت با مکانیک
        </button>
      </div>
      <div className="address">
        <span className="address-title">آدرس محل سکونت:</span>
        <p className="address-content">{address}</p>
      </div>
      <div className="wallet">
        <span className="wallet-title">موجودی کیف پول:</span>
        <div className="tools">
          <div className="price">{walletCash} تومان</div>
          <button
            type="button"
            className="order-btn"
            onClick={handleOrderRegistration}
          >
            تکمیل سفارش
          </button>
        </div>
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <CustomPortal>
            <ProductOrderRegistration
              elementRef={orderRegistrationModalRef}
              mechanicName="متین نوروزپور"
              productName="لنت ترمز جلو پراید"
              mechanicWalletCash={2000000}
              suppliersList={supplierList}
            />
          </CustomPortal>,
          portalContainer
        )}
    </div>
  );
};

export default OrderCompletion;
