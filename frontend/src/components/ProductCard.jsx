import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { ChevronDownIcon, ChevronUpIcon, BadgeCheck, ChevronRightIcon } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Blank from "../assets/placeholder.svg"


export default function ProductCard({ title, price, description, imageUrl, sellingDate, category }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isBidOpen, setIsBidOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [newBid, setNewBid] = useState(price)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handlePlaceBid = () => {
    return
  }

  const handleBidSubmit = () => {
    return
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-0">
        <img
          src={Blank}
          alt={`${title} image`}
          className="w-full h-48 object-cover"
        />
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-poppins font-bold mb-2">{title}</h2>
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={Blank} alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <span className="text-sm font-poppins font-semibold ml-2 mr-1">aanandan</span>
          <BadgeCheck className='h-5 w-5 text-primary'/>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-poppins font-semibold">Current Bid:</span>
          <span className="text-lg font-poppins font-bold text-primary">${price.toFixed(2)}</span>
        </div>

        <Button onClick = {() => setIsExpanded(!isExpanded)}variant="ghost" size="sm" className="p-0 h-auto font-semibold">
        {isExpanded ? (
              <>
                <ChevronUpIcon className="h-4 w-4 mr-1 " />
                <p className='font-poppins'>Show Less</p>
                
              </>
            ) : (
              <>
                <ChevronDownIcon className="h-4 w-4 mr-1 " />
                <p className='font-poppins'>Show More</p>
              </>
            )}
        </Button>
        <p className={`mt-2 font-poppins text-gray-600 text-sm ${isExpanded ? '' : 'line-clamp-2'}`}>
            {description}
        </p>
        
       
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className = "font-poppins" size="sm">View Details</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className = "font-poppins">{title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <p className="text-sm font-poppins text-muted-foreground">{description}</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="font-poppins font-semibold">Selling Date:</span>
                <span className = "font-poppins">{sellingDate}</span>
                <span className="font-poppins font-semibold">Category:</span>
                <span className = "font-poppins">{category}</span>
                <span className="font-poppins font-semibold">Current Bid:</span>
                <span className = "font-poppins">${price.toFixed(2)}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isBidOpen} onOpenChange={setIsBidOpen}>
        <DialogTrigger asChild>
        <Button className = "font-poppins" size="sm">Place Bid </ Button >
          </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-poppins">Place Your Bid</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="current-bid" className="text-right font-poppins">
                Current Bid
              </Label>
              <Input id="current-bid" value={`$${price.toFixed(2)}`} className="col-span-3 font-poppins" disabled />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="new-bid" className="text-right font-poppins">
                Your Bid
              </Label>
              <Input
                id="new-bid"
                type="number"
                value={newBid}
                onChange={(e) => setNewBid(Number(e.target.value))}
                className="col-span-3 font-poppins"
                min={price + 0.01}
                step={0.01}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className = "font-poppins" type="submit" onClick={handleBidSubmit}>Submit Bid</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      </CardFooter>
    </Card>
  )
}