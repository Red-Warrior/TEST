import React from 'react';
import Modal from "../../components/modal/modal";
import modalStyles from "../../components/modal/modal.module.css";
import IngredientDetails from "../../components/modal/components/ingredient-details/ingredient-details";

const ModalIngredientPage = () => {
  return (
    <Modal
      extraClass={modalStyles.ingredient}
      title="Детали ингредиента"
    >
      <IngredientDetails />
    </Modal>)
};

export default ModalIngredientPage;
