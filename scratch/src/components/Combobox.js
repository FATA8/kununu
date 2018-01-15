import React from "react";
import {getOldCity, getNewList} from "../utils/api.js";
import Autocomplete from "react-autocomplete"
import "../css/Combobox.sass";

class Combobox extends React.Component {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
        this.state = {
            inpt: "",
            mesta: []
        };
    }

    render() {

        return (

            <Autocomplete
                //inputProps={{id: 'states-autocomplete'}}
                wrapperStyle={{position: 'relative', display: 'inline-block'}}
                value={this.state.inpt}
                items={this.state.mesta}
                getItemValue={(item) => item.name}

                onSelect={(value, item) => {
                    this.setState({inpt: value, mesta: [item]});
                    console.log("Autocomplete value was selected = " + value);
                    this.props.onUpdateItem(true, item.id, item.admin_area);
                }}

                onChange={this.onChange}

                renderMenu={children => (
                    <div className="menu">
                        {children}
                    </div>
                )}

                renderItem={(item, isHighlighted) => (
                    <div className={`item ${isHighlighted ? 'item-highlighted' : ''}`}
                         key={item.abbr}
                    >{item.name}</div>
                )}

            />

        )

    }


    onChange(event) {
        let that = this;

        this.setState({inpt: event.target.value});

        this.props.showLoading(true);

        getOldCity(event.target.value).then(function (res) { // todo arrow
            console.log("vratil sa z promise ->");
            console.log(res);
            that.props.showLoading(false);
            that.setState({mesta: res.data});
        });

    }
}

export default Combobox;

/*Input.propTypes = {
  cities: React.PropTypes.object
};*/

