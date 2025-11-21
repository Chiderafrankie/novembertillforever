import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: 'IS THE WEDDING STRICTLY BY INVITATION?',
    answer: 'Yes, the wedding is an intimate celebration for invited guests only. Please bring your invitation for entry.'
  },
  {
    question: 'I WOULD LIKE TO GIFT THE COUPLE, HOW CAN I DO THAT?',
    answer: 'You can contribute to our new beginning through the "Gift Us" section on this website. We appreciate your generosity!'
  },
  {
    question: 'I AM BRINGING KIDS, IS IT WELCOME?',
    answer: 'Yes, you can bring kids! We welcome your little ones to celebrate with us.'
  },
  {
    question: 'WHAT IS THE COLOR CODE?',
    answer: 'The color code is emerald green and Gold. Please refer to the colours of the day: emerald green and gold for inspiration.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-24 bg-white text-black"
    >
      <div className="max-w-4xl mx-auto px-8">
        <h2 className="text-center uppercase tracking-widest mb-16">Questions</h2>
        
        <div className="space-y-1">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              className="border-b border-gray-800"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 px-6 flex justify-between items-center hover:bg-gray-900 transition-colors text-left"
              >
                <span className="uppercase tracking-wider text-sm pr-4">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 flex-shrink-0" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
