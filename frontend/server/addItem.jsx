import axios from 'axios';
import { Form, useNavigate } from 'react-router-dom'; // Import the hook

const addItem = async ({name, description, item_img, date, category, price}) => {
    try {
        const requestBody = {name: name, description: description, item_img: item_img, date: date.toISOString(), category: category, price: price};
        console.log(requestBody)
        const formData = new FormData();

        for (const [key, value] of Object.entries(requestBody)) {
            // If the value is a File object (for image upload), append it directly
            if (value instanceof File) {
                formData.append(key, value);
            } else if (value !== null && value !== undefined && value !== '') {   
                // For other fields, stringify if it's an object
                formData.append(key, typeof value === 'object' ? JSON.stringify(value) : value);
            }
        }
        



        const response = await axios.post('http://localhost:8000/items/add_item', formData, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return { success: true};
    } catch (error) {
        console.log(error);
        return { success: false, message: 'An unexpected error occurred. Please try again.' };
    }

};

export default addItem;