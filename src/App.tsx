import React from "react";
import { BrowserRouter as Router, Route,BrowserRouterProps } from "react-router-dom";
import history from "./Components/Routing/history";
import Routes from "./Components/Routing/Routes";
import MenuListComposition from "./Components/MenuList";
import "./App.css";
import { UserProvider } from "./Components/UserContext";
import configureStore from "./Components/Redux/Store";
import { Provider } from "react-redux";

const store = configureStore();

class App extends React.Component<BrowserRouterProps>
{
  render()
  {
  return (
    <div className="App">
      <Provider store={store}>
      <UserProvider>
        <Router>
          <MenuListComposition />
          <Routes />
        </Router>
      </UserProvider>
      </Provider>
    </div>
  );
  }
}

export default App;
