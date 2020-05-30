import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { Types } from "./Interfaces";
import { connect, DispatchProp } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { UserActions, getVehicles } from "./Redux/User/UserActions";
import { Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { stat } from "fs";
let userActions = new UserActions();
interface IState extends Types.IUser {
  disable: boolean;
}

class UserProfile extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      disable: true,
      ...this.props.user,
    };
    this.enableEdit = this.enableEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateImage = this.updateImage.bind(this);
  }
  updateImage(e: any) {
    console.log(e.target);
    console.log(e.target.files[0]);
    this.setState({
      [e.target.name]: e.target.files[0],
    });
    console.log(this.state.photo);
    //this.props.updateImage(e.target.files[0]);
  }

  // componentWillMount() {
  //   this.props.getVehicles();
  // }

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
    console.log(this.state);
    this.props.updateUser(this.state);
  }

  disableEdit(e: any) {
    alert("disabled");
    this.setState({ disable: true });
    this.setState({ ...this.props.user });
  }

  render() {
    if (!this.props.user.isLoggedIn) {
      this.props.history.push("/Login");
    }

    return (
      <Container>
        <div className="shadowBox Profile center">
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
            {this.state.disable ? (
              <button id="edit" value="edit" onClick={this.enableEdit}>
                edit
              </button>
            ) : (
              <React.Fragment>
                <Row>
                  <small>Update Image</small>
                  <input type="file" name="photo" onChange={this.updateImage} />
                </Row>
                <Row>
                  <button
                    type="submit"
                    id="save"
                    value="save"
                    onClick={this.handleSubmit}
                  >
                    save
                  </button>
                  <button id="cancel" value="cancel" onClick={this.disableEdit}>
                    cancel
                  </button>
                </Row>
              </React.Fragment>
            )}
          </Row>
        </div>
        {this.props.vehicles.map((item: Types.IVehicle) => (
          <div className="shadowBox">
            <Row>
              <Col md={4}>
                <small>Number</small>
                <p>{item.number}</p>
                <small>Model</small>
                <p>{item.model}</p>
                <small>type</small>
                <p>{item.type}</p>
              </Col>
            </Row>
          </div>
        ))}
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  user: state.user,
  vehicles: getVehicles(
    state.user.isLoading,
    state.user.isLoaded,
    state.user.mail
  ),
});

interface DispatchProps {
  updateUser: (user: Types.IUser) => void;
}
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, {
  updateUser: userActions.UpdateUserRequestAction,
  getVehicles: userActions.GetVehiclesAction,
  updateImage: userActions.UpdateImageAction,
})(UserProfile);
