import Link from 'next/link'

import Spinner from '@/components/Spinner'

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <p>scrape-faster</p>
          <Link
            href="/"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            new
          </Link>
          <Link
            href="/scrapes"
            className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
          >
            scrapes
          </Link>
        </div>
      </nav>
      <div className="flex-1 flex flex-col max-w-2xl w-full px-3">
        <main className="flex-1 flex flex-col mb-10">
          <Spinner />
        </main>
      </div>
    </div>
  );
}
