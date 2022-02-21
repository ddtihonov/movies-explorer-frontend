import React,{ useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preolader'
import api from '../../utils/MoviesApi'

export default function MoviesCardList () {

    const { routes } = useLocation()
    const [moviesList, setMoviesList] = useState([]);
    const [moviesTotal, setMoviesTotal] = useState(12);

    useEffect(() => {
        if (moviesList.length === 0) {    
        api.getInitialCards()
            .then((cardsInfo) => {
                setMoviesList(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
        }
    }, []);

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
            <button  className='movie-list__button' onClick={() => setMoviesTotal(moviesTotal + 3)}>Ещё
            </button>
        </section>
    );
}