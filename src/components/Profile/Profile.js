import React from 'react';
import { useState } from 'react';

import './Profile.css'
import Header from '../Header/Header';

export default function Profile ({loggedIn, handleLogout }) {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
    }
    
        return(
        <section className='profile'>
            <Header
                loggedIn={loggedIn}
            />
            <div className='profile__container'>
                <h2 className='profile__title'>Привет, Виталий!</h2>
                <form className='profile__form' onSubmit={handleSubmit}>
                <label className='profile__label'>Имя
                        <input className='profile__input'
                        type='text' 
                        name='name'
                        value={'' || name}
                        onChange={handleChangeName} 
                        id='name-input' 
                        minLength='2' maxLength='30' 
                        required/>
                        <span className='register__input-error name-input-error form__input-error'></span>
                    </label>
                    <div className='profile__line'></div>
                    <label className='profile__label'>E-mail
                        <input className='profile__input'
                        type='email' 
                        name='email'
                        autoComplete='on' 
                        id='email-input' 
                        minLength='6' maxLength='20' 
                        required
                        value={email || ''}
                        onChange={handleChangeEmail}
                        />
                        <span className='login__input-error email-input-error form__input-error'></span>
                    </label>
                    <div className='profile__buttons'>
                    <button className='profile__button profile__hover' type='submit'>Редактировать</button>
                    <button className='profile__button profile__button-red profile__hover' type='button' onClick={handleLogout}>Выйти из аккаунта</button>
                </div>
                </form>
            </div>
        </section>
    )
}