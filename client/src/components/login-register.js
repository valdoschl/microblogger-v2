import React, { Component } from "react";
import axios from "axios";

export default class LoginRegister extends Component {
  state = {
    msg: "",
    msgColor: ""
  };

  login = e => {
    e.preventDefault();
    const username = document.querySelector("input[name=loginUser]").value;
    const password = document.querySelector("input[name=loginPass]").value;
    axios
      .post("/user/login", { username, password })
      .then(res => {
        this.props.login(res.data.token);
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({
          msg: err.response.data.message,
          msgColor: "red"
        });
      });
  };
  register = e => {
    e.preventDefault();
    const username = document.querySelector("input[name=registerUser]").value;
    const password = document.querySelector("input[name=registerPass]").value;
    axios
      .post("/user/register", { username, password })
      .then(() => {
        this.setState({
          msg: "Account created successfully",
          msgColor: "green"
        });
        this.changeModal();
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({
          msg: err.response.data.message,
          msgColor: "red"
        });
      });
  };
  changeModal = () => {
    this.setState({
      msg: ""
    });
    const login = document.querySelector(".login-form");
    const register = document.querySelector(".register-form");
    if (login.style.display === "none") {
      login.style.display = "inline-block";
    } else {
      login.style.display = "none";
    }
    if (register.style.display === "none") {
      register.style.display = "inline-block";
    } else {
      register.style.display = "none";
    }
  };

  render() {
    return (
      <div id="login-register">
        <form className="login-form" onSubmit={this.login}>
          <h2>Login with existing user</h2>
          {this.state.msg !== "" && (
            <p className="modal-msg" style={{ color: this.state.msgColor }}>
              {this.state.msg}
            </p>
          )}
          <label htmlFor="username">Username</label>
          <input type="text" name="loginUser" placeholder="Enter username" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="loginPass"
            placeholder="Enter password"
          />
          <button type="submit">Login</button>
          <p className="change-modal" onClick={this.changeModal}>
            Don't have an account?<br></br>Click here to register
          </p>
        </form>

        <form
          className="register-form"
          style={{ display: "none" }}
          onSubmit={this.register}
        >
          <h2>Register a new account</h2>
          {this.state.msg !== "" && (
            <p className="modal-msg" style={{ color: this.state.msgColor }}>
              {this.state.msg}
            </p>
          )}
          <label htmlFor="username">Username</label>
          <input type="text" name="registerUser" placeholder="Enter username" />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="registerPass"
            placeholder="Enter password"
          />
          <button type="submit">Register</button>
          <p className="change-modal" onClick={this.changeModal}>
            Already have an account?<br></br>Click here to login
          </p>
        </form>
      </div>
    );
  }
}
