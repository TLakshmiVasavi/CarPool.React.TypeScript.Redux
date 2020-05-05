import React, { ReactFragment } from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
//import userImg from "../Images/Vasavi";
import "../App.css";
import history from "./Routing/history";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";

const open: Boolean = false;
interface MenuState {
  open: boolean;
}

class UserMenuList extends React.Component<RouteComponentProps, boolean> {
  private anchorRef = React.createRef<HTMLButtonElement>();
  constructor(props: RouteComponentProps) {
    super(props);
    this.state = false;

    //this.anchorRef = React.createRef();
  }
  handleToggle = () => {
    this.setState(!this.state);
  };
  handleListKeyDown = (event: any) => {
    if (event.key === "Tab") {
      event.preventDefault();
      this.setState(false);
    }
  };
  handleClose = (event: any) => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      alert("if closing");
    }
    alert("closing");
    this.setState(false);
  };
  handleLogout = (event: any) => {
    if (
      this.anchorRef.current &&
      this.anchorRef.current.contains(event.target)
    ) {
      alert("if logout closing");
    }
    alert("logout closing");
    this.setState(false);
  };
  componentDidMount() {
    // if (prevOpen.current === true && open === false) {
    if (this.anchorRef.current !== null) {
      this.anchorRef.current.focus();
    }
  }

  //   prevOpen.current = open;
  // }
  render() {
    //const anchorRef=this.anchorRef
    return (
      <div>
        <div>Vasavi</div>
        <Button
          ref={this.anchorRef}
          //ref={this.anchorRef}
          aria-controls={this.state ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={this.handleToggle}
        >
          {/* <img src={userImg} className="imgRound" /> */}
        </Button>
        <Popper
          open={this.state}
          anchorEl={this.anchorRef.current}
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
                    autoFocusItem={this.state}
                    id="menu-list-grow"
                    onKeyDown={this.handleListKeyDown}
                  >
                    <MenuItem
                      component={Link}
                      to="/UserProfile"
                      onClick={this.handleClose}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/MyRides"
                      onClick={this.handleClose}
                    >
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
    );
  }
}

export default UserMenuList;
