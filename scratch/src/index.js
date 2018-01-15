// http://localhost:8080/v1/autocomplete?q=berlin
// "webpack-dev-server --hot"
// "react-scripts start"
// npm run build

import React from "react";
import {render} from "react-dom";
import App from "./components/App.js";
import "./utils/api.js";

import "./css/fonts.css";
import "./css/App.sass";

//render(<App />, document.getElementById('app'));
render(<App />, document.querySelector("#app"));