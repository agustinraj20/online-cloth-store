import { useContext, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../components/CartTotal'

const Cart = () => {
  const { products = [], currency, cartItems = {}, updateQuantity, navigate } =
    useContext(ShopContext)

  const cartData = useMemo(() => {
    const items = []

    Object.entries(cartItems).forEach(([productId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        const product = products.find((item) => item._id === productId)

        if (product && quantity > 0) {
          items.push({
            product,
            size,
            quantity,
          })
        }
      })
    })

    return items
  }, [cartItems, products])

  const formatPrice = (price) => `${currency} ${Number(price || 0).toFixed(2)}`

  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <div className="mb-8 text-center sm:mb-10">
        <div className="text-2xl sm:text-3xl">
          <Title text1="YOUR" text2="CART" />
        </div>

        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          {cartData.length
            ? `${cartData.length} item${cartData.length > 1 ? 's' : ''} ready for checkout`
            : 'Your selected pieces will appear here.'}
        </p>
      </div>

      {cartData.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-950">
          <p className="text-lg font-semibold text-stone-950 dark:text-white">
            Your cart is empty
          </p>

          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Discover something you will love from our latest collection.
          </p>

          <Link
            to="/collection"
            className="mt-6 inline-flex rounded-full bg-stone-950 px-6 py-3 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400"
          >
            CONTINUE SHOPPING
          </Link>
        </section>
      ) : (
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start">
          <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
            <div className="hidden grid-cols-[minmax(0,1fr)_100px_48px] gap-5 border-b border-stone-200 bg-stone-50 px-6 py-4 text-xs font-semibold tracking-wider text-stone-500 sm:grid dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
              <p>PRODUCT</p>
              <p>QUANTITY</p>
              <p className="text-center">REMOVE</p>
            </div>

            {cartData.map(({ product, size, quantity }) => (
              <article
                key={`${product._id}-${size}`}
                className="grid grid-cols-[minmax(0,1fr)_42px] gap-4 border-b border-stone-200 p-4 last:border-0 sm:grid-cols-[minmax(0,1fr)_100px_48px] sm:items-center sm:gap-5 sm:px-6 sm:py-5 dark:border-stone-800"
              >
                <div className="flex min-w-0 gap-4">
                  <img
                    src={product.image?.[0]}
                    alt={product.name}
                    className="h-24 w-20 shrink-0 rounded-xl bg-stone-100 object-cover dark:bg-stone-900 sm:h-28 sm:w-24"
                  />

                  <div className="min-w-0 py-1">
                    <h2 className="line-clamp-2 text-sm font-semibold text-stone-950 sm:text-base dark:text-white">
                      {product.name}
                    </h2>

                    <p className="mt-2 text-sm font-medium text-stone-700 dark:text-stone-300">
                      {formatPrice(product.price)}
                    </p>

                    <span className="mt-3 inline-flex rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-300">
                      Size: {size}
                    </span>
                  </div>
                </div>

                <div className="col-start-1 flex items-center gap-2 sm:col-start-auto">
                  <label
                    htmlFor={`quantity-${product._id}-${size}`}
                    className="text-xs text-stone-500 sm:sr-only"
                  >
                    Quantity
                  </label>

                  <input
                    id={`quantity-${product._id}-${size}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => {
                      const newQuantity = Number(event.target.value)

                      if (newQuantity >= 1) {
                        updateQuantity(product._id, size, newQuantity)
                      }
                    }}
                    className="w-16 rounded-lg border border-stone-300 bg-white px-2 py-2 text-center text-sm text-stone-950 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900 sm:w-20"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => updateQuantity(product._id, size, 0)}
                  className="flex h-10 w-10 items-center justify-center self-center rounded-full transition hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-500 dark:hover:bg-rose-950"
                  aria-label={`Remove ${product.name}, size ${size}`}
                >
                  <img
                    src={assets.bin_icon}
                    alt=""
                    className="w-4 dark:invert"
                  />
                </button>
              </article>
            ))}
          </section>

          <aside className="lg:sticky lg:top-28">
            <CartTotal />

            <button
              type="button"
              onClick={() => navigate('/place-order')}
              className="mt-5 w-full rounded-full bg-stone-950 px-8 py-4 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400 dark:focus:ring-offset-stone-950"
            >
              PROCEED TO CHECKOUT
            </button>

            <p className="mt-4 text-center text-xs text-stone-500 dark:text-stone-400">
              Secure checkout · Easy returns · Trusted support
            </p>
          </aside>
        </div>
      )}
    </main>
  )
}

export default Cart