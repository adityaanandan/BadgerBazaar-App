import React from 'react'
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


const Billing = () => {
  return (
    <Card>
        <CardHeader>
          <CardTitle className = "font-poppins">Billing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="space-y-4">
                <Button className="w-full sm:w-auto">
                <CreditCard className="mr-2 h-4 w-4" />
                Connect to Stripe
                </Button>
                <p className="text-sm text-muted-foreground">
                <strong className="font-medium">Disclaimer:</strong> Selling is not permitted without Stripe authorization. Please ensure you have the necessary permissions before proceeding with any transactions.
            </p>
            </div>
          
          
        </CardContent>
      </Card>
  )
}

export default Billing