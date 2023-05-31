import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import PrivateRoutes from './utils/PrivateRoutes';
import PublicRoutes from './utils/PublicRoutes';
import { getToken, removeUserSession, setUserSession } from './utils/common';


import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            return;
        }

        axios.get(`http://localhost:3000/verifyToken?token=${token}`).then(response => {
        setUserSession(response.data.token, response.data.user);
        setAuthLoading(false);
        }).catch(error => {
        removeUserSession();
        setAuthLoading(false);
        });
    }, []);

    if (authLoading && getToken()) {
        return <div className="content">Checking Authentication...</div>
    }

    return (
        <BrowserRouter>
        <div className="bg-image">
        <Navbar />

        <div className="content">
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route index element={<Home />} />
                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<PrivateRoutes />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </div>

 
                <Footer />
                This is end of img
        </div>



            
    

    </BrowserRouter>
  );
}

export default App;
