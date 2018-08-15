import React from 'react';
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import FormInput from '../../common/form/FormInput';

import './LoginForm.scss';

class LoginForm extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      code: PropTypes.number,
      message: PropTypes.string,
    }).isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    username: '',
    password: '',
  };

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.username, this.state.password);
  }

  renderError = () => {
    let dataToRender = null;
    const { error } = this.props;

    if (error && error.message) {
      dataToRender = (
        <Alert color="danger">
          {error.message}
        </Alert>
      );
    }

    return dataToRender;
  }

  render() {
    return (
      <form className="login-form" onSubmit={this.handleOnSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>
        <FormInput
          inputId="inputEmail"
          label="Username or email address"
          onChange={this.handleOnChange}
          type="text"
          name="username"
          placeholder="Username or email address"
          value={this.state.username}
        />
        <FormInput
          inputId="inputPassword"
          label="Password"
          onChange={this.handleOnChange}
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
        />
        <span>
          Hint:
          <i>
            username/password
          </i>
        </span>
        {this.renderError()}
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    );
  }
}

export default LoginForm;
