import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field) {
        const { meta: { touched, error } } = field;
        const errorHandlingClassName = `form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className={errorHandlingClassName} >
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    mySubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }



    render() {
        const { handleSubmit } = this.props;

        return (
            //HandleSubmit is implemented in redux form, we pass our callback as parameter 
            <form onSubmit={handleSubmit(this.mySubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Tags"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">submit</button>
                <Link className="btn btn-danger" to="/">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    //validate the inputs from 'values'
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.tags = "Enter some tags!";
    }
    if (!values.content) {
        errors.content = "Enter some content please!";
    }

    //if errors is empty, the form is valid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(null, { createPost })(PostsNew)
);