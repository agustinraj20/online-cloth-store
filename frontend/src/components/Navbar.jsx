import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'

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
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItems({})
  }

  const navLinkClass = ({ isActive }) =>
    `relative py-1 text-xs font-semibold tracking-[0.2em] transition-all duration-300 ${
      isActive ? 'text-amber-400' : 'text-neutral-400 hover:text-white'
    }`

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-neutral-800/80 bg-[#0d0f12]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="shrink-0 transition-opacity hover:opacity-80">
            <img
              src={assets.logo}
              className="w-28 sm:w-32 invert"
              alt="Store Logo"
            />
          </Link>

          {/* Nav Links */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-10 lg:gap-14">
              {['/', '/collection', '/about', '/contact'].map((path) => {
                const label = path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()
                return (
                  <NavLink key={path} to={path} className={navLinkClass}>
                    {({ isActive }) => (
                      <>
                        <span>{label}</span>
                        {isActive && (
                          <span className="absolute bottom-0 left-0 h-[2px] w-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        )}
                      </>
                    )}
                  </NavLink>
                )
              })}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => {
                setShowSearch(true)
                navigate('/collection')
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white"
              aria-label="Search"
            >
              <img src={assets.search_icon} className="w-4 invert opacity-80" alt="Search" />
            </button>

            {/* Profile Menu */}
            <div className="group relative hidden sm:block">
              <button
                onClick={() => !token && navigate('/login')}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white"
                aria-label="Account"
              >
                <img src={assets.profile_icon} className="w-4 invert opacity-80" alt="Profile" />
              </button>

              {token && (
                <div className="absolute right-0 top-full hidden pt-3 group-hover:block">
                  <div className="w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 p-1.5 shadow-2xl backdrop-blur-2xl">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
                    >
                      My Orders
                    </button>
                    <div className="my-1 border-t border-neutral-800" />
                    <button
                      onClick={logout}
                      className="w-full rounded-lg px-4 py-2.5 text-left text-xs font-medium text-rose-400 transition hover:bg-rose-500/10"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 transition hover:border-amber-400/40 hover:bg-neutral-800 hover:text-white"
            >
              <img src={assets.cart_icon} className="w-4 invert opacity-80" alt="Cart" />
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[10px] font-bold text-black shadow-lg shadow-amber-400/20">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setVisible(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/50 text-neutral-300 sm:hidden"
            >
              <img src={assets.menu_icon} className="w-5 invert" alt="Menu" />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-md sm:hidden"
        />
      )}

      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[80%] max-w-sm border-l border-neutral-800 bg-neutral-950 p-6 shadow-2xl transition-transform duration-300 sm:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 pb-5">
          <img src={assets.logo} className="w-28 invert" alt="Store Logo" />
          <button
            onClick={() => setVisible(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 text-neutral-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {['/', '/collection', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()
            return (
              <NavLink
                key={path}
                onClick={() => setVisible(false)}
                to={path}
                className={({ isActive }) =>
                  `flex items-center justify-between rounded-xl border px-5 py-3.5 text-xs font-semibold tracking-widest transition ${
                    isActive
                      ? 'border-amber-400/40 bg-amber-400/10 text-amber-400'
                      : 'border-neutral-900 bg-neutral-900/40 text-neutral-400 hover:border-neutral-800 hover:text-white'
                  }`
                }
              >
                <span>{label}</span>
                <span className="opacity-40">→</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 pt-4 border-t border-neutral-800">
          {token ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setVisible(false)
                  navigate('/orders')
                }}
                className="w-full rounded-xl border border-neutral-800 bg-neutral-900 py-3 text-xs font-semibold text-neutral-200 transition hover:bg-neutral-800"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  setVisible(false)
                  logout()
                }}
                className="w-full rounded-xl bg-amber-400 py-3 text-xs font-bold text-black transition hover:bg-amber-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
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
      </div>
    </>
  )
}

export default Navbar