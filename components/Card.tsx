import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'

import { ScrapeDetailsType } from '@/app/scrapes/[id]/page'

export default function Card({ id, url, created_at }: ScrapeDetailsType) {
  return (
    <Link
      href={`/scrapes/${id}`}
      className="relative block overflow-hidden rounded-lg border border-gray-100 hover:border-indigo-500 p-4 sm:p-6 lg:p-8"
    >
      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-white sm:text-xl">{id}</h3>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-pretty text-sm text-gray-500">{url}</p>
      </div>
      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dd className="text-xs text-gray-500">
            {formatDistanceToNow(created_at)}
          </dd>
        </div>
      </dl>
    </Link>
  );
}
