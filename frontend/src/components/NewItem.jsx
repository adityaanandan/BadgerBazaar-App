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

import addItem from '../../server/addItem'


import Blank from "../assets/placeholder.svg"





const NewItem = () => {
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        item_img: null,
        date: new Date(),
        category: '',
        price: 0.0,
        
        
      })


    

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setNewItem({ ...newItem, item_img: e.target.files[0] })
          console.log(newItem)
        }
      }

    const handleSubmit = async (e) => {
      
      e.preventDefault()
      await addItem(newItem)
      window.location.reload()
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
              value={newItem.name}
              className = "font-poppins"
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              required
            />
          </div>
          <div>
            <Label className = "font-bold font-poppins" htmlFor="startingBid">Starting Bid ($)</Label>
            <Input
              id="startingBid"
              type="number"
              value={newItem.price}
              className = "font-poppins"
              onChange={(e) => setNewItem({...newItem, price: e.target.value})}
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
          <Button type = "submit" onClick = {handleSubmit} className = "font-poppins">
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