import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import axios from 'axios';
export default class MenuRutas extends Component {
    url="https://apiseriespersonajes.azurewebsites.net/api/Series";
    state={
        series:[]
    }
    cargarSeries(){
        axios.get(this.url).then(respuesta=>{
             console.log("Leyendo");
            this.setState({
                series:respuesta.data
            })
        })
    }
    componentDidMount(){
        this.cargarSeries();
    }
    componentDidUpdate(oldProps){
        if(oldProps.idSerie!==this.props.idSerie){
            this.cargarSeries();
        }
    }
  render() {
   return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/insertar">
                  Insertar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/actualizar">
                  Actualizar
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Series
                </a>
                <ul className="dropdown-menu">
                  {this.state.series.map((serie, index) => {
                    return (
                      <li key={index} className=".list-group-item-primary">
                        <NavLink
                          className="dropdown-item"
                          to={"serie/" + serie.idSerie}
                        >
                          {serie.nombre}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
