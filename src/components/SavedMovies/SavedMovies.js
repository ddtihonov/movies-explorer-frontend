import React from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({loggedIn}) {
    
    return (
        <section className='saved-movies'>
            <Header
                loggedIn={loggedIn}
            />
            <SearchForm/>
            <MoviesCardList/>
            <Footer/>
        </section>
    );
    }