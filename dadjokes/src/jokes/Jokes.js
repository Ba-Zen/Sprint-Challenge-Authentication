import React from "react";
import axios from "axios";

import requiresAuth from '../auth/requiresAuth.js';

class Jokes extends React.Component {
  state = {
    jokes: []
  };

  render() {
    return (
      <>
        <h2>Joke List</h2>
        <ul className='joke-list'>
          {this.state.jokes.map(j => (
            <li className='joke-card'key={j.id}>{j.joke}</li>
          ))}
        </ul>
      </>
    );
  }

  componentDidMount() {
    const endpoint = "/jokes";
    //const endpoint = "http://localhost:5000/api/users";
    // const token = localStorage.getItem('jwt');
    // const requestConfig = {
    //   headers: {
    //     authorization: token
    //   }
    // }
    axios
      //.get(endpoint, requestConfig) 
      .get(endpoint)
      .then(res => {
          this.setState({ jokes: res.data })
      })
      .catch(err => console.log(err));
  }
}

export default requiresAuth(Jokes);