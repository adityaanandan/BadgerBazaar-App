import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [category, setCategory] = useState('')
  return (
    <section className="w-full max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 font-poppins">Search BadgerBazaar</h2>
      <form  className="flex flex-col gap-2">
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="search"
            placeholder="Enter your search query..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow font-poppins"
            aria-label="Search query"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[180px] font-poppins">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className = "font-poppins">
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="products">Products</SelectItem>
              <SelectItem value="services">Services</SelectItem>
              <SelectItem value="blog">Blog</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="font-poppins w-full sm:w-auto self-start mx-auto">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </form>
    </section>
  )
}

export default SearchBar