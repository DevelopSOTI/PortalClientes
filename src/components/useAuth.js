import { useState } from 'react';
import axios from 'axios';
import config from '../config';

const useAuth = () => {
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await axios.get(`${config.apiUrl}/user/login`, {
                params: { username, password }
            });
            if (response.data.status === 'success') {
                setSuccess(true);
                setMessage(response.data.message);
                setUser(response.data.user); // Set the user data
            } else {
                setSuccess(false);
                setMessage(response.data.message);
            }
        } catch (error) {
            setSuccess(false);
            if (error.response) {
                setMessage(`Error: ${error.response.data.message}`);
            } else if (error.request) {
                setMessage('Error: No response from server.');
            } else {
                setMessage('Error: Request setup error.');
            }
        }
    };

    return { login, message, success, user };
};

export default useAuth;
