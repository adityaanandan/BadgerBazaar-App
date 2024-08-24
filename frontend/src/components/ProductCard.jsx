import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon, ChevronUpIcon, BadgeCheck, ChevronRightIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import Blank from "../assets/placeholder.svg"


const ProductCard = ({title, price, description}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="w-full">
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
                <AvatarImage src={Blank} alt="ye" />
                <AvatarFallback>aanandan</AvatarFallback>
          </Avatar>
          <span className="text-sm font-poppins font-semibold ml-2 mr-1">aanandan</span>
          <BadgeCheck className='h-5 w-5'/>
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="font-poppins text-sm font-semibold">Current Bid:</span>
          <span className="text-lg font-bold text-green-600 font-poppins">${price.toFixed(2)}</span>
        </div>
        <div className="mb-4">
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-auto font-semibold"
            onClick={() => setIsExpanded(!isExpanded)}
          >
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button className = "font-poppins" variant="outline" size="sm">View Details</Button>
        <Button className = "font-poppins" size="sm">Place Bid</Button>
      </CardFooter>
    </Card>
    
  )
}

export default ProductCard