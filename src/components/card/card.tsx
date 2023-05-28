import React, { FC, memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getStoreIngredients } from "../../services/ingredients/selectors";
import { getChosenIngredients } from "../../services/burger-constructor/selectors";
import { SET_SELECTED_INGREDIENT } from "../../services/current-ingredient/actions";

import { useDrag } from 'react-dnd';
import { useLocation, useNavigate } from "react-router-dom";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./card.module.css";

import { IIngredient } from '../../types/ingredient.js';

interface ICardProps {
  ingredient: IIngredient;
}

const Card: FC<ICardProps> = memo(({ ingredient }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const ingredientCount = useSelector(getStoreIngredients).ingredientsCounter[ingredient.name];
  const hasBun = useSelector(getChosenIngredients).bun?.name;

  const [{opacity}, dragRef] = useDrag({
    type: ingredient.type === "bun" ? "bun" : "stuffing",
    item: ingredient,
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleOpenModal = (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    dispatch({type: SET_SELECTED_INGREDIENT, payload: ingredient});
    navigate(`ingredients/${ingredient._id}`, {state: {background: location}});
  };

  return (
    <div
      ref={dragRef}
      className={styles.card}
      onClick={(e) => handleOpenModal(e)}>
      <img
        style={{opacity}}
        width="240"
        height="120"
        src={ingredient.image}
        alt={ingredient.name} />
      <div className={`${styles.price} mt-1 mb-2`}>
        <span className="text text_type_digits-default mr-2">{ingredient.price}</span>
        <CurrencyIcon type="primary" />
      </div>
      <div className={`text text_type_main-default ${styles.text}`}>{ingredient.name}</div>
      {
        (hasBun && ingredient.name === hasBun) ?
          <Counter count={2} size="default" />
          :
          (ingredient.type !== "bun" && ingredientCount > 0) ?
            <Counter count={ingredientCount} size="default" />
            :
            null
      }
    </div>
  );
});

export default Card;
