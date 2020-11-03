/* eslint-disable react/prefer-stateless-function */
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/home";
import NavBar from "./pages/navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar/>
          <Route exact path="/" component={Landing} />
          <Route exact path="/home" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
