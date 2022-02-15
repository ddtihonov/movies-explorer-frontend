import React from 'react'
import './AboutMe.css'
import me from '../../images/me.jpg'

export default function  AboutMe () {
    return (
        <section className='me' id='about-me'>
            <div className='me__container'>
                <h2 className='me__title'>Студент</h2>
                <div className='me__line'></div>
                <article className='me__article'>
                    <div className='me__box'>
                        <h2 className='me__subtitle'>Дмитрий Тихонов</h2>
                        <p className='me__about'>Фронтенд-разработчик, 45 лет</p>
                        <p className='me__text'></p>
                        <div className='me__links'>
                            <a className='me__link' href='https://www.facebook.com/ddtikhonov' target='_blank' rel='noreferrer'>Facebook</a>
                            <a className='me__link' href='https://github.com/ddtihonov' target='_blank' rel='noreferrer'>Github</a>
                        </div>
                    </div>
                    <img className="me__image" src={me} alt="человек"/>
                </article>
            </div>
        </section>
    )
}