import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class ResultItem extends Component {
  constructor() {
    super();

    this.state = {
      maxLength: 250
    }
  }


  render() {
    return (
      <div className={`result ${this.props.activeID === this.props.product.id && "selected"}`} key={this.props.product.id}>
        <div className="productImage">
          <img onClick={(e) => this.props.setActiveID(e, this.props.product.id)} src={this.props.product.api_featured_image} alt={this.props.product.name} />
          <div className="productTextContainer">
            <div className="productText">
              <h2 className="visuallyHidden">{this.props.product.name}</h2>
              <p>Brand: {this.props.product.brand}</p>
              <p>Price: {
                this.props.product.price === "0.0" ? "Not Available" : parseInt(this.props.product.price).toFixed(2)
              }</p>
              <p>Rating: {!this.props.product.rating ? "Not Rated" : `${this.props.product.rating}/5`}</p>
            </div>
          </div>
          <Link className="reviewLink" to={`/products/${this.props.product.id}`}>Reviews</Link>
        </div>
        {this.props.activeID === this.props.product.id && 
          <div className="productInfo">
            <h2>{this.props.product.name}</h2>
            <p>{this.props.product.description.length > this.state.maxLength ?
            <Fragment>
              {`${this.props.product.description.substring(0, this.state.maxLength)}... `}
              <span className="infoLink"><a href={this.props.product.product_link} target="_blank">Product Page</a></span>
            </Fragment>
            : <Fragment>
              {this.props.product.description}
              <span className="infoLink"><a href={this.props.product.product_link}>Product Page</a></span>
            </Fragment>}</p>
            <h3>Colors:</h3>
            <div className="productColors">
              {this.props.product.product_colors.length === 0 ? <p>No colors available.</p> : 
              this.props.product.product_colors.map((color) => {
                return(
                  <span aria-label={color.colour_name} style={{background: color.hex_value}} title={color.colour_name}></span>
                )
              })}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default ResultItem;