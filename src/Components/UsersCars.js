import React, { Component } from "react";
import axios from "../api/Axios";
import history from "../history";

class UsersCars extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersCars: [],
    };
    this.getUsersCars = this.getUsersCars.bind(this);
    this.DeleteOglas = this.DeleteOglas.bind(this);
  }

  componentDidMount() {
    this.getUsersCars();
  }

  DeleteOglas(id) {
    axios
      .delete("/users/car/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        window.location.reload(this);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getUsersCars() {
    axios
      .get("/users/userCars", {
        params: {
          owner: localStorage.getItem("user_id"),
          page: 1,
          size: 10,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        this.setState({
          usersCars: respond.data.content,
        });
        //history.push("/maincomp");
        // window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="usersCars">
        <h1 className="txt2">Oglasi Ulogovanog Korisnika:</h1>
        <div className="grid-container1">
          {this.state.usersCars.map((i) => {
            //console.log(i);
            const id = i.id;
            //console.log(i.name);
            var divs = (
              <div key={i.id} className="thumbnail">
                <div className="jbg">
                  <img
                    className="photo"
                    src={`data:image/jpeg;base64,${i.images[0].data}`}
                    alt=""
                  />
                </div>
                <div className="center_card">
                  <h3>{i.model.name}</h3>
                  <p>{i.opis}</p>
                </div>

                <button
                  onClick={() => {
                    history.push("/details/" + id);
                    window.location.reload(true);
                  }}
                  className="btn btn-dark pozicija"
                >
                  Detalji Auta
                </button>

                <button
                  onClick={(event) => {
                    event.preventDefault();
                    this.DeleteOglas(id);
                  }}
                  className="btn btn-danger maloOdmk"
                >
                  Izbrisi
                </button>
              </div>
            );
            return divs;
          })}
          {this.divs}
        </div>
      </div>
    );
  }
}

export default UsersCars;
