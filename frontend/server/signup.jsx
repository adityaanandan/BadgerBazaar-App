import React from 'react'
import { useNavigate } from 'react-router-dom'; // Import the hook

const signup = async (username, password) => {
    const navigate = useNavigate();
    try {
        const response = await axios.post('http://your-api-url.com/login', {
            username: username,  // Key for username
            password: password   // Key for password
        });

        // Assuming the response contains the token and user data
        const { token, user } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;
        navigate('/')

        

        console.log('Logged in successfully!');
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export default signup