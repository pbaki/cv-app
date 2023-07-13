import "./styles/App.css";
import GeneralInfo from "./components/general-info";
import Summary from "./components/summary";
import Education from "./components/education";
import Experience from "./components/experience";
import AdminLogin from "./firebaseConfig";
import { Component } from "react";

class App extends Component {
  constructor() {
    super();
    this.state = {
      mode: 0,
      reRender: 0,
      email: "",
      instagram: "",
      linkedin: "",
      name: "",
      phone: "",
      skills: [],
      summary: "",
      eduCards: [],
      expCards: [],
    };
    this.getMail = this.getMail.bind(this);
    this.getInstagram = this.getInstagram.bind(this);
    this.getLinkedin = this.getLinkedin.bind(this);
    this.getName = this.getName.bind(this);
    this.getPhone = this.getPhone.bind(this);
    this.getSkills = this.getSkills.bind(this);
    this.getSummary = this.getSummary.bind(this);
    this.geteduCards = this.geteduCards.bind(this);
    this.getexpCards = this.getexpCards.bind(this);
    this.reRender = this.reRender.bind(this);
  }
  getMail(mail) {
    this.setState({
      email: mail,
    });
  }
  getInstagram(instagram) {
    this.setState({
      instagram: instagram,
    });
  }
  getLinkedin(linkedin) {
    this.setState({
      linkedin: linkedin,
    });
  }
  getName(name) {
    this.setState({
      name: name,
    });
  }
  getPhone(phone) {
    this.setState({
      phone: phone,
    });
  }
  getSkills(skills, mode) {
    this.setState({
      skills: skills,
      mode: mode,
    });
  }
  getSummary(summary) {
    this.setState({
      summary: summary,
    });
  }
  geteduCards(eduCards) {
    this.setState({
      eduCards: eduCards,
    });
  }
  getexpCards(expCards) {
    this.setState({
      expCards: expCards,
    });
  }
  reRender() {
    this.setState({
      reRender: this.state.reRender + 1,
    });
  }
  render() {
    return (
      <>
        <div className="App">
          <div className="leftContainer">
            <GeneralInfo
              getName={this.getName}
              getPhone={this.getPhone}
              getMail={this.getMail}
              getInstagram={this.getInstagram}
              getLinkedin={this.getLinkedin}
              getSkills={this.getSkills}
              email={this.state.email}
              name={this.state.name}
              phone={this.state.phone}
              instagram={this.state.instagram}
              linkedin={this.state.linkedin}
              skills={this.state.skills}
              isLogged={this.state.mode}
            />
          </div>
          <div className="rightContainer">
            <Summary
              getSummary={this.getSummary}
              summary={this.state.summary}
            />
            <Education
              geteduCards={this.geteduCards}
              eduCards={this.state.eduCards}
            />
            <Experience
              getexpCards={this.getexpCards}
              expCards={this.state.expCards}
            />
          </div>
        </div>
        <div className="login">
          <AdminLogin
            email={this.state.email}
            instagram={this.state.instagram}
            linkedin={this.state.linkedin}
            name={this.state.name}
            phone={this.state.phone}
            skills={this.state.skills}
            summary={this.state.summary}
            eduCards={this.state.eduCards}
            expCards={this.state.expCards}
            reRender={this.reRender}
            getName={this.getName}
            getPhone={this.getPhone}
            getMail={this.getMail}
            getInstagram={this.getInstagram}
            getLinkedin={this.getLinkedin}
            getSkills={this.getSkills}
            getSummary={this.getSummary}
            geteduCards={this.geteduCards}
            getexpCards={this.getexpCards}
          />
        </div>
      </>
    );
  }
}
export default App;
