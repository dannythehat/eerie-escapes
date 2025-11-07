'use client';

import { useState } from 'react';
import { Calendar, Users, CreditCard, Clock, Shield } from 'lucide-react';

interface BookingWidgetProps {
  holidayId: string;
  price: number;
  duration: number;
  availability: string[];
  maxGuests: number;
}

export function BookingWidget({
  holidayId,
  price,
  duration,
  availability,
  maxGuests,
}: BookingWidgetProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = price * guests;
  const installmentPrice = Math.ceil(totalPrice / 3);

  const handleBooking = async () => {
    if (!selectedDate) {
      alert('Please select a date');
      return;
    }

    setIsProcessing(true);
    try {
      // TODO: Implement booking API call
      console.log('Booking:', { holidayId, selectedDate, guests });
      // Redirect to checkout
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="sticky top-24 bg-gray-900 border border-red-900/30 rounded-xl p-6 shadow-2xl">
      {/* Price Header */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-white">${price}</span>
          <span className="text-gray-400">per person</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>{duration} days</span>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Select Date
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
          >
            <option value="">Choose a date</option>
            {availability.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Guest Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Number of Guests
        </label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 appearance-none cursor-pointer"
          >
            {[...Array(maxGuests)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-gray-800/50 rounded-lg p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">
            ${price} × {guests} guest{guests > 1 ? 's' : ''}
          </span>
          <span className="text-white">${totalPrice.toLocaleString()}</span>
        </div>
        <div className="border-t border-gray-700 pt-2 flex justify-between font-semibold">
          <span className="text-white">Total</span>
          <span className="text-white text-lg">${totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Booking Button */}
      <button
        onClick={handleBooking}
        disabled={isProcessing || !selectedDate}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 mb-4"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" />
            Book Now
          </>
        )}
      </button>

      {/* Installment Option */}
      <div className="text-center mb-6">
        <p className="text-sm text-gray-400">
          Or pay in 3 installments of{' '}
          <span className="text-white font-semibold">${installmentPrice}</span>
        </p>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 pt-4 space-y-3">
        <div className="flex items-start gap-3 text-sm">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium">Free cancellation</p>
            <p className="text-gray-400 text-xs">Cancel up to 24 hours before</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium">Secure payment</p>
            <p className="text-gray-400 text-xs">Your payment info is protected</p>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-medium">Best price guarantee</p>
            <p className="text-gray-400 text-xs">Find it cheaper? We'll refund the difference</p>
          </div>
        </div>
      </div>
    </div>
  );
}
