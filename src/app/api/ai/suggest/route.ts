import { NextResponse } from "next/server";
import { generateAISuggestion } from "@/lib/ai";

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    const suggestion = await generateAISuggestion(question);
    return NextResponse.json({ suggestion });
  } catch {
    return NextResponse.json({ error: "Failed to generate suggestion" }, { status: 500 });
  }
}
