import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';

class SelectAmountOfGuests extends Component {

    componentDidMount() {
        this.props.setUpGuests();
    }

    renderOptions() {

        let options = [];
        for (let i = 1; i <= this.props.numberOfGuests; i++) {
            options.push(i);
        }

        return options.map((value, index) => {
            return <option key={index}>{value}</option>
        })
    }

    renderGuestsSelect() {
        return <div>
            <Field name="numberOfGuests" component='select'>
                <option />
                {this.renderOptions()}

            </Field>
        </div>

    }

    render() {
        return this.renderGuestsSelect();
    }
}

export default reduxForm({ 'form': 'guestSelectForm' })(SelectAmountOfGuests);