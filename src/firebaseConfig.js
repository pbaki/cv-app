import React from "react";
import { Component } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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

export default class AdminLogin extends Component {
  constructor() {
    super();
    this.state = {
      mode: 0,
      userName: "",
    };
    this.handleMode = this.handleMode.bind(this);
    this.getUserName = this.getUserName.bind(this);
  }
  handleMode() {
    this.setState({
      mode: this.state.mode === 0 ? 1 : 0,
    });
  }
  getUserName(username) {
    this.setState({
      userName: username,
    });
  }
  render() {
    return (
      <>
        {this.state.mode === 0 ? (
          <Login handleMode={this.handleMode} getUserName={this.getUserName} />
        ) : (
          <div className="afterlogin">
            {this.state.userName === "" ? null : (
              <p className="username">Welcome {this.state.userName}!</p>
            )}
            <button className="logout">Logout</button>
          </div>
        )}
      </>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleLogin = () => {
    const { email, password } = this.state;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful login
      })
      .catch((error) => {
        console.log("Error login:", error);
      });
  };

  handleLoginWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Handle successful login with Google
        console.log(result);
        this.props.getUserName(result.user.displayName);
        this.props.handleMode();
      })
      .catch((error) => {
        console.log("Error logging in with Google:", error);
      });
  };

  handleRegisterWithEmailAndPassword = () => {
    const { email, password } = this.state;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Handle successful registration with email and password
      })
      .catch((error) => {
        console.log("Error registering with email and password:", error);
      });
  };

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { email, password } = this.state;

    return (
      <div className="login-form">
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={this.handleEmailChange}
        />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <div className="loginRegisterButtonContainer">
          <div className="loginregisterButtons">
            <button className="normalLogin" onClick={this.handleLogin}>
              Login
            </button>
            <button
              className="normalRegister"
              onClick={this.handleRegisterWithEmailAndPassword}
            >
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
      </div>
    );
  }
}
