import React from "react"
import { BrowserRouter,
    Routes, Route} from "react-router-dom"
import Home from '../pages/Home'
import About from '../pages/About'
import Login from '../pages/Login'
import Cadastrotipousuario from '../pages/Usuarios/TipoUsuario/Cadastrotipousuario'
import UpdateTipousuario from '../pages/Usuarios/TipoUsuario/UpdateTipousuario'
import CadastroUsuarioView from '../pages/Usuarios/Usuario/CadastroView/CadastroUsuarioView'
import CadastrotipousuarioView from '../pages/Usuarios/TipoUsuario/Cadastrotipousuarioview'
import CadastroUsuario from "../pages/Usuarios/Usuario/CadastroUsuario"
import UpdateUsuario from "../pages/Usuarios/Usuario/UpdateUsuario"
import UsuarioView from '../pages/Usuarios/UsuarioView'

var Routas = () =>(

    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/about" element = {<About/>}/>
            <Route exact path="/login" element = {<Login/>}/>
            <Route exact path="/cadastrotipousuario" element = {<Cadastrotipousuario/>}/>
            <Route exact path="/cadastrotipousuarioview" element = {<CadastrotipousuarioView/>}/>
            <Route exact path="/cadastrousuarioview" element = {<CadastroUsuarioView/>}/>
            <Route exact path="/cadastrousuario" element = {<CadastroUsuario/>}/>
            <Route exact path="/updateusuario" element = {<UpdateUsuario/>}/>
            <Route exact path="/updatetipousuario" element = {<UpdateTipousuario/>}/>
            <Route exact path="/usuario" element = {<UsuarioView/>}/>
        </Routes>
        </BrowserRouter>
)

export default Routas