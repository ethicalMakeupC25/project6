import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter as Router, Route, Link, useRouteMatch } from 'react-router-dom';

class ProductText extends Component {
  constructor() {
    super();

    this.state = {}
  }

  handleClick = () => {
    this.props.addToWishlist(this.props.product);
  }

  handleRemove = (e, id) => {
    this.props.removeFromWishlist(id);
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
        <Route path="/project6/products" >
          <button className="add" onClick={this.handleClick}><FontAwesomeIcon icon={faPlusCircle} /></button>
        </Route>
        <Route path="/project6/wishlist" >
          <button className="remove" onClick={(e) => {this.handleRemove(e, this.props.product.id)}}><FontAwesomeIcon icon={faMinusCircle} /></button>
        </Route>
      </div>
    );
  }
}

export default ProductText;