import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuid } from "uuid";
import "../styles/education.css";

class Education extends Component {
  constructor(props) {
    super();
    this.state = {
      mode: 1,
      cards: [],
      updatedCards: [],
      inputStartYear: "",
      inputEndYear: "",
      inputSchoolName: "",
      inputDescription: "",
    };
    this.editMode.bind(this);
    this.getInputValues.bind(this);
    this.addCards.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  getInputValues(val1, val2, val3, val4) {
    this.setState({
      inputStartYear: val1,
      inputEndYear: val2,
      inputSchoolName: val3,
      inputDescription: val4,
    });
  }
  addCards() {
    this.setState({
      cards: this.state.cards.concat(
        <EducationCard
          educationTime={
            this.state.inputStartYear + " " + this.state.inputEndYear
          }
          schoolName={this.state.inputSchoolName}
          description={this.state.inputDescription}
        />
      ),
    });
  }
  render() {
    return (
      <div className="education">
        <div className="educationContainer">
          <h2>Education</h2>
          <button
            className="editButton"
            onClick={(e) => {
              e.preventDefault();
              this.editMode();
            }}
          >
            Edit
          </button>
        </div>
        {this.state.mode === 2 ? (
          <EducationForm
            addEducationCard={(val1, val2, val3, val4) => {
              this.getInputValues(val1, val2, val3, val4);
              this.addCards();
              this.editMode();
            }}
            // cancelEducationCard={s}
          />
        ) : (
          ""
        )}
        <EducationCard educationTime="123" schoolName="345" description="678" />
        <EducationCard educationTime="123" schoolName="345" description="678" />
        {}
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
        <p className="educationTime">{this.props.educationTime}</p>
        <div className="educationCardContainer">
          <p className="schoolName">{this.props.schoolName}</p>
          <p className="schoolDescripion">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

class EducationForm extends Component {
  constructor(props) {
    super();
    this.state = {
      val1: "",
      val2: "",
      val3: "",
      val4: "",
    };
    this.handleChange1.bind(this);
    this.handleChange2.bind(this);
    this.handleChange3.bind(this);
    this.handleChange4.bind(this);
  }
  handleChange1 = (event) => {
    this.setState({
      val1: event.target.value,
    });
  };
  handleChange2 = (event) => {
    this.setState({
      val2: event.target.value,
    });
  };
  handleChange3 = (event) => {
    this.setState({
      val3: event.target.value,
    });
  };
  handleChange4 = (event) => {
    this.setState({
      val4: event.target.value,
    });
  };
  render() {
    return (
      <div className="educationForm">
        <form>
          <p>Education Details</p>
          <div className="startingYearForm">
            <label htmlFor="startingYearForm">Starting Year:</label>
            <input
              name="startingYearForm"
              id="startingYearForm"
              type="text"
              onChange={this.handleChange1}
            ></input>
          </div>
          <div className="endingYearForm">
            <label htmlFor="endingYearForm">Ending Year:</label>
            <input
              name="endingYearForm"
              id="endingYearForm"
              type="text"
              onChange={this.handleChange2}
            ></input>
          </div>
          <div className="schoolNameForm">
            <label htmlFor="schoolNameForm">College/School Name:</label>
            <input
              name="schoolNameForm"
              id="schoolNameForm"
              type="text"
              onChange={this.handleChange3}
            ></input>
          </div>
          <div className="descriptionForm">
            <label htmlFor="descriptionForm">Description:</label>
            <textarea
              name="descriptionForm"
              id="descriptionForm"
              onChange={this.handleChange4}
            ></textarea>
          </div>
          <div className="educationButtonContainer">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.addEducationCard(
                  this.state.val1,
                  this.state.val2,
                  this.state.val3,
                  this.state.val4
                );
              }}
            >
              Add
            </button>
            <button type="submit" onClick={this.props.cancelEducationCard}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
class renderFormData extends Component {}

export default Education;
