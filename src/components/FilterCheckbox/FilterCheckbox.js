import React from "react";
import './FilterCheckbox.css';

export default function FilterCheckbox () {

    function handleFilterShortMovies() {
        console.log('Привет медвед')
    }

    return (
        <div className="checkbox">
            <input
                className="checkbox__input"
                id="chec"
                type="checkbox"
                onClick={handleFilterShortMovies}
            />
            <label className="checkbox__label" htmlFor="chec">
            Короткометражки
            </label>
        </div>
    )

}