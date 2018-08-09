import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import NotFoundPage from './pages/not_found/NotFoundPage';
import HomePage from './pages/home/HomePage';

export class Main extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
