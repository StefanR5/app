import React, { Component } from "react";
import Link from "react-router-dom";
import axios from "../api/Axios";
import history from "../history";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: false,
      block_register: false,
      block_register1: false,
      block_register2: false,
      block_register3: false,

      first: "",
      last: "",
      email: "",
      password: "",
    };

    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    event.preventDefault();
    console.log(this.state.block_register);
    console.log(this.state.block_register1);
    console.log(this.state.block_register2);
    console.log(this.state.block_register3);
  }

  register(event) {
    let files = new FormData();

    event.preventDefault();
    const firstname = this.refs.firstname.value;
    const lname = this.refs.lastname.value;
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    var prekini = false;
    if (firstname === "" || lname === "" || email === "" || password === "") {
      prekini = true;
    } else {
      prekini = false;
    }

    if (prekini) {
      alert("Morate popuniti sva polja!!!");
    } else {
      const data = {
        email: email,
        password: password,
        full_name: firstname + " " + lname,
      };
      console.log(data);

      axios
        .post("/users/register", data)
        .then((respond) => {
          console.log(respond.data);
          history.push("/login");
          window.location.reload(this);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  //  <form onSubmit={this.register}>
  render() {
    return (
      <div id="main_container" className="outer">
        <div id="container" className="inner">
          <form>
            <h1>Register</h1>
            <hr />
            <div className="form-group">
              <label>First name</label>
              <input
                onFocus={() => {
                  if (this.refs.firstname.value === "") {
                    this.setState({
                      first: "Ime ne smije biti prazno",
                      block_register: true,
                    });
                  } else {
                    this.setState({
                      first: "",
                      block_register: false,
                    });
                  }
                }}
                onChange={() => {
                  if (this.refs.firstname.value !== "") {
                    this.setState({
                      first: "",
                      block_register: false,
                    });
                  } else {
                    this.setState({
                      first: "Ime ne smije biti prazno",
                      block_register: true,
                    });
                  }
                }}
                name="firstname"
                ref="firstname"
                type="text"
                className="centriraj"
                placeholder="First name"
              />
            </div>
            <hr />
            <div>
              <p className="error">{this.state.first}</p>
            </div>
            <hr />
            <div className="form-group">
              <label>Last name</label>
              <input
                onFocus={() => {
                  if (this.refs.lastname.value === "") {
                    this.setState({
                      last: "Prezime ne smije biti prazno",
                      block_register1: true,
                    });
                  } else {
                    this.setState({
                      last: "",
                      block_register1: false,
                    });
                  }
                }}
                onChange={() => {
                  if (this.refs.lastname.value !== "") {
                    this.setState({
                      last: "",
                      block_register1: false,
                    });
                  } else {
                    this.setState({
                      last: "Prezime ne smije biti prazno",
                      block_register1: true,
                    });
                  }
                }}
                name="lastname"
                ref="lastname"
                type="text"
                className="centriraj"
                placeholder="Last name"
              />
            </div>
            <hr />
            <div>
              <p className="error">{this.state.last}</p>
            </div>
            <hr />
            <div className="form-group">
              <label>Email</label>
              <input
                onFocus={() => {
                  if (
                    !checkEmail(this.refs.email.value) ||
                    this.refs.email.value === ""
                  ) {
                    this.setState({
                      email: "Email is not valid",
                      block_register2: true,
                    });
                  } else {
                    this.setState({
                      email: "",
                      block_register2: false,
                    });
                  }
                }}
                onChange={() => {
                  if (
                    this.refs.email.value !== "" &&
                    checkEmail(this.refs.email.value)
                  ) {
                    this.setState({
                      email: "",
                      block_register2: false,
                    });
                  } else {
                    this.setState({
                      email: "Email is not valid",
                      block_register2: true,
                    });
                  }
                }}
                name="email"
                ref="email"
                type="email"
                className="centriraj"
                placeholder="Enter email"
              />
            </div>
            <hr />
            <div>
              <p className="error">{this.state.email}</p>
            </div>
            <hr />
            <div className="form-group">
              <label>Password</label>
              <input
                onFocus={() => {
                  if (
                    !checkPassword(this.refs.password.value) ||
                    this.refs.password.value === ""
                  ) {
                    this.setState({
                      password: "Password is incorect!",
                      block_register3: true,
                    });
                  } else {
                    this.setState({
                      password: "Password is incorect!",
                      block_register3: false,
                    });
                  }
                }}
                onChange={() => {
                  if (
                    this.refs.password.value !== "" &&
                    checkPassword(this.refs.password.value)
                  ) {
                    this.setState({
                      password: "",
                      block_register3: false,
                    });
                  } else {
                    this.setState({
                      password: "Password is incorect!",
                      block_register3: true,
                    });
                  }
                }}
                name="password"
                ref="password"
                type="password"
                className="centriraj"
                placeholder="Enter password"
              />
            </div>
            <hr />
            <div>
              <p className="error">{this.state.password}</p>
            </div>
            <hr />
            {this.state.block_register !== true &&
            this.state.block_register1 !== true &&
            this.state.block_register2 !== true &&
            this.state.block_register3 !== true ? (
              <button
                onClick={this.register}
                type="submit"
                className="btn-dark btn-block"
              >
                <p>Register</p>
              </button>
            ) : (
              <button type="submit" className="btn-dark btn-block" disabled>
                <p>Register</p>
              </button>
            )}

            <p className="forgot-password text-right">
              Already registered <a href="/login">log in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
export default SignUp;

function checkEmail(data) {
  let regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(data);
}
//MALA VELIKA I BROJEVI
function checkPassword(data) {
  let regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return regexp.test(data);
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) errors.firstName = "You must enter firstName";

  if (!formValues.lastName) errors.lastName = "You must enter lastName";

  if (!formValues.email) errors.email = "You must enter email";

  if (!formValues.password) errors.password = "You must enter password";

  return errors;
};
