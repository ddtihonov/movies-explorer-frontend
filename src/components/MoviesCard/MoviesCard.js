import React, {useState} from 'react'
import { useLocation } from 'react-router';
import './MoviesCard.css'

export default function MoviesCard ({movie, onCardLike, onCardDelete, favoriteMoviesList }) {

    const  routes  = useLocation()

    //Стейт лайка карточки
    const [isSavedMovie, setIsSavedMovie] = useState(false);

    function isFavorite() {
        //return favoriteMoviesList.some((item) => item.movieId === movie.id);
    }

    const url =
    movie.image.url === undefined
        ? movie.image
        : `https://api.nomoreparties.co${movie.image.url}`;

    const trailer =
        movie.trailer === undefined ? movie.trailerLink : movie.trailer;

    function calculateTime () {
        return `${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`;
    };

    function handleLikeClick() {
        onCardLike(movie);
    }

    function handleDeleteClick() {
        onCardDelete(movie);
    } 

    return (
        <li className='movie'>
            <div className='movie__container'>
                { routes.pathname === '/movies' ? (
                    <button type='submit' onClick={isFavorite() ? handleDeleteClick : handleLikeClick} 
                    className={`movie__button ${isFavorite() ? 'movie__button-like' : 'movie__button-norm'}`} 
                    >{`${isFavorite() ? '' : 'Сохранить'}`}</button>
                ) : (
                    <button type='submit' 
                    className='movie__button movie__button-save' 
                    onClick={handleDeleteClick}
                    ></button>
                )}
                <a className='movie__link' href={trailer} target="_blank" rel="noreferrer">
                <img
                    src={url}
                alt={movie.nameRU}
                className='movie__image'
                />
                </a>
            </div>
            <div className='movie__box'>
                <h2 className='movie__title'>{movie.nameRU}</h2>
                <p className='movie__text'>{calculateTime()}</p>
            </div>
        </li>
    )
}