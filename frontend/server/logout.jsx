import axios from 'axios';

const logout = async () => {
    try {
        await axios.post('http://localhost:8000/user/logout',{
            headers: { 'Authorization': + `Token ${localStorage.getItem('authToken')}`}
        });

        // Remove the token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

    } catch (error) {
        if (error.response.status === 401) {
            localStorage.removeItem('authToken');
            navigate('/login');
        } 
        
        else if (localStorage.getItem('authToken') === null) {
            navigate('/login');
        }
        return Promise.reject(error);
    }
};

export default logout;