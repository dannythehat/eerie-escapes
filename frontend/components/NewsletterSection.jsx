'use client';

import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Welcome to the dark side! Check your email for confirmation.');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black via-red-950/10 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/blood-splatter.png')] bg-no-repeat bg-center bg-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Card Container */}
          <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-red-900/30 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex p-4 bg-red-500/10 rounded-2xl mb-6"
              >
                <Mail className="w-12 h-12 text-red-500" />
              </motion.div>

              {/* Heading */}
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Join the <span className="text-red-500">Dark Side</span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-8 max-w-2xl">
                Subscribe to our newsletter for exclusive horror travel deals, spine-chilling destination guides, 
                and early access to new nightmare experiences.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      disabled={status === 'loading' || status === 'success'}
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={status === 'loading' || status === 'success'}
                    className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : status === 'success' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Status Message */}
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-lg ${
                      status === 'success' 
                        ? 'bg-green-500/10 border border-green-500/30 text-green-400' 
                        : 'bg-red-500/10 border border-red-500/30 text-red-400'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
              </form>

              {/* Privacy Note */}
              <p className="text-gray-500 text-sm mt-6">
                🔒 We respect your privacy. Unsubscribe at any time. No spam, just nightmares.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-800">
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-red-500 mb-1">10K+</p>
                  <p className="text-gray-500 text-sm">Subscribers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-red-500 mb-1">Weekly</p>
                  <p className="text-gray-500 text-sm">Updates</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl md:text-3xl font-bold text-red-500 mb-1">Exclusive</p>
                  <p className="text-gray-500 text-sm">Deals</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
