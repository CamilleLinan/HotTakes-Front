import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Home from "../../pages/Home";
import Login from "../../pages/Login";


// Routes de l'application
const IndexRoutes = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />}/>
                {!isLoggedIn && <Route path="/" element={<Home />} />}
                {!isLoggedIn && <Route path="*" element={<Home />} />}
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRoutes;