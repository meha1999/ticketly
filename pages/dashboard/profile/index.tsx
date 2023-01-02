import Title from "components/common/Title";
import ProfileBole from "public/images/icons/profile_bold.svg";
import DashboardLayout from "components/layouts/dashboard";
import Divider from "components/common/Divider";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="profile-page-wrapper">
        <Title
          titleIcon={ProfileBole}
          titleText="پروفایل"
          titleSideComponent={<div></div>}
        />
        <Divider />
      </div>
    </DashboardLayout>
  );
};

export default Profile;
