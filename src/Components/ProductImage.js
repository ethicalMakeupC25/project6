import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, useRouteMatch } from 'react-router-dom';
import ProductText from './ProductText';

const ReviewLink = (props) => {
  let match = useRouteMatch({
    path: props.to,
    exact: props.activateOnlyWhenExact
  });

  return(
    <div className={match ? "hide" : ""}>
      <Link className="reviewLink" onClick={(e) => props.setActiveID(e, props.product.id)} to={props.to}>{props.label}</Link>
    </div>
  )
}

class ProductImage extends Component {
  constructor() {
    super();

    this.state = {}
  }

  render() {
    return (
      <div className="productImage">
        <Link to={`/project6/products/${this.props.product.id}`}>
          <img onClick={(e) => this.props.setActiveID(e, this.props.product.id)} src={this.props.product.api_featured_image} alt={this.props.product.name} />
        </Link>
        <ProductText product={this.props.product} addToWishlist={this.props.addToWishlist}/>
        <ReviewLink activateOnlyWhenExact={true} setActiveID={this.props.setActiveID} product={this.props.product} to={`/project6/products/${this.props.product.id}/review`} label="Reviews"/>
      </div>
    );
  }
}

export default ProductImage;