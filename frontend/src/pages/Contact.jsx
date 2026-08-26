import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <section>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl">
            <Title text1="CONTACT" text2="US" />
          </div>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
            Have a question, need help with an order, or simply want to say
            hello? We would love to hear from you.
          </p>
        </div>

        <div className="my-12 grid items-center gap-10 md:my-16 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-900">
            <img
              src={assets.contact_img}
              alt="Dreams Clothing customer support"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-950">
              <p className="text-xs font-bold tracking-[0.16em] text-amber-700 dark:text-amber-400">
                VISIT US
              </p>

              <h1 className="mt-3 text-lg font-semibold text-stone-950 dark:text-white">
                Our store
              </h1>

              <address className="mt-3 not-italic text-sm leading-6 text-stone-600 dark:text-stone-400">
                Near Power Plaza
                <br />
                Chennai, Tamil Nadu, India
              </address>
            </article>

            <article className="rounded-2xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-950">
              <p className="text-xs font-bold tracking-[0.16em] text-amber-700 dark:text-amber-400">
                GET IN TOUCH
              </p>

              <h2 className="mt-3 text-lg font-semibold text-stone-950 dark:text-white">
                Customer support
              </h2>

              <div className="mt-3 space-y-2 text-sm">
                <a
                  href="tel:+918489350439"
                  className="block text-stone-600 transition hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
                >
                  +91 84893 50439
                </a>

                <a
                  href="mailto:agustinraj20@gmail.com"
                  className="block break-all text-stone-600 transition hover:text-amber-700 dark:text-stone-400 dark:hover:text-amber-400"
                >
                  agustinraj20@gmail.com
                </a>
              </div>
            </article>

            <article className="rounded-2xl bg-stone-950 p-6 text-white dark:bg-amber-950">
              <p className="text-xs font-bold tracking-[0.16em] text-amber-400">
                JOIN THE TEAM
              </p>

              <h2 className="mt-3 text-lg font-semibold">
                Careers at Dreams Clothing
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-300">
                Interested in working with us? Send us your résumé and tell us
                why you would be a great fit.
              </p>

              <a
                href="mailto:agustinraj20@gmail.com?subject=Career%20Application%20-%20Dreams%20Clothing"
                className="mt-5 inline-flex rounded-full bg-amber-500 px-5 py-2.5 text-xs font-bold tracking-wider text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-950"
              >
                EXPLORE JOBS
              </a>
            </article>
          </div>
        </div>
      </section>

      <NewsletterBox />
    </main>
  )
}

export default Contact