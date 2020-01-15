import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.0
};

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 5,
    purchaseable: false,
    purchasing: false,
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients).map((key => {
      return ingredients[key]
    })).reduce((sum, element) => sum + element, 0);
    this.setState({ purchaseable: sum > 0 });
  }

  addIngred = (type) => {
    const updatedNumber = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedNumber;
    const priceAdded = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceAdded;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngred = (type) => {
    if (this.state.ingredients[type] <= 0) {
      return;
    }
    const updatedNumber = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedNumber;
    const priceAdded = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceAdded;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  purchase = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancel = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinue = () => {
    alert('You continue purchasing!');
  }

  render() {
    const disabled = {
      ...this.state.ingredients
    };
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }
    // {salad: true, meat: true}...
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          <OrderSummary ingredients={this.state.ingredients} purchaseCancel={this.purchaseCancel} purchaseContinue={this.purchaseContinue} totalPrice={this.state.totalPrice} />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addIngred={this.addIngred}
          removeIngred={this.removeIngred}
          disabled={disabled}
          totalPrice={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          ordered={this.purchase}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;