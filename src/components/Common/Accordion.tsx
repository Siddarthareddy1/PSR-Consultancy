import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-150 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <button
              onClick={() => toggleIndex(idx)}
              className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-slate-900 font-heading hover:bg-slate-50 transition-colors focus:outline-none"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`h-5 w-5 text-slate-500 transition-transform duration-300 ${
                  isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                isOpen ? "max-h-96 opacity-100 border-t border-slate-100" : "max-h-0 opacity-0 pointer-events-none"
              }`}
            >
              <div className="px-6 py-5 text-slate-600 text-sm sm:text-base leading-relaxed bg-slate-50/50">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
