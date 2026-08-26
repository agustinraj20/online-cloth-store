import { useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="mt-16 border-t border-stone-800 bg-stone-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="prata-regular text-2xl text-white transition hover:text-amber-400"
            >
              Dreams Clothing
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-stone-400">
              Everyday style, thoughtfully selected for every moment that
              matters.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Shop
            </h2>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  to="/collection"
                  className="transition hover:text-amber-400"
                >
                  All collections
                </Link>
              </li>
              <li>
                <Link
                  to="/collection"
                  className="transition hover:text-amber-400"
                >
                  New arrivals
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Customer care
            </h2>

            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link to="/contact" className="transition hover:text-amber-400">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/orders" className="transition hover:text-amber-400">
                  Track your order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">
              Stay in the loop
            </h2>

            <p className="mt-4 text-sm leading-6 text-stone-400">
              New arrivals, private offers, and style inspiration.
            </p>

            <form onSubmit={handleSubmit} className="mt-4 flex">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>

              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Your email"
                autoComplete="email"
                required
                className="min-w-0 flex-1 rounded-l-lg border border-stone-700 bg-stone-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-stone-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
              />

              <button
                type="submit"
                className="rounded-r-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-stone-950"
              >
                Join
              </button>
            </form>

            {subscribed && (
              <p className="mt-3 text-xs text-emerald-400" role="status">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-stone-800 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Dreams Clothing. All rights reserved.</p>
          <p>Designed for everyday confidence.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer