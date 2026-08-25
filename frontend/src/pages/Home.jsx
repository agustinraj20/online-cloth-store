import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <main className="w-full bg-slate-50/50 text-slate-800 antialiased">

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
          <Hero />
        </div>
      </section>

      {/* Latest Collection */}
      <section className="mx-auto max-w-7xl px-4 mt-20 sm:mt-28 sm:px-6 lg:px-8">
        <LatestCollection />
      </section>

      {/* Best Sellers */}
      <section className="relative mt-20 bg-gradient-to-b from-slate-100/80 via-slate-50 to-white py-20 sm:mt-28 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BestSeller />
        </div>
      </section>

      {/* Our Policy */}
      <section className="mx-auto max-w-7xl px-4 mt-20 sm:mt-28 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white/80 p-8 sm:p-12 backdrop-blur-md shadow-lg shadow-slate-100 ring-1 ring-slate-200/60">
          <OurPolicy />
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 my-20 sm:my-28 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16 sm:px-12 sm:py-20 shadow-2xl">
          {/* Subtle Ambient Glow Effect */}
          <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
          <div className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
          
          <div className="relative z-10 mx-auto max-w-3xl">
            <NewsletterBox />
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home