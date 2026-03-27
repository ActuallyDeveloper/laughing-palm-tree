const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function generateAISuggestion(question: string): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    return "AI suggestions require an OpenRouter API key.";
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant on a Q&A social platform called Exotic. Provide concise, friendly, and thoughtful answers to questions. Keep responses under 200 words. Be authentic and engaging.",
          },
          {
            role: "user",
            content: question,
          },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "Could not generate a suggestion.";
  } catch {
    return "AI suggestion unavailable at the moment.";
  }
}
