import React, { FC, memo } from "react";
import PropTypes from "prop-types";
import ingredientsPropTypes from "../../utils/ingredientsPropTypes";
import Card from "../card/card";
import styles from "./category.module.css";

import { IIngredient } from '../../types/ingredient.js';

interface ICategoryProps {
title: string;
ingredients: IIngredient[];
extraClass: string;
}

const Category: FC<ICategoryProps> = memo(({title, ingredients, extraClass}) => {
  return (
    <section className={`mt-10 ${extraClass}`}>
      <h2 className={`${styles.title} text text_type_main-medium mb-6`}>{title}</h2>
      <div className={`${styles.list} pl-4 pr-4`}>
        {
          ingredients.map(item => <Card key={item._id} ingredient={item} />)
        }
      </div>
    </section>
  );
});

export default Category;

Category.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};
