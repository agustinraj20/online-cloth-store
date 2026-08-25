import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <main className="w-full bg-[#0d0f12] text-neutral-100 selection:bg-amber-400 selection:text-black">

      {/* Hero Section */}
      <section className="relative mx-auto max-w-[1536px] px-3 pt-3 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-2xl">
          <Hero />
        </div>
      </section>

      {/* Latest Collection */}
      <section className="mx-auto max-w-7xl px-4 mt-24 sm:mt-32 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-amber-500/5 blur-[120px]" />
          <LatestCollection />
        </div>
      </section>

      {/* Best Sellers with Dark Grid Texture */}
      <section className="relative mt-24 border-y border-neutral-800/80 bg-neutral-900/40 py-24 sm:mt-32 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BestSeller />
        </div>
      </section>

      {/* Our Policy */}
      <section className="mx-auto max-w-7xl px-4 mt-24 sm:mt-32 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-neutral-800/80 bg-gradient-to-b from-neutral-900/80 to-neutral-950 p-8 sm:p-14 shadow-2xl backdrop-blur-xl">
          <OurPolicy />
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 my-24 sm:my-32 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 px-6 py-16 sm:px-14 sm:py-20 shadow-2xl">
          <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[100px]" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <NewsletterBox />
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home