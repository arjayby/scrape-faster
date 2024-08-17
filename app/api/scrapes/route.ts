import axios from 'axios'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { z } from 'zod'

import { formSchema } from '@/lib/validation'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  try {
    const supabase = createClient();

    const { data } = await supabase
      .from("scrapes")
      .select()
      .order("created_at", { ascending: false })
      .limit(20);

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const parsedData = formSchema.parse(data);

    const response = await axios.get(`https://r.jina.ai/${parsedData.url}`);

    if (!response.data) {
      throw new Error("Network response was not ok");
    }

    const openai = new OpenAI({ apiKey: parsedData.api_key });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: parsedData.prompt },
        {
          role: "user",
          content: response.data,
        },
      ],
    });

    const supabase = createClient();

    const created = await supabase
      .from("scrapes")
      .insert({
        url: parsedData.url,
        prompt: parsedData.prompt,
        scraped_data: response.data,
        prompt_result: completion.choices[0].message,
      })
      .select();

    return NextResponse.json({ data: created.data![0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
