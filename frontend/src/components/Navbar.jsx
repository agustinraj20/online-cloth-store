import { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const navItems = [
  { path: '/', label: 'HOME' },
  { path: '/collection', label: 'COLLECTION' },
  { path: '/about', label: 'ABOUT' },
  { path: '/contact', label: 'CONTACT' },
]

const Navbar = () => {
  const [visible, setVisible] = useState(false)

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
    setVisible(false)
    navigate('/login')
  }

  const openSearch = () => {
    setShowSearch(true)
    navigate('/collection')
  }

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-xs font-semibold tracking-[0.2em] transition ${
      isActive ? 'text-amber-400' : 'text-neutral-400 hover:text-white'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[#0d0f12]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            className="shrink-0 transition-opacity hover:opacity-80"
            aria-label="Dreams Clothing home"
          >
            <img
              src={assets.logo}
              className="w-28 invert sm:w-32"
              alt="Dreams Clothing"
            />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden sm:block" aria-label="Main navigation">
            <ul className="flex items-center gap-10 lg:gap-14">
              {navItems.map(({ path, label }) => (
                <li key={path}>
                  <NavLink to={path} className={navLinkClass}>
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-0 h-0.5 w-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openSearch}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label="Search products"
            >
              <img
                src={assets.search_icon}
                className="w-4 invert opacity-80"
                alt=""
              />
            </button>

            {/* Desktop account menu */}
            <div className="group relative hidden sm:block">
              <button
                type="button"
                onClick={() => !token && navigate('/login')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label={token ? 'Account menu' : 'Log in'}
              >
                <img
                  src={assets.profile_icon}
                  className="w-4 invert opacity-80"
                  alt=""
                />
              </button>

              {token && (
                <div className="absolute right-0 top-full hidden pt-3 group-hover:block group-focus-within:block">
                  <div className="w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl">
                    <button
                      type="button"
                      onClick={() => navigate('/profile')}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                    >
                      My Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => navigate('/orders')}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                    >
                      My Orders
                    </button>

                    <div className="my-1 border-t border-neutral-800" />

                    <button
                      type="button"
                      onClick={logout}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
              aria-label={`Cart, ${getCartCount()} items`}
            >
              <img
                src={assets.cart_icon}
                className="w-4 invert opacity-80"
                alt=""
              />

              {getCartCount() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-black shadow-lg shadow-amber-400/20">
                  {getCartCount()}
                </span>
              )}
            </Link>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setVisible(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:bg-neutral-800 sm:hidden"
              aria-label="Open navigation menu"
              aria-expanded={visible}
              aria-controls="mobile-navigation"
            >
              <img
                src={assets.menu_icon}
                className="w-5 invert"
                alt=""
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation */}
      {visible && (
        <>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md sm:hidden"
            aria-label="Close navigation menu"
          />

          <aside
            id="mobile-navigation"
            className="fixed right-0 top-0 z-[70] h-full w-[80%] max-w-sm border-l border-neutral-800 bg-neutral-950 p-6 shadow-2xl sm:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
              <img
                src={assets.logo}
                className="w-28 invert"
                alt="Dreams Clothing"
              />

              <button
                type="button"
                onClick={() => setVisible(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <nav className="mt-8 space-y-2" aria-label="Mobile main navigation">
              {navItems.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setVisible(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl border px-5 py-3.5 text-xs font-semibold tracking-widest transition ${
                      isActive
                        ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                        : 'border-neutral-900 bg-neutral-900/40 text-neutral-400 hover:border-neutral-800 hover:text-white'
                    }`
                  }
                >
                  <span>{label}</span>
                  <span aria-hidden="true" className="opacity-40">
                    →
                  </span>
                </NavLink>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6 border-t border-neutral-800 pt-4">
              {token ? (
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVisible(false)
                      navigate('/orders')
                    }}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-3 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
                  >
                    My Orders
                  </button>

                  <button
                    type="button"
                    onClick={logout}
                    className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold text-black transition hover:bg-amber-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setVisible(false)
                    navigate('/login')
                  }}
                  className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold text-black transition hover:bg-amber-300"
                >
                  Login
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default Navbar