import React, { Component } from 'react'
import { BrowserRouter,Routes,Route, useParams } from 'react-router-dom'
import MenuRutas from './components/MenuRutas'
import Home from './components/Home'
import Serie from './components/Serie'
import Personajes from './components/Personajes'
import InsertarPersonaje from './components/InsertarPersonaje'
import ActualizarPersonaje from './components/ActualizarPersonaje'
export default class Router extends Component {
    
  render() {
function SerieElement(){
        let {idSerie}=useParams();
        return <Serie idSerie={idSerie}/>
    }
    function PersonajesElement(){
        let {idSerie}=useParams();
        return <Personajes idSerie={idSerie}/>
    }
    function InsertarPersonajeElement(){
         let {idSerie}=useParams();
        return <InsertarPersonaje idSerie={idSerie}/>;
    }
    return (
        <BrowserRouter>
        <MenuRutas/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/serie/:idSerie' element={<SerieElement/>} />
            <Route path='/personajes/:idSerie' element={<PersonajesElement/>} />
            <Route path='/insertar' element={<InsertarPersonaje/>} />
            <Route path='/actualizar' element={<ActualizarPersonaje/>} />
        </Routes>
        </BrowserRouter>
    )
  }
}
