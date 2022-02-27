import React, { useState } from 'react';
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

export default function App() {

    const navigate = useNavigate();

    //стейт логина
    const [loggedIn, setLoggedIn] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);

    // регистрация
    function handleRegister({ name, password, email, }) {
        auth.register({ name, password, email,})
            .then(() => {
                setSuccessRegister(true);
                navigate('/signin');
    })
            .catch((err) => {
                setSuccessRegister(false);       
                console.log(`Внимание! ${err}`);
        });
}

    function handleAuthorize() {
        setLoggedIn(true);
        navigate('/movies');
    }

    function handleLogout() {
        setLoggedIn(false);
    }

return (
<>
    <Routes>
        <Route exact path='/'  element={
            <Main/>
        } />       
        <Route exact path='/signup' element={
            <Register
                onRegister={handleRegister}
                successRegister={successRegister}
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
</>
);
}