export function getPromptsForStrategy(strategy, thoughts) {
  switch (strategy) {
    case "offload_then_loop":
      return {
        validation: "You are safe. Nothing needs to be solved tonight.",
        story: "Speak slowly and calmly. Describe quiet, still imagery that fades without ending.",
      };

    case "grounding_voice":
      return {
        validation: "It's completely normal to feel anxious when the future feels uncertain. You don't need to figure anything out right now. Nothing requires action tonight. Let your body rest, and allow the night to carry you for a while. Don't ask any questions or try to solve anything.",
        story: "Guide attention to the body and breath, keeping everything slow, simple, and still, without introducing new scenes.",
      };

    case "minimal_reassurance":
      return {
        validation: "It's okay to rest without effort.",
        story: "Offer very minimal imagery, then allow silence.",
      };

    case "sensory_story":
      return {
        validation: "You can simply rest here.",
        story: "Describe soft, neutral sensations with no movement or progression.",
      };

    case "continuity_story":
      return {
        validation: "You're still safe. Nothing new needs to happen.",
        story: "Continue gently with repetition and stillness, avoiding any new imagery or direction.",
      };

    default:
      return {
        validation: "You are safe.",
        story: "Speak calmly and slowly with no conclusion.",
      };
  }
}
