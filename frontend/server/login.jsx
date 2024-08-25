import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import the hook

const login = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8000/user/login', {
            username: username,  // Key for username
            password: password   // Key for password
        });

        // Assuming the response contains the token and user data
        const { token, user } = response.data;

        // Store the token and user data in localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = `Token ${localStorage.getItem('authToken')}`;
        

        return { success: true };
    } catch (error) {
        if (error.response && error.response.status === 400) {
            return { success: false, message: 'Invalid username or password.' };
        } else {
            return { success: false, message: 'An unexpected error occurred. Please try again.' };
        }
    }
};

export default login;