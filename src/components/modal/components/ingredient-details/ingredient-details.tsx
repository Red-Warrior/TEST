import React, { useMemo, useEffect, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { getIngredients } from "../../../../services/ingredients/actions";
import { getStoreIngredients } from "../../../../services/ingredients/selectors";

import { IIngredient } from '../../../../types/ingredient.js';

const IngredientDetails: FC = () => {
  const {ingredients} = useSelector(getStoreIngredients);
  const {id} = useParams();
  const dispatch = useDispatch();

  const currentIngredient = useMemo(() => {
    if (ingredients.length) {
      return ingredients.find((ingredient: IIngredient) => ingredient._id === id)
    }
    return undefined;
  }, [ingredients, id]);

  const property = useMemo(() => {
    if (currentIngredient) {
      return {
        "Калории,ккал": currentIngredient.calories,
        "Белки, г": currentIngredient.proteins,
        "Жиры, г": currentIngredient.fat,
        "Углеводы, г": currentIngredient.carbohydrates
      }
    }
    return undefined;
  }, [currentIngredient]);

  useEffect(
    () => {
      if (!ingredients.length) {
        // TODO
        // @ts-ignore
        dispatch(getIngredients());
      }
    },
    [dispatch, ingredients]
  );

  return (currentIngredient && property) && (
    <div className={styles.container}>
      <img src={currentIngredient.image_large} alt={`Изображение: ${currentIngredient.name}`} />
      <p className="text text_type_main-medium mt-4">
        {currentIngredient.name}
      </p>
      <ul className={`${styles.set} mt-8`}>
        {
          Object.keys(property).map(item =>
            <li key={item} className={styles.component}>
              <span className="text text_type_main-default text_color_inactive">{item}</span>
              <span className="text text_type_digits-default text_color_inactive">{property[item as keyof typeof property]}</span>
            </li>
          )
        }
      </ul>
    </div>)
};

export default IngredientDetails;
