import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import SaucePage from "../../pages/SaucePage";


// Routes de l'application
const IndexRoutes = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sauce/:id" element={<SaucePage />} />
                {!isLoggedIn && <Route path="/" element={<Home />} />}
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRoutes;