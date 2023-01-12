import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import SaucePage from "../../pages/SaucePage";
import AddSauce from "../../pages/AddSauce";
import ErrorAuth from "../../pages/ErrorAuth";

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
                <Route path="/sauces/:id" element={<SaucePage />} />
                {isLoggedIn && <Route path="/addSauce" element={<AddSauce />} />}
                {!isLoggedIn && <Route path="/addSauce" element={<ErrorAuth />} />}
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default IndexRoutes;