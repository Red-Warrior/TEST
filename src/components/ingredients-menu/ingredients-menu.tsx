import React, { useState, memo, useEffect, FC } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './ingredients-menu.module.css';

import { ITitlesOfIngredientCategories } from '../../types/titles-of-ingredient-categories';
import { titlesOfIngredientCategories } from '../burger-ingredients/burger-ingredients';

interface IIngredientsMenuProps {
  titles: ITitlesOfIngredientCategories;
}

const IngredientsMenu: FC<IIngredientsMenuProps> = memo(({ titles }) => {
  const [current, setCurrent] = useState('bun');

  const addTabObserver = (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setCurrent(entry.target.classList[1]);
      }
    })
  }

  useEffect(() => {
    const ingredientCategories = Object.keys(titlesOfIngredientCategories).map((category: string) => {
      if (document.querySelector(`.${category}`)) {
        return document.querySelector(`.${category}`);
      }
      return undefined;
    }).filter(Boolean);

    const options = {
      root: document.querySelector(".custom-scroll"),
      threshold: 0.5
    }
    const observer = new IntersectionObserver(addTabObserver, options);
    if (ingredientCategories.length) {

      ingredientCategories.forEach((elem: Element | null | undefined): void =>
        elem ? observer.observe(elem) : undefined);
    }

    return () => {
      if (ingredientCategories.length) {

        ingredientCategories.forEach((elem: Element | null | undefined) =>
          elem ? observer.unobserve(elem) : undefined);
      }
    }
  }, []);

  return (
    <div className={styles.menu}>
      {
        Object.keys(titles).map((item: string) =>
          (<Tab key={item} value={item} active={current === item} onClick={setCurrent}>
            {titles[item as keyof typeof titles]}
          </Tab>)
        )
      }
    </div>
  )
});

export default IngredientsMenu;
