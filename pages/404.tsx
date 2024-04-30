import Link from "next/link"

export default function Page() {
  return (
    <main className="content h-screen flex flex-1 flex-col items-center justify-center py-12 text-center md:py-16 lg:py-20">
      <h1 className="mb-3 text-3xl font-extrabold sm:mb-4 sm:text-4xl">
        Oops
      </h1>
      <p className="mb-6 text-lg  sm:text-xl">
        The page you are looking for doesn’t exist.
      </p>
      <Link
        className="focusable flex w-full flex-none cursor-pointer items-center justify-center gap-2 rounded-md bg-primary-500 py-2 px-4 font-medium text-blue-500 shadow-lg shadow-primary-500/10 transition hover:bg-primary-500/80 hover:shadow-primary-500/5   dark:hover:bg-primary-400/80 dark:hover:shadow-primary-400/5 sm:w-auto"
        href="/"
      >
        Return to home page
      </Link>
    </main>
  )
}