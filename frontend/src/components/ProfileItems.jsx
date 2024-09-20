import React, { useState } from 'react'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Blank from "../assets/placeholder.svg"
import { Link } from 'react-scroll'

const ProfileItems = ({ userItems, loc, onEdit, onDelete }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const handleEdit = (item) => {
    setEditingItem(item)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (itemId) => {
    onDelete(itemId)
  }

  const handleSaveEdit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const updatedItem = {
      ...editingItem,
      name: formData.get('name'),
      description: formData.get('description'),
      date: formData.get('date'),
      category: formData.get('category'),
      starting_price: formData.get('price'),
    }
    console.log(updatedItem)
    setIsEditDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-poppins">Your Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <img src={Blank} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-md" />
                <h3 className="font-semibold font-poppins text-lg mb-2">{item.name}</h3>
                <p className="text-muted-foreground font-poppins mb-4">${item.starting_price}</p>
                <div className="flex justify-between">
                  <Button 
                    className="font-poppins" 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    className="font-poppins" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                  >
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
        {loc ? (
          <a href="/sell"><Button className="w-full font-poppins">Add Item</Button></a>
        ) : (
          <Link 
            spy={true} 
            smooth={true} 
            offset={0} 
            duration={500} 
            to="add"
          >
            <Button className="w-full font-poppins">New Item</Button>
          </Link>
        )}
      </CardFooter>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="font-poppins">
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Item</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSaveEdit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" defaultValue={editingItem?.name} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea id="description" name="description" defaultValue={editingItem?.description} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" name="date" type="date" defaultValue={editingItem?.date} className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right font-bold font-poppins">
                  Category
                </Label>
                <div className="col-span-3">
                  <Select name="category" defaultValue={editingItem?.category}>
                    <SelectTrigger className="font-poppins">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="font-poppins">
                      <SelectItem value="Textbooks & Academic Supplies">Textbooks & Academic Supplies</SelectItem>
                      <SelectItem value="Electronics & Tech">Electronics & Tech</SelectItem>
                      <SelectItem value="Furniture & Home Goods">Furniture & Home Goods</SelectItem>
                      <SelectItem value="Clothing & Accessories">Clothing & Accessories</SelectItem>
                      <SelectItem value="Sports & Outdoor Equipment">Sports & Outdoor Equipment</SelectItem>
                      <SelectItem value="Tickets & Events">Tickets & Events</SelectItem>
                      <SelectItem value="Housing & Subleases">Housing & Subleases</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input id="price" name="price" type="number" defaultValue={editingItem?.starting_price} className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="font-poppins">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default ProfileItems

// const ProfileItems = ({userItems, loc}) => {
//   return (
//     <Card>
//         <CardHeader>
//           <CardTitle className = "font-poppins">Your Items</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {userItems.map((item) => (
//               <Card key={item.id}>
//                 <CardContent className="p-4">
//                   <img src={Blank} alt={item.name} className="w-full h-40 object-cover mb-4 rounded-md" />
//                   <h3 className="font-semibold font-poppins text-lg mb-2">{item.name}</h3>
//                   <p className="text-muted-foreground font-poppins mb-4">${item.starting_price}</p>
//                   <div className="flex justify-between">
//                     <Button className = "font-poppins" variant="outline" size="sm">
//                       <PencilIcon className="h-4 w-4 mr-2" />
//                       Edit
//                     </Button>
//                     <Button className = "font-poppins" variant="destructive" size="sm">
//                       <TrashIcon className="h-4 w-4 mr-2" />
//                       Delete
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         </CardContent>
//         <CardFooter>
//           {loc ? <a href="/sell"><Button  className="w-full font-poppins">Add Item</Button> </a> : <Link spy={true} 
//       smooth={true} 
//       offset={0} 
//       duration={500}
//       to="add"><Button className="w-full font-poppins">New Item</Button> </Link>}
//         </CardFooter>
//       </Card>
//   )
// }

// export default ProfileItems