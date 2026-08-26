import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const benefits = [
  {
    number: '01',
    title: 'Quality assurance',
    description:
      'We carefully select every product to ensure it meets our standards for quality, comfort, and lasting style.',
  },
  {
    number: '02',
    title: 'Easy shopping',
    description:
      'A simple, intuitive experience makes it easy to discover what you love and check out with confidence.',
  },
  {
    number: '03',
    title: 'Customer first',
    description:
      'Our dedicated support team is always ready to help, from your first browse through delivery and beyond.',
  },
]

const About = () => {
  return (
    <main className="border-t border-stone-200 pt-10 dark:border-stone-800 sm:pt-14">
      <section>
        <div className="text-center">
          <div className="text-2xl sm:text-3xl">
            <Title text1="ABOUT" text2="US" />
          </div>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-stone-600 sm:text-base dark:text-stone-400">
            Thoughtful pieces, effortless shopping, and style that feels like
            you.
          </p>
        </div>

        <div className="my-12 grid items-center gap-10 md:my-16 md:grid-cols-2 md:gap-16">
          <div className="overflow-hidden rounded-3xl bg-stone-100 dark:bg-stone-900">
            <img
              src={assets.about_img}
              alt="Fashion collection from Dreams Clothing"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-amber-700 dark:text-amber-400">
              OUR STORY
            </p>

            <h1 className="prata-regular mt-4 text-3xl leading-tight text-stone-950 sm:text-4xl dark:text-white">
              Style should feel
              <span className="block italic text-amber-700 dark:text-amber-400">
                effortless.
              </span>
            </h1>

            <div className="mt-6 space-y-4 text-sm leading-7 text-stone-600 sm:text-base dark:text-stone-400">
              <p>
                Dreams Clothing was born from a love of great style and a
                belief that shopping for it should be simple, enjoyable, and
                personal.
              </p>

              <p>
                We curate versatile, high-quality pieces that help you build a
                wardrobe you will reach for again and again—whether you are
                dressing for everyday life or something memorable.
              </p>
            </div>

            <div className="mt-8 border-l-2 border-amber-600 pl-5 dark:border-amber-400">
              <h2 className="font-semibold text-stone-950 dark:text-white">
                Our mission
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-400">
                To give every customer choice, convenience, and confidence at
                every step of their shopping journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16 sm:mb-20">
        <div className="mb-8 text-center sm:mb-10">
          <div className="text-2xl sm:text-3xl">
            <Title text1="WHY" text2="CHOOSE US" />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article
              key={benefit.number}
              className="rounded-2xl border border-stone-200 bg-stone-50 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-950"
            >
              <p className="text-xs font-bold tracking-[0.18em] text-amber-700 dark:text-amber-400">
                {benefit.number}
              </p>

              <h2 className="mt-5 text-lg font-semibold text-stone-950 dark:text-white">
                {benefit.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
                {benefit.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <NewsletterBox />
    </main>
  )
}

export default About