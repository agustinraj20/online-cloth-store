import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const { products = [] } = useContext(ShopContext)

  const latestProducts = useMemo(() => products.slice(0, 10), [products])

  return (
    <section className="my-14 rounded-3xl border border-stone-200 bg-white px-4 py-10 sm:my-20 sm:px-8 md:px-10 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto mb-9 max-w-2xl text-center sm:mb-12">
        <div className="text-2xl sm:text-3xl md:text-4xl">
          <Title text1="LATEST" text2="COLLECTIONS" />
        </div>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
          Fresh styles selected to bring effortless confidence to your everyday
          wardrobe.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

      {latestProducts.length === 0 && (
        <p className="py-10 text-center text-sm text-stone-500 dark:text-stone-400">
          New arrivals will appear here soon.
        </p>
      )}
    </section>
  )
}

export default LatestCollection