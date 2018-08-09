import alt from '../alt';

class AuthActions {
  constructor() {
    this.generateActions(
      'loginBegin',
      'loginSuccess',
      'loginFailed',
    );
  }
}

export default alt.createActions(AuthActions);
