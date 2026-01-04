"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [thoughts, setThoughts] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState("");
  const [story, setStory] = useState("");
  const [mood, setMood] = useState<string | null>(null);
  const [memory, setMemory] = useState<any>(null);

  useEffect(() => {
  const savedMemory = localStorage.getItem("sleepAgentMemory");
  if (savedMemory) {
    setMemory(JSON.parse(savedMemory));
  }
  }, []);


  async function sleepNow() {
    if (!thoughts) return;

    setLoading(true);
    setValidation("");
    setStory("");

    const res = await fetch("/api/sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thoughts, mood, memory }),
    });

    const data = await res.json();
    setValidation(data.validation);
    setStory(data.story);
    setLoading(false);
    setMemory(data.memory);
    localStorage.setItem("sleepAgentMemory", JSON.stringify(data.memory));

    speak(data.validation + " " + data.story);
    document.body.style.opacity = "0.9";


    function speak(text: string) {
      if (!window.speechSynthesis) return;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;   // slower = calmer
      utterance.pitch = 0.9;
      utterance.volume = 0.8;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }

  }

  return (
    <main style={styles.container}>
    <h1 style={styles.title}>🌙 Ready to sleep?</h1>

    {!validation && (
      <>
        {/* Night selection (optional) */}
        <div style={styles.moodContainer}>
          <p style={styles.moodLabel}>How does tonight feel?</p>
          <div style={styles.moodButtons}>
            {["racing", "anxious", "heavy"].map((option) => (
              <button
                key={option}
                onClick={() => setMood(option)}
                style={{
                  ...styles.moodButton,
                  background:
                    mood === option ? "#5b6cff" : "#1a1f3c",
                }}
              >
                {option}
              </button>
            ))}
            <button
              onClick={() => setMood(null)}
              style={styles.skipButton}
            >
              skip
            </button>
          </div>
        </div>

        <textarea
          style={styles.textarea}
          placeholder="What’s keeping you awake tonight?"
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={sleepNow}
          disabled={loading}
        >
          {loading ? "Unwinding..." : "Sleep Now"}
        </button>
      </>
    )}

    {validation && (
      <div style={styles.card}>
        <p style={styles.text}>{validation}</p>
        <p style={styles.story}>{story}</p>
      </div>
    )}

    <p style={{ fontSize: "12px", opacity: 0.5, marginTop: "24px" }}>
      This is not medical advice. For sleep disorders, consult a professional.
    </p>
  </main>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#0b1020",
    color: "#eaeaf0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    textAlign: "center",
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
  },
  textarea: {
    width: "100%",
    maxWidth: "420px",
    height: "120px",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    fontSize: "16px",
    marginBottom: "16px",
    outline: "none",
  },
  button: {
    padding: "14px 24px",
    fontSize: "16px",
    borderRadius: "999px",
    border: "none",
    background: "#5b6cff",
    color: "#fff",
    cursor: "pointer",
  },
  card: {
    maxWidth: "480px",
    lineHeight: "1.6",
  },
  text: {
    fontSize: "18px",
    marginBottom: "20px",
  },
  story: {
    fontSize: "16px",
    opacity: 0.9,
  },
  moodContainer: {
  marginBottom: "20px",
},
  moodLabel: {
    fontSize: "14px",
    opacity: 0.7,
    marginBottom: "8px",
  },
  moodButtons: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  moodButton: {
    padding: "6px 14px",
    borderRadius: "999px",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
  },
  skipButton: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid #444",
    background: "transparent",
    color: "#aaa",
    fontSize: "12px",
    cursor: "pointer",
  },
} as const;
