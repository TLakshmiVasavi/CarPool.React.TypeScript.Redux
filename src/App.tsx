import React from "react";
import { BrowserRouter as Router, BrowserRouterProps } from "react-router-dom";
//import { Router, Route, Switch, Link, NavLink } from "react-router-dom";
import Routes from "./Components/Routes";
import MenuListComposition from "./Components/MenuList";
import "./App.css";
import { store } from "./Components/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import createHistory from "history/createBrowserHistory";
import "react-toastify/dist/ReactToastify.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <ToastContainer hideProgressBar={true} />
            <MenuListComposition />
            <Routes />
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
