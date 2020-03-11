import React, { Fragment, Component } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            isUp: false,
        }
    }

    handleClick = () => {
        this.setState({
            isUp: !this.state.isUp
        })
    }

    
    
    render() {
        const refreshPage = () => {
            window.location.reload(false);
        }
        return (
            <header>
                <nav className="wrapper">
                    <h1
                        onClick={refreshPage}
                    >Ethical Makeup</h1>
                    {
                        //null is falsy .: if props.user is null, show login
                        //if props.user is truthy, show additional features and logout
                        this.props.user
                        ?
                            <Fragment>
                                {console.log(this.props.user)}
                                <div className="userDetails">
                                    {/* if no displayname exists, show email */}
                                    <p>Hi {this.props.user.displayName || this.props.user.email}!</p>
                                    <div className="buttonContainer">
                                        <NavLink
                                            exact
                                            to="/project6/"
                                            className="linkStyle"
                                            activeStyle={{display: "none"}}
                                            isActive={(_, { pathname }) => {
                                                const regex = /\/project6\/products.*$/gmi;
                                                return pathname === '/project6' || pathname === '/project6/' ? true : regex.test(pathname);
                                            }}
                                        >search</NavLink>
                                        <NavLink to="/project6/wishlist" className="linkStyle" activeStyle={{display: "none"}}>wishlist</NavLink>
                                        <NavLink to="/project6/reviews" className="linkStyle" activeStyle={{display: "none"}}>your reviews</NavLink>
                                        <button className="navButton" onClick={this.props.logout}>log out</button>
                                    </div>
                                </div>
                                <div className="mobileUserDetails">
                                    <div className="wrapper">
                                        <div className="display">
                                            {/* if no displayname exists, show email */}
                                            <p>Hi {this.props.user.displayName || this.props.user.email}!</p>
                                            <FontAwesomeIcon icon={this.state.isUp ? faChevronCircleDown : faListAlt} className="toggleMenu" tabIndex="0" aria-label="open and close user menu" onClick={this.handleClick} />
                                        </div>
                                        {
                                            this.state.isUp
                                                ?
                                                <div className="buttonContainer">
                                                    <NavLink
                                                        exact
                                                        to="/project6/"
                                                        className="linkStyle"
                                                        activeStyle={{display: "none"}}
                                                        isActive={(_, { pathname }) => {
                                                            const regex = /\/project6\/products.*$/gmi;
                                                            return pathname === '/project6' || pathname === '/project6/' ? true : regex.test(pathname);
                                                        }}
                                                    >search</NavLink>
                                                    <NavLink to="/project6/wishlist" className="linkStyle" activeStyle={{display: "none"}}>wishlist</NavLink>
                                                    <NavLink to="/project6/reviews" className="linkStyle" activeStyle={{display: "none"}}>your reviews</NavLink>
                                                    <button className="navButton" onClick={this.props.logout}>log out</button>
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            </Fragment>
                        :
                            <button 
                                onClick={this.props.login}
                                className="logInButton navButton">log in to save to wishlist</button>
                    }
                </nav>
            </header>
        )
    }
}

export default Header;