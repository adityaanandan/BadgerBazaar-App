import React from 'react'
import axios from 'axios'

const signup = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/user/signup', {
            username: username,  // Key for username
            password: password   // Key for password
        });

        // Assuming the response contains the token and user data
        const { token, user } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage.getItem('authToken'))
        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;
        return { success: true };


        

    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, message: 'Invalid username or password.' };
        } else {
            return { success: false, message: 'An unexpected error occurred. Please try again.' };
        }
    }
}

export default signup