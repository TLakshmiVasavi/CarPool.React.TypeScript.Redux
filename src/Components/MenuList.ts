import React from "react";
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
import UserContext from "./UserContext";
import history from "./Routing/history";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    textAlign: "center",
    fontWeight: "bold",
    paddingTop: 10,
    paddingRight: 40,
    justifyContent: "flex-end",
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

function MenuListComposition(props) {
  let isAuth;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      alert("if closing");
    }
    alert("closing");
    setOpen(false);
  };

  const handleLogout = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      alert("if logout closing");
    }
    alert("logout closing");
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      if (anchorRef.current !== null) {
        anchorRef.current.focus();
      }
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <UserContext.Consumer>
      {(context) => (
        <React.Fragment>
          {context.signed && (
            <div className={classes.root}>
              <div>{context.user.name} </div>

              <Button
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <img src={userImg} className="imgRound" />
              </Button>
              <Popper
                open={open}
                anchorEl={anchorRef.current}
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
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="menu-list-grow"
                          onKeyDown={handleListKeyDown}
                        >
                          <MenuItem
                            component={Link}
                            to="/UserProfile"
                            onClick={handleClose}
                          >
                            Profile
                          </MenuItem>
                          <MenuItem
                            component={Link}
                            to="/MyRides"
                            onClick={handleClose}
                          >
                            My Rides
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              handleLogout(e);
                              context.toggleAuth();
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
        </React.Fragment>
      )}
    </UserContext.Consumer>
  );
}

export default withRouter(MenuListComposition);
