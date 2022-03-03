import React from 'react';
import { useState, useEffect } from 'react';
import { FormValidation } from '../../hooks/FormValidation';
import './Profile.css'
import Header from '../Header/Header';
import { CurrentUser } from '../../context/CurrentUserContext';

export default function Profile ({loggedIn, handleLogout, chargingData }) {

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const handleForm = FormValidation()

    console.log(buttonDisabled)

    useEffect(() => {
        handleForm.isValid ? setButtonDisabled(false) : setButtonDisabled(true)
    }, [handleForm.isValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        chargingData(handleForm.values);
        handleForm.resetForm()
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
                            <input className={`profile__input ${handleForm.errors.name && 'profile__input_wrong'}`}
                            type='text' 
                            name='name'
                            value={handleForm.values.this}
                            onChange={handleForm.handleChange} 
                            id='name' 
                            minLength='2' 
                            maxLength='30'
                            pattern='^[A-Za-zА-Яа-яЁё\s\-]{2,30}$'
                            title='поле может содержать только латиницу, кириллицу, пробел или дефис'
                            required/>
                        </label>
                        <span className='profile__input-error'>{handleForm.errors.name}</span>
                        <div className='profile__line'></div>
                        <label className='profile__label'>E-mail
                            <input className={`profile__input ${handleForm.errors.email && 'profile__input_wrong'}`}
                            type='email' 
                            name='email'
                            value={handleForm.values.this}
                            onChange={handleForm.handleChange} 
                            id='email' 
                            minLength='6' 
                            maxLength='20'
                            pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$'
                            title='поле должно содержать формат электронного адреса' 
                            required/>
                        </label>
                        <span className='profile__input-error'>{handleForm.errors.email}</span>
                        <div className='profile__buttons'>
                            <button className={`profile__button ${buttonDisabled && 'profile__button_disabled'}`} type='submit'>Редактировать</button>
                            <button className='profile__button profile__button-red profile__hover' type='button' onClick={handleLogout}>Выйти из аккаунта</button>
                        </div>
                </form>
            </div>
        </section>
    )
}