import alt from '../alt';
import { completeAssign } from '../utils/functions';
import {
  fetchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from '../services/userService';
import UserActions from '../actions/usersActions';

class UserStore {
  constructor() {
    this.bindActions(UserActions);

    this.users = {};
  }

  update(id, update) {
    this.todos[id] = completeAssign(this.todos[id], update);
  }

  onCreate(user) {
  }

  onUpdate() {

  }

  onDelete() {

  }

  onGetAll() {
    fetchUsers()
      .then((response) => {
        this.users = response.data.docs;
      })
      .catch((error) => {
        this.onError(error);
      });

  }

  onError() {
    console.log('error');
  }

}

export default alt.createStore(UserStore);
