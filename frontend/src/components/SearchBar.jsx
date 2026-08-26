import { useContext, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)

  const location = useLocation()
  const searchInputRef = useRef(null)
  const isCollectionPage = location.pathname.includes('/collection')

  useEffect(() => {
    if (showSearch && isCollectionPage) {
      searchInputRef.current?.focus()
    }
  }, [showSearch, isCollectionPage])

  if (!showSearch || !isCollectionPage) return null

  return (
    <section className="border-y border-stone-200 bg-stone-50 px-4 py-4 dark:border-stone-800 dark:bg-stone-950">
      <form
        role="search"
        className="mx-auto flex max-w-2xl items-center gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label htmlFor="product-search" className="sr-only">
          Search products
        </label>

        <div className="flex min-h-12 flex-1 items-center rounded-full border border-stone-300 bg-white px-4 transition focus-within:border-amber-600 focus-within:ring-2 focus-within:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:focus-within:ring-amber-900">
          <img
            className="mr-3 h-4 w-4 opacity-60 dark:invert"
            src={assets.search_icon}
            alt=""
          />

          <input
            ref={searchInputRef}
            id="product-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent text-sm text-stone-950 outline-none placeholder:text-stone-400 dark:text-white"
            placeholder="Search by name, category, or style"
            autoComplete="off"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="ml-2 text-xs font-medium text-stone-500 hover:text-stone-950 dark:hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setShowSearch(false)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition hover:bg-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:hover:bg-stone-800"
          aria-label="Close search"
        >
          <img
            className="h-3.5 w-3.5 dark:invert"
            src={assets.cross_icon}
            alt=""
          />
        </button>
      </form>
    </section>
  )
}

export default SearchBar