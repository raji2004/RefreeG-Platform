"use client";

import { useState } from "react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/dummyData";


export default function FAQ  ()  {
  const [showAll, setShowAll] = useState(false);

  const faqsh= [
    {
      question: "What is RefreeG?",
      answer:
        "RefreeG is a crowdfunding platform dedicated to supporting various causes with a strong focus on fostering socio-economic growth in African communities through blockchain transparency.",
    },
    { 
      question: "How does RefreeG ensure transparency?", 
      answer: "RefreeG leverages blockchain technology to ensure transparency and accountability in all transactions and fund allocations.", 
    },
    {
      question: "Can I contribute to multiple projects?",
      answer: "Yes, you can contribute to as many projects as you like on RefreeG.",
    },
    // Add more FAQs as needed...
  ];

  const handleShowMore = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-semibold mb-3">FAQS</h1>
      <p className="text-xl mb-6">Here are some popular questions our users can’t stop asking.</p>
      
      <Accordion type="multiple" className="w-full grid grid-cols-3 ">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="mb-6 w-[300px] border-none">
            <AccordionTrigger className="flex justify-between items-center p-6 rounded-3xl border-none bg-blue-50 hover:bg-blue-100 data-[state=open]:bg-customNavyBlue data-[state=open]:rounded-b-none data-[state=open]:text-white">
              <div className="text-left font-semibold text-lg border-none">{faq.question}</div>
            
            </AccordionTrigger>
            <AccordionContent className=" px-6 pb-6 pt-2 border-customNavyBlue rounded-b-3xl bg-customNavyBlue ">
              <div className=" w-full h-[1px] mb-4 bg-white"></div>
              <p className=" bg-customNavyBlue h-32 text-white">{faq.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="text-center mt-6 lg:hidden">
        {!showAll ? (
          <Button onClick={handleShowMore} className="bg-blue-600 hover:bg-blue-700">
            Show more
          </Button>
        ) : (
          <Button onClick={handleShowLess} className="bg-blue-600 hover:bg-blue-700">
            Show less
          </Button>
        )}
      </div>
    </div>
  );
};

