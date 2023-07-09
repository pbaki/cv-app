import React from "react";
import { Component, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInAnonymously,
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
  }
  render() {
    return (
      <div>
        <Login />
      </div>
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
      })
      .catch((error) => {
        console.log("Error logging in with Google:", error);
      });
  };

  handleLoginAnonymously = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        // Handle successful anonymous login
      })
      .catch((error) => {
        console.log("Error logging in anonymously:", error);
      });
  };

  handleRegister = () => {
    // Open registration popup with different options
  };

  handleRegisterWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // Handle successful registration with Google
      })
      .catch((error) => {
        console.log("Error registering with Google:", error);
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

  handleRegisterAnonymously = () => {
    signInAnonymously(auth)
      .then((userCredential) => {
        // Handle successful anonymous registration
      })
      .catch((error) => {
        console.log("Error registering anonymously:", error);
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
        <button onClick={this.handleLogin}>Login</button>
        <button onClick={this.handleLoginWithGoogle}>Login with Google</button>
        <button onClick={this.handleLoginAnonymously}>Login Anonymously</button>
        <button onClick={this.handleRegister}>Register</button>
        {/* Registration options popup */}
        {/* You can style the popup with CSS or use a modal library */}
        {/* For simplicity, I'm using native browser confirm() method */}
        {
          <div>
            <button onClick={this.handleRegisterWithGoogle}>
              Register with Google
            </button>
            <button onClick={this.handleRegisterWithEmailAndPassword}>
              Register with Email and Password
            </button>
            <button onClick={this.handleRegisterAnonymously}>
              Register Anonymously
            </button>
          </div>
        }
      </div>
    );
  }
}
