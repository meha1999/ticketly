import Image from "next/image";
import React, { FC } from "react";

interface TitleProps {
  titleIcon?: any;
  svgIcon?: any;
  titleText: string;
  titleSideComponent?: JSX.Element;
}

const Title: FC<TitleProps> = ({
  titleIcon,
  titleText,
  svgIcon,
  titleSideComponent,
}) => {
  return (
    <div className="title-wrapper">
      <div className="title-items">
        <div className="hero">
          {svgIcon ? (
            svgIcon
          ) : titleIcon ? (
            <Image
              src={titleIcon}
              alt={titleText}
              className="title-icon"
              draggable={false}
            />
          ) : (
            ""
          )}
          <span className="title-text">{titleText}</span>
        </div>
        {titleSideComponent}
      </div>
    </div>
  );
};

export default Title;
