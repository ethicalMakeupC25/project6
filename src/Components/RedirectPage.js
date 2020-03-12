import React, { Component } from "react";

export class RedirectPage extends Component {
    constructor(props) {
        super();
        this.state = "https://ethicalmakeupc25.github.io/project6/";
    }
    componentWillMount() {
        window.location = this.state.route.loc;
    }
    render() {
        return <section>Redirecting...</section>;
    }
}

export default RedirectPage;
