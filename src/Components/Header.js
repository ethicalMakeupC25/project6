import React, { Fragment, Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isUp: false,
        }
    }

    render() {
        return (
            <header>
                <nav className="wrapper">
                    <h1>Ethical Makeup</h1>
                    {
                        //null is falsy .: if props.user is null, show login
                        //if props.user is truthy, show additional features and logout
                        this.props.user
                        ?
                            <Fragment>
                                <div className="userDetails">
                                    {/* if no displayname exists, show email */}
                                    <p>Hi {this.props.user.displayName || this.props.user.email}!</p>
                                    <div className="buttonContainer">
                                        <button>wishlist</button>
                                        <button>your reviews</button>
                                        <button onClick={this.props.logout}>log out</button>
                                    </div>
                                </div>
                                <div className="mobileUserDetails">
                                    <div className="wrapper">
                                        <div className="display">
                                            {/* if no displayname exists, show email */}
                                            <p>Hi {this.props.user.displayName || this.props.user.email}!</p>
                                            <FontAwesomeIcon icon={faChevronUp} />
                                            {/* change this icon to something more like a list */}
                                        </div>
                                        <div className="buttonContainer">
                                            <button>wishlist</button>
                                            <button>your reviews</button>
                                            <button onClick={this.props.logout}>log out</button>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        :
                            <button onClick={this.props.login}>log in to save to wishlist</button>
                    }
                </nav>
            </header>
        )
    }
}

export default Header;