import Divider from "components/common/divider";
import SeoHead from "components/common/seo-head";
import Title from "components/common/title";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";
import wallet_bold from "public/images/icons/wallet_bold.svg";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { WalletService } from "services/wallet.service";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import errorHandler from "src/tools/error-handler";

const walletService = new WalletService();

const Wallet = () => {
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const [amount, setAmount] = useState<number>(0);
  const [depositTransactions, setDepositTransactions] = useState<any[]>([]);

  const getDepositTransactions = async () => {
    try {
      const res = await walletService.getDepositeTransaction();
      setDepositTransactions(res.data);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleCustomAmount = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(+e.target.value);
  };

  const handlePayment = (e: FormEvent) => {
    e.preventDefault();
  };

  useEffect(() => {
    getDepositTransactions();
  }, []);

  return (
    <DashboardLayout>
      <Title titleIcon={wallet_bold} titleText="کیف پول" />
      <Divider />
      <div className="wallet">
        <div className="wallet-amount">
          <div className="title">{"پرداخت آنلاین داخل کیف پول شخصی شما"}</div>
          <div className="deposit">
            <div className="text">{"موجودی کیف پول شما:"}</div>
            <div className="amount">{user?.wallet_account.amount} تومان</div>
          </div>
        </div>
        <form className="add-credit" onSubmit={handlePayment}>
          <div className="ready-options">
            <div className="title">
              مبلغ مورد نظر خود را در داخل کیف پول خود وارد نمائید:
            </div>
            <div className="options-container">
              <div
                className="cash-option"
                style={{
                  background: `${amount === 10000000 ? "#00a48a" : "#ffffff"}`,
                  color: `${amount === 10000000 ? "#ffffff" : "#00a48a"}`,
                }}
                onClick={() => setAmount(10000000)}
              >
                <div>10,000,000</div>
                <div>تومان</div>
              </div>
              <div
                className="cash-option"
                style={{
                  background: `${amount === 5000000 ? "#00a48a" : "#ffffff"}`,
                  color: `${amount === 5000000 ? "#ffffff" : "#00a48a"}`,
                }}
                onClick={() => setAmount(5000000)}
              >
                <div>5,000,000</div>
                <div>تومان</div>
              </div>
              <div
                className="cash-option"
                style={{
                  background: `${amount === 1000000 ? "#00a48a" : "#ffffff"}`,
                  color: `${amount === 1000000 ? "#ffffff" : "#00a48a"}`,
                }}
                onClick={() => setAmount(1000000)}
              >
                <div>1,000,000</div>
                <div>تومان</div>
              </div>
            </div>
          </div>
          <div className="customize-amount">
            <div className="container">
              <div className="input-container">
                <button
                  type="button"
                  className="plus-btn"
                  onClick={() => setAmount(amount + 100000)}
                >
                  +
                </button>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  min={1}
                  placeholder="سایر مبالغ"
                  className="amount-input"
                  onChange={handleCustomAmount}
                  value={amount ? amount : "سایر مبالغ"}
                />
                <button
                  type="button"
                  className="minus-btn"
                  onClick={() => amount && setAmount(amount - 100000)}
                >
                  -
                </button>
              </div>
              <button type="submit" className="payment-btn">
                پرداخت
              </button>
            </div>
          </div>
        </form>
      </div>
      <Divider />
      <div className="your-payments">
        <h5 className="title">پرداختی های شما:</h5>
        <ul className="payments-list">
          {depositTransactions?.length ? (
            depositTransactions?.map((item: any, index: number) => (
              <li className="payment" key={index}>
                <div className="row-number">{index + 1}</div>
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
            ))
          ) : (
            <p>لیست پرداختی‌های شما خالی است.</p>
          )}
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
