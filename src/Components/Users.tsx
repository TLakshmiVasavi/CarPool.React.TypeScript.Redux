import Modal from "./PopUp";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { UserRequestActions, getAllUsers } from "./Redux/User/UserActions";
import React from "react";
import { Types } from "./Interfaces";
import { Row, Col } from "react-grid-system";

let userActions = new UserRequestActions();

class Users extends React.Component<IProps> {
  render() {
    var url = "data:image/png;base64,";
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <>
        {this.props.users?.map((user: Types.IUser) => (
          <div className="shadowBox Profile center">
            <Row>
              <Col md={4}>
                <img src={url + user.photo} className="fill" />
              </Col>
              <Col md={8}>
                <Row>
                  <Col md={6}>Name</Col>
                  <Col md={6}>{user.name}</Col>
                </Row>
                <Row>
                  <Col md={6}>Age</Col>
                  <Col md={6}>{user.age}</Col>
                </Row>
                <Row>
                  <Col md={6}>Mail</Col>
                  <Col md={6}>{user.mail}</Col>
                </Row>
                <Row>
                  <Col md={6}>Number</Col>
                  <Col md={6}>{user.number}</Col>
                </Row>
                <Row>
                  <Col md={6}>Gender</Col>
                  <Col md={6}>{user.gender}</Col>
                </Row>
              </Col>
            </Row>
          </div>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
  users:
    state.user.role == "User"
      ? undefined
      : getAllUsers(
          state.user.isUsersLoading,
          state.user.isUsersLoaded,
          state.user.token
        ),
  token: state.user.token,
});
type IProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, {})(Users);
