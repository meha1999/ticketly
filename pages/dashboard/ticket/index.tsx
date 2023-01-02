import Title from "components/common/Title";
import DashboardLayout from "components/layouts/dashboard";
import Image from "next/image";
import TicketBold from "public/images/icons/ticket_bold.svg";
import DefaultTicket from "public/images/default-ticket.svg";
import Delete from "public/images/icons/delete.svg";
import Divider from "components/common/Divider";

const Tickets = () => {
  const data = [
    {
      name: "لنت ترمز جلو پراید",
      brand: "برند : پارس آبی",
      supplier: "جت مت",
      price: "25.000.000",
      id: "TFCds545f58egtr",
      date: "7 دی ماه 1401",
      time: "13:19",
      status: "در حال آماده سازی",
    },
    {
      name: "لنت ترمز جلو پراید",
      brand: "برند : پارس آبی",
      supplier: "جت مت",
      price: "25.000.000",
      id: "TFCds545f58egtr",
      date: "7 دی ماه 1401",
      time: "13:19",
      status: "در حال آماده سازی",
    },
    {
      name: "لنت ترمز جلو پراید",
      brand: "برند : پارس آبی",
      supplier: "جت مت",
      price: "25.000.000",
      id: "TFCds545f58egtr",
      date: "7 دی ماه 1401",
      time: "13:19",
      status: "در حال آماده سازی",
    },
    {
      name: "لنت ترمز جلو پراید",
      brand: "برند : پارس آبی",
      supplier: "جت مت",
      price: "25.000.000",
      id: "TFCds545f58egtr",
      date: "7 دی ماه 1401",
      time: "13:19",
      status: "در حال آماده سازی",
    },
    {
      name: "لنت ترمز جلو پراید",
      brand: "برند : پارس آبی",
      supplier: "جت مت",
      price: "25.000.000",
      id: "TFCds545f58egtr",
      date: "7 دی ماه 1401",
      time: "13:19",
      status: "در حال آماده سازی",
    },
  ];
  return (
    <DashboardLayout>
      <div className="tickets">
        <Title
          titleIcon={TicketBold}
          titleText="درخواست ها"
          titleSideComponent={<></>}
        />
        <Divider />
        <div className="tickets-conatiner">
          {data.map((item, key) => (
            <div className="ticket-box" key={key}>
              <div className="description">
                <div className="number">
                  <div className="value">{key + 1}</div>
                </div>
                <div>
                  <Image
                    src={DefaultTicket}
                    alt="tikcet"
                    className="ticket-img"
                  />
                </div>
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className="further-info">
                    <div className="brand">{item.brand}</div>
                    <div className="supplier">{item.supplier}</div>
                  </div>
                </div>
              </div>
              <div className="price">
                <div className="amount">{item.price} تومان</div>
                <div className="code">{item.id}</div>
              </div>
              <div className="date-time">
                <div className="date">{item.date}</div>
                <div className="time">{item.time}</div>
              </div>
              <div className="operation">
                <div className="delete-icon">
                  <Image src={Delete} alt="delete" />
                </div>
                <div className="status">{item.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tickets;
