import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "../styles/general-info.css";

class GeneralInfo extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <Name />
        <Contact />
        <Social />
        <Skills />
      </div>
    );
  }
}
class Name extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="name">
        <h1>Name here</h1>
        <button className="editButton">Edit</button>
      </div>
    );
  }
}
class Contact extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="contact">
        <div className="contactContainer">
          <h2>Contact Info</h2>
          <button className="editButton">Edit</button>
        </div>
        <p>Phone: 123456789</p>
        <p>Email: asd@asd</p>
      </div>
    );
  }
}
class Social extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="social">
        <div className="socialContainer">
          <h2>Social</h2>
          <button className="editButton">Edit</button>
        </div>
        <p>instagram: instagram</p>
        <p>Linkedin: linkedin.com/in/user-name</p>
      </div>
    );
  }
}
class Skills extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div className="skills">
        <div className="skillsContainer">
          <h2>Skills</h2>
          <button className="editButton">Edit</button>
        </div>
        <ul>
          <li>skill 1</li>
          <li>skill 2</li>
          <li>skill 3</li>
          <li>skill 4</li>
        </ul>
      </div>
    );
  }
}

export default GeneralInfo;
