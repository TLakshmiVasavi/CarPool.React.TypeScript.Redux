import React, { ReactFragment } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import userImg from "../Images/Vasavi.jpg";
import "../App.css";
import history from "./Routing/history";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { connect, DispatchProp } from "react-redux";
import { Logout } from "./Redux/User/UserActions";
import { AppState } from "./Redux/rootReducer";

const open: Boolean = false;
interface MenuState {
  open: boolean;
}

class UserMenuList extends React.Component<
  RouteComponentProps & DispatchProps & IState,
  MenuState
> {
  constructor(props: RouteComponentProps & DispatchProps & IState) {
    super(props);
    this.state = { open: false };
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
  handleClose = (event: any) => {
    this.setState({ open: false });
  };
  handleLogout = (event: any) => {
    this.props.Logout();
    this.setState({ open: false });
  };

  render() {
    var url = "data:image/png;base64,";
    return (
      <>
        {this.props.isLoggedIn && (
          <div>
            <div>{this.props.name}</div>
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
                      <MenuList
                        autoFocusItem={this.state.open}
                        id="menu-list-grow"
                        onKeyDown={this.handleListKeyDown}
                      >
                        <MenuItem component={Link} to="/Profile">
                          Profile
                        </MenuItem>
                        <MenuItem component={Link} to="/MyRides">
                          My Rides
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.handleLogout(e);
                          }}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
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
interface IState {
  photo: any;
  name: string;
  isLoggedIn: boolean;
}
const mapStateToProps = (state: AppState) => ({
  photo: state.user.photo,
  name: state.user.name,
  isLoggedIn: state.user.isLoggedIn,
});
interface DispatchProps {
  Logout: () => void;
}
export default connect(mapStateToProps, { Logout })(withRouter(UserMenuList));
