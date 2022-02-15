import React, { useState} from 'react';
import logo from '../../images/logo.svg'
import { Link } from 'react-router-dom'; 

import './Header.css'

export default function Header(props) {

    return (
    <header className="header">
        <div className='header__container'>
            <img className="header__image" src={logo} alt="смайл"/>
            <nav className='header__navigation'>
                <Link to='/signup' className='header__registrations' target='_self'>Регистрация</Link>
                <Link to='/signin' className='header__entrance' target='_self'>Войти</Link>
            </nav>
        </div>
    </header>
)
}