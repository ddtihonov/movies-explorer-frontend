import React from 'react'
import { useRouteMatch } from 'react-router-dom';
import './MoviesCard.css'

export default function MoviesCard ({ isSaved, image }) {

    const isSavedMoviesRoute = useRouteMatch({ path: '/saved-movies', exact: false });

    
    return (
        <article className='movie'>
            
        </article>
    )
}