import React from "react";
import axios from "axios";



class SignIn extends React.Component {
  state = {
    username: "",
    password: "pass"
  };

  handleChange = event => {
    const { id, value } = event.target;

    this.setState({ [id]: value });
  };

  submitForm = event => {
    event.preventDefault();
    const endpoint = "http://localhost:3300/api/login";

    axios
      .post(endpoint, this.state)
      .then(res => {
        console.log(res);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/jokes");
      })
      .catch(err => {
        console.log("Sign In Error", err);
      });
  };

  render() {
    return (
      <>
        <h2>Sign In</h2>
        <form className='form' onSubmit={this.submitForm}>
          <div>
            <label htmlFor="username" />
            username:
            <input
              id="username"
              onChange={this.handleChange}
              value={this.state.username}
              type="text"
              className='input'
            />
          </div>
          <div>
            <label htmlFor="password" />
            password:
            <input
              id="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
              className='input'
            />
          </div>
          <div>
            <button className='form-btn' type="submit">Sign In</button>
          </div>
        </form>
      </>
    );
  }
}

export default SignIn;