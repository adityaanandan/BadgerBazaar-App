import React from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Blank  from "../assets/placeholder.svg"


const ProfileItems = ({userItems}) => {
  return (
    <Card>
        <CardHeader>
          <CardTitle className = "font-poppins">Your Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <img src={Blank} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                  <h3 className="font-semibold font-poppins text-lg mb-2">{item.name}</h3>
                  <p className="text-muted-foreground font-poppins mb-4">${item.price}</p>
                  <div className="flex justify-between">
                    <Button className = "font-poppins" variant="outline" size="sm">
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button className = "font-poppins" variant="destructive" size="sm">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add New Item</Button>
        </CardFooter>
      </Card>
  )
}

export default ProfileItems