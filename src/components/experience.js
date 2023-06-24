import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "../styles/experience.css";

class Experience extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="experience">
        <div className="experienceContainer">
          <h2>Experience</h2>
          <button className="editButton">Edit</button>
        </div>
        <ExperienceCard />
      </div>
    );
  }
}
class ExperienceCard extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="experienceCard">
        <p className="experienceTime">1999-2003</p>
        <div className="experienceCardContainer">
          <p className="companyName">Company Name</p>
          <p className="companyPositon">Position</p>
          <p className="companyDescripion">Description</p>
        </div>
      </div>
    );
  }
}

export default Experience;
