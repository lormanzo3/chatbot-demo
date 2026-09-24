import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/config/clinic";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
    const { message } = await request.json();
    const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: systemPrompt,
        messages: [
            { role: "user", content: message },
        ],
    });
    const reply = response.content[0].text;

    return NextResponse.json({ reply });
}