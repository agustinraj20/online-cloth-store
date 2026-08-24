import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className="w-full bg-white">

      {/* Hero */}
      <section className="mb-20">
        <Hero />
      </section>

      {/* Latest Collection */}
      <section className="mb-24">
        <LatestCollection />
      </section>

      {/* Best Sellers */}
      <section className="mb-24">
        <BestSeller />
      </section>

      {/* Store Policy */}
      <section className="mb-24 rounded-3xl bg-gray-50 py-12 px-4 sm:px-8">
        <OurPolicy />
      </section>

      {/* Newsletter */}
      <section className="mb-20">
        <NewsletterBox />
      </section>

    </div>
  )
}

export default Home