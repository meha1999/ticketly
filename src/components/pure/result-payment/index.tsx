import Image from "next/image";
import checkIcon from "images/icons/check-circle.svg";
import closeIcon from "images/icons/close-circle.svg";
import { FC } from "react";

interface ResultPaymentProps {
  closeModal: () => void;
  deductWallet: () => void;
  paymentStatus: string;
}

const ResultPayment: FC<ResultPaymentProps> = ({
  closeModal,
  deductWallet,
  paymentStatus,
}) => {
  return (
    <div className="result-payment">
      <div className="content">
        {paymentStatus === "success" ? (
          <Image src={checkIcon} alt="check" />
        ) : (
          <Image src={closeIcon} alt="close" />
        )}
        {paymentStatus === "success" ? (
          <p className="message success">
            پرداخت از طریق کیف پول مکانیک با موفقیت انجام شد.
          </p>
        ) : (
          <>
            <p className="message failure">
              موجودی کیف پول مشتری با انتخاب کسر موجودی به صورت منفی درخواهد
              آمد.
            </p>
            <p className="failure-message">
              سفارش ثبت خواهد شد از مشتری بخواهید به صورت نقدی پرداخت نماید
            </p>
          </>
        )}
      </div>
      <button className="close-modal-btn" onClick={closeModal}>
        بستن پنجره
      </button>
    </div>
  );
};

export default ResultPayment;
