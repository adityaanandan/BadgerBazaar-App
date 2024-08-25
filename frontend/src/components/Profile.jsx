import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react'
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PencilIcon } from 'lucide-react'
import Blank from "../assets/placeholder.svg"
import logout from '../../server/logout'
import { useNavigate } from 'react-router-dom'

const Profile = ({userData}) => {
    const [isEditingUsername, setIsEditingUsername] = useState(false)
    const [newUsername, setNewUsername] = useState(userData.username)
    const navigate = useNavigate()
    const handleUsernameChange = () => {
        // In a real app, you'd update the username on the server here
        setIsEditingUsername(false)
      }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }
  return (
    <Card>
        <CardHeader>
          <CardTitle className = "font-poppins">User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={Blank} alt={userData.username} />
              <AvatarFallback>{userData.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              {isEditingUsername ? (
                <div className="flex items-center space-x-2">
                  <Input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="max-w-[200px]"
                  />
                  <Button className = "font-poppins" onClick={handleUsernameChange}>Save</Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold">{userData.username}</span>
                  <Button variant="outline" size="icon" onClick={() => setIsEditingUsername(true)}>
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Label className = "font-poppins" htmlFor="password">Password:</Label>
                <Input id="password" type="password" value="********" readOnly className="max-w-[200px]" />
                <Button className = "font-poppins" variant="outline">Change</Button>
              </div>
            </div>
          </div>
          <Button className = "font-poppins">Change Profile Picture</Button>
          <Button onClick = {handleLogout} className="font-poppins bg-red-600 ml-4">Logout</Button>

        </CardContent>

      </Card>
  )
}

export default Profile