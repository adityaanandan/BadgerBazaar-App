import React from 'react'

import Profile from '../components/Profile'
import ProfileBids from '../components/ProfileBids'
import ProfileItems from '../components/ProfileItems'
import  Billing  from '../components/Billing'
import {useEffect, useState } from 'react'
import getProfile from '../../server/getProfile'
import getItems from '../../server/getItems'
import getBids from '../../server/getBids'
import { set } from 'date-fns'
import {BarLoader } from 'react-spinners'






const userBids = [
  { id: 1, itemName: "Rare Coin", bidAmount: 50, status: "outbid" },
  { id: 2, itemName: "Art Print", bidAmount: 75, status: "highest" },
  
]

const ProfilePage = () => {
  const [userData, setUserData] = useState({});
  const [userItems, setUserItems] = useState([]);
  const [userBids, setUserBids] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile();
        setUserData(profileData);
        const itemsData = await getItems();
        setUserItems(itemsData.data);
        const bidData = await getBids();
        console.log(bidData)
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <BarLoader color="#00BFFF" width={80}/>; 
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Profile userData={userData} />
      <ProfileItems userItems={userItems} loc={true} />
      <ProfileBids userBids={userBids} />
      <Billing />
    </div>
  );
}

export default ProfilePage