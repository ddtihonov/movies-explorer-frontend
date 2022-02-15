import React, { useState,  useEffect  } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Main from '../Main/Main';
import Register from '../Register/Register';
import Login from '../Login/Login';


export default function App() {


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
            />
            } />         
    </Routes>  
</>
);
}