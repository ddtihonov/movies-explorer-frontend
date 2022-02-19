import React from 'react';
import logo from '../../images/logo.svg';
import { Link } from 'react-router-dom'; 

import Navigation from '../Navigation/Navigation';
import './Header.css'

export default function Header({loggedIn}) {
    
    return (
    <header className='header'  className={`${loggedIn ? 'header-black' : 'header'}`}>
        <div className='header__container'>
            <Link to='/' className='header__link-logo header__hover' target='_self'>
                <img className='header__image' src={logo} alt='смайл'/>
            </Link>
                {loggedIn ? (
                    <Navigation/>
                ) : (
                    <nav className='header__navigation'>
                        <Link to='/signup' className='header__registrations header__hover' target='_self'>Регистрация</Link>
                        <Link to='/signin' className='header__entrance header__hover' target='_self'>Войти</Link>
                    </nav>
                )}
        </div>
    </header>
)
}