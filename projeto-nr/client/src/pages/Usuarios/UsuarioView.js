import React from 'react'
import App from '../../Layout/App'
import './Usuario.css'
import { Link } from 'react-router-dom'



var UsuarioView = () =>(


<App>
<div className='container-register'>
<h1 className='container-title-regiter'>Usuários</h1>
        <div className='view-view-usuario'>
            <div className='view-view-usuario-one div-usuario'>
                 <Link className='view-view-usuario-three-div-for' to="/cadastrotipousuarioview">
                    <span>Tipos de acesso</span>
                </Link>
            </div>

            <div className='view-view-usuario-two div-usuario'>
                <Link className='view-view-usuario-three-div-for' to="/cadastrousuarioview">
                    <span>Cadastrar usuários</span>
                </Link>
            </div>
            <div className='view-view-usuario-three div-usuario'>
                <span> Relatórios de usuários</span>
            </div>
            <div className='view-view-usuario-for div-usuario'>
                <span>Cofigurações de usuário</span>
            </div>

        </div>
        </div>
    </App>


)

export default UsuarioView