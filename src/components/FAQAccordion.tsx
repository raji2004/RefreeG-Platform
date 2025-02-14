"use client";

import { Accordion, AccordionItem } from "@/components/ui/accordion";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface FAQItem {
  id: string;
  label: string;
  content: string;
}

interface FAQSectionProps {
  title: string;
  items: FAQItem[];
}

const FAQAccordion: React.FC<FAQSectionProps> = ({ title, items }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <Accordion type="multiple" className="mt-4">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <div className="flex items-center gap-2">
              <InformationCircleIcon className="w-5 h-5 text-gray-600" />
              {item.label}
            </div>
            <p className="text-gray-700 mt-2">{item.content}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
