import Divider from "components/common/divider";
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
          <div className="ready-options"></div>
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
