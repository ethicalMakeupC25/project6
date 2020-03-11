import React from 'react';

const Preloader = () => {
    return (
        <div className="preloader">
            <div id="global">

                <div id="top" class="mask">
                    <div class="plane"></div>
                </div>
                <div id="middle" class="mask">
                    <div class="plane"></div>
                </div>

                <div id="bottom" class="mask">
                    <div class="plane"></div>
                </div>

                <p>LOADING...</p>

            </div>
        </div>
    )
}

export default Preloader;