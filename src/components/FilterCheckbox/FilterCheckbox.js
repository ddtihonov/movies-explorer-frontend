import React from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox ({listenCheckbox}) {

    function handleFilterShortMovies() {
        const element = document.querySelector('input[type=checkbox]');
        const isChecked = element.checked;
        listenCheckbox(isChecked);
    }

    return (
        <div className='checkbox'>
            <input
                className='checkbox__input'
                id='filter-checkbox'
                type='checkbox'
                onChange={handleFilterShortMovies}
            />
            <label className='checkbox__label' htmlFor='filter-checkbox'>
            Короткометражки
            </label>
        </div>
    )

}