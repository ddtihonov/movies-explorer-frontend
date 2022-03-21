import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router';
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm ({ handleSubmitSearchForm, handleCheckboxChange }) {

    const queryData = localStorage.getItem('query')
    const routes  = useLocation()

    //Стейт состояния тумблера
    const [isCheckboxOn, setIsCheckboxOn] = useState(false)

    //Стейт запроса
    const [query, setQuery] = useState(queryData && routes.pathname === '/movies' ? queryData : '')

    function listenCheckbox() {
        handleCheckboxChange(!isCheckboxOn)
        setIsCheckboxOn(!isCheckboxOn)
    }

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
                />
                
            </div>
            <div className='search__line'></div>
        </section>
    )
}