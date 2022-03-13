import React from 'react'
import { Link} from 'react-router-dom'
import { useNavigate } from "react-router";
import './PageNotFound.css'

export default function PageNotFound () {

    const navigate = useNavigate();
    
    const goBack = () => navigate(-1);

    return (
        <section className='not-found'>
            <div className='not-found__container'>
                <h3 className='not-found__title'>404</h3>
                <p className='not-found__text'>Страница не найдена</p>
                <Link className='not-found__link' to='' onClick={goBack}>Назад</Link>
            </div>
        </section>
        
    )
}