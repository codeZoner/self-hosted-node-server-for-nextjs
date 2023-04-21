import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <><div>Navigated to our Internal Page</div>
            <Link href="/">
          <a className="absolute z-10 flex place-items-center gap-2 p-8 bg-white rounded-full shadow-lg dark:bg-zinc-800/30">
            <span className="text-2xl font-bold">Go back to Home Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" focusable="false" role="img"
            >
              <path fillRule="evenodd" d="M4.293 7.293a1 1 0 011.414 0L10 11.586l4.293-4.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </Link>
    </>
  )
}
