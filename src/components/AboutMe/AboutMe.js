import React from 'react'
import './AboutMe.css'
import me from '../../images/me.jpg'
import sagitta from '../../images/sagitta.svg'

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
                        <p className='me__text'>Я живу в Москве, у меня есть высшее экономическое образование и многолетний опыт работы в банковской сфере. Мне нравится путешествовать, встречаться с друзьями, заниматься саморазвитием, смотреть хорошее кино и слушать книги.</p>
                        <div className='me__links'>
                            <a className='me__link' href='https://www.facebook.com/ddtikhonov' target='_blank' rel="noopener noreferrer">Facebook</a>
                            <a className='me__link' href='https://github.com/ddtihonov' target='_blank' rel="noopener noreferrer">Github</a>
                        </div>
                    </div>
                    <img className="me__image" src={me} alt="человек"/>
                </article>
                <p className='me__portfolio'>Портфолио</p>
                <ul className='me__list'>
                    <li className='me__item'>
                        <p className='me__list-text'>Одностраничный сайт</p>
                        <a className='me__list-link'href='https://ddtihonov.github.io/russian-travel/index.html' target='_blank' rel="noopener noreferrer">
                            <img className="me__list-image" src={sagitta} alt="стрелка"/>
                        </a>
                    </li>
                    <li className='me__item'>
                        <p className='me__list-text'>Многостраничный сайт</p>
                        <a className='me__list-link' href='https://ddtihonov.github.io/Deluxe-house/' target='_blank' rel="noopener noreferrer" >
                            <img className="me__list-image" src={sagitta} alt="стрелка"/>
                        </a>
                    </li>
                    <li className='me__item'>
                        <p className='me__list-text'>Одностраничное приложение</p>
                        <a className='me__list-link' href='https://ddtihonov.github.io/react-mesto-auth' target='_blank' rel="noopener noreferrer">
                            <img className="me__list-image" src={sagitta} alt="стрелка"/>
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    )
}