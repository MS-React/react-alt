import alt from '../alt';
import AuthActions from '../actions/authActions';

class AuthStore {
  constructor() {
    // handle store listeners
    this.bindListeners({
      onLoginBegin: AuthActions.LOGIN_BEGIN,
      onLoginSuccess: AuthActions.LOGIN_SUCCESS,
      onError: AuthActions.ON_ERROR,
    });

    this.auth = {
      authenticating: false,
      authenticated: false,
      error: {
        code: null,
        message: null,
      },
      user: null,
    };
  }

  onLoginBegin() {
    this.auth = {
      ...this.auth,
      authenticating: true,
    };
  }

  onLoginSuccess(data) {
    this.auth = {
      ...this.auth,
      authenticating: false,
      authenticated: true,
      user: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        skypeId: data.skypeId,
      },
    };
  }

  onError(error) {
    this.auth = {
      ...this.auth,
      error,
    };
  }
}

export default alt.createStore(AuthStore);
