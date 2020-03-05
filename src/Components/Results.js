import React, { Component } from 'react';

class Results extends Component {
  constructor() {
    super();

    this.state = {
      
    }
  }
  render() {
      return (
          <section className="results">
            {this.props.filteredResults.map(product => {
              return(
                <div key={product.id}>
                  <div className="productImage">
                    <img src={product.api_featured_image} alt={product.name}/>
                  </div>
                </div>
              );
            })}
          </section>
      )
  }
}

export default Results;