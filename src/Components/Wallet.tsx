import React, { Component } from "react";
import { TextField } from "@material-ui/core";
import "../App.css";
import "../StyleSheets/Colors.css";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  UserRequestActions,
  getBalance,
  getTransactions,
} from "./Redux/User/UserActions";
import { connect } from "react-redux";
import { Types } from "./Interfaces";
import { AppState } from "./Redux/rootReducer";
import { RouteComponentProps } from "react-router-dom";

let userActions = new UserRequestActions();

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
    this.setState({ [e.target.name]: parseInt(e.target.value) });
  }

  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <>
        <Formik
          enableReinitialize
          initialValues={this.state}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            this.props.updateBalance(
              this.state,
              this.props.userId,
              this.props.token
            );
          }}
        >
          {({ handleSubmit, errors }) => (
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
        <>
          <div className="center">Balance: {this.props.balance}</div>
          <div className="payments">
            {this.props.transactions.length == 0 ? (
              <div>No transactions</div>
            ) : (
              <div>Payments</div>
            )}
            {this.props.transactions.map((item: Types.ITransaction) => (
              <>
                <div>
                  Rs. {item.amount} {item.paymentMessage}
                </div>
              </>
            ))}
          </div>
        </>
      </>
    );
  }
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  balance: getBalance(
    state.user.isLoading,
    state.user.isLoaded,
    state.user.mail,
    state.user.token
  ),
  transactions: getTransactions(
    state.user.isTransactionsLoading,
    state.user.isTransactionsLoaded,
    state.user.mail,
    state.user.token
  ),
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.mail,
  token: state.user.token,
});

interface DispatchProps {
  updateBalance: (data: Types.IWallet, userId: string, token: string) => void;
}

export default connect(mapStateToProps, {
  updateBalance: userActions.UpdateBalanceAction,
})(Wallet);
