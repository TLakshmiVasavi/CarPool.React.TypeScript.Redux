import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { IUser } from "./Interfaces";

class UserProfile extends React.Component<{}, IUser> {
  constructor(props: any) {
    super(props);
    this.enableEdit = this.enableEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.disableEdit = this.disableEdit.bind(this);
  }

  componentDidMount() {
    //this.setState({ user: this.props.user });
  }

  enableEdit(e: any) {
    this.setState({ disable: false });
  }

  handleSubmit(e: any) {
    this.setState({ disable: true });
  }

  disableEdit(e: any) {
    this.setState({ disable: true });
  }

  render() {
    return (
      <Container>
        <div className="shadowBox Profile center">
          <Row>
            <Col md={6}>Name</Col>
            <Col md={6}>
              <input
                type="text"
                value={this.state.name}
                disabled={this.state.disable}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>Age</Col>
            <Col md={6}>
              <input
                type="number"
                value={this.state.age}
                disabled={this.state.disable}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>Mail</Col>
            <Col md={6}>
              <input
                type="text"
                value={this.state.mail}
                disabled={this.state.disable}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>Number</Col>
            <Col md={6}>
              <input
                type="text"
                value={this.state.number}
                disabled={this.state.disable}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>Gender</Col>
            <Col md={6}>
              <select value={this.state.gender} disabled={this.state.disable}>
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

export default UserProfile;
