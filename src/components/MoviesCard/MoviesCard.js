import React, {useState} from 'react'
import { useLocation } from 'react-router';
import './MoviesCard.css'

export default function MoviesCard ({movie}) {

    const [isSavedMovie, setIsSavedMovie] = useState(false);
    const  routes  = useLocation()

    function calculateTime () {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    console.log(isSavedMovie)

    return (
        <li className='movie'>
            <div className='movie__container' onClick={() => setIsSavedMovie(isSavedMovie === false ? true : false)}>
                { routes.pathname === '/movies' ? (
                    <button
                    className={`${isSavedMovie ? 'movie__button-like' : 'movie__button-norm'}`} 
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