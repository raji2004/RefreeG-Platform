// components/FAQ.tsx
import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      question: "How does Refreeg ensure transparency in donations?",
      answer:
        "Refreeg ensures transparency by requiring recipients to provide valid updates on fund usage, like school attendance or receipts, ensuring accountability at each milestone.",
    },
    {
      question: "What types of causes can I donate to?",
      answer:
        "You can donate to various educational causes within Northern Nigeria, focusing on supporting students, schools, and community education initiatives.",
    },
    {
      question: "How can I track the progress of my donation?",
      answer:
        'You can track your donation progress through the "Updates" tab, where recipients post progress updates and fund usage details.',
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Yes, Refreeg uses secure payment gateways like Paystack or Remita to ensure your payment details are protected.",
    },
    {
      question: "Can I donate anonymously?",
      answer:
        "Yes, you have the option to donate anonymously if you prefer your identity to be private.",
    },
    {
      question: "What happens if a cause doesn’t reach its fundraising goal?",
      answer:
        "If a cause doesn’t reach its goal, the funds raised will still be directed towards the cause. Recipients are encouraged to post updates on how the funds are used.",
    },
    {
      question: "How do I know if a cause is legitimate?",
      answer:
        "Refreeg verifies each cause by reviewing documentation and ensuring transparency in fund usage through regular updates.",
    },
    {
      question: "Can I create my own cause on Refreeg?",
      answer:
        "Yes, you can create your own cause on Refreeg. Make sure to provide valid information to help donors understand your needs and support your cause.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:px-8">
      <h1 className="text-xl font-semibold mb-4 text-center">
        Read through our frequently asked questions here!
      </h1>

      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center px-4 py-3 md:py-4 text-left text-gray-800 text-lg font-medium hover:bg-blue-300 focus:outline-none focus:bg-blue-400 transition"
            >
              <span>{faq.question}</span>
              <span className="text-xl">{openIndex === index ? "-" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 py-3 md:py-4 bg-gray-50 text-gray-600">
                <p className="text-base leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <p>
          Do you have a question we didn’t answer? Send us an email and we’ll
          get right back with an answer!
        </p>
        <p>
          <a href="/signup" className="text-blue-500 underline">
            Create an account
          </a>{" "}
          or{" "}
          <a href="/login" className="text-blue-500 underline">
            login
          </a>{" "}
          to ask your question(s).
        </p>
      </div>
    </div>
  );
};

export default FAQ;
