import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext)

  const bestSellers = useMemo(
    () => products.filter((item) => item.bestseller).slice(0, 5),
    [products]
  )

  return (
    <section className="my-14 overflow-hidden rounded-3xl border border-stone-200 bg-stone-50 px-4 py-10 sm:my-20 sm:px-8 md:px-10 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto mb-8 max-w-2xl text-center sm:mb-12">
        <div className="text-2xl sm:text-3xl md:text-4xl">
          <Title text1="BEST" text2="SELLERS" />
        </div>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
          Discover the pieces everyone is loving right now—selected for style,
          comfort, and everyday confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {bestSellers.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

      {bestSellers.length === 0 && (
        <p className="py-10 text-center text-sm text-stone-500 dark:text-stone-400">
          No best sellers are available right now.
        </p>
      )}
    </section>
  )
}

export default BestSeller