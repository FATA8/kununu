import React from "react";
import "../css/Header.sass";

// Stateless Component
const Header = (props) => {
    return (
        <h1>{props.homeLink}</h1>
    );
};

export default Header;