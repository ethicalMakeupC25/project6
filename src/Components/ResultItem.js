import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ResultItem extends Component {
  constructor() {
    super();

    this.state = {
    }
  }


  render() {
    return (
      <div className={`result ${this.props.activeID === this.props.product.id && "selected"}`} key={this.props.product.id}>
        <div className="productImage">
          <img onClick={(e) => this.props.setActiveID(e, this.props.product.id)} src={this.props.product.api_featured_image} alt={this.props.product.name} />
          <div className="productTextContainer">
            <div className="productText">
              <h3 className="visuallyHidden">{this.props.product.name}</h3>
              <p>Brand: {this.props.product.brand}</p>
              <p>Price: {
                this.props.product.price === "0.0" ? "Not Available" : parseInt(this.props.product.price).toFixed(2)
              }</p>
              <p>Rating: {!this.props.product.rating ? "Not Rated" : `${this.props.product.rating}/5`}</p>
            </div>
          </div>
          <Link to={`/products/${this.props.product.id}`}>Reviews</Link>
        </div>
      </div>
    );
  }
}

export default ResultItem;