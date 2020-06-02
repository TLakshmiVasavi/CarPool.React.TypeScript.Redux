import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import "../App.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { UserRequestActions, getUserImage } from "./Redux/User/UserActions";
import { AppState } from "./Redux/rootReducer";

let userActions = new UserRequestActions();

interface MenuState {
  open: boolean;
}

class UserMenuList extends React.Component<IProps, MenuState> {
  constructor(props: IProps) {
    super(props);
    this.state = { open: false };
    this.handleClose = this.handleClose.bind(this);
    this.handleListKeyDown = this.handleListKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleListKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState({ open: false });
    }
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => {
    this.props.Logout(this.props.userId, this.props.token);
    this.setState({ open: false });
  };

  render() {
    var url = "data:image/png;base64,";
    return (
      <>
        {this.props.isLoggedIn && (
          <div className="user-menu">
            <div className="name">{this.props.name}</div>
            <Button
              aria-controls={this.state.open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              <img src={url + this.props.photo} className="imgRound" />
            </Button>
            <Popper
              open={this.state.open}
              role={undefined}
              transition
              disablePortal
              className="list"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom",
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      {this.props.userRole == "User" ? (
                        <MenuList
                          className="links"
                          autoFocusItem={this.state.open}
                          id="menu-list-grow"
                          onKeyDown={this.handleListKeyDown}
                        >
                          <MenuItem
                            component={Link}
                            to="/Profile"
                            onClick={this.handleClose}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/ChangePassword"
                            onClick={this.handleClose}
                          >
                            Change Password
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/MyRides"
                            onClick={this.handleClose}
                          >
                            My Rides
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Dashboard"
                            onClick={this.handleClose}
                          >
                            DashBoard
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Wallet"
                            onClick={this.handleClose}
                          >
                            Wallet
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/AddVehicle"
                            onClick={this.handleClose}
                          >
                            AddVehicle
                          </MenuItem>
                          <MenuItem onClick={this.handleLogout}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      ) : (
                        <MenuList
                          className="links"
                          autoFocusItem={this.state.open}
                          id="menu-list-grow"
                          onKeyDown={this.handleListKeyDown}
                        >
                          <MenuItem
                            component={Link}
                            to="/Profile"
                            onClick={this.handleClose}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Admin/Rides"
                            onClick={this.handleClose}
                          >
                            Rides
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Admin/Bookings"
                            onClick={this.handleClose}
                          >
                            Bookings
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Admin/Users"
                            onClick={this.handleClose}
                          >
                            Users
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/Admin/Vehicles"
                            onClick={this.handleClose}
                          >
                            Vehicles
                          </MenuItem>
                          <MenuItem onClick={this.handleLogout}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      )}
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  photo: getUserImage(
    state.user.isImageLoading,
    state.user.isImageLoaded,
    state.user.mail,
    state.user.token,
    state.user.isLoggedIn
  ),
  name: state.user.name,
  isLoggedIn: state.user.isLoggedIn,
  userId: state.user.mail,
  userRole: state.user.role,
  token: state.user.token,
});

interface DispatchProps {
  Logout: (userId: string, token: string) => void;
}

type IProps = ReturnType<typeof mapStateToProps> & DispatchProps;

export default connect(mapStateToProps, {
  Logout: userActions.LogoutUserAction,
})(UserMenuList);
