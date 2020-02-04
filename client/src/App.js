import React, { Component } from "react";
import axios from "axios";

import LoginRegister from "./components/login-register";
import Main from "./components/main";

export default class App extends Component {
  state = {
    isLogged: false,
    token: localStorage.getItem("token"),
    posts: [],
    postError: false
  };

  //On page reload check if there is valid token in local storage
  componentDidMount = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        this.getPosts(token);
        this.setState({ isLogged: true });
      } catch (error) {
        this.setState({ isLogged: false });
      }
    } else {
      this.setState({ isLogged: false });
    }
  };

  //Get all posts from DB
  getPosts = token => {
    axios
      .get("/posts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        this.setState({
          posts: res.data.posts
        });
      })
      .catch(err => console.log(err));
  };

  //Submit post to DB
  submitPost = e => {
    e.preventDefault();
    const post = document.getElementById("blog-text").value;
    if (post.length > 0 && post.length <= 500) {
      this.setState({ postError: false });
      axios
        .post(
          "/posts",
          { post },
          {
            headers: { Authorization: `Bearer ${this.state.token}` }
          }
        )
        .then(() => {
          document.getElementById("blog-text").value = "";
          this.getPosts(this.state.token);
        })
        .catch(err => console.log(err));
    } else {
      this.setState({ postError: true });
    }
  };

  //Login and logout methods to be passed to components to change the state of the app
  login = token => {
    localStorage.setItem("token", token);
    this.setState({
      isLogged: true,
      token
    });
    this.getPosts(token);
  };
  logout = () => {
    localStorage.clear();
    this.setState({
      isLogged: false,
      token: "",
      posts: []
    });
  };

  render() {
    return (
      <div>
        {this.state.isLogged && (
          <Main
            posts={this.state.posts}
            renderPosts={this.renderPosts}
            logout={this.logout}
            submitPost={this.submitPost}
            error={this.state.postError}
          />
        )}
        {!this.state.isLogged && <LoginRegister login={this.login} />}
      </div>
    );
  }
}
