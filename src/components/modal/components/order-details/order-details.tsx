import React, { FC } from "react";
import { useSelector } from "react-redux";
import icon from "../../../../images/done.png";
import styles from "./order-details.module.css";
import { getChosenIngredients } from "../../../../services/burger-constructor/selectors";

const OrderDetails: FC = () => {
  const { orderNumber } = useSelector(getChosenIngredients);

  return (
    <div className={styles.order}>
      <h2 className="text text_type_digits-large mt-4 mb-8">
        {orderNumber}
      </h2>
      <p className="text text_type_main-medium mb-15">
        идентификатор заказа
      </p>
      <img src={icon} alt="Иконка обозначающая, что заказ принят" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
