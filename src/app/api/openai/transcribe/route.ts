import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({
    status: "disabled",
    message: "OpenAI transcription service is currently disabled. Please configure OPENAI_API_KEY in your environment variables if you need this functionality."
  }, { status: 503 });
}
