import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import { v4 as uuid } from "uuid";
import "../styles/education.css";

class Education extends Component {
  constructor(props) {
    super();
    this.displayData = [];
    this.inputStartYear = "";
    this.inputEndYear = "";
    this.inputSchoolName = "";
    this.inputDescription = "";
    this.state = {
      mode: 1,
      cards: [],
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
    this.inputStartYear = val1;
    this.inputEndYear = val2;
    this.inputSchoolName = val3;
    this.inputDescription = val4;
  }
  addCards() {
    if (
      this.inputStartYear !== "" ||
      this.inputEndYear !== "" ||
      this.inputSchoolName !== "" ||
      this.inputDescription !== ""
    ) {
      this.displayData.push(
        <EducationCard
          key={uuid()}
          educationTime={this.inputStartYear + " - " + this.inputEndYear}
          schoolName={this.inputSchoolName}
          description={this.inputDescription}
        />
      );
    }

    this.setState({
      cards: this.displayData,
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
            cancelEducationCard={() => {
              this.editMode();
            }}
          />
        ) : (
          ""
        )}
        <EducationCard educationTime="123" schoolName="345" description="678" />
        <EducationCard educationTime="123" schoolName="345" description="678" />
        {this.state.cards.map((val) => {
          return val;
        })}
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
