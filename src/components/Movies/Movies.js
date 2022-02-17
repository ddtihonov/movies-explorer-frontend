import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import './Movies.css'

export default function Movies({loggedIn}) {
    
    return (
        <section className='movies'>
            <Header
                loggedIn={loggedIn}
            />
        
            <Footer/>
        </section>
    );
    }