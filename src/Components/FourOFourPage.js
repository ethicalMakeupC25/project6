// a couple of functions from the React library
import React, { Component } from 'react';
import { Redirect } from "react-router-dom"; 


class FourOFourPage extends Component{
    render(){
        return (
            <div className="App">
                <Redirect to = "/" />
            </div>
        );
    }
}

export default FourOFourPage;