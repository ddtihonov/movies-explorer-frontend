import React from "react";
import './FilterCheckbox.css';

export default function FilterCheckbox ({listenCheckbox}) {

    return (
        <div className="checkbox">
            <input
                className="checkbox__input"
                id="chec"
                type="checkbox"
                onChange={listenCheckbox}
            />
            <label className="checkbox__label" htmlFor="chec">
            Короткометражки
            </label>
        </div>
    )

}