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
      onDeleteUser: UserActions.DELETE_USER,
      onUpdateUser: UserActions.UPDATE_USER,
      onCreateUser: UserActions.CREATED_USER,
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

  onCreateUser(user) {
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

  onError(error) {
    errorService.logErrors(error);
  }
}

export default alt.createStore(UserStore);
