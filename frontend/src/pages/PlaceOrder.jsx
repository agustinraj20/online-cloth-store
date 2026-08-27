import { useContext, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const paymentMethods = [
  {
    id: 'stripe',
    label: 'Stripe',
    logo: assets.stripe_logo,
  },
  {
    id: 'razorpay',
    label: 'Razorpay',
    logo: assets.razorpay_logo,
  },
  {
    id: 'cod',
    label: 'Cash on delivery',
  },
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

  // ==========================================
  // INPUT CHANGE
  // ==========================================

  const onChangeHandler = (event) => {

    const { name, value } = event.target

    setFormData((data) => ({
      ...data,
      [name]: value,
    }))
  }

  // ==========================================
  // RAZORPAY PAYMENT
  // ==========================================

  const initPay = (order) => {

    if (!window.Razorpay) {
      toast.error(
        'Razorpay is unavailable. Please try another payment method.'
      )
      return
    }

    const razorpayKey =
      import.meta.env.VITE_RAZORPAY_KEY_ID

    if (!razorpayKey) {
      toast.error(
        'Razorpay key is missing. Please check Vercel environment variables.'
      )
      return
    }

    const options = {

      key: razorpayKey,

      amount: order.amount,

      currency: order.currency || 'INR',

      name: 'Dreams Clothing',

      description: 'Order payment',

      order_id: order.id,

      receipt: order.receipt,

      handler: async (response) => {

        try {

          const verifyResponse = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            {
              headers: {
                token,
              },
            }
          )

          if (verifyResponse.data.success) {

            setCartItems({})

            toast.success(
              'Payment successful. Your order has been placed!'
            )

            navigate('/orders')

          } else {

            toast.error(
              verifyResponse.data.message ||
              'Payment verification failed.'
            )
          }

        } catch (error) {

          console.error(
            'Razorpay verification error:',
            error
          )

          toast.error(
            error.response?.data?.message ||
            'Unable to verify your payment.'
          )
        }
      },

      modal: {
        ondismiss: () => {
          setIsSubmitting(false)
        },
      },
    }

    const razorpay =
      new window.Razorpay(options)

    razorpay.open()
  }

  // ==========================================
  // SUBMIT ORDER
  // ==========================================

  const onSubmitHandler = async (event) => {

    event.preventDefault()

    // ------------------------------------------
    // CHECK LOGIN
    // ------------------------------------------

    if (!token) {

      toast.info(
        'Please sign in before placing an order.'
      )

      navigate('/login')

      return
    }

    // ------------------------------------------
    // PREVENT DOUBLE CLICK
    // ------------------------------------------

    if (isSubmitting) {
      return
    }

    // ------------------------------------------
    // CHECK BACKEND URL
    // ------------------------------------------

    if (!backendUrl) {

      toast.error(
        'Backend URL is not configured.'
      )

      console.error(
        'VITE_BACKEND_URL is missing'
      )

      return
    }

    // ------------------------------------------
    // CREATE ORDER ITEMS
    // ------------------------------------------

    const orderItems = []

    Object.entries(cartItems || {}).forEach(
      ([productId, sizes]) => {

        Object.entries(sizes || {}).forEach(
          ([size, quantity]) => {

            const product = products.find(
              (item) => item._id === productId
            )

            if (
              product &&
              Number(quantity) > 0
            ) {

              orderItems.push({

                _id: product._id,

                name: product.name,

                price: Number(product.price),

                image: product.image,

                size: size,

                quantity: Number(quantity),

              })
            }
          }
        )
      }
    )

    // ------------------------------------------
    // CHECK CART
    // ------------------------------------------

    if (orderItems.length === 0) {

      toast.error(
        'Your cart is empty.'
      )

      navigate('/cart')

      return
    }

    // ------------------------------------------
    // CALCULATE TOTAL
    // ------------------------------------------

    const subtotal =
      Number(getCartAmount()) || 0

    const shippingFee =
      subtotal > 0
        ? Number(delivery_fee)
        : 0

    const totalAmount =
      subtotal + shippingFee

    // ------------------------------------------
    // ORDER DATA
    // ------------------------------------------

    const orderData = {

      address: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        country: formData.country,
        phone: formData.phone,
      },

      items: orderItems,

      amount: totalAmount,

    }

    // ------------------------------------------
    // DEBUG
    // ------------------------------------------

    console.log(
      '================================'
    )

    console.log(
      'PLACING ORDER'
    )

    console.log(
      'Backend:',
      backendUrl
    )

    console.log(
      'Token exists:',
      Boolean(token)
    )

    console.log(
      'Order items:',
      orderItems
    )

    console.log(
      'Subtotal:',
      subtotal
    )

    console.log(
      'Delivery:',
      shippingFee
    )

    console.log(
      'Total:',
      totalAmount
    )

    console.log(
      'Order data:',
      orderData
    )

    console.log(
      '================================'
    )

    // ------------------------------------------
    // START REQUEST
    // ------------------------------------------

    try {

      setIsSubmitting(true)

      // ========================================
      // CASH ON DELIVERY
      // ========================================

      if (method === 'cod') {

        const response = await axios.post(

          `${backendUrl}/api/order/place`,

          orderData,

          {
            headers: {
              token: token,
            },
          }

        )

        console.log(
          'COD RESPONSE:',
          response.data
        )

        if (response.data.success) {

          setCartItems({})

          toast.success(
            'Order placed successfully!'
          )

          navigate('/orders')

        } else {

          toast.error(
            response.data.message ||
            'Unable to place your order.'
          )
        }

        return
      }

      // ========================================
      // STRIPE
      // ========================================

      if (method === 'stripe') {

        const response = await axios.post(

          `${backendUrl}/api/order/stripe`,

          orderData,

          {
            headers: {
              token: token,
            },
          }

        )

        console.log(
          'STRIPE RESPONSE:',
          response.data
        )

        if (
          response.data.success &&
          response.data.session_url
        ) {

          window.location.assign(
            response.data.session_url
          )

        } else {

          toast.error(
            response.data.message ||
            'Unable to start Stripe payment.'
          )
        }

        return
      }

      // ========================================
      // RAZORPAY
      // ========================================

      if (method === 'razorpay') {

        const response = await axios.post(

          `${backendUrl}/api/order/razorpay`,

          orderData,

          {
            headers: {
              token: token,
            },
          }

        )

        console.log(
          'RAZORPAY RESPONSE:',
          response.data
        )

        if (
          response.data.success &&
          response.data.order
        ) {

          initPay(
            response.data.order
          )

        } else {

          toast.error(
            response.data.message ||
            'Unable to start Razorpay payment.'
          )
        }

        return
      }

    } catch (error) {

      console.error(
        'PLACE ORDER ERROR:',
        error
      )

      console.error(
        'SERVER RESPONSE:',
        error.response?.data
      )

      toast.error(

        error.response?.data?.message ||

        error.message ||

        'Unable to place your order.'

      )

    } finally {

      if (method !== 'razorpay') {
        setIsSubmitting(false)
      }

    }
  }

  // ==========================================
  // UI
  // ==========================================

  return (

    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">

      <form
        onSubmit={onSubmitHandler}
        className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-start"
      >

        {/* =====================================
            DELIVERY INFORMATION
        ====================================== */}

        <section className="rounded-3xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 sm:p-8">

          <div className="text-xl sm:text-2xl">

            <Title
              text1="DELIVERY"
              text2="INFORMATION"
            />

          </div>

          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">

            Enter your details so we can deliver
            your order correctly.

          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">

            {/* FIRST NAME */}

            <input
              required
              name="firstName"
              value={formData.firstName}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
            />

            {/* LAST NAME */}

            <input
              required
              name="lastName"
              value={formData.lastName}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
            />

            {/* EMAIL */}

            <input
              required
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              className="sm:col-span-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="email"
              placeholder="Email address"
              autoComplete="email"
            />

            {/* STREET */}

            <input
              required
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              className="sm:col-span-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="Street address"
              autoComplete="street-address"
            />

            {/* CITY */}

            <input
              required
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="City"
              autoComplete="address-level2"
            />

            {/* STATE */}

            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="State"
              autoComplete="address-level1"
            />

            {/* ZIPCODE */}

            <input
              required
              name="zipcode"
              value={formData.zipcode}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="Zip code"
              autoComplete="postal-code"
            />

            {/* COUNTRY */}

            <input
              required
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="text"
              placeholder="Country"
              autoComplete="country-name"
            />

            {/* PHONE */}

            <input
              required
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              className="sm:col-span-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white"
              type="tel"
              placeholder="Phone number"
              autoComplete="tel"
            />

          </div>

        </section>

        {/* =====================================
            RIGHT SIDE
        ====================================== */}

        <aside className="lg:sticky lg:top-28">

          <CartTotal />

          <section className="mt-6 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-800 dark:bg-stone-950 sm:p-6">

            <Title
              text1="PAYMENT"
              text2="METHOD"
            />

            {/* PAYMENT METHODS */}

            <div className="mt-4 space-y-3">

              {paymentMethods.map(
                (paymentMethod) => (

                  <button
                    key={paymentMethod.id}
                    type="button"
                    onClick={() =>
                      setMethod(paymentMethod.id)
                    }
                    className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left transition ${
                      method === paymentMethod.id
                        ? 'border-amber-600 bg-amber-50 dark:border-amber-400 dark:bg-amber-950/40'
                        : 'border-stone-200 hover:border-stone-400 dark:border-stone-800 dark:hover:border-stone-600'
                    }`}
                    aria-pressed={
                      method === paymentMethod.id
                    }
                  >

                    {/* RADIO */}

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

                    {/* LOGO */}

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

                )
              )}

            </div>

            {/* PLACE ORDER */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-full bg-stone-950 px-6 py-4 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400"
            >

              {isSubmitting
                ? 'PROCESSING...'
                : 'PLACE ORDER'
              }

            </button>

            <p className="mt-4 text-center text-xs leading-5 text-stone-500 dark:text-stone-400">

              By placing your order, you confirm that
              your delivery information is correct.

            </p>

          </section>

        </aside>

      </form>

    </main>
  )
}

export default PlaceOrder