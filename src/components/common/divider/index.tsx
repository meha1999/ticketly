import React from "react";

interface DividerProps {
  className?: string;
  margin?: boolean;
}

const Divider: React.FC<DividerProps> = ({ className, margin }) => {
  return (
    <div
      className={`divider  ${className ? className : ""}`}
      style={{ margin: margin ? "10px 0" : "0" }}
    />
  );
};

export default Divider;
