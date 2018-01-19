import React from "react";
import PropTypes from "prop-types";

import Combobox from "./Combobox";
import "../sass/ListItem.sass";

class ListItem extends React.Component {

    constructor(props) {
        super(props);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.showLoading = this.showLoading.bind(this);

        this.state = {
            highlighted: false,
            oldId: "",
            oldArea: "",
            loading: false
        };
    }

    showLoading(loading) {
        this.setState({loading: loading});
    }


    onUpdateItem(highlighted, oldId, oldArea) {
        console.log(this.props.city);
        this.setState({
            highlighted,
            oldId,
            oldArea
        });
    }

    render() {
        let cls = this.state.highlighted ? "list__item list__item--selected" : "list__item";

        return (
            <li className={cls}>
                <span className={"list__item__number"}>{this.props.index + 1}</span>

                <div className={"list__item__column"}>
                    <div style={this.state.highlighted ? {fontWeight: 700} : {fontWeight: 400}}>{this.props.city.name}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.props.city.id}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.props.city.admin_area}</div>
                </div>

                <div className="list__item__column list__item__column--oldCity">
                    <Combobox onUpdateItem={this.onUpdateItem} showLoading={this.showLoading}/>

                    <img src={"img/loading.gif"}
                         style={this.state.loading ? {visibility: "visible"} : {visibility: "hidden"}}
                         className={"loadingIndicator"}
                         alt="..."/>

                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.state.oldId}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.state.oldArea}</div>
                </div>

            </li>
        )
    }
}

export default ListItem;

ListItem.propTypes = {
    city: PropTypes.object.isRequired
};