import Image from "next/image";
import checkIcon from "images/icons/check-circle.svg";
import closeIcon from "images/icons/close-circle.svg";
import { FC } from "react";

interface ResultPaymentProps {
  closeModal: () => void;
  deductWallet: () => void;
}

const ResultPayment: FC<ResultPaymentProps> = ({
  closeModal,
  deductWallet,
}) => {
  const paymentStatus: string = "success";

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
              موجودی کیف پول شما با انتخاب کسر موجودی به صورت منفی درخواهد آمد.
            </p>
            <p className="failure-message">
              بعد از افزایش اعتبار کیف پول دوباره برای پرداخت اقدام نمایید.
            </p>
          </>
        )}
      </div>
      {paymentStatus === "success" ? (
        <button className="close-modal-btn" onClick={closeModal}>
          بستن پنجره
        </button>
      ) : (
        <div className="failure-modal-buttons">
          <button className="cancel" onClick={closeModal}>
            انصراف
          </button>
          <button className="deduct-wallet" onClick={deductWallet}>
            کسر از کیف پول
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultPayment;