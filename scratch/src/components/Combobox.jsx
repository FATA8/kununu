import React from "react";

import {getOldCity} from "../utils/api.js";
import Autocomplete from "react-autocomplete"
import "../sass/Combobox.sass";

class Combobox extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            inpt: "",
            cities: []
        };
    }

    render() {

        return (

            <Autocomplete
                inputProps={{className: "combobox__input"}}
                wrapperStyle={{position: "relative", display: "inline-block"}}
                value={this.state.inpt}
                items={this.state.cities}
                getItemValue={(item) => item.name}

                onSelect={(value, item) => {
                    this.setState({inpt: value, cities: [item]});
                    console.log("Value from combobox was selected and its value is " + value);
                    console.log(item);
                    this.props.onUpdateItem(true, item.id, item.admin_area);
                }}

                onChange={this.onChange}

                renderMenu={(items, value) => (
                    <div className="combobox__list">
                        {value === "" ? (
                            <div className="combobox__list__item">Type an address</div>
                        ) : this.state.loading ? (
                            <div className="combobox__list__item">Loading...</div>
                        ) : items.length === 0 ? (
                            <div className="combobox__list__item">No matches for {value}</div>
                        ) : this.renderItems(items)}
                    </div>
                )}

                renderItem={(item, isHighlighted) => (
                    <div
                        className={`combobox__list__item ${isHighlighted ? "combobox__list__item--highlighted" : ""}`}
                        key={item.abbr}
                    >{item.name}</div>
                )}

            />

        )

    }


    renderItems(items) {
        return items.map((item, index) => {
            const text = item.props.children;
            if (index === 0 || items[index - 1].props.children.charAt(0) !== text.charAt(0)) {
                return [<div key={index + "_listheader"} className="combobox__list__item combobox__list__item__header">{text.charAt(0)}</div>, <div key={index}>{item}</div>]
            }
            else {
                return <div key={index}>{item}</div>
            }
        })
    }


    onChange(event) {
        let that = this;

        this.setState({inpt: event.target.value});

        this.props.showLoading(true);

        getOldCity(event.target.value).then(res => {
            //console.log("returned API Promise with list of old cities data.array");
            //console.log(res);
            that.props.showLoading(false);
            that.setState({cities: res.data});
        });
    }

}

export default Combobox;
