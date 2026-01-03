"use client";

import { useState } from "react";

export default function Home() {
  const [thoughts, setThoughts] = useState("");
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState("");
  const [story, setStory] = useState("");

  async function sleepNow() {
    if (!thoughts) return;

    setLoading(true);
    setValidation("");
    setStory("");

    const res = await fetch("/api/sleep", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ thoughts }),
    });

    const data = await res.json();
    setValidation(data.validation);
    setStory(data.story);
    setLoading(false);

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
} as const;
