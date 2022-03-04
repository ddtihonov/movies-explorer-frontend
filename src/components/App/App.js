import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/MainApi';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUser } from '../../context/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import successfully from '../../images/successfully.svg'
import unsuccessfully from '../../images/unsuccessfully.svg'
import Preloader from '../Preloader/Preolader';

export default function App() {

    const navigate = useNavigate();

    //стейт контекста
    const [currentUser, setCurrentUser] = useState();

    //стейт логина
    const [loggedIn, setLoggedIn] = useState(false);

    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
    const [messageErr, setMessageErr] = useState('')
    const [err, setErr] = useState('')


    useEffect(() => {
        checkToken();
    }, [])

    // регистрация
    function handleRegister({ name, password, email }) {
        auth.register({ name, password, email })
            .then(() => {
                setInfoTooltipOpen(true)
                setTimeout(() => {
                    navigate('/signin');
                    setInfoTooltipOpen(false)
                },
                    2000)
    })
            .catch((err) => setErr(err))
    }

    // авторизация
    function handleAuthorize({ password, email }) {
        auth.authorize({ password, email })
            .then((data) => {
                setCurrentUser(data)
                localStorage.setItem('token', data.token);
                checkToken();
            })
            
            .catch((err) => setErr(err))
    }

    function checkToken() {
        const jwt = localStorage.getItem('token');
        if (jwt) {
            setLoggedIn(true);
            navigate('/movies')
        }
    }


    function handleLogout() {
        localStorage.removeItem('jwt');
        setLoggedIn(false);
        navigate('/')
    }

    const closePopup = () => {
        setInfoTooltipOpen(false)
        setMessageErr('')
    }

    useEffect(() => {
                if (err) {
            setMessageErr(`${err}`)
            setInfoTooltipOpen(true)
        }
    }, [err])


return (
<CurrentUser.Provider value={currentUser}>    
<>
    <Routes>
        <Route exact path='/'  element={
            <Main/>
        } />       
        <Route exact path='/signup' element={
            <Register
                onRegister={handleRegister}
                messageErr={messageErr}
            />
        } />
        <Route path='*' element={
            <PageNotFound />
        }/>
        <Route exact path='/signin' element={
            <Login
                onLogin={handleAuthorize}
                navigate={navigate}
                loggedIn={loggedIn}
                messageErr={messageErr}
            />
            } />
        <Route exact path='/movies'  element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                    loggedIn={loggedIn}
                />
            </ProtectedRoute>    
            }
        />
        <Route exact path='/saved-movies'  element={
            <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                    loggedIn={loggedIn}
                />
            </ProtectedRoute>    
            }
        />
        <Route exact path='/profile'  element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                    loggedIn={loggedIn}
                    handleLogout={handleLogout} 
                />
            </ProtectedRoute>      
            }
        />
    </Routes>
    { infoTooltipOpen &&
        <InfoTooltip
            closePopup={ closePopup }
            icon={ messageErr ? unsuccessfully : successfully }
            notification={ messageErr ? messageErr : 'Запрос выполнен успешно!' }
        />
        }  
</>
</CurrentUser.Provider>
);
}