export function getPromptsForStrategy(strategy, thoughts) {
  switch (strategy) {
    case "offload_then_loop":
      return {
        validation:
          "You are a calm sleep companion. Gently acknowledge the thoughts without solving them. Reassure the user that nothing needs to be handled tonight.",
        story:
          "Create a calming bedtime story designed to fade into rest. Slow, warm tone. Peaceful setting. No conflict. No endings. Let it drift endlessly.",
      };

    case "grounding_voice":
      return {
        validation:
          "Use grounding language. Focus on safety, breath, and the body being supported. Speak slowly and reassuringly.",
        story:
          "Guide the user through gentle sensory imagery—warmth, stillness, soft sounds—leaving space for pauses.",
      };

    case "minimal_reassurance":
      return {
        validation:
          "Offer brief reassurance. Let the user know it is okay to rest without effort.",
        story:
          "Very short, gentle imagery. Then allow silence to take over.",
      };

    case "sensory_story":
      return {
        validation:
          "Speak softly and kindly, inviting the user to simply rest.",
        story:
          "Create a slow sensory scene—night air, distant sounds, calm presence—with no direction or conclusion.",
      };

    case "continuity_story":
      return {
        validation:
          "You're still safe here. Nothing new needs to be done. The night is still holding you.",
        story:
          "Continue gently without introducing any new place, scene, or imagery. Stay in a vague sense of darkness and stillness. Use simple, repetitive language about quiet air, slow breath, and the night holding steady. Avoid descriptions, characters, movement, or progression. Let phrases softly repeat or rephrase, as if looping. It should feel like nothing new is happening, and nothing needs to happen.",
      };

    default:
      return {
        validation:
          "Offer calm reassurance in a gentle tone.",
        story:
          "Create a soft, endless bedtime story with no ending.",
      };
  }
}
