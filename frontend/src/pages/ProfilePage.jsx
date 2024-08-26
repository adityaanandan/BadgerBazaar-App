import React from 'react'

import Profile from '../components/Profile'
import ProfileBids from '../components/ProfileBids'
import ProfileItems from '../components/ProfileItems'
import  Billing  from '../components/Billing'

const userData = {
  username: "johndoe",
  profileImage: "/placeholder.svg?height=100&width=100",
}

const userItems = [
  { id: 1, name: "Vintage Watch", price: 150, image: "/placeholder.svg?height=100&width=100" },
  { id: 2, name: "Antique Vase", price: 200, image: "/placeholder.svg?height=100&width=100" },
]

const userBids = [
  { id: 1, itemName: "Rare Coin", bidAmount: 50, status: "outbid" },
  { id: 2, itemName: "Art Print", bidAmount: 75, status: "highest" },
  
]

const ProfilePage = () => {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <Profile userData={userData}/>
      <ProfileItems userItems = {userItems} loc = {true} />
      <ProfileBids userBids={userBids}/>
      <Billing/>
      
    </div>
  )
}

export default ProfilePage