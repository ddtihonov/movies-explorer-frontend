import React from 'react'
import { useLocation } from 'react-router';
import {deleteFilm} from '../../utils/MainApi';
import './MoviesCard.css';

export default function MoviesCard ({ movieData, favoriteList, handleSaveFilm, handleDeleteFilm}) {

    const  routes  = useLocation()
    
    function isLike() {
        return favoriteList.some((item) => item.movieId === movieData.id);
    }

function onSaveFilm () {
    handleSaveFilm(movieData)
};

function onDeleteFilm () {
    handleDeleteFilm(movieData)
};


    const url =
    movieData.image.url === undefined
        ? movieData.image
        : `https://api.nomoreparties.co${movieData.image.url}`;

    const trailer =
    movieData.trailer === undefined ? movieData.trailerLink : movieData.trailer;

    function calculateTime () {
        return `${Math.floor(movieData.duration / 60)}ч ${movieData.duration % 60}м`;
    };

    return (
        <li className='movie'>
            <div className='movie__container'>
            { 
                routes.pathname === '/saved-movies' ? (
                    <button 
                    className='movie__button movie__button-save' 
                    onClick={onDeleteFilm}
                    aria-label='удаление фильма'
                    ></button>
                ) :
                (
                    <button
                    onClick={isLike() ?  onDeleteFilm : onSaveFilm} 
                    className={`movie__button movie__button-norm ${
                        isLike() && `movie__button movie__button-like`}`}
                    aria-label='добавление фильма'
                    >{isLike() ? '' : 'Сохранить' }</button> 
                )
            }
                <a className='movie__link' href={trailer} target="_blank" rel="noreferrer">
                <img
                    src={url}
                alt={movieData.nameRU}
                className='movie__image'
                />
                </a>
            </div>
            <div className='movie__box'>
                <h2 className='movie__title'>{movieData.nameRU}</h2>
                <p className='movie__text'>{calculateTime()}</p>
            </div>
        </li>
    )
}