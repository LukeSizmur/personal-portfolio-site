"use client";

import { useState, useEffect } from "react";

const WORDS = ["Engineer.", "Developer.", "Connoisseur.", "Creator."];
const TYPE_MS = 75;
const DELETE_MS = 42;
const PAUSE_TYPED = 2400;
const PAUSE_DELETED = 380;

type Phase = "typed" | "deleting" | "deleted" | "typing";

export function TypewriterWord() {
  const [text, setText] = useState(WORDS[0]);
  const [phase, setPhase] = useState<Phase>("typed");
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    if (phase === "typed") {
      const t = setTimeout(() => setPhase("deleting"), PAUSE_TYPED);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text.length === 0) {
        setPhase("deleted");
        return;
      }
      const t = setTimeout(() => setText((s) => s.slice(0, -1)), DELETE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "deleted") {
      const t = setTimeout(() => {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
      }, PAUSE_DELETED);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      const target = WORDS[wordIndex];
      if (text === target) {
        setPhase("typed");
        return;
      }
      const t = setTimeout(
        () => setText(target.slice(0, text.length + 1)),
        TYPE_MS,
      );
      return () => clearTimeout(t);
    }
  }, [text, phase, wordIndex]);

  return <>{text}</>;
}
