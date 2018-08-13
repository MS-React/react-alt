import alt from '../alt';
import { completeAssign } from '../utils/functions';
import UserActions from '../actions/usersActions';
import getUserId from '../utils/user';

class UserStore {
  constructor() {
    // handle store listeners
    this.bindListeners({
      onSelectUser: UserActions.SELECT_USER,
      onReceivedUsers: UserActions.RECEIVED_USERS,
      // onReceivedUser: UserActions.RECEIVED_USER,
      onDelete: UserActions.DELETE_USER,
      onCreatedUser: UserActions.CREATED_USER,
      onError: UserActions.ON_ERROR,
    });
    // state
    this.users = [];
    this.selectedUser = {};
  }

  update(id, update) {
    this.todos[id] = completeAssign(this.todos[id], update);
  }

  onReceivedUsers(users) {
    this.users = [...users];
  }

  onSelectUser(user) {
    this.selectedUser = user;
  }

  onCreatedUser(user) {
    this.users = [
      user,
      ...this.users,
    ];
  }

  onUpdateUser(user) {
    this.users = [
      user,
      ...this.users.filter(usr => getUserId(usr) !== getUserId(user)),
    ];
  }

  onDeleteUser(user) {
    this.users = this.users.filter(usr => getUserId(user) !== getUserId(usr));
  }

  static onError(error) {
    errorService.logErrors(error);
  }
}

export default alt.createStore(UserStore);
