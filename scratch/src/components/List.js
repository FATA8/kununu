import React from "react";
import Header from "./Header";
import ListItem from "./ListItem";

class List extends React.Component {

    render() {
        return (
            <ul className="list">
                <Header homeLink="Kununu Frontend Task"/>


                {!this.props.cities.length && <React.Fragment><Header homeLink={"Loading List..."}/><img src={"img/loading.gif"}/></React.Fragment>}

                {this.props.cities.map((city, i) =>
                    <ListItem key={i}
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

