import Divider from "components/common/divider";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import { GetServerSideProps } from "next";
import wallet_bold from "public/images/icons/wallet_bold.svg";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";

const Wallet = () => {
  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );
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
        <div className="add-credit">
          <div className="ready-options">
            <div className="title">
              مبلغ مورد نظر خود را در داخل کیف پول خود وارد نمائید:
            </div>

            <div className="options-conatiner">
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
          <div className="customize-amount"></div>
        </div>
      </div>
      <Divider />
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
