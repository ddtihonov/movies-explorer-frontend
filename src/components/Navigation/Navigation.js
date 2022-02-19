import React, { useState} from 'react';
import icon_account from '../../images/icon_account.svg';
import { Link } from 'react-router-dom'; 
import './Navigation.css'

export default function Navigation () {

    const [isDataOpen, setIsDataOpen] = useState(false);

    function openData () {
        setIsDataOpen(true)
    }

    function closeData () {
        setIsDataOpen(false)
    }

    return (
        <>
        <nav className='navigation__navigation-black'>
            <Link to='/movies' className='navigation__link navigation__hover' target='_self'>Фильмы</Link>
            <Link to='/saved-movies' className='navigation__link navigation__hover' target='_self'>Сохранённые фильмы</Link>
            <Link to='/profile' className='navigation__link navigation__hover' target='_self'>Аккаунт</Link>
        </nav>
        <div className='navigation__box'>
            <img className='navigation__icon' src={icon_account} alt='человечек'/>
        </div>
        <button className={`navigation__burger navigation__hover ${isDataOpen ? 'close' : ''}`} onClick={openData}/>
        <div className={`navigation__menu-mobile ${isDataOpen ? 'active' : ''}`}>
            <button className='navigation__close-icon navigation__hover'  onClick={closeData}/>
            <nav className='navigation__navigation-menu-mobile'>
                <Link to='/' className='navigation__link-mobile navigation__hover' target='_self'>Главная</Link>
                <Link to='/movies' className='navigation__link-mobile navigation__hover' target='_self'>Фильмы</Link>
                <Link to='/saved-movies' className='navigation__link-mobile navigation__hover' target='_self'>Сохранённые фильмы</Link>
            </nav>
            <div  className='navigation__box-mobile'>
                    <Link to='/profile' className='navigation__link navigation__hover' target='_self'>Аккаунт</Link>
                    <div className='navigation__icon-mobile'>
                        <img className='navigation__icon' src={icon_account} alt='человечек'/>
                    </div>
                </div>
        </div>
        </>
    )
}