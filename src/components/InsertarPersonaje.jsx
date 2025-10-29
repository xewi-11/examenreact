import axios from 'axios';
import React, { Component } from 'react'

export default class InsertarPersonaje extends Component {
    url="";
    cajanombre=React.createRef();
    cajaimagen=React.createRef();
    cajaSelect=React.createRef();
    state={
        series:[]
    }
    cargarSeries(){
        var url="https://apiseriespersonajes.azurewebsites.net/api/Series";
        axios.get(url).then(respuesta=>{
            this.setState({series:respuesta.data});
        })
    }
    componentDidMount(){
        this.cargarSeries();
    }
    InsertarPersonaje=(event)=>{
        event.preventDefault();
        var url="https://apiseriespersonajes.azurewebsites.net/api/Personajes";
        var nombre=this.cajanombre.current.value;
        console.log(nombre);
        var imagen=this.cajaimagen.current.value;
        var idSerie=parseInt(this.cajaSelect.current.value);
        var personajeNuevo={
        }
        personajeNuevo.idPersonaje=0;
        personajeNuevo.nombre=nombre;
        personajeNuevo.imagen=imagen;
        personajeNuevo.idSerie=idSerie;

        console.log(personajeNuevo);
        axios.post(url,{
            idPersonaje:personajeNuevo.idPersonaje,
            nombre:personajeNuevo.nombre,
            imagen:personajeNuevo.imagen,
            idSerie:personajeNuevo.idSerie
        }).then(respuesta=>{
            console.log("Personaje Insertado");
            alert("Personaje Insertado");
        })
    }
  render() {
    return (
      <div>
        <h1>Insertar Personaje</h1>
        <form className='form-control' onSubmit={this.InsertarPersonaje}>
            <label className='form-control'> Inserte el nombre del personaje</label>
            <input type="text" className='form-control' ref={this.cajanombre}/>
            <label className='form-control'> Inserte la imagen del personaje</label>
            <input type="text" className='form-control' ref={this.cajaimagen}/>
            <select  className='form-control' ref={this.cajaSelect}>
                {
                    this.state.series.map((serie,index)=>{
                        return(
                            <option key={index} value={serie.idSerie}>{serie.nombre}</option>
                        )
                    })
                }
            </select>
            <button type="submit">Insertar Personaje</button>
        </form>
      </div>
    )
  }
}
