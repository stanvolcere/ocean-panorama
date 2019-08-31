import React, { Component } from "react";

class SelectAmountOfGuests extends Component {

    // componentDidMount() {
    //     console.log(this.props);
    //     //this.setInitialAmountOfGuests();
    // }

    // componentDidUpdate() {
    //     console.log(this.props);
    // }

    // setInitialAmountOfGuests() {
    //     this.setState({ numberOfGuests: this.props.maxGuests });
    // }

    renderGuestsActions() {
        return <div>
            <button className="ui icon button" onClick={this.props.decrementGuests}>
                <i className="minus icon"></i>
            </button>
            {this.props.numberOfGuests}
            <button className="ui icon button" onClick={this.props.incrementGuests}>
                <i className="plus icon"></i>
            </button>
        </div>
    }

    render() {
        return this.renderGuestsActions();
    }
}

export default SelectAmountOfGuests;