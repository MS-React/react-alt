import alt from '../alt';
import {
  fetchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from '../services/userService';
import { omit } from '../utils/functions';
import { DEFAULT_USER_VALID_ID_PATHS } from '../constants';
import getUserId from '../utils/user';

class UserActions {
  constructor() {
    this.generateActions(
      'createdUser',
      'updateUser',
      'deleteUser',
      'receivedUsers',
      'selectUser',
      'onError',
    );
  }

  getAll() {
    fetchUsers()
      .then(response => this.receivedUsers(response.data.docs))
      .catch(error => this.onError(error));
  }

  createUser(user) {
    createUsers(omit(user, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data }) => this.createdUser(data))
      .catch(error => this.onError(error));
  }

  updateUser(user) {
    updateUsers(getUserId(user), omit(user, DEFAULT_USER_VALID_ID_PATHS))
      .then(({ data }) => this.updatedUser(data))
      .catch(error => this.onError(error));
  }

  deleteUser(user) {
    deleteUsers(getUserId(user))
      .then(({ data }) => this.updatedUser(data))
      .catch(error => this.onError(error));
  }
}

export default alt.createActions(UserActions);
