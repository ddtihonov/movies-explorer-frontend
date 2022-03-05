import React from 'react';
import { useState, useEffect } from 'react';
import './Profile.css'
import Header from '../Header/Header';
import { CurrentUser } from '../../context/CurrentUserContext';

export default function Profile ({loggedIn, handleLogout, chargingData }) {
    
    const currentUser = React.useContext(CurrentUser)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [wrongName, setWrongName] = useState(false)
    const [wrongEmail, setWrongEmail] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if (currentUser) {
            setName(currentUser.user.name)
            setEmail(currentUser.user.email)
        }
    }, [currentUser])

    useEffect(() => {
        if (name && email) {
            wrongName || wrongEmail || (name === currentUser.user.name && email === currentUser.user.email)
                ?
                setButtonDisabled(true)
                :
                setButtonDisabled(false)
        }
    }, [wrongName, wrongEmail, email, name, currentUser])

    const handleNameInput = (evt) => {
        setName(evt.target.value)
        evt.target.validationMessage ?
            setWrongName(evt.target.validationMessage)
            :
            setWrongName('')
    }

    const handleEmailInput = (evt) => {
        setEmail(evt.target.value)
        evt.target.validationMessage ?
            setWrongEmail(evt.target.validationMessage)
            :
            setWrongEmail('')
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log('вася')
        chargingData({ name, email });
    }
    
        return(
        <section className='profile'>
            <Header
                loggedIn={loggedIn}
            />
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, {currentUser && currentUser.user.name}!</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                    <label className='profile__label'>Имя
                            <input className={`profile__input ${wrongName && 'profile__input_wrong'}`}
                            type='text' 
                            name='name'
                            value={name}
                            onChange={handleNameInput} 
                            id='name'
                            formNoValidate
                            minLength='2' 
                            maxLength='30'
                            pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                            required/>
                        </label>
                        {
                        wrongName &&
                        <span className='profile__input-error name-error'>поле может содержать только латиницу, кириллицу, пробел или дефис</span>
                        }
                        <div className='profile__line'></div>
                        <label className='profile__label'>E-mail
                            <input className={`profile__input ${wrongEmail && 'profile__input_wrong'}`}
                            type='email' 
                            name='email'
                            value={email}
                            onChange={handleEmailInput} 
                            id='email'
                            formNoValidate 
                            minLength='6' 
                            maxLength='20'
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            required/>
                        </label>
                        {
                        wrongEmail &&
                        <span className='profile__input-error email-error'>{wrongEmail}</span>
                        }
                        <div className='profile__buttons'>
                            <button className={`profile__button ${buttonDisabled && 'profile__button_disabled'}`} type='submit'>Редактировать</button>
                            <button className='profile__button profile__button-red profile__hover' type='button' onClick={handleLogout}>Выйти из аккаунта</button>
                        </div>
                </form>
            </div>
        </section>
    )
}