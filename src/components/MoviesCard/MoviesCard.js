import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router';
import {saveFilm, deleteFilm} from '../../utils/MainApi';
import './MoviesCard.css';

export default function MoviesCard ({ movieData, favoriteList}) {

    const  routes  = useLocation()
    
    function isLike() {
        return favoriteList.some((item) => item.movieId === movieData.id);
    }


    const updateLocalLists = (savedMovie) => {
        
    }

    console.log(isLike())
    

// Функция добавления фильма в избранные
function handleSaveFilm() {
    saveFilm(movieData)
        .then((saveMovieInfo) => {
            let favoriteMoviesList = JSON.parse(localStorage.getItem('likeMoviesList'))
            favoriteMoviesList = favoriteMoviesList.concat(saveMovieInfo) 
            localStorage.setItem('likeMoviesList', JSON.stringify(favoriteMoviesList))
        })
        .catch((err) => {
            console.log(`Внимание! ${err}`);
        })
}

// Функция удаления из избранного
function handleDeleteFilm () {
    const id = movieData.movieId || movieData.id;
    const movieId =
    movieData._id || favoriteList.find((item) => item.movieId === movieData.id)._id;
    console.log(id)
    console.log(movieId)
    deleteFilm (movieId)
    .then((deleteMovieInfo) => {
        let favoriteMoviesList = JSON.parse(localStorage.getItem('likeMoviesList'))
        const index = favoriteMoviesList.findIndex(item => item.movieId === deleteMovieInfo.movieId)
        favoriteMoviesList.splice(index, 1) 
        localStorage.setItem('likeMoviesList', JSON.stringify(favoriteMoviesList))
        })

        .catch((err) => {
            console.log(`Внимание! ${err}`);
        })
        .finally(() => {
    });
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

    //console.log(JSON.parse(localStorage.getItem('likeMoviesList')))

    return (
        <li className='movie'>
            <div className='movie__container'>
            { 
                routes.pathname === '/saved-movies' ? (
                    <button 
                    className='movie__button movie__button-save' 
                    onClick={handleDeleteFilm}
                    aria-label='удаление фильма'
                    ></button>
                ) :
                (
                    <button
                    onClick={isLike() ?  handleDeleteFilm : handleSaveFilm} 
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