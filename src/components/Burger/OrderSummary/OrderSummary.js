import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

  // componentWillUpdate() {
  //   console.log('OrderSummary Will Update');
  // }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map(key => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}> {key} </span> : {this.props.ingredients[key]}
        </li>);
    });
    return (
      <Aux>
        <h3> Your Order </h3>
        <p> A burger with the following ingredients: </p>
        {ingredients}
        <p> <strong> Total Price: {this.props.totalPrice.toFixed(2)} </strong> </p>
        <p> Checkout? </p>
        <Button btnType='Danger' clicked={this.props.purchaseCancel} > CANCEL </Button>
        <Button btnType='Success' clicked={this.props.purchaseContinue} > CONTINUE </Button>
      </Aux>
    );
  }

};

export default OrderSummary;