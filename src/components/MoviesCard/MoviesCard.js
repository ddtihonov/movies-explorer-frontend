import React, {useState} from 'react'
import { useLocation } from 'react-router';
import './MoviesCard.css'
import auth from '../../utils/MainApi';

export default function MoviesCard ({movie}) {

    const [isSavedMovie, setIsSavedMovie] = useState(false);
    const [trailerVisible, setTrailerVisible] = useState(false)
    const  routes  = useLocation()

    function calculateTime () {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    return (
        <li className='movie'>
            <div className='movie__container'>
                { routes.pathname === '/movies' ? (
                    <button onClick={() => setIsSavedMovie(isSavedMovie === false ? true : false)} 
                    className={`movie__button ${isSavedMovie ? 'movie__button-like' : 'movie__button-norm'}`} 
                    type='button'>{`${isSavedMovie ? '' : 'Сохранить'}`}</button>
                ) : (
                    <button className='movie__button movie__button-save' type='button'></button>
                )}
                <img
                    src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                alt={movie.nameRU}
                className='movie__image'
                />
            </div>
            <div className='movie__box'>
                <h2 className='movie__title'>{movie.nameRU}</h2>
                <p className='movie__text'>{calculateTime()}</p>
            </div>
        </li>
    )
}