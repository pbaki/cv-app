import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "../styles/education.css";

class Education extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="education">
        <div className="educationContainer">
          <h2>Education</h2>
          <button className="editButton">Edit</button>
        </div>
        <EducationCard />
      </div>
    );
  }
}
class EducationCard extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="educationCard">
        <p className="educationTime">1999-2003</p>
        <div className="educationCardContainer">
          <p className="schoolName">School Name</p>
          <p className="schoolDescripion">Description</p>
        </div>
      </div>
    );
  }
}

export default Education;
