import React, { Component } from "react";

export default class LoginRegister extends Component {
  renderPosts = () => {
    return this.props.posts.map(post => {
      return (
        <div key={post._id}>
          <h2>{post.poster}</h2>
          <p>{post.post}</p>
        </div>
      );
    });
  };

  render() {
    return (
      <div className="middle-content">
        <a href="#top">
          <div id="header">
            <h1>MICROBLOGGER</h1>
            <button onClick={this.props.logout}>Logout</button>
          </div>
        </a>

        <form id="blog-form" onSubmit={this.props.submitPost}>
          <textarea id="blog-text" placeholder="write a microblog"></textarea>
          {this.props.error && (
            <p className="blog-post-error">
              posts must be 1-500 characters long
            </p>
          )}
          <button type="submit">post</button>
        </form>
        <div id="posts">{this.renderPosts()}</div>
      </div>
    );
  }
}
