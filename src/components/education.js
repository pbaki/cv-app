import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "../styles/education.css";

class Education extends Component {
  constructor(props) {
    super();
    this.displayData = [];
    this.tempDisplayData = [];
    this.inputStartYear = "";
    this.inputEndYear = "";
    this.inputSchoolName = "";
    this.inputDescription = "";
    this.state = {
      mode: 1,
      cards: [],
      ifCalled: 0,
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
  addDeleteCard() {
    this.displayData.forEach((val, index) => {
      let deleteButton2 = (
        <button
          onClick={() => {
            this.displayData.splice(index, 1);
            this.tempDisplayData.splice(index, 1);
            this.setState({
              cards: this.tempDisplayData,
            });
            this.addDeleteCard();
          }}
        >
          Del
        </button>
      );

      const ClonedElementWithMoreProps = React.cloneElement(val, {
        deleteButton: deleteButton2,
      });
      this.tempDisplayData[index] = ClonedElementWithMoreProps;
    });

    this.setState({
      cards: this.tempDisplayData,
    });
  }
  componentDidMount() {
    if (this.state.cards.length === 0 && this.state.ifCalled === 0) {
      this.displayData = [
        <EducationCard
          key={uuid()}
          educationTime={"1800 - 1900"}
          schoolName={"Some Name"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />,
        <EducationCard
          key={uuid()}
          educationTime={"1900 - 1920"}
          schoolName={"Some Name"}
          description={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />,
      ];
      this.setState({
        cards: this.displayData,
        ifCalled: this.state.ifCalled + 1,
      });
      this.props.geteduCards(this.state.cards);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.cards !== prevState.cards) {
      this.props.geteduCards(this.state.cards);
    }
  }
  render() {
    return (
      <div className="education">
        <div className="educationContainer">
          <h2>Education</h2>
          <button
            className="editButton"
            onClick={async (e) => {
              e.preventDefault();
              const temp = this.editMode();
              await temp;
              if (this.state.mode === 2) {
                this.addDeleteCard();
              } else {
                this.setState({
                  cards: this.displayData,
                });
              }
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
              this.addDeleteCard();
            }}
            cancelEducationCard={() => {
              this.setState({
                cards: this.displayData,
              });
              this.editMode();
            }}
          />
        ) : (
          ""
        )}

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
        {this.props.deleteButton}
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

export default Education;
