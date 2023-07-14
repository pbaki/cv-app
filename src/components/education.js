import React, { Component } from "react";
import { v4 as uuid } from "uuid";
import "../styles/education.css";

class Education extends Component {
  constructor(props) {
    super();
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
    this.inputStartYear = "";
    this.inputEndYear = "";
    this.inputSchoolName = "";
    this.inputDescription = "";
    this.state = {
      shouldGetData: true,
      counter: 0,
      mode: 1,
      cards: this.displayData,
    };
    this.editMode.bind(this);
    this.getInputValues.bind(this);
    this.addCards.bind(this);
    this.addDeleteCard.bind(this);
    this.removeDeleteButton = this.removeDeleteButton.bind(this);
  }

  editMode() {
    this.setState((prevState) => ({
      mode: prevState.mode === 1 ? 2 : 1,
    }));
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
      const newCard = (
        <EducationCard
          key={uuid()}
          educationTime={this.inputStartYear + " - " + this.inputEndYear}
          schoolName={this.inputSchoolName}
          description={this.inputDescription}
        />
      );

      this.displayData.push(newCard);

      this.setState({
        cards: this.displayData,
      });
    }
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
          <EducationCard
            key={val.key}
            educationTime={val.props.educationTime}
            schoolName={val.props.schoolName}
            description={val.props.description}
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
      this.props.geteduCards(this.state.cards);
    }
    if (
      this.state.shouldGetData &&
      this.props.eduCards[0] &&
      this.props.eduCards[0].description !== undefined
    ) {
      const dataToRender = [];
      for (let card of this.props.eduCards) {
        dataToRender.push(
          <EducationCard
            key={card.key}
            educationTime={card.educationTime}
            schoolName={card.schoolName}
            description={card.description}
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
      <div className="education">
        <div className="educationContainer">
          <h2>Education</h2>
          <button
            className="editButton"
            onClick={(e) => {
              e.preventDefault();
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
          <EducationForm
            addEducationCard={(val1, val2, val3, val4) => {
              this.getInputValues(val1, val2, val3, val4);
              this.addCards();
              this.addDeleteCard();
            }}
            cancelEducationCard={() => {
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
