import React, { Component } from "react";
import "../styles/general-info.css";
import { v4 as uuid } from "uuid";
class GeneralInfo extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <>
        <Name getName={this.props.getName} name={this.props.name} />
        <Contact
          phone={this.props.phone}
          email={this.props.email}
          getPhone={this.props.getPhone}
          getMail={this.props.getMail}
        />
        <Social
          getInstagram={this.props.getInstagram}
          getLinkedin={this.props.getLinkedin}
          instagram={this.props.instagram}
          linkedin={this.props.linkedin}
        />
        <Skills skills={this.props.skills} getSkills={this.props.getSkills} />
      </>
    );
  }
}
class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldGetData: true,
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
          getName={this.props.getName}
        />
      );
    }
  }
  onNameChange(value) {
    this.setState({
      name: value,
    });
  }
  componentDidMount() {
    this.props.getName(this.state.name);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.name !== prevState.name) {
      this.props.getName(this.state.name);
    }
    if (this.state.shouldGetData && this.state.name !== this.props.name) {
      this.setState({
        name: this.props.name,
        shouldGetData: false,
      });
    }
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
                this.props.getName(this.state.onNameChange);
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
      shouldGetData: true,
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
  getValues(phoneValue, mailValue) {
    this.setState(
      {
        phone: phoneValue,
        email: mailValue,
      },
      () => {
        this.props.getPhone(this.state.phone);
        this.props.getMail(this.state.email);
      }
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.phone !== prevState.phone) {
      this.props.getPhone(this.state.phone);
    }
    if (this.state.email !== prevState.email) {
      this.props.getMail(this.state.email);
    }
    if (
      this.state.shouldGetData &&
      (this.state.phone !== this.props.phone ||
        this.state.email !== this.props.email) &&
      (this.props.email !== "" || this.props.phone !== "")
    ) {
      console.log("asd");
      this.setState({
        phone: this.props.phone,
        email: this.props.email,
        shouldGetData: false,
      });
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
        {this.state.mode === 1 ? (
          <>
            <p key="phone">Phone: {this.state.phone}</p>
            <p key="email">Email: {this.state.email}</p>
          </>
        ) : null}
        {this.state.mode === 2 ? (
          <ContactForm
            phoneDefaultValue={this.state.phone}
            emailDefaultValue={this.state.email}
            getValues={this.getValues}
            editMode={this.editMode}
          />
        ) : null}
      </div>
    );
  }
}
class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneValue: props.phoneDefaultValue,
      emailValue: props.emailDefaultValue,
    };
    this.phoneValueHandler = this.phoneValueHandler.bind(this);
    this.emailValueHandler = this.emailValueHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    const phoneValue = this.state.phoneValue || this.props.phoneDefaultValue;
    const emailValue = this.state.emailValue || this.props.emailDefaultValue;
    this.props.getValues(phoneValue, emailValue);
    this.props.editMode();
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
              value={this.state.phoneValue}
              onChange={this.phoneValueHandler}
            ></input>
          </div>
          <div className="emailForm">
            <label htmlFor="emailForm"></label>
            <input
              type="text"
              id="emailForm"
              name="emailForm"
              value={this.state.emailValue}
              onChange={this.emailValueHandler}
            ></input>
          </div>
          <div className="contactButtons">
            <button type="submit" onClick={this.handleSubmit}>
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
      shouldGetData: true,
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
    this.setState(
      {
        Instagram: instagramValue,
        Linkedin: linkedinValue,
      },
      () => {
        this.props.getInstagram(this.state.Instagram);
        this.props.getLinkedin(this.state.Linkedin);
      }
    );
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
  componentDidUpdate(prevProps, prevState) {
    if (this.state.Instagram !== prevState.Instagram) {
      this.props.getInstagram(this.state.Instagram);
    }
    if (this.state.Linkedin !== prevState.Linkedin) {
      this.props.getLinkedin(this.state.Linkedin);
    }
    if (
      this.state.shouldGetData &&
      (this.state.Instagram !== this.props.instagram ||
        this.state.Linkedin !== this.props.linkedin) &&
      (this.props.linkedin !== "" || this.props.instagram !== "")
    ) {
      this.setState({
        Instagram: this.props.instagram,
        Linkedin: this.props.linkedin,
        shouldGetData: false,
      });
    }
  }
  render() {
    return (
      <div className="Social" key={this.props.key}>
        <div className="socialContainer">
          <h2>Social</h2>
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
      shouldGetData: true,
      mode: 1,
      skillsList: [
        <SkillListElement skillName="Skill 1" />,
        <SkillListElement skillName="Skill 2" />,
      ],
      ifCalled: 0,
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
    const updatedSkillsList = this.state.skillsList.map((ele, index) => {
      if (this.state.mode === 2) {
        return (
          <SkillListElement
            key={index}
            skillName={ele.props.skillName}
            deleteButton={
              <button
                onClick={() => {
                  this.setState(
                    (prevState) => ({
                      skillsList: prevState.skillsList.filter(
                        (skill, i) => i !== index
                      ),
                    }),
                    () => {
                      this.skillWithDel();
                    }
                  );
                }}
              >
                Del
              </button>
            }
          />
        );
      } else {
        return <SkillListElement key={index} skillName={ele.props.skillName} />;
      }
    });

    this.setState({
      skillsList: updatedSkillsList,
    });
  }

  componentDidMount() {
    this.props.getSkills(this.state.skillsList);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.skillsList !== prevState.skillsList) {
      this.props.getSkills(this.state.skillsList);
    }
    if (
      this.state.shouldGetData &&
      this.state.skillsList !== this.props.skills &&
      this.props.skills.length !== 0 &&
      this.state.mode === 1
    ) {
      const makeComponentFromProps = [];
      for (let skill of this.props.skills) {
        makeComponentFromProps.push(
          <SkillListElement skillName={skill.skillName} />
        );
      }
      this.setState({
        skillsList: makeComponentFromProps,
        shouldGetData: false,
      });
    }
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
