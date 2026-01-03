"use client";
import { useEffect, useState } from "react";

const lines = [
  "// Upgrading year...",
  "// v2025.99 -> v2026.0",
  "// Changelog:",
  "// - Added hope",
  "// - Deprecated resolutions",
  "// - Known issues: me",
];

export default function Typewriter() {
  const [text, setText] = useState("");
  const speed = 50;
  const pause = 500;

  useEffect(() => {
    let line = 0;
    let char = 0;

    function type() {
  if (line >= lines.length) return;

  const currentLine = lines[line];

  if (char < currentLine.length) {
    setText(prev => prev + currentLine.charAt(char));
    char++;
    setTimeout(type, speed);
  } else {
    setText(prev => prev + "\n");
    char = 0;
    line++;
    setTimeout(type, pause);
  }
}

    type();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <pre className="bg-black text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap shadow-lg">
        {text}
      </pre>
    </div>
  );
}