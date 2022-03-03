import React from 'react';
import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg'
import './Login.css'
import { FormValidation } from '../../hooks/FormValidation';


export default function Login ({onLogin}) {


    const [buttonDisabled, setButtonDisabled] = useState(true)
    const handleForm = FormValidation()

    useEffect(() => {
        handleForm.isValid ? setButtonDisabled(false) : setButtonDisabled(true)
    }, [handleForm.isValid])

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(handleForm.values);
        handleForm.resetForm()
    }
    
        return(
        <section className='login'>
            <div className='login__container'>
                <img className='login__image' src={logo} alt='смайл'/>
                <h2 className='login__title'>Рады видеть!</h2>
                <form className='login__form' onSubmit={handleSubmit}>
                    <label className='login__label'>E-mail
                        <input className={`login__input ${handleForm.errors.email && 'login__input_wrong'}`}
                        type='email' 
                        name='email'
                        id="email" 
                        minLength='6' 
                        maxLength='20'
                        pattern='^[^@\s]+@[^@\s]+\.[^@\s]+$' 
                        required
                        value={handleForm.values.this}
                        onChange={handleForm.handleChange}
                        title='поле должно содержать формат электронного адреса'  
                        />
                        <span className='login__input-error'>{handleForm.errors.email}</span>
                    </label>
                    <label className='login__label'>Пароль
                        <input className={`login__input ${handleForm.errors.password && 'login__input_wrong'}`}
                        type='password' 
                        name='password'
                        id='password'
                        minLength='6' 
                        maxLength='20' 
                        required
                        value={handleForm.values.this}
                        onChange={handleForm.handleChange}
                        title='поле должно содержать не менее 6 и не более 20 знаков'  
                        />
                        <span className='login__input-error'>{handleForm.errors.password}</span>
                    </label>
                    <button className={`register__button ${buttonDisabled && 'register__button_disabled'}`} type="submit">Войти</button>
                </form>
                <div className='login__box'>
                    <p className='login__text'>Ещё не зарегистрированы?</p>
                    <Link to='/signup' className='login__link' target='_self'>Регистрация</Link>
                </div>
            </div>
        </section>
    )
}