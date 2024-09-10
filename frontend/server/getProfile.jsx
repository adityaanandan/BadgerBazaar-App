import axios from 'axios';

const getProfile = async () => {
    try {
        const response = await axios.get('http://localhost:8000/user/get_profile',{
            headers: {
            Authorization: `Token ${localStorage.getItem('authToken')}`
            }
        });


        // Assuming the response contains the token and user data
        const body = response.data;

        const userData = {username: body.username, email: body.email, bio:body.bio, image: body.profile_img}
        return userData; 

        

    } catch (error) {
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }
};

export default getProfile;