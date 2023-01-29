import Divider from "components/common/divider";
import SeoHead from "components/common/seo-head";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";
import wallet_bold from "public/images/icons/wallet_bold.svg";

const Wallet = () => {
  return (
    <DashboardLayout>
      <Title titleIcon={wallet_bold} titleText="کیف پول" />
      <Divider />
      <div className="wallet">
        <div className="wallet-amount">
          <div className="title">{"پرداخت آنلاین داخل کیف پول شخصی شما"}</div>
          <div className="deposit">
            <div className="text">{"موجودی کیف پول شما:"}</div>
            <div className="amount">{"50.000.000"} تومان</div>
          </div>
        </div>
        <div className="add-credit">
          <div className="ready-options">
            <div className="title">
              مبلغ مورد نظر خود را در داخل کیف پول خود وارد نمائید:
            </div>
            <div className="options-container">
              <div className="cash-option">
                <div>10.000.000</div>
                <div>تومان</div>
              </div>
              <div className="cash-option">
                <div>5.000.000</div>
                <div>تومان</div>
              </div>
              <div className="cash-option">
                <div>1.000.000</div>
                <div>تومان</div>
              </div>
            </div>
          </div>
          <div className="customize-amount">
            <div className="container">
              <div className="input-container">
                <button type="button" className="plus-btn">
                  +
                </button>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min={0}
                  placeholder="سایر مبالغ"
                  className="amount-input"
                />
                <button type="button" className="minus-btn">
                  -
                </button>
              </div>
              <button className="payment-btn">پرداخت</button>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="your-payments">
        <h5 className="title">پرداختی های شما:</h5>
        <ul className="payments-list">
          <li className="payment">
            <div className="row-number">1</div>
            <div className="date-and-time">
              <span>در تاریخ</span>
              <span>16 اردیبهشت 1401 14:30</span>
            </div>
            <div className="price">مبلغ 10.000.000 تومان</div>
            <div>
              <div className="payment-status">پرداخت شده</div>
            </div>
            <div>
              <button type="button" className="receive-factor-btn">
                دریافت فاکتور
              </button>
            </div>
          </li>
          <li className="payment">
            <div className="row-number">1</div>
            <div className="date-and-time">
              <span>در تاریخ</span>
              <span>16 اردیبهشت 1401 14:30</span>
            </div>
            <div className="price">مبلغ 10.000.000 تومان</div>
            <div>
              <div className="payment-status">پرداخت شده</div>
            </div>
            <div>
              <button type="button" className="receive-factor-btn">
                دریافت فاکتور
              </button>
            </div>
          </li>
        </ul>
      </div>
      <SeoHead title="کیف پول" description="" />
    </DashboardLayout>
  );
};

export default Wallet;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/customer/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
