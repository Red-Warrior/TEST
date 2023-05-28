import React, { FC, useRef } from 'react';
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./constructor-ingredient.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getChosenIngredients } from "../../../../services/burger-constructor/selectors";
import {
  DELETE_STUFFING_INGREDIENT,
  REPLACE_WITH_SORTED_STUFFING
} from "../../../../services/burger-constructor/actions";
import { DECREASE_INGREDIENTS_COUNT } from "../../../../services/ingredients/actions";
import { IAddedIngredient } from '../../../../types/ingredient.js';
import { Identifier } from 'dnd-core';

interface IConstructorIngredientProps {
  item: IAddedIngredient;
  index: number;
  sortId: string;
}

const ConstructorIngredient: FC<IConstructorIngredientProps> = ({ item, index, sortId }) => {
  const dispatch = useDispatch();

  const stuffing = useSelector(getChosenIngredients).stuffing;
  const ref = useRef<HTMLDivElement>(null)

  const deleteIngredient = (item: IAddedIngredient) => {
    dispatch({ type: DELETE_STUFFING_INGREDIENT, payload: item.sortId });
    dispatch({ type: DECREASE_INGREDIENTS_COUNT, payload: item.name })
  }

  const [{ handlerId }, dropRef] = useDrop<IAddedIngredient, unknown, { handlerId: Identifier | null }>({
    accept: "stuffing",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },

    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset() || {y:0};

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      const sortedStuffingOrder = [...stuffing];
      const draggedElem = sortedStuffingOrder.splice(dragIndex, 1);
      sortedStuffingOrder.splice(hoverIndex, 0, draggedElem[0]);

      if (stuffing.find((stuff: IAddedIngredient) => stuff.sortId === item.sortId)) {
        dispatch({
          type: REPLACE_WITH_SORTED_STUFFING, payload: sortedStuffingOrder
        })
      }
      item.index = hoverIndex
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "stuffing",
    item: () => {
      return { sortId, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(dropRef(ref))

  return (
    <div
      ref={ref}
      style={{ opacity: opacity }}
      className={`${styles.element} ${item.type !== "bun" ? styles.draggable : ""}`}
      data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item?.image_mobile}
        extraClass="ml-2"
        handleClose={() => deleteIngredient(item)}
      />
    </div>
  );
};

export default ConstructorIngredient;
