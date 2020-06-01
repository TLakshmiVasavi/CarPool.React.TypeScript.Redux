import React from "react";
import { Row, Col, Container } from "react-grid-system";
import { Types } from "./Interfaces";
import { connect, DispatchProp } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { UserRequestActions, getVehicles } from "./Redux/User/UserActions";
import { Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { stat } from "fs";
import Modal from "./PopUp";
import Vehicles from "./Vehicles";
import UserDetails from "./UserDetails";
import * as Yup from "yup";
import { Formik } from "formik";
import { TextField } from "@material-ui/core";
let userActions = new UserRequestActions();

class UserProfile extends React.Component<IProps, Types.IChangePassword> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      password: "",
      newPassword: "",
      confirmPassword: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e: any) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    if (!this.props.user.isLoggedIn) {
      this.props.history.push("/");
    }

    return (
      <Container>
        <UserDetails {...this.props.routeProps} />
        <Vehicles {...this.props.routeProps} />
      </Container>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  routeProps: ownProps,
  history: ownProps.history,
  user: state.user,
  userId: state.user.mail,
  token: state.user.token,
});

interface DispatchProps {
  updateUser: (user: Types.IUser, token: string) => void;
  changePassword: (
    data: Types.IChangePassword,
    userId: string,
    token: string
  ) => void;
}
type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;
export default connect(mapStateToProps, {
  updateUser: userActions.UpdateUserRequestAction,
  changePassword: userActions.ChangePasswordRequestAction,
})(UserProfile);
