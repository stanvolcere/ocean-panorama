// this should be for delete confirmation only
import React from "react";
import { reduxForm, Field } from 'redux-form';

class EnquiryForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <div className="header">{error}</div>

                </div>
            )
        }

    }

    renderSubject({ input, label, meta: { touched, error } }) {


        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                <div className="red-text" style={{ marginBottom: '20px' }}>
                    {touched && error}
                </div>
            </div>
        )
    }

    renderMessage({ input, label, meta: { touched, error } }) {
        return (
            <div className="field">
                <label>{label}</label>
                <textarea {...input}></textarea>
                <div className="red-text" style={{ marginBottom: '20px' }}>
                    {touched && error}
                </div>
            </div>
        )
    }

    onSubmit = (formValues) => {
        const { auth, room } = this.props;
        this.props.onSubmit({ ...formValues, email: auth.email, name: auth.name, roomTitle: room.title });
    }

    renderContent() {
        const { handleSubmit, pristine, submitting } = this.props;

        return (
            <form className="ui form" onSubmit={handleSubmit(this.onSubmit)}>
                <Field name='subject' component={this.renderSubject} label="Subject"></Field>
                <Field name='message' component={this.renderMessage} label="Message"></Field>
                <button className="ui button" type="submit" disabled={pristine || submitting}>Send</button>
            </form>
        )
    }

    render() {
        return <div className="signin__container">
            {this.renderContent()}
        </div>

    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.subject) {
        errors.subject = "Please enter a Subject";
    }

    if (!formValues.message) {
        errors.message = "Please enter a message";
    }
    return errors;
}

export default reduxForm({ form: 'enquiryForm', destroyOnUnmount: false, validate })(EnquiryForm);