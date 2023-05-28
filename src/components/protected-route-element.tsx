import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getUserData } from "../services/user/selectors";
import { getUserRequest } from "../services/user/actions";
import { getCookie } from "../utils/cookie";

interface IProtectedRouteElementProps {
  element: JSX.Element;
}

const ProtectedRouteElement = ({ element }: IProtectedRouteElementProps) => {
  const { userName, userRequest, userRequestStatus } = useSelector(getUserData);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!getCookie('token')) return;

    if (!userName && !userRequest) {
      // TODO
      // @ts-ignore
      dispatch(getUserRequest());
    }
  }, [dispatch, userName, userRequest]);

  if (userName) {
    return element;
  }

  if (!userName && !userRequest && !userRequestStatus) {
    console.log(`Для доступа к ${location.pathname} необходимо авторизоваться!`);
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};

export default ProtectedRouteElement;
