import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

const ProductItem = ({ id, image = [], name, price }) => {
  const { currency } = useContext(ShopContext)

  const productImage = image[0]
  const formattedPrice = Number(price || 0).toFixed(2)

  return (
    <Link
      to={`/product/${id}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-stone-950"
      aria-label={`View ${name}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900">
        {productImage ? (
          <img
            src={productImage}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-500">
            Image unavailable
          </div>
        )}

        <span className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-lg text-stone-950 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 dark:bg-stone-800 dark:text-white">
          <span aria-hidden="true">→</span>
        </span>
      </div>

      <div className="px-1 pt-4">
        <h3 className="line-clamp-1 text-sm font-medium text-stone-800 transition-colors group-hover:text-amber-700 dark:text-stone-200 dark:group-hover:text-amber-400">
          {name}
        </h3>

        <p className="mt-1 text-sm font-semibold text-stone-950 dark:text-white">
          {currency} {formattedPrice}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem