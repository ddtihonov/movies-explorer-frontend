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
    const routes  = useLocation();

    // Стейт актуального пользователя
    const [currentUser, setCurrentUser] = useState();

    // Стейт  авторизации
    const [loggedIn, setLoggedIn] = useState(false);

    // Стейт  Preloader
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const [infoTooltipOpen, setInfoTooltipOpen] = useState(false)
    const [messageErr, setMessageErr] = useState('')
    const [err, setErr] = useState('')

// Эффект проверки авторизации на сайте
useEffect(() => {
    setIsSubmitting(true)
    if (localStorage.isAuth) {
        setLoggedIn(true);    
        auth.getUserInfo()
            .then((userInfo) => {
                setLoggedIn(true);  
                setCurrentUser(userInfo);
                localStorage.setItem('currentUser', JSON.stringify(userInfo)) 
                navigate(routes.pathname);
                })
                .catch((err) => {
                    navigate('/signin');
                    console.log(`Внимание! ${err}`);
                })
                .finally(() => setIsSubmitting(false))
            }
}, []);

 // Эффект запроса карточек
    useEffect(() => {
        setIsSubmitting(true)
        api.getInitialCards()
            .then((cardsInfo) => {
                sessionStorage.setItem('baseMoviesList', JSON.stringify(cardsInfo))
            })
            .catch((err) => setErr(err))
            .finally(() => setIsSubmitting(false))

        auth.getMyMovies()
            .then((cardsInfo) => {
                console.log(cardsInfo)
                sessionStorage.setItem('likeMoviesList', JSON.stringify(cardsInfo))
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            })
            .finally(() => setIsSubmitting(false))
    }, []);

    
    // регистрация
    function handleRegister({ name, email, password }) {
        setIsSubmitting(true)
        auth.register({ name, password, email })
            .then((userData) => {
                if (userData) {
                    setInfoTooltipOpen(true)

                    setTimeout(() => {
                        navigate('/signin');
                        setInfoTooltipOpen(false)
                },
                    1000)

                }
    })
            .catch((err) => setErr(err))
            .finally(() => setIsSubmitting(false))
    }

    // авторизация
    function handleAuthorize({ email, password }) {
        setIsSubmitting(true)
        auth.authorize({ email, password })
            .then((userInfo) => {
                localStorage.setItem('isAuth', true)
                setCurrentUser(userInfo)
                localStorage.setItem('currentUser', JSON.stringify(userInfo))
                setLoggedIn(true);
                navigate('/movies');
            })
            
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            }) 
            .finally(() => setIsSubmitting(false))
    }

    // обновить данные пользователя
function chargingDataUser  ({ email, name })  {
    setIsSubmitting(true)
    auth.setUserInfo({ email, name })
        .then((userInfo) => {
            setInfoTooltipOpen(true)
            setCurrentUser(userInfo)
            localStorage.setItem('currentUser', JSON.stringify(userInfo))

            setTimeout(() => {
                setInfoTooltipOpen(false)
            },
            1000)
        })
        .catch((err) => setErr(err))
        .finally(() => setIsSubmitting(false))
}

    // выйти из аккаунта
function handleLogout () {
    auth.deleteAuth()
        .then(() => {
            setCurrentUser([])
            setLoggedIn(false);
            navigate('/')
            localStorage.clear()
            })
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            });
}

    const closePopup = () => {
        setInfoTooltipOpen(false)
        setMessageErr('')
    }


 // обработка ошибок запросов
    useEffect(() => {
                if (err) {
            setMessageErr(`Что то пошло не так ${err}!`)
            setInfoTooltipOpen(true)
        }
    }, [err])


return (
<CurrentUser.Provider value={currentUser}>    
    <Routes>
        <Route  path='/'  element={
            <Main/>
        } />       
        <Route  exact path='/signup' element={
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
        <Route  
        path='/movies'  
        element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Movies
                    loggedIn={loggedIn}
                />
            </ProtectedRoute>    
            }
        />
        <Route 
        path='/saved-movies'  
        element={
            <ProtectedRoute loggedIn={loggedIn}>
                <SavedMovies
                    loggedIn={loggedIn}
                />
            </ProtectedRoute>    
            }
        />
        <Route  
        path='/profile'  
        element={
            <ProtectedRoute loggedIn={loggedIn}>
                <Profile
                    loggedIn={loggedIn}
                    handleLogout={handleLogout}
                    chargingDataUser={chargingDataUser} 
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
</CurrentUser.Provider>
);
}