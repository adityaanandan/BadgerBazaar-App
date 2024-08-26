import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, PlusIcon } from 'lucide-react'
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


import Blank from "../assets/placeholder.svg"





const NewItem = () => {
    const [newItem, setNewItem] = useState({
        title: '',
        startingBid: '',
        image: null,
        date: new Date(),
        category: '',
        description: ''
      })

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setNewItem({ ...newItem, image: e.target.files[0] })
        }
      }


    

    
  return (
    <div id = "add" className = "mx-auto mt-4">
      <Card>
        <CardHeader>
          <CardTitle className = "font-poppins">Add Item</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
        <form className="space-y-4">
          <div>
            <Label className = "font-bold font-poppins" htmlFor="title">Item Title</Label>
            <Input
              id="title"
              value={newItem.title}
              className = "font-poppins"
              onChange={(e) => setNewItem({...newItem, title: e.target.value})}
              required
            />
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="startingBid">Starting Bid ($)</Label>
            <Input
              id="startingBid"
              type="number"
              value={newItem.startingBid}
              className = "font-poppins"
              onChange={(e) => setNewItem({...newItem, startingBid: e.target.value})}
              required
            />
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="image">Item Image</Label>
            <Input
              id="image"
              type="file"
              onChange={handleImageChange}
              className = "font-poppins"
              accept="image/*"
            />
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="date">Auction End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full justify-start text-left font-normal font-poppins ${!newItem.date && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {newItem.date ? format(newItem.date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  className = "font-poppins"
                  mode="single"
                  selected={newItem.date}
                  onSelect={(date) => setNewItem({...newItem, date: date || new Date()})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setNewItem({...newItem, category: value})}>
              <SelectTrigger className = "font-poppins">
                <SelectValue  placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className = "font-poppins">
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                <SelectItem value="Collectibles">Collectibles</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="description">Item Description</Label>
            <Textarea
              id="description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              placeholder="Provide a detailed description of your item..."
              className="h-32 font-poppins"
            />
          </div>
          <Button className = "font-poppins" type="submit">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </form>
          
          
        </CardContent>
      </Card>
        
      </div>
  )
}

export default NewItem