import React, { Component } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import "../StyleSheets/LoginSignUp.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import { RouteComponentProps } from "react-router-dom";

class LoginSignUp extends Component<IProps, {}> {
  render() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/Dashboard");
    }

    return (
      <React.Fragment>
        <div className="leftHalf">
          <div className="heading">
            TURN<div className="miles"> MILES</div>
            <br />
            INTO <div className="money">MONEY</div>
            <div className="normal">RIDES ON TAP</div>
          </div>
        </div>
        <Router>
          <Switch>
            <Route exact path="/SignUp" component={SignUpForm} />
            <Route exact path="/(Login|)/" component={LoginForm} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps>;

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
});
export default connect(mapStateToProps, null)(LoginSignUp);
