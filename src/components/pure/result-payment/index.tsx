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
          <p className="message success">سفارش با موفقیت ثبت شد.</p>
        ) : (
          <>
            <p className="message failure">
              موجودی کیف پول مشتری با انتخاب کسر موجودی از حد مشخص شده پایین تر
              خواهد آمد.
            </p>
            <p className="failure-message">
              از مشتری بخواهید کیف پول خود را شارژ کند
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
