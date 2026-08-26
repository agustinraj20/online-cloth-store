import { useState } from 'react'

const NewsletterBox = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const onSubmitHandler = (event) => {
    event.preventDefault()
    setIsSubscribed(true)
    setEmail('')
  }

  return (
    <section className="my-14 overflow-hidden rounded-3xl bg-stone-950 px-5 py-12 text-center sm:my-20 sm:px-10 sm:py-16 dark:bg-amber-950">
      <p className="text-xs font-semibold tracking-[0.2em] text-amber-400">
        MEMBERS ONLY
      </p>

      <h2 className="prata-regular mt-3 text-3xl text-white sm:text-4xl">
        Subscribe & get 20% off
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-stone-300 sm:text-base">
        Join our community for early access to new collections, exclusive offers,
        and style inspiration.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>

        <input
          id="newsletter-email"
          className="min-h-12 w-full rounded-full border border-stone-700 bg-white px-5 text-sm text-stone-950 outline-none transition placeholder:text-stone-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-400"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email address"
          autoComplete="email"
          required
        />

        <button
          type="submit"
          className="min-h-12 rounded-full bg-amber-500 px-7 text-xs font-bold tracking-wider text-stone-950 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-stone-950"
        >
          SUBSCRIBE
        </button>
      </form>

      {isSubscribed && (
        <p className="mt-4 text-sm text-emerald-300" role="status">
          Thanks for subscribing—your discount is on its way!
        </p>
      )}
    </section>
  )
}

export default NewsletterBox