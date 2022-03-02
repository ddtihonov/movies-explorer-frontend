import React,{ useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preolader'
import api from '../../utils/MoviesApi'
import ScreenSize from '../../hooks/ScreenSize';

export default function MoviesCardList () {

    const routes  = useLocation()
    const [moviesList, setMoviesList] = useState([]);
    const [moviesTotal, setMoviesTotal] = useState(0);
    const [addMovies, setAddMovies] = useState(0);
    const width = ScreenSize()

    useEffect(() => {
        api.getInitialCards()
            .then((cardsInfo) => {
                setMoviesList(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);

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
            {moviesList.length === 0 ? (
            <Preloader />
            ) : (
            <ul className="movie-list__roster">
                {moviesList.map((item, index) => {
                if (index + 1 <= moviesTotal) {
                    return <MoviesCard movie={item} key={index} />;
                } else {
                    return '';
                }
                })}
            </ul>
        )}
        { moviesTotal < 100 && routes.pathname === '/movies' && (
            <button  className='movie-list__button movie-list__hover' onClick={addCards}>Ещё
            </button>
        )}
            
        </section>
    );
}