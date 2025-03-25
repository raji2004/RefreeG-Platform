"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Reaction = {
  emoji: React.ReactNode;
  label: string;
  isOriginal: boolean;
};

export default function EmojiReaction() {
  const [reactions, setReactions] = useState<Reaction[]>([
    {
      emoji: (
        <Image
          src="/DonationDetail/Heart.svg"
          alt="Red Heart"
          width={24}
          height={24}
        />
      ),
      label: "Red Heart",
      isOriginal: true,
    },
    {
      emoji: (
        <Image
          src="/DonationDetail/Purple_Heart.svg"
          alt="Purple Heart"
          width={24}
          height={24}
        />
      ),
      label: "Purple Heart",
      isOriginal: true,
    },
    {
      emoji: (
        <Image
          src="/DonationDetail/Flower.svg"
          alt="Flower"
          width={24}
          height={24}
        />
      ),
      label: "Flower",
      isOriginal: true,
    },
    {
      emoji: (
        <Image
          src="/DonationDetail/Heart Hands.svg"
          alt="Hands Heart"
          width={24}
          height={24}
        />
      ),
      label: "Hands Heart",
      isOriginal: true,
    },
    {
      emoji: (
        <Image
          src="/DonationDetail/charity.svg"
          alt="Raised Hands"
          width={24}
          height={24}
        />
      ),
      label: "Raised Hands",
      isOriginal: true,
    },
  ]);

  const [selectedReaction, setSelectedReaction] = useState<ReactNode | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const firstEmojiRef = useRef<HTMLButtonElement>(null);

  const handleReaction = (emoji: ReactNode) => {
    if (selectedReaction === emoji) {
      setSelectedReaction(null);
    } else {
      setSelectedReaction(emoji);
    }
  };

  return (
    <div className="max-w-lg flex flex-col items-start mt-4" ref={containerRef}>
      <div className="flex items-center gap-4 mb-4 relative">
        {/* Circle outline */}
        <div
          ref={circleRef}
          className="w-16 h-16 rounded-full border border-[#cccbcb] flex items-center justify-center relative z-10 bg-white pointer-events-none"
        >
          <AnimatePresence>
            {selectedReaction ? (
              <motion.span
                key="selected-emoji"
                className="text-2xl"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {selectedReaction}
              </motion.span>
            ) : (
              <motion.svg
                key="heart-outline"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
                  stroke="#000000"
                  strokeWidth="2"
                  fill="none"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        {/* Emoji reactions */}
        <div className="flex gap-2 flex-wrap hover:bg-gray-200/40 rounded-full p-1 ">
          {reactions.map((reaction, index) => {
            const isSelected = selectedReaction === reaction.emoji;

            return (
              <motion.button
                key={`${reaction.emoji}-${index}`}
                ref={index === 0 ? firstEmojiRef : null}
                onClick={() => handleReaction(reaction.emoji)}
                className={cn(
                  "text-2xl p-2 rounded-full transition-all relative",
                  isSelected ? "opacity-50" : "hover:bg-gray-50"
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`React with ${reaction.label}`}
                aria-pressed={isSelected}
              >
                <span role="img" aria-label={reaction.label}>
                  {reaction.emoji}
                </span>

                {/* Flying emoji animation */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      className="absolute left-0 top-0 text-2xl pointer-events-none z-20"
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{
                        x: circleRef.current
                          ? circleRef.current.getBoundingClientRect().left -
                            containerRef.current!.getBoundingClientRect().left -
                            (reaction.emoji && reaction.emoji.toString().length > 1 ? 30 : 25)
                          : 0,
                        y: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      {reaction.emoji}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <p className="text-md text-center text-[#000000] ">
        Encourage the beneficiaries with a reaction :)
      </p>
    </div>
  );
}
