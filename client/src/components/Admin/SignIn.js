import React, { Component } from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class AdminSignIn extends Component {

    renderInput({ input, label, meta }) {
        // takes the formprops properties and added tham as props to the input element - using the spread operator
        return <div className="six wide field">
            <label className="label">{label}</label>
            <div className="control">
                <input {...input} autoComplete="off" />
            </div>
        </div>

    }

    renderError = ({ meta, anyTouched }) => {

        if (anyTouched && meta.error) {
            return <p>{meta.error}</p>
        }
        return <div></div>
    }

    renderContent() {
        return (
            <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <Field name="username" component={this.renderInput} label="Enter Username" />
                <Field name="password" component={this.renderInput} label="Enter Password" />
                <Field name="errorMessage" component={this.renderError} anyTouched={this.props.anyTouched} />
                <button className="ui button">Submit</button>
            </form>
        )
    }

    // handlesbmit above will pass down the form values that have been entered by the user
    onSubmit = (formValues) => {
        console.log(this.props);
        this.props.adminSignIn(formValues);
    }

    render() {

        return <div className="ui left aligned container">
            {this.renderContent()}
        </div>

    }
}

// when we return an empty object from here reduxForm will assume exerthing went okay
const validate = (formValues) => {
    const errors = {};

    if (!formValues.username || !formValues.password) {
        errors.errorMessage = "You must enter a username and password"
    }

    return errors;
}

// we pass validate to reduxForm for the method we wanna use for validation
export default reduxForm({ form: 'adminSignIn', validate })(AdminSignIn);