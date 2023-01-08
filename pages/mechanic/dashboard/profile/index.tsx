import { useEffect, useState } from "react";
import Title from "components/common/title";
import ProfileBold from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard/mechanic";
import Divider from "components/common/divider";
import TextInput from "components/common/inputs/TextInput";
import ImageInput from "components/common/inputs/ImageInput";
import Dropdown from "components/common/inputs/Dropdown";
import { ProfileService } from "services/profile.service";
import { GetServerSideProps } from "next";

interface ProfileFormState {
  userImage: File | null;
  userName: string;
  userPhone: string;
  nationalCode: string;
  email: string;
  address: string;
  province: string;
  city: string;
}
interface ChangePassState {
  currentPass: string;
  newPass: string;
  newPassRepeat: string;
}

const profileService = new ProfileService();
const Profile = () => {
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    userImage: null,
    userName: "",
    userPhone: "",
    nationalCode: "",
    email: "",
    address: "",
    province: "",
    city: "",
  });
  const [resetPass, setResetPass] = useState<ChangePassState>({
    currentPass: "",
    newPass: "",
    newPassRepeat: "",
  });

  const [cities, setCities] = useState([]);
  const [province, setProvince] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const citiesRes = await profileService.getProvince();
        setProvince(citiesRes.data);
      } catch (error) {}
    };
    getCities();
  }, []);

  useEffect(() => {
    const getProvince = async () => {
      const provinceRes = await profileService.getCities(profileForm.province);
      setCities(provinceRes.data);
    };
    getProvince();
  }, [profileForm.province]);

  const submitProfileForm = () => {};

  const userProfileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    setProfileForm({ ...profileForm, userImage: e.target.files[0] });
  };

  const setProfileDataHandler = (e: React.ChangeEvent<any>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const resetPasswordHandler = (e: React.ChangeEvent<any>) => {
    setResetPass({ ...resetPass, [e.target.name]: e.target.value });
  };

  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
        <Title titleIcon={ProfileBold} titleText="پروفایل" />
        <Divider />
        <form className="user-profile-form" onSubmit={submitProfileForm}>
          <div className="form-item">
            <ImageInput
              label="تصویر کاربر"
              id="userImage"
              inputColor="#00A48A"
              onChange={userProfileHandler}
              image={profileForm.userImage}
            />
          </div>
          <div className="form-item">
            <TextInput
              label="نام و نام خانوادگی"
              id="userDetail"
              onChange={setProfileDataHandler}
            />
            <TextInput
              label="شماره موبایل"
              id="cellPhone"
              onChange={setProfileDataHandler}
            />
          </div>
          <div className="form-item">
            <TextInput
              label="کد ملی"
              id="nationalCode"
              onChange={setProfileDataHandler}
            />
            <TextInput
              label="ایمیل"
              id="email"
              onChange={setProfileDataHandler}
            />
          </div>
          <div className="form-item">
            <Dropdown
              id="province"
              label="استان"
              currentOptions={province}
              currentValue={profileForm.province}
              onChange={setProfileDataHandler}
            />
            <Dropdown
              id="city"
              label="شهر"
              disabled={!!profileForm.province}
              onChange={setProfileDataHandler}
              currentValue={profileForm.city}
              currentOptions={["sss", "Sssss", "eeee"]}
            />
          </div>
          <TextInput label="ادرس محل سکونت" isFullWidthInput id="address" />
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
                  backgroundColor: "#00A48A",
                  boxShadow: `0px 10px 20px #00A48A50 `,
                }}
                type="submit"
              >
                ویرایش اطلاعات
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
                label="رمز عبور فعلی"
                onChange={resetPasswordHandler}
              />
              <TextInput
                id="newPass"
                label="رمز عبور جدید"
                onChange={resetPasswordHandler}
              />
            </div>
            <div className="form-item left">
              <TextInput
                id="newPassRepeat"
                label="تکرار رمز عبور جدید"
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
                  backgroundColor: "#00A48A",
                  boxShadow: `0px 10px 20px #00A48A50 `,
                }}
                type="submit"
              >
                تایید
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;

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
