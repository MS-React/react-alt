import alt from '../alt';

class UserActions {
  constructor() {
    this.generateActions(
      'createUser',
      'updateUser',
      'deleteUser',
      'getAll',
      'selectUser',
    );
  }
}

export default alt.createActions(UserActions);
