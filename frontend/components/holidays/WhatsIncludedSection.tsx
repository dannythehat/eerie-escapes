'use client';

import { Check, X } from 'lucide-react';

interface WhatsIncludedItem {
  text: string;
  included: boolean;
}

interface WhatsIncludedSectionProps {
  included: WhatsIncludedItem[];
}

export function WhatsIncludedSection({ included }: WhatsIncludedSectionProps) {
  const includedItems = included.filter((item) => item.included);
  const notIncludedItems = included.filter((item) => !item.included);

  return (
    <div className="bg-gray-900 border border-red-900/30 rounded-xl p-8">
      <h2 className="text-3xl font-bold text-white mb-6">What's Included</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Included Items */}
        <div>
          <h3 className="text-lg font-semibold text-green-500 mb-4 flex items-center gap-2">
            <Check className="w-5 h-5" />
            Included
          </h3>
          <ul className="space-y-3">
            {includedItems.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Not Included Items */}
        {notIncludedItems.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-red-500 mb-4 flex items-center gap-2">
              <X className="w-5 h-5" />
              Not Included
            </h3>
            <ul className="space-y-3">
              {notIncludedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-gray-400">
                  <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Additional Info */}
      <div className="mt-8 pt-6 border-t border-gray-800">
        <p className="text-sm text-gray-400">
          <span className="text-white font-medium">Note:</span> All activities are
          subject to weather conditions and availability. Additional costs may apply
          for optional activities not listed above.
        </p>
      </div>
    </div>
  );
}
