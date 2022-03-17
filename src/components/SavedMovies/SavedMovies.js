import React, { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm';

import './SavedMovies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function SavedMovies({favoriteList}) {

const [favoriteMoviesList, setFavoriteMoviesList] = useState([])
const [checkboxActive, setCheckboxActive] = useState(false)
const [favoriteListForRender, setFavoriteListForRender] = useState([])
const [shortFavoriteListForRender, setShortFavoriteListForRender] = useState([])
const [queryString, setQueryString] = useState('')
const [message, setMessage] = useState('')


useEffect(() => {
    localStorage.favoriteMoviesList && setFavoriteMoviesList(JSON.parse(localStorage.getItem('likeMoviesList')))
}, [checkboxActive])


// Эффект обработки запроса от формы поиска
useEffect(() => {
    if (queryString) {
        const newList = JSON.parse(localStorage.getItem('likeMoviesList')).filter((movie) =>
            movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            if (newList.length) {
                setFavoriteListForRender(newList)
                localStorage.setItem('likeMoviesList', JSON.stringify(newList))
            } else {
                setMessage('Ничего не найдено')
                setFavoriteListForRender([])
            } 
        } else {
            const  newList = JSON.parse(localStorage.getItem('likeMoviesList'))
            if (newList.length) {
                setFavoriteListForRender(newList)
                localStorage.setItem('likeMoviesList', JSON.stringify(newList))
            } else {
                setMessage('Ничего не найдено')
                setFavoriteListForRender([])
            } 
        }
    }, [queryString, checkboxActive])

// Эффект обработки чекбокса
useEffect(() => {
    if (checkboxActive && favoriteListForRender.length) {
        const newShortList = favoriteListForRender.filter(movie => movie.duration <= 40)
        newShortList.length ?
        setShortFavoriteListForRender(newShortList) : setMessage('Ничего не найдено') && setFavoriteListForRender([])
    } else {
        setShortFavoriteListForRender([])
    }
}, [checkboxActive, favoriteListForRender])

function handleCheckboxChange (isCheckboxOn) {
    setMessage('')
    setCheckboxActive(isCheckboxOn)
}

const handleSubmitSearchForm = (query) => {
    setMessage('')
    setQueryString(query)
}

    return (
        <section className='saved-movies'>
            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
            />
            <MoviesCardList
                favoriteMoviesList={
                    checkboxActive ?
                        shortFavoriteListForRender
                        :
                        favoriteListForRender
                }
                message={message}
                favoriteList={favoriteList}
            />
        </section>
    );
    }