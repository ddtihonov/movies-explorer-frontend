import React from 'react'
import './Promo.css'
import img_promo from '../../images/text__landing-logo.svg'

export default function Promo () {
    return (
        <section className='promo'>
            <div className='promo__container'>
            <div className='promo__box'>
                <h1 className='promo__titile'>Учебный проект студента факультета Веб&nbsp;-&nbsp;разработки.</h1>
                <p className='promo__text'>Листайте ниже, чтобы узнать больше про этот проект и его создателя.</p>
                <button className="promo__button">Узнать больше</button>
            </div>
            <img className='promo__image' src={img_promo} alt="шар"/>
            </div>
        </section>
    )
}