import React from "react";
import Combobox from "./Combobox";

class ListItem extends React.Component {

    constructor() {
        super();
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
        this.setState({
            // homeMounted: !this.state.homeMounted
            highlighted: highlighted,
            oldId: oldId,
            oldArea: oldArea
        });
    }

    render() {
        let cls = this.state.highlighted ? "item item-selected" : "item";

        return (
            <li className={cls}>
                <div>
                    <div style={this.state.highlighted ? {fontWeight: 700} : {fontWeight: 400}}>{this.props.city.name}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.props.city.id}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.props.city.admin_area}</div>



                </div>
                <div className="oldCity">
                    <Combobox index={this.props.i} onUpdateItem={this.onUpdateItem} showLoading={this.showLoading}/>

                    <img src={"img/loading.gif"} style={this.state.loading ? {visibility: "visible"} : {visibility: "hidden"}}/>

                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.state.oldId}</div>
                    <div style={this.state.highlighted ? {display: "block"} : {display: "none"}}>{this.state.oldArea}</div>
                </div>
            </li>
        )
    }
}

export default ListItem;

/*List.propTypes = {
  cities: React.PropTypes.object
};*/

