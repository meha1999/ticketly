import UserIcon from "images/icons/user_icon";
import { FC, useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import Image from "next/image";
import ResultPayment from "../result-payment";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { TicketService } from "services/ticket.service";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import { useRouter } from "next/router";
import errorHandler from "src/tools/error-handler";

const ticketService = new TicketService();

interface ProductOrderRegistrationProps {
  elementRef: React.RefObject<HTMLDivElement>;
  customerName: string;
  customerId: number;
  customerPhoto: string;
  productName: string;
  customerWalletCash: number;
  suppliersList: Array<any>;
  closeModal: () => void;
}

const ProductOrderRegistration: FC<ProductOrderRegistrationProps> = ({
  elementRef,
  suppliersList,
  customerName,
  customerId,
  customerPhoto,
  productName,
  customerWalletCash,
  closeModal,
}) => {
  const router = useRouter();
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const suppliersListRef: any = useRef();
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(productName);
  const [isResultOpen, setIsResultOpen] = useState<boolean>(false);
  const [selectedSupplier, setSelectedSupplier] = useState<any>();
  const [supplierAddress, setSupplierAddress] = useState<string>("");
  const [paymentStatus, setPaymentStatus] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "wallet">("cash");
  const [supplyDate, setSupplyDate] = useState<
    DateObject | DateObject[] | Date | null
  >(new Date());
  const [deliveryDate, setDeliveryDate] = useState<
    DateObject | DateObject[] | Date | null
  >(new Date());

  useCloseByClickOutSide({
    ref: suppliersListRef,
    isOpened: isPaymentOpen,
    setIsOpened: setIsPaymentOpen,
  });

  const handleSelectSupplier = (id: number) => {
    const item = suppliersList.filter((item: any) => item.id === id);
    setSelectedSupplier(item[0]);
    setIsPaymentOpen(false);
  };

  const handleFinalPayment = async (data: FieldValues) => {
    try {
      const finalData = {
        customer: customerId,
        name,
        staff_delivery_time: deliveryDate,
        staff_delivery_address: data.staff_delivery_address,
        staff: user?.id,
        supplier: selectedSupplier?.id,
        supplier_delivery_time: supplyDate,
        supplier_delivery_address: data.supplier_delivery_address,
        total_price: data.total_price,
        items_order: [],
        ticket_group: router.query.groupId,
      };
      const res = await ticketService.finalPayment(finalData);
      if (paymentMethod === "wallet") {
        await ticketService.confirmOrder(res.data.id);
      }
      setPaymentStatus("success");
    } catch (error: any) {
      if (error.response.status == 406) {
        setPaymentStatus("failure");
      } else {
        errorHandler(error);
      }
    }
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
                    {customerPhoto ? (
                      <Image
                        src={customerPhoto}
                        alt="photo"
                        width={43}
                        height={43}
                      />
                    ) : (
                      <UserIcon color="#00A48A" />
                    )}
                  </div>
                  <span>{customerName}</span>
                </div>
              </div>
              <div className="field">
                <span className="label">نام کالا:</span>
                <input
                  type="text"
                  className="input-shape"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="date" className="label">
                  زمان تحویل کالا:
                </label>
                <div className="input-shape">
                  <DatePicker
                    value={deliveryDate}
                    onChange={setDeliveryDate}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="staff_delivery_address" className="label">
                  آدرس تحویل:
                </label>
                <textarea
                  id="staff_delivery_address"
                  rows={2}
                  className="address"
                  {...register("staff_delivery_address", { required: true })}
                ></textarea>
                {errors.staff_delivery_address && (
                  <p className="error">وارد کردن آدرس اجباری است.</p>
                )}
              </div>
              <div className="wallet-cash">
                <span>موجودی کیف پول:</span>
                <span>{customerWalletCash} تومان</span>
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
                            width={43}
                            height={43}
                          />
                        ) : (
                          <UserIcon color="#F3C701" />
                        )}
                      </div>
                    )}
                    <span>{selectedSupplier?.full_name}</span>
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
                            {supplier?.photo ? (
                              <Image
                                src={supplier?.photo}
                                alt="profile-photo"
                                width={43}
                                height={43}
                              />
                            ) : (
                              <UserIcon color="#F3C701" />
                            )}
                          </div>
                          {supplier.full_name}
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
                    value={supplyDate}
                    onChange={setSupplyDate}
                    calendar={persian}
                    locale={persian_fa}
                    calendarPosition="bottom-right"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="supplier_delivery_address" className="label">
                  آدرس تامین کننده:
                </label>
                <textarea
                  rows={2}
                  id="supplier_delivery_address"
                  className="address"
                  placeholder={supplierAddress}
                  {...register("supplier_delivery_address", { required: true })}
                  value={selectedSupplier?.address}
                ></textarea>
                {errors.supplier_delivery_address && (
                  <p className="error">وارد کردن آدرس اجباری است.</p>
                )}
              </div>
              <div className="wallet-cash">
                <span>موجودی کیف پول:</span>
                <span>{selectedSupplier?.wallet_account?.amount} تومان</span>
              </div>
              <div className="payment-method">
                <div className="radio-input-group">
                  <input
                    id="cash"
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => setPaymentMethod("cash")}
                  />
                  <label
                    htmlFor="cash"
                    className={`radio-label ${
                      paymentMethod === "cash" ? "selected-label" : ""
                    }`}
                  >
                    پرداخت نقدی
                  </label>
                </div>
                <div className="radio-input-group">
                  <input
                    id="wallet"
                    type="radio"
                    checked={paymentMethod === "wallet"}
                    onChange={() => setPaymentMethod("wallet")}
                  />
                  <label
                    htmlFor="wallet"
                    className={`radio-label ${
                      paymentMethod === "wallet" ? "selected-label" : ""
                    }`}
                  >
                    کسر از کیف پول
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="price-and-payment">
            <div className="final-price">
              <label htmlFor="total_price" className="title">
                قیمت نهایی:
              </label>
              <div className="price">
                <input
                  type="number"
                  id="total_price"
                  min={0}
                  className="number"
                  {...register("total_price", { required: true })}
                />
                <span>تومان</span>
              </div>
              {errors.total_price && (
                <p className="price-error">وارد کردن قیمت اجباری است.</p>
              )}
            </div>
            <button type="submit">پرداخت نهایی</button>
          </div>
        </form>
      )}
      {isResultOpen && (
        <ResultPayment
          closeModal={closeModal}
          deductWallet={handleDeductWallet}
          paymentStatus={paymentStatus}
        />
      )}
    </div>
  );
};

export default ProductOrderRegistration;
