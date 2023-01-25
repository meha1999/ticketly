import CustomPortal from "components/common/portal";
import UserIcon from "images/icons/user_icon";
import { FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { TicketService } from "services/ticket.service";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import ProductOrderRegistration from "../product-order-registration";
import Image from "next/image";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useRouter } from "next/router";

const ticketService = new TicketService();

interface OrderCompletionProps {
  ticketSubject: string;
  customerName: string;
  customerWalletCash: number;
  customerPhoto: string;
  customerId: number;
  ticketStatus: string;
  ticketId: string;
  selectedTikcet: string;
  openChat: () => void;
  orderSubmitted: () => void;
}

const OrderCompletion: FC<OrderCompletionProps> = ({
  ticketSubject,
  customerName,
  customerWalletCash,
  customerPhoto,
  customerId,
  ticketStatus,
  ticketId,
  selectedTikcet,
  openChat,
  orderSubmitted,
}) => {
  const router = useRouter();
  const notification = useSelector<
    ReduxStoreModel,
    ReduxStoreModel["notification"]
  >((store) => store.notification);

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
    getSuppliersList();
  }, [isOpen]);

  const sse = notification?.detail
    ?.filter((message) => message?.ticket_group == router.query.groupId)[0]
    ?.data?.filter((event) => event?.ticket == ticketId)[0];

  return (
    <div className="order-completion">
      <div className="subject">
        <span className="subject-title">موضوع تیکت:</span>
        <span className="subject-name">{ticketSubject}</span>
      </div>
      <div className="user">
        <div className="heading">
          <div className="profile-image">
            {customerPhoto ? (
              <Image src={customerPhoto} alt="photo" width={35} height={35} />
            ) : (
              <UserIcon color="#00A48A" />
            )}
          </div>
          <span>{customerName}</span>
        </div>
        <button
          className="chat-user"
          style={{
            backgroundColor: selectedTikcet == ticketId ? "#00A48A" : "#defffa",
            color: selectedTikcet == ticketId ? "#FFFFFF" : "#00A48A",
          }}
          onClick={openChat}
        >
          چت با مشتری
        </button>
      </div>
      <div className="wallet" style={{ alignItems: "center" }}>
        <span className="wallet-title">تعداد پیام خوانده نشده:</span>
        <div className="tools">
          <div className="price">{sse?.unread_message} پیام</div>
        </div>
      </div>
      <div className="wallet" style={{ marginRight: 20 }}>
        <span className="wallet-title">موجودی کیف پول:</span>
        <div className="tools">
          <div className="price">{customerWalletCash} تومان</div>
          <button
            type="button"
            className="order-btn"
            style={{
              cursor:
                ticketStatus !== "INPROCESS" && ticketStatus !== "CLOSED"
                  ? "pointer"
                  : "default",
              backgroundColor:
                ticketStatus !== "INPROCESS" && ticketStatus !== "CLOSED"
                  ? "#f3c701"
                  : "#4d4d4d",
            }}
            onClick={() =>
              ticketStatus !== "INPROCESS" &&
              ticketStatus !== "CLOSED" &&
              handleOrderRegistration()
            }
          >
            {ticketStatus !== "INPROCESS" && ticketStatus !== "CLOSED"
              ? " تکمیل سفارش"
              : "سفارش ثبت شده"}
          </button>
        </div>
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <CustomPortal>
            <ProductOrderRegistration
              elementRef={orderRegistrationModalRef}
              customerName={customerName}
              customerId={customerId}
              customerPhoto={customerPhoto}
              productName={ticketSubject}
              customerWalletCash={customerWalletCash}
              suppliersList={supplierList}
              closeModal={() => {
                setIsOpen(false);
                orderSubmitted();
              }}
            />
          </CustomPortal>,
          portalContainer
        )}
    </div>
  );
};

export default OrderCompletion;
