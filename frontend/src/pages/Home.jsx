import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <main className="min-h-screen bg-white text-stone-950 selection:bg-amber-400 selection:text-stone-950 dark:bg-[#0d0f12] dark:text-stone-100">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 sm:pt-8 lg:px-8">
        <Hero />
      </section>

      {/* Latest collection */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-amber-500/10 blur-[120px] dark:bg-amber-500/5"
        />
        <div className="relative">
          <LatestCollection />
        </div>
      </section>

      {/* Best sellers */}
      <section className="relative overflow-hidden border-y border-stone-200 bg-stone-100 py-10 dark:border-stone-800 dark:bg-stone-900/40 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d6d3d1_1px,transparent_1px)] [background-size:16px_16px] opacity-40 dark:bg-[radial-gradient(#262626_1px,transparent_1px)] dark:opacity-30"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BestSeller />
        </div>
      </section>

      {/* Shopping benefits */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <OurPolicy />
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <NewsletterBox />
      </section>
    </main>
  )
}

export default Home