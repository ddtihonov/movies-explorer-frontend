import React, { useState} from 'react';
import logo from '../../images/logo.svg';
import icon_account from '../../images/icon_account.svg';
import icon__close from '../../images/icon_close.svg';
import { Link } from 'react-router-dom'; 


import './Header.css'

export default function Header({loggedIn}) {

    const [isDataOpen, setIsDataOpen] = useState(false);

    function openData () {
        setIsDataOpen(true)
    }

    function closeData () {
        setIsDataOpen(false)
    }

    return (
    <header className='header'  className={`${loggedIn ? 'header-black' : 'header'}`}>
        <div className='header__container'>
            <Link to='/' className='header__link-logo header__hover' target='_self'>
                <img className='header__image' src={logo} alt='смайл'/>
            </Link>
                {loggedIn ? (
                    <>
                    <nav className='header__navigation-black'>
                        <Link to='/signup' className='header__link header__hover' target='_self'>Фильмы</Link>
                        <Link to='/signin' className='header__link header__hover' target='_self'>Сохранённые фильмы</Link>
                        <Link to='/profile' className='header__link header__hover' target='_self'>Аккаунт</Link>
                    </nav>
                    <div className='header__box'>
                        <img className='header__icon' src={icon_account} alt='человечек'/>
                    </div>
                    <button className={`header__burger header__hover ${isDataOpen ? 'close' : ''}`} onClick={openData}/>
                    <div className={`header__menu-mobile ${isDataOpen ? 'active' : ''}`}>
                        <button className='header__close-icon header__hover'  onClick={closeData}/>
                        <nav className='header__navigation-black'>
                            <Link to='/signup' className='header__link header__hover' target='_self'>Фильмы</Link>
                            <Link to='/signin' className='header__link header__hover' target='_self'>Сохранённые фильмы</Link>
                            <Link to='/profile' className='header__link header__hover' target='_self'>Аккаунт</Link>
                        </nav>
                        <div className='header__box'>
                            <img className='header__icon' src={icon_account} alt='человечек'/>
                        </div>
                    </div>
                    </>
                    
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