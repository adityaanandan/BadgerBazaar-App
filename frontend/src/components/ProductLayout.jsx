import { useState } from 'react'
import Pagination from './Pagination'
import ProductCard from './ProductCard'
import Searchbar from './Searchbar'

// Sample product data
const products = [
  { id: 1, title: "Vintage Watch", category: "Items", sellingDate: "9/10/2024", price: 1250, description: "This exquisite vintage watch features a classic design with a leather strap and gold-plated case. It's a rare piece from the 1960s, perfectly maintained and in excellent working condition.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 2, title: "Antique Vase", category: "Items", sellingDate: "9/10/2024", price: 800, description: "A beautiful antique vase from the Ming Dynasty. This piece showcases intricate blue and white porcelain designs, a testament to the craftsmanship of its era.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 3, title: "Rare Coin", category: "Items", sellingDate: "9/10/2024", price: 5000, description: "A rare gold coin from ancient Rome, featuring the profile of Emperor Augustus. This coin is in remarkable condition and is a prized item for serious collectors.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 4, title: "Vintage Camera", category: "Items", sellingDate: "9/10/2024", price: 600, description: "A classic Leica camera from the 1950s. This camera is in full working order and comes with its original leather case. A must-have for photography enthusiasts.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 5, title: "Art Deco Lamp", category: "Items", sellingDate: "9/10/2024", price: 1800, description: "An elegant Art Deco table lamp from the 1920s. The lamp features a geometric design with a brass base and a frosted glass shade, embodying the glamour of the era.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 6, title: "First Edition Book", category: "Items", sellingDate: "9/10/2024", price: 3500, description: "A first edition copy of 'To Kill a Mockingbird' by Harper Lee. This book is in excellent condition and includes the original dust jacket. A true literary treasure.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 7, title: "Vintage Record Player", category: "Items", sellingDate: "9/10/2024", price: 950, description: "A beautifully restored vintage record player from the 1960s. This turntable offers both style and high-quality sound, perfect for vinyl enthusiasts.", imageUrl: "/placeholder.svg?height=200&width=400" },
  { id: 8, title: "Antique Chess Set", category: "Items", sellingDate: "9/10/2024", price: 1500, description: "An exquisite antique chess set carved from ivory and ebony. Each piece is a work of art, showcasing incredible detail and craftsmanship.", imageUrl: "/placeholder.svg?height=200&width=400" },
]

// Main component
export default function ProductLayout() {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(products.length / itemsPerPage)

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return products.slice(startIndex, endIndex)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Searchbar />
      <h1 className="text-3xl font-bold mb-8 text-center font-poppins">Items</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {getCurrentPageItems().map((product) => (
          <ProductCard 
            key={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            sellingDate={product.sellingDate}
            category={product.category}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}