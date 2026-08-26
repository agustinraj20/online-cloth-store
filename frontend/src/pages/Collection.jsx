import { useContext, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const categories = ['Men', 'Women', 'Kids']
const productTypes = ['Topwear', 'Bottomwear', 'Winterwear']

const Collection = () => {
  const { products = [], search, showSearch } = useContext(ShopContext)

  const [showFilter, setShowFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  const toggleFilter = (value, setFilter) => {
    setFilter((currentFilter) =>
      currentFilter.includes(value)
        ? currentFilter.filter((item) => item !== value)
        : [...currentFilter, value]
    )
  }

  const clearFilters = () => {
    setCategory([])
    setSubCategory([])
    setSortType('relevant')
  }

  const filteredProducts = useMemo(() => {
    let result = [...products]

    if (showSearch && search.trim()) {
      const searchTerm = search.toLowerCase().trim()

      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.category.toLowerCase().includes(searchTerm) ||
          item.subCategory.toLowerCase().includes(searchTerm)
      )
    }

    if (category.length) {
      result = result.filter((item) => category.includes(item.category))
    }

    if (subCategory.length) {
      result = result.filter((item) => subCategory.includes(item.subCategory))
    }

    if (sortType === 'low-high') {
      result.sort((a, b) => a.price - b.price)
    }

    if (sortType === 'high-low') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, search, showSearch, category, subCategory, sortType])

  const activeFilterCount = category.length + subCategory.length

  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <div className="mb-8 text-center sm:mb-12">
        <div className="text-2xl sm:text-3xl">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        <p className="mx-auto mt-2 max-w-xl text-sm text-stone-600 dark:text-stone-400">
          Discover pieces designed to fit your style, your plans, and your
          everyday life.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
        {/* Filters */}
        <aside className="w-full shrink-0 lg:w-60">
          <div className="flex items-center justify-between lg:hidden">
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 text-sm font-semibold text-stone-950 dark:text-white"
              aria-expanded={showFilter}
            >
              FILTERS
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] text-stone-950">
                  {activeFilterCount}
                </span>
              )}
              <span
                className={`text-lg transition-transform ${
                  showFilter ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              >
                ⌄
              </span>
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs font-semibold text-amber-700 dark:text-amber-400"
              >
                CLEAR ALL
              </button>
            )}
          </div>

          <div
            className={`space-y-4 ${
              showFilter ? 'mt-4 block' : 'hidden'
            } lg:mt-0 lg:block`}
          >
            <div className="hidden items-center justify-between lg:flex">
              <p className="text-sm font-semibold tracking-wide text-stone-950 dark:text-white">
                FILTERS
              </p>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-amber-700 transition hover:text-amber-500 dark:text-amber-400"
                >
                  CLEAR
                </button>
              )}
            </div>

            <fieldset className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950">
              <legend className="px-1 text-xs font-bold tracking-[0.14em] text-stone-950 dark:text-white">
                CATEGORY
              </legend>

              <div className="mt-4 space-y-3">
                {categories.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 text-sm text-stone-600 dark:text-stone-400"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={category.includes(item)}
                      onChange={() => toggleFilter(item, setCategory)}
                      className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 dark:border-stone-700"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="rounded-2xl border border-stone-200 bg-stone-50 p-5 dark:border-stone-800 dark:bg-stone-950">
              <legend className="px-1 text-xs font-bold tracking-[0.14em] text-stone-950 dark:text-white">
                TYPE
              </legend>

              <div className="mt-4 space-y-3">
                {productTypes.map((item) => (
                  <label
                    key={item}
                    className="flex cursor-pointer items-center gap-3 text-sm text-stone-600 dark:text-stone-400"
                  >
                    <input
                      type="checkbox"
                      value={item}
                      checked={subCategory.includes(item)}
                      onChange={() => toggleFilter(item, setSubCategory)}
                      className="h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500 dark:border-stone-700"
                    />
                    {item}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
        </aside>

        {/* Products */}
        <section className="min-w-0 flex-1">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-stone-600 dark:text-stone-400">
              <span className="font-semibold text-stone-950 dark:text-white">
                {filteredProducts.length}
              </span>{' '}
              products found
            </p>

            <label className="flex items-center gap-3 text-xs font-semibold tracking-wide text-stone-600 dark:text-stone-400">
              SORT BY
              <select
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
                className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-950 outline-none transition focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
              >
                <option value="relevant">Featured</option>
                <option value="low-high">Price: Low to high</option>
                <option value="high-low">Price: High to low</option>
              </select>
            </label>
          </div>

          {filteredProducts.length ? (
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filteredProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-stone-300 bg-stone-50 px-6 py-16 text-center dark:border-stone-700 dark:bg-stone-950">
              <h2 className="text-lg font-semibold text-stone-950 dark:text-white">
                No products found
              </h2>

              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                Try changing your search or removing some filters.
              </p>

              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-stone-950 px-5 py-2.5 text-xs font-bold tracking-wider text-white transition hover:bg-amber-700 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400"
                >
                  CLEAR FILTERS
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default Collection