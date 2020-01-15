import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  // make sure all the ingredients will be returned with the related amount
  let ingredients = Object.keys(props.ingredients).map(key => {
    return [...Array(props.ingredients[key])].map((_, i) => {
      return <BurgerIngredient key={key + i} type={key} />
    });
  }).reduce((arr, element) => {
    // concat the array of array to a single
    return arr.concat(element);
  }, []);

  if (ingredients.length === 0) {
    ingredients = <p> Please add your ingredients! </p>
  }

  // console.log(ingredients);

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

