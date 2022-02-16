import React from 'react'
import './Main.css'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from '../Promo/Promo'
import AboutProject from '../AboutProject/AboutProject'
import Techs from '../Techs/Techs'
import AboutMe from '../AboutMe/AboutMe';

export default function Main() {

    return (
    <section className='main'>
        <Header/>
        <Promo/>
        <AboutProject/>
        <Techs/>
        <AboutMe/>
        <Footer/>
    </section>
)
}