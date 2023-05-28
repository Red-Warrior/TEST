import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUserRequest } from "../../services/user/actions";
import { getUserData } from "../../services/user/selectors";

const LoginPage = () => {
  const {userName} = useSelector(getUserData);
  const [userData, setUserData] = useState({email: "", password: ""});
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const dispatch = useDispatch();
  const location = useLocation();

  const handleChange = (e) => {
    const target = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const login = (e) => {
    e.preventDefault();
    if (userData.email && userData.password) {
      dispatch(loginUserRequest(userData));
    } else {
      console.warn("Проверьте, что поля: E-mail и Пароль заполнены");
    }
  }

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    if (location.state?.from) {
      return <Navigate to={location.state.from.pathname} replace />
    }
    return <Navigate to="/" replace />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Вход</h2>
      <form onSubmit={(e) => login(e)}>
        <Input
          extraClass="stellarInput"
          name="email"
          type="email"
          value={userData.email}
          placeholder="E-mail"
          onChange={(e) => handleChange(e)}
        />
        <Input
          extraClass="stellarInput"
          name="password"
          type={passwordVisibility}
          value={userData.password}
          placeholder="Пароль"
          icon={passwordVisibility === "password" ? "ShowIcon" : "HideIcon"}
          onChange={(e) => handleChange(e)}
          onIconClick={() => setPasswordVisibility((prevState) =>
            prevState === "password" ? "text" : "password"
          )}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Войти
        </Button>
      </form>
      <p className="stellarTextContainer mb-4">
        <span className={descriptionTextStyle}>
          Вы — новый пользователь?
        </span>
        <Link to="/register" className={`${linkTextStyle} stellarLink`}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="stellarTextContainer">
        <span className={descriptionTextStyle}>
          Забыли пароль?
        </span>
        <Link to="/forgot-password" className={`${linkTextStyle} stellarLink`}>
          Восстановить пароль
        </Link>
      </p>
    </main>
  );
};

export default LoginPage;
