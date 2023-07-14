import React, { Component } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
} from "firebase/firestore";
import Modal from "react-modal";

const firebaseConfig = {
  apiKey: "AIzaSyDoaIbqf6CJfMH-EMlkwPu1xEQo4-76YdE",
  authDomain: "cvapp-ac053.firebaseapp.com",
  projectId: "cvapp-ac053",
  storageBucket: "cvapp-ac053.appspot.com",
  messagingSenderId: "1070037464446",
  appId: "1:1070037464446:web:5e6407fb8bd0ec0d8b6f2f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export default class AdminLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      counter: 0,
      mode: 0,
      userName: "",
      email: props.email,
      giveInstagram: props.instagram,
      giveLinkedin: props.linkedin,
      giveName: props.name,
      givePhone: props.phone,
      giveSkills: props.skills,
      giveSummary: props.summary,
      giveEduCards: props.eduCards,
      giveExpCards: props.expCards,
    };
    this.handleMode = this.handleMode.bind(this);
    this.getUserName = this.getUserName.bind(this);
    this.getDataToRenderAfterLogin = this.getDataToRenderAfterLogin.bind(this);
    this.userID = this.userID.bind(this);
    this.handleAddDocument = this.handleAddDocument.bind(this);
    this.ConvertDataForFirebase = this.ConvertDataForFirebase.bind(this);
  }

  componentDidMount() {
    // Check if user is already logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.getUserName(user.displayName);
        this.handleMode();
      }
    });
  }

  handleMode() {
    this.setState((prevState) => ({
      mode: prevState.mode === 0 ? 1 : 0,
    }));
  }

  getUserName(username) {
    this.setState({
      userName: username,
    });
  }

  handleLogout = () => {
    auth.signOut().then(() => {
      this.setState({
        mode: 0,
        userName: "",
      });
      window.location.reload();
    });
  };
  ConvertDataForFirebase(skills, eduCards, expCards) {
    const skillsArray = [];
    if (
      skills.length !== 0 &&
      skills[0].props &&
      skills[0].props.skillName !== undefined
    ) {
      for (let skill of skills) {
        if (skill.props && skill.props.skillName !== undefined) {
          skillsArray.push({
            skillName: skill.props.skillName,
          });
        }
      }
    }
    const eduCardsArray = [];
    if (
      eduCards.length !== 0 &&
      eduCards[0].props &&
      eduCards[0].props.description !== undefined
    ) {
      for (let card of eduCards) {
        eduCardsArray.push({
          key: card.key,
          description: card.props.description,
          educationTime: card.props.educationTime,
          schoolName: card.props.schoolName,
        });
      }
    }

    const expCardsArray = [];
    if (
      expCards.length !== 0 &&
      expCards[0].props &&
      expCards[0].props.companyDescription !== undefined
    ) {
      for (let card of expCards) {
        expCardsArray.push({
          key: card.key,
          companyDescription: card.props.companyDescription,
          companyName: card.props.companyName,
          companyPosition: card.props.companyPosition,
          experienceTime: card.props.experienceTime,
        });
      }
    }
    return { skillsArray, eduCardsArray, expCardsArray };
  }
  userID(id) {
    this.setState({
      userID: id,
    });
  }

  async handleAddDocument(
    email,
    instagram,
    linkedin,
    name,
    phone,
    skills,
    summary,
    eduCards,
    expCards,
    userID
  ) {
    console.log(this.state.userID);
    const { skillsArray, eduCardsArray, expCardsArray } =
      this.ConvertDataForFirebase(skills, eduCards, expCards);

    try {
      const docRef = doc(firestore, "Users", userID);
      await setDoc(docRef, {
        Email: email,
        Instagram: instagram,
        Linkedin: linkedin,
        Name: name,
        Phone: phone,
        Summary: summary,
        Skills: skillsArray,
        eduCards: eduCardsArray,
        expCards: expCardsArray,
      });
      console.log("Document added, ID:", docRef.id);
    } catch (error) {
      console.error("Error adding document:", error);
    }
  }

  async getDataToRenderAfterLogin(userID) {
    console.log(this.state.userID);
    try {
      const docRef = doc(firestore, "Users", userID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        this.props.getMail(data.Email);
        this.props.getInstagram(data.Instagram);
        this.props.getLinkedin(data.Linkedin);
        this.props.getName(data.Name);
        this.props.getPhone(data.Phone);
        this.props.getSummary(data.Summary);
        this.props.getSkills(data.Skills, this.state.mode);
        this.props.geteduCards(data.eduCards);
        this.props.getexpCards(data.expCards);

        return data;
      } else {
        console.log("Document not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.mode === 1 &&
      (this.props.eduCards !== prevProps.eduCards ||
        this.props.expCards !== prevProps.expCards ||
        this.props.instagram !== prevProps.instagram ||
        this.props.linkedin !== prevProps.linkedin ||
        this.props.name !== prevProps.name ||
        this.props.phone !== prevProps.phone ||
        this.props.skills !== prevProps.skills ||
        this.props.summary !== prevProps.summary ||
        this.props.email !== prevProps.email)
    ) {
      this.setState(
        {
          counter: this.state.counter + 1,
        },
        () => {
          if (this.state.counter > 1) {
            this.setState(
              {
                email: this.props.email,
                giveInstagram: this.props.instagram,
                giveLinkedin: this.props.linkedin,
                giveName: this.props.name,
                givePhone: this.props.phone,
                giveSkills: this.props.skills,
                giveSummary: this.props.summary,
                giveEduCards: this.props.eduCards,
                giveExpCards: this.props.expCards,
              },
              () => {
                this.handleAddDocument(
                  this.state.email,
                  this.state.giveInstagram,
                  this.state.giveLinkedin,
                  this.state.giveName,
                  this.state.givePhone,
                  this.state.giveSkills,
                  this.state.giveSummary,
                  this.state.giveEduCards,
                  this.state.giveExpCards,
                  this.state.userID
                );
              }
            );
          }
        }
      );
    }
  }
  render() {
    return (
      <>
        {this.state.mode === 0 ? (
          <Login
            handleMode={this.handleMode}
            getUserName={this.getUserName}
            getDataToRenderAfterLogin={this.getDataToRenderAfterLogin}
            userID={this.userID}
            handleAddDocument={this.handleAddDocument}
            ConvertDataForFirebase={this.ConvertDataForFirebase}
            email={this.props.email}
            instagram={this.props.instagram}
            linkedin={this.props.linkedin}
            name={this.props.name}
            phone={this.props.phone}
            skills={this.props.skills}
            summary={this.props.summary}
            eduCards={this.props.eduCards}
            expCards={this.props.expCards}
          />
        ) : (
          <div className="afterlogin">
            {this.state.userName === "" ? null : (
              <p className="username">Welcome {this.state.userName}!</p>
            )}
            <button className="logout" onClick={this.handleLogout}>
              Logout
            </button>
          </div>
        )}
      </>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.myElementRef = React.createRef();
    this.state = {
      textAppended: false,
      email: "",
      password: "",
      isRegisterModalOpen: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
    };
  }
  handleLogin = () => {
    const { email, password } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        const email = user.email;
        const mailPart = email.match(/^(.+)@/)[1];
        const id = user.uid;
        this.ifAlreadyStored(id);
        this.props.userID(id);
        this.props.getUserName(mailPart);
        this.props.handleMode();
      })
      .catch((error) => {
        if (!this.state.textAppended) {
          const myElement = this.myElementRef.current;
          if (myElement) {
            const textNode = document.createElement("span");
            textNode.textContent = "Wrong Email or Password.";
            textNode.style.color = "red";
            myElement.parentNode.insertBefore(textNode, myElement.nextSibling);
            this.setState({ textAppended: true });
          }
        }
        console.log("Error login:", error);
      });
  };

  handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        const id = user.uid;
        this.ifAlreadyStored(id);
        this.props.userID(id);
        this.props.getUserName(user.displayName);
        this.props.handleMode();
      })
      .catch((error) => {
        console.log("Error logging in with Google:", error);
      });
  };
  ifAlreadyStored(id) {
    const userRef = doc(firestore, "Users", id);
    getDoc(userRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists()) {
          // Document exists, load the data
          console.log("Document already exists. Loading data...");
          return docSnapshot.data();
        } else {
          // Document doesn't exist, create a new document
          console.log("Document doesn't exist. Creating new document...");
          const {
            email,
            instagram,
            linkedin,
            name,
            phone,
            skills,
            summary,
            eduCards,
            expCards,
          } = this.props;
          const { skillsArray, eduCardsArray, expCardsArray } =
            this.props.ConvertDataForFirebase(skills, eduCards, expCards);
          return setDoc(userRef, {
            Email: email,
            Instagram: instagram,
            Linkedin: linkedin,
            Name: name,
            Phone: phone,
            Summary: summary,
            Skills: skillsArray,
            eduCards: eduCardsArray,
            expCards: expCardsArray,
          }).then(() => {
            console.log("Document created with ID:", id);
            return {
              Email: email,
              Instagram: instagram,
              Linkedin: linkedin,
              Name: name,
              Phone: phone,
              Summary: summary,
              Skills: skillsArray,
              eduCards: eduCardsArray,
              expCards: expCardsArray,
            };
          });
        }
      })
      .then((data) => {
        this.props.getDataToRenderAfterLogin(id);
      })
      .catch((error) => {
        console.error("Error accessing document:", error);
      });
  }

  handleRegisterWithEmailAndPassword = () => {
    const { email, password } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.setState({ isEmailInvalid: true });
      return;
    }
    if (password.length < 6) {
      this.setState({ isPasswordInvalid: true });
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.props.getUserName(user.email);
        this.props.handleMode();
        this.setState({
          isRegisterModalOpen: false,
          isEmailInvalid: false,
          isPasswordInvalid: false,
        });
      })
      .catch((error) => {
        console.log("Error registering with email and password:", error);
      });
    window.location.reload();
  };
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
      isEmailInvalid: false,
      isPasswordInvalid: false,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
      isEmailInvalid: false,
      isPasswordInvalid: false,
    });
  };

  openRegisterModal = () => {
    this.setState({ isRegisterModalOpen: true });
  };

  closeRegisterModal = () => {
    this.setState({
      isRegisterModalOpen: false,
      isEmailInvalid: false,
      isPasswordInvalid: false,
    });
  };

  handleEmailChange1 = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange1 = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const {
      email,
      password,
      isRegisterModalOpen,
      isEmailInvalid,
      isPasswordInvalid,
    } = this.state;
    return (
      <div className="login-form">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={this.handleEmailChange1}
        />
        {isEmailInvalid && (
          <span style={{ color: "red", display: "block" }}>
            Invalid email format
          </span>
        )}
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          ref={this.myElementRef}
          value={password}
          onChange={this.handlePasswordChange1}
        />
        <div className="loginRegisterButtonContainer">
          <div className="loginregisterButtons">
            <button className="normalLogin" onClick={this.handleLogin}>
              Login
            </button>
            <button className="normalRegister" onClick={this.openRegisterModal}>
              Register
            </button>
          </div>
          <div className="googleButton">
            <button
              className="googleLogin"
              onClick={this.handleLoginWithGoogle}
            >
              Sign in with Google
            </button>
          </div>
        </div>

        <Modal
          isOpen={isRegisterModalOpen}
          onRequestClose={this.closeRegisterModal}
          style={{
            content: {
              width: "400px",
              height: "300px",
              margin: "auto",
            },
          }}
        >
          <h2>Register</h2>
          <label htmlFor="registerEmail">Email:</label>
          <input
            id="registerEmail"
            type="email"
            value={email}
            onChange={this.handleEmailChange}
          />
          {isEmailInvalid && (
            <span className="error-message">Invalid email format</span>
          )}
          <label htmlFor="registerPassword">Password:</label>
          <input
            id="registerPassword"
            type="password"
            value={password}
            onChange={this.handlePasswordChange}
          />
          {isPasswordInvalid && (
            <span className="error-message">
              Password should have a minimum of 6 characters
            </span>
          )}
          <button onClick={this.handleRegisterWithEmailAndPassword}>
            Register
          </button>
          <button onClick={this.closeRegisterModal}>Close</button>
        </Modal>
      </div>
    );
  }
}
