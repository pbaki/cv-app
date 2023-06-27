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
    this.state = {
      mode: 1,
      name: "Name here",
    };
    this.editMode = this.editMode.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  onModeChange() {
    if (this.state.mode === 1) {
      return <h1>{this.state.name}</h1>;
    } else {
      return (
        <NameForm
          defaultName={this.state.name}
          getValue={this.onNameChange}
          editMode={this.editMode}
        />
      );
    }
  }
  onNameChange(value) {
    this.setState({
      name: value,
    });
  }

  render() {
    return (
      <div className="name">
        {this.onModeChange()}
        <button className="editButton" onClick={this.editMode}>
          Edit
        </button>
      </div>
    );
  }
}
class NameForm extends Component {
  constructor(props) {
    super();
    this.state = {
      onNameChange: "",
    };
    this.getTargetValue = this.getTargetValue.bind(this);
  }
  getTargetValue(event) {
    this.setState({
      onNameChange: event.target.value,
    });
  }
  render() {
    return (
      <div className="nameForm">
        <form>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={this.props.defaultName}
            onChange={this.getTargetValue}
          ></input>
          <div className="nameButtons">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.getValue(
                  this.state.onNameChange === ""
                    ? this.props.defaultName
                    : this.state.onNameChange
                );
                this.props.editMode();
              }}
            >
              Submit
            </button>
            <button onClick={this.props.editMode}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}
class Contact extends Component {
  constructor(props) {
    super();
    this.state = {
      mode: 1,
      phone: "123456789",
      email: "asd@qwe",
    };
    this.editMode = this.editMode.bind(this);
    this.getValues = this.getValues.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  ifMode1() {
    if (this.state.mode === 1) {
      return [
        <p>Phone: {this.state.phone}</p>,
        <p>Email: {this.state.email}</p>,
      ];
    }
  }
  getValues(phoneValue, mailValue) {
    this.setState({
      phone: phoneValue,
      email: mailValue,
    });
  }
  ifMode2() {
    if (this.state.mode === 2) {
      return (
        <ContactForm
          phoneDefaultValue={this.state.phone}
          emailDefaultValue={this.state.email}
          getValues={this.getValues}
          editMode={this.editMode}
        />
      );
    }
  }

  render() {
    return (
      <div className="contact">
        <div className="contactContainer">
          <h2>Contact Info</h2>
          <button
            className="editButton"
            onClick={() => {
              this.editMode();
            }}
          >
            Edit
          </button>
        </div>
        {this.ifMode1()}
        {this.ifMode2()}
      </div>
    );
  }
}
class ContactForm extends Component {
  constructor(props) {
    super();
    this.state = {
      phoneValue: "",
      emailValue: "",
    };
    this.phoneValueHandler = this.phoneValueHandler.bind(this);
    this.emailValueHandler = this.emailValueHandler.bind(this);
  }
  phoneValueHandler(event) {
    this.setState({
      phoneValue: event.target.value,
    });
  }
  emailValueHandler(event) {
    this.setState({
      emailValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="contactForm">
        <form>
          <div className="phoneForm">
            <label htmlFor="phoneForm"></label>
            <input
              type="text"
              id="phoneForm"
              name="phoneForm"
              defaultValue={this.props.phoneDefaultValue}
              onChange={this.phoneValueHandler}
            ></input>
          </div>
          <div className="emailForm">
            <label htmlFor="emailForm"></label>
            <input
              type="text"
              id="emailForm"
              name="emailForm"
              defaultValue={this.props.emailDefaultValue}
              onChange={this.emailValueHandler}
            ></input>
          </div>
          <div className="contactButtons">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.getValues(
                  this.state.phoneValue === ""
                    ? this.props.phoneDefaultValue
                    : this.state.phoneValue,
                  this.state.emailValue === ""
                    ? this.props.emailDefaultValue
                    : this.state.emailValue
                );
                this.props.editMode();
              }}
            >
              Submit
            </button>
            <button onClick={this.props.editMode}>Cancel</button>
          </div>
        </form>
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
