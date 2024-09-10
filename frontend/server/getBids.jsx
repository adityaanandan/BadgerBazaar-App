import React from 'react'

import axios from 'axios'

const getBids = async () => {
    try {
        const items = await axios.get('http://localhost:8000/items/user_bids',{
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        });

        
        

        return {sucess: true, outbids: items.data.outbids, bids: items.data.highest}; 

    

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

export default getBids