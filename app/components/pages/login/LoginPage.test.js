import React from 'react';
import { shallow, mount } from 'enzyme';
import { LoginPage } from './LoginPage';
import authActions from '../../../actions/authActions';
import AuthStore from '../../../stores/AuthStore';

function setup(props) {
  return shallow(<LoginPage {...props} />);
}

describe('<LoginPage /> component', () => {
  it('renders itself', () => {
    // Arrange
    const wrapper = setup({
      history: {
        push: jest.fn,
      },
    });

    // Assert
    expect(wrapper.find('section')).toHaveLength(1);
    expect(wrapper.find('LoginForm')).toHaveLength(1);
  });

  it('should subscribe to store event when component is mounted', () => {
    // Arrange
    const lintenSpy = spyOn(AuthStore, 'listen').and.callThrough();
    const componentWillMountSpy = spyOn(LoginPage.prototype, 'componentDidMount').and.callThrough();
    const wrapper = setup({
      history: {
        push: jest.fn,
      },
    });

    // Assert
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(lintenSpy).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe to sor event when component is unmounted', () => {
    // Arrange
    const unlistenSpy = spyOn(AuthStore, 'unlisten').and.callThrough();
    const componentWillMountSpy = spyOn(LoginPage.prototype, 'componentWillUnmount').and.callThrough();
    const wrapper = setup({
      history: {
        push: jest.fn,
      },
    });

    // Act
    wrapper.instance().componentWillUnmount();
    wrapper.update();

    // Assert
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(unlistenSpy).toHaveBeenCalledTimes(1);
  });
  
  it('should handle form submit', () => {
    // Arrange
    const loginSpy = jest.spyOn(authActions, 'login');
    const wrapper = setup({
      history: {
        push: jest.fn,
      },
    });

    // Act
    wrapper.instance().handleOnSubmit('username', 'password');
 
    // Assert
    expect(loginSpy).toHaveBeenCalledTimes(1);
  });

  it('should redirect to home page when user is authenticated', () => {
    // Arrange
    const pushSpy = jest.fn();
    const wrapper = setup({
      history: {
        push: pushSpy,
      }
    });

    // Act
    wrapper.instance().authenticate(true);

    // Assert
    expect(pushSpy).toHaveBeenCalledTimes(1);
  });
});
