import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <main className="w-full bg-white">

      {/* Hero Section */}
      <section className="overflow-hidden rounded-2xl sm:rounded-3xl">
        <Hero />
      </section>

      {/* Latest Collection */}
      <section className="mt-16 sm:mt-20 lg:mt-24">
        <div className="mx-auto max-w-7xl">
          <LatestCollection />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="mt-16 bg-gray-50 py-16 sm:mt-20 sm:py-20 lg:mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <BestSeller />
        </div>
      </section>

      {/* Our Policy */}
      <section className="mt-16 sm:mt-20 lg:mt-24">
        <div className="mx-auto max-w-7xl rounded-3xl bg-white px-4 py-12 shadow-sm ring-1 ring-gray-100 sm:px-8 sm:py-16">
          <OurPolicy />
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-16 pb-16 sm:mt-20 sm:pb-24 lg:mt-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gray-900 px-5 py-12 sm:px-10 sm:py-16">
          <NewsletterBox />
        </div>
      </section>

    </main>
  )
}

export default Home