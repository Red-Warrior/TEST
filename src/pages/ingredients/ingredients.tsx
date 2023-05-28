import React from 'react';
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";
import styles from "../../components/modal/modal.module.css"

const IngredientsPage = () => {
  return (
    <div className="mt-10">
      <h2 className={styles.titleIngredientPage}>Детали ингредиента</h2>
      <IngredientDetails />
    </div>
  );
};

export default IngredientsPage;
