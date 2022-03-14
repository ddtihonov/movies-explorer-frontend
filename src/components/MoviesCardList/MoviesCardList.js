import React,{ useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import ScreenSize from '../../hooks/ScreenSize';

export default function MoviesCardList ({moviesList, onCardLike, onCardDelete, message, favoriteMoviesList}) {

    const routes  = useLocation()
    const [moviesTotal, setMoviesTotal] = useState(0);
    const [addMovies, setAddMovies] = useState(0);
    const width = ScreenSize()

    useEffect(() => {
        function getCards() {
            if (width >= 1280) {
                setMoviesTotal(12);
                setAddMovies(3);
                } else if (width < 1279 && width >= 767) {
                    setMoviesTotal(8);
                    setAddMovies(2);
                        } else if (width <= 766) {
                            setMoviesTotal(5);
                            setAddMovies(1);
            }
        }
        getCards();
    }, [width]);


    function addCards() {
        setMoviesTotal(moviesTotal + addMovies);
    }

    return (
        <section className='movie-list'>
            {message &&
                <p className="movies__message">{message}</p>
            }
            <ul className="movie-list__roster">
                {routes.pathname === '/movies' &&
                    moviesList 
                    && moviesList.map((item, index) => {
                if (index + 1 <= moviesTotal) {
                    return <MoviesCard 
                    movieData={item} 
                    key={index}
                    onCardLike={onCardLike}
                    favoriteMoviesList ={favoriteMoviesList}
                    />;
                } else {
                    return '';
                }
                })}
                {routes.pathname === '/saved-movies' &&
                    favoriteMoviesList 
                    && favoriteMoviesList.map((item, index) => {
                if (index + 1 <= moviesTotal) {
                    return <MoviesCard 
                    movieData={item} 
                    key={index}
                    onCardDelete={onCardDelete}
                    favoriteMoviesList={favoriteMoviesList}
                    />;
                } else {
                    return '';
                }
                })}
            </ul>
        { moviesTotal < 100 && routes.pathname === '/movies' && !message && (
            <button  className='movie-list__button movie-list__hover' onClick={addCards}>Ещё
            </button>
        )}
            
        </section>
    );
}