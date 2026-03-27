import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null });
    }
    return NextResponse.json({
      user: {
        id: session.id,
        username: session.username,
        displayName: session.displayName,
        email: session.email,
      },
    });
  } catch (err) {
    console.error("Session API failed:", err);
    return NextResponse.json({ user: null });
  }
}
