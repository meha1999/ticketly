import { FC, ReactNode } from "react";

interface CustomPortalProps {
  children: ReactNode;
}

const CustomPortal: FC<CustomPortalProps> = ({ children }) => {
  return <div className="portal">{children}</div>;
};

export default CustomPortal;
