import React, { Component } from 'react';


class FilterResults extends Component {
    constructor() {
        super()
        this.state = {
            refineArray: [],
        }
    }

    filterSelection = (e) => {
        const set = new Set(this.state.refineArray);
        e.target.checked ? set.add(e.target.name) : set.delete(e.target.name);
        this.setState({ refineArray: [...set] },this.updateRefinedItemsMain);
        
    }

    updateRefinedItemsMain = (e) => {
        this.props.updaterefinedItems(e, this.state.refineArray)
    }

    render() {
        return (
            <div className='filterOptions'>
                <p>Filter results</p>
                <fieldset>
                    <div>
                        <input type="checkbox" id="Canadian" name='Canadian' onChange={this.filterSelection} />
                        <label htmlFor="Canadian"> Canadian</label>
                    </div>
                    <div>
                        <input type="checkbox" id="CertClean" name='CertClean' onChange={this.filterSelection} />
                        <label htmlFor="CertClean"> Cert Clean</label>
                    </div>
                    <div>
                        <input type="checkbox" id="chemicalFree" name='Chemical Free' onChange={this.filterSelection} />
                        <label htmlFor="chemicalFree"> Chemical Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="dairyFree" name='Dairy Free' onChange={this.filterSelection} />
                        <label htmlFor="dairyFree"> Dairy Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="ewgVerified" name='EWG Verified' onChange={this.filterSelection} />
                        <label htmlFor="ewgVerified"> EWG Verified</label>
                    </div>
                    <div>
                        <input type="checkbox" id="ecoCert" name='EcoCert' onChange={this.filterSelection} />
                        <label htmlFor="ecoCert"> Eco Cert</label>
                    </div>
                    <div>
                        <input type="checkbox" id="fairTrade" name='Fair Trade' onChange={this.filterSelection} />
                        <label htmlFor="fairTrade"> Fair Trade</label>
                    </div>
                    <div>
                        <input type="checkbox" id="glutenFree" name='Gluten Free' onChange={this.filterSelection} />
                        <label htmlFor="glutenFree"> Gluten Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="hypoallergenic" name='Hypoallergenic' onChange={this.filterSelection} />
                        <label htmlFor="hypoallergenic"> Hypoallergenic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="natural" name='Natural' onChange={this.filterSelection} />
                        <label htmlFor="natural"> Natural</label>
                    </div>
                    <div>
                        <input type="checkbox" id="nonGmo" name='Non-GMO' onChange={this.filterSelection} />
                        <label htmlFor="nonGmo"> Non-GMO</label>
                    </div>
                    <div>
                        <input type="checkbox" id="organic" name='Organic' onChange={this.filterSelection} />
                        <label htmlFor="organic"> Organic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="peanutFreeProduct" name='Peanut Free Product' onChange={this.filterSelection} />
                        <label htmlFor="peanutFreeProduct"> Peanut Free Product</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sugarFree" name='Sugar Free' onChange={this.filterSelection} />
                        <label htmlFor="sugarFree"> Sugar Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="usdaOrganic" name='USDA Organic' onChange={this.filterSelection} />
                        <label htmlFor="usdaOrganic"> USDA Organic</label>
                    </div>
                    <div>
                        <input type="checkbox" id="alcoholFree" name='alcohol free' onChange={this.filterSelection} />
                        <label htmlFor="alcoholFree"> Alcohol Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="oilFree" name='oil free' onChange={this.filterSelection} />
                        <label htmlFor="oilFree"> Oil Free</label>
                    </div>
                    <div>
                        <input type="checkbox" id="waterFree" name='water free' onChange={this.filterSelection} />
                        <label htmlFor="waterFree"> Water Free</label>
                    </div>
                </fieldset>
            </div>
        )
    }
}

export default FilterResults 