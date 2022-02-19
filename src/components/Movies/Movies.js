import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({loggedIn}) {
    
    return (
        <section className='movies'>
            <Header
                loggedIn={loggedIn}
            />
            <SearchForm/>
            <MoviesCardList/>
            <Footer/>
        </section>
    );
    }