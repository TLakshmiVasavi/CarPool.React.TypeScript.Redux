import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Types } from "./Interfaces";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { Redirect } from "react-router-dom";
import { UserRequestActions } from "./Redux/User/UserActions";
let userActions = new UserRequestActions();
const validationSchema = Yup.object({
  id: Yup.string().required("Id is Required"),
  password: Yup.string().required("Password is Required"),
});

class LoginForm extends Component<IProps, Types.IAuthUser> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      id: "",
      password: "",
      error: "",
    };
  }
  render() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/Dashboard");
    }

    return (
      <div className="rightHalf">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.props.Login(values);
          }}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <div>{this.state.error}</div>
              <h1 className="form-heading underline">Log In</h1>
              <TextField
                margin="normal"
                type="text"
                onChange={handleChange}
                className={errors.id ? "error" : ""}
                name="id"
                label={errors.id ?? "id"}
              />
              <TextField
                margin="normal"
                type="text"
                onChange={handleChange}
                name="password"
                className={errors.password ? "error" : ""}
                label={errors.password ?? "password"}
              />
              <button type="submit" className="submit bg-darkorange">
                Log In
              </button>
              <div className="form-group white link">
                Not a member yet?
                <a
                  className="underline white"
                  onClick={() => {
                    this.props.history.push("/SignUp");
                  }}
                >
                  SIGN UP
                </a>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

interface DispatchProps {
  Login: (user: Types.IAuthUser) => void;
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
});
export default connect(mapStateToProps, {
  Login: userActions.UserLoginRequestAction,
})(LoginForm);
