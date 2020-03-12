import React, { Component } from "react";
import FourOFourPage from './FourOFourPage';
import {BrowserRouter as Route, Router, Switch} from 'react-router-dom';

class RedirectPage extends Component {
    render(){
        return(
            <div>
                <section>Redirecting...</section>;
                <Router>
                    <Switch>
                        <Route component = {FourOFourPage} />
                    </Switch>
                </Router>
            </div>
        ) 
    }
}


export default RedirectPage;
