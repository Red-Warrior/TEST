import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from "../../services/ingredients/actions";
import { getStoreIngredients } from "../../services/ingredients/selectors";
import { getStoreIngredientsConstructor } from "../../services/current-ingredient/selectors";

import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import Modal from "../../components/modal/modal";
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";
import OrderDetails from "../../components/modal/components/order-details/order-details";
import Spinner from "../../components/spinner/spinner";
import styles from "./constructor.module.css";
import modalStyles from "../../components/modal/modal.module.css";

const BurgerConstructorDashboard = () => {
  const dispatch = useDispatch();

  const {ingredients, ingredientsRequest, ingredientsFailed} = useSelector(getStoreIngredients);
  const {modalType, modalIsOpen} = useSelector(getStoreIngredientsConstructor);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch]
  );

  return (
    <>
      {
        ingredientsRequest && (
          <div className={styles.loading}>
            <div className="text text_type_main-large text_color_inactive pb-6">Загрузка...</div>
            <Spinner />
          </div>)
      }
      {ingredientsFailed && 'Произошла ошибка'}
      {
        !ingredientsRequest &&
        !ingredientsFailed &&
        ingredients && ingredients.length && (
          <main className={styles.container}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>)
      }
      {
        modalIsOpen && modalType === "ingredientDetails" ? (
            <Modal
              extraClass={modalStyles.ingredient}
              title="Детали ингредиента"
            >
              <IngredientDetails />
            </Modal>)
          :
          modalIsOpen && modalType === "orderDetails" ?
            (
              <Modal
                extraClass={modalStyles.order}
              >
                <OrderDetails />
              </Modal>)
            :
            null
      }
    </>
  );
}

export default BurgerConstructorDashboard;
