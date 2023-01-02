import Title from "components/common/Title";
import ProfileBold from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
      <Title titleIcon={ProfileBold} titleText="پروفایل" titleSideComponent={<div></div>}/>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
