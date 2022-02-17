import React from 'react'
import { Link} from 'react-router-dom'
import './PageNotFound.css'

export default function PageNotFound () {

    const handleClick = (evt) => {
        evt.preventDefault()
    }

    return (
        <div className='not-found__container'>
            <h3 className='not-found__404'>404</h3>
            <p className='not-found__message'>Страница не найдена</p>
            <Link className='not-found__return' to='' onClick={handleClick}>Назад</Link>
        </div>
    )
}