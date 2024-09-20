import React, { useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PencilIcon, Upload, Save, LogOut} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import logout from '../../server/logout'
import editProfile from '../../server/editProfile'
import Blank from "../assets/placeholder.svg"

export default function Profile({ userData }) {
  const fileInputRef = useRef(null)
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState(userData.username)
  const [isEditingBio, setIsEditingBio] = useState(false)
  const [newBio, setNewBio] = useState(userData.bio || '')
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const [newEmail, setNewEmail] = useState(userData.email || '')
  const [image, setImage] = useState(null)
  const navigate = useNavigate()


  const handleSubmit = async () => {
    const updatedData = {};
    const requestBody = JSON.stringify({
      ...(newUsername && { username: newUsername }),
      ...(newBio && { bio: newBio }),
      ...(image && { profile_img: image }),
      ...(newEmail && { email: newEmail })
  });

  const avatarStyle = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    overflow: 'hidden',
  };
  
  const avatarImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  };

  

    if (newUsername !== userData.username) {
      updatedData.newUsername = newUsername;
    }
    if (newBio !== userData.bio) {
      updatedData.newBio = newBio;
    }
    if (newEmail !== userData.email) {
      updatedData.newEmail = newEmail;
    }
    if (image) {
      updatedData.newImage = image;
    }


   


    const res = await editProfile(updatedData);
    if (res.success){
      window.location.reload()

    }

    else {
      console.log("Error")
    }
  }

  const handleUsernameChange = () => {
    // In a real app, you'd update the username on the server here
    setIsEditingUsername(false)
    console.log(newUsername)
  }

  const handleBioChange = () => {
    // In a real app, you'd update the bio on the server here
    setIsEditingBio(false)
  }

  const handleEmailChange = () => {
    // In a real app, you'd update the email on the server here
    setIsEditingEmail(false)
  }

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files[0])
    };

  const handleLogout = () => {
    // Assuming logout is imported from '../../server/logout'
    logout()
    navigate('/login')
  }

  const profileUrl = userData.image ? `http://localhost:8000${userData.image}` : Blank
  console.log(userData.image)


  return (
    <Card>
      <CardHeader>
        <div className = "flex items-center space-x-6">
        <CardTitle className="font-poppins">User Information</CardTitle>
        <Button onClick={handleLogout} className="font-poppins bg-red-600 hover:bg-red-700">
        <LogOut className="mr-2 h-4 w-4" />Logout</Button>
        </div>
        

      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20 overflow-hidden border border-2 border-black">
          <AvatarImage 
            src={profileUrl} 
            alt={userData.username} 
            className="object-cover w-full h-full"
          />
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
                <Button className="font-poppins" onClick={handleUsernameChange}>Save</Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold">{newUsername}</span>
                <Button variant="outline" size="icon" onClick={() => setIsEditingUsername(true)}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
            <Button 
              className="font-poppins"
              onClick={() => fileInputRef.current.click()}
            >
              <Upload className="mr-2 h-4 w-4" /> Change Profile Picture
            </Button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label className="font-poppins" htmlFor="email">Email:</Label>
          {isEditingEmail ? (
            <div className="flex items-center space-x-2">
              <Input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="max-w-[300px]"
              />
              <Button className="font-poppins" onClick={handleEmailChange}>Save</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Input id="email" type="email" value={newEmail} readOnly className="max-w-[300px]" />
              <Button variant="outline" size="icon" onClick={() => setIsEditingEmail(true)}>
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-poppins" htmlFor="bio">Bio:</Label>
          {isEditingBio ? (
            <div className="space-y-2">
              <Textarea
                id="bio"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
                className="min-h-[100px]"
              />
              <Button className="font-poppins" onClick={handleBioChange}>Save</Button>
            </div>
          ) : (
            <div className="flex items-start space-x-2">
              <Textarea id="bio" value={newBio} readOnly className="min-h-[100px]" />
              <Button variant="outline" size="icon" onClick={() => setIsEditingBio(true)}>
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="pt-4 border-t flex justify-center">
          <Button onClick={handleSubmit} className="md:w-1/3 sm:w-full font-poppins bg-green-600 hover:bg-green-700">
            <Save className="mr-2 h-4 w-4" /> Submit All Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}