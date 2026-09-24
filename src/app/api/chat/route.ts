import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { clinicName, clinicHours, clinicEnglishStaff } from "@/config/clinic";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
    const { message } = await request.json();
    const response = await anthropic.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1024,
        system: `You are a helpful assistant for ${clinicName}. The clinic's opening hours are: ${clinicHours}. English-speaking staff are available on these dates: ${clinicEnglishStaff}`,
        messages: [
            { role: "user", content: message },
        ],
    });
    const reply = response.content[0].text;

    return NextResponse.json({ reply });
}