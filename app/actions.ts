"use server";

import { revalidatePath } from 'next/cache'

import { FormSchemaType } from '@/lib/validation'

export async function newScrape(data: FormSchemaType) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scrapes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) return undefined;

  revalidatePath("/scrapes");

  return response.json();
}
