import Modal from "./PopUp";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import {
  UserRequestActions,
  getVehicles,
  getAllUsers,
} from "./Redux/User/UserActions";
import React from "react";
import { Types } from "./Interfaces";
import { Row, Col, Container } from "react-grid-system";
interface IState extends Types.IUser {
  disable: boolean;
  open: boolean;
}

let userActions = new UserRequestActions();

class UserDetails extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      open: false,
      disable: true,
      ...this.props.user,
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateImage = this.updateImage.bind(this);
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }

  updateImage(e: any) {
    this.setState({
      [e.target.name]: e.target.files[0],
    });
  }
  handleChange(e: any) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
    this.setState({ [e.target.name]: e.target.value });
  }
  enableEdit(e: any) {
    this.setState({ disable: false });
  }

  handleSubmit(e: any) {
    this.setState({ disable: true });
    this.props.updateUser(this.state, this.props.token);
  }

  disableEdit(e: any) {
    this.setState({ disable: true });
    this.setState({ ...this.props.user });
  }
  modalOpen() {
    this.setState({ open: true });
  }

  modalClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    var url = "data:image/png;base64,";
    if (!this.props.user.isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <>
        <div className="shadowBox Profile center">
          <Modal show={this.state.open} handleClose={this.modalClose}>
            <input type="file" name="photo" onChange={this.updateImage} />
          </Modal>
          <Row>
            <Col md={4}>
              <div className="img-container">
                <img
                  src={url + this.props.user.photo}
                  className="fill"
                  onClick={this.modalOpen}
                />
                <div className="middle">
                  <div className="change">Change Picture</div>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6}>Name</Col>
                <Col md={6}>
                  <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    disabled={this.state.disable}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>Age</Col>
                <Col md={6}>
                  <input
                    type="number"
                    name="age"
                    value={this.state.age}
                    onChange={this.handleChange}
                    disabled={this.state.disable}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>Mail</Col>
                <Col md={6}>
                  <input
                    type="text"
                    name="mail"
                    value={this.state.mail}
                    onChange={this.handleChange}
                    disabled={this.state.disable}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>Number</Col>
                <Col md={6}>
                  <input
                    type="text"
                    name="number"
                    value={this.state.number}
                    onChange={this.handleChange}
                    disabled={this.state.disable}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={6}>Gender</Col>
                <Col md={6}>
                  <select
                    name="gender"
                    defaultValue={this.state.gender}
                    onChange={this.handleChange}
                    disabled={this.state.disable}
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </Col>
              </Row>
              <Row>
                <Col>
                  {this.state.disable ? (
                    <button id="edit" value="edit" onClick={this.enableEdit}>
                      edit
                    </button>
                  ) : (
                    <>
                      <Row>
                        <button
                          type="submit"
                          id="save"
                          value="save"
                          onClick={this.handleSubmit}
                        >
                          save
                        </button>
                        <button
                          id="cancel"
                          value="cancel"
                          onClick={this.disableEdit}
                        >
                          cancel
                        </button>
                      </Row>
                    </>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  user: state.user,
  users:
    state.user.role == "User"
      ? undefined
      : getAllUsers(
          state.user.isLoading,
          state.user.isLoaded,
          state.user.token
        ),
  token: state.user.token,
});
interface DispatchProps {
  updateUser: (user: Types.IUser, token: string) => void;
}
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, {
  updateUser: userActions.UpdateUserRequestAction,
})(UserDetails);
