"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-white text-black opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });
  const renderWords = () => {
    return (
      <div>
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span
                  key={`char-${index}`}
                  className={cn(`dark:text-white text-black `, word.className)}
                >
                  {char}
                </span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("flex space-x-1 my-6", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        initial={{
          width: "0%",
        }}
        whileInView={{
          width: "fit-content",
        }}
        transition={{
          duration: 2,
          ease: "linear",
          delay: 1,
        }}
      >
        <div
          className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-5xl font-bold"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}{" "}
        </div>{" "}
      </motion.div>
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "block rounded-sm w-[4px]  h-4 sm:h-6 xl:h-12 bg-blue-500",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

// NEW: Rotierender Typewriter (tippen -> pausieren -> löschen -> nächstes Wort)
export function TypewriterRotate({
  words,
  className,
  cursorClassName,
  typingMs = 70,
  deletingMs = 40,
  pauseMs = 500,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}) {
  const texts = useMemo(() => words.map((w) => w.text), [words]);
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pausing' | 'deleting'>('typing');
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // immer bestehenden Timer räumen, bevor wir einen neuen setzen
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const current = texts[index] ?? '';
    if (phase === 'typing') {
      if (sub < current.length) {
        timeoutRef.current = window.setTimeout(() => setSub((s) => s + 1), typingMs);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      // Warten, dann Löschen starten
      timeoutRef.current = window.setTimeout(() => setPhase('deleting'), pauseMs);
    } else if (phase === 'deleting') {
      if (sub > 0) {
        timeoutRef.current = window.setTimeout(() => setSub((s) => s - 1), deletingMs);
      } else {
        setIndex((i) => (i + 1) % texts.length);
        setPhase('typing');
      }
    }

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [sub, phase, index, texts, typingMs, deletingMs, pauseMs]);

  const currentWord = words[index] ?? { text: '' };
  const shown = currentWord.text.slice(0, sub);

  return (
    <div className={cn("flex items-center justify-center gap-1 my-4", className)} aria-live="polite">
      <span className={cn("text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-slate-200", currentWord.className)}>
        {shown}
      </span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={cn("inline-block w-[3px] h-5 md:h-7 lg:h-10 bg-sky-400", cursorClassName)}
      />
    </div>
  );
}

// SMOOTHER VARIANTE: animiert Breite (0 -> volle Breite -> 0) pro Wort
export function TypewriterRotateSmooth({
  words,
  className,
  cursorClassName,
  typingMs = 50,
  deletingMs = 60,
  pauseMs = 800,
}: {
  words: { text: string; className?: string }[];
  className?: string;
  cursorClassName?: string;
  typingMs?: number;
  deletingMs?: number;
  pauseMs?: number;
}) {
  const list = useMemo(() => words.map((w) => ({ text: w.text, className: w.className })), [words]);
  const [i, setI] = useState(0);
  const curr = list[i] ?? { text: '' };
  const len = curr.text.length;

  // Schreibe- und Löschdauer pro Zeichen gleichsetzen
  const msPerChar = typingMs; // Löschdauer wird bewusst auf typingMs gesetzt
  const totalDuration = len * msPerChar + pauseMs + len * msPerChar; // ms

  useEffect(() => {
    const id = window.setTimeout(() => setI((v) => (v + 1) % list.length), totalDuration);
    return () => window.clearTimeout(id);
  }, [i, list.length, totalDuration]);

  // Sekunden für framer-motion
  const typeSec = (len * msPerChar) / 1000;
  const pauseSec = pauseMs / 1000;
  const deleteSec = typeSec; // gleich lange wie Tippen
  const totalSec = typeSec + pauseSec + deleteSec;
  const times = [0, typeSec / totalSec, (typeSec + pauseSec) / totalSec, 1];

  return (
    <div className={cn('flex items-center justify-center gap-1 my-4', className)} aria-live="polite">
      <div className="relative">
        <motion.div
          key={i}
          initial={{ width: '0ch' }}
          animate={{ width: ['0ch', `${len}ch`, `${len}ch`, '0ch'] }}
          transition={{ duration: totalSec, ease: 'linear', times }}
          className={cn('overflow-hidden whitespace-nowrap text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-slate-200')}
          style={{ willChange: 'width' }}
        >
          <span className={cn(curr.className)}>{curr.text}</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className={cn('inline-block w-[3px] h-5 md:h-7 lg:h-10 bg-sky-400 ml-1', cursorClassName)}
          />
        </motion.div>
      </div>
    </div>
  );
}


