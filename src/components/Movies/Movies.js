import React, { useState, useEffect } from 'react'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';

import './Movies.css'
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ loggedIn, Preloader }) {

    const [checkboxActive, setCheckboxActive] = useState(false)
    const [listForRender, setListForRender] = useState([])
    const [shortListForRender, setShortListForRender] = useState([])
    const [queryString, setQueryString] = useState('')
    const [message, setMessage] = useState('')
    let newList = JSON.parse(sessionStorage.getItem('baseMoviesList'))

    // Эффект обработки чекбокса
    useEffect(() => {
        if (checkboxActive && listForRender.length) {
            const newShortList = listForRender.filter(movie => movie.duration <= 40)
            newShortList.length ?
                setShortListForRender(newShortList) : setMessage('Ничего не найдено')
        } else {
            setShortListForRender([])
        }
    }, [checkboxActive, listForRender])


// Эффект обработки запроса от формы поиска
    useEffect(() => {
    if (queryString) {
        newList = JSON.parse(sessionStorage.getItem('baseMoviesList')).filter((movie) =>
            movie.nameRU.toLowerCase().indexOf(queryString.toLowerCase()) > -1)
            
        if (newList.length) {
            setListForRender(newList)
            localStorage.setItem('listOfFound', JSON.stringify(newList))
        } else {
            setMessage('Ничего не найдено')
        }
    }
}, [queryString, checkboxActive])


    function handleCheckboxChange (isCheckboxOn) {
        setMessage('')
        setCheckboxActive(isCheckboxOn)
    }

    const handleSubmitSearchForm = (query) => {
        setMessage('')
        setQueryString(query)
    }

console.log(queryString)

    // при возврате - для отрисовки прошлого поиска
    useEffect(() => {
        localStorage.listOfFound && setListForRender(JSON.parse(localStorage.getItem('listOfFound')))
    }, [checkboxActive])
    
    return (
        <section className='movies'>
            <Header
                loggedIn={loggedIn}
            />
            <SearchForm
                handleSubmitSearchForm={handleSubmitSearchForm}
                handleCheckboxChange={handleCheckboxChange}
            />
            <MoviesCardList
                moviesList={
                    shortListForRender.length ?
                        shortListForRender
                        :
                        listForRender
                }
                message={message}
                Preloader={Preloader}
            />
            <Footer/>
        </section>
    );
    }