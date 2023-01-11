import UserIcon from "images/icons/user_icon";
import { FC, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";

interface ProductOrderRegistrationProps {
  elementRef: React.RefObject<HTMLDivElement>;
}

const ProductOrderRegistration: FC<ProductOrderRegistrationProps> = ({
  elementRef,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isOpen, setIsOpen] = useState(false);

  const handleFinalPayment = () => {
    console.log("y");
  };

  return (
    <div className="product-order-registration" ref={elementRef}>
      <div className="heading">
        <div className="line"></div>
        <h3 className="title">ثبت سفارش محصول</h3>
        <div className="line"></div>
      </div>
      <form className="form" onSubmit={handleSubmit(handleFinalPayment)}>
        <div className="content">
          <div className="mechanic-section">
            <div className="field">
              <span className="label">مکانیک:</span>
              <div className="mechanic-info">
                <div className="profile-image">
                  <UserIcon color="#00A48A" />
                </div>
                <span>متین نوروزپور</span>
              </div>
            </div>
            <div className="field">
              <span className="label">نام کالا:</span>
              <div className="input-shape">لنت ترمز جلو پراید</div>
            </div>
            <div className="field">
              <label htmlFor="date" className="label">
                زمان تحویل کالا:
              </label>
              <div className="input-shape">
                <input type="date" id="date" className="date" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="address" className="label">
                آدرس تحویل:
              </label>
              <textarea id="address" rows={3} className="address"></textarea>
            </div>
            <div className="wallet-cash">
              <span>موجودی کیف پول:</span>
              <span>2000000 تومان</span>
            </div>
          </div>
          <div className="supplier-section">
            <div className="field">
              <span className="label">انتخاب تامین کننده:</span>
              <div className="supplier-info-container">
                <div
                  className="supplier-info"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <div className="profile-image">
                    <UserIcon color="#F3C701" />
                  </div>
                  <span>قاسم افشار</span>
                  <IoIosArrowDown className="down-arrow" />
                </div>
                {isOpen && (
                  <div className="suppliers-list-container">
                    <div className="supplier">fadsads</div>
                    <div className="supplier">fadsads</div>
                    <div className="supplier">fadsads</div>
                    <div className="supplier">fadsads</div>
                  </div>
                )}
              </div>
            </div>
            <div className="field supplier-date">
              <label htmlFor="date" className="label">
                زمان تحویل کالا:
              </label>
              <div className="input-shape">
                <input type="date" id="date" className="date" />
              </div>
            </div>
            <div className="field">
              <label htmlFor="address" className="label">
                آدرس تامین کننده:
              </label>
              <textarea id="address" rows={3} className="address"></textarea>
            </div>
            <div className="wallet-cash">
              <span>موجودی کیف پول:</span>
              <span>2000000 تومان</span>
            </div>
          </div>
        </div>
        <div className="price-and-payment">
          <div className="final-price">
            <span className="title">قیمت نهایی:</span>
            <div className="price">
              <span>2500000</span>
              <span>تومان</span>
            </div>
          </div>
          <button type="submit">پرداخت نهایی</button>
        </div>
      </form>
    </div>
  );
};

export default ProductOrderRegistration;
