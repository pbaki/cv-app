import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "../styles/experience.css";

class Experience extends Component {
  constructor(props) {
    super();
    this.displayData = [];
    this.tempDisplayData = [];
    this.inputStartYear = "";
    this.inputEndYear = "";
    this.inputCompanyName = "";
    this.inputPositionName = "";
    this.inputDescription = "";
    this.state = {
      mode: 1,
      cards: [],
      ifCalled: 0,
    };
    this.editMode = this.editMode.bind(this);
    this.getInputValues = this.getInputValues.bind(this);
    this.addCards = this.addCards.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  getInputValues(val1, val2, val3, val4, val5) {
    this.inputStartYear = val1;
    this.inputEndYear = val2;
    this.inputCompanyName = val3;
    this.inputPositionName = val4;
    this.inputDescription = val5;
  }
  addCards() {
    if (
      this.inputStartYear !== "" ||
      this.inputEndYear !== "" ||
      this.inputCompanyName !== "" ||
      this.inputPositionName !== ""
    ) {
      this.displayData.push(
        <ExperienceCard
          key={uuid()}
          experienceTime={this.inputStartYear + " - " + this.inputEndYear}
          companyName={this.inputCompanyName}
          companyPosition={this.inputPositionName}
          companyDescription={this.inputDescription}
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
        <ExperienceCard
          key={uuid()}
          experienceTime={"1800 - 1900"}
          companyName={"Some Name"}
          companyPosition={"Some Position"}
          companyDescription={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />,
        <ExperienceCard
          key={uuid()}
          experienceTime={"1900 - 1920"}
          companyName={"Some Name"}
          companyPosition={"Some Position"}
          companyDescription={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          }
        />,
      ];
      this.setState({
        cards: this.displayData,
        ifCalled: this.state.ifCalled + 1,
      });
    }
  }

  render() {
    return (
      <div className="experience">
        <div className="experienceContainer">
          <h2>Experience</h2>
          <button
            className="editButton"
            onClick={async () => {
              await this.editMode();
              if (this.state.mode === 1) {
                this.setState({
                  cards: this.displayData,
                });
              } else {
                this.addDeleteCard();
              }
            }}
          >
            Edit
          </button>
        </div>
        {this.state.mode === 2 ? (
          <ExperienceForm
            addExperienceCard={(val1, val2, val3, val4, val5) => {
              this.getInputValues(val1, val2, val3, val4, val5);
              this.addCards();
              this.addDeleteCard();
            }}
            cancelExperienceCard={() => {
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
class ExperienceCard extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="experienceCard">
        <p className="experienceTime">{this.props.experienceTime}</p>
        <div className="experienceCardContainer">
          <p className="companyName">{this.props.companyName}</p>
          <p className="companyPositon">{this.props.companyPosition}</p>
          <p className="companyDescripion">{this.props.companyDescription}</p>
        </div>
        {this.props.deleteButton}
      </div>
    );
  }
}
class ExperienceForm extends Component {
  constructor(props) {
    super();
    this.state = {
      val1: "",
      val2: "",
      val3: "",
      val4: "",
      val5: "",
    };
    this.handleChange1.bind(this);
    this.handleChange2.bind(this);
    this.handleChange3.bind(this);
    this.handleChange4.bind(this);
    this.handleChange5.bind(this);
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
  handleChange5 = (event) => {
    this.setState({
      val5: event.target.value,
    });
  };
  render() {
    return (
      <form>
        <div className="startingYearExperienceForm">
          <label htmlFor="startingYearExperienceForm">Starting Year:</label>
          <input
            name="startingYearExperienceForm"
            id="startingYearExperienceForm"
            type="text"
            onChange={this.handleChange1}
          ></input>
        </div>
        <div className="endingYearExperienceForm">
          <label htmlFor="endingYearExperienceForm">Ending Year:</label>
          <input
            name="endingYearExperienceForm"
            id="endingYearExperienceForm"
            type="text"
            onChange={this.handleChange2}
          ></input>
        </div>
        <div className="companyNameForm">
          <label htmlFor="companyNameForm">Company Name:</label>
          <input
            name="companyNameForm"
            id="companyNameForm"
            type="text"
            onChange={this.handleChange3}
          ></input>
        </div>
        <div className="positionNameForm">
          <label htmlFor="positionNameForm">Position Name:</label>
          <input
            name="positionNameForm"
            id="positionNameForm"
            type="text"
            onChange={this.handleChange4}
          ></input>
        </div>
        <div className="descriptionExperienceForm">
          <label htmlFor="descriptionExperienceForm">Description:</label>
          <textarea
            name="descriptionExperienceForm"
            id="descriptionExperienceForm"
            onChange={this.handleChange5}
          ></textarea>
        </div>
        <div className="experienceButtonContainer">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              this.props.addExperienceCard(
                this.state.val1,
                this.state.val2,
                this.state.val3,
                this.state.val4,
                this.state.val5
              );
            }}
          >
            Add
          </button>
          <button type="submit" onClick={this.props.cancelExperienceCard}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

export default Experience;
