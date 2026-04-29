import { NextRequest, NextResponse } from "next/server";
import { groq, validateGroqConfig } from "@/lib/ai/groq";
import { buildDNSContext } from "@/lib/ai/build-dns-context";

export const runtime = "edge";

const MAX_MESSAGE_LENGTH = 1200;
const MAX_HISTORY_MESSAGES = 6;

export async function POST(req: NextRequest) {
  try {
    // 1. Validate environment
    try {
      validateGroqConfig();
    } catch (err) {
      console.error("[AI Route] Config error:", err);
      return NextResponse.json(
        { error: "AI service is currently unavailable. Please contact the team." },
        { status: 500 }
      );
    }

    // 2. Parse and validate body
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage.content || lastMessage.content.trim() === "") {
      return NextResponse.json({ error: "Message content cannot be empty" }, { status: 400 });
    }

    if (lastMessage.content.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        { error: `Message is too long (max ${MAX_MESSAGE_LENGTH} characters)` },
        { status: 400 }
      );
    }

    // 3. Build context
    const dnsContext = await buildDNSContext();

    // 4. Prepare prompt
    const systemPrompt = `
You are the official AI Guide for Digital Nomad Summit Santo Domingo 2026 (DNS 2026).
Your job is to help visitors understand the event, tickets, speakers, sponsors, partners, influencers, team, organizers, venue, agenda, and participation opportunities.

RULES:
- Answer ONLY about Digital Nomad Summit 2026.
- Match the user’s language: English or Spanish.
- Be warm, concise, professional, and helpful.
- Use ONLY the provided context and dynamic site data.
- Do not invent ticket prices, speakers, sponsors, partners, influencers, dates, or venue details.
- If information is not available, say it clearly and recommend contacting the team (digitalnomadsummit@gmail.com).
- For sponsorship, direct users to the partnership section or contact email.
- For tickets, refer to the prices: Early Bird $99, General Admission $149, VIP $399.
- If the user asks something unrelated to DNS 2026, politely redirect them back to the summit.
- Never expose internal implementation details, database structure, or API keys.

CURRENT DNS CONTEXT:
${dnsContext}
    `.trim();

    // 5. Trim history
    const history = messages.slice(-MAX_HISTORY_MESSAGES);

    // 6. Call Groq
    const completion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 800,
    });

    const answer = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[AI Route] Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
