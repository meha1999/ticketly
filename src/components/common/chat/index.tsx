import VerticalPrevious from "images/icons/vertical_previous";
import VerticalNext from "images/icons/vertical_next";
import MessagePreview from "./message-preview";
import img from "images/auth/admin.svg";
import Message from "./message";
import { useRouter } from "next/router";

const userType: Record<string, string> = {
  evaluator: "#5E7BEC",
  mechanic: "#00A48A",
  supplier: "#F2C901",
};

const Chat = () => {
  const router = useRouter();

  return (
    <div className="chat">
      <div className="heading">
        <h2 className="title">{"لنت ترمز جلو پراید"}</h2>
        <div className="chat-id">
          <span>{"شناسه گفتگو:"}</span>
          <span>{"TY4235689321"}</span>
        </div>
        <div className="nav-buttons">
          <button
            className="nav-button"
            style={{ borderColor: `${userType[router.asPath.split("/")[1]]}` }}
          >
            <VerticalPrevious color={userType[router.asPath.split("/")[1]]} />
          </button>
          <button
            className="nav-button"
            style={{ borderColor: `${userType[router.asPath.split("/")[1]]}` }}
          >
            <VerticalNext color={userType[router.asPath.split("/")[1]]} />
          </button>
        </div>
      </div>
      <div className="messages-list">
        <MessagePreview
          // profileImage={img}
          color={userType["mechanic"]}
          name="متین نوروزپور"
          message="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."
          date="7 دی ماه 1401 13:19"
        />
        <MessagePreview
          // profileImage={img}
          color={userType["evaluator"]}
          name="ارزیاب شماره 29"
          message="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."
          date="7 دی ماه 1401 13:19"
        />
        <MessagePreview
          // profileImage={img}
          color={userType["evaluator"]}
          name="ارزیاب شماره 29"
          message="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد."
          date="7 دی ماه 1401 13:19"
        />
      </div>
      <MessagePreview
        profileImage={img}
        // color={userType["mechanic"]}
        name="متین نوروزپور"
        // message=""
        date="7 دی ماه 1401 13:19"
      />
      <Message color={userType[router.asPath.split("/")[1]]} />
    </div>
  );
};

export default Chat;
