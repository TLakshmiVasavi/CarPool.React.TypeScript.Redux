import React, { Component } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { store } from "../Redux/Store";
import { connect } from "react-redux";
import { AppState } from "../Redux/rootReducer";
import { IUser } from "../Interfaces";

interface IProps extends RouteProps {
  isPrivate?: Boolean;
  user?: IUser;
}

class RouteWrapper extends React.Component<IProps, {}> {
  render() {
    let signed = this.props.user?.isLoggedIn; //get from store
    const { isPrivate } = this.props;
    if (isPrivate && !signed) {
      return <Redirect to="/" />;
    }
    if (!isPrivate && signed) {
      return <Redirect to="/Home" />;
    }
    return (
      <Route
        exact
        path={this.props.path}
        component={this.props.component}
        isPrivate={isPrivate}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(RouteWrapper);
