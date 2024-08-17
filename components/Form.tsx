"use client";

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { newScrape } from '@/app/actions'
import { formSchema, FormSchemaType } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Form() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt:
        "Get me the product details from this website's content and return as a JSON: title as string, description as string (include the bullet points), specification as json with snake case keys",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    const res = await newScrape(data);

    if (!res) alert("Error. Something went wrong.");

    router.push(`/scrapes/${res.data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                    className="block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("url")}
                  />
                </div>
                {errors.url && (
                  <p className="pt-2 text-sm text-red-500">
                    {errors.url.message}
                  </p>
                )}
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="api_key"
                className="block text-sm font-medium leading-6"
              >
                OpenAI API Key
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                  <input
                    type="text"
                    id="api_key"
                    autoComplete="api_key"
                    className="block bg-black w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...register("api_key")}
                  />
                </div>
                <p className="pt-2 text-xs text-gray-400">gpt-4o-mini</p>
                {errors.api_key && (
                  <p className="pt-2 text-sm text-red-500">
                    {errors.api_key.message}
                  </p>
                )}
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
                  className="block w-full bg-black rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register("prompt")}
                />
              </div>
              {errors.prompt && (
                <p className="pt-2 text-sm text-red-500">
                  {errors.prompt.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:bg-gray-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
      <p className="pt-2 text-xs text-gray-400 text-center">
        We do not store your API Key. You can always revoke your API Key after
        using.
      </p>
    </form>
  );
}
