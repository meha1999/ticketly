import DashboardLayout from "components/layouts/dashboard/mechanic";
import Image from "next/image";
import fileUploadIcon from "public/images/icons/file_upload.svg";
import trashIcon from "public/images/icons/trash.svg";
import createTicket from "public/images/icons/create_ticket_fill.svg";
import Title from "components/common/title";
import Divider from "components/common/divider";
import { GetServerSideProps } from "next";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useCloseByClickOutSide } from "src/tools/custom-hooks/closeByClickOutside";
import ReactDOM from "react-dom";
import CustomPortal from "components/common/portal";
import { TicketService } from "services/ticket.service";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useRouter } from "next/router";

const ticketService = new TicketService();

const Create = () => {
  const portalContainer: any = document.getElementById("portal");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const divRef = useRef<any>(null);

  const router = useRouter();

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [rootCategories, setRootCategories] = useState<Array<any>>([]);
  const [trunkCategories, setTrunkCategories] = useState<Array<any>>([]);
  const [branchCategories, setBranchCategories] = useState<Array<any>>([]);
  const [branchCategoryId, setBranchCategoryId] = useState<number>(0);

  useCloseByClickOutSide({
    ref: divRef,
    isOpened: isOpen,
    setIsOpened: setIsOpen,
  });

  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(event.currentTarget);
  // };

  const handleChangeRootCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const items: any = rootCategories.filter(
      (item: any) => item.name === event.currentTarget.value
    );
    setTrunkCategories(items[0]?.trunk_root);
    if (items[0]?.trunk_root?.length === 0) {
      setBranchCategories([]);
    }
  };

  const handleChangeTrunkCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const items: any = trunkCategories.filter(
      (item: any) => item.name === event.currentTarget.value
    );
    setBranchCategories(items[0]?.branch_trunk);
  };

  const handleChangeBranchCategory = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const items: any = branchCategories.filter(
      (item: any) => item.name === event.currentTarget.value
    );
    setBranchCategoryId(items[0]?.id);
  };

  const handleRequest = async (data: FieldValues) => {
    try {
      const finalData = {
        name: data.name,
        department: 1,
        customer: user?.id,
        priority: "high",
        description: data.description,
        status: "در انتظار پاسخ ارزیاب",
        branch_category: branchCategoryId,
      };
      const res = await ticketService.createTicket(finalData);
      if (res.status === 201) {
        router.push("/mechanic/dashboard/tickets");
      }
    } catch (err) {
      console.log("err", err);
    } finally {
    }
  };

  const handleReset = () => {
    reset();
    // setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await ticketService.getCategories();
        setRootCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

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
                onChange={handleChangeRootCategory}
              >
                {rootCategories?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.category && <p>انتخاب دسته‌بندی اجباری است.</p>}
            </div>
            <div className="field">
              <label htmlFor="part_type">{"نوع قطعه:"}</label>
              <select
                id="part_type"
                {...register("part_type", { required: true })}
                onChange={handleChangeTrunkCategory}
              >
                {trunkCategories?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
                onChange={handleChangeBranchCategory}
              >
                {branchCategories?.map((item: any) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
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
            <label htmlFor="description">{"پیام:"}</label>
            <textarea
              id="description"
              rows={10}
              {...register("description", { required: true })}
            ></textarea>
            {errors.description && <p>وارد کردن پیام اجباری است.</p>}
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
