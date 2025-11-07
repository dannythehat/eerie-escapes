'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-800 rounded-lg overflow-hidden transition-all duration-200 hover:border-red-900/50"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left bg-gray-800/50 hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="text-lg font-semibold text-white pr-4">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-red-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
              )}
            </button>

            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? 'max-h-96 opacity-100'
                  : 'max-h-0 opacity-0'
              } overflow-hidden`}
            >
              <div className="p-5 pt-0 text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="mt-8 pt-6 border-t border-gray-800 text-center">
        <p className="text-gray-400 mb-4">Still have questions?</p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 font-semibold transition-colors duration-200"
        >
          Contact our support team
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}
