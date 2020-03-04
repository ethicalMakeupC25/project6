import React from 'react';
import ReactDOM from 'react-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Helmet = (
    <HelmetProvider>
        <App>
        <Helmet>
            <title>Hello World</title>
            <link rel="canonical" href="https://www.tacobell.com/" />
        </Helmet>
        <h1>Hello World</h1>
        </App>
    </HelmetProvider>
    );

    ReactDOM.hydrate(
    app,
    document.getElementById(‘Helmet’)
);