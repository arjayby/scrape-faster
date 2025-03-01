import Link from 'next/link'

import Card from '@/components/Card'

import { ScrapeDetailsType } from './[id]/page'

export const revalidate = 60;

async function fetchScrapes(): Promise<
  { data: ScrapeDetailsType[] } | undefined
> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrapes`);

  return res.json();
}

export default async function Scrapes() {
  if (!process.env.NEXT_PUBLIC_API_URL) return;

  const scrapes = await fetchScrapes();

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
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
      <div className="flex-1 flex flex-col gap-10 max-w-2xl w-full px-3">
        <main className="flex-1 flex flex-col mb-10 gap-10">
          {scrapes?.data.map((scrape) => (
            <Card key={scrape.id} {...scrape} />
          ))}
        </main>
      </div>
    </div>
  );
}
