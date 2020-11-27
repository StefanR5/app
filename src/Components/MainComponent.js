import React, { Component } from "react";
import Search from "../Components/Search";
import slika2 from "../images/desna.jpg";
import slika3 from "../images/lijeva.jpg";
import slika4 from "../images/sear.jpg";
import { Form } from "react-bootstrap";
import history from "../history";
import axios from "../api/Axios";
import AdminUsersCrud from "../Components/AdminUsersCrud";
import UsersCars from "../Components/UsersCars";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      admin: false,
      user: false,

      markaId: "",
      modelId: "",
      gorivoId: "",
      menjacId: "",
      karoserijaId: "",
      broj_sjedista: "",
      cityy: "",
      godina: "",
      kilometraza: "",
      kubikaza: "",
      snaga: "",
      cijena_od: "",
      cijena_do: "",

      kobasica: [],
      result: [],
      models: [],
      gorivo: [],
      menjac: [],
      karoserija: [],
      city: [],
      marka: "",
      mod: "",
      gor: "",
      menj: "",
      karos: "",
      grad: "",
      page: 1,
      tt_pages: 0,
      t_pages: 1,
      files: [],
      filesURL: [],
      width: 0,
      height: 0,
      open: false,
      image: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.updateStateParent = this.updateStateParent.bind(this);
    this.getSearchPage = this.getSearchPage.bind(this);
    this.FormLocalStorage = this.FormLocalStorage.bind(this);
    this.DeleteOglas = this.DeleteOglas.bind(this);
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

  componentDidMount() {
    this.setState({
      admin: false,
      user: false,
      files: [],
      filesURL: [],
      marka: "",
      mod: "",
      gor: "",
      menj: "",
      karos: "",
      grad: "",
    });
    this.getAllBrands();
    this.getAllModels();
    this.getAllGorivo();
    this.getAllMenjac();
    this.getAllKaroserija();
    this.getAllCity();
    this.getPageCars(this.state.page);
    this.FormLocalStorage();
  }

  FormLocalStorage() {
    axios
      .get("/users/" + localStorage.getItem("user_id"), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        //console.log(respond.data.role[0].name);
        const us = JSON.stringify(respond.data);
        localStorage.setItem("role", respond.data.role[0].name);
        localStorage.setItem("user", us);
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
          this.state.admin = true;
        } else if (localStorage.getItem("role") === "ROLE_USER") {
          this.state.user = true;
        }
        //console.log(this.state.admin);
        //console.log(this.state.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getSearchPage(page) {
    const dataa = {
      start: this.state.cijena_od,
      end: this.state.cijena_do,
    };

    axios
      .post("/public/search", dataa, {
        params: {
          markaId: this.state.markaId,
          modelId: this.state.modelId,
          gorivoId: this.state.gorivoId,
          menjacId: this.state.menjacId,
          karoserijaId: this.state.karoserijaId,
          broj_sjedista: this.state.broj_sjedista,
          city: this.state.cityy,
          godina: this.state.godina,
          kilometraza: this.state.kilometraza,
          kubikaza: this.state.kubikaza,
          snaga: this.state.snaga,
          page,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        const rez = respond.data.content;
        const tot_pages = respond.data.totalPages;
        this.setState({ kobasica: rez, tt_pages: tot_pages });
      })
      .catch((error) => {
        console.log("Ne moze aloooo");
      });
  }

  updateStateParent(data, dataa) {
    this.setState({
      markaId: data.markaId,
      modelId: data.modelId,
      gorivoId: data.gorivoId,
      menjacId: data.menjacId,
      karoserijaId: data.karoserijaId,
      broj_sjedista: data.broj_sjedista,
      cityy: data.city,
      godina: data.godina,
      kilometraza: data.kilometraza,
      kubikaza: data.kubikaza,
      snaga: data.snaga,

      cijena_od: dataa.start,
      cijena_do: dataa.end,
    });
  }

  handleToUpdate = (someArg) => {
    this.setState({
      kobasica: someArg,
    });
  };

  handleToUpdatePage = (someArg) => {
    this.setState({
      tt_pages: someArg,
    });
    //console.log(this.state.tt_pages);
    //console.log(this.state.page);
  };

  getPageCars(page) {
    axios
      .get("/public/auta", {
        params: {
          page,
          size: 10,
          sort: "id",
        },
      })
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data.content;
        const tot_pages = respond.data.totalPages;
        this.setState({ kobasica: rez, t_pages: tot_pages });
      })
      .catch((error) => {
        console.log("Ne moze mentolu");
      });
  }

  getAllCars() {
    axios
      .get("/public/allcars")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        //console.log(rez);

        this.setState({ kobasica: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSubmit(event) {
    event.preventDefault();
    const b = this.state.marka;
    const m = this.state.mod;
    const g = this.state.gor;
    const mnj = this.state.menj;
    const k = this.state.karos;
    const gr = this.state.grad;

    const cj = this.refs.price.value;
    const gg = this.refs.godin.value;
    const kilo = this.refs.kilom.value;
    const kub = this.refs.kubik.value;
    const konjarnik = this.refs.konj.value;
    const op = this.refs.textarea.value;
    const sjed = this.refs.br_sjed.value;

    const data1 = {
      marka: b,
      model: m,
      gorivo: g,
      menjac: mnj,
      karoserija: k,
      cityId: gr,

      cijena: cj,
      god: gg,
      km: kilo,
      kubikaza: kub,
      konjska_snaga: konjarnik,

      opis: op,
      broj_sjedista: sjed,
    };
    console.log(data1);

    let data = new FormData();
    this.state.files.forEach((i) => {
      //console.log(i);
      data.append("files", i);
    });
    data.append("car", JSON.stringify(data1));
    //console.log(data);

    axios
      .post("/users/create", data, {
        params: {
          token: localStorage.getItem("token"),
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        if (respond.data.success === true) {
          window.location.reload(true);
        }
      })
      .catch((error) => {
        console.log("Majmune nie proslo");
      });

    //this.props.createCar(data);
    //window.location.reload(true);
  }

  handleChange = (type, event) => {
    console.log(type, event.target.value);
    this.setState(
      { [type]: event.target.value } /* () =>
      console.log(this.state)*/
    );
  };

  promjeni = (e) => {
    let files = [];
    let filesURL = [];

    files.push(e.target.files);

    for (let i = 0; i < files[0].length; i++) {
      filesURL.push(URL.createObjectURL(files[0][i]));
    }

    this.setState({
      files: [...e.target.files],
      filesURL,
    });
  };

  showImage = (image) => {
    this.setState({
      open: true,
      image,
    });
  };

  getAllModels() {
    axios
      .get("/public/models")
      .then((respond) => {
        //console.log(respond.data);
        const rez = respond.data;
        // console.log(rez);

        this.setState({ models: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAllBrands() {
    axios
      .get("/public/marke")
      .then((respond) => {
        //  console.log(respond.data);
        const rez = respond.data;
        //  console.log(rez);

        this.setState({ result: rez });
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

        this.setState({ gorivo: rez });
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

        this.setState({ menjac: rez });
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

        this.setState({ karoserija: rez });
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

        this.setState({ city: rez });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="box">
        <div id="leftbox" className="leftbox">
          <img className="lijeva_slika" src={slika3} alt="" />
        </div>
        <div id="midlebox" className="midlebox">
          <div id="top" className="midleTop">
            <div className="container">
              <div id="exTab3" className="container">
                <ul className="nav nav-pills tabovi">
                  {this.state.admin || this.state.user ? (
                    <li>
                      <a href="#1b" data-toggle="tab">
                        Postavi Oglas
                      </a>
                    </li>
                  ) : (
                    <div></div>
                  )}
                  {this.state.admin || this.state.user ? (
                    <li>
                      <a href="#2b" data-toggle="tab">
                        Marke Auta
                      </a>
                    </li>
                  ) : (
                    <div></div>
                  )}

                  {this.state.admin ? (
                    <li>
                      <a href="#2b" data-toggle="tab">
                        Korisnici oglasa
                      </a>
                    </li>
                  ) : (
                    <li></li>
                  )}

                  {this.state.user ? (
                    <li>
                      <a href="#3b" data-toggle="tab">
                        Oglasi Korisnika
                      </a>
                    </li>
                  ) : (
                    <div></div>
                  )}

                  <li>
                    <img
                      className="photo1"
                      href="#4b"
                      data-toggle="tab"
                      src={slika4}
                    />
                  </li>
                </ul>

                <div className="tab-content clearfix">
                  <div className="tab-pane" id="1b">
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
                    <h1 className="brzapretraga">Dodaj novi oglas:</h1>
                    <hr />
                    <Form className="form_group" onSubmit={this.onSubmit}>
                      <Form.Row>
                        <Form.Group controlId="marka_select">
                          <Form.Label className="form_label">
                            Odaberi marku:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("marka", event)
                            }
                          >
                            <option value={null} />
                            {this.state.result.map((i, value) => {
                              //console.log(i);
                              //console.log(i.name);
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
                        <Form.Group
                          className="odmakni"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Model automobila:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("mod", event)
                            }
                          >
                            <option value={null} />
                            {this.state.models.map((i, value) => {
                              //console.log(i);
                              //console.log(i.name);
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
                        <Form.Group
                          className="odmakni"
                          controlId="gorivo_select"
                        >
                          <Form.Label className="form_label">
                            Pogonsko Gorivo:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("gor", event)
                            }
                          >
                            <option value={null} />
                            {this.state.gorivo.map((i, value) => {
                              //console.log(i);
                              //console.log(i.name);
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
                        <Form.Group
                          className="odmakni"
                          controlId="menjac_select"
                        >
                          <Form.Label className="form_label">
                            Vrsta Menjaca:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("menj", event)
                            }
                          >
                            <option value={null} />
                            {this.state.menjac.map((i, value) => {
                              //console.log(i);
                              //console.log(i.name);
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
                        <Form.Group
                          className="odmakni"
                          controlId="karoserija_select"
                        >
                          <Form.Label className="form_label">
                            Izaberi Karoseriju:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("karos", event)
                            }
                          >
                            <option value={null} />
                            {this.state.karoserija.map((i, value) => {
                              //console.log(i);
                              // console.log(i.name);
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
                        <Form.Group className="odmakni" controlId="grad_select">
                          <Form.Label className="form_label">
                            Grad(Mjesto):
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            onChange={(event) =>
                              this.handleChange("grad", event)
                            }
                          >
                            <option value={null} />
                            {this.state.city.map((i, value) => {
                              //console.log(i);
                              //console.log(i.name);
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
                      <Form.Row className="odbij_top">
                        <Form.Group
                          className="odmakni1"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Unesite Cijenu Auta:
                          </Form.Label>
                          <Form.Control
                            ref="price"
                            type="text"
                            placeholder="Cijena auta..."
                          />
                        </Form.Group>
                        <Form.Group
                          className="odmakni"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Godiste automobila:
                          </Form.Label>
                          <Form.Control
                            ref="godin"
                            type="text"
                            placeholder="Godiste auta..."
                          />
                        </Form.Group>
                        <Form.Group
                          className="odmakni"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Predjena kilometraza:
                          </Form.Label>
                          <Form.Control
                            ref="kilom"
                            type="text"
                            placeholder="Predjena kilometraza..."
                          />
                        </Form.Group>
                        <Form.Group
                          className="odmakni"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Kubikaza auta (cm3)
                          </Form.Label>
                          <Form.Control
                            ref="kubik"
                            type="text"
                            placeholder="Kubikaza..."
                          />
                        </Form.Group>
                        <Form.Group
                          className="odmakni"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Konjska snaga auta:
                          </Form.Label>
                          <Form.Control
                            ref="konj"
                            type="text"
                            placeholder="Horse power..."
                          />
                        </Form.Group>
                      </Form.Row>
                      <Form.Row className="odbij_top">
                        <Form.Group className="odabij" controlId="area_img">
                          <Form.Label className="form_label">
                            Opis i karakteristike Auta :
                          </Form.Label>
                          <Form.Control
                            placeholder="Opis i karakteristike automobila..."
                            className="sirina"
                            as="textarea"
                            rows={8}
                            ref="textarea"
                          />
                        </Form.Group>
                        <Form.Group
                          className="odmakni2"
                          controlId="model_select"
                        >
                          <Form.Label className="form_label">
                            Broj sjedista auta:
                          </Form.Label>
                          <Form.Control
                            className="form-control input-sm"
                            as="select"
                            ref="br_sjed"
                          >
                            <option value={null} />
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                          </Form.Control>
                        </Form.Group>

                        <div className="field">
                          <label className="form_label">
                            Ucitaj fotografije:
                          </label>
                          <input
                            accept="image/*"
                            type="file"
                            multiple
                            id="file"
                            //style={{
                            //display: "none",
                            //}}
                            onChange={this.promjeni}
                          />
                        </div>

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
                        </div>
                      </Form.Row>

                      <div>
                        <button className="dugmeKreiraj" type="submit">
                          Kreiraj oglas
                        </button>
                      </div>
                    </Form>
                  </div>
                  <div className="tab-pane" id="2b">
                    <AdminUsersCrud />
                  </div>
                  <div className="tab-pane" id="3b">
                    <UsersCars />
                  </div>
                  <div className="tab-pane active" id="4b">
                    <Search
                      handleToUpdate={this.handleToUpdate}
                      handleToUpdatePage={this.handleToUpdatePage}
                      updateStateParent={this.updateStateParent}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div it="bottom" className="midleBottom">
            <h1 className="sviOglasi">Pregled Svih Oglasa:</h1>
            <div className="grid-container">
              {this.state.kobasica.map((i) => {
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
                    {this.state.admin || this.state.user ? (
                      <button
                        onClick={() => {
                          history.push("/details/" + id);
                          window.location.reload(true);
                        }}
                        className="btn btn-dark pozicija"
                      >
                        Detalji Auta
                      </button>
                    ) : (
                      <div></div>
                    )}
                    {this.state.admin ? (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          this.DeleteOglas(id);
                        }}
                        className="btn btn-danger maloOdmk"
                      >
                        Izbrisi
                      </button>
                    ) : (
                      <div></div> //TO DO napraviti request za brisanje
                    )}
                  </div>
                );
                return divs;
              })}
              {this.divs}
            </div>

            <div className="container1">
              <button
                href="#"
                className="btn"
                onClick={() => {
                  if (this.state.tt_pages != 0) {
                    this.state.page = this.state.page - 1;
                    if (this.state.page < 1) {
                      this.state.page = this.state.page + 1;
                    }
                    this.getSearchPage(this.state.page);
                  } else {
                    this.state.page = this.state.page - 1;

                    if (this.state.page < 1) {
                      this.state.page = this.state.page + 1;
                    }
                    this.getPageCars(this.state.page);
                  }
                }}
              >
                Previous
              </button>
              <button
                onClick={() => {
                  //console.log(this.state.tt_pages);
                  if (this.state.tt_pages !== 0) {
                    //console.log(this.state.page);
                    this.state.page = this.state.page + 1;
                    if (this.state.page > this.state.tt_pages) {
                      this.state.page = this.state.page - 1;
                    }
                    //console.log(this.state.page);
                    this.getSearchPage(this.state.page);
                  } else {
                    this.state.page = this.state.page + 1;
                    if (this.state.page > this.state.t_pages) {
                      this.state.page = this.state.page - 1;
                    }
                    this.getPageCars(this.state.page);
                  }
                }}
                className="btn1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div id="rightbox" className="rightbox">
          <img className="desna_slika" src={slika2} alt="" />
        </div>
      </div>
    );
  }
}

export default MainComponent;
