import React, { Component } from "react";
import Home from "./components/Home/Home";
import Charts from "./components/Charts/Charts";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Home />
        <Charts />
      </div>
    );
  }
}

export default App;
