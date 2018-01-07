import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input type="text" className="form-control" {...field.input} />
                <div className="text-help">
                {field.meta.touched ? field.meta.error : ""}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // for programatic navigation.  as though we are clicking to go back.
        // this === component
        this.props.createPost(values, () => {
            this.props.history.push("/");
        });

    }


    render() {
        // handleSubmit is from reduxForm, to manage validation, etc then delegate to the users onSubmit
        const { handleSubmit } = this.props;

        // label is an arbitrary field that we decide what we want to pass to the
        // renderField function

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field label="Title" name="title" component={this.renderField} />
                <Field label="Categories" name="categories" component={this.renderField} />
                <Field label="Post Content" name="content" component={this.renderField} />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate_form(values) {
    // contains all of the values the user added to the form
    // object: {title: 'adf', categories: 'lkjsadf', content: 'lksdjf'}
    const errors = {};


    // Validate the inputs from 'values
    // the errors property name maps to the name attribute of the Field element
    if (!values.title || values.title.length < 3) {
        errors.title = "Enter a title that has at least 3 characters";
    }

    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }

    if (!values.content) {
        errors.content = 'Enter some content';
    }




    // if errors is empty the form is fine to submit
    // if errors has any properties, redux assumes form is invalidate
    return errors;

}

export default reduxForm({
    validate: validate_form,
    form: 'PostsNewForm'  // string just needs to be unique
})(
    connect(null, {createPost})(PostsNew)
);
