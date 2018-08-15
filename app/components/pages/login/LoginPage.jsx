import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoginForm from './LoginForm';
import authActions from '../../../actions/authActions';
import AuthStore from '../../../stores/AuthStore';

import './LoginPage.scss';

function getStateFromStore() {
  return {
    auth: AuthStore.getState().auth,
  };
}

export class LoginPage extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  state = {
    auth: {
      error: null,
      user: null,
    },
  };

  componentDidMount() {
    AuthStore.listen(this.onStoreChange);
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onStoreChange);
  }

  onStoreChange = () => {
    const { auth } = getStateFromStore();
    this.setState({
      auth,
    }, this.authenticate(auth.authenticated));
  }

  authenticate = (authenticated) => {
    if (authenticated) {
      this.props.history.push('/');
    }
  }

  handleOnSubmit = (username, password) => {
    authActions.login({ username, password });
  }

  render() {
    return (
      <section className="login-page">
        <div className="login-page--form">
          <LoginForm onSubmit={this.handleOnSubmit} error={this.state.auth.error} />
        </div>
      </section>
    );
  }
}

export default withRouter(LoginPage);
