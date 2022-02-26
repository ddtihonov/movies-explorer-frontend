import React from 'react'
import './AboutProject.css'

export default function  AboutProject () {
    return (
        <section className='project' id='about-project'>
            <div className='project__container'>
                <h2 className='project__title'>О проекте</h2>
                <div className='project__line'></div>
                <ul className='project__list'>
                    <li className='project__list-item'>
                        <h3 className='project__list-title'>
                            Дипломный проект включал 5 этапов
                        </h3>
                        <p className='project__list-text'>
                            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
                        </p>
                    </li>
                    <li className='project__list-item'>
                        <h3 className='project__list-title'>
                            На выполнение диплома ушло 5 недель
                        </h3>
                        <p className='project__list-text'>
                            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
                        </p>
                    </li>
                </ul>
                <ul className='project__roster'>
                    <li className='project__roster-item_color'>
                        <div className='project__roster-cell project__roster-cell_color'>1 неделя</div>
                        <p className='project__roster-text'>Back-end</p>
                    </li>
                    <li className='project__roster-item'>
                        <div className='project__roster-cell'>4 недели</div>
                        <p className='project__roster-text'>Front-end</p>
                    </li>
                </ul>
            </div>
        </section>
    )
}