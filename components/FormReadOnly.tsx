"use client";

import { useForm } from 'react-hook-form'

import { ScrapeDetailsType } from '@/app/scrapes/[id]/page'
import { formReadOnly, FormReadOnlySchemaType } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'

export default function FormReadOnly(props: ScrapeDetailsType) {
  const { register } = useForm<FormReadOnlySchemaType>({
    resolver: zodResolver(formReadOnly),
    defaultValues: {
      url: props.url,
      prompt: props.prompt,
      scraped_data: props.scraped_data,
      prompt_response: props.prompt_response,
    },
  });

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="grid grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-6 w-full">
            <div className="col-span-full">
              <label
                htmlFor="url"
                className="block text-sm font-medium leading-6"
              >
                URL
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    id="url"
                    autoComplete="url"
                    readOnly
                    className="block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("url")}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="prompt"
                className="block text-sm font-medium leading-6 "
              >
                Prompt
              </label>
              <div className="mt-2">
                <textarea
                  id="prompt"
                  rows={5}
                  className="block w-full bg-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  readOnly
                  placeholder={`Get me the product details from this website's content and return as a JSON: title as string, description as string, specification as json with snake case keys`}
                  {...register("prompt")}
                />
              </div>
            </div>
            <div className="col-span-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />
            <div className="col-span-full">
              <label
                htmlFor="scraped_data"
                className="block text-sm font-medium leading-6 "
              >
                Scraped
              </label>
              <div className="mt-2">
                <textarea
                  id="scraped_data"
                  rows={5}
                  className="block w-full bg-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  readOnly
                  {...register("scraped_data")}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="prompt_response"
                className="block text-sm font-medium leading-6 "
              >
                Prompt Response
              </label>
              <div className="mt-2">
                <textarea
                  id="prompt_response"
                  rows={5}
                  className="block w-full bg-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  readOnly
                  {...register("prompt_response")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
