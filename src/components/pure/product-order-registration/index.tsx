import UserIcon from "images/icons/user_icon";
import { FC, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import Image from "next/image";
import { DatePicker } from "react-advance-jalaali-datepicker";
import ResultPayment from "../result-payment";

interface ProductOrderRegistrationProps {
  elementRef: React.RefObject<HTMLDivElement>;
  mechanicName: string;
  productName: string;
  mechanicWalletCash: number;
  suppliersList: Array<any>;
  closeModal: () => void;
}

const ProductOrderRegistration: FC<ProductOrderRegistrationProps> = ({
  elementRef,
  suppliersList,
  mechanicName,
  productName,
  mechanicWalletCash,
  closeModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const suppliersListRef: any = useRef();
  const paymentResultRef: any = useRef();

  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>();
  const [supplierAddress, setSupplierAddress] = useState<string>("");

  useCloseByClickOutSide({
    ref: suppliersListRef,
    isOpened: isPaymentOpen,
    setIsOpened: setIsPaymentOpen,
  });

  const handleChangeDate = (unix: any, formatted: any) => {
    console.log(unix);
    console.log(formatted);
  };

  const datePickerInput = (props: any) => {
    return <input className="date" {...props} />;
  };

  const handleSelectSupplier = (id: number) => {
    const item = suppliersList.filter((item: any) => item.id === id);
    setSelectedSupplier(item[0]);
    setIsPaymentOpen(false);
  };

  const handleFinalPayment = () => {
    console.log("y");
    setIsPaymentOpen(false);
    setIsResultOpen(true);
  };

  const handleDeductWallet = () => {
    console.log("deduct wallet");
  };

  useEffect(() => {
    if (selectedSupplier?.address === null) {
      setSupplierAddress("آدرسی ثبت نشده است.");
    }
  }, [selectedSupplier]);

  useEffect(() => {
    if (!isResultOpen) {
      setIsPaymentOpen(false);
    }
  }, [isResultOpen]);

  return (
    <div className="product-order-registration" ref={elementRef}>
      <div className="heading">
        <div className="line"></div>
        <h3 className="title">ثبت سفارش محصول</h3>
        <div className="line"></div>
      </div>
      {!isResultOpen && (
        <form className="form" onSubmit={handleSubmit(handleFinalPayment)}>
          <div className="content">
            <div className="customer-section">
              <div className="field">
                <span className="label">مشتری:</span>
                <div className="customer-info">
                  <div className="profile-image">
                    <UserIcon color="#00A48A" />
                  </div>
                  <span>{mechanicName}</span>
                </div>
              </div>
              <div className="field">
                <span className="label">نام کالا:</span>
                <div className="input-shape">{productName}</div>
              </div>
              <div className="field">
                <label htmlFor="date" className="label">
                  زمان تحویل کالا:
                </label>
                <div className="input-shape">
                  <DatePicker
                    inputComponent={datePickerInput}
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={handleChangeDate}
                    id="mechanicDate"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="address" className="label">
                  آدرس تحویل:
                </label>
                <textarea id="address" className="address"></textarea>
              </div>
              <div className="wallet-cash">
                <span>موجودی کیف پول:</span>
                <span>{mechanicWalletCash} تومان</span>
              </div>
            </div>
            <div className="supplier-section">
              <div className="field">
                <span className="label">انتخاب تامین کننده:</span>
                <div className="supplier-info-container" ref={suppliersListRef}>
                  <div
                    className="supplier-info"
                    onClick={() => setIsPaymentOpen(!isPaymentOpen)}
                  >
                    {selectedSupplier && (
                      <div className="profile-image">
                        {selectedSupplier?.photo ? (
                          <Image
                            src={selectedSupplier?.photo}
                            alt="profile-photo"
                          />
                        ) : (
                          <UserIcon color="#F3C701" />
                        )}
                      </div>
                    )}
                    <span>{selectedSupplier?.username}</span>
                    {isPaymentOpen ? (
                      <IoIosArrowUp className="down-arrow" />
                    ) : (
                      <IoIosArrowDown className="down-arrow" />
                    )}
                  </div>
                  {isPaymentOpen && (
                    <div className="suppliers-list-container">
                      {suppliersList?.map((supplier: any) => (
                        <div
                          className="supplier"
                          key={supplier.id}
                          onClick={() => handleSelectSupplier(supplier.id)}
                        >
                          <div className="profile-image">
                            {selectedSupplier?.photo ? (
                              <Image
                                src={selectedSupplier?.photo}
                                alt="profile-photo"
                              />
                            ) : (
                              <UserIcon color="#F3C701" />
                            )}
                          </div>
                          {supplier.username}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="field supplier-date">
                <label htmlFor="date" className="label">
                  زمان تحویل کالا:
                </label>
                <div className="input-shape">
                  <DatePicker
                    inputComponent={datePickerInput}
                    placeholder="انتخاب تاریخ"
                    format="jYYYY/jMM/jDD"
                    onChange={handleChangeDate}
                    id="supplierDate"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="address" className="label">
                  آدرس تامین کننده:
                </label>
                <textarea
                  id="address"
                  className="address"
                  placeholder={supplierAddress}
                >
                  {selectedSupplier?.address}
                </textarea>
              </div>
              <div className="wallet-cash">
                <span>موجودی کیف پول:</span>
                <span>{} تومان</span>
              </div>
            </div>
          </div>
          <div className="price-and-payment">
            <div className="final-price">
              <label htmlFor="price" className="title">
                قیمت نهایی:
              </label>
              <div className="price">
                <input type="number" id="price" min={0} className="number" />
                <span>تومان</span>
              </div>
            </div>
            <button type="submit">پرداخت نهایی</button>
          </div>
        </form>
      )}
      {isResultOpen && (
        <ResultPayment
          closeModal={closeModal}
          deductWallet={handleDeductWallet}
        />
      )}
    </div>
  );
};

export default ProductOrderRegistration;
