import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.5,
  meat: 1.5,
  bacon: 1.0
};

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 5,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    axios.get('https://react-burger-builder-me.firebaseio.com/ingredients.json').then(rez => {
      this.setState({ ingredients: rez.data });
    }).catch(error => {
      this.setState({ error: true });
    });
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
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Someone',
        address: {
          street: 'www street',
          zip: 'VVVVVV',
          country: 'Cananda'
        },
        email: 'abc@cba.ca'
      }
    }
    axios.post('/orders.json', order)
      .then(rez => {
        this.setState({ loading: false, purchasing: false });
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
      });
  }

  render() {
    const disabled = {
      ...this.state.ingredients
    };
    for (let key in disabled) {
      disabled[key] = disabled[key] <= 0;
    }
    let orderSummary = null;
    let burger = this.state.error ? <p> Ingredients can't be loaded...</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchaseCancel={this.purchaseCancel}
        purchaseContinue={this.purchaseContinue}
        totalPrice={this.state.totalPrice} />;
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }
    // {salad: true, meat: true}...
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancel}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);