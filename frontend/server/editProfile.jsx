import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom'; // Import the hook

const editProfile = async ({newUsername, newBio, newImage, newEmail}) => {
    try {
        const requestBody = {
            ...(newUsername && { username: newUsername }),
            ...(newBio && { bio: newBio }),
            ...(newImage && { profile_img: newImage }),
            ...(newEmail && { email: newEmail })
        };

        const formData = new FormData();

        for (const [key, value] of Object.entries(requestBody)) {
            // If the value is a File object (for image upload), append it directly
            if (value instanceof File) {
                formData.append(key, value);
            } else {
                // For other fields, stringify if it's an object
                formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
            }
        }
        



        const response = await axios.post('http://localhost:8000/user/edit_profile', formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }

};

export default editProfile;