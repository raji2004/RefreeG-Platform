"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Dash from "../../../public/images/dash.svg"; // Import the dash image
import Plus from "../../../public/images/plus.svg"; // Import the plus image
import '../../app/globals.css';

interface FAQItemProps {
  question: string;
  answer?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [height, setHeight] = useState<string | number>(0);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div
      className={`w-11/12 rounded-3xl px-6 py-6 mb-6 ${
        isOpen ? "bg-customNavyBlue text-white" : "bg-blue-50"
      }`}
    >
      <div className="flex justify-between mx-auto mb-2" onClick={onToggle}>
        <div className={`${isOpen ? "text-lg text-white" : "text-lg text-black"} font-semibold`}>
          {question}
        </div>
        <div className="text-lg font-semibold">
          <Image src={isOpen ? Dash : Plus} alt={isOpen ? "dash" : "plus"} height={20} width={20} />
        </div>
      </div>
      <div
        className="overflow-hidden transition-max-height ease-in-out duration-500"
        style={{ maxHeight: height }}
        ref={contentRef}
      >
        <div className="border-t mt-2 pt-2">{answer}</div>
      </div>
    </div>
  );
};

export const FAQSection = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    {
      question: "How does RefreeG ensure transparency?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    
    // Add more FAQs as needed
  ];

  const handleToggleFAQ = (index: number) => {
    setOpenFAQIndex(index === openFAQIndex ? null : index);
  };

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setOpenFAQIndex(null); // Close all items when showing less
  };

  return (
    <div className="mr-10 ml-10 mb-16">
      <div className="text-4xl font-semibold mb-3">FAQS</div>
      <div className="text-xl mb-6">Here are some popular questions our users can’t stop asking.</div>
      <div className={`md:flex flex-wrap justify-between w-11/12 mx-auto ${showAll ? "faq-expanded" : "faq-collapsed"}`}>
        {faqs.map((faq, index) => (
          <div key={index} className="w-full md:w-1/3">
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openFAQIndex}
              onToggle={() => handleToggleFAQ(index)}
            />
          </div>
        ))}
      </div>
      <div className="text-center mt-6 lg:hidden">
        {!showAll ? (
          <button
            onClick={handleShowMore}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Show more
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default function FAQ() {
  return (
    <div>
      <FAQSection />
    </div>
  );
}
