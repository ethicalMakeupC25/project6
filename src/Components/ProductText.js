import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class ProductText extends Component {
  constructor() {
    super();

    this.state = {}
  }

  handleClick = () => {
    this.props.addToWishlist(this.props.product);
  }

  render() {
    return (
      <div className="productTextContainer">
        <div className="productText">
          <h2 className="visuallyHidden">{this.props.product.name}</h2>
          <p>Brand: {!this.props.product.brand ? "Not available" : this.props.product.brand}</p>
          <p>Price: {
            this.props.product.price === "0.0" ? "Not available" : `${this.props.product.price_sign ? this.props.product.price_sign : '$'}${parseInt(this.props.product.price).toFixed(2)} ${this.props.product.currency ? this.props.product.currency : ''}`
          }</p>
          <p>Rating: {!this.props.product.rating ? "Not yet rated" : `${this.props.product.rating}/5`}</p>
        </div>
        <button className="add" onClick={this.handleClick}><FontAwesomeIcon icon={faPlusCircle} /></button>
      </div>
    );
  }
}

export default ProductText;