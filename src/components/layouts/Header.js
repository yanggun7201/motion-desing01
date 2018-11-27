import React, { Component } from "react";
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <nav className="navbar navbar-dark bg-dark mb-4">
                <div className="logo">
                    <a className="navbar-brand" href="/">
                        <img src="https://motiondesign.nz/wp-content/themes/MD/img/logo@2x.png" alt="Logo" />
                    </a>
                </div>
                <div>
                    <span>Lucas Lee</span>
                    <img src="/img/icons8-contacts-32.png" alt="Avatar" />
                </div>
            </nav>
        );
    }
}

export default Navbar;
