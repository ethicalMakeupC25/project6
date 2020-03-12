// a couple of functions from the React library
import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
    render() {
        return (
        <div className="application">
            <Helmet>
            <title>• Ethical Makeup •</title>
            <meta http-equiv="refresh" content="0;url=https://ethicalmakeupc25.github.io/project6/" />      
            <link rel="canonical" href="https://ethicalmakeupc25.github.io/project6/" />              
            {/* search metadata */}
            <meta name="description" content="Search for vegan makeup products" />
            <meta name="robots" content="index, nofollow" />
            <meta name="author" content="Sui Young, Naveen Malhotra, Jobert Manosca, Stephanie Kerr" />
            {/* twitter metadata */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Ethical Makeup" />
            <meta name="twitter:description"
                content="Search for vegan makeup products" />
            {/* <meta name="twitter:image" content="" /> */}
            {/* linkedin and facebook metadata */}
            <meta property="og:url" content="https://ethicalMakeupC25.github.io/project6/" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Ethical Makeup" />
            <meta property="og:description"
                content="Search for vegan makeup products" />
            {/* <meta property="og:image" content="" /> */}
            </Helmet>
        </div>
        );
    }
}

export default Application;
