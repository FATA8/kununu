import React, {Component} from "react";
import {connect} from "react-redux";

import List from "./List";
import api from "../utils/api.js";

// The interface should be made up of two columns.
// The left side should show the geographical data,
// the right side returns results from our historical old data.


class App extends Component {
    constructor(props) {
        super(); // execute parent constructor since I inheriting from React.component
        this.state = {
            cities: []
        };
        this.loadCities = this.loadCities.bind(this);
        this.onHeaderUpdate = this.onHeaderUpdate.bind(this);
    }

    componentDidMount() { // after ajax call
        this.loadCities();
    }


    loadCities() {
        let that = this;
        api.getNewList()
            .then(function (res) {
                    //console.log(res);
                    that.setState({cities: res.data});
                    that.onHeaderUpdate("Welcome");
                }
            )
            .catch(function (error) {
                window.alert("Sorry, there was a loading error:\n" + error);
                that.onHeaderUpdate("loading ERROR");
            });
    }

    onHeaderUpdate(headerText) {
        this.props.setHeader(headerText);
    }

    render() {
        return (
            <div className="container">
                <List cities={this.state.cities} header={this.props.header.value[this.props.header.value.length - 1]}/>
            </div>
        );
    }
}

// which properties of the global state do I want to use in this component and
// which local properties (accesible trought props keyword) do I want to map in my component
const mapStateToProps = (state) => {
    return {
        header: state.header // reducer
    };
};

// for the actions I want to execute/send to my reducer(s)
const mapDispatchToProps = (dispatch) => {
    return {
        setHeader: (headerText) => {
            dispatch({
                type: "UPDATE",
                payload: headerText
            })
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);