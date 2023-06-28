import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import "../styles/general-info.css";
import { v4 as uuid } from "uuid";
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
        <p key="phone">Phone: {this.state.phone}</p>,
        <p key="email">Email: {this.state.email}</p>,
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
    this.state = {
      mode: 1,
      Instagram: "Your Instagram",
      Linkedin: "Your Linkedin",
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
        <p key="Instagram">Instagram: {this.state.Instagram}</p>,
        <p key="Linkedin"> Linkedin: {this.state.Linkedin}</p>,
      ];
    }
  }
  getValues(instagramValue, linkedinValue) {
    this.setState({
      Instagram: instagramValue,
      Linkedin: linkedinValue,
    });
  }
  ifMode2() {
    if (this.state.mode === 2) {
      return (
        <SocialForm
          instagramDefaultValue={this.state.Instagram}
          linkedinDefaultValue={this.state.Linkedin}
          getValues={this.getValues}
          editMode={this.editMode}
        />
      );
    }
  }

  render() {
    return (
      <div className="Social" key={this.props.key}>
        <div className="socialContainer">
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
class SocialForm extends Component {
  constructor(props) {
    super();
    this.state = {
      instagramValue: "",
      linkedinValue: "",
    };
    this.instagramValueHandler = this.instagramValueHandler.bind(this);
    this.linkedinValueHandler = this.linkedinValueHandler.bind(this);
  }
  instagramValueHandler(event) {
    this.setState({
      instagramValue: event.target.value,
    });
  }
  linkedinValueHandler(event) {
    this.setState({
      linkedinValue: event.target.value,
    });
  }

  render() {
    return (
      <div className="socialForm">
        <form>
          <div className="instagramForm">
            <label htmlFor="instagramForm"></label>
            <input
              type="text"
              id="instagramForm"
              name="instagramForm"
              defaultValue={this.props.instagramDefaultValue}
              onChange={this.instagramValueHandler}
            ></input>
          </div>
          <div className="linkedinForm">
            <label htmlFor="linkedinForm"></label>
            <input
              type="text"
              id="linkedinForm"
              name="linkedinForm"
              defaultValue={this.props.linkedinDefaultValue}
              onChange={this.linkedinValueHandler}
            ></input>
          </div>
          <div className="socialButtons">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                this.props.getValues(
                  this.state.instagramValue === ""
                    ? this.props.instagramDefaultValue
                    : this.state.instagramValue,
                  this.state.linkedinValue === ""
                    ? this.props.linkedinDefaultValue
                    : this.state.linkedinValue
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
class Skills extends Component {
  constructor(props) {
    super();
    this.tempArray = [];
    this.state = {
      mode: 1,
      skillsList: [],
    };
    this.editMode = this.editMode.bind(this);
    this.getSkill = this.getSkill.bind(this);
    this.skillWithDel = this.skillWithDel.bind(this);
  }
  editMode() {
    this.setState({
      mode: this.state.mode === 1 ? 2 : 1,
    });
  }
  getSkill(skillName) {
    this.setState({
      skillsList: this.state.skillsList.concat(
        <SkillListElement
          skillName={skillName}
          deleteButton={this.props.deleteButton}
        />
      ),
    });
  }
  skillWithDel() {
    this.state.skillsList.map((ele, index) => {
      if (this.state.mode === 2) {
        let deleteButton2 = (
          <>
            <button
              onClick={() => {
                this.tempArray.splice(index - 1, 1);
                this.setState({
                  skillsList: this.tempArray,
                });
                this.skillWithDel();
              }}
            >
              Del
            </button>
          </>
        );
        this.tempArray[index] = (
          <SkillListElement
            skillName={ele.props.skillName}
            deleteButton={deleteButton2}
          />
        );
      } else {
        this.tempArray[index] = (
          <SkillListElement skillName={ele.props.skillName} />
        );
      }
    });
    this.setState({
      skillsList: this.tempArray,
    });
  }

  render() {
    return (
      <div className="skills">
        <div className="skillsContainer">
          <h2>Skills</h2>
          <button
            className="editButton"
            onClick={async () => {
              await this.editMode();
              this.skillWithDel();
            }}
          >
            Edit
          </button>
        </div>
        {this.state.mode === 2 ? (
          <SkillsForm
            editMode={this.editMode}
            getSkill={this.getSkill}
            update={this.skillWithDel}
            delDelButtons={this.skillWithDel}
          />
        ) : (
          ""
        )}

        <ul>
          {this.state.skillsList.map((val) => {
            return <div key={uuid()}> {val}</div>;
          })}
        </ul>
      </div>
    );
  }
}
class SkillListElement extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <li>
        {this.props.skillName} {this.props.deleteButton}
      </li>
    );
  }
}
class SkillsForm extends Component {
  constructor(props) {
    super();
    this.state = {
      skillName: "",
    };
    this.skillInputHandler = this.skillInputHandler.bind(this);
  }
  skillInputHandler(event) {
    this.setState({
      skillName: event.target.value,
    });
  }

  render() {
    return (
      <div className="skills">
        <form>
          <div className="skillInput">
            <label htmlFor="skillInput"></label>
            <input
              type="text"
              id="skillInput"
              name="skillInput"
              onChange={this.skillInputHandler}
            ></input>
          </div>
          <div className="skillsButtons">
            <button
              type="submit"
              onClick={async (e) => {
                e.preventDefault();
                await this.props.getSkill(this.state.skillName);
                this.props.update();
                //this.props.editMode();
              }}
            >
              Add
            </button>
            <button
              onClick={async () => {
                await this.props.editMode();
                this.props.delDelButtons();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
        <ul>{this.props.listOfSkills}</ul>
      </div>
    );
  }
}

export default GeneralInfo;
