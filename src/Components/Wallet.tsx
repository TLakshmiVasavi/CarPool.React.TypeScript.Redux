import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { RouteComponentProps } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import userActions from "./Redux/User/UserActions";
import { connect } from "react-redux";
import { Types } from "./Interfaces";
import { AppState } from "./Redux/rootReducer";

const validationSchema = Yup.object({
  balance: Yup.number().required("Required"),
});

class Wallet extends Component<IProps, Types.IWallet> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      balance: 0,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e: any) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <Formik
        enableReinitialize
        initialValues={this.state}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          this.props.updateBalance(this.state);
        }}
      >
        {({ handleSubmit, handleChange, errors }) => (
          <div className="form-center">
            <form onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                className="bg-white rounded-corners"
                type="number"
                onChange={this.handleChange}
                name={errors.balance ?? "balance"}
                label="Amount"
              />
              <button type="submit" className="submit bg-darkorange">
                Submit
              </button>
            </form>
          </div>
        )}
      </Formik>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: state.user.isLoggedIn,
});

interface DispatchProps {
  updateBalance: (data: Types.IWallet) => void;
}

export default connect(null, {
  updateBalance: userActions.UpdateBalanceAction,
})(Wallet);
