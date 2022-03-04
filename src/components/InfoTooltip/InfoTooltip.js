import React from 'react';
import './InfoTooltip.css'

export default function InfoTooltip ({ closePopup, icon, notification }) {

    return (
        <div className= 'popup'   onClick={closePopup}>
            <div className="popup__container">
                <button className="popup__close-icon link-aim" type="button" aria-label="закрыть" onClick={closePopup}></button>
                <div className="popup__box">
                    <img
                        src={icon}
                        alt={notification}
                        className="popup__icon"
                    />
                    <p className="popup__text">{notification}</p>
                </div>
            </div> 
        </div>
    )
}