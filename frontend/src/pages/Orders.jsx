import { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext)

  const [orderData, setOrderData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const loadOrderData = useCallback(async () => {
    if (!token) {
      setOrderData([])
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      )

      if (!response.data.success) {
        toast.error(response.data.message || 'Unable to load your orders.')
        return
      }

      const allOrderItems = response.data.orders
        .flatMap((order) =>
          order.items.map((item, itemIndex) => ({
            ...item,
            orderItemId: `${order._id || order.date}-${item._id || itemIndex}`,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
          }))
        )
        .reverse()

      setOrderData(allOrderItems)
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Unable to load your orders.'
      )
    } finally {
      setIsLoading(false)
    }
  }, [backendUrl, token])

  useEffect(() => {
    loadOrderData()
  }, [loadOrderData])

  const formatPrice = (price) => `${currency} ${Number(price || 0).toFixed(2)}`

  const statusColor = (status = '') => {
    const normalizedStatus = status.toLowerCase()

    if (normalizedStatus.includes('cancel')) return 'bg-rose-500'
    if (normalizedStatus.includes('deliver')) return 'bg-emerald-500'
    return 'bg-amber-500'
  }

  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <div>
          <div className="text-2xl sm:text-3xl">
            <Title text1="MY" text2="ORDERS" />
          </div>

          <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
            Track your purchases and view their latest status.
          </p>
        </div>

        {token && (
          <button
            type="button"
            onClick={loadOrderData}
            disabled={isLoading}
            className="rounded-full border border-stone-300 px-4 py-2 text-xs font-bold tracking-wider text-stone-700 transition hover:border-amber-600 hover:text-amber-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400"
          >
            {isLoading ? 'REFRESHING...' : 'REFRESH ORDERS'}
          </button>
        )}
      </div>

      {!token ? (
        <section className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-950">
          <h1 className="text-lg font-semibold text-stone-950 dark:text-white">
            Sign in to view your orders
          </h1>

          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Your order history will be available after you log in.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-full bg-stone-950 px-6 py-3 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400"
          >
            SIGN IN
          </Link>
        </section>
      ) : isLoading ? (
        <div className="grid gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl bg-stone-100 dark:bg-stone-900"
            />
          ))}
        </div>
      ) : orderData.length === 0 ? (
        <section className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-950">
          <h1 className="text-lg font-semibold text-stone-950 dark:text-white">
            No orders yet
          </h1>

          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Your completed orders will appear here.
          </p>

          <Link
            to="/collection"
            className="mt-6 inline-flex rounded-full bg-stone-950 px-6 py-3 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400"
          >
            START SHOPPING
          </Link>
        </section>
      ) : (
        <section className="space-y-4">
          {orderData.map((item) => (
            <article
              key={item.orderItemId}
              className="rounded-2xl border border-stone-200 bg-white p-4 dark:border-stone-800 dark:bg-stone-950 sm:p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-start gap-4 sm:gap-5">
                  <img
                    src={item.image?.[0]}
                    alt={item.name}
                    className="h-24 w-20 shrink-0 rounded-xl bg-stone-100 object-cover dark:bg-stone-900 sm:h-28 sm:w-24"
                  />

                  <div className="min-w-0">
                    <h2 className="text-sm font-semibold text-stone-950 sm:text-base dark:text-white">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm font-semibold text-stone-800 dark:text-stone-200">
                      {formatPrice(item.price)}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-600 dark:text-stone-400">
                      <span className="rounded-md bg-stone-100 px-2.5 py-1 dark:bg-stone-900">
                        Qty: {item.quantity}
                      </span>
                      <span className="rounded-md bg-stone-100 px-2.5 py-1 dark:bg-stone-900">
                        Size: {item.size}
                      </span>
                    </div>

                    <div className="mt-3 space-y-1 text-xs text-stone-500 dark:text-stone-400">
                      <p>
                        Ordered:{' '}
                        {item.date
                          ? new Date(item.date).toLocaleDateString()
                          : '—'}
                      </p>
                      <p>Payment: {item.paymentMethod || '—'}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-stone-200 pt-4 md:w-52 md:flex-col md:items-end md:border-t-0 md:pt-0 dark:border-stone-800">
                  <div className="flex items-center gap-2 text-sm font-medium text-stone-700 dark:text-stone-300">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${statusColor(
                        item.status
                      )}`}
                    />
                    {item.status || 'Processing'}
                  </div>

                  <button
                    type="button"
                    onClick={loadOrderData}
                    className="rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:border-amber-600 hover:text-amber-700 dark:border-stone-700 dark:text-stone-300 dark:hover:border-amber-400 dark:hover:text-amber-400"
                  >
                    TRACK ORDER
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default Orders