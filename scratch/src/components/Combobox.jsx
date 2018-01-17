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
                //inputProps={{id: 'states-autocomplete'}}
                wrapperStyle={{position: 'relative', display: 'inline-block'}}
                value={this.state.inpt}
                items={this.state.cities}
                getItemValue={(item) => item.name}

                onSelect={(value, item) => {
                    this.setState({inpt: value, cities: [item]});
                    console.log("Autocomplete value was selected = " + value);
                    this.props.onUpdateItem(true, item.id, item.admin_area);
                }}

                onChange={this.onChange}

                renderMenu={(items, value) => (
                    <div className="menu">
                        {value === '' ? (
                            <div className="item">Type an address</div>
                        ) : this.state.loading ? (
                            <div className="item">Loading...</div>
                        ) : items.length === 0 ? (
                            <div className="item">No matches for {value}</div>
                        ) : this.renderItems(items)}
                    </div>
                )}

                renderItem={(item, isHighlighted) => (
                    <div
                        className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
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
                return [<div className="item item-header">{text.charAt(0)}</div>, item]
            }
            else {
                return item
            }
        })
    }


    onChange(event) {
        let that = this;

        this.setState({inpt: event.target.value});

        this.props.showLoading(true);

        getOldCity(event.target.value).then(function (res) { // todo arrow
            console.log("vratil sa z api promise ->");
            console.log(res);
            that.props.showLoading(false);
            that.setState({cities: res.data});
        });

    }
}

export default Combobox;

/*Input.propTypes = {
  cities: React.PropTypes.object
};*/

