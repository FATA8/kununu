import React, {Component} from "react";
import List from "./List";
import api from "../utils/api.js";

// The interface should be made up of two columns. The left side should show the geographical data, the right side returns results from our historical old data. It should look somewhat like this:


class App extends Component {
    constructor(props) {
        super(); // execute parent constructor since I inheriting from React.component
        this.state = {
            cities: []
        };
        this.loadCities = this.loadCities.bind(this);
    }

    componentDidMount() { // after ajax call
        this.loadCities();
    }


    loadCities() {
        let that = this;
        api.getNewList()
            .then(function (res) {
                    //console.log(res);
                    that.setState({cities: res.data})
                }
            )
            .catch(function (error) {
                window.alert("Sorry, there was a loading error.");
            });
    }

    render() {
        return (
            <div className="container">
                <List cities={this.state.cities}/>
            </div>
        );
    }
}

export default App;