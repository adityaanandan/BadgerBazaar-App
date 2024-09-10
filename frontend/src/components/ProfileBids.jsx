import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon } from 'lucide-react'

const getBadgeColor = (status) => {
    switch (status) {
      case 'outbid':
        return 'bg-red-400 text-destructive-foreground'
      case 'highest':
        return 'bg-green-400 text-primary-foreground'
      
    
      
      
    }
  }


const ProfileBids = ({userBids}) => {
  return (
    <Card>
        <CardHeader>
          <CardTitle className = "font-poppins">Your Bids</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="space-y-4">
            {userBids.map((bid) => (
              <div key={bid.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold font-poppins">{bid.itemName}</h3>
                  <p className="text-muted-foreground font-poppins">Bid Amount: ${bid.bidAmount}</p>
                </div>
                <div className="flex flex-col items-end mt-2 sm:mt-0">
                  <Badge className={`mb-2 font-poppins ${getBadgeColor(bid.status)}`}>
                    {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                  </Badge>
                  {bid.status == 'outbid' && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleRaiseBid(bid.id)}
                      className="w-full sm:w-auto font-poppins"
                    >
                      <ArrowUpIcon className="h-4 w-4 mr-2" />
                      Raise
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
        <a href="/items"><Button  className="w-full font-poppins">Find Items</Button> </a>
        </CardFooter>
      </Card>
  )
}

export default ProfileBids