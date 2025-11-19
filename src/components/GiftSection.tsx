import { useState } from 'react';
import { motion } from 'motion/react';

export function GiftSection() {
  const [amount, setAmount] = useState('');

  const handleSendGift = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    // In a real implementation, this would integrate with Paystack
    // For demo purposes, we'll show an alert
    alert(`Payment integration would be triggered here for ₦${amount}\n\nIn production, this would open the Paystack payment modal.\n\nNote: This is a demo. No actual payment will be processed.`);
    
    // Reset amount after "payment"
    setAmount('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendGift();
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-white"
    >
      <div className="max-w-2xl mx-auto px-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="uppercase tracking-widest mb-6"
        >
          Gift Us
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-600 mb-12 leading-relaxed"
        >
          If you'd like to send a gift, please use the form below to contribute towards our new beginning.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 max-w-md mx-auto"
        >
          <div className="relative">
            <input
              type="number"
              placeholder="Enter Amount (₦)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-6 py-4 text-xl rounded-full border-2 border-gray-300 focus:border-black focus:outline-none transition-colors text-center"
            />
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSendGift}
              className="bg-black text-white py-4 px-12 rounded-full uppercase tracking-wider hover:bg-gray-800 transition-colors"
            >
              Send Gift
            </button>
          </div>

          <p className="text-sm text-gray-400">
            Secure payment powered by Paystack
          </p>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-gray-600 leading-relaxed"
        >
          Your generosity is deeply appreciated — thank you for being part of our journey ❤️
        </motion.p>
      </div>
    </motion.section>
  );
}
