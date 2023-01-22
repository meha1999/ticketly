import DashboardLayout from "components/layouts/dashboard/customer";
import Image from "next/image";
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
import Attach from "images/icons/attach";
import Microphone from "images/icons/microphone";
import ImageUpload from "images/icons/image_upload";
import Play from "images/icons/paly";
import { TiDelete } from "react-icons/ti";
import { ChatService } from "services/chat.service";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import useRecorder from "src/tools/custom-hooks/use-recorder";
import { UseRecorder } from "src/model/recorder";

const ticketService = new TicketService();
const chatService = new ChatService();

const Create = () => {
  const { recorderState, ...handlers }: UseRecorder = useRecorder();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const [rootCategories, setRootCategories] = useState<Array<any>>([]);
  const [trunkCategories, setTrunkCategories] = useState<Array<any>>([]);
  const [branchCategories, setBranchCategories] = useState<Array<any>>([]);
  const [selectedRoot, setSelectedRoot] = useState<any>();
  const [selectedPartType, setSelectedPartType] = useState<any>();
  const [selectedAccessoriesType, setSelectedAccessoriesType] = useState<any>();
  const [selectedFiles, setSelectedFiles] = useState<Array<any>>([]);

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

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("file_type", "FILE");
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const res = await chatService.upload(data, config);
        setSelectedFiles([
          ...selectedFiles,
          { file: e.target.files[0], id: res.data.id },
        ]);
        e.target.files = null;
        e.target.value = "";
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="فایل شما با موفقیت آپلود شد."
          />
        );
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      } finally {
      }
    }
  };

  const handleUploadVoice = async () => {
    handlers.saveRecording();
    try {
      const audioBlob = await fetch(recorderState.audio as string).then((r) =>
        r.blob()
      );
      const audiofile = new File(
        [audioBlob],
        `${new Date().toISOString()}.wav`,
        {
          type: "audio/wav",
        }
      );
      const data = new FormData();
      data.append("file", audiofile);
      data.append("file_type", "VOICE");
      const config = {
        headers: { "content-type": "multipart/form-data" },
      };
      const res = await chatService.upload(data, config);
      setSelectedFiles([
        ...selectedFiles,
        { file: audiofile, id: res.data.id },
      ]);
      Toaster.success(
        <ToastComponent
          title="موفق"
          description="فایل شما با موفقیت آپلود شد."
        />
      );
    } catch (error) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("file_type", "IMAGE");
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const res = await chatService.upload(data, config);
        setSelectedFiles([
          ...selectedFiles,
          { file: e.target.files[0], id: res.data.id },
        ]);
        e.target.files = null;
        e.target.value = "";
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="عکس شما با موفقیت آپلود شد."
          />
        );
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      } finally {
      }
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      try {
        const data = new FormData();
        data.append("file", e.target.files[0]);
        data.append("file_type", "VIDEO");
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const res = await chatService.upload(data, config);
        setSelectedFiles([
          ...selectedFiles,
          { file: e.target.files[0], id: res.data.id },
        ]);
        e.target.files = null;
        e.target.value = "";
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="ویدیو شما با موفقیت آپلود شد."
          />
        );
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      } finally {
      }
    }
  };

  const handleDeleteAttachment = async (id: any) => {
    try {
      const res = await chatService.deleteUploadedFile(id);
      if (res.status === 204) {
        const data = selectedFiles.filter((item) => item.id !== id);
        setSelectedFiles(data);
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="فایل آپلود شده با موفقیت حذف شد."
          />
        );
      }
    } catch (error) {
      console.log(error);
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
    }
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
        upload_ticket: selectedFiles.map((i: any) => {
          return { id: i.id };
        }),
        order_ticket: [],
      };
      const res = await ticketService.createTicket(finalData);
      if (res.status === 201) {
        router.push("/customer/dashboard/tickets");
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="تیکت شما با موفقیت ثبت شد."
          />
        );
      }
    } catch (err) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
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
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
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

  useEffect(() => {
    recorderState.audio && handleUploadVoice();
  }, [recorderState.audio]);

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
                disabled={!rootCategories.length}
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
          <div className="row">
            <label>{"فایل پیوست:"}</label>
            <div className="file-upload-content">
              <div className="inputs-container">
                <div className="upload-input-container">
                  <label htmlFor="file" className="upload-input-label">
                    <Attach color="#00A48A" />
                    <span className="title">فایل</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    className="upload-input"
                    {...register("file")}
                    onChange={handleUploadFile}
                  />
                </div>
                <div
                  className="upload-input-container"
                  onClick={() =>
                    !recorderState.initRecording
                      ? handlers.startRecording()
                      : handlers.saveRecording()
                  }
                >
                  <label className="upload-input-label">
                    <Microphone
                      color={
                        recorderState.initRecording ? "#FA1744" : "#00A48A"
                      }
                      classStyle={`${
                        recorderState.initRecording ? "fade-in" : ""
                      }`}
                    />
                    <span className="title">ضبط صدا</span>
                  </label>
                </div>
                <div className="upload-input-container">
                  <label htmlFor="image" className="upload-input-label">
                    <ImageUpload color="#00A48A" />
                    <span className="title">عکس</span>
                  </label>
                  <input
                    type="file"
                    id="image"
                    accept=".png, .jpg, .jpeg"
                    className="upload-input"
                    {...register("image")}
                    onChange={handleUploadImage}
                  />
                </div>
                <div className="upload-input-container">
                  <label htmlFor="video" className="upload-input-label">
                    <Play color="#00A48A" />
                    <span className="title">ویدیو</span>
                  </label>
                  <input
                    type="file"
                    id="video"
                    accept="video/mp4"
                    className="upload-input"
                    {...register("video")}
                    onChange={handleUploadVideo}
                  />
                </div>
              </div>
              <div className="uploaded-files">
                {selectedFiles &&
                  selectedFiles?.map((item: any, index: number) => (
                    <div className="uploaded-file-container" key={index}>
                      <p className="file">{item?.file?.name}</p>
                      <TiDelete
                        color="#FF2055"
                        onClick={() => handleDeleteAttachment(item?.id)}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
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
    ctx.res.setHeader("Location", "/customer/auth/login");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }
  return {
    props: {},
  };
};
