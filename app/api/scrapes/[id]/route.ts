import { NextResponse } from 'next/server'

import { createClient } from '@/utils/supabase/server'

export async function GET(_: Request, { params }: any) {
  const { id } = params;

  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("scrapes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return NextResponse.json({ error }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
