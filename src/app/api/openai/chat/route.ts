import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  return NextResponse.json({
    status: "disabled",
    message: "OpenAI chat service is currently disabled. Please configure OPENAI_API_KEY in your environment variables if you need this functionality."
  }, { status: 503 });
} 