import DashboardLayout from "components/layouts/dashboard/evaluator";
import Image from "next/image";
import fileUploadIcon from "public/images/icons/file_upload.svg";
import trashIcon from "public/images/icons/trash.svg";
import createTicket from "public/images/icons/create_ticket_fill.svg";
import Title from "components/common/title";
import Divider from "components/common/divider";
import { GetServerSideProps } from "next";

const Create = () => {
  return (
    <DashboardLayout>
      <div className="create">
        <Title titleText="ثبت تیکت جدید" titleIcon={createTicket} />
        <Divider />
        <form className="content">
          <div className="row">
            <div className="field">
              <label htmlFor="categories">{"دسته بندی:"}</label>
              <select name="categories" id="categories">
                <option value="اجزای خودرو">{"اجزای خودرو"}</option>
                <option value="اجزای خودرو">{"اجزای خودرو"}</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="part_type">{"نوع قطعه:"}</label>
              <select name="part_type" id="part_type">
                <option value="قطعه مصرفی لاستیک">{"قطعه مصرفی لاستیک"}</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="accessories_type">{"نوع لوازم قطعه:"}</label>
              <select name="accessories_type" id="accessories_type">
                <option value="قطعه داخلی یا خارجی یا موتور خودرو">
                  {"قطعه داخلی یا خارجی یا موتور خودرو"}
                </option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="name">{"نام کالا:"}</label>
              <input type="text" name="name" id="name" />
            </div>
          </div>
          <div className="message">
            <label htmlFor="message">{"پیام:"}</label>
            <textarea name="message" id="message" rows={10}></textarea>
          </div>
          <div className="row">
            <label htmlFor="attached_file">{"فایل پیوست:"}</label>
            <div className="file-upload">
              <div className="file">
                <label htmlFor="file-input" className="file-input-label">
                  <Image src={fileUploadIcon} alt="receive-square" />
                  <span>{"آپلود فایل"}</span>
                </label>
                <div>
                  <input
                    type="file"
                    id="file-input"
                    className="file-input"
                    title=""
                    accept=".png, .jpg, .jpeg"
                  />
                  <span className="allowed-types">
                    {"پسوند های مجاز: .jpg, .jpeg, .png"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button className="trash">
              <Image src={trashIcon} alt="trash" />
            </button>
            <button type="submit" className="submit">
              {"جستجوی کالا"}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/mechanic/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};