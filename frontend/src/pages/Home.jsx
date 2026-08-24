import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Latest Collection */}
      <section className="mt-16 sm:mt-20">
        <LatestCollection />
      </section>

      {/* Best Sellers */}
      <section className="mt-16 sm:mt-20">
        <BestSeller />
      </section>

      {/* Our Policy */}
      <section className="mt-16 sm:mt-24">
        <OurPolicy />
      </section>

      {/* Newsletter */}
      <section className="mt-16 sm:mt-24 pb-16">
        <NewsletterBox />
      </section>

    </div>
  )
}

export default Home