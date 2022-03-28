import React,{ useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import ScreenSize from '../../hooks/ScreenSize';

export default function MoviesCardList ({moviesList, message, favoriteMoviesData, favoriteList, handleSaveFilm, handleDeleteFilm}) {

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
                    moviesList && !message
                    && moviesList.map((item, index) => {
                if (index + 1 <= moviesTotal) {
                    return <MoviesCard 
                    movieData={item} 
                    key={index}
                    favoriteList={favoriteList}
                    handleSaveFilm={ handleSaveFilm}
                    handleDeleteFilm={handleDeleteFilm}
                    />;
                } else {
                    return '';
                }
                })}
                {routes.pathname === '/saved-movies' &&
                    favoriteMoviesData && !message
                    && favoriteMoviesData.map((item, index) => {
                if (index + 1 <= moviesTotal) {
                    return <MoviesCard 
                    movieData={item} 
                    key={index}
                    favoriteList={favoriteList}
                    handleDeleteFilm={handleDeleteFilm}
                    />;
                } else {
                    return '';
                }
                })}
            </ul>
        {routes.pathname === '/movies' && moviesTotal < moviesList.length &&  !message && (
            <button  className='movie-list__button movie-list__hover' onClick={addCards}>Ещё
            </button>
        )}
            
        </section>
    );
}