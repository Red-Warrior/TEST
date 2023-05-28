import React, { FC } from 'react';
import styles from "./default-constructor-element.module.css";

interface IDefaultConstructorElementProps {
  type?: string;
  text?: string;
  extraClass?: string;
  isHover?: boolean;
}

const DefaultConstructorElement: FC<IDefaultConstructorElementProps> = (
  {
    type,
    text,
    extraClass = "",
    isHover
  }) => {
  const className = `${styles.constructorElement} ${type ? styles[type] : ""} ${extraClass}`;

  return (
    <div className={`${className} ${isHover ? styles.hover : ""}`}>
      <span>{text}</span>
    </div>
  );
};

export default DefaultConstructorElement;
