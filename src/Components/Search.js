import React, { Component } from "react";
import { Form } from "react-bootstrap";
import axios from "../api/Axios";
class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lista: [],

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
      t_pages: 1,
      width: 0,
      height: 0,
      open: false,
      image: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      files: [],
      filesURL: [],
      marka: "",
      mod: "",
      gor: "",
      menj: "",
      karos: "",
      grad: "",
    });
    //console.log(this.state.lista);
    this.getAllBrands();
    this.getAllModels();
    this.getAllGorivo();
    this.getAllMenjac();
    this.getAllKaroserija();
    this.getAllCity();
  }

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

  handleChange = (type, event) => {
    console.log(type, event.target.value);
    this.setState(
      { [type]: event.target.value } /* () =>
      console.log(this.state)*/
    );
  };

  onSubmit(event) {
    event.preventDefault();
    const b = this.state.marka;
    const m = this.state.mod;
    const g = this.state.gor;
    const mnj = this.state.menj;
    const k = this.state.karos;
    const gr = this.state.grad;
    const sjed = this.refs.br_sjed.value;

    const cjena_od = this.refs.price_od.value;
    const cijena_do = this.refs.price_do.value;

    const gg = this.refs.godin.value;
    const kilo = this.refs.kilom.value;
    const kub = this.refs.kubik.value;
    const konjarnik = this.refs.konj.value;

    const data1 = {
      markaId: b,
      modelId: m,
      gorivoId: g,
      menjacId: mnj,
      karoserijaId: k,
      broj_sjedista: sjed,
      city: gr,

      godina: gg,
      kilometraza: kilo,
      kubikaza: kub,
      snaga: konjarnik,
    };
    const dataa = {
      start: cjena_od,
      end: cijena_do,
    };
    const page = this.state.page;

    axios
      .post("/public/search", dataa, {
        params: {
          markaId: b,
          modelId: m,
          gorivoId: g,
          menjacId: mnj,
          karoserijaId: k,
          broj_sjedista: sjed,
          city: gr,
          godina: gg,
          kilometraza: kilo,
          kubikaza: kub,
          snaga: konjarnik,
          page,
        },
      })
      .then((respond) => {
        console.log(respond.data);
        this.props.handleToUpdate(respond.data.content);
        this.props.handleToUpdatePage(respond.data.totalPages);
        this.props.updateStateParent(data1, dataa);
      })
      .catch((error) => {
        console.log("Ne moze aloooo");
      });
  }

  render() {
    //console.log(this.props);
    //var handleToUpdate = this.props.handleToUpdate;
    return (
      <div>
        <h1 className="brzapretraga">Brza Pretraga:</h1>
        <hr />
        <Form className="form_group" onSubmit={this.onSubmit}>
          <Form.Row>
            <Form.Group controlId="marka_select">
              <Form.Label className="form_label">Izaberi marku:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("marka", event)}
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
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">Model:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("mod", event)}
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
            <Form.Group className="odmakni" controlId="gorivo_select">
              <Form.Label className="form_label">Gorivo:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("gor", event)}
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
            <Form.Group className="odmakni" controlId="menjac_select">
              <Form.Label className="form_label">Menjaca:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("menj", event)}
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
            <Form.Group className="odmakni" controlId="karoserija_select">
              <Form.Label className="form_label">Karoserija:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("karos", event)}
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
              <Form.Label className="form_label">Grad:</Form.Label>
              <Form.Control
                className="form-control input-sm"
                as="select"
                onChange={(event) => this.handleChange("grad", event)}
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
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">Broj sjedista:</Form.Label>
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
          </Form.Row>
          <Form.Row className="odbij_top">
            <Form.Group controlId="model_select">
              <Form.Label className="form_label">Cijena od:</Form.Label>
              <Form.Control
                ref="price_od"
                type="text"
                placeholder="Cijena auta..."
              />
            </Form.Group>
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">Cijena do:</Form.Label>
              <Form.Control
                ref="price_do"
                type="text"
                placeholder="Cijena auta..."
              />
            </Form.Group>
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">
                Godiste automobila:
              </Form.Label>
              <Form.Control
                ref="godin"
                type="text"
                placeholder="Godiste auta..."
              />
            </Form.Group>
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">
                Predjena kilometraza:
              </Form.Label>
              <Form.Control
                ref="kilom"
                type="text"
                placeholder="Predjena kilometraza..."
              />
            </Form.Group>
            <Form.Group className="odmakni" controlId="model_select">
              <Form.Label className="form_label">
                Kubikaza auta (cm3)
              </Form.Label>
              <Form.Control ref="kubik" type="text" placeholder="Kubikaza..." />
            </Form.Group>
            <Form.Group className="odmakni" controlId="model_select">
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
          <hr />
          <div>
            <button className="dugmePretrazi" type="submit">
              Pretrazi
            </button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Search;
