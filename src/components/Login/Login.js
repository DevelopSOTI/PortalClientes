import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import AlertMessage from './AlertMessage';
import useAuth from '../useAuth';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login: contextLogin } = useContext(AuthContext);
  const { login, message, success, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (success && user) {
      contextLogin(user);
      navigate('/dashboard');
    }
  }, [success, user, contextLogin, navigate]);

  const handleLogin = async (username, password) => {
    await login(username, password);
  };

  return (
    <div className="login-container">
      <LoginForm onLogin={handleLogin} />
      {message && <AlertMessage message={message} success={success} />}
    </div>
  );
};

export default Login;
