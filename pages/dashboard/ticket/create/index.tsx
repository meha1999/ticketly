import DashboardLayout from "components/layouts/dashboard";
import Image from "next/image";
import arrowDown from "public/images/arrow-down.svg";
import upDown from "public/images/arrow-up.svg";

const Create = () => {
  return (
    <DashboardLayout>
      <div className="create">
        <h3 className="title">ثبت تیکت جدید</h3>
        <form className="content">
          <div>
            <div>
              <label>دسته بندی ها:</label>
              <input type="text" />
            </div>
            <div>
              <span>نوع قطعه:</span>
              <div>
                <span>قطعه مصرفی لاستیک</span>
                <Image src={arrowDown} alt="arrow-down" />
              </div>
            </div>
          </div>
          <div>
            <div>
              <span>نوع لوازم قطعه:</span>
              <div>
                <span>قطعه داخلی یا خارجی یا موتور خودرو</span>
                <Image src={arrowDown} alt="arrow-down" />
              </div>
            </div>
            <div>
              <span>نام کالا:</span>
              <div>
                <span>لنت ترمز جلو پراید</span>
              </div>
            </div>
          </div>
          <div>
            <span>پیام:</span>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Create;
