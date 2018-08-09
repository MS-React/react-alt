import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import MsModal from '../../common/modal/MsModal';
import UsersForm from '../UsersForm/UsersForm';
import { EMAIL_REGEXP } from '../../../constants';

import './ActionButtons.scss';

const EMPTY_USER = {
  name: '',
  email: '',
  phone: '',
  skypeId: '',
};

const DEFAULT_USER_MODAL_LABELS = {
  confirmButtonText: 'Save',
};

export class ActionButtons extends React.Component {
  static propTypes = {
    user: PropTypes.object,
    onConfirm: PropTypes.func.isRequired,
  };

  static defaultProps = {
    user: EMPTY_USER,
  }

  constructor(props) {
    super(props);

    this.state = {
      actionType: null,
      user: { ...EMPTY_USER, ...props.user },
      isUserModalOpen: false,
      errors: {},
    };
  }

  componentWillReceiveProps({ user: newUser }) {
    const { user: currentSelectedUser } = this.props;

    if (!this.isUserMatchById(currentSelectedUser, newUser)) {
      this.setState({
        user: {
          ...newUser,
        },
      });
    }
  }

  getModalBody = () => {
    const {
      user,
      errors,
    } = this.state;

    if (this.state.actionType === 'delete') {
      return (
        <p>
          {`Are you sure to delete User ${user.name}`}
        </p>
      );
    }

    return (
      <UsersForm
        onChange={this.updateUserState}
        user={user}
        errors={errors}
      />
    );
  };

  getModalLabels = (actionType = 'add') => {
    if (actionType === 'delete') {
      return {
        ...DEFAULT_USER_MODAL_LABELS,
        confirmButtonText: 'Delete',
      };
    }

    return DEFAULT_USER_MODAL_LABELS;
  };

  toggleAddModal = () => {
    this.setState({
      actionType: 'add',
      user: { ...EMPTY_USER },
    }, this.toggle);
  };

  toggleEditModal = () => {
    this.setState({
      actionType: 'edit',
    }, this.toggle);
  };

  toggleDeleteModal = () => {
    this.setState({
      actionType: 'delete',
    }, this.toggle);
  };

  updateUserState = (event) => {
    this.setState(prevState => ({
      user: {
        ...prevState.user,
        [event.target.name]: event.target.value,
      },
    }));
  };

  toggle = () => {
    this.setState(prevState => ({
      isUserModalOpen: !prevState.isUserModalOpen,
    }));
  };

  isValidUser = user => Object.prototype.hasOwnProperty.call(user, 'id') && user.id !== '';

  isUserMatchById = (sourceUser = {}, targetUser = {}) => sourceUser.id === targetUser.id;

  validateForm = () => {
    const { user } = this.state;
    const isValidUsername = user.name !== '';
    const isValidEmail = EMAIL_REGEXP.test(user.email);
    const errors = {};

    if (!isValidUsername) {
      errors.name = 'User name is required';
    }

    if (!isValidEmail) {
      errors.email = 'Email is invalid';
    }

    this.setState({ errors });

    return errors;
  };

  canSubmitForm = () => {
    const errors = this.validateForm();
    return (Object.keys(errors).length === 0 && errors.constructor === Object);
  };

  saveUser = () => {
    if (!this.canSubmitForm()) {
      return;
    }

    if (typeof this.props.onConfirm === 'function') {
      this.props.onConfirm(this.state.actionType, this.state.user)
        .then(() => {
          this.toggle();
        });
    }
  };

  cancel = () => {
    let user = EMPTY_USER;
    const { user: propsUser } = this.props;

    if (this.isValidUser(this.props.user) === true) {
      user = propsUser;
    }

    this.setState({
      user: { ...user },
      errors: {},
    }, this.toggle);
  };

  render() {
    const modalBody = this.getModalBody();
    const isUserEditDisabled = this.isValidUser(this.state.user) === false;
    const modalInfo = {
      ...this.getModalLabels(this.state.actionType),
      title: `${this.state.actionType} User`,
    };

    return (
      <div className="action-buttons">
        <Button
          color="primary"
          onClick={this.toggleAddModal}
        >
          Add
        </Button>
        <Button
          color="info"
          disabled={isUserEditDisabled}
          onClick={this.toggleEditModal}
        >
          Edit
        </Button>
        <Button
          color="danger"
          disabled={isUserEditDisabled}
          onClick={this.toggleDeleteModal}
        >
          Delete
        </Button>
        <MsModal
          okButtonLabel={modalInfo.confirmButtonText}
          cancelButtonLabel="Cancel"
          body={modalBody}
          isOpen={this.state.isUserModalOpen}
          okCallback={this.saveUser}
          cancelCallback={this.cancel}
          modalTitle={modalInfo.title}
        />
      </div>
    );
  }
}

export function mapStateToProps({ users }) {
  return {
    user: users.selectedUser,
  };
}

export default connect(mapStateToProps)(ActionButtons);
