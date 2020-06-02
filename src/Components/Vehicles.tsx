import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { AppState } from "./Redux/rootReducer";
import {
  UserRequestActions,
  getVehicles,
  getAllVehicles,
} from "./Redux/User/UserActions";
import React from "react";
import { Types, vehicleType } from "./Interfaces";
import { Row, Col, Container } from "react-grid-system";
import Modal from "./PopUp";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";

let userActions = new UserRequestActions();

interface IState extends Types.IVehicle {
  selected: string;
  open: boolean;
}

const validationSchema = Yup.object({
  model: Yup.string().required("Required"),
  capacity: Yup.number().required("Required"),
});

class Vehicles extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      selected: "",
      open: false,
      model: "",
      capacity: 0,
      number: "",
      type: "",
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
  }
  modalOpen(item: Types.IVehicle) {
    this.setState({ selected: item.number });
    this.setState({ ...item });
    this.setState({ open: true });
  }

  modalClose(e: any) {
    const currentTarget = e.currentTarget;
    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({
          open: false,
        });
      }
    }, 0);
  }
  render() {
    if (!this.props.isLoggedIn) {
      this.props.history.push("/");
    }
    return (
      <>
        <>
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
                  <small>Capacity</small>
                  <p>{item.capacity}</p>
                  {this.props.userRole == "User" && (
                    <button
                      onClick={() => {
                        this.modalOpen(item);
                      }}
                    >
                      edit
                    </button>
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </>
        <Modal show={this.state.open} handleClose={this.modalClose}>
          <Formik
            enableReinitialize
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              this.props.updateVehicle(
                values,
                this.props.userId,
                this.props.token,
                this.state.selected
              );
            }}
          >
            {({ handleSubmit, handleChange, errors }) => (
              <div className="form-center">
                <form onSubmit={handleSubmit}>
                  <TextField
                    margin="normal"
                    className="bg-white rounded-corners"
                    name="type"
                    select
                    label="Vehicle"
                    onChange={handleChange}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    {vehicleType.map((option) => (
                      <option key={option.label} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <TextField
                    margin="normal"
                    className="bg-white rounded-corners"
                    type="text"
                    onChange={handleChange}
                    name="model"
                    label={errors.model ?? "model"}
                  />
                  <TextField
                    margin="normal"
                    className="bg-white rounded-corners"
                    type="text"
                    onChange={handleChange}
                    name="number"
                    label={errors.number ?? "number"}
                  />
                  <TextField
                    margin="normal"
                    className="bg-white rounded-corners"
                    type="number"
                    onChange={handleChange}
                    name="capacity"
                    label={errors.capacity ?? "capacity"}
                  />

                  <button type="submit" className="submit bg-darkorange">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </Formik>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: RouteComponentProps) => ({
  history: ownProps.history,
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.mail,
  userRole: state.user.role,
  vehicles:
    state.user.role == "User"
      ? getVehicles(
          state.user.isVehiclesLoading,
          state.user.isVehiclesLoaded,
          state.user.mail,
          state.user.token
        )
      : getAllVehicles(
          state.user.isVehiclesLoading,
          state.user.isVehiclesLoaded,
          state.user.token
        ),
  token: state.user.token,
});

interface DispatchProps {
  updateVehicle: (
    vehicle: Types.IVehicle,
    vehicleId: string,
    userId: string,
    token: string
  ) => void;
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

export default connect(mapStateToProps, {
  updateVehicle: userActions.UpdateVehicleRequestAction,
})(Vehicles);
