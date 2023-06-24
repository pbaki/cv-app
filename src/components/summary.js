import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "../styles/summary.css";

class Summary extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="summary">
        <div className="summaryContainer">
          <h2>Summary</h2>
          <button className="editButton">Edit</button>
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat
        </p>
      </div>
    );
  }
}

export default Summary;
