import React from 'react';
import { Col, Row } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import UsersActions from '../../../actions/usersActions';
import UserStore from '../../../stores/UsersStore';
import Header from '../partials/header/Header';
import ActionButtons from '../ActionButtons/ActionButtons';

import './HomePage.scss';

function getStateFromStore() {
  return {
    users: UserStore.getState().users,
  };
}

class HomePage extends React.Component {
  state = {
    selectedRow: [],
    user: {},
    users: [],
  };

  componentDidMount() {
    UserStore.listen(this.onStoreChange);
    UsersActions.getAll();
  }

  componentWillUnmount() {
    UserStore.unlisten(this.onStoreChange);
  }

  onStoreChange = () => {
    const { users } = getStateFromStore();
    this.setState({
      users,
    });
  }

  setSelectedRow = (user) => {
    this.setState({
      selectedRow: [user.id],
    }, this.selectUser(user));
  }

  selectUser = (user) => {
    UsersActions.selectUser(user);
  }

  handleUserActionType = (type = 'add', user) => {
    let action = () => {};

    switch (type) {
      case 'add':
        action = UsersActions.createUser;
        break;
      case 'edit':
        action = UsersActions.updateUser;
        break;
      case 'delete':
        action = UsersActions.deleteUser;
        break;
      default:
        errorService.logErrors('Invalid User action Type', 'HomePage.jsx');
    }

    return action(user);
  };

  render() {
    const columns = [{
      dataField: 'name',
      text: 'Full Name',
    }, {
      dataField: 'email',
      text: 'Email',
    }, {
      dataField: 'phone',
      text: 'Phone Number',
    }];

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: '#c8e6c9',
      selected: this.state.selectedRow,
      onSelect: this.setSelectedRow,
    };

    const pagination = paginationFactory();

    return (
      <div className="home-page">
        <div className="home-page--header">
          <Header />
        </div>
        <div className="container">
          <Row>
            <Col md="8">
              <h4>
                Users List
              </h4>
            </Col>
            <Col md="4">
              <div className="home-page--action-buttons">
                <ActionButtons
                  user={this.state.user}
                  onConfirm={this.handleUserActionType}
                />
              </div>
            </Col>
          </Row>
          <div className="home-page--table">
            <BootstrapTable
              keyField="id"
              data={this.state.users}
              columns={columns}
              selectRow={selectRow}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
