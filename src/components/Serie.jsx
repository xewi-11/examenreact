import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BotonPersonajes = ({ idSerie }) => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/personajes/" + idSerie)}>
      Personajes
    </button>
  );
};
export default class Serie extends Component {
    url="https://apiseriespersonajes.azurewebsites.net/";
    state={
        serie:{}
    }
    cargarInformacionSerie(){
        var request="api/Series/"+this.props.idSerie;
        axios.get(this.url+request).then(respuesta=>{
                console.log("Leyendo Serie");
                this.setState({
                    serie:respuesta.data
                })
        })
    }
    componentDidMount(){
        this.cargarInformacionSerie();
    }
    componentDidUpdate(oldProps){
        if(oldProps.idSerie!==this.props.idSerie){
            this.cargarInformacionSerie();
        }
    }
  render() {
    return (
      <div>
        <h1>Detalle de la Serie</h1>
        <div>

            <h2>{this.state.serie.nombre}</h2>
            <img src={this.state.serie.imagen} alt={this.state.serie.nombre}/>
            <h4>{this.state.serie.puntuacion}</h4>
            <BotonPersonajes idSerie={this.state.serie.idSerie}/>
        </div>
      </div>
    );
  }
}
