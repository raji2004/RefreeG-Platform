"use client";

import React from "react";
import {
  ChevronDownIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface AccordionItem {
  id: string;
  label: string;
  content: string;
}

interface AccordionSectionProps {
  title: string;
  id: string;
  items: AccordionItem[];
  openItems: Record<string, boolean>;
  toggleItem: (id: string) => void;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({
  title,
  id,
  items,
  openItems,
  toggleItem,
}) => {
  return (
    <div key={id} className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.id} className="border rounded">
            <div
              className="flex justify-between items-center p-3 cursor-pointer transition-colors duration-300 hover:bg-gray-100"
              onClick={() => toggleItem(item.id)}
            >
              <div className="flex items-center">
                <InformationCircleIcon className="w-5 h-5 mr-2 text-gray-600" />
                {item.label}
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 transition-transform duration-300 ease-in-out ${
                  openItems[item.id] ? "rotate-180" : ""
                }`}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItems[item.id] ? "max-h-40 p-3" : "max-h-0 p-0"
              }`}
            >
              <p className="text-gray-700">{item.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AccordionSection;
