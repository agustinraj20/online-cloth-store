import { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const { products = [] } = useContext(ShopContext)

  const relatedProducts = useMemo(
    () =>
      products
        .filter(
          (item) =>
            item._id !== currentProductId &&
            item.category === category &&
            item.subCategory === subCategory
        )
        .slice(0, 5),
    [products, category, subCategory, currentProductId]
  )

  if (!relatedProducts.length) return null

  return (
    <section className="my-16 border-t border-stone-200 pt-12 sm:my-20 sm:pt-16 dark:border-stone-800">
      <div className="mb-8 text-center sm:mb-10">
        <div className="text-2xl sm:text-3xl">
          <Title text1="RELATED" text2="PRODUCTS" />
        </div>

        <p className="mx-auto mt-3 max-w-md text-sm text-stone-600 dark:text-stone-400">
          Complete your look with more styles selected just for you.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
        {relatedProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </section>
  )
}

export default RelatedProducts