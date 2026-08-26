import { useContext, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Verify = () => {
  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
  const [searchParams] = useSearchParams()

  const [message, setMessage] = useState('Verifying your payment…')
  const hasVerified = useRef(false)

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  useEffect(() => {
    const verifyPayment = async () => {
      if (hasVerified.current) return
      hasVerified.current = true

      if (!token) {
        setMessage('Please sign in to verify your order.')
        setTimeout(() => navigate('/login'), 1500)
        return
      }

      if (!orderId || !success) {
        setMessage('Payment details are missing. Returning to your cart.')
        setTimeout(() => navigate('/cart'), 1500)
        return
      }

      try {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { token } }
        )

        if (response.data.success) {
          setCartItems({})
          setMessage('Payment verified! Your order has been placed.')
          toast.success('Payment successful!')

          setTimeout(() => navigate('/orders'), 1200)
        } else {
          setMessage('Payment could not be verified. Returning to your cart.')
          toast.error(response.data.message || 'Payment verification failed.')

          setTimeout(() => navigate('/cart'), 1500)
        }
      } catch (error) {
        setMessage('We could not verify your payment. Returning to your cart.')
        toast.error(
          error.response?.data?.message || 'Payment verification failed.'
        )

        setTimeout(() => navigate('/cart'), 1500)
      }
    }

    verifyPayment()
  }, [backendUrl, navigate, orderId, setCartItems, success, token])

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-stone-50 px-4 dark:bg-[#0d0f12]">
      <section className="w-full max-w-md rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl shadow-stone-200/50 dark:border-stone-800 dark:bg-stone-950 dark:shadow-black/20 sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-amber-700 border-t-transparent dark:border-amber-400 dark:border-t-transparent" />
        </div>

        <h1 className="prata-regular mt-6 text-3xl text-stone-950 dark:text-white">
          Confirming your order
        </h1>

        <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
          {message}
        </p>

        <p className="mt-6 text-xs text-stone-500 dark:text-stone-500">
          Please do not close or refresh this page.
        </p>
      </section>
    </main>
  )
}

export default Verify