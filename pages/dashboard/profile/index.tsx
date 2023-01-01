import Title from "components/common/Title";
import ProfileBole from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
      <Title titleIcon={ProfileBole} titleText="پروفایل" titleSideComponent={<div></div>}/>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
