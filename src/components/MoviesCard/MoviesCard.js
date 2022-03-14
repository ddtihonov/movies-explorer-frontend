import React, {useState,  useContext} from 'react'
import { useLocation } from 'react-router';
import auth from '../../utils/MainApi';
import { CurrentUser } from '../../context/CurrentUserContext';
import './MoviesCard.css';

export default function MoviesCard ({ movieData }) {

    const  routes  = useLocation()
    const currentUser = useContext(CurrentUser)

    //Стейт лайка карточки
    const [isSavedMovie, setIsSavedMovie] = useState(movieData);
    
    const [saved, setSaved] = useState(movieData.owner === currentUser._id)

    console.log(saved)

    const updateLocalLists = (movieInfo) => {
        // /movies
        const baseMoviesList = JSON.parse(sessionStorage.getItem('baseMoviesList'))
        const movieIndex = baseMoviesList.findIndex(existedMovie => existedMovie.id === movieInfo.id)

        baseMoviesList.splice(movieIndex, 1, movieInfo)
        sessionStorage.setItem('baseMoviesList', JSON.stringify(baseMoviesList))
    
        let listOfFound = JSON.parse(localStorage.getItem('listOfFound'))
        const movIndex = listOfFound.findIndex(existedMovie => existedMovie.id === movieInfo.id)
        listOfFound.splice(movIndex, 1, movieInfo)
        localStorage.setItem('listOfFound', JSON.stringify(listOfFound))
    
        // /saved-movies 
        let myFavoriteMoviesList = JSON.parse(localStorage.getItem('myFavoriteMoviesList'))
        
        if (movieInfo.owner === currentUser._id) {
            myFavoriteMoviesList = myFavoriteMoviesList.concat(movieInfo)
            localStorage.setItem('listLikeFound', JSON.stringify(myFavoriteMoviesList))
        } else {
            const index = myFavoriteMoviesList.findIndex(existedMovie => existedMovie.id === movieInfo.id)
            myFavoriteMoviesList.splice(index, 1) 
            localStorage.setItem('listLikeFound', JSON.stringify(myFavoriteMoviesList))
        }
    }

// Функция добавления фильма в избранные
function handleSaveFilm() {
    auth.saveFilm(isSavedMovie)
        .then((movieInfo) => {
            setSaved(true)
            setIsSavedMovie(movieInfo)
            updateLocalLists(movieInfo)
        })
        .catch((err) => {
            console.log(`Внимание! ${err}`);
        })
}

function handleDeleteFilm () {
    auth.deleteFilm (isSavedMovie)
    .then((movieInfo) => {
        sessionStorage.setItem('likeMoviesList', JSON.stringify(movieInfo))
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

    return (
        <li className='movie'>
            <div className='movie__container'>
                { 
                    routes.pathname === '/saved-movies' ? (
                        <button type='submit' 
                        className='movie__button movie__button-save' 
                        onClick={handleDeleteFilm}
                        aria-label='удаление фильма'
                        ></button>
                    ) :
                    saved ?
                    (<button type='submit' 
                        onClick={handleDeleteFilm} 
                        className='movie__button movie__button-like'
                        aria-label='удаление фильма'
                        ></button>
                    ) : 
                    (
                        <button type='submit' 
                        onClick={handleSaveFilm} 
                        className='movie__button movie__button-norm'
                        aria-label='добавление фильма'
                        >Сохранить</button> 
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