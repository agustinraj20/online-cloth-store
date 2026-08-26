import { assets } from '../assets/assets'

const policies = [
  {
    icon: assets.exchange_icon,
    title: 'Easy exchanges',
    description: 'Hassle-free exchanges when your fit is not quite right.',
    alt: 'Exchange icon',
  },
  {
    icon: assets.quality_icon,
    title: '7-day returns',
    description: 'Return eligible items within seven days at no extra cost.',
    alt: 'Quality assurance icon',
  },
  {
    icon: assets.support_img,
    title: 'Always here to help',
    description: 'Friendly customer support, available whenever you need us.',
    alt: 'Customer support icon',
  },
]

const OurPolicy = () => {
  return (
    <section
      aria-label="Shopping benefits"
      className="my-14 grid gap-4 sm:my-20 sm:grid-cols-3 sm:gap-5"
    >
      {policies.map((policy) => (
        <article
          key={policy.title}
          className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-stone-800 dark:bg-stone-950"
        >
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950">
            <img
              src={policy.icon}
              className="h-7 w-7 object-contain dark:brightness-0 dark:invert"
              alt={policy.alt}
              loading="lazy"
            />
          </div>

          <h3 className="text-base font-semibold text-stone-950 dark:text-white">
            {policy.title}
          </h3>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-stone-600 dark:text-stone-400">
            {policy.description}
          </p>
        </article>
      ))}
    </section>
  )
}

export default OurPolicy