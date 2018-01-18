import React from "react";
import PropTypes from "prop-types";

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

Header.propTypes = {
    headerText: PropTypes.string
};
