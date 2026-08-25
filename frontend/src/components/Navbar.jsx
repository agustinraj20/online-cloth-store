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
    `relative flex flex-col items-center gap-1 text-[13px] font-semibold tracking-wider transition-colors duration-300 ${
      isActive ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'
    }`

  return (
    <>
      {/* Navbar Container */}
      <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-md transition-all">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={assets.logo}
              className="w-28 transition-transform duration-300 hover:scale-[1.03] sm:w-36"
              alt="Store Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-8 lg:gap-12">

              <NavLink to="/" className={navLinkClass}>
                <span>HOME</span>
                <span className="absolute -bottom-1.5 h-[2px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </NavLink>

              <NavLink to="/collection" className={navLinkClass}>
                <span>COLLECTION</span>
                <span className="absolute -bottom-1.5 h-[2px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                <span>ABOUT</span>
                <span className="absolute -bottom-1.5 h-[2px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                <span>CONTACT</span>
                <span className="absolute -bottom-1.5 h-[2px] w-0 bg-slate-900 transition-all duration-300 group-hover:w-full" />
              </NavLink>

            </ul>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 sm:gap-6">

            {/* Search */}
            <button
              onClick={() => {
                setShowSearch(true)
                navigate('/collection')
              }}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
              aria-label="Search"
            >
              <img
                src={assets.search_icon}
                className="w-4 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                alt="Search"
              />
            </button>

            {/* Profile Dropdown */}
            <div className="group relative hidden sm:block">
              <button
                onClick={() => !token && navigate('/login')}
                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
                aria-label="Account"
              >
                <img
                  src={assets.profile_icon}
                  className="w-4 cursor-pointer opacity-80 transition-opacity hover:opacity-100"
                  alt="Profile"
                />
              </button>

              {token && (
                <div className="absolute right-0 top-full hidden pt-2 group-hover:block">
                  <div className="w-48 overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-1.5 shadow-xl shadow-slate-900/10 backdrop-blur-md">
                    <button
                      onClick={() => navigate('/profile')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
                    >
                      My Orders
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      onClick={logout}
                      className="w-full rounded-xl px-4 py-2.5 text-left text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon with Pulse Badge */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all duration-200 hover:bg-slate-100 active:scale-95"
            >
              <img
                src={assets.cart_icon}
                className="w-4 min-w-4 opacity-80 transition-opacity hover:opacity-100"
                alt="Cart"
              />
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-900 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setVisible(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition-all duration-200 hover:bg-slate-100 sm:hidden"
            >
              <img
                src={assets.menu_icon}
                className="w-5"
                alt="Menu"
              />
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Backdrop */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-[72px] items-center justify-between border-b border-slate-100 px-6">
          <img src={assets.logo} className="w-28" alt="Store Logo" />
          <button
            onClick={() => setVisible(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-lg text-slate-500 transition hover:bg-slate-200 hover:text-slate-900"
          >
            ×
          </button>
        </div>

        <nav className="p-4">
          {['/', '/collection', '/about', '/contact'].map((path) => {
            const label = path === '/' ? 'HOME' : path.replace('/', '').toUpperCase()
            return (
              <NavLink
                key={path}
                onClick={() => setVisible(false)}
                to={path}
                className={({ isActive }) =>
                  `mb-1.5 flex items-center justify-between rounded-xl px-4 py-3 text-xs font-semibold tracking-wider transition ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                <span>{label}</span>
                <span className="opacity-40">→</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Mobile Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-slate-100 p-6 bg-slate-50/50">
          {token ? (
            <div className="space-y-2">
              <button
                onClick={() => {
                  setVisible(false)
                  navigate('/orders')
                }}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                My Orders
              </button>
              <button
                onClick={() => {
                  setVisible(false)
                  logout()
                }}
                className="w-full rounded-xl bg-slate-900 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
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
              className="w-full rounded-xl bg-slate-900 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
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