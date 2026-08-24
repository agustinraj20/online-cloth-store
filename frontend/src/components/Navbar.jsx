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
    `relative flex flex-col items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
      isActive ? 'text-black' : 'text-gray-500 hover:text-black'
    }`

  return (
    <>
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

          {/* Logo */}
          <Link to="/" className="shrink-0">
            <img
              src={assets.logo}
              className="w-32 transition-transform duration-300 hover:scale-[1.02] sm:w-36"
              alt="Store Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-7 lg:gap-10">

              <NavLink to="/" className={navLinkClass}>
                <span>HOME</span>
                <span className="absolute -bottom-2 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </NavLink>

              <NavLink to="/collection" className={navLinkClass}>
                <span>COLLECTION</span>
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                <span>ABOUT</span>
              </NavLink>

              <NavLink to="/contact" className={navLinkClass}>
                <span>CONTACT</span>
              </NavLink>

            </ul>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5 sm:gap-6">

            {/* Search */}
            <button
              onClick={() => {
                setShowSearch(true)
                navigate('/collection')
              }}
              className="transition-transform duration-200 hover:scale-110"
            >
              <img
                src={assets.search_icon}
                className="w-5 cursor-pointer"
                alt="Search"
              />
            </button>

            {/* Profile */}
            <div className="group relative hidden sm:block">
              <button
                onClick={() => !token && navigate('/login')}
                className="transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={assets.profile_icon}
                  className="w-5 cursor-pointer"
                  alt="Profile"
                />
              </button>

              {/* Profile Dropdown */}
              {token && (
                <div className="absolute right-0 top-full hidden pt-4 group-hover:block">
                  <div className="w-44 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">

                    <button
                      className="w-full rounded-lg px-4 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                    >
                      My Profile
                    </button>

                    <button
                      onClick={() => navigate('/orders')}
                      className="w-full rounded-lg px-4 py-3 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-black"
                    >
                      My Orders
                    </button>

                    <div className="my-1 border-t border-gray-100" />

                    <button
                      onClick={logout}
                      className="w-full rounded-lg px-4 py-3 text-left text-sm text-red-500 transition hover:bg-red-50"
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
              className="group relative transition-transform duration-200 hover:scale-110"
            >
              <img
                src={assets.cart_icon}
                className="w-5 min-w-5"
                alt="Cart"
              />

              <span className="absolute -right-2.5 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[9px] font-medium text-white">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setVisible(true)}
              className="sm:hidden transition-transform duration-200 hover:scale-110"
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

      {/* Mobile Menu Backdrop */}
      {visible && (
        <div
          onClick={() => setVisible(false)}
          className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm sm:hidden"
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed right-0 top-0 z-[70] h-full w-[82%] max-w-sm bg-white shadow-2xl transition-transform duration-300 sm:hidden ${
          visible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >

        {/* Mobile Header */}
        <div className="flex h-[72px] items-center justify-between border-b border-gray-100 px-5">

          <img
            src={assets.logo}
            className="w-28"
            alt="Store Logo"
          />

          <button
            onClick={() => setVisible(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200"
          >
            ×
          </button>

        </div>

        {/* Mobile Navigation */}
        <nav className="px-4 py-6">

          <NavLink
            onClick={() => setVisible(false)}
            to="/"
            className={({ isActive }) =>
              `mb-2 flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium tracking-wide transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`
            }
          >
            HOME
            <span>→</span>
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            to="/collection"
            className={({ isActive }) =>
              `mb-2 flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium tracking-wide transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`
            }
          >
            COLLECTION
            <span>→</span>
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            to="/about"
            className={({ isActive }) =>
              `mb-2 flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium tracking-wide transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`
            }
          >
            ABOUT
            <span>→</span>
          </NavLink>

          <NavLink
            onClick={() => setVisible(false)}
            to="/contact"
            className={({ isActive }) =>
              `flex items-center justify-between rounded-xl px-5 py-4 text-sm font-medium tracking-wide transition ${
                isActive
                  ? 'bg-black text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-black'
              }`
            }
          >
            CONTACT
            <span>→</span>
          </NavLink>

        </nav>

        {/* Mobile Account */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 p-5">

          {token ? (
            <>
              <button
                onClick={() => navigate('/orders')}
                className="mb-3 w-full rounded-xl border border-gray-200 py-3 text-sm font-medium transition hover:bg-gray-50"
              >
                My Orders
              </button>

              <button
                onClick={logout}
                className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setVisible(false)
                navigate('/login')
              }}
              className="w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-800"
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