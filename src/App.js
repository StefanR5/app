import React, { Component } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Nomatch from "./Components/Nomatch";
import history from "./history";
import Header from "./Header";
import MainComponent from "./Components/MainComponent";
import CarDetails from "./Components/CarDetails";

//const App = (props) => {};
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Header />

        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/logout" component={Login} />
        <Route exact path="/maincomp" component={MainComponent} />
        <Route exact path="/details/:id" component={CarDetails} />
      </Router>
    );
  }
}

export default App;
