import alt from '../alt';
import { completeAssign } from '../utils/functions';
import UserActions from '../actions/usersActions';

class UserStore {
  constructor() {
    // handle store listeners
    this.bindListeners({
      onSelectUser: UserActions.SELECT_USER,
      onReceivedUsers: UserActions.RECEIVED_USERS,
      // onReceivedUser: UserActions.RECEIVED_USER,
      onDelete: UserActions.DELETE_USER,
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

  onCreate(user) {
  }

  onUpdate() {

  }

  onDelete() {

  }

  onGetAll() {

  }

  onError() {
    console.log('error');
  }

}

export default alt.createStore(UserStore);
