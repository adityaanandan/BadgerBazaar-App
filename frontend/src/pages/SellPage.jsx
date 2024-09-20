import React from 'react'
import NewItem from '../components/NewItem'
import {useEffect, useState} from 'react'
import getItems from '../../server/getItems'

import ProfileItems from '../components/ProfileItems'

const SellPage = () => {
  const [userItems, setUserItems] = useState([]); 
  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const itemsData = await getItems();
        setUserItems(itemsData.data);
        
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        console.log(userItems)

      }
    };

    fetchData();
  }, []);
  return (
    <div className = "container mx-auto p-4">
        <ProfileItems userItems = {userItems} loc = {false}/>
        <NewItem />

    </div>
    
  )
}

export default SellPage