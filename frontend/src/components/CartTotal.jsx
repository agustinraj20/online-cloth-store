import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

  const subtotal = getCartAmount()
  const shippingFee = subtotal === 0 ? 0 : delivery_fee
  const total = subtotal + shippingFee

  const formatPrice = (amount) => `${currency} ${amount.toFixed(2)}`

  return (
    <section className="w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6 dark:border-stone-800 dark:bg-stone-950">
      <div className="text-xl sm:text-2xl">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="mt-5 space-y-4 text-sm text-stone-600 dark:text-stone-300">
        <div className="flex items-center justify-between gap-4">
          <p>Subtotal</p>
          <p className="font-medium text-stone-900 dark:text-white">
            {formatPrice(subtotal)}
          </p>
        </div>

        <div className="h-px bg-stone-200 dark:bg-stone-800" />

        <div className="flex items-center justify-between gap-4">
          <p>Shipping fee</p>
          <p className="font-medium text-stone-900 dark:text-white">
            {shippingFee === 0 ? 'Free' : formatPrice(shippingFee)}
          </p>
        </div>

        <div className="h-px bg-stone-200 dark:bg-stone-800" />

        <div className="flex items-center justify-between gap-4 pt-1 text-base">
          <p className="font-semibold text-stone-950 dark:text-white">Total</p>
          <p className="font-bold text-stone-950 dark:text-white">
            {formatPrice(total)}
          </p>
        </div>
      </div>
    </section>
  )
}

export default CartTotal