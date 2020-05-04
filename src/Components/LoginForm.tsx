import React, { Component } from "react";
import axios from "axios";
import { TextField } from "@material-ui/core";
import "../App.css";
import UserContext from "./UserContext";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import Cookies from 'js-cookie';
import {IAuthUser} from "./Interfaces";
import { RootState } from "./Redux/rootReducer";


const validationSchema = Yup.object({
  id: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
});

class LoginForm extends Component<RouteComponentProps, IAuthUser> {
  static contextType = UserContext;
  context: React.ContextType<typeof UserContext>;

  constructor(props: RouteComponentProps) {
    super(props);
    this.state = {
      id: "",
      password: "",
      error:""
    };
  }

  render() {
    return (
      <div className="rightHalf">
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={(values) => {

            var x=this;
            var history = this.props.history; //
            const { toggleAuth, setUser } = this.context!;
            
          }}
        >
          {({ handleSubmit, handleChange, errors }) => (
            <form onSubmit={handleSubmit}>
              <div>{this.state.error}</div>
              <h1 className="form-heading underline">Log In</h1>
              <TextField
                margin="normal"
                className="bg-white"
                type="text"
                onChange={handleChange}
                name="id"
                label="id"
                helperText={errors.id}
              />
              <TextField
                margin="normal"
                className="bg-white"
                type="text"
                onChange={handleChange}
                name="password"
                label="password"
                helperText={errors.password}
              />
              <button type="submit" className="submit bg-darkorange">
                Log In
              </button>
              <div className="form-group white">
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


//completed

const mapStateToProps = (state:RootState,ownProps:IAuthUser) => {
    user: state.user,
}

const mapDispatchToProps = (dispatch,props) => {  
    loginUser:IAuthUser=>dispatch(loginUser(user))
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm)