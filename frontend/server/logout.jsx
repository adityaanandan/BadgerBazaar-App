const logout = async () => {
    try {
        await api.post('/logout');

        // Remove the token from localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');

        console.log('Logged out successfully!');
    } catch (error) {
        console.error('Logout failed:', error);
    }
};

export default logout;