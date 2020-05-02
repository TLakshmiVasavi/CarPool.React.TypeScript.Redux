import React from "react";
import { BrowserRouter as Router, Route,BrowserRouterProps } from "react-router-dom";
import history from "./Components/Routing/history";
import Routes from "./Components/Routing/Routes";
import MenuListComposition from "./Components/MenuList";
import "./App.css";
import { UserProvider } from "./Components/UserContext";

class App extends React.Component<BrowserRouterProps>
{
  render()
  {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <MenuListComposition />
          <Routes />
        </Router>
      </UserProvider>
    </div>
  );
  }
}

export default App;
