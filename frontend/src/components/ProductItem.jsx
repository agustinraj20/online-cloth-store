import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext)

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="group block text-gray-800"
      to={`/product/${id}`}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5]">
        <img
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          src={image[0]}
          alt={name}
        />

        {/* Quick View / Arrow */}
        <div className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-gray-800 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="text-lg">→</span>
        </div>
      </div>

      {/* Product Details */}
      <div className="px-1 pt-4">
        <p className="line-clamp-1 text-sm font-medium text-gray-800 transition-colors group-hover:text-black">
          {name}
        </p>

        <p className="mt-1 text-sm font-semibold text-gray-900">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem