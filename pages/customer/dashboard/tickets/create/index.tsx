import DashboardLayout from "components/layouts/dashboard/customer";
import Image from "next/image";
import trashIcon from "public/images/icons/trash.svg";
import createTicket from "public/images/icons/create_ticket_fill.svg";
import Title from "components/common/title";
import Divider from "components/common/divider";
import { GetServerSideProps } from "next";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
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
import SeoHead from "components/common/seo-head";
import { checkFileInputValidation } from "src/tools/checkFileInputValidation";
import errorHandler from "src/tools/error-handler";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { FaMinus, FaPlus } from "react-icons/fa";

const ticketService = new TicketService();
const chatService = new ChatService();

const TimePeriodEntities = [
  { name: "ساعت", value: "h" },
  { name: "روز", value: "d" },
  { name: "هفته", value: "w" },
  { name: "ماه", value: "m" },
];

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
  const [loading, setLoading] = useState<string>("");
  const [requestType, setRequestType] = useState<number>(1);
  const dropDownRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(1);

  const [range, setRange] = useState<any>({
    numberOfRange: 1,
    timeFrame: "d",
  });

  const translateRangeType: any = {
    h: "ساعت",
    d: "روز",
    w: "هفته",
    m: "ماه",
  };

  const rangeToHour: any = {
    h: 1,
    d: 24,
    w: 24 * 7,
    m: 24 * 30,
  };

  const type = [
    { id: 1, name: "خرید کالا" },
    { id: 2, name: "سرویس (خدمات)" },
  ];

  const rootChangeHandler = (event: any) => {
    const selectedRootId = +event.target.value;
    setSelectedRoot(selectedRootId);
    setTrunkCategories(
      rootCategories.find((item) => item.id === selectedRootId)[
        requestType == 1 ? "product_trunk_root" : "service_trunk_root"
      ]
    );
  };

  const partTypeChangeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedTrunkId = +event.target.value;
    setSelectedPartType(selectedTrunkId);
    setBranchCategories(
      trunkCategories.find((item) => item.id === selectedTrunkId)[
        requestType == 1 ? "product_branch_trunk" : "service_branch_trunk"
      ]
    );
  };

  const accessoriesTypeHandleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedAccessoriesTypeId = +event.target.value;
    const selected = branchCategories.find(
      (rootItem) => rootItem.id === selectedAccessoriesTypeId
    );
    setSelectedAccessoriesType(selected.id);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      if (e.target.files[0].size >= 50000000) {
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="حداکثر سایز فایل 50 مگابایت میباشد"
          />
        );
        return;
      }
      const isValid = checkFileInputValidation(e.target.files[0].name, "file");
      if (isValid) {
        try {
          setLoading("file");
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
        } catch (error: any) {
          errorHandler(error);
        } finally {
          setLoading("");
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
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
          description="صوت شما با موفقیت آپلود شد."
        />
      );
    } catch (error: any) {
      errorHandler(error);
    } finally {
      setLoading("");
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      if (e.target.files[0].size >= 20000000) {
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="حداکثر سایز عکس 20 مگابایت میباشد"
          />
        );
        return;
      }
      const isValid = checkFileInputValidation(e.target.files[0].name, "image");
      if (isValid) {
        try {
          setLoading("image");
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
        } catch (error: any) {
          errorHandler(error);
        } finally {
          setLoading("");
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
      }
    }
  };

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    } else {
      if (e.target.files[0].size >= 50000000) {
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="حداکثر سایز فیلم 50 مگابایت میباشد"
          />
        );
        return;
      }
      const isValid = checkFileInputValidation(e.target.files[0].name, "video");
      if (isValid) {
        try {
          setLoading("video");
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
        } catch (error: any) {
          errorHandler(error);
        } finally {
          setLoading("");
        }
      } else {
        e.target.files = null;
        e.target.value = "";
        Toaster.error(
          <ToastComponent
            title="ناموفق"
            description="لطفا فایل تایپ مناسب اپلود نمایید"
          />
        );
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
    } catch (error: any) {
      errorHandler(error);
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
        product_category: null,
        service_category: null,
        status: "UNREAD",
        due_time: `${rangeToHour[range.timeFrame] * range.numberOfRange}:00:00`,
        upload_ticket: selectedFiles.map((i: any) => {
          return { id: i.id };
        }),
        count: count,
      };
      requestType == 1
        ? (finalData.product_category = {
            ...branchCategories?.find(
              (rootItem) => rootItem.id === selectedAccessoriesType
            ),
          })
        : (finalData.service_category = {
            ...branchCategories?.find(
              (rootItem) => rootItem.id === selectedAccessoriesType
            ),
          });
      const res = await ticketService.createTicket(finalData);
      if (res.status === 201) {
        router.push("/customer/dashboard/tickets/supplying");
        Toaster.success(
          <ToastComponent
            title="موفق"
            description="تیکت شما با موفقیت ثبت شد."
          />
        );
      }
    } catch (error: any) {
      errorHandler(error);
    } finally {
    }
  };

  const handleReset = async () => {
    const list = selectedFiles.map((i: any) => i.id);
    const finalList = list.map((item: any) => {
      const temp = {
        id: item,
      };
      return temp;
    });
    if (finalList.length) {
      try {
        const res = await chatService.deleteUploadedFiles({
          data: finalList,
        });
        if (res.status === 204 || res.status === 201) {
          Toaster.success(
            <ToastComponent
              title="موفق"
              description="فایل‌های پیوست با موفقیت حذف شدند."
            />
          );
          setSelectedFiles([]);
        } else {
          Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
        }
      } catch (error: any) {
        errorHandler(error);
      }
    }
    reset();
  };

  const getCategories = async () => {
    try {
      const res =
        requestType == 1
          ? await ticketService.getCategories()
          : await ticketService.getServices();
      setRootCategories(res.data);
      setSelectedRoot(res.data[0].id);
      setTrunkCategories(
        requestType == 1
          ? res.data[0].product_trunk_root
          : res.data[0].service_trunk_root
      );
      setBranchCategories(
        requestType == 1
          ? res.data[0].product_trunk_root[0].product_branch_trunk
          : res.data[0].service_trunk_root[0].service_branch_trunk
      );
    } catch (error: any) {
      errorHandler(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [requestType]);

  useEffect(() => {
    setSelectedPartType(trunkCategories[0]?.id);
    setBranchCategories(
      trunkCategories[0] &&
        trunkCategories[0][
          requestType == 1 ? "product_branch_trunk" : "service_branch_trunk"
        ]
    );
  }, [selectedRoot, trunkCategories]);

  useEffect(() => {
    setSelectedAccessoriesType(
      branchCategories?.length ? branchCategories[0].id : null
    );
  }, [selectedPartType, branchCategories]);

  useEffect(() => {
    recorderState.audio && handleUploadVoice();
  }, [recorderState.audio]);

  return (
    <>
      <DashboardLayout>
        <div className="create">
          <Title titleText="ثبت تیکت جدید" titleIcon={createTicket} />
          <Divider />
          <form className="content" onSubmit={handleSubmit(handleRequest)}>
            <div className="row">
              <div className="field">
                <Dropdown
                  id="type"
                  label="انتخاب درخواست"
                  currentOptions={type}
                  currentValue={requestType}
                  onChange={(e) => setRequestType(e.target.value as any)}
                />
              </div>
              <div className="field">
                <div className="select-period">
                  <span className="select-period-title">
                    {"زمان انتظار دریافت پاسخ :"}
                  </span>
                  <div className="select-period-group">
                    <input
                      value={range.numberOfRange ? range.numberOfRange : ""}
                      onChange={(e) =>
                        e.target.valueAsNumber <= 40 &&
                        setRange({
                          numberOfRange: e.target.valueAsNumber,
                          timeFrame: range.timeFrame,
                        })
                      }
                      placeholder={"تعداد"}
                      type="number"
                      className="select-period-date-number"
                    />
                    <div className="select-period-dropdown" ref={dropDownRef}>
                      <button
                        className={`select-period-dropdown-button ${
                          isOpen ? "button-active" : ""
                        }`}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <span className="select-period-dropdown-button-title">
                          {range?.timeFrame
                            ? translateRangeType[range?.timeFrame]
                            : "بازه"}
                        </span>
                        <span className="select-period-dropdown-button-icons">
                          <GiHamburgerMenu />
                          <MdArrowDropDown />
                        </span>
                      </button>
                      <div
                        className="select-period-items-wrapper"
                        style={{ display: isOpen ? "flex" : "none" }}
                      >
                        {TimePeriodEntities?.map((item, index) => (
                          <button
                            key={index}
                            className="select-period-items-button"
                            onClick={() => {
                              setIsOpen(false);
                              setRange({
                                numberOfRange: range.numberOfRange,
                                timeFrame: item.value,
                              });
                            }}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {requestType == 1 && (
                <>
                  <div className="field">
                    <Dropdown
                      id="category"
                      label="نوع وسیله نقلیه"
                      disabled={!rootCategories.length}
                      currentOptions={rootCategories}
                      currentValue={selectedRoot}
                      onChange={rootChangeHandler}
                    />
                  </div>
                  <div className="field">
                    <Dropdown
                      id="part_type"
                      label="نام برند"
                      disabled={!trunkCategories?.length}
                      currentOptions={trunkCategories}
                      currentValue={selectedPartType}
                      onChange={partTypeChangeHandler}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className="field">
                <Dropdown
                  id="accessories_type"
                  label={requestType == 2 ? "سرویس انتخابی:" : "نوع لوازم قطعه"}
                  disabled={!branchCategories?.length}
                  currentOptions={branchCategories}
                  currentValue={selectedAccessoriesType}
                  onChange={accessoriesTypeHandleChange}
                />
              </div>
              <div className="field">
                <label htmlFor="name">
                  {requestType == 2 ? "موضوع سرویس:" : "نام کالا:"}
                </label>
                <input
                  id="name"
                  type="text"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="name-error">وارد کردن نام کالا اجباری است.</p>
                )}
                <label htmlFor="count">{"تعداد"}</label>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    backgroundColor: "white",
                    borderRadius: 15,
                    width: 100,
                  }}
                >
                  <div
                    onClick={() => count < 99 && setCount((prev) => prev + 1)}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      fontSize: "small",
                    }}
                  >
                    <FaPlus />
                  </div>
                  <input
                    id="count"
                    type="number"
                    value={count}
                    onChange={(e) =>
                      +e.target.value > 0 &&
                      +e.target.value <= 100 &&
                      setCount(+e.target.value)
                    }
                  />
                  <div
                    onClick={() => count > 1 && setCount((prev) => prev - 1)}
                    style={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "small",
                      cursor: "pointer",
                    }}
                  >
                    <FaMinus />
                  </div>
                </div>
                {errors.name && (
                  <p className="name-error">وارد کردن نام کالا اجباری است.</p>
                )}
              </div>
            </div>
            <div className="message">
              <label htmlFor="description">{"پیام:"}</label>
              <textarea
                id="description"
                rows={6}
                {...register("description", { required: true })}
              ></textarea>
              {errors.description && (
                <p className="message-error">وارد کردن پیام اجباری است.</p>
              )}
            </div>
            <div className="row">
              <label>{"فایل پیوست:"}</label>
              <div className="file-upload-content">
                <div className="inputs-container">
                  <div className="upload-input-container">
                    <label
                      htmlFor="file"
                      className={`upload-input-label ${
                        loading && loading !== "file" ? "disabled" : ""
                      }`}
                    >
                      {loading === "file" ? (
                        <div className="loader"></div>
                      ) : (
                        <Attach color="#00A48A" />
                      )}
                      <span className="title">
                        {loading === "file" ? "در‌حال بارگذاری" : "فایل"}
                      </span>
                    </label>
                    <input
                      type="file"
                      id="file"
                      {...register("file")}
                      onChange={handleUploadFile}
                      className={`upload-input ${
                        loading && loading !== "file" ? "disabled" : ""
                      }`}
                      accept=".rar, .zip, .txt, .pdf, .docx , .xlsx , .mp4 ,.mov, .mp3,. png, .jpg, .jpeg  , .mkv, .gif "
                    />
                  </div>
                  <div
                    className="upload-input-container"
                    onClick={() => {
                      setLoading("voice");
                      !recorderState.initRecording
                        ? handlers.startRecording()
                        : handlers.saveRecording();
                    }}
                  >
                    <label
                      className={`upload-input-label ${
                        loading && loading !== "voice" ? "disabled" : ""
                      }`}
                    >
                      <Microphone
                        color={
                          recorderState.initRecording ? "#FA1744" : "#00A48A"
                        }
                        classStyle={`${
                          recorderState.initRecording ? "fade-in" : ""
                        }`}
                      />
                      <span className="title">
                        {recorderState.initRecording ? "در‌حال ضبط" : "ضبط صدا"}
                      </span>
                    </label>
                  </div>
                  <div className="upload-input-container">
                    <label
                      htmlFor="image"
                      className={`upload-input-label ${
                        loading && loading !== "image" ? "disabled" : ""
                      }`}
                    >
                      {loading === "image" ? (
                        <div className="loader"></div>
                      ) : (
                        <ImageUpload color="#00A48A" />
                      )}
                      <span className="title">
                        {loading === "image" ? "در‌حال بارگذاری" : "عکس"}
                      </span>
                    </label>
                    <input
                      type="file"
                      id="image"
                      accept=".png, .jpg, .jpeg"
                      className={`upload-input ${
                        loading && loading !== "image" ? "disabled" : ""
                      }`}
                      {...register("image")}
                      onChange={handleUploadImage}
                    />
                  </div>
                  <div className="upload-input-container">
                    <label
                      htmlFor="video"
                      className={`upload-input-label ${
                        loading && loading !== "video"
                          ? "disabled"
                          : "self-disabled"
                      }`}
                    >
                      {loading === "video" ? (
                        <div className="loader"></div>
                      ) : (
                        <Play color="#00A48A" />
                      )}
                      <span className="title">
                        {loading === "video" ? "در‌حال بارگذاری" : "ویدیو"}
                      </span>
                    </label>
                    <input
                      type="file"
                      id="video"
                      accept=".mkv ,.mp4, .mov"
                      className={`upload-input ${
                        loading && loading !== "video" ? "disabled" : ""
                      }`}
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
      <SeoHead title="ثبت تیکت جدید" description="" />
    </>
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
