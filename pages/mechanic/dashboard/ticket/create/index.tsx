import DashboardLayout from "components/layouts/dashboard/mechanic";
import Image from "next/image";
import fileUploadIcon from "public/images/icons/file_upload.svg";
import trashIcon from "public/images/icons/trash.svg";
import createTicket from "public/images/icons/create_ticket_fill.svg";
import Title from "components/common/title";
import Divider from "components/common/divider";
import { GetServerSideProps } from "next";
import { FieldValues, useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";

const Create = () => {
  const divRef = useRef<any>(null);
  const portalContainer: any = document.getElementById("portal");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useCloseByClickOutSide({
    ref: divRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.currentTarget);
  };

  const handleRequest = async (data: FieldValues) => {
    try {
      console.log(data);
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const handleReset = () => {
    // reset();
    setIsOpen(!isOpen);
  };

  return (
    <DashboardLayout>
      <div className="create">
        <Title titleText="ثبت تیکت جدید" titleIcon={createTicket} />
        <Divider />
        <form className="content" onSubmit={handleSubmit(handleRequest)}>
          <div className="row">
            <div className="field">
              <label htmlFor="category">{"دسته بندی:"}</label>
              <select
                id="category"
                {...register("category", { required: true })}
              >
                <option value="اجزای خودرو">{"اجزای خودرو"}</option>
                <option value="اجزای خودرو">{"اجزای"}</option>
              </select>
              {errors.category && <p>انتخاب دسته‌بندی اجباری است.</p>}
            </div>
            <div className="field">
              <label htmlFor="part_type">{"نوع قطعه:"}</label>
              <select
                id="part_type"
                {...register("part_type", { required: true })}
              >
                <option value="قطعه مصرفی لاستیک">{"قطعه مصرفی لاستیک"}</option>
              </select>
              {errors.part_type && <p>انتخاب نوع قطعه اجباری است.</p>}
            </div>
          </div>
          <div className="row">
            <div className="field">
              <label htmlFor="accessories_type">{"نوع لوازم قطعه:"}</label>
              <select
                id="accessories_type"
                {...register("accessories_type", { required: true })}
              >
                <option value="قطعه داخلی یا خارجی یا موتور خودرو">
                  {"قطعه داخلی یا خارجی یا موتور خودرو"}
                </option>
              </select>
              {errors.accessories_type && (
                <p>انتخاب نوع لوازم قطعه اجباری است.</p>
              )}
            </div>
            <div className="field">
              <label htmlFor="name">{"نام کالا:"}</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: true })}
              />
              {errors.name && <p>وارد کردن نام کالا اجباری است.</p>}
            </div>
          </div>
          <div className="message">
            <label htmlFor="message">{"پیام:"}</label>
            <textarea
              id="message"
              rows={10}
              {...register("message", { required: true })}
            ></textarea>
            {errors.message && <p>وارد کردن پیام اجباری است.</p>}
          </div>
          {/* <div className="row">
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
                    onChange={handleUpload}
                  />
                  <span className="allowed-types">
                    {"پسوند های مجاز: .jpg, .jpeg, .png"}
                  </span>
                </div>
              </div>
            </div>
          </div> */}
          <div className="action-buttons">
            <button type="button" className="trash" onClick={handleReset}>
              <Image src={trashIcon} alt="trash" />
            </button>
            <button type="submit" className="submit">
              {"ثبت و درخواست از ارزیاب"}
            </button>
          </div>
        </form>
        {isOpen &&
          ReactDOM.createPortal(
            <CustomPortal>
              <div
                ref={divRef}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: "red",
                }}
              >
                sfdssdfa
              </div>
            </CustomPortal>,
            portalContainer
          )}
      </div>
    </DashboardLayout>
  );
};

export default Create;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!ctx.req.url?.includes(ctx.req.cookies?.role as string)) {
    ctx.res.setHeader("Location", "/mechanic/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
