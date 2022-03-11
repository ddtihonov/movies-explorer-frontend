import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/MainApi';
import api from '../../utils/MoviesApi';
import PageNotFound from '../PageNotFound/PageNotFound';
import { CurrentUser } from '../../context/CurrentUserContext';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import successfully from '../../images/successfully.svg'
import unsuccessfully from '../../images/unsuccessfully.svg'
import Preloader from '../Preloader/Preolader';

export default function App() {

    const navigate = useNavigate();
    const {routes}  = useLocation();

    // Стейт актуального пользователя
    const [currentUser, setCurrentUser] = useState();

    // Стейт  авторизации
    const [loggedIn, setLoggedIn] = useState(false);

   // Стейт карточек из BeatFilm
    const [moviesList, setMoviesList] = useState([]);

    // Стейт карточек из Preloader
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
    const [messageErr, setMessageErr] = useState('')
    const [err, setErr] = useState('')


 // Эффект запроса карточек от BeatFilms
    useEffect(() => {
        api.getInitialCards()
            .then((cardsInfo) => {
                setMoviesList(cardsInfo);
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
    }, []);

    // Эффект проверки авторизации на сайте
    useEffect(() => {
        if (localStorage.isAuth) {
            setIsSubmitting(true)
                auth.getUserInfo()
                .then((userInfo) => {
                    setCurrentUser(userInfo) 
                    localStorage.setItem('currentUser', JSON.stringify(userInfo))  
                    setLoggedIn(true);
                })
                .catch((err) => {
                    setErr(err);
                    navigate('/');
                })
                .finally(() => setIsSubmitting(false))
        }
}, []);

    
    // регистрация
    function handleRegister({ name, email, password }) {
        setIsSubmitting(true)
        auth.register({ name, password, email })
            .then((userData) => {
                console.log(userData)
                setInfoTooltipOpen(true)
                setTimeout(() => {
                    handleAuthorize({ email, password })
                    setInfoTooltipOpen(false)
                },
                    2000)
    })
            .catch((err) => setErr(err))
            .finally(() => setIsSubmitting(false))
    }

    // авторизация
    function handleAuthorize({ email, password }) {
        setIsSubmitting(true)
        auth.authorize({ email, password })
            .then((userData) => {
                localStorage.setItem('isAuth', true)
                setCurrentUser(userData)
                localStorage.setItem('currentUser', JSON.stringify(userData))
                setLoggedIn(true);
                navigate('/movies');
            })
            
            .catch((err) => setErr(err))
            .finally(() => setIsSubmitting(false))
    }


    // выйти из аккаунта
    function handleLogout () {
        auth.deleteAuth()
            .then(() => {
            setCurrentUser()
            setLoggedIn(false);
            navigate('/')
            localStorage.clear()
            sessionStorage.clear()
            })
            .catch((err) => setErr(err))
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
                    moviesList={moviesList}
                    Preloader={Preloader}

                />
            </ProtectedRoute>    
            }
        />
        <Route exact path='/saved-movies'  element={
            <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                    loggedIn={loggedIn}
                    moviesList={moviesList}
                    Preloader={Preloader}
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
    {isSubmitting && <Preloader />}
</>
</CurrentUser.Provider>
);
}