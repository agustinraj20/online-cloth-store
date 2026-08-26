const Title = ({ text1, text2 }) => {
  return (
    <div className="mb-3 inline-flex items-center gap-3">
      <h2 className="text-lg font-light tracking-[0.08em] text-stone-500 sm:text-xl dark:text-stone-400">
        {text1}{' '}
        <span className="font-semibold text-stone-950 dark:text-white">
          {text2}
        </span>
      </h2>

      <span
        aria-hidden="true"
        className="h-px w-8 bg-amber-700 sm:w-12 dark:bg-amber-400"
      />
    </div>
  )
}

export default Title