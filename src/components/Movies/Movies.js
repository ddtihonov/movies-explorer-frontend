import React, { useState, useEffect } from 'react'
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({favoriteList}) {

    const [checkboxActive, setCheckboxActive] = useState(false)
    const [listForRender, setListForRender] = useState([])
    const [shortListForRender, setShortListForRender] = useState([])
    const [queryString, setQueryString] = useState('')
    const [message, setMessage] = useState('')
    
    // при возврате - для отрисовки прошлого поиска
    useEffect(() => {
        localStorage.listOfFound && setListForRender(JSON.parse(localStorage.getItem('listOfFound')))
    }, [checkboxActive])
    
    // Эффект обработки запроса от формы поиска
    useEffect(() => {
        if (queryString) {
            const newList = JSON.parse(sessionStorage.getItem('baseMoviesList')).filter((movie) =>
                movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
                if (newList.length) {
                    setListForRender(newList)
                    localStorage.setItem('listOfFound', JSON.stringify(newList))
                } else {
                    setMessage('Ничего не найдено')
                    setListForRender([])
                } 
            } else {
                const  newList = JSON.parse(sessionStorage.getItem('baseMoviesList'))
                if (newList.length) {
                    setListForRender(newList)
                    localStorage.setItem('listOfFound', JSON.stringify(newList))
                } else {
                    setMessage('Ничего не найдено')
                    setListForRender([])
                } 
            }
        }, [queryString, checkboxActive])

    // Эффект обработки чекбокса
    useEffect(() => {
        if (checkboxActive) {
            const newShortList = listForRender.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortListForRender(newShortList) : setMessage('Ничего не найдено') && setListForRender([])
        } else {
            setShortListForRender([])
        }
    }, [checkboxActive, listForRender])


    function handleCheckboxChange (isCheckboxOn) {
        setMessage('')
        setCheckboxActive(isCheckboxOn)
    }

    const handleSubmitSearchForm = (query) => {
        setMessage('')
        setQueryString(query)
    }

    
    return (
        <section className='movies'>
            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
            />
            <MoviesCardList
                moviesList={
                    checkboxActive ?
                        shortListForRender
                        :
                        listForRender
                }
                message={message}
                favoriteList={favoriteList}
            />
        </section>
    );
    }