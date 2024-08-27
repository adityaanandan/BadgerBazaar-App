import React from 'react'

import { NavLink} from 'react-router-dom'

const Expo = () => {
  return (
    <section className="w-full py-12 md:py-24 ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none font-poppins">
                    Find your Campus Needs at BadgerBazaar
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl font-poppins">
                    Shop from a wide range of products and services offered by fellow UW-Madison students. Sell your
                    items and earn extra cash.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a
                    href="/browse"
                    className="font-poppins inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Start Shopping
                  </a>
                  <a
                    href="/sell"
                    className="font-poppins inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  >
                    Sell on BadgerBazaar
                  </a>
                </div>
              </div>

              <img src="https://res.cloudinary.com/simpleview/image/upload/v1581960979/clients/madison/16_FALL_UW_bascom_bbb5a986-44bb-4e56-9237-ff316bcefc9c.jpg" 
                alt="Hero"
                className="mx-auto aspect-video lg:w-[400px] lg:h-[400px] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square" />
              
            </div>
          </div>
        </section>
  )
}

export default Expo