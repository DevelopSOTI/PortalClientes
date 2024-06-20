import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const authStatus = sessionStorage.getItem('isAuthenticated');
        const userData = sessionStorage.getItem('user');
        setIsAuthenticated(authStatus === 'true');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const login = (user) => {
        setIsAuthenticated(true);
        setUser(user);
        sessionStorage.setItem('isAuthenticated', 'true');
        sessionStorage.setItem('user', JSON.stringify(user));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('user');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
