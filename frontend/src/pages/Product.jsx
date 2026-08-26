import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
  const { productId } = useParams()
  const { products = [], currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId)

    if (selectedProduct) {
      setProductData(selectedProduct)
      setImage(selectedProduct.image?.[0] || '')
      setSize('')
    }
  }, [productId, products])

  if (!productData) {
    return (
      <div className="flex min-h-72 items-center justify-center text-sm text-stone-500 dark:text-stone-400">
        Loading product…
      </div>
    )
  }

  const formattedPrice = Number(productData.price || 0).toFixed(2)

  return (
    <main className="border-t border-stone-200 pt-8 sm:pt-12 dark:border-stone-800">
      <section className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Product images */}
        <div className="flex flex-col-reverse gap-4 sm:flex-row">
          <div className="flex gap-3 overflow-x-auto pb-1 sm:w-24 sm:flex-col sm:overflow-y-auto">
            {productData.image?.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => setImage(item)}
                className={`h-24 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-stone-100 outline-none transition focus-visible:ring-2 focus-visible:ring-amber-500 dark:bg-stone-900 sm:h-28 sm:w-full ${
                  image === item
                    ? 'border-amber-600'
                    : 'border-transparent hover:border-stone-300 dark:hover:border-stone-700'
                }`}
                aria-label={`View product image ${index + 1}`}
                aria-pressed={image === item}
              >
                <img
                  src={item}
                  alt={`${productData.name} thumbnail ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-900">
            {image && (
              <img
                src={image}
                alt={productData.name}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
            )}
          </div>
        </div>

        {/* Product information */}
        <div className="flex flex-col justify-center">
          <p className="text-xs font-semibold tracking-[0.16em] text-amber-700 dark:text-amber-400">
            {productData.category?.toUpperCase()}
          </p>

          <h1 className="prata-regular mt-3 text-3xl leading-tight text-stone-950 sm:text-4xl dark:text-white">
            {productData.name}
          </h1>

          <div className="mt-4 flex items-center gap-1">
            {[1, 2, 3, 4].map((star) => (
              <img
                key={star}
                src={assets.star_icon}
                alt=""
                className="h-4 w-4"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt=""
              className="h-4 w-4"
            />
            <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
              122 reviews
            </span>
          </div>

          <p className="mt-6 text-3xl font-semibold text-stone-950 dark:text-white">
            {currency} {formattedPrice}
          </p>

          <p className="mt-5 max-w-xl text-sm leading-7 text-stone-600 sm:text-base dark:text-stone-400">
            {productData.description}
          </p>

          <fieldset className="mt-8">
            <legend className="mb-3 text-sm font-semibold text-stone-950 dark:text-white">
              Select size
            </legend>

            <div className="flex flex-wrap gap-2">
              {productData.sizes?.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setSize(item)}
                  className={`min-w-12 rounded-lg border px-4 py-2.5 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    item === size
                      ? 'border-stone-950 bg-stone-950 text-white dark:border-white dark:bg-white dark:text-stone-950'
                      : 'border-stone-200 bg-white text-stone-800 hover:border-amber-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200'
                  }`}
                  aria-pressed={item === size}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => addToCart(productData._id, size)}
            className="mt-8 w-full rounded-full bg-stone-950 px-8 py-4 text-sm font-bold tracking-wider text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400 dark:focus:ring-offset-stone-950 sm:w-fit"
          >
            ADD TO CART
          </button>

          <div className="mt-8 border-t border-stone-200 pt-6 text-sm leading-7 text-stone-600 dark:border-stone-800 dark:text-stone-400">
            <p>✓ 100% original product</p>
            <p>✓ Cash on delivery available</p>
            <p>✓ Easy return and exchange within 7 days</p>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="mt-16 sm:mt-24">
        <div className="flex border-b border-stone-200 dark:border-stone-800">
          <button
            type="button"
            className="border-b-2 border-stone-950 px-5 py-4 text-sm font-semibold text-stone-950 dark:border-white dark:text-white"
          >
            Description
          </button>
          <button
            type="button"
            className="px-5 py-4 text-sm text-stone-500 dark:text-stone-400"
          >
            Reviews (122)
          </button>
        </div>

        <div className="max-w-4xl space-y-4 py-6 text-sm leading-7 text-stone-600 sm:text-base dark:text-stone-400">
          <p>{productData.description}</p>
          <p>
            Every product is chosen for its quality, comfort, and versatile
            style—so it feels as good as it looks.
          </p>
        </div>
      </section>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
        currentProductId={productData._id}
      />
    </main>
  )
}

export default Product