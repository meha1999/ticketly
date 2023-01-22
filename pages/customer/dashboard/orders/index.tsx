import Divider from "components/common/divider";
import Title from "components/common/title";
import DashboardLayout from "components/layouts/dashboard/customer";
import CustomerOrders from "components/pure/customer-orders";
import OrdersIcon from "images/icons/orders_icon";
import { GetServerSideProps } from "next";

const Orders = () => {
  const fakeList: Array<any> = [
    {
      image: "",
      id: "TLY-425001",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
    {
      image: "",
      id: "TLY-425002",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
    {
      image: "",
      id: "TLY-425003",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
    {
      image: "",
      id: "TLY-425004",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
    {
      image: "",
      id: "TLY-425005",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
    {
      image: "",
      id: "TLY-425006",
      supplierName: "جت خودرو",
      name: "لنت ترمز جلو پراید",
      brand: "پارس آبی",
      price: 145000,
      dateAndTime: "7 دی ماه 1401   13:19",
      status: "تحویل داده شده است",
    },
  ];

  return (
    <DashboardLayout>
      <Title svgIcon={<OrdersIcon color="#505050" />} titleText="سفارشات" />
      <Divider />
      <CustomerOrders list={fakeList} />
    </DashboardLayout>
  );
};

export default Orders;

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
