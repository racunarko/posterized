// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register.jsx';
import Login from './components/login.jsx';
import HomePage from './HomePage.jsx';
import Cookies from 'js-cookie';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        fetch('http://localhost:8080/logout', {
            method: 'POST',
            credentials: 'include', 
        })
            .then(response => {
                if (response.ok) {
                    localStorage.removeItem('username');
                    Cookies.remove('user');
                    setIsLoggedIn(false);
                }
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
                />
                {!isLoggedIn && <Route path="/register" element={<Register />} />}
                {!isLoggedIn && <Route path="/login" element={<Login onLogin={handleLogin} />} />}
            </Routes>
        </Router>
    );
};

export default App;
