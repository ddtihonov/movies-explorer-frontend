import React, { useState,  useEffect  } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';


export default function App() {


return (
<div className="page">
    <Header 
    />
    <Main/>
    <Routes>        
    </Routes>  
</div>
);
}