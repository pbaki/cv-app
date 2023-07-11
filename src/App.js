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
  getSkills(skills) {
    this.setState({
      skills: skills,
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
            />
          </div>
          <div className="rightContainer">
            <Summary getSummary={this.getSummary} />
            <Education geteduCards={this.geteduCards} />
            <Experience getexpCards={this.getexpCards} />
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
          />
        </div>
      </>
    );
  }
}
export default App;
