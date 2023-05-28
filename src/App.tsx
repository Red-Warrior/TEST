import { FC } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRouteElement from "./components/protected-route-element";
import {
  ConstructorPage,
  ForgotPasswordPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  IngredientsPage,
  ModalIngredientPage,
  LayoutPage
} from "./pages";

const App: FC = () => {
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<LayoutPage />}>
          <Route path="/" element={<ConstructorPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>

          <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />}></Route>

          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="ingredients/:id" element={<IngredientsPage />}></Route>
          <Route path="/forgot-password" element={<ForgotPasswordPage />}></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Route>
      </Routes>

      {
        background && (
          <Routes>
            <Route path="ingredients/:id" element={<ModalIngredientPage />}></Route>
          </Routes>)
      }
    </>
  )
};

export default App;
