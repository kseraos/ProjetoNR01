import React from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
import Settings from '../imgs/icon-settings.svg'
import Searchs from '../imgs/searchs.svg'

const Menu = () => (
    <nav className="app-menu">
        {/* <div className='divBusca'>

            <img className='busca'src={Searchs}/>
            <input type="text" name="name" className='txtBusca'/>

        </div> */}
        <ul className="app-menu__list">
            <li className="app-menu__item">
                <Link className="app-menu__link" to="/about">
                <img className='icon'src={Settings}/>
                </Link>
            </li>
        </ul>

        </nav>
)

export default Menu