import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import {
    register, 
    authorize, 
    deleteAuth, 
    getUserInfo, 
    setUserInfo, 
    getMyMovies} from '../../utils/MainApi';
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

    const isFooter =
    routes.pathname !== '/profile' && 
    routes.pathname !== '/signin' && 
    routes.pathname !== '/signup';

    const isHeader =
    routes.pathname === '/movies' ||
    routes.pathname === '/' ||
    routes.pathname === '/saved-movies' ||
    routes.pathname === '/profile';

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
    const token = localStorage.getItem('token');
    if (token) {
        setLoggedIn(true);
        getUserInfo()
            .then((userInfo) => {
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
}, [localStorage]);

 // Эффект запроса карточек
    useEffect(() => {
        setIsSubmitting(true)
        api.getInitialCards()
            .then((cardsInfo) => {
                sessionStorage.setItem('baseMoviesList', JSON.stringify(cardsInfo))
            })
            .catch((err) => setErr(err))
            .finally(() => setIsSubmitting(false))

        getMyMovies()
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
        register({ name, password, email })
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
        authorize({ email, password })
            .then((userInfo) => {
                localStorage.setItem('token', userInfo.token)
                setCurrentUser(userInfo)
                localStorage.setItem('currentUser', JSON.stringify(userInfo))
                setLoggedIn(true);
                setDataUser();
                navigate('/movies');
            })
            
            .catch((err) => {
                console.log(`Внимание! ${err}`);
            }) 
            .finally(() => setIsSubmitting(false))
    }

    function setDataUser () {
        getUserInfo()
            .then((userInfo) => {
                setCurrentUser(userInfo);
                        })
                .catch((err) => {
                    console.log(`Внимание! ${err}`);
                })
    }

    // обновить данные пользователя
function chargingDataUser  ({ email, name })  {
    setIsSubmitting(true)
    setUserInfo({ email, name })
        .then((userInfo) => {
            localStorage.setItem('isAuth', true)
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
    deleteAuth()
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
    <div className="page">
        {isHeader && <Header  loggedIn={loggedIn} />}
        {isSubmitting ? 
        (<Preloader /> ) : 
        (<Routes>
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
        )}   
        { infoTooltipOpen &&
            <InfoTooltip
                closePopup={ closePopup }
                icon={ messageErr ? unsuccessfully : successfully }
                notification={ messageErr ? messageErr : 'Запрос выполнен успешно!' }
            />
            }
        {isFooter && <Footer />}    
    </div>
</CurrentUser.Provider>
);
}