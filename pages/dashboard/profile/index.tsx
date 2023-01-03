import Title from "components/common/title";
import ProfileBold from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard";
import Divider from "components/common/divider";
import InputWithLabel from "components/pure/profile/InputWithLabel";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
        <Title
          titleIcon={ProfileBold}
          titleText="پروفایل"
          titleSideComponent={<div></div>}
        />
        <Divider />
        <form className="user-profile-form">
          <div className="form-item">
            <InputWithLabel isFileInput id="user-detail" label="تصویر کاربری" />
          </div>
          <div className="form-item">
            <InputWithLabel label="نام و نام خانوادگی" id="user-detail" />
            <InputWithLabel label="شماره موبایل" id="user-cell" />
          </div>
          <div className="form-item">
            <InputWithLabel label="کد ملی" id="national-code" />
            <InputWithLabel label="ایمیل" id="email" />
          </div>
          <InputWithLabel
            label="ادرس محل سکونت"
            isFullWidthInput
            id="address"
          />
          <div className="change-password">
            <h4 className="change-pass-title" style={{ color: "#5E7BEC" }}>
              تغییر رمز عبور
            </h4>
            <div className="form-item">
              <InputWithLabel label="رمز عبور فعلی" id="current-pass" />
              <InputWithLabel label="رمز عبور جدید" id="new-pass" />
            </div>
            <div className="form-item left">
              <InputWithLabel label="تکرار رمز عبور جدید" id="new-pass" />
            </div>
          </div>
          <Divider />
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
