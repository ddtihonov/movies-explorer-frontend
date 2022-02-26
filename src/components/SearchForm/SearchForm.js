import React from 'react'
import './SearchForm.css'
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox'

export default function SearchForm () {

    function handleSubmit(evt) {
        evt.preventDefault();
        console.log('нечего искать')
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
                        />
                    <button className='search__button search__button' type='submit'>Найти</button>    
                    </div>

                </form>
                <FilterCheckbox/>
                
            </div>
            <div className='search__line'></div>
        </section>
    )
}