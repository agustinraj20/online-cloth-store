import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ShopContext } from '../context/ShopContext'

const Login = () => {
  const [currentState, setCurrentState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token, navigate])

  const switchMode = () => {
    setCurrentState((current) =>
      current === 'Login' ? 'Sign Up' : 'Login'
    )
    setPassword('')
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    if (isSubmitting) return

    try {
      setIsSubmitting(true)

      const endpoint =
        currentState === 'Sign Up'
          ? `${backendUrl}/api/user/register`
          : `${backendUrl}/api/user/login`

      const payload =
        currentState === 'Sign Up'
          ? { name, email, password }
          : { email, password }

      const response = await axios.post(endpoint, payload)

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
        toast.success(
          currentState === 'Login'
            ? 'Welcome back!'
            : 'Your account has been created!'
        )
      } else {
        toast.error(response.data.message || 'Something went wrong.')
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Unable to connect. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const isLogin = currentState === 'Login'

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-stone-50 px-4 py-12 dark:bg-[#0d0f12] sm:py-16">
      <section className="w-full max-w-md overflow-hidden rounded-3xl border border-stone-200 bg-white p-6 shadow-xl shadow-stone-200/50 dark:border-stone-800 dark:bg-stone-950 dark:shadow-black/20 sm:p-9">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-amber-700 dark:text-amber-400">
            DREAMS CLOTHING
          </p>

          <h1 className="prata-regular mt-3 text-3xl text-stone-950 dark:text-white">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h1>

          <p className="mt-3 text-sm leading-6 text-stone-600 dark:text-stone-400">
            {isLogin
              ? 'Sign in to view your orders and continue shopping.'
              : 'Join us for exclusive arrivals, offers, and easy checkout.'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="mt-8 space-y-4">
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
              >
                Full name
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
                autoComplete="name"
                required
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
              />
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              minLength="6"
              required
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-950 outline-none transition placeholder:text-stone-400 focus:border-amber-600 focus:ring-2 focus:ring-amber-200 dark:border-stone-700 dark:bg-stone-900 dark:text-white dark:focus:ring-amber-900"
            />
          </div>

          {isLogin && (
            <button
              type="button"
              onClick={() =>
                toast.info('Please contact support to reset your password.')
              }
              className="text-sm font-medium text-amber-700 transition hover:text-amber-500 dark:text-amber-400"
            >
              Forgot your password?
            </button>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-stone-950 px-6 py-3.5 text-sm font-bold tracking-wider text-white transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-stone-950 dark:hover:bg-amber-400 dark:focus:ring-offset-stone-950"
          >
            {isSubmitting
              ? 'PLEASE WAIT...'
              : isLogin
                ? 'SIGN IN'
                : 'CREATE ACCOUNT'}
          </button>
        </form>

        <div className="mt-7 border-t border-stone-200 pt-6 text-center text-sm text-stone-600 dark:border-stone-800 dark:text-stone-400">
          {isLogin ? 'New to Dreams Clothing?' : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={switchMode}
            className="font-semibold text-amber-700 transition hover:text-amber-500 dark:text-amber-400"
          >
            {isLogin ? 'Create an account' : 'Sign in'}
          </button>
        </div>
      </section>
    </main>
  )
}

export default Login