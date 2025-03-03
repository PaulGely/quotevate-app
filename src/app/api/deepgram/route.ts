import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DEEPGRAM_API_KEY) {
    return NextResponse.json({
      error: "Deepgram API key not configured. Please add DEEPGRAM_API_KEY to your environment variables.",
      message: "This is a placeholder response. To enable Deepgram functionality, configure your API keys in Vercel."
    }, { status: 501 });
  }
  
  return NextResponse.json({
    key: process.env.DEEPGRAM_API_KEY,
  });
}
