import alt from '../alt';
import login from '../services/authService';

class AuthActions {
  constructor() {
    this.generateActions(
      'loginBegin',
      'loginSuccess',
      'onError',
    );
  }

  login(data) {
    this.loginBegin();

    login(data)
      .then((response) => {
        this.loginSuccess(response);
      }, error => this.onError(error));
  }
}

export default alt.createActions(AuthActions);
