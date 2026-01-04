import OpenAI from "openai";

// 🧠 Agent brain imports
import { classifyNight } from "../agent/classifyNight";
import { selectStrategy } from "../agent/selectStrategy";
import { getPromptsForStrategy } from "../agent/generateIntervention";
import { updateMemory } from "../agent/updateMemory";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      thoughts = "",
      mood = null,
      memory = null,
    } = body;

    // 🧠 1. Perceive the night
    const nightType = classifyNight({ mood, thoughts });

    // 🧠 2. Decide strategy
    const strategy = selectStrategy(nightType, memory);

    // 🧠 3. Generate prompts for this strategy
    const prompts = getPromptsForStrategy(strategy, thoughts);

    // 🗣️ 4. Emotional validation
    const validationResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompts.validation,
        },
        {
          role: "user",
          content: thoughts,
        },
      ],
    });

    // 🌙 5. Bedtime story / sensory guidance
    const storyResponse = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: prompts.story,
        },
      ],
    });

    // 🧠 6. Update memory (invisible to user)
    const updatedMemory = updateMemory(memory, strategy);

    // 🧾 7. Respond
    return Response.json({
      nightType,
      strategy,
      validation: validationResponse.choices[0].message.content,
      story: storyResponse.choices[0].message.content,
      memory: updatedMemory,
    });
  } catch (error) {
    console.error("Sleep agent error:", error);
    return new Response("Error running sleep agent", { status: 500 });
  }
}
