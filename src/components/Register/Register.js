import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../../images/logo.svg'
import './Register.css'
import { FormValidation } from '../../hooks/FormValidation';

export default function Register ({onRegister}) {

    const [buttonDisabled, setButtonDisabled] = useState(true)
    const handleForm = FormValidation()

    useEffect(() => {
        handleForm.isValid ? setButtonDisabled(false) : setButtonDisabled(true)
    }, [handleForm.isValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        onRegister(handleForm.values);
        handleForm.resetForm()
    }
    

        return(
        <div className='register'>
            <div className='register__container'>
                <img className='register__image' src={logo} alt='смайл'/>
                <h2 className='register__title'>Добро пожаловать!</h2>
                <form className='register__form' onSubmit={handleSubmit}>
                    <label className='register__label'>Имя
                        <input className={`register__input ${handleForm.errors.name && 'register__input_wrong'}`}
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
                        <span className='register__input-error'>{handleForm.errors.name}</span>
                    </label>
                    <label className='register__label'>E-mail
                        <input className={`register__input ${handleForm.errors.email && 'register__input_wrong'}`}
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
                        <span className='register__input-error'>{handleForm.errors.email}</span>
                    </label>
                    <label className='register__label'>Пароль
                        <input className={`register__input ${handleForm.errors.password && 'register__input_wrong'}`}
                        type='password' 
                        name='password'
                        value={handleForm.values.this}
                        onChange={handleForm.handleChange} 
                        id='password' 
                        minLength='6' 
                        maxLength='20'
                        title='поле должно содержать не менее 6 и не более 20 знаков' 
                        required/>
                        <span className='register__input-error'>{handleForm.errors.password}</span>
                    </label>
                    <button className={`register__button ${buttonDisabled && 'register__button_disabled'}`} type='submit'>Зарегистрироваться</button>
                </form>
                <div className='register__box'>
                    <p className='register__text' >Уже зарегистрированы?</p>
                    <Link className='register__link' to='/signin'>Войти</Link>
                </div>
            </div>
        </div>
    )
}