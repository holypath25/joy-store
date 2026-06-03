'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main>
      <h2>Something went wrong</h2>
      <p>An unexpected error occurred. Please try again.</p>
      <button onClick={() => unstable_retry()}>Try again</button>
    </main>
  )
}
