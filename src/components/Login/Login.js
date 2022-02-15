import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Login.css'

export default function Login () {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

        function handleSubmit(evt) {
            evt.preventDefault();
        
        }

    //useEffect(() => {
        //setCurrentRoute('/signin');
    //}, []);

    
        return(
        <section className="login">
            <div className="login__container">
                <img className="login__image" src={logo} alt="смайл"/>
                <h2 className="login__title">Рады видеть!</h2>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label className="login__label">E-mail
                        <input className="login__input"
                        type="email" 
                        name="email"
                        autoComplete="on" 
                        id="email-input" 
                        minLength="6" maxLength="20" 
                        required
                        value={email || ''}
                        onChange={handleChangeEmail}
                        />
                        <span className="login__input-error email-input-error form__input-error"></span>
                    </label>
                    <label className="login__label">Пароль
                        <input className="login__input"
                        type="password" 
                        name="password"
                        autoComplete="on" 
                        id="password-input"
                        minLength="6" 
                        maxLength="20" required
                        value={password}
                        onChange={handleChangePassword}
                        />
                        <span className="login__input-error password-input-error form__input-error"></span>
                    </label>
                    <button className="login__button" type="submit">Войти</button>
                    <div className="login__box">
                        <p className="login__text">Ещё не зарегистрированы?</p>
                        <Link to='/signup' className='login__registrations' target='_self'>Регистрация</Link>
                    </div>
                    
                </form>
            </div>
        </section>
    )
}