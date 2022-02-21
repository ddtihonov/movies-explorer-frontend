import React, {useState} from 'react'
import { useLocation } from 'react-router';
import './MoviesCard.css'

export default function MoviesCard ({movie}) {

    const [isSavedMovie, setIsSavedMovie] = useState(false);
    const { routes } = useLocation()
    console.log(movie)

    function calculateTime () {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    return (
        <li className='movie'>
            <img
                src={`https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
            alt={movie.nameRU}
            className='movie__image'
            />
            <div className='movie__box'>
                <h2 className='movie__title'>{movie.nameRU}</h2>
                <p className='movie__text'>{calculateTime()}</p>
            </div>
        </li>
    )
}