import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';


export default function App() {

    const navigate = useNavigate();

    // стейт маршрутов
    //const [currentRoute, setCurrentRoute] = useState('');    

    //стейт логина
    const [loggedIn, setLoggedIn] = useState(false);

    function handleAuthorize() {
        setLoggedIn(true);
        navigate('/movies');
    }

return (
<>
    <Routes>
        <Route exact path='/'  element={
            <Main/>
        } />       
        <Route exact path="/signup" element={
            <Register
            />
        } />
        <Route exact path="/signin" element={
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
    </Routes>  
</>
);
}