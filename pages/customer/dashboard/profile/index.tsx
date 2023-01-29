import { FormEvent, useEffect, useState } from "react";
import Title from "components/common/title";
import ProfileBold from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard/customer";
import Divider from "components/common/divider";
import TextInput from "components/common/inputs/TextInput";
import ImageInput from "components/common/inputs/ImageInput";
import Dropdown from "components/common/inputs/Dropdown";
import { ProfileService } from "services/profile.service";
import { GetServerSideProps } from "next";
import { ReduxStoreModel } from "src/model/redux/redux-store-model";
import { useDispatch, useSelector } from "react-redux";
import { AuthService } from "services/auth.service";
import { REDUX_ACTION } from "src/enum/redux-action.enum";
import ToastComponent from "components/common/toast/ToastComponent";
import { Toaster } from "components/common/toast/Toaster";
import SeoHead from "components/common/seo-head";

interface ProfileFormState {
  full_name: string;
  mobile_phone: string;
  national_id: string;
  email: string;
  address: string;
  ostan: number | null;
  shahr: number | null;
}
interface ChangePassState {
  currentPass: string;
  newPass: string;
  newPassRepeat: string;
}

const profileService = new ProfileService();
const authService = new AuthService();

const Profile = () => {
  const [profileForm, setProfileForm] = useState<Partial<ProfileFormState>>({});
  const [resetPass, setResetPass] = useState<ChangePassState>({
    currentPass: "",
    newPass: "",
    newPassRepeat: "",
  });

  const [cities, setCities] = useState<any>([]);
  const [province, setProvince] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [binaryImage, setBinaryImage] = useState<string | Blob | null>(null);
  const [userProfile, setUserProfile] = useState<string | ArrayBuffer | null>(
    null
  );
  const dispatch = useDispatch();

  const user = useSelector<ReduxStoreModel, ReduxStoreModel["user"]>(
    (store) => store.user
  );

  const submitProfileForm = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      binaryImage && formData.append("photo", binaryImage);
      profileForm.address && formData.append("address", profileForm.address);
      profileForm.shahr && formData.append("shahr", `${profileForm.shahr}`);
      profileForm.full_name &&
        formData.append("full_name", profileForm.full_name);
      profileForm.mobile_phone &&
        formData.append("mobile_phone", profileForm.mobile_phone);
      profileForm.national_id &&
        formData.append("national_id", profileForm.national_id);
      profileForm.ostan && formData.append("ostan", `${profileForm.ostan}`);

      const formRes = await authService.userInfoPatch(formData);
      dispatch({
        type: REDUX_ACTION.SET_USER,
        payload: formRes.data,
      });

      Toaster.success(
        <ToastComponent
          title="موفقیت امیز"
          description="اطلاعات شما با موفقیت ویرایش شد"
        />
      );
    } catch (error) {
      Toaster.error(<ToastComponent title="ناموفق" description="خطای سرور" />);
    } finally {
      setLoading(false);
    }
  };

  const userProfileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setBinaryImage(e.target.files[0]);
  };

  const setProfileDataHandler = (e: React.ChangeEvent<any>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const resetPasswordHandler = (e: React.ChangeEvent<any>) => {
    setResetPass({ ...resetPass, [e.target.name]: e.target.value });
  };

  const handleChangePassword = async () => {
    if (
      !resetPass.currentPass ||
      !resetPass.newPass ||
      !resetPass.newPassRepeat
    ) {
      Toaster.error(
        <ToastComponent
          title="ناموفق"
          description="پر کردن هر سه فیلد اجباری است."
        />
      );
      return;
    } else {
      try {
        const data = {
          new_password1: resetPass.newPass,
          new_password2: resetPass.newPassRepeat,
        };
        const res = await authService.changePassword(data);
        if (res.status === 200) {
          setResetPass({ currentPass: "", newPass: "", newPassRepeat: "" });
          Toaster.success(
            <ToastComponent
              title="موفقیت امیز"
              description="رمز‌عبور شما با موفقیت تغییر یافت."
            />
          );
        }
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      } finally {
      }
    }
  };

  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceRes = await profileService.getProvince();
        setProvince(provinceRes.data);
      } catch (error) {
        Toaster.error(
          <ToastComponent title="ناموفق" description="خطای سرور" />
        );
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    if (profileForm.ostan) {
      const getCities = async () => {
        try {
          const citiesRes = await profileService.getCities(
            profileForm.ostan ?? 8
          );
          setCities(citiesRes.data.shahrs);
        } catch (error) {
          Toaster.error(
            <ToastComponent title="ناموفق" description="خطای سرور" />
          );
        }
      };
      getCities();
    }
  }, [profileForm.ostan]);

  useEffect(() => {
    if (user?.ostan && !user?.shahr) {
      const ostan = province.filter((item: any) => user?.ostan === item.id)[0];
      setProfileForm((prev) => ({
        ...prev,
        ostan: ostan?.id,
      }));
    }
    if (user?.ostan && user?.shahr) {
      const ostan = province.filter((item: any) => user?.ostan === item.id)[0];
      const shahr = cities.filter((item: any) => user?.shahr === item.id)[0];

      setProfileForm((prev) => ({
        ...prev,
        ostan: ostan?.id,
        shahr: shahr?.id,
      }));
    }
  }, [user]);

  useEffect(() => {
    setProfileForm((prev) => ({
      ...prev,
      email: user?.email || "",
      full_name: user?.full_name || "",
      national_id: user?.national_id || "",
      mobile_phone: user?.mobile_phone || "",
      shahr: user?.shahr || null,
      ostan: user?.ostan || null,
      address: user?.address || "",
    }));
    setUserProfile(user?.photo || null);
  }, [user]);

  return (
    <>
      <DashboardLayout>
        <div className="profile-page-wrapper">
          <Title titleIcon={ProfileBold} titleText="پروفایل" />
          <Divider />
          <form className="user-profile-form" onSubmit={submitProfileForm}>
            <div className="form-item">
              <ImageInput
                id="photo"
                label="تصویر کاربر"
                inputColor="#5E7BEC"
                onChange={userProfileHandler}
                image={
                  binaryImage
                    ? URL.createObjectURL(binaryImage as any)
                    : userProfile ?? (user?.photo as string)
                }
              />
            </div>
            <div className="form-item">
              <TextInput
                id="full_name"
                label="نام و نام خانوادگی"
                value={profileForm.full_name}
                onChange={setProfileDataHandler}
              />
              <TextInput
                id="mobile_phone"
                label="شماره موبایل"
                value={profileForm.mobile_phone}
                onChange={setProfileDataHandler}
              />
            </div>
            <div className="form-item">
              <TextInput
                label="کد ملی"
                id="national_id"
                value={profileForm.national_id}
                onChange={setProfileDataHandler}
              />
              <TextInput
                label="ایمیل"
                id="email"
                value={profileForm.email}
                onChange={setProfileDataHandler}
              />
            </div>
            <div className="form-item">
              <Dropdown
                id="ostan"
                label="استان"
                disabled={!province.length}
                currentOptions={province}
                currentValue={profileForm?.ostan || undefined}
                onChange={setProfileDataHandler}
              />
              <Dropdown
                id="shahr"
                label="شهر"
                currentOptions={cities}
                disabled={!cities.length}
                onChange={setProfileDataHandler}
                currentValue={profileForm?.shahr || undefined}
              />
            </div>
            <TextInput
              id="address"
              isFullWidthInput
              label="ادرس محل سکونت"
              value={profileForm.address}
              onChange={setProfileDataHandler}
            />
            <div>
              <div className="form-btns-container">
                <button
                  style={{
                    color: "#B0B0B0",
                    border: " 1px solid #B0B0B0",
                    backgroundColor: "inherit",
                  }}
                  type="button"
                >
                  لغو
                </button>
                <button
                  style={{
                    color: "#fff",
                    backgroundColor: "#5E7BEC",
                    boxShadow: `0px 10px 20px #5E7BEC50 `,
                  }}
                  type="submit"
                >
                  {loading ? "درحال ارسال . . . " : "ویرایش اطلاعات"}
                </button>
              </div>
            </div>
            <div className="change-password">
              <h4 className="change-pass-title" style={{ color: "#5E7BEC" }}>
                تغییر رمز عبور
              </h4>
              <div className="form-item">
                <TextInput
                  id="currentPass"
                  type="password"
                  label="رمز عبور فعلی"
                  value={resetPass.currentPass}
                  onChange={resetPasswordHandler}
                />
                <TextInput
                  id="newPass"
                  type="password"
                  label="رمز عبور جدید"
                  value={resetPass.newPass}
                  onChange={resetPasswordHandler}
                />
              </div>
              <div className="form-item left">
                <TextInput
                  id="newPassRepeat"
                  type="password"
                  label="تکرار رمز عبور جدید"
                  value={resetPass.newPassRepeat}
                  onChange={resetPasswordHandler}
                />
              </div>
            </div>
            <div>
              <Divider />
              <div className="form-btns-container">
                <button
                  style={{
                    color: "#fff",
                    backgroundColor: "#5E7BEC",
                    boxShadow: `0px 10px 20px #5E7BEC50 `,
                  }}
                  type="button"
                  onClick={handleChangePassword}
                >
                  تایید
                </button>
              </div>
            </div>
          </form>
        </div>
      </DashboardLayout>
      <SeoHead title="پروفایل" description="" />
    </>
  );
};

export default Profile;

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
