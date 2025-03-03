import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return NextResponse.json({ 
    error: "OpenAI API key not configured. Please add OPENAI_API_KEY to your environment variables.",
    message: "This is a placeholder response. To enable transcription functionality, configure your API keys in Vercel." 
  }, { status: 501 });
}
