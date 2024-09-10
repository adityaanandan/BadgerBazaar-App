import React from 'react'

import axios from 'axios'

const getItems = async () => {
    try {
        console.log(localStorage.getItem('authToken'))
        const items = await axios.get('http://localhost:8000/items/user_items',{
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        });

        if (items.detail){
            console.log(items.detail)
        }


        return {sucess: true, data: items.data}; 

    

    } catch (error) {
        
        if (localStorage.getItem('authToken') === null) {
            navigate('/login');
        }
        else {
            console.error('Error fetching items:', error);
        }
        return Promise.reject(error);
    }
}

export default getItems