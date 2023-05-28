import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import { logoutUserRequest, updateUserRequest } from "../../services/user/actions";
import { NavLink } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./profile.module.css"
import linkStyles from "../../components/app-header/components/router-link/router-link.module.css"

const fieldsChecklist = {
  name: "isNameEditable",
  email: "isLoginEditable",
  password: "isPasswordEditable"
};

interface IFieldsEditable {
  isNameEditable: boolean;
  isLoginEditable: boolean;
  isPasswordEditable: boolean;
}

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { userName, userEmail } = useSelector(getUserData);

  const [userData, setUserData] = useState({
    name: userName,
    email: userEmail,
    password: "*****"
  });


  const [isFieldsEditable, setFieldsEditable] = useState<IFieldsEditable>({
    isNameEditable: false,
    isLoginEditable: false,
    isPasswordEditable: false
  });

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    setUserData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const setEditableField = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const target = e.currentTarget.parentNode?.childNodes[1] as HTMLInputElement;

    setFieldsEditable((prevState) => ({
      ...prevState,
      [fieldsChecklist[target.name as keyof typeof fieldsChecklist]]: !prevState[fieldsChecklist[target.name]],
    }));
    setTimeout(() => target.focus());
  }

  const canselEdit = () => {
    setFieldsEditable({
      isNameEditable: false,
      isLoginEditable: false,
      isPasswordEditable: false
    })
  }

  const resetFields = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    setUserData({
      name: userName,
      email: userEmail,
      password: "*****"
    });
    canselEdit();
  };

  const editUserRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData.password === "*****") {
      return alert("Введите ваш старый или новый пароль");
    }
    // TODO
    // @ts-ignore
    dispatch(updateUserRequest(userData));
  };

  const logout = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    // TODO
    // @ts-ignore
    dispatch(logoutUserRequest());
  };

  useEffect(() => {
    if (isFieldsEditable.isNameEditable) nameRef.current.focus();
    if (isFieldsEditable.isLoginEditable) emailRef.current?.focus();
    if (isFieldsEditable.isPasswordEditable) passwordRef.current?.focus();
  }, [isFieldsEditable]);

  const previousNameOfUser = useRef(userName);
  useEffect(() => {
    if (userName && userName !== previousNameOfUser.current) {
      canselEdit();
    }
  }, [userName]);


  const linkTextStyle = "text text_type_main-medium text_color_inactive"
  const { isNameEditable, isLoginEditable, isPasswordEditable } = isFieldsEditable;

  return (
    <main className={`${styles.profile} mt-30`}>
      <nav className={styles.navBar}>
        <NavLink to="/profile" className={({ isActive }) =>
          `${styles.navItem} ${linkTextStyle} ${linkStyles.active}`}
        >
          Профиль
        </NavLink>
        <NavLink to="orders" className={({ isActive }) =>
          `${styles.navItem} ${linkTextStyle}`}
        >
          История заказов
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.navItem} ${linkTextStyle}`}
          onClick={(e) => logout(e)}
        >
          Выход
        </NavLink>
        <p className={`${styles.annotation} text text_type_main-default text_color_inactive mt-20`}>
          В этом разделе вы можете<br />изменить свои персональные данные
        </p>
      </nav>
      <form
        className={styles.fieldsContainer}
        onSubmit={(e) => editUserRequest(e)}
      >
        <Input
          ref={nameRef}
          extraClass="stellarInput"
          type="text"
          name="name"
          value={userData.name}
          placeholder="Имя"
          disabled={!isNameEditable}
          icon={isNameEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />
        <Input
          ref={emailRef}
          extraClass="stellarInput"
          type="email"
          name="email"
          value={userData.email}
          placeholder="Логин"
          disabled={!isLoginEditable}
          icon={isLoginEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />
        <Input
          ref={passwordRef}
          extraClass="stellarInput"
          type="password"
          name="password"
          value={userData.password}
          placeholder="Пароль"
          disabled={!isPasswordEditable}
          icon={isPasswordEditable ? "CloseIcon" : "EditIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={(e) => setEditableField(e)}
        />
        {
          (isNameEditable || isLoginEditable || isPasswordEditable) && (
            <div className={styles.dashboard}>
              <span
                className={`${styles.cancel} mr-6`}
                onClick={(e) => resetFields(e)}
              >
                Отмена
              </span>
              <Button
                type="primary"
                size="medium"
                htmlType="submit"
              >
                Сохранить
              </Button>
            </div>)
        }
      </form>
    </main>
  );
};

export default ProfilePage;
