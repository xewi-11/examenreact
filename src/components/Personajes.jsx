import React, { Component } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function BotonVolver({idSerie}){
    const navigate=useNavigate();
    return(
        <button onClick={()=>{navigate("/serie/"+idSerie)}}>Volver a la serie</button>
    )
}
export default class Personajes extends Component {
    url="https://apiseriespersonajes.azurewebsites.net/";
    state={
        personajes:[]
    }
    cargarPersonajes(){
        var request="api/Series/PersonajesSerie/"+this.props.idSerie;
        axios.get(this.url+request).then(respuesta=>{
            console.log("LEyendo Personajes");
            this.setState({
                personajes:respuesta.data
            })
        })
    }
    componentDidMount(){
        this.cargarPersonajes();
    }
    componentDidUpdate(oldProps){
        if(oldProps.idSerie!==this.props.idSerie){
            this.cargarPersonajes();
        }
    }
  render() {
    return (
      <div>Personajes de  {this.props.idSerie}
        <BotonVolver idSerie={this.props.idSerie}/>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Imagen</th>
                    </tr>
            </thead>
            <tbody>
                {
                    this.state.personajes.map((personaje,index)=>{
                        return(
                            <tr key={index}>
                                 <td>{personaje.nombre}</td>
                                 <td><img src={personaje.imagen} alt={personaje.nombre} /></td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
      </div>
    )
  }
}
