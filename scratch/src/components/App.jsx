import React, {Component} from "react";
import {connect} from "react-redux";

import List from "./List";
import api from "../utils/api.js";

class App extends Component {
    constructor() {
        super();
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
        // load list of new cities with AJAX
        api.getNewList()
            .then(function (res) {
                    if (res.data.length) {
                        that.onHeaderUpdate("Welcome");
                        that.setState({cities: res.data});
                    } else {
                        // reducer
                        that.onHeaderUpdate("Server did not send data!");
                    }
                }
            )
            .catch(function (error) {
                window.alert("Sorry, there was a loading error:\n\n" + error);
                that.onHeaderUpdate("loading ERROR");
            });
    }

    onHeaderUpdate(headerText) {
        this.props.setHeader(headerText);
    }

    render() {
        return (
            <div className="container">
                <List cities={this.state.cities}
                      header={this.props.header.value[this.props.header.value.length - 1]}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        header: state.header // reducer
    };
};


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