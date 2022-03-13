import React, { useState } from 'react'
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm ({ handleSubmitSearchForm, handleCheckboxChange }) {

    //Стейт состояния тумблера
    const [isCheckboxOn, setIsCheckboxOn] = useState(false)

    //Стейт запроса
    const [query, setQuery] = useState('')

    const [inputIsEmpty, setInputIsEmpty] = useState(false)

    function listenCheckbox() {
        handleCheckboxChange(!isCheckboxOn)
        setIsCheckboxOn(!isCheckboxOn)
    }

    function handleInput(evt) {
        setQuery(evt.target.value)
        setInputIsEmpty(false)
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        !query
            ?
            setInputIsEmpty(true)
            :
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
                {
                    inputIsEmpty &&
                    <span className='search__input-error'>Нужно ввести данные</span>
                }    
                <FilterCheckbox
                    listenCheckbox={listenCheckbox}
                />
                
            </div>
            <div className='search__line'></div>
        </section>
    )
}