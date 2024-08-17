import { z } from 'zod'

export const formSchema = z.object({
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  api_key: z.string().min(1, "OpenAI API Key is required"),
  prompt: z.string().min(1, "Prompt is required"),
});

export type FormSchemaType = z.infer<typeof formSchema>;

export const formReadOnly = z.object({
  url: z.string().url("Invalid URL").min(1, "URL is required"),
  prompt: z.string().min(1, "Prompt is required"),
  scraped_data: z.string(),
  prompt_response: z.string(),
});

export type FormReadOnlySchemaType = z.infer<typeof formReadOnly>;
