import React from 'react';
import { shallow } from 'enzyme';
import HomePage from './HomePage';
import UserStore from '../../../stores/UsersStore';
import UsersActions from '../../../actions/usersActions';

function setup(props) {
  return shallow(<HomePage {...props} />);
}

describe('<HomePage /> component', () => {
  
  it('renders itself', () => {
    // Arrange
    const wrapper = setup();

    // Assert
    expect(wrapper.find('Header')).toHaveLength(1);
    expect(wrapper.find('.container')).toHaveLength(1);
  });

  it('should call getAll action when component is mounted', () => {
    // Arrange
    const getAllSpy = jest.spyOn(UsersActions, 'getAll');
    
    const wrapper = setup();

    // Assert
    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  it('should subscribe to store event when component is mounted', () => {
    // Arrange
    const lintenSpy = spyOn(UserStore, 'listen').and.callThrough();
    const componentWillMountSpy = spyOn(HomePage.prototype, 'componentDidMount').and.callThrough();
    const wrapper = setup({
      user: {},
    });

    // Assert
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(lintenSpy).toHaveBeenCalledTimes(1);
  });

  it('should unsubscribe to sor event when component is unmounted', () => {
    // Arrange
    const unlistenSpy = spyOn(UserStore, 'unlisten').and.callThrough();
    const componentWillMountSpy = spyOn(HomePage.prototype, 'componentWillUnmount').and.callThrough();
    const wrapper = setup({
      user: {},
    });

    // Act
    wrapper.instance().componentWillUnmount();
    wrapper.update();

    // Assert
    expect(componentWillMountSpy).toHaveBeenCalledTimes(1);
    expect(unlistenSpy).toHaveBeenCalledTimes(1);
  });

  it('should call selectUser action when row is selected', () => {
    // Act
    const selectUserSpy = spyOn(UsersActions, 'selectUser').and.callThrough();
    const wrapper = setup({
      user: {},
    });

    wrapper.instance().setSelectedRow({ id: 'id' });

    // Assert
    expect(wrapper.state().selectedRow).toEqual(['id']);
    expect(selectUserSpy).toHaveBeenCalledTimes(1);
  });

  describe('should handle user action by type', () => {
    it('should call errorService when type is not assigned', () => {
      // Arrange
      const type = 'test';
      const user = {
        id: 'id'
      };
      const createUserSpy = spyOn(UsersActions, 'createUser').and.callThrough();
      const updateUserSpy = spyOn(UsersActions, 'updateUser').and.callThrough();
      const deleteUserSpy = spyOn(UsersActions, 'deleteUser').and.callThrough();
      const wrapper = setup();

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(createUserSpy).toHaveBeenCalledTimes(0);
      expect(updateUserSpy).toHaveBeenCalledTimes(0);
      expect(deleteUserSpy).toHaveBeenCalledTimes(0);
    });

    it('should return Add handler', () => {
      // Arrange
      const type = 'add';
      const user = {
        id: 'id'
      };
      const createUserSpy = spyOn(UsersActions, 'createUser').and.callThrough();
      const wrapper = setup();

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(createUserSpy).toHaveBeenCalledTimes(1);
    });

    it('should return Update handler', () => {
      // Arrange
      const type = 'edit';
      const user = {
        id: 'id'
      };
      const updateUserSpy = spyOn(UsersActions, 'updateUser').and.callThrough();
      const wrapper = setup();

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(updateUserSpy).toHaveBeenCalledTimes(1);
    });

    it('should return Delete handler', () => {
      // Arrange
      const type = 'delete';
      const user = {
        id: 'id'
      };
      const deleteUserSpy = spyOn(UsersActions, 'deleteUser').and.callThrough();
      const wrapper = setup();

      // Act
      wrapper.instance().handleUserActionType(type, user);

      // Assert
      expect(deleteUserSpy).toHaveBeenCalledTimes(1);
    });
  });
});
