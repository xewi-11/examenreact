import axios from 'axios';
import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


export default class ActualizarPersonaje extends Component {
    serieSelected=React.createRef();
    personajeSelected=React.createRef();
    state={
        series:[],
        personajes:[],
        volver:false,
        serieSeleccionada:{},
        personajeSeleccionado:{}
    }
    cargarSeries(){
        var url="https://apiseriespersonajes.azurewebsites.net/api/Series";
        axios.get(url).then(respuesta=>{
             console.log("Leyendo");
            this.setState({
                series:respuesta.data
            })
        })
    }
    cargarPersonajesSerie=()=>{
        var url="https://apiseriespersonajes.azurewebsites.net/api/Series/PersonajesSerie/"+parseInt(this.serieSelected.current.value);
        axios.get(url).then(respuesta=>{
               
                this.setState({
                    personajes:respuesta.data
                })
                
        })
    }
    cargarPersonajesSerie2=()=>{
        var url="https://apiseriespersonajes.azurewebsites.net/api/Personajes";
        axios.get(url).then(respuesta=>{
               
                this.setState({
                    personajes:respuesta.data
                })
                
        })
    }
    cargarSerieInformacion=()=>{
        var url="https://apiseriespersonajes.azurewebsites.net/api/Series/"+parseInt(this.serieSelected.current.value);
        axios.get(url).then(respuesta=>{
            this.setState({
                serieSeleccionada:respuesta.data
            })
        })
    }
    cargarPersonajeInformacion=()=>{
        var url="https://apiseriespersonajes.azurewebsites.net/api/Personajes/"+parseInt(this.personajeSelected.current.value);
        axios.get(url).then(respuesta=>{
            this.setState({
                personajeSeleccionado:respuesta.data
            })
        })
    }
    actualizarInformacionPersonaje=(event)=>{
        event.preventDefault();
         var url="https://apiseriespersonajes.azurewebsites.net/api/Personajes/"+parseInt(this.personajeSelected.current.value)+"/"+this.serieSelected.current.value;
         axios.put(url).then(respuesta=>{
                console.log("personaje actualizado");
                this.setState({
                    volver:true
                })

         })
    }
    componentDidMount(){
        this.cargarSeries();
        this.cargarPersonajesSerie2();
    }
  render() {
    return (
      <div>Actualizar  Personaje
          
        <form className='form-control' onSubmit={this.actualizarInformacionPersonaje}>
            <select className='form-control'  id="personajeSelect" ref={this.serieSelected} onChange={this.cargarSerieInformacion}>
                <option value="">Seleccione una serie</option>
                {
                    this.state.series.map((serie,index)=>{
                        return(
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        )
                    })
                }
            </select>
            <select className='form-control' id="personajeSelect" ref={this.personajeSelected} onChange={this.cargarPersonajeInformacion}>
                {
                    
                    this.state.personajes.map((personaje,index)=>{
                        return(
                            <option key={index} value={personaje.idPersonaje}>{personaje.nombre}</option>
                        )
                    })
                    

                }
            </select>
            <button className='form-control' type='submit'>Actualizar Personaje</button>
        </form>
        <div><h1>{this.state.serieSeleccionada.nombre}</h1>
        <img src={this.state.serieSeleccionada.imagen} alt={this.state.serieSeleccionada.nombre} />
         {
            this.state.volver && <Navigate to={"/personajes/"+this.serieSelected.current.value}/>
         }
      </div>
      <div><h1>{this.state.personajeSeleccionado.nombre}</h1>
        <img src={this.state.personajeSeleccionado.imagen} alt={this.state.personajeSeleccionado.nombre} />
      </div>
      </div>
    )
  }
}
