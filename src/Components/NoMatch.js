import React from 'react';
import { useLocation } from 'react-router-dom';

const NoMatch = () => {
    let location = useLocation();

    return (
        <p>ahhhhh {location.pathname} DOES NOT FUCKING EXIST</p>
    )
}

export default NoMatch;