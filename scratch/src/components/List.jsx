import React from "react";
import Header from "./Header";
import ListItem from "./ListItem";
import "../sass/List.sass";

class List extends React.Component {

    render() {
        return (
            <ul className="list">
                <Header headerText={this.props.header} />


                {!this.props.cities.length && <React.Fragment><Header headerText={"Loading List..."}/><img src={"img/loading.gif"} alt="Loading..." /></React.Fragment>}

                {this.props.cities.map((city, i) =>
                    <ListItem key={i} index={i}
                              city={city}/>
                )}
            </ul>
        )
    }
}

export default List;

/*List.propTypes = {
  cities: React.PropTypes.object
};*/

