import DashboardLayout from "components/layouts/dashboard/mechanic";
import Image from "next/image";
import fileUploadIcon from "public/images/icons/file_upload.svg";
import trashIcon from "public/images/icons/trash.svg";
import createTicket from "public/images/icons/create_ticket_fill.svg";
import Title from "components/common/title";
import Divider from "components/common/divider";
import { GetServerSideProps } from "next";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TicketService } from "services/ticket.service";
import { useSelector } from "react-redux";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useRouter } from "next/router";
import Dropdown from "components/common/inputs/Dropdown";

const ticketService = new TicketService();

const Create = () => {
  const portalContainer: any = document.getElementById("portal");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const router = useRouter();

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const [rootCategories, setRootCategories] = useState<Array<any>>([]);
  const [trunkCategories, setTrunkCategories] = useState<Array<any>>([]);
  const [branchCategories, setBranchCategories] = useState<Array<any>>([]);

  const [selectedRoot, setSelectedRoot] = useState<any>();
  const [selectedPartType, setSelectedPartType] = useState<any>();
  const [selectedAccessoriesType, setSelectedAccessoriesType] = useState<any>();

  const rootChangeHandler = (event: any) => {
    const selectedRootId = +event.target.value;
    setSelectedRoot(selectedRootId);
    setTrunkCategories(
      rootCategories.find((item) => item.id === selectedRootId).trunk_root
    );
  };

  const partTypeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTrunkId = +event.target.value;
    setSelectedPartType(selectedTrunkId);
    setBranchCategories(
      trunkCategories.find((item) => item.id === selectedTrunkId).branch_trunk
    );
  };

  const accessoriesTypeHandleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAccessoriesTypeId = +event.target.value;
    setSelectedAccessoriesType(selectedAccessoriesTypeId);
    setBranchCategories(
      branchCategories.filter(
        (rootItem) => rootItem.id === selectedAccessoriesTypeId
      )
    );
  };

  const handleRequest = async (data: FieldValues) => {
    try {
      const finalData = {
        name: data.name,
        department: 1,
        customer: user?.id,
        priority: "high",
        description: data.description,
        status: "UNREAD",
        branch_category: selectedAccessoriesType,
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

  const handleReset = () => reset();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await ticketService.getCategories();
        setRootCategories(res.data);
        setSelectedRoot(res.data[0].id);
        setTrunkCategories(res.data[0].trunk_root);
        setBranchCategories(res.data[0].trunk_root[0].branch_trunk);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    setSelectedPartType(trunkCategories[0]?.id);
    setBranchCategories(trunkCategories[0]?.branch_trunk);
  }, [selectedRoot, trunkCategories]);

  useEffect(() => {
    setSelectedAccessoriesType(
      branchCategories?.length ? branchCategories[0]?.id : null
    );
  }, [selectedPartType, branchCategories]);

  return (
    <DashboardLayout>
      <div className="create">
        <Title titleText="ثبت تیکت جدید" titleIcon={createTicket} />
        <Divider />
        <form className="content" onSubmit={handleSubmit(handleRequest)}>
          <div className="row">
            <div className="field">
              <Dropdown
                id="category"
                label="دسته بندی"
                currentOptions={rootCategories}
                currentValue={selectedRoot}
                onChange={rootChangeHandler}
              />
            </div>
            <div className="field">
              <Dropdown
                id="part_type"
                label="دسته بندی"
                disabled={!trunkCategories?.length}
                currentOptions={trunkCategories}
                currentValue={selectedPartType}
                onChange={partTypeChangeHandler}
              />
            </div>
          </div>
          <div className="row">
            <div className="field">
              <Dropdown
                id="accessories_type"
                label="نوع لوازم قطعه"
                disabled={!branchCategories?.length}
                currentOptions={branchCategories}
                currentValue={selectedAccessoriesType}
                onChange={accessoriesTypeHandleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="name">{"نام کالا:"}</label>
              <input
                id="name"
                type="text"
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
