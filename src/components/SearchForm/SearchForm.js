import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm ({ handleSubmitSearchForm, handleCheckboxChange}) {

    const queryData = localStorage.getItem('query')
    const routes  = useLocation()

    //Стейт состояния тумблера
    const [isCheckboxOn, setIsCheckboxOn] = useState(false)

    //Стейт запроса
    const [query, setQuery] = useState(queryData && routes.pathname === '/movies' ? queryData : '')

    const checkBoxPosition = JSON.parse(localStorage.getItem('checkBoxStatus'));

    console.log(checkBoxPosition)

    function listenCheckbox() {
        if (routes.pathname === '/movies' && isCheckboxOn === false) {
            localStorage.setItem('checkBoxStatus', true);
            setIsCheckboxOn(true);
            handleCheckboxChange(true)
        } else if (routes.pathname === '/movies' && isCheckboxOn === true) {
            localStorage.setItem('checkBoxStatus', false);
            setIsCheckboxOn(false);
            handleCheckboxChange(false)
        } else if (routes.pathname === '/saved-movies' && isCheckboxOn === false) {
            setIsCheckboxOn(true);
            handleCheckboxChange(true)
        } else if (routes.pathname === '/saved-movies' && isCheckboxOn === true ) {
            setIsCheckboxOn(false);
            handleCheckboxChange(false)
        }
}

useEffect(() => {
    routes.pathname === '/movies' &&
        handleCheckboxChange(checkBoxPosition);
         // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


    function handleInput(evt) {
        setQuery(evt.target.value)
        if (routes.pathname === '/movies') {
            localStorage.setItem('query', evt.target.value);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
            handleSubmitSearchForm(query)
    }
    
    return (
        <section className='search'>
            <div className='search__container'>
                <form className='search__form' onSubmit={handleSubmit} name='search-form'>
                    <div className='search__box'>
                        <input
                            className='search__input'
                            type='text'
                            placeholder='Фильм'
                            name='name'
                            minLength='1'
                            maxLength='50'
                            onChange={handleInput}
                            value={query}
                        />
                    <button className='search__button search__button' type='submit'>Найти</button>    
                    </div>
                    </form>  
                <FilterCheckbox
                    listenCheckbox={listenCheckbox}
                    checkBoxPosition={
                        routes.pathname === '/movies' ?
                        checkBoxPosition :
                        isCheckboxOn }
                />
                
            </div>
            <div className='search__line'></div>
        </section>
    )
}