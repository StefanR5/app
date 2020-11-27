import React, { Component } from "react";
import axios from "../api/Axios";
import history from "../history";
import { Link } from "react-router-dom";
import strings from "../validation/localization";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      error: "",
    };

    this.login = this.login.bind(this);
  }

  componentWillUnmount() {}

  componentDidMount() {
    //document.getElementById("main_container").style.display = "visible";
    var lout = document.getElementById("logout");
    if (!lout.classList.contains("hide")) {
      lout.classList.add("hide");
    }
    //lout.classList.remove("hide");
  }

  //https://stackoverflow.com/questions/58359928/react-how-to-display-error-on-incorrect-user-login

  login(event) {
    event.preventDefault();

    const email = this.refs.email.value;
    const password = this.refs.password.value;
    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    axios
      .post("/users/login", data)
      .then((respond) => {
        console.log(respond.data);

        if (respond.data != null && respond.status === 200) {
          localStorage.setItem("token", respond.data.token);
          localStorage.setItem("user_id", respond.data.userId);
          var lout = document.getElementById("logout");
          lout.classList.remove("hide");
          history.push("/maincomp");
          window.location.reload(true);
        }
        //window.location.reload(true);
      })
      .catch((error) => {
        this.setState({ error: "Could not found username and password!!" });
        console.log(error);
      });
  }

  render() {
    return (
      <div id="main_container" className="outer">
        <div id="container" className="inner">
          <form id="loginform" onSubmit={this.login}>
            <h3>{strings.login.login}</h3>
            <hr />
            <div className="form-group">
              <label>Email</label>
              <input
                ref="email"
                type="email"
                className="centriraj"
                placeholder="Enter email"
              />
            </div>
            <hr />
            <div className="form-group">
              <label>Password</label>
              <input
                ref="password"
                type="password"
                className="centriraj"
                placeholder="Enter password"
              />
            </div>
            <hr />
            <div>
              <p className="error">{this.state.error}</p>
            </div>
            <hr />
            <button type="submit" className="btn-dark  btn-block ">
              Sign in
            </button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
            <div className="form-group">
              <hr />
              <h2>Nemate Nalog?</h2>
              <hr />
              <Link to="/sign-up">Registruj se!</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;

function jsonToFormData(json) {
  var formData = new FormData();

  Object.keys(json).forEach((key) => {
    formData.append(key, json[key]);
  });

  return formData;
}
