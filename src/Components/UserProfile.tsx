import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { Types } from "./Interfaces";
import { connect, DispatchProp } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import userActions from "./Redux/User/UserActions";
import { Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
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
              </React.Fragment>
            )}
          </Row>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  user: state.user,
});

interface DispatchProps {
  updateUser: (user: Types.IUser) => void;
}
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, {
  updateUser: userActions.UpdateUserRequestAction,
})(UserProfile);
