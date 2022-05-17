import React from 'react'
 import Menu from '../Menu'
 import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => (


    <>
        <header className="app-header">
        <ul className="app-menu__list">
            <li className="app-menu__item">
                <Link className="app-menu__link" to="/">
                    Home
                </Link>
            </li>
        </ul>
        <Menu/>
    </header>
    </>
)

export default Header