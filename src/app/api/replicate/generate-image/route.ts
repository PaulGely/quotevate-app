import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({ 
    error: "Replicate API token not configured. Please add REPLICATE_API_TOKEN to your environment variables.",
    message: "This is a placeholder response. To enable image generation functionality, configure your API keys in Vercel." 
  }, { status: 501 });
}
