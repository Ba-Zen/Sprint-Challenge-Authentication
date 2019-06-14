import React from "react";
import "./App.css";

import { Route, NavLink, withRouter } from "react-router-dom";
import SignIn from "./auth/SignIn.js";
import SignUp from "./auth/SignUp.js";
import Jokes from "./jokes/Jokes.js";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: "#FEF85A",
    color: "black",
    fontWeight: "800",
    border: "2px solid black",
    "&:hover": {
      backgroundColor: "#000000",
      color: "#FEF85A"
    }
  },
  input: {
    display: "none"
  }
}));

function App(props) {
  function logout() {
    localStorage.removeItem("jwt");
    props.history.push("/signin");
  }
  const classes = useStyles();
  return (
    <>
      <header>
        <NavLink to="/signin" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign In
          </Button>
        </NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/jokes" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Jokes
          </Button>
        </NavLink>
        &nbsp;|&nbsp;
        <NavLink to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Sign Up
          </Button>
        </NavLink>
        &nbsp;|&nbsp;
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={logout}
        >
          Logout
        </Button>
      </header>
      <main>
        <Route path="/signin" component={SignIn} />
        <Route path="/jokes" component={Jokes} />
        <Route path="/signup" component={SignUp} />
      </main>
    </>
  );
}

export default withRouter(App);
