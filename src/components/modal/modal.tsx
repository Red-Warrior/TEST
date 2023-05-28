import React, { memo, useEffect, FC, PropsWithChildren } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CLOSE_MODAL,
  DELETE_MODAL_TYPE,
  DELETE_SELECTED_INGREDIENT,
} from "../../services/current-ingredient/actions";
import { DELETE_ORDER_NUMBER, REMOVE_ALL_STUFFING } from "../../services/burger-constructor/actions";
import { RESET_INGREDIENTS_COUNTER } from "../../services/ingredients/actions";

import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./components/modal-overlay/modal-overlay";
import styles from "./modal.module.css";
import { getStoreIngredientsConstructor } from "../../services/current-ingredient/selectors";
import { useNavigate } from "react-router-dom";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface IModalProps {
  title?: string;
  extraClass: string;
}

const Modal: FC<PropsWithChildren<IModalProps>> = memo(({ children, title = "", extraClass }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { modalType } = useSelector(getStoreIngredientsConstructor);

  const handleCloseModal = () => {
    if (modalType) {
      dispatch({ type: CLOSE_MODAL });
      dispatch({ type: DELETE_MODAL_TYPE });

      dispatch({ type: REMOVE_ALL_STUFFING });
      dispatch({ type: RESET_INGREDIENTS_COUNTER });
      dispatch({ type: DELETE_ORDER_NUMBER });
    }

    dispatch({ type: DELETE_SELECTED_INGREDIENT });
    navigate(-1);
  };

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyHandler)
    return () => {
      document.removeEventListener("keydown", keyHandler)
    }
    // eslint-disable-next-line
  }, []);

  return createPortal(
    (
      <>
        <aside className={`${styles.modal} ${extraClass} pt-10`}>
          <div className={styles.title}>
            <h2 className="text text_type_main-large">
              {title}
            </h2>
            <div className={styles.closeIcon}>
              <CloseIcon onClick={handleCloseModal} type="primary" />
            </div>
          </div>
          {children}
        </aside>
        <ModalOverlay handleCloseModal={handleCloseModal} />
      </>
    ),
    modalRoot
  );
});

export default Modal;
