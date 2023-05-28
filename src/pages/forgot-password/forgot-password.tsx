import React, { useState, useEffect } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../services/user/selectors";
import {
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  restorePasswordRequest
} from "../../services/user/actions";
import { REQUESTED } from "../../services/user/constants";

const ResetPasswordPage = () => {
  const {
    userName,
    userForgotPasswordRequest,
    userResetPasswordStatus
  } = useSelector(getUserData);
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();

  const makePasswordForgetRequest = async (e) => {
    e.preventDefault();
    if (email) {
      dispatch(restorePasswordRequest({email}));
    } else {
      alert("Заполните поле email");
    }
  }

  useEffect(() => {
    return () => dispatch({type: FORGOT_PASSWORD_REQUEST_SUCCESS, payload: null});
  }, [dispatch]);

  const descriptionTextStyle = "text text_type_main-default text_color_inactive";
  const linkTextStyle = "text text_type_main-default ml-2";

  if (userName) {
    return <Navigate to="/" replace />
  }

  if (!userForgotPasswordRequest && userResetPasswordStatus === REQUESTED) {
    return <Navigate to="/reset-password" replace state={{from: location}} />
  }

  return (
    <main className="stellarContainer">
      <h2 className="text text_type_main-medium mb-6">Восстановление пароля</h2>
      <form onSubmit={(e) => makePasswordForgetRequest(e)}>
        <Input
          extraClass="stellarInput"
          type="email"
          value={email}
          placeholder="Укажите e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          extraClass="mb-20"
          type="primary"
          size="medium"
          htmlType="submit"
        >
          Восстановить
        </Button>
      </form>
      <p className="stellarTextContainer">
        <span className={descriptionTextStyle}
        >
          Вспомнили пароль?
        </span>
        <Link to="/login" className={`${linkTextStyle} stellarLink`}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default ResetPasswordPage;
