import { FC } from "react";

interface CustomerOrdersProps {
  list: Array<any>;
}

const CustomerOrders: FC<CustomerOrdersProps> = ({ list }) => {
  return (
    <ul className="customer-orders">
      {list.length !== 0 ? (
        list.map((item: any, index: number) => <li key={index}>{item.name}</li>)
      ) : (
        <p>لیست سفارشات شما خالی است.</p>
      )}
    </ul>
  );
};

export default CustomerOrders;
