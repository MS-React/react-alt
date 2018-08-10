import alt from '../alt';
import {
  fetchUsers,
  createUsers,
  updateUsers,
  deleteUsers,
} from '../services/userService';

class UserActions {
  constructor() {
    this.generateActions(
      'createUser',
      'updateUser',
      'deleteUser',
      'receivedUsers',
      'selectUser',
    );
  }

  getAll() {
    fetchUsers()
      .then((response) => {
        this.receivedUsers(response.data.docs);
      })
      .catch((error) => {
        this.onError(error);
      });
  }
}

export default alt.createActions(UserActions);
