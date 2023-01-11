import { FormEvent, useEffect, useState } from "react";
import Title from "components/common/title";
import ProfileBold from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard/mechanic";
import Divider from "components/common/divider";
import TextInput from "components/common/inputs/TextInput";
import ImageInput from "components/common/inputs/ImageInput";
import Dropdown from "components/common/inputs/Dropdown";
import { ProfileService } from "services/profile.service";
import { GetServerSideProps } from "next";
import { toBase64 } from "src/tools/tobase64";

interface ProfileFormState {
  photo: string | ArrayBuffer | null;
  userName: string;
  mobile_phone: string;
  national_id: string;
  email: string;
  address: string;
  province: number | null;
  city: number | null;
}
interface ChangePassState {
  currentPass: string;
  newPass: string;
  newPassRepeat: string;
}

const profileService = new ProfileService();

const Profile = () => {
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    photo: null,
    userName: "",
    mobile_phone: "",
    national_id: "",
    email: "",
    address: "",
    province: null,
    city: null,
  });
  const [resetPass, setResetPass] = useState<ChangePassState>({
    currentPass: "",
    newPass: "",
    newPassRepeat: "",
  });

  const [cities, setCities] = useState<any>([]);
  const [province, setProvince] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const submitProfileForm = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise((res) => setTimeout(() => res(""), 5000));
      // const formRes = await authService.userInfoPatch({
      //   ...profileForm,
      //   address: `${profileForm.province}-${profileForm.city}-${profileForm.address}`,
      // });
      console.log({
        ...profileForm,
        address: `${profileForm.province}-${profileForm.city}-${profileForm.address}`,
      });

      setLoading(false);
    } catch (error) {}
  };

  const userProfileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const data = await toBase64(e.target.files[0]);
    setProfileForm({ ...profileForm, photo: data });
  };

  const setProfileDataHandler = (e: React.ChangeEvent<any>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const resetPasswordHandler = (e: React.ChangeEvent<any>) => {
    setResetPass({ ...resetPass, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getProvince = async () => {
      try {
        const provinceRes = await profileService.getProvince();
        setProvince(provinceRes.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProvince();
  }, []);

  useEffect(() => {
    if (profileForm.province) {
      const getCities = async () => {
        try {
          const citiesRes = await profileService.getCities(
            profileForm.province ?? 8
          );
          setCities(citiesRes.data.shahrs);
        } catch (error) {
          console.log(error);
        }
      };
      getCities();
    }
  }, [profileForm.province]);

  useEffect(() => {
    if (profileForm.province && profileForm.city) return;
    setProfileForm((prev) => ({
      ...prev,
      province: province[7]?.id,
      city: cities[0]?.id,
    }));
  }, [province, cities, profileForm]);

  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
        <Title titleIcon={ProfileBold} titleText="پروفایل" />
        <Divider />
        <form className="user-profile-form" onSubmit={submitProfileForm}>
          <div className="form-item">
            <ImageInput
              id="photo"
              label="تصویر کاربر"
              inputColor="#00A48A"
              onChange={userProfileHandler}
              image={profileForm.photo}
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
              id="mobile_phone"
              onChange={setProfileDataHandler}
            />
          </div>
          <div className="form-item">
            <TextInput
              label="کد ملی"
              id="national_id"
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
              currentValue={profileForm?.province || undefined}
              onChange={setProfileDataHandler}
            />
            <Dropdown
              id="city"
              label="شهر"
              onChange={setProfileDataHandler}
              currentValue={profileForm?.city || undefined}
              currentOptions={cities}
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
