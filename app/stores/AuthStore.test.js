import alt from '../alt';
import AuthStore from './AuthStore';
import AuthActions from '../actions/authActions';

describe('AuthStore', () => {

  it('get initial state from auth store', () => {
    const authState = AuthStore.getState().auth;

    expect(authState).toEqual({
      authenticating: false,
      authenticated: false,
      error: {
        code: null,
        message: null,
      },
      user: null,
    });
  });

  it('should update store on login begin action', () => {
    alt.dispatcher.dispatch({
      action: AuthActions.LOGIN_BEGIN
    });

    expect(AuthStore.getState().auth.authenticating).toEqual(true);
  });

  it('should update store on login success action', () => {
    alt.dispatcher.dispatch({
      action: AuthActions.LOGIN_SUCCESS,
      data: {
        name: 'John',
        email: 'john@gmail.com',
        phone: '1234',
        skypeId: 'johndoe',
      }
    });

    expect(AuthStore.getState().auth).toMatchObject({
      authenticating: false,
      authenticated: true,
      user: {
        name: 'John',
        email: 'john@gmail.com',
        phone: '1234',
        skypeId: 'johndoe',
      },
    });
  });

  it('should update store on error', () => {
    alt.dispatcher.dispatch({
      action: AuthActions.ON_ERROR,
      data: {
        code: 400,
        message: 'Invalid credentials',
      }
    });

    expect(AuthStore.getState().auth.error).toEqual({
      code: 400,
      message: 'Invalid credentials'
    });
  });
});

