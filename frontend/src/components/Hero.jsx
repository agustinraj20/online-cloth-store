import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <section className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-950">
      <div className="grid min-h-[520px] md:grid-cols-2">
        {/* Content */}
        <div className="order-2 flex items-center px-6 py-12 sm:px-10 md:order-1 md:px-14 lg:px-20">
          <div className="max-w-xl">
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-stone-600 dark:text-stone-400">
              <span className="h-px w-10 bg-stone-500 dark:bg-stone-500" />
              NEW SEASON
            </div>

            <h1 className="prata-regular text-4xl leading-tight text-stone-950 sm:text-5xl md:text-5xl lg:text-6xl dark:text-white">
              Style made for
              <span className="block italic text-amber-700 dark:text-amber-400">
                every moment.
              </span>
            </h1>

            <p className="mt-5 max-w-md text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
              Discover new arrivals, timeless essentials, and the pieces your
              wardrobe has been waiting for.
            </p>

            <Link
              to="/collection"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-stone-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400 dark:focus:ring-offset-stone-950"
            >
              Shop new arrivals
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="order-1 min-h-[330px] overflow-hidden md:order-2 md:min-h-full">
          <img
            className="h-full w-full object-cover object-center transition duration-700 hover:scale-105"
            src={assets.hero_img}
            alt="Model wearing clothing from the latest collection"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero