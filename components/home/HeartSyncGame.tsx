"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type GameState = "start" | "playing" | "result";

interface ResultType {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
}

const questions = [
  {
    question: "Your perfect date is:",
    options: [
      { text: "Sunrise walk & deep talk", emoji: "🌅" },
      { text: "Concert & dancing", emoji: "🎶" },
      { text: "Movie night & chill", emoji: "🍕" },
    ],
  },
  {
    question: "You believe love is:",
    options: [
      { text: "Soul connection", emoji: "💫" },
      { text: "Friendship first", emoji: "🤝" },
      { text: "Wild chemistry", emoji: "⚡" },
    ],
  },
  {
    question: "Your texting style:",
    options: [
      { text: "Deep & meaningful", emoji: "💭" },
      { text: "Funny & random", emoji: "😂" },
      { text: "Short & sweet", emoji: "💕" },
    ],
  },
  {
    question: "Weekend mood:",
    options: [
      { text: "Nature & peace", emoji: "🌿" },
      { text: "Friends & fun", emoji: "🎉" },
      { text: "Rest & recharge", emoji: "😌" },
    ],
  },
  {
    question: "Your heart says:",
    options: [
      { text: "Feel everything deeply", emoji: "❤️" },
      { text: "Love freely", emoji: "🕊️" },
      { text: "Love slowly", emoji: "🐢" },
    ],
  },
];

const resultMap: Record<string, ResultType> = {
  romantic: { title: "The Romantic Soul", description: "You love deep emotional bonds and soulful connections.", emoji: "💖", gradient: "from-pink-500 to-rose-500" },
  passion: { title: "The Passion Spark", description: "Energetic, expressive, and full of magnetic energy.", emoji: "🔥", gradient: "from-orange-500 to-red-500" },
  calm: { title: "The Calm Connector", description: "Peaceful, steady, and deeply intentional in love.", emoji: "🌿", gradient: "from-green-500 to-teal-500" },
  fun: { title: "The Fun Lover", description: "Playful, social, and always bringing joy to connections.", emoji: "🎭", gradient: "from-purple-500 to-indigo-500" },
};

function calculateResult(answers: number[]): ResultType {
  const scores = { romantic: 0, passion: 0, calm: 0, fun: 0 };
  answers.forEach((a, i) => {
    if (i === 0) { if (a === 0) scores.romantic += 2; else if (a === 1) scores.passion += 2; else { scores.calm++; scores.fun++; } }
    else if (i === 1) { if (a === 0) scores.romantic += 2; else if (a === 1) scores.calm += 2; else scores.passion += 2; }
    else if (i === 2) { if (a === 0) scores.romantic += 2; else if (a === 1) scores.fun += 2; else scores.calm += 2; }
    else if (i === 3) { if (a === 0) { scores.romantic++; scores.calm++; } else if (a === 1) scores.fun += 2; else scores.calm += 2; }
    else if (i === 4) { if (a === 0) scores.romantic += 2; else if (a === 1) scores.passion += 2; else scores.calm += 2; }
  });
  const key = (Object.keys(scores) as (keyof typeof scores)[]).reduce((a, b) => scores[a] >= scores[b] ? a : b);
  return resultMap[key];
}

export default function HeartSyncGame() {
  const [state, setState] = useState<GameState>("start");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);

  const handleAnswer = (idx: number) => {
    const next = [...answers, idx];
    setAnswers(next);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setResult(calculateResult(next));
      setState("result");
    }
  };

  const reset = () => { setState("start"); setCurrent(0); setAnswers([]); setResult(null); };

  const share = async () => {
    const text = `I'm "${result?.title}" on Spiritual Unity Match! ${result?.emoji} ${result?.description}`;
    if (navigator.share) {
      await navigator.share({ title: "My Dating Personality", text, url: window.location.origin }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.origin}`);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {state === "start" && (
        <motion.div key="start" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="text-6xl mb-5">💓</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "var(--font-playfair), serif" }}>Heart Sync</h3>
          <p className="text-gray-500 mb-7 text-sm leading-relaxed">Answer 5 quick questions to discover your dating personality!</p>
          <button 
            onClick={() => setState("playing")} 
            className="w-full bg-primary text-white px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:scale-[1.02] transition-all duration-300 active:scale-95"
          >
            Start Heart Sync ✨
          </button>
        </motion.div>
      )}

      {state === "playing" && (
        <motion.div key={`q-${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-white rounded-3xl p-8 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xs font-semibold text-brand bg-brand-light px-3 py-1 rounded-full">
              {current + 1} / {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div key={i} className={`h-1.5 w-6 rounded-full transition-all ${i <= current ? "bg-brand-gradient" : "bg-gray-200"}`} />
              ))}
            </div>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-6 text-center" style={{ fontFamily: "var(--font-playfair), serif" }}>
            {questions[current].question}
          </h3>
          <div className="space-y-3">
            {questions[current].options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} className="w-full flex items-center gap-3 bg-gray-50 hover:bg-brand-light p-4 rounded-xl border border-gray-200 hover:border-brand/20 transition-all duration-200 text-left group">
                <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                <span className="font-medium text-gray-800 text-sm group-hover:text-brand">{opt.text}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {state === "result" && result && (
        <motion.div key="result" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={`bg-gradient-to-br ${result.gradient} rounded-3xl p-8 shadow-xl text-white text-center`}>
          <div className="text-7xl mb-4">{result.emoji}</div>
          <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "var(--font-playfair), serif" }}>{result.title}</h3>
          <p className="text-white/85 mb-7 text-sm leading-relaxed">{result.description}</p>
          <div className="space-y-3">
            <button onClick={share} className="w-full bg-white/20 backdrop-blur-sm text-white py-3 rounded-full font-semibold hover:bg-white/30 transition-all border border-white/20">
              Share My Vibe 🌟
            </button>
            <button onClick={reset} className="text-white/70 hover:text-white text-sm underline underline-offset-2 block mx-auto">
              Take quiz again
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
