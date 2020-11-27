import React, { Component } from "react";
import { Form } from "react-bootstrap";
import slika2 from "../images/sear.jpg";
import slika3 from "../images/lijeva.jpg";
import slika4 from "../images/sear.jpg";
import axios from "../api/Axios";
import $ from "jquery";

class CarDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",

      marka: "",
      model: "",
      godiste: "",

      grad: "",
      zip: "",
      broj_sjed: "",

      gorivo: "",
      menjac: "",
      karoserija: "",

      km: "",
      kubikaza: "",
      snaga: "",

      opis: "",
      cijena: "",

      open: false,
      images: [],
      image: "",
      files: [],
      filesURL: [],

      oglas: null,

      allbrands: [],
      allmodels: [],
      allgorivo: [],
      allmenjac: [],
      allKaros: [],
      allcity: [],

      update: false,
      checkOwner: false,
      ownerId: "",
      role_bool: false,
    };
    this.showImage = this.showImage.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.setState({
      files: [],
      filesURL: [],
    });
    var a = window.location.pathname.split("/");
    this.getOglasfromId(a[2]);
    this.getAllBrands();
    this.getAllModels();
    this.getAllGorivo();
    this.getAllMenjac();
    this.getAllKaroserija();
    this.getAllCity();

    const role = localStorage.getItem("role");
    if (role == "ROLE_ADMIN") {
      this.setState({
        role_bool: true,
      });
    }
  }

  sendMessage(event) {
    event.preventDefault();
    const msg = this.refs.messagetext.value;
    const id = localStorage.getItem("user_id");
    const data = {
      user_id: id,
      message: msg,
    };

    axios
      .post("/public/sendMessage", data)
      .then((respond) => {
        //console.log(respond.data);
        if (respond.data.success == true) {
          alert("Uspjesno poslata poruka!!!");
        } else {
          alert("Neuspjesno poslata poruka!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onClick(event) {
    event.preventDefault();
    //const marka = this.refs.marka_auta.value;
    var a = window.location.pathname.split("/");
    const data1 = {
      id: a[2],
      cityId:
        this.state.oglas.city.name !== this.state.grad
          ? this.state.grad
          : this.state.oglas.city.id,
      broj_sjedista: this.refs.br_sjed.value,
      cijena: this.refs.kosta.value,

      marka:
        this.state.oglas.marka.name !== this.state.marka
          ? this.state.marka
          : this.state.oglas.marka.id,

      model:
        this.state.oglas.model.name !== this.state.model
          ? this.state.model
          : this.state.oglas.model.id,
      god: this.refs.godina.value,

      gorivo:
        this.state.oglas.gorivo.name !== this.state.gorivo
          ? this.state.gorivo
          : this.state.oglas.gorivo.id,
      menjac:
        this.state.oglas.menjac.name !== this.state.menjac
          ? this.state.menjac
          : this.state.oglas.menjac.id,
      karoserija:
        this.state.oglas.karoserija.name !== this.state.karoserija
          ? this.state.karoserija
          : this.state.oglas.karoserija.id,

      km: this.refs.kilometara.value,
      kubikaza: this.refs.kubika.value,
      konjska_snaga: this.refs.konja.value,

      opis: this.refs.opis.value,
    };

    console.log(data1);

    let data = new FormData();
    this.state.files.forEach((i) => {
      data.append("files", i);
    });
    data.append("car", JSON.stringify(data1));

    axios
      .put("/users/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        if (respond.data.success === true) {
          alert("Uspjesno ste updejtovali oglas!!");
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log("Majmune nie proslo");
      });
  }

  getOglasfromId(id) {
    axios
      .get("/users/carDetails", {
        params: {
          id: id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        this.setState({
          images: respond.data.images,
          marka: respond.data.marka.name,
          model: respond.data.model.name,
          godiste: respond.data.god,
          opis: respond.data.opis,
          grad: respond.data.city.name,
          broj_sjed: respond.data.broj_sjedista,
          gorivo: respond.data.gorivo.name,
          menjac: respond.data.menjac.name,
          karoserija: respond.data.karoserija.name,
          km: respond.data.km,
          kubikaza: respond.data.kubikaza,
          snaga: respond.data.konjska_snaga,
          cijena: respond.data.cijena,
          ownerId: respond.data.owner,
          oglas: respond.data,
        });
        //console.log(this.state.ownerId);
        //const gradId = respond.data.city.id;
        const ownerId = respond.data.owner;
        const tempId = localStorage.getItem("user_id");
        if (this.state.ownerId == tempId) {
          this.setState({
            checkOwner: true,
          });
        }
        console.log(this.state.checkOwner);

        axios
          .get("/users/" + ownerId, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((respond) => {
            //console.log(respond.data);
            this.setState({
              fullName: respond.data.fullname,
              email: respond.data.email,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  showImage = (image) => {
    this.setState({
      open: true,
      image,
    });
  };

  handleChange = (type, event) => {
    console.log(type, event.target.value);
    this.setState(
      { [type]: event.target.value },
      () =>
        console.log("state", this.state) /* () =>
     console.log(this.state)*/
    );

    // this.setState({ gr: event.target.value });
    // console.log(this.state);
  };

  ucitaj = (e) => {
    let files = [];
    let filesURL = [];

    files.push(e.target.files);

    for (let i = 0; i < files[0].length; i++) {
      filesURL.push(URL.createObjectURL(files[0][i]));
    }

    this.setState(
      {
        files: [...e.target.files],
        filesURL,
        update: true,
      },
      () => console.log("state", this.state)
    );
  };

  //////////////////////////GET OBJECTS FROM DB////////////////////////////////////
  getAllBrands() {
    axios
      .get("/public/marke")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        //  console.log(rez);

        this.setState({ allbrands: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllModels() {
    axios
      .get("/public/models")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        // console.log(rez);

        this.setState({ allmodels: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllGorivo() {
    axios
      .get("/public/gorivo")
      .then((respond) => {
        // console.log(respond.data);
        const rez = respond.data;
        //  console.log(rez);

        this.setState({ allgorivo: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllMenjac() {
    axios
      .get("/public/menjac")
      .then((respond) => {
        // console.log(respond.data);
        const rez = respond.data;
        // console.log(rez);

        this.setState({ allmenjac: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllKaroserija() {
    axios
      .get("/public/karoserije")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        // console.log(rez);

        this.setState({ allKaros: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllCity() {
    axios
      .get("/public/cities")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        //console.log(rez);

        this.setState({ allcity: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //////////////////////////////////////////////////////////////////////////////////

  render() {
    //var a = window.location.pathname.split("/");
    //console.log(a[2]);
    return (
      <div className="cardetails">
        <div
          className="modal"
          id="myModal"
          role="dialog"
          onClose={() =>
            this.setState({
              open: false,
            })
          }
          open={this.state.open}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <img src={this.state.image} />
              <div className="modal-footer">
                <button
                  className="dugme"
                  className="btn btn-default"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modalcss" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="exampleModalLabel">
                  Unesite novu poruku prema izabranom korisniku:
                </h1>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label className="modaltxt">Primalac:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="recipient-name"
                      readOnly="readonly"
                      defaultValue={this.state.email}
                    ></input>
                  </div>
                  <div className="form-group">
                    <label className="modaltxt">Poruka:</label>
                    <Form.Control
                      className="sirina"
                      as="textarea"
                      rows={8}
                      ref="messagetext"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-secondary btn-lg"
                  data-dismiss="modal"
                >
                  Zatvori
                </button>
                <button
                  onClick={this.sendMessage}
                  type="button"
                  className="btn btn-primary btn-lg"
                >
                  Posalji poruku
                </button>
              </div>
            </div>
          </div>
        </div>

        <h1 className="txt">Fotografije polovnog automobila:</h1>
        <hr />
        <div className="imageContainer">
          <div className="field">
            <label className="form_label">Ucitaj fotografije:</label>
            <input
              accept="image/*"
              type="file"
              multiple
              id="file"
              //style={{
              //display: "none",
              //}}
              onChange={this.ucitaj}
            />
          </div>
          {this.state.update ? (
            <div className=" field">
              {this.state.filesURL.map((i) => {
                return (
                  <img
                    data-toggle="modal"
                    data-target="#myModal"
                    onClick={() => this.showImage(i)}
                    key={i}
                    alt="whops"
                    width={250}
                    height={140}
                    src={i}
                  />
                );
              })}
              <footer className="foo">Naziv Slike</footer>
            </div>
          ) : (
            <div>
              {this.state.images.map((i) => {
                //console.log(i);
                const images = (
                  <img
                    data-toggle="modal"
                    data-target="#myModal"
                    key={i.id}
                    alt="whops"
                    width={250}
                    height={140}
                    src={`data:image/jpeg;base64,${i.data}`}
                    onClick={() =>
                      this.showImage(`data:image/jpeg;base64,${i.data}`)
                    }
                  />
                );
                return images;
              })}

              <footer className="foo">Naziv Slike</footer>
            </div>
          )}
        </div>
        <hr />
        <h1 className="txt">Osnovne informacije o prodavcu:</h1>
        <hr />
        <Form>
          <Form.Row>
            <Form.Group className="sizze">
              <Form.Label className="txt1">Ime i Prezime prodavca:</Form.Label>
              <Form.Control
                readOnly="readonly"
                defaultValue={this.state.fullName}
              />
            </Form.Group>
            <Form.Group className="makni sizze">
              <Form.Label className="txt1">Email prodavca:</Form.Label>
              <Form.Control
                readOnly="readonly"
                defaultValue={this.state.email}
              />
            </Form.Group>
            <Form.Group className="makni1">
              <button
                type="button"
                className="dugme1"
                data-toggle="modal"
                data-target="#exampleModal"
              >
                Kontaktiraj prodavca
              </button>
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Group>
            <Form.Label className="txt1">
              Opis karakteristika polovnog vozila:
            </Form.Label>
            <Form.Control
              defaultValue={this.state.opis}
              className="sirina"
              as="textarea"
              rows={8}
              ref="opis"
            />
          </Form.Group>
          <hr />
          <h1 className="txt">Osnovne karakeristike vozila:</h1>
          <hr />
          <Form.Row>
            <Form.Group className="sizze">
              <Form.Label className="txt1">Grad(Mjesto):</Form.Label>
              <Form.Control
                className="form-control"
                as="select"
                onChange={(event) => this.handleChange("grad", event)}
                //defaultValue={this.state.grad} nece da prikaze default
              >
                <option>{this.state.grad}</option>
                {this.state.allcity.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>

            <Form.Group className="sizze makni2">
              <Form.Label className="txt1">Broj sjedista:</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("broj_sjed", event)}
                as="select"
                ref="br_sjed"
                defaultValue={this.state.broj_sjed}
              >
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Cijena automobila:</Form.Label>
              <Form.Control
                ref="kosta"
                defaultValue={this.state.cijena}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group className="sizze">
              <Form.Label className="txt1">Marka Automobila</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("marka", event)}
                as="select"
                defaultValue={this.state.marka}
              >
                <option>{this.state.marka}</option>
                {this.state.allbrands.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Model automobila:</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("model", event)}
                as="select"
                defaultValue={this.state.model}
              >
                <option>{this.state.model}</option>
                {this.state.allmodels.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Godiste automobila:</Form.Label>
              <Form.Control
                ref="godina"
                defaultValue={this.state.godiste}
              ></Form.Control>
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group className="sizze">
              <Form.Label className="txt1">Pogonsko gorivo:</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("gorivo", event)}
                as="select"
                defaultValue={this.state.gorivo}
              >
                <option>{this.state.gorivo}</option>
                {this.state.allgorivo.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Vrsta menjaca:</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("menjac", event)}
                as="select"
                defaultValue={this.state.menjac}
              >
                <option>{this.state.menjac}</option>
                {this.state.allmenjac.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Karoserija:</Form.Label>
              <Form.Control
                onChange={(event) => this.handleChange("karoserija", event)}
                as="select"
                defaultValue={this.state.karoserija}
              >
                <option>{this.state.karoserija}</option>
                {this.state.allKaros.map((i, value) => {
                  var options = (
                    <option key={i.id} value={i.id}>
                      {i.name}
                    </option>
                  );
                  return options;
                })}
                {this.options}
              </Form.Control>
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Row>
            <Form.Group className="sizze">
              <Form.Label className="txt1">Predjena kilometraza:</Form.Label>
              <Form.Control
                ref="kilometara"
                className="txt1"
                defaultValue={this.state.km}
              />
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Kubikaza auta:</Form.Label>
              <Form.Control ref="kubika" defaultValue={this.state.kubikaza} />
            </Form.Group>
            <Form.Group className="makni2 sizze">
              <Form.Label className="txt1">Konjska snaga:</Form.Label>
              <Form.Control ref="konja" defaultValue={this.state.snaga} />
            </Form.Group>
          </Form.Row>
          <hr />
          <Form.Group className="">
            {this.state.role_bool || this.state.checkOwner ? (
              <button onClick={this.onClick} className="dugme2">
                Update Oglas
              </button>
            ) : (
              <div></div>
            )}
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default CarDetails;
