import React from "react";
import "../sass/Header.sass";

// Stateless Component
const Header = (props) => {
    return (
        <li className="list__item">
            <h1 className="list__item__header">{props.headerText}</h1>
        </li>
    );
};

export default Header;