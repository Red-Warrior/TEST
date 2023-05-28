import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { NavLink } from "react-router-dom";
import styles from './router-link.module.css';

interface IRouterLinkProps {
  iconPrimary: ReactNode;
  iconSecondary: ReactNode;
  to: string;
  extraClass?: string;
}

const RouterLink: FC<PropsWithChildren<IRouterLinkProps>> = (
  {
    children,
    iconPrimary: IconPrimary,
    iconSecondary: IconSecondary,
    to,
    extraClass = '',
  }) => {

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${extraClass} ${styles.linkHeader} ${isActive ? styles.active : ""} pl-5 pr-5`
      }
    >
      {({ isActive }) => isActive ? [IconPrimary, children] : [IconSecondary, children]}
    </NavLink>
  );
};

export default RouterLink;
