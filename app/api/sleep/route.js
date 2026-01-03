import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { thoughts } = await req.json();

    // 1️⃣ Emotional validation
    const validation = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a calm, gentle sleep companion. Respond in a reassuring, non-judgmental tone. Do not give advice. Keep under 120 words.",
        },
        {
          role: "user",
          content: thoughts,
        },
      ],
    });

    // 2️⃣ Bedtime story
    const story = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Create a calming bedtime story designed to fade into rest. Tone: slow, warm, safe. Setting: peaceful, familiar, gentle. No conflict. No endings. No conclusions. Avoid phrases like 'fell asleep' or 'the end'. Let the story gently drift, as if it could continue forever.",
        },
      ],
    });

    return Response.json({
      validation: validation.choices[0].message.content,
      story: story.choices[0].message.content,
    });
  } catch (error) {
    console.error("Sleep API error:", error);
    return new Response("Error generating sleep content", { status: 500 });
  }
}
