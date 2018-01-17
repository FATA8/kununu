import React from "react";
import "../sass/Header.sass";

// Stateless Component
const Header = (props) => {
    return (
        <li className="item">
            <h1>{props.homeLink}</h1>
        </li>
    );
};

export default Header;