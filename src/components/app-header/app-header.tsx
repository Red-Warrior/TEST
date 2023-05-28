import React, { FC } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './app-header.module.css';

import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import RouterLink from "./components/router-link/router-link";

const AppHeader: FC = () => {
  const navigate = useNavigate();

  const defaultStyle = "ml-2 text text_type_main-default";

  return (
    <nav className={styles.appHeader}>
      <div className={styles.container}>
        <div className={styles.linkContainer}>

          <RouterLink
            to="/"
            extraClass="mr-2"
            iconPrimary={<BurgerIcon key="1" type="primary" />}
            iconSecondary={<BurgerIcon key="1" type="secondary" />}
          >
            <span key="2" className={defaultStyle}>Конструктор</span>
          </RouterLink>

          <RouterLink
            to="order-feed"
            iconPrimary={<ListIcon key="1" type="primary" />}
            iconSecondary={<ListIcon key="1" type="secondary" />}
          >
            <span key="2" className={defaultStyle}>Лента заказов</span>
          </RouterLink>
        </div>

        <div className={styles.logo} onClick={() => navigate("/")}>
          <Logo />
        </div>

        <RouterLink
          to="profile"
          extraClass={styles.icon}
          iconPrimary={<ProfileIcon key="1" type="primary" />}
          iconSecondary={<ProfileIcon key="1" type="secondary" />}
        >
          <span key="2" className={defaultStyle}>Личный кабинет</span>
        </RouterLink>
      </div>
    </nav>
  );
};

export default AppHeader;
