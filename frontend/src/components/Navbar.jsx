
import { NavLink } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Bucky from "../assets/BuckyBadger.svg"

export const Navbar = () => {
  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b">
      <NavLink to="#" className="flex items-center gap-2" prefetch={false}>
        <BadgeIcon className="w-6 h-6" />
        <span className="text-lg font-bold">BadgerBazaar</span>
      </NavLink>
      <nav className="hidden md:flex items-center gap-4">
        <NavLink to="#" className="text-sm font-medium transition-colors hover:text-primary" >
          Home
        </NavLink>
        <NavLink to="#" className="text-sm font-medium transition-colors hover:text-primary">
          Browse
        </NavLink>
        <NavLink to="#" className="text-sm font-medium transition-colors hover:text-primary">
          Sell
        </NavLink>
        <NavLink to="#" className="text-sm font-medium transition-colors hover:text-primary" >
          Profile
        </NavLink>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
            <NavLink
              to="#"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </NavLink>
            <NavLink
              to="#"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              
            >
              <SearchIcon className="w-5 h-5" />
              Browse
            </NavLink>
            <NavLink
              to="#"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              
            >
              <PlusIcon className="w-5 h-5" />
              Sell
            </NavLink>
            <NavLink
              to="#"
              className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              
            >
              <UserIcon className="w-5 h-5" />
              Profile
            </NavLink>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

export default Navbar

function BadgeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    </svg>
  )
}


function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}


function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}