import React, { Component } from "react";
import history from "../history";
import axios from "../api/Axios";
import { IconGroup } from "semantic-ui-react";

class AdminUsersCrud extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
    };
    this.getAllUsers = this.getAllUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.changeRole = this.changeRole.bind(this);
  }

  componentDidMount() {
    this.getAllUsers();
  }

  changeRole(event, id, role) {
    event.preventDefault();
    //console.log(id, role);
    var name = "";
    if (role == "ROLE_ADMIN") {
      this.name = "ROLE_USER";
    } else if (role == "ROLE_USER") {
      this.name = "ROLE_ADMIN";
    }
    const data = {
      name: this.name,
    };

    axios
      .put("/admin/update/" + id, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        alert("Uspjesno ste promjenili ulogu korisnika!!");
        window.location.reload(this);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteUser(event, id) {
    event.preventDefault();
    //console.log("id", id);

    axios
      .delete("/admin/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        alert("Uspjesno ste izbrisali korisnika!!");
        window.location.reload(this);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllUsers() {
    axios
      .get("/admin/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        //console.log(respond.data);
        this.setState({
          entities: respond.data.entities,
        });
        console.log(this.state.entities);
        //history.push("/maincomp");
        // window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="usersCrud">
        <h1 className="txt2">Svi korisnici u sistemu:</h1>
        <table className="table table-striped table-dark">
          <thead>
            <tr className="tekst">
              <th scope="col">ID</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="scroll">
            {this.state.entities.map((i) => {
              const id = i.id;
              const role = i.roles[0].name;

              const name = i.full_name.split(" ");
              var rows = (
                <tr key={i.id} className="tekst1">
                  <th scope="row">{i.id}</th>
                  <td>{name[0]}</td>
                  <td>{name[1]}</td>
                  <td>{i.email}</td>
                  <td>{i.roles[0].name}</td>

                  <td>
                    <button
                      type="submit"
                      onClick={(event) => this.changeRole(event, id, role)}
                      className="dugg"
                    >
                      Change Role
                    </button>
                    <button
                      type="submit"
                      onClick={(event) => this.deleteUser(event, id)}
                      className="dug"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
              return rows;
            })}
            {this.rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminUsersCrud;

/**
   {role == "ROLE_ADMIN" ? (
                              <td></td>
                            ) : ( )}
 */
