import axios from 'axios';
import React, { Component } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';


export default class ActualizarPersonaje extends Component {
    serieSelected=React.createRef();
    personajeSelected=React.createRef();
    state={
        series:[],
        personajes:[],
        volver:false
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
    actualizarInformacionPersonaje=(event)=>{
        event.preventDefault();
         var url="https://apiseriespersonajes.azurewebsites.net/api/Personajes/"+parseInt(this.personajeSelected.current.value)+"/"+parseInt(this.serieSelected.current.value);
         axios.put(url).then(respuesta=>{
                console.log("personaje actualizado");
                this.setState({
                    volver:true
                })

         })
    }
    componentDidMount(){
        this.cargarSeries();
    }
  render() {
    return (
      <div>Actualizar  Personaje

        <form className='form-control' onSubmit={this.actualizarInformacionPersonaje}>
            <select className='form-control'  id="personajeSelect" ref={this.serieSelected} onChange={this.cargarPersonajesSerie}>
                <option value="">Seleccione una serie</option>
                {
                    this.state.series.map((serie,index)=>{
                        return(
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        )
                    })
                }
            </select>
            <select className='form-control' id="personajeSelect" ref={this.personajeSelected}>
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
         {
            this.state.volver && <Navigate to={"/serie/"+this.serieSelected.current.value}/>
         }
      </div>
    )
  }
}
