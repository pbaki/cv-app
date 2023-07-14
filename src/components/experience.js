import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "../styles/experience.css";

class Experience extends Component {
  constructor(props) {
    super();
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
    this.inputStartYear = "";
    this.inputEndYear = "";
    this.inputCompanyName = "";
    this.inputPositionName = "";
    this.inputDescription = "";
    this.state = {
      shouldGetData: true,
      counter: 0,
      mode: 1,
      cards: this.displayData,
      ifCalled: 0,
    };
    this.editMode = this.editMode.bind(this);
    this.getInputValues = this.getInputValues.bind(this);
    this.addCards = this.addCards.bind(this);
    this.removeDeleteButton = this.removeDeleteButton.bind(this);
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
    if (this.state.cards.length !== 0) {
      this.displayData = this.state.cards;
    }
    const updatedData = this.displayData.map((val, index) => {
      let deleteButton2 = (
        <button
          onClick={() => {
            this.displayData.splice(index, 1);
            this.setState({
              cards: this.displayData,
            });
            this.addDeleteCard();
          }}
        >
          Del
        </button>
      );
      return React.cloneElement(val, {
        deleteButton: deleteButton2,
      });
    });

    this.displayData = updatedData;

    this.setState({
      cards: this.displayData,
    });
  }
  removeDeleteButton() {
    const tempArray = [];
    this.displayData.forEach((val) => {
      if (val.props.deleteButton) {
        tempArray.push(
          <ExperienceCard
            key={uuid()}
            experienceTime={val.props.experienceTime}
            companyName={val.props.companyName}
            companyPosition={val.props.companyPosition}
            companyDescription={val.props.companyDescription}
          />
        );
      } else {
        return val;
      }
    });
    this.displayData = tempArray;
    this.setState({
      cards: this.displayData,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.cards !== prevState.cards &&
      this.state.counter === prevState.counter
    ) {
      this.props.getexpCards(this.state.cards);
    }
    if (
      this.state.shouldGetData &&
      this.props.expCards[0] &&
      this.props.expCards[0].companyDescription !== undefined
    ) {
      const dataToRender = [];
      for (let card of this.props.expCards) {
        dataToRender.push(
          <ExperienceCard
            key={card.key}
            experienceTime={card.experienceTime}
            companyName={card.companyName}
            companyPosition={card.companyPosition}
            companyDescription={card.companyDescription}
          />
        );
      }
      this.setState({
        cards: dataToRender,
        shouldGetData: false,
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
              this.setState(
                {
                  counter: this.state.counter + 1,
                },
                async () => {
                  await this.editMode();
                  if (this.state.mode === 2 && this.state.cards.length !== 0) {
                    this.addDeleteCard();
                  } else {
                    this.removeDeleteButton();
                  }
                }
              );
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
              this.removeDeleteButton();
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
