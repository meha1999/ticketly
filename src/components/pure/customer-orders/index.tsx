import { FC } from "react";
import CustomerOrderCard from "../customer-order-card";

interface CustomerOrdersProps {
  list: Array<any>;
}

const CustomerOrders: FC<CustomerOrdersProps> = ({ list }) => {
  return (
    <ul className="customer-orders">
      {list && list.length !== 0 ? (
        list.map((item: any) => (
          <li key={item.id}>
            <CustomerOrderCard
              image={item.image}
              id={item.id}
              manufacturer={""}
              name={item.name}
              brand={item.brand}
              price={item.total_price}
              dateAndTime={item.created_at}
              status={item.status}
            />
          </li>
        ))
      ) : (
        <p>لیست سفارشات شما خالی است.</p>
      )}
    </ul>
  );
};

export default CustomerOrders;
