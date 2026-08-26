import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const paymentMethods = [
  { id: 'stripe', label: 'Stripe', logo: assets.stripe_logo },
  { id: 'razorpay', label: 'Razorpay', logo: assets.razorpay_logo },
  { id: 'cod', label: 'Cash on delivery' },
]

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products = [],
  } = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  })

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setFormData((data) => ({ ...data, [name]: value }))
  }

  const initPay = (order) => {
    if (!window.Razorpay) {
      toast.error('Razorpay is unavailable. Please try another payment method.')
      return
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Dreams Clothing',
      description: 'Order payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          )

          if (data.success) {
            setCartItems({})
            toast.success('Payment successful. Your order has been placed!')
            navigate('/orders')
          } else {
            toast.error(data.message || 'Payment verification failed.')
          }
        } catch (error) {
          toast.error(
            error.response?.data?.message || 'Unable to verify your payment.'
          )
        }
      },
    }

    const razorpay = new window.Razorpay(options)
    razorpay.open()
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (!token) {
      toast.info('Please sign in before placing an order.')
      navigate('/login')
      return
    }

    if (isSubmitting) return

    const orderItems = []

    Object.entries(cartItems).forEach(([productId, sizes]) => {
      Object.entries(sizes).forEach(([size, quantity]) => {
        const product = products.find((item) => item._id === productId)

        if (product && quantity > 0) {
          orderItems.push({
            ...product,
            size,
            quantity,
          })
        }
      })
    })

    if (!orderItems.length) {
      toast.error('Your cart is empty.')
      navigate('/cart')
      return
    }

    const subtotal = getCartAmount()
    const shippingFee = subtotal === 0 ? 0 : delivery_fee

    const orderData = {
      address: formData,
      items: orderItems,
      amount: subtotal + shippingFee,
    }

    try {
      setIsSubmitting(true)

      if (method === 'cod') {
        const response = await axios.post(
          `${backendUrl}/api/order/place`,
          orderData,
          { headers: { token } }
        )

        if (response.data.success) {
          setCartItems({})
          toast.success('Order placed successfully!')
          navigate('/orders')
        } else {
          toast.error(response.data.message || 'Unable to place your order.')
        }
      }

      if (method === 'stripe') {
        const response = await axios.post(
          `${backendUrl}/api/order/stripe`,
          orderData,
          { headers: { token } }
        )

        if (response.data.success) {
          window.location.assign(response.data.session_url)
        } else {
          toast.error(response.data.message || 'Unable to start Stripe payment.')
        }
      }

      if (method === 'razorpay') {
        const response = await axios.post(
          `${backendUrl}/api/order/razorpay`,
          orderData,
          { headers: { token } }
        )

        if (response.data.success) {
          initPay(response.data.order)
        } else {
          toast.error(response.data.message || 'Unable to start Razorpay.')
        }
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Unable to place your order.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <form
        onSubmit={onSubmitHandler}
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start"
      >
        {/* Delivery information */}
        <section className="rounded-3xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 sm:p-8">
          <div className="text-xl sm:text-2xl">
            <Title text1="DELIVERY" text2="INFORMATION" />
          </div>

          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Enter your details so we can deliver your order correctly.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="sr-only">
                First name
              </label>
              <input
                id="firstName"
                required
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="First name"
                autoComplete="given-name"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="sr-only">
                Last name
              </label>
              <input
                id="lastName"
                required
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="Last name"
                autoComplete="family-name"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                required
                name="email"
                value={formData.email}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="email"
                placeholder="Email address"
                autoComplete="email"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="street" className="sr-only">
                Street address
              </label>
              <input
                id="street"
                required
                name="street"
                value={formData.street}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="Street address"
                autoComplete="street-address"
              />
            </div>

            <div>
              <label htmlFor="city" className="sr-only">
                City
              </label>
              <input
                id="city"
                required
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="City"
                autoComplete="address-level2"
              />
            </div>

            <div>
              <label htmlFor="state" className="sr-only">
                State
              </label>
              <input
                id="state"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="State"
                autoComplete="address-level1"
              />
            </div>

            <div>
              <label htmlFor="zipcode" className="sr-only">
                Zip code
              </label>
              <input
                id="zipcode"
                required
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="Zip code"
                autoComplete="postal-code"
              />
            </div>

            <div>
              <label htmlFor="country" className="sr-only">
                Country
              </label>
              <input
                id="country"
                required
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="text"
                placeholder="Country"
                autoComplete="country-name"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                required
                name="phone"
                value={formData.phone}
                onChange={onChangeHandler}
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
                type="tel"
                placeholder="Phone number"
                autoComplete="tel"
              />
            </div>
          </div>
        </section>

        {/* Order total and payment */}
        <aside className="lg:sticky lg:top-28">
          <CartTotal />

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 sm:p-6">
            <Title text1="PAYMENT" text2="METHOD" />

            <div className="mt-4 space-y-3">
              {paymentMethods.map((paymentMethod) => (
                <button
                  key={paymentMethod.id}
                  type="button"
                  onClick={() => setMethod(paymentMethod.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                    method === paymentMethod.id
                      ? 'border-amber-600 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/40'
                      : 'border-stone-200 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600'
                  }`}
                  aria-pressed={method === paymentMethod.id}
                >
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border ${
                      method === paymentMethod.id
                        ? 'border-amber-600'
                        : 'border-stone-400 dark:border-stone-600'
                    }`}
                  >
                    {method === paymentMethod.id && (
                      <span className="h-2 w-2 rounded-full bg-amber-600 dark:bg-amber-400" />
                    )}
                  </span>

                  {paymentMethod.logo ? (
                    <img
                      src={paymentMethod.logo}
                      alt={paymentMethod.label}
                      className="h-5 max-w-24 object-contain"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                      CASH ON DELIVERY
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-stone-950 px-6 py-4 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400 dark:focus:ring-offset-stone-950"
            >
              {isSubmitting ? 'PROCESSING...' : 'PLACE ORDER'}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-stone-500 dark:text-stone-400">
              By placing your order, you confirm that your delivery information
              is correct.
            </p>
          </section>
        </aside>
      </form>
    </main>
  )
}

export default PlaceOrder