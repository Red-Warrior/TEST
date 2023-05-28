import React, { memo, useMemo, useState, useEffect, useRef, SyntheticEvent } from "react";
import { nanoid } from "nanoid";
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { getChosenIngredients } from "../../services/burger-constructor/selectors"
import { OPEN_MODAL, SET_MODAL_TYPE } from "../../services/current-ingredient/actions";
import { SET_STUFFING_INGREDIENT, SET_BUN, SET_ORDER_NUMBER } from "../../services/burger-constructor/actions";
import { INCREASE_INGREDIENTS_COUNT } from "../../services/ingredients/actions";
import { GET_ORDER_INGREDIENTS_FAILED } from "../../services/order/actions";
import { getUserData } from "../../services/user/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ConstructorElement,
  CurrencyIcon,
  Button
} from "@ya.praktikum/react-developer-burger-ui-components";
import DefaultConstructorElement from "./components/default-constructor-element/default-constructor-element";
import ConstructorIngredient from "./components/constructor-ingredient/constructor-ingredient";
import { postOrder } from "../../utils/api";
import styles from "./burger-constructor.module.css";
import { IIngredient, IAddedIngredient } from '../../types/ingredient.js';


const BurgerConstructor = memo(() => {
  const [isScroll, setIsScroll] = useState(false);
  const { userName } = useSelector(getUserData);
  const ingredients = useSelector(getChosenIngredients);
  const { bun, stuffing } = ingredients;

  const stuffingContainer = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const location = useLocation();

  const navigate = useNavigate();

  const isPrice = () => !!bun || !!stuffing.length;

  const chosenIngredientsId = () => {
    if (!bun) {
      return stuffing.map((item: IIngredient) => item._id);
    }
    if (!stuffing.length) {
      return bun._id;
    }
    return [bun, ...stuffing].map(item => item._id);
  };

  const totalPrice = useMemo(() => {
    if (!bun && !stuffing.length) {
      return 0;
    }

    let totalPrice = stuffing.reduce((acc: number, item: IIngredient) => acc + item?.price, 0);
    if (bun) {
      totalPrice += bun.price * 2;
    }
    return totalPrice;
  }, [bun, stuffing]);

  useEffect(() => {
    if (stuffingContainer.current && stuffingContainer.current?.clientHeight >= 464) {
      setIsScroll(true)
    }
  }, [setIsScroll]);

  const makeOrder = (e: SyntheticEvent<Element, Event>) => {
    console.log(e);
    e.preventDefault();

    if (!userName) {
      return navigate("/login", { state: { from: location } });
    }

    if (isPrice()) {
      postOrder(`${process.env.REACT_APP_BURGER_API_URL}/orders`, {
        method: "POST",
        body: JSON.stringify({ ingredients: chosenIngredientsId() }),
        headers: { "Content-type": "application/json; charset=UTF-8" }
      })
        .then(res => {
          dispatch({ type: SET_MODAL_TYPE, payload: "orderDetails" })
          dispatch({ type: SET_ORDER_NUMBER, payload: res.order.number });
          dispatch({ type: OPEN_MODAL });
        })
        .catch(e => {
          dispatch({ type: GET_ORDER_INGREDIENTS_FAILED });
          console.error(e);
        });
    } else {
      alert("Соберите бургер прежде чем оформлять заказ!");
    }
  }

  const [{ isOverCurrent }, dropTargetRefBun] = useDrop({
    accept: "bun",
    drop(item: IIngredient) {
      dispatch({ type: SET_BUN, payload: item })
      dispatch({ type: INCREASE_INGREDIENTS_COUNT, payload: item.name })
    },
    collect: monitor => ({
      isOverCurrent: monitor.isOver({ shallow: true }),
    })
  });

  const [{ isHover }, dropTargetRef] = useDrop({
    accept: "stuffing",
    drop(item: IIngredient | IAddedIngredient) {
      if (!("sortId" in item)) {
        dispatch({ type: SET_STUFFING_INGREDIENT, payload: { ...item, sortId: nanoid(10) } });
        dispatch({ type: INCREASE_INGREDIENTS_COUNT, payload: item.name });
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const bunStyle = `${styles.bun} ml-8`;

  return (
    <div className={`${styles.constructor} pt-25`}>
      <div ref={dropTargetRefBun} className={`${styles.ingredients} mb-10 ml-4`}>
        {
          !bun ?
            <DefaultConstructorElement
              extraClass={bunStyle}
              isHover={isOverCurrent}
              type="top"
              text="Выберите булочку" />
            :
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={bunStyle}
            />
        }
        <div ref={elem => {
          dropTargetRef(elem);
          stuffingContainer.current = elem;
        }} className={`${styles.list} ${isScroll ? styles.scroll : ""} custom-scroll pr-2`}>
          {
            !stuffing.length
              ?
              <DefaultConstructorElement extraClass={bunStyle} isHover={isHover} text="Выберите начинку" />
              :
              stuffing.map((item:IAddedIngredient, index:number) => <ConstructorIngredient
                key={item.sortId}
                item={item}
                index={index}
                sortId={item.sortId}
              />)
          }
        </div>
        {
          !bun ?
            <DefaultConstructorElement
              extraClass={bunStyle}
              isHover={isOverCurrent}
              type="bottom"
              text="Выберите булочку" />
            :
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image_mobile}
              extraClass={bunStyle}
            />
        }
      </div>
      <div className={`${styles.cost} mr-6`}>
        <span className="text text_type_digits-medium mr-2">{totalPrice}</span>
        <CurrencyIcon type="primary" />
        <Button
          extraClass="ml-10"
          type="primary"
          htmlType="submit"
          size="large"
          onClick={makeOrder}
        >
          Оформить заказ
        </Button>
      </div>
    </div>
  );
});

export default BurgerConstructor;
