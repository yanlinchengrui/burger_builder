import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const ingredients = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
    {ingredients.map(ingredient => (
      <BuildControl
        key={ingredient.label}
        label={ingredient.label}
        addIngred={() => props.addIngred(ingredient.type)}
        removeIngred={() => props.removeIngred(ingredient.type)}
        disabled={props.disabled[ingredient.type]}
      />
    ))}
    <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>
      ORDER NOW!
    </button>
  </div>
);

export default buildControls;