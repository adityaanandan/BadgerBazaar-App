import React from 'react'
import NewItem from '../components/NewItem'

import ProfileItems from '../components/ProfileItems'

const SellPage = () => {
  const userItems = [
    { id: 1, name: "Vintage Watch", price: 150, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Antique Vase", price: 200, image: "/placeholder.svg?height=100&width=100" },
  ]
  return (
    <div className = "container mx-auto p-4">
        
        <ProfileItems userItems = {userItems} loc = {false}/>
        <NewItem />

    </div>
    
  )
}

export default SellPage