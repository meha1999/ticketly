import Image from "next/image";
import React, { FC } from "react";

interface TitleProps {
  titleIcon: any;
  titleText: string;
  titleSideComponent?: JSX.Element;
}

const Title: FC<TitleProps> = ({
  titleIcon,
  titleText,
  titleSideComponent,
}) => {
  return (
    <div className="title-wrapper">
      <div className="title-items">
        <div className="hero">
          <Image
            src={titleIcon}
            alt={titleText}
            className="title-icon"
            draggable={false}
          />
          <span className="title-text">{titleText}</span>
        </div>
        <div className="side-component">{titleSideComponent}</div>
      </div>
      <span className="underline" />
    </div>
  );
};

export default Title;
