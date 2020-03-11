import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <div id="global">

                <div id="top" className="mask">
                    <div className="plane"></div>
                </div>
                <div id="middle" className="mask">
                    <div className="plane"></div>
                </div>

                <div id="bottom" className ="mask">
                    <div className="plane"></div>
                </div>

                <p>LOADING...</p>

            </div>
        </div>
    )
}

export default Preloader;