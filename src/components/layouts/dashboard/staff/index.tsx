import Header from "components/common/header";
import Sidebar from "components/common/sidebar/staff";
import { GetServerSideProps } from "next";
import React from "react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <div className="dashboard-container">
        <div className="header">
          <Header />
        </div>
        <div className="dashboard-content">
          <div className="dashboard-sidebar">
            <Sidebar />
          </div>
          <div className="dashboard-main">{children}</div>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {},
  };
};
