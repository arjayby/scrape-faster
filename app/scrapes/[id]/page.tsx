import Link from 'next/link'
import { notFound } from 'next/navigation'

import FormReadOnly from '@/components/FormReadOnly'
import { FormReadOnlySchemaType } from '@/lib/validation'

export type ScrapeDetailsType = {
  id: string;
  created_at: string;
} & FormReadOnlySchemaType;

async function fetchScrapeDetails(
  id: string
): Promise<{ data: ScrapeDetailsType } | undefined> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrapes/${id}`);

  if (!res.ok) return undefined;

  return res.json();
}

export default async function ScrapeDetails({
  params,
}: {
  params: { id: string };
}) {
  const scrapeDetails = await fetchScrapeDetails(params.id);

  if (!scrapeDetails) notFound();

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
        <main className="flex-1 flex flex-col mb-10">
          <FormReadOnly {...scrapeDetails.data} />
        </main>
      </div>
    </div>
  );
}
